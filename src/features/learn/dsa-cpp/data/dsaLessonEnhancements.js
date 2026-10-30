/** Per-lesson objectives, scenarios, and callouts merged into curriculum at build time. */

export const LESSON_ENHANCEMENTS = {
  "dsa-0": {
    objectives: [
      "Name common Big-O classes from O(1) to O(n^2)",
      "Compare time and space complexity for simple loops",
      "Use constraints to pick a feasible algorithm class",
    ],
    scenario:
      "An interview asks whether your search runs in O(n) or O(log n) for n = 10^6. Big-O is how you justify the answer before writing code.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "Interviews usually care about **worst-case** time unless the problem states otherwise.",
      },
    ],
  },
  o1: {
    objectives: [
      "Recognize O(1) constant-time operations",
      "Distinguish O(1) access from O(n) scans",
    ],
    scenario:
      "Hash map lookup vs scanning a list — same answer, different growth rate.",
  },
  "dsa-0b": {
    objectives: [
      "Match problems to patterns: two-pointer, sliding window, DP, greedy",
      "Read input size constraints before coding",
      "Avoid nested loops when n exceeds ~10^4",
    ],
    scenario:
      "n = 200,000 means O(n^2) is too slow. You pick two-pointer or hashing instead of brute force.",
  },
  "dsa-1": {
    objectives: [
      "Traverse std::vector in O(n)",
      "Pass vectors by const reference to avoid copies",
      "Use reserve() when size is known upfront",
    ],
    scenario:
      "Sensor readings arrive as a vector of ints. You sum them for a dashboard without copying the whole buffer.",
  },
  "dsa-1b": {
    objectives: [
      "Apply two-pointer technique on sorted arrays",
      "Maintain a sliding window with left and right indices",
      "Shrink the window when a constraint is violated",
    ],
    scenario:
      "Find the longest subarray with sum at most K — expand right, shrink left when the sum is too large.",
  },
  "dsa-2": {
    objectives: [
      "Reverse a singly linked list iteratively",
      "Track prev, curr, and next pointers while rewiring",
      "Test empty, single-node, and multi-node lists",
    ],
    scenario:
      "Undo history in an editor is often a linked list. Reversal is a classic pointer-manipulation drill.",
  },
  "dsa-2b": {
    objectives: [
      "Detect cycles with Floyd's tortoise and hare",
      "Handle null and single-node edge cases",
      "Plan delete semantics for heap-allocated nodes",
    ],
    scenario:
      "A corrupted log chain loops back on itself. Cycle detection finds the bug before infinite traversal.",
  },
  "stacks-queues": {
    objectives: [
      "Choose stack (LIFO) vs queue (FIFO) for the problem shape",
      "Use stacks for nesting and parsing",
      "Use queues for BFS and level-order traversal",
    ],
    scenario:
      "Validate bracket nesting with a stack; explore a graph layer by layer with a queue.",
  },
  "dsa-3": {
    objectives: [
      "Validate balanced parentheses with std::stack",
      "Push expected closing brackets on open",
      "Return false on mismatch or leftover stack items",
    ],
    scenario:
      "A linter checks that every opening bracket has a matching closer — classic stack application.",
  },
  "dsa-4": {
    objectives: [
      "Implement inorder tree traversal recursively",
      "Distinguish preorder, inorder, and postorder visits",
      "Use a queue for level-order BFS on trees",
    ],
    scenario:
      "Print BST keys in sorted order with inorder traversal before exporting a report.",
  },
  "dsa-5": {
    objectives: [
      "Validate BST ordering with min/max bounds",
      "Explain why unbalanced BST height hurts performance",
      "Search and insert in O(h) tree height",
    ],
    scenario:
      "Imported tree data might violate BST rules. A range check catches bad nodes before indexing.",
  },
  "dsa-6": {
    objectives: [
      "Represent sparse graphs with adjacency lists",
      "Run BFS for shortest paths in unweighted graphs",
      "Track visited nodes and parent pointers for path reconstruction",
    ],
    scenario:
      "Social network degrees of separation: BFS from one user finds the shortest connection chain.",
  },
  "dsa-7": {
    objectives: [
      "Use unordered_map for average O(1) lookup",
      "Count frequencies and deduplicate with hashing",
      "Understand collision handling at a high level",
    ],
    scenario:
      "Two-sum with unsorted input — store seen values in a hash map instead of nested loops.",
  },
  "dsa-8": {
    objectives: [
      "Implement binary search on a sorted vector",
      "Use mid = l + (r - l) / 2 to avoid overflow",
      "Compare merge sort vs quicksort trade-offs",
    ],
    scenario:
      "A sorted leaderboard of millions of scores — binary search finds a rank in O(log n).",
  },
  "dp-greedy": {
    objectives: [
      "Decide when greedy local choices are safe",
      "Identify overlapping subproblems for DP",
      "Build tables or memoization from recurrence relations",
    ],
    scenario:
      "Scheduling meetings vs counting coin combinations — one problem is greedy, the other needs DP.",
  },
  "dsa-9": {
    objectives: [
      "Sort intervals by end time for activity selection",
      "Prove greedy choice stays compatible with future picks",
      "Return maximum non-overlapping interval count",
    ],
    scenario:
      "Room booking: pick as many non-overlapping meetings as possible by always taking the earliest finisher.",
  },
  "dsa-10": {
    objectives: [
      "Build a 0/1 knapsack DP table",
      "Fill dp[i][w] from smaller subproblems",
      "Recognize optimal substructure in DP problems",
    ],
    scenario:
      "Pack a limited backpack with items of weight and value — DP beats trying every subset.",
  },
  "dsa-11": {
    objectives: [
      "Implement BFS with a queue on an adjacency list",
      "Implement DFS recursively or with an explicit stack",
      "Mark visited nodes to avoid infinite loops",
    ],
    scenario:
      "Find all rooms reachable from a starting node in an office floor plan modeled as a graph.",
  },
  "dsa-12": {
    objectives: [
      "Build adjacency list from edge list input",
      "Compare adjacency list vs adjacency matrix memory",
      "Add undirected edges in both directions",
    ],
    scenario:
      "Convert a list of friendships into an adjacency list before running traversal algorithms.",
  },
  "dsa-13": {
    objectives: [
      "Define coin change DP state dp[amount]",
      "Take min coins over all usable denominations",
      "Initialize impossible amounts sensibly",
    ],
    scenario:
      "ATM software computes the minimum coins to make change when greedy fails on some denominations.",
  },
  "dsa-14": {
    objectives: [
      "Fill LCS table when characters match or mismatch",
      "Read answer from dp[m][n] for full strings",
      "Trace back to recover one longest subsequence",
    ],
    scenario:
      "Diff two version strings and highlight the longest common substring of unchanged code.",
  },
};

export function applyLessonEnhancements(lesson) {
  const meta = LESSON_ENHANCEMENTS[lesson.id];
  const objectives = meta?.objectives || [
    `Understand the core idea in "${lesson.title}"`,
    "Implement the C++ pattern from this lesson",
    "Analyze time and space complexity of your solution",
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
