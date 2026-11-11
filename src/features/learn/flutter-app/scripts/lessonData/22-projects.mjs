// Chapter 22 — Progressive Projects

export const CH_PROJECTS = {
  id: "projects",
  title: "Progressive Projects",
  icon: "trophy",
  color: "#f57f17",
  lessons: [
    {
      title: "Project: Profile Card",
      xp: 15,
      def:
        "This project builds a simple **Profile Card**: an Image or Icon, a name, a short bio, and a styled Container — combining widgets from the early UI chapters into one polished, reusable component.",
      example:
        "A profile card like this could appear at the top of a settings screen, showing the logged-in user's avatar, name, and a short line like 'Flutter learner since 2024'.",
      learn: [
        "How to combine Container, Column, Row, Icon, and Text into one card",
        "How to add simple styling: padding, rounded corners, a subtle shadow",
        "How to make the card reusable by accepting name and bio as parameters",
      ],
      scenario:
        "Think of it like this: a profile card is like a neatly designed business card — a small, self-contained piece of information, styled consistently, that you can hand out (reuse) anywhere it is needed.",
      visual: {
        kind: "diagram",
        title: "Profile card pieces",
        nodes: [
          { label: "Container", items: ["Padding, rounded corners"] },
          { label: "Row", items: ["Icon/avatar + Column"] },
          { label: "Column", items: ["Name Text + bio Text"] },
        ],
      },
      code: {
        label: "A reusable ProfileCard widget",
        content: `import 'package:flutter/material.dart';

class ProfileCard extends StatelessWidget {
  final String name;
  final String bio;
  const ProfileCard({super.key, required this.name, required this.bio});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 6)],
      ),
      child: Row(
        children: [
          const CircleAvatar(radius: 28, child: Icon(Icons.person)),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
              Text(bio),
            ],
          ),
        ],
      ),
    );
  }
}`,
      },
      tip: "Keep the card itself 'dumb' (just displaying whatever name/bio it is given) — let the screen that uses it decide what actual data to pass in.",
      warning: "Do not hardcode a specific user's name and bio inside the ProfileCard widget itself — accepting them as constructor parameters keeps it reusable for any user.",
      practice: {
        level1: "Create a ProfileCard with your own name and a short bio.",
        level2: "Add an optional avatarUrl parameter and show it with Image.network if provided.",
        level3: "Reuse the same ProfileCard widget twice on one screen with two different people's data.",
      },
      summary:
        "You combined earlier UI widgets into one reusable, parameterized ProfileCard component.",
      next: "Next, you will build a Marks Calculator project, practicing input, logic, and output together.",
      quiz: {
        q: "Why should ProfileCard accept name and bio as constructor parameters instead of hardcoding them?",
        options: [
          "It keeps the widget reusable for different users and screens",
          "Constructor parameters are required by Dart for every widget",
          "Hardcoding values always performs better",
          "There is no real benefit to this approach",
        ],
        answer: 0,
        explain: "Accepting data as parameters makes a widget flexible and reusable across different contexts.",
      },
      quiz2: {
        q: "What combination of widgets is commonly used to build a card like this?",
        options: [
          "Container, Row, Column, and Text/Icon together",
          "Only a single Text widget",
          "Only a Scaffold with no children",
          "A BottomNavigationBar alone",
        ],
        answer: 0,
        explain: "Cards typically combine a styled Container with Row/Column layouts and Text/Icon content.",
      },
      challenge: {
        title: "Build a ProfileCard",
        desc: "Build a ProfileCard StatelessWidget taking name and bio parameters, displaying them inside a styled Container.",
        starter: `import 'package:flutter/material.dart';

class ProfileCard extends StatelessWidget {
  final String name;
  final String bio;
  const ProfileCard({super.key, required this.name, required this.bio});

  @override
  Widget build(BuildContext context) {
    // return a Container with name and bio shown
  }
}`,
        solution: `import 'package:flutter/material.dart';

class ProfileCard extends StatelessWidget {
  final String name;
  final String bio;
  const ProfileCard({super.key, required this.name, required this.bio});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Text(name),
          Text(bio),
        ],
      ),
    );
  }
}`,
        keywords: [
          { label: "Takes name parameter", hint: "required this.name", pattern: "this\\.name" },
          { label: "Takes bio parameter", hint: "required this.bio", pattern: "this\\.bio" },
          { label: "Uses Container", hint: "Container(...)", pattern: "Container\\s*\\(" },
        ],
      },
      outcomes: [
        "Combine Container, Row, Column, and Text into a card",
        "Add simple styling: padding, rounded corners, shadow",
        "Make a widget reusable via constructor parameters",
      ],
    },
    {
      title: "Project: Marks Calculator",
      xp: 15,
      def:
        "This project builds a **Marks Calculator**: the user enters marks for a few subjects, and the app calculates and displays the total and average using simple Dart logic connected to a Flutter form.",
      example:
        "A student types in marks for Math, Science, and English, taps 'Calculate', and instantly sees their total marks and average percentage displayed on screen.",
      learn: [
        "How to read multiple TextField values using separate controllers",
        "How to convert text input into numbers using double.parse or double.tryParse",
        "How to calculate and display a total and average",
      ],
      scenario:
        "Think of it like this: this project is like a small calculator app built specifically for one job — adding up marks and dividing by the number of subjects — combining input, logic, and output in one place.",
      visual: {
        kind: "table",
        title: "Marks calculator steps",
        columns: ["Step", "What happens"],
        rows: [
          ["1. Collect input", "Three TextFields with controllers"],
          ["2. Parse and calculate", "Convert text to numbers, sum, divide"],
          ["3. Display result", "Show total and average using setState"],
        ],
      },
      code: {
        label: "A simple marks calculator",
        content: `import 'package:flutter/material.dart';

class MarksCalculator extends StatefulWidget {
  const MarksCalculator({super.key});

  @override
  State<MarksCalculator> createState() => _MarksCalculatorState();
}

class _MarksCalculatorState extends State<MarksCalculator> {
  final mathController = TextEditingController();
  final scienceController = TextEditingController();
  final englishController = TextEditingController();
  double total = 0;
  double average = 0;

  void calculate() {
    double math = double.tryParse(mathController.text) ?? 0;
    double science = double.tryParse(scienceController.text) ?? 0;
    double english = double.tryParse(englishController.text) ?? 0;

    setState(() {
      total = math + science + english;
      average = total / 3;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(controller: mathController, decoration: const InputDecoration(labelText: "Math")),
        TextField(controller: scienceController, decoration: const InputDecoration(labelText: "Science")),
        TextField(controller: englishController, decoration: const InputDecoration(labelText: "English")),
        ElevatedButton(onPressed: calculate, child: const Text("Calculate")),
        Text("Total: " + total.toString()),
        Text("Average: " + average.toString()),
      ],
    );
  }
}`,
      },
      tip: "Use double.tryParse() instead of double.parse() for user input — tryParse() returns null instead of crashing if the user types something invalid.",
      warning: "Do not forget to add keyboardType: TextInputType.number to each TextField in a real app, so the on-screen keyboard shows number keys by default.",
      practice: {
        level1: "Add a fourth subject (like 'Art') to the calculator.",
        level2: "Round the average to 2 decimal places when displaying it.",
        level3: "Add a letter grade (A/B/C) shown below the average, based on simple thresholds.",
      },
      summary:
        "You built a small but complete calculator combining multiple TextFields, number parsing, and calculated output.",
      next: "Next, you will build a To-Do app project, practicing lists and simple state management together.",
      quiz: {
        q: "Why use double.tryParse() instead of double.parse() for reading user input?",
        options: [
          "tryParse() returns null instead of crashing on invalid input",
          "tryParse() is only used for integers, never doubles",
          "parse() always works correctly with any text",
          "There is no real difference between them",
        ],
        answer: 0,
        explain: "tryParse() safely handles invalid input by returning null, avoiding a crash that parse() would cause.",
      },
      quiz2: {
        q: "Why calculate the total and average inside a function triggered by a button, rather than directly in build()?",
        options: [
          "It keeps the calculation tied to a clear user action, updated via setState when needed",
          "build() cannot contain any variables at all",
          "Calculations are not allowed inside functions",
          "There is no real reason, it does not matter",
        ],
        answer: 0,
        explain: "Triggering calculation from a button keeps logic predictable and avoids recalculating unnecessarily on every rebuild.",
      },
      challenge: {
        title: "Calculate total and average",
        desc: "Write a function calculate(List<double> marks) that returns a Map with 'total' and 'average' keys.",
        starter: `Map<String, double> calculate(List<double> marks) {
  // calculate total and average, return as a Map
}`,
        solution: `Map<String, double> calculate(List<double> marks) {
  double total = 0;
  for (var m in marks) {
    total += m;
  }
  double average = total / marks.length;
  return {"total": total, "average": average};
}`,
        keywords: [
          { label: "Loops through marks", hint: "for (var m in marks)", pattern: "for\\s*\\(" },
          { label: "Calculates average", hint: "total / marks.length", pattern: "/\\s*marks\\.length" },
          { label: "Returns a Map", hint: "Map<String, double>", pattern: "Map<String,\\s*double>" },
        ],
      },
      outcomes: [
        "Read multiple TextField values using controllers",
        "Convert text input into numbers safely",
        "Calculate and display a total and average",
      ],
    },
    {
      title: "Project: To-Do App",
      xp: 20,
      def:
        "This project builds a classic **To-Do app**: adding new tasks, marking them as done with a checkbox, and removing tasks — combining models, lists, forms, and state management from earlier chapters.",
      example:
        "A user types 'Buy groceries' into a text box, taps 'Add', sees it appear in a list, checks it off once done, and can swipe or tap to delete it — all standard to-do app behavior.",
      learn: [
        "How to model a Task with a title and a done flag",
        "How to add new tasks from a TextField into a List<Task>",
        "How to toggle done status and remove tasks using setState",
      ],
      scenario:
        "Think of it like this: a to-do app is like a sticky-note board. Adding a task is sticking on a new note. Checking it off is crossing it out. Removing it is pulling the note off the board entirely.",
      visual: {
        kind: "diagram",
        title: "To-Do app pieces",
        nodes: [
          { label: "Task model", items: ["title, done fields"] },
          { label: "Add input", items: ["TextField + Add button"] },
          { label: "Task list", items: ["Checkbox + delete icon per task"] },
        ],
      },
      code: {
        label: "A complete To-Do app",
        content: `import 'package:flutter/material.dart';

class Task {
  String title;
  bool done;
  Task(this.title, {this.done = false});
}

class TodoApp extends StatefulWidget {
  const TodoApp({super.key});

  @override
  State<TodoApp> createState() => _TodoAppState();
}

class _TodoAppState extends State<TodoApp> {
  final List<Task> tasks = [];
  final controller = TextEditingController();

  void addTask() {
    if (controller.text.trim().isEmpty) return;
    setState(() {
      tasks.add(Task(controller.text));
      controller.clear();
    });
  }

  void toggleDone(int index) {
    setState(() {
      tasks[index].done = !tasks[index].done;
    });
  }

  void removeTask(int index) {
    setState(() {
      tasks.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(child: TextField(controller: controller)),
            ElevatedButton(onPressed: addTask, child: const Text("Add")),
          ],
        ),
        Expanded(
          child: ListView.builder(
            itemCount: tasks.length,
            itemBuilder: (context, index) {
              final task = tasks[index];
              return ListTile(
                leading: Checkbox(value: task.done, onChanged: (_) => toggleDone(index)),
                title: Text(task.title),
                trailing: IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () => removeTask(index),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}`,
      },
      tip: "Keep the Task model simple (title and done) at first — you can always add fields like a due date or priority later once the basics work well.",
      warning: "Do not forget to call setState() around removeAt() and the done toggle — without it, the list will change in memory but the screen will not visually update.",
      practice: {
        level1: "Add a counter showing how many tasks remain undone.",
        level2: "Add a 'Clear completed' button that removes all tasks where done is true.",
        level3: "Add a priority field to Task and sort the list so high-priority tasks show first.",
      },
      summary:
        "You built a complete to-do app, combining a Task model, a growing list, and setState-driven add/toggle/remove actions.",
      next: "Next, you will build an Expense Tracker project, working with running totals and categorized data.",
      quiz: {
        q: "Why does toggleDone() need to call setState()?",
        options: [
          "So Flutter knows to rebuild the UI and show the updated checkbox state",
          "setState() is only needed when adding new tasks, never toggling",
          "Toggling a bool never requires setState()",
          "It has no visible effect either way",
        ],
        answer: 0,
        explain: "Any change that should be reflected visually, including toggling a checkbox state, needs setState().",
      },
      quiz2: {
        q: "Why check controller.text.trim().isEmpty before adding a new task?",
        options: [
          "To avoid adding blank, meaningless tasks to the list",
          "trim() always clears the whole task list",
          "isEmpty only applies to numbers",
          "There is no reason to check this",
        ],
        answer: 0,
        explain: "This simple check prevents users from accidentally adding empty tasks.",
      },
      challenge: {
        title: "Toggle and remove logic",
        desc: "Write toggleDone(List<Task> tasks, int index) and removeTask(List<Task> tasks, int index) functions.",
        starter: `class Task {
  String title;
  bool done;
  Task(this.title, {this.done = false});
}

void toggleDone(List<Task> tasks, int index) {
  // flip the done value at index
}

void removeTask(List<Task> tasks, int index) {
  // remove the task at index
}`,
        solution: `class Task {
  String title;
  bool done;
  Task(this.title, {this.done = false});
}

void toggleDone(List<Task> tasks, int index) {
  tasks[index].done = !tasks[index].done;
}

void removeTask(List<Task> tasks, int index) {
  tasks.removeAt(index);
}`,
        keywords: [
          { label: "Toggles done", hint: "!tasks[index].done", pattern: "!\\s*tasks\\[index\\]\\.done" },
          { label: "Uses removeAt", hint: "removeAt(index)", pattern: "removeAt\\s*\\(" },
          { label: "Defines Task", hint: "class Task", pattern: "class\\s+Task" },
        ],
      },
      outcomes: [
        "Model a Task with a title and done flag",
        "Add new tasks from a text input into a list",
        "Toggle and remove tasks using setState",
      ],
    },
    {
      title: "Project: Expense Tracker",
      xp: 20,
      def:
        "This project builds an **Expense Tracker**: adding expenses with an amount and category, showing a running total, and listing all expenses — practicing models, lists, and simple calculations together.",
      example:
        "A user adds 'Groceries - $45' and 'Transport - $12'. The app shows a running total of $57 at the top, and both expenses listed below with their categories.",
      learn: [
        "How to model an Expense with amount and category fields",
        "How to calculate a running total using a loop or fold",
        "How to display both the total and the full list together",
      ],
      scenario:
        "Think of it like this: an expense tracker is like a till receipt that keeps growing as you add items, with a running total at the top that updates every time something new is added.",
      visual: {
        kind: "table",
        title: "Expense tracker pieces",
        columns: ["Piece", "Role"],
        rows: [
          ["Expense model", "amount, category fields"],
          ["Running total", "Sum of all amounts in the list"],
          ["ListView.builder", "Shows every individual expense"],
        ],
      },
      code: {
        label: "A simple expense tracker",
        content: `import 'package:flutter/material.dart';

class Expense {
  double amount;
  String category;
  Expense(this.amount, this.category);
}

class ExpenseTracker extends StatefulWidget {
  const ExpenseTracker({super.key});

  @override
  State<ExpenseTracker> createState() => _ExpenseTrackerState();
}

class _ExpenseTrackerState extends State<ExpenseTracker> {
  final List<Expense> expenses = [];
  final amountController = TextEditingController();
  final categoryController = TextEditingController();

  void addExpense() {
    double amount = double.tryParse(amountController.text) ?? 0;
    if (amount <= 0 || categoryController.text.trim().isEmpty) return;

    setState(() {
      expenses.add(Expense(amount, categoryController.text));
      amountController.clear();
      categoryController.clear();
    });
  }

  double get total => expenses.fold(0, (sum, e) => sum + e.amount);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("Total: " + total.toStringAsFixed(2)),
        TextField(controller: amountController, decoration: const InputDecoration(labelText: "Amount")),
        TextField(controller: categoryController, decoration: const InputDecoration(labelText: "Category")),
        ElevatedButton(onPressed: addExpense, child: const Text("Add")),
        Expanded(
          child: ListView.builder(
            itemCount: expenses.length,
            itemBuilder: (context, index) {
              final e = expenses[index];
              return ListTile(title: Text(e.category), trailing: Text(e.amount.toStringAsFixed(2)));
            },
          ),
        ),
      ],
    );
  }
}`,
      },
      tip: "The .fold() method is a clean way to compute a running total from a list in one line, instead of writing a manual for loop every time.",
      warning: "Do not forget to validate that amount is a positive number before adding an expense — negative or zero amounts usually indicate a user mistake.",
      practice: {
        level1: "Add a date field to Expense (even just a String for now).",
        level2: "Add a 'Clear all' button that empties the expenses list.",
        level3: "Group and show a sub-total per category using a Map<String, double>.",
      },
      summary:
        "You built an expense tracker combining a model, running total calculation with fold(), and a full expense list.",
      next: "Next, you will build a Weather/News style project, practicing networking concepts in a UI.",
      quiz: {
        q: "What does expenses.fold(0, (sum, e) => sum + e.amount) calculate?",
        options: [
          "The running total of all expense amounts in the list",
          "The number of expenses in the list",
          "The highest single expense",
          "Nothing, fold() cannot be used this way",
        ],
        answer: 0,
        explain: "fold() accumulates a value (starting at 0) by adding each expense's amount in turn.",
      },
      quiz2: {
        q: "Why check 'amount <= 0' before adding a new expense?",
        options: [
          "To avoid adding invalid, non-positive expense amounts by mistake",
          "Negative amounts are always valid expenses",
          "This check has no real purpose",
          "Zero amounts should always be allowed with no checks",
        ],
        answer: 0,
        explain: "Validating that the amount is positive helps catch likely input mistakes before adding bad data.",
      },
      challenge: {
        title: "Calculate a running total",
        desc: "Write a function totalExpenses(List<double> amounts) that returns the sum using fold().",
        starter: `double totalExpenses(List<double> amounts) {
  // return the sum of amounts using fold()
}`,
        solution: `double totalExpenses(List<double> amounts) {
  return amounts.fold(0, (sum, a) => sum + a);
}`,
        keywords: [
          { label: "Uses fold", hint: ".fold(...)", pattern: "\\.fold\\s*\\(" },
          { label: "Returns a double", hint: "return ...", pattern: "return" },
          { label: "Takes a List<double>", hint: "List<double>", pattern: "List<double>" },
        ],
      },
      outcomes: [
        "Model an Expense with amount and category",
        "Calculate a running total using fold()",
        "Display both a total and a full list of items",
      ],
    },
    {
      title: "Project: Weather/News Screen",
      xp: 20,
      def:
        "This project builds a **Weather or News screen**: fetching data from an API, showing loading/error/success states, and displaying the result in a clean list — practicing the full networking chapter in one feature.",
      example:
        "A weather screen fetches today's forecast when it opens, shows a spinner while waiting, and then either displays the temperature and condition, or a friendly error message if the request fails.",
      learn: [
        "How to call an API inside initState() and track loading/error/success",
        "How to display fetched data once it is ready",
        "How to show a clear error message if the request fails",
      ],
      scenario:
        "Think of it like this: this project is like checking tomorrow's forecast on the news. You wait a moment while the reporter checks their notes (loading), then they either tell you the forecast clearly (success) or admit the signal cut out (error).",
      visual: {
        kind: "diagram",
        title: "Weather screen flow",
        nodes: [
          { label: "initState()", items: ["Starts fetchWeather()"] },
          { label: "Loading", items: ["Show spinner"] },
          { label: "Success / Error", items: ["Show data or a message"] },
        ],
      },
      code: {
        label: "A weather screen with three states",
        content: `import 'package:flutter/material.dart';

enum LoadState { loading, error, success }

class WeatherScreen extends StatefulWidget {
  const WeatherScreen({super.key});

  @override
  State<WeatherScreen> createState() => _WeatherScreenState();
}

class _WeatherScreenState extends State<WeatherScreen> {
  LoadState state = LoadState.loading;
  String weatherText = "";

  Future<void> fetchWeather() async {
    try {
      await Future.delayed(const Duration(seconds: 1));
      setState(() {
        weatherText = "Sunny, 28°C";
        state = LoadState.success;
      });
    } catch (e) {
      setState(() {
        state = LoadState.error;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    fetchWeather();
  }

  @override
  Widget build(BuildContext context) {
    if (state == LoadState.loading) {
      return const Center(child: CircularProgressIndicator());
    } else if (state == LoadState.error) {
      return const Center(child: Text("Could not load weather."));
    }
    return Center(child: Text(weatherText));
  }
}`,
      },
      tip: "Wrap your real API call in try/catch, just like this example, so unexpected network failures update your error state instead of crashing the app.",
      warning: "Do not call fetchWeather() directly inside build() — since build() can run many times, this would trigger many duplicate requests; initState() is the right place.",
      practice: {
        level1: "Change the delayed weather text to something else and confirm it displays correctly.",
        level2: "Add a Retry button to the error state that calls fetchWeather() again.",
        level3: "Describe how you would replace the mock Future.delayed() with a real http.get() call from the networking chapter.",
      },
      summary:
        "You built a realistic data-driven screen with loading, error, and success states, fetching data once in initState().",
      next: "Next, you will build an Auth App project, applying login, tokens, and protected screens together.",
      quiz: {
        q: "Why is fetchWeather() called inside initState() instead of build()?",
        options: [
          "initState() runs once, avoiding duplicate requests that build() running many times would cause",
          "build() cannot contain any async code at all",
          "initState() is called many times per second",
          "There is no real difference between the two",
        ],
        answer: 0,
        explain: "Calling a one-time fetch from initState() avoids repeating the request every time build() runs.",
      },
      quiz2: {
        q: "What is the purpose of wrapping the fetch logic in try/catch here?",
        options: [
          "To catch unexpected failures and update the state to error instead of crashing",
          "try/catch has no effect on async code",
          "It prevents the UI from ever showing a loading indicator",
          "It is purely decorative and does nothing",
        ],
        answer: 0,
        explain: "try/catch lets the app gracefully handle failures by switching to an error state rather than crashing.",
      },
      challenge: {
        title: "Three-state weather logic",
        desc: "Write a function weatherMessage(LoadState state, String text) returning the right message for loading/error/success.",
        starter: `enum LoadState { loading, error, success }

String weatherMessage(LoadState state, String text) {
  // return a loading message, error message, or the text itself
}`,
        solution: `enum LoadState { loading, error, success }

String weatherMessage(LoadState state, String text) {
  switch (state) {
    case LoadState.loading:
      return "Loading...";
    case LoadState.error:
      return "Could not load weather.";
    case LoadState.success:
      return text;
  }
}`,
        keywords: [
          { label: "Uses switch", hint: "switch (...)", pattern: "switch\\s*\\(" },
          { label: "Handles loading", hint: "LoadState.loading", pattern: "LoadState\\.loading" },
          { label: "Handles success", hint: "LoadState.success", pattern: "LoadState\\.success" },
        ],
      },
      outcomes: [
        "Fetch data once using initState()",
        "Track and display loading, error, and success states",
        "Wrap network calls safely in try/catch",
      ],
    },
    {
      title: "Project: Auth App",
      xp: 20,
      def:
        "This project builds a small **Auth App**: a login screen, a protected home screen, and a logout button — applying the authentication chapter's ideas (tokens, protected screens, logout) in one flow.",
      example:
        "A user opens the app, sees a login screen, enters credentials, taps 'Log in', and is taken to a protected home screen that shows 'Welcome!' and a logout button to return to login.",
      learn: [
        "How to structure a simple login screen with a form",
        "How to simulate saving a token and navigating to a protected screen",
        "How to implement a logout button that clears the token and returns to login",
      ],
      scenario:
        "Think of it like this: this project is a small, complete version of the 'members-only room' idea from the authentication chapter — a front desk (login), a members room (home), and an exit door (logout) all connected together.",
      visual: {
        kind: "diagram",
        title: "Auth app flow",
        nodes: [
          { label: "LoginScreen", items: ["Collects email/password", "Simulates saving a token"] },
          { label: "HomeScreen", items: ["Protected content", "Logout button"] },
        ],
      },
      code: {
        label: "A simplified login + home flow",
        content: `import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  void login(BuildContext context) {
    // In a real app: call the server, save a real token securely.
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const HomeScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () => login(context),
          child: const Text("Log In"),
        ),
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  void logout(BuildContext context) {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const LoginScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Home"), actions: [
        IconButton(onPressed: () => logout(context), icon: const Icon(Icons.logout)),
      ]),
      body: const Center(child: Text("Welcome!")),
    );
  }
}`,
      },
      tip: "pushReplacement is a good fit here — it swaps the current screen instead of stacking a new one, so the user cannot accidentally go 'back' into a logged-out or logged-in state incorrectly.",
      warning: "Do not forget that this is a simplified example — a real app should save and check an actual token (ideally with secure storage), not just navigate directly on every login tap.",
      practice: {
        level1: "Add a simple email/password form to LoginScreen using what you learned in the forms chapter.",
        level2: "Add a loading state to login() that simulates a short network delay before navigating.",
        level3: "Describe how you would connect this flow to the real login() and secure token storage from earlier chapters.",
      },
      summary:
        "You built a simplified but complete login-to-home-to-logout flow, tying together navigation and authentication concepts.",
      next: "Next, you will build a File Share concept project, applying device feature ideas.",
      quiz: {
        q: "Why use Navigator.pushReplacement() instead of a normal push() when logging in or out?",
        options: [
          "It swaps the current screen instead of stacking a new one on top",
          "pushReplacement() cannot be used with Scaffold",
          "It permanently closes the entire app",
          "There is no real difference compared to push()",
        ],
        answer: 0,
        explain: "pushReplacement replaces the current route, which fits transitions like login/logout well, avoiding odd back-navigation.",
      },
      quiz2: {
        q: "Why is this example described as 'simplified' compared to a real production login flow?",
        options: [
          "It skips real server calls and secure token storage, navigating directly instead",
          "It is actually fully production-ready as written",
          "Simplified examples are never useful for learning",
          "There is no meaningful difference from a real app",
        ],
        answer: 0,
        explain: "The example focuses on navigation structure, while a real app also needs real authentication and secure storage.",
      },
      challenge: {
        title: "Decide the next screen",
        desc: "Write a function nextScreenAfterLogin(bool success) that returns 'Home' if success is true, 'Login' otherwise.",
        starter: `String nextScreenAfterLogin(bool success) {
  // return "Home" if success, otherwise "Login"
}`,
        solution: `String nextScreenAfterLogin(bool success) {
  if (success) {
    return "Home";
  }
  return "Login";
}`,
        keywords: [
          { label: "Checks success", hint: "if (success)", pattern: "success" },
          { label: "Returns Home", hint: "\"Home\"", pattern: "Home" },
          { label: "Returns Login", hint: "\"Login\"", pattern: "Login" },
        ],
      },
      outcomes: [
        "Structure a simple login screen with a form",
        "Navigate to a protected home screen after login",
        "Implement a logout button returning to login",
      ],
    },
    {
      title: "Project: File Share Concept",
      xp: 15,
      def:
        "This project builds a small **File Share concept screen**: picking a file/image, showing a preview, and simulating an upload with a progress state — applying the device features chapter's ideas.",
      example:
        "A user taps 'Choose file', picks an image from their gallery, sees a preview thumbnail, taps 'Upload', and watches a progress indicator until the (simulated) upload finishes.",
      learn: [
        "How to combine image picking with a preview display",
        "How to simulate an upload process with a loading state",
        "How to show a clear success message once the (simulated) upload completes",
      ],
      scenario:
        "Think of it like this: this project is like dropping a letter into a post box. You pick what to send (pick file), see it in your hand one last time (preview), hand it over (upload), and get a receipt once it's accepted (success message).",
      visual: {
        kind: "diagram",
        title: "File share flow",
        nodes: [
          { label: "Pick file", items: ["ImagePicker from gallery"] },
          { label: "Preview", items: ["Show the chosen file"] },
          { label: "Upload", items: ["Loading, then success message"] },
        ],
      },
      code: {
        label: "A simplified file share screen",
        content: `import 'package:flutter/material.dart';

enum UploadState { idle, uploading, done }

class FileShareScreen extends StatefulWidget {
  const FileShareScreen({super.key});

  @override
  State<FileShareScreen> createState() => _FileShareScreenState();
}

class _FileShareScreenState extends State<FileShareScreen> {
  String? fileName;
  UploadState state = UploadState.idle;

  void pickFile() {
    setState(() {
      fileName = "photo.jpg"; // In a real app: result from ImagePicker
    });
  }

  Future<void> upload() async {
    if (fileName == null) return;
    setState(() => state = UploadState.uploading);
    await Future.delayed(const Duration(seconds: 2));
    setState(() => state = UploadState.done);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(onPressed: pickFile, child: const Text("Choose file")),
        if (fileName != null) Text("Selected: " + fileName!),
        ElevatedButton(onPressed: upload, child: const Text("Upload")),
        if (state == UploadState.uploading) const CircularProgressIndicator(),
        if (state == UploadState.done) const Text("Upload complete!"),
      ],
    );
  }
}`,
      },
      tip: "Use a simple enum like UploadState (idle/uploading/done) to track upload progress clearly, the same pattern you used for loading/error/success earlier.",
      warning: "Do not let the Upload button do anything if no file has been picked yet — always guard with a check like 'if (fileName == null) return;'.",
      practice: {
        level1: "Change the simulated delay to 3 seconds and observe the effect.",
        level2: "Add a 'Remove file' button that resets fileName back to null.",
        level3: "Describe how you would connect this to the real image_picker and multipart upload code from earlier chapters.",
      },
      summary:
        "You built a simplified file-sharing flow with pick, preview, and simulated upload states, reusing patterns from earlier chapters.",
      next: "Next, you will build a Chat UI project, reinforcing the real-time chapter's ideas.",
      quiz: {
        q: "Why guard the upload() function with 'if (fileName == null) return;'?",
        options: [
          "To prevent trying to upload when no file has actually been picked yet",
          "This check has no effect on the app's behavior",
          "fileName is never null in this example",
          "It is required by Dart for every function",
        ],
        answer: 0,
        explain: "This guard avoids attempting an upload action with nothing selected, preventing confusing behavior.",
      },
      quiz2: {
        q: "Why use an enum like UploadState instead of just a plain bool for tracking upload progress?",
        options: [
          "An enum can represent more than two states clearly, like idle, uploading, and done",
          "Enums are required for every Flutter app",
          "A bool can represent unlimited states just as well",
          "There is no benefit to using an enum here",
        ],
        answer: 0,
        explain: "An enum clearly models multiple distinct states, which a simple true/false bool cannot represent as clearly.",
      },
      challenge: {
        title: "Upload state message",
        desc: "Write a function uploadMessage(UploadState state) that returns a message for idle, uploading, or done.",
        starter: `enum UploadState { idle, uploading, done }

String uploadMessage(UploadState state) {
  // return a different message for each state
}`,
        solution: `enum UploadState { idle, uploading, done }

String uploadMessage(UploadState state) {
  switch (state) {
    case UploadState.idle:
      return "No upload yet";
    case UploadState.uploading:
      return "Uploading...";
    case UploadState.done:
      return "Upload complete!";
  }
}`,
        keywords: [
          { label: "Uses switch", hint: "switch (...)", pattern: "switch\\s*\\(" },
          { label: "Handles uploading", hint: "UploadState.uploading", pattern: "UploadState\\.uploading" },
          { label: "Handles done", hint: "UploadState.done", pattern: "UploadState\\.done" },
        ],
      },
      outcomes: [
        "Combine file picking with a preview display",
        "Track an upload process using a simple enum state",
        "Guard actions against missing required data",
      ],
    },
    {
      title: "Project: Chat UI Reinforced",
      xp: 20,
      def:
        "This project revisits and extends the **Chat UI** from the real-time chapter, adding a simple feature like showing 'typing...' status or a message timestamp, reinforcing state management and UI composition together.",
      example:
        "Building on the earlier QuantumChat-style screen, this version adds a small 'Sara is typing...' indicator that appears briefly, making the chat feel more alive and realistic.",
      learn: [
        "How to extend an existing feature with one new small addition",
        "How to show a temporary status message using a bool and a Timer",
        "How thinking in small increments keeps even a chat app manageable",
      ],
      scenario:
        "Think of it like this: this project is like adding one new feature to an already-working car, such as a rearview camera. You do not rebuild the whole car — you carefully add one more clear improvement to what already works.",
      visual: {
        kind: "diagram",
        title: "Reinforced chat features",
        nodes: [
          { label: "Existing chat screen", items: ["Message list + input"] },
          { label: "New: typing indicator", items: ["bool isTyping", "Timer to auto-hide it"] },
        ],
      },
      code: {
        label: "Adding a typing indicator",
        content: `import 'package:flutter/material.dart';
import 'dart:async';

class ChatWithTyping extends StatefulWidget {
  const ChatWithTyping({super.key});

  @override
  State<ChatWithTyping> createState() => _ChatWithTypingState();
}

class _ChatWithTypingState extends State<ChatWithTyping> {
  bool isTyping = false;

  void simulateTyping() {
    setState(() => isTyping = true);
    Timer(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() => isTyping = false);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (isTyping) const Text("Sara is typing...", style: TextStyle(color: Colors.grey)),
        ElevatedButton(onPressed: simulateTyping, child: const Text("Simulate incoming typing")),
      ],
    );
  }
}`,
      },
      tip: "Check 'if (mounted)' before calling setState() inside a Timer callback — it protects against calling setState() after the widget has already been removed from the screen.",
      warning: "Do not forget to cancel any Timer you start in dispose() if the widget might close before the Timer finishes — otherwise it may try to call setState() on a disposed widget.",
      practice: {
        level1: "Change the typing indicator duration to 3 seconds.",
        level2: "Add a timestamp Text under each ChatMessage bubble from the earlier chat project.",
        level3: "Describe how a real app would trigger isTyping from an actual server event instead of a button.",
      },
      summary:
        "You reinforced the chat project by adding one small, realistic feature — a typing indicator — practicing safe setState and Timer usage.",
      next: "Next, you will build the Capstone project, combining the biggest ideas from this entire course.",
      quiz: {
        q: "Why check 'if (mounted)' before calling setState() inside a delayed Timer callback?",
        options: [
          "To avoid calling setState() on a widget that may have already been removed from the screen",
          "mounted has no real purpose in Flutter",
          "This check is only needed for StatelessWidgets",
          "It prevents the Timer from ever running",
        ],
        answer: 0,
        explain: "Checking mounted avoids a common error where setState() is called after a widget is disposed.",
      },
      quiz2: {
        q: "What is the benefit of adding one small feature (like a typing indicator) at a time to an existing app?",
        options: [
          "It keeps changes manageable and easier to test, rather than rebuilding everything at once",
          "Small changes are always slower than large rewrites",
          "There is no benefit, big rewrites are always better",
          "Features can only be added all at once in Flutter",
        ],
        answer: 0,
        explain: "Incremental additions are easier to reason about, test, and debug compared to large, all-at-once rewrites.",
      },
      challenge: {
        title: "Typing indicator text",
        desc: "Write a function typingText(bool isTyping, String name) returning '<name> is typing...' or an empty string.",
        starter: `String typingText(bool isTyping, String name) {
  // return the typing message or an empty string
}`,
        solution: `String typingText(bool isTyping, String name) {
  if (isTyping) {
    return name + " is typing...";
  }
  return "";
}`,
        keywords: [
          { label: "Checks isTyping", hint: "if (isTyping)", pattern: "isTyping" },
          { label: "Uses the name", hint: "+ name +", pattern: "name" },
          { label: "Returns empty string fallback", hint: "return \"\";", pattern: "return\\s+\"\"" },
        ],
      },
      outcomes: [
        "Extend an existing feature with one small, clear addition",
        "Show a temporary status using a bool and a Timer safely",
        "Apply the mounted check to avoid setState errors",
      ],
    },
    {
      title: "Capstone Project",
      xp: 25,
      def:
        "The **Capstone project** combines the biggest ideas from this entire course into one small but complete app: a model, a list, navigation between screens, simple state management, and a touch of networking or storage — your own mini QuantumChat-inspired app.",
      example:
        "A capstone might be a simple 'Study Buddy' app: a login screen, a home screen listing study groups (models + list), a chat-style detail screen for each group (navigation + state), and a saved 'last opened group' using local storage.",
      learn: [
        "How to plan a small app by sketching its screens and data first",
        "How to combine models, lists, navigation, and state into one coherent app",
        "How to decide which of the course's many topics are actually needed for your specific idea",
      ],
      scenario:
        "Think of it like this: this capstone is like a final cooking exam after many separate practice lessons (chopping, seasoning, plating). You are not learning a new skill here — you are combining everything you already practiced into one complete, satisfying final dish.",
      visual: {
        kind: "diagram",
        title: "A sample capstone plan",
        nodes: [
          { label: "LoginScreen", items: ["Simple auth flow"] },
          { label: "HomeScreen", items: ["List of groups/items", "Model + ListView.builder"] },
          { label: "DetailScreen", items: ["Navigation + local state", "Maybe a chat-style UI"] },
        ],
      },
      code: {
        label: "A capstone skeleton to build from",
        content: `import 'package:flutter/material.dart';

class StudyGroup {
  String name;
  int memberCount;
  StudyGroup(this.name, this.memberCount);
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List<StudyGroup> groups = [
      StudyGroup("Flutter Basics", 12),
      StudyGroup("Dart Deep Dive", 8),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text("Study Buddy")),
      body: ListView.builder(
        itemCount: groups.length,
        itemBuilder: (context, index) {
          final g = groups[index];
          return ListTile(
            title: Text(g.name),
            subtitle: Text(g.memberCount.toString() + " members"),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => DetailScreen(group: g)),
              );
            },
          );
        },
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  final StudyGroup group;
  const DetailScreen({super.key, required this.group});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(group.name)),
      body: Center(child: Text("Welcome to " + group.name + "!")),
    );
  }
}`,
      },
      tip: "Sketch your capstone's screens and data on paper first, exactly like the diagram above — a clear plan before coding saves a huge amount of time and confusion.",
      warning: "Do not try to use every single topic from this entire course in one capstone — pick the few features that genuinely fit your chosen app idea, and build those well.",
      practice: {
        level1: "Write down your own capstone app idea in one sentence.",
        level2: "Sketch 2-3 screens for your idea and the data model(s) each one needs.",
        level3: "Build the first working version of your capstone's home screen, using a model and ListView.builder.",
      },
      summary:
        "You have reached the Capstone — the place to combine models, lists, navigation, and state into one complete app idea of your own, using everything from this course.",
      next: "Congratulations on completing Flutter Development: Zero to Real Apps! Keep building, keep practicing, and keep shipping real apps.",
      quiz: {
        q: "What is a recommended first step before coding a capstone project?",
        options: [
          "Sketching the app's screens and data models on paper first",
          "Writing every possible feature from the whole course immediately",
          "Skipping planning entirely and coding randomly",
          "Avoiding the use of any models in the app",
        ],
        answer: 0,
        explain: "Planning screens and data ahead of time makes the actual building process far smoother and clearer.",
      },
      quiz2: {
        q: "Why is it a good idea to pick only a few relevant features for your capstone, rather than using everything from the course?",
        options: [
          "Focusing on features that fit your specific app idea leads to a cleaner, more finished result",
          "Capstones are required to use every single topic from the course",
          "Using fewer features is always technically impossible",
          "There is no benefit to being selective about features",
        ],
        answer: 0,
        explain: "A focused, well-built app beats an unfocused one trying to cram in every possible feature.",
      },
      challenge: {
        title: "Model your capstone data",
        desc: "Create a simple model class for your own capstone idea (at least 2 fields and a constructor), and create a List of 2 instances.",
        starter: `// Define your own model class here, with at least 2 fields

void main() {
  // create a list of 2 instances of your model and print them
}`,
        solution: `class StudyGroup {
  String name;
  int memberCount;
  StudyGroup(this.name, this.memberCount);
}

void main() {
  List<StudyGroup> groups = [
    StudyGroup("Flutter Basics", 12),
    StudyGroup("Dart Deep Dive", 8),
  ];
  for (var g in groups) {
    print(g.name + ": " + g.memberCount.toString());
  }
}`,
        keywords: [
          { label: "Defines a class", hint: "class YourModel", pattern: "class\\s+\\w+" },
          { label: "Has a constructor", hint: "YourModel(this....)", pattern: "this\\." },
          { label: "Creates a list of instances", hint: "List<...>", pattern: "List<" },
        ],
      },
      outcomes: [
        "Plan a small app's screens and data before coding",
        "Combine models, lists, navigation, and state into one app",
        "Choose features that genuinely fit a specific app idea",
      ],
    },
  ],
};
