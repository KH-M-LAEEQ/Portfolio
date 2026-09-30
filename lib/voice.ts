"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { stripEmoji } from "@/lib/text";

// Feature support never changes after mount, so this is read via
// useSyncExternalStore (same pattern as ThemeToggle.tsx) rather than
// useState+useEffect — that avoids a hydration mismatch (server always
// renders the "unsupported" snapshot) without tripping the set-state-in-effect
// lint rule for something that isn't really syncing to an external stream.
function noopSubscribe() {
  return () => {};
}

function getSpeechRecognitionSnapshot() {
  return !!(window.SpeechRecognition ?? window.webkitSpeechRecognition);
}

function getSpeechSynthesisSnapshot() {
  return "speechSynthesis" in window;
}

function getServerSnapshotFalse() {
  return false;
}

/**
 * Mic input via the browser's SpeechRecognition API. Single-utterance mode:
 * starts listening, shows interim words as they come in, and fires
 * onFinalResult once the browser detects the user stopped talking.
 */
export function useSpeechRecognition(onFinalResult: (transcript: string) => void) {
  const isSupported = useSyncExternalStore(
    noopSubscribe,
    getSpeechRecognitionSnapshot,
    getServerSnapshotFalse
  );
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onFinalResultRef = useRef(onFinalResult);

  // Keeps the ref pointing at the latest callback without mutating it during
  // render (ref writes are only safe in effects/event handlers).
  useEffect(() => {
    onFinalResultRef.current = onFinalResult;
  });

  const start = useCallback(() => {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Ctor || isListening) return;

    const recognition = new Ctor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };
    recognition.onerror = () => {
      setIsListening(false);
      setInterimTranscript("");
    };
    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }
      if (finalText) {
        onFinalResultRef.current(finalText.trim());
      } else {
        setInterimTranscript(interimText);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isListening]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  return { isSupported, isListening, interimTranscript, start, stop };
}

/**
 * Spoken replies via the browser's SpeechSynthesis API.
 */
export function useSpeechSynthesis() {
  const isSupported = useSyncExternalStore(
    noopSubscribe,
    getSpeechSynthesisSnapshot,
    getServerSnapshotFalse
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((rawText: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const text = stripEmoji(rawText);
    if (!text) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;

    // On first use, getVoices() can return [] before the browser has
    // finished loading them — explicitly picking one avoids silently
    // dropping the utterance on some Chrome/Windows builds.
    const voices = synth.getVoices();
    const preferred = voices.find((v) => v.lang.startsWith("en")) ?? voices[0];
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
    // Chrome has a long-standing bug where speak() can get stuck in a
    // "pending" state and never actually play; resume() unsticks it.
    synth.resume();
  }, []);

  const cancel = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { isSupported, isSpeaking, speak, cancel };
}
