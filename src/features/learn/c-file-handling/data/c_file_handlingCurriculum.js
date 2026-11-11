// PolyCode — C File Handling interactive course
// 5 chapters · 15 lessons · C challenges graded on real program output
// YouTube links: edit c_file_handlingVideoLinks.js
//
// Examples and challenges use tmpfile() where they can: an anonymous file that is
// deleted automatically, so runs on the shared server never collide. Lessons that
// need a real filename delete it again with remove().

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { C_FILE_HANDLING_VIDEO_LINKS } from "./c_file_handlingVideoLinks";

const ACCENT = "#27ae60";

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

export const C_FILE_HANDLING_CHAPTERS = [
  {
    id: "ch-0",
    title: "File Basics",
    icon: "📁",
    color: ACCENT,
    lessons: [
      {
        id: "c_file_handling-0-0",
        title: "What is a File in C?",
        xp: 10,
        chapterTitle: "File Basics",
        theory: [
          text(
            "Programs need to keep data after they finish: settings, saved games, logs, reports. Files make that possible. In C, every open file is reached through a **stream**, represented by a pointer of type `FILE *` from `<stdio.h>`. You never look inside the `FILE` struct; you pass the pointer to functions such as `fprintf`, `fgets` and `fclose`.",
          ),
          text(
            "You have already been using streams. Every C program starts with three open for you: `stdin` (keyboard input), `stdout` (normal output) and `stderr` (error messages). `printf(...)` is just `fprintf(stdout, ...)`, so a function that takes a `FILE *` can write to the screen or to a file with the same code.",
            {
              label: "The three standard streams",
              content: `#include <stdio.h>

int main(void) {
    fprintf(stdout, "this goes to standard output\\n");
    fputs("so does this\\n", stdout);
    fprintf(stderr, "errors go to standard error\\n");
    return 0;
}`,
            },
          ),
          text(
            "Write functions that take a `FILE *` instead of calling `printf` directly. The same function can then print to the screen, write to a file, or write to a temporary file. `tmpfile()` creates an anonymous temporary file that is deleted automatically when it is closed, which is perfect for practising.",
            {
              label: "One function, any stream",
              content: `#include <stdio.h>

void greet(FILE *out, const char *name) {
    fprintf(out, "Hello, %s!\\n", name);
}

int main(void) {
    greet(stdout, "screen");

    FILE *temp = tmpfile();
    if (temp == NULL) {
        return 1;
    }
    greet(temp, "file");
    printf("bytes written to the temp file: %ld\\n", ftell(temp));
    fclose(temp);
    return 0;
}`,
            },
          ),
          diagram("Streams in a C program", [
            { id: "in", label: "stdin", color: "#3b82f6", items: ["Keyboard or piped input", "Read with scanf, fgets, fgetc"] },
            { id: "out", label: "stdout / stderr", color: ACCENT, items: ["Screen output and errors", "Written with printf, fprintf, fputs"] },
            { id: "files", label: "FILE * from fopen / tmpfile", color: "#a855f7", items: ["Files on disk", "Same functions, different stream"] },
          ]),
          callout(
            "info",
            "Output to `stdout` is usually buffered: it collects in memory and is written in chunks. `stderr` is unbuffered, so error messages appear immediately even if the program crashes.",
          ),
          quiz(
            "What is `stdout`?",
            ["A function that prints", "A FILE * stream that is already open for normal output", "A file on the disk", "A keyword for the screen size"],
            1,
            "stdout is one of three FILE * streams that every program starts with. printf writes to it.",
          ),
          quiz(
            "Why write `void report(FILE *out)` instead of a function that calls printf?",
            [
              "printf doesn't work inside functions",
              "The same function can then write to the screen or to any file",
              "FILE * is faster than printf",
              "Files can only be written by functions",
            ],
            1,
            "Passing the stream in makes the function reusable: report(stdout) prints, report(file) saves.",
          ),
        ],
        challenge: {
          instructions:
            "Write void print_receipt(FILE *out, const char *item, double price) that writes item: price with 2 decimals. Call it with stdout for Coffee 3.50 and Bagel 2.25, then write both lines to a tmpfile, rewind it and count the lines in it.",
          description: task(
            "Write `void print_receipt(FILE *out, const char *item, double price)` that writes `item: price` (2 decimals) and a new line to the stream `out`. Call it with `stdout` for Coffee (3.50) and Bagel (2.25). Then open a `tmpfile()`, write the same two receipts into it, `rewind` it, count its lines by reading characters with `fgetc` and counting `'\\n'`, print the count and close the file.",
            "Coffee: 3.50\nBagel: 2.25\nlines in temp file: 2",
          ),
          starterCode: `#include <stdio.h>

// Write print_receipt here


int main(void) {
    // Print both receipts to stdout

    // Write both receipts to a tmpfile, rewind it, count its lines with fgetc, close it

    return 0;
}`,
          solution: `#include <stdio.h>

void print_receipt(FILE *out, const char *item, double price) {
    fprintf(out, "%s: %.2f\\n", item, price);
}

int main(void) {
    print_receipt(stdout, "Coffee", 3.50);
    print_receipt(stdout, "Bagel", 2.25);

    FILE *temp = tmpfile();
    if (temp == NULL) {
        return 1;
    }
    print_receipt(temp, "Coffee", 3.50);
    print_receipt(temp, "Bagel", 2.25);

    rewind(temp);
    int lines = 0;
    int c;
    while ((c = fgetc(temp)) != EOF) {
        if (c == '\\n') {
            lines++;
        }
    }
    printf("lines in temp file: %d\\n", lines);
    fclose(temp);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints both receipts to stdout",
              outputIncludes: ["Coffee: 3.50", "Bagel: 2.25"],
              hint: "fprintf(out, \"%s: %.2f\\n\", item, price);",
            },
            {
              id: "t2",
              label: "Counts the lines written to the temp file",
              expectedOutput: "Coffee: 3.50\nBagel: 2.25\nlines in temp file: 2",
              hint: "rewind the file before reading it back.",
            },
            {
              id: "t3",
              label: "print_receipt takes a FILE * and is used with stdout and a tmpfile",
              keywords: [
                { pattern: "\\bprint_receipt\\s*\\(\\s*FILE\\s*\\*\\s*\\w+\\s*," },
                { pattern: "\\bprint_receipt\\s*\\(\\s*stdout\\s*," },
                { pattern: "\\btmpfile\\s*\\(\\s*\\)" },
                { pattern: "\\bfclose\\s*\\(" },
              ],
              hint: "Pass stdout or the FILE * from tmpfile() as the first argument.",
            },
          ],
        },
      },
      {
        id: "c_file_handling-0-1",
        title: "fopen & fclose",
        xp: 10,
        chapterTitle: "File Basics",
        theory: [
          text(
            "`fopen(path, mode)` opens a file by name and returns a `FILE *` (or `NULL` if it can't). The **mode** string says what you intend to do. When you are finished, `fclose` writes any buffered data to disk and releases the file. Every successful `fopen` needs exactly one `fclose`.",
          ),
          text(
            "The modes you will use:\n\n- `\"r\"` read an existing file (fails if it doesn't exist).\n- `\"w\"` write: creates the file, or **empties** it if it already exists.\n- `\"a\"` append: creates the file if needed and adds to the end.\n- `\"r+\"`, `\"w+\"`, `\"a+\"` the same, but allow both reading and writing.\n- Add `b` (`\"rb\"`, `\"wb\"`) for binary files, where bytes must not be changed. On Windows, text mode turns `\\n` into `\\r\\n` on disk; binary mode never does.",
            {
              label: "Write, append, then read a file",
              content: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("modes_demo.txt", "w");    // create or empty
    if (f == NULL) return 1;
    fputs("first line\\n", f);
    fclose(f);

    f = fopen("modes_demo.txt", "a");          // add to the end
    if (f == NULL) return 1;
    fputs("appended line\\n", f);
    fclose(f);

    f = fopen("modes_demo.txt", "r");          // read it back
    if (f == NULL) return 1;
    char line[64];
    while (fgets(line, sizeof line, f) != NULL) {
        printf("%s", line);
    }
    fclose(f);

    remove("modes_demo.txt");                  // tidy up
    return 0;
}`,
            },
          ),
          text(
            "`remove(path)` deletes a file and returns 0 on success. The examples in this course delete the files they create, so nothing is left behind on the shared server.",
          ),
          callout(
            "warning",
            "Opening an existing file with `\"w\"` erases it immediately, before you write anything. Use `\"a\"` to add to a file, and `\"r+\"` to edit one in place.",
          ),
          quiz(
            "Which mode adds new text to the end of a file without erasing what is already there?",
            ["\"r\"", "\"w\"", "\"a\"", "\"wb\""],
            2,
            "\"a\" (append) creates the file if needed and always writes at the end. \"w\" empties the file first.",
          ),
          quiz(
            "Why must you call fclose?",
            [
              "To delete the file",
              "To flush buffered data to the file and release it",
              "Because fopen can only be called once",
              "It isn't necessary",
            ],
            1,
            "Writes are buffered in memory. fclose flushes them to disk and frees the stream; without it, data can be lost and the program can run out of file handles.",
          ),
        ],
        challenge: {
          instructions:
            "Using the file visits.txt: open it with w and write visit 1, close it; open it with a and write visit 2, close it; open it with r and print every line; close it, remove it and print removed: yes.",
          description: task(
            "Use the file `visits.txt`. Open it with mode `\"w\"` and write `visit 1`, then close it. Open it again with `\"a\"` and write `visit 2`, then close it. Open it with `\"r\"`, print every line with `fgets`, and close it. Finally delete it with `remove` and print whether that succeeded.",
            "visit 1\nvisit 2\nremoved: yes",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    // 1. Open visits.txt with "w", write "visit 1", close it

    // 2. Open it with "a", write "visit 2", close it

    // 3. Open it with "r", print each line, close it

    // 4. Remove the file and print "removed: yes" (or "no")

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("visits.txt", "w");
    if (f == NULL) return 1;
    fputs("visit 1\\n", f);
    fclose(f);

    f = fopen("visits.txt", "a");
    if (f == NULL) return 1;
    fputs("visit 2\\n", f);
    fclose(f);

    f = fopen("visits.txt", "r");
    if (f == NULL) return 1;
    char line[64];
    while (fgets(line, sizeof line, f) != NULL) {
        printf("%s", line);
    }
    fclose(f);

    printf("removed: %s\\n", remove("visits.txt") == 0 ? "yes" : "no");
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "The second write appends instead of replacing",
              outputIncludes: "visit 1\nvisit 2",
              hint: "Open with \"a\" the second time; \"w\" would erase visit 1.",
            },
            {
              id: "t2",
              label: "Prints both lines and removes the file",
              expectedOutput: "visit 1\nvisit 2\nremoved: yes",
              hint: "Close the file before calling remove(\"visits.txt\").",
            },
            {
              id: "t3",
              label: "Uses the w, a and r modes, fclose and remove",
              keywords: [
                { pattern: "fopen\\s*\\(\\s*\"visits\\.txt\"\\s*,\\s*\"w\"\\s*\\)" },
                { pattern: "fopen\\s*\\(\\s*\"visits\\.txt\"\\s*,\\s*\"a\"\\s*\\)" },
                { pattern: "fopen\\s*\\(\\s*\"visits\\.txt\"\\s*,\\s*\"r\"\\s*\\)" },
                { pattern: "\\bremove\\s*\\(\\s*\"visits\\.txt\"\\s*\\)" },
              ],
              hint: "Three fopen calls with \"w\", \"a\" and \"r\", each followed by fclose.",
            },
          ],
        },
      },
      {
        id: "c_file_handling-0-2",
        title: "Error Handling with Files",
        xp: 10,
        chapterTitle: "File Basics",
        theory: [
          text(
            "Files fail in ways your code can't prevent: the file doesn't exist, you don't have permission, the disk is full, the name is a folder. A robust program checks every file operation and gives the user a clear message instead of crashing.",
          ),
          text(
            "`fopen` returns `NULL` on failure and sets the global variable `errno` (from `<errno.h>`) to a code saying why. `strerror(errno)` (from `<string.h>`) turns that code into a readable message, and `perror(\"prefix\")` prints the prefix and the message to `stderr`.",
            {
              label: "Reporting why fopen failed",
              content: `#include <stdio.h>
#include <string.h>
#include <errno.h>

int main(void) {
    FILE *f = fopen("does_not_exist.txt", "r");
    if (f == NULL) {
        printf("could not open: %s\\n", strerror(errno));
        printf("errno was %d\\n", errno);
        printf("carrying on without the file\\n");
        // A program that can't continue would print to stderr with
        // perror("does_not_exist.txt") and return 1 here.
        return 0;
    }
    fclose(f);
    return 0;
}`,
            },
          ),
          text(
            "Read `errno` **immediately** after the call that failed: later library calls may overwrite it. Writing can fail too, so check the return values of output functions and of `fclose`, which reports errors from flushing the last buffered data.",
            {
              label: "A helper that opens or explains",
              content: `#include <stdio.h>
#include <string.h>
#include <errno.h>

FILE *open_checked(const char *path, const char *mode) {
    FILE *f = fopen(path, mode);
    if (f == NULL) {
        printf("error opening %s: %s\\n", path, strerror(errno));
    }
    return f;
}

int main(void) {
    FILE *f = open_checked("missing_config.ini", "r");
    if (f == NULL) {
        printf("using default settings instead\\n");
    } else {
        fclose(f);
    }
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Never pass a NULL `FILE *` to `fprintf`, `fgets` or `fclose`: it crashes the program. Check `fopen`'s result first, every time.",
          ),
          quiz(
            "How do you find out why fopen returned NULL?",
            ["Call fopen again", "Read errno and convert it with strerror", "Check the file's size", "You can't"],
            1,
            "fopen sets errno to a code such as ENOENT. strerror(errno) gives the message, for example \"No such file or directory\".",
          ),
          quiz(
            "Where does `perror` print its message?",
            ["stdout", "stderr", "Into the file", "Nowhere"],
            1,
            "perror writes to stderr, the stream for error messages.",
          ),
        ],
        challenge: {
          instructions:
            "Write FILE *open_or_report(const char *path, const char *mode) that prints cannot open <path>: <reason> using strerror(errno) and returns NULL on failure. Try missing_input.txt for reading (fails), then report_out.txt for writing (succeeds); close and remove it.",
          description: task(
            "Write `FILE *open_or_report(const char *path, const char *mode)`. It calls `fopen`; on failure it prints `cannot open PATH: REASON` using `strerror(errno)` and returns NULL. In `main`, try to open `missing_input.txt` for reading (it doesn't exist), then open `report_out.txt` for writing and print `opened report_out.txt for writing`. Close that file and `remove` it.",
            "cannot open missing_input.txt: No such file or directory\nopened report_out.txt for writing",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>
#include <errno.h>

// Write open_or_report here


int main(void) {
    // Try to open missing_input.txt for reading

    // Open report_out.txt for writing, report success, close it and remove it

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>
#include <errno.h>

FILE *open_or_report(const char *path, const char *mode) {
    FILE *f = fopen(path, mode);
    if (f == NULL) {
        printf("cannot open %s: %s\\n", path, strerror(errno));
        return NULL;
    }
    return f;
}

int main(void) {
    FILE *in = open_or_report("missing_input.txt", "r");
    if (in != NULL) {
        fclose(in);
    }

    FILE *out = open_or_report("report_out.txt", "w");
    if (out != NULL) {
        printf("opened report_out.txt for writing\\n");
        fclose(out);
        remove("report_out.txt");
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Explains why the missing file can't be opened",
              outputIncludes: "cannot open missing_input.txt: No such file or directory",
              hint: "printf(\"cannot open %s: %s\\n\", path, strerror(errno));",
            },
            {
              id: "t2",
              label: "Reports both attempts",
              expectedOutput: "cannot open missing_input.txt: No such file or directory\nopened report_out.txt for writing",
              hint: "Only print the success line when open_or_report didn't return NULL.",
            },
            {
              id: "t3",
              label: "Uses strerror(errno), checks for NULL and removes the file",
              keywords: [
                { pattern: "\\bFILE\\s*\\*\\s*open_or_report\\s*\\(" },
                { pattern: "\\bstrerror\\s*\\(\\s*errno\\s*\\)" },
                { pattern: "==\\s*NULL|!=\\s*NULL" },
                { pattern: "\\bremove\\s*\\(\\s*\"report_out\\.txt\"\\s*\\)" },
              ],
              hint: "Check the FILE * against NULL before using it.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-1",
    title: "Reading Files",
    icon: "📖",
    color: ACCENT,
    lessons: [
      {
        id: "c_file_handling-1-0",
        title: "fgetc & fgets",
        xp: 15,
        chapterTitle: "Reading Files",
        theory: [
          text(
            "Text can be read one character at a time or one line at a time. `fgetc(stream)` returns the next character, and `fgets(buffer, size, stream)` reads a whole line. Both work on any stream, files and `stdin` alike, so everything here also works for reading user input.",
          ),
          text(
            "`fgetc` returns an **int**, not a char: either a character value or the special value `EOF` (end of file). Store it in an `int` so `EOF` can be told apart from real characters.",
            {
              label: "Counting characters and lines with fgetc (input: two lines)",
              stdin: "hello\nworld\n",
              content: `#include <stdio.h>

int main(void) {
    int c;
    int chars = 0, lines = 0;

    while ((c = fgetc(stdin)) != EOF) {
        chars++;
        if (c == '\\n') {
            lines++;
        }
    }
    printf("%d characters, %d lines\\n", chars, lines);
    return 0;
}`,
            },
          ),
          text(
            "`fgets` reads up to `size - 1` characters, **stops after a newline** (and keeps it), and always adds `'\\0'`. It returns NULL at the end of the input, which makes a clean loop. Remove the newline with `line[strcspn(line, \"\\n\")] = '\\0';` when you don't want it.",
            {
              label: "Reading lines with fgets (input: three names)",
              stdin: "Ada\nLinus\nGrace\n",
              content: `#include <stdio.h>
#include <string.h>

int main(void) {
    char line[64];
    int number = 1;

    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';     // drop the newline
        printf("%d) %s (%zu letters)\\n", number++, line, strlen(line));
    }
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "Storing `fgetc`'s result in a `char` is a classic bug: on some systems the loop never sees `EOF`, and on others a real character is mistaken for it. Always use `int c`.",
          ),
          quiz(
            "Why is `fgetc`'s result stored in an `int`?",
            ["chars can't be compared", "So the special value EOF can be distinguished from every real character", "Because fgetc reads numbers", "It saves memory"],
            1,
            "EOF is a negative int outside the range of characters. An int holds both, a char can't.",
          ),
          quiz(
            "What does `fgets(line, 10, f)` do with a 30-character line?",
            ["Reads the whole line", "Reads 9 characters and leaves the rest for the next call", "Crashes", "Returns NULL"],
            1,
            "fgets reads at most size - 1 characters and adds '\\0'. The rest of the line is read by the following fgets calls.",
          ),
        ],
        challenge: {
          instructions:
            "Read lines from the input with fgets until it ends. Print each without its newline as 1: first line, and so on, then print lines: 3, longest: line 2.",
          stdin: "first line\nsecond, longer line\nthird\n",
          description: task(
            "Read the input line by line with `fgets` until it returns NULL (the test gives three lines). Remove each line's newline and print it numbered as shown. Keep track of the longest line, then print how many lines there were and which one was longest.",
            "1: first line\n2: second, longer line\n3: third\nlines: 3, longest: line 2",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char line[128];

    // Read lines with fgets until it returns NULL
    //   remove the newline, print "N: text", track the longest line

    // Print "lines: X, longest: line Y"

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char line[128];
    int count = 0;
    int longest = 0;
    size_t longest_len = 0;

    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        count++;
        printf("%d: %s\\n", count, line);
        if (strlen(line) > longest_len) {
            longest_len = strlen(line);
            longest = count;
        }
    }
    printf("lines: %d, longest: line %d\\n", count, longest);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints each line numbered, without the newline",
              outputIncludes: "1: first line\n2: second, longer line\n3: third",
              hint: "line[strcspn(line, \"\\n\")] = '\\0'; removes the newline.",
            },
            {
              id: "t2",
              label: "Prints the line count and the longest line",
              expectedOutput: "1: first line\n2: second, longer line\n3: third\nlines: 3, longest: line 2",
              hint: "Compare strlen(line) with the longest length so far.",
            },
            {
              id: "t3",
              label: "Reads with fgets until NULL",
              keywords: [{ pattern: "while\\s*\\(\\s*fgets\\s*\\([^)]*\\bstdin\\s*\\)\\s*!=\\s*NULL\\s*\\)" }],
              hint: "while (fgets(line, sizeof line, stdin) != NULL) { ... }",
            },
          ],
        },
      },
      {
        id: "c_file_handling-1-1",
        title: "fscanf",
        xp: 15,
        chapterTitle: "Reading Files",
        theory: [
          text(
            "When a file contains structured data, such as a name and a score on each line, `fscanf` reads it directly into variables. It works exactly like `scanf`, but takes the stream as its first argument.",
          ),
          text(
            "`fscanf` returns **how many values it stored**. Loop while it returns the number you asked for: it returns fewer when the data doesn't match the format, and `EOF` at the end of the file.",
            {
              label: "Writing records, then reading them with fscanf",
              content: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;

    fprintf(f, "apple 3\\nbanana 12\\ncherry 7\\n");
    rewind(f);                                  // back to the start

    char name[32];
    int qty;
    int total = 0;
    while (fscanf(f, "%31s %d", name, &qty) == 2) {
        printf("%-7s %3d\\n", name, qty);
        total += qty;
    }
    printf("total: %d\\n", total);
    fclose(f);
    return 0;
}`,
            },
          ),
          text(
            "`%s` stops at the first space, so it reads single words. Give it a width (`%31s` for a 32-byte buffer) so a long word can't overflow the array. For lines with spaces in a field, read the whole line with `fgets` and split it, as in the CSV lesson.",
          ),
          callout(
            "tip",
            "After writing to a file you are still positioned at its end. Call `rewind(f)` (or close and reopen it) before reading what you wrote.",
          ),
          quiz(
            "`fscanf(f, \"%s %d\", name, &age)` returns 1. What does that mean?",
            ["Success", "It read the name but not the age, so the data didn't match", "The file is empty", "It read one line"],
            1,
            "The return value counts stored values. 1 of 2 means the second value couldn't be read as a number.",
          ),
          quiz(
            "Why write `%31s` instead of `%s` for `char name[32]`?",
            ["To read 31 words", "So fscanf stores at most 31 characters plus '\\0' and can't overflow name", "Because %s doesn't work with files", "It is required for fscanf"],
            1,
            "The width limits how much fscanf writes into the buffer, leaving room for the terminator.",
          ),
        ],
        challenge: {
          instructions:
            "The starter writes three records (Ada 91, Linus 78, Grace 88) into a tmpfile. Rewind it and read them back with fscanf until it doesn't return 2, printing each record, then the average (85.67) and the best student (Ada).",
          description: task(
            "The starter writes three `name score` records into a `tmpfile`. Rewind the file and read the records back with `fscanf` in a loop that continues while it returns 2. Print each record, then the average score (2 decimals) and the name of the student with the best score.",
            "Ada 91\nLinus 78\nGrace 88\naverage: 85.67\nbest: Ada",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    fprintf(f, "Ada 91\\nLinus 78\\nGrace 88\\n");

    // Rewind, then read "name score" pairs with fscanf while it returns 2
    //   print each record, add up the scores, remember the best name

    // Print the average and the best student, then close the file

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    fprintf(f, "Ada 91\\nLinus 78\\nGrace 88\\n");

    rewind(f);
    char name[32];
    char best[32] = "";
    int score;
    int best_score = -1;
    int total = 0;
    int count = 0;

    while (fscanf(f, "%31s %d", name, &score) == 2) {
        printf("%s %d\\n", name, score);
        total += score;
        count++;
        if (score > best_score) {
            best_score = score;
            strcpy(best, name);
        }
    }
    printf("average: %.2f\\n", (double)total / count);
    printf("best: %s\\n", best);
    fclose(f);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Reads every record back",
              outputIncludes: "Ada 91\nLinus 78\nGrace 88",
              hint: "rewind(f) first, then while (fscanf(f, \"%31s %d\", name, &score) == 2).",
            },
            {
              id: "t2",
              label: "Prints the average and the best student",
              expectedOutput: "Ada 91\nLinus 78\nGrace 88\naverage: 85.67\nbest: Ada",
              hint: "257 / 3 is 85.67; copy the name with strcpy when a score beats the best.",
            },
            {
              id: "t3",
              label: "Rewinds and reads with fscanf, checking for 2 values",
              keywords: [
                { pattern: "\\brewind\\s*\\(\\s*f\\s*\\)" },
                { pattern: "\\bfscanf\\s*\\(\\s*f\\s*,[^;]*\\)\\s*==\\s*2" },
                { pattern: "\\bfclose\\s*\\(\\s*f\\s*\\)" },
              ],
              hint: "Loop while fscanf returns 2.",
            },
          ],
        },
      },
      {
        id: "c_file_handling-1-2",
        title: "fread — binary reads",
        xp: 15,
        chapterTitle: "Reading Files",
        theory: [
          text(
            "Text files store numbers as characters, which have to be parsed. **Binary** files store values exactly as they are in memory: an `int` takes its 4 bytes and is copied straight back into a variable. Binary files are smaller and faster to read, but aren't readable by humans.",
          ),
          text(
            "`fread(buffer, size, count, stream)` reads up to `count` items of `size` bytes each into `buffer`, and returns **how many whole items** it read. A smaller number means the end of the file (or an error) was reached.",
            {
              label: "Reading back an array of ints",
              content: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();               // tmpfile is opened in binary mode
    if (f == NULL) return 1;

    int saved[4] = {7, 14, 21, 28};
    fwrite(saved, sizeof saved[0], 4, f);
    rewind(f);

    int loaded[4];
    size_t got = fread(loaded, sizeof loaded[0], 4, f);
    printf("read %zu ints:", got);
    for (size_t i = 0; i < got; i++) {
        printf(" %d", loaded[i]);
    }
    printf("\\n");
    fclose(f);
    return 0;
}`,
            },
          ),
          text(
            "For large files, read in **chunks** with a fixed-size buffer and loop until `fread` returns 0. Always use the returned count, not the buffer size: the last chunk is usually shorter.",
            {
              label: "Reading in chunks",
              content: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    for (int i = 1; i <= 7; i++) {
        fwrite(&i, sizeof i, 1, f);
    }
    rewind(f);

    int chunk[3];
    size_t got;
    while ((got = fread(chunk, sizeof chunk[0], 3, f)) > 0) {
        printf("got %zu item(s), first %d\\n", got, chunk[0]);
    }
    fclose(f);
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "Open real binary files with `\"rb\"` / `\"wb\"`. In text mode on Windows, a byte that happens to equal `\\n` can be altered, which silently corrupts binary data.",
          ),
          quiz(
            "What does `fread(buf, sizeof(int), 10, f)` return if the file only holds 6 ints?",
            ["10", "6", "24", "0"],
            1,
            "fread returns the number of complete items read: 6.",
          ),
          quiz(
            "Why are binary files usually smaller than text files for numbers?",
            [
              "They are compressed",
              "Each int takes its fixed 4 bytes instead of one byte per digit plus separators",
              "They don't store negative numbers",
              "They skip zeros",
            ],
            1,
            "1000000 is 7 characters plus a separator as text, but always 4 bytes as a binary int.",
          ),
        ],
        challenge: {
          instructions:
            "The starter writes the ints 1 to 10 into a binary tmpfile. Rewind it and read it with fread in chunks of 4 ints, printing each chunk (using the count fread returns), then print total read: 10.",
          description: task(
            "The starter writes the ints 1 to 10 into a binary `tmpfile`. Rewind it and read it back with `fread` into an `int chunk[4]` buffer, looping while `fread` returns more than 0. Print each chunk using the **count that fread returned** (the last chunk is shorter), then the total number of ints read.",
            "chunk: 1 2 3 4\nchunk: 5 6 7 8\nchunk: 9 10\ntotal read: 10",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    for (int i = 1; i <= 10; i++) {
        fwrite(&i, sizeof i, 1, f);
    }

    int chunk[4];
    // Rewind, then fread up to 4 ints at a time while it returns more than 0
    //   print "chunk:" and the values that were read

    // Print the total, then close the file

    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    for (int i = 1; i <= 10; i++) {
        fwrite(&i, sizeof i, 1, f);
    }

    int chunk[4];
    size_t got;
    size_t total = 0;

    rewind(f);
    while ((got = fread(chunk, sizeof chunk[0], 4, f)) > 0) {
        printf("chunk:");
        for (size_t i = 0; i < got; i++) {
            printf(" %d", chunk[i]);
        }
        printf("\\n");
        total += got;
    }
    printf("total read: %zu\\n", total);
    fclose(f);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Reads the first two full chunks",
              outputIncludes: "chunk: 1 2 3 4\nchunk: 5 6 7 8",
              hint: "fread(chunk, sizeof chunk[0], 4, f) reads up to 4 ints.",
            },
            {
              id: "t2",
              label: "Handles the short last chunk and the total",
              expectedOutput: "chunk: 1 2 3 4\nchunk: 5 6 7 8\nchunk: 9 10\ntotal read: 10",
              hint: "Print only the number of ints fread returned, not always 4.",
            },
            {
              id: "t3",
              label: "Loops on fread's return value",
              keywords: [
                { pattern: "\\brewind\\s*\\(\\s*f\\s*\\)" },
                { pattern: "while\\s*\\(\\s*\\(\\s*\\w+\\s*=\\s*fread\\s*\\(" },
              ],
              hint: "while ((got = fread(chunk, sizeof chunk[0], 4, f)) > 0)",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-2",
    title: "Writing Files",
    icon: "✏️",
    color: ACCENT,
    lessons: [
      {
        id: "c_file_handling-2-0",
        title: "fputc & fputs",
        xp: 15,
        chapterTitle: "Writing Files",
        theory: [
          text(
            "The simplest way to write text is `fputc(c, stream)`, which writes one character, and `fputs(text, stream)`, which writes a string. They are the writing partners of `fgetc` and `fgets`, and they work on files, `stdout` and `stderr` alike.",
          ),
          text(
            "`fputs` writes the string exactly as it is and does **not** add a newline, unlike `puts`. Both functions return `EOF` if the write fails.",
            {
              label: "fputc and fputs",
              content: `#include <stdio.h>

int main(void) {
    fputs("Name: ", stdout);
    fputs("Ada", stdout);
    fputc('\\n', stdout);

    for (char c = 'a'; c <= 'e'; c++) {
        fputc(c, stdout);
        fputc(' ', stdout);
    }
    fputc('\\n', stdout);
    return 0;
}`,
            },
          ),
          text(
            "Combining `fgetc` and `fputc` gives a **copy loop**: read a character, write it, repeat until EOF. Changing characters on the way through turns it into a filter, which is how many command-line tools work.",
            {
              label: "A filter: copy input to output in uppercase (input: shout this)",
              stdin: "shout this\n",
              content: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    int c;
    while ((c = fgetc(stdin)) != EOF) {
        fputc(toupper(c), stdout);
    }
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "`fputs` is faster than `fprintf` for plain text because it doesn't scan for `%` placeholders. Use `fprintf` only when you need formatting.",
          ),
          quiz(
            "What is the difference between `fputs(\"hi\", stdout)` and `puts(\"hi\")`?",
            ["None", "puts adds a newline after the text, fputs doesn't", "fputs adds a newline, puts doesn't", "puts only works with files"],
            1,
            "puts always appends '\\n'. fputs writes the string exactly as given.",
          ),
          quiz(
            "What does a fgetc / fputc loop that runs until EOF do?",
            ["Deletes the file", "Copies the input stream to the output stream character by character", "Counts words", "Reads only the first line"],
            1,
            "Every character read is written straight back out until the input ends.",
          ),
        ],
        challenge: {
          instructions:
            "Write void write_box(FILE *out, const char *text) that draws a box around the text with fputc and fputs. Draw hello into a tmpfile, rewind it, and copy the file to stdout with an fgetc/fputc loop.",
          description: task(
            "Write `void write_box(FILE *out, const char *text)` that draws a box around `text` using only `fputc` and `fputs`: a border of `+`, a `-` for each character plus 2, and `+`; then `| text |`; then the border again. Draw `hello` into a `tmpfile`, `rewind` it, then copy the whole file to `stdout` with a `fgetc` / `fputc` loop.",
            "+-------+\n| hello |\n+-------+",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

// Write write_box here using fputc and fputs


int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;

    // Draw "hello" into the file, rewind it, copy it to stdout with fgetc / fputc

    fclose(f);
    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

void write_border(FILE *out, size_t width) {
    fputc('+', out);
    for (size_t i = 0; i < width + 2; i++) {
        fputc('-', out);
    }
    fputs("+\\n", out);
}

void write_box(FILE *out, const char *text) {
    size_t width = strlen(text);
    write_border(out, width);
    fputs("| ", out);
    fputs(text, out);
    fputs(" |\\n", out);
    write_border(out, width);
}

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;

    write_box(f, "hello");
    rewind(f);

    int c;
    while ((c = fgetc(f)) != EOF) {
        fputc(c, stdout);
    }

    fclose(f);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Draws the box around hello",
              expectedOutput: "+-------+\n| hello |\n+-------+",
              hint: "The border has strlen(text) + 2 dashes between the + signs.",
            },
            {
              id: "t2",
              label: "Draws with fputc / fputs only (no printf) and copies the file with fgetc / fputc",
              keywords: [
                { pattern: "\\bvoid\\s+write_box\\s*\\(\\s*FILE\\s*\\*\\s*\\w+\\s*," },
                { pattern: "\\bfputs\\s*\\(" },
                { pattern: "while\\s*\\(\\s*\\(\\s*\\w+\\s*=\\s*fgetc\\s*\\(\\s*f\\s*\\)\\s*\\)\\s*!=\\s*EOF\\s*\\)" },
                { pattern: "\\bfputc\\s*\\(\\s*\\w+\\s*,\\s*stdout\\s*\\)" },
                { pattern: "^(?![\\s\\S]*\\b(f?printf)\\s*\\()" },
              ],
              hint: "Draw with fputc / fputs, then while ((c = fgetc(f)) != EOF) fputc(c, stdout);",
            },
          ],
        },
      },
      {
        id: "c_file_handling-2-1",
        title: "fprintf",
        xp: 15,
        chapterTitle: "Writing Files",
        theory: [
          text(
            "`fprintf(stream, format, ...)` is `printf` aimed at any stream. Everything you know about format specifiers, widths and precision works the same, which makes it the main tool for writing reports, logs and data files.",
          ),
          text(
            "A common use is writing **CSV** (comma-separated values) files, which spreadsheets can open. Write a header row, then one line per record. Here the file is a `tmpfile`, read back so you can see what was written.",
            {
              label: "Writing a small CSV file",
              content: `#include <stdio.h>

int main(void) {
    FILE *csv = tmpfile();
    if (csv == NULL) return 1;

    fprintf(csv, "city,temp\\n");
    fprintf(csv, "%s,%.1f\\n", "Lahore", 31.5);
    fprintf(csv, "%s,%.1f\\n", "Oslo", 4.0);

    rewind(csv);
    char line[64];
    while (fgets(line, sizeof line, csv) != NULL) {
        fputs(line, stdout);
    }
    fclose(csv);
    return 0;
}`,
            },
          ),
          text(
            "`fprintf(stderr, ...)` is the standard way to report errors. Keeping errors on `stderr` means a user who redirects normal output to a file still sees them, and the output file stays clean.",
            {
              label: "Normal output and errors on separate streams",
              content: `#include <stdio.h>

int main(void) {
    int values[3] = {4, -1, 9};
    for (int i = 0; i < 3; i++) {
        if (values[i] < 0) {
            fprintf(stderr, "warning: skipping negative value at %d\\n", i);
            continue;
        }
        fprintf(stdout, "value %d\\n", values[i]);
    }
    return 0;
}`,
            },
          ),
          callout(
            "warning",
            "If a CSV field can contain a comma, it must be wrapped in quotes (`\"Smith, John\"`), or every reader will split it in the wrong place.",
          ),
          quiz(
            "What is `printf(\"%d\\n\", x)` equivalent to?",
            ["fprintf(stderr, \"%d\\n\", x)", "fprintf(stdout, \"%d\\n\", x)", "fputs(x, stdout)", "fputc(x, stdout)"],
            1,
            "printf is fprintf with stdout as the stream.",
          ),
          quiz(
            "Why should a program print error messages with `fprintf(stderr, ...)`?",
            [
              "stderr is faster",
              "Errors stay visible and separate even when normal output is redirected to a file",
              "stdout can't print text",
              "stderr messages are saved automatically",
            ],
            1,
            "Redirecting with > only captures stdout, so errors on stderr still reach the user.",
          ),
        ],
        challenge: {
          instructions:
            "Write a CSV to a tmpfile with fprintf: the header name,qty,price, the rows pen,3,1.50 and notebook,2,4.25, and a total line total,,13.00 computed from qty * price. Rewind and print the file with fgets.",
          description: task(
            "The starter has two products in arrays. Write a CSV file into a `tmpfile` using `fprintf`: the header `name,qty,price`, one row per product with the price to 2 decimals, and a final `total,,` row with the sum of qty × price. Then `rewind` the file and print it line by line with `fgets`.",
            "name,qty,price\npen,3,1.50\nnotebook,2,4.25\ntotal,,13.00",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    const char *names[2] = {"pen", "notebook"};
    int qty[2] = {3, 2};
    double price[2] = {1.50, 4.25};

    FILE *csv = tmpfile();
    if (csv == NULL) return 1;

    // Write the header, the two rows and the total row with fprintf

    // Rewind and print the file line by line with fgets

    fclose(csv);
    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    const char *names[2] = {"pen", "notebook"};
    int qty[2] = {3, 2};
    double price[2] = {1.50, 4.25};

    FILE *csv = tmpfile();
    if (csv == NULL) return 1;

    double total = 0;
    fprintf(csv, "name,qty,price\\n");
    for (int i = 0; i < 2; i++) {
        fprintf(csv, "%s,%d,%.2f\\n", names[i], qty[i], price[i]);
        total += qty[i] * price[i];
    }
    fprintf(csv, "total,,%.2f\\n", total);

    rewind(csv);
    char line[64];
    while (fgets(line, sizeof line, csv) != NULL) {
        fputs(line, stdout);
    }

    fclose(csv);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Writes the header and the product rows",
              outputIncludes: "name,qty,price\npen,3,1.50\nnotebook,2,4.25",
              hint: "fprintf(csv, \"%s,%d,%.2f\\n\", names[i], qty[i], price[i]);",
            },
            {
              id: "t2",
              label: "Adds the computed total row",
              expectedOutput: "name,qty,price\npen,3,1.50\nnotebook,2,4.25\ntotal,,13.00",
              hint: "3 × 1.50 + 2 × 4.25 = 13.00.",
            },
            {
              id: "t3",
              label: "Writes to the file with fprintf and reads it back with fgets",
              keywords: [
                { pattern: "\\bfprintf\\s*\\(\\s*csv\\s*,\\s*\"name,qty,price" },
                { pattern: "\\bfprintf\\s*\\(\\s*csv\\s*,\\s*\"total,," },
                { pattern: "\\brewind\\s*\\(\\s*csv\\s*\\)" },
                { pattern: "\\bfgets\\s*\\([^)]*\\bcsv\\s*\\)" },
              ],
              hint: "All rows go through fprintf(csv, ...); the screen output comes from reading the file.",
            },
          ],
        },
      },
      {
        id: "c_file_handling-2-2",
        title: "fwrite — binary writes",
        xp: 15,
        chapterTitle: "Writing Files",
        theory: [
          text(
            "`fwrite(buffer, size, count, stream)` copies `count` items of `size` bytes from memory straight into a file. It is the fastest way to save arrays and structs: no formatting, no parsing, just bytes. It returns the number of items written, which is less than `count` only if an error occurred.",
          ),
          text(
            "A whole array can be written with one call, and so can an array of structs. `ftell` then shows exactly how many bytes the file holds.",
            {
              label: "Saving an array of structs",
              content: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point path[3] = {{0, 0}, {3, 4}, {6, 8}};

    FILE *f = tmpfile();
    if (f == NULL) return 1;

    size_t written = fwrite(path, sizeof path[0], 3, f);
    printf("wrote %zu points, %ld bytes\\n", written, ftell(f));
    fclose(f);
    return 0;
}`,
            },
          ),
          text(
            "Binary files have a catch: they store the exact memory layout, including struct **padding** and the machine's byte order. A file written on one kind of machine may not read correctly on another, or after the struct definition changes. For data that must last or travel, a text format such as CSV or JSON is safer.",
          ),
          callout(
            "warning",
            "Never `fwrite` a struct that contains pointers (such as `char *name`). The file would store the address, which means nothing when the program runs again. Store fixed-size arrays (`char name[20]`) instead.",
          ),
          quiz(
            "What does `fwrite(arr, sizeof(int), 5, f)` write?",
            ["The text of 5 numbers", "5 ints as raw bytes: 5 × sizeof(int) bytes", "The address of arr", "One int"],
            1,
            "fwrite copies count × size bytes from memory. With 4-byte ints that is 20 bytes.",
          ),
          quiz(
            "Why is saving `struct User { char *name; }` with fwrite a bug?",
            [
              "Structs can't be written",
              "Only the pointer (an address) is saved, not the text it points to",
              "char * is too large",
              "fwrite can't write pointers",
            ],
            1,
            "The address is meaningless in a later run. Use a fixed-size char array inside the struct.",
          ),
        ],
        challenge: {
          instructions:
            "Write the array of 3 struct Reading { int sensor; double value; } to a tmpfile with one fwrite. Print records written: 3 and the file size from ftell (bytes in file: 48), then rewind, read them into a second array with fread and print each sensor's value.",
          description: task(
            "Save the three readings with **one** `fwrite` call into a `tmpfile`. Print how many records `fwrite` reported and the file size from `ftell` (each struct is 16 bytes: an int, 4 padding bytes and a double). Then `rewind`, read the records into the empty `loaded` array with `fread`, and print each one from `loaded`.",
            "records written: 3\nbytes in file: 48\nsensor 1: 20.50\nsensor 2: 19.75\nsensor 3: 21.00",
          ),
          starterCode: `#include <stdio.h>

struct Reading {
    int sensor;
    double value;
};

int main(void) {
    struct Reading readings[3] = {{1, 20.5}, {2, 19.75}, {3, 21.0}};
    struct Reading loaded[3];

    FILE *f = tmpfile();
    if (f == NULL) return 1;

    // Write all three readings with one fwrite, print the count and ftell

    // Rewind, fread into loaded, print each sensor from loaded

    fclose(f);
    return 0;
}`,
          solution: `#include <stdio.h>

struct Reading {
    int sensor;
    double value;
};

int main(void) {
    struct Reading readings[3] = {{1, 20.5}, {2, 19.75}, {3, 21.0}};
    struct Reading loaded[3];

    FILE *f = tmpfile();
    if (f == NULL) return 1;

    size_t written = fwrite(readings, sizeof readings[0], 3, f);
    printf("records written: %zu\\n", written);
    printf("bytes in file: %ld\\n", ftell(f));

    rewind(f);
    size_t got = fread(loaded, sizeof loaded[0], 3, f);
    for (size_t i = 0; i < got; i++) {
        printf("sensor %d: %.2f\\n", loaded[i].sensor, loaded[i].value);
    }

    fclose(f);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Reports the records written and the file size",
              outputIncludes: ["records written: 3", "bytes in file: 48"],
              hint: "fwrite(readings, sizeof readings[0], 3, f) returns 3; ftell(f) gives the size.",
            },
            {
              id: "t2",
              label: "Reads the records back",
              expectedOutput: "records written: 3\nbytes in file: 48\nsensor 1: 20.50\nsensor 2: 19.75\nsensor 3: 21.00",
              hint: "rewind, then fread(loaded, sizeof loaded[0], 3, f).",
            },
            {
              id: "t3",
              label: "One fwrite of all records, ftell, and fread into loaded",
              keywords: [
                { pattern: "\\bfwrite\\s*\\(\\s*readings\\s*,[^;]*,\\s*3\\s*,\\s*f\\s*\\)" },
                { pattern: "\\bftell\\s*\\(\\s*f\\s*\\)" },
                { pattern: "\\bfread\\s*\\(\\s*loaded\\s*," },
                { pattern: "\\bloaded\\s*\\[\\s*\\w+\\s*\\]\\s*\\.\\s*value" },
              ],
              hint: "Print from loaded[i], not from readings[i].",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-3",
    title: "File Navigation",
    icon: "🧭",
    color: ACCENT,
    lessons: [
      {
        id: "c_file_handling-3-0",
        title: "fseek & ftell",
        xp: 20,
        chapterTitle: "File Navigation",
        theory: [
          text(
            "Every open file has a **position**: the byte where the next read or write happens. Reading and writing move it forward automatically. `ftell` tells you the current position, and `fseek` moves it anywhere, so you can jump straight to the data you need instead of reading everything before it.",
          ),
          text(
            "`fseek(f, offset, origin)` moves `offset` bytes from an origin:\n\n- `SEEK_SET` from the start of the file\n- `SEEK_CUR` from the current position\n- `SEEK_END` from the end (use a negative offset to go back)\n\nIt returns 0 on success. Seeking to the end and calling `ftell` is the standard way to get a file's size.",
            {
              label: "Measuring a file and jumping around",
              content: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    fputs("ABCDEFGHIJ", f);

    fseek(f, 0, SEEK_END);
    printf("size: %ld bytes\\n", ftell(f));

    fseek(f, 2, SEEK_SET);
    printf("at 2: %c\\n", fgetc(f));        // reading moves to 3

    fseek(f, 4, SEEK_CUR);
    printf("4 further: %c\\n", fgetc(f));

    fseek(f, -1, SEEK_END);
    printf("last: %c\\n", fgetc(f));
    fclose(f);
    return 0;
}`,
            },
          ),
          text(
            "With **fixed-size records** in a binary file, record `k` starts at byte `k * sizeof(record)`. One `fseek` gets you there, however big the file is. This is **random access**, and it is how simple databases find a record instantly.",
          ),
          diagram("Fixed-size records: record k starts at k * 4 bytes", [
            { id: "r0", label: "record 0", color: "#94a3b8", items: ["bytes 0–3"] },
            { id: "r1", label: "record 1", color: "#94a3b8", items: ["bytes 4–7"] },
            { id: "r2", label: "record 2", color: ACCENT, items: ["bytes 8–11", "fseek(f, 2 * 4, SEEK_SET)"] },
            { id: "r3", label: "record 3", color: "#94a3b8", items: ["bytes 12–15"] },
          ]),
          callout(
            "warning",
            "For text files opened without `b`, only use offsets that came from `ftell` (or 0). On Windows, text mode translates line endings, so byte counts don't match character counts.",
          ),
          quiz(
            "How do you find a file's size in bytes?",
            ["fseek(f, 0, SEEK_SET); ftell(f);", "fseek(f, 0, SEEK_END); ftell(f);", "sizeof(f)", "fgetc(f) until EOF only"],
            1,
            "Jump to the end, then ftell reports the position, which equals the size.",
          ),
          quiz(
            "A binary file holds `double` records (8 bytes each). Where does record 5 start?",
            ["Byte 5", "Byte 13", "Byte 40", "Byte 48"],
            2,
            "Record k starts at k × 8 bytes: 5 × 8 = 40.",
          ),
        ],
        challenge: {
          instructions:
            "The starter writes 5 int records (100, 200, 300, 400, 500) to a binary tmpfile. Use fseek and ftell to print the file size (20 bytes), record 3 (400), record 0 (100) and the last record via SEEK_END (500).",
          description: task(
            "The starter writes five int records into a binary `tmpfile`. Write `int read_record(FILE *f, int index)` that `fseek`s to `index * sizeof(int)` from `SEEK_SET` and reads one int with `fread`. In `main`, print the file size (seek to the end and use `ftell`), record 3, record 0, and the last record by seeking `-(long)sizeof(int)` from `SEEK_END`.",
            "file size: 20 bytes\nrecord 3: 400\nrecord 0: 100\nlast record: 500",
          ),
          starterCode: `#include <stdio.h>

// Write read_record here


int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    int values[5] = {100, 200, 300, 400, 500};
    fwrite(values, sizeof values[0], 5, f);

    // Print the file size, record 3, record 0 and the last record

    fclose(f);
    return 0;
}`,
          solution: `#include <stdio.h>

int read_record(FILE *f, int index) {
    int value = 0;
    fseek(f, (long)(index * sizeof(int)), SEEK_SET);
    fread(&value, sizeof value, 1, f);
    return value;
}

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    int values[5] = {100, 200, 300, 400, 500};
    fwrite(values, sizeof values[0], 5, f);

    fseek(f, 0, SEEK_END);
    printf("file size: %ld bytes\\n", ftell(f));

    printf("record 3: %d\\n", read_record(f, 3));
    printf("record 0: %d\\n", read_record(f, 0));

    int last = 0;
    fseek(f, -(long)sizeof(int), SEEK_END);
    fread(&last, sizeof last, 1, f);
    printf("last record: %d\\n", last);

    fclose(f);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints the file size and record 3",
              outputIncludes: ["file size: 20 bytes", "record 3: 400"],
              hint: "Record 3 starts at byte 3 * sizeof(int) = 12.",
            },
            {
              id: "t2",
              label: "Prints every line",
              expectedOutput: "file size: 20 bytes\nrecord 3: 400\nrecord 0: 100\nlast record: 500",
              hint: "fseek(f, -(long)sizeof(int), SEEK_END) goes to the last record.",
            },
            {
              id: "t3",
              label: "Uses fseek with SEEK_SET and SEEK_END, and ftell",
              keywords: [
                { pattern: "\\bfseek\\s*\\([^;]*\\bSEEK_SET\\s*\\)" },
                { pattern: "\\bfseek\\s*\\([^;]*\\bSEEK_END\\s*\\)" },
                { pattern: "\\bftell\\s*\\(" },
                { pattern: "\\bread_record\\s*\\(\\s*f\\s*,\\s*3\\s*\\)" },
              ],
              hint: "read_record seeks with SEEK_SET; the last record uses SEEK_END.",
            },
          ],
        },
      },
      {
        id: "c_file_handling-3-1",
        title: "rewind",
        xp: 10,
        chapterTitle: "File Navigation",
        theory: [
          text(
            "`rewind(f)` moves the position back to the very beginning of the file. It is the tool for **multi-pass processing**: read the data once to calculate something (a total, an average, a maximum), then read it again to use that result.",
          ),
          text(
            "`rewind(f)` is the same as `fseek(f, 0, SEEK_SET)` with one difference: it also **clears the error and end-of-file flags**. After a read loop has hit EOF, `rewind` resets the stream so the next loop can start fresh.",
            {
              label: "Two passes over the same file",
              content: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    fprintf(f, "5 9 2 8");

    int n, max = 0;
    rewind(f);
    while (fscanf(f, "%d", &n) == 1) {        // pass 1: find the maximum
        if (n > max) max = n;
    }

    rewind(f);                                 // back to the start, EOF cleared
    while (fscanf(f, "%d", &n) == 1) {        // pass 2: compare with it
        printf("%d is %d below the max\\n", n, max - n);
    }
    fclose(f);
    return 0;
}`,
            },
          ),
          text(
            "Two passes cost a second read, but they avoid storing all the data in memory. For a very large file that might not fit in memory, reading twice is often the better trade.",
          ),
          callout(
            "info",
            "`rewind` has no return value. If you need to know whether repositioning succeeded, use `fseek(f, 0, SEEK_SET)` and check that it returns 0.",
          ),
          quiz(
            "What does `rewind(f)` do that `fseek(f, 0, SEEK_SET)` doesn't?",
            ["Deletes the file's contents", "Clears the end-of-file and error flags", "Closes the file", "Moves to the end"],
            1,
            "Both move to the start, but rewind also resets the EOF and error indicators.",
          ),
          quiz(
            "Why is the average-then-compare task a good fit for two passes?",
            [
              "Files can only be read twice",
              "You can't know which values are above the average until the whole file has been read once",
              "fscanf needs two passes",
              "It uses less disk space",
            ],
            1,
            "The average depends on every value, so the comparison has to happen in a second pass (or after storing everything).",
          ),
        ],
        challenge: {
          instructions:
            "The starter writes 4 8 15 16 23 42 to a tmpfile. Pass 1: rewind and read every number with fscanf to compute the average (18.00). Pass 2: rewind again and print the numbers above the average (23 42).",
          description: task(
            "The starter writes six numbers into a `tmpfile`. **Pass 1:** `rewind` the file and read every number with `fscanf` to calculate the average. **Pass 2:** `rewind` again and print only the numbers greater than the average, on one line.",
            "average: 18.00\nabove average: 23 42",
          ),
          starterCode: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    fprintf(f, "4 8 15 16 23 42");

    // Pass 1: rewind, read every number, compute the average

    // Pass 2: rewind, print the numbers above the average

    fclose(f);
    return 0;
}`,
          solution: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    fprintf(f, "4 8 15 16 23 42");

    int n;
    int sum = 0, count = 0;
    rewind(f);
    while (fscanf(f, "%d", &n) == 1) {
        sum += n;
        count++;
    }
    double average = (double)sum / count;
    printf("average: %.2f\\n", average);

    rewind(f);
    printf("above average:");
    while (fscanf(f, "%d", &n) == 1) {
        if (n > average) {
            printf(" %d", n);
        }
    }
    printf("\\n");

    fclose(f);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Computes the average in the first pass",
              outputIncludes: "average: 18.00",
              hint: "108 / 6 = 18.",
            },
            {
              id: "t2",
              label: "Prints the numbers above the average in the second pass",
              expectedOutput: "average: 18.00\nabove average: 23 42",
              hint: "rewind before the second fscanf loop, or it starts at EOF.",
            },
            {
              id: "t3",
              label: "Uses rewind and two fscanf loops",
              keywords: [
                { pattern: "\\brewind\\s*\\(\\s*f\\s*\\)[\\s\\S]*\\brewind\\s*\\(\\s*f\\s*\\)" },
                { pattern: "\\bfscanf\\s*\\([\\s\\S]*\\bfscanf\\s*\\(" },
              ],
              hint: "Read the file twice, rewinding before each pass.",
            },
          ],
        },
      },
      {
        id: "c_file_handling-3-2",
        title: "feof & ferror",
        xp: 15,
        chapterTitle: "File Navigation",
        theory: [
          text(
            "When a read function stops returning data, there are three possible reasons: the file ended, the data didn't match what you asked for, or a real I/O error happened. `feof(f)` and `ferror(f)` tell you which, **after** a read has failed.",
          ),
          text(
            "The correct pattern is: loop on the read function's return value, and when the loop ends, ask why.\n\n- `feof(f)` is true if the end of the file was reached.\n- `ferror(f)` is true if a read or write error occurred.\n- If neither is true, the data simply didn't match the format.",
            {
              label: "Finding out why reading stopped",
              content: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    fprintf(f, "1 2 oops 3");
    rewind(f);

    int n, count = 0;
    while (fscanf(f, "%d", &n) == 1) {
        count++;
    }

    printf("read %d numbers\\n", count);
    if (feof(f)) {
        printf("stopped: end of file\\n");
    } else if (ferror(f)) {
        printf("stopped: read error\\n");
    } else {
        printf("stopped: data didn't match\\n");
    }
    fclose(f);
    return 0;
}`,
            },
          ),
          text(
            "A very common bug is `while (!feof(f)) { fscanf(...); ... }`. `feof` only becomes true **after** a read has already tried and failed, so the loop body runs one extra time with the old value. The last item gets processed twice.",
            {
              label: "Why while (!feof(f)) counts the last item twice",
              content: `#include <stdio.h>

int main(void) {
    FILE *f = tmpfile();
    if (f == NULL) return 1;
    fprintf(f, "10 20 30\\n");          // text files normally end with a newline
    rewind(f);

    int n, sum = 0;
    while (!feof(f)) {                 // WRONG pattern, shown on purpose
        fscanf(f, "%d", &n);
        sum += n;
    }
    printf("buggy sum: %d (should be 60)\\n", sum);
    fclose(f);
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Rule of thumb: use the read function's return value to control the loop. Use `feof` and `ferror` only afterwards, to explain why it stopped.",
          ),
          quiz(
            "When does `feof(f)` become true?",
            ["As soon as the last byte has been read", "After a read tries to go past the end and fails", "When the file is opened", "When the file is empty"],
            1,
            "The end-of-file flag is set by a failed read attempt, not in advance. That is why it can't control a loop.",
          ),
          quiz(
            "A fscanf loop stopped, and both feof(f) and ferror(f) are false. What happened?",
            ["The file ended", "A disk error", "The next data didn't match the format, such as letters where a number was expected", "Nothing"],
            2,
            "No EOF and no error means fscanf met data it couldn't convert.",
          ),
        ],
        challenge: {
          instructions:
            "Write int read_all(FILE *f, int *sum) that reads ints with fscanf until it fails and returns the count. Use it on a file with 1 2 3 and on one with 10 20 x 30, then use feof to report whether each stopped at the end of the file or at bad data.",
          description: task(
            "Write `int read_all(FILE *f, int *sum)` that rewinds the file, reads ints with `fscanf` while it returns 1, adds them to `*sum` and returns how many it read. In `main`, use it on the two prepared files. After each, use `feof` to report whether reading stopped at the end of the file or because of bad data. Don't use `while (!feof(...))`.",
            "good: read 3 numbers, sum 6, stopped at end of file\nbad: read 2 numbers, sum 30, stopped at bad data",
          ),
          starterCode: `#include <stdio.h>

// Write read_all here


void report(const char *name, FILE *f) {
    int sum = 0;
    // Call read_all, then use feof to explain why reading stopped
}

int main(void) {
    FILE *good = tmpfile();
    FILE *bad = tmpfile();
    if (good == NULL || bad == NULL) return 1;
    fprintf(good, "1 2 3");
    fprintf(bad, "10 20 x 30");

    report("good", good);
    report("bad", bad);

    fclose(good);
    fclose(bad);
    return 0;
}`,
          solution: `#include <stdio.h>

int read_all(FILE *f, int *sum) {
    int n, count = 0;
    rewind(f);
    while (fscanf(f, "%d", &n) == 1) {
        *sum += n;
        count++;
    }
    return count;
}

void report(const char *name, FILE *f) {
    int sum = 0;
    int count = read_all(f, &sum);
    printf("%s: read %d numbers, sum %d, stopped at %s\\n",
           name, count, sum, feof(f) ? "end of file" : "bad data");
}

int main(void) {
    FILE *good = tmpfile();
    FILE *bad = tmpfile();
    if (good == NULL || bad == NULL) return 1;
    fprintf(good, "1 2 3");
    fprintf(bad, "10 20 x 30");

    report("good", good);
    report("bad", bad);

    fclose(good);
    fclose(bad);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Reads the good file to the end",
              outputIncludes: "good: read 3 numbers, sum 6, stopped at end of file",
              hint: "After the loop, feof(f) is true when the file ended.",
            },
            {
              id: "t2",
              label: "Stops at the bad data and says so",
              expectedOutput: "good: read 3 numbers, sum 6, stopped at end of file\nbad: read 2 numbers, sum 30, stopped at bad data",
              hint: "fscanf returns 0 at \"x\", and feof is still false.",
            },
            {
              id: "t3",
              label: "Loops on fscanf's result and checks feof afterwards",
              keywords: [
                { pattern: "while\\s*\\(\\s*fscanf\\s*\\([^;]*\\)\\s*==\\s*1\\s*\\)" },
                { pattern: "\\bfeof\\s*\\(\\s*f\\s*\\)" },
                { pattern: "^(?![\\s\\S]*while\\s*\\(\\s*!\\s*feof)" },
              ],
              hint: "while (fscanf(f, \"%d\", &n) == 1) { ... } then feof(f) ? ... : ...",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ch-4",
    title: "Practical Projects",
    icon: "🗂️",
    color: ACCENT,
    lessons: [
      {
        id: "c_file_handling-4-0",
        title: "Reading a CSV in C",
        xp: 20,
        chapterTitle: "Practical Projects",
        theory: [
          text(
            "CSV is everywhere: spreadsheets export it, sensors log it, and many datasets ship as it. Reading CSV in C combines two steps you already know: read each line with `fgets`, then split the line into fields.",
          ),
          text(
            "`sscanf` reads from a string the same way `fscanf` reads from a file. The scanset `%[^,]` means \"read every character that isn't a comma\", which pulls one text field out of a line. Check its return value to skip lines that don't match, such as a header or a blank line.",
            {
              label: "Splitting a line with sscanf",
              content: `#include <stdio.h>

int main(void) {
    const char *line = "Lahore,Punjab,13004135";
    char city[32], province[32];
    long population;

    int fields = sscanf(line, "%31[^,],%31[^,],%ld", city, province, &population);
    printf("fields read: %d\\n", fields);
    printf("%s is in %s with %ld people\\n", city, province, population);
    return 0;
}`,
            },
          ),
          text(
            "Putting it together: read the header line first and ignore it, then read the data lines in a loop. Here the CSV arrives on standard input, just as it would from `cat data.csv | ./program`.",
            {
              label: "Reading a CSV from the input",
              stdin: "item,price\ntea,2.50\ncake,4.00\n",
              content: `#include <stdio.h>

int main(void) {
    char line[128];
    char item[32];
    double price, total = 0;

    fgets(line, sizeof line, stdin);               // skip the header

    while (fgets(line, sizeof line, stdin) != NULL) {
        if (sscanf(line, "%31[^,],%lf", item, &price) == 2) {
            printf("%s costs %.2f\\n", item, price);
            total += price;
        }
    }
    printf("total: %.2f\\n", total);
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "This simple approach doesn't handle quoted fields that contain commas, such as `\"Smith, John\"`. Real-world CSV with quotes needs a small state-machine parser or a library.",
          ),
          quiz(
            "What does `%[^,]` read in sscanf?",
            ["One comma", "Characters up to (not including) the next comma", "Only numbers", "The rest of the line including commas"],
            1,
            "A scanset with ^ reads every character not in the set, so it stops at the first comma.",
          ),
          quiz(
            "Why read the first line separately before the loop?",
            ["fgets can't read the first line", "It is the header row with column names, not data", "To check the file size", "CSV files must start with a blank line"],
            1,
            "The header contains labels like city,population, which shouldn't be processed as a record.",
          ),
        ],
        challenge: {
          instructions:
            "Read the CSV from the input (header city,population,area and three rows). Skip the header, parse each row with sscanf and %[^,], and print each city's density (population / area) with 1 decimal, then rows: 3 and the densest city.",
          stdin: "city,population,area\nLahore,13004135,1772\nKarachi,16093786,3780\nIslamabad,1014825,906\n",
          description: task(
            "Read a CSV file from the input. The first line is the header `city,population,area`; skip it. Read each data line with `fgets`, split it with `sscanf` using `%[^,]` for the city, and print the population density (population ÷ area) with 1 decimal. Finally print how many rows were read and which city is the densest.",
            "Lahore: 7338.7 people per km2\nKarachi: 4257.6 people per km2\nIslamabad: 1120.1 people per km2\nrows: 3\ndensest: Lahore",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char line[128];

    // Skip the header line

    // Read each data line with fgets, split it with sscanf (%[^,] for the city)
    //   print the density, count the rows, remember the densest city

    // Print the row count and the densest city

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char line[128];
    char city[32];
    char densest[32] = "";
    long population;
    double area;
    double best = -1;
    int rows = 0;

    fgets(line, sizeof line, stdin);

    while (fgets(line, sizeof line, stdin) != NULL) {
        if (sscanf(line, "%31[^,],%ld,%lf", city, &population, &area) != 3) {
            continue;
        }
        double density = population / area;
        printf("%s: %.1f people per km2\\n", city, density);
        rows++;
        if (density > best) {
            best = density;
            strcpy(densest, city);
        }
    }

    printf("rows: %d\\n", rows);
    printf("densest: %s\\n", densest);
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Prints each city's density",
              outputIncludes: ["Lahore: 7338.7 people per km2", "Karachi: 4257.6 people per km2", "Islamabad: 1120.1 people per km2"],
              hint: "density = population / area, printed with %.1f.",
            },
            {
              id: "t2",
              label: "Skips the header and reports the row count and densest city",
              expectedOutput: "Lahore: 7338.7 people per km2\nKarachi: 4257.6 people per km2\nIslamabad: 1120.1 people per km2\nrows: 3\ndensest: Lahore",
              hint: "Read the header once with fgets before the loop.",
            },
            {
              id: "t3",
              label: "Reads lines with fgets and splits them with sscanf and %[^,]",
              keywords: [
                { pattern: "while\\s*\\(\\s*fgets\\s*\\(" },
                { pattern: "\\bsscanf\\s*\\(\\s*line\\s*,\\s*\"%\\d*\\[\\^,\\]" },
              ],
              hint: "sscanf(line, \"%31[^,],%ld,%lf\", city, &population, &area)",
            },
          ],
        },
      },
      {
        id: "c_file_handling-4-1",
        title: "Binary File Store",
        xp: 25,
        chapterTitle: "Practical Projects",
        theory: [
          text(
            "A real program saves its data when it closes and loads it when it starts again. A simple, fast way to do that is a **binary file store**: write a small header (such as the number of records), then the records themselves with `fwrite`, and read them back the same way with `fread`.",
          ),
          text(
            "Storing the count first means the loader knows how many records to expect, and can refuse a file that claims more than its array can hold. Use `\"wb\"` and `\"rb\"` so the bytes are stored exactly.",
            {
              label: "Saving and loading a list of scores",
              content: `#include <stdio.h>

int save_scores(const char *path, const int *scores, int count) {
    FILE *f = fopen(path, "wb");
    if (f == NULL) return 0;
    fwrite(&count, sizeof count, 1, f);           // header: how many
    fwrite(scores, sizeof scores[0], count, f);   // the records
    fclose(f);
    return 1;
}

int load_scores(const char *path, int *scores, int max) {
    FILE *f = fopen(path, "rb");
    if (f == NULL) return -1;
    int count = 0;
    if (fread(&count, sizeof count, 1, f) != 1 || count > max) {
        fclose(f);
        return -1;
    }
    int got = (int)fread(scores, sizeof scores[0], count, f);
    fclose(f);
    return got;
}

int main(void) {
    int scores[3] = {70, 85, 92};
    save_scores("scores_demo.bin", scores, 3);

    int loaded[10];
    int n = load_scores("scores_demo.bin", loaded, 10);
    printf("loaded %d scores, last %d\\n", n, loaded[n - 1]);

    remove("scores_demo.bin");
    return 0;
}`,
            },
          ),
          diagram("Layout of the store file", [
            { id: "hdr", label: "Header", color: "#f97316", items: ["int count", "4 bytes"] },
            { id: "recs", label: "Records", color: ACCENT, items: ["count × sizeof(record)", "Written with one fwrite"] },
          ]),
          text(
            "Because a struct with only fixed-size fields (numbers and `char` arrays) is one solid block of bytes, an array of such structs can be saved with a single `fwrite` and restored with a single `fread`.",
          ),
          callout(
            "warning",
            "Always validate what you load. A truncated or corrupted file can claim any count; checking it against your array size prevents a buffer overflow when you read the records.",
          ),
          quiz(
            "Why does the store write the record count before the records?",
            ["fwrite requires it", "So the loader knows how many records to read and can validate it", "To make the file smaller", "Binary files must start with an int"],
            1,
            "The header tells the loader what to expect and lets it reject files that don't fit.",
          ),
          quiz(
            "Which mode should the loader use to open the store file?",
            ["\"r\"", "\"rb\"", "\"w\"", "\"a\""],
            1,
            "\"rb\" reads the bytes exactly as stored, without any text-mode translation.",
          ),
        ],
        challenge: {
          instructions:
            "Write int save_contacts(const char *path, const struct Contact *c, int n) and int load_contacts(const char *path, struct Contact *out, int max) using a count header plus fwrite/fread with wb/rb. Save 3 contacts to contacts.dat, load them into a new array, print them, then remove the file.",
          description: task(
            "Use `struct Contact { char name[20]; int age; }`. Write `int save_contacts(const char *path, const struct Contact *c, int n)`, which opens the file with `\"wb\"`, writes the count and then all records, and returns 1 on success. Write `int load_contacts(const char *path, struct Contact *out, int max)`, which opens with `\"rb\"`, reads the count, rejects it if it is above `max`, reads the records and returns how many it loaded. In `main`, save the three contacts to `contacts.dat`, load them into `loaded`, print them, then `remove` the file.",
            "saved 3 contacts\nloaded 3 contacts\nAda (36)\nLinus (28)\nGrace (45)\nfile removed",
          ),
          starterCode: `#include <stdio.h>

struct Contact {
    char name[20];
    int age;
};

// Write save_contacts and load_contacts here


int main(void) {
    struct Contact contacts[3] = {{"Ada", 36}, {"Linus", 28}, {"Grace", 45}};
    struct Contact loaded[10];

    // Save to "contacts.dat", load into loaded, print each, remove the file

    return 0;
}`,
          solution: `#include <stdio.h>

struct Contact {
    char name[20];
    int age;
};

int save_contacts(const char *path, const struct Contact *c, int n) {
    FILE *f = fopen(path, "wb");
    if (f == NULL) return 0;
    fwrite(&n, sizeof n, 1, f);
    size_t written = fwrite(c, sizeof c[0], n, f);
    fclose(f);
    return written == (size_t)n;
}

int load_contacts(const char *path, struct Contact *out, int max) {
    FILE *f = fopen(path, "rb");
    if (f == NULL) return -1;
    int count = 0;
    if (fread(&count, sizeof count, 1, f) != 1 || count < 0 || count > max) {
        fclose(f);
        return -1;
    }
    int got = (int)fread(out, sizeof out[0], count, f);
    fclose(f);
    return got;
}

int main(void) {
    struct Contact contacts[3] = {{"Ada", 36}, {"Linus", 28}, {"Grace", 45}};
    struct Contact loaded[10];

    if (save_contacts("contacts.dat", contacts, 3)) {
        printf("saved 3 contacts\\n");
    }

    int n = load_contacts("contacts.dat", loaded, 10);
    printf("loaded %d contacts\\n", n);
    for (int i = 0; i < n; i++) {
        printf("%s (%d)\\n", loaded[i].name, loaded[i].age);
    }

    if (remove("contacts.dat") == 0) {
        printf("file removed\\n");
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Saves and loads three contacts",
              outputIncludes: ["saved 3 contacts", "loaded 3 contacts"],
              hint: "Write the count first, then the array; read them back in the same order.",
            },
            {
              id: "t2",
              label: "Prints the loaded contacts and removes the file",
              expectedOutput: "saved 3 contacts\nloaded 3 contacts\nAda (36)\nLinus (28)\nGrace (45)\nfile removed",
              hint: "Print from loaded[i], then remove(\"contacts.dat\").",
            },
            {
              id: "t3",
              label: "Uses wb / rb, fwrite / fread and checks the count",
              keywords: [
                { pattern: "fopen\\s*\\(\\s*\\w+\\s*,\\s*\"wb\"\\s*\\)" },
                { pattern: "fopen\\s*\\(\\s*\\w+\\s*,\\s*\"rb\"\\s*\\)" },
                { pattern: "\\bfwrite\\s*\\(" },
                { pattern: "\\bfread\\s*\\(" },
                { pattern: ">\\s*max\\b" },
                { pattern: "\\bremove\\s*\\(\\s*\"contacts\\.dat\"\\s*\\)" },
              ],
              hint: "Reject the file in load_contacts when count > max.",
            },
          ],
        },
      },
      {
        id: "c_file_handling-4-2",
        title: "Capstone: Note Saver App",
        xp: 30,
        chapterTitle: "Practical Projects",
        theory: [
          text(
            "Time to build a small but complete tool: a command-line **note saver**. It reads commands, appends notes to a text file so they survive between runs, lists them, counts them, and cleans up. It uses almost every function from this course.",
          ),
          text(
            "The program is a loop that reads one command line at a time with `fgets`. `strncmp(line, \"add \", 4) == 0` checks whether a line starts with `add `, and `line + 4` is the note's text after the command.",
            {
              label: "Recognising commands",
              stdin: "add first idea\nlist\nquit\n",
              content: `#include <stdio.h>
#include <string.h>

int main(void) {
    char line[128];
    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        if (strncmp(line, "add ", 4) == 0) {
            printf("would save: \\"%s\\"\\n", line + 4);
        } else if (strcmp(line, "list") == 0) {
            printf("would list the notes\\n");
        } else if (strcmp(line, "quit") == 0) {
            break;
        }
    }
    return 0;
}`,
            },
          ),
          text(
            "Each command opens the file only for as long as it needs it: `\"a\"` to append one note, `\"r\"` to read them all. Opening and closing per command means every note is safely on disk straight away, even if the program is stopped unexpectedly.",
            {
              label: "Appending and listing notes",
              content: `#include <stdio.h>

void add_note(const char *path, const char *note) {
    FILE *f = fopen(path, "a");
    if (f == NULL) return;
    fprintf(f, "%s\\n", note);
    fclose(f);
}

void list_notes(const char *path) {
    FILE *f = fopen(path, "r");
    if (f == NULL) {
        printf("no notes yet\\n");
        return;
    }
    char line[128];
    int n = 1;
    while (fgets(line, sizeof line, f) != NULL) {
        printf("%d. %s", n++, line);
    }
    fclose(f);
}

int main(void) {
    const char *path = "notes_demo.txt";
    remove(path);                       // start with an empty file
    list_notes(path);
    add_note(path, "Learn fopen");
    add_note(path, "Learn fgets");
    list_notes(path);
    remove(path);                       // tidy up
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "Removing the file before starting keeps every test run independent. In a real tool you would keep the file, so notes from earlier runs stay.",
          ),
          quiz(
            "Why does add_note open the file with \"a\"?",
            ["\"a\" is the only writable mode", "To add the new note to the end without erasing earlier notes", "To read the notes", "\"a\" is faster than \"w\""],
            1,
            "Append mode keeps existing content and writes at the end. \"w\" would erase all earlier notes.",
          ),
          quiz(
            "For the line `add Buy milk`, what does `line + 4` point to?",
            ["\"add Buy milk\"", "\"Buy milk\"", "\" Buy milk\"", "The number 4"],
            1,
            "line + 4 skips the four characters 'a', 'd', 'd', ' ' and points at the note's text.",
          ),
        ],
        challenge: {
          instructions:
            "Build the note saver. Remove notes.txt at the start, then read commands until quit or the end of input: add <text> appends to notes.txt and prints saved note N; list prints the notes numbered; count prints N notes. On quit, remove the file and print bye.",
          stdin: "add Buy milk\nadd Call Ada\nlist\nadd Finish the C course\ncount\nquit\n",
          description: task(
            "Build a command-line note saver that keeps notes in `notes.txt`. Remove the file at the start so every run begins empty. Then read commands with `fgets` until `quit` or the end of the input:\n\n- `add TEXT` appends TEXT as a line to the file (mode `\"a\"`) and prints `saved note N`.\n- `list` reads the file (mode `\"r\"`) and prints each note numbered.\n- `count` prints how many notes the file contains.\n- `quit` removes the file, prints `bye` and stops.\n\nThe test input adds two notes, lists them, adds a third, counts and quits.",
            "saved note 1\nsaved note 2\n1. Buy milk\n2. Call Ada\nsaved note 3\n3 notes\nbye",
          ),
          starterCode: `#include <stdio.h>
#include <string.h>

#define NOTES_FILE "notes.txt"

// Write add_note, list_notes and count_notes here


int main(void) {
    char line[128];
    remove(NOTES_FILE);     // start with no notes

    // Read commands with fgets until "quit" or the end of the input:
    //   "add TEXT" -> append and print "saved note N"
    //   "list"     -> print the notes numbered
    //   "count"    -> print "N notes"
    //   "quit"     -> remove the file, print "bye", stop

    return 0;
}`,
          solution: `#include <stdio.h>
#include <string.h>

#define NOTES_FILE "notes.txt"

int count_notes(void) {
    FILE *f = fopen(NOTES_FILE, "r");
    if (f == NULL) return 0;
    char line[128];
    int count = 0;
    while (fgets(line, sizeof line, f) != NULL) {
        count++;
    }
    fclose(f);
    return count;
}

int add_note(const char *text) {
    FILE *f = fopen(NOTES_FILE, "a");
    if (f == NULL) return 0;
    fprintf(f, "%s\\n", text);
    fclose(f);
    return 1;
}

void list_notes(void) {
    FILE *f = fopen(NOTES_FILE, "r");
    if (f == NULL) {
        printf("no notes yet\\n");
        return;
    }
    char line[128];
    int n = 1;
    while (fgets(line, sizeof line, f) != NULL) {
        printf("%d. %s", n++, line);
    }
    fclose(f);
}

int main(void) {
    char line[128];
    remove(NOTES_FILE);

    while (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';

        if (strncmp(line, "add ", 4) == 0) {
            if (add_note(line + 4)) {
                printf("saved note %d\\n", count_notes());
            }
        } else if (strcmp(line, "list") == 0) {
            list_notes();
        } else if (strcmp(line, "count") == 0) {
            printf("%d notes\\n", count_notes());
        } else if (strcmp(line, "quit") == 0) {
            remove(NOTES_FILE);
            printf("bye\\n");
            break;
        }
    }
    return 0;
}`,
          tests: [
            {
              id: "t1",
              label: "Saves notes and lists them",
              outputIncludes: ["saved note 1", "saved note 2", "1. Buy milk\n2. Call Ada"],
              hint: "Append with fopen(NOTES_FILE, \"a\"); list by reading with \"r\".",
            },
            {
              id: "t2",
              label: "Counts the notes after adding a third",
              outputIncludes: ["saved note 3", "3 notes"],
              hint: "count_notes reads the file and counts its lines.",
            },
            {
              id: "t3",
              label: "Handles every command in order and says bye",
              expectedOutput: "saved note 1\nsaved note 2\n1. Buy milk\n2. Call Ada\nsaved note 3\n3 notes\nbye",
              hint: "On quit, remove the file, print bye and break out of the loop.",
            },
            {
              id: "t4",
              label: "Appends with \"a\", reads with \"r\", parses commands and removes the file",
              keywords: [
                { pattern: "fopen\\s*\\(\\s*NOTES_FILE\\s*,\\s*\"a\"\\s*\\)" },
                { pattern: "fopen\\s*\\(\\s*NOTES_FILE\\s*,\\s*\"r\"\\s*\\)" },
                { pattern: "\\bstrncmp\\s*\\(\\s*line\\s*,\\s*\"add \"\\s*,\\s*4\\s*\\)" },
                { pattern: "\\bremove\\s*\\(\\s*NOTES_FILE\\s*\\)[\\s\\S]*\\bremove\\s*\\(\\s*NOTES_FILE\\s*\\)" },
              ],
              hint: "strncmp(line, \"add \", 4) == 0 detects the add command; line + 4 is the note.",
            },
          ],
        },
      },
    ],
  },
];

export const C_FILE_HANDLING_LESSONS = C_FILE_HANDLING_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({ ...l, chapterTitle: l.chapterTitle || ch.title }))
);

export const C_FILE_HANDLING_TOTAL_XP = 240;

applyLessonVideoLinks(C_FILE_HANDLING_LESSONS, C_FILE_HANDLING_VIDEO_LINKS);
