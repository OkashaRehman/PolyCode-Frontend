// Ruby File Handling Curriculum
// A comprehensive course covering file I/O operations in Ruby
// 8 chapters · 29 lessons · runnable Ruby examples and challenges
//
// FIX NOTE (round 2): NumpyIntroTheory (the shared renderer used by this
// lesson page) switches on `block.type` ("text" | "callout" | "quiz" | ...).
// The previous version of these helpers never set `type`, so every theory
// block silently failed to match and the UI fell back to an auto-generated
// placeholder built from the lesson title + challenge. Also, `block.code`
// is passed directly into <RunnableCodeBlock block={block.code} .../> and
// read as `block.code.label` / `block.code.lang`, so it must be an object
// ({ content, label, lang }), not a bare string. Finally, NumpyIntroTheory
// and the lesson page both read `lesson.chapterTitle` directly (for the
// hero and breadcrumb), so every lesson now carries that field.

export function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

// codeBlock: { label, content } — content is the real runnable Ruby snippet
function text(content, codeBlock = null) {
  const block = { type: "text", content };
  if (codeBlock) {
    block.code = {
      label: codeBlock.label,
      content: codeBlock.content,
      lang: "ruby",
    };
  }
  return block;
}

const ACCENT = "#9B111E"; // Ruby red color

// Attaches chapterTitle to every lesson in a chapter (required by the
// lesson page / NumpyIntroTheory, mirroring how the JS DOM course does it).
function withChapterTitle(chapter) {
  return {
    ...chapter,
    lessons: chapter.lessons.map((lesson) => ({
      ...lesson,
      chapterTitle: chapter.title,
    })),
  };
}

