// PolyCode — Java Multithreading interactive course
// 4 chapters · 12 lessons · real javac/java execution via backend
// All challenge classes MUST be named "Solution"

const ACCENT = "#3b82f6";

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

export const JAVA_MULTITHREADING_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Thread Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "thread-basics",
    title: "Thread Basics",
    icon: "🧵",
    color: ACCENT,
    lessons: [
      {
        id: "mt-0",
        title: "What is a Thread?",
        xp: 15,
        theory: [
          text(
            "A **thread** is the smallest unit of execution in a program. Every Java program starts with one thread — the **main thread**. Multithreading lets you run multiple tasks simultaneously, making programs faster and more responsive.",
            {
              label: "Creating a thread",
              content: `// Option 1: extend Thread
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Running in: " + Thread.currentThread().getName());
    }
}

// Option 2: implement Runnable (preferred)
Runnable task = () -> System.out.println("Running in: "
    + Thread.currentThread().getName());

new MyThread().start();         // start() — not run()!
new Thread(task).start();`,
            },
          ),
          diagram("Thread Lifecycle", [
            {
              id: "new",
              label: "NEW",
              color: "#6b7280",
              items: ["Thread created", "Not yet started"],
            },
            {
              id: "runnable",
              label: "RUNNABLE",
              color: ACCENT,
              items: ["start() called", "Ready to run", "May be running"],
            },
            {
              id: "blocked",
              label: "BLOCKED / WAITING",
              color: "#f59e0b",
              items: ["Waiting for lock", "sleep() / join()", "Temporarily paused"],
            },
            {
              id: "terminated",
              label: "TERMINATED",
              color: "#22c55e",
              items: ["run() completed", "Thread is dead", "Cannot restart"],
            },
          ]),
          callout("warning", "Always call start() not run(). Calling run() directly just executes it on the current thread — no new thread is created!"),
          quiz(
            "What method actually starts a new thread of execution?",
            ["run()", "execute()", "start()", "begin()"],
            2,
            "start() creates a new OS thread and calls run() on it. Calling run() directly just executes the method on the current thread.",
          ),
        ],
        challenge: {
          title: "Your First Thread",
          description: [
            { type: "text", content: "Create a Runnable that prints 'Hello from thread!'. Start it as a new thread. Then print 'Hello from main!' in the main thread." },
            { type: "expected", label: "Expected output (order may vary)", content: `Hello from thread!\nHello from main!` },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        // Create a Runnable that prints "Hello from thread!"
        // Start it as a new Thread
        // Print "Hello from main!" in main

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> System.out.println("Hello from thread!"));
        t.start();
        t.join();
        System.out.println("Hello from main!");
    }
}`,
          tests: [
            { id: 1, label: "Creates a new Thread", hint: "new Thread(...)", keywords: [{ pattern: "new\\s+Thread\\s*\\(" }] },
            { id: 2, label: "Calls start()", hint: "t.start()", keywords: [{ pattern: "\\.start\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Prints 'Hello from thread!'", hint: "System.out.println(\"Hello from thread!\")", keywords: [{ pattern: "Hello from thread!" }] },
            { id: 4, label: "Prints 'Hello from main!'", hint: "System.out.println(\"Hello from main!\")", keywords: [{ pattern: "Hello from main!" }] },
          ],
        },
      },
      {
        id: "mt-1",
        title: "Thread Sleep and Join",
        xp: 20,
        theory: [
          text(
            "`Thread.sleep(ms)` pauses the current thread for a number of milliseconds. `thread.join()` makes the calling thread wait until another thread finishes.",
            {
              label: "sleep and join",
              content: `Thread worker = new Thread(() -> {
    System.out.println("Worker: starting...");
    try {
        Thread.sleep(1000); // pause 1 second
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    System.out.println("Worker: done!");
});

worker.start();
System.out.println("Main: waiting for worker...");
worker.join();   // main thread waits here until worker finishes
System.out.println("Main: worker finished!");`,
            },
          ),
          callout("warning", "sleep() throws InterruptedException — always catch it and restore the interrupt flag with Thread.currentThread().interrupt(). Never swallow it silently."),
          quiz(
            "What does join() do?",
            [
              "Starts a new thread",
              "Pauses a thread for a set time",
              "Makes the calling thread wait until the target thread finishes",
              "Kills a thread",
            ],
            2,
            "join() blocks the calling thread until the thread it's called on finishes. Useful for waiting on background work before continuing.",
          ),
        ],
        challenge: {
          title: "Thread Sequence",
          description: [
            { type: "text", content: "Create 3 threads that each print their number (1, 2, 3). Use join() to ensure they print in order: Thread 1 first, then 2, then 3." },
            { type: "expected", label: "Expected output", content: `Thread 1\nThread 2\nThread 3` },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) throws InterruptedException {
        // Create 3 threads, use join() to ensure order 1, 2, 3

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> System.out.println("Thread 1"));
        Thread t2 = new Thread(() -> System.out.println("Thread 2"));
        Thread t3 = new Thread(() -> System.out.println("Thread 3"));

        t1.start(); t1.join();
        t2.start(); t2.join();
        t3.start(); t3.join();
    }
}`,
          tests: [
            { id: 1, label: "Creates 3 threads", hint: "new Thread(...) three times", keywords: [{ pattern: "new\\s+Thread" }] },
            { id: 2, label: "Uses join() for ordering", hint: "t1.join(); t2.join(); t3.join()", keywords: [{ pattern: "\\.join\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Prints Thread 1, 2, 3", hint: "System.out.println(\"Thread 1\")", keywords: [{ pattern: "Thread 1" }] },
          ],
        },
      },
      {
        id: "mt-2",
        title: "Race Conditions",
        xp: 25,
        theory: [
          text(
            "A **race condition** occurs when two threads access shared data simultaneously and the result depends on the order of execution. This causes unpredictable, hard-to-reproduce bugs.",
            {
              label: "Race condition example",
              content: `// BROKEN — race condition
class Counter {
    int count = 0;

    void increment() {
        count++; // NOT atomic! Read-modify-write in 3 steps
    }
}

Counter c = new Counter();
Thread t1 = new Thread(() -> { for (int i=0; i<1000; i++) c.increment(); });
Thread t2 = new Thread(() -> { for (int i=0; i<1000; i++) c.increment(); });
t1.start(); t2.start();
t1.join();  t2.join();
System.out.println(c.count); // Should be 2000 but often less!`,
            },
          ),
          text("The fix: use `synchronized`, `AtomicInteger`, or other thread-safe mechanisms.",
            {
              label: "Fixed with synchronized",
              content: `class Counter {
    int count = 0;

    synchronized void increment() { // only one thread at a time
        count++;
    }
}`,
            },
          ),
          callout("warning", "count++ looks like one operation but is actually three: read count, add 1, write back. Without synchronization, two threads can read the same value and both write the same result, losing an increment."),
          quiz(
            "What causes a race condition?",
            [
              "Using too many threads",
              "Two threads accessing shared mutable data without synchronization",
              "Calling sleep() on the wrong thread",
              "Creating threads with Runnable instead of Thread",
            ],
            1,
            "Race conditions occur when multiple threads read and write shared data without synchronization, leading to unpredictable results depending on thread scheduling.",
          ),
        ],
        challenge: {
          title: "Thread-Safe Counter",
          description: [
            { type: "text", content: "Create a Counter with a synchronized increment() method. Start 5 threads each incrementing 1000 times. After all finish, print the count — it must be exactly 5000." },
            { type: "expected", label: "Expected output", content: "Count: 5000" },
          ],
          starterCode: `public class Solution {
    static class Counter {
        int count = 0;

        // Make this thread-safe with synchronized
        void increment() {
            count++;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Counter c = new Counter();
        Thread[] threads = new Thread[5];

        for (int i = 0; i < 5; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) c.increment();
            });
            threads[i].start();
        }

        for (Thread t : threads) t.join();
        System.out.println("Count: " + c.count);
    }
}`,
          solutionCode: `public class Solution {
    static class Counter {
        int count = 0;

        synchronized void increment() {
            count++;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Counter c = new Counter();
        Thread[] threads = new Thread[5];

        for (int i = 0; i < 5; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) c.increment();
            });
            threads[i].start();
        }

        for (Thread t : threads) t.join();
        System.out.println("Count: " + c.count);
    }
}`,
          tests: [
            { id: 1, label: "increment() is synchronized", hint: "synchronized void increment()", keywords: [{ pattern: "synchronized.*increment|increment.*synchronized" }] },
            { id: 2, label: "Creates 5 threads", hint: "new Thread[5]", keywords: [{ pattern: "new\\s+Thread\\[5\\]|Thread\\[5\\]" }] },
            { id: 3, label: "Joins all threads", hint: "for (Thread t : threads) t.join()", keywords: [{ pattern: "\\.join\\s*\\(\\s*\\)" }] },
            { id: 4, label: "Prints Count: 5000", hint: "System.out.println(\"Count: \" + c.count)", keywords: [{ pattern: "Count:" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Synchronization
  // ─────────────────────────────────────────────────────────────
  {
    id: "synchronization",
    title: "Synchronization",
    icon: "🔒",
    color: "#8b5cf6",
    lessons: [
      {
        id: "mt-3",
        title: "synchronized and volatile",
        xp: 25,
        theory: [
          text(
            "`synchronized` ensures only one thread executes a block at a time. `volatile` ensures a variable is always read from main memory, not a thread-local cache. They solve different problems.",
            {
              label: "synchronized block vs method",
              content: `class BankAccount {
    private double balance;

    // Synchronized method — locks the whole object
    public synchronized void deposit(double amount) {
        balance += amount;
    }

    // Synchronized block — more granular control
    public void withdraw(double amount) {
        synchronized (this) {
            if (balance >= amount) balance -= amount;
        }
    }
}`,
            },
          ),
          text("`volatile` is lighter than `synchronized` — use it for simple flags that one thread writes and others read.",
            {
              label: "volatile flag",
              content: `class Worker implements Runnable {
    private volatile boolean running = true; // visible to all threads

    public void stop() { running = false; }

    @Override
    public void run() {
        while (running) {
            // do work
        }
        System.out.println("Worker stopped.");
    }
}

Worker w = new Worker();
Thread t = new Thread(w);
t.start();
Thread.sleep(100);
w.stop();  // sets running = false, thread sees it immediately
t.join();`,
            },
          ),
          quiz(
            "When should you use volatile instead of synchronized?",
            [
              "Always — volatile is faster",
              "When multiple threads modify the same variable",
              "For simple flags one thread writes and others only read",
              "Never — synchronized is always better",
            ],
            2,
            "volatile is for visibility only — ensuring all threads see the latest value. synchronized is for atomicity — ensuring compound operations (read-modify-write) happen without interruption.",
          ),
        ],
        challenge: {
          title: "Stoppable Worker",
          description: [
            { type: "text", content: "Create a Worker class with a volatile boolean running. run() loops while running is true, printing 'Working...' once. stop() sets running=false. Start it, call stop() after join(), print 'Stopped'." },
            { type: "expected", label: "Expected output", content: `Working...\nStopped` },
          ],
          starterCode: `public class Solution {
    static class Worker implements Runnable {
        private volatile boolean running = true;

        public void stop() {
            // set running to false

        }

        @Override
        public void run() {
            // print "Working..." once while running is true

        }
    }

    public static void main(String[] args) throws InterruptedException {
        Worker w = new Worker();
        Thread t = new Thread(w);
        t.start();
        t.join();
        w.stop();
        System.out.println("Stopped");
    }
}`,
          solutionCode: `public class Solution {
    static class Worker implements Runnable {
        private volatile boolean running = true;

        public void stop() { running = false; }

        @Override
        public void run() {
            while (running) {
                System.out.println("Working...");
                running = false;
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Worker w = new Worker();
        Thread t = new Thread(w);
        t.start();
        t.join();
        w.stop();
        System.out.println("Stopped");
    }
}`,
          tests: [
            { id: 1, label: "running is volatile", hint: "private volatile boolean running", keywords: [{ pattern: "volatile.*running|running.*volatile" }] },
            { id: 2, label: "stop() sets running = false", hint: "running = false", keywords: [{ pattern: "running\\s*=\\s*false" }] },
            { id: 3, label: "Prints 'Working...'", hint: "System.out.println(\"Working...\")", keywords: [{ pattern: "Working\\.\\.\\." }] },
            { id: 4, label: "Prints 'Stopped'", hint: "System.out.println(\"Stopped\")", keywords: [{ pattern: "Stopped" }] },
          ],
        },
      },
      {
        id: "mt-4",
        title: "Atomic Classes",
        xp: 25,
        theory: [
          text(
            "The `java.util.concurrent.atomic` package provides lock-free thread-safe classes. `AtomicInteger` is the most common — it wraps an `int` and makes common operations like `incrementAndGet()` atomic without `synchronized`.",
            {
              label: "AtomicInteger",
              content: `import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger counter = new AtomicInteger(0);

// All atomic — no synchronized needed
counter.incrementAndGet();     // ++counter, returns new value
counter.decrementAndGet();     // --counter
counter.addAndGet(5);          // counter += 5
counter.compareAndSet(5, 10);  // if value==5, set to 10
int value = counter.get();     // read current value

// Example: 10 threads each increment 1000 times
AtomicInteger total = new AtomicInteger(0);
Thread[] threads = new Thread[10];
for (int i = 0; i < 10; i++)
    threads[i] = new Thread(() -> {
        for (int j = 0; j < 1000; j++) total.incrementAndGet();
    });
// ... start and join all threads
// total.get() is always exactly 10000`,
            },
          ),
          callout("tip", "Prefer AtomicInteger over synchronized counter for simple counters. It's faster (uses CPU-level compare-and-swap) and less error-prone than manually synchronizing."),
          quiz(
            "What makes AtomicInteger thread-safe without synchronized?",
            [
              "It uses a lock internally",
              "It is immutable",
              "It uses CPU-level compare-and-swap (CAS) operations",
              "It runs on a single thread",
            ],
            2,
            "AtomicInteger uses hardware compare-and-swap (CAS) instructions which are atomic at the CPU level — much faster than a lock.",
          ),
        ],
        challenge: {
          title: "Atomic Download Counter",
          description: [
            { type: "text", content: "Simulate 10 download threads each completing 100 downloads. Use AtomicInteger to count total downloads safely. Print the final count." },
            { type: "expected", label: "Expected output", content: "Total downloads: 1000" },
          ],
          starterCode: `import java.util.concurrent.atomic.AtomicInteger;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger downloads = new AtomicInteger(0);
        Thread[] threads = new Thread[10];

        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(() -> {
                // Simulate 100 downloads per thread

            });
            threads[i].start();
        }

        for (Thread t : threads) t.join();
        System.out.println("Total downloads: " + downloads.get());
    }
}`,
          solutionCode: `import java.util.concurrent.atomic.AtomicInteger;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger downloads = new AtomicInteger(0);
        Thread[] threads = new Thread[10];

        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 100; j++) downloads.incrementAndGet();
            });
            threads[i].start();
        }

        for (Thread t : threads) t.join();
        System.out.println("Total downloads: " + downloads.get());
    }
}`,
          tests: [
            { id: 1, label: "Uses AtomicInteger", hint: "AtomicInteger downloads = new AtomicInteger(0)", keywords: [{ pattern: "AtomicInteger" }] },
            { id: 2, label: "Uses incrementAndGet()", hint: "downloads.incrementAndGet()", keywords: [{ pattern: "incrementAndGet\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Creates 10 threads", hint: "new Thread[10]", keywords: [{ pattern: "Thread\\[10\\]" }] },
            { id: 4, label: "Prints Total downloads: 1000", hint: "System.out.println(\"Total downloads: \" + downloads.get())", keywords: [{ pattern: "Total downloads:" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — ExecutorService
  // ─────────────────────────────────────────────────────────────
  {
    id: "executor-service",
    title: "ExecutorService",
    icon: "⚙️",
    color: "#22c55e",
    lessons: [
      {
        id: "mt-5",
        title: "Thread Pools",
        xp: 25,
        theory: [
          text(
            "Creating a new thread for every task is expensive. A **thread pool** maintains a set of reusable threads. `ExecutorService` manages thread pools — submit tasks, it handles scheduling and reuse.",
            {
              label: "ExecutorService basics",
              content: `import java.util.concurrent.*;

// Fixed pool of 4 threads
ExecutorService pool = Executors.newFixedThreadPool(4);

// Submit 10 tasks — pool reuses 4 threads to run them all
for (int i = 0; i < 10; i++) {
    int taskId = i;
    pool.submit(() -> {
        System.out.println("Task " + taskId + " on "
            + Thread.currentThread().getName());
    });
}

pool.shutdown();                          // no new tasks
pool.awaitTermination(5, TimeUnit.SECONDS); // wait for all to finish
System.out.println("All tasks done.");`,
            },
          ),
          diagram("Thread Pool Types", [
            {
              id: "fixed",
              label: "newFixedThreadPool(n)",
              color: "#22c55e",
              items: ["Fixed number of threads", "Best for CPU-bound tasks", "Most commonly used"],
            },
            {
              id: "cached",
              label: "newCachedThreadPool()",
              color: ACCENT,
              items: ["Creates threads as needed", "Reuses idle threads", "Best for many short tasks"],
            },
            {
              id: "single",
              label: "newSingleThreadExecutor()",
              color: "#f59e0b",
              items: ["Only 1 thread", "Tasks run sequentially", "Good for ordered execution"],
            },
          ]),
          quiz(
            "What happens after you call pool.shutdown()?",
            [
              "All running tasks are cancelled",
              "No new tasks accepted, existing tasks complete",
              "The pool immediately terminates",
              "Threads are destroyed instantly",
            ],
            1,
            "shutdown() stops accepting new tasks but lets submitted tasks complete. Use shutdownNow() to forcefully cancel running tasks.",
          ),
        ],
        challenge: {
          title: "Parallel Task Runner",
          description: [
            { type: "text", content: "Create a fixed thread pool of 3 threads. Submit 6 tasks, each printing 'Task X done'. Shutdown and await termination. Print 'All complete'." },
            { type: "expected", label: "Expected output (order may vary)", content: `Task 0 done\nTask 1 done\n...\nAll complete` },
          ],
          starterCode: `import java.util.concurrent.*;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        // Create fixed thread pool of 3
        // Submit 6 tasks each printing "Task X done"
        // Shutdown and await termination
        // Print "All complete"

    }
}`,
          solutionCode: `import java.util.concurrent.*;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        for (int i = 0; i < 6; i++) {
            int taskId = i;
            pool.submit(() -> System.out.println("Task " + taskId + " done"));
        }

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("All complete");
    }
}`,
          tests: [
            { id: 1, label: "Uses newFixedThreadPool(3)", hint: "Executors.newFixedThreadPool(3)", keywords: [{ pattern: "newFixedThreadPool\\s*\\(\\s*3\\s*\\)" }] },
            { id: 2, label: "Submits 6 tasks", hint: "pool.submit(...) six times or in a loop", keywords: [{ pattern: "pool\\.submit" }] },
            { id: 3, label: "Calls shutdown()", hint: "pool.shutdown()", keywords: [{ pattern: "pool\\.shutdown\\s*\\(\\s*\\)" }] },
            { id: 4, label: "Prints 'All complete'", hint: "System.out.println(\"All complete\")", keywords: [{ pattern: "All complete" }] },
          ],
        },
      },
      {
        id: "mt-6",
        title: "Future and Callable",
        xp: 25,
        theory: [
          text(
            "`Callable<T>` is like `Runnable` but returns a value and can throw exceptions. `Future<T>` holds the eventual result — you can get it with `future.get()` which blocks until the task completes.",
            {
              label: "Callable and Future",
              content: `import java.util.concurrent.*;

ExecutorService pool = Executors.newFixedThreadPool(2);

// Submit a Callable — returns a value
Callable<Integer> task = () -> {
    Thread.sleep(500);
    return 42;
};

Future<Integer> future = pool.submit(task);

System.out.println("Task submitted, doing other work...");

// get() blocks until result is ready
int result = future.get();
System.out.println("Result: " + result); // Result: 42

pool.shutdown();`,
            },
          ),
          text("You can submit multiple Callables and collect all their results.",
            {
              label: "Multiple futures",
              content: `List<Future<Integer>> futures = new ArrayList<>();
for (int i = 1; i <= 5; i++) {
    int n = i;
    futures.add(pool.submit(() -> n * n));  // square each number
}

for (Future<Integer> f : futures) {
    System.out.print(f.get() + " ");  // 1 4 9 16 25
}`,
            },
          ),
          quiz(
            "What does future.get() do if the task hasn't finished yet?",
            ["Returns null", "Throws an exception", "Blocks until the task completes", "Cancels the task"],
            2,
            "future.get() blocks the calling thread until the task finishes and the result is available. Use get(timeout, unit) to avoid blocking forever.",
          ),
        ],
        challenge: {
          title: "Parallel Sum",
          description: [
            { type: "text", content: "Use 3 Callables to compute squares of 3, 4, and 5 in parallel. Collect the Future results and print their sum." },
            { type: "expected", label: "Expected output", content: "Sum of squares: 50" },
          ],
          starterCode: `import java.util.concurrent.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        // Submit Callables to compute 3*3, 4*4, 5*5
        // Collect futures, sum results, print "Sum of squares: X"

        pool.shutdown();
    }
}`,
          solutionCode: `import java.util.concurrent.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        List<Future<Integer>> futures = new ArrayList<>();
        for (int n : new int[]{3, 4, 5}) {
            int num = n;
            futures.add(pool.submit(() -> num * num));
        }

        int sum = 0;
        for (Future<Integer> f : futures) sum += f.get();
        System.out.println("Sum of squares: " + sum);

        pool.shutdown();
    }
}`,
          tests: [
            { id: 1, label: "Uses Callable / pool.submit", hint: "pool.submit(() -> num * num)", keywords: [{ pattern: "pool\\.submit" }] },
            { id: 2, label: "Uses Future.get() to collect results", hint: "f.get()", keywords: [{ pattern: "\\.get\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Prints Sum of squares: 50", hint: "System.out.println(\"Sum of squares: \" + sum)", keywords: [{ pattern: "Sum of squares:" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Concurrent Collections & Patterns
  // ─────────────────────────────────────────────────────────────
  {
    id: "concurrent-patterns",
    title: "Concurrent Collections & Patterns",
    icon: "📊",
    color: "#f59e0b",
    lessons: [
      {
        id: "mt-7",
        title: "ConcurrentHashMap",
        xp: 25,
        theory: [
          text(
            "`ConcurrentHashMap` is a thread-safe HashMap. Unlike `HashMap` (not thread-safe) or wrapping with `Collections.synchronizedMap()` (slow), `ConcurrentHashMap` uses fine-grained locking — multiple threads can read and write simultaneously to different segments.",
            {
              label: "ConcurrentHashMap",
              content: `import java.util.concurrent.*;

ConcurrentHashMap<String, Integer> scores = new ConcurrentHashMap<>();

// Thread-safe operations
scores.put("Alice", 100);
scores.putIfAbsent("Bob", 85);
scores.computeIfAbsent("Charlie", k -> 90);

// Atomic update — thread-safe increment
scores.merge("Alice", 10, Integer::sum);  // Alice: 100 + 10 = 110

// Thread-safe iteration
scores.forEach((name, score) ->
    System.out.println(name + ": " + score));`,
            },
          ),
          callout("tip", "Use ConcurrentHashMap whenever multiple threads read/write a Map. Never use HashMap across threads — it can corrupt its internal structure and cause infinite loops on reads."),
          quiz(
            "Why is ConcurrentHashMap faster than Collections.synchronizedMap()?",
            [
              "ConcurrentHashMap uses less memory",
              "ConcurrentHashMap allows multiple threads to write to different segments simultaneously",
              "synchronizedMap() doesn't work",
              "ConcurrentHashMap doesn't support null values",
            ],
            1,
            "ConcurrentHashMap uses segment-level locking — different threads can modify different buckets simultaneously. synchronizedMap() locks the entire map for every operation.",
          ),
        ],
        challenge: {
          title: "Word Frequency Counter",
          description: [
            { type: "text", content: "Use ConcurrentHashMap to count word frequencies. Split the words across 3 threads, each counting their portion. Merge results and print each word's count." },
            { type: "expected", label: "Expected output (order may vary)", content: `the: 3\ncat: 2\nsat: 1\non: 1\nmat: 1` },
          ],
          starterCode: `import java.util.concurrent.*;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        String[] words = {"the","cat","sat","on","the","mat","the","cat"};
        ConcurrentHashMap<String, Integer> freq = new ConcurrentHashMap<>();

        // Use threads to count (for simplicity, count all in one thread here
        // but use ConcurrentHashMap.merge for thread-safety)
        Thread t = new Thread(() -> {
            for (String word : words) {
                freq.merge(word, 1, Integer::sum);
            }
        });

        t.start();
        t.join();

        freq.forEach((word, count) -> System.out.println(word + ": " + count));
    }
}`,
          solutionCode: `import java.util.concurrent.*;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        String[] words = {"the","cat","sat","on","the","mat","the","cat"};
        ConcurrentHashMap<String, Integer> freq = new ConcurrentHashMap<>();

        Thread t = new Thread(() -> {
            for (String word : words) {
                freq.merge(word, 1, Integer::sum);
            }
        });

        t.start();
        t.join();

        freq.forEach((word, count) -> System.out.println(word + ": " + count));
    }
}`,
          tests: [
            { id: 1, label: "Uses ConcurrentHashMap", hint: "new ConcurrentHashMap<>()", keywords: [{ pattern: "ConcurrentHashMap" }] },
            { id: 2, label: "Uses merge() for counting", hint: "freq.merge(word, 1, Integer::sum)", keywords: [{ pattern: "\\.merge\\s*\\(" }] },
            { id: 3, label: "Prints word counts", hint: "freq.forEach((word, count) -> ...)", keywords: [{ pattern: "forEach" }] },
          ],
        },
      },
      {
        id: "mt-8",
        title: "BlockingQueue",
        xp: 30,
        theory: [
          text(
            "`BlockingQueue` is a thread-safe queue that blocks when trying to take from an empty queue or put to a full one. It's the foundation of the **Producer-Consumer pattern** — one thread produces work, another consumes it.",
            {
              label: "Producer-Consumer with BlockingQueue",
              content: `import java.util.concurrent.*;

BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(10); // capacity 10

// Producer thread
Thread producer = new Thread(() -> {
    try {
        for (int i = 1; i <= 5; i++) {
            queue.put(i);   // blocks if queue is full
            System.out.println("Produced: " + i);
        }
        queue.put(-1);   // sentinel to signal done
    } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
});

// Consumer thread
Thread consumer = new Thread(() -> {
    try {
        while (true) {
            int item = queue.take();  // blocks if queue is empty
            if (item == -1) break;   // done
            System.out.println("Consumed: " + item);
        }
    } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
});

producer.start(); consumer.start();
producer.join();  consumer.join();`,
            },
          ),
          callout("info", "BlockingQueue eliminates the need for manual wait/notify synchronization in producer-consumer scenarios. It's cleaner, safer, and easier to understand."),
          quiz(
            "What happens when you call take() on an empty BlockingQueue?",
            [
              "Returns null",
              "Throws NoSuchElementException",
              "Blocks until an element is available",
              "Returns a default value",
            ],
            2,
            "take() blocks the calling thread until an element becomes available. This makes it perfect for consumer threads that wait for work.",
          ),
        ],
        challenge: {
          title: "Print Queue",
          description: [
            { type: "text", content: "Simulate a print queue. Producer adds 'Document 1' through 'Document 3' to a BlockingQueue. Consumer takes and prints each one. Use -1 sentinel to signal done." },
            { type: "expected", label: "Expected output", content: `Printing: Document 1\nPrinting: Document 2\nPrinting: Document 3` },
          ],
          starterCode: `import java.util.concurrent.*;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(10);

        Thread producer = new Thread(() -> {
            try {
                // Add Document 1, 2, 3 then "DONE" sentinel

            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        Thread consumer = new Thread(() -> {
            try {
                // Take and print each document until "DONE"

            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        producer.start();
        consumer.start();
        producer.join();
        consumer.join();
    }
}`,
          solutionCode: `import java.util.concurrent.*;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(10);

        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 3; i++) queue.put("Document " + i);
                queue.put("DONE");
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        Thread consumer = new Thread(() -> {
            try {
                while (true) {
                    String doc = queue.take();
                    if (doc.equals("DONE")) break;
                    System.out.println("Printing: " + doc);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        producer.start();
        consumer.start();
        producer.join();
        consumer.join();
    }
}`,
          tests: [
            { id: 1, label: "Uses BlockingQueue", hint: "new ArrayBlockingQueue<>(10)", keywords: [{ pattern: "BlockingQueue|ArrayBlockingQueue" }] },
            { id: 2, label: "Producer uses put()", hint: "queue.put(...)", keywords: [{ pattern: "queue\\.put\\s*\\(" }] },
            { id: 3, label: "Consumer uses take()", hint: "queue.take()", keywords: [{ pattern: "queue\\.take\\s*\\(\\s*\\)" }] },
            { id: 4, label: "Prints 'Printing: Document X'", hint: "System.out.println(\"Printing: \" + doc)", keywords: [{ pattern: "Printing:" }] },
          ],
        },
      },
      {
        id: "mt-9",
        title: "CompletableFuture",
        xp: 30,
        theory: [
          text(
            "`CompletableFuture` (Java 8+) is the modern way to write asynchronous code in Java. It lets you chain operations, combine results, and handle errors — all without blocking.",
            {
              label: "CompletableFuture basics",
              content: `import java.util.concurrent.*;

// Run async, transform result, handle error
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> {
        return "Hello";               // runs on a background thread
    })
    .thenApply(s -> s + ", World!")  // transform result
    .thenApply(String::toUpperCase); // another transform

System.out.println(future.get());   // HELLO, WORLD!

// Combine two futures
CompletableFuture<Integer> f1 = CompletableFuture.supplyAsync(() -> 10);
CompletableFuture<Integer> f2 = CompletableFuture.supplyAsync(() -> 20);

CompletableFuture<Integer> sum = f1.thenCombine(f2, (a, b) -> a + b);
System.out.println(sum.get()); // 30`,
            },
          ),
          text("Handle errors with `exceptionally()` — like a catch block for async operations.",
            {
              label: "Error handling",
              content: `CompletableFuture<Integer> safe = CompletableFuture
    .supplyAsync(() -> Integer.parseInt("abc"))  // throws!
    .exceptionally(ex -> {
        System.out.println("Error: " + ex.getMessage());
        return -1;  // fallback value
    });

System.out.println(safe.get()); // -1`,
            },
          ),
          quiz(
            "What does thenApply() do in a CompletableFuture chain?",
            [
              "Runs the task on a new thread",
              "Transforms the result when the previous stage completes",
              "Waits for the future to complete",
              "Handles exceptions",
            ],
            1,
            "thenApply() transforms the result of the previous stage when it completes — similar to map() in streams.",
          ),
        ],
        challenge: {
          title: "Async Pipeline",
          description: [
            { type: "text", content: "Use CompletableFuture.supplyAsync to start with the number 5. Chain thenApply to multiply by 3 (=15), then another thenApply to add 5 (=20). Print the final result." },
            { type: "expected", label: "Expected output", content: "Result: 20" },
          ],
          starterCode: `import java.util.concurrent.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        // Start with 5, multiply by 3, add 5, print result

    }
}`,
          solutionCode: `import java.util.concurrent.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        CompletableFuture<Integer> result = CompletableFuture
            .supplyAsync(() -> 5)
            .thenApply(n -> n * 3)
            .thenApply(n -> n + 5);

        System.out.println("Result: " + result.get());
    }
}`,
          tests: [
            { id: 1, label: "Uses CompletableFuture.supplyAsync", hint: "CompletableFuture.supplyAsync(() -> 5)", keywords: [{ pattern: "supplyAsync" }] },
            { id: 2, label: "Chains thenApply twice", hint: ".thenApply(n -> n * 3).thenApply(n -> n + 5)", keywords: [{ pattern: "thenApply" }] },
            { id: 3, label: "Prints Result: 20", hint: "System.out.println(\"Result: \" + result.get())", keywords: [{ pattern: "Result:" }] },
          ],
        },
      },
      {
        id: "mt-10",
        title: "Deadlocks",
        xp: 25,
        theory: [
          text(
            "A **deadlock** occurs when two or more threads are each waiting for a lock held by the other — creating a circular dependency where neither can proceed.",
            {
              label: "Deadlock example",
              content: `Object lockA = new Object();
Object lockB = new Object();

Thread t1 = new Thread(() -> {
    synchronized (lockA) {
        System.out.println("T1: holds A, waiting for B");
        synchronized (lockB) { System.out.println("T1: holds both"); }
    }
});

Thread t2 = new Thread(() -> {
    synchronized (lockB) {   // ← acquires B first (opposite order to T1!)
        System.out.println("T2: holds B, waiting for A");
        synchronized (lockA) { System.out.println("T2: holds both"); }
    }
});

// T1 holds A, waits for B
// T2 holds B, waits for A
// → DEADLOCK — both wait forever`,
            },
          ),
          text("**Prevention:** Always acquire locks in the same order across all threads.",
            {
              label: "Deadlock prevention",
              content: `// ✅ Both threads acquire in same order: A then B
Thread t1 = new Thread(() -> {
    synchronized (lockA) { synchronized (lockB) { /* work */ } }
});
Thread t2 = new Thread(() -> {
    synchronized (lockA) { synchronized (lockB) { /* work */ } }
});
// No deadlock — t2 waits for A, gets it when t1 releases`,
            },
          ),
          quiz(
            "What is the simplest way to prevent deadlocks?",
            [
              "Use more threads",
              "Always acquire multiple locks in the same order",
              "Never use synchronized",
              "Use sleep() between lock acquisitions",
            ],
            1,
            "Consistent lock ordering prevents circular wait — the key condition for deadlock. If all threads always acquire locks A then B, no circular dependency can form.",
          ),
        ],
        challenge: {
          title: "Deadlock-Free Transfer",
          description: [
            { type: "text", content: "Create two BankAccounts with synchronized transfer(). Prevent deadlock by always locking the account with the lower id first. Transfer $100 from account 1 to 2 and $50 from 2 to 1 concurrently." },
            { type: "expected", label: "Expected output (order may vary)", content: `Transferred 100.0 from 1 to 2\nTransferred 50.0 from 2 to 1` },
          ],
          starterCode: `public class Solution {
    static class BankAccount {
        final int id;
        double balance;

        BankAccount(int id, double balance) {
            this.id = id;
            this.balance = balance;
        }

        static void transfer(BankAccount from, BankAccount to, double amount) {
            // Lock in consistent order (lower id first) to prevent deadlock
            BankAccount first  = from.id < to.id ? from : to;
            BankAccount second = from.id < to.id ? to : from;

            synchronized (first) {
                synchronized (second) {
                    from.balance -= amount;
                    to.balance   += amount;
                    System.out.printf("Transferred %.1f from %d to %d%n",
                        amount, from.id, to.id);
                }
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        BankAccount a1 = new BankAccount(1, 1000);
        BankAccount a2 = new BankAccount(2, 1000);

        Thread t1 = new Thread(() -> BankAccount.transfer(a1, a2, 100));
        Thread t2 = new Thread(() -> BankAccount.transfer(a2, a1, 50));

        t1.start(); t2.start();
        t1.join();  t2.join();
    }
}`,
          solutionCode: `public class Solution {
    static class BankAccount {
        final int id;
        double balance;

        BankAccount(int id, double balance) {
            this.id = id;
            this.balance = balance;
        }

        static void transfer(BankAccount from, BankAccount to, double amount) {
            BankAccount first  = from.id < to.id ? from : to;
            BankAccount second = from.id < to.id ? to : from;

            synchronized (first) {
                synchronized (second) {
                    from.balance -= amount;
                    to.balance   += amount;
                    System.out.printf("Transferred %.1f from %d to %d%n",
                        amount, from.id, to.id);
                }
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        BankAccount a1 = new BankAccount(1, 1000);
        BankAccount a2 = new BankAccount(2, 1000);

        Thread t1 = new Thread(() -> BankAccount.transfer(a1, a2, 100));
        Thread t2 = new Thread(() -> BankAccount.transfer(a2, a1, 50));

        t1.start(); t2.start();
        t1.join();  t2.join();
    }
}`,
          tests: [
            { id: 1, label: "Uses consistent lock order", hint: "BankAccount first = from.id < to.id ? from : to", keywords: [{ pattern: "from\\.id.*to\\.id|to\\.id.*from\\.id" }] },
            { id: 2, label: "Nested synchronized blocks", hint: "synchronized (first) { synchronized (second) { ... } }", keywords: [{ pattern: "synchronized.*synchronized" }] },
            { id: 3, label: "Prints transfer details", hint: "System.out.printf(\"Transferred ...\")", keywords: [{ pattern: "Transferred" }] },
          ],
        },
      },
      {
        id: "mt-11",
        title: "Multithreading Best Practices",
        xp: 20,
        theory: [
          text(
            "Multithreaded code is hard to get right. These best practices save hours of debugging.",
            {
              label: "Golden rules",
              content: `// 1. Prefer immutable objects — no shared state, no races
record Point(int x, int y) {}  // records are immutable

// 2. Use java.util.concurrent instead of raw synchronized
ExecutorService pool = Executors.newFixedThreadPool(4);
AtomicInteger counter = new AtomicInteger();
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// 3. Minimize scope of synchronized blocks
public void update(int value) {
    // Do computation OUTSIDE the lock
    int newValue = computeExpensive(value);
    // Lock only for the write
    synchronized (this) { this.state = newValue; }
}

// 4. Never call unknown methods while holding a lock
// 5. Document thread-safety guarantees in Javadoc
// 6. Test with stress tests — race conditions are rare under light load`,
            },
          ),
          callout("tip", "The best way to avoid threading bugs is to minimize shared mutable state. Each thread should work on its own data and only communicate results through thread-safe mechanisms."),
          quiz(
            "What is the most effective way to avoid threading bugs?",
            [
              "Use more synchronized blocks",
              "Use only one thread",
              "Minimize shared mutable state",
              "Always use volatile",
            ],
            2,
            "Minimizing shared mutable state reduces the places where threads can interfere with each other. Immutable objects, thread-local data, and message passing are all strategies for this.",
          ),
        ],
        challenge: {
          title: "Thread-Safe Statistics",
          description: [
            { type: "text", content: "Use AtomicInteger and ConcurrentHashMap to collect statistics from 3 threads. Each thread processes 5 numbers, tracking count and per-thread totals. Print final count and combined total." },
            { type: "expected", label: "Expected output", content: `Total count: 15\nCombined total: 225` },
          ],
          starterCode: `import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger totalCount = new AtomicInteger(0);
        ConcurrentHashMap<String, Integer> threadTotals = new ConcurrentHashMap<>();

        Thread[] threads = new Thread[3];
        for (int t = 0; t < 3; t++) {
            int threadId = t;
            threads[t] = new Thread(() -> {
                int sum = 0;
                for (int i = 1; i <= 5; i++) {
                    sum += (threadId * 5 + i); // values 1-5, 6-10, 11-15
                    totalCount.incrementAndGet();
                }
                threadTotals.put("thread-" + threadId, sum);
            });
            threads[t].start();
        }

        for (Thread t : threads) t.join();

        int combined = threadTotals.values().stream().mapToInt(Integer::intValue).sum();
        System.out.println("Total count: " + totalCount.get());
        System.out.println("Combined total: " + combined);
    }
}`,
          solutionCode: `import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

public class Solution {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger totalCount = new AtomicInteger(0);
        ConcurrentHashMap<String, Integer> threadTotals = new ConcurrentHashMap<>();

        Thread[] threads = new Thread[3];
        for (int t = 0; t < 3; t++) {
            int threadId = t;
            threads[t] = new Thread(() -> {
                int sum = 0;
                for (int i = 1; i <= 5; i++) {
                    sum += (threadId * 5 + i);
                    totalCount.incrementAndGet();
                }
                threadTotals.put("thread-" + threadId, sum);
            });
            threads[t].start();
        }

        for (Thread t : threads) t.join();

        int combined = threadTotals.values().stream().mapToInt(Integer::intValue).sum();
        System.out.println("Total count: " + totalCount.get());
        System.out.println("Combined total: " + combined);
    }
}`,
          tests: [
            { id: 1, label: "Uses AtomicInteger", hint: "new AtomicInteger(0)", keywords: [{ pattern: "AtomicInteger" }] },
            { id: 2, label: "Uses ConcurrentHashMap", hint: "new ConcurrentHashMap<>()", keywords: [{ pattern: "ConcurrentHashMap" }] },
            { id: 3, label: "Prints Total count: 15", hint: "System.out.println(\"Total count: \" + totalCount.get())", keywords: [{ pattern: "Total count:" }] },
            { id: 4, label: "Prints Combined total: 225", hint: "System.out.println(\"Combined total: \" + combined)", keywords: [{ pattern: "Combined total:" }] },
          ],
        },
      },
    ],
  },
];

export const JAVA_MULTITHREADING_LESSONS = JAVA_MULTITHREADING_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const JAVA_MULTITHREADING_TOTAL_XP = JAVA_MULTITHREADING_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
