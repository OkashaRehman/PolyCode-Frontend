// Chapter 12 — Networking and REST APIs

export const CH_NETWORKING = {
  id: "networking",
  title: "Networking and REST APIs",
  icon: "wifi",
  color: "#00796b",
  lessons: [
    {
      title: "HTTP Basics",
      xp: 10,
      def:
        "**HTTP** is the common language apps use to talk to servers over the internet. Your app sends a **request** (like 'give me the latest messages'), and the server sends back a **response** (the actual data, plus a status code).",
      example:
        "When QuantumChat opens, it might send a GET request asking 'give me my recent chats'. The server responds with the chat data and a status code like 200, meaning 'success'.",
      learn: [
        "What a request and a response are in plain words",
        "What common HTTP methods mean: GET, POST, PUT, DELETE",
        "What status codes like 200, 404, and 500 generally mean",
      ],
      scenario:
        "Think of it like this: HTTP is like ordering food at a counter. You send a request ('one burger, please'), and the server sends a response (the actual burger, plus a receipt showing whether the order succeeded).",
      visual: {
        kind: "table",
        title: "Common HTTP methods",
        columns: ["Method", "Typical use"],
        rows: [
          ["GET", "Read/fetch data, like loading a list of posts"],
          ["POST", "Create new data, like sending a new message"],
          ["PUT", "Update existing data, like editing a profile"],
          ["DELETE", "Remove data, like deleting a message"],
        ],
      },
      code: {
        label: "Thinking in request/response terms",
        content: `void main() {
  Map<String, String> request = {
    "method": "GET",
    "url": "https://example.com/api/messages",
  };

  Map<String, dynamic> response = {
    "status": "200",
    "body": "[{\\"text\\": \\"Hello!\\"}]",
  };

  print("Request: " + request.toString());
  print("Response status: " + response["status"]);
}`,
      },
      tip: "Status codes starting with 2 (like 200, 201) usually mean success. Codes starting with 4 (like 404) usually mean something was wrong with your request.",
      warning: "Do not assume every network request will succeed — real apps must always plan for failures like no internet connection or a server error.",
      practice: {
        level1: "Explain, in your own words, the difference between a request and a response.",
        level2: "List which HTTP method you would use to delete a chat message.",
        level3: "Explain what a 404 status code usually means in plain words.",
      },
      summary:
        "HTTP requests and responses are how your app talks to a server, using methods like GET and POST, and status codes to report success or failure.",
      next: "Next, you will learn how data is formatted using JSON when talking to servers.",
      quiz: {
        q: "Which HTTP method is typically used to fetch (read) data?",
        options: ["GET", "DELETE", "PUT", "POST"],
        answer: 0,
        explain: "GET requests are the standard way to retrieve data from a server.",
      },
      quiz2: {
        q: "What does a status code like 200 generally mean?",
        options: [
          "The request succeeded",
          "The server crashed completely",
          "The request was sent using the wrong app",
          "Nothing, status codes have no meaning",
        ],
        answer: 0,
        explain: "2xx status codes indicate the request was received, understood, and succeeded.",
      },
      challenge: {
        title: "Describe a request and response",
        desc: "Create a Map for a GET request (method, url) and a Map for a response (status, body), then print both.",
        starter: `void main() {
  // create request and response maps, then print them
}`,
        solution: `void main() {
  Map<String, String> request = {"method": "GET", "url": "https://api.example.com/users"};
  Map<String, String> response = {"status": "200", "body": "[]"};
  print(request);
  print(response);
}`,
        keywords: [
          { label: "Creates a request Map", hint: "method, url", pattern: "method" },
          { label: "Creates a response Map", hint: "status, body", pattern: "status" },
          { label: "Prints both", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain what an HTTP request and response are",
        "Match common HTTP methods to their typical use",
        "Interpret basic status codes like 200 and 404",
      ],
    },
    {
      title: "JSON Encoding and Decoding",
      xp: 15,
      def:
        "**JSON** (JavaScript Object Notation) is a text format used to send structured data over the internet, built from simple pairs like `\"name\": \"Ali\"`. Dart can **decode** JSON text into usable Maps/Lists, and **encode** Dart objects back into JSON text.",
      example:
        "A server might send back `{\"name\": \"Ali\", \"age\": 20}` as plain text. Dart's `jsonDecode()` turns that text into a real Map you can use in code, like `data[\"name\"]`.",
      learn: [
        "What JSON looks like and why it is widely used",
        "How jsonDecode() turns JSON text into a Dart Map or List",
        "How jsonEncode() turns a Dart Map back into JSON text",
      ],
      scenario:
        "Think of it like this: JSON is like a universal shipping label format that both the sender (server) and receiver (your app) understand, no matter what language either side was written in.",
      visual: {
        kind: "table",
        title: "JSON <-> Dart",
        columns: ["Direction", "Function"],
        rows: [
          ["JSON text -> Dart Map/List", "jsonDecode(text)"],
          ["Dart Map/List -> JSON text", "jsonEncode(data)"],
        ],
      },
      code: {
        label: "Decoding and encoding JSON",
        content: `import 'dart:convert';

void main() {
  String jsonText = '{"name": "Ali", "age": 20}';

  Map<String, dynamic> data = jsonDecode(jsonText);
  print("Name: " + data["name"]);
  print("Age: " + data["age"].toString());

  Map<String, dynamic> newData = {"name": "Sara", "age": 22};
  String encoded = jsonEncode(newData);
  print("Encoded: " + encoded);
}`,
      },
      tip: "Import 'dart:convert' at the top of your file whenever you use jsonDecode() or jsonEncode().",
      warning: "Do not forget that jsonDecode() returns dynamic values — accessing a field that does not exist in the JSON returns null, which can cause errors if you are not careful.",
      practice: {
        level1: "Decode a JSON string with a 'title' field and print it.",
        level2: "Encode a Dart Map with 2 fields into a JSON String and print it.",
        level3: "Decode a JSON array (a list of maps) and loop through printing each item's field.",
      },
      summary:
        "JSON is the common text format for sending structured data, and jsonDecode()/jsonEncode() convert between JSON text and usable Dart objects.",
      next: "Next, you will use the http package to actually fetch JSON data from a real API.",
      quiz: {
        q: "What does jsonDecode() do?",
        options: [
          "Turns JSON text into a usable Dart Map or List",
          "Deletes JSON data permanently",
          "Only works with images",
          "Sends data to a server",
        ],
        answer: 0,
        explain: "jsonDecode() parses a JSON string into Dart data structures you can use directly.",
      },
      quiz2: {
        q: "You have a Dart Map you want to send to a server as text. What function do you use?",
        options: ["jsonEncode()", "jsonDecode()", "print()", "toString() only, never encode"],
        answer: 0,
        explain: "jsonEncode() converts Dart data into a JSON-formatted String ready to send.",
      },
      challenge: {
        title: "Decode a JSON profile",
        desc: "Decode a JSON string with name and city fields using jsonDecode, then print both values.",
        starter: `import 'dart:convert';

void main() {
  String jsonText = '{"name": "Sara", "city": "Lahore"}';
  // decode jsonText and print name and city
}`,
        solution: `import 'dart:convert';

void main() {
  String jsonText = '{"name": "Sara", "city": "Lahore"}';
  Map<String, dynamic> data = jsonDecode(jsonText);
  print(data["name"]);
  print(data["city"]);
}`,
        keywords: [
          { label: "Imports dart:convert", hint: "import 'dart:convert';", pattern: "dart:convert" },
          { label: "Uses jsonDecode", hint: "jsonDecode(...)", pattern: "jsonDecode\\s*\\(" },
          { label: "Prints decoded values", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain what JSON is and why it is used",
        "Decode JSON text into a Dart Map or List",
        "Encode a Dart Map back into JSON text",
      ],
    },
    {
      title: "Using the http Package",
      xp: 15,
      def:
        "The **http** package lets your Flutter app actually send real network requests, like `http.get(url)`, and read back the response's status code and body text.",
      example:
        "A weather app uses `http.get()` to call a weather API, reads the returned JSON body, and shows today's temperature on screen — all using just a few lines with the http package.",
      learn: [
        "How to add the http package to pubspec.yaml",
        "How to call http.get() and await its response",
        "How to check response.statusCode before trusting response.body",
      ],
      scenario:
        "Think of it like this: the http package is like a trained courier. You give it an address (URL), it goes and asks for the package (data), and comes back reporting both the delivery status (status code) and the actual package contents (body).",
      visual: {
        kind: "table",
        title: "http.get() response pieces",
        columns: ["Piece", "Meaning"],
        rows: [
          ["response.statusCode", "Whether the request succeeded (e.g. 200)"],
          ["response.body", "The raw text, usually JSON, returned by the server"],
        ],
      },
      code: {
        label: "A simple GET request",
        content: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> fetchUser() async {
  final response = await http.get(Uri.parse("https://api.example.com/user/1"));

  if (response.statusCode == 200) {
    Map<String, dynamic> data = jsonDecode(response.body);
    print("Name: " + data["name"]);
  } else {
    print("Request failed with status: " + response.statusCode.toString());
  }
}`,
      },
      tip: "Always wrap the URL string in Uri.parse() when using the http package — it expects a Uri object, not a plain String.",
      warning: "Do not forget to check response.statusCode before using response.body — trying to decode an error page as JSON can cause confusing crashes.",
      practice: {
        level1: "Add http: ^1.0.0 (or any recent version) under dependencies in pubspec.yaml (describe this step).",
        level2: "Write an async function that performs a GET request to a sample URL and prints the status code.",
        level3: "Add an if/else that prints the user's name on success, or a friendly error message otherwise.",
      },
      summary:
        "The http package lets your app send real GET requests and read back status codes and response bodies from a server.",
      next: "Next, you will learn how to show loading spinners and error messages while waiting for network requests.",
      quiz: {
        q: "What must you do before using a URL string with http.get()?",
        options: [
          "Wrap it with Uri.parse()",
          "Convert it to an int",
          "Nothing, plain strings work directly",
          "Encode it with jsonEncode()",
        ],
        answer: 0,
        explain: "http.get() expects a Uri object, created from a String using Uri.parse().",
      },
      quiz2: {
        q: "Why check response.statusCode before decoding response.body as JSON?",
        options: [
          "An error response may not actually contain valid JSON data",
          "statusCode has no real use",
          "jsonDecode() always ignores statusCode automatically",
          "Checking statusCode is only needed for POST requests",
        ],
        answer: 0,
        explain: "If the request failed, the body may be an error message or HTML, not valid JSON — checking statusCode avoids crashes.",
      },
      challenge: {
        title: "Fetch and check status",
        desc: "Write an async function fetchData() using http.get() that prints the name field on success (200), or an error message otherwise.",
        starter: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> fetchData() async {
  // call http.get, check statusCode, decode and print name, or print error
}`,
        solution: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> fetchData() async {
  final response = await http.get(Uri.parse("https://api.example.com/user/1"));
  if (response.statusCode == 200) {
    Map<String, dynamic> data = jsonDecode(response.body);
    print(data["name"]);
  } else {
    print("Error: " + response.statusCode.toString());
  }
}`,
        keywords: [
          { label: "Uses http.get", hint: "http.get(...)", pattern: "http\\.get\\s*\\(" },
          { label: "Checks statusCode", hint: "statusCode == 200", pattern: "statusCode" },
          { label: "Decodes JSON", hint: "jsonDecode(...)", pattern: "jsonDecode\\s*\\(" },
        ],
      },
      outcomes: [
        "Add the http package to a Flutter project",
        "Perform a GET request using http.get()",
        "Check the status code before trusting the response body",
      ],
    },
    {
      title: "Loading and Error States",
      xp: 15,
      def:
        "A good screen that loads data should show three possible states: **loading** (waiting for data), **error** (something went wrong), and **success** (data is ready to show) — never leaving the user staring at a blank, confusing screen.",
      example:
        "When opening a news feed, users briefly see a spinner (loading), and if the internet drops, a clear 'Could not load news, try again' message (error) is far better than an empty, broken-looking screen.",
      learn: [
        "Why apps need explicit loading, error, and success states",
        "How to track these states using a simple enum or booleans",
        "How to show different widgets for each state",
      ],
      scenario:
        "Think of it like this: a restaurant kitchen either shows 'Your order is being prepared' (loading), 'Sorry, we ran out of that ingredient' (error), or actually serves the food (success) — never leaving you confused about what is happening.",
      visual: {
        kind: "table",
        title: "Three screen states",
        columns: ["State", "What to show"],
        rows: [
          ["Loading", "A spinner (CircularProgressIndicator)"],
          ["Error", "A clear, friendly error message, maybe a retry button"],
          ["Success", "The actual loaded data"],
        ],
      },
      code: {
        label: "Tracking loading/error/success with an enum",
        content: `import 'package:flutter/material.dart';

enum LoadState { loading, error, success }

class DataScreen extends StatefulWidget {
  const DataScreen({super.key});

  @override
  State<DataScreen> createState() => _DataScreenState();
}

class _DataScreenState extends State<DataScreen> {
  LoadState state = LoadState.loading;
  String message = "";

  @override
  Widget build(BuildContext context) {
    if (state == LoadState.loading) {
      return const Center(child: CircularProgressIndicator());
    } else if (state == LoadState.error) {
      return Center(child: Text("Error: " + message));
    } else {
      return Center(child: Text("Data: " + message));
    }
  }
}`,
      },
      tip: "Start every network-driven screen in the loading state by default, and only switch away from it once a result (success or error) actually arrives.",
      warning: "Do not leave a screen stuck showing a spinner forever if a request fails silently — always make sure your error-handling code eventually sets the state to error.",
      practice: {
        level1: "Explain, in your own words, why apps need an explicit error state, not just loading and success.",
        level2: "Add a Retry button to the error state that resets state back to loading.",
        level3: "Describe how you would connect this LoadState enum to a real http.get() call using try/catch.",
      },
      summary:
        "Tracking loading, error, and success states explicitly keeps users informed and avoids confusing blank or broken-looking screens.",
      next: "Next, you will learn about localhost vs 10.0.2.2 when testing APIs from an emulator.",
      quiz: {
        q: "Why should an app explicitly track a loading state while fetching data?",
        options: [
          "So the user sees a clear indicator instead of a blank, confusing screen",
          "Loading states are only needed for games",
          "It has no visible effect on the user experience",
          "Because Dart requires an enum for every screen",
        ],
        answer: 0,
        explain: "Showing a loading indicator sets clear expectations for the user while data is being fetched.",
      },
      quiz2: {
        q: "What is a good way to recover from an error state in a data-loading screen?",
        options: [
          "Offer a Retry button that resets back to the loading state and tries again",
          "Permanently freeze the screen with no way forward",
          "Immediately uninstall the app",
          "Hide the error with no explanation",
        ],
        answer: 0,
        explain: "A Retry button gives users a simple way to try the request again after a failure.",
      },
      challenge: {
        title: "Three-state screen",
        desc: "Write a function describeState(LoadState state) that returns 'Loading...', 'Something went wrong', or 'Done!' depending on the state.",
        starter: `enum LoadState { loading, error, success }

String describeState(LoadState state) {
  // return a different message for each state
}`,
        solution: `enum LoadState { loading, error, success }

String describeState(LoadState state) {
  switch (state) {
    case LoadState.loading:
      return "Loading...";
    case LoadState.error:
      return "Something went wrong";
    case LoadState.success:
      return "Done!";
  }
}`,
        keywords: [
          { label: "Uses the enum", hint: "LoadState", pattern: "LoadState" },
          { label: "Uses switch", hint: "switch (...)", pattern: "switch\\s*\\(" },
          { label: "Returns a message", hint: "return ...", pattern: "return\\s+" },
        ],
      },
      outcomes: [
        "Explain why loading, error, and success states matter",
        "Track these states using a simple enum",
        "Show different widgets based on the current state",
      ],
    },
    {
      title: "localhost vs 10.0.2.2",
      xp: 10,
      def:
        "When testing your own local server from an Android emulator, you usually cannot use `localhost` directly — the emulator has its own idea of 'localhost'. Instead, Android emulators use the special address **10.0.2.2** to reach your computer's localhost.",
      example:
        "If you run a backend server on your laptop at `localhost:3000`, and your Flutter app runs inside an Android emulator, your app should call `http://10.0.2.2:3000` instead of `http://localhost:3000` to actually reach that same server.",
      learn: [
        "Why 'localhost' means something different inside an emulator",
        "What address to use on Android emulators (10.0.2.2) versus iOS simulators (usually localhost works)",
        "How to configure a base URL that is easy to change between development and production",
      ],
      scenario:
        "Think of it like this: 'localhost' is like saying 'this building' — but the emulator is a separate building (a virtual phone) from your actual laptop. 10.0.2.2 is like a special shortcut address that says 'the building next door, where my laptop actually is'.",
      visual: {
        kind: "table",
        title: "Which address to use",
        columns: ["Environment", "Address for your local server"],
        rows: [
          ["Android emulator", "10.0.2.2 (instead of localhost)"],
          ["iOS simulator", "localhost usually works directly"],
          ["Real physical device", "Your computer's actual local network IP address"],
        ],
      },
      code: {
        label: "A switchable base URL",
        content: `import 'dart:io';

String getBaseUrl() {
  if (Platform.isAndroid) {
    return "http://10.0.2.2:3000";
  }
  return "http://localhost:3000";
}

void main() {
  print("Using base URL: " + getBaseUrl());
}`,
      },
      tip: "Keep your base URL in one single place (like a constants file or a function), so switching between local testing and a real production server is a one-line change.",
      warning: "Do not forget this special address is only for talking to your OWN computer's local server during development — real deployed APIs with real domain names work the same everywhere.",
      practice: {
        level1: "Explain, in your own words, why localhost does not work directly on an Android emulator.",
        level2: "Write a getBaseUrl() function that returns the right address based on platform.",
        level3: "Describe how you would switch getBaseUrl() to point at a real deployed server URL for production.",
      },
      summary:
        "Android emulators need 10.0.2.2 instead of localhost to reach your computer's local server, while iOS simulators usually work with localhost directly.",
      next: "Next chapter, you will learn how to store data locally on the device, like saving login tokens.",
      quiz: {
        q: "Why can't an Android emulator reach your computer's local server using 'localhost'?",
        options: [
          "The emulator treats 'localhost' as itself, a separate virtual device, not your computer",
          "Android emulators cannot use the internet at all",
          "localhost is banned by Android for security reasons",
          "There is no difference, localhost always works everywhere",
        ],
        answer: 0,
        explain: "Inside the emulator, 'localhost' refers to the emulator itself, not your physical development machine.",
      },
      quiz2: {
        q: "What special address should an Android emulator use to reach your computer's localhost server?",
        options: ["10.0.2.2", "127.0.0.0", "0.0.0.1", "192.168.1.1 always"],
        answer: 0,
        explain: "10.0.2.2 is the Android emulator's special alias for the host machine's localhost.",
      },
      challenge: {
        title: "Build a base URL",
        desc: "Write a function getBaseUrl(bool isAndroidEmulator) that returns the correct local server address for each case.",
        starter: `String getBaseUrl(bool isAndroidEmulator) {
  // return the correct address for each case
}`,
        solution: `String getBaseUrl(bool isAndroidEmulator) {
  if (isAndroidEmulator) {
    return "http://10.0.2.2:3000";
  }
  return "http://localhost:3000";
}`,
        keywords: [
          { label: "Checks isAndroidEmulator", hint: "if (isAndroidEmulator)", pattern: "isAndroidEmulator" },
          { label: "Returns 10.0.2.2", hint: "10.0.2.2", pattern: "10\\.0\\.2\\.2" },
          { label: "Returns localhost fallback", hint: "localhost", pattern: "localhost" },
        ],
      },
      outcomes: [
        "Explain why localhost behaves differently inside an Android emulator",
        "Use 10.0.2.2 to reach a local server from an Android emulator",
        "Build a switchable base URL for development and production",
      ],
    },
  ],
};
