// STL Curriculum – Beginner → Advanced

function text(content) {
  return { type: "text", content };
}

function code(label, content) {
  return { type: "code", lang: "cpp", label, content };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

export const CHAPTERS = [
  {
    id: "containers",
    title: "Containers",
    icon: "📦",
    color: "#60a5fa",
    lessons: [
      {
        id: "containers-1",
        title: "Vector Basics",
        xp: 10,
        theory: [
          text(
            "Vectors are dynamic arrays that provide contiguous storage and automatic resizing. They are the most commonly used container in C++ STL.",
          ),
          callout(
            "info",
            "Vectors store elements in a contiguous block, allowing fast random access via operator[].",
          ),
          code(
            "Vector example",
            `#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    v.push_back(4);
    for (int x : v) cout << x << ' ';
    cout << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Vector Sum",
          description: "Write a function that returns the sum of all elements in a vector<int>.",
          starterCode: `#include <vector>
#include <iostream>
using namespace std;

int sumVector(const vector<int>& v) {
    // TODO
}

int main() {
    vector<int> nums = {1, 2, 3, 4};
    cout << sumVector(nums) << endl; // 10
    return 0;
}`,
          solutionCode: `#include <vector>
#include <iostream>
using namespace std;

int sumVector(const vector<int>& v) {
    int total = 0;
    for (int n : v) total += n;
    return total;
}

int main() {
    vector<int> nums = {1, 2, 3, 4};
    cout << sumVector(nums) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "sumVector returns 10 for {1,2,3,4}", keywords: [{ pattern: "int\\s+sumVector\\s*\\(" }, { pattern: "\\+=|accumulate\\s*\\(" }] },
          ],
        },
      },
      {
        id: "containers-2",
        title: "Vector capacity & modifiers",
        xp: 10,
        theory: [
          text(
            "Learn about size, capacity, reserve, resize, erase and insert operations that control a vector's storage and elements.",
          ),
          callout(
            "tip",
            "Use `reserve()` to avoid repeated reallocations when you know the final size.",
          ),
          code(
            "Reserve example",
            `#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v;
    v.reserve(100);
    for (int i = 0; i < 100; ++i) v.push_back(i);
    cout << v.size() << ' ' << v.capacity() << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Ensure capacity",
          description: "Create a vector and reserve capacity for N elements, then push N elements and verify capacity >= N.",
          starterCode: `#include <vector>
using namespace std;

int main() {
    int N = 50;
    vector<int> v;
    // TODO: reserve and push N items
    return 0;
}`,
          solutionCode: `#include <vector>
#include <iostream>
using namespace std;

int main() {
    int N = 50;
    vector<int> v;
    v.reserve(N);
    for (int i = 0; i < N; ++i) v.push_back(i);
    if ((int)v.capacity() >= N) cout << 0; else cout << 1;
    return 0;
}`,
          tests: [
            { id: 1, label: "Capacity >= N after reserve", keywords: [{ pattern: "\\.reserve\\s*\\(" }, { pattern: "\\.capacity\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "containers-3",
        title: "Sequence containers: deque & list",
        xp: 10,
        theory: [
          text(
            "Understand when to use `deque` and `list` vs `vector` — tradeoffs for insertion, deletion, and random access.",
          ),
          callout(
            "info",
            "`deque` offers fast push/pop at both ends; `list` offers splice and constant-time insert/remove when you have an iterator.",
          ),
        ],
        challenge: {
          title: "Use deque push/pop",
          description: "Use a `deque<int>` to push elements at both ends and then pop them in order.",
          starterCode: `#include <deque>
using namespace std;

int main() {
    deque<int> d;
    // TODO
    return 0;
}`,
          solutionCode: `#include <deque>
#include <iostream>
using namespace std;

int main() {
    deque<int> d;
    d.push_back(1); d.push_front(0); d.push_back(2);
    while (!d.empty()) { cout << d.front() << ' '; d.pop_front(); }
    return 0;
}`,
          tests: [
            { id: 1, label: "Deque outputs sequence 0 1 2", keywords: [{ pattern: "deque\\s*<" }, { pattern: "push_front\\s*\\(" }, { pattern: "push_back\\s*\\(" }] },
          ],
        },
      },
    ],
  },
  {
    id: "iterators",
    title: "Iterators",
    icon: "🔁",
    color: "#f59e0b",
    lessons: [
      {
        id: "iterators-1",
        title: "Iterator Basics",
        xp: 10,
        theory: [
          text(
            "Iterators provide a uniform way to traverse containers. They behave like pointers and support operations such as ++, --, *, ->.",
          ),
          callout(
            "tip",
            "Use range-based for loops for simplicity, but iterators are essential for generic algorithms.",
          ),
          code(
            "Iterator example",
            `#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    for (auto it = v.begin(); it != v.end(); ++it) {
        cout << *it << ' ';
    }
    cout << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Iterator Sum",
          description: "Use an iterator to compute the sum of a vector<int>.",
          starterCode: `#include <vector>
#include <iostream>
using namespace std;

int sumVectorIter(const vector<int>& v) {
    // TODO
}

int main() {
    vector<int> nums = {5, 5, 5};
    cout << sumVectorIter(nums) << endl; // 15
    return 0;
}`,
          solutionCode: `#include <vector>
#include <iostream>
using namespace std;

int sumVectorIter(const vector<int>& v) {
    int total = 0;
    for (auto it = v.begin(); it != v.end(); ++it) total += *it;
    return total;
}

int main() {
    vector<int> nums = {5, 5, 5};
    cout << sumVectorIter(nums) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "sumVectorIter returns 15 for {5,5,5}", keywords: [{ pattern: "int\\s+sumVectorIter\\s*\\(" }, { pattern: "\\.begin\\s*\\(\\s*\\)" }, { pattern: "\\+=\\s*\\*\\s*\\w+|accumulate\\s*\\(" }] },
          ],
        },
      },
      {
        id: "iterators-2",
        title: "Iterator categories & invalidation",
        xp: 10,
        theory: [
          text(
            "Learn about input, forward, bidirectional and random-access iterators and when iterator invalidation occurs.",
          ),
          callout(
            "tip",
            "Modifying a container (e.g. push_back) may invalidate iterators — be careful when mutating while iterating.",
          ),
        ],
        challenge: {
          title: "Detect invalidation",
          description: "Demonstrate that `push_back` can invalidate iterators for vector by comparing addresses before and after.",
          starterCode: `#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v = {1,2,3};
    // TODO: show before/after pointer differences
    return 0;
}`,
          solutionCode: `#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v = {1,2,3};
    auto p = &v[0];
    v.push_back(4);
    auto q = &v[0];
    cout << (p == q) << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Pointer may change after push_back", keywords: [{ pattern: "&\\s*\\w+\\s*\\[\\s*0\\s*\\]|\\.data\\s*\\(\\s*\\)" }, { pattern: "push_back\\s*\\(" }, { pattern: "\\w+\\s*(==|!=)\\s*\\w+" }] },
          ],
        },
      },
      {
        id: "iterators-3",
        title: "Reverse & insert iterators",
        xp: 10,
        theory: [
          text(
            "Use `reverse_iterator`, `inserter`, and `back_inserter` to adapt iterators for algorithms and reversed traversal.",
          ),
        ],
        challenge: {
          title: "Reverse copy",
          description: "Copy a vector into another in reverse order using reverse iterators.",
          starterCode: `#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {1,2,3};
    vector<int> b;
    // TODO: copy reversed
    return 0;
}`,
          solutionCode: `#include <vector>
#include <algorithm>
#include <iterator>
#include <iostream>
using namespace std;

int main() {
    vector<int> a = {1,2,3};
    vector<int> b;
    copy(a.rbegin(), a.rend(), back_inserter(b));
    for (int x : b) cout << x << ' ';
    return 0;
}`,
          tests: [
            { id: 1, label: "b is reversed copy of a", keywords: [{ pattern: "rbegin\\s*\\(|reverse\\s*\\(" }, { pattern: "back_inserter\\s*\\(|copy\\s*\\(|assign\\s*\\(" }] },
          ],
        },
      },
    ],
  },
  {
    id: "algorithms",
    title: "Algorithms",
    icon: "⚙️",
    color: "#f59e0b",
    lessons: [
      {
        id: "algorithms-1",
        title: "Sorting with std::sort",
        xp: 15,
        theory: [
          text(
            "std::sort sorts a range in ascending order using introsort. It requires random-access iterators.",
          ),
          callout(
            "info",
            "You can provide a custom comparator to sort in descending order or by a key.",
          ),
          code(
            "Sort example",
            `#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end());
    for (int x : v) cout << x << ' ';
    cout << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Custom Sort",
          description: "Sort a vector of strings by length using a lambda comparator.",
          starterCode: `#include <vector>
#include <algorithm>
#include <string>
#include <iostream>
using namespace std;

int main() {
    vector<string> words = {"apple", "pie", "banana"};
    // TODO: sort by length
    for (const auto& w : words) cout << w << ' ';
    cout << endl;
    return 0;
}`,
          solutionCode: `#include <vector>
#include <algorithm>
#include <string>
#include <iostream>
using namespace std;

int main() {
    vector<string> words = {"apple", "pie", "banana"};
    sort(words.begin(), words.end(), [](const string& a, const string& b) {
        return a.size() < b.size();
    });
    for (const auto& w : words) cout << w << ' ';
    cout << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "words sorted by length", keywords: [{ pattern: "sort\\s*\\(" }, { pattern: "\\.(size|length)\\s*\\(\\s*\\)\\s*[<>]" }] },
          ],
        },
      },
      {
        id: "algorithms-2",
        title: "Searching: find, binary_search",
        xp: 10,
        theory: [
          text(
            "Use `std::find` for linear search and `std::binary_search` for sorted ranges. Know when to sort first.",
          ),
        ],
        challenge: {
          title: "Find element",
          description: "Return whether a value exists in a vector using `std::find`.",
          starterCode: `#include <vector>
#include <algorithm>
using namespace std;

bool contains(const vector<int>& v, int x) {
    // TODO
}
`,
          solutionCode: `#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

bool contains(const vector<int>& v, int x) {
    return find(v.begin(), v.end(), x) != v.end();
}

int main() {
    vector<int> v = {1,2,3};
    cout << contains(v,2);
    return 0;
}`,
          tests: [
            { id: 1, label: "contains returns true for existing element", keywords: [{ pattern: "bool\\s+contains\\s*\\(" }, { pattern: "\\bfind\\s*\\(|binary_search\\s*\\(|\\bcount\\s*\\(" }] },
          ],
        },
      },
      {
        id: "algorithms-3",
        title: "Transform & accumulate",
        xp: 10,
        theory: [
          text(
            "`std::transform` applies a function across a range and `std::accumulate` reduces values — useful for functional-style processing.",
          ),
        ],
        challenge: {
          title: "Square & sum",
          description: "Square each element with `transform` and sum with `accumulate`.",
          starterCode: `#include <vector>
#include <numeric>
using namespace std;

int squareSum(const vector<int>& v) {
    // TODO
}
`,
          solutionCode: `#include <vector>
#include <numeric>
#include <algorithm>
#include <iostream>
using namespace std;

int squareSum(const vector<int>& v) {
    vector<int> tmp;
    tmp.reserve(v.size());
    transform(v.begin(), v.end(), back_inserter(tmp), [](int x){ return x*x; });
    return accumulate(tmp.begin(), tmp.end(), 0);
}

int main() {
    cout << squareSum({1,2,3});
    return 0;
}`,
          tests: [
            { id: 1, label: "squareSum returns 14 for {1,2,3}", keywords: [{ pattern: "int\\s+squareSum\\s*\\(" }, { pattern: "transform\\s*\\(|\\w+\\s*\\*\\s*\\w+" }, { pattern: "accumulate\\s*\\(|\\+=" }] },
          ],
        },
      },
    ],
  },
  {
    id: "functors",
    title: "Functors & Lambdas",
    icon: "🧠",
    color: "#7c3aed",
    lessons: [
      {
        id: "functors-1",
        title: "Functor Example",
        xp: 15,
        theory: [
          text(
            "Functors are objects that overload operator() and can be used where a function is expected. They are useful for stateful callbacks.",
          ),
          callout(
            "info",
            "Functors can capture state, unlike plain functions.",
          ),
          code(
            "Functor example",
            `#include <iostream>
using namespace std;

struct Adder {
    int addend;
    Adder(int a) : addend(a) {}
    int operator()(int x) const { return x + addend; }
};

int main() {
    Adder add5(5);
    cout << add5(10) << endl; // 15
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Stateful Counter",
          description: "Create a functor that counts how many times it has been called.",
          starterCode: `#include <iostream>
using namespace std;

struct Counter {
    int count = 0;
    int operator()() {
        // TODO
    }
};

int main() {
    Counter c;
    cout << c() << ' ' << c() << ' ' << c() << endl; // 0 1 2
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Counter {
    int count = 0;
    int operator()() {
        return count++;
    }
};

int main() {
    Counter c;
    cout << c() << ' ' << c() << ' ' << c() << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Counter outputs 0 1 2", keywords: [{ pattern: "(struct|class)\\s+Counter\\b" }, { pattern: "operator\\s*\\(\\s*\\)\\s*\\(" }, { pattern: "\\+\\+" }] },
          ],
        },
      },
      {
        id: "functors-2",
        title: "Lambdas deep dive",
        xp: 15,
        theory: [
          text(
            "Lambdas provide inline anonymous functions and can capture local variables by value or reference.",
          ),
        ],
        challenge: {
          title: "Use lambda in sort",
          description: "Sort a vector of pairs by second element using a lambda comparator.",
          starterCode: `#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int,int>> v = {{1,3},{2,1}};
    // TODO: sort by second
    return 0;
}`,
          solutionCode: `#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

int main() {
    vector<pair<int,int>> v = {{1,3},{2,1}};
    sort(v.begin(), v.end(), [](const pair<int,int>& a, const pair<int,int>& b){ return a.second < b.second; });
    for (auto &p : v) cout << p.first << ':' << p.second << ' ';
    return 0;
}`,
          tests: [
            { id: 1, label: "Pairs sorted by second element", keywords: [{ pattern: "sort\\s*\\(" }, { pattern: "\\.second\\s*[<>]" }] },
          ],
        },
      },
    ],
  },
  {
    id: "adapters",
    title: "Adapters",
    icon: "🔌",
    color: "#60a5fa",
    lessons: [
      {
        id: "adapters-1",
        title: "Stack and Queue Adapters",
        xp: 10,
        theory: [
          text(
            "The STL provides adapter containers such as stack, queue, and priority_queue that wrap underlying containers.",
          ),
          callout(
            "info",
            "By default, stack uses deque as the underlying container.",
          ),
          code(
            "Stack example",
            `#include <stack>
#include <iostream>
using namespace std;

int main() {
    stack<int> s;
    s.push(1); s.push(2); s.push(3);
    while (!s.empty()) {
        cout << s.top() << ' ';
        s.pop();
    }
    cout << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Queue Reverse",
          description: "Implement a function that reverses the order of elements in a queue<int> using a stack.",
          starterCode: `#include <queue>
#include <stack>
#include <iostream>
using namespace std;

queue<int> reverseQueue(queue<int> q) {
    // TODO
}

int main() {
    queue<int> q;
    q.push(1); q.push(2); q.push(3);
    queue<int> rev = reverseQueue(q);
    while (!rev.empty()) {
        cout << rev.front() << ' ';
        rev.pop();
    }
    cout << endl;
    return 0;
}`,
          solutionCode: `#include <queue>
#include <stack>
#include <iostream>
using namespace std;

queue<int> reverseQueue(queue<int> q) {
    stack<int> s;
    while (!q.empty()) {
        s.push(q.front());
        q.pop();
    }
    while (!s.empty()) {
        q.push(s.top());
        s.pop();
    }
    return q;
}

int main() {
    queue<int> q;
    q.push(1); q.push(2); q.push(3);
    queue<int> rev = reverseQueue(q);
    while (!rev.empty()) {
        cout << rev.front() << ' ';
        rev.pop();
    }
    cout << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Queue reversed", keywords: [{ pattern: "stack\\s*<" }, { pattern: "\\.top\\s*\\(\\s*\\)" }, { pattern: "\\.push\\s*\\(" }] },
          ],
        },
      },
      {
        id: "adapters-2",
        title: "Priority queue and custom comparators",
        xp: 10,
        theory: [
          text(
            "Use `priority_queue` for efficient top-N behavior and provide comparators for custom ordering.",
          ),
        ],
        challenge: {
          title: "Top scores",
          description: "Use `priority_queue` to keep the top 3 values from a stream.",
          starterCode: `#include <queue>
#include <vector>
using namespace std;

int main() {
    vector<int> data = {5,1,9,3,7};
    // TODO
    return 0;
}`,
          solutionCode: `#include <queue>
#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> data = {5,1,9,3,7};
    priority_queue<int> pq(data.begin(), data.end());
    for (int i = 0; i < 3 && !pq.empty(); ++i) { cout << pq.top() << ' '; pq.pop(); }
    return 0;
}`,
          tests: [
            { id: 1, label: "Top 3 values printed", keywords: [{ pattern: "priority_queue\\s*<" }, { pattern: "\\.top\\s*\\(\\s*\\)" }, { pattern: "\\.pop\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "allocators",
    title: "Allocators",
    icon: "⚙️",
    color: "#f59e0b",
    lessons: [
      {
        id: "allocators-1",
        title: "Custom Allocator (simple)",
        xp: 10,
        theory: [
          text(
            "Allocators control memory allocation for containers. The default allocator uses new/delete.",
          ),
          callout(
            "tip",
            "Custom allocators are advanced; most users rely on the default.",
          ),
          code(
            "Allocator example",
            `#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v(5); // uses default allocator
    for (int i = 0; i < 5; ++i) v[i] = i;
    for (int x : v) cout << x << ' ';
    cout << endl;
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Vector Size Check",
          description: "Create a vector<int> of size 10 and verify its size.",
          starterCode: `#include <vector>
using namespace std;

int main() {
    vector<int> v(10);
    // TODO: check size
    return 0;
}`,
          solutionCode: `#include <vector>
using namespace std;

int main() {
    vector<int> v(10);
    if (v.size() == 10) return 0; else return 1;
}`,
          tests: [
            { id: 1, label: "Vector size is 10", keywords: [{ pattern: "vector\\s*<\\s*int\\s*>\\s*\\w+\\s*\\(\\s*10\\s*\\)|\\.resize\\s*\\(\\s*10\\s*\\)" }, { pattern: "\\.size\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "allocators-2",
        title: "Allocator use-cases",
        xp: 10,
        theory: [
          text(
            "When to consider custom allocators: performance-critical systems, pooling, or special memory regions.",
          ),
        ],
        challenge: {
          title: "Allocator thought exercise",
          description: "Describe a scenario where a custom allocator would help (written answer).",
          starterCode: null,
          solutionCode: null,
          tests: [],
        },
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced STL",
    icon: "🚀",
    color: "#14b8a6",
    lessons: [
      {
        id: "advanced-1",
        title: "Move Semantics with Containers",
        xp: 20,
        theory: [
          text(
            "Move semantics allow efficient transfer of resources. Containers support move constructors and move assignment.",
          ),
          callout(
            "info",
            "Use std::move to transfer ownership.",
          ),
          code(
            "Move example",
            `#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> a = {1, 2, 3};
    vector<int> b = move(a); // a is now empty
    cout << b.size() << endl; // 3
    return 0;
}`,
          ),
        ],
        challenge: {
          title: "Move Vector",
          description: "Move a vector<int> into another and verify the source is empty.",
          starterCode: `#include <vector>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3};
    vector<int> dst = move(src);
    // TODO: check src empty
    return 0;
}`,
          solutionCode: `#include <vector>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3};
    vector<int> dst = move(src);
    if (src.empty() && dst.size() == 3) return 0; else return 1;
}`,
          tests: [
            { id: 1, label: "Source empty after move", keywords: [{ pattern: "\\bmove\\s*\\(" }, { pattern: "\\.empty\\s*\\(\\s*\\)" }] },
          ],
        },
      },
      {
        id: "advanced-2",
        title: "Iterator invalidation & performance",
        xp: 15,
        theory: [
          text(
            "Practical performance tips: avoid unnecessary copies, prefer emplace_back, and understand iterator invalidation patterns.",
          ),
        ],
        challenge: {
          title: "Emplace vs push",
          description: "Show using emplace_back constructs in-place to avoid extra copies for a simple struct.",
          starterCode: `#include <vector>
#include <string>
using namespace std;

struct Item { Item(string s){} };

int main() {
    vector<Item> v;
    // TODO: emplace vs push
    return 0;
}`,
          solutionCode: `#include <vector>
#include <string>
#include <iostream>
using namespace std;

struct Item { Item(string s){ cout << "constructed\\n"; } };

int main() {
    vector<Item> v;
    v.emplace_back("a");
    v.push_back(Item("b"));
    return 0;
}`,
          tests: [
            { id: 1, label: "Demonstrate construction messages", keywords: [{ pattern: "emplace_back\\s*\\(" }, { pattern: "push_back\\s*\\(" }, { pattern: "cout\\s*<<" }] },
          ],
        },
      },
    ],
  },
];

const CHAPTERS_WITH_META = CHAPTERS.map((chapter) => ({
  ...chapter,
  lessons: chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
  })),
}));

export const ALL_LESSONS = CHAPTERS_WITH_META.flatMap((ch) => ch.lessons);
export const TOTAL_XP = ALL_LESSONS.reduce((sum, lesson) => sum + (lesson.xp || 0), 0);
export default CHAPTERS_WITH_META;
