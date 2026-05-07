"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({
  code, lang = "javascript", showCopy = true,
}: { code: string; lang?: string; showCopy?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code.replace(/<[^>]*>/g, "")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--code-bg)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>{lang}</span>
        {showCopy && (
          <button onClick={copy}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono transition-colors duration-150"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: copied ? "var(--green)" : "var(--muted)" }}
            onMouseEnter={e => { if (!copied)(e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
            onMouseLeave={e => { if (!copied)(e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "copied" : "copy"}
          </button>
        )}
      </div>
      <pre dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
}
