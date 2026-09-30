// Shared between server (lib/llm.ts) and client (lib/voice.ts) — no "use
// client" directive needed since it's plain string logic, no browser APIs.

const ZERO_WIDTH_JOINER = String.fromCharCode(0x200d);
const VARIATION_SELECTOR_16 = String.fromCharCode(0xfe0f);

const emojiRunPattern = new RegExp(
  `\\p{Extended_Pictographic}(${ZERO_WIDTH_JOINER}\\p{Extended_Pictographic})*`,
  "gu"
);
const strayMarkersPattern = new RegExp(`[${VARIATION_SELECTOR_16}${ZERO_WIDTH_JOINER}]`, "g");

/**
 * Strips emoji from text. Speech engines read emoji aloud by their unicode
 * name (e.g. "smiling face with smiling eyes"), and this is also a public
 * chat widget where plain, professional text reads better than emoji clutter.
 */
export function stripEmoji(text: string): string {
  return text
    .replace(emojiRunPattern, "")
    .replace(strayMarkersPattern, "")
    .replace(/ {2,}/g, " ")
    .trim();
}
