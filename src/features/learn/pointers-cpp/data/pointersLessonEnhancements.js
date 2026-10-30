/** Per-lesson objectives, scenarios, and callouts merged into curriculum at build time. */

export const LESSON_ENHANCEMENTS = {
  "ptr-intro-1": {
    objectives: [
      "Explain what a pointer stores (an address)",
      "Use & to take an address and * to dereference",
      "Update a value through a pointer",
    ],
    scenario:
      "A game stat lives in one variable but two systems need to update it — a pointer lets both code paths change the same memory.",
  },
  "ptr-intro-2": {
    objectives: [
      "Initialize pointers with nullptr",
      "Check for null before dereferencing",
      "Assign a valid address after a null start",
    ],
    scenario:
      "An optional power-up may not exist yet. nullptr makes 'no target' explicit before you attach a real object.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content: "Dereferencing **nullptr** is undefined behavior — always check first.",
      },
    ],
  },
  "ptr-move-1": {
    objectives: [
      "Relate array names to pointers to the first element",
      "Use pointer arithmetic *(p + i) and p[i]",
      "Walk an array without index variables if needed",
    ],
    scenario:
      "Print the second element of a score array using pointer arithmetic instead of subscript notation.",
  },
  "ptr-move-2": {
    objectives: [
      "Contrast pointers (nullable, reseatable) with references (aliases)",
      "Reseat a pointer to another variable",
      "Choose references when null is not meaningful",
    ],
    scenario:
      "Swap which player struct a pointer tracks mid-round — pointers can move; references cannot.",
  },
  "ptr-own-1": {
    objectives: [
      "Allocate with new and release with delete",
      "Dereference heap memory safely",
      "Set pointer to nullptr after delete",
    ],
    scenario:
      "Load a large score object on the heap when it outlives the stack frame that created it.",
  },
  "ptr-own-arr-1": {
    objectives: [
      "Allocate dynamic arrays with new[]",
      "Index dynamic arrays like stack arrays",
      "Release with delete[] matching new[]",
    ],
    scenario:
      "User picks team size at runtime — a dynamic int array holds roster IDs without a fixed compile-time bound.",
  },
  "ptr-own-2": {
    objectives: [
      "Contrast unique_ptr vs shared_ptr ownership",
      "Create smart pointers with make_unique / make_shared",
      "Prefer smart pointers over raw owning new/delete",
    ],
    scenario:
      "Modernize legacy new/delete code so memory frees automatically when the last owner goes away.",
  },
  row0: {
    objectives: ["Read first row of a 2D grid", "Understand row-major layout"],
    scenario: "Grid row 0 holds the header cells in a spreadsheet-like structure.",
  },
  row1: {
    objectives: ["Move to the second row with grid + 1", "Index cells within a row"],
    scenario: "Second row of a tile map stores collision flags.",
  },
  "ptr-2d-1": {
    objectives: [
      "Describe row-major 2D array layout",
      "Declare a pointer to a row int (*row)[cols]",
      "Read cells with row[i][j] or pointer math",
    ],
    scenario:
      "A 2D game board stores tiles row by row in memory — row pointers match how C++ lays out int grid[rows][cols].",
  },
  "ptr-2d-2": {
    objectives: [
      "Pass 2D arrays to functions with fixed column count",
      "Loop rows and columns to print a matrix",
      "Know why column dimension is required in parameters",
    ],
    scenario:
      "Reuse one printGrid helper for any number of rows as long as each row has three columns.",
  },
  "ptr-2d-3": {
    objectives: [
      "Store a 2D shape in one flat heap array",
      "Map (row, col) to index row * cols + col",
      "Release the flat block with delete[]",
    ],
    scenario:
      "Image filters often use one contiguous buffer — flat indexing is cache-friendly and simple to allocate.",
  },
  "ptr-2d-4": {
    objectives: [
      "Allocate int** row pointer lists",
      "Create each row with separate new int[cols]",
      "Delete each row before deleting the row list",
    ],
    scenario:
      "Rows have different lengths in a ragged table — row pointers let each row size differ (with extra bookkeeping).",
  },
  "ptr-adv-1": {
    objectives: [
      "Declare function pointers with correct signature",
      "Pass functions as callbacks to helper utilities",
      "Call through a function pointer parameter",
    ],
    scenario:
      "A math pipeline applies different transforms (square, triple) via one apply() function and a pointer argument.",
  },
  "ptr-adv-2": {
    objectives: [
      "List common pointer bugs: leak, dangling, double-delete",
      "Check nullptr before dereference",
      "Prefer smart pointers for ownership",
    ],
    scenario:
      "Code review checklist before merging pointer-heavy legacy C++ into production.",
  },
  "ptr-final-1": {
    objectives: [
      "Review addresses, arrays, 2D arrays, ownership, and safety",
      "Combine bounds checks with 2D parameters",
      "Apply the full pointer track in one challenge",
    ],
    scenario:
      "Capstone audit: print one cell from a 2D grid with bounds checks — the pattern behind safe engine tooling.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Trace three things: **address**, **value at address**, and **who owns the memory**.",
      },
    ],
  },
  "ptr-smart-1": {
    objectives: [
      "Create unique_ptr with make_unique",
      "Transfer ownership with std::move",
      "Know unique_ptr cannot be copied",
    ],
    scenario:
      "One game entity owns its mesh buffer — unique_ptr makes exclusive ownership obvious.",
  },
  "ptr-smart-2": {
    objectives: [
      "Share objects with shared_ptr and reference counting",
      "Copy shared_ptr to add owners",
      "Use make_shared for exception-safe allocation",
    ],
    scenario:
      "Multiple UI panels display the same texture — shared_ptr keeps it alive until the last panel closes.",
  },
  "ptr-smart-3": {
    objectives: [
      "Break cycles with weak_ptr",
      "Lock weak_ptr to shared_ptr before use",
      "Explain why parent-child shared_ptr cycles leak",
    ],
    scenario:
      "A parent node should not keep children alive forever — weak_ptr observes without owning.",
  },
  "ptr-smart-4": {
    objectives: [
      "Apply a pointer safety checklist before shipping",
      "Use raw pointers only for non-owning access",
      "Reset pointers after delete or use smart pointers",
    ],
    scenario:
      "Final safety pass on a module that mixes legacy raw pointers with modern C++ ownership.",
  },
};

export function applyLessonEnhancements(lesson) {
  const meta = LESSON_ENHANCEMENTS[lesson.id];
  const objectives = meta?.objectives || [
    `Understand the core idea in "${lesson.title}"`,
    "Apply the C++ pointer pattern from this lesson",
    "Practice safe ownership and lifetime habits",
  ];

  const prefix = [{ type: "objectives", items: objectives }];
  if (meta?.scenario) {
    prefix.push({ type: "scenario", content: meta.scenario });
  }
  if (meta?.prepend?.length) {
    prefix.push(...meta.prepend);
  }

  return {
    ...lesson,
    theory: [...prefix, ...lesson.theory, ...(meta?.append || [])],
  };
}

export function applyChapterEnhancements(chapters) {
  return chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map(applyLessonEnhancements),
  }));
}
