// C++ Functions Curriculum — Beginner → Advanced

function text(content) {
  return { type: "text", content };
}

function code(label, content) {
  return { type: "code", lang: "cpp", label, content };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

export const CHAPTERS = [
  {
    id: "intro",
    title: "Introduction to Functions",
    icon: "🧩",
    color: "#60a5fa",
    lessons: [
      {
        id: "funcs-1",
        title: "What is a Function?",
        xp: 10,
        theory: [
          text(
            "A function is a reusable block of code that performs a task. In C++, functions let you name behavior, accept inputs, and return outputs.",
          ),
          callout(
            "info",
            "Key point: keep functions small, focused, and easy to reuse.",
          ),
          code(
            "Basic function",
            `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    cout << add(2, 3) << endl; // 5
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Write a greet() function",
          description:
            "Create a function `greet(string name)` that prints `Hello, <name>!`. Call it from `main()` with your name.",
          starterCode: `#include <iostream>
using namespace std;

// TODO: implement greet()

int main() {
    // call greet("YourName")
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    greet("Alice");
    return 0;
}`,
          tests: [
            { id: 1, label: "greet function exists", keywords: [{ pattern: "void\\s+greet\\s*\\(\\s*(const\\s+)?(std::)?string" }] },
            { id: 2, label: "Output contains Hello, Alice!", keywords: [{ pattern: "Hello," }, { pattern: "greet\\s*\\(\\s*\"Alice\"\\s*\\)" }] },
          ],
        },
      },
      {
        id: "funcs-2",
        title: "Parameters & Return",
        xp: 10,
        theory: [
          text(
            "Functions accept inputs called parameters and can return values. Use `void` when nothing needs to be returned.",
          ),
          callout(
            "tip",
            "Parameters are passed by value by default, so the original arguments stay unchanged unless a reference is used.",
          ),
          code(
            "Returning a value",
            `#include <iostream>
using namespace std;

int square(int x) {
    return x * x;
}

int main() {
    cout << square(6) << endl; // 36
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Max of Two",
          description:
            "Write `int maxOfTwo(int a, int b)` that returns the larger number. Test it in `main()`.",
          starterCode: `#include <iostream>
using namespace std;

int maxOfTwo(int a, int b) {
    // TODO
}

int main() {
    cout << maxOfTwo(7, 10) << endl; // 10
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int maxOfTwo(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    cout << maxOfTwo(7, 10) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "maxOfTwo returns 10 for (7,10)", keywords: [{ pattern: "int\\s+maxOfTwo\\s*\\(\\s*int\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" }, { pattern: "return\\s+[^;]*[<>]|max\\s*\\(" }] },
          ],
        },
      },
      {
        id: "funcs-3",
        title: "Function Prototypes",
        xp: 10,
        theory: [
          text(
            "A function prototype declares the function signature before the body is defined. This enables calls earlier in the source file.",
          ),
          callout(
            "info",
            "Reference: prototypes are commonly placed in headers to share functions between source files.",
          ),
          code(
            "Prototype example",
            `#include <iostream>
using namespace std;

int multiply(int a, int b); // prototype

int main() {
    cout << multiply(4, 5) << endl; // 20
    return 0;
}

int multiply(int a, int b) {
    return a * b;
}`,
          ),
        ],
        challenge: {
          title: "Use a function prototype",
          description:
            "Declare `int add(int a, int b);` before `main()`, define it below `main()`, and call it.",
          starterCode: `#include <iostream>
using namespace std;

// TODO: add prototype here

int main() {
    cout << add(3, 4) << endl;
    return 0;
}

// TODO: define add here
`,
          solutionCode: `#include <iostream>
using namespace std;

int add(int a, int b);

int main() {
    cout << add(3, 4) << endl;
    return 0;
}

int add(int a, int b) {
    return a + b;
}`,
          tests: [
            { id: 1, label: "Prototype is used before definition", keywords: [{ pattern: "int\\s+add\\s*\\([^)]*\\)\\s*;[\\s\\S]*int\\s+main[\\s\\S]*int\\s+add\\s*\\([^)]*\\)\\s*\\{" }] },
          ],
        },
      },
    ],
  },
  {
    id: "parameters",
    title: "Parameters, References & const",
    icon: "🔁",
    color: "#f59e0b",
    lessons: [
      {
        id: "funcs-4",
        title: "Pass by Value",
        xp: 10,
        theory: [
          text(
            "By default, C++ passes parameters by value, copying the argument into the function and keeping the original unchanged.",
          ),
          callout(
            "tip",
            "Use pass by value for small built-in types and when you want to protect the original data.",
          ),
          code(
            "Value copy",
            `#include <iostream>
using namespace std;

void setZero(int x) {
    x = 0;
}

int main() {
    int value = 5;
    setZero(value);
    cout << value << endl; // 5
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Value copy behavior",
          description:
            "Write `void hideValue(int x)` that sets `x = 0`. Call it from `main()` and print the original variable to prove it does not change.",
          starterCode: `#include <iostream>
using namespace std;

void hideValue(int x) {
    // TODO
}

int main() {
    int secret = 42;
    hideValue(secret);
    cout << secret << endl; // should still be 42
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

void hideValue(int x) {
    x = 0;
}

int main() {
    int secret = 42;
    hideValue(secret);
    cout << secret << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Original value remains unchanged", keywords: [{ pattern: "void\\s+hideValue\\s*\\(\\s*int\\s+(\\w+)\\s*\\)\\s*\\{[^}]*\\b\\1\\s*=" }, { pattern: "hideValue\\s*\\(\\s*\\w+\\s*\\)\\s*;" }] },
          ],
        },
      },
      {
        id: "funcs-5",
        title: "Pass by Reference",
        xp: 15,
        theory: [
          text(
            "Pass by reference uses `T&` to let the function modify the caller's data directly without making a copy.",
          ),
          callout(
            "info",
            "References are ideal for large objects and when the function should update data in place.",
          ),
          code(
            "Reference parameter",
            `#include <iostream>
using namespace std;

void increment(int& x) {
    x++;
}

int main() {
    int a = 4;
    increment(a);
    cout << a << endl; // 5
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Swap values by reference",
          description:
            "Write `void swapValues(int& a, int& b)` that swaps two ints using references. Test it in `main()`.",
          starterCode: `#include <iostream>
using namespace std;

void swapValues(int& a, int& b) {
    // TODO
}

int main() {
    int x = 10, y = 20;
    swapValues(x, y);
    cout << x << " " << y << endl; // 20 10
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

void swapValues(int& a, int& b) {
    int t = a;
    a = b;
    b = t;
}

int main() {
    int x = 10, y = 20;
    swapValues(x, y);
    cout << x << " " << y << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "swapValues swaps x and y", keywords: [{ pattern: "void\\s+swapValues\\s*\\(\\s*int\\s*&\\s*\\w+\\s*,\\s*int\\s*&\\s*\\w+\\s*\\)\\s*\\{[^}]*(\\bswap\\s*\\(|=)" }] },
          ],
        },
      },
      {
        id: "funcs-6",
        title: "const Reference Parameters",
        xp: 15,
        theory: [
          text(
            "Use `const T&` to avoid copies while promising not to modify the input.",
          ),
          callout(
            "tip",
            "This is the recommended pattern for passing large objects like strings or vectors.",
          ),
          code(
            "const reference",
            `#include <iostream>
#include <string>
using namespace std;

void printWord(const string& word) {
    cout << word << endl;
}

int main() {
    string message = "Hello";
    printWord(message);
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Sum using const reference",
          description:
            "Write `int sum(const vector<int>& values)` that returns the total of all numbers.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int sum(const vector<int>& values) {
    // TODO
}

int main() {
    vector<int> nums = {1, 2, 3, 4};
    cout << sum(nums) << endl; // 10
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int sum(const vector<int>& values) {
    int total = 0;
    for (int value : values) total += value;
    return total;
}

int main() {
    vector<int> nums = {1, 2, 3, 4};
    cout << sum(nums) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "sum returns 10 for the sample vector", keywords: [{ pattern: "int\\s+sum\\s*\\(\\s*const\\s+(std::)?vector\\s*<\\s*int\\s*>\\s*&" }, { pattern: "\\+=|accumulate\\s*\\(" }] },
          ],
        },
      },
    ],
  },
  {
    id: "syntax",
    title: "Overloads, Defaults & Templates",
    icon: "⚙️",
    color: "#f59e0b",
    lessons: [
      {
        id: "funcs-7",
        title: "Default Arguments",
        xp: 15,
        theory: [
          text(
            "Default arguments let callers omit parameters when sensible defaults are provided.",
          ),
          callout(
            "info",
            "Default values become part of the function signature and help simplify calls.",
          ),
          code(
            "Default argument",
            `#include <iostream>
using namespace std;

void greet(string name, int times = 1) {
    for (int i = 0; i < times; ++i) cout << "Hello, " << name << "!\\n";
}

int main() {
    greet("Alex");
    greet("Alex", 3);
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Greeter with default argument",
          description:
            "Write `void greet(string name, int times = 1)` and call it with one or two arguments.",
          starterCode: `#include <iostream>
#include <string>
using namespace std;

void greet(string name, int times = 1) {
    // TODO
}

int main() {
    greet("Sam");
    greet("Sam", 2);
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

void greet(string name, int times = 1) {
    for (int i = 0; i < times; ++i) cout << "Hello, " << name << "!\\n";
}

int main() {
    greet("Sam");
    greet("Sam", 2);
    return 0;
}`,
          tests: [
            { id: 1, label: "greet works with one or two arguments", keywords: [{ pattern: "void\\s+greet\\s*\\([^)]*int\\s+(\\w+)\\s*=\\s*\\d+\\s*\\)" }, { pattern: "(for|while)\\s*\\([^)]*\\btimes\\b" }, { pattern: "cout\\s*<<" }, { pattern: "greet\\s*\\(\\s*\"\\w+\"\\s*\\)" }, { pattern: "greet\\s*\\(\\s*\"\\w+\"\\s*,\\s*\\d+\\s*\\)" }] },
          ],
        },
      },
      {
        id: "funcs-8",
        title: "Function Overloading",
        xp: 15,
        theory: [
          text(
            "Overloading lets you define multiple functions with the same name but different parameter lists.",
          ),
          callout(
            "tip",
            "Use overloading for related operations that differ only by argument type or count.",
          ),
          code(
            "Overloaded area",
            `#include <iostream>
using namespace std;

int area(int side) {
    return side * side;
}

int area(int width, int height) {
    return width * height;
}

int main() {
    cout << area(5) << endl; // 25
    cout << area(4, 6) << endl; // 24
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Overload area",
          description:
            "Implement two `area` overloads: one for a square and one for a rectangle.",
          starterCode: `#include <iostream>
using namespace std;

int area(int side) {
    // TODO
}

int area(int width, int height) {
    // TODO
}

int main() {
    cout << area(5) << endl;
    cout << area(4, 6) << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int area(int side) {
    return side * side;
}

int area(int width, int height) {
    return width * height;
}

int main() {
    cout << area(5) << endl;
    cout << area(4, 6) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Square overload returns 25", keywords: [{ pattern: "int\\s+area\\s*\\(\\s*int\\s+(\\w+)\\s*\\)\\s*\\{[^}]*return\\s+[^;]*(\\b\\1\\s*\\*\\s*\\1\\b|pow\\s*\\()" }] },
            { id: 2, label: "Rectangle overload returns 24", keywords: [{ pattern: "int\\s+area\\s*\\(\\s*int\\s+(\\w+)\\s*,\\s*int\\s+(\\w+)\\s*\\)\\s*\\{[^}]*return\\s+[^;]*(\\b\\1\\s*\\*\\s*\\2\\b|\\b\\2\\s*\\*\\s*\\1\\b)" }] },
          ],
        },
      },
      {
        id: "funcs-9",
        title: "Function Templates",
        xp: 20,
        theory: [
          text(
            "Templates let you write a single function body that works with many types.",
          ),
          callout(
            "info",
            "Templates are the foundation of generic C++ code and the STL.",
          ),
          code(
            "Template max",
            `#include <iostream>
using namespace std;

template <typename T>
T maxOf(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << maxOf(3, 7) << endl; // 7
    cout << maxOf(4.5, 2.1) << endl; // 4.5
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Generic max function",
          description:
            "Write a template function `maxOf<T>(T a, T b)` that returns the larger value.",
          starterCode: `#include <iostream>
using namespace std;

template <typename T>
T maxOf(T a, T b) {
    // TODO
}

int main() {
    cout << maxOf(5, 8) << endl;
    cout << maxOf(2.5, 1.2) << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

template <typename T>
T maxOf(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << maxOf(5, 8) << endl;
    cout << maxOf(2.5, 1.2) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Template maxOf returns 8 for ints", keywords: [{ pattern: "template\\s*<\\s*(typename|class)\\s+\\w+\\s*>" }, { pattern: "maxOf\\s*\\([^)]*\\)\\s*\\{[^}]*return\\s+[^;]*([<>]|max\\s*\\()" }, { pattern: "maxOf\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*\\)" }] },
            { id: 2, label: "Template maxOf returns 2.5 for doubles", keywords: [{ pattern: "template\\s*<\\s*(typename|class)\\s+\\w+\\s*>" }, { pattern: "maxOf\\s*\\([^)]*\\)\\s*\\{[^}]*return\\s+[^;]*([<>]|max\\s*\\()" }, { pattern: "maxOf\\s*\\(\\s*\\d+\\.\\d+\\s*,\\s*\\d+\\.\\d+\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "functional",
    title: "Lambdas, Callbacks & std::function",
    icon: "🧠",
    color: "#7c3aed",
    lessons: [
      {
        id: "funcs-10",
        title: "Lambda Expressions",
        xp: 20,
        theory: [
          text(
            "Lambdas are anonymous function objects that are useful for short callbacks and inline logic.",
          ),
          callout(
            "info",
            "Lambdas capture surrounding variables and make local behavior easier to express.",
          ),
          code(
            "Lambda example",
            `#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1,2,3,4,5};
    int sum = 0;
    for_each(v.begin(), v.end(), [&](int x) { sum += x; });
    cout << sum << endl; // 15
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Count even numbers",
          description:
            "Use a lambda with `std::count_if` to count how many numbers in a vector are even.",
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1,2,3,4,5,6};
    int evens = 0;
    // TODO: count evens with lambda
    cout << evens << endl; // 3
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1,2,3,4,5,6};
    int evens = count_if(v.begin(), v.end(), [](int x) { return x % 2 == 0; });
    cout << evens << endl; // 3
    return 0;
}`,
          tests: [
            { id: 1, label: "Lambda counts evens correctly", keywords: [{ pattern: "\\[[^\\]]*\\]\\s*\\(\\s*int\\s+\\w+\\s*\\)" }, { pattern: "%\\s*2\\s*==\\s*0" }, { pattern: "count_if\\s*\\(|\\+\\+|\\+=" }] },
          ],
        },
      },
      {
        id: "funcs-11",
        title: "std::function & Callbacks",
        xp: 20,
        theory: [
          text(
            "`std::function` can store function pointers, lambdas, or functors for flexible callbacks.",
          ),
          callout(
            "tip",
            "Use `std::function` when callback types need to be interchangeable at runtime.",
          ),
          code(
            "Callback example",
            `#include <iostream>
#include <functional>
using namespace std;

void callTwice(function<void()> f) {
    f();
    f();
}

int main() {
    callTwice([](){ cout << "Hi\\n"; });
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Callback runner",
          description:
            "Write `runNTimes(function<void()> f, int n)` that calls `f` n times and verify it with a counter.",
          starterCode: `#include <iostream>
#include <functional>
using namespace std;

void runNTimes(function<void()> f, int n) {
    // TODO
}

int main() {
    int c = 0;
    runNTimes([&](){ c++; }, 5);
    cout << c << endl; // 5
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <functional>
using namespace std;

void runNTimes(function<void()> f, int n) {
    for (int i = 0; i < n; ++i) f();
}

int main() {
    int c = 0;
    runNTimes([&](){ c++; }, 5);
    cout << c << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "runNTimes increments counter to 5", keywords: [{ pattern: "void\\s+runNTimes\\s*\\(\\s*(std::)?function\\s*<\\s*void\\s*\\(\\s*\\)\\s*>" }, { pattern: "(for|while)\\s*\\(" }, { pattern: "\\[\\s*&" }] },
          ],
        },
      },
      {
        id: "funcs-12",
        title: "Captures & Closures",
        xp: 20,
        theory: [
          text(
            "Capture lists let lambdas access variables from the surrounding scope by value or reference.",
          ),
          callout(
            "info",
            "Capture by reference is useful for mutable counters; capture by value freezes state at creation.",
          ),
          code(
            "Lambda capture",
            `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int total = 0;
    vector<int> values = {1, 2, 3};
    for_each(values.begin(), values.end(), [&](int x) { total += x; });
    cout << total << endl; // 6
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Counting closure",
          description:
            "Create a lambda that captures a counter by reference and increments it each time it is called.",
          starterCode: `#include <iostream>
#include <functional>
using namespace std;

int main() {
    int count = 0;
    auto bump = [&]() {
        // TODO
    };

    bump();
    bump();
    bump();
    cout << count << endl; // 3
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <functional>
using namespace std;

int main() {
    int count = 0;
    auto bump = [&]() { count++; };

    bump();
    bump();
    bump();
    cout << count << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Lambda increments count to 3", keywords: [{ pattern: "\\[\\s*&\\s*(count)?\\s*\\]" }, { pattern: "count\\s*\\+\\+|\\+\\+\\s*count|count\\s*\\+=" }] },
          ],
        },
      },
    ],
  },
  {
    id: "compile-time",
    title: "Compile-Time & Modularity",
    icon: "⚡",
    color: "#7c3aed",
    lessons: [
      {
        id: "funcs-13",
        title: "inline & constexpr",
        xp: 20,
        theory: [
          text(
            "`inline` suggests inlining the function body to the compiler. `constexpr` allows evaluation at compile time.",
          ),
          callout(
            "info",
            "`constexpr` functions can be used in compile-time expressions and constant initialization.",
          ),
          code(
            "constexpr function",
            `#include <iostream>
using namespace std;

constexpr int square(int x) {
    return x * x;
}

int main() {
    constexpr int nine = square(3);
    cout << nine << endl; // 9
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Compile-time square",
          description:
            "Write a `constexpr int square(int x)` function and use it in a `constexpr` variable.",
          starterCode: `#include <iostream>
using namespace std;

constexpr int square(int x) {
    // TODO
}

int main() {
    constexpr int value = square(4);
    cout << value << endl; // 16
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

constexpr int square(int x) {
    return x * x;
}

int main() {
    constexpr int value = square(4);
    cout << value << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "constexpr square returns 16", keywords: [{ pattern: "constexpr\\s+int\\s+square\\s*\\(" }, { pattern: "return\\s+\\w+\\s*\\*\\s*\\w+" }] },
          ],
        },
      },
      {
        id: "funcs-14",
        title: "Headers & Namespaces",
        xp: 20,
        theory: [
          text(
            "Group function declarations in headers and definitions in source files. Namespaces avoid naming conflicts.",
          ),
          callout(
            "tip",
            "Use namespaces for library-style APIs and to keep global names organized.",
          ),
          code(
            "Namespace example",
            `#include <iostream>
using namespace std;

namespace math {
    int clamp(int value, int low, int high) {
        if (value < low) return low;
        if (value > high) return high;
        return value;
    }
}

int main() {
    cout << math::clamp(12, 0, 10) << endl; // 10
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Namespace clamp",
          description:
            "Implement `math::clamp(int value, int low, int high)` and call it from `main()`.",
          starterCode: `#include <iostream>
using namespace std;

namespace math {
    int clamp(int value, int low, int high) {
        // TODO
    }
}

int main() {
    cout << math::clamp(12, 0, 10) << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

namespace math {
    int clamp(int value, int low, int high) {
        if (value < low) return low;
        if (value > high) return high;
        return value;
    }
}

int main() {
    cout << math::clamp(12, 0, 10) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "math::clamp returns 10 for (12,0,10)", keywords: [{ pattern: "namespace\\s+math\\s*\\{" }, { pattern: "int\\s+clamp\\s*\\([^)]*\\)\\s*\\{[^}]*(<|>|\\bmin\\s*\\(|\\bmax\\s*\\(|std::clamp)" }, { pattern: "math::clamp\\s*\\(" }] },
          ],
        },
      },
    ],
  },
  {
    id: "design",
    title: "Design & Best Practices",
    icon: "🚀",
    color: "#14b8a6",
    lessons: [
      {
        id: "funcs-15",
        title: "Function Design",
        xp: 20,
        theory: [
          text(
            "Good functions do one thing, have clear names, and avoid hidden side effects.",
          ),
          callout(
            "info",
            "C++ Core Guidelines recommend small, reusable functions and single-responsibility design.",
          ),
          code(
            "Small helper",
            `#include <iostream>
using namespace std;

bool isEven(int value) {
    return value % 2 == 0;
}

int main() {
    cout << isEven(4) << endl; // 1
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Refactor into a helper",
          description:
            "Move repeated logic into a helper function and call it from `main()`.",
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int a = 4;
    if (a % 2 == 0) {
        cout << "even" << endl;
    }
    if ((a + 1) % 2 == 0) {
        cout << "next even" << endl;
    }
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

bool isEven(int value) {
    return value % 2 == 0;
}

int main() {
    int a = 4;
    if (isEven(a)) {
        cout << "even" << endl;
    }
    if (isEven(a + 1)) {
        cout << "next even" << endl;
    }
    return 0;
}`,
          tests: [
            { id: 1, label: "Helper function is used", keywords: [{ pattern: "bool\\s+isEven\\s*\\(\\s*int\\s+\\w+\\s*\\)" }, { pattern: "%\\s*2" }, { pattern: "if\\s*\\(\\s*!?\\s*isEven\\s*\\(" }] },
          ],
        },
      },
      {
        id: "funcs-16",
        title: "Testing & Readability",
        xp: 20,
        theory: [
          text(
            "Well-designed functions are easy to test and easy to read. Keep the signature short and the body focused.",
          ),
          callout(
            "tip",
            "Prefer functions without global state so behavior is predictable and testable.",
          ),
          code(
            "Prime check",
            `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; ++i) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    cout << isPrime(11) << endl; // 1
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Prime-check function",
          description:
            "Write `bool isPrime(int n)` and call it from `main()` with several values.",
          starterCode: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    // TODO
}

int main() {
    cout << isPrime(7) << endl;
    cout << isPrime(8) << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; ++i) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    cout << isPrime(7) << endl;
    cout << isPrime(8) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "isPrime(7) returns true", keywords: [{ pattern: "bool\\s+isPrime\\s*\\(\\s*int\\s+\\w+\\s*\\)" }, { pattern: "%" }, { pattern: "return\\s+true" }] },
            { id: 2, label: "isPrime(8) returns false", keywords: [{ pattern: "bool\\s+isPrime\\s*\\(\\s*int\\s+\\w+\\s*\\)" }, { pattern: "(for|while)\\s*\\(" }, { pattern: "return\\s+false" }] },
          ],
        },
      },
    ],
  },
];

const CHAPTERS_WITH_META = CHAPTERS.map((chapter) => ({
  ...chapter,
  lessons: chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
  })),
}));

export const ALL_LESSONS = CHAPTERS_WITH_META.flatMap((ch) => ch.lessons);
export const TOTAL_XP = ALL_LESSONS.reduce((sum, lesson) => sum + (lesson.xp || 0), 0);
export default CHAPTERS_WITH_META;
