import MethodEntry from "./MethodEntry";

interface Method {
  modifier?: string;
  name: string;
  params: string;
  returns: string;
  desc: string;
  params_table?: Array<{ name: string; type: string; required: string; desc: string }>;
  code: string;
  lang?: string;
}

interface ClassCardProps {
  icon: string;
  iconColor: string;
  name: string;
  desc: string;
  tags?: string[];
  methods: Method[];
}

const tagStyles: Record<string, React.CSSProperties> = {
  class: { background: "rgba(255,107,53,0.1)", color: "var(--accent2)" },
  "@static": { background: "rgba(176,133,245,0.12)", color: "var(--purple)" },
  interface: { background: "rgba(61,255,207,0.08)", color: "var(--teal)" },
};

const iconColors: Record<string, React.CSSProperties> = {
  orange: { background: "rgba(255,107,53,0.15)" },
  teal: { background: "rgba(61,255,207,0.12)" },
  purple: { background: "rgba(176,133,245,0.12)" },
};

export default function ClassCard({
  icon,
  iconColor,
  name,
  desc,
  tags = ["class", "@static"],
  methods,
}: ClassCardProps) {
  return (
    <div
      className="rounded-[14px] mb-7 overflow-hidden fade-up"
      style={{ background: "var(--bg3)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-start gap-3.5"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0"
          style={iconColors[iconColor] || iconColors.orange}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div
            className="text-lg font-bold mb-1 text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {name}
          </div>
          <div className="text-[13.5px]" style={{ color: "var(--muted)" }}>
            {desc}
          </div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  ...(tagStyles[t] || tagStyles.class),
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Methods */}
      <div>
        {methods.map((m) => (
          <MethodEntry key={m.name} {...m} />
        ))}
      </div>
    </div>
  );
}
