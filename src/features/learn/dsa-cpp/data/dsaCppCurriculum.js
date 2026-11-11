// PolyCode — DSA in C++ curriculum (detailed)

import { applyChapterEnhancements } from "./dsaLessonEnhancements";

const ACCENT = "#a78b7fa";

function text(content, codeBlock = null) {
  if (codeBlock) return { type: "text", content, code: { lang: "cpp", ...codeBlock } };
  return { type: "text", content };
}

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

const RAW_DSA_CPP_CHAPTERS = [
  // Complexity
  {
    id: "complexity",
    title: "Complexity & Problem Solving",
    icon: "📈",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-0",
        title: "Big-O, Time & Space",
        xp: 12,
        chapterTitle: "Complexity & Problem Solving",
        theory: [
          text("Big-O describes an algorithm's runtime growth relative to input size. Focus on worst-case unless stated otherwise. Common classes: O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n)."),
          text("Space complexity measures extra memory used (not counting input). Trade-offs often exist between time and space."),
          diagram("Common growth rates", [
            { id: "o1", label: "O(1)", color: "#a78b7fa", items: ["Constant"] },
            { id: "on", label: "O(n)", color: "#f59e0b", items: ["Linear"] },
            { id: "onlogn", label: "O(n log n)", color: "#22c55e", items: ["Divide & conquer sorts"] },
          ]),
          text("Divide and conquer means solving a problem by splitting it into smaller pieces of the same kind, solving those pieces (often recursively), then combining the results. Think of three steps: divide the input, conquer each part, and merge (or select) an answer from the parts."),
          text("Example: merge sort divides an array into two halves, sorts each half, then merges the sorted halves. Binary search is a lighter form: each step divides the search range in half and only conquers one side. That repeated halving is why many divide-and-conquer algorithms cost about O(n log n) or O(log n) instead of O(n^2)."),
          callout("info", "Divide and conquer is a strategy, not a single algorithm. Merge sort, quicksort, and binary search all use it — they differ in how they split and how they combine."),
          quiz("Which runtime is typical for merge sort?", ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], 1, "Merge sort splits and merges — O(n log n)."),
          text("Amortized analysis: some operations are cheap most of the time and occasionally expensive (e.g., dynamic array push which resizes). Amortized cost averages across operations."),
          text("Example: binary search runs in O(log n). Typical implementation:", { label: "Binary search (C++)", content: `#include <iostream>
#include <vector>
using namespace std;

int bs(const vector<int>& a, int x) {
  int l = 0;
  int r = (int)a.size() - 1;
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (a[m] == x) return m;
    if (a[m] < x) l = m + 1;
    else r = m - 1;
  }
  return -1;
}

int main() {
  vector<int> a = {1, 3, 5, 7, 9};
  cout << bs(a, 7) << endl;
  return 0;
}` }),
          text("How to pick algorithm: read constraints, estimate feasible complexity, and match patterns (sort, hash, two-pointer, dp, greedy)."),
          callout("info", "Good to know: interviews usually focus on worst-case runtime. Best-case is useful, but worst-case shows whether the solution scales."),
        ],
        challenge: {
          title: "Estimate Complexity",
          description: "For each snippet, choose the correct Big-O from options (answers in comments).",
          compileOptional: true,
          starterCode: `#include <iostream>

using namespace std;

int main()
{
    int n = 8;

    // 1) Nested for loops
    for (int i = 0; i < n; i++) 
    {
        for (int j = 0; j < n; j++)
        {
            // Constant-time operation
            cout << "* ";
        }
        cout << endl;
    }

    cout << endl;

    // 2) While loop dividing n by 2
    while (n > 1)
    {
        cout << "n = " << n << endl;
        n /= 2;
    }

    // Time Complexity Answers:
    // 1) O(n^2)
    // 2) O(log n)

    return 0;
}`,
          solutionCode: `// 1) O(n^2)
// 2) O(log n)`,
          tests: [
            { id: 1, label: "Answered snippet 1", keywords: [{ pattern: "O\\(n\\^2\\)" }], hint: "Double loop => O(n^2)" },
            { id: 2, label: "Answered snippet 2", keywords: [{ pattern: "O\\(log n\\)" }], hint: "Divide by two => O(log n)" },
          ],
        },
      },
      {
        id: "dsa-0b",
        title: "Problem Solving Patterns",
        xp: 10,
        chapterTitle: "Complexity & Problem Solving",
        theory: [
          text("Recognize patterns: two-pointers, sliding window, divide & conquer, dynamic programming, greedy, graph traversal, and hashing."),
          text("Start by analyzing constraints: n up to 10^5 suggests O(n log n) or O(n); n up to 20 allows exponential/bitmask DP."),
          text("Pattern selection checklist: can you sort the data? Is there overlapping subproblem structure? Is a sliding window possible? Could hashing reduce complexity?"),
          text("Example: For 'find pair with sum == target' — if sorted, use two-pointers; if not, use a hash map for O(n)."),
          callout("tip", "When input sizes are large, prefer O(n) or O(n log n) patterns. Avoid nested loops for arrays above 10^4 when possible."),
        ],
        challenge: {
          title: "Choose a pattern",
          description: "Given a short problem statement, pick the best pattern (answer in comment).",
          compileOptional: true,
          starterCode: `// Problem: Given sorted array and target, find pair. // Best pattern:`,
          solutionCode: `// Two pointers`,
          tests: [
            { id: 1, label: "Picked pattern: two-pointers", keywords: [{ pattern: "two[\\s-]*pointers?", flags: "i" }] },
          ],
        },
      },
    ],
  },
  {
    id: "arrays",
    title: "Arrays & Two-Pointers",
    icon: "🧩",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-1",
        title: "Array fundamentals",
        xp: 15,
        chapterTitle: "Arrays & Two-Pointers",
        theory: [
          text("Arrays provide indexed access to contiguous elements. Access by index is O(1). In C++ use `std::vector` for dynamic arrays; prefer `reserve()` when size is known to avoid reallocations."),
          text("Common operations: traversal, searching, insertion/deletion at end (O(1) amortized), and no O(1) insert at arbitrary index without shifting."),
          text("Memory layout: contiguous memory enables cache-friendly loops; avoid copying large vectors by value — pass by `const &`."),
          text("Example: summing elements", { label: "Sum example (C++)", content: `#include <iostream>
#include <vector>
using namespace std;

int sum(const vector<int>& a) {
  long long s = 0;
  for (int x : a) s += x;
  return (int)s;
}

int main() {
  vector<int> a = {1, 2, 3, 4};
  cout << sum(a) << endl;
  return 0;
}` }),
          text("Tip: use `reserve()` to preallocate capacity when pushing many items:", { label: "Reserve example", content: `#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n = 5;
  vector<int> v;
  v.reserve(n);
  for (int i = 0; i < n; ++i) v.emplace_back(i);
  for (int x : v) cout << x << " ";
  cout << endl;
  return 0;
}` }),
          callout("tip", "Good to know: `std::vector` is usually faster than linked lists for most problems because of contiguous memory and cache locality."),
        ],
        challenge: {
          title: "Sum of array",
          description: "Return sum of integers in array.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int sum(const vector<int>& a) {
  int s = 0;
  for (int x : a) {
    // TODO: add x to the running total
    s += x;
  }
  return s;
}

int main() {
  vector<int> a = {1, 2, 3, 4};
  cout << sum(a) << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int sum(const vector<int>& a) {
  int s = 0;
  for (int x : a) s += x;
  return s;
}

int main() {
  vector<int> a = {1, 2, 3, 4};
  cout << sum(a) << endl;
  return 0;
}`,
          tests: [
            { id: 1, label: "Uses loop to sum", keywords: [{ pattern: "(for|while)\\s*\\(" }, { pattern: "\\w+\\s*\\+=\\s*\\w+" }] },
          ],
        },
      },
      {
        id: "dsa-1b",
        title: "Two-pointers & Sliding window",
        xp: 18,
        chapterTitle: "Arrays & Two-Pointers",
        theory: [
          text("Two-pointer: use two indices (often left/right) to scan arrays with O(n) time for sorted or special cases. Sliding window: maintain a range [l,r) and update incrementally for subarray sums/conditions."),
          text("Pattern: when array is sorted or when you need pair/sum problems, two-pointer avoids O(n^2) nested loops."),
          text("Sliding window example: longest subarray with sum <= k — expand right, shrink left."),
          text("Sliding window snippet:", { label: "Sliding window (C++)", content: `#include <iostream>
#include <vector>
using namespace std;

int maxLenAtMostK(const vector<int>& a, int K) {
  int l = 0;
  long long sum = 0;
  int best = 0;
  for (int r = 0; r < (int)a.size(); ++r) {
    sum += a[r];
    while (l <= r && sum > K) sum -= a[l++];
    best = max(best, r - l + 1);
  }
  return best;
}

int main() {
  vector<int> a = {1, 2, 1, 0, 1};
  cout << maxLenAtMostK(a, 3) << endl;
  return 0;
}` }),
          text("Example: two-sum on sorted array", { label: "Two-pointer snippet (C++)", content: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSumSorted(const vector<int>& a, int target) {
  int l = 0, r = (int)a.size() - 1;
  while (l < r) {
    int s = a[l] + a[r];
    if (s == target) return {l, r};
    if (s < target) l++;
    else r--;
  }
  return {};
}

int main() {
  vector<int> a = {1, 2, 3, 4, 6};
  auto ans = twoSumSorted(a, 7);
  if (!ans.empty()) cout << ans[0] << " " << ans[1] << endl;
  return 0;
}` }),
          callout("tip", "Sorted arrays are ideal for two-pointer scanning: they often turn nested loops into a single linear pass."),
        ],
        challenge: {
          title: "Two-sum (sorted)",
          description: "Find pair summing to target using two pointers.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSumSorted(const vector<int>& a, int target) {
  int l = 0;
  int r = (int)a.size() - 1;
  while (l < r) {
    int s = a[l] + a[r];
    if (s == target) return {l, r};
    if (s < target) l++;
    else r--;
  }
  return {};
}

