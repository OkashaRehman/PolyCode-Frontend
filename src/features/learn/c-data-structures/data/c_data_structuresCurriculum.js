// PolyCode — C Data Structures interactive course
// 5 chapters · 15 lessons · C challenges graded on real program output
// YouTube links: edit c_data_structuresVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { C_DATA_STRUCTURES_VIDEO_LINKS } from "./c_data_structuresVideoLinks";

const ACCENT = "#2980b9";

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

// Shared starter code for the linked-list lessons.
const NODE_STRUCT = `struct Node {
    int value;
    struct Node *next;
};`;

const PRINT_LIST = `void print_list(const char *label, const struct Node *head) {
    printf("%s: ", label);
    for (const struct Node *n = head; n != NULL; n = n->next) {
        printf("%d -> ", n->value);
    }
    printf("NULL\\n");
}`;

// Shared starter code for the tree lessons.
const TREE_STRUCT = `struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
};`;

export const C_DATA_STRUCTURES_CHAPTERS = [
  {
    id: "ch-0",
    title: "Structs & Arrays",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "c_data_structures-0-0",
        title: "struct in C",
        xp: 10,
        chapterTitle: "Structs & Arrays",
        theory: [
          text(
            "Real data comes in groups: a student has a name, an age and a GPA; a point has an x and a y. A **struct** bundles related values of different types into one new type, so you can pass a whole student around as one thing instead of three separate variables.",
          ),
          text(
            "Define the shape once with `struct Name { members };`, then declare variables of that type. Initialise members in order inside braces, or by name with **designated initialisers** (`.age = 20`). Reach each member with a dot: `s.name`, `s.age`.",
            {
              label: "Defining and using a struct",
              content: `#include <stdio.h>

struct Student {
    char name[20];
    int age;
    double gpa;
};

int main(void) {
    struct Student a = {"Ali", 20, 3.4};                       // in order
    struct Student b = {.name = "Sara", .gpa = 3.85, .age = 22}; // by name

    printf("%s is %d, GPA %.2f\\n", a.name, a.age, a.gpa);
    printf("%s is %d, GPA %.2f\\n", b.name, b.age, b.gpa);
    printf("one Student takes %zu bytes\\n", sizeof(struct Student));
    return 0;
}`,
            },
          ),
          text(
            "Assigning one struct to another **copies every member**, including arrays inside it. The copy is independent: changing it doesn't affect the original. Structs can also contain other structs.",
            {
              label: "Copying and nesting structs",
              content: `#include <stdio.h>

struct Date {
    int day, month, year;
};

struct Event {
    char title[24];
    struct Date when;          // a struct inside a struct
};

int main(void) {
    struct Event launch = {"Launch", {12, 10, 2026}};
    struct Event rerun = launch;          // full copy
    rerun.when.year = 2027;

    printf("%s on %d/%d/%d\\n", launch.title, launch.when.day,
           launch.when.month, launch.when.year);
    printf("copy is in %d, original still %d\\n", rerun.when.year, launch.when.year);
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Two structs can't be compared with `==`. Compare them member by member (and use `strcmp` for text members).",
          ),
          quiz(
            "With `struct Student s;`, how do you set the age to 19?",
            ["s->age = 19;", "s.age = 19;", "Student.age = 19;", "age(s) = 19;"],
            1,
            "The dot operator reaches a member of a struct variable. -> is for a pointer to a struct.",
          ),
          quiz(
            "After `struct Student c = a; c.age = 30;`, what is `a.age`?",
            ["30", "Unchanged", "0", "It doesn't compile"],
            1,
            "Assignment copies the whole struct, so c is independent of a.",
          ),
        ],
        challenge: {
          instructions:
            "Define struct Student { char name[20]; int age; double gpa; }. Write void print_student(struct Student s) that prints name (age) GPA x.xx. Print Ali (20, 3.40) and Sara (22, 3.85), then copy Ali into c, change the copy's age to 21 and print both ages.",
          description: task(
            "Define `struct Student` with `char name[20]`, `int age` and `double gpa`. Write `void print_student(struct Student s)` that prints a student as `NAME (AGE) GPA X.XX`. Create Ali (20, 3.40) and Sara (22, 3.85) and print them. Then copy Ali into a new variable `c`, set the copy's age to 21, and print both ages to show the copy is independent.",
            "Ali (20) GPA 3.40\nSara (22) GPA 3.85\ncopy age: 21, original age: 20",
          ),
          starterCode: `#include <stdio.h>

// Define struct Student here

// Write print_student here


int main(void) {
    // Create Ali and Sara and print them

    // Copy Ali into c, change c's age to 21, print both ages

    return 0;
}`,
          solution: `#include <stdio.h>

struct Student {
    char name[20];
    int age;
    double gpa;
};

void print_student(struct Student s) {
    printf("%s (%d) GPA %.2f\\n", s.name, s.age, s.gpa);
}

int main(void) {
    struct Student a = {"Ali", 20, 3.40};
    struct Student b = {"Sara", 22, 3.85};

    print_student(a);
    print_student(b);

    struct Student c = a;
    c.age = 21;
    printf("copy age: %d, original age: %d\\n", c.age, a.age);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints both students",
              outputIncludes: ["Ali (20) GPA 3.40", "Sara (22) GPA 3.85"],
              hint: "printf(\"%s (%d) GPA %.2f\\n\", s.name, s.age, s.gpa);",
            },
            {
              id: "t2",
              label: "Shows that the copy is independent",
              expectedOutput: "Ali (20) GPA 3.40\nSara (22) GPA 3.85\ncopy age: 21, original age: 20",
              hint: "struct Student c = a; copies everything; then change only c.age.",
            },
            {
              id: "t3",
              label: "Defines struct Student and passes it to print_student",
              keywords: [
                { pattern: "\\bstruct\\s+Student\\s*\\{[^}]*char\\s+name\\s*\\[[^}]*\\bint\\s+age\\s*;[^}]*\\bdouble\\s+gpa\\s*;" },
                { pattern: "\\bvoid\\s+print_student\\s*\\(\\s*struct\\s+Student\\s+\\w+\\s*\\)" },
                { pattern: "\\bstruct\\s+Student\\s+c\\s*=\\s*\\w+\\s*;" },
              ],
              hint: "struct Student { char name[20]; int age; double gpa; };",
            },
          ],
        },
      },
      {
        id: "c_data_structures-0-1",
        title: "typedef with struct",
        xp: 10,
        chapterTitle: "Structs & Arrays",
        theory: [
          text(
            "Writing `struct Student` everywhere gets repetitive. `typedef` gives an existing type a new name, so you can write `Student` instead. Most C codebases use typedef for their data types; it makes declarations shorter and easier to read.",
          ),
          text(
            "`typedef struct { ... } Point;` defines the struct and names it `Point` in one step. After that, `Point` works like any built-in type: in variables, parameters, return types and inside other structs.",
            {
              label: "typedef in action",
              content: `#include <stdio.h>

typedef struct {
    double x;
    double y;
} Point;

Point midpoint(Point a, Point b) {
    Point m = {(a.x + b.x) / 2, (a.y + b.y) / 2};
    return m;
}

int main(void) {
    Point a = {0, 0};
    Point b = {6, 4};
    Point m = midpoint(a, b);
    printf("midpoint: (%.1f, %.1f)\\n", m.x, m.y);
    return 0;
}`,
            },
          ),
          text(
            "typedef is useful for other types too: give a meaningful name to a number type (`typedef unsigned int UserId;`), or to an `enum`, a list of named constants. Self-referencing structs, such as list nodes, still need a struct tag because the struct mentions itself before the typedef name exists.",
            {
              label: "typedef with enum and a self-referencing struct",
              content: `#include <stdio.h>
#include <stddef.h>

typedef enum { RED, YELLOW, GREEN } Light;

typedef struct Node {
    int value;
    struct Node *next;     // the tag is needed here
} Node;

int main(void) {
    Light now = YELLOW;
    printf("light code: %d\\n", now);

    Node second = {2, NULL};
    Node first = {1, &second};
    printf("%d then %d\\n", first.value, first.next->value);
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Avoid hiding pointers behind typedefs (`typedef Point *PointPtr;`). Seeing the `*` in a declaration reminds readers that a value is a pointer.",
          ),
          quiz(
            "After `typedef struct { int w, h; } Size;`, which declaration is correct?",
            ["struct Size s;", "Size s;", "typedef Size s;", "Size.s;"],
            1,
            "The typedef name Size is used directly as a type. struct Size would refer to a struct tag, which doesn't exist here.",
          ),
          quiz(
            "Why does `typedef struct Node { int value; struct Node *next; } Node;` need the tag `Node` after `struct`?",
            [
              "Tags are always required",
              "The member next refers to the struct before the typedef name has been declared",
              "To make the struct larger",
              "Because of the int member",
            ],
            1,
            "Inside the braces the typedef name doesn't exist yet, so the struct must refer to itself through its tag.",
          ),
        ],
        challenge: {
          instructions:
            "Create typedef struct { double x, y; } Point and typedef struct { Point top_left; Point bottom_right; } Rect. Write double rect_area(Rect r) and Point rect_center(Rect r). For the rectangle (0, 3) to (4, 0), print width, height, area and center.",
          description: task(
            "Use `typedef` to create two types: `Point` with `double x, y`, and `Rect` made of two Points, `top_left` and `bottom_right`. Write `double rect_area(Rect r)` and `Point rect_center(Rect r)`. For the rectangle with top-left (0, 3) and bottom-right (4, 0), print its width, height, area and center.",
            "width: 4.00, height: 3.00\narea: 12.00\ncenter: (2.00, 1.50)",
          ),
          starterCode: `#include <stdio.h>

// typedef Point and Rect here

// Write rect_area and rect_center here


int main(void) {
    // Create the rectangle (0, 3) to (4, 0) and print the four values

    return 0;
}`,
          solution: `#include <stdio.h>

typedef struct {
    double x, y;
} Point;

typedef struct {
    Point top_left;
    Point bottom_right;
} Rect;

double rect_width(Rect r) {
    return r.bottom_right.x - r.top_left.x;
}

double rect_height(Rect r) {
    return r.top_left.y - r.bottom_right.y;
}

double rect_area(Rect r) {
    return rect_width(r) * rect_height(r);
}

Point rect_center(Rect r) {
    Point c = {(r.top_left.x + r.bottom_right.x) / 2, (r.top_left.y + r.bottom_right.y) / 2};
    return c;
}

int main(void) {
    Rect r = {{0, 3}, {4, 0}};
    Point c = rect_center(r);

    printf("width: %.2f, height: %.2f\\n", rect_width(r), rect_height(r));
    printf("area: %.2f\\n", rect_area(r));
    printf("center: (%.2f, %.2f)\\n", c.x, c.y);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the area and center",
              outputIncludes: ["area: 12.00", "center: (2.00, 1.50)"],
              hint: "The center is the average of the two corners' x and y.",
            },
            {
              id: "t2",
              label: "Prints all three lines",
              expectedOutput: "width: 4.00, height: 3.00\narea: 12.00\ncenter: (2.00, 1.50)",
              hint: "width = bottom_right.x - top_left.x; height = top_left.y - bottom_right.y.",
            },
            {
              id: "t3",
              label: "Uses typedef for Point and Rect and returns a Point",
              keywords: [
                { pattern: "\\btypedef\\s+struct\\s*\\{[^}]*\\}\\s*Point\\s*;" },
                { pattern: "\\btypedef\\s+struct\\s*\\{[^}]*\\bPoint\\s+\\w+[^}]*\\}\\s*Rect\\s*;" },
                { pattern: "\\bdouble\\s+rect_area\\s*\\(\\s*Rect\\s+\\w+\\s*\\)" },
                { pattern: "\\bPoint\\s+rect_center\\s*\\(\\s*Rect\\s+\\w+\\s*\\)" },
              ],
              hint: "typedef struct { double x, y; } Point; then Rect contains two Points.",
            },
          ],
        },
      },
      {
        id: "c_data_structures-0-2",
        title: "Arrays of Structs",
        xp: 15,
        chapterTitle: "Structs & Arrays",
        theory: [
          text(
            "An **array of structs** is a table of records: each element is one row, and each member is a column. It is the simplest data structure for a list of products, students or readings, and it stores everything in one contiguous block, which makes it fast to loop over.",
          ),
          text(
            "Index the array, then use the dot: `items[i].price`. Loops over the array read like queries over a table: totals, filters, minimums.",
            {
              label: "A small table of records",
              content: `#include <stdio.h>

typedef struct {
    char city[16];
    double temp;
} Reading;

int main(void) {
    Reading readings[3] = {
        {"Lahore", 31.5},
        {"Oslo", 4.0},
        {"Cairo", 28.0},
    };

    double sum = 0;
    for (int i = 0; i < 3; i++) {
        printf("%-7s %5.1f\\n", readings[i].city, readings[i].temp);
        sum += readings[i].temp;
    }
    printf("average: %.1f\\n", sum / 3);
    return 0;
}`,
            },
          ),
          text(
            "Pass the array and its length to functions. Use a `const` pointer when the function only reads, and return an **index** (or -1) when searching, so the caller can use the record.",
            {
              label: "Searching a table in a function",
              content: `#include <stdio.h>
#include <string.h>

typedef struct {
    char code[8];
    int seats;
} Flight;

int find_flight(const Flight *flights, int count, const char *code) {
    for (int i = 0; i < count; i++) {
        if (strcmp(flights[i].code, code) == 0) {
            return i;
        }
    }
    return -1;
}

int main(void) {
    Flight flights[3] = {{"PK301", 12}, {"EK623", 0}, {"QR611", 40}};
    int i = find_flight(flights, 3, "EK623");
    if (i >= 0) {
        printf("%s has %d seats left\\n", flights[i].code, flights[i].seats);
    }
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "This layout is often called an \"array of structures\". It keeps each record's fields together, which is ideal when you usually work with whole records at a time.",
          ),
          quiz(
            "With `Product items[10];`, how do you read the price of the fourth product?",
            ["items.price[3]", "items[3].price", "items[4].price", "items->price[3]"],
            1,
            "Index first to pick the record (index 3 is the fourth), then use .price.",
          ),
          quiz(
            "Why should a search function return an index rather than printing the record itself?",
            [
              "Functions can't print",
              "The caller can then decide what to do with the record: print it, update it, or report it missing",
              "Indexes are faster to print",
              "Returning structs is not allowed",
            ],
            1,
            "Returning the position (or -1) keeps the search reusable for any purpose.",
          ),
        ],
        challenge: {
          instructions:
            "With the 4-product inventory, write double inventory_value(const Product *items, int count) and int lowest_stock(const Product *items, int count) (returns an index). Print the total value 85.50, the products with qty below 5 (reorder: Stapler Marker) and the lowest-stock product.",
          description: task(
            "The starter has an array of 4 products (`name`, `qty`, `price`). Write `double inventory_value(const Product *items, int count)` (sum of qty × price) and `int lowest_stock(const Product *items, int count)`, which returns the **index** of the product with the smallest qty. Print the total value, the names of products with fewer than 5 in stock, and the lowest-stock product.",
            "inventory value: 85.50\nreorder: Stapler Marker\nlowest stock: Stapler (3)",
          ),
          starterCode: `#include <stdio.h>

typedef struct {
    char name[16];
    int qty;
    double price;
} Product;

// Write inventory_value and lowest_stock here


int main(void) {
    Product items[4] = {
        {"Pen", 40, 1.20},
        {"Stapler", 3, 6.50},
        {"Folder", 12, 0.80},
        {"Marker", 4, 2.10},
    };

    // Print the inventory value, the products to reorder (qty < 5) and the lowest stock

    return 0;
}`,
          solution: `#include <stdio.h>

typedef struct {
    char name[16];
    int qty;
    double price;
} Product;

double inventory_value(const Product *items, int count) {
    double total = 0;
    for (int i = 0; i < count; i++) {
        total += items[i].qty * items[i].price;
    }
    return total;
}

int lowest_stock(const Product *items, int count) {
    int best = 0;
    for (int i = 1; i < count; i++) {
        if (items[i].qty < items[best].qty) {
            best = i;
        }
    }
    return best;
}

int main(void) {
    Product items[4] = {
        {"Pen", 40, 1.20},
        {"Stapler", 3, 6.50},
        {"Folder", 12, 0.80},
        {"Marker", 4, 2.10},
    };

    printf("inventory value: %.2f\\n", inventory_value(items, 4));

    printf("reorder:");
    for (int i = 0; i < 4; i++) {
        if (items[i].qty < 5) {
            printf(" %s", items[i].name);
        }
    }
    printf("\\n");

    int low = lowest_stock(items, 4);
    printf("lowest stock: %s (%d)\\n", items[low].name, items[low].qty);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Calculates the inventory value",
              outputIncludes: "inventory value: 85.50",
              hint: "Sum qty * price over all products.",
            },
            {
              id: "t2",
              label: "Lists the products to reorder and the lowest stock",
              expectedOutput: "inventory value: 85.50\nreorder: Stapler Marker\nlowest stock: Stapler (3)",
              hint: "lowest_stock returns an index; use it to print the name and qty.",
            },
            {
              id: "t3",
              label: "The functions take a const Product pointer and a count",
              keywords: [
                { pattern: "\\bdouble\\s+inventory_value\\s*\\(\\s*const\\s+Product\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\bint\\s+lowest_stock\\s*\\(\\s*const\\s+Product\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
              ],
              hint: "double inventory_value(const Product *items, int count)",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-1",
    title: "Linked Lists",
    icon: "🔗",
    color: ACCENT,
    lessons: [
      {
        id: "c_data_structures-1-0",
        title: "Singly Linked List",
        xp: 20,
        chapterTitle: "Linked Lists",
        theory: [
          text(
            "Arrays are great until their size changes: inserting in the middle means shifting everything after it, and growing means reallocating. A **linked list** stores each item in its own **node**, and each node points to the next one. Adding or removing a node only changes a couple of pointers.",
          ),
          diagram("A singly linked list", [
            { id: "head", label: "head", color: "#a855f7", items: ["Pointer to the first node", "NULL when the list is empty"] },
            { id: "a", label: "Node", color: ACCENT, items: ["value: 1", "next → 2"] },
            { id: "b", label: "Node", color: ACCENT, items: ["value: 2", "next → 3"] },
            { id: "c", label: "Node", color: ACCENT, items: ["value: 3", "next: NULL (the end)"] },
          ]),
          text(
            "Nodes are created with `malloc` as needed. To add items **in order**, keep a `tail` pointer to the last node: new nodes are attached to `tail->next` without walking the whole list. To visit every node, start at the head and follow `next` until NULL.",
            {
              label: "Appending at the tail",
              content: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int value;
    struct Node *next;
};

int main(void) {
    struct Node *head = NULL, *tail = NULL;

    for (int v = 10; v <= 30; v += 10) {
        struct Node *node = malloc(sizeof *node);
        if (node == NULL) return 1;
        node->value = v;
        node->next = NULL;
        if (head == NULL) {
            head = node;            // first node
        } else {
            tail->next = node;      // attach after the old tail
        }
        tail = node;
    }

    for (struct Node *n = head; n != NULL; n = n->next) {
        printf("%d ", n->value);
    }
    printf("\\n");

    while (head != NULL) {          // free every node
        struct Node *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}`,
            },
          ),
          text(
            "Trade-offs compared with an array:\n\n- **Faster:** inserting or removing at a known position, growing one item at a time.\n- **Slower:** reaching item number k (you must walk k nodes), and looping is less cache-friendly because nodes are scattered in memory.\n- **Extra memory:** every node stores a pointer as well as its value.",
          ),
          callout(
            "warning",
            "Freeing a list needs care: save `node->next` **before** calling `free(node)`, because the node's memory can't be read after it is freed.",
          ),
          quiz(
            "How is the end of a singly linked list marked?",
            ["The last value is 0", "The last node's next pointer is NULL", "head points to itself", "A special END node"],
            1,
            "A NULL next pointer means there is no following node.",
          ),
          quiz(
            "Why keep a tail pointer when appending?",
            ["Lists don't work without one", "So each append is instant instead of walking the whole list to find the end", "To free the list", "To sort the list"],
            1,
            "Without tail, every append would walk from the head to the last node.",
          ),
        ],
        challenge: {
          instructions:
            "Build a list containing 1 to 5 by appending each new node at the tail with malloc. Print it as 1 -> 2 -> 3 -> 4 -> 5 -> NULL, print its length, then free every node and print freed 5 nodes.",
          description: task(
            "Using `struct Node`, build a list of the values 1 to 5 by **appending at the tail** (keep a `tail` pointer). Print the list with the provided `print_list`, then write `int list_length(const struct Node *head)` and print the length. Finally free every node, counting them, and print the count.",
            "list: 1 -> 2 -> 3 -> 4 -> 5 -> NULL\nlength: 5\nfreed 5 nodes",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

${NODE_STRUCT}

${PRINT_LIST}

// Write list_length here


int main(void) {
    struct Node *head = NULL;
    struct Node *tail = NULL;

    // Append 1 to 5 at the tail with malloc

    // print_list("list", head), then print the length

    // Free every node, count them, print "freed N nodes"

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

${NODE_STRUCT}

${PRINT_LIST}

int list_length(const struct Node *head) {
    int count = 0;
    for (const struct Node *n = head; n != NULL; n = n->next) {
        count++;
    }
    return count;
}

int main(void) {
    struct Node *head = NULL;
    struct Node *tail = NULL;

    for (int v = 1; v <= 5; v++) {
        struct Node *node = malloc(sizeof *node);
        if (node == NULL) return 1;
        node->value = v;
        node->next = NULL;
        if (head == NULL) {
            head = node;
        } else {
            tail->next = node;
        }
        tail = node;
    }

    print_list("list", head);
    printf("length: %d\\n", list_length(head));

    int freed = 0;
    while (head != NULL) {
        struct Node *next = head->next;
        free(head);
        head = next;
        freed++;
    }
    printf("freed %d nodes\\n", freed);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Builds the list in order",
              outputIncludes: "list: 1 -> 2 -> 3 -> 4 -> 5 -> NULL",
              hint: "Attach each new node to tail->next, then move tail to it.",
            },
            {
              id: "t2",
              label: "Prints the length and frees every node",
              expectedOutput: "list: 1 -> 2 -> 3 -> 4 -> 5 -> NULL\nlength: 5\nfreed 5 nodes",
              hint: "Save head->next before freeing head.",
            },
            {
              id: "t3",
              label: "Appends with a tail pointer, uses malloc and free",
              keywords: [
                { pattern: "\\btail\\s*->\\s*next\\s*=" },
                { pattern: "\\bmalloc\\s*\\(" },
                { pattern: "\\bfree\\s*\\(" },
                { pattern: "\\bint\\s+list_length\\s*\\(" },
              ],
              hint: "tail->next = node; tail = node;",
            },
          ],
        },
      },
      {
        id: "c_data_structures-1-1",
        title: "Insert & Delete Nodes",
        xp: 20,
        chapterTitle: "Linked Lists",
        theory: [
          text(
            "A linked list's strength is changing it in place. Inserting or deleting a node is just a matter of **rewiring** `next` pointers, with no shifting of other items. The order of the pointer changes matters, though: do them in the wrong order and part of the list is lost.",
          ),
          text(
            "**Inserting after a node:** point the new node at the node's current next, **then** point the node at the new node. Doing it the other way round loses the rest of the list.",
            {
              label: "Inserting at the front and after a node",
              content: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int value;
    struct Node *next;
};

struct Node *new_node(int value, struct Node *next) {
    struct Node *n = malloc(sizeof *n);
    if (n != NULL) {
        n->value = value;
        n->next = next;
    }
    return n;
}

int main(void) {
    struct Node *head = new_node(1, new_node(3, NULL));   // 1 -> 3

    head = new_node(0, head);                  // front: 0 -> 1 -> 3
    head->next->next = new_node(2, head->next->next);    // after 1: ... 1 -> 2 -> 3

    for (struct Node *n = head; n != NULL; n = n->next) printf("%d ", n->value);
    printf("\\n");

    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}`,
            },
          ),
          text(
            "**Deleting a node:** make the previous node skip over it, then free it. Deleting the head is a special case because there is no previous node. Taking `struct Node **head` (a pointer to the head pointer) lets one function handle both cases: it walks a pointer to \"the link that points at the current node\" and rewires that link.",
            {
              label: "Deleting by value with a pointer to the link",
              content: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int value;
    struct Node *next;
};

int delete_value(struct Node **head, int value) {
    struct Node **link = head;
    while (*link != NULL) {
        if ((*link)->value == value) {
            struct Node *gone = *link;
            *link = gone->next;      // the previous link now skips it
            free(gone);
            return 1;
        }
        link = &(*link)->next;
    }
    return 0;
}

int main(void) {
    struct Node c = {3, NULL};
    struct Node *b = malloc(sizeof *b);
    if (b == NULL) return 1;
    b->value = 2;
    b->next = &c;
    struct Node a = {1, b};
    struct Node *head = &a;

    printf("deleted 2: %d\\n", delete_value(&head, 2));
    printf("deleted 9: %d\\n", delete_value(&head, 9));
    for (struct Node *n = head; n != NULL; n = n->next) printf("%d ", n->value);
    printf("\\n");
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Draw boxes and arrows on paper before writing pointer-rewiring code. Most linked-list bugs are an arrow updated in the wrong order.",
          ),
          quiz(
            "To insert `fresh` after node `n`, which order is correct?",
            [
              "n->next = fresh; fresh->next = n->next;",
              "fresh->next = n->next; n->next = fresh;",
              "free(n); n = fresh;",
              "Either order works",
            ],
            1,
            "fresh must take over n's old next first. Setting n->next first would make fresh->next point to fresh itself.",
          ),
          quiz(
            "Why does `delete_value` take `struct Node **head`?",
            [
              "To delete two nodes",
              "If the head itself is deleted, the caller's head pointer must change",
              "Because free needs a double pointer",
              "To sort the list",
            ],
            1,
            "Deleting the first node changes which node is first. With a pointer to the head pointer, the function can update it.",
          ),
        ],
        challenge: {
          instructions:
            "Starting from the list 10 -> 20 -> 30, write insert_front, insert_after(head, target, value) and int delete_value(struct Node **head, int value). Insert 5 at the front, insert 25 after 20, delete 10, try to delete 99, delete 30, printing the list after each change.",
          description: task(
            "The starter builds `10 -> 20 -> 30`. Write `struct Node *insert_front(struct Node *head, int value)`, `void insert_after(struct Node *head, int target, int value)` (inserts after the first node holding `target`), and `int delete_value(struct Node **head, int value)` (frees the node and returns 1, or returns 0 if not found). Perform the steps below, printing the list after each one, then free the list.",
            "start: 10 -> 20 -> 30 -> NULL\ninsert 5 at front: 5 -> 10 -> 20 -> 30 -> NULL\ninsert 25 after 20: 5 -> 10 -> 20 -> 25 -> 30 -> NULL\ndelete 10: 5 -> 20 -> 25 -> 30 -> NULL\ndelete 99: not found\ndelete 30: 5 -> 20 -> 25 -> NULL",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

${NODE_STRUCT}

${PRINT_LIST}

struct Node *append(struct Node *head, int value) {
    struct Node *node = malloc(sizeof *node);
    node->value = value;
    node->next = NULL;
    if (head == NULL) return node;
    struct Node *n = head;
    while (n->next != NULL) n = n->next;
    n->next = node;
    return head;
}

// Write insert_front, insert_after and delete_value here


int main(void) {
    struct Node *head = NULL;
    head = append(head, 10);
    head = append(head, 20);
    head = append(head, 30);
    print_list("start", head);

    // insert 5 at front, insert 25 after 20, delete 10, delete 99, delete 30
    // print the list after each step (or "delete 99: not found")

    // free the list

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

${NODE_STRUCT}

${PRINT_LIST}

struct Node *append(struct Node *head, int value) {
    struct Node *node = malloc(sizeof *node);
    node->value = value;
    node->next = NULL;
    if (head == NULL) return node;
    struct Node *n = head;
    while (n->next != NULL) n = n->next;
    n->next = node;
    return head;
}

struct Node *insert_front(struct Node *head, int value) {
    struct Node *node = malloc(sizeof *node);
    if (node == NULL) return head;
    node->value = value;
    node->next = head;
    return node;
}

void insert_after(struct Node *head, int target, int value) {
    for (struct Node *n = head; n != NULL; n = n->next) {
        if (n->value == target) {
            struct Node *node = malloc(sizeof *node);
            if (node == NULL) return;
            node->value = value;
            node->next = n->next;
            n->next = node;
            return;
        }
    }
}

int delete_value(struct Node **head, int value) {
    struct Node **link = head;
    while (*link != NULL) {
        if ((*link)->value == value) {
            struct Node *gone = *link;
            *link = gone->next;
            free(gone);
            return 1;
        }
        link = &(*link)->next;
    }
    return 0;
}

int main(void) {
    struct Node *head = NULL;
    head = append(head, 10);
    head = append(head, 20);
    head = append(head, 30);
    print_list("start", head);

    head = insert_front(head, 5);
    print_list("insert 5 at front", head);

    insert_after(head, 20, 25);
    print_list("insert 25 after 20", head);

    delete_value(&head, 10);
    print_list("delete 10", head);

    if (!delete_value(&head, 99)) {
        printf("delete 99: not found\\n");
    }

    delete_value(&head, 30);
    print_list("delete 30", head);

    while (head != NULL) {
        struct Node *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Inserts at the front and after a value",
              outputIncludes: ["insert 5 at front: 5 -> 10 -> 20 -> 30 -> NULL", "insert 25 after 20: 5 -> 10 -> 20 -> 25 -> 30 -> NULL"],
              hint: "In insert_after: node->next = n->next; then n->next = node;",
            },
            {
              id: "t2",
              label: "Deletes from the middle and the end, and reports a missing value",
              outputIncludes: ["delete 10: 5 -> 20 -> 25 -> 30 -> NULL", "delete 99: not found", "delete 30: 5 -> 20 -> 25 -> NULL"],
              hint: "Rewire the previous link to skip the node, then free it.",
            },
            {
              id: "t3",
              label: "Prints every step in order",
              expectedOutput: "start: 10 -> 20 -> 30 -> NULL\ninsert 5 at front: 5 -> 10 -> 20 -> 30 -> NULL\ninsert 25 after 20: 5 -> 10 -> 20 -> 25 -> 30 -> NULL\ndelete 10: 5 -> 20 -> 25 -> 30 -> NULL\ndelete 99: not found\ndelete 30: 5 -> 20 -> 25 -> NULL",
              hint: "Call print_list after each change.",
            },
            {
              id: "t4",
              label: "delete_value takes struct Node ** and frees the node",
              keywords: [
                { pattern: "\\bint\\s+delete_value\\s*\\(\\s*struct\\s+Node\\s*\\*\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\bdelete_value\\s*\\(\\s*&\\s*head\\s*," },
                { pattern: "\\binsert_front\\s*\\(" },
                { pattern: "\\binsert_after\\s*\\(" },
              ],
              hint: "int delete_value(struct Node **head, int value) and call it with &head.",
            },
          ],
        },
      },
      {
        id: "c_data_structures-1-2",
        title: "Traversal & Search",
        xp: 15,
        chapterTitle: "Linked Lists",
        theory: [
          text(
            "**Traversal** means visiting every node in order. Almost every list operation (printing, counting, summing, searching, finding the maximum) is the same loop with a different action inside: start at the head, do something with the node, move to `next`, stop at NULL.",
          ),
          text(
            "Searching returns as soon as it finds a match. Return a pointer to the node (or NULL) when the caller needs the node itself, or an index (or -1) when the position matters.",
            {
              label: "Search, count and maximum",
              content: `#include <stdio.h>
#include <stddef.h>

struct Node {
    int value;
    struct Node *next;
};

const struct Node *find(const struct Node *head, int target) {
    for (const struct Node *n = head; n != NULL; n = n->next) {
        if (n->value == target) return n;
    }
    return NULL;
}

int main(void) {
    struct Node d = {8, NULL}, c = {3, &d}, b = {8, &c}, a = {5, &b};
    const struct Node *head = &a;

    int count8 = 0, max = head->value;
    for (const struct Node *n = head; n != NULL; n = n->next) {
        if (n->value == 8) count8++;
        if (n->value > max) max = n->value;
    }
    printf("8 appears %d times, max %d\\n", count8, max);
    printf("find 3: %s\\n", find(head, 3) ? "found" : "missing");
    printf("find 4: %s\\n", find(head, 4) ? "found" : "missing");
    return 0;
}`,
            },
          ),
          text(
            "**Reversing** a list in place is a classic exercise in careful pointer handling. Walk the list with three pointers, `prev`, `current` and `next`, and turn each `next` arrow around. When the walk finishes, `prev` is the new head.",
            {
              label: "Reversing a list in place",
              content: `#include <stdio.h>
#include <stddef.h>

struct Node {
    int value;
    struct Node *next;
};

struct Node *reverse(struct Node *head) {
    struct Node *prev = NULL;
    while (head != NULL) {
        struct Node *next = head->next;   // remember the rest
        head->next = prev;                // turn the arrow around
        prev = head;
        head = next;
    }
    return prev;
}

int main(void) {
    struct Node c = {3, NULL}, b = {2, &c}, a = {1, &b};
    struct Node *head = reverse(&a);
    for (struct Node *n = head; n != NULL; n = n->next) printf("%d ", n->value);
    printf("\\n");
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "Searching a linked list is O(n): in the worst case every node is visited. For faster search you need a different structure, such as the binary search tree in Chapter 4.",
          ),
          quiz(
            "Searching for a value that isn't in a list of n nodes visits how many nodes?",
            ["1", "n / 2", "n", "log n"],
            2,
            "Without a match the loop has to check every node before reaching NULL.",
          ),
          quiz(
            "In the reverse loop, why save `head->next` before changing `head->next = prev`?",
            ["To free it", "Otherwise the pointer to the rest of the list is lost", "To count the nodes", "It isn't necessary"],
            1,
            "Once head->next points backwards, the only way to reach the remaining nodes is the saved copy.",
          ),
        ],
        challenge: {
          instructions:
            "Read numbers from the input (4 9 4 2 7 4 1) into a list in order. Print it, the count of 4s (3), the index of the first 7 (4), the max and min, whether it contains 8, then reverse it in place and print it again. Free the list.",
          stdin: "4 9 4 2 7 4 1",
          description: task(
            "Read numbers until the input ends (the test gives `4 9 4 2 7 4 1`) and append each one to a list, keeping the input order. Then write traversal functions and print: how many times 4 appears, the index of the first 7, the maximum and minimum, and whether the list contains 8. Finally write `struct Node *reverse(struct Node *head)` that reverses the list in place, print it again and free it.",
            "list: 4 -> 9 -> 4 -> 2 -> 7 -> 4 -> 1 -> NULL\ncount of 4: 3\nindex of 7: 4\nmax: 9, min: 1\ncontains 8: no\nreversed: 1 -> 4 -> 7 -> 2 -> 4 -> 9 -> 4 -> NULL",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

${NODE_STRUCT}

${PRINT_LIST}

// Write count_of, index_of, list_max, list_min, contains and reverse here


int main(void) {
    struct Node *head = NULL;
    struct Node *tail = NULL;

    // Read numbers until the input ends and append each at the tail

    // Print the list and the results, then reverse it and print it again

    // Free the list

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

${NODE_STRUCT}

${PRINT_LIST}

int count_of(const struct Node *head, int target) {
    int count = 0;
    for (const struct Node *n = head; n != NULL; n = n->next) {
        if (n->value == target) count++;
    }
    return count;
}

int index_of(const struct Node *head, int target) {
    int i = 0;
    for (const struct Node *n = head; n != NULL; n = n->next, i++) {
        if (n->value == target) return i;
    }
    return -1;
}

int list_max(const struct Node *head) {
    int best = head->value;
    for (const struct Node *n = head; n != NULL; n = n->next) {
        if (n->value > best) best = n->value;
    }
    return best;
}

int list_min(const struct Node *head) {
    int best = head->value;
    for (const struct Node *n = head; n != NULL; n = n->next) {
        if (n->value < best) best = n->value;
    }
    return best;
}

int contains(const struct Node *head, int target) {
    return index_of(head, target) >= 0;
}

struct Node *reverse(struct Node *head) {
    struct Node *prev = NULL;
    while (head != NULL) {
        struct Node *next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

int main(void) {
    struct Node *head = NULL;
    struct Node *tail = NULL;
    int value;

    while (scanf("%d", &value) == 1) {
        struct Node *node = malloc(sizeof *node);
        if (node == NULL) return 1;
        node->value = value;
        node->next = NULL;
        if (head == NULL) head = node; else tail->next = node;
        tail = node;
    }

    print_list("list", head);
    printf("count of 4: %d\\n", count_of(head, 4));
    printf("index of 7: %d\\n", index_of(head, 7));
    printf("max: %d, min: %d\\n", list_max(head), list_min(head));
    printf("contains 8: %s\\n", contains(head, 8) ? "yes" : "no");

    head = reverse(head);
    print_list("reversed", head);

    while (head != NULL) {
        struct Node *next = head->next;
        free(head);
        head = next;
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Builds the list in input order",
              outputIncludes: "list: 4 -> 9 -> 4 -> 2 -> 7 -> 4 -> 1 -> NULL",
              hint: "Append at the tail so the order matches the input.",
            },
            {
              id: "t2",
              label: "Counts, finds and measures correctly",
              outputIncludes: ["count of 4: 3", "index of 7: 4", "max: 9, min: 1", "contains 8: no"],
              hint: "Each answer is one traversal loop with a different action.",
            },
            {
              id: "t3",
              label: "Reverses the list in place",
              expectedOutput: "list: 4 -> 9 -> 4 -> 2 -> 7 -> 4 -> 1 -> NULL\ncount of 4: 3\nindex of 7: 4\nmax: 9, min: 1\ncontains 8: no\nreversed: 1 -> 4 -> 7 -> 2 -> 4 -> 9 -> 4 -> NULL",
              hint: "Use prev / current / next and return prev as the new head.",
            },
            {
              id: "t4",
              label: "reverse rewires the existing nodes instead of building a new list",
              keywords: [
                { pattern: "\\bstruct\\s+Node\\s*\\*\\s*reverse\\s*\\(\\s*struct\\s+Node\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "->\\s*next\\s*=\\s*prev\\s*;" },
                { pattern: "\\bhead\\s*=\\s*reverse\\s*\\(\\s*head\\s*\\)" },
              ],
              hint: "Inside reverse: node->next = prev; and in main: head = reverse(head);",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-2",
    title: "Stacks & Queues",
    icon: "📚",
    color: ACCENT,
    lessons: [
      {
        id: "c_data_structures-2-0",
        title: "Stack with Array",
        xp: 15,
        chapterTitle: "Stacks & Queues",
        theory: [
          text(
            "A **stack** is a pile: you add (**push**) and remove (**pop**) only at the top, so the last item in is the first out (**LIFO**). Undo history, the browser's back button, the function call stack and expression evaluators are all stacks.",
          ),
          text(
            "With a fixed-size array, a stack needs just an array and a `top` index: the number of items stored. Push writes at `items[top]` and increments `top`; pop decrements `top` and returns `items[top]`. Always check for **overflow** (push when full) and **underflow** (pop when empty).",
            {
              label: "An array-based stack",
              content: `#include <stdio.h>

#define CAPACITY 5

typedef struct {
    int items[CAPACITY];
    int top;              // number of items = index of the next free slot
} Stack;

int push(Stack *s, int value) {
    if (s->top == CAPACITY) return 0;      // overflow
    s->items[s->top++] = value;
    return 1;
}

int pop(Stack *s, int *out) {
    if (s->top == 0) return 0;             // underflow
    *out = s->items[--s->top];
    return 1;
}

int main(void) {
    Stack s = {.top = 0};
    for (int i = 1; i <= 3; i++) push(&s, i * 10);

    int v;
    while (pop(&s, &v)) {
        printf("popped %d\\n", v);       // 30, 20, 10: last in, first out
    }
    printf("pop on empty: %d\\n", pop(&s, &v));
    return 0;
}`,
            },
          ),
          text(
            "A classic stack problem is **checking brackets**. Push every opening bracket; on a closing bracket, pop and check that it matches. The text is balanced only if every closer matched and the stack is empty at the end.",
          ),
          diagram("Checking \"([])\" with a stack", [
            { id: "s1", label: "read (", color: "#94a3b8", items: ["push (", "stack: ("] },
            { id: "s2", label: "read [", color: "#94a3b8", items: ["push [", "stack: ( ["] },
            { id: "s3", label: "read ]", color: ACCENT, items: ["pop [ — matches", "stack: ("] },
            { id: "s4", label: "read )", color: "#22c55e", items: ["pop ( — matches", "stack empty: balanced"] },
          ]),
          callout(
            "tip",
            "Return a success flag from push and pop and pass the popped value back through a pointer. That way callers can't miss an overflow or an empty stack.",
          ),
          quiz(
            "You push 1, 2, 3 onto a stack and then pop twice. What is left?",
            ["3", "1", "2 and 3", "1 and 2"],
            1,
            "Pops remove 3 and then 2 (last in, first out), leaving 1.",
          ),
          quiz(
            "In the array stack, what does `top == 0` mean?",
            ["The stack is full", "The stack is empty", "The top item is 0", "There is one item"],
            1,
            "top counts the stored items, so 0 means nothing is on the stack.",
          ),
        ],
        challenge: {
          instructions:
            "Implement an array-based char stack (push, pop, is_empty) and use it in int is_balanced(const char *text) that checks (), [] and {}. Check each input line and print text: balanced or text: not balanced.",
          stdin: "(a[b]{c})\n(]\n((x)\na)b\n",
          description: task(
            "Implement a stack of `char` with an array: a `Stack` struct with `char items[64]` and `int top`, plus `push`, `pop` and `is_empty`. Use it in `int is_balanced(const char *text)`, which checks that every `(`, `[` and `{` is closed by the matching bracket in the right order (other characters are ignored). Read each input line and print whether it is balanced.",
            "(a[b]{c}): balanced\n(]: not balanced\n((x): not balanced\na)b: not balanced",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

#define CAPACITY 64

// Define the Stack struct and push / pop / is_empty here

// Write is_balanced here


int main(void) {
    char line[128];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        // Print "LINE: balanced" or "LINE: not balanced"
    }
    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

#define CAPACITY 64

typedef struct {
    char items[CAPACITY];
    int top;
} Stack;

int push(Stack *s, char c) {
    if (s->top == CAPACITY) return 0;
    s->items[s->top++] = c;
    return 1;
}

int pop(Stack *s, char *out) {
    if (s->top == 0) return 0;
    *out = s->items[--s->top];
    return 1;
}

int is_empty(const Stack *s) {
    return s->top == 0;
}

int is_balanced(const char *text) {
    Stack s = {.top = 0};
    for (const char *p = text; *p != '\\0'; p++) {
        char c = *p;
        if (c == '(' || c == '[' || c == '{') {
            if (!push(&s, c)) return 0;
        } else if (c == ')' || c == ']' || c == '}') {
            char open;
            if (!pop(&s, &open)) return 0;
            if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) {
                return 0;
            }
        }
    }
    return is_empty(&s);
}

int main(void) {
    char line[128];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        printf("%s: %s\\n", line, is_balanced(line) ? "balanced" : "not balanced");
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Accepts correctly nested brackets",
              outputIncludes: "(a[b]{c}): balanced",
              hint: "Push openers; on a closer, pop and compare.",
            },
            {
              id: "t2",
              label: "Rejects a mismatch, an unclosed bracket and an unexpected closer",
              expectedOutput: "(a[b]{c}): balanced\n(]: not balanced\n((x): not balanced\na)b: not balanced",
              hint: "Popping an empty stack, a wrong pair, or a non-empty stack at the end all mean not balanced.",
            },
            {
              id: "t3",
              label: "Uses an array-based stack with push and pop",
              keywords: [
                { pattern: "\\bchar\\s+items\\s*\\[\\s*CAPACITY\\s*\\]" },
                { pattern: "\\bint\\s+top\\s*;" },
                { pattern: "\\bpush\\s*\\(\\s*&\\s*\\w+\\s*," },
                { pattern: "\\bpop\\s*\\(\\s*&\\s*\\w+\\s*," },
              ],
              hint: "typedef struct { char items[CAPACITY]; int top; } Stack;",
            },
          ],
        },
      },
      {
        id: "c_data_structures-2-1",
        title: "Queue with Array",
        xp: 15,
        chapterTitle: "Stacks & Queues",
        theory: [
          text(
            "A **queue** is a line: items join at the back (**enqueue**) and leave from the front (**dequeue**), so the first in is the first out (**FIFO**). Print jobs, customer support tickets, messages between programs and breadth-first search all use queues.",
          ),
          text(
            "A naive array queue moves `front` forward on every dequeue, and soon runs off the end of the array even though the start is empty. A **circular** (ring) buffer fixes this: indexes wrap round to 0 with the `%` operator, so the free space at the start is reused.",
            {
              label: "A circular queue",
              content: `#include <stdio.h>

#define CAPACITY 3

typedef struct {
    int items[CAPACITY];
    int front;    // index of the oldest item
    int count;    // how many items are stored
} Queue;

int enqueue(Queue *q, int value) {
    if (q->count == CAPACITY) return 0;
    int back = (q->front + q->count) % CAPACITY;   // wraps round
    q->items[back] = value;
    q->count++;
    return 1;
}

int dequeue(Queue *q, int *out) {
    if (q->count == 0) return 0;
    *out = q->items[q->front];
    q->front = (q->front + 1) % CAPACITY;
    q->count--;
    return 1;
}

int main(void) {
    Queue q = {.front = 0, .count = 0};
    int v;
    enqueue(&q, 1); enqueue(&q, 2); enqueue(&q, 3);
    dequeue(&q, &v); printf("out: %d\\n", v);
    enqueue(&q, 4);                        // reuses slot 0
    while (dequeue(&q, &v)) printf("out: %d\\n", v);
    return 0;
}`,
            },
          ),
          diagram("Circular buffer with capacity 4", [
            { id: "c1", label: "After enqueue 1, 2, 3, 4", color: "#94a3b8", items: ["[1 2 3 4]", "front 0, count 4 (full)"] },
            { id: "c2", label: "After 2 dequeues", color: "#3b82f6", items: ["[. . 3 4]", "front 2, count 2"] },
            { id: "c3", label: "After enqueue 6, 7", color: ACCENT, items: ["[6 7 3 4]", "6 and 7 wrapped to slots 0 and 1"] },
          ]),
          callout(
            "info",
            "Keeping a `count` alongside `front` makes \"full\" and \"empty\" easy to tell apart. With only front and back indexes, both states can look the same.",
          ),
          quiz(
            "You enqueue A, B, C and then dequeue once. Which item comes out?",
            ["A", "B", "C", "None"],
            0,
            "Queues are first in, first out, so A leaves first.",
          ),
          quiz(
            "In a circular queue of capacity 5 with front 3 and count 4, where does the next item go?",
            ["Index 7", "Index 2", "Index 4", "It is full"],
            1,
            "(3 + 4) % 5 = 2: the back index wraps round to the start of the array.",
          ),
        ],
        challenge: {
          instructions:
            "Implement a circular queue of capacity 4 (front, count, % CAPACITY). Process the input commands e N (enqueue), d (dequeue) and p (print). Print queue full, can't add N when full, dequeued N on each dequeue, and the queue from front to back on p.",
          stdin: "e 1\ne 2\ne 3\ne 4\ne 5\nd\nd\ne 6\ne 7\np\n",
          description: task(
            "Implement a circular queue with **capacity 4** using `front`, `count` and `% CAPACITY`. Read commands until the input ends: `e N` enqueues N (print `queue full, can't add N` if it is full), `d` dequeues and prints `dequeued N`, and `p` prints the queue from front to back. The test input fills the queue, overflows it, removes two items and adds two more, which wrap round to the start of the array.",
            "queue full, can't add 5\ndequeued 1\ndequeued 2\nqueue: 3 4 6 7",
          ),
          starterCode: `#include <stdio.h>

#define CAPACITY 4

// Define the Queue struct (items, front, count) and enqueue / dequeue here


int main(void) {
    char cmd;
    int value;

    // Read commands with scanf(" %c", &cmd) until the input ends:
    //   'e' -> read a number and enqueue it (report if full)
    //   'd' -> dequeue and print it
    //   'p' -> print the queue from front to back

    return 0;
}`,
          solution: `#include <stdio.h>

#define CAPACITY 4

typedef struct {
    int items[CAPACITY];
    int front;
    int count;
} Queue;

int enqueue(Queue *q, int value) {
    if (q->count == CAPACITY) return 0;
    q->items[(q->front + q->count) % CAPACITY] = value;
    q->count++;
    return 1;
}

int dequeue(Queue *q, int *out) {
    if (q->count == 0) return 0;
    *out = q->items[q->front];
    q->front = (q->front + 1) % CAPACITY;
    q->count--;
    return 1;
}

void print_queue(const Queue *q) {
    printf("queue:");
    for (int i = 0; i < q->count; i++) {
        printf(" %d", q->items[(q->front + i) % CAPACITY]);
    }
    printf("\\n");
}

int main(void) {
    Queue q = {.front = 0, .count = 0};
    char cmd;
    int value;

    while (scanf(" %c", &cmd) == 1) {
        if (cmd == 'e' && scanf("%d", &value) == 1) {
            if (!enqueue(&q, value)) {
                printf("queue full, can't add %d\\n", value);
            }
        } else if (cmd == 'd') {
            if (dequeue(&q, &value)) {
                printf("dequeued %d\\n", value);
            }
        } else if (cmd == 'p') {
            print_queue(&q);
        }
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Refuses to enqueue when full and dequeues in FIFO order",
              outputIncludes: ["queue full, can't add 5", "dequeued 1", "dequeued 2"],
              hint: "count == CAPACITY means full; dequeue reads items[front].",
            },
            {
              id: "t2",
              label: "Wraps round and prints the queue in order",
              expectedOutput: "queue full, can't add 5\ndequeued 1\ndequeued 2\nqueue: 3 4 6 7",
              hint: "Print items[(front + i) % CAPACITY] for i from 0 to count - 1.",
            },
            {
              id: "t3",
              label: "Uses front, count and modulo wrapping",
              keywords: [
                { pattern: "\\bint\\s+front\\s*;" },
                { pattern: "\\bint\\s+count\\s*;" },
                { pattern: "%\\s*CAPACITY\\b" },
              ],
              hint: "back = (front + count) % CAPACITY; front = (front + 1) % CAPACITY;",
            },
          ],
        },
      },
      {
        id: "c_data_structures-2-2",
        title: "Stack & Queue with Linked List",
        xp: 20,
        chapterTitle: "Stacks & Queues",
        theory: [
          text(
            "Array-based stacks and queues have a fixed capacity. Built on **linked nodes** instead, they grow and shrink one node at a time and are only limited by available memory. Both operations stay O(1) as long as you add and remove at the right ends.",
          ),
          text(
            "A linked **stack** only needs a `top` pointer: push creates a node pointing at the old top, pop removes the top node. Both happen at the head of the list.",
            {
              label: "A linked stack",
              content: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int value;
    struct Node *next;
};

void push(struct Node **top, int value) {
    struct Node *n = malloc(sizeof *n);
    if (n == NULL) return;
    n->value = value;
    n->next = *top;
    *top = n;
}

int pop(struct Node **top, int *out) {
    if (*top == NULL) return 0;
    struct Node *n = *top;
    *out = n->value;
    *top = n->next;
    free(n);
    return 1;
}

int main(void) {
    struct Node *top = NULL;
    push(&top, 1); push(&top, 2); push(&top, 3);
    int v;
    while (pop(&top, &v)) printf("%d ", v);
    printf("\\n");
    return 0;
}`,
            },
          ),
          text(
            "A linked **queue** needs both ends: enqueue appends at the `tail`, dequeue removes from the `head`. Keeping both pointers in a struct makes both operations instant. Remember to reset `tail` to NULL when the last node is removed.",
          ),
          diagram("Which end does what", [
            { id: "stack", label: "Linked stack", color: ACCENT, items: ["push: add at head", "pop: remove at head", "One pointer: top"] },
            { id: "queue", label: "Linked queue", color: "#3b82f6", items: ["enqueue: add at tail", "dequeue: remove at head", "Two pointers: head and tail"] },
          ]),
          callout(
            "warning",
            "Every pushed or enqueued node is a malloc, so every pop or dequeue must free it, and any nodes left at the end must be freed too.",
          ),
          quiz(
            "Why does a linked queue remove from the head and add at the tail, not the other way round?",
            [
              "It doesn't matter",
              "Removing the tail of a singly linked list needs the previous node, which means walking the whole list",
              "malloc only works at the tail",
              "Heads can't be removed",
            ],
            1,
            "In a singly linked list you can remove the head instantly, but removing the last node requires finding the one before it.",
          ),
          quiz(
            "What must dequeue do when it removes the only node in the queue?",
            ["Nothing special", "Set tail to NULL as well as head", "Free the queue struct", "Push it back"],
            1,
            "Otherwise tail would still point to the freed node, and the next enqueue would write through a dangling pointer.",
          ),
        ],
        challenge: {
          instructions:
            "Implement a linked stack (push / pop on struct Node **top) and a linked queue (struct Queue with head and tail; enqueue / dequeue). Add 1 to 5 to both, then empty both and print stack pops: 5 4 3 2 1 and queue dequeues: 1 2 3 4 5. Count mallocs minus frees and print live nodes: 0.",
          description: task(
            "Implement a **linked stack** with `void push(struct Node **top, int value)` and `int pop(struct Node **top, int *out)`, and a **linked queue** with `struct Queue { struct Node *head; struct Node *tail; }` plus `enqueue` and `dequeue`. Use the provided `make_node` / `drop_node` so live nodes are counted. Add 1 to 5 to both, empty both, and print the order they come out, then the live node count.",
            "stack pops: 5 4 3 2 1\nqueue dequeues: 1 2 3 4 5\nlive nodes: 0",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

${NODE_STRUCT}

static int live_nodes = 0;

struct Node *make_node(int value) {
    struct Node *n = malloc(sizeof *n);
    if (n != NULL) {
        n->value = value;
        n->next = NULL;
        live_nodes++;
    }
    return n;
}

void drop_node(struct Node *n) {
    free(n);
    live_nodes--;
}

// Write push / pop (linked stack) and struct Queue with enqueue / dequeue here


int main(void) {
    // Push 1..5 onto the stack and enqueue 1..5 into the queue
    // Pop everything ("stack pops: ...") and dequeue everything ("queue dequeues: ...")
    // Print "live nodes: N"

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

${NODE_STRUCT}

static int live_nodes = 0;

struct Node *make_node(int value) {
    struct Node *n = malloc(sizeof *n);
    if (n != NULL) {
        n->value = value;
        n->next = NULL;
        live_nodes++;
    }
    return n;
}

void drop_node(struct Node *n) {
    free(n);
    live_nodes--;
}

void push(struct Node **top, int value) {
    struct Node *n = make_node(value);
    if (n == NULL) return;
    n->next = *top;
    *top = n;
}

int pop(struct Node **top, int *out) {
    if (*top == NULL) return 0;
    struct Node *n = *top;
    *out = n->value;
    *top = n->next;
    drop_node(n);
    return 1;
}

struct Queue {
    struct Node *head;
    struct Node *tail;
};

void enqueue(struct Queue *q, int value) {
    struct Node *n = make_node(value);
    if (n == NULL) return;
    if (q->tail == NULL) {
        q->head = n;
    } else {
        q->tail->next = n;
    }
    q->tail = n;
}

int dequeue(struct Queue *q, int *out) {
    if (q->head == NULL) return 0;
    struct Node *n = q->head;
    *out = n->value;
    q->head = n->next;
    if (q->head == NULL) {
        q->tail = NULL;
    }
    drop_node(n);
    return 1;
}

int main(void) {
    struct Node *top = NULL;
    struct Queue q = {NULL, NULL};

    for (int i = 1; i <= 5; i++) {
        push(&top, i);
        enqueue(&q, i);
    }

    int v;
    printf("stack pops:");
    while (pop(&top, &v)) printf(" %d", v);
    printf("\\n");

    printf("queue dequeues:");
    while (dequeue(&q, &v)) printf(" %d", v);
    printf("\\n");

    printf("live nodes: %d\\n", live_nodes);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "The stack returns items last in, first out",
              outputIncludes: "stack pops: 5 4 3 2 1",
              hint: "push adds at the top; pop removes the top.",
            },
            {
              id: "t2",
              label: "The queue returns items first in, first out",
              outputIncludes: "queue dequeues: 1 2 3 4 5",
              hint: "enqueue at the tail, dequeue at the head.",
            },
            {
              id: "t3",
              label: "Prints every line and frees every node",
              expectedOutput: "stack pops: 5 4 3 2 1\nqueue dequeues: 1 2 3 4 5\nlive nodes: 0",
              hint: "pop and dequeue must call drop_node on the removed node.",
            },
            {
              id: "t4",
              label: "Uses a Queue struct with head and tail and a struct Node ** stack",
              keywords: [
                { pattern: "\\bstruct\\s+Queue\\s*\\{[^}]*\\bhead\\b[^}]*\\btail\\b" },
                { pattern: "\\bvoid\\s+push\\s*\\(\\s*struct\\s+Node\\s*\\*\\s*\\*\\s*\\w+\\s*," },
                { pattern: "\\bdrop_node\\s*\\(" },
              ],
              hint: "struct Queue { struct Node *head; struct Node *tail; };",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-3",
    title: "Trees",
    icon: "🌳",
    color: ACCENT,
    lessons: [
      {
        id: "c_data_structures-3-0",
        title: "Binary Tree Basics",
        xp: 20,
        chapterTitle: "Trees",
        theory: [
          text(
            "Lists are a chain: each node has one next. A **tree** branches: each node can have several **children**. In a **binary tree**, each node has at most two, a `left` and a `right` child. Trees model hierarchies (folders, HTML documents, company structures) and make fast searching possible.",
          ),
          diagram("Tree vocabulary", [
            { id: "root", label: "Root", color: "#a855f7", items: ["The top node", "Has no parent"] },
            { id: "internal", label: "Internal node", color: ACCENT, items: ["Has at least one child", "Parent of its children"] },
            { id: "leaf", label: "Leaf", color: "#22c55e", items: ["Has no children", "left and right are NULL"] },
            { id: "height", label: "Height", color: "#f97316", items: ["Nodes on the longest path from root to a leaf"] },
          ]),
          text(
            "A tree node is a struct with a value and two child pointers. Trees are naturally **recursive**: each child is the root of a smaller tree (a **subtree**), so most tree functions handle the current node and call themselves on the left and right subtrees, with `NULL` (an empty tree) as the base case.",
            {
              label: "Building a small tree and counting its nodes",
              content: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
};

struct TreeNode *node(int value, struct TreeNode *left, struct TreeNode *right) {
    struct TreeNode *n = malloc(sizeof *n);
    if (n != NULL) {
        n->value = value;
        n->left = left;
        n->right = right;
    }
    return n;
}

int size(const struct TreeNode *t) {
    if (t == NULL) return 0;                       // empty tree
    return 1 + size(t->left) + size(t->right);     // me + both subtrees
}

void free_tree(struct TreeNode *t) {
    if (t == NULL) return;
    free_tree(t->left);
    free_tree(t->right);
    free(t);
}

int main(void) {
    // root 2, with 1 as its left child and 3 as its right child
    struct TreeNode *root = node(2, node(1, NULL, NULL), node(3, NULL, NULL));
    printf("size: %d\\n", size(root));
    free_tree(root);
    return 0;
}`,
            },
          ),
          text(
            "The same recursive shape answers many questions. The **height** of a tree is 1 plus the height of its taller subtree. A node is a **leaf** when both children are NULL. The **sum** is the node's value plus the sums of both subtrees.",
          ),
          callout(
            "tip",
            "When writing a tree function, ask two questions: what is the answer for an empty tree (NULL)? And how do I combine my own value with the answers from my left and right subtrees?",
          ),
          quiz(
            "What is a leaf?",
            ["The root node", "A node with no children", "A node with exactly one child", "The node with the smallest value"],
            1,
            "A leaf's left and right pointers are both NULL.",
          ),
          quiz(
            "What should `height(NULL)` return so that a single node has height 1?",
            ["-1", "0", "1", "NULL"],
            1,
            "height(node) = 1 + max(height(left), height(right)). With height(NULL) = 0, a lone node gets 1 + 0 = 1.",
          ),
        ],
        challenge: {
          instructions:
            "The starter builds a 9-node tree. Write recursive int tree_size, int tree_height (nodes on the longest path), int count_leaves and int tree_sum, and print size: 9, height: 4, leaves: 4 and sum: 66. Free the tree.",
          description: task(
            "The starter builds this tree with `make_node`:\n\n8 at the root; 3 and 10 below it; 1 and 6 under 3; 14 under 10 (right); 4 and 7 under 6; 13 under 14 (left).\n\nWrite four **recursive** functions: `int tree_size(const struct TreeNode *t)`, `int tree_height(const struct TreeNode *t)` (the number of nodes on the longest root-to-leaf path), `int count_leaves(const struct TreeNode *t)` and `int tree_sum(const struct TreeNode *t)`. Print the results and free the tree with the provided `free_tree`.",
            "size: 9\nheight: 4\nleaves: 4\nsum: 66",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

${TREE_STRUCT}

struct TreeNode *make_node(int value, struct TreeNode *left, struct TreeNode *right) {
    struct TreeNode *n = malloc(sizeof *n);
    n->value = value;
    n->left = left;
    n->right = right;
    return n;
}

void free_tree(struct TreeNode *t) {
    if (t == NULL) return;
    free_tree(t->left);
    free_tree(t->right);
    free(t);
}

// Write tree_size, tree_height, count_leaves and tree_sum here


int main(void) {
    struct TreeNode *root =
        make_node(8,
            make_node(3,
                make_node(1, NULL, NULL),
                make_node(6, make_node(4, NULL, NULL), make_node(7, NULL, NULL))),
            make_node(10,
                NULL,
                make_node(14, make_node(13, NULL, NULL), NULL)));

    // Print size, height, leaves and sum

    free_tree(root);
    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

${TREE_STRUCT}

struct TreeNode *make_node(int value, struct TreeNode *left, struct TreeNode *right) {
    struct TreeNode *n = malloc(sizeof *n);
    n->value = value;
    n->left = left;
    n->right = right;
    return n;
}

void free_tree(struct TreeNode *t) {
    if (t == NULL) return;
    free_tree(t->left);
    free_tree(t->right);
    free(t);
}

int tree_size(const struct TreeNode *t) {
    if (t == NULL) return 0;
    return 1 + tree_size(t->left) + tree_size(t->right);
}

int tree_height(const struct TreeNode *t) {
    if (t == NULL) return 0;
    int left = tree_height(t->left);
    int right = tree_height(t->right);
    return 1 + (left > right ? left : right);
}

int count_leaves(const struct TreeNode *t) {
    if (t == NULL) return 0;
    if (t->left == NULL && t->right == NULL) return 1;
    return count_leaves(t->left) + count_leaves(t->right);
}

int tree_sum(const struct TreeNode *t) {
    if (t == NULL) return 0;
    return t->value + tree_sum(t->left) + tree_sum(t->right);
}

int main(void) {
    struct TreeNode *root =
        make_node(8,
            make_node(3,
                make_node(1, NULL, NULL),
                make_node(6, make_node(4, NULL, NULL), make_node(7, NULL, NULL))),
            make_node(10,
                NULL,
                make_node(14, make_node(13, NULL, NULL), NULL)));

    printf("size: %d\\n", tree_size(root));
    printf("height: %d\\n", tree_height(root));
    printf("leaves: %d\\n", count_leaves(root));
    printf("sum: %d\\n", tree_sum(root));

    free_tree(root);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Counts the nodes and measures the height",
              outputIncludes: ["size: 9", "height: 4"],
              hint: "height = 1 + the larger of the two subtree heights; height(NULL) = 0.",
            },
            {
              id: "t2",
              label: "Counts the leaves and sums the values",
              expectedOutput: "size: 9\nheight: 4\nleaves: 4\nsum: 66",
              hint: "A leaf has both children NULL. The leaves are 1, 4, 7 and 13.",
            },
            {
              id: "t3",
              label: "The functions are recursive",
              keywords: [
                { pattern: "\\btree_size\\s*\\(\\s*\\w+\\s*->\\s*left\\s*\\)" },
                { pattern: "\\btree_height\\s*\\(\\s*\\w+\\s*->\\s*right\\s*\\)" },
                { pattern: "\\bcount_leaves\\s*\\(\\s*\\w+\\s*->\\s*left\\s*\\)" },
                { pattern: "\\btree_sum\\s*\\(\\s*\\w+\\s*->\\s*right\\s*\\)" },
              ],
              hint: "Each function calls itself on t->left and t->right.",
            },
          ],
        },
      },
      {
        id: "c_data_structures-3-1",
        title: "BST Insert & Search",
        xp: 25,
        chapterTitle: "Trees",
        theory: [
          text(
            "A **binary search tree** (BST) keeps its values in order: for every node, all values in the **left** subtree are smaller and all values in the **right** subtree are larger. That rule lets a search discard half of the remaining tree at every step, like looking up a word in a dictionary.",
          ),
          text(
            "**Search:** compare the target with the current node. Equal means found; smaller means go left; larger means go right; NULL means it isn't there. **Insert** follows the same path and attaches a new node where the search would have ended.",
            {
              label: "Insert and search in a BST",
              content: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int value;
    struct TreeNode *left, *right;
};

struct TreeNode *insert(struct TreeNode *t, int value) {
    if (t == NULL) {
        struct TreeNode *n = malloc(sizeof *n);
        if (n == NULL) return NULL;
        n->value = value;
        n->left = n->right = NULL;
        return n;
    }
    if (value < t->value) t->left = insert(t->left, value);
    else if (value > t->value) t->right = insert(t->right, value);
    return t;                               // duplicates are ignored
}

int contains(const struct TreeNode *t, int value) {
    while (t != NULL) {
        if (value == t->value) return 1;
        t = (value < t->value) ? t->left : t->right;
    }
    return 0;
}

int main(void) {
    struct TreeNode *root = NULL;
    int values[] = {40, 20, 60, 10, 30};
    for (int i = 0; i < 5; i++) root = insert(root, values[i]);

    printf("contains 30: %d\\n", contains(root, 30));
    printf("contains 35: %d\\n", contains(root, 35));
    return 0;   // (freeing the tree is covered in the next lesson)
}`,
            },
          ),
          text(
            "The **minimum** is found by going left until there is no left child, and the **maximum** by going right. In a balanced BST each step halves the search space, so finding a value among a million takes about 20 comparisons instead of up to a million in a list.",
          ),
          callout(
            "warning",
            "Inserting values that are already sorted (1, 2, 3, 4, ...) builds a tree that is just one long right-leaning chain, and searching becomes as slow as a linked list. Self-balancing trees (AVL, red-black) fix this by restructuring as they insert.",
          ),
          quiz(
            "In a BST, where is a value smaller than the current node?",
            ["In the right subtree", "In the left subtree", "In either subtree", "Always at the root"],
            1,
            "The ordering rule puts smaller values in the left subtree.",
          ),
          quiz(
            "How do you find the minimum value in a BST?",
            ["Visit every node", "Follow left children until there is no left child", "Follow right children to the end", "Take the root"],
            1,
            "Every step left reaches a smaller value, so the leftmost node holds the minimum.",
          ),
        ],
        challenge: {
          instructions:
            "Read numbers until 0 (50 30 70 20 40 60 80 30) and insert them into a BST, ignoring duplicates. Print how many were inserted and ignored, the min and max, then for each query after the 0 (60 and 65) print whether it was found and at what depth. Free the tree.",
          stdin: "50 30 70 20 40 60 80 30 0 60 65",
          description: task(
            "Read numbers until a `0` and insert each into a BST. `insert` should report whether the value was new, so you can count duplicates. Print how many values were inserted and how many duplicates were ignored, then the minimum and maximum. After the `0`, read query numbers until the input ends; for each, print whether it is in the tree and its **depth** (the root has depth 0). Free the tree at the end.",
            "inserted 7 values (1 duplicate ignored)\nmin: 20, max: 80\nsearch 60: found at depth 2\nsearch 65: not found",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

${TREE_STRUCT}

// Write insert (reporting whether the value was new), tree_min, tree_max,
// depth_of (returns -1 if not found) and free_tree here


int main(void) {
    struct TreeNode *root = NULL;
    int value;

    // Read values until 0 and insert them, counting new values and duplicates

    // Print the counts, then the min and max

    // Read queries until the input ends; print found with depth or not found

    // Free the tree

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

${TREE_STRUCT}

struct TreeNode *insert(struct TreeNode *t, int value, int *added) {
    if (t == NULL) {
        struct TreeNode *n = malloc(sizeof *n);
        if (n == NULL) return NULL;
        n->value = value;
        n->left = n->right = NULL;
        *added = 1;
        return n;
    }
    if (value < t->value) {
        t->left = insert(t->left, value, added);
    } else if (value > t->value) {
        t->right = insert(t->right, value, added);
    }
    return t;
}

int tree_min(const struct TreeNode *t) {
    while (t->left != NULL) t = t->left;
    return t->value;
}

int tree_max(const struct TreeNode *t) {
    while (t->right != NULL) t = t->right;
    return t->value;
}

int depth_of(const struct TreeNode *t, int value) {
    int depth = 0;
    while (t != NULL) {
        if (value == t->value) return depth;
        t = (value < t->value) ? t->left : t->right;
        depth++;
    }
    return -1;
}

void free_tree(struct TreeNode *t) {
    if (t == NULL) return;
    free_tree(t->left);
    free_tree(t->right);
    free(t);
}

int main(void) {
    struct TreeNode *root = NULL;
    int value;
    int inserted = 0, duplicates = 0;

    while (scanf("%d", &value) == 1 && value != 0) {
        int added = 0;
        root = insert(root, value, &added);
        if (added) inserted++; else duplicates++;
    }

    printf("inserted %d values (%d duplicate ignored)\\n", inserted, duplicates);
    printf("min: %d, max: %d\\n", tree_min(root), tree_max(root));

    while (scanf("%d", &value) == 1) {
        int depth = depth_of(root, value);
        if (depth >= 0) {
            printf("search %d: found at depth %d\\n", value, depth);
        } else {
            printf("search %d: not found\\n", value);
        }
    }

    free_tree(root);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Inserts the values and ignores the duplicate",
              outputIncludes: "inserted 7 values (1 duplicate ignored)",
              hint: "When the value equals the node's value, don't insert it.",
            },
            {
              id: "t2",
              label: "Finds the min and max",
              outputIncludes: "min: 20, max: 80",
              hint: "Go left as far as possible for the min, right for the max.",
            },
            {
              id: "t3",
              label: "Searches with depth and reports missing values",
              expectedOutput: "inserted 7 values (1 duplicate ignored)\nmin: 20, max: 80\nsearch 60: found at depth 2\nsearch 65: not found",
              hint: "60 is found via 50 -> 70 -> 60, so its depth is 2.",
            },
            {
              id: "t4",
              label: "Insert and search follow the BST ordering rule",
              keywords: [
                { pattern: "<\\s*\\w+\\s*->\\s*value" },
                { pattern: "->\\s*left\\s*=\\s*insert\\s*\\(" },
                { pattern: "->\\s*right\\s*=\\s*insert\\s*\\(" },
                { pattern: "\\bfree_tree\\s*\\(" },
              ],
              hint: "Smaller values go into t->left = insert(t->left, ...), larger into t->right.",
            },
          ],
        },
      },
      {
        id: "c_data_structures-3-2",
        title: "Tree Traversal",
        xp: 20,
        chapterTitle: "Trees",
        theory: [
          text(
            "A list has one natural order; a tree has several. A **traversal** visits every node exactly once, and the three classic depth-first orders differ only in **when** a node is visited relative to its subtrees.",
          ),
          text(
            "The three orders:\n\n- **In-order:** left subtree, node, right subtree. On a BST this visits the values in **sorted** order.\n- **Pre-order:** node, left, right. The root comes first, which is the order to copy or save a tree.\n- **Post-order:** left, right, node. Children come before parents, which is the order to **free** a tree safely.",
            {
              label: "The three traversals on a small BST",
              content: `#include <stdio.h>
#include <stddef.h>

struct TreeNode {
    int value;
    struct TreeNode *left, *right;
};

void in_order(const struct TreeNode *t) {
    if (t == NULL) return;
    in_order(t->left);
    printf("%d ", t->value);
    in_order(t->right);
}

void pre_order(const struct TreeNode *t) {
    if (t == NULL) return;
    printf("%d ", t->value);
    pre_order(t->left);
    pre_order(t->right);
}

void post_order(const struct TreeNode *t) {
    if (t == NULL) return;
    post_order(t->left);
    post_order(t->right);
    printf("%d ", t->value);
}

int main(void) {
    struct TreeNode a = {1, NULL, NULL}, c = {3, NULL, NULL};
    struct TreeNode b = {2, &a, &c};          // root 2 with children 1 and 3

    in_order(&b);   printf("(in)\\n");
    pre_order(&b);  printf("(pre)\\n");
    post_order(&b); printf("(post)\\n");
    return 0;
}`,
            },
          ),
          diagram("Visiting order for root 2 with children 1 and 3", [
            { id: "in", label: "In-order", color: ACCENT, items: ["1, 2, 3", "left, node, right", "Sorted output for a BST"] },
            { id: "pre", label: "Pre-order", color: "#f97316", items: ["2, 1, 3", "node, left, right", "Copy / save a tree"] },
            { id: "post", label: "Post-order", color: "#22c55e", items: ["1, 3, 2", "left, right, node", "Free a tree"] },
          ]),
          callout(
            "info",
            "There is also **level-order** (breadth-first) traversal, which visits the tree row by row using a queue, the data structure from the previous chapter.",
          ),
          quiz(
            "Which traversal prints the values of a BST in sorted order?",
            ["Pre-order", "In-order", "Post-order", "None of them"],
            1,
            "In-order visits everything smaller (left) before the node and everything larger (right) after it.",
          ),
          quiz(
            "Why is post-order the right order for freeing a tree?",
            [
              "It is the fastest",
              "Both children are freed before their parent, so no node's pointers are read after it is freed",
              "It frees the root first",
              "Pre-order can't free nodes",
            ],
            1,
            "Freeing a parent first would destroy the pointers needed to reach its children.",
          ),
        ],
        challenge: {
          instructions:
            "Build a BST from the input (50 30 70 20 40 60 80). Write in_order, pre_order and post_order that print each value with a leading space, print the three traversals, then free the tree in post-order while counting the nodes freed (7).",
          stdin: "50 30 70 20 40 60 80",
          description: task(
            "Insert the input numbers into a BST (the test gives `50 30 70 20 40 60 80`). Write `in_order`, `pre_order` and `post_order`, each printing every value with a leading space, and print the three traversals with the labels below. Then write `int free_tree(struct TreeNode *t)` that frees the tree in **post-order** and returns how many nodes it freed.",
            "in-order: 20 30 40 50 60 70 80\npre-order: 50 30 20 40 70 60 80\npost-order: 20 40 30 60 80 70 50\nfreed 7 nodes",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>

${TREE_STRUCT}

struct TreeNode *insert(struct TreeNode *t, int value) {
    if (t == NULL) {
        struct TreeNode *n = malloc(sizeof *n);
        n->value = value;
        n->left = n->right = NULL;
        return n;
    }
    if (value < t->value) t->left = insert(t->left, value);
    else if (value > t->value) t->right = insert(t->right, value);
    return t;
}

// Write in_order, pre_order, post_order and free_tree (returns the count) here


int main(void) {
    struct TreeNode *root = NULL;
    int value;
    while (scanf("%d", &value) == 1) {
        root = insert(root, value);
    }

    // Print the three traversals, then free the tree and print the count

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>

${TREE_STRUCT}

struct TreeNode *insert(struct TreeNode *t, int value) {
    if (t == NULL) {
        struct TreeNode *n = malloc(sizeof *n);
        n->value = value;
        n->left = n->right = NULL;
        return n;
    }
    if (value < t->value) t->left = insert(t->left, value);
    else if (value > t->value) t->right = insert(t->right, value);
    return t;
}

void in_order(const struct TreeNode *t) {
    if (t == NULL) return;
    in_order(t->left);
    printf(" %d", t->value);
    in_order(t->right);
}

void pre_order(const struct TreeNode *t) {
    if (t == NULL) return;
    printf(" %d", t->value);
    pre_order(t->left);
    pre_order(t->right);
}

void post_order(const struct TreeNode *t) {
    if (t == NULL) return;
    post_order(t->left);
    post_order(t->right);
    printf(" %d", t->value);
}

int free_tree(struct TreeNode *t) {
    if (t == NULL) return 0;
    int freed = free_tree(t->left) + free_tree(t->right);
    free(t);
    return freed + 1;
}

int main(void) {
    struct TreeNode *root = NULL;
    int value;
    while (scanf("%d", &value) == 1) {
        root = insert(root, value);
    }

    printf("in-order:");
    in_order(root);
    printf("\\npre-order:");
    pre_order(root);
    printf("\\npost-order:");
    post_order(root);
    printf("\\n");

    printf("freed %d nodes\\n", free_tree(root));
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "In-order prints the values sorted",
              outputIncludes: "in-order: 20 30 40 50 60 70 80",
              hint: "left subtree, then the node, then the right subtree.",
            },
            {
              id: "t2",
              label: "Pre-order and post-order are correct",
              outputIncludes: ["pre-order: 50 30 20 40 70 60 80", "post-order: 20 40 30 60 80 70 50"],
              hint: "Pre-order prints the node first; post-order prints it last.",
            },
            {
              id: "t3",
              label: "Prints every line and frees all 7 nodes",
              expectedOutput: "in-order: 20 30 40 50 60 70 80\npre-order: 50 30 20 40 70 60 80\npost-order: 20 40 30 60 80 70 50\nfreed 7 nodes",
              hint: "free_tree frees both subtrees first, then the node, and adds up the counts.",
            },
            {
              id: "t4",
              label: "free_tree frees the children before the node",
              keywords: [
                { pattern: "\\bint\\s+free_tree\\s*\\(\\s*struct\\s+TreeNode\\s*\\*\\s*\\w+\\s*\\)" },
                { pattern: "free_tree\\s*\\(\\s*\\w+\\s*->\\s*left\\s*\\)[\\s\\S]*?free_tree\\s*\\(\\s*\\w+\\s*->\\s*right\\s*\\)[\\s\\S]*?\\bfree\\s*\\(\\s*\\w+\\s*\\)" },
              ],
              hint: "Call free_tree on both children before free(t).",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-4",
    title: "Sorting Algorithms",
    icon: "🔢",
    color: ACCENT,
    lessons: [
      {
        id: "c_data_structures-4-0",
        title: "Bubble Sort",
        xp: 15,
        chapterTitle: "Sorting Algorithms",
        theory: [
          text(
            "Sorting puts data in order, which makes it easier to search, display and compare. **Bubble sort** is the simplest sorting algorithm: walk through the array comparing neighbours, and swap any pair that is in the wrong order. After each full pass, the largest remaining value has \"bubbled\" to the end.",
          ),
          text(
            "Each pass can stop one position earlier, because the end of the array is already sorted. A **swapped** flag adds an important optimisation: if a whole pass makes no swaps, the array is sorted and the algorithm can stop early.",
            {
              label: "Bubble sort with an early exit",
              content: `#include <stdio.h>

void bubble_sort(int *a, int n) {
    for (int pass = 0; pass < n - 1; pass++) {
        int swapped = 0;
        for (int i = 0; i < n - 1 - pass; i++) {
            if (a[i] > a[i + 1]) {
                int tmp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = tmp;
                swapped = 1;
            }
        }
        if (!swapped) break;          // already sorted
    }
}

int main(void) {
    int nums[6] = {9, 4, 7, 1, 8, 2};
    bubble_sort(nums, 6);
    for (int i = 0; i < 6; i++) printf("%d ", nums[i]);
    printf("\\n");
    return 0;
}`,
            },
          ),
          text(
            "Bubble sort is **O(n²)**: for n items it makes roughly n²/2 comparisons, so 10 times more data takes about 100 times longer. With the early exit it is O(n) on data that is already sorted. It is easy to understand, but too slow for large inputs; real programs use `qsort` or algorithms such as merge sort and quicksort, which are O(n log n).",
          ),
          callout(
            "info",
            "Bubble sort is **stable**: equal values keep their original order, because only strictly greater neighbours are swapped.",
          ),
          quiz(
            "After the first pass of bubble sort (ascending), what is guaranteed?",
            ["The smallest value is first", "The largest value is in the last position", "The array is sorted", "Nothing"],
            1,
            "The largest value is carried along by every swap until it reaches the end.",
          ),
          quiz(
            "What does the `swapped` flag let bubble sort do?",
            ["Sort in descending order", "Stop as soon as a pass makes no swaps", "Use less memory", "Sort strings"],
            1,
            "A pass without swaps means every neighbour pair is in order, so the array is sorted.",
          ),
        ],
        challenge: {
          instructions:
            "Implement bubble sort with a swapped flag on int data[5] = {5, 1, 4, 2, 8}. Print the array after each pass and stop when a pass makes no swaps, then print sorted in 3 passes.",
          description: task(
            "Implement bubble sort on `{5, 1, 4, 2, 8}` with a `swapped` flag. Print the array after **every** pass (including the final pass that makes no swaps), stop as soon as a pass makes no swaps, and finally print how many passes were needed.",
            "pass 1: 1 4 2 5 8\npass 2: 1 2 4 5 8\npass 3: 1 2 4 5 8\nsorted in 3 passes",
          ),
          starterCode: `#include <stdio.h>

void print_pass(int pass, const int *a, int n) {
    printf("pass %d:", pass);
    for (int i = 0; i < n; i++) {
        printf(" %d", a[i]);
    }
    printf("\\n");
}

// Write bubble_sort here: return the number of passes it made


int main(void) {
    int data[5] = {5, 1, 4, 2, 8};
    // Sort data, printing it after every pass, then print "sorted in N passes"

    return 0;
}`,
          solution: `#include <stdio.h>

void print_pass(int pass, const int *a, int n) {
    printf("pass %d:", pass);
    for (int i = 0; i < n; i++) {
        printf(" %d", a[i]);
    }
    printf("\\n");
}

int bubble_sort(int *a, int n) {
    int passes = 0;
    for (int pass = 0; pass < n - 1; pass++) {
        int swapped = 0;
        for (int i = 0; i < n - 1 - pass; i++) {
            if (a[i] > a[i + 1]) {
                int tmp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = tmp;
                swapped = 1;
            }
        }
        passes++;
        print_pass(passes, a, n);
        if (!swapped) {
            break;
        }
    }
    return passes;
}

int main(void) {
    int data[5] = {5, 1, 4, 2, 8};
    int passes = bubble_sort(data, 5);
    printf("sorted in %d passes\\n", passes);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "The first two passes are correct",
              outputIncludes: ["pass 1: 1 4 2 5 8", "pass 2: 1 2 4 5 8"],
              hint: "Compare neighbours a[i] and a[i + 1] and swap when the first is larger.",
            },
            {
              id: "t2",
              label: "Stops after the first pass with no swaps",
              expectedOutput: "pass 1: 1 4 2 5 8\npass 2: 1 2 4 5 8\npass 3: 1 2 4 5 8\nsorted in 3 passes",
              hint: "Pass 3 makes no swaps, so print it and stop.",
            },
            {
              id: "t3",
              label: "Uses a swapped flag and compares neighbours",
              keywords: [
                { pattern: "\\bswapped\\b" },
                { pattern: "\\[\\s*\\w+\\s*\\]\\s*>\\s*\\w+\\s*\\[\\s*\\w+\\s*\\+\\s*1\\s*\\]" },
                { pattern: "\\bbreak\\s*;" },
              ],
              hint: "if (a[i] > a[i + 1]) { swap; swapped = 1; } ... if (!swapped) break;",
            },
          ],
        },
      },
      {
        id: "c_data_structures-4-1",
        title: "Selection & Insertion Sort",
        xp: 15,
        chapterTitle: "Sorting Algorithms",
        theory: [
          text(
            "Two more classic O(n²) sorts are worth knowing because they behave quite differently from bubble sort. Both split the array into a sorted part on the left and an unsorted part on the right, and grow the sorted part by one element each step.",
          ),
          text(
            "**Selection sort** finds the smallest value in the unsorted part and swaps it into place. It always makes about n²/2 comparisons, but at most n − 1 swaps, which helps when writing to memory is expensive.",
            {
              label: "Selection sort",
              content: `#include <stdio.h>

void selection_sort(int *a, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[min]) min = j;
        }
        if (min != i) {
            int tmp = a[i]; a[i] = a[min]; a[min] = tmp;
        }
    }
}

int main(void) {
    int a[5] = {64, 25, 12, 22, 11};
    selection_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
            },
          ),
          text(
            "**Insertion sort** takes the next value and shifts larger sorted values one step right until it finds the gap where the value belongs, like sorting a hand of playing cards. It is very fast on data that is almost sorted, stable, and is what fast library sorts use for small pieces.",
            {
              label: "Insertion sort",
              content: `#include <stdio.h>

void insertion_sort(int *a, int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];      // shift right
            j--;
        }
        a[j + 1] = key;           // drop into the gap
    }
}

int main(void) {
    int a[5] = {12, 11, 13, 5, 6};
    insertion_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
            },
          ),
          diagram("Comparing the three simple sorts", [
            { id: "bubble", label: "Bubble", color: "#94a3b8", items: ["Swaps neighbours", "Early exit on sorted data", "Stable"] },
            { id: "selection", label: "Selection", color: "#f97316", items: ["Picks the minimum each step", "Fewest swaps (≤ n − 1)", "Not stable"] },
            { id: "insertion", label: "Insertion", color: ACCENT, items: ["Shifts values into a gap", "Fast on nearly sorted data", "Stable"] },
          ]),
          callout(
            "tip",
            "Counting operations, such as swaps or shifts, is a simple way to compare algorithms on the same data without a stopwatch.",
          ),
          quiz(
            "What does selection sort do in each outer step?",
            ["Swaps all neighbours", "Finds the smallest unsorted value and moves it into place", "Inserts the next value into a gap", "Splits the array in half"],
            1,
            "Step i places the i-th smallest value at index i.",
          ),
          quiz(
            "Which of these sorts is fastest on an array that is already almost sorted?",
            ["Selection sort", "Insertion sort", "Both the same", "Neither can sort it"],
            1,
            "Insertion sort only shifts values that are out of place, so nearly sorted data needs very little work. Selection sort always scans the whole unsorted part.",
          ),
        ],
        challenge: {
          instructions:
            "Implement int selection_sort(int *a, int n) returning the number of swaps and int insertion_sort(int *a, int n) returning the number of shifts. Sort two copies of {29, 10, 14, 37, 13} and print selection: 10 13 14 29 37 (3 swaps) and insertion: 10 13 14 29 37 (5 shifts).",
          description: task(
            "Implement `int selection_sort(int *a, int n)`, which returns how many **swaps** it made (only swap when the minimum isn't already in place), and `int insertion_sort(int *a, int n)`, which returns how many **shifts** it made (each `a[j + 1] = a[j]` counts as one). Sort two copies of the same data and print each result with its count.",
            "selection: 10 13 14 29 37 (3 swaps)\ninsertion: 10 13 14 29 37 (5 shifts)",
          ),
          starterCode: `#include <stdio.h>

void print_result(const char *name, const int *a, int n, int count, const char *unit) {
    printf("%s:", name);
    for (int i = 0; i < n; i++) {
        printf(" %d", a[i]);
    }
    printf(" (%d %s)\\n", count, unit);
}

// Write selection_sort (returns swaps) and insertion_sort (returns shifts) here


int main(void) {
    int first[5] = {29, 10, 14, 37, 13};
    int second[5] = {29, 10, 14, 37, 13};

    // Sort first with selection_sort and second with insertion_sort, print both

    return 0;
}`,
          solution: `#include <stdio.h>

void print_result(const char *name, const int *a, int n, int count, const char *unit) {
    printf("%s:", name);
    for (int i = 0; i < n; i++) {
        printf(" %d", a[i]);
    }
    printf(" (%d %s)\\n", count, unit);
}

int selection_sort(int *a, int n) {
    int swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int min = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[min]) min = j;
        }
        if (min != i) {
            int tmp = a[i];
            a[i] = a[min];
            a[min] = tmp;
            swaps++;
        }
    }
    return swaps;
}

int insertion_sort(int *a, int n) {
    int shifts = 0;
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            shifts++;
            j--;
        }
        a[j + 1] = key;
    }
    return shifts;
}

int main(void) {
    int first[5] = {29, 10, 14, 37, 13};
    int second[5] = {29, 10, 14, 37, 13};

    int swaps = selection_sort(first, 5);
    print_result("selection", first, 5, swaps, "swaps");

    int shifts = insertion_sort(second, 5);
    print_result("insertion", second, 5, shifts, "shifts");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Selection sort sorts with 3 swaps",
              outputIncludes: "selection: 10 13 14 29 37 (3 swaps)",
              hint: "Only swap (and count) when min != i.",
            },
            {
              id: "t2",
              label: "Insertion sort sorts with 5 shifts",
              expectedOutput: "selection: 10 13 14 29 37 (3 swaps)\ninsertion: 10 13 14 29 37 (5 shifts)",
              hint: "Count every a[j + 1] = a[j] inside the while loop.",
            },
            {
              id: "t3",
              label: "Implements both algorithms",
              keywords: [
                { pattern: "\\bint\\s+selection_sort\\s*\\(\\s*int\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\bint\\s+insertion_sort\\s*\\(\\s*int\\s*\\*\\s*\\w+\\s*,\\s*int\\s+\\w+\\s*\\)" },
                { pattern: "\\[\\s*\\w+\\s*\\+\\s*1\\s*\\]\\s*=\\s*\\w+\\s*\\[\\s*\\w+\\s*\\]" },
              ],
              hint: "Insertion sort shifts with a[j + 1] = a[j];",
            },
          ],
        },
      },
      {
        id: "c_data_structures-4-2",
        title: "Capstone: Student Grade Book",
        xp: 35,
        chapterTitle: "Sorting Algorithms",
        theory: [
          text(
            "Real programs combine data structures, each doing the job it is best at. In this capstone a grade book uses three: an **array of structs** to store the records, a **sort** to rank the students by score, and a **binary search tree** keyed by name for an alphabetical list and fast lookups.",
          ),
          text(
            "A BST works with any values that can be compared, not just numbers. For names, compare with `strcmp`: a negative result means the name sorts before, positive means after. The tree can hold a **pointer** to the record in the array instead of a copy.",
            {
              label: "A BST of names with strcmp",
              content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct NameNode {
    const char *name;
    struct NameNode *left, *right;
};

struct NameNode *insert(struct NameNode *t, const char *name) {
    if (t == NULL) {
        struct NameNode *n = malloc(sizeof *n);
        if (n == NULL) return NULL;
        n->name = name;
        n->left = n->right = NULL;
        return n;
    }
    int cmp = strcmp(name, t->name);
    if (cmp < 0) t->left = insert(t->left, name);
    else if (cmp > 0) t->right = insert(t->right, name);
    return t;
}

void print_in_order(const struct NameNode *t) {
    if (t == NULL) return;
    print_in_order(t->left);
    printf("%s ", t->name);
    print_in_order(t->right);
}

void free_names(struct NameNode *t) {
    if (t == NULL) return;
    free_names(t->left);
    free_names(t->right);
    free(t);
}

int main(void) {
    const char *names[] = {"mango", "apple", "pear", "fig"};
    struct NameNode *root = NULL;
    for (int i = 0; i < 4; i++) root = insert(root, names[i]);
    print_in_order(root);
    printf("\\n");
    free_names(root);
    return 0;
}`,
            },
          ),
          text(
            "For the ranking, sort by score from highest to lowest. Using a **stable** sort such as insertion sort means students with equal scores stay in the order they were entered, which makes ties predictable.",
          ),
          diagram("How the grade book fits together", [
            { id: "arr", label: "Array of records", color: "#3b82f6", items: ["Student records[16]", "Filled from the input"] },
            { id: "sort", label: "Insertion sort", color: "#f97316", items: ["On a copy of the array", "Score high → low, stable"] },
            { id: "bst", label: "BST by name", color: ACCENT, items: ["Nodes point at records", "In-order = alphabetical", "Search by name"] },
          ]),
          callout(
            "tip",
            "Sort a **copy** of the records when another structure (like the tree) points into the original array. Sorting the original would move the records under the tree's pointers.",
          ),
          quiz(
            "What does `strcmp(\"Bilal\", \"Ayesha\")` return?",
            ["A negative number", "0", "A positive number", "1 always"],
            2,
            "\"Bilal\" sorts after \"Ayesha\", so strcmp returns a positive value, and in the BST Bilal goes to the right.",
          ),
          quiz(
            "Why is a stable sort useful for ranking students by score?",
            [
              "It is faster",
              "Students with equal scores keep their original order, so ties come out predictably",
              "It removes duplicates",
              "It sorts names too",
            ],
            1,
            "Stability preserves the relative order of equal keys.",
          ),
        ],
        challenge: {
          instructions:
            "Read name score lines until end, storing them in an array of struct Student. Rank them by score (stable insertion sort on a copy), list names alphabetically with a BST keyed by strcmp, print the average, then look up each name after end. Free the tree.",
          stdin: "Hamza 78\nAyesha 92\nBilal 85\nZara 67\nOmar 92\nend\nBilal\nSana\n",
          description: task(
            "Build the grade book. Read `name score` pairs until the word `end`, storing them in an array of `struct Student { char name[32]; int score; }`. Then:\n\n- Rank a **copy** of the array by score, highest first, with a stable insertion sort, and print the ranking.\n- Insert a pointer to every record into a **BST ordered by name** (`strcmp`) and print the names alphabetically with an in-order traversal.\n- Print the average score.\n- Read the names after `end` and look each one up in the BST.\n\nFree the tree at the end.",
            "ranking:\n1. Ayesha 92\n2. Omar 92\n3. Bilal 85\n4. Hamza 78\n5. Zara 67\nalphabetical: Ayesha Bilal Hamza Omar Zara\naverage: 82.80\nBilal: 85\nSana: not found",
          ),
          starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STUDENTS 16

struct Student {
    char name[32];
    int score;
};

struct TreeNode {
    const struct Student *student;
    struct TreeNode *left;
    struct TreeNode *right;
};

// Write: an insertion sort by score (high to low), BST insert / find by name,
// an in-order print and free_tree


int main(void) {
    struct Student records[MAX_STUDENTS];
    int count = 0;
    char word[32];

    // 1. Read "name score" pairs until the word "end"

    // 2. Rank a copy of the records and print "ranking:" with numbered lines

    // 3. Build the BST of pointers to the records and print "alphabetical: ..."

    // 4. Print the average, then look up each name after "end"

    // 5. Free the tree

    return 0;
}`,
          solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STUDENTS 16

struct Student {
    char name[32];
    int score;
};

struct TreeNode {
    const struct Student *student;
    struct TreeNode *left;
    struct TreeNode *right;
};

void sort_by_score(struct Student *a, int n) {
    for (int i = 1; i < n; i++) {
        struct Student key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j].score < key.score) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}

struct TreeNode *insert(struct TreeNode *t, const struct Student *s) {
    if (t == NULL) {
        struct TreeNode *n = malloc(sizeof *n);
        if (n == NULL) return NULL;
        n->student = s;
        n->left = n->right = NULL;
        return n;
    }
    int cmp = strcmp(s->name, t->student->name);
    if (cmp < 0) t->left = insert(t->left, s);
    else if (cmp > 0) t->right = insert(t->right, s);
    return t;
}

const struct Student *find(const struct TreeNode *t, const char *name) {
    while (t != NULL) {
        int cmp = strcmp(name, t->student->name);
        if (cmp == 0) return t->student;
        t = (cmp < 0) ? t->left : t->right;
    }
    return NULL;
}

void print_names(const struct TreeNode *t) {
    if (t == NULL) return;
    print_names(t->left);
    printf(" %s", t->student->name);
    print_names(t->right);
}

void free_tree(struct TreeNode *t) {
    if (t == NULL) return;
    free_tree(t->left);
    free_tree(t->right);
    free(t);
}

int main(void) {
    struct Student records[MAX_STUDENTS];
    int count = 0;
    char word[32];

    while (count < MAX_STUDENTS && scanf("%31s", word) == 1 && strcmp(word, "end") != 0) {
        strcpy(records[count].name, word);
        if (scanf("%d", &records[count].score) != 1) break;
        count++;
    }

    struct Student ranked[MAX_STUDENTS];
    memcpy(ranked, records, count * sizeof records[0]);
    sort_by_score(ranked, count);
    printf("ranking:\\n");
    for (int i = 0; i < count; i++) {
        printf("%d. %s %d\\n", i + 1, ranked[i].name, ranked[i].score);
    }

    struct TreeNode *root = NULL;
    int total = 0;
    for (int i = 0; i < count; i++) {
        root = insert(root, &records[i]);
        total += records[i].score;
    }
    printf("alphabetical:");
    print_names(root);
    printf("\\n");
    printf("average: %.2f\\n", (double)total / count);

    while (scanf("%31s", word) == 1) {
        const struct Student *s = find(root, word);
        if (s != NULL) {
            printf("%s: %d\\n", s->name, s->score);
        } else {
            printf("%s: not found\\n", word);
        }
    }

    free_tree(root);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Ranks the students by score, keeping ties in input order",
              outputIncludes: "ranking:\n1. Ayesha 92\n2. Omar 92\n3. Bilal 85\n4. Hamza 78\n5. Zara 67",
              hint: "Insertion sort with a[j].score < key.score keeps equal scores in order.",
            },
            {
              id: "t2",
              label: "Lists the names alphabetically from the BST",
              outputIncludes: "alphabetical: Ayesha Bilal Hamza Omar Zara",
              hint: "Insert with strcmp, then print in-order.",
            },
            {
              id: "t3",
              label: "Prints the average and looks up names",
              expectedOutput: "ranking:\n1. Ayesha 92\n2. Omar 92\n3. Bilal 85\n4. Hamza 78\n5. Zara 67\nalphabetical: Ayesha Bilal Hamza Omar Zara\naverage: 82.80\nBilal: 85\nSana: not found",
              hint: "Average is 414 / 5; search the BST with strcmp for each query.",
            },
            {
              id: "t4",
              label: "Uses a BST ordered by strcmp and frees it",
              keywords: [
                { pattern: "\\bstrcmp\\s*\\(\\s*\\w+\\s*->\\s*name\\s*,\\s*\\w+\\s*->\\s*student\\s*->\\s*name\\s*\\)|\\bstrcmp\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*->\\s*student\\s*->\\s*name\\s*\\)" },
                { pattern: "->\\s*left\\s*=\\s*insert\\s*\\(" },
                { pattern: "\\bfree_tree\\s*\\(" },
              ],
              hint: "Compare names with strcmp(s->name, t->student->name) when inserting.",
            },
          ],
        },
      },
    ],
  },
];

export const C_DATA_STRUCTURES_LESSONS = C_DATA_STRUCTURES_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({ ...l, chapterTitle: l.chapterTitle || ch.title }))
);

export const C_DATA_STRUCTURES_TOTAL_XP = 270;

applyLessonVideoLinks(C_DATA_STRUCTURES_LESSONS, C_DATA_STRUCTURES_VIDEO_LINKS);
