// Chapter 17 — Architecture and Maintainable Code

export const CH_ARCHITECTURE = {
  id: "architecture",
  title: "Architecture and Maintainable Code",
  icon: "building-2",
  color: "#263238",
  lessons: [
    {
      title: "Folder Structure for Bigger Apps",
      xp: 15,
      def:
        "As an app grows, dumping every file into one flat folder becomes confusing. A clear **folder structure** groups related files together — like all screens in one folder, all models in another — so anyone can find things quickly.",
      example:
        "A growing chat app might organize lib/ into folders like screens/, models/, services/, and widgets/, instead of having 40 unrelated .dart files sitting loosely in lib/ with no organization.",
      learn: [
        "Why flat, unorganized folders become painful as an app grows",
        "A common beginner-friendly folder structure: screens, models, services, widgets",
        "How grouping by feature can be an alternative to grouping by type",
      ],
      scenario:
        "Think of it like this: a disorganized project is like a messy garage where tools, screws, and paint cans are all mixed in random piles. A good folder structure is like labeled shelves — screws here, tools there — so you can find what you need in seconds.",
      visual: {
        kind: "table",
        title: "A simple starter folder structure",
        columns: ["Folder", "Contains"],
        rows: [
          ["lib/screens/", "Full-page screens, like HomeScreen, LoginScreen"],
          ["lib/models/", "Data model classes, like Contact, Product"],
          ["lib/services/", "Code that talks to APIs or local storage"],
          ["lib/widgets/", "Small reusable widgets used across multiple screens"],
        ],
      },
      code: {
        label: "Thinking about structure as data",
        content: `void main() {
  Map<String, List<String>> structure = {
    "screens": ["HomeScreen", "LoginScreen", "ProfileScreen"],
    "models": ["Contact", "Product"],
    "services": ["AuthService", "ApiService"],
    "widgets": ["AppButton", "LoadingSpinner"],
  };

  structure.forEach((folder, files) {
    print("lib/" + folder + "/");
    for (var f in files) {
      print("  - " + f + ".dart");
    }
  });
}`,
      },
      tip: "Start organizing into folders earlier than you think you need to — it is much easier to keep a small, organized project tidy than to reorganize a huge messy one later.",
      warning: "Do not mix unrelated responsibilities in one file, like putting networking code, UI widgets, and data models all in a single giant main.dart file.",
      practice: {
        level1: "Explain, in your own words, why a flat folder with everything in it becomes hard to manage.",
        level2: "Sort these file names into the right folders: HomeScreen, Contact, ApiService, AppButton.",
        level3: "Describe how you would organize folders by feature instead (e.g. lib/chat/, lib/profile/) and when that might make more sense.",
      },
      summary:
        "A clear folder structure (screens, models, services, widgets) keeps a growing app organized and easy to navigate.",
      next: "Next, you will learn about a services layer, which centralizes logic like networking.",
      quiz: {
        q: "Why organize a Flutter app into folders like screens/, models/, and services/?",
        options: [
          "It groups related files together, making the project easier to navigate as it grows",
          "Flutter requires exactly these folder names to run",
          "It makes the app run faster at runtime",
          "It has no real benefit for small or large projects",
        ],
        answer: 0,
        explain: "Clear folder organization helps developers quickly find and understand related code as a project scales.",
      },
      quiz2: {
        q: "What problem can arise from mixing networking code, UI widgets, and models all in one giant file?",
        options: [
          "The file becomes hard to read, test, and maintain as it grows",
          "Dart automatically splits large files for you",
          "There is no downside to this approach",
          "It makes the app use less memory",
        ],
        answer: 0,
        explain: "Mixing unrelated responsibilities in one file makes code harder to understand, test, and safely modify.",
      },
      challenge: {
        title: "Organize file names",
        desc: "Write a function categorize(String fileName) returning 'screens', 'models', or 'services' based on simple naming hints (ends with Screen, or Service, otherwise models).",
        starter: `String categorize(String fileName) {
  // return "screens", "services", or "models" based on the name
}`,
        solution: `String categorize(String fileName) {
  if (fileName.endsWith("Screen")) {
    return "screens";
  } else if (fileName.endsWith("Service")) {
    return "services";
  }
  return "models";
}`,
        keywords: [
          { label: "Uses endsWith", hint: ".endsWith(...)", pattern: "\\.endsWith\\s*\\(" },
          { label: "Checks Screen", hint: "\"Screen\"", pattern: "Screen" },
          { label: "Checks Service", hint: "\"Service\"", pattern: "Service" },
        ],
      },
      outcomes: [
        "Explain why folder organization matters as apps grow",
        "Describe a common screens/models/services/widgets structure",
        "Decide between grouping by type or by feature",
      ],
    },
    {
      title: "The Services Layer",
      xp: 15,
      def:
        "A **services layer** is a set of classes dedicated to one job each, like talking to an API or reading local storage, kept separate from your UI widgets so screens stay simple and focused on just displaying things.",
      example:
        "Instead of writing http.get() calls directly inside a screen's build() method, an ApiService class handles all networking, and the screen simply calls apiService.fetchMessages() and displays the result.",
      learn: [
        "Why mixing networking code directly into widgets causes problems",
        "How to create a simple service class with clear methods",
        "How screens become simpler when they only call service methods",
      ],
      scenario:
        "Think of it like this: a services layer is like a hotel's back-office staff — the front desk (your screen) does not personally cook meals or clean rooms; it simply asks the right department (service) to handle it and reports back the result.",
      visual: {
        kind: "table",
        title: "Before and after a services layer",
        columns: ["Approach", "Result"],
        rows: [
          ["Networking code inside widgets", "Screens become long, hard to read, hard to test"],
          ["Dedicated ApiService class", "Screens stay simple, logic is reusable and testable"],
        ],
      },
      code: {
        label: "A simple ApiService",
        content: `import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  Future<List<dynamic>> fetchMessages() async {
    final response = await http.get(Uri.parse("https://api.example.com/messages"));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception("Failed to load messages");
  }
}

// Inside a screen, you would simply call:
// final messages = await ApiService().fetchMessages();`,
      },
      tip: "Give service methods clear, action-based names like fetchMessages() or sendMessage() — a service file should almost read like a list of available actions.",
      warning: "Do not let UI code (like showing a SnackBar) leak into your service classes — services should focus on data, and let screens decide how to display results or errors.",
      practice: {
        level1: "Explain, in your own words, why screens become simpler with a services layer.",
        level2: "Add a sendMessage(String text) method to ApiService that performs a POST request.",
        level3: "Describe how a screen's build() method would call fetchMessages() and show a loading/error state while waiting.",
      },
      summary:
        "A services layer centralizes networking (and similar) logic into dedicated classes, keeping screens simple and the logic reusable.",
      next: "Next, you will learn about the repository pattern, which builds on this idea even further.",
      quiz: {
        q: "What is the main benefit of putting networking code into a dedicated ApiService class?",
        options: [
          "Screens stay simpler, and the logic becomes reusable and easier to test",
          "It makes the app connect to the internet for the first time",
          "It removes the need for any error handling",
          "There is no real benefit compared to writing it directly in screens",
        ],
        answer: 0,
        explain: "Separating networking logic into a service keeps UI code focused and makes the logic reusable elsewhere.",
      },
      quiz2: {
        q: "Why should a service class generally avoid showing UI elements like SnackBars directly?",
        options: [
          "Because services should focus on data, letting screens decide how to display results",
          "Because services cannot import any package at all",
          "Because SnackBars only work inside models",
          "There is no reason, services should always show SnackBars",
        ],
        answer: 0,
        explain: "Keeping UI concerns in screens and data concerns in services keeps responsibilities cleanly separated.",
      },
      challenge: {
        title: "Build a simple service method",
        desc: "Write a class CounterService with a method increase(int current) that returns current + 1.",
        starter: `class CounterService {
  // add an increase(current) method
}`,
        solution: `class CounterService {
  int increase(int current) {
    return current + 1;
  }
}`,
        keywords: [
          { label: "Defines a class", hint: "class CounterService", pattern: "class\\s+CounterService" },
          { label: "Has an increase method", hint: "increase(", pattern: "increase\\s*\\(" },
          { label: "Returns a value", hint: "return ...", pattern: "return" },
        ],
      },
      outcomes: [
        "Explain why networking logic should not live directly in widgets",
        "Create a simple service class with clear method names",
        "Describe how screens use services to stay simple",
      ],
    },
    {
      title: "The Repository Pattern",
      xp: 15,
      def:
        "A **repository** sits between your app and your data sources (like an API and local storage), deciding where data comes from. Screens ask the repository for data, without needing to know whether it came from the network or a local cache.",
      example:
        "A ContactRepository might first check local storage for cached contacts, and only call the API if nothing is cached yet or the cache is old — screens just call repository.getContacts() without caring about these details.",
      learn: [
        "The difference between a service (one data source) and a repository (coordinates multiple sources)",
        "How a repository can combine local cache and network calls",
        "Why this separation makes testing and swapping data sources easier",
      ],
      scenario:
        "Think of it like this: a repository is like a smart librarian. You ask for a book (data); the librarian checks the nearby shelf first (cache), and only walks to the far storage room (network) if needed — you never have to know which one happened.",
      visual: {
        kind: "diagram",
        title: "Repository coordinating sources",
        nodes: [
          { label: "Screen", items: ["Calls repository.getContacts()"] },
          { label: "ContactRepository", items: ["Decides: cache or network?"] },
          { label: "Local cache + ApiService", items: ["The actual data sources"] },
        ],
      },
      code: {
        label: "A simple repository combining two sources",
        content: `class ContactRepository {
  List<String>? cachedContacts;

  Future<List<String>> getContacts() async {
    if (cachedContacts != null) {
      print("Returning cached contacts");
      return cachedContacts!;
    }

    print("Fetching contacts from network...");
    await Future.delayed(const Duration(seconds: 1));
    cachedContacts = ["Ali", "Sara"];
    return cachedContacts!;
  }
}`,
      },
      tip: "Think of a repository's public method names from the screen's point of view — like getContacts() — not from the data source's point of view, like fetchFromApiOrCache().",
      warning: "Do not let a repository leak low-level details (like raw HTTP response objects) back to the screen — it should return clean, simple data or models instead.",
      practice: {
        level1: "Explain, in your own words, the difference between a service and a repository.",
        level2: "Add a clearCache() method to ContactRepository that resets cachedContacts to null.",
        level3: "Describe how you would make getContacts() refresh the cache automatically after 5 minutes.",
      },
      summary:
        "A repository coordinates between multiple data sources (like cache and network), giving screens one simple, consistent way to ask for data.",
      next: "Next, you will learn the basics of clean architecture, tying these ideas together into clear layers.",
      quiz: {
        q: "What is the main role of a repository, compared to a single service?",
        options: [
          "It coordinates between multiple data sources, like cache and network",
          "It is exactly the same thing as a service with a different name",
          "It only handles UI styling",
          "It replaces the need for any models",
        ],
        answer: 0,
        explain: "A repository decides where data should come from, often combining a cache and a network service.",
      },
      quiz2: {
        q: "Why should a repository return clean data instead of raw network response objects?",
        options: [
          "So screens do not need to understand low-level networking details",
          "Raw response objects are always faster to use directly",
          "Repositories are not allowed to use http at all",
          "There is no real benefit to returning clean data",
        ],
        answer: 0,
        explain: "Returning simple, clean data keeps the screen's job simple and decoupled from networking details.",
      },
      challenge: {
        title: "Cache-aware getter",
        desc: "Write a function getData(String? cached) that returns cached if it is not null, otherwise returns 'fresh data'.",
        starter: `String getData(String? cached) {
  // return cached if available, otherwise return "fresh data"
}`,
        solution: `String getData(String? cached) {
  return cached ?? "fresh data";
}`,
        keywords: [
          { label: "Uses ??", hint: "cached ?? \"fresh data\"", pattern: "\\?\\?" },
          { label: "Returns a value", hint: "return ...", pattern: "return" },
          { label: "Takes a nullable param", hint: "String? cached", pattern: "String\\?\\s+\\w+" },
        ],
      },
      outcomes: [
        "Explain the difference between a service and a repository",
        "Build a repository that coordinates cache and network",
        "Return clean, simple data to screens from a repository",
      ],
    },
    {
      title: "Clean Architecture Basics",
      xp: 15,
      def:
        "**Clean architecture** is a way of organizing code into layers — typically UI, logic/state, and data (services/repositories) — where each layer only talks to the layer next to it, keeping responsibilities clear and code easier to change safely.",
      example:
        "If you decide to switch from a REST API to a different backend later, clean architecture means only the data layer needs to change — your UI screens and business logic stay untouched because they only ever talked to the repository, not the raw API directly.",
      learn: [
        "The basic layers: UI (widgets/screens), logic/state (Provider/ChangeNotifier), and data (services/repositories)",
        "Why each layer should only depend on the layer directly below it",
        "How this separation makes big changes safer and easier",
      ],
      scenario:
        "Think of it like this: clean architecture is like a well-run restaurant. The waiter (UI) never cooks directly; they tell the kitchen (logic) what is needed, and the kitchen gets ingredients from suppliers (data layer) — each role stays in its own lane.",
      visual: {
        kind: "diagram",
        title: "Simple clean architecture layers",
        nodes: [
          { label: "UI layer", items: ["Screens, widgets", "Only displays data, handles taps"] },
          { label: "Logic layer", items: ["ChangeNotifier models", "Business rules, state"] },
          { label: "Data layer", items: ["Services, repositories", "APIs, local storage"] },
        ],
      },
      code: {
        label: "Layers working together (simplified)",
        content: `// Data layer
class ContactRepository {
  Future<List<String>> getContacts() async => ["Ali", "Sara"];
}

// Logic layer
class ContactsModel {
  final ContactRepository repository;
  List<String> contacts = [];
  ContactsModel(this.repository);

  Future<void> loadContacts() async {
    contacts = await repository.getContacts();
  }
}

// UI layer would call: await contactsModel.loadContacts();
// and then display contactsModel.contacts in a ListView.`,
      },
      tip: "Start simple — even just separating 'UI' from 'everything else' is a huge improvement over mixing everything into one file. Add more layers as your app actually needs them.",
      warning: "Do not force a tiny, simple app into a complex multi-layer architecture just because it sounds advanced — use the amount of structure that actually fits your project's size.",
      practice: {
        level1: "Explain, in your own words, the three basic layers described in this lesson.",
        level2: "Describe which layer a Text widget belongs to, and which layer an http.get() call belongs to.",
        level3: "Describe how switching your backend API later would affect each of the three layers.",
      },
      summary:
        "Clean architecture separates UI, logic, and data into clear layers, making apps easier to change and maintain as they grow.",
      next: "Next chapter, you will build real-time features like chat, applying everything from state management to architecture.",
      quiz: {
        q: "In a clean architecture setup, which layer should contain the actual networking code?",
        options: [
          "The data layer (services/repositories)",
          "The UI layer, directly inside widgets",
          "Clean architecture has no data layer at all",
          "The logic layer should never call the data layer",
        ],
        answer: 0,
        explain: "Networking and other data access belongs in the data layer, kept separate from UI and business logic.",
      },
      quiz2: {
        q: "What is a benefit of the UI layer never calling the API directly, but going through a repository instead?",
        options: [
          "Changing the backend later only requires updating the data layer, not the UI",
          "It makes the UI layer completely unnecessary",
          "It prevents the app from ever using the internet",
          "There is no real benefit to this separation",
        ],
        answer: 0,
        explain: "Keeping the UI decoupled from direct data access means backend changes stay isolated to the data layer.",
      },
      challenge: {
        title: "Connect two layers",
        desc: "Write a ContactsModel class with a repository field and a loadContacts() method that awaits repository.getContacts() and stores it in a contacts list.",
        starter: `class ContactRepository {
  Future<List<String>> getContacts() async => ["Ali", "Sara"];
}

class ContactsModel {
  // add a repository field, a contacts list, and loadContacts()
}`,
        solution: `class ContactRepository {
  Future<List<String>> getContacts() async => ["Ali", "Sara"];
}

class ContactsModel {
  final ContactRepository repository;
  List<String> contacts = [];
  ContactsModel(this.repository);

  Future<void> loadContacts() async {
    contacts = await repository.getContacts();
  }
}`,
        keywords: [
          { label: "Has a repository field", hint: "ContactRepository repository", pattern: "ContactRepository\\s+\\w+" },
          { label: "Has loadContacts", hint: "loadContacts(", pattern: "loadContacts\\s*\\(" },
          { label: "Awaits getContacts", hint: "await repository.getContacts()", pattern: "await\\s+repository\\.getContacts" },
        ],
      },
      outcomes: [
        "Describe the UI, logic, and data layers in clean architecture",
        "Explain why layers should only depend on the layer below them",
        "Apply just enough structure for a given app's size",
      ],
    },
  ],
};
