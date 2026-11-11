// PolyCode — Go Concurrency interactive course
// 6 chapters · 18 lessons · Go concurrency patterns

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { GO_CONCURRENCY_VIDEO_LINKS } from "./GoConcurrencyVideoLinks";

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

export const GO_CONCURRENCY_CHAPTERS = [
  {
    id: "go-concurrency-foundations",
    title: "Concurrency Foundations",
    stage: "beginner",
    icon: "🧠",
    color: ACCENT,
    lessons: [
      {
        id: "go-concurrency-0",
        title: "Why Concurrency?",
        xp: 15,
        chapterTitle: "Concurrency Foundations",
        chapterColor: ACCENT,
        theory: [
          text(
            "Go was designed for concurrency. Goroutines let one program run multiple independent tasks at the same time without creating a heavyweight OS thread for every task.",
            {
              label: "Concurrent task flow",
              content: `package main

import (
    "fmt"
    "time"
)

func task(name string) {
    for i := 0; i < 3; i++ {
        fmt.Println(name, i)
        time.Sleep(80 * time.Millisecond)
    }
}

func main() {
    go task("worker")
    task("main")
}`,
            },
          ),
          text(
            "Concurrency is about structuring work so independent tasks can overlap. It is not the same as parallelism, which depends on multiple CPU cores running work at the same time."
          ),
          quiz(
            "What keyword starts a goroutine in Go?",
            ["async", "go", "spawn", "thread"],
            1,
            "The `go` keyword launches a new goroutine for a function call."
          ),
        ],
        challenge: {
          title: "Start a Goroutine",
          description:
            'Create `worker(name string)` and call it once with `go worker("alpha")` and once directly in `main`.',
          starterCode: `package main

import "fmt"

func worker(name string) {
    for i := 0; i < 3; i++ {
        fmt.Println(name, i)
    }
}

func main() {
    // start one goroutine with go
    // call worker directly here
}`,
          solutionCode: `package main

import "fmt"

func worker(name string) {
    for i := 0; i < 3; i++ {
        fmt.Println(name, i)
    }
}

func main() {
    go worker("alpha")
    worker("main")
}`,
          tests: [
            { id: 1, label: "Defines worker", keywords: [{ pattern: "func\\s+worker\\(name\\s+string\\)" }] },
            { id: 2, label: "Starts goroutine", keywords: [{ pattern: "go\\s+worker\\(\"alpha\"\\)" }] },
            { id: 3, label: "Calls directly\n", keywords: [{ pattern: "worker\\(\"main\"\\)" }] },
          ],
        },
      },
      {
        id: "go-concurrency-1",
        title: "WaitGroups",
        xp: 17,
        chapterTitle: "Concurrency Foundations",
        chapterColor: ACCENT,
        theory: [
          text(
            "A goroutine may still be running when the main function exits. `sync.WaitGroup` helps you wait until a set of goroutines finishes before continuing.",
            {
              label: "Waiting for workers to finish",
              content: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Println("Worker", id, "starting")
    fmt.Println("Worker", id, "done")
}

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }

    wg.Wait()
    fmt.Println("All workers completed")
}`,
            },
          ),
          callout(
            "tip",
            "Use `wg.Add(1)` before launching the goroutine and `wg.Done()` at the end. `wg.Wait()` blocks until every task is done."
          ),
          quiz(
            "Why do we call `wg.Done()`?",
            ["To block the thread", "To decrement the wait count", "To restart the goroutine", "To close the channel"],
            1,
            "Each goroutine reports completion by calling `Done()`, which reduces the WaitGroup's pending count."
          ),
        ],
        challenge: {
          title: "Wait for All Tasks",
          description:
            "Use a `sync.WaitGroup` to launch three goroutines that each print `task N ready` and then wait for all three to finish before printing `All done`.",
          starterCode: `package main

import (
    "fmt"
    "sync"
)

func task(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Println("task", id, "ready")
}

func main() {
    var wg sync.WaitGroup
    // launch 3 goroutines and wait
}`,
          solutionCode: `package main

import (
    "fmt"
    "sync"
)

func task(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Println("task", id, "ready")
}

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 3; i++ {
        wg.Add(1)
        go task(i, &wg)
    }

    wg.Wait()
    fmt.Println("All done")
}`,
          tests: [
            { id: 1, label: "Uses WaitGroup", keywords: [{ pattern: "sync\\.WaitGroup" }] },
            { id: 2, label: "Calls Add and Wait", keywords: [{ pattern: "wg\\.Add\\(1\\)|wg\\.Wait\\(\\)" }] },
            { id: 3, label: "Prints All done", keywords: [{ pattern: "All done" }] },
          ],
        },
      },
      {
        id: "go-concurrency-2",
        title: "Race Awareness",
        xp: 16,
        chapterTitle: "Concurrency Foundations",
        chapterColor: ACCENT,
        theory: [
          text(
            "Concurrency can be tricky when multiple goroutines write to the same variable. This is called a data race and can lead to incorrect results.",
            {
              label: "Unsafe shared write",
              content: `package main

import (
    "fmt"
    "sync"
)

func main() {
    counter := 0
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter++
        }()
    }

    wg.Wait()
    fmt.Println("counter:", counter)
}`,
            },
          ),
          callout(
            "warning",
            "Accessing the same variable from multiple goroutines without synchronization is unsafe. Go's race detector helps catch it during development."
          ),
          quiz(
            "What is a data race?",
            ["Two goroutines reading the same value", "Two goroutines writing to the same value without synchronization", "Any long-running function", "A problem that only happens in Java"],
            1,
            "A data race occurs when multiple goroutines concurrently access the same memory without proper coordination."
          ),
        ],
        challenge: {
          title: "Safe Counter Pattern",
          description:
            "Use a mutex to make a shared counter safe across 5 goroutines. Each goroutine should increment the value once and then print the final count.",
          starterCode: `package main

import (
    "fmt"
    "sync"
)

func main() {
    counter := 0
    var mu sync.Mutex
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            // lock, increment, unlock
        }()
    }

    wg.Wait()
    fmt.Println("counter:", counter)
}`,
          solutionCode: `package main

