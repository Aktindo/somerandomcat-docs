"use client";

import { useState } from "react";
import { ScrollShadow } from "@heroui/react";
import {
  BookOpen, Braces, Shuffle, Wand2, Wrench,
  ExternalLink, Package, Cat, Dog, Laugh,
  Image, Lightbulb, Zap, Hash, Check, Copy,
  Code2, FileCode, ChevronRight, MessageCircle,
  Layers, Globe, Dices, GitBranch, Tag,
  ArrowRight, Info, Box,
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

// ── tiny reusable badge ─────────────────────────────────────────────────────
function Badge({ children, color = "default" }: { children: React.ReactNode; color?: "default" | "violet" | "green" | "sky" | "amber" }) {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    default: { bg: "var(--bg3)",                     text: "var(--text2)",  border: "var(--border2)" },
    violet:  { bg: "rgba(109,92,231,0.12)",          text: "#a78bfa",       border: "rgba(109,92,231,0.3)" },
    green:   { bg: "rgba(34,197,94,0.08)",           text: "#4ade80",       border: "rgba(34,197,94,0.25)" },
    sky:     { bg: "rgba(56,189,248,0.08)",          text: "#7dd3fc",       border: "rgba(56,189,248,0.25)" },
    amber:   { bg: "rgba(245,158,11,0.08)",          text: "#fbbf24",       border: "rgba(245,158,11,0.25)" },
  };
  const s = styles[color];
  return (
    <span className="inline-flex items-center font-mono text-[10px] font-medium px-2 py-0.5 rounded-md"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}>
      {children}
    </span>
  );
}

// ── section header ──────────────────────────────────────────────────────────
function SectionHeader({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--bg3)", border: "1px solid var(--border2)", color: "var(--violet)" }}>
          {icon}
        </div>
        <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.03em", color: "var(--text)" }}>
          {title}
        </h2>
      </div>
      <p style={{ color: "var(--text2)", fontSize: "13.5px", maxWidth: "540px", lineHeight: 1.8, paddingLeft: "44px" }}>{desc}</p>
    </div>
  );
}

// ── method block ────────────────────────────────────────────────────────────
function MethodBlock({ modifier, name, params, returns, desc, params_table, code, lang = "javascript" }: any) {
  return (
    <div className="px-6 py-6" style={{ borderBottom: "1px solid var(--border)" }}>
      {/* signature */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {modifier && <Badge color="violet">{modifier}</Badge>}
        <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "13.5px", fontWeight: 600, color: "var(--text)" }}>{name}</span>
        <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "12.5px", color: "var(--muted)" }}>{params}</span>
        <ArrowRight size={11} style={{ color: "var(--subtle)" }} />
        <Badge color="green">{returns}</Badge>
      </div>

      {/* description */}
      <p style={{ color: "var(--text2)", fontSize: "13.5px", lineHeight: 1.75, marginBottom: "16px" }}
        dangerouslySetInnerHTML={{ __html: desc }} />

      {/* params table */}
      {params_table?.length > 0 && (
        <div className="rounded-xl overflow-hidden mb-4" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full border-collapse" style={{ fontSize: "12.5px" }}>
            <thead>
              <tr style={{ background: "var(--bg3)" }}>
                {["Parameter", "Type", "Required", "Description"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-[11px] uppercase tracking-wider"
                    style={{ color: "var(--muted)", borderBottom: "1px solid var(--border)", fontFamily: "Inter, sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {params_table.map((p: any, i: number) => (
                <tr key={p.name} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)", borderBottom: "1px solid var(--border)" }}>
                  <td className="px-4 py-3 font-mono font-medium" style={{ color: "var(--sky)" }}>{p.name}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: "#a78bfa" }}>{p.type}</td>
                  <td className="px-4 py-3 font-mono text-[11px]" style={{ color: "var(--muted)" }}>{p.required}</td>
                  <td className="px-4 py-3" style={{ color: "var(--text2)" }} dangerouslySetInnerHTML={{ __html: p.desc }} />
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

// ── class section ───────────────────────────────────────────────────────────
function ClassSection({ icon, name, desc, tags, methods }: { icon: React.ReactNode; name: string; desc: string; tags: string[]; methods: any[] }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-8 fade-up" style={{ background: "var(--bg2)", border: "1px solid var(--border2)" }}>
      {/* header */}
      <div className="px-6 py-5 flex items-start gap-4" style={{ background: "var(--bg3)", borderBottom: "1px solid var(--border2)" }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--bg4)", border: "1px solid var(--border2)", color: "var(--violet)" }}>
          {icon}
        </div>
        <div>
          <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "15px", color: "var(--text)", marginBottom: "4px" }}>{name}</h3>
          <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "10px" }}>{desc}</p>
          <div className="flex gap-2 flex-wrap">
            {tags.map(t => <Badge key={t}>{t}</Badge>)}
          </div>
        </div>
      </div>
      {methods.map(m => <MethodBlock key={m.name} {...m} />)}
    </div>
  );
}

