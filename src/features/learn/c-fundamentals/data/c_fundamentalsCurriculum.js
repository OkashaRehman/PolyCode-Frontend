// PolyCode — C Fundamentals interactive course
// 5 chapters · 17 lessons · C challenges graded on real program output
// YouTube links: edit c_fundamentalsVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { C_FUNDAMENTALS_VIDEO_LINKS } from "./c_fundamentalsVideoLinks";

const ACCENT = "#659ad2";

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

export const C_FUNDAMENTALS_CHAPTERS = [
  {
    id: "ch-0",
    title: "Welcome to C",
    icon: "⚙️",
    color: ACCENT,
    lessons: [
      {
        id: "c_fundamentals-0-0",
        title: "What is C?",
        xp: 10,
        chapterTitle: "Welcome to C",
        theory: [
          text(
            "C is a small, fast, **compiled** programming language. Dennis Ritchie created it at Bell Labs in **1972** to write the Unix operating system, and it has been one of the most used languages ever since.",
          ),
          text(
            "Every C program starts running in a function called `main`. Inside it you write statements, and each statement ends with a semicolon. `printf` prints text to the screen, and `\\n` inside the text starts a new line. Press **Run** to try it.",
            {
              label: "A tiny C program",
              content: `#include <stdio.h>

int main(void) {
    printf("C is fast, small and portable.\\n");
    printf("Linux, SQLite and CPython are written in C.\\n");
    return 0;
}`,
            },
          ),
          text(
            "Why C still matters today:\n\n- **Speed:** C is turned into machine code before it runs, with almost nothing in between.\n- **Control:** you decide how memory is used, which is why operating systems, drivers and embedded devices are written in C.\n- **Portability:** a C compiler exists for almost every processor, from microwaves to supercomputers.\n- **Influence:** C++, Java, C#, JavaScript and Go all borrowed C's syntax, so learning C makes them easier.",
          ),
          callout(
            "info",
            "Every program you write here is compiled by a real C compiler (gcc) and run on the server, exactly like on your own computer.",
          ),
          quiz(
            "Why was C originally created?",
            [
              "To build websites",
              "To write the Unix operating system",
              "To replace spreadsheets",
              "To teach children programming",
            ],
            1,
            "Dennis Ritchie created C at Bell Labs in 1972 so that Unix could be written in a portable, high-level language instead of assembly.",
          ),
          quiz(
            "What does it mean that C is a compiled language?",
            [
              "The code is translated into machine code before the program runs",
              "The code is read line by line while it runs",
              "The code only runs inside a web browser",
              "The code must be written in capital letters",
            ],
            0,
            "A compiler such as gcc translates the whole program into machine code first. The result is an executable file that the computer runs directly.",
          ),
        ],
        challenge: {
          instructions:
            "Use printf to print two facts about C, each on its own line: C was created in 1972. / C powers operating systems.",
          description: task(
            "Use `printf` to print these two facts about C, each on its own line. Remember `\\n` at the end of each line.",
            "C was created in 1972.\nC powers operating systems.",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    // Print the two lines here

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    printf("C was created in 1972.\\n");
    printf("C powers operating systems.\\n");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints both facts, each on its own line",
              expectedOutput: "C was created in 1972.\nC powers operating systems.",
              hint: "Use two printf calls and end each line with \\n.",
            },
            {
              id: "t2",
              label: "Uses printf",
              keywords: ["printf"],
              hint: "Text is printed with printf(\"...\").",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-0-1",
        title: "Your First C Program",
        xp: 10,
        chapterTitle: "Welcome to C",
        theory: [
          text(
            "The classic first program prints **Hello, World!**. It is only a few lines, but every line has a job, and you will write the same shape in every C program.",
          ),
          text(
            "Line by line:\n\n- `#include <stdio.h>` brings in the **st**andar**d** **i**nput/**o**utput library, which contains `printf`.\n- `int main(void)` is where the program starts. `int` means main gives back a whole number.\n- `{ ... }` braces group the statements that belong to `main`.\n- `printf(\"...\");` prints text. The semicolon ends the statement.\n- `return 0;` tells the operating system the program finished successfully.",
            {
              label: "Hello, World!",
              content: `#include <stdio.h>

int main(void) {
    // This is a comment: the compiler ignores it
    printf("Hello, World!\\n");
    return 0;
}`,
            },
          ),
          text(
            "Inside text, a backslash starts an **escape sequence**: a special character you can't type directly. The common ones are `\\n` (new line), `\\t` (tab) and `\\\"` (a double quote inside the text).",
            {
              label: "Escape sequences",
              content: `#include <stdio.h>

int main(void) {
    printf("Name:\\tAda\\n");
    printf("Language:\\tC\\n");
    printf("She said \\"hello\\"\\n");
    /* Comments can also span
       several lines like this. */
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "A missing semicolon is the most common beginner error. gcc will report something like `expected ';' before 'return'` and point at the line after the mistake.",
          ),
          quiz(
            "What does `#include <stdio.h>` give your program?",
            [
              "A faster processor",
              "Standard input/output functions such as printf",
              "Automatic error fixing",
              "A main function",
            ],
            1,
            "stdio.h declares the standard input/output functions, including printf and scanf. Without it the compiler doesn't know what printf is.",
          ),
          quiz(
            "What does `return 0;` at the end of main mean?",
            [
              "The program printed 0",
              "The program crashed",
              "The program finished successfully",
              "The program will run again",
            ],
            2,
            "The value main returns is the program's exit code. 0 means success; any other number signals an error to whoever started the program.",
          ),
        ],
        challenge: {
          instructions:
            "Write your first program: print Hello, World! on the first line and I am learning C. on the second line.",
          description: task(
            "Write your first program. Print `Hello, World!` on the first line and `I am learning C.` on the second line.",
            "Hello, World!\nI am learning C.",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    // Print the two lines here

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    printf("I am learning C.\\n");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints Hello, World! and I am learning C. on two lines",
              expectedOutput: "Hello, World!\nI am learning C.",
              hint: "Check the spelling, the punctuation and the \\n at the end of each line.",
            },
            {
              id: "t2",
              label: "Uses printf",
              keywords: ["printf"],
              hint: "Text is printed with printf(\"...\").",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-0-2",
        title: "How C Compiles",
        xp: 10,
        chapterTitle: "Welcome to C",
        theory: [
          text(
            "Your `.c` file is plain text. Before it can run, it goes through four stages that turn it into an **executable**, a file of machine code the computer can run directly. One command, `gcc main.c -o main`, runs all four.",
          ),
          diagram("From source code to a running program", [
            {
              id: "pre",
              label: "1. Preprocessor",
              color: ACCENT,
              items: ["Pastes in #include files", "Replaces #define names", "Removes comments"],
            },
            {
              id: "compile",
              label: "2. Compiler",
              color: "#f97316",
              items: ["Checks your syntax", "Reports errors and warnings", "Turns C into assembly"],
            },
            {
              id: "asm",
              label: "3. Assembler",
              color: "#a855f7",
              items: ["Turns assembly into machine code", "Produces an object file (.o)"],
            },
            {
              id: "link",
              label: "4. Linker",
              color: "#22c55e",
              items: ["Adds library code such as printf", "Joins all object files", "Writes the executable"],
            },
          ]),
          text(
            "The **preprocessor** runs first and only works with text. Lines starting with `#` are instructions for it. `#define NAME value` tells it to replace every `NAME` in your code with `value` before the compiler sees it. Here `%s` and `%d` in `printf` are placeholders for text and a whole number; you will learn them properly in Chapter 5.",
            {
              label: "The preprocessor replaces LANGUAGE and YEAR",
              content: `#include <stdio.h>

#define LANGUAGE "C"
#define YEAR 1972

int main(void) {
    printf("%s was created in %d\\n", LANGUAGE, YEAR);
    return 0;
}`,
            },
          ),
          text(
            "Errors come from different stages, and knowing which stage helps you fix them:\n\n- **Compile error:** a typo or missing semicolon. The compiler stops and tells you the line.\n- **Link error:** you called a function that doesn't exist anywhere, for example `prinft`. The message mentions `undefined reference`.\n- **Runtime error:** the program compiled but did something wrong while running, such as dividing by zero.",
          ),
          callout(
            "tip",
            "Read compiler messages from the top. The first error is usually the real one; later errors are often caused by it.",
          ),
          quiz(
            "Which stage replaces `#include` and `#define` lines?",
            ["The linker", "The preprocessor", "The assembler", "The operating system"],
            1,
            "The preprocessor runs before the compiler. It pastes in included files and substitutes #define names with their values.",
          ),
          quiz(
            "You misspell printf as prinft. Which stage reports `undefined reference to prinft`?",
            ["The preprocessor", "The assembler", "The linker", "The program while it runs"],
            2,
            "The compiler only warns that prinft is unknown. The linker is the stage that looks for the function's code in all object files and libraries, and fails when it can't find it.",
          ),
        ],
        challenge: {
          instructions:
            "Define two macros, NAME as \"PolyCode\" and VERSION as 3, and use them with printf to print PolyCode v3, then Built with gcc on the next line.",
          description: task(
            "Use the preprocessor. Define `NAME` as `\"PolyCode\"` and `VERSION` as `3` with `#define`, then use both macros in `printf` (with `%s` and `%d`) to print the first line. Print `Built with gcc` on the second line.",
            "PolyCode v3\nBuilt with gcc",
          ),
          starterCode: `#include <stdio.h>

// Define NAME and VERSION here


int main(void) {
    // Print "PolyCode v3" using NAME and VERSION

    return 0;
}`,
          solution: `#include <stdio.h>

#define NAME "PolyCode"
#define VERSION 3

int main(void) {
    printf("%s v%d\\n", NAME, VERSION);
    printf("Built with gcc\\n");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints PolyCode v3 and Built with gcc",
              expectedOutput: "PolyCode v3\nBuilt with gcc",
              hint: "printf(\"%s v%d\\n\", NAME, VERSION); prints the first line.",
            },
            {
              id: "t2",
              label: "Defines NAME and VERSION with #define",
              keywords: [
                { pattern: '#define\\s+NAME\\s+"PolyCode"' },
                { pattern: "#define\\s+VERSION\\s+3\\b" },
              ],
              hint: "Macros have no = and no semicolon: #define VERSION 3",
            },
            {
              id: "t3",
              label: "Uses the macros in printf",
              keywords: [{ pattern: "printf\\s*\\([^;]*\\bNAME\\b[^;]*\\bVERSION\\b" }],
              hint: "Pass NAME and VERSION as the values for %s and %d.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-1",
    title: "Variables & Data Types",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "c_fundamentals-1-0",
        title: "int, float, char, double",
        xp: 15,
        chapterTitle: "Variables & Data Types",
        theory: [
          text(
            "A **variable** is a named box in memory that holds a value. In C every variable has a **type** that decides what it can hold and how much memory it uses. You declare it as `type name = value;`.",
          ),
          text(
            "The four basic types:\n\n- `int`: whole numbers such as `42` or `-7`. Print with `%d`.\n- `float`: numbers with a decimal point, about 7 digits of precision. Print with `%f`.\n- `double`: like float but about 15 digits of precision. This is the usual choice for decimals. Print with `%f`, or `%.2f` for 2 decimal places.\n- `char`: a single character in single quotes, such as `'A'`. Print with `%c`.",
            {
              label: "Declaring and printing each type",
              content: `#include <stdio.h>

int main(void) {
    int age = 20;
    float price = 4.99f;
    double pi = 3.141592653589793;
    char initial = 'C';

    printf("age = %d\\n", age);
    printf("price = %.2f\\n", price);
    printf("pi = %.15f\\n", pi);
    printf("initial = %c\\n", initial);
    return 0;
}`,
            },
          ),
          text(
            "Under the hood a `char` is just a small number: the character's code in the ASCII table. `'A'` is stored as 65. `sizeof` tells you how many bytes a type uses (print it with `%zu`).",
            {
              label: "char is a number, and sizeof",
              content: `#include <stdio.h>

int main(void) {
    char letter = 'A';
    printf("%c is stored as %d\\n", letter, letter);
    printf("%c\\n", letter + 2);

    printf("char:   %zu byte\\n", sizeof(char));
    printf("int:    %zu bytes\\n", sizeof(int));
    printf("double: %zu bytes\\n", sizeof(double));
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "A variable declared without a value, like `int count;`, holds whatever was left in that memory. Always give variables a starting value before you read them.",
          ),
          quiz(
            "You need to store 3.141592653589793 with as much precision as possible. Which type should you use?",
            ["int", "char", "float", "double"],
            3,
            "double keeps about 15 significant digits. float keeps about 7, and int and char can't hold decimals at all.",
          ),
          quiz(
            "What does `printf(\"%d\", 'A');` print?",
            ["A", "65", "'A'", "It doesn't compile"],
            1,
            "A char is stored as its ASCII code. Printing it with %d shows the number 65; printing it with %c would show A.",
          ),
        ],
        challenge: {
          instructions:
            "Declare int age = 20, double height = 1.75 and char grade = 'A', then print Age: 20, Height: 1.75 and Grade: A on separate lines.",
          description: task(
            "Declare three variables: `int age` set to `20`, `double height` set to `1.75`, and `char grade` set to `'A'`. Print them with `%d`, `%.2f` and `%c`, each on its own line.",
            "Age: 20\nHeight: 1.75\nGrade: A",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    // Declare age, height and grade here

    // Print them here

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int age = 20;
    double height = 1.75;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("Height: %.2f\\n", height);
    printf("Grade: %c\\n", grade);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints Age, Height and Grade",
              expectedOutput: "Age: 20\nHeight: 1.75\nGrade: A",
              hint: "Use %.2f for the height so it prints 1.75, not 1.750000.",
            },
            {
              id: "t2",
              label: "Declares age as int, height as double and grade as char",
              keywords: [
                { pattern: "\\bint\\s+age\\b" },
                { pattern: "\\bdouble\\s+height\\b" },
                { pattern: "\\bchar\\s+grade\\b" },
              ],
              hint: "Declare each variable with its type, e.g. double height = 1.75;",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-1-1",
        title: "Constants & #define",
        xp: 15,
        chapterTitle: "Variables & Data Types",
        theory: [
          text(
            "Some values should never change while the program runs: the number of days in a week, the value of pi, a tax rate. C gives you two ways to name them: the `const` keyword and `#define` macros. By convention, constant names are written in UPPER_CASE.",
          ),
          text(
            "`const` makes a normal variable **read-only**. It still has a type, and the compiler stops you if you try to change it. `#define` is a preprocessor instruction: before compiling, every use of the name is replaced with the text after it. A `#define` has no `=`, no type and no semicolon.",
            {
              label: "const and #define side by side",
              content: `#include <stdio.h>

#define PI 3.14159

int main(void) {
    const double radius = 3.0;
    double area = PI * radius * radius;

    printf("Area: %.2f\\n", area);

    // radius = 5.0;  // error: assignment of read-only variable 'radius'
    return 0;
}`,
            },
          ),
          text(
            "Which one to use?\n\n- Prefer `const` for values used in calculations: it has a type, follows normal scope rules and shows up in the debugger.\n- Use `#define` for values the preprocessor needs, such as array sizes in older code, or for switching code on and off.\n- Either way, a named constant like `MAX_USERS` is much clearer than a \"magic number\" like `50` scattered through the code.",
            {
              label: "Named constants make code readable",
              content: `#include <stdio.h>

#define DAYS_PER_WEEK 7

int main(void) {
    const int weeks = 4;
    printf("%d weeks = %d days\\n", weeks, weeks * DAYS_PER_WEEK);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Don't end a `#define` with a semicolon. `#define PI 3.14;` pastes `3.14;` everywhere you write PI, so `PI * 2` becomes `3.14; * 2` and the compiler fails with a confusing error.",
          ),
          quiz(
            "What happens if you write `limit = 10;` when limit was declared as `const int limit = 5;`?",
            [
              "limit becomes 10",
              "The program crashes when it runs",
              "The compiler reports an error",
              "The line is silently ignored",
            ],
            2,
            "const variables are read-only. gcc stops with an error such as \"assignment of read-only variable 'limit'\".",
          ),
          quiz(
            "Which statement about `#define TAX 0.2` is true?",
            [
              "TAX is a double variable stored in memory",
              "The preprocessor replaces TAX with 0.2 before compiling",
              "It needs a semicolon at the end",
              "It can be changed later with TAX = 0.3;",
            ],
            1,
            "A #define is plain text substitution done by the preprocessor. TAX never exists as a variable, so it has no type and can't be assigned.",
          ),
        ],
        challenge: {
          instructions:
            "Define PI as 3.14159 with #define and RADIUS as a const double 2.0. Print Area: 12.57 and Diameter: 4.00.",
          description: task(
            "Define `PI` as `3.14159` with `#define`, and declare `RADIUS` as a `const double` set to `2.0`. Use them to print the circle's area (PI × r × r) and its diameter (2 × r), both with 2 decimal places.",
            "Area: 12.57\nDiameter: 4.00",
          ),
          starterCode: `#include <stdio.h>

// Define PI here


int main(void) {
    // Declare the RADIUS constant here

    // Print the area and the diameter

    return 0;
}`,
          solution: `#include <stdio.h>

#define PI 3.14159

int main(void) {
    const double RADIUS = 2.0;

    printf("Area: %.2f\\n", PI * RADIUS * RADIUS);
    printf("Diameter: %.2f\\n", 2 * RADIUS);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the area and the diameter",
              expectedOutput: "Area: 12.57\nDiameter: 4.00",
              hint: "Area is PI * RADIUS * RADIUS; print both with %.2f.",
            },
            {
              id: "t2",
              label: "Uses #define for PI and const for RADIUS",
              keywords: [
                { pattern: "#define\\s+PI\\s+3\\.14159\\b" },
                { pattern: "\\bconst\\s+double\\s+RADIUS\\b" },
              ],
              hint: "#define PI 3.14159 (no semicolon) and const double RADIUS = 2.0;",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-1-2",
        title: "Type Casting",
        xp: 15,
        chapterTitle: "Variables & Data Types",
        theory: [
          text(
            "When a calculation mixes types, C converts values from one type to another. Sometimes it does this for you (**implicit conversion**), and sometimes you have to ask for it (**explicit cast**). Getting this wrong is behind many beginner bugs, especially with division.",
          ),
          text(
            "Implicit conversion rules you will meet all the time:\n\n- In `int` op `double`, the int is converted to double first, so `5 + 2.5` is `7.5`.\n- Dividing two ints gives an int: the decimal part is **thrown away**. `7 / 2` is `3`, not `3.5`.\n- Storing a double in an int also throws away the decimal part: `int x = 9.99;` stores `9`.",
            {
              label: "Implicit conversions",
              content: `#include <stdio.h>

int main(void) {
    int a = 7, b = 2;
    double mixed = 5 + 2.5;
    int truncated = 9.99;

    printf("7 / 2 = %d\\n", a / b);
    printf("5 + 2.5 = %.1f\\n", mixed);
    printf("int x = 9.99 stores %d\\n", truncated);
    return 0;
}`,
            },
          ),
          text(
            "An **explicit cast** puts the target type in parentheses before a value: `(double)a`. Cast one side of a division to get a decimal result. You can also cast the other way, for example `(int)9.99` is `9`, and `(char)66` is `'B'`.",
            {
              label: "Explicit casts",
              content: `#include <stdio.h>

int main(void) {
    int a = 7, b = 2;

    printf("(double)a / b = %.2f\\n", (double)a / b);
    printf("(int)9.99 = %d\\n", (int)9.99);
    printf("(char)66 = %c\\n", (char)66);
    printf("(double)(a / b) = %.2f\\n", (double)(a / b));
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Cast before you divide. `(double)(7 / 2)` is `3.00`, because `7 / 2` is already the int 3 before the cast happens. Write `(double)7 / 2` to get `3.50`.",
          ),
          quiz(
            "With `int a = 7, b = 2;`, what is the value of `a / b`?",
            ["3.5", "3", "4", "3.0"],
            1,
            "Both operands are int, so C does integer division and drops the decimal part. The result is the int 3.",
          ),
          quiz(
            "Which expression gives 3.5 when a is 7 and b is 2 (both int)?",
            ["(double)(a / b)", "a / b", "(double)a / b", "(int)a / b"],
            2,
            "Casting a to double before dividing makes it a double division, so the result is 3.5. (double)(a / b) casts too late: a / b is already 3.",
          ),
        ],
        challenge: {
          instructions:
            "Given int total = 17 and int count = 4, print the integer average (Integer average: 4) and the exact average using a cast (Exact average: 4.25).",
          description: task(
            "The starter has `int total = 17` and `int count = 4`. Print the average twice: first with plain integer division, then the exact average by casting to `double` before dividing. Print the exact one with `%.2f`.",
            "Integer average: 4\nExact average: 4.25",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int total = 17;
    int count = 4;

    // Print the integer average

    // Print the exact average using a cast

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int total = 17;
    int count = 4;

    printf("Integer average: %d\\n", total / count);
    printf("Exact average: %.2f\\n", (double)total / count);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints both averages",
              expectedOutput: "Integer average: 4\nExact average: 4.25",
              hint: "total / count is 4. (double)total / count is 4.25.",
            },
            {
              id: "t2",
              label: "Uses an explicit cast",
              keywords: [{ pattern: "\\(\\s*(double|float)\\s*\\)" }],
              hint: "Put (double) in front of total before dividing.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-2",
    title: "Operators & Expressions",
    icon: "➗",
    color: ACCENT,
    lessons: [
      {
        id: "c_fundamentals-2-0",
        title: "Arithmetic Operators",
        xp: 15,
        chapterTitle: "Operators & Expressions",
        theory: [
          text(
            "Programs spend much of their time calculating: totals, averages, conversions, positions. C's **arithmetic operators** look like the ones from maths, with one addition that you will use constantly: `%`, the remainder.",
          ),
          text(
            "C has five arithmetic operators: `+` add, `-` subtract, `*` multiply, `/` divide and `%` **modulo** (the remainder after division). With ints, `/` gives the whole part and `%` gives what is left over, so together they split a number apart.",
            {
              label: "The five operators",
              content: `#include <stdio.h>

int main(void) {
    int a = 17, b = 5;

    printf("%d + %d = %d\\n", a, b, a + b);
    printf("%d - %d = %d\\n", a, b, a - b);
    printf("%d * %d = %d\\n", a, b, a * b);
    printf("%d / %d = %d\\n", a, b, a / b);
    printf("%d %% %d = %d\\n", a, b, a % b);
    return 0;
}`,
            },
          ),
          text(
            "**Precedence** decides the order: `*`, `/` and `%` happen before `+` and `-`, just like in maths. Use parentheses whenever you want a different order, or simply to make the code clearer.\n\nModulo is surprisingly useful:\n\n- `n % 2` is 0 for even numbers and 1 for odd ones.\n- `n % 10` is the last digit of n.\n- `minutes % 60` is the minutes left over after taking out whole hours.",
            {
              label: "Precedence and modulo",
              content: `#include <stdio.h>

int main(void) {
    printf("2 + 3 * 4 = %d\\n", 2 + 3 * 4);
    printf("(2 + 3) * 4 = %d\\n", (2 + 3) * 4);
    printf("17 is odd? %d\\n", 17 % 2);
    printf("last digit of 1234 = %d\\n", 1234 % 10);
    return 0;
}`,
            },
          ),
          text(
            "Shortcuts for updating a variable: `x += 5` means `x = x + 5` (also `-=`, `*=`, `/=`, `%=`). `x++` adds 1 and `x--` subtracts 1.",
            {
              label: "Compound assignment and ++",
              content: `#include <stdio.h>

int main(void) {
    int score = 10;
    score += 5;
    score *= 2;
    score++;
    printf("score = %d\\n", score);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Dividing an int by zero (`x / 0` or `x % 0`) is undefined behaviour. The program may crash, so check the divisor first.",
          ),
          quiz(
            "What is `17 % 5`?",
            ["3", "2", "3.4", "85"],
            1,
            "17 divided by 5 is 3 with 2 left over. The % operator gives the remainder, 2.",
          ),
          quiz(
            "What does `2 + 3 * 4` evaluate to?",
            ["20", "14", "24", "9"],
            1,
            "Multiplication has higher precedence than addition, so 3 * 4 = 12 is calculated first, then 2 + 12 = 14.",
          ),
        ],
        challenge: {
          instructions:
            "Given int seconds = 3725, use / and % to print 3725 seconds = 1h 2m 5s.",
          description: task(
            "The starter has `int seconds = 3725`. Use `/` and `%` to split it into hours, minutes and seconds (1 hour = 3600 seconds, 1 minute = 60 seconds) and print the result in this format.",
            "3725 seconds = 1h 2m 5s",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int seconds = 3725;

    // Work out hours, minutes and the remaining seconds

    // Print: 3725 seconds = 1h 2m 5s

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int seconds = 3725;

    int hours = seconds / 3600;
    int minutes = (seconds % 3600) / 60;
    int rest = seconds % 60;

    printf("%d seconds = %dh %dm %ds\\n", seconds, hours, minutes, rest);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints 3725 seconds = 1h 2m 5s",
              expectedOutput: "3725 seconds = 1h 2m 5s",
              hint: "hours = seconds / 3600, minutes = (seconds % 3600) / 60, rest = seconds % 60.",
            },
            {
              id: "t2",
              label: "Calculates with / and % instead of typing the answer",
              keywords: [{ pattern: "/\\s*3600" }, { pattern: "%\\s*60\\b" }],
              hint: "Divide by 3600 for hours and use % 60 for the leftover seconds.",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-2-1",
        title: "Relational & Logical",
        xp: 15,
        chapterTitle: "Operators & Expressions",
        theory: [
          text(
            "Programs make decisions by comparing values. In C a comparison produces a number: **1 for true** and **0 for false**. There is no separate boolean type in classic C; any non-zero value counts as true.",
          ),
          text(
            "Relational operators compare two values: `==` equal, `!=` not equal, `<`, `>`, `<=` and `>=`. Logical operators combine conditions: `&&` (and: both must be true), `||` (or: at least one is true) and `!` (not: flips true and false).",
            {
              label: "Comparisons give 1 or 0",
              content: `#include <stdio.h>

int main(void) {
    int x = 7;

    printf("x > 5: %d\\n", x > 5);
    printf("x == 10: %d\\n", x == 10);
    printf("x != 10: %d\\n", x != 10);
    printf("x > 5 && x < 10: %d\\n", x > 5 && x < 10);
    printf("x < 0 || x > 100: %d\\n", x < 0 || x > 100);
    printf("!(x > 5): %d\\n", !(x > 5));
    return 0;
}`,
            },
          ),
          text(
            "`&&` and `||` use **short-circuit evaluation**: they stop as soon as the answer is known. In `a && b`, if `a` is false, `b` is never evaluated. This lets you guard a risky check, like dividing only when the divisor isn't zero.",
            {
              label: "Short-circuit protects the division",
              content: `#include <stdio.h>

int main(void) {
    int divisor = 0;

    if (divisor != 0 && 10 / divisor > 1) {
        printf("big result\\n");
    } else {
        printf("skipped the division safely\\n");
    }
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "`=` assigns and `==` compares. `if (x = 5)` stores 5 in x and is always true. gcc warns about it; always use `==` in conditions.",
          ),
          quiz(
            "What does `printf(\"%d\", 5 > 3);` print?",
            ["true", "1", "0", "5"],
            1,
            "Comparisons in C evaluate to the int 1 when true and 0 when false.",
          ),
          quiz(
            "In `a != 0 && b / a > 2`, what happens when a is 0?",
            [
              "The program divides by zero and crashes",
              "b / a is skipped because the left side is already false",
              "The compiler refuses to compile it",
              "The whole expression is 1",
            ],
            1,
            "&& short-circuits: a != 0 is false, so the result must be false and the right side is never evaluated.",
          ),
        ],
        challenge: {
          instructions:
            "Given int age = 25 and int hasTicket = 1, print Adult: 1 (age >= 18), Can enter: 1 (adult and has a ticket) and Teenager: 0 (age 13 to 19).",
          description: task(
            "The starter has `int age = 25` and `int hasTicket = 1`. Print three conditions as 1 or 0: whether the person is an adult (`age >= 18`), whether they can enter (adult **and** has a ticket), and whether they are a teenager (age from 13 to 19).",
            "Adult: 1\nCan enter: 1\nTeenager: 0",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int age = 25;
    int hasTicket = 1;

    // Print Adult, Can enter and Teenager as 1 or 0

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int age = 25;
    int hasTicket = 1;

    printf("Adult: %d\\n", age >= 18);
    printf("Can enter: %d\\n", age >= 18 && hasTicket);
    printf("Teenager: %d\\n", age >= 13 && age <= 19);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the three conditions as 1 or 0",
              expectedOutput: "Adult: 1\nCan enter: 1\nTeenager: 0",
              hint: "printf(\"Adult: %d\\n\", age >= 18); prints 1 or 0.",
            },
            {
              id: "t2",
              label: "Combines conditions with && and compares with >=",
              keywords: ["&&", ">="],
              hint: "Can enter is age >= 18 && hasTicket.",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-2-2",
        title: "Bitwise Operators",
        xp: 20,
        chapterTitle: "Operators & Expressions",
        theory: [
          text(
            "Every int is stored as bits (0s and 1s). **Bitwise operators** work on those bits directly. They are used for flags and permissions, hardware registers, compression and fast arithmetic. Take 12 = `1100` and 10 = `1010` in binary.",
          ),
          text(
            "The operators, applied bit by bit:\n\n- `&` AND: 1 only where **both** bits are 1. `1100 & 1010 = 1000` (8)\n- `|` OR: 1 where **either** bit is 1. `1100 | 1010 = 1110` (14)\n- `^` XOR: 1 where the bits are **different**. `1100 ^ 1010 = 0110` (6)\n- `~` NOT: flips every bit.\n- `<<` shifts bits left (×2 per step) and `>>` shifts right (÷2 per step).",
            {
              label: "Bitwise operators on 12 and 10",
              content: `#include <stdio.h>

int main(void) {
    unsigned int a = 12;  // 1100
    unsigned int b = 10;  // 1010

    printf("a & b  = %u\\n", a & b);
    printf("a | b  = %u\\n", a | b);
    printf("a ^ b  = %u\\n", a ^ b);
    printf("a << 1 = %u\\n", a << 1);
    printf("a >> 2 = %u\\n", a >> 2);
    printf("~a & 15 = %u\\n", ~a & 15);
    return 0;
}`,
            },
          ),
          text(
            "A common use is **flags**: each bit stands for one yes/no setting. Combine flags with `|`, test one with `&`, and remove one with `& ~`. `n & 1` is also a fast way to check whether a number is odd.",
            {
              label: "Flags with |, & and & ~",
              content: `#include <stdio.h>

#define BOLD      1  // 001
#define ITALIC    2  // 010
#define UNDERLINE 4  // 100

int main(void) {
    int style = BOLD | UNDERLINE;              // 101
    printf("style = %d\\n", style);
    printf("is italic? %d\\n", (style & ITALIC) != 0);
    style = style & ~BOLD;                     // remove BOLD
    printf("after removing bold = %d\\n", style);
    printf("13 is odd? %d\\n", 13 & 1);
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Don't confuse `&` with `&&` or `|` with `||`. `&&` and `||` treat whole values as true or false; `&` and `|` combine individual bits.",
          ),
          quiz(
            "What is `6 & 3`?",
            ["9", "7", "2", "5"],
            2,
            "6 is 110 and 3 is 011. AND keeps only the bits set in both: 010, which is 2.",
          ),
          quiz(
            "What is `1 << 4`?",
            ["4", "5", "8", "16"],
            3,
            "Shifting left by 4 multiplies by 2 four times: 1 becomes 10000 in binary, which is 16.",
          ),
        ],
        challenge: {
          instructions:
            "Using the READ, WRITE and EXEC flags, set perms to READ | EXEC, then print perms = 5, can write: 0, can exec: 1, and after adding WRITE with |=, after adding write: 7.",
          description: task(
            "The starter defines three permission flags: `READ` (1), `WRITE` (2) and `EXEC` (4). Create `int perms` with READ and EXEC combined using `|`. Print its value, then test the WRITE and EXEC bits with `&` (print 1 or 0). Finally add WRITE with `|=` and print the new value.",
            "perms = 5\ncan write: 0\ncan exec: 1\nafter adding write: 7",
          ),
          starterCode: `#include <stdio.h>

#define READ  1
#define WRITE 2
#define EXEC  4

int main(void) {
    // Combine READ and EXEC into perms

    // Print perms, then test the WRITE and EXEC bits

    // Add WRITE and print the new value

    return 0;
}`,
          solution: `#include <stdio.h>

#define READ  1
#define WRITE 2
#define EXEC  4

int main(void) {
    int perms = READ | EXEC;

    printf("perms = %d\\n", perms);
    printf("can write: %d\\n", (perms & WRITE) != 0);
    printf("can exec: %d\\n", (perms & EXEC) != 0);

    perms |= WRITE;
    printf("after adding write: %d\\n", perms);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the permissions before and after adding WRITE",
              expectedOutput: "perms = 5\ncan write: 0\ncan exec: 1\nafter adding write: 7",
              hint: "(perms & WRITE) != 0 gives 1 or 0.",
            },
            {
              id: "t2",
              label: "Combines flags with | and tests them with &",
              keywords: [
                { pattern: "\\b(READ\\s*\\|\\s*EXEC|EXEC\\s*\\|\\s*READ)\\b" },
                { pattern: "&\\s*(WRITE|EXEC)\\b" },
                { pattern: "\\|=\\s*WRITE\\b" },
              ],
              hint: "int perms = READ | EXEC; then perms & WRITE, then perms |= WRITE;",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-3",
    title: "Control Flow",
    icon: "🔀",
    color: ACCENT,
    lessons: [
      {
        id: "c_fundamentals-3-0",
        title: "if / else / else if",
        xp: 15,
        chapterTitle: "Control Flow",
        theory: [
          text(
            "`if` runs a block of code only when its condition is true (non-zero). Add `else` for what happens otherwise, and `else if` to test more conditions in order. C checks them **from top to bottom** and runs only the **first** block whose condition is true.",
          ),
          text(
            "Put the most specific condition first. Here a temperature of 28 skips the first branch, matches the second, and the rest are never checked.",
            {
              label: "An else if chain",
              content: `#include <stdio.h>

int main(void) {
    int temperature = 28;

    if (temperature > 30) {
        printf("Hot\\n");
    } else if (temperature > 20) {
        printf("Warm\\n");
    } else if (temperature > 10) {
        printf("Cool\\n");
    } else {
        printf("Cold\\n");
    }
    return 0;
}`,
            },
          ),
          text(
            "Conditions can use any expression from the last chapter, including `&&` and `||`, and `if` statements can be nested inside each other. Always use braces `{ }`, even for one line: it prevents bugs when you add a second line later.",
            {
              label: "Combined and nested conditions",
              content: `#include <stdio.h>

int main(void) {
    int age = 16;
    int withParent = 1;

    if (age >= 18) {
        printf("Can watch the film alone\\n");
    } else {
        if (age >= 13 && withParent) {
            printf("Can watch with a parent\\n");
        } else {
            printf("Too young for this film\\n");
        }
    }
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "No semicolon after the condition: `if (x > 5);` ends the if right there, so the block below it always runs.",
          ),
          quiz(
            "With `int x = 5;`, what does this print? `if (x > 3) printf(\"A\"); else if (x > 1) printf(\"B\"); else printf(\"C\");`",
            ["A", "B", "AB", "C"],
            0,
            "x > 3 is true, so A is printed and the rest of the chain is skipped, even though x > 1 is also true.",
          ),
          quiz(
            "Why should the conditions in an else if chain usually go from most specific to least specific?",
            [
              "C checks them in a random order",
              "Only the first true condition runs, so a broad condition first would hide the others",
              "Otherwise the code doesn't compile",
              "The last condition always runs",
            ],
            1,
            "C stops at the first true condition. If score >= 60 came before score >= 90, a score of 95 would match the first one and never reach the grade A branch.",
          ),
        ],
        challenge: {
          instructions:
            "The program reads a score (input: 73). Use if / else if / else to print the grade: 90+ A, 80+ B, 70+ C, 60+ D, otherwise F. Expected: Grade: C",
          stdin: "73",
          description: task(
            "The starter already reads a score from the input (the test gives it **73**). Use an `if / else if / else` chain to print the grade: 90 or more is `A`, 80 or more `B`, 70 or more `C`, 60 or more `D`, anything lower `F`.",
            "Grade: C",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int score;
    scanf("%d", &score);  // reads the score (scanf is covered in Chapter 5)

    // Print the grade with if / else if / else

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int score;
    scanf("%d", &score);

    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else if (score >= 60) {
        printf("Grade: D\\n");
    } else {
        printf("Grade: F\\n");
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints Grade: C for a score of 73",
              expectedOutput: "Grade: C",
              hint: "73 is not >= 90 or >= 80, but it is >= 70.",
            },
            {
              id: "t2",
              label: "Uses an if / else if / else chain",
              keywords: [{ pattern: "\\belse\\s+if\\b" }, { pattern: "\\belse\\s*\\{" }],
              hint: "Check from the highest grade down: if (score >= 90) ... else if (score >= 80) ...",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-3-1",
        title: "switch Statement",
        xp: 15,
        chapterTitle: "Control Flow",
        theory: [
          text(
            "`switch` picks one branch by comparing a single value against fixed `case` labels. It is a tidy replacement for a long `else if` chain that keeps testing the same variable for equality. It works with whole-number types, including `int` and `char`.",
          ),
          text(
            "Each `case` ends with `break`, which jumps out of the switch. `default` runs when no case matches, like the final `else`.",
            {
              label: "Day number to name",
              content: `#include <stdio.h>

int main(void) {
    int day = 3;

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        default:
            printf("Another day\\n");
    }
    return 0;
}`,
            },
          ),
          text(
            "Without `break`, execution **falls through** into the next case. That is usually a bug, but it is handy for giving several cases the same code by stacking the labels.",
            {
              label: "Stacked cases for vowels",
              content: `#include <stdio.h>

int main(void) {
    char letter = 'e';

    switch (letter) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
            printf("%c is a vowel\\n", letter);
            break;
        default:
            printf("%c is a consonant\\n", letter);
    }
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "Case labels must be constant values such as `3` or `'+'`. You can't switch on a double or a string, and you can't write ranges like `case > 10`; use if / else for those.",
          ),
          quiz(
            "What happens when a case has no `break`?",
            [
              "The compiler reports an error",
              "The switch restarts from the top",
              "Execution continues into the next case's code",
              "The default case runs",
            ],
            2,
            "This is called fall-through. The code of the following case runs too, until a break or the end of the switch.",
          ),
          quiz(
            "Which of these can be used as the value in `switch (...)`?",
            ["A double such as 2.5", "A string such as \"add\"", "A char such as '+'", "A condition such as x > 10 for each case"],
            2,
            "switch works with integer types, and char is an integer type. doubles, strings and range conditions need if / else.",
          ),
        ],
        challenge: {
          instructions:
            "Given int a = 6, int b = 7 and char op = '*', use a switch on op with cases for + - * / and a default that prints Unknown operator. Expected: 6 * 7 = 42",
          description: task(
            "The starter has `int a = 6`, `int b = 7` and `char op = '*'`. Write a `switch` on `op` with a case for each of `+`, `-`, `*` and `/` that prints the calculation, and a `default` that prints `Unknown operator`.",
            "6 * 7 = 42",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int a = 6;
    int b = 7;
    char op = '*';

    // switch on op: cases for + - * / and a default

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int a = 6;
    int b = 7;
    char op = '*';

    switch (op) {
        case '+':
            printf("%d + %d = %d\\n", a, b, a + b);
            break;
        case '-':
            printf("%d - %d = %d\\n", a, b, a - b);
            break;
        case '*':
            printf("%d * %d = %d\\n", a, b, a * b);
            break;
        case '/':
            printf("%d / %d = %d\\n", a, b, a / b);
            break;
        default:
            printf("Unknown operator\\n");
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints 6 * 7 = 42",
              expectedOutput: "6 * 7 = 42",
              hint: "printf(\"%d * %d = %d\\n\", a, b, a * b); inside case '*'.",
            },
            {
              id: "t2",
              label: "Uses switch with a case for each operator and a default",
              keywords: [
                { pattern: "\\bswitch\\s*\\(\\s*op\\s*\\)" },
                { pattern: "case\\s*'\\+'" },
                { pattern: "case\\s*'-'" },
                { pattern: "case\\s*'\\*'" },
                { pattern: "case\\s*'/'" },
                { pattern: "\\bdefault\\s*:" },
              ],
              hint: "Each case is written like case '+': ... break;",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-3-2",
        title: "while & do-while Loops",
        xp: 15,
        chapterTitle: "Control Flow",
        theory: [
          text(
            "A **loop** repeats a block of code. A `while` loop checks its condition **before** each pass and keeps going while it is true. Something inside the loop must eventually make the condition false, or the loop never ends.",
          ),
          text(
            "Use `while` when you don't know in advance how many times to repeat, for example \"until the number reaches zero\".",
            {
              label: "Countdown and digit sum",
              content: `#include <stdio.h>

int main(void) {
    int n = 3;
    while (n > 0) {
        printf("%d...\\n", n);
        n--;
    }
    printf("Liftoff!\\n");

    int number = 4721, sum = 0;
    while (number > 0) {
        sum += number % 10;   // take the last digit
        number /= 10;         // drop the last digit
    }
    printf("Digit sum: %d\\n", sum);
    return 0;
}`,
            },
          ),
          text(
            "A `do-while` loop checks the condition **after** each pass, so its body always runs **at least once**. It suits tasks like showing a menu and then asking whether to repeat. Note the semicolon after `while (...)`.",
            {
              label: "do-while runs at least once",
              content: `#include <stdio.h>

int main(void) {
    int x = 10;

    do {
        printf("This runs once even though x < 5 is false\\n");
    } while (x < 5);

    int tries = 0;
    do {
        tries++;
        printf("Attempt %d\\n", tries);
    } while (tries < 3);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Forgetting to update the loop variable (for example leaving out `n--`) creates an infinite loop. Here the challenge runner stops programs after 8 seconds.",
          ),
          quiz(
            "How many times does the body of `do { ... } while (0);` run?",
            ["0", "1", "Forever", "It doesn't compile"],
            1,
            "do-while checks its condition after the body, so the body runs once before the false condition stops the loop.",
          ),
          quiz(
            "With `int i = 5;`, how many times does `while (i < 3) { i++; }` run its body?",
            ["0", "1", "2", "3"],
            0,
            "while checks first. 5 < 3 is false at the very start, so the body never runs.",
          ),
        ],
        challenge: {
          instructions:
            "Starting from n = 6, use a while loop to print the Collatz sequence (halve even numbers, 3n + 1 for odd ones) until it reaches 1, then print the number of steps.",
          description: task(
            "The starter has `int n = 6` and `int steps = 0`. Print the **Collatz sequence** on one line: if n is even, halve it; if it is odd, make it `3 * n + 1`. Repeat with a `while` loop until n is 1, counting the steps, then print the count on the next line.",
            "6 3 10 5 16 8 4 2 1\nSteps: 8",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int n = 6;
    int steps = 0;

    // Print n, then loop until n is 1:
    //   even -> n / 2, odd -> 3 * n + 1, print each new n, count the steps

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int n = 6;
    int steps = 0;

    printf("%d", n);
    while (n != 1) {
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        printf(" %d", n);
        steps++;
    }
    printf("\\nSteps: %d\\n", steps);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the sequence from 6 down to 1",
              outputIncludes: "6 3 10 5 16 8 4 2 1",
              hint: "Print the first n before the loop, then \" %d\" after each update.",
            },
            {
              id: "t2",
              label: "Prints Steps: 8 on the next line",
              expectedOutput: "6 3 10 5 16 8 4 2 1\nSteps: 8",
              hint: "Increase steps once per loop pass, and print a \\n before Steps.",
            },
            {
              id: "t3",
              label: "Uses a while loop",
              keywords: [{ pattern: "\\bwhile\\s*\\(" }],
              hint: "while (n != 1) { ... }",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-3-3",
        title: "for Loops",
        xp: 15,
        chapterTitle: "Control Flow",
        theory: [
          text(
            "A `for` loop puts everything about counting in one line: `for (start; condition; update)`. It is the natural choice when you know how many times to repeat. The **start** runs once, the **condition** is checked before every pass, and the **update** runs after every pass.",
          ),
          text(
            "`for (int i = 1; i <= 5; i++)` counts 1, 2, 3, 4, 5. You can count down with `i--`, or in steps with `i += 2`. A variable declared in the `for` line only exists inside the loop.",
            {
              label: "Counting up, down and in steps",
              content: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    for (int i = 10; i > 0; i -= 3) {
        printf("%d ", i);
    }
    printf("\\n");

    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("Sum of 1..100 = %d\\n", sum);
    return 0;
}`,
            },
          ),
          text(
            "Loops can be **nested**: the inner loop runs completely for every pass of the outer loop. This is how you print grids and tables. `%4d` pads each number to 4 characters so the columns line up.",
            {
              label: "A multiplication table with nested loops",
              content: `#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 3; row++) {
        for (int col = 1; col <= 4; col++) {
            printf("%4d", row * col);
        }
        printf("\\n");
    }
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Watch the boundary: `i < 5` runs for 0 to 4 (5 times), while `i <= 5` runs for 0 to 5 (6 times). Off-by-one errors are the most common loop bug.",
          ),
          quiz(
            "How many times does the body of `for (int i = 0; i < 5; i++)` run?",
            ["4", "5", "6", "Forever"],
            1,
            "i takes the values 0, 1, 2, 3 and 4. When i becomes 5, the condition i < 5 is false and the loop stops: 5 passes.",
          ),
          quiz(
            "In nested loops where the outer loop runs 3 times and the inner loop runs 4 times, how many times does the inner body run in total?",
            ["3", "4", "7", "12"],
            3,
            "The inner loop runs all 4 passes for each of the 3 outer passes: 3 × 4 = 12.",
          ),
        ],
        challenge: {
          instructions:
            "Use nested for loops to print a right triangle of stars with 5 rows: row 1 has 1 star, row 5 has 5 stars.",
          description: task(
            "Use **nested `for` loops** to print a triangle of `*` with 5 rows. The outer loop counts the rows, and the inner loop prints as many stars as the row number. End each row with a new line.",
            "*\n**\n***\n****\n*****",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    // Outer loop: rows 1 to 5
    //   Inner loop: print row stars
    //   then print a new line

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 5; row++) {
        for (int star = 1; star <= row; star++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints a 5-row triangle of stars",
              expectedOutput: "*\n**\n***\n****\n*****",
              hint: "The inner loop's condition depends on the row: star <= row.",
            },
            {
              id: "t2",
              label: "Uses nested for loops",
              keywords: [{ pattern: "\\bfor\\s*\\([\\s\\S]*\\bfor\\s*\\(" }],
              hint: "Put one for loop inside another.",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-3-4",
        title: "break & continue",
        xp: 10,
        chapterTitle: "Control Flow",
        theory: [
          text(
            "Sometimes you need to change a loop's flow from the inside. `break` **leaves the loop immediately**. `continue` **skips the rest of the current pass** and goes straight to the next one. Both affect only the innermost loop they are in.",
          ),
          text(
            "Use `break` when you have found what you were looking for, or when continuing makes no sense. The code after the loop runs next.",
            {
              label: "break stops the loop early",
              content: `#include <stdio.h>

int main(void) {
    int i;
    for (i = 1; i <= 10; i++) {
        if (i * i > 20) {
            break;
        }
        printf("%d ", i);
    }
    printf("\\nStopped at %d\\n", i);
    return 0;
}`,
            },
          ),
          text(
            "Use `continue` to skip items you don't want to process. In a `for` loop, the update (`i++`) still runs after a continue.",
            {
              label: "continue skips even numbers",
              content: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 9; i++) {
        if (i % 2 == 0) {
            continue;
        }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "In a `while` loop, put the update **before** any `continue`. Otherwise `continue` jumps back to the condition without changing the variable, and the loop runs forever.",
          ),
          quiz(
            "What does this print? `for (int i = 1; i <= 5; i++) { if (i == 3) break; printf(\"%d \", i); }`",
            ["1 2", "1 2 3", "1 2 4 5", "3"],
            0,
            "When i reaches 3, break leaves the loop before printing, so only 1 and 2 are printed.",
          ),
          quiz(
            "What does the same loop print with `continue` instead of `break`?",
            ["1 2", "1 2 3 4 5", "1 2 4 5", "4 5"],
            2,
            "continue skips only the pass where i is 3. The loop carries on with 4 and 5.",
          ),
        ],
        challenge: {
          instructions:
            "Loop i from 1 to 20. Skip multiples of 3 with continue, and stop with break as soon as i * i is greater than 100. Expected: 1 2 4 5 7 8 10",
          description: task(
            "Loop `i` from 1 to 20 and print the numbers on one line separated by spaces. Use `continue` to skip multiples of 3, and use `break` to stop as soon as `i * i` is greater than 100.",
            "1 2 4 5 7 8 10",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    // for i from 1 to 20:
    //   stop when i * i > 100
    //   skip multiples of 3
    //   print i followed by a space

    printf("\\n");
    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 20; i++) {
        if (i * i > 100) {
            break;
        }
        if (i % 3 == 0) {
            continue;
        }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints 1 2 4 5 7 8 10",
              expectedOutput: "1 2 4 5 7 8 10",
              hint: "11 * 11 is 121, so the loop must stop before printing 11.",
            },
            {
              id: "t2",
              label: "Uses break and continue",
              keywords: [{ pattern: "\\bbreak\\s*;" }, { pattern: "\\bcontinue\\s*;" }],
              hint: "if (i % 3 == 0) continue;  and  if (i * i > 100) break;",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-4",
    title: "Input & Output",
    icon: "🖥️",
    color: ACCENT,
    lessons: [
      {
        id: "c_fundamentals-4-0",
        title: "printf & format specifiers",
        xp: 15,
        chapterTitle: "Input & Output",
        theory: [
          text(
            "`printf` prints a **format string** in which each `%` placeholder is replaced by the next value after the comma. The letter after `%` must match the value's type, or the output is garbage.",
          ),
          text(
            "The specifiers you will use most:\n\n- `%d` int, `%u` unsigned int, `%ld` long\n- `%f` float or double, `%.2f` with 2 decimals\n- `%c` a char, `%s` a string of text\n- `%x` hexadecimal, `%o` octal\n- `%%` a literal percent sign",
            {
              label: "Common specifiers",
              content: `#include <stdio.h>

int main(void) {
    int count = 42;
    double ratio = 3.14159;

    printf("count = %d\\n", count);
    printf("ratio = %f\\n", ratio);
    printf("ratio = %.2f\\n", ratio);
    printf("%c %s\\n", 'Z', "is a letter");
    printf("255 in hex is %x, 8 in octal is %o\\n", 255, 8);
    printf("Progress: 75%%\\n");
    return 0;
}`,
            },
          ),
          text(
            "Between `%` and the letter you can set a **width** and a **precision**. `%5d` pads the number to 5 characters on the left, `%-8s` pads text on the right (left-aligned), `%05d` pads with zeros, and `%8.2f` makes a field 8 wide with 2 decimals. This is how you line up tables.",
            {
              label: "Width, alignment and padding",
              content: `#include <stdio.h>

int main(void) {
    printf("[%5d]\\n", 42);
    printf("[%-5d]\\n", 42);
    printf("[%05d]\\n", 42);
    printf("[%8.2f]\\n", 3.14159);
    printf("[%-8s][%8s]\\n", "left", "right");
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "The specifier must match the type. Printing a double with `%d` or an int with `%f` doesn't convert the value; it prints garbage. gcc warns about mismatches, so read the warnings.",
          ),
          quiz(
            "What does `printf(\"[%5.1f]\", 3.14159);` print?",
            ["[3.14159]", "[3.1]", "[  3.1]", "[3.1  ]"],
            2,
            "%5.1f rounds to 1 decimal (3.1) and right-aligns it in a field 5 characters wide, adding two spaces in front.",
          ),
          quiz(
            "How do you print a percent sign with printf?",
            ["\\%", "%%", "%p", "'%'"],
            1,
            "Because % starts a placeholder, a literal percent sign is written as %% in the format string.",
          ),
        ],
        challenge: {
          instructions:
            "Print a small receipt: two rows with the format %-8s|%4d|%7.2f (Coffee, 2, 3.50 and Muffin, 1, 2.25), then Discount: 10% using %%.",
          description: task(
            "Print a small receipt. Format each item row with `\"%-8s|%4d|%7.2f\\n\"`: Coffee with quantity 2 and price 3.50, then Muffin with quantity 1 and price 2.25. Then print `Discount: 10%`, using `%%` for the percent sign.",
            "Coffee  |   2|   3.50\nMuffin  |   1|   2.25\nDiscount: 10%",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    // Print the two item rows with "%-8s|%4d|%7.2f\\n"

    // Print the discount line

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    printf("%-8s|%4d|%7.2f\\n", "Coffee", 2, 3.50);
    printf("%-8s|%4d|%7.2f\\n", "Muffin", 1, 2.25);
    printf("Discount: %d%%\\n", 10);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the two aligned item rows",
              outputIncludes: ["Coffee  |   2|   3.50", "Muffin  |   1|   2.25"],
              hint: "%-8s pads the name to 8 characters, %4d and %7.2f right-align the numbers.",
            },
            {
              id: "t2",
              label: "Prints the full receipt including Discount: 10%",
              expectedOutput: "Coffee  |   2|   3.50\nMuffin  |   1|   2.25\nDiscount: 10%",
              hint: "A percent sign in the output is written %% in the format string.",
            },
            {
              id: "t3",
              label: "Uses width specifiers and %%",
              keywords: ["%-8s", "%7.2f", "%%"],
              hint: "Use the format \"%-8s|%4d|%7.2f\\n\" for the rows.",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-4-1",
        title: "scanf & user input",
        xp: 15,
        chapterTitle: "Input & Output",
        theory: [
          text(
            "`scanf` reads input typed by the user and stores it in variables. It uses the same `%` specifiers as printf, with one difference: you pass the **address** of each variable with `&`, so scanf knows where to put the value. (Addresses are explained in the Pointers course.) In PolyCode, the input for each example is supplied automatically.",
          ),
          text(
            "`scanf(\"%d\", &age);` reads one whole number into `age`. The example below is given the input `21`.",
            {
              label: "Reading one number (input: 21)",
              stdin: "21",
              content: `#include <stdio.h>

int main(void) {
    int age;
    scanf("%d", &age);
    printf("Next year you will be %d\\n", age + 1);
    return 0;
}`,
            },
          ),
          text(
            "One scanf can read several values; spaces and new lines between them are skipped. For a **double**, scanf needs `%lf` (printf accepts `%f` for both). A word of text is read into a `char` array with `%s` and **no** `&`, because an array name is already an address. `%19s` stops after 19 characters so it can't overflow a 20-character array.",
            {
              label: "Several values, %lf and a word (input: Ada 3 4.5)",
              stdin: "Ada 3 4.5",
              content: `#include <stdio.h>

int main(void) {
    char name[20];
    int width;
    double height;

    scanf("%19s %d %lf", name, &width, &height);
    printf("%s's rectangle has area %.2f\\n", name, width * height);
    return 0;
}`,
            },
          ),
          text(
            "scanf **returns how many values it read**. Checking it tells you whether the input was valid: if the user types `abc` when a number is expected, it returns 0 and the variable is left unchanged.",
            {
              label: "Checking scanf's return value (input: abc)",
              stdin: "abc",
              content: `#include <stdio.h>

int main(void) {
    int value = 0;
    int read = scanf("%d", &value);

    if (read == 1) {
        printf("You entered %d\\n", value);
    } else {
        printf("That was not a number\\n");
    }
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Forgetting the `&` (`scanf(\"%d\", age)`) is a classic bug that crashes the program or corrupts memory. gcc warns about it, so don't ignore the warning.",
          ),
          quiz(
            "Why does `scanf(\"%d\", &age);` need the `&`?",
            [
              "It makes age a constant",
              "It gives scanf the variable's address so it can store the value there",
              "It prints the value after reading it",
              "It converts the input to an int",
            ],
            1,
            "scanf has to write into your variable, so it needs to know where the variable lives in memory. &age is that address.",
          ),
          quiz(
            "Which specifier does scanf need to read a double?",
            ["%d", "%f", "%lf", "%s"],
            2,
            "scanf uses %f for float and %lf for double. Using %f for a double stores the value wrongly.",
          ),
        ],
        challenge: {
          instructions:
            "Read a name, an age and a height (input: Ada 36 1.68) with scanf, then print Ada is 36 years old and 1.68 m tall.",
          stdin: "Ada 36 1.68",
          description: task(
            "The test gives the input `Ada 36 1.68`. Use `scanf` to read a name (a word, into `char name[20]`), an age (`int`) and a height (`double`), then print them in this sentence. Print the height with 2 decimals.",
            "Ada is 36 years old and 1.68 m tall.",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    char name[20];
    // Declare age and height

    // Read name, age and height with one scanf

    // Print the sentence

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    char name[20];
    int age;
    double height;

    scanf("%19s %d %lf", name, &age, &height);
    printf("%s is %d years old and %.2f m tall.\\n", name, age, height);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the sentence from the input",
              expectedOutput: "Ada is 36 years old and 1.68 m tall.",
              hint: "scanf(\"%19s %d %lf\", name, &age, &height); then printf the three values.",
            },
            {
              id: "t2",
              label: "Reads the values with scanf, using %lf for the double",
              keywords: [{ pattern: "\\bscanf\\s*\\(" }, "%lf"],
              hint: "A double is read with %lf.",
            },
          ],
        },
      },
      {
        id: "c_fundamentals-4-2",
        title: "Capstone: Simple Calculator",
        xp: 30,
        chapterTitle: "Input & Output",
        theory: [
          text(
            "Time to combine everything from this course into one program: a **console calculator**. It reads lines such as `12 + 30`, works out each answer, handles mistakes politely and reports how many calculations it did. Plan it in small pieces before you write it.",
          ),
          text(
            "The plan:\n\n- **Read** a number, an operator and a number with `scanf(\" %lf %c %lf\", ...)`, in a loop that runs while scanf reads all 3 values.\n- **Decide** what to do with a `switch` on the operator.\n- **Guard** against dividing by zero with an `if`.\n- **Print** each result with `%.2f`, and **count** the successful calculations.\n- After the loop, **print the total**.",
          ),
          text(
            "Step 1: the reading loop. `scanf` returns 3 while it reads a full line and stops returning 3 at the end of the input, which ends the loop. The space before `%c` skips any spaces and new lines before the operator.",
            {
              label: "Reading until the input runs out",
              stdin: "4 + 5\n10 / 4",
              content: `#include <stdio.h>

int main(void) {
    double a, b;
    char op;

    while (scanf(" %lf %c %lf", &a, &op, &b) == 3) {
        printf("read: %.2f %c %.2f\\n", a, op, b);
    }
    printf("end of input\\n");
    return 0;
}`,
            },
          ),
          text(
            "Step 2: deciding with `switch`. A `default` case catches any operator you don't support. Combine this with the loop above, add the division check and a counter, and the calculator is done.",
            {
              label: "Choosing the operation",
              content: `#include <stdio.h>

int main(void) {
    double a = 9, b = 3;
    char op = '-';

    switch (op) {
        case '+': printf("%.2f\\n", a + b); break;
        case '-': printf("%.2f\\n", a - b); break;
        default:  printf("Error: unknown operator %c\\n", op);
    }
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Build it step by step: get the loop printing what it reads, then add the switch, then the error handling. Run after each step so you always know which change broke something.",
          ),
          quiz(
            "Why does the loop use `while (scanf(...) == 3)`?",
            [
              "scanf always returns 3",
              "It keeps reading while a full line was read, and stops at the end of the input",
              "It limits the program to 3 calculations",
              "It makes the numbers have 3 decimals",
            ],
            1,
            "scanf returns how many values it stored. When there is no more input (or the line is invalid) it returns less than 3, which ends the loop.",
          ),
          quiz(
            "Why is there a space before `%c` in `\" %lf %c %lf\"`?",
            [
              "To print a space",
              "To skip spaces and new lines so %c reads the operator, not whitespace",
              "Because %c needs a space to compile",
              "To read two characters",
            ],
            1,
            "%c reads any single character, including a space or new line. A space in the format string tells scanf to skip all whitespace first.",
          ),
        ],
        challenge: {
          instructions:
            "Build the calculator. Read lines of number operator number until the input ends. Support + - * /, print each result as a.aa op b.bb = r.rr, print Error: division by zero and Error: unknown operator X for bad lines, then print Done: N calculations.",
          stdin: "12 + 30\n7 / 2\n9 * 6\n5 / 0\n2 ^ 3\n10 - 4.5\n",
          description: task(
            "Build the calculator. The test input has six lines: `12 + 30`, `7 / 2`, `9 * 6`, `5 / 0`, `2 ^ 3` and `10 - 4.5`. Read each line in a loop until the input ends. Support `+`, `-`, `*` and `/`, printing each result with 2 decimals. Print `Error: division by zero` when dividing by 0, and `Error: unknown operator X` for any other operator. Finally print how many calculations succeeded.",
            "12.00 + 30.00 = 42.00\n7.00 / 2.00 = 3.50\n9.00 * 6.00 = 54.00\nError: division by zero\nError: unknown operator ^\n10.00 - 4.50 = 5.50\nDone: 4 calculations",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    double a, b;
    char op;
    int count = 0;

    // Loop while scanf reads a number, an operator and a number
    //   switch on the operator:
    //     + - * /  -> print "a op b = result" with %.2f and count it
    //     /  by 0  -> print "Error: division by zero"
    //     anything else -> print "Error: unknown operator X"

    // Print "Done: N calculations"

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    double a, b;
    char op;
    int count = 0;

    while (scanf(" %lf %c %lf", &a, &op, &b) == 3) {
        double result;

        switch (op) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b == 0) {
                    printf("Error: division by zero\\n");
                    continue;
                }
                result = a / b;
                break;
            default:
                printf("Error: unknown operator %c\\n", op);
                continue;
        }

        printf("%.2f %c %.2f = %.2f\\n", a, op, b, result);
        count++;
    }

    printf("Done: %d calculations\\n", count);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Calculates + - * / with 2 decimals",
              outputIncludes: [
                "12.00 + 30.00 = 42.00",
                "7.00 / 2.00 = 3.50",
                "9.00 * 6.00 = 54.00",
                "10.00 - 4.50 = 5.50",
              ],
              hint: "printf(\"%.2f %c %.2f = %.2f\\n\", a, op, b, result);",
            },
            {
              id: "t2",
              label: "Reports division by zero",
              outputIncludes: "Error: division by zero",
              hint: "Check if b == 0 before dividing.",
            },
            {
              id: "t3",
              label: "Reports an unknown operator",
              outputIncludes: "Error: unknown operator ^",
              hint: "Handle it in the switch's default case.",
            },
            {
              id: "t4",
              label: "Prints every line in order and Done: 4 calculations",
              expectedOutput:
                "12.00 + 30.00 = 42.00\n7.00 / 2.00 = 3.50\n9.00 * 6.00 = 54.00\nError: division by zero\nError: unknown operator ^\n10.00 - 4.50 = 5.50\nDone: 4 calculations",
              hint: "Only count successful calculations, and print the total after the loop.",
            },
            {
              id: "t5",
              label: "Uses a scanf loop and a switch",
              keywords: [{ pattern: "while\\s*\\(\\s*scanf\\s*\\(" }, { pattern: "\\bswitch\\s*\\(" }],
              hint: "while (scanf(\" %lf %c %lf\", &a, &op, &b) == 3) { switch (op) { ... } }",
            },
          ],
        },
      },
    ],
  },
];

export const C_FUNDAMENTALS_LESSONS = C_FUNDAMENTALS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({ ...l, chapterTitle: l.chapterTitle || ch.title }))
);

export const C_FUNDAMENTALS_TOTAL_XP = 255;

applyLessonVideoLinks(C_FUNDAMENTALS_LESSONS, C_FUNDAMENTALS_VIDEO_LINKS);
