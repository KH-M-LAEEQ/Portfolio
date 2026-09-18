"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Mic, MicOff, MessageCircle, Phone, PhoneOff } from "lucide-react";
import { profile } from "@/data/cv";
import { RateLimitError, base64WavToObjectUrl, streamAsk, submitLead } from "@/lib/callAgent";

const API_BASE_URL = process.env.NEXT_PUBLIC_VOICE_API_URL ?? "";
const RING_DURATION_MS = 2400;
const GREETING_TEXT =
  "Hi, I'm an AI version of Laeeq. Ask me anything about his work, and I'll do my best to help.";
const NEEDS_HUMAN_TEXT =
  "I don't have that from what I know about him — his email and GitHub are on screen, and he reads everything that comes in.";

type CallState = "idle" | "ringing" | "connected" | "ended";
type TurnState = "idle" | "listening" | "thinking" | "speaking";

interface TranscriptTurn {
  role: "user" | "assistant" | "system";
  text: string;
}

function getSpeechRecognitionCtor(): { new (): SpeechRecognition } | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

/** Synthesizes a simple ring tone with Web Audio - no external asset needed. */
function playRingTone(durationMs: number): () => void {
  const AudioCtx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();

  const beep = (startTime: number, freq: number, dur: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.15, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + dur + 0.02);
  };

  const ringGap = 1.0;
  const numRings = Math.max(Math.floor(durationMs / 1000 / ringGap), 2);
  let t = ctx.currentTime;
  for (let i = 0; i < numRings; i++) {
    beep(t, 480, 0.35);
    beep(t + 0.4, 440, 0.35);
    t += ringGap;
  }

  const timeoutId = window.setTimeout(() => ctx.close(), durationMs + 200);
  return () => {
    window.clearTimeout(timeoutId);
    ctx.close();
  };
}