int main() {
  vector<int> a = {1, 2, 3, 4, 6};
  auto ans = twoSumSorted(a, 7);
  if (!ans.empty()) cout << ans[0] << " " << ans[1] << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSumSorted(const vector<int>& a, int target) {
  int l = 0;
  int r = (int)a.size() - 1;
  while (l < r) {
    int s = a[l] + a[r];
    if (s == target) return {l, r};
    if (s < target) l++;
    else r--;
  }
  return {};
}

int main() {
  vector<int> a = {1, 2, 3, 4, 6};
  auto ans = twoSumSorted(a, 7);
  if (!ans.empty()) cout << ans[0] << " " << ans[1] << endl;
  return 0;
}`,
          tests: [
            { id: 1, label: "Uses two-pointer approach", keywords: [{ pattern: "\\b\\w+\\s*=\\s*0\\s*;" }, { pattern: "=\\s*(\\(\\s*int\\s*\\)\\s*|static_cast\\s*<\\s*int\\s*>\\s*\\(\\s*)?\\w+\\.size\\s*\\(\\s*\\)\\s*\\)?\\s*-\\s*1" }, { pattern: "while\\s*\\(\\s*\\w+\\s*<\\s*\\w+\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  {
    id: "lists",
    title: "Linked Lists",
    icon: "🔗",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-2",
        title: "Singly & Doubly Lists",
        xp: 15,
        chapterTitle: "Linked Lists",
        theory: [
          text("Linked lists store nodes with pointers to next (and optional prev). They support O(1) insertion/removal at head given node pointer, but random access is O(n)."),
          text("Common operations: traversal, insertion, deletion, reversal, merge, detect cycle (Floyd's tortoise & hare)."),
          text("Memory footprint: each node has pointer overhead; prefer arrays/vectors when random access required."),
          text("Example: reverse list (iterative)", { label: "Reverse snippet", content: `#include <iostream>

struct Node {
  int val;
  Node* next;
  Node(int value) : val(value), next(nullptr) {}
};

Node* reverseList(Node* head) {
  Node* prev = nullptr;
  while (head) {
    Node* nxt = head->next;
    head->next = prev;
    prev = head;
    head = nxt;
  }
  return prev;
}

int main() {
  Node* head = new Node(1);
  head->next = new Node(2);
  head->next->next = new Node(3);
  Node* rev = reverseList(head);
  while (rev) {
    std::cout << rev->val;
    if (rev->next) std::cout << " ";
    rev = rev->next;
  }
  std::cout << std::endl;
  return 0;
}` } ),
          callout("warning", "Watch out for null pointers and single-node lists. Always test empty, single, and multi-node cases when manipulating links."),
        ],
        challenge: {
          title: "Reverse singly linked list",
          description: "Reverse a singly linked list in-place and return new head.",
          starterCode: `#include <iostream>
using namespace std;

struct Node {
  int val;
  Node* next;
  Node(int value) : val(value), next(nullptr) {}
};

Node* reverseList(Node* head) {
  Node* prev = nullptr;
  while (head) {
    Node* nxt = head->next;
    head->next = prev;
    prev = head;
    head = nxt;
  }
  return prev;
}

int main() {
  Node* head = new Node(1);
  head->next = new Node(2);
  head->next->next = new Node(3);
  Node* rev = reverseList(head);
  while (rev) {
    cout << rev->val;
    if (rev->next) cout << " ";
    rev = rev->next;
  }
  cout << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node {
  int val;
  Node* next;
  Node(int value) : val(value), next(nullptr) {}
};

Node* reverseList(Node* head) {
  Node* prev = nullptr;
  while (head) {
    Node* nxt = head->next;
    head->next = prev;
    prev = head;
    head = nxt;
  }
  return prev;
}

int main() {
  Node* head = new Node(1);
  head->next = new Node(2);
  head->next->next = new Node(3);
  Node* rev = reverseList(head);
  while (rev) {
    cout << rev->val;
    if (rev->next) cout << " ";
    rev = rev->next;
  }
  cout << endl;
  return 0;
}`,
          tests: [
            {
              id: 1,
              label: "Uses iterative reverse",
              keywords: [{ pattern: "prev\\s*=\\s*nullptr" }, { pattern: "head->next\\s*=\\s*prev" }],
            },
          ],
        },
      },
      {
        id: "dsa-2b",
        title: "Lists: pointers & pitfalls",
        xp: 12,
        chapterTitle: "Linked Lists",
        theory: [
          text("Edge cases: empty list, single node, cycles. Be careful with ownership and memory management in C++ (use smart pointers or clear delete semantics)."),
          text("Merging two sorted lists can be done in O(n) by pointer manipulation without extra allocations.") ,
          callout("tip", "Cycle detection is a classic linked list edge case. Use Floyd's algorithm and test with a list that loops back to the head."),
        ],
        challenge: {
          title: "Detect cycle",
          description: "Return true if linked list has a cycle.",
          starterCode: `#include <iostream>
using namespace std;

struct Node {
  int val;
  Node* next;
  Node(int value) : val(value), next(nullptr) {}
};

bool hasCycle(Node* head) {
  Node* n = head;
  Node* f = head;
  while (f && f->next) {
    n = n->next;
    f = f->next->next;
    if (n == f) return true;
  }
  return false;
}

int main() {
  Node* head = new Node(1);
  head->next = new Node(2);
  head->next->next = new Node(3);
  head->next->next->next = head->next;
  cout << (hasCycle(head) ? "true" : "false") << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node {
  int val;
  Node* next;
  Node(int value) : val(value), next(nullptr) {}
};

bool hasCycle(Node* head) {
  Node* n = head;
  Node* f = head;
  while (f && f->next) {
    n = n->next;
    f = f->next->next;
    if (n == f) return true;
  }
  return false;
}

int main() {
  Node* head = new Node(1);
  head->next = new Node(2);
  head->next->next = new Node(3);
  head->next->next->next = head->next;
  cout << (hasCycle(head) ? "true" : "false") << endl;
  return 0;
}`,
          tests: [
            {
              id: 1,
              label: "Uses Floyd cycle detection",
              keywords: ["f->next->next", "n==f"],
            },
          ],
        },
      },
    ],
  },

  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    icon: "📚",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-3",
        title: "Stack applications",
        xp: 12,
        chapterTitle: "Stacks & Queues",
        theory: [
          text("Stacks implement LIFO. Common uses: parsing, DFS, evaluating RPN, backtracking, monotonic stack for nearest greater/smaller."),
          text("Monotonic stacks are used to find next greater/smaller elements in O(n) by maintaining a stack of indices with monotonic values."),
          text("Queues implement FIFO, used for BFS, sliding window, and rate limiting. In C++ use `std::queue` or `std::deque` depending on needed operations."),
          text("Example: validate parentheses using stack.", { label: "Parentheses example", content: `#include <iostream>
#include <stack>
#include <string>
using namespace std;
bool isValid(string s)
{
    stack<char> st;

    for (char c : s)
    {
        if (c == '(')
        {
            st.push(')');
        }
        else if (c == '{')
        {
            st.push('}');
        }
        else if (c == '[')
        {
            st.push(']');
        }
        else
        {
            if (st.empty() || st.top() != c)
            {
                return false;
            }

            st.pop();
        }
    }

    return st.empty();
}

int main()
{
    string s;

    cout << "Enter brackets: ";
    cin >> s;

    if (isValid(s))
    {
        cout << "Valid Parentheses" << endl;
    }
    else
    {
        cout << "Invalid Parentheses" << endl;
    }

    return 0;
}` }),
          callout("tip", "A stack is ideal for nested structure checks. Use it for parentheses, syntax, and undo operations."),
        ],
        challenge: {
          title: "Valid parentheses",
          description: "Return true if brackets are balanced.",
          starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
  stack<char> st;
  for (char c : s) {
    if (c == '(') st.push(')');
    else if (st.empty() || st.top() != c) return false;
    else st.pop();
  }
  return st.empty();
}

int main() {
  cout << (isValid("()[]{}") ? "true" : "false") << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
  stack<char> st;
  for (char c : s) {
    if (c == '(') st.push(')');
    else if (st.empty() || st.top() != c) return false;
    else st.pop();
  }
  return st.empty();
}

int main() {
  cout << (isValid("()[]{}") ? "true" : "false") << endl;
  return 0;
}`,
          tests: [
            {
              id: 1,
              label: "Uses stack",
              keywords: ["stack<char>", "st.push("],
            },
          ],
        },
      },
    ],
  },

  {
    id: "trees",
    title: "Trees & BSTs",
    icon: "🌳",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-4",
        title: "Binary Trees & Traversals",
        xp: 18,
        chapterTitle: "Trees & BSTs",
        theory: [
          text("Trees are hierarchical structures. Binary trees have up to two children per node. Traversals: preorder (root,left,right), inorder (left,root,right), postorder (left,right,root). BFS (level-order) uses a queue; DFS uses recursion or stack."),
          text("Applications: expression trees, parsing, hierarchical data. Common operations: insert, delete, search, height, balance."),
          callout("info", "Good to know: recursion is natural for tree traversals, but iterative stack-based traversals are useful when recursion depth is a concern."),
        ],
        challenge: {
          title: "Inorder traversal",
          description: "Return inorder list.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root, vector<int>& out) {
  if (!root) return;
  inorder(root->left, out);
  out.push_back(root->val);
  inorder(root->right, out);
}

vector<int> inorderTraversal(TreeNode* root) {
  vector<int> result;
  inorder(root, result);
  return result;
}

int main() {
  TreeNode* root = new TreeNode(2);
  root->left = new TreeNode(1);
  root->right = new TreeNode(3);
  auto result = inorderTraversal(root);
  for (int i = 0; i < result.size(); ++i) {
    cout << result[i];
    if (i + 1 < result.size()) cout << " ";
  }
  cout << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root, vector<int>& out) {
  if (!root) return;
  inorder(root->left, out);
  out.push_back(root->val);
  inorder(root->right, out);
}

vector<int> inorderTraversal(TreeNode* root) {
  vector<int> result;
  inorder(root, result);
  return result;
}

int main() {
  TreeNode* root = new TreeNode(2);
  root->left = new TreeNode(1);
  root->right = new TreeNode(3);
  auto result = inorderTraversal(root);
  for (int i = 0; i < result.size(); ++i) {
    cout << result[i];
    if (i + 1 < result.size()) cout << " ";
  }
  cout << endl;
  return 0;
}`,
          tests: [
            { id: 1, label: "Uses recursion or stack", keywords: [{ pattern: "\\w+\\s*\\(\\s*\\w+\\s*->\\s*left\\b|stack\\s*<" }] },
          ],
        },
      },
      {
        id: "dsa-5",
        title: "Binary Search Trees",
        xp: 18,
        chapterTitle: "Trees & BSTs",
        theory: [
          text("BSTs maintain left < node < right ordering, enabling O(h) operations where h is tree height. Balanced BSTs (AVL, Red-Black) keep h = O(log n)."),
          text("Inserting, searching, deleting with careful pointer updates; consider successor/replacement node on delete."),
          callout("tip", "Good to know: an unbalanced BST can degrade to linked-list performance. For interviews, mention height and balance when discussing efficiency."),
        ],
        challenge: {
          title: "Validate BST",
          description: "Check if tree is valid BST.",
          starterCode: `#include <iostream>
#include <climits>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

bool isValidBST(TreeNode* root, long long minVal, long long maxVal) {
  if (!root) return true;
  if (root->val <= minVal || root->val >= maxVal) return false;
  return isValidBST(root->left, minVal, root->val) &&
         isValidBST(root->right, root->val, maxVal);
}

bool isValidBST(TreeNode* root) {
  return isValidBST(root, LLONG_MIN, LLONG_MAX);
}

int main() {
  TreeNode* root = new TreeNode(2);
  root->left = new TreeNode(1);
  root->right = new TreeNode(3);
  cout << (isValidBST(root) ? "true" : "false") << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <climits>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

bool isValidBST(TreeNode* root, long long minVal, long long maxVal) {
  if (!root) return true;
  if (root->val <= minVal || root->val >= maxVal) return false;
  return isValidBST(root->left, minVal, root->val) &&
         isValidBST(root->right, root->val, maxVal);
}

bool isValidBST(TreeNode* root) {
  return isValidBST(root, LLONG_MIN, LLONG_MAX);
}

int main() {
  TreeNode* root = new TreeNode(2);
  root->left = new TreeNode(1);
  root->right = new TreeNode(3);
  cout << (isValidBST(root) ? "true" : "false") << endl;
  return 0;
}`,
          tests: [
            { id:1, label: "Range-check pattern", keywords: ["min", "max", "isValidBST"] },
          ],
        },
      },
    ],
  },

  {
    id: "graphs",
    title: "Graphs",
    icon: "🕸️",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-6",
        title: "Graph representations & Traversals",
        xp: 18,
        chapterTitle: "Graphs",
        theory: [
          text("Graphs: nodes (vertices) and edges. Representations: adjacency list (preferred for sparse graphs), adjacency matrix (dense)."),
          text("BFS finds shortest path in unweighted graphs using a queue and distance array. DFS explores deeply, useful for topological sort and connectivity checks."),
          text("Directed vs undirected graphs; weighted edges require Dijkstra or Bellman-Ford for shortest paths."),
          callout("info", "Good to know: adjacency lists are usually the best choice unless the graph is dense. They keep memory and runtime lower for sparse graphs."),
        ],
        challenge: {
          title: "BFS shortest path (unweighted)",
          description: "Find shortest path in unweighted graph.",
          starterCode: `#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

vector<int> bfsShortestPath(const vector<vector<int>>& graph, int src, int dst) {
  int n = graph.size();
  vector<int> dist(n, -1);
  vector<int> parent(n, -1);
  queue<int> q;
  dist[src] = 0;
  q.push(src);

  while (!q.empty()) {
    int u = q.front();
    q.pop();
    if (u == dst) break;
    for (int v : graph[u]) {
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        parent[v] = u;
        q.push(v);
      }
    }
  }

  if (dist[dst] == -1) return {};
  vector<int> path;
  for (int cur = dst; cur != -1; cur = parent[cur]) path.push_back(cur);
  reverse(path.begin(), path.end());
  return path;
}

int main() {
  vector<vector<int>> graph = {
    {1, 2},
    {0, 3},
    {0, 3},
    {1, 2}
  };
  auto path = bfsShortestPath(graph, 0, 3);
  for (int i = 0; i < path.size(); ++i) {
    cout << path[i];
    if (i + 1 < path.size()) cout << " ";
  }
  cout << endl;
  return 0;
}`,
          solutionCode: `#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

vector<int> bfsShortestPath(const vector<vector<int>>& graph, int src, int dst) {
  int n = graph.size();
  vector<int> dist(n, -1);
  vector<int> parent(n, -1);
  queue<int> q;
  dist[src] = 0;
  q.push(src);

  while (!q.empty()) {
    int u = q.front();
    q.pop();
    if (u == dst) break;
    for (int v : graph[u]) {
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        parent[v] = u;
        q.push(v);
      }
    }
  }

  if (dist[dst] == -1) return {};
  vector<int> path;
  for (int cur = dst; cur != -1; cur = parent[cur]) path.push_back(cur);
  reverse(path.begin(), path.end());
  return path;
}

