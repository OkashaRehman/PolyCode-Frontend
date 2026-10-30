import { ALL_LESSONS, TOTAL_XP } from "../learn/oops-cpp/data/oopsCurriculum";
import {
  POINTER_LESSONS,
  POINTER_TOTAL_XP,
} from "../learn/pointers-cpp/data/pointersCurriculum";
import {
  NUMPY_LESSONS,
  NUMPY_TOTAL_XP,
} from "../learn/numpy-py/data/numpyCurriculum";
import {
  PANDAS_LESSONS,
  PANDAS_TOTAL_XP,
} from "../learn/pandas-py/data/pandasCurriculum";
import {
  FASTAPI_LESSONS,
  FASTAPI_TOTAL_XP,
} from "../learn/fastapi-py/data/fastapiCurriculum";
import {
  PYTORCH_LESSONS,
  PYTORCH_TOTAL_XP,
} from "../learn/pytorch-py/data/pytorchCurriculum";
import {
  HUGGINGFACE_LESSONS,
  HUGGINGFACE_TOTAL_XP,
} from "../learn/huggingface-py/data/huggingfaceCurriculum";
import {
  SCIPY_LESSONS,
  SCIPY_TOTAL_XP,
} from "../learn/scipy-py/data/scipyCurriculum";
import {
  OPENCV_LESSONS,
  OPENCV_TOTAL_XP,
} from "../learn/opencv-py/data/opencvCurriculum";
import {
  FLUTTER_APP_LESSONS,
  FLUTTER_APP_TOTAL_XP,
} from "../learn/flutter-app/data/flutterCurriculum";

/** Featured profile tracks with full curricula (for cards + certificates). */
export const PROFILE_FEATURED_TRACKS = [
  {
    courseId: "oops-cpp",
    courseName: "OOPs C++",
    subtitle: "Synced track",
    lessons: ALL_LESSONS,
    totalXP: TOTAL_XP,
    href: "/learn/oops-cpp",
    accent: "#ffe566",
  },
  {
    courseId: "pointers-cpp",
    courseName: "Pointers C++",
    subtitle: "Memory track",
    lessons: POINTER_LESSONS,
    totalXP: POINTER_TOTAL_XP,
    href: "/learn/pointers-cpp",
    accent: "#00d4ff",
  },
  {
    courseId: "numpy-py",
    courseName: "NumPy for Python",
    hubTitle: "NumPy · py",
    subtitle: "Python data track",
    lessons: NUMPY_LESSONS,
    totalXP: NUMPY_TOTAL_XP,
    href: "/learn/numpy-py",
    accent: "#4dabcf",
  },
  {
    courseId: "pandas-py",
    courseName: "Pandas for Python",
    hubTitle: "Pandas · py",
    subtitle: "Python data track",
    lessons: PANDAS_LESSONS,
    totalXP: PANDAS_TOTAL_XP,
    href: "/learn/pandas-py",
    accent: "#059669",
  },
  {
    courseId: "fastapi-py",
    courseName: "FastAPI for Python",
    hubTitle: "FastAPI · py",
    subtitle: "Python API track",
    lessons: FASTAPI_LESSONS,
    totalXP: FASTAPI_TOTAL_XP,
    href: "/learn/fastapi-py",
    accent: "#009688",
  },
  {
    courseId: "pytorch-py",
    courseName: "PyTorch for Python",
    hubTitle: "PyTorch · py",
    subtitle: "Python deep learning track",
    lessons: PYTORCH_LESSONS,
    totalXP: PYTORCH_TOTAL_XP,
    href: "/learn/pytorch-py",
    accent: "#EE4C2C",
  },
  {
    courseId: "huggingface-py",
    courseName: "Hugging Face for Python",
    hubTitle: "Hugging Face · py",
    subtitle: "Python NLP & transformers track",
    lessons: HUGGINGFACE_LESSONS,
    totalXP: HUGGINGFACE_TOTAL_XP,
    href: "/learn/huggingface-py",
    accent: "#FF9D00",
  },
  {
    courseId: "scipy-py",
    courseName: "SciPy for Python",
    hubTitle: "SciPy · py",
    subtitle: "Python science lab track",
    lessons: SCIPY_LESSONS,
    totalXP: SCIPY_TOTAL_XP,
    href: "/learn/scipy-py",
    accent: "#0d9488",
  },
  {
    courseId: "opencv-py",
    courseName: "OpenCV for Python",
    hubTitle: "OpenCV · py",
    subtitle: "Python computer vision track",
    lessons: OPENCV_LESSONS,
    totalXP: OPENCV_TOTAL_XP,
    href: "/learn/opencv-py",
    accent: "#5CBF2A",
  },
  {
    courseId: "flutter-app",
    courseName: "Flutter Development",
    hubTitle: "Flutter · apps",
    subtitle: "Dart & Flutter track",
    lessons: FLUTTER_APP_LESSONS,
    totalXP: FLUTTER_APP_TOTAL_XP,
    href: "/learn/flutter-app",
    accent: "#02569b",
  },
];