const RAW_CHAPTERS = [
  // Chapter 1: File Basics
  {
    id: "file-basics",
    title: "Ruby File Handling – Beginner",
    stage: "beginner",
    icon: "📄",
    color: ACCENT,
    lessons: [
      {
        id: "rfh-0",
        title: "What is File Handling?",
        xp: 10,
        theory: [
          text(
            "File handling is the process of reading from and writing to files on your computer. Ruby represents files as objects you can open, read, write, and close.",
          ),
          callout(
            "info",
            "Ruby treats files as objects with methods that allow you to perform various operations like reading content, writing data, and navigating through the file.",
          ),
          text(
            "The three fundamental file operations are reading (getting data from a file into your program), writing (sending data from your program to a file), and appending (adding data to the end of an existing file). Try the example below to see all three in action.",
            {
              label: "See all three operations run",
              content: `# First, let's create a file with some content (Write)
File.open("demo.txt", "w") do |file|
  file.puts "Hello from Ruby!"
  file.puts "File handling is fun!"
end
puts "File created successfully!"

# Now let's read the file (Read)
puts "\\n--- Reading the file ---"
content = File.read("demo.txt")
puts content

# Let's add more content (Append)
File.open("demo.txt", "a") do |file|
  file.puts "This line was appended!"
end
puts "\\n--- After appending ---"
puts File.read("demo.txt")`,
            },
          ),
          quiz(
            "What is the main purpose of file handling?",
            [
              "Only useful for reading files",
              "Storing, reading, and updating data outside your running program",
              "A Ruby-only feature not found in other languages",
              "A way to speed up your CPU",
            ],
            1,
            "File handling lets your program persist and exchange data beyond a single run.",
          ),
        ],
        challenge: {
          title: "Understanding File Concepts",
          description:
            "Identify which file operation (read, write, or append) would be best for each scenario.",
          starterCode: `# Which operation would you use?
# 1. Reading user data from a saved profile
# 2. Saving a new document
# 3. Adding a new entry to a log file

scenario_1 = "" # read, write, or append
scenario_2 = ""
scenario_3 = ""

puts "Scenario 1: #{scenario_1}"
puts "Scenario 2: #{scenario_2}"
puts "Scenario 3: #{scenario_3}"`,
          solutionCode: `scenario_1 = "read"
scenario_2 = "write"
scenario_3 = "append"

puts "Scenario 1: #{scenario_1}"
puts "Scenario 2: #{scenario_2}"
puts "Scenario 3: #{scenario_3}"`,
          tests: [
            { id: 1, label: "Scenario 1 is read", keywords: [{ pattern: "read" }] },
            { id: 2, label: "Scenario 2 is write", keywords: [{ pattern: "write" }] },
            { id: 3, label: "Scenario 3 is append", keywords: [{ pattern: "append" }] },
          ],
        },
      },
      {
        id: "rfh-1",
        title: "Opening and Closing Files",
        xp: 15,
        theory: [
          text(
            "You open a file with File.open. Used with a block, the file is automatically closed when the block ends — this is the recommended \"block form\".",
            {
              label: "Block form auto-closes the file",
              content: `File.write("test.txt", "Line 1\\nLine 2\\nLine 3")

puts "Using block form:"
File.open("test.txt", "r") do |file|
  puts "Inside block - file is open!"
  puts file.read
end
puts "File is now closed!"`,
            },
          ),
          callout(
            "warning",
            "If you forget to close a file opened without a block, you may leak file descriptors and cause issues elsewhere in your program.",
          ),
          text(
            "Without a block you must close the file manually — compare the open/closed state before and after.",
            {
              label: "Manual close with File.open (no block)",
              content: `file = File.open("test.txt", "r")
puts "File is open: #{!file.closed?}"
content = file.read
file.close
puts "File is closed: #{file.closed?}"
puts "Content: #{content.strip}"`,
            },
          ),
          quiz(
            "What happens if you never close a file opened without a block?",
            [
              "Ruby closes it automatically at program exit only",
              "It may leak file descriptors and cause issues",
              "Nothing, Ruby ignores unclosed files",
              "The file becomes read-only",
            ],
            1,
            "Unclosed files can leak descriptors; the block form avoids this automatically.",
          ),
        ],
        challenge: {
          title: "Open and Close a File",
          description:
            "Write code to open a file named \"data.txt\" for reading and print its contents. Use the block form of File.open.",
          starterCode: `# Open "data.txt" for reading and print its contents
# Use the block form of File.open

`,
          solutionCode: `File.open("data.txt", "r") do |file|
  content = file.read
  puts content
end`,
          tests: [
            { id: 1, label: "Uses File.open", keywords: [{ pattern: "File\\.open" }] },
            { id: 2, label: "Uses block form", keywords: [{ pattern: "do \\|file\\|" }] },
            { id: 3, label: "Reads file content", keywords: [{ pattern: "\\.read" }] },
          ],
        },
      },
      {
        id: "rfh-2",
        title: "Reading File Contents",
        xp: 20,
        theory: [
          text(
            "read() loads the whole file as one string, each_line iterates line by line, and readlines returns an array of all lines. Choose based on file size and what you need.",
            {
              label: "Compare read, each_line, and readlines",
              content: `File.write("sample.txt", "Line 1: Ruby is awesome!\\nLine 2: File handling is easy.\\nLine 3: Practice makes perfect.\\n")

puts "=== Reading Entire File ==="
puts File.read("sample.txt")

puts "=== Reading Line by Line ==="
File.open("sample.txt", "r") do |file|
  file.each_line.with_index(1) do |line, index|
    puts "Line #{index}: #{line.strip}"
  end
end

puts "\\n=== Using readlines ==="
lines = File.readlines("sample.txt")
puts "Total lines: #{lines.count}"
puts "First line: #{lines[0].strip}"`,
            },
          ),
          callout(
            "info",
            "File.readlines loads the entire file into memory. For large files, prefer each_line to process one line at a time.",
          ),
          quiz(
            "Which method is best for processing a huge file without loading it all into memory?",
            ["File.read", "File.readlines", "each_line", "each_char only"],
            2,
            "each_line streams the file one line at a time instead of loading everything.",
          ),
        ],
        challenge: {
          title: "Count Lines in a File",
          description:
            "Write a program that counts the number of lines in \"data.txt\" and prints the count.",
          starterCode: `# Count the number of lines in "data.txt"
# Print the count

`,
          solutionCode: `line_count = 0
File.open("data.txt", "r") do |file|
  file.each_line do |line|
    line_count += 1
  end
end
puts line_count`,
          tests: [
            { id: 1, label: "Uses File.open", keywords: [{ pattern: "File\\.open" }] },
            { id: 2, label: "Counts lines", keywords: [{ pattern: "line_count" }] },
            { id: 3, label: "Prints result", keywords: [{ pattern: "puts" }] },
          ],
        },
      },
      {
        id: "rfh-3",
        title: "Writing to Files",
        xp: 20,
        theory: [
          text(
            "puts adds a newline after each call, write does not, and << (shovel) appends content — including writing an array of lines one by one. Write mode (\"w\") overwrites existing content.",
            {
              label: "puts, write, and << compared",
              content: `File.open("demo_write.txt", "w") do |f|
  f.puts "Hello from puts!"
  f.puts "This is line 2"
end

File.open("demo_write.txt", "a") do |f|
  f.write "Appended with write. "
  f.write "No newline here.\\n"
end

File.open("demo_write.txt", "a") do |f|
  f << "Shoveled line 1\\n"
  f << "Shoveled line 2\\n"
end

lines = ["Array line A", "Array line B", "Array line C"]
File.open("demo_write.txt", "a") do |f|
  lines.each { |line| f.puts line }
end

puts File.read("demo_write.txt")`,
            },
          ),
          callout(
            "warning",
            "Opening a file in write mode (\"w\") deletes all existing content. Use append mode (\"a\") to keep it.",
          ),
          quiz(
            "Which mode should you use to add to a file without erasing what's already there?",
            ['"w"', '"a"', '"r"', '"x"'],
            1,
            "Append mode (\"a\") writes at the end of the file without truncating it.",
          ),
        ],
        challenge: {
          title: "Create a Simple Log File",
          description:
            "Write a program that creates \"log.txt\" and writes three log entries with timestamps.",
          starterCode: `# Create "log.txt" and write three log entries
# Each entry should be on a separate line

`,
          solutionCode: `File.open("log.txt", "w") do |file|
  file.puts "2024-01-01: Application started"
  file.puts "2024-01-02: User logged in"
  file.puts "2024-01-03: Data processed successfully"
end

puts "Log file created!"`,
          tests: [
            { id: 1, label: "Uses File.open", keywords: [{ pattern: "File\\.open" }] },
            { id: 2, label: "Writes to file", keywords: [{ pattern: "file\\.puts|file\\.write" }] },
            { id: 3, label: "Has multiple entries", keywords: [{ pattern: "puts.*\\n.*puts" }] },
          ],
        },
      },
    ],
  },

  // Chapter 2: File Modes, Seek/Tell, CSV
  {
    id: "file-modes",
    title: "Ruby File Handling – Intermediate",
    stage: "intermediate",
    icon: "⚙️",
    color: ACCENT,
    lessons: [
      {
        id: "rfh-4",
        title: "File Modes Explained",
        xp: 15,
        theory: [
          text(
            "File modes control how a file is opened: \"r\" reads, \"w\" overwrites, \"a\" appends, and \"r+\" lets you read and write against an existing file.",
            {
              label: "See w, a, and r+ behave differently",
              content: `File.open("modes_demo.txt", "w") do |f|
  f.puts "Original line 1"
  f.puts "Original line 2"
end
puts "After 'w' mode:"
puts File.read("modes_demo.txt")

File.open("modes_demo.txt", "a") do |f|
  f.puts "Appended line 3"
end
puts "\\nAfter 'a' mode:"
puts File.read("modes_demo.txt")

File.open("modes_demo.txt", "r+") do |f|
  first = f.gets
  f.puts "Inserted after line 1"
end
puts "\\nAfter 'r+' mode:"
puts File.read("modes_demo.txt")`,
            },
          ),
          callout(
            "info",
            "Add the 'b' modifier for binary mode (e.g. \"rb\" or \"wb\"), which treats the file as raw bytes rather than text.",
          ),
          quiz(
            "Which mode creates a file if missing, or truncates it if it exists?",
            ['"r"', '"a"', '"w"', '"r+"'],
            2,
            "\"w\" mode creates a new file or truncates an existing one to zero length.",
          ),
        ],
        challenge: {
          title: "Choose the Right Mode",
          description: "For each scenario, determine which file mode should be used.",
          starterCode: `# What mode would you use for each scenario?
# Options: "r", "w", "a", "r+", "w+", "a+"

mode_1 = "" # Reading a configuration file
mode_2 = "" # Creating a new report file
mode_3 = "" # Adding new entries to an existing log file
mode_4 = "" # Updating specific content in a file

puts "Mode 1: #{mode_1}"
puts "Mode 2: #{mode_2}"
puts "Mode 3: #{mode_3}"
puts "Mode 4: #{mode_4}"`,
          solutionCode: `mode_1 = "r"
mode_2 = "w"
mode_3 = "a"
mode_4 = "r+"

puts "Mode 1: #{mode_1}"
puts "Mode 2: #{mode_2}"
puts "Mode 3: #{mode_3}"
puts "Mode 4: #{mode_4}"`,
          tests: [
            { id: 1, label: "Mode 1 is r", keywords: [{ pattern: 'mode_1 = "r"' }] },
            { id: 2, label: "Mode 2 is w", keywords: [{ pattern: 'mode_2 = "w"' }] },
            { id: 3, label: "Mode 3 is a", keywords: [{ pattern: 'mode_3 = "a"' }] },
            { id: 4, label: "Mode 4 is r+", keywords: [{ pattern: 'mode_4 = "r\\+"' }] },
          ],
        },
      },
      {
        id: "rfh-5",
        title: "File Position: Seek and Tell",
        xp: 20,
        theory: [
          text(
            "Every open file has an internal pointer. tell reports the current position; seek moves it. IO::SEEK_SET, IO::SEEK_CUR, and IO::SEEK_END control where seek measures from.",
            {
              label: "Navigate with seek and tell",
              content: `File.write("seek_demo.txt", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")

File.open("seek_demo.txt", "r") do |f|
  puts "Start position: #{f.tell}"

  f.read(5)
  puts "After reading 5 chars: #{f.tell}"

  f.seek(10, IO::SEEK_SET)
  puts "After seek to 10: #{f.tell}"
  puts "Char at position 10: #{f.read(1)}"

  f.seek(-3, IO::SEEK_END)
  puts "Last 3 chars: #{f.read(3)}"

  f.seek(-5, IO::SEEK_CUR)
  puts "After moving back 5: #{f.read(5)}"
end`,
            },
          ),
          callout(
            "info",
            "seek(-1, IO::SEEK_END) positions you at the last byte of the file; seek(-2, IO::SEEK_END) is one byte before that.",
          ),
          quiz(
            "What does file.tell return?",
            [
              "The total file size",
              "The current position of the file pointer",
              "The file's mode",
              "The last line read",
            ],
            1,
            "tell reports where the internal file pointer currently sits.",
          ),
        ],
        challenge: {
          title: "Navigate File Contents",
          description:
            "Write a program that reads the first 5 characters of a file, then reads the last 5 characters.",
          starterCode: `# Read the first 5 characters and last 5 characters of "data.txt"
# Print both parts

`,
          solutionCode: `File.open("data.txt", "r") do |file|
  first_part = file.read(5)
  file.seek(-5, IO::SEEK_END)
  last_part = file.read(5)

  puts "First 5: #{first_part}"
  puts "Last 5: #{last_part}"
end`,
          tests: [
            { id: 1, label: "Uses seek", keywords: [{ pattern: "\\.seek" }] },
            { id: 2, label: "Uses IO::SEEK_END", keywords: [{ pattern: "IO::SEEK_END" }] },
            { id: 3, label: "Reads first part", keywords: [{ pattern: "first_part" }] },
            { id: 4, label: "Reads last part", keywords: [{ pattern: "last_part" }] },
          ],
        },
      },
      {
        id: "rfh-6",
        title: "Working with CSV Files",
        xp: 25,
        theory: [
          text(
            "Ruby's built-in CSV library reads rows as arrays, or as hash-like objects when you pass headers: true, and writes rows with the << operator.",
            {
              label: "Write, then read a CSV two ways",
              content: `require 'csv'

CSV.open("products.csv", "w") do |csv|
  csv << ["name", "price", "stock"]
  csv << ["Laptop", 999, 15]
  csv << ["Mouse", 25, 100]
  csv << ["Keyboard", 75, 50]
end

puts "Reading as arrays:"
CSV.foreach("products.csv") do |row|
  puts "  #{row.inspect}"
end

puts "\\nReading with headers:"
CSV.foreach("products.csv", headers: true) do |row|
  puts "  #{row["name"]} - $#{row["price"]} (#{row["stock"]} in stock)"
end`,
            },
          ),
          callout(
            "info",
            "The CSV library automatically handles special characters, quotes, and commas within field values.",
          ),
          quiz(
            "With headers: true, how do you access a column value?",
            ["row[0]", "row.first", 'row["column_name"]', "row.name"],
            2,
            "Passing headers: true lets you index rows by column name like a hash.",
          ),
        ],
        challenge: {
          title: "Process CSV Data",
          description:
            "Read a CSV file named \"students.csv\" with headers (name, grade) and print only students with grade above 80.",
          starterCode: `require 'csv'

# Read "students.csv" and print students with grade > 80
# The CSV has headers: name, grade

`,
          solutionCode: `require 'csv'

CSV.foreach("students.csv", headers: true) do |row|
  if row["grade"].to_i > 80
    puts "#{row["name"]}: #{row["grade"]}"
  end
end`,
          tests: [
            { id: 1, label: "Requires CSV", keywords: [{ pattern: "require.*csv" }] },
            { id: 2, label: "Uses headers", keywords: [{ pattern: "headers:\\s*true" }] },
            { id: 3, label: "Checks grade", keywords: [{ pattern: "grade" }] },
          ],
        },
      },
    ],
  },

  // Chapter 3: File Utilities
  {
    id: "file-utilities",
    title: "Ruby File Handling – Advanced",
    stage: "advanced",
    icon: "🚀",
    color: ACCENT,
    lessons: [
      {
        id: "rfh-7",
        title: "Working with JSON Files",
        xp: 25,
        theory: [
          text(
            "The json library converts Ruby hashes to JSON text and back. JSON.pretty_generate formats output for readability, and JSON.parse turns a JSON string into a Ruby hash.",
            {
              label: "Save a hash as JSON, then load it back",
              content: `require 'json'

user = {
  name: "Alice",
  age: 30,
  hobbies: ["coding", "reading", "hiking"],
  address: { city: "Seattle", state: "WA" }
}

File.write("user.json", JSON.pretty_generate(user))
puts "Saved user.json:"
puts File.read("user.json")

loaded = JSON.parse(File.read("user.json"))
puts "\\nLoaded from file:"
puts "  Name: #{loaded["name"]}"
puts "  Hobbies: #{loaded["hobbies"].join(", ")}"
puts "  City: #{loaded["address"]["city"]}"`,
            },
          ),
          callout(
            "info",
            "JSON.pretty_generate creates nicely formatted JSON with indentation, making files human-readable.",
          ),
          quiz(
            "What does JSON.parse do?",
            [
              "Converts a Ruby hash into a JSON string",
              "Converts a JSON string into a Ruby object",
              "Validates a JSON file's syntax only",
              "Writes JSON directly to disk",
            ],
            1,
            "JSON.parse takes a JSON-formatted string and returns the equivalent Ruby data structure.",
          ),
        ],
        challenge: {
          title: "Save and Load Configuration",
          description:
            "Create a configuration hash with settings (theme: dark, language: en, notifications: true) and save it to \"config.json\". Then load it back and print the theme.",
          starterCode: `require 'json'

# Create a config hash and save to "config.json"
# Then load it back and print the theme

`,
          solutionCode: `require 'json'

config = {
  theme: "dark",
  language: "en",
  notifications: true
}

File.write("config.json", JSON.pretty_generate(config))

loaded_config = JSON.parse(File.read("config.json"))
puts "Theme: #{loaded_config["theme"]}"`,
          tests: [
            { id: 1, label: "Requires JSON", keywords: [{ pattern: "require.*json" }] },
            { id: 2, label: "Writes to file", keywords: [{ pattern: "File\\.write" }] },
            { id: 3, label: "Reads from file", keywords: [{ pattern: "JSON\\.parse" }] },
          ],
        },
      },
      {
        id: "rfh-8",
        title: "Working with Directories",
        xp: 20,
        theory: [
          text(
            "Dir and FileUtils manage directories: mkdir_p creates nested folders, Dir.entries lists contents, and Dir.glob finds files matching a pattern (** searches recursively).",
            {
              label: "Create, list, and glob a directory",
              content: `require 'fileutils'

FileUtils.mkdir_p("test_dir/sub_a")
FileUtils.mkdir_p("test_dir/sub_b")

File.write("test_dir/readme.txt", "Hello!")
File.write("test_dir/script.rb", "puts 'Ruby!'")
File.write("test_dir/data.json", '{"key": "value"}')

puts "All entries in test_dir:"
Dir.entries("test_dir").each { |e| puts "  #{e}" }

puts "\\nRuby files: #{Dir.glob("test_dir/**/*.rb")}"
puts "JSON files: #{Dir.glob("test_dir/**/*.json")}"

FileUtils.rm_rf("test_dir")
puts "\\nCleaned up!"`,
            },
          ),
          callout(
            "info",
            "Dir.glob('**/*.rb') searches recursively through subdirectories; Dir.glob('*.rb') only checks the current folder.",
          ),
          quiz(
            "Which method creates nested directories in one call?",
            ["Dir.mkdir", "FileUtils.mkdir_p", "Dir.new", "File.mkdir"],
            1,
            "FileUtils.mkdir_p creates all missing parent directories, similar to `mkdir -p`.",
          ),
        ],
        challenge: {
          title: "List and Count Files",
          description: "List all .txt files in the current directory and count how many there are.",
          starterCode: `# List all .txt files in current directory
# Count and print the total

`,
          solutionCode: `txt_files = Dir.glob("*.txt")

puts "Text files found:"
txt_files.each { |file| puts "  - #{file}" }
puts "Total: #{txt_files.count}"`,
          tests: [
            { id: 1, label: "Uses Dir.glob", keywords: [{ pattern: "Dir\\.glob" }] },
            { id: 2, label: "Filters .txt files", keywords: [{ pattern: '"\\*\\.txt"' }] },
            { id: 3, label: "Counts files", keywords: [{ pattern: "\\.count|\\.length|\\.size" }] },
          ],
        },
      },
      {
        id: "rfh-9",
        title: "File Information and Metadata",
        xp: 20,
        theory: [
          text(
            "File.exist?, File.size, and File.stat let you inspect a file without opening it for reading — useful for existence checks, sizes, timestamps, and permissions.",
            {
              label: "Inspect a file's metadata",
              content: `File.write("meta_demo.txt", "Hello, file metadata!")

puts "Exists? #{File.exist?("meta_demo.txt")}"
puts "Is file? #{File.file?("meta_demo.txt")}"
puts "Size: #{File.size("meta_demo.txt")} bytes"

stat = File.stat("meta_demo.txt")
puts "\\nFile::Stat details:"
puts "  Size: #{stat.size} bytes"
puts "  Modified: #{stat.mtime}"

puts "\\nPermissions:"
puts "  Readable? #{File.readable?("meta_demo.txt")}"
puts "  Writable? #{File.writable?("meta_demo.txt")}"

File.delete("meta_demo.txt")`,
            },
          ),
          callout(
            "info",
            "File.stat returns a File::Stat object bundling size, timestamps, and permission info in one call.",
          ),
          quiz(
            "Which check confirms a path exists AND is a regular file (not a directory)?",
            ["File.exist? only", "File.file?", "File.readable?", "File.stat.class"],
            1,
            "File.file? returns true only for regular files, false for directories or other types.",
          ),
        ],
        challenge: {
          title: "Get File Information",
          description:
            "Check if \"data.txt\" exists. If it does, print its size and last modified time.",
          starterCode: `# Check if "data.txt" exists
# If it does, print its size and last modified time

`,
          solutionCode: `if File.exist?("data.txt")
  stat = File.stat("data.txt")
  puts "File exists!"
  puts "Size: #{stat.size} bytes"
  puts "Last modified: #{stat.mtime}"
else
  puts "File does not exist"
end`,
          tests: [
            { id: 1, label: "Checks existence", keywords: [{ pattern: "File\\.exist\\?" }] },
            { id: 2, label: "Gets size", keywords: [{ pattern: "\\.size" }] },
            { id: 3, label: "Gets mtime", keywords: [{ pattern: "\\.mtime" }] },
          ],
        },
      },
      {
        id: "rfh-10",
        title: "Copying, Moving, and Deleting Files",
        xp: 20,
        theory: [
          text(
            "FileUtils.cp copies, FileUtils.mv renames or moves, and File.delete removes a file. There's no trash bin — deletion is permanent.",
            {
              label: "Copy, rename, then delete",
              content: `require 'fileutils'

File.write("original.txt", "This is the original content.")
puts "Created: original.txt"

FileUtils.cp("original.txt", "copy.txt")
puts "Copied to: copy.txt"

FileUtils.mv("copy.txt", "renamed.txt")
puts "Renamed copy.txt to: renamed.txt"
puts "copy.txt exists? #{File.exist?("copy.txt")}"
puts "renamed.txt exists? #{File.exist?("renamed.txt")}"

File.delete("original.txt")
File.delete("renamed.txt")
puts "\\nAfter deletion:"
puts "original.txt exists? #{File.exist?("original.txt")}"`,
            },
          ),
          callout(
            "warning",
            "File deletion is permanent! Make sure you have backups or are certain before deleting files.",
          ),
          quiz(
            "Which method both copies and renames a file in one operation when moving to a new name?",
            ["FileUtils.cp", "FileUtils.mv", "File.delete", "Dir.glob"],
            1,
            "FileUtils.mv moves/renames a file, replacing the old path with the new one.",
          ),
        ],
        challenge: {
          title: "Backup and Clean Up",
          description:
            "Create a backup of \"data.txt\" by copying it to \"data_backup.txt\", then delete the original.",
          starterCode: `require 'fileutils'

# Create a backup of "data.txt" as "data_backup.txt"
# Then delete the original file

`,
          solutionCode: `require 'fileutils'

FileUtils.cp("data.txt", "data_backup.txt")
puts "Backup created: data_backup.txt"

File.delete("data.txt")
puts "Original file deleted"`,
          tests: [
            { id: 1, label: "Requires FileUtils", keywords: [{ pattern: "require.*fileutils" }] },
            { id: 2, label: "Copies file", keywords: [{ pattern: "FileUtils\\.cp|\\.cp" }] },
            { id: 3, label: "Deletes file", keywords: [{ pattern: "File\\.delete|FileUtils\\.rm" }] },
          ],
        },
      },
      {
        id: "rfh-11",
        title: "Working with Binary Files",
        xp: 25,
        theory: [
          text(
            "Binary mode ('b') treats file content as raw bytes rather than text. pack converts an array of integers into a binary string; unpack reverses that.",
            {
              label: "Pack bytes, write binary, then unpack",
              content: `numbers = [72, 101, 108, 108, 111]  # ASCII for "Hello"
binary_data = numbers.pack("C*")
puts "Packed binary: #{binary_data.inspect}"

File.open("binary_demo.bin", "wb") do |f|
  f.write(binary_data)
end
puts "Wrote binary_demo.bin"

File.open("binary_demo.bin", "rb") do |f|
  data = f.read
  puts "\\nRead back: #{data.inspect}"
  puts "Unpacked back to array: #{data.unpack("C*").inspect}"
end

File.delete("binary_demo.bin")`,
            },
          ),
          callout(
            "info",
            "The pack method converts an array of integers to a binary string, while unpack converts binary data back into an array.",
          ),
          quiz(
            "Which file mode flag treats the file as raw bytes instead of text?",
            ['"t"', '"b"', '"x"', '"n"'],
            1,
            "Adding 'b' to a mode (e.g. \"rb\", \"wb\") switches to binary mode.",
          ),
        ],
        challenge: {
          title: "Read Binary File Header",
          description:
            "Open \"data.bin\" in binary mode and read the first 8 bytes. Print each byte as a number.",
          starterCode: `# Open "data.bin" in binary mode
# Read the first 8 bytes
# Print each byte as a number

`,
          solutionCode: `File.open("data.bin", "rb") do |file|
  bytes = file.read(8)
  bytes.each_byte do |byte|
    puts byte
  end
end`,
          tests: [
            { id: 1, label: "Uses binary mode", keywords: [{ pattern: '"rb"' }] },
            { id: 2, label: "Reads bytes", keywords: [{ pattern: "\\.read\\(" }] },
            { id: 3, label: "Iterates bytes", keywords: [{ pattern: "each_byte|bytes" }] },
          ],
        },
      },
      {
        id: "rfh-12",
        title: "Working with YAML Files",
        xp: 25,
        theory: [
          text(
            "YAML is a human-readable format popular for config files. to_yaml converts a Ruby hash to YAML text, and YAML.load_file reads it back.",
            {
              label: "Save config as YAML, then load it back",
              content: `require 'yaml'

config = {
  app_name: "MyApp",
  version: "1.0.0",
  database: {
    host: "localhost",
    port: 5432
  },
  features: ["authentication", "logging", "cache"],
  debug: false
}

File.write("app_config.yaml", config.to_yaml)
puts "Saved app_config.yaml:"
puts File.read("app_config.yaml")

loaded = YAML.load_file("app_config.yaml")
puts "\\nLoaded from YAML:"
puts "  App: #{loaded[:app_name]} v#{loaded[:version]}"
puts "  DB Host: #{loaded[:database][:host]}"
puts "  Features: #{loaded[:features].join(", ")}"

File.delete("app_config.yaml")`,
            },
          ),
          callout(
            "info",
            "YAML is great for configuration files because it's more readable than JSON and supports comments.",
          ),
          quiz(
            "Which method converts a Ruby hash directly into a YAML string?",
            [".to_json", ".to_yaml", ".to_csv", ".to_s"],
            1,
            "to_yaml is available on Ruby objects once the 'yaml' library is required.",
          ),
        ],
        challenge: {
          title: "Save and Load Settings",
          description:
            "Create a settings hash with database configuration and save it to \"settings.yaml\". Then load it back and print the database host.",
          starterCode: `require 'yaml'

# Create settings hash with database config
# Save to "settings.yaml"
# Load back and print the database host

`,
          solutionCode: `require 'yaml'

settings = {
  database: {
    host: "localhost",
    port: 3306,
    name: "myapp_db"
  },
  app_name: "My Application"
}

File.write("settings.yaml", settings.to_yaml)

loaded = YAML.load_file("settings.yaml")
puts "Database host: #{loaded[:database][:host]}"`,
          tests: [
            { id: 1, label: "Requires YAML", keywords: [{ pattern: "require.*yaml" }] },
            { id: 2, label: "Writes YAML", keywords: [{ pattern: "\\.to_yaml|yaml" }] },
            { id: 3, label: "Loads YAML", keywords: [{ pattern: "YAML\\.load" }] },
          ],
        },
      },
      {
        id: "rfh-13",
        title: "Error Handling for Files",
        xp: 25,
        theory: [
          text(
            "File operations can fail: missing files, blocked permissions, and more. begin/rescue/ensure lets you handle these gracefully and always clean up.",
            {
              label: "Safely read a file and recover from errors",
              content: `def safe_read(filename)
  File.read(filename)
rescue Errno::ENOENT
  "Error: File not found"
rescue Errno::EACCES
  "Error: Permission denied"
rescue => e
  "Error: #{e.class} - #{e.message}"
end

File.write("safe_demo.txt", "Hello from safe read!")
puts "Existing file: #{safe_read("safe_demo.txt")}"
puts "Missing file: #{safe_read("nonexistent.txt")}"

file = nil
begin
  file = File.open("safe_demo.txt", "r")
  puts "Read: #{file.gets.chomp}"
  raise "Simulated error!"
rescue => e
  puts "Caught: #{e.message}"
ensure
  file&.close
  puts "File closed in ensure block"
end

File.delete("safe_demo.txt")`,
            },
          ),
          callout(
            "info",
            "File.exist? before opening is simpler, but doesn't guard against the file disappearing between the check and the open (a race condition). For critical code, prefer begin/rescue.",
          ),
          quiz(
            "Which exception is raised when a file doesn't exist?",
            ["Errno::EACCES", "Errno::ENOENT", "Errno::ENOTDIR", "StandardError only"],
            1,
            "Errno::ENOENT means \"no such file or directory\".",
          ),
        ],
        challenge: {
          title: "Safe File Reading",
          description:
            "Write a method that safely reads a file and returns its contents, or an error message if the file can't be read.",
          starterCode: `def safe_read(filename)
  # Your code here
  
end

puts safe_read("existing_file.txt")
puts safe_read("nonexistent.txt")`,
          solutionCode: `def safe_read(filename)
  File.read(filename)
rescue Errno::ENOENT
  "Error: File not found"
rescue Errno::EACCES
  "Error: Permission denied"
end

puts safe_read("existing_file.txt")
puts safe_read("nonexistent.txt")`,
          tests: [
            { id: 1, label: "Defines method", keywords: [{ pattern: "def safe_read" }] },
            { id: 2, label: "Rescues ENOENT", keywords: [{ pattern: "Errno::ENOENT" }] },
            { id: 3, label: "Rescues EACCES", keywords: [{ pattern: "Errno::EACCES" }] },
          ],
        },
      },
    ],
  },

  // Chapter 4: CSV & JSON File Handling
  {
    id: "rfh-c3",
    title: "CSV & JSON File Handling",
    stage: "pro",
    description: "Work with structured data formats like CSV and JSON",
    lessons: [
      {
        id: "rfh-14",
        title: "Working with CSV Files",
        xp: 25,
        theory: [
          text(
            "CSV.open writes rows with <<; CSV.foreach reads rows one at a time, either as plain arrays or, with headers: true, indexable by column name.",
            {
              label: "Write a CSV, then read it two ways",
              content: `require 'csv'

CSV.open("students.csv", "w") do |csv|
  csv << ["name", "age", "grade"]
  csv << ["Alice", 20, "A"]
  csv << ["Bob", 22, "B+"]
  csv << ["Carol", 21, "A-"]
end
puts "Created students.csv"

puts "\\nAll rows:"
CSV.foreach("students.csv") do |row|
  puts "  #{row.inspect}"
end

puts "\\nWith headers:"
CSV.foreach("students.csv", headers: true) do |row|
  puts "  #{row['name']} is #{row['age']} (Grade: #{row['grade']})"
end

File.delete("students.csv")`,
            },
          ),
          callout(
            "info",
            "The CSV library automatically handles escaping special characters like commas and quotes within fields.",
          ),
          quiz(
            "What does CSV.read(file, headers: true) return?",
            [
              "A single string of the whole file",
              "An array of rows you can index by column name",
              "A hash of column totals",
              "Nothing — it only works with foreach",
            ],
            1,
            "CSV.read loads the whole file into an array-like structure of rows, indexable by header when headers: true.",
          ),
        ],
        challenge: {
          title: "CSV Data Processing",
          description: "Read a CSV file and calculate the average of a numeric column.",
          starterCode: `# Given a CSV file 'grades.csv' with columns: name, grade
# Write a method that returns the average grade

require 'csv'

def average_grade(filename)
  # Your code here
  
end

puts average_grade('grades.csv')`,
          solutionCode: `require 'csv'

def average_grade(filename)
  grades = []
  CSV.foreach(filename, headers: true) do |row|
    grades << row['grade'].to_f
  end
  grades.sum / grades.length
end

puts average_grade('grades.csv')`,
          tests: [
            { id: 1, label: "Uses CSV", keywords: [{ pattern: "CSV" }] },
            { id: 2, label: "Iterates rows", keywords: [{ pattern: "foreach" }] },
            { id: 3, label: "Calculates average", keywords: [{ pattern: "sum" }, { pattern: "length" }] },
          ],
        },
      },
      {
        id: "rfh-15",
        title: "Working with JSON Files",
        xp: 25,
        theory: [
          text(
            "to_json converts a Ruby object to a JSON string, and JSON.parse converts it back. Wrap parsing in begin/rescue since malformed JSON raises JSON::ParserError.",
            {
              label: "Round-trip a hash through JSON, including error handling",
              content: `require 'json'

data = {
  app: "MyApp",
  version: "2.1.0",
  features: ["auth", "logging"],
  settings: { theme: "dark", timeout: 30 }
}

File.write("config.json", JSON.pretty_generate(data))
puts "Saved config.json:"
puts File.read("config.json")

parsed = JSON.parse(File.read("config.json"))
puts "\\nParsed back:"
puts "  App: #{parsed['app']}"
puts "  Theme: #{parsed['settings']['theme']}"

begin
  JSON.parse("{ invalid: json }")
rescue JSON::ParserError => e
  puts "\\nCaught error: #{e.class}"
end

File.delete("config.json")`,
            },
          ),
          callout(
            "warning",
            "Always validate JSON input with begin/rescue since malformed JSON raises JSON::ParserError.",
          ),
          quiz(
            "What error does JSON.parse raise on malformed input?",
            ["Errno::ENOENT", "JSON::ParserError", "ArgumentError only", "SyntaxError"],
            1,
            "Invalid JSON text raises JSON::ParserError, which you can rescue explicitly.",
          ),
        ],
        challenge: {
          title: "JSON Configuration Manager",
          description: "Create a class that reads and writes configuration to a JSON file.",
          starterCode: `require 'json'

class ConfigManager
  def initialize(filename)
    @filename = filename
    @data = load_config
  end
  
  def [](key)
    # Return value for key
  end
  
  def []=(key, value)
    # Set value for key and save
  end
  
  private
  
  def load_config
    # Load from file or return empty hash
  end
  
  def save_config
    # Save to file
  end
end`,
          solutionCode: `require 'json'

class ConfigManager
  def initialize(filename)
    @filename = filename
    @data = load_config
  end
  
  def [](key)
    @data[key]
  end
  
  def []=(key, value)
    @data[key] = value
    save_config
  end
  
  private
  
  def load_config
    return {} unless File.exist?(@filename)
    JSON.parse(File.read(@filename))
  rescue JSON::ParserError
    {}
  end
  
  def save_config
    File.write(@filename, JSON.pretty_generate(@data))
  end
end`,
          tests: [
            { id: 1, label: "Reads file", keywords: [{ pattern: "File.read" }] },
            { id: 2, label: "Writes file", keywords: [{ pattern: "File.write" }] },
            { id: 3, label: "Parses JSON", keywords: [{ pattern: "JSON.parse" }] },
          ],
        },
      },
      {
        id: "rfh-16",
        title: "Converting Between Formats",
        xp: 20,
        theory: [
          text(
            "You can move data between formats: read a CSV into hashes with to_h, convert to JSON, then rebuild a CSV from parsed JSON using each row's keys and values.",
            {
              label: "Convert CSV to JSON, then back to CSV",
              content: `require 'csv'
require 'json'

CSV.open("people.csv", "w") do |csv|
  csv << ["name", "age", "city"]
  csv << ["Alice", 30, "NYC"]
  csv << ["Bob", 25, "LA"]
end
puts "Created people.csv"

rows = CSV.read("people.csv", headers: true)
json_data = rows.map(&:to_h)
File.write("people.json", JSON.pretty_generate(json_data))
puts "\\nConverted to people.json:"
puts File.read("people.json")

parsed = JSON.parse(File.read("people.json"))
CSV.open("people_restored.csv", "w") do |csv|
  csv << parsed.first.keys
  parsed.each { |row| csv << row.values }
end
puts "\\nRestored to people_restored.csv:"
puts File.read("people_restored.csv")

File.delete("people.csv")
File.delete("people.json")
File.delete("people_restored.csv")`,
            },
          ),
          quiz(
            "When converting an array of hashes to CSV, where do the header row's values come from?",
            [
              "They must be typed manually every time",
              "The keys of the first hash in the array",
              "Ruby infers them from data types",
              "CSV files never have headers",
            ],
            1,
            "parsed.first.keys gives you the header row directly from the hash's keys.",
          ),
        ],
        challenge: {
          title: "Data Format Transformer",
          description: "Convert a CSV file to JSON and back.",
          starterCode: `# Write two methods:
# 1. csv_to_json(input_file, output_file)
# 2. json_to_csv(input_file, output_file)

require 'csv'
require 'json'

def csv_to_json(input, output)
  # Your code here
end

def json_to_csv(input, output)
  # Your code here
end`,
          solutionCode: `require 'csv'
require 'json'

def csv_to_json(input, output)
  rows = CSV.read(input, headers: true)
  json_data = rows.map(&:to_h)
  File.write(output, JSON.pretty_generate(json_data))
end

def json_to_csv(input, output)
  data = JSON.parse(File.read(input))
  CSV.open(output, 'w') do |csv|
    csv << data.first.keys if data.any?
    data.each { |row| csv << row.values }
  end
end`,
          tests: [
            { id: 1, label: "Uses CSV library", keywords: [{ pattern: "CSV" }] },
            { id: 2, label: "Uses JSON library", keywords: [{ pattern: "JSON" }] },
            { id: 3, label: "Reads and writes", keywords: [{ pattern: "File.read" }, { pattern: "File.write" }] },
          ],
        },
      },
    ],
  },

  // Chapter 5: Working with Directories
  {
    id: "rfh-c4",
    title: "Working with Directories",
    stage: "pro",
    description: "Navigate, create, and manage directories",
    lessons: [
      {
        id: "rfh-17",
        title: "Directory Navigation",
        xp: 20,
        theory: [
          text(
            "Dir.pwd shows the current directory, Dir.children lists contents (excluding . and ..), and Dir.glob finds files by pattern. Pathname offers a cleaner object-based way to build and inspect paths.",
            {
              label: "Explore the current directory",
              content: `require 'pathname'

puts "Current directory: #{Dir.pwd}"

puts "\\nDir.children('.'):"
Dir.children('.').first(5).each { |e| puts "  #{e}" }

puts "\\nRuby files in current dir:"
Dir.glob('*.rb').each { |f| puts "  #{f}" }

base = Pathname.new(Dir.pwd)
config_path = base + 'config' + 'database.yml'
puts "\\nPathname operations:"
puts "  Joined path: #{config_path}"
puts "  Basename: #{config_path.basename}"
puts "  Extname: #{config_path.extname}"`,
            },
          ),
          quiz(
            "What's the difference between Dir.entries and Dir.children?",
            [
              "There is no difference",
              "children excludes the special . and .. entries",
              "entries only lists files, children only lists directories",
              "children is recursive, entries is not",
            ],
            1,
            "Dir.children behaves like Dir.entries but filters out the . and .. self/parent references.",
          ),
        ],
        challenge: {
          title: "Directory Explorer",
          description: "Create a method that recursively lists all files in a directory.",
          starterCode: `# Write a method that lists all files recursively
def list_files(directory, indent = 0)
  # Your code here
end

list_files('.')`,
          solutionCode: `def list_files(directory, indent = 0)
  Dir.foreach(directory) do |entry|
    next if entry.start_with?('.')
    path = File.join(directory, entry)
    puts '  ' * indent + entry
    list_files(path, indent + 1) if File.directory?(path)
  end
end

list_files('.')`,
          tests: [
            { id: 1, label: "Uses Dir", keywords: [{ pattern: "Dir" }] },
            { id: 2, label: "Checks directory", keywords: [{ pattern: "directory?" }] },
            { id: 3, label: "Recursive", keywords: [{ pattern: "list_files" }] },
          ],
        },
      },
      {
        id: "rfh-18",
        title: "Creating and Managing Directories",
        xp: 20,
        theory: [
          text(
            "FileUtils.mkdir_p creates nested directories in one call, cp_r copies a whole directory tree, and rm_rf removes a directory and everything inside it — permanently.",
            {
              label: "Create, copy, and remove a directory tree",
              content: `require 'fileutils'

Dir.mkdir("demo_project")
FileUtils.mkdir_p("demo_project/src/components")
FileUtils.mkdir_p("demo_project/tests")

File.write("demo_project/README.md", "# Demo Project")
File.write("demo_project/src/app.rb", "puts 'hello'")
puts "Contents of demo_project:"
Dir.children("demo_project").each { |e| puts "  #{e}" }

FileUtils.cp_r("demo_project", "demo_project_copy")
puts "\\nCopy exists? #{Dir.exist?("demo_project_copy")}"

FileUtils.rm_rf("demo_project")
FileUtils.rm_rf("demo_project_copy")
puts "\\nAfter cleanup:"
puts "demo_project exists? #{Dir.exist?("demo_project")}"`,
            },
          ),
          callout(
            "warning",
            "FileUtils.rm_rf is powerful but dangerous — it deletes recursively without confirmation. Use with caution!",
          ),
          quiz(
            "Which method removes a directory and everything inside it?",
            ["Dir.rmdir", "FileUtils.rm_rf", "File.delete", "Dir.empty?"],
            1,
            "FileUtils.rm_rf recursively force-deletes a directory tree, unlike Dir.rmdir which only removes empty directories.",
          ),
        ],
        challenge: {
          title: "Project Scaffolding",
          description: "Create a method that sets up a standard project directory structure.",
          starterCode: `require 'fileutils'

def create_project(name)
  # Create this structure:
  # project_name/
  #   src/
  #   tests/
  #   docs/
  #   README.md
  
  # Your code here
end`,
          solutionCode: `require 'fileutils'

def create_project(name)
  base = name
  dirs = ['src', 'tests', 'docs']
  
  FileUtils.mkdir_p(base)
  dirs.each { |d| FileUtils.mkdir_p(File.join(base, d)) }
  
  File.write(File.join(base, 'README.md'), "# #{name}\\n")
  puts "Created project: #{name}"
end`,
          tests: [
            { id: 1, label: "Creates directories", keywords: [{ pattern: "mkdir_p" }] },
            { id: 2, label: "Writes files", keywords: [{ pattern: "File.write" }] },
            { id: 3, label: "Uses FileUtils", keywords: [{ pattern: "FileUtils" }] },
          ],
        },
      },
      {
        id: "rfh-19",
        title: "Directory Information",
        xp: 15,
        theory: [
          text(
            "Dir['**/*'] with File.file? and File.size lets you compute directory-wide statistics like file counts and total size.",
            {
              label: "Compute directory statistics",
              content: `require 'fileutils'

FileUtils.mkdir_p("stats_demo")
File.write("stats_demo/file1.txt", "A" * 100)
File.write("stats_demo/file2.txt", "B" * 250)
File.write("stats_demo/file3.rb", "puts 'hello'")
FileUtils.mkdir_p("stats_demo/subdir")

all_items = Dir['stats_demo/**/*']
files = all_items.select { |f| File.file?(f) }
dirs = all_items.select { |f| File.directory?(f) }

puts "Total items: #{all_items.count}"
puts "Files: #{files.count}"
puts "Directories: #{dirs.count}"

total_size = files.sum { |f| File.size(f) }
puts "Total size: #{total_size} bytes"

largest = files.max_by { |f| File.size(f) }
puts "Largest file: #{largest} (#{File.size(largest)} bytes)"

FileUtils.rm_rf("stats_demo")`,
            },
          ),
          quiz(
            "How would you get the total size of all files under a directory tree?",
            [
              "File.size(directory)",
              "Sum File.size for each file returned by Dir['**/*']",
              "Dir.size(directory)",
              "It's not possible in Ruby",
            ],
            1,
            "Collect files with Dir['**/*'], filter with File.file?, then sum File.size for each.",
          ),
        ],
        challenge: {
          title: "Directory Statistics",
          description: "Create a method that returns statistics about a directory.",
          starterCode: `def directory_stats(path)
  # Return a hash with:
  # - :file_count
  # - :dir_count
  # - :total_size
  # - :largest_file
  
  # Your code here
end`,
          solutionCode: `def directory_stats(path)
  files = Dir[File.join(path, '**', '*')]
  file_list = files.select { |f| File.file?(f) }
  
  {
    file_count: file_list.count,
    dir_count: files.count - file_list.count,
    total_size: file_list.sum { |f| File.size(f) },
    largest_file: file_list.max_by { |f| File.size(f) }
  }
end`,
          tests: [
            { id: 1, label: "Counts files", keywords: [{ pattern: "count" }] },
            { id: 2, label: "Calculates size", keywords: [{ pattern: "size" }] },
            { id: 3, label: "Returns hash", keywords: [{ pattern: "{" }] },
          ],
        },
      },
    ],
  },

  // Chapter 6: File Permissions & Security
  {
    id: "rfh-c5",
    title: "File Permissions & Security",
    stage: "pro",
    description: "Understand and manage file permissions",
    lessons: [
      {
        id: "rfh-20",
        title: "Understanding File Permissions",
        xp: 20,
        theory: [
          text(
            "File.stat.mode reports permission bits for owner, group, and others (read=4, write=2, execute=1). FileUtils.chmod changes them, e.g. 0644 or 0755.",
            {
              label: "Read and change permissions",
              content: `require 'fileutils'

File.write("perms_demo.txt", "Permission test")

mode = File.stat("perms_demo.txt").mode
puts "Current mode (octal): #{mode.to_s(8)}"

FileUtils.chmod(0644, "perms_demo.txt")
puts "\\nAfter chmod(0644):"
puts "  Readable? #{File.readable?("perms_demo.txt")}"
puts "  Writable? #{File.writable?("perms_demo.txt")}"

FileUtils.chmod(0755, "perms_demo.txt")
puts "\\nAfter chmod(0755):"
puts "  Executable? #{File.executable?("perms_demo.txt")}"

File.delete("perms_demo.txt")`,
            },
          ),
          quiz(
            "In Unix permission notation, what does the digit 6 represent?",
            [
              "Execute only",
              "Read + write (4 + 2)",
              "Read + execute (4 + 1)",
              "No permissions",
            ],
            1,
            "4 (read) + 2 (write) = 6, which is why 0644 grants owner read/write.",
          ),
        ],
        challenge: {
          title: "Permission Manager",
          description: "Create a method that secures a file with appropriate permissions.",
          starterCode: `require 'fileutils'

def secure_file(filename, is_executable = false)
  # Set 600 permissions (owner only)
  # If executable, set 700
  # Your code here
end`,
          solutionCode: `require 'fileutils'

def secure_file(filename, is_executable = false)
  mode = is_executable ? 0755 : 0600
  FileUtils.chmod(mode, filename)
end`,
          tests: [
            { id: 1, label: "Uses chmod", keywords: [{ pattern: "chmod" }] },
            { id: 2, label: "Handles executable", keywords: [{ pattern: "executable" }] },
          ],
        },
      },
      {
        id: "rfh-21",
        title: "File Ownership",
        xp: 15,
        theory: [
          text(
            "File.stat gives you a numeric uid/gid; the Etc library resolves those into human-readable owner and group names.",
            {
              label: "Resolve file owner and group",
              content: `require 'etc'

File.write("owner_demo.txt", "Ownership test")

stat = File.stat("owner_demo.txt")
puts "UID: #{stat.uid}"
puts "GID: #{stat.gid}"

owner_name = Etc.getpwuid(stat.uid).name
group_name = Etc.getgrgid(stat.gid).name
puts "\\nOwner: #{owner_name}"
puts "Group: #{group_name}"

File.delete("owner_demo.txt")`,
            },
          ),
          quiz(
            "Which library resolves a numeric uid into a username?",
            ["FileUtils", "Etc", "Pathname", "JSON"],
            1,
            "Etc.getpwuid(uid).name maps a numeric user ID to its username.",
          ),
        ],
        challenge: {
          title: "Ownership Reporter",
          description: "Create a method that reports file ownership information.",
          starterCode: `require 'etc'

def ownership_info(filename)
  # Return hash with :owner, :group, :uid, :gid
  # Your code here
end`,
          solutionCode: `require 'etc'

def ownership_info(filename)
  stat = File.stat(filename)
  {
    owner: Etc.getpwuid(stat.uid).name,
    group: Etc.getgrgid(stat.gid).name,
    uid: stat.uid,
    gid: stat.gid
  }
end`,
          tests: [
            { id: 1, label: "Uses Etc", keywords: [{ pattern: "Etc" }] },
            { id: 2, label: "Gets stat", keywords: [{ pattern: "stat" }] },
          ],
        },
      },
      {
        id: "rfh-22",
        title: "Secure File Operations",
        xp: 20,
        theory: [
          text(
            "Secure patterns include checking permissions before reading, writing atomically (write to a temp file, then rename), and validating paths to prevent traversal outside an expected directory.",
            {
              label: "Secure read, atomic write, path validation",
              content: `def secure_read(filename)
  return nil unless File.exist?(filename)
  stat = File.stat(filename)
  return nil if (stat.mode & 0o077) != 0
  File.read(filename)
end

def atomic_write(filename, content)
  temp = File.join(File.dirname(filename), ".#{File.basename(filename)}.tmp")
  File.write(temp, content)
  File.rename(temp, filename)
end

def safe_path(filename)
  resolved = File.expand_path(filename)
  base = File.expand_path(".")
  return nil unless resolved.start_with?(base)
  resolved
end

File.write("secure_demo.txt", "secret data")
FileUtils.chmod(0600, "secure_demo.txt")

puts "secure_read: #{secure_read("secure_demo.txt").inspect}"

atomic_write("secure_demo.txt", "updated secret data")
puts "After atomic_write: #{File.read("secure_demo.txt")}"

puts "safe_path: #{safe_path("secure_demo.txt")}"
puts "traversal attempt: #{safe_path("../../../etc/passwd").inspect}"

File.delete("secure_demo.txt")`,
            },
          ),
          callout(
            "warning",
            "Always validate file paths to prevent path traversal attacks. Use File.expand_path to resolve relative paths before checking them.",
          ),
          quiz(
            "Why write to a temp file and then rename it, instead of writing directly?",
            [
              "It's faster",
              "It prevents a crash mid-write from leaving a corrupted file",
              "Ruby requires it",
              "It compresses the data",
            ],
            1,
            "Rename is atomic on most filesystems, so readers never see a partially-written file.",
          ),
        ],
        challenge: {
          title: "Secure Config Handler",
          description: "Create a secure configuration file handler with atomic writes.",
          starterCode: `require 'tempfile'
require 'json'

class SecureConfig
  def initialize(filename)
    @filename = filename
  end
  
  def read
    # Validate permissions, then read
  end
  
  def write(data)
    # Atomic write with temp file
  end
end`,
          solutionCode: `require 'tempfile'
require 'json'

class SecureConfig
  def initialize(filename)
    @filename = filename
  end
  
  def read
    return {} unless File.exist?(@filename)
    stat = File.stat(@filename)
    return {} if (stat.mode & 0o077) != 0
    JSON.parse(File.read(@filename))
  rescue JSON::ParserError
    {}
  end
  
  def write(data)
    temp = File.join(File.dirname(@filename), ".#{File.basename(@filename)}.tmp")
    File.write(temp, JSON.pretty_generate(data))
    File.rename(temp, @filename)
  end
end`,
          tests: [
            { id: 1, label: "Checks permissions", keywords: [{ pattern: "mode" }] },
            { id: 2, label: "Uses temp file", keywords: [{ pattern: "tmp" }] },
            { id: 3, label: "Atomic rename", keywords: [{ pattern: "rename" }] },
          ],
        },
      },
    ],
  },

  // Chapter 7: Working with Temporary Files
  {
    id: "rfh-c6",
    title: "Working with Temporary Files",
    stage: "pro",
    description: "Create and manage temporary files and directories",
    lessons: [
      {
        id: "rfh-23",
        title: "Tempfile Basics",
        xp: 20,
        theory: [
          text(
            "Tempfile creates a temporary file. Used with a block, it's automatically closed and deleted afterward — no manual cleanup needed.",
            {
              label: "Tempfile with manual and block-based cleanup",
              content: `require 'tempfile'

temp = Tempfile.new('demo')
temp.write('Hello from tempfile!')
temp.rewind
puts "Read: #{temp.read}"
temp.close
temp.unlink
puts "After unlink, exists? #{File.exist?(temp.path)}"

puts "\\nBlock form:"
Tempfile.new('demo') do |f|
  f.write('Block managed tempfile')
  f.rewind
  puts "  Read: #{f.read}"
end

puts "\\nCustom extension:"
Tempfile.new(['report', '.json']) do |f|
  f.write('{"status": "ok"}')
  puts "  Has .json? #{f.path.end_with?('.json')}"
end`,
            },
          ),
          callout(
            "info",
            "Always prefer the block form of Tempfile.new when possible — it guarantees cleanup even if an error occurs.",
          ),
          quiz(
            "What's the main benefit of Tempfile's block form over manual creation?",
            [
              "It's faster to write to disk",
              "The file is automatically closed and deleted afterward",
              "It supports larger files",
              "There is no difference",
            ],
            1,
            "The block form auto-cleans the temp file when the block ends, even on errors.",
          ),
        ],
        challenge: {
          title: "Temp File Processor",
          description: "Create a method that processes data in a temporary file.",
          starterCode: `require 'tempfile'

def process_in_temp(input_data)
  # Write input to temp file
  # Process (upcase for example)
  # Return result
  # Your code here
end`,
          solutionCode: `require 'tempfile'

def process_in_temp(input_data)
  Tempfile.new('process') do |f|
    f.write(input_data)
    f.rewind
    f.read.upcase
  end
end`,
          tests: [
            { id: 1, label: "Uses Tempfile", keywords: [{ pattern: "Tempfile" }] },
            { id: 2, label: "Writes and reads", keywords: [{ pattern: "write" }, { pattern: "read" }] },
          ],
        },
      },
      {
        id: "rfh-24",
        title: "Temp Directories",
        xp: 15,
        theory: [
          text(
            "Dir.mktmpdir creates a temporary directory. With a block, it's automatically removed afterward, just like Tempfile.",
            {
              label: "Create temp directories, with and without a block",
              content: `require 'tmpdir'
require 'fileutils'

temp_dir = Dir.mktmpdir
puts "Created: #{temp_dir}"
File.write(File.join(temp_dir, 'note.txt'), 'hello')
puts "Contents: #{Dir.children(temp_dir).inspect}"
FileUtils.remove_entry(temp_dir)
puts "After cleanup, exists? #{Dir.exist?(temp_dir)}"

puts "\\nBlock form:"
Dir.mktmpdir do |dir|
  File.write(File.join(dir, 'data.txt'), 'temp data')
  File.write(File.join(dir, 'config.yml'), 'key: value')
  puts "  Files: #{Dir.children(dir).sort.inspect}"
end
puts "Auto-cleaned after block!"`,
            },
          ),
          quiz(
            "How do you avoid manually deleting a temp directory?",
            [
              "You can't — always delete manually",
              "Use Dir.mktmpdir with a block",
              "Temp directories self-delete after 24 hours",
              "Use FileUtils.mkdir instead",
            ],
            1,
            "Dir.mktmpdir with a block removes the directory automatically when the block finishes.",
          ),
        ],
        challenge: {
          title: "Extraction Manager",
          description: "Create a method that extracts files to a temp directory.",
          starterCode: `require 'tmpdir'
require 'fileutils'

def extract_to_temp(archive_path)
  # Create temp directory
  # Extract contents
  # Return path to temp directory
  # Your code here
end`,
          solutionCode: `require 'tmpdir'
require 'fileutils'

def extract_to_temp(archive_path)
  Dir.mktmpdir do |dir|
    FileUtils.cp(archive_path, dir)
    dir
  end
end`,
          tests: [
            { id: 1, label: "Uses mktmpdir", keywords: [{ pattern: "mktmpdir" }] },
            { id: 2, label: "Returns path", keywords: [{ pattern: "dir" }] },
          ],
        },
      },
      {
        id: "rfh-25",
        title: "Practical Temp File Patterns",
        xp: 20,
        theory: [
          text(
            "Combine Tempfile and Dir.mktmpdir for multi-step pipelines. Blocks guarantee cleanup even when an error is raised partway through.",
            {
              label: "Multi-step processing with guaranteed cleanup",
              content: `require 'tempfile'
require 'tmpdir'

def multi_step_process(data)
  Dir.mktmpdir do |dir|
    step1 = File.join(dir, 'step1.txt')
    step2 = File.join(dir, 'step2.txt')

    File.write(step1, data.upcase)
    puts "  After step1: #{File.read(step1)}"

    File.write(step2, File.read(step1).reverse)
    puts "  After step2: #{File.read(step2)}"

    File.read(step2)
  end
end

puts "Multi-step process:"
final = multi_step_process("ruby")
puts "  Final result: #{final}"

puts "\\nError-safe cleanup:"
begin
  Dir.mktmpdir do |dir|
    File.write(File.join(dir, 'temp.txt'), 'data')
    puts "  Created file in #{dir}"
    raise 'Simulated error!'
  end
rescue => e
  puts "  Caught: #{e.message}"
  puts "  Temp dir auto-cleaned despite error!"
end`,
            },
          ),
          callout(
            "info",
            "Always use blocks with Tempfile and mktmpdir when possible for automatic cleanup, even if an error occurs partway through.",
          ),
          quiz(
            "If an exception is raised inside a Dir.mktmpdir block, what happens to the temp directory?",
            [
              "It's left behind permanently",
              "It's still cleaned up automatically",
              "Ruby crashes",
              "It gets locked",
            ],
            1,
            "Block-based temp directory creation cleans up in an ensure-like fashion, even on errors.",
          ),
        ],
        challenge: {
          title: "File Transformer",
          description: "Create a class that transforms files through multiple steps.",
          starterCode: `require 'tempfile'
require 'tmpdir'

class FileTransformer
  def initialize
    @steps = []
  end
  
  def add_step(name, &block)
    # Add a transformation step
  end
  
  def transform(input_path)
    # Apply all steps in sequence
    # Return final result
  end
end`,
          solutionCode: `require 'tempfile'
require 'tmpdir'

class FileTransformer
  def initialize
    @steps = []
  end
  
  def add_step(name, &block)
    @steps << [name, block]
  end
  
  def transform(input_path)
    Dir.mktmpdir do |dir|
      current = input_path
      @steps.each do |name, block|
        output = File.join(dir, name)
        block.call(current, output)
        current = output
      end
      File.read(current)
    end
  end
end`,
          tests: [
            { id: 1, label: "Stores steps", keywords: [{ pattern: "@steps" }] },
            { id: 2, label: "Uses temp dir", keywords: [{ pattern: "mktmpdir" }] },
            { id: 3, label: "Applies blocks", keywords: [{ pattern: "block.call" }] },
          ],
        },
      },
    ],
  },

  // Chapter 8: Advanced File Operations
  {
    id: "rfh-c7",
    title: "Advanced File Operations",
    stage: "pro",
    description: "File locking and change monitoring",
    lessons: [
      {
        id: "rfh-26",
        title: "File Locking",
        xp: 25,
        theory: [
          text(
            "flock coordinates access across processes. LOCK_EX grants exclusive access for writing; LOCK_SH allows multiple simultaneous readers; LOCK_NB makes a lock attempt non-blocking so you can detect contention.",
            {
              label: "Exclusive, shared, and non-blocking locks",
              content: `require 'tempfile'

Tempfile.new('lockdemo') do |f|
  f.write('lockable data')
  f.close
  path = f.path

  File.open(path, 'r+') do |file|
    file.flock(File::LOCK_EX)
    puts "Lock acquired!"
    file.rewind
    file.write('UPDATED DATA')
    file.truncate(file.pos)
    file.flock(File::LOCK_UN)
    puts "Lock released!"
  end
  puts "New content: #{File.read(path)}"

  File.open(path, 'r+') do |file1|
    file1.flock(File::LOCK_EX)
    puts "\\nFirst lock acquired"
    File.open(path, 'r+') do |file2|
      if file2.flock(File::LOCK_EX | File::LOCK_NB)
        puts "Second lock acquired (unexpected!)"
      else
        puts "Second lock blocked (expected)"
      end
    end
    file1.flock(File::LOCK_UN)
  end
end`,
            },
          ),
          quiz(
            "What does File::LOCK_NB do when combined with LOCK_EX?",
            [
              "Waits indefinitely for the lock",
              "Makes the lock attempt non-blocking, returning immediately if unavailable",
              "Removes all locks on the file",
              "Grants a shared lock instead",
            ],
            1,
            "LOCK_NB makes flock return immediately (falsy) instead of waiting if the lock can't be acquired.",
          ),
        ],
        challenge: {
          title: "Safe File Editor",
          description: "Create a method that safely edits a file with locking.",
          starterCode: `def safe_edit(filename)
  # Open with exclusive lock
  # Read content
  # Yield to block for modification
  # Write back
  # Your code here
end`,
          solutionCode: `def safe_edit(filename)
  File.open(filename, 'r+') do |f|
    f.flock(File::LOCK_EX)
    content = f.read
    modified = yield(content)
    f.rewind
    f.write(modified)
    f.truncate(f.tell)
    f.flock(File::LOCK_UN)
  end
end`,
          tests: [
            { id: 1, label: "Uses flock", keywords: [{ pattern: "flock" }] },
            { id: 2, label: "Yields content", keywords: [{ pattern: "yield" }] },
            { id: 3, label: "Releases lock", keywords: [{ pattern: "LOCK_UN" }] },
          ],
        },
      },
      {
        id: "rfh-27",
        title: "File Watching & Monitoring",
        xp: 25,
        theory: [
          text(
            "Without external gems, you can track file changes yourself by comparing File.mtime against a stored value each time you check.",
            {
              label: "Detect file changes with a simple monitor class",
              content: `require 'tempfile'

class FileMonitor
  def initialize(filename)
    @filename = filename
    @last_mtime = File.exist?(filename) ? File.mtime(filename) : nil
  end

  def changed?
    return false unless File.exist?(@filename)
    current = File.mtime(@filename)
    if current != @last_mtime
      @last_mtime = current
      true
    else
      false
    end
  end
end

Tempfile.new('watchdemo') do |f|
  f.write('initial content')
  f.close
  path = f.path

  monitor = FileMonitor.new(path)
  puts "Changed? #{monitor.changed?}"

  sleep 1
  File.write(path, 'modified content')
  puts "After modification, changed? #{monitor.changed?}"

  puts "No new modification, changed? #{monitor.changed?}"
end`,
            },
          ),
          quiz(
            "How can you detect a file changed without a dedicated file-watching gem?",
            [
              "It's impossible without external gems",
              "Compare File.mtime against a previously stored timestamp",
              "Re-read the whole file every second and diff it",
              "Check the file's name",
            ],
            1,
            "File.mtime updates whenever the file is written, making it a lightweight way to detect changes.",
          ),
        ],
        challenge: {
          title: "Change Detector",
          description: "Create a class that detects and reports file changes.",
          starterCode: `class ChangeDetector
  def initialize(filenames)
    # Store filenames and their initial mtimes
  end
  
  def changes
    # Return array of files that have changed
  end
  
  def reset
    # Reset tracking to current state
  end
end`,
          solutionCode: `class ChangeDetector
  def initialize(filenames)
    @files = filenames.map { |f| [f, File.mtime(f)] }.to_h
  end
  
  def changes
    @files.select do |f, old_mtime|
      File.exist?(f) && File.mtime(f) != old_mtime
    end.keys
  end
  
  def reset
    @files.each { |f, _| @files[f] = File.mtime(f) if File.exist?(f) }
  end
end`,
          tests: [
            { id: 1, label: "Stores mtimes", keywords: [{ pattern: "mtime" }] },
            { id: 2, label: "Detects changes", keywords: [{ pattern: "changed" }] },
            { id: 3, label: "Resets state", keywords: [{ pattern: "reset" }] },
          ],
        },
      },
      {
        id: "rfh-28",
        title: "Fast Text Search in Files",
        xp: 20,
        theory: [
          text(
            "For repeated searches against the same file content, load it once and reuse String#index in a loop to find every occurrence of a term.",
            {
              label: "Find every occurrence of a search term",
              content: `require 'tempfile'

Tempfile.new('searchdemo') do |f|
  f.write('The quick brown fox jumps over the lazy dog. ' * 5)
  f.close
  path = f.path
  puts "File size: #{File.size(path)} bytes"

  content = File.read(path)
  puts "Contains 'fox'? #{content.include?('fox')}"
  puts "Count of 'the': #{content.downcase.scan('the').count}"

  positions = []
  pos = 0
  while pos = content.index('fox', pos)
    positions << pos
    pos += 1
  end
  puts "'fox' found at positions: #{positions.inspect}"
  puts "Total occurrences: #{positions.count}"
end`,
            },
          ),
          callout(
            "info",
            "For files too large to hold comfortably in memory, process them in chunks with each_line or each_char instead of loading the whole thing.",
          ),
          quiz(
            "What does content.index('fox', pos) do on the second call in a loop?",
            [
              "Always returns the very first match",
              "Searches for the next match starting at position pos",
              "Removes 'fox' from the string",
              "Counts total matches",
            ],
            1,
            "Passing a start position to index lets you step past previous matches to find the next occurrence.",
          ),
        ],
        challenge: {
          title: "Fast File Search",
          description: "Create a class that searches file content for all occurrences of a term.",
          starterCode: `class FastFileSearch
  def initialize(filename)
    # Load the file content
  end
  
  def search(term)
    # Find all occurrences of term
  end
end`,
          solutionCode: `class FastFileSearch
  def initialize(filename)
    @content = File.read(filename)
  end
  
  def search(term)
    positions = []
    pos = 0
    while pos = @content.index(term, pos)
      positions << pos
      pos += 1
    end
    positions
  end
end`,
          tests: [
            { id: 1, label: "Reads file content", keywords: [{ pattern: "File.read" }] },
            { id: 2, label: "Searches content", keywords: [{ pattern: "index" }] },
          ],
        },
      },
    ],
  },
];

export const RUBY_FILE_HANDLING_CHAPTERS = RAW_CHAPTERS.map(withChapterTitle);

export const RUBY_FILE_HANDLING_LESSONS = RUBY_FILE_HANDLING_CHAPTERS.flatMap((c) => c.lessons);

export const RUBY_FILE_HANDLING_TOTAL_XP = RUBY_FILE_HANDLING_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);