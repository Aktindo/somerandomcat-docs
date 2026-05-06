"use client";

import { useState } from "react";
import CodeBlock from "./components/CodeBlock";
import ClassCard from "./components/ClassCard";
import {
  navSections,
  interfaces,
  randomMethods,
  generationMethods,
  utilMethods,
} from "./data";

type SectionId = "getting-started" | "interfaces" | "random" | "generation" | "util";

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

  const navTo = (id: SectionId) => {
    setActiveSection(id);
    setMobileNavOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] flex flex-col z-40 transition-transform duration-200 md:relative md:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "var(--bg2)", borderRight: "1px solid var(--border)" }}
      >
        <div className="px-6 py-7" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0" style={{ background: "linear-gradient(135deg, #ff6b35, #ffaa5e)" }}>🐱</div>
            <div>
              <div className="font-extrabold text-[15px] tracking-tight text-white leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>some-random-cat</div>
              <span className="text-[10px] px-1.5 py-0.5 rounded mt-0.5 inline-block" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--accent)", background: "rgba(255,107,53,0.12)" }}>v2.4.0</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto pb-10">
          {navSections.map((section) => (
            <div key={section.label} className="px-4 pt-5 pb-1">
              <div className="text-[10px] uppercase tracking-widest px-2 mb-1.5" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--muted)" }}>{section.label}</div>
              {section.items.map((item) => {
                const isActive = !("href" in item) && activeSection === item.id;
                if ("href" in item && item.href) {
                  return (
                    <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] transition-all duration-150 no-underline w-full"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background="rgba(255,107,53,0.1)"; (e.currentTarget as HTMLElement).style.color="var(--accent2)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="var(--muted)"; }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--border)" }} />{item.label}
                    </a>
                  );
                }
                return (
                  <button key={item.id} onClick={() => navTo(item.id as SectionId)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] transition-all duration-150 w-full text-left"
                    style={{ background: isActive ? "rgba(255,107,53,0.1)" : "transparent", color: isActive ? "var(--accent2)" : "var(--muted)", border: "none", cursor: "pointer" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-150" style={{ background: isActive ? "var(--accent)" : "var(--border)" }} />
                    <span className="flex-1">{item.label}</span>
                    {"chip" in item && item.chip && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-medium ml-auto" style={{ fontFamily: "JetBrains Mono, monospace", ...("chipType" in item && item.chipType === "async" ? { background: "rgba(61,255,207,0.1)", color: "var(--teal)" } : { background: "rgba(180,133,245,0.15)", color: "var(--purple)" }) }}>{item.chip}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {mobileNavOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileNavOpen(false)} />}

      {/* MAIN */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 sticky top-0 z-20" style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🐱</span>
            <span className="font-bold text-sm text-white" style={{ fontFamily: "Syne, sans-serif" }}>some-random-cat</span>
          </div>
          <button onClick={() => setMobileNavOpen(true)} className="text-sm px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,107,53,0.1)", color: "var(--accent)" }}>Menu</button>
        </div>

        {/* Hero */}
        <div className="relative px-8 md:px-16 py-20" style={{ borderBottom: "1px solid var(--border)", background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,107,53,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 20%, rgba(61,255,207,0.04) 0%, transparent 70%)" }}>
          <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--accent)" }}>
            <span className="w-7 h-px inline-block" style={{ background: "var(--accent)" }} />
            npm package · v2.4.0
          </div>
          <h1 className="font-extrabold tracking-tight text-white mb-5" style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1.05, letterSpacing: "-1.5px" }}>
            some-random-<span style={{ color: "var(--accent)" }}>cat</span>
          </h1>
          <p className="text-base mb-9 max-w-[520px] leading-[1.8]" style={{ color: "var(--muted)" }}>
            A lightweight TypeScript library for generating random content — cats, dogs, jokes, memes, advice, facts, and more. Object-oriented, async-first, and beginner-friendly.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[{ label: "🐱 Cat images", c: "orange" }, { label: "🎲 Random content", c: "teal" }, { label: "⚡ TypeScript", c: "purple" }, { label: "🔑 UUID generation", c: "orange" }, { label: "💬 Jokes & Facts", c: "teal" }].map((b) => (
              <span key={b.label} className="text-[11px] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5" style={{ fontFamily: "JetBrains Mono, monospace", ...(b.c === "orange" ? { border: "1px solid rgba(255,107,53,0.4)", color: "var(--accent2)", background: "rgba(255,107,53,0.06)" } : b.c === "teal" ? { border: "1px solid rgba(61,255,207,0.3)", color: "var(--teal)", background: "rgba(61,255,207,0.06)" } : { border: "1px solid rgba(176,133,245,0.3)", color: "var(--purple)", background: "rgba(176,133,245,0.06)" }) }}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Install strip */}
        <div className="mx-8 md:mx-16 my-8 rounded-xl px-5 py-4 flex items-center gap-3.5" style={{ background: "var(--code-bg)", border: "1px solid var(--border)" }}>
          <span className="text-[11px] whitespace-nowrap" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--muted)" }}>INSTALL</span>
          <code className="text-[13px] flex-1" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--teal)" }}>
            <span style={{ color: "var(--muted)" }}>$</span> npm install some-random-cat
          </code>
          <button onClick={handleInstallCopy} className="text-[11px] px-3 py-1.5 rounded-md transition-all duration-150 whitespace-nowrap" style={{ fontFamily: "JetBrains Mono, monospace", background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.25)", color: installCopied ? "var(--teal)" : "var(--accent)", cursor: "pointer" }}>
            {installCopied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Content area */}
        <div className="px-8 md:px-16 pb-20">

          {activeSection === "getting-started" && (
            <div className="pt-14">
              <SectionHeader tag="Overview" title="Getting Started" desc="Install the package and start generating random content in minutes." />
              <div className="flex flex-col gap-5 mb-8">
                {[
                  { num: 1, title: "Install via npm or yarn", text: "Add the package to your project using your preferred package manager.", code: `<span class="nb">npm install some-random-cat</span>\n<span class="cm"># or</span>\n<span class="nb">yarn add some-random-cat</span>`, lang: "bash", copy: false },
                  { num: 2, title: "Import a class", text: "The package exports three classes. Import whichever you need.", code: `<span class="cm">// CommonJS</span>\n<span class="kw">const</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } = <span class="fn">require</span>(<span class="str">'some-random-cat'</span>);\n\n<span class="cm">// ES Modules / TypeScript</span>\n<span class="kw">import</span> { <span class="fn">Random</span>, <span class="fn">Generation</span>, <span class="fn">Util</span> } <span class="kw">from</span> <span class="str">'some-random-cat'</span>;`, lang: "javascript", copy: true },
                  { num: 3, title: "Fetch a random cat 🐱", text: "All Random methods return Promises — use async/await or .then().", code: `<span class="kw">const</span> { <span class="fn">Random</span> } = <span class="fn">require</span>(<span class="str">'some-random-cat'</span>);\n\n<span class="cm">// async / await</span>\n<span class="kw">const</span> <span class="nb">cat</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getCat</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">url</span>); <span class="cm">// https://cdn2.thecatapi.com/images/...</span>\n\n<span class="cm">// .then() style</span>\n<span class="fn">Random</span>.<span class="fn">getCat</span>()\n  .<span class="fn">then</span>(<span class="nb">cat</span> => <span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">url</span>))\n  .<span class="fn">catch</span>(<span class="nb">err</span> => <span class="nb">console</span>.<span class="fn">error</span>(<span class="nb">err</span>));`, lang: "javascript", copy: true },
                  { num: 4, title: "Use static utilities", text: "Generation methods are synchronous and need no await.", code: `<span class="kw">const</span> { <span class="fn">Generation</span> } = <span class="fn">require</span>(<span class="str">'some-random-cat'</span>);\n\n<span class="kw">const</span> <span class="nb">id</span>  = <span class="fn">Generation</span>.<span class="fn">generateId</span>({ putDash: <span class="kw">true</span> });\n<span class="cm">// "a1b2c3d4-e5f6-4789-yabc-def012345678"</span>\n\n<span class="kw">const</span> <span class="nb">acr</span> = <span class="fn">Generation</span>.<span class="fn">getAcronym</span>(<span class="str">'National Aeronautics and Space Administration'</span>);\n<span class="cm">// "NASA"</span>`, lang: "javascript", copy: true },
                ].map((step) => (
                  <div key={step.num} className="flex gap-4 fade-up">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5" style={{ fontFamily: "Syne, sans-serif", background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.3)", color: "var(--accent)" }}>{step.num}</div>
                    <div className="flex-1">
                      <div className="font-bold text-base text-white mb-1.5" style={{ fontFamily: "Syne, sans-serif" }}>{step.title}</div>
                      <div className="text-[13.5px] mb-2.5" style={{ color: "var(--muted)" }}>{step.text}</div>
                      <CodeBlock code={step.code} lang={step.lang} showCopy={step.copy} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-7">
                {[
                  { icon: "📦", title: "Object-Oriented", text: "Three clean static classes — Random, Generation, and Util — each with a clear responsibility." },
                  { icon: "⚡", title: "TypeScript-First", text: "Full type declarations and interface definitions ship with the package out of the box." },
                  { icon: "🔄", title: "Promise-Based", text: "All network calls return typed Promises and play nicely with async/await patterns." },
                  { icon: "🌐", title: "Multiple APIs", text: "Aggregates The Cat API, dog.ceo, AdviceSlip, and others into one consistent interface." },
                ].map((f) => (
                  <div key={f.title} className="rounded-xl p-5 fade-up" style={{ background: "var(--bg3)", border: "1px solid var(--border)" }}>
                    <div className="text-[22px] mb-2.5">{f.icon}</div>
                    <div className="font-bold text-sm text-white mb-1.5" style={{ fontFamily: "Syne, sans-serif" }}>{f.title}</div>
                    <div className="text-[13px]" style={{ color: "var(--muted)" }}>{f.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "interfaces" && (
            <div className="pt-14">
              <SectionHeader tag="Type Definitions" title="Interfaces" desc="All TypeScript interfaces exported by the package. These describe the shape of objects returned by the API methods." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {interfaces.map((iface) => (
                  <div key={iface.name} className="rounded-xl p-5 fade-up" style={{ background: "var(--bg3)", border: "1px solid var(--border)" }}>
                    <div className="font-bold text-[15px] mb-3.5 flex items-center gap-2" style={{ fontFamily: "Syne, sans-serif", color: "var(--teal)" }}>
                      <span className="text-[10px] font-normal" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--muted)" }}>interface</span>
                      {iface.name}
                    </div>
                    {iface.props.map((prop) => (
                      <div key={prop.key} className="flex justify-between items-baseline py-1.5 gap-2.5 text-[12.5px]" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--text)" }}>
                          {prop.key}{"optional" in prop && prop.optional && <span style={{ color: "var(--muted)" }}>?</span>}
                        </span>
                        <span className="text-[11.5px]" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--teal)" }}>{prop.type}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "random" && (
            <div className="pt-14">
              <SectionHeader tag="Class" title="Random" desc="The main class. All methods are static and async — they return Promises and hit external APIs. Do not instantiate this class." />
              <ClassCard icon="🎲" iconColor="orange" name="Random" desc="Manages all random-content fetching methods. Wraps multiple external APIs into one uniform interface." tags={["class", "@static"]} methods={randomMethods} />
            </div>
          )}

          {activeSection === "generation" && (
            <div className="pt-14">
              <SectionHeader tag="Class" title="Generation" desc="Synchronous utility methods for generating strings and text transformations. All methods are static — no await needed." />
              <ClassCard icon="🔑" iconColor="purple" name="Generation" desc="Manages all generation methods — UUID creation, acronym extraction, and text shortening." tags={["class", "@static"]} methods={generationMethods} />
            </div>
          )}

          {activeSection === "util" && (
            <div className="pt-14">
              <SectionHeader tag="Class" title="Util" desc="A small helper class for introspecting the package itself. All methods are static." />
              <ClassCard icon="🛠" iconColor="teal" name="Util" desc="Provides package metadata — version, author, repository URL, and description — read directly from package.json." tags={["class", "@static"]} methods={utilMethods} />
            </div>
          )}

        </div>

        <footer className="mx-8 md:mx-16 py-6 flex flex-wrap justify-between items-center gap-3" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="text-[12.5px]" style={{ color: "var(--muted)" }}>some-random-cat · v2.4.0 · ISC License · by Aktindo</span>
          <div className="flex gap-4">
            <a href="https://github.com/aktindo/some-random-cat" target="_blank" rel="noopener noreferrer" className="text-[11px] no-underline" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--accent)" }}>GitHub ↗</a>
            <a href="https://www.npmjs.com/package/some-random-cat" target="_blank" rel="noopener noreferrer" className="text-[11px] no-underline" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--accent)" }}>npm ↗</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SectionHeader({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="mb-8">
      <div className="text-[10px] uppercase tracking-widest mb-2" style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--accent)" }}>{tag}</div>
      <h2 className="text-[30px] font-extrabold tracking-tight text-white mb-2.5" style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.8px" }}>{title}</h2>
      <p className="text-[14.5px] max-w-[600px]" style={{ color: "var(--muted)" }}>{desc}</p>
    </div>
  );
}
