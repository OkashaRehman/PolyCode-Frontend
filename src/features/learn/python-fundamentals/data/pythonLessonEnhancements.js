/** Per-lesson objectives, scenarios, and callouts merged into curriculum at build time. */

export const LESSON_ENHANCEMENTS = {
  "py-0": {
    objectives: [
      "Explain what Python is used for in data, web, and automation",
      "Write and run a one-line program with print()",
      "Describe why indentation is part of Python syntax",
    ],
    scenario:
      "Your team automates weekly reports. A short Python script replaces an hour of manual spreadsheet work — that's the kind of win this language enables.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "This course uses **Python 3**. Python 2 reached end-of-life in 2020 — always install Python 3.10 or newer.",
      },
    ],
    append: [
      {
        type: "text",
        content:
          "Python reads like pseudocode. A single `print()` call is enough to verify your environment and build confidence before tackling data pipelines.",
        code: {
          lang: "python",
          label: "Comment + print (common first script)",
          content: `# My first PolyCode script
print("Hello, PolyCode!")
print("Python", 3)`,
        },
      },
      {
        type: "quiz",
        question: "Which statement about Python blocks is true?",
        options: [
          "Blocks use curly braces {}",
          "Indentation defines which lines belong to an if or for block",
          "Semicolons are required after every line",
          "Only functions need indentation",
        ],
        answer: 1,
        explanation:
          "After a colon, indented lines form the block — consistency matters (usually 4 spaces).",
      },
    ],
  },
  "py-0b": {
    objectives: [
      "Run Python in the REPL and from a .py script",
      "Know when to use the PolyCode playground vs a local install",
      "Read error messages without panic",
    ],
    scenario:
      "You receive a `.py` file from a colleague. You need to run it locally and confirm the output before deploying it to a server.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "REPL vs script — same expressions",
        content: `# In the REPL you type one line at a time:
# >>> 2 + 2
# 4

# In a script, multiple statements run in order:
print("Line 1")
print("Line 2")`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Tracebacks list the **most recent call last**. Scroll to the bottom line first — it names the error type (`SyntaxError`, `NameError`, etc.) and the line number.",
      },
    ],
  },
  "variables-types": {
    objectives: [
      "Name variables clearly and assign values with =",
      "Recognize int, float, str, and bool in real snippets",
      "Choose the right type before doing math or formatting text",
    ],
    scenario:
      "An e-commerce API returns prices as strings and quantities as integers. Before calculating revenue, you normalize types in this chapter.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Chapter mantra: **values have types** — `\"42\"` is text, `42` is a number. Converting between them is explicit: `int(\"42\")`.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Types in a mini invoice",
        content: `item = "Notebook"
qty = 3
unit_price = 4.50
in_stock = True

print(type(item), type(qty), type(unit_price), type(in_stock))`,
      },
      {
        type: "quiz",
        question: "What is the type of `True` in Python?",
        options: ["int", "str", "bool", "float"],
        answer: 2,
        explanation: "True and False are booleans — used for flags and conditions.",
      },
    ],
  },
  "py-1": {
    objectives: [
      "Create variables with meaningful names",
      "Distinguish int, float, str, and bool",
      "Use type() to inspect values",
    ],
    scenario:
      "A sensor sends temperature readings as strings. You store them as numbers so you can compute averages later.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Follow **PEP 8** naming: `snake_case` for variables and functions, `UPPER_CASE` for constants.",
      },
    ],
    append: [
      {
        type: "text",
        content:
          "Dynamic typing means the same name can refer to different types over time — but good code keeps each variable's meaning stable.",
        code: {
          lang: "python",
          label: "Inspect types after assignment",
          content: `count = 10
count = count + 1      # still int
rate = 0.15            # float
active = count > 0     # bool from comparison

print(type(count), type(rate), type(active))`,
        },
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Use `isinstance(x, int)` when you need to branch on type — clearer than comparing `type(x) == int` in most code.",
      },
    ],
  },
  "py-1b": {
    objectives: [
      "Build strings with f-strings",
      "Use input() to read user text",
      "Concatenate and repeat strings safely",
    ],
    scenario:
      "A CLI tool greets users by name and prints a formatted invoice total with two decimal places.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "Prefer **f-strings** over `%` formatting or `.format()` in new code — they are clearer and faster to write.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Format currency with f-strings",
        content: `total = 19.5
currency = "USD"
print(f"Amount due: {total:.2f} {currency}")

# Repeat and concatenate
line = "-" * 20
print(line + "\\nThank you!")`,
      },
      {
        type: "quiz",
        question: "Which f-string formats `pi` to two decimal places?",
        options: ['f"{pi:.2f}"', 'f"{pi:2}"', 'f"{pi,2}"', 'f"{.2pi}"'],
        answer: 0,
        explanation: "`:.2f` means fixed-point with 2 digits after the decimal.",
      },
    ],
  },
  "control-flow": {
    objectives: [
      "Route program execution with if / elif / else",
      "Compare values and combine conditions with and / or",
      "Use truthiness to write shorter guards",
    ],
    scenario:
      "A shipping API applies discounts, free delivery, and fraud checks — each rule is a branch in your control-flow chapter.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "Read conditions aloud: `if stock > 0 and paid:` — if both are true, ship the order.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Tiered discount logic",
        content: `total = 120
member = True

if total >= 100 and member:
    discount = 0.15
elif total >= 50:
    discount = 0.05
else:
    discount = 0.0

print(f"Discount: {discount * 100:.0f}%")`,
      },
      {
        type: "quiz",
        question: "Which value is truthy in an `if` statement?",
        options: ["0", '""', "[]", "[0]"],
        answer: 3,
        explanation: "Non-empty lists are truthy; zero, empty strings, and empty lists are falsy.",
      },
    ],
  },
  "py-2": {
    objectives: [
      "Write if / elif / else branches",
      "Compare values with ==, !=, <, >, <=, >=",
      "Nest conditions when logic requires it",
    ],
    scenario:
      "Shipping software applies free delivery when order total exceeds $50 and the customer is in the same country.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Nested shipping rules",
        content: `country = "US"
total = 55

if country == "US":
    if total >= 50:
        shipping = 0
    else:
        shipping = 5.99
else:
    shipping = 12.99

print(shipping)`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Flatten nested `if`s with `and` when it stays readable: `if country == \"US\" and total >= 50:`.",
      },
    ],
  },
  "py-2b": {
    objectives: [
      "Combine conditions with and, or, and not",
      "Understand Python truthiness for empty collections",
      "Avoid redundant comparisons",
    ],
    scenario:
      "Login succeeds only when username is non-empty **and** password length is at least 8 characters.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "Use `==` for value comparison. `is` checks **identity** (same object in memory) — rarely what you want for strings and numbers.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Truthiness guards",
        content: `username = "ada"
items = []

if username:          # non-empty string is truthy
    print("Welcome", username)

if not items:         # empty list is falsy
    print("Cart is empty")`,
      },
      {
        type: "quiz",
        question: "When should you use `is` instead of `==`?",
        options: [
          "Comparing two string literals",
          "Checking if a variable is None",
          "Comparing integers",
          "Always — it is faster",
        ],
        answer: 1,
        explanation: "`x is None` is the idiomatic identity check for None.",
      },
    ],
  },
  "collections-core": {
    objectives: [
      "Store ordered sequences in lists and fixed records in tuples",
      "Index, slice, and iterate without mutating unintentionally",
      "Pick list vs tuple based on mutability needs",
    ],
    scenario:
      "A dashboard shows the last five log lines (list) and a fixed RGB theme color (tuple) — this chapter covers both sequence types.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "`b = a` for lists shares the same object. Use `a.copy()` or `a[:]` when you need an independent list.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "List vs tuple in one script",
        content: `log = ["start", "fetch", "done"]
log.append("saved")          # OK — list is mutable

theme = (34, 139, 34)        # immutable green
r, g, b = theme
print(log[-1], r, g, b)`,
      },
      {
        type: "quiz",
        question: "What does `data[1:4]` return?",
        options: [
          "Elements at indices 1, 2, 3",
          "Elements at indices 1, 2, 3, 4",
          "Only index 1",
          "A reversed list",
        ],
        answer: 0,
        explanation: "Slice stop index is exclusive — start included, stop excluded.",
      },
    ],
  },
  "py-3": {
    objectives: [
      "Create and mutate lists with append, extend, and pop",
      "Access elements by index (positive and negative)",
      "Know that lists are ordered and mutable",
    ],
    scenario:
      "A to-do app keeps tasks in a list — add at the end, remove completed items, reorder by priority.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "append vs extend",
        content: `nums = [1, 2]
nums.append(3)       # [1, 2, 3]
nums.extend([4, 5])  # [1, 2, 3, 4, 5]

done = nums.pop()    # removes and returns 5
print(nums, done)`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Use `extend` to add many items; `append` adds a single element (even if that element is another list).",
      },
    ],
  },
  "py-3b": {
    objectives: [
      "Use tuples for fixed-size records",
      "Explain why tuples are immutable",
      "Unpack tuple values into variables",
    ],
    scenario:
      "GPS coordinates `(latitude, longitude)` should not change accidentally — a tuple protects that pair.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Tuple as dict key (hashable)",
        content: `locations = {
    (40.7, -74.0): "NYC",
    (51.5, -0.1): "London",
}
point = (40.7, -74.0)
print(locations[point])`,
      },
      {
        type: "quiz",
        question: "Why can tuples be dict keys but lists cannot?",
        options: [
          "Tuples are shorter",
          "Tuples are immutable and therefore hashable",
          "Lists cannot hold numbers",
          "Dicts only accept strings",
        ],
        answer: 1,
        explanation: "Mutable lists cannot be hashed; immutable tuples can.",
      },
    ],
  },
  "py-3c": {
    objectives: [
      "Slice sequences with start:stop:step",
      "Copy lists without sharing references",
      "Iterate over list elements",
    ],
    scenario:
      "You extract the last three log lines from a list and process them without modifying the original log.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "`b = a` does not copy a list — both names point to the same list. Use `b = a.copy()` or `b = a[:]` for a shallow copy.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Slicing and safe copy",
        content: `data = [10, 20, 30, 40, 50]
last_two = data[-2:]
copy = data.copy()
copy.append(60)

print(last_two)   # [40, 50]
print(data)       # unchanged — still 5 items`,
      },
      {
        type: "callout",
        variant: "tip",
        content: "`[::-1]` reverses any sequence — handy for quick palindrome checks on strings.",
      },
    ],
  },
  "loops-functions": {
    objectives: [
      "Repeat work with for and while loops",
      "Define reusable functions with def and return",
      "Know when a loop vs a function is the clearer tool",
    ],
    scenario:
      "A CSV export script loops over rows, but shared tax logic lives in one function called from three reports.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "Loops handle repetition; functions handle **named, reusable** chunks of logic. Most real scripts combine both.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Loop + function together",
        content: `def tax(amount, rate=0.08):
    return amount * rate

prices = [10, 25, 40]
for price in prices:
    print(price, tax(price))`,
      },
      {
        type: "quiz",
        question: "What does `return` do inside a function?",
        options: [
          "Prints a value to the console",
          "Sends a value back to the caller and exits the function",
          "Restarts the loop",
          "Defines a new variable globally",
        ],
        answer: 1,
        explanation: "return ends the function and optionally provides a result to the caller.",
      },
    ],
  },
  "py-4": {
    objectives: [
      "Write for loops over sequences and range()",
      "Use enumerate() when you need index and value",
      "Choose range bounds intentionally",
    ],
    scenario:
      "Process each row in a CSV-derived list and print a numbered summary for stakeholders.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "enumerate for numbered output",
        content: `tasks = ["design", "build", "test"]
for i, task in enumerate(tasks, start=1):
    print(f"{i}. {task}")`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "`range(2, 10, 2)` produces 2, 4, 6, 8 — start, stop (exclusive), optional step.",
      },
    ],
  },
  "py-4b": {
    objectives: [
      "Write while loops with a clear exit condition",
      "Use break and continue appropriately",
      "Avoid infinite loops",
    ],
    scenario:
      "A game loop keeps asking for input until the player types `quit` or exceeds three wrong guesses.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "break on sentinel value",
        content: `attempts = 0
while attempts < 3:
    guess = "wrong"  # imagine input()
    if guess == "secret":
        print("You win!")
        break
    attempts += 1
else:
    print("Out of attempts")`,
      },
      {
        type: "quiz",
        question: "What does `continue` do in a loop?",
        options: [
          "Exits the loop entirely",
          "Skips the rest of the current iteration and goes to the next",
          "Restarts Python",
          "Runs the loop backwards",
        ],
        answer: 1,
        explanation: "continue jumps to the next iteration without finishing the current body.",
      },
    ],
  },
  "py-5": {
    objectives: [
      "Define functions with def and return",
      "Pass parameters and use default values safely",
      "Understand local vs global scope basics",
    ],
    scenario:
      "Extract a `calculate_tax(amount, rate)` function so three different reports reuse the same logic.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "Never use a **mutable default** like `def f(items=[])`. The same list is reused across calls — use `items=None` and create a new list inside.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Safe default argument",
        content: `def add_item(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket

print(add_item("a"))
print(add_item("b"))  # not sharing the first list`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Functions can return multiple values as a tuple: `return min_val, max_val` then `lo, hi = stats(nums)`.",
      },
    ],
  },
  "dicts-sets": {
    objectives: [
      "Map keys to values with dicts",
      "Enforce uniqueness with sets",
      "Choose dict vs set vs list for each job",
    ],
    scenario:
      "A product catalog (dict: SKU → price) and a visitor log (set of unique IDs) power your analytics dashboard.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Dict for lookups, set for uniqueness, list for ordered sequences — three tools, three jobs.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Dict lookup + set dedupe",
        content: `prices = {"tea": 2.0, "coffee": 3.5}
print(prices.get("muffin", 0))  # safe missing key

visits = ["u1", "u2", "u1", "u3"]
unique_visitors = set(visits)
print(len(unique_visitors))`,
      },
      {
        type: "quiz",
        question: "How do you loop over keys and values together in a dict?",
        options: [".keys()", ".values()", ".items()", ".pairs()"],
        answer: 2,
        explanation: "for k, v in d.items(): gives both key and value each iteration.",
      },
    ],
  },
  "py-6": {
    objectives: [
      "Create dicts with keys and values",
      "Read safely with .get() and set defaults",
      "Loop over keys, values, or items",
    ],
    scenario:
      "A product catalog maps SKU codes to prices — dict lookup is O(1) and far clearer than parallel lists.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Build a lookup table",
        content: `user_email = {}
user_email[101] = "ada@example.com"
user_email[102] = "lin@example.com"

for user_id, email in user_email.items():
    print(user_id, email)`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Dict keys must be hashable — strings, numbers, tuples yes; lists no.",
      },
    ],
  },
  "py-6b": {
    objectives: [
      "Use sets for unique membership",
      "Perform union, intersection, and difference",
      "Remove duplicates from a list via set",
    ],
    scenario:
      "Analytics needs unique visitor IDs from a noisy log where the same user appears many times.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Set operations on tags",
        content: `a = {"python", "data", "web"}
b = {"data", "ml", "web"}

print(a | b)   # union
print(a & b)   # intersection
print(a - b)   # difference`,
      },
      {
        type: "quiz",
        question: "How do you remove duplicates from a list `nums` preserving no order guarantee?",
        options: ["nums.unique()", "list(set(nums))", "nums.distinct()", "sorted(nums)"],
        answer: 1,
        explanation: "set(nums) keeps unique values; list() wraps back to a list.",
      },
    ],
  },
  "files-errors": {
    objectives: [
      "Read and write text with with open(...)",
      "Handle failures using try / except",
      "Fail gracefully with clear messages",
    ],
    scenario:
      "A nightly job reads orders, writes a summary file, and recovers when a line contains bad data instead of crashing.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Always use `with open(...)` — files close automatically even when an exception fires mid-read.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Parse lines safely",
        content: `lines = ["10", "bad", "20"]
totals = []

for raw in lines:
    try:
        totals.append(int(raw))
    except ValueError:
        print(f"Skipping invalid line: {raw}")

print(sum(totals))`,
      },
      {
        type: "quiz",
        question: "Which block runs when no exception occurs in try?",
        options: ["except", "else (if present)", "finally only", "raise"],
        answer: 1,
        explanation: "try/except/else: else runs when try completed without exception.",
      },
    ],
  },
  "py-7": {
    objectives: [
      "Open files with with open(...) as f",
      "Read and write text files line by line",
      "Choose relative paths deliberately",
    ],
    scenario:
      "Nightly job reads `orders.txt`, counts lines, and writes a one-line summary to `report.txt`.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Always use `with open(...)` so files close automatically even if an error occurs.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Count non-empty lines (concept)",
        content: `# with open("orders.txt") as f:
#     lines = [line.strip() for line in f if line.strip()]
# print(len(lines))

text = "a\\nb\\n\\nc"
lines = [ln for ln in text.split("\\n") if ln]
print(len(lines))`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Mode `\"a\"` appends without wiping the file; `\"w\"` overwrites — double-check before writing.",
      },
    ],
  },
  "py-7b": {
    objectives: [
      "Catch exceptions with try / except",
      "Raise meaningful errors with raise",
      "Fail gracefully instead of crashing silently",
    ],
    scenario:
      "User enters non-numeric input for age — your script catches ValueError and asks again instead of exiting.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Raise your own error",
        content: `def set_age(value):
    age = int(value)
    if age < 0:
        raise ValueError("age cannot be negative")
    return age

try:
    set_age("-3")
except ValueError as err:
    print(err)`,
      },
      {
        type: "quiz",
        question: "What does `raise ValueError('msg')` do?",
        options: [
          "Prints a warning and continues",
          "Creates a new exception and stops normal flow",
          "Returns None",
          "Deletes the variable",
        ],
        answer: 1,
        explanation: "raise signals an error condition callers can catch with except.",
      },
    ],
  },
  "pro-python": {
    objectives: [
      "Model data with classes and organize code in modules",
      "Write concise comprehensions and manage dependencies",
      "Apply modern habits: type hints, pathlib, JSON",
    ],
    scenario:
      "You ship a small internal tool: OOP for domain models, modules for structure, venv for dependencies — this chapter levels you up.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "Professional Python is still readable Python — patterns here scale to FastAPI services and data notebooks alike.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Comprehension + typed helper",
        content: `def c_to_f(celsius: list[float]) -> list[float]:
    return [c * 9 / 5 + 32 for c in celsius]

print(c_to_f([0, 20, 100]))`,
      },
      {
        type: "quiz",
        question: "What is the main benefit of a virtual environment?",
        options: [
          "Faster CPU",
          "Isolated package versions per project",
          "Automatic type checking",
          "Free cloud hosting",
        ],
        answer: 1,
        explanation: "venv keeps each project's pip installs separate.",
      },
    ],
  },
  "py-8": {
    objectives: [
      "Define a class with __init__ and methods",
      "Create instances and access attributes",
      "Explain encapsulation at a beginner level",
    ],
    scenario:
      "Model a `BankAccount` with deposit, withdraw, and balance — OOP groups data and behavior together.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "BankAccount sketch",
        content: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

acct = BankAccount("Ada", 100)
acct.deposit(50)
print(acct.owner, acct.balance)`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Methods always take `self` as the first parameter — it refers to the instance being called.",
      },
    ],
  },
  "py-8b": {
    objectives: [
      "Import modules and use qualified names",
      "Organize code across multiple .py files",
      'Guard script entry with if __name__ == "__main__"',
    ],
    scenario:
      "Split utilities into `helpers.py` and keep `main.py` thin — imports connect the pieces.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Import styles",
        content: `import math
from math import sqrt

print(math.pi)
print(sqrt(9))

# if __name__ == "__main__":
#     main()  # runs only when file executed directly`,
      },
      {
        type: "quiz",
        question: 'Why use if __name__ == "__main__":?',
        options: [
          "To make imports faster",
          "So import does not run your script's main block",
          "To enable type hints",
          "To open files safely",
        ],
        answer: 1,
        explanation: "Imported modules should not accidentally start CLI entry logic.",
      },
    ],
  },
  "py-9": {
    objectives: [
      "Write list comprehensions for simple transforms",
      "Filter collections with an if clause",
      "Know when a plain loop is clearer",
    ],
    scenario:
      "Convert a list of Celsius temperatures to Fahrenheit in one expressive line for a notebook.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Filter + transform in one line",
        content: `temps = [18, 22, 30, 5, 12]
warm = [t for t in temps if t >= 15]
fahrenheit = [t * 9 / 5 + 32 for t in warm]
print(fahrenheit)`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "If a comprehension needs two lines of logic per item, a regular for loop is often clearer.",
      },
    ],
  },
  "py-10": {
    objectives: [
      "Create a virtual environment with python -m venv",
      "Install packages with pip",
      "Keep project dependencies isolated",
    ],
    scenario:
      "Project A needs Pandas 2.x while Project B needs an older stack — venvs prevent version conflicts.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Simulated requirements check",
        content: `# Shell commands (run in terminal, not Python):
# python -m venv .venv
# source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
# pip install pandas

pkgs = ["numpy>=1.24", "pandas>=2.0"]
print("\\n".join(pkgs))`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "`pip freeze > requirements.txt` captures exact versions for teammates and CI.",
      },
    ],
  },
  "py-11": {
    objectives: [
      "Add basic type hints to functions",
      "Use pathlib for modern file paths",
      "Read JSON with the standard json module",
    ],
    scenario:
      "A config file in JSON drives script behavior — type hints and pathlib make the loader maintainable.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "JSON config pattern",
        content: `import json

raw = '{"debug": true, "retries": 3}'
config = json.loads(raw)
print(config["retries"], type(config["debug"]))`,
      },
      {
        type: "quiz",
        question: "Do type hints change Python's runtime behavior by default?",
        options: [
          "Yes — wrong types crash immediately",
          "No — they help humans and tools like mypy",
          "Only inside classes",
          "Only on Linux",
        ],
        answer: 1,
        explanation: "Hints are optional metadata unless you use a type checker.",
      },
    ],
  },
  "py-12": {
    objectives: [
      "Combine variables, loops, functions, and dicts in one script",
      "Print a formatted grade report from sample data",
      "Structure code for readability",
    ],
    scenario:
      "Teachers export scores as a dict of student → list of grades. Your capstone prints each average and class rank.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Grade report capstone",
        content: `def average(scores):
    return sum(scores) / len(scores)

grades = {"Ada": [90, 92], "Lin": [80, 88]}
for name, scores in grades.items():
    print(f"{name}: {average(scores):.1f}")`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Capstone pattern: data structure → helper function → loop with formatted output.",
      },
    ],
  },
  "py-13": {
    objectives: [
      "Recall syntax for core Python constructs",
      "Pick the right collection for a task",
      "Use this lesson as ongoing reference",
    ],
    scenario:
      "You start a new notebook and keep this cheat sheet open while exploring an unfamiliar codebase.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Bookmark this lesson — it summarizes the entire course in one place before you move on to NumPy and Pandas.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "One-screen cheat sheet",
        content: `# Collections: list[], tuple(), dict{}, set{}
# Loop: for x in items: / while cond:
# Function: def f(a, b=0): return a + b
# Class: class C: def __init__(self, x): self.x = x
# File: with open("f.txt") as f: data = f.read()
# Error: try: ... except ValueError: ...`,
      },
      {
        type: "quiz",
        question: "Which collection preserves insertion order and allows duplicate values?",
        options: ["set", "dict keys only", "list", "tuple (mutable)"],
        answer: 2,
        explanation: "Lists are ordered, mutable, and allow duplicates.",
      },
    ],
  },
};

