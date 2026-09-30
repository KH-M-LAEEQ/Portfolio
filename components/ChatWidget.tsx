"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Mic, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { profile } from "@/data/cv";
import { useSpeechRecognition, useSpeechSynthesis } from "@/lib/voice";
import { useChatHistory } from "@/lib/useChatHistory";

const firstName = profile.name.split(" ")[0];

const INITIAL_MESSAGE = {
  role: "assistant" as const,
  content: `Hi! I'm ${firstName}'s portfolio assistant. Ask me about their projects, skills, experience, or how to get in touch.`,
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, setMessages, clearHistory } = useChatHistory(INITIAL_MESSAGE);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isSpeaking, isSupported: ttsSupported, speak, cancel: cancelSpeech } =
    useSpeechSynthesis();
  const {
    isListening,
    interimTranscript,
    isSupported: sttSupported,
    start: startListening,
    stop: stopListening,
  } = useSpeechRecognition((finalTranscript) => {
    send(finalTranscript);
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed.");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (voiceEnabled) speak(data.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  function toggleVoice() {
    if (voiceEnabled) cancelSpeech();
    setVoiceEnabled((v) => !v);
  }

  function handleClear() {
    cancelSpeech();
    setError(null);
    clearHistory();
  }

  function toggleMic() {
    if (isListening) {
      stopListening();
    } else {
      cancelSpeech();
      startListening();
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex h-[28rem] w-80 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-lg sm:w-96">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Portfolio Assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                {isSpeaking ? (
                  "Speaking…"
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                    Ask me anything
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {ttsSupported && (
                <button
                  type="button"
                  onClick={toggleVoice}
                  aria-label={voiceEnabled ? "Turn off spoken replies" : "Turn on spoken replies"}
                  aria-pressed={voiceEnabled}
                  title={voiceEnabled ? "Voice replies on" : "Voice replies off"}
                  className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                    voiceEnabled
                      ? "bg-accent/10 text-accent"
                      : "text-muted hover:bg-surface-2 hover:text-foreground"
                  }`}
                >
                  {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              )}
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <RotateCcw size={15} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-accent text-white"
                    : "bg-surface-2 text-foreground"
                }`}
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex max-w-[85%] items-center gap-1 rounded-xl bg-surface-2 px-3 py-2.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
              </div>
            )}
            {error && (
              <div className="max-w-[85%] rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border p-3">
            {sttSupported && (
              <button
                type="button"
                onClick={toggleMic}
                disabled={isLoading}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
                aria-pressed={isListening}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  isListening
                    ? "bg-red-500 text-white animate-avatar-glow"
                    : "bg-surface-2 text-muted hover:text-foreground"
                }`}
              >
                <Mic size={15} />
              </button>
            )}
            <input
              ref={inputRef}
              value={isListening ? interimTranscript : input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening…" : "Ask a question…"}
              className="flex-1 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              disabled={isLoading || isListening}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-colors hover:bg-accent-hover"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
