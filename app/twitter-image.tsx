import { ogAlt, ogContentType, ogSize, renderOgCard } from "@/components/OgCard";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard();
}
