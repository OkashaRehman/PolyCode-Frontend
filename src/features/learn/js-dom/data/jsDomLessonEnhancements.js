/** Per-lesson objectives, scenarios, and rich append blocks for the JS DOM course. */

import { callout, text, diagram, table } from "../../js-fundamentals/data/jsCurriculumHelpers";

export const LESSON_ENHANCEMENTS = {
  "jsdom-0": {
    objectives: [
      "Explain the Document Object Model as a live in-memory tree",
      "Relate HTML tags to DOM nodes the browser builds",
      "Describe how JavaScript reads and mutates the page",
    ],
    scenario:
      "You open a product page and click “Add to cart.” The button label changes without a reload — that instant update happens because JavaScript edits the DOM tree the browser keeps in memory.",
    append: [
      text(
        "In real pages, `document` is the entry point. Every element is a node with parents and children — the same tree you inspect in DevTools.",
        {
          label: "Browser DOM entry points",
          content: `console.log(document.title);
console.log(document.body.childElementCount);
const main = document.querySelector("main");
console.log(main?.tagName);`,
        },
      ),
      callout(
        "tip",
        "Treat the DOM as **live data**: change a node's `textContent` and the screen updates immediately — no full page reload required.",
      ),
    ],
  },
  "jsdom-1": {
    objectives: [
      "Select elements with querySelector and querySelectorAll",
      "Choose selectors that match id, class, and tag patterns",
      "Handle null when no element matches",
    ],
    scenario:
      "A settings panel has dozens of toggles. You need the save button and every `.setting-row` — selectors let you grab exactly those nodes before updating them.",
    append: [
      text(
        "CSS selectors work in `querySelector`: `#id` for one id, `.class` for classes, and compound selectors like `nav a.active` for nested matches.",
        {
          label: "Selecting in the browser",
          content: `const saveBtn = document.querySelector("#save-settings");
const rows = document.querySelectorAll(".setting-row");
if (!saveBtn) {
  console.warn("Save button not found");
}
console.log(rows.length);`,
        },
      ),
      table("Selector cheat sheet", ["Selector", "Matches", "Returns"], [
        ["#app", "id=\"app\"", "First match or null"],
        [".card", "class contains card", "NodeList (may be empty)"],
        ["input[name=email]", "named input", "First match or null"],
      ]),
    ],
  },
  "jsdom-2": {
    objectives: [
      "Read and update text with textContent and innerText",
      "Change input values with the value property",
      "Prefer textContent over innerHTML for user text",
    ],
    scenario:
      "A live search box shows “3 results” under the input as the user types. You read the input's value and write the count into a `<p>` using textContent.",
    append: [
      text(
        "Updating content is the most common DOM task. Use `textContent` for plain text; reserve `innerHTML` for trusted markup only.",
        {
          label: "Read and write content",
          content: `const input = document.querySelector("#search");
const counter = document.querySelector("#result-count");
input.addEventListener("input", () => {
  counter.textContent = input.value.length + " characters";
});`,
        },
      ),
      callout(
        "warning",
        "Never assign user input to `innerHTML` — attackers can inject `<script>` tags. `textContent` treats everything as plain text.",
      ),
    ],
  },
  "jsdom-3": {
    objectives: [
      "Read and set element attributes (id, href, data-*)",
      "Add, remove, and toggle classes with classList",
      "Use dataset for custom data attributes",
    ],
    scenario:
      "A tabbed interface highlights the active tab with an `active` class and stores the panel id in `data-panel`. classList and dataset keep the markup clean.",
    append: [
      text(
        "`classList` methods avoid overwriting unrelated classes. `dataset` maps `data-user-id` to `element.dataset.userId`.",
        {
          label: "Classes and data attributes",
          content: `const tab = document.querySelector(".tab");
tab.classList.add("active");
tab.classList.remove("hidden");
tab.dataset.panel = "settings";
console.log(tab.dataset.panel);`,
        },
      ),
    ],
  },
  "jsdom-4": {
    objectives: [
      "Attach click and input listeners with addEventListener",
      "Read event.type and event.target in handlers",
      "Respond to user interaction without inline onclick",
    ],
    scenario:
      "A like button should increment a counter and change its label on every click. You wire a click listener that updates the DOM when the event fires.",
    append: [
      text(
        "Listeners decouple HTML from behavior. The same button can have multiple listeners — something inline `onclick` cannot do cleanly.",
        {
          label: "Click and input handlers",
          content: `const btn = document.querySelector("#like");
const countEl = document.querySelector("#likes");
let count = 0;
btn.addEventListener("click", () => {
  count += 1;
  countEl.textContent = String(count);
});`,
        },
      ),
      diagram("Event handler flow", [
        { id: "user", label: "User action", color: "#3b82f6", items: ["Click", "Type in field"] },
        { id: "event", label: "Browser event", color: "#22c55e", items: ["type, target", "Bubbles up tree"] },
        { id: "handler", label: "Your callback", color: "#f59e0b", items: ["Update DOM", "Call fetch"] },
      ]),
    ],
  },
  "jsdom-5": {
    objectives: [
      "Explain event bubbling and delegation",
      "Attach one parent listener for many children",
      "Use event.target to identify which child was clicked",
    ],
    scenario:
      "A todo list adds new rows dynamically. Instead of binding a click handler on every new `<li>`, you listen once on `<ul>` and check `event.target`.",
    append: [
      text(
        "Delegation scales to lists that grow and shrink. The parent catches bubbled events from any current or future child.",
        {
          label: "List delegation pattern",
          content: `const list = document.querySelector("#todo-list");
list.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) return;
  item.classList.toggle("done");
});`,
        },
      ),
      callout(
        "tip",
        "`event.target.closest('button')` finds the nearest matching element — handy when users click icons inside buttons.",
      ),
    ],
  },
  "jsdom-6": {
    objectives: [
      "Read text, checkbox, and select values from forms",
      "Build a data object from form field values",
      "Distinguish value from checked on controls",
    ],
    scenario:
      "A newsletter signup collects email and a “subscribe to tips” checkbox. Before sending to an API, you read both fields into one object.",
    append: [
      text(
        "Different control types expose different properties. Text uses `value`; checkboxes use `checked`.",
        {
          label: "Reading form controls",
          content: `const email = document.querySelector("#email");
const tips = document.querySelector("#tips");
const payload = {
  email: email.value.trim(),
  subscribed: tips.checked,
};
console.log(payload);`,
        },
      ),
    ],
  },
  "jsdom-7": {
    objectives: [
      "Prevent default form submission with preventDefault",
      "Collect form values inside a submit handler",
      "Keep the page on screen while JavaScript handles data",
    ],
    scenario:
      "A contact form should POST via fetch without reloading the page. You intercept submit, call `preventDefault`, then read fields and show a success message.",
    append: [
      text(
        "Without `preventDefault`, the browser navigates away and your JavaScript never finishes. Interactive apps always block the default submit.",
        {
          label: "Submit handler in the browser",
          content: `const form = document.querySelector("#contact");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = form.querySelector("[name=email]").value;
  console.log("Sending", email);
});`,
        },
      ),
    ],
  },
  "jsdom-8": {
    objectives: [
      "Explain why many small DOM writes hurt performance",
      "Batch inserts with fragments or merged updates",
      "Separate read and write phases to avoid layout thrashing",
    ],
    scenario:
      "You render 50 chat messages. Appending each `<div>` one at a time causes repeated layout work — batching inserts keeps scrolling smooth.",
    append: [
      text(
        "Build off-DOM first, then insert once. `DocumentFragment` holds nodes without attaching them to the visible tree.",
        {
          label: "Fragment batch insert",
          content: `const list = document.querySelector("#messages");
const fragment = document.createDocumentFragment();
for (const msg of messages) {
  const row = document.createElement("div");
  row.textContent = msg;
  fragment.appendChild(row);
}
list.appendChild(fragment);`,
        },
      ),
    ],
  },
  "jsdom-9": {
    objectives: [
      "Defer rendering of off-screen or secondary content",
      "Show placeholders while heavy lists load",
      "Avoid re-rendering the entire page on every keystroke",
    ],
    scenario:
      "An activity feed has 500 items but only 20 fit on screen. You render the first page immediately and load more when the user scrolls.",
    append: [
      text(
        "Lazy rendering improves perceived speed: show structure first, fill details when needed.",
        {
          label: "Render visible slice",
          content: `function renderPage(items, page, pageSize) {
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
}
const visible = renderPage(allItems, 0, 20);
console.log(visible.length);`,
        },
      ),
    ],
  },
  "jsdom-10": {
    objectives: [
      "Sync the DOM with application state",
      "Use small render helpers instead of scattered updates",
      "Re-render predictably when data changes",
    ],
    scenario:
      "A shopping cart badge must always show the current item count. When state changes, one `renderCartBadge(state)` function updates the DOM.",
    append: [
      text(
        "Central render functions make bugs easier to find — the UI always reflects the latest state object.",
        {
          label: "State-driven render",
          content: `const state = { count: 0 };
const badge = document.querySelector("#cart-count");
function renderCart(s) {
  badge.textContent = String(s.count);
}
renderCart(state);`,
        },
      ),
    ],
  },
  "jsdom-11": {
    objectives: [
      "Combine selection, events, updates, and rendering",
      "Structure a small interactive widget end-to-end",
      "Apply DOM safety and performance habits",
    ],
    scenario:
      "You ship a counter widget: click increments, label updates, no full reload. This lesson ties together every DOM skill from the course.",
    append: [
      text(
        "Production widgets split concerns: state object, event handlers, and a render function that writes to the DOM.",
        {
          label: "Mini widget architecture",
          content: `const state = { count: 0 };
const btn = document.querySelector("#inc");
const label = document.querySelector("#count");
function render() {
  label.textContent = "Count: " + state.count;
}
btn.addEventListener("click", () => {
  state.count += 1;
  render();
});
render();`,
        },
      ),
      callout(
        "info",
        "Copy this pattern to real HTML: one `index.html`, one `app.js`, open DevTools, and watch the DOM update live.",
      ),
    ],
  },
  "jsdom-12": {
    objectives: [
      "Build a todo list UI from data arrays",
      "Create, toggle, and delete list items in the DOM",
      "Wire form submit to add new todos",
    ],
    scenario:
      "You are building a task board for a team standup. Users add tasks, mark them done, and remove finished items — all without reloading the page.",
    append: [
      text(
        "Todo apps are the classic DOM project: map data to `<li>` elements, delegate clicks for toggle/delete, and re-render from state.",
        {
          label: "Todo list DOM sketch",
          content: `const todos = [{ id: 1, text: "Review PR", done: false }];
const list = document.querySelector("#todos");
function renderTodos(items) {
  list.innerHTML = "";
  for (const t of items) {
    const li = document.createElement("li");
    li.textContent = t.text;
    li.classList.toggle("done", t.done);
    li.dataset.id = String(t.id);
    list.appendChild(li);
  }
}
renderTodos(todos);`,
        },
      ),
    ],
  },
  "jsdom-13": {
    objectives: [
      "Open and close a modal dialog with DOM classes",
      "Trap focus and handle Escape to dismiss",
      "Toggle aria attributes for accessibility",
    ],
    scenario:
      "A “Delete account” flow needs a confirmation modal. Clicking the trigger opens an overlay; Escape or Cancel closes it and returns focus.",
    append: [
      text(
        "Modals toggle visibility with a class, set `aria-hidden`, and listen for backdrop clicks and Escape.",
        {
          label: "Modal open/close pattern",
          content: `const modal = document.querySelector("#confirm-modal");
const openBtn = document.querySelector("#delete-btn");
function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
openBtn.addEventListener("click", openModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});`,
        },
      ),
      callout(
        "warning",
        "Always return focus to the element that opened the modal when it closes — keyboard users need to know where they are.",
      ),
    ],
  },
  "jsdom-14": {
    objectives: [
      "Render table rows from an array of objects",
      "Sort or filter columns with JavaScript",
      "Update the table body when data changes",
    ],
    scenario:
      "An admin dashboard shows users in a sortable table. When new data arrives from an API, you rebuild `<tbody>` rows without refreshing the page.",
    append: [
      text(
        "Dynamic tables map records to `<tr>` cells. Keep column keys in a config array so adding a column is one line.",
        {
          label: "Dynamic table render",
          content: `const users = [
  { name: "Ada", role: "Admin" },
  { name: "Lin", role: "Editor" },
];
const tbody = document.querySelector("#users tbody");
tbody.innerHTML = users
  .map(
    (u) => \`<tr><td>\${u.name}</td><td>\${u.role}</td></tr>\`,
  )
  .join("");`,
        },
      ),
      callout(
        "tip",
        "For user-provided cell text, create cells with `textContent` instead of template HTML to avoid XSS.",
      ),
    ],
  },
};

export function applyLessonEnhancements(lesson) {
  const meta = LESSON_ENHANCEMENTS[lesson.id];
  const objectiveItems = meta?.objectives || [
    `Master "${lesson.title}" for real browser pages`,
    "Apply the DOM patterns from this lesson in code",
    "Connect this skill to interactive UIs",
  ];

  const prefix = [{ type: "objectives", items: objectiveItems }];
  if (meta?.scenario) {
    prefix.push({ type: "scenario", content: meta.scenario });
  }
  if (meta?.prepend?.length) {
    prefix.push(...meta.prepend);
  }

  const baseTheory = (lesson.theory || []).filter((block) => block.type !== "objectives");

  const enhanced = {
    ...lesson,
    theory: [...prefix, ...baseTheory, ...(meta?.append || [])],
  };

  if (meta?.challenge) {
    enhanced.challenge = { ...lesson.challenge, ...meta.challenge };
  }

  return enhanced;
}

export function applyChapterEnhancements(chapters) {
  return chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map(applyLessonEnhancements),
  }));
}
