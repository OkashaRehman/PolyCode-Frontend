// PolyCode — C Projects interactive course
// 5 chapters · 15 lessons · C challenges graded on real program output
// YouTube links: edit c_projectsVideoLinks.js
//
// Challenges run as a single .c file, so multi-file ideas (headers, modules,
// Makefiles) are shown as clearly marked sections of one file.

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { C_PROJECTS_VIDEO_LINKS } from "./c_projectsVideoLinks";

const ACCENT = "#f39c12";

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

// Shared code for the Student Records chapter.
const STUDENT_STRUCT = `typedef struct {
    int id;
    char name[32];
    double gpa;
} Student;`;

// Shared code for the To-Do chapter.
const TASK_STRUCT = `typedef struct Task {
    int id;
    char title[48];
    int done;
    struct Task *next;
} Task;`;

const PRINT_TASKS = `void print_tasks(const Task *head) {
    for (const Task *t = head; t != NULL; t = t->next) {
        printf("[%c] %d. %s\\n", t->done ? 'x' : ' ', t->id, t->title);
    }
}`;

const FREE_TASKS = `void free_tasks(Task *head) {
    while (head != NULL) {
        Task *next = head->next;
        free(head);
        head = next;
    }
}`;

// Shared code for the Library Manager capstone.
const BOOK_STRUCT = `typedef struct {
    int id;
    char title[48];
    char author[32];
    int borrowed;
} Book;`;