import (
    "fmt"
    "sync"
)

func main() {
    counter := 0
    var mu sync.Mutex
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.Lock()
            counter++
            mu.Unlock()
        }()
    }

    wg.Wait()
    fmt.Println("counter:", counter)
}`,
          tests: [
            { id: 1, label: "Uses Mutex", keywords: [{ pattern: "sync\\.Mutex" }] },
            { id: 2, label: "Locks before increment", keywords: [{ pattern: "mu\\.Lock\\(\\)" }] },
            { id: 3, label: "Prints final counter", keywords: [{ pattern: "fmt\\.Println\\(\"counter:\",\\s*counter\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-concurrency-channels",
    title: "Channels & Communication",
    stage: "intermediate",
    icon: "📨",
    color: "#3b82f6",
    lessons: [
      {
        id: "go-concurrency-3",
        title: "Channels Basics",
        xp: 18,
        chapterTitle: "Channels & Communication",
        chapterColor: "#3b82f6",
        theory: [
          text(
            "Channels are Go's way to pass values between goroutines. A channel can be used like a pipeline: one goroutine sends data and another receives it.",
            {
              label: "Send and receive",
              content: `package main

import "fmt"

func main() {
    messages := make(chan string, 2)

    go func() {
        messages <- "hello"
        messages <- "world"
        close(messages)
    }()

    for msg := range messages {
        fmt.Println(msg)
    }
}`,
            },
          ),
          text(
            "Sending to a channel blocks until a receiver is ready, which helps coordinate data flow naturally between goroutines."
          ),
          quiz(
            'What does `messages <- "hello"` do?',
            ["Reads from the channel", "Sends a value into the channel", "Closes the channel", "Creates a buffer"],
            1,
            "The send operator pushes a value into the channel so another goroutine can receive it."
          ),
        ],
        challenge: {
          title: "Pass a Message",
          description:
            'Create a channel, launch a goroutine that sends `"ready"`, and print the message in `main`.',
          starterCode: `package main

import "fmt"

func main() {
    ch := make(chan string)
    go func() {
        ch <- "ready"
    }()

    // receive from ch and print
}`,
          solutionCode: `package main

import "fmt"

func main() {
    ch := make(chan string)
    go func() {
        ch <- "ready"
    }()

    fmt.Println(<-ch)
}`,
          tests: [
            { id: 1, label: "Creates channel", keywords: [{ pattern: "make\\(chan\\s+string\\)" }] },
            { id: 2, label: "Sends value", keywords: [{ pattern: "ch\\s*<-\\s*\"ready\"" }] },
            { id: 3, label: "Receives and prints", keywords: [{ pattern: "fmt\\.Println\\(<-ch\\)" }] },
          ],
        },
      },
      {
        id: "go-concurrency-4",
        title: "Buffered Channels",
        xp: 18,
        chapterTitle: "Channels & Communication",
        chapterColor: "#3b82f6",
        theory: [
          text(
            "A buffered channel has capacity. It can hold a limited number of values without a receiver being ready immediately, which helps decouple sending and receiving.",
            {
              label: "Buffered send example",
              content: `package main

import "fmt"

func main() {
    jobs := make(chan string, 2)
    jobs <- "first"
    jobs <- "second"

    fmt.Println(<-jobs)
    fmt.Println(<-jobs)
}`,
            },
          ),
          callout(
            "tip",
            "Use buffered channels when producers can send a few values ahead of consumers without blocking."
          ),
          quiz(
            "How does a buffered channel differ from an unbuffered one?",
            ["It allows sends without a receiver until the buffer fills", "It runs faster without synchronization", "It only works with strings", "It cannot be closed"],
            0,
            "Buffered channels accept a limited number of values before needing a receiver."
          ),
        ],
        challenge: {
          title: "Buffered Queue",
          description:
            "Create a buffered channel with capacity 2, send two values into it, then read them back and print them on separate lines.",
          starterCode: `package main

