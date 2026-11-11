// Chapter 9 — Navigation and Multiple Screens

export const CH_NAVIGATION = {
  id: "navigation",
  title: "Navigation and Multiple Screens",
  icon: "map",
  color: "#0097a7",
  lessons: [
    {
      title: "Navigator Push and Pop",
      xp: 10,
      def:
        "**Navigator.push()** moves to a new screen, adding it on top of a stack. **Navigator.pop()** goes back to the previous screen by removing the top one. Think of your app's screens as a stack of cards.",
      example:
        "Tapping a chat in a chat list pushes a new 'Chat Detail' screen on top. Tapping the back arrow pops that screen off, returning you to the chat list exactly where you left it.",
      learn: [
        "How Navigator.push() opens a new screen",
        "How Navigator.pop() returns to the previous screen",
        "Why screens behave like a stack of cards (last in, first out)",
      ],
      scenario:
        "Think of it like this: screens in Flutter work like a stack of papers on a desk. push() adds a new paper on top. pop() removes the top paper, revealing the one underneath — you cannot peek at a paper in the middle without removing everything above it first.",
      visual: {
        kind: "diagram",
        title: "The screen stack",
        nodes: [
          { label: "Screen A (bottom)", items: ["Chat list"] },
          { label: "push() adds", items: ["Screen B on top", "Chat detail"] },
          { label: "pop() removes", items: ["Back to Screen A"] },
        ],
      },
      code: {
        label: "Pushing and popping a screen",
        content: `import 'package:flutter/material.dart';

class ChatListScreen extends StatelessWidget {
  const ChatListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Chats")),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const ChatDetailScreen()),
            );
          },
          child: const Text("Open chat"),
        ),
      ),
    );
  }
}

class ChatDetailScreen extends StatelessWidget {
  const ChatDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Chat with Sara")),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.pop(context),
          child: const Text("Go back"),
        ),
      ),
    );
  }
}`,
      },
      tip: "The AppBar automatically adds a back arrow for you whenever a screen was reached by push() — you often do not need to add a back button yourself.",
      warning: "Do not call Navigator.pop(context) on the very first screen of your app — there is nothing left underneath to go back to.",
      practice: {
        level1: "Explain, in your own words, what push() and pop() each do.",
        level2: "Write the push() call needed to open a 'SettingsScreen' from a button.",
        level3: "Describe what happens if a user presses the back button three times after pushing three screens.",
      },
      summary:
        "Navigator.push() opens a new screen on top of the stack, and Navigator.pop() removes the top screen to go back.",
      next: "Next, you will learn how to pass data between screens when navigating.",
      quiz: {
        q: "What does Navigator.push() do?",
        options: [
          "Opens a new screen, placing it on top of the navigation stack",
          "Deletes the current screen permanently",
          "Only changes the app's theme",
          "Closes the entire app",
        ],
        answer: 0,
        explain: "push() adds a new screen on top of the stack, which becomes the currently visible screen.",
      },
      quiz2: {
        q: "Why does Flutter's AppBar often show a back arrow automatically?",
        options: [
          "Because the screen was reached via Navigator.push(), so there is a previous screen to pop back to",
          "Because every AppBar always shows a back arrow with no exceptions",
          "Because the app has no internet connection",
          "Because the screen uses a Checkbox",
        ],
        answer: 0,
        explain: "Flutter detects there is a previous screen on the stack and automatically provides a back arrow.",
      },
      challenge: {
        title: "Push a detail screen",
        desc: "Write an onPressed callback that uses Navigator.push with MaterialPageRoute to open a DetailScreen.",
        starter: `import 'package:flutter/material.dart';

void openDetail(BuildContext context) {
  // push a MaterialPageRoute that builds a DetailScreen
}

class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(title: const Text("Detail")));
  }
}`,
        solution: `import 'package:flutter/material.dart';

void openDetail(BuildContext context) {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => const DetailScreen()),
  );
}

class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(title: const Text("Detail")));
  }
}`,
        keywords: [
          { label: "Uses Navigator.push", hint: "Navigator.push(", pattern: "Navigator\\.push\\s*\\(" },
          { label: "Uses MaterialPageRoute", hint: "MaterialPageRoute(", pattern: "MaterialPageRoute\\s*\\(" },
          { label: "Builds DetailScreen", hint: "DetailScreen()", pattern: "DetailScreen\\s*\\(" },
        ],
      },
      outcomes: [
        "Use Navigator.push() to open a new screen",
        "Use Navigator.pop() to return to the previous screen",
        "Explain the screen stack idea (last in, first out)",
      ],
    },
    {
      title: "Passing Data Between Screens",
      xp: 15,
      def:
        "You can send data **to** a new screen by passing it through its constructor, and send data **back** from a screen using `Navigator.pop(context, result)`, which the previous screen can read using `await`.",
      example:
        "Tapping a specific chat in a list should open that exact chat's messages, so you pass the chat's name or id into the new screen's constructor. If a 'pick a color' screen lets the user choose, it can pop back with that chosen color as a result.",
      learn: [
        "How to pass data forward through a widget's constructor",
        "How to pop a result back using Navigator.pop(context, result)",
        "How to receive that result using await Navigator.push(...)",
      ],
      scenario:
        "Think of it like this: passing data forward is like handing someone a note before they walk into another room. Getting a result back is like waiting by the door for them to hand you a reply note when they come back out.",
      visual: {
        kind: "table",
        title: "Passing data patterns",
        columns: ["Direction", "How"],
        rows: [
          ["Forward (to new screen)", "Pass values into the new screen's constructor"],
          ["Backward (returning a result)", "Navigator.pop(context, result), read with await"],
        ],
      },
      code: {
        label: "Sending and receiving data between screens",
        content: `import 'package:flutter/material.dart';

class ChatListScreen extends StatefulWidget {
  const ChatListScreen({super.key});

  @override
  State<ChatListScreen> createState() => _ChatListScreenState();
}

class _ChatListScreenState extends State<ChatListScreen> {
  Future<void> openChat(BuildContext context) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const ChatDetailScreen(chatName: "Sara")),
    );
    print("Returned from chat: " + result.toString());
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => openChat(context),
      child: const Text("Open Sara's chat"),
    );
  }
}

class ChatDetailScreen extends StatelessWidget {
  final String chatName;
  const ChatDetailScreen({super.key, required this.chatName});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Chat with " + chatName)),
      body: ElevatedButton(
        onPressed: () => Navigator.pop(context, "closed chat"),
        child: const Text("Close"),
      ),
    );
  }
}`,
      },
      tip: "Mark required constructor parameters with 'required' so Dart warns you if you forget to pass needed data when navigating.",
      warning: "Do not forget to use 'await' when you need the result of a push() call — without it, your code will not pause to wait for the returned value.",
      practice: {
        level1: "Add a required int unreadCount field to ChatDetailScreen's constructor.",
        level2: "Change the pop() call to send back a simple Map instead of a plain String.",
        level3: "Print a different message on the previous screen depending on what result value comes back.",
      },
      summary:
        "You can pass data forward through constructors, and pass results backward using Navigator.pop(context, result) combined with await.",
      next: "Next, you will add a Drawer menu for easy navigation between major sections of your app.",
      quiz: {
        q: "How do you send data forward when opening a new screen?",
        options: [
          "By passing values into the new screen's constructor",
          "By using only global variables with no constructor",
          "It is impossible to send data to a new screen",
          "By editing pubspec.yaml",
        ],
        answer: 0,
        explain: "Constructor parameters are the standard way to pass data into a new screen.",
      },
      quiz2: {
        q: "How can a screen send a result back to the screen that opened it?",
        options: [
          "Using Navigator.pop(context, result)",
          "By simply closing the app",
          "By editing the AppBar's title",
          "This is not possible in Flutter",
        ],
        answer: 0,
        explain: "Navigator.pop(context, result) returns a value to the awaiting push() call on the previous screen.",
      },
      challenge: {
        title: "Return a chosen color",
        desc: "Write a function that pops the current screen with a String color value as the result.",
        starter: `import 'package:flutter/material.dart';

void chooseColor(BuildContext context, String color) {
  // pop the screen, returning color as the result
}`,
        solution: `import 'package:flutter/material.dart';

void chooseColor(BuildContext context, String color) {
  Navigator.pop(context, color);
}`,
        keywords: [
          { label: "Uses Navigator.pop", hint: "Navigator.pop(", pattern: "Navigator\\.pop\\s*\\(" },
          { label: "Passes a result", hint: "context, color", pattern: "pop\\s*\\(\\s*context\\s*,\\s*color" },
          { label: "Takes a BuildContext", hint: "BuildContext context", pattern: "BuildContext\\s+context" },
        ],
      },
      outcomes: [
        "Pass data to a new screen through its constructor",
        "Return a result using Navigator.pop(context, result)",
        "Receive that result using await Navigator.push(...)",
      ],
    },
    {
      title: "Drawer Navigation",
      xp: 10,
      def:
        "A **Drawer** is a hidden side menu that slides in from the edge of the screen, usually opened by tapping a menu icon or swiping from the edge. It is great for apps with several major sections, like Home, Profile, and Settings.",
      example:
        "A learning app like PolyCode might use a Drawer to let users quickly jump between 'My Courses', 'Profile', and 'Settings', without cluttering the main screen with extra buttons.",
      learn: [
        "How to add a Drawer to a Scaffold",
        "How to build a simple menu using ListTile items inside the Drawer",
        "How tapping a Drawer item can navigate to a new screen and close the Drawer",
      ],
      scenario:
        "Think of it like this: a Drawer is like a hidden filing cabinet drawer built into the side of a desk. It stays out of the way until you pull it open, revealing a menu of folders (menu items) you can choose from.",
      visual: {
        kind: "table",
        title: "Drawer basics",
        columns: ["Piece", "Purpose"],
        rows: [
          ["Scaffold.drawer", "Attaches a Drawer to a screen"],
          ["ListTile", "A simple tappable row, often used as a menu item"],
          ["Navigator.pop(context) first", "Closes the Drawer before navigating, for a smooth feel"],
        ],
      },
      code: {
        label: "A simple navigation Drawer",
        content: `import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("PolyCode")),
      drawer: Drawer(
        child: ListView(
          children: [
            const DrawerHeader(child: Text("Menu")),
            ListTile(
              title: const Text("My Courses"),
              onTap: () {
                Navigator.pop(context); // close drawer first
                print("Go to My Courses");
              },
            ),
            ListTile(
              title: const Text("Settings"),
              onTap: () {
                Navigator.pop(context);
                print("Go to Settings");
              },
            ),
          ],
        ),
      ),
      body: const Center(child: Text("Home content here")),
    );
  }
}`,
      },
      tip: "Flutter automatically adds a menu icon to the AppBar when a Scaffold has a drawer attached — you usually do not need to build that icon yourself.",
      warning: "Do not forget to close the Drawer (Navigator.pop(context)) before pushing a new screen from inside it — otherwise both the drawer and the new screen can stack awkwardly.",
      practice: {
        level1: "Add a third ListTile menu item for 'Profile'.",
        level2: "Add an Icon next to each ListTile's title inside the Drawer.",
        level3: "Replace the print() calls with real Navigator.push() calls to separate screens.",
      },
      summary:
        "A Drawer gives you a clean, hidden side menu for navigating between major app sections, built from ListTile rows.",
      next: "Next, you will add a BottomNavigationBar for quick switching between a few main tabs.",
      quiz: {
        q: "What is a Drawer typically used for in a Flutter app?",
        options: [
          "A hidden side menu for navigating between major app sections",
          "A pop-up alert dialog",
          "A way to store data permanently",
          "A type of animation effect",
        ],
        answer: 0,
        explain: "Drawers provide a clean side-menu pattern for navigating between a handful of major sections.",
      },
      quiz2: {
        q: "Why should you call Navigator.pop(context) inside a Drawer item's onTap before pushing a new screen?",
        options: [
          "To close the drawer first, so it does not stay open awkwardly behind the new screen",
          "Because Drawer items cannot use onTap otherwise",
          "To permanently delete the Drawer from the app",
          "It has no real effect at all",
        ],
        answer: 0,
        explain: "Closing the drawer before navigating keeps the transition clean and avoids layered navigation issues.",
      },
      challenge: {
        title: "Build a drawer menu",
        desc: "Build a Drawer with a ListView containing two ListTile items, each printing a different message on tap.",
        starter: `import 'package:flutter/material.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    // return a Drawer with a ListView of 2 ListTiles
  }
}`,
        solution: `import 'package:flutter/material.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          ListTile(
            title: const Text("Home"),
            onTap: () => print("Home tapped"),
          ),
          ListTile(
            title: const Text("Settings"),
            onTap: () => print("Settings tapped"),
          ),
        ],
      ),
    );
  }
}`,
        keywords: [
          { label: "Uses Drawer", hint: "Drawer(...)", pattern: "Drawer\\s*\\(" },
          { label: "Uses ListTile", hint: "ListTile(...)", pattern: "ListTile\\s*\\(" },
          { label: "Has onTap", hint: "onTap:", pattern: "onTap\\s*:" },
        ],
      },
      outcomes: [
        "Add a Drawer to a Scaffold",
        "Build menu items using ListTile",
        "Close the Drawer cleanly before navigating",
      ],
    },
    {
      title: "Bottom Navigation Bar",
      xp: 15,
      def:
        "A **BottomNavigationBar** shows a few main tabs at the bottom of the screen, letting users quickly switch between major sections, like Home, Search, and Profile, without ever losing their place.",
      example:
        "Many social and shopping apps show 3-5 icons at the bottom (Home, Search, Cart, Profile). Tapping one instantly swaps the main content, without pushing a whole new screen on the navigation stack.",
      learn: [
        "How to add a BottomNavigationBar to a Scaffold",
        "How to track the selected tab index using setState",
        "How to show different body content based on the selected index",
      ],
      scenario:
        "Think of it like this: a BottomNavigationBar is like the buttons on a TV remote for switching channels — pressing a different button instantly shows different content, without needing to 'go back' first.",
      visual: {
        kind: "table",
        title: "Bottom nav building blocks",
        columns: ["Piece", "Purpose"],
        rows: [
          ["currentIndex", "Which tab is currently selected"],
          ["onTap", "Called with the tapped tab's index"],
          ["items list of screens", "The body content shown for each tab"],
        ],
      },
      code: {
        label: "A 3-tab bottom navigation",
        content: `import 'package:flutter/material.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int selectedIndex = 0;

  final List<Widget> screens = const [
    Center(child: Text("Home")),
    Center(child: Text("Search")),
    Center(child: Text("Profile")),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: screens[selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: selectedIndex,
        onTap: (index) {
          setState(() {
            selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: "Search"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }
}`,
      },
      tip: "Keep the number of bottom navigation tabs between 3 and 5 — too many tabs become cramped and hard to tap accurately.",
      warning: "Do not forget that the items list and the screens list must stay the same length and order — a mismatch means tapping a tab shows the wrong content.",
      practice: {
        level1: "Add a 4th tab called 'Settings' with its own screen.",
        level2: "Change the icon used for the Profile tab.",
        level3: "Describe, in words, how you would highlight the selected tab's label in a different color.",
      },
      summary:
        "BottomNavigationBar lets users quickly switch between a few main app sections by tapping tabs, tracked with a selected index.",
      next: "Next chapter, you will learn how to manage changing data properly using state management techniques.",
      quiz: {
        q: "What does the 'currentIndex' property of a BottomNavigationBar control?",
        options: [
          "Which tab is currently shown as selected",
          "The app's internet connection",
          "The number of pixels on screen",
          "The app's theme color",
        ],
        answer: 0,
        explain: "currentIndex tells the BottomNavigationBar (and your body logic) which tab is active.",
      },
      quiz2: {
        q: "Why must the list of screens and the list of BottomNavigationBarItems stay in matching order?",
        options: [
          "So tapping a specific tab index shows the correct matching screen",
          "Order never matters for BottomNavigationBar",
          "Because Dart requires alphabetical order for lists",
          "Only the first item in each list is ever used",
        ],
        answer: 0,
        explain: "Since both lists are indexed by the same selectedIndex, their order must line up correctly.",
      },
      challenge: {
        title: "Two-tab navigation",
        desc: "Build a StatefulWidget with a selectedIndex, two screens, and a BottomNavigationBar that switches between them.",
        starter: `import 'package:flutter/material.dart';

class TwoTabScreen extends StatefulWidget {
  const TwoTabScreen({super.key});

  @override
  State<TwoTabScreen> createState() => _TwoTabScreenState();
}

class _TwoTabScreenState extends State<TwoTabScreen> {
  int selectedIndex = 0;
  final List<Widget> screens = const [
    Center(child: Text("Home")),
    Center(child: Text("Profile")),
  ];

  @override
  Widget build(BuildContext context) {
    // return a Scaffold with body and bottomNavigationBar
  }
}`,
        solution: `import 'package:flutter/material.dart';

class TwoTabScreen extends StatefulWidget {
  const TwoTabScreen({super.key});

  @override
  State<TwoTabScreen> createState() => _TwoTabScreenState();
}

class _TwoTabScreenState extends State<TwoTabScreen> {
  int selectedIndex = 0;
  final List<Widget> screens = const [
    Center(child: Text("Home")),
    Center(child: Text("Profile")),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: screens[selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: selectedIndex,
        onTap: (index) {
          setState(() {
            selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }
}`,
        keywords: [
          { label: "Uses BottomNavigationBar", hint: "BottomNavigationBar(", pattern: "BottomNavigationBar\\s*\\(" },
          { label: "Uses setState", hint: "setState(...)", pattern: "setState\\s*\\(" },
          { label: "Tracks selectedIndex", hint: "selectedIndex", pattern: "selectedIndex" },
        ],
      },
      outcomes: [
        "Add a BottomNavigationBar to a Scaffold",
        "Track the selected tab using setState",
        "Show different content for each selected tab",
      ],
    },
  ],
};
