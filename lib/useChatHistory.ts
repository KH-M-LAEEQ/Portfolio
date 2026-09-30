"use client";

import { useEffect, useState } from "react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// Namespaced per-site (not just "portfolio-chat-history") — on localhost,
// every dev project shares the same origin (localhost:3000), so a generic
// key would leak one site's chat history into another's during local
// testing. Doesn't matter in production (real distinct domains), but costs
// nothing to get right.
const STORAGE_KEY = "khawajalaeeq-portfolio-chat-history-v1";

function loadSavedMessages(initialMessage: ChatMessage): ChatMessage[] {
  if (typeof window === "undefined") return [initialMessage];
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Corrupt or inaccessible storage — start fresh.
  }
  return [initialMessage];
}

/**
 * Persists chat history to localStorage so a conversation survives a page
 * refresh or the visitor closing and reopening the tab. Scoped to this
 * browser/device only — there's no server-side store, so it won't follow a
 * visitor across devices, and the site owner can't see it. That would need
 * a real database (e.g. Vercel KV/Upstash) instead of localStorage.
 *
 * The initial read happens synchronously in useState's lazy initializer
 * (safe here because the widget's message list is never part of the
 * server-rendered/hydration output — it's inside `{isOpen && ...}` and
 * isOpen always starts false), not in an effect, so there's no
 * server/client hydration mismatch to worry about.
 */
export function useChatHistory(initialMessage: ChatMessage) {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadSavedMessages(initialMessage)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage full or unavailable (e.g. private browsing) — persistence
      // just silently stops working; the chat itself still functions.
    }
  }, [messages]);

  function clearHistory() {
    setMessages([initialMessage]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return { messages, setMessages, clearHistory };
}
