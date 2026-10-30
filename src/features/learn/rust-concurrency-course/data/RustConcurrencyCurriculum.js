// PolyCode — Rust Concurrency interactive course
// 6 chapters · 18 lessons
// All Rust code samples were compiled and run with rustc 1.75 / cargo (edition 2021).
// Tokio and futures examples were compiled against real crates.io dependencies to confirm correctness.

const ACCENT = "#ce422b"; // Rust orange

const RAW_RUST_CONCURRENCY_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Concurrency Foundations
  // ─────────────────────────────────────────────────────────────
  {
    id: "concurrency-foundations",
    title: "Concurrency Foundations",
    icon: "🧵",
    color: ACCENT,
    lessons: [
      {
        id: "rc-0",
        title: "Why Concurrency in Rust?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Rust markets itself as offering **fearless concurrency**: the same ownership and borrowing rules that prevent memory bugs at compile time also prevent **data races** — two threads accessing the same memory at the same time, with at least one write, and no synchronization. Most concurrency bugs in C/C++ become compile errors in Rust instead of runtime crashes.",
          },
          {
            type: "diagram",
            title: "What ownership buys you in threads",
            nodes: [
              { id: "datarace", label: "Data races", color: ACCENT, items: ["Caught at compile time", "Ownership rules apply across threads too"] },
              { id: "sharing", label: "Safe sharing", color: "#2563eb", items: ["Arc<T> for shared ownership", "Mutex<T> / RwLock<T> for synchronized access"] },
              { id: "sendsync", label: "Send + Sync traits", color: "#7c3aed", items: ["Compiler tracks which types are thread-safe", "Non-thread-safe types simply won't compile across threads"] },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This course assumes you're comfortable with ownership, borrowing, structs, and Result from the Rust Fundamentals course — concurrency in Rust builds directly on top of those rules rather than replacing them.",
          },
          {
            type: "quiz",
            question: "What is a 'data race', precisely?",
            options: [
              "Any time two threads run at once",
              "Two or more threads accessing the same memory location concurrently, with at least one write and no synchronization",
              "A thread that runs slower than expected",
              "A deadlock between two mutexes",
            ],
            answer: 1,
            explanation:
              "A data race specifically requires concurrent access, at least one write, and no synchronization mechanism coordinating the accesses. Rust's type system is designed to make this pattern fail to compile.",
          },
        ],
        challenge: {
          title: "Spot the Shared State",
          description:
            "Write a comment-only sketch (as a string) describing, in your own words, one risk of two threads writing to the same variable without synchronization. Store it in a variable `risk` and print it.",
          starterCode: `fn main() {
    let risk = "";
    println!("{}", risk);
}
`,
          solutionCode: `fn main() {
    let risk = "Two threads writing to the same variable without synchronization can corrupt the value or produce undefined behavior.";
    println!("{}", risk);
}`,
          tests: [
            { id: 1, label: "Declares a risk variable", keywords: [{ pattern: "let\\s+risk" }] },
            { id: 2, label: "Non-empty description", keywords: [{ pattern: "risk\\s*=\\s*\"..+\"" }] },
            { id: 3, label: "Prints the value", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rc-1",
        title: "Threads with std::thread",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`thread::spawn` takes a closure and runs it on a new OS thread, returning a `JoinHandle`. Calling `.join()` on the handle blocks the current thread until the spawned thread finishes. Without `join`, the program might exit before the spawned thread completes its work.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Spawning and joining threads",
            content: `use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..5 {
            println!("spawned thread: count {}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..3 {
        println!("main thread: count {}", i);
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();

    let v = vec![1, 2, 3];
    let handle2 = thread::spawn(move || {
        println!("vector in thread: {:?}", v);
    });
    handle2.join().unwrap();
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "The `move` keyword forces the closure to take ownership of `v` instead of borrowing it. This is required for anything captured by a spawned thread's closure, because the compiler can't guarantee the borrowed data will outlive the new thread otherwise.",
          },
          {
            type: "quiz",
            question: "Why does `thread::spawn(move || ...)` usually require the `move` keyword?",
            options: [
              "It's optional stylistic preference",
              "Because the new thread might outlive the current stack frame, so captured references could dangle — move transfers ownership instead",
              "It makes the thread run faster",
              "It's required only for numeric captures",
            ],
            answer: 1,
            explanation:
              "Without `move`, the closure would try to borrow variables from the enclosing scope, but the compiler can't prove those borrows stay valid for as long as the spawned thread might run. `move` sidesteps this by transferring ownership into the closure.",
          },
        ],
        challenge: {
          title: "Sum in a Thread",
          description:
            "Spawn a thread that computes the sum of a Vec<i32> moved into it, and use `.join().unwrap()` to get the result back into main, then print it.",
          starterCode: `use std::thread;

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    // spawn a thread that sums numbers, join it, print the result
}
`,
          solutionCode: `use std::thread;

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let handle = thread::spawn(move || {
        numbers.iter().sum::<i32>()
    });
    let total = handle.join().unwrap();
    println!("{}", total);
}`,
          tests: [
            { id: 1, label: "Uses thread::spawn", keywords: [{ pattern: "thread::spawn" }] },
            { id: 2, label: "Moves numbers into the closure", keywords: [{ pattern: "move\\s*\\|\\|" }] },
            { id: 3, label: "Joins and unwraps the handle", keywords: [{ pattern: "\\.join\\(\\)\\.unwrap\\(\\)" }] },
          ],
        },
      },
      {
        id: "rc-2",
        title: "Closures Capturing Data",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Closures can capture their environment three ways: by reference (`&T`), by mutable reference (`&mut T`), or by value/move (`T`). For threads, `move` closures are almost always required since spawned threads may outlive the function that created them.",
          },
          {
            type: "code",
            lang: "rust",
            label: "move closures capture by value",
            content: `fn main() {
    let data = vec!["alpha", "beta", "gamma"];

    let printer = move || {
        for item in &data {
            println!("{}", item);
        }
    };
    printer();
    // data is now owned by printer; using it here would be a compile error
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "You can still borrow *inside* a move closure — note `for item in &data` borrows from the moved copy. `move` decides how the closure captures the outer variable, not how the closure body uses it internally.",
          },
          {
            type: "quiz",
            question: "What does the `move` keyword change about a closure?",
            options: [
              "It makes the closure asynchronous",
              "It forces the closure to take ownership of the variables it captures, rather than borrowing them",
              "It prevents the closure from being called more than once",
              "It only applies to numeric types",
            ],
            answer: 1,
            explanation:
              "`move` changes the *capture mode*: instead of borrowing captured variables, the closure takes ownership of them (moving or copying them in), which is essential when the closure might run after the original scope ends, like inside a spawned thread.",
          },
        ],
        challenge: {
          title: "Move Closure Greeting",
          description:
            "Create a String `name`, then a move closure `greet` that captures it and prints \"Hello, NAME\". Call the closure once.",
          starterCode: `fn main() {
    let name = String::from("Maryam");
    // create a move closure that prints a greeting using name
    // call it
}
`,
          solutionCode: `fn main() {
    let name = String::from("Maryam");
    let greet = move || {
        println!("Hello, {}", name);
    };
    greet();
}`,
          tests: [
            { id: 1, label: "Uses a move closure", keywords: [{ pattern: "move\\s*\\|\\|" }] },
            { id: 2, label: "Captures name", keywords: [{ pattern: "name" }] },
            { id: 3, label: "Calls the closure", keywords: [{ pattern: "greet\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Message Passing
  // ─────────────────────────────────────────────────────────────
  {
    id: "message-passing",
    title: "Message Passing",
    icon: "📨",
    color: "#2563eb",
    lessons: [
      {
        id: "rc-3",
        title: "Channels with mpsc",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Rust's standard library provides **mpsc** (multiple producer, single consumer) channels for message passing. `mpsc::channel()` returns a `(Sender, Receiver)` pair. Sending a value **moves** it through the channel — the sender no longer owns it, which prevents the classic bug of two threads both trying to use the same data.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Sending values between threads",
            content: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec!["hi", "from", "the", "thread"];
        for val in vals {
            tx.send(val.to_string()).unwrap();
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Iterating directly over `rx` (`for received in rx`) blocks and receives values until every `Sender` clone has been dropped and the channel is empty — a clean way to drain a channel without manually checking for closure.",
          },
          {
            type: "quiz",
            question: "What does 'mpsc' stand for, and what does it imply about receivers?",
            options: [
              "Multiple producer, single consumer — only one Receiver is allowed",
              "Multi-process shared channel — works across separate programs",
              "Mutable pointer, single copy — a memory safety guarantee",
              "Message parsing, single core — an optimization hint",
            ],
            answer: 0,
            explanation:
              "mpsc channels support many Sender clones (multiple producers) but only a single Receiver (single consumer) — if you need multiple consumers, you'd reach for a crate like crossbeam-channel instead.",
          },
        ],
        challenge: {
          title: "Send Numbers Through a Channel",
          description:
            "Create an mpsc channel. Spawn a thread that sends the numbers 1 through 5 (as i32) through the sender. In main, receive and print each value using a for loop over the receiver.",
          starterCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    // spawn a thread sending 1..=5 through tx
    // receive and print each value in main
}
`,
          solutionCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        for i in 1..=5 {
            tx.send(i).unwrap();
        }
    });

    for received in rx {
        println!("{}", received);
    }
}`,
          tests: [
            { id: 1, label: "Creates an mpsc channel", keywords: [{ pattern: "mpsc::channel" }] },
            { id: 2, label: "Sends values in a spawned thread", keywords: [{ pattern: "tx\\.send" }] },
            { id: 3, label: "Receives via a for loop over rx", keywords: [{ pattern: "for\\s+received\\s+in\\s+rx" }] },
          ],
        },
      },
      {
        id: "rc-4",
        title: "Multiple Producers",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Cloning a `Sender` (`tx.clone()`) lets multiple threads send into the same channel — this is where the 'multiple producer' half of mpsc comes from. The `Receiver` sees values from every cloned sender, interleaved in whatever order they arrive.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Cloning senders for multiple producers",
            content: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    let tx2 = tx.clone();

    thread::spawn(move || {
        tx.send(1).unwrap();
    });
    thread::spawn(move || {
        tx2.send(2).unwrap();
    });

    let mut sum = 0;
    for _ in 0..2 {
        sum += rx.recv().unwrap();
    }
    println!("sum = {}", sum);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`rx.recv()` blocks until a value arrives or every sender (including all clones) is dropped, in which case it returns an `Err`. If you're waiting for a known number of messages, `.recv().unwrap()` in a bounded loop (as above) is simpler than iterating the whole channel.",
          },
          {
            type: "quiz",
            question: "How do you allow multiple threads to send into the same mpsc channel?",
            options: [
              "Create a separate channel per thread and merge them manually",
              "Clone the Sender with .clone() and move a clone into each thread",
              "mpsc channels support this automatically without cloning",
              "Use a Mutex around the Sender",
            ],
            answer: 1,
            explanation:
              "`Sender<T>` implements `Clone`. Each clone can be moved into a different thread; internally they all still feed the same underlying queue that the single Receiver drains.",
          },
        ],
        challenge: {
          title: "Three Producers",
          description:
            "Create a channel, clone the sender twice (three total senders), spawn three threads each sending a different string, then receive and print all three messages in main using three `.recv()` calls.",
          starterCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    // clone tx as needed, spawn 3 threads sending different strings
    // receive and print all 3 messages
}
`,
          solutionCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    let tx2 = tx.clone();
    let tx3 = tx.clone();

    thread::spawn(move || { tx.send("one".to_string()).unwrap(); });
    thread::spawn(move || { tx2.send("two".to_string()).unwrap(); });
    thread::spawn(move || { tx3.send("three".to_string()).unwrap(); });

    for _ in 0..3 {
        println!("{}", rx.recv().unwrap());
    }
}`,
          tests: [
            { id: 1, label: "Clones the sender", keywords: [{ pattern: "tx\\.clone\\s*\\(\\s*\\)" }] },
            { id: 2, label: "Spawns three threads", keywords: [{ pattern: "thread::spawn" }] },
            { id: 3, label: "Receives with .recv()", keywords: [{ pattern: "\\.recv\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "rc-5",
        title: "Channel Design Patterns",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Channels are a great fit for a **worker pool** pattern: spawn N worker threads that each own a clone of the receiver end... except std's `Receiver` cannot be cloned directly. The common trick is to wrap it in `Arc<Mutex<Receiver<T>>>` so multiple workers can share access, taking turns locking it to pull the next job.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Shared receiver via Arc<Mutex<Receiver<T>>>",
            content: `use std::sync::{mpsc, Arc, Mutex};
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel::<i32>();
    let rx = Arc::new(Mutex::new(rx));

    for id in 0..3 {
        let rx = Arc::clone(&rx);
        thread::spawn(move || {
            // Each worker locks the receiver to grab the next job, if any.
            while let Ok(job) = rx.lock().unwrap().recv() {
                println!("worker {} processed job {}", id, job);
            }
        });
    }

    for job in 0..5 {
        tx.send(job).unwrap();
    }
    drop(tx); // closing the channel lets workers' loops end
    thread::sleep(std::time::Duration::from_millis(20));
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`drop(tx)` explicitly ends the sending side. Once every Sender is dropped, `rx.recv()` returns `Err`, which naturally ends each worker's `while let Ok(...)` loop — a clean shutdown signal for free.",
          },
          {
            type: "quiz",
            question: "Why is std's Receiver wrapped in Arc<Mutex<...>> for a worker-pool pattern?",
            options: [
              "Because Receiver can be cloned directly, and Arc<Mutex<>> makes it faster",
              "Because Receiver isn't cloneable, so Arc<Mutex<>> lets multiple threads share and take turns using the single receiver",
              "Because Mutex is required by mpsc::channel()",
              "It isn't necessary; any thread can hold its own Receiver clone",
            ],
            answer: 1,
            explanation:
              "std::sync::mpsc::Receiver has no Clone implementation, since only one consumer is meant to exist. Arc<Mutex<Receiver>> lets several worker threads share ownership and synchronize access to that single receiver.",
          },
        ],
        challenge: {
          title: "Explicitly Close a Channel",
          description:
            "Create a channel, send 3 values, then explicitly `drop(tx)` before receiving. Use a `while let Ok(v) = rx.recv()` loop to print all values until the channel closes.",
          starterCode: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    // send 3 values, then drop(tx)
    // receive with while let Ok(v) = rx.recv()
}
`,
          solutionCode: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    tx.send(1).unwrap();
    tx.send(2).unwrap();
    tx.send(3).unwrap();
    drop(tx);

    while let Ok(v) = rx.recv() {
        println!("{}", v);
    }
}`,
          tests: [
            { id: 1, label: "Sends 3 values", keywords: [{ pattern: "tx\\.send" }] },
            { id: 2, label: "Explicitly drops tx", keywords: [{ pattern: "drop\\s*\\(\\s*tx\\s*\\)" }] },
            { id: 3, label: "Uses while let Ok(...) = rx.recv()", keywords: [{ pattern: "while\\s+let\\s+Ok" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Shared State
  // ─────────────────────────────────────────────────────────────
  {
    id: "shared-state",
    title: "Shared State",
    icon: "🔒",
    color: "#7c3aed",
    lessons: [
      {
        id: "rc-6",
        title: "Mutex<T>",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`Mutex<T>` (mutual exclusion) wraps a value so only one thread can access it at a time. Calling `.lock()` blocks until the lock is available, then returns a `MutexGuard` — a smart pointer that gives access to the inner data and **automatically releases the lock when it goes out of scope**.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Basic Mutex usage",
            content: `use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();
        *num += 1;
    } // lock is released here, when num goes out of scope

    println!("m = {:?}", m);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`.lock()` returns a `Result` because the lock can become **poisoned** if a thread panics while holding it — `.unwrap()` is common in examples, but production code often needs to decide how to handle poisoned locks explicitly.",
          },
          {
            type: "quiz",
            question: "How does Mutex<T> know when to release the lock?",
            options: [
              "You must call .unlock() manually",
              "The MutexGuard returned by .lock() releases the lock automatically via Drop when it goes out of scope",
              "It releases after a fixed timeout",
              "It never releases once locked",
            ],
            answer: 1,
            explanation:
              "Rust's RAII pattern applies here: the MutexGuard's Drop implementation releases the lock, so scoping the guard (with a block, or letting the function end) is how you control when the lock is released — no manual unlock call needed.",
          },
        ],
        challenge: {
          title: "Protected Counter",
          description:
            "Create a `Mutex::new(0)`, lock it, increment the value by 5, then print the final value by locking again and dereferencing.",
          starterCode: `use std::sync::Mutex;

fn main() {
    let m = Mutex::new(0);
    // lock, increment by 5
    // print the final value
}
`,
          solutionCode: `use std::sync::Mutex;

fn main() {
    let m = Mutex::new(0);
    {
        let mut num = m.lock().unwrap();
        *num += 5;
    }
    println!("{}", *m.lock().unwrap());
}`,
          tests: [
            { id: 1, label: "Creates a Mutex", keywords: [{ pattern: "Mutex::new" }] },
            { id: 2, label: "Locks the mutex", keywords: [{ pattern: "\\.lock\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Modifies the guarded value", keywords: [{ pattern: "\\*num\\s*\\+=" }] },
          ],
        },
      },
      {
        id: "rc-7",
        title: "Arc<T> for Shared Ownership",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`Rc<T>` (reference counting) lets multiple owners share a value, but it isn't thread-safe. `Arc<T>` (**atomic** reference counting) is the thread-safe equivalent — it uses atomic operations to update the reference count, so it's safe to clone and share across threads.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Arc alone (no interior mutability)",
            content: `use std::sync::Arc;
use std::thread;

fn main() {
    let data = Arc::new(vec![1, 2, 3]);
    let mut handles = vec![];

    for i in 0..3 {
        let data = Arc::clone(&data);
        handles.push(thread::spawn(move || {
            println!("thread {} sees: {:?}", i, data);
        }));
    }

    for h in handles {
        h.join().unwrap();
    }
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`Arc` alone only gives you shared *read* access safely (since Rust's borrow rules still apply through the Arc). To mutate shared data across threads, you combine `Arc` with an interior-mutability type like `Mutex` or `RwLock` — that's next.",
          },
          {
            type: "quiz",
            question: "Why can't Rc<T> be used to share data across threads?",
            options: [
              "Rc<T> is deprecated",
              "Rc<T>'s reference count updates are not atomic, so concurrent clones/drops from multiple threads could race and corrupt the count",
              "Rc<T> can only hold integers",
              "Rc<T> requires unsafe code to construct",
            ],
            answer: 1,
            explanation:
              "Rc's increment/decrement of the reference count is a plain (non-atomic) read-modify-write, which is unsafe if two threads do it simultaneously. Arc uses atomic operations for this instead, making it safe to share across threads.",
          },
        ],
        challenge: {
          title: "Share Read-Only Data",
          description:
            "Create an Arc<Vec<i32>> wrapping [1,2,3,4,5]. Clone it for 2 threads, and in each thread print the sum of the vector using `.iter().sum::<i32>()`. Join both threads.",
          starterCode: `use std::sync::Arc;
use std::thread;

fn main() {
    let data = Arc::new(vec![1, 2, 3, 4, 5]);
    // spawn 2 threads, each printing the sum, then join both
}
`,
          solutionCode: `use std::sync::Arc;
use std::thread;

fn main() {
    let data = Arc::new(vec![1, 2, 3, 4, 5]);
    let mut handles = vec![];

    for _ in 0..2 {
        let data = Arc::clone(&data);
        handles.push(thread::spawn(move || {
            let total: i32 = data.iter().sum();
            println!("{}", total);
        }));
    }

    for h in handles {
        h.join().unwrap();
    }
}`,
          tests: [
            { id: 1, label: "Creates an Arc", keywords: [{ pattern: "Arc::new" }] },
            { id: 2, label: "Clones the Arc for each thread", keywords: [{ pattern: "Arc::clone" }] },
            { id: 3, label: "Joins all handles", keywords: [{ pattern: "\\.join\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "rc-8",
        title: "Arc<Mutex<T>> Combined",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "The classic pattern for **shared, mutable** state across threads is `Arc<Mutex<T>>`: `Arc` provides shared ownership so every thread can hold a handle to the same data, and `Mutex` provides safe interior mutability so any thread can modify it without a data race.",
          },
          {
            type: "code",
            lang: "rust",
            label: "A thread-safe shared counter",
            content: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}`,
          },
          {
            type: "diagram",
            title: "Arc<Mutex<T>> layered responsibilities",
            nodes: [
              { id: "arc", label: "Arc<T>", color: ACCENT, items: ["Shared ownership across threads", "Atomic ref-counting", "Clone is cheap"] },
              { id: "mutex", label: "Mutex<T>", color: "#2563eb", items: ["Interior mutability", "One thread at a time via lock()", "MutexGuard auto-unlocks"] },
            ],
          },
          {
            type: "quiz",
            question: "In `Arc<Mutex<T>>`, what job does each layer do?",
            options: [
              "Arc handles mutation, Mutex handles sharing",
              "Arc provides shared ownership across threads; Mutex provides safe, synchronized mutation of the shared value",
              "They do the same job redundantly",
              "Arc is only needed for single-threaded code",
            ],
            answer: 1,
            explanation:
              "Arc solves 'how do multiple threads own the same data', while Mutex solves 'how does one thread safely mutate it without a data race'. Together they give you shared, safely-mutable state.",
          },
        ],
        challenge: {
          title: "Shared Bank Balance",
          description:
            "Create an Arc<Mutex<i32>> starting at 100. Spawn 5 threads that each subtract 10 from the balance. Join all threads and print the final balance.",
          starterCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let balance = Arc::new(Mutex::new(100));
    // spawn 5 threads, each subtracting 10
    // join all, print final balance
}
`,
          solutionCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let balance = Arc::new(Mutex::new(100));
    let mut handles = vec![];

    for _ in 0..5 {
        let balance = Arc::clone(&balance);
        handles.push(thread::spawn(move || {
            let mut b = balance.lock().unwrap();
            *b -= 10;
        }));
    }

    for h in handles {
        h.join().unwrap();
    }

    println!("{}", *balance.lock().unwrap());
}`,
          tests: [
            { id: 1, label: "Wraps balance in Arc<Mutex<...>>", keywords: [{ pattern: "Arc::new\\s*\\(\\s*Mutex::new" }] },
            { id: 2, label: "Spawns 5 threads", keywords: [{ pattern: "0\\.\\.5" }] },
            { id: 3, label: "Prints the final balance", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Sync Primitives
  // ─────────────────────────────────────────────────────────────
  {
    id: "sync-primitives",
    title: "Sync Primitives",
    icon: "⚙️",
    color: "#059669",
    lessons: [
      {
        id: "rc-9",
        title: "RwLock<T>",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`RwLock<T>` (read-write lock) allows **many concurrent readers, or one exclusive writer** — never both at once. It's a good fit when reads vastly outnumber writes, since multiple readers don't have to wait for each other the way they would with a plain `Mutex`.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Multiple readers, exclusive writer",
            content: `use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let data = Arc::new(RwLock::new(vec![1, 2, 3]));

    let d1 = Arc::clone(&data);
    let reader = thread::spawn(move || {
        let r = d1.read().unwrap();
        println!("reader sees: {:?}", *r);
    });
    reader.join().unwrap();

    let d2 = Arc::clone(&data);
    let writer = thread::spawn(move || {
        let mut w = d2.write().unwrap();
        w.push(4);
    });
    writer.join().unwrap();
    println!("after write: {:?}", *data.read().unwrap());
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use `.read()` for shared/immutable access and `.write()` for exclusive/mutable access. If your workload is read-heavy, RwLock can reduce contention versus Mutex; if reads and writes are roughly balanced, plain Mutex is often simpler and just as fast.",
          },
          {
            type: "quiz",
            question: "What access pattern does RwLock<T> allow?",
            options: [
              "Only one reader OR one writer, never simultaneously",
              "Any number of simultaneous readers, OR exactly one writer — never both together",
              "Unlimited simultaneous readers and writers",
              "It behaves identically to Mutex<T>",
            ],
            answer: 1,
            explanation:
              "RwLock permits concurrent shared reads, but a writer needs exclusive access — no readers or other writers may hold the lock while a write is in progress.",
          },
        ],
        challenge: {
          title: "Read-Heavy Cache",
          description:
            "Create an Arc<RwLock<Vec<String>>> with one item \"init\". Spawn a writer thread that pushes \"new-item\", join it, then read and print the full vector.",
          starterCode: `use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let cache = Arc::new(RwLock::new(vec!["init".to_string()]));
    // spawn a writer thread pushing "new-item", join it
    // read and print the vector
}
`,
          solutionCode: `use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let cache = Arc::new(RwLock::new(vec!["init".to_string()]));

    let c = Arc::clone(&cache);
    let writer = thread::spawn(move || {
        c.write().unwrap().push("new-item".to_string());
    });
    writer.join().unwrap();

    println!("{:?}", *cache.read().unwrap());
}`,
          tests: [
            { id: 1, label: "Creates an RwLock", keywords: [{ pattern: "RwLock::new" }] },
            { id: 2, label: "Uses .write() to mutate", keywords: [{ pattern: "\\.write\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Uses .read() to view", keywords: [{ pattern: "\\.read\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "rc-10",
        title: "Atomics",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "For simple numeric counters, atomic types (`AtomicUsize`, `AtomicBool`, `AtomicI32`, ...) from `std::sync::atomic` avoid the overhead of a full Mutex. Operations like `.fetch_add()` are guaranteed indivisible at the hardware level — no lock needed.",
          },
          {
            type: "code",
            lang: "rust",
            label: "AtomicUsize across threads",
            content: `use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::thread;

fn main() {
    let counter = Arc::new(AtomicUsize::new(0));
    let mut handles = vec![];

    for _ in 0..5 {
        let c = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            c.fetch_add(1, Ordering::SeqCst);
        }));
    }
    for h in handles {
        h.join().unwrap();
    }

    println!("atomic counter = {}", counter.load(Ordering::SeqCst));
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`Ordering::SeqCst` (sequentially consistent) is the strictest, simplest-to-reason-about memory ordering, and a safe default when learning. Relaxed and other orderings exist for performance-sensitive code once you understand the memory model more deeply.",
          },
          {
            type: "quiz",
            question: "When is an atomic type a better choice than Mutex<T>?",
            options: [
              "Always — atomics should replace every Mutex",
              "For simple operations on primitive values (like counters), where lock-free atomic operations avoid locking overhead",
              "Only inside async functions",
              "Atomics can only be used on a single thread",
            ],
            answer: 1,
            explanation:
              "Atomics shine for simple, single-value operations like increment/decrement/compare-and-swap. For anything more complex (multiple fields that must update together, non-trivial invariants), Mutex is usually clearer and just as effective.",
          },
        ],
        challenge: {
          title: "Atomic Flag",
          description:
            "Create an Arc<AtomicBool> initialized to false. Spawn a thread that stores true into it using `.store(true, Ordering::SeqCst)`, join it, then load and print the value.",
          starterCode: `use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};
use std::thread;

fn main() {
    let flag = Arc::new(AtomicBool::new(false));
    // spawn a thread that stores true, join it
    // load and print the flag
}
`,
          solutionCode: `use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};
use std::thread;

fn main() {
    let flag = Arc::new(AtomicBool::new(false));
    let f = Arc::clone(&flag);
    let handle = thread::spawn(move || {
        f.store(true, Ordering::SeqCst);
    });
    handle.join().unwrap();
    println!("{}", flag.load(Ordering::SeqCst));
}`,
          tests: [
            { id: 1, label: "Creates an AtomicBool", keywords: [{ pattern: "AtomicBool::new" }] },
            { id: 2, label: "Stores a value atomically", keywords: [{ pattern: "\\.store\\s*\\(" }] },
            { id: 3, label: "Loads the value", keywords: [{ pattern: "\\.load\\s*\\(" }] },
          ],
        },
      },
      {
        id: "rc-11",
        title: "Condvar & Coordination",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`Condvar` (condition variable) lets one thread **wait** until another thread signals that some condition became true, without busy-polling. It's always paired with a `Mutex` guarding the condition itself.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Signaling readiness with Condvar",
            content: `use std::sync::{Arc, Mutex, Condvar};
use std::thread;

fn main() {
    let pair = Arc::new((Mutex::new(false), Condvar::new()));
    let pair2 = Arc::clone(&pair);

    thread::spawn(move || {
        let (lock, cvar) = &*pair2;
        let mut ready = lock.lock().unwrap();
        *ready = true;
        cvar.notify_one();
    });

    let (lock, cvar) = &*pair;
    let mut ready = lock.lock().unwrap();
    while !*ready {
        ready = cvar.wait(ready).unwrap();
    }
    println!("worker signaled ready = {}", *ready);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Always check the condition in a `while` loop, not `if` — **spurious wakeups** can happen (the waiting thread wakes even though nobody called `notify`), so you must re-check the actual condition after waking, not just assume it changed.",
          },
          {
            type: "quiz",
            question: "Why do we call cvar.wait() inside a `while !*ready` loop instead of `if`?",
            options: [
              "Style preference only, no functional difference",
              "Because the wait can wake up spuriously without the condition actually being true, so re-checking is required",
              "while loops are required syntax for Condvar",
              "Because Condvar only works with while loops",
            ],
            answer: 1,
            explanation:
              "Condition variables can wake up without notify being called (spurious wakeups) on some platforms/implementations. Re-checking the condition in a loop guards against acting on a false wakeup.",
          },
        ],
        challenge: {
          title: "Two-Stage Signal",
          description:
            "Using the same Arc<(Mutex<bool>, Condvar)> pattern, write code where a spawned thread sets the shared bool to true and calls notify_one, while main waits on it and then prints \"unblocked\".",
          starterCode: `use std::sync::{Arc, Mutex, Condvar};
use std::thread;

fn main() {
    let pair = Arc::new((Mutex::new(false), Condvar::new()));
    // spawn a thread setting the bool true and notifying
    // wait on it in main, then print "unblocked"
}
`,
          solutionCode: `use std::sync::{Arc, Mutex, Condvar};
use std::thread;

fn main() {
    let pair = Arc::new((Mutex::new(false), Condvar::new()));
    let pair2 = Arc::clone(&pair);

    thread::spawn(move || {
        let (lock, cvar) = &*pair2;
        let mut ready = lock.lock().unwrap();
        *ready = true;
        cvar.notify_one();
    });

    let (lock, cvar) = &*pair;
    let mut ready = lock.lock().unwrap();
    while !*ready {
        ready = cvar.wait(ready).unwrap();
    }
    println!("unblocked");
}`,
          tests: [
            { id: 1, label: "Uses Condvar", keywords: [{ pattern: "Condvar::new" }] },
            { id: 2, label: "Notifies a waiting thread", keywords: [{ pattern: "notify_one" }] },
            { id: 3, label: "Waits in a while loop", keywords: [{ pattern: "while\\s*!\\*ready" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Send & Sync
  // ─────────────────────────────────────────────────────────────
  {
    id: "send-and-sync",
    title: "Send & Sync",
    icon: "🛡️",
    color: "#f59e0b",
    lessons: [
      {
        id: "rc-12",
        title: "The Send Trait",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`Send` is a marker trait meaning a type's **ownership can be safely transferred** to another thread. Almost all types are `Send`; the main exception is `Rc<T>`, whose non-atomic reference counting isn't safe if two threads could both hold (and drop) clones concurrently.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Rc is not Send; Arc is",
            content: `use std::rc::Rc;
use std::sync::Arc;
use std::thread;

fn main() {
    // Rc is NOT Send/Sync -- can't be shared across threads.
    // let rc = Rc::new(5);
    // thread::spawn(move || println!("{}", rc)); // would fail to compile

    // Arc IS Send + Sync -- safe to share across threads.
    let arc = Arc::new(5);
    let arc2 = Arc::clone(&arc);
    let handle = thread::spawn(move || {
        println!("arc value in thread: {}", arc2);
    });
    handle.join().unwrap();
    println!("arc value in main: {}", arc);

    let _unused_rc = Rc::new(10); // fine to use locally, just not across threads
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "If you tried the commented-out `Rc` line for real, the compiler error would say something like 'Rc<i32> cannot be sent between threads safely' — this is Send being enforced automatically at compile time, with zero runtime cost.",
          },
          {
            type: "quiz",
            question: "What does it mean for a type to implement Send?",
            options: [
              "It can be printed with println!",
              "Its ownership can be safely transferred to another thread",
              "It implements the Copy trait",
              "It can only be used in async functions",
            ],
            answer: 1,
            explanation:
              "Send is specifically about whether moving a value of that type into a different thread is safe. Most types are Send automatically; a few (like Rc<T>) are deliberately excluded.",
          },
        ],
        challenge: {
          title: "Explain Send",
          description:
            "Store a short string in a variable `explanation` describing why Rc<T> is not Send, and print it.",
          starterCode: `fn main() {
    let explanation = "";
    println!("{}", explanation);
}
`,
          solutionCode: `fn main() {
    let explanation = "Rc's reference count updates are not atomic, so sharing it across threads could cause a data race on the count itself.";
    println!("{}", explanation);
}`,
          tests: [
            { id: 1, label: "Declares an explanation variable", keywords: [{ pattern: "let\\s+explanation" }] },
            { id: 2, label: "Mentions Rc or reference count", keywords: [{ pattern: "[Rr]c|reference count" }] },
            { id: 3, label: "Prints the explanation", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rc-13",
        title: "The Sync Trait",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`Sync` is a marker trait meaning it's safe for **multiple threads to hold references (`&T`) to the value at the same time**. A type `T` is `Sync` if and only if `&T` is `Send`. `Mutex<T>` is `Sync` even when `T` isn't, because the Mutex itself synchronizes access.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Sync in practice: sharing &T across threads",
            content: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Vec<i32> is Sync, so &Vec<i32> can be shared across threads directly
    // as long as nobody mutates it — here we wrap it in Arc for shared ownership.
    let numbers = Arc::new(vec![10, 20, 30]);

    let mut handles = vec![];
    for i in 0..3 {
        let numbers = Arc::clone(&numbers);
        handles.push(thread::spawn(move || {
            println!("thread {} reads: {}", i, numbers[i]);
        }));
    }
    for h in handles {
        h.join().unwrap();
    }

    // RefCell<T> is NOT Sync -- it has no internal locking, so sharing
    // &RefCell<T> across threads could race. Use Mutex<T> instead, which IS Sync.
    let shared = Arc::new(Mutex::new(0));
    let s = Arc::clone(&shared);
    thread::spawn(move || {
        *s.lock().unwrap() += 1;
    }).join().unwrap();
    println!("shared = {}", *shared.lock().unwrap());
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`RefCell<T>` gives interior mutability but does **no synchronization** — it's fast for single-threaded use but is correctly *not* Sync. `Mutex<T>` and `RwLock<T>` are the thread-safe equivalents you reach for once multiple threads are involved.",
          },
          {
            type: "quiz",
            question: "What is the precise relationship between Sync and Send?",
            options: [
              "They are the same trait with two names",
              "A type T is Sync exactly when &T is Send — i.e., sharing references across threads is safe",
              "Sync implies a type cannot be moved at all",
              "Sync only applies to primitive number types",
            ],
            answer: 1,
            explanation:
              "T: Sync means references to T (&T) can be safely sent to other threads and used concurrently. This is distinct from Send, which is about moving owned values (not just references) between threads.",
          },
        ],
        challenge: {
          title: "Choose the Right Wrapper",
          description:
            "Store the string \"Mutex<T>\" in a variable `thread_safe_choice`, representing which wrapper you'd use instead of RefCell<T> for interior mutability shared across threads. Print it.",
          starterCode: `fn main() {
    let thread_safe_choice = "";
    println!("{}", thread_safe_choice);
}
`,
          solutionCode: `fn main() {
    let thread_safe_choice = "Mutex<T>";
    println!("{}", thread_safe_choice);
}`,
          tests: [
            { id: 1, label: "Declares thread_safe_choice", keywords: [{ pattern: "let\\s+thread_safe_choice" }] },
            { id: 2, label: "Chooses Mutex", keywords: [{ pattern: "Mutex" }] },
            { id: 3, label: "Prints the choice", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rc-14",
        title: "Thread Safety Guarantees",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Send and Sync are both **auto traits** — the compiler derives them automatically for any type composed entirely of Send/Sync pieces, with no manual `impl` needed. A struct is Send/Sync only if every field is; a single non-Send field (like an `Rc`) makes the whole struct non-Send.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Auto-derivation of Send/Sync",
            content: `use std::sync::Arc;
use std::thread;

struct Config {
    max_connections: u32,
    name: String,
}
// Config is automatically Send + Sync, because u32 and String both are.

fn main() {
    let cfg = Arc::new(Config { max_connections: 100, name: "server-1".to_string() });
    let cfg2 = Arc::clone(&cfg);

    let handle = thread::spawn(move || {
        println!("{}: max={}", cfg2.name, cfg2.max_connections);
    });
    handle.join().unwrap();
    println!("original still usable: {}", cfg.name);
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "You almost never need to manually implement Send or Sync — and doing so requires `unsafe`, since you're personally vouching for thread-safety the compiler can't verify. That's a strong signal these traits are working as intended: safety by default.",
          },
          {
            type: "quiz",
            question: "How does the compiler decide whether a custom struct is Send and Sync?",
            options: [
              "You must always write impl Send and impl Sync manually",
              "Automatically: the struct is Send/Sync only if every one of its fields is Send/Sync",
              "It's based on the struct's name",
              "All structs are Send and Sync by default regardless of fields",
            ],
            answer: 1,
            explanation:
              "Send and Sync are auto traits, derived structurally. If any field isn't Send (or Sync), the compiler won't mark the containing type Send (or Sync) either — no boilerplate required in the common case.",
          },
        ],
        challenge: {
          title: "Share a Config Across Threads",
          description:
            "Define a struct `Settings { retries: u32 }`. Wrap it in Arc, clone it into a spawned thread, and print `retries` from inside the thread.",
          starterCode: `use std::sync::Arc;
use std::thread;

struct Settings {
    retries: u32,
}

fn main() {
    let settings = Arc::new(Settings { retries: 3 });
    // clone into a thread, print retries from inside it, join
}
`,
          solutionCode: `use std::sync::Arc;
use std::thread;

struct Settings {
    retries: u32,
}

fn main() {
    let settings = Arc::new(Settings { retries: 3 });
    let s = Arc::clone(&settings);
    let handle = thread::spawn(move || {
        println!("{}", s.retries);
    });
    handle.join().unwrap();
}`,
          tests: [
            { id: 1, label: "Defines struct Settings", keywords: [{ pattern: "struct\\s+Settings" }] },
            { id: 2, label: "Wraps it in Arc", keywords: [{ pattern: "Arc::new" }] },
            { id: 3, label: "Joins the spawned thread", keywords: [{ pattern: "\\.join\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Async Rust
  // ─────────────────────────────────────────────────────────────
  {
    id: "async-rust",
    title: "Async Rust",
    icon: "⚡",
    color: "#dc2626",
    lessons: [
      {
        id: "rc-15",
        title: "async/await Basics",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Threads are great for CPU-bound parallel work, but for I/O-bound work (network calls, file reads, timers) where most time is spent *waiting*, Rust offers **async/await**. An `async fn` returns a `Future` — a value representing work that hasn't finished yet — instead of blocking a whole OS thread while it waits.",
          },
          {
            type: "code",
            lang: "rust",
            label: "A basic async function, driven by an executor",
            content: `use futures::executor::block_on;

async fn say_hello() -> String {
    "hello from async".to_string()
}

async fn run() {
    let msg = say_hello().await;
    println!("{}", msg);
}

fn main() {
    block_on(run());
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Unlike threads, an `async fn` does **nothing** until something drives it — a `Future` is lazy. `block_on` (from the `futures` crate here) is a minimal executor that runs a future to completion; real projects typically use a full async runtime like Tokio instead.",
          },
          {
            type: "quiz",
            question: "What happens when you call an async fn without awaiting or driving it with an executor?",
            options: [
              "It runs immediately in the background",
              "It returns a Future value that does nothing until it is awaited or polled by an executor",
              "It's a compile error to call an async fn without await",
              "It blocks the current thread until finished",
            ],
            answer: 1,
            explanation:
              "Calling an async fn just constructs a Future — a state machine describing the work. Nothing actually executes until that Future is polled, either directly via .await inside another async context, or by an executor like block_on/Tokio.",
          },
        ],
        challenge: {
          title: "Await a Value",
          description:
            "Write an async function `double(n: i32) -> i32` that returns n * 2. In an async `run()` function, await it with 21 and print the result. Drive `run()` with `futures::executor::block_on` in main.",
          starterCode: `use futures::executor::block_on;

async fn double(n: i32) -> i32 {
    // return n * 2
}

async fn run() {
    // await double(21) and print it
}

fn main() {
    block_on(run());
}
`,
          solutionCode: `use futures::executor::block_on;

async fn double(n: i32) -> i32 {
    n * 2
}

async fn run() {
    let result = double(21).await;
    println!("{}", result);
}

fn main() {
    block_on(run());
}`,
          tests: [
            { id: 1, label: "Defines an async fn double", keywords: [{ pattern: "async\\s+fn\\s+double" }] },
            { id: 2, label: "Uses .await", keywords: [{ pattern: "\\.await" }] },
            { id: 3, label: "Drives it with block_on", keywords: [{ pattern: "block_on\\s*\\(" }] },
          ],
        },
      },
      {
        id: "rc-16",
        title: "Futures & Concurrent Awaiting",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Awaiting futures one after another runs them **sequentially**. To run multiple futures concurrently on a single thread, use a combinator like `join!` (wait for all) — this interleaves their execution whenever one is waiting (e.g. on I/O), without needing extra OS threads.",
          },
          {
            type: "code",
            lang: "rust",
            label: "tokio::join! for concurrent futures",
            content: `use tokio::time::{sleep, Duration};

async fn fetch_data(id: u32) -> String {
    sleep(Duration::from_millis(10)).await;
    format!("data-{}", id)
}

#[tokio::main]
async fn main() {
    let a = fetch_data(1);
    let b = fetch_data(2);
    let (ra, rb) = tokio::join!(a, b);
    println!("{} {}", ra, rb);
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`#[tokio::main]` is a macro that wraps your `async fn main()` in a Tokio runtime setup — under the hood it's roughly equivalent to building a runtime and calling `.block_on(actual_main())`. It's the standard entry point for Tokio-based programs.",
          },
          {
            type: "quiz",
            question: "What's the benefit of `tokio::join!(a, b)` over `a.await; b.await;` run sequentially?",
            options: [
              "No difference — join! just adds syntax overhead",
              "join! polls both futures concurrently, so waiting time (like I/O) can overlap instead of being fully sequential",
              "join! runs each future on a separate OS thread automatically",
              "join! is only for futures that return the same type",
            ],
            answer: 1,
            explanation:
              "join! drives multiple futures on the same task, polling each when it's ready to make progress, so their waiting periods overlap — for two 10ms I/O waits, sequential awaiting takes ~20ms, while join! can finish in ~10ms.",
          },
        ],
        challenge: {
          title: "Spawn a Tokio Task",
          description:
            "Write an async fn `compute(n: u32) -> u32` that returns n * n. Use `tokio::spawn` to run it as a background task with n = 6, `.await` the JoinHandle, and print the unwrapped result. Mark main with `#[tokio::main]`.",
          starterCode: `async fn compute(n: u32) -> u32 {
    // return n * n
}

#[tokio::main]
async fn main() {
    // tokio::spawn compute(6), await the handle, print the result
}
`,
          solutionCode: `async fn compute(n: u32) -> u32 {
    n * n
}

#[tokio::main]
async fn main() {
    let handle = tokio::spawn(compute(6));
    let result = handle.await.unwrap();
    println!("{}", result);
}`,
          tests: [
            { id: 1, label: "Defines async fn compute", keywords: [{ pattern: "async\\s+fn\\s+compute" }] },
            { id: 2, label: "Uses tokio::spawn", keywords: [{ pattern: "tokio::spawn" }] },
            { id: 3, label: "Awaits and unwraps the handle", keywords: [{ pattern: "\\.await\\.unwrap\\(\\)" }] },
          ],
        },
      },
      {
        id: "rc-17",
        title: "Capstone: Concurrent Job Runner",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Let's combine threads, channels, and shared state into one program: a small job runner that dispatches work to a fixed pool of worker threads via a channel, and safely aggregates results in a shared, mutex-protected counter.",
          },
          {
            type: "code",
            lang: "rust",
            label: "A tiny worker pool with aggregated results",
            content: `use std::sync::{mpsc, Arc, Mutex};
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel::<u32>();
    let rx = Arc::new(Mutex::new(rx));
    let total = Arc::new(Mutex::new(0u32));

    let mut workers = vec![];
    for id in 0..3 {
        let rx = Arc::clone(&rx);
        let total = Arc::clone(&total);
        workers.push(thread::spawn(move || {
            while let Ok(job) = rx.lock().unwrap().recv() {
                let squared = job * job;
                println!("worker {} squared {} -> {}", id, job, squared);
                *total.lock().unwrap() += squared;
            }
        }));
    }

    for job in 1..=5 {
        tx.send(job).unwrap();
    }
    drop(tx); // signal workers to stop once the queue drains

    for w in workers {
        w.join().unwrap();
    }

    println!("total = {}", *total.lock().unwrap());
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This pattern — Arc<Mutex<Receiver>> for the job queue, Arc<Mutex<T>> for aggregated results — is the backbone of many hand-rolled thread pools before reaching for a crate like `rayon` or `tokio` for more advanced scheduling.",
          },
          {
            type: "quiz",
            question: "In this job runner, what makes the total sum correct despite multiple workers updating it?",
            options: [
              "Nothing in particular — it happens to work by luck",
              "Each worker locks the shared Mutex<u32> before updating total, so updates never overlap",
              "Because tx.send() is atomic",
              "Because workers run one at a time, never truly concurrently",
            ],
            answer: 1,
            explanation:
              "*total.lock().unwrap() += squared acquires exclusive access to the Mutex before reading and writing total, so even though workers run concurrently, updates to the shared counter are serialized safely.",
          },
        ],
        challenge: {
          title: "Track Jobs Processed",
          description:
            "Extend the pattern: alongside `total`, add an `Arc<Mutex<u32>>` called `jobs_done` that each worker increments by 1 after processing a job. After joining all workers, print `jobs_done`.",
          starterCode: `use std::sync::{mpsc, Arc, Mutex};
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel::<u32>();
    let rx = Arc::new(Mutex::new(rx));
    let total = Arc::new(Mutex::new(0u32));
    let jobs_done = Arc::new(Mutex::new(0u32));

    let mut workers = vec![];
    for _ in 0..3 {
        let rx = Arc::clone(&rx);
        let total = Arc::clone(&total);
        let jobs_done = Arc::clone(&jobs_done);
        workers.push(thread::spawn(move || {
            while let Ok(job) = rx.lock().unwrap().recv() {
                *total.lock().unwrap() += job * job;
                // increment jobs_done here
            }
        }));
    }

    for job in 1..=5 {
        tx.send(job).unwrap();
    }
    drop(tx);

    for w in workers {
        w.join().unwrap();
    }

    println!("jobs_done = {}", *jobs_done.lock().unwrap());
}
`,
          solutionCode: `use std::sync::{mpsc, Arc, Mutex};
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel::<u32>();
    let rx = Arc::new(Mutex::new(rx));
    let total = Arc::new(Mutex::new(0u32));
    let jobs_done = Arc::new(Mutex::new(0u32));

    let mut workers = vec![];
    for _ in 0..3 {
        let rx = Arc::clone(&rx);
        let total = Arc::clone(&total);
        let jobs_done = Arc::clone(&jobs_done);
        workers.push(thread::spawn(move || {
            while let Ok(job) = rx.lock().unwrap().recv() {
                *total.lock().unwrap() += job * job;
                *jobs_done.lock().unwrap() += 1;
            }
        }));
    }

    for job in 1..=5 {
        tx.send(job).unwrap();
    }
    drop(tx);

    for w in workers {
        w.join().unwrap();
    }

    println!("jobs_done = {}", *jobs_done.lock().unwrap());
}`,
          tests: [
            { id: 1, label: "Creates jobs_done as Arc<Mutex<u32>>", keywords: [{ pattern: "jobs_done\\s*=\\s*Arc::new\\s*\\(\\s*Mutex::new" }] },
            { id: 2, label: "Increments jobs_done inside the loop", keywords: [{ pattern: "jobs_done\\.lock\\(\\)\\.unwrap\\(\\)\\s*\\+=\\s*1" }] },
            { id: 3, label: "Prints jobs_done at the end", keywords: [{ pattern: "jobs_done" }] },
          ],
        },
      },
    ],
  },
];

export const RUST_CONCURRENCY_CHAPTERS = RAW_RUST_CONCURRENCY_CHAPTERS;

export const RUST_CONCURRENCY_LESSONS = RUST_CONCURRENCY_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RUST_CONCURRENCY_TOTAL_XP = RUST_CONCURRENCY_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
