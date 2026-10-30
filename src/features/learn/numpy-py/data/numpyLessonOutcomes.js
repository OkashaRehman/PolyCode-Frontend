// Plain-English learning outcomes per NumPy lesson (shown at top of theory view).

export const NUMPY_LESSON_OUTCOMES = {
  "numpy-0": [
    "Say what NumPy is and why people use it for number work",
    "Import NumPy as `np` and build a small array with `np.array()`",
    "Spot real places where arrays beat plain Python lists",
  ],
  "numpy-1": [
    "Compare a Python list with a NumPy array in plain words",
    "Do math on a whole group of numbers without writing a loop",
    "Pick a list or an array depending on the job",
  ],
  "numpy-2": [
    "Read an array's **shape** — how many rows and columns it has",
    "Check **dtype** to see what kind of numbers are stored",
    "Add or multiply a whole row of numbers in one step (vector math)",
  ],
  "numpy-2a": [
    "Turn a Python list into a NumPy array with `np.array()`",
    "Build arrays from nested lists to make small tables",
    "See why `np.array()` is the usual starting point",
  ],
  "numpy-3": [
    "Make evenly spaced numbers with `np.arange()`",
    "Make a fixed count of numbers between two values with `np.linspace()`",
    "Choose arange or linspace for the situation you have",
  ],
  "numpy-4": [
    "Create arrays full of zeros or ones when you need a blank slate",
    "Build an identity matrix with `np.eye()` for square grids",
    "Know when placeholder arrays save you typing",
  ],
  "numpy-5": [
    "Slice a 1D array to grab part of a row",
    "Pick rows and columns in a 2D array with `[row, col]`",
    "Use negative indexes to count from the end",
  ],
  "numpy-6": [
    "Build a True/False mask to filter values you care about",
    "Keep only numbers that pass a condition — no manual loop",
    "Combine masks with `&` and `|` for smarter filters",
  ],
  "numpy-17": [
    "Use `np.where()` to pick values based on a condition",
    "Grab specific positions with fancy indexing",
    "Replace values in one clean array operation",
  ],
  "numpy-7": [
    "Explain broadcasting in simple terms",
    "Add a single number to every cell in an array",
    "Match shapes so NumPy can stretch smaller arrays safely",
  ],
  "numpy-7b": [
    "Sum or average **down columns** (`axis=0`) vs **across rows** (`axis=1`)",
    "Picture row-wise and column-wise operations on a small table",
    "Pick the right axis for “per student” vs “per subject” questions",
  ],
  "numpy-8": [
    "Multiply or divide matching cells in two 2D arrays",
    "Tell element-wise `*` apart from matrix multiply `@`",
    "Scale a whole table without nested loops",
  ],
  "numpy-9": [
    "Compute a dot product — multiply pairs and add them up",
    "Use `np.dot()` for weighted totals (like a receipt)",
    "Connect dot products to real “price × quantity” math",
  ],
  "numpy-10": [
    "Multiply two matrices with the `@` operator",
    "See how rows from A meet columns from B",
    "Know when `@` is the right tool instead of `*` or `np.dot`",
  ],
  "numpy-18": [
    "Solve a small system of equations with `np.linalg.solve()`",
    "Check if a matrix is invertible with the determinant",
    "Match story problems to “solve” vs “determinant”",
  ],
  "numpy-11": [
    "Find total, average, smallest, and largest values in an array",
    "Use `np.sum()`, `np.mean()`, `np.min()`, and `np.max()` confidently",
    "Answer quick stats questions on homework-sized data",
  ],
  "numpy-12": [
    "Sum or average **each row** with `axis=1`",
    "Sum or average **each column** with `axis=0`",
    "Read a 2D table and pick the axis that matches the question",
  ],
  "numpy-19": [
    "Handle missing values (`NaN`) without breaking your average",
    "Use `np.nanmean()` and friends when data has gaps",
    "Find percentiles to see where a score sits in the class",
  ],
  "numpy-13": [
    "Reshape a 1D line of numbers into a 2D table",
    "Check that the total count of cells stays the same",
    "Use `-1` in reshape to let NumPy figure out one dimension",
  ],
  "numpy-13b": [
    "Flip rows and columns with `.T` or `np.transpose()`",
    "Flatten a 2D array into one line with `ravel()`",
    "Choose transpose vs flatten based on what you need next",
  ],
  "numpy-14": [
    "Stack arrays vertically with `np.vstack()`",
    "Join arrays side by side with `np.hstack()` or `np.concatenate()`",
    "Build bigger tables from smaller pieces",
  ],
  "numpy-20": [
    "Generate random numbers with `np.random.rand()` and friends",
    "Set a **seed** so results repeat when you need fair tests",
    "Create dice rolls and other luck-based examples",
  ],
  "numpy-21": [
    "Pick random items with `np.random.choice()`",
    "Shuffle a list in place with `np.random.shuffle()`",
    "Build fair teams or random samples without bias",
  ],
  "numpy-21b": [
    "Pretend coin flips, dice rolls, or weather with random numbers",
    "Count results with `np.sum` (how many heads or rainy days?)",
    "Find a typical dice roll with `.mean()` when you roll many times",
  ],
  "numpy-22": [
    "Find `NaN` values in messy data",
    "Drop or fill gaps so stats stay honest",
    "Clean a small dataset before you analyze it",
  ],
  "numpy-23": [
    "Sort values with `np.sort()`",
    "Get ranking indexes with `np.argsort()`",
    "List unique answers with `np.unique()`",
  ],
  "numpy-24": [
    "Save one array with `np.save()` and load it with `np.load()`",
    "Explain why `.npy` is better than a plain text file for arrays",
    "Save several arrays together with `np.savez()` into a `.npz` file",
  ],
  "numpy-25": [
    "Tell a **view** from a **copy** when you slice an array",
    "Use `.copy()` before changing part of an array safely",
    "Avoid surprise bugs when two variables share memory",
  ],
  "numpy-26": [
    "Use universal functions (`ufuncs`) like `np.sqrt` on whole arrays",
    "Vectorize math so Python loops are not needed",
    "Write shorter, faster numeric code",
  ],
  "numpy-26b": [
    "See why NumPy arrays use less memory than lists of numbers",
    "Know when vectorized code is worth it on bigger data",
    "Compare list vs array speed in plain terms",
  ],
  "numpy-15": [
    "Explain mean, std, and z-score in plain words",
    "Compute z-scores with `(x - mean) / std` on a NumPy array",
    "Use z-scores to compare values fairly across different groups",
  ],
  "numpy-16": [
    "Explain weighted average vs normal average in plain words",
    "Compute a weighted mean with `np.dot(values, weights) / weights.sum()`",
    "Know why dividing by `weights.sum()` works even when weights are not percentages",
  ],
  "numpy-27": [
    "Combine stats, masking, and reshape on a grade sheet",
    "Build a small end-to-end report from raw scores",
    "Practice the full “read → clean → summarize” flow",
  ],
  "numpy-28": [
    "Explain a score pipeline in plain words: filter → z-score → sort",
    "Filter passers with a boolean mask, then normalize and rank them",
    "Know why filtering before z-score keeps comparisons fair",
  ],
  "numpy-29": [
    "Explain why missing temperatures (NaN) must be cleaned before averaging",
    "Build a weather pipeline: clean → mean/max → count hot days",
    "Use `~np.isnan` and `np.sum(clean > 75)` on real weekly data",
  ],
  "numpy-30": [
    "Normalize scores with a Z-score using mean() and std()",
    "Calculate a weighted average with np.dot() and weights.sum()",
    "Rank students with np.argsort() and explain how it differs from np.sort()",
  ],
};
