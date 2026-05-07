"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Card, Chip, ScrollShadow, Separator } from "@heroui/react";
import {
  BookOpen, Braces, Shuffle, Wand2, Wrench,
  ExternalLink, Package, Cat, Dog, Laugh,
  Image, Lightbulb, Zap, Hash, Check, Copy,
  Code2, FileCode, ChevronRight, MessageCircle,
  Layers, Globe, Dices, GitBranch, ArrowRight,
  Sun, Moon, Search, X,
} from "lucide-react";
import CodeBlock from "./components/CodeBlock";
import { navSections, interfaces, randomMethods, generationMethods, utilMethods } from "./data";

type SectionId = "getting-started" | "interfaces" | "random" | "generation" | "util";

const NAV_ICONS: Record<string, React.ReactNode> = {
  "getting-started": <BookOpen size={14} />,
  "interfaces":      <Braces size={14} />,
  "random":          <Shuffle size={14} />,
  "generation":      <Wand2 size={14} />,
  "util":            <Wrench size={14} />,
};

// All searchable items
const ALL_ITEMS = [
  { id: "getting-started" as SectionId, label: "Getting Started", section: "Overview" },
  { id: "interfaces" as SectionId, label: "Interfaces", section: "Overview" },
  { id: "random" as SectionId, label: "Random", section: "Classes" },
  { id: "generation" as SectionId, label: "Generation", section: "Classes" },
  { id: "util" as SectionId, label: "Util", section: "Classes" },
  ...randomMethods.map(m => ({ id: "random" as SectionId, label: m.name, section: "Random", anchor: m.name })),
  ...generationMethods.map(m => ({ id: "generation" as SectionId, label: m.name, section: "Generation", anchor: m.name })),
  ...utilMethods.map(m => ({ id: "util" as SectionId, label: m.name, section: "Util", anchor: m.name })),
];

// ─── SectionHeader ──────────────────────────────────────────────────────────
function SectionHeader({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border-std)", color: "var(--accent)" }}>
          {icon}
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.55rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
          {title}
        </h2>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "13.5px", maxWidth: "540px", lineHeight: 1.8, paddingLeft: "48px" }}>
        {desc}
      </p>
    </div>
  );
}

