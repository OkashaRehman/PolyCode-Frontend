// Chapter 3 — Dart Programming for Beginners

export const CH_DART_BASICS = {
  id: "dart-basics",
  title: "Dart Programming for Beginners",
  icon: "code",
  color: "#13b9fd",
  lessons: [
    {
      title: "Print, Variables, and Types",
      xp: 10,
      def:
        "**print()** shows text in the console. A **variable** stores a value with a name, and that value has a **type** like String (text), int (whole number), double (decimal number), or bool (true/false).",
      example:
        "Think of a variable like a labeled jar in your kitchen. The jar labeled 'sugar' always holds sugar (a type), and you can look inside anytime by using its label (the variable name).",
      learn: [
        "How to use print() to show output",
        "How to declare variables with String, int, double, and bool",
        "Why giving values a clear type helps avoid mistakes",
      ],
      scenario:
        "Think of it like this: a String is a jar for words, an int is a jar for whole numbers, and a bool is a jar that can only hold 'yes' or 'no'. Putting the wrong thing in the wrong jar causes problems.",
      visual: {
        kind: "table",
        title: "Common Dart types",
        columns: ["Type", "Holds", "Example"],
        rows: [
          ["String", "Text", "\"QuantumChat\""],
          ["int", "Whole numbers", "25"],
          ["double", "Decimal numbers", "3.14"],
          ["bool", "True or false", "true"],
        ],
      },
      code: {
        label: "Variables in action",
        content: `void main() {
  String appName = "QuantumChat";
  int userCount = 120;
  double rating = 4.8;
  bool isOnline = true;

  print(appName);
  print(userCount);
  print(rating);
  print(isOnline);
}`,
      },
      tip: "Use clear variable names like userCount instead of x or n — it makes your code much easier to read later.",
      warning: "Do not put text in quotes into an int variable, like int age = \"20\"; — Dart will refuse to run because the types do not match.",
      practice: {
        level1: "Create a String variable with your name and print it.",
        level2: "Add an int variable for your age and print both your name and age.",
        level3: "Add a bool variable called isLearningFlutter and print a full sentence using all three variables.",
      },
      summary:
        "Variables store values with a specific type, and print() lets you see those values while your program runs.",
      next: "Next, you will learn how to combine and compare values using operators.",
      quiz: {
        q: "What does the print() function do in Dart?",
        options: [
          "Shows text or values in the console/output",
          "Deletes a variable",
          "Creates a new Flutter widget",
          "Connects to the internet",
        ],
        answer: 0,
        explain: "print() outputs text or values so you can see what your program is doing.",
      },
      quiz2: {
        q: "Which type should you use to store a decimal number like 4.8?",
        options: ["double", "int", "bool", "String"],
        answer: 0,
        explain: "double is used for numbers with decimal points; int is for whole numbers only.",
      },
      challenge: {
        title: "Introduce yourself in Dart",
        desc: "Create a String name, int age, and bool isStudent variable, then print a sentence that uses all three.",
        starter: `void main() {
  // create name, age, isStudent and print a sentence
}`,
        solution: `void main() {
  String name = "Ali";
  int age = 20;
  bool isStudent = true;
  print(name + " is " + age.toString() + " years old. Student: " + isStudent.toString());
}`,
        keywords: [
          { label: "Declares a String", hint: "String name", pattern: "String\\s+\\w+" },
          { label: "Declares an int", hint: "int age", pattern: "int\\s+\\w+" },
          { label: "Declares a bool", hint: "bool isStudent", pattern: "bool\\s+\\w+" },
        ],
      },
      outcomes: [
        "Use print() to display output",
        "Declare variables with String, int, double, and bool",
        "Explain why matching the right type to a value matters",
      ],
    },
    {
      title: "Operators and Expressions",
      xp: 10,
      def:
        "**Operators** are symbols that do work on values, like `+` for adding, `>` for comparing, and `&&` for combining true/false checks. An **expression** is any combination of values and operators that produces a result.",
      example:
        "A shopping app calculates a total price using `price * quantity`, then checks `total > 1000` to decide if free delivery applies. Both steps use operators to make decisions and calculations.",
      learn: [
        "Arithmetic operators: +, -, *, /, %",
        "Comparison operators: ==, !=, >, <, >=, <=",
        "Logical operators: && (and), || (or), ! (not)",
      ],
      scenario:
        "Think of it like this: operators are like kitchen tools. A knife (+) combines ingredients, a scale (>) compares weights, and a recipe rule (&&) says 'only serve if both conditions are true'.",
      visual: {
        kind: "table",
        title: "Operator cheat sheet",
        columns: ["Operator", "Meaning", "Example"],
        rows: [
          ["+ - * /", "Add, subtract, multiply, divide", "price * quantity"],
          ["== !=", "Equal to, not equal to", "age == 18"],
          ["&& ||", "And, or (combine true/false)", "isAdult && hasTicket"],
        ],
      },
      code: {
        label: "Operators in a small example",
        content: `void main() {
  int price = 500;
  int quantity = 3;
  int total = price * quantity;

  bool isMember = true;
  bool bigOrder = total > 1000;

  print("Total: " + total.toString());
  print("Free delivery? " + (isMember && bigOrder).toString());
}`,
      },
      tip: "Use parentheses to make your logic clear, like (a && b) || c, instead of relying on memorized operator order.",
      warning: "Do not confuse = (assigns a value) with == (checks if two values are equal) — this is one of the most common beginner mistakes.",
      practice: {
        level1: "Calculate 15 + 4 * 2 in Dart and print the result (remember multiplication happens first).",
        level2: "Write a bool expression that checks if a number is between 10 and 20 using && .",
        level3: "Write an expression using || that checks if a user is either an admin or a premium member.",
      },
      summary:
        "Operators let you calculate, compare, and combine values to build the logic your app needs.",
      next: "Next, you will use these comparisons inside if, else, and switch statements to make decisions.",
      quiz: {
        q: "Which operator checks if two values are equal in Dart?",
        options: ["==", "=", "&&", "!"],
        answer: 0,
        explain: "== compares two values for equality; = is used only to assign a value to a variable.",
      },
      quiz2: {
        q: "What does the expression (isMember && bigOrder) do?",
        options: [
          "It is true only when both isMember AND bigOrder are true",
          "It is true if either value is true",
          "It always returns true",
          "It compares isMember to bigOrder for equality",
        ],
        answer: 0,
        explain: "&& (logical AND) requires both sides to be true for the whole expression to be true.",
      },
      challenge: {
        title: "Delivery calculator",
        desc: "Calculate a total from price and quantity, then print whether the order qualifies for free delivery (total > 1000).",
        starter: `void main() {
  int price = 400;
  int quantity = 3;
  // calculate total and check if it qualifies for free delivery
}`,
        solution: `void main() {
  int price = 400;
  int quantity = 3;
  int total = price * quantity;
  bool freeDelivery = total > 1000;
  print("Total: " + total.toString());
  print("Free delivery: " + freeDelivery.toString());
}`,
        keywords: [
          { label: "Uses multiplication", hint: "price * quantity", pattern: "\\*" },
          { label: "Uses comparison", hint: "total > 1000", pattern: ">" },
          { label: "Prints result", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Use arithmetic operators to calculate values",
        "Use comparison operators to check conditions",
        "Combine conditions using && and ||",
      ],
    },
    {
      title: "if/else and switch Statements",
      xp: 10,
      def:
        "**if/else** lets your program choose different paths depending on a condition. **switch** does something similar when you are comparing one value against several fixed options, which can be cleaner to read.",
      example:
        "A login screen checks: if the password is correct, show the home screen; else, show an error message. A menu screen might use switch to decide which page to show based on a selected tab number.",
      learn: [
        "How to write if, else if, and else",
        "How to write a switch statement with cases",
        "When switch is clearer to use than many else if blocks",
      ],
      scenario:
        "Think of it like this: if/else is like a security guard checking one condition at a time ('Is this person on the list? If not, check the next rule.'). switch is like a vending machine with numbered buttons — press button 2, and it directly gives you that specific item.",
      visual: {
        kind: "table",
        title: "if/else vs switch",
        columns: ["Tool", "Best for"],
        rows: [
          ["if / else if / else", "Checking ranges or complex conditions"],
          ["switch", "Checking one variable against many exact values"],
        ],
      },
      code: {
        label: "if/else and switch together",
        content: `void main() {
  int score = 72;

  if (score >= 90) {
    print("Grade: A");
  } else if (score >= 70) {
    print("Grade: B");
  } else {
    print("Grade: C");
  }

  String day = "Mon";
  switch (day) {
    case "Mon":
      print("Start of the work week");
      break;
    case "Fri":
      print("Almost the weekend");
      break;
    default:
      print("Just another day");
  }
}`,
      },
      tip: "Always add a 'default' case in a switch statement to handle values you did not expect.",
      warning: "Do not forget the 'break;' at the end of each switch case in Dart — without it, you can accidentally fall through to the next case.",
      practice: {
        level1: "Write an if/else that prints 'Even' or 'Odd' for a given int number.",
        level2: "Write an if/else if/else that assigns a letter grade based on a score (A, B, C).",
        level3: "Rewrite a 4-day switch statement (Mon, Tue, Wed, other) that prints a different message for each day.",
      },
      summary:
        "if/else and switch both let your program make decisions, choosing between if/else for ranges and switch for exact-value matching.",
      next: "Next, you will learn how to repeat actions using for and while loops.",
      quiz: {
        q: "When is a switch statement usually a better fit than many if/else if blocks?",
        options: [
          "When checking one variable against several exact fixed values",
          "When you need to add two numbers together",
          "Switch statements can never be used in Dart",
          "When printing a single line of text only",
        ],
        answer: 0,
        explain: "switch shines when comparing a single variable to several specific values, like matching day names.",
      },
      quiz2: {
        q: "What happens if you forget 'break;' at the end of a switch case in Dart (without using a return)?",
        options: [
          "Execution can fall through unexpectedly into the next case",
          "Dart automatically adds the break for you silently",
          "The whole program crashes immediately with no message",
          "Nothing changes, break is never required",
        ],
        answer: 0,
        explain: "Without break (or another jump), execution can continue into the next case, which is rarely what you want.",
      },
      challenge: {
        title: "Grade calculator",
        desc: "Write an if/else if/else chain that prints 'A', 'B', or 'C' based on an int score variable.",
        starter: `void main() {
  int score = 85;
  // print A for 90+, B for 70-89, C otherwise
}`,
        solution: `void main() {
  int score = 85;
  if (score >= 90) {
    print("A");
  } else if (score >= 70) {
    print("B");
  } else {
    print("C");
  }
}`,
        keywords: [
          { label: "Uses if", hint: "if (...)", pattern: "if\\s*\\(" },
          { label: "Uses else if or else", hint: "else", pattern: "else" },
          { label: "Prints a grade", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Write if/else and else if chains to make decisions",
        "Write a switch statement with multiple cases",
        "Decide when to use if/else versus switch",
      ],
    },
    {
      title: "Loops: for and while",
      xp: 10,
      def:
        "**Loops** repeat a block of code multiple times. A **for** loop is great when you know how many times to repeat (or you are going through a list). A **while** loop repeats as long as a condition stays true.",
      example:
        "A messaging app loops through a list of 20 chat messages to display them all on screen. A game might use a while loop that keeps running 'while the player's health is above 0'.",
      learn: [
        "How to write a basic for loop",
        "How to write a while loop",
        "How to loop through a List using for-in",
      ],
      scenario:
        "Think of it like this: a for loop is like reading every page in a book from page 1 to page 20 — you know exactly how many pages there are. A while loop is like reading pages 'until the story ends' — you are not sure exactly when that will happen.",
      visual: {
        kind: "table",
        title: "Loop types",
        columns: ["Loop", "Use case"],
        rows: [
          ["for (int i = 0; i < n; i++)", "Repeat a known number of times"],
          ["for (var item in list)", "Go through every item in a List"],
          ["while (condition)", "Repeat until a condition becomes false"],
        ],
      },
      code: {
        label: "Three loop styles",
        content: `void main() {
  for (int i = 1; i <= 3; i++) {
    print("Message " + i.toString());
  }

  List<String> chats = ["Hi!", "How are you?", "Good, thanks!"];
  for (var msg in chats) {
    print(msg);
  }

  int health = 3;
  while (health > 0) {
    print("Health: " + health.toString());
    health = health - 1;
  }
}`,
      },
      tip: "In a while loop, always make sure something inside eventually makes the condition false — otherwise your program will loop forever.",
      warning: "Do not forget to update your loop counter (like i++) in a for loop — missing it can cause an endless loop that freezes your app.",
      practice: {
        level1: "Write a for loop that prints numbers 1 to 5.",
        level2: "Loop through a List<String> of three fruit names and print each one.",
        level3: "Write a while loop that counts down from 5 to 1, printing each number.",
      },
      summary:
        "for loops are great for known repeat counts or lists, while while loops repeat until a condition changes.",
      next: "Next, you will learn how to group reusable code into functions.",
      quiz: {
        q: "Which loop is best when you want to go through every item in a List?",
        options: [
          "for (var item in list)",
          "while (true) with no condition change",
          "A loop is never needed for lists",
          "switch (list)",
        ],
        answer: 0,
        explain: "The for-in loop style is designed specifically for iterating through every item in a List.",
      },
      quiz2: {
        q: "What is the biggest risk of a while loop if you forget to change the condition inside it?",
        options: [
          "The loop can run forever (an infinite loop)",
          "The app automatically stops it after 1 second",
          "Dart refuses to compile the code at all",
          "Nothing, while loops always stop safely by default",
        ],
        answer: 0,
        explain: "If the condition never becomes false, a while loop keeps running forever, which can freeze your app.",
      },
      challenge: {
        title: "Countdown loop",
        desc: "Write a while loop that prints numbers from 5 down to 1, then prints 'Go!' after the loop.",
        starter: `void main() {
  int count = 5;
  // write a while loop that counts down, then prints "Go!"
}`,
        solution: `void main() {
  int count = 5;
  while (count > 0) {
    print(count.toString());
    count = count - 1;
  }
  print("Go!");
}`,
        keywords: [
          { label: "Uses while", hint: "while (...)", pattern: "while\\s*\\(" },
          { label: "Changes the counter", hint: "count = count - 1", pattern: "count\\s*(=|-=|\\+\\+|--)" },
          { label: "Prints Go!", hint: "print(\"Go!\")", pattern: "Go!" },
        ],
      },
      outcomes: [
        "Write a for loop to repeat an action a known number of times",
        "Loop through a List using for-in",
        "Write a while loop and avoid infinite loops",
      ],
    },
    {
      title: "Functions, Lists, and Maps",
      xp: 15,
      def:
        "A **function** is a reusable block of code with a name, that can take inputs (parameters) and give back an output (return value). A **List** is an ordered group of values, and a **Map** stores values under named keys, like a labeled dictionary.",
      example:
        "A calculator app has a function `add(a, b)` that it reuses many times. A to-do app keeps all tasks in a List<String>, and a user profile might be stored in a Map with keys like 'name' and 'email'.",
      learn: [
        "How to define and call a function with parameters and a return value",
        "How to create and use a List<Type>",
        "How to create and use a Map<KeyType, ValueType>",
      ],
      scenario:
        "Think of it like this: a function is a recipe card you can reuse any time you want that dish. A List is a shopping list in order. A Map is a labeled spice rack — you grab 'salt' by name instead of searching through every jar.",
      visual: {
        kind: "table",
        title: "Three building blocks",
        columns: ["Concept", "Looks like", "Example"],
        rows: [
          ["Function", "name(parameters) { ... return value; }", "int add(int a, int b)"],
          ["List", "List<Type> name = [...]", "List<String> tasks = [\"Buy milk\"]"],
          ["Map", "Map<Key, Value> name = {...}", "{\"name\": \"Ali\", \"age\": 20}"],
        ],
      },
      code: {
        label: "Function, List, and Map together",
        content: `int add(int a, int b) {
  return a + b;
}

void main() {
  print(add(3, 4));

  List<String> tasks = ["Buy milk", "Walk dog", "Study Dart"];
  tasks.add("Build an app");
  for (var task in tasks) {
    print("- " + task);
  }

  Map<String, String> profile = {
    "name": "Ali",
    "email": "ali@example.com",
  };
  print(profile["name"]);
}`,
      },
      tip: "Give functions clear, verb-based names like calculateTotal() or sendMessage() — it makes your code almost read like English.",
      warning: "Do not forget that List and Map indexes/keys must exist before you read them — accessing a Map key that was never set returns null, which can cause errors later.",
      practice: {
        level1: "Write a function multiply(a, b) that returns a times b.",
        level2: "Create a List<String> of 3 favorite movies and add a 4th using .add().",
        level3: "Create a Map<String, int> of 3 products and their prices, then print each product with its price.",
      },
      summary:
        "Functions package reusable logic, Lists store ordered groups of values, and Maps store values under named keys.",
      next: "Next, you will learn about null safety and how Dart helps you avoid crashes from missing values.",
      quiz: {
        q: "What is the main purpose of a function in Dart?",
        options: [
          "To package reusable code that can take inputs and return a result",
          "To store a single text value only",
          "To delete variables from memory",
          "To automatically create a Flutter widget",
        ],
        answer: 0,
        explain: "Functions let you reuse logic by giving it a name, inputs, and (optionally) a return value.",
      },
      quiz2: {
        q: "A user profile has a name, email, and age. Which Dart structure fits best?",
        options: [
          "A Map, since each value has a clear named key",
          "A single int variable",
          "A switch statement",
          "A while loop",
        ],
        answer: 0,
        explain: "Maps are ideal when each value needs a clear label (key), like 'name' or 'email'.",
      },
      challenge: {
        title: "Build a mini profile",
        desc: "Write a function greet(name) that returns a greeting, then create a Map with a name and age, and print a greeting using the map's name.",
        starter: `String greet(String name) {
  // return a greeting string
}

void main() {
  Map<String, dynamic> profile = {"name": "Sara", "age": 22};
  // call greet with profile["name"] and print it
}`,
        solution: `String greet(String name) {
  return "Hello, " + name + "!";
}

void main() {
  Map<String, dynamic> profile = {"name": "Sara", "age": 22};
  print(greet(profile["name"]));
}`,
        keywords: [
          { label: "Defines a function", hint: "String greet(", pattern: "String\\s+greet\\s*\\(" },
          { label: "Uses a Map", hint: "Map<String, dynamic>", pattern: "Map<" },
          { label: "Calls greet", hint: "greet(...)", pattern: "greet\\s*\\(" },
        ],
      },
      outcomes: [
        "Define and call a function with parameters and a return value",
        "Create and use a List to store ordered values",
        "Create and use a Map to store labeled values",
      ],
    },
    {
      title: "Null Safety and Handling Errors",
      xp: 15,
      def:
        "**Null safety** means Dart forces you to be clear about which variables are allowed to be empty (**null**) and which must always have a value. **Exceptions** are errors that happen while your program runs, and `try/catch` lets you handle them gracefully instead of crashing.",
      example:
        "A profile screen might have an optional nickname (`String? nickname`) that can be null, but the user's main name should never be null. If a network call fails, wrapping it in try/catch stops the whole app from crashing and lets you show a friendly error message instead.",
      learn: [
        "The difference between String and String? (nullable types)",
        "How the ?? and ! operators help work with nullable values",
        "How to use try/catch to handle errors safely",
      ],
      scenario:
        "Think of it like this: a nullable variable (String?) is like a mailbox that is allowed to be empty. A non-nullable variable (String) is a mailbox that must always have mail inside — Dart will not let you forget to fill it.",
      visual: {
        kind: "table",
        title: "Null safety quick reference",
        columns: ["Symbol", "Meaning"],
        rows: [
          ["String?", "This value is allowed to be null"],
          ["??", "Use this value if the left side is null"],
          ["!", "I am sure this is not null (use carefully)"],
        ],
      },
      code: {
        label: "Null safety and try/catch",
        content: `void main() {
  String? nickname;
  print(nickname ?? "No nickname set");

  try {
    int result = 10 ~/ 0; // integer division by zero throws an error
    print(result);
  } catch (e) {
    print("Something went wrong: " + e.toString());
  }
}`,
      },
      tip: "Prefer the ?? operator to give a safe default value instead of using ! everywhere — ! can still crash your app if you are wrong.",
      warning: "Do not wrap your entire app in one giant try/catch 'just in case' — only wrap the specific risky code, like network calls or parsing, so real bugs are still visible.",
      practice: {
        level1: "Create a String? variable with no value and print it using ?? with a default message.",
        level2: "Write a try/catch block around code that converts the text 'abc' into an int (this will fail) and print a friendly error.",
        level3: "Write a function that takes an int? age parameter and returns 'Unknown' if it is null, or the age as text otherwise.",
      },
      summary:
        "Null safety helps you avoid crashes from missing values, and try/catch lets your app handle unexpected errors gracefully.",
      next: "Next chapter, you will move into Dart's object-oriented side: classes, inheritance, and async programming.",
      quiz: {
        q: "What does adding a '?' after a type, like String?, mean in Dart?",
        options: [
          "This variable is allowed to hold null",
          "This variable must always have a value",
          "This creates a new widget",
          "It makes the variable a constant",
        ],
        answer: 0,
        explain: "The ? marks a type as nullable, meaning the variable is allowed to be null.",
      },
      quiz2: {
        q: "Why use try/catch around code that might fail, like parsing user input into a number?",
        options: [
          "To handle the error gracefully instead of crashing the whole app",
          "To make the code run faster",
          "To automatically fix any bug in the code",
          "try/catch is only used for printing text",
        ],
        answer: 0,
        explain: "try/catch lets you catch runtime errors and respond safely, such as showing a friendly message.",
      },
      challenge: {
        title: "Safe age reader",
        desc: "Write a function safeAge(int? age) that returns 'Unknown' when age is null, or the age as a String otherwise. Call it with null and with 25.",
        starter: `String safeAge(int? age) {
  // return "Unknown" if age is null, otherwise return age as text
}

void main() {
  print(safeAge(null));
  print(safeAge(25));
}`,
        solution: `String safeAge(int? age) {
  if (age == null) {
    return "Unknown";
  }
  return age.toString();
}

void main() {
  print(safeAge(null));
  print(safeAge(25));
}`,
        keywords: [
          { label: "Uses a nullable type", hint: "int? age", pattern: "int\\?\\s+\\w+" },
          { label: "Checks for null", hint: "age == null", pattern: "==\\s*null" },
          { label: "Returns a value", hint: "return ...", pattern: "return\\s+" },
        ],
      },
      outcomes: [
        "Explain the difference between nullable and non-nullable types",
        "Use ?? to provide a safe default value",
        "Use try/catch to handle runtime errors",
      ],
    },
  ],
};