int main() {
  vector<vector<int>> graph = {
    {1, 2},
    {0, 3},
    {0, 3},
    {1, 2}
  };
  auto path = bfsShortestPath(graph, 0, 3);
  for (int i = 0; i < path.size(); ++i) {
    cout << path[i];
    if (i + 1 < path.size()) cout << " ";
  }
  cout << endl;
  return 0;
}`,
          tests: [
            { id: 1, label: "Uses queue BFS", keywords: [{ pattern: "queue\\s*<" }, { pattern: "\\.push\\s*\\(" }, { pattern: "\\.pop\\s*\\(\\s*\\)" }, { pattern: "\\b(dist|distance|visited|seen|level)\\w*\\s*\\[" }] },
          ],
        },
      },
    ],
  },

  {
    id: "hashing",
    title: "Hashing & Sets",
    icon: "🔑",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-7",
        title: "Hash maps & collisions",
        xp: 12,
        chapterTitle: "Hashing & Sets",
        theory: [
          text("Hash maps provide average O(1) access. In C++ use `unordered_map` and `unordered_set`. Collisions handled by chaining or open addressing; understand load factor and rehashing."),
          text("Use hashing for frequency counting, deduplication, and as a building block for two-sum and sliding window problems."),
          callout("tip", "Helpful tip: when hash tables feel slow, check if the keys are expensive to hash or if you need a smaller custom hash for performance."),
        ],
        challenge: {
          title: "Two-sum (hash)",
          description: "Return pair that sums to target using hash map.",
          starterCode: `#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

