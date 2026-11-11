// PolyCode — Java Projects capstone course
// 4 chapters · 12 lessons · real javac/java execution via backend
// All challenge classes MUST be named "Solution"
// Unlike other courses, this is milestone-based: each lesson's starter code
// includes the accumulated classes from earlier lessons in the SAME chapter,
// and asks the student to add the next piece of a real, growing project.

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

export const JAVA_PROJECTS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Console Task Manager (Beginner)
  // ─────────────────────────────────────────────────────────────
  {
    id: "task-manager",
    title: "Console Task Manager",
    icon: "📋",
    color: "#06b6d4",
    lessons: [
      {
        id: "proj-0",
        title: "Milestone 1: Task Class & Adding Tasks",
        xp: 25,
        theory: [
          text(
            "We're building a **Task Manager** across this chapter — a small, real application, not an isolated exercise. First milestone: model a `Task` and store tasks in a growing `ArrayList<Task>`.",
            {
              label: "The Task model",
              content: `class Task {
    int id;
    String title;
    boolean done;

    Task(int id, String title) {
        this.id = id;
        this.title = title;
        this.done = false;
    }

    @Override
    public String toString() {
        return "[" + (done ? "x" : " ") + "] #" + id + " " + title;
    }
}`,
            },
          ),
          callout(
            "info",
            "Every lesson in this chapter builds on the last — the Task class you write here carries forward into completing, filtering, and sorting tasks.",
          ),
          quiz(
            "Why store tasks in a List<Task> instead of separate variables?",
            [
              "Lists are required by Java",
              "A List can grow to hold any number of tasks, and supports iteration, sorting, and filtering",
              "Lists are faster than objects",
              "There's no real difference",
            ],
            1,
            "A real task manager needs to hold an unknown, changing number of tasks — a List (unlike fixed variables or arrays) grows dynamically and comes with built-in operations for iterating, sorting, and filtering.",
          ),
        ],
        challenge: {
          title: "Add Tasks to the Manager",
          description: [
            {
              type: "text",
              content:
                "Complete the Task class's toString(), then add three tasks — \"Write report\" (id 1), \"Review code\" (id 2), \"Deploy app\" (id 3) — to a List<Task>, and print the list.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[[ ] #1 Write report, [ ] #2 Review code, [ ] #3 Deploy app]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

class Task {
    int id;
    String title;
    boolean done;

    Task(int id, String title) {
        this.id = id;
        this.title = title;
        this.done = false;
    }

    @Override
    public String toString() {
        // return "[x] #<id> <title>" or "[ ] #<id> <title>" based on done
        return null;
    }
}

public class Solution {
    public static void main(String[] args) {
        List<Task> tasks = new ArrayList<>();
        // add 3 tasks, print the list

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

class Task {
    int id;
    String title;
    boolean done;

    Task(int id, String title) {
        this.id = id;
        this.title = title;
        this.done = false;
    }

    @Override
    public String toString() {
        return "[" + (done ? "x" : " ") + "] #" + id + " " + title;
    }
}

public class Solution {
    public static void main(String[] args) {
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task(1, "Write report"));
        tasks.add(new Task(2, "Review code"));
        tasks.add(new Task(3, "Deploy app"));
        System.out.println(tasks);
    }
}`,
          tests: [
            { id: 1, label: "Implements toString()", hint: "return \"[\" + (done ? \"x\" : \" \") + ...", keywords: [{ pattern: "toString\\s*\\(" }] },
            { id: 2, label: "Adds 3 tasks", hint: "tasks.add(new Task(...))", keywords: [{ pattern: "new\\s+Task" }] },
          ],
        },
      },
      {
        id: "proj-1",
        title: "Milestone 2: Completing & Filtering Tasks",
        xp: 25,
        theory: [
          text(
            "Next milestone: mark tasks complete and filter the list. We'll use `removeIf`/`stream().filter()` from the Collections course to show only pending tasks.",
            {
              label: "Marking complete + filtering",
              content: `for (Task t : tasks) {
    if (t.id == 2) t.done = true;
}

List<Task> pending = tasks.stream()
    .filter(t -> !t.done)
    .collect(Collectors.toList());`,
            },
          ),
          quiz(
            "Why use .stream().filter() instead of manually looping and building a new list?",
            [
              "filter() is required in Java",
              "It's more concise and declarative — you describe *what* you want, not the loop mechanics",
              "It mutates the original list",
              "It's the only way to filter in Java",
            ],
            1,
            "Streams let you express 'give me the tasks that aren't done' directly, without manually managing a loop counter and a new list — the same filtering logic you learned in the Collections course.",
          ),
        ],
        challenge: {
          title: "Complete and Filter Tasks",
          description: [
            {
              type: "text",
              content:
                "Using the Task class, build the same 3 tasks as before, mark task #2 as done, then print only the pending (not done) tasks using a stream filter.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[[ ] #1 Write report, [ ] #3 Deploy app]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

class Task {
    int id;
    String title;
    boolean done;

    Task(int id, String title) {
        this.id = id;
        this.title = title;
        this.done = false;
    }

    @Override
    public String toString() {
        return "[" + (done ? "x" : " ") + "] #" + id + " " + title;
    }
}

public class Solution {
    public static void main(String[] args) {
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task(1, "Write report"));
        tasks.add(new Task(2, "Review code"));
        tasks.add(new Task(3, "Deploy app"));

        // mark task #2 done, then print only pending tasks

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

class Task {
    int id;
    String title;
    boolean done;

    Task(int id, String title) {
        this.id = id;
        this.title = title;
        this.done = false;
    }

    @Override
    public String toString() {
        return "[" + (done ? "x" : " ") + "] #" + id + " " + title;
    }
}

public class Solution {
    public static void main(String[] args) {
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task(1, "Write report"));
        tasks.add(new Task(2, "Review code"));
        tasks.add(new Task(3, "Deploy app"));

        for (Task t : tasks) {
            if (t.id == 2) t.done = true;
        }

        List<Task> pending = tasks.stream()
            .filter(t -> !t.done)
            .collect(Collectors.toList());
        System.out.println(pending);
    }
}`,
          tests: [
            { id: 1, label: "Marks task #2 done", hint: "t.done = true", keywords: [{ pattern: "done\\s*=\\s*true" }] },
            { id: 2, label: "Filters with a stream", hint: ".stream().filter(...)", keywords: [{ pattern: "\\.filter\\s*\\(" }] },
          ],
        },
      },
      {
        id: "proj-2",
        title: "Milestone 3: Sorting Tasks by Priority",
        xp: 25,
        theory: [
          text(
            "Final milestone for this project: add a `priority` field and sort tasks so the most urgent show first — the same `Comparator` pattern from the Collections course.",
            {
              label: "Sorting by priority",
              content: `class Task {
    int priority; // 1 = highest
    // ...
}

tasks.sort(Comparator.comparingInt(t -> t.priority));`,
            },
          ),
          quiz(
            "If priority 1 means 'most urgent', which Comparator sorts urgent tasks first?",
            [
              "Comparator.comparingInt(t -> t.priority).reversed()",
              "Comparator.comparingInt(t -> t.priority)",
              "Comparator.comparing(t -> t.title)",
              "Collections.reverse(tasks)",
            ],
            1,
            "A plain ascending Comparator on priority puts the smallest number (1, the most urgent) first — no reversal needed since lower numbers should sort first.",
          ),
        ],
        challenge: {
          title: "Sort by Priority",
          description: [
            {
              type: "text",
              content:
                "Add a priority field to Task. Create tasks: (\"Write report\", priority 2), (\"Review code\", priority 1), (\"Deploy app\", priority 3). Sort by priority ascending and print the list.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[[ ] #2 Review code, [ ] #1 Write report, [ ] #3 Deploy app]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Task {
    int id;
    String title;
    boolean done;
    int priority;

    Task(int id, String title, int priority) {
        this.id = id;
        this.title = title;
        this.done = false;
        this.priority = priority;
    }

    @Override
    public String toString() {
        return "[" + (done ? "x" : " ") + "] #" + id + " " + title;
    }
}

public class Solution {
    public static void main(String[] args) {
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task(1, "Write report", 2));
        tasks.add(new Task(2, "Review code", 1));
        tasks.add(new Task(3, "Deploy app", 3));

        // sort by priority ascending, print

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Task {
    int id;
    String title;
    boolean done;
    int priority;

    Task(int id, String title, int priority) {
        this.id = id;
        this.title = title;
        this.done = false;
        this.priority = priority;
    }

    @Override
    public String toString() {
        return "[" + (done ? "x" : " ") + "] #" + id + " " + title;
    }
}

public class Solution {
    public static void main(String[] args) {
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task(1, "Write report", 2));
        tasks.add(new Task(2, "Review code", 1));
        tasks.add(new Task(3, "Deploy app", 3));

        tasks.sort(Comparator.comparingInt(t -> t.priority));
        System.out.println(tasks);
    }
}`,
          tests: [
            { id: 1, label: "Sorts using Comparator on priority", hint: "Comparator.comparingInt(t -> t.priority)", keywords: [{ pattern: "comparingInt" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Library Management System (Intermediate)
  // ─────────────────────────────────────────────────────────────
  {
    id: "library-system",
    title: "Library Management System",
    icon: "📚",
    color: "#3b82f6",
    lessons: [
      {
        id: "proj-3",
        title: "Milestone 1: Members with Inheritance",
        xp: 25,
        theory: [
          text(
            "New project: a **Library System**. Different member types (Student, Staff) have different loan limits — a textbook use case for **inheritance**: an abstract `Member` base class with a `loanLimit()` method each subclass overrides.",
            {
              label: "Member hierarchy",
              content: `abstract class Member {
    String name;
    Member(String name) { this.name = name; }
    abstract int loanLimit();
}

class Student extends Member {
    Student(String name) { super(name); }
    @Override int loanLimit() { return 3; }
}

class Staff extends Member {
    Staff(String name) { super(name); }
    @Override int loanLimit() { return 10; }
}`,
            },
          ),
          quiz(
            "Why make Member abstract instead of a normal class?",
            [
              "Abstract classes run faster",
              "It forces every subclass to define its own loanLimit(), while sharing common fields like name",
              "Java requires base classes to be abstract",
              "It removes the need for a constructor",
            ],
            1,
            "An abstract class can't be instantiated directly and can declare abstract methods that every concrete subclass MUST implement — perfect for 'every member type needs a loan limit, but the value differs.'",
          ),
        ],
        challenge: {
          title: "Build the Member Hierarchy",
          description: [
            {
              type: "text",
              content:
                "Complete the Student (limit 3) and Staff (limit 10) subclasses of the abstract Member class. Create a Student \"Amy\" and a Staff \"Mr. Lee\", print each one's name and loan limit.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Amy: 3
Mr. Lee: 10`,
            },
          ],
          starterCode: `abstract class Member {
    String name;
    Member(String name) { this.name = name; }
    abstract int loanLimit();
}

// Complete Student and Staff here

public class Solution {
    public static void main(String[] args) {
        Member m1 = new Student("Amy");
        Member m2 = new Staff("Mr. Lee");
        System.out.println(m1.name + ": " + m1.loanLimit());
        System.out.println(m2.name + ": " + m2.loanLimit());
    }
}`,
          solutionCode: `abstract class Member {
    String name;
    Member(String name) { this.name = name; }
    abstract int loanLimit();
}

class Student extends Member {
    Student(String name) { super(name); }
    @Override int loanLimit() { return 3; }
}

class Staff extends Member {
    Staff(String name) { super(name); }
    @Override int loanLimit() { return 10; }
}

public class Solution {
    public static void main(String[] args) {
        Member m1 = new Student("Amy");
        Member m2 = new Staff("Mr. Lee");
        System.out.println(m1.name + ": " + m1.loanLimit());
        System.out.println(m2.name + ": " + m2.loanLimit());
    }
}`,
          tests: [
            { id: 1, label: "Student extends Member", hint: "class Student extends Member", keywords: [{ pattern: "class\\s+Student\\s+extends\\s+Member" }] },
            { id: 2, label: "Staff extends Member", hint: "class Staff extends Member", keywords: [{ pattern: "class\\s+Staff\\s+extends\\s+Member" }] },
            { id: 3, label: "Overrides loanLimit()", hint: "@Override int loanLimit()", keywords: [{ pattern: "loanLimit\\s*\\(" }] },
          ],
        },
      },
      {
        id: "proj-4",
        title: "Milestone 2: Borrowing with Custom Exceptions",
        xp: 30,
        theory: [
          text(
            "Now let members borrow books. If a book is already checked out, throw a **custom exception** instead of a generic one — matching the pattern from the Exception Handling course.",
            {
              label: "A custom BookNotAvailableException",
              content: `class BookNotAvailableException extends RuntimeException {
    BookNotAvailableException(String title) {
        super(title + " is already checked out");
    }
}

class Book {
    String title;
    boolean available = true;
    Book(String title) { this.title = title; }

    void checkOut() {
        if (!available) throw new BookNotAvailableException(title);
        available = false;
    }
}`,
            },
          ),
          quiz(
            "Why create BookNotAvailableException instead of throwing a plain RuntimeException?",
            [
              "It runs faster",
              "A named exception makes the failure reason self-documenting and lets callers catch it specifically",
              "Java requires custom exceptions for libraries",
              "It avoids using try-catch",
            ],
            1,
            "A specific exception type like BookNotAvailableException documents exactly what went wrong in the type itself, and lets calling code catch just that failure mode separately from other errors.",
          ),
        ],
        challenge: {
          title: "Check Out a Book Safely",
          description: [
            {
              type: "text",
              content:
                "Complete the Book.checkOut() method. Create a Book \"Clean Code\", check it out once (should succeed silently), then try checking it out again — catch the BookNotAvailableException and print its message.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Clean Code is already checked out`,
            },
          ],
          starterCode: `class BookNotAvailableException extends RuntimeException {
    BookNotAvailableException(String title) {
        super(title + " is already checked out");
    }
}

class Book {
    String title;
    boolean available = true;
    Book(String title) { this.title = title; }

    void checkOut() {
        // throw BookNotAvailableException if not available, else set available = false

    }
}

public class Solution {
    public static void main(String[] args) {
        Book book = new Book("Clean Code");
        book.checkOut();
        try {
            book.checkOut();
        } catch (BookNotAvailableException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
          solutionCode: `class BookNotAvailableException extends RuntimeException {
    BookNotAvailableException(String title) {
        super(title + " is already checked out");
    }
}

class Book {
    String title;
    boolean available = true;
    Book(String title) { this.title = title; }

    void checkOut() {
        if (!available) throw new BookNotAvailableException(title);
        available = false;
    }
}

public class Solution {
    public static void main(String[] args) {
        Book book = new Book("Clean Code");
        book.checkOut();
        try {
            book.checkOut();
        } catch (BookNotAvailableException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
          tests: [
            { id: 1, label: "Throws BookNotAvailableException", hint: "throw new BookNotAvailableException(title)", keywords: [{ pattern: "throw new BookNotAvailableException" }] },
            { id: 2, label: "Catches it in main", hint: "catch (BookNotAvailableException e)", keywords: [{ pattern: "catch\\s*\\(\\s*BookNotAvailableException" }] },
          ],
        },
      },
      {
        id: "proj-5",
        title: "Milestone 3: Enforcing Loan Limits",
        xp: 30,
        theory: [
          text(
            "Final milestone: use each member's `loanLimit()` (from Milestone 1) to enforce how many books they can borrow at once, throwing a second custom exception when they hit the cap.",
            {
              label: "Enforcing the limit",
              content: `class LoanLimitExceededException extends RuntimeException {
    LoanLimitExceededException(String name, int limit) {
        super(name + " has reached their loan limit of " + limit);
    }
}

void borrow(Member member, Book book, List<Book> currentLoans) {
    if (currentLoans.size() >= member.loanLimit()) {
        throw new LoanLimitExceededException(member.name, member.loanLimit());
    }
    book.checkOut();
    currentLoans.add(book);
}`,
            },
          ),
          quiz(
            "Where should the loan-limit check happen relative to checkOut()?",
            [
              "After checkOut(), so the book is always removed from the shelf first",
              "Before checkOut(), so we don't check out a book the member isn't allowed to borrow",
              "It doesn't matter",
              "Inside the Book class itself",
            ],
            1,
            "Checking the limit first avoids the awkward situation of successfully checking out a book and then discovering the member wasn't allowed to borrow it — fail fast before making any state changes.",
          ),
        ],
        challenge: {
          title: "Enforce the Loan Limit",
          description: [
            {
              type: "text",
              content:
                "A Student has a loan limit of 3. Given a Student \"Amy\" who already has 3 books in currentLoans, attempt to borrow one more book \"New Book\" — catch the LoanLimitExceededException and print its message.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Amy has reached their loan limit of 3`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

class Student {
    String name;
    Student(String name) { this.name = name; }
    int loanLimit() { return 3; }
}

class Book {
    String title;
    Book(String title) { this.title = title; }
}

class LoanLimitExceededException extends RuntimeException {
    LoanLimitExceededException(String name, int limit) {
        super(name + " has reached their loan limit of " + limit);
    }
}

public class Solution {
    static void borrow(Student member, Book book, List<Book> currentLoans) {
        // throw LoanLimitExceededException if currentLoans is full, else add the book

    }

    public static void main(String[] args) {
        Student amy = new Student("Amy");
        List<Book> loans = new ArrayList<>(List.of(
            new Book("Book A"), new Book("Book B"), new Book("Book C")));

        try {
            borrow(amy, new Book("New Book"), loans);
        } catch (LoanLimitExceededException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

class Student {
    String name;
    Student(String name) { this.name = name; }
    int loanLimit() { return 3; }
}

class Book {
    String title;
    Book(String title) { this.title = title; }
}

class LoanLimitExceededException extends RuntimeException {
    LoanLimitExceededException(String name, int limit) {
        super(name + " has reached their loan limit of " + limit);
    }
}

public class Solution {
    static void borrow(Student member, Book book, List<Book> currentLoans) {
        if (currentLoans.size() >= member.loanLimit()) {
            throw new LoanLimitExceededException(member.name, member.loanLimit());
        }
        currentLoans.add(book);
    }

    public static void main(String[] args) {
        Student amy = new Student("Amy");
        List<Book> loans = new ArrayList<>(List.of(
            new Book("Book A"), new Book("Book B"), new Book("Book C")));

        try {
            borrow(amy, new Book("New Book"), loans);
        } catch (LoanLimitExceededException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
          tests: [
            { id: 1, label: "Checks currentLoans.size() against the limit", hint: "if (currentLoans.size() >= member.loanLimit())", keywords: [{ pattern: "currentLoans\\.size\\s*\\(\\s*\\)" }] },
            { id: 2, label: "Throws LoanLimitExceededException", hint: "throw new LoanLimitExceededException(...)", keywords: [{ pattern: "throw new LoanLimitExceededException" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Bank Account System (Advanced)
  // ─────────────────────────────────────────────────────────────
  {
    id: "bank-system",
    title: "Bank Account System",
    icon: "🏦",
    color: "#f59e0b",
    lessons: [
      {
        id: "proj-6",
        title: "Milestone 1: Accounts & Custom Exceptions",
        xp: 25,
        theory: [
          text(
            "New project: a **Bank Account System**. Core rule: you can never withdraw more than the balance. We enforce this with a custom `InsufficientFundsException`.",
            {
              label: "Account with a guarded withdraw",
              content: `class InsufficientFundsException extends RuntimeException {
    InsufficientFundsException(String msg) { super(msg); }
}

class Account {
    String owner;
    double balance;
    Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
    void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientFundsException(owner + " has insufficient funds");
        }
        balance -= amount;
    }
}`,
            },
          ),
          quiz(
            "Why check 'amount > balance' before mutating balance, rather than after?",
            [
              "It's the only order that compiles",
              "It prevents the account from ever reaching an invalid (negative) state",
              "It's faster",
              "There's no difference either way",
            ],
            1,
            "Validating first means balance is only ever changed when the withdrawal is actually valid — the account can never end up in an inconsistent, negative-balance state.",
          ),
        ],
        challenge: {
          title: "Guard Withdrawals",
          description: [
            {
              type: "text",
              content:
                "Complete Account.withdraw(). Create an Account for \"Sam\" with balance 100. Withdraw 30 (should succeed), then try withdrawing 200 — catch the InsufficientFundsException and print its message, then print the final balance.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Sam has insufficient funds
Balance: 70.0`,
            },
          ],
          starterCode: `class InsufficientFundsException extends RuntimeException {
    InsufficientFundsException(String msg) { super(msg); }
}

class Account {
    String owner;
    double balance;
    Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
    void withdraw(double amount) {
        // throw InsufficientFundsException if amount > balance, else subtract

    }
}

public class Solution {
    public static void main(String[] args) {
        Account acc = new Account("Sam", 100);
        acc.withdraw(30);
        try {
            acc.withdraw(200);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Balance: " + acc.balance);
    }
}`,
          solutionCode: `class InsufficientFundsException extends RuntimeException {
    InsufficientFundsException(String msg) { super(msg); }
}

class Account {
    String owner;
    double balance;
    Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
    void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientFundsException(owner + " has insufficient funds");
        }
        balance -= amount;
    }
}

public class Solution {
    public static void main(String[] args) {
        Account acc = new Account("Sam", 100);
        acc.withdraw(30);
        try {
            acc.withdraw(200);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Balance: " + acc.balance);
    }
}`,
          tests: [
            { id: 1, label: "Throws InsufficientFundsException", hint: "throw new InsufficientFundsException(...)", keywords: [{ pattern: "throw new InsufficientFundsException" }] },
            { id: 2, label: "Guards before mutating balance", hint: "if (amount > balance)", keywords: [{ pattern: "amount\\s*>\\s*balance" }] },
          ],
        },
      },
      {
        id: "proj-7",
        title: "Milestone 2: Transfers with Rollback",
        xp: 30,
        theory: [
          text(
            "Transferring money between two accounts is a two-step operation (withdraw + deposit) that must succeed **together** or not at all — the transaction pattern from the JDBC course, without a real database.",
            {
              label: "A safe transfer",
              content: `void transfer(Account from, Account to, double amount) {
    from.withdraw(amount); // throws if insufficient — nothing has moved yet
    to.deposit(amount);    // only reached if withdraw succeeded
}
// If withdraw() throws, "to" is never touched — the transfer never
// partially happens, matching the atomicity of a real DB transaction`,
            },
          ),
          quiz(
            "Why does calling withdraw() before deposit() keep this transfer safe?",
            [
              "It doesn't matter which order they're called in",
              "If withdraw() throws, deposit() never runs — so money is never created or destroyed from nowhere",
              "withdraw() is always faster",
              "Java requires withdrawals before deposits",
            ],
            1,
            "Because withdraw() throws before mutating anything invalid, an exception there stops execution before deposit() runs — avoiding the bug of crediting an account without ever successfully debiting the source.",
          ),
        ],
        challenge: {
          title: "Transfer Between Accounts",
          description: [
            {
              type: "text",
              content:
                "Complete Account.deposit() and a transfer(from, to, amount) method. Transfer 40 from Account \"A\" (balance 100) to Account \"B\" (balance 50). Then try transferring 1000 from A to B — catch the exception, print its message, and print both final balances (transfer should NOT have changed them).",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `A has insufficient funds
A: 60.0, B: 90.0`,
            },
          ],
          starterCode: `class InsufficientFundsException extends RuntimeException {
    InsufficientFundsException(String msg) { super(msg); }
}

class Account {
    String owner;
    double balance;
    Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
    void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientFundsException(owner + " has insufficient funds");
        }
        balance -= amount;
    }
    void deposit(double amount) {
        // add amount to balance

    }
}

public class Solution {
    static void transfer(Account from, Account to, double amount) {
        // withdraw from "from", then deposit into "to"

    }

    public static void main(String[] args) {
        Account a = new Account("A", 100);
        Account b = new Account("B", 50);

        transfer(a, b, 40);
        try {
            transfer(a, b, 1000);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("A: " + a.balance + ", B: " + b.balance);
    }
}`,
          solutionCode: `class InsufficientFundsException extends RuntimeException {
    InsufficientFundsException(String msg) { super(msg); }
}

class Account {
    String owner;
    double balance;
    Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
    void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientFundsException(owner + " has insufficient funds");
        }
        balance -= amount;
    }
    void deposit(double amount) {
        balance += amount;
    }
}

public class Solution {
    static void transfer(Account from, Account to, double amount) {
        from.withdraw(amount);
        to.deposit(amount);
    }

    public static void main(String[] args) {
        Account a = new Account("A", 100);
        Account b = new Account("B", 50);

        transfer(a, b, 40);
        try {
            transfer(a, b, 1000);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("A: " + a.balance + ", B: " + b.balance);
    }
}`,
          tests: [
            { id: 1, label: "transfer calls withdraw then deposit", hint: "from.withdraw(amount); to.deposit(amount);", keywords: [{ pattern: "from\\.withdraw" }, { pattern: "to\\.deposit" }] },
            { id: 2, label: "deposit adds to balance", hint: "balance += amount", keywords: [{ pattern: "balance\\s*\\+=" }] },
          ],
        },
      },
      {
        id: "proj-8",
        title: "Milestone 3: Saving Account State",
        xp: 30,
        theory: [
          text(
            "Real bank data must survive a restart. We simulate persistence with an in-memory `MockFileStore` (a Map acting as a tiny filesystem) — the same save/load pattern as real file I/O, without touching the disk.",
            {
              label: "Simulated persistence",
              content: `class MockFileStore {
    private static final Map<String, String> files = new HashMap<>();

    static void save(String filename, String content) {
        files.put(filename, content);
    }
    static String load(String filename) {
        return files.getOrDefault(filename, "");
    }
}

// Saving an account:
MockFileStore.save("account_A.txt", account.owner + "," + account.balance);`,
            },
          ),
          quiz(
            "What's the real-world equivalent of this MockFileStore.save/load pattern?",
            [
              "A database transaction",
              "Writing to and reading from a file with java.io / java.nio",
              "A network request",
              "A thread pool",
            ],
            1,
            "This mirrors real file I/O: writing account state out to persistent storage and reading it back — the same shape as Files.writeString()/Files.readString() in real Java, just backed by memory here.",
          ),
        ],
        challenge: {
          title: "Save and Load an Account",
          description: [
            {
              type: "text",
              content:
                "Using the given MockFileStore, save Account(\"A\", 60.0) as \"A,60.0\" under key \"account_A.txt\", then load it back and print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `A,60.0`,
            },
          ],
          starterCode: `import java.util.HashMap;
import java.util.Map;

class MockFileStore {
    private static final Map<String, String> files = new HashMap<>();
    static void save(String filename, String content) { files.put(filename, content); }
    static String load(String filename) { return files.getOrDefault(filename, ""); }
}

class Account {
    String owner;
    double balance;
    Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
}

public class Solution {
    public static void main(String[] args) {
        Account acc = new Account("A", 60.0);
        // save "<owner>,<balance>" under "account_A.txt", then load and print it

    }
}`,
          solutionCode: `import java.util.HashMap;
import java.util.Map;

class MockFileStore {
    private static final Map<String, String> files = new HashMap<>();
    static void save(String filename, String content) { files.put(filename, content); }
    static String load(String filename) { return files.getOrDefault(filename, ""); }
}

class Account {
    String owner;
    double balance;
    Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
}

public class Solution {
    public static void main(String[] args) {
        Account acc = new Account("A", 60.0);
        MockFileStore.save("account_A.txt", acc.owner + "," + acc.balance);
        System.out.println(MockFileStore.load("account_A.txt"));
    }
}`,
          tests: [
            { id: 1, label: "Calls MockFileStore.save", hint: "MockFileStore.save(\"account_A.txt\", ...)", keywords: [{ pattern: "MockFileStore\\.save" }] },
            { id: 2, label: "Calls MockFileStore.load", hint: "MockFileStore.load(\"account_A.txt\")", keywords: [{ pattern: "MockFileStore\\.load" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Mini E-Commerce Order System (Pro)
  // ─────────────────────────────────────────────────────────────
  {
    id: "ecommerce-system",
    title: "Mini E-Commerce Order System",
    icon: "🛒",
    color: "#8b5cf6",
    lessons: [
      {
        id: "proj-9",
        title: "Milestone 1: Product Repository (DAO)",
        xp: 30,
        theory: [
          text(
            "The capstone project: a mini e-commerce backend. First milestone: a `Product` domain class and a `ProductRepository` DAO — the same pattern from the JDBC course, now backing a full app.",
            {
              label: "Product + Repository",
              content: `record Product(int id, String name, double price) {}

class ProductRepository {
    private final List<Product> products = new ArrayList<>();
    void save(Product p) { products.add(p); }
    List<Product> findAll() { return products; }
    Product findById(int id) {
        return products.stream()
            .filter(p -> p.id() == id)
            .findFirst()
            .orElse(null);
    }
}`,
            },
          ),
          quiz(
            "Why give Product a repository instead of just using a raw List<Product> everywhere?",
            [
              "It's required by Java",
              "It centralizes data access behind one interface, so query logic (like findById) isn't duplicated across the app",
              "It's faster than a List",
              "There's no real benefit",
            ],
            1,
            "This is the DAO pattern again — centralizing 'how we find/store products' in one place means every part of the app that needs a product goes through the same, single source of truth.",
          ),
        ],
        challenge: {
          title: "Build the Product Repository",
          description: [
            {
              type: "text",
              content:
                "Complete ProductRepository.findById(). Save 3 products (1: \"Mouse\" $25, 2: \"Keyboard\" $45, 3: \"Monitor\" $200), then find and print product with id 2.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Product[id=2, name=Keyboard, price=45.0]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

record Product(int id, String name, double price) {}

class ProductRepository {
    private final List<Product> products = new ArrayList<>();
    void save(Product p) { products.add(p); }
    List<Product> findAll() { return products; }
    Product findById(int id) {
        // return the product with matching id, or null

        return null;
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductRepository repo = new ProductRepository();
        repo.save(new Product(1, "Mouse", 25));
        repo.save(new Product(2, "Keyboard", 45));
        repo.save(new Product(3, "Monitor", 200));

        System.out.println(repo.findById(2));
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

record Product(int id, String name, double price) {}

class ProductRepository {
    private final List<Product> products = new ArrayList<>();
    void save(Product p) { products.add(p); }
    List<Product> findAll() { return products; }
    Product findById(int id) {
        return products.stream()
            .filter(p -> p.id() == id)
            .findFirst()
            .orElse(null);
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductRepository repo = new ProductRepository();
        repo.save(new Product(1, "Mouse", 25));
        repo.save(new Product(2, "Keyboard", 45));
        repo.save(new Product(3, "Monitor", 200));

        System.out.println(repo.findById(2));
    }
}`,
          tests: [
            { id: 1, label: "Uses a stream filter to find by id", hint: ".filter(p -> p.id() == id)", keywords: [{ pattern: "\\.filter\\s*\\(" }] },
            { id: 2, label: "Uses findFirst/orElse", hint: ".findFirst().orElse(null)", keywords: [{ pattern: "findFirst" }] },
          ],
        },
      },
      {
        id: "proj-10",
        title: "Milestone 2: Order Service & Checkout",
        xp: 30,
        theory: [
          text(
            "Layer 2: an `OrderService` that depends on the repository (constructor injection, like the Spring Boot course) and computes an order total — the business logic layer sitting between controller and repository.",
            {
              label: "OrderService checkout logic",
              content: `class OrderService {
    private final ProductRepository repo;
    OrderService(ProductRepository repo) { this.repo = repo; }

    double checkout(List<Integer> productIds) {
        double total = 0;
        for (int id : productIds) {
            Product p = repo.findById(id);
            if (p != null) total += p.price();
        }
        return total;
    }
}`,
            },
          ),
          quiz(
            "Why does OrderService depend on ProductRepository via its constructor, rather than creating one internally with 'new'?",
            [
              "It's slower this way",
              "It mirrors real dependency injection — the service doesn't need to know how the repository is built, and it's easy to substitute in tests",
              "Java requires this pattern",
              "There's no functional benefit",
            ],
            1,
            "This is the same constructor-injection pattern from the Spring Boot course — OrderService only depends on the ProductRepository *interface* of behavior it needs, making it decoupled and testable.",
          ),
        ],
        challenge: {
          title: "Compute a Checkout Total",
          description: [
            {
              type: "text",
              content:
                "Complete OrderService.checkout(). Given products 1 (\"Mouse\" $25), 2 (\"Keyboard\" $45), 3 (\"Monitor\" $200) in the repository, check out productIds [1, 3] and print the total.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Total: 225.0`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

record Product(int id, String name, double price) {}

class ProductRepository {
    private final List<Product> products = new ArrayList<>();
    void save(Product p) { products.add(p); }
    Product findById(int id) {
        return products.stream().filter(p -> p.id() == id).findFirst().orElse(null);
    }
}

class OrderService {
    private final ProductRepository repo;
    OrderService(ProductRepository repo) { this.repo = repo; }

    double checkout(List<Integer> productIds) {
        // sum the price of each product id, skipping any not found

        return 0;
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductRepository repo = new ProductRepository();
        repo.save(new Product(1, "Mouse", 25));
        repo.save(new Product(2, "Keyboard", 45));
        repo.save(new Product(3, "Monitor", 200));

        OrderService service = new OrderService(repo);
        System.out.println("Total: " + service.checkout(List.of(1, 3)));
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

record Product(int id, String name, double price) {}

class ProductRepository {
    private final List<Product> products = new ArrayList<>();
    void save(Product p) { products.add(p); }
    Product findById(int id) {
        return products.stream().filter(p -> p.id() == id).findFirst().orElse(null);
    }
}

class OrderService {
    private final ProductRepository repo;
    OrderService(ProductRepository repo) { this.repo = repo; }

    double checkout(List<Integer> productIds) {
        double total = 0;
        for (int id : productIds) {
            Product p = repo.findById(id);
            if (p != null) total += p.price();
        }
        return total;
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductRepository repo = new ProductRepository();
        repo.save(new Product(1, "Mouse", 25));
        repo.save(new Product(2, "Keyboard", 45));
        repo.save(new Product(3, "Monitor", 200));

        OrderService service = new OrderService(repo);
        System.out.println("Total: " + service.checkout(List.of(1, 3)));
    }
}`,
          tests: [
            { id: 1, label: "OrderService takes a ProductRepository", hint: "OrderService(ProductRepository repo)", keywords: [{ pattern: "OrderService\\s*\\(\\s*ProductRepository" }] },
            { id: 2, label: "Sums prices via repo.findById", hint: "repo.findById(id)", keywords: [{ pattern: "repo\\.findById" }] },
          ],
        },
      },
      {
        id: "proj-11",
        title: "Milestone 3: Order Analytics with Streams",
        xp: 35,
        theory: [
          text(
            "Final milestone: analytics on past orders — total revenue and the best-selling product — using `reduce()` and `groupingBy()` from the Collections course, tying the whole capstone together.",
            {
              label: "Analytics with streams",
              content: `record Order(String productName, double amount) {}

double totalRevenue(List<Order> orders) {
    return orders.stream().mapToDouble(Order::amount).sum();
}

Map<String, Long> salesByProduct(List<Order> orders) {
    return orders.stream()
        .collect(Collectors.groupingBy(Order::productName, Collectors.counting()));
}`,
            },
          ),
          quiz(
            "What does Collectors.groupingBy(Order::productName, Collectors.counting()) produce?",
            [
              "A single total count",
              "A Map<String, Long> — how many orders each product name appears in",
              "A sorted List<Order>",
              "A List<String> of product names only",
            ],
            1,
            "The classifier (Order::productName) buckets orders by product name, and the downstream collector (counting()) reduces each bucket to a count — giving you 'how many times was each product ordered.'",
          ),
        ],
        challenge: {
          title: "Order Analytics",
          description: [
            {
              type: "text",
              content:
                "Given orders [(\"Mouse\",25), (\"Keyboard\",45), (\"Mouse\",25), (\"Monitor\",200)], compute and print the total revenue, then compute and print how many times \"Mouse\" was ordered.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Total revenue: 295.0
Mouse orders: 2`,
            },
          ],
          starterCode: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

record Order(String productName, double amount) {}

public class Solution {
    public static void main(String[] args) {
        List<Order> orders = List.of(
            new Order("Mouse", 25),
            new Order("Keyboard", 45),
            new Order("Mouse", 25),
            new Order("Monitor", 200)
        );

        // compute total revenue with mapToDouble().sum(), print it
        // compute counts per product with groupingBy/counting, print Mouse's count

    }
}`,
          solutionCode: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

record Order(String productName, double amount) {}

public class Solution {
    public static void main(String[] args) {
        List<Order> orders = List.of(
            new Order("Mouse", 25),
            new Order("Keyboard", 45),
            new Order("Mouse", 25),
            new Order("Monitor", 200)
        );

        double totalRevenue = orders.stream().mapToDouble(Order::amount).sum();
        System.out.println("Total revenue: " + totalRevenue);

        Map<String, Long> counts = orders.stream()
            .collect(Collectors.groupingBy(Order::productName, Collectors.counting()));
        System.out.println("Mouse orders: " + counts.get("Mouse"));
    }
}`,
          tests: [
            { id: 1, label: "Uses mapToDouble().sum() for revenue", hint: ".mapToDouble(Order::amount).sum()", keywords: [{ pattern: "mapToDouble" }] },
            { id: 2, label: "Uses groupingBy + counting", hint: "Collectors.groupingBy(Order::productName, Collectors.counting())", keywords: [{ pattern: "groupingBy" }, { pattern: "counting" }] },
          ],
        },
      },
    ],
  },
];

export const JAVA_PROJECTS_LESSONS = JAVA_PROJECTS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const JAVA_PROJECTS_TOTAL_XP = JAVA_PROJECTS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
