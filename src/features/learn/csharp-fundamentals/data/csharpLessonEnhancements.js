/** Per-lesson objectives, scenarios, and callouts merged into curriculum at build time. */

export const LESSON_ENHANCEMENTS = {
  "cs-0": {
    objectives: [
      "Explain what C# and .NET are used for",
      "Read the structure of a minimal C# program",
      "Write output with Console.WriteLine",
    ],
    scenario:
      "You join a team building a Unity game prototype. Your first task is a console build that prints a startup banner — the same Hello World pattern every C# project starts from.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "C# targets **.NET**, which runs on Windows, macOS, and Linux. The same language powers web APIs, desktop apps, and game scripts.",
      },
    ],
  },
  "cs-1": {
    objectives: [
      "Declare variables with int, double, string, and bool",
      "Choose the right primitive type for a value",
      "Understand that C# checks types at compile time",
    ],
    scenario:
      "A game inventory tracks ammo (whole numbers), price (decimals), player name (text), and an active flag. Each value needs the correct type before you can compute with it.",
  },
  "cs-2": {
    objectives: [
      "Convert between numeric types with implicit and explicit casts",
      "Parse strings into numbers with Convert.ToInt32",
      "Predict truncation when casting double to int",
    ],
    scenario:
      "A web form sends score data as strings. You parse them into integers so the server can rank players and compute totals.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "Explicit cast `(int)` **truncates** decimals — it does not round. `7.85` becomes `7`, not `8`.",
      },
    ],
  },
  "cs-3": {
    objectives: [
      "Write if / else if / else branches",
      "Compare values with relational operators",
      "Use the ternary operator for simple assignments",
    ],
    scenario:
      "A health monitor prints Healthy, Warning, or Danger based on the player's current HP percentage.",
  },
  "cs-4": {
    objectives: [
      "Write switch expressions that map values to results",
      "Use the discard `_` as a default case",
      "Prefer switch expressions over verbose switch statements for simple mappings",
    ],
    scenario:
      "A shop menu maps numeric item IDs to display names. A switch expression keeps the mapping readable in one expression.",
  },
  "cs-5": {
    objectives: [
      "Write for loops with initializer, condition, and increment",
      "Write while loops with a clear exit condition",
      "Accumulate totals inside a loop",
    ],
    scenario:
      "You sum damage dealt across five combat rounds. A for loop with a running total is the natural pattern.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "In a `while` loop, make sure the loop variable changes each iteration — otherwise you create an infinite loop.",
      },
    ],
  },
  "cs-6": {
    objectives: [
      "Create fixed-size arrays with new or initializer syntax",
      "Access elements by zero-based index",
      "Use .Length to get array size",
    ],
    scenario:
      "A leaderboard stores the top three player names in a fixed array. You update slot 0 when a new champion appears.",
  },
  "cs-7": {
    objectives: [
      "Iterate collections with foreach",
      "Sum or process each element without manual index tracking",
      "Know that the foreach iteration variable is read-only",
    ],
    scenario:
      "You total XP from an array of point values before displaying the season summary.",
  },
  "cs-8": {
    objectives: [
      "Create a List<T> and add or remove elements",
      "Import System.Collections.Generic",
      "Use .Count instead of .Length for lists",
    ],
    scenario:
      "A guest list grows as players join a lobby. List<string> lets you add and remove names without fixing the size upfront.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Use **arrays** when size is fixed; use **List<T>** when items are added or removed at runtime.",
      },
    ],
  },
  "cs-9": {
    objectives: [
      "Define methods with parameters and return types",
      "Use void for methods that perform actions without returning data",
      "Call methods from Main and use their return values",
    ],
    scenario:
      "Tax calculation logic appears in three reports. You extract one Multiply-style helper so every report shares the same formula.",
  },
  "cs-10": {
    objectives: [
      "Overload methods with the same name but different parameter lists",
      "Let the compiler pick the correct overload at call sites",
      "Avoid overloads that differ only by return type",
    ],
    scenario:
      "A logging utility prints strings and doubles. Overloaded Print methods keep one familiar name for both types.",
  },
  "cs-11": {
    objectives: [
      "Define a class as a blueprint for objects",
      "Create instances with the new keyword",
      "Access fields through an object reference",
    ],
    scenario:
      "You model a Wizard with a name and spell power. Each player gets their own Wizard object created from the same class definition.",
  },
  "cs-12": {
    objectives: [
      "Write constructors that run when an object is created",
      "Initialize fields from constructor parameters",
      "Use auto-properties with { get; set; } for encapsulation",
    ],
    scenario:
      "A BankAccount should start with a balance set at creation time. A constructor and Balance property keep setup in one place.",
  },
  "cs-13": {
    objectives: [
      "Use Dictionary<TKey, TValue> for key-value lookups",
      "Add, update, and read entries safely",
      "Choose between List and Dictionary based on access pattern",
    ],
    scenario:
      "A product catalog maps SKU codes to prices. Dictionary lookup is fast and clearer than parallel arrays.",
  },
  "cs-14": {
    objectives: [
      "Filter and transform collections with LINQ Where and Select",
      "Materialize results with ToList or foreach",
      "Read fluent LINQ method chains",
    ],
    scenario:
      "You filter active users from a list and project their email addresses for a notification batch.",
  },
  "cs-15": {
    objectives: [
      "Catch exceptions with try / catch",
      "Throw meaningful errors with throw",
      "Handle invalid input without crashing the program",
    ],
    scenario:
      "A user enters non-numeric text for age. Your app catches FormatException and prompts again instead of exiting.",
  },
  "cs-16": {
    objectives: [
      "Mark methods async and await Task-based calls",
      "Understand that await frees the thread during I/O",
      "Return Task from async methods",
    ],
    scenario:
      "A dashboard fetches player stats from an API. async/await keeps the UI responsive while the network request completes.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "Use `async`/`await` for I/O-bound work (files, HTTP, databases). CPU-heavy loops still need different techniques.",
      },
    ],
  },
  "cs-17": {
    objectives: [
      "Define an interface as a contract of methods",
      "Implement interfaces on concrete classes",
      "Program against interfaces for flexible dependencies",
    ],
    scenario:
      "Multiple payment providers (Stripe, PayPal) share an IPaymentProcessor interface so checkout code stays provider-agnostic.",
  },
  "cs-18": {
    objectives: [
      "Write generic methods and classes with type parameters",
      "Use List<T> and Dictionary<TKey, TValue> as generic examples",
      "Explain why generics avoid boxing and unsafe casts",
    ],
    scenario:
      "A utility method should work for int stacks and string stacks without duplicating code — generics supply the type at compile time.",
  },
  "cs-19": {
    objectives: [
      "Read text files with StreamReader inside a using block",
      "Process files line by line",
      "Close streams automatically with using",
    ],
    scenario:
      "A nightly job reads orders.txt, counts lines, and writes a one-line summary file for operations.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Always wrap `StreamReader` in `using` so the file handle closes even when an exception occurs.",
      },
    ],
  },
};

export function applyLessonEnhancements(lesson) {
  const meta = LESSON_ENHANCEMENTS[lesson.id];
  const objectives = meta?.objectives || [
    `Understand the core idea in "${lesson.title}"`,
    "Apply the C# patterns from this lesson in code",
    "Build habits that scale to .NET and Unity projects",
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
