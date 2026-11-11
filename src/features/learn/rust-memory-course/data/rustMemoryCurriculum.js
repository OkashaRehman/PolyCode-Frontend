// PolyCode — Rust Memory interactive course
// 6 chapters · 18 lessons
// All Rust code samples in this file were compiled and run with rustc 1.75 (edition 2021)
// to confirm they are syntactically and semantically correct before being included.

const ACCENT = "#ce422b"; // Rust orange

const RAW_RUST_MEMORY_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Stack & Heap
  // ─────────────────────────────────────────────────────────────
  {
    id: "memory-stack-heap",
    title: "Stack & Heap",
    icon: "🧱",
    color: ACCENT,
    lessons: [
      {
        id: "rmem-0",
        title: "Stack vs Heap",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "The **stack** stores values whose size is known at compile time, in last-in-first-out order — extremely fast to push and pop. The **heap** stores data whose size might grow, or that needs to outlive the function that created it; accessing it means following a pointer, which is slightly slower but far more flexible.",
          },
          {
            type: "diagram",
            title: "Stack vs Heap tradeoffs",
            nodes: [
              { id: "stack", label: "Stack", color: ACCENT, items: ["Fixed size, known at compile time", "Extremely fast push/pop", "i32, bool, char, fixed arrays"] },
              { id: "heap", label: "Heap", color: "#2563eb", items: ["Size can grow at runtime", "Accessed via a pointer", "String, Vec, Box<T>"] },
            ],
          },
          {
            type: "code",
            lang: "rust",
            label: "Where values live",
            content: `fn main() {
    // Stack: fixed-size, known at compile time, fast push/pop
    let x = 5;
    let y = 10;
    println!("{} {}", x, y);

    // Heap: for data whose size isn't known at compile time, or needs to outlive scope
    let b = Box::new(5);
    println!("boxed value: {}", b);
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "A `String` is actually a small stack-allocated struct (pointer, length, capacity) that points to heap-allocated bytes. So 'heap data' really means: some fixed-size handle lives on the stack, and it points at variable-size data on the heap.",
          },
          {
            type: "quiz",
            question: "Why can't a String's actual character data live entirely on the stack?",
            options: [
              "Strings are always empty",
              "Its size can change at runtime (push_str, etc.), and the stack requires sizes known at compile time",
              "The stack doesn't support text data",
              "It's a historical accident with no technical reason",
            ],
            answer: 1,
            explanation:
              "Because a String can grow, its byte buffer must live somewhere that supports resizing — the heap. The String value itself (a pointer + length + capacity, all fixed-size) lives on the stack or wherever it's declared.",
          },
        ],
        challenge: {
          title: "Box a Value",
          description:
            "Create `Box::new(100)` storing it in `boxed`, print it directly with println!, then print `*boxed + 1` to show dereferencing works like a normal integer.",
          starterCode: `fn main() {
    // create a Box::new(100), print it
    // print *boxed + 1
}
`,
          solutionCode: `fn main() {
    let boxed = Box::new(100);
    println!("{}", boxed);
    println!("{}", *boxed + 1);
}`,
          tests: [
            { id: 1, label: "Creates a Box", keywords: [{ pattern: "Box::new" }] },
            { id: 2, label: "Prints the boxed value", keywords: [{ pattern: "println!" }] },
            { id: 3, label: "Dereferences the box", keywords: [{ pattern: "\\*boxed" }] },
          ],
        },
      },
      {
        id: "rmem-1",
        title: "Box<T> for Heap Allocation",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`Box<T>` is the simplest smart pointer: it allocates `T` on the heap and gives you a single, unique owner. It's essential for **recursive types**, whose size would otherwise be infinite — wrapping the recursive part in `Box` turns it into a fixed-size pointer, which the compiler can size.",
          },
          {
            type: "code",
            lang: "rust",
            label: "A recursive type made possible by Box",
            content: `#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

fn main() {
    use List::{Cons, Nil};
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    println!("{:?}", list);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Without `Box`, `enum List { Cons(i32, List), Nil }` wouldn't compile — the compiler can't determine `List`'s size, since it would need to contain itself, recursively, forever. `Box<List>` is a fixed-size pointer regardless of how deep the list actually is.",
          },
          {
            type: "quiz",
            question: "Why does wrapping the recursive field in Box<T> fix the 'infinite size' problem?",
            options: [
              "Box<T> compresses the data to take zero space",
              "Box<T> is always a fixed-size pointer to heap data, regardless of how large or deeply nested T is",
              "Box<T> converts the recursive type into a non-recursive one automatically",
              "It doesn't actually fix anything; it's a coincidence",
            ],
            answer: 1,
            explanation:
              "A pointer (Box<T>) always has the same fixed size (one machine word) no matter what T is or how deeply the recursive structure goes — the actual recursive data lives on the heap, only the pointer lives inline.",
          },
        ],
        challenge: {
          title: "Sum a Boxed List",
          description:
            "Using the `List` enum with a `sum(&self) -> i32` method that recursively adds values via pattern matching, build the list [1, 2, 3] and print its sum.",
          starterCode: `enum List {
    Cons(i32, Box<List>),
    Nil,
}
use List::{Cons, Nil};

impl List {
    fn sum(&self) -> i32 {
        // match self, recursively sum
    }
}

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    // print list.sum()
}
`,
          solutionCode: `enum List {
    Cons(i32, Box<List>),
    Nil,
}
use List::{Cons, Nil};

impl List {
    fn sum(&self) -> i32 {
        match self {
            Cons(v, rest) => v + rest.sum(),
            Nil => 0,
        }
    }
}

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    println!("{}", list.sum());
}`,
          tests: [
            { id: 1, label: "Defines a recursive sum method", keywords: [{ pattern: "fn\\s+sum\\s*\\(\\s*&self" }] },
            { id: 2, label: "Matches Cons and Nil", keywords: [{ pattern: "Cons\\s*\\(" }] },
            { id: 3, label: "Prints the sum", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rmem-2",
        title: "The Drop Trait",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "When a value goes out of scope, Rust calls its `drop` — this is how memory (and other resources: files, sockets, locks) gets cleaned up automatically, deterministically, with **no garbage collector**. You can customize this by implementing the `Drop` trait's `drop(&mut self)` method.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Custom cleanup with Drop",
            content: `struct Droppable {
    name: String,
}

impl Drop for Droppable {
    fn drop(&mut self) {
        println!("Dropping {}", self.name);
    }
}

fn main() {
    let _a = Droppable { name: String::from("a") };
    {
        let _b = Droppable { name: String::from("b") };
        println!("b is in scope");
    } // b dropped here
    println!("only a remains");
} // a dropped here`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Values are dropped in **reverse order of creation** within a scope — later variables are dropped before earlier ones. You also cannot call `.drop()` directly (it would double-free); use `std::mem::drop(value)` if you need to force an early drop.",
          },
          {
            type: "quiz",
            question: "What triggers a value's Drop::drop to run?",
            options: [
              "You must call it manually every time",
              "The value going out of scope — Rust inserts the call automatically at compile time",
              "A background garbage collector thread",
              "Only when the program exits",
            ],
            answer: 1,
            explanation:
              "The compiler determines exactly where each value's scope ends and inserts a call to drop() there — this is deterministic and happens without any runtime garbage collector, unlike languages like Java or Python.",
          },
        ],
        challenge: {
          title: "Track Cleanup Order",
          description:
            "Implement Drop for a struct `Resource { id: u32 }` that prints \"Releasing resource ID\". Create two Resources in main with ids 1 and 2, and observe (by reasoning, not just running) that they drop in reverse order.",
          starterCode: `struct Resource {
    id: u32,
}

impl Drop for Resource {
    fn drop(&mut self) {
        // print releasing message with self.id
    }
}

fn main() {
    let _r1 = Resource { id: 1 };
    let _r2 = Resource { id: 2 };
}
`,
          solutionCode: `struct Resource {
    id: u32,
}

impl Drop for Resource {
    fn drop(&mut self) {
        println!("Releasing resource {}", self.id);
    }
}

fn main() {
    let _r1 = Resource { id: 1 };
    let _r2 = Resource { id: 2 };
}`,
          tests: [
            { id: 1, label: "Implements Drop for Resource", keywords: [{ pattern: "impl\\s+Drop\\s+for\\s+Resource" }] },
            { id: 2, label: "Defines drop(&mut self)", keywords: [{ pattern: "fn\\s+drop\\s*\\(\\s*&mut\\s+self" }] },
            { id: 3, label: "Creates two Resource instances", keywords: [{ pattern: "Resource\\s*\\{\\s*id:\\s*2" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Ownership Deep Dive
  // ─────────────────────────────────────────────────────────────
  {
    id: "memory-ownership-deep-dive",
    title: "Ownership Deep Dive",
    icon: "🔑",
    color: "#2563eb",
    lessons: [
      {
        id: "rmem-3",
        title: "Move Semantics Revisited",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Under the hood, a **move** in Rust is just a shallow bitwise copy (pointer, length, capacity for a String) with the compiler marking the original binding as invalid afterward. This is why moves are cheap — no heap data is actually copied, only the small stack-resident 'handle' to it.",
          },
          {
            type: "code",
            lang: "rust",
            label: "What a move actually does",
            content: `fn main() {
    let s1 = String::from("hello");
    // s1 is: { ptr: 0x.., len: 5, capacity: 5 }
    let s2 = s1;
    // The ptr/len/capacity bits are copied to s2.
    // s1 is marked invalid so both bindings never think they own the heap data.
    println!("{}", s2);
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This design avoids the classic **double-free** bug: if both s1 and s2 thought they owned the same heap buffer, dropping both would try to free the same memory twice. Rust prevents this at compile time by invalidating s1 the moment it's moved.",
          },
          {
            type: "quiz",
            question: "What actually happens at the bit level during `let s2 = s1;` for a String?",
            options: [
              "The heap bytes are copied into a brand-new allocation",
              "The stack-resident pointer/length/capacity are copied to s2, and s1 is marked invalid — no heap data is touched",
              "Nothing happens; s1 and s2 are just two names for the same variable",
              "Rust deletes the original heap data immediately",
            ],
            answer: 1,
            explanation:
              "A move copies only the small fixed-size struct describing the String (pointer, len, capacity) — the actual heap bytes stay put. The compiler then forbids using s1, preventing two owners from both trying to free that same heap allocation later.",
          },
        ],
        challenge: {
          title: "Move Into a Function",
          description:
            "Write a function `consume(s: String) -> usize` that takes ownership of a String and returns its length. Call it with a String built from `String::from(\"rustacean\")` and print the returned length.",
          starterCode: `fn consume(s: String) -> usize {
    // return the length
}

fn main() {
    let word = String::from("rustacean");
    // call consume(word) and print the result
}
`,
          solutionCode: `fn consume(s: String) -> usize {
    s.len()
}

fn main() {
    let word = String::from("rustacean");
    let length = consume(word);
    println!("{}", length);
}`,
          tests: [
            { id: 1, label: "Defines consume taking String", keywords: [{ pattern: "fn\\s+consume\\s*\\(\\s*s:\\s*String" }] },
            { id: 2, label: "Returns .len()", keywords: [{ pattern: "\\.len\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Prints the returned length", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rmem-4",
        title: "Copy vs Clone",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Types that are entirely stack-based and cheap to duplicate (integers, floats, bool, char, and tuples/arrays of these) can implement `Copy` — assignment duplicates them implicitly, and the original stays valid. Anything owning heap data (`String`, `Vec`) can't be `Copy`, but can opt into an explicit `.clone()` via the `Clone` trait for a deliberate deep copy.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Deriving Copy and Clone",
            content: `#[derive(Clone, Copy, Debug)]
struct Point { x: i32, y: i32 }

fn main() {
    let p1 = Point { x: 1, y: 2 };
    let p2 = p1; // Copy: both usable
    println!("{:?} {:?}", p1, p2);

    #[derive(Clone, Debug)]
    struct Name { value: String }
    let n1 = Name { value: String::from("Farooq") };
    let n2 = n1.clone(); // explicit deep copy
    println!("{:?} {:?}", n1, n2);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "A struct can only derive `Copy` if **every** field is also `Copy`. `Point { x: i32, y: i32 }` qualifies; adding a `String` field would make `#[derive(Copy)]` a compile error, since String can't be bitwise-duplicated safely.",
          },
          {
            type: "quiz",
            question: "Why can't a struct containing a String field derive Copy?",
            options: [
              "Strings are too small to copy",
              "Copy requires every field to be Copy, and String owns heap data that can't be safely bitwise-duplicated (that would create two owners of the same buffer)",
              "It's a syntax limitation with no deeper reason",
              "You can derive Copy on anything by adding #[allow(copy)]",
            ],
            answer: 1,
            explanation:
              "If String were Copy, a simple assignment would produce two structs both believing they own the same heap buffer — leading to a double-free when both are dropped. Rust's Copy trait is only implemented for types where bitwise duplication is always safe.",
          },
        ],
        challenge: {
          title: "Copy a Coordinate",
          description:
            "Define `#[derive(Clone, Copy, Debug)] struct Coord { x: i32, y: i32 }`. Create `a`, assign `let b = a;`, and print both `a` and `b` to show both remain valid (proving Copy, not a move).",
          starterCode: `#[derive(Clone, Copy, Debug)]
struct Coord {
    x: i32,
    y: i32,
}

fn main() {
    let a = Coord { x: 3, y: 4 };
    // let b = a; print both a and b
}
`,
          solutionCode: `#[derive(Clone, Copy, Debug)]
struct Coord {
    x: i32,
    y: i32,
}

fn main() {
    let a = Coord { x: 3, y: 4 };
    let b = a;
    println!("{:?} {:?}", a, b);
}`,
          tests: [
            { id: 1, label: "Derives Copy on Coord", keywords: [{ pattern: "derive\\s*\\(\\s*Clone,\\s*Copy" }] },
            { id: 2, label: "Assigns b = a", keywords: [{ pattern: "let\\s+b\\s*=\\s*a" }] },
            { id: 3, label: "Prints both a and b", keywords: [{ pattern: "println!\\s*\\(.*a.*b\\s*\\)" }] },
          ],
        },
      },
      {
        id: "rmem-5",
        title: "Ownership and Function Boundaries",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Passing a value into a function moves or copies it depending on its type, exactly like assignment. Returning a value transfers ownership back out. This means functions form a clear chain of custody for every value — at every point, exactly one place in the code owns each piece of heap data.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Ownership flowing through functions",
            content: `fn takes_and_gives_back(s: String) -> String {
    s // ownership moves back to the caller
}

fn main() {
    let s1 = String::from("hello");
    let s2 = takes_and_gives_back(s1);
    // s1 is invalid now; s2 owns the data
    println!("{}", s2);
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "If a function needs to use data without taking ownership, prefer borrowing (`&T` or `&mut T`) instead of this 'take and give back' pattern — it avoids the ceremony of reassigning the return value just to keep using the same data.",
          },
          {
            type: "quiz",
            question: "In `let s2 = takes_and_gives_back(s1);`, why is s1 invalid afterward even though the function returned a String?",
            options: [
              "It isn't invalid; this is a trick question",
              "Passing s1 into the function moved it in, regardless of what the function later returns — the return value is a separate ownership transfer bound to s2",
              "Because the function name mentions 'takes'",
              "Only true if the function panics",
            ],
            answer: 1,
            explanation:
              "The move into the function parameter and the move out via the return value are two separate transfers. s1 is invalidated the moment it's passed in; the returned String creates a fresh ownership relationship with s2.",
          },
        ],
        challenge: {
          title: "Append and Return",
          description:
            "Write a function `append_suffix(mut s: String, suffix: &str) -> String` that pushes `suffix` onto `s` and returns it. Call it with (\"Farooq\".to_string(), \"_dev\") and print the result.",
          starterCode: `fn append_suffix(mut s: String, suffix: &str) -> String {
    // push suffix onto s, return s
}

fn main() {
    let result = append_suffix("Farooq".to_string(), "_dev");
    println!("{}", result);
}
`,
          solutionCode: `fn append_suffix(mut s: String, suffix: &str) -> String {
    s.push_str(suffix);
    s
}

fn main() {
    let result = append_suffix("Farooq".to_string(), "_dev");
    println!("{}", result);
}`,
          tests: [
            { id: 1, label: "Takes ownership of a String", keywords: [{ pattern: "mut\\s+s:\\s*String" }] },
            { id: 2, label: "Uses push_str", keywords: [{ pattern: "push_str" }] },
            { id: 3, label: "Returns s", keywords: [{ pattern: "\\n\\s*s\\n" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Borrowing & Lifetimes Intro
  // ─────────────────────────────────────────────────────────────
  {
    id: "memory-borrowing-lifetimes-intro",
    title: "Borrowing & Lifetimes Intro",
    icon: "🧭",
    color: "#7c3aed",
    lessons: [
      {
        id: "rmem-6",
        title: "The Borrow Checker Rules",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Every reference in Rust is checked against two rules, at every point in the code: (1) at any given time, you can have **either** one mutable reference **or** any number of immutable references — never both; (2) references must **always** be valid — they can never outlive the data they point to.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Rule 1 in action: mixing mutable and immutable refs",
            content: `fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &s;
    println!("{} and {}", r1, r2);
    // r1 and r2 are no longer used after this point (non-lexical lifetimes)

    let r3 = &mut s;
    r3.push_str(", world");
    println!("{}", r3);
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Modern Rust uses **non-lexical lifetimes (NLL)**: a reference's 'active' lifetime ends at its last use, not at the end of its enclosing block. That's why `r3` can be created after `r1`/`r2`'s last use above, even though they're all still technically 'in scope' syntactically.",
          },
          {
            type: "quiz",
            question: "What are the two core borrow checker rules?",
            options: [
              "References must be Copy, and must be declared with mut",
              "Either one mutable reference OR any number of immutable references (never both); and references must never outlive the data they point to",
              "You can have unlimited mutable references as long as they're in different functions",
              "All references must be boxed",
            ],
            answer: 1,
            explanation:
              "These two rules together eliminate data races (rule 1) and dangling references (rule 2) entirely at compile time — no runtime checks needed for either guarantee.",
          },
        ],
        challenge: {
          title: "Sequential Borrows",
          description:
            "Create a mutable String \"data\". First take an immutable reference and print it. Then, after that reference's last use, take a mutable reference, append \"!\", and print the result.",
          starterCode: `fn main() {
    let mut s = String::from("data");
    // immutable borrow, print it
    // mutable borrow, append "!", print it
}
`,
          solutionCode: `fn main() {
    let mut s = String::from("data");
    let r1 = &s;
    println!("{}", r1);

    let r2 = &mut s;
    r2.push_str("!");
    println!("{}", r2);
}`,
          tests: [
            { id: 1, label: "Takes an immutable reference", keywords: [{ pattern: "let\\s+r1\\s*=\\s*&s" }] },
            { id: 2, label: "Takes a mutable reference afterward", keywords: [{ pattern: "&mut\\s+s" }] },
            { id: 3, label: "Modifies through the mutable reference", keywords: [{ pattern: "push_str" }] },
          ],
        },
      },
      {
        id: "rmem-7",
        title: "Preventing Dangling References",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A **dangling reference** points to memory that's been freed — a classic source of use-after-free bugs in C/C++. Rust's compiler statically proves this can never happen: if a function tries to return a reference to a local variable, it simply won't compile.",
          },
          {
            type: "code",
            lang: "rust",
            label: "The compiler refuses to compile a dangling reference",
            content: `// This function WOULD NOT COMPILE if uncommented:
// fn dangle() -> &String {
//     let s = String::from("hello");
//     &s
// } // s is dropped here, so &s would point to freed memory — compile error

// The fix: return the owned value instead, transferring ownership out
fn no_dangle() -> String {
    let s = String::from("hello");
    s
}

fn main() {
    let s = no_dangle();
    println!("{}", s);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "The compiler error for the commented-out `dangle()` function would be 'missing lifetime specifier' or 'cannot return reference to local variable' — a very different experience from C/C++, where this bug often compiles fine and only crashes (or silently corrupts memory) at runtime.",
          },
          {
            type: "quiz",
            question: "Why does the borrow checker reject a function that returns a reference to a local, stack-allocated variable?",
            options: [
              "It's just an arbitrary restriction with no real reason",
              "The local variable is dropped when the function ends, so the returned reference would point to freed/invalid memory — the compiler proves this and refuses to compile it",
              "Functions in Rust can never return references, period",
              "Only generic functions have this restriction",
            ],
            answer: 1,
            explanation:
              "The moment the function returns, its local variables (including `s` above) go out of scope and are dropped. A reference to `s` returned from the function would immediately be dangling — pointing at freed memory — so Rust's compiler catches this before it can ever run.",
          },
        ],
        challenge: {
          title: "Fix the Dangling Reference",
          description:
            "Write a function `make_greeting() -> String` (not `&String`) that builds and returns \"Hello!\" as an owned String, avoiding the dangling reference problem. Call it and print the result.",
          starterCode: `fn make_greeting() -> String {
    // build and return "Hello!" as an owned String
}

fn main() {
    let greeting = make_greeting();
    println!("{}", greeting);
}
`,
          solutionCode: `fn make_greeting() -> String {
    let s = String::from("Hello!");
    s
}

fn main() {
    let greeting = make_greeting();
    println!("{}", greeting);
}`,
          tests: [
            { id: 1, label: "Returns an owned String, not a reference", keywords: [{ pattern: "->\\s*String" }] },
            { id: 2, label: "Builds the greeting", keywords: [{ pattern: "Hello!" }] },
            { id: 3, label: "Prints the result", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rmem-8",
        title: "Why Lifetimes Exist",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Most of the time the compiler can figure out how long a reference needs to stay valid on its own. But when a function's output could plausibly borrow from **either of several inputs**, the compiler can't guess which one — that's when you need to write an explicit **lifetime annotation** to clarify the relationship. Lifetimes describe relationships between existing references; they don't change how long anything actually lives.",
          },
          {
            type: "diagram",
            title: "What lifetimes actually communicate",
            nodes: [
              { id: "notextend", label: "They don't extend lifetimes", color: ACCENT, items: ["No effect on runtime behavior", "Purely a compile-time annotation"] },
              { id: "describe", label: "They describe relationships", color: "#2563eb", items: ["'The output lives at least as long as this input'", "Lets the compiler verify borrow validity across function boundaries"] },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Lifetime syntax (`'a`) can feel intimidating at first, but it's answering one question: 'for how long is this reference guaranteed to be valid, relative to the other references around it?' You'll write the annotations only when the compiler can't infer the answer itself.",
          },
          {
            type: "quiz",
            question: "What do lifetime annotations actually do?",
            options: [
              "They make a value live longer at runtime",
              "They describe, for the compiler's benefit, how the lifetimes of several references relate to each other — purely a compile-time concept",
              "They allocate extra memory to keep a reference valid",
              "They're required on every single reference in Rust",
            ],
            answer: 1,
            explanation:
              "Lifetime annotations don't change when anything is dropped — they just describe existing relationships (e.g., 'the return value's validity is tied to this parameter's') so the borrow checker can verify the whole chain of references is sound.",
          },
        ],
        challenge: {
          title: "Explain a Lifetime",
          description:
            "Store a short explanation string in `explanation` describing what a lifetime annotation communicates to the compiler, and print it.",
          starterCode: `fn main() {
    let explanation = "";
    println!("{}", explanation);
}
`,
          solutionCode: `fn main() {
    let explanation = "A lifetime annotation describes how long a reference is valid relative to other references, without changing runtime behavior.";
    println!("{}", explanation);
}`,
          tests: [
            { id: 1, label: "Declares explanation", keywords: [{ pattern: "let\\s+explanation" }] },
            { id: 2, label: "Mentions reference or lifetime", keywords: [{ pattern: "[Ll]ifetime|reference" }] },
            { id: 3, label: "Prints the explanation", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Lifetimes in Practice
  // ─────────────────────────────────────────────────────────────
  {
    id: "memory-lifetimes-practice",
    title: "Lifetimes in Practice",
    icon: "⏳",
    color: "#059669",
    lessons: [
      {
        id: "rmem-9",
        title: "Lifetime Annotations in Functions",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` declares a generic lifetime parameter `'a`, then says both inputs and the output share that same lifetime. This tells the compiler: the returned reference is valid for exactly as long as the **shorter-lived** of the two inputs.",
          },
          {
            type: "code",
            lang: "rust",
            label: "A function needing an explicit lifetime",
            content: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("long string is long");
    {
        let s2 = String::from("xyz");
        let result = longest(s1.as_str(), s2.as_str());
        println!("Longest string is {}", result);
    }
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Without the `'a` annotation, this specific function wouldn't compile: the compiler can't tell whether the returned reference borrows from `x` or `y`, so it can't verify the result stays valid. The annotation resolves that ambiguity by declaring both inputs (and the output) share one lifetime.",
          },
          {
            type: "quiz",
            question: "What does `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` guarantee?",
            options: [
              "x and y must have the exact same length",
              "The returned reference is valid for at most the shorter of x and y's lifetimes",
              "The function will always return x",
              "'a means the reference lives forever",
            ],
            answer: 1,
            explanation:
              "Tying x, y, and the return type to the same lifetime 'a means the compiler will only accept this returned reference as valid for as long as both inputs are simultaneously valid — effectively, the shorter of the two lifetimes.",
          },
        ],
        challenge: {
          title: "Shortest String",
          description:
            "Write `fn shortest<'a>(x: &'a str, y: &'a str) -> &'a str` returning whichever string has fewer characters. Call it with \"hello\" and \"hi\", and print the result.",
          starterCode: `fn shortest<'a>(x: &'a str, y: &'a str) -> &'a str {
    // return whichever is shorter
}

fn main() {
    println!("{}", shortest("hello", "hi"));
}
`,
          solutionCode: `fn shortest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() < y.len() { x } else { y }
}

fn main() {
    println!("{}", shortest("hello", "hi"));
}`,
          tests: [
            { id: 1, label: "Uses a lifetime parameter 'a", keywords: [{ pattern: "<'a>" }] },
            { id: 2, label: "Compares lengths", keywords: [{ pattern: "\\.len\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Calls shortest and prints", keywords: [{ pattern: "shortest\\s*\\(" }] },
          ],
        },
      },
      {
        id: "rmem-10",
        title: "Lifetime Elision",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "In many common patterns, Rust applies **elision rules** and lets you skip lifetime annotations entirely — the compiler infers them. For a function with exactly one reference input, the output (if it's a reference) automatically gets that same lifetime; for methods with `&self`, the output gets `self`'s lifetime. Only when there's genuine ambiguity (like `longest` above, with two independent inputs) do you need to spell it out.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Elided vs explicit lifetimes",
            content: `// Elided: the compiler infers the lifetime automatically here,
// because there's only one reference parameter.
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &b) in bytes.iter().enumerate() {
        if b == b' ' {
            return &s[0..i];
        }
    }
    s
}

fn main() {
    println!("{}", first_word("hello world"));
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "The elision rules exist purely to reduce boilerplate for the overwhelmingly common cases — they don't change what's actually allowed, just what you're required to write out explicitly. When elision can't determine a unique answer, the compiler asks you to disambiguate with an explicit lifetime.",
          },
          {
            type: "quiz",
            question: "Why doesn't `fn first_word(s: &str) -> &str` need an explicit lifetime annotation?",
            options: [
              "Because it doesn't actually return a reference",
              "Because with exactly one reference parameter, elision rules automatically tie the output's lifetime to that single input",
              "Because String slices never need lifetimes",
              "It's a special case only for the word 'first'",
            ],
            answer: 1,
            explanation:
              "One of Rust's lifetime elision rules states: if there's exactly one input lifetime, it's assigned to all elided output lifetimes. With only `s: &str` as input, the compiler infers the output borrows from `s` — no ambiguity to resolve.",
          },
        ],
        challenge: {
          title: "Elided Substring Extraction",
          description:
            "Write `fn until_comma(s: &str) -> &str` (no explicit lifetime needed) that returns everything before the first comma, or the whole string if there's no comma. Call it with \"Lahore, Punjab\" and print the result.",
          starterCode: `fn until_comma(s: &str) -> &str {
    // find the first comma, slice before it, or return s
}

fn main() {
    println!("{}", until_comma("Lahore, Punjab"));
}
`,
          solutionCode: `fn until_comma(s: &str) -> &str {
    match s.find(',') {
        Some(idx) => &s[..idx],
        None => s,
    }
}

fn main() {
    println!("{}", until_comma("Lahore, Punjab"));
}`,
          tests: [
            { id: 1, label: "Defines until_comma with elided lifetime", keywords: [{ pattern: "fn\\s+until_comma\\s*\\(\\s*s:\\s*&str\\s*\\)\\s*->\\s*&str" }] },
            { id: 2, label: "Uses .find() to locate the comma", keywords: [{ pattern: "\\.find\\s*\\(" }] },
            { id: 3, label: "Prints the result", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rmem-11",
        title: "Structs Holding References",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "A struct can hold a reference instead of an owned value, but then the struct itself needs a lifetime parameter — declaring that no instance of the struct can outlive the data it's borrowing from. This is common for lightweight 'view' types that reference a larger owned structure.",
          },
          {
            type: "code",
            lang: "rust",
            label: "A struct that borrows instead of owning",
            content: `struct Excerpt<'a> {
    part: &'a str,
}

impl<'a> Excerpt<'a> {
    fn announce(&self) -> &str {
        println!("Attention please: {}", self.part);
        self.part
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let excerpt = Excerpt { part: first_sentence };
    excerpt.announce();
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`Excerpt<'a>` cannot outlive `novel` — if you tried to keep an `Excerpt` around after `novel` was dropped, the compiler would reject it. This is the borrow checker extending its dangling-reference protection to struct fields, not just simple variables.",
          },
          {
            type: "quiz",
            question: "Why does a struct holding a &str field need a lifetime parameter?",
            options: [
              "It's purely stylistic and could be omitted",
              "So the compiler can guarantee no instance of the struct outlives the data its reference field points to",
              "Because &str is always slower without one",
              "Only tuple structs need this, not regular ones",
            ],
            answer: 1,
            explanation:
              "Since the struct doesn't own the string data, it needs a way to tell the compiler 'I can't be valid for longer than the reference I'm holding' — the lifetime parameter is exactly that promise, checked at every point the struct is used.",
          },
        ],
        challenge: {
          title: "A Borrowing Wrapper",
          description:
            "Define `struct Highlight<'a> { text: &'a str }` with a method `shout(&self) -> String` that returns the text in uppercase with an exclamation mark. Create one wrapping a &str and print the result of calling shout().",
          starterCode: `struct Highlight<'a> {
    text: &'a str,
}

impl<'a> Highlight<'a> {
    fn shout(&self) -> String {
        // uppercase self.text and append "!"
    }
}

fn main() {
    let h = Highlight { text: "rust" };
    println!("{}", h.shout());
}
`,
          solutionCode: `struct Highlight<'a> {
    text: &'a str,
}

impl<'a> Highlight<'a> {
    fn shout(&self) -> String {
        format!("{}!", self.text.to_uppercase())
    }
}

fn main() {
    let h = Highlight { text: "rust" };
    println!("{}", h.shout());
}`,
          tests: [
            { id: 1, label: "Defines struct Highlight<'a> with a &str field", keywords: [{ pattern: "struct\\s+Highlight<'a>" }] },
            { id: 2, label: "Defines shout method", keywords: [{ pattern: "fn\\s+shout\\s*\\(\\s*&self" }] },
            { id: 3, label: "Uses to_uppercase", keywords: [{ pattern: "to_uppercase" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Smart Pointers
  // ─────────────────────────────────────────────────────────────
  {
    id: "memory-smart-pointers",
    title: "Smart Pointers",
    icon: "📍",
    color: "#f59e0b",
    lessons: [
      {
        id: "rmem-12",
        title: "Rc<T> for Shared Ownership",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`Rc<T>` (\"reference counted\") allows **multiple owners** of the same heap data — useful when a single-owner model (plain ownership) doesn't fit, like a graph node referenced by several parents. Each `.clone()` bumps a counter rather than copying data; the data is only dropped once the count reaches zero.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Watching the reference count change",
            content: `use std::rc::Rc;

fn main() {
    let a = Rc::new(5);
    println!("count after creating a = {}", Rc::strong_count(&a));

    let b = Rc::clone(&a);
    println!("count after creating b = {}", Rc::strong_count(&a));

    {
        let c = Rc::clone(&a);
        println!("count after creating c = {}", Rc::strong_count(&a));
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a));
    println!("a = {}, b = {}", a, b);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`Rc<T>` only allows **shared, immutable** access by default — you can't get a `&mut T` out of it directly, since multiple owners existing simultaneously makes exclusive mutable access unsafe. For shared mutable state, combine `Rc` with `RefCell` — next lesson.",
          },
          {
            type: "quiz",
            question: "What does Rc::clone(&a) actually do?",
            options: [
              "Deep-copies the underlying data, just like a heap allocation duplicate",
              "Increments a reference count and returns a new Rc pointing at the same data — cheap, no data copy",
              "Moves ownership from a to the new clone",
              "Panics if called more than once",
            ],
            answer: 1,
            explanation:
              "Rc::clone is intentionally cheap: it just bumps the internal strong reference count and hands back a new Rc<T> pointing at the exact same heap allocation — no duplication of the actual data occurs.",
          },
        ],
        challenge: {
          title: "Track a Reference Count",
          description:
            "Create `Rc::new(String::from(\"shared\"))`, clone it twice, and print `Rc::strong_count` after each clone to observe it rise from 1 to 3.",
          starterCode: `use std::rc::Rc;

fn main() {
    let a = Rc::new(String::from("shared"));
    // clone twice, printing strong_count after each clone
}
`,
          solutionCode: `use std::rc::Rc;

fn main() {
    let a = Rc::new(String::from("shared"));
    println!("{}", Rc::strong_count(&a));

    let b = Rc::clone(&a);
    println!("{}", Rc::strong_count(&a));

    let c = Rc::clone(&a);
    println!("{}", Rc::strong_count(&a));

    let _ = (b, c);
}`,
          tests: [
            { id: 1, label: "Creates an Rc", keywords: [{ pattern: "Rc::new" }] },
            { id: 2, label: "Clones the Rc", keywords: [{ pattern: "Rc::clone" }] },
            { id: 3, label: "Prints strong_count", keywords: [{ pattern: "Rc::strong_count" }] },
          ],
        },
      },
      {
        id: "rmem-13",
        title: "RefCell<T> and Interior Mutability",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "`RefCell<T>` moves Rust's borrow rules from **compile time to runtime**: you can mutate data through a `RefCell` even while holding what looks like an immutable reference to it, but the library panics if you violate the borrowing rules (e.g., two simultaneous mutable borrows) at runtime instead of catching it at compile time. Combined with `Rc`, this gives you shared, mutable data.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Rc<RefCell<T>>: shared and mutable",
            content: `use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let shared = Rc::new(RefCell::new(vec![1, 2, 3]));

    let s2 = Rc::clone(&shared);
    s2.borrow_mut().push(4);

    println!("{:?}", shared.borrow());

    // Attempting two mutable borrows at once would panic at runtime:
    // let _b1 = shared.borrow_mut();
    // let _b2 = shared.borrow_mut(); // panics: already borrowed
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Because RefCell defers borrow checking to runtime, a bug that would be a compile error with plain references instead becomes a **panic** at runtime with RefCell. It trades a compile-time guarantee for flexibility — use it only when you specifically need interior mutability that the compiler can't verify statically.",
          },
          {
            type: "quiz",
            question: "What's the key tradeoff RefCell<T> makes compared to Rust's normal compile-time borrow checking?",
            options: [
              "RefCell removes borrow checking entirely, with no runtime cost",
              "RefCell enforces the same borrowing rules, but checks them at runtime (panicking on violation) instead of at compile time, enabling patterns the compiler alone can't verify",
              "RefCell only works with numbers",
              "RefCell is strictly faster than normal references with no downside",
            ],
            answer: 1,
            explanation:
              "RefCell still enforces 'one mutable XOR many immutable' — it just does so with runtime bookkeeping (a borrow flag) instead of static analysis, panicking if violated. This lets you mutate data behind a shared reference (like Rc<T>) when the compiler's static rules alone would be too restrictive.",
          },
        ],
        challenge: {
          title: "Mutate Through Rc<RefCell<T>>",
          description:
            "Create `Rc::new(RefCell::new(0))`. Clone it once, use `.borrow_mut()` to add 10 through the clone, then print the value via the original using `.borrow()`.",
          starterCode: `use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let counter = Rc::new(RefCell::new(0));
    // clone, borrow_mut to add 10 via the clone
    // print via the original using .borrow()
}
`,
          solutionCode: `use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let counter = Rc::new(RefCell::new(0));
    let clone = Rc::clone(&counter);
    *clone.borrow_mut() += 10;
    println!("{}", counter.borrow());
}`,
          tests: [
            { id: 1, label: "Creates Rc<RefCell<...>>", keywords: [{ pattern: "Rc::new\\s*\\(\\s*RefCell::new" }] },
            { id: 2, label: "Uses borrow_mut()", keywords: [{ pattern: "borrow_mut\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Uses borrow() to read", keywords: [{ pattern: "\\.borrow\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "rmem-14",
        title: "Weak<T> and Reference Cycles",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Two `Rc`s that reference each other (like a parent and child both holding a strong `Rc` to one another) create a **reference cycle** — the strong count never reaches zero, so neither is ever dropped, leaking memory. `Weak<T>` (via `Rc::downgrade`) breaks the cycle: it references data without incrementing the strong count, and `.upgrade()` gives you an `Option<Rc<T>>` that's `None` if the data was already dropped.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Parent/child with Weak to avoid a cycle",
            content: `use std::cell::RefCell;
use std::rc::{Rc, Weak};

struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf's parent value = {:?}", leaf.parent.borrow().upgrade().map(|n| n.value));
}`,
          },
          {
            type: "diagram",
            title: "Strong vs Weak references",
            nodes: [
              { id: "strong", label: "Strong (Rc)", color: ACCENT, items: ["Keeps data alive", "Data drops only when strong count = 0", "Parent-child cycles can leak"] },
              { id: "weak", label: "Weak", color: "#2563eb", items: ["Doesn't keep data alive", "upgrade() -> Option<Rc<T>>", "Perfect for 'back-references' like child-to-parent"] },
            ],
          },
          {
            type: "quiz",
            question: "Why use Weak<T> for a child node's reference back to its parent?",
            options: [
              "Weak references are always faster to dereference",
              "If the child held a strong Rc to the parent, and the parent holds a strong Rc to the child, neither's count would ever reach zero — a memory leak from the cycle",
              "Weak<T> is required syntax whenever RefCell is used",
              "There's no real reason; it's just convention",
            ],
            answer: 1,
            explanation:
              "A parent→child strong reference plus a child→parent strong reference forms a cycle where each keeps the other's count above zero forever, so Drop never runs for either — a genuine memory leak (though not a memory-safety violation). Using Weak for the 'back' direction breaks the cycle.",
          },
        ],
        challenge: {
          title: "Check for a Dropped Parent",
          description:
            "Given `let orphan: RefCell<Weak<i32>> = RefCell::new(Weak::new());`, call `.borrow().upgrade()` and print whether it's `None` (since nothing was ever assigned) using `.is_none()`.",
          starterCode: `use std::cell::RefCell;
use std::rc::Weak;

fn main() {
    let orphan: RefCell<Weak<i32>> = RefCell::new(Weak::new());
    // upgrade and print .is_none()
}
`,
          solutionCode: `use std::cell::RefCell;
use std::rc::Weak;

fn main() {
    let orphan: RefCell<Weak<i32>> = RefCell::new(Weak::new());
    println!("{}", orphan.borrow().upgrade().is_none());
}`,
          tests: [
            { id: 1, label: "Creates a Weak::new()", keywords: [{ pattern: "Weak::new\\s*\\(\\s*\\)" }] },
            { id: 2, label: "Calls .upgrade()", keywords: [{ pattern: "\\.upgrade\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Checks is_none()", keywords: [{ pattern: "\\.is_none\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Advanced Memory & Capstone
  // ─────────────────────────────────────────────────────────────
  {
    id: "memory-advanced-capstone",
    title: "Advanced Memory & Capstone",
    icon: "🧠",
    color: "#dc2626",
    lessons: [
      {
        id: "rmem-15",
        title: "Unsafe Rust Basics",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "The `unsafe` keyword opens a small set of extra capabilities the compiler can't verify for you: dereferencing raw pointers, calling unsafe functions, accessing mutable statics, and a few others. It does **not** turn off the borrow checker everywhere — it just marks a block where *you* are personally vouching for a specific set of invariants the compiler can't check.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Raw pointers and unsafe functions",
            content: `fn main() {
    let mut num = 5;

    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;

    unsafe {
        println!("r1 is: {}", *r1);
        *r2 += 1;
        println!("r2 is: {}", *r2);
    }
}

unsafe fn dangerous() -> i32 {
    42
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Creating raw pointers (`as *const T` / `as *mut T`) is always safe — it's only **dereferencing** them (`*r1`) that requires `unsafe`, since the compiler can't guarantee a raw pointer is valid, non-null, or properly aligned the way it can for `&T`/`&mut T`.",
          },
          {
            type: "quiz",
            question: "What does the unsafe keyword actually disable?",
            options: [
              "All of Rust's memory safety checks everywhere in the program",
              "Only a small specific set of checks (like requiring pointers be valid) within that block — you're promising the compiler these specific invariants hold",
              "Type checking",
              "Nothing; unsafe is purely decorative",
            ],
            answer: 1,
            explanation:
              "unsafe unlocks five specific capabilities (dereferencing raw pointers, calling unsafe functions, implementing unsafe traits, accessing mutable statics, accessing union fields) — everything else, including the ordinary borrow checker rules on normal references, still fully applies.",
          },
        ],
        challenge: {
          title: "Read and Write via Raw Pointer",
          description:
            "Given `let mut n = 10;`, create a `*mut i32` from `&mut n`, and inside an `unsafe` block, dereference it to add 5, then print the updated value of `n`.",
          starterCode: `fn main() {
    let mut n = 10;
    // create a *mut i32, use unsafe to add 5 through it
    // print n
}
`,
          solutionCode: `fn main() {
    let mut n = 10;
    let ptr = &mut n as *mut i32;
    unsafe {
        *ptr += 5;
    }
    println!("{}", n);
}`,
          tests: [
            { id: 1, label: "Creates a *mut i32 raw pointer", keywords: [{ pattern: "as\\s*\\*mut\\s*i32" }] },
            { id: 2, label: "Uses an unsafe block", keywords: [{ pattern: "unsafe\\s*\\{" }] },
            { id: 3, label: "Prints n afterward", keywords: [{ pattern: "println!\\s*\\(\\s*\"\\{\\}\",\\s*n\\s*\\)" }] },
          ],
        },
      },
      {
        id: "rmem-16",
        title: "When (and When Not) to Use Unsafe",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`unsafe` exists for a small set of legitimate needs the type system alone can't express: FFI (calling C libraries), building low-level data structures (custom allocators, intrusive linked lists), and implementing safe abstractions on top of raw memory operations (much of `Vec<T>` itself is implemented with unsafe internally, exposing a fully safe API to its users). Reaching for `unsafe` to silence a borrow checker error you don't understand is almost always the wrong move.",
          },
          {
            type: "diagram",
            title: "Good vs risky reasons to use unsafe",
            nodes: [
              { id: "good", label: "Legitimate uses", color: ACCENT, items: ["FFI / calling C libraries", "Building safe abstractions internally (like Vec)", "Performance-critical low-level code, carefully reviewed"] },
              { id: "risky", label: "Red flags", color: "#dc2626", items: ["\"I don't understand this borrow error, let me just use unsafe\"", "Skipping bounds checks without profiling first", "No tests around the unsafe block's invariants"] },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "A useful mental model: safe Rust code that *uses* an unsafe abstraction (like calling `Vec::push`) should never itself be able to trigger undefined behavior, no matter what values it passes in. If your `unsafe` block requires callers to uphold some invisible invariant to stay sound, document it explicitly with a `/// # Safety` comment.",
          },
          {
            type: "quiz",
            question: "What's a red flag that you might be misusing unsafe?",
            options: [
              "Using it to implement a well-tested low-level data structure",
              "Reaching for it because you don't understand a borrow checker error, rather than because you have a specific, verified invariant the compiler can't express",
              "Using it to call into a C library via FFI",
              "Writing a /// # Safety doc comment explaining the invariant",
            ],
            answer: 1,
            explanation:
              "unsafe should be a deliberate choice backed by a specific invariant you can state and verify — not a generic escape hatch for confusing compiler errors. The latter usually means there's a genuine bug the compiler was correctly catching.",
          },
        ],
        challenge: {
          title: "Document a Safety Invariant",
          description:
            "Write an unsafe function `first_unchecked(v: &[i32]) -> i32` that returns `v[0]` via a raw pointer dereference without bounds checking, with a `/// # Safety` doc comment stating the caller must ensure `v` is non-empty. Call it safely with a non-empty slice and print the result.",
          starterCode: `/// # Safety
/// Add your safety requirement here
unsafe fn first_unchecked(v: &[i32]) -> i32 {
    // dereference a raw pointer to the first element
}

fn main() {
    let v = vec![7, 8, 9];
    let result = unsafe { first_unchecked(&v) };
    println!("{}", result);
}
`,
          solutionCode: `/// # Safety
/// Caller must ensure v is non-empty.
unsafe fn first_unchecked(v: &[i32]) -> i32 {
    *v.as_ptr()
}

fn main() {
    let v = vec![7, 8, 9];
    let result = unsafe { first_unchecked(&v) };
    println!("{}", result);
}`,
          tests: [
            { id: 1, label: "Has a /// # Safety doc comment", keywords: [{ pattern: "///\\s*#\\s*Safety" }] },
            { id: 2, label: "Defines an unsafe fn", keywords: [{ pattern: "unsafe\\s+fn\\s+first_unchecked" }] },
            { id: 3, label: "Calls it inside an unsafe block", keywords: [{ pattern: "unsafe\\s*\\{\\s*first_unchecked" }] },
          ],
        },
      },
      {
        id: "rmem-17",
        title: "Capstone: A Boxed Linked List",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Let's tie the whole course together: build a singly linked list using `Box<T>` for heap allocation and recursive typing, implement `Drop` behavior implicitly (Rust handles it for free here since every field is already droppable), and write a recursive method using pattern matching and borrowing — all concepts from this course, combined.",
          },
          {
            type: "code",
            lang: "rust",
            label: "A complete boxed linked list with a length method",
            content: `enum List {
    Cons(i32, Box<List>),
    Nil,
}
use List::{Cons, Nil};

impl List {
    fn new() -> List {
        Nil
    }

    fn prepend(self, value: i32) -> List {
        Cons(value, Box::new(self))
    }

    fn len(&self) -> u32 {
        match self {
            Cons(_, tail) => 1 + tail.len(),
            Nil => 0,
        }
    }

    fn sum(&self) -> i32 {
        match self {
            Cons(v, tail) => v + tail.sum(),
            Nil => 0,
        }
    }
}

fn main() {
    let list = List::new().prepend(3).prepend(2).prepend(1);
    println!("length = {}", list.len());
    println!("sum = {}", list.sum());
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`prepend(self, value)` takes `self` **by value** (consuming the old list) and returns a brand-new `List` — this lets you chain `.prepend(3).prepend(2).prepend(1)` fluently, since each call consumes and replaces the list, which is a common pattern for immutable-style data structures in Rust.",
          },
          {
            type: "quiz",
            question: "Why does prepend take `self` by value instead of `&self` or `&mut self`?",
            options: [
              "It's a mistake; it should take &mut self",
              "Because it needs to move the old list into the new Cons node it builds and returns — the old List value is consumed to construct the new head",
              "Because Box<List> requires it",
              "There's no functional reason, just style",
            ],
            answer: 1,
            explanation:
              "prepend wraps the entire existing list inside a new Cons node: `Cons(value, Box::new(self))`. To put `self` inside that Box, the method needs to own it outright — a borrow wouldn't let it move `self` into the new structure.",
          },
        ],
        challenge: {
          title: "Add a Contains Method",
          description:
            "Add a method `contains(&self, target: i32) -> bool` to the List that recursively checks whether `target` appears anywhere in the list. Build `List::new().prepend(3).prepend(2).prepend(1)` and print whether it contains 2.",
          starterCode: `enum List {
    Cons(i32, Box<List>),
    Nil,
}
use List::{Cons, Nil};

impl List {
    fn new() -> List {
        Nil
    }

    fn prepend(self, value: i32) -> List {
        Cons(value, Box::new(self))
    }

    fn contains(&self, target: i32) -> bool {
        // recursively check if target is in the list
    }
}

fn main() {
    let list = List::new().prepend(3).prepend(2).prepend(1);
    println!("{}", list.contains(2));
}
`,
          solutionCode: `enum List {
    Cons(i32, Box<List>),
    Nil,
}
use List::{Cons, Nil};

impl List {
    fn new() -> List {
        Nil
    }

    fn prepend(self, value: i32) -> List {
        Cons(value, Box::new(self))
    }

    fn contains(&self, target: i32) -> bool {
        match self {
            Cons(v, tail) => *v == target || tail.contains(target),
            Nil => false,
        }
    }
}

fn main() {
    let list = List::new().prepend(3).prepend(2).prepend(1);
    println!("{}", list.contains(2));
}`,
          tests: [
            { id: 1, label: "Defines contains(&self, target: i32) -> bool", keywords: [{ pattern: "fn\\s+contains\\s*\\(\\s*&self,\\s*target:\\s*i32\\s*\\)\\s*->\\s*bool" }] },
            { id: 2, label: "Recurses into the tail", keywords: [{ pattern: "tail\\.contains" }] },
            { id: 3, label: "Prints the result", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
    ],
  },
];

export const RUST_MEMORY_CHAPTERS = RAW_RUST_MEMORY_CHAPTERS;

export const RUST_MEMORY_LESSONS = RUST_MEMORY_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RUST_MEMORY_TOTAL_XP = RUST_MEMORY_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