export const C_PROJECTS_CHAPTERS = [
  {
    id: "ch-0",
    title: "Project Setup",
    icon: "🛠️",
    color: ACCENT,
    lessons: [
      {
        id: "c_projects-0-0",
        title: "C Project Structure",
        xp: 10,
        chapterTitle: "Project Setup",
        theory: [
          text(
            "Small exercises fit in one file, but real programs are split into **modules**: each module is a pair of files that handles one job. Splitting keeps files short, lets several people work at once, and means a change to one module only recompiles that module.",
          ),
          text(
            "Each module has two parts:\n\n- A **header** (`temperature.h`) with the module's public interface: prototypes, types and constants. Other files `#include` it.\n- An **implementation** (`temperature.c`) with the function bodies. It includes its own header, so the compiler checks that the two agree.\n\nHelper functions that only the module uses are marked `static`, which hides them from every other file (**internal linkage**). Only the functions in the header are public.",
          ),
          diagram("A typical small project", [
            { id: "main", label: "main.c", color: "#3b82f6", items: ["#include \"temperature.h\"", "The program's flow", "Calls the public functions"] },
            { id: "h", label: "temperature.h", color: ACCENT, items: ["Prototypes only", "The module's public interface"] },
            { id: "c", label: "temperature.c", color: "#22c55e", items: ["#include \"temperature.h\"", "Function bodies", "static helpers stay private"] },
          ]),
          text(
            "In this course everything runs as **one file**, so a project's files appear as clearly marked sections. The compiler sees the same thing it would after the preprocessor pasted the header in: prototypes first, then `main`, then the module's code.",
            {
              label: "A module laid out in one file",
              content: `#include <stdio.h>

/* ===== counter.h: the public interface ===== */
void counter_add(int amount);
int counter_total(void);

/* ===== main.c ===== */
int main(void) {
    counter_add(5);
    counter_add(7);
    printf("total: %d\\n", counter_total());
    return 0;
}

/* ===== counter.c: the implementation ===== */
static int total = 0;                 // private to this module

static int clamp_positive(int n) {    // private helper
    return n < 0 ? 0 : n;
}

void counter_add(int amount) {
    total += clamp_positive(amount);
}

int counter_total(void) {
    return total;
}`,
            },
          ),
          callout(
            "info",
            "If a function is declared in a header but never defined, the code still compiles. The **linker** then fails with `undefined reference`, because it can't find the function's body in any file.",
          ),
          quiz(
            "What belongs in a module's header file?",
            ["All the function bodies", "The public prototypes, types and constants", "The main function", "Private helper functions"],
            1,
            "The header is the interface other files include. Bodies go in the .c file, and private helpers stay there as static functions.",
          ),
          quiz(
            "What does `static` do to a function at file level?",
            ["Makes it run faster", "Keeps it private to its own .c file", "Makes it a global variable", "Lets it be called before main"],
            1,
            "A static function has internal linkage: other files can't call it, even with a prototype.",
          ),
        ],
        challenge: {
          instructions:
            "The header section declares c_to_f, f_to_c and describe, and main uses them, but the program doesn't link because the module isn't written. Write the temperature.c section, including a private static helper is_freezing, so it prints the four lines.",
          description: task(
            "The starter has the `temperature.h` section (three prototypes) and `main.c`, but the **implementation is missing**, so the program fails to link with `undefined reference` errors. Write the `temperature.c` section below `main`: `c_to_f` (C × 9 / 5 + 32), `f_to_c`, and `describe`, which returns `\"freezing\"` for 0 °C and below and `\"warm\"` otherwise. `describe` must use a private `static int is_freezing(double c)` helper.",
            "25.0 C = 77.0 F\n98.6 F = 37.0 C\n-5.0 C is freezing\n30.0 C is warm",
          ),
          starterCode: `#include <stdio.h>

/* ===== temperature.h ===== */
double c_to_f(double c);
double f_to_c(double f);
const char *describe(double c);

/* ===== main.c ===== */
int main(void) {
    printf("%.1f C = %.1f F\\n", 25.0, c_to_f(25.0));
    printf("%.1f F = %.1f C\\n", 98.6, f_to_c(98.6));
    printf("%.1f C is %s\\n", -5.0, describe(-5.0));
    printf("%.1f C is %s\\n", 30.0, describe(30.0));
    return 0;
}

/* ===== temperature.c ===== */
// Write the module here: a static is_freezing helper, c_to_f, f_to_c and describe
`,
          solution: `#include <stdio.h>

/* ===== temperature.h ===== */
double c_to_f(double c);
double f_to_c(double f);
const char *describe(double c);

/* ===== main.c ===== */
int main(void) {
    printf("%.1f C = %.1f F\\n", 25.0, c_to_f(25.0));
    printf("%.1f F = %.1f C\\n", 98.6, f_to_c(98.6));
    printf("%.1f C is %s\\n", -5.0, describe(-5.0));
    printf("%.1f C is %s\\n", 30.0, describe(30.0));
    return 0;
}

/* ===== temperature.c ===== */
static int is_freezing(double c) {
    return c <= 0.0;
}

double c_to_f(double c) {
    return c * 9.0 / 5.0 + 32.0;
}

double f_to_c(double f) {
    return (f - 32.0) * 5.0 / 9.0;
}

const char *describe(double c) {
    return is_freezing(c) ? "freezing" : "warm";
}
`,
          tests: [
            {
              id: "t1",
              label: "Links and converts the temperatures",
              outputIncludes: ["25.0 C = 77.0 F", "98.6 F = 37.0 C"],
              hint: "c_to_f returns c * 9.0 / 5.0 + 32.0; f_to_c reverses it.",
            },
            {
              id: "t2",
              label: "Describes both temperatures",
              expectedOutput: "25.0 C = 77.0 F\n98.6 F = 37.0 C\n-5.0 C is freezing\n30.0 C is warm",
              hint: "describe returns \"freezing\" when is_freezing(c) is true.",
            },
            {
              id: "t3",
              label: "The module has a private static helper and defines the public functions below main",
              keywords: [
                { pattern: "\\bstatic\\s+int\\s+is_freezing\\s*\\(\\s*double\\s+\\w+\\s*\\)\\s*\\{" },
                { pattern: "\\bint\\s+main\\b[\\s\\S]*\\bdouble\\s+c_to_f\\s*\\([^)]*\\)\\s*\\{" },
                { pattern: "\\bdescribe\\s*\\([^)]*\\)\\s*\\{[^}]*\\bis_freezing\\s*\\(" },
              ],
              hint: "static int is_freezing(double c) { ... } and describe calls it.",
            },
          ],
        },
      },
      {
        id: "c_projects-0-1",
        title: "Makefiles Basics",
        xp: 15,
        chapterTitle: "Project Setup",
        theory: [
          text(
            "Typing `gcc main.c temperature.c -o app` works for two files, but real projects have dozens, and recompiling everything after every change wastes minutes. **make** solves this: a `Makefile` lists what each file is built from, and `make` rebuilds only what is out of date.",
          ),
          text(
            "A Makefile is a list of **rules**. Each rule names a **target**, the **dependencies** it is built from, and the **command** that builds it (the command line must start with a tab):\n\n- `app: main.o temperature.o`\n- `→ gcc main.o temperature.o -o app`\n- `main.o: main.c temperature.h`\n- `→ gcc -c main.c`\n- `temperature.o: temperature.c temperature.h`\n- `→ gcc -c temperature.c`\n\n`gcc -c` compiles a single `.c` file into an object file (`.o`) without linking. The final rule links the object files into the program.",
          ),
          text(
            "The core rule of make is about **time stamps**: a target is rebuilt when it doesn't exist, or when **any dependency is newer** than it. Rebuilding one target can then make the targets that depend on it out of date too, so the change ripples upwards. Editing only `temperature.c` recompiles `temperature.o` and relinks `app`, but leaves `main.o` alone.",
            {
              label: "make's decision rule in C",
              content: `#include <stdio.h>

// Returns 1 if a target modified at target_time must be rebuilt.
int out_of_date(int target_time, const int *dep_times, int count) {
    for (int i = 0; i < count; i++) {
        if (dep_times[i] > target_time) {
            return 1;
        }
    }
    return 0;
}

int main(void) {
    int deps[2] = {100, 40};     // main.c changed at time 100
    printf("main.o built at 90: rebuild? %d\\n", out_of_date(90, deps, 2));
    printf("main.o built at 120: rebuild? %d\\n", out_of_date(120, deps, 2));
    return 0;
}`,
            },
          ),
          diagram("Dependencies for a two-file project", [
            { id: "src", label: "Sources", color: "#3b82f6", items: ["main.c", "temperature.c", "temperature.h"] },
            { id: "obj", label: "Object files", color: ACCENT, items: ["main.o ← main.c, temperature.h", "temperature.o ← temperature.c, temperature.h"] },
            { id: "app", label: "Program", color: "#22c55e", items: ["app ← main.o, temperature.o"] },
          ]),
          callout(
            "tip",
            "Most Makefiles also have a `clean` rule (`rm -f *.o app`) to delete build output, and use variables such as `CC = gcc` and `CFLAGS = -Wall -Wextra` so compiler settings are set in one place.",
          ),
          quiz(
            "When does make rebuild a target?",
            ["Every time make runs", "When the target is missing or any dependency is newer than it", "Only after make clean", "When the target is newer than its dependencies"],
            1,
            "make compares modification times and only rebuilds what is out of date.",
          ),
          quiz(
            "What does `gcc -c main.c` produce?",
            ["A finished program", "An object file main.o, compiled but not linked", "A Makefile", "A header file"],
            1,
            "-c stops after compiling. The linker step later combines the .o files into a program.",
          ),
        ],
        challenge: {
          instructions:
            "Simulate make. Write int out_of_date(int target_time, const int *dep_times, int count). For main.o (built 90, main.c 100), util.o (built 60, util.c 50) and app (built 95, depends on main.o and util.o), decide each rebuild; a rebuilt target gets time 200. Print the three decisions.",
          description: task(
            "Simulate how `make` decides what to rebuild. Write `int out_of_date(int target_time, const int *dep_times, int count)`, which returns 1 if any dependency is newer than the target. The starter has the file times. Check `main.o` and `util.o` first; a target that is rebuilt gets the new time `200`. Then check `app`, which depends on both object files, using their **updated** times. Print each decision as shown, naming the first newer dependency.",
            "main.o: rebuild (main.c is newer)\nutil.o: up to date\napp: rebuild (main.o is newer)",
          ),
          starterCode: `#include <stdio.h>

#define NOW 200

// Write out_of_date here


int main(void) {
    int main_c = 100, main_o = 90;
    int util_c = 50, util_o = 60;
    int app = 95;

    // 1. main.o depends on main.c: rebuild if out of date (then main_o = NOW)
    // 2. util.o depends on util.c: rebuild if out of date (then util_o = NOW)
    // 3. app depends on main.o and util.o (use their updated times)
    // Print each decision

    return 0;
}`,
          solution: `#include <stdio.h>

#define NOW 200

int out_of_date(int target_time, const int *dep_times, int count) {
    for (int i = 0; i < count; i++) {
        if (dep_times[i] > target_time) {
            return 1;
        }
    }
    return 0;
}

int main(void) {
    int main_c = 100, main_o = 90;
    int util_c = 50, util_o = 60;
    int app = 95;

    int deps_main[1] = {main_c};
    if (out_of_date(main_o, deps_main, 1)) {
        printf("main.o: rebuild (main.c is newer)\\n");
        main_o = NOW;
    } else {
        printf("main.o: up to date\\n");
    }

    int deps_util[1] = {util_c};
    if (out_of_date(util_o, deps_util, 1)) {
        printf("util.o: rebuild (util.c is newer)\\n");
        util_o = NOW;
    } else {
        printf("util.o: up to date\\n");
    }

    int deps_app[2] = {main_o, util_o};
    if (out_of_date(app, deps_app, 2)) {
        printf("app: rebuild (%s is newer)\\n", main_o > app ? "main.o" : "util.o");
        app = NOW;
    } else {
        printf("app: up to date\\n");
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Rebuilds main.o and leaves util.o alone",
              outputIncludes: ["main.o: rebuild (main.c is newer)", "util.o: up to date"],
              hint: "main.c (100) is newer than main.o (90); util.o (60) is newer than util.c (50).",
            },
            {
              id: "t2",
              label: "Relinks app because main.o was rebuilt",
              expectedOutput: "main.o: rebuild (main.c is newer)\nutil.o: up to date\napp: rebuild (main.o is newer)",
              hint: "After rebuilding, main.o has time 200, which is newer than app (95).",
            },
            {
              id: "t3",
              label: "Uses out_of_date for every decision",
              keywords: [
                { pattern: "\\bint\\s+out_of_date\\s*\\(\\s*int\\s+\\w+\\s*,\\s*const\\s+int\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\bout_of_date\\s*\\([\\s\\S]*\\bout_of_date\\s*\\([\\s\\S]*\\bout_of_date\\s*\\(" },
                { pattern: "=\\s*NOW\\s*;" },
              ],
              hint: "Call out_of_date three times and set rebuilt targets to NOW.",
            },
          ],
        },
      },
      {
        id: "c_projects-0-2",
        title: "Header Guards",
        xp: 10,
        chapterTitle: "Project Setup",
        theory: [
          text(
            "In a bigger project, the same header is often included more than once: `main.c` includes `vector.h` and `physics.h`, and `physics.h` includes `vector.h` too. The preprocessor pastes the header's text every time, so its struct definitions appear twice, and the compiler stops with a `redefinition` error.",
          ),
          text(
            "A **header guard** makes the second copy disappear. Wrap the whole header in a check: if the guard name isn't defined yet, define it and keep the contents; if it is already defined, skip everything up to `#endif`. The guard name is usually the file name in capitals:\n\n- `#ifndef VECTOR_H`\n- `#define VECTOR_H`\n- `... the header's contents ...`\n- `#endif`",
            {
              label: "What the compiler sees after a double include, guarded",
              content: `#include <stdio.h>

/* ===== vector.h, included directly ===== */
#ifndef VECTOR_H
#define VECTOR_H
struct Vec2 { double x, y; };
#endif

/* ===== vector.h again, included through physics.h ===== */
#ifndef VECTOR_H          /* already defined: skipped */
#define VECTOR_H
struct Vec2 { double x, y; };
#endif

int main(void) {
    struct Vec2 v = {3, 4};
    printf("(%.0f, %.0f)\\n", v.x, v.y);
    return 0;
}`,
            },
          ),
          text(
            "Many compilers also support the shorter `#pragma once` at the top of a header. It isn't part of the C standard, so the `#ifndef` guard is the portable choice, and you will see both in real code.",
          ),
          callout(
            "warning",
            "Every header needs its own unique guard name. If two headers both use `UTILS_H`, the second one is silently skipped and you get confusing \"undeclared\" errors.",
          ),
          quiz(
            "What happens without a guard when a header defining a struct is included twice?",
            ["Nothing", "The struct is defined twice and the compiler reports a redefinition error", "The second include is ignored automatically", "The program crashes at runtime"],
            1,
            "#include is plain text pasting, so the definition really appears twice.",
          ),
          quiz(
            "In a guarded header, what does the preprocessor do with the second copy?",
            ["Pastes it again", "Skips it, because the guard name is already defined", "Reports an error", "Renames the struct"],
            1,
            "#ifndef GUARD is false the second time, so everything up to #endif is left out.",
          ),
        ],
        challenge: {
          instructions:
            "This program pastes vector.h twice, as a double include would, so struct Vec2 is defined twice and it doesn't compile. Add a VECTOR_H header guard around both copies so it compiles and prints the vector sum and length.",
          description: task(
            "**Fix this program.** It contains `vector.h` twice, exactly as the preprocessor would paste it for a double include, so `struct Vec2` is defined twice and the code doesn't compile. Wrap **both** copies in the same header guard (`#ifndef VECTOR_H`, `#define VECTOR_H`, `#endif`). Don't delete either copy.",
            "sum: (4.0, 6.0)\nlength squared: 25.0",
          ),
          starterCode: `#include <stdio.h>

/* ===== vector.h, included by main.c ===== */
struct Vec2 { double x, y; };
struct Vec2 vec_add(struct Vec2 a, struct Vec2 b);
double vec_length_squared(struct Vec2 v);

/* ===== vector.h again, included through physics.h ===== */
struct Vec2 { double x, y; };
struct Vec2 vec_add(struct Vec2 a, struct Vec2 b);
double vec_length_squared(struct Vec2 v);

/* ===== main.c ===== */
int main(void) {
    struct Vec2 a = {1, 2}, b = {3, 4};
    struct Vec2 sum = vec_add(a, b);
    printf("sum: (%.1f, %.1f)\\n", sum.x, sum.y);
    printf("length squared: %.1f\\n", vec_length_squared(b));
    return 0;
}

/* ===== vector.c ===== */
struct Vec2 vec_add(struct Vec2 a, struct Vec2 b) {
    struct Vec2 r = {a.x + b.x, a.y + b.y};
    return r;
}

double vec_length_squared(struct Vec2 v) {
    return v.x * v.x + v.y * v.y;
}`,
          solution: `#include <stdio.h>

/* ===== vector.h, included by main.c ===== */
#ifndef VECTOR_H
#define VECTOR_H
struct Vec2 { double x, y; };
struct Vec2 vec_add(struct Vec2 a, struct Vec2 b);
double vec_length_squared(struct Vec2 v);
#endif

/* ===== vector.h again, included through physics.h ===== */
#ifndef VECTOR_H
#define VECTOR_H
struct Vec2 { double x, y; };
struct Vec2 vec_add(struct Vec2 a, struct Vec2 b);
double vec_length_squared(struct Vec2 v);
#endif

/* ===== main.c ===== */
int main(void) {
    struct Vec2 a = {1, 2}, b = {3, 4};
    struct Vec2 sum = vec_add(a, b);
    printf("sum: (%.1f, %.1f)\\n", sum.x, sum.y);
    printf("length squared: %.1f\\n", vec_length_squared(b));
    return 0;
}

/* ===== vector.c ===== */
struct Vec2 vec_add(struct Vec2 a, struct Vec2 b) {
    struct Vec2 r = {a.x + b.x, a.y + b.y};
    return r;
}

double vec_length_squared(struct Vec2 v) {
    return v.x * v.x + v.y * v.y;
}`,
          tests: [
            {
              id: "t1",
              label: "Compiles and prints the results",
              expectedOutput: "sum: (4.0, 6.0)\nlength squared: 25.0",
              hint: "Wrap each copy in #ifndef VECTOR_H / #define VECTOR_H / #endif.",
            },
            {
              id: "t2",
              label: "Both copies are guarded with VECTOR_H",
              keywords: [
                { pattern: "#ifndef\\s+VECTOR_H[\\s\\S]*#define\\s+VECTOR_H[\\s\\S]*#endif[\\s\\S]*#ifndef\\s+VECTOR_H[\\s\\S]*#define\\s+VECTOR_H[\\s\\S]*#endif" },
              ],
              hint: "The same guard name goes around both copies.",
            },
            {
              id: "t3",
              label: "Keeps both copies of the header",
              keywords: [{ pattern: "struct\\s+Vec2\\s*\\{[^}]*\\}\\s*;[\\s\\S]*struct\\s+Vec2\\s*\\{[^}]*\\}\\s*;" }],
              hint: "Don't delete a copy; the guard is what makes the double include safe.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-1",
    title: "Mini Calculator",
    icon: "🧮",
    color: ACCENT,
    lessons: [
      {
        id: "c_projects-1-0",
        title: "Requirements & Design",
        xp: 10,
        chapterTitle: "Mini Calculator",
        theory: [
          text(
            "Before writing a project, decide **what** it must do and **how** it will be organised. Ten minutes of planning saves hours of rewriting. This chapter builds a small calculator, starting with its requirements and a design that keeps the code easy to extend.",
          ),
          text(
            "Requirements for the calculator:\n\n- Read expressions like `12 + 7`, one per line.\n- Support `+`, `-`, `*`, `/` and `^` (whole-number powers).\n- Never crash on bad input: report a clear error and carry on.\n- Reject division by zero.\n\nFrom these, a design falls out: a **parser** turns a line into numbers and an operator, an **evaluator** computes the result or an error, and `main` loops over lines and prints. Each part can be written and tested on its own.",
          ),
          diagram("Calculator design", [
            { id: "in", label: "Input", color: "#3b82f6", items: ["fgets one line", "e.g. \"12 + 7\""] },
            { id: "parse", label: "Parser", color: ACCENT, items: ["Line → a, op, b", "Or a parse error"] },
            { id: "eval", label: "Evaluator", color: "#22c55e", items: ["a op b → result", "Or division by zero / bad operator"] },
            { id: "out", label: "Output", color: "#a855f7", items: ["Result or error message"] },
          ]),
          text(
            "A **table** of operations is a useful design tool: one struct per operator holding its symbol, its name and its rules. Code that prints help, validates input or documents the program can all read the same table, so adding an operator means adding one row.",
            {
              label: "An operation table",
              content: `#include <stdio.h>

typedef struct {
    char symbol;
    const char *name;
} Operation;

static const Operation OPERATIONS[] = {
    {'+', "add"},
    {'-', "subtract"},
};

int main(void) {
    int count = sizeof OPERATIONS / sizeof OPERATIONS[0];
    for (int i = 0; i < count; i++) {
        printf("%c  %s\\n", OPERATIONS[i].symbol, OPERATIONS[i].name);
    }
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Write the requirements as a short checklist and turn each item into a test case. Then you know exactly when the project is done.",
          ),
          quiz(
            "Why split the calculator into a parser and an evaluator?",
            ["C requires it", "Each part has one job and can be written and tested separately", "It makes the program shorter", "So it can run on two computers"],
            1,
            "Separate parts are easier to understand, test and change. A parsing bug can't hide inside the maths code.",
          ),
          quiz(
            "What is the advantage of an operation table?",
            ["It uses less memory", "Adding an operator means adding one row that every part of the program can read", "Tables are faster than if statements", "It removes the need for a parser"],
            1,
            "The table is a single source of truth for the supported operators.",
          ),
        ],
        challenge: {
          instructions:
            "Turn the requirements into an operation table: typedef struct { char symbol; const char *name; int checks_zero; } Operation with rows for + - * / ^. Write void print_spec(const Operation *ops, int count) that prints each operator, marking the ones that reject a zero right side, then the operator count.",
          description: task(
            "Capture the calculator's requirements in an **operation table**. Define `typedef struct { char symbol; const char *name; int checks_zero; } Operation;` and a `static const Operation` array with rows for `+ add`, `- subtract`, `* multiply`, `/ divide` (which rejects a zero right side) and `^ power`. Write `void print_spec(const Operation *ops, int count)` that prints one line per operator, adding the note for operators with `checks_zero`. Compute the count with `sizeof` and print it at the end.",
            "+  add\n-  subtract\n*  multiply\n/  divide (right side must not be 0)\n^  power\n5 operators",
          ),
          starterCode: `#include <stdio.h>

// Define the Operation type and the operation table here

// Write print_spec here


int main(void) {
    // Print the spec from the table, then the number of operators (computed with sizeof)

    return 0;
}`,
          solution: `#include <stdio.h>

typedef struct {
    char symbol;
    const char *name;
    int checks_zero;
} Operation;

static const Operation OPERATIONS[] = {
    {'+', "add", 0},
    {'-', "subtract", 0},
    {'*', "multiply", 0},
    {'/', "divide", 1},
    {'^', "power", 0},
};

void print_spec(const Operation *ops, int count) {
    for (int i = 0; i < count; i++) {
        printf("%c  %s", ops[i].symbol, ops[i].name);
        if (ops[i].checks_zero) {
            printf(" (right side must not be 0)");
        }
        printf("\\n");
    }
}

int main(void) {
    int count = sizeof OPERATIONS / sizeof OPERATIONS[0];
    print_spec(OPERATIONS, count);
    printf("%d operators\\n", count);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Lists the operators and marks division",
              outputIncludes: ["+  add", "/  divide (right side must not be 0)", "^  power"],
              hint: "Print the note only when checks_zero is 1.",
            },
            {
              id: "t2",
              label: "Prints the full spec and the count",
              expectedOutput: "+  add\n-  subtract\n*  multiply\n/  divide (right side must not be 0)\n^  power\n5 operators",
              hint: "count = sizeof OPERATIONS / sizeof OPERATIONS[0];",
            },
            {
              id: "t3",
              label: "Uses an Operation table read by print_spec",
              keywords: [
                { pattern: "\\btypedef\\s+struct\\s*\\{[^}]*\\bchar\\s+symbol\\s*;[^}]*\\bchecks_zero\\s*;[^}]*\\}\\s*Operation\\s*;" },
                { pattern: "\\bconst\\s+Operation\\s+\\w+\\s*\\[\\s*\\]\\s*=" },
                { pattern: "\\bvoid\\s+print_spec\\s*\\(\\s*const\\s+Operation\\s*\\*" },
                { pattern: "\\bsizeof\\b" },
              ],
              hint: "static const Operation OPERATIONS[] = { {'+', \"add\", 0}, ... };",
            },
          ],
        },
      },
      {
        id: "c_projects-1-1",
        title: "Parsing User Input",
        xp: 20,
        chapterTitle: "Mini Calculator",
        theory: [
          text(
            "User input is never as tidy as you hope: extra spaces, missing parts, typos, letters where numbers belong. A **parser** checks a line step by step and either extracts the pieces or reports exactly what is wrong. A good parser never crashes and never silently guesses.",
          ),
          text(
            "`strtod(text, &end)` converts the start of a string to a double and sets `end` to the first character it didn't use. If `end` equals the starting point, there was no number at all. Moving a pointer through the line this way lets the parser check each part in order.",
            {
              label: "Reading a number and seeing what is left",
              content: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    const char *inputs[3] = {"42.5 apples", "  7", "abc"};
    for (int i = 0; i < 3; i++) {
        char *end;
        double value = strtod(inputs[i], &end);
        if (end == inputs[i]) {
            printf("\\"%s\\": no number\\n", inputs[i]);
        } else {
            printf("\\"%s\\": %.1f, rest \\"%s\\"\\n", inputs[i], value, end);
        }
    }
    return 0;
}`,
            },
          ),
          text(
            "A parser should return a **result code** instead of printing, so the caller decides how to report it. An `enum` gives each outcome a readable name, and the caller can turn codes into messages with a `switch`. Checking for leftover text at the end catches inputs like `9 / 3 extra`.",
          ),
          callout(
            "info",
            "`scanf(\"%lf %c %lf\")` is quick but can't tell you which part failed, and it stops reading in the middle of a bad line. Reading whole lines with `fgets` and parsing them gives much better error messages.",
          ),
          quiz(
            "After `double v = strtod(s, &end);`, how do you know that no number was found?",
            ["v is 0", "end == s", "end is NULL", "strtod returns -1"],
            1,
            "If strtod couldn't read anything, it leaves end pointing at the start of the string. (v is 0 then, but 0 is also a valid number.)",
          ),
          quiz(
            "Why should parse_expression return a code rather than print errors itself?",
            ["Printing is slow", "The caller can decide how and where to report the problem", "Functions can't print", "To use less memory"],
            1,
            "Separating detection from reporting makes the parser reusable, for example in a GUI or a test.",
          ),
        ],
        challenge: {
          instructions:
            "Write int parse_expression(const char *line, double *a, char *op, double *b) using strtod that returns PARSE_OK or a specific error (no first number, no operator, no second number, trailing text). Parse each input line and print ok: a op b or the error.",
          stdin: "12 + 7\n3.5*2\nabc\n7 x 2\n4 +\n9 / 3 extra\n",
          description: task(
            "Write `int parse_expression(const char *line, double *a, char *op, double *b)`. Use `strtod` to read the first number, skip spaces, accept one of `+ - * /` as the operator, read the second number with `strtod`, and finally make sure only spaces are left. Return one of the codes from the starter's `enum`. In `main`, read each input line with `fgets` and print either the parsed expression or the matching error message.",
            "12 + 7 -> ok: 12.00 + 7.00\n3.5*2 -> ok: 3.50 * 2.00\nabc -> error: expected a number\n7 x 2 -> error: expected an operator (+ - * /)\n4 + -> error: expected a second number\n9 / 3 extra -> error: unexpected text after the expression",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

enum ParseResult {
    PARSE_OK,
    PARSE_NO_FIRST,
    PARSE_NO_OPERATOR,
    PARSE_NO_SECOND,
    PARSE_TRAILING
};

// Write parse_expression here (use strtod and a pointer that moves through the line)


int main(void) {
    char line[128];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        // Parse the line, then print "LINE -> ok: A OP B" or "LINE -> error: MESSAGE"
    }
    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

enum ParseResult {
    PARSE_OK,
    PARSE_NO_FIRST,
    PARSE_NO_OPERATOR,
    PARSE_NO_SECOND,
    PARSE_TRAILING
};

static const char *skip_spaces(const char *p) {
    while (*p == ' ') p++;
    return p;
}

int parse_expression(const char *line, double *a, char *op, double *b) {
    char *end;
    const char *p = line;

    *a = strtod(p, &end);
    if (end == p) return PARSE_NO_FIRST;
    p = skip_spaces(end);

    if (*p != '+' && *p != '-' && *p != '*' && *p != '/') return PARSE_NO_OPERATOR;
    *op = *p++;

    *b = strtod(p, &end);
    if (end == p) return PARSE_NO_SECOND;
    p = skip_spaces(end);

    if (*p != '\\0') return PARSE_TRAILING;
    return PARSE_OK;
}

const char *parse_message(int code) {
    switch (code) {
        case PARSE_NO_FIRST: return "expected a number";
        case PARSE_NO_OPERATOR: return "expected an operator (+ - * /)";
        case PARSE_NO_SECOND: return "expected a second number";
        case PARSE_TRAILING: return "unexpected text after the expression";
        default: return "ok";
    }
}

int main(void) {
    char line[128];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        double a, b;
        char op;
        int code = parse_expression(line, &a, &op, &b);
        if (code == PARSE_OK) {
            printf("%s -> ok: %.2f %c %.2f\\n", line, a, op, b);
        } else {
            printf("%s -> error: %s\\n", line, parse_message(code));
        }
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Parses valid expressions, with or without spaces",
              outputIncludes: ["12 + 7 -> ok: 12.00 + 7.00", "3.5*2 -> ok: 3.50 * 2.00"],
              hint: "strtod skips leading spaces; skip the spaces before the operator yourself.",
            },
            {
              id: "t2",
              label: "Reports each kind of error",
              outputIncludes: ["abc -> error: expected a number", "7 x 2 -> error: expected an operator (+ - * /)", "4 + -> error: expected a second number", "9 / 3 extra -> error: unexpected text after the expression"],
              hint: "end == p after strtod means no number was found.",
            },
            {
              id: "t3",
              label: "Handles every line in order",
              expectedOutput: "12 + 7 -> ok: 12.00 + 7.00\n3.5*2 -> ok: 3.50 * 2.00\nabc -> error: expected a number\n7 x 2 -> error: expected an operator (+ - * /)\n4 + -> error: expected a second number\n9 / 3 extra -> error: unexpected text after the expression",
              hint: "After the second number, only spaces may be left.",
            },
            {
              id: "t4",
              label: "Parses with strtod and returns result codes",
              keywords: [
                { pattern: "\\bint\\s+parse_expression\\s*\\(\\s*const\\s+char\\s*\\*\\s*\\w+\\s*,\\s*double\\s*\\*\\s*\\w+\\s*,\\s*char\\s*\\*\\s*\\w+\\s*,\\s*double\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "\\bstrtod\\s*\\([\\s\\S]*\\bstrtod\\s*\\(" },
                { pattern: "\\breturn\\s+PARSE_TRAILING\\s*;" },
              ],
              hint: "Use strtod for both numbers and return PARSE_TRAILING for leftover text.",
            },
          ],
        },
      },
      {
        id: "c_projects-1-2",
        title: "Implementing Operations",
        xp: 20,
        chapterTitle: "Mini Calculator",
        theory: [
          text(
            "With input parsed, the **evaluator** does the maths. Like the parser, it shouldn't print or exit: it returns a **status** and writes the result through a pointer. That makes every error case explicit, and `main` stays a simple loop.",
          ),
          text(
            "The pattern `int apply(double a, char op, double b, double *result)` returns `CALC_OK` and fills `*result`, or returns an error code and leaves the result alone. A `switch` on the operator keeps each operation in one clear place.",
            {
              label: "An evaluator with status codes",
              content: `#include <stdio.h>

enum Status { CALC_OK, CALC_DIV_ZERO, CALC_UNKNOWN_OP };

int apply(double a, char op, double b, double *result) {
    switch (op) {
        case '+': *result = a + b; return CALC_OK;
        case '-': *result = a - b; return CALC_OK;
        case '/':
            if (b == 0) return CALC_DIV_ZERO;
            *result = a / b;
            return CALC_OK;
        default:
            return CALC_UNKNOWN_OP;
    }
}

int main(void) {
    double r;
    if (apply(9, '/', 2, &r) == CALC_OK) printf("9 / 2 = %g\\n", r);
    if (apply(9, '/', 0, &r) == CALC_DIV_ZERO) printf("9 / 0: division by zero\\n");
    return 0;
}`,
            },
          ),
          text(
            "Some operations have their own rules. A whole-number power can be computed with a loop, but only when the exponent is a whole number of at least 0; anything else is an error, not a guess. Checking `exponent != (int)exponent` detects a fractional exponent. Print results with `%g`, which drops pointless zeros (`10` instead of `10.000000`).",
          ),
          callout(
            "warning",
            "Comparing doubles with `==` is risky after calculations, because of rounding. Comparing a value that was read directly from input with 0 or with its own integer part, as here, is fine.",
          ),
          quiz(
            "Why does `apply` return a status code and write the result through a pointer?",
            ["Doubles can't be returned", "So it can report errors such as division by zero without a special result value", "To make it faster", "Pointers are required for switch"],
            1,
            "Any double could be a valid result, so a separate status is the only clear way to signal failure.",
          ),
          quiz(
            "What does `printf(\"%g\", 1024.0)` print?",
            ["1024.000000", "1024", "1.024e+03", "1024.0"],
            1,
            "%g uses the shorter of %f and %e style and removes trailing zeros.",
          ),
        ],
        challenge: {
          instructions:
            "Write int apply(double a, char op, double b, double *result) supporting + - * / and ^ (whole-number exponent >= 0 via a loop), returning CALC_OK, CALC_DIV_ZERO, CALC_BAD_POWER or CALC_UNKNOWN_OP. Read expressions until the input ends and print the result with %g or the error.",
          stdin: "8 + 2\n8 / 0\n2 ^ 10\n2 ^ 0.5\n7 % 3\n9 * -1\n",
          description: task(
            "Write `int apply(double a, char op, double b, double *result)`. Support `+`, `-`, `*`, `/` (return `CALC_DIV_ZERO` when b is 0) and `^`, computed with a loop, which needs a whole-number exponent of at least 0 (otherwise return `CALC_BAD_POWER`). Any other operator returns `CALC_UNKNOWN_OP`. In `main`, read `a op b` lines with `scanf(\" %lf %c %lf\")` until the input ends, and print the result with `%g` or the error message.",
            "8 + 2 = 10\n8 / 0: error: division by zero\n2 ^ 10 = 1024\n2 ^ 0.5: error: exponent must be a whole number >= 0\n7 % 3: error: unknown operator '%'\n9 * -1 = -9",
          ),
          starterCode: `#include <stdio.h>

enum Status { CALC_OK, CALC_DIV_ZERO, CALC_BAD_POWER, CALC_UNKNOWN_OP };

// Write apply here


int main(void) {
    double a, b;
    char op;
    while (scanf(" %lf %c %lf", &a, &op, &b) == 3) {
        // Call apply and print "A OP B = RESULT" or "A OP B: error: MESSAGE" (numbers with %g)
    }
    return 0;
}`,
          solution: `#include <stdio.h>

enum Status { CALC_OK, CALC_DIV_ZERO, CALC_BAD_POWER, CALC_UNKNOWN_OP };

int apply(double a, char op, double b, double *result) {
    switch (op) {
        case '+':
            *result = a + b;
            return CALC_OK;
        case '-':
            *result = a - b;
            return CALC_OK;
        case '*':
            *result = a * b;
            return CALC_OK;
        case '/':
            if (b == 0) return CALC_DIV_ZERO;
            *result = a / b;
            return CALC_OK;
        case '^': {
            if (b < 0 || b != (int)b) return CALC_BAD_POWER;
            double r = 1;
            for (int i = 0; i < (int)b; i++) {
                r *= a;
            }
            *result = r;
            return CALC_OK;
        }
        default:
            return CALC_UNKNOWN_OP;
    }
}

int main(void) {
    double a, b;
    char op;
    while (scanf(" %lf %c %lf", &a, &op, &b) == 3) {
        double result;
        int status = apply(a, op, b, &result);
        if (status == CALC_OK) {
            printf("%g %c %g = %g\\n", a, op, b, result);
        } else if (status == CALC_DIV_ZERO) {
            printf("%g %c %g: error: division by zero\\n", a, op, b);
        } else if (status == CALC_BAD_POWER) {
            printf("%g %c %g: error: exponent must be a whole number >= 0\\n", a, op, b);
        } else {
            printf("%g %c %g: error: unknown operator '%c'\\n", a, op, b, op);
        }
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Calculates + * and ^",
              outputIncludes: ["8 + 2 = 10", "2 ^ 10 = 1024", "9 * -1 = -9"],
              hint: "Print numbers with %g; compute ^ with a loop that multiplies b times.",
            },
            {
              id: "t2",
              label: "Reports division by zero, bad powers and unknown operators",
              outputIncludes: ["8 / 0: error: division by zero", "2 ^ 0.5: error: exponent must be a whole number >= 0", "7 % 3: error: unknown operator '%'"],
              hint: "b != (int)b detects a fractional exponent.",
            },
            {
              id: "t3",
              label: "Handles every line in order",
              expectedOutput: "8 + 2 = 10\n8 / 0: error: division by zero\n2 ^ 10 = 1024\n2 ^ 0.5: error: exponent must be a whole number >= 0\n7 % 3: error: unknown operator '%'\n9 * -1 = -9",
              hint: "One printf per status.",
            },
            {
              id: "t4",
              label: "apply uses a switch and returns status codes",
              keywords: [
                { pattern: "\\bint\\s+apply\\s*\\(\\s*double\\s+\\w+\\s*,\\s*char\\s+\\w+\\s*,\\s*double\\s+\\w+\\s*,\\s*double\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "\\bswitch\\s*\\(\\s*op\\s*\\)" },
                { pattern: "\\breturn\\s+CALC_DIV_ZERO\\s*;" },
                { pattern: "\\breturn\\s+CALC_BAD_POWER\\s*;" },
              ],
              hint: "switch (op) { case '+': ... } returning a status for each case.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-2",
    title: "Student Records System",
    icon: "🎓",
    color: ACCENT,
    lessons: [
      {
        id: "c_projects-2-0",
        title: "Struct Design for Students",
        xp: 15,
        chapterTitle: "Student Records System",
        theory: [
          text(
            "Every records system starts with the shape of one record. Good struct design decides which fields exist, what type each has, and which values are **valid**. Getting this right first makes everything built on top simpler, because the rest of the code can trust the data.",
          ),
          text(
            "Design choices for a student record:\n\n- `int id`: a unique, positive number. Numbers are easier to compare and search than names.\n- `char name[32]`: a fixed-size array, so the whole record can be copied and saved to a file in one piece.\n- `char grade`: a single letter, `A`–`F`.\n- `double gpa`: from 0.0 to 4.0.\n\nWrite the rules down in one **validation function** and call it whenever a record is created or changed.",
            {
              label: "A record type and a validation function",
              content: `#include <stdio.h>

typedef struct {
    int id;
    char name[32];
    double gpa;
} Student;

// Returns NULL if the record is valid, otherwise the reason.
const char *validate(const Student *s) {
    if (s->id <= 0) return "id must be positive";
    if (s->gpa < 0.0 || s->gpa > 4.0) return "gpa out of range";
    return NULL;
}

int main(void) {
    Student good = {7, "Ada", 3.9};
    Student bad = {8, "Bob", 5.2};
    const char *reason;

    reason = validate(&good);
    printf("Ada: %s\\n", reason ? reason : "valid");
    reason = validate(&bad);
    printf("Bob: %s\\n", reason ? reason : "valid");
    return 0;
}`,
            },
          ),
          text(
            "Returning `NULL` for \"valid\" and a message for \"invalid\" gives the caller both the yes/no answer and a reason it can show to the user. Checking the rules in a fixed order means the first problem found is the one reported.",
          ),
          callout(
            "tip",
            "Validate data at the edges of your program, where it comes in from the user or a file. Inside the program you can then rely on every record being valid.",
          ),
          quiz(
            "Why store the name as `char name[32]` rather than `char *name`?",
            [
              "char * can't hold names",
              "The record is then one self-contained block that can be copied or saved to a file directly",
              "Arrays are always faster",
              "Pointers can't be in structs",
            ],
            1,
            "With a pointer, copying or saving the struct would only copy the address, not the text.",
          ),
          quiz(
            "What is the benefit of one central validation function?",
            ["It runs faster", "Every part of the program applies exactly the same rules", "It removes the need for structs", "It sorts the records"],
            1,
            "If the rules live in one place, they can't drift apart between the add, update and load code.",
          ),
        ],
        challenge: {
          instructions:
            "Define typedef struct { int id; char name[32]; char grade; double gpa; } StudentRecord and const char *validate_student(const StudentRecord *s) that returns NULL or the first broken rule (positive id, non-empty name, gpa 0.0-4.0, grade A-F). Check the 5 records and print #id: ok or the reason, then valid records: 1 of 5.",
          description: task(
            "Define `StudentRecord` with `int id`, `char name[32]`, `char grade` and `double gpa`. Write `const char *validate_student(const StudentRecord *s)` that checks the rules **in this order** and returns the first problem's message, or NULL if the record is valid: the id must be positive; the name must not be empty; the gpa must be between 0.0 and 4.0; the grade must be one of A, B, C, D or F. Check the five records in the starter, print each result, then the number of valid records.",
            "#101: ok\n#0: id must be positive\n#103: name is empty\n#104: gpa must be between 0.0 and 4.0\n#105: grade must be A, B, C, D or F\nvalid records: 1 of 5",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

// Define StudentRecord here (id, name[32], grade, gpa)

// Write validate_student here


int main(void) {
    // Create these 5 records in an array, validate each and print the result:
    //   101 "Ayesha" 'A' 3.8
    //   0   "Nobody" 'B' 3.0
    //   103 ""       'C' 2.5
    //   104 "Hamza"  'B' 4.6
    //   105 "Zara"   'X' 2.0
    // Then print "valid records: N of 5"

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[32];
    char grade;
    double gpa;
} StudentRecord;

const char *validate_student(const StudentRecord *s) {
    if (s->id <= 0) return "id must be positive";
    if (s->name[0] == '\\0') return "name is empty";
    if (s->gpa < 0.0 || s->gpa > 4.0) return "gpa must be between 0.0 and 4.0";
    if (strchr("ABCDF", s->grade) == NULL || s->grade == '\\0') return "grade must be A, B, C, D or F";
    return NULL;
}

int main(void) {
    StudentRecord records[5] = {
        {101, "Ayesha", 'A', 3.8},
        {0, "Nobody", 'B', 3.0},
        {103, "", 'C', 2.5},
        {104, "Hamza", 'B', 4.6},
        {105, "Zara", 'X', 2.0},
    };

    int valid = 0;
    for (int i = 0; i < 5; i++) {
        const char *problem = validate_student(&records[i]);
        if (problem == NULL) {
            printf("#%d: ok\\n", records[i].id);
            valid++;
        } else {
            printf("#%d: %s\\n", records[i].id, problem);
        }
    }
    printf("valid records: %d of 5\\n", valid);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Accepts the valid record and rejects bad ids and names",
              outputIncludes: ["#101: ok", "#0: id must be positive", "#103: name is empty"],
              hint: "An empty name has name[0] == '\\0'.",
            },
            {
              id: "t2",
              label: "Rejects an out-of-range gpa and an invalid grade",
              outputIncludes: ["#104: gpa must be between 0.0 and 4.0", "#105: grade must be A, B, C, D or F"],
              hint: "strchr(\"ABCDF\", grade) returns NULL for any other letter.",
            },
            {
              id: "t3",
              label: "Prints every result and the valid count",
              expectedOutput: "#101: ok\n#0: id must be positive\n#103: name is empty\n#104: gpa must be between 0.0 and 4.0\n#105: grade must be A, B, C, D or F\nvalid records: 1 of 5",
              hint: "Check the rules in the given order and count the records that return NULL.",
            },
            {
              id: "t4",
              label: "Defines StudentRecord and a validation function returning NULL or a reason",
              keywords: [
                { pattern: "\\btypedef\\s+struct\\s*\\{[^}]*\\bchar\\s+name\\s*\\[\\s*32\\s*\\][^}]*\\bchar\\s+grade\\s*;[^}]*\\}\\s*StudentRecord\\s*;" },
                { pattern: "\\bconst\\s+char\\s*\\*\\s*validate_student\\s*\\(\\s*const\\s+StudentRecord\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "\\breturn\\s+NULL\\s*;" },
              ],
              hint: "const char *validate_student(const StudentRecord *s) { ... return NULL; }",
            },
          ],
        },
      },
      {
        id: "c_projects-2-1",
        title: "Add, Remove, Update Records",
        xp: 25,
        chapterTitle: "Student Records System",
        theory: [
          text(
            "Almost every records system offers the same four operations, known as **CRUD**: **C**reate (add), **R**ead (find or list), **U**pdate and **D**elete (remove). Implementing them carefully, with checks for duplicates, missing records and a full store, is most of the work in many real programs.",
          ),
          text(
            "A simple store is a struct holding a fixed-size array and a count. Every operation starts by **finding** the record by id, so a `find_index` helper that returns the position or -1 is used by update, remove and add (to reject duplicates).",
            {
              label: "A store with add and find",
              content: `#include <stdio.h>
#include <string.h>

#define CAPACITY 4

typedef struct { int id; char name[32]; } Item;

typedef struct {
    Item items[CAPACITY];
    int count;
} Store;

int find_index(const Store *s, int id) {
    for (int i = 0; i < s->count; i++) {
        if (s->items[i].id == id) return i;
    }
    return -1;
}

int add_item(Store *s, int id, const char *name) {
    if (s->count == CAPACITY || find_index(s, id) >= 0) return 0;
    s->items[s->count].id = id;
    snprintf(s->items[s->count].name, sizeof s->items[0].name, "%s", name);
    s->count++;
    return 1;
}

int main(void) {
    Store s = {.count = 0};
    printf("add 1: %d\\n", add_item(&s, 1, "pen"));
    printf("add 1 again: %d\\n", add_item(&s, 1, "pencil"));
    printf("find 1 at index %d\\n", find_index(&s, 1));
    return 0;
}`,
            },
          ),
          text(
            "To **remove** from an array, shift every later record one place to the left to close the gap, then decrease the count. (Alternatively, move the last record into the gap, which is faster but changes the order.) Report what happened with distinct results so the caller can tell \"removed\" from \"not found\".",
          ),
          callout(
            "warning",
            "When shifting records left, copy from the gap towards the end (`items[i] = items[i + 1]`), and stop at `count - 1` so you never read past the last record.",
          ),
          quiz(
            "Why does add check `find_index(s, id) >= 0` first?",
            ["To sort the records", "To reject a duplicate id", "To find a free slot", "To check the name"],
            1,
            "Ids must be unique, so adding an id that already exists is refused.",
          ),
          quiz(
            "In a store with 5 records, you remove the record at index 1. How many records are shifted left?",
            ["1", "3", "4", "5"],
            1,
            "The records at indexes 2, 3 and 4 move one place left: 3 shifts.",
          ),
        ],
        challenge: {
          instructions:
            "Implement a student store (capacity 3) with add (rejecting duplicate ids and a full store), update of the GPA, remove (shifting records left) and list. Process the input commands and print each result as shown.",
          stdin: "add 101 Ayesha 3.8\nadd 102 Bilal 3.1\nadd 101 Dup 2.0\nupdate 102 3.4\nadd 103 Sara 3.9\nadd 104 Omar 2.7\nremove 105\nremove 101\nlist\n",
          description: task(
            "Build an in-memory student store with **capacity 3**: a `Records` struct holding `Student items[3]` and a `count`. Write `find_index`, `add_student` (reject a duplicate id or a full store), `update_gpa`, `remove_student` (shift later records left) and `list_students`. Read commands until the input ends: `add ID NAME GPA`, `update ID GPA`, `remove ID` and `list`, and print the results as shown.",
            "added 101\nadded 102\nerror: id 101 already exists\nupdated 102: gpa 3.40\nadded 103\nerror: records are full\nerror: id 105 not found\nremoved 101\n102 Bilal 3.40\n103 Sara 3.90\n2 records",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

#define CAPACITY 3

${STUDENT_STRUCT}

typedef struct {
    Student items[CAPACITY];
    int count;
} Records;

// Write find_index, add_student, update_gpa, remove_student and list_students here


int main(void) {
    Records records = {.count = 0};
    char cmd[16];

    while (scanf("%15s", cmd) == 1) {
        // "add ID NAME GPA", "update ID GPA", "remove ID", "list"
    }
    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

#define CAPACITY 3

${STUDENT_STRUCT}

typedef struct {
    Student items[CAPACITY];
    int count;
} Records;

int find_index(const Records *r, int id) {
    for (int i = 0; i < r->count; i++) {
        if (r->items[i].id == id) return i;
    }
    return -1;
}

void add_student(Records *r, int id, const char *name, double gpa) {
    if (find_index(r, id) >= 0) {
        printf("error: id %d already exists\\n", id);
        return;
    }
    if (r->count == CAPACITY) {
        printf("error: records are full\\n");
        return;
    }
    Student *s = &r->items[r->count++];
    s->id = id;
    snprintf(s->name, sizeof s->name, "%s", name);
    s->gpa = gpa;
    printf("added %d\\n", id);
}

void update_gpa(Records *r, int id, double gpa) {
    int i = find_index(r, id);
    if (i < 0) {
        printf("error: id %d not found\\n", id);
        return;
    }
    r->items[i].gpa = gpa;
    printf("updated %d: gpa %.2f\\n", id, gpa);
}

void remove_student(Records *r, int id) {
    int i = find_index(r, id);
    if (i < 0) {
        printf("error: id %d not found\\n", id);
        return;
    }
    for (int j = i; j < r->count - 1; j++) {
        r->items[j] = r->items[j + 1];
    }
    r->count--;
    printf("removed %d\\n", id);
}

void list_students(const Records *r) {
    for (int i = 0; i < r->count; i++) {
        printf("%d %s %.2f\\n", r->items[i].id, r->items[i].name, r->items[i].gpa);
    }
    printf("%d records\\n", r->count);
}

int main(void) {
    Records records = {.count = 0};
    char cmd[16];

    while (scanf("%15s", cmd) == 1) {
        int id;
        char name[32];
        double gpa;
        if (strcmp(cmd, "add") == 0 && scanf("%d %31s %lf", &id, name, &gpa) == 3) {
            add_student(&records, id, name, gpa);
        } else if (strcmp(cmd, "update") == 0 && scanf("%d %lf", &id, &gpa) == 2) {
            update_gpa(&records, id, gpa);
        } else if (strcmp(cmd, "remove") == 0 && scanf("%d", &id) == 1) {
            remove_student(&records, id);
        } else if (strcmp(cmd, "list") == 0) {
            list_students(&records);
        }
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Adds records and rejects a duplicate id",
              outputIncludes: ["added 101", "added 102", "error: id 101 already exists"],
              hint: "find_index(r, id) >= 0 means the id is taken.",
            },
            {
              id: "t2",
              label: "Updates, detects a full store and a missing id",
              outputIncludes: ["updated 102: gpa 3.40", "error: records are full", "error: id 105 not found"],
              hint: "count == CAPACITY means full.",
            },
            {
              id: "t3",
              label: "Removes a record and lists the rest in order",
              expectedOutput: "added 101\nadded 102\nerror: id 101 already exists\nupdated 102: gpa 3.40\nadded 103\nerror: records are full\nerror: id 105 not found\nremoved 101\n102 Bilal 3.40\n103 Sara 3.90\n2 records",
              hint: "Shift items[j] = items[j + 1] from the removed index, then count--.",
            },
            {
              id: "t4",
              label: "Uses a find_index helper and shifts records when removing",
              keywords: [
                { pattern: "\\bint\\s+find_index\\s*\\(\\s*const\\s+Records\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\[\\s*\\w+\\s*\\]\\s*=\\s*\\w+\\s*->\\s*items\\s*\\[\\s*\\w+\\s*\\+\\s*1\\s*\\]" },
                { pattern: "\\bfind_index\\s*\\([\\s\\S]*\\bfind_index\\s*\\([\\s\\S]*\\bfind_index\\s*\\(" },
              ],
              hint: "add, update and remove all call find_index.",
            },
          ],
        },
      },
      {
        id: "c_projects-2-2",
        title: "Save & Load from File",
        xp: 25,
        chapterTitle: "Student Records System",
        theory: [
          text(
            "A records system that forgets everything when it closes isn't much use. Saving the records to a **binary file** and loading them on startup makes the data persistent. A real file format also needs to protect itself: the program must recognise its own files and refuse anything else.",
          ),
          text(
            "Start the file with a small **header**: a **magic number** (a few fixed bytes such as `\"STU1\"` that identify the format), a **version** number, and the record count. The loader checks the magic and version before trusting the rest, so opening the wrong file gives a clear error instead of garbage.",
            {
              label: "Writing and checking a file header",
              content: `#include <stdio.h>
#include <string.h>

typedef struct {
    char magic[4];
    int version;
    int count;
} FileHeader;

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;

    FileHeader out = {{'D', 'E', 'M', 'O'}, 1, 0};
    fwrite(&out, sizeof out, 1, f);
    rewind(f);

    FileHeader in;
    if (fread(&in, sizeof in, 1, f) == 1 && memcmp(in.magic, "DEMO", 4) == 0) {
        printf("recognised DEMO file, version %d\\n", in.version);
    } else {
        printf("unknown file format\\n");
    }
    fclose(f);
    return 0;
}`,
            },
          ),
          diagram("Student file layout", [
            { id: "magic", label: "Magic", color: "#f97316", items: ["\"STU1\"", "4 bytes"] },
            { id: "ver", label: "Version and count", color: ACCENT, items: ["int version", "int count"] },
            { id: "recs", label: "Records", color: "#22c55e", items: ["count × sizeof(Student)", "One fwrite"] },
          ]),
          text(
            "`memcmp` compares raw bytes, which suits the magic field because it isn't a `'\\0'`-terminated string. The version number lets a future program read old files: if the record layout ever changes, bump the version and handle both.",
          ),
          callout(
            "tip",
            "Write a save function and a load function as a pair, and test them together: save, load into a fresh array, and compare. Any mismatch shows up immediately.",
          ),
          quiz(
            "What is the purpose of a magic number at the start of a file?",
            ["To encrypt the data", "To identify the file format so the program can reject files that aren't its own", "To store the record count", "To make the file larger"],
            1,
            "Formats like PNG and PDF start with fixed magic bytes for the same reason.",
          ),
          quiz(
            "Why compare the magic field with `memcmp` instead of `strcmp`?",
            [
              "strcmp is slower",
              "The 4 magic bytes have no '\\0' terminator, and memcmp compares an exact number of bytes",
              "memcmp ignores case",
              "strcmp can't compare arrays",
            ],
            1,
            "strcmp would keep reading past the 4 bytes looking for a terminator.",
          ),
        ],
        challenge: {
          instructions:
            "Write int save_students(const char *path, const Student *list, int count) and int load_students(const char *path, Student *out, int max) using a header {\"STU1\", version 1, count}. Save 3 students to students.dat, load and print them, then show that broken.dat (wrong magic) is rejected, and remove both files.",
          description: task(
            "Use the `FileHeader` in the starter (`magic`, `version`, `count`). Write `int save_students(const char *path, const Student *list, int count)`, which writes a header with magic `\"STU1\"` and version 1, then the records, opening the file with `\"wb\"`. Write `int load_students(const char *path, Student *out, int max)`, which opens with `\"rb\"`, checks the magic with `memcmp`, the version and the count, and returns the number loaded or -1 if the file isn't valid. Save the three students to `students.dat`, load them into `loaded` and print them. Then try loading `broken.dat`, which the starter creates with the wrong magic. Remove both files.",
            "saved 3 records to students.dat\nloaded 3 records:\n101 Ayesha 3.80\n102 Bilal 3.40\n103 Sara 3.90\nbroken.dat: not a student file\nremoved both files",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

${STUDENT_STRUCT}

typedef struct {
    char magic[4];
    int version;
    int count;
} FileHeader;

// Write save_students and load_students here


int main(void) {
    Student students[3] = {{101, "Ayesha", 3.8}, {102, "Bilal", 3.4}, {103, "Sara", 3.9}};
    Student loaded[10];

    // A file with the wrong magic, to test the loader
    FILE *bad = fopen("broken.dat", "wb");
    if (bad == NULL) return 1;
    FileHeader wrong = {{'X', 'X', 'X', 'X'}, 1, 0};
    fwrite(&wrong, sizeof wrong, 1, bad);
    fclose(bad);

    // Save to students.dat, load into loaded, print them
    // Try to load broken.dat and report it
    // Remove both files

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

${STUDENT_STRUCT}

typedef struct {
    char magic[4];
    int version;
    int count;
} FileHeader;

int save_students(const char *path, const Student *list, int count) {
    FILE *f = fopen(path, "wb");
    if (f == NULL) return 0;
    FileHeader header = {{'S', 'T', 'U', '1'}, 1, count};
    fwrite(&header, sizeof header, 1, f);
    size_t written = fwrite(list, sizeof list[0], count, f);
    fclose(f);
    return written == (size_t)count;
}

int load_students(const char *path, Student *out, int max) {
    FILE *f = fopen(path, "rb");
    if (f == NULL) return -1;
    FileHeader header;
    if (fread(&header, sizeof header, 1, f) != 1 ||
        memcmp(header.magic, "STU1", 4) != 0 ||
        header.version != 1 ||
        header.count < 0 || header.count > max) {
        fclose(f);
        return -1;
    }
    int got = (int)fread(out, sizeof out[0], header.count, f);
    fclose(f);
    return got;
}

int main(void) {
    Student students[3] = {{101, "Ayesha", 3.8}, {102, "Bilal", 3.4}, {103, "Sara", 3.9}};
    Student loaded[10];

    FILE *bad = fopen("broken.dat", "wb");
    if (bad == NULL) return 1;
    FileHeader wrong = {{'X', 'X', 'X', 'X'}, 1, 0};
    fwrite(&wrong, sizeof wrong, 1, bad);
    fclose(bad);

    if (save_students("students.dat", students, 3)) {
        printf("saved 3 records to students.dat\\n");
    }

    int n = load_students("students.dat", loaded, 10);
    printf("loaded %d records:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("%d %s %.2f\\n", loaded[i].id, loaded[i].name, loaded[i].gpa);
    }

    if (load_students("broken.dat", loaded, 10) < 0) {
        printf("broken.dat: not a student file\\n");
    }

    if (remove("students.dat") == 0 && remove("broken.dat") == 0) {
        printf("removed both files\\n");
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Saves and loads the three students",
              outputIncludes: ["saved 3 records to students.dat", "loaded 3 records:\n101 Ayesha 3.80\n102 Bilal 3.40\n103 Sara 3.90"],
              hint: "Write the header, then the records; read them back in the same order.",
            },
            {
              id: "t2",
              label: "Rejects the file with the wrong magic",
              outputIncludes: "broken.dat: not a student file",
              hint: "memcmp(header.magic, \"STU1\", 4) != 0 means it isn't your format.",
            },
            {
              id: "t3",
              label: "Prints every line and removes both files",
              expectedOutput: "saved 3 records to students.dat\nloaded 3 records:\n101 Ayesha 3.80\n102 Bilal 3.40\n103 Sara 3.90\nbroken.dat: not a student file\nremoved both files",
              hint: "remove(\"students.dat\") and remove(\"broken.dat\") at the end.",
            },
            {
              id: "t4",
              label: "Uses a magic header checked with memcmp and binary modes",
              keywords: [
                { pattern: "'S'\\s*,\\s*'T'\\s*,\\s*'U'\\s*,\\s*'1'|\"STU1\"" },
                { pattern: "\\bmemcmp\\s*\\(\\s*\\w+\\s*\\.\\s*magic\\s*,\\s*\"STU1\"\\s*,\\s*4\\s*\\)" },
                { pattern: "fopen\\s*\\(\\s*\\w+\\s*,\\s*\"wb\"\\s*\\)" },
                { pattern: "fopen\\s*\\(\\s*\\w+\\s*,\\s*\"rb\"\\s*\\)" },
              ],
              hint: "Check the magic with memcmp(header.magic, \"STU1\", 4).",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-3",
    title: "File-Based To-Do App",
    icon: "✅",
    color: ACCENT,
    lessons: [
      {
        id: "c_projects-3-0",
        title: "Task Struct & List",
        xp: 15,
        chapterTitle: "File-Based To-Do App",
        theory: [
          text(
            "The next project is a to-do app. Tasks are added and removed all the time and there is no natural maximum, so a **linked list** fits better than a fixed array. Each task carries an id, a title, a done flag and the pointer to the next task.",
          ),
          text(
            "The app keeps a `next_id` counter so every task gets a unique number, even after others are removed. New tasks are appended at the end so the list stays in the order they were added. `add_task` returns a pointer to the new task, which lets the caller change it straight away.",
            {
              label: "A task list with ids",
              content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Task {
    int id;
    char title[48];
    int done;
    struct Task *next;
} Task;

Task *append_task(Task **head, int id, const char *title) {
    Task *t = malloc(sizeof *t);
    if (t == NULL) return NULL;
    t->id = id;
    snprintf(t->title, sizeof t->title, "%s", title);
    t->done = 0;
    t->next = NULL;

    Task **link = head;
    while (*link != NULL) link = &(*link)->next;   // find the end
    *link = t;
    return t;
}

int main(void) {
    Task *list = NULL;
    append_task(&list, 1, "Plan the app");
    append_task(&list, 2, "Write the code");
    for (Task *t = list; t != NULL; t = t->next) {
        printf("%d. %s\\n", t->id, t->title);
    }
    while (list) { Task *next = list->next; free(list); list = next; }
    return 0;
}`,
            },
          ),
          text(
            "Printing tasks as `[ ]` for pending and `[x]` for done gives a familiar checklist view. Counting the pending tasks is one more traversal.",
          ),
          callout(
            "info",
            "Copy titles into the task with `snprintf(dest, sizeof dest, \"%s\", src)`. It never overflows the fixed-size title and always adds the terminator, even for very long input.",
          ),
          quiz(
            "Why keep a separate `next_id` counter instead of using the list length as the id?",
            ["It is faster", "Ids stay unique even after tasks are removed", "Lists can't be counted", "Ids must start at 100"],
            1,
            "If task 2 of 3 were removed, using the length would hand out id 3 again, a duplicate.",
          ),
          quiz(
            "Why does `append_task` take `Task **head`?",
            ["To delete the list", "Adding to an empty list must change the caller's head pointer", "Because tasks are arrays", "It doesn't need to"],
            1,
            "The first task becomes the head, so the function must be able to update the caller's head.",
          ),
        ],
        challenge: {
          instructions:
            "Write Task *add_task(Task **head, int *next_id, const char *title) that appends a task with the next id. Add Buy milk, Call Ada and Write report, mark Call Ada done through the returned pointer, print the list with print_tasks, print 3 tasks, 2 pending, and free the list.",
          description: task(
            "Write `Task *add_task(Task **head, int *next_id, const char *title)`: allocate a task with id `*next_id` (then increase it), copy the title with `snprintf`, append it at the end of the list and return it. Write `int count_pending(const Task *head)`. In `main`, add three tasks, mark the second one done **through the pointer `add_task` returned**, print the list with the provided `print_tasks`, print the totals and free the list with `free_tasks`.",
            "[ ] 1. Buy milk\n[x] 2. Call Ada\n[ ] 3. Write report\n3 tasks, 2 pending",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

${TASK_STRUCT}

${PRINT_TASKS}

${FREE_TASKS}

// Write add_task and count_pending here


int main(void) {
    Task *list = NULL;
    int next_id = 1;

    // Add "Buy milk", "Call Ada" and "Write report"; mark "Call Ada" done via the returned pointer
    // Print the list, then "N tasks, M pending"; free the list

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

${TASK_STRUCT}

${PRINT_TASKS}

${FREE_TASKS}

Task *add_task(Task **head, int *next_id, const char *title) {
    Task *t = malloc(sizeof *t);
    if (t == NULL) return NULL;
    t->id = (*next_id)++;
    snprintf(t->title, sizeof t->title, "%s", title);
    t->done = 0;
    t->next = NULL;

    Task **link = head;
    while (*link != NULL) {
        link = &(*link)->next;
    }
    *link = t;
    return t;
}

int count_pending(const Task *head) {
    int pending = 0;
    for (const Task *t = head; t != NULL; t = t->next) {
        if (!t->done) pending++;
    }
    return pending;
}

int main(void) {
    Task *list = NULL;
    int next_id = 1;

    add_task(&list, &next_id, "Buy milk");
    Task *call = add_task(&list, &next_id, "Call Ada");
    add_task(&list, &next_id, "Write report");
    if (call != NULL) {
        call->done = 1;
    }

    print_tasks(list);
    printf("%d tasks, %d pending\\n", next_id - 1, count_pending(list));

    free_tasks(list);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Adds the tasks in order with ids",
              outputIncludes: ["[ ] 1. Buy milk", "[ ] 3. Write report"],
              hint: "Append at the end of the list and use (*next_id)++ for the id.",
            },
            {
              id: "t2",
              label: "Marks Call Ada done and counts pending tasks",
              expectedOutput: "[ ] 1. Buy milk\n[x] 2. Call Ada\n[ ] 3. Write report\n3 tasks, 2 pending",
              hint: "Keep the pointer add_task returns for Call Ada and set ->done = 1.",
            },
            {
              id: "t3",
              label: "add_task takes Task ** and an id counter, and the result is used",
              keywords: [
                { pattern: "\\bTask\\s*\\*\\s*add_task\\s*\\(\\s*Task\\s*\\*\\s*\\*\\s*\\w+\\s*,\\s*int\\s*\\*\\s*\\w+\\s*,\\s*const\\s+char\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "\\bTask\\s*\\*\\s*\\w+\\s*=\\s*add_task\\s*\\(" },
                { pattern: "->\\s*done\\s*=\\s*1" },
                { pattern: "\\bfree_tasks\\s*\\(\\s*list\\s*\\)" },
              ],
              hint: "Task *call = add_task(&list, &next_id, \"Call Ada\"); call->done = 1;",
            },
          ],
        },
      },
      {
        id: "c_projects-3-1",
        title: "Add & Complete Tasks",
        xp: 20,
        chapterTitle: "File-Based To-Do App",
        theory: [
          text(
            "With the task list in place, the app needs **commands**: add a task, mark one done, remove one, and show the list. Reading whole lines with `fgets` lets task titles contain spaces, which `scanf(\"%s\")` can't handle.",
          ),
          text(
            "A small command interpreter reads a line, looks at the first word, and passes the rest on. `strncmp(line, \"add \", 4)` checks a prefix and `line + 4` is the title. `sscanf(line, \"done %d\", &id) == 1` checks the command word and reads a number in one step.",
            {
              label: "Dispatching line commands",
              stdin: "add Water the plants\ndone 3\nlist\n",
              content: `#include <stdio.h>
#include <string.h>

int main(void) {
    char line[96];
    int id;
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        if (strncmp(line, "add ", 4) == 0) {
            printf("title: \\"%s\\"\\n", line + 4);
        } else if (sscanf(line, "done %d", &id) == 1) {
            printf("mark task %d done\\n", id);
        } else if (strcmp(line, "list") == 0) {
            printf("show the list\\n");
        }
    }
    return 0;
}`,
            },
          ),
          text(
            "**Completing** a task finds it by id and sets its flag. **Removing** one unlinks and frees its node, using the same pointer-to-link technique as the Data Structures course. Both should report clearly when the id doesn't exist.",
          ),
          callout(
            "tip",
            "Free the whole list when the program ends, even though the operating system would reclaim it. Tools like Valgrind then report zero leaks, so real leaks stand out.",
          ),
          quiz(
            "Why read commands with fgets instead of scanf(\"%s\")?",
            ["fgets is faster", "Task titles can contain spaces, and %s stops at the first space", "scanf can't read numbers", "fgets removes the newline automatically"],
            1,
            "fgets reads the whole line, so \"add Buy milk\" keeps its full title. (fgets keeps the newline; you remove it yourself.)",
          ),
          quiz(
            "What does `sscanf(line, \"done %d\", &id) == 1` check?",
            ["That the line is empty", "That the line starts with \"done\" followed by a number, which is stored in id", "That id equals 1", "That the task is done"],
            1,
            "Literal text in the format must match, and the return value counts the converted numbers.",
          ),
        ],
        challenge: {
          instructions:
            "Build the command loop. Read lines until quit: add TITLE (prints added task N), done ID (completed task N or error: no task N), remove ID (removed task N, freeing the node) and list (print_tasks then N pending). Free the list at the end.",
          stdin: "add Buy milk\nadd Call Ada\nadd Write report\ndone 2\ndone 9\nremove 1\nlist\nquit\n",
          description: task(
            "Add commands to the to-do app. Read lines with `fgets` until `quit`:\n\n- `add TITLE` appends a task and prints `added task N`.\n- `done ID` marks it done (`completed task N`), or prints `error: no task N`.\n- `remove ID` unlinks and frees it (`removed task N`), or prints the same error.\n- `list` prints the tasks with `print_tasks`, then `N pending`.\n\nFree the remaining tasks before exiting.",
            "added task 1\nadded task 2\nadded task 3\ncompleted task 2\nerror: no task 9\nremoved task 1\n[x] 2. Call Ada\n[ ] 3. Write report\n1 pending",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

${TASK_STRUCT}

${PRINT_TASKS}

${FREE_TASKS}

Task *add_task(Task **head, int *next_id, const char *title) {
    Task *t = malloc(sizeof *t);
    if (t == NULL) return NULL;
    t->id = (*next_id)++;
    snprintf(t->title, sizeof t->title, "%s", title);
    t->done = 0;
    t->next = NULL;
    Task **link = head;
    while (*link != NULL) link = &(*link)->next;
    *link = t;
    return t;
}

// Write find_task, complete_task, remove_task and count_pending here


int main(void) {
    Task *list = NULL;
    int next_id = 1;
    char line[96];

    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        // Handle "add TITLE", "done ID", "remove ID", "list" and "quit"
    }

    free_tasks(list);
    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

${TASK_STRUCT}

${PRINT_TASKS}

${FREE_TASKS}

Task *add_task(Task **head, int *next_id, const char *title) {
    Task *t = malloc(sizeof *t);
    if (t == NULL) return NULL;
    t->id = (*next_id)++;
    snprintf(t->title, sizeof t->title, "%s", title);
    t->done = 0;
    t->next = NULL;
    Task **link = head;
    while (*link != NULL) link = &(*link)->next;
    *link = t;
    return t;
}

Task *find_task(Task *head, int id) {
    for (Task *t = head; t != NULL; t = t->next) {
        if (t->id == id) return t;
    }
    return NULL;
}

int complete_task(Task *head, int id) {
    Task *t = find_task(head, id);
    if (t == NULL) return 0;
    t->done = 1;
    return 1;
}

int remove_task(Task **head, int id) {
    Task **link = head;
    while (*link != NULL) {
        if ((*link)->id == id) {
            Task *gone = *link;
            *link = gone->next;
            free(gone);
            return 1;
        }
        link = &(*link)->next;
    }
    return 0;
}

int count_pending(const Task *head) {
    int pending = 0;
    for (const Task *t = head; t != NULL; t = t->next) {
        if (!t->done) pending++;
    }
    return pending;
}

int main(void) {
    Task *list = NULL;
    int next_id = 1;
    char line[96];
    int id;

    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        if (strncmp(line, "add ", 4) == 0) {
            Task *t = add_task(&list, &next_id, line + 4);
            if (t != NULL) printf("added task %d\\n", t->id);
        } else if (sscanf(line, "done %d", &id) == 1) {
            if (complete_task(list, id)) printf("completed task %d\\n", id);
            else printf("error: no task %d\\n", id);
        } else if (sscanf(line, "remove %d", &id) == 1) {
            if (remove_task(&list, id)) printf("removed task %d\\n", id);
            else printf("error: no task %d\\n", id);
        } else if (strcmp(line, "list") == 0) {
            print_tasks(list);
            printf("%d pending\\n", count_pending(list));
        } else if (strcmp(line, "quit") == 0) {
            break;
        }
    }

    free_tasks(list);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Adds tasks and completes one",
              outputIncludes: ["added task 1", "added task 3", "completed task 2"],
              hint: "strncmp(line, \"add \", 4) == 0, then add_task with line + 4.",
            },
            {
              id: "t2",
              label: "Reports a missing task and removes another",
              outputIncludes: ["error: no task 9", "removed task 1"],
              hint: "remove_task unlinks the node through Task ** and frees it.",
            },
            {
              id: "t3",
              label: "Handles every command in order",
              expectedOutput: "added task 1\nadded task 2\nadded task 3\ncompleted task 2\nerror: no task 9\nremoved task 1\n[x] 2. Call Ada\n[ ] 3. Write report\n1 pending",
              hint: "list prints the tasks, then the pending count.",
            },
            {
              id: "t4",
              label: "Parses lines with strncmp / sscanf and frees removed tasks",
              keywords: [
                { pattern: "\\bstrncmp\\s*\\(\\s*line\\s*,\\s*\"add \"\\s*,\\s*4\\s*\\)" },
                { pattern: "\\bsscanf\\s*\\(\\s*line\\s*,\\s*\"done %d\"" },
                { pattern: "\\bint\\s+remove_task\\s*\\(\\s*Task\\s*\\*\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
              ],
              hint: "int remove_task(Task **head, int id) with a pointer to the link.",
            },
          ],
        },
      },
      {
        id: "c_projects-3-2",
        title: "Persist Tasks to File",
        xp: 25,
        chapterTitle: "File-Based To-Do App",
        theory: [
          text(
            "A to-do list must survive restarts. This time a **text format** is a good choice: one task per line, fields separated by `|`, for example `2|1|Call Ada` (id, done flag, title). Text files can be read and fixed by hand, and they work across different machines.",
          ),
          text(
            "Saving walks the list and writes each task with `fprintf`. Loading reads each line with `fgets` and splits it with `sscanf(line, \"%d|%d|%47[^\\n]\", ...)`; the scanset reads the title, spaces included, up to the end of the line. Lines that don't produce 3 fields are skipped, so a damaged line doesn't break the whole load.",
            {
              label: "Saving and loading lines with |",
              content: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    fprintf(f, "1|0|Buy milk\\n");
    fprintf(f, "garbage line\\n");
    fprintf(f, "2|1|Call Ada\\n");
    rewind(f);

    char line[96], title[48];
    int id, done;
    while (fgets(line, sizeof line, f) != NULL) {
        if (sscanf(line, "%d|%d|%47[^\\n]", &id, &done, title) == 3) {
            printf("task %d (%s): %s\\n", id, done ? "done" : "pending", title);
        } else {
            printf("skipped a bad line\\n");
        }
    }
    fclose(f);
    return 0;
}`,
            },
          ),
          text(
            "After loading, the app must continue numbering **after the highest id** in the file, or new tasks would reuse existing ids. Track the maximum while loading and set `next_id` to one more than it.",
          ),
          callout(
            "warning",
            "If a title could contain the separator `|`, this simple format would break. Real formats either forbid the character, escape it, or quote fields as CSV does.",
          ),
          quiz(
            "What does `%47[^\\n]` read in sscanf?",
            ["47 numbers", "Up to 47 characters that aren't a newline, so spaces are included", "One word", "The newline only"],
            1,
            "The scanset accepts everything except '\\n', which lets titles contain spaces.",
          ),
          quiz(
            "Why must next_id be set to one more than the highest loaded id?",
            ["To sort the tasks", "So new tasks don't reuse ids that are already in the file", "Because ids must be even", "To count the tasks"],
            1,
            "Ids must stay unique across sessions.",
          ),
        ],
        challenge: {
          instructions:
            "Write int save_tasks(const char *path, const Task *head) (lines id|done|title) and Task *load_tasks(const char *path, int *next_id). Session 1: build 3 tasks, mark task 2 done, save to tasks.txt, free. Session 2: load, print, add a task with the next id (4), save again, free, and remove the file.",
          description: task(
            "Make the to-do list persistent. Write `int save_tasks(const char *path, const Task *head)`, which writes one `id|done|title` line per task and returns how many it wrote. Write `Task *load_tasks(const char *path, int *next_id)`, which reads lines with `fgets` + `sscanf(\"%d|%d|%47[^\\n]\")`, rebuilds the list in order, and sets `*next_id` to one more than the highest id. Simulate two runs of the app as described in the starter comments, then remove the file.",
            "session 1: saved 3 tasks\nsession 2: loaded 3 tasks\n[ ] 1. Buy milk\n[x] 2. Call Ada\n[ ] 3. Write report\nadded task 4\nsaved 4 tasks",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TASKS_FILE "tasks.txt"

${TASK_STRUCT}

${PRINT_TASKS}

${FREE_TASKS}

Task *append(Task **head, int id, int done, const char *title) {
    Task *t = malloc(sizeof *t);
    if (t == NULL) return NULL;
    t->id = id;
    t->done = done;
    snprintf(t->title, sizeof t->title, "%s", title);
    t->next = NULL;
    Task **link = head;
    while (*link != NULL) link = &(*link)->next;
    *link = t;
    return t;
}

// Write save_tasks and load_tasks here


int main(void) {
    // Session 1: append tasks 1 "Buy milk", 2 "Call Ada" (done), 3 "Write report",
    //            save them to TASKS_FILE, print "session 1: saved N tasks", free the list

    // Session 2: load the tasks (print "session 2: loaded N tasks"), print them,
    //            append "Pack lunch" with the next id and print "added task N",
    //            save again (print "saved N tasks"), free the list, remove the file

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TASKS_FILE "tasks.txt"

${TASK_STRUCT}

${PRINT_TASKS}

${FREE_TASKS}

Task *append(Task **head, int id, int done, const char *title) {
    Task *t = malloc(sizeof *t);
    if (t == NULL) return NULL;
    t->id = id;
    t->done = done;
    snprintf(t->title, sizeof t->title, "%s", title);
    t->next = NULL;
    Task **link = head;
    while (*link != NULL) link = &(*link)->next;
    *link = t;
    return t;
}

int save_tasks(const char *path, const Task *head) {
    FILE *f = fopen(path, "w");
    if (f == NULL) return -1;
    int count = 0;
    for (const Task *t = head; t != NULL; t = t->next) {
        fprintf(f, "%d|%d|%s\\n", t->id, t->done, t->title);
        count++;
    }
    fclose(f);
    return count;
}

Task *load_tasks(const char *path, int *next_id) {
    Task *head = NULL;
    int max_id = 0;
    FILE *f = fopen(path, "r");
    *next_id = 1;
    if (f == NULL) return NULL;

    char line[96], title[48];
    int id, done;
    while (fgets(line, sizeof line, f) != NULL) {
        if (sscanf(line, "%d|%d|%47[^\\n]", &id, &done, title) == 3) {
            append(&head, id, done, title);
            if (id > max_id) max_id = id;
        }
    }
    fclose(f);
    *next_id = max_id + 1;
    return head;
}

int count_tasks(const Task *head) {
    int n = 0;
    for (const Task *t = head; t != NULL; t = t->next) n++;
    return n;
}

int main(void) {
    Task *list = NULL;
    append(&list, 1, 0, "Buy milk");
    append(&list, 2, 1, "Call Ada");
    append(&list, 3, 0, "Write report");
    printf("session 1: saved %d tasks\\n", save_tasks(TASKS_FILE, list));
    free_tasks(list);

    int next_id;
    list = load_tasks(TASKS_FILE, &next_id);
    printf("session 2: loaded %d tasks\\n", count_tasks(list));
    print_tasks(list);

    Task *added = append(&list, next_id, 0, "Pack lunch");
    if (added != NULL) printf("added task %d\\n", added->id);
    printf("saved %d tasks\\n", save_tasks(TASKS_FILE, list));

    free_tasks(list);
    remove(TASKS_FILE);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Saves in session 1 and reloads the same tasks in session 2",
              outputIncludes: ["session 1: saved 3 tasks", "session 2: loaded 3 tasks", "[x] 2. Call Ada"],
              hint: "fprintf(f, \"%d|%d|%s\\n\", ...) to save; sscanf with %47[^\\n] to load.",
            },
            {
              id: "t2",
              label: "Continues numbering after the highest loaded id",
              outputIncludes: ["added task 4", "saved 4 tasks"],
              hint: "Set *next_id to max_id + 1 after loading.",
            },
            {
              id: "t3",
              label: "Prints both sessions in order",
              expectedOutput: "session 1: saved 3 tasks\nsession 2: loaded 3 tasks\n[ ] 1. Buy milk\n[x] 2. Call Ada\n[ ] 3. Write report\nadded task 4\nsaved 4 tasks",
              hint: "Free the list between the two sessions, then load it again from the file.",
            },
            {
              id: "t4",
              label: "Uses the id|done|title format and removes the file",
              keywords: [
                { pattern: "\\bfprintf\\s*\\(\\s*\\w+\\s*,\\s*\"%d\\|%d\\|%s\\\\n\"" },
                { pattern: "\\bsscanf\\s*\\(\\s*line\\s*,\\s*\"%d\\|%d\\|%\\d*\\[\\^\\\\n\\]\"" },
                { pattern: "\\bremove\\s*\\(\\s*TASKS_FILE\\s*\\)" },
              ],
              hint: "Save with \"%d|%d|%s\\n\" and load with \"%d|%d|%47[^\\n]\".",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-4",
    title: "Capstone Project",
    icon: "🏆",
    color: ACCENT,
    lessons: [
      {
        id: "c_projects-4-0",
        title: "Capstone Spec: Library Manager",
        xp: 10,
        chapterTitle: "Capstone Project",
        theory: [
          text(
            "The capstone is a **library manager**: a program that keeps a catalog of books and lets people search, borrow and return them. It brings together everything from this course: data design, a command interpreter, validation and clear error messages. This lesson writes the spec and the data model; the next two build and harden it.",
          ),
          text(
            "**Specification:**\n\n- Each book has an id, a title, an author and a borrowed flag.\n- Commands: `add TITLE|AUTHOR`, `borrow ID`, `return ID`, `search TEXT`, `list` and `quit`.\n- A book can't be borrowed twice, or returned if it isn't out.\n- Searching matches any part of the author's name.\n- Bad input never crashes the program; it gets a clear error.",
          ),
          diagram("Library manager modules", [
            { id: "model", label: "Data model", color: "#3b82f6", items: ["Book struct", "Library: array + count + next id"] },
            { id: "logic", label: "Core logic", color: ACCENT, items: ["add, find, borrow, return", "search by author"] },
            { id: "ui", label: "Command loop", color: "#22c55e", items: ["fgets + parse", "Messages and errors"] },
          ]),
          text(
            "`strstr(haystack, needle)` finds text inside other text and returns a pointer to the match, or NULL. It is the simplest way to implement \"search for part of a name\".",
            {
              label: "Substring search with strstr",
              content: `#include <stdio.h>
#include <string.h>

int main(void) {
    const char *authors[3] = {"Kernighan", "Ritchie", "Stroustrup"};
    const char *query = "r";
    printf("authors containing \\"%s\\":", query);
    for (int i = 0; i < 3; i++) {
        if (strstr(authors[i], query) != NULL) {
            printf(" %s", authors[i]);
        }
    }
    printf("\\n");
    // Ritchie isn't listed: strstr is case-sensitive, and "R" is not "r".
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Starting a project with a fixed sample catalog lets you test searching and printing before any input handling exists.",
          ),
          quiz(
            "What does `strstr(\"Stroustrup\", \"rou\")` return?",
            ["NULL", "A pointer to the \"rou\" inside \"Stroustrup\"", "3", "1"],
            1,
            "strstr returns a pointer to the first match, or NULL when there is none.",
          ),
          quiz(
            "Why write the spec before the code?",
            ["Compilers need it", "It defines exactly what done means and turns into test cases", "It makes the program faster", "Specs replace testing"],
            1,
            "A clear spec prevents building the wrong thing and tells you when you have finished.",
          ),
        ],
        challenge: {
          instructions:
            "With the Book struct and a 4-book catalog, write void print_catalog(const Book *books, int count), const Book *find_book(const Book *books, int count, int id) and void search_author(const Book *books, int count, const char *text) using strstr. Print the catalog, look up books 3 and 9, and search for Martin.",
          description: task(
            "The starter has the `Book` type and a sample catalog of 4 books. Write `void print_catalog(const Book *books, int count)`, `const Book *find_book(const Book *books, int count, int id)` (returns NULL if missing) and `void search_author(const Book *books, int count, const char *text)`, which uses `strstr` to list the titles of books whose author contains `text`. Use them to print the lines below.",
            "catalog:\n1. The C Programming Language - Kernighan (available)\n2. Clean Code - Martin (borrowed)\n3. Code Complete - McConnell (available)\n4. The Clean Coder - Martin (available)\nbook 3: Code Complete\nbook 9: not found\nby Martin: Clean Code, The Clean Coder",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

${BOOK_STRUCT}

// Write print_catalog, find_book and search_author here


int main(void) {
    Book books[4] = {
        {1, "The C Programming Language", "Kernighan", 0},
        {2, "Clean Code", "Martin", 1},
        {3, "Code Complete", "McConnell", 0},
        {4, "The Clean Coder", "Martin", 0},
    };

    // Print the catalog, look up books 3 and 9, then search for "Martin"

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

${BOOK_STRUCT}

void print_catalog(const Book *books, int count) {
    printf("catalog:\\n");
    for (int i = 0; i < count; i++) {
        printf("%d. %s - %s (%s)\\n", books[i].id, books[i].title, books[i].author,
               books[i].borrowed ? "borrowed" : "available");
    }
}

const Book *find_book(const Book *books, int count, int id) {
    for (int i = 0; i < count; i++) {
        if (books[i].id == id) return &books[i];
    }
    return NULL;
}

void search_author(const Book *books, int count, const char *text) {
    printf("by %s:", text);
    int found = 0;
    for (int i = 0; i < count; i++) {
        if (strstr(books[i].author, text) != NULL) {
            printf("%s %s", found ? "," : "", books[i].title);
            found++;
        }
    }
    if (!found) printf(" nothing");
    printf("\\n");
}

int main(void) {
    Book books[4] = {
        {1, "The C Programming Language", "Kernighan", 0},
        {2, "Clean Code", "Martin", 1},
        {3, "Code Complete", "McConnell", 0},
        {4, "The Clean Coder", "Martin", 0},
    };

    print_catalog(books, 4);

    int ids[2] = {3, 9};
    for (int i = 0; i < 2; i++) {
        const Book *b = find_book(books, 4, ids[i]);
        if (b != NULL) printf("book %d: %s\\n", ids[i], b->title);
        else printf("book %d: not found\\n", ids[i]);
    }

    search_author(books, 4, "Martin");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the catalog with each book's status",
              outputIncludes: "catalog:\n1. The C Programming Language - Kernighan (available)\n2. Clean Code - Martin (borrowed)",
              hint: "borrowed ? \"borrowed\" : \"available\"",
            },
            {
              id: "t2",
              label: "Finds a book by id and reports a missing one",
              outputIncludes: ["book 3: Code Complete", "book 9: not found"],
              hint: "find_book returns NULL when no id matches.",
            },
            {
              id: "t3",
              label: "Prints every line, including the author search",
              expectedOutput: "catalog:\n1. The C Programming Language - Kernighan (available)\n2. Clean Code - Martin (borrowed)\n3. Code Complete - McConnell (available)\n4. The Clean Coder - Martin (available)\nbook 3: Code Complete\nbook 9: not found\nby Martin: Clean Code, The Clean Coder",
              hint: "Put a comma before every title except the first match.",
            },
            {
              id: "t4",
              label: "find_book returns a pointer and search uses strstr",
              keywords: [
                { pattern: "\\bconst\\s+Book\\s*\\*\\s*find_book\\s*\\(" },
                { pattern: "\\bstrstr\\s*\\(\\s*\\w+\\s*\\[\\s*\\w+\\s*\\]\\s*\\.\\s*author\\s*," },
                { pattern: "\\bvoid\\s+print_catalog\\s*\\(\\s*const\\s+Book\\s*\\*" },
              ],
              hint: "strstr(books[i].author, text) != NULL means the author matches.",
            },
          ],
        },
      },
      {
        id: "c_projects-4-1",
        title: "Implementation: Core Logic",
        xp: 40,
        chapterTitle: "Capstone Project",
        theory: [
          text(
            "Now the library becomes a working program. The **core logic** is a `Library` struct (the books, a count and the next id) plus one function per operation. Each function enforces the spec's rules and returns a status; the command loop turns statuses into messages.",
          ),
          text(
            "Keeping state in one struct and passing a pointer to it keeps the functions independent of globals, so they are easy to test. Borrowing and returning are mirror images: find the book, check its flag, flip it.",
            {
              label: "Library state and borrowing rules",
              content: `#include <stdio.h>
#include <string.h>

typedef struct { int id; char title[48]; int borrowed; } Book;

typedef struct {
    Book books[8];
    int count;
    int next_id;
} Library;

enum { OK, NO_SUCH_BOOK, ALREADY_BORROWED };

int borrow_book(Library *lib, int id) {
    for (int i = 0; i < lib->count; i++) {
        if (lib->books[i].id == id) {
            if (lib->books[i].borrowed) return ALREADY_BORROWED;
            lib->books[i].borrowed = 1;
            return OK;
        }
    }
    return NO_SUCH_BOOK;
}

int main(void) {
    Library lib = {.count = 1, .next_id = 2};
    lib.books[0] = (Book){1, "SICP", 0};
    printf("first borrow: %d\\n", borrow_book(&lib, 1));
    printf("second borrow: %d\\n", borrow_book(&lib, 1));
    printf("missing book: %d\\n", borrow_book(&lib, 5));
    return 0;
}`,
            },
          ),
          text(
            "The `add` command uses the format `add TITLE|AUTHOR` so titles can contain spaces. `sscanf(line + 4, \"%47[^|]|%31[^\\n]\", title, author)` splits the text at the `|`: the first scanset reads up to the bar, the second reads the rest of the line.",
          ),
          callout(
            "info",
            "Messages are printed in exactly one place, the command loop. The core functions only return statuses, so they could be reused unchanged in a GUI or a web service.",
          ),
          quiz(
            "In `sscanf(text, \"%47[^|]|%31[^\\n]\", title, author)`, what separates the title from the author?",
            ["A space", "The | character", "A comma", "A newline"],
            1,
            "The first scanset stops at |, the literal | in the format consumes it, and the second scanset reads the rest.",
          ),
          quiz(
            "Why does the Library struct hold `next_id`?",
            ["To count borrowed books", "So every new book gets a unique id without scanning the catalog", "To sort the books", "Because arrays need it"],
            1,
            "A counter that only goes up guarantees unique ids.",
          ),
        ],
        challenge: {
          instructions:
            "Build the core library: a Library struct (books, count, next_id), add_book (from TITLE|AUTHOR), borrow_book and return_book returning status codes, and list. Process the input commands until quit and print the messages shown.",
          stdin: "add The C Programming Language|Kernighan\nadd Clean Code|Martin\nborrow 1\nborrow 1\nreturn 2\nreturn 1\nborrow 2\nlist\nquit\n",
          description: task(
            "Implement the library's core. Use a `Library` struct with `Book books[10]`, `count` and `next_id`. Write `add_book` (returns the new id), and `borrow_book` / `return_book`, which return `LIB_OK`, `LIB_NO_SUCH_BOOK`, `LIB_ALREADY_BORROWED` or `LIB_NOT_BORROWED`. In `main`, read lines with `fgets` until `quit`: `add TITLE|AUTHOR`, `borrow ID`, `return ID` and `list`, printing the messages below.",
            "added book 1: The C Programming Language\nadded book 2: Clean Code\nborrowed book 1\nerror: book 1 is already borrowed\nerror: book 2 is not borrowed\nreturned book 1\nborrowed book 2\n1. The C Programming Language by Kernighan (available)\n2. Clean Code by Martin (borrowed)",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

#define MAX_BOOKS 10

${BOOK_STRUCT}

typedef struct {
    Book books[MAX_BOOKS];
    int count;
    int next_id;
} Library;

enum LibStatus { LIB_OK, LIB_NO_SUCH_BOOK, LIB_ALREADY_BORROWED, LIB_NOT_BORROWED };

// Write find_index, add_book, borrow_book, return_book and list_books here


int main(void) {
    Library lib = {.count = 0, .next_id = 1};
    char line[128];

    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        // Handle "add TITLE|AUTHOR", "borrow ID", "return ID", "list" and "quit"
    }
    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

#define MAX_BOOKS 10

${BOOK_STRUCT}

typedef struct {
    Book books[MAX_BOOKS];
    int count;
    int next_id;
} Library;

enum LibStatus { LIB_OK, LIB_NO_SUCH_BOOK, LIB_ALREADY_BORROWED, LIB_NOT_BORROWED };

int find_index(const Library *lib, int id) {
    for (int i = 0; i < lib->count; i++) {
        if (lib->books[i].id == id) return i;
    }
    return -1;
}

int add_book(Library *lib, const char *title, const char *author) {
    if (lib->count == MAX_BOOKS) return -1;
    Book *b = &lib->books[lib->count++];
    b->id = lib->next_id++;
    snprintf(b->title, sizeof b->title, "%s", title);
    snprintf(b->author, sizeof b->author, "%s", author);
    b->borrowed = 0;
    return b->id;
}

int borrow_book(Library *lib, int id) {
    int i = find_index(lib, id);
    if (i < 0) return LIB_NO_SUCH_BOOK;
    if (lib->books[i].borrowed) return LIB_ALREADY_BORROWED;
    lib->books[i].borrowed = 1;
    return LIB_OK;
}

int return_book(Library *lib, int id) {
    int i = find_index(lib, id);
    if (i < 0) return LIB_NO_SUCH_BOOK;
    if (!lib->books[i].borrowed) return LIB_NOT_BORROWED;
    lib->books[i].borrowed = 0;
    return LIB_OK;
}

void list_books(const Library *lib) {
    for (int i = 0; i < lib->count; i++) {
        const Book *b = &lib->books[i];
        printf("%d. %s by %s (%s)\\n", b->id, b->title, b->author, b->borrowed ? "borrowed" : "available");
    }
}

int main(void) {
    Library lib = {.count = 0, .next_id = 1};
    char line[128];
    char title[48], author[32];
    int id;

    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';

        if (strncmp(line, "add ", 4) == 0 &&
            sscanf(line + 4, "%47[^|]|%31[^\\n]", title, author) == 2) {
            int new_id = add_book(&lib, title, author);
            if (new_id > 0) printf("added book %d: %s\\n", new_id, title);
        } else if (sscanf(line, "borrow %d", &id) == 1) {
            int status = borrow_book(&lib, id);
            if (status == LIB_OK) printf("borrowed book %d\\n", id);
            else if (status == LIB_ALREADY_BORROWED) printf("error: book %d is already borrowed\\n", id);
            else printf("error: no book %d\\n", id);
        } else if (sscanf(line, "return %d", &id) == 1) {
            int status = return_book(&lib, id);
            if (status == LIB_OK) printf("returned book %d\\n", id);
            else if (status == LIB_NOT_BORROWED) printf("error: book %d is not borrowed\\n", id);
            else printf("error: no book %d\\n", id);
        } else if (strcmp(line, "list") == 0) {
            list_books(&lib);
        } else if (strcmp(line, "quit") == 0) {
            break;
        }
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Adds books with titles containing spaces",
              outputIncludes: ["added book 1: The C Programming Language", "added book 2: Clean Code"],
              hint: "sscanf(line + 4, \"%47[^|]|%31[^\\n]\", title, author)",
            },
            {
              id: "t2",
              label: "Enforces the borrowing rules",
              outputIncludes: ["borrowed book 1", "error: book 1 is already borrowed", "error: book 2 is not borrowed", "returned book 1"],
              hint: "Check the borrowed flag before changing it.",
            },
            {
              id: "t3",
              label: "Handles every command in order",
              expectedOutput: "added book 1: The C Programming Language\nadded book 2: Clean Code\nborrowed book 1\nerror: book 1 is already borrowed\nerror: book 2 is not borrowed\nreturned book 1\nborrowed book 2\n1. The C Programming Language by Kernighan (available)\n2. Clean Code by Martin (borrowed)",
              hint: "list prints each book as \"ID. TITLE by AUTHOR (status)\".",
            },
            {
              id: "t4",
              label: "Core functions take the Library and return status codes",
              keywords: [
                { pattern: "\\bint\\s+borrow_book\\s*\\(\\s*Library\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\bint\\s+return_book\\s*\\(\\s*Library\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\breturn\\s+LIB_ALREADY_BORROWED\\s*;" },
                { pattern: "\\breturn\\s+LIB_NOT_BORROWED\\s*;" },
              ],
              hint: "borrow_book and return_book return an enum LibStatus value.",
            },
          ],
        },
      },
      {
        id: "c_projects-4-2",
        title: "Polish & Edge Cases",
        xp: 30,
        chapterTitle: "Capstone Project",
        theory: [
          text(
            "A program that works on good input is only half finished. **Polish** means handling everything else gracefully: empty lines, unknown commands, missing arguments, ids that aren't numbers, and finishing with a clean summary. Real users find every path you forgot, so this is where a project becomes dependable.",
          ),
          text(
            "Common edge cases and how to handle them:\n\n- **Empty lines:** ignore them.\n- **Unknown commands:** name the command in the error, so the user sees what was typed.\n- **Missing parts:** `add` without a `|` should explain the expected format.\n- **Empty values:** an empty title is technically parsed but meaningless, so reject it.\n- **Non-numeric ids:** parse with `strtol` and check that the whole argument was a number, instead of `atoi`, which silently turns `abc` into 0.",
            {
              label: "Strict number parsing with strtol",
              content: `#include <stdio.h>
#include <stdlib.h>

// Returns 1 and stores the value if text is a whole number, else 0.
int parse_id(const char *text, int *out) {
    char *end;
    long value = strtol(text, &end, 10);
    if (end == text || *end != '\\0' || value <= 0) {
        return 0;
    }
    *out = (int)value;
    return 1;
}

int main(void) {
    const char *inputs[4] = {"42", "abc", "7x", "-3"};
    int id;
    for (int i = 0; i < 4; i++) {
        printf("\\"%s\\": %s\\n", inputs[i], parse_id(inputs[i], &id) ? "valid id" : "not a valid id");
    }
    return 0;
}`,
            },
          ),
          text(
            "Finish with a **clean exit**: when the user quits, or the input ends, print a short summary such as the number of books and how many are on loan. A clear ending tells the user the program closed on purpose.",
          ),
          callout(
            "tip",
            "Write the edge cases as input lines before you fix them, exactly like this challenge's test input. When every line produces the right message, the polishing is done.",
          ),
          quiz(
            "Why is `strtol` with an end-pointer check better than `atoi` for reading an id?",
            ["It is shorter", "atoi returns 0 for \"abc\" with no way to tell it failed; strtol shows where parsing stopped", "atoi can't read numbers", "strtol rounds the number"],
            1,
            "With strtol you can confirm the whole argument was a number and reject inputs like abc or 7x.",
          ),
          quiz(
            "What should the program do with a line containing only spaces?",
            ["Crash", "Report an unknown command", "Ignore it quietly", "Quit"],
            2,
            "Blank lines are harmless, so the friendliest behaviour is to skip them.",
          ),
        ],
        challenge: {
          instructions:
            "Harden the library: ignore blank lines, reject an empty title, explain the add format when | is missing, use strtol to reject non-numeric ids, report unknown commands by name, add search TEXT (by author), and print a summary on quit.",
          stdin: "add Refactoring|Fowler\nadd |NoTitle\nadd Missing Author\nborrow abc\nborrow 7\n\nfrobnicate\nborrow 1\nsearch Fowler\nquit\n",
          description: task(
            "The starter is a working but fragile version of the library. Make it robust:\n\n- Ignore blank lines.\n- `add` without a `|` prints `error: use add TITLE|AUTHOR`; an empty title prints `error: title can't be empty`.\n- `borrow` with an id that isn't a positive whole number prints `error: book id must be a number` (use `strtol`, not `atoi`); an unknown id prints `error: no book N`.\n- `search TEXT` prints every book whose author contains TEXT as `found: ...`.\n- Any other command prints `error: unknown command 'WORD'`.\n- `quit` prints a summary: `bye: N book(s), M borrowed`.",
            "added book 1: Refactoring\nerror: title can't be empty\nerror: use add TITLE|AUTHOR\nerror: book id must be a number\nerror: no book 7\nerror: unknown command 'frobnicate'\nborrowed book 1\nfound: 1. Refactoring by Fowler (borrowed)\nbye: 1 book(s), 1 borrowed",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_BOOKS 10

${BOOK_STRUCT}

typedef struct {
    Book books[MAX_BOOKS];
    int count;
    int next_id;
} Library;

void print_book(const Book *b) {
    printf("%d. %s by %s (%s)\\n", b->id, b->title, b->author, b->borrowed ? "borrowed" : "available");
}

int main(void) {
    Library lib = {.count = 0, .next_id = 1};
    char line[128];

    // A working but fragile version: make every command robust (see the task)
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        if (strncmp(line, "add ", 4) == 0) {
            Book *b = &lib.books[lib.count++];
            b->id = lib.next_id++;
            sscanf(line + 4, "%47[^|]|%31[^\\n]", b->title, b->author);
            b->borrowed = 0;
            printf("added book %d: %s\\n", b->id, b->title);
        } else if (strncmp(line, "borrow ", 7) == 0) {
            int id = atoi(line + 7);
            for (int i = 0; i < lib.count; i++) {
                if (lib.books[i].id == id) lib.books[i].borrowed = 1;
            }
            printf("borrowed book %d\\n", id);
        } else if (strcmp(line, "quit") == 0) {
            break;
        }
    }
    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_BOOKS 10

${BOOK_STRUCT}

typedef struct {
    Book books[MAX_BOOKS];
    int count;
    int next_id;
} Library;

void print_book(const Book *b) {
    printf("%d. %s by %s (%s)\\n", b->id, b->title, b->author, b->borrowed ? "borrowed" : "available");
}

int parse_id(const char *text, int *out) {
    char *end;
    long value = strtol(text, &end, 10);
    if (end == text || *end != '\\0' || value <= 0) return 0;
    *out = (int)value;
    return 1;
}

Book *find_book(Library *lib, int id) {
    for (int i = 0; i < lib->count; i++) {
        if (lib->books[i].id == id) return &lib->books[i];
    }
    return NULL;
}

int is_blank(const char *s) {
    while (*s == ' ' || *s == '\\t') s++;
    return *s == '\\0';
}

void handle_add(Library *lib, const char *args) {
    if (strchr(args, '|') == NULL) {
        printf("error: use add TITLE|AUTHOR\\n");
        return;
    }
    if (args[0] == '|') {
        printf("error: title can't be empty\\n");
        return;
    }
    if (lib->count == MAX_BOOKS) {
        printf("error: the library is full\\n");
        return;
    }
    char title[48], author[32] = "";
    if (sscanf(args, "%47[^|]|%31[^\\n]", title, author) < 1) {
        printf("error: use add TITLE|AUTHOR\\n");
        return;
    }
    Book *b = &lib->books[lib->count++];
    b->id = lib->next_id++;
    snprintf(b->title, sizeof b->title, "%s", title);
    snprintf(b->author, sizeof b->author, "%s", author);
    b->borrowed = 0;
    printf("added book %d: %s\\n", b->id, b->title);
}

void handle_borrow(Library *lib, const char *args) {
    int id;
    if (!parse_id(args, &id)) {
        printf("error: book id must be a number\\n");
        return;
    }
    Book *b = find_book(lib, id);
    if (b == NULL) {
        printf("error: no book %d\\n", id);
    } else if (b->borrowed) {
        printf("error: book %d is already borrowed\\n", id);
    } else {
        b->borrowed = 1;
        printf("borrowed book %d\\n", id);
    }
}

void handle_search(const Library *lib, const char *text) {
    int found = 0;
    for (int i = 0; i < lib->count; i++) {
        if (strstr(lib->books[i].author, text) != NULL) {
            printf("found: ");
            print_book(&lib->books[i]);
            found++;
        }
    }
    if (!found) printf("no books by %s\\n", text);
}

int main(void) {
    Library lib = {.count = 0, .next_id = 1};
    char line[128];

    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        if (is_blank(line)) {
            continue;
        }
        if (strncmp(line, "add ", 4) == 0) {
            handle_add(&lib, line + 4);
        } else if (strncmp(line, "borrow ", 7) == 0) {
            handle_borrow(&lib, line + 7);
        } else if (strncmp(line, "search ", 7) == 0) {
            handle_search(&lib, line + 7);
        } else if (strcmp(line, "quit") == 0) {
            break;
        } else {
            char word[32];
            sscanf(line, "%31s", word);
            printf("error: unknown command '%s'\\n", word);
        }
    }

    int borrowed = 0;
    for (int i = 0; i < lib.count; i++) {
        if (lib.books[i].borrowed) borrowed++;
    }
    printf("bye: %d book(s), %d borrowed\\n", lib.count, borrowed);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Validates the add command",
              outputIncludes: ["added book 1: Refactoring", "error: title can't be empty", "error: use add TITLE|AUTHOR"],
              hint: "Check for a missing | and for an empty title before adding.",
            },
            {
              id: "t2",
              label: "Validates borrow ids and unknown commands",
              outputIncludes: ["error: book id must be a number", "error: no book 7", "error: unknown command 'frobnicate'"],
              hint: "Use strtol and check the end pointer; anything unrecognised is an unknown command.",
            },
            {
              id: "t3",
              label: "Searches, ignores the blank line, and prints the summary",
              outputIncludes: ["found: 1. Refactoring by Fowler (borrowed)", "bye: 1 book(s), 1 borrowed"],
              hint: "Skip blank lines before dispatching; print the summary after the loop.",
            },
            {
              id: "t4",
              label: "Handles every line in order",
              expectedOutput: "added book 1: Refactoring\nerror: title can't be empty\nerror: use add TITLE|AUTHOR\nerror: book id must be a number\nerror: no book 7\nerror: unknown command 'frobnicate'\nborrowed book 1\nfound: 1. Refactoring by Fowler (borrowed)\nbye: 1 book(s), 1 borrowed",
              hint: "Every input line except the blank one produces exactly one message.",
            },
            {
              id: "t5",
              label: "Parses ids with strtol instead of atoi",
              keywords: [
                { pattern: "\\bstrtol\\s*\\(" },
                { pattern: "^(?![\\s\\S]*\\batoi\\s*\\()" },
                { pattern: "\\bstrstr\\s*\\(" },
              ],
              hint: "Replace atoi with strtol and check that the whole argument was read.",
            },
          ],
        },
      },
    ],
  },
];

export const C_PROJECTS_LESSONS = C_PROJECTS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({ ...l, chapterTitle: l.chapterTitle || ch.title }))
);

export const C_PROJECTS_TOTAL_XP = 290;

applyLessonVideoLinks(C_PROJECTS_LESSONS, C_PROJECTS_VIDEO_LINKS);
