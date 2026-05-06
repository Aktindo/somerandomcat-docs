"use client";

import { useState } from "react";
import { Button, Card, Chip, Separator, ScrollShadow } from "@heroui/react";
import {
  BookOpen, Braces, Shuffle, Key, Wrench, Package, GitFork,
  Layers, FileCode2, Zap, Globe, Menu, X, Terminal, Scale,
  Rocket, Copy, Check, ArrowUpRight
} from "lucide-react";
import CodeBlock from "./components/CodeBlock";
import { navSections, interfaces, randomMethods, generationMethods, utilMethods } from "./data";

type SectionId = "getting-started" | "interfaces" | "random" | "generation" | "util";

// ── helpers ────────────────────────────────────────────────────────────────
const RETURN_COLORS: Record<string, string> = {
  "async":   "rgba(56,189,248,0.12)",
  "static":  "rgba(124,111,255,0.12)",
  "class":   "rgba(167,139,250,0.12)",
  "@static": "rgba(124,111,255,0.12)",
};

const NAV_ICONS: Record<string, React.ReactNode> = {
  "getting-started": <Rocket size={14} />,
  "interfaces":      <Braces size={14} />,
  "random":          <Shuffle size={14} />,
  "generation":      <Key size={14} />,
  "util":            <Wrench size={14} />,
  "npm":             <Package size={14} />,
  "github":          <GitFork size={14} />,
};

const CLASS_ICONS: Record<string, React.ReactNode> = {
  "🎲": <Shuffle size={20} />,
  "🔑": <Key size={20} />,
  "🛠️": <Wrench size={20} />,
};

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  "🏗️": <Layers size={22} />,
  "🔷": <FileCode2 size={22} />,
  "⚡": <Zap size={22} />,
  "🌐": <Globe size={22} />,
};

function SectionHeader({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="mb-10">
      <Chip size="sm" variant="soft" color="accent" className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em]">{tag}</Chip>
      <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)", marginBottom: "10px" }}>{title}</h2>
      <p style={{ color: "var(--muted)", fontSize: "14px", maxWidth: "560px", lineHeight: 1.8 }}>{desc}</p>
    </div>
  );
}

