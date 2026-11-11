// PolyCode — C Memory Management interactive course
// 5 chapters · 15 lessons · C challenges graded on real program output
// YouTube links: edit c_memory_managementVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { C_MEMORY_MANAGEMENT_VIDEO_LINKS } from "./c_memory_managementVideoLinks";

const ACCENT = "#8e44ad";

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

export const C_MEMORY_MANAGEMENT_CHAPTERS = [
  {
    id: "ch-0",
    title: "Memory Layout",
    icon: "🗺️",
    color: ACCENT,
    lessons: [
      {
        id: "c_memory_management-0-0",
        title: "Stack vs Heap",
        xp: 10,
        chapterTitle: "Memory Layout",
        theory: [
          text(
            "A running C program keeps its data in two main regions: the **stack** and the **heap**. Knowing which one a value lives in tells you how long it lasts, how big it can be, and who is responsible for cleaning it up. Most memory bugs in C come from mixing these up.",
          ),
          text(
            "The **stack** holds a function's local variables. Each call gets a **stack frame** that is created when the function starts and thrown away automatically when it returns. It is very fast, but small (often 1–8 MB) and its contents vanish with the function.\n\nThe **heap** is a large pool you request from explicitly with `malloc`. Heap memory stays alive until **you** release it with `free`, even after the function that created it returns.",
            {
              label: "A stack variable and a heap block",
              content: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int on_stack = 10;                       // freed automatically
    int *on_heap = malloc(sizeof(int));      // lives until free()

    if (on_heap == NULL) {
        return 1;
    }
    *on_heap = 20;

    printf("stack value: %d\\n", on_stack);
    printf("heap value: %d\\n", *on_heap);

    free(on_heap);                           // our job, not automatic
    return 0;
}`,
            },
          ),
          diagram("Stack vs heap", [
            {
              id: "stack",
              label: "Stack",
              color: ACCENT,
              items: ["Local variables and parameters", "Created and freed automatically", "Small and very fast", "Gone when the function returns"],
            },
            {
              id: "heap",
              label: "Heap",
              color: "#3b82f6",
              items: ["Requested with malloc / calloc", "Freed only by free()", "Large, size chosen at runtime", "Outlives the function that made it"],
            },
          ]),
          text(
            "This is why a function can return heap memory but not stack memory. The heap block below is still valid in `main` after `make_numbers` has returned, and `main` takes over the job of freeing it.",
            {
              label: "Returning heap memory from a function",
              content: `#include <stdio.h>
#include <stdlib.h>

int *make_numbers(int n) {
    int *numbers = malloc(n * sizeof(int));
    if (numbers == NULL) {
        return NULL;
    }
    for (int i = 0; i < n; i++) {
        numbers[i] = (i + 1) * 10;
    }
    return numbers;          // safe: heap memory survives the return
}

int main(void) {
    int *nums = make_numbers(3);
    if (nums == NULL) {
        return 1;
    }
    printf("%d %d %d\\n", nums[0], nums[1], nums[2]);
    free(nums);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Large local arrays such as `int big[10000000];` can overflow the small stack and crash the program. Put big or variable-sized data on the heap.",
          ),
          quiz(
            "Where does a local variable inside a function live?",
            ["On the heap", "On the stack", "In the BSS segment", "In the code segment"],
            1,
            "Locals live in the function's stack frame and disappear automatically when the function returns.",
          ),
          quiz(
            "Who frees memory obtained with `malloc`?",
            ["The compiler, at the end of the block", "The operating system, when the function returns", "The programmer, by calling free", "Nobody; it can't be freed"],
            2,
            "Heap memory stays allocated until free is called. Forgetting to call it causes a memory leak.",
          ),
        ],
        challenge: {
          instructions:
            "Write int stack_sum(void) that sums a local int array {1, 2, 3, 4, 5}, and int *make_sequence(int n) that returns a heap array holding 1..n. Print stack sum: 15, the 8 heap values, then free the block and print heap block freed.",
          description: task(
            "Write `int stack_sum(void)` that adds up a **local** array `{1, 2, 3, 4, 5}`, and `int *make_sequence(int n)` that allocates `n` ints on the **heap** with `malloc`, fills them with 1 to n and returns the pointer. In `main`, print the stack sum, print the 8 values from `make_sequence(8)`, then `free` the block and print `heap block freed`.",
            "stack sum: 15\nheap values: 1 2 3 4 5 6 7 8\nheap block freed",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

// Write stack_sum and make_sequence here


int main(void) {
    // Print the stack sum
    // Get 8 values from the heap, print them, free them, print "heap block freed"

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

int stack_sum(void) {
    int values[5] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += values[i];
    }
    return sum;
}

int *make_sequence(int n) {
    int *seq = malloc(n * sizeof(int));
    if (seq == NULL) {
        return NULL;
    }
    for (int i = 0; i < n; i++) {
        seq[i] = i + 1;
    }
    return seq;
}

int main(void) {
    printf("stack sum: %d\\n", stack_sum());

    int *seq = make_sequence(8);
    if (seq == NULL) {
        return 1;
    }
    printf("heap values:");
    for (int i = 0; i < 8; i++) {
        printf(" %d", seq[i]);
    }
    printf("\\n");

    free(seq);
    printf("heap block freed\\n");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the stack sum and the heap values",
              outputIncludes: ["stack sum: 15", "heap values: 1 2 3 4 5 6 7 8"],
              hint: "make_sequence fills seq[i] = i + 1 for i from 0 to n - 1.",
            },
            {
              id: "t2",
              label: "Prints all three lines",
              expectedOutput: "stack sum: 15\nheap values: 1 2 3 4 5 6 7 8\nheap block freed",
              hint: "Call free before printing heap block freed.",
            },
            {
              id: "t3",
              label: "make_sequence uses malloc and main frees the block",
              keywords: [
                { pattern: "\\bint\\s*\\*\\s*make_sequence\\s*\\(\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\bmalloc\\s*\\(" },
                { pattern: "\\bfree\\s*\\(" },
              ],
              hint: "int *seq = malloc(n * sizeof(int)); ... free(seq);",
            },
          ],
        },
      },
      {
        id: "c_memory_management-0-1",
        title: "Code, Data, BSS Segments",
        xp: 10,
        chapterTitle: "Memory Layout",
        theory: [
          text(
            "Besides the stack and the heap, a program's memory has fixed **segments** that are set up before `main` even starts. Knowing them explains why globals keep their values, why uninitialised globals are zero, and why string literals are read-only.",
          ),
          diagram("A program's memory, from low to high addresses", [
            { id: "text", label: "Code (text)", color: "#64748b", items: ["The compiled machine code", "Read-only", "String literals usually nearby"] },
            { id: "data", label: "Data", color: "#22c55e", items: ["Globals and statics with a starting value", "int version = 2;"] },
            { id: "bss", label: "BSS", color: "#3b82f6", items: ["Globals and statics without a value", "Automatically filled with zeros", "int buffer[100];"] },
            { id: "heap", label: "Heap", color: ACCENT, items: ["malloc / free", "Grows as you allocate"] },
            { id: "stack", label: "Stack", color: "#f97316", items: ["Locals and calls", "Grows and shrinks with calls"] },
          ]),
          text(
            "Global and `static` variables live for the whole program. If you give them a value they go into the **data** segment. If you don't, they go into **BSS**, which is guaranteed to start as all zeros. Local variables on the stack get **no** such guarantee.",
            {
              label: "Data, BSS and static locals",
              content: `#include <stdio.h>

int version = 2;          // data segment: has a starting value
int counters[5];          // BSS: guaranteed to be all zeros

int next_visit(void) {
    static int visits;    // static local: also BSS, starts at 0
    return ++visits;
}

int main(void) {
    printf("version = %d\\n", version);
    printf("counters[3] = %d\\n", counters[3]);
    next_visit();
    printf("visit number %d\\n", next_visit());
    return 0;
}`,
            },
          ),
          text(
            "Why have BSS at all? A large zero-filled global costs almost nothing in the executable file: the program only records \"reserve this many bytes of zeros\". An initialised global must store every value in the file.",
          ),
          callout(
            "warning",
            "Only globals and statics start at zero. A local such as `int total;` inside a function holds garbage until you assign it, so always initialise locals.",
          ),
          quiz(
            "Which segment holds `int scores[100];` declared outside every function?",
            ["Stack", "Heap", "BSS", "Code"],
            2,
            "It is a global with no initialiser, so it goes into BSS and starts filled with zeros.",
          ),
          quiz(
            "What is the starting value of `static int count;` inside a function?",
            ["Garbage", "0", "1", "It doesn't compile"],
            1,
            "Static variables live in data/BSS like globals. Without an initialiser they start at 0, unlike normal locals.",
          ),
        ],
        challenge: {
          instructions:
            "Use an initialised global int config_version = 2 (data), an uninitialised global int readings[100] (BSS) and a static local counter in int record_visit(void). Print config version: 2, readings sum: 0 and visits: 3.",
          description: task(
            "Declare a global `int config_version = 2;` (data segment) and a global `int readings[100];` **without** an initialiser (BSS). Write `int record_visit(void)` that counts its calls with a `static int` local and returns the count. In `main`, print the version, the sum of all 100 readings (proving BSS starts at zero), then call `record_visit` three times and print the last result.",
            "config version: 2\nreadings sum: 0\nvisits: 3",
          ),
          starterCode: `#include <stdio.h>

// Declare config_version (data) and readings (BSS) here

// Write record_visit with a static counter here


int main(void) {
    // Print the version, the sum of readings, then the visits after 3 calls

    return 0;
}`,
          solution: `#include <stdio.h>

int config_version = 2;
int readings[100];

int record_visit(void) {
    static int visits;
    visits++;
    return visits;
}

int main(void) {
    printf("config version: %d\\n", config_version);

    int sum = 0;
    for (int i = 0; i < 100; i++) {
        sum += readings[i];
    }
    printf("readings sum: %d\\n", sum);

    record_visit();
    record_visit();
    printf("visits: %d\\n", record_visit());
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the version, the zero sum and the visit count",
              expectedOutput: "config version: 2\nreadings sum: 0\nvisits: 3",
              hint: "Sum all 100 readings in a loop; call record_visit three times.",
            },
            {
              id: "t2",
              label: "Uses an initialised global, an uninitialised global array and a static local",
              keywords: [
                { pattern: "^int\\s+config_version\\s*=\\s*2\\s*;", flags: "m" },
                { pattern: "^int\\s+readings\\s*\\[\\s*100\\s*\\]\\s*;", flags: "m" },
                { pattern: "\\brecord_visit\\s*\\(\\s*(void)?\\s*\\)\\s*\\{[^}]*\\bstatic\\s+int\\b" },
              ],
              hint: "int readings[100]; has no = { ... }, so it lives in BSS.",
            },
          ],
        },
      },
      {
        id: "c_memory_management-0-2",
        title: "Memory Addresses",
        xp: 10,
        chapterTitle: "Memory Layout",
        theory: [
          text(
            "Memory is a long row of bytes, each with a numbered **address**. Printing addresses with `%p` shows where things live, and comparing them reveals how C lays out your data: arrays are packed side by side, and structs may contain hidden **padding**.",
          ),
          text(
            "`%p` expects a `void *`, so cast other pointers to `(void *)` when printing. Addresses change from run to run, so look at the **differences** between them rather than the numbers themselves.",
            {
              label: "Printing addresses with %p",
              content: `#include <stdio.h>

int main(void) {
    int a = 1;
    double b = 2.0;
    int values[3] = {7, 8, 9};

    printf("&a         = %p\\n", (void *)&a);
    printf("&b         = %p\\n", (void *)&b);
    printf("&values[0] = %p\\n", (void *)&values[0]);
    printf("&values[1] = %p\\n", (void *)&values[1]);
    return 0;
}`,
            },
          ),
          text(
            "Array elements are always **contiguous**: the gap between neighbours is exactly `sizeof` the element type. Struct members are in the order you declare them, but the compiler may insert padding so that each member starts at an address its type prefers. `offsetof` from `<stddef.h>` tells you where each member begins.",
            {
              label: "Contiguous arrays and struct padding",
              content: `#include <stdio.h>
#include <stddef.h>

struct Record {
    char flag;      // 1 byte
    int count;      // 4 bytes, but usually starts at offset 4
};

int main(void) {
    short nums[3];
    printf("gap between shorts: %d bytes\\n",
           (int)((char *)&nums[1] - (char *)&nums[0]));

    printf("offset of flag: %zu\\n", offsetof(struct Record, flag));
    printf("offset of count: %zu\\n", offsetof(struct Record, count));
    printf("sizeof(struct Record): %zu\\n", sizeof(struct Record));
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Ordering struct members from largest to smallest type usually reduces padding, which matters when you store millions of structs.",
          ),
          quiz(
            "In `double d[4]`, how many bytes apart are `&d[1]` and `&d[2]`?",
            ["1", "4", "8", "It changes every run"],
            2,
            "Array elements are contiguous, so neighbours are sizeof(double) = 8 bytes apart. Only the absolute addresses change between runs.",
          ),
          quiz(
            "Why can `sizeof(struct { char c; int n; })` be 8 instead of 5?",
            [
              "The compiler stores the struct twice",
              "The compiler adds padding so n starts at an address that suits an int",
              "char always takes 4 bytes",
              "sizeof counts in bits",
            ],
            1,
            "3 padding bytes after c let n start at offset 4. The struct's size is then 8.",
          ),
        ],
        challenge: {
          instructions:
            "For double samples[4], print the byte gap between each pair of neighbours (8 bytes each). For struct Pixel { char tag; int value; }, print the offset of value (4) and sizeof(struct Pixel) (8).",
          description: task(
            "Prove the layout rules. For `double samples[4]`, print the gap in bytes between each element and the next (cast the addresses to `char *` and subtract). Then define `struct Pixel { char tag; int value; }` and print `offsetof(struct Pixel, value)` and `sizeof(struct Pixel)` with `%zu`.",
            "gap 0->1: 8 bytes\ngap 1->2: 8 bytes\ngap 2->3: 8 bytes\noffset of value: 4\nsizeof(struct Pixel): 8",
          ),
          starterCode: `#include <stdio.h>
#include <stddef.h>

// Define struct Pixel here


int main(void) {
    double samples[4];

    // Print the gap in bytes between each element and the next

    // Print the offset of value and the size of struct Pixel

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stddef.h>

struct Pixel {
    char tag;
    int value;
};

int main(void) {
    double samples[4];

    for (int i = 0; i < 3; i++) {
        int gap = (int)((char *)&samples[i + 1] - (char *)&samples[i]);
        printf("gap %d->%d: %d bytes\\n", i, i + 1, gap);
    }

    printf("offset of value: %zu\\n", offsetof(struct Pixel, value));
    printf("sizeof(struct Pixel): %zu\\n", sizeof(struct Pixel));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Measures the gaps between array elements",
              outputIncludes: ["gap 0->1: 8 bytes", "gap 1->2: 8 bytes", "gap 2->3: 8 bytes"],
              hint: "(char *)&samples[i + 1] - (char *)&samples[i] gives the gap in bytes.",
            },
            {
              id: "t2",
              label: "Prints the struct offset and size",
              expectedOutput: "gap 0->1: 8 bytes\ngap 1->2: 8 bytes\ngap 2->3: 8 bytes\noffset of value: 4\nsizeof(struct Pixel): 8",
              hint: "offsetof(struct Pixel, value) and sizeof(struct Pixel), printed with %zu.",
            },
            {
              id: "t3",
              label: "Computes the values instead of typing them",
              keywords: [
                { pattern: "\\(\\s*char\\s*\\*\\s*\\)" },
                { pattern: "\\boffsetof\\s*\\(\\s*struct\\s+Pixel\\s*,\\s*value\\s*\\)" },
                { pattern: "\\bsizeof\\s*\\(\\s*struct\\s+Pixel\\s*\\)" },
              ],
              hint: "Use the (char *) cast, offsetof and sizeof.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-1",
    title: "Dynamic Allocation",
    icon: "💾",
    color: ACCENT,
    lessons: [
      {
        id: "c_memory_management-1-0",
        title: "malloc — allocate memory",
        xp: 15,
        chapterTitle: "Dynamic Allocation",
        theory: [
          text(
            "Arrays on the stack need their size when you write the code. Often you only find out at runtime how much data there is: a user types how many scores they have, or a file has unknown length. `malloc` (from `<stdlib.h>`) asks for a block of heap memory of any size while the program runs.",
          ),
          text(
            "`malloc(bytes)` returns a pointer to the start of a new block, or `NULL` if it couldn't get one. Always compute the size with `sizeof`: `malloc(n * sizeof(int))` for n ints, or `malloc(n * sizeof *p)`, which stays correct if p's type changes. The block can then be used exactly like an array.",
            {
              label: "An array whose size comes from the input (input: 4)",
              stdin: "4",
              content: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    scanf("%d", &n);

    int *squares = malloc(n * sizeof *squares);
    if (squares == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        squares[i] = i * i;
    }
    for (int i = 0; i < n; i++) {
        printf("%d ", squares[i]);
    }
    printf("\\n");

    free(squares);
    return 0;
}`,
            },
          ),
          text(
            "`malloc` returns a `void *`, a pointer with no type, which converts automatically to any pointer type in C (no cast needed). The memory it gives you is **not initialised**: it contains whatever was there before, so write every element before reading it.",
            {
              label: "Allocating a struct",
              content: `#include <stdio.h>
#include <stdlib.h>

struct Point {
    double x, y;
};

int main(void) {
    struct Point *p = malloc(sizeof *p);
    if (p == NULL) {
        return 1;
    }
    p->x = 1.5;
    p->y = -2.0;
    printf("(%.1f, %.1f)\\n", p->x, p->y);
    free(p);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "`malloc(n)` allocates n **bytes**, not n elements. `malloc(10)` is room for only two 4-byte ints. Always multiply by `sizeof`.",
          ),
          quiz(
            "Which call allocates space for 50 doubles?",
            ["malloc(50)", "malloc(50 * sizeof(double))", "malloc(sizeof(50))", "malloc(double[50])"],
            1,
            "malloc counts bytes, so multiply the element count by sizeof(double).",
          ),
          quiz(
            "What does a newly malloc'd block contain?",
            ["All zeros", "Unpredictable leftover values", "The value 1", "NULL"],
            1,
            "malloc doesn't clear memory. Use calloc if you need zeros, or fill the block yourself.",
          ),
        ],
        challenge: {
          instructions:
            "Read a count n and then n integers from the input (5, then 4 8 15 16 23) into a malloc'd array. Print them reversed and their average with 2 decimals, then free the array.",
          stdin: "5\n4 8 15 16 23",
          description: task(
            "The input is a count followed by that many numbers (the test gives `5`, then `4 8 15 16 23`). Read the count, allocate exactly that many ints with `malloc`, read the numbers into the block, then print them in reverse order and their average with 2 decimals. Check for NULL after `malloc` and `free` the block at the end.",
            "reversed: 23 16 15 8 4\naverage: 13.20",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    scanf("%d", &n);

    // Allocate n ints, check for NULL, read the n numbers

    // Print them reversed, then the average

    // Free the block

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    scanf("%d", &n);

    int *values = malloc(n * sizeof *values);
    if (values == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        scanf("%d", &values[i]);
    }

    int sum = 0;
    printf("reversed:");
    for (int i = n - 1; i >= 0; i--) {
        printf(" %d", values[i]);
        sum += values[i];
    }
    printf("\\n");
    printf("average: %.2f\\n", (double)sum / n);

    free(values);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the numbers in reverse",
              outputIncludes: "reversed: 23 16 15 8 4",
              hint: "Loop from n - 1 down to 0.",
            },
            {
              id: "t2",
              label: "Prints the average",
              expectedOutput: "reversed: 23 16 15 8 4\naverage: 13.20",
              hint: "Cast the sum to double before dividing by n.",
            },
            {
              id: "t3",
              label: "Allocates n elements with malloc, checks NULL and frees",
              keywords: [
                { pattern: "\\bmalloc\\s*\\(\\s*n\\s*\\*\\s*sizeof" },
                { pattern: "==\\s*NULL|NULL\\s*==|!\\s*\\w+\\s*\\)" },
                { pattern: "\\bfree\\s*\\(" },
              ],
              hint: "int *values = malloc(n * sizeof *values); if (values == NULL) ... free(values);",
            },
          ],
        },
      },
      {
        id: "c_memory_management-1-1",
        title: "free — release memory",
        xp: 15,
        chapterTitle: "Dynamic Allocation",
        theory: [
          text(
            "Every block you get from `malloc`, `calloc` or `realloc` must be given back with `free` exactly once when you no longer need it. C has no garbage collector: if you don't free memory, it stays reserved until the program exits.",
          ),
          text(
            "The rules of `free`:\n\n- Pass the **same pointer** the allocator returned, not a pointer into the middle of the block.\n- Free each block **exactly once**. Freeing twice (a **double free**) corrupts the heap.\n- After `free(p)`, the memory no longer belongs to you. Don't read or write through `p` again.\n- `free(NULL)` is allowed and does nothing.",
            {
              label: "Allocate, use, free",
              content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char *message = malloc(32);
    if (message == NULL) {
        return 1;
    }
    strcpy(message, "temporary text");
    printf("%s\\n", message);

    free(message);        // give it back
    message = NULL;       // and forget the old address

    free(message);        // free(NULL) is a harmless no-op
    printf("done\\n");
    return 0;
}`,
            },
          ),
          text(
            "Think in terms of **ownership**: whoever holds the pointer is responsible for freeing it. A function that returns a heap block hands that responsibility to its caller, so document it, as with `duplicate` below (the standard library has the same function, `strdup`).",
            {
              label: "A function that returns memory the caller must free",
              content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Returns a heap copy of s. The caller must free it.
char *duplicate(const char *s) {
    char *copy = malloc(strlen(s) + 1);   // +1 for the '\\0'
    if (copy != NULL) {
        strcpy(copy, s);
    }
    return copy;
}

int main(void) {
    char *name = duplicate("Grace");
    if (name == NULL) {
        return 1;
    }
    printf("%s\\n", name);
    free(name);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Forgetting the `+ 1` for the terminator when copying a string is a classic bug: the copy writes one byte past the end of the block.",
          ),
          quiz(
            "Which call is always safe, even if it is made twice in a row?",
            ["free(p) on a malloc'd p", "free(NULL)", "free(&local_variable)", "free(p + 1)"],
            1,
            "free(NULL) does nothing. Freeing a block twice, freeing stack memory or freeing a pointer into the middle of a block are all undefined behaviour.",
          ),
          quiz(
            "`char *copy = malloc(strlen(s));` then `strcpy(copy, s);` What is wrong?",
            ["Nothing", "There is no room for the '\\0' terminator", "strcpy can't copy to the heap", "malloc needs a cast"],
            1,
            "strlen doesn't count the terminator, so the block is one byte too small. Allocate strlen(s) + 1.",
          ),
        ],
        challenge: {
          instructions:
            "Write char *duplicate(const char *s) that returns a heap copy (strlen + 1). Copy the three words alpha, beta and gamma, capitalise each copy's first letter, print original and copy for each, then free all three copies and print freed 3 copies.",
          description: task(
            "Write `char *duplicate(const char *s)` that allocates `strlen(s) + 1` bytes, copies `s` into them and returns the copy. In `main`, duplicate each of the three words in `words`, change the first letter of each **copy** to uppercase (the originals must not change), print both, then `free` every copy and print how many were freed.",
            "original: alpha, copy: Alpha\noriginal: beta, copy: Beta\noriginal: gamma, copy: Gamma\nfreed 3 copies",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Write duplicate here


int main(void) {
    const char *words[3] = {"alpha", "beta", "gamma"};
    char *copies[3];

    // Duplicate each word, uppercase the copy's first letter, print both

    // Free every copy, then print how many were freed

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *duplicate(const char *s) {
    char *copy = malloc(strlen(s) + 1);
    if (copy != NULL) {
        strcpy(copy, s);
    }
    return copy;
}

int main(void) {
    const char *words[3] = {"alpha", "beta", "gamma"};
    char *copies[3];

    for (int i = 0; i < 3; i++) {
        copies[i] = duplicate(words[i]);
        if (copies[i] == NULL) {
            return 1;
        }
        copies[i][0] = copies[i][0] - 32;
        printf("original: %s, copy: %s\\n", words[i], copies[i]);
    }

    int freed = 0;
    for (int i = 0; i < 3; i++) {
        free(copies[i]);
        freed++;
    }
    printf("freed %d copies\\n", freed);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Copies are changed but the originals aren't",
              outputIncludes: ["original: alpha, copy: Alpha", "original: gamma, copy: Gamma"],
              hint: "Change copies[i][0], never words[i].",
            },
            {
              id: "t2",
              label: "Prints all lines and frees 3 copies",
              expectedOutput: "original: alpha, copy: Alpha\noriginal: beta, copy: Beta\noriginal: gamma, copy: Gamma\nfreed 3 copies",
              hint: "Call free(copies[i]) for each copy.",
            },
            {
              id: "t3",
              label: "duplicate allocates strlen + 1 and the copies are freed",
              keywords: [
                { pattern: "\\bmalloc\\s*\\(\\s*strlen\\s*\\(\\s*\\w+\\s*\\)\\s*\\+\\s*1\\s*\\)" },
                { pattern: "\\bfree\\s*\\(\\s*copies\\s*\\[" },
              ],
              hint: "malloc(strlen(s) + 1) and free(copies[i]) in a loop.",
            },
          ],
        },
      },
      {
        id: "c_memory_management-1-2",
        title: "NULL check after malloc",
        xp: 15,
        chapterTitle: "Dynamic Allocation",
        theory: [
          text(
            "`malloc` can fail. When the system can't provide the requested memory, it returns `NULL` instead of a usable pointer. Using that NULL as if it were a real block crashes the program, so **every** allocation needs a check.",
          ),
          text(
            "On a desktop, small allocations rarely fail, but huge or miscalculated sizes do, and embedded devices run out of memory all the time. You can see a failure by asking for an impossible amount, such as the largest possible `size_t`.",
            {
              label: "An allocation that fails",
              content: `#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int main(void) {
    void *small = malloc(64);
    void *impossible = malloc(SIZE_MAX);

    printf("small allocation: %s\\n", small ? "ok" : "failed");
    printf("SIZE_MAX allocation: %s\\n", impossible ? "ok" : "failed");

    free(small);
    free(impossible);     // free(NULL) is fine
    return 0;
}`,
            },
          ),
          text(
            "What to do on failure depends on the program: print an error and exit, return NULL or an error code to the caller, or fall back to a smaller request. A helper function keeps the check in one place.",
            {
              label: "A helper that reports failures",
              content: `#include <stdio.h>
#include <stdlib.h>

int *alloc_ints(size_t count) {
    int *p = malloc(count * sizeof *p);
    if (p == NULL) {
        printf("could not allocate %zu ints\\n", count);
    }
    return p;
}

int main(void) {
    int *data = alloc_ints(100);
    if (data == NULL) {
        return 1;               // stop cleanly instead of crashing
    }
    data[0] = 42;
    printf("first value: %d\\n", data[0]);
    free(data);
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "`count * sizeof *p` can overflow for very large counts and wrap round to a small number. `calloc(count, size)` checks for that overflow for you, which is one reason to prefer it for arrays.",
          ),
          quiz(
            "What does malloc return when it can't allocate the memory?",
            ["0 bytes of memory", "NULL", "A pointer to the stack", "It ends the program"],
            1,
            "malloc returns NULL on failure. Your code has to check for it.",
          ),
          quiz(
            "Why is `int *p = malloc(n * sizeof *p); p[0] = 1;` risky?",
            ["p[0] is not allowed", "If malloc failed, p is NULL and writing to it crashes", "sizeof *p is wrong", "malloc needs a cast"],
            1,
            "Without a NULL check, a failed allocation leads straight to dereferencing NULL.",
          ),
        ],
        challenge: {
          instructions:
            "Write int *create_buffer(size_t count) that returns NULL and prints allocation failed when malloc fails. Ask for 10 ints (ok: 10 ints ready), then SIZE_MAX / sizeof(int) ints (fails), and fall back to 4 ints (fallback: 4 ints ready). Free what you got.",
          description: task(
            "Write `int *create_buffer(size_t count)` that allocates `count` ints, and when `malloc` returns NULL prints `allocation failed` and returns NULL. In `main`, request 10 ints and report success. Then request `SIZE_MAX / sizeof(int)` ints, which can't succeed; when that returns NULL, fall back to 4 ints and report it. Free every buffer you received.",
            "ok: 10 ints ready\nallocation failed\nfallback: 4 ints ready",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

// Write create_buffer here


int main(void) {
    // Request 10 ints and report success
    // Request SIZE_MAX / sizeof(int) ints; if that fails, fall back to 4 ints
    // Free every buffer you received

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int *create_buffer(size_t count) {
    int *p = malloc(count * sizeof(int));
    if (p == NULL) {
        printf("allocation failed\\n");
        return NULL;
    }
    return p;
}

int main(void) {
    int *small = create_buffer(10);
    if (small != NULL) {
        printf("ok: 10 ints ready\\n");
    }

    int *big = create_buffer(SIZE_MAX / sizeof(int));
    if (big == NULL) {
        big = create_buffer(4);
        if (big != NULL) {
            printf("fallback: 4 ints ready\\n");
        }
    }

    free(small);
    free(big);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Reports the successful and the failed allocation",
              outputIncludes: ["ok: 10 ints ready", "allocation failed"],
              hint: "The huge request returns NULL; print allocation failed inside create_buffer.",
            },
            {
              id: "t2",
              label: "Falls back to a smaller buffer",
              expectedOutput: "ok: 10 ints ready\nallocation failed\nfallback: 4 ints ready",
              hint: "When the big request returns NULL, call create_buffer(4).",
            },
            {
              id: "t3",
              label: "Checks malloc's result for NULL and returns NULL",
              keywords: [
                { pattern: "==\\s*NULL|NULL\\s*==" },
                { pattern: "\\breturn\\s+NULL\\s*;" },
                { pattern: "SIZE_MAX" },
              ],
              hint: "if (p == NULL) { printf(...); return NULL; }",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-2",
    title: "calloc & realloc",
    icon: "🔄",
    color: ACCENT,
    lessons: [
      {
        id: "c_memory_management-2-0",
        title: "calloc — zero-initialised",
        xp: 15,
        chapterTitle: "calloc & realloc",
        theory: [
          text(
            "`calloc` is a variant of `malloc` for arrays. It takes the **number of elements** and the **size of each** separately, and it fills the whole block with **zeros**. It is the natural choice for counters, flags and anything that must start at 0.",
          ),
          text(
            "`calloc(count, size)` also checks that `count * size` doesn't overflow, and returns NULL if it would. Free a calloc'd block with the same `free`.",
            {
              label: "malloc vs calloc",
              content: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *counts = calloc(5, sizeof *counts);   // 5 ints, all 0
    if (counts == NULL) {
        return 1;
    }

    counts[2] += 3;
    counts[4]++;

    for (int i = 0; i < 5; i++) {
        printf("%d ", counts[i]);
    }
    printf("\\n");

    free(counts);
    return 0;
}`,
            },
          ),
          text(
            "Counting with an array indexed by value is a common use. To count letters, map `'a'` to index 0 and `'z'` to index 25 with `c - 'a'`. `getchar()` reads one character at a time until it returns `EOF` (end of input).",
            {
              label: "Counting digits in the input (input: 2024-10-12)",
              stdin: "2024-10-12",
              content: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *digits = calloc(10, sizeof *digits);
    if (digits == NULL) {
        return 1;
    }

    int c;
    while ((c = getchar()) != EOF) {
        if (c >= '0' && c <= '9') {
            digits[c - '0']++;
        }
    }
    for (int d = 0; d < 10; d++) {
        if (digits[d] > 0) {
            printf("%d appears %d time(s)\\n", d, digits[d]);
        }
    }
    free(digits);
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "calloc's zeros are \"all bits zero\". That is 0 for integers and, on every common platform, 0.0 for doubles and NULL for pointers too.",
          ),
          quiz(
            "What is the main difference between `malloc(10 * sizeof(int))` and `calloc(10, sizeof(int))`?",
            ["calloc allocates on the stack", "calloc fills the block with zeros", "malloc can't allocate arrays", "There is no difference"],
            1,
            "Both allocate 40 bytes on the heap, but only calloc guarantees they start as zeros.",
          ),
          quiz(
            "With `counts = calloc(26, sizeof(int))`, which index counts the letter 'd'?",
            ["4", "3", "100", "'d'"],
            1,
            "'d' - 'a' is 3, so counts[3] holds the count for d.",
          ),
        ],
        challenge: {
          instructions:
            "Count the letters in the input (hello world) with a calloc'd array of 26 ints read via getchar. Print each letter that appears with its count in alphabetical order, then free the array.",
          stdin: "hello world",
          description: task(
            "Allocate 26 counters with `calloc` (they start at 0). Read the input one character at a time with `getchar()` until `EOF`, and count each lowercase letter in `counts[c - 'a']`. Print every letter that appeared, in alphabetical order, with its count, one per line, then `free` the array. The test input is `hello world`.",
            "d: 1\ne: 1\nh: 1\nl: 3\no: 2\nr: 1\nw: 1",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    // Allocate 26 zeroed counters with calloc and check for NULL

    // Read characters with getchar() until EOF and count the lowercase letters

    // Print each letter with a count above 0, then free the counters

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *counts = calloc(26, sizeof *counts);
    if (counts == NULL) {
        return 1;
    }

    int c;
    while ((c = getchar()) != EOF) {
        if (c >= 'a' && c <= 'z') {
            counts[c - 'a']++;
        }
    }

    for (int i = 0; i < 26; i++) {
        if (counts[i] > 0) {
            printf("%c: %d\\n", 'a' + i, counts[i]);
        }
    }
    free(counts);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Counts the repeated letters",
              outputIncludes: ["l: 3", "o: 2"],
              hint: "counts[c - 'a']++ for every lowercase letter.",
            },
            {
              id: "t2",
              label: "Prints every letter in alphabetical order",
              expectedOutput: "d: 1\ne: 1\nh: 1\nl: 3\no: 2\nr: 1\nw: 1",
              hint: "Loop i from 0 to 25 and print 'a' + i when counts[i] > 0.",
            },
            {
              id: "t3",
              label: "Uses calloc, getchar and free",
              keywords: [
                { pattern: "\\bcalloc\\s*\\(\\s*26\\s*," },
                { pattern: "\\bgetchar\\s*\\(\\s*\\)" },
                { pattern: "\\bfree\\s*\\(" },
              ],
              hint: "int *counts = calloc(26, sizeof *counts);",
            },
          ],
        },
      },
      {
        id: "c_memory_management-2-1",
        title: "realloc — resize memory",
        xp: 20,
        chapterTitle: "calloc & realloc",
        theory: [
          text(
            "Sometimes a heap block turns out to be the wrong size. `realloc(ptr, new_size)` resizes it: it keeps the existing contents (up to the smaller of the old and new sizes) and returns a pointer to the resized block. Any new space at the end is **not** initialised.",
          ),
          text(
            "`realloc` may not be able to grow the block where it is. Then it allocates a new block, copies the data across, frees the old one and returns the **new address**. So always use the pointer it returns, never the old one.",
            {
              label: "Growing a block (the address may change)",
              content: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *nums = malloc(3 * sizeof *nums);
    if (nums == NULL) {
        return 1;
    }
    nums[0] = 1; nums[1] = 2; nums[2] = 3;

    int *bigger = realloc(nums, 5 * sizeof *nums);
    if (bigger == NULL) {
        free(nums);
        return 1;
    }
    nums = bigger;
    nums[3] = 4; nums[4] = 5;

    for (int i = 0; i < 5; i++) {
        printf("%d ", nums[i]);
    }
    printf("\\n");
    free(nums);
    return 0;
}`,
            },
          ),
          text(
            "Notice the **temporary pointer**. If you write `nums = realloc(nums, ...)` and realloc fails, it returns NULL and you have overwritten your only pointer to the old block, which is still allocated: a leak. Assign to a temporary, check it, then update the real pointer.\n\nSpecial cases: `realloc(NULL, size)` behaves like `malloc(size)`, and shrinking a block keeps the first part of the data.",
          ),
          callout(
            "warning",
            "After a successful realloc, any other pointers into the old block may be dangling, because the data may have moved. Recompute them from the new pointer.",
          ),
          quiz(
            "Why should you write `int *tmp = realloc(p, n); if (tmp) p = tmp;` instead of `p = realloc(p, n);`?",
            [
              "It is faster",
              "If realloc fails it returns NULL, and p = realloc(...) would lose the only pointer to the old block",
              "realloc can't assign to the same variable",
              "tmp makes the new memory zeroed",
            ],
            1,
            "On failure the old block is untouched but still allocated. Keeping p lets you keep using it or free it.",
          ),
          quiz(
            "After `p = realloc(p, bigger_size)` succeeds, what is true of the new bytes at the end?",
            ["They are zero", "They are uninitialised", "They copy the last element", "They are NULL"],
            1,
            "realloc keeps the old contents but doesn't clear the added space. Initialise it yourself.",
          ),
        ],
        challenge: {
          instructions:
            "Start with a malloc'd block of 3 ints {1, 2, 3}. Grow it to 6 with realloc through a temporary pointer, fill 4 5 6 and print after grow: 1 2 3 4 5 6. Shrink it to 2 and print after shrink: 1 2, then free it.",
          description: task(
            "The starter allocates 3 ints holding 1, 2, 3. **Grow** the block to 6 ints with `realloc`, assigning the result to a temporary pointer and checking it for NULL before updating your real pointer. Fill the new elements with 4, 5, 6 and print all six. Then **shrink** the block to 2 ints the same way, print what's left, and `free` it.",
            "after grow: 1 2 3 4 5 6\nafter shrink: 1 2",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

void print_ints(const char *label, const int *values, int count) {
    printf("%s:", label);
    for (int i = 0; i < count; i++) {
        printf(" %d", values[i]);
    }
    printf("\\n");
}

int main(void) {
    int *nums = malloc(3 * sizeof *nums);
    if (nums == NULL) {
        return 1;
    }
    nums[0] = 1; nums[1] = 2; nums[2] = 3;

    // Grow to 6 ints through a temporary pointer, fill 4 5 6, print "after grow"

    // Shrink to 2 ints the same way, print "after shrink"

    // Free the block

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

void print_ints(const char *label, const int *values, int count) {
    printf("%s:", label);
    for (int i = 0; i < count; i++) {
        printf(" %d", values[i]);
    }
    printf("\\n");
}

int main(void) {
    int *nums = malloc(3 * sizeof *nums);
    if (nums == NULL) {
        return 1;
    }
    nums[0] = 1; nums[1] = 2; nums[2] = 3;

    int *tmp = realloc(nums, 6 * sizeof *nums);
    if (tmp == NULL) {
        free(nums);
        return 1;
    }
    nums = tmp;
    for (int i = 3; i < 6; i++) {
        nums[i] = i + 1;
    }
    print_ints("after grow", nums, 6);

    tmp = realloc(nums, 2 * sizeof *nums);
    if (tmp == NULL) {
        free(nums);
        return 1;
    }
    nums = tmp;
    print_ints("after shrink", nums, 2);

    free(nums);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Grows the block and keeps the old values",
              outputIncludes: "after grow: 1 2 3 4 5 6",
              hint: "realloc keeps 1, 2, 3; fill indexes 3 to 5 yourself.",
            },
            {
              id: "t2",
              label: "Shrinks the block",
              expectedOutput: "after grow: 1 2 3 4 5 6\nafter shrink: 1 2",
              hint: "After shrinking to 2 ints, only print 2 values.",
            },
            {
              id: "t3",
              label: "Uses realloc through a checked temporary pointer",
              keywords: [
                { pattern: "\\b(?!nums\\b)\\w+\\s*=\\s*realloc\\s*\\(\\s*nums\\s*," },
                { pattern: "==\\s*NULL|NULL\\s*==" },
                { pattern: "\\bnums\\s*=\\s*(?!realloc)\\w+\\s*;" },
                { pattern: "\\bfree\\s*\\(\\s*nums\\s*\\)" },
              ],
              hint: "int *tmp = realloc(nums, ...); if (tmp == NULL) { ... } nums = tmp;",
            },
          ],
        },
      },
      {
        id: "c_memory_management-2-2",
        title: "Combining malloc & realloc",
        xp: 20,
        chapterTitle: "calloc & realloc",
        theory: [
          text(
            "When you don't know how much data is coming, combine the two: start with a small `malloc`'d block, and whenever it fills up, make it bigger with `realloc`. This **growth pattern** is how dynamic arrays, string builders and input buffers work in C.",
          ),
          text(
            "Track two numbers: the **count** (how many items are stored) and the **capacity** (how many fit). When count reaches capacity, grow before adding. Growing by **doubling** the capacity is the usual choice: only a few reallocations are needed even for millions of items.",
            {
              label: "Reading an unknown amount of input (input: 7 3 9 1 5)",
              stdin: "7 3 9 1 5",
              content: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int capacity = 2;
    int count = 0;
    int *items = malloc(capacity * sizeof *items);
    if (items == NULL) {
        return 1;
    }

    int value;
    while (scanf("%d", &value) == 1) {
        if (count == capacity) {
            capacity *= 2;
            int *tmp = realloc(items, capacity * sizeof *items);
            if (tmp == NULL) {
                free(items);
                return 1;
            }
            items = tmp;
            printf("(grew to %d)\\n", capacity);
        }
        items[count++] = value;
    }

    printf("stored %d numbers\\n", count);
    free(items);
    return 0;
}`,
            },
          ),
          text(
            "Why double instead of adding one slot at a time? Each `realloc` may copy the whole array. Adding one slot each time means copying again and again (n² work). Doubling means each item is copied only a couple of times on average.",
          ),
          diagram("Capacity as 7 items arrive (start 2, double when full)", [
            { id: "c2", label: "capacity 2", color: "#94a3b8", items: ["items 1–2", "full at item 3"] },
            { id: "c4", label: "capacity 4", color: "#3b82f6", items: ["realloc", "items 3–4"] },
            { id: "c8", label: "capacity 8", color: ACCENT, items: ["realloc", "items 5–7", "1 slot spare"] },
          ]),
          callout(
            "tip",
            "Wrap the \"grow if full\" step in a function as soon as you use it twice. The Dynamic Array lesson turns it into a reusable struct.",
          ),
          quiz(
            "In the growth pattern, when do you call realloc?",
            ["Before every insert", "When count equals capacity", "Only at the end", "When count is 0"],
            1,
            "Grow only when the array is full. Until then the existing capacity has room.",
          ),
          quiz(
            "Starting at capacity 2 and doubling, what is the capacity after storing 9 items?",
            ["9", "10", "16", "18"],
            2,
            "2 → 4 → 8 → 16. Capacity 8 is full after 8 items, so the 9th triggers a grow to 16.",
          ),
        ],
        challenge: {
          instructions:
            "Read numbers until the input ends (3 1 4 1 5 9 2) into a block that starts with capacity 2 and doubles with realloc when full, printing grew to N each time. Then print count: 7, capacity: 8 and sum: 25, and free the block.",
          stdin: "3 1 4 1 5 9 2",
          description: task(
            "Read integers until the input ends (the test gives `3 1 4 1 5 9 2`). Store them in a heap block that starts with **capacity 2**. Whenever it is full, double the capacity with `realloc` (through a temporary pointer) and print `grew to N`. At the end print the count, the capacity and the sum, then `free` the block.",
            "grew to 4\ngrew to 8\ncount: 7, capacity: 8\nsum: 25",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int capacity = 2;
    int count = 0;
    // Allocate the starting block and check for NULL

    // Read numbers until the input ends:
    //   if count == capacity, double capacity with realloc and print "grew to N"
    //   store the number

    // Print the count and capacity, then the sum, then free the block

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int capacity = 2;
    int count = 0;
    int *items = malloc(capacity * sizeof *items);
    if (items == NULL) {
        return 1;
    }

    int value;
    while (scanf("%d", &value) == 1) {
        if (count == capacity) {
            int *tmp = realloc(items, 2 * capacity * sizeof *items);
            if (tmp == NULL) {
                free(items);
                return 1;
            }
            items = tmp;
            capacity *= 2;
            printf("grew to %d\\n", capacity);
        }
        items[count++] = value;
    }

    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += items[i];
    }
    printf("count: %d, capacity: %d\\n", count, capacity);
    printf("sum: %d\\n", sum);

    free(items);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Doubles the capacity twice",
              outputIncludes: ["grew to 4", "grew to 8"],
              hint: "Grow only when count == capacity, then double.",
            },
            {
              id: "t2",
              label: "Prints the count, capacity and sum",
              expectedOutput: "grew to 4\ngrew to 8\ncount: 7, capacity: 8\nsum: 25",
              hint: "7 numbers fit in capacity 8; their sum is 25.",
            },
            {
              id: "t3",
              label: "Uses malloc, realloc in the reading loop, and free",
              keywords: [
                { pattern: "\\bmalloc\\s*\\(" },
                { pattern: "while\\s*\\(\\s*scanf[\\s\\S]*\\brealloc\\s*\\(" },
                { pattern: "\\bfree\\s*\\(" },
              ],
              hint: "while (scanf(\"%d\", &value) == 1) { if (count == capacity) { ... realloc ... } }",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-3",
    title: "Memory Safety",
    icon: "🛡️",
    color: ACCENT,
    lessons: [
      {
        id: "c_memory_management-3-0",
        title: "Memory Leaks",
        xp: 15,
        chapterTitle: "Memory Safety",
        theory: [
          text(
            "A **memory leak** happens when a program loses every pointer to a heap block without freeing it. The block stays reserved but can never be used or freed again. One small leak is harmless, but a leak inside a loop or a long-running server slowly eats all the memory until the program slows down or is killed.",
          ),
          text(
            "Leaks usually come from a few patterns:\n\n- **Forgetting** to free at the end.\n- **Early returns**: an error path returns before reaching the `free`.\n- **Overwriting** the only pointer: `p = malloc(...)` again while p still holds an unfreed block.\n- **Losing ownership**: a function returns heap memory and the caller ignores the result.",
            {
              label: "An early return that leaks",
              content: `#include <stdio.h>
#include <stdlib.h>

int process(int value) {
    int *buffer = malloc(100 * sizeof *buffer);
    if (buffer == NULL) {
        return -1;
    }
    if (value < 0) {
        free(buffer);       // without this line, every negative value leaks
        return -1;
    }
    buffer[0] = value * 2;
    int result = buffer[0];
    free(buffer);
    return result;
}

int main(void) {
    printf("%d %d\\n", process(21), process(-5));
    return 0;
}`,
            },
          ),
          text(
            "Tools find leaks for you: **Valgrind** on Linux, or compiling with `-fsanitize=address` (AddressSanitizer with its leak checker). A simple technique that works anywhere is to route allocations through small wrapper functions that count live blocks. If the count isn't 0 at the end, something leaked.",
            {
              label: "Counting live allocations",
              content: `#include <stdio.h>
#include <stdlib.h>

static int live_blocks = 0;

void *tracked_malloc(size_t size) {
    void *p = malloc(size);
    if (p != NULL) live_blocks++;
    return p;
}

void tracked_free(void *p) {
    if (p != NULL) live_blocks--;
    free(p);
}

int main(void) {
    char *a = tracked_malloc(10);
    char *b = tracked_malloc(20);
    tracked_free(a);
    printf("live blocks: %d\\n", live_blocks);   // 1: b leaked
    tracked_free(b);
    printf("live blocks: %d\\n", live_blocks);   // 0: all freed
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Write the `free` at the same time as the `malloc`, then fill in the code between them. And give each function a single exit path (or a cleanup label) so error returns can't skip the free.",
          ),
          quiz(
            "Which line leaks memory? `char *p = malloc(10); p = malloc(20); free(p);`",
            ["free(p)", "p = malloc(20)", "char *p = malloc(10)", "None of them"],
            1,
            "Assigning the second block to p loses the only pointer to the first one, which can then never be freed.",
          ),
          quiz(
            "A leak-counting wrapper reports `live blocks: 2` at the end of main. What does it mean?",
            ["The program used 2 bytes", "Two allocated blocks were never freed", "free was called twice", "malloc failed twice"],
            1,
            "Each allocation adds 1 and each free subtracts 1, so 2 means two blocks are still allocated.",
          ),
        ],
        challenge: {
          instructions:
            "This program leaks: make_report allocates a block that main never frees, average returns early without freeing its scratch buffer, and a pointer is overwritten. Fix every leak so the output ends with live blocks at exit: 0.",
          description: task(
            "**Fix the leaks.** The program uses `tracked_malloc` / `tracked_free`, which count live heap blocks, and it currently ends with live blocks still allocated. Find and fix all three leaks: a block `main` never frees, an early `return` in `average` that skips its `free`, and a pointer that is overwritten while it still owns a block. Don't change the two wrapper functions.",
            "report: 3 items\naverage: 20\naverage: invalid\nlive blocks at exit: 0",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

static int live_blocks = 0;

void *tracked_malloc(size_t size) {
    void *p = malloc(size);
    if (p != NULL) live_blocks++;
    return p;
}

void tracked_free(void *p) {
    if (p != NULL) live_blocks--;
    free(p);
}

int *make_report(int items) {
    int *report = tracked_malloc(items * sizeof *report);
    for (int i = 0; i < items; i++) {
        report[i] = i;
    }
    return report;
}

int average(const int *values, int count) {
    int *scratch = tracked_malloc(count * sizeof *scratch);
    if (count <= 0) {
        return -1;
    }
    int sum = 0;
    for (int i = 0; i < count; i++) {
        scratch[i] = values[i];
        sum += scratch[i];
    }
    tracked_free(scratch);
    return sum / count;
}

int main(void) {
    int *report = make_report(3);
    printf("report: %d items\\n", 3);

    int data[3] = {10, 20, 30};
    int *copy = tracked_malloc(3 * sizeof *copy);
    copy = tracked_malloc(3 * sizeof *copy);
    for (int i = 0; i < 3; i++) {
        copy[i] = data[i];
    }
    printf("average: %d\\n", average(copy, 3));
    printf("average: %s\\n", average(copy, 0) < 0 ? "invalid" : "ok");
    tracked_free(copy);

    printf("live blocks at exit: %d\\n", live_blocks);
    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

static int live_blocks = 0;

void *tracked_malloc(size_t size) {
    void *p = malloc(size);
    if (p != NULL) live_blocks++;
    return p;
}

void tracked_free(void *p) {
    if (p != NULL) live_blocks--;
    free(p);
}

int *make_report(int items) {
    int *report = tracked_malloc(items * sizeof *report);
    for (int i = 0; i < items; i++) {
        report[i] = i;
    }
    return report;
}

int average(const int *values, int count) {
    if (count <= 0) {
        return -1;
    }
    int *scratch = tracked_malloc(count * sizeof *scratch);
    int sum = 0;
    for (int i = 0; i < count; i++) {
        scratch[i] = values[i];
        sum += scratch[i];
    }
    tracked_free(scratch);
    return sum / count;
}

int main(void) {
    int *report = make_report(3);
    printf("report: %d items\\n", 3);
    tracked_free(report);

    int data[3] = {10, 20, 30};
    int *copy = tracked_malloc(3 * sizeof *copy);
    for (int i = 0; i < 3; i++) {
        copy[i] = data[i];
    }
    printf("average: %d\\n", average(copy, 3));
    printf("average: %s\\n", average(copy, 0) < 0 ? "invalid" : "ok");
    tracked_free(copy);

    printf("live blocks at exit: %d\\n", live_blocks);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "The program still produces its results",
              outputIncludes: ["report: 3 items", "average: 20", "average: invalid"],
              hint: "Fix the leaks without changing what the program prints.",
            },
            {
              id: "t2",
              label: "No blocks are left allocated at exit",
              expectedOutput: "report: 3 items\naverage: 20\naverage: invalid\nlive blocks at exit: 0",
              hint: "Free the report, don't allocate scratch before the early return, and remove the overwritten allocation.",
            },
            {
              id: "t3",
              label: "Keeps using the tracking wrappers",
              keywords: [
                { pattern: "\\btracked_free\\s*\\(\\s*report\\s*\\)" },
                { pattern: "^(?![\\s\\S]*\\bmain\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*\\bfree\\s*\\()" },
              ],
              hint: "Free blocks with tracked_free so they are counted.",
            },
          ],
        },
      },
      {
        id: "c_memory_management-3-1",
        title: "Dangling Pointers",
        xp: 15,
        chapterTitle: "Memory Safety",
        theory: [
          text(
            "A **dangling pointer** still holds an address, but the memory at that address is no longer valid. Using it is undefined behaviour: the program may seem to work, print garbage, or crash, and the result can change between runs, compilers and machines. That makes dangling pointers some of the hardest bugs to find.",
          ),
          text(
            "Dangling pointers come from three situations:\n\n- **Use after free:** reading or writing a block after `free(p)`.\n- **Returning the address of a local variable:** the local disappears when the function returns.\n- **Stale pointers after realloc:** other pointers into a block that `realloc` moved.\n\nThe fix is always the same idea: make sure memory outlives every pointer to it. Return heap memory instead of a local, and set pointers to `NULL` after freeing them.",
            {
              label: "The safe way to return text from a function",
              content: `#include <stdio.h>
#include <stdlib.h>

// WRONG would be: char buffer[32]; ... return buffer;
// buffer lives on the stack and is gone after the return.

char *make_greeting(const char *name) {
    char *buffer = malloc(32);            // heap: survives the return
    if (buffer == NULL) {
        return NULL;
    }
    snprintf(buffer, 32, "Hello, %s!", name);
    return buffer;                        // caller must free it
}

int main(void) {
    char *greeting = make_greeting("Ada");
    if (greeting == NULL) {
        return 1;
    }
    printf("%s\\n", greeting);
    free(greeting);
    greeting = NULL;                      // no dangling pointer left behind
    return 0;
}`,
            },
          ),
          text(
            "gcc warns about the most obvious case: `function returns address of local variable`. Treat that warning as an error. For use-after-free, AddressSanitizer (`-fsanitize=address`) reports the exact line at runtime.",
            {
              label: "Setting a pointer to NULL after free",
              content: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *score = malloc(sizeof *score);
    if (score == NULL) {
        return 1;
    }
    *score = 99;
    free(score);
    score = NULL;

    if (score != NULL) {
        printf("score: %d\\n", *score);     // skipped: no use after free
    } else {
        printf("score was already freed\\n");
    }
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "\"It printed the right value\" doesn't prove a dangling pointer is safe. Freed memory often keeps its old contents for a while, so the bug hides until something else reuses that memory.",
          ),
          quiz(
            "Why is returning the address of a local array a bug?",
            [
              "Arrays can't be returned",
              "The array lives in the function's stack frame, which is destroyed when the function returns",
              "The caller can't read arrays",
              "It leaks memory",
            ],
            1,
            "After the return, the pointer refers to stack memory that will be reused by the next call. Return heap memory or let the caller provide the buffer.",
          ),
          quiz(
            "What is the effect of `p = NULL;` right after `free(p);`?",
            [
              "It frees the memory a second time",
              "Later checks like if (p) can tell the block is gone, and accidental use crashes predictably",
              "It returns the memory to the stack",
              "Nothing useful",
            ],
            1,
            "A NULL pointer is easy to test for, and dereferencing it fails immediately instead of silently corrupting memory.",
          ),
        ],
        challenge: {
          instructions:
            "make_label returns the address of a local array, so main reads memory that no longer exists. Fix make_label to return a heap block (malloc 16 bytes), and make main free each label and set the pointer to NULL. Expected: item-7 then item-42.",
          description: task(
            "**Fix the dangling pointer.** `make_label` builds the text in a **local** array and returns its address, so `main` reads stack memory that has already been destroyed (gcc warns about it). Change `make_label` to allocate its buffer with `malloc(16)` and return that. In `main`, `free` each label after printing it and set the pointer to `NULL`.",
            "item-7\nitem-42",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

char *make_label(int id) {
    char label[16];
    snprintf(label, sizeof label, "item-%d", id);
    return label;
}

int main(void) {
    char *first = make_label(7);
    printf("%s\\n", first);

    char *second = make_label(42);
    printf("%s\\n", second);
    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

char *make_label(int id) {
    char *label = malloc(16);
    if (label == NULL) {
        return NULL;
    }
    snprintf(label, 16, "item-%d", id);
    return label;
}

int main(void) {
    char *first = make_label(7);
    if (first == NULL) {
        return 1;
    }
    printf("%s\\n", first);
    free(first);
    first = NULL;

    char *second = make_label(42);
    if (second == NULL) {
        return 1;
    }
    printf("%s\\n", second);
    free(second);
    second = NULL;
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints both labels correctly",
              expectedOutput: "item-7\nitem-42",
              hint: "The text must live on the heap so it still exists after make_label returns.",
            },
            {
              id: "t2",
              label: "make_label allocates its buffer with malloc",
              keywords: [
                { pattern: "\\bmake_label\\s*\\([^)]*\\)\\s*\\{[^}]*\\bmalloc\\s*\\(" },
                { pattern: "^(?![\\s\\S]*\\bchar\\s+label\\s*\\[)" },
              ],
              hint: "char *label = malloc(16); instead of char label[16];",
            },
            {
              id: "t3",
              label: "main frees each label and sets the pointer to NULL",
              keywords: [
                { pattern: "\\bfree\\s*\\(\\s*first\\s*\\)\\s*;\\s*first\\s*=\\s*NULL" },
                { pattern: "\\bfree\\s*\\(\\s*second\\s*\\)\\s*;\\s*second\\s*=\\s*NULL" },
              ],
              hint: "free(first); first = NULL; and the same for second.",
            },
          ],
        },
      },
      {
        id: "c_memory_management-3-2",
        title: "Buffer Overflows",
        xp: 20,
        chapterTitle: "Memory Safety",
        theory: [
          text(
            "A **buffer overflow** writes past the end of an array. C doesn't check array bounds, so the extra bytes land on whatever is next in memory: other variables, the function's return address, or heap bookkeeping. Overflows cause crashes and wrong results, and they have been behind many famous security holes.",
          ),
          text(
            "The classic causes are copying text without checking its length (`strcpy`, `strcat`, `gets`), off-by-one loops (`i <= size` instead of `i < size`), and forgetting room for the `'\\0'`. The defence is to **always know the size of the destination** and use functions that take it:\n\n- `snprintf(dest, size, ...)` never writes more than `size` bytes and always adds `'\\0'`.\n- `fgets(dest, size, stdin)` reads a line without overrunning `dest`.\n- `strncpy` takes a size but doesn't always add `'\\0'`, so it is easy to misuse.",
            {
              label: "Bounded copies with snprintf",
              content: `#include <stdio.h>

int main(void) {
    char small[6];   // room for 5 characters + '\\0'

    int needed = snprintf(small, sizeof small, "%s", "overflowing");
    printf("stored \\"%s\\" (needed %d characters)\\n", small, needed);

    if (needed >= (int)sizeof small) {
        printf("the text was cut short\\n");
    }
    return 0;
}`,
            },
          ),
          text(
            "Reading input safely works the same way. `fgets` reads at most `size - 1` characters and keeps the newline, which you can strip.",
            {
              label: "Reading a line safely with fgets (input: a very long line of text)",
              stdin: "a very long line of text",
              content: `#include <stdio.h>
#include <string.h>

int main(void) {
    char line[10];
    if (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';   // remove the newline if present
        printf("read: \\"%s\\"\\n", line);
    }
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Never use `gets`: it has no size limit and was removed from the C standard. Treat `strcpy` and `strcat` with suspicion unless you have just checked the length.",
          ),
          quiz(
            "`char name[8];` What is the longest string that fits safely?",
            ["8 characters", "7 characters", "9 characters", "Any length"],
            1,
            "One byte is needed for the '\\0' terminator, so 7 visible characters fit.",
          ),
          quiz(
            "Which call can never write past the end of `char buf[16]`?",
            ["strcpy(buf, input)", "gets(buf)", "snprintf(buf, sizeof buf, \"%s\", input)", "strcat(buf, input)"],
            2,
            "snprintf is told the buffer size and truncates to fit, always adding '\\0'. The others write as much as the input requires.",
          ),
        ],
        challenge: {
          instructions:
            "Write int copy_bounded(char *dest, size_t size, const char *src) that copies at most size - 1 characters, always ends dest with '\\0', and returns 1 if it had to cut the text. Copy Ada and Alexandria into a 9-byte buffer and print the results. Don't use strcpy.",
          description: task(
            "Write `int copy_bounded(char *dest, size_t size, const char *src)`: copy characters from `src` into `dest`, but at most `size - 1` of them, then always add `'\\0'`. Return 1 if the source didn't fit and was cut short, otherwise 0. Don't use `strcpy`. In `main`, copy `\"Ada\"` and then `\"Alexandria\"` into a `char name[9]` buffer and print each result with the flag.",
            "Ada (truncated: 0)\nAlexandr (truncated: 1)",
          ),
          starterCode: `#include <stdio.h>

// Write copy_bounded here (no strcpy)


int main(void) {
    char name[9];

    // Copy "Ada" into name, print it with the truncated flag
    // Copy "Alexandria" into name, print it with the truncated flag

    return 0;
}`,
          solution: `#include <stdio.h>

int copy_bounded(char *dest, size_t size, const char *src) {
    size_t i = 0;
    while (src[i] != '\\0' && i < size - 1) {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\\0';
    return src[i] != '\\0';
}

int main(void) {
    char name[9];

    int cut = copy_bounded(name, sizeof name, "Ada");
    printf("%s (truncated: %d)\\n", name, cut);

    cut = copy_bounded(name, sizeof name, "Alexandria");
    printf("%s (truncated: %d)\\n", name, cut);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Copies a short name unchanged",
              outputIncludes: "Ada (truncated: 0)",
              hint: "Copy until src ends or size - 1 characters are copied.",
            },
            {
              id: "t2",
              label: "Cuts a long name to fit and reports it",
              expectedOutput: "Ada (truncated: 0)\nAlexandr (truncated: 1)",
              hint: "A 9-byte buffer holds 8 characters plus '\\0'.",
            },
            {
              id: "t3",
              label: "Takes the destination size, passes sizeof, and avoids strcpy",
              keywords: [
                { pattern: "\\bcopy_bounded\\s*\\(\\s*char\\s*\\*\\s*\\w+\\s*,\\s*size_t\\s+\\w+\\s*,\\s*const\\s+char\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "\\bcopy_bounded\\s*\\(\\s*name\\s*,\\s*sizeof" },
                { pattern: "^(?![\\s\\S]*\\bstrcpy\\s*\\()" },
              ],
              hint: "Call copy_bounded(name, sizeof name, \"Ada\");",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-4",
    title: "Practical Patterns",
    icon: "⚙️",
    color: ACCENT,
    lessons: [
      {
        id: "c_memory_management-4-0",
        title: "Dynamic Array",
        xp: 20,
        chapterTitle: "Practical Patterns",
        theory: [
          text(
            "The growth pattern from the realloc lessons becomes much easier to use when you wrap it in a **struct** and a few functions. The result is a **dynamic array** (also called a vector): it grows automatically, and the rest of the program never touches `malloc` or `realloc` directly.",
          ),
          text(
            "The struct keeps the three things the pattern needs together: a pointer to the data, how many items are stored (`size`) and how many fit (`capacity`). Functions take a pointer to the struct so they can update it.",
            {
              label: "A minimal dynamic array",
              content: `#include <stdio.h>
#include <stdlib.h>

struct IntArray {
    int *data;
    size_t size;
    size_t capacity;
};

int push(struct IntArray *arr, int value) {
    if (arr->size == arr->capacity) {
        size_t new_cap = arr->capacity ? arr->capacity * 2 : 4;
        int *tmp = realloc(arr->data, new_cap * sizeof *tmp);
        if (tmp == NULL) {
            return 0;
        }
        arr->data = tmp;
        arr->capacity = new_cap;
    }
    arr->data[arr->size++] = value;
    return 1;
}

int main(void) {
    struct IntArray arr = {NULL, 0, 0};   // empty: realloc(NULL, ...) acts like malloc
    for (int i = 1; i <= 6; i++) {
        push(&arr, i * 100);
    }
    printf("size %zu, capacity %zu, last %d\\n", arr.size, arr.capacity, arr.data[arr.size - 1]);
    free(arr.data);
    return 0;
}`,
            },
          ),
          text(
            "A good container API usually has: an initialiser, `push` to add, `get` to read with a bounds check, and a function that frees everything and resets the struct. The bounds check is where a dynamic array is safer than a raw array.",
            {
              label: "A bounds-checked get",
              content: `#include <stdio.h>

int get(const int *data, size_t size, size_t index, int *out) {
    if (index >= size) {
        return 0;          // out of range: report failure instead of reading garbage
    }
    *out = data[index];
    return 1;
}

int main(void) {
    int values[3] = {5, 6, 7};
    int v;
    if (get(values, 3, 2, &v)) printf("index 2: %d\\n", v);
    if (!get(values, 3, 9, &v)) printf("index 9: out of range\\n");
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "C++'s `std::vector`, Java's `ArrayList` and Python's `list` all work this way internally: a heap block, a size, a capacity, and doubling when full.",
          ),
          quiz(
            "Why does push take `struct IntArray *` rather than `struct IntArray`?",
            [
              "Structs can't be passed by value",
              "push must update the caller's data, size and capacity",
              "To make the struct read-only",
              "Because realloc requires it",
            ],
            1,
            "A copy of the struct would be updated and then thrown away. The pointer lets push change the caller's struct.",
          ),
          quiz(
            "Starting from {NULL, 0, 0} with the push above, what is the capacity after 9 pushes?",
            ["9", "8", "16", "12"],
            2,
            "The first push allocates 4, then 4 → 8 at the 5th push and 8 → 16 at the 9th.",
          ),
        ],
        challenge: {
          instructions:
            "Implement struct IntVec { int *data; size_t size; size_t capacity; } with vec_init, vec_push (start at 4, double when full), vec_get (bounds-checked, returns 0 when out of range) and vec_free. Push the squares 1..10, then print size, capacity, element 9, the out-of-range message, the sum, and after freeing, size 0.",
          description: task(
            "Build a reusable dynamic array. Define `struct IntVec { int *data; size_t size; size_t capacity; }` and write: `void vec_init(struct IntVec *v)` (empty), `int vec_push(struct IntVec *v, int value)` (first capacity 4, then double; return 0 if realloc fails), `int vec_get(const struct IntVec *v, size_t index, int *out)` (return 0 when the index is out of range), and `void vec_free(struct IntVec *v)` (free and reset to empty). In `main`, push the squares of 1 to 10 and print the lines below.",
            "size: 10, capacity: 16\nelement 9: 100\nelement 10: out of range\nsum: 385\nafter free: size 0",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

// Define struct IntVec here

// Write vec_init, vec_push, vec_get and vec_free here


int main(void) {
    // Initialise a vector and push the squares of 1 to 10
    // Print the size and capacity, element 9, element 10 (out of range), the sum
    // Free the vector and print its size

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

struct IntVec {
    int *data;
    size_t size;
    size_t capacity;
};

void vec_init(struct IntVec *v) {
    v->data = NULL;
    v->size = 0;
    v->capacity = 0;
}

int vec_push(struct IntVec *v, int value) {
    if (v->size == v->capacity) {
        size_t new_cap = v->capacity ? v->capacity * 2 : 4;
        int *tmp = realloc(v->data, new_cap * sizeof *tmp);
        if (tmp == NULL) {
            return 0;
        }
        v->data = tmp;
        v->capacity = new_cap;
    }
    v->data[v->size++] = value;
    return 1;
}

int vec_get(const struct IntVec *v, size_t index, int *out) {
    if (index >= v->size) {
        return 0;
    }
    *out = v->data[index];
    return 1;
}

void vec_free(struct IntVec *v) {
    free(v->data);
    vec_init(v);
}

int main(void) {
    struct IntVec v;
    vec_init(&v);
    for (int i = 1; i <= 10; i++) {
        vec_push(&v, i * i);
    }

    printf("size: %zu, capacity: %zu\\n", v.size, v.capacity);

    int value;
    if (vec_get(&v, 9, &value)) {
        printf("element 9: %d\\n", value);
    }
    if (!vec_get(&v, 10, &value)) {
        printf("element 10: out of range\\n");
    }

    int sum = 0;
    for (size_t i = 0; i < v.size; i++) {
        vec_get(&v, i, &value);
        sum += value;
    }
    printf("sum: %d\\n", sum);

    vec_free(&v);
    printf("after free: size %zu\\n", v.size);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Grows to the right size and capacity",
              outputIncludes: "size: 10, capacity: 16",
              hint: "Capacity goes 4 → 8 → 16 as you push 10 items.",
            },
            {
              id: "t2",
              label: "Reads elements with a bounds check",
              outputIncludes: ["element 9: 100", "element 10: out of range"],
              hint: "vec_get returns 0 when index >= size.",
            },
            {
              id: "t3",
              label: "Prints every line, including the reset after vec_free",
              expectedOutput: "size: 10, capacity: 16\nelement 9: 100\nelement 10: out of range\nsum: 385\nafter free: size 0",
              hint: "vec_free frees data and sets size and capacity back to 0.",
            },
            {
              id: "t4",
              label: "Defines struct IntVec and grows it with realloc",
              keywords: [
                { pattern: "\\bstruct\\s+IntVec\\s*\\{[^}]*\\bint\\s*\\*\\s*data\\s*;" },
                { pattern: "\\bvec_push\\s*\\(\\s*struct\\s+IntVec\\s*\\*" },
                { pattern: "\\brealloc\\s*\\(" },
              ],
              hint: "struct IntVec { int *data; size_t size; size_t capacity; };",
            },
          ],
        },
      },
      {
        id: "c_memory_management-4-1",
        title: "Safe Free Pattern",
        xp: 15,
        chapterTitle: "Practical Patterns",
        theory: [
          text(
            "Two of the worst memory bugs, **use after free** and **double free**, have the same cause: a pointer that still holds an address after its block was freed. A simple habit removes both: **set the pointer to NULL right after freeing it.** Because `free(NULL)` does nothing, a second free becomes harmless, and a later use crashes predictably instead of corrupting memory.",
          ),
          text(
            "Doing this by hand is easy to forget, so wrap it. A function can only set the caller's pointer to NULL if it receives the pointer's **address**, so it takes a double pointer.",
            {
              label: "A safe_free helper",
              content: `#include <stdio.h>
#include <stdlib.h>

void safe_free_int(int **p) {
    free(*p);      // free(NULL) is fine, so no check needed
    *p = NULL;     // the caller's pointer no longer dangles
}

int main(void) {
    int *value = malloc(sizeof *value);
    if (value == NULL) {
        return 1;
    }
    *value = 5;

    safe_free_int(&value);
    printf("value is %s\\n", value == NULL ? "NULL" : "still set");

    safe_free_int(&value);      // a second call is harmless
    printf("freed twice without a crash\\n");
    return 0;
}`,
            },
          ),
          text(
            "A macro version works for any pointer type, because the preprocessor pastes the text before type checking. Wrapping it in `do { ... } while (0)` makes it behave like a single statement, even inside an `if` without braces.",
            {
              label: "A SAFE_FREE macro",
              content: `#include <stdio.h>
#include <stdlib.h>

#define SAFE_FREE(p) do { free(p); (p) = NULL; } while (0)

int main(void) {
    char *name = malloc(16);
    double *ratio = malloc(sizeof *ratio);

    SAFE_FREE(name);
    SAFE_FREE(ratio);
    SAFE_FREE(name);            // harmless

    printf("name %s, ratio %s\\n", name ? "set" : "NULL", ratio ? "set" : "NULL");
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "Setting a pointer to NULL protects that one variable. If you copied the address into other pointers, those copies still dangle, so keep a single clear owner for each block.",
          ),
          quiz(
            "Why does a safe-free function take `int **p` instead of `int *p`?",
            [
              "free needs two stars",
              "So it can set the caller's pointer variable to NULL",
              "To free two blocks at once",
              "Because int * can't be freed",
            ],
            1,
            "With int *p the function would only set its own copy to NULL. With int **p it can write NULL into the caller's variable through *p.",
          ),
          quiz(
            "What happens when SAFE_FREE(p) is called a second time on the same pointer?",
            ["A double-free crash", "Nothing harmful: p is already NULL and free(NULL) does nothing", "A memory leak", "It frees the next block"],
            1,
            "After the first call p is NULL, so the second free(NULL) is a no-op.",
          ),
        ],
        challenge: {
          instructions:
            "Write void safe_free(char **p) that frees *p and sets it to NULL. Allocate a buffer, copy hello into it, print it, call safe_free twice, and print after first free: buffer is NULL and second safe_free: ok, then show that a check on the pointer skips the use.",
          description: task(
            "Write `void safe_free(char **p)` that frees `*p` and then sets `*p` to `NULL`. In `main`, allocate a 16-byte buffer, copy `hello` into it (with `snprintf`) and print it. Call `safe_free(&buffer)` and print whether `buffer` is NULL. Call it again to show a second call is harmless. Finally, only print the buffer if it isn't NULL; otherwise print `nothing to print`.",
            "buffer: hello\nafter first free: buffer is NULL\nsecond safe_free: ok\nnothing to print",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

// Write safe_free here


int main(void) {
    char *buffer = malloc(16);
    if (buffer == NULL) {
        return 1;
    }

    // Copy "hello" into buffer and print it
    // Call safe_free and report that buffer is NULL
    // Call safe_free again and print "second safe_free: ok"
    // Print the buffer only if it isn't NULL, otherwise "nothing to print"

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

void safe_free(char **p) {
    free(*p);
    *p = NULL;
}

int main(void) {
    char *buffer = malloc(16);
    if (buffer == NULL) {
        return 1;
    }

    snprintf(buffer, 16, "hello");
    printf("buffer: %s\\n", buffer);

    safe_free(&buffer);
    printf("after first free: buffer is %s\\n", buffer == NULL ? "NULL" : "still set");

    safe_free(&buffer);
    printf("second safe_free: ok\\n");

    if (buffer != NULL) {
        printf("buffer: %s\\n", buffer);
    } else {
        printf("nothing to print\\n");
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the buffer and shows it is NULL after freeing",
              outputIncludes: ["buffer: hello", "after first free: buffer is NULL"],
              hint: "safe_free sets *p = NULL after free(*p).",
            },
            {
              id: "t2",
              label: "Survives a second free and skips the use",
              expectedOutput: "buffer: hello\nafter first free: buffer is NULL\nsecond safe_free: ok\nnothing to print",
              hint: "free(NULL) does nothing, and if (buffer != NULL) skips the print.",
            },
            {
              id: "t3",
              label: "safe_free takes char ** and sets the caller's pointer to NULL",
              keywords: [
                { pattern: "\\bvoid\\s+safe_free\\s*\\(\\s*char\\s*\\*\\s*\\*\\s*(\\w+)\\s*\\)" },
                { pattern: "\\bfree\\s*\\(\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "\\*\\s*\\w+\\s*=\\s*NULL" },
                { pattern: "\\bsafe_free\\s*\\(\\s*&\\s*buffer\\s*\\)" },
              ],
              hint: "void safe_free(char **p) { free(*p); *p = NULL; } and call safe_free(&buffer);",
            },
          ],
        },
      },
      {
        id: "c_memory_management-4-2",
        title: "Capstone: Dynamic String Builder",
        xp: 30,
        chapterTitle: "Practical Patterns",
        theory: [
          text(
            "Building text piece by piece is awkward in C: a fixed `char` array is either too small (overflow) or wastefully large. A **string builder** solves this with everything from this course: a heap buffer that grows with `realloc`, a length, a capacity, a guaranteed `'\\0'`, and a single free at the end.",
          ),
          text(
            "The struct tracks the buffer, the current length (not counting `'\\0'`) and the capacity. Appending first makes sure there is room for the new text **plus** the terminator, growing by doubling, then copies the text in.",
            {
              label: "Ensuring capacity before appending",
              content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Text {
    char *buf;
    size_t len;
    size_t cap;
};

int ensure_room(struct Text *t, size_t extra) {
    size_t needed = t->len + extra + 1;          // +1 for '\\0'
    if (needed <= t->cap) {
        return 1;
    }
    size_t new_cap = t->cap ? t->cap : 8;
    while (new_cap < needed) {
        new_cap *= 2;
    }
    char *tmp = realloc(t->buf, new_cap);
    if (tmp == NULL) {
        return 0;
    }
    t->buf = tmp;
    t->cap = new_cap;
    return 1;
}

int main(void) {
    struct Text t = {NULL, 0, 0};
    const char *word = "builder";
    if (ensure_room(&t, strlen(word))) {
        memcpy(t.buf, word, strlen(word) + 1);
        t.len = strlen(word);
    }
    printf("%s (len %zu, cap %zu)\\n", t.buf, t.len, t.cap);
    free(t.buf);
    return 0;
}`,
            },
          ),
          text(
            "With `ensure_room` in place, appending is short: make room, copy the new text to the end of the buffer (`buf + len`), update the length, and the `'\\0'` comes along with the copy. The builder owns its buffer, so a single `sb_free` releases it.",
          ),
          diagram("Appending \"Hi\" then \", there\"", [
            { id: "s1", label: "After \"Hi\"", color: "#3b82f6", items: ["buf: \"Hi\\0\"", "len 2, cap 8"] },
            { id: "s2", label: "Need 2 + 7 + 1 = 10", color: "#f97316", items: ["10 > 8: realloc to 16"] },
            { id: "s3", label: "After \", there\"", color: ACCENT, items: ["buf: \"Hi, there\\0\"", "len 9, cap 16"] },
          ]),
          callout(
            "tip",
            "Many real C libraries (Git, Redis, SQLite) contain a string builder like this one. Once you have it, building messages, CSV lines or JSON becomes safe and simple.",
          ),
          quiz(
            "Why does ensure_room add 1 to `len + extra`?",
            ["To round up the capacity", "To leave room for the '\\0' terminator", "Because realloc needs an odd size", "To avoid a leak"],
            1,
            "The buffer must hold the text and its terminator, which strlen doesn't count.",
          ),
          quiz(
            "Where should sb_append copy the new text?",
            ["To buf", "To buf + len", "To buf + cap", "To a new malloc block every time"],
            1,
            "buf + len is where the current '\\0' sits, so copying there overwrites it with the new text and its own terminator.",
          ),
        ],
        challenge: {
          instructions:
            "Build a string builder: struct StringBuilder { char *buf; size_t len; size_t cap; } with sb_init, sb_append (grows with realloc, starting at 8 and doubling) and sb_free. Read words from the input (red green blue yellow), join them with \", \" and print result: red, green, blue, yellow, length: 24 and resized N times, then free it.",
          stdin: "red green blue yellow",
          description: task(
            "Write a **string builder**: `struct StringBuilder { char *buf; size_t len; size_t cap; }` with `void sb_init(struct StringBuilder *sb)`, `int sb_append(struct StringBuilder *sb, const char *text)` and `void sb_free(struct StringBuilder *sb)`. `sb_append` must make room for the text plus `'\\0'` with `realloc` (first capacity 8, then doubling) and count each `realloc` in a global `resizes` counter. In `main`, read words until the input ends (the test gives `red green blue yellow`), append them separated by `\", \"`, print the result, its length and the number of resizes, then free the builder.",
            "result: red, green, blue, yellow\nlength: 24\nresized 3 times",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int resizes = 0;

// 1. Define struct StringBuilder (buf, len, cap)

// 2. Write sb_init, sb_append (grow with realloc: start at 8, double; count resizes) and sb_free

int main(void) {
    char word[32];

    // 3. Read words with scanf("%31s", word) until the input ends
    //    Append ", " before every word except the first

    // 4. Print the result, its length and the number of resizes, then free the builder

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int resizes = 0;

struct StringBuilder {
    char *buf;
    size_t len;
    size_t cap;
};

void sb_init(struct StringBuilder *sb) {
    sb->buf = NULL;
    sb->len = 0;
    sb->cap = 0;
}

int sb_append(struct StringBuilder *sb, const char *text) {
    size_t extra = strlen(text);
    size_t needed = sb->len + extra + 1;

    if (needed > sb->cap) {
        size_t new_cap = sb->cap ? sb->cap : 8;
        while (new_cap < needed) {
            new_cap *= 2;
        }
        char *tmp = realloc(sb->buf, new_cap);
        if (tmp == NULL) {
            return 0;
        }
        sb->buf = tmp;
        sb->cap = new_cap;
        resizes++;
    }

    memcpy(sb->buf + sb->len, text, extra + 1);
    sb->len += extra;
    return 1;
}

void sb_free(struct StringBuilder *sb) {
    free(sb->buf);
    sb_init(sb);
}

int main(void) {
    struct StringBuilder sb;
    sb_init(&sb);

    char word[32];
    int first = 1;
    while (scanf("%31s", word) == 1) {
        if (!first) {
            sb_append(&sb, ", ");
        }
        sb_append(&sb, word);
        first = 0;
    }

    printf("result: %s\\n", sb.buf);
    printf("length: %zu\\n", sb.len);
    printf("resized %d times\\n", resizes);

    sb_free(&sb);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Joins the words with commas",
              outputIncludes: "result: red, green, blue, yellow",
              hint: "Append \", \" before every word except the first.",
            },
            {
              id: "t2",
              label: "Tracks the length correctly",
              outputIncludes: "length: 24",
              hint: "len counts the characters, not the '\\0'.",
            },
            {
              id: "t3",
              label: "Prints every line, with 3 resizes (8 → 16 → 32)",
              expectedOutput: "result: red, green, blue, yellow\nlength: 24\nresized 3 times",
              hint: "Start at capacity 8 and double until len + extra + 1 fits; count each realloc.",
            },
            {
              id: "t4",
              label: "Uses a builder struct that grows with realloc and is freed",
              keywords: [
                { pattern: "\\bstruct\\s+StringBuilder\\s*\\{[^}]*\\bchar\\s*\\*\\s*buf\\s*;" },
                { pattern: "\\bsb_append\\s*\\(\\s*struct\\s+StringBuilder\\s*\\*" },
                { pattern: "\\brealloc\\s*\\(" },
                { pattern: "\\bfree\\s*\\(" },
              ],
              hint: "Grow buf with realloc inside sb_append; free it in sb_free.",
            },
          ],
        },
      },
    ],
  },
];

export const C_MEMORY_MANAGEMENT_LESSONS = C_MEMORY_MANAGEMENT_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({ ...l, chapterTitle: l.chapterTitle || ch.title }))
);

export const C_MEMORY_MANAGEMENT_TOTAL_XP = 245;

applyLessonVideoLinks(C_MEMORY_MANAGEMENT_LESSONS, C_MEMORY_MANAGEMENT_VIDEO_LINKS);