vector<int> twoSum(const vector<int>& a, int target) {
  unordered_map<int, int> m;
  for (int i = 0; i < a.size(); ++i) {
    int need = target - a[i];
    if (m.count(need)) return {m[need], i};
    m[a[i]] = i;
  }
  return {};
}

int main() {
  vector<int> a = {2, 7, 11, 15};
  auto ans = twoSum(a, 9);
  if (!ans.empty()) cout << ans[0] << " " << ans[1] << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

vector<int> twoSum(const vector<int>& a, int target) {
  unordered_map<int, int> m;
  for (int i = 0; i < a.size(); ++i) {
    int need = target - a[i];
    if (m.count(need)) return {m[need], i};
    m[a[i]] = i;
  }
  return {};
}

int main() {
  vector<int> a = {2, 7, 11, 15};
  auto ans = twoSum(a, 9);
  if (!ans.empty()) cout << ans[0] << " " << ans[1] << endl;
  return 0;
}`,
          tests: [
            { id:1, label: "Uses unordered_map", keywords: ["unordered_map<", "m.count("] },
          ],
        },
      }
    ],
  },

  {
    id: "sorting",
    title: "Sorting & Searching",
    icon: "🔃",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-8",
        title: "Comparison sorts",
        xp: 15,
        chapterTitle: "Sorting & Searching",
        theory: [
          text("Comparison-based sorts: QuickSort (average O(n log n)), MergeSort (O(n log n) stable), HeapSort (O(n log n)). Counting/Radix sorts are O(n) for limited key ranges."),
          text("Binary search requires a sorted array and runs in O(log n); be careful with index mid computations to avoid overflow."),
          callout("info", "Good to know: binary search is not only for search; it is also useful for finding boundaries and optimizing monotonic functions."),
        ],
        challenge: {
          title: "Binary search",
          description: "Implement binary search returning index or -1.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int bs(const vector<int>& a, int x) {
  int l = 0;
  int r = (int)a.size() - 1;
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (a[m] == x) return m;
    if (a[m] < x) l = m + 1;
    else r = m - 1;
  }
  return -1;
}

int main() {
  vector<int> a = {1, 3, 5, 7, 9};
  cout << bs(a, 5) << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int bs(const vector<int>& a, int x) {
  int l = 0;
  int r = (int)a.size() - 1;
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (a[m] == x) return m;
    if (a[m] < x) l = m + 1;
    else r = m - 1;
  }
  return -1;
}

int main() {
  vector<int> a = {1, 3, 5, 7, 9};
  cout << bs(a, 5) << endl;
  return 0;
}`,
          tests: [
            { id:1, label: "Uses binary pattern", keywords: ["l+(r-l)/2", "while(l<=r)"] },
          ],
        },
      },
    ],
  },
  {
    id: "dp-greedy",
    title: "Greedy & Dynamic Programming",
    icon: "🧠",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-9",
        title: "Greedy patterns",
        xp: 15,
        chapterTitle: "Greedy & DP",
        theory: [
          text("Greedy chooses local optimum at each step; works when local choices lead to global optimum (e.g., interval scheduling, coin change with canonical systems)."),
          callout("tip", "Helpful tip: greed works when you can prove a local choice stays safe for the full problem. Always validate with a small counterexample first."),
        ],
        challenge: {
          title: "Activity selection (greedy)",
          description: "Select maximum non-overlapping intervals.",
          starterCode: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int maxNonOverlappingIntervals(vector<pair<int, int>> intervals) {
  sort(intervals.begin(), intervals.end(), [](auto &a, auto &b) {
    return a.second < b.second;
  });
  int count = 0;
  int lastEnd = -1;
  for (auto &interval : intervals) {
    if (interval.first >= lastEnd) {
      count++;
      lastEnd = interval.second;
    }
  }
  return count;
}

int main() {
  vector<pair<int, int>> intervals = {{1, 3}, {2, 4}, {3, 5}};
  cout << maxNonOverlappingIntervals(intervals) << endl;
  return 0;
}`,
          solutionCode: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int maxNonOverlappingIntervals(vector<pair<int, int>> intervals) {
  sort(intervals.begin(), intervals.end(), [](auto &a, auto &b) {
    return a.second < b.second;
  });
  int count = 0;
  int lastEnd = -1;
  for (auto &interval : intervals) {
    if (interval.first >= lastEnd) {
      count++;
      lastEnd = interval.second;
    }
  }
  return count;
}

int main() {
  vector<pair<int, int>> intervals = {{1, 3}, {2, 4}, {3, 5}};
  cout << maxNonOverlappingIntervals(intervals) << endl;
  return 0;
}`,
          tests: [
            { id: 1, label: "Sort by end time", keywords: [{ pattern: "sort\\s*\\(" }, { pattern: "\\.second\\s*<\\s*\\w+\\.second|end_?[tT]ime\\s*<" }] },
          ],
        },
      },
      {
        id: "dsa-10",
        title: "Intro to Dynamic Programming",
        xp: 20,
        chapterTitle: "Greedy & DP",
        theory: [
          text("DP transforms exponential recursion into polynomial time via memoization or tabulation. Identify overlapping subproblems and optimal substructure."),
          text("Common patterns: knapsack, LIS, Fibonacci, DP on sequences and intervals."),
          callout("info", "Good to know: when in doubt, try recursive memoization first. It often shows the state shape before you build an efficient table-based DP."),
        ],
        challenge: {
          title: "0/1 Knapsack (small)",
          description: "Simple knapsack with small n and capacity; implement DP table.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int knapsack(const vector<int>& weights, const vector<int>& values, int capacity) {
  int n = weights.size();
  vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
  for (int i = 1; i <= n; ++i) {
    for (int w = 0; w <= capacity; ++w) {
      dp[i][w] = dp[i - 1][w];
      if (w >= weights[i - 1]) {
        dp[i][w] = max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}

int main() {
  vector<int> weights = {1, 3, 4};
  vector<int> values = {15, 20, 30};
  cout << knapsack(weights, values, 4) << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int knapsack(const vector<int>& weights, const vector<int>& values, int capacity) {
  int n = weights.size();
  vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
  for (int i = 1; i <= n; ++i) {
    for (int w = 0; w <= capacity; ++w) {
      dp[i][w] = dp[i - 1][w];
      if (w >= weights[i - 1]) {
        dp[i][w] = max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}

int main() {
  vector<int> weights = {1, 3, 4};
  vector<int> values = {15, 20, 30};
  cout << knapsack(weights, values, 4) << endl;
  return 0;
}`,
          tests: [ { id:1, label: "Uses DP table", keywords: ["vector<vector<", "dp["] } ],
        },
  }],
  },
  {
    id: "graphs-advanced-dp",
    title: "Graphs & Advanced DP",
    icon: "🧩",
    color: ACCENT,
    lessons: [
      {
        id: "dsa-11",
        title: "BFS & DFS Intro",
        xp: 18,
        chapterTitle: "Graphs & Advanced DP",
        theory: [
          text("**BFS** explores layer by layer with a queue — best for shortest paths in unweighted graphs. **DFS** goes deep first with recursion or a stack — great for connectivity and cycles."),
          text("Always mark visited nodes. On an undirected graph, track visited before enqueueing or recursing.", {
            label: "DFS on adjacency list",
            content: `#include <iostream>
#include <vector>
using namespace std;

void dfs(int u, const vector<vector<int>>& g, vector<bool>& vis) {
  vis[u] = true;
  cout << u << " ";
  for (int v : g[u]) {
    if (!vis[v]) dfs(v, g, vis);
  }
}

int main() {
  vector<vector<int>> g = {{1, 2}, {0}, {0}};
  vector<bool> vis(3, false);
  dfs(0, g, vis);
  return 0;
}`,
          }),
          diagram("Traversal styles", [
            { id: "bfs", label: "BFS", color: ACCENT, items: ["Queue", "Shortest unweighted paths"] },
            { id: "dfs", label: "DFS", color: "#22c55e", items: ["Stack / recursion", "Deep exploration"] },
          ]),
          quiz("Which traversal uses a queue?", ["DFS", "BFS", "Binary search", "Merge sort"], 1, "BFS dequeues vertices level by level."),
          callout("tip", "For unweighted shortest path, BFS is the default. DFS alone does not guarantee shortest distance."),
        ],
        challenge: {
          title: "DFS visit count",
          description: "Implement `int countReachable(int start, const vector<vector<int>>& g)` using DFS from start. Return how many vertices are visited (including start).",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int countReachable(int start, const vector<vector<int>>& g) {
  // TODO: DFS with visited vector
  return 0;
}

int main() {
  vector<vector<int>> g = {{1}, {2}, {0}};
  cout << countReachable(0, g) << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

void dfs(int u, const vector<vector<int>>& g, vector<bool>& vis) {
  vis[u] = true;
  for (int v : g[u]) if (!vis[v]) dfs(v, g, vis);
}

int countReachable(int start, const vector<vector<int>>& g) {
  vector<bool> vis(g.size(), false);
  dfs(start, g, vis);
  int c = 0;
  for (bool b : vis) if (b) c++;
  return c;
}

int main() {
  vector<vector<int>> g = {{1}, {2}, {0}};
  cout << countReachable(0, g) << endl;
  return 0;
}`,
          tests: [
            { id: 1, label: "Uses visited tracking", keywords: ["vis", "vector<bool>"] },
            { id: 2, label: "DFS recursion or stack", keywords: [{ pattern: "dfs\\s*\\(" }] },
            { id: 3, label: "Returns count", keywords: ["return"] },
          ],
        },
      },
      {
        id: "dsa-12",
        title: "Graph Representation",
        xp: 16,
        chapterTitle: "Graphs & Advanced DP",
        theory: [
          text("An **adjacency list** stores `vector<vector<int>>` where `g[u]` lists neighbors of u. Build it by pushing both ends for undirected edges."),
          text("Adjacency matrix `vector<vector<int>>` costs O(V^2) memory but O(1) edge lookup — use for dense graphs only.", {
            label: "Build adjacency list from edges",
            content: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> buildUndirected(int n, const vector<pair<int,int>>& edges) {
  vector<vector<int>> g(n);
  for (auto [u, v] : edges) {
    g[u].push_back(v);
    g[v].push_back(u);
  }
  return g;
}`,
          }),
          callout("info", "Sparse graphs (few edges) almost always use adjacency lists — less memory and faster iteration over neighbors."),
          quiz("For a sparse graph with V vertices and E edges, which representation is usually better?", ["Adjacency matrix O(V^2)", "Adjacency list O(V+E)", "Sorted array only", "Hash map of strings"], 1, "Lists store only existing edges."),
        ],
        challenge: {
          title: "Build undirected graph",
          description: "Implement `buildUndirected(int n, const vector<pair<int,int>>& edges)` returning adjacency list with both directions added.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> buildUndirected(int n, const vector<pair<int,int>>& edges) {
  vector<vector<int>> g(n);
  // TODO: add both directions for each edge
  return g;
}

int main() {
  vector<pair<int,int>> e = {{0,1},{1,2}};
  auto g = buildUndirected(3, e);
  cout << g[1].size() << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> buildUndirected(int n, const vector<pair<int,int>>& edges) {
  vector<vector<int>> g(n);
  for (auto [u, v] : edges) {
    g[u].push_back(v);
    g[v].push_back(u);
  }
  return g;
}

int main() {
  vector<pair<int,int>> e = {{0,1},{1,2}};
  auto g = buildUndirected(3, e);
  cout << g[1].size() << endl;
  return 0;
}`,
          tests: [
            { id: 1, label: "Pushes to g[u]", keywords: ["g[u].push_back", "g[u].push_back(v)"] },
            { id: 2, label: "Pushes reverse edge", keywords: ["g[v].push_back", "g[v].push_back(u)"] },
          ],
        },
      },
      {
        id: "dsa-13",
        title: "Coin Change DP",
        xp: 20,
        chapterTitle: "Graphs & Advanced DP",
        theory: [
          text("**Coin change (min coins)**: `dp[a]` = minimum coins to make amount `a`. For each coin c, relax `dp[a] = min(dp[a], dp[a-c]+1)` when `a >= c`."),
          text("Initialize `dp[0]=0` and other entries to a large sentinel. Answer is `dp[amount]` if finite.", {
            label: "Bottom-up coin change",
            content: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int coinChange(const vector<int>& coins, int amount) {
  const int INF = 1e9;
  vector<int> dp(amount + 1, INF);
  dp[0] = 0;
  for (int a = 1; a <= amount; ++a) {
    for (int c : coins) {
      if (a >= c) dp[a] = min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] == INF ? -1 : dp[amount];
}`,
          }),
          callout("warning", "Greedy coin picking fails for some denominations (e.g. coins 1, 3, 4, amount 6). DP handles all cases."),
          quiz("What does dp[a] usually represent in coin change?", ["Number of coins to form amount a", "Number of ways only", "Largest coin used", "Graph distance"], 0, "We minimize the coin count for each amount."),
        ],
        challenge: {
          title: "Minimum coins",
          description: "Return minimum coins to make `amount`, or -1 if impossible. Coins are unlimited supply.",
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int coinChange(const vector<int>& coins, int amount) {
  // TODO: 1D DP
  return -1;
}

int main() {
  vector<int> coins = {1, 2, 5};
  cout << coinChange(coins, 11) << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int coinChange(const vector<int>& coins, int amount) {
  const int INF = 1e9;
  vector<int> dp(amount + 1, INF);
  dp[0] = 0;
  for (int a = 1; a <= amount; ++a) {
    for (int c : coins) {
      if (a >= c) dp[a] = min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] == INF ? -1 : dp[amount];
}

int main() {
  vector<int> coins = {1, 2, 5};
  cout << coinChange(coins, 11) << endl;
  return 0;
}`,
          tests: [
            { id: 1, label: "Uses dp array", keywords: ["vector<int> dp", "dp["] },
            { id: 2, label: "Min relaxation", keywords: ["min(", "dp[a - c]"] },
            { id: 3, label: "Handles impossible", keywords: ["-1", "INF"] },
          ],
        },
      },
      {
        id: "dsa-14",
        title: "Longest Common Subsequence",
        xp: 20,
        chapterTitle: "Graphs & Advanced DP",
        theory: [
          text("**LCS**: For strings `s` and `t`, `dp[i][j]` is LCS length of prefixes `s[0..i-1]` and `t[0..j-1]`. Match: `dp[i][j]=dp[i-1][j-1]+1`. Mismatch: max of skip one char."),
          text("Fill a `(m+1) x (n+1)` table. Answer at `dp[m][n]`.", {
            label: "LCS table fill",
            content: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int lcs(const string& s, const string& t) {
  int m = s.size(), n = t.size();
  vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
  for (int i = 1; i <= m; ++i) {
    for (int j = 1; j <= n; ++j) {
      if (s[i-1] == t[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}`,
          }),
          diagram("LCS recurrence", [
            { id: "match", label: "Chars match", color: ACCENT, items: ["Diagonal + 1", "Extend subsequence"] },
            { id: "skip", label: "Mismatch", color: "#f59e0b", items: ["max(up, left)", "Drop one char"] },
          ]),
          quiz("When s[i]==t[j], which cell contributes to dp[i][j]?", ["dp[i-1][j-1]", "dp[i][j-1] only", "dp[i-1][j] only", "dp[0][0]"], 0, "Matching characters extend the diagonal subproblem."),
        ],
        challenge: {
          title: "LCS length",
          description: "Return length of longest common subsequence of two strings.",
          starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int lcs(const string& s, const string& t) {
  // TODO: 2D DP
  return 0;
}

int main() {
  cout << lcs("abcde", "ace") << endl;
  return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int lcs(const string& s, const string& t) {
  int m = s.size(), n = t.size();
  vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
  for (int i = 1; i <= m; ++i) {
    for (int j = 1; j <= n; ++j) {
      if (s[i-1] == t[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}

int main() {
  cout << lcs("abcde", "ace") << endl;
  return 0;
}`,
          tests: [
            { id: 1, label: "2D dp table", keywords: ["vector<vector<int>>", "dp["] },
            { id: 2, label: "Match branch", keywords: ["dp[i-1][j-1]", "=="] },
            { id: 3, label: "max on mismatch", keywords: ["max("] },
          ],
        },
      },
    ],
  },
];

export const DSA_CPP_CHAPTERS = applyChapterEnhancements(RAW_DSA_CPP_CHAPTERS);

export const DSA_CPP_LESSONS = DSA_CPP_CHAPTERS.flatMap((c) =>
  c.lessons.map((l) => ({ ...l, chapterId: c.id, chapterTitle: c.title })),
);

export const DSA_CPP_TOTAL_XP = DSA_CPP_LESSONS.reduce((s, l) => s + (l.xp || 0), 0);

export default DSA_CPP_CHAPTERS;
