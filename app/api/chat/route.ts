import { NextRequest, NextResponse } from "next/server";
import { getChatReply, ChatUnavailableError, type ChatMessage } from "@/lib/llm";
import { checkRateLimit } from "@/lib/rateLimit";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

function getClientKey(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const clientKey = getClientKey(req);
  const rateLimit = checkRateLimit(clientKey);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "`messages` must be a non-empty array." },
      { status: 400 }
    );
  }
  if (messages.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: `Too many messages (max ${MAX_MESSAGES}).` },
      { status: 400 }
    );
  }

  const history: ChatMessage[] = [];
  for (const m of messages) {
    const role = (m as { role?: unknown } | null)?.role;
    const content = (m as { content?: unknown } | null)?.content;
    if (
      typeof m !== "object" ||
      m === null ||
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string"
    ) {
      return NextResponse.json(
        { error: "Each message needs role 'user'|'assistant' and string content." },
        { status: 400 }
      );
    }
    const cleaned = content.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "").slice(0, MAX_MESSAGE_LENGTH);
    history.push({ role, content: cleaned });
  }

  if (!history.some((m) => m.role === "user" && m.content.trim())) {
    return NextResponse.json({ error: "At least one non-empty user message is required." }, { status: 400 });
  }

  try {
    const reply = await getChatReply(history);
    return NextResponse.json({ reply });
  } catch (err) {
    if (err instanceof ChatUnavailableError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    console.error("chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong generating a reply." },
      { status: 500 }
    );
  }
}
