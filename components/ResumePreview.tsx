"use client";

import { useEffect, useState } from "react";
import { Download, Eye, X } from "lucide-react";

export default function ResumePreview() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
      >
        <Eye size={16} />
        Preview CV
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-semibold text-foreground">Resume Preview</p>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
                >
                  <Download size={14} />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close preview"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe
              src="/resume.pdf"
              title="Resume preview"
              className="h-full w-full flex-1 bg-surface-2"
            />
          </div>
        </div>
      )}
    </>
  );
}
