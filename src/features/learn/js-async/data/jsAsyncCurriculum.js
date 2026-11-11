// PolyCode — Asynchronous JS (Beginner → Advanced)

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { JS_ACCENT, quiz, callout, text, objectives } from "../../js-fundamentals/data/jsCurriculumHelpers";

const ACCENT = JS_ACCENT;

const RAW_CHAPTERS = [
  {
    id: "async-intro",
    title: "Callback & Promise Basics",
    icon: "clock",
    color: ACCENT,
    lessons: [
      {
        id: "async-0",
        title: "Why async matters",
        xp: 10,
        theory: [
          objectives([
            "Explain why JavaScript uses asynchronous operations for I/O",
            "Recognize the difference between synchronous and asynchronous execution",
            "Identify when callbacks or promises are required",
          ]),
          text(
            "JavaScript runs on a single thread. Asynchronous APIs such as `fetch`, `setTimeout`, and event handlers let the runtime do work while waiting for I/O.",
            {
              label: "Example",
              content: `console.log('start');
setTimeout(() => {
  console.log('later');
}, 0);
console.log('end');
// output: start, end, later`,
            },
          ),
          callout("tip", "Async operations allow the browser or Node.js to remain responsive while waiting for I/O."),
        ],
        challenge: {
          title: "Order of logs",
          description: "Predict the order of console logs for a callback example. Then run the code to confirm the actual output.",
          starterCode: `console.log('first');
setTimeout(() => {
  console.log('second');
}, 0);
console.log('third');
`,
          solutionCode: `console.log('first');
setTimeout(() => {
  console.log('second');
}, 0);
console.log('third');
`,
          tests: [
            { id: 1, label: "Uses setTimeout", keywords: [{ pattern: "setTimeout\\s*\\(" }] },
            { id: 2, label: "Logs first and third synchronously", keywords: [{ pattern: "console\\.log\\('first'\\)" }] },
          ],
        },
      },
      {
        id: "async-1",
        title: "Promise fundamentals",
        xp: 12,
        theory: [
          text(
            "A `Promise` is a placeholder for a value that may arrive later. Use `resolve` or `reject` inside the executor and `.then` / `.catch` to react.",
            {
              label: "Example",
              content: `const p = new Promise((resolve, reject) => {
  resolve('done');
});

p.then((value) => console.log(value));`,
            },
          ),
          quiz("Which Promise method runs when the value is ready?", ["catch", "then", "finally", "resolve"], 1, "Use `.then()` to receive the resolved value."),
        ],
        challenge: {
          title: "Create a promise",
          description: "Build a promise that resolves with `'ok'` after 50ms and log the resolved result.",
          starterCode: `const p = new Promise((resolve, reject) => {
  // resolve with 'ok' after 50ms
});

p.then((value) => {
  console.log(value);
});
`,
          solutionCode: `const p = new Promise((resolve) => {
  setTimeout(() => resolve('ok'), 50);
});

p.then((value) => {
  console.log(value);
});
`,
          tests: [
            { id: 1, label: "Creates a new Promise", keywords: [{ pattern: "new Promise" }] },
            { id: 2, label: "Logs ok", keywords: [{ pattern: "console\\.log\\(value\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "promise-patterns",
    title: "Promise patterns",
    icon: "layers",
    color: "#0ea5e9",
    lessons: [
      {
        id: "async-2",
        title: "Chaining promises",
        xp: 12,
        theory: [
          text(
            "Chain promises with `.then()` so each step waits for the previous result. Return a value or another promise inside the callback.",
            {
              label: "Example",
              content: `const initialValue = 2;
const result = initialValue * 3;
console.log(result);`,
            },
          ),
          callout("info", "Returning a promise inside `.then()` lets the chain wait for asynchronous work."),
        ],
        challenge: {
          title: "Promise chain multiply",
          description: "Start with `Promise.resolve(5)` and chain two `.then()` callbacks so the final console log prints `25`.",
          starterCode: `Promise.resolve(5)
  .then((value) => {
    // multiply by 5
  })
  .then((value) => {
    console.log(value);
  });
`,
          solutionCode: `Promise.resolve(5)
  .then((value) => value * 5)
  .then((value) => {
    console.log(value);
  });
`,
          tests: [
            { id: 1, label: "Uses Promise.resolve", keywords: [{ pattern: "Promise\\.resolve\\(5\\)" }] },
            { id: 2, label: "Logs 25", keywords: [{ pattern: "console\\.log\\(value\\)" }] },
          ],
        },
      },
      {
        id: "async-3",
        title: "Error handling with catch",
        xp: 12,
        theory: [
          text(
            "Use `.catch()` after a promise chain to handle errors. This keeps failure paths separate from success paths.",
            {
              label: "Example",
              content: `Promise.reject(new Error('fail'))
  .catch((error) => {
    console.log(error.message);
  });`,
            },
          ),
          callout("warning", "Every promise chain should handle rejection to avoid uncaught errors."),
        ],
        challenge: {
          title: "Handle rejection",
          description: "Create a rejected promise and use `.catch()` to print `'error caught'` when the promise fails.",
          starterCode: `Promise.reject(new Error('fail'))
  .catch((error) => {
    // print a friendly message
  });
`,
          solutionCode: `Promise.reject(new Error('fail'))
  .catch((error) => {
    console.log('error caught');
  });
`,
          tests: [
            { id: 1, label: "Uses catch", keywords: [{ pattern: ".catch\\s*\\(" }] },
            { id: 2, label: "Logs error caught", keywords: [{ pattern: "console\\.log\\('error caught'\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "fetch-errors",
    title: "Fetch & error flow",
    icon: "cloud-rain",
    color: "#14b8a6",
    lessons: [
      {
        id: "async-4",
        title: "fetch data safely",
        xp: 14,
        theory: [
          text(
            "`fetch` returns a promise. Always check `response.ok` and parse JSON inside `await` or `.then()`.",
            {
              label: "Example",
              content: `async function loadTodo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  if (!response.ok) {
    throw new Error('Network response not ok');
  }
  return response.json();
}

const todo = await loadTodo();
console.log(todo.title);`,
            },
          ),
          callout("tip", "Use a small public API like jsonplaceholder.typicode.com for browser examples."),
        ],
        challenge: {
          title: "Fetch user name",
          description: "Write an async function `getUserName` that fetches `/users/1` from JSONPlaceholder and returns the `name` field.",
          starterCode: `async function getUserName() {
  // fetch and return the name field
}

getUserName().then((name) => console.log(name));
`,
          solutionCode: `async function getUserName() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const data = await response.json();
  return data.name;
}

getUserName().then((name) => console.log(name));
`,
          tests: [
            { id: 1, label: "Defines getUserName", keywords: [{ pattern: "async function getUserName" }] },
            { id: 2, label: "Uses fetch", keywords: [{ pattern: "fetch\\('https://jsonplaceholder.typicode.com/users/1'\\)" }] },
          ],
        },
      },
      {
        id: "async-5",
        title: "Retry with async/await",
        xp: 14,
        theory: [
          text(
            "Wrap async code in `try/catch` and retry once when network requests fail. This is a simple resilience pattern for fetch-heavy apps.",
            {
              label: "Example",
              content: `async function tryFetch(url) {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.log('retrying');
    const retryResponse = await fetch(url);
    return await retryResponse.text();
  }
}

// Invoke the function and await the result so the playground logs the output
const data = await tryFetch('https://jsonplaceholder.typicode.com/todos/1');
console.log(data);`,
            },
          ),
          callout("info", "Retry once only; repeated retries are better handled by exponential backoff patterns."),
        ],
        challenge: {
          title: "Safe fetch retry",
          description: "Create `fetchWithRetry(url)` that returns the fetch result text and retries once on failure.",
          starterCode: `async function fetchWithRetry(url) {
  try {
    // fetch once
  } catch (error) {
    // retry one time
  }
}

fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1').then((text) => console.log(typeof text));
`,
          solutionCode: `async function fetchWithRetry(url) {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    const response = await fetch(url);
    return await response.text();
  }
}

fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1').then((text) => console.log(typeof text));
`,
          tests: [
            { id: 1, label: "Defines fetchWithRetry", keywords: [{ pattern: "async function fetchWithRetry" }] },
            { id: 2, label: "Returns a string", keywords: [{ pattern: "return await response.text" }] },
          ],
        },
      },
    ],
  },
  {
    id: "async-await",
    title: "Async/await patterns",
    icon: "zap",
    color: "#7c3aed",
    lessons: [
      {
        id: "async-6",
        title: "Async functions and await",
        xp: 14,
        theory: [
          text(
            "`async` functions return promises. Use `await` to pause until the value is ready, then continue with the next line.",
            {
              label: "Example",
              content: `async function greet() {
  const username = await Promise.resolve('PolyCoder');
  console.log(
    \`Hello, \${username}!\`,
  );
}

greet();`,
            },
          ),
          quiz("What does `await` do inside an async function?", ["Starts a timer", "Pauses until the promise resolves", "Creates a new promise", "Calls a callback"], 1, "`await` waits for a promise to resolve before continuing."),
        ],
        challenge: {
          title: "Convert to async/await",
          description: "Rewrite a `.then()` chain into an async function that logs the same result.",
          starterCode: `function fetchNumber() {
  return Promise.resolve(7);
}

fetchNumber().then((value) => {
  console.log(value + 3);
});
`,
          solutionCode: `async function logResult() {
  const value = await fetchNumber();
  console.log(value + 3);
}

function fetchNumber() {
  return Promise.resolve(7);
}

logResult();
`,
          tests: [
            { id: 1, label: "Uses async function", keywords: [{ pattern: "async function logResult" }] },
            { id: 2, label: "Awaits fetchNumber", keywords: [{ pattern: "await fetchNumber" }] },
          ],
        },
      },
      {
        id: "async-7",
        title: "Parallel requests with Promise.all",
        xp: 14,
        theory: [
          text(
            "Use `Promise.all` to run multiple promises in parallel and wait for them all to complete. This is faster than awaiting each sequentially.",
            {
              label: "Example",
              content: `const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
];

const results = await Promise.all(
  urls.map((url) => fetch(url).then((res) => res.json())),
);
console.log(results.length);`,
            },
          ),
          callout("tip", "Parallel requests are a good fit when the requests do not depend on each other."),
        ],
        challenge: {
          title: "Load two APIs",
          description: "Create `loadTwoTodos()` to fetch `/todos/1` and `/todos/2` in parallel and return an array of titles.",
          starterCode: `async function loadTwoTodos() {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
  ];
  // fetch the two URLs in parallel and return the title values
}

loadTwoTodos().then((titles) => console.log(titles));
`,
          solutionCode: `async function loadTwoTodos() {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
  ];

  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const data = await Promise.all(responses.map((res) => res.json()));
  return data.map((item) => item.title);
}

loadTwoTodos().then((titles) => console.log(titles));
`,
          tests: [
            { id: 1, label: "Uses Promise.all", keywords: [{ pattern: "Promise.all" }] },
            { id: 2, label: "Returns array of titles", keywords: [{ pattern: ".map\\(\\(item\\) => item.title\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "async-concurrency",
    title: "Concurrency patterns",
    icon: "sparkles",
    color: "#22c55e",
    lessons: [
      {
        id: "async-9",
        title: "Promise.allSettled",
        xp: 14,
        theory: [
          text(
            "Use `Promise.allSettled()` when you need results from every promise, even if some fail. This is ideal for parallel work that should not abort on a single failure.",
            {
              label: "Example",
              content: `const promises = [
  Promise.resolve('a'),
  Promise.reject(new Error('fail')),
];

const results = await Promise.allSettled(promises);
console.log(results);
`,
            },
          ),
          callout("info", "`allSettled` returns objects describing each promise’s outcome, so you can handle successes and failures separately."),
        ],
        challenge: {
          title: "Collect all results",
          description: "Write `loadAll()` to wait for multiple promise results using `Promise.allSettled()` and return an array of settled statuses.",
          starterCode: `async function loadAll(promises) {
  // wait for all settled results
}

loadAll([Promise.resolve('x'), Promise.reject(new Error('fail'))]).then((results) => console.log(results));
`,
          solutionCode: `async function loadAll(promises) {
  const results = await Promise.allSettled(promises);
  return results.map((result) => result.status);
}

loadAll([Promise.resolve('x'), Promise.reject(new Error('fail'))]).then((results) => console.log(results));
`,
          tests: [
            { id: 1, label: "Uses allSettled", keywords: [{ pattern: "Promise.allSettled" }] },
            { id: 2, label: "Returns statuses", keywords: [{ pattern: "result.status" }] },
          ],
        },
      },
      {
        id: "async-10",
        title: "Race and first response",
        xp: 14,
        theory: [
          text(
            "`Promise.race()` resolves or rejects as soon as the first promise settles. Use it when you only need the fastest response or want to implement timeouts.",
            {
              label: "Example",
              content: `const first = await Promise.race([
  new Promise((resolve) => setTimeout(() => resolve('fast'), 50)),
  new Promise((resolve) => setTimeout(() => resolve('slow'), 100)),
]);
console.log(first);
`,
            },
          ),
          callout("tip", "`Promise.race()` is useful for timeout logic when one promise should win the race."),
        ],
        challenge: {
          title: "Fastest promise wins",
          description: "Implement `raceTimeout(promise, ms)` to return the first settled value or reject after the timeout.",
          starterCode: `async function raceTimeout(promise, ms) {
  // return the first settled value, or reject after ms
}

raceTimeout(Promise.resolve('ok'), 50).then((value) => console.log(value));
`,
          solutionCode: `async function raceTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms),
  );
  return Promise.race([promise, timeout]);
}

raceTimeout(Promise.resolve('ok'), 50).then((value) => console.log(value));
`,
          tests: [
            { id: 1, label: "Uses Promise.race", keywords: [{ pattern: "Promise.race" }] },
            { id: 2, label: "Creates timeout promise", keywords: [{ pattern: "setTimeout(.*reject" }] },
          ],
        },
      },
    ],
  },
  {
    id: "async-advanced",
    title: "Advanced async flow",
    icon: "lightning-bolt",
    color: "#f43f5e",
    lessons: [
      {
        id: "async-11",
        title: "Async iterators",
        xp: 14,
        theory: [
          text(
            "Async iterators let you consume streamed data with `for await...of`. They are useful for paginated APIs and incremental processing.",
            {
              label: "Example",
              content: `async function* streamValues() {
  yield 1;
  yield 2;
}

for await (const value of streamValues()) {
  console.log(value);
}
`,
            },
          ),
          callout("info", "Async iterators combine generator syntax with promise-based async flow."),
        ],
        challenge: {
          title: "Stream values asynchronously",
          description: "Create `asyncRange(n)` that asynchronously yields numbers from 1 to n, then consumes them with `for await...of`.",
          starterCode: `async function* asyncRange(n) {
  // yield numbers 1..n asynchronously
}

(async () => {
  for await (const value of asyncRange(3)) {
    console.log(value);
  }
})();
`,
          solutionCode: `async function* asyncRange(n) {
  for (let i = 1; i <= n; i += 1) {
    yield i;
  }
}

(async () => {
  for await (const value of asyncRange(3)) {
    console.log(value);
  }
})();
`,
          tests: [
            { id: 1, label: "Defines async generator", keywords: [{ pattern: "async function* asyncRange" }] },
            { id: 2, label: "Uses for await", keywords: [{ pattern: "for await (const value of asyncRange" }] },
          ],
        },
      },
      {
        id: "async-12",
        title: "Retry with backoff",
        xp: 14,
        theory: [
          text(
            "Retry failed async operations with a delay between attempts. Exponential backoff helps avoid flooding the server after repeated failures.",
            {
              label: "Example",
              content: `// 1. Function definition must be included in the editor
async function retryWithBackoff(task, attempts) {
  let delay = 50;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await task();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}

// 2. Your test setup and invocation
let count = 0;
const testTask = async () => {
  count++;
  if (count < 3) throw new Error('Failed');
  return 'Success!';
};

const result = await retryWithBackoff(testTask, 3);
console.log(result);
`,
            },
          ),
          callout("warning", "Use backoff to reduce repeated request load after failures."),
        ],
        challenge: {
          title: "Implement backoff retry",
          description: "Write `retryBackoff(task, attempts)` so it retries a failing async task with increasing wait times before giving up.",
          starterCode: `async function retryBackoff(task, attempts) {
  let delay = 50;
  for (let i = 0; i < attempts; i += 1) {
    try {
      // run task
    } catch (error) {
      if (i === attempts - 1) throw error;
      // wait and increase delay
    }
  }
}
`,
          solutionCode: `async function retryBackoff(task, attempts) {
  let delay = 50;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await task();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}
`,
          tests: [
            { id: 1, label: "Uses retry loop", keywords: [{ pattern: "for (let i = 0; i < attempts; i += 1)" }] },
            { id: 2, label: "Uses setTimeout for backoff", keywords: [{ pattern: "setTimeout(resolve, delay)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "async-testing",
    title: "Async utilities",
    icon: "shield-check",
    color: "#f97316",
    lessons: [
      {
        id: "async-8",
        title: "Timeout helper",
        xp: 14,
        theory: [
          text(
            "Create reusable async helpers like `delay(ms)` with `Promise` so other code can await a timer cleanly.",
            {
              label: "Example",
              content: `function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await delay(100);
console.log('done');`,
            },
          ),
          callout("tip", "A small utility like `delay` is handy for test setup and animation timing."),
        ],
        challenge: {
          title: "Build delay utility",
          description: "Implement `delay(ms)` to return a promise that resolves after the given milliseconds, then use it to log `'done'`.",
          starterCode: `function delay(ms) {
  // return a promise that resolves after ms milliseconds
}

async function example() {
  await delay(10);
  console.log('done');
}

example();
`,
          solutionCode: `function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function example() {
  await delay(10);
  console.log('done');
}

example();
`,
          tests: [
            { id: 1, label: "Defines delay", keywords: [{ pattern: "function delay\\(ms\\)" }] },
            { id: 2, label: "Logs done", keywords: [{ pattern: "console\\.log\\('done'\\)" }] },
          ],
        },
      },
      {
        id: "async-13",
        title: "Async helper composition",
        xp: 14,
        theory: [
          text(
            "Combine small async helpers into reusable flows. Helper composition keeps async code readable and reduces duplicated control logic.",
            {
              label: "Example",
              content: `async function addOne(value) {
  return value + 1;
}

async function double(value) {
  return value * 2;
}

async function runPipeline(value) {
  const first = await addOne(value);
  return await double(first);
}

const result = await runPipeline(3);
console.log(result);`,
            },
          ),
          callout("tip", "Small async helpers are easier to reuse and test than large monolithic functions."),
        ],
        challenge: {
          title: "Compose async steps",
          description: "Create `composeAsync(value, steps)` that runs each async step in order and returns the final result.",
          starterCode: `async function composeAsync(value, steps) {
  // run each async step sequentially
}

async function inc(x) {
  return x + 1;
}

async function square(x) {
  return x * x;
}

composeAsync(2, [inc, square]).then((result) => console.log(result));
`,
          solutionCode: `async function composeAsync(value, steps) {
  let result = value;
  for (const step of steps) {
    result = await step(result);
  }
  return result;
}

async function inc(x) {
  return x + 1;
}

async function square(x) {
  return x * x;
}

composeAsync(2, [inc, square]).then((result) => console.log(result));
`,
          tests: [
            { id: 1, label: "Runs each helper", keywords: [{ pattern: "for (const step of steps)" }] },
            { id: 2, label: "Awaits each step", keywords: [{ pattern: "result = await step(result)" }] },
          ],
        },
      },
    ],
  },
];

export const JS_ASYNC_CHAPTERS = RAW_CHAPTERS;
export const JS_ASYNC_LESSONS = applyLessonVideoLinks(
  RAW_CHAPTERS.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      ...lesson,
    })),
  ),
);
export const JS_ASYNC_TOTAL_XP = JS_ASYNC_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
export default JS_ASYNC_CHAPTERS;
