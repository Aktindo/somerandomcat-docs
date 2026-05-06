type NavItem =
  | { id: string; label: string; chip?: string; chipType?: string; href?: never; external?: never }
  | { id: string; label: string; href: string; external: boolean; chip?: never; chipType?: never };

type NavSection = { label: string; items: NavItem[] };

export const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { id: "getting-started", label: "Getting Started" },
      { id: "interfaces", label: "Interfaces" },
    ],
  },
  {
    label: "Classes",
    items: [
      { id: "random", label: "Random", chip: "async", chipType: "async" },
      { id: "generation", label: "Generation", chip: "static", chipType: "static" },
      { id: "util", label: "Util", chip: "static", chipType: "static" },
    ],
  },
  {
    label: "Links",
    items: [
      { id: "npm", label: "npm package ↗", href: "https://www.npmjs.com/package/some-random-cat", external: true },
      { id: "github", label: "GitHub ↗", href: "https://github.com/aktindo/some-random-cat", external: true },
    ],
  },
];

export const interfaces = [
  {
    name: "Cat",
    props: [
      { key: "breeds", type: "Array<any>" },
      { key: "id", type: "string" },
      { key: "url", type: "string" },
      { key: "width", type: "number" },
      { key: "weight", type: "number" },
    ],
  },
  {
    name: "Advice",
    props: [
      { key: "id", type: "number" },
      { key: "advice", type: "string" },
    ],
  },
  {
    name: "Joke",
    props: [
      { key: "title", type: "string" },
      { key: "body", type: "string" },
      { key: "url", type: "string" },
    ],
  },
  {
    name: "Meme",
    props: [
      { key: "endpoint", type: "string" },
      { key: "img", type: "string" },
      { key: "title", type: "string" },
      { key: "upvotes", type: "number" },
      { key: "downvotes", type: "number" },
      { key: "upvoteRatio", type: "number" },
      { key: "author", type: "string" },
      { key: "comments", type: "number" },
      { key: "text", type: "string" },
      { key: "post", type: "string" },
    ],
  },
  {
    name: "generateIdProps",
    props: [
      { key: "putDash", type: "boolean", optional: true },
    ],
  },
];

export const randomMethods = [
  {
    modifier: "static async",
    name: "getAdvice",
    params: "()",
    returns: "Promise<Advice | null>",
    desc: "Fetches a random piece of advice from the AdviceSlip API. Returns an <code>Advice</code> object containing a numeric ID and the advice text.",
    code: `<span class="kw">const</span> <span class="nb">advice</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getAdvice</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">advice</span>.<span class="nb">id</span>);     <span class="cm">// 42</span>\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">advice</span>.<span class="nb">advice</span>); <span class="cm">// "Don't worry, be happy."</span>`,
    lang: "javascript",
  },
  {
    modifier: "static async",
    name: "getCat",
    params: "()",
    returns: "Promise<Cat | null>",
    desc: "Returns a random cat image from The Cat API. The returned object contains a direct image URL, dimensions, and optional breed data.",
    code: `<span class="kw">const</span> <span class="nb">cat</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getCat</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">url</span>);   <span class="cm">// "https://cdn2.thecatapi.com/images/abc.jpg"</span>\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">cat</span>.<span class="nb">width</span>); <span class="cm">// 600</span>`,
    lang: "javascript",
  },
  {
    modifier: "static async",
    name: "getDog",
    params: "()",
    returns: "Promise<string | null>",
    desc: "Fetches a random dog image URL from the dog.ceo API. Returns a plain string URL rather than an object.",
    code: `<span class="kw">const</span> <span class="nb">dogUrl</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getDog</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">dogUrl</span>); <span class="cm">// "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg"</span>`,
    lang: "javascript",
  },
  {
    modifier: "static async",
    name: "getFact",
    params: "()",
    returns: "Promise<string | null>",
    desc: "Returns a random interesting fact as a plain string.",
    code: `<span class="kw">const</span> <span class="nb">fact</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getFact</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">fact</span>); <span class="cm">// "Honey never spoils."</span>`,
    lang: "javascript",
  },
  {
    modifier: "static async",
    name: "getJoke",
    params: "()",
    returns: "Promise<Joke | null>",
    desc: "Retrieves a random joke with a title, body text, and source URL.",
    code: `<span class="kw">const</span> <span class="nb">joke</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getJoke</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">joke</span>.<span class="nb">title</span>); <span class="cm">// "Why did the chicken cross the road?"</span>\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">joke</span>.<span class="nb">body</span>);  <span class="cm">// "To get to the other side."</span>`,
    lang: "javascript",
  },
  {
    modifier: "static async",
    name: "getMeme",
    params: "(sub: string)",
    returns: "Promise<Meme | null>",
    desc: `Fetches a random meme from a given subreddit. Provide just the subreddit name (without <code>r/</code>). Returns full meme metadata including vote counts.`,
    params_table: [
      { name: "sub", type: "string", required: "Yes", desc: `Subreddit name, e.g. <code>"memes"</code>` },
    ],
    code: `<span class="kw">const</span> <span class="nb">meme</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getMeme</span>(<span class="str">'memes'</span>);\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">meme</span>.<span class="nb">title</span>);   <span class="cm">// post title</span>\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">meme</span>.<span class="nb">img</span>);     <span class="cm">// image URL</span>\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">meme</span>.<span class="nb">upvotes</span>); <span class="cm">// 1024</span>`,
    lang: "javascript",
  },
  {
    modifier: "static async",
    name: "getString",
    params: "(number: number)",
    returns: "Promise<string | null>",
    desc: `Generates a cryptographically random string of the given length. Throws a <code>TypeError</code> if no number is supplied.`,
    params_table: [
      { name: "number", type: "number", required: "Yes", desc: "Desired length of the output string" },
    ],
    code: `<span class="kw">const</span> <span class="nb">str</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getString</span>(<span class="nb">16</span>);\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">str</span>); <span class="cm">// "aB3xQz9mKpLwRtYu"</span>`,
    lang: "javascript",
  },
  {
    modifier: "static async",
    name: "getTopic",
    params: "()",
    returns: "Promise<string | null>",
    desc: "Returns a random conversation topic as a plain string. Useful for icebreakers, chatbots, or Discord bots.",
    code: `<span class="kw">const</span> <span class="nb">topic</span> = <span class="kw">await</span> <span class="fn">Random</span>.<span class="fn">getTopic</span>();\n<span class="nb">console</span>.<span class="fn">log</span>(<span class="nb">topic</span>); <span class="cm">// "What's your favourite travel memory?"</span>`,
    lang: "javascript",
  },
];

