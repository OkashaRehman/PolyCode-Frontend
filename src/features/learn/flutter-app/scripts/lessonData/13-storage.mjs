// Chapter 13 — Local Storage and Security

export const CH_STORAGE = {
  id: "storage",
  title: "Local Storage and Security",
  icon: "hard-drive",
  color: "#00695c",
  lessons: [
    {
      title: "shared_preferences Basics",
      xp: 15,
      def:
        "**shared_preferences** is a simple package for saving small pieces of data directly on the device, like a theme choice or whether the user has seen an intro screen, so it is remembered even after the app closes.",
      example:
        "An app might remember whether a user prefers dark mode, so the next time they open the app, it opens already in dark mode, without needing to ask again.",
      learn: [
        "What kinds of data shared_preferences is good for",
        "How to save a value using setBool/setString/setInt",
        "How to read a saved value back, with a sensible default",
      ],
      scenario:
        "Think of it like this: shared_preferences is like a small sticky note stuck to your fridge — perfect for quick reminders like 'buy milk', but not meant for storing an entire filing cabinet of important documents.",
      visual: {
        kind: "table",
        title: "shared_preferences basics",
        columns: ["Method", "Use"],
        rows: [
          ["setBool/getBool", "Save/read a true-or-false setting"],
          ["setString/getString", "Save/read a short piece of text"],
          ["setInt/getInt", "Save/read a whole number"],
        ],
      },
      code: {
        label: "Saving and reading a dark mode setting",
        content: `import 'package:shared_preferences/shared_preferences.dart';

Future<void> saveDarkMode(bool isDark) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setBool("darkMode", isDark);
}

Future<bool> loadDarkMode() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getBool("darkMode") ?? false;
}`,
      },
      tip: "Always provide a default value with ?? when reading a saved setting — the very first time the app runs, nothing has been saved yet.",
      warning: "Do not use shared_preferences for sensitive data like passwords or auth tokens — it is not encrypted. Use secure storage for that (covered next).",
      practice: {
        level1: "Explain, in your own words, what kind of data fits shared_preferences well.",
        level2: "Write a function that saves a username String using setString.",
        level3: "Write a function that reads that username back, defaulting to 'Guest' if nothing was saved.",
      },
      summary:
        "shared_preferences is great for small, non-sensitive settings like theme choice, saved simply with setX/getX methods.",
      next: "Next, you will learn about secure storage for sensitive data like login tokens.",
      quiz: {
        q: "What kind of data is shared_preferences best suited for?",
        options: [
          "Small, non-sensitive settings like a theme choice",
          "Passwords and secret tokens",
          "Large video files",
          "Entire databases of user records",
        ],
        answer: 0,
        explain: "shared_preferences is designed for small, simple, non-sensitive values, not secrets or large data.",
      },
      quiz2: {
        q: "Why use '?? false' when reading a bool from shared_preferences?",
        options: [
          "To provide a sensible default the very first time, before anything is saved",
          "Because getBool() always crashes without it",
          "To delete the saved value",
          "It has no real purpose",
        ],
        answer: 0,
        explain: "The ?? operator provides a fallback value for the first run, when no value has been saved yet.",
      },
      challenge: {
        title: "Save and load a username",
        desc: "Write saveUsername(String name) and loadUsername() functions using shared_preferences, defaulting to 'Guest'.",
        starter: `import 'package:shared_preferences/shared_preferences.dart';

Future<void> saveUsername(String name) async {
  // save name using setString
}

Future<String> loadUsername() async {
  // read the saved username, default to "Guest"
}`,
        solution: `import 'package:shared_preferences/shared_preferences.dart';

Future<void> saveUsername(String name) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString("username", name);
}

Future<String> loadUsername() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString("username") ?? "Guest";
}`,
        keywords: [
          { label: "Uses setString", hint: "setString(...)", pattern: "setString\\s*\\(" },
          { label: "Uses getString", hint: "getString(...)", pattern: "getString\\s*\\(" },
          { label: "Has a default value", hint: "?? \"Guest\"", pattern: "\\?\\?" },
        ],
      },
      outcomes: [
        "Explain what kind of data fits shared_preferences",
        "Save a value using setBool/setString/setInt",
        "Read a saved value back with a sensible default",
      ],
    },
    {
      title: "Secure Storage and Tokens",
      xp: 15,
      def:
        "**Secure storage** (like the `flutter_secure_storage` package) encrypts data before saving it, making it a much safer place for sensitive values like **auth tokens**, which prove a user is logged in.",
      example:
        "After logging into QuantumChat, the app receives a token from the server. That token should be saved using secure storage, not shared_preferences, since it works like a key that could let someone impersonate that user if stolen.",
      learn: [
        "Why tokens and passwords should never use plain shared_preferences",
        "How secure storage encrypts data automatically for you",
        "How to write and read a token using secure storage",
      ],
      scenario:
        "Think of it like this: shared_preferences is an unlocked drawer, fine for a shopping list. Secure storage is a small safe with a lock — exactly where you should keep something as important as a house key (your auth token).",
      visual: {
        kind: "table",
        title: "shared_preferences vs secure storage",
        columns: ["Storage type", "Good for"],
        rows: [
          ["shared_preferences", "Simple settings, not encrypted"],
          ["flutter_secure_storage", "Sensitive data like tokens, encrypted automatically"],
        ],
      },
      code: {
        label: "Saving and reading a token securely",
        content: `import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = const FlutterSecureStorage();

Future<void> saveToken(String token) async {
  await storage.write(key: "auth_token", value: token);
}

Future<String?> loadToken() async {
  return await storage.read(key: "auth_token");
}`,
      },
      tip: "Treat an auth token like a temporary password — never print it to logs in a shipped app, and always use secure storage to keep it on the device.",
      warning: "Do not save passwords or tokens with shared_preferences 'just for now' and plan to fix it later — it is a common security mistake that is easy to forget about.",
      practice: {
        level1: "Explain, in your own words, why tokens need encrypted storage.",
        level2: "Write a function that deletes a saved token using storage.delete(key: ...).",
        level3: "Describe how your app should react if loadToken() returns null when the app starts.",
      },
      summary:
        "Secure storage encrypts sensitive data like auth tokens, which should never be kept in plain, unencrypted shared_preferences.",
      next: "Next, you will learn broader privacy best practices for handling user data responsibly.",
      quiz: {
        q: "Why should an auth token be saved with secure storage instead of shared_preferences?",
        options: [
          "Secure storage encrypts the data, protecting it if the device is compromised",
          "Secure storage is faster at loading images",
          "shared_preferences cannot store Strings at all",
          "There is no real difference between the two",
        ],
        answer: 0,
        explain: "Secure storage encrypts sensitive values, offering much stronger protection than plain shared_preferences.",
      },
      quiz2: {
        q: "What should an app typically do if loadToken() returns null when it starts?",
        options: [
          "Treat the user as logged out and show a login screen",
          "Crash immediately with no handling",
          "Assume the user is an admin",
          "Ignore it and show the home screen anyway",
        ],
        answer: 0,
        explain: "A missing token usually means the user is not logged in, so the app should direct them to log in.",
      },
      challenge: {
        title: "Delete a token",
        desc: "Write a function clearToken() that deletes the saved auth_token from secure storage.",
        starter: `import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = const FlutterSecureStorage();

Future<void> clearToken() async {
  // delete the auth_token key from storage
}`,
        solution: `import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = const FlutterSecureStorage();

Future<void> clearToken() async {
  await storage.delete(key: "auth_token");
}`,
        keywords: [
          { label: "Uses FlutterSecureStorage", hint: "FlutterSecureStorage()", pattern: "FlutterSecureStorage" },
          { label: "Calls delete", hint: "storage.delete(", pattern: "\\.delete\\s*\\(" },
          { label: "Uses key auth_token", hint: "key: \"auth_token\"", pattern: "auth_token" },
        ],
      },
      outcomes: [
        "Explain why tokens need encrypted storage",
        "Save and read a token using flutter_secure_storage",
        "Delete a stored token when logging out",
      ],
    },
    {
      title: "Privacy Best Practices",
      xp: 10,
      def:
        "Beyond just encryption, good **privacy practice** means collecting only the data you actually need, telling users clearly what you store, and giving them a way to delete their data when possible.",
      example:
        "A learning app does not need a user's exact home address to track course progress — collecting that extra, unnecessary data creates risk without any real benefit to the user.",
      learn: [
        "Why collecting only necessary data reduces risk",
        "Why clear communication about data use builds user trust",
        "Simple habits: never log sensitive data, review third-party packages carefully",
      ],
      scenario:
        "Think of it like this: good privacy practice is like only carrying the exact cash you need for a trip, instead of your entire savings — if something goes wrong, there is simply less to lose.",
      visual: {
        kind: "table",
        title: "Simple privacy habits",
        columns: ["Habit", "Why it helps"],
        rows: [
          ["Collect only what you need", "Less sensitive data means less risk if something leaks"],
          ["Never log tokens/passwords", "Debug logs can be seen by more people than you expect"],
          ["Give users a way to delete data", "Builds trust and often meets legal requirements"],
        ],
      },
      code: {
        label: "A safe-logging habit",
        content: `void logSafely(String label, String value, {bool isSensitive = false}) {
  if (isSensitive) {
    print(label + ": [hidden]");
  } else {
    print(label + ": " + value);
  }
}

void main() {
  logSafely("Username", "ali_dev");
  logSafely("Auth token", "abc123xyz", isSensitive: true);
}`,
      },
      tip: "Before adding a new field to a form (like date of birth or address), ask: 'does the app actually need this to work?' If not, leave it out.",
      warning: "Do not print tokens, passwords, or other sensitive values to the console, even temporarily while debugging — these logs can sometimes be captured or saved unexpectedly.",
      practice: {
        level1: "List two pieces of personal data an app should avoid collecting unless truly necessary.",
        level2: "Rewrite a print() statement that currently logs a password, so it hides the value instead.",
        level3: "Describe, in a sentence, how you would let a user request deletion of their account data.",
      },
      summary:
        "Good privacy practice means collecting only necessary data, protecting sensitive values even in logs, and giving users control over their own data.",
      next: "Next chapter, you will build login and registration flows, applying what you learned about tokens and privacy.",
      quiz: {
        q: "Why should an app avoid collecting data it does not actually need?",
        options: [
          "Less unnecessary sensitive data means less risk if something goes wrong",
          "Collecting more data always makes an app faster",
          "Users prefer apps that ask for everything",
          "It has no effect on privacy or risk at all",
        ],
        answer: 0,
        explain: "Minimizing data collection reduces the potential impact if data is ever leaked or misused.",
      },
      quiz2: {
        q: "Why is logging a password or token to the console a bad habit, even temporarily?",
        options: [
          "Debug logs can sometimes be seen, saved, or shared more widely than expected",
          "print() statements are automatically deleted after use",
          "Logging has no effect on security at all",
          "Only images can be logged safely, nothing else",
        ],
        answer: 0,
        explain: "Logs can persist or be visible in more places than developers expect, so sensitive values should never be logged.",
      },
      challenge: {
        title: "Safe logger",
        desc: "Write a function logSafely(label, value, isSensitive) that hides the value when isSensitive is true.",
        starter: `void logSafely(String label, String value, bool isSensitive) {
  // print the value normally, or hide it if isSensitive is true
}`,
        solution: `void logSafely(String label, String value, bool isSensitive) {
  if (isSensitive) {
    print(label + ": [hidden]");
  } else {
    print(label + ": " + value);
  }
}`,
        keywords: [
          { label: "Checks isSensitive", hint: "if (isSensitive)", pattern: "isSensitive" },
          { label: "Hides value", hint: "[hidden]", pattern: "\\[hidden\\]" },
          { label: "Prints the label", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain why collecting less data reduces privacy risk",
        "Avoid logging sensitive values like passwords or tokens",
        "Describe how to give users control over their own data",
      ],
    },
  ],
};
