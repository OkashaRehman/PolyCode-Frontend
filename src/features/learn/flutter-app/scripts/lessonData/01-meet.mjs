// Chapter 1 — Meet Flutter

export const CH_MEET = {
  id: "meet",
  title: "Meet Flutter",
  icon: "smartphone",
  color: "#02569b",
  lessons: [
    {
      title: "What is Flutter?",
      xp: 10,
      def:
        "**Flutter** is a free toolkit made by Google for building apps. You write your code **once**, and Flutter can turn it into an app for Android, iPhone, the web, and even desktop computers.",
      example:
        "A small bakery wants an app for both Android and iPhone customers, but has only one developer. With Flutter, that one developer writes a single Dart codebase and ships it to both app stores, instead of building two separate apps from scratch.",
      learn: [
        "What Flutter is used for",
        "Why 'write once, run on many devices' saves time",
        "Where Flutter fits next to other app-building tools",
      ],
      scenario:
        "Think of Flutter like a universal remote control. One remote (your Flutter code) can control many different TVs (Android, iPhone, web) instead of needing a separate remote for every brand.",
      visual: {
        kind: "table",
        title: "Flutter at a glance",
        columns: ["Idea", "Plain meaning"],
        rows: [
          ["Toolkit", "Ready-made pieces for building app screens"],
          ["Cross-platform", "One codebase can run on many devices"],
          ["Dart", "The programming language Flutter apps are written in"],
        ],
      },
      code: {
        label: "Say hello to Flutter",
        content: `void main() {
  print("Hello from Flutter!");
  print("One codebase can run on Android, iOS, web, and desktop.");
}`,
      },
      tip: "You do not need to be a math expert to start. Flutter mostly uses simple building blocks called widgets, which you will meet soon.",
      warning: "Do not confuse Flutter (the toolkit) with Dart (the language). Flutter is built using Dart, just like a house is built using bricks.",
      practice: {
        level1: "Say out loud, in your own words, what Flutter is used for.",
        level2: "List two apps you use daily that could be built with a cross-platform tool like Flutter.",
        level3: "Write one short sentence explaining Flutter to a friend who has never written code.",
      },
      summary:
        "Flutter is a Google toolkit for building apps for many devices from one codebase, written in the Dart language.",
      next: "Next you will meet Dart, the language that powers every Flutter app.",
      quiz: {
        q: "What is Flutter mainly used for?",
        options: [
          "Writing one app that can run on many devices",
          "Only designing company logos",
          "Sending emails faster",
          "Compiling C++ programs",
        ],
        answer: 0,
        explain:
          "Flutter lets you write one codebase that can run on Android, iOS, web, and desktop.",
      },
      quiz2: {
        q: "A bakery owner has only one developer but wants apps for both Android AND iPhone. What should the developer consider?",
        options: [
          "Using Flutter to write one codebase for both platforms",
          "Hiring two separate teams to write two codebases",
          "Only ever building the Android app",
          "Writing the whole app directly in machine code",
        ],
        answer: 0,
        explain:
          "Flutter is designed exactly for this situation — one codebase, many platforms.",
      },
      challenge: {
        title: "Say hello in Dart",
        desc:
          "Write a main function that prints two lines: 'Hello from Flutter!' and a second line that mentions the word Flutter again.",
        starter: `void main() {
  // print two lines here
}`,
        solution: `void main() {
  print("Hello from Flutter!");
  print("Flutter runs on many devices.");
}`,
        keywords: [
          { label: "Has a main function", hint: "void main()", pattern: "void\\s+main\\s*\\(" },
          { label: "Prints something", hint: "print(...)", pattern: "print\\s*\\(" },
          { label: "Mentions Flutter", hint: "the word Flutter appears", pattern: "Flutter" },
        ],
      },
      outcomes: [
        "Explain what Flutter is in one simple sentence",
        "Describe why 'write once, run on many devices' saves developer time",
        "Know that Dart is the language used to write Flutter apps",
      ],
    },
    {
      title: "What is Dart?",
      xp: 10,
      def:
        "**Dart** is the programming language you use to write Flutter apps. It was also made by Google, and it is designed to be easy to read, similar to languages like Java or JavaScript.",
      example:
        "Imagine Flutter as a car body shop and Dart as the engine. Flutter gives you the shapes (buttons, screens, images), but Dart is the language that tells those shapes what to actually do.",
      learn: [
        "What role Dart plays inside a Flutter app",
        "Why Dart feels familiar if you know other languages",
        "That every single line of Flutter code is actually Dart code",
      ],
      scenario:
        "Think of it like this: a play has actors (the widgets you see on screen) and a script (the Dart code). The script tells the actors what to say and do. Without the script, the actors just stand there doing nothing.",
      visual: {
        kind: "table",
        title: "Flutter vs Dart",
        columns: ["Term", "What it is"],
        rows: [
          ["Flutter", "The toolkit of widgets and tools for building UI"],
          ["Dart", "The language that writes the logic behind those widgets"],
        ],
      },
      code: {
        label: "A tiny Dart script",
        content: `void main() {
  String appName = "QuantumChat";
  int version = 1;
  print("Welcome to " + appName + " v" + version.toString());
}`,
      },
      tip: "If a line of Flutter code looks confusing, remember it is just Dart. Dart rules (variables, functions, loops) always apply.",
      warning: "Do not skip learning plain Dart basics before jumping into widgets. Trying to learn both at once can feel overwhelming.",
      practice: {
        level1: "Write one sentence that explains the difference between Flutter and Dart.",
        level2: "Change the appName variable above to your own app idea's name.",
        level3: "Add a third variable for 'author' and print it on a new line.",
      },
      summary:
        "Dart is the language behind every Flutter app — Flutter gives you the visual pieces, Dart gives you the logic.",
      next: "Next you will learn the big idea that 'everything is a widget' in Flutter.",
      quiz: {
        q: "What is the relationship between Flutter and Dart?",
        options: [
          "Flutter is the toolkit, Dart is the language it is written in",
          "Dart is a design tool with no code",
          "They are two unrelated products",
          "Flutter replaces the need for any programming language",
        ],
        answer: 0,
        explain:
          "Flutter apps are written in Dart. Flutter provides the widgets; Dart provides the logic.",
      },
      quiz2: {
        q: "You open a Flutter file and see 'int version = 1;'. What language rule is this following?",
        options: [
          "Dart's variable declaration rules",
          "A rule from the Android operating system only",
          "A CSS styling rule",
          "An HTML tag rule",
        ],
        answer: 0,
        explain: "Every line inside a Flutter project is Dart code, including simple variable declarations.",
      },
      challenge: {
        title: "Print app info",
        desc: "Create a String variable named appName and an int variable named version. Print both in one message.",
        starter: `void main() {
  // create appName and version, then print them
}`,
        solution: `void main() {
  String appName = "QuantumChat";
  int version = 2;
  print(appName + " version " + version.toString());
}`,
        keywords: [
          { label: "Declares a String", hint: "String appName", pattern: "String\\s+\\w+" },
          { label: "Declares an int", hint: "int version", pattern: "int\\s+\\w+" },
          { label: "Prints something", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "State that Dart is the language used to write Flutter apps",
        "Describe Flutter as the toolkit and Dart as the logic behind it",
        "Write a tiny Dart script with variables and a print statement",
      ],
    },
    {
      title: "Everything is a Widget",
      xp: 10,
      def:
        "In Flutter, almost everything you see on the screen — text, buttons, images, even spacing — is called a **widget**. Widgets are small building blocks that you stack together like Lego bricks to build a full screen.",
      example:
        "Think about a chat app screen like QuantumChat. The app bar at the top is a widget. Each message bubble is a widget. The text box at the bottom is a widget. The whole screen is really just many small widgets placed together.",
      learn: [
        "What a widget is in plain words",
        "How small widgets combine into bigger ones",
        "Why 'everything is a widget' is Flutter's biggest idea",
      ],
      scenario:
        "Think of it like this: building a Flutter screen is like stacking Lego bricks. A single brick (a Text widget) is not very useful alone, but stack many bricks together (Text, Icon, Button) and you get a full building (your app screen).",
      visual: {
        kind: "diagram",
        title: "Small widgets build a big screen",
        nodes: [
          { label: "Text widget", items: ["Shows words", "Example: a chat message"] },
          { label: "Icon widget", items: ["Shows a small picture", "Example: a send icon"] },
          { label: "Column widget", items: ["Stacks widgets vertically", "Combines Text + Icon"] },
        ],
      },
      code: {
        label: "Widgets described in Dart-style pseudo-structure",
        content: `// This is how Flutter widgets are nested (simplified):
// Column(
//   children: [
//     Text("QuantumChat"),
//     Icon(Icons.send),
//   ],
// )

void main() {
  List<String> widgetNames = ["Text", "Icon", "Column"];
  for (var name in widgetNames) {
    print("Widget used: " + name);
  }
}`,
      },
      tip: "When you feel lost in a big Flutter screen, remember: it is just smaller widgets stacked inside bigger ones. Break it down piece by piece.",
      warning: "Do not try to build one giant widget for an entire screen. Split your screen into small, named widgets — it is much easier to read and fix later.",
      practice: {
        level1: "Name three widgets you might see on a typical phone app screen.",
        level2: "Draw (on paper) a simple chat screen and label which parts could be separate widgets.",
        level3: "List the widgets, in order from outside to inside, that might build a login screen (hint: screen → column → text + button).",
      },
      summary:
        "Flutter's biggest idea is that everything on screen is a widget, and widgets combine to build full app screens.",
      next: "Next you will compare Flutter to building apps the native way, to see why many teams prefer Flutter.",
      quiz: {
        q: "In Flutter, what is a widget?",
        options: [
          "A small building block used to build the screen, like text or a button",
          "A type of error message only",
          "A file extension for images",
          "A command used only in Android Studio",
        ],
        answer: 0,
        explain:
          "Widgets are the basic building blocks of a Flutter UI — text, buttons, images, layout boxes, and more.",
      },
      quiz2: {
        q: "A chat screen has an app bar, message bubbles, and a text box. In Flutter terms, what are these?",
        options: [
          "Separate widgets combined together to build the full screen",
          "Three different programming languages mixed into one app",
          "Three unrelated apps running at once",
          "Parts of the phone's operating system, not the app",
        ],
        answer: 0,
        explain: "Each visible piece of a Flutter screen is its own widget, and they are combined to build the full UI.",
      },
      challenge: {
        title: "List your widgets",
        desc: "Create a List<String> of widget names you plan to use on a profile screen, then print each one with a loop.",
        starter: `void main() {
  // create a list of widget names and loop through it
}`,
        solution: `void main() {
  List<String> widgets = ["Text", "Image", "Column", "Row"];
  for (var w in widgets) {
    print("Using widget: " + w);
  }
}`,
        keywords: [
          { label: "Creates a List", hint: "List<String>", pattern: "List<String>" },
          { label: "Uses a loop", hint: "for (...)", pattern: "for\\s*\\(" },
          { label: "Prints inside loop", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain that everything visible in Flutter is a widget",
        "Give three examples of common widgets",
        "Describe how small widgets combine into a full screen",
      ],
    },
    {
      title: "Flutter vs Native Development",
      xp: 10,
      def:
        "**Native development** means writing a separate app for each platform — Kotlin or Java for Android, Swift for iPhone. **Flutter** lets you write one app that works on both, which usually means less code and faster updates.",
      example:
        "A startup with a small team wants an app on both Android and iPhone within two months. Writing two native apps would need two separate codebases and often two separate skill sets. Flutter lets one small team ship both from one codebase.",
      learn: [
        "What native development means",
        "The main trade-offs between native and Flutter",
        "Why many startups and companies pick Flutter for speed",
      ],
      scenario:
        "Think of it like this: native development is like writing a letter in two completely different languages for two different friends. Flutter is like writing one letter in a language that both friends happen to understand.",
      visual: {
        kind: "table",
        title: "Native vs Flutter (simple comparison)",
        columns: ["Approach", "Codebases needed", "Good for"],
        rows: [
          ["Native (Kotlin/Swift)", "Two separate codebases", "Apps needing very deep platform-specific features"],
          ["Flutter", "One shared codebase", "Fast building, shared design, smaller teams"],
        ],
      },
      code: {
        label: "One Dart function, many platforms (idea)",
        content: `String greetUser(String platform) {
  return "Hello from Flutter running on " + platform + "!";
}

void main() {
  print(greetUser("Android"));
  print(greetUser("iOS"));
  print(greetUser("Web"));
}`,
      },
      tip: "Flutter is not the only answer for every project, but for most everyday apps (chat, shopping, learning apps) it saves huge amounts of time.",
      warning: "Do not assume Flutter can do absolutely everything a native app can. Some very specialized hardware features may still need extra native code, which this course will touch on later.",
      practice: {
        level1: "Explain in one sentence why writing one Flutter codebase can be faster than writing two native apps.",
        level2: "Think of an app you use daily. Would it make sense as a Flutter app? Why or why not?",
        level3: "List two possible downsides of using Flutter instead of fully native code.",
      },
      summary:
        "Flutter trades some deep platform-specific control for huge speed gains by using one codebase for many platforms.",
      next: "Next, you will see the full roadmap of this course so you know what is coming.",
      quiz: {
        q: "What is the main advantage of Flutter over writing two separate native apps?",
        options: [
          "One codebase can target multiple platforms, saving time",
          "Flutter apps never need any testing",
          "Flutter removes the need to learn any programming",
          "Native apps cannot be installed on phones anymore",
        ],
        answer: 0,
        explain:
          "Flutter's one-codebase approach usually means faster development compared to building separate native apps.",
      },
      quiz2: {
        q: "A tiny two-person startup needs an Android and iPhone app in 8 weeks. Why might they choose Flutter over native development?",
        options: [
          "One Flutter codebase can target both platforms, fitting their small team and short timeline",
          "Native apps are always slower to run than Flutter apps",
          "Flutter apps do not need any design work",
          "Native development is no longer supported anywhere",
        ],
        answer: 0,
        explain: "Flutter's shared codebase is especially helpful for small teams with limited time and resources.",
      },
      challenge: {
        title: "Greet every platform",
        desc: "Write a function greetUser(platform) that returns a greeting string, then call it for 'Android', 'iOS', and 'Web'.",
        starter: `String greetUser(String platform) {
  // return a greeting that includes the platform name
}

void main() {
  // call greetUser for three platforms and print each result
}`,
        solution: `String greetUser(String platform) {
  return "Hello from Flutter on " + platform;
}

void main() {
  print(greetUser("Android"));
  print(greetUser("iOS"));
  print(greetUser("Web"));
}`,
        keywords: [
          { label: "Defines a function", hint: "String greetUser(", pattern: "String\\s+greetUser\\s*\\(" },
          { label: "Returns a value", hint: "return ...", pattern: "return\\s+" },
          { label: "Calls it 3 times", hint: "greetUser(...)", pattern: "greetUser\\s*\\(" },
        ],
      },
      outcomes: [
        "Describe the difference between native and Flutter development",
        "Explain one key benefit of Flutter's single codebase approach",
        "Name a possible limitation of using Flutter instead of native code",
      ],
    },
    {
      title: "Your Learning Roadmap",
      xp: 10,
      def:
        "This course takes you from **zero Flutter knowledge** to being able to build **real, working apps**. The roadmap moves step by step: Dart basics, your first screens, state and data, networking, and finally full projects.",
      example:
        "Think of learning to drive: you first learn the controls in a parked car, then practice in an empty parking lot, and only later drive in real traffic. This course follows the same idea — simple building blocks first, real projects last.",
      learn: [
        "The big stages of this Flutter course",
        "Why the order (Dart → UI → state → networking → projects) makes sense",
        "What kind of apps you will be able to build by the end",
      ],
      scenario:
        "Think of it like this: building an app is like building a house. First you learn about materials (Dart), then you build small rooms (simple screens), then you connect plumbing and wiring (state and networking), and finally you decorate and move in (polished real projects).",
      visual: {
        kind: "diagram",
        title: "Course roadmap, simplified",
        nodes: [
          { label: "Foundations", items: ["Dart basics", "Dart OOP"] },
          { label: "Building UI", items: ["First screens", "Layouts, forms, navigation"] },
          { label: "Data & Apps", items: ["State, networking, storage", "Auth, device features"] },
          { label: "Real Projects", items: ["To-Do, chat UI, capstone"] },
        ],
      },
      code: {
        label: "A tiny roadmap printed in Dart",
        content: `void main() {
  List<String> roadmap = [
    "1. Dart basics",
    "2. First Flutter UI",
    "3. State and data",
    "4. Networking and storage",
    "5. Real projects",
  ];

  for (var step in roadmap) {
    print(step);
  }
}`,
      },
      tip: "It is completely normal to feel unsure at the start. Each chapter builds on the one before, so small confusions get cleared up as you move forward.",
      warning: "Do not skip the Dart basics chapters just to jump to 'cool UI'. Weak Dart basics cause confusing bugs later that are hard to fix.",
      practice: {
        level1: "Write down, in your own words, the five big stages of this course.",
        level2: "Pick one real app idea you would like to build by the end of this course.",
        level3: "List two chapters you are most excited about and explain why.",
      },
      summary:
        "This course moves from Dart basics, through building screens and handling data, all the way to full real-world Flutter projects.",
      next: "Next chapter: setting up your computer so you can actually run Flutter code.",
      quiz: {
        q: "Why does this course teach Dart basics before building app screens?",
        options: [
          "Because screens are built using Dart code, so Dart basics come first",
          "Because Dart has nothing to do with Flutter",
          "Because screens never use any Dart code",
          "Because the order of chapters does not matter at all",
        ],
        answer: 0,
        explain:
          "Flutter screens are written in Dart, so understanding Dart basics first makes everything else easier to follow.",
      },
      quiz2: {
        q: "A student wants to skip straight to building a chat app without learning any Dart. What is the risk?",
        options: [
          "They may get stuck on confusing bugs because they do not understand the underlying Dart code",
          "There is no risk, Dart is not used in Flutter apps",
          "Skipping basics always makes learning faster with no downsides",
          "Chat apps do not use any programming language",
        ],
        answer: 0,
        explain: "Skipping fundamentals usually leads to confusion later, since every Flutter screen is built with Dart code.",
      },
      challenge: {
        title: "Print your roadmap",
        desc: "Create a List<String> with at least four steps of your personal learning roadmap and print each one with a loop.",
        starter: `void main() {
  // create your roadmap list and print each step
}`,
        solution: `void main() {
  List<String> roadmap = [
    "Learn Dart",
    "Build first screen",
    "Handle state",
    "Build a real project",
  ];
  for (var step in roadmap) {
    print(step);
  }
}`,
        keywords: [
          { label: "Creates a List", hint: "List<String>", pattern: "List<String>" },
          { label: "Uses a loop", hint: "for (...)", pattern: "for\\s*\\(" },
          { label: "Prints each step", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "List the main stages of this Flutter course",
        "Explain why Dart basics come before building screens",
        "Describe one real app they hope to build by the end",
      ],
    },
  ],
};
