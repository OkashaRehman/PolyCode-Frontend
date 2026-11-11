// Plain-English learning outcomes per OpenCV lesson (shown at top of theory view).

export const OPENCV_LESSON_OUTCOMES = {
  "opencv-0": [
    "Say what OpenCV is and where computer vision shows up in real apps",
    "Import `cv2` and print its version",
    "See how images flow through an OpenCV pipeline",
  ],
  "opencv-1": [
    "Know which pip package to install for OpenCV in Python",
    "Import `cv2` and `numpy as np` together",
    "Understand that PolyCode challenges are keyword-graded",
  ],
  "opencv-2": [
    "Load an image with `cv2.imread` and guard against `None`",
    "Save an image with `cv2.imwrite`",
    "Describe the read → process → write habit",
  ],
  "opencv-3": [
    "Read `img.shape` and `img.dtype` for a color image",
    "Explain height, width, and channels",
    "Know that color images are usually `uint8`",
  ],
  "opencv-4": [
    "Remember OpenCV stores color as BGR by default",
    "Convert BGR to RGB with `cvtColor`",
    "Spot swapped colors when libraries disagree on channel order",
  ],
  "opencv-5": [
    "Index a pixel with `img[y, x]`",
    "Read and write BGR tuples",
    "Keep row/column order straight",
  ],
  "opencv-6": [
    "Create blank canvases with `np.zeros`",
    "Use `dtype=np.uint8` for image arrays",
    "Fill a canvas with a solid BGR color",
  ],
  "opencv-7": [
    "Draw lines, rectangles, circles, and text with OpenCV",
    "Use thickness `-1` to fill shapes",
    "Pass points as `(x, y)` to drawing APIs",
  ],
  "opencv-8": [
    "Crop a region of interest with NumPy slicing",
    "Use `img[y1:y2, x1:x2]` correctly",
    "Save a cropped ROI to disk",
  ],
  "opencv-9": [
    "Know when an ROI is a view vs a copy",
    "Call `.copy()` for an independent patch",
    "Paste a patch into another slice",
  ],
  "opencv-10": [
    "Convert color spaces with `cvtColor`",
    "Make a grayscale image with `COLOR_BGR2GRAY`",
    "Create an HSV image with `COLOR_BGR2HSV`",
  ],
  "opencv-11": [
    "Split B, G, R channels with `cv2.split`",
    "Rebuild a color image with `cv2.merge`",
    "Name channels in OpenCV order",
  ],
  "opencv-12": [
    "Build a color mask with `cv2.inRange` in HSV",
    "Explain why HSV helps color picking",
    "Keep only matching pixels with a mask",
  ],
  "opencv-13": [
    "Add images with `cv2.add` for saturated math",
    "Contrast that with NumPy wrap-around on `uint8`",
    "Use `cv2.subtract` the same way",
  ],
  "opencv-14": [
    "Blend two images with `cv2.addWeighted`",
    "Choose alpha and beta weights on purpose",
    "Produce a smooth overlay",
  ],
  "opencv-15": [
    "Apply `bitwise_and` with a mask",
    "Describe OR / NOT at a high level",
    "Composite using mask regions",
  ],
  "opencv-16": [
    "Smooth an image with `GaussianBlur`",
    "Use odd kernel sizes like `(5, 5)`",
    "Know when blur helps edge detection",
  ],
  "opencv-17": [
    "Use `medianBlur` for salt-and-pepper noise",
    "Recognize when bilateral filtering helps edges",
    "Pick a filter for the noise type",
  ],
  "opencv-18": [
    "Erode and dilate binary masks",
    "Run morphological open and close",
    "Build a small structuring-element kernel",
  ],
  "opencv-19": [
    "Threshold a gray image to binary",
    "Use Otsu to pick a threshold automatically",
    "Read the returned threshold value",
  ],
  "opencv-20": [
    "Use adaptive threshold under uneven lighting",
    "Call `adaptiveThreshold` with a block size",
    "Know when adaptive beats a global threshold",
  ],
  "opencv-21": [
    "Compute Sobel gradients",
    "Know Laplacian responds to second derivatives",
    "Blur before gradient ops on noisy images",
  ],
  "opencv-22": [
    "Run `cv2.Canny` with two thresholds",
    "Feed grayscale into Canny",
    "Tune sensitivity with hysteresis thresholds",
  ],
  "opencv-23": [
    "Find contours on a binary image",
    "Use `RETR_EXTERNAL` for outer shapes",
    "Draw contours on a canvas",
  ],
  "opencv-24": [
    "Measure contour area and perimeter",
    "Approximate polygons with `approxPolyDP`",
    "Count vertices to classify simple shapes",
  ],
  "opencv-25": [
    "Get an upright box with `boundingRect`",
    "Compute a centroid with moments",
    "Guard against zero `m00`",
  ],
  "opencv-26": [
    "Resize images with `cv2.resize`",
    "Rotate with `getRotationMatrix2D` + `warpAffine`",
    "Explain what an affine warp does",
  ],
  "opencv-27": [
    "Build a perspective transform from four points",
    "Apply `warpPerspective`",
    "Use warps for document straighten / bird's-eye views",
  ],
  "opencv-28": [
    "Create an ORB detector",
    "Run `detectAndCompute` for keypoints and descriptors",
    "Know BFMatcher can compare descriptors",
  ],
  "opencv-29": [
    "Open a video or camera with `VideoCapture`",
    "Read frames until `ret` is false",
    "Always `release()` the capture",
  ],
  "opencv-30": [
    "Resize frames inside a video loop",
    "Explain why smaller frames help speed",
    "Keep per-frame work light",
  ],
  "opencv-31": [
    "Create a MOG2 background subtractor",
    "Apply it to get a foreground mask",
    "See how motion detection starts",
  ],
  "opencv-32": [
    "Load a Haar cascade with `CascadeClassifier`",
    "Know DNN `readNet` exists for modern models",
    "Draw detection boxes with `rectangle`",
  ],
  "opencv-33": [
    "Combine gray convert, box draw, and ROI crop",
    "Save a face/ROI crop for downstream use",
    "Describe a mini face pipeline end to end",
  ],
  "opencv-34": [
    "Track a color with HSV + `inRange`",
    "Clean a mask with morphology",
    "Find the largest contour and its center",
  ],
  "opencv-35": [
    "Recall the core OpenCV APIs from this course",
    "Write a short gray + Canny review script",
    "Know natural next topics (tracking, DNN, calibration)",
  ],
};