function formatTimer(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const WAVEFORM_BAR_COUNT = 20;

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-6 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: WAVEFORM_BAR_COUNT }).map((_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full ${active ? "animate-waveform-bar bg-accent" : "bg-border"}`}
          style={active ? { animationDelay: `${(i % 7) * 0.09}s` } : { height: "4px" }}
        />
      ))}
    </div>
  );
}

export default function CallWidget() {
  const [callState, setCallState] = useState<CallState>("idle");
  const [turnState, setTurnState] = useState<TurnState>("idle");
  const [transcript, setTranscript] = useState<TranscriptTurn[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [leadCapture, setLeadCapture] = useState<{ question: string } | null>(null);
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [micMuted, setMicMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  const sessionIdRef = useRef<string>("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const micBlockedRef = useRef(false);
  const micMutedRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const answerDoneRef = useRef(true);
  const stopRingRef = useRef<(() => void) | null>(null);
  const callStateRef = useRef<CallState>("idle");
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    callStateRef.current = callState;
  }, [callState]);

  useEffect(() => {
    audioElementRef.current = new Audio();
    return () => {
      stopRingRef.current?.();
      recognitionRef.current?.abort();
      abortControllerRef.current?.abort();
      audioQueueRef.current.forEach((url) => URL.revokeObjectURL(url));
      audioElementRef.current?.pause();
      if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
    };
  }, []);

  function playNextInQueue() {
    const audioEl = audioElementRef.current;
    const next = audioQueueRef.current.shift();
    if (!next || !audioEl) {
      isPlayingRef.current = false;
      if (answerDoneRef.current && callStateRef.current === "connected") {
        startListening();
      }
      return;
    }
    isPlayingRef.current = true;
    setTurnState("speaking");
    audioEl.src = next;
    audioEl.onended = () => {
      URL.revokeObjectURL(next);
      playNextInQueue();
    };
    audioEl.play().catch(() => {
      URL.revokeObjectURL(next);
      playNextInQueue();
    });
  }

  function enqueueAudio(url: string) {
    audioQueueRef.current.push(url);
    if (!isPlayingRef.current) {
      playNextInQueue();
    }
  }

  function startListening() {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor || callStateRef.current !== "connected" || micMutedRef.current) return;

    const recognition = new Ctor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    let resultCaptured = false;

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const text = result?.[0]?.transcript?.trim();
      if (text) {
        resultCaptured = true;
        handleQuestion(text);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        micBlockedRef.current = true;
        setErrorMessage("Microphone access was denied — allow it and call again.");
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      if (!resultCaptured && !micBlockedRef.current && callStateRef.current === "connected") {
        window.setTimeout(() => startListening(), 300);
      }
    };

    recognitionRef.current = recognition;
    setTurnState("listening");
    try {
      recognition.start();
    } catch {
      // start() throws if a recognition session is already active - ignore
    }
  }

  function stopListening() {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
  }

  function toggleMute() {
    const next = !micMutedRef.current;
    micMutedRef.current = next;
    setMicMuted(next);
    if (next) {
      stopListening();
    } else if (!leadCapture && turnState !== "thinking" && turnState !== "speaking") {
      startListening();
    }
  }

  async function handleQuestion(question: string) {
    stopListening();
    setTranscript((prev) => [...prev, { role: "user", text: question }]);
    setTurnState("thinking");
    answerDoneRef.current = false;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    let liveAnswer = "";
    let assistantTurnAdded = false;
    let sawNeedsHuman = false;

    const appendAssistantText = (text: string) => {
      setTranscript((prev) => {
        if (!assistantTurnAdded) {
          assistantTurnAdded = true;
          return [...prev, { role: "assistant", text }];
        }
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", text };
        return updated;
      });
    };

    try {
      for await (const event of streamAsk(
        API_BASE_URL,
        sessionIdRef.current,
        question,
        controller.signal,
      )) {
        if (event.type === "token") {
          liveAnswer += event.delta;
          appendAssistantText(liveAnswer);
        } else if (event.type === "audio") {
          enqueueAudio(base64WavToObjectUrl(event.audioBase64));
        } else if (event.type === "needs_human") {
          sawNeedsHuman = true;
        } else if (event.type === "error") {
          setErrorMessage(event.error);
        } else if (event.type === "done") {
          answerDoneRef.current = true;
        }
      }
    } catch (err) {
      if (err instanceof RateLimitError) {
        setErrorMessage(err.message);
        endCall();
        return;
      }
      if (err instanceof DOMException && err.name === "AbortError") {
        return; // hung up mid-request
      }
      setErrorMessage("Something went wrong reaching the agent.");
      answerDoneRef.current = true;
    }

    if (sawNeedsHuman) {
      setTranscript((prev) => [...prev, { role: "system", text: NEEDS_HUMAN_TEXT }]);
      // Hold off on listening again until they've submitted contact info
      // or dismissed the form - speaking a spelled-out email aloud via
      // STT is unreliable, so this is a typed form instead.
      setLeadCapture({ question });
      setLeadStatus("idle");
      return;
    }

    // Nothing was queued for audio (TTS not configured, etc.) -
    // playNextInQueue never ran, so nothing will resume listening. Do it here.
    if (!isPlayingRef.current && audioQueueRef.current.length === 0 && callStateRef.current === "connected") {
      startListening();
    }
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!leadCapture) return;

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const contact = String(formData.get("contact") ?? "").trim();
    if (!contact) return;

    setLeadStatus("submitting");
    try {
      const result = await submitLead(API_BASE_URL, sessionIdRef.current, name, contact, leadCapture.question);
      setTranscript((prev) => [
        ...prev,
        {
          role: "system",
          text: result.notified
            ? "Thanks — Laeeq will reach out soon."
            : "Thanks — that's saved. The notification email didn't go through, but he'll still see it.",
        },
      ]);
    } catch {
      setLeadStatus("error");
      return; // leave the form up so they can retry
    }
    setLeadCapture(null);
    setLeadStatus("idle");
    if (callStateRef.current === "connected") startListening();
  }

  function skipLeadCapture() {
    setLeadCapture(null);
    setLeadStatus("idle");
    if (callStateRef.current === "connected") startListening();
  }

  function playGreeting() {
    const audioEl = audioElementRef.current;
    setTranscript((prev) => [...prev, { role: "assistant", text: GREETING_TEXT }]);
    if (!audioEl) {
      startListening();
      return;
    }
    setTurnState("speaking");
    audioEl.src = "/audio/call-greeting.wav";
    audioEl.onended = () => {
      if (callStateRef.current === "connected") startListening();
    };
    audioEl.play().catch(() => {
      if (callStateRef.current === "connected") startListening();
    });
  }

  function startCall() {
    setErrorMessage(null);
    setTranscript([]);
    setLeadCapture(null);
    setLeadStatus("idle");
    setMicMuted(false);
    micMutedRef.current = false;
    setCallSeconds(0);

    if (!getSpeechRecognitionCtor()) {
      setErrorMessage("Voice calls need a browser with speech recognition - try Chrome, Edge, or Safari.");
      return;
    }

    micBlockedRef.current = false;
    sessionIdRef.current = crypto.randomUUID();
    setCallState("ringing");
    try {
      stopRingRef.current = playRingTone(RING_DURATION_MS);
    } catch {
      stopRingRef.current = null;
    }
    window.setTimeout(() => {
      stopRingRef.current?.();
      stopRingRef.current = null;
      setCallState("connected");
      timerIntervalRef.current = window.setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
      playGreeting();
    }, RING_DURATION_MS);
  }

  function endCall() {
    stopRingRef.current?.();
    stopRingRef.current = null;
    stopListening();
    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    audioQueueRef.current.forEach((url) => URL.revokeObjectURL(url));
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    const audioEl = audioElementRef.current;
    if (audioEl) {
      audioEl.onended = null;
      audioEl.pause();
      audioEl.src = "";
    }
    setTurnState("idle");
    setCallState("ended");
    setLeadCapture(null);
    setLeadStatus("idle");
    window.setTimeout(() => {
      setCallState((s) => (s === "ended" ? "idle" : s));
    }, 4000);
  }

  if (!API_BASE_URL) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {callState === "idle" && (
        <div className="flex flex-col items-end gap-2">
          {errorMessage && (
            <p className="max-w-64 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-red-500 shadow-lg">
              {errorMessage}
            </p>
          )}
          <button
            type="button"
            onClick={startCall}
            className="flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            <Phone size={18} />
            Call me
          </button>
        </div>
      )}

      {callState !== "idle" && (
        <div className="w-80 max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
          {callState !== "ended" ? (
            <div className="flex flex-col items-center px-5 pb-5 pt-4">
              <div className="flex w-full items-center justify-between text-xs font-medium">
                <span className="text-muted">{callState === "ringing" ? "0:00" : formatTimer(callSeconds)}</span>
                <span className="text-accent">
                  {callState === "ringing"
                    ? "Ringing..."
                    : leadCapture
                      ? "Waiting for your info..."
                      : turnState === "listening"
                        ? "Listening..."
                        : turnState === "thinking"
                          ? "Thinking..."
                          : turnState === "speaking"
                            ? "Speaking..."
                            : "Connected"}
                </span>
              </div>

              <div
                className={`mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-surface-2 ${
                  callState === "ringing" || turnState === "speaking" ? "animate-avatar-glow" : ""
                }`}
              >
                <MessageCircle size={30} className="text-accent" />
              </div>

              <p className="mt-3 text-sm font-semibold text-foreground">Laeeq</p>
              <p className="text-xs text-muted">AI Voice Assistant</p>

              <div className="mt-4">
                <Waveform
                  active={
                    callState === "ringing" || turnState === "listening" || turnState === "speaking"
                  }
                />
              </div>

              <p className="mt-1 h-4 text-xs text-muted">
                {callState === "ringing"
                  ? "Calling..."
                  : leadCapture
                    ? "Type your info below"
                    : turnState === "listening"
                      ? "Go ahead, I'm listening"
                      : turnState === "thinking"
                        ? "Thinking..."
                        : turnState === "speaking"
                          ? "Speaking..."
                          : ""}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={toggleMute}
                  disabled={callState === "ringing"}
                  aria-label={micMuted ? "Unmute microphone" : "Mute microphone"}
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors disabled:opacity-40 ${
                    micMuted
                      ? "bg-red-500/10 text-red-500"
                      : "bg-surface-2 text-foreground hover:bg-border"
                  }`}
                >
                  {micMuted ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <button
                  type="button"
                  onClick={endCall}
                  aria-label="End call"
                  title="End call"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 transition-transform hover:scale-105"
                >
                  <PhoneOff size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center px-5 py-6">
              <p className="text-sm font-semibold text-foreground">Call ended</p>
              <button
                type="button"
                onClick={startCall}
                className="mt-3 w-full rounded-md bg-accent px-3 py-2 text-xs font-semibold text-white"
              >
                Call again
              </button>
            </div>
          )}

          <div className="max-h-52 space-y-2 overflow-y-auto border-t border-border px-4 py-3 text-sm">
            {transcript.map((turn, i) => (
              <p
                key={i}
                className={
                  turn.role === "user"
                    ? "text-foreground"
                    : turn.role === "system"
                      ? "italic text-muted"
                      : "text-muted"
                }
              >
                {turn.role === "user" ? "You: " : ""}
                {turn.text}
                {turn.role === "system" && (
                  <>
                    {" "}
                    <a href={`mailto:${profile.email}`} className="text-accent underline">
                      {profile.email}
                    </a>
                  </>
                )}
              </p>
            ))}
          </div>

          {leadCapture && (
            <form onSubmit={handleLeadSubmit} className="space-y-2 border-t border-border px-4 py-3">
              <p className="text-xs text-muted">Leave your info and he&apos;ll follow up personally.</p>
              <input
                name="name"
                type="text"
                placeholder="Name (optional)"
                className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <input
                name="contact"
                type="text"
                required
                placeholder="Email or phone"
                className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={leadStatus === "submitting"}
                  className="flex-1 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {leadStatus === "submitting" ? "Sending..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={skipLeadCapture}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-foreground"
                >
                  No thanks
                </button>
              </div>
              {leadStatus === "error" && (
                <p className="text-xs text-red-500">Couldn&apos;t submit that — try again.</p>
              )}
            </form>
          )}

          {errorMessage && <p className="px-4 pb-3 text-xs text-red-500">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
}
