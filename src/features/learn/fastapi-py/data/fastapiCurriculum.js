import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { FASTAPI_VIDEO_LINKS } from "./fastapiVideoLinks";
import { FASTAPI_LESSON_OUTCOMES } from "./fastapiLessonOutcomes";

export const FASTAPI_CHAPTERS = [
  {
    id: "intro",
    title: "API Foundations",
    icon: "🌐",
    color: "#009688",
    lessons: [
      {
        id: "fastapi-0",
        title: "Why APIs Exist",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Before APIs, every app had to build **everything itself** — user accounts, payments, maps, weather. That is slow, expensive, and hard to maintain. Modern software is built from **specialized services** that talk to each other. APIs are the language those services use.",
          },
          {
            type: "scenario",
            title: "The problem without APIs",
            content:
              "Imagine a food delivery startup that stores restaurant data inside its mobile app code. Every menu change requires an app update. A competitor launches new restaurants daily while your team is still waiting for App Store approval. **The problem:** data and logic are trapped inside one program instead of being shared safely.",
          },
          {
            type: "text",
            content:
              "An **API** (Application Programming Interface) is a **set of rules** that lets one program ask another program for data or actions. Think of it as a restaurant menu with a kitchen behind it: the menu lists what you can order (endpoints), the kitchen prepares it (server logic), and the waiter brings it back (response).",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**What problem does an API solve?** It separates the **client** (what users see) from the **server** (where data and business rules live). Multiple clients — mobile app, website, partner integrations — can all use the same API without duplicating logic.",
          },
          {
            type: "scenario",
            title: "Real-world examples",
            content:
              "**Food delivery app:** `GET /restaurants` returns nearby restaurants. **Login system:** `POST /login` sends email + password, server returns a token. **Weather app:** `GET /weather?city=Karachi` returns temperature and forecast. In every case the client sends a **request**, the server runs logic, and sends back a **response** — usually as JSON.",
          },
          {
            type: "table",
            title: "Client vs server — roles and responsibilities",
            columns: ["Role", "What it is", "Responsibilities", "Example"],
            rows: [
              { label: "Client", values: ["Client","The app or browser users interact with","Send requests, show UI, handle user input","Mobile food app on your phone"] },
              { label: "Server", values: ["Server","A remote program that serves data and logic","Authenticate users, validate input, query database","Python API running on a cloud machine"] },
              { label: "API", values: ["API","The agreed contract between them","Define URLs, HTTP methods, request/response format","GET /restaurants returns JSON list"] },
              { label: "Database", values: ["Database","Persistent storage behind the server","Store and retrieve records safely","PostgreSQL with restaurant rows"] },
            ],
          },
          {
            type: "diagram",
            title: "Client → API → server → database architecture",
            nodes: [
              {
                id: "client",
                label: "Client",
                color: "#009688",
                items: ["Mobile / web / desktop", "Sends HTTP requests", "Renders JSON responses"],
              },
              {
                id: "api",
                label: "API layer",
                color: "#26a69a",
                items: ["Routes like /restaurants", "HTTP methods (GET, POST…)", "Request & response rules"],
              },
              {
                id: "server",
                label: "Server logic",
                color: "#4db6ac",
                items: ["Business rules", "Authentication", "Validation"],
              },
              {
                id: "db",
                label: "Database",
                color: "#80cbc4",
                items: ["Stores users, orders, menus", "Returns query results", "Keeps data persistent"],
              },
            ],
          },
          {
            type: "text",
            content:
              "**How does a request travel?** When you tap a button in an app, the client builds an HTTP request (URL + method + optional body), sends it over the internet to the API server, the server runs business logic, may read or write the database, then packages the result as a response — typically JSON with a status code like `200 OK`.",
          },
          {
            type: "scenario",
            title: "Request–response lifecycle: View Restaurants",
            content:
              "1. User taps **View Restaurants** in the food app. 2. The mobile **client** sends `GET /restaurants?city=Lahore`. 3. The **API server** receives the request and matches the route. 4. **Business logic** runs — filter by city, check opening hours. 5. The server queries the **database** for matching rows. 6. Results are converted to JSON and sent back with status `200`. 7. The app renders restaurant cards on screen.",
          },
          {
            type: "diagram",
            title: "Step-by-step request lifecycle",
            nodes: [
              {
                id: "step1",
                label: "1. User action",
                color: "#009688",
                items: ["Tap View Restaurants", "Client builds request"],
              },
              {
                id: "step2",
                label: "2. Request sent",
                color: "#26a69a",
                items: ["GET /restaurants", "Over HTTP to server"],
              },
              {
                id: "step3",
                label: "3. API receives",
                color: "#4db6ac",
                items: ["Route matched", "Headers parsed"],
              },
              {
                id: "step4",
                label: "4. Business logic",
                color: "#80cbc4",
                items: ["Validate city param", "Apply filters"],
              },
              {
                id: "step5",
                label: "5. Database query",
                color: "#b2dfdb",
                items: ["SELECT restaurants", "Return rows"],
              },
              {
                id: "step6",
                label: "6. JSON response",
                color: "#009688",
                items: ["200 OK", "Client displays data"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "What an API response looks like in Python",
            content: `restaurant = {
    "id": 1,
    "name": "Spice Hub",
    "open": True
}
print(restaurant["name"])`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "You can now explain **why** APIs exist, what problem they solve, and trace a request from the user tap through the server and database back to the screen.",
          },
          {
            type: "quiz",
            question: "What problem do APIs mainly solve?",
            options: [
              "Making mobile screens brighter",
              "Letting separate programs share data and actions safely",
              "Replacing databases with spreadsheets",
              "Compiling Python to machine code",
            ],
            answer: 1,
            explanation:
              "APIs let clients and servers communicate with agreed rules so logic and data are not trapped in one app.",
          },
        ],
        challenge: {
          title: "Model an API response object",
          description:
            "Create a dictionary `restaurant` with keys `id` (number), `name` (string), and `open` (boolean). Print `restaurant['name']`.",
          starterCode: `# Create restaurant dict and print its name
`,
          solutionCode: `restaurant = {
    "id": 1,
    "name": "Spice Hub",
    "open": True
}
print(restaurant["name"])`,
          tests: [
            {
              id: 1,
              label: "Creates restaurant dictionary",
              keywords: [{ pattern: "restaurant\\s*=\\s*\\{" }],
            },
            {
              id: 2,
              label: "Contains name key",
              keywords: [{ pattern: '"name"|\'name\'' }],
            },
            {
              id: 3,
              label: "Prints restaurant name",
              keywords: [{ pattern: 'print\\s*\\(\\s*restaurant\\s*\\[\\s*"name"\\s*\\]' }],
            },
          ],
        },
      },
      {
        id: "fastapi-1",
        title: "HTTP Methods & CRUD",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "HTTP is the **transport protocol** the web uses to move requests and responses. The **HTTP method** (also called verb) tells the server **what kind of action** the client wants — read data, create something new, update, or delete. Without methods, every URL would mean the same thing and APIs would be ambiguous.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Why do different methods exist?** Real apps need four core operations on data: **Create, Read, Update, Delete** (CRUD). HTTP methods map cleanly to those actions so both client and server agree on intent before any code runs.",
          },
          {
            type: "scenario",
            title: "Food delivery app — methods in action",
            content:
              "**GET** `/restaurants` — browse nearby restaurants (read). **POST** `/orders` — place a new order (create). **PUT** `/profile` — update your delivery address (update). **DELETE** `/cart/items/3` — remove an item from cart (delete). Same base URL patterns, different **methods** = different actions.",
          },
          {
            type: "table",
            title: "HTTP methods, CRUD, and when to use them",
            columns: ["Method", "CRUD", "Purpose", "Example", "Typical status"],
            rows: [
              { label: "GET", values: ["GET","Read","Fetch data without changing it","GET /restaurants","200"] },
              { label: "POST", values: ["POST","Create","Add a new resource","POST /orders","201"] },
              { label: "PUT", values: ["PUT","Update","Replace or update a resource","PUT /profile","200"] },
              { label: "DELETE", values: ["DELETE","Delete","Remove a resource","DELETE /cart/items/3","204 or 200"] },
            ],
          },
          {
            type: "diagram",
            title: "CRUD → HTTP method mapping",
            nodes: [
              {
                id: "c",
                label: "Create",
                color: "#009688",
                items: ["POST", "Adds new record", "POST /students"],
              },
              {
                id: "r",
                label: "Read",
                color: "#26a69a",
                items: ["GET", "Fetches existing data", "GET /students"],
              },
              {
                id: "u",
                label: "Update",
                color: "#4db6ac",
                items: ["PUT / PATCH", "Changes existing record", "PUT /students/7"],
              },
              {
                id: "d",
                label: "Delete",
                color: "#80cbc4",
                items: ["DELETE", "Removes record", "DELETE /students/7"],
              },
            ],
          },
          {
            type: "scenario",
            title: "School management API",
            content:
              "A school portal uses `GET /students` to list students, `POST /students` to enroll a new student, `PUT /students/7` to update student 7's details, and `DELETE /students/7` to remove a record. The URL often stays similar — the **method** changes the behavior.",
          },
          {
            type: "scenario",
            title: "Login system example",
            content:
              "`POST /login` sends credentials in the request body (create a session). `GET /me` reads the current user profile (read). `PUT /me/password` updates the password (update). `DELETE /sessions` logs out everywhere (delete). Choosing the wrong method — like using GET for login — can expose sensitive data in URLs.",
          },
          {
            type: "code",
            lang: "python",
            label: "Mapping CRUD actions to method names",
            content: `method_map = {
    "create": "POST",
    "read": "GET",
    "update": "PUT",
    "delete": "DELETE"
}
print(method_map["read"])
print(method_map["create"])`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "You can now match real-world actions to the right HTTP method and explain the CRUD relationship — the foundation every REST API builds on.",
          },
          {
            type: "quiz",
            question: "A user submits a form to place a new food order. Which HTTP method fits best?",
            options: ["GET", "POST", "PUT", "DELETE"],
            answer: 1,
            explanation: "POST is the standard method for creating new resources like orders.",
          },
        ],
        challenge: {
          title: "Method map dictionary",
          description:
            "Create a dict called `method_map` where keys are `create`, `read`, `update`, `delete` and values are HTTP methods. Print `method_map['create']` and `method_map['delete']`.",
          starterCode: `# Build method_map dictionary and print two values
`,
          solutionCode: `method_map = {
    "create": "POST",
    "read": "GET",
    "update": "PUT",
    "delete": "DELETE"
}
print(method_map["create"])
print(method_map["delete"])`,
          tests: [
            {
              id: 1,
              label: "Creates method_map",
              keywords: [{ pattern: "method_map\\s*=\\s*\\{" }],
            },
            {
              id: 2,
              label: "Contains POST",
              keywords: [{ pattern: '"POST"|\'POST\'' }],
            },
            {
              id: 3,
              label: "Contains DELETE",
              keywords: [{ pattern: '"DELETE"|\'DELETE\'' }],
            },
            {
              id: 4,
              label: "Prints map values",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fastapi-2",
        title: "JSON & Serialization",
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              "**JSON** (JavaScript Object Notation) is the **lingua franca of APIs**. It is text-based, human-readable, and supported by every major language and mobile platform. When a FastAPI route returns a Python dictionary, the framework converts it to JSON before sending it over HTTP.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Why do APIs use JSON?** HTTP carries **text** across the network — not Python objects, Java classes, or database rows. JSON is a universal text format both sides can parse. It is lighter than XML and easier to read than binary formats.",
          },
          {
            type: "text",
            content:
              "**Why can't Python objects travel directly over HTTP?** A Python `dict` or `list` lives in your server's memory with Python-specific types (`True`, `None`, single-quoted strings). The client's phone or browser does not understand Python — it needs a **serialized** string it can parse into its own data structures.",
          },
          {
            type: "diagram",
            title: "Serialization: Python → JSON → client",
            nodes: [
              {
                id: "py",
                label: "Python object",
                color: "#009688",
                items: ["dict, list, bool", "Native types", 'e.g. {"open": True}'],
              },
              {
                id: "dump",
                label: "Serialize (json.dumps)",
                color: "#26a69a",
                items: ["Convert to JSON text", "True → true", "None → null"],
              },
              {
                id: "wire",
                label: "HTTP response body",
                color: "#4db6ac",
                items: ['Text over network', '{"open": true}', "Client receives string"],
              },
              {
                id: "client",
                label: "Client parses JSON",
                color: "#80cbc4",
                items: ["JavaScript object", "Swift struct", "Rendered in UI"],
              },
            ],
          },
          {
            type: "diagram",
            title: "Deserialization: client → JSON → Python",
            nodes: [
              {
                id: "client-send",
                label: "Client sends JSON",
                color: "#009688",
                items: ["POST body", '{"title": "Pizza"}', "Text in request"],
              },
              {
                id: "receive",
                label: "Server receives text",
                color: "#26a69a",
                items: ["Raw JSON string", "Not yet a Python dict"],
              },
              {
                id: "load",
                label: "Deserialize (json.loads)",
                color: "#4db6ac",
                items: ["Parse string to dict", "true → True", "null → None"],
              },
              {
                id: "py-use",
                label: "Python business logic",
                color: "#80cbc4",
                items: ["Validate fields", "Save to database", "Return response dict"],
              },
            ],
          },
          {
            type: "table",
            title: "Python vs JSON values",
            columns: ["Python", "JSON", "Notes"],
            rows: [
              { label: "True", values: ["True","true","JSON booleans are lowercase"] },
              { label: "False", values: ["False","false","Same rule as True"] },
              { label: "None", values: ["None","null","JSON uses null for no value"] },
              { label: "'text'", values: ["'text' or \"text\"","\"text\"","JSON strings always use double quotes"] },
              { label: "42", values: ["42","42","Numbers work the same"] },
            ],
          },
          {
            type: "scenario",
            title: "Library books API",
            content:
              "Your route builds `books = [{'id': 1, 'title': 'FastAPI Guide'}]` in Python. FastAPI serializes it to `[{\"id\": 1, \"title\": \"FastAPI Guide\"}]` for the client. When a user submits a new book via POST, the client sends JSON text and FastAPI deserializes it back into a Python model you can validate and store.",
          },
          {
            type: "code",
            lang: "python",
            label: "json.dumps (serialize) and json.loads (deserialize)",
            content: `import json

payload = {"book": "Python 101", "available": True}
text = json.dumps(payload)       # Python → JSON string
back = json.loads(text)            # JSON string → Python
print(text)                        # {"book": "Python 101", "available": true}
print(back["book"])                # Python 101`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "You understand **why** JSON is used, **why** serialization is required, and can trace data in both directions: Python Object → JSON → Client and Client JSON → Python Object.",
          },
          {
            type: "quiz",
            question: "Why must a Python dict be converted before sending over HTTP?",
            options: [
              "Python dicts are too large for memory",
              "HTTP carries text; clients cannot read raw Python objects",
              "JSON is required by law for all websites",
              "Databases only accept JSON files",
            ],
            answer: 1,
            explanation:
              "The network transports text. Serialization converts Python objects into a universal text format clients can parse.",
          },
        ],
        challenge: {
          title: "Serialize and parse a payload",
          description:
            "Create `data = {'course':'FastAPI','level':'beginner'}`. Convert it to JSON text with `json.dumps`, print it, then parse back with `json.loads` and print `obj['course']`.",
          starterCode: `import json

# Create data, convert to JSON, parse back, print results
`,
          solutionCode: `import json

data = {"course": "FastAPI", "level": "beginner"}
text = json.dumps(data)
print(text)
obj = json.loads(text)
print(obj["course"])`,
          tests: [
            {
              id: 1,
              label: "Imports json",
              keywords: [{ pattern: "import\\s+json" }],
            },
            {
              id: 2,
              label: "Uses json.dumps",
              keywords: [{ pattern: "json\\.dumps\\s*\\(" }],
            },
            {
              id: 3,
              label: "Uses json.loads",
              keywords: [{ pattern: "json\\.loads\\s*\\(" }],
            },
            {
              id: 4,
              label: "Prints parsed field",
              keywords: [{ pattern: 'obj\\s*\\[\\s*"course"\\s*\\]' }],
            },
          ],
        },
      },
      {
        id: "fastapi-3",
        title: "Introduction to FastAPI",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "You now understand APIs, HTTP, and JSON. Next question: **how do you actually build an API in Python?** You could write raw HTTP handling yourself — parsing URLs, reading headers, formatting responses — but that is repetitive and error-prone. That is where a **framework** comes in.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "A **framework** is a toolkit that handles common plumbing so you focus on **your business logic**. Like building a house: you could forge every nail, or use proven materials and blueprints. Frameworks give you routing, request parsing, validation, and documentation out of the box.",
          },
          {
            type: "text",
            content:
              "**Why not pure Python?** Without a framework you would manually read HTTP requests, map URLs to functions, serialize dicts to JSON, validate input by hand, and write API docs separately. A single typo in URL parsing could crash production. Frameworks solve these problems once so thousands of developers benefit.",
          },
          {
            type: "text",
            content:
              "**FastAPI** is a modern Python framework for building APIs. It is designed for speed, clear type hints, automatic validation, and interactive documentation. You write Python functions with type annotations; FastAPI handles the rest — routing, JSON conversion, error responses, and OpenAPI docs at `/docs`.",
          },
          {
            type: "table",
            title: "What FastAPI solves for you",
            columns: ["Problem", "Without a framework", "With FastAPI"],
            rows: [
              { label: "Routing", values: ["Routing","Manual URL parsing","`@app.get('/users')` decorators"] },
              { label: "Validation", values: ["Validation","Hand-written if/else checks","Pydantic models + type hints"] },
              { label: "JSON", values: ["JSON","Manual dumps/loads","Auto-serialize return dicts"] },
              { label: "Docs", values: ["Docs","Write and maintain separately","Auto-generated at /docs"] },
              { label: "Performance", values: ["Performance","Often blocking, one-at-a-time","ASGI + async support"] },
            ],
          },
          {
            type: "diagram",
            title: "FastAPI core architecture — what it is built on",
            nodes: [
              {
                id: "uvicorn",
                label: "Uvicorn (ASGI server)",
                color: "#009688",
                items: ["Runs your Python app", "Handles many connections", "Production entry point"],
              },
              {
                id: "asgi",
                label: "ASGI protocol",
                color: "#26a69a",
                items: ["Async Server Gateway Interface", "Supports async/await", "Higher concurrency than WSGI"],
              },
              {
                id: "starlette",
                label: "Starlette",
                color: "#4db6ac",
                items: ["HTTP routing", "Requests & responses", "Middleware & WebSockets"],
              },
              {
                id: "fastapi",
                label: "FastAPI (your code)",
                color: "#80cbc4",
                items: ["Route decorators", "OpenAPI / docs", "Developer-friendly API"],
              },
              {
                id: "pydantic",
                label: "Pydantic",
                color: "#b2dfdb",
                items: ["Data validation", "Type hints → models", "Clear 422 error messages"],
              },
            ],
          },
          {
            type: "text",
            content:
              "**Starlette** is the lightweight ASGI toolkit underneath FastAPI. It handles routing (matching URLs to functions), building request/response objects, middleware (code that runs before/after each request), and WebSocket support. FastAPI adds validation, docs, and developer ergonomics on top — you rarely touch Starlette directly, but it powers every request.",
          },
          {
            type: "text",
            content:
              "**Pydantic** validates data using Python **type hints**. When a client sends `{\"age\": \"not-a-number\"}`, Pydantic rejects it before your function runs. FastAPI uses Pydantic models for request bodies and query parameters so bad input never reaches your business logic.",
          },
          {
            type: "text",
            content:
              "**ASGI and Uvicorn:** Traditional synchronous servers handle **one request at a time** per worker — while waiting for a database, the worker sits idle. **ASGI** enables **async** handling: while one request waits for I/O, the server can work on others. **Uvicorn** is the ASGI server that runs your FastAPI app in production. This is a key reason FastAPI is considered high-performance.",
          },
          {
            type: "table",
            title: "Why FastAPI is fast and popular",
            columns: ["Feature", "Benefit", "Compared to older approaches"],
            rows: [
              { label: "Async support", values: ["Async support","Handle many I/O-bound requests efficiently","WSGI servers often block per request"] },
              { label: "Type hints", values: ["Type hints","Editor autocomplete + fewer bugs","Untyped dicts need manual checks"] },
              { label: "Auto validation", values: ["Auto validation","Reject bad input with clear errors","Hand-written validation scattered in code"] },
              { label: "Auto docs", values: ["Auto docs","Interactive /docs and /redoc","Separate Swagger maintenance"] },
              { label: "Performance", values: ["Performance","Among fastest Python frameworks","Comparable to Node and Go for many workloads"] },
            ],
          },
          {
            type: "text",
            content:
              "**Decorators before routes:** In Python, a **decorator** is a function that wraps another function to add behavior. FastAPI uses decorators like `@app.get(\"/\")` to **connect a URL and HTTP method to your Python function**. Analogy: the decorator is a **label on a mailbox** — when mail arrives for `/restaurants`, FastAPI delivers it to the function you labeled.",
          },
          {
            type: "code",
            lang: "python",
            label: "Decorator concept (plain Python)",
            content: `def greet_decorator(func):
    def wrapper():
        print("Before request")
        func()
        print("After response")
    return wrapper

@greet_decorator
def say_hello():
    print("Hello!")

say_hello()`,
          },
          {
            type: "text",
            content:
              "`@app.get(\"/\")` works the same way: FastAPI registers your function as the handler for `GET /`. When a client hits that URL, your function runs and its return value becomes the JSON response.",
          },
          {
            type: "scenario",
            title: "Welcome endpoint",
            content:
              "A new mobile client opens your app and calls `GET /`. Your API returns `{\"message\": \"Welcome\"}` so the app shows a friendly greeting. You write ~10 lines of Python; FastAPI + Starlette + Pydantic handle routing, serialization, and docs.",
          },
          {
            type: "code",
            lang: "python",
            label: "Your first FastAPI endpoint with TestClient",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello FastAPI"}

client = TestClient(app)
r = client.get("/")
print(r.status_code)
print(r.json())`,
          },
          {
            type: "table",
            title: "First endpoint building blocks",
            columns: ["Piece", "Purpose", "Example"],
            rows: [
              { label: "FastAPI()", values: ["FastAPI()","Create app instance","app = FastAPI()"] },
              { label: "@app.get", values: ["@app.get","Bind URL + method to function","@app.get('/')"] },
              { label: "return dict", values: ["return dict","Becomes JSON response body","{\"ok\": True}"] },
              { label: "TestClient", values: ["TestClient","Call routes in code without uvicorn","client.get('/')"] },
            ],
          },
          {
            type: "callout",
            variant: "success",
            content:
              "You can explain what FastAPI is built on (Starlette, Pydantic, ASGI/Uvicorn), why it exists, how decorators connect URLs to functions, and write your first working endpoint.",
          },
          {
            type: "quiz",
            question: "What does Pydantic mainly provide in a FastAPI app?",
            options: [
              "Database migrations",
              "Data validation from type hints and models",
              "CSS styling for /docs",
              "Replacing Uvicorn as the server",
            ],
            answer: 1,
            explanation:
              "Pydantic validates incoming and outgoing data using Python type hints and model classes.",
          },
        ],
        challenge: {
          title: "Hello route check",
          description:
            "Create a FastAPI app with `GET /hello` returning `{'message': 'hello'}`. Use `TestClient` to call `/hello`, then print status code and JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# Add GET /hello route

client = TestClient(app)
# Call route and print status + json
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/hello")
def hello():
    return {"message": "hello"}

client = TestClient(app)
r = client.get("/hello")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Imports FastAPI",
              keywords: [{ pattern: "from\\s+fastapi\\s+import\\s+FastAPI" }],
            },
            {
              id: 2,
              label: "Uses TestClient",
              keywords: [{ pattern: "TestClient\\s*\\(" }],
            },
            {
              id: 3,
              label: "Defines /hello GET route",
              keywords: [{ pattern: '@app\\.get\\(\\s*"/hello"\\s*\\)' }],
            },
            {
              id: 4,
              label: "Prints status and json",
              keywords: [{ pattern: "r\\.status_code|r\\.json\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "first-app",
    title: "Your First App",
    icon: "🚀",
    color: "#00a896",
    lessons: [
      {
        id: "fastapi-4",
        title: "Path Parameters",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Path parameters let one route handle many IDs, like `/students/{student_id}`.",
          },
          {
            type: "scenario",
            title: "Library book detail",
            content:
              "The books list page links to `/books/1`, `/books/2`, and so on. One path function reads the book id and returns the matching result.",
          },
          {
            type: "diagram",
            title: "Route template matching",
            nodes: [
              {
                id: "template",
                label: "/books/{book_id}",
                color: "#00a896",
                items: ["Template route"],
              },
              {
                id: "request",
                label: "/books/42",
                color: "#26a69a",
                items: ["Incoming path"],
              },
              {
                id: "param",
                label: "book_id=42",
                color: "#4db6ac",
                items: ["Function argument"],
              },
            ],
          },
          {
            type: "table",
            title: "Path parameter examples",
            columns: ["Route", "Parameter", "Type hint"],
            rows: [
              { label: "/users/{user_id}", values: ["/users/{user_id}","user_id","int"] },
              { label: "/orders/{order_id}", values: ["/orders/{order_id}","order_id","str or int"] },
              { label: "/classes/{name}", values: ["/classes/{name}","name","str"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Path parameter with int type",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/books/{book_id}")
def read_book(book_id: int):
    return {"book_id": book_id}

client = TestClient(app)
r = client.get("/books/7")
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Tip: use type hints (`int`, `str`) so FastAPI validates and documents parameters automatically.",
          },
        ],
        challenge: {
          title: "Student detail endpoint",
          description:
            "Add `GET /students/{student_id}` that returns `{'student_id': student_id}` with `student_id` typed as `int`. Use TestClient to call `/students/9` and print status + JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# Define GET /students/{student_id}

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/students/{student_id}")
def student_detail(student_id: int):
    return {"student_id": student_id}

client = TestClient(app)
r = client.get("/students/9")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Path route exists",
              keywords: [
                { pattern: '@app\\.get\\(\\s*"/students/\\{student_id\\}"\\s*\\)' },
              ],
            },
            {
              id: 2,
              label: "Type hint int used",
              keywords: [{ pattern: "student_id\\s*:\\s*int" }],
            },
            {
              id: 3,
              label: "Uses TestClient get",
              keywords: [{ pattern: 'client\\.get\\(\\s*"/students/9"\\s*\\)' }],
            },
          ],
        },
      },
      {
        id: "fastapi-5",
        title: "Query Parameters",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Query parameters are filters in the URL after `?`, for example `/books?limit=5&q=python`.",
          },
          {
            type: "scenario",
            title: "Search in a todo app",
            content:
              "A todo screen asks for only urgent tasks: `GET /todos?priority=high`. The API reads `priority` and filters results.",
          },
          {
            type: "table",
            title: "Path vs query",
            columns: ["Type", "Example", "When to use"],
            rows: [
              { label: "Path param", values: ["Path param","/users/2","Identify one resource"] },
              { label: "Query param", values: ["Query param","/users?active=true","Filter/sort/paginate"] },
              { label: "Both", values: ["Both","/users/2?verbose=true","Detail + optional options"] },
            ],
          },
          {
            type: "diagram",
            title: "URL parts",
            nodes: [
              {
                id: "path",
                label: "Path",
                color: "#00a896",
                items: ["/items"],
              },
              {
                id: "query",
                label: "Query string",
                color: "#26a69a",
                items: ["?q=pen&limit=2"],
              },
              {
                id: "parsed",
                label: "Function args",
                color: "#4db6ac",
                items: ["q='pen', limit=2"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Optional query parameter",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/search")
def search(q: str = "all"):
    return {"q": q}

client = TestClient(app)
r = client.get("/search?q=notebook")
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Give defaults for optional query params. Without a default, FastAPI treats the parameter as required.",
          },
        ],
        challenge: {
          title: "Filter books route",
          description:
            "Create `GET /books` with query params `q: str = 'all'` and `limit: int = 10`. Return both in JSON. Call `/books?q=history&limit=2` and print status + JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# Add /books route with q and limit query params

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/books")
def books(q: str = "all", limit: int = 10):
    return {"q": q, "limit": limit}

client = TestClient(app)
r = client.get("/books?q=history&limit=2")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Defines /books GET route",
              keywords: [{ pattern: '@app\\.get\\(\\s*"/books"\\s*\\)' }],
            },
            {
              id: 2,
              label: "Has q default",
              keywords: [{ pattern: "q\\s*:\\s*str\\s*=\\s*\"all\"" }],
            },
            {
              id: 3,
              label: "Has limit default",
              keywords: [{ pattern: "limit\\s*:\\s*int\\s*=\\s*10" }],
            },
            {
              id: 4,
              label: "Calls endpoint with query",
              keywords: [{ pattern: "/books\\?q=history&limit=2" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "pydantic",
    title: "Request Bodies & Pydantic",
    icon: "📦",
    color: "#00897b",
    lessons: [
      {
        id: "fastapi-6",
        title: "POST Body",
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              "POST routes usually receive JSON in the request body. In Python, this maps to dictionaries or Pydantic models.",
          },
          {
            type: "scenario",
            title: "Create a library book",
            content:
              "The frontend sends `{title:'Clean Code', author:'Robert C. Martin'}` to `/books`. The API validates and stores it.",
          },
          {
            type: "table",
            title: "Request body flow",
            columns: ["Step", "What happens"],
            rows: [
              { label: "Client sends JSON", values: ["Client sends JSON","POST /items with body"] },
              { label: "FastAPI parses body", values: ["FastAPI parses body","Converts JSON to Python data"] },
              { label: "Route returns response", values: ["Route returns response","Created item as JSON"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Body as plain dict",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.post("/items")
def create_item(payload: dict):
    return {"name": payload["name"]}

client = TestClient(app)
r = client.post("/items", json={"name": "Pen"})
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Learning outcomes: accept JSON body on POST, read fields safely, and return a created-object style response.",
          },
          {
            type: "quiz",
            question: "Where do POST payload fields usually come from?",
            options: ["Path", "Query only", "Request body JSON", "Headers only"],
            answer: 2,
            explanation: "POST create data is usually sent in JSON request body.",
          },
        ],
        challenge: {
          title: "Simple create endpoint",
          description:
            "Create `POST /students` that accepts a dict body and returns `{'name': <name>, 'created': True}`. Test with `json={'name':'Aisha'}` and print status + JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# Add POST /students route that reads body dict

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.post("/students")
def create_student(payload: dict):
    return {"name": payload["name"], "created": True}

client = TestClient(app)
r = client.post("/students", json={"name": "Aisha"})
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "POST route declared",
              keywords: [{ pattern: '@app\\.post\\(\\s*"/students"\\s*\\)' }],
            },
            {
              id: 2,
              label: "Reads payload dict",
              keywords: [{ pattern: "payload\\s*:\\s*dict" }],
            },
            {
              id: 3,
              label: "Uses client.post with json",
              keywords: [{ pattern: "client\\.post\\s*\\(.*json\\s*=\\s*\\{" }],
            },
          ],
        },
      },
      {
        id: "fastapi-7",
        title: "Pydantic Models",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Pydantic models (`BaseModel`) define exactly what fields a body should contain and their types.",
          },
          {
            type: "scenario",
            title: "School admission form",
            content:
              "If age should be a number, model validation catches bad values early and returns a clear 422 response automatically.",
          },
          {
            type: "diagram",
            title: "Validation pipeline",
            nodes: [
              {
                id: "json",
                label: "Incoming JSON",
                color: "#00897b",
                items: ["title", "price"],
              },
              {
                id: "model",
                label: "Pydantic model",
                color: "#26a69a",
                items: ["Type checks", "Required fields"],
              },
              {
                id: "route",
                label: "Route logic",
                color: "#4db6ac",
                items: ["Safe typed object"],
              },
            ],
          },
          {
            type: "table",
            title: "Model field examples",
            columns: ["Field", "Type", "Meaning"],
            rows: [
              { label: "title", values: ["title","str","Book title"] },
              { label: "pages", values: ["pages","int","Page count"] },
              { label: "published", values: ["published","bool","Published flag"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "BaseModel in action",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

class BookIn(BaseModel):
    title: str
    pages: int

app = FastAPI()

@app.post("/books")
def create_book(book: BookIn):
    return {"title": book.title, "pages": book.pages}

client = TestClient(app)
r = client.post("/books", json={"title": "API Basics", "pages": 120})
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Learning outcomes: build BaseModel schemas, rely on automatic type validation, and access body fields as attributes.",
          },
        ],
        challenge: {
          title: "Create product model",
          description:
            "Define `ProductIn(BaseModel)` with `name: str` and `price: float`. Create `POST /products` that returns those fields. Test with TestClient and print status + JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

# Define ProductIn model

app = FastAPI()

# Add POST /products

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

class ProductIn(BaseModel):
    name: str
    price: float

app = FastAPI()

@app.post("/products")
def create_product(product: ProductIn):
    return {"name": product.name, "price": product.price}

client = TestClient(app)
r = client.post("/products", json={"name": "Notebook", "price": 9.5})
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Defines BaseModel class",
              keywords: [{ pattern: "class\\s+ProductIn\\s*\\(\\s*BaseModel\\s*\\)" }],
            },
            {
              id: 2,
              label: "Fields name and price",
              keywords: [{ pattern: "name\\s*:\\s*str|price\\s*:\\s*float" }],
            },
            {
              id: 3,
              label: "POST /products route",
              keywords: [{ pattern: '@app\\.post\\(\\s*"/products"\\s*\\)' }],
            },
            {
              id: 4,
              label: "TestClient post call",
              keywords: [{ pattern: "client\\.post\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fastapi-8",
        title: "Response Models",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "`response_model` controls exactly what fields your API sends back, even if route logic has extra internal fields.",
          },
          {
            type: "scenario",
            title: "Hide private data",
            content:
              "A user object may have `password_hash`, but API should only expose safe fields like `id` and `email`.",
          },
          {
            type: "table",
            title: "Why response models matter",
            columns: ["Benefit", "Result"],
            rows: [
              { label: "Consistency", values: ["Consistency","Clients always get same shape"] },
              { label: "Security", values: ["Security","Private fields can be excluded"] },
              { label: "Docs", values: ["Docs","OpenAPI schema becomes clearer"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Input and output schemas",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

class UserOut(BaseModel):
    id: int
    email: str

app = FastAPI()

@app.get("/user", response_model=UserOut)
def get_user():
    return {"id": 1, "email": "a@school.dev", "password_hash": "secret"}

client = TestClient(app)
r = client.get("/user")
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Learning outcomes: use `response_model` for stable output and keep internal fields out of client responses.",
          },
          {
            type: "quiz",
            question:
              "What happens to fields not included in `response_model`?",
            options: [
              "They are always returned",
              "FastAPI removes them from output",
              "The app crashes",
              "They become query params",
            ],
            answer: 1,
            explanation:
              "FastAPI filters response data to match the declared response model.",
          },
        ],
        challenge: {
          title: "Safe profile response",
          description:
            "Define `ProfileOut(BaseModel)` with `username: str`. Create `GET /profile` with `response_model=ProfileOut` that returns dict with `username` and extra `token`. Print status + JSON to verify only username appears.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

# Define ProfileOut

app = FastAPI()

# Add GET /profile with response_model

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

class ProfileOut(BaseModel):
    username: str

app = FastAPI()

@app.get("/profile", response_model=ProfileOut)
def profile():
    return {"username": "nida", "token": "private"}

client = TestClient(app)
r = client.get("/profile")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Defines output model",
              keywords: [{ pattern: "class\\s+ProfileOut\\s*\\(\\s*BaseModel\\s*\\)" }],
            },
            {
              id: 2,
              label: "Uses response_model",
              keywords: [{ pattern: "response_model\\s*=\\s*ProfileOut" }],
            },
            {
              id: 3,
              label: "Returns extra token field",
              keywords: [{ pattern: '"token"|\'token\'' }],
            },
            {
              id: 4,
              label: "Calls /profile and prints",
              keywords: [{ pattern: 'client\\.get\\(\\s*"/profile"\\s*\\)|print\\s*\\(' }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "crud",
    title: "CRUD APIs",
    icon: "🧩",
    color: "#00796b",
    lessons: [
      {
        id: "fastapi-9",
        title: "In-Memory Store",
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              "Before databases, we often teach CRUD using an in-memory list. It resets when app restarts, but is perfect for learning API flow.",
          },
          {
            type: "scenario",
            title: "Todo list prototype",
            content:
              "Your startup wants a quick demo today. You keep todos in a Python list so teammates can test routes immediately.",
          },
          {
            type: "diagram",
            title: "Memory store lifecycle",
            nodes: [
              {
                id: "start",
                label: "App starts",
                color: "#00796b",
                items: ["todos = []"],
              },
              {
                id: "runtime",
                label: "Requests update list",
                color: "#26a69a",
                items: ["POST appends", "GET reads"],
              },
              {
                id: "restart",
                label: "Restart clears data",
                color: "#4db6ac",
                items: ["Data lost"],
              },
            ],
          },
          {
            type: "table",
            title: "List item structure",
            columns: ["Field", "Type", "Example"],
            rows: [
              { label: "id", values: ["id","int","1"] },
              { label: "title", values: ["title","str","Buy milk"] },
              { label: "done", values: ["done","bool","False"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Seeded in-memory list",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()
todos = [{"id": 1, "title": "Read docs"}]

@app.get("/todos")
def list_todos():
    return todos

client = TestClient(app)
r = client.get("/todos")
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Use memory stores to understand route behavior first; move to database once API contract feels stable.",
          },
        ],
        challenge: {
          title: "Create a starter store",
          description:
            "Create `books` list with one dict item. Add `GET /books` that returns `books`. Use TestClient to call `/books` and print status + JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# Add in-memory books list and GET /books

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()
books = [{"id": 1, "title": "Intro Python"}]

@app.get("/books")
def list_books():
    return books

client = TestClient(app)
r = client.get("/books")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Declares books list",
              keywords: [{ pattern: "books\\s*=\\s*\\[" }],
            },
            {
              id: 2,
              label: "GET /books route exists",
              keywords: [{ pattern: '@app\\.get\\(\\s*"/books"\\s*\\)' }],
            },
            {
              id: 3,
              label: "Calls endpoint",
              keywords: [{ pattern: 'client\\.get\\(\\s*"/books"\\s*\\)' }],
            },
          ],
        },
      },
      {
        id: "fastapi-10",
        title: "GET List & One",
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              "Most CRUD APIs need two read endpoints: list all items and get one by id.",
          },
          {
            type: "scenario",
            title: "School classes API",
            content:
              "Dashboard first calls `GET /classes` for cards, then detail page calls `GET /classes/3` for one class.",
          },
          {
            type: "table",
            title: "Read endpoint pair",
            columns: ["Endpoint", "Returns"],
            rows: [
              { label: "GET /items", values: ["GET /items","Array of items"] },
              { label: "GET /items/{item_id}", values: ["GET /items/{item_id}","Single item or 404"] },
            ],
          },
          {
            type: "diagram",
            title: "Single-item lookup",
            nodes: [
              {
                id: "id",
                label: "Receive id",
                color: "#00796b",
                items: ["item_id from path"],
              },
              {
                id: "search",
                label: "Find in list",
                color: "#26a69a",
                items: ["Loop or next(...)"],
              },
              {
                id: "result",
                label: "Return item/404",
                color: "#4db6ac",
                items: ["Success or not found"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "List route + one route",
            content: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()
items = [{"id": 1, "name": "Pen"}]

@app.get("/items")
def list_items():
    return items

@app.get("/items/{item_id}")
def get_item(item_id: int):
    item = next((x for x in items if x["id"] == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

client = TestClient(app)
print(client.get("/items").json())
print(client.get("/items/1").json())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use clear 404 errors for missing ids; clients rely on this behavior for UI states.",
          },
        ],
        challenge: {
          title: "Books list and detail routes",
          description:
            "Create list `books` with two dicts. Add `GET /books` and `GET /books/{book_id}` (404 if missing). Test `/books` and `/books/2`; print status + JSON.",
          starterCode: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()
books = [{"id": 1, "title": "A"}, {"id": 2, "title": "B"}]

# Add list and detail routes

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()
books = [{"id": 1, "title": "A"}, {"id": 2, "title": "B"}]

@app.get("/books")
def list_books():
    return books

@app.get("/books/{book_id}")
def get_book(book_id: int):
    book = next((b for b in books if b["id"] == book_id), None)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

client = TestClient(app)
r1 = client.get("/books")
r2 = client.get("/books/2")
print(r1.status_code, r1.json())
print(r2.status_code, r2.json())`,
          tests: [
            {
              id: 1,
              label: "Defines both GET routes",
              keywords: [
                { pattern: '@app\\.get\\(\\s*"/books"\\s*\\)' },
                { pattern: '@app\\.get\\(\\s*"/books/\\{book_id\\}"\\s*\\)' },
              ],
            },
            {
              id: 2,
              label: "Uses HTTPException 404",
              keywords: [{ pattern: "HTTPException\\s*\\(\\s*status_code\\s*=\\s*404" }],
            },
            {
              id: 3,
              label: "Prints responses",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fastapi-11",
        title: "POST Create",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Create endpoints accept input, assign a new id, append to store, and return the new record.",
          },
          {
            type: "scenario",
            title: "Add student profile",
            content:
              "Admin posts a new student object. API computes next id and returns created student so frontend can update instantly.",
          },
          {
            type: "table",
            title: "Create endpoint checklist",
            columns: ["Step", "Reason"],
            rows: [
              { label: "Validate input", values: ["Validate input","Prevent bad records"] },
              { label: "Generate id", values: ["Generate id","Keep unique references"] },
              { label: "Append to list", values: ["Append to list","Persist during runtime"] },
              { label: "Return created object", values: ["Return created object","Client updates UI"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "POST create with id assignment",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

class TodoIn(BaseModel):
    title: str

app = FastAPI()
todos = []

@app.post("/todos")
def create_todo(todo: TodoIn):
    new = {"id": len(todos) + 1, "title": todo.title}
    todos.append(new)
    return new

client = TestClient(app)
r = client.post("/todos", json={"title": "Practice FastAPI"})
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Learning outcomes: implement POST create flow, assign IDs safely, and return newly created records.",
          },
          {
            type: "quiz",
            question: "Why return the created object after POST?",
            options: [
              "To reduce response size to zero",
              "So client can use server-confirmed data (id, fields)",
              "Because GET cannot be used anymore",
              "Only for debugging",
            ],
            answer: 1,
            explanation:
              "Returning created data gives client reliable values like generated id.",
          },
        ],
        challenge: {
          title: "Create class endpoint",
          description:
            "Define `ClassIn(BaseModel)` with `name: str`. Add `POST /classes` that stores in-memory list with generated id. Test with one request and print status + JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()
classes = []

# Define ClassIn and POST /classes

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

class ClassIn(BaseModel):
    name: str

app = FastAPI()
classes = []

@app.post("/classes")
def create_class(payload: ClassIn):
    new_item = {"id": len(classes) + 1, "name": payload.name}
    classes.append(new_item)
    return new_item

client = TestClient(app)
r = client.post("/classes", json={"name": "Physics"})
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Defines BaseModel input",
              keywords: [{ pattern: "class\\s+ClassIn\\s*\\(\\s*BaseModel\\s*\\)" }],
            },
            {
              id: 2,
              label: "POST /classes route",
              keywords: [{ pattern: '@app\\.post\\(\\s*"/classes"\\s*\\)' }],
            },
            {
              id: 3,
              label: "Generates id via len",
              keywords: [{ pattern: "len\\s*\\(\\s*classes\\s*\\)\\s*\\+\\s*1" }],
            },
            {
              id: 4,
              label: "Uses client.post",
              keywords: [{ pattern: "client\\.post\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fastapi-12",
        title: "PUT & DELETE",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Update and delete complete CRUD. `PUT` updates existing fields, and `DELETE` removes items by id.",
          },
          {
            type: "scenario",
            title: "Todo corrections",
            content:
              "User edits typo in todo title with PUT, then removes finished task with DELETE.",
          },
          {
            type: "diagram",
            title: "Update/delete route flow",
            nodes: [
              {
                id: "lookup",
                label: "Lookup by id",
                color: "#00796b",
                items: ["Find index/item"],
              },
              {
                id: "apply",
                label: "Apply change",
                color: "#26a69a",
                items: ["Update fields or pop"],
              },
              {
                id: "respond",
                label: "Return status",
                color: "#4db6ac",
                items: ["Updated item or message"],
              },
            ],
          },
          {
            type: "table",
            title: "Common statuses",
            columns: ["Operation", "Status"],
            rows: [
              { label: "Successful update", values: ["Successful update","200"] },
              { label: "Successful delete", values: ["Successful delete","200 or 204"] },
              { label: "Missing id", values: ["Missing id","404"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "PUT and DELETE example",
            content: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel

class TodoUpdate(BaseModel):
    title: str

app = FastAPI()
todos = [{"id": 1, "title": "Old"}]

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, payload: TodoUpdate):
    todo = next((t for t in todos if t["id"] == todo_id), None)
    if todo is None:
        raise HTTPException(status_code=404, detail="Not found")
    todo["title"] = payload.title
    return todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    idx = next((i for i, t in enumerate(todos) if t["id"] == todo_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Not found")
    removed = todos.pop(idx)
    return {"deleted_id": removed["id"]}

client = TestClient(app)
print(client.put("/todos/1", json={"title": "New"}).json())
print(client.delete("/todos/1").json())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Learning outcomes: implement update and delete handlers with id lookup + clean 404 behavior.",
          },
        ],
        challenge: {
          title: "Update and remove a book",
          description:
            "Start with `books = [{'id':1,'title':'Old'}]`. Add `PUT /books/{book_id}` to change title and `DELETE /books/{book_id}` to remove. Test both and print outputs.",
          starterCode: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()
books = [{"id": 1, "title": "Old"}]

# Add BookUpdate model, PUT route, DELETE route

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel

class BookUpdate(BaseModel):
    title: str

app = FastAPI()
books = [{"id": 1, "title": "Old"}]

@app.put("/books/{book_id}")
def update_book(book_id: int, payload: BookUpdate):
    book = next((b for b in books if b["id"] == book_id), None)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    book["title"] = payload.title
    return book

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    idx = next((i for i, b in enumerate(books) if b["id"] == book_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Book not found")
    removed = books.pop(idx)
    return {"deleted_id": removed["id"]}

client = TestClient(app)
r1 = client.put("/books/1", json={"title": "Updated"})
r2 = client.delete("/books/1")
print(r1.status_code, r1.json())
print(r2.status_code, r2.json())`,
          tests: [
            {
              id: 1,
              label: "PUT route declared",
              keywords: [{ pattern: '@app\\.put\\(\\s*"/books/\\{book_id\\}"\\s*\\)' }],
            },
            {
              id: 2,
              label: "DELETE route declared",
              keywords: [
                { pattern: '@app\\.delete\\(\\s*"/books/\\{book_id\\}"\\s*\\)' },
              ],
            },
            {
              id: 3,
              label: "Uses HTTPException",
              keywords: [{ pattern: "HTTPException" }],
            },
            {
              id: 4,
              label: "Prints both responses",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "validation",
    title: "Validation & Errors",
    icon: "🛡️",
    color: "#00695c",
    lessons: [
      {
        id: "fastapi-13",
        title: "Field Validation",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Pydantic `Field()` adds limits like min length, max length, and numeric bounds.",
          },
          {
            type: "scenario",
            title: "User signup checks",
            content:
              "A username must be at least 3 chars and age must be positive. Validation rejects bad payloads before your core logic runs.",
          },
          {
            type: "table",
            title: "Useful Field validators",
            columns: ["Constraint", "Example"],
            rows: [
              { label: "String length", values: ["String length","Field(min_length=3, max_length=20)"] },
              { label: "Numeric range", values: ["Numeric range","Field(ge=0, le=100)"] },
              { label: "Description", values: ["Description","Field(..., description='User age')"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Validation with Field",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel, Field

class StudentIn(BaseModel):
    name: str = Field(min_length=3)
    age: int = Field(ge=5, le=100)

app = FastAPI()

@app.post("/students")
def create_student(payload: StudentIn):
    return payload.model_dump()

client = TestClient(app)
r = client.post("/students", json={"name": "Ali", "age": 14})
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Learning outcomes: enforce field constraints, trust FastAPI's auto-validation, and design safer request schemas.",
          },
          {
            type: "quiz",
            question: "What does `Field(ge=1)` mean for a number?",
            options: [
              "Must be <= 1",
              "Must be >= 1",
              "Must be exactly 1",
              "Must be optional",
            ],
            answer: 1,
            explanation: "`ge` means greater than or equal to.",
          },
        ],
        challenge: {
          title: "Validate course payload",
          description:
            "Create `CourseIn(BaseModel)` with `title: str = Field(min_length=4)` and `hours: int = Field(ge=1)`. Add `POST /courses` returning payload dict. Send one valid request and print status + JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel, Field

app = FastAPI()

# Define CourseIn and POST /courses

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel, Field

class CourseIn(BaseModel):
    title: str = Field(min_length=4)
    hours: int = Field(ge=1)

app = FastAPI()

@app.post("/courses")
def create_course(payload: CourseIn):
    return payload.model_dump()

client = TestClient(app)
r = client.post("/courses", json={"title": "Math", "hours": 24})
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Uses Field min_length",
              keywords: [{ pattern: "Field\\s*\\(\\s*min_length\\s*=\\s*4" }],
            },
            {
              id: 2,
              label: "Uses Field ge",
              keywords: [{ pattern: "Field\\s*\\(\\s*ge\\s*=\\s*1" }],
            },
            {
              id: 3,
              label: "POST /courses route",
              keywords: [{ pattern: '@app\\.post\\(\\s*"/courses"\\s*\\)' }],
            },
          ],
        },
      },
      {
        id: "fastapi-14",
        title: "HTTPException",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Use `HTTPException` for business errors like missing records, unauthorized users, or invalid actions.",
          },
          {
            type: "scenario",
            title: "Borrowed library book",
            content:
              "If a book is already borrowed, API should return a clear error like 400 with a helpful `detail` message.",
          },
          {
            type: "table",
            title: "Common exception cases",
            columns: ["Status", "When"],
            rows: [
              { label: "400", values: ["400","Bad request rules"] },
              { label: "401", values: ["401","Auth missing/invalid"] },
              { label: "404", values: ["404","Resource not found"] },
              { label: "409", values: ["409","Conflict (already exists)"] },
            ],
          },
          {
            type: "diagram",
            title: "Error response shape",
            nodes: [
              {
                id: "raise",
                label: "raise HTTPException",
                color: "#00695c",
                items: ["status_code", "detail"],
              },
              {
                id: "json",
                label: "FastAPI formats response",
                color: "#26a69a",
                items: ['{"detail": "..."}'],
              },
              {
                id: "client",
                label: "Client handles error",
                color: "#4db6ac",
                items: ["Show message in UI"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Raise not found error",
            content: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/books/{book_id}")
def get_book(book_id: int):
    if book_id != 1:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"id": 1, "title": "FastAPI Guide"}

client = TestClient(app)
r = client.get("/books/9")
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Learning outcomes: raise meaningful HTTP errors, choose fitting status codes, and provide clear `detail` text.",
          },
        ],
        challenge: {
          title: "Handle missing student",
          description:
            "Add `GET /students/{student_id}` that returns one fixed student only when id is 1. Otherwise raise `HTTPException(404, 'Student not found')`. Test `/students/2` and print status + JSON.",
          starterCode: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()

# Add route with HTTPException for missing id

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/students/{student_id}")
def get_student(student_id: int):
    if student_id != 1:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"id": 1, "name": "Aisha"}

client = TestClient(app)
r = client.get("/students/2")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Route with student_id path param",
              keywords: [
                { pattern: '@app\\.get\\(\\s*"/students/\\{student_id\\}"\\s*\\)' },
              ],
            },
            {
              id: 2,
              label: "Raises HTTPException 404",
              keywords: [{ pattern: "HTTPException\\s*\\(\\s*status_code\\s*=\\s*404" }],
            },
            {
              id: 3,
              label: "Prints error response",
              keywords: [{ pattern: "print\\s*\\(\\s*r\\.status_code|r\\.json\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fastapi-15",
        title: "Status Codes",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Status codes tell clients what happened: success, created, not found, validation error, and more.",
          },
          {
            type: "scenario",
            title: "Todo API responses",
            content:
              "Client posts todo and expects 201. It deletes todo and may expect 200 with message or 204 with empty body.",
          },
          {
            type: "table",
            title: "Core statuses in this course",
            columns: ["Code", "Meaning", "Typical route"],
            rows: [
              { label: "200", values: ["200","OK","GET, PUT success"] },
              { label: "201", values: ["201","Created","POST create"] },
              { label: "204", values: ["204","No Content","DELETE no body"] },
              { label: "404", values: ["404","Not Found","Missing resource"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Setting status_code in decorator",
            content: `from fastapi import FastAPI, status
from fastapi.testclient import TestClient
from pydantic import BaseModel

class ItemIn(BaseModel):
    name: str

app = FastAPI()

@app.post("/items", status_code=status.HTTP_201_CREATED)
def create_item(payload: ItemIn):
    return {"name": payload.name}

client = TestClient(app)
r = client.post("/items", json={"name": "Bottle"})
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Choose codes intentionally. Good status choices make frontend logic and debugging much easier.",
          },
          {
            type: "quiz",
            question: "Which status best fits successful POST creation?",
            options: ["200", "201", "204", "404"],
            answer: 1,
            explanation: "201 Created is the standard response for successful creation.",
          },
        ],
        challenge: {
          title: "Return 201 on create",
          description:
            "Build `POST /notes` using a Pydantic model and set `status_code=201`. Return the created note title. Send one request and print status + JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()

# Create NoteIn and POST /notes with status code 201

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

class NoteIn(BaseModel):
    title: str

app = FastAPI()

@app.post("/notes", status_code=201)
def create_note(payload: NoteIn):
    return {"title": payload.title}

client = TestClient(app)
r = client.post("/notes", json={"title": "Read chapter 5"})
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Defines POST /notes",
              keywords: [{ pattern: '@app\\.post\\(\\s*"/notes"' }],
            },
            {
              id: 2,
              label: "Sets status_code 201",
              keywords: [{ pattern: "status_code\\s*=\\s*201|HTTP_201_CREATED" }],
            },
            {
              id: 3,
              label: "Uses BaseModel",
              keywords: [{ pattern: "BaseModel" }],
            },
            {
              id: 4,
              label: "Prints status and body",
              keywords: [{ pattern: "r\\.status_code|r\\.json\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "deps",
    title: "Dependencies",
    icon: "🧠",
    color: "#004d40",
    lessons: [
      {
        id: "fastapi-16",
        title: "Depends Basics",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`Depends()` injects reusable logic into routes. It keeps handlers clean and avoids copy-paste.",
          },
          {
            type: "scenario",
            title: "Shared school config",
            content:
              "Many routes need the current school year. Put that logic in one dependency and reuse everywhere.",
          },
          {
            type: "diagram",
            title: "Dependency injection flow",
            nodes: [
              {
                id: "dep",
                label: "Dependency function",
                color: "#004d40",
                items: ["Returns shared value"],
              },
              {
                id: "route",
                label: "Route uses Depends",
                color: "#26a69a",
                items: ["Gets injected arg"],
              },
              {
                id: "reuse",
                label: "Reuse in many routes",
                color: "#4db6ac",
                items: ["Consistent behavior"],
              },
            ],
          },
          {
            type: "table",
            title: "Without vs with Depends",
            columns: ["Style", "Result"],
            rows: [
              { label: "Manual call in every route", values: ["Manual call in every route","Repetition"] },
              { label: "Shared dependency", values: ["Shared dependency","Cleaner route signatures"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Basic dependency",
            content: `from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

def get_version():
    return "v1"

@app.get("/meta")
def meta(version: str = Depends(get_version)):
    return {"version": version}

client = TestClient(app)
r = client.get("/meta")
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Learning outcomes: create reusable dependencies and inject shared values into route handlers.",
          },
          {
            type: "quiz",
            question: "Main purpose of `Depends()`?",
            options: [
              "Render HTML",
              "Run shared logic and inject results",
              "Start uvicorn",
              "Create SQL tables",
            ],
            answer: 1,
            explanation:
              "Dependencies are for reusable pre-route logic and parameter injection.",
          },
        ],
        challenge: {
          title: "Inject app name dependency",
          description:
            "Create dependency `get_app_name()` returning `'PolyCode API'`. Add `GET /about` route receiving `app_name: str = Depends(get_app_name)` and return it. Test and print status + JSON.",
          starterCode: `from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient

app = FastAPI()

# Define get_app_name and /about route

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient

app = FastAPI()

def get_app_name():
    return "PolyCode API"

@app.get("/about")
def about(app_name: str = Depends(get_app_name)):
    return {"app_name": app_name}

client = TestClient(app)
r = client.get("/about")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Defines dependency function",
              keywords: [{ pattern: "def\\s+get_app_name\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses Depends in route",
              keywords: [{ pattern: "Depends\\s*\\(\\s*get_app_name\\s*\\)" }],
            },
            {
              id: 3,
              label: "GET /about route exists",
              keywords: [{ pattern: '@app\\.get\\(\\s*"/about"\\s*\\)' }],
            },
          ],
        },
      },
      {
        id: "fastapi-17",
        title: "API Key Auth",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "A simple auth pattern is checking an API key from request headers using a dependency.",
          },
          {
            type: "scenario",
            title: "Internal school admin API",
            content:
              "Only staff apps with a known key can call `/admin/stats`. Other callers should get 401.",
          },
          {
            type: "table",
            title: "Auth dependency behavior",
            columns: ["Condition", "Result"],
            rows: [
              { label: "Header key matches", values: ["Header key matches","Allow request"] },
              { label: "Header missing/wrong", values: ["Header missing/wrong","Raise 401"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Header key check",
            content: `from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()

def verify_key(x_api_key: str | None = Header(default=None)):
    if x_api_key != "secret123":
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key

@app.get("/admin")
def admin(_: str = Depends(verify_key)):
    return {"ok": True}

client = TestClient(app)
r = client.get("/admin", headers={"x-api-key": "secret123"})
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Use this as a learning pattern. Real production auth often uses OAuth/JWT and stronger key management.",
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Learning outcomes: implement header-based dependency auth and return 401 on invalid/missing keys.",
          },
        ],
        challenge: {
          title: "Protect a teacher route",
          description:
            "Create dependency `check_key` reading `x-api-key` header and requiring `'teach-42'`. Add `GET /teachers` protected by dependency. Call once with correct header and print status + JSON.",
          starterCode: `from fastapi import FastAPI, Depends, Header, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()

# Add check_key dependency and protected /teachers route

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI, Depends, Header, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()

def check_key(x_api_key: str | None = Header(default=None)):
    if x_api_key != "teach-42":
        raise HTTPException(status_code=401, detail="Unauthorized")
    return x_api_key

@app.get("/teachers")
def list_teachers(_: str = Depends(check_key)):
    return {"count": 2}

client = TestClient(app)
r = client.get("/teachers", headers={"x-api-key": "teach-42"})
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Reads header value",
              keywords: [{ pattern: "Header\\s*\\(" }],
            },
            {
              id: 2,
              label: "Raises 401",
              keywords: [{ pattern: "status_code\\s*=\\s*401" }],
            },
            {
              id: 3,
              label: "Depends used on route",
              keywords: [{ pattern: "Depends\\s*\\(\\s*check_key\\s*\\)" }],
            },
            {
              id: 4,
              label: "Calls endpoint with headers",
              keywords: [{ pattern: "headers\\s*=\\s*\\{" }],
            },
          ],
        },
      },
      {
        id: "fastapi-18",
        title: "Pagination Depends",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Pagination keeps responses small. A dependency can parse `skip` and `limit` once and reuse it across list endpoints.",
          },
          {
            type: "scenario",
            title: "Large course catalog",
            content:
              "Instead of sending 500 courses at once, API returns a page like 20 items with `skip`/`limit` controls.",
          },
          {
            type: "diagram",
            title: "Pagination dependency",
            nodes: [
              {
                id: "query",
                label: "skip + limit query",
                color: "#004d40",
                items: ["?skip=0&limit=2"],
              },
              {
                id: "dep",
                label: "Depends parser",
                color: "#26a69a",
                items: ["Returns tuple/object"],
              },
              {
                id: "slice",
                label: "Slice list",
                color: "#4db6ac",
                items: ["items[skip:skip+limit]"],
              },
            ],
          },
          {
            type: "table",
            title: "Pagination terms",
            columns: ["Term", "Meaning"],
            rows: [
              { label: "skip", values: ["skip","How many items to ignore first"] },
              { label: "limit", values: ["limit","Maximum items to return"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Reusable pagination dependency",
            content: `from fastapi import Depends, FastAPI, Query
from fastapi.testclient import TestClient

app = FastAPI()
books = [{"id": 1}, {"id": 2}, {"id": 3}, {"id": 4}]

def pagination(skip: int = Query(0, ge=0), limit: int = Query(2, ge=1)):
    return {"skip": skip, "limit": limit}

@app.get("/books")
def list_books(page: dict = Depends(pagination)):
    s = page["skip"]
    l = page["limit"]
    return books[s : s + l]

client = TestClient(app)
r = client.get("/books?skip=1&limit=2")
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Keep pagination defaults small and validate with `ge` so clients cannot send negative skips.",
          },
        ],
        challenge: {
          title: "Paginated students endpoint",
          description:
            "Create `students = [{'id':1}, {'id':2}, {'id':3}]`. Build dependency `get_page(skip:int=0, limit:int=2)` and use it in `GET /students` to return sliced list. Call `/students?skip=1&limit=2` and print status + JSON.",
          starterCode: `from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient

app = FastAPI()
students = [{"id": 1}, {"id": 2}, {"id": 3}]

# Add get_page dependency and route

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient

app = FastAPI()
students = [{"id": 1}, {"id": 2}, {"id": 3}]

def get_page(skip: int = 0, limit: int = 2):
    return {"skip": skip, "limit": limit}

@app.get("/students")
def list_students(page: dict = Depends(get_page)):
    s = page["skip"]
    l = page["limit"]
    return students[s : s + l]

client = TestClient(app)
r = client.get("/students?skip=1&limit=2")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Dependency function exists",
              keywords: [{ pattern: "def\\s+get_page\\s*\\(" }],
            },
            {
              id: 2,
              label: "Route uses Depends",
              keywords: [{ pattern: "Depends\\s*\\(\\s*get_page\\s*\\)" }],
            },
            {
              id: 3,
              label: "Returns slice with skip+limit",
              keywords: [{ pattern: "\\[\\s*s\\s*:\\s*s\\s*\\+\\s*l\\s*\\]" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Patterns",
    icon: "⚙️",
    color: "#26a69a",
    lessons: [
      {
        id: "fastapi-19",
        title: "APIRouter",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "`APIRouter` helps split big apps into smaller modules by feature, like users, todos, and courses.",
          },
          {
            type: "scenario",
            title: "Growing school platform",
            content:
              "One huge `main.py` becomes hard to read. Routers keep each domain isolated and easier to test.",
          },
          {
            type: "table",
            title: "Router concepts",
            columns: ["Concept", "Example"],
            rows: [
              { label: "Router object", values: ["Router object","router = APIRouter(prefix='/users')"] },
              { label: "Attach route", values: ["Attach route","@router.get('/')"] },
              { label: "Mount to app", values: ["Mount to app","app.include_router(router)"] },
            ],
          },
          {
            type: "diagram",
            title: "Route organization",
            nodes: [
              {
                id: "main",
                label: "main app",
                color: "#26a69a",
                items: ["include routers"],
              },
              {
                id: "users",
                label: "users router",
                color: "#4db6ac",
                items: ["/users/..."],
              },
              {
                id: "todos",
                label: "todos router",
                color: "#80cbc4",
                items: ["/todos/..."],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Router in one file",
            content: `from fastapi import APIRouter, FastAPI
from fastapi.testclient import TestClient

app = FastAPI()
router = APIRouter(prefix="/users")

@router.get("/")
def list_users():
    return [{"id": 1, "name": "Sam"}]

app.include_router(router)

client = TestClient(app)
r = client.get("/users/")
print(r.status_code)
print(r.json())`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Learning outcomes: create router objects, use prefixes, and include routers in main app cleanly.",
          },
        ],
        challenge: {
          title: "Mini router for books",
          description:
            "Create `APIRouter(prefix='/books')` with `GET '/'` returning one item. Include router in `app`, call `/books/` with TestClient, and print status + JSON.",
          starterCode: `from fastapi import FastAPI, APIRouter
from fastapi.testclient import TestClient

app = FastAPI()

# Create books router, add GET /, include router

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI, APIRouter
from fastapi.testclient import TestClient

app = FastAPI()
books_router = APIRouter(prefix="/books")

@books_router.get("/")
def list_books():
    return [{"id": 1, "title": "Router 101"}]

app.include_router(books_router)

client = TestClient(app)
r = client.get("/books/")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Creates APIRouter with prefix",
              keywords: [{ pattern: "APIRouter\\s*\\(\\s*prefix\\s*=\\s*\"/books\"" }],
            },
            {
              id: 2,
              label: "Includes router in app",
              keywords: [{ pattern: "app\\.include_router\\s*\\(" }],
            },
            {
              id: 3,
              label: "Calls /books/",
              keywords: [{ pattern: 'client\\.get\\(\\s*"/books/"\\s*\\)' }],
            },
          ],
        },
      },
      {
        id: "fastapi-20",
        title: "Middleware",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Middleware runs around every request. It is useful for timing, logging, headers, and security checks.",
          },
          {
            type: "scenario",
            title: "Track response time",
            content:
              "A slow endpoint hurts user experience. Middleware can measure each request and attach timing info in headers.",
          },
          {
            type: "table",
            title: "Middleware tasks",
            columns: ["Task", "Example"],
            rows: [
              { label: "Logging", values: ["Logging","Print method + path"] },
              { label: "Timing", values: ["Timing","Measure request duration"] },
              { label: "Headers", values: ["Headers","Add `x-process-time`"] },
            ],
          },
          {
            type: "diagram",
            title: "Request pipeline with middleware",
            nodes: [
              {
                id: "before",
                label: "Before route",
                color: "#26a69a",
                items: ["Start timer"],
              },
              {
                id: "route",
                label: "Route handler",
                color: "#4db6ac",
                items: ["Business logic"],
              },
              {
                id: "after",
                label: "After route",
                color: "#80cbc4",
                items: ["Add headers/log"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Basic timing middleware",
            content: `import time
from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.middleware("http")
async def timing_middleware(request, call_next):
    start = time.time()
    response = await call_next(request)
    response.headers["x-process-time"] = str(round(time.time() - start, 6))
    return response

@app.get("/ping")
def ping():
    return {"pong": True}

client = TestClient(app)
r = client.get("/ping")
print(r.status_code)
print(r.headers.get("x-process-time"))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Keep middleware light. Heavy logic here affects every endpoint in your API.",
          },
        ],
        challenge: {
          title: "Add simple log middleware",
          description:
            "Create middleware that prints request method and path, then returns response. Add `GET /health` route, call it with TestClient, and print status + JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# Add middleware and /health route

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.middleware("http")
async def log_middleware(request, call_next):
    print(request.method, request.url.path)
    response = await call_next(request)
    return response

@app.get("/health")
def health():
    return {"status": "ok"}

client = TestClient(app)
r = client.get("/health")
print(r.status_code)
print(r.json())`,
          tests: [
            {
              id: 1,
              label: "Middleware decorator used",
              keywords: [{ pattern: '@app\\.middleware\\(\\s*"http"\\s*\\)' }],
            },
            {
              id: 2,
              label: "Defines /health route",
              keywords: [{ pattern: '@app\\.get\\(\\s*"/health"\\s*\\)' }],
            },
            {
              id: 3,
              label: "Calls /health",
              keywords: [{ pattern: 'client\\.get\\(\\s*"/health"\\s*\\)' }],
            },
          ],
        },
      },
      {
        id: "fastapi-21",
        title: "Background Tasks",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "`BackgroundTasks` lets API respond quickly while scheduling non-blocking work like logging, email, or report generation.",
          },
          {
            type: "scenario",
            title: "Order confirmation",
            content:
              "User should get instant API response, while confirmation email can be queued in background after response.",
          },
          {
            type: "table",
            title: "Good background jobs",
            columns: ["Task", "Why async-after-response helps"],
            rows: [
              { label: "Send email", values: ["Send email","User does not wait for SMTP"] },
              { label: "Write logs", values: ["Write logs","Keeps route fast"] },
              { label: "Generate report", values: ["Generate report","Can be done later"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Background task pattern",
            content: `from fastapi import BackgroundTasks, FastAPI
from fastapi.testclient import TestClient

app = FastAPI()
events = []

def write_event(msg: str):
    events.append(msg)

@app.post("/notify")
def notify(background_tasks: BackgroundTasks):
    background_tasks.add_task(write_event, "sent")
    return {"queued": True}

client = TestClient(app)
r = client.post("/notify")
print(r.status_code)
print(r.json())
print(events)`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Learning outcomes: add background tasks to routes and separate quick response from slower side work.",
          },
          {
            type: "quiz",
            question: "Best use case for `BackgroundTasks`?",
            options: [
              "Core validation before response",
              "Slow side work after response",
              "Defining routes",
              "Replacing Pydantic models",
            ],
            answer: 1,
            explanation:
              "Background tasks are ideal for non-critical tasks that can run after sending response.",
          },
        ],
        challenge: {
          title: "Queue a fake welcome email",
          description:
            "Create list `sent = []` and function `send_email(address)` that appends address. Add `POST /signup` route taking `email` query param and using `BackgroundTasks` to queue `send_email`. Call `/signup?email=a@x.com` and print status, JSON, and `sent` list.",
          starterCode: `from fastapi import FastAPI, BackgroundTasks
from fastapi.testclient import TestClient

app = FastAPI()
sent = []

# Add send_email and POST /signup

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI, BackgroundTasks
from fastapi.testclient import TestClient

app = FastAPI()
sent = []

def send_email(address: str):
    sent.append(address)

@app.post("/signup")
def signup(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email, email)
    return {"queued": True, "email": email}

client = TestClient(app)
r = client.post("/signup?email=a@x.com")
print(r.status_code)
print(r.json())
print(sent)`,
          tests: [
            {
              id: 1,
              label: "Uses BackgroundTasks parameter",
              keywords: [{ pattern: "BackgroundTasks" }],
            },
            {
              id: 2,
              label: "Calls add_task",
              keywords: [{ pattern: "add_task\\s*\\(" }],
            },
            {
              id: 3,
              label: "Defines /signup route",
              keywords: [{ pattern: '@app\\.post\\(\\s*"/signup"\\s*\\)' }],
            },
            {
              id: 4,
              label: "Prints sent list",
              keywords: [{ pattern: "print\\s*\\(\\s*sent\\s*\\)" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "capstone",
    title: "Testing & Capstone",
    icon: "🏁",
    color: "#4db6ac",
    lessons: [
      {
        id: "fastapi-22",
        title: "TestClient Testing",
        xp: 17,
        theory: [
          {
            type: "text",
            content:
              "Good APIs are tested for happy paths and failure paths. `TestClient` gives fast confidence in route behavior.",
          },
          {
            type: "scenario",
            title: "Prevent regressions",
            content:
              "A teammate changes endpoint logic. Tests quickly reveal if status codes or JSON contracts broke.",
          },
          {
            type: "table",
            title: "Useful assertions",
            columns: ["Check", "Example"],
            rows: [
              { label: "Status", values: ["Status","assert r.status_code == 200"] },
              { label: "JSON field", values: ["JSON field","assert r.json()['ok'] is True"] },
              { label: "Error detail", values: ["Error detail","assert r.json()['detail'] == 'Not found'"] },
            ],
          },
          {
            type: "diagram",
            title: "Test loop",
            nodes: [
              {
                id: "arrange",
                label: "Arrange",
                color: "#4db6ac",
                items: ["Prepare data"],
              },
              {
                id: "act",
                label: "Act",
                color: "#26a69a",
                items: ["Call endpoint"],
              },
              {
                id: "assert",
                label: "Assert",
                color: "#009688",
                items: ["Check status + JSON"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Mini test-style checks",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/ping")
def ping():
    return {"ok": True}

client = TestClient(app)
r = client.get("/ping")
print(r.status_code == 200)
print(r.json().get("ok") is True)`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Learning outcomes: write direct TestClient checks for status, body shape, and common failure responses.",
          },
          {
            type: "quiz",
            question: "Which is the first check for most endpoint tests?",
            options: [
              "Database row count",
              "Status code",
              "Server CPU",
              "Frontend screenshot",
            ],
            answer: 1,
            explanation:
              "Status code is usually the quickest way to verify route behavior.",
          },
        ],
        challenge: {
          title: "Test a health endpoint",
          description:
            "Create `GET /health` returning `{'ok': True}`. Use TestClient to request it, then print `r.status_code == 200` and `r.json().get('ok')`.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# Add /health route and test checks
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}

client = TestClient(app)
r = client.get("/health")
print(r.status_code == 200)
print(r.json().get("ok"))`,
          tests: [
            {
              id: 1,
              label: "Creates /health route",
              keywords: [{ pattern: '@app\\.get\\(\\s*"/health"\\s*\\)' }],
            },
            {
              id: 2,
              label: "Uses TestClient request",
              keywords: [{ pattern: "client\\.get\\s*\\(" }],
            },
            {
              id: 3,
              label: "Checks status 200",
              keywords: [{ pattern: "status_code\\s*==\\s*200" }],
            },
            {
              id: 4,
              label: "Reads ok field from json",
              keywords: [{ pattern: "r\\.json\\s*\\(\\)\\.get\\(\\s*\"ok\"" }],
            },
          ],
        },
      },
      {
        id: "fastapi-23",
        title: "OpenAPI Docs",
        xp: 17,
        theory: [
          {
            type: "text",
            content:
              "FastAPI auto-generates OpenAPI docs at `/docs` and schema JSON at `/openapi.json` from your routes and models.",
          },
          {
            type: "scenario",
            title: "Team handoff",
            content:
              "Frontend teammate joins project and uses docs page to understand endpoints without asking for manual docs.",
          },
          {
            type: "table",
            title: "Docs endpoints",
            columns: ["Path", "Purpose"],
            rows: [
              { label: "/docs", values: ["/docs","Interactive Swagger UI"] },
              { label: "/redoc", values: ["/redoc","Alternative docs UI"] },
              { label: "/openapi.json", values: ["/openapi.json","Raw schema for tooling"] },
            ],
          },
          {
            type: "diagram",
            title: "How docs are produced",
            nodes: [
              {
                id: "routes",
                label: "Routes + models",
                color: "#4db6ac",
                items: ["Decorators", "Pydantic fields"],
              },
              {
                id: "schema",
                label: "OpenAPI schema",
                color: "#26a69a",
                items: ["JSON contract"],
              },
              {
                id: "ui",
                label: "Interactive docs UI",
                color: "#009688",
                items: ["Try requests in browser"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Check openapi via TestClient",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI(title="Library API")

@app.get("/books")
def books():
    return []

client = TestClient(app)
r = client.get("/openapi.json")
print(r.status_code)
print("paths" in r.json())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Learning outcomes: explain OpenAPI docs endpoints and verify schema output through tests.",
          },
        ],
        challenge: {
          title: "Inspect generated schema",
          description:
            "Create FastAPI app with one route `GET /ping`. Use TestClient to call `/openapi.json`, then print status code and whether `'paths'` key exists in response JSON.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# Add /ping and inspect /openapi.json
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/ping")
def ping():
    return {"pong": True}

client = TestClient(app)
r = client.get("/openapi.json")
print(r.status_code)
print("paths" in r.json())`,
          tests: [
            {
              id: 1,
              label: "Defines ping route",
              keywords: [{ pattern: '@app\\.get\\(\\s*"/ping"\\s*\\)' }],
            },
            {
              id: 2,
              label: "Requests /openapi.json",
              keywords: [{ pattern: 'client\\.get\\(\\s*"/openapi\\.json"\\s*\\)' }],
            },
            {
              id: 3,
              label: "Checks paths key",
              keywords: [{ pattern: '"paths"\\s+in\\s+r\\.json\\s*\\(' }],
            },
          ],
        },
      },
      {
        id: "fastapi-24",
        title: "Todo API Capstone",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Capstone time: combine request models, create/list routes, and testing into one mini Todo API.",
          },
          {
            type: "scenario",
            title: "Daily planner app",
            content:
              "Frontend must add todos with POST and load all todos with GET. This mirrors real mobile/web API behavior.",
          },
          {
            type: "table",
            title: "Capstone requirements",
            columns: ["Requirement", "Details"],
            rows: [
              { label: "POST /todos", values: ["POST /todos","Accept body with title"] },
              { label: "GET /todos", values: ["GET /todos","Return all todos"] },
              { label: "In-memory list", values: ["In-memory list","Store generated id + done flag"] },
              { label: "TestClient checks", values: ["TestClient checks","Print status and JSON results"] },
            ],
          },
          {
            type: "diagram",
            title: "Capstone flow",
            nodes: [
              {
                id: "post",
                label: "POST /todos",
                color: "#4db6ac",
                items: ["Validate body", "Assign id", "Append"],
              },
              {
                id: "store",
                label: "todos list",
                color: "#26a69a",
                items: ["Runtime memory"],
              },
              {
                id: "get",
                label: "GET /todos",
                color: "#009688",
                items: ["Return full array"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Full mini Todo API",
            content: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

class TodoIn(BaseModel):
    title: str

app = FastAPI()
todos = []

@app.post("/todos", status_code=201)
def create_todo(payload: TodoIn):
    todo = {"id": len(todos) + 1, "title": payload.title, "done": False}
    todos.append(todo)
    return todo

@app.get("/todos")
def list_todos():
    return todos

client = TestClient(app)
r1 = client.post("/todos", json={"title": "Finish FastAPI capstone"})
r2 = client.get("/todos")
print(r1.status_code, r1.json())
print(r2.status_code, r2.json())`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Learning outcomes: ship an end-to-end mini API with POST + GET, model validation, id generation, and runnable client checks.",
          },
          {
            type: "quiz",
            question:
              "Which two endpoints are the minimum required in this capstone?",
            options: [
              "PUT /todos and DELETE /todos/{id}",
              "POST /todos and GET /todos",
              "GET /docs and GET /openapi.json",
              "PATCH /todos/{id} and OPTIONS /todos",
            ],
            answer: 1,
            explanation:
              "Capstone asks for creating todos and listing todos as the core workflow.",
          },
        ],
        challenge: {
          title: "Build the complete Todo mini API",
          description:
            "Create a FastAPI app with `TodoIn(BaseModel)` and in-memory `todos = []`. Implement `POST /todos` (status 201, generates id, stores `title` + `done=False`) and `GET /todos` (returns all). Use TestClient to create one todo and then list todos. Print both status codes and JSON outputs.",
          starterCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()
todos = []

# Define TodoIn model
# Add POST /todos and GET /todos

client = TestClient(app)
`,
          solutionCode: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

class TodoIn(BaseModel):
    title: str

app = FastAPI()
todos = []

@app.post("/todos", status_code=201)
def create_todo(payload: TodoIn):
    todo = {"id": len(todos) + 1, "title": payload.title, "done": False}
    todos.append(todo)
    return todo

@app.get("/todos")
def list_todos():
    return todos

client = TestClient(app)
r1 = client.post("/todos", json={"title": "Write docs"})
r2 = client.get("/todos")
print(r1.status_code)
print(r1.json())
print(r2.status_code)
print(r2.json())`,
          tests: [
            {
              id: 1,
              label: "Defines TodoIn model",
              keywords: [{ pattern: "class\\s+TodoIn\\s*\\(\\s*BaseModel\\s*\\)" }],
            },
            {
              id: 2,
              label: "POST /todos with 201",
              keywords: [{ pattern: '@app\\.post\\(\\s*"/todos".*status_code\\s*=\\s*201' }],
            },
            {
              id: 3,
              label: "GET /todos route",
              keywords: [{ pattern: '@app\\.get\\(\\s*"/todos"\\s*\\)' }],
            },
            {
              id: 4,
              label: "Uses TestClient post and get",
              keywords: [
                { pattern: "client\\.post\\s*\\(\\s*\"/todos\"" },
                { pattern: "client\\.get\\s*\\(\\s*\"/todos\"" },
              ],
            },
          ],
        },
      },
    ],
  },
];

export const FASTAPI_LESSONS = applyLessonVideoLinks(
  FASTAPI_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      outcomes: l.outcomes ?? FASTAPI_LESSON_OUTCOMES[l.id] ?? [],
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  FASTAPI_VIDEO_LINKS,
);

export const FASTAPI_TOTAL_XP = FASTAPI_LESSONS.reduce((s, l) => s + l.xp, 0);
