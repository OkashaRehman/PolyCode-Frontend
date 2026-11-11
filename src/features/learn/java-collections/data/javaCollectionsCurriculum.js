// PolyCode — Java Collections interactive course
// 4 chapters · 16 lessons · real javac/java execution via backend
// All challenge classes MUST be named "Solution" (backend writes Solution.java)

const ACCENT = "#06b6d4";

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

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

export const JAVA_COLLECTIONS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Lists
  // ─────────────────────────────────────────────────────────────
  {
    id: "lists",
    title: "Lists",
    icon: "📋",
    color: ACCENT,
    lessons: [
      {
        id: "coll-0",
        title: "ArrayList Basics",
        xp: 20,
        theory: [
          text(
            "An **ArrayList** is a resizable array — unlike a plain array, it grows automatically as you add elements. It's the most commonly used `List` implementation in Java.",
            {
              label: "ArrayList basics",
              content: `import java.util.ArrayList;
import java.util.List;

List<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Cherry");

System.out.println(fruits);       // [Apple, Banana, Cherry]
System.out.println(fruits.get(1)); // Banana
System.out.println(fruits.size()); // 3`,
            },
          ),
          callout(
            "info",
            "Always program to the `List` interface (`List<String> x = new ArrayList<>();`) rather than the concrete type — it makes swapping implementations later trivial.",
          ),
          quiz(
            "What happens when you call add() past an ArrayList's current capacity?",
            [
              "It throws an exception",
              "It silently fails",
              "It automatically resizes to a larger internal array",
              "You must call resize() manually",
            ],
            2,
            "ArrayList manages its own backing array and grows it automatically (typically by 50%) when capacity is exceeded.",
          ),
        ],
        challenge: {
          title: "Build a Shopping List",
          description: [
            {
              type: "text",
              content:
                "Create an ArrayList of Strings, add three items (\"Milk\", \"Eggs\", \"Bread\"), then print the list and its size.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[Milk, Eggs, Bread]
Size: 3`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        // Create the list, add items, print list and size

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("Milk");
        items.add("Eggs");
        items.add("Bread");
        System.out.println(items);
        System.out.println("Size: " + items.size());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Creates an ArrayList",
              hint: "new ArrayList<>()",
              keywords: [{ pattern: "new\\s+ArrayList" }],
            },
            {
              id: 2,
              label: "Adds three items",
              hint: "items.add(...) three times",
              keywords: [{ pattern: "\\.add\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints the size",
              hint: "items.size()",
              keywords: [{ pattern: "\\.size\\s*\\(\\s*\\)" }],
            },
          ],
        },
      },
      {
        id: "coll-1",
        title: "LinkedList & the List Interface",
        xp: 20,
        theory: [
          text(
            "**LinkedList** implements `List` too, but stores elements as a chain of nodes instead of a backing array. It's faster for frequent insertions/removals in the middle, but slower for random access (`get(i)`).",
            {
              label: "ArrayList vs LinkedList",
              content: `List<Integer> arr = new ArrayList<>();  // fast get(i), slow middle insert
List<Integer> linked = new LinkedList<>(); // slow get(i), fast insert/remove

linked.addFirst(1);
linked.addLast(2);
System.out.println(linked); // [1, 2]`,
            },
          ),
          diagram("ArrayList vs LinkedList", [
            {
              id: "arraylist",
              label: "ArrayList",
              color: ACCENT,
              items: [
                "Backed by a resizable array",
                "O(1) random access via get(i)",
                "O(n) insert/remove in the middle",
              ],
            },
            {
              id: "linkedlist",
              label: "LinkedList",
              color: "#8b5cf6",
              items: [
                "Backed by doubly-linked nodes",
                "O(n) random access via get(i)",
                "O(1) insert/remove at known position",
              ],
            },
          ]),
          quiz(
            "Which List implementation is best for frequent insertions in the middle of a large list?",
            ["ArrayList", "LinkedList", "Both are equal", "Neither supports it"],
            1,
            "LinkedList doesn't need to shift elements — it just relinks nodes, making mid-list insertion O(1) once you have a reference to the position.",
          ),
        ],
        challenge: {
          title: "Deque Operations",
          description: [
            {
              type: "text",
              content:
                "Create a LinkedList of Integers. Use addFirst(1), addLast(2), addFirst(0), then print the list.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[0, 1, 2]`,
            },
          ],
          starterCode: `import java.util.LinkedList;

public class Solution {
    public static void main(String[] args) {
        // addFirst/addLast to build [0, 1, 2]

    }
}`,
          solutionCode: `import java.util.LinkedList;

public class Solution {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();
        list.addFirst(1);
        list.addLast(2);
        list.addFirst(0);
        System.out.println(list);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Creates a LinkedList",
              hint: "new LinkedList<>()",
              keywords: [{ pattern: "new\\s+LinkedList" }],
            },
            {
              id: 2,
              label: "Uses addFirst",
              hint: "list.addFirst(...)",
              keywords: [{ pattern: "\\.addFirst\\s*\\(" }],
            },
            {
              id: 3,
              label: "Uses addLast",
              hint: "list.addLast(...)",
              keywords: [{ pattern: "\\.addLast\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "coll-2",
        title: "Iterating & Modifying Lists",
        xp: 25,
        theory: [
          text(
            "You can loop over a `List` with a for-each loop, but if you need to **remove** elements while iterating, use an `Iterator` directly — modifying a list mid for-each throws `ConcurrentModificationException`.",
            {
              label: "Safe removal with Iterator",
              content: `List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));

Iterator<Integer> it = nums.iterator();
while (it.hasNext()) {
    int n = it.next();
    if (n % 2 == 0) it.remove(); // safe removal
}
System.out.println(nums); // [1, 3, 5]

// Or the modern way:
nums.removeIf(n -> n % 2 == 0);`,
            },
          ),
          callout(
            "warning",
            "`for (int n : list) { list.remove(n); }` will throw `ConcurrentModificationException`. Use `Iterator.remove()` or `removeIf()` instead.",
          ),
          quiz(
            "What's the safest way to remove elements matching a condition from a List?",
            [
              "A for-each loop calling list.remove()",
              "list.removeIf(condition)",
              "Setting elements to null",
              "Reassigning the list variable inside the loop",
            ],
            1,
            "removeIf() (Java 8+) safely removes all matching elements without risking ConcurrentModificationException.",
          ),
        ],
        challenge: {
          title: "Filter Out Negatives",
          description: [
            {
              type: "text",
              content:
                "Given a List of Integers [3, -1, 4, -5, 9, -2], use removeIf() to remove all negative numbers, then print the result.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[3, 4, 9]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(3, -1, 4, -5, 9, -2));
        // removeIf negative, then print

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(3, -1, 4, -5, 9, -2));
        nums.removeIf(n -> n < 0);
        System.out.println(nums);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses removeIf",
              hint: "nums.removeIf(...)",
              keywords: [{ pattern: "\\.removeIf\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses a lambda condition",
              hint: "n -> n < 0",
              keywords: [{ pattern: "->" }],
            },
          ],
        },
      },
      {
        id: "coll-3",
        title: "Arrays ↔ Lists Conversion",
        xp: 20,
        theory: [
          text(
            "Java gives you two-way bridges between arrays and Lists: `Arrays.asList()` and `List.toArray()`. Watch out — `Arrays.asList()` returns a **fixed-size** list backed by the array; you can't add/remove from it.",
            {
              label: "Converting between arrays and Lists",
              content: `String[] arr = {"a", "b", "c"};
List<String> fixed = Arrays.asList(arr);       // fixed-size view
List<String> mutable = new ArrayList<>(Arrays.asList(arr)); // resizable copy

Integer[] backToArray = List.of(1, 2, 3).toArray(new Integer[0]);
System.out.println(Arrays.toString(backToArray)); // [1, 2, 3]`,
            },
          ),
          quiz(
            "What happens if you call .add() on a list returned by Arrays.asList()?",
            [
              "It works normally",
              "It throws UnsupportedOperationException",
              "It silently ignores the call",
              "It grows the underlying array",
            ],
            1,
            "Arrays.asList() returns a fixed-size list view over the array — structural modifications like add()/remove() throw UnsupportedOperationException.",
          ),
        ],
        challenge: {
          title: "Array to Mutable List",
          description: [
            {
              type: "text",
              content:
                "Given int[] nums = {10, 20, 30}, convert it into a mutable List<Integer>, add 40 to it, then print the list.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[10, 20, 30, 40]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        Integer[] nums = {10, 20, 30};
        // Convert to a mutable list, add 40, print

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        Integer[] nums = {10, 20, 30};
        List<Integer> list = new ArrayList<>(Arrays.asList(nums));
        list.add(40);
        System.out.println(list);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Arrays.asList",
              hint: "Arrays.asList(nums)",
              keywords: [{ pattern: "Arrays\\.asList" }],
            },
            {
              id: 2,
              label: "Wraps in a mutable ArrayList",
              hint: "new ArrayList<>(...)",
              keywords: [{ pattern: "new\\s+ArrayList" }],
            },
            {
              id: 3,
              label: "Adds 40",
              hint: "list.add(40)",
              keywords: [{ pattern: "\\.add\\s*\\(\\s*40\\s*\\)" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Sets & Maps
  // ─────────────────────────────────────────────────────────────
  {
    id: "sets-maps",
    title: "Sets & Maps",
    icon: "🗂️",
    color: "#3b82f6",
    lessons: [
      {
        id: "coll-4",
        title: "HashSet Basics",
        xp: 20,
        theory: [
          text(
            "A **HashSet** stores unique elements with no guaranteed order, backed by a hash table. Adding a duplicate is a no-op — `add()` returns `false` if the element already exists.",
            {
              label: "HashSet basics",
              content: `Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("react");
tags.add("java"); // duplicate, ignored

System.out.println(tags.size());       // 2
System.out.println(tags.contains("java")); // true`,
            },
          ),
          callout(
            "info",
            "HashSet offers O(1) average-time `add`, `remove`, and `contains` — much faster than scanning a List for membership checks.",
          ),
          quiz(
            "What does HashSet.add() return when the element already exists in the set?",
            ["true", "false", "throws an exception", "null"],
            1,
            "add() returns false (and does nothing) if the set already contains an equal element, since Sets enforce uniqueness.",
          ),
        ],
        challenge: {
          title: "Unique Visitor Count",
          description: [
            {
              type: "text",
              content:
                "Given a List of visitor IDs [\"u1\", \"u2\", \"u1\", \"u3\", \"u2\"], put them into a HashSet and print the number of unique visitors.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Unique visitors: 3`,
            },
          ],
          starterCode: `import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public static void main(String[] args) {
        List<String> visits = List.of("u1", "u2", "u1", "u3", "u2");
        // Build a Set from visits, print unique count

    }
}`,
          solutionCode: `import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public static void main(String[] args) {
        List<String> visits = List.of("u1", "u2", "u1", "u3", "u2");
        Set<String> unique = new HashSet<>(visits);
        System.out.println("Unique visitors: " + unique.size());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Creates a HashSet",
              hint: "new HashSet<>(...)",
              keywords: [{ pattern: "new\\s+HashSet" }],
            },
            {
              id: 2,
              label: "Prints the size",
              hint: ".size()",
              keywords: [{ pattern: "\\.size\\s*\\(\\s*\\)" }],
            },
          ],
        },
      },
      {
        id: "coll-5",
        title: "HashMap Basics",
        xp: 20,
        theory: [
          text(
            "A **HashMap** stores key-value pairs with O(1) average lookup by key. Keys are unique; putting an existing key overwrites its value.",
            {
              label: "HashMap basics",
              content: `Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 30);
ages.put("Bob", 25);
ages.put("Alice", 31); // overwrites

System.out.println(ages.get("Alice"));        // 31
System.out.println(ages.getOrDefault("Cara", 0)); // 0
System.out.println(ages.containsKey("Bob"));  // true`,
            },
          ),
          diagram("Common Map methods", [
            {
              id: "read",
              label: "Reading",
              color: "#3b82f6",
              items: ["get(key)", "getOrDefault(key, default)", "containsKey(key)"],
            },
            {
              id: "write",
              label: "Writing",
              color: "#22c55e",
              items: ["put(key, value)", "putIfAbsent(key, value)", "remove(key)"],
            },
          ]),
          quiz(
            "What does map.getOrDefault(\"x\", 0) return if \"x\" is not a key in the map?",
            ["null", "0", "throws NoSuchElementException", "an empty string"],
            1,
            "getOrDefault returns the supplied default value (0 here) instead of null when the key is absent, avoiding a manual containsKey check.",
          ),
        ],
        challenge: {
          title: "Word Frequency Counter",
          description: [
            {
              type: "text",
              content:
                "Given the words [\"a\", \"b\", \"a\", \"c\", \"b\", \"a\"], build a HashMap<String, Integer> counting occurrences of each word, then print the count for \"a\".",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `a: 3`,
            },
          ],
          starterCode: `import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {
    public static void main(String[] args) {
        List<String> words = List.of("a", "b", "a", "c", "b", "a");
        // Count occurrences, print "a: <count>"

    }
}`,
          solutionCode: `import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {
    public static void main(String[] args) {
        List<String> words = List.of("a", "b", "a", "c", "b", "a");
        Map<String, Integer> counts = new HashMap<>();
        for (String w : words) {
            counts.put(w, counts.getOrDefault(w, 0) + 1);
        }
        System.out.println("a: " + counts.get("a"));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Creates a HashMap",
              hint: "new HashMap<>()",
              keywords: [{ pattern: "new\\s+HashMap" }],
            },
            {
              id: 2,
              label: "Uses getOrDefault to count",
              hint: "counts.getOrDefault(w, 0) + 1",
              keywords: [{ pattern: "getOrDefault" }],
            },
            {
              id: 3,
              label: "Puts updated counts back",
              hint: "counts.put(...)",
              keywords: [{ pattern: "\\.put\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "coll-6",
        title: "TreeMap & TreeSet",
        xp: 25,
        theory: [
          text(
            "**TreeMap** and **TreeSet** keep their elements sorted at all times (natural order, or via a custom `Comparator`), backed by a red-black tree — O(log n) operations instead of HashMap's O(1) average, in exchange for ordering.",
            {
              label: "Sorted collections",
              content: `TreeSet<Integer> sorted = new TreeSet<>(List.of(5, 1, 4, 2, 3));
System.out.println(sorted); // [1, 2, 3, 4, 5]
System.out.println(sorted.first()); // 1
System.out.println(sorted.last());  // 5

TreeMap<String, Integer> scores = new TreeMap<>();
scores.put("Zack", 90);
scores.put("Amy", 95);
System.out.println(scores); // {Amy=95, Zack=90} — sorted by key`,
            },
          ),
          quiz(
            "Why would you choose TreeMap over HashMap?",
            [
              "TreeMap is always faster",
              "TreeMap keeps entries sorted by key automatically",
              "TreeMap allows duplicate keys",
              "TreeMap uses less memory",
            ],
            1,
            "TreeMap trades HashMap's O(1) average speed for guaranteed key ordering (O(log n) operations) — useful whenever you need sorted iteration.",
          ),
        ],
        challenge: {
          title: "Sorted Leaderboard",
          description: [
            {
              type: "text",
              content:
                "Put scores {\"Zack\": 90, \"Amy\": 95, \"Ben\": 80} into a TreeMap and print it — it should come out sorted by name.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `{Amy=95, Ben=80, Zack=90}`,
            },
          ],
          starterCode: `import java.util.TreeMap;

public class Solution {
    public static void main(String[] args) {
        // Build a TreeMap with Zack=90, Amy=95, Ben=80, print it

    }
}`,
          solutionCode: `import java.util.TreeMap;

public class Solution {
    public static void main(String[] args) {
        TreeMap<String, Integer> scores = new TreeMap<>();
        scores.put("Zack", 90);
        scores.put("Amy", 95);
        scores.put("Ben", 80);
        System.out.println(scores);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Creates a TreeMap",
              hint: "new TreeMap<>()",
              keywords: [{ pattern: "new\\s+TreeMap" }],
            },
            {
              id: 2,
              label: "Puts three entries",
              hint: "scores.put(...)",
              keywords: [{ pattern: "\\.put\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "coll-7",
        title: "LinkedHashMap & Iteration Order",
        xp: 20,
        theory: [
          text(
            "**LinkedHashMap** preserves **insertion order** while still giving O(1) average lookups — a middle ground between HashMap (no order) and TreeMap (sorted order).",
            {
              label: "LinkedHashMap keeps insertion order",
              content: `Map<String, Integer> hash = new HashMap<>();
Map<String, Integer> linked = new LinkedHashMap<>();

for (String k : List.of("c", "a", "b")) {
    hash.put(k, 1);
    linked.put(k, 1);
}

System.out.println(hash);   // order not guaranteed
System.out.println(linked); // {c=1, a=1, b=1} — insertion order preserved`,
            },
          ),
          callout(
            "info",
            "LinkedHashMap can also be configured for access-order (LRU-style) — useful for building simple caches.",
          ),
          quiz(
            "Which Map implementation preserves the order elements were inserted in?",
            ["HashMap", "TreeMap", "LinkedHashMap", "None of them"],
            2,
            "LinkedHashMap maintains a doubly-linked list running through its entries in insertion order (or access order if configured), unlike HashMap.",
          ),
        ],
        challenge: {
          title: "Preserve Insertion Order",
          description: [
            {
              type: "text",
              content:
                "Insert keys \"c\", \"a\", \"b\" (each mapped to 1) into a LinkedHashMap<String,Integer>, then print it — order should match insertion.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `{c=1, a=1, b=1}`,
            },
          ],
          starterCode: `import java.util.LinkedHashMap;

public class Solution {
    public static void main(String[] args) {
        // Insert c, a, b into a LinkedHashMap, print it

    }
}`,
          solutionCode: `import java.util.LinkedHashMap;

public class Solution {
    public static void main(String[] args) {
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        map.put("c", 1);
        map.put("a", 1);
        map.put("b", 1);
        System.out.println(map);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Creates a LinkedHashMap",
              hint: "new LinkedHashMap<>()",
              keywords: [{ pattern: "new\\s+LinkedHashMap" }],
            },
            {
              id: 2,
              label: "Inserts c, a, b in order",
              hint: "map.put(\"c\", ...); map.put(\"a\", ...); map.put(\"b\", ...);",
              keywords: [{ pattern: "\\.put\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Sorting & Comparators
  // ─────────────────────────────────────────────────────────────
  {
    id: "sorting",
    title: "Sorting & Comparators",
    icon: "🔀",
    color: "#ef4444",
    lessons: [
      {
        id: "coll-8",
        title: "The Comparable Interface",
        xp: 20,
        theory: [
          text(
            "A class implements `Comparable<T>` to define its **natural ordering** via `compareTo()`. `Collections.sort()` uses this automatically.",
            {
              label: "Implementing Comparable",
              content: `class Person implements Comparable<Person> {
    String name;
    int age;
    Person(String name, int age) { this.name = name; this.age = age; }

    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age); // sort by age ascending
    }
    @Override public String toString() { return name + "(" + age + ")"; }
}

