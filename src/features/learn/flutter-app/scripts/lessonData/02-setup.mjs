// Chapter 2 — Set Up Environment

export const CH_SETUP = {
  id: "setup",
  title: "Set Up Environment",
  icon: "download",
  color: "#0175c2",
  lessons: [
    {
      title: "Installing the Flutter SDK",
      xp: 10,
      def:
        "The **Flutter SDK** (Software Development Kit) is a folder of tools that lets your computer understand and run Flutter code. You download it once, add it to your system, and every Flutter project uses it.",
      example:
        "Think of buying a sewing machine before you can sew clothes. The Flutter SDK is that machine — without installing it first, your computer has no way to turn your Dart code into a running app.",
      learn: [
        "What the Flutter SDK actually is",
        "Where to download it from safely",
        "Why every Flutter project depends on it being installed correctly",
      ],
      scenario:
        "Think of it like this: the SDK is like a toolbox delivered to your garage. You do not use every tool immediately, but without the toolbox in your garage, you cannot start building anything at all.",
      visual: {
        kind: "table",
        title: "SDK installation basics",
        columns: ["Step", "What you do"],
        rows: [
          ["1", "Download the Flutter SDK zip from flutter.dev"],
          ["2", "Unzip it to a simple folder path, like C:\\flutter"],
          ["3", "Add that folder's bin path to your system PATH"],
        ],
      },
      code: {
        label: "Checking Dart is reachable (concept)",
        content: `// After installing the SDK and adding it to PATH,
// typing this in a terminal should work:
//   dart --version
//   flutter --version

void main() {
  print("If 'flutter --version' works in your terminal, setup succeeded.");
}`,
      },
      tip: "Pick a short, simple install path like C:\\flutter or ~/flutter. Long paths with spaces can cause confusing setup errors.",
      warning: "Do not install Flutter inside a folder that needs admin rights to write to (like Program Files on Windows) — it can cause permission errors later.",
      practice: {
        level1: "Write down, in your own words, what the Flutter SDK is for.",
        level2: "Find the official Flutter installation page for your operating system (do this on your own computer).",
        level3: "List the three basic installation steps from the table above in your own words.",
      },
      summary:
        "The Flutter SDK is the toolbox that lets your computer build and run Flutter apps — it must be installed and placed on your system PATH.",
      next: "Next, you will install an editor like Android Studio or VS Code to write your Flutter code comfortably.",
      quiz: {
        q: "What is the Flutter SDK?",
        options: [
          "A set of tools that lets your computer build and run Flutter apps",
          "A single app you download from the Play Store",
          "A type of phone case",
          "A programming language that replaces Dart",
        ],
        answer: 0,
        explain: "The SDK is the toolkit (compilers, libraries, command-line tools) needed to build Flutter apps.",
      },
      quiz2: {
        q: "Why is it recommended to install Flutter in a short, simple folder path?",
        options: [
          "Long paths with spaces can cause confusing setup or build errors",
          "Short paths make the app run faster on phones",
          "Flutter refuses to install anywhere except C:\\flutter",
          "It changes the app's final file size",
        ],
        answer: 0,
        explain: "Simple install paths avoid many beginner setup headaches caused by spaces or very long paths.",
      },
      challenge: {
        title: "Describe setup in code",
        desc: "Create a List<String> of 3 setup steps (download, unzip, add to PATH) and print them numbered.",
        starter: `void main() {
  // list the 3 setup steps and print them with numbers
}`,
        solution: `void main() {
  List<String> steps = ["Download SDK", "Unzip folder", "Add to PATH"];
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
        "Explain what the Flutter SDK is in plain words",
        "Describe why it needs to be added to the system PATH",
        "List the basic steps to install it",
      ],
    },
    {
      title: "Android Studio and VS Code",
      xp: 10,
      def:
        "You can write Flutter code in different editors. **Android Studio** is a full IDE with built-in Android tools, while **VS Code** is a lighter, faster editor with a Flutter extension. Both work well — many developers use VS Code day to day and Android Studio for Android-specific tasks.",
      example:
        "Think of choosing between a full toolbox truck (Android Studio) and a lightweight tool belt (VS Code). Both can get the job done; the truck has more built-in extras, the tool belt is quicker to carry around.",
      learn: [
        "The difference between Android Studio and VS Code for Flutter",
        "Why you need the Flutter and Dart extensions/plugins installed",
        "How to pick an editor based on your computer's speed and your preference",
      ],
      scenario:
        "Think of it like this: Android Studio is like a fully equipped workshop with every tool built in. VS Code is like a smaller, faster workbench where you add just the tools (extensions) you need.",
      visual: {
        kind: "table",
        title: "Choosing an editor",
        columns: ["Editor", "Good for"],
        rows: [
          ["Android Studio", "Deep Android tools, emulators, heavier projects"],
          ["VS Code", "Lightweight, fast, great Flutter/Dart extensions"],
        ],
      },
      code: {
        label: "What you are checking for",
        content: `// In VS Code: install the "Flutter" extension (it also installs "Dart").
// In Android Studio: install the "Flutter" plugin from Settings > Plugins.

void main() {
  print("Editor + Flutter extension/plugin = ready to write Flutter code.");
}`,
      },
      tip: "If your computer is older or slower, start with VS Code — it generally uses fewer resources than Android Studio.",
      warning: "Forgetting to install the Flutter extension/plugin is a common beginner mistake — without it, your editor will not understand Flutter-specific code hints.",
      practice: {
        level1: "Decide which editor you want to try first and say why.",
        level2: "Open your chosen editor and find its extensions/plugins panel.",
        level3: "Install the Flutter extension or plugin and confirm it shows up in the list.",
      },
      summary:
        "Both Android Studio and VS Code work for Flutter — just make sure the Flutter (and Dart) extension or plugin is installed.",
      next: "Next, you will run flutter doctor to check that everything is installed correctly.",
      quiz: {
        q: "What must you install in your editor to write Flutter code comfortably?",
        options: [
          "The Flutter extension or plugin (which also brings in Dart support)",
          "A separate copy of Android itself",
          "Nothing extra is ever needed",
          "A C++ compiler plugin",
        ],
        answer: 0,
        explain: "The Flutter extension/plugin adds code hints, debugging tools, and run buttons for Flutter projects.",
      },
      quiz2: {
        q: "A student has an older, slower laptop. Which editor choice is usually a lighter starting point?",
        options: [
          "VS Code, since it generally uses fewer system resources",
          "Android Studio, since it never uses more memory",
          "Neither editor can run on older laptops",
          "Only Android Studio works with Flutter at all",
        ],
        answer: 0,
        explain: "VS Code is typically lighter weight than full IDEs like Android Studio, which helps on slower machines.",
      },
      challenge: {
        title: "List your editor choice",
        desc: "Create a String variable with your chosen editor's name and print a sentence explaining why you chose it.",
        starter: `void main() {
  // store your editor choice and print your reason
}`,
        solution: `void main() {
  String editor = "VS Code";
  String reason = "lightweight and fast";
  print("I chose " + editor + " because it is " + reason + ".");
}`,
        keywords: [
          { label: "Declares a String", hint: "String editor", pattern: "String\\s+\\w+" },
          { label: "Prints a sentence", hint: "print(...)", pattern: "print\\s*\\(" },
          { label: "Mentions editor name", hint: "VS Code or Android Studio", pattern: "(VS Code|Android Studio)" },
        ],
      },
      outcomes: [
        "Compare Android Studio and VS Code for Flutter development",
        "Explain why the Flutter extension/plugin is required",
        "Choose an editor appropriate for their computer",
      ],
    },
    {
      title: "Checking Your Setup with flutter doctor",
      xp: 10,
      def:
        "**`flutter doctor`** is a command you type in a terminal that checks your whole setup — SDK, editor connections, Android tools, and more — and tells you exactly what is missing or broken.",
      example:
        "Think of visiting an actual doctor for a check-up. They check your temperature, blood pressure, and more, then give you a report. flutter doctor does the same thing for your development setup.",
      learn: [
        "What flutter doctor checks",
        "How to read a flutter doctor report",
        "What to do when it shows a red X next to something",
      ],
      scenario:
        "Think of it like this: flutter doctor is a mechanic's checklist for your car before a big road trip. Green checks mean 'ready to drive'; red marks mean 'fix this part first'.",
      visual: {
        kind: "table",
        title: "Common flutter doctor sections",
        columns: ["Section", "What it checks"],
        rows: [
          ["Flutter", "Is the SDK installed and up to date"],
          ["Android toolchain", "Android SDK and licenses"],
          ["Connected device", "Is an emulator or phone detected"],
        ],
      },
      code: {
        label: "Reading the result (concept)",
        content: `// Typing in a terminal:
//   flutter doctor
//
// Example simplified output:
//   [✓] Flutter
//   [✓] Android toolchain
//   [!] No devices available

void main() {
  print("Green check = good. Exclamation or X = something to fix.");
}`,
      },
      tip: "Run flutter doctor again after fixing any issue — it is normal to run it two or three times during setup.",
      warning: "Do not ignore 'Android licenses not accepted' messages — run the suggested command (often 'flutter doctor --android-licenses') to accept them.",
      practice: {
        level1: "Explain in your own words what flutter doctor is for.",
        level2: "Run flutter doctor on your own computer and read the output.",
        level3: "Pick one warning or error from your output and look up how to fix it.",
      },
      summary:
        "flutter doctor is a built-in health check for your development setup, showing exactly what is working and what needs fixing.",
      next: "Next, you will create your very first Flutter project using the command line.",
      quiz: {
        q: "What does running flutter doctor help you do?",
        options: [
          "Check your development setup and find missing or broken pieces",
          "Automatically publish your app to the Play Store",
          "Design your app's icons",
          "Write Dart code for you",
        ],
        answer: 0,
        explain: "flutter doctor is a diagnostic tool that reports the health of your Flutter setup.",
      },
      quiz2: {
        q: "flutter doctor shows '[!] Android licenses not accepted'. What should you do?",
        options: [
          "Run the suggested command to accept the Android licenses",
          "Ignore it, licenses never matter",
          "Uninstall Flutter completely",
          "Switch to a different programming language",
        ],
        answer: 0,
        explain: "Unaccepted Android licenses commonly block builds — accepting them resolves the warning.",
      },
      challenge: {
        title: "Print a doctor report",
        desc: "Create a Map<String, bool> representing a simplified doctor report with 3 checks, then print each with a check or warning symbol.",
        starter: `void main() {
  // create a Map<String, bool> and print a report
}`,
        solution: `void main() {
  Map<String, bool> report = {
    "Flutter SDK": true,
    "Android toolchain": true,
    "Connected device": false,
  };
  report.forEach((key, ok) {
    print((ok ? "[OK] " : "[!] ") + key);
  });
}`,
        keywords: [
          { label: "Creates a Map", hint: "Map<String, bool>", pattern: "Map<String,\\s*bool>" },
          { label: "Uses forEach or a loop", hint: "forEach or for", pattern: "(forEach|for\\s*\\()" },
          { label: "Prints the report", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain the purpose of flutter doctor",
        "Read a flutter doctor report and spot problems",
        "Know what to do when a check fails",
      ],
    },
    {
      title: "Creating Your First Flutter Project",
      xp: 10,
      def:
        "The command **`flutter create my_app`** builds a brand-new Flutter project folder, filled with starter files and a working demo app, ready for you to run and edit.",
      example:
        "Think of ordering a furniture starter kit. You do not build every piece from raw wood — the kit already has basic pieces assembled, and you customize from there. flutter create gives you that starter kit for an app.",
      learn: [
        "How to run flutter create to start a new project",
        "What files get generated automatically",
        "How to run that starter project for the first time",
      ],
      scenario:
        "Think of it like this: flutter create is like a bakery handing you a pre-made cake base. You did not bake the base yourself, but now you can decorate it however you like.",
      visual: {
        kind: "table",
        title: "After flutter create my_app",
        columns: ["Command / Action", "Result"],
        rows: [
          ["flutter create my_app", "Creates a new folder named my_app with starter code"],
          ["cd my_app", "Moves your terminal into that project folder"],
          ["flutter run", "Builds and launches the starter demo app"],
        ],
      },
      code: {
        label: "What main.dart usually starts with",
        content: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(child: Text("Hello, Flutter!")),
      ),
    );
  }
}`,
      },
      tip: "Project names must be lowercase with underscores, like my_app — not My App or myApp.",
      warning: "Do not delete the pubspec.yaml file that comes with your new project — it tells Flutter which packages and assets your app needs.",
      practice: {
        level1: "Write the exact command you would type to create a project named chat_app.",
        level2: "Run flutter create on your own computer and open the generated folder.",
        level3: "Run flutter run and confirm the starter counter demo app launches.",
      },
      summary:
        "flutter create generates a ready-to-run starter project, and flutter run launches it so you can see Flutter working for the first time.",
      next: "Next, you will explore the folders inside your new project and learn what common setup errors look like.",
      quiz: {
        q: "What does the command 'flutter create my_app' do?",
        options: [
          "Creates a new Flutter project folder with starter files",
          "Publishes your app to app stores",
          "Deletes your current Flutter installation",
          "Only installs the Android SDK",
        ],
        answer: 0,
        explain: "flutter create scaffolds a brand new project with a working demo app you can build on.",
      },
      quiz2: {
        q: "Why must project names like 'chat_app' use lowercase letters and underscores instead of spaces?",
        options: [
          "Dart package naming rules require this simple, safe format",
          "Uppercase letters make the app run faster",
          "Spaces make the app use less memory",
          "It has no real reason, it is just a style choice with no rule behind it",
        ],
        answer: 0,
        explain: "Dart and Flutter package naming conventions require lowercase_with_underscores names.",
      },
      challenge: {
        title: "Describe project creation steps",
        desc: "Create a List<String> of the 3 steps to make and run a new project (create, cd, run) and print them in order.",
        starter: `void main() {
  // list the 3 steps to create and run a project
}`,
        solution: `void main() {
  List<String> steps = [
    "flutter create my_app",
    "cd my_app",
    "flutter run",
  ];
  for (var s in steps) {
    print(s);
  }
}`,
        keywords: [
          { label: "Creates a List", hint: "List<String>", pattern: "List<String>" },
          { label: "Mentions flutter create", hint: "flutter create", pattern: "flutter create" },
          { label: "Prints steps", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Run flutter create to start a new project",
        "Describe what files are generated automatically",
        "Run the starter project using flutter run",
      ],
    },
    {
      title: "Project Folders and Common Errors",
      xp: 10,
      def:
        "A new Flutter project has a predictable folder structure: **lib/** holds your Dart code, **pubspec.yaml** lists dependencies, and platform folders (**android/**, **ios/**) hold native glue code you rarely touch directly.",
      example:
        "Think of moving into a new house with labeled rooms: kitchen (lib/), storage room (android/, ios/), and a front door sign listing house rules (pubspec.yaml). Knowing which room is which saves a lot of confusion later.",
      learn: [
        "What lib/, pubspec.yaml, android/, and ios/ are for",
        "Common beginner setup errors and what they usually mean",
        "How to read an error message calmly instead of panicking",
      ],
      scenario:
        "Think of it like this: your project folder is like a filing cabinet. lib/ is the drawer where you keep your daily working papers (Dart code). pubspec.yaml is the label on the outside listing what the cabinet contains.",
      visual: {
        kind: "table",
        title: "Key project folders",
        columns: ["Folder/File", "Purpose"],
        rows: [
          ["lib/", "Your Dart source code, including main.dart"],
          ["pubspec.yaml", "Lists dependencies, assets, and app metadata"],
          ["android/, ios/", "Native platform configuration, rarely edited directly"],
        ],
      },
      code: {
        label: "A simplified pubspec.yaml idea (as a Dart Map)",
        content: `void main() {
  Map<String, dynamic> pubspec = {
    "name": "my_app",
    "dependencies": ["flutter", "http", "provider"],
  };
  print("App name: " + pubspec["name"]);
  print("Dependencies: " + pubspec["dependencies"].toString());
}`,
      },
      tip: "When you see a red error screen in Flutter, scroll up in the terminal — the real cause is often the first error message, not the last.",
      warning: "A very common beginner error is a missing comma or bracket in pubspec.yaml, which breaks the whole project until it is fixed.",
      practice: {
        level1: "Name the folder where your Dart code lives.",
        level2: "Open your project's pubspec.yaml file and find the 'name' field.",
        level3: "Intentionally remove a comma somewhere safe in a test file, run the project, and read the resulting error message.",
      },
      summary:
        "Knowing the purpose of lib/, pubspec.yaml, and the platform folders helps you navigate any Flutter project and understand common errors.",
      next: "Next chapter, you will dive into Dart programming basics — variables, loops, and functions.",
      quiz: {
        q: "Where does your main Dart application code usually live in a Flutter project?",
        options: [
          "Inside the lib/ folder",
          "Inside the android/ folder only",
          "Inside pubspec.yaml",
          "Flutter projects have no folders",
        ],
        answer: 0,
        explain: "The lib/ folder holds your Dart source code, starting with lib/main.dart.",
      },
      quiz2: {
        q: "A beginner edits pubspec.yaml and forgets a colon. What is the most likely result?",
        options: [
          "The project fails to run until the formatting is fixed",
          "Nothing changes, YAML formatting never matters",
          "The app automatically fixes the file itself",
          "Only the app icon changes",
        ],
        answer: 0,
        explain: "pubspec.yaml uses strict YAML formatting; small mistakes like missing colons break the whole project.",
      },
      challenge: {
        title: "Describe project folders",
        desc: "Create a Map<String, String> pairing folder names to their purpose, then print each pair.",
        starter: `void main() {
  // map folder names to their purpose and print each
}`,
        solution: `void main() {
  Map<String, String> folders = {
    "lib": "Dart source code",
    "android": "Native Android config",
    "ios": "Native iOS config",
  };
  folders.forEach((folder, purpose) {
    print(folder + " -> " + purpose);
  });
}`,
        keywords: [
          { label: "Creates a Map", hint: "Map<String, String>", pattern: "Map<String,\\s*String>" },
          { label: "Uses forEach", hint: "forEach(...)", pattern: "forEach\\s*\\(" },
          { label: "Prints each pair", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Identify the purpose of lib/, pubspec.yaml, android/, and ios/",
        "Read a basic Flutter error message calmly",
        "Recognize common pubspec.yaml formatting mistakes",
      ],
    },
  ],
};
