// PolyCode — JavaScript DOM course
// 5 chapters · 15 lessons · DOM-focused browser challenges
// Add video links in jsDomVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { applyChapterEnhancements } from "./jsDomLessonEnhancements";
import { JS_DOM_VIDEO_LINKS } from "./jsDomVideoLinks";
import {
  // eslint-disable-next-line no-unused-vars
  JS_ACCENT,
  quiz,
  callout,
  text,
  diagram,
  table,
  objectives,
} from "../../js-fundamentals/data/jsCurriculumHelpers";

const DOM_COLOR = "#22c55e";
const EVENTS_COLOR = "#3b82f6";
const FORM_COLOR = "#6366f1";
const PERFORMANCE_COLOR = "#f59e0b";

const PROJECTS_COLOR = "#ec4899";

const RAW_JS_DOM_CHAPTERS = [
  {
    id: "dom-intro",
    title: "DOM Basics",
    icon: "globe",
    color: DOM_COLOR,
    lessons: [
      {
        id: "jsdom-0",
        title: "What is the DOM?",
        xp: 12,
        chapterTitle: "DOM Basics",
        theory: [
          objectives([
            "Explain the Document Object Model and its role in browser pages",
            "Relate HTML structure to DOM nodes",
            "Understand how JavaScript reads and changes the page",
          ]),
          text(
            "The DOM is a live tree of page elements created by the browser from HTML. JavaScript can read that tree, update attributes, change text, and add or remove elements while the page is open.",
            {
              label: "DOM = page structure in memory",
              content: `const page = { tag: "body", children: [{ tag: "h1", text: "Hello" }] };
console.log(page.children[0].text);`,
            },
          ),
          diagram("HTML → DOM → Browser", [
            {
              id: "html",
              label: "HTML source",
              color: DOM_COLOR,
              items: ["Tags and text", "Static structure", "Loaded by browser"],
            },
            {
              id: "dom",
              label: "DOM tree",
              color: EVENTS_COLOR,
              items: ["Nodes and children", "Live in memory", "Changed by JS"],
            },
            {
              id: "render",
              label: "Rendered page",
              color: PERFORMANCE_COLOR,
              items: ["What users see", "Updated after DOM changes", "Interactive UI"],
            },
          ]),
          text(
            "The DOM is not the HTML file on disk. It's the browser's internal copy of the page, kept in memory so JavaScript can modify it instantly.",
          ),
          table("Common DOM objects", ["Object", "Example", "What it does"], [
            ["document", "document", "Root of the page tree"],
            ["element", "document.querySelector('button')", "Represents a tag like <button>"],
            ["node", "document.body", "Any item in the DOM tree"],
          ]),
          callout(
            "tip",
            "Open DevTools and inspect the Elements panel to see the DOM tree for any page. Clicking an element highlights it in the browser.",
          ),
          quiz(
            "What is the DOM?",
            [
              "The CSS stylesheet loaded by the page",
              "A live tree of page nodes in memory",
              "The database behind the website",
              "The browser's URL parser",
            ],
            1,
            "The DOM is the browser's live representation of the page structure.",
          ),
        ],
        challenge: {
          title: "Count DOM Nodes",
          description:
            "Write a function that counts a node and all of its descendants in a simulated DOM tree object.",
          starterCode: `const domTree = {
  tag: "div",
  children: [
    { tag: "h1", children: [] },
    { tag: "p", children: [{ tag: "span", children: [] }] },
  ],
};

function countNodes(node) {
  // return total nodes
}

console.log(countNodes(domTree));
`,
          solutionCode: `const domTree = {
  tag: "div",
  children: [
    { tag: "h1", children: [] },
    { tag: "p", children: [{ tag: "span", children: [] }] },
  ],
};

function countNodes(node) {
  let total = 1;
  for (const child of node.children) {
    total += countNodes(child);
  }
  return total;
}

console.log(countNodes(domTree));
`,
          tests: [
            {
              id: 1,
              label: "Defines countNodes function",
              keywords: [{ pattern: "function\\s+countNodes" }],
            },
            {
              id: 2,
              label: "Uses child recursion or loop",
              keywords: [{ pattern: "children" }],
            },
            {
              id: 3,
              label: "Logs countNodes result",
              keywords: [{ pattern: "console\\.log\\s*\\(\\s*countNodes" }],
            },
          ],
        },
      },
      {
        id: "jsdom-1",
        title: "Selecting Elements",
        xp: 12,
        chapterTitle: "DOM Basics",
        theory: [
          objectives([
            "Use selectors to find elements in the DOM",
            "Understand how querySelector and querySelectorAll differ",
            "Know when selection can return null",
          ]),
          text(
            "JavaScript finds page elements using selectors. `document.querySelector(\".card\")` returns the first matching element, while `document.querySelectorAll(\".card\")` returns a list of every match.",
          ),
          table("Selector examples", ["Selector", "Matches", "Result"], [
            ["#main", "id=\"main\"", "One element or null"],
            [".item", "class=\"item\"", "NodeList of matches"],
            ["button", "<button>", "First button or all buttons"],
          ]),
          text(
            "In the browser, selectors follow CSS syntax. In PolyCode's DOM challenges, we simulate selection over objects, but the idea is the same: choose the right node before updating it.",
          ),
          callout(
            "warning",
            "`querySelector` can return null if nothing matches. Always check before using the result to avoid errors.",
          ),
          quiz(
            "Which method returns multiple DOM matches?",
            ["querySelector", "getElementById", "querySelectorAll", "createElement"],
            2,
            "querySelectorAll returns all matching elements.",
          ),
        ],
        challenge: {
          title: "Find the Title Node",
          description:
            "Implement search functions that return the first node that matches an id or a tag name in a nested DOM object.",
          starterCode: `const tree = {
  tag: "div",
  children: [
    { tag: "h1", id: "title", children: [] },
    { tag: "p", id: "intro", children: [] },
  ],
};

function findById(node, id) {
  // return the matching node or null
}

function findByTag(node, tag) {
  // return the first node with the matching tag or null
}

const found = findById(tree, "title");
console.log(found ? found.tag : "not found");
`,
          solutionCode: `const tree = {
  tag: "div",
  children: [
    { tag: "h1", id: "title", children: [] },
    { tag: "p", id: "intro", children: [] },
  ],
};

function findById(node, id) {
  if (node.id === id) return node;
  for (const child of node.children) {
    const match = findById(child, id);
    if (match) return match;
  }
  return null;
}

function findByTag(node, tag) {
  if (node.tag === tag) return node;
  for (const child of node.children) {
    const match = findByTag(child, tag);
    if (match) return match;
  }
  return null;
}

const found = findById(tree, "title");
console.log(found ? found.tag : "not found");
`,
          tests: [
            {
              id: 1,
              label: "Defines findById",
              keywords: [{ pattern: "function\\s+findById" }],
            },
            {
              id: 2,
              label: "Defines findByTag",
              keywords: [{ pattern: "function\\s+findByTag" }],
            },
            {
              id: 3,
              label: "Logs the found tag",
              keywords: [{ pattern: "console\\.log.*found" }],
            },
          ],
        },
      },
      {
        id: "jsdom-2",
        title: "Reading & Writing Content",
        xp: 12,
        chapterTitle: "DOM Basics",
        theory: [
          objectives([
            "Read text and attributes from selected elements",
            "Update page content safely with textContent and innerText",
            "Understand the difference between text and HTML insertion",
          ]),
          text(
            "Once you have an element, you can read or update its contents. `textContent` changes plain text safely, while `innerHTML` can insert HTML markup.",
            {
              label: "Update a heading",
              content: `const heading = document.querySelector('h1');
heading.textContent = 'New title';
console.log(heading.textContent);`,
            },
          ),
          table("Content properties", ["Property", "Use", "Example"], [
            ["textContent", "Safe text only", "element.textContent = 'Hi'"],
            ["innerHTML", "HTML markup", "element.innerHTML = '<strong>Hi</strong>'"],
            ["value", "Form input text", "input.value = 'hello'"],
          ]),
          callout(
            "warning",
            "innerHTML can be dangerous when it includes user content. Use textContent to keep text safe.",
          ),
          quiz(
            "Which property is safest for inserting plain text?",
            ["innerHTML", "textContent", "value", "outerHTML"],
            1,
            "textContent inserts plain text without parsing HTML.",
          ),
        ],
        challenge: {
          title: "Change Heading Text",
          description:
            "Create a function that updates a mock heading object's textContent and returns the updated object.",
          starterCode: `function updateHeading(node, text) {
  // return node with updated textContent
}

const heading = { tag: "h1", textContent: "Old", children: [] };
console.log(updateHeading(heading, "New").textContent);
`,
          solutionCode: `function updateHeading(node, text) {
  return { ...node, textContent: text };
}

const heading = { tag: "h1", textContent: "Old", children: [] };
console.log(updateHeading(heading, "New").textContent);
`,
          tests: [
            {
              id: 1,
              label: "Defines updateHeading",
              keywords: [{ pattern: "function\\s+updateHeading" }],
            },
            {
              id: 2,
              label: "Returns object with updated textContent",
              keywords: [{ pattern: "textContent" }],
            },
            {
              id: 3,
              label: "Logs updated textContent",
              keywords: [{ pattern: "console\\.log.*textContent" }],
            },
          ],
        },
      },
      {
        id: "jsdom-3",
        title: "Attributes & Classes",
        xp: 12,
        chapterTitle: "DOM Basics",
        theory: [
          objectives([
            "Read and update element attributes",
            "Add or remove CSS classes dynamically",
            "Use dataset and classList patterns safely",
          ]),
          text(
            "Attributes store element metadata such as href, src, id, or custom data values. `classList` is the safe way to add or remove classes without rewriting the entire class string.",
          ),
          table("Attribute helpers", ["Task", "Example", "Result"], [
            ["Read id", `element.id`, "Gets the id string"],
            ["Set data-*", `element.dataset.page = 'home'`, "Stores custom data"],
            ["Toggle class", `element.classList.toggle('active')`, "Adds/removes class"],
          ]),
          callout(
            "tip",
            "Prefer `classList.add` and `classList.remove` over assigning `className` directly to avoid accidentally erasing existing classes.",
          ),
          quiz(
            "What does classList.toggle('active') do?",
            [
              "Always removes the class",
              "Adds the class only if it's already present",
              "Adds the class if missing, removes if present",
              "Replaces all classes with active",
            ],
            2,
            "toggle adds the class when absent and removes it when already present.",
          ),
        ],
        challenge: {
          title: "Flip the Active Class",
          description:
            "Create a function that toggles the `active` class on a mock element object and returns the updated element.",
          starterCode: `function toggleActive(element) {
  // return element with active class toggled
}

const button = { tag: "button", classList: ["btn"] };
console.log(toggleActive(button).classList);
`,
          solutionCode: `function toggleActive(element) {
  const hasActive = element.classList.includes("active");
  return {
    ...element,
    classList: hasActive
      ? element.classList.filter((name) => name !== "active")
      : [...element.classList, "active"],
  };
}

const button = { tag: "button", classList: ["btn"] };
console.log(toggleActive(button).classList);
`,
          tests: [
            {
              id: 1,
              label: "Defines toggleActive",
              keywords: [{ pattern: "function\\s+toggleActive" }],
            },
            {
              id: 2,
              label: "Adds active when missing",
              keywords: [{ pattern: "includes\\(\"active\")" }],
            },
            {
              id: 3,
              label: "Returns updated classList",
              keywords: [{ pattern: "classList" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "dom-events",
    title: "DOM Events",
    icon: "zap",
    color: EVENTS_COLOR,
    lessons: [
      {
        id: "jsdom-4",
        title: "Click & Input Events",
        xp: 12,
        chapterTitle: "DOM Events",
        theory: [
          objectives([
            "Attach event handlers to DOM elements",
            "Read event properties like target and type",
            "Respond to clicks and keyboard input",
          ]),
          text(
            "Events tell JavaScript when the user interacts with the page. `click` runs when a mouse button is pressed, and `input` runs whenever the user changes text inside a form field.",
          ),
          text(
            "In the browser, event handlers are set with `element.addEventListener('click', handler)`. In challenges we simulate the same idea by calling a handler when the event occurs.",
          ),
          quiz(
            "Which event is best for detecting typing in a text field?",
            ["click", "submit", "input", "load"],
            2,
            "The input event fires every time the field changes.",
          ),
        ],
        challenge: {
          title: "Handle a Button Click",
          description:
            "Return a new element object whose `onClick` handler updates the label to 'Clicked'.",
          starterCode: `function attachClick(element) {
  // return element with onClick function
}

const button = { tag: "button", label: "Press me" };
const updated = attachClick(button);
updated.onClick();
console.log(updated.label);
`,
          solutionCode: `function attachClick(element) {
  return {
    ...element,
    onClick() {
      this.label = "Clicked";
    },
  };
}

const button = { tag: "button", label: "Press me" };
const updated = attachClick(button);
updated.onClick();
console.log(updated.label);
`,
          tests: [
            {
              id: 1,
              label: "Defines attachClick",
              keywords: [{ pattern: "function\\s+attachClick" }],
            },
            {
              id: 2,
              label: "Adds an onClick handler",
              keywords: [{ pattern: "onClick" }],
            },
            {
              id: 3,
              label: "Logs Clicked after calling onClick",
              keywords: [{ pattern: "console\\.log.*Clicked" }],
            },
          ],
        },
      },
      {
        id: "jsdom-5",
        title: "Event Delegation",
        xp: 12,
        chapterTitle: "DOM Events",
        theory: [
          objectives([
            "Explain event delegation and bubbling",
            "Attach a single handler for many child elements",
            "Use event.target safely",
          ]),
          text(
            "Event delegation listens at a parent container instead of on every child. When an event bubbles up, the handler checks `event.target` to decide which child triggered it. This is efficient for lists and dynamic content.",
          ),
          diagram("Event flow", [
            { id: "target", label: "Event target", color: EVENTS_COLOR, items: ["Clicked element", "event.target"] },
            { id: "bubble", label: "Bubbles up", color: DOM_COLOR, items: ["Parent sees event", "One listener handles many children"] },
            { id: "handler", label: "Handle it", color: PERFORMANCE_COLOR, items: ["Check target", "Run correct code"] },
          ]),
          callout(
            "tip",
            "Delegation is helpful when child elements are added later, because the parent listener still catches events from newly added nodes.",
          ),
          quiz(
            "What does event delegation let you do?",
            [
              "Attach a listener to every child manually",
              "Handle many descendants with one parent listener",
              "Disable event bubbling entirely",
              "Prevent clicks from working",
            ],
            1,
            "Delegation uses one listener on a parent to manage many child events.",
          ),
        ],
        challenge: {
          title: "Delegate Clicks",
          description:
            "Write a function that returns a parent object with an onClick handler that records the clicked child id.",
          starterCode: `function delegateClicks(parent) {
  // return parent with onClick handler
}

const parent = { tag: "ul", children: [{ id: "a" }, { id: "b" }] };
const updated = delegateClicks(parent);
updated.onClick({ target: { id: "b" } });
console.log(updated.lastClicked);
`,
          solutionCode: `function delegateClicks(parent) {
  return {
    ...parent,
    lastClicked: null,
    onClick(event) {
      this.lastClicked = event.target.id;
    },
  };
}

const parent = { tag: "ul", children: [{ id: "a" }, { id: "b" }] };
const updated = delegateClicks(parent);
updated.onClick({ target: { id: "b" } });
console.log(updated.lastClicked);
`,
          tests: [
            {
              id: 1,
              label: "Defines delegateClicks",
              keywords: [{ pattern: "function\\s+delegateClicks" }],
            },
            {
              id: 2,
              label: "Stores lastClicked from event.target.id",
              keywords: [{ pattern: "target\\.id" }],
            },
            {
              id: 3,
              label: "Logs lastClicked",
              keywords: [{ pattern: "console\\.log.*lastClicked" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "dom-forms",
    title: "Forms & Data",
    icon: "form",
    color: FORM_COLOR,
    lessons: [
      {
        id: "jsdom-6",
        title: "Form Inputs",
        xp: 12,
        chapterTitle: "Forms & Data",
        theory: [
          objectives([
            "Read input values from form fields",
            "Update form controls programmatically",
            "Understand the difference between value and checked",
          ]),
          text(
            "Forms are how users send data. In DOM code, you read `input.value` for text fields and `checkbox.checked` for boolean choices before processing the data.",
          ),
          table("Form field access", ["Field", "Property", "Example"], [
            ["Text input", "value", "input.value"],
            ["Checkbox", "checked", "checkbox.checked"],
            ["Select", "value", "select.value"],
          ]),
          quiz(
            "Which property reads a checkbox state?",
            ["value", "checked", "classList", "innerText"],
            1,
            "checkbox.checked tells you whether it is selected.",
          ),
        ],
        challenge: {
          title: "Read Form Data",
          description:
            "Return an object with the `email` and `subscribed` fields from a mock form values object.",
          starterCode: `function getFormData(form) {
  // return { email, subscribed }
}

const form = { email: "hi@example.com", subscribed: true };
console.log(getFormData(form));
`,
          solutionCode: `function getFormData(form) {
  return {
    email: form.email,
    subscribed: form.subscribed,
  };
}

const form = { email: "hi@example.com", subscribed: true };
console.log(getFormData(form));
`,
          tests: [
            {
              id: 1,
              label: "Defines getFormData",
              keywords: [{ pattern: "function\\s+getFormData" }],
            },
            {
              id: 2,
              label: "Returns email and subscribed properties",
              keywords: [{ pattern: "email" }, { pattern: "subscribed" }],
            },
            {
              id: 3,
              label: "Logs the returned object",
              keywords: [{ pattern: "console\\.log.*getFormData" }],
            },
          ],
        },
      },
      {
        id: "jsdom-7",
        title: "Form Submission",
        xp: 12,
        chapterTitle: "Forms & Data",
        theory: [
          objectives([
            "Prevent default form submission behavior",
            "Collect form values in a submit handler",
            "Use event.preventDefault in simulated browser events",
          ]),
          text(
            "Forms normally refresh the page when submitted. In interactive apps, you prevent that default behavior and handle the submitted values with JavaScript.",
          ),
          text(
            "In real code: `form.addEventListener('submit', event => { event.preventDefault(); ... });` — in PolyCode challenges we simulate the same flow with event objects.",
          ),
          quiz(
            "What does event.preventDefault() do in a form submit handler?",
            [
              "Stops the form from submitting and reloading the page",
              "Deletes the form data",
              "Resets the form fields",
              "Sends the form automatically",
            ],
            0,
            "It blocks the browser's normal submit action so JS can handle the data.",
          ),
        ],
        challenge: {
          title: "Submit the Form",
          description:
            "Return an object with prevented=true and data from the event.target form object.",
          starterCode: `function handleSubmit(event) {
  // prevent default and return form data
}

const event = { preventDefault() {}, target: { email: "hi@example.com" } };
console.log(handleSubmit(event));
`,
          solutionCode: `function handleSubmit(event) {
  event.preventDefault();
  return {
    prevented: true,
    email: event.target.email,
  };
}

const event = { preventDefault() {}, target: { email: "hi@example.com" } };
console.log(handleSubmit(event));
`,
          tests: [
            {
              id: 1,
              label: "Defines handleSubmit",
              keywords: [{ pattern: "function\\s+handleSubmit" }],
            },
            {
              id: 2,
              label: "Returns prevented true",
              keywords: [{ pattern: "prevented: true" }],
            },
            {
              id: 3,
              label: "Reads event.target.email",
              keywords: [{ pattern: "event\\.target\\.email" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "dom-performance",
    title: "DOM Performance",
    icon: "speedometer",
    color: PERFORMANCE_COLOR,
    lessons: [
      {
        id: "jsdom-8",
        title: "Batch Updates",
        xp: 12,
        chapterTitle: "DOM Performance",
        theory: [
          objectives([
            "Explain why many DOM writes can be slow",
            "Use fragments or batched updates to reduce reflows",
            "Know the difference between read and write operations",
          ]),
          text(
            "Adding or changing many DOM nodes one by one can trigger repeated layout work. A better pattern is to build changes off-DOM and apply them all at once.",
          ),
          text(
            "In a browser you might use `DocumentFragment` or innerHTML templates. In challenge code we mimic batching by returning a new object with merged children.",
          ),
          quiz(
            "Why are fewer DOM updates usually faster?",
            [
              "The browser caches everything automatically",
              "Each update can cause layout and repaint work",
              "DOM updates are always instant",
              "Less code means fewer errors",
            ],
            1,
            "Each DOM write can trigger expensive layout and paint operations.",
          ),
        ],
        challenge: {
          title: "Batch Append",
          description:
            "Return a new parent object with children merged from the existing children and the new child array.",
          starterCode: `function batchAppend(parent, children) {
  // return parent with merged children
}

const ul = { tag: "ul", children: [] };
const next = batchAppend(ul, [
  { tag: "li", text: "a" },
  { tag: "li", text: "b" },
]);
console.log(next.children.length);
`,
          solutionCode: `function batchAppend(parent, children) {
  return { ...parent, children: [...parent.children, ...children] };
}

const ul = { tag: "ul", children: [] };
const next = batchAppend(ul, [
  { tag: "li", text: "a" },
  { tag: "li", text: "b" },
]);
console.log(next.children.length);
`,
          tests: [
            {
              id: 1,
              label: "Defines batchAppend",
              keywords: [{ pattern: "function\\s+batchAppend" }],
            },
            {
              id: 2,
              label: "Spreads children into a new array",
              keywords: [{ pattern: "\\.\\.\\." }],
            },
            {
              id: 3,
              label: "Logs children length",
              keywords: [{ pattern: "console\\.log.*length" }],
            },
          ],
        },
      },
      {
        id: "jsdom-9",
        title: "Lazy Rendering",
        xp: 12,
        chapterTitle: "DOM Performance",
        theory: [
          objectives([
            "Describe why delayed rendering can improve UX",
            "Use a simple placeholder before content loads",
            "Avoid unnecessary DOM updates on every keystroke",
          ]),
          text(
            "For large interfaces, render only what users need first, then fill in the rest. This keeps pages responsive and avoids expensive updates before the user interacts.",
          ),
          callout(
            "tip",
            "Visible UI should appear quickly; load additional list items or details later.",
          ),
          quiz(
            "What does lazy rendering help with?",
            ["Faster page startup", "More DOM nodes always", "Fewer JavaScript features", "No need for CSS"],
            0,
            "It improves startup speed by deferring non-essential DOM work.",
          ),
        ],
        challenge: {
          title: "Render Visible Items",
          description:
            "Write a function that returns only the first `count` rendered items from a list of data.",
          starterCode: `function renderVisible(items, count) {
  // return first count items
}

const items = [1, 2, 3, 4];
console.log(renderVisible(items, 2).length);
`,
          solutionCode: `function renderVisible(items, count) {
  return items.slice(0, count);
}

const items = [1, 2, 3, 4];
console.log(renderVisible(items, 2).length);
`,
          tests: [
            {
              id: 1,
              label: "Defines renderVisible",
              keywords: [{ pattern: "function\\s+renderVisible" }],
            },
            {
              id: 2,
              label: "Uses slice to limit items",
              keywords: [{ pattern: "slice\\(" }],
            },
            {
              id: 3,
              label: "Logs returned length",
              keywords: [{ pattern: "console\\.log.*length" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "dom-advanced",
    title: "DOM Patterns",
    icon: "layers",
    color: PERFORMANCE_COLOR,
    lessons: [
      {
        id: "jsdom-10",
        title: "Live UI Updates",
        xp: 12,
        chapterTitle: "DOM Patterns",
        theory: [
          objectives([
            "Update the page in response to data changes",
            "Keep UI state in sync with JavaScript state",
            "Use simple render helpers for cleaner code",
          ]),
          text(
            "The page should reflect the current application state. When the state changes, update the DOM in a predictable way so the UI stays correct.",
          ),
          text(
            "A common pattern is to use small helper functions that build and replace DOM nodes based on state, instead of mutating many nodes from scattered places.",
          ),
          quiz(
            "What does a render helper function do?",
            ["Makes the DOM static", "Builds UI from current state", "Deletes event handlers", "Resets the page"],
            1,
            "Render helpers build the page from the latest state.",
          ),
        ],
        challenge: {
          title: "Render a Counter",
          description:
            "Create a function that returns a counter node object using the current count state.",
          starterCode: `function renderCounter(count) {
  // return a mock counter node object
}

console.log(renderCounter(5).textContent);
`,
          solutionCode: `function renderCounter(count) {
  return { tag: "div", textContent: "Count: " + count, children: [] };
}

console.log(renderCounter(5).textContent);
`,
          tests: [
            {
              id: 1,
              label: "Defines renderCounter",
              keywords: [{ pattern: "function\\s+renderCounter" }],
            },
            {
              id: 2,
              label: "Returns mock node with count text",
              keywords: [{ pattern: "Count:" }, { pattern: "count" }],
            },
            {
              id: 3,
              label: "Logs the rendered text",
              keywords: [{ pattern: "console\\.log.*Count:" }],
            },
          ],
        },
      },
      {
        id: "jsdom-11",
        title: "Final DOM Project",
        xp: 12,
        chapterTitle: "DOM Patterns",
        theory: [
          objectives([
            "Combine selection, updates, events, and rendering",
            "Build a small interactive UI in a structured way",
            "Review DOM best practices for safety and performance",
          ]),
          text(
            "Your final DOM lesson brings everything together: select elements, update content, handle events, and keep the page in sync with data.",
          ),
          text(
            "A good DOM app is easy to understand: find the element, update it predictably, and avoid messy direct mutations when possible.",
          ),
          callout(
            "tip",
            "If a page update feels complicated, split it into smaller helper functions for selection, rendering, and event handling.",
          ),
        ],
        challenge: {
          title: "Interactive Counter",
          description:
            "Return an object with a render method that increments the count when clicked and updates the displayed text.",
          starterCode: `function createCounter(initial) {
  return {
    count: initial,
    tag: "button",
    textContent: "Count: " + initial,
    onClick() {
      // increment and update textContent
    },
  };
}

const counter = createCounter(0);
counter.onClick();
console.log(counter.textContent);
`,
          solutionCode: `function createCounter(initial) {
  return {
    count: initial,
    tag: "button",
    textContent: "Count: " + initial,
    onClick() {
      this.count += 1;
      this.textContent = "Count: " + this.count;
    },
  };
}

const counter = createCounter(0);
counter.onClick();
console.log(counter.textContent);
`,
          tests: [
            {
              id: 1,
              label: "Defines createCounter",
              keywords: [{ pattern: "function\\s+createCounter" }],
            },
            {
              id: 2,
              label: "Updates count and textContent",
              keywords: [{ pattern: "this\\.count" }, { pattern: "textContent" }],
            },
            {
              id: 3,
              label: "Logs updated Count text",
              keywords: [{ pattern: "console\\.log.*Count:" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "dom-projects",
    title: "DOM Projects",
    icon: "layout",
    color: PROJECTS_COLOR,
    lessons: [
      {
        id: "jsdom-12",
        title: "Todo List DOM",
        xp: 18,
        chapterTitle: "DOM Projects",
        theory: [
          objectives([
            "Map todo data to list item nodes",
            "Add todos from a form submit handler",
            "Toggle done state and remove items",
          ]),
          text(
            "A todo list is the perfect DOM capstone: **state** (array of todos), **render** (build `<li>` elements), and **events** (add, toggle, delete). Keep one source of truth and re-render or patch the list when state changes.",
            {
              label: "Todo state shape",
              content: `const state = {
  todos: [
    { id: 1, text: "Learn querySelector", done: false },
    { id: 2, text: "Build a modal", done: true },
  ],
};`,
            },
          ),
          diagram("Todo app loop", [
            { id: "state", label: "State array", color: PROJECTS_COLOR, items: ["id, text, done", "Single source of truth"] },
            { id: "render", label: "render()", color: DOM_COLOR, items: ["Map to <li>", "classList.toggle('done')"] },
            { id: "events", label: "User events", color: EVENTS_COLOR, items: ["Submit adds todo", "Click toggles done"] },
          ]),
          table("Todo DOM tasks", ["Action", "DOM technique", "State change"], [
            ["Add todo", "createElement + appendChild", "Push to todos array"],
            ["Toggle done", "classList on <li>", "Flip done boolean"],
            ["Delete", "removeChild or re-render", "Filter todos array"],
          ]),
          callout(
            "tip",
            "Use `event.target.closest('li')` with delegation so new todos work without rebinding listeners.",
          ),
          quiz(
            "Best place to store the list of todos?",
            ["Only in HTML attributes", "A JavaScript state array you render from", "window.location", "CSS variables"],
            1,
            "State in JavaScript drives the DOM — render from data, not scattered DOM reads.",
          ),
        ],
        challenge: {
          title: "Todo Reducer",
          description:
            "Write `todoReducer(state, action)` supporting `{ type: 'add', text }` and `{ type: 'toggle', id }`. State: `{ todos: [{ id, text, done }] }`. Add \"Ship feature\", toggle id 1, log first todo done status.",
          starterCode: `function todoReducer(state, action) {
  // handle add and toggle
}

let state = { todos: [] };
state = todoReducer(state, { type: "add", text: "Ship feature" });
state = todoReducer(state, { type: "toggle", id: 1 });
console.log(state.todos[0].done);
`,
          solutionCode: `function todoReducer(state, action) {
  if (action.type === "add") {
    const id = state.todos.length + 1;
    return {
      todos: [...state.todos, { id, text: action.text, done: false }],
    };
  }
  if (action.type === "toggle") {
    return {
      todos: state.todos.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t,
      ),
    };
  }
  return state;
}

let state = { todos: [] };
state = todoReducer(state, { type: "add", text: "Ship feature" });
state = todoReducer(state, { type: "toggle", id: 1 });
console.log(state.todos[0].done);`,
          tests: [
            { id: 1, label: "Defines todoReducer", keywords: [{ pattern: "function\\s+todoReducer" }] },
            { id: 2, label: "Handles add action", keywords: [{ pattern: "add" }] },
            { id: 3, label: "Logs done status", keywords: [{ pattern: "console\\.log.*done" }] },
          ],
        },
      },
      {
        id: "jsdom-13",
        title: "Modal Dialog",
        xp: 18,
        chapterTitle: "DOM Projects",
        theory: [
          objectives([
            "Show and hide a modal with CSS classes",
            "Handle open, close, and backdrop clicks",
            "Set aria-hidden for screen readers",
          ]),
          text(
            "Modals overlay the page for confirmations, forms, or detail views. JavaScript toggles an `open` class, sets `aria-hidden`, and listens for **Escape** and backdrop clicks to dismiss.",
            {
              label: "Modal state object",
              content: `const modalState = { open: false, title: "Confirm delete" };
function openModal() {
  modalState.open = true;
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("open");
}`,
            },
          ),
          table("Modal events", ["Trigger", "Handler", "Result"], [
            ["Open button click", "openModal()", "Show overlay"],
            ["Escape key", "closeModal()", "Hide, restore focus"],
            ["Backdrop click", "closeModal()", "Dismiss dialog"],
          ]),
          callout(
            "warning",
            "Trap focus inside the modal while open and return focus to the trigger on close — required for keyboard accessibility.",
          ),
          quiz(
            "Which attribute tells assistive tech a modal is hidden?",
            ["aria-hidden", "data-modal", "role=div", "tabindex=-1 only"],
            0,
            "aria-hidden=\"true\" removes the modal from the accessibility tree when closed.",
          ),
        ],
        challenge: {
          title: "Modal Controller",
          description:
            "Write `createModal()` returning `{ open(), close(), isOpen }`. `open` sets isOpen true; `close` sets false. Open then close; log isOpen.",
          starterCode: `function createModal() {
  // return { open, close, isOpen }
}

const modal = createModal();
modal.open();
modal.close();
console.log(modal.isOpen);
`,
          solutionCode: `function createModal() {
  return {
    isOpen: false,
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  };
}

const modal = createModal();
modal.open();
modal.close();
console.log(modal.isOpen);`,
          tests: [
            { id: 1, label: "Defines createModal", keywords: [{ pattern: "function\\s+createModal" }] },
            { id: 2, label: "Has open and close", keywords: [{ pattern: "open\\s*\\(" }, { pattern: "close\\s*\\(" }] },
            { id: 3, label: "Logs isOpen false", keywords: [{ pattern: "console\\.log.*isOpen" }] },
          ],
        },
      },
      {
        id: "jsdom-14",
        title: "Dynamic Table",
        xp: 20,
        chapterTitle: "DOM Projects",
        theory: [
          objectives([
            "Render table rows from object arrays",
            "Sort data before rendering",
            "Update tbody when records change",
          ]),
          text(
            "Data tables power admin panels and dashboards. Map each record to a `<tr>` with `<td>` cells. When data changes — new fetch, sort click — rebuild or patch the `<tbody>`.",
            {
              label: "Row builder",
              content: `function rowToCells(record, columns) {
  return columns.map((key) => record[key]);
}
const row = rowToCells({ name: "Ada", score: 98 }, ["name", "score"]);
console.log(row.join(", "));`,
            },
          ),
          diagram("Table render pipeline", [
            { id: "data", label: "Records array", color: PROJECTS_COLOR, items: ["Objects with keys", "Sort/filter first"] },
            { id: "map", label: "map → <tr>", color: DOM_COLOR, items: ["One row per record", "textContent for cells"] },
            { id: "dom", label: "<tbody>", color: EVENTS_COLOR, items: ["Replace children", "Delegate row clicks"] },
          ]),
          callout(
            "tip",
            "Define column keys in an array `['name', 'email', 'role']` so adding a column is one config change, not dozens of copy-paste lines.",
          ),
          quiz(
            "Safest way to put user names into table cells?",
            ["innerHTML with template strings", "createElement + textContent", "document.write", "eval"],
            1,
            "createElement with textContent avoids HTML injection from user data.",
          ),
        ],
        challenge: {
          title: "Sort and Render Rows",
          description:
            "Write `sortByScore(users)` returning users sorted by `score` descending, and `renderRows(users)` returning mock rows `{ tag: 'tr', cells: [name, score] }[]`. Log renderRows(sortByScore(data)).length for two users.",
          starterCode: `const data = [
  { name: "Ada", score: 90 },
  { name: "Lin", score: 95 },
];

function sortByScore(users) {
  // sort by score descending
}

function renderRows(users) {
  // map to { tag: 'tr', cells: [name, score] }
}

console.log(renderRows(sortByScore(data)).length);
`,
          solutionCode: `const data = [
  { name: "Ada", score: 90 },
  { name: "Lin", score: 95 },
];

function sortByScore(users) {
  return [...users].sort((a, b) => b.score - a.score);
}

function renderRows(users) {
  return users.map((u) => ({
    tag: "tr",
    cells: [u.name, u.score],
  }));
}

console.log(renderRows(sortByScore(data)).length);`,
          tests: [
            { id: 1, label: "Defines sortByScore", keywords: [{ pattern: "function\\s+sortByScore" }] },
            { id: 2, label: "Defines renderRows", keywords: [{ pattern: "function\\s+renderRows" }] },
            { id: 3, label: "Logs row count", keywords: [{ pattern: "console\\.log.*length" }] },
          ],
        },
      },
    ],
  },
];

export const JS_DOM_CHAPTERS = applyChapterEnhancements(RAW_JS_DOM_CHAPTERS);

export const JS_DOM_LESSONS = applyLessonVideoLinks(
  JS_DOM_CHAPTERS.flatMap((chapter) => chapter.lessons),
  JS_DOM_VIDEO_LINKS,
);

export const JS_DOM_TOTAL_XP = JS_DOM_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