import "fmt"

func main() {
    queue := make(chan string, 2)
    // send two values
    // receive and print both
}`,
          solutionCode: `package main

import "fmt"

func main() {
    queue := make(chan string, 2)
    queue <- "first"
    queue <- "second"

    fmt.Println(<-queue)
    fmt.Println(<-queue)
}`,
          tests: [
            { id: 1, label: "Uses buffered channel", keywords: [{ pattern: "make\\(chan\\s+string,\\s*2\\)" }] },
            { id: 2, label: "Sends two values", keywords: [{ pattern: "queue\\s*<-\\s*\"first\"|queue\\s*<-\\s*\"second\"" }] },
            { id: 3, label: "Prints both", keywords: [{ pattern: "fmt\\.Println\\(<-queue\\)" }] },
          ],
        },
      },
      {
        id: "go-concurrency-5",
        title: "Select & Timeout",
        xp: 20,
        chapterTitle: "Channels & Communication",
        chapterColor: "#3b82f6",
        theory: [
          text(
            "The `select` statement lets a goroutine wait on multiple channel operations. It is useful for timeouts and multiple communication paths.",
            {
              label: "Using select with timeouts",
              content: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string, 1)

    select {
    case msg := <-ch:
        fmt.Println("got:", msg)
    case <-time.After(200 * time.Millisecond):
        fmt.Println("timeout")
    }
}`,
            },
          ),
          text(
            "`time.After` creates a timer channel. `select` wakes when either a message arrives or the timeout fires."
          ),
          quiz(
            "What does `select` help with?",
            ["Looping over arrays", "Waiting on multiple channel cases", "Allocating memory", "Printing strings"],
            1,
            "`select` is used to listen for several communication operations and choose the one that is ready."
          ),
        ],
        challenge: {
          title: "Timeout Example",
          description:
            "Use `select` with `time.After` to print `timeout` if no message arrives within 100 milliseconds.",
          starterCode: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string)

    select {
    case msg := <-ch:
        fmt.Println("got:", msg)
    case <-time.After(100 * time.Millisecond):
        // print timeout
    }
}`,
          solutionCode: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string)

    select {
    case msg := <-ch:
        fmt.Println("got:", msg)
    case <-time.After(100 * time.Millisecond):
        fmt.Println("timeout")
    }
}`,
          tests: [
            { id: 1, label: "Uses select", keywords: [{ pattern: "select\\s*\\{" }] },
            { id: 2, label: "Uses time.After", keywords: [{ pattern: "time\\.After\\(100\\s*\\*\\s*time\\.Millisecond\\)" }] },
            { id: 3, label: "Prints timeout", keywords: [{ pattern: "timeout" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-concurrency-shared-state",
    title: "Safe Shared State",
    stage: "intermediate",
    icon: "🔒",
    color: "#0ea5e9",
    lessons: [
      {
        id: "go-concurrency-6",
        title: "Mutex Basics",
        xp: 19,
        chapterTitle: "Safe Shared State",
        chapterColor: "#0ea5e9",
        theory: [
          text(
            "When multiple goroutines access a shared value, you need a lock. A `sync.Mutex` ensures only one goroutine can access the protected section at a time.",
            {
              label: "Protecting a counter",
              content: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.Mutex
    total := 0

    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.Lock()
            total++
            mu.Unlock()
        }()
    }

    wg.Wait()
    fmt.Println("total:", total)
}`,
            },
          ),
          text(
            "Locking prevents simultaneous writes. Keep the critical section as small as possible so other goroutines do not wait longer than necessary."
          ),
          quiz(
            "Why use a mutex?",
            ["To avoid data races", "To print output", "To create arrays", "To send channels"],
            0,
            "A mutex serializes access to shared state so goroutines do not corrupt it."
          ),
        ],
        challenge: {
          title: "Locked Counter",
          description:
            "Protect a shared integer with a `sync.Mutex`, increment it in a goroutine, and print the final value.",
          starterCode: `package main

import (
    "fmt"
    "sync"
)

func main() {
    count := 0
    var mu sync.Mutex

    // increment count safely in a goroutine
    go func() {
        mu.Lock()
        count++
        mu.Unlock()
    }()

    // wait a bit and print count
}`,
          solutionCode: `package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    count := 0
    var mu sync.Mutex

    go func() {
        mu.Lock()
        count++
        mu.Unlock()
    }()

    time.Sleep(50 * time.Millisecond)
    fmt.Println("count:", count)
}`,
          tests: [
            { id: 1, label: "Uses Mutex", keywords: [{ pattern: "sync\\.Mutex" }] },
            { id: 2, label: "Locks and increments", keywords: [{ pattern: "mu\\.Lock\\(\\).*count\\+\\+.*mu\\.Unlock\\(\\)" }] },
            { id: 3, label: "Prints count", keywords: [{ pattern: "fmt\\.Println\\(\"count:\",\\s*count\\)" }] },
          ],
        },
      },
      {
        id: "go-concurrency-7",
        title: "RWMutex & Shared Reads",
        xp: 18,
        chapterTitle: "Safe Shared State",
        chapterColor: "#0ea5e9",
        theory: [
          text(
            "If many goroutines are reading but few are writing, `sync.RWMutex` gives better performance. Readers can lock together, but writers still get exclusive access.",
            {
              label: "Read mostly access",
              content: `package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    var rw sync.RWMutex
    value := 10

    go func() {
        rw.Lock()
        value = 20
        rw.Unlock()
    }()

    time.Sleep(10 * time.Millisecond)
    rw.RLock()
    fmt.Println("value:", value)
    rw.RUnlock()
}`,
            },
          ),
          quiz(
            "When use `RWMutex` instead of `Mutex`?",
            ["When one goroutine does everything", "When many reads and few writes happen together", "Never", "Only for channels"],
            1,
            "`RWMutex` is ideal when reads are frequent and writes are rare."
          ),
        ],
        challenge: {
          title: "Read-Write Lock",
          description:
            "Use `sync.RWMutex` to read a value and then update it once under a write lock, printing the final value.",
          starterCode: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var rw sync.RWMutex
    value := 5

    rw.RLock()
    fmt.Println("value:", value)
    rw.RUnlock()

    rw.Lock()
    value = 9
    rw.Unlock()

    fmt.Println("final:", value)
}`,
          solutionCode: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var rw sync.RWMutex
    value := 5

    rw.RLock()
    fmt.Println("value:", value)
    rw.RUnlock()

    rw.Lock()
    value = 9
    rw.Unlock()

    fmt.Println("final:", value)
}`,
          tests: [
            { id: 1, label: "Uses RWMutex", keywords: [{ pattern: "sync\\.RWMutex" }] },
            { id: 2, label: "Uses RLock", keywords: [{ pattern: "rw\\.RLock\\(\\)" }] },
            { id: 3, label: "Uses Lock and Unlock", keywords: [{ pattern: "rw\\.Lock\\(\\)|rw\\.Unlock\\(\\)" }] },
          ],
        },
      },
      {
        id: "go-concurrency-8",
        title: "Atomic Counters",
        xp: 17,
        chapterTitle: "Safe Shared State",
        chapterColor: "#0ea5e9",
        theory: [
          text(
            "For simple counters, Go's `sync/atomic` package can update values without a full mutex. It is useful for high-frequency increments where a mutex may be too heavy.",
            {
              label: "Atomic increment",
              content: `package main

import (
    "fmt"
    "sync/atomic"
)

func main() {
    var total int32 = 0
    atomic.AddInt32(&total, 1)
    fmt.Println("total:", atomic.LoadInt32(&total))
}`,
            },
          ),
          callout(
            "info",
            "Atomic operations are ideal for single numeric updates. For more complex state, prefer mutexes and clear ownership boundaries."
          ),
          quiz(
            "When do atomic operations help most?",
            ["For complex object graphs", "For simple numeric counters", "Only in tests", "Never in Go"],
            1,
            "Atomic operations are a great fit when many goroutines are incrementing or reading a single integer value."
          ),
        ],
        challenge: {
          title: "Atomic Add",
          description:
            "Use `atomic.AddInt32` to increment a counter from 0 to 3 and print the result.",
          starterCode: `package main

import (
    "fmt"
    "sync/atomic"
)

func main() {
    var count int32 = 0
    // increment count three times atomically
    fmt.Println("count:", count)
}`,
          solutionCode: `package main

import (
    "fmt"
    "sync/atomic"
)

func main() {
    var count int32 = 0
    atomic.AddInt32(&count, 3)
    fmt.Println("count:", atomic.LoadInt32(&count))
}`,
          tests: [
            { id: 1, label: "Uses AddInt32", keywords: [{ pattern: "atomic\\.AddInt32\\(" }] },
            { id: 2, label: "Uses LoadInt32", keywords: [{ pattern: "atomic\\.LoadInt32\\(" }] },
            { id: 3, label: "Prints count", keywords: [{ pattern: "fmt\\.Println\\(\"count:\",\\s*atomic\\.LoadInt32\\(&count\\)\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-concurrency-worker-pools",
    title: "Worker Pools & Pipelines",
    stage: "pro",
    icon: "⚙️",
    color: "#f59e0b",
    lessons: [
      {
        id: "go-concurrency-9",
        title: "Worker Pool Pattern",
        xp: 20,
        chapterTitle: "Worker Pools & Pipelines",
        chapterColor: "#f59e0b",
        theory: [
          text(
            "A worker pool uses a fixed number of goroutines to process many jobs. This keeps memory use steady and prevents an unbounded explosion of goroutines.",
            {
              label: "Pool example",
              content: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
        fmt.Println("worker", id, "processed", j)
    }
}

func main() {
    jobs := make(chan int, 5)
    results := make(chan int, 5)

    const workers = 2
    var wg sync.WaitGroup

    for w := 0; w < workers; w++ {
        wg.Add(1)
        go func(workerID int) {
            defer wg.Done()
            worker(workerID, jobs, results)
        }(w)
    }

    for j := 1; j <= 4; j++ {
        jobs <- j
    }
    close(jobs)
    wg.Wait()
    close(results)
}`,
            },
          ),
          text(
            "A pool is especially helpful for queueing tasks like image processing, file work, or network requests."
          ),
          quiz(
            "Why is a worker pool useful?",
            ["It reduces thread count and limits concurrency", "It makes code shorter", "It removes channels", "It removes all errors"],
            0,
            "Worker pools cap how many goroutines do work at once and make resource usage predictable."
          ),
        ],
        challenge: {
          title: "Process Jobs",
          description:
            "Create a worker pool with 2 workers that reads numbers from a jobs channel, doubles them, and sends the result to a results channel.",
          starterCode: `package main

import "fmt"

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
        fmt.Println("worker", id, "processed", j)
    }
}

func main() {
    jobs := make(chan int, 4)
    results := make(chan int, 4)

    // start 2 goroutines
    // send 1..4 jobs
    // close jobs
    // collect results
}`,
          solutionCode: `package main

import "fmt"

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
        fmt.Println("worker", id, "processed", j)
    }
}

func main() {
    jobs := make(chan int, 4)
    results := make(chan int, 4)

    for w := 0; w < 2; w++ {
        go worker(w, jobs, results)
    }

    for j := 1; j <= 4; j++ {
        jobs <- j
    }
    close(jobs)

    for i := 0; i < 4; i++ {
        fmt.Println(<-results)
    }
}`,
          tests: [
            { id: 1, label: "Starts 2 workers", keywords: [{ pattern: "for\\s+w\\s*:=\\s*0;\\s*w\\s*<\\s*2;\\s*w\\+\\+" }] },
            { id: 2, label: "Uses jobs channel", keywords: [{ pattern: "jobs\\s*:=\\s*make\\(chan\\s+int" }] },
            { id: 3, label: "Collects results", keywords: [{ pattern: "fmt\\.Println\\(<-results\\)" }] },
          ],
        },
      },
      {
        id: "go-concurrency-10",
        title: "Pipelines",
        xp: 20,
        chapterTitle: "Worker Pools & Pipelines",
        chapterColor: "#f59e0b",
        theory: [
          text(
            "A pipeline connects stages: one goroutine emits values, the next processes them, and the next prints or stores them. This keeps logic modular and easy to compose.",
            {
              label: "Pipeline stages",
              content: `package main

import "fmt"

func square(nums []int) chan int {
    out := make(chan int, len(nums))
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n * n
        }
    }()
    return out
}

func main() {
    in := []int{1, 2, 3, 4}
    for v := range square(in) {
        fmt.Println(v)
    }
}`,
            },
          ),
          quiz(
            "What is the point of a pipeline?",
            ["To hide all logic", "To chain stages of processing with channels", "To replace loops", "To remove functions"],
            1,
            "Pipelines use channels to send intermediate results from one stage to the next."
          ),
        ],
        challenge: {
          title: "Square Pipeline",
          description:
            "Build a pipeline function `square(nums []int) chan int` that emits the square of each number and prints the results in `main`.",
          starterCode: `package main

import "fmt"

func square(nums []int) chan int {
    out := make(chan int, len(nums))
    go func() {
        defer close(out)
        for _, n := range nums {
            // send n * n
        }
    }()
    return out
}

func main() {
    for v := range square([]int{1, 2, 3, 4}) {
        fmt.Println(v)
    }
}`,
          solutionCode: `package main

import "fmt"

func square(nums []int) chan int {
    out := make(chan int, len(nums))
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n * n
        }
    }()
    return out
}

func main() {
    for v := range square([]int{1, 2, 3, 4}) {
        fmt.Println(v)
    }
}`,
          tests: [
            { id: 1, label: "Defines square pipeline", keywords: [{ pattern: "func\\s+square\\(nums\\s+\\[\\]int\\)\\s+chan\\s+int" }] },
            { id: 2, label: "Sends squared values", keywords: [{ pattern: "out\\s*<-\\s*n\\s*\\*\\s*n" }] },
            { id: 3, label: "Prints pipeline output", keywords: [{ pattern: "fmt\\.Println\\(v\\)" }] },
          ],
        },
      },
      {
        id: "go-concurrency-11",
        title: "Context & Cancellation",
        xp: 21,
        chapterTitle: "Worker Pools & Pipelines",
        chapterColor: "#f59e0b",
        theory: [
          text(
            "`context.Context` carries cancellation, deadlines, and deadlines across goroutines. It is essential for stopping work when the user cancels or a timeout fires.",
            {
              label: "Context cancellation",
              content: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 150*time.Millisecond)
    defer cancel()

    select {
    case <-ctx.Done():
        fmt.Println("done:", ctx.Err())
    case <-time.After(500 * time.Millisecond):
        fmt.Println("work finished")
    }
}`,
            },
          ),
          callout(
            "tip",
            "Use `context.WithCancel` or `WithTimeout` to stop goroutines cooperatively instead of leaving them running in the background."
          ),
          quiz(
            "Why use `context.Context`?",
            ["To define loops", "To propagate cancellation and deadlines", "To print values", "To manage imports"],
            1,
            "Context carries cancellation state and deadlines through concurrent work."
          ),
        ],
        challenge: {
          title: "Timeout With Context",
          description:
            "Create a context with a timeout of 100 milliseconds and print `done: context deadline exceeded` when it times out.",
          starterCode: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    select {
    case <-ctx.Done():
        // print the error
    case <-time.After(500 * time.Millisecond):
        fmt.Println("work finished")
    }
}`,
          solutionCode: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    select {
    case <-ctx.Done():
        fmt.Println("done:", ctx.Err())
    case <-time.After(500 * time.Millisecond):
        fmt.Println("work finished")
    }
}`,
          tests: [
            { id: 1, label: "Uses context.WithTimeout", keywords: [{ pattern: "context\\.WithTimeout\\(" }] },
            { id: 2, label: "Checks ctx.Done", keywords: [{ pattern: "case\\s*<-ctx\\.Done\\(\\)" }] },
            { id: 3, label: "Prints context error", keywords: [{ pattern: "ctx\\.Err\\(\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-concurrency-timers",
    title: "Timers & Advanced Coordination",
    stage: "advanced",
    icon: "⏱️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "go-concurrency-12",
        title: "Timers & Tickers",
        xp: 20,
        chapterTitle: "Timers & Advanced Coordination",
        chapterColor: "#8b5cf6",
        theory: [
          text(
            "`time.NewTicker` fires periodically. `time.NewTimer` fires once after a delay. These are very useful for polling, heartbeats, and scheduled work in concurrent loops.",
            {
              label: "Ticker example",
              content: `package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(100 * time.Millisecond)
    defer ticker.Stop()

    for i := 0; i < 3; i++ {
        <-ticker.C
        fmt.Println("tick")
    }
}`,
            },
          ),
          text(
            "When a ticker is no longer needed, call `Stop()` so the goroutine stops cleanly."
          ),
          quiz(
            "What is a ticker used for?",
            ["Single event after delay", "Periodic event scheduling", "Reading files", "Compiling Go code"],
            1,
            "A ticker repeatedly emits ticks on a schedule, which is useful for recurring tasks."
          ),
        ],
        challenge: {
          title: "Tick Three Times",
          description:
            "Create a `time.NewTicker` with a 50 millisecond interval and print `tick` three times before stopping the ticker.",
          starterCode: `package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(50 * time.Millisecond)
    defer ticker.Stop()

    for i := 0; i < 3; i++ {
        <-ticker.C
        fmt.Println("tick")
    }
}`,
          solutionCode: `package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(50 * time.Millisecond)
    defer ticker.Stop()

    for i := 0; i < 3; i++ {
        <-ticker.C
        fmt.Println("tick")
    }
}`,
          tests: [
            { id: 1, label: "Uses NewTicker", keywords: [{ pattern: "time\\.NewTicker\\(50\\s*\\*\\s*time\\.Millisecond\\)" }] },
            { id: 2, label: "Stops ticker", keywords: [{ pattern: "ticker\\.Stop\\(\\)" }] },
            { id: 3, label: "Prints tick", keywords: [{ pattern: "fmt\\.Println\\(\"tick\"\\)" }] },
          ],
        },
      },
      {
        id: "go-concurrency-13",
        title: "Rate Limiters",
        xp: 19,
        chapterTitle: "Timers & Advanced Coordination",
        chapterColor: "#8b5cf6",
        theory: [
          text(
            "A rate limiter ensures a goroutine does not overwhelm a service. In Go, the `time.Ticker` pattern can be used to throttle repeated work safely.",
            {
              label: "Throttled output",
              content: `package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(150 * time.Millisecond)
    defer ticker.Stop()

    for i := 0; i < 3; i++ {
        <-ticker.C
        fmt.Println("sending request", i+1)
    }
}`,
            },
          ),
          quiz(
            "What is a rate limiter for?",
            ["To accelerate CPU usage", "To control the speed of repeated work", "To replace channels", "To skip errors"],
            1,
            "Rate limiting prevents a pipeline or service from being overrun by too many requests too quickly."
          ),
        ],
        challenge: {
          title: "Throttle Requests",
          description:
            "Use a ticker to print `sending request N` three times with a 100 ms spacing between them.",
          starterCode: `package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(100 * time.Millisecond)
    defer ticker.Stop()

    for i := 0; i < 3; i++ {
        <-ticker.C
        // print sending request i+1
    }
}`,
          solutionCode: `package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(100 * time.Millisecond)
    defer ticker.Stop()

    for i := 0; i < 3; i++ {
        <-ticker.C
        fmt.Println("sending request", i+1)
    }
}`,
          tests: [
            { id: 1, label: "Uses Ticker", keywords: [{ pattern: "time\\.NewTicker\\(100\\s*\\*\\s*time\\.Millisecond\\)" }] },
            { id: 2, label: "Reads from ticker.C", keywords: [{ pattern: "<-ticker\\.C" }] },
            { id: 3, label: "Prints sending request", keywords: [{ pattern: "sending request" }] },
          ],
        },
      },
      {
        id: "go-concurrency-14",
        title: "Closing Channels Cleanly",
        xp: 21,
        chapterTitle: "Timers & Advanced Coordination",
        chapterColor: "#8b5cf6",
        theory: [
          text(
            "When a producer is finished, close the channel to signal consumers that no more values will arrive. Receivers can detect closure with `for v := range ch`.",
            {
              label: "Closing a job channel",
              content: `package main

