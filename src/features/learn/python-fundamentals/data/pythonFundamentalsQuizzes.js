/**
 * MCQs for every Python Fundamentals lesson — exactly two per lesson.
 * The lesson UI requires REQUIRED_QUIZ_COUNT = 2; a lesson with fewer gets a
 * generic auto-generated quiz instead. Options are shuffled at render time,
 * so the correct answer can be authored in any slot.
 */

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

export const PYTHON_FUNDAMENTALS_QUIZZES = {
  "py-0": [
    quiz(
      "What happens when `print(\"hi\")` is written on the line after `if True:` with no indentation?",
      [
        "`IndentationError` — the block after `:` must be indented",
        "It prints `hi`",
        "It prints nothing",
        "Python indents the line automatically",
      ],
      0,
      "The colon starts a block, and Python needs the next lines indented (usually 4 spaces) to know what belongs to it.",
    ),
    quiz(
      "Which line is valid Python 3?",
      [
        "`print(\"Hello, PolyCode!\")`",
        "`print \"Hello, PolyCode!\"`",
        "`echo(\"Hello, PolyCode!\")`",
        "`console.log(\"Hello, PolyCode!\")`",
      ],
      0,
      "In Python 3, `print` is a function, so it needs parentheses. `print \"...\"` is old Python 2 syntax.",
    ),
  ],
  "py-0b": [
    quiz(
      "In the interactive REPL you type `2 + 2` and press Enter. What happens?",
      [
        "It shows `4` straight away",
        "Nothing appears until you call `print()`",
        "`SyntaxError` — the REPL needs a full script",
        "It saves the line to a `.py` file",
      ],
      0,
      "The REPL evaluates each line as you type it and echoes the result. In a script you would need `print()` to see it.",
    ),
    quiz(
      "A traceback ends with `NameError: name 'totl' is not defined`. Where should you start reading?",
      [
        "The last line — it names the error type and what went wrong",
        "The first line of the traceback",
        "Line 1 of your file, whatever the traceback says",
        "The longest line in the traceback",
      ],
      0,
      "Python tracebacks list the most recent call last. Read from the bottom up — here it is probably a typo for `total`.",
    ),
  ],
  "py-1": [
    quiz(
      "What does `print(type(\"42\"))` show?",
      ["`<class 'str'>`", "`<class 'int'>`", "`<class 'float'>`", "`42`"],
      0,
      "The quotes make it text. `\"42\"` is a string, and `42` would be an int.",
    ),
    quiz(
      "An API gives you `qty = \"3\"`. Which expression produces the number `6`?",
      ["`int(qty) * 2`", "`qty * 2`", "`qty + qty`", "`str(qty) * 2`"],
      0,
      "You must convert explicitly with `int()`. On a string, `* 2` and `+` repeat or join the text, giving `\"33\"`.",
    ),
  ],
  "py-1b": [
    quiz(
      "What does this print?\n```\nname = \"Fatima\"\nscore = 95\nprint(f\"{name} scored {score}%\")\n```",
      ["`Fatima scored 95%`", "`{name} scored {score}%`", "`name scored score%`", "`Fatima scored 95`"],
      0,
      "The `f` prefix replaces each `{...}` with the variable's value. The `%` is ordinary text.",
    ),
    quiz(
      "With `total = 19.5`, what does `print(f\"Amount due: {total:.2f}\")` print?",
      ["`Amount due: 19.50`", "`Amount due: 19.5`", "`Amount due: 20`", "`Amount due: 19.5.2f`"],
      0,
      "`:.2f` formats the number with exactly two digits after the decimal point.",
    ),
  ],
  "py-2": [
    quiz(
      "With `score = 85`, what does this print? `if score >= 90:` → `print(\"A\")`, `elif score >= 80:` → `print(\"B\")`, `else:` → `print(\"Keep practicing\")`",
      ["`B`", "`A`", "`Keep practicing`", "`A` and then `B`"],
      0,
      "85 >= 90 is false and 85 >= 80 is true, so the `elif` branch runs. Only one branch of an if/elif/else chain ever runs.",
    ),
    quiz(
      "Which line combines `if country == \"US\":` and a nested `if total >= 50:` into one condition?",
      [
        "`if country == \"US\" and total >= 50:`",
        "`if country == \"US\" or total >= 50:`",
        "`if country == \"US\" && total >= 50:`",
        "`if (country == \"US\", total >= 50):`",
      ],
      0,
      "Python spells it `and`, not `&&`. The tuple version is always truthy, because a non-empty tuple is truthy.",
    ),
  ],
  "py-2b": [
    quiz(
      "With `username = \"\"`, what does this print? `if username:` → `print(\"Welcome\")`, `else:` → `print(\"Please log in\")`",
      ["`Please log in`", "`Welcome`", "Nothing", "`TypeError` — a string is not a boolean"],
      0,
      "An empty string is falsy, so the `else` branch runs. Any non-empty string would be truthy.",
    ),
    quiz(
      "What is the idiomatic way to check whether `result` is `None`?",
      [
        "`if result is None:`",
        "`if result == \"None\":`",
        "`if result is \"None\":`",
        "`if None(result):`",
      ],
      0,
      "`is` checks identity, and there is only one `None` object. Use `==` for comparing strings and numbers.",
    ),
  ],
  "py-3": [
    quiz(
      "What does this print?\n```\nnums = [1, 2]\nnums.append([3, 4])\nprint(len(nums))\n```",
      ["`3`", "`4`", "`2`", "An error"],
      0,
      "`append` adds one element, here the whole list `[3, 4]`. `extend([3, 4])` would add two items, making the length 4.",
    ),
    quiz(
      "What does this print?\n```\na = [1, 2]\nb = a\nb.append(3)\nprint(a)\n```",
      ["`[1, 2, 3]`", "`[1, 2]`", "`[3]`", "An error"],
      0,
      "`b = a` doesn't copy anything — both names point to the same list. Use `a.copy()` or `a[:]` to get an independent copy.",
    ),
  ],
  "py-3b": [
    quiz(
      "What happens?\n```\npoint = (10, 20)\npoint[0] = 5\n```",
      [
        "`TypeError` — a tuple's items can't be changed",
        "`point` becomes `(5, 20)`",
        "`point` becomes `(5, 10, 20)`",
        "Nothing — the line is ignored",
      ],
      0,
      "Tuples are immutable. To change a value, build a new tuple instead.",
    ),
    quiz(
      "Which of these can be used as a dictionary key?",
      ["`(40.7, -74.0)`", "`[40.7, -74.0]`", "`{40.7, -74.0}`", "`{\"lat\": 40.7}`"],
      0,
      "Keys must be hashable. Immutable tuples are, but lists, sets and dicts are mutable, so they can't be keys.",
    ),
  ],
  "py-3c": [
    quiz(
      "Given `letters = [\"a\", \"b\", \"c\", \"d\", \"e\"]`, what is `letters[1:4]`?",
      ["`['b', 'c', 'd']`", "`['b', 'c', 'd', 'e']`", "`['a', 'b', 'c', 'd']`", "`['a', 'b', 'c']`"],
      0,
      "A slice includes the start index but not the stop index, so you get indexes 1, 2 and 3.",
    ),
    quiz(
      "What is `\"python\"[::-1]`?",
      ["`'nohtyp'`", "`'n'`", "`'p'`", "`'python'`"],
      0,
      "A step of `-1` walks the sequence backwards, which reverses it.",
    ),
  ],
  "py-4": [
    quiz(
      "Which numbers does `range(2, 10, 2)` produce?",
      ["2, 4, 6, 8", "2, 4, 6, 8, 10", "0, 2, 4, 6, 8", "2, 10, 2"],
      0,
      "The arguments are start, stop and step, and the stop value (10) is not included.",
    ),
    quiz(
      "What does this print? `for i, task in enumerate([\"design\", \"build\"], start=1): print(f\"{i}. {task}\")`",
      [
        "`1. design` then `2. build`",
        "`0. design` then `1. build`",
        "`design. 1` then `build. 2`",
        "`1. design build`",
      ],
      0,
      "`enumerate` gives (number, item) pairs, and `start=1` makes the numbering begin at 1 instead of 0.",
    ),
  ],
  "py-4b": [
    quiz(
      "What does this print?\n```\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint(\"go\")\n```",
      ["`3`, `2`, `1`, `go` (one per line)", "`3`, `2`, `1`, `0`, `go`", "Only `go`", "`3` forever"],
      0,
      "The loop stops when `count` reaches 0, so 0 is never printed. Then the line after the loop runs.",
    ),
    quiz(
      "A `while` loop has an `else:` block after it. When does that block run?",
      [
        "When the loop finishes without hitting `break`",
        "Every time the condition is checked",
        "Only when `break` runs",
        "Never — `while` can't have an `else`",
      ],
      0,
      "In the lesson's guessing game, `else` prints \"Out of attempts\" only if the player never guessed right and triggered `break`.",
    ),
  ],
  "py-5": [
    quiz(
      "What does this print?\n```\ndef greet(name):\n    print(f\"Hi {name}\")\n\nresult = greet(\"Ada\")\nprint(result)\n```",
      [
        "`Hi Ada` then `None`",
        "`Hi Ada` twice",
        "Only `Hi Ada`",
        "An error — `greet` has no `return`",
      ],
      0,
      "`print` only shows text on screen. A function without `return` returns `None`, so `result` is `None`.",
    ),
    quiz(
      "Why is `def add_item(item, bucket=[])` a bug?",
      [
        "The same default list is shared by every call, so items pile up",
        "Python doesn't allow default values for parameters",
        "Lists can't be passed as parameters",
        "It makes `bucket` read-only inside the function",
      ],
      0,
      "A default value is created once, when the function is defined. Use `bucket=None` and create `[]` inside the function.",
    ),
  ],
  "py-6": [
    quiz(
      "`prices = {\"tea\": 2.0, \"coffee\": 3.5}`. What does `prices[\"muffin\"]` do?",
      ["Raises `KeyError`", "Returns `None`", "Returns `0`", "Adds `\"muffin\"` with the value `0`"],
      0,
      "Square brackets on a missing key raise `KeyError`. Use `prices.get(\"muffin\", 0)` to get a default instead.",
    ),
    quiz(
      "Which loop gives you both the ID and the email for every entry in `user_email`?",
      [
        "`for user_id, email in user_email.items():`",
        "`for user_id, email in user_email:`",
        "`for user_id, email in user_email.keys():`",
        "`for user_id, email in user_email.values():`",
      ],
      0,
      "`.items()` yields (key, value) pairs. Looping over the dict itself, or over `.keys()`, gives only the keys.",
    ),
  ],
  "py-6b": [
    quiz(
      "With `a = {\"python\", \"data\", \"web\"}` and `b = {\"data\", \"ml\", \"web\"}`, what is `a & b`?",
      [
        "`{'data', 'web'}`",
        "`{'python', 'data', 'web', 'ml'}`",
        "`{'python'}`",
        "`{'ml'}`",
      ],
      0,
      "`&` is intersection, meaning the items in both sets. `|` is union and `-` is difference.",
    ),
    quiz(
      "What happens?\n```\nunique = {\"py\", \"data\"}\nprint(unique[0])\n```",
      [
        "`TypeError` — sets are unordered, so they have no indexes",
        "It prints `py`",
        "It prints `data`",
        "It prints `{'py'}`",
      ],
      0,
      "Sets are for uniqueness and fast `in` checks, not for positions. Convert to a list if you need indexes.",
    ),
  ],
  "py-7": [
    quiz(
      "`report.txt` already has 10 lines. What does it contain after `with open(\"report.txt\", \"w\") as f: f.write(\"done\\n\")`?",
      [
        "Only `done` — `\"w\"` overwrites the file",
        "The 10 lines followed by `done`",
        "Nothing — writing to an existing file raises an error",
        "The original 10 lines, unchanged",
      ],
      0,
      "`\"w\"` replaces the file's contents, and `\"a\"` appends to the end. Double-check the mode before writing.",
    ),
    quiz(
      "What is the main benefit of `with open(...) as f:`?",
      [
        "The file closes automatically, even if an error happens inside the block",
        "It reads files faster than `open()`",
        "It creates the file when the mode is `\"r\"`",
        "It turns the file into a list of lines",
      ],
      0,
      "`with` guarantees cleanup, so you never leave files open when something goes wrong.",
    ),
  ],
  "py-7b": [
    quiz(
      "What does this print? `try:` → `value = int(\"abc\")` and `print(\"ok\")`, then `except ValueError:` → `print(\"not a number\")`",
      [
        "`not a number`",
        "`ok`",
        "`ok` then `not a number`",
        "The program crashes with `ValueError`",
      ],
      0,
      "`int(\"abc\")` raises `ValueError`, so Python jumps to `except` and `print(\"ok\")` is skipped.",
    ),
    quiz(
      "`set_age` runs `raise ValueError(\"age cannot be negative\")` for negative ages. What does `try: set_age(\"-3\")` with `except ValueError as err: print(err)` print?",
      ["`age cannot be negative`", "`-3`", "`ValueError`", "Nothing — `set_age` returns `-3`"],
      0,
      "`raise` stops the function, `except ... as err` catches it, and printing `err` shows its message.",
    ),
  ],
  "py-8": [
    quiz(
      "`deposit` adds `amount` to `self.balance`. What does this print?\n```\nacct = BankAccount(\"Ada\", 100)\nacct.deposit(50)\nprint(acct.balance)\n```",
      ["`150`", "`100`", "`50`", "An error"],
      0,
      "`__init__` sets the balance to 100, and `deposit` updates that same object's `self.balance`.",
    ),
    quiz(
      "What goes wrong? `class Dog:` with the method `def speak(): return \"woof\"`, then `Dog().speak()`",
      [
        "`TypeError` — the method is missing `self`",
        "It returns `\"woof\"`",
        "`NameError` — `Dog` isn't defined",
        "It returns `None`",
      ],
      0,
      "Python passes the instance as the first argument automatically, so every method needs `self` as its first parameter.",
    ),
  ],
  "py-8b": [
    quiz(
      "After `from math import sqrt` (and no other import), which call works?",
      ["`sqrt(9)`", "`math.sqrt(9)`", "`Math.sqrt(9)`", "`sqrt.math(9)`"],
      0,
      "`from math import sqrt` brings only the name `sqrt` into scope. To use `math.sqrt` you need `import math`.",
    ),
    quiz(
      "`helpers.py` has `print(\"testing\")` at the bottom, outside any `if` block. What happens when `main.py` runs `import helpers`?",
      [
        "`testing` is printed during the import",
        "Nothing is printed — importing never runs code",
        "Python raises `ImportError`",
        "`testing` is printed only when `main.py` finishes",
      ],
      0,
      "Importing runs the whole module. Put test code under `if __name__ == \"__main__\":` so it runs only when the file is executed directly.",
    ),
  ],
  "py-9": [
    quiz(
      "What does `[n for n in range(10) if n % 2 == 0]` produce?",
      ["`[0, 2, 4, 6, 8]`", "`[2, 4, 6, 8, 10]`", "`[1, 3, 5, 7, 9]`", "`[True, False, True, …]`"],
      0,
      "The `if` keeps only the numbers that pass the test. `range(10)` stops at 9.",
    ),
    quiz(
      "Which comprehension squares only the positive numbers in `nums`?",
      [
        "`[n * n for n in nums if n > 0]`",
        "`[n * n if n > 0 for n in nums]`",
        "`[for n in nums: n * n if n > 0]`",
        "`[n > 0 for n * n in nums]`",
      ],
      0,
      "The pattern is `[expression for item in iterable if condition]`, with the filter at the end.",
    ),
  ],
  "py-10": [
    quiz(
      "Which command creates a virtual environment in a folder named `.venv`?",
      ["`python -m venv .venv`", "`pip install .venv`", "`python .venv`", "`pip freeze > .venv`"],
      0,
      "`python -m venv .venv` creates it. Activate it, then `pip install` puts packages inside it.",
    ),
    quiz(
      "What should you commit to Git so teammates install the same package versions?",
      [
        "`requirements.txt`, generated with `pip freeze`",
        "The whole `.venv` folder",
        "Your global `site-packages` folder",
        "Nothing — pip syncs packages between computers",
      ],
      0,
      "`requirements.txt` is small and portable. `.venv` is machine-specific and should stay out of Git.",
    ),
  ],
  "py-11": [
    quiz(
      "Given `def add(a: int, b: int) -> int: return a + b`, what does `add(\"2\", \"3\")` return?",
      [
        "`'23'` — type hints aren't enforced when the code runs",
        "`5`",
        "A `TypeError` raised because of the type hints",
        "`None`",
      ],
      0,
      "Hints are documentation for people and tools like mypy. At runtime, Python still just joins the two strings.",
    ),
    quiz(
      "What does this print?\n```\nconfig = json.loads('{\"debug\": true, \"retries\": 3}')\nprint(config[\"retries\"], config[\"debug\"])\n```",
      ["`3 True`", "`3 true`", "`\"3\" \"true\"`", "An error — JSON can't be loaded from a string"],
      0,
      "`json.loads` turns JSON text into Python objects: `true` becomes `True`, and `3` stays an int.",
    ),
  ],
  "py-12": [
    quiz(
      "With `def average(scores): return sum(scores) / len(scores)`, what does `print(f\"{name}: {average(scores):.1f}\")` print for `name = \"Lin\"` and `scores = [80, 88]`?",
      ["`Lin: 84.0`", "`Lin: 84`", "`Lin: 168.0`", "`Lin: 84.00`"],
      0,
      "168 / 2 = 84.0, because `/` always gives a float. `:.1f` then shows one decimal place.",
    ),
    quiz(
      "What happens when you call `average([])` with that same function?",
      ["`ZeroDivisionError`", "It returns `0`", "It returns `None`", "It returns `[]`"],
      0,
      "`sum([])` is 0 and `len([])` is 0, and dividing by zero raises an error. Guard against it with `if not scores: return 0`.",
    ),
  ],
  "py-13": [
    quiz(
      "Which collection should map user IDs to email addresses?",
      ["`dict`", "`list`", "`tuple`", "`set`"],
      0,
      "A dict maps unique keys to values, which is exactly an ID → email lookup.",
    ),
    quiz(
      "Which function definition is valid?",
      [
        "`def f(a, b=0): return a + b`",
        "`def f(b=0, a): return a + b`",
        "`def f(a, b=0) return a + b`",
        "`function f(a, b=0): return a + b`",
      ],
      0,
      "Parameters with defaults must come after the ones without, a colon is required, and the keyword is `def`.",
    ),
  ],
};
