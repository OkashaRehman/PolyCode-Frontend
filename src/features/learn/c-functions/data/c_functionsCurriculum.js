// PolyCode — C Functions interactive course
// 5 chapters · 15 lessons · C challenges graded on real program output
// YouTube links: edit c_functionsVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { C_FUNCTIONS_VIDEO_LINKS } from "./c_functionsVideoLinks";

const ACCENT = "#e67e22";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return { type: "text", content, code: { lang: "c", ...codeBlock } };
  }
  return { type: "text", content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

// Challenge description: the task, then the exact output the tests expect.
function task(content, expectedOutput) {
  return [
    { type: "text", content },
    { type: "text", content: "Expected output:" },
    { type: "code", content: expectedOutput },
  ];
}

// Source check: the code contains no for / while loop (used by recursion challenges).
const NO_LOOPS = { pattern: "^(?![\\s\\S]*\\b(for|while)\\s*\\()" };

export const C_FUNCTIONS_CHAPTERS = [
  {
    id: "ch-0",
    title: "Function Basics",
    icon: "🔧",
    color: ACCENT,
    lessons: [
      {
        id: "c_functions-0-0",
        title: "Declaring & Calling Functions",
        xp: 10,
        chapterTitle: "Function Basics",
        theory: [
          text(
            "A **function** is a named block of code that does one job. You write it once and **call** it wherever you need that job done. Functions keep `main` short, avoid copy-pasted code, and let you test one piece at a time. You have already used functions: `printf` and `scanf` are functions from the standard library.",
          ),
          text(
            "A function definition has four parts: the **return type** (what it gives back), the **name**, the **parameters** in parentheses (what it receives), and the **body** in braces. To call it, write its name followed by the arguments in parentheses.",
            {
              label: "Defining and calling a function",
              content: `#include <stdio.h>

int square(int x) {
    return x * x;
}

int main(void) {
    int result = square(5);
    printf("square(5) = %d\\n", result);
    printf("square(12) = %d\\n", square(12));
    return 0;
}`,
            },
          ),
          text(
            "When a function is called, C jumps into its body, runs it, and comes back to the exact place it was called from. A function can be called as many times as you like, and functions can call other functions. Here `greet` is called twice and `print_line` is called from inside `greet`.",
            {
              label: "Functions calling functions",
              content: `#include <stdio.h>

void print_line(void) {
    printf("----------\\n");
}

void greet(void) {
    print_line();
    printf("Hello!\\n");
    print_line();
}

int main(void) {
    greet();
    greet();
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Name functions after what they do, using a verb: `print_report`, `calculate_total`, `is_valid`. If you can't name it in a few words, it probably does too many things.",
          ),
          quiz(
            "In `int square(int x) { return x * x; }`, what is `int x`?",
            ["The return type", "A parameter", "A global variable", "The function name"],
            1,
            "Parameters are listed in the parentheses after the name. x receives the value passed in each call, such as 5 in square(5).",
          ),
          quiz(
            "What happens when `square(4)` finishes running?",
            [
              "The program ends",
              "C goes back to where square was called and uses the returned value",
              "square runs again automatically",
              "main starts again from the top",
            ],
            1,
            "After a function returns, execution continues right after the call, and the call itself is replaced by the returned value (16 here).",
          ),
        ],
        challenge: {
          instructions:
            "Write void print_banner(void) that prints === PolyCode === and int square(int x). In main, print the banner, square(4) = 16, square(9) = 81, then the banner again.",
          description: task(
            "Write two functions above `main`: `void print_banner(void)`, which prints `=== PolyCode ===`, and `int square(int x)`, which returns x × x. In `main`, call `print_banner`, print the squares of 4 and 9 using `square`, then call `print_banner` again.",
            "=== PolyCode ===\nsquare(4) = 16\nsquare(9) = 81\n=== PolyCode ===",
          ),
          starterCode: `#include <stdio.h>

// Write print_banner and square here


int main(void) {
    // Call the banner, print the two squares, then call the banner again

    return 0;
}`,
          solution: `#include <stdio.h>

void print_banner(void) {
    printf("=== PolyCode ===\\n");
}

int square(int x) {
    return x * x;
}

int main(void) {
    print_banner();
    printf("square(4) = %d\\n", square(4));
    printf("square(9) = %d\\n", square(9));
    print_banner();
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the banner, both squares, and the banner again",
              expectedOutput: "=== PolyCode ===\nsquare(4) = 16\nsquare(9) = 81\n=== PolyCode ===",
              hint: "Call print_banner() before and after the two printf lines.",
            },
            {
              id: "t2",
              label: "Defines print_banner and square",
              keywords: [
                { pattern: "\\bvoid\\s+print_banner\\s*\\(\\s*(void)?\\s*\\)\\s*\\{" },
                { pattern: "\\bint\\s+square\\s*\\(\\s*int\\s+\\w+\\s*\\)\\s*\\{" },
              ],
              hint: "void print_banner(void) { ... } and int square(int x) { return x * x; }",
            },
            {
              id: "t3",
              label: "Calls square instead of printing the numbers directly",
              keywords: [{ pattern: "square\\s*\\(\\s*4\\s*\\)" }, { pattern: "square\\s*\\(\\s*9\\s*\\)" }],
              hint: "printf(\"square(4) = %d\\n\", square(4));",
            },
          ],
        },
      },
      {
        id: "c_functions-0-1",
        title: "Return Types & void",
        xp: 10,
        chapterTitle: "Function Basics",
        theory: [
          text(
            "Every function says what kind of value it gives back with its **return type**: `int`, `double`, `char` and so on. A function that only does something, like printing, and gives nothing back has the return type `void`.",
          ),
          text(
            "`return` ends the function immediately and hands a value back to the caller. The value must match the return type. A function can have several `return` statements, for example one per branch of an `if`.",
            {
              label: "Returning int, double and a yes/no answer",
              content: `#include <stdio.h>

int max_of(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}

double half(int n) {
    return n / 2.0;
}

int is_even(int n) {
    return n % 2 == 0;   // 1 for yes, 0 for no
}

int main(void) {
    printf("max_of(3, 8) = %d\\n", max_of(3, 8));
    printf("half(7) = %.1f\\n", half(7));
    printf("is_even(10) = %d\\n", is_even(10));
    return 0;
}`,
            },
          ),
          text(
            "A `void` function has no return value, so you call it as a statement on its own line, not inside an expression. It may still use a bare `return;` to stop early.",
            {
              label: "A void function with an early return",
              content: `#include <stdio.h>

void print_stars(int count) {
    if (count <= 0) {
        printf("(nothing to print)\\n");
        return;
    }
    for (int i = 0; i < count; i++) {
        printf("*");
    }
    printf("\\n");
}

int main(void) {
    print_stars(5);
    print_stars(0);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "If a non-void function can reach its closing brace without a `return`, the caller gets a garbage value. Make sure every path through the function returns something.",
          ),
          quiz(
            "Which return type fits a function that only prints a report and gives nothing back?",
            ["int", "void", "double", "char"],
            1,
            "void means the function returns no value. It is called for its effect, such as printing.",
          ),
          quiz(
            "What does `return` do inside a function?",
            [
              "Prints the value",
              "Ends the function and hands a value back to the caller",
              "Restarts the function",
              "Ends the whole program",
            ],
            1,
            "return stops the function at that line and passes the value back. Only return inside main ends the program.",
          ),
        ],
        challenge: {
          instructions:
            "Write int max_of(int a, int b), double average(int a, int b) and void print_stars(int count). Print max_of(7, 12) = 12, average(7, 12) = 9.50 and a row of 5 stars.",
          description: task(
            "Write three functions: `int max_of(int a, int b)` returns the larger number, `double average(int a, int b)` returns their average as a double, and `void print_stars(int count)` prints `count` stars and a new line. Use them in `main` to print these lines.",
            "max_of(7, 12) = 12\naverage(7, 12) = 9.50\n*****",
          ),
          starterCode: `#include <stdio.h>

// Write max_of, average and print_stars here


int main(void) {
    // Print max_of(7, 12), average(7, 12), then call print_stars(5)

    return 0;
}`,
          solution: `#include <stdio.h>

int max_of(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}

double average(int a, int b) {
    return (a + b) / 2.0;
}

void print_stars(int count) {
    for (int i = 0; i < count; i++) {
        printf("*");
    }
    printf("\\n");
}

int main(void) {
    printf("max_of(7, 12) = %d\\n", max_of(7, 12));
    printf("average(7, 12) = %.2f\\n", average(7, 12));
    print_stars(5);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the maximum, the average and 5 stars",
              expectedOutput: "max_of(7, 12) = 12\naverage(7, 12) = 9.50\n*****",
              hint: "(7 + 12) / 2 is 9 with ints. Divide by 2.0 to get 9.5.",
            },
            {
              id: "t2",
              label: "Uses the right return types",
              keywords: [
                { pattern: "\\bint\\s+max_of\\s*\\(" },
                { pattern: "\\bdouble\\s+average\\s*\\(" },
                { pattern: "\\bvoid\\s+print_stars\\s*\\(\\s*int\\s+\\w+\\s*\\)" },
              ],
              hint: "int max_of(...), double average(...), void print_stars(int count)",
            },
          ],
        },
      },
      {
        id: "c_functions-0-2",
        title: "Function Prototypes",
        xp: 10,
        chapterTitle: "Function Basics",
        theory: [
          text(
            "C reads your file from top to bottom. When it reaches a call to a function it hasn't seen yet, it doesn't know the function's return type or parameters, and modern compilers stop with an error. A **prototype** fixes this: it announces a function before it is used.",
          ),
          text(
            "A prototype is the function's first line followed by a semicolon instead of a body. With prototypes at the top, you can put `main` first, where readers look for it, and define the helper functions below.",
            {
              label: "Prototypes let main come first",
              content: `#include <stdio.h>

// Prototypes: return type, name, parameter types
int cube(int n);
void show(int n);

int main(void) {
    show(3);
    show(10);
    return 0;
}

void show(int n) {
    printf("%d cubed is %d\\n", n, cube(n));
}

int cube(int n) {
    return n * n * n;
}`,
            },
          ),
          text(
            "In bigger programs, prototypes go into a **header file** (`.h`). Other `.c` files `#include` the header, so they can call the functions without seeing their code. That is exactly what `#include <stdio.h>` does for `printf`.",
          ),
          diagram("How a header shares functions", [
            {
              id: "header",
              label: "math_utils.h",
              color: ACCENT,
              items: ["int cube(int n);", "Only prototypes", "Included by other files"],
            },
            {
              id: "impl",
              label: "math_utils.c",
              color: "#22c55e",
              items: ["#include \"math_utils.h\"", "The function bodies"],
            },
            {
              id: "main",
              label: "main.c",
              color: "#3b82f6",
              items: ["#include \"math_utils.h\"", "Calls cube(3)", "Linker joins the files"],
            },
          ]),
          callout(
            "info",
            "Parameter names are optional in a prototype: `int cube(int);` is valid. Keeping the names, as in `int cube(int n);`, documents what each parameter means.",
          ),
          quiz(
            "What does a function prototype look like?",
            [
              "The function's body without the first line",
              "The function's first line ending with a semicolon",
              "A #define for the function name",
              "A comment describing the function",
            ],
            1,
            "A prototype such as int cube(int n); declares the return type, name and parameters without the body.",
          ),
          quiz(
            "Why do header files (.h) usually contain prototypes?",
            [
              "So other .c files can call the functions after including the header",
              "Because function bodies are not allowed in C",
              "To make the program run faster",
              "So the functions can't be called",
            ],
            0,
            "Including a header gives a file the prototypes it needs to call the functions. The linker later connects those calls to the real function bodies.",
          ),
        ],
        challenge: {
          instructions:
            "This program doesn't compile because main calls area and perimeter before they are defined. Add prototypes above main so it compiles and prints Area: 12.00 and Perimeter: 14.00.",
          description: task(
            "**Fix this program.** It doesn't compile: `main` calls `area` and `perimeter`, but they are only defined below `main`. Add a prototype for each function above `main`. Don't move the functions.",
            "Area: 12.00\nPerimeter: 14.00",
          ),
          starterCode: `#include <stdio.h>

// Add the prototypes here


int main(void) {
    double width = 3.0, height = 4.0;
    printf("Area: %.2f\\n", area(width, height));
    printf("Perimeter: %.2f\\n", perimeter(width, height));
    return 0;
}

double area(double width, double height) {
    return width * height;
}

double perimeter(double width, double height) {
    return 2 * (width + height);
}`,
          solution: `#include <stdio.h>

double area(double width, double height);
double perimeter(double width, double height);

int main(void) {
    double width = 3.0, height = 4.0;
    printf("Area: %.2f\\n", area(width, height));
    printf("Perimeter: %.2f\\n", perimeter(width, height));
    return 0;
}

double area(double width, double height) {
    return width * height;
}

double perimeter(double width, double height) {
    return 2 * (width + height);
}`,
          tests: [
            {
              id: "t1",
              label: "Compiles and prints the area and perimeter",
              expectedOutput: "Area: 12.00\nPerimeter: 14.00",
              hint: "A prototype is the first line of the function followed by a semicolon.",
            },
            {
              id: "t2",
              label: "Declares both prototypes before main",
              keywords: [
                { pattern: "double\\s+area\\s*\\([^)]*\\)\\s*;[\\s\\S]*\\bint\\s+main\\b" },
                { pattern: "double\\s+perimeter\\s*\\([^)]*\\)\\s*;[\\s\\S]*\\bint\\s+main\\b" },
              ],
              hint: "double area(double width, double height); above main.",
            },
            {
              id: "t3",
              label: "Keeps the function bodies below main",
              keywords: [{ pattern: "\\bint\\s+main\\b[\\s\\S]*double\\s+area\\s*\\([^)]*\\)\\s*\\{" }],
              hint: "Only add the prototypes; leave the definitions where they are.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-1",
    title: "Parameters & Arguments",
    icon: "📤",
    color: ACCENT,
    lessons: [
      {
        id: "c_functions-1-0",
        title: "Pass by Value",
        xp: 15,
        chapterTitle: "Parameters & Arguments",
        theory: [
          text(
            "When you call a function, C **copies** each argument into the matching parameter. This is called **pass by value**. The function works on its own copy, so changing a parameter inside the function never changes the caller's variable.",
          ),
          text(
            "Here `try_to_double` doubles its copy of `n`. The variable in `main` keeps its old value, because only the copy changed.",
            {
              label: "The caller's variable doesn't change",
              content: `#include <stdio.h>

void try_to_double(int n) {
    n = n * 2;
    printf("inside the function: %d\\n", n);
}

int main(void) {
    int value = 10;
    try_to_double(value);
    printf("back in main: %d\\n", value);
    return 0;
}`,
            },
          ),
          text(
            "To get a new value out of a function, **return** it and assign the result in the caller. (The other way, passing the variable's address, comes in the Pointers course.)",
            {
              label: "Return the new value instead",
              content: `#include <stdio.h>

int doubled(int n) {
    return n * 2;
}

int main(void) {
    int value = 10;
    value = doubled(value);
    printf("value is now %d\\n", value);
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "Pass by value is a safety feature: a function can't accidentally change your variables. The cost is copying, which is cheap for numbers and characters.",
          ),
          quiz(
            "After `int x = 5; change(x);` where `void change(int n) { n = 99; }`, what is x?",
            ["99", "5", "0", "It doesn't compile"],
            1,
            "change receives a copy of x. Setting n to 99 changes only the copy, so x is still 5.",
          ),
          quiz(
            "How can a function give a new value back to the caller without pointers?",
            [
              "By changing its parameter",
              "By returning the value and letting the caller assign it",
              "By printing the value",
              "It can't",
            ],
            1,
            "Return the result, then assign it in the caller: value = doubled(value);",
          ),
        ],
        challenge: {
          instructions:
            "Write int add_bonus(int score) that adds 15 to its parameter, prints inside: <score> and returns it. In main (score = 80), call it once without using the result, print after call: 80, then assign the result and print after assigning: 95.",
          description: task(
            "Write `int add_bonus(int score)`: add 15 to the parameter, print `inside: ` and its new value, and return it. In `main`, `score` starts at 80. Call `add_bonus(score)` **without** using the result and print `score`. Then call it again, assign the result to `score`, and print it. The output shows that only the assignment changes `main`'s variable.",
            "inside: 95\nafter call: 80\ninside: 95\nafter assigning: 95",
          ),
          starterCode: `#include <stdio.h>

// Write add_bonus here


int main(void) {
    int score = 80;

    // 1. Call add_bonus(score) without using the result, print "after call: ..."
    // 2. Assign score = add_bonus(score), print "after assigning: ..."

    return 0;
}`,
          solution: `#include <stdio.h>

int add_bonus(int score) {
    score += 15;
    printf("inside: %d\\n", score);
    return score;
}

int main(void) {
    int score = 80;

    add_bonus(score);
    printf("after call: %d\\n", score);

    score = add_bonus(score);
    printf("after assigning: %d\\n", score);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Shows the caller's score unchanged after the first call",
              outputIncludes: "after call: 80",
              hint: "The first call works on a copy, so score in main is still 80.",
            },
            {
              id: "t2",
              label: "Prints all four lines in order",
              expectedOutput: "inside: 95\nafter call: 80\ninside: 95\nafter assigning: 95",
              hint: "score = add_bonus(score); stores the returned value.",
            },
            {
              id: "t3",
              label: "add_bonus takes the score as a parameter and is assigned once",
              keywords: [
                { pattern: "\\bint\\s+add_bonus\\s*\\(\\s*int\\s+score\\s*\\)" },
                { pattern: "score\\s*=\\s*add_bonus\\s*\\(\\s*score\\s*\\)" },
              ],
              hint: "int add_bonus(int score) { ... } and later score = add_bonus(score);",
            },
          ],
        },
      },
      {
        id: "c_functions-1-1",
        title: "Multiple Parameters",
        xp: 15,
        chapterTitle: "Parameters & Arguments",
        theory: [
          text(
            "Functions can take as many parameters as they need, separated by commas. Each parameter has its own type. When you call the function, the arguments are matched to the parameters **by position**: the first argument goes into the first parameter, and so on.",
          ),
          text(
            "Parameters can have different types. The order matters: `bmi(70, 1.75)` and `bmi(1.75, 70)` give very different answers, so choose clear parameter names that show what goes where.",
            {
              label: "Mixed parameter types",
              content: `#include <stdio.h>

double bmi(double weight_kg, double height_m) {
    return weight_kg / (height_m * height_m);
}

void repeat_char(char symbol, int times) {
    for (int i = 0; i < times; i++) {
        printf("%c", symbol);
    }
    printf("\\n");
}

int main(void) {
    printf("BMI: %.1f\\n", bmi(70, 1.75));
    repeat_char('#', 8);
    return 0;
}`,
            },
          ),
          text(
            "Arguments can be any expression: literals, variables, calculations, or even other function calls. Each one is evaluated first, then its value is copied into the parameter.",
            {
              label: "Expressions as arguments",
              content: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main(void) {
    int x = 4;
    printf("%d\\n", add(x, 10));
    printf("%d\\n", add(x * 2, x - 1));
    printf("%d\\n", add(add(1, 2), add(3, 4)));
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Passing the wrong number of arguments is a compile error when a prototype or definition is visible. Passing them in the wrong order usually compiles but gives wrong results, so double-check the order.",
          ),
          quiz(
            "For `int clamp(int value, int low, int high)`, which parameter receives 0 in `clamp(15, 0, 10)`?",
            ["value", "low", "high", "None of them"],
            1,
            "Arguments match parameters by position: 15 goes to value, 0 to low and 10 to high.",
          ),
          quiz(
            "What does `add(add(1, 2), add(3, 4))` return if add returns a + b?",
            ["3", "7", "10", "It doesn't compile"],
            2,
            "The inner calls run first: add(1, 2) is 3 and add(3, 4) is 7. Then add(3, 7) is 10.",
          ),
        ],
        challenge: {
          instructions:
            "Write double bmi(double weight_kg, double height_m) and int clamp(int value, int low, int high). Print BMI: 22.86 for 70 kg and 1.75 m, then clamp 15, -3 and 7 into the range 0 to 10.",
          description: task(
            "Write two functions. `double bmi(double weight_kg, double height_m)` returns weight ÷ height². `int clamp(int value, int low, int high)` returns `low` if the value is below it, `high` if it is above it, and the value otherwise. Print the BMI for 70 kg and 1.75 m, then clamp 15, -3 and 7 into the range 0 to 10.",
            "BMI: 22.86\nclamp(15) = 10\nclamp(-3) = 0\nclamp(7) = 7",
          ),
          starterCode: `#include <stdio.h>

// Write bmi and clamp here


int main(void) {
    // Print the BMI for 70 kg, 1.75 m with 2 decimals
    // Print clamp of 15, -3 and 7 into the range 0..10

    return 0;
}`,
          solution: `#include <stdio.h>

double bmi(double weight_kg, double height_m) {
    return weight_kg / (height_m * height_m);
}

int clamp(int value, int low, int high) {
    if (value < low) {
        return low;
    }
    if (value > high) {
        return high;
    }
    return value;
}

int main(void) {
    printf("BMI: %.2f\\n", bmi(70, 1.75));
    printf("clamp(15) = %d\\n", clamp(15, 0, 10));
    printf("clamp(-3) = %d\\n", clamp(-3, 0, 10));
    printf("clamp(7) = %d\\n", clamp(7, 0, 10));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints BMI: 22.86",
              outputIncludes: "BMI: 22.86",
              hint: "70 / (1.75 * 1.75) is 22.857..., which %.2f rounds to 22.86.",
            },
            {
              id: "t2",
              label: "Clamps all three values",
              expectedOutput: "BMI: 22.86\nclamp(15) = 10\nclamp(-3) = 0\nclamp(7) = 7",
              hint: "Return low when value < low, high when value > high, otherwise value.",
            },
            {
              id: "t3",
              label: "Defines bmi with two parameters and clamp with three",
              keywords: [
                { pattern: "\\bdouble\\s+bmi\\s*\\(\\s*double\\s+\\w+\\s*,\\s*double\\s+\\w+\\s*\\)" },
                { pattern: "\\bint\\s+clamp\\s*\\(\\s*int\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "clamp\\s*\\(\\s*-\\s*3\\s*,\\s*0\\s*,\\s*10\\s*\\)" },
              ],
              hint: "Call clamp(-3, 0, 10) and the others with the same range.",
            },
          ],
        },
      },
      {
        id: "c_functions-1-2",
        title: "Default-like Patterns",
        xp: 15,
        chapterTitle: "Parameters & Arguments",
        theory: [
          text(
            "Some languages let a parameter have a **default value**, so callers can leave it out. C doesn't: every call must pass every argument. But C programmers use a few simple patterns to get the same convenience.",
          ),
          text(
            "**Pattern 1: a wrapper function.** Write the full function with every parameter, then add a shorter function that calls it with the usual value filled in. Callers pick whichever fits.",
            {
              label: "A wrapper supplies the default",
              content: `#include <stdio.h>

void print_line(int width, char symbol) {
    for (int i = 0; i < width; i++) {
        printf("%c", symbol);
    }
    printf("\\n");
}

// "Default" symbol is '-'
void print_dashes(int width) {
    print_line(width, '-');
}

int main(void) {
    print_dashes(10);
    print_line(10, '=');
    return 0;
}`,
            },
          ),
          text(
            "**Pattern 2: a sentinel value.** Agree on a special value, such as `0` or `-1`, that means \"use the default\". The function checks for it and substitutes the real default. Use a `#define` so the default has a name.",
            {
              label: "A sentinel value means \"use the default\"",
              content: `#include <stdio.h>

#define DEFAULT_TAX 0.20

double with_tax(double price, double rate) {
    if (rate < 0) {
        rate = DEFAULT_TAX;
    }
    return price * (1 + rate);
}

int main(void) {
    printf("%.2f\\n", with_tax(100, 0.05));
    printf("%.2f\\n", with_tax(100, -1));
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Wrappers are the clearest pattern: the function names say exactly what happens. Use sentinels only when a value can never be valid, like a negative tax rate.",
          ),
          quiz(
            "Does C support default parameter values like `void f(int x = 5)`?",
            ["Yes, exactly like that", "Yes, but only for int", "No, every call must pass every argument", "Only inside main"],
            2,
            "C has no default arguments; that syntax is a compile error. Wrapper functions or sentinel values give a similar effect.",
          ),
          quiz(
            "What does a wrapper function such as `print_dashes(int width)` do?",
            [
              "It replaces print_line completely",
              "It calls the full function with some arguments filled in",
              "It makes print_line run faster",
              "It deletes the extra parameter",
            ],
            1,
            "A wrapper is a short function that calls the general one with the common values already supplied, such as print_line(width, '-').",
          ),
        ],
        challenge: {
          instructions:
            "Write long power(int base, int exp), a wrapper long square(int base) that calls power(base, 2), and long power_or_square(int base, int exp) where a negative exp means the default 2. Print 2^10 = 1024, square(7) = 49, power_or_square(3, 4) = 81 and power_or_square(5, -1) = 25.",
          description: task(
            "Write `long power(int base, int exp)` using a loop. Then add two convenience functions: a **wrapper** `long square(int base)` that calls `power(base, 2)`, and `long power_or_square(int base, int exp)` where a negative `exp` is a **sentinel** meaning \"use the default exponent 2\" (it should call `power` too).",
            "2^10 = 1024\nsquare(7) = 49\npower_or_square(3, 4) = 81\npower_or_square(5, -1) = 25",
          ),
          starterCode: `#include <stdio.h>

// Write power, square and power_or_square here


int main(void) {
    // Print the four lines using your functions

    return 0;
}`,
          solution: `#include <stdio.h>

long power(int base, int exp) {
    long result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

long square(int base) {
    return power(base, 2);
}

long power_or_square(int base, int exp) {
    if (exp < 0) {
        exp = 2;
    }
    return power(base, exp);
}

int main(void) {
    printf("2^10 = %ld\\n", power(2, 10));
    printf("square(7) = %ld\\n", square(7));
    printf("power_or_square(3, 4) = %ld\\n", power_or_square(3, 4));
    printf("power_or_square(5, -1) = %ld\\n", power_or_square(5, -1));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Calculates the powers and the square",
              outputIncludes: ["2^10 = 1024", "square(7) = 49", "power_or_square(3, 4) = 81"],
              hint: "Start result at 1 and multiply by base exp times. Print a long with %ld.",
            },
            {
              id: "t2",
              label: "Uses exponent 2 when exp is negative",
              expectedOutput: "2^10 = 1024\nsquare(7) = 49\npower_or_square(3, 4) = 81\npower_or_square(5, -1) = 25",
              hint: "if (exp < 0) exp = 2; then call power.",
            },
            {
              id: "t3",
              label: "square and power_or_square call power",
              keywords: [
                { pattern: "\\bsquare\\s*\\(\\s*int\\s+\\w+\\s*\\)\\s*\\{[^}]*\\bpower\\s*\\(" },
                { pattern: "\\bpower_or_square\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\bpower\\s*\\(" },
              ],
              hint: "The convenience functions shouldn't repeat the loop; they call power.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-2",
    title: "Recursion",
    icon: "🔁",
    color: ACCENT,
    lessons: [
      {
        id: "c_functions-2-0",
        title: "What is Recursion?",
        xp: 15,
        chapterTitle: "Recursion",
        theory: [
          text(
            "A **recursive** function is a function that calls itself. It solves a big problem by solving a slightly smaller version of the same problem, until the problem is so small that the answer is obvious. Many problems, like walking a folder tree, are naturally recursive.",
          ),
          text(
            "Every recursive function needs two parts:\n\n- A **base case**: the smallest version, answered directly without another call. It stops the recursion.\n- A **recursive case**: the function calls itself with a smaller input, moving towards the base case.",
            {
              label: "Counting down recursively",
              content: `#include <stdio.h>

void count_down(int n) {
    if (n == 0) {              // base case
        printf("Done!\\n");
        return;
    }
    printf("%d\\n", n);
    count_down(n - 1);         // recursive case: smaller n
}

int main(void) {
    count_down(3);
    return 0;
}`,
            },
          ),
          text(
            "Each call gets its own copy of the parameters, stored in a **stack frame** on the **call stack**. Calls pile up until the base case is reached, then they finish one by one in reverse order. That is why code after the recursive call runs on the way back out.",
            {
              label: "Watching calls go in and come back",
              content: `#include <stdio.h>

void depth(int n) {
    printf("going in: %d\\n", n);
    if (n > 1) {
        depth(n - 1);
    }
    printf("coming back: %d\\n", n);
}

int main(void) {
    depth(3);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Without a base case (or if the input never gets closer to it) the function calls itself forever. Each call uses stack memory, so the program soon crashes with a **stack overflow**.",
          ),
          quiz(
            "What is the job of the base case in a recursive function?",
            [
              "To call the function again",
              "To stop the recursion with an answer that needs no further calls",
              "To make the function faster",
              "To print the result",
            ],
            1,
            "The base case handles the smallest input directly. Without it the function would keep calling itself until the stack overflows.",
          ),
          quiz(
            "In the `depth(3)` example, which line is printed last?",
            ["going in: 1", "coming back: 1", "coming back: 3", "going in: 3"],
            2,
            "Calls finish in reverse order. depth(1) returns first, then depth(2), and depth(3) prints the final coming back: 3.",
          ),
        ],
        challenge: {
          instructions:
            "Write a recursive void countdown(int n) that prints n down to 1, one per line, then Liftoff!. Use recursion only, no loops. countdown(5).",
          description: task(
            "Write a **recursive** function `void countdown(int n)` that prints the numbers from n down to 1, one per line, and prints `Liftoff!` when n reaches 0. Call `countdown(5)` from `main`. Don't use `for` or `while`: the function must call itself.",
            "5\n4\n3\n2\n1\nLiftoff!",
          ),
          starterCode: `#include <stdio.h>

// Write the recursive countdown here
//   base case: n == 0 -> print "Liftoff!"
//   recursive case: print n, then call countdown with n - 1


int main(void) {
    // Call countdown(5)

    return 0;
}`,
          solution: `#include <stdio.h>

void countdown(int n) {
    if (n == 0) {
        printf("Liftoff!\\n");
        return;
    }
    printf("%d\\n", n);
    countdown(n - 1);
}

int main(void) {
    countdown(5);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Counts down from 5 and prints Liftoff!",
              expectedOutput: "5\n4\n3\n2\n1\nLiftoff!",
              hint: "Print n before the recursive call so the numbers come out in descending order.",
            },
            {
              id: "t2",
              label: "countdown calls itself with n - 1, without any loop",
              keywords: [{ pattern: "countdown\\s*\\(\\s*n\\s*-\\s*1\\s*\\)" }, NO_LOOPS],
              hint: "The recursive case is countdown(n - 1); remove any for or while loop.",
            },
          ],
        },
      },
      {
        id: "c_functions-2-1",
        title: "Factorial & Fibonacci",
        xp: 20,
        chapterTitle: "Recursion",
        theory: [
          text(
            "Two classic problems show recursion clearly because their mathematical definitions are already recursive: **factorial** (`n!`) and the **Fibonacci** sequence. Translating the definition into C almost line by line gives a working function.",
          ),
          text(
            "**Factorial:** `n! = n × (n − 1)!`, and `0! = 1`. So `factorial(4)` becomes `4 × factorial(3)`, which becomes `4 × 3 × factorial(2)`, and so on down to the base case. Factorials grow very fast, so use `long long` (printed with `%lld`).",
            {
              label: "Recursive factorial",
              content: `#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) {
        return 1;                      // base case: 0! = 1! = 1
    }
    return n * factorial(n - 1);       // recursive case
}

int main(void) {
    for (int i = 0; i <= 5; i++) {
        printf("%d! = %lld\\n", i, factorial(i));
    }
    printf("20! = %lld\\n", factorial(20));
    return 0;
}`,
            },
          ),
          text(
            "**Fibonacci:** each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13... So `fib(n) = fib(n − 1) + fib(n − 2)`, with `fib(0) = 0` and `fib(1) = 1`. This function makes **two** recursive calls.",
            {
              label: "Recursive Fibonacci",
              content: `#include <stdio.h>

int fib(int n) {
    if (n < 2) {
        return n;                      // fib(0) = 0, fib(1) = 1
    }
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    for (int i = 0; i < 8; i++) {
        printf("%d ", fib(i));
    }
    printf("\\n");
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Recursive Fibonacci recalculates the same values again and again: `fib(40)` makes over 300 million calls. It is great for learning recursion, but a loop is far faster for big n.",
          ),
          quiz(
            "What is the base case of a recursive factorial?",
            ["n > 1 returns n", "n <= 1 returns 1", "n == 10 returns 0", "There isn't one"],
            1,
            "0! and 1! are both 1, so when n is 1 or less the function returns 1 without calling itself again.",
          ),
          quiz(
            "Why is recursive `fib(n)` slow for large n?",
            [
              "C can't add large numbers",
              "Each call makes two more calls, so the same values are recalculated many times",
              "Recursion is always slower than printf",
              "Because it uses long long",
            ],
            1,
            "fib(n) calls fib(n-1) and fib(n-2), and each of those calls two more. The number of calls roughly doubles with every step of n.",
          ),
        ],
        challenge: {
          instructions:
            "Write a recursive long long factorial(int n) and a recursive int fib(int n). Print 5! = 120, 15! = 1307674368000, fib(10) = 55 and the first 10 Fibonacci numbers.",
          description: task(
            "Write two **recursive** functions: `long long factorial(int n)` and `int fib(int n)` (with `fib(0) = 0` and `fib(1) = 1`). Print 5! and 15! (use `%lld`), `fib(10)`, then the first 10 Fibonacci numbers on one line, separated by spaces.",
            "5! = 120\n15! = 1307674368000\nfib(10) = 55\n0 1 1 2 3 5 8 13 21 34",
          ),
          starterCode: `#include <stdio.h>

// Write the recursive factorial and fib here


int main(void) {
    // Print 5!, 15!, fib(10), then fib(0) to fib(9) on one line

    return 0;
}`,
          solution: `#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int fib(int n) {
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    printf("5! = %lld\\n", factorial(5));
    printf("15! = %lld\\n", factorial(15));
    printf("fib(10) = %d\\n", fib(10));
    for (int i = 0; i < 10; i++) {
        printf("%d ", fib(i));
    }
    printf("\\n");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints 5! and 15!",
              outputIncludes: ["5! = 120", "15! = 1307674368000"],
              hint: "15! doesn't fit in an int; return long long and print it with %lld.",
            },
            {
              id: "t2",
              label: "Prints fib(10) and the first 10 Fibonacci numbers",
              expectedOutput: "5! = 120\n15! = 1307674368000\nfib(10) = 55\n0 1 1 2 3 5 8 13 21 34",
              hint: "fib(n) = fib(n - 1) + fib(n - 2), with fib(0) = 0 and fib(1) = 1.",
            },
            {
              id: "t3",
              label: "factorial and fib are recursive",
              keywords: [
                { pattern: "factorial\\s*\\(\\s*n\\s*-\\s*1\\s*\\)" },
                { pattern: "fib\\s*\\(\\s*n\\s*-\\s*1\\s*\\)" },
                { pattern: "fib\\s*\\(\\s*n\\s*-\\s*2\\s*\\)" },
              ],
              hint: "Each function must call itself with a smaller n.",
            },
          ],
        },
      },
      {
        id: "c_functions-2-2",
        title: "Tail Recursion",
        xp: 20,
        chapterTitle: "Recursion",
        theory: [
          text(
            "In `return n * factorial(n - 1);` the function still has work to do **after** the recursive call returns: it multiplies by n. So every call's stack frame must be kept until the end. A **tail-recursive** function makes the recursive call its very **last** action: it returns the call's result directly, with nothing left to do.",
          ),
          text(
            "To make a function tail-recursive, carry the work done so far in an extra parameter, usually called an **accumulator**. The base case returns the accumulator.",
            {
              label: "Sum 1..n: normal and tail-recursive",
              content: `#include <stdio.h>

// Not tail-recursive: the addition happens after the call returns
long sum_normal(int n) {
    if (n == 0) {
        return 0;
    }
    return n + sum_normal(n - 1);
}

// Tail-recursive: the call is the last thing; acc carries the total
long sum_tail(int n, long acc) {
    if (n == 0) {
        return acc;
    }
    return sum_tail(n - 1, acc + n);
}

int main(void) {
    printf("%ld\\n", sum_normal(100));
    printf("%ld\\n", sum_tail(100, 0));
    return 0;
}`,
            },
          ),
          text(
            "Why bother? Because nothing is left to do after a tail call, an optimising compiler (gcc with `-O2`) can **reuse the same stack frame** instead of adding a new one. The recursion then runs like a loop and can't overflow the stack. Euclid's algorithm for the greatest common divisor is naturally tail-recursive:",
            {
              label: "Greatest common divisor (Euclid)",
              content: `#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);     // tail call
}

int main(void) {
    printf("gcd(48, 18) = %d\\n", gcd(48, 18));
    printf("gcd(100, 75) = %d\\n", gcd(100, 75));
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "The C standard doesn't guarantee tail-call optimisation; it depends on the compiler and its settings. For very deep recursion in C, a loop is the safe choice.",
          ),
          quiz(
            "Which of these is a tail call?",
            [
              "return n * fact(n - 1);",
              "return fact(n - 1) + 1;",
              "return fact_acc(n - 1, acc * n);",
              "fact(n - 1); printf(\"done\");",
            ],
            2,
            "Only fact_acc(n - 1, acc * n) is returned directly with no work after it. The others multiply, add or print after the call returns.",
          ),
          quiz(
            "What is the accumulator parameter for?",
            [
              "Counting how many times the function was called",
              "Carrying the result built so far, so no work is needed after the recursive call",
              "Storing the base case",
              "Making the function void",
            ],
            1,
            "The accumulator holds the partial result. Each call updates it, and the base case simply returns it.",
          ),
        ],
        challenge: {
          instructions:
            "Write tail-recursive int gcd(int a, int b) and long sum_to(int n, long acc) with no loops. Print gcd(48, 18) = 6, gcd(17, 5) = 1 and sum_to(100) = 5050.",
          description: task(
            "Write two **tail-recursive** functions with no loops: `int gcd(int a, int b)` using Euclid's rule (`gcd(a, b) = gcd(b, a % b)`, and `gcd(a, 0) = a`), and `long sum_to(int n, long acc)` that adds 1..n using an accumulator. In each, the recursive call must be returned directly.",
            "gcd(48, 18) = 6\ngcd(17, 5) = 1\nsum_to(100) = 5050",
          ),
          starterCode: `#include <stdio.h>

// Write tail-recursive gcd and sum_to here


int main(void) {
    // Print gcd(48, 18), gcd(17, 5) and sum_to(100, 0)

    return 0;
}`,
          solution: `#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

long sum_to(int n, long acc) {
    if (n == 0) {
        return acc;
    }
    return sum_to(n - 1, acc + n);
}

int main(void) {
    printf("gcd(48, 18) = %d\\n", gcd(48, 18));
    printf("gcd(17, 5) = %d\\n", gcd(17, 5));
    printf("sum_to(100) = %ld\\n", sum_to(100, 0));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints both greatest common divisors",
              outputIncludes: ["gcd(48, 18) = 6", "gcd(17, 5) = 1"],
              hint: "gcd(48, 18) -> gcd(18, 12) -> gcd(12, 6) -> gcd(6, 0) = 6",
            },
            {
              id: "t2",
              label: "Prints sum_to(100) = 5050",
              expectedOutput: "gcd(48, 18) = 6\ngcd(17, 5) = 1\nsum_to(100) = 5050",
              hint: "Call sum_to(100, 0); the base case returns acc.",
            },
            {
              id: "t3",
              label: "Both functions return their recursive call directly, without loops",
              keywords: [
                { pattern: "return\\s+gcd\\s*\\(\\s*b\\s*," },
                { pattern: "return\\s+sum_to\\s*\\(\\s*n\\s*-\\s*1\\s*," },
                NO_LOOPS,
              ],
              hint: "return gcd(b, a % b); and return sum_to(n - 1, acc + n); with no for or while.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-3",
    title: "Scope & Storage",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "c_functions-3-0",
        title: "Local vs Global Variables",
        xp: 15,
        chapterTitle: "Scope & Storage",
        theory: [
          text(
            "A variable's **scope** is the part of the program where its name can be used, and its **lifetime** is how long it exists. Where you declare a variable decides both.",
          ),
          text(
            "**Local variables** are declared inside a function or block. They exist only while that function runs and are created fresh on every call. Two functions can each have a local called `total` without any clash. **Global variables** are declared outside all functions. Every function in the file can use them, and they live for the whole program.",
            {
              label: "Local and global variables",
              content: `#include <stdio.h>

int calls = 0;                 // global: shared by every function

int add(int a, int b) {
    int total = a + b;         // local: only exists during this call
    calls++;
    return total;
}

int main(void) {
    int total = add(2, 3);     // a different, separate local total
    total += add(10, 20);
    printf("total = %d, calls = %d\\n", total, calls);
    return 0;
}`,
            },
          ),
          text(
            "If a local variable has the same name as a global one, the local **shadows** it: inside that block, the name refers to the local. Variables declared inside a block, such as a loop body, only exist within that block.",
            {
              label: "Shadowing and block scope",
              content: `#include <stdio.h>

int level = 1;

void show(void) {
    int level = 99;            // shadows the global inside show()
    printf("in show: %d\\n", level);
}

int main(void) {
    show();
    printf("in main: %d\\n", level);

    for (int i = 0; i < 2; i++) {
        int doubled = i * 2;   // only exists inside the loop body
        printf("doubled = %d\\n", doubled);
    }
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Use globals sparingly. Any function can change them, so when a global has a wrong value it is hard to find out who changed it. Prefer passing values as parameters and returning results.",
          ),
          quiz(
            "When does a local variable inside a function stop existing?",
            [
              "When the program ends",
              "When the function returns",
              "Never",
              "When another function is called",
            ],
            1,
            "Locals are created when the function is called and destroyed when it returns. The next call gets brand-new locals.",
          ),
          quiz(
            "A global is named `count`, and a function declares its own local `int count = 0;`. Inside that function, what does `count` refer to?",
            ["The global count", "The local count", "Both at once", "It doesn't compile"],
            1,
            "The local shadows the global inside its scope. The global is untouched.",
          ),
        ],
        challenge: {
          instructions:
            "Add a global int calls = 0. Write int square(int x) that increments calls and returns x * x. Print square(3) = 9, square(4) = 16 and calls = 2.",
          description: task(
            "Declare a **global** `int calls = 0;` above the functions. Write `int square(int x)` that adds 1 to `calls` every time it runs and returns x × x. In `main`, print `square(3)` and `square(4)`, then print how many times `square` was called, read from the global.",
            "square(3) = 9\nsquare(4) = 16\ncalls = 2",
          ),
          starterCode: `#include <stdio.h>

// Declare the global calls counter here

// Write square here


int main(void) {
    // Print square(3), square(4), then calls

    return 0;
}`,
          solution: `#include <stdio.h>

int calls = 0;

int square(int x) {
    calls++;
    return x * x;
}

int main(void) {
    printf("square(3) = %d\\n", square(3));
    printf("square(4) = %d\\n", square(4));
    printf("calls = %d\\n", calls);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints both squares and calls = 2",
              expectedOutput: "square(3) = 9\nsquare(4) = 16\ncalls = 2",
              hint: "square must do calls++ before returning.",
            },
            {
              id: "t2",
              label: "calls is a global and square updates it",
              keywords: [
                { pattern: "^int\\s+calls\\s*=\\s*0\\s*;", flags: "m" },
                { pattern: "\\bint\\s+square\\s*\\([^)]*\\)\\s*\\{[^}]*\\bcalls\\s*(\\+\\+|\\+=\\s*1)" },
              ],
              hint: "Declare int calls = 0; outside every function, then calls++ inside square.",
            },
          ],
        },
      },
      {
        id: "c_functions-3-1",
        title: "static Variables",
        xp: 15,
        chapterTitle: "Scope & Storage",
        theory: [
          text(
            "Normally a function's local variables are thrown away when it returns. Adding the keyword `static` to a local variable changes its **lifetime**: it is created once, keeps its value between calls, and lives until the program ends. Its **scope** stays local, so only that function can see it.",
          ),
          text(
            "A static local is initialised **only once**, before the first call. Compare the two counters below: the normal one starts again from 0 every call, while the static one remembers.",
            {
              label: "Normal local vs static local",
              content: `#include <stdio.h>

void count_calls(void) {
    int normal = 0;
    static int remembered = 0;

    normal++;
    remembered++;
    printf("normal = %d, static = %d\\n", normal, remembered);
}

int main(void) {
    count_calls();
    count_calls();
    count_calls();
    return 0;
}`,
            },
          ),
          text(
            "Static locals are perfect for generating IDs, counting calls, or doing setup only once, without a global that every function could change. (`static` on a global variable or function means something different: it hides it from other files.)",
            {
              label: "A function that hands out IDs",
              content: `#include <stdio.h>

int next_id(void) {
    static int id = 0;
    id++;
    return id;
}

int main(void) {
    printf("user %d\\n", next_id());
    printf("user %d\\n", next_id());
    printf("user %d\\n", next_id());
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "A static local is like a private global: it has a global's lifetime but a local's visibility. Reach for it before reaching for a global.",
          ),
          quiz(
            "How many times is `static int total = 0;` inside a function initialised?",
            ["Every time the function is called", "Once, before the first call", "Never", "Twice"],
            1,
            "A static local is initialised once. Later calls keep and update the same variable.",
          ),
          quiz(
            "Which functions can access a static local variable?",
            ["Every function in the file", "Only the function it is declared in", "Only main", "Every file in the program"],
            1,
            "static changes the lifetime, not the scope. The variable is still only visible inside its own function.",
          ),
        ],
        challenge: {
          instructions:
            "Write int next_ticket(void) with a static local counter starting at 1000 that returns 1001, 1002, 1003... Print Ticket T-1001, Ticket T-1002 and Ticket T-1003.",
          description: task(
            "Write `int next_ticket(void)` that uses a **static local** counter starting at 1000. Each call adds 1 and returns the new number, so the first call returns 1001. Call it three times from `main` and print each ticket. Don't use a global variable.",
            "Ticket T-1001\nTicket T-1002\nTicket T-1003",
          ),
          starterCode: `#include <stdio.h>

// Write next_ticket here with a static local counter


int main(void) {
    // Print three tickets using next_ticket()

    return 0;
}`,
          solution: `#include <stdio.h>

int next_ticket(void) {
    static int number = 1000;
    number++;
    return number;
}

int main(void) {
    printf("Ticket T-%d\\n", next_ticket());
    printf("Ticket T-%d\\n", next_ticket());
    printf("Ticket T-%d\\n", next_ticket());
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints tickets T-1001 to T-1003",
              expectedOutput: "Ticket T-1001\nTicket T-1002\nTicket T-1003",
              hint: "Start the static counter at 1000 and increase it before returning.",
            },
            {
              id: "t2",
              label: "The counter is a static local inside next_ticket",
              keywords: [
                { pattern: "\\bnext_ticket\\s*\\(\\s*(void)?\\s*\\)\\s*\\{[^}]*\\bstatic\\s+int\\b" },
                { pattern: "next_ticket\\s*\\(\\s*\\)[\\s\\S]*next_ticket\\s*\\(\\s*\\)[\\s\\S]*next_ticket\\s*\\(\\s*\\)" },
              ],
              hint: "static int number = 1000; goes inside the function body.",
            },
          ],
        },
      },
      {
        id: "c_functions-3-2",
        title: "extern Keyword",
        xp: 15,
        chapterTitle: "Scope & Storage",
        theory: [
          text(
            "Real C programs are split into several `.c` files that are compiled separately and joined by the linker. If one file defines a global variable, how does another file use it? With `extern`, which **declares** a variable without creating it: \"this variable exists, and it is defined somewhere else\".",
          ),
          text(
            "There is an important difference between two words:\n\n- A **definition** creates the variable and reserves memory: `int high_score = 0;`. Each variable is defined exactly once.\n- A **declaration** only announces its name and type: `extern int high_score;`. You can declare it in as many places as you need.",
          ),
          diagram("Sharing one global across files", [
            {
              id: "header",
              label: "score.h",
              color: ACCENT,
              items: ["extern int high_score;", "Declaration only", "Included by every file that needs it"],
            },
            {
              id: "def",
              label: "score.c",
              color: "#22c55e",
              items: ["int high_score = 0;", "The one definition"],
            },
            {
              id: "use",
              label: "main.c",
              color: "#3b82f6",
              items: ["#include \"score.h\"", "Reads and updates high_score", "Linker connects it to score.c"],
            },
          ]),
          text(
            "PolyCode compiles a single file, but `extern` works the same within one file: it lets you use a global above the line where it is defined. This is exactly what a header does for other files.",
            {
              label: "extern declares, the definition comes later",
              content: `#include <stdio.h>

extern int level;      // declaration: "level is defined somewhere"

void level_up(void) {
    level++;
}

int main(void) {
    level_up();
    level_up();
    printf("level = %d\\n", level);
    return 0;
}

int level = 1;         // definition: memory is created here`,
            },
          ),
          callout(
            "warning",
            "Don't initialise an `extern` declaration (`extern int level = 1;`): that turns it into a definition. Defining the same global in two files gives a linker error: `multiple definition of 'level'`.",
          ),
          quiz(
            "What does `extern int total;` do?",
            [
              "Creates a new variable called total",
              "Declares that total exists and is defined elsewhere",
              "Makes total read-only",
              "Hides total from other files",
            ],
            1,
            "extern is a declaration only. It gives the name and type so the code can use the variable; the memory comes from its single definition.",
          ),
          quiz(
            "Where should the definition `int total = 0;` of a shared global go?",
            [
              "In every .c file that uses it",
              "In exactly one .c file",
              "In the header file",
              "Nowhere; extern is enough",
            ],
            1,
            "A global must be defined exactly once. Other files (usually through a header) only declare it with extern.",
          ),
        ],
        challenge: {
          instructions:
            "This program doesn't compile because high_score is used above its definition at the bottom of the file. Add an extern declaration at the top so it prints New high score: 120, New high score: 150 and High score: 150.",
          description: task(
            "**Fix this program.** `submit` and `main` use the global `high_score`, but it is only defined at the very bottom of the file, so the code doesn't compile. Add an `extern` declaration near the top. Keep the definition where it is.",
            "New high score: 120\nNew high score: 150\nHigh score: 150",
          ),
          starterCode: `#include <stdio.h>

// Declare high_score with extern here


void submit(int score) {
    if (score > high_score) {
        high_score = score;
        printf("New high score: %d\\n", high_score);
    }
}

int main(void) {
    submit(120);
    submit(90);
    submit(150);
    printf("High score: %d\\n", high_score);
    return 0;
}

int high_score = 0;`,
          solution: `#include <stdio.h>

extern int high_score;

void submit(int score) {
    if (score > high_score) {
        high_score = score;
        printf("New high score: %d\\n", high_score);
    }
}

int main(void) {
    submit(120);
    submit(90);
    submit(150);
    printf("High score: %d\\n", high_score);
    return 0;
}

int high_score = 0;`,
          tests: [
            {
              id: "t1",
              label: "Compiles and tracks the high score",
              expectedOutput: "New high score: 120\nNew high score: 150\nHigh score: 150",
              hint: "Add extern int high_score; above submit.",
            },
            {
              id: "t2",
              label: "Declares high_score with extern before it is used",
              keywords: [{ pattern: "extern\\s+int\\s+high_score\\s*;[\\s\\S]*void\\s+submit" }],
              hint: "extern int high_score; (no = 0) goes above the functions.",
            },
            {
              id: "t3",
              label: "Keeps the single definition at the bottom",
              keywords: [{ pattern: "\\}\\s*int\\s+high_score\\s*=\\s*0\\s*;\\s*$" }],
              hint: "Leave int high_score = 0; as the last line.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-4",
    title: "Function Pointers",
    icon: "👉",
    color: ACCENT,
    lessons: [
      {
        id: "c_functions-4-0",
        title: "Pointers to Functions",
        xp: 20,
        chapterTitle: "Function Pointers",
        theory: [
          text(
            "A function's code lives somewhere in memory, so it has an address too. A **function pointer** is a variable that stores that address. Through it you can call whichever function it currently points to, which lets a program choose behaviour while it runs.",
          ),
          text(
            "The declaration looks like the function's prototype with `(*name)` in place of the name: `int (*op)(int, int);` reads as \"op is a pointer to a function taking two ints and returning an int\". Assign a function by its name (no parentheses), and call through the pointer like a normal function.",
            {
              label: "Pointing at different functions",
              content: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }

int main(void) {
    int (*op)(int, int);

    op = add;
    printf("op(10, 4) = %d\\n", op(10, 4));

    op = subtract;
    printf("op(10, 4) = %d\\n", op(10, 4));
    return 0;
}`,
            },
          ),
          text(
            "The syntax gets hard to read, so programmers usually give the function-pointer type a name with `typedef`. Then it can be used like any other type, for example as a parameter or a return type.",
            {
              label: "typedef makes function pointers readable",
              content: `#include <stdio.h>

typedef int (*BinaryOp)(int, int);

int multiply(int a, int b) { return a * b; }
int maximum(int a, int b) { return a > b ? a : b; }

int main(void) {
    BinaryOp chosen = multiply;
    printf("%d\\n", chosen(6, 7));

    chosen = maximum;
    printf("%d\\n", chosen(6, 7));
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "The parentheses matter. `int (*op)(int, int);` is a pointer to a function, but `int *op(int, int);` is a prototype for a function that returns an `int *`.",
          ),
          quiz(
            "Which line declares `f` as a pointer to a function taking a double and returning a double?",
            ["double *f(double);", "double (*f)(double);", "double f*(double);", "pointer double f(double);"],
            1,
            "The (*f) groups the star with the name, making f a pointer to a function with that signature. double *f(double); declares a function returning double *.",
          ),
          quiz(
            "After `op = add;`, how do you call add through op with 2 and 3?",
            ["op[2, 3]", "*op = (2, 3)", "op(2, 3)", "add(op)"],
            2,
            "You call through a function pointer exactly like a function: op(2, 3). (*op)(2, 3) also works.",
          ),
        ],
        challenge: {
          instructions:
            "Write int add(int a, int b) and int multiply(int a, int b). In main declare int (*op)(int, int), point it at add and print op(6, 7) = 13, then at multiply and print op(6, 7) = 42.",
          description: task(
            "Write `int add(int a, int b)` and `int multiply(int a, int b)`. In `main`, declare a function pointer `int (*op)(int, int)`. Point it at `add` and print `op(6, 7)`, then point it at `multiply` and print `op(6, 7)` again. Both results must come from calling `op`.",
            "add: op(6, 7) = 13\nmultiply: op(6, 7) = 42",
          ),
          starterCode: `#include <stdio.h>

// Write add and multiply here


int main(void) {
    // Declare the function pointer op
    // Point it at add and print the result for 6 and 7
    // Point it at multiply and print the result for 6 and 7

    return 0;
}`,
          solution: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int main(void) {
    int (*op)(int, int);

    op = add;
    printf("add: op(6, 7) = %d\\n", op(6, 7));

    op = multiply;
    printf("multiply: op(6, 7) = %d\\n", op(6, 7));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints 13 for add and 42 for multiply",
              expectedOutput: "add: op(6, 7) = 13\nmultiply: op(6, 7) = 42",
              hint: "Assign op = add; then call op(6, 7).",
            },
            {
              id: "t2",
              label: "Declares a function pointer and assigns both functions to it",
              keywords: [
                { pattern: "\\bint\\s*\\(\\s*\\*\\s*op\\s*\\)\\s*\\(\\s*int\\s*,\\s*int\\s*\\)" },
                { pattern: "\\bop\\s*=\\s*add\\s*;" },
                { pattern: "\\bop\\s*=\\s*multiply\\s*;" },
              ],
              hint: "int (*op)(int, int); then op = add; and later op = multiply;",
            },
            {
              id: "t3",
              label: "Calls the functions through op",
              keywords: [{ pattern: "\\bop\\s*\\(\\s*6\\s*,\\s*7\\s*\\)" }],
              hint: "Print op(6, 7), not add(6, 7).",
            },
          ],
        },
      },
      {
        id: "c_functions-4-1",
        title: "Callbacks Pattern",
        xp: 20,
        chapterTitle: "Function Pointers",
        theory: [
          text(
            "A **callback** is a function you pass to another function as an argument, so that the other function can call it back. The receiving function handles the general work, like looping or sorting, and the callback decides what happens at each step. The standard library's `qsort` works this way: you pass it a function that compares two items.",
          ),
          text(
            "To accept a callback, give the function a parameter whose type is a function pointer. Here `repeat` doesn't know or care what the action does; it just calls it the right number of times.",
            {
              label: "Passing behaviour as an argument",
              content: `#include <stdio.h>

void say_hi(int i) {
    printf("Hi #%d\\n", i);
}

void print_square(int i) {
    printf("%d squared is %d\\n", i, i * i);
}

void repeat(int times, void (*action)(int)) {
    for (int i = 1; i <= times; i++) {
        action(i);
    }
}

int main(void) {
    repeat(2, say_hi);
    repeat(3, print_square);
    return 0;
}`,
            },
          ),
          text(
            "Callbacks can return values too. Here `count_matching` counts the numbers in a range that pass a test, and the test is a callback that returns 1 or 0. Adding a new kind of test means writing a small function, not changing `count_matching`.",
            {
              label: "A callback that answers yes or no",
              content: `#include <stdio.h>

int is_even(int n) { return n % 2 == 0; }
int is_multiple_of_5(int n) { return n % 5 == 0; }

int count_matching(int from, int to, int (*test)(int)) {
    int count = 0;
    for (int n = from; n <= to; n++) {
        if (test(n)) {
            count++;
        }
    }
    return count;
}

int main(void) {
    printf("Even numbers in 1..20: %d\\n", count_matching(1, 20, is_even));
    printf("Multiples of 5 in 1..20: %d\\n", count_matching(1, 20, is_multiple_of_5));
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Callbacks separate **what to do** from **how to go through the items**. The same loop function works for printing, counting, checking or saving, depending on the callback you pass.",
          ),
          quiz(
            "What is a callback?",
            [
              "A function that calls main",
              "A function passed as an argument so another function can call it",
              "A function with no parameters",
              "A recursive function",
            ],
            1,
            "The receiving function stores the address it was given and calls the function back at the right moment.",
          ),
          quiz(
            "Which parameter declaration accepts a callback that takes an int and returns nothing?",
            ["void action(int)", "void (*action)(int)", "int *action(void)", "void *action"],
            1,
            "void (*action)(int) is a pointer to a function taking an int and returning void.",
          ),
        ],
        challenge: {
          instructions:
            "Write void for_each_in_range(int from, int to, void (*visit)(int)) and two callbacks, print_square and print_if_even. Use them to print Squares: 1 4 9 16 25 and Evens: 2 4 6 8 10.",
          description: task(
            "Write `void for_each_in_range(int from, int to, void (*visit)(int))` that calls `visit` for every number from `from` to `to`. Then write two callbacks: `print_square` prints a space and the number squared, and `print_if_even` prints a space and the number only if it is even. In `main`, print `Squares:` using 1..5 and `Evens:` using 1..10.",
            "Squares: 1 4 9 16 25\nEvens: 2 4 6 8 10",
          ),
          starterCode: `#include <stdio.h>

// Write for_each_in_range and the two callbacks here


int main(void) {
    // printf("Squares:"); then for_each_in_range(1, 5, print_square); then a new line
    // printf("Evens:");   then for_each_in_range(1, 10, print_if_even); then a new line

    return 0;
}`,
          solution: `#include <stdio.h>

void for_each_in_range(int from, int to, void (*visit)(int)) {
    for (int n = from; n <= to; n++) {
        visit(n);
    }
}

void print_square(int n) {
    printf(" %d", n * n);
}

void print_if_even(int n) {
    if (n % 2 == 0) {
        printf(" %d", n);
    }
}

int main(void) {
    printf("Squares:");
    for_each_in_range(1, 5, print_square);
    printf("\\n");

    printf("Evens:");
    for_each_in_range(1, 10, print_if_even);
    printf("\\n");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the squares of 1 to 5",
              outputIncludes: "Squares: 1 4 9 16 25",
              hint: "print_square prints \" %d\" with n * n.",
            },
            {
              id: "t2",
              label: "Prints both lines",
              expectedOutput: "Squares: 1 4 9 16 25\nEvens: 2 4 6 8 10",
              hint: "print_if_even only prints when n % 2 == 0.",
            },
            {
              id: "t3",
              label: "for_each_in_range takes a callback and both callbacks are passed to it",
              keywords: [
                { pattern: "for_each_in_range\\s*\\([^)]*void\\s*\\(\\s*\\*\\s*\\w+\\s*\\)\\s*\\(\\s*int\\s*\\)" },
                { pattern: "for_each_in_range\\s*\\([^;]*\\bprint_square\\s*\\)" },
                { pattern: "for_each_in_range\\s*\\([^;]*\\bprint_if_even\\s*\\)" },
              ],
              hint: "Pass the callback by name: for_each_in_range(1, 5, print_square);",
            },
          ],
        },
      },
      {
        id: "c_functions-4-2",
        title: "Capstone: Command Dispatcher",
        xp: 30,
        chapterTitle: "Function Pointers",
        theory: [
          text(
            "Many programs work like a menu: read a command, run the matching action, repeat. Instead of a long `switch`, you can keep the actions in an **array of function pointers** and use the command number as the index. This is called a **dispatch table**, and it is how interpreters, game engines and device drivers pick what to run.",
          ),
          text(
            "An **array** stores several values of the same type under one name, and `name[i]` reads the item at position `i`, counting from 0. An array of function pointers works the same way: `int (*ops[3])(int, int) = { add, subtract, multiply };` is three function pointers, and `ops[1](9, 4)` calls `subtract(9, 4)`.",
            {
              label: "A small dispatch table",
              content: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

int main(void) {
    int (*ops[3])(int, int) = { add, subtract, multiply };

    for (int i = 0; i < 3; i++) {
        printf("ops[%d](9, 4) = %d\\n", i, ops[i](9, 4));
    }
    return 0;
}`,
            },
          ),
          text(
            "Before calling `table[cmd]`, always check that `cmd` is inside the table. An index past the end reads random memory, and calling it crashes the program. The loop below reads commands until it sees 0 or the input runs out.",
            {
              label: "Reading commands safely (input: 2 7 1 0)",
              stdin: "2 7 1 0",
              content: `#include <stdio.h>

#define COMMAND_COUNT 3

int main(void) {
    int cmd;
    while (scanf("%d", &cmd) == 1 && cmd != 0) {
        if (cmd < 1 || cmd >= COMMAND_COUNT) {
            printf("Unknown command %d\\n", cmd);
            continue;
        }
        printf("Running command %d\\n", cmd);
    }
    printf("Stopped\\n");
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Adding a new command to a dispatch table means writing one function and adding it to the array; the loop doesn't change. That is the big advantage over a growing switch.",
          ),
          quiz(
            "In `int (*ops[3])(int, int) = { add, subtract, multiply };`, what does `ops[2](5, 3)` return?",
            ["8", "2", "15", "It doesn't compile"],
            2,
            "Indexes start at 0, so ops[2] is multiply, and multiply(5, 3) is 15.",
          ),
          quiz(
            "Why must the program check the command number before calling `table[cmd]`?",
            [
              "Because function pointers are slow",
              "An index outside the array points to random memory, and calling it crashes the program",
              "Because scanf can't read numbers",
              "It doesn't need to",
            ],
            1,
            "C doesn't check array bounds. table[9] in a 5-item array reads whatever memory is there, and calling that as a function is undefined behaviour.",
          ),
        ],
        challenge: {
          instructions:
            "Build a command dispatcher. Commands: 1 add, 2 subtract, 3 multiply, 4 max, each followed by two numbers; 0 quits. Store the functions in an array of function pointers indexed by the command number. Print Result: N, Unknown command X for invalid commands, then Bye after N commands.",
          stdin: "1 8 5\n3 6 7\n4 2 9\n2 10 4\n9 1 1\n0\n",
          description: task(
            "Build a **command dispatcher**. Each input line is a command number followed by two numbers: `1` add, `2` subtract, `3` multiply, `4` max. Command `0` (or the end of the input) stops the program. Store the four functions in an **array of function pointers** and call the right one by its command number. Print `Result: N` for each valid command and `Unknown command X` for any other number, then how many commands ran. The test input is `1 8 5`, `3 6 7`, `4 2 9`, `2 10 4`, `9 1 1`, `0`.",
            "Result: 13\nResult: 42\nResult: 9\nResult: 6\nUnknown command 9\nBye after 4 commands",
          ),
          starterCode: `#include <stdio.h>

// 1. Write add, subtract, multiply and max_of (each takes two ints, returns an int)

int main(void) {
    // 2. Build the dispatch table: index 1 = add, 2 = subtract, 3 = multiply, 4 = max_of
    //    (index 0 can be NULL because 0 means quit)

    // 3. Loop: read cmd; stop on 0 or end of input; read a and b
    //    valid cmd -> print "Result: N" and count it
    //    invalid   -> print "Unknown command X"

    // 4. Print "Bye after N commands"

    return 0;
}`,
          solution: `#include <stdio.h>

#define COMMAND_COUNT 5

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
int max_of(int a, int b) { return a > b ? a : b; }

int main(void) {
    int (*commands[COMMAND_COUNT])(int, int) = { NULL, add, subtract, multiply, max_of };
    int cmd, a, b;
    int count = 0;

    while (scanf("%d", &cmd) == 1 && cmd != 0) {
        if (scanf("%d %d", &a, &b) != 2) {
            break;
        }
        if (cmd < 1 || cmd >= COMMAND_COUNT) {
            printf("Unknown command %d\\n", cmd);
            continue;
        }
        printf("Result: %d\\n", commands[cmd](a, b));
        count++;
    }

    printf("Bye after %d commands\\n", count);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Runs add, multiply, max and subtract",
              outputIncludes: ["Result: 13", "Result: 42", "Result: 9", "Result: 6"],
              hint: "commands[cmd](a, b) calls the function stored at that position.",
            },
            {
              id: "t2",
              label: "Rejects command 9 without crashing",
              outputIncludes: "Unknown command 9",
              hint: "Check cmd < 1 || cmd >= the table size before calling.",
            },
            {
              id: "t3",
              label: "Prints every line in order and Bye after 4 commands",
              expectedOutput: "Result: 13\nResult: 42\nResult: 9\nResult: 6\nUnknown command 9\nBye after 4 commands",
              hint: "Only count valid commands, and stop the loop when cmd is 0.",
            },
            {
              id: "t4",
              label: "Uses an array of function pointers indexed by the command",
              keywords: [
                { pattern: "\\(\\s*\\*\\s*\\w+\\s*\\[[^\\]]*\\]\\s*\\)\\s*\\(\\s*int\\s*,\\s*int\\s*\\)" },
                { pattern: "\\w+\\s*\\[\\s*cmd\\s*\\]\\s*\\(" },
              ],
              hint: "int (*commands[5])(int, int) = { NULL, add, ... }; then commands[cmd](a, b)",
            },
          ],
        },
      },
    ],
  },
];

export const C_FUNCTIONS_LESSONS = C_FUNCTIONS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({ ...l, chapterTitle: l.chapterTitle || ch.title }))
);

export const C_FUNCTIONS_TOTAL_XP = 245;

applyLessonVideoLinks(C_FUNCTIONS_LESSONS, C_FUNCTIONS_VIDEO_LINKS);
