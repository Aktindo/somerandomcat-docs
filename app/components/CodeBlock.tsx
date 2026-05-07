"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@heroui/react";

export default function CodeBlock({ code, lang = "javascript", showCopy = true }: { code: string; lang?: string; showCopy?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code.replace(/<[^>]*>/g, "")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--surface-2)", border: "1px solid var(--border-dim)" }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid var(--border-dim)" }}>
        <span style={{ fontFamily: "var(--font-code)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
          {lang}
        </span>
        {showCopy && (
          <Button size="sm" variant="ghost" className="gap-1.5 font-mono text-[10px] h-6 min-h-0 px-2"
            style={{ color: copied ? "var(--syn-str)" : "var(--text-muted)" }}
            onClick={copy}>
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "copied" : "copy"}
          </Button>
        )}
      </div>
      <pre dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
}