List<Person> people = new ArrayList<>(List.of(new Person("Bob", 25), new Person("Amy", 30)));
Collections.sort(people);
System.out.println(people); // [Bob(25), Amy(30)]`,
            },
          ),
          quiz(
            "What should compareTo() return when 'this' object is smaller than 'other'?",
            [
              "A positive number",
              "Zero",
              "A negative number",
              "true",
            ],
            2,
            "compareTo() returns negative if this < other, zero if equal, and positive if this > other — the same convention as Integer.compare().",
          ),
        ],
        challenge: {
          title: "Sort People by Age",
          description: [
            {
              type: "text",
              content:
                "Complete the Person class to implement Comparable<Person> sorting by age ascending. Sort a list of [Person(\"Bob\",25), Person(\"Amy\",30), Person(\"Cid\",20)] and print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[Cid(20), Bob(25), Amy(30)]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Person implements Comparable<Person> {
    String name;
    int age;
    Person(String name, int age) { this.name = name; this.age = age; }

    // implement compareTo() here

    @Override public String toString() { return name + "(" + age + ")"; }
}

public class Solution {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>(List.of(
            new Person("Bob", 25), new Person("Amy", 30), new Person("Cid", 20)));
        Collections.sort(people);
        System.out.println(people);
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Person implements Comparable<Person> {
    String name;
    int age;
    Person(String name, int age) { this.name = name; this.age = age; }

    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age);
    }
    @Override public String toString() { return name + "(" + age + ")"; }
}

public class Solution {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>(List.of(
            new Person("Bob", 25), new Person("Amy", 30), new Person("Cid", 20)));
        Collections.sort(people);
        System.out.println(people);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Implements Comparable<Person>",
              hint: "class Person implements Comparable<Person>",
              keywords: [{ pattern: "implements\\s+Comparable" }],
            },
            {
              id: 2,
              label: "Overrides compareTo",
              hint: "public int compareTo(Person other)",
              keywords: [{ pattern: "compareTo\\s*\\(" }],
            },
            {
              id: 3,
              label: "Calls Collections.sort",
              hint: "Collections.sort(people)",
              keywords: [{ pattern: "Collections\\.sort" }],
            },
          ],
        },
      },
      {
        id: "coll-9",
        title: "Comparator & Lambda Sorting",
        xp: 25,
        theory: [
          text(
            "A `Comparator<T>` defines an **external** ordering — useful when you don't control the class, or want multiple sort orders. Since Java 8, lambdas make this concise.",
            {
              label: "Comparator with lambdas",
              content: `List<String> names = new ArrayList<>(List.of("banana", "kiwi", "apple"));

// Sort by length ascending
names.sort((a, b) -> a.length() - b.length());
System.out.println(names); // [kiwi, apple, banana]

// Or with Comparator.comparing
names.sort(Comparator.comparing(String::length));

// Reversed:
names.sort(Comparator.comparing(String::length).reversed());`,
            },
          ),
          quiz(
            "What's the advantage of Comparator over Comparable?",
            [
              "Comparator is faster",
              "Comparator lets you define multiple, external sort orders without modifying the class",
              "Comparator works on primitives only",
              "There is no difference",
            ],
            1,
            "Comparable defines one fixed natural order inside the class; Comparator lets you plug in as many different orderings as you like from outside the class.",
          ),
        ],
        challenge: {
          title: "Sort Strings by Length",
          description: [
            {
              type: "text",
              content:
                "Given List.of(\"banana\", \"kiwi\", \"apple\"), sort it by string length ascending using a Comparator, then print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[kiwi, apple, banana]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("banana", "kiwi", "apple"));
        // sort by length ascending, print

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("banana", "kiwi", "apple"));
        names.sort(Comparator.comparing(String::length));
        System.out.println(names);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Comparator (comparing or lambda)",
              hint: "Comparator.comparing(String::length) or (a,b) -> ...",
              keywords: [{ pattern: "Comparator|->" }],
            },
            {
              id: 2,
              label: "Calls sort on the list",
              hint: "names.sort(...)",
              keywords: [{ pattern: "\\.sort\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "coll-10",
        title: "Collections Utility Methods",
        xp: 20,
        theory: [
          text(
            "The `Collections` class (not to be confused with the `Collection` interface) has static helpers for common operations: sort, reverse, max, min, shuffle, and immutable wrappers.",
            {
              label: "Collections utility methods",
              content: `List<Integer> nums = new ArrayList<>(List.of(3, 1, 4, 1, 5));

Collections.sort(nums);
System.out.println(nums);              // [1, 1, 3, 4, 5]
System.out.println(Collections.max(nums)); // 5
System.out.println(Collections.min(nums)); // 1
Collections.reverse(nums);
System.out.println(nums);              // [5, 4, 3, 1, 1]

List<Integer> readOnly = Collections.unmodifiableList(nums);`,
            },
          ),
          quiz(
            "What does Collections.max(list) return for an empty list?",
            [
              "null",
              "0",
              "Throws NoSuchElementException",
              "-1",
            ],
            2,
            "Collections.max()/min() throw NoSuchElementException on an empty collection, since there's no element to return.",
          ),
        ],
        challenge: {
          title: "Find Max and Reverse",
          description: [
            {
              type: "text",
              content:
                "Given List.of(3, 1, 4, 1, 5, 9), find and print the max, then reverse the list (in a mutable copy) and print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Max: 9
[9, 5, 1, 4, 1, 3]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(3, 1, 4, 1, 5, 9));
        // print "Max: <value>", then reverse and print the list

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(3, 1, 4, 1, 5, 9));
        System.out.println("Max: " + Collections.max(nums));
        Collections.reverse(nums);
        System.out.println(nums);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Collections.max",
              hint: "Collections.max(nums)",
              keywords: [{ pattern: "Collections\\.max" }],
            },
            {
              id: 2,
              label: "Uses Collections.reverse",
              hint: "Collections.reverse(nums)",
              keywords: [{ pattern: "Collections\\.reverse" }],
            },
          ],
        },
      },
      {
        id: "coll-11",
        title: "Multi-Level Sorting with thenComparing",
        xp: 25,
        theory: [
          text(
            "Real-world sorting often needs a **tiebreaker**. `Comparator.thenComparing()` chains a secondary comparator that only applies when the primary comparator considers two elements equal.",
            {
              label: "Chained comparators",
              content: `List<Person> people = new ArrayList<>(List.of(
    new Person("Amy", 30), new Person("Bob", 25), new Person("Cid", 30)));

people.sort(
    Comparator.comparingInt((Person p) -> p.age)
              .thenComparing(p -> p.name)
);
// Sorts by age first; if ages tie, sorts by name`,
            },
          ),
          quiz(
            "When does the second comparator passed to thenComparing() get used?",
            [
              "Always, in addition to the first",
              "Only when the first comparator considers two elements equal",
              "Only for String fields",
              "Never — thenComparing replaces the first comparator",
            ],
            1,
            "thenComparing() is a tiebreaker: it's only consulted when the primary comparator returns 0 (elements considered equal).",
          ),
        ],
        challenge: {
          title: "Sort by Age, Then Name",
          description: [
            {
              type: "text",
              content:
                "Given Person(\"Amy\",30), Person(\"Bob\",25), Person(\"Cid\",30), sort by age ascending, then by name ascending as a tiebreaker. Print the result.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[Bob(25), Amy(30), Cid(30)]`,
            },
          ],
          starterCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Person {
    String name;
    int age;
    Person(String name, int age) { this.name = name; this.age = age; }
    @Override public String toString() { return name + "(" + age + ")"; }
}

public class Solution {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>(List.of(
            new Person("Amy", 30), new Person("Bob", 25), new Person("Cid", 30)));
        // sort by age then name, print

    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Person {
    String name;
    int age;
    Person(String name, int age) { this.name = name; this.age = age; }
    @Override public String toString() { return name + "(" + age + ")"; }
}

public class Solution {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>(List.of(
            new Person("Amy", 30), new Person("Bob", 25), new Person("Cid", 30)));
        people.sort(
            Comparator.comparingInt((Person p) -> p.age)
                      .thenComparing(p -> p.name)
        );
        System.out.println(people);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses thenComparing",
              hint: ".thenComparing(...)",
              keywords: [{ pattern: "thenComparing" }],
            },
            {
              id: 2,
              label: "Sorts by age first",
              hint: "Comparator.comparingInt(p -> p.age)",
              keywords: [{ pattern: "comparingInt|comparing" }],
            },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Streams over Collections
  // ─────────────────────────────────────────────────────────────
  {
    id: "streams-collections",
    title: "Streams over Collections",
    icon: "🌊",
    color: "#8b5cf6",
    lessons: [
      {
        id: "coll-12",
        title: "Stream Basics: filter & map",
        xp: 25,
        theory: [
          text(
            "The **Stream API** lets you process collections declaratively. `filter()` keeps elements matching a predicate; `map()` transforms each element; `collect()` gathers results back into a collection.",
            {
              label: "filter + map + collect",
              content: `List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);

List<Integer> evenSquares = nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .collect(Collectors.toList());

System.out.println(evenSquares); // [4, 16, 36]`,
            },
          ),
          callout(
            "info",
            "Streams are lazy — nothing runs until a terminal operation like `collect()`, `forEach()`, or `count()` is called.",
          ),
          quiz(
            "In a stream pipeline like nums.stream().filter(...).map(...).collect(...), when does the actual processing happen?",
            [
              "Immediately when filter() is called",
              "Immediately when map() is called",
              "When the terminal operation (collect) is invoked",
              "It never runs unless you call run()",
            ],
            2,
            "Intermediate operations like filter/map are lazy and just build a pipeline; nothing executes until a terminal operation like collect() triggers it.",
          ),
        ],
        challenge: {
          title: "Even Squares",
          description: [
            {
              type: "text",
              content:
                "Given List.of(1,2,3,4,5,6), use streams to filter even numbers, square them, collect to a List, and print it.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[4, 16, 36]`,
            },
          ],
          starterCode: `import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
        // filter even, map to square, collect, print

    }
}`,
          solutionCode: `import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
        List<Integer> evenSquares = nums.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .collect(Collectors.toList());
        System.out.println(evenSquares);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses .stream()",
              hint: "nums.stream()",
              keywords: [{ pattern: "\\.stream\\s*\\(\\s*\\)" }],
            },
            {
              id: 2,
              label: "Uses filter",
              hint: ".filter(...)",
              keywords: [{ pattern: "\\.filter\\s*\\(" }],
            },
            {
              id: 3,
              label: "Uses map",
              hint: ".map(...)",
              keywords: [{ pattern: "\\.map\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "coll-13",
        title: "Collectors.toList/toSet/toMap",
        xp: 20,
        theory: [
          text(
            "`Collectors` provides ready-made strategies for the terminal `collect()` step: `toList()`, `toSet()`, and `toMap(keyFn, valueFn)` are the most common.",
            {
              label: "Collector variants",
              content: `List<String> names = List.of("Amy", "Bob", "Amy", "Cid");

Set<String> uniqueNames = names.stream().collect(Collectors.toSet());

Map<String, Integer> nameLengths = names.stream()
    .distinct()
    .collect(Collectors.toMap(n -> n, String::length));

System.out.println(nameLengths); // {Amy=3, Bob=3, Cid=3} (order not guaranteed)`,
            },
          ),
          quiz(
            "What happens if Collectors.toMap() encounters two elements that produce the same key?",
            [
              "The later value silently overwrites the earlier one",
              "It throws IllegalStateException by default",
              "Both values are kept in a list",
              "It skips the duplicate silently",
            ],
            1,
            "Collectors.toMap(keyFn, valueFn) throws IllegalStateException on a duplicate key unless you supply a merge function as a third argument.",
          ),
        ],
        challenge: {
          title: "Name Lengths Map",
          description: [
            {
              type: "text",
              content:
                "Given List.of(\"Amy\", \"Bob\", \"Cid\"), build a Map<String,Integer> of name → name length using streams, then print the length for \"Bob\".",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Bob: 3`,
            },
          ],
          starterCode: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<String> names = List.of("Amy", "Bob", "Cid");
        // build map name -> length, print "Bob: <length>"

    }
}`,
          solutionCode: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<String> names = List.of("Amy", "Bob", "Cid");
        Map<String, Integer> lengths = names.stream()
            .collect(Collectors.toMap(n -> n, String::length));
        System.out.println("Bob: " + lengths.get("Bob"));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Collectors.toMap",
              hint: "Collectors.toMap(...)",
              keywords: [{ pattern: "Collectors\\.toMap" }],
            },
            {
              id: 2,
              label: "Reads the Bob entry",
              hint: "lengths.get(\"Bob\")",
              keywords: [{ pattern: "\\.get\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "coll-14",
        title: "Grouping & Partitioning",
        xp: 25,
        theory: [
          text(
            "`Collectors.groupingBy()` buckets elements into a `Map<K, List<V>>` by a classifier function. `Collectors.partitioningBy()` is a special case that splits into exactly two groups (true/false).",
            {
              label: "groupingBy and partitioningBy",
              content: `List<String> words = List.of("apple", "ant", "bear", "bat", "cat");

Map<Character, List<String>> byFirstLetter = words.stream()
    .collect(Collectors.groupingBy(w -> w.charAt(0)));
// {a=[apple, ant], b=[bear, bat], c=[cat]}

Map<Boolean, List<String>> byLength = words.stream()
    .collect(Collectors.partitioningBy(w -> w.length() > 3));
// {false=[ant, bat, cat], true=[apple, bear]}`,
            },
          ),
          quiz(
            "What's the return type of Collectors.groupingBy(classifierFn)?",
            [
              "List<V>",
              "Map<K, List<V>>",
              "Set<K>",
              "Map<K, V>",
            ],
            1,
            "groupingBy produces a Map where each key maps to a List of all elements that classified to that key.",
          ),
        ],
        challenge: {
          title: "Group Words by First Letter",
          description: [
            {
              type: "text",
              content:
                "Given List.of(\"apple\", \"ant\", \"bear\", \"bat\", \"cat\"), group them by first letter using streams, then print the group for 'a'.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[apple, ant]`,
            },
          ],
          starterCode: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<String> words = List.of("apple", "ant", "bear", "bat", "cat");
        // group by first letter, print group for 'a'

    }
}`,
          solutionCode: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<String> words = List.of("apple", "ant", "bear", "bat", "cat");
        Map<Character, List<String>> grouped = words.stream()
            .collect(Collectors.groupingBy(w -> w.charAt(0)));
        System.out.println(grouped.get('a'));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Collectors.groupingBy",
              hint: "Collectors.groupingBy(...)",
              keywords: [{ pattern: "Collectors\\.groupingBy" }],
            },
            {
              id: 2,
              label: "Reads the 'a' group",
              hint: "grouped.get('a')",
              keywords: [{ pattern: "\\.get\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "coll-15",
        title: "Reduce & Summary Statistics",
        xp: 25,
        theory: [
          text(
            "`reduce()` combines all stream elements into a single result using an accumulator function. For numeric summaries, `IntStream`/`summaryStatistics()` gives min/max/average/sum in one call.",
            {
              label: "reduce and summaryStatistics",
              content: `List<Integer> nums = List.of(3, 1, 4, 1, 5, 9);

int sum = nums.stream().reduce(0, Integer::sum);
System.out.println(sum); // 23

IntSummaryStatistics stats = nums.stream()
    .mapToInt(Integer::intValue)
    .summaryStatistics();
System.out.println(stats.getMax());     // 9
System.out.println(stats.getAverage()); // 3.833...`,
            },
          ),
          quiz(
            "What does nums.stream().reduce(0, Integer::sum) compute?",
            [
              "The maximum element",
              "The count of elements",
              "The sum of all elements, starting from 0",
              "The average of all elements",
            ],
            2,
            "reduce(identity, accumulator) folds the stream into a single value — here it starts at 0 and repeatedly adds each element, producing the sum.",
          ),
        ],
        challenge: {
          title: "Sum and Max with Streams",
          description: [
            {
              type: "text",
              content:
                "Given List.of(3, 1, 4, 1, 5, 9), use reduce() to compute the sum, and summaryStatistics() to get the max. Print both.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Sum: 23
Max: 9`,
            },
          ],
          starterCode: `import java.util.IntSummaryStatistics;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(3, 1, 4, 1, 5, 9);
        // compute sum via reduce, max via summaryStatistics, print both

    }
}`,
          solutionCode: `import java.util.IntSummaryStatistics;
import java.util.List;

public class Solution {
    public static void main(String[] args) {
        List<Integer> nums = List.of(3, 1, 4, 1, 5, 9);
        int sum = nums.stream().reduce(0, Integer::sum);
        IntSummaryStatistics stats = nums.stream()
            .mapToInt(Integer::intValue)
            .summaryStatistics();
        System.out.println("Sum: " + sum);
        System.out.println("Max: " + stats.getMax());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses reduce",
              hint: ".reduce(0, Integer::sum)",
              keywords: [{ pattern: "\\.reduce\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses summaryStatistics",
              hint: ".summaryStatistics()",
              keywords: [{ pattern: "summaryStatistics" }],
            },
          ],
        },
      },
    ],
  },
];

export const JAVA_COLLECTIONS_LESSONS = JAVA_COLLECTIONS_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const JAVA_COLLECTIONS_TOTAL_XP = JAVA_COLLECTIONS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
