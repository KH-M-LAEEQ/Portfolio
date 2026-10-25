import { renderMonogram } from "@/components/MonogramIcon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return renderMonogram(size.width);
}
