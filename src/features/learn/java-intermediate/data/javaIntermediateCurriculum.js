// PolyCode — Java Intermediate interactive course
// 6 chapters · 16 lessons · real javac/java execution via backend
// All challenge classes MUST be named "Solution" (backend writes Solution.java)

const ACCENT = "#f59e0b";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return { type: "text", content, code: { lang: "java", ...codeBlock } };
  }
  return { type: "text", content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

export const JAVA_INTERMEDIATE_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — OOP Deep Dive
  // ─────────────────────────────────────────────────────────────
  {
    id: "oop-deep",
    title: "OOP Deep Dive",
    icon: "🧱",
    color: ACCENT,
    lessons: [
      {
        id: "int-0",
        title: "Abstract Classes",
        xp: 20,
        theory: [
          text(
            "An **abstract class** cannot be instantiated — it exists only to be extended. It can have both abstract methods (no body, must be overridden) and concrete methods (with body, inherited as-is).",
            {
              label: "Abstract class",
              content: `public abstract class Shape {
    protected String color;

    public Shape(String color) { this.color = color; }

    // Abstract — subclasses MUST implement
    public abstract double area();
    public abstract double perimeter();

    // Concrete — subclasses inherit this
    public void describe() {
        System.out.printf("%s: area=%.2f perimeter=%.2f%n",
            color, area(), perimeter());
    }
}

public class Circle extends Shape {
    private double radius;
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    @Override public double area() { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
}`,
            },
          ),
          diagram("Abstract vs Concrete", [
            {
              id: "abstract",
              label: "Abstract Class",
              color: ACCENT,
              items: [
                "Cannot be instantiated",
                "Can have abstract methods",
                "Can have concrete methods",
                "Subclasses must implement abstract methods",
              ],
            },
            {
              id: "concrete",
              label: "Concrete Class",
              color: "#22c55e",
              items: [
                "Can be instantiated with new",
                "All methods have bodies",
                "Can extend abstract class",
                "Must implement all abstract methods",
              ],
            },
          ]),
          callout(
            "tip",
            "Use abstract classes when subclasses share common code (like describe()) but must provide their own implementation of key behaviour (like area()).",
          ),
          quiz(
            "Can you create an instance of an abstract class?",
            [
              "Yes, using new",
              "No, only subclasses can be instantiated",
              "Yes, but only with a factory",
              "Only if it has no abstract methods",
            ],
            1,
            "Abstract classes cannot be instantiated directly. You must extend them and implement all abstract methods first.",
          ),
        ],
        challenge: {
          title: "Animal Hierarchy",
          description: [
            {
              type: "text",
              content:
                "Create an abstract Animal class with abstract makeSound() and concrete breathe() that prints 'Breathing...'. Implement Dog and Cat subclasses. In main, call both methods on each.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Breathing...
Woof!
Breathing...
Meow!`,
            },
          ],
          starterCode: `public class Solution {
    abstract static class Animal {
        // Add abstract makeSound() and concrete breathe()

    }

    static class Dog extends Animal {
        @Override
        public void makeSound() {
            // print "Woof!"

        }
    }

    static class Cat extends Animal {
        @Override
        public void makeSound() {
            // print "Meow!"

        }
    }

    public static void main(String[] args) {
        Animal dog = new Dog();
        Animal cat = new Cat();
        dog.breathe();
        dog.makeSound();
        cat.breathe();
        cat.makeSound();
    }
}`,
          solutionCode: `public class Solution {
    abstract static class Animal {
        public abstract void makeSound();
        public void breathe() { System.out.println("Breathing..."); }
    }

    static class Dog extends Animal {
        @Override public void makeSound() { System.out.println("Woof!"); }
    }

    static class Cat extends Animal {
        @Override public void makeSound() { System.out.println("Meow!"); }
    }

    public static void main(String[] args) {
        Animal dog = new Dog();
        Animal cat = new Cat();
        dog.breathe();
        dog.makeSound();
        cat.breathe();
        cat.makeSound();
    }
}`,
          tests: [
            {
              id: 1,
              label: "Animal is abstract",
              hint: "abstract static class Animal",
              keywords: [{ pattern: "abstract.*class\\s+Animal" }],
            },
            {
              id: 2,
              label: "makeSound() is abstract",
              hint: "public abstract void makeSound();",
              keywords: [{ pattern: "abstract.*makeSound" }],
            },
            {
              id: 3,
              label: "breathe() prints 'Breathing...'",
              hint: 'System.out.println("Breathing...")',
              keywords: [{ pattern: "Breathing\\.\\.\\." }],
            },
            {
              id: 4,
              label: "Dog and Cat override makeSound()",
              hint: "@Override public void makeSound()",
              keywords: [{ pattern: "@Override" }],
            },
          ],
        },
      },

      {
        id: "int-1",
        title: "Polymorphism in Depth",
        xp: 20,
        theory: [
          text(
            "**Polymorphism** means 'many forms'. The same method call behaves differently depending on the actual object type at runtime. This is called **dynamic dispatch** or **runtime polymorphism**.",
            {
              label: "Runtime polymorphism",
              content: `abstract static class Payment {
    protected double amount;
    Payment(double amount) { this.amount = amount; }
    public abstract void process();
    public void printReceipt() {
        System.out.printf("Payment of $%.2f processed.%n", amount);
    }
}

static class CreditCard extends Payment {
    CreditCard(double amount) { super(amount); }
    @Override public void process() {
        System.out.println("Charging credit card $" + amount);
    }
}

static class PayPal extends Payment {
    PayPal(double amount) { super(amount); }
    @Override public void process() {
        System.out.println("Sending via PayPal $" + amount);
    }
}

// Polymorphic usage:
Payment[] payments = { new CreditCard(50), new PayPal(30) };
for (Payment p : payments) {
    p.process();       // calls the right version
    p.printReceipt();  // inherited from Payment
}`,
            },
          ),
          text(
            "**instanceof** and pattern matching (Java 16+) let you safely check and cast objects.",
            {
              label: "instanceof pattern matching",
              content: `Payment p = new CreditCard(100);

if (p instanceof CreditCard cc) {
    System.out.println("Credit card payment: $" + cc.amount);
} else if (p instanceof PayPal pp) {
    System.out.println("PayPal payment: $" + pp.amount);
}`,
            },
          ),
          callout(
            "info",
            "Polymorphism is what makes Java's collections so powerful — a List<Shape> can hold Circles, Rectangles, and Triangles, and calling area() on each gives the right result automatically.",
          ),
          quiz(
            "What determines which overridden method is called at runtime?",
            [
              "The declared type of the variable",
              "The actual type of the object",
              "The order of inheritance",
              "The method's access modifier",
            ],
            1,
            "Java uses the actual runtime type of the object (dynamic dispatch) to decide which overridden method to call, not the declared type of the variable.",
          ),
        ],
        challenge: {
          title: "Payment Processor",
          description: [
            {
              type: "text",
              content:
                "Create a Payment abstract class with process(). Add CreditCard and Bitcoin subclasses. Process an array of both types polymorphically and print total amount.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Processing credit card: $100.0
Processing bitcoin: $250.0
Total: $350.0`,
            },
          ],
          starterCode: `public class Solution {
    abstract static class Payment {
        double amount;
        Payment(double amount) { this.amount = amount; }
        public abstract void process();
    }

    static class CreditCard extends Payment {
        CreditCard(double amount) { super(amount); }
        @Override public void process() {
            System.out.println("Processing credit card: $" + amount);
        }
    }

    static class Bitcoin extends Payment {
        Bitcoin(double amount) { super(amount); }
        @Override public void process() {
            // print "Processing bitcoin: $X"

        }
    }

    public static void main(String[] args) {
        Payment[] payments = { new CreditCard(100), new Bitcoin(250) };
        double total = 0;
        for (Payment p : payments) {
            p.process();
            total += p.amount;
        }
        System.out.println("Total: $" + total);
    }
}`,
          solutionCode: `public class Solution {
    abstract static class Payment {
        double amount;
        Payment(double amount) { this.amount = amount; }
        public abstract void process();
    }

    static class CreditCard extends Payment {
        CreditCard(double amount) { super(amount); }
        @Override public void process() {
            System.out.println("Processing credit card: $" + amount);
        }
    }

    static class Bitcoin extends Payment {
        Bitcoin(double amount) { super(amount); }
        @Override public void process() {
            System.out.println("Processing bitcoin: $" + amount);
        }
    }

    public static void main(String[] args) {
        Payment[] payments = { new CreditCard(100), new Bitcoin(250) };
        double total = 0;
        for (Payment p : payments) {
            p.process();
            total += p.amount;
        }
        System.out.println("Total: $" + total);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Bitcoin extends Payment",
              hint: "static class Bitcoin extends Payment",
              keywords: [{ pattern: "Bitcoin\\s+extends\\s+Payment" }],
            },
            {
              id: 2,
              label: "Iterates array polymorphically",
              hint: "for (Payment p : payments)",
              keywords: [{ pattern: "for.*Payment.*payments" }],
            },
            {
              id: 3,
              label: "Accumulates total",
              hint: "total += p.amount",
              keywords: [{ pattern: "total\\s*\\+=" }],
            },
            {
              id: 4,
              label: "Prints total",
              hint: 'System.out.println("Total: $" + total)',
              keywords: [{ pattern: "Total" }],
            },
          ],
        },
      },

      {
        id: "int-2",
        title: "Enums",
        xp: 20,
        theory: [
          text(
            "An **enum** (enumeration) is a special type that defines a fixed set of named constants. Enums are type-safe — you can't accidentally pass an invalid value.",
            {
              label: "Basic enum",
              content: `enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

Day today = Day.WEDNESDAY;
System.out.println(today);           // WEDNESDAY
System.out.println(today.ordinal()); // 2 (zero-based index)
System.out.println(today.name());    // "WEDNESDAY"

// switch with enum
switch (today) {
    case SATURDAY, SUNDAY -> System.out.println("Weekend!");
    default -> System.out.println("Weekday");
}`,
            },
          ),
          text(
            "Enums can have **fields, constructors, and methods** — making them much more powerful than simple constants.",
            {
              label: "Enum with fields",
              content: `enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS  (4.869e+24, 6.0518e6),
    EARTH  (5.976e+24, 6.37814e6);

    private final double mass;
    private final double radius;
    static final double G = 6.67300E-11;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    double surfaceGravity() { return G * mass / (radius * radius); }
    double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}

System.out.printf("Weight on EARTH: %.2f%n",
    Planet.EARTH.surfaceWeight(75));`,
            },
          ),
          quiz(
            "What method returns all values of an enum?",
            ["getAll()", "values()", "list()", "entries()"],
            1,
            "Every enum has a static values() method that returns an array of all its constants in declaration order.",
          ),
        ],
        challenge: {
          title: "Traffic Light",
          description: [
            {
              type: "text",
              content:
                "Create a TrafficLight enum with RED, YELLOW, GREEN. Add a getDuration() method returning seconds (RED=30, YELLOW=5, GREEN=25). Print each light and its duration.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `RED: 30 seconds
YELLOW: 5 seconds
GREEN: 25 seconds`,
            },
          ],
          starterCode: `public class Solution {
    enum TrafficLight {
        RED(30), YELLOW(5), GREEN(25);

        private final int duration;
        TrafficLight(int duration) { this.duration = duration; }

        public int getDuration() {
            // return duration

        }
    }

    public static void main(String[] args) {
        for (TrafficLight light : TrafficLight.values()) {
            System.out.println(light + ": " + light.getDuration() + " seconds");
        }
    }
}`,
          solutionCode: `public class Solution {
    enum TrafficLight {
        RED(30), YELLOW(5), GREEN(25);

        private final int duration;
        TrafficLight(int duration) { this.duration = duration; }
        public int getDuration() { return duration; }
    }

    public static void main(String[] args) {
        for (TrafficLight light : TrafficLight.values()) {
            System.out.println(light + ": " + light.getDuration() + " seconds");
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines TrafficLight enum",
              hint: "enum TrafficLight { RED, YELLOW, GREEN }",
              keywords: [{ pattern: "enum\\s+TrafficLight" }],
            },
            {
              id: 2,
              label: "getDuration() returns the duration",
              hint: "return duration;",
              keywords: [{ pattern: "return\\s+duration" }],
            },
            {
              id: 3,
              label: "Uses values() to iterate",
              hint: "TrafficLight.values()",
              keywords: [{ pattern: "\\.values\\s*\\(\\s*\\)" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Interfaces and Generics
  // ─────────────────────────────────────────────────────────────
  {
    id: "interfaces-generics",
    title: "Interfaces and Generics",
    icon: "🔌",
    color: "#3b82f6",
    lessons: [
      {
        id: "int-3",
        title: "Advanced Interfaces",
        xp: 20,
        theory: [
          text(
            "Interfaces support **default methods** (Java 8+) — methods with a body that implementing classes can optionally override. This allows adding new methods to interfaces without breaking existing implementations.",
            {
              label: "Default and static methods",
              content: `interface Validator<T> {
    boolean validate(T value);   // abstract

    default boolean validateAndLog(T value) {   // default
        boolean result = validate(value);
        System.out.println("Validating " + value + ": " + result);
        return result;
    }

    static <T> Validator<T> of(java.util.function.Predicate<T> p) {
        return p::test;   // static factory
    }
}

Validator<String> emailCheck = s -> s.contains("@");
emailCheck.validateAndLog("user@example.com");  // true
emailCheck.validateAndLog("not-an-email");       // false`,
            },
          ),
          text(
            "**Functional interfaces** have exactly one abstract method and can be used with lambda expressions. The `@FunctionalInterface` annotation enforces this.",
            {
              label: "Functional interface + lambda",
              content: `@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

MathOperation add      = (a, b) -> a + b;
MathOperation multiply = (a, b) -> a * b;

System.out.println(add.operate(5, 3));       // 8
System.out.println(multiply.operate(5, 3));  // 15`,
            },
          ),
          quiz(
            "How many abstract methods can a @FunctionalInterface have?",
            ["0", "1", "2", "As many as needed"],
            1,
            "A functional interface must have exactly one abstract method. It can have any number of default or static methods.",
          ),
        ],
        challenge: {
          title: "Functional Calculator",
          description: [
            {
              type: "text",
              content:
                "Create a @FunctionalInterface called Operation with calculate(double a, double b). Use lambdas to implement add, subtract, multiply, divide. Print results for 10 and 3.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `13.0
7.0
30.0
3.3333333333333335`,
            },
          ],
          starterCode: `public class Solution {
    @FunctionalInterface
    interface Operation {
        double calculate(double a, double b);
    }

    public static void main(String[] args) {
        Operation add      = (a, b) -> a + b;
        Operation subtract = (a, b) -> a - b;
        // Add multiply and divide lambdas

        double a = 10, b = 3;
        System.out.println(add.calculate(a, b));
        System.out.println(subtract.calculate(a, b));
        // Print multiply and divide results

    }
}`,
          solutionCode: `public class Solution {
    @FunctionalInterface
    interface Operation {
        double calculate(double a, double b);
    }

    public static void main(String[] args) {
        Operation add      = (a, b) -> a + b;
        Operation subtract = (a, b) -> a - b;
        Operation multiply = (a, b) -> a * b;
        Operation divide   = (a, b) -> a / b;

        double a = 10, b = 3;
        System.out.println(add.calculate(a, b));
        System.out.println(subtract.calculate(a, b));
        System.out.println(multiply.calculate(a, b));
        System.out.println(divide.calculate(a, b));
    }
}`,
          tests: [
            {
              id: 1,
              label: "@FunctionalInterface annotation used",
              hint: "@FunctionalInterface",
              keywords: [{ pattern: "@FunctionalInterface" }],
            },
            {
              id: 2,
              label: "multiply lambda defined",
              hint: "(a, b) -> a * b",
              keywords: [{ pattern: "->\\s*a\\s*\\*\\s*b" }],
            },
            {
              id: 3,
              label: "divide lambda defined",
              hint: "(a, b) -> a / b",
              keywords: [{ pattern: "->\\s*a\\s*/\\s*b" }],
            },
            {
              id: 4,
              label: "All four results printed",
              hint: "System.out.println four times",
              keywords: [{ pattern: "System\\.out\\.println" }],
            },
          ],
        },
      },

      {
        id: "int-4",
        title: "Generics in Depth",
        xp: 25,
        theory: [
          text(
            "**Generic classes and methods** let you write type-safe code that works with any type. The compiler enforces type constraints at compile time, eliminating ClassCastException at runtime.",
            {
              label: "Generic stack",
              content: `public class Stack<T> {
    private java.util.ArrayList<T> items = new java.util.ArrayList<>();

    public void push(T item) { items.add(item); }

    public T pop() {
        if (isEmpty()) throw new RuntimeException("Stack empty");
        return items.remove(items.size() - 1);
    }

    public T peek() { return items.get(items.size() - 1); }
    public boolean isEmpty() { return items.isEmpty(); }
    public int size() { return items.size(); }
}

Stack<String> stack = new Stack<>();
stack.push("first");
stack.push("second");
System.out.println(stack.pop()); // second`,
            },
          ),
          text(
            "**Wildcards** give flexibility when the exact type doesn't matter. `? extends T` (upper bound) reads; `? super T` (lower bound) writes.",
            {
              label: "Bounded wildcards",
              content: `// Read from any list of Number or subtype
static double sum(java.util.List<? extends Number> list) {
    double total = 0;
    for (Number n : list) total += n.doubleValue();
    return total;
}

System.out.println(sum(java.util.List.of(1, 2, 3)));    // 6.0
System.out.println(sum(java.util.List.of(1.5, 2.5)));   // 4.0`,
            },
          ),
          quiz(
            "What does List<? extends Number> mean?",
            [
              "A list of exactly Number",
              "A list of Number or any subclass",
              "A list of Number or any superclass",
              "A list of any type",
            ],
            1,
            "? extends Number is an upper-bounded wildcard — accepts List<Integer>, List<Double>, List<Long>, etc., since they all extend Number.",
          ),
        ],
        challenge: {
          title: "Generic MinMax",
          description: [
            {
              type: "text",
              content:
                "Write a generic method findMin and findMax that work on any List<T extends Comparable<T>>. Test with List<Integer> and print min and max.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Min: 1
Max: 9`,
            },
          ],
          starterCode: `import java.util.List;

public class Solution {
    public static <T extends Comparable<T>> T findMin(List<T> list) {
        // Find and return the minimum element

    }

    public static <T extends Comparable<T>> T findMax(List<T> list) {
        // Find and return the maximum element

    }

    public static void main(String[] args) {
        List<Integer> nums = List.of(3, 1, 9, 2, 7, 4);
        System.out.println("Min: " + findMin(nums));
        System.out.println("Max: " + findMax(nums));
    }
}`,
          solutionCode: `import java.util.List;

public class Solution {
    public static <T extends Comparable<T>> T findMin(List<T> list) {
        T min = list.get(0);
        for (T item : list) if (item.compareTo(min) < 0) min = item;
        return min;
    }

    public static <T extends Comparable<T>> T findMax(List<T> list) {
        T max = list.get(0);
        for (T item : list) if (item.compareTo(max) > 0) max = item;
        return max;
    }

    public static void main(String[] args) {
        List<Integer> nums = List.of(3, 1, 9, 2, 7, 4);
        System.out.println("Min: " + findMin(nums));
        System.out.println("Max: " + findMax(nums));
    }
}`,
          tests: [
            {
              id: 1,
              label: "findMin uses Comparable bound",
              hint: "<T extends Comparable<T>>",
              keywords: [{ pattern: "Comparable<T>" }],
            },
            {
              id: 2,
              label: "findMin compares with compareTo",
              hint: "item.compareTo(min) < 0",
              keywords: [{ pattern: "compareTo" }],
            },
            {
              id: 3,
              label: "Prints Min and Max",
              hint: 'System.out.println("Min: " + findMin(nums))',
              keywords: [{ pattern: "findMin|findMax" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Collections Framework
  // ─────────────────────────────────────────────────────────────
  {
    id: "collections",
    title: "Collections Framework",
    icon: "📦",
    color: "#22c55e",
    lessons: [
      {
        id: "int-5",
        title: "List, Set, Queue",
        xp: 20,
        theory: [
          text(
            "The Java Collections Framework provides ready-made data structures. The three main interfaces are **List** (ordered, allows duplicates), **Set** (no duplicates), and **Queue** (FIFO ordering).",
            {
              label: "List vs Set vs Queue",
              content: `import java.util.*;

// List — ordered, duplicates allowed
List<String> list = new ArrayList<>();
list.add("apple"); list.add("banana"); list.add("apple");
System.out.println(list); // [apple, banana, apple]

// Set — no duplicates, no guaranteed order
Set<String> set = new HashSet<>(list);
System.out.println(set); // [banana, apple]

// LinkedHashSet — no duplicates, insertion order preserved
Set<String> linked = new LinkedHashSet<>(list);
System.out.println(linked); // [apple, banana]

// Queue — FIFO
Queue<String> queue = new LinkedList<>();
queue.offer("first"); queue.offer("second");
System.out.println(queue.poll()); // first`,
            },
          ),
          text(
            "**TreeSet** and **TreeMap** keep elements sorted. **LinkedHashSet** and **LinkedHashMap** preserve insertion order.",
          ),
          callout(
            "tip",
            "Choose your collection by what matters: order? → LinkedHashSet/LinkedHashMap. Sorted? → TreeSet/TreeMap. Fast lookup? → HashSet/HashMap. Duplicates? → List.",
          ),
          quiz(
            "Which collection preserves insertion order AND prevents duplicates?",
            ["HashSet", "ArrayList", "LinkedHashSet", "TreeSet"],
            2,
            "LinkedHashSet maintains insertion order while rejecting duplicates. TreeSet sorts elements; HashSet has no order guarantee.",
          ),
        ],
        challenge: {
          title: "Unique Words Sorted",
          description: [
            {
              type: "text",
              content:
                'Given sentence = "the cat sat on the mat the cat", print all unique words in alphabetical order, one per line.',
            },
            {
              type: "expected",
              label: "Expected output",
              content: `cat
mat
on
sat
the`,
            },
          ],
          starterCode: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        String sentence = "the cat sat on the mat the cat";
        // Use a TreeSet to get unique, sorted words

    }
}`,
          solutionCode: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        String sentence = "the cat sat on the mat the cat";
        String[] words = sentence.split(" ");
        Set<String> unique = new TreeSet<>(Arrays.asList(words));
        for (String word : unique) {
            System.out.println(word);
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses TreeSet for sorted unique words",
              hint: "new TreeSet<>(...)",
              keywords: [{ pattern: "TreeSet" }],
            },
            {
              id: 2,
              label: "Splits sentence into words",
              hint: 'sentence.split(" ")',
              keywords: [{ pattern: "\\.split\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints each unique word",
              hint: "System.out.println(word)",
              keywords: [{ pattern: "System\\.out\\.println" }],
            },
          ],
        },
      },

      {
        id: "int-6",
        title: "HashMap Advanced",
        xp: 20,
        theory: [
          text(
            "HashMap's most powerful feature is **grouping and aggregating** data. Combined with `getOrDefault`, `putIfAbsent`, `computeIfAbsent`, and `merge`, you can solve complex data problems in just a few lines.",
            {
              label: "Advanced HashMap operations",
              content: `import java.util.*;

Map<String, List<Integer>> scores = new HashMap<>();

// computeIfAbsent — create list only if key missing
scores.computeIfAbsent("Alice", k -> new ArrayList<>()).add(85);
scores.computeIfAbsent("Alice", k -> new ArrayList<>()).add(92);
scores.computeIfAbsent("Bob",   k -> new ArrayList<>()).add(78);

System.out.println(scores);
// {Alice=[85, 92], Bob=[78]}

// merge — combine values
Map<String, Integer> wordCount = new HashMap<>();
String[] words = {"the", "cat", "the", "mat"};
for (String w : words) {
    wordCount.merge(w, 1, Integer::sum);
}
System.out.println(wordCount); // {the=2, cat=1, mat=1}`,
            },
          ),
          text(
            "Use `entrySet()`, `keySet()`, and `values()` to iterate different views of a Map.",
            {
              label: "Iterating a Map",
              content: `Map<String, Integer> map = Map.of("a", 1, "b", 2, "c", 3);

// All entries
map.forEach((k, v) -> System.out.println(k + "=" + v));

// Only keys
for (String key : map.keySet()) System.out.println(key);

// Only values
for (int val : map.values()) System.out.println(val);`,
            },
          ),
          quiz(
            "What does computeIfAbsent do?",
            [
              "Removes a key if absent",
              "Returns null if key absent",
              "Creates a value for the key only if it doesn't exist",
              "Throws exception if key absent",
            ],
            2,
            "computeIfAbsent(key, mappingFunction) only computes and inserts the value if the key is not already present, then returns the value.",
          ),
        ],
        challenge: {
          title: "Group by First Letter",
          description: [
            {
              type: "text",
              content:
                'Given names = ["Alice", "Bob", "Anna", "Brian", "Charlie", "Carl"], group them by their first letter and print each group sorted.',
            },
            {
              type: "expected",
              label: "Expected output",
              content: `A: [Alice, Anna]
B: [Bob, Brian]
C: [Carl, Charlie]`,
            },
          ],
          starterCode: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Anna", "Brian", "Charlie", "Carl");
        Map<Character, List<String>> groups = new TreeMap<>();

        // Group names by first letter using computeIfAbsent

        // Print each group
        groups.forEach((letter, list) -> {
            Collections.sort(list);
            System.out.println(letter + ": " + list);
        });
    }
}`,
          solutionCode: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Anna", "Brian", "Charlie", "Carl");
        Map<Character, List<String>> groups = new TreeMap<>();

        for (String name : names) {
            char key = name.charAt(0);
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(name);
        }

        groups.forEach((letter, list) -> {
            Collections.sort(list);
            System.out.println(letter + ": " + list);
        });
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses TreeMap for sorted keys",
              hint: "new TreeMap<>()",
              keywords: [{ pattern: "TreeMap" }],
            },
            {
              id: 2,
              label: "Groups by first letter with computeIfAbsent",
              hint: "groups.computeIfAbsent(key, k -> new ArrayList<>()).add(name)",
              keywords: [{ pattern: "computeIfAbsent" }],
            },
            {
              id: 3,
              label: "Sorts each group",
              hint: "Collections.sort(list)",
              keywords: [{ pattern: "Collections\\.sort" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Exception Handling
  // ─────────────────────────────────────────────────────────────
  {
    id: "exceptions",
    title: "Exception Handling",
    icon: "⚠️",
    color: "#ef4444",
    lessons: [
      {
        id: "int-7",
        title: "Checked vs Unchecked Exceptions",
        xp: 20,
        theory: [
          text(
            "Java has two categories of exceptions. **Checked exceptions** must be handled or declared — the compiler enforces this. **Unchecked exceptions** (RuntimeException subclasses) don't require handling.",
            {
              label: "Checked vs Unchecked",
              content: `// Checked — must handle or declare with throws
import java.io.*;
public static String readFile(String path) throws IOException {
    return new String(java.nio.file.Files.readAllBytes(
        java.nio.file.Path.of(path)));
}

// Unchecked — optional to handle
public static int divide(int a, int b) {
    // ArithmeticException is unchecked
    return a / b;
}`,
            },
          ),
          diagram("Exception Hierarchy", [
            {
              id: "throwable",
              label: "Throwable",
              color: "#6b7280",
              items: ["Root of all exceptions"],
            },
            {
              id: "error",
              label: "Error (don't catch)",
              color: "#ef4444",
              items: ["OutOfMemoryError", "StackOverflowError"],
            },
            {
              id: "checked",
              label: "Checked Exception",
              color: ACCENT,
              items: ["IOException", "SQLException", "Must handle or declare"],
            },
            {
              id: "unchecked",
              label: "Unchecked (RuntimeException)",
              color: "#22c55e",
              items: [
                "NullPointerException",
                "ArrayIndexOutOfBoundsException",
                "IllegalArgumentException",
              ],
            },
          ]),
          quiz(
            "Which exception type MUST be handled or declared with throws?",
            [
              "RuntimeException",
              "NullPointerException",
              "IOException",
              "IllegalArgumentException",
            ],
            2,
            "IOException is a checked exception — the compiler forces you to either catch it in a try-catch or declare it with throws in the method signature.",
          ),
        ],
        challenge: {
          title: "Safe Integer Parser",
          description: [
            {
              type: "text",
              content:
                'Write parseIntSafe(String s) that returns the parsed integer, or -1 if the string is not a valid integer. Test with "42", "abc", and "100".',
            },
            {
              type: "expected",
              label: "Expected output",
              content: `42
-1
100`,
            },
          ],
          starterCode: `public class Solution {
    public static int parseIntSafe(String s) {
        // Try Integer.parseInt, catch NumberFormatException, return -1

    }

    public static void main(String[] args) {
        System.out.println(parseIntSafe("42"));
        System.out.println(parseIntSafe("abc"));
        System.out.println(parseIntSafe("100"));
    }
}`,
          solutionCode: `public class Solution {
    public static int parseIntSafe(String s) {
        try {
            return Integer.parseInt(s);
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    public static void main(String[] args) {
        System.out.println(parseIntSafe("42"));
        System.out.println(parseIntSafe("abc"));
        System.out.println(parseIntSafe("100"));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses try-catch",
              hint: "try { return Integer.parseInt(s); }",
              keywords: [{ pattern: "try\\s*\\{" }],
            },
            {
              id: 2,
              label: "Catches NumberFormatException",
              hint: "catch (NumberFormatException e)",
              keywords: [{ pattern: "NumberFormatException" }],
            },
            {
              id: 3,
              label: "Returns -1 on failure",
              hint: "return -1;",
              keywords: [{ pattern: "return\\s+-1" }],
            },
          ],
        },
      },

      {
        id: "int-8",
        title: "Custom Exceptions",
        xp: 20,
        theory: [
          text(
            "Creating **custom exception classes** makes your error messages meaningful and lets callers handle specific failure types differently.",
            {
              label: "Custom exception classes",
              content: `// Custom checked exception
class InsufficientFundsException extends Exception {
    private final double shortfall;

    public InsufficientFundsException(double shortfall) {
        super(String.format("Insufficient funds. Need $%.2f more.", shortfall));
        this.shortfall = shortfall;
    }

    public double getShortfall() { return shortfall; }
}

// Custom unchecked exception
class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(int age) {
        super("Invalid age: " + age + ". Must be 0-150.");
    }
}`,
            },
          ),
          text(
            "Throw your custom exception with `throw new YourException(...)`. Callers catch it by its specific type.",
            {
              label: "Throwing and catching",
              content: `class BankAccount {
    private double balance;

    BankAccount(double balance) { this.balance = balance; }

    void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance)
            throw new InsufficientFundsException(amount - balance);
        balance -= amount;
        System.out.printf("Withdrew $%.2f%n", amount);
    }
}

try {
    new BankAccount(100).withdraw(150);
} catch (InsufficientFundsException e) {
    System.out.println(e.getMessage());
    System.out.printf("Shortfall: $%.2f%n", e.getShortfall());
}`,
            },
          ),
          quiz(
            "To create a custom checked exception, extend:",
            [
              "RuntimeException",
              "Error",
              "Exception",
              "Throwable",
            ],
            2,
            "Extend Exception (not RuntimeException) to create a checked exception that callers must handle or declare.",
          ),
        ],
        challenge: {
          title: "Age Validator",
          description: [
            {
              type: "text",
              content:
                "Create InvalidAgeException extending RuntimeException. Write validateAge(int age) that throws it if age < 0 or > 150. Test with valid age 25 and invalid age -5.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Age 25 is valid
Error: Invalid age: -5. Must be between 0 and 150.`,
            },
          ],
          starterCode: `public class Solution {
    static class InvalidAgeException extends RuntimeException {
        public InvalidAgeException(int age) {
            // call super with message "Invalid age: X. Must be between 0 and 150."

        }
    }

    public static void validateAge(int age) {
        // throw InvalidAgeException if age < 0 or > 150

    }

    public static void main(String[] args) {
        try {
            validateAge(25);
            System.out.println("Age 25 is valid");
        } catch (InvalidAgeException e) {
            System.out.println("Error: " + e.getMessage());
        }

        try {
            validateAge(-5);
            System.out.println("Age -5 is valid");
        } catch (InvalidAgeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solutionCode: `public class Solution {
    static class InvalidAgeException extends RuntimeException {
        public InvalidAgeException(int age) {
            super("Invalid age: " + age + ". Must be between 0 and 150.");
        }
    }

    public static void validateAge(int age) {
        if (age < 0 || age > 150) throw new InvalidAgeException(age);
    }

    public static void main(String[] args) {
        try {
            validateAge(25);
            System.out.println("Age 25 is valid");
        } catch (InvalidAgeException e) {
            System.out.println("Error: " + e.getMessage());
        }

        try {
            validateAge(-5);
            System.out.println("Age -5 is valid");
        } catch (InvalidAgeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "InvalidAgeException extends RuntimeException",
              hint: "static class InvalidAgeException extends RuntimeException",
              keywords: [{ pattern: "InvalidAgeException\\s+extends\\s+RuntimeException" }],
            },
            {
              id: 2,
              label: "validateAge throws for invalid age",
              hint: "throw new InvalidAgeException(age)",
              keywords: [{ pattern: "throw\\s+new\\s+InvalidAgeException" }],
            },
            {
              id: 3,
              label: "Checks both < 0 and > 150",
              hint: "age < 0 || age > 150",
              keywords: [{ pattern: "age\\s*<\\s*0|age\\s*>\\s*150" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — File I/O
  // ─────────────────────────────────────────────────────────────
  {
    id: "file-io",
    title: "File I/O",
    icon: "📁",
    color: "#8b5cf6",
    lessons: [
      {
        id: "int-9",
        title: "Reading and Writing Files",
        xp: 25,
        theory: [
          text(
            "Java's `java.nio.file.Files` API (Java 11+) makes file operations clean and concise. It handles opening, reading, writing, and closing automatically.",
            {
              label: "Modern Files API",
              content: `import java.nio.file.*;
import java.util.List;

// Write a file
Path file = Path.of("data.txt");
Files.writeString(file, "Hello\\nWorld\\n");

// Read entire file
String content = Files.readString(file);
System.out.println(content);

// Read all lines
List<String> lines = Files.readAllLines(file);
for (String line : lines) System.out.println(line);

// Append to a file
Files.writeString(file, "New line\\n",
    StandardOpenOption.APPEND);`,
            },
          ),
          text(
            "For large files, use `BufferedReader` to read line by line without loading everything into memory.",
            {
              label: "BufferedReader for large files",
              content: `import java.io.*;
import java.nio.file.*;

try (BufferedReader br = Files.newBufferedReader(Path.of("big.txt"))) {
    String line;
    int count = 0;
    while ((line = br.readLine()) != null) {
        count++;
        System.out.println(count + ": " + line);
    }
}`,
            },
          ),
          callout(
            "tip",
            "Always use try-with-resources when working with files. It automatically closes the file handle even if an exception occurs.",
          ),
          quiz(
            "Which method reads an entire file into a String in one line?",
            [
              "Files.read()",
              "Files.readString()",
              "Files.load()",
              "Files.getString()",
            ],
            1,
            "Files.readString(Path) reads the entire file into a String. It was added in Java 11.",
          ),
        ],
        challenge: {
          title: "Line Counter",
          description: [
            {
              type: "text",
              content:
                "Write a program that creates a file with 5 lines, then reads it back and prints the total line count and each line numbered.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Total lines: 5
1: Line one
2: Line two
3: Line three
4: Line four
5: Line five`,
            },
          ],
          starterCode: `import java.nio.file.*;
import java.util.List;

public class Solution {
    public static void main(String[] args) throws Exception {
        Path file = Path.of("test.txt");

        // Write 5 lines to the file
        String content = "Line one\\nLine two\\nLine three\\nLine four\\nLine five";
        Files.writeString(file, content);

        // Read all lines and print count + numbered lines

    }
}`,
          solutionCode: `import java.nio.file.*;
import java.util.List;

public class Solution {
    public static void main(String[] args) throws Exception {
        Path file = Path.of("test.txt");
        String content = "Line one\\nLine two\\nLine three\\nLine four\\nLine five";
        Files.writeString(file, content);

        List<String> lines = Files.readAllLines(file);
        System.out.println("Total lines: " + lines.size());
        for (int i = 0; i < lines.size(); i++) {
            System.out.println((i + 1) + ": " + lines.get(i));
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Writes file with Files.writeString",
              hint: "Files.writeString(file, content)",
              keywords: [{ pattern: "Files\\.writeString" }],
            },
            {
              id: 2,
              label: "Reads all lines",
              hint: "Files.readAllLines(file)",
              keywords: [{ pattern: "Files\\.readAllLines" }],
            },
            {
              id: 3,
              label: "Prints total line count",
              hint: 'System.out.println("Total lines: " + lines.size())',
              keywords: [{ pattern: "lines\\.size\\s*\\(\\s*\\)" }],
            },
            {
              id: 4,
              label: "Numbers each line",
              hint: "(i + 1) + \": \" + lines.get(i)",
              keywords: [{ pattern: "i\\s*\\+\\s*1" }],
            },
          ],
        },
      },

      {
        id: "int-10",
        title: "CSV Parsing",
        xp: 25,
        theory: [
          text(
            "CSV (Comma-Separated Values) is the most common format for data files. Parsing CSV manually in Java teaches string splitting, file reading, and data modelling together.",
            {
              label: "Parsing a CSV file",
              content: `import java.nio.file.*;
import java.util.*;

// CSV content: name,age,score
String csv = "Alice,20,92\\nBob,22,85\\nCharlie,21,78";
Files.writeString(Path.of("students.csv"), csv);

List<String> lines = Files.readAllLines(Path.of("students.csv"));
for (String line : lines) {
    String[] parts = line.split(",");
    String name  = parts[0];
    int    age   = Integer.parseInt(parts[1]);
    double score = Double.parseDouble(parts[2]);
    System.out.printf("%-10s age=%-3d score=%.1f%n", name, age, score);
}`,
            },
          ),
          text(
            "When writing CSV, be careful about values that contain commas — wrap them in quotes. Use `String.join` to build CSV rows cleanly.",
            {
              label: "Writing CSV",
              content: `List<String[]> data = List.of(
    new String[]{"Alice", "20", "92"},
    new String[]{"Bob",   "22", "85"}
);

StringBuilder sb = new StringBuilder("name,age,score\\n");
for (String[] row : data) {
    sb.append(String.join(",", row)).append("\\n");
}
Files.writeString(Path.of("out.csv"), sb.toString());`,
            },
          ),
          quiz(
            "What method splits a CSV line into its fields?",
            ["line.split(\",\")", "line.parse(\",\")", "CSV.split(line)", "line.tokenize(\",\")"],
            0,
            "String.split(\",\") splits a string on commas and returns a String array of the fields.",
          ),
        ],
        challenge: {
          title: "CSV Averages",
          description: [
            {
              type: "text",
              content:
                "Create a CSV string with 4 students (name,score), write it to a file, read it back, and print each student's name and score plus the class average.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Alice: 92
Bob: 85
Charlie: 78
Diana: 96
Average: 87.75`,
            },
          ],
          starterCode: `import java.nio.file.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        String csv = "Alice,92\\nBob,85\\nCharlie,78\\nDiana,96";
        Files.writeString(Path.of("grades.csv"), csv);

        List<String> lines = Files.readAllLines(Path.of("grades.csv"));
        double total = 0;

        // Parse each line, print name and score, accumulate total

        System.out.printf("Average: %.2f%n", total / lines.size());
    }
}`,
          solutionCode: `import java.nio.file.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        String csv = "Alice,92\\nBob,85\\nCharlie,78\\nDiana,96";
        Files.writeString(Path.of("grades.csv"), csv);

        List<String> lines = Files.readAllLines(Path.of("grades.csv"));
        double total = 0;

        for (String line : lines) {
            String[] parts = line.split(",");
            String name = parts[0];
            double score = Double.parseDouble(parts[1]);
            total += score;
            System.out.println(name + ": " + (int) score);
        }

        System.out.printf("Average: %.2f%n", total / lines.size());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Writes CSV with Files.writeString",
              hint: "Files.writeString(...)",
              keywords: [{ pattern: "Files\\.writeString" }],
            },
            {
              id: 2,
              label: "Splits each line on comma",
              hint: 'line.split(",")',
              keywords: [{ pattern: "\\.split\\s*\\(\\s*\",\"" }],
            },
            {
              id: 3,
              label: "Accumulates total",
              hint: "total += score",
              keywords: [{ pattern: "total\\s*\\+=" }],
            },
            {
              id: 4,
              label: "Prints average with printf",
              hint: 'System.out.printf("Average: %.2f%n", ...)',
              keywords: [{ pattern: "Average" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Iterators and Comparators
  // ─────────────────────────────────────────────────────────────
  {
    id: "iterators-comparators",
    title: "Iterators and Comparators",
    icon: "🔁",
    color: "#06b6d4",
    lessons: [
      {
        id: "int-11",
        title: "Comparable and Comparator",
        xp: 25,
        theory: [
          text(
            "**Comparable** lets an object define its own natural ordering. **Comparator** defines an external ordering, useful when you want multiple sort orders or can't modify the class.",
            {
              label: "Comparable",
              content: `class Student implements Comparable<Student> {
    String name;
    double gpa;

    Student(String name, double gpa) {
        this.name = name; this.gpa = gpa;
    }

    @Override
    public int compareTo(Student other) {
        return Double.compare(other.gpa, this.gpa); // descending GPA
    }

    @Override
    public String toString() { return name + "(" + gpa + ")"; }
}

List<Student> students = new ArrayList<>(Arrays.asList(
    new Student("Alice", 3.8),
    new Student("Bob",   3.5),
    new Student("Charlie", 3.9)
));
Collections.sort(students);
System.out.println(students); // [Charlie(3.9), Alice(3.8), Bob(3.5)]`,
            },
          ),
          text(
            "**Comparator** can be defined inline with a lambda — great for ad-hoc sorting.",
            {
              label: "Comparator with lambda",
              content: `// Sort by name alphabetically
students.sort(Comparator.comparing(s -> s.name));

// Sort by GPA descending, then name ascending
students.sort(Comparator.comparingDouble((Student s) -> s.gpa)
    .reversed()
    .thenComparing(s -> s.name));`,
            },
          ),
          quiz(
            "What does compareTo return when this object is LESS than the other?",
            [
              "A positive number",
              "Zero",
              "A negative number",
              "null",
            ],
            2,
            "compareTo returns negative if this < other, zero if equal, positive if this > other. Think of it as this - other for numbers.",
          ),
        ],
        challenge: {
          title: "Sort Products",
          description: [
            {
              type: "text",
              content:
                "Create a Product class with name and price. Implement Comparable to sort by price ascending. Print sorted products.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Mouse: $25.0
Keyboard: $75.0
Monitor: $299.0
Laptop: $999.0`,
            },
          ],
          starterCode: `import java.util.*;

public class Solution {
    static class Product implements Comparable<Product> {
        String name;
        double price;

        Product(String name, double price) {
            this.name = name; this.price = price;
        }

        @Override
        public int compareTo(Product other) {
            // Sort by price ascending

        }

        @Override
        public String toString() {
            return name + ": $" + price;
        }
    }

    public static void main(String[] args) {
        List<Product> products = new ArrayList<>(Arrays.asList(
            new Product("Laptop", 999.0),
            new Product("Mouse", 25.0),
            new Product("Monitor", 299.0),
            new Product("Keyboard", 75.0)
        ));
        Collections.sort(products);
        products.forEach(System.out::println);
    }
}`,
          solutionCode: `import java.util.*;

public class Solution {
    static class Product implements Comparable<Product> {
        String name;
        double price;

        Product(String name, double price) {
            this.name = name; this.price = price;
        }

        @Override
        public int compareTo(Product other) {
            return Double.compare(this.price, other.price);
        }

        @Override
        public String toString() { return name + ": $" + price; }
    }

    public static void main(String[] args) {
        List<Product> products = new ArrayList<>(Arrays.asList(
            new Product("Laptop", 999.0),
            new Product("Mouse", 25.0),
            new Product("Monitor", 299.0),
            new Product("Keyboard", 75.0)
        ));
        Collections.sort(products);
        products.forEach(System.out::println);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Product implements Comparable<Product>",
              hint: "static class Product implements Comparable<Product>",
              keywords: [{ pattern: "implements\\s+Comparable<Product>" }],
            },
            {
              id: 2,
              label: "compareTo uses Double.compare",
              hint: "return Double.compare(this.price, other.price);",
              keywords: [{ pattern: "Double\\.compare" }],
            },
            {
              id: 3,
              label: "Uses Collections.sort",
              hint: "Collections.sort(products)",
              keywords: [{ pattern: "Collections\\.sort" }],
            },
          ],
        },
      },

      {
        id: "int-12",
        title: "Iterator Pattern",
        xp: 25,
        theory: [
          text(
            "The **Iterator pattern** provides a standard way to traverse a collection without exposing its internal structure. Every Java collection implements `Iterable<T>`, which provides an `Iterator<T>`.",
            {
              label: "Using Iterator",
              content: `import java.util.*;

List<String> names = new ArrayList<>(
    Arrays.asList("Alice", "Bob", "Charlie", "Dave"));

Iterator<String> it = names.iterator();
while (it.hasNext()) {
    String name = it.next();
    if (name.startsWith("C")) {
        it.remove(); // safe removal during iteration
    }
}
System.out.println(names); // [Alice, Bob, Dave]`,
            },
          ),
          text(
            "You can make your own class iterable by implementing `Iterable<T>` and providing an `Iterator<T>`.",
            {
              label: "Custom Iterable",
              content: `class NumberRange implements Iterable<Integer> {
    private final int start, end;

    NumberRange(int start, int end) {
        this.start = start; this.end = end;
    }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            int current = start;
            public boolean hasNext() { return current <= end; }
            public Integer next() { return current++; }
        };
    }
}

for (int n : new NumberRange(1, 5)) {
    System.out.print(n + " "); // 1 2 3 4 5
}`,
            },
          ),
          quiz(
            "Why should you use iterator.remove() instead of list.remove() during iteration?",
            [
              "iterator.remove() is faster",
              "list.remove() doesn't work",
              "list.remove() throws ConcurrentModificationException",
              "They are identical",
            ],
            2,
            "Modifying a collection while iterating with a for-each loop throws ConcurrentModificationException. Iterator.remove() is the safe way to remove during iteration.",
          ),
        ],
        challenge: {
          title: "Filter Iterator",
          description: [
            {
              type: "text",
              content:
                "Given a list of integers, use an Iterator to remove all numbers less than 5 in place, then print the remaining list.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: "[5, 8, 7, 6, 9]",
            },
          ],
          starterCode: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(
            Arrays.asList(3, 5, 1, 8, 2, 7, 4, 6, 9));

        // Use Iterator to remove numbers < 5

        System.out.println(numbers);
    }
}`,
          solutionCode: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(
            Arrays.asList(3, 5, 1, 8, 2, 7, 4, 6, 9));

        Iterator<Integer> it = numbers.iterator();
        while (it.hasNext()) {
            if (it.next() < 5) it.remove();
        }

        System.out.println(numbers);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Iterator",
              hint: "Iterator<Integer> it = numbers.iterator()",
              keywords: [{ pattern: "Iterator" }],
            },
            {
              id: 2,
              label: "Uses it.remove() for safe deletion",
              hint: "it.remove()",
              keywords: [{ pattern: "it\\.remove\\s*\\(\\s*\\)" }],
            },
            {
              id: 3,
              label: "Checks value < 5",
              hint: "if (it.next() < 5)",
              keywords: [{ pattern: "<\\s*5" }],
            },
          ],
        },
      },

      {
        id: "int-13",
        title: "Streams and Collectors",
        xp: 30,
        theory: [
          text(
            "The **Stream API** with advanced **Collectors** lets you group, partition, summarise, and join data in a declarative pipeline — replacing complex loops with readable one-liners.",
            {
              label: "groupingBy and summarizingInt",
              content: `import java.util.*;
import java.util.stream.*;

record Employee(String name, String dept, int salary) {}

List<Employee> employees = List.of(
    new Employee("Alice", "Engineering", 95000),
    new Employee("Bob",   "Marketing",   72000),
    new Employee("Carol", "Engineering", 88000),
    new Employee("Dave",  "Marketing",   78000)
);

// Group by department
Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::dept));

// Average salary per department
employees.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.averagingInt(Employee::salary)))
    .forEach((dept, avg) ->
        System.out.printf("%s: $%.0f%n", dept, avg));`,
            },
          ),
          text(
            "**partitioningBy** splits a stream into two groups — matching and non-matching.",
            {
              label: "partitioningBy",
              content: `Map<Boolean, List<Integer>> partition = IntStream.rangeClosed(1, 10)
    .boxed()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));

System.out.println("Even: " + partition.get(true));
System.out.println("Odd:  " + partition.get(false));`,
            },
          ),
          quiz(
            "Which Collector groups elements by a classifier function?",
            ["Collectors.joining()", "Collectors.partitioningBy()", "Collectors.groupingBy()", "Collectors.toMap()"],
            2,
            "Collectors.groupingBy(classifier) groups stream elements into a Map<K, List<T>> where K is the result of applying the classifier to each element.",
          ),
        ],
        challenge: {
          title: "Department Stats",
          description: [
            {
              type: "text",
              content:
                "Given a list of Employee(name, dept, salary), use streams to print the highest salary in each department, sorted by department name.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Engineering: 95000
HR: 65000
Marketing: 78000`,
            },
          ],
          starterCode: `import java.util.*;
import java.util.stream.*;

public class Solution {
    record Employee(String name, String dept, int salary) {}

    public static void main(String[] args) {
        List<Employee> employees = List.of(
            new Employee("Alice", "Engineering", 95000),
            new Employee("Bob",   "Marketing",   72000),
            new Employee("Carol", "Engineering", 88000),
            new Employee("Dave",  "Marketing",   78000),
            new Employee("Eve",   "HR",          65000)
        );

        // Group by dept, find max salary per dept, print sorted by dept name

    }
}`,
          solutionCode: `import java.util.*;
import java.util.stream.*;

public class Solution {
    record Employee(String name, String dept, int salary) {}

    public static void main(String[] args) {
        List<Employee> employees = List.of(
            new Employee("Alice", "Engineering", 95000),
            new Employee("Bob",   "Marketing",   72000),
            new Employee("Carol", "Engineering", 88000),
            new Employee("Dave",  "Marketing",   78000),
            new Employee("Eve",   "HR",          65000)
        );

        employees.stream()
            .collect(Collectors.groupingBy(
                Employee::dept,
                TreeMap::new,
                Collectors.maxBy(Comparator.comparingInt(Employee::salary))))
            .forEach((dept, emp) ->
                System.out.println(dept + ": " + emp.get().salary()));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses stream().collect()",
              hint: "employees.stream().collect(...)",
              keywords: [{ pattern: "\\.stream\\s*\\(\\s*\\)\\.collect" }],
            },
            {
              id: 2,
              label: "Uses groupingBy",
              hint: "Collectors.groupingBy(Employee::dept, ...)",
              keywords: [{ pattern: "groupingBy" }],
            },
            {
              id: 3,
              label: "Uses maxBy or max for highest salary",
              hint: "Collectors.maxBy(Comparator.comparingInt(Employee::salary))",
              keywords: [{ pattern: "maxBy|Collectors\\.max" }],
            },
            {
              id: 4,
              label: "Uses TreeMap for sorted output",
              hint: "TreeMap::new",
              keywords: [{ pattern: "TreeMap" }],
            },
          ],
        },
      },

      {
        id: "int-14",
        title: "Optional",
        xp: 20,
        theory: [
          text(
            "`Optional<T>` is a container that either holds a value or explicitly represents 'no value'. It eliminates null checks and makes the absence of a value explicit in the API.",
            {
              label: "Creating and using Optional",
              content: `import java.util.Optional;