export const generationMethods = [
  {
    modifier: "static",
    name: "generateId",
    params: "(ops: generateIdProps)",
    returns: "string",
    desc: `Generates a UUID v4-style identifier. Pass <code>{ putDash: true }</code> to get the standard hyphenated format, or <code>{ putDash: false }</code> for a compact 32-character string.`,
    params_table: [
      { name: "ops", type: "generateIdProps", required: "Yes", desc: `Options object. Set <code>putDash</code> to control UUID format.` },
    ],
    code: `<span class="cm">// With dashes (standard UUID format)</span>\n<span class="fn">Generation</span>.<span class="fn">generateId</span>({ putDash: <span class="kw">true</span> });\n<span class="cm">// → "a1b2c3d4-e5f6-4789-yabc-def012345678"</span>\n\n<span class="cm">// Without dashes (compact)</span>\n<span class="fn">Generation</span>.<span class="fn">generateId</span>({ putDash: <span class="kw">false</span> });\n<span class="cm">// → "a1b2c3d4e5f647xy..."</span>`,
    lang: "javascript",
  },
  {
    modifier: "static",
    name: "getAcronym",
    params: "(name: string)",
    returns: "string",
    desc: `Extracts an acronym from a multi-word string. Possessives (e.g. <code>'s</code>) are stripped before processing. Returns an empty string if the input is not a valid string.`,
    params_table: [
      { name: "name", type: "string", required: "Yes", desc: "The phrase to extract initials from" },
    ],
    code: `<span class="fn">Generation</span>.<span class="fn">getAcronym</span>(<span class="str">'National Aeronautics and Space Administration'</span>);\n<span class="cm">// → "NASA"</span>\n\n<span class="fn">Generation</span>.<span class="fn">getAcronym</span>(<span class="str">'World Health Organization'</span>);\n<span class="cm">// → "WHO"</span>`,
    lang: "javascript",
  },
  {
    modifier: "",
    name: "shorten",
    params: "(text: string, length: number)",
    returns: "string",
    desc: `Truncates a string to the given max length and appends <code>...</code>. If the text is already within the limit it is returned unchanged. Returns an empty string for non-string inputs.<br/><br/><strong style="color:#ff6b35;font-size:12px;">⚠ Note:</strong> <span style="font-size:13px;color:#7a7a90">This is an <em>instance</em> method, not static — you must <code>new Generation()</code> to use it.</span>`,
    params_table: [
      { name: "text", type: "string", required: "Yes", desc: "The text to truncate" },
      { name: "length", type: "number", required: "Yes", desc: "Maximum character length before truncation" },
    ],
    code: `<span class="kw">const</span> <span class="nb">gen</span> = <span class="kw">new</span> <span class="fn">Generation</span>();\n<span class="nb">gen</span>.<span class="fn">shorten</span>(<span class="str">'Hello, this is a very long sentence!'</span>, <span class="nb">10</span>);\n<span class="cm">// → "Hello, thi..."</span>\n\n<span class="nb">gen</span>.<span class="fn">shorten</span>(<span class="str">'Short'</span>, <span class="nb">20</span>);\n<span class="cm">// → "Short"  (unchanged — within limit)</span>`,
    lang: "javascript",
  },
];

export const utilMethods = [
  {
    modifier: "static",
    name: "getInfo",
    params: "()",
    returns: "object",
    desc: `Returns a plain object with the package's current metadata as declared in <code>package.json</code>.`,
    code: `<span class="fn">Util</span>.<span class="fn">getInfo</span>();\n<span class="cm">// →</span>\n<span class="cm">// {</span>\n<span class="cm">//   version:     "2.4.0",</span>\n<span class="cm">//   author:      "Aktindo",</span>\n<span class="cm">//   repo:        { type: "git", url: "https://github.com/aktindo/some-random-cat.git" },</span>\n<span class="cm">//   description: "A very suitable API to generate random images..."</span>\n<span class="cm">// }</span>`,
    lang: "javascript",
  },
];
