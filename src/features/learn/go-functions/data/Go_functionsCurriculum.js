// PolyCode — Go Functions interactive course
// 5 chapters · 18 lessons · Go challenges
// This file follows the Go Fundamentals course style and adds Go function-specific lessons.

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { GO_FUNCTIONS_VIDEO_LINKS } from "./Go_functionsVideoLinks";

const ACCENT = "#00add8";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return { type: "text", content, code: { lang: "go", ...codeBlock } };
  }
  return { type: "text", content };
}

const GO_MAIN = `package main

import "fmt"

func main() {
`;
const GO_MAIN_END = `}`;

export const GO_FUNCTIONS_CHAPTERS = [
  {
    id: "go-ch-0",
    title: "Function Fundamentals",
    icon: "🔧",
    color: ACCENT,
    lessons: [
      {
        id: "go_funcs-0-0",
        title: "Function Basics",
        xp: 15,
        chapterTitle: "Function Fundamentals",
        chapterColor: ACCENT,
        theory: [
          text(
            "Functions group reusable code into named blocks. In Go, every function starts with the `func` keyword.",
            {
              label: "Basic function syntax",
              content: `package main

import "fmt"

// add returns the sum of two integers
func add(a int, b int) int {
	return a + b
}

func main() {
	result := add(5, 3)
	fmt.Println("Result:", result)
}`
            },
          ),
          text(
            "The `main` function is the program entry point. Functions outside `main` can be called by name from inside `main`."
          ),
          callout("tip", "Go puts the return type after the parameter list: `func foo() int`."),
          quiz(
            "Which keyword begins a function definition in Go?",
            ["function", "def", "func", "fn"],
            2,
            "Go uses the `func` keyword for all function definitions."
          ),
        ],
        challenge: {
          title: "Greeting Function",
          description:
            "Write a function `greet(name string) string` outside of `main`. It should return `\"Hello \" + name`. Call it in `main` with `\"John Doe\"` and print the result.",
          starterCode: `package main

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
        id: "go_funcs-0-1",
        title: "Return Values",
        xp: 18,
        chapterTitle: "Function Fundamentals",
        chapterColor: ACCENT,
        theory: [
          text(
            "Go functions can return values. You list the return type after the parameter list. Single return values are common for simple helpers.",
            {
              label: "Return example",
              content: `package main

import "fmt"

func double(x int) int {
	return x * 2
}

func main() {
	fmt.Println(double(5))
}`
            },
          ),
          text(
            "If a function does not return a value, its return type is `void` in other languages, but in Go you simply omit the return type."
          ),
          quiz(
            "What is the return type of `func now() string`?",
            ["string", "func", "now", "void"],
            0,
            "The type after the parameter list is the return type: `string`."
          ),
        ],
        challenge: {
          title: "Double It",
          description:
            "Write `func double(x int) int` that returns `x * 2`. In `main`, call `double(7)` and print the result.",
          starterCode: `package main

// create double()

func main() {
    // print result
}`,
          solutionCode: `package main
import "fmt"

func double(x int) int {
    return x * 2
}

func main() {
    fmt.Println(double(7))
}`,
          tests: [
            { id: 1, label: "Defines integer return", keywords: [{ pattern: "func\\s+double\\(x\\s+int\\)\\s+int" }] },
            { id: 2, label: "Prints result", keywords: [{ pattern: "fmt\\.Println\\(double\\(7\\)\\)" }] },
          ],
        },
      },
      {
        id: "go_funcs-0-2",
        title: "Parameters & Arguments",
        xp: 16,
        chapterTitle: "Function Fundamentals",
        chapterColor: ACCENT,
        theory: [
          text(
            "Parameters define what inputs a function accepts. Arguments are the actual values you pass when you call the function.",
            {
              label: "Parameter example",
              content: `package main

import "fmt"

func add(a int, b int) int {
	return a + b
}

func main() {
	fmt.Println(add(3, 4))
}`
            },
          ),
          callout("tip", "If multiple parameters share the same type, you can shorten `func add(a int, b int)` to `func add(a, b int)`."),
          quiz(
            "In `func add(a, b int) int`, what is the type of `a`?",
            ["a has no type", "int", "b", "func"],
            1,
            "Both `a` and `b` have the type int when declared together."
          ),
        ],
        challenge: {
          title: "Add Two Numbers",
          description:
            "Create `func add(a, b int) int` and return their sum. Print `add(8, 12)` from main.",
          starterCode: `package main

// create add()

func main() {
    // print add result
}`,
          solutionCode: `package main
import "fmt"

func add(a, b int) int {
    return a + b
}

func main() {
    fmt.Println(add(8, 12))
}`,
          tests: [
            { id: 1, label: "Adds arguments", keywords: [{ pattern: "return a + b" }] },
            { id: 2, label: "Prints sum", keywords: [{ pattern: "fmt\\.Println\\(add\\(8,\\s*12\\)\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-ch-1",
    title: "Go Error Patterns",
    icon: "⚠️",
    color: "#3b82f6",
    lessons: [
      {
        id: "go_funcs-1-0",
        title: "Multiple Returns",
        xp: 18,
        chapterTitle: "Go Error Patterns",
        chapterColor: "#3b82f6",
        theory: [
          text(
            "Go functions can return more than one value. This pattern is common for returning a result and an error together.",
            {
              label: "Multiple returns",
              content: `package main

import "fmt"

func getCoords() (int, int) {
	return 10, 20
}

func main() {
	x, y := getCoords()
	fmt.Println(x, y)
}`
            },
          ),
          quiz(
            "How do you declare two return values?",
            ["(int, int)", "int int", "[int, int]", "int,int"],
            0,
            "Go uses parentheses around multiple return types: `(int, int)`."
          ),
        ],
        challenge: {
          title: "Coordinates",
          description:
            "Write `func getCoords() (int, int)` that returns `10` and `20`. Call it in main, assign to `x, y`, and print them.",
          starterCode: `package main

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
            { id: 2, label: "Assigns x, y", keywords: [{ pattern: "x,\\s*y\\s*:=\\s*getCoords\\(\\)" }] },
          ],
        },
      },
      {
        id: "go_funcs-1-1",
        title: "Error Handling (if err != nil)",
        xp: 20,
        chapterTitle: "Go Error Patterns",
        chapterColor: "#3b82f6",
        theory: [
          text(
            "Go uses explicit errors instead of exceptions. Functions return `error` as the final value, and callers check whether `err != nil`.",
            {
              label: "Error handling pattern",
              content: `package main

import (
	"errors"
	"fmt"
)

func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("cannot divide by zero")
	}
	return a / b, nil
}

func main() {
	result, err := divide(10, 0)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(result)
	}
}`
            },
          ),
          callout("warning", "Always check `err != nil` before using the returned value."),
          quiz(
            "What does Go use instead of try/catch?",
            ["exceptions", "error values", "panic only", "async callbacks"],
            1,
            "Go returns error values and checks them explicitly instead of using exception handling."
          ),
        ],
        challenge: {
          title: "Check the Error",
          description:
            "Call `fetchData()`. If `err != nil`, print `Error found`. Otherwise print `data`.",
          starterCode: `package main
import "errors"

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
            { id: 1, label: "Checks err != nil", keywords: [{ pattern: "if\\s+err\\s*!=\\s*nil" }] },
            { id: 2, label: "Prints error message", keywords: [{ pattern: "Error found" }] },
          ],
        },
      },
      {
        id: "go_funcs-1-2",
        title: "Defer Keyword",
        xp: 18,
        chapterTitle: "Go Error Patterns",
        chapterColor: "#3b82f6",
        theory: [
          text(
            "`defer` schedules a call to run when the current function returns. This is perfect for cleanup after the function finishes.",
            {
              label: "Defer example",
              content: `package main

import "fmt"

func doWork() {
	defer fmt.Println("Cleaning up")
	fmt.Println("Working")
}

func main() {
	doWork()
}`
            },
          ),
          callout("tip", "Deferred calls execute in LIFO order when the function exits."),
          quiz(
            "When does a deferred function call run?",
            ["Immediately", "After the function returns", "Before the function body", "Only on error"],
            1,
            "Deferred calls run after the current function returns."
          ),
        ],
        challenge: {
          title: "Cleanup Time",
          description:
            "Use `defer` to print `Closing file`. Then print `Writing data`. The output order should be reversed.",
          starterCode: `package main

func main() {
    // defer closing
    // print writing
}`,
          solutionCode: `${GO_MAIN}    defer fmt.Println("Closing file")
    fmt.Println("Writing data")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Uses defer", keywords: [{ pattern: "defer\\s+fmt\\.Println" }] },
            { id: 2, label: "Prints Closing file", keywords: [{ pattern: "Closing file" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-ch-2",
    title: "Methods & Interfaces",
    icon: "🎮",
    color: "#f59e0b",
    lessons: [
      {
        id: "go_funcs-2-0",
        title: "Methods (Receivers)",
        xp: 18,
        chapterTitle: "Methods & Interfaces",
        chapterColor: "#f59e0b",
        theory: [
          text(
            "Go attaches methods to types using receivers. This is how you add behaviour to structs without classes.",
            {
              label: "Method example",
              content: `package main

import "fmt"

type Rect struct {
	W, H int
}

func (r Rect) Area() int {
	return r.W * r.H
}

func main() {
	r := Rect{W: 10, H: 5}
	fmt.Println("Area:", r.Area())
}`
            },
          ),
          text(
            "Use a pointer receiver `*Rect` when the method needs to modify the struct's fields.",
          ),
          quiz(
            "What does `func (r Rect) Area() int` attach to Rect?",
            ["A field", "A method", "A receiver", "A package"],
            1,
            "That syntax defines a method named Area on the Rect type."
          ),
        ],
        challenge: {
          title: "Counter Method",
          description:
            "Define `type Counter struct { Count int }`. Write `func (c *Counter) Tick()` to increment Count. Create one Counter in main, call Tick, and print Count.",
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
            { id: 2, label: "Increments Count", keywords: [{ pattern: "c\\.Count\\+\\+" }] },
          ],
        },
      },
      {
        id: "go_funcs-2-1",
        title: "Implicit Interfaces",
        xp: 20,
        chapterTitle: "Methods & Interfaces",
        chapterColor: "#f59e0b",
        theory: [
          text(
            "An interface is satisfied automatically when a type implements the required methods. You do not declare `implements` in Go.",
            {
              label: "Interface example",
              content: `package main

import "fmt"

type Speaker interface {
	Speak() string
}

type Cat struct{}

func (c Cat) Speak() string {
	return "Meow"
}

func main() {
	var s Speaker = Cat{}
	fmt.Println(s.Speak())
}`
            },
          ),
          callout("tip", "Go interfaces describe behaviour. If a type has the methods, it matches the interface implicitly."),
          quiz(
            "How does a type satisfy an interface in Go?",
            ["With implements keyword", "Implicitly by matching methods", "By embedding", "By using pointers only"],
            1,
            "A type satisfies an interface implicitly by having the required methods."
          ),
        ],
        challenge: {
          title: "Shape Interface",
          description:
            "Write `func (sq Square) Area() int` for `type Square struct { Side int }`. Main uses `var s Shape = Square{Side: 4}` and prints `s.Area()`.",
          starterCode: `package main
import "fmt"

type Shape interface {
    Area() int
}

type Square struct {
    Side int
}

// write Area method for Square

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
            { id: 1, label: "Method receiver implements interface", keywords: [{ pattern: "func\\s*\\([^)]*Square\\)\\s*Area\\(\\)\\s*int" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-ch-3",
    title: "Concurrency",
    icon: "🚀",
    color: "#8b5cf6",
    lessons: [
      {
        id: "go_funcs-3-0",
        title: "Goroutines",
        xp: 20,
        chapterTitle: "Concurrency",
        chapterColor: "#8b5cf6",
        theory: [
          text(
            "Goroutines are lightweight concurrent threads. Add `go` before a function call to run it in the background.",
            {
              label: "Start a goroutine",
              content: `package main

import (
	"fmt"
	"time"
)

func sayHi() {
	fmt.Println("Hi")
}

func main() {
	go sayHi()
	
	// Pause briefly so main doesn't exit before the goroutine executes
	time.Sleep(100 * time.Millisecond)
}`
            },
          ),
          text(
            "Because `main` can exit before goroutines finish, real Go programs often synchronize with channels or wait groups.",
          ),
          quiz(
            "How do you launch a function concurrently in Go?",
            ["thread sayHi()", "go sayHi()", "async sayHi()", "run sayHi()"],
            1,
            "Prefix the function call with `go` to start a goroutine."
          ),
        ],
        challenge: {
          title: "Go Print",
          description:
            "Write `func sayHi() { fmt.Println(\"Hi\") }`. In main, launch it as a goroutine with `go sayHi()`.",
          starterCode: `package main

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
        id: "go_funcs-3-1",
        title: "Channels Intro",
        xp: 20,
        chapterTitle: "Concurrency",
        chapterColor: "#8b5cf6",
        theory: [
          text(
            "Channels let goroutines communicate safely. Use `make(chan T)` to create a channel and `ch <- value` to send data.",
            {
              label: "Channel example",
              content: `ch := make(chan string)

go func() {
    ch <- "ready"
}()

msg := <-ch
fmt.Println(msg)`
            },
          ),
          text("Receiving from a channel blocks until a value is available, making goroutine coordination simple."),
          quiz(
            "What symbol sends a value into a channel?",
            [":=", "<-", "=>", "<<"],
            1,
            "Use `ch <- value` to send into a channel."
          ),
        ],
        challenge: {
          title: "Channel Message",
          description:
            "Create `ch := make(chan string)`. Launch a goroutine that sends `\"done\"`. Receive from the channel in main and print it.",
          starterCode: `package main
import "fmt"

func main() {
    ch := make(chan string)
    // launch goroutine and send
    // receive and print
}`,
          solutionCode: `package main
import "fmt"

func main() {
    ch := make(chan string)

    go func() {
        ch <- "done"
    }()

    msg := <-ch
    fmt.Println(msg)
}`,
          tests: [
            { id: 1, label: "Creates channel", keywords: [{ pattern: "make\\(chan string\\)" }] },
            { id: 2, label: "Receives message", keywords: [{ pattern: "msg := <-ch" }] },
          ],
        },
      },
      {
        id: "go_funcs-3-2",
        title: "Select Statement",
        xp: 18,
        chapterTitle: "Concurrency",
        chapterColor: "#8b5cf6",
        theory: [
          text(
            "`select` waits on multiple channel operations. The first ready channel case runs, which makes concurrency patterns more flexible.",
            {
              label: "select example",
              content: `package main

import "fmt"

func main() {
	ch1 := make(chan string, 1)
	ch2 := make(chan string, 1)

	ch1 <- "hello"

	select {
	case msg := <-ch1:
		fmt.Println(msg)
	case ch2 <- "ping":
		fmt.Println("sent")
	}
}`
            },
          ),
          callout("info", "If none of the cases are ready, `select` blocks until one is."),
          quiz(
            "What statement handles multiple channel operations in Go?",
            ["switch", "if", "select", "receive"],
            2,
            "`select` is the Go construct for waiting on multiple channel operations."
          ),
        ],
        challenge: {
          title: "Choose a Channel",
          description:
            "Create two channels and send either `\"A\"` or `\"B\"` from separate goroutines. Use `select` in main to print the first ready value.",
          starterCode: `package main
import "fmt"

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    // start goroutines

    select {
    case msg := <-ch1:
        fmt.Println(msg)
    case msg := <-ch2:
        fmt.Println(msg)
    }
}`,
          solutionCode: `package main
import "fmt"

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() { ch1 <- "A" }()
    go func() { ch2 <- "B" }()

    select {
    case msg := <-ch1:
        fmt.Println(msg)
    case msg := <-ch2:
        fmt.Println(msg)
    }
}`,
          tests: [
            { id: 1, label: "Uses select", keywords: [{ pattern: "select\\s*\\{" }] },
            { id: 2, label: "Receives from channel", keywords: [{ pattern: `<-ch[12]` }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-ch-4",
    title: "Closures & Recursion",
    icon: "🔁",
    color: "#06b6d4",
    lessons: [
      {
        id: "go_funcs-4-0",
        title: "Closures",
        xp: 18,
        chapterTitle: "Closures & Recursion",
        chapterColor: "#06b6d4",
        theory: [
          text(
            "A closure is a function value that captures variables from its surrounding scope. It can carry state across calls.",
            {
              label: "Closure example",
              content: `package main

import "fmt"

func makeAdder(x int) func(int) int {
	return func(y int) int {
		return x + y
	}
}

func main() {
	add5 := makeAdder(5)
	fmt.Println(add5(3))
}`
            },
          ),
          quiz(
            "What does a closure carry with it?",
            ["A copy of its parameters", "Captured variables from the surrounding scope", "Only the function name", "No state"],
            1,
            "A closure captures variables from its surrounding scope so it can use them later."
          ),
        ],
        challenge: {
          title: "Make an Adder",
          description:
            "Write `func makeAdder(x int) func(int) int` that returns a function adding `x` to its argument. Use it in main to add 10 to 7 and print the result.",
          starterCode: `package main

// write makeAdder

func main() {
    // create and use adder
}`,
          solutionCode: `package main
import "fmt"

func makeAdder(x int) func(int) int {
    return func(y int) int {
        return x + y
    }
}

func main() {
    add10 := makeAdder(10)
    fmt.Println(add10(7))
}`,
          tests: [
            { id: 1, label: "Returns a function", keywords: [{ pattern: "func\\s+makeAdder\\(x int\\) func\\(int\\) int" }] },
            { id: 2, label: "Uses returned function", keywords: [{ pattern: "add10\\(7\\)" }] },
          ],
        },
      },
      {
        id: "go_funcs-4-1",
        title: "Recursion",
        xp: 16,
        chapterTitle: "Closures & Recursion",
        chapterColor: "#06b6d4",
        theory: [
          text(
            "Recursion is when a function calls itself. It is useful for solving divide-and-conquer problems or walking nested structures.",
            {
              label: "Recursive example",
              content: `package main

import "fmt"

func factorial(n int) int {
	if n <= 1 {
		return 1
	}
	return n * factorial(n-1)
}

func main() {
	fmt.Println(factorial(5))
}`
            },
          ),
          callout("tip", "Always include a base case to stop recursion and avoid infinite loops."),
          quiz(
            "What is required for recursion to stop?",
            ["A loop", "A base case", "Another function", "An error"],
            1,
            "A base case stops recursion by returning without calling itself again."
          ),
        ],
        challenge: {
          title: "Factorial Function",
          description:
            "Write `func factorial(n int) int` using recursion. Print `factorial(5)` from main.",
          starterCode: `package main

// write factorial

func main() {
    // print factorial
}`,
          solutionCode: `package main
import "fmt"

func factorial(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n-1)
}

func main() {
    fmt.Println(factorial(5))
}`,
          tests: [
            { id: 1, label: "Recursive call", keywords: [{ pattern: "factorial\\(n-1\\)" }] },
            { id: 2, label: "Base case", keywords: [{ pattern: "if n <= 1" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-ch-5",
    title: "Advanced Function Patterns",
    icon: "⚡",
    color: "#f97316",
    lessons: [
      {
        id: "go_funcs-5-0",
        title: "Higher-order Functions",
        xp: 18,
        chapterTitle: "Advanced Function Patterns",
        chapterColor: "#f97316",
        theory: [
          text(
            "Higher-order functions accept other functions as arguments or return them as values, making Go code more flexible.",
            {
              label: "Higher-order example",
              content: `package main

import "fmt"

func apply(f func(int) int, x int) int {
	return f(x)
}

func square(x int) int {
	return x * x
}

func main() {
	fmt.Println(apply(square, 4))
}`
            },
          ),
          quiz(
            "What can higher-order functions do?",
            ["Only perform math", "Accept functions as arguments", "Only return integers", "Run only once"],
            1,
            "Higher-order functions can accept other functions as arguments or return functions."
          ),
        ],
        challenge: {
          title: "Apply a Function",
          description:
            "Write `func apply(f func(int) int, x int) int` and use it to apply a function that doubles a number. Print the result for 6.",
          starterCode: `package main

func double(x int) int {
    return x * 2
}

// write apply

func main() {
    // use apply
}`,
          solutionCode: `package main
import "fmt"

func double(x int) int {
    return x * 2
}

func apply(f func(int) int, x int) int {
    return f(x)
}

func main() {
    fmt.Println(apply(double, 6))
}`,
          tests: [
            { id: 1, label: "Accepts function argument", keywords: [{ pattern: "func apply\\(f func\\(int\\) int, x int\\) int" }] },
            { id: 2, label: "Applies double", keywords: [{ pattern: "apply\\(double, 6\\)" }] },
          ],
        },
      },
      {
        id: "go_funcs-5-1",
        title: "Function Types",
        xp: 18,
        chapterTitle: "Advanced Function Patterns",
        chapterColor: "#f97316",
        theory: [
          text(
            "Go lets you define custom function types. This is useful for callbacks and clean APIs.",
            {
              label: "Function type example",
              content: `package main

import "fmt"

type IntOp func(int, int) int

func add(a, b int) int {
	return a + b
}

func main() {
	var op IntOp = add
	fmt.Println(op(2, 3))
}`
            },
          ),
          quiz(
            "What does `type IntOp func(int, int) int` define?",
            ["A variable", "A custom function type", "A struct", "A package"],
            1,
            "This defines a named function type that accepts two ints and returns an int."
          ),
        ],
        challenge: {
          title: "Define Function Type",
          description:
            "Create `type StringOp func(string, string) string` and use it to join two strings with a hyphen.",
          starterCode: `package main

type StringOp func(string, string) string

func join(a, b string) string {
    return a + "-" + b
}

func main() {
    // use StringOp
}`,
          solutionCode: `package main
import "fmt"

type StringOp func(string, string) string

func join(a, b string) string {
    return a + "-" + b
}

func main() {
    var op StringOp = join
    fmt.Println(op("go", "lang"))
}`,
          tests: [
            { id: 1, label: "Defines StringOp type", keywords: [{ pattern: "type StringOp func\\(string, string\\) string" }] },
            { id: 2, label: "Uses StringOp variable", keywords: [{ pattern: "var op StringOp = join" }] },
          ],
        },
      },
    ],
  },
];

export const GO_FUNCTIONS_LESSONS = applyLessonVideoLinks(
  GO_FUNCTIONS_CHAPTERS.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({
      ...lesson,
      chapterTitle: chapter.title,
      chapterColor: chapter.color,
      chapterIcon: chapter.icon,
    })),
  ),
  GO_FUNCTIONS_VIDEO_LINKS,
);

export const GO_FUNCTIONS_TOTAL_XP = GO_FUNCTIONS_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
