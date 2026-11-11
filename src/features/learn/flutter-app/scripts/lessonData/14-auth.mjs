// Chapter 14 — Authentication and User Accounts

export const CH_AUTH = {
  id: "auth",
  title: "Authentication and User Accounts",
  icon: "lock",
  color: "#004d40",
  lessons: [
    {
      title: "Login and Register Flows",
      xp: 15,
      def:
        "A **login flow** lets an existing user prove who they are, usually with an email/username and password. A **register flow** creates a brand-new account. Both typically send the entered data to a server and wait for a response.",
      example:
        "When opening QuantumChat for the first time, a new user taps 'Sign Up' and fills in their details (register flow). The next time they open the app, they tap 'Log In' and enter the same email and password (login flow).",
      learn: [
        "The basic steps of a login flow: collect input, send request, handle response",
        "The basic steps of a register flow: collect input, validate, send request, handle response",
        "Why both flows need to clearly handle both success and failure",
      ],
      scenario:
        "Think of it like this: registering is like filling out a membership form for a new library card. Logging in later is like showing that same card at the front desk to prove you are already a member.",
      visual: {
        kind: "diagram",
        title: "Login flow steps",
        nodes: [
          { label: "1. Collect input", items: ["Email, password fields"] },
          { label: "2. Send request", items: ["POST to /login"] },
          { label: "3. Handle response", items: ["Success: save token", "Failure: show error"] },
        ],
      },
      code: {
        label: "A simplified login function",
        content: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<bool> login(String email, String password) async {
  final response = await http.post(
    Uri.parse("https://api.example.com/login"),
    body: {"email": email, "password": password},
  );

  if (response.statusCode == 200) {
    Map<String, dynamic> data = jsonDecode(response.body);
    print("Logged in! Token: " + data["token"]);
    return true;
  } else {
    print("Login failed: " + response.statusCode.toString());
    return false;
  }
}`,
      },
      tip: "Keep login and register logic in their own clearly named functions (like login() and register()) — it makes testing and debugging much easier.",
      warning: "Do not show a generic 'something went wrong' message for every single failure — distinguishing 'wrong password' from 'no internet connection' helps users fix the actual problem.",
      practice: {
        level1: "Explain, in your own words, the difference between a login flow and a register flow.",
        level2: "Write a register(email, password, name) function similar to login() above.",
        level3: "Add a check that returns false immediately if email or password is empty, before even sending the request.",
      },
      summary:
        "Login and register flows both collect user input, send it to a server, and must clearly handle both success and failure.",
      next: "Next, you will dig deeper into working with the auth tokens these flows return.",
      quiz: {
        q: "What is the main purpose of a login flow?",
        options: [
          "To let an existing user prove who they are and access their account",
          "To permanently delete a user's account",
          "To change the app's theme color",
          "To create a brand-new account every time",
        ],
        answer: 0,
        explain: "Login verifies an existing user's identity, usually via email/username and password.",
      },
      quiz2: {
        q: "Why is it helpful to check for empty email/password before sending a login request?",
        options: [
          "It catches an obvious problem immediately, without wasting a network request",
          "It makes the server respond faster automatically",
          "Empty fields are always accepted by every server",
          "There is no benefit to checking beforehand",
        ],
        answer: 0,
        explain: "Basic validation before sending saves time and gives immediate, clear feedback to the user.",
      },
      challenge: {
        title: "Validate before login",
        desc: "Write a function canAttemptLogin(email, password) that returns false if either is empty, true otherwise.",
        starter: `bool canAttemptLogin(String email, String password) {
  // return false if either field is empty, true otherwise
}`,
        solution: `bool canAttemptLogin(String email, String password) {
  if (email.isEmpty || password.isEmpty) {
    return false;
  }
  return true;
}`,
        keywords: [
          { label: "Checks isEmpty", hint: ".isEmpty", pattern: "\\.isEmpty" },
          { label: "Uses ||", hint: "||", pattern: "\\|\\|" },
          { label: "Returns a bool", hint: "return true/false", pattern: "return\\s+(true|false)" },
        ],
      },
      outcomes: [
        "Describe the basic steps of a login flow",
        "Describe the basic steps of a register flow",
        "Explain why both success and failure must be clearly handled",
      ],
    },
    {
      title: "Working with Auth Tokens",
      xp: 15,
      def:
        "An **auth token** is a piece of text the server gives you after a successful login, which your app then sends back with future requests to prove 'this is still the same logged-in user' — without resending the password every time.",
      example:
        "After logging into QuantumChat, the app saves the returned token. When loading the chat list later, the app includes that token in the request's headers, and the server checks it instead of asking for the password again.",
      learn: [
        "Why tokens avoid the need to resend a password on every request",
        "How to attach a token to a request using headers",
        "How to save a token after login and load it on app startup",
      ],
      scenario:
        "Think of it like this: a token is like a wristband at a concert. You show your ticket once at the entrance (login), get a wristband (token), and then flash the wristband for every re-entry — no need to show the original ticket again.",
      visual: {
        kind: "table",
        title: "Token lifecycle",
        columns: ["Step", "What happens"],
        rows: [
          ["1. Login succeeds", "Server returns a token"],
          ["2. Save the token", "Using secure storage"],
          ["3. Attach to future requests", "In the Authorization header"],
        ],
      },
      code: {
        label: "Attaching a token to a request",
        content: `import 'package:http/http.dart' as http;

Future<void> fetchProfile(String token) async {
  final response = await http.get(
    Uri.parse("https://api.example.com/profile"),
    headers: {"Authorization": "Bearer " + token},
  );

  print("Profile request status: " + response.statusCode.toString());
}`,
      },
      tip: "The 'Bearer' prefix before a token in the Authorization header is a common standard — many APIs expect exactly this format.",
      warning: "Do not forget to handle a 401 (unauthorized) response — it usually means the token expired or is invalid, and the user should be sent back to the login screen.",
      practice: {
        level1: "Explain, in your own words, why tokens avoid resending a password every time.",
        level2: "Write the headers Map needed to attach a Bearer token to a request.",
        level3: "Describe what your app should do if a request returns status code 401.",
      },
      summary:
        "Auth tokens let your app prove a user is logged in on future requests, usually attached via an Authorization header.",
      next: "Next, you will learn how to protect certain screens so only logged-in users can see them.",
      quiz: {
        q: "What is an auth token mainly used for?",
        options: [
          "Proving to the server that a request comes from an already logged-in user",
          "Changing the app's color theme",
          "Storing images locally",
          "Replacing the need for any server at all",
        ],
        answer: 0,
        explain: "Tokens let the server recognize a logged-in user without re-sending their password every time.",
      },
      quiz2: {
        q: "What does a 401 status code usually indicate when using a saved token?",
        options: [
          "The token is missing, invalid, or expired",
          "The request succeeded perfectly",
          "The server is permanently offline",
          "The user's internet connection is too slow",
        ],
        answer: 0,
        explain: "401 (Unauthorized) usually means the token was not accepted, often because it expired or was never sent.",
      },
      challenge: {
        title: "Build an auth header",
        desc: "Write a function buildAuthHeader(String token) that returns a Map<String, String> with the Authorization Bearer header.",
        starter: `Map<String, String> buildAuthHeader(String token) {
  // return a Map with an Authorization Bearer header
}`,
        solution: `Map<String, String> buildAuthHeader(String token) {
  return {"Authorization": "Bearer " + token};
}`,
        keywords: [
          { label: "Returns a Map", hint: "Map<String, String>", pattern: "Map<String,\\s*String>" },
          { label: "Uses Authorization key", hint: "\"Authorization\"", pattern: "Authorization" },
          { label: "Includes Bearer", hint: "Bearer", pattern: "Bearer" },
        ],
      },
      outcomes: [
        "Explain how an auth token avoids resending a password",
        "Attach a token to a request using an Authorization header",
        "Handle a 401 response by directing the user to log in again",
      ],
    },
    {
      title: "Protected Screens",
      xp: 15,
      def:
        "A **protected screen** is one that should only be visible to logged-in users, like a profile or settings page. Your app usually checks for a valid saved token before allowing access, redirecting to login if none is found.",
      example:
        "If a user closes QuantumChat without logging out and reopens it later, the app should check for a saved token on startup — if found, go straight to the chat list; if not, show the login screen first.",
      learn: [
        "How to check for a saved token when the app starts",
        "How to redirect to a login screen when no valid token exists",
        "How a simple AuthGate widget can wrap protected content",
      ],
      scenario:
        "Think of it like this: a protected screen is like a members-only room with a card reader at the door. The reader (token check) decides instantly whether to let you walk in, or send you back to the front desk to sign in first.",
      visual: {
        kind: "diagram",
        title: "A simple auth gate",
        nodes: [
          { label: "App starts", items: ["Check saved token"] },
          { label: "Token found", items: ["Go to HomeScreen"] },
          { label: "No token", items: ["Go to LoginScreen"] },
        ],
      },
      code: {
        label: "A simple AuthGate widget",
        content: `import 'package:flutter/material.dart';

class AuthGate extends StatefulWidget {
  const AuthGate({super.key});

  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  bool loading = true;
  bool loggedIn = false;

  Future<void> checkToken() async {
    // In a real app, read from secure storage here.
    await Future.delayed(const Duration(seconds: 1));
    setState(() {
      loggedIn = false; // pretend no token was found
      loading = false;
    });
  }

  @override
  void initState() {
    super.initState();
    checkToken();
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Center(child: CircularProgressIndicator());
    }
    return loggedIn
        ? const Center(child: Text("Welcome back!"))
        : const Center(child: Text("Please log in"));
  }
}`,
      },
      tip: "Show a brief loading indicator while checking for a saved token on startup — it is usually a quick check, but it still takes a moment.",
      warning: "Do not assume a token being present always means it is still valid — a server can reject an expired token, so always be ready to fall back to the login screen.",
      practice: {
        level1: "Explain, in your own words, what an AuthGate widget decides.",
        level2: "Change the mock checkToken() above to set loggedIn to true, and describe the UI change.",
        level3: "Describe how you would connect checkToken() to the real loadToken() function from the storage chapter.",
      },
      summary:
        "An AuthGate widget checks for a saved token on startup and decides whether to show protected content or redirect to login.",
      next: "Next, you will learn how to handle logout and session management cleanly.",
      quiz: {
        q: "What does an AuthGate widget typically decide?",
        options: [
          "Whether to show protected content or redirect to a login screen",
          "The app's color theme",
          "How many tabs appear in a BottomNavigationBar",
          "Which font size to use",
        ],
        answer: 0,
        explain: "AuthGate checks login status and routes the user to the right screen based on it.",
      },
      quiz2: {
        q: "Why should an app not assume a saved token is always still valid?",
        options: [
          "A server can reject expired or revoked tokens even if one is saved locally",
          "Tokens never expire once saved",
          "Saved tokens are automatically refreshed by Flutter",
          "This situation can never actually happen",
        ],
        answer: 0,
        explain: "Tokens can expire or be revoked server-side, so apps must handle the case where a saved token no longer works.",
      },
      challenge: {
        title: "Decide the start screen",
        desc: "Write a function startScreen(String? token) that returns 'Home' if token is not null, or 'Login' otherwise.",
        starter: `String startScreen(String? token) {
  // return "Home" if token exists, otherwise "Login"
}`,
        solution: `String startScreen(String? token) {
  if (token != null) {
    return "Home";
  }
  return "Login";
}`,
        keywords: [
          { label: "Checks for null", hint: "token != null", pattern: "!=\\s*null" },
          { label: "Returns Home", hint: "\"Home\"", pattern: "Home" },
          { label: "Returns Login", hint: "\"Login\"", pattern: "Login" },
        ],
      },
      outcomes: [
        "Check for a saved token when the app starts",
        "Redirect to login when no valid token is found",
        "Build a simple AuthGate widget pattern",
      ],
    },
    {
      title: "Logout and Session Handling",
      xp: 10,
      def:
        "**Logging out** means clearing the saved token and any related user data, then returning to the login screen. Good **session handling** also means reacting cleanly if the server ever says a token is no longer valid.",
      example:
        "Tapping 'Log Out' in QuantumChat's settings should clear the saved token and send the user back to the login screen — and if the server later rejects an old token (say, after a password reset), the app should log the user out automatically too.",
      learn: [
        "How to clear a saved token on logout",
        "How to navigate back to the login screen after logging out",
        "How to react automatically to a 401 response by logging the user out",
      ],
      scenario:
        "Think of it like this: logging out is like returning your wristband at the end of a concert. If a staff member later says 'this wristband is no longer valid' (a 401 response), you should treat yourself as logged out immediately, even if you did not tap 'logout' yourself.",
      visual: {
        kind: "table",
        title: "Logout steps",
        columns: ["Step", "What happens"],
        rows: [
          ["1. Clear token", "Remove from secure storage"],
          ["2. Clear local user data", "Reset any cached profile info"],
          ["3. Navigate to login", "Replace the current screen stack"],
        ],
      },
      code: {
        label: "A simple logout function",
        content: `import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = const FlutterSecureStorage();

Future<void> logout(BuildContext context) async {
  await storage.delete(key: "auth_token");

  Navigator.pushNamedAndRemoveUntil(
    context,
    "/login",
    (route) => false,
  );
}`,
      },
      tip: "Use Navigator.pushNamedAndRemoveUntil (or similar) when logging out, so the user cannot press 'back' and return to screens meant only for logged-in users.",
      warning: "Do not forget to also clear any cached user data (like a profile object kept in memory) on logout — leaving old data around can leak into the next user's session on a shared device.",
      practice: {
        level1: "Explain, in your own words, why removing old screens from the stack matters on logout.",
        level2: "Write a function that treats a 401 response the same way as a manual logout.",
        level3: "Describe how you would show a short 'You have been logged out' message before returning to the login screen.",
      },
      summary:
        "Logging out clears the saved token and user data, then safely returns to the login screen without leaving old protected screens on the stack.",
      next: "Next chapter, you will work with device features like picking images and handling permissions.",
      quiz: {
        q: "Why use something like pushNamedAndRemoveUntil instead of a normal push when logging out?",
        options: [
          "It removes old protected screens from the stack so the user cannot go back to them",
          "It makes the app load faster in general",
          "It is required by every Flutter app regardless of logout",
          "It has no real benefit over a normal push",
        ],
        answer: 0,
        explain: "Clearing the stack on logout prevents the back button from exposing screens meant only for logged-in users.",
      },
      quiz2: {
        q: "If a server responds with 401 on an already-logged-in user's request, what is a good response?",
        options: [
          "Treat it like a logout: clear the token and return to the login screen",
          "Ignore it completely and keep showing the old screen",
          "Immediately delete the user's account",
          "Switch the app's theme color",
        ],
        answer: 0,
        explain: "A 401 on a previously valid session usually means the token expired or was revoked, so logging out is the safe response.",
      },
      challenge: {
        title: "Logout clears token",
        desc: "Write an async function logout() using secure storage that deletes the auth_token key and prints a confirmation.",
        starter: `import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = const FlutterSecureStorage();

Future<void> logout() async {
  // delete the auth_token and print a confirmation
}`,
        solution: `import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = const FlutterSecureStorage();

Future<void> logout() async {
  await storage.delete(key: "auth_token");
  print("Logged out successfully");
}`,
        keywords: [
          { label: "Deletes auth_token", hint: "delete(key: \"auth_token\")", pattern: "auth_token" },
          { label: "Uses await", hint: "await", pattern: "await" },
          { label: "Prints confirmation", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Clear a saved token when logging out",
        "Navigate back to login while clearing the screen stack",
        "React to a 401 response by logging the user out automatically",
      ],
    },
  ],
};
