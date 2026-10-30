/** Per-lesson objectives, scenarios, and callouts merged into Pandas curriculum at build time. */

export const LESSON_ENHANCEMENTS = {
  "pandas-0": {
    objectives: [
      "Import `pandas` as `pd`",
      "Create a simple `DataFrame` with named columns",
      "Explain when Pandas is the right tool for tabular data",
    ],
    scenario:
      "You export a spreadsheet of student scores and need a labeled table you can filter and summarize — that starts with a DataFrame.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Standard import: `import pandas as pd`. The nickname `pd` is universal — same idea as `np` for NumPy.",
      },
    ],
    append: [
      {
        type: "text",
        content:
          "A DataFrame is a table of columns that share one row index. Each column is a **Series** — you'll use both objects throughout this course.",
        code: {
          lang: "python",
          label: "Quick sales snapshot",
          content: `import pandas as pd

sales = pd.DataFrame({
    "product": ["Pen", "Notebook"],
    "units": [120, 45],
    "price": [1.5, 4.0],
})
print(sales)
print(sales.dtypes)`,
        },
      },
      {
        type: "quiz",
        question: "What does `import pandas as pd` give you?",
        options: [
          "A faster Python interpreter",
          "Access to tabular data tools under the name pd",
          "A CSV file on disk",
          "A plotting library only",
        ],
        answer: 1,
        explanation: "pd is the conventional alias for the pandas module.",
      },
    ],
  },
  "pandas-1": {
    objectives: [
      "Contrast a Series (one column) with a DataFrame (full table)",
      "Create each structure and read its shape",
      "Select a column from a DataFrame as a Series",
    ],
    scenario:
      "HR sends one column of salaries (Series) and a full employee roster (DataFrame) — you need to know which object you're holding.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "Rule of thumb: **Series = one column**, **DataFrame = many columns sharing the same row labels**.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Column extraction returns a Series",
        content: `import pandas as pd

df = pd.DataFrame(
    {"name": ["Ali", "Sara"], "score": [88, 95]},
    index=["row_a", "row_b"],
)
math_col = df["score"]  # Series
print(type(math_col), math_col.shape)`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "A DataFrame is internally a dict of column-name → Series, all aligned on the same index.",
      },
    ],
  },
  "pandas-2": {
    objectives: [
      "Build a Series from lists, dicts, or explicit index labels",
      "Access values by label with bracket notation",
      "Inspect raw values with `.values`",
    ],
    scenario:
      "Daily temperature readings arrive as a dict keyed by weekday — you turn them into a labeled Series for plotting.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Three ways to create a Series",
        content: `import pandas as pd

from_list = pd.Series([10, 20, 30])
from_dict = pd.Series({"Mon": 18, "Tue": 22})
custom = pd.Series([1, 2], index=["x", "y"])

print(from_list.index)
print(from_dict["Tue"])`,
      },
      {
        type: "quiz",
        question: "What does `pd.Series([1,2,3])` use as index labels by default?",
        options: ["a, b, c", "0, 1, 2", "No index", "Column names"],
        answer: 1,
        explanation: "Integer positions 0, 1, 2 … are assigned automatically.",
      },
    ],
  },
  "from-list": {
    objectives: [
      "Create a Series from a plain Python list",
      "Understand the default RangeIndex (0, 1, 2 …)",
      "Predict output before running vectorized ops",
    ],
    scenario:
      "A sensor logs hourly readings as a list — you wrap it in a Series so Pandas math applies to every value at once.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content: "`pd.Series([1, 2, 3])` is the fastest way to turn a list into labeled data.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "List → Series",
        content: `import pandas as pd

readings = [98.6, 99.1, 97.8, 98.2]
temps = pd.Series(readings)
print(temps)
print(temps.index)  # RangeIndex(start=0, stop=4)`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "The list order becomes row order — index 0 is the first reading, index 1 the second, and so on.",
      },
    ],
  },
  "from-dict": {
    objectives: [
      "Create a Series from a dictionary",
      "Know that dict keys become index labels",
      "Access values by key label",
    ],
    scenario:
      "Stock prices arrive as `{ticker: price}` — a dict-backed Series lets you look up any symbol by name.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Dict keys → index",
        content: `import pandas as pd

prices = pd.Series({"AAPL": 182.5, "MSFT": 410.0, "GOOG": 175.2})
print(prices["MSFT"])
print(prices.index.tolist())`,
      },
      {
        type: "quiz",
        question: "When building `pd.Series({'a': 1, 'b': 2})`, what is the index?",
        options: ["0 and 1", "a and b", "Values 1 and 2", "No index"],
        answer: 1,
        explanation: "Dictionary keys become the Series index labels.",
      },
    ],
  },
  "custom-index": {
    objectives: [
      "Pass an explicit `index=` when creating a Series",
      "Use meaningful labels instead of integers",
      "Align data by label in later operations",
    ],
    scenario:
      "Sales reps are identified by name, not row number — custom index labels make reports readable.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "Index labels must be unique unless you intentionally want duplicate labels (rare).",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Named index on a Series",
        content: `import pandas as pd

sales = pd.Series(
    [120, 95, 140],
    index=["Ali", "Sara", "Mo"],
)
print(sales["Sara"])
print(sales.loc["Mo"])`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Meaningful index labels pay off when merging tables or joining on names instead of positions.",
      },
    ],
  },
  "pandas-3": {
    objectives: [
      "Apply scalar math to every element in a Series",
      "Combine two Series with aligned index labels",
      "Understand that mismatched labels produce NaN",
    ],
    scenario:
      "You add a 10% bonus to every salesperson's commission Series and combine regional totals.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Scalar and Series math",
        content: `import pandas as pd

base = pd.Series([100, 200], index=["A", "B"])
bonus = base * 0.10
total = base + bonus
print(total)`,
      },
      {
        type: "quiz",
        question: "What does Pandas do when adding Series with different index labels?",
        options: [
          "Raises an error always",
          "Aligns by label; missing labels become NaN",
          "Ignores labels and uses position only",
          "Drops the shorter Series",
        ],
        answer: 1,
        explanation: "Label alignment is a core Pandas feature — unmatched labels → NaN.",
      },
    ],
  },
  "series-ops": {
    objectives: [
      "Add, subtract, multiply, and divide Series element-wise",
      "Compare Series to produce boolean masks",
      "Chain vectorized ops instead of Python loops",
    ],
    scenario:
      "Revenue minus cost per product line — two Series aligned by product name give profit in one expression.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "Vectorized ops run in optimized C code — avoid `for` loops over Series values when possible.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Profit = revenue - cost",
        content: `import pandas as pd

revenue = pd.Series([500, 300], index=["Widget", "Gadget"])
cost = pd.Series([200, 150], index=["Widget", "Gadget"])
profit = revenue - cost
high = profit > 100
print(profit)
print(high)`,
      },
      {
        type: "callout",
        variant: "tip",
        content: "Boolean Series (`profit > 100`) are the building blocks for filtering DataFrames later.",
      },
    ],
  },
  "pandas-4": {
    objectives: [
      "Compute sum, mean, max, and min on a Series",
      "Use `.describe()` for a full numeric summary",
      "Know that NaN values are skipped by default",
    ],
    scenario:
      "A manager asks for average, best, and worst quiz scores from a class Series — one `.describe()` call answers all three.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Aggregation methods",
        content: `import pandas as pd

scores = pd.Series([70, 85, 90, None, 78])
print(scores.mean())       # skips NaN
print(scores.max())
print(scores.describe())`,
      },
      {
        type: "quiz",
        question: "Does `.mean()` include NaN values in the calculation?",
        options: [
          "Yes — NaN counts as zero",
          "No — NaN values are skipped",
          "It raises an error",
          "Only for strings",
        ],
        answer: 1,
        explanation: "Aggregation methods skip NaN by default.",
      },
    ],
  },
  "pandas-5": {
    objectives: [
      "Build a DataFrame from a dict of lists",
      "Verify all columns have equal length",
      "Inspect shape and column names after creation",
    ],
    scenario:
      "You receive JSON-like column data from an API — dict-of-lists is the most common DataFrame constructor.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Dict of lists → DataFrame",
        content: `import pandas as pd

df = pd.DataFrame({
    "city": ["London", "Paris", "Berlin"],
    "pop_m": [9.0, 2.1, 3.6],
})
print(df.shape)
print(df.columns.tolist())`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "All lists must be the same length — mismatched lengths raise `ValueError`.",
      },
    ],
  },
  "dict-of-lists": {
    objectives: [
      "Map each dict key to a column name",
      "Pass equal-length lists as column values",
      "Recognize this as the read_csv internal structure",
    ],
    scenario:
      "CSV files are column-oriented on disk — `pd.read_csv` ultimately builds the same dict-of-lists structure.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          'This pattern mirrors `{"col_a": [v1, v2], "col_b": [v1, v2]}` — the most common DataFrame constructor.',
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Column-oriented build",
        content: `import pandas as pd

# Same structure pd.read_csv produces internally
data = {
    "name": ["Ann", "Bob", "Cara"],
    "score": [88, 76, 91],
}
df = pd.DataFrame(data)
print(df)`,
      },
      {
        type: "quiz",
        question: "In `pd.DataFrame({'a': [1,2], 'b': [3,4]})`, how many rows?",
        options: ["1", "2", "4", "0"],
        answer: 1,
        explanation: "Each list has 2 elements → 2 rows, 2 columns.",
      },
    ],
  },
  "list-of-dicts": {
    objectives: [
      "Build a DataFrame from a list of row dictionaries",
      "Match this pattern to JSON API responses",
      "Let Pandas infer columns from dict keys",
    ],
    scenario:
      "A REST API returns `[{...}, {...}]` — one dict per row. This is the natural list-of-dicts pattern.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Row-oriented build (JSON style)",
        content: `import pandas as pd

rows = [
    {"name": "Ann", "dept": "IT", "salary": 70},
    {"name": "Bob", "dept": "HR", "salary": 55},
    {"name": "Cara", "dept": "IT", "salary": 80},
]
df = pd.DataFrame(rows)
print(df)`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Missing keys in some rows become NaN — Pandas unions all keys across dicts.",
      },
    ],
  },
  "pandas-6": {
    objectives: [
      "Preview data with `.head()` and `.tail()`",
      "Summarize structure with `.info()`",
      "Get numeric stats with `.describe()`",
    ],
    scenario:
      "You load a 50,000-row CSV — before any analysis, you peek at the first rows and check dtypes.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Exploration trio",
        content: `import pandas as pd

df = pd.DataFrame({
    "name": ["A", "B", "C", "D", "E"],
    "age": [20, 22, 19, 25, 21],
})
print(df.head(2))
print(df.describe())`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Make `.head()` + `.info()` your first habit on every new dataset — catch bad types early.",
      },
    ],
  },
  "pandas-7": {
    objectives: [
      "Select columns with bracket or dot notation",
      "Read dtypes with `.dtypes`",
      "Cast columns with `.astype()`",
    ],
    scenario:
      "Imported CSV stores prices as strings — you inspect dtypes and cast before calculating totals.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Select and cast",
        content: `import pandas as pd

df = pd.DataFrame({"price": ["10", "20"], "qty": [2, 3]})
df["price"] = df["price"].astype(float)
df["total"] = df["price"] * df["qty"]
print(df.dtypes)`,
      },
      {
        type: "quiz",
        question: "How do you select two columns at once?",
        options: ['df["a", "b"]', "df[[\"a\", \"b\"]]", "df.a.b", "df.select(a,b)"],
        answer: 1,
        explanation: "Double brackets pass a list of column names: df[['a', 'b']].",
      },
    ],
  },
  "pandas-8": {
    objectives: [
      "Select rows and cells with `.loc` by label",
      "Use inclusive label slices",
      "Select all rows with `:` for a column",
    ],
    scenario:
      "Your DataFrame uses employee names as the index — loc lets you grab one person's record by name.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "loc patterns",
        content: `import pandas as pd

df = pd.DataFrame(
    {"score": [88, 92, 75]},
    index=["Ali", "Sara", "Mo"],
)
print(df.loc["Ali", "score"])
print(df.loc["Ali":"Sara", "score"])  # inclusive`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "loc slices are **inclusive** on both ends — unlike standard Python slicing.",
      },
    ],
  },
  "pandas-9": {
    objectives: [
      "Select by integer position with `.iloc`",
      "Use 0-based row and column indices",
      "Remember iloc slices exclude the stop index",
    ],
    scenario:
      "After sorting a table, row positions change — iloc grabs the first row regardless of its label.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "iloc by position",
        content: `import pandas as pd

df = pd.DataFrame({"a": [10, 20, 30], "b": [1, 2, 3]})
print(df.iloc[0, 1])     # first row, second col
print(df.iloc[0:2, :])   # first two rows, all cols`,
      },
      {
        type: "quiz",
        question: "What does `df.iloc[0:2]` return?",
        options: ["Rows 0, 1, 2", "Rows 0 and 1 only", "Row 2 only", "All rows"],
        answer: 1,
        explanation: "iloc follows Python slice rules — stop index 2 is excluded.",
      },
    ],
  },
  "pandas-10": {
    objectives: [
      "Filter rows with boolean conditions",
      "Combine conditions with & and |",
      "Use `.isin()` for membership filters",
    ],
    scenario:
      "Marketing wants customers aged 25–40 who spent over $100 — boolean filtering makes that a one-liner.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Combined boolean filter",
        content: `import pandas as pd

df = pd.DataFrame({"age": [17, 25, 40, 55], "spent": [50, 120, 80, 200]})
target = df[(df["age"] >= 25) & (df["spent"] > 100)]
print(target)`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "Wrap each condition in parentheses when using `&` or `|` — Python operator precedence will bite you otherwise.",
      },
    ],
  },
  "pandas-11": {
    objectives: [
      "Detect missing values with `.isna()`",
      "Fill gaps with `.fillna()`",
      "Choose fill strategies appropriate to the column",
    ],
    scenario:
      "Survey responses have blank age fields — you detect NaNs and fill with the column median.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Detect and fill",
        content: `import pandas as pd
import numpy as np

s = pd.Series([10, np.nan, 30, np.nan])
print(s.isna().sum())
filled = s.fillna(s.mean())
print(filled)`,
      },
      {
        type: "quiz",
        question: "Which method counts missing values per column in a DataFrame?",
        options: [".missing()", ".isna().sum()", ".count()", ".null()"],
        answer: 1,
        explanation: "isna() returns booleans; sum() counts True values per column.",
      },
    ],
  },
  "pandas-12": {
    objectives: [
      "Drop rows or columns with `.dropna()`",
      "Cast types with `.astype()` after cleaning",
      "Use axis=0 for rows and axis=1 for columns",
    ],
    scenario:
      "A dataset has sparse columns — you drop columns that are mostly empty, then cast survivors to int.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "dropna then astype",
        content: `import pandas as pd

df = pd.DataFrame({"id": ["1", "2"], "val": ["10", None]})
clean = df.dropna()
clean["id"] = clean["id"].astype(int)
clean["val"] = clean["val"].astype(float)
print(clean.dtypes)`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Drop NaNs before casting to int — None/NaN blocks integer dtypes.",
      },
    ],
  },
  "dropna-rows": {
    objectives: [
      "Remove rows containing any NaN with `df.dropna()`",
      "Understand axis=0 is the default (rows)",
      "Know that dropna returns a new DataFrame by default",
    ],
    scenario:
      "Clinical trial rows with missing dosage must be excluded before computing averages.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content: "`df.dropna()` default `axis=0` drops **rows** with any NaN value.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Drop incomplete rows",
        content: `import pandas as pd

df = pd.DataFrame({
    "patient": ["A", "B", "C"],
    "dose": [10, None, 15],
})
complete = df.dropna()
print(complete)
print(len(df), "→", len(complete))`,
      },
      {
        type: "quiz",
        question: "What does `df.dropna()` remove by default?",
        options: [
          "Columns with NaN",
          "Rows with any NaN",
          "All NaN values in place",
          "Duplicate rows",
        ],
        answer: 1,
        explanation: "Default axis=0 targets rows containing at least one NaN.",
      },
    ],
  },
  "dropna-cols": {
    objectives: [
      "Drop columns containing NaN with `df.dropna(axis=1)`",
      "Choose row vs column axis deliberately",
      "Clean wide sparse tables efficiently",
    ],
    scenario:
      "A wide export has optional metadata columns that are 90% empty — drop those columns, keep the rows.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Drop sparse columns",
        content: `import pandas as pd

df = pd.DataFrame({
    "id": [1, 2, 3],
    "name": ["A", "B", "C"],
    "notes": [None, None, "ok"],  # mostly empty
})
trimmed = df.dropna(axis=1)
print(trimmed.columns.tolist())`,
      },
      {
        type: "callout",
        variant: "warning",
        content:
          "`axis=1` targets columns — easy to confuse with rows. Say aloud: axis 1 = vertical columns.",
      },
    ],
  },
  "pandas-13": {
    objectives: [
      "Add columns with assignment syntax",
      "Compute derived columns from existing ones",
      "Use `.assign()` for chainable non-mutating adds",
    ],
    scenario:
      "E-commerce data needs a `total` column (price × qty) before grouping by category.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Derived column",
        content: `import pandas as pd

df = pd.DataFrame({"price": [10, 20], "qty": [2, 3]})
df["total"] = df["price"] * df["qty"]
df["flagged"] = df["total"] > 25
print(df)`,
      },
      {
        type: "quiz",
        question: "Which adds a column without mutating the original?",
        options: [
          'df["x"] = 1',
          "df.assign(x=1)",
          "df.drop(x)",
          "df.copy()",
        ],
        answer: 1,
        explanation: "assign returns a new DataFrame; direct assignment mutates in place.",
      },
    ],
  },
  "pandas-14": {
    objectives: [
      "Split data with `.groupby()`",
      "Aggregate a column with `.sum()`, `.mean()`, etc.",
      "Reset index after groupby when you need a flat table",
    ],
    scenario:
      "Regional managers need total sales per city from a transaction log — groupby replaces manual loops.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Sales per city",
        content: `import pandas as pd

df = pd.DataFrame({
    "city": ["NYC", "NYC", "LA", "LA"],
    "sales": [100, 150, 80, 120],
})
by_city = df.groupby("city")["sales"].sum()
print(by_city)
print(by_city.reset_index())`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "Think **Split → Apply → Combine**: groupby splits, agg applies, result combines into one row per group.",
      },
    ],
  },
  "pandas-15": {
    objectives: [
      "Compute multiple stats at once with `.agg()`",
      "Pass a list of function names or a per-column dict",
      "Use named aggregation for readable output columns",
    ],
    scenario:
      "HR needs mean and max salary per department in one report — `.agg([\"mean\", \"max\"])` delivers both.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Multiple aggregations",
        content: `import pandas as pd

df = pd.DataFrame({
    "dept": ["IT", "IT", "HR"],
    "salary": [70, 90, 55],
})
stats = df.groupby("dept")["salary"].agg(["mean", "max", "count"])
print(stats)`,
      },
      {
        type: "quiz",
        question: "What does `.agg(['mean','max'])` return?",
        options: [
          "A single number",
          "A DataFrame with mean and max columns",
          "A list",
          "The original DataFrame",
        ],
        answer: 1,
        explanation: "Each function becomes its own column in the result.",
      },
    ],
  },
  "pandas-16": {
    objectives: [
      "Stack tables vertically with `pd.concat()`",
      "Use `ignore_index=True` to reset row numbers",
      "Concat horizontally with `axis=1` when needed",
    ],
    scenario:
      "Monthly sales files share the same columns — concat stacks them into one year-to-date table.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Stack monthly reports",
        content: `import pandas as pd

jan = pd.DataFrame({"product": ["A"], "sales": [100]})
feb = pd.DataFrame({"product": ["A"], "sales": [120]})
ytd = pd.concat([jan, feb], ignore_index=True)
print(ytd)`,
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Columns only in one DataFrame are filled with NaN in the other — concat is outer-aligned by default.",
      },
    ],
  },
  "pandas-17": {
    objectives: [
      "Join two tables with `pd.merge()` on a shared key",
      "Choose join type: inner, left, right, outer",
      "Handle different key column names with left_on/right_on",
    ],
    scenario:
      "Orders table + customers table share `customer_id` — merge attaches names to each order row.",
    append: [
      {
        type: "code",
        lang: "python",
        label: "Inner join on id",
        content: `import pandas as pd

orders = pd.DataFrame({"id": [1, 2], "item": ["book", "pen"]})
names = pd.DataFrame({"id": [1, 2], "customer": ["Ali", "Sara"]})
merged = pd.merge(orders, names, on="id")
print(merged)`,
      },
      {
        type: "quiz",
        question: "What does a left join (`how='left'`) keep?",
        options: [
          "Only matching rows",
          "All left rows; NaN where right has no match",
          "All right rows only",
          "No rows with NaN",
        ],
        answer: 1,
        explanation: "Left join preserves every row from the left DataFrame.",
      },
    ],
  },
  "pandas-18": {
    objectives: [
      "Load CSV data with `pd.read_csv()` conceptually",
      "Build equivalent DataFrames from dicts in the browser",
      "Use `usecols` and `sep` options when needed",
    ],
    scenario:
      "Every Monday you load a fresh CSV export — understanding read_csv options saves hours of cleanup.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "In PolyCode challenges, dict-based DataFrames stand in for `read_csv` — the resulting table is identical.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "read_csv equivalent in the browser",
        content: `import pandas as pd

# pd.read_csv("students.csv") with columns name, score:
df = pd.DataFrame({
    "name": ["Ali", "Sara"],
    "score": [90, 85],
})
print(df.head())
print(df.dtypes)`,
      },
      {
        type: "quiz",
        question: "Which argument loads only specific columns from a CSV?",
        options: ["cols=", "usecols=", "select=", "columns="],
        answer: 1,
        explanation: "usecols accepts column names or indices to load a subset.",
      },
    ],
  },
  "pandas-19": {
    objectives: [
      "Chain load → clean → group → export steps",
      "Preview CSV output with `to_csv(index=False)`",
      "Recall the core Pandas toolkit from this course",
    ],
    scenario:
      "End-of-quarter pipeline: load sales, drop bad rows, group by category, export a summary CSV for finance.",
    prepend: [
      {
        type: "callout",
        variant: "info",
        content:
          "You now have Series, DataFrames, selection, cleaning, groupby, merge, and I/O — the core data analyst toolkit.",
      },
    ],
    append: [
      {
        type: "code",
        lang: "python",
        label: "Mini pipeline preview",
        content: `import pandas as pd

df = pd.DataFrame({"cat": ["A", "A", "B"], "val": [10, 20, 30]})
summary = df.groupby("cat")["val"].sum()
csv_text = summary.reset_index().to_csv(index=False)
print(summary)
print(csv_text)`,
      },
      {
        type: "quiz",
        question: "Why pass `index=False` to `to_csv()`?",
        options: [
          "To sort rows",
          "To avoid writing row numbers as an extra column",
          "To compress the file",
          "To skip headers",
        ],
        answer: 1,
        explanation: "index=False omits the DataFrame index from the CSV output.",
      },
    ],
  },
};

export function applyLessonEnhancements(lesson) {
  const meta = LESSON_ENHANCEMENTS[lesson.id];
  const objectives = meta?.objectives || [
    `Understand the main idea in "${lesson.title}"`,
    "Apply the Pandas patterns from this lesson in code",
    "Connect this skill to real spreadsheet or CSV work",
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
