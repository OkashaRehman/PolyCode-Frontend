// PolyCode — OpenCV (Python) full curriculum
// 11 chapters · 36 lessons · keyword-graded Python challenges
// YouTube links: edit opencvVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { OPENCV_VIDEO_LINKS } from "./opencvVideoLinks";
import { OPENCV_LESSON_OUTCOMES } from "./opencvLessonOutcomes";

export const OPENCV_CHAPTERS = [
  {
    id: "intro",
    title: `Getting Started`,
    icon: "🔥",
    color: "#5CBF2A",
    lessons: [
      {
        id: "opencv-0",
        title: `What is OpenCV?`,
        xp: 10,
        theory: [
          { type: "text", content: `**OpenCV** (Open Source Computer Vision Library) is the most widely used toolkit for **image and video** processing in Python. Face unlock, barcode scanners, AR filters, and robot cameras all lean on the same ideas you'll learn here.` },
          { type: "scenario", title: `Smart parking camera`, content: `A garage camera captures frames. Software must find empty spots, read license plates, and ignore shadows. OpenCV gives you reading images, filtering noise, finding shapes, and detecting objects — building blocks for that pipeline.` },
          { type: "diagram", title: `OpenCV in a vision pipeline`, nodes: [
              { id: "in", label: `Input`, color: "#5CBF2A", items: [`Photos`, `Webcam`, `Video files`] },
              { id: "cv", label: `OpenCV`, color: "#7AD645", items: [`Filter`, `Detect`, `Measure`] },
              { id: "out", label: `Output`, color: "#3A9B1A", items: [`Boxes`, `Masks`, `Counts`] }
            ] },
          { type: "callout", variant: "tip", content: `Images in OpenCV are **NumPy arrays**. Knowing shape, dtype, and slicing from NumPy transfers directly.` },
          { type: "code", lang: "python", label: `Import OpenCV`, content: `import cv2
import numpy as np

print(cv2.__version__)` },
          { type: "quiz", question: `What is OpenCV mainly used for?`, options: [`Building websites`, `Image and video computer vision`, `Sending emails`, `Only training LLMs`], answer: 1, explanation: `OpenCV focuses on computer vision: reading, transforming, and analyzing images and video.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Import and print version`,
          description: `Import \`cv2\` and print \`cv2.__version__\`.`,
          starterCode: `# Import cv2 and print its version

`,
          solutionCode: `import cv2

print(cv2.__version__)`,
          tests: [
            { id: 1, label: `Imports cv2`, keywords: [{ pattern: `import\\s+cv2` }] },
            { id: 2, label: `Prints version`, keywords: [{ pattern: `print\\s*\\(\\s*cv2\\.__version__\\s*\\)` }] }
          ],
        },
      },
      {
        id: "opencv-1",
        title: `Install & First Imports`,
        xp: 10,
        theory: [
          { type: "text", content: `Install with \`pip install opencv-python\` (or \`opencv-contrib-python\` for extra modules). In code you almost always write \`import cv2\` and \`import numpy as np\`.` },
          { type: "table", title: `Packages`, columns: [`Package`, `Use when`], rows: [
              { label: `opencv-python`, values: [`opencv-python`, `Most courses and apps`] },
              { label: `opencv-contrib-python`, values: [`opencv-contrib-python`, `Extra algorithms (SIFT, etc.)`] },
              { label: `opencv-python-headless`, values: [`opencv-python-headless`, `Servers without GUI windows`] }
            ] },
          { type: "callout", variant: "info", content: `On PolyCode, challenges are **keyword-graded**. You do not need a live GUI window (\`imshow\`) to pass — focus on the API calls.` },
          { type: "code", lang: "python", label: `Standard imports`, content: `import cv2
import numpy as np

print("OpenCV ready:", cv2.__version__)
print("NumPy ready:", np.__version__)` },
          { type: "quiz", question: `Which import name do you use for OpenCV in Python?`, options: [`import opencv`, `import cv2`, `import vision`, `import image`], answer: 1, explanation: `The Python binding module is named \`cv2\`.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Import cv2 and NumPy`,
          description: `Import \`cv2\` and \`numpy as np\`, then print both version strings.`,
          starterCode: `# Import cv2 and numpy as np
# Print both versions

`,
          solutionCode: `import cv2
import numpy as np

print(cv2.__version__)
print(np.__version__)`,
          tests: [
            { id: 1, label: `Imports cv2`, keywords: [{ pattern: `import\\s+cv2` }] },
            { id: 2, label: `Imports numpy as np`, keywords: [{ pattern: `import\\s+numpy\\s+as\\s+np` }] },
            { id: 3, label: `Prints cv2 version`, keywords: [{ pattern: `cv2\\.__version__` }] }
          ],
        },
      },
      {
        id: "opencv-2",
        title: `First Image Pipeline`,
        xp: 10,
        theory: [
          { type: "text", content: `The classic loop is: **read → process → write**. \`cv2.imread(path)\` loads an image; \`cv2.imwrite(path, img)\` saves it. Always check that \`imread\` did not return \`None\`.` },
          { type: "code", lang: "python", label: `Read and write`, content: `import cv2

img = cv2.imread("photo.jpg")
if img is None:
    raise FileNotFoundError("Could not load photo.jpg")

ok = cv2.imwrite("copy.jpg", img)
print("saved:", ok)` },
          { type: "callout", variant: "warning", content: `\`imread\` fails silently with \`None\` if the path is wrong — always guard it in real apps.` },
          { type: "quiz", question: `What does cv2.imread return if the file is missing?`, options: [`An empty list`, `None`, `0`, `A black image array`], answer: 1, explanation: `A missing or unreadable file yields \`None\`.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Read then write`,
          description: `Load \`photo.jpg\` into \`img\` with \`cv2.imread\`, check it is not \`None\`, and save with \`cv2.imwrite("out.jpg", img)\`.`,
          starterCode: `import cv2

# Load photo.jpg into img, guard None, write out.jpg

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
if img is None:
    raise FileNotFoundError("missing photo.jpg")
cv2.imwrite("out.jpg", img)`,
          tests: [
            { id: 1, label: `Uses imread`, keywords: [{ pattern: `cv2\\.imread\\s*\\(` }] },
            { id: 2, label: `Checks None`, keywords: [{ pattern: `is\\s+None` }] },
            { id: 3, label: `Uses imwrite`, keywords: [{ pattern: `cv2\\.imwrite\\s*\\(` }] }
          ],
        },
      }
    ],
  },
  {
    id: "pixels",
    title: `Images & Pixels`,
    icon: "🧩",
    color: "#7AD645",
    lessons: [
      {
        id: "opencv-3",
        title: `Shape, dtype, and channels`,
        xp: 10,
        theory: [
          { type: "text", content: `A color image is a 3D NumPy array: **height × width × channels**. \`img.shape\` tells you \`(h, w, c)\`. \`img.dtype\` is usually \`uint8\` (0–255).` },
          { type: "callout", variant: "tip", content: `Always print **shape** and **dtype** right after **imread** — most CV bugs start with the wrong size or float vs uint8.` },
          { type: "code", lang: "python", label: `Inspect an image`, content: `import cv2

img = cv2.imread("photo.jpg")
print(img.shape)   # (H, W, 3)
print(img.dtype)   # uint8
h, w = img.shape[:2]
print(h, w)` },
          { type: "quiz", question: `For a BGR color image, what does shape[2] usually equal?`, options: [`1`, `2`, `3`, `255`], answer: 2, explanation: `Color images typically have 3 channels (B, G, R in OpenCV).` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Print shape and dtype`,
          description: `After loading \`img\`, print \`img.shape\` and \`img.dtype\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg")
# Print shape and dtype

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
print(img.shape)
print(img.dtype)`,
          tests: [
            { id: 1, label: `Prints shape`, keywords: [{ pattern: `print\\s*\\(\\s*img\\.shape\\s*\\)` }] },
            { id: 2, label: `Prints dtype`, keywords: [{ pattern: `print\\s*\\(\\s*img\\.dtype\\s*\\)` }] }
          ],
        },
      },
      {
        id: "opencv-4",
        title: `BGR vs RGB`,
        xp: 10,
        theory: [
          { type: "text", content: `OpenCV stores color as **BGR** (blue, green, red) — opposite of many libraries that use RGB. Convert with \`cv2.cvtColor(img, cv2.COLOR_BGR2RGB)\` when you need RGB order.` },
          { type: "callout", variant: "tip", content: `If colors look swapped (blue sky looks orange), you probably mixed BGR and RGB.` },
          { type: "code", lang: "python", label: `Convert to RGB`, content: `import cv2

bgr = cv2.imread("photo.jpg")
rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)` },
          { type: "quiz", question: `OpenCV's default color order for color images is…`, options: [`RGB`, `BGR`, `HSV`, `Gray`], answer: 1, explanation: `OpenCV uses BGR by default for \`imread\` color images.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Convert BGR to RGB`,
          description: `Convert \`bgr\` to \`rgb\` using \`cv2.cvtColor\` and \`COLOR_BGR2RGB\`.`,
          starterCode: `import cv2

bgr = cv2.imread("photo.jpg")
# Create rgb from bgr

`,
          solutionCode: `import cv2

bgr = cv2.imread("photo.jpg")
rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)`,
          tests: [
            { id: 1, label: `Uses cvtColor`, keywords: [{ pattern: `cv2\\.cvtColor\\s*\\(` }] },
            { id: 2, label: `Uses COLOR_BGR2RGB`, keywords: [{ pattern: `COLOR_BGR2RGB` }] },
            { id: 3, label: `Assigns rgb`, keywords: [{ pattern: `rgb\\s*=` }] }
          ],
        },
      },
      {
        id: "opencv-5",
        title: `Read and write pixels`,
        xp: 10,
        theory: [
          { type: "text", content: `Pixels are array entries. Color: \`img[y, x]\` → \`(B, G, R)\`. Gray: a single number. Remember OpenCV indexing is **row (y), column (x)**.` },
          { type: "scenario", title: `Fix a bad pixel`, content: `A barcode reader fails on one speck of glare. You jump to that **[y, x]** location, replace the BGR value, and re-run detection without reloading the whole image.` },
          { type: "code", lang: "python", label: `Get and set a pixel`, content: `import cv2
import numpy as np

img = cv2.imread("photo.jpg")
b, g, r = img[10, 20]
img[10, 20] = (0, 255, 0)  # green` },
          { type: "quiz", question: `In img[y, x], which index is the row?`, options: [`x`, `y`, `Both`, `Neither`], answer: 1, explanation: `\`y\` is the row (vertical), \`x\` is the column (horizontal).` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Paint one pixel green`,
          description: `Set \`img[50, 80]\` to green BGR \`(0, 255, 0)\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg")
# Set pixel (50, 80) to green

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
img[50, 80] = (0, 255, 0)`,
          tests: [
            { id: 1, label: `Indexes img[50, 80]`, keywords: [{ pattern: `img\\s*\\[\\s*50\\s*,\\s*80\\s*\\]` }] },
            { id: 2, label: `Sets green BGR`, keywords: [{ pattern: `0\\s*,\\s*255\\s*,\\s*0` }] }
          ],
        },
      },
      {
        id: "opencv-6",
        title: `Create blank images`,
        xp: 10,
        theory: [
          { type: "text", content: `Build canvases with NumPy: \`np.zeros((h, w, 3), dtype=np.uint8)\` for black, or fill with a color. Useful for drawings and overlays.` },
          { type: "callout", variant: "info", content: `Blank canvases are perfect scratchpads for drawing annotations before blending them onto a real photo.` },
          { type: "code", lang: "python", label: `Black and blue canvases`, content: `import numpy as np

h, w = 200, 300
black = np.zeros((h, w, 3), dtype=np.uint8)
blue = black.copy()
blue[:] = (255, 0, 0)  # BGR blue` },
          { type: "quiz", question: `Why use dtype=np.uint8 for image arrays?`, options: [`Faster floats`, `Pixel values 0–255 like real images`, `Required by NumPy always`, `Makes shape 2D`], answer: 1, explanation: `Standard images use 8-bit unsigned integers per channel.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Make a black canvas`,
          description: `Create \`canvas = np.zeros((120, 160, 3), dtype=np.uint8)\`.`,
          starterCode: `import numpy as np

# Create canvas 120x160x3 uint8 zeros

`,
          solutionCode: `import numpy as np

canvas = np.zeros((120, 160, 3), dtype=np.uint8)`,
          tests: [
            { id: 1, label: `Uses np.zeros`, keywords: [{ pattern: `np\\.zeros\\s*\\(` }] },
            { id: 2, label: `Shape 120,160,3`, keywords: [{ pattern: `120\\s*,\\s*160\\s*,\\s*3` }] },
            { id: 3, label: `dtype uint8`, keywords: [{ pattern: `uint8` }] }
          ],
        },
      }
    ],
  },
  {
    id: "drawing",
    title: `Drawing & ROI`,
    icon: "✏️",
    color: "#3A9B1A",
    lessons: [
      {
        id: "opencv-7",
        title: `Lines, rectangles, circles, text`,
        xp: 10,
        theory: [
          { type: "text", content: `Draw with \`cv2.line\`, \`cv2.rectangle\`, \`cv2.circle\`, and \`cv2.putText\`. Points are \`(x, y)\` — opposite of array indexing order.` },
          { type: "scenario", title: `Label a detection`, content: `After finding a box around a package, you draw the rectangle and **putText** the tracking ID so operators can see results on a monitor.` },
          { type: "code", lang: "python", label: `Draw shapes`, content: `import cv2
import numpy as np

img = np.zeros((200, 300, 3), dtype=np.uint8)
cv2.line(img, (10, 10), (100, 80), (0, 255, 0), 2)
cv2.rectangle(img, (50, 50), (150, 120), (255, 0, 0), 2)
cv2.circle(img, (200, 100), 40, (0, 0, 255), -1)
cv2.putText(img, "Hi", (20, 180), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)` },
          { type: "quiz", question: `Thickness -1 for circle/rectangle usually means…`, options: [`Delete shape`, `Fill the shape`, `Dashed line`, `Anti-alias off`], answer: 1, explanation: `Negative thickness fills the shape.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Draw a filled circle`,
          description: `On \`img\`, draw a filled red circle at (100, 80) with radius 30 using \`cv2.circle\`.`,
          starterCode: `import cv2
import numpy as np

img = np.zeros((160, 200, 3), dtype=np.uint8)
# Draw filled red circle

`,
          solutionCode: `import cv2
import numpy as np

img = np.zeros((160, 200, 3), dtype=np.uint8)
cv2.circle(img, (100, 80), 30, (0, 0, 255), -1)`,
          tests: [
            { id: 1, label: `Uses cv2.circle`, keywords: [{ pattern: `cv2\\.circle\\s*\\(` }] },
            { id: 2, label: `Center (100, 80)`, keywords: [{ pattern: `100\\s*,\\s*80` }] },
            { id: 3, label: `Filled (-1)`, keywords: [{ pattern: `-1` }] }
          ],
        },
      },
      {
        id: "opencv-8",
        title: `Crop and ROI`,
        xp: 10,
        theory: [
          { type: "text", content: `A **region of interest (ROI)** is a crop: \`roi = img[y1:y2, x1:x2]\`. Slicing shares memory with the parent unless you \`.copy()\`.` },
          { type: "callout", variant: "tip", content: `Crop generously at first, then tighten — lost context at the crop border is hard to recover later.` },
          { type: "code", lang: "python", label: `Crop a face box`, content: `import cv2

img = cv2.imread("photo.jpg")
roi = img[40:140, 80:180]
cv2.imwrite("face_crop.jpg", roi)` },
          { type: "quiz", question: `Which slice order is correct for OpenCV arrays?`, options: [`img[x1:x2, y1:y2]`, `img[y1:y2, x1:x2]`, `img[x, y]`, `img[channel, y, x]`], answer: 1, explanation: `Rows (y) come first, then columns (x).` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Crop an ROI`,
          description: `Create \`roi = img[20:100, 30:120]\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg")
# Crop roi

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
roi = img[20:100, 30:120]`,
          tests: [
            { id: 1, label: `Assigns roi`, keywords: [{ pattern: `roi\\s*=` }] },
            { id: 2, label: `Correct slice`, keywords: [{ pattern: `img\\s*\\[\\s*20\\s*:\\s*100\\s*,\\s*30\\s*:\\s*120\\s*\\]` }] }
          ],
        },
      },
      {
        id: "opencv-9",
        title: `Copy vs view overlays`,
        xp: 10,
        theory: [
          { type: "text", content: `\`roi = img[y1:y2, x1:x2]\` is a **view** — edits change the original. Use \`roi.copy()\` when you need an independent patch. Paste by assigning into a destination slice.` },
          { type: "code", lang: "python", label: `Paste a patch`, content: `import cv2

img = cv2.imread("photo.jpg")
patch = img[0:50, 0:50].copy()
img[100:150, 100:150] = patch` },
          { type: "callout", variant: "tip", content: `Mismatch in slice sizes raises a NumPy broadcasting/shape error — keep heights and widths equal.` },
          { type: "quiz", question: `Why call .copy() on an ROI before editing separately?`, options: [`Faster drawing`, `Avoid changing the original image unintentionally`, `Required by cv2`, `Converts to float`], answer: 1, explanation: `Without copy, ROI shares memory with the parent image.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Independent ROI copy`,
          description: `Set \`patch = img[0:40, 0:40].copy()\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg")
# Create independent patch

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
patch = img[0:40, 0:40].copy()`,
          tests: [
            { id: 1, label: `Slices ROI`, keywords: [{ pattern: `img\\s*\\[\\s*0\\s*:\\s*40\\s*,\\s*0\\s*:\\s*40\\s*\\]` }] },
            { id: 2, label: `Calls .copy()`, keywords: [{ pattern: `\\.copy\\s*\\(\\s*\\)` }] }
          ],
        },
      }
    ],
  },
  {
    id: "colors",
    title: `Color Spaces`,
    icon: "🎨",
    color: "#46A049",
    lessons: [
      {
        id: "opencv-10",
        title: `cvtColor essentials`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.cvtColor\` switches color spaces: BGR↔RGB, BGR→GRAY, BGR→HSV, and more. Grayscale drops to 2D \`(H, W)\`.` },
          { type: "table", title: `Common cvtColor flags`, columns: [`Flag`, `Result`], rows: [ { label: `BGR2GRAY`, values: [`BGR2GRAY`, `Single-channel gray`] }, { label: `BGR2HSV`, values: [`BGR2HSV`, `Hue/Sat/Value for color picks`] }, { label: `BGR2RGB`, values: [`BGR2RGB`, `Match Matplotlib / web order`] } ] },
          { type: "code", lang: "python", label: `Gray and HSV`, content: `import cv2

bgr = cv2.imread("photo.jpg")
gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)` },
          { type: "quiz", question: `COLOR_BGR2GRAY produces an image with how many channels?`, options: [`3`, `1 (2D array)`, `4`, `0`], answer: 1, explanation: `Grayscale is a single-channel 2D array.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Convert to grayscale`,
          description: `Create \`gray\` from \`bgr\` with \`COLOR_BGR2GRAY\`.`,
          starterCode: `import cv2

bgr = cv2.imread("photo.jpg")
# gray = ...

`,
          solutionCode: `import cv2

bgr = cv2.imread("photo.jpg")
gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)`,
          tests: [
            { id: 1, label: `Uses cvtColor`, keywords: [{ pattern: `cv2\\.cvtColor\\s*\\(` }] },
            { id: 2, label: `COLOR_BGR2GRAY`, keywords: [{ pattern: `COLOR_BGR2GRAY` }] }
          ],
        },
      },
      {
        id: "opencv-11",
        title: `Split and merge channels`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.split(img)\` returns B, G, R planes. \`cv2.merge([b, g, r])\` rebuilds a color image. Handy for per-channel filters.` },
          { type: "callout", variant: "info", content: `Editing one channel (for example boosting blue) then **merge** is a classic color-correction trick.` },
          { type: "code", lang: "python", label: `Split / merge`, content: `import cv2

img = cv2.imread("photo.jpg")
b, g, r = cv2.split(img)
merged = cv2.merge([b, g, r])` },
          { type: "quiz", question: `After split on a BGR image, the first returned channel is…`, options: [`Red`, `Green`, `Blue`, `Alpha`], answer: 2, explanation: `OpenCV order is B, G, R.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Split channels`,
          description: `Unpack \`b, g, r = cv2.split(img)\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg")
# Split into b, g, r

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
b, g, r = cv2.split(img)`,
          tests: [
            { id: 1, label: `Uses cv2.split`, keywords: [{ pattern: `cv2\\.split\\s*\\(` }] },
            { id: 2, label: `Unpacks b, g, r`, keywords: [{ pattern: `b\\s*,\\s*g\\s*,\\s*r\\s*=` }] }
          ],
        },
      },
      {
        id: "opencv-12",
        title: `HSV color mask`,
        xp: 10,
        theory: [
          { type: "text", content: `**HSV** (Hue, Saturation, Value) makes color picking easier. Use \`cv2.inRange(hsv, lower, upper)\` to build a binary mask, then \`bitwise_and\` to keep matching pixels.` },
          { type: "code", lang: "python", label: `Keep red-ish pixels`, content: `import cv2
import numpy as np

bgr = cv2.imread("photo.jpg")
hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
lower = np.array([0, 120, 70])
upper = np.array([10, 255, 255])
mask = cv2.inRange(hsv, lower, upper)
result = cv2.bitwise_and(bgr, bgr, mask=mask)` },
          { type: "callout", variant: "info", content: `Red wraps around hue 0/180 — often you OR two ranges for full red.` },
          { type: "quiz", question: `What does cv2.inRange return?`, options: [`A float image`, `A binary mask (0 or 255)`, `Contours`, `Keypoints`], answer: 1, explanation: `\`inRange\` produces a single-channel mask.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Build an HSV mask`,
          description: `Convert to HSV, then \`mask = cv2.inRange(hsv, lower, upper)\` using the given bounds.`,
          starterCode: `import cv2
import numpy as np

bgr = cv2.imread("photo.jpg")
lower = np.array([35, 80, 80])
upper = np.array([85, 255, 255])
# hsv + mask

`,
          solutionCode: `import cv2
import numpy as np

bgr = cv2.imread("photo.jpg")
lower = np.array([35, 80, 80])
upper = np.array([85, 255, 255])
hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, lower, upper)`,
          tests: [
            { id: 1, label: `COLOR_BGR2HSV`, keywords: [{ pattern: `COLOR_BGR2HSV` }] },
            { id: 2, label: `Uses inRange`, keywords: [{ pattern: `cv2\\.inRange\\s*\\(` }] }
          ],
        },
      }
    ],
  },
  {
    id: "arithmetic",
    title: `Arithmetic & Bitwise`,
    icon: "➕",
    color: "#2E7D32",
    lessons: [
      {
        id: "opencv-13",
        title: `Add and subtract images`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.add\` saturates at 255 (safer for images). NumPy \`+\` can wrap around with \`uint8\`. Use \`cv2.subtract\` similarly.` },
          { type: "scenario", title: `Exposure blend`, content: `Two bracketed shots of a room — **cv2.add** (or weighted blend) can lift shadows without clipping highlights the way raw NumPy wrap would.` },
          { type: "code", lang: "python", label: `Saturated add`, content: `import cv2

a = cv2.imread("a.jpg")
b = cv2.imread("b.jpg")
out = cv2.add(a, b)` },
          { type: "quiz", question: `Why prefer cv2.add over NumPy + for uint8 images?`, options: [`Faster always`, `Saturates instead of wrapping`, `Changes color space`, `Needs GPU`], answer: 1, explanation: `\`cv2.add\` clips to 255 instead of modular wrap.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Add two images`,
          description: `Set \`out = cv2.add(a, b)\`.`,
          starterCode: `import cv2

a = cv2.imread("a.jpg")
b = cv2.imread("b.jpg")
# out = ...

`,
          solutionCode: `import cv2

a = cv2.imread("a.jpg")
b = cv2.imread("b.jpg")
out = cv2.add(a, b)`,
          tests: [
            { id: 1, label: `Uses cv2.add`, keywords: [{ pattern: `cv2\\.add\\s*\\(` }] },
            { id: 2, label: `Assigns out`, keywords: [{ pattern: `out\\s*=` }] }
          ],
        },
      },
      {
        id: "opencv-14",
        title: `Weighted blending`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.addWeighted(src1, alpha, src2, beta, gamma)\` blends two images: \`out = α·src1 + β·src2 + γ\`. Great for smooth overlays.` },
          { type: "callout", variant: "tip", content: `Keep alpha + beta near 1.0 total for a natural mix; gamma is a final brightness nudge.` },
          { type: "code", lang: "python", label: `50/50 blend`, content: `import cv2

a = cv2.imread("a.jpg")
b = cv2.imread("b.jpg")
blend = cv2.addWeighted(a, 0.5, b, 0.5, 0)` },
          { type: "quiz", question: `In addWeighted, alpha and beta control…`, options: [`Kernel size`, `How much each image contributes`, `Contour count`, `FPS`], answer: 1, explanation: `They are the blend weights for each source.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Blend 0.6 / 0.4`,
          description: `Create \`blend = cv2.addWeighted(a, 0.6, b, 0.4, 0)\`.`,
          starterCode: `import cv2

a = cv2.imread("a.jpg")
b = cv2.imread("b.jpg")
# blend

`,
          solutionCode: `import cv2

a = cv2.imread("a.jpg")
b = cv2.imread("b.jpg")
blend = cv2.addWeighted(a, 0.6, b, 0.4, 0)`,
          tests: [
            { id: 1, label: `Uses addWeighted`, keywords: [{ pattern: `cv2\\.addWeighted\\s*\\(` }] },
            { id: 2, label: `Weights 0.6 and 0.4`, keywords: [{ pattern: `0\\.6` }, { pattern: `0\\.4` }] }
          ],
        },
      },
      {
        id: "opencv-15",
        title: `Bitwise ops and masks`,
        xp: 10,
        theory: [
          { type: "text", content: `\`bitwise_and\`, \`bitwise_or\`, \`bitwise_not\` combine images with masks. Masks let you keep only selected regions when compositing logos or filtered colors.` },
          { type: "scenario", title: `Logo on a jersey`, content: `A logo mask keeps only the emblem pixels; **bitwise_and** pastes that region onto the jersey without a rectangular smear.` },
          { type: "code", lang: "python", label: `Mask composite`, content: `import cv2

img = cv2.imread("photo.jpg")
mask = cv2.imread("mask.png", 0)
masked = cv2.bitwise_and(img, img, mask=mask)` },
          { type: "quiz", question: `bitwise_and with a mask typically…`, options: [`Blurs the image`, `Keeps pixels where mask is non-zero`, `Finds edges`, `Converts to HSV`], answer: 1, explanation: `Non-zero mask locations pass through.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Apply bitwise_and with mask`,
          description: `Set \`masked = cv2.bitwise_and(img, img, mask=mask)\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg")
mask = cv2.imread("mask.png", 0)
# masked

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
mask = cv2.imread("mask.png", 0)
masked = cv2.bitwise_and(img, img, mask=mask)`,
          tests: [
            { id: 1, label: `Uses bitwise_and`, keywords: [{ pattern: `cv2\\.bitwise_and\\s*\\(` }] },
            { id: 2, label: `Passes mask=`, keywords: [{ pattern: `mask\\s*=` }] }
          ],
        },
      }
    ],
  },
  {
    id: "filtering",
    title: `Filtering & Morphology`,
    icon: "🌊",
    color: "#66BB6A",
    lessons: [
      {
        id: "opencv-16",
        title: `Blur and Gaussian blur`,
        xp: 10,
        theory: [
          { type: "text", content: `Smoothing reduces noise. \`cv2.blur\` is a box filter; \`cv2.GaussianBlur\` weights the center more — usually better before edge detection.` },
          { type: "code", lang: "python", label: `Gaussian blur`, content: `import cv2

img = cv2.imread("photo.jpg")
soft = cv2.GaussianBlur(img, (5, 5), 0)` },
          { type: "callout", variant: "tip", content: `Kernel sizes must be positive odd integers: (3,3), (5,5), …` },
          { type: "quiz", question: `GaussianBlur kernel size should be…`, options: [`Any even number`, `Odd positive integers`, `Always 2x2`, `Floats only`], answer: 1, explanation: `OpenCV expects odd kernel dimensions for GaussianBlur.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Gaussian blur 5×5`,
          description: `Create \`soft = cv2.GaussianBlur(img, (5, 5), 0)\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg")
# soft

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
soft = cv2.GaussianBlur(img, (5, 5), 0)`,
          tests: [
            { id: 1, label: `Uses GaussianBlur`, keywords: [{ pattern: `cv2\\.GaussianBlur\\s*\\(` }] },
            { id: 2, label: `Kernel (5, 5)`, keywords: [{ pattern: `5\\s*,\\s*5` }] }
          ],
        },
      },
      {
        id: "opencv-17",
        title: `Median and bilateral filters`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.medianBlur\` is great for salt-and-pepper noise. \`cv2.bilateralFilter\` smooths while trying to keep edges sharp — slower but useful for beautify / denoise.` },
          { type: "callout", variant: "warning", content: `Median blur needs an odd kernel size. Even sizes raise an OpenCV error.` },
          { type: "code", lang: "python", label: `Median and bilateral`, content: `import cv2

img = cv2.imread("photo.jpg")
med = cv2.medianBlur(img, 5)
bil = cv2.bilateralFilter(img, 9, 75, 75)` },
          { type: "quiz", question: `Which filter is especially good for salt-and-pepper noise?`, options: [`GaussianBlur only`, `medianBlur`, `Sobel`, `Canny`], answer: 1, explanation: `Median replaces each pixel with the neighborhood median.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Median blur`,
          description: `Create \`med = cv2.medianBlur(img, 5)\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg")
# med

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
med = cv2.medianBlur(img, 5)`,
          tests: [
            { id: 1, label: `Uses medianBlur`, keywords: [{ pattern: `cv2\\.medianBlur\\s*\\(` }] },
            { id: 2, label: `ksize 5`, keywords: [{ pattern: `medianBlur\\s*\\(\\s*img\\s*,\\s*5\\s*\\)` }] }
          ],
        },
      },
      {
        id: "opencv-18",
        title: `Erode, dilate, open, close`,
        xp: 10,
        theory: [
          { type: "text", content: `**Morphology** uses a kernel to shrink (\`erode\`) or grow (\`dilate\`) white regions in a binary image. Opening = erode then dilate (remove speckles). Closing = dilate then erode (fill holes).` },
          { type: "diagram", title: `Open vs close`, nodes: [ { id: "open", label: `MORPH_OPEN`, color: "#5CBF2A", items: [`Erode then dilate`, `Kill speckles`] }, { id: "close", label: `MORPH_CLOSE`, color: "#7AD645", items: [`Dilate then erode`, `Fill holes`] } ] },
          { type: "code", lang: "python", label: `Morphology`, content: `import cv2
import numpy as np

mask = cv2.imread("mask.png", 0)
k = np.ones((3, 3), np.uint8)
eroded = cv2.erode(mask, k, iterations=1)
dilated = cv2.dilate(mask, k, iterations=1)
opened = cv2.morphologyEx(mask, cv2.MORPH_OPEN, k)
closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, k)` },
          { type: "quiz", question: `MORPH_OPEN is best described as…`, options: [`Dilate then erode`, `Erode then dilate`, `Gaussian blur`, `Canny edges`], answer: 1, explanation: `Opening removes small white noise by eroding first.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Morphological open`,
          description: `Build a 3×3 ones kernel and \`opened = cv2.morphologyEx(mask, cv2.MORPH_OPEN, k)\`.`,
          starterCode: `import cv2
import numpy as np

mask = cv2.imread("mask.png", 0)
# k and opened

`,
          solutionCode: `import cv2
import numpy as np

mask = cv2.imread("mask.png", 0)
k = np.ones((3, 3), np.uint8)
opened = cv2.morphologyEx(mask, cv2.MORPH_OPEN, k)`,
          tests: [
            { id: 1, label: `Creates kernel`, keywords: [{ pattern: `np\\.ones\\s*\\(` }] },
            { id: 2, label: `MORPH_OPEN`, keywords: [{ pattern: `MORPH_OPEN` }] },
            { id: 3, label: `morphologyEx`, keywords: [{ pattern: `cv2\\.morphologyEx\\s*\\(` }] }
          ],
        },
      }
    ],
  },
  {
    id: "edges",
    title: `Thresholding & Edges`,
    icon: "⚡",
    color: "#43A047",
    lessons: [
      {
        id: "opencv-19",
        title: `Binary and Otsu threshold`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.threshold\` turns gray images into binary masks. **Otsu** (\`THRESH_OTSU\`) picks a threshold automatically from the histogram.` },
          { type: "scenario", title: `Scan a receipt`, content: `Otsu finds a good cut between paper and ink automatically when lighting is even — great for document binarization.` },
          { type: "code", lang: "python", label: `Otsu threshold`, content: `import cv2

gray = cv2.imread("photo.jpg", 0)
t, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
print("threshold:", t)` },
          { type: "quiz", question: `THRESH_OTSU is useful when…`, options: [`You need color HSV`, `You want an automatic threshold`, `You draw circles`, `You read video FPS`], answer: 1, explanation: `Otsu estimates a threshold from pixel distribution.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Otsu binary threshold`,
          description: `Run \`cv2.threshold\` with \`THRESH_BINARY + THRESH_OTSU\` into \`t, binary\`.`,
          starterCode: `import cv2

gray = cv2.imread("photo.jpg", 0)
# t, binary = ...

`,
          solutionCode: `import cv2

gray = cv2.imread("photo.jpg", 0)
t, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)`,
          tests: [
            { id: 1, label: `Uses threshold`, keywords: [{ pattern: `cv2\\.threshold\\s*\\(` }] },
            { id: 2, label: `THRESH_OTSU`, keywords: [{ pattern: `THRESH_OTSU` }] }
          ],
        },
      },
      {
        id: "opencv-20",
        title: `Adaptive threshold`,
        xp: 10,
        theory: [
          { type: "text", content: `When lighting varies across the image, \`cv2.adaptiveThreshold\` computes local thresholds — better for documents and uneven shadows.` },
          { type: "callout", variant: "tip", content: `If one global threshold leaves half the page black, switch to adaptive — local neighborhoods handle shadows.` },
          { type: "code", lang: "python", label: `Adaptive mean`, content: `import cv2

gray = cv2.imread("doc.jpg", 0)
adapt = cv2.adaptiveThreshold(
    gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2
)` },
          { type: "quiz", question: `Adaptive threshold shines when…`, options: [`The image is already binary`, `Illumination is uneven`, `You only have color`, `You need DNN weights`], answer: 1, explanation: `Local thresholds handle lighting gradients.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Adaptive threshold`,
          description: `Call \`cv2.adaptiveThreshold\` with \`ADAPTIVE_THRESH_MEAN_C\` and block size 11.`,
          starterCode: `import cv2

gray = cv2.imread("doc.jpg", 0)
# adapt = ...

`,
          solutionCode: `import cv2

gray = cv2.imread("doc.jpg", 0)
adapt = cv2.adaptiveThreshold(
    gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2
)`,
          tests: [
            { id: 1, label: `adaptiveThreshold`, keywords: [{ pattern: `cv2\\.adaptiveThreshold\\s*\\(` }] },
            { id: 2, label: `ADAPTIVE_THRESH_MEAN_C`, keywords: [{ pattern: `ADAPTIVE_THRESH_MEAN_C` }] }
          ],
        },
      },
      {
        id: "opencv-21",
        title: `Sobel and Laplacian`,
        xp: 10,
        theory: [
          { type: "text", content: `Gradient operators highlight intensity changes. \`cv2.Sobel\` can emphasize X or Y edges; \`cv2.Laplacian\` responds to second derivatives (often noisy — blur first).` },
          { type: "callout", variant: "info", content: `Convert Sobel output with **convertScaleAbs** before displaying — raw CV_64F values look washed out or empty.` },
          { type: "code", lang: "python", label: `Sobel X`, content: `import cv2

gray = cv2.imread("photo.jpg", 0)
sx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
sx = cv2.convertScaleAbs(sx)` },
          { type: "quiz", question: `Before Laplacian/Sobel on noisy images you often…`, options: [`Skip blur`, `Apply Gaussian blur`, `Convert to HSV only`, `Use VideoCapture`], answer: 1, explanation: `Blurring reduces spurious gradient responses.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Sobel in X`,
          description: `Compute \`sx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)\`.`,
          starterCode: `import cv2

gray = cv2.imread("photo.jpg", 0)
# sx

`,
          solutionCode: `import cv2

gray = cv2.imread("photo.jpg", 0)
sx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)`,
          tests: [
            { id: 1, label: `Uses Sobel`, keywords: [{ pattern: `cv2\\.Sobel\\s*\\(` }] },
            { id: 2, label: `dx=1 dy=0`, keywords: [{ pattern: `1\\s*,\\s*0` }] }
          ],
        },
      },
      {
        id: "opencv-22",
        title: `Canny edge detection`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.Canny(image, threshold1, threshold2)\` is the go-to multi-stage edge detector. Lower/upper hysteresis thresholds control sensitivity.` },
          { type: "scenario", title: `Lane sketch`, content: `Self-driving demos often blur, then Canny, then Hough lines — Canny is the crisp edge map in the middle.` },
          { type: "code", lang: "python", label: `Canny`, content: `import cv2

gray = cv2.imread("photo.jpg", 0)
blur = cv2.GaussianBlur(gray, (5, 5), 0)
edges = cv2.Canny(blur, 50, 150)` },
          { type: "quiz", question: `Canny typically expects…`, options: [`A color BGR image only`, `A single-channel (gray) image`, `A DNN blob`, `A contour list`], answer: 1, explanation: `Feed grayscale (often pre-blurred) into Canny.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Run Canny`,
          description: `Set \`edges = cv2.Canny(gray, 50, 150)\`.`,
          starterCode: `import cv2

gray = cv2.imread("photo.jpg", 0)
# edges

`,
          solutionCode: `import cv2

gray = cv2.imread("photo.jpg", 0)
edges = cv2.Canny(gray, 50, 150)`,
          tests: [
            { id: 1, label: `Uses Canny`, keywords: [{ pattern: `cv2\\.Canny\\s*\\(` }] },
            { id: 2, label: `Thresholds 50, 150`, keywords: [{ pattern: `50\\s*,\\s*150` }] }
          ],
        },
      }
    ],
  },
  {
    id: "contours",
    title: `Contours & Shapes`,
    icon: "🔷",
    color: "#1B5E20",
    lessons: [
      {
        id: "opencv-23",
        title: `findContours basics`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.findContours\` finds connected boundaries on a **binary** image. Draw with \`cv2.drawContours\`. (Return signature differs slightly by OpenCV version — unpack carefully.)` },
          { type: "callout", variant: "warning", content: `Older OpenCV returns (image, contours, hierarchy). Newer ones return (contours, hierarchy). Unpack to match your version.` },
          { type: "code", lang: "python", label: `Find and draw`, content: `import cv2

binary = cv2.imread("mask.png", 0)
contours, hierarchy = cv2.findContours(
    binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
)
canvas = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)
cv2.drawContours(canvas, contours, -1, (0, 255, 0), 2)` },
          { type: "quiz", question: `findContours works best on…`, options: [`Raw color photos only`, `Binary / thresholded images`, `Float DNN logits`, `Empty arrays`], answer: 1, explanation: `Contours expect clear foreground/background separation.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Find contours`,
          description: `Call \`cv2.findContours\` with \`RETR_EXTERNAL\` and \`CHAIN_APPROX_SIMPLE\`.`,
          starterCode: `import cv2

binary = cv2.imread("mask.png", 0)
# contours, hierarchy = ...

`,
          solutionCode: `import cv2

binary = cv2.imread("mask.png", 0)
contours, hierarchy = cv2.findContours(
    binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
)`,
          tests: [
            { id: 1, label: `findContours`, keywords: [{ pattern: `cv2\\.findContours\\s*\\(` }] },
            { id: 2, label: `RETR_EXTERNAL`, keywords: [{ pattern: `RETR_EXTERNAL` }] }
          ],
        },
      },
      {
        id: "opencv-24",
        title: `Area, perimeter, approxPolyDP`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.contourArea\` and \`cv2.arcLength\` measure size. \`cv2.approxPolyDP\` simplifies a contour to fewer points — useful to classify triangles vs rectangles.` },
          { type: "scenario", title: `Sort nuts and bolts`, content: `After **approxPolyDP**, vertex count separates triangles (3), rectangles (4), and circles (many).` },
          { type: "code", lang: "python", label: `Approximate shape`, content: `import cv2

cnt = contours[0]
area = cv2.contourArea(cnt)
peri = cv2.arcLength(cnt, True)
approx = cv2.approxPolyDP(cnt, 0.02 * peri, True)
print(len(approx))  # vertices` },
          { type: "quiz", question: `approxPolyDP is used to…`, options: [`Blur edges`, `Simplify a contour to fewer vertices`, `Train a neural net`, `Split color channels`], answer: 1, explanation: `It approximates the polygon with a given precision.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Contour area`,
          description: `Set \`area = cv2.contourArea(cnt)\`.`,
          starterCode: `import cv2

# assume cnt exists
cnt = []  # placeholder in real code from findContours
# area

`,
          solutionCode: `import cv2

cnt = []  # placeholder
area = cv2.contourArea(cnt)`,
          tests: [
            { id: 1, label: `Uses contourArea`, keywords: [{ pattern: `cv2\\.contourArea\\s*\\(` }] },
            { id: 2, label: `Assigns area`, keywords: [{ pattern: `area\\s*=` }] }
          ],
        },
      },
      {
        id: "opencv-25",
        title: `Bounding boxes and moments`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.boundingRect\` gives an upright box. \`cv2.minAreaRect\` can rotate. **Moments** (\`cv2.moments\`) yield the centroid: \`cx = M['m10']/M['m00']\`.` },
          { type: "callout", variant: "tip", content: `Always guard **M["m00"] != 0** before dividing — empty contours crash centroid math.` },
          { type: "code", lang: "python", label: `Box and center`, content: `import cv2

x, y, w, h = cv2.boundingRect(cnt)
M = cv2.moments(cnt)
if M["m00"] != 0:
    cx = int(M["m10"] / M["m00"])
    cy = int(M["m01"] / M["m00"])` },
          { type: "quiz", question: `moments help you find…`, options: [`FPS`, `The contour centroid`, `Camera exposure`, `File size`], answer: 1, explanation: `Spatial moments locate the center of mass of a contour.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Bounding rectangle`,
          description: `Unpack \`x, y, w, h = cv2.boundingRect(cnt)\`.`,
          starterCode: `import cv2

cnt = []
# bounding rect

`,
          solutionCode: `import cv2

cnt = []
x, y, w, h = cv2.boundingRect(cnt)`,
          tests: [
            { id: 1, label: `boundingRect`, keywords: [{ pattern: `cv2\\.boundingRect\\s*\\(` }] },
            { id: 2, label: `Unpacks x,y,w,h`, keywords: [{ pattern: `x\\s*,\\s*y\\s*,\\s*w\\s*,\\s*h\\s*=` }] }
          ],
        },
      }
    ],
  },
  {
    id: "geometry",
    title: `Geometry & Features`,
    icon: "🧭",
    color: "#81C784",
    lessons: [
      {
        id: "opencv-26",
        title: `Resize, rotate, affine`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.resize\` changes size. Build a 2×3 affine matrix with \`cv2.getRotationMatrix2D\` or \`getAffineTransform\`, then \`cv2.warpAffine\`.` },
          { type: "table", title: `Geometry helpers`, columns: [`Need`, `API`], rows: [ { label: `New size`, values: [`New size`, `cv2.resize`] }, { label: `Rotate / shear`, values: [`Rotate / shear`, `getRotationMatrix2D + warpAffine`] }, { label: `Document straighten`, values: [`Document straighten`, `warpPerspective`] } ] },
          { type: "code", lang: "python", label: `Resize and rotate`, content: `import cv2

img = cv2.imread("photo.jpg")
small = cv2.resize(img, (320, 240))
h, w = img.shape[:2]
M = cv2.getRotationMatrix2D((w / 2, h / 2), 45, 1.0)
rotated = cv2.warpAffine(img, M, (w, h))` },
          { type: "quiz", question: `warpAffine applies a…`, options: [`3×3 perspective only`, `2×3 affine transform`, `DNN forward pass`, `Histogram equalize`], answer: 1, explanation: `Affine warps use a 2×3 matrix.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Resize image`,
          description: `Create \`small = cv2.resize(img, (320, 240))\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg")
# small

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg")
small = cv2.resize(img, (320, 240))`,
          tests: [
            { id: 1, label: `Uses resize`, keywords: [{ pattern: `cv2\\.resize\\s*\\(` }] },
            { id: 2, label: `Size 320x240`, keywords: [{ pattern: `320\\s*,\\s*240` }] }
          ],
        },
      },
      {
        id: "opencv-27",
        title: `Perspective warp`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.getPerspectiveTransform\` + \`cv2.warpPerspective\` straighten documents or bird's-eye views using four point correspondences.` },
          { type: "scenario", title: `Bird's-eye parking lot`, content: `Four corner clicks on a lot camera define **src**; a rectangle **dst** gives a top-down map for measuring stall sizes.` },
          { type: "code", lang: "python", label: `Four-point warp`, content: `import cv2
import numpy as np

src = np.float32([[0, 0], [300, 0], [300, 400], [0, 400]])
dst = np.float32([[20, 40], [280, 20], [260, 380], [40, 360]])
M = cv2.getPerspectiveTransform(src, dst)
warped = cv2.warpPerspective(img, M, (300, 400))` },
          { type: "quiz", question: `Perspective transform typically needs how many point pairs?`, options: [`1`, `2`, `4`, `100`], answer: 2, explanation: `Four source/destination pairs define a homography for warpPerspective.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `warpPerspective call`,
          description: `Set \`warped = cv2.warpPerspective(img, M, (300, 400))\`.`,
          starterCode: `import cv2
import numpy as np

img = cv2.imread("doc.jpg")
M = np.eye(3, dtype=np.float32)
# warped

`,
          solutionCode: `import cv2
import numpy as np

img = cv2.imread("doc.jpg")
M = np.eye(3, dtype=np.float32)
warped = cv2.warpPerspective(img, M, (300, 400))`,
          tests: [
            { id: 1, label: `warpPerspective`, keywords: [{ pattern: `cv2\\.warpPerspective\\s*\\(` }] },
            { id: 2, label: `Output size`, keywords: [{ pattern: `300\\s*,\\s*400` }] }
          ],
        },
      },
      {
        id: "opencv-28",
        title: `ORB features and matching`,
        xp: 10,
        theory: [
          { type: "text", content: `**ORB** detects keypoints and descriptors without patent issues. Match with \`BFMatcher\` and draw using \`cv2.drawMatches\`.` },
          { type: "callout", variant: "info", content: `ORB is patent-free and fast — a solid default before jumping to SIFT or deep descriptors.` },
          { type: "code", lang: "python", label: `ORB match sketch`, content: `import cv2

orb = cv2.ORB_create()
kp1, des1 = orb.detectAndCompute(img1, None)
kp2, des2 = orb.detectAndCompute(img2, None)
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = bf.match(des1, des2)
matches = sorted(matches, key=lambda m: m.distance)` },
          { type: "quiz", question: `ORB_create helps you…`, options: [`Open a webcam only`, `Detect keypoints and compute descriptors`, `Train YOLO`, `Equalize histograms`], answer: 1, explanation: `ORB is a feature detector/descriptor pipeline.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Create ORB`,
          description: `Set \`orb = cv2.ORB_create()\` then \`kp, des = orb.detectAndCompute(img, None)\`.`,
          starterCode: `import cv2

img = cv2.imread("photo.jpg", 0)
# orb + detectAndCompute

`,
          solutionCode: `import cv2

img = cv2.imread("photo.jpg", 0)
orb = cv2.ORB_create()
kp, des = orb.detectAndCompute(img, None)`,
          tests: [
            { id: 1, label: `ORB_create`, keywords: [{ pattern: `cv2\\.ORB_create\\s*\\(` }] },
            { id: 2, label: `detectAndCompute`, keywords: [{ pattern: `detectAndCompute\\s*\\(` }] }
          ],
        },
      }
    ],
  },
  {
    id: "video",
    title: `Video & Detection`,
    icon: "🎥",
    color: "#A5D6A7",
    lessons: [
      {
        id: "opencv-29",
        title: `VideoCapture loop`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.VideoCapture(0)\` opens a camera (or a file path). Read frames in a loop with \`ret, frame = cap.read()\`, then \`cap.release()\` when done.` },
          { type: "code", lang: "python", label: `Read frames`, content: `import cv2

cap = cv2.VideoCapture("clip.mp4")
while True:
    ret, frame = cap.read()
    if not ret:
        break
    # process frame...
cap.release()` },
          { type: "callout", variant: "warning", content: `Always release captures. In GUIs also call \`cv2.destroyAllWindows()\`.` },
          { type: "quiz", question: `If ret is False from cap.read(), you should…`, options: [`Keep looping forever`, `Break — no more frames`, `Call ORB`, `Increase FPS`], answer: 1, explanation: `\`ret == False\` means the stream ended or failed.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Open and read once`,
          description: `Open \`clip.mp4\`, read one frame into \`ret, frame\`, then \`cap.release()\`.`,
          starterCode: `import cv2

# VideoCapture, read, release

`,
          solutionCode: `import cv2

cap = cv2.VideoCapture("clip.mp4")
ret, frame = cap.read()
cap.release()`,
          tests: [
            { id: 1, label: `VideoCapture`, keywords: [{ pattern: `cv2\\.VideoCapture\\s*\\(` }] },
            { id: 2, label: `cap.read`, keywords: [{ pattern: `\\.read\\s*\\(` }] },
            { id: 3, label: `release`, keywords: [{ pattern: `\\.release\\s*\\(` }] }
          ],
        },
      },
      {
        id: "opencv-30",
        title: `Frame resize and FPS habit`,
        xp: 10,
        theory: [
          { type: "text", content: `Real-time pipelines often resize frames for speed. Track time between frames to estimate FPS. Keep processing light inside the loop.` },
          { type: "callout", variant: "tip", content: `Resize early in the loop so every later step (blur, detect) runs on fewer pixels.` },
          { type: "code", lang: "python", label: `Resize each frame`, content: `import cv2

cap = cv2.VideoCapture(0)
ret, frame = cap.read()
if ret:
    small = cv2.resize(frame, (640, 360))
cap.release()` },
          { type: "quiz", question: `Why resize video frames in a loop?`, options: [`Only for prettier colors`, `Faster processing / lower bandwidth`, `Required by VideoCapture`, `To enable ORB patents`], answer: 1, explanation: `Smaller frames mean less work per tick.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Resize a frame`,
          description: `Set \`small = cv2.resize(frame, (640, 360))\`.`,
          starterCode: `import cv2
import numpy as np

frame = np.zeros((720, 1280, 3), dtype=np.uint8)
# small

`,
          solutionCode: `import cv2
import numpy as np

frame = np.zeros((720, 1280, 3), dtype=np.uint8)
small = cv2.resize(frame, (640, 360))`,
          tests: [
            { id: 1, label: `resize`, keywords: [{ pattern: `cv2\\.resize\\s*\\(` }] },
            { id: 2, label: `640x360`, keywords: [{ pattern: `640\\s*,\\s*360` }] }
          ],
        },
      },
      {
        id: "opencv-31",
        title: `Background subtractor intro`,
        xp: 10,
        theory: [
          { type: "text", content: `\`cv2.createBackgroundSubtractorMOG2()\` estimates a background model and returns a foreground mask per frame — a classic first step for motion detection.` },
          { type: "scenario", title: `Security cam motion`, content: `MOG2 learns the empty hallway; when someone walks through, the foreground mask lights up for an alert.` },
          { type: "code", lang: "python", label: `MOG2`, content: `import cv2

subtractor = cv2.createBackgroundSubtractorMOG2()
fg = subtractor.apply(frame)` },
          { type: "quiz", question: `Background subtraction is mainly for…`, options: [`Color conversion`, `Highlighting moving foreground`, `Perspective warp`, `ORB matching`], answer: 1, explanation: `It separates moving objects from a mostly static background.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Create MOG2 subtractor`,
          description: `Create \`subtractor = cv2.createBackgroundSubtractorMOG2()\` and \`fg = subtractor.apply(frame)\`.`,
          starterCode: `import cv2
import numpy as np

frame = np.zeros((240, 320, 3), dtype=np.uint8)
# subtractor + fg

`,
          solutionCode: `import cv2
import numpy as np

frame = np.zeros((240, 320, 3), dtype=np.uint8)
subtractor = cv2.createBackgroundSubtractorMOG2()
fg = subtractor.apply(frame)`,
          tests: [
            { id: 1, label: `MOG2 create`, keywords: [{ pattern: `createBackgroundSubtractorMOG2\\s*\\(` }] },
            { id: 2, label: `apply`, keywords: [{ pattern: `\\.apply\\s*\\(` }] }
          ],
        },
      },
      {
        id: "opencv-32",
        title: `Haar cascades and DNN overview`,
        xp: 10,
        theory: [
          { type: "text", content: `**Haar cascades** (\`CascadeClassifier\`) are classic for faces/eyes with XML models. Modern apps often use **DNN** (\`cv2.dnn.readNet\`) with ONNX/Caffe/TF models. Both detect boxes you can draw with \`rectangle\`.` },
          { type: "code", lang: "python", label: `Haar face detect sketch`, content: `import cv2

face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, 1.1, 5)
for (x, y, w, h) in faces:
    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)` },
          { type: "callout", variant: "info", content: `DNN path: \`net = cv2.dnn.readNet(model, config)\` then blob → \`net.forward()\`. Heavy models stay out of keyword challenges.` },
          { type: "quiz", question: `CascadeClassifier is typically used with…`, options: [`Only ORB descriptors`, `Pretrained Haar XML models`, `NumPy FFT`, `Matplotlib styles`], answer: 1, explanation: `Haar cascades load XML classifiers for detectMultiScale.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Load a cascade`,
          description: `Create \`face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")\`.`,
          starterCode: `import cv2

# Load Haar cascade

`,
          solutionCode: `import cv2

face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")`,
          tests: [
            { id: 1, label: `CascadeClassifier`, keywords: [{ pattern: `cv2\\.CascadeClassifier\\s*\\(` }] },
            { id: 2, label: `Haar xml name`, keywords: [{ pattern: `haarcascade_frontalface_default\\.xml` }] }
          ],
        },
      }
    ],
  },
  {
    id: "capstone",
    title: `Capstone`,
    icon: "🏆",
    color: "#5CBF2A",
    lessons: [
      {
        id: "opencv-33",
        title: `Face / ROI mini pipeline`,
        xp: 15,
        theory: [
          { type: "text", content: `Combine skills: load image → gray → detect (or mock a box) → draw rectangle → crop ROI → save. This is the skeleton of many real apps.` },
          { type: "scenario", title: `Badge photo cropper`, content: `HR uploads portraits. Your script finds a face box, pads it, and exports a square crop for ID badges.` },
          { type: "code", lang: "python", label: `Pipeline sketch`, content: `import cv2

img = cv2.imread("portrait.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# faces = cascade.detectMultiScale(...)
x, y, w, h = 80, 60, 120, 120
cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
roi = img[y:y + h, x:x + w].copy()
cv2.imwrite("face_roi.jpg", roi)` },
          { type: "quiz", question: `A solid mini face pipeline usually ends by…`, options: [`Only printing shape`, `Saving or using the cropped ROI`, `Deleting cv2`, `Skipping gray convert`], answer: 1, explanation: `Downstream steps need the cropped region written or processed.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Draw box and crop ROI`,
          description: `Given x,y,w,h: draw a green rectangle and set \`roi = img[y:y+h, x:x+w].copy()\`.`,
          starterCode: `import cv2

img = cv2.imread("portrait.jpg")
x, y, w, h = 80, 60, 120, 120
# rectangle + roi copy

`,
          solutionCode: `import cv2

img = cv2.imread("portrait.jpg")
x, y, w, h = 80, 60, 120, 120
cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
roi = img[y:y + h, x:x + w].copy()`,
          tests: [
            { id: 1, label: `rectangle`, keywords: [{ pattern: `cv2\\.rectangle\\s*\\(` }] },
            { id: 2, label: `roi slice`, keywords: [{ pattern: `roi\\s*=` }] },
            { id: 3, label: `copy`, keywords: [{ pattern: `\\.copy\\s*\\(\\s*\\)` }] }
          ],
        },
      },
      {
        id: "opencv-34",
        title: `Color object tracker sketch`,
        xp: 15,
        theory: [
          { type: "text", content: `Track a colored object: BGR→HSV → \`inRange\` → morph cleanup → contours → largest contour → centroid → draw. Same pattern powers simple robot followers.` },
          { type: "callout", variant: "success", content: `Largest-contour + moments is enough for many classroom trackers — no neural net required.` },
          { type: "code", lang: "python", label: `Tracker core`, content: `import cv2
import numpy as np

hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, lower, upper)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
if contours:
    cnt = max(contours, key=cv2.contourArea)
    M = cv2.moments(cnt)
    if M["m00"]:
        cx = int(M["m10"] / M["m00"])
        cy = int(M["m01"] / M["m00"])
        cv2.circle(frame, (cx, cy), 8, (0, 255, 0), -1)` },
          { type: "quiz", question: `After building a color mask, why find contours?`, options: [`To convert to RGB`, `To locate the blob and its center`, `To open VideoCapture`, `To load Haar XML`], answer: 1, explanation: `Contours give you the object shape to measure and track.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `HSV mask + morph open`,
          description: `From \`frame\`, create HSV, \`mask = cv2.inRange(...)\`, then morphological open with a 5×5 kernel.`,
          starterCode: `import cv2
import numpy as np

frame = cv2.imread("frame.jpg")
lower = np.array([35, 80, 80])
upper = np.array([85, 255, 255])
# hsv, mask, morph open

`,
          solutionCode: `import cv2
import numpy as np

frame = cv2.imread("frame.jpg")
lower = np.array([35, 80, 80])
upper = np.array([85, 255, 255])
hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, lower, upper)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))`,
          tests: [
            { id: 1, label: `BGR2HSV`, keywords: [{ pattern: `COLOR_BGR2HSV` }] },
            { id: 2, label: `inRange`, keywords: [{ pattern: `cv2\\.inRange\\s*\\(` }] },
            { id: 3, label: `MORPH_OPEN`, keywords: [{ pattern: `MORPH_OPEN` }] }
          ],
        },
      },
      {
        id: "opencv-35",
        title: `OpenCV cheat sheet review`,
        xp: 15,
        theory: [
          { type: "text", content: `You covered the core toolkit: I/O, pixels, drawing, color, arithmetic, filters, edges, contours, geometry, features, video, and detection. Keep this cheat sheet handy.` },
          { type: "table", title: `API cheat sheet`, columns: [`Task`, `API`], rows: [
              { label: `Read/write`, values: [`Read/write`, `imread / imwrite`] },
              { label: `Color`, values: [`Color`, `cvtColor, inRange`] },
              { label: `Smooth`, values: [`Smooth`, `GaussianBlur, medianBlur`] },
              { label: `Edges`, values: [`Edges`, `Canny, Sobel`] },
              { label: `Shapes`, values: [`Shapes`, `findContours, boundingRect`] },
              { label: `Video`, values: [`Video`, `VideoCapture`] }
            ] },
          { type: "callout", variant: "success", content: `Next steps in the wild: camera calibration, tracking (CSRT/KCF), and DNN models with \`cv2.dnn\`.` },
          { type: "code", lang: "python", label: `Imports you will reuse`, content: `import cv2
import numpy as np

# img = cv2.imread(path)
# gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# edges = cv2.Canny(gray, 50, 150)` },
          { type: "quiz", question: `Which import pair shows up in almost every OpenCV script?`, options: [`flask and django`, `cv2 and numpy`, `torch and pandas`, `sqlite and csv`], answer: 1, explanation: `\`cv2\` plus \`numpy\` are the default companions.` }
        ],
        challenge: {
          gradeMode: "keywords",
          title: `End-to-end keyword review`,
          description: `Write a mini script that imports cv2/np, loads \`photo.jpg\`, converts to gray, and runs Canny(50, 150) into \`edges\`.`,
          starterCode: `# Mini review pipeline

`,
          solutionCode: `import cv2
import numpy as np

img = cv2.imread("photo.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 50, 150)`,
          tests: [
            { id: 1, label: `import cv2`, keywords: [{ pattern: `import\\s+cv2` }] },
            { id: 2, label: `imread`, keywords: [{ pattern: `cv2\\.imread\\s*\\(` }] },
            { id: 3, label: `BGR2GRAY`, keywords: [{ pattern: `COLOR_BGR2GRAY` }] },
            { id: 4, label: `Canny`, keywords: [{ pattern: `cv2\\.Canny\\s*\\(` }] }
          ],
        },
      }
    ],
  }
];

export const OPENCV_LESSONS = applyLessonVideoLinks(
  OPENCV_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      outcomes: l.outcomes ?? OPENCV_LESSON_OUTCOMES[l.id] ?? [],
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  OPENCV_VIDEO_LINKS,
);

export const OPENCV_TOTAL_XP = OPENCV_LESSONS.reduce((s, l) => s + l.xp, 0);
