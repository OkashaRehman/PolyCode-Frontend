// Chapter 20 — Performance and Production Readiness

export const CH_PRODUCTION = {
  id: "production",
  title: "Performance and Production Readiness",
  icon: "rocket",
  color: "#e65100",
  lessons: [
    {
      title: "const and Simple Performance Wins",
      xp: 15,
      def:
        "Marking a widget as **const** tells Flutter 'this widget never changes', so Flutter can skip rebuilding it unnecessarily, which can meaningfully improve performance, especially in widgets that rebuild often.",
      example:
        "A fixed app logo Image or a static Text label that never changes should be marked const. When the surrounding screen rebuilds (say, due to a counter changing), Flutter can skip rebuilding that const widget entirely.",
      learn: [
        "What const means for a widget, in plain words",
        "Where const is commonly used: Text, Icon, SizedBox, EdgeInsets",
        "Why avoiding unnecessary rebuilds improves performance",
      ],
      scenario:
        "Think of it like this: a const widget is like a laminated sign on a wall — once it's made, you never need to repaint it. A non-const widget is like a whiteboard that might need to be erased and rewritten every time something nearby changes.",
      visual: {
        kind: "table",
        title: "const usage examples",
        columns: ["Without const", "With const"],
        rows: [
          ["Text(\"Hello\")", "const Text(\"Hello\")"],
          ["SizedBox(height: 10)", "const SizedBox(height: 10)"],
          ["Icon(Icons.star)", "const Icon(Icons.star)"],
        ],
      },
      code: {
        label: "Using const for a static part of the UI",
        content: `import 'package:flutter/material.dart';

class WelcomeHeader extends StatelessWidget {
  const WelcomeHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        Icon(Icons.flutter_dash, size: 48),
        SizedBox(height: 8),
        Text("Welcome to PolyCode!"),
      ],
    );
  }
}`,
      },
      tip: "If your editor underlines a widget suggesting 'Add const', it is usually safe and beneficial to accept that suggestion for widgets that truly never change.",
      warning: "Do not mark a widget const if any of its values can actually change at runtime (like text that depends on a variable) — Dart will give you a clear error if you try.",
      practice: {
        level1: "Add const to a Text widget that shows a fixed app name.",
        level2: "Add const to a whole Column whose children never change.",
        level3: "Explain, in your own words, why const widgets help performance.",
      },
      summary:
        "Marking unchanging widgets as const helps Flutter skip unnecessary rebuilds, which is a simple but effective performance habit.",
      next: "Next, you will learn how to build a release APK, ready to share or publish.",
      quiz: {
        q: "What does marking a widget as const tell Flutter?",
        options: [
          "That this widget never changes, so it can skip unnecessary rebuilds",
          "That the widget must always be red",
          "That the widget connects to the internet",
          "That the widget cannot have a child",
        ],
        answer: 0,
        explain: "const marks a widget as unchanging, letting Flutter optimize by skipping its rebuild.",
      },
      quiz2: {
        q: "Why can't you mark a Text widget as const if its content depends on a changing variable?",
        options: [
          "Because const widgets must have values known at compile time, not changing at runtime",
          "const only works for images, never text",
          "Dart ignores const entirely in practice",
          "There is no actual restriction here",
        ],
        answer: 0,
        explain: "const requires values that are fixed and known ahead of time, not ones that depend on runtime state.",
      },
      challenge: {
        title: "Mark a static header as const",
        desc: "Build a StatelessWidget using a const Column containing a const Text and const SizedBox.",
        starter: `import 'package:flutter/material.dart';

class AppHeader extends StatelessWidget {
  const AppHeader({super.key});

  @override
  Widget build(BuildContext context) {
    // return a const Column with Text and SizedBox
  }
}`,
        solution: `import 'package:flutter/material.dart';

class AppHeader extends StatelessWidget {
  const AppHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        Text("PolyCode"),
        SizedBox(height: 8),
      ],
    );
  }
}`,
        keywords: [
          { label: "Uses const", hint: "const Column", pattern: "const\\s+Column" },
          { label: "Has a Text widget", hint: "Text(...)", pattern: "Text\\s*\\(" },
          { label: "Has a SizedBox", hint: "SizedBox(...)", pattern: "SizedBox\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain what const means for a widget",
        "Apply const to unchanging widgets",
        "Explain why this helps performance",
      ],
    },
    {
      title: "Building a Release APK",
      xp: 15,
      def:
        "A **release APK** (or app bundle) is the optimized, production-ready version of your Android app, built using **`flutter build apk`**, smaller and faster than the debug version you use during development.",
      example:
        "Before sharing your finished app with friends for testing, or submitting it to the Play Store, you build a release APK instead of just using the debug version you have been running on your emulator.",
      learn: [
        "The difference between a debug build and a release build",
        "How to run flutter build apk (or build appbundle) from the terminal",
        "Where to find the generated APK file afterward",
      ],
      scenario:
        "Think of it like this: a debug build is like a rough draft with sticky notes and markup still visible. A release build is like the final, polished, printed version ready to actually hand out to readers.",
      visual: {
        kind: "table",
        title: "Debug vs release build",
        columns: ["Build type", "Purpose"],
        rows: [
          ["Debug build", "Used during development, includes extra debugging tools, larger size"],
          ["Release build", "Optimized, smaller, faster — meant for real users"],
        ],
      },
      code: {
        label: "The release build command (concept)",
        content: `// In a terminal, inside your project folder:
//   flutter build apk --release
//
// The resulting file usually appears at:
//   build/app/outputs/flutter-apk/app-release.apk

void main() {
  print("Run 'flutter build apk --release' to create a production-ready APK.");
}`,
      },
      tip: "Test your release build on a real device before sharing it widely — some issues only show up in release mode, not in debug mode.",
      warning: "Do not share a debug build with real users as your 'final' app — it is larger, slower, and not meant for production use.",
      practice: {
        level1: "Explain, in your own words, the difference between a debug and a release build.",
        level2: "Write the exact terminal command used to build a release APK.",
        level3: "Describe where you would expect to find the generated APK file afterward.",
      },
      summary:
        "flutter build apk creates an optimized release APK, meant for real users, distinct from the debug build used during development.",
      next: "Next, you will learn the basics of signing your app, which is required before publishing.",
      quiz: {
        q: "What command builds a production-ready Android APK?",
        options: [
          "flutter build apk",
          "flutter create",
          "flutter doctor",
          "flutter clean",
        ],
        answer: 0,
        explain: "flutter build apk generates an optimized APK suitable for release.",
      },
      quiz2: {
        q: "Why should you test the release build, not just the debug build, before sharing an app?",
        options: [
          "Some issues only appear in release mode, not during normal debug development",
          "Release builds always behave identically to debug builds",
          "Testing release builds is never necessary",
          "Debug builds cannot be run on real devices at all",
        ],
        answer: 0,
        explain: "Release builds can behave differently due to optimizations, so testing them separately catches release-specific bugs.",
      },
      challenge: {
        title: "Describe build types",
        desc: "Create a Map<String, String> pairing 'debug' and 'release' build types with a short description, then print both.",
        starter: `void main() {
  // map "debug" and "release" to short descriptions and print them
}`,
        solution: `void main() {
  Map<String, String> builds = {
    "debug": "Used during development, larger and slower",
    "release": "Optimized for real users, smaller and faster",
  };
  builds.forEach((type, desc) {
    print(type + ": " + desc);
  });
}`,
        keywords: [
          { label: "Uses a Map", hint: "Map<String, String>", pattern: "Map<String,\\s*String>" },
          { label: "Mentions debug", hint: "\"debug\"", pattern: "debug" },
          { label: "Mentions release", hint: "\"release\"", pattern: "release" },
        ],
      },
      outcomes: [
        "Explain the difference between debug and release builds",
        "Run the command to build a release APK",
        "Know where to find the generated APK file",
      ],
    },
    {
      title: "App Signing Concepts",
      xp: 15,
      def:
        "**App signing** attaches a unique cryptographic signature to your app, proving updates genuinely come from the same developer. Android requires a **signing key** before you can publish an app to the Play Store.",
      example:
        "If someone else tried to publish a fake update to your app without your signing key, Android and the Play Store would reject it, because the signature would not match your original app's signature.",
      learn: [
        "Why signing proves app updates come from the same trusted source",
        "What a keystore file is and why it must be kept safe",
        "The basic steps: generate a keystore, configure it, then build a signed release",
      ],
      scenario:
        "Think of it like this: a signing key is like a personal wax seal on an old letter. Anyone receiving a letter with your exact seal can trust it genuinely came from you, not an imposter.",
      visual: {
        kind: "table",
        title: "Signing basics",
        columns: ["Term", "Meaning"],
        rows: [
          ["Keystore file", "A file holding your private signing key"],
          ["Signing config", "Settings telling Android which keystore to use when building"],
          ["Signed release", "A release APK/bundle signed with your key, ready to publish"],
        ],
      },
      code: {
        label: "Signing steps as a checklist",
        content: `void main() {
  List<String> steps = [
    "1. Generate a keystore file (keytool command, done once)",
    "2. Store keystore details safely (never commit to public git)",
    "3. Configure android/app/build.gradle to use that keystore",
    "4. Run flutter build apk --release (now signed automatically)",
  ];

  for (var step in steps) {
    print(step);
  }
}`,
      },
      tip: "Back up your keystore file somewhere extremely safe — if you lose it, you cannot publish future updates to the same app listing with Google Play.",
      warning: "Do not ever commit your keystore file or its passwords to a public git repository — this is a very common and serious real-world security mistake.",
      practice: {
        level1: "Explain, in your own words, why app signing matters for trust and updates.",
        level2: "List the four signing steps from the example above in your own words.",
        level3: "Describe where you would safely store a backup of your keystore file.",
      },
      summary:
        "App signing proves your app's updates genuinely come from you, using a keystore file that must be generated once and kept extremely safe.",
      next: "Next, you will learn the basics of publishing an app to the Play Store.",
      quiz: {
        q: "What problem does app signing help solve?",
        options: [
          "It proves app updates genuinely come from the same trusted developer",
          "It makes the app run faster",
          "It automatically translates the app",
          "It replaces the need for any testing",
        ],
        answer: 0,
        explain: "Signing verifies the authenticity of app updates, protecting users from tampered or fake versions.",
      },
      quiz2: {
        q: "Why is losing your keystore file such a serious problem?",
        options: [
          "You would not be able to publish further updates to the same existing app listing",
          "It has no real consequence at all",
          "Losing it automatically deletes the app from all devices",
          "A new keystore can always perfectly replace the old one with no issues",
        ],
        answer: 0,
        explain: "Google Play requires updates to be signed with the same key as the original app; losing the keystore blocks future updates.",
      },
      challenge: {
        title: "List signing steps",
        desc: "Create a List<String> of the 4 signing steps and print them numbered.",
        starter: `void main() {
  // list the 4 signing steps and print them numbered
}`,
        solution: `void main() {
  List<String> steps = [
    "Generate a keystore",
    "Store details safely",
    "Configure build.gradle",
    "Build a signed release",
  ];
  for (int i = 0; i < steps.length; i++) {
    print((i + 1).toString() + ". " + steps[i]);
  }
}`,
        keywords: [
          { label: "Creates a List", hint: "List<String>", pattern: "List<String>" },
          { label: "Mentions keystore", hint: "keystore", pattern: "keystore" },
          { label: "Prints numbered steps", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain why app signing matters for trust and updates",
        "Describe what a keystore file is used for",
        "List the basic steps to produce a signed release",
      ],
    },
    {
      title: "Play Store Basics",
      xp: 10,
      def:
        "Publishing to the **Play Store** involves creating a developer account, filling out your app's store listing (name, description, screenshots), uploading a signed release, and going through Google's review process.",
      example:
        "Before PolyCode's own app could appear in the Play Store, the team would need a developer account, a clear app description and icon, screenshots of the real app, and a signed release bundle ready to upload.",
      learn: [
        "The basic requirements for publishing: developer account, store listing, signed build",
        "Why clear screenshots and descriptions matter for users deciding to download",
        "That review and approval can take time, so planning ahead matters",
      ],
      scenario:
        "Think of it like this: publishing to the Play Store is like opening a shop in a big shopping mall. You need an account with the mall (developer account), a clear storefront display (listing, screenshots), and your actual product ready and approved (signed build, review).",
      visual: {
        kind: "table",
        title: "Basic Play Store checklist",
        columns: ["Requirement", "Why it matters"],
        rows: [
          ["Google Play developer account", "Required to publish any app"],
          ["Store listing (title, description, screenshots)", "Helps users understand and trust your app"],
          ["Signed release bundle", "The actual app file submitted for review"],
        ],
      },
      code: {
        label: "A publishing checklist",
        content: `void main() {
  Map<String, bool> checklist = {
    "Developer account created": true,
    "App icon and screenshots ready": true,
    "Signed release build ready": false,
    "Privacy policy added": false,
  };

  checklist.forEach((item, done) {
    print((done ? "[x] " : "[ ] ") + item);
  });
}`,
      },
      tip: "Prepare your store listing (description, screenshots, icon) well before you plan to submit — writing good descriptions and taking clear screenshots takes more time than people expect.",
      warning: "Do not submit an app with a missing or unclear privacy policy if your app collects any user data — this is a common reason for review delays or rejections.",
      practice: {
        level1: "Explain, in your own words, the basic requirements for publishing an app.",
        level2: "List two things you would include in a good app store listing.",
        level3: "Describe why planning ahead for review time matters if you have a launch deadline.",
      },
      summary:
        "Publishing to the Play Store requires a developer account, a clear store listing, and a signed release build, followed by Google's review process.",
      next: "Next chapter, you will explore advanced Flutter concepts like widget keys and platform channels.",
      quiz: {
        q: "What are the basic requirements for publishing an app to the Play Store?",
        options: [
          "A developer account, a store listing, and a signed release build",
          "Only a working internet connection",
          "A completed college degree",
          "Nothing beyond writing the app's code",
        ],
        answer: 0,
        explain: "Publishing requires an account, a prepared listing, and a properly signed build submitted for review.",
      },
      quiz2: {
        q: "Why might a missing privacy policy cause problems when submitting an app?",
        options: [
          "It is a common reason for review delays or rejections, especially if user data is collected",
          "Privacy policies have no effect on app review",
          "Privacy policies are only needed for websites, never apps",
          "Google Play does not review privacy-related details",
        ],
        answer: 0,
        explain: "Apps collecting user data generally must disclose this clearly, often via a privacy policy, to pass review.",
      },
      challenge: {
        title: "Publishing checklist",
        desc: "Create a Map<String, bool> with 3 publishing checklist items, then print each with [x] or [ ].",
        starter: `void main() {
  // create a checklist Map and print each item with its status
}`,
        solution: `void main() {
  Map<String, bool> checklist = {
    "Developer account": true,
    "Store listing ready": true,
    "Signed build ready": false,
  };
  checklist.forEach((item, done) {
    print((done ? "[x] " : "[ ] ") + item);
  });
}`,
        keywords: [
          { label: "Uses a Map<String, bool>", hint: "Map<String, bool>", pattern: "Map<String,\\s*bool>" },
          { label: "Uses forEach", hint: "forEach(...)", pattern: "forEach\\s*\\(" },
          { label: "Prints status", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "List the basic requirements for publishing to the Play Store",
        "Explain why a clear store listing matters",
        "Plan ahead for the review process timeline",
      ],
    },
  ],
};