/** Display names for certificates from Mongo progress without local curriculum. */
export const COURSE_DISPLAY_NAMES = {
  "oops-cpp": "OOPs C++",
  "pointers-cpp": "Pointers C++",
  "numpy-py": "NumPy for Python",
  "pandas-py": "Pandas for Python",
  "fastapi-py": "FastAPI for Python",
  "pytorch-py": "PyTorch for Python",
  "huggingface-py": "Hugging Face for Python",
  "scipy-py": "SciPy for Python",
  "opencv-py": "OpenCV for Python",
  "flutter-app": "Flutter Development",
  "python-fundamentals": "Python Fundamentals",
  "python-oop-py": "Python OOP",
  "python-file-handling-py": "Python File Handling",
  "matplotlib-py": "Matplotlib for Python",
  "ai-ml-py": "AI & ML with Python",
  "ml-py": "Machine Learning with Python",
  "cpp-fundamentals": "C++ Fundamentals",
  "dsa-cpp": "DSA with C++",
  "c-fundamentals": "C Fundamentals",
  "c-functions": "C Functions",
  "c-pointers": "C Pointers",
  "c-data-structures": "C Data Structures",
  "c-memory-management": "C Memory Management",
  "c-file-handling": "C File Handling",
  "c-projects": "C Projects",
  "js-fundamentals": "JavaScript Fundamentals",
  "js-dom": "JavaScript DOM",
  "js-web-dev": "JavaScript Web Dev",
  "js-oops": "JavaScript OOP",
  "node-npm": "Node.js & npm",
  "html-css-foundation": "HTML & CSS Foundation",
  "php-fundamentals": "PHP Fundamentals",
  "ruby-fundamentals": "Ruby Fundamentals",
  "ruby-gems": "Ruby Gems",
  "ruby-file-handling": "Ruby File Handling",
  "ruby-oop": "Ruby OOP",
  "ruby-blocks-modules": "Ruby Blocks & Modules",
  "csharp-fundamentals": "C# Fundamentals",
  "sql-fundamentals": "SQL Fundamentals",
  "sql-queries": "SQL Queries",
  "sql-joins": "SQL Joins",
  "sql-subqueries": "SQL Subqueries",
  "sql-aggregate-functions": "SQL Aggregate Functions",
  "sql-views": "SQL Views",
  "sql-indexes": "SQL Indexes",
  "sql-stored-procedures": "SQL Stored Procedures",
  "sql-projects": "SQL Projects",
  "go-fundamentals": "Go Fundamentals",
  "go-functions": "Go Functions",
  "go-concurrency": "Go Concurrency",
  "go-web-development": "Go Web Development",
  "go-modules": "Go Modules",
  "rust-fundamentals": "Rust Fundamentals",
  "java-fundamentals": "Java Fundamentals",
  "java-intermediate": "Java Intermediate",
  "java-advanced": "Java Advanced",
  "java-collections": "Java Collections",
  "java-exception": "Java Exception Handling",
  "java-multithreading": "Java Multithreading",
  "java-jdbc": "Java JDBC",
  "java-spring-boot": "Java Spring Boot",
  "java-projects": "Java Projects",
  "qsharp-fundamentals": "Q# Fundamentals",
  "qsharp-quantum-programming-basics": "Quantum Programming Basics",
  "quantum-multi-syntax": "Quantum Multi Syntax",
  "quantum-paradigm-coding": "Quantum Paradigm Coding",
  "qsharp-quantum-gates": "Quantum Gates",
  "qsharp-quantum-algorithms": "Quantum Algorithms",
  "qsharp-quantum-projects": "Quantum Projects",
};

export function slugifyCourseName(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function progressMapFromRemote(byCourseId, courseId, fallbackMap = {}) {
  return byCourseId?.[courseId]?.completedMap || fallbackMap;
}
