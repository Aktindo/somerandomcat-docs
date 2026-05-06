import CodeBlock from "./CodeBlock";

interface Param {
  name: string;
  type: string;
  required: string;
  desc: string;
}

interface MethodEntryProps {
  modifier?: string;
  name: string;
  params: string;
  returns: string;
  desc: string;
  params_table?: Param[];
  code: string;
  lang?: string;
}

export default function MethodEntry({
  modifier,
  name,
  params,
  returns,
  desc,
  params_table,
  code,
  lang = "javascript",
}: MethodEntryProps) {
  return (
    <div
      className="px-6 py-5 transition-colors duration-150 last:border-0"
      style={{ borderBottom: "1px solid var(--border)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "transparent")
      }
    >
      {/* Signature */}
      <div
        className="flex flex-wrap items-center gap-2 mb-2 text-[13px]"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        {modifier && (
          <span style={{ color: "var(--purple)" }}>{modifier}</span>
        )}
        <span className="font-medium" style={{ color: "var(--accent2)" }}>
          {name}
        </span>
        <span style={{ color: "var(--muted)" }}>{params}</span>
        <span style={{ color: "var(--border)" }}>→</span>
        <span style={{ color: "var(--teal)" }}>{returns}</span>
      </div>

      {/* Description */}
      <div
        className="text-[13.5px] leading-relaxed mb-3"
        style={{ color: "var(--muted)" }}
        dangerouslySetInnerHTML={{ __html: desc }}
      />

      {/* Params table */}
      {params_table && params_table.length > 0 && (
        <table className="w-full border-collapse text-[13px] mt-2.5">
          <thead>
            <tr>
              {["Parameter", "Type", "Required", "Description"].map((h) => (
                <th
                  key={h}
                  className="text-left px-2.5 py-1.5 text-[10px] uppercase tracking-widest"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: "var(--muted)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {params_table.map((p) => (
              <tr key={p.name}>
                <td
                  className="px-2.5 py-2 text-[12px]"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: "var(--accent2)",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                  }}
                >
                  {p.name}
                </td>
                <td
                  className="px-2.5 py-2 text-[12px]"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: "var(--teal)",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                  }}
                >
                  {p.type}
                </td>
                <td
                  className="px-2.5 py-2 text-[11px]"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: "var(--muted)",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                  }}
                >
                  {p.required}
                </td>
                <td
                  className="px-2.5 py-2 text-[13px]"
                  style={{
                    color: "var(--muted)",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                  }}
                  dangerouslySetInnerHTML={{ __html: p.desc }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Returns */}
      <div className="flex items-center gap-2 mt-2.5">
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--muted)" }}
        >
          Returns
        </span>
        <span
          className="text-[11.5px] px-2 py-0.5 rounded"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: "var(--teal)",
            background: "rgba(61,255,207,0.08)",
            border: "1px solid rgba(61,255,207,0.15)",
          }}
        >
          {returns}
        </span>
      </div>

      <CodeBlock code={code} lang={lang} />
    </div>
  );
}