Optional<String> present = Optional.of("Alice");
Optional<String> empty   = Optional.empty();
Optional<String> maybe   = Optional.ofNullable(null); // empty

// Safe access
present.ifPresent(name -> System.out.println("Hello, " + name));

// With fallback
String name = empty.orElse("Guest");
String computed = empty.orElseGet(() -> "Computed Default");

// Throw if absent
String required = present.orElseThrow(
    () -> new RuntimeException("Name required"));`,
            },
          ),
          text(
            "Chain **map**, **flatMap**, and **filter** on Optional to transform values without null checks.",
            {
              label: "Optional chaining",
              content: `Optional<String> email = Optional.of("  USER@EXAMPLE.COM  ");

String domain = email
    .map(String::trim)
    .map(String::toLowerCase)
    .filter(s -> s.contains("@"))
    .map(s -> s.substring(s.indexOf('@') + 1))
    .orElse("unknown");

System.out.println(domain); // example.com`,
            },
          ),
          quiz(
            "What does Optional.orElseGet() take as its argument?",
            ["A default value", "A Supplier lambda", "A Consumer lambda", "A String"],
            1,
            "orElseGet takes a Supplier<T> — a lambda with no parameters that produces the fallback value. It's lazy: the supplier only runs if the Optional is empty.",
          ),
        ],
        challenge: {
          title: "Safe User Lookup",
          description: [
            {
              type: "text",
              content:
                "Write findUser(String id) returning Optional<String> (user name). Return present for 'u1'='Alice', 'u2'='Bob', empty for anything else. Chain map to print greeting or 'User not found'.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Hello, Alice!
Hello, Bob!
User not found`,
            },
          ],
          starterCode: `import java.util.*;

public class Solution {
    static Optional<String> findUser(String id) {
        Map<String, String> db = Map.of("u1", "Alice", "u2", "Bob");
        return Optional.ofNullable(db.get(id));
    }

    public static void main(String[] args) {
        String[] ids = {"u1", "u2", "u3"};
        for (String id : ids) {
            // Use map to create "Hello, X!" and orElse "User not found"

        }
    }
}`,
          solutionCode: `import java.util.*;

public class Solution {
    static Optional<String> findUser(String id) {
        Map<String, String> db = Map.of("u1", "Alice", "u2", "Bob");
        return Optional.ofNullable(db.get(id));
    }

    public static void main(String[] args) {
        String[] ids = {"u1", "u2", "u3"};
        for (String id : ids) {
            String result = findUser(id)
                .map(name -> "Hello, " + name + "!")
                .orElse("User not found");
            System.out.println(result);
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "findUser returns Optional",
              hint: "static Optional<String> findUser(String id)",
              keywords: [{ pattern: "Optional.*findUser" }],
            },
            {
              id: 2,
              label: "Uses Optional.ofNullable",
              hint: "return Optional.ofNullable(db.get(id))",
              keywords: [{ pattern: "ofNullable" }],
            },
            {
              id: 3,
              label: "Chains .map() on Optional",
              hint: '.map(name -> "Hello, " + name + "!")',
              keywords: [{ pattern: "\\.map\\s*\\(" }],
            },
            {
              id: 4,
              label: "Uses .orElse for fallback",
              hint: '.orElse("User not found")',
              keywords: [{ pattern: "\\.orElse\\s*\\(" }],
            },
          ],
        },
      },

      {
        id: "int-15",
        title: "Records and Sealed Classes",
        xp: 25,
        theory: [
          text(
            "**Records** (Java 16+) are immutable data classes. They auto-generate constructor, getters, equals, hashCode, and toString — eliminating boilerplate.",
            {
              label: "Records",
              content: `// Old way — lots of boilerplate
public class Point {
    private final int x, y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    public int x() { return x; }
    public int y() { return y; }
    // equals, hashCode, toString...
}

// Record — one line!
record Point(int x, int y) {}

Point p = new Point(3, 4);
System.out.println(p.x());          // 3
System.out.println(p);              // Point[x=3, y=4]
System.out.println(new Point(3,4).equals(p)); // true`,
            },
          ),
          text(
            "**Sealed classes** (Java 17+) restrict which classes can extend them — perfect for modelling a fixed set of subtypes.",
            {
              label: "Sealed classes",
              content: `sealed interface Shape permits Circle, Rectangle, Triangle {}

record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}
record Triangle(double base, double height) implements Shape {}

// Pattern matching switch (Java 21)
static double area(Shape s) {
    return switch (s) {
        case Circle c    -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.w() * r.h();
        case Triangle t  -> 0.5 * t.base() * t.height();
    };
}`,
            },
          ),
          quiz(
            "What does a Java record automatically generate?",
            [
              "Only a constructor",
              "Constructor, getters, equals, hashCode, toString",
              "Constructor and toString only",
              "Nothing — you still write everything manually",
            ],
            1,
            "Records auto-generate a canonical constructor, accessor methods (named after each field), equals(), hashCode(), and toString().",
          ),
        ],
        challenge: {
          title: "Person Record",
          description: [
            {
              type: "text",
              content:
                "Create a Person record with name (String) and age (int). Create two Person instances, print them, and check if they are equal.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Person[name=Alice, age=30]
Person[name=Alice, age=30]
Equal: true`,
            },
          ],
          starterCode: `public class Solution {
    // Define Person record here

    public static void main(String[] args) {
        // Create two Person instances with name="Alice", age=30
        // Print both and check equality

    }
}`,
          solutionCode: `public class Solution {
    record Person(String name, int age) {}

    public static void main(String[] args) {
        Person p1 = new Person("Alice", 30);
        Person p2 = new Person("Alice", 30);
        System.out.println(p1);
        System.out.println(p2);
        System.out.println("Equal: " + p1.equals(p2));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines a record Person",
              hint: "record Person(String name, int age) {}",
              keywords: [{ pattern: "record\\s+Person" }],
            },
            {
              id: 2,
              label: "Creates two Person instances",
              hint: 'new Person("Alice", 30)',
              keywords: [{ pattern: "new\\s+Person" }],
            },
            {
              id: 3,
              label: "Uses .equals() to compare",
              hint: "p1.equals(p2)",
              keywords: [{ pattern: "\\.equals\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
];

export const JAVA_INTERMEDIATE_LESSONS = JAVA_INTERMEDIATE_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId:    ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const JAVA_INTERMEDIATE_TOTAL_XP = JAVA_INTERMEDIATE_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
