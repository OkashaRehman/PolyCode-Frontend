// Chapter 8 — Buttons, Input Fields, and Forms

export const CH_FORMS = {
  id: "forms",
  title: "Buttons, Input Fields, and Forms",
  icon: "list-checks",
  color: "#039be5",
  lessons: [
    {
      title: "TextField and Controllers",
      xp: 10,
      def:
        "A **TextField** lets a user type text, like an email or a message. A **TextEditingController** connects to a TextField so your code can read, change, or clear what the user typed.",
      example:
        "In QuantumChat, the message box at the bottom of the screen is a TextField. When the user taps 'Send', the app reads the current text using a controller, sends it, then clears the box using that same controller.",
      learn: [
        "How to add a basic TextField to a screen",
        "How to connect a TextEditingController to read input",
        "How to clear a TextField after using its value",
      ],
      scenario:
        "Think of it like this: a TextField is like a whiteboard where someone writes a message. A TextEditingController is like a person standing next to the whiteboard who can read what is written, copy it down, or wipe it clean on command.",
      visual: {
        kind: "table",
        title: "TextField basics",
        columns: ["Piece", "Purpose"],
        rows: [
          ["TextField", "Shows the input box on screen"],
          ["TextEditingController", "Reads, sets, or clears the typed text in code"],
          [".text property", "The actual String currently typed"],
        ],
      },
      code: {
        label: "A message box with a controller",
        content: `import 'package:flutter/material.dart';

class MessageBox extends StatefulWidget {
  const MessageBox({super.key});

  @override
  State<MessageBox> createState() => _MessageBoxState();
}

class _MessageBoxState extends State<MessageBox> {
  final TextEditingController controller = TextEditingController();

  void sendMessage() {
    print("Sending: " + controller.text);
    controller.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: controller,
            decoration: const InputDecoration(hintText: "Type a message"),
          ),
        ),
        IconButton(onPressed: sendMessage, icon: const Icon(Icons.send)),
      ],
    );
  }
}`,
      },
      tip: "Always dispose of a TextEditingController in the widget's dispose() method on real screens, to avoid wasting memory.",
      warning: "Do not forget that controller.text always gives you a String — if you need a number, you must convert it, like int.parse(controller.text).",
      practice: {
        level1: "Add a hintText to a TextField that says 'Enter your name'.",
        level2: "Write a function that reads controller.text and prints it when a button is tapped.",
        level3: "After sending the message, call controller.clear() and describe what happens on screen.",
      },
      summary:
        "TextField shows an input box, and a TextEditingController is how your Dart code reads, changes, or clears what was typed.",
      next: "Next, you will learn how to validate form input, like checking for a valid email.",
      quiz: {
        q: "What is the role of a TextEditingController?",
        options: [
          "It lets your code read, set, or clear the text typed into a TextField",
          "It only changes the app's theme color",
          "It is used to connect to the internet",
          "It replaces the need for a TextField entirely",
        ],
        answer: 0,
        explain: "TextEditingController is the bridge between a TextField's on-screen text and your Dart code.",
      },
      quiz2: {
        q: "After reading controller.text and sending a message, what is a common next step?",
        options: [
          "Call controller.clear() to empty the input box",
          "Delete the controller object immediately with no cleanup",
          "Nothing else is ever needed",
          "Call controller.text = 5 to reset it to zero",
        ],
        answer: 0,
        explain: "controller.clear() is the standard way to empty a TextField after using its value.",
      },
      challenge: {
        title: "Build a name input",
        desc: "Create a TextEditingController, a TextField using it, and a function that prints the entered name when called.",
        starter: `import 'package:flutter/material.dart';

class NameInput extends StatefulWidget {
  const NameInput({super.key});

  @override
  State<NameInput> createState() => _NameInputState();
}

class _NameInputState extends State<NameInput> {
  // add a TextEditingController and a printName() method

  @override
  Widget build(BuildContext context) {
    // return a TextField connected to the controller
  }
}`,
        solution: `import 'package:flutter/material.dart';

class NameInput extends StatefulWidget {
  const NameInput({super.key});

  @override
  State<NameInput> createState() => _NameInputState();
}

class _NameInputState extends State<NameInput> {
  final TextEditingController controller = TextEditingController();

  void printName() {
    print(controller.text);
  }

  @override
  Widget build(BuildContext context) {
    return TextField(controller: controller);
  }
}`,
        keywords: [
          { label: "Uses TextEditingController", hint: "TextEditingController()", pattern: "TextEditingController\\s*\\(" },
          { label: "Uses TextField", hint: "TextField(...)", pattern: "TextField\\s*\\(" },
          { label: "Reads controller.text", hint: "controller.text", pattern: "controller\\.text" },
        ],
      },
      outcomes: [
        "Add a TextField to a screen",
        "Connect a TextEditingController to read user input",
        "Clear a TextField after using its value",
      ],
    },
    {
      title: "Form Validation",
      xp: 15,
      def:
        "**Form** groups multiple input fields together, and **validation** checks whether the entered values are correct before continuing, like making sure an email contains '@' or a password is long enough.",
      example:
        "A sign-up screen should not let a user continue with an empty name field or a password shorter than 6 characters. Validation catches these problems immediately and shows a clear error message.",
      learn: [
        "How to wrap fields in a Form with a GlobalKey<FormState>",
        "How to write a validator function for a TextFormField",
        "How to check validate() before submitting a form",
      ],
      scenario:
        "Think of it like this: form validation is like a security guard checking tickets before letting people into a concert. If a ticket (a field's value) looks wrong, the guard stops that person right there with a clear reason.",
      visual: {
        kind: "table",
        title: "Validation building blocks",
        columns: ["Piece", "Purpose"],
        rows: [
          ["GlobalKey<FormState>", "Lets you control and check the whole Form"],
          ["TextFormField validator", "A function returning an error message or null"],
          ["formKey.currentState!.validate()", "Runs all validators and returns true/false"],
        ],
      },
      code: {
        label: "A validated email field",
        content: `import 'package:flutter/material.dart';

class EmailForm extends StatefulWidget {
  const EmailForm({super.key});

  @override
  State<EmailForm> createState() => _EmailFormState();
}

class _EmailFormState extends State<EmailForm> {
  final formKey = GlobalKey<FormState>();

  String? validateEmail(String? value) {
    if (value == null || !value.contains("@")) {
      return "Please enter a valid email";
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: formKey,
      child: Column(
        children: [
          TextFormField(
            decoration: const InputDecoration(labelText: "Email"),
            validator: validateEmail,
          ),
          ElevatedButton(
            onPressed: () {
              if (formKey.currentState!.validate()) {
                print("Email looks valid!");
              }
            },
            child: const Text("Submit"),
          ),
        ],
      ),
    );
  }
}`,
      },
      tip: "A validator function should return null when the value is valid, and an error message String when it is not.",
      warning: "Do not forget to call formKey.currentState!.validate() before trusting that a form's data is correct — simply having validators defined does not run them automatically.",
      practice: {
        level1: "Write a validator that checks a name field is not empty.",
        level2: "Write a validator that checks a password is at least 6 characters long.",
        level3: "Combine two TextFormFields (name and password) in one Form, both validated before submit.",
      },
      summary:
        "Form and validator functions let you check user input is correct before continuing, giving clear feedback when something is wrong.",
      next: "Next, you will add dropdowns and checkboxes, then build a full registration form project.",
      quiz: {
        q: "What should a validator function return when the input is valid?",
        options: ["null", "An error message String", "true", "false"],
        answer: 0,
        explain: "Validator functions return null for valid input, and a String error message when something is wrong.",
      },
      quiz2: {
        q: "What does formKey.currentState!.validate() do?",
        options: [
          "Runs every field's validator and returns true if all pass",
          "Automatically fixes incorrect input",
          "Deletes the form from the screen",
          "Clears every field's text",
        ],
        answer: 0,
        explain: "validate() checks all validators attached to the Form and returns whether everything passed.",
      },
      challenge: {
        title: "Validate a password field",
        desc: "Write a validator function that returns an error if the password is shorter than 6 characters, otherwise null.",
        starter: `String? validatePassword(String? value) {
  // return an error message if too short, otherwise null
}`,
        solution: `String? validatePassword(String? value) {
  if (value == null || value.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
}`,
        keywords: [
          { label: "Checks length", hint: "value.length", pattern: "\\.length" },
          { label: "Returns null when valid", hint: "return null;", pattern: "return\\s+null" },
          { label: "Returns an error message", hint: "return \"...\"", pattern: "return\\s+\"" },
        ],
      },
      outcomes: [
        "Wrap fields in a Form with a GlobalKey<FormState>",
        "Write a validator function for a TextFormField",
        "Call validate() to check a form before submitting",
      ],
    },
    {
      title: "Dropdowns and Checkboxes",
      xp: 10,
      def:
        "A **DropdownButton** lets a user pick one option from a list, like a country or category. A **Checkbox** lets a user toggle a yes/no choice, like 'I agree to the terms'.",
      example:
        "A sign-up form might use a DropdownButton to let users pick their country, and a Checkbox to confirm 'I agree to the Terms of Service' before the Submit button becomes active.",
      learn: [
        "How to build a DropdownButton with a list of options",
        "How to track the selected value using setState",
        "How to build a Checkbox and react to its value changing",
      ],
      scenario:
        "Think of it like this: a dropdown is like a restaurant menu where you can only pick one dish from a fixed list. A checkbox is like a small tick box on a form you either check or leave unchecked.",
      visual: {
        kind: "table",
        title: "Dropdown vs checkbox",
        columns: ["Widget", "Good for"],
        rows: [
          ["DropdownButton", "Picking exactly one option from a known list"],
          ["Checkbox", "A simple yes/no or on/off choice"],
        ],
      },
      code: {
        label: "A country dropdown and an agree checkbox",
        content: `import 'package:flutter/material.dart';

class SignupExtras extends StatefulWidget {
  const SignupExtras({super.key});

  @override
  State<SignupExtras> createState() => _SignupExtrasState();
}

class _SignupExtrasState extends State<SignupExtras> {
  String selectedCountry = "Pakistan";
  bool agreed = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        DropdownButton<String>(
          value: selectedCountry,
          items: ["Pakistan", "India", "USA"]
              .map((c) => DropdownMenuItem(value: c, child: Text(c)))
              .toList(),
          onChanged: (value) {
            setState(() {
              selectedCountry = value!;
            });
          },
        ),
        Row(
          children: [
            Checkbox(
              value: agreed,
              onChanged: (value) {
                setState(() {
                  agreed = value!;
                });
              },
            ),
            const Text("I agree to the Terms"),
          ],
        ),
      ],
    );
  }
}`,
      },
      tip: "Keep your dropdown's list of options in a separate List<String> variable, so it is easy to update later without touching the widget code.",
      warning: "Do not forget to call setState() inside onChanged — without it, the dropdown or checkbox will visually appear unresponsive, even though the value technically changed.",
      practice: {
        level1: "Add a 4th country option to the dropdown list.",
        level2: "Disable the Submit button when agreed is false (describe the logic in words).",
        level3: "Add a second checkbox for 'Subscribe to newsletter' and track its own state.",
      },
      summary:
        "DropdownButton lets users pick one option from a list, and Checkbox handles simple yes/no choices, both updated with setState.",
      next: "Next, you will combine everything into a full registration form project.",
      quiz: {
        q: "What is a DropdownButton best suited for?",
        options: [
          "Letting a user choose exactly one option from a known list",
          "Letting a user type free-form text",
          "Showing a scrollable list of many items",
          "Playing a sound effect",
        ],
        answer: 0,
        explain: "DropdownButton is ideal for single-choice selection from a predefined list of options.",
      },
      quiz2: {
        q: "Why must setState() be called inside a Checkbox's onChanged callback?",
        options: [
          "So Flutter knows to redraw the checkbox with its new value",
          "So the app connects to the internet",
          "Because Checkbox cannot be used without a network connection",
          "It is purely optional and never affects anything visually",
        ],
        answer: 0,
        explain: "setState() tells Flutter the widget's state changed and the UI should be redrawn to reflect it.",
      },
      challenge: {
        title: "Agree checkbox",
        desc: "Build a StatefulWidget with a bool agreed, a Checkbox bound to it, and a Text label next to it.",
        starter: `import 'package:flutter/material.dart';

class AgreeBox extends StatefulWidget {
  const AgreeBox({super.key});

  @override
  State<AgreeBox> createState() => _AgreeBoxState();
}

class _AgreeBoxState extends State<AgreeBox> {
  bool agreed = false;

  @override
  Widget build(BuildContext context) {
    // return a Row with a Checkbox and a Text label
  }
}`,
        solution: `import 'package:flutter/material.dart';

class AgreeBox extends StatefulWidget {
  const AgreeBox({super.key});

  @override
  State<AgreeBox> createState() => _AgreeBoxState();
}

class _AgreeBoxState extends State<AgreeBox> {
  bool agreed = false;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Checkbox(
          value: agreed,
          onChanged: (value) {
            setState(() {
              agreed = value!;
            });
          },
        ),
        const Text("I agree"),
      ],
    );
  }
}`,
        keywords: [
          { label: "Uses Checkbox", hint: "Checkbox(...)", pattern: "Checkbox\\s*\\(" },
          { label: "Uses setState", hint: "setState(...)", pattern: "setState\\s*\\(" },
          { label: "Has onChanged", hint: "onChanged:", pattern: "onChanged\\s*:" },
        ],
      },
      outcomes: [
        "Build a DropdownButton with a list of options",
        "Build a Checkbox and react to changes",
        "Update selection state using setState",
      ],
    },
    {
      title: "Project: Registration Form",
      xp: 20,
      def:
        "This lesson combines everything from this chapter — TextFormField, validation, a dropdown, and a checkbox — into one complete **registration form project**, similar to a real sign-up screen for an app like QuantumChat.",
      example:
        "A real registration screen typically asks for a name, email, country, and agreement to terms, validates everything, and only lets the user continue once every field is correct — exactly what you will build here.",
      learn: [
        "How to combine multiple form fields into one working form",
        "How to validate everything together before allowing submission",
        "How to structure a real sign-up screen cleanly",
      ],
      scenario:
        "Think of it like this: building this form is like assembling a small piece of furniture using instructions from several earlier chapters — you already have every individual part (TextField, dropdown, checkbox); now you are putting them together into one finished product.",
      visual: {
        kind: "diagram",
        title: "Registration form pieces",
        nodes: [
          { label: "Name & Email", items: ["TextFormField + validators"] },
          { label: "Country", items: ["DropdownButton"] },
          { label: "Terms", items: ["Checkbox"] },
          { label: "Submit", items: ["Checks form + checkbox together"] },
        ],
      },
      code: {
        label: "A full registration form",
        content: `import 'package:flutter/material.dart';

class RegistrationForm extends StatefulWidget {
  const RegistrationForm({super.key});

  @override
  State<RegistrationForm> createState() => _RegistrationFormState();
}

class _RegistrationFormState extends State<RegistrationForm> {
  final formKey = GlobalKey<FormState>();
  String country = "Pakistan";
  bool agreed = false;

  void submit() {
    bool formOk = formKey.currentState!.validate();
    if (formOk && agreed) {
      print("Registration submitted for " + country);
    } else {
      print("Please fix the form or agree to the terms.");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: formKey,
      child: Column(
        children: [
          TextFormField(
            decoration: const InputDecoration(labelText: "Full name"),
            validator: (v) => (v == null || v.isEmpty) ? "Name is required" : null,
          ),
          TextFormField(
            decoration: const InputDecoration(labelText: "Email"),
            validator: (v) => (v == null || !v.contains("@")) ? "Invalid email" : null,
          ),
          DropdownButton<String>(
            value: country,
            items: ["Pakistan", "India", "USA"]
                .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                .toList(),
            onChanged: (v) => setState(() => country = v!),
          ),
          Row(
            children: [
              Checkbox(
                value: agreed,
                onChanged: (v) => setState(() => agreed = v!),
              ),
              const Text("I agree to the Terms"),
            ],
          ),
          ElevatedButton(onPressed: submit, child: const Text("Register")),
        ],
      ),
    );
  }
}`,
      },
      tip: "Build real forms piece by piece — get the TextFormFields working first, then add the dropdown, then the checkbox, testing after each addition.",
      warning: "Do not forget to check both formKey.currentState!.validate() AND the checkbox state together — a form can be 'valid' on text fields while the terms checkbox is still unchecked.",
      practice: {
        level1: "Add a phone number TextFormField with a simple 'not empty' validator.",
        level2: "Add a 4th country to the dropdown's options.",
        level3: "Change submit() to show a different printed message depending on exactly which part failed (form vs checkbox).",
      },
      summary:
        "You combined TextFormField, validation, DropdownButton, and Checkbox into one complete, realistic registration form.",
      next: "Next chapter, you will learn how to navigate between multiple screens in your app.",
      quiz: {
        q: "In the registration form example, what two things does submit() check before accepting the form?",
        options: [
          "The form's validate() result AND whether the terms checkbox is agreed",
          "Only the country dropdown value",
          "Only whether the app has internet access",
          "Nothing is checked, submit always succeeds",
        ],
        answer: 0,
        explain: "submit() requires both a valid form (via validate()) and the agreed checkbox to be true.",
      },
      quiz2: {
        q: "Why is it useful to build a form like this piece by piece (fields, then dropdown, then checkbox)?",
        options: [
          "It is easier to test and fix each part before adding more complexity",
          "Flutter requires building forms in a fixed order",
          "It makes the final app file smaller",
          "There is no benefit, order never matters",
        ],
        answer: 0,
        explain: "Building incrementally makes it much easier to catch and fix mistakes early, rather than debugging everything at once.",
      },
      challenge: {
        title: "Submit check",
        desc: "Write a submit() function that checks a bool formValid and a bool agreed, printing success only if both are true.",
        starter: `void submit(bool formValid, bool agreed) {
  // print success only if both are true, otherwise print a helpful message
}`,
        solution: `void submit(bool formValid, bool agreed) {
  if (formValid && agreed) {
    print("Registration submitted!");
  } else {
    print("Please fix the form or agree to the terms.");
  }
}`,
        keywords: [
          { label: "Checks both conditions", hint: "formValid && agreed", pattern: "&&" },
          { label: "Uses if/else", hint: "if (...) { } else", pattern: "if\\s*\\(" },
          { label: "Prints a result", hint: "print(...)", pattern: "print\\s*\\(" },
        ],
      },
      outcomes: [
        "Combine multiple form fields into one working form",
        "Validate text fields together with a checkbox state",
        "Structure a realistic registration screen",
      ],
    },
  ],
};
