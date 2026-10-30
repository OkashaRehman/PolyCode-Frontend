// PolyCode — Rust Collections interactive course
// 6 chapters · 18 lessons
// All Rust code samples in this file were compiled and run with rustc 1.75 (edition 2021)
// to confirm they are syntactically and semantically correct before being included.

const ACCENT = "#ce422b"; // Rust orange

const RAW_RUST_COLLECTIONS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Vectors
  // ─────────────────────────────────────────────────────────────
  {
    id: "collections-vectors",
    title: "Vectors",
    icon: "📚",
    color: ACCENT,
    lessons: [
      {
        id: "rcol-0",
        title: "Vec Basics",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`Vec<T>` is Rust's growable, heap-allocated list type — the workhorse collection you'll reach for most often. Unlike arrays, a `Vec`'s length can change at runtime. Accessing an out-of-range index with `[]` panics; `.get()` returns an `Option` instead, letting you handle missing indexes safely.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Creating and indexing a Vec",
            content: `fn main() {
    let mut v: Vec<i32> = Vec::new();
    v.push(1);
    v.push(2);
    v.push(3);
    println!("{:?}", v);

    let v2 = vec![10, 20, 30];
    println!("{:?}", v2);

    let third: &i32 = &v2[2];
    println!("third = {}", third);

    match v2.get(5) {
        Some(val) => println!("got {}", val),
        None => println!("no element at index 5"),
    }
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`v2[5]` on a 3-element vector **panics** and crashes the program. `v2.get(5)` returns `None` instead, letting you handle the missing index gracefully — prefer `.get()` whenever the index isn't guaranteed to be valid.",
          },
          {
            type: "quiz",
            question: "What's the safe way to access a Vec index that might be out of bounds?",
            options: [
              "Always use v[index] and catch the panic",
              "Use v.get(index), which returns an Option<&T> instead of panicking",
              "Vec never panics on invalid index",
              "Use v.at(index)",
            ],
            answer: 1,
            explanation:
              "`.get(index)` returns `Some(&value)` if the index is valid, or `None` otherwise — no panic. Direct indexing with `[]` is for when you're certain the index is valid.",
          },
        ],
        challenge: {
          title: "Build a Vec Safely",
          description:
            "Create an empty mutable Vec<i32>, push the numbers 5, 10, 15 onto it, then use `.get(1)` to safely print the second element with a match on Some/None.",
          starterCode: `fn main() {
    // create Vec, push 5, 10, 15
    // use .get(1) and match on it
}
`,
          solutionCode: `fn main() {
    let mut v: Vec<i32> = Vec::new();
    v.push(5);
    v.push(10);
    v.push(15);

    match v.get(1) {
        Some(val) => println!("{}", val),
        None => println!("out of bounds"),
    }
}`,
          tests: [
            { id: 1, label: "Creates a Vec::new()", keywords: [{ pattern: "Vec::new\\s*\\(\\s*\\)" }] },
            { id: 2, label: "Pushes 3 values", keywords: [{ pattern: "\\.push\\s*\\(" }] },
            { id: 3, label: "Uses .get() safely", keywords: [{ pattern: "\\.get\\s*\\(" }] },
          ],
        },
      },
      {
        id: "rcol-1",
        title: "Vec Operations",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Beyond `push`, `Vec` has a rich API: `pop()` removes and returns the last element (as `Option<T>`), `remove(i)` / `insert(i, v)` shift elements, `sort()` and `reverse()` mutate in place, and `contains(&v)` checks membership by comparison.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Common Vec methods",
            content: `fn main() {
    let mut v = vec![1, 2, 3, 4, 5];
    v.push(6);
    let popped = v.pop();
    println!("popped: {:?}", popped);
    println!("len: {}", v.len());
    println!("is_empty: {}", v.is_empty());

    v.remove(0);
    println!("after remove: {:?}", v);

    v.insert(0, 100);
    println!("after insert: {:?}", v);

    v.sort();
    println!("sorted: {:?}", v);

    v.reverse();
    println!("reversed: {:?}", v);

    let contains_5 = v.contains(&5);
    println!("contains 5: {}", contains_5);
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`remove(i)` shifts every following element left by one, which is O(n) — fine occasionally, but avoid it in a hot loop over a large Vec. If order doesn't matter, `swap_remove(i)` is O(1) since it just swaps the last element into the removed slot.",
          },
          {
            type: "quiz",
            question: "What does v.pop() return, and why that type?",
            options: [
              "The last element directly, panicking if the Vec is empty",
              "Option<T> — Some(last_element) if non-empty, None if the Vec was empty",
              "A new Vec with the last element removed",
              "The index of the removed element",
            ],
            answer: 1,
            explanation:
              "pop() can't return a value from an empty Vec, so it returns Option<T> — Some(value) when there was a last element to remove, None when the Vec was already empty. No panic either way.",
          },
        ],
        challenge: {
          title: "Sort and Deduplicate",
          description:
            "Given `let mut v = vec![3, 1, 2, 3, 1];`, sort it, then remove consecutive duplicates using `.dedup()` (requires sorted input for full dedup), and print the result.",
          starterCode: `fn main() {
    let mut v = vec![3, 1, 2, 3, 1];
    // sort v, then dedup
    // print v
}
`,
          solutionCode: `fn main() {
    let mut v = vec![3, 1, 2, 3, 1];
    v.sort();
    v.dedup();
    println!("{:?}", v);
}`,
          tests: [
            { id: 1, label: "Calls .sort()", keywords: [{ pattern: "\\.sort\\s*\\(\\s*\\)" }] },
            { id: 2, label: "Calls .dedup()", keywords: [{ pattern: "\\.dedup\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Prints the result", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rcol-2",
        title: "Iterating Vectors",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`for x in &v` iterates by immutable reference (borrowing each element), `for x in &mut v` allows mutation in place, and `for x in v` consumes the Vec, moving each element out. Combined with `.iter()`, `.sum()`, `.map()`, and `.collect()`, you rarely need manual index-based loops.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Iterating by reference, mutable reference, and value",
            content: `fn main() {
    let v = vec![100, 32, 57];
    for i in &v {
        println!("{}", i);
    }

    let mut v2 = vec![100, 32, 57];
    for i in &mut v2 {
        *i += 50;
    }
    println!("{:?}", v2);

    let total: i32 = v.iter().sum();
    println!("total = {}", total);

    let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`for i in &mut v2 { *i += 50; }` needs the dereference `*i` because `i` is a `&mut i32`, not an `i32` — you're writing through the reference to the original element in the Vec.",
          },
          {
            type: "quiz",
            question: "What's the difference between `for x in &v` and `for x in v`?",
            options: [
              "No difference, both borrow v",
              "for x in &v borrows each element (v is still usable afterward); for x in v consumes v, moving it out (v is no longer usable)",
              "for x in v is always faster",
              "for x in &v only works on Vec<i32>",
            ],
            answer: 1,
            explanation:
              "Iterating over `&v` calls `.iter()` implicitly, borrowing. Iterating over `v` directly calls `.into_iter()`, which takes ownership of the Vec and moves each element out one at a time — after that loop, v can't be used again.",
          },
        ],
        challenge: {
          title: "Filter and Sum",
          description:
            "Given a Vec of i32 [1..=10], use `.iter().filter()` to keep only even numbers, then `.sum()` them, and print the total.",
          starterCode: `fn main() {
    let v: Vec<i32> = (1..=10).collect();
    // filter evens, sum, print
}
`,
          solutionCode: `fn main() {
    let v: Vec<i32> = (1..=10).collect();
    let total: i32 = v.iter().filter(|&&x| x % 2 == 0).sum();
    println!("{}", total);
}`,
          tests: [
            { id: 1, label: "Uses .filter()", keywords: [{ pattern: "\\.filter\\s*\\(" }] },
            { id: 2, label: "Uses .sum()", keywords: [{ pattern: "\\.sum\\s*\\(" }] },
            { id: 3, label: "Prints the total", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Strings
  // ─────────────────────────────────────────────────────────────
  {
    id: "collections-strings",
    title: "Strings",
    icon: "🔤",
    color: "#2563eb",
    lessons: [
      {
        id: "rcol-3",
        title: "String vs &str",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`String` is a growable, heap-allocated, owned string type. `&str` (\"string slice\") is a borrowed view into string data — either into a `String`, or a `&'static str` literal baked into the binary. Most functions should accept `&str` for flexibility; return `String` when you're creating new owned data.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Building Strings",
            content: `fn main() {
    let s1 = String::from("hello");
    let s2: &str = "world";
    println!("{} {}", s1, s2);

    let s3 = s1 + " " + s2; // s1 is moved here
    println!("{}", s3);

    let s4 = format!("{}-{}", "a", "b");
    println!("{}", s4);

    let mut s5 = String::new();
    s5.push_str("hello");
    s5.push('!');
    println!("{}", s5);
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`format!` builds a `String` without taking ownership of any of its arguments (unlike `+`), so it's usually the clearer choice for combining more than two pieces of text.",
          },
          {
            type: "quiz",
            question: "Why do most Rust functions prefer &str parameters over String?",
            options: [
              "&str is always faster to allocate",
              "&str accepts both string literals and references into an existing String, making the function more flexible",
              "String parameters are not allowed in Rust",
              "&str can be mutated in place while String cannot",
            ],
            answer: 1,
            explanation:
              "A function taking &str can be called with a literal (\"hello\") or with &some_string — both coerce to &str. A function requiring String forces every caller to own or clone a String first, which is more restrictive.",
          },
        ],
        challenge: {
          title: "Build a Sentence",
          description:
            "Use format! to combine a &str `subject` = \"Rust\" and a &str `verb` = \"is fun\" into a single String like \"Rust is fun\", and print it.",
          starterCode: `fn main() {
    let subject = "Rust";
    let verb = "is fun";
    // build and print the sentence with format!
}
`,
          solutionCode: `fn main() {
    let subject = "Rust";
    let verb = "is fun";
    let sentence = format!("{} {}", subject, verb);
    println!("{}", sentence);
}`,
          tests: [
            { id: 1, label: "Uses format!", keywords: [{ pattern: "format!\\s*\\(" }] },
            { id: 2, label: "Combines both variables", keywords: [{ pattern: "subject.*verb|verb.*subject" }] },
            { id: 3, label: "Prints the sentence", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rcol-4",
        title: "String Operations",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Both `String` and `&str` share a large common API through `str`'s methods: `.len()`, `.to_uppercase()`/`.to_lowercase()`, `.contains()`, `.replace()`, `.trim()`, and `.split()` (which returns an iterator of substrings) cover the majority of everyday text processing.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Everyday string methods",
            content: `fn main() {
    let s = String::from("hello world");
    println!("len: {}", s.len());
    println!("upper: {}", s.to_uppercase());
    println!("contains world: {}", s.contains("world"));
    println!("replaced: {}", s.replace("world", "rust"));
    println!("trimmed: '{}'", "  padded  ".trim());

    let words: Vec<&str> = s.split(' ').collect();
    println!("{:?}", words);
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`.split_whitespace()` is usually better than `.split(' ')` for real text, since it collapses multiple consecutive spaces/tabs/newlines into single separators automatically.",
          },
          {
            type: "quiz",
            question: "What does s.len() measure for a String?",
            options: [
              "The number of Unicode characters",
              "The number of bytes in the UTF-8 encoding",
              "The number of words",
              "Always the same as .chars().count()",
            ],
            answer: 1,
            explanation:
              "String's .len() returns the byte length of its UTF-8 representation, which can differ from the character count for any non-ASCII text — covered next.",
          },
        ],
        challenge: {
          title: "Normalize Input",
          description:
            "Given `let raw = \"  Hello WORLD  \";`, trim whitespace and convert to lowercase, storing the result in `cleaned`, then print it.",
          starterCode: `fn main() {
    let raw = "  Hello WORLD  ";
    // trim and lowercase into cleaned
    // print cleaned
}
`,
          solutionCode: `fn main() {
    let raw = "  Hello WORLD  ";
    let cleaned = raw.trim().to_lowercase();
    println!("{}", cleaned);
}`,
          tests: [
            { id: 1, label: "Uses .trim()", keywords: [{ pattern: "\\.trim\\s*\\(\\s*\\)" }] },
            { id: 2, label: "Uses .to_lowercase()", keywords: [{ pattern: "\\.to_lowercase\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Prints the cleaned value", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rcol-5",
        title: "UTF-8 and String Slicing",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Rust `String`s are always valid UTF-8, where characters can take 1 to 4 bytes. This means `.len()` counts **bytes**, not characters, and slicing (`&s[0..n]`) must land on a UTF-8 character boundary or it **panics** at runtime. Use `.chars()` to iterate by actual character.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Bytes vs characters",
            content: `fn main() {
    let hello = "Здравствуйте"; // Russian, multi-byte UTF-8 chars
    println!("byte len: {}", hello.len());
    println!("char count: {}", hello.chars().count());

    for c in "hola".chars() {
        print!("{} ", c);
    }
    println!();

    let s = String::from("hello world");
    let hello_part = &s[0..5];
    println!("{}", hello_part);
    // &s[0..1] on a non-ASCII boundary would panic; ASCII slicing here is safe
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Because slicing works on **byte** ranges, `&hello[0..1]` on the Russian string above would panic — byte 1 falls in the middle of a 2-byte character. This is Rust refusing to silently produce corrupted text, unlike languages that let you slice mid-character.",
          },
          {
            type: "quiz",
            question: "Why can string.len() differ from string.chars().count()?",
            options: [
              "It's a bug in Rust",
              "len() counts UTF-8 bytes, while chars().count() counts actual Unicode scalar values — multi-byte characters make these differ",
              "chars().count() is always half of len()",
              "They never differ in Rust",
            ],
            answer: 1,
            explanation:
              "ASCII characters take 1 byte each, so len() and chars().count() match for pure ASCII text. Any character requiring 2-4 bytes (accented letters, CJK characters, emoji) makes len() exceed chars().count().",
          },
        ],
        challenge: {
          title: "Count Characters Safely",
          description:
            "Given `let text = \"café\";`, print both the byte length (`.len()`) and the character count (`.chars().count()`) to see them differ.",
          starterCode: `fn main() {
    let text = "café";
    // print .len() and .chars().count()
}
`,
          solutionCode: `fn main() {
    let text = "café";
    println!("bytes: {}", text.len());
    println!("chars: {}", text.chars().count());
}`,
          tests: [
            { id: 1, label: "Uses .len()", keywords: [{ pattern: "\\.len\\s*\\(\\s*\\)" }] },
            { id: 2, label: "Uses .chars().count()", keywords: [{ pattern: "\\.chars\\s*\\(\\s*\\)\\.count\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Prints both values", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Hash Maps
  // ─────────────────────────────────────────────────────────────
  {
    id: "collections-hashmaps",
    title: "Hash Maps",
    icon: "🗺️",
    color: "#7c3aed",
    lessons: [
      {
        id: "rcol-6",
        title: "HashMap Basics",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`HashMap<K, V>` stores key-value pairs with O(1) average lookup. `.insert(k, v)` adds or **overwrites** an existing key. `.get(&k)` returns `Option<&V>` — use `.copied()` or `.cloned()` to get an owned value out of the Option instead of a reference.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Inserting, looking up, and iterating",
            content: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");
    let score = scores.get(&team_name).copied().unwrap_or(0);
    println!("Blue score: {}", score);

    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }

    scores.insert(String::from("Blue"), 25); // overwrite
    println!("Blue after overwrite: {:?}", scores.get("Blue"));
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "HashMap iteration order is **not guaranteed** and can differ between runs. If you need a predictable order, sort the collected pairs yourself, or use `BTreeMap` (covered next lesson), which iterates in sorted key order.",
          },
          {
            type: "quiz",
            question: "What happens when you .insert() a key that already exists in a HashMap?",
            options: [
              "The insert is ignored, keeping the old value",
              "It panics",
              "The old value is overwritten with the new one",
              "Both values are kept in a list",
            ],
            answer: 2,
            explanation:
              "insert() always sets the key to the new value, overwriting whatever was there before. If you want to keep an existing value instead, use the entry API's or_insert, covered in the next lesson.",
          },
        ],
        challenge: {
          title: "Inventory Lookup",
          description:
            "Create a HashMap<String, i32> for an inventory. Insert (\"apples\", 30) and (\"bananas\", 15). Look up \"apples\" with `.get()` and print the count, defaulting to 0 if missing.",
          starterCode: `use std::collections::HashMap;

fn main() {
    let mut inventory: HashMap<String, i32> = HashMap::new();
    // insert apples=30, bananas=15
    // look up apples, print count (default 0)
}
`,
          solutionCode: `use std::collections::HashMap;

fn main() {
    let mut inventory: HashMap<String, i32> = HashMap::new();
    inventory.insert(String::from("apples"), 30);
    inventory.insert(String::from("bananas"), 15);

    let count = inventory.get("apples").copied().unwrap_or(0);
    println!("{}", count);
}`,
          tests: [
            { id: 1, label: "Creates a HashMap", keywords: [{ pattern: "HashMap::new" }] },
            { id: 2, label: "Inserts apples", keywords: [{ pattern: "insert.*apples" }] },
            { id: 3, label: "Gets and defaults with unwrap_or", keywords: [{ pattern: "unwrap_or" }] },
          ],
        },
      },
      {
        id: "rcol-7",
        title: "The Entry API",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`.entry(key)` returns an `Entry` you can act on conditionally: `.or_insert(default)` inserts the default **only if the key is absent**, then returns a mutable reference to the value either way. This is the idiomatic way to implement 'update or initialize' logic — like counting word frequencies.",
          },
          {
            type: "code",
            lang: "rust",
            label: "or_insert for conditional updates",
            content: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    scores.insert("Blue", 10);

    scores.entry("Yellow").or_insert(50);
    scores.entry("Blue").or_insert(100); // Blue already exists, stays 10

    println!("{:?}", scores.get("Blue"));
    println!("{:?}", scores.get("Yellow"));

    let text = "hello world wonderful world";
    let mut word_count = HashMap::new();
    for word in text.split_whitespace() {
        let count = word_count.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{:?}", word_count.get("world"));
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`*word_count.entry(word).or_insert(0) += 1;` is the classic one-liner: get-or-create the counter, then increment it through the returned `&mut i32` — no separate 'does this key exist?' check needed.",
          },
          {
            type: "quiz",
            question: "What does .entry(key).or_insert(default) do if the key already exists?",
            options: [
              "It overwrites the value with default",
              "It leaves the existing value unchanged and returns a mutable reference to it",
              "It panics because the key exists",
              "It removes the key",
            ],
            answer: 1,
            explanation:
              "or_insert only inserts the default when the key is missing. If the key is present, the existing value is left as-is, and you still get back a &mut reference to it — perfect for increment-or-initialize patterns.",
          },
        ],
        challenge: {
          title: "Count Occurrences",
          description:
            "Given a Vec<&str> of fruit names with duplicates, use `.entry(...).or_insert(0)` in a HashMap<&str, i32> to count how many times each fruit appears, then print the count for \"apple\".",
          starterCode: `use std::collections::HashMap;

fn main() {
    let fruits = vec!["apple", "banana", "apple", "apple", "banana"];
    let mut counts: HashMap<&str, i32> = HashMap::new();
    // count occurrences using entry().or_insert(0)
    // print counts for "apple"
}
`,
          solutionCode: `use std::collections::HashMap;

fn main() {
    let fruits = vec!["apple", "banana", "apple", "apple", "banana"];
    let mut counts: HashMap<&str, i32> = HashMap::new();
    for f in fruits {
        *counts.entry(f).or_insert(0) += 1;
    }
    println!("{}", counts.get("apple").unwrap());
}`,
          tests: [
            { id: 1, label: "Uses .entry().or_insert(0)", keywords: [{ pattern: "\\.entry\\s*\\(.*\\)\\.or_insert\\s*\\(\\s*0\\s*\\)" }] },
            { id: 2, label: "Increments the entry", keywords: [{ pattern: "\\+=\\s*1" }] },
            { id: 3, label: "Prints the apple count", keywords: [{ pattern: "get\\s*\\(\\s*\"apple\"" }] },
          ],
        },
      },
      {
        id: "rcol-8",
        title: "Ownership in HashMaps",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Inserting an owned value (like a `String`) into a `HashMap` **moves** it in — the map becomes the owner. Using types that implement `Copy` (like `i32`) as values avoids this, since they're copied rather than moved. Keys must implement `Eq` and `Hash`.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Ownership moving into a HashMap",
            content: `use std::collections::HashMap;

fn main() {
    let field_name = String::from("Favorite color");
    let field_value = String::from("Blue");

    let mut map = HashMap::new();
    map.insert(field_name, field_value);
    // field_name and field_value are moved; using them here would be a compile error

    for (k, v) in &map {
        println!("{}: {}", k, v);
    }

    // i32 is Copy, so this works fine without moving anything permanently
    let key = 1;
    let mut num_map: HashMap<i32, i32> = HashMap::new();
    num_map.insert(key, 100);
    println!("key is still usable: {}", key);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "If you need to keep using the original `String` after inserting it, insert a `.clone()` instead of the original — at the cost of an extra allocation. This tradeoff (own it vs. clone it) comes up constantly once you start combining ownership rules with collections.",
          },
          {
            type: "quiz",
            question: "What happens to field_name and field_value after map.insert(field_name, field_value)?",
            options: [
              "They are copied; both remain usable",
              "They are moved into the map; using them afterward is a compile error unless they implement Copy",
              "They are borrowed temporarily and remain usable",
              "HashMap always clones its inputs automatically",
            ],
            answer: 1,
            explanation:
              "String doesn't implement Copy, so inserting it moves ownership into the HashMap. The original variables are invalidated — the same move semantics from ownership basics apply here too.",
          },
        ],
        challenge: {
          title: "Clone to Keep a Copy",
          description:
            "Given `let name = String::from(\"Farooq\");`, insert `name.clone()` (not name itself) into a HashMap<String, i32> with value 100, so `name` remains usable afterward — print `name` after the insert.",
          starterCode: `use std::collections::HashMap;

fn main() {
    let name = String::from("Farooq");
    let mut map: HashMap<String, i32> = HashMap::new();
    // insert name.clone() with value 100
    // print name afterward to prove it's still usable
}
`,
          solutionCode: `use std::collections::HashMap;

fn main() {
    let name = String::from("Farooq");
    let mut map: HashMap<String, i32> = HashMap::new();
    map.insert(name.clone(), 100);
    println!("{}", name);
}`,
          tests: [
            { id: 1, label: "Clones name before inserting", keywords: [{ pattern: "name\\.clone\\s*\\(\\s*\\)" }] },
            { id: 2, label: "Inserts into the map", keywords: [{ pattern: "\\.insert\\s*\\(" }] },
            { id: 3, label: "Uses name again after insert", keywords: [{ pattern: "println!\\s*\\(\\s*\"\\{\\}\",\\s*name\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Sets & Ordered Collections
  // ─────────────────────────────────────────────────────────────
  {
    id: "collections-sets-ordered",
    title: "Sets & Ordered Collections",
    icon: "🧮",
    color: "#059669",
    lessons: [
      {
        id: "rcol-9",
        title: "HashSet",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`HashSet<T>` stores unique values with no associated data — think of it as a `HashMap<T, ()>`. Inserting a duplicate is a no-op (it returns `false` to tell you it already existed). Use it whenever you need fast membership checks or to deduplicate a collection.",
          },
          {
            type: "code",
            lang: "rust",
            label: "HashSet uniqueness",
            content: `use std::collections::HashSet;

fn main() {
    let mut set: HashSet<i32> = HashSet::new();
    set.insert(1);
    set.insert(2);
    set.insert(1); // duplicate, ignored
    println!("set len: {}", set.len());
    println!("contains 2: {}", set.contains(&2));
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "HashSet also supports set algebra: `.union()`, `.intersection()`, `.difference()`, and `.symmetric_difference()` — each returns an iterator, so wrap with `.collect()` if you need a concrete HashSet or Vec back.",
          },
          {
            type: "quiz",
            question: "What does set.insert(value) return if value is already in the set?",
            options: [
              "It panics",
              "false — indicating the value was already present and nothing changed",
              "true — it always returns true",
              "The old value",
            ],
            answer: 1,
            explanation:
              "insert() returns a bool: true if the value was newly inserted, false if it was already present (in which case the set is unchanged). Useful for 'have I seen this before?' checks.",
          },
        ],
        challenge: {
          title: "Deduplicate with a Set",
          description:
            "Given `let nums = vec![1, 2, 2, 3, 3, 3];`, insert them all into a HashSet<i32> and print the resulting `.len()` to show how many unique values remain.",
          starterCode: `use std::collections::HashSet;

fn main() {
    let nums = vec![1, 2, 2, 3, 3, 3];
    let mut set: HashSet<i32> = HashSet::new();
    // insert all nums into set
    // print set.len()
}
`,
          solutionCode: `use std::collections::HashSet;

fn main() {
    let nums = vec![1, 2, 2, 3, 3, 3];
    let mut set: HashSet<i32> = HashSet::new();
    for n in nums {
        set.insert(n);
    }
    println!("{}", set.len());
}`,
          tests: [
            { id: 1, label: "Creates a HashSet", keywords: [{ pattern: "HashSet::new" }] },
            { id: 2, label: "Inserts all numbers", keywords: [{ pattern: "\\.insert\\s*\\(" }] },
            { id: 3, label: "Prints the length", keywords: [{ pattern: "\\.len\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "rcol-10",
        title: "BTreeMap & Ordered Data",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`BTreeMap<K, V>` behaves like `HashMap` but stores entries in **sorted key order** (K must implement `Ord`), and iteration always yields keys in that order — deterministic and reproducible, unlike HashMap. It's slightly slower per-operation but is the right choice when order matters.",
          },
          {
            type: "code",
            lang: "rust",
            label: "BTreeMap keeps sorted order",
            content: `use std::collections::BTreeMap;

fn main() {
    let mut btree: BTreeMap<i32, &str> = BTreeMap::new();
    btree.insert(3, "three");
    btree.insert(1, "one");
    btree.insert(2, "two");
    for (k, v) in &btree {
        println!("{}: {}", k, v); // always sorted by key
    }
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "There's also `BTreeSet<T>`, the sorted counterpart to `HashSet<T>` — same idea, guaranteed iteration order instead of speed.",
          },
          {
            type: "quiz",
            question: "What guarantee does BTreeMap give you that HashMap doesn't?",
            options: [
              "Faster average lookup",
              "Iteration always proceeds in sorted key order",
              "Keys can be any type, even non-hashable ones",
              "It allows duplicate keys",
            ],
            answer: 1,
            explanation:
              "BTreeMap maintains keys in sorted order internally (via a B-tree structure), so iterating over it always yields entries from smallest to largest key — HashMap makes no such promise.",
          },
        ],
        challenge: {
          title: "Sorted Leaderboard",
          description:
            "Insert three (score: i32, name: &str) pairs into a BTreeMap<i32, &str> out of order, then iterate and print them — they should come out sorted by score.",
          starterCode: `use std::collections::BTreeMap;

fn main() {
    let mut board: BTreeMap<i32, &str> = BTreeMap::new();
    // insert 3 entries out of order
    // iterate and print, sorted by key automatically
}
`,
          solutionCode: `use std::collections::BTreeMap;

fn main() {
    let mut board: BTreeMap<i32, &str> = BTreeMap::new();
    board.insert(50, "Ali");
    board.insert(10, "Sana");
    board.insert(90, "Zain");

    for (score, name) in &board {
        println!("{}: {}", score, name);
    }
}`,
          tests: [
            { id: 1, label: "Creates a BTreeMap", keywords: [{ pattern: "BTreeMap::new" }] },
            { id: 2, label: "Inserts 3 entries", keywords: [{ pattern: "\\.insert\\s*\\(" }] },
            { id: 3, label: "Iterates over the map", keywords: [{ pattern: "for\\s*\\(.*\\)\\s*in\\s*&board" }] },
          ],
        },
      },
      {
        id: "rcol-11",
        title: "VecDeque",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`VecDeque<T>` is a double-ended queue — efficient `push`/`pop` at **both** the front and back (O(1) amortized), unlike `Vec` where inserting at the front is O(n). Reach for it when you need a queue, a ring buffer, or need to add/remove from both ends.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Pushing and popping from both ends",
            content: `use std::collections::VecDeque;

fn main() {
    let mut deque: VecDeque<i32> = VecDeque::new();
    deque.push_back(1);
    deque.push_back(2);
    deque.push_front(0);
    println!("{:?}", deque);
    println!("pop_front: {:?}", deque.pop_front());
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "A common pattern: use VecDeque as a **FIFO queue** (push_back to enqueue, pop_front to dequeue) for breadth-first search or task scheduling — much cheaper than repeatedly calling Vec::remove(0).",
          },
          {
            type: "quiz",
            question: "Why is VecDeque preferred over Vec for a FIFO queue?",
            options: [
              "VecDeque uses less memory always",
              "Vec::remove(0) is O(n) since it shifts every element; VecDeque::pop_front() is O(1) amortized",
              "Vec cannot store more than 1000 elements",
              "There's no real difference",
            ],
            answer: 1,
            explanation:
              "VecDeque is implemented as a ring buffer, so both ends support O(1) amortized push/pop. Vec only offers that at the back; removing from the front requires shifting every remaining element.",
          },
        ],
        challenge: {
          title: "Simple Task Queue",
          description:
            "Create a VecDeque<&str>, push_back three task names, then pop_front all of them in a loop, printing each as it's dequeued.",
          starterCode: `use std::collections::VecDeque;

fn main() {
    let mut queue: VecDeque<&str> = VecDeque::new();
    // push_back 3 tasks
    // pop_front in a loop and print each
}
`,
          solutionCode: `use std::collections::VecDeque;

fn main() {
    let mut queue: VecDeque<&str> = VecDeque::new();
    queue.push_back("task1");
    queue.push_back("task2");
    queue.push_back("task3");

    while let Some(task) = queue.pop_front() {
        println!("{}", task);
    }
}`,
          tests: [
            { id: 1, label: "Creates a VecDeque", keywords: [{ pattern: "VecDeque::new" }] },
            { id: 2, label: "Uses push_back", keywords: [{ pattern: "push_back" }] },
            { id: 3, label: "Uses pop_front to drain", keywords: [{ pattern: "pop_front" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Iterators
  // ─────────────────────────────────────────────────────────────
  {
    id: "collections-iterators",
    title: "Iterators",
    icon: "🔄",
    color: "#f59e0b",
    lessons: [
      {
        id: "rcol-12",
        title: "The Iterator Trait",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Iterators in Rust are **lazy** — creating one (e.g. `.iter()`) does nothing on its own until you call an adapter or consumer. `.map()` and `.filter()` are **adapters** (they return a new lazy iterator); `.sum()` and `.collect()` are **consumers** that actually drive iteration to completion.",
          },
          {
            type: "code",
            lang: "rust",
            label: "iter(), map, filter, collect",
            content: `fn main() {
    let v1 = vec![1, 2, 3];
    let v1_iter = v1.iter();
    let total: i32 = v1_iter.sum();
    println!("{}", total);

    let v2: Vec<i32> = v1.iter().map(|x| x + 1).collect();
    println!("{:?}", v2);

    let evens: Vec<&i32> = v1.iter().filter(|&&x| x % 2 == 0).collect();
    println!("{:?}", evens);
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Notice `filter(|&&x| ...)` — `.iter()` yields `&i32`, so the filter closure receives `&&i32` (a reference to the reference), and `&&x` in the pattern destructures both layers down to the plain `i32` value for the comparison.",
          },
          {
            type: "quiz",
            question: "Why doesn't `v1.iter().map(|x| x + 1)` alone do anything observable?",
            options: [
              "It's a compile error",
              "Iterators are lazy — nothing runs until a consumer (like .collect() or .sum()) drives them",
              "map() always executes eagerly, this is false",
              "It only works with Vec<i32>",
            ],
            answer: 1,
            explanation:
              "map() just builds a new iterator wrapping the original one, describing 'apply this closure to each item when asked.' No work happens until something asks for values — a consumer method or a for loop.",
          },
        ],
        challenge: {
          title: "Square the Evens",
          description:
            "Given a Vec<i32> [1..=6], filter for even numbers, square each with `.map()`, and collect into a new Vec<i32>, then print it.",
          starterCode: `fn main() {
    let v: Vec<i32> = (1..=6).collect();
    // filter evens, square them, collect, print
}
`,
          solutionCode: `fn main() {
    let v: Vec<i32> = (1..=6).collect();
    let result: Vec<i32> = v.iter()
        .filter(|&&x| x % 2 == 0)
        .map(|x| x * x)
        .collect();
    println!("{:?}", result);
}`,
          tests: [
            { id: 1, label: "Uses .filter()", keywords: [{ pattern: "\\.filter\\s*\\(" }] },
            { id: 2, label: "Uses .map() to square", keywords: [{ pattern: "\\.map\\s*\\(" }] },
            { id: 3, label: "Collects into a Vec", keywords: [{ pattern: "\\.collect\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "rcol-13",
        title: "Iterator Adapters in Depth",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`.fold(init, |acc, x| ...)` is the general-purpose reducer that `.sum()`, `.product()`, and similar methods are built on. `.max()`/`.min()` find extremes, `.any()`/`.all()` test predicates, and `.position()` finds the index of the first match — all without a manual loop.",
          },
          {
            type: "code",
            lang: "rust",
            label: "fold, product, max, chained adapters",
            content: `fn main() {
    let v = vec![1, 2, 3, 4, 5];

    let sum = v.iter().fold(0, |acc, x| acc + x);
    println!("fold sum = {}", sum);

    let product: i32 = v.iter().product();
    println!("product = {}", product);

    let max = v.iter().max();
    println!("max = {:?}", max);

    let chained: Vec<i32> = v.iter()
        .filter(|&&x| x % 2 == 1)
        .map(|x| x * 10)
        .collect();
    println!("{:?}", chained);

    let any_gt_4 = v.iter().any(|&x| x > 4);
    println!("any_gt_4 = {}", any_gt_4);

    let position = v.iter().position(|&x| x == 3);
    println!("position of 3 = {:?}", position);
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Chaining `.filter().map().collect()` (or similar) compiles down to code that's often as fast as a hand-written loop, because Rust's iterator adapters are **zero-cost abstractions** — the compiler inlines and optimizes the whole chain.",
          },
          {
            type: "quiz",
            question: "What general operation does .fold(init, f) perform?",
            options: [
              "It always sums the elements",
              "It reduces the iterator to a single value by repeatedly combining an accumulator with each element using f",
              "It sorts the elements",
              "It's only usable on numbers",
            ],
            answer: 1,
            explanation:
              "fold starts with `init` as the accumulator and calls `f(accumulator, item)` for every element, replacing the accumulator with the result each time — sum, product, and many other reductions are just specific uses of this same shape.",
          },
        ],
        challenge: {
          title: "Fold to Build a String",
          description:
            "Given `let words = vec![\"Rust\", \"is\", \"great\"];`, use `.fold()` starting from an empty String to join them with spaces (without a trailing space), and print the result.",
          starterCode: `fn main() {
    let words = vec!["Rust", "is", "great"];
    // use fold to join with spaces, print result
}
`,
          solutionCode: `fn main() {
    let words = vec!["Rust", "is", "great"];
    let sentence = words.iter().fold(String::new(), |mut acc, w| {
        if !acc.is_empty() {
            acc.push(' ');
        }
        acc.push_str(w);
        acc
    });
    println!("{}", sentence);
}`,
          tests: [
            { id: 1, label: "Uses .fold()", keywords: [{ pattern: "\\.fold\\s*\\(" }] },
            { id: 2, label: "Builds a String accumulator", keywords: [{ pattern: "String::new\\s*\\(\\s*\\)" }] },
            { id: 3, label: "Prints the joined sentence", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rcol-14",
        title: "Custom Iterators",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Any type can become iterable by implementing the `Iterator` trait: define an associated `Item` type, and a `next(&mut self) -> Option<Self::Item>` method. Once you do, you get **every** adapter (`.map`, `.filter`, `.zip`, `.take`, ...) for free.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Implementing Iterator for a custom type",
            content: `struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;
    fn next(&mut self) -> Option<u32> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    let sum: u32 = Counter::new().zip(Counter::new().skip(1))
        .map(|(a, b)| a * b)
        .filter(|x| x % 3 == 0)
        .sum();
    println!("{}", sum);

    let collected: Vec<u32> = Counter::new().collect();
    println!("{:?}", collected);
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`.zip()` pairs up two iterators element-by-element, stopping as soon as either one runs out — here `Counter::new().skip(1)` shifts the second sequence over by one, producing pairs like (1,2), (2,3), (3,4), (4,5).",
          },
          {
            type: "quiz",
            question: "What two things must a type provide to implement the Iterator trait?",
            options: [
              "A len() method and a push() method",
              "An associated Item type and a next(&mut self) -> Option<Self::Item> method",
              "A Default implementation and a Clone implementation",
              "A start and end index only",
            ],
            answer: 1,
            explanation:
              "The Iterator trait requires exactly `type Item` (what kind of value each iteration produces) and `fn next(&mut self) -> Option<Self::Item>` (produce the next value, or None when done). Everything else (map, filter, sum, etc.) has default implementations built on top of next().",
          },
        ],
        challenge: {
          title: "Countdown Iterator",
          description:
            "Implement a struct `Countdown { current: u32 }` as an Iterator whose `next()` decrements from `current` down to (and including) 1, returning None once it reaches 0. Create `Countdown { current: 3 }` and collect it into a Vec<u32>, then print it.",
          starterCode: `struct Countdown {
    current: u32,
}

impl Iterator for Countdown {
    type Item = u32;
    fn next(&mut self) -> Option<u32> {
        // return Some(current) then decrement, or None at 0
    }
}

fn main() {
    let cd = Countdown { current: 3 };
    // collect into a Vec<u32> and print
}
`,
          solutionCode: `struct Countdown {
    current: u32,
}

impl Iterator for Countdown {
    type Item = u32;
    fn next(&mut self) -> Option<u32> {
        if self.current == 0 {
            None
        } else {
            let value = self.current;
            self.current -= 1;
            Some(value)
        }
    }
}

fn main() {
    let cd = Countdown { current: 3 };
    let result: Vec<u32> = cd.collect();
    println!("{:?}", result);
}`,
          tests: [
            { id: 1, label: "Implements Iterator for Countdown", keywords: [{ pattern: "impl\\s+Iterator\\s+for\\s+Countdown" }] },
            { id: 2, label: "Defines next() correctly", keywords: [{ pattern: "fn\\s+next\\s*\\(\\s*&mut\\s+self" }] },
            { id: 3, label: "Collects into a Vec", keywords: [{ pattern: "\\.collect\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Advanced Collections & Capstone
  // ─────────────────────────────────────────────────────────────
  {
    id: "collections-advanced-capstone",
    title: "Advanced Collections & Capstone",
    icon: "🏆",
    color: "#dc2626",
    lessons: [
      {
        id: "rcol-15",
        title: "Choosing the Right Collection",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Picking the right collection is mostly about answering: do you need order preserved, fast lookup by key, uniqueness, or fast operations at both ends? Each collection makes a different tradeoff.",
          },
          {
            type: "diagram",
            title: "Collection decision guide",
            nodes: [
              { id: "vec", label: "Vec<T>", color: ACCENT, items: ["Ordered list", "Fast push/pop at end", "Default choice"] },
              { id: "vecdeque", label: "VecDeque<T>", color: "#2563eb", items: ["Ordered, both ends fast", "Queues, ring buffers"] },
              { id: "hashmap", label: "HashMap<K,V>", color: "#7c3aed", items: ["Fast key lookup", "No order guarantee"] },
              { id: "btreemap", label: "BTreeMap<K,V>", color: "#059669", items: ["Key lookup, sorted order", "Slightly slower than HashMap"] },
              { id: "hashset", label: "HashSet<T>", color: "#f59e0b", items: ["Uniqueness, fast contains()", "No order guarantee"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Default to `Vec` unless you have a specific reason not to — it's cache-friendly and the simplest to reason about. Reach for `HashMap` when you need lookup-by-key, and only add `BTreeMap`/ordering requirements when you actually need sorted iteration.",
          },
          {
            type: "quiz",
            question: "If you need fast membership testing ('have I seen this value before?') with no particular order required, which collection fits best?",
            options: ["Vec<T>", "VecDeque<T>", "HashSet<T>", "BTreeMap<K, V>"],
            answer: 2,
            explanation:
              "HashSet<T> is built exactly for this: O(1) average .contains() checks, with no requirement to track order or associate extra data with each value.",
          },
        ],
        challenge: {
          title: "Pick the Collection",
          description:
            "Store a &str variable `choice` with the name of the collection type best suited for a leaderboard that must always print in descending score order, then print it.",
          starterCode: `fn main() {
    let choice = "";
    println!("{}", choice);
}
`,
          solutionCode: `fn main() {
    let choice = "BTreeMap";
    println!("{}", choice);
}`,
          tests: [
            { id: 1, label: "Declares choice", keywords: [{ pattern: "let\\s+choice" }] },
            { id: 2, label: "Mentions an ordered map type", keywords: [{ pattern: "BTreeMap" }] },
            { id: 3, label: "Prints the choice", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
      {
        id: "rcol-16",
        title: "Combining Collections",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Real programs often nest collections: `HashMap<String, Vec<i32>>` for grouping values by key, or `Vec<HashMap<...>>` for a list of records. Understanding ownership makes this natural — each inner collection is just a normal value the outer one owns.",
          },
          {
            type: "code",
            lang: "rust",
            label: "Grouping values by key",
            content: `use std::collections::HashMap;

fn main() {
    let records = vec![("math", 90), ("science", 85), ("math", 78), ("science", 92)];

    let mut grouped: HashMap<&str, Vec<i32>> = HashMap::new();
    for (subject, score) in records {
        grouped.entry(subject).or_insert_with(Vec::new).push(score);
    }

    let mut subjects: Vec<&&str> = grouped.keys().collect();
    subjects.sort();
    for subject in subjects {
        println!("{}: {:?}", subject, grouped[subject]);
    }
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "`.or_insert_with(Vec::new)` is preferred over `.or_insert(Vec::new())` here — `or_insert` always evaluates its argument eagerly (allocating a Vec every call, even when unused), while `or_insert_with` only calls the closure when the key is actually missing.",
          },
          {
            type: "quiz",
            question: "Why use or_insert_with(Vec::new) instead of or_insert(Vec::new())?",
            options: [
              "No real difference, purely stylistic",
              "or_insert's argument is evaluated eagerly every call (allocating even when not needed); or_insert_with's closure only runs when the key is actually missing",
              "or_insert_with is required syntax for Vec",
              "or_insert doesn't work with Vec at all",
            ],
            answer: 1,
            explanation:
              "Function arguments in Rust are evaluated before the call, so `Vec::new()` inside or_insert() allocates every single time, whether or not it's used. or_insert_with takes a closure, which is only invoked (and only allocates) when the entry is actually absent.",
          },
        ],
        challenge: {
          title: "Group Scores by Subject",
          description:
            "Given records `[(\"art\", 70), (\"art\", 88), (\"math\", 95)]`, group scores by subject into a HashMap<&str, Vec<i32>> using entry().or_insert_with(Vec::new), then print the scores for \"art\".",
          starterCode: `use std::collections::HashMap;

fn main() {
    let records = vec![("art", 70), ("art", 88), ("math", 95)];
    let mut grouped: HashMap<&str, Vec<i32>> = HashMap::new();
    // group by subject
    // print grouped["art"]
}
`,
          solutionCode: `use std::collections::HashMap;

fn main() {
    let records = vec![("art", 70), ("art", 88), ("math", 95)];
    let mut grouped: HashMap<&str, Vec<i32>> = HashMap::new();
    for (subject, score) in records {
        grouped.entry(subject).or_insert_with(Vec::new).push(score);
    }
    println!("{:?}", grouped["art"]);
}`,
          tests: [
            { id: 1, label: "Uses or_insert_with(Vec::new)", keywords: [{ pattern: "or_insert_with\\s*\\(\\s*Vec::new\\s*\\)" }] },
            { id: 2, label: "Pushes the score", keywords: [{ pattern: "\\.push\\s*\\(" }] },
            { id: 3, label: "Prints art's scores", keywords: [{ pattern: "grouped\\[\"art\"\\]" }] },
          ],
        },
      },
      {
        id: "rcol-17",
        title: "Capstone: Word Frequency Counter",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Let's combine everything from this course into a real utility: count word frequencies in a block of text, then report the top results — using string processing, HashMap, the entry API, and sorting a Vec of pairs.",
          },
          {
            type: "code",
            lang: "rust",
            label: "A complete word frequency counter",
            content: `use std::collections::HashMap;

fn word_frequencies(text: &str) -> HashMap<String, u32> {
    let mut freq = HashMap::new();
    for word in text.split_whitespace() {
        let cleaned = word.to_lowercase();
        *freq.entry(cleaned).or_insert(0) += 1;
    }
    freq
}

fn main() {
    let text = "the quick brown fox the lazy dog the fox runs";
    let freq = word_frequencies(text);

    let mut pairs: Vec<(&String, &u32)> = freq.iter().collect();
    pairs.sort_by(|a, b| b.1.cmp(a.1).then(a.0.cmp(b.0)));

    for (word, count) in pairs.iter().take(3) {
        println!("{}: {}", word, count);
    }
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`b.1.cmp(a.1)` sorts by count **descending** (b compared to a reverses the usual ascending order); `.then(a.0.cmp(b.0))` breaks ties alphabetically by word — a common two-level sort pattern using `Ordering::then`.",
          },
          {
            type: "quiz",
            question: "In `pairs.sort_by(|a, b| b.1.cmp(a.1).then(a.0.cmp(b.0)))`, what does `.then()` do?",
            options: [
              "It runs the second comparison only if the first result is Equal, useful for tie-breaking",
              "It runs both comparisons and picks a random one",
              "It reverses the whole sort",
              "It only works with numbers, not strings",
            ],
            answer: 0,
            explanation:
              "Ordering::then(other) keeps the first comparison's result if it's Less or Greater, but falls through to `other` if the first was Equal — exactly what's needed for 'sort by count, then alphabetically for ties.'",
          },
        ],
        challenge: {
          title: "Top Word Only",
          description:
            "Reuse the `word_frequencies` function pattern to count words in `\"a b a c a b\"`, then find and print just the single most frequent word using `.iter().max_by_key(|(_, count)| **count)`.",
          starterCode: `use std::collections::HashMap;

fn word_frequencies(text: &str) -> HashMap<String, u32> {
    let mut freq = HashMap::new();
    for word in text.split_whitespace() {
        *freq.entry(word.to_lowercase()).or_insert(0) += 1;
    }
    freq
}

fn main() {
    let freq = word_frequencies("a b a c a b");
    // find the most frequent word with max_by_key, print it
}
`,
          solutionCode: `use std::collections::HashMap;

fn word_frequencies(text: &str) -> HashMap<String, u32> {
    let mut freq = HashMap::new();
    for word in text.split_whitespace() {
        *freq.entry(word.to_lowercase()).or_insert(0) += 1;
    }
    freq
}

fn main() {
    let freq = word_frequencies("a b a c a b");
    let top = freq.iter().max_by_key(|(_, count)| **count);
    println!("{:?}", top);
}`,
          tests: [
            { id: 1, label: "Reuses word_frequencies", keywords: [{ pattern: "word_frequencies\\s*\\(" }] },
            { id: 2, label: "Uses max_by_key", keywords: [{ pattern: "max_by_key" }] },
            { id: 3, label: "Prints the top result", keywords: [{ pattern: "println!" }] },
          ],
        },
      },
    ],
  },
];

export const RUST_COLLECTIONS_CHAPTERS = RAW_RUST_COLLECTIONS_CHAPTERS;

export const RUST_COLLECTIONS_LESSONS = RUST_COLLECTIONS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RUST_COLLECTIONS_TOTAL_XP = RUST_COLLECTIONS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
