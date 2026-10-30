// Chapter 16 — Animations and Polished Interfaces

export const CH_POLISH = {
  id: "polish",
  title: "Animations and Polished Interfaces",
  icon: "sparkles",
  color: "#1b5e20",
  lessons: [
    {
      title: "Implicit Animations",
      xp: 15,
      def:
        "**Implicit animations** are widgets like `AnimatedContainer` or `AnimatedOpacity` that automatically animate smoothly between old and new values, without you having to manually program each animation frame.",
      example:
        "If a 'like' button's background color changes from white to red when tapped, wrapping it in an AnimatedContainer makes that color change fade smoothly, instead of switching instantly and feeling abrupt.",
      learn: [
        "What makes an animation 'implicit' versus manually controlled",
        "How AnimatedContainer animates size, color, and padding automatically",
        "How to set a duration and curve for a smoother feel",
      ],
      scenario:
        "Think of it like this: implicit animations are like an elevator that automatically glides smoothly between floors, instead of teleporting instantly. You just tell it the destination floor (the new value); it handles the smooth motion.",
      visual: {
        kind: "table",
        title: "Common implicit animation widgets",
        columns: ["Widget", "Animates"],
        rows: [
          ["AnimatedContainer", "Size, color, padding, and more, together"],
          ["AnimatedOpacity", "Fading a widget in or out"],
          ["AnimatedPositioned", "Moving a widget's position inside a Stack"],
        ],
      },
      code: {
        label: "A simple AnimatedContainer toggle",
        content: `import 'package:flutter/material.dart';

class LikeBox extends StatefulWidget {
  const LikeBox({super.key});

  @override
  State<LikeBox> createState() => _LikeBoxState();
}

class _LikeBoxState extends State<LikeBox> {
  bool liked = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => liked = !liked),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        width: liked ? 120 : 100,
        color: liked ? Colors.red : Colors.grey,
        child: const Icon(Icons.favorite, color: Colors.white),
      ),
    );
  }
}`,
      },
      tip: "A short duration (around 200-400 milliseconds) usually feels smooth without making the UI feel sluggish.",
      warning: "Do not animate too many properties on too many widgets at once — excessive animation can feel distracting rather than polished.",
      practice: {
        level1: "Change the duration above to 600 milliseconds and describe the expected feel.",
        level2: "Add a border radius that also changes when liked toggles.",
        level3: "Try AnimatedOpacity on a Text widget that fades in and out based on a bool.",
      },
      summary:
        "Implicit animations like AnimatedContainer automatically smooth transitions between old and new widget values, adding polish with little code.",
      next: "Next, you will build custom themes with more styling control for a polished, branded look.",
      quiz: {
        q: "What makes AnimatedContainer different from a plain Container?",
        options: [
          "It automatically animates changes to its properties over a given duration",
          "It can only ever be one fixed color",
          "It cannot have a child widget",
          "It requires an internet connection to work",
        ],
        answer: 0,
        explain: "AnimatedContainer smoothly animates between old and new property values, like size or color.",
      },
      quiz2: {
        q: "Why might using too many animations across a screen feel like a bad idea?",
        options: [
          "Excessive movement can distract users rather than feel polished",
          "Flutter only allows one animation per app",
          "Animations always slow down the app's actual logic",
          "There is no downside to adding many animations",
        ],
        answer: 0,
        explain: "Overusing animation effects can overwhelm users instead of enhancing the experience.",
      },
      challenge: {
        title: "Animated like button",
        desc: "Build a StatefulWidget with a bool liked and an AnimatedContainer that changes color based on it, toggled by GestureDetector.",
        starter: `import 'package:flutter/material.dart';

class LikeButton extends StatefulWidget {
  const LikeButton({super.key});

  @override
  State<LikeButton> createState() => _LikeButtonState();
}

class _LikeButtonState extends State<LikeButton> {
  bool liked = false;

  @override
  Widget build(BuildContext context) {
    // return a GestureDetector wrapping an AnimatedContainer
  }
}`,
        solution: `import 'package:flutter/material.dart';

class LikeButton extends StatefulWidget {
  const LikeButton({super.key});

  @override
  State<LikeButton> createState() => _LikeButtonState();
}

class _LikeButtonState extends State<LikeButton> {
  bool liked = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => liked = !liked),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        color: liked ? Colors.red : Colors.grey,
        width: 80,
        height: 40,
      ),
    );
  }
}`,
        keywords: [
          { label: "Uses AnimatedContainer", hint: "AnimatedContainer(", pattern: "AnimatedContainer\\s*\\(" },
          { label: "Has a duration", hint: "duration:", pattern: "duration\\s*:" },
          { label: "Uses GestureDetector", hint: "GestureDetector(", pattern: "GestureDetector\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain what makes an animation implicit",
        "Use AnimatedContainer to smoothly animate property changes",
        "Set an appropriate duration for a polished feel",
      ],
    },
    {
      title: "Custom Themes",
      xp: 15,
      def:
        "A **custom theme** goes beyond a single primary color — defining your own color scheme, text styles, button shapes, and more, so your whole app feels intentionally designed and consistently branded.",
      example:
        "A learning app like PolyCode might define its own ColorScheme (deep blue and white), rounded button shapes, and a consistent font — applied once in the theme, then automatically used everywhere.",
      learn: [
        "How to define a custom ColorScheme",
        "How to style buttons app-wide using elevatedButtonTheme",
        "How consistent theming improves an app's overall feel",
      ],
      scenario:
        "Think of it like this: a custom theme is like a full brand style guide for a company, specifying exact colors, fonts, and shapes — not just one color, but a complete, consistent visual identity.",
      visual: {
        kind: "table",
        title: "Common custom theme pieces",
        columns: ["Property", "Controls"],
        rows: [
          ["colorScheme", "A full set of coordinated colors (primary, secondary, background, etc.)"],
          ["elevatedButtonTheme", "Default style for all ElevatedButtons app-wide"],
          ["textTheme", "Default font sizes/weights for headings and body text"],
        ],
      },
      code: {
        label: "A custom themed MaterialApp",
        content: `import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("PolyCode")),
        body: Center(child: ElevatedButton(onPressed: () {}, child: const Text("Start"))),
      ),
    );
  }
}`,
      },
      tip: "ColorScheme.fromSeed(seedColor: ...) is an easy way to generate a full, well-balanced color palette from just one brand color.",
      warning: "Do not hand-pick a dozen unrelated colors across different screens — relying on a single ColorScheme keeps your app visually coherent as it grows.",
      practice: {
        level1: "Change the seedColor above to Colors.deepOrange and describe what you expect to change.",
        level2: "Add a borderRadius change to make buttons more or less rounded.",
        level3: "Describe how you would add a matching darkTheme using the same seed color.",
      },
      summary:
        "A custom theme defines a full, coordinated color scheme and widget styles, giving your app a consistent, intentional, branded look.",
      next: "Next, you will add SnackBars and dialogs to give users clear, timely feedback.",
      quiz: {
        q: "What does ColorScheme.fromSeed(seedColor: ...) help you do?",
        options: [
          "Generate a full, coordinated color palette from one brand color",
          "Delete all existing colors from the theme",
          "Connect the app to the internet",
          "Automatically translate the app into other languages",
        ],
        answer: 0,
        explain: "fromSeed() builds a complete, well-balanced ColorScheme starting from a single chosen color.",
      },
      quiz2: {
        q: "Why apply button styling through elevatedButtonTheme instead of styling every button individually?",
        options: [
          "It keeps every ElevatedButton consistent app-wide, with one place to update",
          "Individual button styling is always required and cannot be centralized",
          "elevatedButtonTheme only works on a single screen",
          "There is no difference between the two approaches",
        ],
        answer: 0,
        explain: "Centralizing button styles avoids repeating the same style code everywhere and keeps the app consistent.",
      },
      challenge: {
        title: "Themed MaterialApp",
        desc: "Build a MaterialApp using ThemeData with a ColorScheme.fromSeed and a Scaffold home screen.",
        starter: `import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // return a MaterialApp with a seeded ColorScheme theme
  }
}`,
        solution: `import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal)),
      home: Scaffold(body: Center(child: Text("Themed"))),
    );
  }
}`,
        keywords: [
          { label: "Uses ColorScheme.fromSeed", hint: "ColorScheme.fromSeed(", pattern: "ColorScheme\\.fromSeed\\s*\\(" },
          { label: "Uses ThemeData", hint: "ThemeData(...)", pattern: "ThemeData\\s*\\(" },
          { label: "Uses MaterialApp", hint: "MaterialApp(...)", pattern: "MaterialApp\\s*\\(" },
        ],
      },
      outcomes: [
        "Define a custom ColorScheme using ColorScheme.fromSeed",
        "Style buttons app-wide using elevatedButtonTheme",
        "Explain how consistent theming improves an app's feel",
      ],
    },
    {
      title: "SnackBars and Dialogs",
      xp: 10,
      def:
        "A **SnackBar** is a small message that briefly pops up from the bottom of the screen, great for quick feedback like 'Message sent'. A **Dialog** is a pop-up box that interrupts the screen, often used to confirm an important action.",
      example:
        "After sending a chat message, a quick SnackBar saying 'Sent!' confirms success without blocking anything. But before deleting an entire chat, a confirmation Dialog asking 'Are you sure?' prevents an accidental, hard-to-undo action.",
      learn: [
        "How to show a SnackBar using ScaffoldMessenger",
        "How to show a confirmation Dialog using showDialog()",
        "When to use a quick SnackBar versus a blocking Dialog",
      ],
      scenario:
        "Think of it like this: a SnackBar is like a quick tap on the shoulder saying 'done!' as you keep walking. A Dialog is like someone stepping directly in front of you asking 'wait, are you sure about this?' before you can continue.",
      visual: {
        kind: "table",
        title: "SnackBar vs Dialog",
        columns: ["Widget", "Good for"],
        rows: [
          ["SnackBar", "Quick, non-blocking confirmations, like 'Saved!'"],
          ["Dialog (AlertDialog)", "Important choices that need explicit confirmation"],
        ],
      },
      code: {
        label: "A SnackBar and a confirmation dialog",
        content: `import 'package:flutter/material.dart';

void showSentMessage(BuildContext context) {
  ScaffoldMessenger.of(context).showSnackBar(
    const SnackBar(content: Text("Message sent!")),
  );
}

Future<void> confirmDelete(BuildContext context) async {
  bool? confirmed = await showDialog<bool>(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text("Delete chat?"),
      content: const Text("This action cannot be undone."),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context, false), child: const Text("Cancel")),
        TextButton(onPressed: () => Navigator.pop(context, true), child: const Text("Delete")),
      ],
    ),
  );

  if (confirmed == true) {
    print("Chat deleted");
  }
}`,
      },
      tip: "Reserve blocking Dialogs for truly important or irreversible actions — overusing them for minor things can feel annoying to users.",
      warning: "Do not forget that showDialog() returns a Future — if you need the user's choice, you must await it and check the result, like 'confirmed == true' above.",
      practice: {
        level1: "Change the SnackBar's text and describe what you expect to see.",
        level2: "Add a third action button to the dialog, like 'Archive instead'.",
        level3: "Describe a situation in your own app idea where a Dialog is more appropriate than a SnackBar.",
      },
      summary:
        "SnackBars give quick, non-blocking feedback, while Dialogs interrupt the screen to confirm important or irreversible actions.",
      next: "Next, you will polish small UI details that make an app feel truly finished.",
      quiz: {
        q: "When is a SnackBar more appropriate than a Dialog?",
        options: [
          "For quick, non-blocking feedback like 'Saved!'",
          "For confirming irreversible actions like account deletion",
          "SnackBars should never be used in real apps",
          "Only when there is no internet connection",
        ],
        answer: 0,
        explain: "SnackBars are ideal for brief confirmations that do not need the user to make an immediate choice.",
      },
      quiz2: {
        q: "Why must showDialog() be awaited when you need the user's choice?",
        options: [
          "Because it returns a Future that resolves once the dialog is closed with a result",
          "Dialogs never return any value",
          "Awaiting it deletes the dialog immediately",
          "It has no effect on the result at all",
        ],
        answer: 0,
        explain: "showDialog() is asynchronous; awaiting it lets your code read the value passed to Navigator.pop() when the dialog closes.",
      },
      challenge: {
        title: "Confirm delete logic",
        desc: "Write a function handleDeleteResult(bool? confirmed) that prints 'Deleted' if true, 'Cancelled' otherwise.",
        starter: `void handleDeleteResult(bool? confirmed) {
  // print "Deleted" if confirmed is true, otherwise "Cancelled"
}`,
        solution: `void handleDeleteResult(bool? confirmed) {
  if (confirmed == true) {
    print("Deleted");
  } else {
    print("Cancelled");
  }
}`,
        keywords: [
          { label: "Checks confirmed == true", hint: "confirmed == true", pattern: "confirmed\\s*==\\s*true" },
          { label: "Uses if/else", hint: "if (...) { } else", pattern: "if\\s*\\(" },
          { label: "Prints a result", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Show a quick SnackBar for simple feedback",
        "Show a confirmation Dialog for important actions",
        "Decide when to use a SnackBar versus a Dialog",
      ],
    },
    {
      title: "Polishing UI Details",
      xp: 15,
      def:
        "**Polish** means the small finishing touches that make an app feel professional: consistent spacing, rounded corners, subtle shadows, readable font sizes, and smooth loading states — details that are easy to overlook but add up.",
      example:
        "Two apps can have the exact same features, but the one with consistent padding, aligned text, and smooth transitions feels far more trustworthy and professional than one with cramped, inconsistent spacing.",
      learn: [
        "Why consistent spacing and alignment matter so much",
        "Simple polish habits: rounded corners, shadows, readable text sizes",
        "How small details add up to a professional-feeling app",
      ],
      scenario:
        "Think of it like this: polish is like the difference between a meal served on a random plate versus one carefully plated with matching cutlery and a clean table. The food (features) can be identical, but presentation changes how it feels.",
      visual: {
        kind: "table",
        title: "Simple polish habits",
        columns: ["Habit", "Effect"],
        rows: [
          ["Consistent padding (e.g. always 16)", "Feels organized instead of cramped or uneven"],
          ["Rounded corners on cards/buttons", "Feels modern and friendly"],
          ["Readable font sizes and contrast", "Easier and more pleasant to read"],
        ],
      },
      code: {
        label: "A polished card widget",
        content: `import 'package:flutter/material.dart';

class PolishedCard extends StatelessWidget {
  final String title;
  const PolishedCard({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(title, style: const TextStyle(fontSize: 16)),
      ),
    );
  }
}`,
      },
      tip: "Pick a small set of spacing values (like 8, 16, 24) and reuse them everywhere, instead of inventing a new random number for every widget.",
      warning: "Do not sacrifice readability for style — tiny font sizes or low-contrast text might look 'sleek' but can frustrate real users.",
      practice: {
        level1: "Change the elevation and borderRadius above and describe the visual effect.",
        level2: "Wrap the PolishedCard in consistent outer padding (like 16 on all sides) when placed in a list.",
        level3: "List three small polish habits you plan to apply consistently across your own app project.",
      },
      summary:
        "Small, consistent polish details — spacing, rounded corners, readable text — add up to make an app feel genuinely professional.",
      next: "Next chapter, you will organize your growing app using a clean, maintainable architecture.",
      quiz: {
        q: "Why is consistent spacing (like always using 16) considered good polish?",
        options: [
          "It makes the app feel organized rather than cramped or uneven",
          "It makes the app connect to the internet faster",
          "It has no visible effect on the user",
          "Consistent spacing is required by Dart's compiler",
        ],
        answer: 0,
        explain: "Reusing a small set of spacing values creates visual rhythm and consistency across screens.",
      },
      quiz2: {
        q: "What is a risk of prioritizing 'sleek' tiny text over readability?",
        options: [
          "It can frustrate real users who struggle to read the content",
          "It always makes the app run faster",
          "There is no downside at all",
          "It automatically improves accessibility",
        ],
        answer: 0,
        explain: "Readability should never be sacrificed purely for a stylistic preference — it directly affects usability.",
      },
      challenge: {
        title: "Build a polished card",
        desc: "Build a Card with rounded corners, padding, and a Text title, taking the title as a constructor parameter.",
        starter: `import 'package:flutter/material.dart';

class InfoCard extends StatelessWidget {
  final String title;
  const InfoCard({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    // return a Card with rounded shape, padding, and Text(title)
  }
}`,
        solution: `import 'package:flutter/material.dart';

class InfoCard extends StatelessWidget {
  final String title;
  const InfoCard({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(title),
      ),
    );
  }
}`,
        keywords: [
          { label: "Uses Card", hint: "Card(...)", pattern: "Card\\s*\\(" },
          { label: "Uses rounded shape", hint: "RoundedRectangleBorder", pattern: "RoundedRectangleBorder" },
          { label: "Uses Padding", hint: "Padding(...)", pattern: "Padding\\s*\\(" },
        ],
      },
      outcomes: [
        "Apply consistent spacing and rounded corners",
        "Explain why small polish details matter to users",
        "Build a reusable, polished card-style widget",
      ],
    },
  ],
};
