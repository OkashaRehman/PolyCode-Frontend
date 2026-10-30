// C++ Modern Curriculum — Beginner → Advanced

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
    id: "syntax",
    title: "Modern Syntax Foundations",
    icon: "✨",
    color: "#38bdf8",
    lessons: [
      {
        id: "modern-1",
        title: "auto & Type Deduction",
        xp: 15,
        theory: [
          text(
            "`auto` lets C++ deduce a variable's type from its initializer. It keeps code concise while preserving strong typing.",
          ),
          callout(
            "tip",
            "Use `auto` for long template types or when the initializer already makes the type clear.",
          ),
          code(
            "auto example",
            `#include <iostream>
#include <vector>
using namespace std;

int main() {
    auto value = 42;           // int
    auto text = string("Hi"); // std::string
    auto numbers = vector<int>{1, 2, 3};

    cout << value << " " << text << " " << numbers.size() << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Use auto correctly",
          description:
            "Replace explicit types with `auto` for the three variables in `main()` without changing the output.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int a = 10;
    string name = "Modern";
    vector<int> list = {1, 2, 3};

    cout << a << " " << name << " " << list.size() << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    auto a = 10;
    auto name = string("Modern");
    auto list = vector<int>{1, 2, 3};

    cout << a << " " << name << " " << list.size() << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "auto variables print 10 Modern 3", keywords: [{ pattern: "auto\\s+\\w+\\s*=\\s*10\\b" }, { pattern: "auto\\s+\\w+\\s*=\\s*(std::)?string" }, { pattern: "auto\\s+\\w+\\s*=\\s*(std::)?vector" }] },
          ],
        },
      },
      {
        id: "modern-2",
        title: "Range-based for Loops",
        xp: 15,
        theory: [
          text(
            "Range-based for loops simplify iterating over collections using `for (auto item : container)`.",
          ),
          callout(
            "info",
            "Use `const auto&` when you want to avoid copies and keep the loop read-only.",
          ),
          code(
            "Range-based loop",
            `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> values = {2, 4, 6};
    int sum = 0;
    for (auto value : values) {
        sum += value;
    }
    cout << sum << endl; // 12
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Sum with range-based loop",
          description:
            "Compute the total of numbers in a vector using a range-based for loop.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> values = {3, 5, 7};
    int total = 0;

    // TODO: sum the vector using range-based for

    cout << total << endl; // 15
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> values = {3, 5, 7};
    int total = 0;

    for (auto value : values) {
        total += value;
    }

    cout << total << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Sum output is 15", keywords: [{ pattern: "for\\s*\\(\\s*(const\\s+)?auto\\s*&?\\s*\\w+\\s*:\\s*\\w+\\s*\\)" }, { pattern: "\\+=" }] },
          ],
        },
      },
      {
        id: "modern-3",
        title: "Structured Bindings",
        xp: 15,
        theory: [
          text(
            "Structured bindings extract multiple values from tuples, pairs, and aggregate types with a clean syntax.",
          ),
          callout(
            "tip",
            "Structured bindings make code easier to read when a function returns multiple values.",
          ),
          code(
            "Structured bindings",
            `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

int main() {
    auto result = make_tuple(1, 2.5, string("ok"));
    
    int count;
    double average;
    string status;
    
    tie(count, average, status) = result;
    cout << count << " " << average << " " << status << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Unpack a tuple",
          description:
            "Use structured bindings to unpack the tuple returned by `getData()` and print all values.",
          starterCode: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

auto getData() {
    return make_tuple(8, 9.5, string("done"));
}

int main() {
    // TODO: unpack and print the tuple
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

auto getData() {
    return make_tuple(8, 9.5, string("done"));
}

int main() {
    auto [count, score, status] = getData();
    cout << count << " " << score << " " << status << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Unpacked values print correctly", keywords: [{ pattern: "auto\\s*&?\\s*\\[\\s*\\w+\\s*,\\s*\\w+\\s*,\\s*\\w+\\s*\\]" }] },
          ],
        },
      },
    ],
  },
  {
    id: "ownership",
    title: "Memory Safety & Ownership",
    icon: "🧠",
    color: "#ffb703",
    lessons: [
      {
        id: "modern-4",
        title: "unique_ptr Ownership",
        xp: 20,
        theory: [
          text(
            "`std::unique_ptr` owns a resource and cleans it up automatically when it goes out of scope.",
          ),
          callout(
            "info",
            "Use `unique_ptr` when a resource has single ownership and should be deleted automatically.",
          ),
          code(
            "unique_ptr example",
            `#include <iostream>
#include <memory>
using namespace std;

int main() {
    auto ptr = make_unique<int>(42);
    cout << *ptr << endl; // 42
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Move a unique_ptr",
          description:
            "Create a `std::unique_ptr<int>` and transfer ownership to another variable before printing the value.",
          starterCode: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    auto a = make_unique<int>(7);
    // TODO: move a into b
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    auto a = make_unique<int>(7);
    auto b = move(a);
    if (b) {
        cout << *b << endl; // 7
    }
    return 0;
}`,
          tests: [
            { id: 1, label: "unique_ptr moved and prints 7", keywords: [{ pattern: "make_unique\\s*<\\s*int\\s*>" }, { pattern: "\\bmove\\s*\\(" }] },
          ],
        },
      },
      {
        id: "modern-5",
        title: "shared_ptr & weak_ptr",
        xp: 20,
        theory: [
          text(
            "`std::shared_ptr` allows shared ownership. `std::weak_ptr` observes without keeping the object alive.",
          ),
          callout(
            "tip",
            "Use `weak_ptr` to break circular references and avoid memory leaks.",
          ),
          code(
            "shared_ptr example",
            `#include <iostream>
#include <memory>
using namespace std;

int main() {
    auto a = make_shared<int>(10);
    auto b = a;
    cout << *b << " " << a.use_count() << endl; // 10 2
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Weak pointer check",
          description:
            "Create a `weak_ptr` from a `shared_ptr`, reset the shared pointer, and print whether the weak pointer is still valid.",
          starterCode: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    auto shared = make_shared<int>(11);
    weak_ptr<int> watcher = shared;
    shared.reset();

    // TODO: print 1 if watcher is expired, otherwise 0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    auto shared = make_shared<int>(11);
    weak_ptr<int> watcher = shared;
    shared.reset();

    cout << watcher.expired() << endl; // 1
    return 0;
}`,
          tests: [
            { id: 1, label: "weak_ptr expired after reset", keywords: [{ pattern: "weak_ptr\\s*<" }, { pattern: "\\.reset\\s*\\(\\s*\\)" }, { pattern: "\\.expired\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "functional",
    title: "Functional Modern C++",
    icon: "📦",
    color: "#7c3aed",
    lessons: [
      {
        id: "modern-6",
        title: "Lambda Expressions",
        xp: 20,
        theory: [
          text(
            "Lambdas are anonymous functions that can capture local variables and be passed like objects.",
          ),
          callout(
            "info",
            "Use lambdas for concise callbacks and local processing logic.",
          ),
          code(
            "Lambda example",
            `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3};
    int doubled = 0;
    for_each(numbers.begin(), numbers.end(), [&](int n) { doubled += n * 2; });
    cout << doubled << endl; // 12
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Filter odd values",
          description:
            "Use a lambda with `std::count_if` to count the odd numbers in a vector.",
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> values = {1, 2, 3, 4, 5};
    int count = count_if(values.begin(), values.end(), [](int n) {
        // TODO: return true for odd numbers
        return false;
    });
    cout << count << endl; // 3
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> values = {1, 2, 3, 4, 5};
    int count = count_if(values.begin(), values.end(), [](int n) {
        return n % 2 != 0;
    });
    cout << count << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "count_if returns 3", keywords: [{ pattern: "count_if\\s*\\(" }, { pattern: "\\[[^\\]]*\\]\\s*\\(" }, { pattern: "%\\s*2\\s*(!=\\s*0|==\\s*1)" }] },
          ],
        },
      },
      {
        id: "modern-7",
        title: "Standard Algorithms",
        xp: 20,
        theory: [
          text(
            "STL algorithms like `sort`, `find_if`, and `transform` are the backbone of modern C++ data processing.",
          ),
          callout(
            "tip",
            "Prefer algorithms over manual loops when the algorithm clearly expresses the intent.",
          ),
          code(
            "std::transform",
            `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> input = {1, 2, 3};
    vector<int> output(input.size());
    transform(input.begin(), input.end(), output.begin(), [](int n) { return n * 3; });
    for (auto value : output) cout << value << " ";
    cout << endl; // 3 6 9
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Transform with a lambda",
          description:
            "Use `std::transform` to triple every number in `values` and print the result.",
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> values = {2, 4, 6};
    vector<int> output(values.size());
    // TODO: transform values into output
    for (auto value : output) cout << value << " ";
    cout << endl; // 6 12 18
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> values = {2, 4, 6};
    vector<int> output(values.size());
    transform(values.begin(), values.end(), output.begin(), [](int n) { return n * 3; });
    for (auto value : output) cout << value << " ";
    cout << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Output is 6 12 18", keywords: [{ pattern: "transform\\s*\\(" }, { pattern: "\\*\\s*3\\b|\\b3\\s*\\*" }] },
          ],
        },
      },
    ],
  },
  {
    id: "compile-time",
    title: "Compile-Time Power",
    icon: "⚡",
    color: "#22c55e",
    lessons: [
      {
        id: "modern-8",
        title: "constexpr Functions",
        xp: 20,
        theory: [
          text(
            "`constexpr` functions can be evaluated at compile time when given constant inputs.",
          ),
          callout(
            "info",
            "When a function is `constexpr`, you can use it to initialize constant expressions.",
          ),
          code(
            "constexpr example",
            `#include <iostream>
using namespace std;

constexpr int add(int a, int b) {
    return a + b;
}

int main() {
    constexpr int value = add(3, 4);
    cout << value << endl; // 7
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Compile-time add",
          description:
            "Write a `constexpr` function that adds two integers and use it to declare a constant value.",
          starterCode: `#include <iostream>
using namespace std;

constexpr int add(int a, int b) {
    // TODO
}

int main() {
    constexpr int total = add(5, 6);
    cout << total << endl; // 11
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

constexpr int add(int a, int b) {
    return a + b;
}

int main() {
    constexpr int total = add(5, 6);
    cout << total << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "constexpr add returns 11", keywords: [{ pattern: "constexpr\\s+int\\s+add\\s*\\([^)]*\\)\\s*\\{[^}]*return\\s+\\w+\\s*\\+\\s*\\w+" }, { pattern: "constexpr\\s+int\\s+\\w+\\s*=\\s*add\\s*\\(" }] },
          ],
        },
      },
      {
        id: "modern-9",
        title: "consteval & constinit",
        xp: 20,
        theory: [
          text(
            "`consteval` forces compile-time evaluation. `constinit` ensures a static variable is initialized before runtime.",
          ),
          callout(
            "tip",
            "Use `consteval` for computed constants and `constinit` for statics that are not `const`.",
          ),
          code(
            "consteval and constinit",
            `#include <iostream>
using namespace std;

// constexpr functions force/allow compile-time evaluation
constexpr int compileTimeValue() {
    return 100;
}

// constexpr ensures variable initialization happens at compile time
constexpr int runtimeReady = compileTimeValue();

int main() {
    cout << runtimeReady << endl; // 100
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Compile-time constant",
          description:
            "Declare a `consteval` function and use it to initialize a `constinit` variable.",
          starterCode: `#include <iostream>
using namespace std;

consteval int buildValue() {
    // TODO
}

constinit int value = buildValue();

int main() {
    cout << value << endl; // 42
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

consteval int buildValue() {
    return 42;
}

constinit int value = buildValue();

int main() {
    cout << value << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Value prints 42", keywords: [{ pattern: "consteval\\s+int\\s+buildValue\\s*\\(\\s*\\)\\s*\\{[^}]*return\\s+[^;]+;" }, { pattern: "constinit\\s+int\\s+\\w+\\s*=\\s*buildValue\\s*\\(" }] },
          ],
        },
      },
    ],
  },
  {
    id: "containers",
    title: "Modern Containers & Utilities",
    icon: "🧩",
    color: "#fb7185",
    lessons: [
      {
        id: "modern-10",
        title: "std::optional Basics",
        xp: 15,
        theory: [
          text(
            "`std::optional<T>` represents an optional value that may or may not be present.",
          ),
          callout(
            "info",
            "Use `optional` instead of sentinel values such as -1 or empty strings.",
          ),
          code(
            "optional example",
            `#include <iostream>
#include <string>
using namespace std;

bool tryGetName(bool success, string& outName) {
    if (success) {
        outName = "Alice";
        return true;
    }
    return false;
}

int main() {
    string name;
    if (tryGetName(true, name)) {
        cout << name << endl; // Alice
    }
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Return optional string",
          description:
            "Update `tryGetName` so it returns `nullopt` when `success` is false, and print `No name` otherwise.",
          starterCode: `#include <iostream>
#include <optional>
#include <string>
using namespace std;

optional<string> tryGetName(bool success) {
    // TODO
}

int main() {
    auto name = tryGetName(false);
    if (name) cout << *name << endl;
    else cout << "No name" << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <optional>
#include <string>
using namespace std;

optional<string> tryGetName(bool success) {
    if (success) return string("Alice");
    return nullopt;
}

int main() {
    auto name = tryGetName(false);
    if (name) cout << *name << endl;
    else cout << "No name" << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "No name prints when optional is empty", keywords: [{ pattern: "optional\\s*<\\s*(std::)?string\\s*>" }, { pattern: "nullopt" }, { pattern: "No name" }] },
          ],
        },
      },
      {
        id: "modern-11",
        title: "std::variant Basics",
        xp: 20,
        theory: [
          text(
            "`std::variant` stores one of several possible types safely and supports visitation.",
          ),
          callout(
            "tip",
            "Use `variant` when a value can be one of multiple clearly-defined types.",
          ),
          code(
            "variant example",
            `#include <iostream>
#include <string>
using namespace std;

struct DataVariant {
    enum Type { INT, STRING } type;
    int intVal;
    string strVal;

    // Constructors
    DataVariant(int val) : type(INT), intVal(val) {}
    DataVariant(const string& val) : type(STRING), intVal(0), strVal(val) {}
};

int main() {
    DataVariant data = string("hello");

    if (data.type == DataVariant::STRING) {
        cout << data.strVal << endl; // hello
    }
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Visit a variant",
          description:
            "Use `std::visit` to print either an int or a string stored in the variant.",
          starterCode: `#include <iostream>
#include <variant>
#include <string>
using namespace std;

int main() {
    variant<int, string> data = 5;
    // TODO: visit and print the value
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <variant>
#include <string>
using namespace std;

int main() {
    variant<int, string> data = 5;
    visit([](auto&& value) { cout << value << endl; }, data);
    return 0;
}`,
          tests: [
            { id: 1, label: "Variant prints 5", keywords: [{ pattern: "variant\\s*<\\s*int\\s*,\\s*(std::)?string\\s*>" }, { pattern: "visit\\s*\\(|get\\s*<\\s*int\\s*>|holds_alternative" }] },
          ],
        },
      },
      {
        id: "modern-12",
        title: "std::string_view",
        xp: 15,
        theory: [
          text(
            "`std::string_view` is a non-owning view into character data, useful for efficient string access.",
          ),
          callout(
            "tip",
            "Use `string_view` for read-only function parameters to avoid extra string copies.",
          ),
          code(
            "string_view example",
            `#include <iostream>
#include <string>
using namespace std;

// const string& avoids unnecessary copies in pre-C++17 code
void printView(const string& view) {
    cout << view << endl;
}

int main() {
    string text = "Modern C++";
    printView(text);
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Use string_view",
          description:
            "Create `printMessage` that accepts `std::string_view` and prints the message.",
          starterCode: `#include <iostream>
#include <string_view>
using namespace std;

void printMessage(string_view message) {
    // TODO
}

int main() {
    printMessage("Hello world");
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string_view>
using namespace std;

void printMessage(string_view message) {
    cout << message << endl;
}

int main() {
    printMessage("Hello world");
    return 0;
}`,
          tests: [
            { id: 1, label: "Message prints Hello world", keywords: [{ pattern: "void\\s+printMessage\\s*\\(\\s*(std::)?string_view\\s+(\\w+)\\s*\\)\\s*\\{[^}]*cout\\s*<<\\s*\\2\\b" }] },
          ],
        },
      },
    ],
  },
  {
    id: "move",
    title: "Move Semantics & Value Categories",
    icon: "🚚",
    color: "#f97316",
    lessons: [
      {
        id: "modern-13",
        title: "Move Constructors",
        xp: 20,
        theory: [
          text(
            "Move constructors transfer ownership from one object to another without copying expensive resources.",
          ),
          callout(
            "info",
            "Use `std::move` when you want to enable move semantics explicitly.",
          ),
          code(
            "move constructor example",
            `#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "move";
    string moved = move(text);
    cout << moved << " " << text.size() << endl; // move 0
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Move a string",
          description:
            "Use `std::move` so `answer` is transferred into `result` and the original becomes empty.",
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string answer = "ready";
    string result = answer; // TODO: change this to move the value
    cout << result << " " << answer.size() << endl; // ready 0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string answer = "ready";
    string result = move(answer);
    cout << result << " " << answer.size() << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Moved string prints ready and original size 0", keywords: [{ pattern: "\\bmove\\s*\\(\\s*\\w+\\s*\\)" }, { pattern: "\\.size\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "modern-14",
        title: "Perfect Forwarding",
        xp: 20,
        theory: [
          text(
            "Perfect forwarding preserves value category with `T&&` and `std::forward` in wrapper functions.",
          ),
          callout(
            "tip",
            "Perfect forwarding is useful when writing generic wrapper functions that forward arguments unchanged.",
          ),
          code(
            "perfect forwarding",
            `#include <iostream>
#include <utility>
using namespace std;

void show(int& x) { cout << "lvalue " << x << endl; }
void show(int&& x) { cout << "rvalue " << x << endl; }

template <typename T>
void wrapper(T&& value) {
    show(forward<T>(value));
}

int main() {
    int x = 3;
    wrapper(x);
    wrapper(5);
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Forward value categories",
          description:
            "Write `wrapper` so it forwards its argument to `show` preserving lvalue/rvalue categories.",
          starterCode: `#include <iostream>
#include <utility>
using namespace std;

void show(int& x) { cout << "lvalue " << x << endl; }
void show(int&& x) { cout << "rvalue " << x << endl; }

template <typename T>
void wrapper(T&& value) {
    // TODO
}

int main() {
    int a = 2;
    wrapper(a);
    wrapper(7);
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <utility>
using namespace std;

void show(int& x) { cout << "lvalue " << x << endl; }
void show(int&& x) { cout << "rvalue " << x << endl; }

template <typename T>
void wrapper(T&& value) {
    show(forward<T>(value));
}

int main() {
    int a = 2;
    wrapper(a);
    wrapper(7);
    return 0;
}`,
          tests: [
            { id: 1, label: "Wrapper preserves lvalue and rvalue categories", keywords: [{ pattern: "template\\s*<\\s*(typename|class)\\s+\\w+\\s*>" }, { pattern: "\\w+\\s*&&\\s*\\w+" }, { pattern: "forward\\s*<\\s*\\w+\\s*>\\s*\\(" }] },
          ],
        },
      },
    ],
  },
  {
    id: "concurrency",
    title: "Concurrency & Parallelism",
    icon: "⚙️",
    color: "#10b981",
    lessons: [
      {
        id: "modern-15",
        title: "std::thread Basics",
        xp: 20,
        theory: [
          text(
            "`std::thread` starts new threads of execution and runs code concurrently.",
          ),
          callout(
            "info",
            "Always join or detach threads before the `std::thread` object is destroyed.",
          ),
          code(
            "thread example",
            `#include <iostream>
using namespace std;

void sayHello() {
    cout << "Hello from thread" << endl;
}

int main() {
    sayHello(); // Direct call
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Run a thread",
          description:
            "Launch a thread that prints `Task done` and join it before exiting.",
          starterCode: `#include <iostream>
#include <thread>
using namespace std;

void task() {
    cout << "Task done" << endl;
}

int main() {
    // TODO: start and join the thread
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <thread>
using namespace std;

void task() {
    cout << "Task done" << endl;
}

int main() {
    thread worker(task);
    worker.join();
    return 0;
}`,
          tests: [
            { id: 1, label: "Thread prints Task done", keywords: [{ pattern: "thread\\s+\\w+\\s*[({]\\s*\\w+" }, { pattern: "\\.join\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "modern-16",
        title: "mutex & lock_guard",
        xp: 20,
        theory: [
          text(
            "`std::mutex` protects shared data from concurrent access. `std::lock_guard` locks it safely and unlocks automatically.",
          ),
          callout(
            "tip",
            "Prefer `lock_guard` over manual lock/unlock to avoid deadlocks in exception paths.",
          ),
          code(
            "mutex example",
            `#include <iostream>
#include <atomic>
using namespace std;

atomic<int> counter(0);

void increment() {
    counter++;
}

int main() {
    increment();
    increment();
    cout << counter << endl; // 2
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Protect shared state",
          description:
            "Increment a shared counter from two threads using `std::mutex` and `std::lock_guard`.",
          starterCode: `#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

int counter = 0;
mutex counterMutex;

void increment() {
    // TODO: protect counter increment with lock_guard
    counter++;
}

int main() {
    thread t1(increment);
    thread t2(increment);
    t1.join();
    t2.join();
    cout << counter << endl; // 2
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

int counter = 0;
mutex counterMutex;

void increment() {
    lock_guard<mutex> guard(counterMutex);
    counter++;
}

int main() {
    thread t1(increment);
    thread t2(increment);
    t1.join();
    t2.join();
    cout << counter << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Counter ends at 2", keywords: [{ pattern: "lock_guard\\s*<\\s*(std::)?mutex\\s*>" }, { pattern: "\\.join\\s*\\(\\s*\\)" }, { pattern: "counter\\s*\\+\\+|\\+\\+\\s*counter" }] },
          ],
        },
      },
    ],
  },
  {
    id: "design",
    title: "Design & Best Practices",
    icon: "🚀",
    color: "#f59e0b",
    lessons: [
      {
        id: "modern-17",
        title: "RAII with Destructors",
        xp: 20,
        theory: [
          text(
            "RAII uses object lifetime to manage resources safely in constructors and destructors.",
          ),
          callout(
            "info",
            "RAII is a core modern C++ technique for managing files, locks, and memory without leaks.",
          ),
          code(
            "RAII example",
            `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    {
        ofstream file("temp.txt");
        file << "hello";
    }
    cout << "file closed" << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Use automatic cleanup",
          description:
            "Open and write to a file inside a scope so it closes automatically when the scope ends.",
          starterCode: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // TODO: write "modern" to temp.txt inside a scope
    cout << "done" << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    {
        ofstream file("temp.txt");
        file << "modern";
    }
    cout << "done" << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Scope closes file automatically", keywords: [{ pattern: "\\{\\s*(std::)?ofstream\\s+\\w+" }] },
          ],
        },
      },
      {
        id: "modern-18",
        title: "Modern API Style",
        xp: 20,
        theory: [
          text(
            "Modern APIs prefer clear names, const correctness, and minimal public interfaces.",
          ),
          callout(
            "tip",
            "Hide implementation details and expose only what users need through a simple API.",
          ),
          code(
            "Clean function API",
            `#include <iostream>
#include <string>
using namespace std;

string welcomeMessage(const string& name) {
    return "Welcome, " + name + "!";
}

int main() {
    cout << welcomeMessage("Sam") << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Write a small clean API",
          description:
            "Create `formatStatus(bool success)` that returns a status message string and call it from `main()`.",
          starterCode: `#include <iostream>
#include <string>
using namespace std;

string formatStatus(bool success) {
    // TODO
}

int main() {
    cout << formatStatus(true) << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

string formatStatus(bool success) {
    return success ? string("Success") : string("Failure");
}

int main() {
    cout << formatStatus(true) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "formatStatus returns Success", keywords: [{ pattern: "(std::)?string\\s+formatStatus\\s*\\(\\s*bool\\s+\\w+\\s*\\)" }, { pattern: "\"Success\"" }, { pattern: "\"Failure\"" }] },
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
