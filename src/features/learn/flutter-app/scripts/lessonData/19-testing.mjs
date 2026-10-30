// Chapter 19 — Testing and Debugging

export const CH_TESTING = {
  id: "testing",
  title: "Testing and Debugging",
  icon: "bug",
  color: "#b71c1c",
  lessons: [
    {
      title: "Flutter DevTools Basics",
      xp: 10,
      def:
        "**Flutter DevTools** is a set of debugging tools built into Flutter, letting you inspect the widget tree, check performance, and view logs — all while your app is running, right from your editor or browser.",
      example:
        "If a Container is not showing the padding you expect, DevTools' widget inspector lets you click on it directly on screen and see its exact size, padding, and constraints, instead of guessing from the code alone.",
      learn: [
        "What DevTools is used for and how to open it",
        "How the widget inspector helps you understand layout issues",
        "How the console/logs view helps you read print() output and errors",
      ],
      scenario:
        "Think of it like this: DevTools is like an X-ray machine for your running app. Instead of guessing why a widget looks wrong, you can see exactly its size, position, and properties, right there on screen.",
      visual: {
        kind: "table",
        title: "Useful DevTools panels",
        columns: ["Panel", "Helps you"],
        rows: [
          ["Widget Inspector", "See the widget tree and each widget's properties"],
          ["Logging view", "Read print() output and error messages clearly"],
          ["Performance view", "Spot slow frames or jank"],
        ],
      },
      code: {
        label: "Logs you would see in DevTools",
        content: `void main() {
  print("App started");
  print("Loading contacts...");
  print("Contacts loaded: 2 items");
}`,
      },
      tip: "When something looks visually wrong, open the widget inspector first and click directly on the problem widget — it is often faster than guessing from reading code alone.",
      warning: "Do not ignore error messages shown in the console just because the app still 'runs' — some errors quietly point to real bugs that will cause bigger problems later.",
      practice: {
        level1: "Explain, in your own words, what the widget inspector is used for.",
        level2: "Run your own project and open DevTools (or your editor's built-in equivalent) to explore the widget tree.",
        level3: "Find one print() statement in your own project and locate it in the console/logs view.",
      },
      summary:
        "Flutter DevTools gives you tools to inspect widgets, read logs, and check performance while your app runs, making debugging much easier.",
      next: "Next, you will write unit tests to automatically check that your Dart logic works correctly.",
      quiz: {
        q: "What does the widget inspector in DevTools help you do?",
        options: [
          "See the widget tree and each widget's actual properties on screen",
          "Automatically fix every bug for you",
          "Publish your app to the Play Store",
          "Write Dart code for you",
        ],
        answer: 0,
        explain: "The widget inspector lets you visually explore the widget tree and inspect individual widget properties.",
      },
      quiz2: {
        q: "Why should you pay attention to error messages in the console even if the app seems to 'still run'?",
        options: [
          "They can point to real bugs that cause bigger problems later",
          "Console errors never matter if the UI looks fine",
          "Errors always stop the app immediately with no exceptions",
          "The console only shows unrelated system messages",
        ],
        answer: 0,
        explain: "Some errors are non-fatal but still indicate real problems worth investigating before they grow.",
      },
      challenge: {
        title: "Trace a simple log flow",
        desc: "Write a function logStep(String step) that prints the step with a timestamp-like prefix '[LOG]', then call it three times.",
        starter: `void logStep(String step) {
  // print the step with a "[LOG]" prefix
}

void main() {
  // call logStep three times with different messages
}`,
        solution: `void logStep(String step) {
  print("[LOG] " + step);
}

void main() {
  logStep("App started");
  logStep("Loading data");
  logStep("Data loaded");
}`,
        keywords: [
          { label: "Defines logStep", hint: "void logStep(", pattern: "void\\s+logStep\\s*\\(" },
          { label: "Uses the LOG prefix", hint: "[LOG]", pattern: "\\[LOG\\]" },
          { label: "Calls logStep 3 times", hint: "logStep(...)", pattern: "logStep\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain what Flutter DevTools is used for",
        "Use the widget inspector to understand layout issues",
        "Read logs and error messages in the console",
      ],
    },
    {
      title: "Writing Unit Tests",
      xp: 15,
      def:
        "A **unit test** checks that one small piece of logic, like a function, behaves correctly, automatically — without needing to manually tap through your app every time to check it still works.",
      example:
        "If you have a function that calculates a shopping cart's total, a unit test can automatically check 'does calculateTotal([2, 3], [10, 5]) return 35?' every time you run your tests, catching mistakes immediately if you break something later.",
      learn: [
        "What a unit test checks and why automation helps",
        "How to write a basic test() block using the test package",
        "How expect() compares an actual result to an expected one",
      ],
      scenario:
        "Think of it like this: a unit test is like a quality-control checklist at a factory. Instead of a human checking every single product by hand forever, an automated check quickly verifies 'does this one specific thing still work as expected?' every time.",
      visual: {
        kind: "table",
        title: "Unit test building blocks",
        columns: ["Piece", "Purpose"],
        rows: [
          ["test('description', () { ... })", "Defines one named test case"],
          ["expect(actual, expected)", "Checks that actual matches expected"],
        ],
      },
      code: {
        label: "A simple unit test",
        content: `import 'package:test/test.dart';

int add(int a, int b) {
  return a + b;
}

void main() {
  test("add() sums two numbers correctly", () {
    expect(add(2, 3), 5);
  });

  test("add() works with negative numbers", () {
    expect(add(-1, 1), 0);
  });
}`,
      },
      tip: "Give each test a clear description, like 'add() sums two numbers correctly', so a failing test immediately tells you what broke.",
      warning: "Do not only test the 'happy path' (normal expected input) — also test edge cases like zero, negative numbers, or empty lists, since bugs often hide there.",
      practice: {
        level1: "Write a unit test for a multiply(a, b) function checking multiply(3, 4) equals 12.",
        level2: "Add a second test checking multiply(0, 5) equals 0.",
        level3: "Add a test for a function that handles an empty List<int>, checking it does not crash.",
      },
      summary:
        "Unit tests automatically verify that individual functions behave correctly, catching regressions quickly as your code changes.",
      next: "Next, you will learn widget tests, which check how your UI behaves, not just plain logic.",
      quiz: {
        q: "What does a unit test typically check?",
        options: [
          "That one small piece of logic, like a function, behaves correctly",
          "The app's entire visual design",
          "Whether the app has been published to the Play Store",
          "The user's internet connection speed",
        ],
        answer: 0,
        explain: "Unit tests focus on verifying small, isolated pieces of logic, usually functions or methods.",
      },
      quiz2: {
        q: "Why should unit tests also cover edge cases like zero or negative numbers?",
        options: [
          "Bugs often hide in unusual or boundary inputs, not just normal ones",
          "Edge cases never actually occur in real apps",
          "Testing edge cases is always impossible",
          "Edge cases only matter for UI testing, not logic",
        ],
        answer: 0,
        explain: "Testing boundary and unusual inputs helps catch bugs that normal 'happy path' testing might miss.",
      },
      challenge: {
        title: "Test a subtract function",
        desc: "Write a subtract(a, b) function and a unit test checking subtract(10, 4) equals 6.",
        starter: `import 'package:test/test.dart';

int subtract(int a, int b) {
  // return a minus b
}

void main() {
  // write a test checking subtract(10, 4) equals 6
}`,
        solution: `import 'package:test/test.dart';

int subtract(int a, int b) {
  return a - b;
}

void main() {
  test("subtract() works correctly", () {
    expect(subtract(10, 4), 6);
  });
}`,
        keywords: [
          { label: "Defines subtract", hint: "int subtract(", pattern: "int\\s+subtract\\s*\\(" },
          { label: "Uses test()", hint: "test(...)", pattern: "test\\s*\\(" },
          { label: "Uses expect()", hint: "expect(...)", pattern: "expect\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain what a unit test checks",
        "Write a basic test() block using expect()",
        "Test both normal cases and edge cases",
      ],
    },
    {
      title: "Writing Widget Tests",
      xp: 15,
      def:
        "A **widget test** checks that part of your UI looks and behaves correctly, like confirming that tapping a button updates a counter's text on screen — all run automatically, without a real device.",
      example:
        "A widget test for a counter app can simulate tapping the '+' button and then check that the text actually changed from 'Count: 0' to 'Count: 1', catching UI bugs before a real user ever sees them.",
      learn: [
        "What a widget test checks, compared to a plain unit test",
        "How to use WidgetTester to pump a widget and simulate a tap",
        "How to use finders like find.text() to check what is on screen",
      ],
      scenario:
        "Think of it like this: a widget test is like a robot tester that taps your app's buttons exactly like a real person would, then checks the screen afterward — but it can run this check automatically, hundreds of times, in seconds.",
      visual: {
        kind: "table",
        title: "Widget test building blocks",
        columns: ["Piece", "Purpose"],
        rows: [
          ["testWidgets('description', (tester) async {...})", "Defines one widget test case"],
          ["tester.pumpWidget(...)", "Builds your widget for testing"],
          ["find.text('...')", "Looks for a piece of text on screen"],
        ],
      },
      code: {
        label: "A simple counter widget test",
        content: `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets("Tapping + increases the counter", (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: const Text("Count: 0"),
        ),
      ),
    );

    expect(find.text("Count: 0"), findsOneWidget);
  });
}`,
      },
      tip: "Keep widget tests focused on one small behavior at a time, like 'tapping this button shows that text' — small, focused tests are much easier to understand when they fail.",
      warning: "Do not forget 'await' before tester.pumpWidget() and tester.tap() — widget tests are asynchronous, and skipping await can cause confusing, inconsistent results.",
      practice: {
        level1: "Explain, in your own words, how a widget test differs from a plain unit test.",
        level2: "Write a widget test that pumps a simple Text widget and checks it is found.",
        level3: "Describe how you would simulate tapping a button using tester.tap() and tester.pump().",
      },
      summary:
        "Widget tests simulate real user interactions, like tapping buttons, and check that your UI responds correctly, all automatically.",
      next: "Next, you will learn how to debug common Gradle errors on Android builds.",
      quiz: {
        q: "What does a widget test check, compared to a plain unit test?",
        options: [
          "How part of the UI behaves, including simulated taps and visible text",
          "Only server-side logic, never UI",
          "Nothing different, they are identical",
          "Only the app's build.gradle configuration",
        ],
        answer: 0,
        explain: "Widget tests focus on UI behavior, simulating interactions and checking visible results.",
      },
      quiz2: {
        q: "Why must you await tester.pumpWidget() and tester.tap() in a widget test?",
        options: [
          "Because widget tests are asynchronous, and skipping await causes unreliable results",
          "Await is only decorative and has no real effect",
          "pumpWidget() never needs to be awaited",
          "Only tap() needs await, never pumpWidget()",
        ],
        answer: 0,
        explain: "Widget test operations are asynchronous; proper awaiting ensures the UI has actually updated before checks run.",
      },
      challenge: {
        title: "Write a basic widget test",
        desc: "Write a testWidgets block that pumps a MaterialApp with Scaffold body Text('Hello') and checks it is found.",
        starter: `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  // write a testWidgets block checking for the text "Hello"
}`,
        solution: `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets("Shows Hello text", (tester) async {
    await tester.pumpWidget(
      const MaterialApp(home: Scaffold(body: Text("Hello"))),
    );
    expect(find.text("Hello"), findsOneWidget);
  });
}`,
        keywords: [
          { label: "Uses testWidgets", hint: "testWidgets(...)", pattern: "testWidgets\\s*\\(" },
          { label: "Uses pumpWidget", hint: "pumpWidget(...)", pattern: "pumpWidget\\s*\\(" },
          { label: "Uses find.text", hint: "find.text(...)", pattern: "find\\.text\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain how a widget test differs from a unit test",
        "Pump a widget for testing using WidgetTester",
        "Use find.text() to check what is shown on screen",
      ],
    },
    {
      title: "Debugging Common Gradle Errors",
      xp: 10,
      def:
        "**Gradle** is the build tool Android uses behind the scenes to compile your app. Gradle errors can look scary, but most beginner issues come from a small set of common causes: version mismatches, missing SDKs, or stale build caches.",
      example:
        "After updating Flutter, you might suddenly see a Gradle error about an incompatible version. Often, simply running 'flutter clean' and then rebuilding fixes it by clearing out old, mismatched build files.",
      learn: [
        "Why Gradle errors can look intimidating but are often simple to fix",
        "Common causes: version mismatches, missing Android SDK components, stale caches",
        "How 'flutter clean' and re-running flutter doctor help diagnose issues",
      ],
      scenario:
        "Think of it like this: a Gradle error is often like a jammed printer — scary-looking error lights, but usually fixed by the same few steps: turn it off and on (flutter clean), check the paper tray (SDK versions), and try again.",
      visual: {
        kind: "table",
        title: "Common Gradle fixes",
        columns: ["Problem", "Common fix"],
        rows: [
          ["Stale or corrupted build files", "Run 'flutter clean', then rebuild"],
          ["SDK version mismatch", "Update Android SDK via Android Studio's SDK Manager"],
          ["Unclear error overall", "Re-run 'flutter doctor' to check your whole setup"],
        ],
      },
      code: {
        label: "A mental checklist for Gradle errors",
        content: `void main() {
  List<String> steps = [
    "1. Read the FIRST error line carefully, not just the last one",
    "2. Try: flutter clean",
    "3. Try: flutter pub get",
    "4. Run: flutter doctor",
    "5. Search the exact error message online if still stuck",
  ];

  for (var step in steps) {
    print(step);
  }
}`,
      },
      tip: "Copy the exact first error line and search for it online — Gradle error messages are usually specific enough that someone else has likely hit (and solved) the exact same issue.",
      warning: "Do not panic and start randomly deleting project files when you see a scary Gradle error — follow a calm, step-by-step checklist instead, like the one above.",
      practice: {
        level1: "Write down, in your own words, the first three steps you would try for a confusing Gradle error.",
        level2: "Run 'flutter clean' followed by 'flutter pub get' on one of your own projects.",
        level3: "Practice reading a sample error message and identifying just the first, most relevant line.",
      },
      summary:
        "Most Gradle errors are solved with a calm, repeatable checklist: read the first error line, try flutter clean, check SDK versions, and re-run flutter doctor.",
      next: "Next chapter, you will prepare your app for production, focusing on performance and release builds.",
      quiz: {
        q: "What is often a good first troubleshooting step for a confusing Gradle error?",
        options: [
          "Running 'flutter clean' and rebuilding the project",
          "Immediately uninstalling Flutter completely",
          "Deleting the entire project folder with no backup",
          "Ignoring the error and hoping it disappears",
        ],
        answer: 0,
        explain: "flutter clean often resolves build issues caused by stale or corrupted build artifacts.",
      },
      quiz2: {
        q: "Why focus on the FIRST error line in a long Gradle error output, rather than the last?",
        options: [
          "The first error is often the real root cause; later lines can just be side effects",
          "The last line is always the only important one",
          "Gradle errors have no particular order",
          "Error order never matters for debugging",
        ],
        answer: 0,
        explain: "The earliest error often reveals the actual root problem, while later messages can just be consequences of it.",
      },
      challenge: {
        title: "Build a troubleshooting checklist",
        desc: "Create a List<String> of 4 troubleshooting steps for a Gradle error and print them numbered.",
        starter: `void main() {
  // list 4 troubleshooting steps and print them numbered
}`,
        solution: `void main() {
  List<String> steps = [
    "Read the first error line",
    "Run flutter clean",
    "Run flutter pub get",
    "Run flutter doctor",
  ];
  for (int i = 0; i < steps.length; i++) {
    print((i + 1).toString() + ". " + steps[i]);
  }
}`,
        keywords: [
          { label: "Creates a List", hint: "List<String>", pattern: "List<String>" },
          { label: "Uses a loop", hint: "for (...)", pattern: "for\\s*\\(" },
          { label: "Prints numbered steps", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Approach Gradle errors calmly with a repeatable checklist",
        "Identify common causes like version mismatches and stale caches",
        "Use flutter clean and flutter doctor to diagnose build issues",
      ],
    },
  ],
};