function MethodBlock({ modifier, name, params, returns, desc, params_table, code, lang = "javascript" }: any) {
  return (
    <div className="px-6 py-6" style={{ borderBottom: "1px solid var(--border)" }}>
      {/* signature */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {modifier && (
          <span className="font-mono text-[11px] px-2 py-0.5 rounded-md" style={{ background: "rgba(124,111,255,0.12)", color: "var(--violet2)" }}>{modifier}</span>
        )}
        <span className="font-mono text-[14px] font-semibold" style={{ color: "var(--text)" }}>{name}</span>
        <span className="font-mono text-[13px]" style={{ color: "var(--muted)" }}>{params}</span>
        <span style={{ color: "var(--subtle)", fontSize: "12px" }}>→</span>
        <span className="font-mono text-[11px] px-2 py-0.5 rounded-md" style={{ background: "rgba(74,222,128,0.1)", color: "var(--green)" }}>{returns}</span>
      </div>
      {/* desc */}
      <p className="text-[13.5px] leading-relaxed mb-4" style={{ color: "var(--muted)" }} dangerouslySetInnerHTML={{ __html: desc }} />
      {/* params table */}
      {params_table?.length > 0 && (
        <div className="rounded-xl overflow-hidden mb-4" style={{ border: "1px solid var(--border)", background: "var(--bg2)" }}>
          <table className="w-full text-[12.5px] border-collapse">
            <thead>
              <tr>
                {["Parameter","Type","Required","Description"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--subtle)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {params_table.map((p: any) => (
                <tr key={p.name}>
                  <td className="px-4 py-2.5 font-mono" style={{ color: "var(--sky)" }}>{p.name}</td>
                  <td className="px-4 py-2.5 font-mono" style={{ color: "var(--violet2)" }}>{p.type}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: "var(--muted)" }}>{p.required}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--muted)" }} dangerouslySetInnerHTML={{ __html: p.desc }} />
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

function ClassSection({ icon, name, desc, tags, methods }: { icon: string; name: string; desc: string; tags: string[]; methods: any[] }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-8 fade-up" style={{ background: "var(--bg2)", border: "1px solid var(--border2)" }}>
      {/* class header */}
      <div className="px-6 py-5 flex items-start gap-4" style={{ background: "rgba(124,111,255,0.06)", borderBottom: "1px solid var(--border)" }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,111,255,0.12)", color: "var(--violet2)" }}>
          {CLASS_ICONS[icon] ?? icon}
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--text)" }}>{name}</h3>
          <p className="text-[13px] mb-2.5" style={{ color: "var(--muted)" }}>{desc}</p>
          <div className="flex gap-1.5 flex-wrap">
            {tags.map(t => (
              <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-md"
                style={t === "@static"
                  ? { background: "rgba(124,111,255,0.12)", color: "var(--violet2)" }
                  : { background: "rgba(167,139,250,0.1)", color: "var(--violet2)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      {methods.map(m => <MethodBlock key={m.name} {...m} />)}
    </div>
  );
}

// ── main ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("getting-started");
  const [installCopied, setInstallCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm install some-random-cat").then(() => {
      setInstallCopied(true);
      setTimeout(() => setInstallCopied(false), 1600);
    });
  };

  const navTo = (id: SectionId) => { setActiveSection(id); setMobileOpen(false); };

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[252px] flex flex-col z-40 transition-transform duration-200 md:relative md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "var(--bg2)", borderRight: "1px solid var(--border)" }}
      >
        {/* wordmark */}
        <div className="px-5 py-6" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--violet)", color: "#fff" }}>🐱</div>
            <div>
              <p className="text-[13.5px] font-bold tracking-tight" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--text)" }}>some-random-cat</p>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: "rgba(124,111,255,0.12)", color: "var(--violet2)" }}>v2.4.0</span>
            </div>
          </div>
        </div>

        {/* nav */}
        <ScrollShadow className="flex-1 overflow-y-auto py-3">
          {navSections.map((section) => (
            <div key={section.label} className="px-3 mb-3">
              <p className="text-[10px] uppercase tracking-[0.12em] font-mono px-2 mb-1.5" style={{ color: "var(--subtle)" }}>{section.label}</p>
              {section.items.map((item) => {
                const isActive = !("href" in item) && activeSection === item.id;
                if ("href" in item && item.href) {
                  return (
                    <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" className="no-underline flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] transition-all duration-150 mb-0.5" style={{ color: "var(--muted)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124,111,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
                      <span className="flex-shrink-0 opacity-60">{NAV_ICONS[item.id] ?? null}</span>
                      <span className="flex-1">{item.label}</span>
                    </a>
                  );
                }
                return (
                  <button key={item.id} onClick={() => navTo(item.id as SectionId)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] w-full text-left transition-all duration-150 mb-0.5"
                    style={{
                      background: isActive ? "rgba(124,111,255,0.1)" : "transparent",
                      color: isActive ? "var(--violet2)" : "var(--muted)",
                      border: "none", cursor: "pointer",
                      fontWeight: isActive ? 600 : 400,
                    }}>
                    <span className="flex-shrink-0 transition-all duration-150" style={{ opacity: isActive ? 1 : 0.5 }}>
                      {NAV_ICONS[item.id] ?? null}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {"chip" in item && item.chip && (
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-md"
                        style={"chipType" in item && item.chipType === "async"
                          ? { background: "rgba(56,189,248,0.1)", color: "var(--sky)" }
                          : { background: "rgba(124,111,255,0.1)", color: "var(--violet2)" }}>
                        {item.chip}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </ScrollShadow>

        {/* sidebar footer */}
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center gap-1.5">
            <Scale size={12} style={{ color: "var(--subtle)" }} />
            <span className="font-mono text-[11px]" style={{ color: "var(--subtle)" }}>ISC · Aktindo</span>
          </div>
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }} title="Latest" />
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 md:hidden" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setMobileOpen(false)} />}

      {/* ── MAIN ── */}
      <main className="flex-1 min-w-0 overflow-x-hidden">

        {/* mobile topbar */}
        <div className="md:hidden flex items-center justify-between px-5 py-3.5 sticky top-0 z-20" style={{ background: "rgba(13,13,20,0.9)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center gap-2">
            <span>🐱</span>
            <span className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--text)" }}>some-random-cat</span>
          </div>
          <button onClick={() => setMobileOpen(true)} style={{ background: "rgba(124,111,255,0.1)", border: "1px solid rgba(124,111,255,0.2)", color: "var(--violet2)", borderRadius: "10px", padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            <Menu size={15} /><span className="text-[12px] font-mono">Menu</span>
          </button>
        </div>

        {/* ── HERO ── */}
        <div className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>

          <div className="relative">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-full" style={{ background: "rgba(124,111,255,0.1)", border: "1px solid rgba(124,111,255,0.2)", color: "var(--violet2)" }}>npm package</span>
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "var(--green)" }}>v2.4.0 stable</span>
            </div>

            <h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(38px, 6vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--text)", marginBottom: "20px" }}>
              some-random-<span style={{ color: "var(--violet2)" }}>cat</span>
            </h1>

            <p style={{ color: "var(--muted)", fontSize: "15px", maxWidth: "480px", lineHeight: 1.85, marginBottom: "36px" }}>
              A lightweight TypeScript library for generating random content — cats, dogs, jokes, memes, advice, facts, and more.
            </p>

            <div className="flex flex-wrap gap-2">
              {[["🐱","Cat images"],["🐶","Dog images"],["😂","Jokes"],["🖼️","Memes"],["💡","Advice"],["⚡","TypeScript"]].map(([e, l]) => (
                <span key={l} className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--muted)" }}
                  onMouseEnter={el => { (el.currentTarget as HTMLElement).style.borderColor = "rgba(124,111,255,0.3)"; (el.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={el => { (el.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (el.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
                  {e} {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── INSTALL STRIP ── */}
        <div className="mx-8 md:mx-16 my-8 rounded-2xl px-5 py-3.5 flex items-center gap-4" style={{ background: "var(--bg2)", border: "1px solid var(--border2)" }}>
          <div className="flex items-center gap-1.5 flex-shrink-0 px-2 py-1 rounded-lg" style={{ background: "rgba(74,222,128,0.08)", color: "var(--green)", border: "1px solid rgba(74,222,128,0.15)" }}>
            <Terminal size={12} />
            <span className="font-mono text-[10px]">install</span>
          </div>
          <code className="text-[13px] flex-1 font-mono" style={{ color: "var(--text)" }}>
            <span style={{ color: "var(--subtle)" }}>$</span>&nbsp;npm install some-random-cat
          </code>
          <button
            onClick={copyInstall}
            className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-200 flex-shrink-0 flex items-center gap-1.5"
            style={{
              background: installCopied ? "rgba(74,222,128,0.1)" : "rgba(124,111,255,0.1)",
              border: `1px solid ${installCopied ? "rgba(74,222,128,0.25)" : "rgba(124,111,255,0.2)"}`,
              color: installCopied ? "var(--green)" : "var(--violet2)",
              cursor: "pointer",
            }}
          >
            {installCopied ? <><Check size={12} />Copied</> : <><Copy size={12} />Copy</>}
          </button>
        </div>

        {/* ── CONTENT ── */}
        <div className="px-8 md:px-16 pb-24">

          {/* GETTING STARTED */}
          {activeSection === "getting-started" && (
            <div className="pt-12">
              <SectionHeader tag="Overview" title="Getting Started" desc="Up and running in under a minute — install the package and start pulling random content." />

              <div className="flex flex-col gap-7 mb-12">
                {[
                  { num: "01", title: "Install", text: "Add to your project with npm, yarn, or pnpm.", code: `<span class="nb">npm install some-random-cat</span>\n<span class="cm"># or with yarn / pnpm</span>\n<span class="nb">yarn add some-random-cat</span>`, lang: "bash" },
                  { num: "02", title: "Import a class", text: "Three named exports — pick what you need.", code: `<span class="cm">// CommonJS</span>\n<span class="kw">const</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } = <span class="fn">require</span>(<span class="str">'some-random-cat'</span>);\n\n<span class="cm">// ESM / TypeScript</span>\n<span class="kw">import</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } <span class="kw">from</span> <span class="str">'some-random-cat'</span>;`, lang: "javascript" },
                  { num: "03", title: "Fetch a random cat 🐱", text: "All Random methods are async — use await or .then().", code: `<span class="kw">const</span> <span class="nb">cat</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getCat</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">url</span>);   <span class="cm">// https://cdn2.thecatapi.com/...</span>\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">width</span>); <span class="cm">// 640</span>`, lang: "javascript" },
                  { num: "04", title: "Generate a UUID", text: "Generation methods are synchronous — no await needed.", code: `<span class="kw">const</span> <span class="nb">id</span> = <span class="fn">Generation</span>.<span class="fn">generateId</span>({ putDash: <span class="kw">true</span> });\n<span class="cm">// "a1b2c3d4-e5f6-4789-yabc-def012345678"</span>\n\n<span class="kw">const</span> <span class="nb">short</span> = <span class="fn">Generation</span>.<span class="fn">getAcronym</span>(<span class="str">'World Health Organization'</span>);\n<span class="cm">// "WHO"</span>`, lang: "javascript" },
                ].map((step, i) => (
                  <div key={step.num} className="flex gap-5 fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-mono text-[11px] font-bold mt-0.5"
                      style={{ background: "var(--bg3)", border: "1px solid var(--border2)", color: "var(--violet2)" }}>{step.num}</div>
                    <div className="flex-1">
                      <p className="font-bold text-[15px] mb-1" style={{ color: "var(--text)" }}>{step.title}</p>
                      <p className="text-[13.5px] mb-3" style={{ color: "var(--muted)" }}>{step.text}</p>
                      <CodeBlock code={step.code} lang={step.lang} />
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <p className="font-bold text-sm mt-8 mb-4" style={{ color: "var(--text)" }}>What's included</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: "🏗️", title: "Object-Oriented", text: "Three focused static classes — Random, Generation, Util.", color: "rgba(124,111,255,0.08)", border: "rgba(124,111,255,0.15)", iconColor: "var(--violet2)" },
                  { icon: "🔷", title: "TypeScript-First", text: "Ships with full type declarations and exported interfaces.", color: "rgba(56,189,248,0.06)", border: "rgba(56,189,248,0.15)", iconColor: "var(--sky)" },
                  { icon: "⚡", title: "Promise-Based", text: "Async methods return typed Promises, plays well with await.", color: "rgba(244,114,182,0.06)", border: "rgba(244,114,182,0.15)", iconColor: "var(--pink)" },
                  { icon: "🌐", title: "Multi-API", text: "Cat API, dog.ceo, AdviceSlip — all in one interface.", color: "rgba(74,222,128,0.06)", border: "rgba(74,222,128,0.15)", iconColor: "var(--green)" },
                ].map((f, i) => (
                  <div key={f.title} className="rounded-2xl p-5 fade-up" style={{ background: f.color, border: `1px solid ${f.border}`, animationDelay: `${i * 50}ms` }}>
                    <div className="mb-3" style={{ color: f.iconColor }}>{FEATURE_ICONS[f.icon]}</div>
                    <p className="font-semibold text-sm mb-1.5" style={{ color: "var(--text)" }}>{f.title}</p>
                    <p className="text-[12.5px] leading-relaxed" style={{ color: "var(--muted)" }}>{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INTERFACES */}
          {activeSection === "interfaces" && (
            <div className="pt-12">
              <SectionHeader tag="Types" title="Interfaces" desc="TypeScript interfaces exported by the package — these describe the shape of every object returned by the API." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {interfaces.map((iface, i) => (
                  <div key={iface.name} className="rounded-2xl overflow-hidden fade-up" style={{ background: "var(--bg2)", border: "1px solid var(--border2)", animationDelay: `${i * 50}ms` }}>
                    <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)", background: "rgba(124,111,255,0.04)" }}>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(124,111,255,0.1)", color: "var(--violet)" }}>interface</span>
                      <span className="font-bold text-[14px]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{iface.name}</span>
                    </div>
                    <div className="px-5 py-3">
                      {iface.props.map(prop => (
                        <div key={prop.key} className="flex items-baseline justify-between gap-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <span className="font-mono text-[12.5px]" style={{ color: "var(--text)" }}>
                            {prop.key}{"optional" in prop && prop.optional && <span style={{ color: "var(--subtle)" }}>?</span>}
                          </span>
                          <span className="font-mono text-[11px] flex-shrink-0" style={{ color: "var(--violet2)" }}>{prop.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "random" && (
            <div className="pt-12">
              <SectionHeader tag="Class" title="Random" desc="All methods are static and async — they hit external APIs and return typed Promises. Do not instantiate." />
              <ClassSection icon="🎲" name="Random" desc="Wraps multiple external APIs into one consistent async interface." tags={["class","@static"]} methods={randomMethods} />
            </div>
          )}

          {activeSection === "generation" && (
            <div className="pt-12">
              <SectionHeader tag="Class" title="Generation" desc="Synchronous string utilities. Static methods — no await, no network calls." />
              <ClassSection icon="🔑" name="Generation" desc="UUID generation, acronym extraction, and text truncation." tags={["class","@static"]} methods={generationMethods} />
            </div>
          )}

          {activeSection === "util" && (
            <div className="pt-12">
              <SectionHeader tag="Class" title="Util" desc="A tiny helper for reading the package's own metadata at runtime." />
              <ClassSection icon="🛠️" name="Util" desc="Exposes version, author, repo, and description directly from package.json." tags={["class","@static"]} methods={utilMethods} />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <div className="mx-8 md:mx-16 py-6 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[12px]" style={{ color: "var(--subtle)" }}>some-random-cat · v2.4.0 · ISC License · Aktindo</span>
            <div className="flex gap-1.5">
              {([[<GitFork size={13} />, "GitHub", "https://github.com/aktindo/some-random-cat"],[<Package size={13} />, "npm", "https://www.npmjs.com/package/some-random-cat"]] as [React.ReactNode, string, string][]).map(([icon, l, h]) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[12px] px-3 py-1.5 rounded-lg no-underline transition-all duration-150 flex items-center gap-1.5"
                  style={{ color: "var(--muted)", background: "transparent" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124,111,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "var(--violet2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
                  {icon}{l} <ArrowUpRight size={11} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
