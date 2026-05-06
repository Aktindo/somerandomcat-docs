"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Chip,
  Separator,
  ScrollShadow,
  Badge,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipRoot,
} from "@heroui/react";
import CodeBlock from "./components/CodeBlock";
import {
  navSections,
  interfaces,
  randomMethods,
  generationMethods,
  utilMethods,
} from "./data";

type SectionId = "getting-started" | "interfaces" | "random" | "generation" | "util";

// ─── helpers ───────────────────────────────────────────────────────────────
const METHOD_TAG: Record<string, { variant: "soft" | "secondary" | "primary" | "tertiary"; color: "default" | "success" | "accent" | "warning" | "danger" }> = {
  "class":   { variant: "soft", color: "warning" },
  "@static": { variant: "soft", color: "accent" },
  "interface": { variant: "soft", color: "success" },
};

// ─── sub-components ────────────────────────────────────────────────────────
function SectionHeader({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="mb-10">
      <Chip size="sm" variant="soft" color="accent" className="mb-3 font-mono uppercase tracking-widest">{tag}</Chip>
      <h2 className="text-3xl font-extrabold tracking-tight text-white mb-3" style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.8px" }}>{title}</h2>
      <p className="text-[14.5px] max-w-[600px] leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
    </div>
  );
}

function MethodBlock({ modifier, name, params, returns, desc, params_table, code, lang = "javascript" }: any) {
  return (
    <div className="px-6 py-5 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
      {/* Signature row */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {modifier && <Chip size="sm" variant="soft" color="accent" className="font-mono">{modifier}</Chip>}
        <span className="font-mono text-sm font-semibold" style={{ color: "var(--accent2)" }}>{name}</span>
        <span className="font-mono text-sm" style={{ color: "var(--muted)" }}>{params}</span>
        <span style={{ color: "var(--border)" }}>→</span>
        <Chip size="sm" variant="soft" color="success" className="font-mono">{returns}</Chip>
      </div>
      {/* Description */}
      <p className="text-[13.5px] leading-relaxed mb-3" style={{ color: "var(--muted)" }} dangerouslySetInnerHTML={{ __html: desc }} />
      {/* Params table */}
      {params_table?.length > 0 && (
        <div className="rounded-lg overflow-hidden mb-3" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full text-[12.5px] border-collapse">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                {["Parameter", "Type", "Required", "Description"].map(h => (
                  <th key={h} className="text-left px-3 py-2 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {params_table.map((p: any) => (
                <tr key={p.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td className="px-3 py-2 font-mono" style={{ color: "var(--accent2)" }}>{p.name}</td>
                  <td className="px-3 py-2 font-mono" style={{ color: "var(--teal)" }}>{p.type}</td>
                  <td className="px-3 py-2 font-mono" style={{ color: "var(--muted)" }}>{p.required}</td>
                  <td className="px-3 py-2" style={{ color: "var(--muted)" }} dangerouslySetInnerHTML={{ __html: p.desc }} />
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
    <Card variant="default" className="mb-7 overflow-hidden fade-up" style={{ background: "var(--bg3)", borderColor: "var(--border)" }}>
      <Card.Header className="flex items-start gap-4 px-6 py-5" style={{ background: "rgba(255,255,255,0.015)", borderBottom: "1px solid var(--border)" }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 mt-0.5" style={{ background: "rgba(255,107,53,0.15)" }}>{icon}</div>
        <div className="flex-1 min-w-0">
          <Card.Title className="text-lg font-bold text-white mb-1" style={{ fontFamily: "Syne, sans-serif" }}>{name}</Card.Title>
          <Card.Description className="text-[13px] mb-2.5" style={{ color: "var(--muted)" }}>{desc}</Card.Description>
          <div className="flex gap-1.5 flex-wrap">
            {tags.map(t => {
              const s = METHOD_TAG[t] || METHOD_TAG["class"];
              return <Chip key={t} size="sm" variant={s.variant} color={s.color} className="font-mono text-[10px]">{t}</Chip>;
            })}
          </div>
        </div>
      </Card.Header>
      <Card.Content className="p-0">
        {methods.map(m => <MethodBlock key={m.name} {...m} />)}
      </Card.Content>
    </Card>
  );
}

// ─── main page ─────────────────────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("getting-started");
  const [installCopied, setInstallCopied] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleInstallCopy = () => {
    navigator.clipboard.writeText("npm install some-random-cat").then(() => {
      setInstallCopied(true);
      setTimeout(() => setInstallCopied(false), 1500);
    });
  };

  const navTo = (id: SectionId) => { setActiveSection(id); setMobileNavOpen(false); };

  return (
    <div className="flex min-h-screen">

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] flex flex-col z-40 transition-transform duration-200 md:relative md:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "var(--bg2)", borderRight: "1px solid var(--border)" }}
      >
        {/* Logo */}
        <div className="px-5 py-6" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "linear-gradient(135deg, #ff6b35, #ffaa5e)" }}>🐱</div>
            <div>
              <p className="font-extrabold text-sm tracking-tight text-white leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>some-random-cat</p>
              <Chip size="sm" variant="soft" color="warning" className="font-mono text-[10px] mt-0.5">v2.4.0</Chip>
            </div>
          </div>
        </div>

        {/* Nav */}
        <ScrollShadow className="flex-1 py-2 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label} className="px-3 pt-4 pb-1">
              <p className="text-[10px] uppercase tracking-widest px-2 mb-1 font-mono" style={{ color: "var(--muted)" }}>{section.label}</p>
              {section.items.map((item) => {
                const isActive = !("href" in item) && activeSection === item.id;
                if ("href" in item && item.href) {
                  return (
                    <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" className="no-underline block">
                      <Button variant="ghost" size="sm" className="w-full justify-start text-[13px] mb-0.5" style={{ color: "var(--muted)" }}>
                        <span className="w-1.5 h-1.5 rounded-full mr-1 flex-shrink-0" style={{ background: "var(--border)" }} />
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
                    className={`w-full justify-start text-[13px] mb-0.5 ${isActive ? "font-medium" : ""}`}
                    style={isActive ? { color: "var(--accent2)" } : { color: "var(--muted)" }}
                    onClick={() => navTo(item.id as SectionId)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full mr-1 flex-shrink-0 transition-colors" style={{ background: isActive ? "var(--accent)" : "var(--border)" }} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {"chip" in item && item.chip && (
                      <Chip size="sm" variant="soft" color={"chipType" in item && item.chipType === "async" ? "success" : "accent"} className="font-mono text-[9px] ml-auto">{item.chip}</Chip>
                    )}
                  </Button>
                );
              })}
            </div>
          ))}
        </ScrollShadow>

        {/* Sidebar footer */}
        <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-[11px] font-mono" style={{ color: "var(--muted)" }}>ISC License · by Aktindo</p>
        </div>
      </aside>

      {mobileNavOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileNavOpen(false)} />}

      {/* ── MAIN ── */}
      <main className="flex-1 min-w-0 overflow-x-hidden">

        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-5 py-3.5 sticky top-0 z-20" style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🐱</span>
            <span className="font-bold text-sm text-white" style={{ fontFamily: "Syne, sans-serif" }}>some-random-cat</span>
          </div>
          <Button size="sm" variant="outline" onClick={() => setMobileNavOpen(true)}>Menu</Button>
        </div>

        {/* ── HERO ── */}
        <div className="relative px-8 md:px-16 py-20" style={{ borderBottom: "1px solid var(--border)", background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,107,53,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 20%, rgba(61,255,207,0.04) 0%, transparent 70%)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Chip size="sm" variant="soft" color="warning" className="font-mono uppercase tracking-widest text-[10px]">npm package · v2.4.0</Chip>
          </div>
          <h1 className="font-extrabold tracking-tight text-white mb-5" style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 1.05, letterSpacing: "-1.5px" }}>
            some-random-<span style={{ color: "var(--accent)" }}>cat</span>
          </h1>
          <p className="text-[15px] mb-9 max-w-[520px] leading-[1.85]" style={{ color: "var(--muted)" }}>
            A lightweight TypeScript library for generating random content — cats, dogs, jokes, memes, advice, facts, and more. Object-oriented, async-first, and beginner-friendly.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "🐱 Cat images", color: "warning" as const },
              { label: "🎲 Random content", color: "success" as const },
              { label: "⚡ TypeScript", color: "accent" as const },
              { label: "🔑 UUID generation", color: "warning" as const },
              { label: "💬 Jokes & Facts", color: "success" as const },
            ].map(b => (
              <Chip key={b.label} size="md" variant="soft" color={b.color} className="font-mono">{b.label}</Chip>
            ))}
          </div>
        </div>

        {/* ── INSTALL STRIP ── */}
        <div className="mx-8 md:mx-16 my-8 rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: "var(--code-bg)", border: "1px solid var(--border)" }}>
          <Chip size="sm" variant="soft" color="default" className="font-mono uppercase tracking-widest text-[10px] flex-shrink-0">install</Chip>
          <code className="text-[13px] flex-1 font-mono" style={{ color: "var(--teal)" }}>
            <span style={{ color: "var(--muted)" }}>$</span> npm install some-random-cat
          </code>
          <Button
            size="sm"
            variant={installCopied ? "secondary" : "outline"}
            onClick={handleInstallCopy}
            className="font-mono text-[11px] flex-shrink-0"
          >
            {installCopied ? "Copied ✓" : "Copy"}
          </Button>
        </div>

        {/* ── CONTENT ── */}
        <div className="px-8 md:px-16 pb-20">

          {/* GETTING STARTED */}
          {activeSection === "getting-started" && (
            <div className="pt-14">
              <SectionHeader tag="Overview" title="Getting Started" desc="Install the package and start generating random content in minutes." />

              {/* Steps */}
              <div className="flex flex-col gap-6 mb-10">
                {[
                  { num: 1, title: "Install via npm or yarn", text: "Add the package to your project using your preferred package manager.", code: `<span class="nb">npm install some-random-cat</span>\n<span class="cm"># or</span>\n<span class="nb">yarn add some-random-cat</span>`, lang: "bash" },
                  { num: 2, title: "Import a class", text: "The package exports three classes — import whichever you need.", code: `<span class="cm">// CommonJS</span>\n<span class="kw">const</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } = <span class="fn">require</span>(<span class="str">'some-random-cat'</span>);\n\n<span class="cm">// ES Modules / TypeScript</span>\n<span class="kw">import</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } <span class="kw">from</span> <span class="str">'some-random-cat'</span>;`, lang: "javascript" },
                  { num: 3, title: "Fetch a random cat 🐱", text: "All Random methods return Promises — use async/await or .then().", code: `<span class="kw">const</span> { <span class="fn">Random</span> } = <span class="fn">require</span>(<span class="str">'some-random-cat'</span>);\n\n<span class="kw">const</span> <span class="nb">cat</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getCat</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">url</span>); <span class="cm">// https://cdn2.thecatapi.com/images/...</span>`, lang: "javascript" },
                  { num: 4, title: "Use static utilities", text: "Generation methods are synchronous and need no await.", code: `<span class="kw">const</span> { <span class="fn">Generation</span> } = <span class="fn">require</span>(<span class="str">'some-random-cat'</span>);\n\n<span class="kw">const</span> <span class="nb">id</span> = <span class="fn">Generation</span>.<span class="fn">generateId</span>({ putDash: <span class="kw">true</span> });\n<span class="cm">// "a1b2c3d4-e5f6-4789-yabc-def012345678"</span>`, lang: "javascript" },
                ].map(step => (
                  <div key={step.num} className="flex gap-5 fade-up">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5" style={{ fontFamily: "Syne, sans-serif", background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.3)", color: "var(--accent)" }}>{step.num}</div>
                    <div className="flex-1">
                      <p className="font-bold text-base text-white mb-1.5" style={{ fontFamily: "Syne, sans-serif" }}>{step.title}</p>
                      <p className="text-[13.5px] mb-2.5" style={{ color: "var(--muted)" }}>{step.text}</p>
                      <CodeBlock code={step.code} lang={step.lang} />
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-8" />

              {/* Feature cards */}
              <p className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Why use this package?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: "📦", title: "Object-Oriented", text: "Three clean static classes — Random, Generation, and Util — each with a clear responsibility." },
                  { icon: "⚡", title: "TypeScript-First", text: "Full type declarations and interface definitions ship with the package out of the box." },
                  { icon: "🔄", title: "Promise-Based", text: "All network calls return typed Promises and play nicely with async/await patterns." },
                  { icon: "🌐", title: "Multiple APIs", text: "Aggregates The Cat API, dog.ceo, AdviceSlip, and others into one consistent interface." },
                ].map(f => (
                  <Card key={f.title} variant="secondary" className="p-5 fade-up">
                    <div className="text-2xl mb-3">{f.icon}</div>
                    <Card.Title className="text-sm font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>{f.title}</Card.Title>
                    <Card.Description className="text-[13px]" style={{ color: "var(--muted)" }}>{f.text}</Card.Description>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* INTERFACES */}
          {activeSection === "interfaces" && (
            <div className="pt-14">
              <SectionHeader tag="Type Definitions" title="Interfaces" desc="All TypeScript interfaces exported by the package. These describe the shape of objects returned by the API methods." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {interfaces.map(iface => (
                  <Card key={iface.name} variant="secondary" className="fade-up">
                    <Card.Header className="px-5 pt-5 pb-3">
                      <div className="flex items-center gap-2">
                        <Chip size="sm" variant="soft" color="default" className="font-mono text-[10px]">interface</Chip>
                        <Card.Title className="font-bold text-[15px]" style={{ color: "var(--teal)", fontFamily: "Syne, sans-serif" }}>{iface.name}</Card.Title>
                      </div>
                    </Card.Header>
                    <Card.Content className="px-5 pb-5 pt-0">
                      {iface.props.map(prop => (
                        <div key={prop.key} className="flex justify-between items-baseline py-2 gap-3 text-[12.5px]" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <span className="font-mono" style={{ color: "var(--text)" }}>
                            {prop.key}{"optional" in prop && prop.optional && <span style={{ color: "var(--muted)" }}>?</span>}
                          </span>
                          <span className="font-mono text-[11.5px] flex-shrink-0" style={{ color: "var(--teal)" }}>{prop.type}</span>
                        </div>
                      ))}
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* RANDOM */}
          {activeSection === "random" && (
            <div className="pt-14">
              <SectionHeader tag="Class" title="Random" desc="The main class. All methods are static and async — they return Promises and hit external APIs. Do not instantiate this class." />
              <ClassSection icon="🎲" name="Random" desc="Manages all random-content fetching methods. Wraps multiple external APIs into one uniform interface." tags={["class", "@static"]} methods={randomMethods} />
            </div>
          )}

          {/* GENERATION */}
          {activeSection === "generation" && (
            <div className="pt-14">
              <SectionHeader tag="Class" title="Generation" desc="Synchronous utility methods for generating strings and text transformations. No await needed." />
              <ClassSection icon="🔑" name="Generation" desc="Manages all generation methods — UUID creation, acronym extraction, and text shortening." tags={["class", "@static"]} methods={generationMethods} />
            </div>
          )}

          {/* UTIL */}
          {activeSection === "util" && (
            <div className="pt-14">
              <SectionHeader tag="Class" title="Util" desc="A small helper class for introspecting the package itself. All methods are static." />
              <ClassSection icon="🛠" name="Util" desc="Provides package metadata — version, author, repository URL, and description — read directly from package.json." tags={["class", "@static"]} methods={utilMethods} />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <Separator />
        <footer className="mx-8 md:mx-16 py-6 flex flex-wrap justify-between items-center gap-3">
          <span className="text-[12.5px] font-mono" style={{ color: "var(--muted)" }}>some-random-cat · v2.4.0 · ISC License · by Aktindo</span>
          <div className="flex gap-2">
            <a href="https://github.com/aktindo/some-random-cat" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] no-underline" style={{color:"var(--accent)"}}>GitHub ↗</a>
            <a href="https://www.npmjs.com/package/some-random-cat" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] no-underline" style={{color:"var(--accent)"}}>npm ↗</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
