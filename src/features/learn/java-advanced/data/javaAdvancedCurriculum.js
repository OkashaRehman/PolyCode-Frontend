// PolyCode — Java Advanced interactive course
// 4 chapters · 12 lessons · real javac/java execution via backend

const ACCENT = "#3b82f6";

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

export const JAVA_ADVANCED_CHAPTERS = [
  {
    id: "lambdas",
    title: "Lambdas & Functional Interfaces",
    icon: "λ",
    color: ACCENT,
    lessons: [
      {
        id: "adv-0",
        title: "Lambda Expressions",
        xp: 25,
        theory: [
          text(
            "A **lambda** is a compact way to pass behavior as data. Use it anywhere a functional interface is expected.",
            {
              label: "Lambda syntax",
              content: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<String> names = List.of("Ada", "Grace", "Linus");
        names.forEach(name -> System.out.println(name.toUpperCase()));
    }
}`,
            },
          ),
          quiz(
            "What is the correct lambda for a functional interface method void run()?",
            ["(x) -> { return x; }", "() -> System.out.println(\"ok\")", "lambda run() {}", "run -> {}"],
            1,
            "A no-arg lambda uses () before -> and a statement or expression body.",
          ),
        ],
        challenge: {
          title: "Square with Lambda",
          description: [
            {
              type: "text",
              content:
                "Use List.of(1, 2, 3, 4) and forEach with a lambda to print each number squared on its own line.",
            },
            { type: "expected", label: "Expected output", content: "1\n4\n9\n16" },
          ],
          starterCode: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4);
        // print squares using forEach + lambda
    }
}`,
          solutionCode: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4);
        nums.forEach(n -> System.out.println(n * n));
    }
}`,
          tests: [
            { id: 1, label: "Uses forEach", keywords: [{ pattern: "forEach" }] },
            { id: 2, label: "Uses lambda", keywords: [{ pattern: "->" }] },
          ],
        },
      },
      {
        id: "adv-1",
        title: "Functional Interfaces",
        xp: 25,
        theory: [
          text(
            "A **functional interface** has exactly one abstract method. `@FunctionalInterface` documents intent and enables lambdas.",
            {
              label: "Custom functional interface",
              content: `@FunctionalInterface
interface MathOp {
    int apply(int a, int b);
}

public class Solution {
    static int calculate(int a, int b, MathOp op) {
        return op.apply(a, b);
    }

    public static void main(String[] args) {
        System.out.println(calculate(8, 3, (x, y) -> x + y));
        System.out.println(calculate(8, 3, (x, y) -> x * y));
    }
}`,
            },
          ),
        ],
        challenge: {
          title: "Apply Operation",
          description: [
            {
              type: "text",
              content:
                "Define MathOp and a calculate method. Print the result of subtracting 3 from 10 using a lambda.",
            },
            { type: "expected", label: "Expected output", content: "7" },
          ],
          starterCode: `@FunctionalInterface
interface MathOp {
    int apply(int a, int b);
}

public class Solution {
    static int calculate(int a, int b, MathOp op) {
        return op.apply(a, b);
    }

    public static void main(String[] args) {
        // print 10 - 3 using calculate + lambda
    }
}`,
          solutionCode: `@FunctionalInterface
interface MathOp {
    int apply(int a, int b);
}

public class Solution {
    static int calculate(int a, int b, MathOp op) {
        return op.apply(a, b);
    }

    public static void main(String[] args) {
        System.out.println(calculate(10, 3, (a, b) -> a - b));
    }
}`,
          tests: [
            { id: 1, label: "Defines MathOp", keywords: [{ pattern: "interface\\s+MathOp" }] },
            { id: 2, label: "Prints 7", keywords: [{ pattern: "println" }] },
          ],
        },
      },
      {
        id: "adv-2",
        title: "Method References",
        xp: 25,
        theory: [
          text(
            "**Method references** shorten lambdas when you only call an existing method: `System.out::println`, `String::toUpperCase`, `Integer::sum`.",
            {
              label: "Method reference",
              content: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<String> langs = List.of("java", "go", "rust");
        langs.stream()
             .map(String::toUpperCase)
             .forEach(System.out::println);
    }
}`,
            },
          ),
        ],
        challenge: {
          title: "Uppercase with map",
          description: [
            {
              type: "text",
              content:
                "Given List.of(\"poly\", \"code\"), stream, map with String::toUpperCase, and print each value.",
            },
            { type: "expected", label: "Expected output", content: "POLY\nCODE" },
          ],
          starterCode: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<String> words = List.of("poly", "code");
    }
}`,
          solutionCode: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<String> words = List.of("poly", "code");
        words.stream()
             .map(String::toUpperCase)
             .forEach(System.out::println);
    }
}`,
          tests: [
            { id: 1, label: "Uses stream", keywords: [{ pattern: "\\.stream\\s*\\(" }] },
            { id: 2, label: "Uses method reference", keywords: [{ pattern: "::" }] },
          ],
        },
      },
    ],
  },
  {
    id: "streams",
    title: "Streams API",
    icon: "≋",
    color: ACCENT,
    lessons: [
      {
        id: "adv-3",
        title: "Stream Pipeline Basics",
        xp: 30,
        theory: [
          text(
            "A **stream pipeline** chains filter → map → collect. Streams do not mutate the source collection.",
            {
              label: "Filter and collect",
              content: `import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
        List<Integer> evens = nums.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        System.out.println(evens);
    }
}`,
            },
          ),
        ],
        challenge: {
          title: "Filter Odd Numbers",
          description: [
            {
              type: "text",
              content:
                "From List.of(1,2,3,4,5), collect odd numbers into a list and print it.",
            },
            { type: "expected", label: "Expected output", content: "[1, 3, 5]" },
          ],
          starterCode: `import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5);
    }
}`,
          solutionCode: `import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5);
        List<Integer> odds = nums.stream()
            .filter(n -> n % 2 != 0)
            .collect(Collectors.toList());
        System.out.println(odds);
    }
}`,
          tests: [
            { id: 1, label: "Uses filter", keywords: [{ pattern: "filter" }] },
            { id: 2, label: "Uses collect", keywords: [{ pattern: "collect" }] },
          ],
        },
      },
      {
        id: "adv-4",
        title: "reduce and sum",
        xp: 30,
        theory: [
          text(
            "`reduce` combines stream elements into one value. `sum`, `max`, and `count` are common terminal operations.",
            {
              label: "Sum with reduce",
              content: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(10, 20, 30);
        int total = nums.stream().reduce(0, Integer::sum);
        System.out.println(total);
    }
}`,
            },
          ),
        ],
        challenge: {
          title: "Sum Scores",
          description: [
            {
              type: "text",
              content: "Sum List.of(5, 15, 25) using stream reduce and print the total.",
            },
            { type: "expected", label: "Expected output", content: "45" },
          ],
          starterCode: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> scores = List.of(5, 15, 25);
    }
}`,
          solutionCode: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> scores = List.of(5, 15, 25);
        int total = scores.stream().reduce(0, Integer::sum);
        System.out.println(total);
    }
}`,
          tests: [
            { id: 1, label: "Uses reduce", keywords: [{ pattern: "reduce" }] },
            { id: 2, label: "Prints total", keywords: [{ pattern: "println" }] },
          ],
        },
      },
      {
        id: "adv-5",
        title: "Optional in Streams",
        xp: 30,
        theory: [
          text(
            "**Optional** models values that may be absent. Combine it with streams to avoid null checks.",
            {
              label: "Optional.orElse",
              content: `import java.util.Optional;

public class Solution {
    public static void main(String[] args) {
        Optional<String> nick = Optional.empty();
        String display = nick.orElse("Guest");
        System.out.println(display);
    }
}`,
            },
          ),
          callout(
            "tip",
            "Prefer Optional return types over returning null from methods that may not find a value.",
          ),
        ],
        challenge: {
          title: "Optional Fallback",
          description: [
            {
              type: "text",
              content:
                "Create Optional.empty(), use orElse(\"Anonymous\") and print the result.",
            },
            { type: "expected", label: "Expected output", content: "Anonymous" },
          ],
          starterCode: `import java.util.Optional;

public class Solution {
    public static void main(String[] args) {
    }
}`,
          solutionCode: `import java.util.Optional;

public class Solution {
    public static void main(String[] args) {
        Optional<String> name = Optional.empty();
        System.out.println(name.orElse("Anonymous"));
    }
}`,
          tests: [
            { id: 1, label: "Uses Optional", keywords: [{ pattern: "Optional" }] },
            { id: 2, label: "Uses orElse", keywords: [{ pattern: "orElse" }] },
          ],
        },
      },
    ],
  },
  {
    id: "concurrency",
    title: "Multithreading",
    icon: "⚡",
    color: ACCENT,
    lessons: [
      {
        id: "adv-6",
        title: "Threads and Runnable",
        xp: 30,
        theory: [
          text(
            "A **Thread** executes a `Runnable`. Start it with `start()` — never call `run()` directly if you want a new thread.",
            {
              label: "Runnable thread",
              content: `public class Solution {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> System.out.println("Worker done"));
        worker.start();
        worker.join();
        System.out.println("Main done");
    }
}`,
            },
          ),
        ],
        challenge: {
          title: "Start a Thread",
          description: [
            {
              type: "text",
              content:
                "Create a thread that prints \"Hello from thread\" then join it. Finally print \"Main finished\".",
            },
            {
              type: "expected",
              label: "Expected output",
              content: "Hello from thread\nMain finished",
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) throws InterruptedException {
    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> System.out.println("Hello from thread"));
        t.start();
        t.join();
        System.out.println("Main finished");
    }
}`,
          tests: [
            { id: 1, label: "Creates Thread", keywords: [{ pattern: "new\\s+Thread" }] },
            { id: 2, label: "Calls start", keywords: [{ pattern: "\\.start\\s*\\(" }] },
          ],
        },
      },
      {
        id: "adv-7",
        title: "ExecutorService",
        xp: 30,
        theory: [
          text(
            "**ExecutorService** manages a pool of threads so you do not create unbounded Thread objects.",
            {
              label: "Single-thread executor",
              content: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Solution {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        pool.submit(() -> System.out.println("Task complete"));
        pool.shutdown();
    }
}`,
            },
          ),
        ],
        challenge: {
          title: "Submit a Task",
          description: [
            {
              type: "text",
              content:
                "Use Executors.newSingleThreadExecutor(), submit a task that prints \"Async\", then shutdown the pool.",
            },
            { type: "expected", label: "Expected output", content: "Async" },
          ],
          starterCode: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Solution {
    public static void main(String[] args) {
    }
}`,
          solutionCode: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Solution {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        pool.submit(() -> System.out.println("Async"));
        pool.shutdown();
    }
}`,
          tests: [
            { id: 1, label: "Uses ExecutorService", keywords: [{ pattern: "ExecutorService" }] },
            { id: 2, label: "Submits task", keywords: [{ pattern: "submit" }] },
          ],
        },
      },
      {
        id: "adv-8",
        title: "Synchronization Basics",
        xp: 30,
        theory: [
          text(
            "Use **synchronized** blocks or methods when multiple threads mutate shared state.",
            {
              label: "Synchronized counter",
              content: `public class Solution {
    private static int count = 0;

    static synchronized void increment() {
        count++;
    }

    public static void main(String[] args) {
        increment();
        increment();
        System.out.println(count);
    }
}`,
            },
          ),
        ],
        challenge: {
          title: "Increment Safely",
          description: [
            {
              type: "text",
              content:
                "Use a static synchronized increment() method to add 1 twice to count, then print count.",
            },
            { type: "expected", label: "Expected output", content: "2" },
          ],
          starterCode: `public class Solution {
    private static int count = 0;

    public static void main(String[] args) {
    }
}`,
          solutionCode: `public class Solution {
    private static int count = 0;

    static synchronized void increment() {
        count++;
    }

    public static void main(String[] args) {
        increment();
        increment();
        System.out.println(count);
    }
}`,
          tests: [
            { id: 1, label: "Uses synchronized", keywords: [{ pattern: "synchronized" }] },
            { id: 2, label: "Prints count", keywords: [{ pattern: "println" }] },
          ],
        },
      },
    ],
  },
  {
    id: "jdbc-modern",
    title: "JDBC & Modern Java",
    icon: "🗄",
    color: ACCENT,
    lessons: [
      {
        id: "adv-9",
        title: "JDBC Connection Pattern",
        xp: 35,
        theory: [
          text(
            "**JDBC** connects Java to databases. Always close connections in try-with-resources.",
            {
              label: "Try-with-resources",
              content: `// Pattern (database not available in browser challenges)
try (Connection conn = DriverManager.getConnection(url, user, pass);
     PreparedStatement ps = conn.prepareStatement("SELECT id, name FROM users WHERE id = ?")) {
    ps.setInt(1, 1);
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getString("name"));
        }
    }
}`,
            },
          ),
          callout(
            "info",
            "Challenges in this track simulate JDBC patterns with plain Java output — real DB access runs on the backend in production apps.",
          ),
        ],
        challenge: {
          title: "Simulated Query Result",
          description: [
            {
              type: "text",
              content:
                "Simulate reading one row from a query by printing \"User: Ada\" (as if from ResultSet).",
            },
            { type: "expected", label: "Expected output", content: "User: Ada" },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        System.out.println("User: Ada");
    }
}`,
          tests: [
            { id: 1, label: "Prints user row", keywords: [{ pattern: "User: Ada" }] },
          ],
        },
      },
      {
        id: "adv-10",
        title: "Records & Pattern Matching",
        xp: 35,
        theory: [
          text(
            "**Records** are immutable data carriers. **Pattern matching switch** (Java 21+) simplifies branching on sealed types.",
            {
              label: "Record + switch",
              content: `sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}

public class Solution {
    static double area(Shape shape) {
        return switch (shape) {
            case Circle c -> Math.PI * c.radius() * c.radius();
            case Rectangle r -> r.w() * r.h();
        };
    }

    public static void main(String[] args) {
        System.out.println(area(new Circle(2)));
    }
}`,
            },
          ),
        ],
        challenge: {
          title: "Rectangle Area",
          description: [
            {
              type: "text",
              content:
                "Define record Rectangle(double w, double h) and print area of 4 x 5 rectangle.",
            },
            { type: "expected", label: "Expected output", content: "20.0" },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
    }
}`,
          solutionCode: `public class Solution {
    record Rectangle(double w, double h) {}

    public static void main(String[] args) {
        Rectangle rect = new Rectangle(4, 5);
        System.out.println(rect.w() * rect.h());
    }
}`,
          tests: [
            { id: 1, label: "Defines record", keywords: [{ pattern: "record\\s+Rectangle" }] },
            { id: 2, label: "Prints area", keywords: [{ pattern: "println" }] },
          ],
        },
      },
      {
        id: "adv-11",
        title: "Production-Ready Habits",
        xp: 35,
        theory: [
          text(
            "Advanced Java code favors immutability, clear exceptions, logging, and small testable methods.",
          ),
          callout(
            "tip",
            "Pair streams with domain types (records) and keep I/O at the edges of your application.",
          ),
        ],
        challenge: {
          title: "Immutable Point",
          description: [
            {
              type: "text",
              content:
                "Create record Point(int x, int y), instantiate (3, 4), and print \"Point(3, 4)\" using formatted output.",
            },
            { type: "expected", label: "Expected output", content: "Point(3, 4)" },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
    }
}`,
          solutionCode: `public class Solution {
    record Point(int x, int y) {}

    public static void main(String[] args) {
        Point p = new Point(3, 4);
        System.out.printf("Point(%d, %d)%n", p.x(), p.y());
    }
}`,
          tests: [
            { id: 1, label: "Defines Point record", keywords: [{ pattern: "record\\s+Point" }] },
            { id: 2, label: "Prints formatted point", keywords: [{ pattern: "Point\\(3, 4\\)" }] },
          ],
        },
      },
    ],
  },
];

export const JAVA_ADVANCED_LESSONS = JAVA_ADVANCED_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const JAVA_ADVANCED_TOTAL_XP = JAVA_ADVANCED_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
