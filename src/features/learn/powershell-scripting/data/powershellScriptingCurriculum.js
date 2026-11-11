import {
  createPowerShellChapter,
  createPowerShellLesson,
} from "../../shared/powershellLessonFactory";

export const POWERSHELLSCRIPTING_CHAPTERS = [
  {
    id: "ch-1",
    title: "Variables and Data Types",
    icon: "code",
    desc: "Working with data in scripts.",
    lessons: [
      {
        id: "ch-1-l1",
        title: "Declaring Variables",
        chapterTitle: "Variables and Data Types",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Declaring Variables. How to declare variables." },
          { type: "code", language: "powershell", content: "$myVar = 'Hello World'" }
        ],
        challenge: {
          title: "Practice: Declaring Variables",
          description: [
            { type: "text", content: "Write a PowerShell command for Declaring Variables." }
          ],
          starterCode: "",
          solutionCode: "$myVar = 'Hello World'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$myVar"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-1-l2",
        title: "Strong Typing",
        chapterTitle: "Variables and Data Types",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Strong Typing. Enforcing data types." },
          { type: "code", language: "powershell", content: "[int]$number = 42" }
        ],
        challenge: {
          title: "Practice: Strong Typing",
          description: [
            { type: "text", content: "Write a PowerShell command for Strong Typing." }
          ],
          starterCode: "",
          solutionCode: "[int]$number = 42",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["[int]$number"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-2",
    title: "Arrays and Hash Tables",
    icon: "layers",
    desc: "Working with collections.",
    lessons: [
      {
        id: "ch-2-l1",
        title: "Arrays",
        chapterTitle: "Arrays and Hash Tables",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Arrays. Creating and accessing arrays." },
          { type: "code", language: "powershell", content: "$myArray = @(1, 2, 3); $myArray[0]" }
        ],
        challenge: {
          title: "Practice: Arrays",
          description: [
            { type: "text", content: "Write a PowerShell command for Arrays." }
          ],
          starterCode: "",
          solutionCode: "$myArray = @(1, 2, 3); $myArray[0]",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$myArray"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-2-l2",
        title: "Hash Tables",
        chapterTitle: "Arrays and Hash Tables",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Hash Tables. Key-Value pairs." },
          { type: "code", language: "powershell", content: "$hash = @{ Key='Value' }; $hash['Key']" }
        ],
        challenge: {
          title: "Practice: Hash Tables",
          description: [
            { type: "text", content: "Write a PowerShell command for Hash Tables." }
          ],
          starterCode: "",
          solutionCode: "$hash = @{ Key='Value' }; $hash['Key']",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$hash"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-3",
    title: "Control Flow",
    icon: "git-branch",
    desc: "Logic and loops.",
    lessons: [
      {
        id: "ch-3-l1",
        title: "If/Else Statements",
        chapterTitle: "Control Flow",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to If/Else Statements. Conditional logic." },
          { type: "code", language: "powershell", content: "if ($true) { Write-Host 'Yes' }" }
        ],
        challenge: {
          title: "Practice: If/Else Statements",
          description: [
            { type: "text", content: "Write a PowerShell command for If/Else Statements." }
          ],
          starterCode: "",
          solutionCode: "if ($true) { Write-Host 'Yes' }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["if"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-3-l2",
        title: "Loops",
        chapterTitle: "Control Flow",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Loops. For, Foreach, While." },
          { type: "code", language: "powershell", content: "foreach ($item in @('Ada', 'Grace')) { Write-Output $item }" }
        ],
        challenge: {
          title: "Practice: Loops",
          description: [
            { type: "text", content: "Write a PowerShell command for Loops." }
          ],
          starterCode: "",
          solutionCode: "foreach ($item in @('Ada', 'Grace')) { Write-Output $item }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["foreach"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-4",
    title: "Error Handling",
    icon: "alert-triangle",
    desc: "Managing script errors.",
    lessons: [
      {
        id: "ch-4-l1",
        title: "Try/Catch",
        chapterTitle: "Error Handling",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Try/Catch. Catching exceptions." },
          { type: "code", language: "powershell", content: "try { throw 'Example error' } catch { Write-Output \"Caught: $($_.Exception.Message)\" }" }
        ],
        challenge: {
          title: "Practice: Try/Catch",
          description: [
            { type: "text", content: "Write a PowerShell command for Try/Catch." }
          ],
          starterCode: "",
          solutionCode: "try { throw 'Example error' } catch { Write-Output \"Caught: $($_.Exception.Message)\" }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["try"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-4-l2",
        title: "ErrorActionPreference",
        chapterTitle: "Error Handling",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to ErrorActionPreference. Controlling error behavior." },
          { type: "code", language: "powershell", content: "$ErrorActionPreference = 'Stop'" }
        ],
        challenge: {
          title: "Practice: ErrorActionPreference",
          description: [
            { type: "text", content: "Write a PowerShell command for ErrorActionPreference." }
          ],
          starterCode: "",
          solutionCode: "$ErrorActionPreference = 'Stop'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$ErrorActionPreference"],
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
      "Interpolate and Format Strings",
      "Double-quoted strings expand variables and subexpressions; single-quoted strings remain literal. Use the format operator when a report needs stable alignment or culture-aware formatting.",
      "\"User: $name; total: $($items.Count)\"; '{0,-12} {1,8:N2}' -f 'Revenue', $amount",
      "Create a readable summary that interpolates a user's name and formats a numeric amount to two decimals.",
      "$name = 'Ari'\n$amount = 1250.5\n# Build the formatted summary\n",
      "\"User: $name; total: $($items.Count)\"; '{0,-12} {1,8:N2}' -f 'Revenue', $amount",
      [
        ["Uses variable expansion", '"User: $name', "Use a double-quoted string to expand the name."],
        ["Formats a numeric value", "'Revenue', $amount", "Format the amount with the format operator."],
      ],
    ],
    [
      "Convert and Validate Input",
      "External input is text until validated. Parse into the intended type explicitly and reject invalid values rather than allowing implicit conversions to hide bad data.",
      "$count = 0\nif (-not [int]::TryParse($rawCount, [ref]$count)) { throw 'Count must be an integer.' }",
      "Parse rawCount as an integer and throw a clear error when it is invalid.",
      "$rawCount = '12'\n$count = 0\n# Validate and parse the input\n",
      "$count = 0\nif (-not [int]::TryParse($rawCount, [ref]$count)) { throw 'Count must be an integer.' }",
      [
        ["Uses a non-throwing parse check", "[int]::TryParse", "Use Int32.TryParse to validate before using the input."],
        ["Rejects invalid values", "throw", "Throw a clear error when parsing fails."],
      ],
    ],
    [
      "Use Variable Scope Deliberately",
      "PowerShell variables have scopes; script and global scope can create hidden coupling. Pass values through parameters and return results instead of mutating global state.",
      "function Get-Greeting { param([string]$Name) \"Hello, $Name\" }\nGet-Greeting -Name 'Ari'",
      "Write a function that receives a name as a parameter and returns a greeting.",
      "function Get-Greeting {\n    # Declare a parameter and return a greeting\n}\n",
      "function Get-Greeting { param([string]$Name) \"Hello, $Name\" }\nGet-Greeting -Name 'Ari'",
      [
        ["Accepts an explicit input", "param([string]$Name)", "Declare a typed Name parameter."],
        ["Returns the greeting", '"Hello, $Name"', "Return a greeting that includes the parameter value."],
      ],
    ],
    [
      "Splat Command Parameters",
      "Splatting keeps long command invocations readable and makes parameter sets easier to build conditionally. Use a hashtable for named parameters and inspect it before executing sensitive operations.",
      "$params = @{ ComputerName = 'server01'; ClassName = 'Win32_OperatingSystem' }\nGet-CimInstance @params",
      "Store a CIM query's named arguments in a hashtable and splat them into Get-CimInstance.",
      "$params = @{\n    # Add the target computer and class name\n}\n# Invoke Get-CimInstance with splatting\n",
      "$params = @{ ComputerName = 'server01'; ClassName = 'Win32_OperatingSystem' }\nGet-CimInstance @params",
      [
        ["Builds named parameters", "ComputerName = 'server01'", "Include the target computer in the parameter hashtable."],
        ["Uses splatting", "Get-CimInstance @params", "Pass the hashtable with the splatting operator."],
      ],
    ],
  ],
  [
    [
      "Use Generic Lists for Incremental Results",
      "Arrays are convenient for fixed collections, but repeated += creates new arrays. A generic List provides efficient Add operations when a script must collect an unknown number of results.",
      "$results = [System.Collections.Generic.List[object]]::new()\n$results.Add([pscustomobject]@{ Name = 'web-01'; Healthy = $true })",
      "Create a generic object list and add a structured health result.",
      "$results = [System.Collections.Generic.List[object]]::new()\n# Add a structured result without rebuilding the collection\n",
      "$results = [System.Collections.Generic.List[object]]::new()\n$results.Add([pscustomobject]@{ Name = 'web-01'; Healthy = $true })",
      [
        ["Creates a generic list", "Generic.List[object]", "Initialize a generic list of objects."],
        ["Adds an item efficiently", "$results.Add", "Use the list's Add method."],
      ],
    ],
    [
      "Build Ordered Configuration",
      "An ordered hashtable preserves insertion order and provides convenient named access. Keep configuration values separate from executable code and validate required keys at startup.",
      "$settings = [ordered]@{ Environment = 'Test'; RetryCount = 3 }",
      "Create ordered settings for a Test environment with three retries.",
      "# Define ordered configuration values\n",
      "$settings = [ordered]@{ Environment = 'Test'; RetryCount = 3 }",
      [
        ["Creates an ordered mapping", "[ordered]@{", "Use an ordered hashtable literal."],
        ["Sets the environment", "Environment = 'Test'", "Include the Test environment setting."],
        ["Sets a retry limit", "RetryCount = 3", "Set the retry count to three."],
      ],
    ],
    [
      "Filter and Deduplicate Collections",
      "Use Where-Object to retain matching records and Sort-Object -Unique to deduplicate by a chosen property. Explicit property names make collection transformations easier to review.",
      "$users | Where-Object Enabled | Sort-Object Department -Unique",
      "Keep enabled users and return one record per distinct department.",
      "$users = @()\n# Filter active users and keep unique departments\n",
      "$users | Where-Object Enabled | Sort-Object Department -Unique",
      [
        ["Filters enabled records", "Where-Object Enabled", "Keep records whose Enabled property is true."],
        ["Deduplicates by department", "Sort-Object Department -Unique", "Sort by Department and request unique values."],
      ],
    ],
    [
      "Choose the Right Collection Shape",
      "Arrays, hashtables, and lists solve different problems: ordered sequences, keyed lookup, and incremental accumulation. Select a structure based on how the data will be accessed.",
      "$byName = @{}\n$byName['web-01'] = [pscustomobject]@{ Name = 'web-01'; Role = 'web' }\n$byName['web-01'].Role",
      "Index a resource record by name in a hashtable and read its role.",
      "$byName = @{}\n# Store a resource by name and retrieve its role\n",
      "$byName = @{}\n$byName['web-01'] = [pscustomobject]@{ Name = 'web-01'; Role = 'web' }\n$byName['web-01'].Role",
      [
        ["Uses a keyed collection", "$byName['web-01']", "Use a hashtable key for direct lookup."],
        ["Stores structured data", "[pscustomobject]", "Store the resource as a custom object."],
        ["Reads a named property", ".Role", "Read the Role property from the stored value."],
      ],
    ],
  ],
  [
    [
      "Branch on Multiple Values with Switch",
      "switch is clearer than a long chain of equality checks when handling several discrete values. Include a default case so unexpected input is handled intentionally.",
      "switch ($environment) { 'Dev' { $tier = 'small' } 'Prod' { $tier = 'large' } default { throw 'Unknown environment.' } }",
      "Choose a size tier for Dev and Prod, and reject unknown environments.",
      "$environment = 'Prod'\n# Add explicit cases and a default\n",
      "switch ($environment) { 'Dev' { $tier = 'small' } 'Prod' { $tier = 'large' } default { throw 'Unknown environment.' } }",
      [
        ["Handles multiple named cases", "switch ($environment)", "Use switch to branch on the environment value."],
        ["Rejects unknown cases", "default { throw", "Provide a default case that fails visibly."],
      ],
    ],
    [
      "Control Loop Execution",
      "Use break to stop a loop once its goal is reached and continue to skip an ineligible item. Clear exit conditions prevent accidental infinite loops in automation.",
      "foreach ($service in $services) { if ($service.Status -ne 'Running') { continue }; $service.Name }",
      "Skip services that are not running and emit the names of running services.",
      "foreach ($service in $services) {\n    # Skip services that are not running\n}\n",
      "foreach ($service in $services) { if ($service.Status -ne 'Running') { continue }; $service.Name }",
      [
        ["Iterates each service", "foreach ($service in $services)", "Use foreach to process each service."],
        ["Skips non-running services", "continue", "Continue when the status does not match Running."],
      ],
    ],
    [
      "Validate Function Inputs",
      "Parameter validation attributes define a function's contract at its boundary. Reject invalid values early so the function's main logic can rely on validated inputs.",
      "function Get-EnvironmentReport { param([ValidateSet('Dev', 'Test', 'Prod')][string]$Environment) $Environment }",
      "Restrict the Environment parameter to Dev, Test, or Prod.",
      "function Get-EnvironmentReport {\n    param(\n        # Restrict Environment to supported values\n    )\n}\n",
      "function Get-EnvironmentReport { param([ValidateSet('Dev', 'Test', 'Prod')][string]$Environment) $Environment }",
      [
        ["Defines an explicit allowed set", "ValidateSet('Dev', 'Test', 'Prod')", "Use ValidateSet for the three supported values."],
        ["Types the function input", "[string]$Environment", "Declare Environment as a string parameter."],
      ],
    ],
    [
      "Use Guard Clauses",
      "Guard clauses handle invalid or exceptional conditions near the start of a function. They reduce nested branches and make the successful path easier to follow.",
      "if ([string]::IsNullOrWhiteSpace($Path)) { throw 'Path is required.' }\nGet-Item -LiteralPath $Path -ErrorAction Stop",
      "Reject an empty path before retrieving the item, and make lookup errors terminating.",
      "param([string]$Path)\n# Validate the path before using it\n",
      "if ([string]::IsNullOrWhiteSpace($Path)) { throw 'Path is required.' }\nGet-Item -LiteralPath $Path -ErrorAction Stop",
      [
        ["Rejects a blank path", "IsNullOrWhiteSpace($Path)", "Use IsNullOrWhiteSpace to validate the path."],
        ["Fails visibly for invalid input", "throw", "Throw a clear error when the path is missing."],
        ["Uses literal path lookup", "Get-Item -LiteralPath", "Retrieve the item using -LiteralPath."],
      ],
    ],
  ],
  [
    [
      "Promote Errors into Exceptions",
      "Many cmdlets emit non-terminating errors by default, which do not enter catch blocks. Use -ErrorAction Stop on operations whose failure must abort the current workflow.",
      "try { Get-Content -LiteralPath $path -ErrorAction Stop } catch { Write-Error \"Could not read $path: $_\" }",
      "Read a file so a missing-file error is caught and reported with its path.",
      "try {\n    # Read the file and make errors terminating\n} catch {\n    # Report the failure\n}\n",
      "try { Get-Content -LiteralPath $path -ErrorAction Stop } catch { Write-Error \"Could not read $path: $_\" }",
      [
        ["Makes read failures terminating", "-ErrorAction Stop", "Add -ErrorAction Stop to the file read."],
        ["Handles the exception", "catch", "Use a catch block to report the failure."],
      ],
    ],
    [
      "Throw Typed Errors with Context",
      "Throw an exception when a function cannot meet its contract. Add context to the message and preserve the original failure when translating a lower-level error.",
      "try { Get-Item -LiteralPath $path -ErrorAction Stop } catch { throw \"Validation failed for '$path': $($_.Exception.Message)\" }",
      "Wrap a failed item lookup in a contextual error that includes the path and original message.",
      "try {\n    Get-Item -LiteralPath $path -ErrorAction Stop\n} catch {\n    # Throw an error with the path and original message\n}\n",
      "try { Get-Item -LiteralPath $path -ErrorAction Stop } catch { throw \"Validation failed for '$path': $($_.Exception.Message)\" }",
      [
        ["Preserves the original error context", "$_.Exception.Message", "Include the caught exception message."],
        ["Raises a clear failure", "throw", "Throw a contextual error rather than silently continuing."],
      ],
    ],
    [
      "Always Release Resources",
      "A finally block runs whether the try block succeeds or fails. Use it to release disposable resources and stop temporary logging without hiding the original error.",
      "try { Get-Content -LiteralPath $path -ErrorAction Stop } finally { $reader.Dispose() }",
      "Ensure the reader is disposed whether reading succeeds or throws.",
      "try {\n    # Perform the read\n} finally {\n    # Release the reader\n}\n",
      "try { Get-Content -LiteralPath $path -ErrorAction Stop } finally { $reader.Dispose() }",
      [
        ["Defines unconditional cleanup", "finally", "Use finally for cleanup that must always run."],
        ["Releases the resource", "$reader.Dispose()", "Dispose the reader in the cleanup block."],
      ],
    ],
    [
      "Retry Transient Failures Safely",
      "Retry only operations that are safe to repeat, use a bounded attempt count, and add a delay for transient failures. Surface the final failure instead of returning a success-shaped fallback.",
      "for ($attempt = 1; $attempt -le 3; $attempt++) { try { Invoke-Operation -ErrorAction Stop; break } catch { if ($attempt -eq 3) { throw }; Start-Sleep -Seconds 2 } }",
      "Retry a transient operation at most three times, waiting between attempts and rethrowing the final error.",
      "for ($attempt = 1; $attempt -le 3; $attempt++) {\n    try {\n        # Run the operation\n    } catch {\n        # Wait between bounded attempts; rethrow the final failure\n    }\n}\n",
      "for ($attempt = 1; $attempt -le 3; $attempt++) { try { Invoke-Operation -ErrorAction Stop; break } catch { if ($attempt -eq 3) { throw }; Start-Sleep -Seconds 2 } }",
      [
        ["Bounds the retry loop", "$attempt -le 3", "Set a finite maximum of three attempts."],
        ["Waits before retrying", "Start-Sleep -Seconds 2", "Add a short delay between attempts."],
        ["Surfaces the final failure", "if ($attempt -eq 3) { throw }", "Rethrow the last error when all attempts fail."],
      ],
    ],
  ],
];

POWERSHELLSCRIPTING_CHAPTERS.forEach((chapter, index) => {
  chapter.lessons.push(
    ...additions[index].map((lesson, lessonIndex) =>
      createPowerShellLesson(chapter, lessonIndex + 3, lesson),
    ),
  );
});

POWERSHELLSCRIPTING_CHAPTERS.push(
  createPowerShellChapter(5, "Reusable Functions and Modules", "package", "Design script components with stable contracts and automated tests.", [
    [
      "Define an Advanced Function",
      "An advanced function uses CmdletBinding to support common cmdlet behavior such as ShouldProcess and common parameters. Keep its output contract clear.",
      "function Get-EnvironmentReport {\n    [CmdletBinding()]\n    param()\n    [pscustomobject]@{ Environment = 'Test' }\n}",
      "Define an advanced function that returns a structured environment report.",
      "function Get-EnvironmentReport {\n    # Add advanced function metadata and structured output\n}\n",
      "function Get-EnvironmentReport {\n    [CmdletBinding()]\n    param()\n    [pscustomobject]@{ Environment = 'Test' }\n}",
      [["Declares an advanced function", "[CmdletBinding()]", "Add CmdletBinding to the function."], ["Returns structured data", "[pscustomobject]", "Emit a custom object instead of formatted text."]],
    ],
    [
      "Validate Parameters at the Boundary",
      "Parameter attributes encode valid inputs in the function contract. Reject unsupported values before the function performs work.",
      "param([Parameter(Mandatory)][ValidateSet('Dev', 'Test', 'Prod')][string]$Environment)",
      "Declare a mandatory Environment parameter that accepts only Dev, Test, or Prod.",
      "# Add a required, constrained Environment parameter\n",
      "param([Parameter(Mandatory)][ValidateSet('Dev', 'Test', 'Prod')][string]$Environment)",
      [["Requires an explicit value", "[Parameter(Mandatory)]", "Mark the parameter as mandatory."], ["Restricts allowed environments", "ValidateSet('Dev', 'Test', 'Prod')", "Constrain the value with ValidateSet."]],
    ],
    [
      "Support Pipeline Input",
      "ValueFromPipeline allows callers to stream objects into a function. Use begin, process, and end blocks to initialize once, handle each item, and finalize once.",
      "function ConvertTo-NameRecord {\n    [CmdletBinding()]\n    param([Parameter(ValueFromPipeline)][psobject]$InputObject)\n    process { [pscustomobject]@{ Name = $InputObject.Name } }\n}",
      "Accept objects from the pipeline and emit a record containing each object's Name.",
      "function ConvertTo-NameRecord {\n    [CmdletBinding()]\n    param(\n        # Accept pipeline input\n    )\n    process {\n        # Emit a structured record per item\n    }\n}\n",
      "function ConvertTo-NameRecord {\n    [CmdletBinding()]\n    param([Parameter(ValueFromPipeline)][psobject]$InputObject)\n    process { [pscustomobject]@{ Name = $InputObject.Name } }\n}",
      [["Accepts pipeline input", "ValueFromPipeline", "Use the ValueFromPipeline parameter attribute."], ["Processes each input record", "process {", "Handle incoming items in a process block."], ["Returns a structured object", "[pscustomobject]", "Emit a custom object for each item."]],
    ],
    [
      "Use ShouldProcess for Changes",
      "ShouldProcess exposes -WhatIf and -Confirm for functions that change state. Make the mutation conditional on ShouldProcess returning approval.",
      "function Remove-OldReport {\n    [CmdletBinding(SupportsShouldProcess)]\n    param([string]$Path)\n    if ($PSCmdlet.ShouldProcess($Path, 'Remove report')) { Remove-Item -LiteralPath $Path }\n}",
      "Create a function that supports WhatIf and removes a report only after approval.",
      "function Remove-OldReport {\n    # Support ShouldProcess and guard the change\n}\n",
      "function Remove-OldReport {\n    [CmdletBinding(SupportsShouldProcess)]\n    param([string]$Path)\n    if ($PSCmdlet.ShouldProcess($Path, 'Remove report')) { Remove-Item -LiteralPath $Path }\n}",
      [["Enables WhatIf and Confirm", "SupportsShouldProcess", "Set SupportsShouldProcess in CmdletBinding."], ["Guards the destructive action", "$PSCmdlet.ShouldProcess", "Call ShouldProcess before removing the file."], ["Uses a literal target path", "Remove-Item -LiteralPath", "Pass the target using LiteralPath."]],
    ],
    [
      "Separate Public and Private Module Commands",
      "A module manifest can explicitly export its supported public functions. Keep helpers private so internal implementation details do not become accidental API commitments.",
      "@{ RootModule = 'OpsTools.psm1'; FunctionsToExport = @('Get-EnvironmentReport') }",
      "Declare OpsTools.psm1 as the root module and export only Get-EnvironmentReport.",
      "# Define a minimal module manifest\n",
      "@{ RootModule = 'OpsTools.psm1'; FunctionsToExport = @('Get-EnvironmentReport') }",
      [["Declares the root module", "RootModule = 'OpsTools.psm1'", "Point the manifest to OpsTools.psm1."], ["Limits the public API", "FunctionsToExport", "Explicitly list exported functions."]],
    ],
    [
      "Test a Function Contract with Pester",
      "Unit tests should assert observable behavior and use deterministic fixtures. Test both a valid result and an invalid parameter value without depending on external systems.",
      "Describe 'Get-EnvironmentReport' {\n    It 'returns the selected environment' {\n        (Get-EnvironmentReport -Environment Test).Environment | Should -Be 'Test'\n    }\n}",
      "Assert that the function returns a report for the Test environment.",
      "Describe 'Get-EnvironmentReport' {\n    It 'returns the selected environment' {\n        # Assert the function's output contract\n    }\n}\n",
      "Describe 'Get-EnvironmentReport' {\n    It 'returns the selected environment' {\n        (Get-EnvironmentReport -Environment Test).Environment | Should -Be 'Test'\n    }\n}",
      [["Defines a Pester test", "Describe 'Get-EnvironmentReport'", "Create a Describe block for the function."], ["Asserts a concrete result", "Should -Be 'Test'", "Assert the returned environment value."]],
    ],
  ]),
  createPowerShellChapter(6, "Production Script Engineering", "settings", "Package, analyze, and optimize scripts for reliable delivery.", [
    [
      "Organize a Script Repository",
      "Separate module code, tests, configuration examples, and build automation so each has an obvious role. Keep generated output and local secrets out of source control.",
      "src\\OpsTools\\OpsTools.psm1\ntests\\OpsTools.Tests.ps1\nbuild.ps1",
      "Identify the module source, its tests, and the build entry point in a repository layout.",
      "# Sketch a source, tests, and build layout\n",
      "src\\OpsTools\\OpsTools.psm1\ntests\\OpsTools.Tests.ps1\nbuild.ps1",
      [["Separates source from tests", "src\\OpsTools\\OpsTools.psm1", "Place the module implementation under src."], ["Includes automated tests", "tests\\OpsTools.Tests.ps1", "Keep Pester tests in a dedicated tests folder."], ["Defines a build entry point", "build.ps1", "Include a repeatable build script."]],
    ],
    [
      "Run Static Analysis in CI",
      "PSScriptAnalyzer catches suspicious patterns and style problems before merge. Fail the pipeline on actionable errors and review suppressions individually.",
      "$issues = Invoke-ScriptAnalyzer -Path '.\\src' -Recurse -Severity Error, Warning\nif ($issues) { throw 'Static analysis reported issues.' }",
      "Analyze the source tree recursively and fail when the analyzer returns findings.",
      "# Analyze source and fail visibly on findings\n",
      "$issues = Invoke-ScriptAnalyzer -Path '.\\src' -Recurse -Severity Error, Warning\nif ($issues) { throw 'Static analysis reported issues.' }",
      [["Runs PowerShell static analysis", "Invoke-ScriptAnalyzer", "Use Invoke-ScriptAnalyzer against the source tree."], ["Analyzes nested source files", "-Recurse", "Include nested files in the analysis."], ["Fails on findings", "throw", "Make findings fail the check rather than passing silently."]],
    ],
    [
      "Measure Before Optimizing",
      "Measure-Command provides a repeatable timing signal for a code path. Profile realistic data, compare equivalent work, and optimize only after identifying a measurable bottleneck.",
      "$duration = Measure-Command { Get-Process | Where-Object CPU -gt 1 }\n$duration.TotalMilliseconds",
      "Measure a process-filter query and read its elapsed milliseconds.",
      "# Measure the target operation before tuning it\n",
      "$duration = Measure-Command { Get-Process | Where-Object CPU -gt 1 }\n$duration.TotalMilliseconds",
      [["Measures the operation", "Measure-Command", "Use Measure-Command around the query."], ["Reads elapsed time", "TotalMilliseconds", "Inspect the elapsed milliseconds value."]],
    ],
    [
      "Bound Parallel Work",
      "Parallel execution can improve independent work but adds overhead and can overwhelm downstream services. Set a deliberate throttle and keep shared state out of worker script blocks.",
      "$servers | ForEach-Object -Parallel { Test-Connection -ComputerName $_ -Count 1 -Quiet } -ThrottleLimit 4",
      "Check independent server reachability with no more than four parallel workers.",
      "$servers |\n    # Process independent targets here\n",
      "$servers | ForEach-Object -Parallel { Test-Connection -ComputerName $_ -Count 1 -Quiet } -ThrottleLimit 4",
      [["Uses parallel pipeline processing", "ForEach-Object -Parallel", "Run independent targets with the parallel parameter."], ["Limits concurrent work", "-ThrottleLimit 4", "Set the concurrency limit to four."]],
    ],
    [
      "Make Logs Actionable",
      "Structured log entries should carry a timestamp, operation, target, and outcome. Use an appropriate information stream and avoid logging credentials or sensitive request data.",
      "[pscustomobject]@{ TimeUtc = [datetime]::UtcNow; Operation = 'Inventory'; Target = $computer; Outcome = 'Success' } | ConvertTo-Json -Compress | Write-Information",
      "Emit a compact structured information event with UTC time, operation, target, and outcome.",
      "# Create a structured operational event without secrets\n",
      "[pscustomobject]@{ TimeUtc = [datetime]::UtcNow; Operation = 'Inventory'; Target = $computer; Outcome = 'Success' } | ConvertTo-Json -Compress | Write-Information",
      [["Creates a structured event", "[pscustomobject]", "Represent the log entry as a custom object."], ["Records a UTC timestamp", "TimeUtc = [datetime]::UtcNow", "Use the UTC clock for the timestamp."], ["Writes to an information stream", "Write-Information", "Emit the event with Write-Information."]],
    ],
    [
      "Release a Versioned Module",
      "A release should include a versioned manifest, passing tests, and a change summary. Tag the exact tested source revision so the published artifact can be traced back to its inputs.",
      "Publish-Module -Path '.\\src\\OpsTools' -Repository 'PSGallery'",
      "Publish the validated OpsTools module to its configured repository.",
      "# Publish only after tests and version checks pass\n",
      "Publish-Module -Path '.\\src\\OpsTools' -Repository 'PSGallery'",
      [["Publishes the module artifact", "Publish-Module", "Use Publish-Module for the release."], ["Targets the module source", "-Path '.\\src\\OpsTools'", "Point to the validated module directory."], ["Names the repository", "-Repository 'PSGallery'", "Specify the intended PowerShell repository."]],
    ],
  ]),
);

export const POWERSHELLSCRIPTING_LESSONS = POWERSHELLSCRIPTING_CHAPTERS.flatMap(ch => ch.lessons);
export const POWERSHELLSCRIPTING_TOTAL_XP = POWERSHELLSCRIPTING_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
