// Chapter 6 — Your First Flutter UI

export const CH_FIRST_UI = {
  id: "first-ui",
  title: "Your First Flutter UI",
  icon: "layout-panel-top",
  color: "#1976d2",
  lessons: [
    {
      title: "StatelessWidget vs StatefulWidget",
      xp: 10,
      def:
        "A **StatelessWidget** never changes once it is built — perfect for things like a fixed label or icon. A **StatefulWidget** can change over time, like a counter or a 'liked' heart icon, because it holds internal **state** that can be updated.",
      example:
        "A static app logo never changes, so it fits a StatelessWidget. A 'like' button that toggles between filled and outline hearts needs to remember whether it is liked right now, so it needs a StatefulWidget.",
      learn: [
        "When to use StatelessWidget versus StatefulWidget",
        "What 'state' means in plain words",
        "How setState() tells Flutter to redraw a widget",
      ],
      scenario:
        "Think of it like this: a StatelessWidget is like a printed photo — it never changes once printed. A StatefulWidget is like a digital photo frame that can show a different picture whenever you tell it to update.",
      visual: {
        kind: "table",
        title: "Stateless vs Stateful",
        columns: ["Widget type", "Can it change later?", "Example"],
        rows: [
          ["StatelessWidget", "No, fixed once built", "A logo, a static label"],
          ["StatefulWidget", "Yes, using setState()", "A counter, a like button"],
        ],
      },
      code: {
        label: "A simple StatefulWidget counter",
        content: `import 'package:flutter/material.dart';

class CounterBox extends StatefulWidget {
  const CounterBox({super.key});

  @override
  State<CounterBox> createState() => _CounterBoxState();
}

class _CounterBoxState extends State<CounterBox> {
  int count = 0;

  void increase() {
    setState(() {
      count = count + 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("Count: " + count.toString()),
        ElevatedButton(onPressed: increase, child: const Text("Add")),
      ],
    );
  }
}`,
      },
      tip: "If a widget never needs to change after it is first drawn, keep it a StatelessWidget — it is simpler and often faster.",
      warning: "Do not change a state variable (like count) directly without wrapping the change in setState() — Flutter will not know to redraw the screen.",
      practice: {
        level1: "Decide whether a weather icon that never updates should be Stateless or Stateful.",
        level2: "Decide whether a 'like' counter on a post should be Stateless or Stateful, and explain why.",
        level3: "Sketch (in words) a StatefulWidget that tracks whether a light switch is on or off.",
      },
      summary:
        "StatelessWidgets are fixed, while StatefulWidgets can change using setState() to trigger a redraw.",
      next: "Next, you will meet core widgets: Text, Icon, Image, and Container.",
      quiz: {
        q: "What is the purpose of setState() in a StatefulWidget?",
        options: [
          "It tells Flutter that state changed and the widget should redraw",
          "It deletes the widget from the screen",
          "It only works for images",
          "It permanently stops the app",
        ],
        answer: 0,
        explain: "setState() signals Flutter to rebuild the widget using the updated state values.",
      },
      quiz2: {
        q: "A 'like' button needs to remember whether it is currently liked. Which widget type fits?",
        options: [
          "StatefulWidget, since its appearance needs to change over time",
          "StatelessWidget, since it never changes",
          "Neither type can handle this",
          "It must be built without any widget at all",
        ],
        answer: 0,
        explain: "Anything that changes after being built, like a toggled like button, needs a StatefulWidget.",
      },
      challenge: {
        title: "Build a toggle counter",
        desc: "Create a StatefulWidget with an int count starting at 0, a method to increase it using setState, and a Text showing the count.",
        starter: `import 'package:flutter/material.dart';

class CounterBox extends StatefulWidget {
  const CounterBox({super.key});

  @override
  State<CounterBox> createState() => _CounterBoxState();
}

class _CounterBoxState extends State<CounterBox> {
  int count = 0;

  // add an increase() method using setState

  @override
  Widget build(BuildContext context) {
    // return a Column with a Text showing count and a button
  }
}`,
        solution: `import 'package:flutter/material.dart';

class CounterBox extends StatefulWidget {
  const CounterBox({super.key});

  @override
  State<CounterBox> createState() => _CounterBoxState();
}

class _CounterBoxState extends State<CounterBox> {
  int count = 0;

  void increase() {
    setState(() {
      count = count + 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(count.toString()),
        ElevatedButton(onPressed: increase, child: const Text("Add")),
      ],
    );
  }
}`,
        keywords: [
          { label: "Extends StatefulWidget", hint: "extends StatefulWidget", pattern: "extends\\s+StatefulWidget" },
          { label: "Uses setState", hint: "setState(...)", pattern: "setState\\s*\\(" },
          { label: "Has a build method", hint: "Widget build(", pattern: "Widget\\s+build\\s*\\(" },
        ],
      },
      outcomes: [
        "Decide when to use StatelessWidget vs StatefulWidget",
        "Explain what state means in a Flutter widget",
        "Use setState() to update a widget's appearance",
      ],
    },
    {
      title: "Text, Icon, Image, and Container",
      xp: 10,
      def:
        "**Text** shows words, **Icon** shows a small symbol, **Image** shows a picture, and **Container** is a flexible box used for padding, color, size, and borders. These four widgets are used in almost every screen.",
      example:
        "A profile card typically shows a profile Image, a Text widget for the username, maybe an Icon for 'verified', and a Container to add padding and a rounded background around everything.",
      learn: [
        "How to show text with styling using Text",
        "How to show a small symbol using Icon",
        "How Container adds padding, color, and sizing around other widgets",
      ],
      scenario:
        "Think of it like this: Text, Icon, and Image are like the actual photo and name tag you place inside a picture frame. Container is the frame itself — it adds the border, mat, and spacing around whatever is inside.",
      visual: {
        kind: "table",
        title: "Four core widgets",
        columns: ["Widget", "Shows"],
        rows: [
          ["Text", "Words with a chosen style"],
          ["Icon", "A small built-in symbol, like Icons.favorite"],
          ["Image", "A picture from assets or the network"],
          ["Container", "A box for padding, color, size, and borders"],
        ],
      },
      code: {
        label: "A tiny profile row",
        content: `import 'package:flutter/material.dart';

class ProfileRow extends StatelessWidget {
  const ProfileRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      color: Colors.blue.shade50,
      child: Row(
        children: const [
          Icon(Icons.person, color: Colors.blue),
          SizedBox(width: 8),
          Text("Ali Khan", style: TextStyle(fontSize: 18)),
        ],
      ),
    );
  }
}`,
      },
      tip: "Use Container's padding property to add breathing room around your content — it is one of the most common beginner fixes for cramped-looking UI.",
      warning: "Do not forget that an Image loaded from the network needs the full URL and may take a moment to load — always have a plan for the loading moment (covered in a later chapter).",
      practice: {
        level1: "Write a Text widget showing your name with a bigger font size.",
        level2: "Add an Icon next to your name, like Icons.star.",
        level3: "Wrap both inside a Container with padding and a light background color.",
      },
      summary:
        "Text, Icon, Image, and Container are foundational widgets used together to build almost every visual element in a Flutter app.",
      next: "Next, you will learn how Row, Column, Stack, and SafeArea arrange widgets on screen.",
      quiz: {
        q: "What does the Container widget commonly add around its child?",
        options: [
          "Padding, background color, size, and borders",
          "Only internet connectivity",
          "A database connection",
          "A new programming language",
        ],
        answer: 0,
        explain: "Container is a flexible box widget used for spacing, color, sizing, and decoration.",
      },
      quiz2: {
        q: "You want to show a small star symbol next to a product name. Which widget fits best?",
        options: ["Icon", "Container only", "Image only", "Scaffold"],
        answer: 0,
        explain: "Icon is designed for small built-in symbols like stars, hearts, or arrows.",
      },
      challenge: {
        title: "Styled label",
        desc: "Build a StatelessWidget that returns a Container with padding, containing a Row with an Icon and a Text.",
        starter: `import 'package:flutter/material.dart';

class StyledLabel extends StatelessWidget {
  const StyledLabel({super.key});

  @override
  Widget build(BuildContext context) {
    // return a Container with a Row containing an Icon and Text
  }
}`,
        solution: `import 'package:flutter/material.dart';

class StyledLabel extends StatelessWidget {
  const StyledLabel({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8),
      child: Row(
        children: const [
          Icon(Icons.star),
          Text("Favorite"),
        ],
      ),
    );
  }
}`,
        keywords: [
          { label: "Uses Container", hint: "Container(...)", pattern: "Container\\s*\\(" },
          { label: "Uses Icon", hint: "Icon(...)", pattern: "Icon\\s*\\(" },
          { label: "Uses Text", hint: "Text(...)", pattern: "Text\\s*\\(" },
        ],
      },
      outcomes: [
        "Use Text to display styled words",
        "Use Icon to show a small built-in symbol",
        "Use Container to add padding, color, and sizing",
      ],
    },
    {
      title: "Row, Column, Stack, and SafeArea",
      xp: 15,
      def:
        "**Row** arranges widgets side by side (horizontally). **Column** stacks widgets on top of each other (vertically). **Stack** layers widgets on top of one another. **SafeArea** keeps your content away from notches, status bars, and rounded screen corners.",
      example:
        "A chat screen might use a Column for messages stacked vertically, a Row for an icon next to text in each message, a Stack to show an unread-count badge on top of a chat icon, and SafeArea so content never hides behind a phone's notch.",
      learn: [
        "The difference between Row (horizontal) and Column (vertical)",
        "How Stack layers widgets, with later children drawn on top",
        "Why SafeArea matters on modern phones with notches and rounded corners",
      ],
      scenario:
        "Think of it like this: Column is like stacking books on a shelf from bottom to top. Row is like placing books side by side on a table. Stack is like placing a sticky note directly on top of a book cover.",
      visual: {
        kind: "table",
        title: "Layout widgets",
        columns: ["Widget", "Arranges children"],
        rows: [
          ["Row", "Side by side, horizontally"],
          ["Column", "Top to bottom, vertically"],
          ["Stack", "Layered on top of each other"],
          ["SafeArea", "Keeps content clear of notches/status bars"],
        ],
      },
      code: {
        label: "Row, Column, and a tiny Stack badge",
        content: `import 'package:flutter/material.dart';

class ChatIconWithBadge extends StatelessWidget {
  const ChatIconWithBadge({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          Row(
            children: const [
              Icon(Icons.chat),
              SizedBox(width: 6),
              Text("Messages"),
            ],
          ),
          Stack(
            children: const [
              Icon(Icons.chat_bubble, size: 40),
              Positioned(
                right: 0,
                top: 0,
                child: CircleAvatar(
                  radius: 8,
                  backgroundColor: Colors.red,
                  child: Text("3", style: TextStyle(fontSize: 10, color: Colors.white)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}`,
      },
      tip: "If widgets inside a Row or Column overflow and look squeezed, try wrapping them with Expanded or Flexible (covered more in the layouts chapter).",
      warning: "Do not forget SafeArea on screens with important buttons near the top or bottom — without it, content can hide behind a notch or home indicator on some phones.",
      practice: {
        level1: "Describe when you would use Row instead of Column.",
        level2: "Sketch (in words) a Row containing an Icon and two pieces of Text.",
        level3: "Describe how you would use Stack to put a small red dot badge on the corner of a bell icon.",
      },
      summary:
        "Row, Column, and Stack control how widgets are arranged, while SafeArea protects your content from notches and system bars.",
      next: "Next, you will add an AppBar and a FloatingActionButton, then style your app with a theme.",
      quiz: {
        q: "Which widget stacks children on top of each other, layered?",
        options: ["Stack", "Row", "Column", "SafeArea"],
        answer: 0,
        explain: "Stack layers its children, with the last child drawn on top of earlier ones.",
      },
      quiz2: {
        q: "Why would you wrap a screen's content in SafeArea?",
        options: [
          "To keep content away from notches, status bars, and rounded corners",
          "To make the app run faster",
          "To automatically add internet access",
          "To remove all padding from the screen",
        ],
        answer: 0,
        explain: "SafeArea avoids drawing important content under phone notches or system UI elements.",
      },
      challenge: {
        title: "Row and Column combo",
        desc: "Build a widget with a Column containing a Row (Icon + Text) and a second line of Text below it, wrapped in SafeArea.",
        starter: `import 'package:flutter/material.dart';

class InfoCard extends StatelessWidget {
  const InfoCard({super.key});

  @override
  Widget build(BuildContext context) {
    // return a SafeArea > Column > Row(Icon, Text) + Text
  }
}`,
        solution: `import 'package:flutter/material.dart';

class InfoCard extends StatelessWidget {
  const InfoCard({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: const [
          Row(
            children: [
              Icon(Icons.info),
              Text("Info"),
            ],
          ),
          Text("Everything is up to date."),
        ],
      ),
    );
  }
}`,
        keywords: [
          { label: "Uses SafeArea", hint: "SafeArea(...)", pattern: "SafeArea\\s*\\(" },
          { label: "Uses Column", hint: "Column(...)", pattern: "Column\\s*\\(" },
          { label: "Uses Row", hint: "Row(...)", pattern: "Row\\s*\\(" },
        ],
      },
      outcomes: [
        "Use Row and Column to arrange widgets",
        "Use Stack to layer widgets on top of each other",
        "Use SafeArea to protect content from notches and system bars",
      ],
    },
    {
      title: "AppBar and FloatingActionButton",
      xp: 10,
      def:
        "**AppBar** is the top bar of a screen, usually showing a title and action icons. **FloatingActionButton** (FAB) is the round button that floats above the content, usually used for the main action on that screen, like 'add new'.",
      example:
        "In a to-do app, the AppBar might show the title 'My Tasks' with a search icon, while the FloatingActionButton (a plus icon) sits in the bottom-right corner to let the user quickly add a new task.",
      learn: [
        "How to add a title and actions to an AppBar",
        "How to add an onPressed callback to a FloatingActionButton",
        "Why FABs are usually reserved for one main action per screen",
      ],
      scenario:
        "Think of it like this: the AppBar is like a shop's sign and small buttons near its entrance (open hours, search). The FloatingActionButton is like a big obvious doorbell button that always stays visible and easy to find.",
      visual: {
        kind: "table",
        title: "AppBar vs FloatingActionButton",
        columns: ["Widget", "Typical use"],
        rows: [
          ["AppBar", "Screen title plus a few top-level actions/icons"],
          ["FloatingActionButton", "One clear main action, like Add or Compose"],
        ],
      },
      code: {
        label: "AppBar with actions and a FAB",
        content: `import 'package:flutter/material.dart';

class TasksScreen extends StatelessWidget {
  const TasksScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("My Tasks"),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.search)),
        ],
      ),
      body: const Center(child: Text("No tasks yet.")),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print("Add task tapped");
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
      },
      tip: "Keep your AppBar title short and clear — long titles can get cut off on smaller phone screens.",
      warning: "Do not put more than one FloatingActionButton on a single screen unless you have a very specific design reason — it usually confuses users about which button is the main action.",
      practice: {
        level1: "Write an AppBar with a title 'Settings'.",
        level2: "Add one action IconButton (like notifications) to that AppBar.",
        level3: "Add a FloatingActionButton that prints a message when tapped.",
      },
      summary:
        "AppBar provides a top bar with a title and actions, while FloatingActionButton highlights one clear main action on the screen.",
      next: "Next, you will learn how to theme your whole app so colors and fonts stay consistent everywhere.",
      quiz: {
        q: "What is the typical purpose of a FloatingActionButton?",
        options: [
          "To highlight one main action on the screen, like adding something new",
          "To show the app's full navigation menu",
          "To replace the AppBar completely",
          "To store user data permanently",
        ],
        answer: 0,
        explain: "FABs are meant to draw attention to a single primary action, such as 'add' or 'compose'.",
      },
      quiz2: {
        q: "Where would you add a search icon that appears in the top bar of a screen?",
        options: [
          "In the AppBar's actions list",
          "Inside the FloatingActionButton only",
          "Inside the Scaffold's body only",
          "AppBar cannot show any icons",
        ],
        answer: 0,
        explain: "The AppBar's actions property is designed for small icon buttons shown in the top bar.",
      },
      challenge: {
        title: "Tasks screen with FAB",
        desc: "Build a Scaffold with an AppBar titled 'Tasks' and a FloatingActionButton with an add icon that prints a message when pressed.",
        starter: `import 'package:flutter/material.dart';

class TasksScreen extends StatelessWidget {
  const TasksScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // return a Scaffold with AppBar and floatingActionButton
  }
}`,
        solution: `import 'package:flutter/material.dart';

class TasksScreen extends StatelessWidget {
  const TasksScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Tasks")),
      body: const Center(child: Text("No tasks yet.")),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print("Add tapped");
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
        keywords: [
          { label: "Uses AppBar", hint: "AppBar(...)", pattern: "AppBar\\s*\\(" },
          { label: "Uses FloatingActionButton", hint: "FloatingActionButton(...)", pattern: "FloatingActionButton\\s*\\(" },
          { label: "Has onPressed", hint: "onPressed:", pattern: "onPressed\\s*:" },
        ],
      },
      outcomes: [
        "Add a title and actions to an AppBar",
        "Add a FloatingActionButton with an onPressed callback",
        "Decide when a FAB is the right choice for a screen's main action",
      ],
    },
    {
      title: "Theming Your App",
      xp: 15,
      def:
        "A **theme** lets you define colors, fonts, and styles once in MaterialApp, and have every widget in your app automatically follow those rules, instead of repeating style code everywhere.",
      example:
        "If QuantumChat uses a specific blue color for all buttons, defining it once in the theme means every button across every screen automatically matches, and changing the brand color later only takes one edit.",
      learn: [
        "How to set a ThemeData on MaterialApp",
        "How to pick a primary color and text styles app-wide",
        "Why theming saves time and keeps your app visually consistent",
      ],
      scenario:
        "Think of it like this: a theme is like a company style guide. Instead of every employee picking their own font and colors for every document, everyone follows the same guide, so everything looks consistent.",
      visual: {
        kind: "table",
        title: "Common ThemeData options",
        columns: ["Property", "Controls"],
        rows: [
          ["primarySwatch / colorScheme", "The main brand color used across widgets"],
          ["textTheme", "Default font sizes and weights for text"],
          ["appBarTheme", "Default styling for every AppBar in the app"],
        ],
      },
      code: {
        label: "A themed MaterialApp",
        content: `import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "QuantumChat",
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        appBarTheme: const AppBarTheme(centerTitle: true),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("QuantumChat")),
        body: const Center(child: Text("Themed and ready!")),
      ),
    );
  }
}`,
      },
      tip: "Set your theme once at the top of your app in MaterialApp, so you never need to repeat color or font choices in every single screen.",
      warning: "Do not hardcode random colors directly on individual widgets everywhere — it makes rebranding or dark mode support much harder later.",
      practice: {
        level1: "Change the primarySwatch in the example to Colors.teal.",
        level2: "Add centerTitle: true to the appBarTheme if it is not already set, and describe the visual effect.",
        level3: "Describe, in words, how you would add a simple dark theme using darkTheme on MaterialApp.",
      },
      summary:
        "Theming lets you define colors and styles once in MaterialApp, keeping your whole app visually consistent and easy to update.",
      next: "Next chapter, you will learn how to build responsive layouts that work well on different screen sizes.",
      quiz: {
        q: "What is the main benefit of using a theme in MaterialApp?",
        options: [
          "Colors and styles are defined once and applied consistently app-wide",
          "It makes the app connect to the internet automatically",
          "It removes the need for any widgets",
          "It only affects a single screen, never the whole app",
        ],
        answer: 0,
        explain: "Theming centralizes style decisions so your whole app stays visually consistent.",
      },
      quiz2: {
        q: "A designer wants every AppBar's title centered across the whole app. Where should this be configured?",
        options: [
          "In the appBarTheme inside ThemeData on MaterialApp",
          "By manually editing every single screen file one by one",
          "This cannot be done app-wide in Flutter",
          "Inside the pubspec.yaml file",
        ],
        answer: 0,
        explain: "appBarTheme inside ThemeData applies default AppBar styling across the whole app.",
      },
      challenge: {
        title: "Theme your app",
        desc: "Build a MaterialApp with a ThemeData using primarySwatch set to Colors.teal and a Scaffold home screen.",
        starter: `import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // return a MaterialApp with a teal theme
  }
}`,
        solution: `import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primarySwatch: Colors.teal),
      home: Scaffold(
        appBar: AppBar(title: const Text("Themed App")),
        body: const Center(child: Text("Hello!")),
      ),
    );
  }
}`,
        keywords: [
          { label: "Uses ThemeData", hint: "ThemeData(...)", pattern: "ThemeData\\s*\\(" },
          { label: "Sets primarySwatch", hint: "primarySwatch:", pattern: "primarySwatch\\s*:" },
          { label: "Uses MaterialApp", hint: "MaterialApp(...)", pattern: "MaterialApp\\s*\\(" },
        ],
      },
      outcomes: [
        "Set a ThemeData on MaterialApp",
        "Choose a primary color that applies app-wide",
        "Explain why theming keeps an app visually consistent",
      ],
    },
  ],
};
