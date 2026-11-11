// PolyCode — Java JDBC interactive course
// 4 chapters · 12 lessons · real javac/java execution via backend
// All challenge classes MUST be named "Solution"
// NOTE: challenges use small in-memory mock JDBC-style objects (MockConnection,
// MockResultSet) so real, idiomatic JDBC syntax still compiles & runs without
// a live database server in the sandbox.

const ACCENT = "#0ea5e9";

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

export const JAVA_JDBC_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — JDBC Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "jdbc-basics",
    title: "JDBC Basics",
    icon: "🔌",
    color: ACCENT,
    lessons: [
      {
        id: "jdbc-0",
        title: "What is JDBC?",
        xp: 15,
        theory: [
          text(
            "**JDBC** (Java Database Connectivity) is the standard API for connecting Java applications to relational databases like MySQL, PostgreSQL, or Oracle. It defines interfaces — `Connection`, `Statement`, `ResultSet` — that every database vendor implements via a **driver**.",
            {
              label: "The JDBC pieces",
              content: `// 1. Load/register the driver (mostly automatic since JDBC 4.0)
// 2. Open a Connection to the database
// 3. Create a Statement or PreparedStatement
// 4. Execute a query or update
// 5. Process the ResultSet
// 6. Close everything (or use try-with-resources)`,
            },
          ),
          diagram("JDBC Architecture", [
            {
              id: "app",
              label: "Your Java App",
              color: ACCENT,
              items: ["Calls JDBC interfaces", "DriverManager, Connection, Statement"],
            },
            {
              id: "driver",
              label: "JDBC Driver",
              color: "#22c55e",
              items: ["Vendor-specific implementation", "e.g. mysql-connector-j"],
            },
            {
              id: "db",
              label: "Database",
              color: "#8b5cf6",
              items: ["MySQL, PostgreSQL, Oracle, etc."],
            },
          ]),
          quiz(
            "What is the role of a JDBC driver?",
            [
              "It replaces SQL with Java syntax",
              "It translates JDBC calls into a specific database's native protocol",
              "It stores data in memory instead of a database",
              "It compiles Java code",
            ],
            1,
            "Each database vendor ships a driver implementing the JDBC interfaces, so your code stays the same (Connection, Statement, ResultSet) no matter which database you connect to.",
          ),
        ],
        challenge: {
          title: "JDBC Building Blocks",
          description: [
            {
              type: "text",
              content:
                "Print the 5 core JDBC steps in order, one per line: \"Connect\", \"Create Statement\", \"Execute Query\", \"Process ResultSet\", \"Close Resources\".",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Connect
Create Statement
Execute Query
Process ResultSet
Close Resources`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        // Print the 5 JDBC steps, one per line

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Connect");
        System.out.println("Create Statement");
        System.out.println("Execute Query");
        System.out.println("Process ResultSet");
        System.out.println("Close Resources");
    }
}`,
          tests: [
            { id: 1, label: "Prints all 5 steps", hint: "One println per step", keywords: [{ pattern: "Connect" }, { pattern: "Close Resources" }] },
          ],
        },
      },
      {
        id: "jdbc-1",
        title: "Connecting with try-with-resources",
        xp: 20,
        theory: [
          text(
            "A real connection looks like `DriverManager.getConnection(url, user, password)`. Because `Connection` implements `AutoCloseable`, always open it inside **try-with-resources** so it's closed automatically, even if an exception occurs.",
            {
              label: "Real JDBC connection syntax",
              content: `String url = "jdbc:mysql://localhost:3306/mydb";
try (Connection conn = DriverManager.getConnection(url, "root", "password")) {
    System.out.println("Connected!");
} catch (SQLException e) {
    System.out.println("Connection failed: " + e.getMessage());
}
// conn.close() is called automatically here`,
            },
          ),
          callout(
            "warning",
            "Never leave a Connection unclosed — leaked connections exhaust the database's connection pool and crash your app under load. try-with-resources makes this a non-issue.",
          ),
          text(
            "In this course, we simulate a database with a small `MockConnection` class so your code compiles and runs without a real database server — the syntax and patterns (try-with-resources, SQLException handling) are identical to real JDBC.",
            {
              label: "MockConnection used in challenges",
              content: `class MockConnection implements AutoCloseable {
    public MockConnection(String url) {
        System.out.println("Connected to " + url);
    }
    @Override
    public void close() {
        System.out.println("Connection closed");
    }
}`,
            },
          ),
          quiz(
            "Why use try-with-resources for a Connection?",
            [
              "It makes queries run faster",
              "It guarantees close() runs even if an exception is thrown",
              "It's required by the compiler",
              "It automatically retries failed connections",
            ],
            1,
            "try-with-resources calls close() on any AutoCloseable resource automatically when the block exits — normally or via exception — preventing connection leaks.",
          ),
        ],
        challenge: {
          title: "Connect Safely",
          description: [
            {
              type: "text",
              content:
                "Using the given MockConnection class, open a connection to \"jdbc:mock://localhost/testdb\" inside try-with-resources and print nothing extra — MockConnection already prints on connect/close.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Connected to jdbc:mock://localhost/testdb
Connection closed`,
            },
          ],
          starterCode: `class MockConnection implements AutoCloseable {
    public MockConnection(String url) {
        System.out.println("Connected to " + url);
    }
    @Override
    public void close() {
        System.out.println("Connection closed");
    }
}

public class Solution {
    public static void main(String[] args) {
        // Open MockConnection with try-with-resources

    }
}`,
          solutionCode: `class MockConnection implements AutoCloseable {
    public MockConnection(String url) {
        System.out.println("Connected to " + url);
    }
    @Override
    public void close() {
        System.out.println("Connection closed");
    }
}

public class Solution {
    public static void main(String[] args) {
        try (MockConnection conn = new MockConnection("jdbc:mock://localhost/testdb")) {
            // connection used here
        }
    }
}`,
          tests: [
            { id: 1, label: "Uses try-with-resources", hint: "try (MockConnection conn = ...)", keywords: [{ pattern: "try\\s*\\(\\s*MockConnection" }] },
          ],
        },
      },
      {
        id: "jdbc-2",
        title: "Understanding Connection URLs",
        xp: 15,
        theory: [
          text(
            "A JDBC URL has the form `jdbc:<subprotocol>://<host>:<port>/<database>`. The subprotocol identifies which driver to use.",
            {
              label: "Common JDBC URLs",
              content: `// MySQL
jdbc:mysql://localhost:3306/mydb

// PostgreSQL
jdbc:postgresql://localhost:5432/mydb

// SQLite (file-based, no host/port)
jdbc:sqlite:mydb.db`,
            },
          ),
          quiz(
            "In jdbc:mysql://localhost:3306/mydb, what does 3306 represent?",
            ["The database name", "The driver version", "The port the database server listens on", "The table count"],
            2,
            "3306 is MySQL's default port. PostgreSQL defaults to 5432 — the port tells the driver where on the host to reach the database server.",
          ),
        ],
        challenge: {
          title: "Build a Connection URL",
          description: [
            {
              type: "text",
              content:
                "Build a JDBC URL string for a MySQL database named \"shopdb\" running on localhost, port 3306, using string concatenation or String.format, then print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `jdbc:mysql://localhost:3306/shopdb`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        String host = "localhost";
        int port = 3306;
        String db = "shopdb";
        // Build and print the JDBC URL

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        String host = "localhost";
        int port = 3306;
        String db = "shopdb";
        String url = "jdbc:mysql://" + host + ":" + port + "/" + db;
        System.out.println(url);
    }
}`,
          tests: [
            { id: 1, label: "Builds a jdbc:mysql:// URL", hint: "\"jdbc:mysql://\" + ...", keywords: [{ pattern: "jdbc:mysql://" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Statements & Queries
  // ─────────────────────────────────────────────────────────────
  {
    id: "statements-queries",
    title: "Statements & Queries",
    icon: "📝",
    color: "#22c55e",
    lessons: [
      {
        id: "jdbc-3",
        title: "Statement vs PreparedStatement",
        xp: 20,
        theory: [
          text(
            "`Statement` runs raw SQL strings. `PreparedStatement` uses `?` placeholders filled in with `setX()` methods — it's faster for repeated queries and, critically, **prevents SQL injection** because parameter values are never concatenated into the SQL text.",
            {
              label: "Statement vs PreparedStatement",
              content: `// Statement — vulnerable to SQL injection!
String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
Statement stmt = conn.createStatement();
stmt.executeQuery(sql);

// PreparedStatement — safe
String sql2 = "SELECT * FROM users WHERE name = ?";
PreparedStatement ps = conn.prepareStatement(sql2);
ps.setString(1, userInput);
ps.executeQuery();`,
            },
          ),
          callout(
            "warning",
            "Never build SQL by concatenating user input into a String. Always use PreparedStatement with `?` placeholders — it's the #1 defense against SQL injection.",
          ),
          quiz(
            "Why is PreparedStatement preferred over Statement for user input?",
            [
              "It's the only one that supports SELECT",
              "It prevents SQL injection by treating parameters as data, not SQL code",
              "It doesn't need a Connection",
              "It runs without a database",
            ],
            1,
            "PreparedStatement sends the SQL template and parameter values separately to the database, so user input can never be interpreted as SQL syntax — eliminating SQL injection.",
          ),
        ],
        challenge: {
          title: "Build a Parameterized Query",
          description: [
            {
              type: "text",
              content:
                "Write a SQL string with a placeholder to select a user by id: \"SELECT * FROM users WHERE id = ?\", assign it to a variable named sql, and print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `SELECT * FROM users WHERE id = ?`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        // Build the parameterized SQL string and print it

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        String sql = "SELECT * FROM users WHERE id = ?";
        System.out.println(sql);
    }
}`,
          tests: [
            { id: 1, label: "Uses a ? placeholder", hint: "WHERE id = ?", keywords: [{ pattern: "\\?" }] },
          ],
        },
      },
      {
        id: "jdbc-4",
        title: "Executing Queries with ResultSet",
        xp: 25,
        theory: [
          text(
            "`executeQuery()` returns a `ResultSet` — a cursor over the rows returned. Call `next()` to advance to each row (it returns `false` when there are no more rows), and `getX(columnName)` to read column values.",
            {
              label: "Reading a ResultSet",
              content: `String sql = "SELECT id, name FROM users";
try (PreparedStatement ps = conn.prepareStatement(sql);
     ResultSet rs = ps.executeQuery()) {
    while (rs.next()) {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        System.out.println(id + ": " + name);
    }
}`,
            },
          ),
          callout(
            "info",
            "ResultSet starts positioned *before* the first row — you must call next() once before reading any data, which is why it's always used as a while-loop condition.",
          ),
          quiz(
            "What does rs.next() return when there are no more rows to read?",
            ["null", "0", "false", "throws an exception"],
            2,
            "next() returns true if it successfully advanced to a row, and false once the cursor moves past the last row — making it a natural while-loop condition.",
          ),
        ],
        challenge: {
          title: "Iterate a MockResultSet",
          description: [
            {
              type: "text",
              content:
                "Using the given MockResultSet (which simulates 3 rows: \"Alice\", \"Bob\", \"Cara\"), loop with next() and print each name.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Alice
Bob
Cara`,
            },
          ],
          starterCode: `import java.util.List;

class MockResultSet {
    private final List<String> rows = List.of("Alice", "Bob", "Cara");
    private int cursor = -1;

    public boolean next() {
        cursor++;
        return cursor < rows.size();
    }
    public String getString(String column) {
        return rows.get(cursor);
    }
}

public class Solution {
    public static void main(String[] args) {
        MockResultSet rs = new MockResultSet();
        // loop using rs.next() and print each name

    }
}`,
          solutionCode: `import java.util.List;

class MockResultSet {
    private final List<String> rows = List.of("Alice", "Bob", "Cara");
    private int cursor = -1;

    public boolean next() {
        cursor++;
        return cursor < rows.size();
    }
    public String getString(String column) {
        return rows.get(cursor);
    }
}

public class Solution {
    public static void main(String[] args) {
        MockResultSet rs = new MockResultSet();
        while (rs.next()) {
            System.out.println(rs.getString("name"));
        }
    }
}`,
          tests: [
            { id: 1, label: "Uses while(rs.next())", hint: "while (rs.next()) { ... }", keywords: [{ pattern: "while\\s*\\(\\s*rs\\.next\\s*\\(\\s*\\)\\s*\\)" }] },
            { id: 2, label: "Reads via getString", hint: "rs.getString(...)", keywords: [{ pattern: "\\.getString\\s*\\(" }] },
          ],
        },
      },
      {
        id: "jdbc-5",
        title: "Insert, Update, Delete",
        xp: 20,
        theory: [
          text(
            "For statements that modify data (`INSERT`, `UPDATE`, `DELETE`), use `executeUpdate()` instead of `executeQuery()`. It returns an `int` — the number of rows affected — instead of a ResultSet.",
            {
              label: "executeUpdate examples",
              content: `String insert = "INSERT INTO users (name) VALUES (?)";
try (PreparedStatement ps = conn.prepareStatement(insert)) {
    ps.setString(1, "Dana");
    int rows = ps.executeUpdate();
    System.out.println(rows + " row(s) inserted");
}

String update = "UPDATE users SET name = ? WHERE id = ?";
// ps.setString(1, "New Name"); ps.setInt(2, 5); ps.executeUpdate();`,
            },
          ),
          quiz(
            "What does PreparedStatement.executeUpdate() return?",
            ["A ResultSet", "The number of rows affected", "The new row's data", "Nothing (void)"],
            1,
            "executeUpdate() is used for INSERT/UPDATE/DELETE and returns an int count of how many rows were affected — useful for confirming the operation succeeded.",
          ),
        ],
        challenge: {
          title: "Simulate an Insert",
          description: [
            {
              type: "text",
              content:
                "Using the given MockStatement.executeUpdate(sql) which returns 1 for any INSERT statement, build an INSERT SQL string for a \"users\" table adding name \"Eve\", run it, and print \"Rows affected: 1\".",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Rows affected: 1`,
            },
          ],
          starterCode: `class MockStatement {
    public int executeUpdate(String sql) {
        return sql.startsWith("INSERT") ? 1 : 0;
    }
}

public class Solution {
    public static void main(String[] args) {
        MockStatement stmt = new MockStatement();
        // build an INSERT sql string, run executeUpdate, print result

    }
}`,
          solutionCode: `class MockStatement {
    public int executeUpdate(String sql) {
        return sql.startsWith("INSERT") ? 1 : 0;
    }
}

public class Solution {
    public static void main(String[] args) {
        MockStatement stmt = new MockStatement();
        String sql = "INSERT INTO users (name) VALUES ('Eve')";
        int rows = stmt.executeUpdate(sql);
        System.out.println("Rows affected: " + rows);
    }
}`,
          tests: [
            { id: 1, label: "Builds an INSERT statement", hint: "String sql = \"INSERT INTO ...\"", keywords: [{ pattern: "INSERT" }] },
            { id: 2, label: "Calls executeUpdate", hint: "stmt.executeUpdate(sql)", keywords: [{ pattern: "executeUpdate" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Transactions & Batch Operations
  // ─────────────────────────────────────────────────────────────
  {
    id: "transactions-batch",
    title: "Transactions & Batch Operations",
    icon: "🔄",
    color: "#f59e0b",
    lessons: [
      {
        id: "jdbc-6",
        title: "Handling SQLException",
        xp: 20,
        theory: [
          text(
            "Nearly every JDBC method can throw `SQLException` — a **checked exception** covering connection failures, constraint violations, syntax errors, and more. It carries an error code and SQL state alongside the message.",
            {
              label: "Catching SQLException",
              content: `try (Connection conn = DriverManager.getConnection(url, user, pass)) {
    // work with the connection
} catch (SQLException e) {
    System.out.println("SQL error " + e.getErrorCode() + ": " + e.getMessage());
}`,
            },
          ),
          quiz(
            "What kind of exception is SQLException?",
            ["Unchecked (RuntimeException)", "Checked — must be caught or declared", "An Error", "It's not an exception at all"],
            1,
            "SQLException is checked, meaning the compiler forces you to either catch it or declare `throws SQLException` on the enclosing method.",
          ),
        ],
        challenge: {
          title: "Handle a Simulated SQL Error",
          description: [
            {
              type: "text",
              content:
                "The given MockDb.run(sql) throws a RuntimeException with message \"Duplicate key\" when the SQL contains \"DUPLICATE\". Catch it and print \"Error: Duplicate key\".",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Error: Duplicate key`,
            },
          ],
          starterCode: `class MockDb {
    public static void run(String sql) {
        if (sql.contains("DUPLICATE")) {
            throw new RuntimeException("Duplicate key");
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        // Call MockDb.run("INSERT DUPLICATE ..."), catch the error, print it

    }
}`,
          solutionCode: `class MockDb {
    public static void run(String sql) {
        if (sql.contains("DUPLICATE")) {
            throw new RuntimeException("Duplicate key");
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        try {
            MockDb.run("INSERT DUPLICATE INTO users");
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          tests: [
            { id: 1, label: "Uses try-catch", hint: "try { ... } catch (...)", keywords: [{ pattern: "try\\s*\\{" }] },
            { id: 2, label: "Prints the error message", hint: "e.getMessage()", keywords: [{ pattern: "getMessage" }] },
          ],
        },
      },
      {
        id: "jdbc-7",
        title: "Transactions: commit & rollback",
        xp: 25,
        theory: [
          text(
            "By default, JDBC auto-commits every statement. For multi-step operations that must succeed or fail **together** (like transferring money between accounts), turn off auto-commit and control the transaction manually.",
            {
              label: "Manual transaction control",
              content: `conn.setAutoCommit(false);
try {
    // withdraw from account A
    // deposit into account B
    conn.commit(); // both succeed together
} catch (SQLException e) {
    conn.rollback(); // undo everything if either step failed
} finally {
    conn.setAutoCommit(true);
}`,
            },
          ),
          callout(
            "info",
            "This is called **ACID** transaction behavior — Atomicity ensures all steps in a transaction succeed or none do.",
          ),
          quiz(
            "What does conn.rollback() do?",
            [
              "Permanently saves all changes",
              "Undoes all changes made since the last commit",
              "Closes the connection",
              "Re-runs the last query",
            ],
            1,
            "rollback() reverts the database to the state it was in before the current transaction started, discarding any uncommitted changes.",
          ),
        ],
        challenge: {
          title: "Simulate a Transfer Transaction",
          description: [
            {
              type: "text",
              content:
                "Using the given MockAccount, write a transfer that withdraws 50 from account A and deposits 50 into account B. If A's balance would go negative, throw a RuntimeException and don't apply either change (simulate rollback by checking before mutating).",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `A: 50, B: 150`,
            },
          ],
          starterCode: `class MockAccount {
    int balance;
    MockAccount(int balance) { this.balance = balance; }
}

public class Solution {
    public static void main(String[] args) {
        MockAccount a = new MockAccount(100);
        MockAccount b = new MockAccount(100);
        int amount = 50;
        // Transfer amount from a to b, only if a has enough balance
        // then print "A: <a.balance>, B: <b.balance>"

    }
}`,
          solutionCode: `class MockAccount {
    int balance;
    MockAccount(int balance) { this.balance = balance; }
}

public class Solution {
    public static void main(String[] args) {
        MockAccount a = new MockAccount(100);
        MockAccount b = new MockAccount(100);
        int amount = 50;

        if (a.balance < amount) {
            throw new RuntimeException("Insufficient funds");
        }
        a.balance -= amount;
        b.balance += amount;

        System.out.println("A: " + a.balance + ", B: " + b.balance);
    }
}`,
          tests: [
            { id: 1, label: "Checks balance before transferring", hint: "if (a.balance < amount)", keywords: [{ pattern: "if\\s*\\(" }] },
            { id: 2, label: "Updates both balances", hint: "a.balance -= amount; b.balance += amount;", keywords: [{ pattern: "balance\\s*[-+]=" }] },
          ],
        },
      },
      {
        id: "jdbc-8",
        title: "Batch Updates",
        xp: 20,
        theory: [
          text(
            "Running many similar INSERT/UPDATE statements one at a time is slow — each round-trips to the database. **Batching** groups them into a single network round-trip with `addBatch()` and `executeBatch()`.",
            {
              label: "Batch inserts",
              content: `String sql = "INSERT INTO users (name) VALUES (?)";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    for (String name : List.of("Ann", "Ben", "Cid")) {
        ps.setString(1, name);
        ps.addBatch();
    }
    int[] results = ps.executeBatch(); // one round-trip for all 3
}`,
            },
          ),
          quiz(
            "What's the main benefit of batching INSERT statements?",
            [
              "It skips SQL syntax checking",
              "It reduces the number of database round-trips, improving performance",
              "It makes the SQL injection-proof",
              "It's required for INSERT statements",
            ],
            1,
            "Instead of one network round-trip per row, addBatch()/executeBatch() sends all the statements together — a major performance win for bulk operations.",
          ),
        ],
        challenge: {
          title: "Batch Insert Names",
          description: [
            {
              type: "text",
              content:
                "Given List.of(\"Ann\", \"Ben\", \"Cid\"), use the MockBatch class to addBatch() for each name, then executeBatch() and print the number of statements executed.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Executed 3 statements`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

class MockBatch {
    private final List<String> batch = new ArrayList<>();
    public void addBatch(String item) { batch.add(item); }
    public int executeBatch() { return batch.size(); }
}

public class Solution {
    public static void main(String[] args) {
        List<String> names = List.of("Ann", "Ben", "Cid");
        MockBatch batch = new MockBatch();
        // addBatch for each name, executeBatch, print count

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

class MockBatch {
    private final List<String> batch = new ArrayList<>();
    public void addBatch(String item) { batch.add(item); }
    public int executeBatch() { return batch.size(); }
}

public class Solution {
    public static void main(String[] args) {
        List<String> names = List.of("Ann", "Ben", "Cid");
        MockBatch batch = new MockBatch();
        for (String name : names) {
            batch.addBatch(name);
        }
        int count = batch.executeBatch();
        System.out.println("Executed " + count + " statements");
    }
}`,
          tests: [
            { id: 1, label: "Calls addBatch for each name", hint: "batch.addBatch(name)", keywords: [{ pattern: "addBatch" }] },
            { id: 2, label: "Calls executeBatch", hint: "batch.executeBatch()", keywords: [{ pattern: "executeBatch" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — DAO Pattern & Best Practices
  // ─────────────────────────────────────────────────────────────
  {
    id: "dao-pattern",
    title: "DAO Pattern & Best Practices",
    icon: "🏗️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "jdbc-9",
        title: "The DAO Design Pattern",
        xp: 25,
        theory: [
          text(
            "The **DAO (Data Access Object)** pattern isolates all database code behind an interface, so the rest of your app never touches JDBC directly. This makes code testable and lets you swap the storage layer without touching business logic.",
            {
              label: "A simple DAO",
              content: `interface UserDao {
    User findById(int id);
    List<User> findAll();
    void save(User user);
}

class JdbcUserDao implements UserDao {
    private final Connection conn;
    JdbcUserDao(Connection conn) { this.conn = conn; }

    @Override
    public User findById(int id) {
        // PreparedStatement + ResultSet logic here
        return null; // simplified
    }
    // ...
}`,
            },
          ),
          quiz(
            "What's the main benefit of the DAO pattern?",
            [
              "It makes SQL queries run faster",
              "It separates data-access logic from business logic behind an interface",
              "It removes the need for a database",
              "It's required by JDBC",
            ],
            1,
            "By hiding JDBC details behind an interface like UserDao, the rest of the application depends only on the interface — making it easy to test with a mock and to swap implementations later.",
          ),
        ],
        challenge: {
          title: "Implement a Simple DAO",
          description: [
            {
              type: "text",
              content:
                "Implement the given UserDao interface with an InMemoryUserDao that stores users in a List, implementing findAll() and save(). Save \"Alice\" and \"Bob\", then print findAll().",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[Alice, Bob]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

interface UserDao {
    List<String> findAll();
    void save(String user);
}

// Implement InMemoryUserDao here

public class Solution {
    public static void main(String[] args) {
        UserDao dao = new InMemoryUserDao();
        dao.save("Alice");
        dao.save("Bob");
        System.out.println(dao.findAll());
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

interface UserDao {
    List<String> findAll();
    void save(String user);
}

class InMemoryUserDao implements UserDao {
    private final List<String> users = new ArrayList<>();

    @Override
    public List<String> findAll() {
        return users;
    }

    @Override
    public void save(String user) {
        users.add(user);
    }
}

public class Solution {
    public static void main(String[] args) {
        UserDao dao = new InMemoryUserDao();
        dao.save("Alice");
        dao.save("Bob");
        System.out.println(dao.findAll());
    }
}`,
          tests: [
            { id: 1, label: "Implements UserDao", hint: "class InMemoryUserDao implements UserDao", keywords: [{ pattern: "implements\\s+UserDao" }] },
            { id: 2, label: "Implements save and findAll", hint: "@Override public void save / findAll", keywords: [{ pattern: "save\\s*\\(" }, { pattern: "findAll\\s*\\(" }] },
          ],
        },
      },
      {
        id: "jdbc-10",
        title: "Connection Pooling Concepts",
        xp: 20,
        theory: [
          text(
            "Opening a database connection is expensive (network handshake, authentication). A **connection pool** (e.g. HikariCP) keeps a set of open connections ready to reuse, so your app borrows one, uses it, and returns it instead of opening a fresh connection every time.",
            {
              label: "Pooling vs no pooling",
              content: `// Without pooling — expensive every time
Connection conn = DriverManager.getConnection(url, user, pass);
// ... use it ...
conn.close(); // connection is fully closed

// With pooling (conceptually)
Connection conn = pool.borrowConnection(); // reuses an existing connection
// ... use it ...
pool.returnConnection(conn); // returned to the pool, not closed`,
            },
          ),
          callout(
            "info",
            "In real Spring Boot apps, HikariCP is the default pool — you rarely manage it manually, just configure pool size in application.properties.",
          ),
          quiz(
            "What problem does connection pooling solve?",
            [
              "SQL injection",
              "The overhead of repeatedly opening and closing database connections",
              "Data type mismatches",
              "Duplicate rows",
            ],
            1,
            "Connection pooling reuses a fixed set of already-open connections, avoiding the network/auth cost of establishing a new connection for every database operation.",
          ),
        ],
        challenge: {
          title: "Simulate a Connection Pool",
          description: [
            {
              type: "text",
              content:
                "Using the given MockPool with capacity 2, borrow a connection, print \"Borrowed\", then return it and print \"Returned\". Print the pool's available count before and after.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Available: 2
Borrowed
Available: 1
Returned
Available: 2`,
            },
          ],
          starterCode: `class MockPool {
    private int available = 2;
    public void borrow() { available--; }
    public void giveBack() { available++; }
    public int available() { return available; }
}

public class Solution {
    public static void main(String[] args) {
        MockPool pool = new MockPool();
        // print available, borrow + print "Borrowed" + print available,
        // give back + print "Returned" + print available

    }
}`,
          solutionCode: `class MockPool {
    private int available = 2;
    public void borrow() { available--; }
    public void giveBack() { available++; }
    public int available() { return available; }
}

public class Solution {
    public static void main(String[] args) {
        MockPool pool = new MockPool();
        System.out.println("Available: " + pool.available());
        pool.borrow();
        System.out.println("Borrowed");
        System.out.println("Available: " + pool.available());
        pool.giveBack();
        System.out.println("Returned");
        System.out.println("Available: " + pool.available());
    }
}`,
          tests: [
            { id: 1, label: "Calls borrow()", hint: "pool.borrow()", keywords: [{ pattern: "\\.borrow\\s*\\(" }] },
            { id: 2, label: "Calls giveBack()", hint: "pool.giveBack()", keywords: [{ pattern: "\\.giveBack\\s*\\(" }] },
          ],
        },
      },
      {
        id: "jdbc-11",
        title: "Mapping ResultSet Rows to Objects",
        xp: 25,
        theory: [
          text(
            "Manually reading columns with `getInt`/`getString` for every query gets repetitive. A common pattern is a **row mapper**: a small method or class that converts one ResultSet row into a domain object.",
            {
              label: "A simple row mapper",
              content: `record User(int id, String name) {}

static User mapRow(ResultSet rs) throws SQLException {
    return new User(rs.getInt("id"), rs.getString("name"));
}

List<User> users = new ArrayList<>();
while (rs.next()) {
    users.add(mapRow(rs));
}`,
            },
          ),
          callout(
            "info",
            "This is exactly what ORMs like Hibernate (and Spring Data JPA) automate for you — mapping rows to objects so you rarely write raw SQL by hand.",
          ),
          quiz(
            "What problem does a 'row mapper' solve?",
            [
              "It opens the database connection",
              "It converts each ResultSet row into a domain object, avoiding repetitive getX() calls",
              "It writes SQL for you",
              "It replaces PreparedStatement",
            ],
            1,
            "A row mapper centralizes the ResultSet → object conversion logic in one place instead of repeating rs.getInt/getString calls everywhere a query is run.",
          ),
        ],
        challenge: {
          title: "Map Rows to a Record",
          description: [
            {
              type: "text",
              content:
                "Given the MockResultSet with rows [(1,\"Alice\"), (2,\"Bob\")], define a User record with id and name, write a mapRow method, map all rows into a List<User>, and print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[User[id=1, name=Alice], User[id=2, name=Bob]]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

class MockResultSet {
    private final int[] ids = {1, 2};
    private final String[] names = {"Alice", "Bob"};
    private int cursor = -1;

    public boolean next() {
        cursor++;
        return cursor < ids.length;
    }
    public int getInt(String col) { return ids[cursor]; }
    public String getString(String col) { return names[cursor]; }
}

// Define a User record here

public class Solution {
    public static void main(String[] args) {
        MockResultSet rs = new MockResultSet();
        List<User> users = new ArrayList<>();
        // loop rs.next(), map each row to a User, add to users
        System.out.println(users);
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

class MockResultSet {
    private final int[] ids = {1, 2};
    private final String[] names = {"Alice", "Bob"};
    private int cursor = -1;

    public boolean next() {
        cursor++;
        return cursor < ids.length;
    }
    public int getInt(String col) { return ids[cursor]; }
    public String getString(String col) { return names[cursor]; }
}

record User(int id, String name) {}

public class Solution {
    public static void main(String[] args) {
        MockResultSet rs = new MockResultSet();
        List<User> users = new ArrayList<>();
        while (rs.next()) {
            users.add(new User(rs.getInt("id"), rs.getString("name")));
        }
        System.out.println(users);
    }
}`,
          tests: [
            { id: 1, label: "Defines a User record", hint: "record User(int id, String name) {}", keywords: [{ pattern: "record\\s+User" }] },
            { id: 2, label: "Maps rows in a loop", hint: "while (rs.next()) { users.add(new User(...)); }", keywords: [{ pattern: "while\\s*\\(\\s*rs\\.next" }] },
          ],
        },
      },
    ],
  },
];

export const JAVA_JDBC_LESSONS = JAVA_JDBC_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const JAVA_JDBC_TOTAL_XP = JAVA_JDBC_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
