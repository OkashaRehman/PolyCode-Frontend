// PolyCode — Java Spring Boot interactive course
// 4 chapters · 12 lessons · real javac/java execution via backend
// All challenge classes MUST be named "Solution"
// NOTE: Spring Boot itself isn't on the sandbox classpath (no embedded server,
// no framework jars), so theory shows real annotations (@RestController,
// @Autowired, etc.) while challenges use plain-Java equivalents of the same
// concepts (interfaces, layering, POJOs) that actually compile with javac.

const ACCENT = "#22c55e";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}
function callout(variant, content) {
  return { type: "callout", variant, content };
}
function text(content, codeBlock = null) {
  if (codeBlock) return { type: "text", content, code: { lang: "java", ...codeBlock } };
  return { type: "text", content };
}
function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

export const JAVA_SPRING_BOOT_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Spring Boot Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "spring-basics",
    title: "Spring Boot Basics",
    icon: "🌱",
    color: ACCENT,
    lessons: [
      {
        id: "spring-0",
        title: "What is Spring Boot?",
        xp: 15,
        theory: [
          text(
            "**Spring Boot** is a framework for building production-ready Java applications — especially web APIs — with minimal setup. It auto-configures an embedded server (Tomcat by default), dependency injection, and sensible defaults so you write business logic, not boilerplate.",
            {
              label: "A minimal Spring Boot app",
              content: `@SpringBootApplication
public class ShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopApplication.class, args);
    }
}
// Starts an embedded web server on port 8080 automatically`,
            },
          ),
          diagram("Spring Boot Layers", [
            { id: "controller", label: "Controller", color: ACCENT, items: ["Handles HTTP requests", "@RestController"] },
            { id: "service", label: "Service", color: "#3b82f6", items: ["Business logic", "@Service"] },
            { id: "repository", label: "Repository", color: "#f59e0b", items: ["Database access", "@Repository / Spring Data JPA"] },
          ]),
          callout(
            "info",
            "Spring Boot isn't available in this sandbox's plain-javac environment (no framework jars, no embedded server) — so challenges in this course use plain-Java equivalents of the same patterns you'd write in a real Spring Boot project.",
          ),
          quiz(
            "What does @SpringBootApplication do?",
            [
              "Nothing — it's just documentation",
              "Marks the main class and triggers Spring's auto-configuration and component scanning",
              "Starts a database",
              "Compiles the project",
            ],
            1,
            "@SpringBootApplication combines @Configuration, @EnableAutoConfiguration, and @ComponentScan — it's the entry point that bootstraps the whole application.",
          ),
        ],
        challenge: {
          title: "The Application Entry Point",
          description: [
            {
              type: "text",
              content:
                "Simulate a Spring Boot startup sequence: print \"Starting ShopApplication...\", then \"Auto-configuring beans...\", then \"Started on port 8080\".",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Starting ShopApplication...
Auto-configuring beans...
Started on port 8080`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        // Print the 3 startup lines

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Starting ShopApplication...");
        System.out.println("Auto-configuring beans...");
        System.out.println("Started on port 8080");
    }
}`,
          tests: [
            { id: 1, label: "Prints all 3 lines in order", hint: "3 println statements", keywords: [{ pattern: "Starting ShopApplication" }, { pattern: "Started on port 8080" }] },
          ],
        },
      },
      {
        id: "spring-1",
        title: "The Layered Architecture",
        xp: 20,
        theory: [
          text(
            "Spring Boot apps are typically split into 3 layers: **Controller** (handles HTTP), **Service** (business logic), **Repository** (data access). Each layer only talks to the one directly below it, keeping concerns separate.",
            {
              label: "Layered request flow",
              content: `HTTP Request
    ↓
@RestController  →  receives the request, returns a response
    ↓
@Service         →  applies business rules
    ↓
@Repository      →  reads/writes the database
    ↓
Database`,
            },
          ),
          quiz(
            "In the layered architecture, which layer should contain business logic?",
            ["Controller", "Service", "Repository", "None of them"],
            1,
            "The Service layer owns business rules and orchestration. Controllers should stay thin (just handle HTTP concerns), and Repositories should stay focused on data access only.",
          ),
        ],
        challenge: {
          title: "Model the Layers",
          description: [
            {
              type: "text",
              content:
                "Implement OrderController (calls OrderService), OrderService (calls OrderRepository), and OrderRepository (returns a fixed value). Chain the calls and print the final result of controller.handleRequest().",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Order #42 processed`,
            },
          ],
          starterCode: `class OrderRepository {
    String findOrder() {
        return "Order #42";
    }
}

class OrderService {
    private final OrderRepository repo = new OrderRepository();
    String process() {
        // use repo to get the order, return "<order> processed"
        return null;
    }
}

class OrderController {
    private final OrderService service = new OrderService();
    String handleRequest() {
        return service.process();
    }
}

public class Solution {
    public static void main(String[] args) {
        OrderController controller = new OrderController();
        System.out.println(controller.handleRequest());
    }
}`,
          solutionCode: `class OrderRepository {
    String findOrder() {
        return "Order #42";
    }
}

class OrderService {
    private final OrderRepository repo = new OrderRepository();
    String process() {
        return repo.findOrder() + " processed";
    }
}

class OrderController {
    private final OrderService service = new OrderService();
    String handleRequest() {
        return service.process();
    }
}

public class Solution {
    public static void main(String[] args) {
        OrderController controller = new OrderController();
        System.out.println(controller.handleRequest());
    }
}`,
          tests: [
            { id: 1, label: "Service calls repository", hint: "repo.findOrder()", keywords: [{ pattern: "repo\\.findOrder" }] },
            { id: 2, label: "Controller delegates to service", hint: "service.process()", keywords: [{ pattern: "service\\.process" }] },
          ],
        },
      },
      {
        id: "spring-2",
        title: "application.properties & Configuration",
        xp: 15,
        theory: [
          text(
            "Spring Boot reads configuration from `src/main/resources/application.properties` (or `.yml`) — server port, database URL, logging levels, and your own custom properties.",
            {
              label: "application.properties example",
              content: `server.port=8081
spring.datasource.url=jdbc:mysql://localhost:3306/shopdb
spring.datasource.username=root
spring.jpa.hibernate.ddl-auto=update
app.feature.discount-enabled=true`,
            },
          ),
          callout(
            "info",
            'Values can be injected into your code with @Value("$' +
              '{app.feature.discount-enabled}") private boolean discountEnabled;',
          ),
          quiz(
            "Where does Spring Boot look for application.properties by default?",
            ["src/main/java", "src/main/resources", "the project root only", "It doesn't use a properties file"],
            1,
            "Spring Boot automatically loads src/main/resources/application.properties (or application.yml) on startup — no extra configuration needed.",
          ),
        ],
        challenge: {
          title: "Parse a Config Line",
          description: [
            {
              type: "text",
              content:
                "Given the config line \"server.port=8081\", split it on \"=\" and print the key and value as \"key: server.port, value: 8081\".",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `key: server.port, value: 8081`,
            },
          ],
          starterCode: `public class Solution {
    public static void main(String[] args) {
        String line = "server.port=8081";
        // split on "=", print "key: <key>, value: <value>"

    }
}`,
          solutionCode: `public class Solution {
    public static void main(String[] args) {
        String line = "server.port=8081";
        String[] parts = line.split("=");
        System.out.println("key: " + parts[0] + ", value: " + parts[1]);
    }
}`,
          tests: [
            { id: 1, label: "Splits on =", hint: "line.split(\"=\")", keywords: [{ pattern: "\\.split\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — REST Controllers
  // ─────────────────────────────────────────────────────────────
  {
    id: "rest-controllers",
    title: "REST Controllers",
    icon: "🌐",
    color: "#3b82f6",
    lessons: [
      {
        id: "spring-3",
        title: "@RestController & @GetMapping",
        xp: 20,
        theory: [
          text(
            "`@RestController` marks a class as a web endpoint provider. `@GetMapping` maps a method to an HTTP GET route. The method's return value is automatically serialized to JSON.",
            {
              label: "A basic REST controller",
              content: `@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public List<Product> getAll() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable int id) {
        return productService.findById(id);
    }
}`,
            },
          ),
          quiz(
            "What does @PathVariable do?",
            [
              "Injects a database connection",
              "Extracts a value from the URL path into a method parameter",
              "Validates the request body",
              "Sets the response status code",
            ],
            1,
            "@PathVariable binds a segment of the URL (like the {id} in /api/products/{id}) directly to a method parameter, so GET /api/products/5 passes id=5.",
          ),
        ],
        challenge: {
          title: "Simulate a GET Endpoint",
          description: [
            {
              type: "text",
              content:
                "Implement a ProductController.getById(int id) method (plain Java, simulating what @GetMapping(\"/{id}\") + @PathVariable would do) that returns \"Product #<id>\" for any id, and print the result for id=5.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Product #5`,
            },
          ],
          starterCode: `class ProductController {
    String getById(int id) {
        // return "Product #<id>"
        return null;
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductController controller = new ProductController();
        System.out.println(controller.getById(5));
    }
}`,
          solutionCode: `class ProductController {
    String getById(int id) {
        return "Product #" + id;
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductController controller = new ProductController();
        System.out.println(controller.getById(5));
    }
}`,
          tests: [
            { id: 1, label: "Returns Product # + id", hint: "\"Product #\" + id", keywords: [{ pattern: "Product #" }] },
          ],
        },
      },
      {
        id: "spring-4",
        title: "@PostMapping & @RequestBody",
        xp: 20,
        theory: [
          text(
            "`@PostMapping` handles HTTP POST requests (creating resources). `@RequestBody` deserializes the incoming JSON body into a Java object automatically.",
            {
              label: "POST endpoint with a request body",
              content: `@PostMapping
public Product create(@RequestBody Product newProduct) {
    return productService.save(newProduct);
}

// A POST to /api/products with body {"name": "Mouse", "price": 25}
// automatically becomes a Product object with those fields set`,
            },
          ),
          quiz(
            "What does @RequestBody do?",
            [
              "Sends a response to the client",
              "Deserializes the incoming request's JSON body into a Java object",
              "Marks a field as required",
              "Opens a database transaction",
            ],
            1,
            "@RequestBody tells Spring to take the raw JSON from the HTTP request and convert it into the annotated parameter's Java type using Jackson (Spring's default JSON library).",
          ),
        ],
        challenge: {
          title: "Simulate Creating a Resource",
          description: [
            {
              type: "text",
              content:
                "Implement a Product class with name and price fields, and a ProductController.create(Product p) method (simulating @PostMapping + @RequestBody) that returns \"Created: <name> ($<price>)\". Create a Product(\"Mouse\", 25) and print the result.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Created: Mouse ($25)`,
            },
          ],
          starterCode: `class Product {
    String name;
    int price;
    Product(String name, int price) {
        this.name = name;
        this.price = price;
    }
}

class ProductController {
    String create(Product p) {
        // return "Created: <name> ($<price>)"
        return null;
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductController controller = new ProductController();
        Product p = new Product("Mouse", 25);
        System.out.println(controller.create(p));
    }
}`,
          solutionCode: `class Product {
    String name;
    int price;
    Product(String name, int price) {
        this.name = name;
        this.price = price;
    }
}

class ProductController {
    String create(Product p) {
        return "Created: " + p.name + " ($" + p.price + ")";
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductController controller = new ProductController();
        Product p = new Product("Mouse", 25);
        System.out.println(controller.create(p));
    }
}`,
          tests: [
            { id: 1, label: "Uses the Product fields", hint: "p.name, p.price", keywords: [{ pattern: "p\\.name" }, { pattern: "p\\.price" }] },
          ],
        },
      },
      {
        id: "spring-5",
        title: "@RequestParam & Query Strings",
        xp: 20,
        theory: [
          text(
            "`@RequestParam` extracts values from the URL's query string (`?key=value`), as opposed to `@PathVariable` which extracts from the path itself.",
            {
              label: "Query parameters",
              content: `// GET /api/products/search?keyword=mouse&maxPrice=30
@GetMapping("/search")
public List<Product> search(
        @RequestParam String keyword,
        @RequestParam(defaultValue = "100") int maxPrice) {
    return productService.search(keyword, maxPrice);
}`,
            },
          ),
          quiz(
            "In GET /api/products/search?keyword=mouse, how would you extract 'mouse'?",
            ["@PathVariable String keyword", "@RequestParam String keyword", "@RequestBody String keyword", "It can't be extracted"],
            1,
            "@RequestParam binds query-string parameters (after the ? in the URL) to method parameters — @PathVariable is for segments embedded in the path itself.",
          ),
        ],
        challenge: {
          title: "Simulate a Search Query",
          description: [
            {
              type: "text",
              content:
                "Implement search(String keyword, int maxPrice) (simulating @RequestParam bindings) that returns \"Searching '<keyword>' under $<maxPrice>\". Call it with keyword=\"mouse\", maxPrice=30.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Searching 'mouse' under $30`,
            },
          ],
          starterCode: `class ProductController {
    String search(String keyword, int maxPrice) {
        // return "Searching '<keyword>' under $<maxPrice>"
        return null;
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductController controller = new ProductController();
        System.out.println(controller.search("mouse", 30));
    }
}`,
          solutionCode: `class ProductController {
    String search(String keyword, int maxPrice) {
        return "Searching '" + keyword + "' under $" + maxPrice;
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductController controller = new ProductController();
        System.out.println(controller.search("mouse", 30));
    }
}`,
          tests: [
            { id: 1, label: "Uses both parameters", hint: "keyword and maxPrice", keywords: [{ pattern: "keyword" }, { pattern: "maxPrice" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Dependency Injection & Services
  // ─────────────────────────────────────────────────────────────
  {
    id: "dependency-injection",
    title: "Dependency Injection & Services",
    icon: "🧩",
    color: "#f59e0b",
    lessons: [
      {
        id: "spring-6",
        title: "@Component, @Service & the Bean",
        xp: 20,
        theory: [
          text(
            "Spring manages objects called **beans** — instances it creates and wires together for you. `@Component` (and its specializations `@Service`, `@Repository`, `@Controller`) mark a class so Spring auto-detects and instantiates it at startup.",
            {
              label: "Marking a bean",
              content: `@Service
public class DiscountService {
    public double applyDiscount(double price) {
        return price * 0.9;
    }
}
// Spring creates ONE DiscountService instance and hands it out
// wherever it's needed — you never call "new DiscountService()" yourself`,
            },
          ),
          quiz(
            "What is a 'bean' in Spring?",
            [
              "A configuration file",
              "An object instance that Spring's container creates and manages",
              "A type of database table",
              "A unit test",
            ],
            1,
            "Beans are the objects that form the backbone of a Spring application — Spring's IoC (Inversion of Control) container creates, configures, and manages their lifecycle.",
          ),
        ],
        challenge: {
          title: "Simulate a Managed Service",
          description: [
            {
              type: "text",
              content:
                "Implement DiscountService.applyDiscount(double price) that returns 10% off (price * 0.9). Apply it to 100.0 and print the result.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `90.0`,
            },
          ],
          starterCode: `class DiscountService {
    double applyDiscount(double price) {
        // return 10% off
        return 0;
    }
}

public class Solution {
    public static void main(String[] args) {
        DiscountService service = new DiscountService();
        System.out.println(service.applyDiscount(100.0));
    }
}`,
          solutionCode: `class DiscountService {
    double applyDiscount(double price) {
        return price * 0.9;
    }
}

public class Solution {
    public static void main(String[] args) {
        DiscountService service = new DiscountService();
        System.out.println(service.applyDiscount(100.0));
    }
}`,
          tests: [
            { id: 1, label: "Multiplies by 0.9", hint: "price * 0.9", keywords: [{ pattern: "0\\.9" }] },
          ],
        },
      },
      {
        id: "spring-7",
        title: "@Autowired: Constructor Injection",
        xp: 25,
        theory: [
          text(
            "`@Autowired` tells Spring to inject a bean's dependencies automatically. **Constructor injection** (the recommended style) receives dependencies as constructor parameters — Spring supplies them when it creates the bean.",
            {
              label: "Constructor injection",
              content: `@Service
public class OrderService {
    private final DiscountService discountService;

    @Autowired // optional on a single constructor since Spring 4.3+
    public OrderService(DiscountService discountService) {
        this.discountService = discountService;
    }

    public double checkout(double total) {
        return discountService.applyDiscount(total);
    }
}
// Spring automatically passes in the DiscountService bean — no "new" needed`,
            },
          ),
          callout(
            "info",
            "Constructor injection (over field injection with @Autowired on a field directly) makes dependencies explicit and required, and makes the class easy to unit test without Spring at all.",
          ),
          quiz(
            "Why is constructor injection preferred over field injection?",
            [
              "It's faster at runtime",
              "It makes dependencies explicit, required, and easy to test without the Spring container",
              "It's the only style Spring supports",
              "It avoids needing a Service annotation",
            ],
            1,
            "With constructor injection, you can instantiate the class directly in a unit test (new OrderService(mockDiscountService)) without needing Spring's container at all — and missing dependencies fail fast at construction.",
          ),
        ],
        challenge: {
          title: "Wire Dependencies via Constructor",
          description: [
            {
              type: "text",
              content:
                "Implement OrderService with a constructor taking a DiscountService, storing it in a field, and a checkout(double total) method that delegates to discountService.applyDiscount(total). Wire it up manually (simulating what Spring would do) and checkout(200.0).",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `180.0`,
            },
          ],
          starterCode: `class DiscountService {
    double applyDiscount(double price) {
        return price * 0.9;
    }
}

class OrderService {
    // add a DiscountService field, constructor, and checkout method

}

public class Solution {
    public static void main(String[] args) {
        DiscountService discountService = new DiscountService();
        OrderService orderService = new OrderService(discountService);
        System.out.println(orderService.checkout(200.0));
    }
}`,
          solutionCode: `class DiscountService {
    double applyDiscount(double price) {
        return price * 0.9;
    }
}

class OrderService {
    private final DiscountService discountService;

    OrderService(DiscountService discountService) {
        this.discountService = discountService;
    }

    double checkout(double total) {
        return discountService.applyDiscount(total);
    }
}

public class Solution {
    public static void main(String[] args) {
        DiscountService discountService = new DiscountService();
        OrderService orderService = new OrderService(discountService);
        System.out.println(orderService.checkout(200.0));
    }
}`,
          tests: [
            { id: 1, label: "Stores DiscountService via constructor", hint: "OrderService(DiscountService discountService)", keywords: [{ pattern: "OrderService\\s*\\(\\s*DiscountService" }] },
            { id: 2, label: "Delegates in checkout", hint: "discountService.applyDiscount(total)", keywords: [{ pattern: "discountService\\.applyDiscount" }] },
          ],
        },
      },
      {
        id: "spring-8",
        title: "Interfaces & Swappable Implementations",
        xp: 20,
        theory: [
          text(
            "Dependency injection shines when a service depends on an **interface**, not a concrete class. Spring can then wire in different implementations (a real one in production, a fake one in tests) without changing the dependent code at all.",
            {
              label: "Depending on an interface",
              content: `interface PaymentGateway {
    boolean charge(double amount);
}

@Service
class StripeGateway implements PaymentGateway {
    public boolean charge(double amount) { /* real API call */ return true; }
}

@Service
class CheckoutService {
    private final PaymentGateway gateway; // depends on the interface
    CheckoutService(PaymentGateway gateway) { this.gateway = gateway; }
}
// In tests: new CheckoutService(fakeGateway) — no real payment needed`,
            },
          ),
          quiz(
            "Why depend on an interface instead of a concrete class?",
            [
              "It runs faster",
              "It lets you swap implementations (real vs. test/mock) without changing the dependent class",
              "Interfaces are required by Java",
              "It reduces memory usage",
            ],
            1,
            "Programming to an interface decouples a class from any specific implementation — Spring (or you, manually) can inject any class that satisfies the interface, including test doubles.",
          ),
        ],
        challenge: {
          title: "Swap Implementations",
          description: [
            {
              type: "text",
              content:
                "Implement PaymentGateway interface with charge(double amount), then a FakeGateway that always returns true. Implement CheckoutService taking a PaymentGateway and a pay(double amount) method returning \"Paid\" or \"Failed\". Use FakeGateway and pay(50.0).",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `Paid`,
            },
          ],
          starterCode: `interface PaymentGateway {
    boolean charge(double amount);
}

class FakeGateway implements PaymentGateway {
    public boolean charge(double amount) {
        return true;
    }
}

class CheckoutService {
    // add PaymentGateway field, constructor, and pay method

}

public class Solution {
    public static void main(String[] args) {
        CheckoutService checkout = new CheckoutService(new FakeGateway());
        System.out.println(checkout.pay(50.0));
    }
}`,
          solutionCode: `interface PaymentGateway {
    boolean charge(double amount);
}

class FakeGateway implements PaymentGateway {
    public boolean charge(double amount) {
        return true;
    }
}

class CheckoutService {
    private final PaymentGateway gateway;

    CheckoutService(PaymentGateway gateway) {
        this.gateway = gateway;
    }

    String pay(double amount) {
        return gateway.charge(amount) ? "Paid" : "Failed";
    }
}

public class Solution {
    public static void main(String[] args) {
        CheckoutService checkout = new CheckoutService(new FakeGateway());
        System.out.println(checkout.pay(50.0));
    }
}`,
          tests: [
            { id: 1, label: "CheckoutService depends on the interface", hint: "CheckoutService(PaymentGateway gateway)", keywords: [{ pattern: "PaymentGateway\\s+gateway" }] },
            { id: 2, label: "Delegates to gateway.charge", hint: "gateway.charge(amount)", keywords: [{ pattern: "gateway\\.charge" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Data & Persistence
  // ─────────────────────────────────────────────────────────────
  {
    id: "data-persistence",
    title: "Data & Persistence",
    icon: "🗄️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "spring-9",
        title: "@Entity & JPA Basics",
        xp: 20,
        theory: [
          text(
            "Spring Data JPA maps Java classes directly to database tables. `@Entity` marks a class as a table, `@Id` marks its primary key, and fields map to columns automatically.",
            {
              label: "A JPA entity",
              content: `@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;

    // getters/setters
}
// JPA creates/maps a "products" table with id, name, price columns`,
            },
          ),
          quiz(
            "What does @Id mark in a JPA entity?",
            ["A required field", "The primary key column", "A foreign key", "An index"],
            1,
            "@Id designates which field is the entity's primary key — combined with @GeneratedValue, JPA can also auto-generate its value (e.g. auto-increment).",
          ),
        ],
        challenge: {
          title: "Model an Entity as a POJO",
          description: [
            {
              type: "text",
              content:
                "Define a Product class (simulating a JPA @Entity) with fields id, name, price and a constructor, plus a toString-style describe() method returning \"#<id> <name> - $<price>\". Create one and print describe().",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `#1 Keyboard - $45.0`,
            },
          ],
          starterCode: `class Product {
    long id;
    String name;
    double price;

    Product(long id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    String describe() {
        // return "#<id> <name> - $<price>"
        return null;
    }
}

public class Solution {
    public static void main(String[] args) {
        Product p = new Product(1, "Keyboard", 45.0);
        System.out.println(p.describe());
    }
}`,
          solutionCode: `class Product {
    long id;
    String name;
    double price;

    Product(long id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    String describe() {
        return "#" + id + " " + name + " - $" + price;
    }
}

public class Solution {
    public static void main(String[] args) {
        Product p = new Product(1, "Keyboard", 45.0);
        System.out.println(p.describe());
    }
}`,
          tests: [
            { id: 1, label: "describe() uses all 3 fields", hint: "id, name, price", keywords: [{ pattern: "id" }, { pattern: "name" }, { pattern: "price" }] },
          ],
        },
      },
      {
        id: "spring-10",
        title: "Spring Data JPA Repositories",
        xp: 25,
        theory: [
          text(
            "With Spring Data JPA, you don't write DAO implementations by hand. Extend `JpaRepository<Entity, IdType>` and Spring **generates the implementation at runtime** — including custom finder methods derived from the method name.",
            {
              label: "A Spring Data repository",
              content: `public interface ProductRepository extends JpaRepository<Product, Long> {
    // Free CRUD methods: save(), findById(), findAll(), deleteById()...

    // Derived query — Spring writes the SQL from the method name!
    List<Product> findByNameContaining(String keyword);
    List<Product> findByPriceLessThan(double maxPrice);
}`,
            },
          ),
          callout(
            "info",
            "This is the same concept as the DAO pattern from the JDBC course — Spring Data JPA just auto-generates the implementation instead of you writing it by hand.",
          ),
          quiz(
            "What does extending JpaRepository<Product, Long> give you for free?",
            [
              "Nothing — you still implement every method",
              "Basic CRUD methods (save, findById, findAll, delete) with no implementation code needed",
              "A web server",
              "Automatic UI generation",
            ],
            1,
            "Spring Data JPA generates a runtime implementation of the interface, providing save/findById/findAll/delete out of the box — you only write extra methods for custom queries.",
          ),
        ],
        challenge: {
          title: "Simulate a Derived Query",
          description: [
            {
              type: "text",
              content:
                "Given a List<String> of product names, implement findByNameContaining(List<String> names, String keyword) (simulating a Spring Data derived query method) that returns names containing the keyword. Search \"board\" in [\"Keyboard\", \"Mouse\", \"Monitor\", \"Motherboard\"].",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `[Keyboard, Motherboard]`,
            },
          ],
          starterCode: `import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    static List<String> findByNameContaining(List<String> names, String keyword) {
        // filter names containing keyword, return as a List
        return null;
    }

    public static void main(String[] args) {
        List<String> names = List.of("Keyboard", "Mouse", "Monitor", "Motherboard");
        System.out.println(findByNameContaining(names, "board"));
    }
}`,
          solutionCode: `import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    static List<String> findByNameContaining(List<String> names, String keyword) {
        return names.stream()
            .filter(n -> n.contains(keyword))
            .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        List<String> names = List.of("Keyboard", "Mouse", "Monitor", "Motherboard");
        System.out.println(findByNameContaining(names, "board"));
    }
}`,
          tests: [
            { id: 1, label: "Filters using contains", hint: ".filter(n -> n.contains(keyword))", keywords: [{ pattern: "\\.contains\\s*\\(" }] },
            { id: 2, label: "Uses streams", hint: "names.stream()", keywords: [{ pattern: "\\.stream\\s*\\(" }] },
          ],
        },
      },
      {
        id: "spring-11",
        title: "DTOs & Separating API from Entity",
        xp: 25,
        theory: [
          text(
            "Returning `@Entity` objects directly from a controller couples your API's shape to your database schema, and can leak internal fields. A **DTO** (Data Transfer Object) is a plain class shaped exactly for the API response — you map the entity to it before returning.",
            {
              label: "Entity vs DTO",
              content: `@Entity
class Product {
    Long id;
    String name;
    double price;
    double internalCostBasis; // internal only — should NOT be exposed!
}

// DTO — only what the API should expose
record ProductDto(Long id, String name, double price) {}

// In the controller:
ProductDto toDto(Product p) {
    return new ProductDto(p.id, p.name, p.price);
}`,
            },
          ),
          quiz(
            "Why use a DTO instead of returning the @Entity directly from a controller?",
            [
              "DTOs are faster to compile",
              "It decouples the API's shape from the database schema and avoids leaking internal fields",
              "Entities can't be serialized to JSON",
              "DTOs are required by Spring",
            ],
            1,
            "A DTO lets you control exactly what the API exposes — hiding internal-only fields and letting the entity and API contract evolve independently.",
          ),
        ],
        challenge: {
          title: "Map an Entity to a DTO",
          description: [
            {
              type: "text",
              content:
                "Given a Product with id, name, price, internalCostBasis, define a ProductDto record with only id, name, price, and a toDto(Product p) method that converts one to the other. Print the DTO.",
            },
            {
              type: "expected",
              label: "Expected output",
              content: `ProductDto[id=1, name=Keyboard, price=45.0]`,
            },
          ],
          starterCode: `class Product {
    long id;
    String name;
    double price;
    double internalCostBasis;

    Product(long id, String name, double price, double internalCostBasis) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.internalCostBasis = internalCostBasis;
    }
}

// Define ProductDto record here

public class Solution {
    static ProductDto toDto(Product p) {
        // map p to a ProductDto (id, name, price only)
        return null;
    }

    public static void main(String[] args) {
        Product p = new Product(1, "Keyboard", 45.0, 20.0);
        System.out.println(toDto(p));
    }
}`,
          solutionCode: `class Product {
    long id;
    String name;
    double price;
    double internalCostBasis;

    Product(long id, String name, double price, double internalCostBasis) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.internalCostBasis = internalCostBasis;
    }
}

record ProductDto(long id, String name, double price) {}

public class Solution {
    static ProductDto toDto(Product p) {
        return new ProductDto(p.id, p.name, p.price);
    }

    public static void main(String[] args) {
        Product p = new Product(1, "Keyboard", 45.0, 20.0);
        System.out.println(toDto(p));
    }
}`,
          tests: [
            { id: 1, label: "Defines ProductDto record", hint: "record ProductDto(...)", keywords: [{ pattern: "record\\s+ProductDto" }] },
            { id: 2, label: "toDto excludes internalCostBasis", hint: "new ProductDto(p.id, p.name, p.price)", keywords: [{ pattern: "new\\s+ProductDto" }] },
          ],
        },
      },
    ],
  },
];

export const JAVA_SPRING_BOOT_LESSONS = JAVA_SPRING_BOOT_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const JAVA_SPRING_BOOT_TOTAL_XP = JAVA_SPRING_BOOT_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
