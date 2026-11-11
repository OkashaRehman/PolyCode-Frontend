// PolyCode — Go Fundamentals interactive course
// 9 chapters · 32 lessons · server/browser Go challenges
// YouTube links: edit goFundamentalsVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { GO_FUNDAMENTALS_VIDEO_LINKS } from "./Go_fundamentalsVideoLinks";

const ACCENT = "#00add8"; // Go's official blue brand color

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return {
      type: "text",
      content,
      code: { lang: "go", ...codeBlock },
    };
  }
  return { type: "text", content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

const GO_MAIN = `package main

import "fmt"

func main() {
`;

const GO_MAIN_END = `}`;

export const GO_FUNDAMENTALS_CHAPTERS = [
  {
    id: "welcome",
    title: "Welcome to Go",
    icon: "⚙️",
    color: ACCENT,
    lessons: [
      {
        id: "go-0",
        title: "What is Go?",
        xp: 10,
        theory: [
          text(
            "**Go (or Golang)** is an open-source programming language created by Google. It was designed to be fast, statically typed, and incredibly efficient for building modern cloud software, microservices, and command-line tools.",
            {
              label: "A tiny Go program",
              content: `package main

import "fmt"

func main() {
    fmt.Println("Hello, PolyCode!")
}`,
            }
          ),
          text(
            "Go compiles directly to machine code, meaning it runs extremely fast without needing a heavy runtime (like Java or Python). But unlike older systems languages, it includes a **garbage collector** to manage memory automatically."
          ),
          diagram("Where Go shines", [
            { id: "cloud", label: "Cloud Native", color: ACCENT, items: ["Docker & Kubernetes", "Microservices", "High-traffic APIs"] },
            { id: "cli", label: "CLI Tools", color: "#22c55e", items: ["Fast execution", "Single binary", "Cross-platform"] },
            { id: "backend", label: "Web Backends", color: "#f97316", items: ["Web servers", "Data processing", "Database drivers"] },
          ]),
          callout("info", "Go favors simplicity. It has only 25 keywords (C++ has over 80). There are no classes, no inheritance, and no while loops!"),
          quiz(
            "Which of these features does Go include?",
            ["Manual memory management", "Garbage collection", "Classes and Inheritance", "Interpreted execution"],
            1,
            "Go is a compiled language that includes a garbage collector to handle memory safely."
          ),
        ],
        challenge: {
          title: "Hello, Go",
          description: "Use `fmt.Println` to print exactly: `Hello, PolyCode!`",
          starterCode: `${GO_MAIN}    // Print Hello, PolyCode!
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("Hello, PolyCode!")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses fmt.Println", keywords: [{ pattern: "fmt\\.Println" }] },
            { id: 2, label: "Prints Hello, PolyCode!", keywords: [{ pattern: "Hello, PolyCode!" }] },
          ],
        },
      },
      {
        id: "go-1",
        title: "Your First Go Program",
        xp: 10,
        theory: [
          text(
            "Every standalone Go program must start with `package main`. This tells the compiler to build an executable file rather than a shared library."
          ),
          text(
            "You use the `import` keyword to bring in standard library packages. `fmt` (format) is used for input and output."
          ),
          callout("tip", "In Go, you don't need semicolons `;` at the end of statements! The compiler adds them automatically behind the scenes."),
          quiz(
            "What must the entry package be named to create an executable program?",
            ["package root", "package start", "package app", "package main"],
            3,
            "Executables must always use package main."
          ),
        ],
        challenge: {
          title: "Package and Print",
          description: "Print `Game Name: PolyQuest` using `fmt.Println`.",
          starterCode: `${GO_MAIN}    // Print Game Name: PolyQuest
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("Game Name: PolyQuest")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Prints PolyQuest", keywords: [{ pattern: "Game Name: PolyQuest" }] },
          ],
        },
      },
      {
        id: "go-2",
        title: "Compile & Run",
        xp: 10,
        theory: [
          text(
            "Because Go is compiled, you must convert your source code (`.go` files) into machine code. Locally, you use the `go run` command to compile and execute in one step."
          ),
          text(
            "When you are ready to share your program, you use `go build`. This creates a single, self-contained executable file that can run on a computer even if Go isn't installed!"
          ),
          diagram("Go execution flow", [
            { id: "write", label: "Write", color: ACCENT, items: ["main.go", "Code in editor"] },
            { id: "build", label: "Build", color: "#f97316", items: ["go build", "Creates binary"] },
            { id: "run", label: "Run", color: "#22c55e", items: ["./main", "Executes directly"] },
          ]),
          quiz(
            "Which command compiles AND executes your Go code immediately for testing?",
            ["go build", "go start", "go run", "go test"],
            2,
            "go run compiles your code into a temporary directory and executes it instantly."
          ),
        ],
        challenge: {
          title: "Build Success",
          description: "Print `Compile OK`.",
          starterCode: `${GO_MAIN}    // Print Compile OK
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("Compile OK")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Prints Compile OK", keywords: [{ pattern: "Compile OK" }] },
          ],
        },
      },
    ],
  },
  {
    id: "variables",
    title: "Variables & Constants",
    icon: "📦",
    color: "#e11d48",
    lessons: [
      {
        id: "go-3",
        title: "Declarations (var vs :=)",
        xp: 12,
        theory: [
          text(
            "You can declare variables the long way using `var name type = value`. But Go developers usually use the **short declaration operator** `:=` inside functions.",
            {
              label: "Declaring variables",
              content: `var age int = 14       // Explicit typing
score := 100           // Short declaration (type inferred)`
            }
          ),
          text("`:=` tells Go to figure out the type automatically based on the value on the right. You only use `:=` the *first* time you create a variable. To update it later, just use `=`."),
          callout("warning", "You can only use `:=` inside of a function like `main()`. Package-level variables must use `var`."),
          quiz(
            "How do you update a variable's value after creating it with := ?",
            ["var new = value", "name := newValue", "name = newValue", "update name"],
            2,
            "Use := for creation, and = for updating existing variables."
          ),
        ],
        challenge: {
          title: "Player Score",
          description: "Use `:=` to create a variable `score` set to `50`. Then use `fmt.Println` to print it.",
          starterCode: `${GO_MAIN}    // Create score using :=
    
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    score := 50
    fmt.Println(score)
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses short declaration", keywords: [{ pattern: "score\\s*:=" }] },
            { id: 2, label: "Prints score", keywords: [{ pattern: "fmt\\.Println\\(\\s*score\\s*\\)" }] },
          ],
        },
      },
      {
        id: "go-4",
        title: "Core Types & Strings",
        xp: 12,
        theory: [
          text(
            "Go is strictly typed. The core types are `int` (whole numbers), `float64` (decimals), `bool` (true/false), and `string` (text)."
          ),
          text(
            "You cannot mix types without explicitly converting them. For example, you can't add an `int` to a `float64` directly.",
            {
              label: "Type conversion",
              content: `a := 5
b := 2.5
// total := a + b // ERROR!
total := float64(a) + b`
            }
          ),
          callout("tip", "Strings in Go use double quotes `\"Hello\"`. Single quotes `'A'` are used for Runes (which represent a single Unicode character)."),
        ],
        challenge: {
          title: "Type Casting",
          description: "Create an `int` called `bonus` set to `10`. Convert it to `float64` and add it to `basePrice := 9.99`. Print the total.",
          starterCode: `${GO_MAIN}    basePrice := 9.99
    // Create bonus, add it to basePrice, print total
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    basePrice := 9.99
    bonus := 10
    total := basePrice + float64(bonus)
    fmt.Println(total)
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses float64()", keywords: [{ pattern: "float64\\s*\\(" }] },
          ],
        },
      },
      {
        id: "go-5",
        title: "The Blank Identifier",
        xp: 15,
        theory: [
          text(
            "Go has a very strict compiler rule: **You cannot declare a variable and leave it unused.** If you create a variable and don't read it, your program will not compile."
          ),
          text(
            "Sometimes, a function returns multiple values, but you only care about one of them. You can use the **blank identifier** `_` (underscore) to discard unwanted values.",
            {
              label: "Discarding values",
              content: `// Let's pretend getPlayer returns (name, score)
name, _ := getPlayer() 
fmt.Println(name) // Compiles fine!`
            }
          ),
          quiz(
            "What happens if you declare 'score := 10' but never use it?",
            ["It prints a warning but runs", "The compiler throws an error and fails", "It is automatically deleted", "It defaults to 0"],
            1,
            "Go enforces clean code. Unused variables are a hard compilation error."
          ),
        ],
        challenge: {
          title: "Ignore the Trash",
          description: "Fix the compilation error. We declare `secret`, but never use it. Replace `secret` with the blank identifier `_` so it compiles.",
          starterCode: `${GO_MAIN}    important, secret := "Keep me", "Ignore me"
    fmt.Println(important)
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    important, _ := "Keep me", "Ignore me"
    fmt.Println(important)
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses blank identifier", keywords: [{ pattern: "_\\s*:=" }] },
            { id: 2, label: "Secret is removed", keywords: [{ pattern: "^(?!.*secret).*$", flags: "s" }] },
          ],
        },
      },
      {
        id: "go-6",
        title: "Zero Values",
        xp: 12,
        theory: [
          text(
            "In many languages, uninitialized variables hold 'garbage' memory or `null`. In Go, variables are safely initialized to their **zero value** automatically."
          ),
          diagram("Default Zero Values", [
            { id: "num", label: "Numbers", color: ACCENT, items: ["int -> 0", "float64 -> 0.0"] },
            { id: "bool", label: "Booleans", color: "#f97316", items: ["bool -> false"] },
            { id: "str", label: "Strings", color: "#22c55e", items: ["string -> \"\" (empty)"] },
          ]),
          callout("tip", "Because of zero values, you don't need to write `var count int = 0`. Just writing `var count int` safely sets it to 0."),
        ],
        challenge: {
          title: "Relying on Zero",
          description: "Declare `var damage int`. Do not assign a value to it. Print it to see its zero value.",
          starterCode: `${GO_MAIN}    // declare damage
    // print damage
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    var damage int
    fmt.Println(damage)
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses var damage int", keywords: [{ pattern: "var\\s+damage\\s+int" }] },
            { id: 2, label: "Does not assign value", keywords: [{ pattern: "^(?!.*=).*$", flags: "s" }] },
          ],
        },
      },
      {
        id: "go-7",
        title: "Constants",
        xp: 12,
        theory: [
          text(
            "Use the `const` keyword for values that should never change. Constants must be assigned a value immediately when declared."
          ),
          text(
            "Constants in Go can be **untyped**. This means you don't have to specify `int` or `float64` — Go will figure out how to use the constant based on what you add it to later.",
            {
              label: "Constants",
              content: `const PI = 3.14159
const MAX_PLAYERS = 4`
            }
          ),
          quiz(
            "Can you use := to declare a constant?",
            ["Yes", "No, you must use const", "Only inside functions"],
            1,
            "The := operator is only for variables. Constants must use the const keyword."
          ),
        ],
        challenge: {
          title: "Server Port",
          description: "Declare a constant `PORT` set to `8080`. Print `PORT`.",
          starterCode: `${GO_MAIN}    // Declare const PORT
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    const PORT = 8080
    fmt.Println(PORT)
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses const", keywords: [{ pattern: "const\\s+PORT" }] },
          ],
        },
      },
    ],
  },
  {
    id: "control-flow",
    title: "Control Flow",
    icon: "🔀",
    color: "#db2777",
    lessons: [
      {
        id: "go-8",
        title: "Conditional if/else",
        xp: 12,
        theory: [
          text(
            "Go's `if` statements look like C++ or Java, but with one great exception: **No parentheses around the condition!** Braces `{ }`, however, are always required.",
            {
              label: "Go if statement",
              content: `score := 85
if score >= 90 {
    fmt.Println("A")
} else if score >= 80 {
    fmt.Println("B")
} else {
    fmt.Println("C")
}`
            }
          ),
          callout("warning", "In Go, the `else` keyword MUST be on the same line as the closing brace `}` of the `if` block."),
        ],
        challenge: {
          title: "Pass or Fail",
          description: "Set `grade := 75`. Write an if/else block. If grade >= 50, print `Pass`. Else print `Fail`.",
          starterCode: `${GO_MAIN}    grade := 75
    // write if/else
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    grade := 75
    if grade >= 50 {
        fmt.Println("Pass")
    } else {
        fmt.Println("Fail")
    }
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "No parentheses", keywords: [{ pattern: "if\\s+grade\\s*>=\\s*50\\s*\\{" }] },
            { id: 2, label: "Prints Pass", keywords: [{ pattern: "Pass" }] },
          ],
        },
      },
      {
        id: "go-9",
        title: "Idiomatic Switch",
        xp: 12,
        theory: [
          text(
            "Go's `switch` is safer than in other languages. By default, cases **do not fall through**. You don't need to write `break` at the end of every case!",
            {
              label: "Switch example",
              content: `day := "Tuesday"
switch day {
case "Monday":
    fmt.Println("Start of week")
case "Tuesday", "Wednesday":
    fmt.Println("Midweek")
default:
    fmt.Println("Unknown")
}`
            }
          ),
          quiz(
            "Why is Go's switch considered safer than C++?",
            ["It only takes integers", "You must write break", "It automatically breaks at the end of a case", "It compiles faster"],
            2,
            "Implicit breaking prevents accidental fall-through bugs."
          ),
        ],
        challenge: {
          title: "Traffic Light",
          description: "Set `color := \"Red\"`. Use a switch to print `Stop` if Red, and `Go` in the default case.",
          starterCode: `${GO_MAIN}    color := "Red"
    // switch on color
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    color := "Red"
    switch color {
    case "Red":
        fmt.Println("Stop")
    default:
        fmt.Println("Go")
    }
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses switch", keywords: [{ pattern: "switch\\s+color" }] },
            { id: 2, label: "Case Red", keywords: [{ pattern: "case\\s+\"Red\":" }] },
          ],
        },
      },
      {
        id: "go-10",
        title: "The almighty for loop",
        xp: 15,
        theory: [
          text(
            "Go only has one looping keyword: `for`. The basic structure looks like C, but again, no parentheses are needed.",
            {
              label: "Standard loop",
              content: `for i := 0; i < 3; i++ {
    fmt.Println("Count:", i)
}`
            }
          ),
          text("`i++` increments `i` by 1. Note that you must use `:=` to declare the loop counter `i` inside the initialization step."),
        ],
        challenge: {
          title: "Counting Up",
          description: "Use a standard `for` loop to print numbers `1` through `3`.",
          starterCode: `${GO_MAIN}    // loop 1 to 3
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    for i := 1; i <= 3; i++ {
        fmt.Println(i)
    }
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses for loop", keywords: [{ pattern: "for\\s+i\\s*:=" }] },
            { id: 2, label: "Condition i <= 3", keywords: [{ pattern: "<=\\s*3" }] },
          ],
        },
      },
      {
        id: "go-11",
        title: "for as a while loop",
        xp: 15,
        theory: [
          text(
            "Since Go doesn't have a `while` keyword, you just use `for` and leave out the initialization and post statements. It functions exactly like a while loop.",
            {
              label: "While-style loop",
              content: `hp := 3
for hp > 0 {
    fmt.Println("Still alive")
    hp--
}`
            }
          ),
          callout("tip", "If you omit the condition entirely (`for { }`), you create an infinite loop! You can exit it using the `break` keyword."),
        ],
        challenge: {
          title: "Drain Health",
          description: "Set `hp := 2`. Use a condition-only `for` loop. While hp > 0, print the hp, then subtract 1.",
          starterCode: `${GO_MAIN}    hp := 2
    // while-style loop
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    hp := 2
    for hp > 0 {
        fmt.Println(hp)
        hp--
    }
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses condition-only for", keywords: [{ pattern: "for\\s+hp\\s*>\\s*0" }] },
            { id: 2, label: "Decrements hp", keywords: [{ pattern: "hp--" }] },
          ],
        },
      },
    ],
  },
  {
    id: "functions",
    title: "Functions & Errors",
    icon: "🔧",
    color: "#c026d3",
    lessons: [
      {
        id: "go-12",
        title: "Function Basics",
        xp: 15,
        theory: [
          text(
            "Functions start with the `func` keyword. In Go, the return type is written **after** the parameters, not before.",
            {
              label: "Simple Function",
              content: `func multiply(a int, b int) int {
    return a * b
}

func main() {
    fmt.Println(multiply(3, 4))
}`
            }
          ),
          callout("tip", "If multiple parameters share a type, you can omit the type from all but the last one: `func add(a, b int) int`."),
        ],
        challenge: {
          title: "Greeting Function",
          description: "Write a function `greet(name string) string` outside of `main`. It should return `\"Hello \" + name`. Call it in `main` with `\"John Doe\"` and print the result.",
          starterCode: `package main
import "fmt"

// create greet()

func main() {
    
}`,
          solutionCode: `package main
import "fmt"

func greet(name string) string {
    return "Hello " + name
}

func main() {
    fmt.Println(greet("John Doe"))
}`,
          tests: [
            { id: 1, label: "Defines greet", keywords: [{ pattern: "func\\s+greet\\(name\\s+string\\)\\s+string" }] },
            { id: 2, label: "Calls greet", keywords: [{ pattern: "greet\\(\"John Doe\"\\)" }] },
          ],
        },
      },
      {
        id: "go-13",
        title: "Multiple Returns",
        xp: 18,
        theory: [
          text(
            "Unlike C++ or Java, Go functions can return **multiple values**. This is extremely common in Go, especially for returning a result alongside an error.",
            {
              label: "Multiple Return values",
              content: `func getPlayerInfo() (string, int) {
    return "Nova", 99
}

func main() {
    name, level := getPlayerInfo()
    fmt.Println(name, level)
}`
            }
          ),
          quiz(
            "How do you specify multiple return types in a function signature?",
            ["Using brackets [int, string]", "Using parentheses (string, int)", "You can't in Go"],
            1,
            "Wrap the return types in parentheses: func myFunc() (string, int)"
          ),
        ],
        challenge: {
          title: "Coordinates",
          description: "Write `func getCoords() (int, int)` that returns `10` and `20`. Call it in main, assign to `x, y`, and print them.",
          starterCode: `package main
import "fmt"

// func getCoords

func main() {
    // call and print
}`,
          solutionCode: `package main
import "fmt"

func getCoords() (int, int) {
    return 10, 20
}

func main() {
    x, y := getCoords()
    fmt.Println(x, y)
}`,
          tests: [
            { id: 1, label: "Returns two ints", keywords: [{ pattern: "\\(int,\\s*int\\)" }] },
            { id: 2, label: "Assigns x, y", keywords: [{ pattern: "x,\\s*y\\s*:=" }] },
          ],
        },
      },
      {
        id: "go-14",
        title: "Error Handling (if err != nil)",
        xp: 20,
        theory: [
          text(
            "Go intentionally **does not have try/catch blocks**. Instead, functions return an `error` as their last return value. You must explicitly check if the error is not `nil`.",
            {
              label: "The Go Error Pattern",
              content: `import "errors"

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}`
            }
          ),
          text("In `main`, you handle it like this: `result, err := divide(10, 0)`. If `err != nil`, you handle the failure immediately."),
          diagram("Explicit Error Flow", [
            { id: "call", label: "Call Func", color: ACCENT, items: ["ans, err := doMath()"] },
            { id: "check", label: "Check Err", color: "#f97316", items: ["if err != nil { log.Fatal }"] },
            { id: "cont", label: "Continue", color: "#22c55e", items: ["Use ans safely"] },
          ]),
        ],
        challenge: {
          title: "Check the Error",
          description: "We provided `fetchData()`. Call it: `data, err := fetchData()`. If `err != nil`, print `Error found`. Else, print `data`.",
          starterCode: `package main
import (
    "fmt"
    "errors"
)

func fetchData() (string, error) {
    return "", errors.New("network timeout")
}

func main() {
    // call fetchData, check error, print
}`,
          solutionCode: `package main
import (
    "fmt"
    "errors"
)

func fetchData() (string, error) {
    return "", errors.New("network timeout")
}

func main() {
    data, err := fetchData()
    if err != nil {
        fmt.Println("Error found")
    } else {
        fmt.Println(data)
    }
}`,
          tests: [
            { id: 1, label: "Checks if err != nil", keywords: [{ pattern: "if\\s+err\\s*!=\\s*nil" }] },
            { id: 2, label: "Prints Error found", keywords: [{ pattern: "Error found" }] },
          ],
        },
      },
      {
        id: "go-15",
        title: "The defer Keyword",
        xp: 15,
        theory: [
          text(
            "The `defer` keyword schedules a function call to run **right before the current function returns**. It's commonly used to close files, unlock mutexes, or close database connections.",
            {
              label: "Defer example",
              content: `func doWork() {
    defer fmt.Println("Cleaning up resources...")
    fmt.Println("Doing work")
    // "Cleaning up" prints AFTER "Doing work"
}`
            }
          ),
          callout("tip", "Using `defer` keeps your cleanup code right next to your initialization code, making it impossible to forget to close resources if the function exits early due to an error."),
        ],
        challenge: {
          title: "Cleanup Time",
          description: "Use `defer` to print `Closing file`. On the next line, print `Writing data`. (Watch how the output order is reversed!)",
          starterCode: `${GO_MAIN}    // defer closing
    // print writing
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    defer fmt.Println("Closing file")
    fmt.Println("Writing data")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses defer", keywords: [{ pattern: "defer\\s+fmt\\.Println" }] },
            { id: 2, label: "Correct string", keywords: [{ pattern: "Closing file" }] },
          ],
        },
      },
    ],
  },
  {
    id: "slices",
    title: "Slices & Maps",
    icon: "📋",
    color: "#a855f7",
    lessons: [
      {
        id: "go-16",
        title: "Arrays vs Slices",
        xp: 15,
        theory: [
          text(
            "An **Array** has a fixed length defined at compile time: `var arr [3]int`. You can't add a 4th element to it."
          ),
          text(
            "A **Slice** is dynamic. It wraps an array but can grow and shrink. Go developers almost exclusively use slices. You declare a slice by omitting the length: `var slice []int`.",
            {
              label: "Slice literals",
              content: `scores := []int{10, 20, 30} // Slice, no number in []
fmt.Println(scores[0])      // 10`
            }
          ),
          quiz(
            "Is `data := [5]string{}` an Array or a Slice?",
            ["Array", "Slice"],
            0,
            "Because it has a specific number [5] in the brackets, it is a fixed array."
          ),
        ],
        challenge: {
          title: "Make a Slice",
          description: "Create a slice of strings called `games` with values `\"Chess\"` and `\"Go\"`. Print index 1.",
          starterCode: `${GO_MAIN}    // games slice
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    games := []string{"Chess", "Go"}
    fmt.Println(games[1])
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Creates slice", keywords: [{ pattern: "\\[\\]string" }] },
            { id: 2, label: "Prints index 1", keywords: [{ pattern: "games\\[1\\]" }] },
          ],
        },
      },
      {
        id: "go-17",
        title: "Appending to Slices",
        xp: 15,
        theory: [
          text(
            "To add elements to a slice, use the built-in `append()` function. Under the hood, if the slice runs out of capacity, Go creates a larger array and copies the data over automatically.",
            {
              label: "Using append",
              content: `inventory := []string{"Sword"}
inventory = append(inventory, "Shield")
fmt.Println(len(inventory)) // length is now 2`
            }
          ),
          callout("warning", "`append` returns a *new* slice. You must assign the result back to the variable: `items = append(items, newItem)`."),
        ],
        challenge: {
          title: "Expand Inventory",
          description: "Create an empty integer slice `nums := []int{}`. Append `5` to it. Print the slice.",
          starterCode: `${GO_MAIN}    nums := []int{}
    // append 5
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    nums := []int{}
    nums = append(nums, 5)
    fmt.Println(nums)
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses append", keywords: [{ pattern: "nums\\s*=\\s*append\\(\\s*nums\\s*,\\s*5\\s*\\)" }] },
          ],
        },
      },
      {
        id: "go-18",
        title: "Iterating with range",
        xp: 18,
        theory: [
          text(
            "The easiest way to loop over a slice is using the `range` keyword. It returns two values per loop: the **index**, and a copy of the **value**.",
            {
              label: "Range loop",
              content: `names := []string{"Ava", "Ben"}
for index, value := range names {
    fmt.Println(index, value)
}`
            }
          ),
          text("If you don't need the index, remember to use the blank identifier `_` to suppress the compiler error: `for _, val := range names`."),
        ],
        challenge: {
          title: "Sum the Slice",
          description: "Given `costs := []int{10, 20}`, use `range` to add all values to `total := 0`. Print `total`.",
          starterCode: `${GO_MAIN}    costs := []int{10, 20}
    total := 0
    // range loop
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    costs := []int{10, 20}
    total := 0
    for _, cost := range costs {
        total += cost
    }
    fmt.Println(total)
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses range", keywords: [{ pattern: "range\\s+costs" }] },
            { id: 2, label: "Uses blank identifier for index", keywords: [{ pattern: "for\\s+_," }] },
          ],
        },
      },
      {
        id: "go-19",
        title: "Maps (Key-Value)",
        xp: 18,
        theory: [
          text(
            "A `map` is Go's built-in dictionary (hash table). It maps unique keys to values. You declare the key type in brackets and the value type after: `map[string]int`.",
            {
              label: "Map literal",
              content: `// string keys, int values
ages := map[string]int{
    "John": 30,
    "Jane": 25,
}
fmt.Println(ages["John"])`
            }
          ),
          text("To create an empty map to add things to later, use the `make` function: `cache := make(map[string]string)`.")
        ],
        challenge: {
          title: "Player Levels",
          description: "Create a map called `levels` using `make(map[string]int)`. Set the key `\"Nova\"` to `42`. Print `levels[\"Nova\"]`.",
          starterCode: `${GO_MAIN}    // make levels map
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    levels := make(map[string]int)
    levels["Nova"] = 42
    fmt.Println(levels["Nova"])
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses make(map...)", keywords: [{ pattern: "make\\(\\s*map\\[string\\]int\\s*\\)" }] },
            { id: 2, label: "Sets key", keywords: [{ pattern: "levels\\[\"Nova\"\\]\\s*=\\s*42" }] },
          ],
        },
      },
    ],
  },
  {
    id: "pointers",
    title: "Pointers & Structs",
    icon: "📍",
    color: "#6366f1",
    lessons: [
      {
        id: "go-21",
        title: "Pointers Intro",
        xp: 18,
        theory: [
          text(
            "By default, Go passes arguments **by value** (it creates a copy). If a function updates a variable, the original doesn't change. To modify the original, you pass its memory address using a **Pointer**."
          ),
          text(
            "Use `&` to get the address of a variable. Use `*` to declare a pointer type, or to dereference it (read/write the actual value at the address).",
            {
              label: "Pointer usage",
              content: `coins := 50
// ptr holds the memory address of coins
ptr := &coins  

// *ptr goes to that address and changes the value
*ptr = 100     
fmt.Println(coins) // Now 100`
            }
          ),
          callout("info", "Go has pointers, but NO pointer arithmetic. You cannot do `ptr++` to move memory locations. This makes Go pointers very safe."),
        ],
        challenge: {
          title: "Pass by Pointer",
          description: "Write `func heal(hp *int)` that dereferences `hp` and adds 50. Call `heal(&myHp)` in main and print `myHp`.",
          starterCode: `package main
import "fmt"

// write heal()

func main() {
    myHp := 20
    // call heal and print myHp
}`,
          solutionCode: `package main
import "fmt"

func heal(hp *int) {
    *hp += 50
}

func main() {
    myHp := 20
    heal(&myHp)
    fmt.Println(myHp)
}`,
          tests: [
            { id: 1, label: "Pointer parameter", keywords: [{ pattern: "hp\\s*\\*int" }] },
            { id: 2, label: "Passes address", keywords: [{ pattern: "heal\\(&myHp\\)" }] },
          ],
        },
      },
      {
        id: "go-23",
        title: "Struct Basics",
        xp: 18,
        theory: [
          text(
            "A `struct` is a collection of fields. Since Go has no classes, structs are how you build custom data structures to represent entities like Users, Cars, or Game Characters.",
            {
              label: "Defining a Struct",
              content: `type User struct {
    Name  string
    Email string
    Age   int
}`
            }
          ),
          text(
            "You create an instance of a struct using curly braces. You can specify field names for clarity.",
            {
              label: "Struct initialization",
              content: `u := User{Name: "John", Age: 30}
fmt.Println(u.Name) // Dot notation`
            }
          ),
        ],
        challenge: {
          title: "Build a Car",
          description: "Define `type Car struct { Speed int }`. In main, create a Car with Speed `120` and print its Speed.",
          starterCode: `package main
import "fmt"

// define struct

func main() {
    
}`,
          solutionCode: `package main
import "fmt"

type Car struct {
    Speed int
}

func main() {
    c := Car{Speed: 120}
    fmt.Println(c.Speed)
}`,
          tests: [
            { id: 1, label: "Defines struct", keywords: [{ pattern: "type\\s+Car\\s+struct" }] },
            { id: 2, label: "Accesses Speed", keywords: [{ pattern: "c\\.Speed" }] },
          ],
        },
      },
      {
        id: "go-24",
        title: "Struct Embedding (Composition)",
        xp: 20,
        theory: [
          text(
            "Go intentionally left out inheritance (`extends`). Instead, you use **Composition**. You embed one struct directly inside another to reuse its fields and methods.",
            {
              label: "Anonymous embedding",
              content: `type BaseStats struct {
    HP int
}

// Player 'inherits' BaseStats via embedding
type Player struct {
    BaseStats 
    Name string
}

p := Player{Name: "Hero"}
p.HP = 100 // Access embedded field directly!`
            }
          ),
          quiz(
            "Does Go support traditional class inheritance?",
            ["Yes, using the extends keyword", "No, Go uses struct embedding/composition"],
            1,
            "Go prefers composition over inheritance to keep architectures flat and simple."
          ),
        ],
        challenge: {
          title: "Embed it",
          description: "We defined `Engine { Horsepower int }`. Define `Truck` that embeds `Engine`. In main, set a Truck's Horsepower to 500 and print it.",
          starterCode: `package main
import "fmt"

type Engine struct {
    Horsepower int
}

// define Truck embedding Engine

func main() {
    // Make truck, set Horsepower, print
}`,
          solutionCode: `package main
import "fmt"

type Engine struct {
    Horsepower int
}

type Truck struct {
    Engine
}

func main() {
    t := Truck{}
    t.Horsepower = 500
    fmt.Println(t.Horsepower)
}`,
          tests: [
            { id: 1, label: "Embeds Engine", keywords: [{ pattern: "Engine" }] },
            { id: 2, label: "Sets Horsepower", keywords: [{ pattern: "t\\.Horsepower\\s*=\\s*500" }] },
          ],
        },
      },
    ],
  },
  {
    id: "oop-go",
    title: "Object-Oriented Go",
    icon: "🎮",
    color: "#14b8a6",
    lessons: [
      {
        id: "go-25",
        title: "Methods (Receivers)",
        xp: 18,
        theory: [
          text(
            "In Go, you don't put functions *inside* a struct. Instead, you declare a function with a **Receiver** right before the function name. This attaches the function to the struct as a method.",
            {
              label: "Method Receiver",
              content: `type Rect struct {
    W, H int
}

// (r Rect) attaches Area() to Rect
func (r Rect) Area() int {
    return r.W * r.H
}`
            }
          ),
          text(
            "**Pointer Receivers vs Value Receivers**: If your method needs to *modify* the struct's fields, you MUST use a pointer receiver: `func (r *Rect) Resize()`.",
          ),
        ],
        challenge: {
          title: "Counter Method",
          description: "Define `type Counter struct { Count int }`. Write a pointer method `func (c *Counter) Tick()` that increments Count by 1. In main, tick it and print Count.",
          starterCode: `package main
import "fmt"

type Counter struct {
    Count int
}
// func Tick method

func main() {
    c := Counter{}
    c.Tick()
    fmt.Println(c.Count)
}`,
          solutionCode: `package main
import "fmt"

type Counter struct {
    Count int
}

func (c *Counter) Tick() {
    c.Count++
}

func main() {
    c := Counter{}
    c.Tick()
    fmt.Println(c.Count)
}`,
          tests: [
            { id: 1, label: "Defines pointer receiver", keywords: [{ pattern: "func\\s*\\(c\\s*\\*Counter\\)\\s*Tick\\(\\)" }] },
            { id: 2, label: "Increments count", keywords: [{ pattern: "c\\.Count\\+\\+" }] },
          ],
        },
      },
      {
        id: "go-26",
        title: "Interfaces (Implicit)",
        xp: 20,
        theory: [
          text(
            "An `interface` is a list of method signatures. In Java/C++, you must declare `class Dog implements Animal`. In Go, if a struct has the matching methods, it **automatically** implements the interface. No keywords needed!",
            {
              label: "Implicit Interface",
              content: `type Speaker interface {
    Speak() string
}

type Cat struct{}
func (c Cat) Speak() string { return "Meow" }

// Cat automatically satisfies Speaker!
var s Speaker = Cat{}`
            }
          ),
          callout("tip", "Interfaces in Go describe *behavior*. 'If it walks like a duck and quacks like a duck, it is a duck.'"),
        ],
        challenge: {
          title: "Shape Interface",
          description: "We defined interface `Shape { Area() int }` and `type Square struct { Side int }`. Write `Area()` method for `Square` returning `Side * Side`. Main will test it.",
          starterCode: `package main
import "fmt"

type Shape interface {
    Area() int
}

type Square struct {
    Side int
}

// Write Area() method for Square here

func main() {
    var s Shape = Square{Side: 4}
    fmt.Println(s.Area())
}`,
          solutionCode: `package main
import "fmt"

type Shape interface {
    Area() int
}

type Square struct {
    Side int
}

func (sq Square) Area() int {
    return sq.Side * sq.Side
}

func main() {
    var s Shape = Square{Side: 4}
    fmt.Println(s.Area())
}`,
          tests: [
            { id: 1, label: "Method receiver for Square", keywords: [{ pattern: "func\\s*\\([^)]*Square\\)\\s*Area\\(\\)\\s*int" }] },
          ],
        },
      },
    ],
  },
  {
    id: "concurrency",
    title: "Concurrency Foundations",
    icon: "🚀",
    color: "#f59e0b",
    lessons: [
      {
        id: "go-28",
        title: "Goroutines",
        xp: 20,
        theory: [
          text(
            "Concurrency is Go's superpower. A **Goroutine** is a lightweight execution thread. To run a function concurrently (in the background), simply type the keyword `go` in front of the call.",
            {
              label: "Fire and forget",
              content: `func process() {
    fmt.Println("Processing...")
}

func main() {
    go process() // Runs in background
    fmt.Println("Main thread done")
}`
            }
          ),
          text("Because `main()` exits immediately, background goroutines might not finish before the program ends. We use wait groups or channels to synchronize them."),
          quiz(
            "How do you start a function named 'fetch()' in a new goroutine?",
            ["start fetch()", "goroutine fetch()", "go fetch()", "thread fetch()"],
            2,
            "The 'go' keyword spins up a new lightweight thread."
          ),
        ],
        challenge: {
          title: "Go Print",
          description: "Write `func sayHi() { fmt.Println(\"Hi\") }`. In main, launch it as a goroutine. (Note: in our test environment, it may exit before printing, which is normal for this exercise!)",
          starterCode: `package main
import "fmt"

// write sayHi

func main() {
    // launch sayHi as goroutine
}`,
          solutionCode: `package main
import "fmt"

func sayHi() {
    fmt.Println("Hi")
}

func main() {
    go sayHi()
}`,
          tests: [
            { id: 1, label: "Uses go keyword", keywords: [{ pattern: "go\\s+sayHi\\(\\)" }] },
          ],
        },
      },
      {
        id: "go-29",
        title: "Channels Intro",
        xp: 20,
        theory: [
          text(
            "When Goroutines need to talk to each other safely, they use **Channels**. Channels act like pipes you can send and receive values through.",
            {
              label: "Sending and Receiving",
              content: `ch := make(chan string) // Make a channel

// Send data into channel in background
go func() {
    ch <- "Data ready!" 
}()

// Receive data from channel
msg := <-ch
fmt.Println(msg)`
            }
          ),
          callout("tip", "Sending (`ch <-`) and receiving (`<-ch`) block until both sides are ready. This naturally synchronizes your threads!"),
        ],
        challenge: {
          title: "Ping Pong",
          description: "Create a channel `ch := make(chan int)`. Launch an anonymous goroutine that sends `42` to it `go func(){ ch <- 42 }()`. Read and print from `ch` in main.",
          starterCode: `package main
import "fmt"

func main() {
    // create channel
    // go func() sending 42
    // read and print
}`,
          solutionCode: `package main
import "fmt"

func main() {
    ch := make(chan int)
    go func() {
        ch <- 42
    }()
    fmt.Println(<-ch)
}`,
          tests: [
            { id: 1, label: "Make channel", keywords: [{ pattern: "make\\(chan\\s+int\\)" }] },
            { id: 2, label: "Sends data", keywords: [{ pattern: "ch\\s*<-\\s*42" }] },
            { id: 3, label: "Receives data", keywords: [{ pattern: "<-\\s*ch" }] },
          ],
        },
      },
    ],
  },
  {
    id: "capstone",
    title: "Capstone & Summary",
    icon: "🏆",
    color: "#059669",
    lessons: [
      {
        id: "go-30",
        title: "Inventory Tracker",
        xp: 25,
        theory: [
          text(
            "Let's combine structs, methods, maps, and error handling into a mini inventory system."
          ),
          text(
            "We have a struct `Inventory` with a map. We need a method `AddItem(name string)` that adds 1 to the map count, and `GetItem(name string) (int, error)` that returns the count, or an error if not found."
          ),
        ],
        challenge: {
          title: "Build the Inventory",
          description: "We scaffolded the struct and map. Implement `AddItem` and `GetItem`. In main, add \"Key\", then Get \"Key\" and print its count.",
          starterCode: `package main
import (
    "fmt"
    "errors"
)

type Inventory struct {
    items map[string]int
}

// AddItem(name string)

// GetItem(name string) (int, error)

func main() {
    inv := Inventory{items: make(map[string]int)}
    // add Key
    // get Key and print
}`,
          solutionCode: `package main
import (
    "fmt"
    "errors"
)

type Inventory struct {
    items map[string]int
}

func (i *Inventory) AddItem(name string) {
    i.items[name]++
}

func (i *Inventory) GetItem(name string) (int, error) {
    val, exists := i.items[name]
    if !exists {
        return 0, errors.New("not found")
    }
    return val, nil
}

func main() {
    inv := Inventory{items: make(map[string]int)}
    inv.AddItem("Key")
    count, _ := inv.GetItem("Key")
    fmt.Println(count)
}`,
          tests: [
            { id: 1, label: "AddItem method", keywords: [{ pattern: "func\\s*\\([^)]*Inventory\\)\\s*AddItem" }] },
            { id: 2, label: "GetItem method", keywords: [{ pattern: "func\\s*\\([^)]*Inventory\\)\\s*GetItem" }] },
          ],
        },
      },
      {
        id: "go-31",
        title: "Course Recap",
        xp: 20,
        theory: [
          text(
            "Congratulations! You've toured the core of **Go (Golang)**: from the blank identifier and `defer`, to implicit interfaces, strict error handling, and Goroutines."
          ),
          diagram("Your Go Architecture Toolkit", [
            { id: "memory", label: "Data", color: ACCENT, items: ["Slices instead of Arrays", "Maps", "Struct Composition"] },
            { id: "safety", label: "Safety", color: "#f97316", items: ["Explicit err != nil", "Zero values", "Blank identifier"] },
            { id: "speed", label: "Speed", color: "#22c55e", items: ["go routines", "channels", "Compiled binaries"] },
          ]),
          text(
            "**What to learn next in PolyCode:** Building REST APIs in Go using the standard `net/http` package, deeper dive into Concurrency Patterns, and Database connections using `database/sql`."
          ),
          callout("tip", "In Go, simplicity is the ultimate goal. If a solution feels overly complicated, there's usually a more idiomatic 'Go way' to solve it."),
        ],
        challenge: {
          title: "Graduation Badge",
          description: "Print exactly two lines: `Go Fundamentals` then `Complete!`",
          starterCode: `${GO_MAIN}    // two-line graduation message
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("Go Fundamentals")
    fmt.Println("Complete!")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Line 1 title", keywords: [{ pattern: "Go Fundamentals" }] },
            { id: 2, label: "Line 2 Complete", keywords: [{ pattern: "Complete!" }] },
          ],
        },
      },
    ],
  },
];

export const GO_FUNDAMENTALS_LESSONS = applyLessonVideoLinks(
  GO_FUNDAMENTALS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    }))
  ),
  GO_FUNDAMENTALS_VIDEO_LINKS
);

export const GO_FUNDAMENTALS_TOTAL_XP = GO_FUNDAMENTALS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0
);