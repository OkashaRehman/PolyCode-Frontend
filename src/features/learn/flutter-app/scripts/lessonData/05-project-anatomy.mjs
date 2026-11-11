// Chapter 5 — Understanding a Flutter Project

export const CH_PROJECT_ANATOMY = {
  id: "project-anatomy",
  title: "Understanding a Flutter Project",
  icon: "folder-tree",
  color: "#1565c0",
  lessons: [
    {
      title: "main.dart and MaterialApp",
      xp: 10,
      def:
        "Every Flutter app starts running from the **main()** function, which calls **runApp()**. **MaterialApp** is a special widget that sets up the whole app — theme, navigation, and the Material Design look used by Android-style apps.",
      example:
        "Think of main() as the power button of your app — nothing happens until it is pressed. MaterialApp is like the building's foundation and shared rules (lighting, elevators) that every room (screen) in the building will use.",
      learn: [
        "What main() and runApp() do when an app starts",
        "What MaterialApp provides for your whole app",
        "How theme and title are set at the top level",
      ],
      scenario:
        "Think of it like this: runApp(MyApp()) is like plugging in and switching on a whole appliance. MaterialApp is the appliance's outer shell that holds every smaller part (your screens) together and gives them a shared style.",
      visual: {
        kind: "diagram",
        title: "App startup flow",
        nodes: [
          { label: "main()", items: ["First function to run"] },
          { label: "runApp(MyApp())", items: ["Starts the whole widget tree"] },
          { label: "MaterialApp", items: ["Theme, title, home screen"] },
        ],
      },
      code: {
        label: "A minimal main.dart",
        content: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "QuantumChat",
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const Scaffold(
        body: Center(child: Text("Welcome!")),
      ),
    );
  }
}`,
      },
      tip: "The 'title' in MaterialApp is often used in the task switcher/recent apps list, not necessarily shown inside the app itself.",
      warning: "Do not create more than one MaterialApp in your app — there should normally be exactly one, at the very top of your widget tree.",
      practice: {
        level1: "Change the title in the example above to your own app name.",
        level2: "Change the primarySwatch color to Colors.green and describe what you expect to change.",
        level3: "Add a second line of text inside the Center widget using a Column (you may just describe the plan in words).",
      },
      summary:
        "main() starts your app, runApp() mounts it on screen, and MaterialApp wraps everything with shared theme and navigation setup.",
      next: "Next, you will learn about Scaffold and how the widget tree is structured below MaterialApp.",
      quiz: {
        q: "What is the role of runApp() in a Flutter app?",
        options: [
          "It takes your root widget and displays it on the screen",
          "It only prints text to the console",
          "It deletes the previous app version",
          "It only works for web apps",
        ],
        answer: 0,
        explain: "runApp() attaches the given widget to the screen, starting the whole app.",
      },
      quiz2: {
        q: "What does MaterialApp provide for a Flutter app?",
        options: [
          "Shared theme, title, and navigation setup for the whole app",
          "A single button and nothing else",
          "Only internet connectivity",
          "A way to compile Dart into Java",
        ],
        answer: 0,
        explain: "MaterialApp sets up app-wide concerns like theming and navigation, used by every screen inside it.",
      },
      challenge: {
        title: "Set up a MaterialApp",
        desc: "Write a minimal main.dart with main(), runApp(), and a MyApp widget returning a MaterialApp with a title and a Scaffold home.",
        starter: `import 'package:flutter/material.dart';

void main() {
  // call runApp with your root widget
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // return a MaterialApp with title and home
  }
}`,
        solution: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "My App",
      home: Scaffold(
        body: Center(child: Text("Hello!")),
      ),
    );
  }
}`,
        keywords: [
          { label: "Calls runApp", hint: "runApp(...)", pattern: "runApp\\s*\\(" },
          { label: "Uses MaterialApp", hint: "MaterialApp(...)", pattern: "MaterialApp\\s*\\(" },
          { label: "Has a home Scaffold", hint: "Scaffold(...)", pattern: "Scaffold\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain what main() and runApp() do when an app starts",
        "Describe what MaterialApp provides for the whole app",
        "Set the title and theme of a MaterialApp",
      ],
    },
    {
      title: "Scaffold and the Widget Tree",
      xp: 10,
      def:
        "A **Scaffold** gives you a ready-made screen layout with common pieces already arranged — an app bar at the top, a body in the middle, and optional buttons. The **widget tree** is the nested structure of all widgets, parents containing children.",
      example:
        "Almost every screen in a typical app — settings, profile, chat — reuses the same basic shape: a top bar, content below, maybe a button in the corner. Scaffold gives you that shape instantly instead of building it by hand every time.",
      learn: [
        "What Scaffold provides out of the box",
        "How to read a nested widget tree (parent → child → grandchild)",
        "Common Scaffold slots: appBar, body, floatingActionButton",
      ],
      scenario:
        "Think of it like this: Scaffold is like a furnished apartment template — it already has a kitchen (app bar), living room (body), and a doorbell (floating action button) in place. You just move your own furniture (widgets) into each room.",
      visual: {
        kind: "diagram",
        title: "A simple widget tree",
        nodes: [
          { label: "Scaffold", items: ["The screen's basic layout"] },
          { label: "appBar: AppBar(...)", items: ["Top bar with a title"] },
          { label: "body: Center(Text(...))", items: ["Main content area"] },
        ],
      },
      code: {
        label: "A Scaffold with an AppBar and body",
        content: `import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("QuantumChat")),
      body: const Center(
        child: Text("No messages yet."),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
      },
      tip: "If you are not sure what a Scaffold slot does, hover over it in your editor — most Flutter widgets have helpful built-in documentation.",
      warning: "Do not nest a Scaffold directly inside another Scaffold on the exact same screen — usually each distinct screen should have exactly one Scaffold.",
      practice: {
        level1: "List the three Scaffold slots used in the example above.",
        level2: "Change the AppBar title text and describe what you expect to see.",
        level3: "Add a second icon button idea to the floatingActionButton area (describe in words how you would do it with a Row).",
      },
      summary:
        "Scaffold gives you a ready screen layout, and the widget tree shows how all your widgets nest inside each other, from parent to child.",
      next: "Next, you will look at pubspec.yaml and understand how dependencies and assets are configured.",
      quiz: {
        q: "What does a Scaffold widget provide?",
        options: [
          "A ready-made basic screen layout with slots like appBar and body",
          "A networking connection to the internet",
          "A database for storing user data",
          "A way to compile Dart code",
        ],
        answer: 0,
        explain: "Scaffold provides the basic visual structure of a screen, with named slots for common pieces.",
      },
      quiz2: {
        q: "In the widget tree, what is the relationship between Scaffold and the Text widget inside its body?",
        options: [
          "Text is a descendant (child) nested inside Scaffold",
          "They are unrelated, separate trees",
          "Scaffold is inside the Text widget",
          "Text replaces the Scaffold completely",
        ],
        answer: 0,
        explain: "The widget tree nests children inside parents — Text sits inside Center, which sits inside Scaffold's body.",
      },
      challenge: {
        title: "Build a simple screen",
        desc: "Create a StatelessWidget that returns a Scaffold with an AppBar titled 'Home' and a body showing centered text.",
        starter: `import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // return a Scaffold with appBar and body
  }
}`,
        solution: `import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Home")),
      body: const Center(child: Text("Welcome home!")),
    );
  }
}`,
        keywords: [
          { label: "Uses Scaffold", hint: "Scaffold(...)", pattern: "Scaffold\\s*\\(" },
          { label: "Has an AppBar", hint: "AppBar(...)", pattern: "AppBar\\s*\\(" },
          { label: "Has a body", hint: "body:", pattern: "body\\s*:" },
        ],
      },
      outcomes: [
        "Explain what Scaffold provides for a screen",
        "Read a simple widget tree from parent to child",
        "Use common Scaffold slots like appBar and body",
      ],
    },
    {
      title: "Understanding pubspec.yaml",
      xp: 10,
      def:
        "**pubspec.yaml** is your project's settings file. It lists your app's name, the Flutter/Dart SDK version, external packages (dependencies) you want to use, and any images or fonts (assets) your app needs.",
      example:
        "If your app needs the `http` package to talk to the internet, you add it under `dependencies` in pubspec.yaml. If you want to show a custom logo image, you register that image file under `assets` so Flutter knows it exists.",
      learn: [
        "What sections commonly appear in pubspec.yaml",
        "How to add a new package dependency",
        "How to register an image or font as an asset",
      ],
      scenario:
        "Think of it like this: pubspec.yaml is like a packing list before a trip. It says exactly what you are bringing (packages) and where your important documents are stored (assets) — if something is missing from the list, you cannot use it on the trip.",
      visual: {
        kind: "table",
        title: "Common pubspec.yaml sections",
        columns: ["Section", "Purpose"],
        rows: [
          ["name, description", "Basic info about your app/package"],
          ["dependencies", "External packages your app uses, like http or provider"],
          ["flutter: assets", "Image, font, or data files bundled with your app"],
        ],
      },
      code: {
        label: "pubspec.yaml ideas, shown as a Dart Map",
        content: `void main() {
  Map<String, dynamic> pubspec = {
    "name": "quantum_chat",
    "dependencies": ["flutter", "http", "provider"],
    "assets": ["assets/logo.png"],
  };

  print("App: " + pubspec["name"]);
  print("Packages: " + pubspec["dependencies"].toString());
  print("Assets: " + pubspec["assets"].toString());
}`,
      },
      tip: "After editing pubspec.yaml, run 'flutter pub get' in the terminal so Flutter downloads and links any new packages.",
      warning: "YAML files are picky about spacing — using tabs instead of spaces, or misaligned indentation, can break pubspec.yaml completely.",
      practice: {
        level1: "Explain, in your own words, what pubspec.yaml is used for.",
        level2: "Open your own project's pubspec.yaml and find the dependencies section.",
        level3: "Imagine adding an 'images/' folder with a logo — describe exactly how you would register it under assets.",
      },
      summary:
        "pubspec.yaml controls your app's name, dependencies, and bundled assets, and must be formatted carefully since it uses YAML spacing rules.",
      next: "Next, you will learn how hot reload and hot restart let you see code changes almost instantly while developing.",
      quiz: {
        q: "What is pubspec.yaml used for in a Flutter project?",
        options: [
          "Listing your app's dependencies, assets, and basic settings",
          "Storing user passwords",
          "Writing your app's UI directly",
          "Running your app on a device",
        ],
        answer: 0,
        explain: "pubspec.yaml configures your project: name, dependencies, assets, and more.",
      },
      quiz2: {
        q: "After adding a new package to pubspec.yaml, what command should you run?",
        options: [
          "flutter pub get",
          "flutter doctor",
          "flutter create",
          "No command is needed, changes apply instantly",
        ],
        answer: 0,
        explain: "flutter pub get downloads and links any newly added dependencies listed in pubspec.yaml.",
      },
      challenge: {
        title: "Describe your dependencies",
        desc: "Create a List<String> of 3 packages you might add to pubspec.yaml and print them with a short description each.",
        starter: `void main() {
  // list 3 package names and print a short description for each
}`,
        solution: `void main() {
  Map<String, String> packages = {
    "http": "For calling REST APIs",
    "provider": "For simple state management",
    "shared_preferences": "For saving small local data",
  };
  packages.forEach((name, desc) {
    print(name + ": " + desc);
  });
}`,
        keywords: [
          { label: "Lists package names", hint: "http, provider, etc.", pattern: "(http|provider|shared_preferences)" },
          { label: "Uses a Map or List", hint: "Map or List", pattern: "(Map<|List<)" },
          { label: "Prints descriptions", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain the purpose of pubspec.yaml",
        "Add a new dependency to a Flutter project",
        "Register an asset like an image file",
      ],
    },
    {
      title: "Hot Reload and Hot Restart",
      xp: 10,
      def:
        "**Hot reload** updates your running app almost instantly after you save a code change, usually keeping your current screen and data. **Hot restart** fully restarts the app from scratch, losing current state but applying bigger changes safely.",
      example:
        "If you only change a text color, hot reload shows it in under a second, without losing your place in the app. If you change something structural, like adding a brand-new variable to main(), a hot restart is often needed to apply it correctly.",
      learn: [
        "The difference between hot reload and hot restart",
        "What kinds of changes each one handles well",
        "Why Flutter's fast feedback loop is a huge productivity benefit",
      ],
      scenario:
        "Think of it like this: hot reload is like repainting a room while you are still standing in it — fast, and you do not have to leave. Hot restart is like leaving the house, then walking back in through the front door again — slower, but a clean fresh start.",
      visual: {
        kind: "table",
        title: "Hot reload vs hot restart",
        columns: ["Action", "Speed", "Keeps app state?"],
        rows: [
          ["Hot reload", "Very fast (under a second usually)", "Usually yes"],
          ["Hot restart", "Slower (full restart)", "No, starts fresh"],
        ],
      },
      code: {
        label: "A change you could hot reload",
        content: `import 'package:flutter/material.dart';

