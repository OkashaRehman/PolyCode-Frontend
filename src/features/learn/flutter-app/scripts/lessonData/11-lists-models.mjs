// Chapter 11 — Lists, Models, and Data Handling

export const CH_LISTS_MODELS = {
  id: "lists-models",
  title: "Lists, Models, and Data Handling",
  icon: "database",
  color: "#00695c",
  lessons: [
    {
      title: "Data Models in Dart",
      xp: 15,
      def:
        "A **model** is a simple class that represents one real-world thing, like a Contact or a Product, grouping related fields together instead of using loose, separate variables.",
      example:
        "Instead of three separate variables for a contact's name, phone, and email floating around your code, a Contact model class bundles them together, making your code far easier to read and reuse.",
      learn: [
        "Why models are better than many separate loose variables",
        "How to define a simple model class with fields and a constructor",
        "How to create a List of model objects",
      ],
      scenario:
        "Think of it like this: a model is like a labeled form for one contact card, with fields for name, phone, and email already laid out. Without the model, you would be juggling loose scraps of paper instead of one organized card.",
      visual: {
        kind: "table",
        title: "Model vs loose variables",
        columns: ["Approach", "Example"],
        rows: [
          ["Loose variables", "String name1; String phone1; String name2; String phone2;"],
          ["Model class", "class Contact { String name; String phone; }"],
        ],
      },
      code: {
        label: "A Contact model and a list of contacts",
        content: `class Contact {
  String name;
  String phone;

  Contact(this.name, this.phone);
}

void main() {
  List<Contact> contacts = [
    Contact("Ali", "0300-1234567"),
    Contact("Sara", "0311-9876543"),
  ];

  for (var c in contacts) {
    print(c.name + " - " + c.phone);
  }
}`,
      },
      tip: "Name model classes after one single real-world thing, in singular form, like Contact, Product, or Message — not Contacts or Products.",
      warning: "Do not scatter the same related fields (like name and phone) across separate unconnected variables — grouping them into a model avoids many mix-up bugs.",
      practice: {
        level1: "Create a Product model with name and price fields.",
        level2: "Create a List<Product> with 3 products and print each one's name and price.",
        level3: "Add a method to Product called describe() that returns a formatted sentence.",
      },
      summary:
        "Models group related fields into one organized class, making your data far easier to manage than loose separate variables.",
      next: "Next, you will use ListView.builder together with a List of model objects to show real data on screen.",
      quiz: {
        q: "Why is a model class usually better than many separate loose variables?",
        options: [
          "It groups related data together, making code easier to read and reuse",
          "Models remove the need for any data at all",
          "Loose variables are always faster to use",
          "Models only work with numbers, not text",
        ],
        answer: 0,
        explain: "Models bundle related fields into one clear structure, which keeps code organized as it grows.",
      },
      quiz2: {
        q: "What should a model class typically represent?",
        options: [
          "One single real-world thing, like a Contact or a Product",
          "The entire app's navigation structure",
          "Only colors used in the theme",
          "A list of unrelated random values",
        ],
        answer: 0,
        explain: "Good model classes map to one clear concept, like a single Contact or Product.",
      },
      challenge: {
        title: "Build a Product model",
        desc: "Create a Product class with name and price fields and a constructor, then create a List<Product> with 2 items and print each.",
        starter: `class Product {
  // add name and price fields and a constructor
}

void main() {
  // create a list of 2 products and print each
}`,
        solution: `class Product {
  String name;
  double price;
  Product(this.name, this.price);
}

void main() {
  List<Product> products = [
    Product("Pen", 1.5),
    Product("Notebook", 3.0),
  ];
  for (var p in products) {
    print(p.name + ": " + p.price.toString());
  }
}`,
        keywords: [
          { label: "Defines a Product class", hint: "class Product", pattern: "class\\s+Product" },
          { label: "Creates a List<Product>", hint: "List<Product>", pattern: "List<Product>" },
          { label: "Prints each product", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Explain why models are better than loose variables",
        "Define a simple model class with fields and a constructor",
        "Create and loop through a List of model objects",
      ],
    },
    {
      title: "ListView.builder with Models",
      xp: 15,
      def:
        "You can combine **ListView.builder** with a **List of model objects** to show real, structured data on screen — each list item reads its fields (like name and phone) directly from the model.",
      example:
        "A contacts screen reads from a List<Contact>, and ListView.builder shows one ListTile per contact, using contact.name and contact.phone instead of plain disconnected strings.",
      learn: [
        "How to pass a List<Model> into ListView.builder",
        "How to read model fields inside itemBuilder",
        "Why this pattern scales well as your data grows",
      ],
      scenario:
        "Think of it like this: ListView.builder with models is like a printer that automatically prints one business card per contact in your address book, pulling the right name and number from each contact's own card.",
      visual: {
        kind: "table",
        title: "List + model + ListView.builder",
        columns: ["Piece", "Role"],
        rows: [
          ["List<Contact>", "Your real data"],
          ["itemCount: contacts.length", "Tells the list how many items exist"],
          ["itemBuilder", "Builds one widget per contact, using its fields"],
        ],
      },
      code: {
        label: "A contact list built from a model",
        content: `import 'package:flutter/material.dart';

class Contact {
  String name;
  String phone;
  Contact(this.name, this.phone);
}

class ContactListScreen extends StatelessWidget {
  const ContactListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List<Contact> contacts = [
      Contact("Ali", "0300-1234567"),
      Contact("Sara", "0311-9876543"),
    ];

    return ListView.builder(
      itemCount: contacts.length,
      itemBuilder: (context, index) {
        Contact c = contacts[index];
        return ListTile(
          leading: const Icon(Icons.person),
          title: Text(c.name),
          subtitle: Text(c.phone),
        );
      },
    );
  }
}`,
      },
      tip: "Grab the current item into a local variable (like 'Contact c = contacts[index];') inside itemBuilder — it keeps the rest of the code shorter and easier to read.",
      warning: "Do not forget that itemCount must match the actual length of your list — a mismatched count can cause an index error or missing items.",
      practice: {
        level1: "Add a third Contact to the list and confirm it shows up.",
        level2: "Add a trailing Icon (like Icons.call) to each ListTile.",
        level3: "Add an onTap to each ListTile that prints the tapped contact's name.",
      },
      summary:
        "Combining ListView.builder with a List of model objects is the standard pattern for showing real, structured data in Flutter.",
      next: "Next, you will add search and filter functionality on top of a list like this.",
      quiz: {
        q: "Inside ListView.builder's itemBuilder, how do you usually access the current model item?",
        options: [
          "Using the given index to read list[index]",
          "Models cannot be used inside ListView.builder",
          "By typing the model's data manually each time",
          "Only the first item can ever be shown",
        ],
        answer: 0,
        explain: "itemBuilder provides an index you use to look up the correct item from your list, like contacts[index].",
      },
      quiz2: {
        q: "Why is it helpful to use a model (like Contact) instead of two separate unrelated lists for names and phones?",
        options: [
          "Each contact's name and phone stay correctly grouped together",
          "Flutter requires exactly one list per screen",
          "It makes the app connect to the internet",
          "There is no difference either way",
        ],
        answer: 0,
        explain: "Using a model avoids index-mismatch bugs that can happen when keeping related data in separate parallel lists.",
      },
      challenge: {
        title: "Product list with models",
        desc: "Build a ListView.builder from a List<Product> (name, price fields), showing each product's name and price in a ListTile.",
        starter: `import 'package:flutter/material.dart';

class Product {
  String name;
  double price;
  Product(this.name, this.price);
}

class ProductListScreen extends StatelessWidget {
  const ProductListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List<Product> products = [Product("Pen", 1.5), Product("Bag", 20.0)];
    // return a ListView.builder showing each product
  }
}`,
        solution: `import 'package:flutter/material.dart';

class Product {
  String name;
  double price;
  Product(this.name, this.price);
}

class ProductListScreen extends StatelessWidget {
  const ProductListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List<Product> products = [Product("Pen", 1.5), Product("Bag", 20.0)];
    return ListView.builder(
      itemCount: products.length,
      itemBuilder: (context, index) {
        Product p = products[index];
        return ListTile(title: Text(p.name), subtitle: Text(p.price.toString()));
      },
    );
  }
}`,
        keywords: [
          { label: "Uses ListView.builder", hint: "ListView.builder(", pattern: "ListView\\.builder\\s*\\(" },
          { label: "Reads products[index]", hint: "products[index]", pattern: "products\\[index\\]" },
          { label: "Uses ListTile", hint: "ListTile(...)", pattern: "ListTile\\s*\\(" },
        ],
      },
      outcomes: [
        "Pass a List of model objects into ListView.builder",
        "Read model fields inside itemBuilder",
        "Build a scalable list screen from structured data",
      ],
    },
    {
      title: "Search and Filter",
      xp: 15,
      def:
        "**Filtering** means narrowing a list down to only the items matching some condition, like a search term. In Flutter, you usually keep a full list and a filtered list, updating the filtered one as the user types.",
      example:
        "Typing 'sa' into a contacts search box should instantly narrow the list down to show only 'Sara' and any other matching names, without changing the original full contact list underneath.",
      learn: [
        "How to keep both a full list and a filtered list in state",
        "How to use .where() to filter a list based on a search term",
        "How to update the filtered list live as the user types",
      ],
      scenario:
        "Think of it like this: filtering is like using a sieve to sort rice from small stones. The full bag of rice (your full list) never changes, but the sieve shows you only what matches right now (the filtered list).",
      visual: {
        kind: "table",
        title: "Search and filter flow",
        columns: ["Step", "What happens"],
        rows: [
          ["1. Store full list", "allContacts stays unchanged"],
          ["2. User types", "onChanged captures the search text"],
          ["3. Filter with .where()", "filteredContacts updates and the UI rebuilds"],
        ],
      },
      code: {
        label: "A searchable contact list",
        content: `import 'package:flutter/material.dart';

class Contact {
  String name;
  Contact(this.name);
}

class SearchableContacts extends StatefulWidget {
  const SearchableContacts({super.key});

  @override
  State<SearchableContacts> createState() => _SearchableContactsState();
}

class _SearchableContactsState extends State<SearchableContacts> {
  List<Contact> allContacts = [Contact("Ali"), Contact("Sara"), Contact("Hamza")];
  List<Contact> filtered = [];

  @override
  void initState() {
    super.initState();
    filtered = allContacts;
  }

  void search(String query) {
    setState(() {
      filtered = allContacts
          .where((c) => c.name.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(onChanged: search, decoration: const InputDecoration(hintText: "Search")),
        Expanded(
          child: ListView.builder(
            itemCount: filtered.length,
            itemBuilder: (context, index) => ListTile(title: Text(filtered[index].name)),
          ),
        ),
      ],
    );
  }
}`,
      },
      tip: "Use .toLowerCase() on both sides of a search comparison so your filter is not case-sensitive by accident.",
      warning: "Do not filter the original list in place — always build a new filtered list, so you never permanently lose the full data.",
      practice: {
        level1: "Explain, in your own words, why you keep two separate lists (full and filtered).",
        level2: "Add a fourth contact and confirm search still works for it.",
        level3: "Add a 'Clear' button that resets filtered back to the full allContacts list.",
      },
      summary:
        "Search and filter features keep a separate filtered list, updated live from the full list using .where() as the user types.",
      next: "Next, you will combine models, ListView.builder, and filtering into a complete contact list project.",
      quiz: {
        q: "Why keep both a full list and a separate filtered list?",
        options: [
          "So the original data is never lost while showing only matching results",
          "Dart requires at least two lists for every screen",
          "Filtering is impossible with only one list",
          "It has no real benefit, one list is always enough",
        ],
        answer: 0,
        explain: "Keeping the full list intact lets you reset or re-filter without ever losing the original data.",
      },
      quiz2: {
        q: "What does .where((c) => c.name.contains(query)) do on a list?",
        options: [
          "Returns only the items whose name contains the search query",
          "Deletes all items from the list permanently",
          "Sorts the list alphabetically",
          "Counts how many items exist",
        ],
        answer: 0,
        explain: ".where() filters a list, keeping only the elements that satisfy the given condition.",
      },
      challenge: {
        title: "Filter a name list",
        desc: "Write a function filterNames(List<String> names, String query) that returns names containing the query (case-insensitive).",
        starter: `List<String> filterNames(List<String> names, String query) {
  // return names containing query, ignoring case
}`,
        solution: `List<String> filterNames(List<String> names, String query) {
  return names
      .where((n) => n.toLowerCase().contains(query.toLowerCase()))
      .toList();
}`,
        keywords: [
          { label: "Uses .where", hint: ".where(...)", pattern: "\\.where\\s*\\(" },
          { label: "Uses toLowerCase", hint: ".toLowerCase()", pattern: "\\.toLowerCase\\s*\\(" },
          { label: "Returns a List", hint: ".toList()", pattern: "\\.toList\\s*\\(" },
        ],
      },
      outcomes: [
        "Keep a full list and a filtered list separately in state",
        "Use .where() to filter a list based on a search term",
        "Update a filtered list live as the user types",
      ],
    },
    {
      title: "Project: Contact List",
      xp: 20,
      def:
        "This lesson combines everything from this chapter — a **Contact model**, **ListView.builder**, and **search/filter** — into one complete, realistic **contact list app project**.",
      example:
        "A finished contact list app lets you see every contact, search instantly as you type, and tap a contact to view more detail — all built from the pieces you have already practiced.",
      learn: [
        "How to structure a small but complete feature using a model, a list, and search",
        "How to organize this logic cleanly inside one StatefulWidget",
        "How these small pieces connect into a real, usable mini-app",
      ],
      scenario:
        "Think of it like this: you have already practiced cutting wood, measuring, and sanding (model, list, search) separately. This project is where you finally assemble all those pieces into one finished small table.",
      visual: {
        kind: "diagram",
        title: "Contact list project pieces",
        nodes: [
          { label: "Contact model", items: ["name, phone fields"] },
          { label: "Search box", items: ["Updates filtered list"] },
          { label: "ListView.builder", items: ["Shows filtered contacts"] },
        ],
      },
      code: {
        label: "A complete searchable contact list",
        content: `import 'package:flutter/material.dart';

class Contact {
  String name;
  String phone;
  Contact(this.name, this.phone);
}

class ContactApp extends StatefulWidget {
  const ContactApp({super.key});

  @override
  State<ContactApp> createState() => _ContactAppState();
}

class _ContactAppState extends State<ContactApp> {
  final List<Contact> allContacts = [
    Contact("Ali", "0300-1111111"),
    Contact("Sara", "0311-2222222"),
    Contact("Hamza", "0322-3333333"),
  ];
  late List<Contact> filtered;

  @override
  void initState() {
    super.initState();
    filtered = allContacts;
  }

  void search(String query) {
    setState(() {
      filtered = allContacts
          .where((c) => c.name.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Contacts")),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8),
            child: TextField(
              onChanged: search,
              decoration: const InputDecoration(hintText: "Search contacts..."),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: filtered.length,
              itemBuilder: (context, index) {
                Contact c = filtered[index];
                return ListTile(title: Text(c.name), subtitle: Text(c.phone));
              },
            ),
          ),
        ],
      ),
    );
  }
}`,
      },
      tip: "Build mini-projects like this in order: first get the model and list showing correctly, then add the search box, then connect them together.",
      warning: "Do not forget to initialize 'filtered' in initState() — if it stays empty forever, your list will appear blank even though allContacts has data.",
      practice: {
        level1: "Add a 4th contact and confirm the list and search both include it.",
        level2: "Add an onTap to each ListTile that prints the tapped contact's phone number.",
        level3: "Describe how you would add a floating action button to add a brand-new contact to allContacts.",
      },
      summary:
        "You combined a Contact model, ListView.builder, and live search into one complete, working contact list project.",
      next: "Next chapter, you will learn how to fetch real data from the internet using HTTP requests.",
      quiz: {
        q: "Why is 'filtered' initialized inside initState() in this project?",
        options: [
          "So the full contact list shows by default before any search happens",
          "initState() is only used for styling",
          "It has no effect on what is shown initially",
          "Because Dart requires all lists to start empty forever",
        ],
        answer: 0,
        explain: "Setting filtered = allContacts in initState() ensures the full list is visible before the user types anything.",
      },
      quiz2: {
        q: "What are the three main pieces combined in this contact list project?",
        options: [
          "A Contact model, ListView.builder, and search/filter logic",
          "Only a single Text widget",
          "A BottomNavigationBar and nothing else",
          "A theme and a Drawer only",
        ],
        answer: 0,
        explain: "This mini-project ties together the model, builder-based list, and search features from this chapter.",
      },
      challenge: {
        title: "Initialize and filter contacts",
        desc: "Write initState()-style logic: set filtered equal to allContacts, then write a search() function that filters by name.",
        starter: `class Contact {
  String name;
  Contact(this.name);
}

void main() {
  List<Contact> allContacts = [Contact("Ali"), Contact("Sara")];
  List<Contact> filtered = allContacts;
  // write a function search(query) that updates filtered by name match
}`,
        solution: `class Contact {
  String name;
  Contact(this.name);
}

void main() {
  List<Contact> allContacts = [Contact("Ali"), Contact("Sara")];
  List<Contact> filtered = allContacts;

  List<Contact> search(String query) {
    return allContacts
        .where((c) => c.name.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }

  filtered = search("sa");
  print(filtered.length);
}`,
        keywords: [
          { label: "Uses .where", hint: ".where(...)", pattern: "\\.where\\s*\\(" },
          { label: "Filters by name", hint: "c.name", pattern: "\\.name" },
          { label: "Returns a filtered list", hint: ".toList()", pattern: "\\.toList\\s*\\(" },
        ],
      },
      outcomes: [
        "Combine a model, a builder-based list, and search into one feature",
        "Organize this logic cleanly inside a StatefulWidget",
        "Build a small, complete, realistic contact list app",
      ],
    },
  ],
};
