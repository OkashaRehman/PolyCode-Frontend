// Chapter 4 — Dart Intermediate (Object-Oriented Programming)

export const CH_DART_OOP = {
  id: "dart-oop",
  title: "Dart Intermediate",
  icon: "boxes",
  color: "#0d47a1",
  lessons: [
    {
      title: "Classes and Objects",
      xp: 15,
      def:
        "A **class** is a blueprint for creating things with the same shape, like a cookie cutter. An **object** is one actual thing made from that blueprint. Classes group related data and behavior together.",
      example:
        "In a chat app, you might have a `Message` class with fields like `sender` and `text`. Every actual chat bubble on screen is an **object** created from that one Message blueprint.",
      learn: [
        "How to define a class with fields and a constructor",
        "How to create (instantiate) an object from a class",
        "How to add a method (function) inside a class",
      ],
      scenario:
        "Think of it like this: a class is like a form template for 'Student ID cards' — it defines what fields exist (name, roll number). Each printed ID card is an object made from that template, with its own actual values filled in.",
      visual: {
        kind: "table",
        title: "Class vs object",
        columns: ["Term", "Meaning", "Example"],
        rows: [
          ["Class", "The blueprint/template", "class Message { ... }"],
          ["Object", "One real thing built from the class", "Message(\"Ali\", \"Hi!\")"],
          ["Method", "A function that belongs to a class", "msg.preview()"],
        ],
      },
      code: {
        label: "A Message class with a method",
        content: `class Message {
  String sender;
  String text;

  Message(this.sender, this.text);

  String preview() {
    return sender + ": " + text;
  }
}

void main() {
  Message msg1 = Message("Ali", "Hey, are you free?");
  Message msg2 = Message("Sara", "Yes! What's up?");

  print(msg1.preview());
  print(msg2.preview());
}`,
      },
      tip: "Give classes singular, noun-based names like Message or User, not plural names like Messages.",
      warning: "Do not confuse the class (the blueprint) with an object (one instance). You can create many objects from a single class, each with different data.",
      practice: {
        level1: "Create a Task class with a title field and a constructor.",
        level2: "Add a method to Task called describe() that returns a sentence using the title.",
        level3: "Create 3 Task objects with different titles and print each one's describe() output.",
      },
      summary:
        "Classes define a blueprint with fields and methods, and objects are the actual items you create from that blueprint.",
      next: "Next, you will learn how classes can inherit behavior from other classes using inheritance and mixins.",
      quiz: {
        q: "What is the difference between a class and an object?",
        options: [
          "A class is the blueprint; an object is one real thing built from it",
          "A class and an object are exactly the same thing",
          "An object is always bigger than a class",
          "Classes cannot have methods, only objects can",
        ],
        answer: 0,
        explain: "A class defines the shape (fields and methods); objects are the individual instances created from it.",
      },
      quiz2: {
        q: "A chat app has many chat bubbles, each built from a Message class. What are those chat bubbles called?",
        options: [
          "Objects (instances) of the Message class",
          "They are also classes, not objects",
          "They are functions",
          "They are variables with no type",
        ],
        answer: 0,
        explain: "Each chat bubble is an object — one instance created from the Message class blueprint.",
      },
      challenge: {
        title: "Build a Task class",
        desc: "Create a Task class with a title field, a constructor, and a method describe() returning a sentence. Create two Task objects and print their descriptions.",
        starter: `class Task {
  // add a title field and constructor
  // add a describe() method
}

void main() {
  // create two Task objects and print describe()
}`,
        solution: `class Task {
  String title;
  Task(this.title);

  String describe() {
    return "Task: " + title;
  }
}

void main() {
  Task t1 = Task("Buy groceries");
  Task t2 = Task("Finish homework");
  print(t1.describe());
  print(t2.describe());
}`,
        keywords: [
          { label: "Defines a class", hint: "class Task", pattern: "class\\s+Task" },
          { label: "Has a constructor", hint: "Task(this.title)", pattern: "Task\\s*\\(" },
          { label: "Creates objects", hint: "Task(...)", pattern: "Task\\s*\\(" },
        ],
      },
      outcomes: [
        "Define a class with fields, a constructor, and a method",
        "Create multiple objects from the same class",
        "Explain the difference between a class and an object",
      ],
    },
    {
      title: "Inheritance and Mixins",
      xp: 15,
      def:
        "**Inheritance** lets a class reuse and extend another class's fields and methods using `extends`. A **mixin** lets you share a chunk of behavior across different classes that are not related by inheritance, using `with`.",
      example:
        "An app might have a general `Animal` class, and a `Dog` class that `extends Animal` to add dog-specific behavior. Separately, both a `Bird` and an `Airplane` class could use a `CanFly` mixin, even though a bird and an airplane are not related classes.",
      learn: [
        "How to use extends to create a subclass",
        "How @override lets a subclass change inherited behavior",
        "How mixins (with) share code across unrelated classes",
      ],
      scenario:
        "Think of it like this: inheritance is like a child inheriting their parent's last name and some habits automatically. A mixin is more like learning a skill (such as swimming) that is shared by many different kinds of things — fish, humans, and dogs — without them all being 'related'.",
      visual: {
        kind: "table",
        title: "Inheritance vs mixin",
        columns: ["Tool", "Keyword", "Use case"],
        rows: [
          ["Inheritance", "extends", "A clear 'is-a' relationship, like Dog is an Animal"],
          ["Mixin", "with", "Shared behavior across unrelated classes"],
        ],
      },
      code: {
        label: "extends and with together",
        content: `class Animal {
  String name;
  Animal(this.name);

  void describe() {
    print(name + " is an animal.");
  }
}

class Dog extends Animal {
  Dog(String name) : super(name);

  @override
  void describe() {
    print(name + " is a dog that can bark.");
  }
}

mixin CanSwim {
  void swim() {
    print("Swimming fast!");
  }
}

class Fish with CanSwim {}

void main() {
  Dog d = Dog("Rex");
  d.describe();

  Fish f = Fish();
  f.swim();
}`,
      },
      tip: "Use extends only when there is a true 'is-a' relationship. If two unrelated classes just need the same small ability, a mixin is cleaner.",
      warning: "Do not forget @override when changing an inherited method — without it, small typos in the method name can silently create a brand-new method instead of replacing the old one.",
      practice: {
        level1: "Create a Shape class with a describe() method, then a Circle class that extends it.",
        level2: "Override describe() in Circle to print something specific about circles.",
        level3: "Create a mixin called Loud with a shout() method, and use it in two unrelated classes.",
      },
      summary:
        "Inheritance (extends) builds a clear parent-child relationship, while mixins (with) share small reusable behaviors across unrelated classes.",
      next: "Next, you will learn about enums and generics for writing safer, more flexible Dart code.",
      quiz: {
        q: "When should you prefer a mixin over inheritance?",
        options: [
          "When unrelated classes need to share the same small behavior",
          "Only when there is a clear parent-child relationship",
          "Mixins can never be used with classes",
          "When you want to delete a class entirely",
        ],
        answer: 0,
        explain: "Mixins are ideal for sharing behavior across classes that are not naturally related by inheritance.",
      },
      quiz2: {
        q: "In the Dog class example, what does '@override' signal to other developers?",
        options: [
          "This method intentionally replaces a method from the parent class",
          "This method can never be called",
          "This class has no parent class",
          "This method is private and hidden",
        ],
        answer: 0,
        explain: "@override marks that a subclass method is intentionally replacing an inherited method.",
      },
      challenge: {
        title: "Shapes with inheritance",
        desc: "Create a Shape class with a describe() method, and a Circle class that extends Shape and overrides describe().",
        starter: `class Shape {
  // add a describe() method
}

class Circle extends Shape {
  // override describe()
}

void main() {
  // create a Circle and call describe()
}`,
        solution: `class Shape {
  void describe() {
    print("I am a shape.");
  }
}

class Circle extends Shape {
  @override
  void describe() {
    print("I am a circle.");
  }
}

void main() {
  Circle c = Circle();
  c.describe();
}`,
        keywords: [
          { label: "Uses extends", hint: "class Circle extends Shape", pattern: "extends\\s+Shape" },
          { label: "Uses @override", hint: "@override", pattern: "@override" },
          { label: "Calls describe", hint: "describe()", pattern: "describe\\s*\\(" },
        ],
      },
      outcomes: [
        "Create a subclass using extends",
        "Override an inherited method with @override",
        "Use a mixin to share behavior across unrelated classes",
      ],
    },
    {
      title: "Enums and Generics",
      xp: 15,
      def:
        "An **enum** is a fixed, named list of possible values, like days of the week or order statuses. **Generics** let you write one flexible class or function that works with different types, using a placeholder like `<T>`.",
      example:
        "An online shop might use an enum `OrderStatus { pending, shipped, delivered }` instead of plain text, to avoid typos like 'Shiped'. A generic `Box<T>` class could hold a String, an int, or a custom object, all using the same reusable code.",
      learn: [
        "How to define and use an enum",
        "Why enums are safer than plain strings for fixed options",
        "How a generic class or function uses <T> to work with any type",
      ],
      scenario:
        "Think of it like this: an enum is like a multiple-choice question with fixed answers (A, B, C, D) — you cannot accidentally write 'E'. Generics are like a universal shipping box that can be resized to fit a book, a shirt, or a toy, while still following the same packing rules.",
      visual: {
        kind: "table",
        title: "Enum vs generic",
        columns: ["Concept", "Solves"],
        rows: [
          ["enum", "A fixed set of named options, avoiding typo mistakes"],
          ["Generic <T>", "One reusable class/function that works with many types"],
        ],
      },
      code: {
        label: "Enum and a simple generic class",
        content: `enum OrderStatus { pending, shipped, delivered }

class Box<T> {
  T content;
  Box(this.content);

  void show() {
    print("Box contains: " + content.toString());
  }
}

void main() {
  OrderStatus status = OrderStatus.shipped;
  print("Status: " + status.toString());

  Box<String> stringBox = Box("Book");
  Box<int> intBox = Box(42);

  stringBox.show();
  intBox.show();
}`,
      },
      tip: "Use enums any time you have a known, limited list of options — it stops bugs caused by typing the wrong text by hand.",
      warning: "Do not try to add a value to an enum at runtime — enum values are fixed when you write the code, not something you can change while the app runs.",
      practice: {
        level1: "Create an enum UserRole with values admin, member, and guest.",
        level2: "Write a function that takes a UserRole and prints a different message for each value using switch.",
        level3: "Create a generic class Pair<T> that stores two values of the same type and has a method to print both.",
      },
      summary:
        "Enums give you safe, fixed sets of options, and generics let you write one flexible piece of code that works with many types.",
      next: "Next, you will learn how async and await let Dart handle tasks that take time, like loading data.",
      quiz: {
        q: "Why use an enum instead of plain String values for something like order status?",
        options: [
          "Enums prevent typo mistakes by limiting values to a fixed, known set",
          "Enums make the app automatically faster at drawing pixels",
          "Enums can hold any possible text value, with no limits",
          "Enums are only usable inside widgets",
        ],
        answer: 0,
        explain: "Enums restrict a value to a known, fixed set, which avoids typo-related bugs that plain strings can cause.",
      },
      quiz2: {
        q: "What is the main benefit of a generic class like Box<T>?",
        options: [
          "One class definition can safely work with many different types",
          "It forces every box to only ever hold integers",
          "It removes the need for any class definition at all",
          "It makes variables always nullable",
        ],
        answer: 0,
        explain: "Generics let you reuse the same class or function logic safely across different types.",
      },
      challenge: {
        title: "Role-based greeting",
        desc: "Create an enum UserRole (admin, member, guest), write a function greetByRole that returns a different message for each role using switch.",
        starter: `enum UserRole { admin, member, guest }

String greetByRole(UserRole role) {
  // return a different greeting for each role
}

void main() {
  print(greetByRole(UserRole.admin));
}`,
        solution: `enum UserRole { admin, member, guest }

String greetByRole(UserRole role) {
  switch (role) {
    case UserRole.admin:
      return "Welcome, admin!";
    case UserRole.member:
      return "Welcome back, member!";
    default:
      return "Welcome, guest!";
  }
}

void main() {
  print(greetByRole(UserRole.admin));
}`,
        keywords: [
          { label: "Defines an enum", hint: "enum UserRole", pattern: "enum\\s+UserRole" },
          { label: "Uses switch", hint: "switch (...)", pattern: "switch\\s*\\(" },
          { label: "Returns a greeting", hint: "return ...", pattern: "return\\s+" },
        ],
      },
      outcomes: [
        "Define and use an enum for a fixed set of options",
        "Explain why enums are safer than plain text values",
        "Use a generic class or function with a type placeholder",
      ],
    },
    {
      title: "Async and Await",
      xp: 15,
      def:
        "Some tasks, like loading data from the internet, take time. **async** marks a function as able to pause and wait, and **await** pauses it until a slow task finishes, without freezing the rest of your app.",
      example:
        "When you open a weather app, it does not freeze the whole screen while fetching today's temperature — it shows a loading spinner, waits (await) for the data, and then updates the screen once it arrives.",
      learn: [
        "What a Future represents in Dart",
        "How to mark a function as async",
        "How await pauses only that function, not the whole app",
      ],
      scenario:
        "Think of it like this: ordering food at a restaurant is async. You place your order (start the task), do other things while waiting (the app stays responsive), and await is like the waiter bringing your food the moment it is ready.",
      visual: {
        kind: "table",
        title: "Async vocabulary",
        columns: ["Word", "Plain meaning"],
        rows: [
          ["Future<T>", "A promise of a value of type T that will arrive later"],
          ["async", "Marks a function as one that can pause and wait"],
          ["await", "Pauses until a Future finishes, then continues"],
        ],
      },
      code: {
        label: "A simple async function",
        content: `Future<String> fetchWeather() async {
  await Future.delayed(Duration(seconds: 2));
  return "Sunny, 28°C";
}

void main() async {
  print("Loading weather...");
  String weather = await fetchWeather();
  print("Weather: " + weather);
}`,
      },
      tip: "Any function that uses await inside it must itself be marked async.",
      warning: "Do not forget to add await before calling an async function if you need its result right away — without await, you get a Future object instead of the actual value.",
      practice: {
        level1: "Write an async function fetchName() that waits 1 second and returns a String name.",
        level2: "Call fetchName() using await inside main() and print the result.",
        level3: "Write a second async function that depends on the result of the first one, called one after another.",
      },
      summary:
        "async and await let your app wait for slow tasks like data loading without freezing the rest of the screen.",
      next: "Next, you will get a gentle introduction to Streams, which handle values that arrive over time, repeatedly.",
      quiz: {
        q: "What does the keyword 'await' do inside an async function?",
        options: [
          "Pauses that function until a Future finishes, then continues",
          "Immediately stops the whole app",
          "Deletes the Future object",
          "Converts a String into an int",
        ],
        answer: 0,
        explain: "await pauses the async function at that line until the awaited Future completes.",
      },
      quiz2: {
        q: "A weather app calls fetchWeather() without using 'await'. What happens?",
        options: [
          "You get a Future object instead of the actual weather String right away",
          "The app crashes immediately",
          "The weather always shows as 'Sunny'",
          "Nothing changes, await has no effect ever",
        ],
        answer: 0,
        explain: "Without await, you receive the Future itself, not the resolved value — you need await to 'unwrap' it.",
      },
      challenge: {
        title: "Fetch a username",
        desc: "Write an async function fetchUsername() that waits briefly then returns a String, and call it with await inside main().",
        starter: `Future<String> fetchUsername() async {
  // wait, then return a username
}

void main() async {
  // call fetchUsername with await and print the result
}`,
        solution: `Future<String> fetchUsername() async {
  await Future.delayed(Duration(seconds: 1));
  return "quantum_user";
}

void main() async {
  String name = await fetchUsername();
  print(name);
}`,
        keywords: [
          { label: "Marks function async", hint: "async", pattern: "async" },
          { label: "Uses await", hint: "await", pattern: "await" },
          { label: "Returns a Future<String>", hint: "Future<String>", pattern: "Future<String>" },
        ],
      },
      outcomes: [
        "Explain what a Future represents",
        "Write an async function and use await inside it",
        "Call an async function correctly from main()",
      ],
    },
    {
      title: "A Gentle Intro to Streams",
      xp: 15,
      def:
        "A **Stream** is like a Future, but instead of giving you one value once, it can give you **many values over time**. Streams are perfect for things that keep updating, like live chat messages or a counter that ticks every second.",
      example:
        "In a chat app like QuantumChat, new messages keep arriving while the screen is open. Instead of asking 'is there a new message?' repeatedly, the screen listens to a Stream of messages and reacts every time a new one arrives.",
      learn: [
        "The difference between a Future (one value) and a Stream (many values over time)",
        "How to listen to a Stream using listen() or a loop",
        "Where Streams are commonly used in real apps",
      ],
      scenario:
        "Think of it like this: a Future is like a single package delivered to your door once. A Stream is like a subscription box — new items keep arriving over time, and you keep receiving them as long as you are subscribed.",
      visual: {
        kind: "table",
        title: "Future vs Stream",
        columns: ["Type", "Gives you", "Example use"],
        rows: [
          ["Future<T>", "One value, once", "Loading a user's profile once"],
          ["Stream<T>", "Many values, over time", "Live chat messages, a ticking clock"],
        ],
      },
      code: {
        label: "Listening to a simple Stream",
        content: `Stream<int> countUp() async* {
  for (int i = 1; i <= 3; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

void main() async {
  Stream<int> numbers = countUp();
  numbers.listen((value) {
    print("New number: " + value.toString());
  });
}`,
      },
      tip: "Use a Stream whenever you expect more than one update over time, like messages, live scores, or sensor readings.",
      warning: "Do not forget to cancel a Stream subscription (using the object returned by listen()) when a screen is closed, to avoid wasting memory or getting updates for a screen that no longer exists.",
      practice: {
        level1: "Explain, in your own words, the difference between a Future and a Stream.",
        level2: "Write a Stream<String> that yields three fixed chat messages, one per second.",
        level3: "Listen to that Stream and print each message as it arrives, along with a message count.",
      },
      summary:
        "Streams deliver many values over time, which makes them perfect for live, repeatedly-updating data like chat messages.",
      next: "Next chapter, you will explore the anatomy of a real Flutter project — main.dart, MaterialApp, and more.",
      quiz: {
        q: "What is the key difference between a Future and a Stream?",
        options: [
          "A Future gives one value once; a Stream can give many values over time",
          "A Stream can only ever give exactly one value",
          "A Future and a Stream are exactly the same thing",
          "Futures are used only for images",
        ],
        answer: 0,
        explain: "Futures resolve once with a single value; Streams can emit multiple values across time.",
      },
      quiz2: {
        q: "Which situation is the best fit for a Stream rather than a Future?",
        options: [
          "Receiving live chat messages that keep arriving while a screen is open",
          "Loading a single user profile exactly once when a screen opens",
          "Reading one configuration value from a file",
          "Checking if a password is correct one single time",
        ],
        answer: 0,
        explain: "Live, repeatedly-updating data like chat messages fits a Stream perfectly, since values keep arriving over time.",
      },
      challenge: {
        title: "Stream of greetings",
        desc: "Write a Stream<String> function that yields 3 greeting messages, one per second, and listen to it in main() printing each one.",
        starter: `Stream<String> greetings() async* {
  // yield 3 greeting messages, one per second
}

void main() {
  // listen to greetings() and print each message
}`,
        solution: `Stream<String> greetings() async* {
  yield "Hi!";
  await Future.delayed(Duration(seconds: 1));
  yield "Welcome!";
  await Future.delayed(Duration(seconds: 1));
  yield "Enjoy the app!";
}

void main() {
  greetings().listen((msg) {
    print(msg);
  });
}`,
        keywords: [
          { label: "Returns a Stream", hint: "Stream<String>", pattern: "Stream<String>" },
          { label: "Uses yield", hint: "yield ...", pattern: "yield" },
          { label: "Listens to the stream", hint: ".listen(...)", pattern: "\\.listen\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain the difference between a Future and a Stream",
        "Write a simple Stream using async* and yield",
        "Listen to a Stream and react to each new value",
      ],
    },
  ],
};
