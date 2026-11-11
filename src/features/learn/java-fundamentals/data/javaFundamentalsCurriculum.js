// PolyCode — Java Fundamentals interactive course
// 4 chapters · 16 lessons · real javac/java execution via backend
// All challenge classes MUST be named "Solution" (backend writes Solution.java)

const ACCENT = "#e76f00";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return {
      type: "text",
      content,
      code: { lang: "java", ...codeBlock },
    };
  }
  return { type: "text", content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

export const JAVA_FUNDAMENTALS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — What is Java?
  // ─────────────────────────────────────────────────────────────
  {
    id: "intro",
    title: "What is Java?",
    icon: "☕",
    color: ACCENT,
    lessons: [
      {
        id: "java-0",
        title: "What is Java?",
        xp: 10,
        theory: [
          text(
            "**Java** is one of the most popular programming languages in the world. It powers Android apps, enterprise backends, banking systems, and cloud services used by billions of people every day.",
            {
              label: "Your first Java program",
              content: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
            },
          ),
          text(
            "Java was created in 1995 by James Gosling at Sun Microsystems. Its famous motto is **'Write Once, Run Anywhere'** — you write Java code once, compile it to bytecode, and the Java Virtual Machine (JVM) runs it on any operating system.",
          ),
          diagram("How Java code runs", [
            {
              id: "source",
              label: "You write",
              color: ACCENT,
              items: ["Solution.java", "Plain text file", "Your code"],
            },
            {
              id: "compile",
              label: "javac compiles",
              color: "#f59e0b",
              items: ["Solution.class", "Bytecode file", "Platform-neutral"],
            },
            {
              id: "run",
              label: "JVM runs",
              color: "#22c55e",
              items: ["Windows", "Mac", "Linux", "Android"],
            },
          ]),
          callout(
            "info",
            "Don't confuse Java with JavaScript — they are completely different languages. Java is statically typed and compiled; JavaScript runs in the browser.",
          ),
          quiz(
            "What does the JVM do?",
            [
              "Writes Java code for you",
              "Runs Java bytecode on any operating system",
              "Converts HTML to Java",
              "Designs Android apps",
            ],
            1,
            "The JVM (Java Virtual Machine) executes compiled Java bytecode, making Java platform-independent.",
          ),
        ],
        challenge: {
          title: "Hello, PolyCode!",
          description:
            "Print exactly: Hello, PolyCode! — your first Java program. The class is already named Solution for you.",
          starterCode: `public class Solution {
    public static void main(String[] args) {
        // Print your greeting here

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, PolyCode!");
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses System.out.println",
              hint: "System.out.println(\"Hello, PolyCode!\")",
              keywords: [{ pattern: "System\\.out\\.println\\s*\\(" }],
            },
            {
              id: 2,
              label: 'Prints "Hello, PolyCode!"',
              hint: 'The exact text must be: Hello, PolyCode!',
              keywords: [{ pattern: "Hello,\\s*PolyCode!" }],
            },
          ],
        },
      },

      {
        id: "java-1",
        title: "Variables and Data Types",
        xp: 15,
        theory: [
          text(
            "Java is **statically typed** — every variable must have a declared type that cannot change. This lets the compiler catch mistakes before your program even runs.",
            {
              label: "Declaring variables",
              content: `int age = 20;
double price = 9.99;
boolean isActive = true;
char grade = 'A';
String name = "Alice";`,
            },
          ),
          text(
            "Java has **8 primitive types** for raw values, plus `String` for text (which is a class, not a primitive).",
          ),
          diagram("Java's primitive types", [
            {
              id: "integers",
              label: "Whole numbers",
              color: ACCENT,
              items: ["byte (-128 to 127)", "short", "int (most common)", "long (add L suffix)"],
            },
            {
              id: "decimals",
              label: "Decimals",
              color: "#3b82f6",
              items: ["float (add f suffix)", "double (most common)"],
            },
            {
              id: "other",
              label: "Other",
              color: "#22c55e",
              items: ["boolean (true/false)", "char (single character)"],
            },
          ]),
          callout(
            "tip",
            "Use `int` for whole numbers, `double` for decimals, `boolean` for yes/no, and `String` for text — these four cover 90% of everyday coding.",
          ),
          text(
            "Use `final` to make a variable a constant — it cannot be changed after being set.",
            {
              label: "Constants with final",
              content: `final double TAX_RATE = 0.18;
// TAX_RATE = 0.20;  ← compile error!`,
            },
          ),
          quiz(
            "Which type would you use to store someone's age?",
            ["double", "boolean", "int", "char"],
            2,
            "int stores whole numbers and is the standard choice for ages, counts, and indices.",
          ),
        ],
        challenge: {
          title: "Student Profile",
          description: [
            {
              type: "text",
              content:
                "Declare these four variables and print them each on their own line:",
            },
            {
              type: "code",
              content: `String name = "Alice";
int age = 20;
double gpa = 3.85;
boolean enrolled = true;`,
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Alice
20
3.85
true`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        // Declare the four variables and print each one

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 20;
        double gpa = 3.85;
        boolean enrolled = true;
        System.out.println(name);
        System.out.println(age);
        System.out.println(gpa);
        System.out.println(enrolled);
    }
}`,
          tests: [
            {
              id: 1,
              label: 'Declares a String variable with value "Alice"',
              hint: 'String name = "Alice";',
              keywords: [{ pattern: "String\\s+\\w+\\s*=\\s*\"Alice\"" }],
            },
            {
              id: 2,
              label: "Declares an int variable with value 20",
              hint: "int age = 20;",
              keywords: [{ pattern: "int\\s+\\w+\\s*=\\s*20" }],
            },
            {
              id: 3,
              label: "Declares a double variable with value 3.85",
              hint: "double gpa = 3.85;",
              keywords: [{ pattern: "double\\s+\\w+\\s*=\\s*3\\.85" }],
            },
            {
              id: 4,
              label: "Prints all four values",
              hint: "Use System.out.println four times",
              keywords: [{ pattern: "System\\.out\\.println" }],
            },
          ],
        },
      },

      {
        id: "java-2",
        title: "Operators and Expressions",
        xp: 15,
        theory: [
          text(
            "Operators let you compute values, compare things, and combine conditions. Java's operators are similar to most other languages.",
            {
              label: "Arithmetic operators",
              content: `int a = 10, b = 3;
System.out.println(a + b);   // 13
System.out.println(a - b);   // 7
System.out.println(a * b);   // 30
System.out.println(a / b);   // 3  (integer division!)
System.out.println(a % b);   // 1  (remainder)
System.out.println((double) a / b); // 3.333...`,
            },
          ),
          callout(
            "warning",
            "Integer division truncates the decimal. `10 / 3` gives `3`, not `3.33`. Cast to double first: `(double) 10 / 3`.",
          ),
          text(
            "**Comparison operators** return `boolean` (true/false): `==`, `!=`, `>`, `<`, `>=`, `<=`.\n\n**Logical operators** combine booleans: `&&` (and), `||` (or), `!` (not).",
            {
              label: "Comparisons and logic",
              content: `int score = 85;
boolean passed = score >= 60;       // true
boolean distinction = score >= 80;  // true
boolean both = passed && distinction; // true
System.out.println(both);`,
            },
          ),
          text(
            "The **compound assignment** operators are shortcuts: `+=`, `-=`, `*=`, `/=`, `%=`, and the increment/decrement `++` / `--`.",
            {
              label: "Shortcuts",
              content: `int count = 0;
count++;      // count = 1
count += 5;   // count = 6
count *= 2;   // count = 12`,
            },
          ),
          quiz(
            "What does 17 % 5 evaluate to?",
            ["3", "2", "1", "0"],
            1,
            "17 % 5 = 2 because 17 = 3 × 5 + 2. The % operator returns the remainder.",
          ),
        ],
        challenge: {
          title: "Rectangle Calculator",
          description: [
            {
              type: "text",
              content:
                "Given width = 8 and height = 5, calculate and print the area and perimeter on separate lines.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `40
26`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        int width = 8;
        int height = 5;
        // Calculate area and perimeter, then print each

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        int width = 8;
        int height = 5;
        int area = width * height;
        int perimeter = 2 * (width + height);
        System.out.println(area);
        System.out.println(perimeter);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Calculates area using multiplication",
              hint: "int area = width * height;",
              keywords: [{ pattern: "width\\s*\\*\\s*height|height\\s*\\*\\s*width" }],
            },
            {
              id: 2,
              label: "Calculates perimeter",
              hint: "int perimeter = 2 * (width + height);",
              keywords: [{ pattern: "2\\s*\\*" }],
            },
            {
              id: 3,
              label: "Prints both results",
              hint: "Use System.out.println twice",
              keywords: [{ pattern: "System\\.out\\.println" }],
            },
          ],
        },
      },

      {
        id: "java-3",
        title: "String Methods",
        xp: 15,
        theory: [
          text(
            "`String` is a class in Java — it comes with dozens of built-in methods. Strings are **immutable**: every method returns a new String rather than changing the original.",
            {
              label: "Common String methods",
              content: `String s = "Hello, Java!";
System.out.println(s.length());          // 12
System.out.println(s.toUpperCase());     // HELLO, JAVA!
System.out.println(s.toLowerCase());     // hello, java!
System.out.println(s.contains("Java"));  // true
System.out.println(s.replace("Java", "World")); // Hello, World!
System.out.println(s.substring(7, 11));  // Java
System.out.println(s.trim());            // removes spaces at ends`,
            },
          ),
          callout(
            "warning",
            "Never use == to compare String content. Use .equals() instead. `\"hello\" == \"hello\"` may be false; `\"hello\".equals(\"hello\")` is always true.",
          ),
          text(
            "**String concatenation** with `+` joins strings. For building strings in a loop, use `StringBuilder` — it's much faster.",
            {
              label: "Concatenation vs StringBuilder",
              content: `String name = "Alice";
String greeting = "Hello, " + name + "!"; // "Hello, Alice!"

StringBuilder sb = new StringBuilder();
sb.append("Java");
sb.append(" is");
sb.append(" great!");
System.out.println(sb.toString()); // Java is great!`,
            },
          ),
          quiz(
            'What does "  hello  ".trim() return?',
            ['"  hello  "', '"hello"', '"HELLO"', "null"],
            1,
            "trim() removes leading and trailing whitespace, returning the cleaned string.",
          ),
        ],
        challenge: {
          title: "Name Formatter",
          description: [
            {
              type: "text",
              content:
                'Given the string name = "  alice smith  ", print the trimmed, title-cased version and its length.',
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Alice Smith
11`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        String name = "  alice smith  ";
        // 1. Trim the name
        // 2. Capitalize first letters (tip: split on " ", capitalize each word)
        // 3. Print the result and its length

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        String name = "  alice smith  ";
        String trimmed = name.trim();
        String[] words = trimmed.split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            sb.append(Character.toUpperCase(words[i].charAt(0)));
            sb.append(words[i].substring(1));
            if (i < words.length - 1) sb.append(" ");
        }
        String result = sb.toString();
        System.out.println(result);
        System.out.println(result.length());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses trim()",
              hint: "name.trim()",
              keywords: [{ pattern: "\\.trim\\(\\)" }],
            },
            {
              id: 2,
              label: "Splits the string into words",
              hint: 'split(" ")',
              keywords: [{ pattern: "\\.split\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints the formatted name and length",
              hint: "System.out.println twice",
              keywords: [{ pattern: "System\\.out\\.println" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Control Flow
  // ─────────────────────────────────────────────────────────────
  {
    id: "control-flow",
    title: "Control Flow",
    icon: "🔀",
    color: "#f59e0b",
    lessons: [
      {
        id: "java-4",
        title: "if / else and switch",
        xp: 15,
        theory: [
          text(
            "**Control flow** lets your program make decisions. The `if` statement runs a block only when a condition is true; `else if` and `else` handle alternative cases.",
            {
              label: "if / else if / else",
              content: `int score = 78;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else if (score >= 70) {
    System.out.println("C");
} else {
    System.out.println("F");
}
// Output: C`,
            },
          ),
          text(
            "The **ternary operator** is a one-line if-else for simple assignments.",
            {
              label: "Ternary",
              content: `int age = 20;
String status = (age >= 18) ? "Adult" : "Minor";
System.out.println(status); // Adult`,
            },
          ),
          text(
            "The **switch expression** (Java 14+) is clean and concise for matching one value against many cases.",
            {
              label: "switch expression",
              content: `int day = 3;
String name = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    default -> "Weekend";
};
System.out.println(name); // Wednesday`,
            },
          ),
          quiz(
            "What does the ternary operator return for (5 > 3) ? \"yes\" : \"no\"?",
            ['"no"', '"yes"', "true", "null"],
            1,
            "5 > 3 is true, so the ternary returns the first value: \"yes\".",
          ),
        ],
        challenge: {
          title: "Grade Calculator",
          description: [
            {
              type: "text",
              content:
                "Given score = 73, print the letter grade using if/else if/else:",
            },
            {
              type: "code",
              content: `90+ → A
80-89 → B
70-79 → C
60-69 → D
below 60 → F`,
            },
            {
              type: "expected",
              label: "Expected output",
              content: "C",
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        int score = 73;
        // Print the letter grade

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        int score = 73;
        if (score >= 90) {
            System.out.println("A");
        } else if (score >= 80) {
            System.out.println("B");
        } else if (score >= 70) {
            System.out.println("C");
        } else if (score >= 60) {
            System.out.println("D");
        } else {
            System.out.println("F");
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses if / else if",
              hint: "if (score >= 90) { ... } else if ...",
              keywords: [{ pattern: "else\\s+if" }],
            },
            {
              id: 2,
              label: "Checks score >= 70 for C grade",
              hint: "else if (score >= 70)",
              keywords: [{ pattern: ">=\\s*70" }],
            },
            {
              id: 3,
              label: 'Prints "C" for score 73',
              hint: 'System.out.println("C")',
              keywords: [{ pattern: "System\\.out\\.println\\s*\\(\\s*\"C\"\\s*\\)" }],
            },
          ],
        },
      },

      {
        id: "java-5",
        title: "for and while Loops",
        xp: 20,
        theory: [
          text(
            "Loops repeat a block of code. The **for loop** is best when you know how many times to repeat; **while** is best when you loop until a condition changes.",
            {
              label: "for loop",
              content: `// Print 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");
}
// Output: 1 2 3 4 5`,
            },
          ),
          text(
            "The **enhanced for loop** (for-each) iterates over arrays or collections without needing an index.",
            {
              label: "for-each loop",
              content: `String[] fruits = {"apple", "banana", "cherry"};
for (String fruit : fruits) {
    System.out.println(fruit);
}`,
            },
          ),
          text(
            "Use **while** when the number of iterations isn't known in advance. Use **do-while** when the body must run at least once.",
            {
              label: "while loop",
              content: `int n = 1;
while (n <= 5) {
    System.out.print(n + " ");
    n++;
}
// Output: 1 2 3 4 5`,
            },
          ),
          text(
            "**break** exits the loop immediately. **continue** skips the rest of the current iteration and jumps to the next one.",
            {
              label: "break and continue",
              content: `// Print only odd numbers 1-10
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue; // skip evens
    System.out.print(i + " ");
}
// Output: 1 3 5 7 9`,
            },
          ),
          quiz(
            "How many times does this loop run?  for (int i = 0; i < 5; i++)",
            ["4", "5", "6", "Infinite"],
            1,
            "i goes 0, 1, 2, 3, 4 — that's 5 iterations. The loop stops when i reaches 5.",
          ),
        ],
        challenge: {
          title: "Multiplication Table",
          description: [
            {
              type: "text",
              content:
                "Print the 5 times table from 1 to 10, one result per line.",
            },
            {
              type: "expected",
              label: "Expected output (first 3 lines shown)",
              content: `5
10
15
...
50`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        // Print 5 x 1 through 5 x 10

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.println(5 * i);
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses a for loop",
              hint: "for (int i = 1; i <= 10; i++)",
              keywords: [{ pattern: "for\\s*\\(" }],
            },
            {
              id: 2,
              label: "Multiplies by 5",
              hint: "5 * i",
              keywords: [{ pattern: "5\\s*\\*\\s*i|i\\s*\\*\\s*5" }],
            },
            {
              id: 3,
              label: "Loops 10 times",
              hint: "i <= 10",
              keywords: [{ pattern: "<=\\s*10" }],
            },
          ],
        },
      },

      {
        id: "java-6",
        title: "Arrays",
        xp: 20,
        theory: [
          text(
            "An **array** is a fixed-size, ordered collection of elements of the same type. Arrays are zero-indexed — the first element is at index 0.",
            {
              label: "Creating and accessing arrays",
              content: `int[] scores = {88, 72, 95, 61, 84};
System.out.println(scores[0]);   // 88
System.out.println(scores[4]);   // 84
System.out.println(scores.length); // 5

scores[2] = 99; // change an element`,
            },
          ),
          callout(
            "warning",
            "Accessing an index outside the array (e.g. scores[5] on a 5-element array) throws ArrayIndexOutOfBoundsException — one of the most common Java errors.",
          ),
          text(
            "Use the `Arrays` utility class for common operations like sorting and converting to a readable string.",
            {
              label: "Arrays utility class",
              content: `import java.util.Arrays;

int[] nums = {5, 2, 8, 1, 9};
Arrays.sort(nums);
System.out.println(Arrays.toString(nums));
// [1, 2, 5, 8, 9]`,
            },
          ),
          quiz(
            'What is the index of "cherry" in {"apple", "banana", "cherry"}?',
            ["1", "2", "3", "0"],
            1,
            "Arrays are zero-indexed: apple=0, banana=1, cherry=2.",
          ),
        ],
        challenge: {
          title: "Array Statistics",
          description: [
            {
              type: "text",
              content:
                "Given int[] numbers = {4, 7, 2, 9, 1, 5, 8, 3, 6}, print the sum and the maximum value on separate lines.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `45
9`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        int[] numbers = {4, 7, 2, 9, 1, 5, 8, 3, 6};
        // Calculate sum and max, then print each

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        int[] numbers = {4, 7, 2, 9, 1, 5, 8, 3, 6};
        int sum = 0;
        int max = numbers[0];
        for (int n : numbers) {
            sum += n;
            if (n > max) max = n;
        }
        System.out.println(sum);
        System.out.println(max);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses a loop to iterate the array",
              hint: "for (int n : numbers) or for (int i = 0; ...)",
              keywords: [{ pattern: "for\\s*\\(" }],
            },
            {
              id: 2,
              label: "Accumulates a sum",
              hint: "sum += n;",
              keywords: [{ pattern: "sum\\s*\\+=" }],
            },
            {
              id: 3,
              label: "Tracks the maximum",
              hint: "if (n > max) max = n;",
              keywords: [{ pattern: "max" }],
            },
            {
              id: 4,
              label: "Prints sum and max",
              hint: "System.out.println(sum) and System.out.println(max)",
              keywords: [{ pattern: "System\\.out\\.println" }],
            },
          ],
        },
      },

      {
        id: "java-7",
        title: "Methods",
        xp: 20,
        theory: [
          text(
            "A **method** is a named, reusable block of code. Instead of repeating logic, you write it once and call it whenever needed.",
            {
              label: "Method anatomy",
              content: `public static int add(int a, int b) {
    return a + b;
}

// Calling the method:
int result = add(3, 4); // 7`,
            },
          ),
          diagram("Parts of a method", [
            {
              id: "modifier",
              label: "Access modifier",
              color: ACCENT,
              items: ["public", "private", "protected"],
            },
            {
              id: "returntype",
              label: "Return type",
              color: "#3b82f6",
              items: ["int", "String", "double", "void (nothing returned)"],
            },
            {
              id: "params",
              label: "Parameters",
              color: "#22c55e",
              items: ["Inputs the method needs", "Can have 0 or many", "Each has a type"],
            },
          ]),
          text(
            "**Method overloading** lets you have multiple methods with the same name, as long as they have different parameter types or counts.",
            {
              label: "Overloading",
              content: `public static int multiply(int a, int b) { return a * b; }
public static double multiply(double a, double b) { return a * b; }

multiply(3, 4);       // calls int version → 12
multiply(2.5, 4.0);   // calls double version → 10.0`,
            },
          ),
          callout(
            "tip",
            "A method should do ONE thing and do it well. If you find yourself writing a method that does three different things, split it into three methods.",
          ),
          quiz(
            "What return type should a method have if it prints something but returns nothing?",
            ["int", "String", "void", "null"],
            2,
            "void means the method performs an action but doesn't return a value to the caller.",
          ),
        ],
        challenge: {
          title: "isPrime Method",
          description: [
            {
              type: "text",
              content:
                "Write a method isPrime(int n) that returns true if n is prime, false otherwise. Then print whether 17 and 20 are prime.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `true
false`,
            },
          ],
          starterCode: `public class Solution {
    public static boolean isPrime(int n) {
        // Return true if n is prime, false otherwise

    }

    public static void main(String[] args) {
        System.out.println(isPrime(17));
        System.out.println(isPrime(20));
    }
}`,
          solutionCode: `public class Solution {
    public static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPrime(17));
        System.out.println(isPrime(20));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines isPrime method returning boolean",
              hint: "public static boolean isPrime(int n)",
              keywords: [{ pattern: "boolean\\s+isPrime" }],
            },
            {
              id: 2,
              label: "Uses a loop to check divisibility",
              hint: "for (int i = 2; i <= Math.sqrt(n); i++)",
              keywords: [{ pattern: "for\\s*\\(" }],
            },
            {
              id: 3,
              label: "Checks remainder with %",
              hint: "n % i == 0",
              keywords: [{ pattern: "n\\s*%\\s*i|%\\s*i\\s*==\\s*0" }],
            },
            {
              id: 4,
              label: "Calls isPrime(17) and isPrime(20)",
              hint: "isPrime(17) and isPrime(20) in main",
              keywords: [{ pattern: "isPrime\\s*\\(\\s*17\\s*\\)" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Object-Oriented Programming
  // ─────────────────────────────────────────────────────────────
  {
    id: "oop",
    title: "Object-Oriented Programming",
    icon: "🧱",
    color: "#3b82f6",
    lessons: [
      {
        id: "java-8",
        title: "Classes and Objects",
        xp: 25,
        theory: [
          text(
            "Java is an **object-oriented language**. A **class** is a blueprint; an **object** is a real instance created from that blueprint. Objects bundle related data (fields) and behaviour (methods) together.",
            {
              label: "Defining a class",
              content: `public class Dog {
    String name;
    String breed;
    int age;

    public Dog(String name, String breed, int age) {
        this.name = name;
        this.breed = breed;
        this.age = age;
    }

    public void bark() {
        System.out.println(name + " says: Woof!");
    }
}`,
            },
          ),
          text(
            "The **constructor** is a special method called when you create an object with `new`. The `this` keyword refers to the current object.",
            {
              label: "Creating objects",
              content: `Dog rex = new Dog("Rex", "Shepherd", 3);
Dog buddy = new Dog("Buddy", "Retriever", 5);

rex.bark();     // Rex says: Woof!
buddy.bark();   // Buddy says: Woof!`,
            },
          ),
          callout(
            "tip",
            "Fields should be private and accessed through public getter/setter methods — this is called encapsulation and it protects your data from being changed accidentally.",
          ),
          quiz(
            "What keyword creates a new object from a class?",
            ["create", "new", "object", "make"],
            1,
            "The new keyword allocates memory and calls the constructor to initialize the object.",
          ),
        ],
        challenge: {
          title: "BankAccount Class",
          description: [
            {
              type: "text",
              content:
                "Create a BankAccount class inside Solution with an owner (String) and balance (double). Add deposit(double amount) and printBalance() methods. In main, create an account for Alice with $1000, deposit $500, then print the balance.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: "1500.0",
            },
          ],
          starterCode: `public class Solution {
    // Define BankAccount class here
    static class BankAccount {
        String owner;
        double balance;

        BankAccount(String owner, double balance) {
            // initialize fields

        }

        void deposit(double amount) {
            // add amount to balance

        }

        void printBalance() {
            // print the balance

        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Alice", 1000);
        acc.deposit(500);
        acc.printBalance();
    }
}`,
          solutionCode: `public class Solution {
    static class BankAccount {
        String owner;
        double balance;

        BankAccount(String owner, double balance) {
            this.owner = owner;
            this.balance = balance;
        }

        void deposit(double amount) {
            balance += amount;
        }

        void printBalance() {
            System.out.println(balance);
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Alice", 1000);
        acc.deposit(500);
        acc.printBalance();
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines a BankAccount class",
              hint: "static class BankAccount { ... }",
              keywords: [{ pattern: "class\\s+BankAccount" }],
            },
            {
              id: 2,
              label: "Constructor initializes owner and balance",
              hint: "this.owner = owner; this.balance = balance;",
              keywords: [{ pattern: "this\\.balance\\s*=" }],
            },
            {
              id: 3,
              label: "deposit() adds to balance",
              hint: "balance += amount;",
              keywords: [{ pattern: "balance\\s*\\+=" }],
            },
            {
              id: 4,
              label: "printBalance() prints the balance",
              hint: "System.out.println(balance)",
              keywords: [{ pattern: "System\\.out\\.println\\s*\\(\\s*balance\\s*\\)" }],
            },
          ],
        },
      },

      {
        id: "java-9",
        title: "Inheritance",
        xp: 25,
        theory: [
          text(
            "**Inheritance** lets one class (child) reuse and extend the fields and methods of another (parent). Use the `extends` keyword. The child gets everything the parent has, plus can add its own.",
            {
              label: "extends",
              content: `class Animal {
    String name;
    Animal(String name) { this.name = name; }
    void speak() { System.out.println(name + " makes a sound."); }
}

class Dog extends Animal {
    String breed;
    Dog(String name, String breed) {
        super(name); // calls Animal's constructor
        this.breed = breed;
    }
    @Override
    void speak() { System.out.println(name + " barks!"); }
}`,
            },
          ),
          text(
            "`super(...)` calls the parent constructor. `@Override` tells the compiler you are intentionally replacing the parent's method — it catches typos in method names.",
          ),
          text(
            "**Polymorphism** means you can treat a `Dog` as an `Animal`. The correct overridden method is called automatically at runtime.",
            {
              label: "Polymorphism in action",
              content: `Animal[] animals = { new Dog("Rex", "Shepherd"), new Animal("Cat") };
for (Animal a : animals) {
    a.speak(); // calls the right version for each object
}
// Rex barks!
// Cat makes a sound.`,
            },
          ),
          quiz(
            "What does @Override do?",
            [
              "Creates a new method",
              "Deletes the parent method",
              "Tells the compiler this method replaces the parent version",
              "Makes the method run faster",
            ],
            2,
            "@Override is an annotation that verifies you are correctly overriding a parent method — the compiler will error if the method doesn't exist in the parent.",
          ),
        ],
        challenge: {
          title: "Shape Hierarchy",
          description: [
            {
              type: "text",
              content:
                "Create a Shape base class with a name field and describe() method. Create a Circle subclass that overrides describe() to print its radius. In main, call describe() on both a Shape and a Circle.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `I am a Shape
I am a Circle with radius 5.0`,
            },
          ],
          starterCode: `public class Solution {
    static class Shape {
        String name;
        Shape(String name) { this.name = name; }
        void describe() {
            System.out.println("I am a " + name);
        }
    }

    static class Circle extends Shape {
        double radius;
        Circle(double radius) {
            // call super constructor with "Circle"

        }
        @Override
        void describe() {
            // print "I am a Circle with radius X"

        }
    }

    public static void main(String[] args) {
        Shape s = new Shape("Shape");
        Circle c = new Circle(5.0);
        s.describe();
        c.describe();
    }
}`,
          solutionCode: `public class Solution {
    static class Shape {
        String name;
        Shape(String name) { this.name = name; }
        void describe() {
            System.out.println("I am a " + name);
        }
    }

    static class Circle extends Shape {
        double radius;
        Circle(double radius) {
            super("Circle");
            this.radius = radius;
        }
        @Override
        void describe() {
            System.out.println("I am a Circle with radius " + radius);
        }
    }

    public static void main(String[] args) {
        Shape s = new Shape("Shape");
        Circle c = new Circle(5.0);
        s.describe();
        c.describe();
    }
}`,
          tests: [
            {
              id: 1,
              label: "Circle extends Shape",
              hint: "static class Circle extends Shape",
              keywords: [{ pattern: "Circle\\s+extends\\s+Shape" }],
            },
            {
              id: 2,
              label: "Calls super() in Circle constructor",
              hint: 'super("Circle");',
              keywords: [{ pattern: "super\\s*\\(" }],
            },
            {
              id: 3,
              label: "Overrides describe() in Circle",
              hint: "@Override void describe()",
              keywords: [{ pattern: "@Override" }],
            },
            {
              id: 4,
              label: "Prints correct output for both objects",
              hint: "s.describe() and c.describe()",
              keywords: [{ pattern: "\\.describe\\s*\\(\\s*\\)" }],
            },
          ],
        },
      },

      {
        id: "java-10",
        title: "Interfaces",
        xp: 25,
        theory: [
          text(
            "An **interface** is a contract — it declares methods that any implementing class must provide. A class can implement multiple interfaces (unlike inheritance where only one parent is allowed).",
            {
              label: "Defining and implementing an interface",
              content: `interface Drawable {
    void draw(); // implicitly public abstract
}

interface Resizable {
    void resize(double factor);
}

class Circle implements Drawable, Resizable {
    double radius;
    Circle(double radius) { this.radius = radius; }

    @Override public void draw() {
        System.out.println("Drawing circle r=" + radius);
    }
    @Override public void resize(double factor) {
        radius *= factor;
    }
}`,
            },
          ),
          diagram("Interface vs Abstract Class", [
            {
              id: "interface",
              label: "Interface",
              color: "#3b82f6",
              items: ["Implement many", "Only constants", "No constructor", "Defines capability"],
            },
            {
              id: "abstract",
              label: "Abstract Class",
              color: ACCENT,
              items: ["Extend only one", "Any fields", "Has constructor", "Shares common code"],
            },
          ]),
          text(
            "Java 8+ allows **default methods** in interfaces — methods with a body that implementing classes can optionally override.",
            {
              label: "Default method",
              content: `interface Logger {
    void log(String message);
    default void logError(String msg) {
        log("[ERROR] " + msg);
    }
}`,
            },
          ),
          quiz(
            "How many interfaces can a class implement?",
            ["Only 1", "At most 2", "Up to 5", "As many as needed"],
            3,
            "A class can implement any number of interfaces, separated by commas: class Foo implements A, B, C",
          ),
        ],
        challenge: {
          title: "Payable Interface",
          description: [
            {
              type: "text",
              content:
                "Create a Payable interface with calculatePay() returning double. Implement it in Employee with hourlyRate and hoursWorked fields. Print the pay for an employee earning $25/hr for 40 hours.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: "1000.0",
            },
          ],
          starterCode: `public class Solution {
    interface Payable {
        double calculatePay();
    }

    static class Employee implements Payable {
        double hourlyRate;
        int hoursWorked;

        Employee(double hourlyRate, int hoursWorked) {
            // initialize fields

        }

        @Override
        public double calculatePay() {
            // return hourlyRate * hoursWorked

        }
    }

    public static void main(String[] args) {
        Employee emp = new Employee(25.0, 40);
        System.out.println(emp.calculatePay());
    }
}`,
          solutionCode: `public class Solution {
    interface Payable {
        double calculatePay();
    }

    static class Employee implements Payable {
        double hourlyRate;
        int hoursWorked;

        Employee(double hourlyRate, int hoursWorked) {
            this.hourlyRate = hourlyRate;
            this.hoursWorked = hoursWorked;
        }

        @Override
        public double calculatePay() {
            return hourlyRate * hoursWorked;
        }
    }

    public static void main(String[] args) {
        Employee emp = new Employee(25.0, 40);
        System.out.println(emp.calculatePay());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines Payable interface with calculatePay()",
              hint: "interface Payable { double calculatePay(); }",
              keywords: [{ pattern: "interface\\s+Payable" }],
            },
            {
              id: 2,
              label: "Employee implements Payable",
              hint: "static class Employee implements Payable",
              keywords: [{ pattern: "implements\\s+Payable" }],
            },
            {
              id: 3,
              label: "calculatePay returns hourlyRate * hoursWorked",
              hint: "return hourlyRate * hoursWorked;",
              keywords: [{ pattern: "hourlyRate\\s*\\*\\s*hoursWorked|hoursWorked\\s*\\*\\s*hourlyRate" }],
            },
          ],
        },
      },

      {
        id: "java-11",
        title: "Exception Handling",
        xp: 25,
        theory: [
          text(
            "When something goes wrong at runtime — dividing by zero, null pointer, file not found — Java throws an **exception**. Use `try-catch` to handle it gracefully instead of crashing.",
            {
              label: "try-catch-finally",
              content: `try {
    int result = 10 / 0; // throws ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero: " + e.getMessage());
} finally {
    System.out.println("This always runs");
}`,
            },
          ),
          text(
            "You can throw your own exceptions with `throw new ExceptionType(\"message\")`, and create custom exception classes.",
            {
              label: "Throwing exceptions",
              content: `public static int divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("Divisor cannot be zero");
    }
    return a / b;
}`,
            },
          ),
          callout(
            "tip",
            "Java 7+ try-with-resources automatically closes files and connections: try (Scanner sc = new Scanner(file)) { ... } — no finally needed.",
          ),
          quiz(
            "What block always runs whether an exception occurs or not?",
            ["catch", "throw", "finally", "try"],
            2,
            "The finally block always executes — it's used to release resources like file handles or database connections.",
          ),
        ],
        challenge: {
          title: "Safe Division",
          description: [
            {
              type: "text",
              content:
                "Write a safeDivide(int a, int b) method that returns a / b, but catches ArithmeticException and prints \"Cannot divide by zero\" if b is 0 and returns 0. Test with safeDivide(10, 2) and safeDivide(5, 0).",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `5
Cannot divide by zero
0`,
            },
          ],
          starterCode: `public class Solution {
    public static int safeDivide(int a, int b) {
        // try dividing, catch ArithmeticException

    }

    public static void main(String[] args) {
        System.out.println(safeDivide(10, 2));
        System.out.println(safeDivide(5, 0));
    }
}`,
          solutionCode: `public class Solution {
    public static int safeDivide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
            return 0;
        }
    }

    public static void main(String[] args) {
        System.out.println(safeDivide(10, 2));
        System.out.println(safeDivide(5, 0));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses try-catch",
              hint: "try { ... } catch (ArithmeticException e) { ... }",
              keywords: [{ pattern: "try\\s*\\{" }],
            },
            {
              id: 2,
              label: "Catches ArithmeticException",
              hint: "catch (ArithmeticException e)",
              keywords: [{ pattern: "catch\\s*\\(\\s*ArithmeticException" }],
            },
            {
              id: 3,
              label: 'Prints "Cannot divide by zero"',
              hint: 'System.out.println("Cannot divide by zero")',
              keywords: [{ pattern: "Cannot divide by zero" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Collections and Modern Java
  // ─────────────────────────────────────────────────────────────
  {
    id: "collections",
    title: "Collections and Modern Java",
    icon: "📦",
    color: "#22c55e",
    lessons: [
      {
        id: "java-12",
        title: "ArrayList and LinkedList",
        xp: 20,
        theory: [
          text(
            "Arrays have a fixed size. **ArrayList** is a dynamic list that grows automatically. It is the most commonly used collection in Java.",
            {
              label: "ArrayList basics",
              content: `import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");

System.out.println(names.size());       // 3
System.out.println(names.get(1));       // Bob
System.out.println(names.contains("Alice")); // true

names.remove("Bob");
System.out.println(names); // [Alice, Charlie]`,
            },
          ),
          text(
            "Iterate an ArrayList with a for-each loop or a standard for loop using `get(i)`.",
            {
              label: "Iterating",
              content: `for (String name : names) {
    System.out.println(name);
}`,
            },
          ),
          diagram("ArrayList vs Array", [
            {
              id: "array",
              label: "Array",
              color: ACCENT,
              items: ["Fixed size", "int[] scores", "Fast access", "No add/remove"],
            },
            {
              id: "arraylist",
              label: "ArrayList",
              color: "#22c55e",
              items: ["Dynamic size", "ArrayList<Integer>", "Fast access", "add/remove built in"],
            },
          ]),
          quiz(
            "What method adds an element to an ArrayList?",
            ["push()", "insert()", "add()", "append()"],
            2,
            "ArrayList uses add() to append elements and add(index, element) to insert at a position.",
          ),
        ],
        challenge: {
          title: "Filter Even Numbers",
          description: [
            {
              type: "text",
              content:
                "Given ArrayList<Integer> numbers containing [1,2,3,4,5,6,7,8,9,10], create a new ArrayList containing only the even numbers and print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: "[2, 4, 6, 8, 10]",
            },
          ],
          starterCode: `import java.util.ArrayList;

public class Solution {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 10; i++) numbers.add(i);

        ArrayList<Integer> evens = new ArrayList<>();
        // Add only even numbers to evens

        System.out.println(evens);
    }
}`,
          solutionCode: `import java.util.ArrayList;

public class Solution {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 10; i++) numbers.add(i);

        ArrayList<Integer> evens = new ArrayList<>();
        for (int n : numbers) {
            if (n % 2 == 0) evens.add(n);
        }
        System.out.println(evens);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Creates an evens ArrayList",
              hint: "ArrayList<Integer> evens = new ArrayList<>();",
              keywords: [{ pattern: "ArrayList.*evens|evens.*ArrayList" }],
            },
            {
              id: 2,
              label: "Filters with % 2 == 0",
              hint: "if (n % 2 == 0)",
              keywords: [{ pattern: "%\\s*2\\s*==\\s*0" }],
            },
            {
              id: 3,
              label: "Prints the result",
              hint: "System.out.println(evens)",
              keywords: [{ pattern: "System\\.out\\.println\\s*\\(\\s*evens\\s*\\)" }],
            },
          ],
        },
      },

      {
        id: "java-13",
        title: "HashMap",
        xp: 20,
        theory: [
          text(
            "A **HashMap** stores key-value pairs. Every key is unique. Looking up a value by key is O(1) — extremely fast, regardless of how many entries are stored.",
            {
              label: "HashMap basics",
              content: `import java.util.HashMap;

HashMap<String, Integer> scores = new HashMap<>();
scores.put("Alice", 92);
scores.put("Bob", 85);
scores.put("Charlie", 78);

System.out.println(scores.get("Bob"));        // 85
System.out.println(scores.containsKey("Alice")); // true
System.out.println(scores.size());             // 3

scores.put("Bob", 90); // update existing key`,
            },
          ),
          text(
            "Iterate a HashMap using `entrySet()` to access both key and value together.",
            {
              label: "Iterating entries",
              content: `for (HashMap.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}`,
            },
          ),
          callout(
            "tip",
            "getOrDefault(key, defaultValue) is safer than get() — it returns the default value instead of null when the key doesn't exist.",
          ),
          quiz(
            "What happens if you put() a key that already exists in a HashMap?",
            [
              "It throws an exception",
              "It adds a duplicate",
              "It replaces the old value",
              "Nothing changes",
            ],
            2,
            "put() with an existing key replaces the previous value. The map always keeps at most one entry per key.",
          ),
        ],
        challenge: {
          title: "Word Counter",
          description: [
            {
              type: "text",
              content:
                'Count how many times each word appears in: "the cat sat on the mat the cat". Print each word and its count.',
            },
            {
              type: "expected",
              label: "Expected output (order may vary)",
              content: `the: 3
cat: 2
sat: 1
on: 1
mat: 1`,
            },
          ],
          starterCode: `import java.util.HashMap;

public class Solution {
    public static void main(String[] args) {
        String sentence = "the cat sat on the mat the cat";
        String[] words = sentence.split(" ");
        HashMap<String, Integer> freq = new HashMap<>();

        // Count each word

        // Print results
        for (HashMap.Entry<String, Integer> entry : freq.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
          solutionCode: `import java.util.HashMap;

public class Solution {
    public static void main(String[] args) {
        String sentence = "the cat sat on the mat the cat";
        String[] words = sentence.split(" ");
        HashMap<String, Integer> freq = new HashMap<>();

        for (String word : words) {
            freq.put(word, freq.getOrDefault(word, 0) + 1);
        }

        for (HashMap.Entry<String, Integer> entry : freq.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Creates a HashMap for frequencies",
              hint: "HashMap<String, Integer> freq = new HashMap<>();",
              keywords: [{ pattern: "HashMap.*freq|freq.*HashMap" }],
            },
            {
              id: 2,
              label: "Uses getOrDefault to count",
              hint: "freq.getOrDefault(word, 0) + 1",
              keywords: [{ pattern: "getOrDefault" }],
            },
            {
              id: 3,
              label: "Iterates with entrySet()",
              hint: "for (HashMap.Entry<...> entry : freq.entrySet())",
              keywords: [{ pattern: "entrySet\\s*\\(\\s*\\)" }],
            },
          ],
        },
      },

      {
        id: "java-14",
        title: "Lambdas and Streams",
        xp: 30,
        theory: [
          text(
            "**Lambda expressions** (Java 8+) are short anonymous functions. They are most commonly used with the **Stream API** to process collections in a clean, readable pipeline.",
            {
              label: "Lambda syntax",
              content: `// Old way
Runnable r = new Runnable() {
    public void run() { System.out.println("Hello"); }
};

// Lambda way
Runnable r = () -> System.out.println("Hello");

// With parameters
(int a, int b) -> a + b
name -> name.toUpperCase()`,
            },
          ),
          text(
            "The **Stream API** lets you filter, transform, and collect data in a fluent pipeline. Streams don't modify the original list — they produce new values.",
            {
              label: "Stream pipeline",
              content: `import java.util.List;
import java.util.stream.Collectors;

List<String> names = List.of("Alice", "Bob", "Charlie", "Anna");

List<String> result = names.stream()
    .filter(n -> n.startsWith("A"))   // keep A-names
    .map(String::toUpperCase)          // uppercase
    .sorted()                          // sort
    .collect(Collectors.toList());     // gather into list

System.out.println(result); // [ALICE, ANNA]`,
            },
          ),
          callout(
            "info",
            "Streams are lazy — intermediate operations (filter, map, sorted) don't run until a terminal operation (collect, forEach, count) is called.",
          ),
          quiz(
            "Which Stream operation triggers actual execution?",
            ["filter()", "map()", "sorted()", "collect()"],
            3,
            "collect() is a terminal operation — it triggers the entire pipeline to execute and gathers results into a collection.",
          ),
        ],
        challenge: {
          title: "Stream Pipeline",
          description: [
            {
              type: "text",
              content:
                "Given a list of integers [5, 2, 8, 1, 9, 3, 7, 4, 6], use streams to print the sum of all numbers greater than 4.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: "35",
            },
          ],
          starterCode: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(5, 2, 8, 1, 9, 3, 7, 4, 6);
        // Use stream().filter().mapToInt().sum() to get sum of numbers > 4

    }
}`,
          solutionCode: `import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(5, 2, 8, 1, 9, 3, 7, 4, 6);
        int sum = numbers.stream()
            .filter(n -> n > 4)
            .mapToInt(Integer::intValue)
            .sum();
        System.out.println(sum);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses .stream()",
              hint: "numbers.stream()",
              keywords: [{ pattern: "\\.stream\\s*\\(\\s*\\)" }],
            },
            {
              id: 2,
              label: "Filters numbers > 4",
              hint: ".filter(n -> n > 4)",
              keywords: [{ pattern: "filter\\s*\\(.*>\\s*4" }],
            },
            {
              id: 3,
              label: "Calls .sum() to get total",
              hint: ".mapToInt(Integer::intValue).sum()",
              keywords: [{ pattern: "\\.sum\\s*\\(\\s*\\)" }],
            },
            {
              id: 4,
              label: "Prints the result",
              hint: "System.out.println(sum)",
              keywords: [{ pattern: "System\\.out\\.println" }],
            },
          ],
        },
      },

      {
        id: "java-15",
        title: "Generics",
        xp: 30,
        theory: [
          text(
            "**Generics** let you write classes and methods that work with any type, while keeping compile-time type safety. Instead of writing a StringBox and an IntBox separately, you write one Box<T>.",
            {
              label: "Generic class",
              content: `public class Box<T> {
    private T value;
    public Box(T value) { this.value = value; }
    public T getValue() { return value; }
}

Box<String> strBox = new Box<>("Hello");
Box<Integer> intBox = new Box<>(42);

System.out.println(strBox.getValue().toUpperCase()); // HELLO
System.out.println(intBox.getValue() * 2);           // 84`,
            },
          ),
          text(
            "**Bounded type parameters** restrict which types can be used. `<T extends Number>` means T must be Number or a subclass.",
            {
              label: "Bounded generics",
              content: `public static <T extends Number> double sum(List<T> list) {
    double total = 0;
    for (T item : list) total += item.doubleValue();
    return total;
}

System.out.println(sum(List.of(1, 2, 3)));     // 6.0
System.out.println(sum(List.of(1.5, 2.5)));    // 4.0`,
            },
          ),
          callout(
            "info",
            "All Java Collections use generics: ArrayList<String>, HashMap<String, Integer>. The type in <> tells Java what type of objects the collection holds.",
          ),
          quiz(
            "What does <T extends Comparable<T>> mean?",
            [
              "T can be any type",
              "T must be a String",
              "T must implement the Comparable interface",
              "T must extend a class",
            ],
            2,
            "extends in a generic bound means T must implement that interface (or extend that class), allowing you to call Comparable methods on T.",
          ),
        ],
        challenge: {
          title: "Generic Pair",
          description: [
            {
              type: "text",
              content:
                "Create a generic Pair<A, B> class with two fields first and second. Add a toString() that returns \"(first, second)\". Create a Pair<String, Integer> and print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: "(Alice, 30)",
            },
          ],
          starterCode: `public class Solution {
    static class Pair<A, B> {
        A first;
        B second;

        Pair(A first, B second) {
            // initialize fields

        }

        @Override
        public String toString() {
            // return "(first, second)"

        }
    }

    public static void main(String[] args) {
        Pair<String, Integer> p = new Pair<>("Alice", 30);
        System.out.println(p);
    }
}`,
          solutionCode: `public class Solution {
    static class Pair<A, B> {
        A first;
        B second;

        Pair(A first, B second) {
            this.first = first;
            this.second = second;
        }

        @Override
        public String toString() {
            return "(" + first + ", " + second + ")";
        }
    }

    public static void main(String[] args) {
        Pair<String, Integer> p = new Pair<>("Alice", 30);
        System.out.println(p);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines Pair with two type parameters <A, B>",
              hint: "static class Pair<A, B>",
              keywords: [{ pattern: "class\\s+Pair\\s*<" }],
            },
            {
              id: 2,
              label: "Constructor initializes both fields",
              hint: "this.first = first; this.second = second;",
              keywords: [{ pattern: "this\\.first\\s*=" }],
            },
            {
              id: 3,
              label: "toString() returns (first, second) format",
              hint: 'return "(" + first + ", " + second + ")";',
              keywords: [{ pattern: "toString" }],
            },
            {
              id: 4,
              label: 'Creates Pair<String, Integer>("Alice", 30)',
              hint: 'new Pair<>("Alice", 30)',
              keywords: [{ pattern: "new\\s+Pair\\s*<" }],
            },
          ],
        },
      },
    ],
  },
];

// Flatten all lessons for easy lookup by id

// Flatten all lessons — inject chapterTitle and chapterColor into every lesson
// (required by Hub, LessonPage, Sidebar, and search)
export const JAVA_FUNDAMENTALS_LESSONS = JAVA_FUNDAMENTALS_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId:    ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const JAVA_TOTAL_XP = JAVA_FUNDAMENTALS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
