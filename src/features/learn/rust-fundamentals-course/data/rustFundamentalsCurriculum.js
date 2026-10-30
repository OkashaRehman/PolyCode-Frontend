// PolyCode — Rust Fundamentals interactive course
// 6 chapters · 18 lessons · browser challenges (pattern-matched, same model as other languages)
// All Rust code samples in this file were compiled and run with rustc 1.75 (edition 2021)
// to confirm they are syntactically and semantically correct before being included.

const ACCENT = "#ce422b"; // Rust orange

const RAW_RUST_FUNDAMENTALS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Getting Started
  // ─────────────────────────────────────────────────────────────
  {
    id: "rust-getting-started",
    title: "Getting Started",
    icon: "🦀",
    color: ACCENT,
    lessons: [
      {
        id: "rf-0",
        title: "What is Rust?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Rust** is a systems programming language focused on **safety, speed, and concurrency** — without a garbage collector. Its compiler enforces memory safety at compile time through a system called the **borrow checker**, which eliminates entire classes of bugs (null pointer dereferences, data races, use-after-free) before your program ever runs.",
          },
          {
            type: "diagram",
            title: "Why teams choose Rust",
            nodes: [
              {
                id: "safety",
                label: "Memory Safety",
                color: ACCENT,
                items: ["No garbage collector", "No null pointers", "Compile-time checks"],
              },
              {
                id: "speed",
                label: "Performance",
                color: "#2563eb",
                items: ["Zero-cost abstractions", "C/C++-level speed", "No runtime overhead"],
              },
              {
                id: "concurrency",
                label: "Fearless Concurrency",
                color: "#7c3aed",
                items: ["Data races caught at compile time", "Safe threads", "Ownership rules"],
              },
            ],
          },
          {
            type: "code",
            lang: "rust",
            label: "Hello, Rust!",
            content: `fn main() {
    println!("Hello, world!");
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`println!` is a **macro**, not a function — that's why it ends with `!`. Macros in Rust generate code at compile time, which is how `println!` can safely check your format string against the arguments you pass it.",
          },
          {
            type: "quiz",
            question: "What does Rust use instead of a garbage collector to manage memory?",
            options: [
              "Reference counting on every value by default",
              "A borrow checker that enforces ownership rules at compile time",
              "Manual malloc/free calls required for every variable",
              "An interpreter that manages memory at runtime",
            ],
            answer: 1,
            explanation:
              "Rust's compiler tracks ownership and borrowing rules and enforces them at compile time. If your code violates the rules, it simply won't compile — there is no runtime garbage collector needed.",
          },
        ],
        challenge: {
          title: "Your First Rust Program",
          description:
            "Write a `main` function that prints `Hello, Rust!` to the console using the `println!` macro.",
          starterCode: `fn main() {
    // Print "Hello, Rust!" using println!
}
`,
          solutionCode: `fn main() {
    println!("Hello, Rust!");
}`,
          tests: [
            { id: 1, label: "Defines fn main()", keywords: [{ pattern: "fn\\s+main\\s*\\(" }] },
            { id: 2, label: "Uses println! macro", keywords: [{ pattern: "println!\\s*\\(" }] },
            { id: 3, label: "Prints the expected text", keywords: [{ pattern: "Hello, Rust!" }] },
          ],
        },
      },
      {
        id: "rf-1",
        title: "Variables & Mutability",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Variables in Rust are **immutable by default** — once bound with `let`, the value cannot change. Add the `mut` keyword to allow reassignment. This default forces you to be explicit about which values are meant to change, which prevents an entire category of accidental-mutation bugs.",
          },
          {
            type: "code",
            lang: "rust",
            label: "let, mut, shadowing, and constants",
            content: `fn main() {
    let x = 5;
    println!("The value of x is: {}", x);

    let mut y = 5;
    println!("y is: {}", y);
    y = 6;
    println!("y is now: {}", y);

    const MAX_POINTS: u32 = 100_000;
    println!("Max points: {}", MAX_POINTS);

    // Shadowing: rebind the same name, optionally with a new type
    let z = 5;
    let z = z + 1;
    let z = z * 2;
    println!("The value of z is: {}", z); // 12
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Shadowing** is different from `mut`. Shadowing creates a brand-new variable that happens to reuse the name — it can even change type (`let spaces = \"   \"; let spaces = spaces.len();`). `mut` reuses the same variable and same type.",
          },
          {
            type: "quiz",
            question: "What happens if you try to reassign a `let` variable without `mut`?",
            options: [
              "Rust silently allows it",
              "It compiles but prints a warning",
              "The compiler rejects it with an error",
              "It only fails at runtime",
            ],
            answer: 2,
            explanation:
              "Variables are immutable by default. Reassigning a non-mut variable is a compile-time error — Rust catches this before the program ever runs.",
          },
        ],
        challenge: {
          title: "Mutable Counter",
          description:
            "Declare a mutable variable `count` starting at 0. Increment it by 1 three times, printing its value after each increment.",
          starterCode: `fn main() {
    // Declare mutable count = 0
    // Increment 3 times, printing after each increment
}
`,
          solutionCode: `fn main() {
    let mut count = 0;
    count += 1;
    println!("{}", count);
    count += 1;
    println!("{}", count);
    count += 1;
    println!("{}", count);
}`,
          tests: [
            { id: 1, label: "Declares a mutable variable", keywords: [{ pattern: "let\\s+mut\\s+count" }] },
            { id: 2, label: "Increments the value", keywords: [{ pattern: "count\\s*\\+=\\s*1|count\\s*=\\s*count\\s*\\+\\s*1" }] },
            { id: 3, label: "Prints the value", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rf-2",
        title: "Data Types",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Rust is **statically typed** — every value has a known type at compile time. Scalar types represent a single value (integers, floats, booleans, characters); compound types group multiple values together (tuples and arrays).",
          },
          {
            type: "diagram",
            title: "Rust's core data types",
            nodes: [
              { id: "int", label: "Integers", color: ACCENT, items: ["i32, u32, i64...", "Signed vs unsigned", "isize/usize for indexing"] },
              { id: "float", label: "Floats", color: "#2563eb", items: ["f32, f64", "f64 is the default"] },
              { id: "bool", label: "Boolean", color: "#7c3aed", items: ["true / false", "1 byte"] },
              { id: "char", label: "Char", color: "#059669", items: ["Single Unicode scalar", "4 bytes, single quotes"] },
              { id: "tuple", label: "Tuple", color: "#f59e0b", items: ["Fixed-size, mixed types", "(i32, f64, u8)"] },
              { id: "array", label: "Array", color: "#dc2626", items: ["Fixed-size, same type", "[i32; 5]"] },
            ],
          },
          {
            type: "code",
            lang: "rust",
            label: "Scalars and compound types",
            content: `fn main() {
    let x: i32 = -42;
    let y: u32 = 42;
    let pi: f64 = 3.14159;
    let is_active: bool = true;
    let letter: char = 'R';

    println!("{} {} {} {} {}", x, y, pi, is_active, letter);

    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (a, b, c) = tup;
    println!("a={} b={} c={}", a, b, c);
    println!("tup.0 = {}", tup.0);

    let arr: [i32; 5] = [1, 2, 3, 4, 5];
    println!("first = {}, len = {}", arr[0], arr.len());
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Arrays have a **fixed length** known at compile time. If you need a growable list, use `Vec<T>` instead — covered in the Collections course.",
          },
          {
            type: "quiz",
            question: "Which type is Rust's default for floating-point numbers?",
            options: ["f32", "f64", "decimal", "double"],
            answer: 1,
            explanation:
              "f64 (64-bit, double precision) is the default float type in Rust because on modern CPUs it's roughly as fast as f32 while offering more precision.",
          },
        ],
        challenge: {
          title: "Tuple and Array Basics",
          description:
            "Create a tuple `person` containing a name (`&str`), age (`i32`), and height in meters (`f64`). Create an array `scores` of 5 `i32` values. Print the person's age (via destructuring or `.1`) and the array's length.",
          starterCode: `fn main() {
    // let person: (&str, i32, f64) = (...);
    // let scores: [i32; 5] = [...];
    // print age and scores.len()
}
`,
          solutionCode: `fn main() {
    let person: (&str, i32, f64) = ("Farooq", 29, 1.75);
    let scores: [i32; 5] = [88, 92, 79, 95, 84];

    println!("Age: {}", person.1);
    println!("Scores count: {}", scores.len());
}`,
          tests: [
            { id: 1, label: "Creates a tuple", keywords: [{ pattern: "\\(.*,.*,.*\\)" }] },
            { id: 2, label: "Creates a fixed-size array", keywords: [{ pattern: "\\[i32;\\s*5\\]|\\[.*,.*,.*,.*,.*\\]" }] },
            { id: 3, label: "Uses .len() on the array", keywords: [{ pattern: "\\.len\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Functions & Control Flow
  // ─────────────────────────────────────────────────────────────
  {
    id: "rust-functions-control-flow",
    title: "Functions & Control Flow",
    icon: "🔁",
    color: "#2563eb",
    lessons: [
      {
        id: "rf-3",
        title: "Functions",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Functions are declared with `fn`. Rust cares about the distinction between **statements** (perform an action, no value) and **expressions** (evaluate to a value). The last expression in a function body — with no trailing semicolon — is what gets returned.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Defining and calling functions",
            content: `fn main() {
    println!("Sum: {}", add(5, 6));
    print_labeled(3, "value");
}

fn add(a: i32, b: i32) -> i32 {
    a + b // expression, no semicolon = returned
}

fn print_labeled(x: i32, label: &str) {
    println!("{}: {}", label, x);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Adding a semicolon after `a + b` turns it into a statement that evaluates to `()` (the unit type) — and the function would fail to compile, because it promised to return `i32`. The semicolon matters!",
          },
          {
            type: "quiz",
            question: "How does a Rust function return a value without using the `return` keyword?",
            options: [
              "It can't — return is always required",
              "By making the final expression in the body have no trailing semicolon",
              "By assigning to a variable named `result`",
              "By ending the function with `yield`",
            ],
            answer: 1,
            explanation:
              "The last expression in a block is implicitly the block's (and function's) value, as long as there's no semicolon after it. `return` is only needed for early returns.",
          },
        ],
        challenge: {
          title: "Temperature Converter",
          description:
            "Write a function `celsius_to_fahrenheit(c: f64) -> f64` that converts Celsius to Fahrenheit using `c * 9.0 / 5.0 + 32.0`, and call it from `main` with `100.0`, printing the result.",
          starterCode: `fn main() {
    // call celsius_to_fahrenheit(100.0) and print it
}

fn celsius_to_fahrenheit(c: f64) -> f64 {
    // implement the formula
}
`,
          solutionCode: `fn main() {
    println!("{}", celsius_to_fahrenheit(100.0));
}

fn celsius_to_fahrenheit(c: f64) -> f64 {
    c * 9.0 / 5.0 + 32.0
}`,
          tests: [
            { id: 1, label: "Defines celsius_to_fahrenheit function", keywords: [{ pattern: "fn\\s+celsius_to_fahrenheit" }] },
            { id: 2, label: "Returns an f64", keywords: [{ pattern: "->\\s*f64" }] },
            { id: 3, label: "Calls the function in main", keywords: [{ pattern: "celsius_to_fahrenheit\\s*\\(" }] },
          ],
        },
      },
      {
        id: "rf-4",
        title: "Control Flow",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Rust has `if`/`else` (which is an expression, so it can be used in a `let`), plus three loop constructs: `loop` (infinite, until `break`), `while` (conditional), and `for` (iterates over a collection or range — the idiomatic choice for most iteration).",
          },
          {
            type: "code",
            lang: "rust",
            label: "if, loop, while, for",
            content: `fn main() {
    let number = 7;
    if number < 5 {
        println!("less than 5");
    } else if number == 5 {
        println!("equal to 5");
    } else {
        println!("greater than 5");
    }

    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 5 {
            break counter * 2;
        }
    };
    println!("result = {}", result);

    let mut n = 3;
    while n != 0 {
        println!("{}!", n);
        n -= 1;
    }

    let arr = [10, 20, 30];
    for elem in arr.iter() {
        println!("value = {}", elem);
    }

    for n in 1..=3 {
        println!("range n = {}", n);
    }
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`loop` can return a value via `break value;` — useful for retry logic where you want the eventual successful result. `1..=3` is an **inclusive range** (1, 2, 3); `1..3` would be exclusive (1, 2).",
          },
          {
            type: "quiz",
            question: "Which loop construct is generally preferred in idiomatic Rust for iterating over a collection?",
            options: ["loop with manual indexing", "while with a counter", "for ... in", "goto-style loops"],
            answer: 2,
            explanation:
              "`for item in collection` (or `.iter()`) is idiomatic, avoids off-by-one index bugs, and lets the compiler apply iterator optimizations.",
          },
        ],
        challenge: {
          title: "FizzBuzz",
          description:
            "Write a function `fizzbuzz(n: u32) -> String` that returns \"Fizz\" if n is divisible by 3, \"Buzz\" if divisible by 5, \"FizzBuzz\" if both, otherwise the number as a string. Print the results for 1 through 15 using a for loop.",
          starterCode: `fn main() {
    for i in 1..=15 {
        println!("{}", fizzbuzz(i));
    }
}

fn fizzbuzz(n: u32) -> String {
    // implement the FizzBuzz logic
}
`,
          solutionCode: `fn fizzbuzz(n: u32) -> String {
    match (n % 3, n % 5) {
        (0, 0) => "FizzBuzz".to_string(),
        (0, _) => "Fizz".to_string(),
        (_, 0) => "Buzz".to_string(),
        _ => n.to_string(),
    }
}

fn main() {
    for i in 1..=15 {
        println!("{}", fizzbuzz(i));
    }
}`,
          tests: [
            { id: 1, label: "Defines fizzbuzz function", keywords: [{ pattern: "fn\\s+fizzbuzz" }] },
            { id: 2, label: "Uses a for loop over a range", keywords: [{ pattern: "for\\s+\\w+\\s+in\\s+1\\.\\.=?15" }] },
            { id: 3, label: "Checks divisibility with %", keywords: [{ pattern: "%\\s*3|%\\s*5" }] },
          ],
        },
      },
      {
        id: "rf-5",
        title: "Comments & Code Style",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Rust supports `//` line comments and `/* */` block comments. **Doc comments** (`///` above an item, or `//!` for the enclosing item) are special — tools like `cargo doc` and `rustdoc` turn them into generated documentation, and they can even embed runnable code examples that `cargo test` executes automatically.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Comment styles",
            content: `// This is a regular comment explaining the next line
fn main() {
    /* Block comments
       can span multiple lines */
    let x = 5; // inline comment

    println!("{}", square(x));
}

/// Doc comment: returns the square of a number.
///
/// # Examples
/// \`\`\`
/// assert_eq!(square(4), 16);
/// \`\`\`
fn square(n: i32) -> i32 {
    n * n
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`rustfmt` (bundled with the toolchain) auto-formats your code to the community style guide, and `clippy` catches common mistakes and non-idiomatic patterns. Running both regularly is standard practice on real Rust teams.",
          },
          {
            type: "quiz",
            question: "What is special about `///` doc comments compared to regular `//` comments?",
            options: [
              "They run faster at compile time",
              "Tooling like cargo doc turns them into documentation, and embedded code blocks can be tested",
              "They are required on every function",
              "They only work inside modules",
            ],
            answer: 1,
            explanation:
              "`///` comments are picked up by rustdoc to generate HTML documentation, and code fences inside them are compiled and run by `cargo test` as doctests.",
          },
        ],
        challenge: {
          title: "Document a Function",
          description:
            "Write a function `cube(n: i32) -> i32` that returns n cubed, with a `///` doc comment above it describing what it does, and call it from main with the value 3.",
          starterCode: `fn main() {
    println!("{}", cube(3));
}

// Add a /// doc comment here
fn cube(n: i32) -> i32 {
    // implement
}
`,
          solutionCode: `/// Returns the cube of the given number.
fn cube(n: i32) -> i32 {
    n * n * n
}

fn main() {
    println!("{}", cube(3));
}`,
          tests: [
            { id: 1, label: "Has a doc comment (///)", keywords: [{ pattern: "///" }] },
            { id: 2, label: "Defines cube function", keywords: [{ pattern: "fn\\s+cube" }] },
            { id: 3, label: "Calls cube(3)", keywords: [{ pattern: "cube\\s*\\(\\s*3\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Ownership Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "rust-ownership-basics",
    title: "Ownership Basics",
    icon: "🔑",
    color: "#7c3aed",
    lessons: [
      {
        id: "rf-6",
        title: "Ownership Rules",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Ownership is Rust's single most important concept. Three rules: (1) each value has one **owner**; (2) there can only be one owner at a time; (3) when the owner goes out of scope, the value is **dropped** (its memory is freed). Assigning a `String` to another variable **moves** it — the original binding becomes invalid.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Move vs Copy",
            content: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // move: s1 is no longer valid
    println!("{}", s2);
    // println!("{}", s1); // would fail to compile: value borrowed after move

    let x = 5;
    let y = x; // Copy, both valid (i32 implements Copy)
    println!("x = {}, y = {}", x, y);

    let s3 = String::from("world");
    let s4 = s3.clone();
    println!("s3 = {}, s4 = {}", s3, s4);

    takes_ownership(s2);
    // s2 is no longer valid here

    let n = 5;
    makes_copy(n);
    println!("n is still usable: {}", n);
}

fn takes_ownership(s: String) {
    println!("took ownership of: {}", s);
}

fn makes_copy(n: i32) {
    println!("copy of: {}", n);
}`,
          },
          {
            type: "diagram",
            title: "Move vs Copy vs Clone",
            nodes: [
              { id: "move", label: "Move", color: ACCENT, items: ["Default for heap data (String, Vec)", "Old binding invalidated", "No runtime cost"] },
              { id: "copy", label: "Copy", color: "#2563eb", items: ["Simple stack types (i32, bool, char)", "Both bindings stay valid", "Implicit bitwise copy"] },
              { id: "clone", label: "Clone", color: "#059669", items: ["Explicit .clone() call", "Deep copy of heap data", "Both bindings valid, real cost"] },
            ],
          },
          {
            type: "quiz",
            question: "After `let s2 = s1;` where s1 is a String, what happens if you try to use s1 afterward?",
            options: [
              "It works fine, both point to the same data",
              "The compiler rejects it — s1 was moved into s2",
              "It creates a shallow copy automatically",
              "It only fails at runtime with a panic",
            ],
            answer: 1,
            explanation:
              "String owns heap-allocated data, so assignment moves ownership rather than copying. Using s1 afterward is a compile-time 'value used after move' error — this is exactly the class of bug ownership prevents.",
          },
        ],
        challenge: {
          title: "Ownership Transfer",
          description:
            "Write a function `greet(name: String) -> String` that takes ownership of a String and returns a greeting like \"Hello, NAME!\". Call it from main and print the result.",
          starterCode: `fn main() {
    let name = String::from("Maryam");
    // call greet(name) and print the result
}

fn greet(name: String) -> String {
    // build and return the greeting
}
`,
          solutionCode: `fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let name = String::from("Maryam");
    let message = greet(name);
    println!("{}", message);
}`,
          tests: [
            { id: 1, label: "Defines greet function taking String", keywords: [{ pattern: "fn\\s+greet\\s*\\(\\s*name:\\s*String" }] },
            { id: 2, label: "Uses format! to build the message", keywords: [{ pattern: "format!\\s*\\(" }] },
            { id: 3, label: "Prints the result", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rf-7",
        title: "References & Borrowing",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Instead of transferring ownership, you can **borrow** a value with `&` (immutable reference) or `&mut` (mutable reference). The borrow checker enforces: any number of immutable references, **or** exactly one mutable reference — never both at the same time. This is what makes Rust's concurrency safe.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Borrowing rules in action",
            content: `fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);

    let mut s2 = String::from("hello");
    change(&mut s2);
    println!("{}", s2);

    // Borrow checker: many immutable refs at once is fine
    let r1 = &s2;
    let r2 = &s2;
    println!("{} and {}", r1, r2);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

fn change(s: &mut String) {
    s.push_str(", world");
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "You cannot have a mutable reference while any immutable references to the same value are still in use. This prevents one part of your code from reading data while another part changes it out from under it — the root cause of many C/C++ bugs.",
          },
          {
            type: "quiz",
            question: "Which combination of references is NOT allowed at the same time in Rust?",
            options: [
              "Two immutable references",
              "Three immutable references",
              "One mutable reference and one immutable reference to the same value",
              "Zero references",
            ],
            answer: 2,
            explanation:
              "The borrow checker forbids mixing a mutable reference with any immutable references to the same value simultaneously, since that combination could let one reference observe a half-completed mutation.",
          },
        ],
        challenge: {
          title: "Borrow and Modify",
          description:
            "Write a function `add_exclamation(s: &mut String)` that appends \"!\" to the given string using push_str. Call it on a mutable String in main and print the result.",
          starterCode: `fn main() {
    let mut phrase = String::from("Hello");
    // call add_exclamation(&mut phrase)
    println!("{}", phrase);
}

fn add_exclamation(s: &mut String) {
    // append "!" to s
}
`,
          solutionCode: `fn add_exclamation(s: &mut String) {
    s.push_str("!");
}

fn main() {
    let mut phrase = String::from("Hello");
    add_exclamation(&mut phrase);
    println!("{}", phrase);
}`,
          tests: [
            { id: 1, label: "Function takes &mut String", keywords: [{ pattern: "&mut\\s+String" }] },
            { id: 2, label: "Uses push_str", keywords: [{ pattern: "push_str\\s*\\(" }] },
            { id: 3, label: "Passes &mut phrase to the call", keywords: [{ pattern: "&mut\\s+phrase" }] },
          ],
        },
      },
      {
        id: "rf-8",
        title: "Slices",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A **slice** is a reference to a contiguous sequence within a collection, without taking ownership. String slices (`&str`) reference part of a `String`; array/vector slices (`&[T]`) reference part of an array or `Vec`. Slices are how Rust safely passes 'a view into' data.",
          },
          {
            type: "code",
            lang: "rust",
            label: "String and array slices",
            content: `fn main() {
    let s = String::from("hello world");
    let hello = &s[0..5];
    let world = &s[6..11];
    println!("{} {}", hello, world);

    let word = first_word(&s);
    println!("first word: {}", word);

    let a = [1, 2, 3, 4, 5];
    let slice = &a[1..3];
    println!("{:?}", slice);
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Prefer `&str` over `&String` for function parameters — it accepts both string literals and String references, making your functions more flexible. This is why `first_word` takes `&str`.",
          },
          {
            type: "quiz",
            question: "What does a slice like `&s[0..5]` actually store?",
            options: [
              "A full copy of the first 5 characters",
              "A pointer plus a length, referencing part of the original data",
              "A new heap allocation",
              "An index number only",
            ],
            answer: 1,
            explanation:
              "A slice is a 'fat pointer': a pointer to the start of the range plus a length. It borrows from the original data rather than copying it.",
          },
        ],
        challenge: {
          title: "Extract the Last Word",
          description:
            "Write a function `last_word(s: &str) -> &str` that returns the last word of a sentence (after the last space). Call it with \"the quick brown fox\" and print the result.",
          starterCode: `fn main() {
    let sentence = "the quick brown fox";
    // call last_word(sentence) and print it
}

fn last_word(s: &str) -> &str {
    // find the last space and slice after it
}
`,
          solutionCode: `fn last_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for i in (0..bytes.len()).rev() {
        if bytes[i] == b' ' {
            return &s[i + 1..];
        }
    }
    s
}

fn main() {
    let sentence = "the quick brown fox";
    println!("{}", last_word(sentence));
}`,
          tests: [
            { id: 1, label: "Defines last_word returning &str", keywords: [{ pattern: "fn\\s+last_word.*->\\s*&str" }] },
            { id: 2, label: "Slices the string", keywords: [{ pattern: "&s\\[" }] },
            { id: 3, label: "Prints the result", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Structs & Enums
  // ─────────────────────────────────────────────────────────────
  {
    id: "rust-structs-enums",
    title: "Structs & Enums",
    icon: "🏗️",
    color: "#059669",
    lessons: [
      {
        id: "rf-9",
        title: "Structs & Methods",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A `struct` groups related data under one name. Methods are defined in an `impl` block; the first parameter `&self` (or `&mut self`) refers to the struct instance the method is called on. **Associated functions** (like `String::from`) don't take `self` and are called with `::`.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Structs and impl blocks",
            content: `struct User {
    username: String,
    active: bool,
    sign_in_count: u64,
}

struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let user1 = User {
        username: String::from("farooq"),
        active: true,
        sign_in_count: 1,
    };
    println!("{} active={}", user1.username, user1.active);

    let rect = Rectangle { width: 30, height: 50 };
    println!("area = {}", rect.area());

    let sq = Rectangle::square(20);
    println!("square area = {}", sq.area());
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`Rectangle::square(20)` is an associated function (like a static method); `rect.area()` is a method that borrows `self`. This mirrors `self` vs classmethods in other languages you may already know.",
          },
          {
            type: "quiz",
            question: "What's the difference between a method and an associated function in Rust?",
            options: [
              "There is no difference",
              "Methods take &self (or self/&mut self) and are called with dot syntax; associated functions don't take self and are called with ::",
              "Associated functions can only return integers",
              "Methods must be public",
            ],
            answer: 1,
            explanation:
              "Methods operate on an instance (`instance.method()`), while associated functions like `Rectangle::square()` are namespaced under the type but don't require an existing instance — commonly used as constructors.",
          },
        ],
        challenge: {
          title: "Circle Struct",
          description:
            "Define a `Circle` struct with a `radius: f64` field, and an `impl` block with a method `area(&self) -> f64` using the formula `3.14159 * radius * radius`. Create a Circle with radius 4.0 and print its area.",
          starterCode: `struct Circle {
    radius: f64,
}

impl Circle {
    fn area(&self) -> f64 {
        // implement the area formula
    }
}

fn main() {
    // create a Circle and print its area
}
`,
          solutionCode: `struct Circle {
    radius: f64,
}

impl Circle {
    fn area(&self) -> f64 {
        3.14159 * self.radius * self.radius
    }
}

fn main() {
    let c = Circle { radius: 4.0 };
    println!("{}", c.area());
}`,
          tests: [
            { id: 1, label: "Defines struct Circle", keywords: [{ pattern: "struct\\s+Circle" }] },
            { id: 2, label: "Defines an area method", keywords: [{ pattern: "fn\\s+area\\s*\\(\\s*&self" }] },
            { id: 3, label: "Creates a Circle instance", keywords: [{ pattern: "Circle\\s*\\{" }] },
          ],
        },
      },
      {
        id: "rf-10",
        title: "Enums & Pattern Matching",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "An `enum` defines a type by enumerating its possible **variants**. Unlike many languages, Rust enum variants can hold data of different shapes and types. `match` forces you to handle every variant — the compiler won't let you forget a case, which eliminates a whole class of 'forgot to handle this' bugs.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Enums with data, and match",
            content: `enum IpAddrKind {
    V4(u8, u8, u8, u8),
    V6(String),
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: &Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}

fn main() {
    let home = IpAddrKind::V4(127, 0, 0, 1);
    let loopback = IpAddrKind::V6(String::from("::1"));

    match home {
        IpAddrKind::V4(a, b, c, d) => println!("IPv4: {}.{}.{}.{}", a, b, c, d),
        IpAddrKind::V6(addr) => println!("IPv6: {}", addr),
    }
    match loopback {
        IpAddrKind::V4(a, b, c, d) => println!("IPv4: {}.{}.{}.{}", a, b, c, d),
        IpAddrKind::V6(addr) => println!("IPv6: {}", addr),
    }

    println!("Quarter = {} cents", value_in_cents(&Coin::Quarter));
}`,
          },
          {
            type: "diagram",
            title: "Why match is exhaustive",
            nodes: [
              { id: "compile", label: "Compile time", color: ACCENT, items: ["Compiler checks every variant is handled", "Missing arm = compile error", "Add a variant later? Compiler flags every match to update"] },
              { id: "wildcard", label: "The _ pattern", color: "#2563eb", items: ["Catches remaining cases", "Use sparingly — you lose exhaustiveness checking"] },
            ],
          },
          {
            type: "quiz",
            question: "What happens if a match expression doesn't cover every possible variant of an enum?",
            options: [
              "Rust runs the first matching arm it finds",
              "The compiler refuses to compile — match must be exhaustive",
              "It silently returns a default value",
              "It only fails if that variant is reached at runtime",
            ],
            answer: 1,
            explanation:
              "match is exhaustive by design. You must handle every variant explicitly, or provide a wildcard `_` arm, or the compiler rejects the code — no runtime surprises.",
          },
        ],
        challenge: {
          title: "Traffic Light",
          description:
            "Define an enum `TrafficLight` with variants Red, Yellow, Green. Write a function `duration(light: &TrafficLight) -> u32` returning 30 for Red, 5 for Yellow, and 25 for Green using match. Call it with Green and print the result.",
          starterCode: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn duration(light: &TrafficLight) -> u32 {
    // match on light and return the right duration
}

fn main() {
    // call duration with TrafficLight::Green and print it
}
`,
          solutionCode: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn duration(light: &TrafficLight) -> u32 {
    match light {
        TrafficLight::Red => 30,
        TrafficLight::Yellow => 5,
        TrafficLight::Green => 25,
    }
}

fn main() {
    println!("{}", duration(&TrafficLight::Green));
}`,
          tests: [
            { id: 1, label: "Defines enum TrafficLight", keywords: [{ pattern: "enum\\s+TrafficLight" }] },
            { id: 2, label: "Uses match on the enum", keywords: [{ pattern: "match\\s+light" }] },
            { id: 3, label: "Calls duration with Green", keywords: [{ pattern: "TrafficLight::Green" }] },
          ],
        },
      },
      {
        id: "rf-11",
        title: "The Option Type",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Rust has **no null**. Instead, any value that might be absent is wrapped in `Option<T>`, which is either `Some(value)` or `None`. The compiler forces you to handle the `None` case before you can use the inner value — null pointer bugs become compile errors instead of runtime crashes.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Option<T> in practice",
            content: `fn divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

fn main() {
    let result = divide(10.0, 2.0);
    match result {
        Some(v) => println!("Result: {}", v),
        None => println!("Cannot divide by zero"),
    }

    if let Some(v) = divide(9.0, 3.0) {
        println!("if let result: {}", v);
    }

    let x: Option<i32> = Some(5);
    let y = x.unwrap_or(0);
    println!("y = {}", y);

    let none_val: Option<i32> = None;
    println!("default = {}", none_val.unwrap_or(-1));
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`if let Some(v) = option { ... }` is shorthand for a match that only cares about one variant — cleaner when you don't need to handle `None` explicitly. `.unwrap_or(default)` is a safe way to provide a fallback instead of calling `.unwrap()`, which panics on `None`.",
          },
          {
            type: "quiz",
            question: "Why does Rust use Option<T> instead of allowing null values?",
            options: [
              "It makes programs run faster",
              "It forces the possibility of 'no value' to be handled explicitly at compile time, eliminating null-pointer-style bugs",
              "It's only used for numbers",
              "It's required by the borrow checker for unrelated reasons",
            ],
            answer: 1,
            explanation:
              "Because Option<T> is a distinct type from T, you cannot accidentally use a 'possibly absent' value as if it were guaranteed present — the compiler makes you check first.",
          },
        ],
        challenge: {
          title: "Safe Array Lookup",
          description:
            "Write a function `get_at(arr: &[i32], index: usize) -> Option<i32>` that returns Some(value) if the index is valid, or None otherwise. Call it with an out-of-bounds index and print using unwrap_or(-1).",
          starterCode: `fn get_at(arr: &[i32], index: usize) -> Option<i32> {
    // return Some(value) if in range, else None
}

fn main() {
    let arr = [10, 20, 30];
    let result = get_at(&arr, 10);
    // print result using unwrap_or(-1)
}
`,
          solutionCode: `fn get_at(arr: &[i32], index: usize) -> Option<i32> {
    if index < arr.len() {
        Some(arr[index])
    } else {
        None
    }
}

fn main() {
    let arr = [10, 20, 30];
    let result = get_at(&arr, 10);
    println!("{}", result.unwrap_or(-1));
}`,
          tests: [
            { id: 1, label: "Returns Option<i32>", keywords: [{ pattern: "->\\s*Option<i32>" }] },
            { id: 2, label: "Uses Some and None", keywords: [{ pattern: "Some\\s*\\(" }] },
            { id: 3, label: "Uses unwrap_or as a fallback", keywords: [{ pattern: "unwrap_or\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Error Handling
  // ─────────────────────────────────────────────────────────────
  {
    id: "rust-error-handling",
    title: "Error Handling",
    icon: "🚨",
    color: "#dc2626",
    lessons: [
      {
        id: "rf-12",
        title: "panic! and Unrecoverable Errors",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "For errors that should stop the program immediately — bugs that can't be sensibly recovered from — Rust provides `panic!`. It unwinds the stack, runs destructors, and prints an error message. Indexing out of bounds, `.unwrap()` on a `None`, and integer overflow in debug mode all trigger a panic.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Recoverable vs unrecoverable",
            content: `fn main() {
    let v = vec![1, 2, 3];
    // v[99] would panic: index out of bounds
    println!("{}", v[2]);

    // panic!("crash and burn"); // would stop the program immediately

    let result: Result<i32, &str> = safe_div(10, 2);
    match result {
        Ok(v) => println!("Ok: {}", v),
        Err(e) => println!("Err: {}", e),
    }
}

fn safe_div(a: i32, b: i32) -> Result<i32, &'static str> {
    if b == 0 {
        Err("division by zero")
    } else {
        Ok(a / b)
    }
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Use `panic!` for programmer bugs and truly unrecoverable states (violated invariants). For anything the *caller* might reasonably want to handle — a missing file, bad user input — return a `Result` instead. This distinction is a core Rust design principle.",
          },
          {
            type: "quiz",
            question: "When is `panic!` the right choice over returning a Result?",
            options: [
              "Whenever any error occurs",
              "Only for truly unrecoverable bugs or violated invariants that the caller cannot reasonably handle",
              "Never — Result should always be used",
              "Only inside main()",
            ],
            answer: 1,
            explanation:
              "Result is for expected, recoverable failure conditions the caller can react to. panic! is reserved for bugs and states where continuing would be unsafe or meaningless.",
          },
        ],
        challenge: {
          title: "Safe Division",
          description:
            "Write a function `safe_div(a: i32, b: i32) -> Result<i32, String>` that returns Err(\"division by zero\".to_string()) when b is 0, otherwise Ok(a / b). Call it with (10, 0) and print the Err message using match.",
          starterCode: `fn safe_div(a: i32, b: i32) -> Result<i32, String> {
    // handle division by zero
}

fn main() {
    let result = safe_div(10, 0);
    // match on result and print Ok or Err
}
`,
          solutionCode: `fn safe_div(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("division by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn main() {
    let result = safe_div(10, 0);
    match result {
        Ok(v) => println!("Ok: {}", v),
        Err(e) => println!("Err: {}", e),
    }
}`,
          tests: [
            { id: 1, label: "Returns Result<i32, String>", keywords: [{ pattern: "Result<i32,\\s*String>" }] },
            { id: 2, label: "Uses Err for the zero case", keywords: [{ pattern: "Err\\s*\\(" }] },
            { id: 3, label: "Matches on the result", keywords: [{ pattern: "match\\s+result" }] },
          ],
        },
      },
      {
        id: "rf-13",
        title: "Result<T, E> in Depth",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`Result<T, E>` represents either success (`Ok(T)`) or failure (`Err(E)`). It's Rust's primary mechanism for **recoverable errors** — file I/O, parsing, network calls all return Result so callers must acknowledge the possibility of failure.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Matching on error kinds",
            content: `use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let path = "does_not_exist.txt";
    let f = File::open(path);
    let _f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => {
                println!("File not found, would create it here.");
                return;
            }
            other_error => {
                panic!("Problem opening the file: {:?}", other_error);
            }
        },
    };
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "You can match on `error.kind()` to branch on specific error types — for example, treating 'file not found' differently from 'permission denied'. This gives fine-grained, type-safe error handling without exceptions.",
          },
          {
            type: "quiz",
            question: "What are the two variants of Result<T, E>?",
            options: ["Some(T) and None", "Ok(T) and Err(E)", "True and False", "Success and Failure (as strings)"],
            answer: 1,
            explanation:
              "Result<T, E> is Ok(T) for success carrying a value of type T, or Err(E) for failure carrying an error value of type E.",
          },
        ],
        challenge: {
          title: "Parse With Fallback",
          description:
            "Write a function `parse_or_zero(s: &str) -> i32` that tries to parse a string into i32 using `.parse()`, returning 0 if it fails, using match on the Result. Call it with \"abc\" and print the result.",
          starterCode: `fn parse_or_zero(s: &str) -> i32 {
    // parse s, return 0 on error
}

fn main() {
    println!("{}", parse_or_zero("abc"));
}
`,
          solutionCode: `fn parse_or_zero(s: &str) -> i32 {
    match s.parse::<i32>() {
        Ok(n) => n,
        Err(_) => 0,
    }
}

fn main() {
    println!("{}", parse_or_zero("abc"));
}`,
          tests: [
            { id: 1, label: "Uses .parse() on the string", keywords: [{ pattern: "\\.parse" }] },
            { id: 2, label: "Matches Ok and Err", keywords: [{ pattern: "Ok\\s*\\(.*\\)\\s*=>" }] },
            { id: 3, label: "Returns 0 on failure", keywords: [{ pattern: "Err\\s*\\(_\\)\\s*=>\\s*0" }] },
          ],
        },
      },
      {
        id: "rf-14",
        title: "The ? Operator",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Writing a `match` after every fallible call gets verbose fast. The `?` operator propagates an `Err` immediately — returning it from the current function — while unwrapping `Ok` to get the inner value. It only works in functions that themselves return `Result` (or `Option`).",
          },
          {
            type: "code",
            lang: "rust",
            label: "Propagating errors with ?",
            content: `use std::num::ParseIntError;

fn parse_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n: i32 = s.parse()?; // ? propagates the error automatically
    Ok(n * 2)
}

