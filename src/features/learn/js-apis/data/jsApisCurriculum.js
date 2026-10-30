// PolyCode — JS APIs (Beginner → Advanced)
// 6 chapters · 15 lessons · browser API examples and runnable challenges

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { JS_ACCENT, quiz, callout, text, diagram, table, objectives } from "../../js-fundamentals/data/jsCurriculumHelpers";

const ACCENT = JS_ACCENT;

const RAW_JS_APIS_CHAPTERS = [
  {
    id: "api-intro",
    title: "Browser APIs Essentials",
    icon: "globe",
    color: ACCENT,
    lessons: [
      {
        id: "apis-0",
        title: "What are browser APIs?",
        xp: 10,
        chapterTitle: "Browser APIs Essentials",
        theory: [
          objectives([
            "Explain what browser APIs are and how JavaScript accesses them",
            "Differentiate built-in browser APIs from core language features",
            "Name common browser APIs used in modern web apps",
          ]),
          text(
            "Browser APIs are built into the browser environment so JavaScript can do more than math and logic. They expose features like making network requests, reading the current URL, storing data, measuring performance, and more.",
            {
              label: "Example",
              content: `console.log(window.location.href);
console.log(localStorage.getItem('theme'));
console.log(navigator.userAgent);`,
            },
          ),
          diagram("Browser APIs connect JavaScript to the web platform", [
            {
              id: "js",
              label: "JavaScript code",
              color: ACCENT,
              items: ["Functions", "Variables", "Logic"],
            },
            {
              id: "browser",
              label: "Browser APIs",
              color: "#0ea5e9",
              items: ["Fetch", "Storage", "History", "Navigator"],
            },
            {
              id: "platform",
              label: "Web platform",
              color: "#22c55e",
              items: ["HTTP", "DOM", "Location", "Performance"],
            },
          ]),
          callout("tip", "Browser APIs are the tools that let JavaScript interact with the page, device, and network."),
        ],
        challenge: {
          title: "Read the current URL",
          description: "Write code that logs the browser's current origin and pathname using the URL API.",
          starterCode: `const url = new URL(window.location.href);

// log origin and pathname
`,
          solutionCode: `const url = new URL(window.location.href);
console.log(url.origin);
console.log(url.pathname);
`,
          tests: [
            { id: 1, label: "Creates a URL object", keywords: [{ pattern: "new URL\\(window\\.location\\.href\\)" }] },
            { id: 2, label: "Logs origin and pathname", keywords: [{ pattern: "console\\.log\\(url\\.origin\\)" }, { pattern: "console\\.log\\(url\\.pathname\\)" }] },
          ],
        },
      },
      {
        id: "apis-1",
        title: "Browser globals: window, navigator, location",
        xp: 12,
        chapterTitle: "Browser APIs Essentials",
        theory: [
          objectives([
            "Use the window, navigator, and location globals safely",
            "Read browser details from navigator and location",
            "Understand which APIs are part of the browser environment",
          ]),
          text(
            "The browser exposes several global objects that provide access to platform features. `window` is the top-level object, while `navigator` and `location` give device and URL information.",
            {
              label: "Example",
              content: `console.log(window.location.href);
console.log(navigator.language);
console.log(window.document.title);`,
            },
          ),
          callout("info", "Use browser globals only in environments where `window` exists, such as the browser, not in server-side code."),
        ],
        challenge: {
          title: "Inspect browser globals",
          description: "Log the browser language and the current page title using navigator and window objects.",
          starterCode: `console.log(navigator.language);
console.log(window.document.title);
`,
          solutionCode: `console.log(navigator.language);
console.log(window.document.title);
`,
          tests: [
            { id: 1, label: "Reads navigator.language", keywords: [{ pattern: "navigator\\.language" }] },
            { id: 2, label: "Reads document.title", keywords: [{ pattern: "document\\.title" }] },
          ],
        },
      },
    ],
  },
  {
    id: "storage-url",
    title: "Storage & URL APIs",
    icon: "database",
    color: "#0ea5e9",
    lessons: [
      {
        id: "apis-2",
        title: "LocalStorage basics",
        xp: 12,
        chapterTitle: "Storage & URL APIs",
        theory: [
          objectives([
            "Store and retrieve string values with localStorage",
            "Know when to use localStorage versus sessionStorage",
            "Clear or remove keys safely",
          ]),
          text(
            "The Storage API lets you keep simple string data in the browser. `localStorage` survives page reloads and browser restarts, while `sessionStorage` lasts only for the current tab session.",
            {
              label: "Example",
              content: `localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
console.log(theme);`,
            },
          ),
          table("Storage API methods", ["Method", "Example", "What it does"], [
            ["setItem(key, value)", `localStorage.setItem('name', 'Ali')`, "Store a string value"],
            ["getItem(key)", `localStorage.getItem('name')`, "Read a value or null"],
            ["removeItem(key)", `localStorage.removeItem('name')`, "Delete a key"],
          ]),
          callout("tip", "Always store only strings in localStorage. Use JSON stringify/parse for objects."),
        ],
        challenge: {
          title: "Save a theme setting",
          description: "Store `dark` under the `theme` key, then read it back and log the result.",
          starterCode: `// Save the theme

const savedTheme = localStorage.getItem('theme');
console.log(savedTheme);
`,
          solutionCode: `localStorage.setItem('theme', 'dark');
const savedTheme = localStorage.getItem('theme');
console.log(savedTheme);
`,
          tests: [
            { id: 1, label: "Uses localStorage.setItem", keywords: [{ pattern: "localStorage\\.setItem\\s*\\(\\s*['\\\"]theme['\\\"]" }] },
            { id: 2, label: "Reads theme", keywords: [{ pattern: "localStorage\\.getItem\\s*\\(\\s*['\\\"]theme['\\\"]" }] },
          ],
        },
      },
      {
        id: "apis-3",
        title: "URLSearchParams & query strings",
        xp: 12,
        chapterTitle: "Storage & URL APIs",
        theory: [
          objectives([
            "Build and parse query strings with URLSearchParams",
            "Read search parameters from the current URL",
            "Create a full URL string from path and params",
          ]),
          text(
            "The URL and URLSearchParams APIs make reading and building query strings easy. Use them instead of manual string concatenation to avoid mistakes and encoding issues.",
            {
              label: "Example",
              content: `const params = new URLSearchParams({ page: '2', sort: 'name' });
console.log(params.toString());

const currentUrl = new URL(window.location.href);
console.log(currentUrl.searchParams.get('page'));`,
            },
          ),
          quiz("Which API helps encode query parameters?", ["JSON.stringify", "URLSearchParams", "localStorage", "setTimeout"], 1, "URLSearchParams is designed for search strings."),
        ],
        challenge: {
          title: "Create a search string",
          description: "Use URLSearchParams to build `?q=js+apis&page=1` and log the result string.",
          starterCode: `const params = new URLSearchParams({
  q: 'js apis',
  page: 1,
});

console.log(params.toString());
`,
          solutionCode: `const params = new URLSearchParams({
  q: 'js apis',
  page: 1,
});

console.log(params.toString());
`,
          tests: [
            { id: 1, label: "Uses URLSearchParams", keywords: [{ pattern: "new URLSearchParams" }] },
            { id: 2, label: "Includes q and page", keywords: [{ pattern: "q=js\\+apis" }, { pattern: "page=1" }] },
          ],
        },
      },
      {
        id: "apis-4",
        title: "SessionStorage and JSON data",
        xp: 12,
        chapterTitle: "Storage & URL APIs",
        theory: [
          objectives([
            "Store temporary data with sessionStorage",
            "Serialize objects using JSON.stringify",
            "Parse stored JSON values with JSON.parse",
          ]),
          text(
            "Session storage keeps data for the current tab only. When you want to save objects, stringify them first and parse them back later.",
            {
              label: "Example",
              content: `const settings = { theme: 'light', fontSize: 16 };
sessionStorage.setItem('settings', JSON.stringify(settings));
const saved = JSON.parse(sessionStorage.getItem('settings'));
console.log(saved.theme);`,
            },
          ),
          callout("tip", "Never store non-serializable objects in storage. Stick to strings and JSON-serializable data."),
        ],
        challenge: {
          title: "Save a settings object",
          description: "Store a settings object in sessionStorage and read its `theme` property back.",
          starterCode: `const settings = { theme: 'dark', fontSize: 18 };
// save settings

const saved = JSON.parse(sessionStorage.getItem('settings'));
console.log(saved.theme);
`,
          solutionCode: `const settings = { theme: 'dark', fontSize: 18 };
sessionStorage.setItem('settings', JSON.stringify(settings));

const saved = JSON.parse(sessionStorage.getItem('settings'));
console.log(saved.theme);
`,
          tests: [
            { id: 1, label: "Uses sessionStorage.setItem", keywords: [{ pattern: "sessionStorage\\.setItem" }] },
            { id: 2, label: "Parses JSON from storage", keywords: [{ pattern: "JSON\\.parse\\(sessionStorage\\.getItem" }] },
          ],
        },
      },
    ],
  },
  {
    id: "network-apis",
    title: "Fetch & network APIs",
    icon: "cloud-rain",
    color: "#22c55e",
    lessons: [
      {
        id: "apis-5",
        title: "Fetch JSON from an API",
        xp: 14,
        chapterTitle: "Fetch & network APIs",
        theory: [
          objectives([
            "Use fetch to request JSON data from an HTTP endpoint",
            "Await the network response and parse it with response.json()",
            "Log response data once it is available",
          ]),
          text(
            "The Fetch API returns a promise that resolves to a Response object. Use `await response.json()` to convert JSON payloads into JavaScript values.",
            {
              label: "Example",
              content: `async function loadTodo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await response.json();
  return data.title;
}

// Returning the Promise at the top level forces the editor to resolve and display the result
return loadTodo();`,
            },
          ),
          callout("tip", "Always await `response.json()` only after checking the response status when working with real APIs."),
        ],
        challenge: {
          title: "Fetch a todo title",
          description: "Write an async function that fetches a todo from JSONPlaceholder and logs its title.",
          starterCode: `async function showTodoTitle() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const todo = await response.json();
  // log the title
}

showTodoTitle();
`,
          solutionCode: `async function showTodoTitle() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const todo = await response.json();
  console.log(todo.title);
}

showTodoTitle();
`,
          tests: [
            { id: 1, label: "Uses fetch with JSONPlaceholder", keywords: [{ pattern: "fetch\\('https://jsonplaceholder.typicode.com/todos/1'\\)" }] },
            { id: 2, label: "Logs todo title", keywords: [{ pattern: "console\\.log\\(todo\\.title\\)" }] },
          ],
        },
      },
      {
        id: "apis-6",
        title: "Handle fetch errors",
        xp: 14,
        chapterTitle: "Fetch & network APIs",
        theory: [
          objectives([
            "Check `response.ok` before reading JSON",
            "Throw or handle HTTP errors cleanly",
            "Use try/catch to catch network failures",
          ]),
          text(
            "A fetch promise can succeed for a bad HTTP status. Check `response.ok` before parsing the body so you can detect errors from the server.",
            {
              label: "Example",
              content: `async function loadData() {
  const response = await fetch('/missing.json');
  if (!response.ok) {
    throw new Error('Failed to load data');
  }
  return response.json();
}

// Returning the handled promise allows the editor to print the caught error
return loadData().catch((error) => error.message);`,
            },
          ),
          callout("warning", "Network requests may fail for many reasons. Always handle both HTTP errors and rejected fetch promises."),
        ],
        challenge: {
          title: "Check response.ok",
          description: "Fetch a valid JSON placeholder resource and log `success` only if `response.ok` is true.",
          starterCode: `async function checkTodo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  if (response.ok) {
    console.log('success');
  }
}

checkTodo();
`,
          solutionCode: `async function checkTodo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  if (response.ok) {
    console.log('success');
  }
}

checkTodo();
`,
          tests: [
            { id: 1, label: "Uses response.ok", keywords: [{ pattern: "response\\.ok" }] },
            { id: 2, label: "Logs success", keywords: [{ pattern: "console\\.log\\('success'\\)" }] },
          ],
        },
      },
      {
        id: "apis-7",
        title: "Send headers and request options",
        xp: 14,
        chapterTitle: "Fetch & network APIs",
        theory: [
          objectives([
            "Pass headers and body data to fetch requests",
            "Understand common fetch options like method and headers",
            "Use fetch to call APIs that require JSON input",
          ]),
          text(
            "Fetch accepts a second options object where you can set the HTTP method, headers, and request body. This is how JavaScript sends data securely to APIs.",
            {
              label: "Example",
              content: `async function submitTodo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'New task', completed: false }),
  });
  const data = await response.json();
  
  // Return the fetched data object
  return data;
}

// Return the async function call at the top level
return submitTodo();`,
            },
          ),
          callout("tip", "Use JSON.stringify for request bodies and always send the Content-Type header for JSON APIs."),
        ],
        challenge: {
          title: "Send JSON with fetch",
          description: "Use fetch with method POST and JSON headers to send a new todo object to the API.",
          starterCode: `async function createTodo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: 'Learn APIs', completed: false }),
  });
  const todo = await response.json();
  console.log(todo);
}

createTodo();
`,
          solutionCode: `async function createTodo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: 'Learn APIs', completed: false }),
  });
  const todo = await response.json();
  console.log(todo);
}

createTodo();
`,
          tests: [
            { id: 1, label: "Uses method POST", keywords: [{ pattern: "method:\\s*'POST'" }] },
            { id: 2, label: "Sends JSON headers", keywords: [{ pattern: "Content-Type': 'application/json'" }] },
          ],
        },
      },
    ],
  },
  {
    id: "runtime-apis",
    title: "Navigator & Performance APIs",
    icon: "cpu",
    color: "#6366f1",
    lessons: [
      {
        id: "apis-8",
        title: "Navigator and performance info",
        xp: 12,
        chapterTitle: "Navigator & Performance APIs",
        theory: [
          objectives([
            "Use the Navigator API to inspect browser and device details",
            "Measure elapsed time with Performance.now()",
            "Read the current online status and user agent string",
          ]),
          text(
            "The `navigator` object reports browser details and device capabilities. The Performance API gives high-resolution timing for measuring code speed.",
            {
              label: "Example",
              content: `console.log(navigator.userAgent);
console.log('Online:', navigator.onLine);
console.log('Elapsed ms:', performance.now());`,
            },
          ),
          quiz("What does `performance.now()` return?", ["Time since page load in ms", "Current timestamp", "CPU usage", "Number of network requests"], 0, "Performance.now() returns milliseconds since the page began loading."),
        ],
        challenge: {
          title: "Inspect browser info",
          description: "Log the user agent string and the current online status from the Navigator API.",
          starterCode: `// log navigator information
`,
          solutionCode: `console.log(navigator.userAgent);
console.log('Online:', navigator.onLine);
`,
          tests: [
            { id: 1, label: "Reads navigator.userAgent", keywords: [{ pattern: "navigator\\.userAgent" }] },
            { id: 2, label: "Reads navigator.onLine", keywords: [{ pattern: "navigator\\.onLine" }] },
          ],
        },
      },
      {
        id: "apis-9",
        title: "Time code with Performance API",
        xp: 12,
        chapterTitle: "Navigator & Performance APIs",
        theory: [
          objectives([
            "Measure function runtime with Performance.now()",
            "Compare fast and slow code paths",
            "Use high-resolution timing for performance bottlenecks",
          ]),
          text(
            "Performance.now() gives a precise timestamp that helps you compare code speed. It's more accurate than Date.now() for measuring short-lived operations.",
            {
              label: "Example",
              content: `const start = performance.now();
for (let i = 0; i < 100000; i += 1) {
  Math.sqrt(i);
}
const end = performance.now();
console.log('Elapsed:', end - start, 'ms');`,
            },
          ),
          callout("tip", "Use performance measurements to find slow operations before you optimize them."),
        ],
        challenge: {
          title: "Measure loop performance",
          description: "Use Performance.now() to measure a simple loop and log the elapsed milliseconds.",
          starterCode: `const start = performance.now();
for (let i = 0; i < 50000; i += 1) {
  Math.sqrt(i);
}
const end = performance.now();
console.log('Elapsed:', end - start, 'ms');
`,
          solutionCode: `const start = performance.now();
for (let i = 0; i < 50000; i += 1) {
  Math.sqrt(i);
}
const end = performance.now();
console.log('Elapsed:', end - start, 'ms');
`,
          tests: [
            { id: 1, label: "Uses performance.now", keywords: [{ pattern: "performance\\.now" }] },
            { id: 2, label: "Logs Elapsed", keywords: [{ pattern: "console\\.log\\('Elapsed:'" }] },
          ],
        },
      },
      {
        id: "apis-10",
        title: "Detect offline status",
        xp: 12,
        chapterTitle: "Navigator & Performance APIs",
        theory: [
          objectives([
            "Check the browser online/offline state",
            "Use Navigator properties to guard network code",
            "React to connection changes in browser apps",
          ]),
          text(
            "The browser exposes whether the user is online. Use this to avoid failing network requests and to show offline UI when needed.",
            {
              label: "Example",
              content: `console.log('Online:', navigator.onLine);
window.addEventListener('online', () => console.log('Back online'));
window.addEventListener('offline', () => console.log('Offline'));`,
            },
          ),
          callout("info", "navigator.onLine is useful for user feedback, but it may not detect every connectivity problem."),
        ],
        challenge: {
          title: "Log online state",
          description: "Log the current online status and add listeners for online/offline events.",
          starterCode: `console.log('Online:', navigator.onLine);
window.addEventListener('online', () => console.log('Back online'));
window.addEventListener('offline', () => console.log('Offline'));
`,
          solutionCode: `console.log('Online:', navigator.onLine);
window.addEventListener('online', () => console.log('Back online'));
window.addEventListener('offline', () => console.log('Offline'));
`,
          tests: [
            { id: 1, label: "Reads navigator.onLine", keywords: [{ pattern: "navigator\\.onLine" }] },
            { id: 2, label: "Registers online event", keywords: [{ pattern: "addEventListener\\('online'" }] },
          ],
        },
      },
    ],
  },
  {
    id: "navigation-apis",
    title: "Location & History APIs",
    icon: "map-pin",
    color: "#f59e0b",
    lessons: [
      {
        id: "apis-11",
        title: "Update URL state with history",
        xp: 12,
        chapterTitle: "Location & History APIs",
        theory: [
          objectives([
            "Use the History API to change the URL without reloading",
            "Read `window.location.pathname` and query values",
            "Understand when history.pushState is useful for SPA navigation",
          ]),
          text(
            "The History API lets you modify the visible URL while keeping the page loaded. This is essential for single-page apps and for preserving app state in the browser history.",
            {
              label: "Example",
              content: `const url = new URL(window.location.href);
url.searchParams.set('page', '2');
window.history.pushState({}, '', url);
console.log(window.location.search);`,
            },
          ),
          callout("info", "Changing the URL with pushState does not reload the page, but it does update the address bar and history entry."),
        ],
        challenge: {
          title: "Push a query value",
          description: "Create a new URL based on the current page, add `ref=polycode` to the search string, and use history.pushState to update the browser URL.",
          starterCode: `const url = new URL(window.location.href);
url.searchParams.set('ref', 'polycode');
window.history.pushState({}, '', url);
console.log(window.location.search);
`,
          solutionCode: `const url = new URL(window.location.href);
url.searchParams.set('ref', 'polycode');
window.history.pushState({}, '', url);
console.log(window.location.search);
`,
          tests: [
            { id: 1, label: "Uses history.pushState", keywords: [{ pattern: "history\\.pushState" }] },
            { id: 2, label: "Adds ref=polycode", keywords: [{ pattern: "ref=polycode" }] },
          ],
        },
      },
      {
        id: "apis-12",
        title: "Read and restore state from the URL",
        xp: 12,
        chapterTitle: "Location & History APIs",
        theory: [
          objectives([
            "Parse URL state into app data with URL and URLSearchParams",
            "Restore settings from the current location on page load",
            "Know when to keep state in the URL versus localStorage",
          ]),
          text(
            "The URL is a great place to store page state that should be shareable or bookmarkable. Read the current URL to restore filters, page numbers, or selected views.",
            {
              label: "Example",
              content: `const currentUrl = new URL(window.location.href);
const searchTerm = currentUrl.searchParams.get('q') || '';
console.log('Search:', searchTerm);`,
            },
          ),
          callout("tip", "Use the URL for state that should travel with the page, like search filters or tab selection."),
        ],
        challenge: {
          title: "Restore search state",
          description: "Read the `q` parameter from the current URL and log it, or log `empty` when it is missing.",
          starterCode: `const currentUrl = new URL(window.location.href);
const query = currentUrl.searchParams.get('q');
console.log(query || 'empty');
`,
          solutionCode: `const currentUrl = new URL(window.location.href);
const query = currentUrl.searchParams.get('q');
console.log(query || 'empty');
`,
          tests: [
            { id: 1, label: "Reads q from URL", keywords: [{ pattern: "searchParams\\.get\\('q'\\)" }] },
            { id: 2, label: "Handles missing value", keywords: [{ pattern: "\\|\\| 'empty'" }] },
          ],
        },
      },
    ],
  },
  {
    id: "advanced-api-patterns",
    title: "Pro API integration",
    icon: "layers",
    color: "#ec4899",
    lessons: [
      {
        id: "apis-13",
        title: "Build reusable API helpers",
        xp: 16,
        chapterTitle: "Pro API integration",
        theory: [
          objectives([
            "Write a helper that fetches JSON and handles response errors",
            "Reuse APIs like URL and fetch in one function",
            "Return normalized values so callers can focus on display logic",
          ]),
          text(
            "A reusable helper wraps browser APIs into a clean function. This makes your code easier to test and keeps API details in one place.",
            {
              label: "Example",
              content: `async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Request failed');
  }
  return response.json();
}

// Returning the promise forces the runner to display the resolved JSON object
return fetchJson('https://jsonplaceholder.typicode.com/posts/1');`,
            },
          ),
          callout("tip", "Helpers should do one thing well: fetch the data, handle errors, and return a clean result."),
        ],
        challenge: {
          title: "Create a fetch helper",
          description: "Write `fetchJson(url)` that fetches data, checks `response.ok`, parses JSON, and returns the result.",
          starterCode: `async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Request failed');
  }
  return response.json();
}

fetchJson('https://jsonplaceholder.typicode.com/todos/1').then((todo) => console.log(todo.id));
`,
          solutionCode: `async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Request failed');
  }
  return response.json();
}

fetchJson('https://jsonplaceholder.typicode.com/todos/1').then((todo) => console.log(todo.id));
`,
          tests: [
            { id: 1, label: "Defines fetchJson", keywords: [{ pattern: "async function fetchJson" }] },
            { id: 2, label: "Checks response.ok", keywords: [{ pattern: "response\\.ok" }] },
            { id: 3, label: "Returns response.json()", keywords: [{ pattern: "return response\\.json\\(\\)" }] },
          ],
        },
      },
      {
        id: "apis-14",
        title: "Compose reusable URL and fetch helpers",
        xp: 16,
        chapterTitle: "Pro API integration",
        theory: [
          objectives([
            "Compose URL helpers with fetch for clean API calls",
            "Separate request building from request execution",
            "Reuse utility functions across multiple API requests",
          ]),
          text(
            "Combine the URL and fetch APIs to build flexible helpers. This keeps your request logic reusable and your page code focused on showing results.",
            {
              label: "Example",
              content: `function buildApiUrl(path, query) {
  const url = new URL(path, window.location.origin);
  Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}

const apiUrl = buildApiUrl('/api/search', { q: 'js apis', page: 1 });
fetchJson(apiUrl).then((data) => console.log(data));`,
            },
          ),
          callout("tip", "Build URL strings once and pass them to fetch helpers so your app code stays focused on data."),
        ],
        challenge: {
          title: "Build a reusable API call",
          description: "Create `buildApiUrl(path, params)` and use it with a fetch helper to log a constructed API URL.",
          starterCode: `function buildApiUrl(path, params) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

const apiUrl = buildApiUrl('/api/search', { q: 'js apis', page: 1 });
console.log(apiUrl);
`,
          solutionCode: `function buildApiUrl(path, params) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

const apiUrl = buildApiUrl('/api/search', { q: 'js apis', page: 1 });
console.log(apiUrl);
`,
          tests: [
            { id: 1, label: "Defines buildApiUrl", keywords: [{ pattern: "function buildApiUrl" }] },
            { id: 2, label: "Uses URL and searchParams", keywords: [{ pattern: "new URL\\(" }, { pattern: "searchParams.set" }] },
          ],
        },
      },
    ],
  },
];

export const JS_APIS_CHAPTERS = RAW_JS_APIS_CHAPTERS;
export const JS_APIS_LESSONS = applyLessonVideoLinks(
  RAW_JS_APIS_CHAPTERS.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ ...lesson, chapterTitle: chapter.title })),
  ),
);
export const JS_APIS_TOTAL_XP = JS_APIS_LESSONS.reduce(
  (sum, lesson) => sum + (lesson.xp || 0),
  0,
);
