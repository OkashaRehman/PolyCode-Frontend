import {
  createPowerShellChapter,
  createPowerShellLesson,
} from "../../shared/powershellLessonFactory";

export const POWERSHELLPROJECTS_CHAPTERS = [
  {
    id: "ch-1",
    title: "System Audit Script",
    icon: "clipboard",
    desc: "Create a basic system audit script.",
    lessons: [
      {
        id: "ch-1-l1",
        title: "Gathering System Info",
        chapterTitle: "System Audit Script",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Gathering System Info. Collecting basic computer info." },
          { type: "code", language: "powershell", content: "Get-CimInstance Win32_ComputerSystem" }
        ],
        challenge: {
          title: "Practice: Gathering System Info",
          description: [
            { type: "text", content: "Write a PowerShell command for Gathering System Info." }
          ],
          starterCode: "",
          solutionCode: "Get-CimInstance Win32_ComputerSystem",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-CimInstance"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-1-l2",
        title: "Exporting to CSV",
        chapterTitle: "System Audit Script",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Exporting to CSV. Exporting the collected data." },
          { type: "code", language: "powershell", content: "$data = [pscustomobject]@{ Name = 'sample-host'; Status = 'Healthy' }; $csvPath = [IO.Path]::GetTempFileName(); $data | Export-Csv -LiteralPath $csvPath -NoTypeInformation; Import-Csv -LiteralPath $csvPath; Remove-Item -LiteralPath $csvPath" }
        ],
        challenge: {
          title: "Practice: Exporting to CSV",
          description: [
            { type: "text", content: "Write a PowerShell command for Exporting to CSV." }
          ],
          starterCode: "",
          solutionCode: "$data = [pscustomobject]@{ Name = 'sample-host'; Status = 'Healthy' }; $csvPath = [IO.Path]::GetTempFileName(); $data | Export-Csv -LiteralPath $csvPath -NoTypeInformation; Import-Csv -LiteralPath $csvPath; Remove-Item -LiteralPath $csvPath",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$data"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-2",
    title: "Log Parsing Tool",
    icon: "file-text",
    desc: "Parse and analyze log files.",
    lessons: [
      {
        id: "ch-2-l1",
        title: "Reading Event Logs",
        chapterTitle: "Log Parsing Tool",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Reading Event Logs. Getting event log entries." },
          { type: "code", language: "powershell", content: "Get-WinEvent -FilterHashtable @{ LogName = 'System' } -MaxEvents 50" }
        ],
        challenge: {
          title: "Practice: Reading Event Logs",
          description: [
            { type: "text", content: "Write a PowerShell command for Reading Event Logs." }
          ],
          starterCode: "",
          solutionCode: "Get-WinEvent -FilterHashtable @{ LogName = 'System' } -MaxEvents 50",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-WinEvent"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-2-l2",
        title: "Filtering Errors",
        chapterTitle: "Log Parsing Tool",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Filtering Errors. Extracting only Error entries." },
          { type: "code", language: "powershell", content: "Get-WinEvent -FilterHashtable @{ LogName = 'System'; Level = 2 } -MaxEvents 50" }
        ],
        challenge: {
          title: "Practice: Filtering Errors",
          description: [
            { type: "text", content: "Write a PowerShell command for Filtering Errors." }
          ],
          starterCode: "",
          solutionCode: "Get-WinEvent -FilterHashtable @{ LogName = 'System'; Level = 2 } -MaxEvents 50",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-WinEvent"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-3",
    title: "User Onboarding",
    icon: "user-plus",
    desc: "Automate user creation.",
    lessons: [
      {
        id: "ch-3-l1",
        title: "Creating the Template",
        chapterTitle: "User Onboarding",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Creating the Template. Defining a user template." },
          { type: "code", language: "powershell", content: "$user = @{Name='Jane'; Department='IT'}" }
        ],
        challenge: {
          title: "Practice: Creating the Template",
          description: [
            { type: "text", content: "Write a PowerShell command for Creating the Template." }
          ],
          starterCode: "",
          solutionCode: "$user = @{Name='Jane'; Department='IT'}",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$user"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-3-l2",
        title: "Bulk Provisioning",
        chapterTitle: "User Onboarding",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Bulk Provisioning. Reading from CSV to create users." },
          { type: "code", language: "powershell", content: "@([pscustomobject]@{ Name = 'Jane Doe'; SamAccountName = 'jdoe' }) | ForEach-Object { New-ADUser -Name $_.Name -SamAccountName $_.SamAccountName -WhatIf }" }
        ],
        challenge: {
          title: "Practice: Bulk Provisioning",
          description: [
            { type: "text", content: "Write a PowerShell command for Bulk Provisioning." }
          ],
          starterCode: "",
          solutionCode: "@([pscustomobject]@{ Name = 'Jane Doe'; SamAccountName = 'jdoe' }) | ForEach-Object { New-ADUser -Name $_.Name -SamAccountName $_.SamAccountName -WhatIf }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["New-ADUser"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-4",
    title: "Advanced API Integration",
    icon: "link",
    desc: "Working with REST APIs.",
    lessons: [
      {
        id: "ch-4-l1",
        title: "Invoke-RestMethod",
        chapterTitle: "Advanced API Integration",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Invoke-RestMethod. Calling a REST API." },
          { type: "code", language: "powershell", content: "Invoke-RestMethod -Uri 'https://api.github.com/users'" }
        ],
        challenge: {
          title: "Practice: Invoke-RestMethod",
          description: [
            { type: "text", content: "Write a PowerShell command for Invoke-RestMethod." }
          ],
          starterCode: "",
          solutionCode: "Invoke-RestMethod -Uri 'https://api.github.com/users'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Invoke-RestMethod"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-4-l2",
        title: "Parsing JSON Responses",
        chapterTitle: "Advanced API Integration",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Parsing JSON Responses. Handling JSON data." },
          { type: "code", language: "powershell", content: "$response = [pscustomobject]@{ data = @([pscustomobject]@{ name = 'Ada' }) }; $response.data[0].name" }
        ],
        challenge: {
          title: "Practice: Parsing JSON Responses",
          description: [
            { type: "text", content: "Write a PowerShell command for Parsing JSON Responses." }
          ],
          starterCode: "",
          solutionCode: "$response = [pscustomobject]@{ data = @([pscustomobject]@{ name = 'Ada' }) }; $response.data[0].name",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$response.data[0].name"],
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
      "Collect a Stable Host Inventory",
      "An audit report is only useful when its fields are consistent across machines. Collect a small, explicit schema and avoid capturing secrets or unnecessary personal data.",
      "$os = Get-CimInstance Win32_OperatingSystem\n[pscustomobject]@{ ComputerName = $os.CSName; Caption = $os.Caption; Version = $os.Version }",
      "Create one host inventory object containing the computer name, OS caption, and version.",
      "$os = Get-CimInstance Win32_OperatingSystem\n# Return the three audit fields as an object\n",
      "$os = Get-CimInstance Win32_OperatingSystem\n[pscustomobject]@{ ComputerName = $os.CSName; Caption = $os.Caption; Version = $os.Version }",
      [
        ["Queries OS information", "Get-CimInstance Win32_OperatingSystem", "Collect operating-system data with CIM."],
        ["Returns structured inventory", "[pscustomobject]", "Emit a custom object with named fields."],
        ["Includes the host identity", "ComputerName = $os.CSName", "Include the computer name in the report."],
      ],
    ],
    [
      "Add Service Health to the Audit",
      "Combine separate inventory sources into a clear audit record. Keep collection and presentation separate so the same data can feed a console view, CSV, or test.",
      "$services = Get-Service | Where-Object Status -ne 'Running'\n$services | Select-Object Name, Status",
      "Find services that are not running and select their names and statuses for the report.",
      "$services = Get-Service\n# Select only services requiring attention\n",
      "$services = Get-Service | Where-Object Status -ne 'Running'\n$services | Select-Object Name, Status",
      [
        ["Finds services needing attention", "Where-Object Status -ne 'Running'", "Filter out services that are already running."],
        ["Returns audit fields", "Select-Object Name, Status", "Select service name and status."],
      ],
    ],
    [
      "Write an Audit Report Atomically",
      "Write a report to a temporary path first and move it into place only after the export succeeds. This avoids leaving a partially written file that looks complete.",
      "$tempPath = '.\\audit.csv.tmp'\n$data | Export-Csv -Path $tempPath -NoTypeInformation\nMove-Item -Path $tempPath -Destination '.\\audit.csv' -Force",
      "Export the collected data to a temporary CSV, then move it to the final report path.",
      "$tempPath = '.\\audit.csv.tmp'\n# Export first and publish only after a successful write\n",
      "$tempPath = '.\\audit.csv.tmp'\n$data | Export-Csv -Path $tempPath -NoTypeInformation\nMove-Item -Path $tempPath -Destination '.\\audit.csv' -Force",
      [
        ["Writes the intermediate report", "Export-Csv -Path $tempPath", "Export to the temporary file first."],
        ["Publishes the completed report", "Move-Item -Path $tempPath", "Move the finished file to the destination."],
      ],
    ],
    [
      "Test the Audit Contract",
      "A useful audit script has a predictable output contract. Test required fields and edge cases with local fixtures so tests do not depend on the workstation's real services.",
      "$record = [pscustomobject]@{ ComputerName = 'test-host'; Version = '1.0' }\n$record.PSObject.Properties.Name | Should -Contain 'ComputerName'",
      "Assert that an audit record includes the ComputerName field using a local test object.",
      "$record = [pscustomobject]@{ ComputerName = 'test-host'; Version = '1.0' }\n# Assert the output contract\n",
      "$record.PSObject.Properties.Name | Should -Contain 'ComputerName'",
      [
        ["Inspects the object schema", "PSObject.Properties.Name", "Inspect the properties on the returned object."],
        ["Asserts the required field", "Should -Contain 'ComputerName'", "Assert that ComputerName is part of the contract."],
      ],
    ],
  ],
  [
    [
      "Stream Large Log Files",
      "Process large logs line by line instead of loading the entire file into memory. Streaming lets a parser handle files larger than available memory and begin work sooner.",
      "Get-Content -LiteralPath $logPath | ForEach-Object { $line = $_; if ($line) { $line } }",
      "Read the log as a stream and skip empty lines.",
      "Get-Content -LiteralPath $logPath |\n    # Process one non-empty line at a time\n",
      "Get-Content -LiteralPath $logPath | ForEach-Object { $line = $_; if ($line) { $line } }",
      [
        ["Reads the log by path", "Get-Content -LiteralPath $logPath", "Read the file using its literal path."],
        ["Processes each line", "ForEach-Object", "Handle each streamed line in the pipeline."],
      ],
    ],
    [
      "Parse Structured Log Fields",
      "Use named capture groups to turn a text line into structured fields. Validate the match before reading captures so malformed lines are reported rather than misclassified.",
      "if ($line -match '^(?<Time>\\S+)\\s+(?<Level>\\w+)\\s+(?<Message>.+)$') { [pscustomobject]@{ Time = $Matches.Time; Level = $Matches.Level; Message = $Matches.Message } }",
      "Parse a timestamp, severity, and message from a log line into a custom object.",
      "if ($line -match '...') {\n    # Return Time, Level, and Message fields\n}\n",
      "if ($line -match '^(?<Time>\\S+)\\s+(?<Level>\\w+)\\s+(?<Message>.+)$') { [pscustomobject]@{ Time = $Matches.Time; Level = $Matches.Level; Message = $Matches.Message } }",
      [
        ["Uses named regex groups", "(?<Level>", "Create a named capture group for the severity."],
        ["Reads parsed captures", "$Matches.Message", "Read the parsed message from the Matches automatic variable."],
        ["Creates a structured record", "[pscustomobject]", "Emit parsed fields as a custom object."],
      ],
    ],
    [
      "Filter Events by Severity and Time",
      "Apply severity and time filters before generating a report. Parse timestamps once, use explicit comparison operators, and document the expected time zone for production logs.",
      "$cutoff = (Get-Date).AddHours(-24)\n$events | Where-Object { $_.Level -in 'Error', 'Critical' -and [datetime]$_.Time -ge $cutoff }",
      "Keep Error or Critical events from the last 24 hours.",
      "$cutoff = (Get-Date).AddHours(-24)\n# Filter by severity and timestamp\n",
      "$events | Where-Object { $_.Level -in 'Error', 'Critical' -and [datetime]$_.Time -ge $cutoff }",
      [
        ["Selects relevant severity levels", "$_.Level -in 'Error', 'Critical'", "Keep Error and Critical entries."],
        ["Applies a time boundary", "[datetime]$_.Time -ge $cutoff", "Compare the parsed timestamp with the cutoff."],
      ],
    ],
    [
      "Summarize and Export Log Findings",
      "Summaries help operators prioritize findings, while detailed rows preserve evidence. Export both with explicit schemas and avoid formatting objects before machine-readable output.",
      "$summary = $events | Group-Object Level | Select-Object Name, Count\n$events | Export-Csv -Path .\\findings.csv -NoTypeInformation",
      "Create a count by severity and export the detailed findings to CSV.",
      "# Build a summary and export the detail records\n",
      "$summary = $events | Group-Object Level | Select-Object Name, Count\n$events | Export-Csv -Path .\\findings.csv -NoTypeInformation",
      [
        ["Aggregates by severity", "Group-Object Level", "Group findings on their Level."],
        ["Exports detailed evidence", "Export-Csv", "Export the event rows as CSV."],
      ],
    ],
  ],
  [
    [
      "Validate an Onboarding Request",
      "Validate required fields before creating accounts or changing permissions. Reject malformed input at the start so a bulk run cannot partially provision bad records.",
      "if ([string]::IsNullOrWhiteSpace($request.UserPrincipalName)) { throw 'UserPrincipalName is required.' }",
      "Reject an onboarding request that has no UserPrincipalName.",
      "$request = [pscustomobject]@{ UserPrincipalName = '' }\n# Validate required onboarding fields\n",
      "if ([string]::IsNullOrWhiteSpace($request.UserPrincipalName)) { throw 'UserPrincipalName is required.' }",
      [
        ["Checks the required identity field", "$request.UserPrincipalName", "Validate the request's UserPrincipalName."],
        ["Rejects invalid requests", "throw", "Throw before provisioning when the value is missing."],
      ],
    ],
    [
      "Make Provisioning Idempotent",
      "An idempotent onboarding step checks current state before creating a resource. Safe reruns reduce duplicates and make recovery from interrupted batch jobs more reliable.",
      "$user = Get-ADUser -Filter \"SamAccountName -eq '$samAccountName'\" -ErrorAction SilentlyContinue\nif (-not $user) { New-ADUser -SamAccountName $samAccountName -WhatIf }",
      "Check whether an account exists and preview creation only when it does not.",
      "$user = Get-ADUser -Filter \"SamAccountName -eq '$samAccountName'\" -ErrorAction SilentlyContinue\n# Create only when missing and preview the change\n",
      "$user = Get-ADUser -Filter \"SamAccountName -eq '$samAccountName'\" -ErrorAction SilentlyContinue\nif (-not $user) { New-ADUser -SamAccountName $samAccountName -WhatIf }",
      [
        ["Checks current account state", "Get-ADUser", "Look up the account before creating it."],
        ["Avoids duplicate creation", "if (-not $user)", "Create only when the lookup found no user."],
        ["Keeps the change in preview", "-WhatIf", "Preview account creation rather than applying it."],
      ],
    ],
    [
      "Assign Least-Privilege Group Access",
      "Provision only the access groups required by the approved role. Keep role-to-group mappings in reviewed configuration and log the requested change for later audit.",
      "Add-ADGroupMember -Identity 'App-Readers' -Members $samAccountName -WhatIf",
      "Preview adding the account to the read-only App-Readers group.",
      "# Use the approved role-to-group mapping\n",
      "Add-ADGroupMember -Identity 'App-Readers' -Members $samAccountName -WhatIf",
      [
        ["Targets the least-privilege group", "-Identity 'App-Readers'", "Use the approved read-only group."],
        ["Previews the membership change", "-WhatIf", "Use WhatIf to review before applying."],
      ],
    ],
    [
      "Report Batch Provisioning Outcomes",
      "Track each input row as a success or failure and include enough context to investigate it. Do not stop reporting after the first failure or label unprocessed rows as successful.",
      "$results = foreach ($request in $requests) { try { [pscustomobject]@{ User = $request.UserPrincipalName; Status = 'Validated' } } catch { [pscustomobject]@{ User = $request.UserPrincipalName; Status = 'Failed'; Error = $_.Exception.Message } } }",
      "Produce a per-user outcome object and retain an error message when a request fails.",
      "$results = foreach ($request in $requests) {\n    try {\n        # Return a success record\n    } catch {\n        # Return a failure record with context\n    }\n}\n",
      "$results = foreach ($request in $requests) { try { [pscustomobject]@{ User = $request.UserPrincipalName; Status = 'Validated' } } catch { [pscustomobject]@{ User = $request.UserPrincipalName; Status = 'Failed'; Error = $_.Exception.Message } } }",
      [
        ["Processes every request", "foreach ($request in $requests)", "Iterate over each onboarding request."],
        ["Captures failed outcomes", "catch", "Record failures in a catch block."],
        ["Returns structured results", "[pscustomobject]", "Emit a result object for each request."],
      ],
    ],
  ],
  [
    [
      "Send API Requests with Safe Headers",
      "Build request headers from a runtime credential source and never commit bearer tokens. Use the API's documented authentication scheme and avoid printing sensitive headers in logs.",
      "$headers = @{ Authorization = \"Bearer $token\"; Accept = 'application/json' }\nInvoke-RestMethod -Uri $uri -Headers $headers -Method Get",
      "Send a GET request with a runtime bearer token and JSON accept header.",
      "$headers = @{\n    # Add runtime authorization and content negotiation\n}\n# Send the request\n",
      "$headers = @{ Authorization = \"Bearer $token\"; Accept = 'application/json' }\nInvoke-RestMethod -Uri $uri -Headers $headers -Method Get",
      [
        ["Builds authorization at runtime", "Authorization = \"Bearer $token\"", "Use the runtime token in the Authorization header."],
        ["Uses Invoke-RestMethod", "Invoke-RestMethod", "Send the request with Invoke-RestMethod."],
      ],
    ],
    [
      "Handle API Pagination",
      "Follow the API's documented continuation token or next-link field until no further page exists. Bound requests and preserve the same authentication and filtering context for every page.",
      "while ($nextLink) { $page = Invoke-RestMethod -Uri $nextLink -Headers $headers; $items += $page.value; $nextLink = $page.nextLink }",
      "Follow nextLink until the API has no more pages and accumulate the returned values.",
      "$items = @()\n$nextLink = $uri\nwhile ($nextLink) {\n    # Request one page and update nextLink\n}\n",
      "while ($nextLink) { $page = Invoke-RestMethod -Uri $nextLink -Headers $headers; $items += $page.value; $nextLink = $page.nextLink }",
      [
        ["Requests each page", "Invoke-RestMethod", "Use Invoke-RestMethod for the current page URL."],
        ["Follows the continuation link", "$nextLink = $page.nextLink", "Update the loop using the response's nextLink."],
      ],
    ],
    [
      "Retry Rate-Limited Requests",
      "Respect server-provided retry guidance for HTTP 429 responses. Use bounded retries with backoff, distinguish transient errors from permanent failures, and report when the retry budget is exhausted.",
      "for ($attempt = 1; $attempt -le 4; $attempt++) { try { Invoke-RestMethod -Uri $uri -ErrorAction Stop; break } catch { if ($attempt -eq 4) { throw }; Start-Sleep -Seconds ([math]::Pow(2, $attempt)) } }",
      "Retry a failed API request with bounded exponential delays, then throw after the fourth failure.",
      "for ($attempt = 1; $attempt -le 4; $attempt++) {\n    try {\n        # Request the API\n    } catch {\n        # Back off or surface the final failure\n    }\n}\n",
      "for ($attempt = 1; $attempt -le 4; $attempt++) { try { Invoke-RestMethod -Uri $uri -ErrorAction Stop; break } catch { if ($attempt -eq 4) { throw }; Start-Sleep -Seconds ([math]::Pow(2, $attempt)) } }",
      [
        ["Bounds the retry count", "$attempt -le 4", "Use a finite four-attempt limit."],
        ["Uses exponential backoff", "[math]::Pow(2, $attempt)", "Increase the wait between retries."],
        ["Rethrows the final failure", "if ($attempt -eq 4) { throw }", "Stop retrying and surface the last error."],
      ],
    ],
    [
      "Test API Logic with Mocked Responses",
      "Unit tests should not depend on a live API or real credentials. Mock the network boundary and assert how the script transforms a representative response and handles failures.",
      "Mock Invoke-RestMethod { [pscustomobject]@{ value = @([pscustomobject]@{ id = 1 }) } }\n$result = Get-RemoteItems\n$result.Count | Should -Be 1",
      "Mock the HTTP call and assert that the wrapper returns one item.",
      "# Mock the HTTP boundary before calling the wrapper\n",
      "Mock Invoke-RestMethod { [pscustomobject]@{ value = @([pscustomobject]@{ id = 1 }) } }\n$result = Get-RemoteItems\n$result.Count | Should -Be 1",
      [
        ["Mocks the network boundary", "Mock Invoke-RestMethod", "Mock Invoke-RestMethod rather than calling the live API."],
        ["Asserts the returned behavior", "Should -Be 1", "Assert the wrapper returns the expected item count."],
      ],
    ],
  ],
];

POWERSHELLPROJECTS_CHAPTERS.forEach((chapter, index) => {
  chapter.lessons.push(
    ...additions[index].map((lesson, lessonIndex) =>
      createPowerShellLesson(chapter, lessonIndex + 3, lesson),
    ),
  );
});

POWERSHELLPROJECTS_CHAPTERS.push(
  createPowerShellChapter(5, "Build a Production-Ready Module", "package", "Turn useful scripts into tested, documented, reusable tools.", [
    [
      "Define a Stable Tool Contract",
      "A reusable command needs an explicit input contract, predictable output, and useful errors. Use parameter validation to reject invalid values before touching the filesystem.",
      "function Get-LogSummary {\n    [CmdletBinding()]\n    param([Parameter(Mandatory)][ValidateScript({ Test-Path -LiteralPath $_ })][string]$Path)\n    Get-Content -LiteralPath $Path\n}",
      "Define a function that requires a path and validates that the file exists.",
      "function Get-LogSummary {\n    [CmdletBinding()]\n    param(\n        # Require and validate the input path\n    )\n}\n",
      "function Get-LogSummary {\n    [CmdletBinding()]\n    param([Parameter(Mandatory)][ValidateScript({ Test-Path -LiteralPath $_ })][string]$Path)\n    Get-Content -LiteralPath $Path\n}",
      [["Requires an input path", "[Parameter(Mandatory)]", "Make the path parameter mandatory."], ["Validates the file before use", "ValidateScript", "Check that the literal path exists in a validation attribute."], ["Reads the validated path", "Get-Content -LiteralPath", "Use Get-Content with LiteralPath."]],
    ],
    [
      "Separate Collection from Reporting",
      "Keep data collection separate from report formatting so the same results can be tested, exported, or displayed differently. Return a structured object with stable property names.",
      "[pscustomobject]@{ ComputerName = $computer; CheckedAt = [datetime]::UtcNow; Status = $status }",
      "Create a structured health record with the target, UTC check time, and status.",
      "# Return a structured record rather than a formatted string\n",
      "[pscustomobject]@{ ComputerName = $computer; CheckedAt = [datetime]::UtcNow; Status = $status }",
      [["Creates a structured record", "[pscustomobject]", "Return a custom object."], ["Records UTC time", "CheckedAt = [datetime]::UtcNow", "Use a UTC timestamp field."], ["Includes target identity", "ComputerName = $computer", "Include the target computer name."]],
    ],
    [
      "Add Actionable Error Context",
      "Catch errors at the boundary where you can add useful context, then rethrow or emit an explicit failure result. Avoid swallowing exceptions or returning success-shaped defaults.",
      "try { Get-Content -LiteralPath $path -ErrorAction Stop } catch { throw \"Failed to read '$path': $($_.Exception.Message)\" }",
      "Wrap a file read with a terminating error and rethrow it with path context.",
      "try {\n    # Perform the file read with terminating errors\n} catch {\n    # Add path context and preserve the failure\n}\n",
      "try { Get-Content -LiteralPath $path -ErrorAction Stop } catch { throw \"Failed to read '$path': $($_.Exception.Message)\" }",
      [["Makes the read failure terminating", "-ErrorAction Stop", "Use ErrorAction Stop on the file read."], ["Adds useful path context", "Failed to read '$path'", "Include the failing path in the error."], ["Preserves the failure", "throw", "Rethrow rather than silently continuing."]],
    ],
    [
      "Make Output Deterministic",
      "Deterministic project output is easier to test and compare. Sort records by stable keys and use explicit property selection before serialization.",
      "$records | Sort-Object ComputerName | Select-Object ComputerName, Status | ConvertTo-Json -Depth 3",
      "Sort health records by computer, select a stable schema, and serialize as JSON.",
      "$records |\n    # Sort, select stable fields, and serialize\n",
      "$records | Sort-Object ComputerName | Select-Object ComputerName, Status | ConvertTo-Json -Depth 3",
      [["Sorts by a stable key", "Sort-Object ComputerName", "Sort the records by computer name."], ["Defines an output schema", "Select-Object ComputerName, Status", "Select the intended fields explicitly."], ["Serializes structured results", "ConvertTo-Json -Depth 3", "Convert the results to JSON."]],
    ],
    [
      "Test Without Real Infrastructure",
      "Unit tests should isolate external boundaries with fixtures or mocks. Assert both the successful output shape and expected failure behavior without relying on production hosts.",
      "Mock Get-Service { [pscustomobject]@{ Name = 'Spooler'; Status = 'Running' } }\n$result = Get-ServiceHealth -Name 'Spooler'\n$result.Status | Should -Be 'Running'",
      "Mock Get-Service and assert that the health wrapper returns Running.",
      "# Mock the system boundary, then test the wrapper result\n",
      "Mock Get-Service { [pscustomobject]@{ Name = 'Spooler'; Status = 'Running' } }\n$result = Get-ServiceHealth -Name 'Spooler'\n$result.Status | Should -Be 'Running'",
      [["Mocks the infrastructure dependency", "Mock Get-Service", "Replace the real service lookup with a test mock."], ["Exercises the project function", "Get-ServiceHealth", "Call the wrapper under test."], ["Asserts expected behavior", "Should -Be 'Running'", "Assert the returned status."]],
    ],
    [
      "Document the Tool Interface",
      "Project documentation should show purpose, supported parameters, permissions, examples, output shape, and failure modes. Keep examples safe and label commands that make changes.",
      "Get-Help Get-ServiceHealth -Detailed",
      "Inspect the detailed help for the published Get-ServiceHealth command.",
      "# Retrieve the full user-facing command documentation\n",
      "Get-Help Get-ServiceHealth -Detailed",
      [["Looks up the public command", "Get-Help Get-ServiceHealth", "Request help for the command users will call."], ["Includes detailed guidance", "-Detailed", "Display the detailed help sections."]],
    ],
  ]),
  createPowerShellChapter(6, "Automated Delivery and Operations", "shuffle", "Ship repeatable projects with validation, safe deployment, and observability.", [
    [
      "Validate Project Inputs",
      "Treat configuration and imported records as untrusted until validated. Check required properties, ranges, and allowed values before starting a batch operation.",
      "if ($config.Environment -notin 'Test', 'Production') { throw 'Environment must be Test or Production.' }",
      "Reject a configuration unless its environment is Test or Production.",
      "# Validate configuration before making external calls\n",
      "if ($config.Environment -notin 'Test', 'Production') { throw 'Environment must be Test or Production.' }",
      [["Restricts allowed environments", "$config.Environment -notin 'Test', 'Production'", "Reject values outside Test and Production."], ["Stops on invalid configuration", "throw", "Throw an explicit configuration error."]],
    ],
    [
      "Add a Preflight Check",
      "A preflight phase verifies dependencies and target reachability before a deployment begins. Fail early with an actionable diagnostic instead of discovering a missing prerequisite halfway through.",
      "if (-not (Get-Module -ListAvailable -Name Az.Accounts)) { throw 'Install the Az.Accounts module before deployment.' }",
      "Stop the deployment when Az.Accounts is not available.",
      "# Check required modules before deployment\n",
      "if (-not (Get-Module -ListAvailable -Name Az.Accounts)) { throw 'Install the Az.Accounts module before deployment.' }",
      [["Checks the required module", "Get-Module -ListAvailable -Name Az.Accounts", "Check whether Az.Accounts is installed."], ["Fails with an actionable message", "throw", "Stop and explain the missing prerequisite."]],
    ],
    [
      "Use a Reviewable Deployment Plan",
      "Separate planning from application. Present targets and proposed actions for review, then use ShouldProcess or WhatIf before executing high-impact changes.",
      "New-AzResourceGroupDeployment -ResourceGroupName $group -TemplateFile '.\\main.json' -WhatIf",
      "Preview the infrastructure deployment against the selected resource group.",
      "# Preview the reviewed deployment before applying it\n",
      "New-AzResourceGroupDeployment -ResourceGroupName $group -TemplateFile '.\\main.json' -WhatIf",
      [["Uses the selected deployment scope", "-ResourceGroupName $group", "Target the intended resource group."], ["Uses the reviewed template", "-TemplateFile '.\\main.json'", "Specify the template file explicitly."], ["Previews instead of applying", "-WhatIf", "Include WhatIf during the review phase."]],
    ],
    [
      "Run Tests and Analysis Before Release",
      "A release gate should run static analysis and tests against the exact source being packaged. Stop the pipeline when any check fails so broken output is never published as a success.",
      "Invoke-ScriptAnalyzer -Path '.\\src' -Recurse -Severity Error\n$testResult = Invoke-Pester -Path '.\\tests' -CI -PassThru\nif ($testResult.FailedCount -gt 0) { throw 'Pester tests failed.' }",
      "Run recursive error-level analysis and the Pester suite in CI mode.",
      "# Gate release on analysis and tests\n",
      "Invoke-ScriptAnalyzer -Path '.\\src' -Recurse -Severity Error\n$testResult = Invoke-Pester -Path '.\\tests' -CI -PassThru\nif ($testResult.FailedCount -gt 0) { throw 'Pester tests failed.' }",
      [["Runs static analysis", "Invoke-ScriptAnalyzer", "Analyze source before release."], ["Runs the Pester suite", "Invoke-Pester -Path '.\\tests' -CI -PassThru", "Capture the Pester result in CI mode."], ["Fails when tests fail", "$testResult.FailedCount -gt 0", "Fail the release gate when Pester reports failures."], ["Checks nested code", "-Recurse", "Include nested source files in analysis."]],
    ],
    [
      "Retry Transient Calls with Limits",
      "Retry only operations that are safe to repeat. Bound the attempt count, pause between attempts, and rethrow after the budget is exhausted.",
      "for ($attempt = 1; $attempt -le 3; $attempt++) { try { Invoke-RestMethod -Uri $uri -ErrorAction Stop; break } catch { if ($attempt -eq 3) { throw }; Start-Sleep -Seconds 2 } }",
      "Retry a safe API read no more than three times and rethrow the final error.",
      "for ($attempt = 1; $attempt -le 3; $attempt++) {\n    try {\n        # Call the API\n    } catch {\n        # Wait between attempts and rethrow the final error\n    }\n}\n",
      "for ($attempt = 1; $attempt -le 3; $attempt++) { try { Invoke-RestMethod -Uri $uri -ErrorAction Stop; break } catch { if ($attempt -eq 3) { throw }; Start-Sleep -Seconds 2 } }",
      [["Bounds the retry budget", "$attempt -le 3", "Use a maximum of three attempts."], ["Waits before retrying", "Start-Sleep -Seconds 2", "Add a delay between attempts."], ["Surfaces exhausted retries", "if ($attempt -eq 3) { throw }", "Rethrow on the final failed attempt."]],
    ],
    [
      "Publish Operational Results",
      "Successful automation should leave evidence of what it changed, what it observed, and where the output was written. Include run identifiers and status while excluding secrets.",
      "[pscustomobject]@{ RunId = $runId; CompletedAtUtc = [datetime]::UtcNow; Status = 'Completed'; OutputPath = $outputPath } | ConvertTo-Json -Compress",
      "Create a compact completion record with a run ID, UTC time, status, and output path.",
      "# Emit a machine-readable, non-secret completion record\n",
      "[pscustomobject]@{ RunId = $runId; CompletedAtUtc = [datetime]::UtcNow; Status = 'Completed'; OutputPath = $outputPath } | ConvertTo-Json -Compress",
      [["Creates structured run evidence", "[pscustomobject]", "Represent completion as an object."], ["Records UTC completion time", "CompletedAtUtc = [datetime]::UtcNow", "Use a UTC timestamp."], ["Serializes machine-readable output", "ConvertTo-Json -Compress", "Emit compact JSON."]],
    ],
  ]),
);

export const POWERSHELLPROJECTS_LESSONS = POWERSHELLPROJECTS_CHAPTERS.flatMap(ch => ch.lessons);
export const POWERSHELLPROJECTS_TOTAL_XP = POWERSHELLPROJECTS_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