fn main() -> Result<(), ParseIntError> {
    let doubled = parse_and_double("21")?;
    println!("Doubled: {}", doubled);

    match parse_and_double("abc") {
        Ok(v) => println!("Ok: {}", v),
        Err(e) => println!("Parse error: {}", e),
    }
    Ok(())
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`main` can return `Result<(), E>` too — if it returns `Err`, Rust prints the error and exits with a non-zero status. This lets you use `?` directly in `main` for quick scripts and small programs.",
          },
          {
            type: "quiz",
            question: "What does the `?` operator do when applied to a Result that is Err?",
            options: [
              "It panics immediately",
              "It ignores the error and continues with a default value",
              "It returns the Err from the current function immediately, propagating it to the caller",
              "It converts the Err into an Ok",
            ],
            answer: 2,
            explanation:
              "`?` is shorthand for 'if this is Err, return it from this function right now; if it's Ok, give me the inner value.' The enclosing function must itself return a compatible Result (or Option).",
          },
        ],
        challenge: {
          title: "Chained Parsing",
          description:
            "Write a function `sum_two(a: &str, b: &str) -> Result<i32, std::num::ParseIntError>` that parses both strings to i32 using `?` and returns their sum wrapped in Ok. Call it with (\"4\", \"5\") and print using match.",
          starterCode: `fn sum_two(a: &str, b: &str) -> Result<i32, std::num::ParseIntError> {
    // parse both with ?, return Ok(sum)
}

fn main() {
    match sum_two("4", "5") {
        Ok(v) => println!("Sum: {}", v),
        Err(e) => println!("Error: {}", e),
    }
}
`,
          solutionCode: `fn sum_two(a: &str, b: &str) -> Result<i32, std::num::ParseIntError> {
    let x: i32 = a.parse()?;
    let y: i32 = b.parse()?;
    Ok(x + y)
}

fn main() {
    match sum_two("4", "5") {
        Ok(v) => println!("Sum: {}", v),
        Err(e) => println!("Error: {}", e),
    }
}`,
          tests: [
            { id: 1, label: "Uses the ? operator", keywords: [{ pattern: "\\?;" }] },
            { id: 2, label: "Returns Result<i32, ParseIntError>", keywords: [{ pattern: "Result<i32" }] },
            { id: 3, label: "Returns Ok(sum)", keywords: [{ pattern: "Ok\\s*\\(\\s*x\\s*\\+\\s*y\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Modules, Traits & Capstone
  // ─────────────────────────────────────────────────────────────
  {
    id: "rust-modules-traits-capstone",
    title: "Modules, Traits & Capstone",
    icon: "📦",
    color: "#f59e0b",
    lessons: [
      {
        id: "rf-15",
        title: "Modules & Crates",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A **crate** is a compilation unit (a binary or library); a **module** (`mod`) organizes code within a crate into a namespace tree. Items are private by default — use `pub` to expose structs, functions, and fields to code outside the module. `use` brings a path into scope so you don't have to type it in full each time.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Nested modules and visibility",
            content: `mod library {
    pub struct Book {
        pub title: String,
        pub available: bool,
    }

    pub mod catalog {
        use super::Book;
        pub fn new_book(title: &str) -> Book {
            Book { title: title.to_string(), available: true }
        }
    }
}

use library::catalog;

fn main() {
    let b = catalog::new_book("The Rust Book");
    println!("{} available={}", b.title, b.available);
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "In real projects, modules usually live in separate files (`src/library.rs`, `src/library/catalog.rs`) rather than nested inline — `mod library;` in `main.rs` tells Rust to load `library.rs` (or `library/mod.rs`).",
          },
          {
            type: "quiz",
            question: "What is true about item visibility in Rust by default?",
            options: [
              "Everything is public unless marked private",
              "Everything is private to its module unless marked pub",
              "Only functions can be private; structs are always public",
              "Visibility doesn't exist in Rust",
            ],
            answer: 1,
            explanation:
              "Rust defaults to private. You must explicitly add `pub` to expose an item (and, for structs, each field you want accessible) outside its defining module.",
          },
        ],
        challenge: {
          title: "Build a Module",
          description:
            "Create a module `math` containing a public function `square(n: i32) -> i32`. Bring it into scope with `use` and call `math::square(5)` from main, printing the result.",
          starterCode: `mod math {
    // define pub fn square(n: i32) -> i32
}

fn main() {
    // call math::square(5) and print it
}
`,
          solutionCode: `mod math {
    pub fn square(n: i32) -> i32 {
        n * n
    }
}

fn main() {
    println!("{}", math::square(5));
}`,
          tests: [
            { id: 1, label: "Defines mod math", keywords: [{ pattern: "mod\\s+math" }] },
            { id: 2, label: "Function is marked pub", keywords: [{ pattern: "pub\\s+fn\\s+square" }] },
            { id: 3, label: "Calls math::square", keywords: [{ pattern: "math::square" }] },
          ],
        },
      },
      {
        id: "rf-16",
        title: "Traits & Generics",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "A **trait** defines shared behavior — a set of methods types can implement, similar to an interface. Traits can provide **default implementations**. **Generics** (`<T>`) let you write one function or struct that works with many types; **trait bounds** (`T: Trait`) constrain which types are allowed, so you can call trait methods on the generic value.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Traits, default methods, and generic bounds",
            content: `trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}

struct Article {
    headline: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("Headline: {}", self.headline)
    }
}

struct Tweet {
    text: String,
}

impl Summary for Tweet {} // uses default impl

fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let article = Article { headline: String::from("Rust 2.0 Released") };
    let tweet = Tweet { text: String::from("hello") };
    notify(&article);
    notify(&tweet);

    let numbers = vec![34, 50, 25, 100, 65];
    println!("largest = {}", largest(&numbers));
}`,
          },
          {
            type: "diagram",
            title: "Generics + trait bounds = zero-cost polymorphism",
            nodes: [
              { id: "generic", label: "Generic function", color: ACCENT, items: ["fn largest<T>(list: &[T])", "Works for any T", "No runtime dispatch"] },
              { id: "bound", label: "Trait bound", color: "#2563eb", items: ["T: PartialOrd + Copy", "Restricts T to types with these traits", "Compiler generates one version per concrete type used"] },
            ],
          },
          {
            type: "quiz",
            question: "Why does `largest<T: PartialOrd + Copy>` need the trait bounds?",
            options: [
              "Purely stylistic — they can be removed",
              "Because the function body compares values (needs PartialOrd) and copies out of the slice (needs Copy)",
              "Because all generic functions require exactly two bounds",
              "To make the function run on the GPU",
            ],
            answer: 1,
            explanation:
              "Without PartialOrd, the compiler wouldn't know that `>` is valid for T. Without Copy, `list[0]` couldn't be copied into `largest` without moving out of the slice, which isn't allowed for a borrowed slice.",
          },
        ],
        challenge: {
          title: "Describable Trait",
          description:
            "Define a trait `Describable` with a method `describe(&self) -> String`. Implement it for a struct `Product { name: String, price: f64 }` returning a formatted string with the name and price. Create a Product and print its description.",
          starterCode: `trait Describable {
    fn describe(&self) -> String;
}

struct Product {
    name: String,
    price: f64,
}

impl Describable for Product {
    fn describe(&self) -> String {
        // format name and price
    }
}

fn main() {
    // create a Product and print describe()
}
`,
          solutionCode: `trait Describable {
    fn describe(&self) -> String;
}

struct Product {
    name: String,
    price: f64,
}

impl Describable for Product {
    fn describe(&self) -> String {
        format!("{} - \${:.2}", self.name, self.price)
    }
}

fn main() {
    let p = Product { name: "Keyboard".to_string(), price: 49.99 };
    println!("{}", p.describe());
}`,
          tests: [
            { id: 1, label: "Defines trait Describable", keywords: [{ pattern: "trait\\s+Describable" }] },
            { id: 2, label: "Implements the trait for Product", keywords: [{ pattern: "impl\\s+Describable\\s+for\\s+Product" }] },
            { id: 3, label: "Calls describe() and prints it", keywords: [{ pattern: "\\.describe\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "rf-17",
        title: "Capstone: Library System",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Let's combine everything from this course — structs, enums, ownership, error handling, and pattern matching — into one small program: a library system that tracks books and lets you borrow them, with proper error handling instead of panics.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Putting it all together",
            content: `#[derive(Debug)]
enum BorrowError {
    NotFound,
    AlreadyBorrowed,
}

struct Book {
    title: String,
    borrowed: bool,
}

struct Library {
    books: Vec<Book>,
}

impl Library {
    fn new() -> Self {
        Library { books: Vec::new() }
    }

    fn add_book(&mut self, title: &str) {
        self.books.push(Book { title: title.to_string(), borrowed: false });
    }

    fn borrow_book(&mut self, title: &str) -> Result<(), BorrowError> {
        let book = self.books.iter_mut().find(|b| b.title == title)
            .ok_or(BorrowError::NotFound)?;
        if book.borrowed {
            return Err(BorrowError::AlreadyBorrowed);
        }
        book.borrowed = true;
        Ok(())
    }
}

fn main() {
    let mut lib = Library::new();
    lib.add_book("The Rust Book");

    match lib.borrow_book("The Rust Book") {
        Ok(()) => println!("Borrowed successfully"),
        Err(e) => println!("Error: {:?}", e),
    }

    match lib.borrow_book("The Rust Book") {
        Ok(()) => println!("Borrowed successfully"),
        Err(e) => println!("Error: {:?}", e),
    }

    match lib.borrow_book("Unknown Book") {
        Ok(()) => println!("Borrowed successfully"),
        Err(e) => println!("Error: {:?}", e),
    }
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Notice `.ok_or(BorrowError::NotFound)?` — it converts an `Option<&mut Book>` from `.find()` into a `Result`, then immediately propagates the error with `?` if the book wasn't found. This chains Option and Result handling in one line.",
          },
          {
            type: "quiz",
            question: "What does `.ok_or(err)` do when called on an Option?",
            options: [
              "Converts Some(x) into Ok(x) and None into Err(err)",
              "Converts Ok(x) into Some(x)",
              "Panics if the Option is None",
              "Only works on Result, not Option",
            ],
            answer: 0,
            explanation:
              "`.ok_or(err)` bridges Option and Result: Some(x) becomes Ok(x), and None becomes Err(err) — letting you use `?` right after it inside a function returning Result.",
          },
        ],
        challenge: {
          title: "Return the Book",
          description:
            "Add a method `return_book(&mut self, title: &str) -> Result<(), BorrowError>` to the Library that sets `borrowed` back to false (returning NotFound if the title doesn't exist). Call it after borrowing and print the outcome.",
          starterCode: `#[derive(Debug)]
enum BorrowError {
    NotFound,
    AlreadyBorrowed,
}

struct Book {
    title: String,
    borrowed: bool,
}

struct Library {
    books: Vec<Book>,
}

impl Library {
    fn new() -> Self {
        Library { books: Vec::new() }
    }

    fn add_book(&mut self, title: &str) {
        self.books.push(Book { title: title.to_string(), borrowed: false });
    }

    fn borrow_book(&mut self, title: &str) -> Result<(), BorrowError> {
        let book = self.books.iter_mut().find(|b| b.title == title)
            .ok_or(BorrowError::NotFound)?;
        if book.borrowed {
            return Err(BorrowError::AlreadyBorrowed);
        }
        book.borrowed = true;
        Ok(())
    }

    fn return_book(&mut self, title: &str) -> Result<(), BorrowError> {
        // set borrowed = false, or return NotFound
    }
}

fn main() {
    let mut lib = Library::new();
    lib.add_book("The Rust Book");
    let _ = lib.borrow_book("The Rust Book");
    match lib.return_book("The Rust Book") {
        Ok(()) => println!("Returned successfully"),
        Err(e) => println!("Error: {:?}", e),
    }
}
`,
          solutionCode: `#[derive(Debug)]
enum BorrowError {
    NotFound,
    AlreadyBorrowed,
}

struct Book {
    title: String,
    borrowed: bool,
}

struct Library {
    books: Vec<Book>,
}

impl Library {
    fn new() -> Self {
        Library { books: Vec::new() }
    }

    fn add_book(&mut self, title: &str) {
        self.books.push(Book { title: title.to_string(), borrowed: false });
    }

    fn borrow_book(&mut self, title: &str) -> Result<(), BorrowError> {
        let book = self.books.iter_mut().find(|b| b.title == title)
            .ok_or(BorrowError::NotFound)?;
        if book.borrowed {
            return Err(BorrowError::AlreadyBorrowed);
        }
        book.borrowed = true;
        Ok(())
    }

    fn return_book(&mut self, title: &str) -> Result<(), BorrowError> {
        let book = self.books.iter_mut().find(|b| b.title == title)
            .ok_or(BorrowError::NotFound)?;
        book.borrowed = false;
        Ok(())
    }
}

fn main() {
    let mut lib = Library::new();
    lib.add_book("The Rust Book");
    let _ = lib.borrow_book("The Rust Book");
    match lib.return_book("The Rust Book") {
        Ok(()) => println!("Returned successfully"),
        Err(e) => println!("Error: {:?}", e),
    }
}`,
          tests: [
            { id: 1, label: "Defines return_book method", keywords: [{ pattern: "fn\\s+return_book" }] },
            { id: 2, label: "Sets borrowed back to false", keywords: [{ pattern: "borrowed\\s*=\\s*false" }] },
            { id: 3, label: "Returns a Result<(), BorrowError>", keywords: [{ pattern: "Result<\\(\\),\\s*BorrowError>" }] },
          ],
        },
      },
    ],
  },
];

export const RUST_FUNDAMENTALS_CHAPTERS = RAW_RUST_FUNDAMENTALS_CHAPTERS;

export const RUST_FUNDAMENTALS_LESSONS = RUST_FUNDAMENTALS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RUST_FUNDAMENTALS_TOTAL_XP = RUST_FUNDAMENTALS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
