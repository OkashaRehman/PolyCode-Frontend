// PolyCode — Java Exception Handling interactive course
// 4 chapters · 12 lessons · real javac/java execution via backend
// All challenge classes MUST be named "Solution"

const ACCENT = "#ef4444";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}
function callout(variant, content) {
  return { type: "callout", variant, content };
}
function text(content, codeBlock = null) {
  if (codeBlock) return { type: "text", content, code: { lang: "java", ...codeBlock } };
  return { type: "text", content };
}
function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

export const JAVA_EXCEPTION_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Exception Fundamentals
  // ─────────────────────────────────────────────────────────────
  {
    id: "exception-basics",
    title: "Exception Fundamentals",
    icon: "⚠️",
    color: ACCENT,
    lessons: [
      {
        id: "exc-0",
        title: "What are Exceptions?",
        xp: 15,
        theory: [
          text(
            "An **exception** is an event that disrupts the normal flow of a program. When something goes wrong at runtime — dividing by zero, accessing a null object, reading a missing file — Java creates an exception object and throws it.",
            {
              label: "Exception example",
              content: `public class Solution {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        System.out.println(arr[5]); // ArrayIndexOutOfBoundsException!
    }
}`,
            },
          ),
          diagram("Exception Hierarchy", [
            {
              id: "throwable",
              label: "Throwable",
              color: "#6b7280",
              items: ["Root of all errors and exceptions"],
            },
            {
              id: "error",
              label: "Error (never catch)",
              color: ACCENT,
              items: ["OutOfMemoryError", "StackOverflowError", "JVM problems"],
            },
            {
              id: "checked",
              label: "Checked Exception",
              color: "#f59e0b",
              items: ["IOException", "SQLException", "Must handle or declare"],
            },
            {
              id: "unchecked",
              label: "Unchecked (RuntimeException)",
              color: "#22c55e",
              items: ["NullPointerException", "ArrayIndexOutOfBoundsException", "NumberFormatException"],
            },
          ]),
          callout("info", "Checked exceptions must be handled at compile time. Unchecked exceptions are discovered at runtime. Errors are JVM-level problems you should never try to catch."),
          quiz(
            "Which exception type does the compiler force you to handle?",
            ["RuntimeException", "Error", "Checked Exception", "NullPointerException"],
            2,
            "Checked exceptions (like IOException) must either be caught with try-catch or declared with throws in the method signature.",
          ),
        ],
        challenge: {
          title: "Spot the Exception",
          description: [
            { type: "text", content: "This code throws an exception. Wrap it in try-catch to handle the ArrayIndexOutOfBoundsException and print 'Index out of bounds!' instead of crashing." },
            { type: "expected", label: "Expected output", content: "Index out of bounds!" },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        // Wrap this in try-catch
        System.out.println(arr[10]);
    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        try {
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index out of bounds!");
        }
    }
}`,
          tests: [
            { id: 1, label: "Uses try-catch", hint: "try { ... } catch (...)", keywords: [{ pattern: "try\\s*\\{" }] },
            { id: 2, label: "Catches ArrayIndexOutOfBoundsException", hint: "catch (ArrayIndexOutOfBoundsException e)", keywords: [{ pattern: "ArrayIndexOutOfBoundsException" }] },
            { id: 3, label: "Prints correct message", hint: "System.out.println(\"Index out of bounds!\")", keywords: [{ pattern: "Index out of bounds!" }] },
          ],
        },
      },
      {
        id: "exc-1",
        title: "try-catch-finally",
        xp: 20,
        theory: [
          text(
            "The **try-catch-finally** block is the core of Java exception handling. Code in `try` runs normally. If an exception occurs, execution jumps to the matching `catch`. The `finally` block always runs regardless — perfect for cleanup.",
            {
              label: "try-catch-finally structure",
              content: `try {
    // Code that might throw
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // Runs if ArithmeticException thrown
    System.out.println("Math error: " + e.getMessage());
} catch (Exception e) {
    // Catches any other exception
    System.out.println("Other error: " + e.getMessage());
} finally {
    // Always runs — use for cleanup
    System.out.println("Done.");
}`,
            },
          ),
          text("You can catch multiple exceptions in one catch block using `|` (multi-catch, Java 7+).",
            {
              label: "Multi-catch",
              content: `try {
    String s = null;
    System.out.println(s.length());
} catch (NullPointerException | IllegalArgumentException e) {
    System.out.println("Caught: " + e.getClass().getSimpleName());
}`,
            },
          ),
          callout("tip", "Always put more specific exceptions BEFORE more general ones. If you put Exception first, the specific catches below it will never run."),
          quiz(
            "When does the finally block run?",
            ["Only if no exception occurs", "Only if an exception occurs", "Always, whether or not an exception occurs", "Only if catch is not present"],
            2,
            "The finally block always executes — it's the right place for cleanup like closing files or database connections.",
          ),
        ],
        challenge: {
          title: "Division with Cleanup",
          description: [
            { type: "text", content: "Write a divide(int a, int b) method that returns a/b. If b is 0, catch ArithmeticException and return -1. Always print 'Operation complete.' in finally. Test with divide(10,2) and divide(5,0)." },
            { type: "expected", label: "Expected output", content: `Operation complete.\n5\nOperation complete.\n-1` },
          ],
          starterCode: `public class Solution {
    public static int divide(int a, int b) {
        // Use try-catch-finally

    }

    public static void main(String[] args) {
        System.out.println(divide(10, 2));
        System.out.println(divide(5, 0));
    }
}`,
          solutionCode: `public class Solution {
    public static int divide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            return -1;
        } finally {
            System.out.println("Operation complete.");
        }
    }

    public static void main(String[] args) {
        System.out.println(divide(10, 2));
        System.out.println(divide(5, 0));
    }
}`,
          tests: [
            { id: 1, label: "Uses try-catch-finally", hint: "try { } catch { } finally { }", keywords: [{ pattern: "finally\\s*\\{" }] },
            { id: 2, label: "Catches ArithmeticException", hint: "catch (ArithmeticException e)", keywords: [{ pattern: "ArithmeticException" }] },
            { id: 3, label: "Prints 'Operation complete.' in finally", hint: "System.out.println(\"Operation complete.\")", keywords: [{ pattern: "Operation complete\\." }] },
          ],
        },
      },
      {
        id: "exc-2",
        title: "throw and throws",
        xp: 20,
        theory: [
          text(
            "**throw** lets you manually create and throw an exception. **throws** in a method signature tells callers that this method might throw a checked exception — they must handle it.",
            {
              label: "throw vs throws",
              content: `// throws declares the exception in method signature
public static int sqrt(int n) throws IllegalArgumentException {
    // throw creates and throws the exception
    if (n < 0) throw new IllegalArgumentException(
        "Cannot take sqrt of negative: " + n);
    return (int) Math.sqrt(n);
}

// Caller must handle it
try {
    System.out.println(sqrt(16));  // 4
    System.out.println(sqrt(-1));  // throws!
} catch (IllegalArgumentException e) {
    System.out.println(e.getMessage());
}`,
            },
          ),
          callout("warning", "throw is a statement (you execute it). throws is a keyword in the method signature (you declare it). Easy to confuse — throw creates the exception, throws warns callers."),
          quiz(
            "Which keyword EXECUTES/fires an exception?",
            ["throws", "throw", "catch", "finally"],
            1,
            "throw is the statement that actually creates and fires the exception. throws just declares that a method might throw an exception.",
          ),
        ],
        challenge: {
          title: "Validate Age",
          description: [
            { type: "text", content: "Write validateAge(int age) that throws IllegalArgumentException if age < 0 or > 150. Test with 25 (valid) and -5 (invalid)." },
            { type: "expected", label: "Expected output", content: `Age 25 is valid\nInvalid age: -5` },
          ],
          starterCode: `public class Solution {
    public static void validateAge(int age) {
        // throw IllegalArgumentException if age < 0 or > 150

    }

    public static void main(String[] args) {
        try {
            validateAge(25);
            System.out.println("Age 25 is valid");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }

        try {
            validateAge(-5);
            System.out.println("Age -5 is valid");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
          solutionCode: `public class Solution {
    public static void validateAge(int age) {
        if (age < 0 || age > 150)
            throw new IllegalArgumentException("Invalid age: " + age);
    }

    public static void main(String[] args) {
        try {
            validateAge(25);
            System.out.println("Age 25 is valid");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }

        try {
            validateAge(-5);
            System.out.println("Age -5 is valid");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
          tests: [
            { id: 1, label: "Uses throw", hint: "throw new IllegalArgumentException(...)", keywords: [{ pattern: "throw\\s+new" }] },
            { id: 2, label: "Checks age < 0 or > 150", hint: "age < 0 || age > 150", keywords: [{ pattern: "age\\s*<\\s*0|age\\s*>\\s*150" }] },
            { id: 3, label: "Message contains 'Invalid age'", hint: "\"Invalid age: \" + age", keywords: [{ pattern: "Invalid age" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Custom Exceptions
  // ─────────────────────────────────────────────────────────────
  {
    id: "custom-exceptions",
    title: "Custom Exceptions",
    icon: "🔧",
    color: "#f59e0b",
    lessons: [
      {
        id: "exc-3",
        title: "Creating Custom Exceptions",
        xp: 25,
        theory: [
          text(
            "Custom exceptions make your error messages meaningful. Extend `Exception` for checked exceptions (caller must handle) or `RuntimeException` for unchecked (optional to handle).",
            {
              label: "Custom checked exception",
              content: `// Checked — callers must handle or declare
class InsufficientFundsException extends Exception {
    private final double shortfall;

    public InsufficientFundsException(double shortfall) {
        super(String.format("Need $%.2f more.", shortfall));
        this.shortfall = shortfall;
    }

    public double getShortfall() { return shortfall; }
}

// Unchecked — optional to handle
class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(int age) {
        super("Invalid age: " + age);
    }
}`,
            },
          ),
          text("Use custom exceptions to carry extra data about the failure — like `getShortfall()` above which tells callers exactly how much money is missing.",),
          callout("tip", "Name your custom exceptions clearly — end with 'Exception'. Make them specific: InsufficientFundsException is better than MoneyException."),
          quiz(
            "To create a custom UNCHECKED exception, extend:",
            ["Exception", "Throwable", "RuntimeException", "Error"],
            2,
            "Extending RuntimeException creates an unchecked exception — callers don't need to handle it explicitly.",
          ),
        ],
        challenge: {
          title: "BankAccount with Custom Exception",
          description: [
            { type: "text", content: "Create InsufficientFundsException extending Exception. Add it to a BankAccount withdraw method. Test with balance $500, withdraw $200 (success) then $400 (fail)." },
            { type: "expected", label: "Expected output", content: `Withdrew $200.0. Balance: $300.0\nError: Need $100.00 more.` },
          ],
          starterCode: `public class Solution {
    static class InsufficientFundsException extends Exception {
        public InsufficientFundsException(double shortfall) {
            super(String.format("Need $%.2f more.", shortfall));
        }
    }

    static class BankAccount {
        private double balance;
        BankAccount(double balance) { this.balance = balance; }

        void withdraw(double amount) throws InsufficientFundsException {
            // throw InsufficientFundsException if amount > balance
            // otherwise deduct and print the new balance

        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount(500);
        try {
            acc.withdraw(200);
            acc.withdraw(400);
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solutionCode: `public class Solution {
    static class InsufficientFundsException extends Exception {
        public InsufficientFundsException(double shortfall) {
            super(String.format("Need $%.2f more.", shortfall));
        }
    }

    static class BankAccount {
        private double balance;
        BankAccount(double balance) { this.balance = balance; }

        void withdraw(double amount) throws InsufficientFundsException {
            if (amount > balance)
                throw new InsufficientFundsException(amount - balance);
            balance -= amount;
            System.out.println("Withdrew $" + amount + ". Balance: $" + balance);
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount(500);
        try {
            acc.withdraw(200);
            acc.withdraw(400);
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          tests: [
            { id: 1, label: "InsufficientFundsException extends Exception", hint: "class InsufficientFundsException extends Exception", keywords: [{ pattern: "InsufficientFundsException\\s+extends\\s+Exception" }] },
            { id: 2, label: "withdraw throws InsufficientFundsException", hint: "throws InsufficientFundsException", keywords: [{ pattern: "throws\\s+InsufficientFundsException" }] },
            { id: 3, label: "Deducts balance on success", hint: "balance -= amount", keywords: [{ pattern: "balance\\s*-=" }] },
          ],
        },
      },
      {
        id: "exc-4",
        title: "Exception Chaining",
        xp: 25,
        theory: [
          text(
            "**Exception chaining** wraps a low-level exception inside a higher-level one, preserving the original cause. This is essential for debugging — you see both the high-level problem and the root cause.",
            {
              label: "Exception chaining",
              content: `class DatabaseException extends RuntimeException {
    public DatabaseException(String message, Throwable cause) {
        super(message, cause);  // pass the original exception as cause
    }
}

try {
    // Simulate a low-level error
    throw new RuntimeException("Connection refused");
} catch (RuntimeException e) {
    // Wrap it in a higher-level exception
    throw new DatabaseException("Failed to connect to database", e);
}

// When caught later:
// e.getMessage()  → "Failed to connect to database"
// e.getCause()    → RuntimeException: Connection refused`,
            },
          ),
          callout("info", "Always chain exceptions when converting from one type to another. Swallowing the cause (not passing it to super) makes bugs nearly impossible to find."),
          quiz(
            "What does getCause() return on a chained exception?",
            ["The exception message", "null always", "The original wrapped exception", "The stack trace"],
            2,
            "getCause() returns the original exception that was wrapped — the root cause of the problem.",
          ),
        ],
        challenge: {
          title: "Service Exception Chain",
          description: [
            { type: "text", content: "Create ServiceException extending RuntimeException that wraps a cause. Catch a NumberFormatException when parsing '\"abc\"' and rethrow it as ServiceException('Invalid input'). Print both messages." },
            { type: "expected", label: "Expected output", content: `Service error: Invalid input\nCause: For input string: "abc"` },
          ],
          starterCode: `public class Solution {
    static class ServiceException extends RuntimeException {
        public ServiceException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public static void main(String[] args) {
        try {
            try {
                int n = Integer.parseInt("abc");
            } catch (NumberFormatException e) {
                // Wrap in ServiceException and rethrow

            }
        } catch (ServiceException e) {
            System.out.println("Service error: " + e.getMessage());
            System.out.println("Cause: " + e.getCause().getMessage());
        }
    }
}`,
          solutionCode: `public class Solution {
    static class ServiceException extends RuntimeException {
        public ServiceException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public static void main(String[] args) {
        try {
            try {
                int n = Integer.parseInt("abc");
            } catch (NumberFormatException e) {
                throw new ServiceException("Invalid input", e);
            }
        } catch (ServiceException e) {
            System.out.println("Service error: " + e.getMessage());
            System.out.println("Cause: " + e.getCause().getMessage());
        }
    }
}`,
          tests: [
            { id: 1, label: "ServiceException extends RuntimeException", hint: "class ServiceException extends RuntimeException", keywords: [{ pattern: "ServiceException\\s+extends\\s+RuntimeException" }] },
            { id: 2, label: "Wraps cause in constructor", hint: "super(message, cause)", keywords: [{ pattern: "super\\s*\\(.*cause\\s*\\)" }] },
            { id: 3, label: "Throws ServiceException with cause", hint: "throw new ServiceException(\"Invalid input\", e)", keywords: [{ pattern: "throw\\s+new\\s+ServiceException" }] },
            { id: 4, label: "Prints cause message", hint: "e.getCause().getMessage()", keywords: [{ pattern: "getCause\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Advanced Exception Handling
  // ─────────────────────────────────────────────────────────────
  {
    id: "advanced-exceptions",
    title: "Advanced Exception Handling",
    icon: "🔬",
    color: "#3b82f6",
    lessons: [
      {
        id: "exc-5",
        title: "try-with-resources",
        xp: 25,
        theory: [
          text(
            "**try-with-resources** (Java 7+) automatically closes resources when the try block exits — whether normally or due to an exception. Any class implementing `AutoCloseable` can be used.",
            {
              label: "try-with-resources",
              content: `import java.io.*;
import java.nio.file.*;

// Resource is automatically closed after try block
try (BufferedReader br = Files.newBufferedReader(Path.of("data.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.out.println("File error: " + e.getMessage());
}
// br.close() called automatically — even if exception occurs`,
            },
          ),
          text("You can open multiple resources in one try statement. They are closed in reverse order of creation.",
            {
              label: "Multiple resources",
              content: `try (FileInputStream in  = new FileInputStream("input.txt");
     FileOutputStream out = new FileOutputStream("output.txt")) {
    // use in and out
} catch (IOException e) {
    // handle
}
// out closed first, then in`,
            },
          ),
          callout("tip", "Always prefer try-with-resources over manually calling close() in finally. It's safer — if both the try body and close() throw, the try-with-resources correctly suppresses the close() exception."),
          quiz(
            "What interface must a class implement to be used in try-with-resources?",
            ["Closeable", "AutoCloseable", "Runnable", "Resource"],
            1,
            "AutoCloseable (and its subinterface Closeable) requires a close() method that try-with-resources calls automatically.",
          ),
        ],
        challenge: {
          title: "Custom AutoCloseable",
          description: [
            { type: "text", content: "Create a Connection class that implements AutoCloseable. Constructor prints 'Connection opened', close() prints 'Connection closed'. Use try-with-resources and print 'Using connection' inside." },
            { type: "expected", label: "Expected output", content: `Connection opened\nUsing connection\nConnection closed` },
          ],
          starterCode: `public class Solution {
    static class Connection implements AutoCloseable {
        public Connection() {
            System.out.println("Connection opened");
        }

        @Override
        public void close() {
            // print "Connection closed"

        }
    }

    public static void main(String[] args) {
        // Use try-with-resources with Connection

    }
}`,
          solutionCode: `public class Solution {
    static class Connection implements AutoCloseable {
        public Connection() {
            System.out.println("Connection opened");
        }

        @Override
        public void close() {
            System.out.println("Connection closed");
        }
    }

    public static void main(String[] args) {
        try (Connection conn = new Connection()) {
            System.out.println("Using connection");
        }
    }
}`,
          tests: [
            { id: 1, label: "Connection implements AutoCloseable", hint: "class Connection implements AutoCloseable", keywords: [{ pattern: "implements\\s+AutoCloseable" }] },
            { id: 2, label: "close() prints 'Connection closed'", hint: "System.out.println(\"Connection closed\")", keywords: [{ pattern: "Connection closed" }] },
            { id: 3, label: "Uses try-with-resources", hint: "try (Connection conn = new Connection())", keywords: [{ pattern: "try\\s*\\(\\s*Connection" }] },
          ],
        },
      },
      {
        id: "exc-6",
        title: "Exception Best Practices",
        xp: 20,
        theory: [
          text(
            "Good exception handling is as important as good code. These patterns separate professional Java from beginner Java.",
            {
              label: "What NOT to do",
              content: `// ❌ Never swallow exceptions silently
try {
    riskyOperation();
} catch (Exception e) {
    // empty — worst practice, hides bugs
}

// ❌ Never catch Exception when you mean something specific
try {
    Integer.parseInt(input);
} catch (Exception e) { // too broad
    ...
}

// ❌ Never use exceptions for control flow
try {
    while (true) list.get(i++);
} catch (IndexOutOfBoundsException e) { } // use list.size() instead`,
            },
          ),
          text("**What TO do:**",
            {
              label: "Best practices",
              content: `// ✅ Catch specific exceptions
try {
    Integer.parseInt(input);
} catch (NumberFormatException e) {
    System.out.println("Not a number: " + input);
}

// ✅ Log and rethrow for debugging
catch (IOException e) {
    System.err.println("IO failed: " + e.getMessage());
    throw e; // let caller decide what to do
}

// ✅ Use finally (or try-with-resources) for cleanup
// ✅ Include meaningful messages in exceptions
// ✅ Create custom exceptions for domain errors`,
            },
          ),
          quiz(
            "What is the worst exception handling practice?",
            ["Catching specific exceptions", "Using finally for cleanup", "Empty catch blocks", "Throwing custom exceptions"],
            2,
            "Empty catch blocks silently swallow errors, making bugs impossible to find. Always at minimum log the exception.",
          ),
        ],
        challenge: {
          title: "Safe Parser",
          description: [
            { type: "text", content: "Write parseAndDivide(String a, String b) that parses two strings as integers and divides them. Handle NumberFormatException (print 'Not a number') and ArithmeticException (print 'Cannot divide by zero'). Test with ('10','2'), ('abc','2'), ('10','0')." },
            { type: "expected", label: "Expected output", content: `5\nNot a number\nCannot divide by zero` },
          ],
          starterCode: `public class Solution {
    public static void parseAndDivide(String a, String b) {
        // Parse both strings, divide, handle exceptions

    }

    public static void main(String[] args) {
        parseAndDivide("10", "2");
        parseAndDivide("abc", "2");
        parseAndDivide("10", "0");
    }
}`,
          solutionCode: `public class Solution {
    public static void parseAndDivide(String a, String b) {
        try {
            int x = Integer.parseInt(a);
            int y = Integer.parseInt(b);
            System.out.println(x / y);
        } catch (NumberFormatException e) {
            System.out.println("Not a number");
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        }
    }

    public static void main(String[] args) {
        parseAndDivide("10", "2");
        parseAndDivide("abc", "2");
        parseAndDivide("10", "0");
    }
}`,
          tests: [
            { id: 1, label: "Catches NumberFormatException", hint: "catch (NumberFormatException e)", keywords: [{ pattern: "NumberFormatException" }] },
            { id: 2, label: "Catches ArithmeticException", hint: "catch (ArithmeticException e)", keywords: [{ pattern: "ArithmeticException" }] },
            { id: 3, label: "Prints 'Not a number'", hint: "System.out.println(\"Not a number\")", keywords: [{ pattern: "Not a number" }] },
            { id: 4, label: "Prints 'Cannot divide by zero'", hint: "System.out.println(\"Cannot divide by zero\")", keywords: [{ pattern: "Cannot divide by zero" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Real-World Exception Patterns
  // ─────────────────────────────────────────────────────────────
  {
    id: "exception-patterns",
    title: "Real-World Patterns",
    icon: "🏗️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "exc-7",
        title: "Validation Pattern",
        xp: 25,
        theory: [
          text(
            "A common real-world pattern is **centralised validation** — a dedicated validator class throws specific exceptions for each type of invalid input, keeping your business logic clean.",
            {
              label: "Validator pattern",
              content: `class ValidationException extends RuntimeException {
    private final String field;
    public ValidationException(String field, String message) {
        super(field + ": " + message);
        this.field = field;
    }
    public String getField() { return field; }
}

class UserValidator {
    public static void validate(String username, String email, String password) {
        if (username == null || username.length() < 3)
            throw new ValidationException("username", "Must be at least 3 characters");
        if (!email.contains("@"))
            throw new ValidationException("email", "Invalid email format");
        if (password.length() < 6)
            throw new ValidationException("password", "Must be at least 6 characters");
    }
}`,
            },
          ),
          callout("info", "Validation exceptions should be unchecked (extend RuntimeException) because they represent programming errors — the caller should have validated input before calling the method."),
          quiz(
            "Why should validation exceptions usually be unchecked?",
            [
              "They are faster",
              "They represent programming errors the caller should prevent",
              "Checked exceptions can't carry field names",
              "Unchecked exceptions are easier to create",
            ],
            1,
            "Validation failures are typically programming errors — the caller should validate input before submitting. Unchecked exceptions don't force every caller to add try-catch for something they should prevent upfront.",
          ),
        ],
        challenge: {
          title: "Product Validator",
          description: [
            { type: "text", content: "Create ValidationException with a field name. Write validateProduct(String name, double price) that throws it if name is empty or price <= 0. Test with valid product and two invalid ones." },
            { type: "expected", label: "Expected output", content: `Product valid\nname: Cannot be empty\nprice: Must be positive` },
          ],
          starterCode: `public class Solution {
    static class ValidationException extends RuntimeException {
        private final String field;
        public ValidationException(String field, String message) {
            super(field + ": " + message);
            this.field = field;
        }
    }

    public static void validateProduct(String name, double price) {
        // throw ValidationException if name is empty or price <= 0

    }

    public static void main(String[] args) {
        // Test valid product
        try { validateProduct("Laptop", 999.0); System.out.println("Product valid"); }
        catch (ValidationException e) { System.out.println(e.getMessage()); }

        // Test empty name
        try { validateProduct("", 100.0); System.out.println("Product valid"); }
        catch (ValidationException e) { System.out.println(e.getMessage()); }

        // Test negative price
        try { validateProduct("Phone", -50.0); System.out.println("Product valid"); }
        catch (ValidationException e) { System.out.println(e.getMessage()); }
    }
}`,
          solutionCode: `public class Solution {
    static class ValidationException extends RuntimeException {
        private final String field;
        public ValidationException(String field, String message) {
            super(field + ": " + message);
            this.field = field;
        }
    }

    public static void validateProduct(String name, double price) {
        if (name == null || name.isEmpty())
            throw new ValidationException("name", "Cannot be empty");
        if (price <= 0)
            throw new ValidationException("price", "Must be positive");
    }

    public static void main(String[] args) {
        try { validateProduct("Laptop", 999.0); System.out.println("Product valid"); }
        catch (ValidationException e) { System.out.println(e.getMessage()); }

        try { validateProduct("", 100.0); System.out.println("Product valid"); }
        catch (ValidationException e) { System.out.println(e.getMessage()); }

        try { validateProduct("Phone", -50.0); System.out.println("Product valid"); }
        catch (ValidationException e) { System.out.println(e.getMessage()); }
    }
}`,
          tests: [
            { id: 1, label: "ValidationException has field name", hint: "super(field + \": \" + message)", keywords: [{ pattern: "field.*message|message.*field" }] },
            { id: 2, label: "Checks for empty name", hint: "name.isEmpty()", keywords: [{ pattern: "isEmpty\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Checks for price <= 0", hint: "price <= 0", keywords: [{ pattern: "price\\s*<=\\s*0" }] },
          ],
        },
      },
      {
        id: "exc-8",
        title: "Result Pattern",
        xp: 30,
        theory: [
          text(
            "Instead of throwing exceptions for expected failures (like 'user not found'), some teams use a **Result pattern** — a generic wrapper that holds either a success value or an error message. This makes error handling explicit without exception overhead.",
            {
              label: "Result pattern",
              content: `class Result<T> {
    private final T value;
    private final String error;

    private Result(T value, String error) {
        this.value = value;
        this.error = error;
    }

    public static <T> Result<T> success(T value) {
        return new Result<>(value, null);
    }

    public static <T> Result<T> failure(String error) {
        return new Result<>(null, error);
    }

    public boolean isSuccess() { return error == null; }
    public T getValue()       { return value; }
    public String getError()  { return error; }
}

// Usage:
Result<Integer> r = divide(10, 0);
if (r.isSuccess()) System.out.println("Result: " + r.getValue());
else               System.out.println("Error: " + r.getError());`,
            },
          ),
          callout("info", "The Result pattern is popular in functional programming languages (Rust's Result, Kotlin's Result). In Java it's a useful alternative to exceptions for expected, recoverable failures."),
          quiz(
            "When is the Result pattern better than exceptions?",
            [
              "Always — exceptions are slow",
              "Never — always use exceptions",
              "For expected, recoverable failures like 'not found'",
              "Only in functional programming",
            ],
            2,
            "Use Result for expected business failures (user not found, invalid login). Use exceptions for unexpected technical failures (database down, file missing).",
          ),
        ],
        challenge: {
          title: "Safe Divide with Result",
          description: [
            { type: "text", content: "Implement the Result<T> class with success() and failure() factory methods. Write safeDivide(int a, int b) returning Result<Integer>. Test with (10,2) and (10,0)." },
            { type: "expected", label: "Expected output", content: `Result: 5\nError: Cannot divide by zero` },
          ],
          starterCode: `public class Solution {
    static class Result<T> {
        private final T value;
        private final String error;

        private Result(T value, String error) {
            this.value = value;
            this.error = error;
        }

        public static <T> Result<T> success(T value) { return new Result<>(value, null); }
        public static <T> Result<T> failure(String error) { return new Result<>(null, error); }
        public boolean isSuccess() { return error == null; }
        public T getValue() { return value; }
        public String getError() { return error; }
    }

    public static Result<Integer> safeDivide(int a, int b) {
        // Return Result.success or Result.failure

    }

    public static void main(String[] args) {
        Result<Integer> r1 = safeDivide(10, 2);
        Result<Integer> r2 = safeDivide(10, 0);

        System.out.println(r1.isSuccess() ? "Result: " + r1.getValue() : "Error: " + r1.getError());
        System.out.println(r2.isSuccess() ? "Result: " + r2.getValue() : "Error: " + r2.getError());
    }
}`,
          solutionCode: `public class Solution {
    static class Result<T> {
        private final T value;
        private final String error;

        private Result(T value, String error) {
            this.value = value;
            this.error = error;
        }

        public static <T> Result<T> success(T value) { return new Result<>(value, null); }
        public static <T> Result<T> failure(String error) { return new Result<>(null, error); }
        public boolean isSuccess() { return error == null; }
        public T getValue() { return value; }
        public String getError() { return error; }
    }

    public static Result<Integer> safeDivide(int a, int b) {
        if (b == 0) return Result.failure("Cannot divide by zero");
        return Result.success(a / b);
    }

    public static void main(String[] args) {
        Result<Integer> r1 = safeDivide(10, 2);
        Result<Integer> r2 = safeDivide(10, 0);

        System.out.println(r1.isSuccess() ? "Result: " + r1.getValue() : "Error: " + r1.getError());
        System.out.println(r2.isSuccess() ? "Result: " + r2.getValue() : "Error: " + r2.getError());
    }
}`,
          tests: [
            { id: 1, label: "safeDivide returns Result.failure for b==0", hint: "if (b == 0) return Result.failure(...)", keywords: [{ pattern: "Result\\.failure" }] },
            { id: 2, label: "safeDivide returns Result.success", hint: "return Result.success(a / b)", keywords: [{ pattern: "Result\\.success" }] },
            { id: 3, label: "Uses isSuccess() to check result", hint: "r1.isSuccess()", keywords: [{ pattern: "isSuccess\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "exc-9",
        title: "Exception in Streams and Lambdas",
        xp: 25,
        theory: [
          text(
            "Lambdas and Streams can't throw checked exceptions — the functional interfaces don't declare `throws`. The solution is to wrap checked exceptions in unchecked ones inside the lambda.",
            {
              label: "Exception in streams",
              content: `import java.util.*;
import java.util.stream.*;

List<String> strings = List.of("1", "2", "abc", "4", "5");

// ❌ This doesn't compile — parseInt throws checked exception
// strings.stream().map(Integer::parseInt)...

// ✅ Wrap in a helper that catches and rethrows as unchecked
List<Integer> results = strings.stream()
    .flatMap(s -> {
        try {
            return Stream.of(Integer.parseInt(s));
        } catch (NumberFormatException e) {
            System.out.println("Skipping invalid: " + s);
            return Stream.empty();
        }
    })
    .collect(Collectors.toList());
System.out.println(results);`,
            },
          ),
          callout("tip", "flatMap with try-catch inside is the cleanest way to skip/handle errors in streams. It filters out failed elements while processing the rest normally."),
          quiz(
            "Why can't lambdas throw checked exceptions directly?",
            [
              "Java doesn't support exceptions in lambdas",
              "The functional interface's abstract method doesn't declare throws",
              "Lambdas run on a different thread",
              "Checked exceptions need a class",
            ],
            1,
            "Lambdas must match the functional interface signature. If the interface's method doesn't declare throws CheckedException, the lambda can't throw it either.",
          ),
        ],
        challenge: {
          title: "Stream Safe Parse",
          description: [
            { type: "text", content: "Given List.of(\"10\", \"abc\", \"30\", \"xyz\", \"50\"), use streams to parse valid integers and skip invalid ones. Print the sum of valid numbers." },
            { type: "expected", label: "Expected output", content: "Sum: 90" },
          ],
          starterCode: `import java.util.*;
import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        List<String> strings = List.of("10", "abc", "30", "xyz", "50");
        // Use flatMap with try-catch to parse valid integers, skip invalid
        // Print "Sum: X"

    }
}`,
          solutionCode: `import java.util.*;
import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        List<String> strings = List.of("10", "abc", "30", "xyz", "50");
        int sum = strings.stream()
            .flatMap(s -> {
                try {
                    return Stream.of(Integer.parseInt(s));
                } catch (NumberFormatException e) {
                    return Stream.empty();
                }
            })
            .mapToInt(Integer::intValue)
            .sum();
        System.out.println("Sum: " + sum);
    }
}`,
          tests: [
            { id: 1, label: "Uses stream()", hint: "strings.stream()", keywords: [{ pattern: "\\.stream\\s*\\(\\s*\\)" }] },
            { id: 2, label: "Uses flatMap with try-catch", hint: "flatMap(s -> { try { ... } catch (...) { return Stream.empty(); } })", keywords: [{ pattern: "flatMap" }] },
            { id: 3, label: "Catches NumberFormatException", hint: "catch (NumberFormatException e)", keywords: [{ pattern: "NumberFormatException" }] },
            { id: 4, label: "Prints Sum: 90", hint: "System.out.println(\"Sum: \" + sum)", keywords: [{ pattern: "Sum:" }] },
          ],
        },
      },
      {
        id: "exc-10",
        title: "Stack Traces and Debugging",
        xp: 20,
        theory: [
          text(
            "A **stack trace** shows the chain of method calls that led to an exception. Reading stack traces is one of the most important debugging skills in Java.",
            {
              label: "Reading a stack trace",
              content: `Exception in thread "main" java.lang.NullPointerException
    at Solution.getLength(Solution.java:8)   // ← where it crashed
    at Solution.process(Solution.java:14)    // ← called by this
    at Solution.main(Solution.java:20)       // ← called by this

// Means:
// 1. main() called process() on line 20
// 2. process() called getLength() on line 14
// 3. getLength() crashed on line 8 with NullPointerException`,
            },
          ),
          text("You can print stack traces programmatically and get information about each frame.",
            {
              label: "Stack trace API",
              content: `try {
    String s = null;
    s.length();
} catch (NullPointerException e) {
    System.out.println("Exception: " + e.getClass().getSimpleName());
    System.out.println("Message:   " + e.getMessage());

    // Print full stack trace
    e.printStackTrace();

    // Get individual frames
    StackTraceElement[] frames = e.getStackTrace();
    System.out.println("Crashed in method: " + frames[0].getMethodName());
    System.out.println("At line: " + frames[0].getLineNumber());
}`,
            },
          ),
          quiz(
            "In a stack trace, which entry shows where the exception actually occurred?",
            ["The last line", "The first line after 'at'", "The thread line at the top", "The middle entry"],
            1,
            "The first 'at' line in the stack trace shows exactly where the exception was thrown — the innermost method call.",
          ),
        ],
        challenge: {
          title: "Exception Inspector",
          description: [
            { type: "text", content: "Catch a NullPointerException from calling .length() on null. Print the exception class name, then print 'Caught in method: main'." },
            { type: "expected", label: "Expected output", content: `Class: NullPointerException\nCaught in method: main` },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        try {
            String s = null;
            System.out.println(s.length());
        } catch (NullPointerException e) {
            // Print class name and "Caught in method: main"

        }
    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        try {
            String s = null;
            System.out.println(s.length());
        } catch (NullPointerException e) {
            System.out.println("Class: " + e.getClass().getSimpleName());
            System.out.println("Caught in method: " + e.getStackTrace()[0].getMethodName());
        }
    }
}`,
          tests: [
            { id: 1, label: "Catches NullPointerException", hint: "catch (NullPointerException e)", keywords: [{ pattern: "NullPointerException" }] },
            { id: 2, label: "Prints class name with getSimpleName()", hint: "e.getClass().getSimpleName()", keywords: [{ pattern: "getSimpleName\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Uses getStackTrace()", hint: "e.getStackTrace()[0].getMethodName()", keywords: [{ pattern: "getStackTrace\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "exc-11",
        title: "Exception Handling in Practice",
        xp: 30,
        theory: [
          text(
            "Let's bring it all together with a real-world scenario: a mini order processing system that uses custom exceptions, validation, and proper error recovery.",
            {
              label: "Complete example",
              content: `class OrderException extends RuntimeException {
    public OrderException(String message) { super(message); }
}

class Order {
    private final String id;
    private final double amount;
    private boolean processed = false;

    Order(String id, double amount) {
        if (id == null || id.isBlank())
            throw new OrderException("Order ID cannot be blank");
        if (amount <= 0)
            throw new OrderException("Amount must be positive");
        this.id = id;
        this.amount = amount;
    }

    void process() {
        if (processed) throw new OrderException("Already processed: " + id);
        processed = true;
        System.out.printf("Order %s processed: $%.2f%n", id, amount);
    }
}`,
            },
          ),
          callout("tip", "In production code, exceptions flow up the call stack. Lower layers throw specific exceptions; higher layers catch, log, and convert them to user-friendly messages. Never let raw stack traces reach end users."),
          quiz(
            "In a layered architecture, where should exceptions be converted to user-friendly messages?",
            ["In every method", "At the lowest layer", "At the highest layer (controller/UI)", "They should never be converted"],
            2,
            "The outermost layer (controller, UI, API endpoint) should catch exceptions and convert them to user-friendly responses. Inner layers should throw specific exceptions and let them propagate.",
          ),
        ],
        challenge: {
          title: "Order Processor",
          description: [
            { type: "text", content: "Create OrderException extending RuntimeException. Create Order with id and amount (validate both). Add process() that marks processed=true and prints. Test valid order, double-process, and invalid order." },
            { type: "expected", label: "Expected output", content: `Order ORD-1 processed: $99.99\nError: Already processed: ORD-1\nError: Amount must be positive` },
          ],
          starterCode: `public class Solution {
    static class OrderException extends RuntimeException {
        public OrderException(String message) { super(message); }
    }

    static class Order {
        private final String id;
        private final double amount;
        private boolean processed = false;

        Order(String id, double amount) {
            // Validate id and amount, throw OrderException if invalid

        }

        void process() {
            // Throw if already processed, otherwise process

        }
    }

    public static void main(String[] args) {
        // Test 1: valid order, process twice
        try {
            Order o = new Order("ORD-1", 99.99);
            o.process();
            o.process(); // should throw
        } catch (OrderException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Test 2: invalid amount
        try {
            Order o = new Order("ORD-2", -10);
            o.process();
        } catch (OrderException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solutionCode: `public class Solution {
    static class OrderException extends RuntimeException {
        public OrderException(String message) { super(message); }
    }

    static class Order {
        private final String id;
        private final double amount;
        private boolean processed = false;

        Order(String id, double amount) {
            if (id == null || id.isBlank())
                throw new OrderException("Order ID cannot be blank");
            if (amount <= 0)
                throw new OrderException("Amount must be positive");
            this.id = id;
            this.amount = amount;
        }

        void process() {
            if (processed) throw new OrderException("Already processed: " + id);
            processed = true;
            System.out.printf("Order %s processed: $%.2f%n", id, amount);
        }
    }

    public static void main(String[] args) {
        try {
            Order o = new Order("ORD-1", 99.99);
            o.process();
            o.process();
        } catch (OrderException e) {
            System.out.println("Error: " + e.getMessage());
        }

        try {
            Order o = new Order("ORD-2", -10);
            o.process();
        } catch (OrderException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          tests: [
            { id: 1, label: "OrderException extends RuntimeException", hint: "class OrderException extends RuntimeException", keywords: [{ pattern: "OrderException\\s+extends\\s+RuntimeException" }] },
            { id: 2, label: "Validates amount > 0", hint: "if (amount <= 0) throw new OrderException(...)", keywords: [{ pattern: "amount\\s*<=\\s*0" }] },
            { id: 3, label: "Throws on double process", hint: "if (processed) throw new OrderException(\"Already processed: \" + id)", keywords: [{ pattern: "Already processed" }] },
            { id: 4, label: "Uses printf for order output", hint: "System.out.printf(\"Order %s processed: $%.2f%n\", id, amount)", keywords: [{ pattern: "processed.*\\$" }] },
          ],
        },
      },
    ],
  },
];

export const JAVA_EXCEPTION_LESSONS = JAVA_EXCEPTION_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const JAVA_EXCEPTION_TOTAL_XP = JAVA_EXCEPTION_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
