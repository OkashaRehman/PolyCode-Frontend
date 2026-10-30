// PolyCode — JavaScript OOP interactive course
// 5 chapters · 16 lessons · browser JavaScript OOP challenges
// YouTube links: edit jsOopsVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { JS_OOPS_VIDEO_LINKS } from "./jsOopsVideoLinks";

const ACCENT = "#8b5cf6";

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
      code: { lang: "javascript", ...codeBlock },
    };
  }
  return { type: "text", content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

export const JS_OOPS_CHAPTERS = [
  {
    id: "intro-oops",
    title: "Why Object-Oriented Programming?",
    icon: "🎯",
    color: ACCENT,
    lessons: [
      {
        id: "js-oops-0",
        title: "What is OOP?",
        xp: 10,
        theory: [
          text(
            "**Object-Oriented Programming (OOP)** is a way of organizing code using **objects** and **classes**. Instead of writing functions that float around, you bundle data and behavior together — just like the real world.",
            {
              label: "Objects describe real things",
              content: `// Real world: A car has properties and actions
const myCar = {
  brand: "Toyota",
  model: "Camry",
  fuelLevel: 50,
  drive() { console.log("Driving..."); },
};`,
            },
          ),
          text(
            "In OOP, a **class** is a blueprint for creating many objects of the same type. A **class** is like a template; an **object** is a specific instance you create from it.",
            {
              label: "Class blueprint vs object instance",
              content: `// Class = blueprint
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
}

// Objects = instances created from blueprint
const car1 = new Car("Toyota", "Camry");
const car2 = new Car("Honda", "Civic");`,
            },
          ),
          diagram("Four Pillars of OOP", [
            {
              id: "encap",
              label: "Encapsulation",
              color: ACCENT,
              items: ["Bundle data + methods", "Hide details", "Control access"],
            },
            {
              id: "abstrac",
              label: "Abstraction",
              color: "#a78bfa",
              items: ["Simplify complex", "Use without knowing inside", "Clear interface"],
            },
            {
              id: "inherit",
              label: "Inheritance",
              color: "#c4b5fd",
              items: ["Reuse code", "Extend classes", "Share behavior"],
            },
            {
              id: "poly",
              label: "Polymorphism",
              color: "#ddd6fe",
              items: ["Same name, different action", "Override methods", "Flexible code"],
            },
          ]),
          text(
            "OOP helps teams build **large apps** because it organizes code into logical pieces. Instead of 1,000 lines of tangled functions, you have clear objects: `User`, `Car`, `Bank`, etc.",
          ),
          callout(
            "tip",
            "You already know objects in JavaScript — `{ name: \"Ali\", greet() { ... } }`. Classes just formalize that and let you create many similar objects.",
          ),
          callout(
            "info",
            "JavaScript classes (ES6+) look similar to Java/C# but work differently. Understanding the differences matters in interviews and real projects.",
          ),
          quiz(
            "What is a class in OOP?",
            [
              "A function that prints output",
              "A blueprint for creating objects",
              "A way to hide functions",
              "A replacement for arrays",
            ],
            1,
            "A class defines the structure and behavior for all objects created from it.",
          ),
        ],
        challenge: {
          title: "First Object Instance",
          description:
            'Create a class `Person` with constructor taking `name`, then create an instance `person1 = new Person("Ali")` and log `person1.name`.',
          starterCode: `// class Person and instance creation

`,
          solutionCode: `class Person {
  constructor(name) {
    this.name = name;
  }
}
const person1 = new Person("Ali");
console.log(person1.name);`,
          tests: [
            { id: 1, label: "Defines class Person", keywords: [{ pattern: "class\\s+Person" }] },
            { id: 2, label: "Uses constructor", keywords: [{ pattern: "constructor\\s*\\(" }] },
            { id: 3, label: "Creates instance with new", keywords: [{ pattern: "new\\s+Person" }] },
            { id: 4, label: "Logs person1.name", keywords: [{ pattern: "console\\.log\\s*\\(\\s*person1\\.name\\s*\\)" }] },
          ],
        },
      },
      {
        id: "js-oops-1",
        title: "Classes & constructors",
        xp: 12,
        theory: [
          text(
            "A **class** is declared with the `class` keyword. The **constructor** is a special method that runs when you create a new object with `new`. It sets up initial properties.",
            {
              label: "Basic class structure",
              content: `class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
    this.tricks = [];
  }
}

const myDog = new Dog("Buddy", "Golden Retriever");
console.log(myDog.name);   // Buddy
console.log(myDog.breed);  // Golden Retriever`,
            },
          ),
          text(
            "**this** refers to the object being created. Use `this.propertyName` to set and read properties on that specific instance. Each object gets its own copy of properties.",
            {
              label: "Each instance is independent",
              content: `const dog1 = new Dog("Buddy", "Golden");
const dog2 = new Dog("Max", "Labrador");

console.log(dog1.name); // Buddy
console.log(dog2.name); // Max
// dog1 and dog2 are completely separate objects`,
            },
          ),
          diagram("What happens with new", [
            {
              id: "new",
              label: "new Dog(...)",
              color: ACCENT,
              items: ["Create empty object", "Set this = object"],
            },
            {
              id: "cons",
              label: "constructor runs",
              color: "#a78bfa",
              items: ["Set properties", "Do setup work"],
            },
            {
              id: "return",
              label: "Return object",
              color: "#c4b5fd",
              items: ["myDog = result", "Ready to use"],
            },
          ]),
          callout(
            "warning",
            "Without `new`, calling the class as a function is an error. Always use `new` to create instances.",
          ),
          callout(
            "tip",
            "Property names in constructor go after `this.` — `this.name`, `this.age`, etc. Think of them as labels on the object.",
          ),
          quiz(
            "What does the constructor method do?",
            [
              "It builds the class blueprint",
              "It runs when you create a new instance",
              "It replaces the old object",
              "It deletes properties",
            ],
            1,
            "constructor runs automatically each time you use new ClassName(...).",
          ),
        ],
        challenge: {
          title: "Book Class",
          description:
            'Create a `Book` class with constructor taking `title` and `author`, then create `book1 = new Book("1984", "Orwell")` and log both properties.',
          starterCode: `// class Book with constructor

`,
          solutionCode: `class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
const book1 = new Book("1984", "Orwell");
console.log(book1.title);
console.log(book1.author);`,
          tests: [
            { id: 1, label: "Defines class Book", keywords: [{ pattern: "class\\s+Book" }] },
            { id: 2, label: "Sets this.title", keywords: [{ pattern: "this\\.title" }] },
            { id: 3, label: "Sets this.author", keywords: [{ pattern: "this\\.author" }] },
            { id: 4, label: "Creates instance", keywords: [{ pattern: "new\\s+Book" }] },
          ],
        },
      },
      {
        id: "js-oops-2",
        title: "Methods",
        xp: 14,
        theory: [
          text(
            "**Methods** are functions inside a class. They use `this` to access the object's properties. Methods describe **what an object can do**.",
            {
              label: "A dog that barks",
              content: `class Dog {
  constructor(name) {
    this.name = name;
  }
  
  bark() {
    console.log(this.name + " says woof!");
  }
}

const myDog = new Dog("Buddy");
myDog.bark(); // Buddy says woof!`,
            },
          ),
          text(
            "Methods can **access and modify** properties on `this`. A method can take parameters just like a regular function — they're tied to that object.",
            {
              label: "Method with parameters",
              content: `class Dog {
  constructor(name) {
    this.name = name;
    this.tricks = 0;
  }
  
  learn(trickName) {
    this.tricks += 1;
    console.log(this.name + " learned " + trickName);
  }
}

const dog = new Dog("Max");
dog.learn("sit");
dog.learn("fetch");
console.log(dog.tricks); // 2`,
            },
          ),
          diagram("Methods bind object to action", [
            {
              id: "obj",
              label: "Object",
              color: ACCENT,
              items: ["dog (name: Max)", "tricks: 2"],
            },
            {
              id: "method",
              label: "Method call",
              color: "#a78bfa",
              items: ["dog.learn()", "Uses this.tricks"],
            },
          ]),
          callout(
            "tip",
            "Inside a method, `this` always means \"this object.\" When Max barks, `this.name` is \"Max\". When Buddy barks, `this.name` is \"Buddy\".",
          ),
          callout(
            "info",
            "In class syntax, you don't write `bark: function() {...}` — just `bark() {...}` is shorthand and cleaner.",
          ),
          quiz(
            "What does this refer to inside a method?",
            [
              "The class blueprint",
              "The specific object the method was called on",
              "All objects of that class",
              "A global object",
            ],
            1,
            "this always refers to the individual instance (object) calling the method.",
          ),
        ],
        challenge: {
          title: "Calculator Add",
          description:
            "Create a `Calculator` class with a method `add(a, b)` that returns `a + b`. Create an instance and call `add(5, 3)` in a console.log.",
          starterCode: `// class Calculator with add method

`,
          solutionCode: `class Calculator {
  add(a, b) {
    return a + b;
  }
}
const calc = new Calculator();
console.log(calc.add(5, 3));`,
          tests: [
            { id: 1, label: "Defines Calculator class", keywords: [{ pattern: "class\\s+Calculator" }] },
            { id: 2, label: "Defines add method", keywords: [{ pattern: "add\\s*\\(" }] },
            { id: 3, label: "Returns a + b", keywords: [{ pattern: "return\\s+a\\s*\\+\\s*b" }] },
            { id: 4, label: "Creates instance and calls", keywords: [{ pattern: "new\\s+Calculator" }] },
          ],
        },
      },
    ],
  },
  {
    id: "inheritance",
    title: "Inheritance & Extending",
    icon: "🌳",
    color: "#06b6d4",
    lessons: [
      {
        id: "js-oops-3",
        title: "extends & super",
        xp: 14,
        theory: [
          text(
            "**Inheritance** lets one class reuse and extend another. Use `extends` to inherit from a **parent class** — the child class gets all parent methods and properties.",
            {
              label: "Animal parent, Dog child",
              content: `class Animal {
  constructor(name) {
    this.name = name;
  }
  
  move() {
    console.log(this.name + " is moving");
  }
}

class Dog extends Animal {
  bark() {
    console.log(this.name + " barks!");
  }
}

const dog = new Dog("Buddy");
dog.move();  // Buddy is moving (inherited)
dog.bark();  // Buddy barks! (own method)`,
            },
          ),
          text(
            "**super** calls the parent class's constructor or methods. In a child constructor, use `super(...)` to initialize parent properties before adding your own.",
            {
              label: "super in constructor",
              content: `class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super(brand);  // Initialize parent
    this.model = model;  // Add child property
  }
}

const myCar = new Car("Toyota", "Camry");
console.log(myCar.brand);  // Toyota
console.log(myCar.model);  // Camry`,
            },
          ),
          diagram("Class hierarchy", [
            {
              id: "parent",
              label: "Parent (Animal)",
              color: ACCENT,
              items: ["constructor", "move()"],
            },
            {
              id: "child",
              label: "Child (Dog)",
              color: "#06b6d4",
              items: ["constructor calls super", "bark() (new method)"],
            },
          ]),
          callout(
            "tip",
            "Use inheritance when a real relationship exists: \"A Dog IS-A Animal\" → use extends. If just sharing some methods, reconsider or use composition.",
          ),
          callout(
            "warning",
            "Always call `super()` in a child constructor before using `this` — the parent sets up foundational properties.",
          ),
          quiz(
            "What keyword extends a parent class?",
            ["inherit", "extends", "parent", "super"],
            1,
            "extends creates an inheritance relationship: class Child extends Parent { ... }",
          ),
        ],
        challenge: {
          title: "Student from Person",
          description:
            "Create `Person` class with constructor(name). Create `Student` extends Person with constructor(name, studentId) using super. Create instance and log both.",
          starterCode: `// class Person and class Student extends Person

`,
          solutionCode: `class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, studentId) {
    super(name);
    this.studentId = studentId;
  }
}

const student = new Student("Ali", "S12345");
console.log(student.name);
console.log(student.studentId);`,
          tests: [
            { id: 1, label: "Defines Person class", keywords: [{ pattern: "class\\s+Person" }] },
            { id: 2, label: "Student extends Person", keywords: [{ pattern: "class\\s+Student\\s+extends\\s+Person" }] },
            { id: 3, label: "Calls super", keywords: [{ pattern: "super\\s*\\(" }] },
            { id: 4, label: "Sets studentId", keywords: [{ pattern: "this\\.studentId" }] },
          ],
        },
      },
      {
        id: "js-oops-4",
        title: "Override methods",
        xp: 16,
        theory: [
          text(
            "A **child class** can override (redefine) a parent method to change its behavior. This is **polymorphism** in action — same method name, different results.",
            {
              label: "Dog overrides the sound",
              content: `class Animal {
  sound() {
    return "some sound";
  }
}

class Dog extends Animal {
  sound() {  // Override parent method
    return "Woof!";
  }
}

class Cat extends Animal {
  sound() {
    return "Meow!";
  }
}

const dog = new Dog();
const cat = new Cat();
console.log(dog.sound()); // Woof!
console.log(cat.sound()); // Meow!`,
            },
          ),
          text(
            "You can call the parent's version with `super.methodName()` if you want to extend (not fully replace) the parent behavior.",
            {
              label: "Extend parent behavior with super",
              content: `class Vehicle {
  describe() {
    return "I am a vehicle";
  }
}

class Car extends Vehicle {
  describe() {
    return super.describe() + " and specifically a car";
  }
}

const car = new Car();
console.log(car.describe());
// I am a vehicle and specifically a car`,
            },
          ),
          diagram("Override vs extend parent", [
            {
              id: "override",
              label: "Override",
              color: ACCENT,
              items: ["Replace method", "Dog.sound() = Woof"],
            },
            {
              id: "extend",
              label: "Extend with super",
              color: "#06b6d4",
              items: ["Call parent", "Add custom behavior"],
            },
          ]),
          callout(
            "tip",
            "Override when the child's version is fundamentally different. Use super when you want to reuse parent logic plus add more.",
          ),
          quiz(
            "What happens if a child class defines a method the parent also has?",
            [
              "Error — methods conflict",
              "Child method overrides (replaces) parent",
              "Both methods run together",
              "Parent method always wins",
            ],
            1,
            "The child's version overrides the parent's — polymorphism in action.",
          ),
        ],
        challenge: {
          title: "Student Greet Override",
          description:
            "Person class with greet() returning \"Hello, I'm [name]\". Student extends and overrides greet() to return \"Hello, I'm [name], student ID [id]\".",
          starterCode: `// class Person and Student with overridden greet

`,
          solutionCode: `class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return "Hello, I'm " + this.name;
  }
}

class Student extends Person {
  constructor(name, studentId) {
    super(name);
    this.studentId = studentId;
  }
  
  greet() {
    return "Hello, I'm " + this.name + ", student ID " + this.studentId;
  }
}

const student = new Student("Ali", "S001");
console.log(student.greet());`,
          tests: [
            { id: 1, label: "Person has greet", keywords: [{ pattern: "greet\\s*\\(" }] },
            { id: 2, label: "Student overrides greet", keywords: [{ pattern: "class\\s+Student.*greet" }] },
            { id: 3, label: "Returns with studentId", keywords: [{ pattern: "this\\.studentId" }] },
          ],
        },
      },
      {
        id: "js-oops-5",
        title: "Composition over inheritance",
        xp: 16,
        theory: [
          text(
            "**Composition** means using objects as properties instead of inheriting. Sometimes a class **has-a** thing rather than **is-a** thing. Example: a Car **has** an Engine, not \"is\" an Engine.",
            {
              label: "Composition: Car has Engine",
              content: `class Engine {
  start() {
    return "Engine started";
  }
}

class Car {
  constructor(brand) {
    this.brand = brand;
    this.engine = new Engine(); // Composition
  }
  
  drive() {
    return this.engine.start() + " — " + this.brand + " drives!";
  }
}

const myCar = new Car("Toyota");
console.log(myCar.drive());`,
            },
          ),
          text(
            "Composition is more flexible than inheritance. You can swap implementations (use a different Engine class) without touching Car. It also avoids deep inheritance chains that get confusing.",
            {
              label: "Why composition beats deep inheritance",
              content: `// Bad: Vehicle -> Car -> SportsCar -> LuxurySportsCar (4 levels!)
// Better: SportsCar composes Engine, Transmission, Interior

class SportsCar {
  constructor(brand) {
    this.brand = brand;
    this.engine = new PerformanceEngine();
    this.wheels = new SportWheels();
  }
}`,
            },
          ),
          diagram("Has-a vs Is-a relationships", [
            {
              id: "isa",
              label: "Is-a (Inheritance)",
              color: ACCENT,
              items: ["Dog IS-A Animal", "Student IS-A Person"],
            },
            {
              id: "hasa",
              label: "Has-a (Composition)",
              color: "#06b6d4",
              items: ["Car HAS-A Engine", "Student HAS-A Transcript"],
            },
          ]),
          callout(
            "tip",
            "Rule of thumb: use inheritance for **categories** (Dog, Cat, Bird all are Animals). Use composition for **capabilities** (most things have an engine, battery, etc.).",
          ),
          callout(
            "info",
            "\"Favor composition over inheritance\" is a famous design principle in OOP — it leads to simpler, more reusable code.",
          ),
          quiz(
            "When should you use composition instead of inheritance?",
            [
              "Always — never use inheritance",
              "When the relationship is has-a, not is-a",
              "When the parent is too complex",
              "Never — inheritance is always better",
            ],
            1,
            "Composition works best for has-a: Dog HAS-A owner (composition), Dog IS-A Animal (inheritance).",
          ),
        ],
        challenge: {
          title: "Phone with Battery",
          description:
            "Create `Battery` class with charge() method. Create `Phone` class that composes a Battery (has-a). Call phone.battery.charge().",
          starterCode: `// class Battery and class Phone with composition

`,
          solutionCode: `class Battery {
  charge() {
    return "Battery charged";
  }
}

class Phone {
  constructor(brand) {
    this.brand = brand;
    this.battery = new Battery();
  }
}

const myPhone = new Phone("iPhone");
console.log(myPhone.battery.charge());`,
          tests: [
            { id: 1, label: "Defines Battery class", keywords: [{ pattern: "class\\s+Battery" }] },
            { id: 2, label: "Defines Phone class", keywords: [{ pattern: "class\\s+Phone" }] },
            { id: 3, label: "Phone composes Battery", keywords: [{ pattern: "this\\.battery\\s*=\\s*new\\s+Battery" }] },
            { id: 4, label: "Calls battery method", keywords: [{ pattern: "myPhone\\.battery" }] },
          ],
        },
      },
    ],
  },
  {
    id: "encapsulation",
    title: "Encapsulation & Privacy",
    icon: "🔒",
    color: "#f97316",
    lessons: [
      {
        id: "js-oops-6",
        title: "Private fields",
        xp: 14,
        theory: [
          text(
            "**Encapsulation** means hiding internal details and exposing only what's needed. Use **private fields** (starting with `#`) to prevent direct access from outside the class.",
            {
              label: "Public vs private fields",
              content: `class BankAccount {
  #balance = 0;  // Private field
  accountHolder;  // Public field
  
  constructor(holder) {
    this.accountHolder = holder;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Ali");
account.deposit(100);
console.log(account.getBalance()); // 100
// console.log(account.#balance); // Error! Private field`,
            },
          ),
          text(
            "**Getter and setter methods** provide controlled access. A getter reads a property; a setter validates before changing it. They look like properties but run code behind the scenes.",
            {
              label: "Using getters and setters",
              content: `class Person {
  #age = 0;
  
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }
  
  get age() {
    return this.#age;
  }
  
  set age(value) {
    if (value >= 0) {
      this.#age = value;
    } else {
      console.log("Age must be positive");
    }
  }
}

const person = new Person("Sara", 25);
console.log(person.age);     // 25 (getter)
person.age = 30;              // setter
console.log(person.age);     // 30
person.age = -5;              // Rejected`,
            },
          ),
          diagram("Encapsulation flow", [
            {
              id: "private",
              label: "Private fields",
              color: ACCENT,
              items: ["#balance", "Only class touches it"],
            },
            {
              id: "getter",
              label: "Getter/setter",
              color: "#f97316",
              items: ["Validate input", "Protect data"],
            },
            {
              id: "caller",
              label: "Caller",
              color: "#fbbf24",
              items: ["Can't cheat", "Data stays valid"],
            },
          ]),
          callout(
            "tip",
            "Use private fields to prevent bugs: instead of `account.balance = -1000` (oops!), force through `deposit()` which validates.",
          ),
          callout(
            "warning",
            "Private fields with `#` are new syntax. Older code uses naming convention `_private` (underscore), which is not truly private but a signal to not access directly.",
          ),
          quiz(
            "What does a private field (#balance) prevent?",
            [
              "The class from using it",
              "Other code from accessing it directly",
              "Methods from reading it",
              "JavaScript from running",
            ],
            1,
            "Private fields can only be accessed inside the class — not from outside code.",
          ),
        ],
        challenge: {
          title: "Bank Account Safe",
          description:
            "Create a BankAccount class with private #balance. Add withdraw(amount) that only allows if amount <= balance. Log results.",
          starterCode: `// class BankAccount with private balance and withdraw

`,
          solutionCode: `class BankAccount {
  #balance = 100;
  
  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      return "Withdrew " + amount;
    }
    return "Insufficient funds";
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
console.log(account.withdraw(30));
console.log(account.getBalance());`,
          tests: [
            { id: 1, label: "Uses private #balance", keywords: [{ pattern: "#balance" }] },
            { id: 2, label: "Defines withdraw", keywords: [{ pattern: "withdraw\\s*\\(" }] },
            { id: 3, label: "Checks amount <= balance", keywords: [{ pattern: "<=\\s*this\\.#balance|this\\.#balance.*<=" }] },
            { id: 4, label: "Has getBalance method", keywords: [{ pattern: "getBalance\\s*\\(" }] },
          ],
        },
      },
      {
        id: "js-oops-7",
        title: "getters and setters",
        xp: 16,
        theory: [
          text(
            "**Getters** let you read properties with syntax that looks like property access: `person.age` instead of `person.getAge()`. Same for **setters**: `person.age = 30` instead of `person.setAge(30)`.",
            {
              label: "Cleaner syntax with getter/setter",
              content: `class Temperature {
  #celsius = 20;
  
  // Getter looks like reading a property
  get fahrenheit() {
    return this.#celsius * 9/5 + 32;
  }
  
  // Setter looks like assigning a property
  set fahrenheit(f) {
    this.#celsius = (f - 32) * 5/9;
  }
  
  get celsius() {
    return this.#celsius;
  }
  
  set celsius(c) {
    this.#celsius = c;
  }
}

const temp = new Temperature();
console.log(temp.celsius);      // 20 (getter)
temp.celsius = 25;              // setter
console.log(temp.fahrenheit);   // 77`,
            },
          ),
          text(
            "Getters can compute values on-the-fly without storing them. This is called a **computed property** — the value is calculated each time you access it.",
            {
              label: "Computed property: full name",
              content: `class Person {
  firstName = "John";
  lastName = "Doe";
  
  get fullName() {
    return this.firstName + " " + this.lastName;
  }
  
  set fullName(name) {
    const parts = name.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
}

const p = new Person();
console.log(p.fullName);  // John Doe
p.fullName = "Jane Smith";
console.log(p.firstName); // Jane`,
            },
          ),
          callout(
            "tip",
            "Use getters for computed values (fullName from firstName + lastName) and setters for validation (ensure age is positive).",
          ),
          callout(
            "info",
            "You can't have a property and a getter/setter with the same name — pick one. Use a private field + getter/setter pattern.",
          ),
          quiz(
            "How do you call a getter named age?",
            [
              "person.age()",
              "person.getAge()",
              "person.age",
              "person.readAge",
            ],
            2,
            "Getters are called like property access — no parentheses, no 'get' prefix.",
          ),
        ],
        challenge: {
          title: "Rectangle Area",
          description:
            "Rectangle class with private #width and #height. Add getter area that returns width * height. Set values and log area.",
          starterCode: `// class Rectangle with area getter

`,
          solutionCode: `class Rectangle {
  #width = 0;
  #height = 0;
  
  constructor(w, h) {
    this.#width = w;
    this.#height = h;
  }
  
  get area() {
    return this.#width * this.#height;
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.area);`,
          tests: [
            { id: 1, label: "Uses private #width", keywords: [{ pattern: "#width" }] },
            { id: 2, label: "Uses private #height", keywords: [{ pattern: "#height" }] },
            { id: 3, label: "Defines area getter", keywords: [{ pattern: "get\\s+area" }] },
            { id: 4, label: "Computes width * height", keywords: [{ pattern: "#width\\s*\\*\\s*#height" }] },
          ],
        },
      },
      {
        id: "js-oops-8",
        title: "Static members",
        xp: 14,
        theory: [
          text(
            "**Static members** belong to the class itself, not to instances. Use `static` keyword. You access them via the class name: `ClassName.staticMethod()` — no `new` needed.",
            {
              label: "Static method and property",
              content: `class MathHelper {
  static PI = 3.14159;
  
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.PI);          // 3.14159
console.log(MathHelper.add(2, 3));   // 5
// Don't use: new MathHelper().PI (wrong — MathHelper is not the instance)`,
            },
          ),
          text(
            "Static methods are useful for **utility functions** tied to a class: `User.findById(123)`, `Date.now()`, `Array.isArray()`. They don't need instance data, just shared logic.",
            {
              label: "Static utility methods",
              content: `class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  
  static fromJSON(json) {
    const obj = JSON.parse(json);
    return new User(obj.id, obj.name);
  }
  
  static getAllUsers() {
    return [
      new User(1, "Ali"),
      new User(2, "Sara"),
    ];
  }
}

const users = User.getAllUsers();
const user = User.fromJSON('{"id": 3, "name": "Mo"}');`,
            },
          ),
          diagram("Static vs instance", [
            {
              id: "static",
              label: "Static",
              color: ACCENT,
              items: ["ClassName.method()", "Shared, no instance needed"],
            },
            {
              id: "instance",
              label: "Instance",
              color: "#f97316",
              items: ["obj.method()", "Per-object, uses this"],
            },
          ]),
          callout(
            "tip",
            "Use static for factory methods (create instances), validators, or shared constants. Use instance methods when you need to access/modify object properties.",
          ),
          callout(
            "info",
            "Static members are often seen in utility classes like `Math`, `Array`, and `JSON` — they group related functions together.",
          ),
          quiz(
            "How do you call a static method?",
            [
              "obj.method() where obj is an instance",
              "ClassName.method()",
              "method() without anything",
              "this.method() always",
            ],
            1,
            "Static methods are called on the class itself: ClassName.staticMethod().",
          ),
        ],
        challenge: {
          title: "Counter Static",
          description:
            "Create a Counter class with static count = 0. Add static increment() that raises count and returns it. Call it 3 times and log.",
          starterCode: `// class Counter with static count and increment

`,
          solutionCode: `class Counter {
  static count = 0;
  
  static increment() {
    this.count++;
    return this.count;
  }
}

console.log(Counter.increment());
console.log(Counter.increment());
console.log(Counter.increment());`,
          tests: [
            { id: 1, label: "Uses static count", keywords: [{ pattern: "static\\s+count" }] },
            { id: 2, label: "Defines static increment", keywords: [{ pattern: "static\\s+increment" }] },
            { id: 3, label: "Increments count", keywords: [{ pattern: "this\\.count\\+\\+" }] },
            { id: 4, label: "Calls increment 3 times", keywords: [{ pattern: "Counter\\.increment" }] },
          ],
        },
      },
    ],
  },
  {
    id: "design-patterns",
    title: "Design Patterns & Best Practices",
    icon: "🏗️",
    color: "#f59e0b",
    lessons: [
      {
        id: "js-oops-9",
        title: "Singleton pattern",
        xp: 16,
        theory: [
          text(
            "The **Singleton Pattern** ensures only **one instance** of a class ever exists. Useful for shared resources: configuration, logger, database connection.",
            {
              label: "Singleton implementation",
              content: `class Logger {
  static instance = null;
  
  constructor() {
    if (Logger.instance) {
      return Logger.instance;  // Return existing instance
    }
    Logger.instance = this;
  }
  
  log(msg) {
    console.log("[LOG] " + msg);
  }
}

const logger1 = new Logger();
const logger2 = new Logger();
console.log(logger1 === logger2); // true — same instance!`,
            },
          ),
          text(
            "Without Singleton, you might accidentally create multiple loggers, each with their own buffer or state — chaos! Singleton guarantees one global access point.",
            {
              label: "Why Singleton matters",
              content: `// Bad: Multiple instances cause problems
const logger1 = new Logger();
const logger2 = new Logger();
logger1.setLogLevel("debug");
logger2.setLogLevel("error"); // Oops, overwrites!

// Good: Singleton ensures one shared instance
// Everyone uses the same logger`,
            },
          ),
          callout(
            "tip",
            "JavaScript object literals are already singletons in a way: there's one global config object. Use Singleton class pattern when you need methods or complex setup.",
          ),
          callout(
            "warning",
            "Singletons can make testing hard (hard-coded global state). Use them sparingly — mostly for things that truly need one instance (databases, loggers).",
          ),
          quiz(
            "What does Singleton pattern ensure?",
            [
              "Only one function is used",
              "Only one instance of the class exists",
              "All instances share methods",
              "No new instances can ever be created",
            ],
            1,
            "Singleton pattern restricts a class to a single instance.",
          ),
        ],
        challenge: {
          title: "Config Singleton",
          description:
            "Create a Config class that's a Singleton. Add method setApiUrl(url) and getApiUrl(). Verify only one instance exists.",
          starterCode: `// class Config as Singleton

`,
          solutionCode: `class Config {
  static instance = null;
  #apiUrl = "";
  
  constructor() {
    if (Config.instance) {
      return Config.instance;
    }
    Config.instance = this;
  }
  
  setApiUrl(url) {
    this.#apiUrl = url;
  }
  
  getApiUrl() {
    return this.#apiUrl;
  }
}

const config1 = new Config();
const config2 = new Config();
config1.setApiUrl("https://api.example.com");
console.log(config2.getApiUrl());
console.log(config1 === config2);`,
          tests: [
            { id: 1, label: "Singleton implementation", keywords: [{ pattern: "static\\s+instance" }] },
            { id: 2, label: "Returns existing instance", keywords: [{ pattern: "return\\s+Config\\.instance" }] },
            { id: 3, label: "Has setApiUrl", keywords: [{ pattern: "setApiUrl" }] },
            { id: 4, label: "Has getApiUrl", keywords: [{ pattern: "getApiUrl" }] },
          ],
        },
      },
      {
        id: "js-oops-10",
        title: "Factory pattern",
        xp: 16,
        theory: [
          text(
            "The **Factory Pattern** creates objects without specifying exact classes. Instead of `new Dog()` or `new Cat()` scattered everywhere, use `AnimalFactory.create(\"dog\")`. Benefits: easy to add new types, centralized creation logic.",
            {
              label: "Factory example",
              content: `class AnimalFactory {
  static create(type) {
    switch(type) {
      case "dog":
        return new Dog();
      case "cat":
        return new Cat();
      case "bird":
        return new Bird();
      default:
        throw new Error("Unknown animal");
    }
  }
}

// Usage:
const dog = AnimalFactory.create("dog");
const cat = AnimalFactory.create("cat");`,
            },
          ),
          text(
            "Factories shine when creation is complex: validation, setup, choosing subclasses. Instead of repeating setup code everywhere, do it once in the factory.",
            {
              label: "Factory with validation",
              content: `class UserFactory {
  static create(type, data) {
    if (!data.email || !data.name) {
      throw new Error("Invalid user data");
    }
    
    if (type === "admin") {
      return new AdminUser(data);
    } else if (type === "student") {
      return new StudentUser(data);
    }
    return new NormalUser(data);
  }
}`,
            },
          ),
          callout(
            "tip",
            "Use Factory when class creation is complex or when you want to hide which subclass is created. If it's just `new Simple()`, don't over-engineer.",
          ),
          quiz(
            "When should you use Factory pattern?",
            [
              "Always, for every class",
              "When creation is simple and one-liner",
              "When creation is complex or varies by input",
              "Never — factories are outdated",
            ],
            2,
            "Factory pattern simplifies complex creation logic and centralizes decisions.",
          ),
        ],
        challenge: {
          title: "Shape Factory",
          description:
            'Create Shape subclasses (Circle, Square). Create ShapeFactory.create(type) that returns the right shape. Test both.',
          starterCode: `// class Circle, Square, and ShapeFactory

`,
          solutionCode: `class Circle {
  constructor() {
    this.type = "circle";
  }
  area() {
    return Math.PI * 5 * 5;
  }
}

class Square {
  constructor() {
    this.type = "square";
  }
  area() {
    return 5 * 5;
  }
}

class ShapeFactory {
  static create(type) {
    if (type === "circle") return new Circle();
    if (type === "square") return new Square();
    throw new Error("Unknown shape");
  }
}

const circle = ShapeFactory.create("circle");
const square = ShapeFactory.create("square");
console.log(circle.area());
console.log(square.area());`,
          tests: [
            { id: 1, label: "Defines Circle class", keywords: [{ pattern: "class\\s+Circle" }] },
            { id: 2, label: "Defines Square class", keywords: [{ pattern: "class\\s+Square" }] },
            { id: 3, label: "Creates ShapeFactory", keywords: [{ pattern: "class\\s+ShapeFactory" }] },
            { id: 4, label: "Factory returns instances", keywords: [{ pattern: "new\\s+Circle|new\\s+Square" }] },
          ],
        },
      },
      {
        id: "js-oops-11",
        title: "Observer pattern",
        xp: 18,
        theory: [
          text(
            "The **Observer Pattern** lets objects notify multiple observers when something changes — like a newsletter subscription. One object (subject) broadcasts, many objects (observers) listen.",
            {
              label: "Observer pattern example",
              content: `class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }
}

// Usage:
const emitter = new EventEmitter();
emitter.on("login", (user) => console.log(user + " logged in"));
emitter.emit("login", "Ali");  // Outputs: Ali logged in`,
            },
          ),
          text(
            "Real-world use: button click handlers, form submissions, state changes in React/Vue. The observer pattern decouples senders and receivers — neither needs to know about the other directly.",
            {
              label: "Multiple observers listening",
              content: `const emitter = new EventEmitter();

emitter.on("message", (msg) => console.log("Logger: " + msg));
emitter.on("message", (msg) => console.log("Display: " + msg));
emitter.on("message", (msg) => console.log("Analytics: " + msg));

emitter.emit("message", "User signed up");
// Outputs:
// Logger: User signed up
// Display: User signed up
// Analytics: User signed up`,
            },
          ),
          callout(
            "tip",
            "Observer pattern is everywhere in web development: event listeners, form validation, real-time updates. Master it early.",
          ),
          quiz(
            "What is the Observer pattern used for?",
            [
              "Restricting one instance",
              "Creating objects dynamically",
              "Notifying multiple listeners of events",
              "Organizing inheritance",
            ],
            2,
            "Observer pattern enables one-to-many communication: one subject notifies many observers.",
          ),
        ],
        challenge: {
          title: "Button Click Observer",
          description:
            "Create EventEmitter. Add two listeners to 'click' event. Emit 'click' and verify both listeners are called.",
          starterCode: `// class EventEmitter and usage

`,
          solutionCode: `class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }
}

const emitter = new EventEmitter();
emitter.on("click", () => console.log("Listener 1"));
emitter.on("click", () => console.log("Listener 2"));
emitter.emit("click");`,
          tests: [
            { id: 1, label: "Defines EventEmitter", keywords: [{ pattern: "class\\s+EventEmitter" }] },
            { id: 2, label: "Implements on method", keywords: [{ pattern: "on\\s*\\(" }] },
            { id: 3, label: "Implements emit method", keywords: [{ pattern: "emit\\s*\\(" }] },
            { id: 4, label: "Stores callbacks", keywords: [{ pattern: "this\\.events" }] },
          ],
        },
      },
    ],
  },
  {
    id: "capstone-oops",
    title: "Build & Apply OOP",
    icon: "🏁",
    color: "#ec4899",
    lessons: [
      {
        id: "js-oops-12",
        title: "Todo List OOP",
        xp: 20,
        theory: [
          text(
            "Time to combine OOP concepts: classes, inheritance, encapsulation. Build a real todo app using OOP principles — Task class, TodoList manager, validation, and events.",
          ),
          text(
            "Structure: **Task class** (data: id, text, done), **TodoList class** (manage tasks, add, remove, mark done), **EventEmitter** (notify UI of changes).",
            {
              label: "Todo app OOP structure",
              content: `class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.done = false;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }
  
  addTask(text) {
    const task = new Task(this.nextId++, text);
    this.tasks.push(task);
    return task;
  }
  
  completeTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.done = true;
  }
  
  removeTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
  
  getTasks() {
    return this.tasks;
  }
}

// Usage:
const todos = new TodoList();
todos.addTask("Learn OOP");
todos.addTask("Build project");
console.log(todos.getTasks().length); // 2`,
            },
          ),
          callout(
            "tip",
            "Encapsulate task management in TodoList class. Don't let external code mutate tasks directly — always go through methods. Makes refactoring safe.",
          ),
          quiz(
            "Why use classes instead of plain functions for todos?",
            [
              "Classes run faster",
              "Organization, state management, and reusability",
              "You must use them",
              "No real reason",
            ],
            1,
            "Classes group related data and methods, making code organized and maintainable.",
          ),
        ],
        challenge: {
          title: "TodoList Manager",
          description:
            "Create Task class (id, text, done=false). Create TodoList with addTask(text), completeTask(id), and getTasks(). Add 2 tasks, complete 1, log results.",
          starterCode: `// class Task and class TodoList

`,
          solutionCode: `class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.done = false;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }
  
  addTask(text) {
    const task = new Task(this.nextId++, text);
    this.tasks.push(task);
    return task;
  }
  
  completeTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.done = true;
  }
  
  getTasks() {
    return this.tasks;
  }
}

const todos = new TodoList();
todos.addTask("Learn OOP");
todos.addTask("Build project");
todos.completeTask(1);
console.log(todos.getTasks());`,
          tests: [
            { id: 1, label: "Defines Task class", keywords: [{ pattern: "class\\s+Task" }] },
            { id: 2, label: "Defines TodoList class", keywords: [{ pattern: "class\\s+TodoList" }] },
            { id: 3, label: "Implements addTask", keywords: [{ pattern: "addTask" }] },
            { id: 4, label: "Implements completeTask", keywords: [{ pattern: "completeTask" }] },
          ],
        },
      },
      {
        id: "js-oops-13",
        title: "Game Characters OOP",
        xp: 20,
        theory: [
          text(
            "Build a mini RPG game using OOP: Character base class, Player and Enemy subclasses, items (composition), and interactions.",
          ),
          text(
            "Use inheritance for shared behavior (health, attack), composition for gear (sword, armor), and encapsulation for private stats.",
            {
              label: "RPG OOP structure",
              content: `class Character {
  #health = 100;
  
  constructor(name, attackPower) {
    this.name = name;
    this.attackPower = attackPower;
  }
  
  takeDamage(amount) {
    this.#health -= amount;
  }
  
  getHealth() {
    return this.#health;
  }
  
  attack(target) {
    console.log(this.name + " attacks " + target.name);
    target.takeDamage(this.attackPower);
  }
}

class Player extends Character {
  constructor(name) {
    super(name, 15);
    this.level = 1;
  }
}

class Enemy extends Character {
  constructor(name) {
    super(name, 8);
  }
}

// Usage:
const player = new Player("Hero");
const enemy = new Enemy("Goblin");
player.attack(enemy);
console.log(enemy.getHealth());`,
            },
          ),
          callout(
            "tip",
            "Use inheritance when things share core behavior (both Player and Enemy have health, attack). Use composition for optional abilities (some enemies have weapons, some don't).",
          ),
          quiz(
            "Should health be public or private in a game character?",
            [
              "Always public",
              "Always private",
              "Private for safety, public via getters only",
              "Doesn't matter",
            ],
            2,
            "Private health forces attacks through takeDamage() method, preventing cheating (direct editing).",
          ),
        ],
        challenge: {
          title: "Battle Simulator",
          description:
            "Create Character class with takeDamage(). Create Player and Enemy subclasses. Simulate: Player attacks Enemy, log health drops.",
          starterCode: `// class Character, Player, Enemy

`,
          solutionCode: `class Character {
  #health = 100;
  
  constructor(name, attackPower) {
    this.name = name;
    this.attackPower = attackPower;
  }
  
  takeDamage(amount) {
    this.#health -= amount;
  }
  
  getHealth() {
    return this.#health;
  }
  
  attack(target) {
    target.takeDamage(this.attackPower);
    console.log(this.name + " attacked, enemy HP: " + target.getHealth());
  }
}

class Player extends Character {
  constructor(name) {
    super(name, 20);
  }
}

class Enemy extends Character {
  constructor(name) {
    super(name, 10);
  }
}

const player = new Player("Hero");
const enemy = new Enemy("Goblin");
player.attack(enemy);
console.log("Enemy health:", enemy.getHealth());`,
          tests: [
            { id: 1, label: "Character has private #health", keywords: [{ pattern: "#health" }] },
            { id: 2, label: "Player extends Character", keywords: [{ pattern: "class\\s+Player\\s+extends\\s+Character" }] },
            { id: 3, label: "Enemy extends Character", keywords: [{ pattern: "class\\s+Enemy\\s+extends\\s+Character" }] },
            { id: 4, label: "Attack method exists", keywords: [{ pattern: "attack\\s*\\(" }] },
          ],
        },
      },
      {
        id: "js-oops-14",
        title: "API Response Handler",
        xp: 20,
        theory: [
          text(
            "Real app: handle API responses with OOP. Create classes for different response types, error handling, and data transformation using inheritance and factories.",
          ),
          text(
            "Structure: BaseResponse class, SuccessResponse, ErrorResponse, NotFoundResponse. Use Factory to parse raw API data and create appropriate response object.",
            {
              label: "API response OOP",
              content: `class Response {
  constructor(statusCode, data) {
    this.statusCode = statusCode;
    this.data = data;
  }
  
  isSuccess() {
    return false;
  }
}

class SuccessResponse extends Response {
  isSuccess() {
    return true;
  }
  
  getData() {
    return this.data;
  }
}

class ErrorResponse extends Response {
  isSuccess() {
    return false;
  }
  
  getError() {
    return this.data.message;
  }
}

class ResponseFactory {
  static create(statusCode, data) {
    if (statusCode === 200) {
      return new SuccessResponse(statusCode, data);
    } else if (statusCode === 404 || statusCode === 500) {
      return new ErrorResponse(statusCode, data);
    }
  }
}

// Usage:
const res1 = ResponseFactory.create(200, { name: "Ali" });
const res2 = ResponseFactory.create(404, { message: "Not found" });
console.log(res1.isSuccess()); // true
console.log(res2.getError()); // Not found`,
            },
          ),
          callout(
            "tip",
            "API response handling is real-world OOP: different response types need different methods. Inheritance saves duplication.",
          ),
          quiz(
            "Why use inheritance for success vs error responses?",
            [
              "No reason — should duplicate code",
              "Share common structure, override isSuccess() differently",
              "Inheritance is mandatory",
              "Performance only",
            ],
            1,
            "Both response types share statusCode, data. Inheritance captures this, each overrides behavior.",
          ),
        ],
        challenge: {
          title: "API Response Factory",
          description:
            "Create Response base class. Create SuccessResponse and ErrorResponse subclasses. Make ResponseFactory that returns correct type based on statusCode.",
          starterCode: `// class Response, SuccessResponse, ErrorResponse, ResponseFactory

`,
          solutionCode: `class Response {
  constructor(statusCode, data) {
    this.statusCode = statusCode;
    this.data = data;
  }
}

class SuccessResponse extends Response {
  isSuccess() {
    return true;
  }
  
  getData() {
    return this.data;
  }
}

class ErrorResponse extends Response {
  isSuccess() {
    return false;
  }
  
  getError() {
    return this.data.message;
  }
}

class ResponseFactory {
  static create(statusCode, data) {
    if (statusCode === 200) {
      return new SuccessResponse(statusCode, data);
    } else {
      return new ErrorResponse(statusCode, data);
    }
  }
}

const success = ResponseFactory.create(200, { id: 1, name: "Ali" });
const error = ResponseFactory.create(404, { message: "Not found" });
console.log(success.isSuccess());
console.log(error.getError());`,
          tests: [
            { id: 1, label: "Defines Response class", keywords: [{ pattern: "class\\s+Response" }] },
            { id: 2, label: "SuccessResponse extends", keywords: [{ pattern: "class\\s+SuccessResponse\\s+extends" }] },
            { id: 3, label: "ErrorResponse extends", keywords: [{ pattern: "class\\s+ErrorResponse\\s+extends" }] },
            { id: 4, label: "ResponseFactory.create", keywords: [{ pattern: "ResponseFactory\\.create" }] },
          ],
        },
      },
      {
        id: "js-oops-15",
        title: "OOP Recap & Next Steps",
        xp: 20,
        theory: [
          text(
            "Congratulations — you've mastered **Object-Oriented Programming in JavaScript**. You know classes, inheritance, encapsulation, static members, design patterns, and real-world applications.",
          ),
          diagram("Your OOP Journey", [
            {
              id: "basics",
              label: "Basics",
              color: ACCENT,
              items: ["Classes", "Constructors", "Methods"],
            },
            {
              id: "advanced",
              label: "Advanced",
              color: "#8b5cf6",
              items: ["Inheritance", "Encapsulation", "Static members"],
            },
            {
              id: "patterns",
              label: "Patterns",
              color: "#a78bfa",
              items: ["Singleton", "Factory", "Observer"],
            },
            {
              id: "real",
              label: "Real-world",
              color: "#c4b5fd",
              items: ["Todo app", "Games", "API handlers"],
            },
          ]),
          text(
            "**What to learn next:** React (uses OOP + functional patterns), Node.js backends, TypeScript (adds type safety to OOP), or Advanced patterns (Strategy, Decorator, Adapter).",
            {
              label: "One OOP pattern ties to React",
              content: `// Observer pattern in React (simplified)
class ComponentState {
  constructor() {
    this.subscribers = [];
  }
  
  setState(newData) {
    this.data = newData;
    this.subscribers.forEach(fn => fn()); // Notify all listeners
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
  }
}`,
            },
          ),
          callout(
            "tip",
            "OOP is a tool, not a requirement. Modern JavaScript also uses functional and reactive patterns. Learn when to use each.",
          ),
          callout(
            "info",
            "The Docs Hub has more: **Design Patterns Mastery**, **TypeScript OOP**, **Testing OOP Code** — all build on what you've learned here.",
          ),
          quiz(
            "Which design pattern was most useful to you?",
            [
              "Singleton",
              "Factory",
              "Observer",
              "All equally useful in different scenarios",
            ],
            3,
            "Each pattern solves different problems — good engineers pick the right tool.",
          ),
        ],
        challenge: {
          title: "Integration Challenge",
          description:
            "Build a Bank with private #balance, withdraw/deposit methods, and static method Bank.getAllAccounts(). Demonstrate encapsulation and static.",
          starterCode: `// class Bank with private balance and static method

`,
          solutionCode: `class Bank {
  static #accounts = [];
  #balance = 0;
  
  constructor(holder) {
    this.holder = holder;
    Bank.#accounts.push(this);
  }
  
  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      return this.#balance;
    }
    return null;
  }
  
  getBalance() {
    return this.#balance;
  }
  
  static getAllAccounts() {
    return Bank.#accounts;
  }
}

const acc1 = new Bank("Ali");
const acc2 = new Bank("Sara");
acc1.deposit(100);
acc2.deposit(50);
console.log(Bank.getAllAccounts().length);`,
          tests: [
            { id: 1, label: "Uses private #balance", keywords: [{ pattern: "#balance" }] },
            { id: 2, label: "Implements deposit", keywords: [{ pattern: "deposit" }] },
            { id: 3, label: "Implements withdraw", keywords: [{ pattern: "withdraw" }] },
            { id: 4, label: "Static getAllAccounts", keywords: [{ pattern: "static\\s+getAllAccounts" }] },
          ],
        },
      },
    ],
  },
];

export const JS_OOPS_LESSONS = applyLessonVideoLinks(
  JS_OOPS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  JS_OOPS_VIDEO_LINKS,
);

export const JS_OOPS_TOTAL_XP = JS_OOPS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
