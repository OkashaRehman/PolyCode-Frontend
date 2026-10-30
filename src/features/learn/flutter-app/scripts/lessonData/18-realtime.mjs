// Chapter 18 — Real-Time Applications and Chat

export const CH_REALTIME = {
  id: "realtime",
  title: "Real-Time Applications and Chat",
  icon: "message-circle",
  color: "#01579b",
  lessons: [
    {
      title: "Polling vs WebSockets",
      xp: 15,
      def:
        "**Polling** means repeatedly asking the server 'anything new?' every few seconds. A **WebSocket** keeps an open connection, so the server can instantly push new data to your app the moment it happens, without you having to keep asking.",
      example:
        "An old-style approach might check for new chat messages every 3 seconds (polling), which wastes requests when nothing is new. A WebSocket connection instead lets the server immediately send a new message to QuantumChat the moment someone sends it.",
      learn: [
        "How polling works and why it is simple but a bit wasteful",
        "How WebSockets keep a live, two-way connection open",
        "When polling is still a perfectly reasonable choice",
      ],
      scenario:
        "Think of it like this: polling is like repeatedly calling a friend every few minutes asking 'any news yet?'. A WebSocket is like staying on a single phone call where your friend can simply tell you the news the instant it happens, with no need to ask again.",
      visual: {
        kind: "table",
        title: "Polling vs WebSockets",
        columns: ["Approach", "Behavior", "Good for"],
        rows: [
          ["Polling", "Repeatedly asks the server on a timer", "Simple features, infrequent updates"],
          ["WebSockets", "Keeps a live connection, server pushes updates instantly", "Chat, live scores, real-time collaboration"],
        ],
      },
      code: {
        label: "A simple polling loop (concept)",
        content: `import 'dart:async';

void startPolling(void Function() checkForUpdates) {
  Timer.periodic(const Duration(seconds: 3), (timer) {
    checkForUpdates();
  });
}

void main() {
  startPolling(() => print("Checking for new messages..."));
}`,
      },
      tip: "If your feature only needs occasional updates (like checking for app version updates once an hour), simple polling is often good enough and much easier to build than WebSockets.",
      warning: "Do not forget to stop a polling Timer when a screen closes — a Timer that keeps running after its screen is gone wastes resources and can cause errors.",
      practice: {
        level1: "Explain, in your own words, the difference between polling and WebSockets.",
        level2: "Change the polling interval above to every 5 seconds.",
        level3: "Describe a feature in your own app idea where polling would be good enough, versus one where WebSockets would really help.",
      },
      summary:
        "Polling repeatedly checks for updates on a timer, while WebSockets keep a live connection for instant updates — both have valid use cases.",
      next: "Next, you will build a chat UI, the visual foundation for a real-time messaging feature.",
      quiz: {
        q: "What is the main advantage of WebSockets over polling for a chat app?",
        options: [
          "The server can push new messages instantly, without repeated asking",
          "WebSockets never use any internet data",
          "Polling is always faster than WebSockets",
          "WebSockets remove the need for a server entirely",
        ],
        answer: 0,
        explain: "WebSockets maintain a live connection, letting the server send updates the moment they happen.",
      },
      quiz2: {
        q: "Why must a polling Timer be stopped when its screen closes?",
        options: [
          "To avoid wasting resources or causing errors after the screen no longer exists",
          "Timers automatically stop themselves in every case",
          "It has no effect either way",
          "Stopping a Timer deletes all app data",
        ],
        answer: 0,
        explain: "An uncancelled Timer can keep running and causing issues even after its related screen is gone.",
      },
      challenge: {
        title: "Describe polling vs websockets",
        desc: "Write a function describeApproach(bool realtime) returning 'WebSocket' if realtime is true, 'Polling' otherwise.",
        starter: `String describeApproach(bool realtime) {
  // return "WebSocket" or "Polling" based on realtime
}`,
        solution: `String describeApproach(bool realtime) {
  if (realtime) {
    return "WebSocket";
  }
  return "Polling";
}`,
        keywords: [
          { label: "Checks the bool", hint: "if (realtime)", pattern: "realtime" },
          { label: "Returns WebSocket", hint: "\"WebSocket\"", pattern: "WebSocket" },
          { label: "Returns Polling", hint: "\"Polling\"", pattern: "Polling" },
        ],
      },
      outcomes: [
        "Explain how polling works and its tradeoffs",
        "Explain how WebSockets provide instant updates",
        "Decide which approach fits a given feature",
      ],
    },
    {
      title: "Building a Chat UI",
      xp: 20,
      def:
        "A chat UI typically shows a scrollable list of **message bubbles**, styled differently depending on whether the message is from 'me' or from someone else, plus an input box at the bottom to send new messages.",
      example:
        "In QuantumChat, your own messages might appear as blue bubbles aligned to the right, while the other person's messages appear as grey bubbles aligned to the left — a very common and intuitive chat pattern.",
      learn: [
        "How to style a message bubble differently based on the sender",
        "How to align bubbles left or right using Alignment or MainAxisAlignment",
        "How to combine a ListView of bubbles with an input row at the bottom",
      ],
      scenario:
        "Think of it like this: a chat UI is like a conversation transcript where each speaker's lines are visually separated — one side of the page for you, the other side for the other person — making it instantly clear who said what.",
      visual: {
        kind: "table",
        title: "Message bubble styling",
        columns: ["Sender", "Alignment", "Color idea"],
        rows: [
          ["Me", "Right side", "A bright brand color, like blue"],
          ["Other person", "Left side", "A neutral color, like light grey"],
        ],
      },
      code: {
        label: "A simple message bubble widget",
        content: `import 'package:flutter/material.dart';

class ChatMessage {
  String text;
  bool isMe;
  ChatMessage(this.text, this.isMe);
}

class MessageBubble extends StatelessWidget {
  final ChatMessage message;
  const MessageBubble({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: message.isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.all(6),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: message.isMe ? Colors.blue : Colors.grey.shade300,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(
          message.text,
          style: TextStyle(color: message.isMe ? Colors.white : Colors.black),
        ),
      ),
    );
  }
}`,
      },
      tip: "Keep each ChatMessage's styling logic (color, alignment) inside the bubble widget itself, driven by a simple isMe flag — it keeps the list-building code simple.",
      warning: "Do not forget to scroll a chat ListView to the bottom when a new message arrives — otherwise users might miss new messages above the visible area.",
      practice: {
        level1: "Change the colors used for 'me' and 'other person' bubbles.",
        level2: "Add a small timestamp Text below the message text inside the bubble.",
        level3: "Build a ListView.builder from a List<ChatMessage>, showing a MessageBubble for each one.",
      },
      summary:
        "A chat UI uses styled, aligned message bubbles combined with an input box, driven by a simple ChatMessage model with an isMe flag.",
      next: "Next, you will build an educational, QuantumChat-style chat screen combining everything so far.",
      quiz: {
        q: "What is a common way to visually distinguish 'my' messages from the other person's in a chat UI?",
        options: [
          "Different alignment (left/right) and different colors",
          "There is no visual difference needed",
          "Only font size changes, never color or alignment",
          "By hiding one side's messages completely",
        ],
        answer: 0,
        explain: "Alignment and color are the most common, intuitive ways to distinguish message senders in chat UIs.",
      },
      quiz2: {
        q: "Why should a chat screen auto-scroll to the bottom when a new message arrives?",
        options: [
          "So users do not miss new messages that appear below the visible area",
          "Scrolling has no effect on the user experience",
          "It is required by every ListView regardless of content",
          "To hide older messages permanently",
        ],
        answer: 0,
        explain: "Auto-scrolling keeps the newest messages visible, matching how real chat apps behave.",
      },
      challenge: {
        title: "Build a ChatMessage model",
        desc: "Create a ChatMessage class with text and isMe fields and a constructor, then create a List<ChatMessage> with 2 items.",
        starter: `class ChatMessage {
  // add text and isMe fields and a constructor
}

void main() {
  // create a list of 2 ChatMessage objects
}`,
        solution: `class ChatMessage {
  String text;
  bool isMe;
  ChatMessage(this.text, this.isMe);
}

void main() {
  List<ChatMessage> messages = [
    ChatMessage("Hi!", true),
    ChatMessage("Hey, how are you?", false),
  ];
  print(messages.length);
}`,
        keywords: [
          { label: "Defines ChatMessage", hint: "class ChatMessage", pattern: "class\\s+ChatMessage" },
          { label: "Has isMe field", hint: "bool isMe", pattern: "bool\\s+isMe" },
          { label: "Creates a list", hint: "List<ChatMessage>", pattern: "List<ChatMessage>" },
        ],
      },
      outcomes: [
        "Style message bubbles differently based on the sender",
        "Align bubbles left or right using Alignment",
        "Combine a message list with an input row into a chat UI",
      ],
    },
    {
      title: "QuantumChat-Style Educational Chat",
      xp: 20,
      def:
        "This lesson builds a small, educational **QuantumChat-style chat screen**, combining a ChatMessage model, a scrollable message list, a text input with a controller, and a send button that adds a new message to the list.",
      example:
        "Tapping 'Send' after typing 'See you tomorrow!' should instantly add that message as a new bubble at the bottom of the chat, clear the input box, and scroll down automatically — exactly like a real chat app.",
      learn: [
        "How to combine everything from this chapter into one working chat screen",
        "How tapping Send updates the message list using setState",
        "How this mini-project mirrors a real feature in an app like QuantumChat",
      ],
      scenario:
        "Think of it like this: you have practiced each ingredient separately — the model, the bubbles, the input box. This lesson is the recipe that finally combines them all into one small, working dish: a real, usable chat screen.",
      visual: {
        kind: "diagram",
        title: "Chat screen pieces",
        nodes: [
          { label: "List<ChatMessage>", items: ["Stored in State"] },
          { label: "ListView of bubbles", items: ["Shows every message"] },
          { label: "TextField + Send button", items: ["Adds a new ChatMessage"] },
        ],
      },
      code: {
        label: "A complete mini chat screen",
        content: `import 'package:flutter/material.dart';

class ChatMessage {
  String text;
  bool isMe;
  ChatMessage(this.text, this.isMe);
}

class QuantumChatScreen extends StatefulWidget {
  const QuantumChatScreen({super.key});

  @override
  State<QuantumChatScreen> createState() => _QuantumChatScreenState();
}

class _QuantumChatScreenState extends State<QuantumChatScreen> {
  final List<ChatMessage> messages = [ChatMessage("Welcome to QuantumChat!", false)];
  final TextEditingController controller = TextEditingController();

  void sendMessage() {
    if (controller.text.trim().isEmpty) return;
    setState(() {
      messages.add(ChatMessage(controller.text, true));
      controller.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("QuantumChat")),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final m = messages[index];
                return Align(
                  alignment: m.isMe ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.all(6),
                    padding: const EdgeInsets.all(10),
                    color: m.isMe ? Colors.blue : Colors.grey.shade300,
                    child: Text(m.text),
                  ),
                );
              },
            ),
          ),
          Row(
            children: [
              Expanded(child: TextField(controller: controller)),
              IconButton(onPressed: sendMessage, icon: const Icon(Icons.send)),
            ],
          ),
        ],
      ),
    );
  }
}`,
      },
      tip: "Trim and check controller.text.trim().isEmpty before sending — it stops users from sending blank or whitespace-only messages.",
      warning: "Do not forget to call controller.clear() after sending — otherwise the old text stays in the box, confusing the user into thinking the message was not sent.",
      practice: {
        level1: "Change the welcome message text at the top of the chat.",
        level2: "Add a timestamp field to ChatMessage and show it under each bubble.",
        level3: "Describe how you would connect sendMessage() to a real backend using the networking chapter's ideas.",
      },
      summary:
        "You built a small but complete chat screen, combining a model, a message list, and an input box with a working send button.",
      next: "Next, you will review some final tips for handling real-time data responsibly.",
      quiz: {
        q: "Why check controller.text.trim().isEmpty before sending a message?",
        options: [
          "To avoid sending blank or whitespace-only messages",
          "trim() always deletes the entire message",
          "isEmpty only works on numbers, not text",
          "There is no reason to check this",
        ],
        answer: 0,
        explain: "Trimming and checking for emptiness prevents accidentally sending meaningless blank messages.",
      },
      quiz2: {
        q: "Why call controller.clear() right after adding a new message to the list?",
        options: [
          "So the input box is empty and ready for the next message",
          "To delete the message that was just sent",
          "It has no visible effect on the input box",
          "clear() is only used for lists, not text controllers",
        ],
        answer: 0,
        explain: "Clearing the controller resets the input box visually after the message has been captured and added.",
      },
      challenge: {
        title: "Send message logic",
        desc: "Write a function trySend(String text, List<String> messages) that adds text to messages only if it is not blank after trimming.",
        starter: `void trySend(String text, List<String> messages) {
  // add text to messages only if not blank after trim
}`,
        solution: `void trySend(String text, List<String> messages) {
  if (text.trim().isNotEmpty) {
    messages.add(text);
  }
}`,
        keywords: [
          { label: "Uses trim", hint: ".trim()", pattern: "\\.trim\\s*\\(" },
          { label: "Checks isNotEmpty", hint: ".isNotEmpty", pattern: "\\.isNotEmpty" },
          { label: "Adds to the list", hint: "messages.add(", pattern: "\\.add\\s*\\(" },
        ],
      },
      outcomes: [
        "Combine a model, list, and input into one chat screen",
        "Update a message list with setState when sending",
        "Validate input before sending a message",
      ],
    },
    {
      title: "Real-Time Data Handling Tips",
      xp: 15,
      def:
        "Working with real-time or frequently-updating data needs a few extra habits: avoiding duplicate messages, handling connection drops gracefully, and cleaning up listeners (Streams, Timers) when a screen closes.",
      example:
        "If a chat app's connection briefly drops and reconnects, it should avoid showing the same message twice, and should clearly show a 'Reconnecting...' indicator instead of silently failing.",
      learn: [
        "Why duplicate messages can happen and how to guard against them",
        "Why showing connection status (connected/reconnecting) builds user trust",
        "Why cleaning up Streams and Timers in dispose() matters",
      ],
      scenario:
        "Think of it like this: a flaky phone call sometimes glitches and repeats a word, or drops for a second. Good real-time apps are like a considerate speaker who notices the glitch, says 'sorry, connection trouble, one moment', and does not just repeat themselves awkwardly.",
      visual: {
        kind: "table",
        title: "Real-time habits",
        columns: ["Habit", "Why it matters"],
        rows: [
          ["Check for duplicate ids before adding messages", "Avoids the same message appearing twice"],
          ["Show a connection status indicator", "Keeps users informed instead of confused"],
          ["Cancel Streams/Timers in dispose()", "Avoids wasted resources and errors on closed screens"],
        ],
      },
      code: {
        label: "Avoiding duplicate messages by id",
        content: `class ChatMessage {
  String id;
  String text;
  ChatMessage(this.id, this.text);
}

void addMessageSafely(List<ChatMessage> messages, ChatMessage newMessage) {
  bool alreadyExists = messages.any((m) => m.id == newMessage.id);
  if (!alreadyExists) {
    messages.add(newMessage);
  }
}`,
      },
      tip: "Give each real-time message a unique id (even a simple timestamp-based one) early on — it makes duplicate-checking and later features much easier.",
      warning: "Do not forget to cancel any StreamSubscription or Timer inside a StatefulWidget's dispose() method — leaving them running after the screen closes can cause memory leaks or crashes.",
      practice: {
        level1: "Explain, in your own words, why duplicate messages can happen in real-time apps.",
        level2: "Write a function that checks if a message id already exists in a list before adding it.",
        level3: "Describe, in words, what your chat screen's dispose() method should clean up.",
      },
      summary:
        "Reliable real-time features need a few extra habits: guarding against duplicates, showing connection status, and cleaning up listeners properly.",
      next: "Next chapter, you will learn how to test and debug your Flutter apps properly.",
      quiz: {
        q: "Why use a unique id for each real-time message?",
        options: [
          "It makes checking for and preventing duplicate messages much easier",
          "ids make messages load faster over the network",
          "ids are only useful for images",
          "There is no benefit to using unique ids",
        ],
        answer: 0,
        explain: "Unique ids let your code reliably detect if a message has already been added, preventing duplicates.",
      },
      quiz2: {
        q: "What can happen if a StreamSubscription is never cancelled in dispose()?",
        options: [
          "It can keep running and cause memory leaks or errors after the screen closes",
          "Nothing, Dart automatically cancels every subscription",
          "The app automatically restarts",
          "It only affects the app's color theme",
        ],
        answer: 0,
        explain: "Uncancelled subscriptions can continue running against a disposed widget, leading to leaks or crashes.",
      },
      challenge: {
        title: "Prevent duplicate messages",
        desc: "Write a function addIfNew(List<String> ids, String newId) that adds newId to ids only if it is not already present.",
        starter: `void addIfNew(List<String> ids, String newId) {
  // add newId only if it is not already in ids
}`,
        solution: `void addIfNew(List<String> ids, String newId) {
  if (!ids.contains(newId)) {
    ids.add(newId);
  }
}`,
        keywords: [
          { label: "Checks contains", hint: ".contains(newId)", pattern: "\\.contains\\s*\\(" },
          { label: "Uses negation", hint: "!ids.contains", pattern: "!\\s*ids\\.contains" },
          { label: "Adds the id", hint: "ids.add(", pattern: "\\.add\\s*\\(" },
        ],
      },
      outcomes: [
        "Guard against duplicate real-time messages using unique ids",
        "Explain why showing connection status matters",
        "Clean up Streams and Timers in dispose()",
      ],
    },
  ],
};
