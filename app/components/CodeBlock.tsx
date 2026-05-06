"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ code, lang = "javascript", showCopy = true }: { code: string; lang?: string; showCopy?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code.replace(/<[^>]*>/g, "")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--code-bg)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-1.5">
          {["#ef4444","#f59e0b","#22c55e"].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--subtle)" }}>{lang}</span>
          {showCopy && (
            <button
              onClick={copy}
              className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-md transition-all duration-150"
              style={{ background: "transparent", border: "none", cursor: "pointer", color: copied ? "var(--green)" : "var(--subtle)" }}
              onMouseEnter={e => { if (!copied) (e.currentTarget as HTMLElement).style.color = "var(--violet2)"; }}
              onMouseLeave={e => { if (!copied) (e.currentTarget as HTMLElement).style.color = "var(--subtle)"; }}
            >
              {copied ? <><Check size={11} />copied</> : <><Copy size={11} />copy</>}
            </button>
          )}
        </div>
      </div>
      <pre dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
}
