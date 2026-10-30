// Chapter 21 — Advanced Flutter Concepts

export const CH_ADVANCED = {
  id: "advanced",
  title: "Advanced Flutter Concepts",
  icon: "cpu",
  color: "#4a148c",
  lessons: [
    {
      title: "Understanding Widget Keys",
      xp: 15,
      def:
        "A **Key** helps Flutter tell widgets apart when a list changes, like reordering items. Without the right key, Flutter can confuse which widget is which, causing odd bugs like animations or state jumping to the wrong item.",
      example:
        "In a to-do list where items can be reordered or deleted, giving each ListTile a unique `ValueKey(task.id)` helps Flutter correctly track which specific item moved or was removed, instead of mixing up positions.",
      learn: [
        "Why Flutter sometimes needs help telling similar widgets apart",
        "How ValueKey can use a stable, unique id for each item",
        "When keys matter most: reordering, inserting, or removing list items",
      ],
      scenario:
        "Think of it like this: imagine a classroom where several students look identical from behind. A key is like a name tag on each student's back — without it, a teacher might accidentally swap who sits where when rearranging desks.",
      visual: {
        kind: "table",
        title: "When keys matter",
        columns: ["Situation", "Why a key helps"],
        rows: [
          ["Reordering list items", "Keeps each item's state attached to the right item"],
          ["Removing an item from the middle", "Avoids state 'jumping' to the wrong remaining item"],
          ["Static, never-reordered lists", "Usually fine without explicit keys"],
        ],
      },
      code: {
        label: "Using ValueKey in a list",
        content: `import 'package:flutter/material.dart';

class Task {
  String id;
  String title;
  Task(this.id, this.title);
}

class TaskList extends StatelessWidget {
  final List<Task> tasks;
  const TaskList({super.key, required this.tasks});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: tasks
          .map((t) => ListTile(key: ValueKey(t.id), title: Text(t.title)))
          .toList(),
    );
  }
}`,
      },
      tip: "Use a stable, unique value for a key — like a database id — not something that could change or repeat, like a list index.",
      warning: "Do not use a list's position/index as a key when the list can be reordered — the index changes as items move, defeating the whole purpose of the key.",
      practice: {
        level1: "Explain, in your own words, why keys matter when reordering a list.",
        level2: "Add a ValueKey using t.id to a different widget type, like a Card.",
        level3: "Describe a bug you might see if a reorderable list has no keys at all.",
      },
      summary:
        "Keys help Flutter correctly track individual widgets, especially important when list items can be reordered, inserted, or removed.",
      next: "Next, you will learn about the widget lifecycle, understanding exactly when methods like initState() run.",
      quiz: {
        q: "When are widget keys most important to use?",
        options: [
          "When list items can be reordered, inserted, or removed",
          "Only for widgets that never change",
          "Keys are never needed in Flutter",
          "Only for the root MaterialApp widget",
        ],
        answer: 0,
        explain: "Keys help Flutter correctly track widget identity, which matters most in dynamic, changeable lists.",
      },
      quiz2: {
        q: "Why is using a list index as a key risky for a reorderable list?",
        options: [
          "The index changes as items move, so it no longer uniquely identifies the same item",
          "Indexes are always unique and never change",
          "Index-based keys are the recommended best practice",
          "Keys based on index improve performance the most",
        ],
        answer: 0,
        explain: "An index-based key breaks down once item order changes, since the same index can now represent a different item.",
      },
      challenge: {
        title: "Add keys to a list",
        desc: "Build a ListView from a List<Task> (id, title fields), using ValueKey(t.id) on each ListTile.",
        starter: `import 'package:flutter/material.dart';

class Task {
  String id;
  String title;
  Task(this.id, this.title);
}

class TaskList extends StatelessWidget {
  final List<Task> tasks;
  const TaskList({super.key, required this.tasks});

  @override
  Widget build(BuildContext context) {
    // return a ListView with keyed ListTiles
  }
}`,
        solution: `import 'package:flutter/material.dart';

class Task {
  String id;
  String title;
  Task(this.id, this.title);
}

class TaskList extends StatelessWidget {
  final List<Task> tasks;
  const TaskList({super.key, required this.tasks});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: tasks
          .map((t) => ListTile(key: ValueKey(t.id), title: Text(t.title)))
          .toList(),
    );
  }
}`,
        keywords: [
          { label: "Uses ValueKey", hint: "ValueKey(t.id)", pattern: "ValueKey\\s*\\(" },
          { label: "Uses ListTile", hint: "ListTile(...)", pattern: "ListTile\\s*\\(" },
          { label: "Maps the list", hint: ".map(...)", pattern: "\\.map\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain why Flutter sometimes needs keys to tell widgets apart",
        "Use ValueKey with a stable, unique id",
        "Avoid using list index as a key in reorderable lists",
      ],
    },
    {
      title: "The Widget Lifecycle",
      xp: 15,
      def:
        "A StatefulWidget's **lifecycle** describes the order its methods run: **initState()** runs once when it is first created, **build()** can run many times, and **dispose()** runs once when it is permanently removed.",
      example:
        "A screen that loads chat messages from the network should start that loading inside initState() (run once), not inside build() (which can run many times and would reload data unnecessarily often).",
      learn: [
        "What initState() is for, and why it only runs once",
        "Why build() can run many times and should stay side-effect free",
        "What dispose() is for, and why cleanup belongs there",
      ],
      scenario:
        "Think of it like this: initState() is like unpacking your bags once when you check into a hotel room. build() is like glancing around the room each time you walk back in — it can happen many times. dispose() is like packing up and checking out for good.",
      visual: {
        kind: "table",
        title: "Lifecycle methods",
        columns: ["Method", "Runs", "Good for"],
        rows: [
          ["initState()", "Once, when the widget is created", "Starting a one-time fetch or Timer"],
          ["build()", "Many times, whenever a rebuild happens", "Describing the current UI, no side effects"],
          ["dispose()", "Once, when the widget is removed", "Cancelling Timers/Streams, releasing resources"],
        ],
      },
      code: {
        label: "A widget using all three lifecycle methods",
        content: `import 'package:flutter/material.dart';
import 'dart:async';

class LiveClock extends StatefulWidget {
  const LiveClock({super.key});

  @override
  State<LiveClock> createState() => _LiveClockState();
}

class _LiveClockState extends State<LiveClock> {
  late Timer timer;
  int seconds = 0;

  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(const Duration(seconds: 1), (t) {
      setState(() {
        seconds = seconds + 1;
      });
    });
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Text("Seconds: " + seconds.toString());
  }
}`,
      },
      tip: "Always call super.initState() and super.dispose() inside your overridden versions — skipping them can cause subtle bugs.",
      warning: "Do not start a network request or Timer directly inside build() — since build() can run many times, you risk starting many duplicate requests or timers by accident.",
      practice: {
        level1: "Explain, in your own words, why initState() only runs once.",
        level2: "Explain, in your own words, what dispose() is responsible for.",
        level3: "Describe what would go wrong if the Timer above were never cancelled in dispose().",
      },
      summary:
        "The widget lifecycle — initState(), build(), dispose() — defines exactly when to start one-time work, describe the UI, and clean up resources.",
      next: "Next, you will get an introduction to platform channels, for when Flutter needs native device features.",
      quiz: {
        q: "Why is initState() the right place to start a one-time data fetch, rather than build()?",
        options: [
          "initState() runs only once, while build() can run many times",
          "initState() never actually runs in Flutter",
          "build() always runs exactly once per widget",
          "There is no difference between the two",
        ],
        answer: 0,
        explain: "Since build() can run repeatedly, placing one-time setup in initState() avoids duplicate work.",
      },
      quiz2: {
        q: "What is dispose() responsible for in a StatefulWidget?",
        options: [
          "Cleaning up resources like Timers or Streams when the widget is removed",
          "Describing the UI every time it rebuilds",
          "Running the very first time the widget is created",
          "Nothing, dispose() has no real purpose",
        ],
        answer: 0,
        explain: "dispose() is where you release resources (Timers, Streams, controllers) to avoid leaks once the widget is gone.",
      },
      challenge: {
        title: "Lifecycle method order",
        desc: "Write a function describeLifecycle(String method) returning a short description for 'initState', 'build', or 'dispose'.",
        starter: `String describeLifecycle(String method) {
  // return a short description for each lifecycle method name
}`,
        solution: `String describeLifecycle(String method) {
  switch (method) {
    case "initState":
      return "Runs once when created";
    case "build":
      return "Runs many times to describe the UI";
    case "dispose":
      return "Runs once when removed, cleans up resources";
    default:
      return "Unknown method";
  }
}`,
        keywords: [
          { label: "Uses switch", hint: "switch (...)", pattern: "switch\\s*\\(" },
          { label: "Mentions initState", hint: "initState", pattern: "initState" },
          { label: "Mentions dispose", hint: "dispose", pattern: "dispose" },
        ],
      },
      outcomes: [
        "Explain what initState() is for and when it runs",
        "Explain why build() should avoid side effects",
        "Use dispose() to clean up resources like Timers",
      ],
    },
    {
      title: "Platform Channels, Simply Explained",
      xp: 15,
      def:
        "A **platform channel** lets Flutter's Dart code talk to native platform code (Kotlin/Java on Android, Swift on iOS) for features Flutter does not provide directly, like certain specialized hardware access.",
      example:
        "If an app needs a very specific native feature not covered by any existing Flutter package, a platform channel lets the Dart side send a request ('get battery level') and the native side send back a real native answer.",
      learn: [
        "Why platform channels exist, as a 'bridge' between Dart and native code",
        "The basic idea: Dart sends a method name and arguments, native code responds",
        "Why most apps rarely need to write platform channels directly, thanks to existing packages",
      ],
      scenario:
        "Think of it like this: a platform channel is like a translator standing between two people who speak different languages (Dart and native code). One side asks a question in their language, the translator passes it over, and brings back the answer.",
      visual: {
        kind: "diagram",
        title: "Platform channel flow",
        nodes: [
          { label: "Dart side", items: ["MethodChannel.invokeMethod('getBatteryLevel')"] },
          { label: "Bridge", items: ["Platform channel carries the message"] },
          { label: "Native side", items: ["Kotlin/Swift handles the request", "Returns a real result"] },
        ],
      },
      code: {
        label: "Calling a platform channel (concept)",
        content: `import 'package:flutter/services.dart';

const platform = MethodChannel("com.example.app/battery");

Future<int> getBatteryLevel() async {
  final int level = await platform.invokeMethod("getBatteryLevel");
  return level;
}`,
      },
      tip: "Before writing a platform channel yourself, search for an existing Flutter package that already does what you need — most common native features already have a well-tested package.",
      warning: "Do not reach for platform channels for something an existing package already handles well — writing and maintaining native code for both Android and iOS is a lot more work than using a trusted package.",
      practice: {
        level1: "Explain, in your own words, what a platform channel is used for.",
        level2: "Describe, in words, the two sides involved: Dart and native code.",
        level3: "Think of one specialized native feature you might one day need a platform channel for.",
      },
      summary:
        "Platform channels bridge Dart and native code for specialized features, though most apps can rely on existing packages instead of writing their own.",
      next: "Next, you will explore concepts around notifications and localization for a more complete app.",
      quiz: {
        q: "What is the main purpose of a platform channel?",
        options: [
          "To let Dart code communicate with native platform code for specialized features",
          "To style widgets with a custom theme",
          "To replace the need for the http package",
          "To automatically translate the app's text",
        ],
        answer: 0,
        explain: "Platform channels bridge Dart and native code, enabling access to platform-specific functionality.",
      },
      quiz2: {
        q: "Why should you check for an existing Flutter package before writing your own platform channel?",
        options: [
          "Maintaining native code for both Android and iOS is significant extra work compared to using a tested package",
          "Platform channels are always faster to write than using packages",
          "Existing packages never cover any native features",
          "There is no real benefit to checking first",
        ],
        answer: 0,
        explain: "Writing and maintaining platform channel code yourself is more effort than reusing an existing, well-tested package.",
      },
      challenge: {
        title: "Describe a channel call",
        desc: "Write a function describeChannelCall(String methodName) that returns a sentence describing what Dart is asking native code to do.",
        starter: `String describeChannelCall(String methodName) {
  // return a descriptive sentence using methodName
}`,
        solution: `String describeChannelCall(String methodName) {
  return "Dart is asking native code to run: " + methodName;
}`,
        keywords: [
          { label: "Takes methodName", hint: "String methodName", pattern: "String\\s+methodName" },
          { label: "Returns a sentence", hint: "return \"...\"", pattern: "return\\s+\"" },
          { label: "Uses methodName in the string", hint: "+ methodName", pattern: "methodName" },
        ],
      },
      outcomes: [
        "Explain what a platform channel is used for",
        "Describe the Dart side and native side of a channel call",
        "Know to check for existing packages before writing a channel",
      ],
    },
    {
      title: "Push Notifications, Conceptually",
      xp: 10,
      def:
        "**Push notifications** are messages that appear on a user's device even when the app is closed, usually sent through a service like Firebase Cloud Messaging, which handles delivering the message to the right device.",
      example:
        "If a friend sends you a message on QuantumChat while your phone is locked, a push notification pops up on your lock screen immediately, even though the app itself is not currently open.",
      learn: [
        "The basic flow: your server sends a message, a push service delivers it, the device shows it",
        "Why apps need a device 'token' to know where to deliver notifications",
        "That handling notification taps often needs navigating to a relevant screen",
      ],
      scenario:
        "Think of it like this: push notifications are like a courier service. Your server hands a message to the courier (push service), who already knows exactly which door (device token) to deliver it to, even if no one is home at the moment (app closed).",
      visual: {
        kind: "diagram",
        title: "Push notification flow",
        nodes: [
          { label: "Your server", items: ["Decides to send a notification"] },
          { label: "Push service (e.g. FCM)", items: ["Delivers it to the right device"] },
          { label: "User's device", items: ["Shows the notification", "Tapping it can open a specific screen"] },
        ],
      },
      code: {
        label: "Thinking about notification data",
        content: `void main() {
  Map<String, String> notification = {
    "title": "New message",
    "body": "Sara: See you tomorrow!",
    "screen": "chat_detail",
  };

  print("Notification: " + notification["title"]! + " - " + notification["body"]!);
  print("Tapping should open: " + notification["screen"]!);
}`,
      },
      tip: "Include enough data in a notification (like which screen or chat id it relates to) so tapping it can take the user directly to the relevant content, not just the home screen.",
      warning: "Do not send excessive, unimportant notifications — users quickly disable notifications (or uninstall the app) if they feel spammed.",
      practice: {
        level1: "Explain, in your own words, how a push notification reaches a device even when the app is closed.",
        level2: "Design a notification Map for a 'new comment' event, including enough data to know which post to open.",
        level3: "Describe, in words, what your app should do when a user taps a chat notification.",
      },
      summary:
        "Push notifications let your server reach users even when the app is closed, delivered through a push service using a device token.",
      next: "Next, you will learn the basics of localization, making your app usable in multiple languages.",
      quiz: {
        q: "Why does an app need a device 'token' for push notifications?",
        options: [
          "So the push service knows exactly which device to deliver the notification to",
          "Tokens are only used for login, not notifications",
          "Push notifications never need any device identifier",
          "Tokens prevent the app from ever receiving notifications",
        ],
        answer: 0,
        explain: "A device token identifies the specific device/app installation, letting push services target the right recipient.",
      },
      quiz2: {
        q: "Why is it useful to include extra data (like a chat id) in a notification payload?",
        options: [
          "So tapping the notification can open the exact relevant screen",
          "Extra data always slows down notification delivery",
          "Notifications cannot include any extra data at all",
          "It has no effect on the user experience",
        ],
        answer: 0,
        explain: "Including context data lets the app navigate directly to the relevant content when a notification is tapped.",
      },
      challenge: {
        title: "Build a notification payload",
        desc: "Create a Map<String, String> with title, body, and screen fields for a 'new message' notification, then print all three.",
        starter: `void main() {
  // create a notification Map with title, body, screen
}`,
        solution: `void main() {
  Map<String, String> notification = {
    "title": "New message",
    "body": "You have a new message",
    "screen": "chat_detail",
  };
  print(notification["title"]);
  print(notification["body"]);
  print(notification["screen"]);
}`,
        keywords: [
          { label: "Creates a Map", hint: "Map<String, String>", pattern: "Map<String,\\s*String>" },
          { label: "Has a title field", hint: "\"title\"", pattern: "title" },
          { label: "Has a screen field", hint: "\"screen\"", pattern: "screen" },
        ],
      },
      outcomes: [
        "Explain the basic flow of a push notification",
        "Describe why a device token is needed",
        "Include enough data to navigate correctly on tap",
      ],
    },
    {
      title: "Localization Basics",
      xp: 15,
      def:
        "**Localization** means adapting your app's text (and sometimes layout) for different languages and regions, so users around the world can use your app comfortably in their own language.",
      example:
        "If PolyCode wants to support both English and Urdu, instead of hardcoding 'Welcome' directly in the UI, it would look up a translated string based on the device's selected language.",
      learn: [
        "Why hardcoded text strings become a problem for international apps",
        "The basic idea of looking up text by a key, like 'welcome_message'",
        "That Flutter has built-in tools (like the intl package) to help manage this",
      ],
      scenario:
        "Think of it like this: localization is like a restaurant menu printed in multiple languages. The dishes (features) stay the same, but each customer reads the menu in the language they understand best.",
      visual: {
        kind: "table",
        title: "Hardcoded vs localized text",
        columns: ["Approach", "Example"],
        rows: [
          ["Hardcoded (not localized)", "Text(\"Welcome\")"],
          ["Localized (looked up by key)", "Text(translations[\"welcome_message\"])"],
        ],
      },
      code: {
        label: "A simple translation lookup",
        content: `Map<String, Map<String, String>> translations = {
  "en": {"welcome": "Welcome!"},
  "ur": {"welcome": "خوش آمدید!"},
};

String translate(String languageCode, String key) {
  return translations[languageCode]?[key] ?? key;
}

void main() {
  print(translate("en", "welcome"));
  print(translate("ur", "welcome"));
}`,
      },
      tip: "Store every user-facing piece of text as a key (like 'welcome') from day one, even if you only support one language at first — adding more languages later becomes much easier.",
      warning: "Do not hardcode text directly inside widgets throughout your app if you plan to support more than one language eventually — it becomes a huge, error-prone task to find and replace every string later.",
      practice: {
        level1: "Explain, in your own words, why hardcoded text becomes a problem for multi-language apps.",
        level2: "Add a 'goodbye' key with English and Urdu translations to the map above.",
        level3: "Describe how you would decide which language to show based on the device's current locale.",
      },
      summary:
        "Localization adapts your app's text for different languages, typically by looking up strings via keys instead of hardcoding them directly.",
      next: "Congratulations — next, you will move into the Progressive Projects chapter, applying everything you have learned.",
      quiz: {
        q: "Why is looking up text by a key (like 'welcome') better than hardcoding it directly for international apps?",
        options: [
          "It makes adding new languages later much easier, without rewriting every widget",
          "Hardcoded text is always faster to translate later",
          "Keys have no real benefit over hardcoded text",
          "Localization is impossible in Flutter regardless of approach",
        ],
        answer: 0,
        explain: "Key-based lookup separates text content from UI code, making it far easier to support additional languages.",
      },
      quiz2: {
        q: "What is a sensible habit to adopt even if your app currently supports only one language?",
        options: [
          "Store user-facing text as keys from the start, to make future localization easier",
          "Hardcode every string directly, since localization will never be needed",
          "Avoid using any text in the app at all",
          "Only use images instead of text everywhere",
        ],
        answer: 0,
        explain: "Starting with key-based text lookup, even for one language, makes future localization much simpler.",
      },
      challenge: {
        title: "Translate with a fallback",
        desc: "Write a function translate(Map translations, String key) that returns the translation or the key itself if missing.",
        starter: `String translate(Map<String, String> translations, String key) {
  // return translations[key] if present, otherwise return key itself
}`,
        solution: `String translate(Map<String, String> translations, String key) {
  return translations[key] ?? key;
}`,
        keywords: [
          { label: "Uses ??", hint: "?? key", pattern: "\\?\\?" },
          { label: "Looks up translations", hint: "translations[key]", pattern: "translations\\[key\\]" },
          { label: "Returns a value", hint: "return ...", pattern: "return" },
        ],
      },
      outcomes: [
        "Explain why hardcoded text is a problem for multi-language apps",
        "Use a key-based lookup for translated text",
        "Know that Flutter has built-in localization tooling available",
      ],
    },
  ],
};