export function applyLessonEnhancements(lesson) {
  const meta = LESSON_ENHANCEMENTS[lesson.id];
  const objectives = meta?.objectives || [
    `Understand the core idea in "${lesson.title}"`,
    "Apply the Python patterns from this lesson in code",
    "Build habits that scale to data science and web projects",
  ];

  const prefix = [{ type: "objectives", items: objectives }];
  if (meta?.scenario) {
    prefix.push({ type: "scenario", content: meta.scenario });
  }
  if (meta?.prepend?.length) {
    prefix.push(...meta.prepend);
  }

  return {
    ...lesson,
    theory: [...prefix, ...lesson.theory, ...(meta?.append || [])],
  };
}

function applyChapterIntro(lesson, chapterMeta) {
  if (!chapterMeta) return lesson;

  const chapterBlocks = [];
  if (chapterMeta.scenario) {
    chapterBlocks.push({
      type: "callout",
      variant: "info",
      content: `**Chapter focus:** ${chapterMeta.scenario}`,
    });
  }
  if (chapterMeta.prepend?.length) {
    chapterBlocks.push(...chapterMeta.prepend);
  }

  const objectivesBlock = lesson.theory.find((b) => b.type === "objectives");
  const rest = lesson.theory.filter((b) => b.type !== "objectives");
  const mergedObjectives = [
    ...(chapterMeta.objectives?.slice(0, 1) || []),
    ...(objectivesBlock?.items || []),
  ].slice(0, 3);

  return {
    ...lesson,
    theory: [
      { type: "objectives", items: mergedObjectives },
      ...chapterBlocks,
      ...rest,
      ...(chapterMeta.append || []),
    ],
  };
}

export function applyChapterEnhancements(chapters) {
  return chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson, index) => {
      const enhanced = applyLessonEnhancements(lesson);
      if (index === 0 && LESSON_ENHANCEMENTS[chapter.id]) {
        return applyChapterIntro(enhanced, LESSON_ENHANCEMENTS[chapter.id]);
      }
      return enhanced;
    }),
  }));
}
