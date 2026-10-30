/**
 * MCQs for every C++ Fundamentals lesson — exactly two per lesson.
 * The lesson UI requires REQUIRED_QUIZ_COUNT = 2; a lesson with fewer gets a
 * generic auto-generated quiz instead. Options are shuffled at render time,
 * so the correct answer can be authored in any slot.
 */

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

export const CPP_FUNDAMENTALS_QUIZZES = {
  "cpp-0": [
    quiz(
      "Which statement correctly describes how a C++ program runs?",
      [
        "A compiler turns the `.cpp` source into machine code, then the executable runs",
        "Each line is interpreted one at a time while the program runs",
        "The CPU reads the `.cpp` text file directly",
        "The code is converted to JavaScript and run in the browser",
      ],
      0,
      "C++ is compiled: source code becomes an executable before it runs, which is a big reason it is fast.",
    ),
    quiz(
      "Execution of a C++ program always begins in which function?",
      [
        "`main()`",
        "The first function written in the file",
        "A function with the same name as the file",
        "Whichever function is marked `public`",
      ],
      0,
      "Every C++ program starts in `int main()`, no matter where it appears in the file.",
    ),
  ],
  "cpp-1": [
    quiz(
      "What does `cout << \"Score: \" << 100 << endl;` print?",
      [
        "`Score: 100` followed by a new line",
        "`Score:` on one line and `100` on the next",
        "`\"Score: \" << 100`",
        "Nothing — `cout` cannot print numbers",
      ],
      0,
      "Each `<<` pushes the next value into the same output stream; `endl` ends the line.",
    ),
    quiz(
      "Which line fails to compile?",
      ["`Cout << \"Hi\";`", "`cout << \"Hi\";`", "`cout << 3 + 4;`", "`// Cout << \"Hi\";`"],
      0,
      "C++ is case-sensitive, so `Cout` is an unknown name. The last line is a comment, so the compiler ignores it.",
    ),
  ],
  "cpp-2": [
    quiz(
      "Which of these is caught at compile time rather than while the program runs?",
      [
        "A missing semicolon after a statement",
        "Dividing by a variable that turns out to be 0",
        "The user typing letters when a number is expected",
        "A loop that runs one time too many",
      ],
      0,
      "Syntax mistakes like a missing `;` stop the compiler. The others only show up while the program is running.",
    ),
    quiz(
      "In `g++ lesson.cpp -o lesson`, what does `-o lesson` do?",
      [
        "Names the output executable `lesson`",
        "Opens `lesson.cpp` in an editor",
        "Turns on maximum optimization",
        "Runs the program right after compiling",
      ],
      0,
      "`-o` sets the output file name. You still run it yourself with `./lesson`.",
    ),
  ],
  "cpp-3": [
    quiz(
      "Which type best stores a product price such as `19.99`?",
      ["`double`", "`int`", "`char`", "`bool`"],
      0,
      "`double` holds decimal values. An `int` would drop the `.99`.",
    ),
    quiz(
      "What does this print? `int health = 100; health = health - 25; cout << health;`",
      ["`75`", "`100`", "`-25`", "`100 - 25`"],
      0,
      "The right side is evaluated first (100 - 25), then the result is stored back into `health`.",
    ),
  ],
  "cpp-4": [
    quiz(
      "Given `const int MAX_HEALTH = 100;`, what happens at the line `MAX_HEALTH = 200;`?",
      [
        "The compiler reports an error",
        "`MAX_HEALTH` becomes 200",
        "The assignment is silently ignored",
        "The program crashes when it reaches that line",
      ],
      0,
      "`const` values cannot be reassigned. The compiler enforces this before the program ever runs.",
    ),
    quiz(
      "Which of these is a `char` literal?",
      ["`'A'`", "`\"A\"`", "`A`", "`char(A)`"],
      0,
      "Single quotes make a character literal. Double quotes make a string literal, and a bare `A` is a variable name.",
    ),
  ],
  "cpp-5": [
    quiz(
      "Given `int minutes = 73;`, what are `minutes / 60` and `minutes % 60`?",
      ["`1` and `13`", "`1.21` and `0`", "`13` and `1`", "`1` and `0.13`"],
      0,
      "Integer division drops the fraction (73 / 60 = 1), and `%` gives the remainder (13).",
    ),
    quiz(
      "What is wrong with `if (score = 10)`?",
      [
        "It assigns 10 to `score` instead of comparing",
        "Nothing — it checks whether `score` equals 10",
        "It checks whether `score` is at least 10",
        "`if` cannot contain numbers",
      ],
      0,
      "`=` assigns and `==` compares. Here `score` becomes 10 and the condition is always true.",
    ),
  ],
  "cpp-6": [
    quiz(
      "The user types `Ava Smith`. What does `string name; cin >> name;` store in `name`?",
      ["`Ava`", "`Ava Smith`", "`Smith`", "An empty string"],
      0,
      "`cin >>` stops at the first space. Use `getline(cin, name)` to read the whole line.",
    ),
    quiz(
      "With the input `4 7`, what does this print? `int a, b; cin >> a >> b; cout << a + b;`",
      ["`11`", "`47`", "`4 7`", "`a + b`"],
      0,
      "`cin` reads 4 into `a` and 7 into `b`. They are ints, so `+` adds them.",
    ),
  ],
  "cpp-7": [
    quiz(
      "What does this print? `int temp = 25; if (temp > 30) cout << \"Hot\"; else if (temp > 20) cout << \"Warm\"; else cout << \"Cool\";`",
      ["`Warm`", "`Hot`", "`Cool`", "`WarmCool`"],
      0,
      "25 > 30 is false and 25 > 20 is true, so only the `Warm` branch runs. An else-if chain runs at most one branch.",
    ),
    quiz(
      "Which condition is true only when the player is alive AND has the key?",
      [
        "`health > 0 && hasKey`",
        "`health > 0 || hasKey`",
        "`health > 0 && !hasKey`",
        "`!(health > 0) && hasKey`",
      ],
      0,
      "`&&` requires both sides to be true. `||` needs only one, and `!` flips a value.",
    ),
  ],
  "cpp-8": [
    quiz(
      "`choice` is 1. What prints? `switch (choice) { case 1: cout << \"A\"; case 2: cout << \"B\"; break; default: cout << \"C\"; }`",
      ["`AB`", "`A`", "`ABC`", "`C`"],
      0,
      "`case 1` has no `break`, so execution falls through into `case 2` and stops at its `break`.",
    ),
    quiz(
      "Which of these cannot be used directly as a `switch` expression?",
      ["A `string`", "An `int`", "A `char`", "An `enum` value"],
      0,
      "`switch` works on integer-like values. To branch on text, use if/else.",
    ),
  ],
  "cpp-9": [
    quiz(
      "With the body `cout << i << \" \";`, which loop header prints `0 2 4 6 8`?",
      [
        "`for (int i = 0; i < 10; i += 2)`",
        "`for (int i = 0; i <= 10; i += 2)`",
        "`for (int i = 2; i < 10; i += 2)`",
        "`for (int i = 0; i < 10; i++)`",
      ],
      0,
      "It starts at 0, steps by 2, and stops before 10. Using `<=` would also print 10, and starting at 2 would skip 0.",
    ),
    quiz(
      "What does this print? `int total = 0; for (int i = 1; i <= 3; i++) total += i; cout << total;`",
      ["`6`", "`3`", "`4`", "`123`"],
      0,
      "`total` builds up 1 + 2 + 3 = 6.",
    ),
  ],
  "cpp-10": [
    quiz(
      "Which loop always runs its body at least once?",
      ["`do-while`", "`while`", "`for`", "range-based `for`"],
      0,
      "`do-while` checks its condition after the body, so the body always runs once.",
    ),
    quiz(
      "Why does this never stop? `int n = 3; while (n > 0) { cout << n; }`",
      [
        "`n` never changes, so `n > 0` stays true",
        "`while` conditions cannot use `>`",
        "`cout` resets `n` to 3 each time",
        "It does stop, after printing 3 three times",
      ],
      0,
      "Something inside the loop must move the condition toward false, such as `n--;`.",
    ),
  ],
  "cpp-11": [
    quiz(
      "Which function correctly returns twice its input?",
      [
        "`int doubleIt(int s) { return s * 2; }`",
        "`void doubleIt(int s) { return s * 2; }`",
        "`int doubleIt(int s) { s * 2; }`",
        "`doubleIt(int s) { return s * 2; }`",
      ],
      0,
      "A function that returns a value needs a matching return type and a `return` statement. A `void` function cannot return a value.",
    ),
    quiz(
      "`sayHello()` is defined below `main()` with nothing declared above it. What happens when `main()` calls it?",
      [
        "Compile error: `sayHello` was not declared in this scope",
        "It works — the compiler searches the whole file first",
        "It compiles but prints nothing",
        "It compiles but crashes when called",
      ],
      0,
      "Names must be declared before use. Move the function above `main()` or add the prototype `void sayHello();`.",
    ),
  ],
  "cpp-12": [
    quiz(
      "Given `double addTax(double price, double rate = 0.1)`, what does `addTax(100)` return?",
      ["`110`", "`100`", "`100.1`", "Compile error — `rate` is missing"],
      0,
      "`rate` uses its default of 0.1, so the result is 100 + 100 × 0.1 = 110.",
    ),
    quiz(
      "What does this print?\n```\nvoid boost(int s) { s += 10; }\n\nint score = 5;\nboost(score);\ncout << score;\n```",
      ["`5`", "`15`", "`10`", "Compile error"],
      0,
      "`s` is a copy of `score`, so changing it does not affect the original. A reference parameter (`int& s`) would change it.",
    ),
  ],
  "cpp-13": [
    quiz(
      "Which pair is a valid function overload?",
      [
        "`void print(int n)` and `void print(double d)`",
        "`int area(int w)` and `double area(int w)`",
        "`void show(int a)` and `void show(int b)`",
        "`void reset()` defined twice with the same body",
      ],
      0,
      "Overloads must have different parameter lists. A different return type or parameter name alone does not count.",
    ),
    quiz(
      "What happens here? `void gainXP() { int bonus = 5; }` then in `main()`: `gainXP(); cout << bonus;`",
      [
        "Compile error: `bonus` is not in scope in `main()`",
        "Prints `5`",
        "Prints `0`",
        "Prints a garbage value",
      ],
      0,
      "`bonus` is local to `gainXP()`, so code outside that function cannot see it.",
    ),
  ],
  "cpp-14": [
    quiz(
      "For `int temps[7];`, what is the last valid index?",
      ["`6`", "`7`", "`8`", "`1`"],
      0,
      "Indexes run from 0 to size - 1. `temps[7]` is out of bounds.",
    ),
    quiz(
      "After `int scores[3] = {88, 92, 75}; scores[2] = 80;`, what is `scores[0] + scores[2]`?",
      ["`168`", "`163`", "`180`", "`172`"],
      0,
      "`scores[0]` is 88, and `scores[2]` was changed from 75 to 80. 88 + 80 = 168.",
    ),
  ],
  "cpp-15": [
    quiz(
      "What does this print? `string first = \"Poly\"; string full = first + \"Code\"; cout << full.length();`",
      ["`8`", "`4`", "`PolyCode`", "`2`"],
      0,
      "`+` joins the strings into `PolyCode`, and `length()` counts its 8 characters.",
    ),
    quiz(
      "Which line reads a full line with spaces, such as `New York`, into `string city`?",
      ["`getline(cin, city);`", "`cin >> city;`", "`cin << city;`", "`city = cin;`"],
      0,
      "`getline` reads up to the Enter key. `cin >>` stops at the first space.",
    ),
  ],
  "cpp-16": [
    quiz(
      "What is `cart.size()` after this? `vector<string> cart; cart.push_back(\"Milk\"); cart.push_back(\"Bread\"); cart.push_back(\"Eggs\");`",
      ["`3`", "`2`", "`0`", "`4`"],
      0,
      "The vector starts empty, and each `push_back` adds one element.",
    ),
    quiz(
      "You don't know how many scores a player will earn. Why use a `vector` instead of `int scores[10]`?",
      [
        "A vector grows with `push_back`; a C-style array's size is fixed",
        "Vectors can only store `int` values",
        "Loops cannot read C-style arrays",
        "Vectors don't need an `#include`",
      ],
      0,
      "A vector resizes automatically, so you don't have to guess a maximum size up front.",
    ),
  ],
  "cpp-17": [
    quiz(
      "What does this print? `int prices[3] = {5, 10, 3}; int sum = 0; for (int i = 0; i < 3; i++) sum += prices[i]; cout << sum;`",
      ["`18`", "`15`", "`13`", "`3`"],
      0,
      "The loop visits indexes 0, 1 and 2: 5 + 10 + 3 = 18.",
    ),
    quiz(
      "`vector<int> v = {1, 2, 3}; for (int x : v) x *= 2;` — what is in `v` afterwards?",
      [
        "`{1, 2, 3}` — `x` is a copy of each element",
        "`{2, 4, 6}`",
        "`{2, 2, 3}` — only the first element changes",
        "Nothing — it doesn't compile",
      ],
      0,
      "`int x` copies each element. To change the vector, use `int& x` or an index loop.",
    ),
  ],
  "cpp-18": [
    quiz(
      "What does this print? `int coins = 50; int* ptr = &coins; *ptr = 60; cout << coins;`",
      ["`60`", "`50`", "The memory address of `coins`", "Compile error"],
      0,
      "`ptr` holds the address of `coins`, so writing through `*ptr` changes `coins` itself.",
    ),
    quiz(
      "Given `int* p = &hp;`, what do `p` and `*p` give you?",
      [
        "`p` is the address of `hp`; `*p` is the value of `hp`",
        "`p` is the value of `hp`; `*p` is its address",
        "Both give the value of `hp`",
        "Both give the address of `hp`",
      ],
      0,
      "A pointer stores an address, and `*` dereferences it to reach the value stored there.",
    ),
  ],
  "cpp-19": [
    quiz(
      "What does this print? `int balance = 200; int& ref = balance; ref += 50; cout << balance;`",
      ["`250`", "`200`", "`50`", "Compile error"],
      0,
      "`ref` is another name for `balance`, so changing `ref` changes `balance`.",
    ),
    quiz(
      "Which declaration does NOT compile?",
      ["`int& r;`", "`int x = 5; int& r = x;`", "`int* p = nullptr;`", "`int x = 5; int* p = &x;`"],
      0,
      "A reference must be bound to an object when it is declared. Pointers can start out null.",
    ),
  ],
  "cpp-20": [
    quiz(
      "What happens when this runs? `int* key = nullptr; cout << *key;`",
      [
        "Undefined behavior — it usually crashes",
        "It prints `0`",
        "It prints `nullptr`",
        "It fails to compile",
      ],
      0,
      "This compiles, but dereferencing a null pointer is undefined behavior. Always check the pointer first.",
    ),
    quiz(
      "What is the safe way to use a pointer `p` that might be null?",
      [
        "Check `if (p != nullptr)` before using `*p`",
        "Dereference `*p` first, then check the value",
        "Set `p = 0` and then dereference it",
        "Print `p` instead of `*p` to get the value",
      ],
      0,
      "Check for null first, then dereference only when the pointer points to a real object.",
    ),
  ],
  "cpp-21": [
    quiz(
      "With `struct Player { string name; int health; int level; };`, what is `hero.health` after `Player hero = {\"Nova\", 100, 5}; hero.health -= 10;`?",
      ["`90`", "`100`", "`95`", "`-10`"],
      0,
      "Brace initialization fills the fields in order (health = 100), and then 10 is subtracted.",
    ),
    quiz(
      "Why model a book as `struct Book { string title; int pages; };` instead of two separate variables?",
      [
        "It groups related data into one type you can pass around and store in arrays",
        "Structs make the program run without `main()`",
        "Struct members cannot be changed, so they are safer",
        "Structs store only numbers, which makes them faster",
      ],
      0,
      "A struct keeps data that belongs together in one object, such as `book.title` and `book.pages`.",
    ),
  ],
  "cpp-22": [
    quiz(
      "Given `enum Difficulty { EASY, NORMAL, HARD };`, what integer value does `HARD` have?",
      ["`2`", "`3`", "`1`", "`0`"],
      0,
      "Plain enums start at 0 and count up: EASY = 0, NORMAL = 1, HARD = 2.",
    ),
    quiz(
      "With `enum class Color { RED, GREEN, BLUE };`, which line is valid?",
      [
        "`Color c = Color::GREEN;`",
        "`Color c = GREEN;`",
        "`int c = Color::GREEN;`",
        "`Color c = 1;`",
      ],
      0,
      "`enum class` values must be written with the `Color::` prefix and do not convert to or from `int` automatically.",
    ),
  ],
  "cpp-23": [
    quiz(
      "Which line creates the same alias as `typedef double Money;`?",
      ["`using Money = double;`", "`using double = Money;`", "`const Money = double;`", "`#define double Money`"],
      0,
      "`using Alias = ExistingType;` is the modern way to write a typedef.",
    ),
    quiz(
      "After `using Score = int;`, what is `Score`?",
      [
        "Another name for `int` — no new type is created",
        "A brand-new type that can't be mixed with `int`",
        "A variable that starts at 0",
        "A namespace for score functions",
      ],
      0,
      "An alias is only a nickname: a `Score` is an `int` and can be used anywhere an `int` can.",
    ),
  ],
  "cpp-24": [
    quiz(
      "What does this print?\n```\nclass Dog {\npublic:\n    string name;\n    void bark() { cout << name << \" says woof!\"; }\n};\n\nDog d;\nd.name = \"Rex\";\nd.bark();\n```",
      ["`Rex says woof!`", "`says woof!` with no name", "`name says woof!`", "Compile error"],
      0,
      "`bark()` uses the `name` stored in the object it is called on, which is `d`.",
    ),
    quiz(
      "If you write no access label at all, members of a `class` are:",
      ["`private`", "`public`", "`protected`", "`static`"],
      0,
      "Class members are private by default, and struct members are public by default. That is why the examples write `public:`.",
    ),
  ],
  "cpp-25": [
    quiz(
      "Which of these is a valid constructor inside `class Hero`?",
      [
        "`Hero(string n, int h) : name(n), hp(h) {}`",
        "`void Hero(string n, int h) { name = n; }`",
        "`int Hero() { return 0; }`",
        "`hero(string n) { name = n; }`",
      ],
      0,
      "A constructor has exactly the class's name and no return type, not even `void`. Names are case-sensitive.",
    ),
    quiz(
      "When does the constructor run for `Hero h(\"Nova\", 100);`?",
      [
        "Once, when `h` is created on that line",
        "Every time a method is called on `h`",
        "When the program ends",
        "Only when you call `h.Hero()` yourself",
      ],
      0,
      "Constructors run automatically at the moment an object is created.",
    ),
  ],
  "cpp-26": [
    quiz(
      "`Account` has a private `balance` and public `deposit()` and `getBalance()`. Which line in `main()` fails to compile?",
      [
        "`acc.balance = 1000;`",
        "`acc.deposit(50);`",
        "`cout << acc.getBalance();`",
        "`Account acc;`",
      ],
      0,
      "Private members are hidden from outside the class, so changes have to go through the public methods.",
    ),
    quiz(
      "What does the `const` mean in `double getBalance() const`?",
      [
        "The method promises not to modify the object",
        "The returned number can never change",
        "The method can only be called once",
        "`balance` becomes a constant for the whole class",
      ],
      0,
      "A `const` member function can read the object's fields but cannot change them.",
    ),
  ],
  "cpp-27": [
    quiz(
      "With `template <typename T> T maximum(T a, T b) { return (a > b) ? a : b; }`, what does `maximum(2.5, 1.1)` return?",
      ["`2.5`", "`2`", "`1.1`", "Compile error — `T` must be `int`"],
      0,
      "The compiler deduces `T = double` from the arguments and returns the larger value.",
    ),
    quiz(
      "In `vector<int> scores;`, what does `<int>` do?",
      [
        "Gives the vector template its element type",
        "Limits the vector to a single element",
        "Converts the vector into an `int`",
        "Includes the `int` header",
      ],
      0,
      "`vector` is a class template, and `<int>` fills in its type parameter, so it becomes a vector of ints.",
    ),
  ],
  "cpp-28": [
    quiz(
      "You need to look up how many of each item are in stock by item name. Which container fits best?",
      ["`map<string, int>`", "`vector<int>`", "`set<string>`", "`string`"],
      0,
      "A map links each key (the item name) to a value (the count), like a dictionary.",
    ),
    quiz(
      "What does this print? `set<int> tags = {3, 1, 3, 2}; cout << tags.size();`",
      ["`3`", "`4`", "`2`", "`1`"],
      0,
      "A set keeps only unique values, so the duplicate 3 is stored once: {1, 2, 3}.",
    ),
  ],
  "cpp-29": [
    quiz(
      "What does this print? `try { throw runtime_error(\"Invalid age\"); cout << \"A\"; } catch (const exception& e) { cout << e.what(); }`",
      ["`Invalid age`", "`AInvalid age`", "`A`", "Nothing — the program stops"],
      0,
      "`throw` jumps straight to the matching `catch`, so `cout << \"A\"` never runs.",
    ),
    quiz(
      "Why catch exceptions as `catch (const exception& e)`?",
      [
        "It avoids copying, and it keeps the real exception type so `what()` gives the right message",
        "It is the only catch syntax that compiles",
        "It stops the exception from ever being thrown",
        "It automatically retries the code in the `try` block",
      ],
      0,
      "Catching by value copies the exception and can slice a derived type down to its base. Catching by reference avoids both.",
    ),
  ],
  "cpp-30": [
    quiz(
      "What does this print? `char op = '-'; int x = 10, y = 3, result = 0; switch (op) { case '+': result = x + y; break; case '-': result = x - y; break; } cout << result;`",
      ["`7`", "`13`", "`0`", "`10`"],
      0,
      "`op` matches `case '-'`, so `result = 10 - 3`.",
    ),
    quiz(
      "A user enters `*`, but your calculator's switch only handles `+` and `-`. What is the best fix?",
      [
        "Add a `default:` case that prints an \"unknown operator\" message",
        "Remove the `break` statements",
        "Change `op` from `char` to `int`",
        "Leave it — printing 0 is fine",
      ],
      0,
      "`default` catches every value no case handles, so the user gets clear feedback instead of a wrong answer.",
    ),
  ],
  "cpp-31": [
    quiz(
      "Which container is the best default for a growing list of scores in order?",
      ["`vector`", "`map`", "`set`", "an `enum`"],
      0,
      "`vector` keeps items in order and grows with `push_back`. A set would drop duplicate scores.",
    ),
    quiz(
      "What does this print? `vector<int> scores = {90, 85, 92}; int sum = 0; for (int s : scores) sum += s; cout << sum / 3;`",
      ["`89`", "`89.0`", "`267`", "`90`"],
      0,
      "The sum is 267, and integer division by 3 gives 89 with no decimal part.",
    ),
  ],
};