class CounterText extends StatelessWidget {
  const CounterText({super.key});

  @override
  Widget build(BuildContext context) {
    // Try changing this color or text, then hot reload
    return const Text(
      "Count: 5",
      style: TextStyle(color: Colors.blue, fontSize: 20),
    );
  }
}`,
      },
      tip: "If hot reload ever behaves strangely (shows old UI, odd errors), a hot restart almost always fixes it.",
      warning: "Do not expect hot reload to work for every change — changes to main(), to native code, or to some initialization logic usually need a full hot restart or a complete stop and re-run.",
      practice: {
        level1: "Explain, in your own words, the difference between hot reload and hot restart.",
        level2: "On your own project, change a Text widget's content and try hot reload.",
        level3: "Make a bigger change (like adding a new variable in main()) and try hot restart instead.",
      },
      summary:
        "Hot reload gives near-instant feedback for small UI tweaks, while hot restart gives a clean full restart for bigger changes.",
      next: "Next chapter, you will build your first real Flutter UI using Stateless and Stateful widgets.",
      quiz: {
        q: "What is the main benefit of hot reload?",
        options: [
          "You can see small code changes almost instantly, without losing your app's current state",
          "It permanently saves your app to the Play Store",
          "It automatically fixes all bugs",
          "It only works on iPhone devices",
        ],
        answer: 0,
        explain: "Hot reload applies code changes quickly while usually preserving your app's current state and screen.",
      },
      quiz2: {
        q: "When is a hot restart usually needed instead of hot reload?",
        options: [
          "When a bigger structural change (like inside main()) needs a fresh start",
          "Every single time you save any file at all",
          "Hot restart is never needed in Flutter",
          "Only when deploying to the Play Store",
        ],
        answer: 0,
        explain: "Bigger changes, especially around app startup, often need a hot restart to apply correctly.",
      },
      challenge: {
        title: "Describe your workflow",
        desc: "Create a Map<String, String> describing when to use hot reload vs hot restart, and print both entries.",
        starter: `void main() {
  // map "Hot Reload" and "Hot Restart" to when you'd use them
}`,
        solution: `void main() {
  Map<String, String> workflow = {
    "Hot Reload": "Small UI tweaks, keep current state",
    "Hot Restart": "Bigger changes, start fresh",
  };
  workflow.forEach((action, when) {
    print(action + ": " + when);
  });
}`,
        keywords: [
          { label: "Uses a Map", hint: "Map<String, String>", pattern: "Map<String,\\s*String>" },
          { label: "Mentions Hot Reload", hint: "Hot Reload", pattern: "Hot Reload" },
          { label: "Mentions Hot Restart", hint: "Hot Restart", pattern: "Hot Restart" },
        ],
      },
      outcomes: [
        "Explain the difference between hot reload and hot restart",
        "Know which kinds of changes each one handles well",
        "Use hot reload to speed up everyday development",
      ],
    },
  ],
};