// ─── FunctionIndex ────────────────────────────────────────────────────────────
function FunctionIndex({ methods }: { methods: any[] }) {
  const scrollTo = (name: string) => {
    const el = document.getElementById(`fn-${name}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mb-8 rounded-xl overflow-hidden fade-up"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border-std)" }}>
      <div className="px-4 py-2.5 flex items-center gap-2"
        style={{ borderBottom: "1px solid var(--border-dim)" }}>
        <Hash size={12} style={{ color: "var(--accent)" }} />
        <span style={{ fontFamily: "var(--font-code)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
          Functions in this section
        </span>
      </div>
      <div className="flex flex-wrap gap-2 p-3">
        {methods.map(m => (
          <button
            key={m.name}
            onClick={() => scrollTo(m.name)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] transition-all duration-150 cursor-pointer"
            style={{
              fontFamily: "var(--font-code)",
              background: "var(--surface-3)",
              border: "1px solid var(--border-dim)",
              color: "var(--syn-fn)",
              fontWeight: 500,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent-border)";
              (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-soft)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-dim)";
              (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-3)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--syn-fn)";
            }}
          >
            <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>{m.modifier?.includes("async") ? "async" : m.modifier || "fn"}</span>
            {m.name}
            <ChevronRight size={10} style={{ opacity: 0.4 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MethodBlock ─────────────────────────────────────────────────────────────
function MethodBlock({ modifier, name, params, returns, desc, params_table, code, lang = "javascript" }: any) {
  return (
    <div id={`fn-${name}`} className="px-6 py-6" style={{ borderBottom: "1px solid var(--border-dim)", scrollMarginTop: "24px" }}>
      {/* signature */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {modifier && (
          <Chip size="sm" variant="soft" color="accent" className="font-mono text-[10px]">{modifier}</Chip>
        )}
        <span style={{ fontFamily: "var(--font-code)", fontSize: "13.5px", fontWeight: 600, color: "var(--text-primary)" }}>{name}</span>
        <span style={{ fontFamily: "var(--font-code)", fontSize: "12.5px", color: "var(--text-muted)" }}>{params}</span>
        <ArrowRight size={11} style={{ color: "var(--border-std)" }} />
        <Chip size="sm" variant="soft" color="success" className="font-mono text-[10px]">{returns}</Chip>
      </div>

      {/* description */}
      <p style={{ color: "var(--text-secondary)", fontSize: "13.5px", lineHeight: 1.75, marginBottom: "16px" }}
        dangerouslySetInnerHTML={{ __html: desc }} />

      {/* params table */}
      {params_table?.length > 0 && (
        <div className="rounded-xl overflow-hidden mb-4" style={{ border: "1px solid var(--border-dim)" }}>
          <table className="w-full border-collapse" style={{ fontSize: "12.5px" }}>
            <thead>
              <tr style={{ background: "var(--surface-2)" }}>
                {["Parameter", "Type", "Required", "Description"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] uppercase tracking-wider font-semibold"
                    style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-dim)", fontFamily: "var(--font-body)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {params_table.map((p: any, i: number) => (
                <tr key={p.name} style={{ background: i % 2 !== 0 ? "var(--surface-2)" : "transparent", borderBottom: "1px solid var(--border-dim)" }}>
                  <td className="px-4 py-3" style={{ fontFamily: "var(--font-code)", color: "var(--syn-fn)", fontWeight: 500 }}>{p.name}</td>
                  <td className="px-4 py-3" style={{ fontFamily: "var(--font-code)", color: "var(--syn-kw)" }}>{p.type}</td>
                  <td className="px-4 py-3 text-[11px]" style={{ fontFamily: "var(--font-code)", color: "var(--text-muted)" }}>{p.required}</td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }} dangerouslySetInnerHTML={{ __html: p.desc }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CodeBlock code={code} lang={lang} />
    </div>
  );
}

// ─── ClassSection ─────────────────────────────────────────────────────────────
function ClassSection({ icon, name, desc, tags, methods }: { icon: React.ReactNode; name: string; desc: string; tags: string[]; methods: any[] }) {
  return (
    <>
      <FunctionIndex methods={methods} />
      <Card variant="default" className="mb-8 overflow-hidden fade-up" style={{ background: "var(--surface-1)", border: "1px solid var(--border-std)" }}>
        <Card.Header className="flex items-start gap-4 px-6 py-5" style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border-std)" }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--surface-3)", border: "1px solid var(--border-std)", color: "var(--accent)" }}>
            {icon}
          </div>
          <div>
            <Card.Title style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "15px", color: "var(--text-primary)", marginBottom: "4px" }}>
              {name}
            </Card.Title>
            <Card.Description style={{ color: "var(--text-secondary)", fontSize: "13px", marginBottom: "10px" }}>
              {desc}
            </Card.Description>
            <div className="flex gap-2 flex-wrap">
              {tags.map(t => (
                <Chip key={t} size="sm" variant="secondary" className="font-mono text-[10px]">{t}</Chip>
              ))}
            </div>
          </div>
        </Card.Header>
        <Card.Content className="p-0">
          {methods.map(m => <MethodBlock key={m.name} {...m} />)}
        </Card.Content>
      </Card>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [active, setActive] = useState<SectionId>("getting-started");
  const [installCopied, setInstallCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Toggle light/dark
  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      document.documentElement.classList.toggle("light", !next);
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm install some-random-cat").then(() => {
      setInstallCopied(true);
      setTimeout(() => setInstallCopied(false), 1600);
    });
  };

  const navTo = (id: SectionId, anchor?: string) => {
    setActive(id);
    setMobileOpen(false);
    setSearchQuery("");
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(`fn-${anchor}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  // Search results
  const searchResults = searchQuery.trim().length > 0
    ? ALL_ITEMS.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.section.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div className="flex min-h-screen" style={{ background: "var(--surface-0)" }}>

      {/* ══ SIDEBAR ══════════════════════════════════════════════════ */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-[252px] flex flex-col
          transition-transform duration-200
          md:sticky md:top-0 md:translate-x-0 md:flex md:h-screen md:shrink-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ background: "var(--surface-1)", borderRight: "1px solid var(--border-dim)" }}
      >
        {/* logo + theme toggle */}
        <div className="flex items-center gap-3 px-5 py-5 shrink-0" style={{ borderBottom: "1px solid var(--border-dim)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "var(--accent)", color: "#000" }}>
            <Cat size={15} />
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "13px", color: "var(--text-primary)", lineHeight: 1.2 }}>
              some-random-cat
            </p>
            <span style={{ fontFamily: "var(--font-code)", fontSize: "10px", color: "var(--text-muted)" }}>v2.4.0</span>
          </div>
          <button
            onClick={toggleTheme}
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
            style={{
              background: "var(--surface-3)",
              border: "1px solid var(--border-std)",
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>

        {/* search */}
        <div className="px-3 py-3 shrink-0" style={{ borderBottom: "1px solid var(--border-dim)" }}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search size={12} style={{ color: "var(--text-muted)" }} />
            </div>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              className="w-full pl-8 pr-7 py-2 rounded-lg text-[12.5px] outline-none transition-all"
              style={{
                background: "var(--surface-2)",
                border: `1px solid ${searchFocused ? "var(--accent-border)" : "var(--border-dim)"}`,
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={11} />
              </button>
            )}

            {/* Search dropdown */}
            {searchResults.length > 0 && searchFocused && (
              <div
                className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-50 shadow-lg"
                style={{ background: "var(--surface-1)", border: "1px solid var(--border-std)" }}
              >
                {searchResults.map((item, i) => (
                  <button
                    key={`${item.id}-${item.label}-${i}`}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-all duration-100"
                    style={{ borderBottom: i < searchResults.length - 1 ? "1px solid var(--border-dim)" : "none", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-2)"}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "transparent"}
                    onClick={() => navTo(item.id, (item as any).anchor)}
                  >
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                      {NAV_ICONS[item.id] ?? <ChevronRight size={12} />}
                    </span>
                    <span style={{ fontFamily: "var(--font-code)", fontSize: "12px", color: "var(--text-primary)", flex: 1 }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "var(--text-muted)", flexShrink: 0 }}>
                      {item.section}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl px-3 py-3 text-center"
                style={{ background: "var(--surface-1)", border: "1px solid var(--border-std)" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>No results for "{searchQuery}"</span>
              </div>
            )}
          </div>
        </div>

        {/* nav */}
        <ScrollShadow className="flex-1 min-h-0 overflow-y-auto py-4 px-3">
          {navSections.map(section => (
            <div key={section.label} className="mb-5">
              <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                {section.label}
              </p>
              {section.items.map(item => {
                const isActive = !("href" in item) && active === item.id;
                if ("href" in item && item.href) {
                  return (
                    <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer"
                      className="no-underline block">
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2 mb-0.5 font-normal"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                        <ExternalLink size={13} className="shrink-0 opacity-60" />
                        {item.label}
                      </Button>
                    </a>
                  );
                }
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-2 mb-0.5"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                      fontFamily: "var(--font-body)",
                      fontWeight: isActive ? 500 : 400,
                      background: isActive ? "var(--accent-soft)" : undefined,
                      borderColor: isActive ? "var(--accent-border)" : undefined,
                    }}
                    onClick={() => navTo(item.id as SectionId)}
                  >
                    <span style={{ color: isActive ? "var(--accent)" : "var(--text-muted)", opacity: isActive ? 1 : 0.6 }} className="shrink-0">
                      {NAV_ICONS[item.id] ?? <ChevronRight size={13} />}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {"chip" in item && item.chip && (
                      <Chip size="sm" variant="soft"
                        color={"chipType" in item && item.chipType === "async" ? "success" : "accent"}
                        className="font-mono text-[9px] ml-auto shrink-0">
                        {item.chip as string}
                      </Chip>
                    )}
                  </Button>
                );
              })}
            </div>
          ))}
        </ScrollShadow>

        {/* sidebar footer */}
        <div className="flex items-center gap-2 px-4 py-3.5 shrink-0" style={{ borderTop: "1px solid var(--border-dim)" }}>
          <Package size={12} style={{ color: "var(--text-muted)" }} />
          <span style={{ fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--text-muted)" }}>ISC · Aktindo</span>
        </div>
      </aside>

      {/* mobile backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 md:hidden" style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setMobileOpen(false)} />
      )}

      {/* ══ MAIN ═══════════════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* mobile topbar */}
        <div className="md:hidden sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 shrink-0"
          style={{ background: "var(--surface-1)", borderBottom: "1px solid var(--border-dim)" }}>
          <div className="flex items-center gap-2">
            <Cat size={15} style={{ color: "var(--accent)" }} />
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "13px", color: "var(--text-primary)" }}>
              some-random-cat
            </span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={toggleTheme}>
              {isDark ? <Sun size={13} /> : <Moon size={13} />}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setMobileOpen(true)}>Menu</Button>
          </div>
        </div>

        {/* ── HERO — only on getting-started ──────────────────────── */}
        {active === "getting-started" && (
          <div className="px-8 md:px-14 pt-14 pb-12 shrink-0" style={{ borderBottom: "1px solid var(--border-dim)" }}>
            <div className="flex items-center gap-2 mb-6">
              <Chip size="sm" variant="secondary" className="font-mono">npm package</Chip>
              <Chip size="sm" variant="soft" color="success" className="font-mono">v2.4.0 stable</Chip>
            </div>

            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "14px" }}>
              some-random-cat
            </h1>

            <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "460px", lineHeight: 1.85, marginBottom: "28px" }}>
              A lightweight TypeScript library for generating random content — cats, dogs, jokes, memes, advice, facts, and more.
            </p>

            {/* feature chips */}
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                { icon: <Cat size={13} />,           label: "Cat images" },
                { icon: <Dog size={13} />,           label: "Dog images" },
                { icon: <Laugh size={13} />,         label: "Jokes" },
                { icon: <Image size={13} />,         label: "Memes" },
                { icon: <Lightbulb size={13} />,     label: "Advice" },
                { icon: <MessageCircle size={13} />, label: "Topics" },
                { icon: <Hash size={13} />,          label: "UUID gen" },
                { icon: <Zap size={13} />,           label: "TypeScript" },
              ].map(({ icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-[12.5px] font-medium px-3 py-1.5 rounded-lg"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border-std)", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent)" }}>{icon}</span>
                  {label}
                </span>
              ))}
            </div>

            {/* install */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl max-w-full"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border-std)" }}>
              <Code2 size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <code style={{ fontFamily: "var(--font-code)", fontSize: "13px", color: "var(--text-primary)" }}>
                npm install some-random-cat
              </code>
              <Button
                size="sm"
                variant={installCopied ? "secondary" : "outline"}
                className="shrink-0 font-mono text-[11px] gap-1.5"
                onClick={copyInstall}
                style={{ color: installCopied ? "var(--syn-str)" : undefined }}
              >
                {installCopied ? <Check size={11} /> : <Copy size={11} />}
                {installCopied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
        )}

        {/* ── CONTENT ───────────────────────────────────────────────── */}
        <div className="px-8 md:px-14 pb-24 flex-1">

          {/* GETTING STARTED */}
          {active === "getting-started" && (
            <div className="pt-12">
              <SectionHeader icon={<BookOpen size={16} />} title="Getting Started"
                desc="Up and running in under a minute — install, import one class, and start fetching content." />

              <div className="flex flex-col gap-7 mb-12">
                {[
                  {
                    step: "01", icon: <Package size={15} />, title: "Install",
                    text: "Add the package using npm, yarn, or pnpm.",
                    code: `<span class="nb">npm install some-random-cat</span>\n<span class="cm"># or with yarn / pnpm</span>\n<span class="nb">yarn add some-random-cat</span>`,
                    lang: "bash",
                  },
                  {
                    step: "02", icon: <FileCode size={15} />, title: "Import",
                    text: "Three named exports — pick what you need.",
                    code: `<span class="cm">// CommonJS</span>\n<span class="kw">const</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } = <span class="fn">require</span>(<span class="str">'some-random-cat'</span>);\n\n<span class="cm">// ESM / TypeScript</span>\n<span class="kw">import</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } <span class="kw">from</span> <span class="str">'some-random-cat'</span>;`,
                    lang: "javascript",
                  },
                  {
                    step: "03", icon: <Cat size={15} />, title: "Fetch a random cat",
                    text: "All Random methods are async — use await or .then().",
                    code: `<span class="kw">const</span> <span class="nb">cat</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getCat</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">url</span>);   <span class="cm">// https://cdn2.thecatapi.com/...</span>\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">width</span>); <span class="cm">// 640</span>`,
                    lang: "javascript",
                  },
                  {
                    step: "04", icon: <Hash size={15} />, title: "Generate a UUID",
                    text: "Generation methods are synchronous — no await needed.",
                    code: `<span class="kw">const</span> <span class="nb">id</span>  = <span class="fn">Generation</span>.<span class="fn">generateId</span>({ putDash: <span class="kw">true</span> });\n<span class="cm">// "a1b2c3d4-e5f6-4789-yabc-def012345678"</span>\n\n<span class="kw">const</span> <span class="nb">acr</span> = <span class="fn">Generation</span>.<span class="fn">getAcronym</span>(<span class="str">'World Health Organization'</span>);\n<span class="cm">// "WHO"</span>`,
                    lang: "javascript",
                  },
                ].map((s, i) => (
                  <div key={s.step} className="flex gap-5 fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border-std)", color: "var(--accent)" }}>
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ fontFamily: "var(--font-code)", fontSize: "10px", color: "var(--text-muted)" }}>{s.step}</span>
                        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)" }}>{s.title}</p>
                      </div>
                      <p style={{ color: "var(--text-secondary)", fontSize: "13.5px", marginBottom: "10px" }}>{s.text}</p>
                      <CodeBlock code={s.code} lang={s.lang} />
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-8" />

              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)", marginBottom: "14px" }}>
                What's included
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: <Layers size={16} />,  title: "Object-Oriented",  text: "Three focused static classes — Random, Generation, Util." },
                  { icon: <Zap size={16} />,     title: "TypeScript-First", text: "Full type declarations and exported interfaces included." },
                  { icon: <Dices size={16} />,   title: "Promise-Based",    text: "Async methods return typed Promises. Works great with await." },
                  { icon: <Globe size={16} />,   title: "Multi-API",        text: "Cat API, dog.ceo, AdviceSlip and more — one interface." },
                ].map((f, i) => (
                  <Card key={f.title} variant="secondary" className="p-4 fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <Card.Content className="p-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>
                        {f.icon}
                      </div>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "12.5px", color: "var(--text-primary)", marginBottom: "5px" }}>{f.title}</p>
                      <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{f.text}</p>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* INTERFACES */}
          {active === "interfaces" && (
            <div className="pt-12">
              <SectionHeader icon={<Braces size={16} />} title="Interfaces"
                desc="TypeScript interfaces exported by the package — the shape of every object returned by the API." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {interfaces.map((iface, i) => (
                  <Card key={iface.name} variant="default" className="overflow-hidden fade-up"
                    style={{ background: "var(--surface-1)", border: "1px solid var(--border-std)", animationDelay: `${i * 50}ms` }}>
                    <Card.Header className="px-4 py-3 flex items-center gap-2.5"
                      style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border-dim)" }}>
                      <Braces size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                      <Card.Title style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "13.5px", color: "var(--text-primary)" }}>
                        {iface.name}
                      </Card.Title>
                      <Chip size="sm" variant="secondary" className="font-mono text-[9px] ml-auto">interface</Chip>
                    </Card.Header>
                    <Card.Content className="px-4 py-2">
                      {iface.props.map(prop => (
                        <div key={prop.key} className="flex items-baseline justify-between gap-3 py-2.5"
                          style={{ borderBottom: "1px solid var(--border-dim)" }}>
                          <span style={{ fontFamily: "var(--font-code)", fontSize: "12.5px", color: "var(--text-primary)" }}>
                            {prop.key}{"optional" in prop && prop.optional && <span style={{ color: "var(--text-muted)" }}>?</span>}
                          </span>
                          <span style={{ fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--syn-fn)", flexShrink: 0 }}>{prop.type}</span>
                        </div>
                      ))}
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {active === "random" && (
            <div className="pt-12">
              <SectionHeader icon={<Shuffle size={16} />} title="Random"
                desc="All methods are static and async — they return Promises and call external APIs. Do not instantiate." />
              <ClassSection icon={<Shuffle size={18} />} name="Random"
                desc="Wraps multiple external APIs into one uniform async interface."
                tags={["class", "@static"]} methods={randomMethods} />
            </div>
          )}

          {active === "generation" && (
            <div className="pt-12">
              <SectionHeader icon={<Wand2 size={16} />} title="Generation"
                desc="Synchronous string utilities. Static methods — no await, no network calls." />
              <ClassSection icon={<Wand2 size={18} />} name="Generation"
                desc="UUID generation, acronym extraction, and text truncation."
                tags={["class", "@static"]} methods={generationMethods} />
            </div>
          )}

          {active === "util" && (
            <div className="pt-12">
              <SectionHeader icon={<Wrench size={16} />} title="Util"
                desc="A tiny helper for reading the package's own metadata at runtime." />
              <ClassSection icon={<Wrench size={18} />} name="Util"
                desc="Exposes version, author, repo URL, and description from package.json."
                tags={["class", "@static"]} methods={utilMethods} />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="shrink-0" style={{ borderTop: "1px solid var(--border-dim)" }}>
          <div className="px-8 md:px-14 py-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Cat size={13} style={{ color: "var(--text-muted)" }} />
              <span style={{ fontFamily: "var(--font-code)", fontSize: "11.5px", color: "var(--text-muted)" }}>
                some-random-cat · v2.4.0 · ISC License · Aktindo
              </span>
            </div>
            <div className="flex gap-1">
              {[
                { label: "GitHub", icon: <GitBranch size={13} />, href: "https://github.com/aktindo/some-random-cat" },
                { label: "npm",    icon: <Package size={13} />,   href: "https://www.npmjs.com/package/some-random-cat" },
              ].map(l => (
                <Button key={l.label} variant="ghost" size="sm" className="gap-1.5 font-mono text-[12px]"
                  style={{ color: "var(--text-muted)" }}
                  onClick={() => window.open(l.href, "_blank")}>
                  {l.icon}{l.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
