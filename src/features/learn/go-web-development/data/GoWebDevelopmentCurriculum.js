// PolyCode - Go Web Development interactive course
// 7 chapters · 21 lessons · Beginner to Advanced

const ACCENT = "#00add8";

function text(content, code = null) {
  return code
    ? { type: "text", content, code: { lang: "go", ...code } }
    : { type: "text", content };
}

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function lesson(chapterTitle, chapterColor, id, title, xp, summary, code, challenge) {
  return {
    id,
    title,
    xp,
    chapterTitle,
    chapterColor,
    theory: [
      text(summary, { label: `${title} example`, content: code }),
      quiz(
        `Which Go web-development idea does ${title} demonstrate?`,
        ["A typed, explicit server building block", "A browser-only feature", "A database migration", "A CSS rule"],
        0,
        "Go's standard library provides small, explicit building blocks that compose into reliable web services.",
      ),
    ],
    challenge,
  };
}

const challenge = (title, description, starterCode, solutionCode, patterns) => ({
  title,
  description,
  starterCode,
  solutionCode,
  tests: patterns.map(([label, pattern]) => ({
    id: label,
    label,
    keywords: [{ pattern }],
  })),
});

export const GO_WEB_DEVELOPMENT_CHAPTERS = [
  {
    id: "go-web-foundations",
    title: "Web Foundations",
    stage: "beginner",
    icon: "🌐",
    color: ACCENT,
    lessons: [
      lesson("Web Foundations", ACCENT, "go-web-0", "Your First HTTP Server", 15,
        "The net/http package can serve a route with only a handler function and ListenAndServe. The server below responds with a plain text greeting.",
        `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func home(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Welcome to Go Web Development")
}

func main() {
    request := httptest.NewRequest(http.MethodGet, "/", nil)
    recorder := httptest.NewRecorder()
    home(recorder, request)
    fmt.Print(recorder.Body.String())
}`,
        challenge("Register a Home Route", "Create a handler that writes `hello from go` and register it at `/`.",
          `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func home(w http.ResponseWriter, r *http.Request) {
    // write the response
}

func main() {
    // register the root route
    _ = http.ListenAndServe
}`,
          `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func home(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "hello from go")
}

func main() {
    http.HandleFunc("/", home)
    _ = http.ListenAndServe
}`,
          [["Writes response", "fmt\\.Fprintln\\(w,\\s*\"hello from go\"\\)"], ["Registers root", "http\\.HandleFunc\\(\"/\",\\s*home\\)"]])),
      lesson("Web Foundations", ACCENT, "go-web-1", "Requests and Responses", 16,
        "A handler receives the request method, path, and headers through *http.Request. Set response headers before writing the body.",
        `package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

func inspect(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	fmt.Fprintf(w, "method=%s path=%s", r.Method, r.URL.Path)
}

func main() {
	request := httptest.NewRequest(http.MethodGet, "/inspect", nil)
	recorder := httptest.NewRecorder()
	inspect(recorder, request)
	fmt.Print(recorder.Body.String())
}`,
        challenge("Inspect a Request", "Set a plain-text content type and print the request method and path.",
          `package main

import (
    "fmt"
    "net/http"
)

func inspect(w http.ResponseWriter, r *http.Request) {
    // set the content type and print method/path
    _ = fmt.Fprintf
}

func main() { http.HandleFunc("/inspect", inspect) }`,
          `package main

import (
    "fmt"
    "net/http"
)

func inspect(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/plain")
    fmt.Fprintf(w, "%s %s", r.Method, r.URL.Path)
}

func main() { http.HandleFunc("/inspect", inspect) }`,
          [["Sets content type", "Header\\(\\)\\.Set\\(\"Content-Type\""], ["Uses method", "r\\.Method"], ["Uses path", "r\\.URL\\.Path"]])),
      lesson("Web Foundations", ACCENT, "go-web-2", "Status Codes", 17,
        "HTTP status codes communicate the result of a request. WriteHeader must be called before the response body.",
        `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func created(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusCreated)
    w.Write([]byte("created"))
}

func main() {
    request := httptest.NewRequest(http.MethodPost, "/items", nil)
    recorder := httptest.NewRecorder()
    created(recorder, request)
    fmt.Printf("status=%d body=%s", recorder.Code, recorder.Body.String())
}`,
        challenge("Return Created", "Respond from the `/items` handler with HTTP 201 and the body `created`.",
          `package main

import "net/http"

func created(w http.ResponseWriter, r *http.Request) {
    // send status and body
}

func main() { http.HandleFunc("/items", created) }`,
          `package main

import "net/http"

func created(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusCreated)
    w.Write([]byte("created"))
}

func main() { http.HandleFunc("/items", created) }`,
          [["Returns 201", "WriteHeader\\(http\\.StatusCreated\\)"], ["Writes body", "w\\.Write\\(\\[\\]byte\\(\"created\"\\)\\)"]])),
    ],
  },
  {
    id: "go-web-http",
    title: "HTTP Services",
    stage: "beginner",
    icon: "📡",
    color: "#22c55e",
    lessons: [
      lesson("HTTP Services", "#22c55e", "go-web-3", "Query Parameters", 17,
        "URL query values are available through r.URL.Query. Always provide a useful default when a client omits an optional value.",
        `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func greet(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    if name == "" { name = "developer" }
    fmt.Fprintf(w, "hello, %s", name)
}

func main() {
    request := httptest.NewRequest(http.MethodGet, "/greet?name=Gopher", nil)
    recorder := httptest.NewRecorder()
    greet(recorder, request)
    fmt.Print(recorder.Body.String())
}`,
        challenge("Read a Query Value", "Read the `name` query parameter and greet `developer` when it is empty.",
          `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func greet(w http.ResponseWriter, r *http.Request) {
    // read name and choose a default
    _ = fmt.Fprint
}

func main() { http.HandleFunc("/greet", greet) }`,
          `package main

import (
    "fmt"
    "net/http"
)

func greet(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    if name == "" { name = "developer" }
    fmt.Fprintf(w, "hello, %s", name)
}

func main() { http.HandleFunc("/greet", greet) }`,
          [["Reads query", "URL\\.Query\\(\\)\\.Get\\(\"name\"\\)"], ["Has default", "name = \"developer\""], ["Greets user", "fmt\\.Fprintf"]])),
      lesson("HTTP Services", "#22c55e", "go-web-4", "Path Routing", 18,
        "ServeMux matches URL patterns and keeps route registration explicit. A method check prevents a read endpoint from accepting writes accidentally.",
        `package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

func users(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	fmt.Fprintln(w, "user list")
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/users", users)

	// Simulate an HTTP request to /users
	req := httptest.NewRequest(http.MethodGet, "/users", nil)
	rec := httptest.NewRecorder()

	// Serve the request using your handler/router
	mux.ServeHTTP(rec, req)

	// Print the output captured by the recorder
	fmt.Print(rec.Body.String())
}`,
        challenge("Protect a GET Endpoint", "Only answer GET requests with `user list`; reject all other methods with status 405.",
          `package main

import (
    "fmt"
    "net/http"
)

func users(w http.ResponseWriter, r *http.Request) {
    // check the method, then write the list
    _ = fmt.Fprintln
}

func main() {
    request := httptest.NewRequest(http.MethodGet, "/users", nil)
    recorder := httptest.NewRecorder()
    users(recorder, request)
    fmt.Printf("status=%d body=%s", recorder.Code, recorder.Body.String())
}`,
          `package main

import (
    "fmt"
    "net/http"
)

func users(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
        return
    }
    fmt.Fprintln(w, "user list")
}

func main() { http.HandleFunc("/users", users) }`,
          [["Checks GET", "r\\.Method != http\\.MethodGet"], ["Returns 405", "http\\.StatusMethodNotAllowed"], ["Writes list", "user list"]])),
      lesson("HTTP Services", "#22c55e", "go-web-5", "ServeMux Composition", 19,
        "A custom ServeMux is easy to test and pass into an http.Server. Keeping route setup in a function makes a service simpler to grow.",
        `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func routes() *http.ServeMux {
    mux := http.NewServeMux()
    mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("ok"))
    })
    return mux
}

func main() {
    request := httptest.NewRequest(http.MethodGet, "/health", nil)
    recorder := httptest.NewRecorder()
    routes().ServeHTTP(recorder, request)
    fmt.Printf("status=%d body=%s", recorder.Code, recorder.Body.String())
}`,
        challenge("Build a Health Router", "Return a ServeMux with `/health` responding `ok`.",
          `package main

import "net/http"

func routes() *http.ServeMux {
    mux := http.NewServeMux()
    // register /health and return mux
    return mux
}

func main() { _ = routes() }`,
          `package main

import "net/http"

func routes() *http.ServeMux {
    mux := http.NewServeMux()
    mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("ok"))
    })
    return mux
}

func main() { _ = routes() }`,
          [["Registers health", "HandleFunc\\(\"/health\""], ["Returns mux", "return mux"], ["Returns ok", "\\[\\]byte\\(\"ok\"\\)"]])),
    ],
  },
  {
    id: "go-web-routing",
    title: "Routing and Handlers",
    stage: "intermediate",
    icon: "🧭",
    color: "#3b82f6",
    lessons: [
      lesson("Routing and Handlers", "#3b82f6", "go-web-6", "Path Values", 19,
        "Go 1.22 ServeMux patterns can name path values such as `/users/{id}`. Reading them in the handler avoids hand-written string slicing.",
        `package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

func user(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "user=%s", r.PathValue("id"))
}

func routes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /users/{id}", user)
	return mux
}

func main() {
	request := httptest.NewRequest(http.MethodGet, "/users/42", nil)
	recorder := httptest.NewRecorder()
	routes().ServeHTTP(recorder, request)
	fmt.Print(recorder.Body.String())
}`,
        challenge("Read a Named ID", "Register `GET /users/{id}` and print the named path value.",
          `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func user(w http.ResponseWriter, r *http.Request) {
    // print the id path value
    _ = fmt.Fprintf
}

func main() {
    mux := http.NewServeMux()
    // register the method-aware route
    _ = mux
}`,
          `package main

import (
    "fmt"
    "net/http"
)

func user(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "user=%s", r.PathValue("id"))
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /users/{id}", user)
    _ = mux
}`,
          [["Reads path value", "r\\.PathValue\\(\"id\"\\)"], ["Uses GET pattern", "HandleFunc\\(\"GET /users/\\{id\\}"], ["Formats response", "fmt\\.Fprintf"]])),
      lesson("Routing and Handlers", "#3b82f6", "go-web-7", "Handler Functions", 20,
        "Handlers can be small functions that delegate to application logic. Returning errors from that logic keeps HTTP response decisions in one place.",
        `package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

func findProduct(id string) (string, error) {
	if id != "42" {
		return "", fmt.Errorf("product not found")
	}
	return "keyboard", nil
}

func product(w http.ResponseWriter, r *http.Request) {
	name, err := findProduct(r.PathValue("id"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	fmt.Fprintln(w, name)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/products/{id}", product)
	request := httptest.NewRequest(http.MethodGet, "/products/42", nil)
	recorder := httptest.NewRecorder()
	mux.ServeHTTP(recorder, request)
	fmt.Printf("status=%d body=%s", recorder.Code, recorder.Body.String())
}`,
        challenge("Handle a Missing Product", "Call `findProduct`, return 404 on error, and print the product name on success.",
          `package main

import (
    "fmt"
    "net/http"
)

func findProduct(id string) (string, error) { return "keyboard", nil }

func product(w http.ResponseWriter, r *http.Request) {
    // handle the returned error and write the name
    _ = fmt.Fprintln
}

func main() { http.HandleFunc("/products/{id}", product) }`,
          `package main

import (
    "fmt"
    "net/http"
)

func findProduct(id string) (string, error) { return "keyboard", nil }

func product(w http.ResponseWriter, r *http.Request) {
    name, err := findProduct(r.PathValue("id"))
    if err != nil { http.Error(w, err.Error(), http.StatusNotFound); return }
    fmt.Fprintln(w, name)
}

func main() { http.HandleFunc("/products/{id}", product) }`,
          [["Handles error", "if err != nil"], ["Returns 404", "http\\.StatusNotFound"], ["Writes name", "fmt\\.Fprintln\\(w, name\\)"]])),
      lesson("Routing and Handlers", "#3b82f6", "go-web-8", "HTTP Server Timeouts", 21,
        "An http.Server should set timeouts so slow clients cannot hold resources forever. ReadHeaderTimeout is especially useful for protecting request parsing.",
        `package main

import (
    "fmt"
    "net/http"
    "time"
)

func newServer(handler http.Handler) *http.Server {
    return &http.Server{
        Addr: ":8080", Handler: handler,
        ReadHeaderTimeout: 5 * time.Second,
        IdleTimeout: 60 * time.Second,
    }
}

func main() {
    server := newServer(http.DefaultServeMux)
    fmt.Printf("addr=%s read-header-timeout=%s", server.Addr, server.ReadHeaderTimeout)
}`,
        challenge("Configure a Server", "Return an HTTP server on port 8080 with a 5 second read-header timeout.",
          `package main

import (
    "net/http"
    "time"
)

func newServer(handler http.Handler) *http.Server {
    // configure address, handler, and timeout
    return nil
}

func main() { _ = newServer(http.DefaultServeMux) }`,
          `package main

import (
    "net/http"
    "time"
)

func newServer(handler http.Handler) *http.Server {
    return &http.Server{Addr: ":8080", Handler: handler, ReadHeaderTimeout: 5 * time.Second}
}

func main() { _ = newServer(http.DefaultServeMux) }`,
          [["Sets address", "Addr:\\s*\":8080\""], ["Uses handler", "Handler:\\s*handler"], ["Sets timeout", "ReadHeaderTimeout:\\s*5 \\* time\\.Second"]])),
    ],
  },
  {
    id: "go-web-json",
    title: "JSON APIs",
    stage: "intermediate",
    icon: "{}",
    color: "#3b82f6",
    lessons: [
      lesson("JSON APIs", "#3b82f6", "go-web-9", "Encoding JSON", 20,
        "The encoding/json package turns exported struct fields into JSON. json.NewEncoder writes directly to an HTTP response stream.",
        `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/http/httptest"
)

type Product struct { ID int \`json:"id"\`; Name string \`json:"name"\` }

func product(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(Product{ID: 1, Name: "keyboard"})
}

func main() {
    request := httptest.NewRequest(http.MethodGet, "/product", nil)
    recorder := httptest.NewRecorder()
    product(recorder, request)
    fmt.Print(recorder.Body.String())
}`,
        challenge("Return a JSON Product", "Set the JSON content type and encode a product with ID 1 and name `keyboard`.",
          `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/http/httptest"
    "strings"
)

type Product struct { ID int \`json:"id"\`; Name string \`json:"name"\` }

func product(w http.ResponseWriter, r *http.Request) {
    // set the header and encode a Product
    _ = json.NewEncoder
}

func main() { http.HandleFunc("/product", product) }`,
          `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/http/httptest"
    "strings"
)

type Product struct { ID int \`json:"id"\`; Name string \`json:"name"\` }

func product(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(Product{ID: 1, Name: "keyboard"})
}

func main() { http.HandleFunc("/product", product) }`,
          [["Sets JSON type", "Content-Type\",\\s*\"application/json\""], ["Encodes product", "json\\.NewEncoder\\(w\\)\\.Encode"], ["Uses ID", "ID:\\s*1"]])),
      lesson("JSON APIs", "#3b82f6", "go-web-10", "Decoding JSON", 21,
        "Decode a request body into a struct and validate it before using the data. Always close or let the server manage the request body lifecycle.",
        `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
)

type Message struct {
	Text string
}

func create(w http.ResponseWriter, r *http.Request) {
	var message Message

	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(message)
}

func main() {
	request := httptest.NewRequest(
		http.MethodPost,
		"/messages",
		strings.NewReader("{\\"Text\\":\\"hello\\"}"),
	)

	recorder := httptest.NewRecorder()

	create(recorder, request)

	fmt.Printf("status=%d body=%s", recorder.Code, recorder.Body.String())
}`,
        challenge("Decode a Message", "Decode the request body, return 400 for invalid JSON, and echo a valid message with status 201.",
          `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/http/httptest"
)

type Message struct { Text string \`json:"text"\` }

func create(w http.ResponseWriter, r *http.Request) {
    var message Message
    // decode, handle an error, then echo with status 201
    _ = json.NewDecoder
}

func main() { http.HandleFunc("/messages", create) }`,
          `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/http/httptest"
)

type Message struct { Text string \`json:"text"\` }

func create(w http.ResponseWriter, r *http.Request) {
    var message Message
    if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
        http.Error(w, "invalid JSON", http.StatusBadRequest); return
    }
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(message)
}

func main() { http.HandleFunc("/messages", create) }`,
          [["Decodes body", "json\\.NewDecoder\\(r\\.Body\\)\\.Decode"], ["Returns bad request", "http\\.StatusBadRequest"], ["Returns created", "http\\.StatusCreated"]])),
      lesson("JSON APIs", "#3b82f6", "go-web-11", "API Error Shapes", 22,
        "Consistent JSON error objects make APIs easier for clients to consume. A small helper centralizes the content type and status handling.",
        `package main

import (
    "encoding/json"
        "fmt"
    "net/http"
        "net/http/httptest"
)

func writeError(w http.ResponseWriter, status int, message string) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(map[string]string{"error": message})
}

func main() {
    recorder := httptest.NewRecorder()
    writeError(recorder, http.StatusBadRequest, "missing name")
    fmt.Printf("status=%d body=%s", recorder.Code, recorder.Body.String())
}`,
        challenge("Write a JSON Error", "Implement a helper that sends an application/json error object with the supplied status and message.",
          `package main

import (
    "encoding/json"
    "net/http"
)

func writeError(w http.ResponseWriter, status int, message string) {
    // set content type, status, and encode an error field
    _ = json.NewEncoder
}

func main() { _ = http.StatusBadRequest }`,
          `package main

import (
    "encoding/json"
    "net/http"
)

func writeError(w http.ResponseWriter, status int, message string) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(map[string]string{"error": message})
}

func main() { _ = http.StatusBadRequest }`,
          [["Sets JSON type", "application/json"], ["Uses status", "w\\.WriteHeader\\(status\\)"], ["Encodes error", "map\\[string\\]string\\{\"error\": message\\}"]])),
    ],
  },
  {
    id: "go-web-middleware",
    title: "Middleware and Security",
    stage: "pro",
    icon: "🛡️",
    color: "#f59e0b",
    lessons: [
      lesson("Middleware and Security", "#f59e0b", "go-web-12", "Logging Middleware", 22,
        "Middleware wraps a handler to add behavior around every request. Logging the method and path gives useful operational context.",
        `package main

import (
    "fmt"
    "log"
    "net/http"
    "net/http/httptest"
)

func logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

func main() {
    next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "handled") })
    request := httptest.NewRequest(http.MethodGet, "/health", nil)
    recorder := httptest.NewRecorder()
    logging(next).ServeHTTP(recorder, request)
    fmt.Print(recorder.Body.String())
}`,
        challenge("Wrap a Handler", "Return middleware that logs the method and path before calling the next handler.",
          `package main

import (
    "log"
    "net/http"
)

func logging(next http.Handler) http.Handler {
    // return a handler that logs then delegates
    return nil
}

func main() { _ = logging(http.DefaultServeMux) }`,
          `package main

import (
    "log"
    "net/http"
)

func logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

func main() { _ = logging(http.DefaultServeMux) }`,
          [["Creates handler", "http\\.HandlerFunc"], ["Logs request", "log\\.Printf"], ["Delegates", "next\\.ServeHTTP"]])),
      lesson("Middleware and Security", "#f59e0b", "go-web-13", "Request IDs", 23,
        "A request ID lets logs and downstream services correlate one request. Middleware can reuse a client-provided ID or create a simple server-side one.",
        `package main

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
)

type contextKey string

const requestIDKey contextKey = "requestID"

func requestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := r.Header.Get("X-Request-ID")
		if id == "" {
			id = "generated"
		}

		// 1. Set response header
		w.Header().Set("X-Request-ID", id)

		// 2. Attach ID to request context so downstream handlers can access it
		ctx := context.WithValue(r.Context(), requestIDKey, id)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func main() {
	request := httptest.NewRequest(http.MethodGet, "/", nil)
	recorder := httptest.NewRecorder()

	next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Retrieve request ID from context
		id, _ := r.Context().Value(requestIDKey).(string)
		fmt.Fprint(w, id)
	})

	requestID(next).ServeHTTP(recorder, request)

	// Outputs: generated
	fmt.Print(recorder.Body.String())
}`,
        challenge("Propagate a Request ID", "Read `X-Request-ID`, use `generated` when absent, set it on the response, and delegate.",
          `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func requestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // read or create an id, set it, then delegate
        _ = next
    })
}

func main() { _ = requestID }`,
          `package main

import "net/http"

func requestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := r.Header.Get("X-Request-ID")
        if id == "" { id = "generated" }
        w.Header().Set("X-Request-ID", id)
        next.ServeHTTP(w, r)
    })
}

func main() { _ = requestID }`,
          [["Reads ID", "Header\\.Get\\(\"X-Request-ID\"\\)"], ["Sets ID", "Header\\(\\)\\.Set\\(\"X-Request-ID\""], ["Delegates", "next\\.ServeHTTP"]])),
      lesson("Middleware and Security", "#f59e0b", "go-web-14", "CORS Basics", 24,
        "CORS is a browser policy. A server should explicitly allow only the origins it intends to serve, and handle OPTIONS preflight requests.",
        `package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "https://example.com")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	request := httptest.NewRequest(http.MethodOptions, "/", nil)
	recorder := httptest.NewRecorder()

	cors(http.DefaultServeMux).ServeHTTP(recorder, request)

	fmt.Printf("status=%d allow-origin=%s", recorder.Code, recorder.Header().Get("Access-Control-Allow-Origin"))
}`,
        challenge("Handle CORS Preflight", "Allow the example origin, declare GET and POST, and return 204 for OPTIONS.",
          `package main

import "net/http"

func cors(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // set CORS headers and handle OPTIONS
        _ = next
    })
}

func main() { _ = cors(http.DefaultServeMux) }`,
          `package main

import "net/http"

func cors(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "https://example.com")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        if r.Method == http.MethodOptions { w.WriteHeader(http.StatusNoContent); return }
        next.ServeHTTP(w, r)
    })
}

func main() { _ = cors(http.DefaultServeMux) }`,
          [["Allows origin", "Access-Control-Allow-Origin"], ["Allows methods", "Access-Control-Allow-Methods"], ["Handles OPTIONS", "http\\.MethodOptions"]])),
    ],
  },
  {
    id: "go-web-data",
    title: "Data and Persistence",
    stage: "pro",
    icon: "🗃️",
    color: "#f59e0b",
    lessons: [
      lesson("Data and Persistence", "#f59e0b", "go-web-15", "In-Memory Repositories", 24,
        "A repository interface separates HTTP handlers from storage. An in-memory implementation is fast and useful for tests and prototypes.",
        `package main

    import (
        "fmt"
        "sync"
    )

type Store struct { mu sync.RWMutex; values map[string]string }

func (s *Store) Get(key string) (string, bool) {
    s.mu.RLock(); defer s.mu.RUnlock()
    value, ok := s.values[key]
    return value, ok
}

func main() {
    store := Store{values: map[string]string{}}
    store.values["language"] = "Go"
    value, ok := store.Get("language")
    fmt.Printf("found=%t value=%s", ok, value)
}`,
        challenge("Make a Safe Store", "Implement a mutex-protected `Put` method for the in-memory store.",
          `package main

import "sync"

type Store struct { mu sync.RWMutex; values map[string]string }

func (s *Store) Put(key, value string) {
    // lock for writing and store the value
}

func main() { _ = Store{values: map[string]string{}} }`,
          `package main

import "sync"

type Store struct { mu sync.RWMutex; values map[string]string }

func (s *Store) Put(key, value string) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.values[key] = value
}

func main() { _ = Store{values: map[string]string{}} }`,
          [["Locks store", "s\\.mu\\.Lock\\(\\)"], ["Unlocks store", "defer s\\.mu\\.Unlock\\(\\)"], ["Stores value", "s\\.values\\[key\\] = value"]])),
      lesson("Data and Persistence", "#f59e0b", "go-web-16", "Database Boundaries", 25,
        "Handlers should depend on an interface rather than a concrete database driver. This keeps business logic testable and lets storage evolve independently.",
        `package main

import "fmt"

type User struct {
	Name string
}

type UserRepository interface {
	FindByID(id string) (User, error)
}

type UserService struct {
	users UserRepository
}

func main() {
	service := UserService{}
	
	// Outputs: repository-injected=false
	fmt.Printf("repository-injected=%t", service.users != nil)
}`,
        challenge("Define a Repository", "Create a `UserRepository` interface with `FindByID` returning a User and error, then inject it into UserService.",
          `package main

type User struct { Name string }

// define the repository and service dependency
func main() {}`,
          `package main

type User struct { Name string }

type UserRepository interface {
    FindByID(id string) (User, error)
}

type UserService struct { users UserRepository }

func main() { _ = UserService{} }`,
          [["Declares interface", "type UserRepository interface"], ["Finds user", "FindByID\\(id string\\)"], ["Injects dependency", "users UserRepository"]])),
      lesson("Data and Persistence", "#f59e0b", "go-web-17", "Transactions and Errors", 26,
        "Persistence code should return errors and let the service decide whether an HTTP request succeeds. Wrapping errors with context keeps failures diagnosable.",
        `package main

import "fmt"

func saveUser(name string) error {
    if name == "" { return fmt.Errorf("name is required") }
    return nil
}

func main() {
    err := saveUser("Ada")
    fmt.Printf("saved=%t", err == nil)
}`,
        challenge("Validate Before Saving", "Return an error when the name is empty and call `saveUser` from main with a valid name.",
          `package main

import "fmt"

func saveUser(name string) error {
    // validate name and return an error when empty
    return nil
}

func main() { _ = saveUser("") ; _ = fmt.Println }`,
          `package main

import "fmt"

func saveUser(name string) error {
    if name == "" { return fmt.Errorf("name is required") }
    return nil
}

func main() { _ = saveUser("Ada") }`,
          [["Validates empty", "name == \"\""], ["Returns error", "fmt\\.Errorf\\(\"name is required\"\\)"], ["Returns nil", "return nil"]])),
    ],
  },
  {
    id: "go-web-production",
    title: "Production APIs",
    stage: "advanced",
    icon: "🚀",
    color: "#8b5cf6",
    lessons: [
      lesson("Production APIs", "#8b5cf6", "go-web-18", "Graceful Shutdown", 26,
        "A production service should stop accepting new requests, finish active work, and then exit. signal.NotifyContext gives shutdown a clear cancellation path.",
        `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

func shutdown(server *http.Server) error {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    return server.Shutdown(ctx)
}

func main() {
    err := shutdown(&http.Server{})
    fmt.Printf("shutdown-error=%t", err != nil)
}`,
        challenge("Shut Down with a Timeout", "Create a 5 second context and call `server.Shutdown(ctx)` from a shutdown helper.",
          `package main

import (
    "context"
    "net/http"
    "time"
)

func shutdown(server *http.Server) error {
    // create a timeout context and shut down the server
    return nil
}

func main() { _ = shutdown }`,
          `package main

import (
    "context"
    "net/http"
    "time"
)

func shutdown(server *http.Server) error {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    return server.Shutdown(ctx)
}

func main() { _ = shutdown }`,
          [["Creates timeout", "context\\.WithTimeout"], ["Uses five seconds", "5\\*time\\.Second"], ["Shuts down", "server\\.Shutdown\\(ctx\\)"]])),
      lesson("Production APIs", "#8b5cf6", "go-web-19", "Testing Handlers", 27,
        "httptest.NewRecorder and httptest.NewRequest let you test a handler without opening a network port. Assert status and body in ordinary Go tests.",
        `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func hello(w http.ResponseWriter, r *http.Request) { fmt.Fprintln(w, "hello") }

func main() {
    request := httptest.NewRequest(http.MethodGet, "/", nil)
    recorder := httptest.NewRecorder()
    hello(recorder, request)
    fmt.Println(recorder.Code)
}`,
        challenge("Exercise a Handler", "Create a GET request and recorder, call `hello`, and print the resulting status code.",
          `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func hello(w http.ResponseWriter, r *http.Request) { fmt.Fprintln(w, "hello") }

func main() {
    // create a request and recorder, call hello, print status
}`, 
          `package main

import (
    "fmt"
    "net/http"
    "net/http/httptest"
)

func hello(w http.ResponseWriter, r *http.Request) { fmt.Fprintln(w, "hello") }

func main() {
    request := httptest.NewRequest(http.MethodGet, "/", nil)
    recorder := httptest.NewRecorder()
    hello(recorder, request)
    fmt.Println(recorder.Code)
}`,
          [["Creates request", "httptest\\.NewRequest"], ["Creates recorder", "httptest\\.NewRecorder"], ["Calls handler", "hello\\(recorder, request\\)"]])),
      lesson("Production APIs", "#8b5cf6", "go-web-20", "Observability", 28,
        "Structured logs and health endpoints make a service operable. Keep health checks cheap and use context-aware work for dependencies.",
        `package main

import (
    "fmt"
    "log/slog"
    "net/http"
    "net/http/httptest"
)

func health(w http.ResponseWriter, r *http.Request) { w.Write([]byte("ok")) }

func main() {
    slog.Info("server starting", "addr", ":8080")
    request := httptest.NewRequest(http.MethodGet, "/health", nil)
    recorder := httptest.NewRecorder()
    health(recorder, request)
    fmt.Printf("status=%d body=%s", recorder.Code, recorder.Body.String())
}`,
        challenge("Add a Health Check", "Create a health handler that returns `ok` and log a structured server-start message.",
          `package main

import (
    "log/slog"
    "net/http"
)

func health(w http.ResponseWriter, r *http.Request) {
    // write a cheap health response
}

func main() {
    // log that the server is starting and register health
}`, 
          `package main

import (
    "log/slog"
    "net/http"
)

func health(w http.ResponseWriter, r *http.Request) { w.Write([]byte("ok")) }

func main() {
    slog.Info("server starting", "addr", ":8080")
    http.HandleFunc("/health", health)
}`,
          [["Writes health", "w\\.Write\\(\\[\\]byte\\(\"ok\"\\)\\)"], ["Uses structured log", "slog\\.Info"], ["Registers health", "HandleFunc\\(\"/health\"" ]])),
    ],
  },
];

export const GO_WEB_DEVELOPMENT_LESSONS = GO_WEB_DEVELOPMENT_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((item) => ({
    ...item,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  })),
);

export const GO_WEB_DEVELOPMENT_TOTAL_XP = GO_WEB_DEVELOPMENT_LESSONS.reduce(
  (sum, item) => sum + item.xp,
  0,
);