import "fmt"

func main() {
    jobs := make(chan int, 3)
    jobs <- 1
    jobs <- 2
    close(jobs)

    for job := range jobs {
        fmt.Println(job)
    }
}`,
            },
          ),
          callout(
            "warning",
            "Only close a channel when no more sends will happen. Sending on a closed channel panics."
          ),
          quiz(
            "Why close a channel?",
            ["To end the data flow cleanly", "To force a panic", "To remove goroutines", "To generate errors"],
            0,
            "Closing a channel signals readers that no more values will be sent and lets them exit loops cleanly."
          ),
        ],
        challenge: {
          title: "Close the Queue",
          description:
            "Create a jobs channel, send two values, close it, and iterate with `for job := range jobs` to print both values.",
          starterCode: `package main

import "fmt"

func main() {
    jobs := make(chan int, 2)
    jobs <- 10
    jobs <- 20
    // close the channel

    for job := range jobs {
        fmt.Println(job)
    }
}`,
          solutionCode: `package main

import "fmt"

func main() {
    jobs := make(chan int, 2)
    jobs <- 10
    jobs <- 20
    close(jobs)

    for job := range jobs {
        fmt.Println(job)
    }
}`,
          tests: [
            { id: 1, label: "Closes channel", keywords: [{ pattern: "close\\(jobs\\)" }] },
            { id: 2, label: "Range over jobs", keywords: [{ pattern: "for\\s+job\\s*:=\\s*range\\s+jobs" }] },
            { id: 3, label: "Prints job values", keywords: [{ pattern: "fmt\\.Println\\(job\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-concurrency-best-practices",
    title: "Concurrency Best Practices",
    stage: "advanced",
    icon: "✅",
    color: "#22c55e",
    lessons: [
      {
        id: "go-concurrency-15",
        title: "Avoid Goroutine Leaks",
        xp: 20,
        chapterTitle: "Concurrency Best Practices",
        chapterColor: "#22c55e",
        theory: [
          text(
            "Long-running goroutines should exit when their task is finished or when the context is cancelled. Without that, a program can leak goroutines and keep running unexpectedly.",
            {
              label: "Context-driven shutdown",
              content: `package main