// ── main ────────────────────────────────────────────────────────────────────
export default function Home() {
  const [active, setActive] = useState<SectionId>("getting-started");
  const [installCopied, setInstallCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm install some-random-cat").then(() => {
      setInstallCopied(true);
      setTimeout(() => setInstallCopied(false), 1600);
    });
  };
  const navTo = (id: SectionId) => { setActive(id); setMobileOpen(false); };

  return (
    <div className="flex min-h-screen">

      {/* ══ SIDEBAR ══════════════════════════════════════════════════ */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[248px] flex flex-col z-40 transition-transform duration-200 md:relative md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "var(--bg2)", borderRight: "1px solid var(--border)" }}
      >
        {/* logo */}
        <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--violet)", color: "#fff" }}>
            <Cat size={15} />
          </div>
          <div>
            <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "13px", color: "var(--text)", lineHeight: 1.2 }}>some-random-cat</p>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "var(--muted)" }}>v2.4.0</span>
          </div>
        </div>

        {/* nav links */}
        <ScrollShadow className="flex-1 overflow-y-auto py-4 px-3">
          {navSections.map(section => (
            <div key={section.label} className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.1em] font-semibold px-2 mb-1.5"
                style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}>
                {section.label}
              </p>
              {section.items.map(item => {
                const isActive = !("href" in item) && active === item.id;
                if ("href" in item && item.href) {
                  return (
                    <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer"
                      className="no-underline flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] mb-0.5 transition-colors duration-150"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text)"; el.style.background = "var(--bg3)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--muted)"; el.style.background = "transparent"; }}>
                      <ExternalLink size={13} style={{ flexShrink: 0, opacity: 0.6 }} />
                      {item.label}
                    </a>
                  );
                }
                return (
                  <button key={item.id} onClick={() => navTo(item.id as SectionId)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] w-full text-left mb-0.5 transition-colors duration-150"
                    style={{
                      background: isActive ? "var(--bg4)" : "transparent",
                      color: isActive ? "var(--text)" : "var(--muted)",
                      border: isActive ? "1px solid var(--border2)" : "1px solid transparent",
                      cursor: "pointer",
                      fontWeight: isActive ? 500 : 400,
                      fontFamily: "Inter, sans-serif",
                    }}>
                    <span style={{ color: isActive ? "var(--violet)" : "var(--muted)", flexShrink: 0, opacity: isActive ? 1 : 0.7 }}>
                      {NAV_ICONS[item.id] ?? <ChevronRight size={13} />}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {"chip" in item && item.chip && (
                      <Badge color={"chipType" in item && item.chipType === "async" ? "sky" : "violet"}>
                        {item.chip as string}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </ScrollShadow>

        {/* sidebar footer */}
        <div className="px-4 py-3.5 flex items-center gap-2" style={{ borderTop: "1px solid var(--border)" }}>
          <Package size={12} style={{ color: "var(--muted)" }} />
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "11px", color: "var(--muted)" }}>ISC · Aktindo</span>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 md:hidden" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setMobileOpen(false)} />
      )}

      {/* ══ MAIN ═════════════════════════════════════════════════════ */}
      <main className="flex-1 min-w-0 overflow-x-hidden">

        {/* mobile bar */}
        <div className="md:hidden flex items-center justify-between px-5 py-3.5 sticky top-0 z-20"
          style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <Cat size={15} style={{ color: "var(--violet)" }} />
            <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "13px", color: "var(--text)" }}>some-random-cat</span>
          </div>
          <button onClick={() => setMobileOpen(true)} style={{ background: "var(--bg3)", border: "1px solid var(--border2)", color: "var(--text2)", cursor: "pointer", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontFamily: "Inter, sans-serif" }}>
            Menu
          </button>
        </div>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div className="px-8 md:px-14 pt-14 pb-12" style={{ borderBottom: "1px solid var(--border)" }}>
          {/* badges */}
          <div className="flex items-center gap-2 mb-6">
            <Badge>npm package</Badge>
            <Badge color="green">v2.4.0 stable</Badge>
          </div>

          {/* heading */}
          <h1 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--text)", marginBottom: "14px" }}>
            some-random-cat
          </h1>

          <p style={{ color: "var(--text2)", fontSize: "15px", maxWidth: "460px", lineHeight: 1.85, marginBottom: "28px" }}>
            A lightweight TypeScript library for generating random content — cats, dogs, jokes, memes, advice, facts, and more.
          </p>

          {/* feature chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { icon: <Cat size={13} />,          label: "Cat images" },
              { icon: <Dog size={13} />,          label: "Dog images" },
              { icon: <Laugh size={13} />,        label: "Jokes" },
              { icon: <Image size={13} />,        label: "Memes" },
              { icon: <Lightbulb size={13} />,    label: "Advice" },
              { icon: <MessageCircle size={13} />,label: "Topics" },
              { icon: <Hash size={13} />,         label: "UUID gen" },
              { icon: <Zap size={13} />,          label: "TypeScript" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-[12.5px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-150"
                style={{ background: "var(--bg3)", border: "1px solid var(--border2)", color: "var(--text2)" }}>
                <span style={{ color: "var(--violet)" }}>{icon}</span>
                {label}
              </span>
            ))}
          </div>

          {/* install command */}
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{ background: "var(--bg3)", border: "1px solid var(--border2)", maxWidth: "100%" }}>
            <Code2 size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />
            <code style={{ fontFamily: "Geist Mono, monospace", fontSize: "13px", color: "var(--text)" }}>
              npm install some-random-cat
            </code>
            <button onClick={copyInstall}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono flex-shrink-0 transition-colors duration-200"
              style={{
                background: installCopied ? "rgba(34,197,94,0.1)" : "var(--bg4)",
                border: `1px solid ${installCopied ? "rgba(34,197,94,0.3)" : "var(--border2)"}`,
                color: installCopied ? "var(--green)" : "var(--text2)",
                cursor: "pointer",
              }}>
              {installCopied ? <Check size={11} /> : <Copy size={11} />}
              {installCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* ── CONTENT ──────────────────────────────────────────────── */}
        <div className="px-8 md:px-14 pb-24">

          {/* GETTING STARTED */}
          {active === "getting-started" && (
            <div className="pt-12">
              <SectionHeader icon={<BookOpen size={16} />} title="Getting Started" desc="Up and running in under a minute — install, import one class, and start fetching content." />

              <div className="flex flex-col gap-7 mb-12">
                {[
                  { step: "01", icon: <Package size={15} />,  title: "Install",             text: "Add the package to your project.", code: `<span class="nb">npm install some-random-cat</span>\n<span class="cm"># or with yarn / pnpm</span>\n<span class="nb">yarn add some-random-cat</span>`,  lang: "bash" },
                  { step: "02", icon: <FileCode size={15} />, title: "Import",              text: "Three named exports — pick what you need.", code: `<span class="cm">// CommonJS</span>\n<span class="kw">const</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } = <span class="fn">require</span>(<span class="str">'some-random-cat'</span>);\n\n<span class="cm">// ESM / TypeScript</span>\n<span class="kw">import</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } <span class="kw">from</span> <span class="str">'some-random-cat'</span>;`, lang: "javascript" },
                  { step: "03", icon: <Cat size={15} />,      title: "Fetch a random cat", text: "All Random methods are async — use await or .then().", code: `<span class="kw">const</span> <span class="nb">cat</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getCat</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">url</span>);   <span class="cm">// https://cdn2.thecatapi.com/...</span>\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">width</span>); <span class="cm">// 640</span>`, lang: "javascript" },
                  { step: "04", icon: <Hash size={15} />,     title: "Generate a UUID",    text: "Generation methods are synchronous — no await.", code: `<span class="kw">const</span> <span class="nb">id</span>  = <span class="fn">Generation</span>.<span class="fn">generateId</span>({ putDash: <span class="kw">true</span> });\n<span class="cm">// "a1b2c3d4-e5f6-4789-yabc-def012345678"</span>\n\n<span class="kw">const</span> <span class="nb">acr</span> = <span class="fn">Generation</span>.<span class="fn">getAcronym</span>(<span class="str">'World Health Organization'</span>);\n<span class="cm">// "WHO"</span>`, lang: "javascript" },
                ].map((s, i) => (
                  <div key={s.step} className="flex gap-5 fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--bg3)", border: "1px solid var(--border2)", color: "var(--violet)" }}>
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "var(--muted)" }}>{s.step}</span>
                        <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "14px", color: "var(--text)" }}>{s.title}</p>
                      </div>
                      <p style={{ color: "var(--text2)", fontSize: "13.5px", marginBottom: "10px" }}>{s.text}</p>
                      <CodeBlock code={s.code} lang={s.lang} />
                    </div>
                  </div>
                ))}
              </div>

              {/* divider */}
              <div style={{ height: "1px", background: "var(--border)", margin: "0 0 32px" }} />

              <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "14px", color: "var(--text)", marginBottom: "16px" }}>
                What's included
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: <Layers size={16} />,   title: "Object-Oriented",  text: "Three focused static classes — Random, Generation, Util.", iconColor: "var(--violet)" },
                  { icon: <Zap size={16} />,      title: "TypeScript-First", text: "Full type declarations and exported interfaces included.", iconColor: "var(--sky)" },
                  { icon: <Dices size={16} />,    title: "Promise-Based",    text: "Async methods return typed Promises. Works great with await.", iconColor: "#f472b6" },
                  { icon: <Globe size={16} />,    title: "Multi-API",        text: "Cat API, dog.ceo, AdviceSlip and more — one interface.", iconColor: "var(--green)" },
                ].map((f, i) => (
                  <div key={f.title} className="rounded-xl p-4 fade-up" style={{ background: "var(--bg2)", border: "1px solid var(--border2)", animationDelay: `${i * 60}ms` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: "var(--bg3)", color: f.iconColor }}>
                      {f.icon}
                    </div>
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "12.5px", color: "var(--text)", marginBottom: "5px" }}>{f.title}</p>
                    <p style={{ fontSize: "12.5px", color: "var(--text2)", lineHeight: 1.65 }}>{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INTERFACES */}
          {active === "interfaces" && (
            <div className="pt-12">
              <SectionHeader icon={<Braces size={16} />} title="Interfaces" desc="TypeScript interfaces exported by the package — the shape of every object returned by the API." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {interfaces.map((iface, i) => (
                  <div key={iface.name} className="rounded-xl overflow-hidden fade-up" style={{ background: "var(--bg2)", border: "1px solid var(--border2)", animationDelay: `${i * 50}ms` }}>
                    {/* card header */}
                    <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg3)" }}>
                      <Braces size={14} style={{ color: "var(--violet)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "13.5px", color: "var(--text)" }}>{iface.name}</span>
                      <Badge>interface</Badge>
                    </div>
                    {/* props */}
                    <div className="px-4 py-2">
                      {iface.props.map(prop => (
                        <div key={prop.key} className="flex items-baseline justify-between gap-3 py-2.5"
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "12.5px", color: "var(--text)" }}>
                            {prop.key}{"optional" in prop && prop.optional && <span style={{ color: "var(--muted)" }}>?</span>}
                          </span>
                          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "11px", color: "var(--sky)", flexShrink: 0 }}>{prop.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "random" && (
            <div className="pt-12">
              <SectionHeader icon={<Shuffle size={16} />} title="Random" desc="All methods are static and async — they return Promises and call external APIs. Do not instantiate." />
              <ClassSection icon={<Shuffle size={18} />} name="Random" desc="Wraps multiple external APIs into one uniform async interface." tags={["class", "@static"]} methods={randomMethods} />
            </div>
          )}

          {active === "generation" && (
            <div className="pt-12">
              <SectionHeader icon={<Wand2 size={16} />} title="Generation" desc="Synchronous string utilities. Static methods — no await, no network calls." />
              <ClassSection icon={<Wand2 size={18} />} name="Generation" desc="UUID generation, acronym extraction, and text truncation." tags={["class", "@static"]} methods={generationMethods} />
            </div>
          )}

          {active === "util" && (
            <div className="pt-12">
              <SectionHeader icon={<Wrench size={16} />} title="Util" desc="A tiny helper for reading the package's own metadata at runtime." />
              <ClassSection icon={<Wrench size={18} />} name="Util" desc="Exposes version, author, repo URL, and description from package.json." tags={["class", "@static"]} methods={utilMethods} />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <div className="px-8 md:px-14 py-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Cat size={13} style={{ color: "var(--muted)" }} />
              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "11.5px", color: "var(--muted)" }}>
                some-random-cat · v2.4.0 · ISC License · Aktindo
              </span>
            </div>
            <div className="flex gap-1">
              {[
                { label: "GitHub",  icon: <GitBranch size={13} />, href: "https://github.com/aktindo/some-random-cat" },
                { label: "npm",     icon: <Package size={13} />,   href: "https://www.npmjs.com/package/some-random-cat" },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg no-underline text-[12px] transition-colors duration-150"
                  style={{ color: "var(--muted)", fontFamily: "Inter, sans-serif" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--bg3)"; el.style.color = "var(--text)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--muted)"; }}>
                  {l.icon}{l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
