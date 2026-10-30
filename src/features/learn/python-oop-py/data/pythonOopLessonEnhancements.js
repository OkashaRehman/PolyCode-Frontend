/** Per-lesson objectives, scenarios, and callouts merged into curriculum at build time. */

export const LESSON_ENHANCEMENTS = {
  "oop-0": {
    objectives: [
      "Explain what object-oriented programming models in code",
      "Contrast objects, classes, and procedural scripts",
      "Name four pillars of OOP: encapsulation, abstraction, inheritance, polymorphism",
    ],
    scenario:
      "A game studio models players, enemies, and items as objects instead of scattered global variables — each entity owns its data and behavior.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "You already use objects in Python: `\"hello\".upper()`, `len([1,2,3])`, and `datetime.now()` — strings, lists, and dates are **instances** of classes.",
      },
    ],
  },
  "oop-0b": {
    objectives: [
      "Refactor procedural code into object-shaped design",
      "Identify when OOP reduces duplication",
      "Know when simple functions are enough",
    ],
    scenario:
      "A billing script grows to 400 lines with copy-pasted customer logic. Grouping data and actions into a `Customer` class makes changes safer.",
  },
  "oop-1": {
    objectives: [
      "Define a class with the `class` keyword",
      "Create instances with `ClassName()`",
      "Attach attributes to instances with dot notation",
    ],
    scenario:
      "An e-commerce app needs thousands of product records — each product is an object with its own name, price, and stock count.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "Class names use **CapWords** (`BankAccount`), while functions use **snake_case** (`calculate_tax`). Mixing these confuses readers instantly.",
      },
    ],
  },
  "oop-1b": {
    objectives: [
      "Set instance attributes in `__init__` or after construction",
      "Read attributes with dot notation",
      "Understand that each instance has its own attribute values",
    ],
    scenario:
      "Two users sign up: `alice` and `bob` each get a `User` object with different emails — same class, different state.",
  },
  "oop-2": {
    objectives: [
      "Define instance methods with `def` inside a class",
      "Pass `self` as the first parameter",
      "Call methods on instances: `obj.method()`",
    ],
    scenario:
      "A `Rectangle` class exposes `area()` and `perimeter()` so UI code never repeats width × height math.",
  },
  "oop-3": {
    objectives: [
      "Use `__init__` to initialize new objects",
      "Accept constructor parameters and assign to `self`",
      "Create objects with required fields from day one",
    ],
    scenario:
      "Every `BankAccount` must open with an owner name and starting balance — `__init__` enforces that contract at creation time.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "`__init__` **initializes** the object; it does not allocate memory (Python does that before `__init__` runs). Never return a value from `__init__`.",
      },
    ],
  },
  "oop-3b": {
    objectives: [
      "Provide default parameter values in constructors",
      "Validate inputs and raise `ValueError` when rules break",
      "Keep invalid objects from entering the system",
    ],
    scenario:
      "A `Temperature` class rejects -500°C because sensor glitches should not corrupt dashboards.",
  },
  "oop-4": {
    objectives: [
      "Distinguish class attributes shared by all instances",
      "Distinguish instance attributes unique per object",
      "Choose the right scope for counters and constants",
    ],
    scenario:
      "All `Employee` objects share `company_name`, but each has their own `salary` — class vs instance attributes model that split.",
  },
  "oop-5": {
    objectives: [
      "Hide internal details behind a public interface",
      "Use `_single` and `__double` underscore conventions",
      "Explain why encapsulation improves maintainability",
    ],
    scenario:
      "Payment code should call `account.withdraw(50)`, not tweak `account._balance` directly — encapsulation prevents accidental corruption.",
  },
  "oop-5b": {
    objectives: [
      "Expose computed values with `@property`",
      "Replace getter methods with readable attribute syntax",
      "Keep validation in property setters when needed",
    ],
    scenario:
      "A `Circle` exposes `area` as a property so callers write `c.area` instead of `c.get_area()`.",
  },
  "oop-6": {
    objectives: [
      "Write property getters and setters with `@name.setter`",
      "Enforce invariants when attributes change",
      "Prefer properties over public mutable fields for sensitive data",
    ],
    scenario:
      "A `Product` price cannot go negative — the setter blocks bad updates while keeping `product.price = 9.99` ergonomic.",
  },
  "oop-7": {
    objectives: [
      "Create child classes that extend parent behavior",
      "Reuse parent attributes and methods",
      "Model is-a relationships (`Dog` is an `Animal`)",
    ],
    scenario:
      "`SavingsAccount` and `CheckingAccount` share `Account` basics but add different fee rules.",
  },
  "oop-7b": {
    objectives: [
      "Call parent logic with `super()`",
      "Override methods in child classes",
      "Extend `__init__` without duplicating parent setup",
    ],
    scenario:
      "`AdminUser` extends `User` but also stores `permissions` — `super().__init__()` keeps email validation in one place.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "When overriding `__init__`, almost always call `super().__init__(...)` first so parent fields are initialized before child-specific logic.",
      },
    ],
  },
  "oop-8": {
    objectives: [
      "Understand multiple inheritance syntax",
      "Read Python's Method Resolution Order (MRO)",
      "Prefer composition when inheritance trees get deep",
    ],
    scenario:
      "A `FlyingCar` might mix `Car` and `FlyingMachine` behaviors — MRO decides which `start()` runs when both parents define it.",
  },
  "oop-9": {
    objectives: [
      "Write functions that accept any object with the right behavior",
      "Apply duck typing: \"if it quacks like a duck…\"",
      "Reduce `if isinstance` chains in favor of shared interfaces",
    ],
    scenario:
      "One `export(data)` function works for `CSVExporter`, `JSONExporter`, or any object with `.write(file)` — no giant type switch.",
  },
  "oop-9b": {
    objectives: [
      "Define abstract interfaces with `abc.ABC`",
      "Mark required methods with `@abstractmethod`",
      "Force subclasses to implement contracts",
    ],
    scenario:
      "Every `PaymentGateway` must implement `charge(amount)` — ABCs catch missing methods at import/instantiation time, not in production.",
  },
  "oop-9c": {
    objectives: [
      "Use `isinstance` for safe type checks when needed",
      "Combine polymorphism with explicit validation at boundaries",
      "Avoid overusing runtime type checks inside hot paths",
    ],
    scenario:
      "API middleware accepts `User` or `Guest` but rejects random dicts — `isinstance` guards the edge, polymorphism handles the core.",
  },
  "oop-10": {
    objectives: [
      "Implement `__str__` for user-friendly display",
      "Implement `__repr__` for developer debugging",
      "Know when Python calls each automatically",
    ],
    scenario:
      "Logging `print(order)` shows `Order(#4821, $59.00)` instead of `<Order object at 0x...>` — dunder methods make objects readable.",
  },
  "oop-10b": {
    objectives: [
      "Use `@classmethod` for alternative constructors",
      "Use `@staticmethod` for helpers that do not need `self`",
      "Pick instance vs class vs static method intentionally",
    ],
    scenario:
      "`User.from_email('a@b.com')` is a classmethod factory; `User.is_valid_email(text)` is a static validator.",
  },
  "oop-11": {
    objectives: [
      "Create data-focused classes with `@dataclass`",
      "Reduce boilerplate for `__init__`, `__repr__`, and comparisons",
      "Use `__slots__` to limit attributes and save memory when needed",
    ],
    scenario:
      "A pipeline processes millions of `Point(x, y)` records — dataclasses keep code short; slots optional for memory tuning.",
  },
  "oop-11b": {
    objectives: [
      "Model has-a relationships with composition",
      "Delegate behavior to composed objects",
      "Choose composition over inheritance for flexibility",
    ],
    scenario:
      "`Car` has an `Engine`, not `Car` extends `Engine` — swapping electric vs gas engines does not require rewriting the whole hierarchy.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Rule of thumb: **inheritance** for is-a (`Manager` is an `Employee`); **composition** for has-a (`Car` has an `Engine`).",
      },
    ],
  },
  "oop-12": {
    objectives: [
      "Name the five SOLID principles",
      "Spot Single Responsibility violations in real code",
      "Apply Open/Closed thinking with polymorphism",
    ],
    scenario:
      "A 800-line `Report` class generates PDF, sends email, and hits the database — splitting responsibilities makes testing possible.",
  },
  "oop-13": {
    objectives: [
      "Implement Strategy pattern with interchangeable objects",
      "Implement simple Factory methods for object creation",
      "Recognize when patterns reduce `if/elif` sprawl",
    ],
    scenario:
      "Shipping calculators switch between `StandardRate`, `ExpressRate`, and `OvernightRate` without editing the checkout class each time.",
  },
  "oop-14": {
    objectives: [
      "Design multiple cooperating classes for one domain",
      "Apply encapsulation, inheritance, and polymorphism together",
      "Ship a small but realistic OOP mini-project",
    ],
    scenario:
      "Build a library system: `Book`, `Member`, `Loan`, and `Library` classes that check out, return, and list overdue items.",
  },
  "oop-15": {
    objectives: [
      "Look up class syntax, dunder methods, and patterns quickly",
      "Review beginner → pro OOP checklist before interviews",
      "Reuse starter templates for new Python projects",
    ],
    scenario:
      "You start a new service and keep this lesson open as a reference while designing models and APIs.",
  },
};

export function applyLessonEnhancements(lesson) {
  const meta = LESSON_ENHANCEMENTS[lesson.id];
  const objectives = meta?.objectives || [
    `Understand the core idea in "${lesson.title}"`,
    "Apply the OOP patterns from this lesson in Python code",
    "Design classes that are readable, safe, and easy to extend",
  ];

  const prefix = [{ type: "objectives", items: objectives }];
  if (meta?.scenario) {
    prefix.push({ type: "scenario", content: meta.scenario });
  }
  if (meta?.prepend?.length) {
    prefix.push(...meta.prepend);
  }

  return {
    ...lesson,
    theory: [...prefix, ...lesson.theory, ...(meta?.append || [])],
  };
}

export function applyChapterEnhancements(chapters) {
  return chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map(applyLessonEnhancements),
  }));
}
