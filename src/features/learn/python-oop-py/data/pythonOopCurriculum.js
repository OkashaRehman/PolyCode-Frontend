import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { PYTHON_OOP_VIDEO_LINKS } from "./pythonOopVideoLinks";
import { applyChapterEnhancements } from "./pythonOopLessonEnhancements";

const RAW_PYTHON_OOP_CHAPTERS = [
  {
    id: "foundations",
    title: "Foundations",
    icon: "🧱",
    color: "#7c3aed",
    lessons: [
      {
        id: "oop-0",
        title: "What Is OOP?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Object-oriented programming (OOP) models software as **objects** that combine data (state) and behavior (methods).",
          },
          {
            type: "text",
            content:
              "In Python, you define blueprints with `class`, then create concrete objects (instances) from them.",
          },
          {
            type: "diagram",
            title: "Blueprint to object",
            nodes: [
              {
                id: "class",
                label: "Class",
                color: "#6d28d9",
                items: ["Blueprint", "Defines attributes and methods"],
              },
              {
                id: "instance",
                label: "Instance",
                color: "#7c3aed",
                items: ["Created from class", "Stores unique state"],
              },
              {
                id: "method",
                label: "Method call",
                color: "#8b5cf6",
                items: ["instance.method()", "Behavior uses object state"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Tiny class example",
            content: `class Dog:
    def bark(self):
        print("Woof!")

pet = Dog()
pet.bark()`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "OOP is not about syntax tricks. It is about organizing code around meaningful domain entities.",
          },
          {
            type: "quiz",
            question: "What does a class represent in OOP?",
            options: [
              "A running process",
              "A blueprint for objects",
              "A Python package",
              "A test suite",
            ],
            answer: 1,
            explanation:
              "A class describes how objects should be structured and what behavior they expose.",
          },
        ],
        challenge: {
          title: "Create your first class",
          description:
            "Define class `Greeter` with method `greet` that prints `Hello OOP`. Create an instance and call the method.",
          starterCode: `# Write code here

`,
          solutionCode: `class Greeter:
    def greet(self):
        print("Hello OOP")

g = Greeter()
g.greet()`,
          tests: [
            {
              id: 1,
              label: "Defines class Greeter",
              keywords: [{ pattern: "class\\s+Greeter\\s*:" }],
            },
            {
              id: 2,
              label: "Defines greet method",
              keywords: [{ pattern: "def\\s+greet\\s*\\(\\s*self\\s*\\)" }],
            },
            {
              id: 3,
              label: "Calls greet",
              keywords: [{ pattern: "\\.greet\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "oop-0b",
        title: "Procedural vs OOP Thinking",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Procedural style organizes code around functions. OOP style organizes around objects that own both data and operations.",
          },
          {
            type: "diagram",
            title: "Two ways to model a bank account",
            nodes: [
              {
                id: "proc",
                label: "Procedural",
                color: "#6d28d9",
                items: ["balance as loose variable", "deposit(balance, amount)"],
              },
              {
                id: "oop",
                label: "OOP",
                color: "#7c3aed",
                items: ["account.balance", "account.deposit(amount)"],
              },
              {
                id: "impact",
                label: "Impact",
                color: "#8b5cf6",
                items: ["Better encapsulation", "Easier scaling for real systems"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Same behavior, different organization",
            content: `# Procedural
def deposit(balance, amount):
    return balance + amount

# OOP
class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use OOP when entities have evolving state and related operations (users, accounts, orders, game units).",
          },
          {
            type: "quiz",
            question: "Which is a key benefit of OOP over plain procedural code?",
            options: [
              "No need for functions",
              "Combining related data and behavior",
              "No need for testing",
              "Always fewer lines",
            ],
            answer: 1,
            explanation:
              "OOP keeps related state and operations together, which improves maintainability.",
          },
        ],
        challenge: {
          title: "Model account in OOP style",
          description:
            "Create class `BankAccount` with `balance` attribute and method `deposit(amount)` that updates balance and prints new balance.",
          starterCode: `# Build BankAccount class

`,
          solutionCode: `class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(self.balance)

acc = BankAccount(100)
acc.deposit(25)`,
          tests: [
            {
              id: 1,
              label: "Defines BankAccount class",
              keywords: [{ pattern: "class\\s+BankAccount\\s*:" }],
            },
            {
              id: 2,
              label: "Has deposit method",
              keywords: [{ pattern: "def\\s+deposit\\s*\\(" }],
            },
            {
              id: 3,
              label: "Uses self.balance state",
              keywords: [{ pattern: "self\\.balance" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "classes-objects",
    title: "Classes & Objects",
    icon: "🏗️",
    color: "#2563eb",
    lessons: [
      {
        id: "oop-1",
        title: "Defining Classes",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "A Python class groups attributes and methods under one type definition.",
          },
          {
            type: "diagram",
            title: "Class structure",
            nodes: [
              {
                id: "header",
                label: "class User:",
                color: "#1d4ed8",
                items: ["Type name", "PascalCase convention"],
              },
              {
                id: "attrs",
                label: "Attributes",
                color: "#2563eb",
                items: ["State fields", "Stored per object"],
              },
              {
                id: "methods",
                label: "Methods",
                color: "#3b82f6",
                items: ["Actions", "Operate on state"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "User class skeleton",
            content: `class User:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        print(f"I am {self.name}")`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Class names should describe domain meaning, not implementation details.",
          },
          {
            type: "quiz",
            question: "What is the Python keyword to define a class?",
            options: ["object", "class", "type", "defclass"],
            answer: 1,
            explanation: "`class` starts a class definition block.",
          },
        ],
        challenge: {
          title: "Create a User class",
          description:
            "Define class `User` with method `say_hi` that prints `Hi from user`.",
          starterCode: `# Write User class

`,
          solutionCode: `class User:
    def say_hi(self):
        print("Hi from user")

u = User()
u.say_hi()`,
          tests: [
            {
              id: 1,
              label: "Defines User class",
              keywords: [{ pattern: "class\\s+User\\s*:" }],
            },
            {
              id: 2,
              label: "Defines say_hi method",
              keywords: [{ pattern: "def\\s+say_hi\\s*\\(\\s*self\\s*\\)" }],
            },
          ],
        },
      },
      {
        id: "oop-1b",
        title: "Creating Instances",
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              "Instances are concrete objects created by calling a class like a function.",
          },
          {
            type: "diagram",
            title: "One class, many objects",
            nodes: [
              {
                id: "class",
                label: "User class",
                color: "#1d4ed8",
                items: ["Shared behavior", "Blueprint only"],
              },
              {
                id: "u1",
                label: "user_a instance",
                color: "#2563eb",
                items: ["Own state", "Independent values"],
              },
              {
                id: "u2",
                label: "user_b instance",
                color: "#3b82f6",
                items: ["Own state", "Same methods"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Multiple instances",
            content: `class User:
    def __init__(self, name):
        self.name = name

u1 = User("Ava")
u2 = User("Noah")
print(u1.name)
print(u2.name)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Instantiate whenever you need separate state for each real-world entity.",
          },
          {
            type: "quiz",
            question: "What does `u = User('Ava')` produce?",
            options: [
              "A method",
              "A module",
              "An instance of User",
              "A decorator",
            ],
            answer: 2,
            explanation: "Calling a class creates an object instance.",
          },
        ],
        challenge: {
          title: "Make two objects",
          description:
            "Create class `Animal` with `__init__(name)`. Create `dog` and `cat` instances, then print their names.",
          starterCode: `# Build class and instances

`,
          solutionCode: `class Animal:
    def __init__(self, name):
        self.name = name

dog = Animal("Dog")
cat = Animal("Cat")
print(dog.name)
print(cat.name)`,
          tests: [
            {
              id: 1,
              label: "Defines __init__ with name",
              keywords: [{ pattern: "def\\s+__init__\\s*\\(\\s*self\\s*,\\s*name\\s*\\)" }],
            },
            {
              id: 2,
              label: "Creates two Animal instances",
              keywords: [
                { pattern: "\\w+\\s*=\\s*Animal\\s*\\(" },
                { pattern: "\\w+\\s*=\\s*Animal\\s*\\(" },
              ],
            },
          ],
        },
      },
      {
        id: "oop-2",
        title: "Methods and self",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Instance methods receive `self` as the first parameter, referencing the current object.",
          },
          {
            type: "diagram",
            title: "Method call binding",
            nodes: [
              {
                id: "obj",
                label: "account object",
                color: "#1d4ed8",
                items: ["Has balance", "Calls deposit(50)"],
              },
              {
                id: "bind",
                label: "self binding",
                color: "#2563eb",
                items: ["self -> account", "method executes with account state"],
              },
              {
                id: "update",
                label: "State update",
                color: "#3b82f6",
                items: ["self.balance += 50", "object changes in place"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Using self in methods",
            content: `class Counter:
    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1
        print(self.value)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Forgetting `self` in method signatures is one of the most common beginner OOP errors.",
          },
          {
            type: "quiz",
            question: "What does `self` refer to inside an instance method?",
            options: [
              "The class name string",
              "The current object instance",
              "A global variable",
              "Python runtime",
            ],
            answer: 1,
            explanation: "`self` is the object that the method was called on.",
          },
        ],
        challenge: {
          title: "Update object state with self",
          description:
            "Create class `Counter` with `value=0` and method `increment` that increases value by 1 and prints it.",
          starterCode: `# Implement Counter

`,
          solutionCode: `class Counter:
    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1
        print(self.value)

c = Counter()
c.increment()`,
          tests: [
            {
              id: 1,
              label: "Uses self.value",
              keywords: [{ pattern: "self\\.value" }],
            },
            {
              id: 2,
              label: "Increments state",
              keywords: [{ pattern: "self\\.value\\s*\\+=\\s*1" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "constructors-state",
    title: "Constructors & State",
    icon: "🔧",
    color: "#0d9488",
    lessons: [
      {
        id: "oop-3",
        title: "__init__ Constructor Essentials",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "`__init__` initializes object state right after instance creation.",
          },
          {
            type: "diagram",
            title: "Object lifecycle",
            nodes: [
              {
                id: "create",
                label: "User(...) call",
                color: "#0f766e",
                items: ["Allocates object", "Invokes __init__"],
              },
              {
                id: "init",
                label: "__init__ runs",
                color: "#0d9488",
                items: ["Set attributes", "Validate inputs"],
              },
              {
                id: "ready",
                label: "Ready object",
                color: "#14b8a6",
                items: ["Consistent state", "Methods can safely run"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Constructor with parameters",
            content: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Prefer constructors that create valid objects immediately; avoid half-initialized instances.",
          },
          {
            type: "quiz",
            question: "When is `__init__` executed?",
            options: [
              "When class is defined",
              "When instance is created",
              "When module exits",
              "Only manually",
            ],
            answer: 1,
            explanation: "`__init__` runs automatically on instance creation.",
          },
        ],
        challenge: {
          title: "Build a constructor",
          description:
            "Create class `Book` with constructor arguments `title` and `author`. Save both on `self` and print one book's title.",
          starterCode: `# Write Book class

`,
          solutionCode: `class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

b = Book("1984", "George Orwell")
print(b.title)`,
          tests: [
            {
              id: 1,
              label: "Defines __init__ with title and author",
              keywords: [
                {
                  pattern:
                    "def\\s+__init__\\s*\\(\\s*self\\s*,\\s*title\\s*,\\s*author\\s*\\)",
                },
              ],
            },
            {
              id: 2,
              label: "Assigns both attributes",
              keywords: ["self.title", "self.author"],
            },
          ],
        },
      },
      {
        id: "oop-3b",
        title: "Input Validation in Constructors",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Validation in `__init__` protects your objects from invalid states from the beginning.",
          },
          {
            type: "diagram",
            title: "Validation gate",
            nodes: [
              {
                id: "input",
                label: "Raw input",
                color: "#0f766e",
                items: ["user age", "price", "email"],
              },
              {
                id: "rules",
                label: "Validation rules",
                color: "#0d9488",
                items: [">= 0 checks", "type checks", "raise errors if invalid"],
              },
              {
                id: "state",
                label: "Safe state",
                color: "#14b8a6",
                items: ["Object remains reliable", "Methods assume invariants"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Age validation",
            content: `class User:
    def __init__(self, name, age):
        if age < 0:
            raise ValueError("age cannot be negative")
        self.name = name
        self.age = age`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Invalid state today becomes hard-to-debug production bugs tomorrow. Validate early.",
          },
          {
            type: "quiz",
            question: "What is a good action when constructor input is invalid?",
            options: [
              "Ignore it silently",
              "Set random defaults",
              "Raise an exception",
              "Exit Python",
            ],
            answer: 2,
            explanation: "Exceptions make invalid object creation explicit and safe.",
          },
        ],
        challenge: {
          title: "Validate price",
          description:
            "Create class `Item` with `name` and `price`. Raise `ValueError` if price is negative, otherwise store fields.",
          starterCode: `# Validate in constructor

`,
          solutionCode: `class Item:
    def __init__(self, name, price):
        if price < 0:
            raise ValueError("price must be non-negative")
        self.name = name
        self.price = price

item = Item("Pen", 2.5)
print(item.price)`,
          tests: [
            {
              id: 1,
              label: "Checks for negative price",
              keywords: [{ pattern: "if\\s+price\\s*<\\s*0" }],
            },
            {
              id: 2,
              label: "Raises ValueError",
              keywords: [{ pattern: "raise\\s+ValueError" }],
            },
          ],
        },
      },
      {
        id: "oop-4",
        title: "Class Attributes vs Instance Attributes",
        xp: 17,
        theory: [
          {
            type: "text",
            content:
              "Instance attributes belong to each object. Class attributes are shared across all instances.",
          },
          {
            type: "diagram",
            title: "Shared vs per-object data",
            nodes: [
              {
                id: "classattr",
                label: "Class attribute",
                color: "#0f766e",
                items: ["Dog.species = 'Canis'", "Shared by every Dog"],
              },
              {
                id: "insta",
                label: "Instance attribute",
                color: "#0d9488",
                items: ["dog1.name", "dog2.name"],
              },
              {
                id: "use",
                label: "Use guideline",
                color: "#14b8a6",
                items: ["Class-level constants", "Per-object mutable state"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Attribute types",
            content: `class Dog:
    species = "Canis familiaris"

    def __init__(self, name):
        self.name = name`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use class attributes for data that should remain identical for all instances.",
          },
          {
            type: "quiz",
            question: "Where should unique object state be stored?",
            options: [
              "Class attribute",
              "Global variable",
              "Instance attribute on self",
              "Decorator",
            ],
            answer: 2,
            explanation: "Unique values belong on each instance (`self.attr`).",
          },
        ],
        challenge: {
          title: "Use both attribute types",
          description:
            "Create class `Car` with class attribute `wheels=4` and instance attribute `model`. Create two cars and print both models plus wheels.",
          starterCode: `# Define Car class

`,
          solutionCode: `class Car:
    wheels = 4

    def __init__(self, model):
        self.model = model

c1 = Car("Sedan")
c2 = Car("SUV")
print(c1.model, c2.model, Car.wheels)`,
          tests: [
            {
              id: 1,
              label: "Defines class attribute wheels",
              keywords: [{ pattern: "wheels\\s*=\\s*4" }],
            },
            {
              id: 2,
              label: "Defines instance model",
              keywords: [{ pattern: "self\\.model\\s*=\\s*model" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "encapsulation",
    title: "Encapsulation",
    icon: "🔒",
    color: "#dc2626",
    lessons: [
      {
        id: "oop-5",
        title: "Encapsulation and Naming Conventions",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Encapsulation means controlling access to internal state and exposing a clean public interface.",
          },
          {
            type: "diagram",
            title: "Public vs internal members",
            nodes: [
              {
                id: "public",
                label: "Public API",
                color: "#b91c1c",
                items: ["deposit()", "withdraw()", "balance property"],
              },
              {
                id: "internal",
                label: "_internal details",
                color: "#dc2626",
                items: ["_transactions", "_validate_amount"],
              },
              {
                id: "benefit",
                label: "Benefit",
                color: "#ef4444",
                items: ["Safer changes", "Clear usage boundaries"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Single underscore convention",
            content: `class BankAccount:
    def __init__(self):
        self._balance = 0  # internal use

    def deposit(self, amount):
        self._balance += amount`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "In Python, `_name` is a convention for internal use; it is not strict privacy.",
          },
          {
            type: "quiz",
            question:
              "What does a leading underscore (`_balance`) usually indicate in Python?",
            options: [
              "Private by compiler enforcement",
              "Internal/protected-by-convention",
              "Global constant",
              "Deprecated syntax",
            ],
            answer: 1,
            explanation:
              "It signals internal usage by convention rather than hard enforcement.",
          },
        ],
        challenge: {
          title: "Hide balance by convention",
          description:
            "Create `BankAccount` with internal `_balance=0` and a public `deposit(amount)` method that updates and prints `_balance`.",
          starterCode: `# Encapsulation practice

`,
          solutionCode: `class BankAccount:
    def __init__(self):
        self._balance = 0

    def deposit(self, amount):
        self._balance += amount
        print(self._balance)

acc = BankAccount()
acc.deposit(50)`,
          tests: [
            {
              id: 1,
              label: "Uses _balance internal field",
              keywords: [{ pattern: "self\\._balance" }],
            },
            {
              id: 2,
              label: "Has deposit method",
              keywords: [{ pattern: "def\\s+deposit\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "oop-5b",
        title: "Using @property for Read Access",
        xp: 17,
        theory: [
          {
            type: "text",
            content:
              "`@property` lets you expose method logic like an attribute, improving API ergonomics while keeping control.",
          },
          {
            type: "diagram",
            title: "Property access flow",
            nodes: [
              {
                id: "caller",
                label: "client code",
                color: "#b91c1c",
                items: ["user.age", "no parentheses needed"],
              },
              {
                id: "prop",
                label: "@property method",
                color: "#dc2626",
                items: ["computed or validated", "read-only if no setter"],
              },
              {
                id: "state",
                label: "_age storage",
                color: "#ef4444",
                items: ["internal field", "keeps implementation flexible"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Read-only property",
            content: `class User:
    def __init__(self, age):
        self._age = age

    @property
    def age(self):
        return self._age`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Properties are perfect when you need backward-compatible APIs with internal logic.",
          },
          {
            type: "quiz",
            question: "How is a property accessed?",
            options: [
              "obj.prop() only",
              "obj->prop",
              "obj.prop",
              "Class.prop(obj)",
            ],
            answer: 2,
            explanation:
              "Properties are accessed like attributes (`obj.prop`) while running method logic.",
          },
        ],
        challenge: {
          title: "Expose read-only score",
          description:
            "Create class `Player` with internal `_score`, constructor parameter `score`, and `@property score` returning `_score`. Print `player.score`.",
          starterCode: `# Build Player with property

`,
          solutionCode: `class Player:
    def __init__(self, score):
        self._score = score

    @property
    def score(self):
        return self._score

p = Player(99)
print(p.score)`,
          tests: [
            {
              id: 1,
              label: "Uses @property decorator",
              keywords: ["@property"],
            },
            {
              id: 2,
              label: "Returns internal _score",
              keywords: [{ pattern: "return\\s+self\\._score" }],
            },
          ],
        },
      },
      {
        id: "oop-6",
        title: "Setters and Controlled Mutation",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Setter properties allow controlled updates with validation rules.",
          },
          {
            type: "diagram",
            title: "Controlled write path",
            nodes: [
              {
                id: "write",
                label: "obj.level = value",
                color: "#b91c1c",
                items: ["External write request"],
              },
              {
                id: "setter",
                label: "@level.setter",
                color: "#dc2626",
                items: ["Validates constraints", "Raises error if invalid"],
              },
              {
                id: "store",
                label: "self._level",
                color: "#ef4444",
                items: ["Safe stored state"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Setter validation",
            content: `class Thermostat:
    def __init__(self, temp):
        self._temp = temp

    @property
    def temp(self):
        return self._temp

    @temp.setter
    def temp(self, value):
        if value < 10 or value > 30:
            raise ValueError("temp out of range")
        self._temp = value`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Setters should enforce invariants. Never allow writes that break object correctness.",
          },
          {
            type: "quiz",
            question: "Why use a setter property?",
            options: [
              "To remove all validation",
              "To validate and control assignment",
              "To speed up loops automatically",
              "To avoid constructors",
            ],
            answer: 1,
            explanation:
              "Setters let you keep attribute-like syntax while enforcing rules.",
          },
        ],
        challenge: {
          title: "Validate age with setter",
          description:
            "Create class `Person` with property `age` and setter that rejects negative values by raising `ValueError`.",
          starterCode: `# Implement property with setter

`,
          solutionCode: `class Person:
    def __init__(self, age):
        self._age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("age cannot be negative")
        self._age = value

p = Person(20)
p.age = 21
print(p.age)`,
          tests: [
            {
              id: 1,
              label: "Defines setter",
              keywords: [{ pattern: "@age\\.setter" }],
            },
            {
              id: 2,
              label: "Rejects negative values",
              keywords: [{ pattern: "if\\s+value\\s*<\\s*0" }, "ValueError"],
            },
          ],
        },
      },
    ],
  },
  {
    id: "inheritance",
    title: "Inheritance",
    icon: "🧬",
    color: "#ea580c",
    lessons: [
      {
        id: "oop-7",
        title: "Inheritance Basics",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Inheritance lets a subclass reuse and extend behavior from a parent class.",
          },
          {
            type: "diagram",
            title: "Animal hierarchy",
            nodes: [
              {
                id: "animal",
                label: "Animal (base)",
                color: "#c2410c",
                items: ["eat()", "sleep()"],
              },
              {
                id: "dog",
                label: "Dog (derived)",
                color: "#ea580c",
                items: ["inherits Animal", "adds bark()"],
              },
              {
                id: "cat",
                label: "Cat (derived)",
                color: "#fb923c",
                items: ["inherits Animal", "adds meow()"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Subclass declaration",
            content: `class Animal:
    def speak(self):
        print("Some sound")

class Dog(Animal):
    def bark(self):
        print("Woof")`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Use inheritance for true is-a relationships. Prefer composition for has-a relationships.",
          },
          {
            type: "quiz",
            question: "What does `class Dog(Animal):` mean?",
            options: [
              "Dog deletes Animal methods",
              "Dog inherits from Animal",
              "Dog is unrelated to Animal",
              "Dog is a function",
            ],
            answer: 1,
            explanation: "Parent class methods become available to Dog instances.",
          },
        ],
        challenge: {
          title: "Inherit from Animal",
          description:
            "Create class `Animal` with method `speak`, class `Dog(Animal)` with method `bark`. Instantiate `Dog` and call both methods.",
          starterCode: `# Write inheritance example

`,
          solutionCode: `class Animal:
    def speak(self):
        print("sound")

class Dog(Animal):
    def bark(self):
        print("woof")

d = Dog()
d.speak()
d.bark()`,
          tests: [
            {
              id: 1,
              label: "Defines subclass Dog(Animal)",
              keywords: [{ pattern: "class\\s+Dog\\s*\\(\\s*Animal\\s*\\)\\s*:" }],
            },
            {
              id: 2,
              label: "Calls inherited method",
              keywords: [{ pattern: "\\.speak\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "oop-7b",
        title: "Using super()",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "`super()` calls parent implementations, especially useful for extending constructors and overridden methods.",
          },
          {
            type: "diagram",
            title: "Constructor chaining",
            nodes: [
              {
                id: "child",
                label: "Dog.__init__",
                color: "#c2410c",
                items: ["receives name, breed"],
              },
              {
                id: "super",
                label: "super().__init__(name)",
                color: "#ea580c",
                items: ["initialize parent fields"],
              },
              {
                id: "extra",
                label: "child-specific state",
                color: "#fb923c",
                items: ["self.breed = breed"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "super in subclass",
            content: `class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Using `super()` keeps inheritance chains cooperative and avoids duplicate initialization logic.",
          },
          {
            type: "quiz",
            question: "What is a common use of `super()` in OOP?",
            options: [
              "Delete parent class",
              "Call parent method/constructor",
              "Import modules",
              "Create static methods",
            ],
            answer: 1,
            explanation:
              "`super()` delegates to the next class in the method resolution order.",
          },
        ],
        challenge: {
          title: "Chain constructors with super",
          description:
            "Create class `Vehicle` with `brand` in `__init__`. Create subclass `Car(Vehicle)` adding `model` and call `super().__init__(brand)`.",
          starterCode: `# Use super in subclass constructor

`,
          solutionCode: `class Vehicle:
    def __init__(self, brand):
        self.brand = brand

class Car(Vehicle):
    def __init__(self, brand, model):
        super().__init__(brand)
        self.model = model

c = Car("Toyota", "Corolla")
print(c.brand, c.model)`,
          tests: [
            {
              id: 1,
              label: "Uses super().__init__",
              keywords: [{ pattern: "super\\s*\\(\\s*\\)\\s*\\.\\s*__init__\\s*\\(" }],
            },
            {
              id: 2,
              label: "Defines Car(Vehicle)",
              keywords: [{ pattern: "class\\s+Car\\s*\\(\\s*Vehicle\\s*\\)" }],
            },
          ],
        },
      },
      {
        id: "oop-8",
        title: "Method Resolution Order (MRO)",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "MRO defines the order Python uses to search for methods in inheritance hierarchies, especially multiple inheritance.",
          },
          {
            type: "diagram",
            title: "Multiple inheritance lookup",
            nodes: [
              {
                id: "d",
                label: "D(B, C)",
                color: "#c2410c",
                items: ["calls d.method()"],
              },
              {
                id: "mro",
                label: "MRO order",
                color: "#ea580c",
                items: ["D -> B -> C -> A -> object"],
              },
              {
                id: "pick",
                label: "First match wins",
                color: "#fb923c",
                items: ["method selected by order"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Inspect MRO",
            content: `class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass

print(D.mro())`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Multiple inheritance is powerful but can confuse design. Keep hierarchies intentional and simple.",
          },
          {
            type: "quiz",
            question: "What does MRO stand for?",
            options: [
              "Method Return Operation",
              "Model Runtime Object",
              "Method Resolution Order",
              "Memory Reference Offset",
            ],
            answer: 2,
            explanation:
              "MRO is the lookup sequence used when resolving methods/attributes.",
          },
        ],
        challenge: {
          title: "Show MRO in action",
          description:
            "Create classes `A`, `B(A)`, `C(A)`, `D(B, C)`. Print `D.mro()` to inspect lookup order.",
          starterCode: `# Define classes and print MRO

`,
          solutionCode: `class A:
    pass

class B(A):
    pass

class C(A):
    pass

class D(B, C):
    pass

print(D.mro())`,
          tests: [
            {
              id: 1,
              label: "Defines D(B, C)",
              keywords: [{ pattern: "class\\s+D\\s*\\(\\s*B\\s*,\\s*C\\s*\\)\\s*:" }],
            },
            {
              id: 2,
              label: "Prints mro",
              keywords: [{ pattern: "D\\.mro\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "polymorphism",
    title: "Polymorphism",
    icon: "🎭",
    color: "#9333ea",
    lessons: [
      {
        id: "oop-9",
        title: "Duck Typing in Python",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Duck typing means objects are used based on behavior, not strict declared type: if it quacks, it is a duck.",
          },
          {
            type: "diagram",
            title: "Behavior-based compatibility",
            nodes: [
              {
                id: "func",
                label: "play_sound(obj)",
                color: "#7e22ce",
                items: ["calls obj.sound()"],
              },
              {
                id: "dog",
                label: "Dog object",
                color: "#9333ea",
                items: ["implements sound()"],
              },
              {
                id: "cat",
                label: "Cat object",
                color: "#a855f7",
                items: ["implements sound() too"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Duck typing function",
            content: `class Dog:
    def sound(self):
        print("Woof")

class Cat:
    def sound(self):
        print("Meow")

def make_sound(animal):
    animal.sound()`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Duck typing enables flexible APIs, but document expected behavior clearly.",
          },
          {
            type: "quiz",
            question: "Duck typing focuses on what?",
            options: [
              "Class inheritance only",
              "Behavior/method availability",
              "Variable naming style",
              "Import paths",
            ],
            answer: 1,
            explanation:
              "Objects are accepted if they provide the needed methods/attributes.",
          },
        ],
        challenge: {
          title: "Polymorphic sound function",
          description:
            "Create classes `Dog` and `Cat` with `sound()` methods and function `make_sound(animal)` calling `animal.sound()`. Call with both objects.",
          starterCode: `# Implement duck typing example

`,
          solutionCode: `class Dog:
    def sound(self):
        print("Woof")

class Cat:
    def sound(self):
        print("Meow")

def make_sound(animal):
    animal.sound()

make_sound(Dog())
make_sound(Cat())`,
          tests: [
            {
              id: 1,
              label: "Defines make_sound(animal)",
              keywords: [{ pattern: "def\\s+make_sound\\s*\\(\\s*animal\\s*\\)" }],
            },
            {
              id: 2,
              label: "Calls animal.sound()",
              keywords: [{ pattern: "animal\\.sound\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "oop-9b",
        title: "Abstract Base Classes (ABC)",
        xp: 19,
        theory: [
          {
            type: "text",
            content:
              "Abstract base classes define required interfaces and prevent incomplete subclasses from being instantiated.",
          },
          {
            type: "diagram",
            title: "Contract-driven design",
            nodes: [
              {
                id: "abc",
                label: "Shape(ABC)",
                color: "#7e22ce",
                items: ["abstract area()", "enforces contract"],
              },
              {
                id: "circle",
                label: "Circle(Shape)",
                color: "#9333ea",
                items: ["implements area()"],
              },
              {
                id: "app",
                label: "Application code",
                color: "#a855f7",
                items: ["works with Shape interface"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "ABC example",
            content: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side * self.side`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "ABCs are useful when you need strict plugin-style contracts across teams or modules.",
          },
          {
            type: "quiz",
            question: "Which decorator marks an abstract method?",
            options: ["@override", "@abstract", "@abstractmethod", "@required"],
            answer: 2,
            explanation:
              "`@abstractmethod` marks methods that subclasses must implement.",
          },
        ],
        challenge: {
          title: "Create an abstract interface",
          description:
            "Define `Shape(ABC)` with abstract `area`. Implement `Rectangle(Shape)` with width/height and concrete `area` method. Print one area.",
          starterCode: `from abc import ABC, abstractmethod

# Implement Shape and Rectangle

`,
          solutionCode: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

r = Rectangle(3, 4)
print(r.area())`,
          tests: [
            {
              id: 1,
              label: "Uses ABC inheritance",
              keywords: [{ pattern: "class\\s+Shape\\s*\\(\\s*ABC\\s*\\)\\s*:" }],
            },
            {
              id: 2,
              label: "Uses @abstractmethod",
              keywords: ["@abstractmethod"],
            },
            {
              id: 3,
              label: "Rectangle implements area",
              keywords: [
                { pattern: "class\\s+Rectangle\\s*\\(\\s*Shape\\s*\\)" },
                { pattern: "def\\s+area\\s*\\(" },
              ],
            },
          ],
        },
      },
      {
        id: "oop-9c",
        title: "isinstance and Type Strategies",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "`isinstance(obj, Type)` checks type membership (including inheritance) and can support defensive logic.",
          },
          {
            type: "diagram",
            title: "Type-check decision path",
            nodes: [
              {
                id: "input",
                label: "Incoming object",
                color: "#7e22ce",
                items: ["unknown runtime type"],
              },
              {
                id: "check",
                label: "isinstance check",
                color: "#9333ea",
                items: ["if isinstance(...)", "select branch"],
              },
              {
                id: "branch",
                label: "Behavior",
                color: "#a855f7",
                items: ["call methods", "raise TypeError if unsupported"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Type-aware processor",
            content: `def process_value(v):
    if isinstance(v, (int, float)):
        print(v * 2)
    else:
        raise TypeError("number required")`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Prefer polymorphism first. Use `isinstance` when branching by type is truly necessary.",
          },
          {
            type: "quiz",
            question: "What does `isinstance(dog, Animal)` return for Dog subclass?",
            options: ["Always False", "Always True", "True for Dog inheriting Animal", "Raises error"],
            answer: 2,
            explanation:
              "Subclass instances satisfy parent type checks in `isinstance`.",
          },
        ],
        challenge: {
          title: "Guard numeric input",
          description:
            "Write function `double_if_number(value)` that prints doubled value for int/float and prints `invalid` for others.",
          starterCode: `# Write function

`,
          solutionCode: `def double_if_number(value):
    if isinstance(value, (int, float)):
        print(value * 2)
    else:
        print("invalid")

double_if_number(5)
double_if_number("x")`,
          tests: [
            {
              id: 1,
              label: "Uses isinstance",
              keywords: [{ pattern: "isinstance\\s*\\(" }],
            },
            {
              id: 2,
              label: "Handles int and float tuple",
              keywords: [{ pattern: "\\(\\s*int\\s*,\\s*float\\s*\\)" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "advanced-oop",
    title: "Advanced OOP",
    icon: "🚀",
    color: "#0891b2",
    lessons: [
      {
        id: "oop-10",
        title: "Dunder Methods and Object Protocols",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Dunder (double-underscore) methods customize built-in behavior like printing, addition, equality, and length.",
          },
          {
            type: "diagram",
            title: "Special method hooks",
            nodes: [
              {
                id: "str",
                label: "__str__",
                color: "#0e7490",
                items: ["human-readable print output"],
              },
              {
                id: "repr",
                label: "__repr__",
                color: "#0891b2",
                items: ["developer representation"],
              },
              {
                id: "eq",
                label: "__eq__",
                color: "#06b6d4",
                items: ["custom equality semantics"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Custom print behavior",
            content: `class User:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"User<{self.name}>"

print(User("Ava"))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Implement only dunder methods that map naturally to your domain model.",
          },
          {
            type: "quiz",
            question: "Which method customizes `print(obj)` output?",
            options: ["__len__", "__iter__", "__str__", "__call__"],
            answer: 2,
            explanation:
              "`print` uses `__str__` for human-readable representation.",
          },
        ],
        challenge: {
          title: "Implement __str__",
          description:
            "Create class `Task` with `title` and `__str__` returning `Task: <title>`. Print one Task object.",
          starterCode: `# Build Task class

`,
          solutionCode: `class Task:
    def __init__(self, title):
        self.title = title

    def __str__(self):
        return f"Task: {self.title}"

t = Task("Write tests")
print(t)`,
          tests: [
            {
              id: 1,
              label: "Defines __str__",
              keywords: [{ pattern: "def\\s+__str__\\s*\\(\\s*self\\s*\\)" }],
            },
            {
              id: 2,
              label: "Returns formatted string",
              keywords: [{ pattern: "return\\s+f?[\"']Task" }],
            },
          ],
        },
      },
      {
        id: "oop-10b",
        title: "classmethod and staticmethod",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`@classmethod` receives `cls` and is useful for alternative constructors. `@staticmethod` is a namespaced utility function.",
          },
          {
            type: "diagram",
            title: "Method types comparison",
            nodes: [
              {
                id: "inst",
                label: "Instance method",
                color: "#0e7490",
                items: ["first arg: self", "uses object state"],
              },
              {
                id: "cls",
                label: "Class method",
                color: "#0891b2",
                items: ["first arg: cls", "factory patterns"],
              },
              {
                id: "static",
                label: "Static method",
                color: "#06b6d4",
                items: ["no self/cls", "related utility logic"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Factory via classmethod",
            content: `class User:
    def __init__(self, username):
        self.username = username

    @classmethod
    def from_email(cls, email):
        name = email.split("@")[0]
        return cls(name)

    @staticmethod
    def valid_username(name):
        return len(name) >= 3`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Pick the simplest method type that matches your intent; avoid unnecessary decorators.",
          },
          {
            type: "quiz",
            question: "Which method type is best for alternate constructors?",
            options: ["instance method", "classmethod", "staticmethod", "property"],
            answer: 1,
            explanation:
              "Class methods can instantiate `cls`, supporting subclass-friendly factories.",
          },
        ],
        challenge: {
          title: "Add a class factory",
          description:
            "Create class `User` with `name`, classmethod `anonymous()` returning `User('guest')`, and staticmethod `is_valid(name)` checking len >= 3.",
          starterCode: `# Implement classmethod and staticmethod

`,
          solutionCode: `class User:
    def __init__(self, name):
        self.name = name

    @classmethod
    def anonymous(cls):
        return cls("guest")

    @staticmethod
    def is_valid(name):
        return len(name) >= 3

u = User.anonymous()
print(u.name)
print(User.is_valid("abc"))`,
          tests: [
            {
              id: 1,
              label: "Uses @classmethod",
              keywords: ["@classmethod"],
            },
            {
              id: 2,
              label: "Uses @staticmethod",
              keywords: ["@staticmethod"],
            },
            {
              id: 3,
              label: "Returns cls(...) in factory",
              keywords: [{ pattern: "return\\s+cls\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "oop-11",
        title: "Dataclasses for Boilerplate Reduction",
        xp: 21,
        theory: [
          {
            type: "text",
            content:
              "Dataclasses auto-generate constructors and representations for data-focused classes, reducing repetitive code.",
          },
          {
            type: "diagram",
            title: "Normal class vs dataclass",
            nodes: [
              {
                id: "normal",
                label: "Manual class",
                color: "#0e7490",
                items: ["write __init__", "__repr__", "__eq__ manually"],
              },
              {
                id: "dc",
                label: "@dataclass",
                color: "#0891b2",
                items: ["auto-generated methods", "cleaner models"],
              },
              {
                id: "use",
                label: "Best for",
                color: "#06b6d4",
                items: ["DTOs", "config objects", "domain records"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Simple dataclass",
            content: `from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

p = Point(1.5, 2.0)
print(p)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Dataclasses shine for classes that primarily store data rather than complex mutable behavior.",
          },
          {
            type: "quiz",
            question: "Which module provides `@dataclass`?",
            options: ["typing", "abc", "dataclasses", "collections"],
            answer: 2,
            explanation: "`@dataclass` is from Python's `dataclasses` module.",
          },
        ],
        challenge: {
          title: "Build a dataclass model",
          description:
            "Create dataclass `Book` with fields `title: str` and `pages: int`. Instantiate and print it.",
          starterCode: `# Use dataclass for Book

`,
          solutionCode: `from dataclasses import dataclass

@dataclass
class Book:
    title: str
    pages: int

b = Book("Clean Code", 464)
print(b)`,
          tests: [
            {
              id: 1,
              label: "Imports dataclass",
              keywords: [{ pattern: "from\\s+dataclasses\\s+import\\s+dataclass" }],
            },
            {
              id: 2,
              label: "Uses @dataclass decorator",
              keywords: ["@dataclass"],
            },
            {
              id: 3,
              label: "Defines Book class",
              keywords: [{ pattern: "class\\s+Book\\s*:" }],
            },
          ],
        },
      },
      {
        id: "oop-11b",
        title: "Composition Over Inheritance",
        xp: 22,
        theory: [
          {
            type: "text",
            content:
              "Composition builds complex behavior by combining objects, avoiding deep inheritance coupling.",
          },
          {
            type: "diagram",
            title: "Car has-a Engine",
            nodes: [
              {
                id: "engine",
                label: "Engine object",
                color: "#0e7490",
                items: ["start()", "stop()"],
              },
              {
                id: "car",
                label: "Car object",
                color: "#0891b2",
                items: ["holds engine", "delegates behavior"],
              },
              {
                id: "benefit",
                label: "Benefit",
                color: "#06b6d4",
                items: ["replace components", "better modularity"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Composition example",
            content: `class Engine:
    def start(self):
        print("Engine started")

class Car:
    def __init__(self, engine):
        self.engine = engine

    def start(self):
        self.engine.start()`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Deep inheritance trees often become rigid. Composition keeps systems more adaptable.",
          },
          {
            type: "quiz",
            question: "Composition represents which relationship?",
            options: ["is-a", "has-a", "imports-a", "inherits-only"],
            answer: 1,
            explanation:
              "Composition models objects containing or using other objects (has-a).",
          },
        ],
        challenge: {
          title: "Use composition in a game unit",
          description:
            "Create class `Weapon` with `attack()` print. Create class `Player` storing a weapon and method `attack()` delegating to weapon.",
          starterCode: `# Build composition example

`,
          solutionCode: `class Weapon:
    def attack(self):
        print("Slash!")

class Player:
    def __init__(self, weapon):
        self.weapon = weapon

    def attack(self):
        self.weapon.attack()

p = Player(Weapon())
p.attack()`,
          tests: [
            {
              id: 1,
              label: "Player stores weapon",
              keywords: [{ pattern: "self\\.weapon\\s*=\\s*weapon" }],
            },
            {
              id: 2,
              label: "Delegates attack to weapon",
              keywords: [{ pattern: "self\\.weapon\\.attack\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "design-mastery",
    title: "Design Mastery",
    icon: "🏁",
    color: "#4f46e5",
    lessons: [
      {
        id: "oop-12",
        title: "SOLID Principles in Python",
        xp: 22,
        theory: [
          {
            type: "text",
            content:
              "SOLID principles improve maintainability: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
          },
          {
            type: "diagram",
            title: "SOLID overview",
            nodes: [
              {
                id: "srp",
                label: "SRP",
                color: "#3730a3",
                items: ["one reason to change"],
              },
              {
                id: "ocp",
                label: "OCP",
                color: "#4f46e5",
                items: ["extend behavior, avoid modifying stable code"],
              },
              {
                id: "dip",
                label: "DIP",
                color: "#6366f1",
                items: ["depend on abstractions, not concretions"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "SRP-friendly split",
            content: `class Invoice:
    def __init__(self, total):
        self.total = total

class InvoicePrinter:
    def print(self, invoice):
        print(f"Invoice total: {invoice.total}")`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "SOLID is guidance, not strict law. Use it to reason about trade-offs, not as dogma.",
          },
          {
            type: "quiz",
            question: "What does SRP emphasize?",
            options: [
              "One class should do everything",
              "One class should have one responsibility",
              "All classes must inherit one base",
              "No functions allowed",
            ],
            answer: 1,
            explanation:
              "Single Responsibility Principle asks each class to have one primary purpose.",
          },
        ],
        challenge: {
          title: "Apply SRP with two classes",
          description:
            "Create class `Report` storing `content` and separate class `ReportSaver` with method `save(report)` printing `Saved: <content>`.",
          starterCode: `# Apply SRP

`,
          solutionCode: `class Report:
    def __init__(self, content):
        self.content = content

class ReportSaver:
    def save(self, report):
        print(f"Saved: {report.content}")

r = Report("Monthly KPIs")
ReportSaver().save(r)`,
          tests: [
            {
              id: 1,
              label: "Defines Report class",
              keywords: [{ pattern: "class\\s+Report\\s*:" }],
            },
            {
              id: 2,
              label: "Defines ReportSaver.save",
              keywords: [{ pattern: "class\\s+ReportSaver" }, { pattern: "def\\s+save\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "oop-13",
        title: "Core Design Patterns (Strategy, Factory)",
        xp: 23,
        theory: [
          {
            type: "text",
            content:
              "Design patterns provide reusable templates for common architecture problems.",
          },
          {
            type: "diagram",
            title: "Strategy and Factory",
            nodes: [
              {
                id: "strategy",
                label: "Strategy",
                color: "#3730a3",
                items: ["swap algorithms at runtime"],
              },
              {
                id: "factory",
                label: "Factory",
                color: "#4f46e5",
                items: ["centralized object creation"],
              },
              {
                id: "client",
                label: "Client",
                color: "#6366f1",
                items: ["depends on interface, not concrete class"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Simple factory pattern",
            content: `class Dog:
    def speak(self):
        return "Woof"

class Cat:
    def speak(self):
        return "Meow"

def animal_factory(kind):
    if kind == "dog":
        return Dog()
    return Cat()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Patterns are vocabulary for design decisions. Use only when they simplify change, not for ceremony.",
          },
          {
            type: "quiz",
            question: "What is the primary role of a factory?",
            options: [
              "Run unit tests",
              "Centralize object creation",
              "Store global variables",
              "Replace inheritance entirely",
            ],
            answer: 1,
            explanation:
              "Factory pattern encapsulates construction details behind one creation interface.",
          },
        ],
        challenge: {
          title: "Implement mini factory",
          description:
            "Create classes `EmailNotifier` and `SMSNotifier` each with `send()` print output. Write `notifier_factory(kind)` returning one based on `kind`.",
          starterCode: `# Implement factory pattern

`,
          solutionCode: `class EmailNotifier:
    def send(self):
        print("Email sent")

class SMSNotifier:
    def send(self):
        print("SMS sent")

def notifier_factory(kind):
    if kind == "email":
        return EmailNotifier()
    return SMSNotifier()

n = notifier_factory("email")
n.send()`,
          tests: [
            {
              id: 1,
              label: "Defines notifier_factory",
              keywords: [{ pattern: "def\\s+notifier_factory\\s*\\(" }],
            },
            {
              id: 2,
              label: "Returns EmailNotifier or SMSNotifier",
              keywords: ["EmailNotifier()", "SMSNotifier()"],
            },
          ],
        },
      },
      {
        id: "oop-14",
        title: "Capstone: Library Management System",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Capstone project: model a small library using multiple OOP concepts together (classes, encapsulation, composition, and polymorphic behaviors).",
          },
          {
            type: "diagram",
            title: "Library domain model",
            nodes: [
              {
                id: "book",
                label: "Book",
                color: "#3730a3",
                items: ["title", "author", "is_borrowed"],
              },
              {
                id: "member",
                label: "Member",
                color: "#4f46e5",
                items: ["name", "borrowed_books"],
              },
              {
                id: "library",
                label: "Library",
                color: "#6366f1",
                items: ["book catalog", "borrow/return rules"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Core interaction flow",
            content: `class Book:
    def __init__(self, title):
        self.title = title
        self.is_borrowed = False

class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)

    def borrow_book(self, title):
        for book in self.books:
            if book.title == title and not book.is_borrowed:
                book.is_borrowed = True
                print(f"Borrowed: {title}")
                return
        print("Unavailable")`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Capstones should enforce rules (no double borrow, clean return flow) and expose clear API methods.",
          },
          {
            type: "quiz",
            question: "Which class should coordinate borrow rules?",
            options: ["Book only", "Library service object", "Member only", "Any random function"],
            answer: 1,
            explanation:
              "Central policy logic belongs in a coordinating class like `Library`.",
          },
        ],
        challenge: {
          title: "Build mini library workflow",
          description:
            "Create `Book` and `Library` classes. `Library` must support `add_book(book)` and `borrow_book(title)` and print `Borrowed: <title>` if available, else `Unavailable`.",
          starterCode: `# Build Book and Library classes

`,
          solutionCode: `class Book:
    def __init__(self, title):
        self.title = title
        self.is_borrowed = False

class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)

    def borrow_book(self, title):
        for book in self.books:
            if book.title == title and not book.is_borrowed:
                book.is_borrowed = True
                print(f"Borrowed: {title}")
                return
        print("Unavailable")

lib = Library()
lib.add_book(Book("Dune"))
lib.borrow_book("Dune")
lib.borrow_book("Dune")`,
          tests: [
            {
              id: 1,
              label: "Defines Book and Library classes",
              keywords: ["class Book", "class Library"],
            },
            {
              id: 2,
              label: "Has add_book and borrow_book methods",
              keywords: ["def add_book", "def borrow_book"],
            },
            {
              id: 3,
              label: "Uses availability guard",
              keywords: [{ pattern: "not\\s+book\\.is_borrowed" }],
            },
          ],
        },
      },
      {
        id: "oop-15",
        title: "Python OOP Cheat Sheet",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "This final lesson consolidates high-value OOP patterns and syntax you will reuse in real projects and interviews.",
          },
          {
            type: "diagram",
            title: "OOP mastery map",
            nodes: [
              {
                id: "core",
                label: "Core",
                color: "#3730a3",
                items: ["class", "__init__", "self", "methods"],
              },
              {
                id: "mid",
                label: "Intermediate",
                color: "#4f46e5",
                items: ["inheritance", "properties", "polymorphism"],
              },
              {
                id: "adv",
                label: "Advanced",
                color: "#6366f1",
                items: ["dunder methods", "dataclasses", "SOLID"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Cheat sheet mini template",
            content: `from dataclasses import dataclass

@dataclass
class User:
    name: str

    def greet(self):
        print(f"Hi, {self.name}")

u = User("Ava")
u.greet()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "When designing a new model, ask: What is the object's responsibility? Which state must remain valid? Which API is public?",
          },
          {
            type: "quiz",
            question: "Which concept helps expose controlled read/write behavior?",
            options: ["lambda", "@property", "yield", "importlib"],
            answer: 1,
            explanation:
              "Properties allow attribute-like access while preserving validation and encapsulation.",
          },
        ],
        challenge: {
          title: "Final OOP synthesis",
          description:
            "Create class `User` with constructor `name`, property `name_upper` returning uppercase name, and method `greet()` printing `Hello <NAME>` using that property.",
          starterCode: `# Final synthesis

`,
          solutionCode: `class User:
    def __init__(self, name):
        self.name = name

    @property
    def name_upper(self):
        return self.name.upper()

    def greet(self):
        print(f"Hello {self.name_upper}")

u = User("fatima")
u.greet()`,
          tests: [
            {
              id: 1,
              label: "Defines name_upper property",
              keywords: ["@property", "def name_upper"],
            },
            {
              id: 2,
              label: "Uses upper transformation",
              keywords: [{ pattern: "\\.upper\\s*\\(" }],
            },
            {
              id: 3,
              label: "Greets with property",
              keywords: [{ pattern: "self\\.name_upper" }],
            },
          ],
        },
      },
    ],
  },
];

export const PYTHON_OOP_CHAPTERS = applyChapterEnhancements(RAW_PYTHON_OOP_CHAPTERS);

export const PYTHON_OOP_LESSONS = applyLessonVideoLinks(
  PYTHON_OOP_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  PYTHON_OOP_VIDEO_LINKS,
);

export const PYTHON_OOP_TOTAL_XP = PYTHON_OOP_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