import (
    "context"
    "fmt"
    "time"
)

func worker(ctx context.Context, done chan<- string) {
    select {
    case <-ctx.Done():
        done <- "stopped"
    case <-time.After(200 * time.Millisecond):
        done <- "finished"
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()
    done := make(chan string, 1)
    go worker(ctx, done)
    fmt.Println(<-done)
}`,
            },
          ),
          text(
            "Think explicitly about shutdown: who cancels work, what conditions stop it, and how a goroutine exits gracefully."
          ),
          quiz(
            "What is a goroutine leak?",
            ["A blocked goroutine that never exits", "A syntax error", "A missing import", "A printed log"],
            0,
            "A goroutine leak happens when goroutines keep waiting or running even though their work is no longer needed."
          ),
        ],
        challenge: {
          title: "Stop a Worker",
          description:
            "Use a context with cancel to stop a worker goroutine and print `stopped` when the context is canceled.",
          starterCode: `package main

import (
    "context"
    "fmt"
    "time"
)

func worker(ctx context.Context, out chan<- string) {
    select {
    case <-ctx.Done():
        out <- "stopped"
    case <-time.After(500 * time.Millisecond):
        out <- "finished"
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()
    out := make(chan string, 1)
    go worker(ctx, out)
    cancel()
    fmt.Println(<-out)
}`,
          solutionCode: `package main

import (
    "context"
    "fmt"
    "time"
)

func worker(ctx context.Context, out chan<- string) {
    select {
    case <-ctx.Done():
        out <- "stopped"
    case <-time.After(500 * time.Millisecond):
        out <- "finished"
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()
    out := make(chan string, 1)
    go worker(ctx, out)
    cancel()
    fmt.Println(<-out)
}`,
          tests: [
            { id: 1, label: "Uses context.WithCancel", keywords: [{ pattern: "context\\.WithCancel\\(" }] },
            { id: 2, label: "Calls cancel", keywords: [{ pattern: "cancel\\(\\)" }] },
            { id: 3, label: "Prints stopped", keywords: [{ pattern: "stopped" }] },
          ],
        },
      },
      {
        id: "go-concurrency-16",
        title: "Error Handling in Goroutines",
        xp: 20,
        chapterTitle: "Concurrency Best Practices",
        chapterColor: "#22c55e",
        theory: [
          text(
            "When a goroutine fails, you do not want it to silently disappear. Send results or errors back over a channel so the caller can decide how to handle them.",
            {
              label: "Reporting errors safely",
              content: `package main

import (
    "fmt"
)

func worker(results chan<- string) {
    results <- "processed"
}

func main() {
    results := make(chan string, 1)
    go worker(results)
    fmt.Println(<-results)
}`,
            },
          ),
          quiz(
            "Why send results over a channel?",
            ["To avoid compile errors", "To communicate success or errors back to the caller", "To skip logging", "To compress code"],
            1,
            "Channels are a safe way to communicate completion and values from goroutines to the rest of the program."
          ),
        ],
        challenge: {
          title: "Report Result",
          description:
            'Launch a goroutine that sends `"ok"` back through a channel and print the result in `main`.',
          starterCode: `package main

import "fmt"

func worker(done chan<- string) {
    done <- "ok"
}

func main() {
    done := make(chan string, 1)
    go worker(done)
    // print the result from done
}`,
          solutionCode: `package main

import "fmt"

func worker(done chan<- string) {
    done <- "ok"
}

func main() {
    done := make(chan string, 1)
    go worker(done)
    fmt.Println(<-done)
}`,
          tests: [
            { id: 1, label: "Uses channel", keywords: [{ pattern: "make\\(chan\\s+string,\\s*1\\)" }] },
            { id: 2, label: "Sends ok", keywords: [{ pattern: "done\\s*<-\\s*\"ok\"" }] },
            { id: 3, label: "Prints result", keywords: [{ pattern: "fmt\\.Println\\(<-done\\)" }] },
          ],
        },
      },
      {
        id: "go-concurrency-17",
        title: "Concurrency Checklist",
        xp: 18,
        chapterTitle: "Concurrency Best Practices",
        chapterColor: "#22c55e",
        theory: [
          text(
            "A good Go concurrency design keeps ownership clear, uses channels for communication, and uses locks only to protect shared state. Prefer simple, explicit patterns over clever tricks.",
            {
              label: "Practical checklist",
              content: `package main

import "fmt"

func main() {
    jobs := make(chan string, 2)
    jobs <- "build"
    jobs <- "test"
    close(jobs)

    for job := range jobs {
        fmt.Println(job)
    }
}`,
            },
          ),
          callout(
            "success",
            "The goal is not 'more goroutines'. The goal is clear coordination, safe access to shared data, and predictable shutdown."
          ),
          quiz(
            "What is the best default for Go concurrency design?",
            ["Use global variables everywhere", "Keep data ownership explicit and use channels for coordination", "Avoid all functions", "Ignore shutdown paths"],
            1,
            "Clear ownership and explicit coordination are the foundations of safe and maintainable concurrent Go code."
          ),
        ],
        challenge: {
          title: "Build a Simple Pipeline",
          description:
            "Create a channel, send two values, close it, and print those values from a single range loop to complete the final concurrency pattern.",
          starterCode: `package main

import "fmt"

func main() {
    jobs := make(chan string, 2)
    jobs <- "build"
    jobs <- "test"
    // close jobs
    // range over jobs and print each item
}`,
          solutionCode: `package main

import "fmt"

func main() {
    jobs := make(chan string, 2)
    jobs <- "build"
    jobs <- "test"
    close(jobs)

    for job := range jobs {
        fmt.Println(job)
    }
}`,
          tests: [
            { id: 1, label: "Creates channel", keywords: [{ pattern: "make\\(chan\\s+string,\\s*2\\)" }] },
            { id: 2, label: "Closes channel", keywords: [{ pattern: "close\\(jobs\\)" }] },
            { id: 3, label: "Prints jobs", keywords: [{ pattern: "fmt\\.Println\\(job\\)" }] },
          ],
        },
      },
    ],
  },
];

export const GO_CONCURRENCY_LESSONS = applyLessonVideoLinks(
  GO_CONCURRENCY_CHAPTERS.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({
      ...lesson,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      chapterColor: chapter.color,
      chapterIcon: chapter.icon,
    })),
  ),
  GO_CONCURRENCY_VIDEO_LINKS,
);

export const GO_CONCURRENCY_TOTAL_XP = GO_CONCURRENCY_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
