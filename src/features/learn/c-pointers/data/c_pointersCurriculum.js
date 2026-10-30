// PolyCode — C Pointers interactive course
// 5 chapters · 15 lessons · C challenges graded on real program output
// YouTube links: edit c_pointersVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { C_POINTERS_VIDEO_LINKS } from "./c_pointersVideoLinks";

const ACCENT = "#e74c3c";

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

// Source check: no array indexing with a variable such as values[i].
const NO_VARIABLE_INDEX = { pattern: "^(?![\\s\\S]*\\w\\s*\\[\\s*[a-z_]\\w*\\s*\\])" };

export const C_POINTERS_CHAPTERS = [
  {
    id: "ch-0",
    title: "Pointer Basics",
    icon: "📍",
    color: ACCENT,
    lessons: [
      {
        id: "c_pointers-0-0",
        title: "What is a Pointer?",
        xp: 10,
        chapterTitle: "Pointer Basics",
        theory: [
          text(
            "Every variable lives somewhere in memory, and every memory location has a numbered **address**. A **pointer** is a variable whose value is an address: instead of holding a number like 42, it holds *where* a number is stored. Pointers let functions change the caller's variables, walk through arrays, and build structures such as linked lists.",
          ),
          text(
            "The `&` operator gives a variable's address. A pointer is declared with a `*` after the type it points to: `int *p` means \"p holds the address of an int\". Print addresses with `%p`. The exact numbers change every time the program runs, so never rely on them.",
            {
              label: "Taking an address and storing it",
              content: `#include <stdio.h>

int main(void) {
    int age = 30;
    int *p = &age;          // p holds the address of age

    printf("age      = %d\\n", age);
    printf("&age     = %p\\n", (void *)&age);
    printf("p        = %p\\n", (void *)p);
    printf("same address? %d\\n", p == &age);
    return 0;
}`,
            },
          ),
          diagram("A pointer stores an address", [
            {
              id: "var",
              label: "int age",
              color: "#3b82f6",
              items: ["Value: 30", "Lives at some address, e.g. 0x7ffd10", "&age gives that address"],
            },
            {
              id: "ptr",
              label: "int *p",
              color: ACCENT,
              items: ["Value: 0x7ffd10 (the address of age)", "p = &age", "Has its own address too"],
            },
          ]),
          text(
            "A pointer's type says what it points to, and it can be pointed somewhere else later. All pointers on a machine are the same size (8 bytes on a 64-bit system), whatever they point to.",
            {
              label: "Re-pointing a pointer",
              content: `#include <stdio.h>

int main(void) {
    int a = 1, b = 2;
    int *p = &a;
    printf("points to a? %d\\n", p == &a);

    p = &b;
    printf("points to b? %d\\n", p == &b);

    printf("pointer size: %zu bytes\\n", sizeof(p));
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "In `int *p`, the `*` is part of the type. In `int *p, q;` only p is a pointer and q is a plain int, so declare each pointer on its own line.",
          ),
          quiz(
            "What does the `&` operator give you?",
            ["The value of a variable", "The address of a variable", "The size of a variable", "A copy of a variable"],
            1,
            "&x is the memory address where x is stored. That address is what a pointer holds.",
          ),
          quiz(
            "Which declaration makes `p` a pointer to a double?",
            ["double p*;", "double &p;", "double *p;", "pointer double p;"],
            2,
            "The * between the type and the name declares a pointer: double *p; holds the address of a double.",
          ),
        ],
        challenge: {
          instructions:
            "Declare int age = 30 and int score = 75, and a pointer int *p = &age. Print age = 30 and p holds the address of age: 1, then point p at score and print p holds the address of score: 1.",
          description: task(
            "Declare `int age = 30`, `int score = 75` and a pointer `int *p` that starts with the address of `age`. Print `age`, then print whether `p == &age` (1 or 0). Then point `p` at `score` and print whether `p == &score`. Don't print raw addresses: they change every run.",
            "age = 30\np holds the address of age: 1\np holds the address of score: 1",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int age = 30;
    int score = 75;

    // Declare the pointer here and give it the address of age

    // Print age, then compare the pointer with the address of age

    // Point it at score and compare again

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int age = 30;
    int score = 75;

    int *p = &age;
    printf("age = %d\\n", age);
    printf("p holds the address of age: %d\\n", p == &age);

    p = &score;
    printf("p holds the address of score: %d\\n", p == &score);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints age and both comparisons",
              expectedOutput: "age = 30\np holds the address of age: 1\np holds the address of score: 1",
              hint: "p == &age is 1 when p holds age's address.",
            },
            {
              id: "t2",
              label: "Declares int *p with &age and later points it at score",
              keywords: [
                { pattern: "\\bint\\s*\\*\\s*p\\s*=\\s*&\\s*age\\b" },
                { pattern: "\\bp\\s*=\\s*&\\s*score\\b" },
                { pattern: "\\bp\\s*==\\s*&\\s*age\\b" },
              ],
              hint: "int *p = &age; ... p = &score;",
            },
          ],
        },
      },
      {
        id: "c_pointers-0-1",
        title: "Dereferencing with *",
        xp: 10,
        chapterTitle: "Pointer Basics",
        theory: [
          text(
            "Holding an address is only useful if you can reach the value stored there. **Dereferencing** does that: `*p` means \"the variable p points to\". You can read it and you can assign to it, and both act on the original variable.",
          ),
          text(
            "Here `*p = 50` changes `x` itself, because p points at x. Note the two meanings of `*`: in a declaration (`int *p`) it means \"pointer\", and in an expression (`*p`) it means \"go to the address\".",
            {
              label: "Reading and writing through a pointer",
              content: `#include <stdio.h>

int main(void) {
    int x = 10;
    int *p = &x;

    printf("*p = %d\\n", *p);   // read x through p

    *p = 50;                     // write x through p
    printf("x = %d\\n", x);

    *p += 5;
    printf("x = %d\\n", x);
    return 0;
}`,
            },
          ),
          text(
            "This is how a function can change its caller's variables. In the Functions course, arguments were copies. Pass an **address** instead, and the function can dereference it to change the original. The classic example is `swap`.",
            {
              label: "swap only works with pointers",
              content: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 3, y = 8;
    swap(&x, &y);
    printf("x = %d, y = %d\\n", x, y);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Only dereference a pointer that points at a real variable. `int *p; *p = 5;` writes to a random address because p was never given one, which can crash the program or silently corrupt other data.",
          ),
          quiz(
            "With `int x = 4; int *p = &x; *p = 9;`, what is x afterwards?",
            ["4", "9", "The address of x", "It doesn't compile"],
            1,
            "*p is x itself, so assigning 9 to *p sets x to 9.",
          ),
          quiz(
            "Why does `swap(int *a, int *b)` work when `swap(int a, int b)` doesn't?",
            [
              "Pointers are faster",
              "It receives the addresses, so dereferencing changes the caller's variables instead of copies",
              "int parameters can't be changed",
              "swap must return a value",
            ],
            1,
            "With plain ints the function swaps its own copies. With addresses, *a and *b are the caller's variables.",
          ),
        ],
        challenge: {
          instructions:
            "Write void swap(int *a, int *b) and void add_bonus(int *score, int bonus). Swap x = 3 and y = 8 and print before and after, then add a bonus of 15 to score = 80 and print score = 95.",
          description: task(
            "Write `void swap(int *a, int *b)`, which swaps the two values, and `void add_bonus(int *score, int bonus)`, which adds the bonus to the caller's score. In `main`, print x and y, swap them with `swap(&x, &y)`, print them again, then call `add_bonus(&score, 15)` and print the score.",
            "before: x = 3, y = 8\nafter: x = 8, y = 3\nscore = 95",
          ),
          starterCode: `#include <stdio.h>

// Write swap and add_bonus here


int main(void) {
    int x = 3, y = 8;
    int score = 80;

    printf("before: x = %d, y = %d\\n", x, y);
    // Swap x and y, then print "after: ..."

    // Add a bonus of 15 to score, then print it

    return 0;
}`,
          solution: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void add_bonus(int *score, int bonus) {
    *score += bonus;
}

int main(void) {
    int x = 3, y = 8;
    int score = 80;

    printf("before: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("after: x = %d, y = %d\\n", x, y);

    add_bonus(&score, 15);
    printf("score = %d\\n", score);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Swaps x and y",
              outputIncludes: "after: x = 8, y = 3",
              hint: "Save *a in a temp variable before overwriting it.",
            },
            {
              id: "t2",
              label: "Prints all three lines including score = 95",
              expectedOutput: "before: x = 3, y = 8\nafter: x = 8, y = 3\nscore = 95",
              hint: "add_bonus changes the caller's score with *score += bonus;",
            },
            {
              id: "t3",
              label: "Uses pointer parameters and passes addresses",
              keywords: [
                { pattern: "\\bvoid\\s+swap\\s*\\(\\s*int\\s*\\*\\s*\\w+\\s*,\\s*int\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "\\bswap\\s*\\(\\s*&\\s*x\\s*,\\s*&\\s*y\\s*\\)" },
                { pattern: "\\badd_bonus\\s*\\(\\s*&\\s*score\\s*," },
              ],
              hint: "Call swap(&x, &y); and add_bonus(&score, 15);",
            },
          ],
        },
      },
      {
        id: "c_pointers-0-2",
        title: "NULL Pointer",
        xp: 10,
        chapterTitle: "Pointer Basics",
        theory: [
          text(
            "Sometimes a pointer has nothing to point at yet, or a function needs to say \"I found nothing\". C has a special value for that: `NULL`, an address that is guaranteed never to be a real variable. Checking for NULL before dereferencing is one of the most important habits in C.",
          ),
          text(
            "Initialise pointers to `NULL` when you don't have an address yet. Before using a pointer that might be NULL, test it: `if (p != NULL)`, or simply `if (p)`, because NULL counts as false.",
            {
              label: "Checking for NULL before dereferencing",
              content: `#include <stdio.h>

void print_value(int *p) {
    if (p == NULL) {
        printf("nothing to print\\n");
        return;
    }
    printf("value: %d\\n", *p);
}

int main(void) {
    int n = 7;
    int *found = NULL;

    print_value(found);
    found = &n;
    print_value(found);
    return 0;
}`,
            },
          ),
          text(
            "Functions that return a pointer often return `NULL` to mean \"no result\". The caller must check before using the result. Many standard functions work this way, such as `fopen` when a file can't be opened and `malloc` when memory runs out.",
            {
              label: "Returning NULL for \"not found\"",
              content: `#include <stdio.h>

int *first_positive(int *a, int *b) {
    if (*a > 0) return a;
    if (*b > 0) return b;
    return NULL;
}

int main(void) {
    int x = -3, y = 5, z = -1;

    int *r = first_positive(&x, &y);
    if (r) printf("found %d\\n", *r);

    r = first_positive(&x, &z);
    if (r == NULL) printf("no positive number\\n");
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Dereferencing NULL (`*p` when p is NULL) crashes the program with a segmentation fault. A NULL check costs almost nothing, so add one wherever a pointer could be NULL.",
          ),
          quiz(
            "What does a NULL pointer mean?",
            ["It points to the value 0", "It points to nothing valid", "It points to main", "It is the same as an uninitialised pointer"],
            1,
            "NULL is a special address that never belongs to a real object. An uninitialised pointer is different: it holds a random, unknown address.",
          ),
          quiz(
            "What happens if you run `int *p = NULL; printf(\"%d\", *p);`?",
            ["It prints 0", "It prints NULL", "The program crashes", "It doesn't compile"],
            2,
            "Dereferencing NULL is undefined behaviour and on normal systems it crashes with a segmentation fault. Check p before using *p.",
          ),
        ],
        challenge: {
          instructions:
            "Write int *larger(int *a, int *b) that returns the pointer to the larger value, or NULL if they are equal, and void print_value(int *p) that prints value: N or no value (NULL). Use them on 4 and 9, then on 5 and 5.",
          description: task(
            "Write `int *larger(int *a, int *b)` that returns the pointer to the larger of the two values, or `NULL` when they are equal. Write `void print_value(int *p)` that prints `value: N`, or `no value (NULL)` when p is NULL. In `main`, call `print_value(larger(&a, &b))` for 4 and 9, then for 5 and 5.",
            "value: 9\nno value (NULL)",
          ),
          starterCode: `#include <stdio.h>

// Write larger and print_value here


int main(void) {
    int a = 4, b = 9;
    int c = 5, d = 5;

    // print_value(larger(&a, &b)), then the same for c and d

    return 0;
}`,
          solution: `#include <stdio.h>

int *larger(int *a, int *b) {
    if (*a > *b) return a;
    if (*b > *a) return b;
    return NULL;
}

void print_value(int *p) {
    if (p == NULL) {
        printf("no value (NULL)\\n");
        return;
    }
    printf("value: %d\\n", *p);
}

int main(void) {
    int a = 4, b = 9;
    int c = 5, d = 5;

    print_value(larger(&a, &b));
    print_value(larger(&c, &d));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the larger value",
              outputIncludes: "value: 9",
              hint: "Compare *a and *b, and return the pointer, not the value.",
            },
            {
              id: "t2",
              label: "Handles equal values with NULL",
              expectedOutput: "value: 9\nno value (NULL)",
              hint: "Return NULL when the values are equal, and check for it in print_value.",
            },
            {
              id: "t3",
              label: "Returns NULL and checks for it",
              keywords: [
                { pattern: "\\breturn\\s+NULL\\s*;" },
                { pattern: "(==\\s*NULL|NULL\\s*==|!\\s*p\\b|if\\s*\\(\\s*p\\s*\\))" },
                { pattern: "\\bint\\s*\\*\\s*larger\\s*\\(" },
              ],
              hint: "int *larger(int *a, int *b) { ... return NULL; } and if (p == NULL) in print_value.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-1",
    title: "Pointer Arithmetic",
    icon: "➕",
    color: ACCENT,
    lessons: [
      {
        id: "c_pointers-1-0",
        title: "Incrementing Pointers",
        xp: 15,
        chapterTitle: "Pointer Arithmetic",
        theory: [
          text(
            "Pointers become really powerful with **arrays**: rows of values of the same type stored side by side in memory. `int arr[5] = {10, 20, 30, 40, 50};` makes five ints in a row. Because the items are next to each other, a pointer can step from one to the next with simple arithmetic.",
          ),
          text(
            "Adding 1 to a pointer doesn't add 1 byte. It moves to the **next element**, so the address grows by the size of the type: 4 bytes for an int, 8 for a double. `p + 3` points three elements further, and `*(p + 3)` is that element.",
            {
              label: "Moving through an array with a pointer",
              content: `#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;            // points to the first element

    printf("*p       = %d\\n", *p);
    p++;                     // move to the next int
    printf("after p++: %d\\n", *p);
    printf("*(p + 2) = %d\\n", *(p + 2));
    return 0;
}`,
            },
          ),
          text(
            "You can see the step size by measuring the distance in bytes between two neighbouring elements. Casting to `char *` measures in single bytes, because a char is always 1 byte.",
            {
              label: "Step size depends on the type",
              content: `#include <stdio.h>

int main(void) {
    int ints[2];
    double doubles[2];

    int *ip = ints;
    double *dp = doubles;

    printf("int step:    %d bytes\\n", (int)((char *)(ip + 1) - (char *)ip));
    printf("double step: %d bytes\\n", (int)((char *)(dp + 1) - (char *)dp));
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "C doesn't stop you moving a pointer past the end of an array. Reading `*(arr + 10)` in a 5-element array reads whatever happens to be in memory there. Keep track of the array's length yourself.",
          ),
          quiz(
            "`int *p` points to an int at address 1000 (ints are 4 bytes). What address does `p + 1` hold?",
            ["1001", "1004", "1008", "2000"],
            1,
            "Pointer arithmetic counts in elements. One int further is 4 bytes further: 1004.",
          ),
          quiz(
            "With `int arr[] = {5, 6, 7}; int *p = arr;`, what is `*(p + 2)`?",
            ["5", "6", "7", "2"],
            2,
            "p + 2 points two elements past the start, which is 7.",
          ),
        ],
        challenge: {
          instructions:
            "With int arr[5] = {10, 20, 30, 40, 50} and int *p = arr, use only the pointer to print first: 10, after p++: 20 and p + 3 points to: 50, then measure the int step in bytes.",
          description: task(
            "The starter has an array and `int *p = arr`. Using only the pointer (no `arr[...]`): print the first value, move `p` forward with `p++` and print the value it now points to, print the value at `p + 3`, and finally print the step size of an int in bytes using `(char *)(p + 1) - (char *)p`.",
            "first: 10\nafter p++: 20\np + 3 points to: 50\nint step: 4 bytes",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;

    // Print the first value through p

    // Move p forward one element and print the value

    // Print the value three elements after p

    // Print the step size of an int in bytes

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;

    printf("first: %d\\n", *p);
    p++;
    printf("after p++: %d\\n", *p);
    printf("p + 3 points to: %d\\n", *(p + 3));
    printf("int step: %d bytes\\n", (int)((char *)(p + 1) - (char *)p));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the first value and the value after p++",
              outputIncludes: ["first: 10", "after p++: 20"],
              hint: "*p reads the value; p++ moves to the next element.",
            },
            {
              id: "t2",
              label: "Prints all four lines",
              expectedOutput: "first: 10\nafter p++: 20\np + 3 points to: 50\nint step: 4 bytes",
              hint: "After p++, p points at 20, so p + 3 points at 50.",
            },
            {
              id: "t3",
              label: "Uses pointer arithmetic, not arr[...]",
              keywords: [
                { pattern: "\\bp\\s*\\+\\+|\\+\\+\\s*p\\b" },
                { pattern: "\\*\\s*\\(\\s*p\\s*\\+\\s*3\\s*\\)" },
                { pattern: "^(?![\\s\\S]*\\barr\\s*\\[\\s*\\d+\\s*\\]\\s*[^=\\s])" },
              ],
              hint: "Use *p, p++ and *(p + 3).",
            },
          ],
        },
      },
      {
        id: "c_pointers-1-1",
        title: "Pointer Subtraction",
        xp: 15,
        chapterTitle: "Pointer Arithmetic",
        theory: [
          text(
            "If two pointers point into the **same array**, subtracting them tells you how many **elements** apart they are. This turns a pointer you found while searching back into an index, and it gives the length of a range.",
          ),
          text(
            "The result has the type `ptrdiff_t`, printed with `%td`, but you can also cast it to `int`. Like addition, subtraction counts elements, not bytes.",
            {
              label: "From pointer back to index",
              content: `#include <stdio.h>

int main(void) {
    int values[6] = {4, 8, 15, 16, 23, 42};
    int *start = values;
    int *found = values + 3;     // points at 16
    int *end = values + 6;       // one past the last element

    printf("found %d at index %td\\n", *found, found - start);
    printf("elements in the array: %td\\n", end - start);
    return 0;
}`,
            },
          ),
          text(
            "A common pattern is to walk forward with a pointer until something is found, then subtract to get its position. Using a pointer **one past the end** as the stopping point is allowed, as long as you never dereference it.",
            {
              label: "Searching with a pointer",
              content: `#include <stdio.h>

int main(void) {
    char word[] = "pointer";
    char *p = word;

    while (*p != 'n') {
        p++;
    }
    printf("'n' is at index %d\\n", (int)(p - word));
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Subtracting pointers into two different arrays is undefined behaviour: the answer is meaningless. Only subtract pointers that point into the same array (or one past its end).",
          ),
          quiz(
            "`int a[10]; int *p = &a[2]; int *q = &a[7];` What is `q - p`?",
            ["5", "20", "7", "It doesn't compile"],
            0,
            "q is 5 elements after p. Pointer subtraction gives the distance in elements, not bytes.",
          ),
          quiz(
            "When is subtracting two pointers valid?",
            [
              "Always",
              "When both point into the same array (or one past its end)",
              "Only when they point to the same variable",
              "Only for char pointers",
            ],
            1,
            "The distance is only meaningful within one array. Pointers into unrelated objects can't be subtracted.",
          ),
        ],
        challenge: {
          instructions:
            "Given int readings[] = {20, 85, 99, 150, 42, 300}, walk a pointer to the first value over 100, print it, print its index using pointer subtraction, and print the distance from the first to the last element.",
          description: task(
            "The starter has `int readings[6] = {20, 85, 99, 150, 42, 300}`. Move a pointer forward until it reaches the first value over 100, then print that value and its index, calculated by **subtracting** pointers. Finally print how many elements the last one is from the first, also by subtraction.",
            "first value over 100: 150\nindex: 3\ndistance from first to last: 5",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int readings[6] = {20, 85, 99, 150, 42, 300};

    // Walk a pointer to the first value over 100

    // Print the value and its index (pointer subtraction)

    // Print the distance from the first to the last element

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int readings[6] = {20, 85, 99, 150, 42, 300};
    int *p = readings;

    while (*p <= 100) {
        p++;
    }
    printf("first value over 100: %d\\n", *p);
    printf("index: %d\\n", (int)(p - readings));

    int *first = readings;
    int *last = readings + 5;
    printf("distance from first to last: %d\\n", (int)(last - first));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Finds 150 at index 3",
              outputIncludes: ["first value over 100: 150", "index: 3"],
              hint: "Keep doing p++ while *p <= 100, then p - readings is the index.",
            },
            {
              id: "t2",
              label: "Prints all three lines",
              expectedOutput: "first value over 100: 150\nindex: 3\ndistance from first to last: 5",
              hint: "The last element is readings + 5.",
            },
            {
              id: "t3",
              label: "Uses pointer subtraction",
              keywords: [{ pattern: "\\b\\w+\\s*-\\s*readings\\b" }, { pattern: "\\b\\w+\\s*-\\s*first\\b|\\breadings\\s*\\+\\s*5\\s*\\)?\\s*-\\s*readings" }],
              hint: "p - readings gives the index; last - first gives the distance.",
            },
          ],
        },
      },
      {
        id: "c_pointers-1-2",
        title: "Comparing Pointers",
        xp: 15,
        chapterTitle: "Pointer Arithmetic",
        theory: [
          text(
            "Pointers can be compared with `==`, `!=`, `<`, `>`, `<=` and `>=`. Equality works for any two pointers of the same type (and against NULL). The ordering comparisons only make sense for pointers into the **same array**, where a smaller address means an earlier element.",
          ),
          text(
            "Comparing against an end pointer gives a clean loop: start at the first element and keep going while the pointer is before the end.",
            {
              label: "Looping until the end pointer",
              content: `#include <stdio.h>

int main(void) {
    int scores[5] = {70, 82, 91, 64, 88};
    int *end = scores + 5;

    for (int *p = scores; p < end; p++) {
        printf("%d ", *p);
    }
    printf("\\n");
    return 0;
}`,
            },
          ),
          text(
            "Two pointers moving towards each other, one from each end, solve many problems: reversing, checking for palindromes, finding pairs. The loop stops when they meet, which you detect by comparing them.",
            {
              label: "Two pointers meeting in the middle",
              content: `#include <stdio.h>

int main(void) {
    char word[] = "level";
    char *left = word;
    char *right = word + 4;     // last letter
    int palindrome = 1;

    while (left < right) {
        if (*left != *right) {
            palindrome = 0;
        }
        left++;
        right--;
    }
    printf("%s is a palindrome: %d\\n", word, palindrome);
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "`p == q` asks whether two pointers hold the same address, not whether the values are equal. To compare the values, compare `*p == *q`.",
          ),
          quiz(
            "With `int a[5]; int *p = a + 1; int *q = a + 3;`, what is `p < q`?",
            ["0", "1", "2", "It isn't allowed"],
            1,
            "Both point into the same array and p points to an earlier element, so p < q is true (1).",
          ),
          quiz(
            "`int x = 5, y = 5; int *p = &x, *q = &y;` What is `p == q`?",
            ["1, because the values are equal", "0, because they point to different variables", "5", "It doesn't compile"],
            1,
            "== on pointers compares addresses. x and y are different variables, so the addresses differ even though both hold 5.",
          ),
        ],
        challenge: {
          instructions:
            "Reverse int nums[6] = {1, 2, 3, 4, 5, 6} in place using two pointers, left and right, that swap values and move towards each other while left < right. Print before: ... and after: ...",
          description: task(
            "The starter prints the array. Reverse it **in place** with two pointers: `left` starts at the first element and `right` at the last. While `left < right`, swap the values they point to and move them towards each other. Then print the array again in the same format.",
            "before: 1 2 3 4 5 6\nafter: 6 5 4 3 2 1",
          ),
          starterCode: `#include <stdio.h>

void print_array(const char *label, int *start, int *end) {
    printf("%s:", label);
    for (int *p = start; p < end; p++) {
        printf(" %d", *p);
    }
    printf("\\n");
}

int main(void) {
    int nums[6] = {1, 2, 3, 4, 5, 6};
    print_array("before", nums, nums + 6);

    // Reverse nums in place with a left and a right pointer

    return 0;
}`,
          solution: `#include <stdio.h>

void print_array(const char *label, int *start, int *end) {
    printf("%s:", label);
    for (int *p = start; p < end; p++) {
        printf(" %d", *p);
    }
    printf("\\n");
}

int main(void) {
    int nums[6] = {1, 2, 3, 4, 5, 6};
    print_array("before", nums, nums + 6);

    int *left = nums;
    int *right = nums + 5;
    while (left < right) {
        int temp = *left;
        *left = *right;
        *right = temp;
        left++;
        right--;
    }

    print_array("after", nums, nums + 6);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the reversed array",
              expectedOutput: "before: 1 2 3 4 5 6\nafter: 6 5 4 3 2 1",
              hint: "Call print_array(\"after\", nums, nums + 6); after reversing.",
            },
            {
              id: "t2",
              label: "Uses two pointers compared with <",
              keywords: [
                { pattern: "\\bwhile\\s*\\(\\s*left\\s*<\\s*right\\s*\\)" },
                { pattern: "\\bleft\\s*\\+\\+|\\+\\+\\s*left\\b" },
                { pattern: "\\bright\\s*--|--\\s*right\\b" },
              ],
              hint: "while (left < right) { swap *left and *right; left++; right--; }",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-2",
    title: "Pointers & Arrays",
    icon: "📚",
    color: ACCENT,
    lessons: [
      {
        id: "c_pointers-2-0",
        title: "Array Name as Pointer",
        xp: 15,
        chapterTitle: "Pointers & Arrays",
        theory: [
          text(
            "Arrays and pointers are closely linked in C. In almost every expression, an array's name turns into (\"**decays** to\") a pointer to its first element. So `arr` and `&arr[0]` are the same address, and the indexing you already know is really pointer arithmetic underneath.",
          ),
          text(
            "`arr[i]` is defined as `*(arr + i)`. Both forms give the same element, and both work on pointers as well as arrays.",
            {
              label: "Indexing is pointer arithmetic",
              content: `#include <stdio.h>

int main(void) {
    int arr[4] = {3, 6, 9, 12};
    int *p = arr;

    printf("arr == &arr[0]: %d\\n", arr == &arr[0]);
    printf("arr[2] = %d, *(arr + 2) = %d\\n", arr[2], *(arr + 2));
    printf("p[3] = %d\\n", p[3]);
    return 0;
}`,
            },
          ),
          text(
            "When you pass an array to a function, only a pointer to its first element is passed. The function can't tell how long the array is, so you must pass the length too. Inside the function, `sizeof` gives the size of the pointer, not of the array.",
            {
              label: "Arrays are passed as pointers",
              content: `#include <stdio.h>

int total(const int *values, int count) {
    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += values[i];
    }
    return sum;
}

int main(void) {
    int arr[5] = {1, 2, 3, 4, 5};
    int count = sizeof(arr) / sizeof(arr[0]);   // works here: arr is a real array

    printf("count = %d\\n", count);
    printf("total = %d\\n", total(arr, count));
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Mark pointer parameters `const` when the function only reads the data, as in `const int *values`. The compiler then stops the function from changing the caller's array by accident.",
          ),
          quiz(
            "Which expression is exactly the same as `arr[3]`?",
            ["&arr + 3", "*arr + 3", "*(arr + 3)", "arr * 3"],
            2,
            "arr[3] is defined as *(arr + 3): move 3 elements from the start, then dereference. *arr + 3 would add 3 to the first value.",
          ),
          quiz(
            "Why do functions that take arrays usually also take a length parameter?",
            [
              "Because C copies the whole array",
              "Because the function only receives a pointer and can't know the array's length",
              "Because arrays can't be read inside functions",
              "It is just a style choice",
            ],
            1,
            "The array decays to a pointer to its first element. A pointer carries no length, so the caller has to pass it.",
          ),
        ],
        challenge: {
          instructions:
            "Write int sum(const int *values, int count) and int max_value(const int *values, int count). Call them with int data[5] = {12, 7, 31, 25, 5}, computing count with sizeof, and print count = 5, sum = 80, max = 31, then show data[2] == *(data + 2) is 1.",
          description: task(
            "Write `int sum(const int *values, int count)` and `int max_value(const int *values, int count)`. In `main`, compute the number of elements of `data` with `sizeof(data) / sizeof(data[0])`, pass `data` and the count to both functions, and print the results. Finally print whether `data[2] == *(data + 2)`.",
            "count = 5\nsum = 80\nmax = 31\ndata[2] == *(data + 2): 1",
          ),
          starterCode: `#include <stdio.h>

// Write sum and max_value here (pointer + count parameters)


int main(void) {
    int data[5] = {12, 7, 31, 25, 5};

    // Compute count with sizeof, then print count, sum and max

    // Print whether data[2] == *(data + 2)

    return 0;
}`,
          solution: `#include <stdio.h>

int sum(const int *values, int count) {
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += values[i];
    }
    return total;
}

int max_value(const int *values, int count) {
    int best = values[0];
    for (int i = 1; i < count; i++) {
        if (values[i] > best) {
            best = values[i];
        }
    }
    return best;
}

int main(void) {
    int data[5] = {12, 7, 31, 25, 5};
    int count = sizeof(data) / sizeof(data[0]);

    printf("count = %d\\n", count);
    printf("sum = %d\\n", sum(data, count));
    printf("max = %d\\n", max_value(data, count));
    printf("data[2] == *(data + 2): %d\\n", data[2] == *(data + 2));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the count, sum and max",
              outputIncludes: ["count = 5", "sum = 80", "max = 31"],
              hint: "Loop over count elements in each function.",
            },
            {
              id: "t2",
              label: "Prints all four lines",
              expectedOutput: "count = 5\nsum = 80\nmax = 31\ndata[2] == *(data + 2): 1",
              hint: "data[2] == *(data + 2) is always 1.",
            },
            {
              id: "t3",
              label: "Functions take a pointer and a count; count uses sizeof",
              keywords: [
                { pattern: "\\bsum\\s*\\(\\s*(const\\s+)?int\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\bmax_value\\s*\\(\\s*(const\\s+)?int\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "sizeof\\s*\\(\\s*data\\s*\\)\\s*/\\s*sizeof" },
              ],
              hint: "int sum(const int *values, int count) and count = sizeof(data) / sizeof(data[0]);",
            },
          ],
        },
      },
      {
        id: "c_pointers-2-1",
        title: "Iterating with Pointers",
        xp: 15,
        chapterTitle: "Pointers & Arrays",
        theory: [
          text(
            "You can walk through an array with an index (`arr[i]`) or with a moving pointer (`*p`, then `p++`). Both are correct and gcc produces similar code for them. The pointer style is very common in C code and libraries, especially for strings and buffers, so it is worth being fluent in it.",
          ),
          text(
            "The usual pattern sets an **end pointer** one past the last element, then moves a pointer from the start until it reaches the end.",
            {
              label: "The start/end pointer loop",
              content: `#include <stdio.h>

int main(void) {
    double prices[4] = {2.5, 4.0, 1.25, 3.75};
    double total = 0;

    for (double *p = prices; p < prices + 4; p++) {
        total += *p;
    }
    printf("total = %.2f\\n", total);
    return 0;
}`,
            },
          ),
          text(
            "Inside the loop, `*p` reads or writes the current element. Writing through the pointer changes the array itself, which makes in-place updates easy.",
            {
              label: "Updating every element through the pointer",
              content: `#include <stdio.h>

int main(void) {
    int levels[5] = {1, 2, 3, 4, 5};
    int *end = levels + 5;

    for (int *p = levels; p < end; p++) {
        *p *= 10;
    }
    for (int *p = levels; p < end; p++) {
        printf("%d ", *p);
    }
    printf("\\n");
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "`*p++` reads the current element and then moves the pointer, because `++` applies to p, not to the value. If you want to increase the value, write `(*p)++`.",
          ),
          quiz(
            "In `for (int *p = arr; p < arr + n; p++)`, what does `arr + n` point to?",
            ["The last element", "One past the last element", "The first element", "NULL"],
            1,
            "arr + n is one past the end. The loop stops when p reaches it, so the last element visited is arr + n - 1.",
          ),
          quiz(
            "What does `(*p)++` do?",
            ["Moves p to the next element", "Increases the value p points to by 1", "Reads the value and then moves p", "It doesn't compile"],
            1,
            "The parentheses make ++ apply to *p, the value. Without them, *p++ moves the pointer.",
          ),
        ],
        challenge: {
          instructions:
            "Using only a pointer that moves through int nums[7] = {3, 8, 15, 22, 7, 40, 11} (no nums[i]), print the even numbers, how many there are, and the sum of all the numbers.",
          description: task(
            "Walk through `nums` with a **pointer** (`int *p`, `p++`), without indexing like `nums[i]`. Print the even numbers on one line, then how many there were, then the sum of all seven numbers.",
            "evens: 8 22 40\ncount: 3\nsum of all: 106",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    int nums[7] = {3, 8, 15, 22, 7, 40, 11};
    int count = 0;
    int sum = 0;

    printf("evens:");
    // Loop with a pointer from nums to nums + 7:
    //   add every value to sum; print and count the even ones

    printf("\\n");
    // Print the count and the sum

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    int nums[7] = {3, 8, 15, 22, 7, 40, 11};
    int count = 0;
    int sum = 0;

    printf("evens:");
    for (int *p = nums; p < nums + 7; p++) {
        sum += *p;
        if (*p % 2 == 0) {
            printf(" %d", *p);
            count++;
        }
    }
    printf("\\n");
    printf("count: %d\\n", count);
    printf("sum of all: %d\\n", sum);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the even numbers",
              outputIncludes: "evens: 8 22 40",
              hint: "Check *p % 2 == 0 inside the loop.",
            },
            {
              id: "t2",
              label: "Prints the count and the sum",
              expectedOutput: "evens: 8 22 40\ncount: 3\nsum of all: 106",
              hint: "Add *p to sum for every element, not just the even ones.",
            },
            {
              id: "t3",
              label: "Loops with a pointer instead of an index",
              keywords: [{ pattern: "\\bfor\\s*\\(\\s*int\\s*\\*\\s*\\w+\\s*=\\s*nums\\b" }, NO_VARIABLE_INDEX],
              hint: "for (int *p = nums; p < nums + 7; p++) and use *p, not nums[i].",
            },
          ],
        },
      },
      {
        id: "c_pointers-2-2",
        title: "2D Arrays & Pointers",
        xp: 20,
        chapterTitle: "Pointers & Arrays",
        theory: [
          text(
            "A 2D array such as `int grid[3][4]` is an array of 3 rows, each an array of 4 ints. In memory it is stored **row by row** in one continuous block (\"row-major\" order): all of row 0, then all of row 1, and so on.",
          ),
          text(
            "`grid[r][c]` picks row r, then column c. Because the rows sit end to end, the element at row r, column c is `r * COLS + c` ints from the start, so you can also reach it through a plain `int *`.",
            {
              label: "Row-major layout",
              content: `#include <stdio.h>

int main(void) {
    int grid[2][3] = {
        {1, 2, 3},
        {4, 5, 6},
    };
    int *flat = &grid[0][0];

    printf("grid[1][2] = %d\\n", grid[1][2]);
    printf("flat[1 * 3 + 2] = %d\\n", flat[1 * 3 + 2]);

    for (int i = 0; i < 6; i++) {
        printf("%d ", flat[i]);
    }
    printf("\\n");
    return 0;
}`,
            },
          ),
          text(
            "When passing a 2D array to a function, the number of **columns** must be part of the parameter type, `int m[][3]`, so the compiler knows how far apart the rows are. The number of rows is passed separately.",
            {
              label: "Passing a 2D array to a function",
              content: `#include <stdio.h>

#define COLS 3

void print_grid(int m[][COLS], int rows) {
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < COLS; c++) {
            printf("%3d", m[r][c]);
        }
        printf("\\n");
    }
}

int main(void) {
    int table[2][COLS] = {{1, 2, 3}, {10, 20, 30}};
    print_grid(table, 2);
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "Inside the function, `int m[][3]` really means `int (*m)[3]`: a pointer to an array of 3 ints. Moving it by one row moves it by 3 ints.",
          ),
          quiz(
            "In `int g[3][4]`, how many ints come before `g[2][1]` in memory?",
            ["3", "7", "9", "12"],
            2,
            "Row-major order: 2 full rows of 4 ints (8) come first, then 1 more in row 2. 2 * 4 + 1 = 9.",
          ),
          quiz(
            "Which function parameter can receive `int table[5][4]`?",
            ["int m[][]", "int m[][4]", "int m[5][]", "int **m"],
            1,
            "The column count is needed to find each row. int m[][4] works; int **m is a different type (a pointer to a pointer) and doesn't match.",
          ),
        ],
        challenge: {
          instructions:
            "For int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}}, write functions that take int m[][3] and print the row sums (6 15 24), column sums (12 15 18) and the diagonal sum (15).",
          description: task(
            "Write three functions that each take the matrix as `int m[][3]`: `int row_sum(int m[][3], int r)`, `int col_sum(int m[][3], int rows, int c)` and `int diagonal_sum(int m[][3], int n)`. Use them in `main` to print the row sums, the column sums and the sum of the main diagonal (top-left to bottom-right).",
            "row sums: 6 15 24\ncolumn sums: 12 15 18\ndiagonal: 15",
          ),
          starterCode: `#include <stdio.h>

// Write row_sum, col_sum and diagonal_sum here


int main(void) {
    int m[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    };

    // Print the row sums, the column sums and the diagonal sum

    return 0;
}`,
          solution: `#include <stdio.h>

int row_sum(int m[][3], int r) {
    int total = 0;
    for (int c = 0; c < 3; c++) {
        total += m[r][c];
    }
    return total;
}

int col_sum(int m[][3], int rows, int c) {
    int total = 0;
    for (int r = 0; r < rows; r++) {
        total += m[r][c];
    }
    return total;
}

int diagonal_sum(int m[][3], int n) {
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += m[i][i];
    }
    return total;
}

int main(void) {
    int m[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    };

    printf("row sums:");
    for (int r = 0; r < 3; r++) {
        printf(" %d", row_sum(m, r));
    }
    printf("\\ncolumn sums:");
    for (int c = 0; c < 3; c++) {
        printf(" %d", col_sum(m, 3, c));
    }
    printf("\\ndiagonal: %d\\n", diagonal_sum(m, 3));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the row sums",
              outputIncludes: "row sums: 6 15 24",
              hint: "row_sum adds m[r][0] + m[r][1] + m[r][2].",
            },
            {
              id: "t2",
              label: "Prints the column sums and the diagonal",
              expectedOutput: "row sums: 6 15 24\ncolumn sums: 12 15 18\ndiagonal: 15",
              hint: "The diagonal is m[0][0] + m[1][1] + m[2][2].",
            },
            {
              id: "t3",
              label: "The functions take the matrix as int m[][3]",
              keywords: [
                { pattern: "\\brow_sum\\s*\\(\\s*int\\s+\\w+\\s*\\[\\s*\\]\\s*\\[\\s*3\\s*\\]" },
                { pattern: "\\bcol_sum\\s*\\(\\s*int\\s+\\w+\\s*\\[\\s*\\]\\s*\\[\\s*3\\s*\\]" },
                { pattern: "\\bdiagonal_sum\\s*\\(\\s*int\\s+\\w+\\s*\\[\\s*\\]\\s*\\[\\s*3\\s*\\]" },
              ],
              hint: "The parameter needs the column count: int m[][3].",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-3",
    title: "Pointers & Strings",
    icon: "🔤",
    color: ACCENT,
    lessons: [
      {
        id: "c_pointers-3-0",
        title: "char* vs char[]",
        xp: 15,
        chapterTitle: "Pointers & Strings",
        theory: [
          text(
            "C has no separate string type. A **string** is a row of `char`s ending with the special character `'\\0'` (the **null terminator**, value 0). That last character is how every string function knows where the text ends. `\"cat\"` really takes 4 bytes: `'c' 'a' 't' '\\0'`.",
          ),
          text(
            "There are two common ways to hold text, and they behave differently:\n\n- `char name[] = \"Ada\";` creates an **array** and copies the text into it. You own that memory and can change any letter.\n- `const char *greeting = \"Hi\";` creates a **pointer** to a string literal stored in read-only memory. You can read it and point the pointer elsewhere, but you must not change the letters.",
            {
              label: "Array copy vs pointer to a literal",
              content: `#include <stdio.h>

int main(void) {
    char name[] = "ada";            // a modifiable copy (4 bytes)
    const char *greeting = "Hello"; // points at read-only text

    name[0] = 'A';                   // fine: it is our array
    printf("%s, %s!\\n", greeting, name);

    greeting = "Welcome";           // fine: the pointer moves
    printf("%s, %s!\\n", greeting, name);

    printf("sizeof(name) = %zu, sizeof(greeting) = %zu\\n", sizeof(name), sizeof(greeting));
    return 0;
}`,
            },
          ),
          text(
            "Because a string ends with `'\\0'`, you can find its length by walking a pointer until it reaches the terminator. This is exactly what the library function `strlen` does.",
            {
              label: "Walking to the null terminator",
              content: `#include <stdio.h>

int main(void) {
    const char *text = "pointers";
    const char *p = text;

    while (*p != '\\0') {
        printf("[%c]", *p);
        p++;
    }
    printf("\\nlength = %d\\n", (int)(p - text));
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Never write into a string literal: `char *s = \"hi\"; s[0] = 'H';` compiles but crashes on most systems. Declare such pointers as `const char *` so the compiler catches the mistake.",
          ),
          quiz(
            "How many bytes does `char word[] = \"code\";` use?",
            ["4", "5", "8", "It depends on the compiler"],
            1,
            "4 letters plus the '\\0' terminator that the compiler adds: 5 bytes.",
          ),
          quiz(
            "Which line is safe?",
            [
              "char *s = \"cat\"; s[0] = 'b';",
              "char s[] = \"cat\"; s[0] = 'b';",
              "const char *s = \"cat\"; s[0] = 'b';",
              "All of them",
            ],
            1,
            "Only the array version owns a modifiable copy. The first writes into a read-only literal (a crash), and the third doesn't compile because of const.",
          ),
        ],
        challenge: {
          instructions:
            "Make char word[] = \"polycode\", change its first letter to uppercase, keep const char *greeting = \"Hi\", print Hi, Polycode! and the word's length counted with a pointer up to '\\0' (no strlen).",
          description: task(
            "Declare a modifiable `char word[] = \"polycode\"` and a `const char *greeting = \"Hi\"`. Change the first letter of `word` to uppercase (subtract 32, or use `'P'`). Print the word, then the greeting and the word together. Finally count the word's length by moving a pointer until it reaches `'\\0'`, without using `strlen`.",
            "Polycode\nHi, Polycode!\nlength: 8",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    // Declare the word array and the greeting pointer

    // Make the first letter uppercase, then print the word

    // Print "Hi, Polycode!" using the greeting and the word

    // Count the length with a pointer (no strlen) and print it

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    char word[] = "polycode";
    const char *greeting = "Hi";

    word[0] = word[0] - 32;
    printf("%s\\n", word);
    printf("%s, %s!\\n", greeting, word);

    const char *p = word;
    while (*p != '\\0') {
        p++;
    }
    printf("length: %d\\n", (int)(p - word));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Capitalises the word and prints the greeting",
              outputIncludes: ["Polycode", "Hi, Polycode!"],
              hint: "word[0] = word[0] - 32; turns 'p' into 'P'.",
            },
            {
              id: "t2",
              label: "Prints all three lines",
              expectedOutput: "Polycode\nHi, Polycode!\nlength: 8",
              hint: "Move a pointer until *p == '\\0'; p - word is the length.",
            },
            {
              id: "t3",
              label: "Uses an array for the word, a const pointer for the greeting, and no strlen",
              keywords: [
                { pattern: "\\bchar\\s+word\\s*\\[\\s*\\]\\s*=\\s*\"polycode\"" },
                { pattern: "\\bconst\\s+char\\s*\\*\\s*greeting\\s*=" },
                { pattern: "^(?![\\s\\S]*\\bstrlen\\s*\\()" },
                { pattern: "\\\\0|while\\s*\\(\\s*\\*\\s*\\w+\\s*\\)" },
              ],
              hint: "Count with while (*p != '\\0') p++; instead of strlen.",
            },
          ],
        },
      },
      {
        id: "c_pointers-3-1",
        title: "String Functions & Pointers",
        xp: 15,
        chapterTitle: "Pointers & Strings",
        theory: [
          text(
            "You rarely need to handle strings letter by letter: the standard library does it for you. But every one of those library functions is just a short **pointer loop**, and knowing what happens inside them explains both their speed and their dangers.",
          ),
          text(
            "`<string.h>` provides string functions such as `strlen` (length), `strcpy` (copy) and `strcat` (append). They all move a pointer along the text and stop at `'\\0'`. Writing your own versions is the best way to understand both strings and pointers.",
            {
              label: "The library versions",
              content: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buffer[32];

    strcpy(buffer, "Hello");
    strcat(buffer, ", C");
    printf("%s (%zu characters)\\n", buffer, strlen(buffer));
    return 0;
}`,
            },
          ),
          text(
            "A copy loop moves two pointers together: read from the source, write to the destination, and stop after copying the `'\\0'`. Appending is the same, except the destination pointer first moves to the end of the existing text.",
            {
              label: "Writing strlen and strcpy yourself",
              content: `#include <stdio.h>

int length(const char *s) {
    const char *p = s;
    while (*p) {
        p++;
    }
    return (int)(p - s);
}

void copy(char *dest, const char *src) {
    while (*src != '\\0') {
        *dest = *src;
        dest++;
        src++;
    }
    *dest = '\\0';           // don't forget the terminator
}

int main(void) {
    char target[20];
    copy(target, "pointer");
    printf("%s has %d letters\\n", target, length(target));
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "`strcpy` and `strcat` don't know how big the destination is. If the text doesn't fit, they write past the end of the array (a **buffer overflow**). Always make the destination large enough, and prefer `snprintf` or `strncat` with a size limit in real programs.",
          ),
          quiz(
            "Why must a string copy loop also copy (or add) the `'\\0'`?",
            [
              "To make the string uppercase",
              "Without it, functions that read the copy don't know where the text ends",
              "Because printf needs two strings",
              "It doesn't need to",
            ],
            1,
            "Every string function relies on the terminator to stop. Without it they keep reading past the text into unrelated memory.",
          ),
          quiz(
            "What is the main danger of `strcpy(dest, src)`?",
            [
              "It changes src",
              "It writes past the end of dest if src is too long",
              "It returns the wrong length",
              "It only works with literals",
            ],
            1,
            "strcpy copies until it reaches src's terminator, whatever the size of dest. A too-small dest means a buffer overflow.",
          ),
        ],
        challenge: {
          instructions:
            "Without <string.h>, write int my_strlen(const char *s), void my_strcpy(char *dest, const char *src) and void my_strcat(char *dest, const char *src) using pointers. Print my_strlen(\"pointer\") = 7, copy: hello and joined: hello, world.",
          description: task(
            "Write your own string functions with pointer loops, **without** including `<string.h>`: `int my_strlen(const char *s)`, `void my_strcpy(char *dest, const char *src)` and `void my_strcat(char *dest, const char *src)` (append src to the end of dest). In `main`, print the length of `\"pointer\"`, copy `\"hello\"` into a buffer and print it, then append `\", world\"` and print the result.",
            "my_strlen(\"pointer\") = 7\ncopy: hello\njoined: hello, world",
          ),
          starterCode: `#include <stdio.h>

// Write my_strlen, my_strcpy and my_strcat here (no <string.h>)


int main(void) {
    char buffer[32];

    // Print the length of "pointer"
    // Copy "hello" into buffer and print it
    // Append ", world" to buffer and print it

    return 0;
}`,
          solution: `#include <stdio.h>

int my_strlen(const char *s) {
    const char *p = s;
    while (*p != '\\0') {
        p++;
    }
    return (int)(p - s);
}

void my_strcpy(char *dest, const char *src) {
    while (*src != '\\0') {
        *dest++ = *src++;
    }
    *dest = '\\0';
}

void my_strcat(char *dest, const char *src) {
    while (*dest != '\\0') {
        dest++;
    }
    my_strcpy(dest, src);
}

int main(void) {
    char buffer[32];

    printf("my_strlen(\\"pointer\\") = %d\\n", my_strlen("pointer"));
    my_strcpy(buffer, "hello");
    printf("copy: %s\\n", buffer);
    my_strcat(buffer, ", world");
    printf("joined: %s\\n", buffer);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "my_strlen and my_strcpy work",
              outputIncludes: ["my_strlen(\"pointer\") = 7", "copy: hello"],
              hint: "Walk a pointer to '\\0'; copy character by character, then add '\\0'.",
            },
            {
              id: "t2",
              label: "my_strcat appends the text",
              expectedOutput: "my_strlen(\"pointer\") = 7\ncopy: hello\njoined: hello, world",
              hint: "Move dest to its '\\0' first, then copy src from there.",
            },
            {
              id: "t3",
              label: "Uses pointer parameters and doesn't include <string.h>",
              keywords: [
                { pattern: "^(?![\\s\\S]*#include\\s*<string\\.h>)" },
                { pattern: "\\bmy_strcpy\\s*\\(\\s*char\\s*\\*\\s*\\w+\\s*,\\s*const\\s+char\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "\\bmy_strcat\\s*\\(\\s*char\\s*\\*\\s*\\w+\\s*,\\s*const\\s+char\\s*\\*\\s*\\w+\\s*\\)" },
              ],
              hint: "void my_strcpy(char *dest, const char *src) and the same shape for my_strcat.",
            },
          ],
        },
      },
      {
        id: "c_pointers-3-2",
        title: "Array of Strings",
        xp: 15,
        chapterTitle: "Pointers & Strings",
        theory: [
          text(
            "A list of words is an **array of strings**. The usual way to write it is an array of `char` pointers, `const char *names[]`, where each element points to a separate string. The strings can have different lengths because each one is stored on its own.",
          ),
          text(
            "Each element is a `const char *`, so `names[i]` is a whole string (print it with `%s`) and `names[i][0]` is its first letter. `sizeof(names) / sizeof(names[0])` counts the elements, as for any array.",
            {
              label: "A list of names",
              content: `#include <stdio.h>
#include <string.h>

int main(void) {
    const char *names[] = {"Ada", "Linus", "Grace", "Dennis"};
    int count = sizeof(names) / sizeof(names[0]);

    for (int i = 0; i < count; i++) {
        printf("%d: %-7s first letter %c, %zu letters\\n",
               i, names[i], names[i][0], strlen(names[i]));
    }
    return 0;
}`,
            },
          ),
          text(
            "This is exactly the shape of `main`'s full signature: `int main(int argc, char *argv[])`. When a program is started from a terminal, `argv` holds the command-line words and `argc` says how many there are. `argv[0]` is the program's own name.",
            {
              label: "The argv pattern (simulated)",
              content: `#include <stdio.h>

void show_args(int argc, char *argv[]) {
    printf("argc = %d\\n", argc);
    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s\\n", i, argv[i]);
    }
}

int main(void) {
    char *fake_argv[] = {"./copy", "notes.txt", "backup.txt"};
    show_args(3, fake_argv);
    return 0;
}`,
            },
          ),
          diagram("const char *names[3]", [
            {
              id: "array",
              label: "The array",
              color: ACCENT,
              items: ["names[0] → address", "names[1] → address", "names[2] → address"],
            },
            {
              id: "strings",
              label: "The strings it points to",
              color: "#3b82f6",
              items: ["\"Ada\\0\"", "\"Linus\\0\"", "\"Grace\\0\""],
            },
          ]),
          callout(
            "info",
            "A 2D char array, `char names[4][10]`, also stores words, but every row is the same fixed size. An array of pointers wastes no space and lets you swap whole strings by swapping pointers.",
          ),
          quiz(
            "With `const char *colors[] = {\"red\", \"green\", \"blue\"};`, what is `colors[1][0]`?",
            ["'r'", "'g'", "\"green\"", "'b'"],
            1,
            "colors[1] is \"green\", and [0] is its first character, 'g'.",
          ),
          quiz(
            "In `int main(int argc, char *argv[])`, what is `argv[0]`?",
            ["The first argument after the program name", "The program's own name", "The number of arguments", "NULL"],
            1,
            "argv[0] is the name used to start the program. The user's arguments start at argv[1].",
          ),
        ],
        challenge: {
          instructions:
            "With const char *fruits[] = {\"apple\", \"banana\", \"kiwi\", \"cherry\"}, count the elements with sizeof, print each as index: name, then the longest fruit (the first one if there is a tie) and the count.",
          description: task(
            "Declare `const char *fruits[] = {\"apple\", \"banana\", \"kiwi\", \"cherry\"};`. Compute the number of fruits with `sizeof`, print each one as `index: name`, then print the longest name (if two have the same length, keep the first one) and the count.",
            "0: apple\n1: banana\n2: kiwi\n3: cherry\nlongest: banana\ncount: 4",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    // Declare the fruits array of strings

    // Count it with sizeof, print each fruit, then the longest and the count

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    const char *fruits[] = {"apple", "banana", "kiwi", "cherry"};
    int count = sizeof(fruits) / sizeof(fruits[0]);
    const char *longest = fruits[0];

    for (int i = 0; i < count; i++) {
        printf("%d: %s\\n", i, fruits[i]);
        if (strlen(fruits[i]) > strlen(longest)) {
            longest = fruits[i];
        }
    }
    printf("longest: %s\\n", longest);
    printf("count: %d\\n", count);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints each fruit with its index",
              outputIncludes: "0: apple\n1: banana\n2: kiwi\n3: cherry",
              hint: "printf(\"%d: %s\\n\", i, fruits[i]); in a loop.",
            },
            {
              id: "t2",
              label: "Prints the longest fruit and the count",
              expectedOutput: "0: apple\n1: banana\n2: kiwi\n3: cherry\nlongest: banana\ncount: 4",
              hint: "Only replace longest when a name is strictly longer, so banana wins the tie with cherry.",
            },
            {
              id: "t3",
              label: "Uses an array of string pointers counted with sizeof",
              keywords: [
                { pattern: "\\bconst\\s+char\\s*\\*\\s*fruits\\s*\\[\\s*\\]" },
                { pattern: "sizeof\\s*\\(\\s*fruits\\s*\\)\\s*/\\s*sizeof" },
              ],
              hint: "int count = sizeof(fruits) / sizeof(fruits[0]);",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-4",
    title: "Advanced Pointers",
    icon: "⚡",
    color: ACCENT,
    lessons: [
      {
        id: "c_pointers-4-0",
        title: "Double Pointers (**)",
        xp: 20,
        chapterTitle: "Advanced Pointers",
        theory: [
          text(
            "A pointer is a variable, so it has an address too, and that address can be stored in another pointer. A **pointer to a pointer** is declared with two stars: `int **pp`. `*pp` is the pointer, and `**pp` is the value at the end of the chain.",
          ),
          text(
            "Follow the chain one star at a time: `pp` holds the address of `p`, and `p` holds the address of `x`.",
            {
              label: "Two levels of pointers",
              content: `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;
    int **pp = &p;

    printf("x   = %d\\n", x);
    printf("*p  = %d\\n", *p);
    printf("**pp = %d\\n", **pp);

    **pp = 7;                 // changes x
    printf("x is now %d\\n", x);
    return 0;
}`,
            },
          ),
          text(
            "The main reason to use `**` is to let a function **change a pointer** that belongs to the caller. A function that receives `int *p` gets a copy of the pointer, so pointing it elsewhere changes nothing outside. A function that receives `int **pp` can set `*pp` to a new address, and the caller's pointer moves.",
            {
              label: "A function that moves the caller's pointer",
              content: `#include <stdio.h>

void point_to_bigger(int *a, int *b, int **result) {
    *result = (*a > *b) ? a : b;
}

int main(void) {
    int x = 3, y = 11;
    int *bigger = NULL;

    point_to_bigger(&x, &y, &bigger);
    printf("bigger points to %d\\n", *bigger);
    return 0;
}`,
            },
          ),
          diagram("int **pp → int *p → int x", [
            { id: "pp", label: "int **pp", color: "#a855f7", items: ["Holds the address of p", "*pp is p"] },
            { id: "p", label: "int *p", color: ACCENT, items: ["Holds the address of x", "*p is x", "**pp is x"] },
            { id: "x", label: "int x", color: "#3b82f6", items: ["Holds 42"] },
          ]),
          callout(
            "info",
            "You have already met double pointers: `char *argv[]` in a parameter list means `char **argv`, a pointer to the first of several string pointers.",
          ),
          quiz(
            "With `int x = 5; int *p = &x; int **pp = &p;`, what is `**pp`?",
            ["The address of p", "The address of x", "5", "It doesn't compile"],
            2,
            "*pp is p, and *p is x, so **pp is x's value, 5.",
          ),
          quiz(
            "Why would a function take an `int **` parameter?",
            [
              "To read an int faster",
              "To change which address the caller's pointer holds",
              "To return two values",
              "Because arrays require it",
            ],
            1,
            "With int ** the function can assign *result = some_address, which updates the caller's pointer variable itself.",
          ),
        ],
        challenge: {
          instructions:
            "Write void point_to_max(int *values, int count, int **result) that makes the caller's pointer point at the largest element. Use it on int data[4] = {4, 19, 7, 12}, print max is 19 at index 1, then set the maximum to 0 through the pointer and print after: 4 0 7 12.",
          description: task(
            "Write `void point_to_max(int *values, int count, int **result)` that sets the **caller's pointer** (through `result`) to the address of the largest element. In `main`, call it with `&best`, print the value and its index (by pointer subtraction), then write 0 into that element through `best` and print the array.",
            "max is 19 at index 1\nafter: 4 0 7 12",
          ),
          starterCode: `#include <stdio.h>

// Write point_to_max here


int main(void) {
    int data[4] = {4, 19, 7, 12};
    int *best = NULL;

    // Call point_to_max so that best points at the largest element
    // Print "max is ... at index ..."
    // Set that element to 0 through best, then print the array

    return 0;
}`,
          solution: `#include <stdio.h>

void point_to_max(int *values, int count, int **result) {
    *result = values;
    for (int *p = values + 1; p < values + count; p++) {
        if (*p > **result) {
            *result = p;
        }
    }
}

int main(void) {
    int data[4] = {4, 19, 7, 12};
    int *best = NULL;

    point_to_max(data, 4, &best);
    printf("max is %d at index %d\\n", *best, (int)(best - data));

    *best = 0;
    printf("after:");
    for (int *p = data; p < data + 4; p++) {
        printf(" %d", *p);
    }
    printf("\\n");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Finds the maximum and its index",
              outputIncludes: "max is 19 at index 1",
              hint: "Set *result = the address of the biggest element; best - data is the index.",
            },
            {
              id: "t2",
              label: "Changes the array through the pointer",
              expectedOutput: "max is 19 at index 1\nafter: 4 0 7 12",
              hint: "*best = 0; writes into data itself.",
            },
            {
              id: "t3",
              label: "Uses an int ** parameter and passes &best",
              keywords: [
                { pattern: "\\bpoint_to_max\\s*\\([^)]*\\bint\\s*\\*\\s*\\*\\s*result\\s*\\)" },
                { pattern: "\\*\\s*result\\s*=" },
                { pattern: "\\bpoint_to_max\\s*\\([^;]*&\\s*best\\s*\\)" },
              ],
              hint: "void point_to_max(int *values, int count, int **result) { *result = ...; }",
            },
          ],
        },
      },
      {
        id: "c_pointers-4-1",
        title: "Pointers to Structs",
        xp: 20,
        chapterTitle: "Advanced Pointers",
        theory: [
          text(
            "A **struct** groups related values of different types into one new type, for example a bank account with an owner's name and a balance. Structs are usually passed to functions by pointer: copying a big struct is slow, and a pointer lets the function update the caller's struct.",
          ),
          text(
            "Define the type with `struct Name { ... };`, then declare variables of it. Use a dot to reach a member of a struct: `acc.balance`. Through a pointer you would write `(*p).balance`, which is so common that C has a shortcut: the arrow, `p->balance`.",
            {
              label: "Dot for structs, arrow for pointers",
              content: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point a = {3, 4};
    struct Point *p = &a;

    printf("a.x = %d, a.y = %d\\n", a.x, a.y);
    printf("(*p).x = %d\\n", (*p).x);
    p->y = 10;                        // same as (*p).y = 10
    printf("a.y is now %d\\n", a.y);
    return 0;
}`,
            },
          ),
          text(
            "Functions that change a struct take a pointer to it. Functions that only read it take a `const` pointer, which avoids a copy and promises not to modify it.",
            {
              label: "Updating a struct through a pointer",
              content: `#include <stdio.h>

struct Player {
    char name[16];
    int score;
};

void add_points(struct Player *p, int points) {
    p->score += points;
}

void show(const struct Player *p) {
    printf("%s has %d points\\n", p->name, p->score);
}

int main(void) {
    struct Player sam = {"Sam", 10};
    add_points(&sam, 25);
    show(&sam);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Passing a struct by value (`void add_points(struct Player p, ...)`) gives the function a copy. Changes to `p.score` would vanish when it returns, just like with plain ints.",
          ),
          quiz(
            "With `struct Point *p = &pt;`, which line sets pt's x to 5?",
            ["p.x = 5;", "p->x = 5;", "*p.x = 5;", "&p->x = 5;"],
            1,
            "p->x means (*p).x. *p.x doesn't work because . binds tighter than *, so it means *(p.x).",
          ),
          quiz(
            "Why are structs often passed to functions as pointers?",
            [
              "Structs can't be passed by value",
              "It avoids copying the whole struct and lets the function change the original",
              "The arrow operator is faster than the dot",
              "Because structs live in read-only memory",
            ],
            1,
            "A pointer is small to pass, and the function can modify the caller's struct through it. Use const when it should only read.",
          ),
        ],
        challenge: {
          instructions:
            "Define struct Account { char owner[20]; double balance; }. Write void deposit(struct Account *acc, double amount), int withdraw(struct Account *acc, double amount) (returns 0 if there isn't enough money) and void print_account(const struct Account *acc). Run the steps shown and print the output.",
          description: task(
            "Define `struct Account` with `char owner[20]` and `double balance`. Write `void print_account(const struct Account *acc)` (prints `owner: balance` with 2 decimals), `void deposit(struct Account *acc, double amount)`, and `int withdraw(struct Account *acc, double amount)`, which returns 0 and changes nothing when the balance is too low, or 1 after withdrawing. In `main`, start Ada with 100, print, deposit 50, print, try to withdraw 500, then 30 (printing `failed` or `ok`), and print again.",
            "Ada: 100.00\nAda: 150.00\nwithdraw 500: failed\nwithdraw 30: ok\nAda: 120.00",
          ),
          starterCode: `#include <stdio.h>

// Define struct Account here

// Write print_account, deposit and withdraw here


int main(void) {
    // Create Ada's account with 100.00 and follow the steps in the task

    return 0;
}`,
          solution: `#include <stdio.h>

struct Account {
    char owner[20];
    double balance;
};

void print_account(const struct Account *acc) {
    printf("%s: %.2f\\n", acc->owner, acc->balance);
}

void deposit(struct Account *acc, double amount) {
    acc->balance += amount;
}

int withdraw(struct Account *acc, double amount) {
    if (amount > acc->balance) {
        return 0;
    }
    acc->balance -= amount;
    return 1;
}

int main(void) {
    struct Account ada = {"Ada", 100.0};

    print_account(&ada);
    deposit(&ada, 50);
    print_account(&ada);

    printf("withdraw 500: %s\\n", withdraw(&ada, 500) ? "ok" : "failed");
    printf("withdraw 30: %s\\n", withdraw(&ada, 30) ? "ok" : "failed");
    print_account(&ada);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Deposits and prints the balance",
              outputIncludes: ["Ada: 100.00", "Ada: 150.00"],
              hint: "deposit does acc->balance += amount;",
            },
            {
              id: "t2",
              label: "Refuses the large withdrawal and allows the small one",
              expectedOutput: "Ada: 100.00\nAda: 150.00\nwithdraw 500: failed\nwithdraw 30: ok\nAda: 120.00",
              hint: "Return 0 before changing the balance when amount > balance.",
            },
            {
              id: "t3",
              label: "Uses struct pointers and the -> operator",
              keywords: [
                { pattern: "\\bstruct\\s+Account\\s*\\{" },
                { pattern: "\\bdeposit\\s*\\(\\s*struct\\s+Account\\s*\\*\\s*\\w+" },
                { pattern: "\\bwithdraw\\s*\\(\\s*struct\\s+Account\\s*\\*\\s*\\w+" },
                { pattern: "->\\s*balance\\b" },
              ],
              hint: "Take struct Account *acc and use acc->balance.",
            },
          ],
        },
      },
      {
        id: "c_pointers-4-2",
        title: "Capstone: Linked List Node",
        xp: 30,
        chapterTitle: "Advanced Pointers",
        theory: [
          text(
            "Arrays have a fixed size. A **linked list** grows one item at a time: each item, called a **node**, holds a value and a pointer to the next node. The last node's pointer is `NULL`, which marks the end. Everything from this course comes together here: structs, pointers to structs, NULL and pointers that change.",
          ),
          text(
            "A node is a struct that contains a pointer to its own type. The list itself is just a pointer to the first node, called the **head**. To visit every node, start at the head and follow `->next` until you reach NULL.",
            {
              label: "Three nodes linked by hand",
              content: `#include <stdio.h>

struct Node {
    int value;
    struct Node *next;
};

int main(void) {
    struct Node c = {30, NULL};
    struct Node b = {20, &c};
    struct Node a = {10, &b};
    struct Node *head = &a;

    for (struct Node *n = head; n != NULL; n = n->next) {
        printf("%d -> ", n->value);
    }
    printf("NULL\\n");
    return 0;
}`,
            },
          ),
          text(
            "Real lists create nodes while the program runs. `malloc(sizeof(struct Node))` reserves memory for one node and returns a pointer to it (or NULL if memory runs out); `free` gives it back when you're done. Adding at the front is the simplest insert: the new node points to the old head and becomes the new head. (The Memory Management course covers malloc in depth.)",
            {
              label: "Adding nodes with malloc and freeing them",
              content: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int value;
    struct Node *next;
};

struct Node *push_front(struct Node *head, int value) {
    struct Node *node = malloc(sizeof(struct Node));
    if (node == NULL) {
        return head;            // out of memory: leave the list unchanged
    }
    node->value = value;
    node->next = head;
    return node;                // the new node is the new head
}

int main(void) {
    struct Node *head = NULL;
    head = push_front(head, 1);
    head = push_front(head, 2);

    for (struct Node *n = head; n != NULL; n = n->next) {
        printf("%d ", n->value);
    }
    printf("\\n");

    while (head != NULL) {      // free every node
        struct Node *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}`,
            },
          ),
          diagram("A linked list after push_front 5, 12, 7", [
            { id: "head", label: "head", color: "#a855f7", items: ["Points to the first node"] },
            { id: "n1", label: "Node", color: ACCENT, items: ["value: 7", "next → the 12 node"] },
            { id: "n2", label: "Node", color: ACCENT, items: ["value: 12", "next → the 5 node"] },
            { id: "n3", label: "Node", color: ACCENT, items: ["value: 5", "next: NULL (the end)"] },
          ]),
          callout(
            "warning",
            "When freeing a list, save `node->next` **before** calling `free(node)`. After free, the node's memory no longer belongs to you, so reading `node->next` from it is a bug.",
          ),
          quiz(
            "How do you know you've reached the end of a linked list?",
            ["The value is 0", "The node's next pointer is NULL", "The node's address is the largest", "You count to 10"],
            1,
            "The last node's next is NULL. A loop such as for (n = head; n != NULL; n = n->next) stops there.",
          ),
          quiz(
            "Why does `push_front` return the new head instead of being void?",
            [
              "Because malloc requires it",
              "The caller's head pointer must change to the new node, and the function only has a copy of it",
              "To make the list sorted",
              "It doesn't need to",
            ],
            1,
            "head was passed by value. Returning the new node and assigning head = push_front(head, v) updates the caller's pointer. (Taking struct Node **head would also work.)",
          ),
        ],
        challenge: {
          instructions:
            "Read numbers from input (5 12 7 30) and add each to the front of a linked list with malloc. Print the list as 30 -> 7 -> 12 -> 5 -> NULL, then length: 4, sum: 54, contains 12: yes, contains 99: no, and free every node.",
          stdin: "5 12 7 30",
          description: task(
            "Build a linked list. Define `struct Node { int value; struct Node *next; }`. Write `push_front` (with `malloc`), `print_list` (format below), `list_length`, `list_sum`, `contains` (returns 1 or 0) and `free_list`. In `main`, read numbers from the input until it ends (the test gives `5 12 7 30`), push each one to the front, print the list and the results, then free every node.",
            "30 -> 7 -> 12 -> 5 -> NULL\nlength: 4\nsum: 54\ncontains 12: yes\ncontains 99: no",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

// 1. Define struct Node with an int value and a next pointer

// 2. Write push_front, print_list, list_length, list_sum, contains and free_list

int main(void) {
    // 3. Start with an empty list (NULL)
    //    Read numbers with scanf until the input ends; push each to the front

    // 4. Print the list, its length and sum, whether it contains 12 and 99

    // 5. Free every node

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int value;
    struct Node *next;
};

struct Node *push_front(struct Node *head, int value) {
    struct Node *node = malloc(sizeof(struct Node));
    if (node == NULL) {
        return head;
    }
    node->value = value;
    node->next = head;
    return node;
}

void print_list(const struct Node *head) {
    for (const struct Node *n = head; n != NULL; n = n->next) {
        printf("%d -> ", n->value);
    }
    printf("NULL\\n");
}

int list_length(const struct Node *head) {
    int count = 0;
    for (const struct Node *n = head; n != NULL; n = n->next) {
        count++;
    }
    return count;
}

int list_sum(const struct Node *head) {
    int total = 0;
    for (const struct Node *n = head; n != NULL; n = n->next) {
        total += n->value;
    }
    return total;
}

int contains(const struct Node *head, int target) {
    for (const struct Node *n = head; n != NULL; n = n->next) {
        if (n->value == target) {
            return 1;
        }
    }
    return 0;
}

void free_list(struct Node *head) {
    while (head != NULL) {
        struct Node *next = head->next;
        free(head);
        head = next;
    }
}

int main(void) {
    struct Node *head = NULL;
    int value;

    while (scanf("%d", &value) == 1) {
        head = push_front(head, value);
    }

    print_list(head);
    printf("length: %d\\n", list_length(head));
    printf("sum: %d\\n", list_sum(head));
    printf("contains 12: %s\\n", contains(head, 12) ? "yes" : "no");
    printf("contains 99: %s\\n", contains(head, 99) ? "yes" : "no");

    free_list(head);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Builds the list in reverse input order",
              outputIncludes: "30 -> 7 -> 12 -> 5 -> NULL",
              hint: "push_front makes each new node the head, so the last number read comes first.",
            },
            {
              id: "t2",
              label: "Prints the length, the sum and both searches",
              expectedOutput: "30 -> 7 -> 12 -> 5 -> NULL\nlength: 4\nsum: 54\ncontains 12: yes\ncontains 99: no",
              hint: "Follow n = n->next until n is NULL in each function.",
            },
            {
              id: "t3",
              label: "Uses a self-referencing struct, malloc and free",
              keywords: [
                { pattern: "\\bstruct\\s+Node\\s*\\{[^}]*\\bstruct\\s+Node\\s*\\*\\s*next\\s*;" },
                { pattern: "\\bmalloc\\s*\\(\\s*sizeof" },
                { pattern: "\\bfree\\s*\\(" },
                { pattern: "->\\s*next\\b" },
              ],
              hint: "struct Node { int value; struct Node *next; }; allocate with malloc(sizeof(struct Node)), release with free.",
            },
          ],
        },
      },
    ],
  },
];

export const C_POINTERS_LESSONS = C_POINTERS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({ ...l, chapterTitle: l.chapterTitle || ch.title }))
);

export const C_POINTERS_TOTAL_XP = 240;

applyLessonVideoLinks(C_POINTERS_LESSONS, C_POINTERS_VIDEO_LINKS);
