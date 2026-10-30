// Chapter 10 — State Management

export const CH_STATE = {
  id: "state",
  title: "State Management",
  icon: "refresh-cw",
  color: "#00838f",
  lessons: [
    {
      title: "setState Basics Revisited",
      xp: 10,
      def:
        "**State** is any data that can change while your app runs, like a counter, a toggle, or a list of items. **setState()** is the simplest way to tell Flutter 'this data changed, please redraw'.",
      example:
        "A simple quiz app tracks the current question number as state. Every time the user answers, setState() updates that number and the screen rebuilds to show the next question.",
      learn: [
        "A quick recap of what state means and why setState() is used",
        "Why state should live in a StatefulWidget, not a StatelessWidget",
        "The limits of setState() as an app grows bigger",
      ],
      scenario:
        "Think of it like this: setState() is like ringing a small bell that tells Flutter 'something changed here, please check and redraw this part of the screen'. It works great for small, local changes.",
      visual: {
        kind: "table",
        title: "setState recap",
        columns: ["Step", "What happens"],
        rows: [
          ["1. Change data", "Update a variable, like count = count + 1"],
          ["2. Wrap in setState()", "Tells Flutter the data changed"],
          ["3. Flutter rebuilds", "The build() method runs again with new values"],
        ],
      },
      code: {
        label: "A quiz question counter",
        content: `import 'package:flutter/material.dart';

class QuizCounter extends StatefulWidget {
  const QuizCounter({super.key});

  @override
  State<QuizCounter> createState() => _QuizCounterState();
}

class _QuizCounterState extends State<QuizCounter> {
  int questionNumber = 1;

  void nextQuestion() {
    setState(() {
      questionNumber = questionNumber + 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("Question " + questionNumber.toString()),
        ElevatedButton(onPressed: nextQuestion, child: const Text("Next")),
      ],
    );
  }
}`,
      },
      tip: "setState() is perfect for state that only matters to one widget and its direct children — it does not need to be shared far across the app.",
      warning: "Do not call setState() after a widget has been removed from the screen (disposed) — this causes a common runtime error. Later Flutter versions warn you about this clearly.",
      practice: {
        level1: "Explain, in your own words, what setState() tells Flutter to do.",
        level2: "Add a 'Previous' button that decreases questionNumber, without going below 1.",
        level3: "Describe a situation where setState() alone would start feeling messy as an app grows (hint: sharing data across far-apart screens).",
      },
      summary:
        "setState() is a simple, direct way to update local widget state, great for small apps and single-widget data.",
      next: "Next, you will learn how 'lifting state up' helps when two sibling widgets need to share the same data.",
      quiz: {
        q: "What is setState() best suited for?",
        options: [
          "Updating state that is local to one widget and its children",
          "Connecting to the internet",
          "Styling the entire app's theme",
          "Deleting a Flutter project",
        ],
        answer: 0,
        explain: "setState() works well for simple, localized state within a single StatefulWidget.",
      },
      quiz2: {
        q: "What commonly causes a 'setState() called after dispose' error?",
        options: [
          "Calling setState() on a widget that has already been removed from the screen",
          "Using too many Text widgets",
          "Forgetting to add a theme",
          "Using a Column instead of a Row",
        ],
        answer: 0,
        explain: "If a widget's state object has been disposed (removed), calling setState() on it causes this common error.",
      },
      challenge: {
        title: "Question navigator",
        desc: "Build a StatefulWidget tracking questionNumber starting at 1, with Next and Previous buttons (Previous should not go below 1).",
        starter: `import 'package:flutter/material.dart';

class QuizNav extends StatefulWidget {
  const QuizNav({super.key});

  @override
  State<QuizNav> createState() => _QuizNavState();
}

class _QuizNavState extends State<QuizNav> {
  int questionNumber = 1;
  // add next() and previous() methods

  @override
  Widget build(BuildContext context) {
    // return a Column with Text and two buttons
  }
}`,
        solution: `import 'package:flutter/material.dart';

class QuizNav extends StatefulWidget {
  const QuizNav({super.key});

  @override
  State<QuizNav> createState() => _QuizNavState();
}

class _QuizNavState extends State<QuizNav> {
  int questionNumber = 1;

  void next() {
    setState(() {
      questionNumber = questionNumber + 1;
    });
  }

  void previous() {
    setState(() {
      if (questionNumber > 1) {
        questionNumber = questionNumber - 1;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(questionNumber.toString()),
        ElevatedButton(onPressed: next, child: const Text("Next")),
        ElevatedButton(onPressed: previous, child: const Text("Previous")),
      ],
    );
  }
}`,
        keywords: [
          { label: "Uses setState", hint: "setState(...)", pattern: "setState\\s*\\(" },
          { label: "Guards against going below 1", hint: "if (questionNumber > 1)", pattern: ">\\s*1" },
          { label: "Has two buttons", hint: "ElevatedButton", pattern: "ElevatedButton" },
        ],
      },
      outcomes: [
        "Recap what state means and how setState() updates it",
        "Explain why state must live in a StatefulWidget",
        "Identify the limits of setState() as apps grow",
      ],
    },
    {
      title: "Lifting State Up",
      xp: 15,
      def:
        "**Lifting state up** means moving shared data to a common parent widget, so that two or more sibling widgets can both read and change the same information through that parent.",
      example:
        "If a 'quantity selector' widget and a 'total price' widget both need to know the current quantity, the quantity should live in their shared parent, which passes it down and updates both when it changes.",
      learn: [
        "Why sibling widgets cannot directly share state with each other",
        "How moving state to a shared parent solves this",
        "How to pass both the value and an update function down to children",
      ],
      scenario:
        "Think of it like this: two kids at a dinner table cannot directly change what is on each other's plates, but their parent (who holds the serving dish) can give more food to either child. The parent 'lifts up' control of the shared resource.",
      visual: {
        kind: "diagram",
        title: "Lifting state up",
        nodes: [
          { label: "Parent widget", items: ["Holds quantity state", "Passes value + updater down"] },
          { label: "QuantitySelector", items: ["Reads quantity", "Calls updater to change it"] },
          { label: "TotalPriceLabel", items: ["Reads quantity", "Shows price * quantity"] },
        ],
      },
      code: {
        label: "Shared quantity state in a parent",
        content: `import 'package:flutter/material.dart';

class ProductScreen extends StatefulWidget {
  const ProductScreen({super.key});

  @override
  State<ProductScreen> createState() => _ProductScreenState();
}

class _ProductScreenState extends State<ProductScreen> {
  int quantity = 1;

  void increase() {
    setState(() {
      quantity = quantity + 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    int price = 100;
    return Column(
      children: [
        Text("Quantity: " + quantity.toString()),
        ElevatedButton(onPressed: increase, child: const Text("+")),
        Text("Total: " + (price * quantity).toString()),
      ],
    );
  }
}`,
      },
      tip: "If two widgets need the same piece of data, look for their closest shared parent — that is usually the right place for the state to live.",
      warning: "Do not duplicate the same piece of state in two different widgets — if quantity exists in two places separately, they can get out of sync and show different numbers.",
      practice: {
        level1: "Explain, in your own words, why lifting state up solves the sharing problem.",
        level2: "Add a decrease() method that lowers quantity but never below 1.",
        level3: "Split the Text widgets above into two separate child widgets, passing quantity and price down as constructor parameters.",
      },
      summary:
        "Lifting state up moves shared data to a common parent widget, keeping sibling widgets in sync without duplicating state.",
      next: "Next, you will get an introduction to Provider, a popular tool for sharing state across many widgets.",
      quiz: {
        q: "Why would you lift state up to a parent widget?",
        options: [
          "So two sibling widgets can share and stay in sync with the same data",
          "To make the app use less memory automatically",
          "To avoid using any variables at all",
          "Because StatelessWidgets cannot have children",
        ],
        answer: 0,
        explain: "Lifting state up gives siblings a single shared source of truth through their common parent.",
      },
      quiz2: {
        q: "What problem can happen if the same piece of state is duplicated in two separate widgets?",
        options: [
          "The two copies can get out of sync and show different values",
          "The app automatically merges them correctly every time",
          "Nothing bad can happen, duplication is always safe",
          "Dart refuses to compile duplicated variables",
        ],
        answer: 0,
        explain: "Duplicated state copies can diverge, leading to confusing bugs where different parts of the UI disagree.",
      },
      challenge: {
        title: "Shared counter and total",
        desc: "Build a StatefulWidget with a quantity, an increase() method, and a Text showing quantity * price (price = 50).",
        starter: `import 'package:flutter/material.dart';

class QuantityScreen extends StatefulWidget {
  const QuantityScreen({super.key});

  @override
  State<QuantityScreen> createState() => _QuantityScreenState();
}

class _QuantityScreenState extends State<QuantityScreen> {
  int quantity = 1;
  // add increase() method

  @override
  Widget build(BuildContext context) {
    int price = 50;
    // return widgets showing quantity and the total
  }
}`,
        solution: `import 'package:flutter/material.dart';

class QuantityScreen extends StatefulWidget {
  const QuantityScreen({super.key});

  @override
  State<QuantityScreen> createState() => _QuantityScreenState();
}

class _QuantityScreenState extends State<QuantityScreen> {
  int quantity = 1;

  void increase() {
    setState(() {
      quantity = quantity + 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    int price = 50;
    return Column(
      children: [
        Text("Qty: " + quantity.toString()),
        ElevatedButton(onPressed: increase, child: const Text("+")),
        Text("Total: " + (price * quantity).toString()),
      ],
    );
  }
}`,
        keywords: [
          { label: "Uses setState", hint: "setState(...)", pattern: "setState\\s*\\(" },
          { label: "Calculates total", hint: "price * quantity", pattern: "price\\s*\\*\\s*quantity" },
          { label: "Shows quantity", hint: "quantity.toString()", pattern: "quantity" },
        ],
      },
      outcomes: [
        "Explain the idea of lifting state up",
        "Share state between sibling widgets through a common parent",
        "Avoid duplicating the same state in multiple places",
      ],
    },
    {
      title: "Introduction to Provider",
      xp: 15,
      def:
        "**Provider** is a popular package for sharing state across many widgets without manually passing data down through every constructor. You define a class holding your data, and any widget can 'listen' to it and rebuild when it changes.",
      example:
        "A shopping app's cart data is needed on the product list, the cart icon badge, and the checkout screen — all far apart in the widget tree. Provider lets all of them access the same cart data without passing it through every single widget in between.",
      learn: [
        "Why passing state through many constructors (prop drilling) becomes painful",
        "How a ChangeNotifier class holds and announces changes to data",
        "How Provider and Consumer let widgets read and react to that data",
      ],
      scenario:
        "Think of it like this: Provider is like a radio station broadcasting updates. Any widget that 'tunes in' (listens) hears about changes immediately, without needing someone to physically carry the message from room to room.",
      visual: {
        kind: "table",
        title: "Provider vocabulary",
        columns: ["Term", "Meaning"],
        rows: [
          ["ChangeNotifier", "A class that holds data and can notify listeners when it changes"],
          ["ChangeNotifierProvider", "Makes that data available to the widget tree below it"],
          ["Consumer / context.watch", "Lets a widget read the data and rebuild when it changes"],
        ],
      },
      code: {
        label: "A simple counter using Provider",
        content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CounterModel extends ChangeNotifier {
  int count = 0;

  void increase() {
    count = count + 1;
    notifyListeners();
  }
}

class CounterScreen extends StatelessWidget {
  const CounterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final counter = context.watch<CounterModel>();
    return Column(
      children: [
        Text("Count: " + counter.count.toString()),
        ElevatedButton(
          onPressed: () => context.read<CounterModel>().increase(),
          child: const Text("Add"),
        ),
      ],
    );
  }
}`,
      },
      tip: "Use context.read<T>() inside onPressed callbacks (you do not need a rebuild there), and context.watch<T>() inside build() (so the widget rebuilds on changes).",
      warning: "Do not forget to call notifyListeners() after changing data inside a ChangeNotifier — without it, listening widgets will not know to rebuild.",
      practice: {
        level1: "Explain, in your own words, what a ChangeNotifier is for.",
        level2: "Add a decrease() method to CounterModel that lowers count but not below 0.",
        level3: "Describe how you would wrap your whole app in a ChangeNotifierProvider at the top level, in MaterialApp's place.",
      },
      summary:
        "Provider lets many widgets share and react to the same data, avoiding the pain of passing state through every constructor by hand.",
      next: "Next, you will apply this with a shopping cart example that uses shared state across multiple screens.",
      quiz: {
        q: "What does notifyListeners() do inside a ChangeNotifier?",
        options: [
          "Tells all listening widgets that the data changed, so they rebuild",
          "Deletes all the data in the class",
          "Connects the app to the internet",
          "Only works for images",
        ],
        answer: 0,
        explain: "notifyListeners() signals every widget currently watching this ChangeNotifier to rebuild with fresh data.",
      },
      quiz2: {
        q: "When is context.read<T>() typically used instead of context.watch<T>()?",
        options: [
          "Inside callbacks like onPressed, where you do not need the widget to rebuild",
          "Only inside the build() method itself",
          "Never, read() does not exist in Provider",
          "Only for StatelessWidgets, never StatefulWidgets",
        ],
        answer: 0,
        explain: "read() grabs the current value without subscribing to rebuilds, perfect for one-off actions like button taps.",
      },
      challenge: {
        title: "Counter model",
        desc: "Create a CounterModel class extending ChangeNotifier with a count field and an increase() method that calls notifyListeners().",
        starter: `import 'package:flutter/material.dart';

class CounterModel extends ChangeNotifier {
  int count = 0;
  // add increase() that updates count and notifies listeners
}`,
        solution: `import 'package:flutter/material.dart';

class CounterModel extends ChangeNotifier {
  int count = 0;

  void increase() {
    count = count + 1;
    notifyListeners();
  }
}`,
        keywords: [
          { label: "Extends ChangeNotifier", hint: "extends ChangeNotifier", pattern: "extends\\s+ChangeNotifier" },
          { label: "Updates count", hint: "count = count + 1", pattern: "count\\s*=" },
          { label: "Calls notifyListeners", hint: "notifyListeners()", pattern: "notifyListeners\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain why Provider helps avoid passing state through every constructor",
        "Create a ChangeNotifier class with data and notifyListeners()",
        "Use context.watch and context.read appropriately",
      ],
    },
    {
      title: "Shopping Cart Example",
      xp: 20,
      def:
        "This lesson applies Provider to a realistic **shopping cart**: a CartModel holds a list of items, widgets anywhere in the app can add items, and a cart badge icon anywhere else automatically updates its count.",
      example:
        "On a shopping app's product list, tapping 'Add to Cart' on any product should instantly update the cart icon's badge number at the top of the screen, even though those two widgets are far apart in the widget tree.",
      learn: [
        "How to model a shopping cart's items as a list inside a ChangeNotifier",
        "How to add items from one screen and reflect changes on another",
        "How to show a live item count badge using the shared cart state",
      ],
      scenario:
        "Think of it like this: the cart model is like a shared shopping basket sitting at the store's front desk. Any aisle (screen) can add items to it, and the front desk display (cart badge) always shows the current count, no matter which aisle added the last item.",
      visual: {
        kind: "diagram",
        title: "Shared cart state",
        nodes: [
          { label: "CartModel", items: ["List<String> items", "addItem(), notifyListeners()"] },
          { label: "ProductListScreen", items: ["Calls addItem() on tap"] },
          { label: "CartBadge", items: ["Watches cart, shows items.length"] },
        ],
      },
      code: {
        label: "A simple CartModel and badge",
        content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CartModel extends ChangeNotifier {
  List<String> items = [];

  void addItem(String name) {
    items.add(name);
    notifyListeners();
  }
}

class CartBadge extends StatelessWidget {
  const CartBadge({super.key});

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartModel>();
    return Stack(
      children: [
        const Icon(Icons.shopping_cart),
        if (cart.items.isNotEmpty)
          Positioned(
            right: 0,
            child: CircleAvatar(
              radius: 8,
              backgroundColor: Colors.red,
              child: Text(cart.items.length.toString(), style: const TextStyle(fontSize: 10)),
            ),
          ),
      ],
    );
  }
}`,
      },
      tip: "Keep the cart logic (adding, removing, totaling) inside the CartModel itself, not scattered across screens — it keeps your code organized and easy to test.",
      warning: "Do not forget to wrap your app with ChangeNotifierProvider<CartModel> near the top of the widget tree, or screens below will not be able to find and watch it.",
      practice: {
        level1: "Add a removeItem(String name) method to CartModel.",
        level2: "Add a total item count getter that returns items.length.",
        level3: "Describe how you would extend CartModel to also track each item's price and show a running total cost.",
      },
      summary:
        "A shared CartModel using Provider lets many screens add to and display cart data consistently, without manually passing it around.",
      next: "Next, you will build a similar favorites example, reinforcing shared state across a whole app.",
      quiz: {
        q: "Why is it useful to keep cart logic inside the CartModel class rather than inside each screen?",
        options: [
          "It keeps the logic organized in one place and reusable from any screen",
          "Screens cannot call functions at all",
          "It makes the app automatically faster at drawing pixels",
          "There is no real benefit to this approach",
        ],
        answer: 0,
        explain: "Centralizing logic in the model keeps your code DRY (not repeated) and easier to maintain.",
      },
      quiz2: {
        q: "What must you do near the top of your widget tree for screens to access a CartModel via Provider?",
        options: [
          "Wrap the app in a ChangeNotifierProvider<CartModel>",
          "Nothing, Provider works automatically with no setup",
          "Add CartModel to pubspec.yaml",
          "Only use CartModel inside main()",
        ],
        answer: 0,
        explain: "A ChangeNotifierProvider must wrap the part of the tree that needs access to the model.",
      },
      challenge: {
        title: "Cart model with remove",
        desc: "Extend a CartModel class with addItem and removeItem methods, both calling notifyListeners().",
        starter: `import 'package:flutter/material.dart';

class CartModel extends ChangeNotifier {
  List<String> items = [];
  // add addItem(name) and removeItem(name) methods
}`,
        solution: `import 'package:flutter/material.dart';

class CartModel extends ChangeNotifier {
  List<String> items = [];

  void addItem(String name) {
    items.add(name);
    notifyListeners();
  }

  void removeItem(String name) {
    items.remove(name);
    notifyListeners();
  }
}`,
        keywords: [
          { label: "Has addItem", hint: "addItem(", pattern: "addItem\\s*\\(" },
          { label: "Has removeItem", hint: "removeItem(", pattern: "removeItem\\s*\\(" },
          { label: "Calls notifyListeners", hint: "notifyListeners()", pattern: "notifyListeners\\s*\\(" },
        ],
      },
      outcomes: [
        "Model a shopping cart's items using a ChangeNotifier",
        "Add items from one screen and reflect changes on another",
        "Show a live item count using shared state",
      ],
    },
    {
      title: "Favorites Example",
      xp: 15,
      def:
        "This lesson builds a **favorites** feature: a FavoritesModel tracks which items a user has 'liked', and any screen can toggle or display favorite status consistently using the same shared state.",
      example:
        "In a course catalog like PolyCode, a student might tap a heart icon on a course card to favorite it. That favorite status should show correctly everywhere that course appears — in search results, in a 'My Favorites' list, and on its detail page.",
      learn: [
        "How to track a Set of favorite ids inside a ChangeNotifier",
        "How to toggle favorite status and notify listeners",
        "How to check 'is this favorited?' from any widget",
      ],
      scenario:
        "Think of it like this: a Set of favorite ids is like a VIP guest list at an event. Any staff member (any screen) can check the same list to see if someone is on it, or add/remove a name, and everyone sees the same up-to-date list.",
      visual: {
        kind: "table",
        title: "Favorites model pieces",
        columns: ["Piece", "Purpose"],
        rows: [
          ["Set<String> favoriteIds", "Stores which item ids are favorited (no duplicates)"],
          ["toggleFavorite(id)", "Adds or removes an id from the set"],
          ["isFavorite(id)", "Checks whether an id is currently in the set"],
        ],
      },
      code: {
        label: "A FavoritesModel with toggle logic",
        content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class FavoritesModel extends ChangeNotifier {
  Set<String> favoriteIds = {};

  void toggleFavorite(String id) {
    if (favoriteIds.contains(id)) {
      favoriteIds.remove(id);
    } else {
      favoriteIds.add(id);
    }
    notifyListeners();
  }

  bool isFavorite(String id) {
    return favoriteIds.contains(id);
  }
}

class CourseCard extends StatelessWidget {
  final String courseId;
  const CourseCard({super.key, required this.courseId});

  @override
  Widget build(BuildContext context) {
    final favorites = context.watch<FavoritesModel>();
    bool liked = favorites.isFavorite(courseId);

    return IconButton(
      icon: Icon(liked ? Icons.favorite : Icons.favorite_border),
      onPressed: () => context.read<FavoritesModel>().toggleFavorite(courseId),
    );
  }
}`,
      },
      tip: "A Set is a great fit for favorites, because it automatically avoids duplicate entries for the same id.",
      warning: "Do not use a plain List for favorite ids if you also need fast 'is this favorited?' checks on long lists — a Set makes that check much simpler and avoids duplicates.",
      practice: {
        level1: "Explain, in your own words, why a Set fits favorites better than a List here.",
        level2: "Add a favoriteCount getter that returns favoriteIds.length.",
        level3: "Describe how you would build a 'My Favorites' screen that lists only the favorited course ids.",
      },
      summary:
        "A FavoritesModel using a Set and ChangeNotifier lets any screen toggle and check favorite status consistently across the whole app.",
      next: "Next chapter, you will learn how to work with real data models and build dynamic lists from them.",
      quiz: {
        q: "Why is a Set a good choice for storing favorite ids?",
        options: [
          "It automatically avoids duplicate entries for the same id",
          "A Set can only ever hold one value total",
          "Sets are always slower than Lists for every operation",
          "Sets cannot be used with ChangeNotifier",
        ],
        answer: 0,
        explain: "Sets store unique values, which naturally fits a 'favorited or not' use case with no duplicates.",
      },
      quiz2: {
        q: "A course card checks favorites.isFavorite(courseId) to decide which heart icon to show. Why does this work correctly on every screen?",
        options: [
          "Because every screen shares and watches the same FavoritesModel instance",
          "Because each screen has its own separate, disconnected copy of favorites",
          "Because isFavorite() always returns true",
          "Because Icon widgets automatically know about favorites",
        ],
        answer: 0,
        explain: "Provider ensures all watching widgets read from the same shared model, keeping favorite status consistent everywhere.",
      },
      challenge: {
        title: "Toggle favorite logic",
        desc: "Write a toggleFavorite(Set<String> favorites, String id) function that adds the id if missing, or removes it if present.",
        starter: `void toggleFavorite(Set<String> favorites, String id) {
  // add id if missing, remove if present
}`,
        solution: `void toggleFavorite(Set<String> favorites, String id) {
  if (favorites.contains(id)) {
    favorites.remove(id);
  } else {
    favorites.add(id);
  }
}`,
        keywords: [
          { label: "Checks contains", hint: "favorites.contains(id)", pattern: "\\.contains\\s*\\(" },
          { label: "Removes id", hint: ".remove(id)", pattern: "\\.remove\\s*\\(" },
          { label: "Adds id", hint: ".add(id)", pattern: "\\.add\\s*\\(" },
        ],
      },
      outcomes: [
        "Track favorite status using a Set inside a ChangeNotifier",
        "Toggle and check favorite status from any widget",
        "Explain why a Set fits a favorites feature well",
      ],
    },
  ],
};
