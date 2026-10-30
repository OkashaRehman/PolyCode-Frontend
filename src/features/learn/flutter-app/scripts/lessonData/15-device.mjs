// Chapter 15 — Images, Files, and Device Features

export const CH_DEVICE = {
  id: "device",
  title: "Images, Files, and Device Features",
  icon: "camera",
  color: "#2e7d32",
  lessons: [
    {
      title: "Picking Images",
      xp: 15,
      def:
        "The **image_picker** package lets a user choose a photo from their gallery or take a new one with the camera, returning a file your app can show or upload.",
      example:
        "A profile screen might have an 'Edit photo' button. Tapping it opens image_picker, lets the user choose a new picture from their gallery, and then shows that picture as the new profile photo.",
      learn: [
        "How to call ImagePicker().pickImage() to choose a photo",
        "The difference between ImageSource.gallery and ImageSource.camera",
        "How to show the picked image using an Image widget",
      ],
      scenario:
        "Think of it like this: image_picker is like politely asking a friend 'can I borrow one of your photo albums (or your camera) for a second?' — your app does not own the photos; it simply asks permission to use one.",
      visual: {
        kind: "table",
        title: "Image source options",
        columns: ["Source", "Behavior"],
        rows: [
          ["ImageSource.gallery", "Opens the photo gallery/library to choose an existing photo"],
          ["ImageSource.camera", "Opens the camera to take a brand-new photo"],
        ],
      },
      code: {
        label: "Picking an image from the gallery",
        content: `import 'package:image_picker/image_picker.dart';
import 'dart:io';

Future<File?> pickProfilePhoto() async {
  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);

  if (pickedFile != null) {
    return File(pickedFile.path);
  }
  return null;
}`,
      },
      tip: "Always handle the case where the user cancels picking an image — pickImage() can return null, and your app should not crash because of it.",
      warning: "Do not forget that picking images from the camera or gallery requires platform permissions to be configured, which you will cover in the next lesson.",
      practice: {
        level1: "Explain, in your own words, the difference between ImageSource.gallery and ImageSource.camera.",
        level2: "Write a function pickFromCamera() similar to the example, but using ImageSource.camera.",
        level3: "Describe how you would show the picked File using an Image.file() widget on screen.",
      },
      summary:
        "image_picker lets users choose or take a photo, returning a file your app can display or upload, with gallery and camera as the two main sources.",
      next: "Next, you will learn about requesting permissions, which are required before using features like the camera.",
      quiz: {
        q: "What does ImageSource.camera do when passed to pickImage()?",
        options: [
          "Opens the device camera to take a new photo",
          "Opens the gallery to choose an existing photo",
          "Deletes all existing photos",
          "Has no effect at all",
        ],
        answer: 0,
        explain: "ImageSource.camera tells image_picker to open the camera for a fresh photo.",
      },
      quiz2: {
        q: "Why must your code handle pickImage() possibly returning null?",
        options: [
          "The user might cancel the picker without choosing a photo",
          "pickImage() never returns null in any situation",
          "Null means the app crashed completely",
          "Null only happens on iOS devices",
        ],
        answer: 0,
        explain: "If the user cancels, pickImage() returns null, and your code should handle that gracefully.",
      },
      challenge: {
        title: "Handle a picked file",
        desc: "Write a function describePick(File? file) that returns 'No photo chosen' if file is null, or 'Photo ready' otherwise.",
        starter: `import 'dart:io';

String describePick(File? file) {
  // return a message based on whether file is null
}`,
        solution: `import 'dart:io';

String describePick(File? file) {
  if (file == null) {
    return "No photo chosen";
  }
  return "Photo ready";
}`,
        keywords: [
          { label: "Checks for null", hint: "file == null", pattern: "==\\s*null" },
          { label: "Returns a message", hint: "return \"...\"", pattern: "return\\s+\"" },
          { label: "Takes a File?", hint: "File? file", pattern: "File\\?\\s+\\w+" },
        ],
      },
      outcomes: [
        "Use ImagePicker to choose a photo from the gallery or camera",
        "Handle the case where the user cancels picking an image",
        "Show a picked image file on screen",
      ],
    },
    {
      title: "Handling Permissions",
      xp: 15,
      def:
        "**Permissions** are explicit approvals a user must grant before an app can access sensitive features, like the camera, photos, or location. Flutter apps usually request these using a package like `permission_handler`.",
      example:
        "Before letting a user take a profile photo, the app must first ask 'Can this app use your camera?' If the user denies it, the app should explain why the camera is needed instead of silently failing.",
      learn: [
        "Why operating systems require explicit permission for sensitive features",
        "How to check and request a permission using permission_handler",
        "How to react to a user denying a permission",
      ],
      scenario:
        "Think of it like this: permissions are like a guest asking 'may I use your kitchen?' before cooking in someone else's house. The phone's camera, photos, and location are the homeowner's property, and the app is always just a polite guest.",
      visual: {
        kind: "table",
        title: "Permission states",
        columns: ["State", "Meaning"],
        rows: [
          ["granted", "The user allowed access"],
          ["denied", "The user said no (can often be asked again)"],
          ["permanentlyDenied", "The user must manually enable it from device settings"],
        ],
      },
      code: {
        label: "Requesting camera permission",
        content: `import 'package:permission_handler/permission_handler.dart';

Future<bool> requestCameraPermission() async {
  var status = await Permission.camera.status;

  if (status.isGranted) {
    return true;
  }

  status = await Permission.camera.request();
  return status.isGranted;
}`,
      },
      tip: "Always explain to the user why you need a permission before asking for it — a quick sentence like 'We need camera access to let you set a profile photo' improves acceptance rates.",
      warning: "Do not assume a denied permission means 'never ask again forever' — only permanentlyDenied truly requires the user to go into system settings manually.",
      practice: {
        level1: "Explain, in your own words, why apps must request permission before using the camera.",
        level2: "Write a similar function requestGalleryPermission() for photo access.",
        level3: "Describe what your app should show the user if a permission is permanentlyDenied.",
      },
      summary:
        "Permissions protect sensitive device features, and apps must explicitly check and request them before using things like the camera or photo gallery.",
      next: "Next, you will learn the general concept of uploading a picked file to a server.",
      quiz: {
        q: "What does a 'permanentlyDenied' permission status usually mean?",
        options: [
          "The user must enable it manually from device settings",
          "The app can simply ask again immediately with no issue",
          "The feature is permanently removed from the phone",
          "It is the same as 'granted'",
        ],
        answer: 0,
        explain: "permanentlyDenied means the normal in-app request dialog will no longer appear; settings must be used.",
      },
      quiz2: {
        q: "Why is it good practice to explain WHY a permission is needed before requesting it?",
        options: [
          "Users are more likely to grant permission when they understand the reason",
          "Explaining has no effect on user behavior at all",
          "Operating systems require an explanation screen by law in every country",
          "It makes the permission request happen faster technically",
        ],
        answer: 0,
        explain: "Clear context about why a permission is needed tends to improve user trust and acceptance.",
      },
      challenge: {
        title: "Check permission status",
        desc: "Write a function describeStatus(bool granted) that returns 'Access allowed' or 'Access denied' based on the bool.",
        starter: `String describeStatus(bool granted) {
  // return the right message based on granted
}`,
        solution: `String describeStatus(bool granted) {
  if (granted) {
    return "Access allowed";
  }
  return "Access denied";
}`,
        keywords: [
          { label: "Checks the bool", hint: "if (granted)", pattern: "granted" },
          { label: "Returns a message", hint: "return \"...\"", pattern: "return\\s+\"" },
          { label: "Handles both cases", hint: "if/else or two returns", pattern: "return" },
        ],
      },
      outcomes: [
        "Explain why permissions are required for sensitive features",
        "Check and request a permission using permission_handler",
        "React appropriately to denied or permanently denied permissions",
      ],
    },
    {
      title: "File Upload Concepts",
      xp: 15,
      def:
        "Uploading a file means sending its data from your app to a server, usually using a **multipart request**, which can carry both regular fields (like a username) and binary file data (like an image) together.",
      example:
        "After picking a profile photo, an app sends a multipart POST request to the server with the image file attached, so the server can save it and link it to the user's account.",
      learn: [
        "Why file uploads often need a different request type (multipart) than plain JSON",
        "The basic steps: pick a file, build a multipart request, send it, read the response",
        "Why upload progress and errors matter for a good user experience",
      ],
      scenario:
        "Think of it like this: a normal JSON request is like mailing a letter with just words inside. A multipart upload is like mailing a package that contains both a note (text fields) and a physical object (the file) in the same box.",
      visual: {
        kind: "table",
        title: "Upload flow",
        columns: ["Step", "What happens"],
        rows: [
          ["1. Pick file", "Using image_picker or a file picker"],
          ["2. Build multipart request", "Attach the file plus any extra fields"],
          ["3. Send and handle response", "Check status code, show success or error"],
        ],
      },
      code: {
        label: "A simplified multipart upload",
        content: `import 'package:http/http.dart' as http;

Future<bool> uploadProfilePhoto(String filePath, String userId) async {
  var request = http.MultipartRequest(
    "POST",
    Uri.parse("https://api.example.com/upload"),
  );

  request.fields["userId"] = userId;
  request.files.add(await http.MultipartFile.fromPath("photo", filePath));

  var response = await request.send();
  return response.statusCode == 200;
}`,
      },
      tip: "Give the uploaded file field a clear name (like 'photo' above) that matches exactly what the server expects — mismatched field names are a very common upload bug.",
      warning: "Do not forget uploads can fail due to slow or dropped connections — always show upload progress or at least a clear loading state, and handle failures gracefully.",
      practice: {
        level1: "Explain, in your own words, why file uploads often use multipart requests instead of plain JSON.",
        level2: "List the three basic steps of a file upload flow, in your own words.",
        level3: "Describe how you would show an upload progress percentage to the user (conceptually, no need for exact code).",
      },
      summary:
        "File uploads typically use multipart requests to send both regular fields and binary file data together, and should always account for failures.",
      next: "Next chapter, you will learn how to add animations and polish to your app's interface.",
      quiz: {
        q: "Why are multipart requests commonly used for file uploads?",
        options: [
          "They can carry both regular text fields and binary file data together",
          "They are only used for sending plain text messages",
          "They remove the need for any server at all",
          "They always run faster than every other request type",
        ],
        answer: 0,
        explain: "Multipart requests are designed to bundle file data alongside regular form fields in one request.",
      },
      quiz2: {
        q: "What is a common mistake that breaks file uploads to a server?",
        options: [
          "Using a field name for the file that does not match what the server expects",
          "Always using the correct status code",
          "Uploading too quickly",
          "Using too few permissions",
        ],
        answer: 0,
        explain: "Servers usually expect a specific field name for the uploaded file; a mismatch causes the upload to fail silently or with an error.",
      },
      challenge: {
        title: "Check upload success",
        desc: "Write a function uploadSucceeded(int statusCode) that returns true only when statusCode equals 200.",
        starter: `bool uploadSucceeded(int statusCode) {
  // return true only if statusCode is 200
}`,
        solution: `bool uploadSucceeded(int statusCode) {
  return statusCode == 200;
}`,
        keywords: [
          { label: "Compares statusCode", hint: "statusCode == 200", pattern: "statusCode\\s*==\\s*200" },
          { label: "Returns a bool", hint: "return ...", pattern: "return" },
          { label: "Takes an int parameter", hint: "int statusCode", pattern: "int\\s+statusCode" },
        ],
      },
      outcomes: [
        "Explain why file uploads often use multipart requests",
        "Describe the basic steps of a file upload flow",
        "Plan for upload failures and progress feedback",
      ],
    },
  ],
};
