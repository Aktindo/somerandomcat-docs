"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

interface CodeBlockProps {
  code: string;
  lang?: string;
  showCopy?: boolean;
}

export default function CodeBlock({ code, lang = "javascript", showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Strip HTML tags to get plain text
    const plainText = code.replace(/<[^>]*>/g, "");
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      className="rounded-[10px] overflow-hidden mt-3"
      style={{ background: "var(--code-bg)", border: "1px solid var(--border)" }}
    >
      <div
        className="flex justify-between items-center px-3.5 py-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span
          className="uppercase tracking-widest text-[10px]"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--muted)" }}
        >
          {lang}
        </span>
        {showCopy && (
          <button
            onClick={handleCopy}
            className="text-[10px] px-1.5 py-0.5 rounded transition-all duration-150 cursor-pointer"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              color: copied ? "var(--teal)" : "var(--muted)",
              background: "none",
              border: "none",
            }}
            onMouseEnter={(e) => {
              if (!copied) (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              if (!copied) (e.currentTarget as HTMLElement).style.color = "var(--muted)";
            }}
          >
            {copied ? "copied ✓" : "copy"}
          </button>
        )}
      </div>
      <pre dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
}
