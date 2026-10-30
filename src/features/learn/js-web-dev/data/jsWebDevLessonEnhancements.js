/** Per-lesson objectives, scenarios, and append blocks for JS Web Dev (main + extended). */

import { callout, text, diagram, table } from "../../js-fundamentals/data/jsCurriculumHelpers";

export const LESSON_ENHANCEMENTS = {
  "jsweb-0": {
    objectives: [
      "Define the DOM and its role in interactive pages",
      "Picture HTML as a tree of nodes in memory",
      "Explain how JavaScript updates what users see",
    ],
    scenario:
      "You load a news site and headlines update live as stories arrive. The browser keeps a DOM tree in memory — JavaScript edits that tree to refresh content without reloading.",
    append: [
      text(
        "Open DevTools → Elements to see the live tree. Every tag becomes a node with parent/child links.",
        {
          label: "Inspect the live DOM",
          content: `const heading = document.querySelector("h1");
console.log(heading.textContent);
heading.textContent = "Updated headline";`,
        },
      ),
    ],
  },
  "jsweb-1": {
    objectives: [
      "Select elements with querySelector and querySelectorAll",
      "Use CSS selectors for id, class, and attributes",
      "Handle null when no match exists",
    ],
    scenario:
      "A dashboard has a sidebar, main panel, and notification badge. Selectors let you grab each region before wiring events or updating text.",
    append: [
      text(
        "Compound selectors target nested structure: `main .card button` finds buttons inside cards in main.",
        {
          label: "Practical selectors",
          content: `const badge = document.querySelector("[data-notifications]");
const cards = document.querySelectorAll(".dashboard .card");
console.log(cards.length);`,
        },
      ),
    ],
  },
  "jsweb-2": {
    objectives: [
      "Update textContent and attributes on elements",
      "Create and append new nodes with createElement",
      "Remove nodes when data is deleted",
    ],
    scenario:
      "A comment thread loads new replies from an API. You create `<div>` nodes, set textContent safely, and append them to the thread container.",
    append: [
      text(
        "createElement builds nodes off-screen; appendChild attaches them. Removing uses `element.remove()`.",
        {
          label: "Create and append",
          content: `const list = document.querySelector("#comments");
const row = document.createElement("div");
row.textContent = "New comment";
list.appendChild(row);`,
        },
      ),
    ],
  },
  "jsweb-3": {
    objectives: [
      "Register listeners with addEventListener",
      "Name common events: click, input, submit",
      "Remove listeners when components unmount",
    ],
    scenario:
      "A music player needs play/pause on button click and volume on slider input. Event listeners connect user actions to your code.",
    append: [
      text(
        "Named handler functions let you remove listeners later — important for SPAs that swap views.",
        {
          label: "Named listener",
          content: `function onPlay() { console.log("playing"); }
const btn = document.querySelector("#play");
btn.addEventListener("click", onPlay);
btn.removeEventListener("click", onPlay);`,
        },
      ),
    ],
  },
  "jsweb-4": {
    objectives: [
      "Read event.type, target, and currentTarget",
      "Call preventDefault on forms and links",
      "Pass event data into handler logic",
    ],
    scenario:
      "A search form should not reload the page on Enter. preventDefault in the submit handler keeps users on the same document while you fetch results.",
    append: [
      text(
        "The event object is your bridge between browser behavior and custom logic.",
        {
          label: "Submit with preventDefault",
          content: `form.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = e.target.querySelector("[name=q]").value;
  console.log("Search:", q);
});`,
        },
      ),
    ],
  },
  "jsweb-5": {
    objectives: [
      "Explain event bubbling",
      "Delegate clicks from a parent container",
      "Use closest to match dynamic children",
    ],
    scenario:
      "An email inbox adds rows as messages arrive. One listener on `<tbody>` handles star/unstar for every row — present and future.",
    append: [
      text(
        "Delegation avoids memory leaks from forgotten listeners on removed nodes.",
        {
          label: "Table row delegation",
          content: `tbody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (!row) return;
  row.classList.toggle("starred");
});`,
        },
      ),
    ],
  },
  "jsweb-6": {
    objectives: [
      "Read values from inputs, selects, and checkboxes",
      "Serialize form fields to an object",
      "Use FormData in real browser forms",
    ],
    scenario:
      "A checkout form collects shipping address and gift-wrap option. You read all fields into one payload object before POSTing to the server.",
    append: [
      text(
        "FormData in the browser collects every named control automatically on submit.",
        {
          label: "FormData pattern",
          content: `form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  console.log(data);
});`,
        },
      ),
    ],
  },
  "jsweb-7": {
    objectives: [
      "Validate required fields and formats client-side",
      "Return structured error objects per field",
      "Validate before fetch — never trust the browser alone",
    ],
    scenario:
      "A signup form must reject empty emails and passwords under 8 characters with inline error messages before enabling submit.",
    append: [
      text(
        "Return `{ valid, errors }` so the UI can highlight specific fields instead of one generic alert.",
        {
          label: "Field-level errors",
          content: `function validate({ email, password }) {
  const errors = {};
  if (!email.includes("@")) errors.email = "Invalid email";
  if (password.length < 8) errors.password = "Too short";
  return { valid: Object.keys(errors).length === 0, errors };
}`,
        },
      ),
    ],
  },
  "jsweb-8": {
    objectives: [
      "Show inline errors and loading states",
      "Disable submit while a request is in flight",
      "Communicate success and failure clearly",
    ],
    scenario:
      "Users double-click Save and create duplicate orders. Disabling the button during fetch and showing 'Saving…' prevents duplicate submissions.",
    append: [
      text(
        "Model form UI as state: idle → loading → success | error. Render the button label from state.status.",
        {
          label: "Form status reducer",
          content: `// status: 'idle' | 'loading' | 'success' | 'error'
function onSubmit(state) {
  return { ...state, status: "loading" };
}`,
        },
      ),
    ],
  },
  "jsweb-9": {
    objectives: [
      "Call fetch and await the Response",
      "Parse JSON from response.json()",
      "Distinguish GET and POST requests",
    ],
    scenario:
      "A weather widget calls `/api/forecast` and displays temperature. fetch + async/await is the standard pattern for browser HTTP.",
    append: [
      text(
        "fetch returns a Promise. Always check response.ok before assuming success.",
        {
          label: "Basic GET fetch",
          content: `async function loadForecast() {
  const res = await fetch("/api/forecast");
  const data = await res.json();
  console.log(data.temp);
}`,
        },
      ),
    ],
  },
  "jsweb-10": {
    objectives: [
      "Parse and stringify JSON safely",
      "Map API snake_case to camelCase in UI state",
      "Send JSON POST bodies with correct headers",
    ],
    scenario:
      "A blog API returns `{ post_title, author_name }`. You parse JSON once and map fields to camelCase for your render functions.",
    append: [
      text(
        "Set Content-Type for JSON POSTs so the server parses the body correctly.",
        {
          label: "POST JSON",
          content: `await fetch("/api/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello" }),
});`,
        },
      ),
    ],
  },
  "jsweb-11": {
    objectives: [
      "Check response.ok and HTTP status codes",
      "Wrap fetch in try/catch for network errors",
      "Show friendly error messages in the UI",
    ],
    scenario:
      "An API returns 503 during maintenance. Your app catches the failure, logs details, and shows 'Try again in a few minutes' instead of a blank screen.",
    append: [
      text(
        "Network failures throw; HTTP 404/500 still return a Response — check both layers.",
        {
          label: "Robust fetch wrapper",
          content: `async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}`,
        },
      ),
    ],
  },
  "jsweb-12": {
    objectives: [
      "Save and load strings with localStorage",
      "Persist objects using JSON.stringify",
      "Wrap storage in testable helper functions",
    ],
    scenario:
      "A theme toggle remembers dark mode across visits. localStorage keeps the preference string between sessions on the same origin.",
    append: [
      text(
        "Never store secrets in localStorage — any script on the page can read it.",
        {
          label: "Theme persistence",
          content: `function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}
const theme = localStorage.getItem("theme") || "light";`,
        },
      ),
    ],
  },
  "jsweb-13": {
    objectives: [
      "Keep one source of truth for app data",
      "Update state immutably with spread and map",
      "Re-render the DOM when state changes",
    ],
    scenario:
      "A cart page shows item count in the header and line items in the body. One state object drives both regions through a render function.",
    append: [
      text(
        "Immutable updates make change detection simple — compare old and new state references.",
        {
          label: "Immutable cart update",
          content: `function addItem(state, item) {
  return { items: [...state.items, item] };
}`,
        },
      ),
    ],
  },
  "jsweb-14": {
    objectives: [
      "Combine DOM, events, fetch, storage, and state",
      "Plan a small app with clear layers",
      "Ship logic in the playground then in real HTML",
    ],
    scenario:
      "You build a bookmark manager: validate URLs, store in localStorage, render a list, delete on delegated click — the full browser app loop.",
    append: [
      text(
        "Capstone flow: define state shape → write reducers → render → wire events → persist.",
        {
          label: "Mini app layers",
          content: `// state → reducer(state, action) → render(state) → saveState(state)`,
        },
      ),
    ],
  },
  "jsweb-15": {
    objectives: [
      "Explain hash vs history API routing",
      "Map URL paths to views without full reload",
      "Listen for popstate and hashchange events",
    ],
    scenario:
      "A docs site has /guide, /api, and /changelog views. Users click nav links and the URL changes while only the main panel re-renders — classic SPA routing.",
    append: [
      text(
        "Hash routing (`#/settings`) needs no server config. History API (`pushState`) gives clean URLs but requires server fallback to index.html.",
        {
          label: "Simple path router",
          content: `const routes = { "/": "home", "/settings": "settings" };
function render(path) {
  const view = routes[path] || "not-found";
  document.querySelector("#app").dataset.view = view;
}
window.addEventListener("popstate", () => render(location.pathname));`,
        },
      ),
      diagram("SPA view swap", [
        { id: "url", label: "URL changes", color: "#6366f1", items: ["pushState", "hashchange"] },
        { id: "router", label: "Router", color: "#3b82f6", items: ["Match path", "Pick view name"] },
        { id: "render", label: "Render", color: "#22c55e", items: ["Update #app", "No full reload"] },
      ]),
    ],
  },
  "jsweb-16": {
    objectives: [
      "Build reusable validator functions",
      "Aggregate field errors into one object",
      "Block submit until validation passes",
    ],
    scenario:
      "A team invite form needs email format, role selection, and optional message length limits. Reusable validators keep the submit handler readable.",
    append: [
      text(
        "Compose small validators: `required`, `minLength`, `isEmail` — run all and merge errors.",
        {
          label: "Validator pipeline",
          content: `function runValidators(values, rules) {
  const errors = {};
  for (const [field, checks] of Object.entries(rules)) {
    for (const check of checks) {
      const msg = check(values[field]);
      if (msg) { errors[field] = msg; break; }
    }
  }
  return errors;
}`,
        },
      ),
      table("Validation building blocks", ["Rule", "Returns", "Example"], [
        ["required", "Error if empty", "This field is required"],
        ["minLength(n)", "Error if too short", "At least 8 characters"],
        ["isEmail", "Error if no @", "Enter a valid email"],
      ]),
    ],
  },
  "jsweb-17": {
    objectives: [
      "Handle network errors and non-ok HTTP status",
      "Return typed results: success, error, loading",
      "Retry failed requests with backoff",
    ],
    scenario:
      "A stock ticker fetch fails on flaky Wi-Fi. Your wrapper retries twice, then surfaces a user-friendly error with a Retry button.",
    append: [
      text(
        "Separate transport errors (no response) from HTTP errors (4xx/5xx). Map each to a UI state.",
        {
          label: "Fetch with retry",
          content: `async function fetchWithRetry(fn, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fn();
      if (!res.ok) throw new Error("HTTP " + res.status);
      return { ok: true, data: await res.json() };
    } catch (err) {
      if (i === retries) return { ok: false, error: err.message };
    }
  }
}`,
        },
      ),
      callout(
        "warning",
        "Log full error details to the console for developers; show short messages in the UI for users.",
      ),
    ],
  },
  "jsweb-18": {
    objectives: [
      "Model dashboard state: items, filter, status",
      "Render stats cards and a filterable table",
      "Handle load, success, and error in one reducer",
    ],
    scenario:
      "An admin mini-dashboard loads user stats from an API, shows loading skeletons, filters by role, and saves the last filter to localStorage.",
    append: [
      text(
        "Dashboard capstone ties fetch error handling, state reducer, and DOM render into one flow.",
        {
          label: "Dashboard state shape",
          content: `const state = {
  status: "idle",
  items: [],
  filter: "all",
  error: null,
};
// load → loading, success → ready + items, fail → error`,
        },
      ),
      callout(
        "info",
        "After passing this challenge, rebuild the dashboard in a real index.html — that is a strong portfolio piece.",
      ),
    ],
  },
  "jsweb-19": {
    objectives: [
      "Create DOM nodes with createElement patterns",
      "Set text and attributes safely",
      "Append children to parent containers",
    ],
    scenario:
      "A notification center injects new alert banners as users trigger actions. You build each banner node in JavaScript and append it to a container.",
    append: [
      text(
        "Prefer textContent over innerHTML when content includes user names or messages.",
        {
          label: "Safe node creation",
          content: `function banner(text) {
  const el = document.createElement("div");
  el.className = "banner";
  el.textContent = text;
  return el;
}`,
        },
      ),
    ],
  },
  "jsweb-20": {
    objectives: [
      "Map data arrays to DOM row nodes",
      "Re-render lists when state changes",
      "Assign stable ids for edit and delete actions",
    ],
    scenario:
      "A task board re-renders columns when cards move between lists. map + createRow keeps the DOM in sync with data.",
    append: [
      text(
        "Full re-render is fine for small lists; large lists need virtualization later.",
        {
          label: "List render",
          content: `function renderList(container, items) {
  container.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item.text;
    li.dataset.id = item.id;
    container.appendChild(li);
  }
}`,
        },
      ),
    ],
  },
  "jsweb-21": {
    objectives: [
      "Batch DOM inserts to reduce reflows",
      "Use DocumentFragment mental model",
      "Replace children in one update step",
    ],
    scenario:
      "Rendering 200 log lines at once stutters if each line triggers layout. Batch into a fragment, append once.",
    append: [
      text(
        "Read layout properties in a batch, then write DOM changes in a batch — avoids layout thrashing.",
        {
          label: "Fragment append",
          content: `const frag = document.createDocumentFragment();
for (const line of lines) {
  const div = document.createElement("div");
  div.textContent = line;
  frag.appendChild(div);
}
container.appendChild(frag);`,
        },
      ),
    ],
  },
  "jsweb-22": {
    objectives: [
      "Debounce rapid input for search APIs",
      "Throttle scroll and resize handlers",
      "Pick debounce vs throttle for each use case",
    ],
    scenario:
      "A typeahead search should not fire fetch on every keystroke — debounce 300ms after the user pauses typing.",
    append: [
      text(
        "Debounce resets the timer on each event; throttle enforces a maximum rate.",
        {
          label: "Debounce search",
          content: `const onSearch = debounce((q) => fetch("/api?q=" + q), 300);
input.addEventListener("input", (e) => onSearch(e.target.value));`,
        },
      ),
    ],
  },
  "jsweb-23": {
    objectives: [
      "Model loading, empty, error, and success UI",
      "Show skeletons instead of blank screens",
      "Offer retry on failed fetches",
    ],
    scenario:
      "A favorites list shows a spinner while loading, an empty illustration when zero items, and an error banner with Retry on failure.",
    append: [
      text(
        "One getViewState helper drives which template to show — keeps JSX/vanilla render logic clean.",
        {
          label: "View state machine",
          content: `if (loading) showSpinner();
else if (error) showError(error);
else if (items.length === 0) showEmpty();
else showList(items);`,
        },
      ),
    ],
  },
  "jsweb-24": {
    objectives: [
      "Use requestAnimationFrame for smooth JS animation",
      "Prefer CSS transform/opacity transitions",
      "Avoid layout-heavy properties in animation loops",
    ],
    scenario:
      "A progress bar animates smoothly during file upload. rAF syncs updates to the display refresh rate.",
    append: [
      text(
        "Animate transform and opacity — not width/height/top — for smoother compositor-friendly motion.",
        {
          label: "rAF tick",
          content: `function animate(t) {
  bar.style.transform = "scaleX(" + t + ")";
  if (t < 1) requestAnimationFrame(() => animate(t + 0.02));
}
animate(0);`,
        },
      ),
    ],
  },
  "jsweb-25": {
    objectives: [
      "Parse and build query strings with URLSearchParams",
      "Sync filters with the address bar",
      "Create shareable URLs for app state",
    ],
    scenario:
      "A product catalog stores search query and page in the URL so users can bookmark or share filtered results.",
    append: [
      text(
        "URLSearchParams handles encoding — safer than manual string concatenation.",
        {
          label: "Sync filter to URL",
          content: `const params = new URLSearchParams(location.search);
params.set("q", "laptop");
params.set("page", "2");
history.pushState({}, "", "?" + params.toString());`,
        },
      ),
    ],
  },
  "jsweb-26": {
    objectives: [
      "Compare hash routing vs History API",
      "Listen to popstate for back/forward",
      "Map paths to views without document reload",
    ],
    scenario:
      "A settings SPA uses /profile and /billing paths. pushState updates the URL; popstate re-renders when users hit Back.",
    append: [
      text(
        "Routers are thin: match path → return view component or HTML string → render into #app.",
        {
          label: "pushState navigation",
          content: `function navigate(path) {
  history.pushState({ path }, "", path);
  renderView(matchRoute(routes, path));
}
window.addEventListener("popstate", () => renderView(matchRoute(routes, location.pathname)));`,
        },
      ),
    ],
  },
  "jsweb-27": {
    objectives: [
      "Choose semantic HTML elements",
      "Add ARIA when native semantics are insufficient",
      "Associate labels with inputs",
    ],
    scenario:
      "An icon-only close button needs aria-label='Close dialog' so screen readers announce its purpose.",
    append: [
      text(
        "Use native <button>, <nav>, <main> first — ARIA supplements, not replaces, good HTML.",
        {
          label: "Accessible icon button",
          content: `<button type="button" aria-label="Close dialog">
  <span aria-hidden="true">&times;</span>
</button>`,
        },
      ),
    ],
  },
  "jsweb-28": {
    objectives: [
      "Manage focus in modals and menus",
      "Support Tab and Escape keyboard patterns",
      "Keep visible focus indicators",
    ],
    scenario:
      "Opening a date picker moves focus into the calendar; closing returns focus to the input that opened it.",
    append: [
      text(
        "document.activeElement tells you where focus is before trapping it in a modal.",
        {
          label: "Focus return",
          content: `let lastFocus = null;
function openModal() {
  lastFocus = document.activeElement;
  modal.querySelector("button").focus();
}
function closeModal() {
  lastFocus?.focus();
}`,
        },
      ),
    ],
  },
  "jsweb-29": {
    objectives: [
      "Explain XSS and how innerHTML enables it",
      "Escape or sanitize untrusted strings",
      "Use textContent for user-generated text",
    ],
    scenario:
      "A comment section displays user nicknames. textContent prevents a malicious nickname from running script in other users' browsers.",
    append: [
      text(
        "Content Security Policy is a defense-in-depth layer — still never inject raw user HTML.",
        {
          label: "Safe text insert",
          content: `const el = document.createElement("p");
el.textContent = userComment; // never innerHTML for user data`,
        },
      ),
    ],
  },
  "jsweb-30": {
    objectives: [
      "Treat all client input as untrusted",
      "Validate on the server even when client validates",
      "Avoid storing tokens in localStorage when XSS is possible",
    ],
    scenario:
      "A profile form validates on the client for UX, but the API re-validates every field — attackers can bypass the browser entirely.",
    append: [
      text(
        "Security is layered: HTTPS, httpOnly cookies, CSP, output encoding, server validation.",
        {
          label: "Trust boundaries",
          content: `// Client: friendly errors
// Server: authoritative validation + auth`,
        },
      ),
    ],
  },
  "jsweb-31": {
    objectives: [
      "Dispatch and listen for custom events",
      "Decouple modules with an event bus",
      "Pass detail payloads in custom events",
    ],
    scenario:
      "A cart module emits 'cart:updated' when items change; the header badge module listens without importing cart code directly.",
    append: [
      text(
        "CustomEvent carries a detail payload — loose coupling between UI widgets.",
        {
          label: "CustomEvent dispatch",
          content: `document.dispatchEvent(
  new CustomEvent("cart:updated", { detail: { count: 3 } }),
);`,
        },
      ),
    ],
  },
  "jsweb-32": {
    objectives: [
      "Use IntersectionObserver for lazy loading",
      "Clean up listeners and timers on teardown",
      "Prevent memory leaks in long-lived SPAs",
    ],
    scenario:
      "An infinite feed loads images only when rows enter the viewport — IntersectionObserver fires instead of scroll listeners on every pixel.",
    append: [
      text(
        "On route change or component destroy: removeEventListener, clearInterval, observer.disconnect().",
        {
          label: "Cleanup on teardown",
          content: `const cleanup = createCleanup();
cleanup.add(() => observer.disconnect());
cleanup.add(() => clearInterval(timer));
// on unmount: cleanup.run();`,
        },
      ),
    ],
  },
  "jsweb-33": {
    objectives: [
      "Combine DOM, fetch, storage, routing, and state",
      "Structure a dashboard into clear modules",
      "Plan a portfolio-ready project outline",
    ],
    scenario:
      "Your graduation capstone: a filterable stats dashboard with loading/error states, persisted preferences, and delegated row actions.",
    append: [
      text(
        "Ship the capstone challenge, then rebuild in real HTML/CSS — deploy to GitHub Pages or Netlify.",
        {
          label: "Dashboard modules",
          content: `// api.js — fetchWithRetry
// state.js — dashboardReducer
// render.js — map items to DOM
// app.js — wire events + init`,
        },
      ),
    ],
  },
};

export function applyLessonEnhancements(lesson) {
  const meta = LESSON_ENHANCEMENTS[lesson.id];
  const objectiveItems = meta?.objectives || [
    `Master "${lesson.title}" for real web apps`,
    "Apply browser patterns from this lesson in code",
    "Connect this skill to production UI work",
  ];

  const prefix = [{ type: "objectives", items: objectiveItems }];
  if (meta?.scenario) {
    prefix.push({ type: "scenario", content: meta.scenario });
  }
  if (meta?.prepend?.length) {
    prefix.push(...meta.prepend);
  }

  const baseTheory = (lesson.theory || []).filter((block) => block.type !== "objectives");

  return {
    ...lesson,
    theory: [...prefix, ...baseTheory, ...(meta?.append || [])],
  };
}

export function applyChapterEnhancements(chapters) {
  return chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map(applyLessonEnhancements),
  }));
}
