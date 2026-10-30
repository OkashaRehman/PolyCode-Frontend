import {
  createPowerShellChapter,
  createPowerShellLesson,
} from "../../shared/powershellLessonFactory";

export const POWERSHELLFUNDAMENTALS_CHAPTERS = [
  {
    id: "ch-1",
    title: "Cmdlets and Syntax",
    icon: "terminal",
    desc: "Basic PowerShell commands and syntax.",
    lessons: [
      {
        id: "ch-1-l1",
        title: "What is a Cmdlet?",
        chapterTitle: "Cmdlets and Syntax",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to What is a Cmdlet?. Verb-Noun syntax." },
          { type: "code", language: "powershell", content: "Get-Command" }
        ],
        challenge: {
          title: "Practice: What is a Cmdlet?",
          description: [
            { type: "text", content: "Write a PowerShell command for What is a Cmdlet?." }
          ],
          starterCode: "",
          solutionCode: "Get-Command",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Command"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-1-l2",
        title: "Using Get-Help",
        chapterTitle: "Cmdlets and Syntax",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Using Get-Help. Finding help in PowerShell." },
          { type: "code", language: "powershell", content: "Get-Help Get-Process -Detailed" }
        ],
        challenge: {
          title: "Practice: Using Get-Help",
          description: [
            { type: "text", content: "Write a PowerShell command for Using Get-Help." }
          ],
          starterCode: "",
          solutionCode: "Get-Help Get-Process -Detailed",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Help"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-2",
    title: "Objects in PowerShell",
    icon: "box",
    desc: "Everything is an object.",
    lessons: [
      {
        id: "ch-2-l1",
        title: "Exploring Objects",
        chapterTitle: "Objects in PowerShell",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Exploring Objects. Using Get-Member." },
          { type: "code", language: "powershell", content: "Get-Process | Get-Member" }
        ],
        challenge: {
          title: "Practice: Exploring Objects",
          description: [
            { type: "text", content: "Write a PowerShell command for Exploring Objects." }
          ],
          starterCode: "",
          solutionCode: "Get-Process | Get-Member",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Process"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-2-l2",
        title: "Properties and Methods",
        chapterTitle: "Objects in PowerShell",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Properties and Methods. Accessing object data." },
          { type: "code", language: "powershell", content: "(Get-Date).DayOfWeek" }
        ],
        challenge: {
          title: "Practice: Properties and Methods",
          description: [
            { type: "text", content: "Write a PowerShell command for Properties and Methods." }
          ],
          starterCode: "",
          solutionCode: "(Get-Date).DayOfWeek",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["(Get-Date).DayOfWeek"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-3",
    title: "The Pipeline",
    icon: "git-commit",
    desc: "Connecting commands together.",
    lessons: [
      {
        id: "ch-3-l1",
        title: "Piping Output",
        chapterTitle: "The Pipeline",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Piping Output. Passing objects down the line." },
          { type: "code", language: "powershell", content: "Get-Process | Stop-Process -WhatIf" }
        ],
        challenge: {
          title: "Practice: Piping Output",
          description: [
            { type: "text", content: "Write a PowerShell command for Piping Output." }
          ],
          starterCode: "",
          solutionCode: "Get-Process | Stop-Process -WhatIf",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Process"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-3-l2",
        title: "Filtering with Where-Object",
        chapterTitle: "The Pipeline",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Filtering with Where-Object. Filtering objects in the pipeline." },
          { type: "code", language: "powershell", content: "Get-Service | Where-Object Status -eq 'Running'" }
        ],
        challenge: {
          title: "Practice: Filtering with Where-Object",
          description: [
            { type: "text", content: "Write a PowerShell command for Filtering with Where-Object." }
          ],
          starterCode: "",
          solutionCode: "Get-Service | Where-Object Status -eq 'Running'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Service"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-4",
    title: "Formatting Output",
    icon: "list",
    desc: "Formatting object displays.",
    lessons: [
      {
        id: "ch-4-l1",
        title: "Format-Table",
        chapterTitle: "Formatting Output",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Format-Table. Display data as a table." },
          { type: "code", language: "powershell", content: "Get-Process | Format-Table Name, ID, CPU" }
        ],
        challenge: {
          title: "Practice: Format-Table",
          description: [
            { type: "text", content: "Write a PowerShell command for Format-Table." }
          ],
          starterCode: "",
          solutionCode: "Get-Process | Format-Table Name, ID, CPU",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Process"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-4-l2",
        title: "Format-List",
        chapterTitle: "Formatting Output",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Format-List. Display data as a list." },
          { type: "code", language: "powershell", content: "Get-Service | Format-List *" }
        ],
        challenge: {
          title: "Practice: Format-List",
          description: [
            { type: "text", content: "Write a PowerShell command for Format-List." }
          ],
          starterCode: "",
          solutionCode: "Get-Service | Format-List *",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Service"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
];

const additions = [
  [
    [
      "Use Named Parameters",
      "Named parameters make intent explicit and help avoid positional-argument mistakes. Use -ErrorAction Stop when a failure must enter a try/catch block.",
      "Get-Process -Name 'pwsh' -ErrorAction Stop",
      "Find the pwsh process by name and make command errors terminating.",
      "# Query one process by name\n",
      "Get-Process -Name 'pwsh' -ErrorAction Stop",
      [
        ["Selects a process by name", "Get-Process", "Use Get-Process to retrieve the process."],
        ["Makes failures catchable", "-ErrorAction Stop", "Add -ErrorAction Stop to the command."],
      ],
    ],
    [
      "Filter Before Selecting",
      "Filter objects as early as possible, then select only the fields the next step needs. This reduces noise and keeps pipeline intent clear.",
      "Get-Service | Where-Object Status -eq 'Running' | Select-Object Name, Status",
      "Return only running services, showing their names and statuses.",
      "Get-Service |\n    # Add a filter and choose the output properties\n",
      "Get-Service | Where-Object Status -eq 'Running' | Select-Object Name, Status",
      [
        ["Filters running services", "Where-Object", "Use Where-Object to filter the service objects."],
        ["Projects the required fields", "Select-Object Name, Status", "Select only Name and Status with Select-Object."],
      ],
    ],
    [
      "Sort and Limit Results",
      "Sort-Object gives stable, readable reports; combine it with Select-Object -First to keep exploratory output focused.",
      "Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU",
      "Show the five processes with the highest CPU values.",
      "Get-Process |\n    # Sort by CPU and select the top five\n",
      "Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU",
      [
        ["Sorts by CPU descending", "Sort-Object CPU -Descending", "Sort on CPU in descending order."],
        ["Limits the result set", "Select-Object -First 5", "Select the first five sorted results."],
      ],
    ],
    [
      "Preview Changes with WhatIf",
      "Use -WhatIf and -Confirm on commands that support ShouldProcess before performing destructive work. A preview is a review step, not a substitute for validating the target path.",
      "Remove-Item -Path $targetPath -WhatIf",
      "Preview removal of $targetPath without deleting it.",
      "$targetPath = '.\\old-output.txt'\n# Add a safe preview command\n",
      "Remove-Item -Path $targetPath -WhatIf",
      [
        ["Targets the supplied path", "-Path $targetPath", "Pass the intended target through -Path."],
        ["Previews instead of deleting", "-WhatIf", "Include -WhatIf to preview the operation."],
      ],
    ],
  ],
  [
    [
      "Create Custom Objects",
      "Custom objects provide a predictable property contract for reports and downstream commands. Prefer structured output over formatted strings.",
      "[pscustomobject]@{ Name = 'web-01'; Status = 'Healthy' }",
      "Create a structured resource record with Name and Status properties.",
      "# Build one resource record\n",
      "[pscustomobject]@{ Name = 'web-01'; Status = 'Healthy' }",
      [
        ["Creates a custom object", "[pscustomobject]", "Use the PSCustomObject type accelerator."],
        ["Includes both contract fields", "Status = 'Healthy'", "Include a Status property in the object."],
      ],
    ],
    [
      "Build Calculated Properties",
      "Select-Object can calculate a property while projecting data. Give calculated fields stable names so consumers do not depend on display formatting.",
      "Get-Process | Select-Object Name, @{ Name = 'MemoryMB'; Expression = { [math]::Round($_.WorkingSet64 / 1MB, 1) } }",
      "Select each process name and calculate its working-set size in megabytes.",
      "Get-Process | Select-Object Name,\n    # Add a calculated MemoryMB property\n",
      "Get-Process | Select-Object Name, @{ Name = 'MemoryMB'; Expression = { [math]::Round($_.WorkingSet64 / 1MB, 1) } }",
      [
        ["Projects properties", "Select-Object", "Use Select-Object to shape the output."],
        ["Names the calculated field", "MemoryMB", "Name the calculated property MemoryMB."],
        ["Converts bytes to megabytes", "WorkingSet64 / 1MB", "Calculate from WorkingSet64 in megabytes."],
      ],
    ],
    [
      "Measure and Group Data",
      "Group-Object summarizes categories, while Measure-Object calculates numeric aggregates. These cmdlets turn raw records into useful operational signals.",
      "$services | Group-Object Status | Sort-Object Name\n$processes | Measure-Object CPU -Sum -Average",
      "Group services by status and calculate total and average CPU for processes.",
      "$services = Get-Service\n$processes = Get-Process\n# Add group and numeric summaries\n",
      "$services | Group-Object Status | Sort-Object Name\n$processes | Measure-Object CPU -Sum -Average",
      [
        ["Groups service records", "Group-Object Status", "Group service objects on their Status property."],
        ["Measures numeric data", "Measure-Object CPU -Sum -Average", "Measure CPU with both sum and average."],
      ],
    ],
    [
      "Serialize Objects as JSON",
      "ConvertTo-Json serializes object data for APIs and configuration. Set -Depth deliberately for nested values and validate the JSON before sending it elsewhere.",
      "$report | ConvertTo-Json -Depth 5",
      "Serialize the report object, including nested properties, to JSON.",
      "$report = [pscustomobject]@{ Host = 'web-01'; Checks = @() }\n# Serialize the report\n",
      "$report | ConvertTo-Json -Depth 5",
      [
        ["Uses the JSON serializer", "ConvertTo-Json", "Serialize the object with ConvertTo-Json."],
        ["Preserves nested values", "-Depth 5", "Set an explicit depth suitable for nested data."],
      ],
    ],
  ],
  [
    [
      "Transform Items with ForEach-Object",
      "ForEach-Object transforms each pipeline item independently. Return values from the script block to keep the result composable.",
      "1..5 | ForEach-Object { $_ * $_ }",
      "Use the pipeline to return the square of each number from one through five.",
      "1..5 | ForEach-Object {\n    # Return a transformed value\n}\n",
      "1..5 | ForEach-Object { $_ * $_ }",
      [
        ["Transforms pipeline items", "ForEach-Object", "Use ForEach-Object for the per-item transformation."],
        ["Uses the current pipeline item", "$_", "Reference the current item with the pipeline variable."],
      ],
    ],
    [
      "Use Pipeline Variables",
      "The automatic variable $_ represents the current object inside a pipeline script block. Reference explicit properties to keep filters readable and unambiguous.",
      "Get-Process | Where-Object { $_.CPU -gt 10 }",
      "Filter processes to those whose CPU value is greater than ten.",
      "Get-Process | Where-Object {\n    # Test a property on the current object\n}\n",
      "Get-Process | Where-Object { $_.CPU -gt 10 }",
      [
        ["Filters with Where-Object", "Where-Object", "Use Where-Object to keep matching process objects."],
        ["Checks the current object's CPU", "$_.CPU -gt 10", "Compare the CPU property on $_ with ten."],
      ],
    ],
    [
      "Write Pipeline-Aware Functions",
      "A process block runs once for each input object when a function accepts pipeline input. This pattern supports streaming and avoids collecting every item first.",
      "function Get-NameRecord { process { [pscustomobject]@{ Name = $_.Name } } }",
      "Define a function with a process block that emits a Name record for each incoming object.",
      "function Get-NameRecord {\n    # Add a process block and emit a Name property\n}\n",
      "function Get-NameRecord { process { [pscustomobject]@{ Name = $_.Name } } }",
      [
        ["Defines the transformation function", "function Get-NameRecord", "Define the Get-NameRecord function."],
        ["Processes streamed input", "process", "Use a process block for each pipeline item."],
        ["Emits a structured result", "[pscustomobject]", "Return a custom object rather than formatted text."],
      ],
    ],
    [
      "Export Pipeline Results",
      "Export-Csv writes object properties as a reusable data file. Select the output schema first and use -NoTypeInformation for a clean CSV.",
      "Get-Service | Select-Object Name, Status | Export-Csv -Path .\\services.csv -NoTypeInformation",
      "Export service names and statuses as a clean CSV file.",
      "Get-Service |\n    # Select a stable schema and export it\n",
      "Get-Service | Select-Object Name, Status | Export-Csv -Path .\\services.csv -NoTypeInformation",
      [
        ["Defines a stable output schema", "Select-Object Name, Status", "Select the Name and Status columns before exporting."],
        ["Writes a CSV file", "Export-Csv", "Use Export-Csv to write the pipeline objects."],
        ["Omits PowerShell type metadata", "-NoTypeInformation", "Include -NoTypeInformation in the export."],
      ],
    ],
  ],
  [
    [
      "Select Data Before Formatting",
      "Format-Table and Format-List create display instructions for the console; their output is no longer ordinary domain objects. Shape data with Select-Object before a final formatting step.",
      "Get-Process | Select-Object Name, Id, CPU | Format-Table -AutoSize",
      "Create a readable console table with only the process name, ID, and CPU.",
      "Get-Process |\n    # Select useful properties, then format for display\n",
      "Get-Process | Select-Object Name, Id, CPU | Format-Table -AutoSize",
      [
        ["Selects object properties", "Select-Object Name, Id, CPU", "Project the three requested fields first."],
        ["Formats only the final display", "Format-Table", "Use Format-Table as the final display command."],
      ],
    ],
    [
      "Add Readable Calculated Columns",
      "Calculated display columns are useful for a human-facing report, but should be added only at the presentation boundary. Keep the underlying data objects intact for automation.",
      "Get-Process | Format-Table Name, @{ Label = 'MemoryMB'; Expression = { [math]::Round($_.WorkingSet64 / 1MB, 1) } }",
      "Display process names and a rounded MemoryMB column in a table.",
      "Get-Process | Format-Table Name,\n    # Add a calculated MemoryMB display column\n",
      "Get-Process | Format-Table Name, @{ Label = 'MemoryMB'; Expression = { [math]::Round($_.WorkingSet64 / 1MB, 1) } }",
      [
        ["Defines a calculated display field", "Label = 'MemoryMB'", "Label the calculated column MemoryMB."],
        ["Uses the working set", "WorkingSet64", "Calculate from each process's WorkingSet64."],
        ["Rounds for readability", "[math]::Round", "Round the value with the math helper."],
      ],
    ],
    [
      "Choose Table or List Layout",
      "Tables are best for a few comparable properties across many objects; lists are better for inspecting many properties on a small number of objects. Avoid formatting before downstream processing.",
      "Get-Service -Name 'Spooler' | Format-List Name, Status, StartType",
      "Inspect the Spooler service in list layout with its name, status, and start type.",
      "Get-Service -Name 'Spooler' |\n    # Choose a detailed layout for this one object\n",
      "Get-Service -Name 'Spooler' | Format-List Name, Status, StartType",
      [
        ["Selects the requested service", "Get-Service -Name 'Spooler'", "Query the Spooler service by name."],
        ["Uses list layout", "Format-List", "Use Format-List to inspect one object's properties."],
      ],
    ],
    [
      "Convert Structured Output for Reports",
      "For machine-readable output, serialize objects instead of formatting them. Choose the output format for its consumer and keep display formatting separate from data export.",
      "Get-Service | Select-Object Name, Status | ConvertTo-Json -Depth 3",
      "Produce JSON containing the name and status of each service.",
      "Get-Service | Select-Object Name, Status |\n    # Convert the selected objects into JSON\n",
      "Get-Service | Select-Object Name, Status | ConvertTo-Json -Depth 3",
      [
        ["Projects report fields", "Select-Object Name, Status", "Select the required properties before conversion."],
        ["Serializes data as JSON", "ConvertTo-Json", "Use ConvertTo-Json, not a Format-* cmdlet."],
      ],
    ],
  ],
];

POWERSHELLFUNDAMENTALS_CHAPTERS.forEach((chapter, index) => {
  chapter.lessons.push(
    ...additions[index].map((lesson, lessonIndex) =>
      createPowerShellLesson(chapter, lessonIndex + 3, lesson),
    ),
  );
});

POWERSHELLFUNDAMENTALS_CHAPTERS.push(
  createPowerShellChapter(5, "Working with Files and Data", "folders", "Read, validate, and safely persist local data.", [
    [
      "Navigate with Literal Paths",
      "Use LiteralPath when names may contain wildcard characters. Resolve paths explicitly and check that an input exists before reading it.",
      "$path = $PSHOME\nTest-Path -LiteralPath $path\nGet-Item -LiteralPath $path",
      "Check that a path exists literally, then retrieve its file metadata.",
      "# Verify the supplied path before reading it\n",
      "Test-Path -LiteralPath $path\nGet-Item -LiteralPath $path",
      [["Checks the literal path", "Test-Path -LiteralPath", "Use Test-Path with LiteralPath."], ["Reads file metadata", "Get-Item -LiteralPath", "Use Get-Item with the same literal path."]],
    ],
    [
      "Read Text Safely",
      "Read text with an explicit encoding and handle missing or unreadable files as errors. Avoid assuming that every file is UTF-8 or that external input is valid.",
      "Get-Content -LiteralPath $path -Encoding utf8 -ErrorAction Stop",
      "Read a UTF-8 text file and make read failures terminating.",
      "# Read the file with an explicit encoding\n",
      "Get-Content -LiteralPath $path -Encoding utf8 -ErrorAction Stop",
      [["Reads by literal path", "Get-Content -LiteralPath", "Read using the supplied literal path."], ["Specifies the encoding", "-Encoding utf8", "Set the encoding explicitly to UTF-8."], ["Surfaces read failures", "-ErrorAction Stop", "Make the read error terminating."]],
    ],
    [
      "Parse CSV into Objects",
      "Import-Csv turns rows into objects whose properties match the column headers. Validate required columns before using row values in later commands.",
      "$rows = Import-Csv -LiteralPath '.\\inventory.csv'\n$rows | Select-Object ComputerName, Environment",
      "Import inventory rows and select the two fields needed for review.",
      "# Import the CSV and select the required columns\n",
      "$rows = Import-Csv -LiteralPath '.\\inventory.csv'\n$rows | Select-Object ComputerName, Environment",
      [["Imports rows as objects", "Import-Csv", "Use Import-Csv to parse the input file."], ["Selects the inventory fields", "ComputerName, Environment", "Project ComputerName and Environment."]],
    ],
    [
      "Validate Required CSV Columns",
      "A trustworthy import checks its schema before processing data. Compare the headers with the required contract and stop with a clear message when a column is missing.",
      "$headers = (Get-Content -LiteralPath $path -TotalCount 1).Split(',')\nif ('ComputerName' -notin $headers) { throw 'ComputerName column is required.' }",
      "Reject the file if its header row does not contain ComputerName.",
      "$headers = (Get-Content -LiteralPath $path -TotalCount 1).Split(',')\n# Validate the required header before processing rows\n",
      "$headers = (Get-Content -LiteralPath $path -TotalCount 1).Split(',')\nif ('ComputerName' -notin $headers) { throw 'ComputerName column is required.' }",
      [["Checks the required column", "'ComputerName' -notin $headers", "Check whether ComputerName is absent."], ["Fails clearly on invalid input", "throw", "Throw a clear error when the header is missing."]],
    ],
    [
      "Write Data with Explicit Encoding",
      "Choose a known encoding when writing text so other tools interpret the file consistently. Write structured data with a stable schema instead of relying on console formatting.",
      "$report | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $path -Encoding utf8",
      "Serialize a report as JSON and write it as UTF-8 text.",
      "# Serialize the report before writing it\n",
      "$report | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $path -Encoding utf8",
      [["Serializes structured output", "ConvertTo-Json -Depth 4", "Convert the report to JSON with an explicit depth."], ["Writes explicit UTF-8 text", "Set-Content -LiteralPath $path -Encoding utf8", "Write with Set-Content and UTF-8 encoding."]],
    ],
    [
      "Publish Files Atomically",
      "Write a complete result to a temporary file, validate it, and then move it into place. This prevents consumers from mistaking a partial write for a finished report.",
      "$temporaryPath = \"$path.tmp\"\n$report | Export-Csv -LiteralPath $temporaryPath -NoTypeInformation\nMove-Item -LiteralPath $temporaryPath -Destination $path -Force",
      "Export a CSV to a temporary location and move the completed file to its final path.",
      "$temporaryPath = \"$path.tmp\"\n# Export first, then publish the complete file\n",
      "$temporaryPath = \"$path.tmp\"\n$report | Export-Csv -LiteralPath $temporaryPath -NoTypeInformation\nMove-Item -LiteralPath $temporaryPath -Destination $path -Force",
      [["Writes a temporary CSV", "Export-Csv -LiteralPath $temporaryPath", "Write the report to the temporary path first."], ["Publishes the completed result", "Move-Item -LiteralPath $temporaryPath", "Move the finished file to its destination."]],
    ],
  ]),
  createPowerShellChapter(6, "Safe and Repeatable Operations", "shield", "Preview changes, validate state, and build dependable command workflows.", [
    [
      "Preview a File Change",
      "Use WhatIf on commands that support ShouldProcess to review the target and intended action without changing state. Confirm the path before running the real operation.",
      "Remove-Item -LiteralPath $path -WhatIf",
      "Preview removal of the supplied literal path without deleting it.",
      "# Preview the operation before making a change\n",
      "Remove-Item -LiteralPath $path -WhatIf",
      [["Targets the literal path", "Remove-Item -LiteralPath", "Use Remove-Item with LiteralPath."], ["Runs in preview mode", "-WhatIf", "Include WhatIf to avoid changing state."]],
    ],
    [
      "Compare Desired and Current State",
      "Check the current value before applying an update. Explicit comparisons prevent needless changes and make reruns more predictable.",
      "if ($service.Status -ne 'Running') { Start-Service -Name $service.Name -WhatIf }",
      "Preview starting a service only when it is not already running.",
      "if ($service.Status -ne 'Running') {\n    # Preview only the needed update\n}\n",
      "if ($service.Status -ne 'Running') { Start-Service -Name $service.Name -WhatIf }",
      [["Checks the current state", "$service.Status -ne 'Running'", "Compare the service state before acting."], ["Previews the corrective action", "Start-Service -Name $service.Name -WhatIf", "Preview the Start-Service command with WhatIf."]],
    ],
    [
      "Use a Reusable Parameter Set",
      "Splatting groups named parameters into a hashtable, improving readability and allowing the values to be validated before a command executes.",
      "$query = @{ ClassName = 'Win32_OperatingSystem'; ErrorAction = 'Stop' }\nGet-CimInstance @query",
      "Build named CIM query parameters and pass them to Get-CimInstance with splatting.",
      "$query = @{\n    # Add the class name and error behavior\n}\n# Splat the validated query parameters\n",
      "$query = @{ ClassName = 'Win32_OperatingSystem'; ErrorAction = 'Stop' }\nGet-CimInstance @query",
      [["Sets the CIM class", "ClassName = 'Win32_OperatingSystem'", "Include the operating-system class in the hashtable."], ["Uses parameter splatting", "Get-CimInstance @query", "Splat the parameter hashtable into the cmdlet."]],
    ],
    [
      "Keep Pipeline Output Structured",
      "Return objects rather than formatted strings so callers can filter, sort, export, and test the result. Treat Format-* cmdlets as terminal display operations.",
      "Get-Service | Select-Object Name, Status | Where-Object Status -eq 'Running'",
      "Return service objects with a selected schema, filtered to running services.",
      "Get-Service |\n    # Shape the records and filter by state\n",
      "Get-Service | Select-Object Name, Status | Where-Object Status -eq 'Running'",
      [["Filters service records", "Where-Object Status -eq 'Running'", "Keep only services in the Running state."], ["Keeps a useful object schema", "Select-Object Name, Status", "Select named properties without formatting."]],
    ],
    [
      "Trace a Command's Provenance",
      "Get-Command reveals which command PowerShell will resolve, its source module, and available command types. Inspect resolution when modules contain similarly named commands.",
      "Get-Command Get-Process -All | Select-Object Name, CommandType, Source",
      "List all resolved Get-Process commands with their command type and source.",
      "# Inspect command resolution and module source\n",
      "Get-Command Get-Process -All | Select-Object Name, CommandType, Source",
      [["Finds all command resolutions", "Get-Command Get-Process -All", "Use Get-Command with All to inspect every match."], ["Shows command source", "CommandType, Source", "Select the command type and source fields."]],
    ],
    [
      "Build a Safe Operational Pipeline",
      "A production-ready read workflow scopes its query, handles failures, selects an intentional schema, and exports data without formatting it first.",
      "Get-Service -ErrorAction Stop | Where-Object Status -ne 'Running' | Select-Object Name, Status | Export-Csv -LiteralPath '.\\service-review.csv' -NoTypeInformation",
      "Find services needing review and export structured results to a CSV file.",
      "Get-Service -ErrorAction Stop |\n    # Filter, select a schema, and export structured results\n",
      "Get-Service -ErrorAction Stop | Where-Object Status -ne 'Running' | Select-Object Name, Status | Export-Csv -LiteralPath '.\\service-review.csv' -NoTypeInformation",
      [["Makes query failures visible", "Get-Service -ErrorAction Stop", "Use ErrorAction Stop on the service query."], ["Filters and selects records", "Where-Object Status -ne 'Running'", "Keep services that are not running."], ["Exports structured data", "Export-Csv -LiteralPath", "Export the selected objects to CSV."]],
    ],
  ]),
);

export const POWERSHELLFUNDAMENTALS_LESSONS = POWERSHELLFUNDAMENTALS_CHAPTERS.flatMap(ch => ch.lessons);
export const POWERSHELLFUNDAMENTALS_TOTAL_XP = POWERSHELLFUNDAMENTALS_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
