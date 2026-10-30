// Chapter 7 — Layouts and Responsive Design

export const CH_LAYOUTS = {
  id: "layouts",
  title: "Layouts and Responsive Design",
  icon: "layout-grid",
  color: "#0288d1",
  lessons: [
    {
      title: "Alignment and Constraints",
      xp: 10,
      def:
        "**Alignment** controls where a widget sits inside its parent, like centered or top-left. **Constraints** are the size limits a parent gives its child — in Flutter, a widget's size is decided by a mix of what the parent allows and what the child wants.",
      example:
        "A login button might be center-aligned on screen using Center or Align, while the screen itself tells that button 'you cannot be wider than the phone's width' — that limit is a constraint.",
      learn: [
        "How Center and Align position a single child",
        "How mainAxisAlignment and crossAxisAlignment work in Row/Column",
        "The basic idea that 'constraints go down, sizes go up'",
      ],
      scenario:
        "Think of it like this: constraints are like a picture frame telling a photo 'you must fit inside these exact dimensions'. Alignment is like deciding whether the photo sits centered, top-left, or bottom-right inside that frame.",
      visual: {
        kind: "table",
        title: "Alignment options in Row/Column",
        columns: ["Property", "Controls"],
        rows: [
          ["mainAxisAlignment", "Spacing along the main direction (e.g. horizontally in a Row)"],
          ["crossAxisAlignment", "Alignment across the other direction (e.g. vertically in a Row)"],
        ],
      },
      code: {
        label: "Aligning children in a Row",
        content: `import 'package:flutter/material.dart';

class AlignedButtons extends StatelessWidget {
  const AlignedButtons({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        ElevatedButton(onPressed: () {}, child: const Text("Cancel")),
        ElevatedButton(onPressed: () {}, child: const Text("Confirm")),
      ],
    );
  }
}`,
      },
      tip: "If something looks oddly placed, check mainAxisAlignment and crossAxisAlignment first — they solve most everyday positioning questions.",
      warning: "Do not expect a child widget to grow bigger than the maximum size its parent allows — a child cannot force itself past its parent's constraints.",
      practice: {
        level1: "Change mainAxisAlignment to MainAxisAlignment.center and describe the expected result.",
        level2: "Add a third button and set mainAxisAlignment to MainAxisAlignment.spaceAround.",
        level3: "Describe, in words, how crossAxisAlignment would change if the two buttons had different heights.",
      },
      summary:
        "Alignment decides where a widget sits inside its parent, while constraints are the size rules passed down from parent to child.",
      next: "Next, you will learn ListView and GridView for showing scrollable lists and grids of items.",
      quiz: {
        q: "What does mainAxisAlignment control inside a Row?",
        options: [
          "Spacing of children along the row's horizontal direction",
          "The app's internet connection",
          "The color of the background",
          "Whether the app uses dark mode",
        ],
        answer: 0,
        explain: "mainAxisAlignment arranges spacing of children along the main direction of a Row or Column.",
      },
      quiz2: {
        q: "In Flutter's layout system, which best describes how sizing works?",
        options: [
          "Constraints flow down from parent to child, and sizes flow back up",
          "Children can always be any size regardless of their parent",
          "Only the screen size matters, parents have no effect",
          "Sizing is decided entirely at random each time",
        ],
        answer: 0,
        explain: "Flutter's layout model passes constraints down the tree, and widgets report their resulting size back up.",
      },
      challenge: {
        title: "Space between buttons",
        desc: "Build a Row with two buttons using MainAxisAlignment.spaceBetween.",
        starter: `import 'package:flutter/material.dart';

class ActionRow extends StatelessWidget {
  const ActionRow({super.key});

  @override
  Widget build(BuildContext context) {
    // return a Row with spaceBetween and two buttons
  }
}`,
        solution: `import 'package:flutter/material.dart';

class ActionRow extends StatelessWidget {
  const ActionRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        ElevatedButton(onPressed: () {}, child: const Text("Back")),
        ElevatedButton(onPressed: () {}, child: const Text("Next")),
      ],
    );
  }
}`,
        keywords: [
          { label: "Uses Row", hint: "Row(...)", pattern: "Row\\s*\\(" },
          { label: "Uses mainAxisAlignment", hint: "mainAxisAlignment:", pattern: "mainAxisAlignment\\s*:" },
          { label: "Has two buttons", hint: "ElevatedButton", pattern: "ElevatedButton" },
        ],
      },
      outcomes: [
        "Use Center and Align to position a widget",
        "Use mainAxisAlignment and crossAxisAlignment inside Row/Column",
        "Explain how constraints flow from parent to child",
      ],
    },
    {
      title: "ListView and GridView",
      xp: 15,
      def:
        "**ListView** shows a scrollable list of items, one after another. **GridView** shows items arranged in a scrollable grid, like a photo gallery. Both are perfect for showing many items without worrying about screen size.",
      example:
        "A news app shows articles in a vertical ListView, scrolling down for more. A photo gallery app often uses a GridView to show many thumbnails side by side in neat rows and columns.",
      learn: [
        "How ListView.builder efficiently shows long lists",
        "How GridView.count arranges items into a grid",
        "Why builder-style constructors are better for long lists than plain lists of widgets",
      ],
      scenario:
        "Think of it like this: ListView is like a long receipt scrolling down with one item per line. GridView is like a photo wall where pictures are arranged in neat rows and columns, and you scroll to see more.",
      visual: {
        kind: "table",
        title: "ListView vs GridView",
        columns: ["Widget", "Arranges items"],
        rows: [
          ["ListView.builder", "One after another, usually vertically, scrollable"],
          ["GridView.count", "In a grid with a fixed number of columns, scrollable"],
        ],
      },
      code: {
        label: "A simple scrollable list",
        content: `import 'package:flutter/material.dart';

class ContactList extends StatelessWidget {
  const ContactList({super.key});

  @override
  Widget build(BuildContext context) {
    List<String> contacts = ["Ali", "Sara", "Hamza", "Fatima"];

    return ListView.builder(
      itemCount: contacts.length,
      itemBuilder: (context, index) {
        return ListTile(
          leading: const Icon(Icons.person),
          title: Text(contacts[index]),
        );
      },
    );
  }
}`,
      },
      tip: "Prefer ListView.builder over a plain ListView(children: [...]) when your list could grow large — builder only creates items that are actually visible on screen.",
      warning: "Do not place a ListView directly inside another scrolling widget without special settings (like shrinkWrap) — nested scroll areas can cause confusing layout errors.",
      practice: {
        level1: "Change the contacts list above to include 2 more names.",
        level2: "Add a trailing Icon (like Icons.call) to each ListTile.",
        level3: "Rewrite the same contacts as a GridView.count with 2 columns, showing just the names in boxes.",
      },
      summary:
        "ListView and GridView let you show many items in a scrollable list or grid, with .builder constructors handling large lists efficiently.",
      next: "Next, you will learn how Wrap and basic scrolling fixes keep layouts flexible when content does not fit.",
      quiz: {
        q: "Why is ListView.builder usually preferred over listing all children directly for a long list?",
        options: [
          "It only builds the items currently visible, which is more efficient",
          "It automatically fixes all app bugs",
          "It removes the need for any data at all",
          "It can only show exactly 10 items ever",
        ],
        answer: 0,
        explain: "ListView.builder lazily builds items as needed, which is much more efficient for long lists.",
      },
      quiz2: {
        q: "A photo app wants to show thumbnails arranged in rows and columns. Which widget fits best?",
        options: ["GridView", "ListView only", "Row by itself", "AppBar"],
        answer: 0,
        explain: "GridView is designed specifically for grid-style, scrollable layouts like photo galleries.",
      },
      challenge: {
        title: "Build a contact list",
        desc: "Use ListView.builder with a List<String> of names to display each name inside a ListTile.",
        starter: `import 'package:flutter/material.dart';

class ContactList extends StatelessWidget {
  const ContactList({super.key});

  @override
  Widget build(BuildContext context) {
    List<String> names = ["Ali", "Sara"];
    // return a ListView.builder showing each name
  }
}`,
        solution: `import 'package:flutter/material.dart';

class ContactList extends StatelessWidget {
  const ContactList({super.key});

  @override
  Widget build(BuildContext context) {
    List<String> names = ["Ali", "Sara"];
    return ListView.builder(
      itemCount: names.length,
      itemBuilder: (context, index) {
        return ListTile(title: Text(names[index]));
      },
    );
  }
}`,
        keywords: [
          { label: "Uses ListView.builder", hint: "ListView.builder(", pattern: "ListView\\.builder\\s*\\(" },
          { label: "Uses itemBuilder", hint: "itemBuilder:", pattern: "itemBuilder\\s*:" },
          { label: "Uses ListTile", hint: "ListTile(...)", pattern: "ListTile\\s*\\(" },
        ],
      },
      outcomes: [
        "Build a scrollable list using ListView.builder",
        "Build a grid layout using GridView",
        "Explain why builder constructors are more efficient for long lists",
      ],
    },
    {
      title: "Wrap and Scrolling",
      xp: 10,
      def:
        "**Wrap** arranges widgets in a row, and automatically moves extra items to a new line when they do not fit — unlike Row, which keeps everything on one line and can overflow. **SingleChildScrollView** lets any content scroll if it is too tall or wide for the screen.",
      example:
        "A list of filter tags like 'Popular', 'New', 'Discount' might use Wrap so that if there are too many tags for one line, they naturally flow onto a second line, instead of getting cut off.",
      learn: [
        "How Wrap differs from Row when content does not fit",
        "How SingleChildScrollView makes any content scrollable",
        "When to choose Wrap versus a scrollable Row",
      ],
      scenario:
        "Think of it like this: Row is like a single shelf that can only hold so many books before they fall off the edge. Wrap is like a shelf that automatically adds a new row above it when the current one is full.",
      visual: {
        kind: "table",
        title: "Wrap vs Row",
        columns: ["Widget", "When content overflows"],
        rows: [
          ["Row", "Can overflow or need manual fixes (Expanded, scroll)"],
          ["Wrap", "Automatically moves extra items to a new line"],
        ],
      },
      code: {
        label: "Tags using Wrap",
        content: `import 'package:flutter/material.dart';

class TagList extends StatelessWidget {
  const TagList({super.key});

  @override
  Widget build(BuildContext context) {
    List<String> tags = ["Popular", "New", "Discount", "Trending", "Limited"];

    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: tags
          .map((tag) => Chip(label: Text(tag)))
          .toList(),
    );
  }
}`,
      },
      tip: "Use the 'spacing' and 'runSpacing' properties of Wrap to control the gap between items and between lines.",
      warning: "Do not use Wrap when the order and exact positioning of items absolutely must stay in a single straight line — Wrap is meant for flexible, flowing content.",
      practice: {
        level1: "Add two more tags to the list above.",
        level2: "Change spacing and runSpacing to different values and describe the visual effect.",
        level3: "Wrap a tall Column of content in a SingleChildScrollView and describe what problem that solves.",
      },
      summary:
        "Wrap flows extra items onto new lines automatically, and SingleChildScrollView lets oversized content scroll instead of overflowing.",
      next: "Next, you will learn how to recognize and fix common overflow errors.",
      quiz: {
        q: "What makes Wrap different from Row when there is not enough horizontal space?",
        options: [
          "Wrap automatically moves extra items onto a new line",
          "Wrap deletes items that do not fit",
          "Wrap behaves exactly the same as Row in every case",
          "Wrap can only hold one item at a time",
        ],
        answer: 0,
        explain: "Wrap flows overflowing children onto additional lines, unlike Row which stays on a single line.",
      },
      quiz2: {
        q: "A Column of content is taller than the screen. What commonly fixes this?",
        options: [
          "Wrapping it in a SingleChildScrollView to allow scrolling",
          "Deleting half of the content automatically",
          "Switching the Column to a Row",
          "Nothing can be done about this situation",
        ],
        answer: 0,
        explain: "SingleChildScrollView allows content taller (or wider) than the screen to scroll instead of overflowing.",
      },
      challenge: {
        title: "Flowing tag list",
        desc: "Build a Wrap containing Chip widgets created from a List<String> of category names.",
        starter: `import 'package:flutter/material.dart';

class CategoryTags extends StatelessWidget {
  const CategoryTags({super.key});

  @override
  Widget build(BuildContext context) {
    List<String> categories = ["Sports", "Music", "Art"];
    // return a Wrap of Chip widgets built from categories
  }
}`,
        solution: `import 'package:flutter/material.dart';

class CategoryTags extends StatelessWidget {
  const CategoryTags({super.key});

  @override
  Widget build(BuildContext context) {
    List<String> categories = ["Sports", "Music", "Art"];
    return Wrap(
      spacing: 8,
      children: categories.map((c) => Chip(label: Text(c))).toList(),
    );
  }
}`,
        keywords: [
          { label: "Uses Wrap", hint: "Wrap(...)", pattern: "Wrap\\s*\\(" },
          { label: "Uses Chip", hint: "Chip(...)", pattern: "Chip\\s*\\(" },
          { label: "Maps a list", hint: ".map(...)", pattern: "\\.map\\s*\\(" },
        ],
      },
      outcomes: [
        "Use Wrap to flow items onto new lines automatically",
        "Use SingleChildScrollView to allow oversized content to scroll",
        "Decide between Wrap, Row, and scrolling for different situations",
      ],
    },
    {
      title: "Fixing Overflow Errors",
      xp: 15,
      def:
        "An **overflow error** happens when content is too big for the space it is given, often shown as yellow-and-black striped warning stripes. Common fixes include **Expanded**, **Flexible**, wrapping with scroll widgets, or simply shortening content.",
      example:
        "A long product name squeezed into a small Row next to a price tag can overflow and show warning stripes. Wrapping the product name Text in Expanded lets it shrink or wrap instead of breaking the layout.",
      learn: [
        "What causes the classic yellow-and-black overflow warning",
        "How Expanded and Flexible solve overflow inside Row/Column",
        "Other simple fixes: scroll widgets, maxLines, and TextOverflow.ellipsis",
      ],
      scenario:
        "Think of it like this: an overflow error is like trying to fit a full-size couch through a narrow doorway. Expanded is like giving that couch a flexible 'this item can shrink or stretch to fit' instruction instead of forcing a fixed size.",
      visual: {
        kind: "table",
        title: "Common overflow fixes",
        columns: ["Fix", "Used for"],
        rows: [
          ["Expanded", "Let a Row/Column child grow or shrink to fill space"],
          ["Flexible", "Similar to Expanded, but with more fine control"],
          ["TextOverflow.ellipsis", "Cut long text short with '...' instead of breaking layout"],
        ],
      },
      code: {
        label: "Fixing an overflowing Row",
        content: `import 'package:flutter/material.dart';

class ProductRow extends StatelessWidget {
  const ProductRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Text(
            "Wireless Noise Cancelling Over-Ear Headphones",
            overflow: TextOverflow.ellipsis,
          ),
        ),
        const Text("\$199"),
      ],
    );
  }
}`,
      },
      tip: "When you see yellow-and-black warning stripes, your first guess should usually be: wrap the overflowing child in Expanded or Flexible.",
      warning: "Do not just make font sizes tiny to 'hide' an overflow problem — fix the actual layout with Expanded, Flexible, or scrolling so your UI stays readable.",
      practice: {
        level1: "Explain what the yellow-and-black overflow warning usually means.",
        level2: "Add Expanded around a long Text inside a Row to fix an overflow.",
        level3: "Add overflow: TextOverflow.ellipsis and maxLines: 1 to a Text widget and describe the visual result.",
      },
      summary:
        "Overflow errors happen when content does not fit its space, and Expanded, Flexible, and text overflow settings are the main tools to fix them.",
      next: "Next chapter, you will build real forms with text fields, validation, and buttons.",
      quiz: {
        q: "What does wrapping a Text widget in Expanded usually fix inside a Row?",
        options: [
          "It lets the Text take up remaining space instead of overflowing",
          "It deletes the text completely",
          "It makes the Row disappear",
          "It changes the app's theme color",
        ],
        answer: 0,
        explain: "Expanded allows a child to grow (or shrink) to fill the available space in a Row or Column.",
      },
      quiz2: {
        q: "A product name is too long and breaks the layout next to a price tag. Besides Expanded, what else can help?",
        options: [
          "Using TextOverflow.ellipsis to cut the text short with '...'",
          "Deleting the price tag entirely",
          "Changing the app's package name",
          "Switching to a GridView instead of fixing the Row",
        ],
        answer: 0,
        explain: "TextOverflow.ellipsis is a simple way to shorten overflowing text while keeping the layout stable.",
      },
      challenge: {
        title: "Fix the overflowing row",
        desc: "Build a Row with a long product name and a price, using Expanded and TextOverflow.ellipsis to prevent overflow.",
        starter: `import 'package:flutter/material.dart';

class PriceRow extends StatelessWidget {
  const PriceRow({super.key});

  @override
  Widget build(BuildContext context) {
    // return a Row with Expanded Text (ellipsis) and a price Text
  }
}`,
        solution: `import 'package:flutter/material.dart';

class PriceRow extends StatelessWidget {
  const PriceRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Text(
            "Very Long Product Name Here",
            overflow: TextOverflow.ellipsis,
          ),
        ),
        const Text("\$49"),
      ],
    );
  }
}`,
        keywords: [
          { label: "Uses Expanded", hint: "Expanded(...)", pattern: "Expanded\\s*\\(" },
          { label: "Uses TextOverflow.ellipsis", hint: "TextOverflow.ellipsis", pattern: "TextOverflow\\.ellipsis" },
          { label: "Uses Row", hint: "Row(...)", pattern: "Row\\s*\\(" },
        ],
      },
      outcomes: [
        "Recognize what causes an overflow warning",
        "Use Expanded or Flexible to fix overflow in Row/Column",
        "Use TextOverflow.ellipsis to shorten long text safely",
      ],
    },
  ],
};
