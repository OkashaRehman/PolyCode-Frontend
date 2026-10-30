import {
  createPowerShellChapter,
  createPowerShellLesson,
} from "../../shared/powershellLessonFactory";

export const POWERSHELLADMINISTRATION_CHAPTERS = [
  {
    id: "ch-1",
    title: "WMI and CIM",
    icon: "cpu",
    desc: "Managing systems via WMI and CIM.",
    lessons: [
      {
        id: "ch-1-l1",
        title: "Introduction to WMI",
        chapterTitle: "WMI and CIM",
        xp: 20,
        theory: [
          { type: "text", content: "WMI data can be queried with the modern CIM cmdlets. Use Get-CimInstance for read-only operating-system inventory." },
          { type: "code", language: "powershell", content: "Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object Caption, Version" }
        ],
        challenge: {
          title: "Practice: Introduction to WMI",
          description: [
            { type: "text", content: "Write a PowerShell command for Introduction to WMI." }
          ],
          starterCode: "",
          solutionCode: "Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object Caption, Version",
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
        title: "Using CIM Cmdlets",
        chapterTitle: "WMI and CIM",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Using CIM Cmdlets. Modern management with Common Information Model." },
          { type: "code", language: "powershell", content: "Get-CimInstance -ClassName Win32_ComputerSystem" }
        ],
        challenge: {
          title: "Practice: Using CIM Cmdlets",
          description: [
            { type: "text", content: "Write a PowerShell command for Using CIM Cmdlets." }
          ],
          starterCode: "",
          solutionCode: "Get-CimInstance -ClassName Win32_ComputerSystem",
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
    ]
  },
  {
    id: "ch-2",
    title: "Active Directory",
    icon: "users",
    desc: "Managing AD with PowerShell.",
    lessons: [
      {
        id: "ch-2-l1",
        title: "Managing Users",
        chapterTitle: "Active Directory",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Managing Users. Create and modify AD Users." },
          { type: "code", language: "powershell", content: "New-ADUser -Name 'JohnDoe' -WhatIf" }
        ],
        challenge: {
          title: "Practice: Managing Users",
          description: [
            { type: "text", content: "Write a PowerShell command for Managing Users." }
          ],
          starterCode: "",
          solutionCode: "New-ADUser -Name 'JohnDoe' -WhatIf",
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
      {
        id: "ch-2-l2",
        title: "Managing Groups",
        chapterTitle: "Active Directory",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Managing Groups. Working with AD Groups." },
          { type: "code", language: "powershell", content: "Add-ADGroupMember -Identity 'IT' -Members 'JohnDoe' -WhatIf" }
        ],
        challenge: {
          title: "Practice: Managing Groups",
          description: [
            { type: "text", content: "Write a PowerShell command for Managing Groups." }
          ],
          starterCode: "",
          solutionCode: "Add-ADGroupMember -Identity 'IT' -Members 'JohnDoe' -WhatIf",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Add-ADGroupMember"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-3",
    title: "Remote Management",
    icon: "globe",
    desc: "PowerShell Remoting concepts.",
    lessons: [
      {
        id: "ch-3-l1",
        title: "Enable PS Remoting",
        chapterTitle: "Remote Management",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Enable PS Remoting. Configure systems for remote management." },
          { type: "code", language: "powershell", content: "Enable-PSRemoting -Force -WhatIf" }
        ],
        challenge: {
          title: "Practice: Enable PS Remoting",
          description: [
            { type: "text", content: "Write a PowerShell command for Enable PS Remoting." }
          ],
          starterCode: "",
          solutionCode: "Enable-PSRemoting -Force -WhatIf",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Enable-PSRemoting"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-3-l2",
        title: "Invoke-Command",
        chapterTitle: "Remote Management",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Invoke-Command. Running commands on remote systems." },
          { type: "code", language: "powershell", content: "Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Process }" }
        ],
        challenge: {
          title: "Practice: Invoke-Command",
          description: [
            { type: "text", content: "Write a PowerShell command for Invoke-Command." }
          ],
          starterCode: "",
          solutionCode: "Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Process }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Invoke-Command"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-4",
    title: "Advanced Administration",
    icon: "shield",
    desc: "Pro-level administration techniques.",
    lessons: [
      {
        id: "ch-4-l1",
        title: "Desired State Configuration",
        chapterTitle: "Advanced Administration",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Desired State Configuration. Introduction to DSC." },
          { type: "code", language: "powershell", content: "Configuration WebServer { Node localhost { WindowsFeature IIS { Ensure='Present'; Name='Web-Server' } } }" }
        ],
        challenge: {
          title: "Practice: Desired State Configuration",
          description: [
            { type: "text", content: "Write a PowerShell command for Desired State Configuration." }
          ],
          starterCode: "",
          solutionCode: "Configuration WebServer { Node localhost { WindowsFeature IIS { Ensure='Present'; Name='Web-Server' } } }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Configuration"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-4-l2",
        title: "Just Enough Administration",
        chapterTitle: "Advanced Administration",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Just Enough Administration. JEA Concepts." },
          { type: "code", language: "powershell", content: "New-PSSessionConfigurationFile -Path .\\jea.pssc" }
        ],
        challenge: {
          title: "Practice: Just Enough Administration",
          description: [
            { type: "text", content: "Write a PowerShell command for Just Enough Administration." }
          ],
          starterCode: "",
          solutionCode: "New-PSSessionConfigurationFile -Path .\\jea.pssc",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["New-PSSessionConfigurationFile"],
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
      "Filter CIM Queries at the Source",
      "CIM filters can reduce the amount of data returned by a remote query. Use the class's documented properties and validate filter syntax before relying on it in fleet-wide automation.",
      "Get-CimInstance -ClassName Win32_Service -Filter \"State = 'Running'\"",
      "Query only running Win32_Service instances using a CIM filter.",
      "# Query running services using a server-side filter\n",
      "Get-CimInstance -ClassName Win32_Service -Filter \"State = 'Running'\"",
      [
        ["Queries the CIM service class", "Win32_Service", "Use the Win32_Service CIM class."],
        ["Filters to running services", "State = 'Running'", "Filter on the State property."],
      ],
    ],
    [
      "Reuse a Remote CIM Session",
      "A CIM session reuses its connection and session options across queries. Create it for a trusted target, use it consistently, and remove it in a finally block.",
      "$session = New-CimSession -ComputerName 'server01'\ntry { Get-CimInstance -CimSession $session -ClassName Win32_OperatingSystem } finally { Remove-CimSession $session }",
      "Query a remote operating system through a reusable CIM session and always close the session.",
      "$session = New-CimSession -ComputerName 'server01'\ntry {\n    # Query the remote computer\n} finally {\n    # Remove the CIM session\n}\n",
      "$session = New-CimSession -ComputerName 'server01'\ntry { Get-CimInstance -CimSession $session -ClassName Win32_OperatingSystem } finally { Remove-CimSession $session }",
      [
        ["Uses the remote CIM session", "-CimSession $session", "Pass the new session into the CIM query."],
        ["Releases the session", "Remove-CimSession $session", "Remove the session in the finally block."],
      ],
    ],
    [
      "Project CIM Properties",
      "CIM classes can expose many fields. Select only the properties needed for an inventory or report to reduce payload and provide a stable output contract.",
      "Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object CSName, Caption, Version",
      "Return the computer name, operating system caption, and version.",
      "Get-CimInstance -ClassName Win32_OperatingSystem |\n    # Select only inventory fields\n",
      "Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object CSName, Caption, Version",
      [
        ["Queries operating system data", "Win32_OperatingSystem", "Use the Win32_OperatingSystem class."],
        ["Returns a narrow schema", "Select-Object CSName, Caption, Version", "Select only the three inventory properties."],
      ],
    ],
    [
      "Discover CIM Classes and Methods",
      "Inspect a CIM class before invoking methods; method names, parameters, and effects vary. Prefer read-only discovery first and require explicit review for state-changing methods.",
      "Get-CimClass -ClassName Win32_OperatingSystem | Select-Object CimClassName, CimClassMethods",
      "Inspect the operating-system class name and available methods without invoking them.",
      "# Discover class metadata before choosing a method\n",
      "Get-CimClass -ClassName Win32_OperatingSystem | Select-Object CimClassName, CimClassMethods",
      [
        ["Discovers class metadata", "Get-CimClass", "Use Get-CimClass to inspect the class."],
        ["Does not execute a method", "CimClassMethods", "Select the method metadata for review."],
      ],
    ],
  ],
  [
    [
      "Query Users with Server-Side Filters",
      "Active Directory's -Filter syntax lets the directory service narrow results before returning them. Select only the fields needed and use a search base to scope large directories.",
      "Get-ADUser -Filter 'Enabled -eq $true' -Properties Department | Select-Object SamAccountName, Department",
      "Find enabled users and return their account names and departments.",
      "# Query enabled users and project two fields\n",
      "Get-ADUser -Filter 'Enabled -eq $true' -Properties Department | Select-Object SamAccountName, Department",
      [
        ["Filters enabled accounts", "-Filter 'Enabled -eq $true'", "Use an AD filter for enabled users."],
        ["Returns only required fields", "Select-Object SamAccountName, Department", "Select the account name and department."],
      ],
    ],
    [
      "Preview User Provisioning",
      "Provisioning changes should be validated before execution. Use -WhatIf when supported, validate input data, and ensure the operator has only the permissions required for the task.",
      "New-ADUser -Name 'Jordan Lee' -SamAccountName 'jlee' -Enabled $true -WhatIf",
      "Preview creation of an enabled directory user without applying the change.",
      "# Validate the input record before creating an account\n",
      "New-ADUser -Name 'Jordan Lee' -SamAccountName 'jlee' -Enabled $true -WhatIf",
      [
        ["Creates a directory user", "New-ADUser", "Use New-ADUser for the provisioning command."],
        ["Previews the change", "-WhatIf", "Include -WhatIf so no account is created."],
      ],
    ],
    [
      "Audit Nested Group Membership",
      "Recursive membership queries reveal indirect access paths that direct membership checks miss. Review results before changing groups because nested memberships can have broad impact.",
      "Get-ADGroupMember -Identity 'App-Operators' -Recursive | Select-Object Name, ObjectClass",
      "List all direct and nested members of App-Operators with their object classes.",
      "# Review the full membership tree before changes\n",
      "Get-ADGroupMember -Identity 'App-Operators' -Recursive | Select-Object Name, ObjectClass",
      [
        ["Queries the intended group", "-Identity 'App-Operators'", "Specify the App-Operators group."],
        ["Includes nested memberships", "-Recursive", "Use the recursive membership option."],
      ],
    ],
    [
      "Export a Scoped Directory Inventory",
      "An inventory should have a clear search scope, selected attributes, and a controlled destination. Treat exported identity data as sensitive and apply appropriate file permissions.",
      "Get-ADUser -SearchBase 'OU=Engineering,DC=contoso,DC=com' -Filter * -Properties Department | Select-Object SamAccountName, Department | Export-Csv -Path .\\engineering-users.csv -NoTypeInformation",
      "Export account names and departments from the Engineering organizational unit.",
      "# Scope the directory query and export the reviewed fields\n",
      "Get-ADUser -SearchBase 'OU=Engineering,DC=contoso,DC=com' -Filter * -Properties Department | Select-Object SamAccountName, Department | Export-Csv -Path .\\engineering-users.csv -NoTypeInformation",
      [
        ["Limits the directory search", "-SearchBase 'OU=Engineering,DC=contoso,DC=com'", "Use the Engineering OU as the search base."],
        ["Exports a defined schema", "Export-Csv", "Export the selected inventory using Export-Csv."],
        ["Avoids type metadata", "-NoTypeInformation", "Use -NoTypeInformation in the CSV export."],
      ],
    ],
  ],
  [
    [
      "Reuse Persistent Remote Sessions",
      "Persistent PSSessions avoid reconnecting for each command and can retain remote state. Keep the session lifetime bounded and close it even when a remote command fails.",
      "$session = New-PSSession -ComputerName 'server01'\ntry { Invoke-Command -Session $session -ScriptBlock { Get-Service } } finally { Remove-PSSession $session }",
      "Create a session, query services on the remote host, and always remove the session.",
      "$session = New-PSSession -ComputerName 'server01'\ntry {\n    # Run a remote query through the session\n} finally {\n    # Close the session\n}\n",
      "$session = New-PSSession -ComputerName 'server01'\ntry { Invoke-Command -Session $session -ScriptBlock { Get-Service } } finally { Remove-PSSession $session }",
      [
        ["Runs the command through a session", "Invoke-Command -Session $session", "Use Invoke-Command with the persistent session."],
        ["Closes the session", "Remove-PSSession $session", "Always remove the session in finally."],
      ],
    ],
    [
      "Copy Files Through a Session",
      "Copy-Item can transfer files over an established remoting session. Use explicit source and destination paths, and verify the remote destination before treating the transfer as complete.",
      "Copy-Item -Path .\\config.json -Destination C:\\Ops\\config.json -ToSession $session",
      "Copy config.json to the Ops directory on the computer represented by $session.",
      "# Use an established PSSession and explicit paths\n",
      "Copy-Item -Path .\\config.json -Destination C:\\Ops\\config.json -ToSession $session",
      [
        ["Uses the session transfer parameter", "-ToSession $session", "Pass the established session through -ToSession."],
        ["Copies the intended file", "config.json", "Specify config.json as the source file."],
      ],
    ],
    [
      "Throttle Fleet-Wide Commands",
      "ThrottleLimit bounds concurrent remote work and reduces pressure on endpoints and networks. Start with a conservative limit and handle failures per target.",
      "Invoke-Command -ComputerName $servers -ThrottleLimit 8 -ScriptBlock { Get-Service -Name 'Spooler' }",
      "Query the Spooler service across the server list with no more than eight concurrent connections.",
      "$servers = @('server01', 'server02')\n# Bound concurrency for the remote query\n",
      "Invoke-Command -ComputerName $servers -ThrottleLimit 8 -ScriptBlock { Get-Service -Name 'Spooler' }",
      [
        ["Targets the server list", "-ComputerName $servers", "Pass the approved server list as targets."],
        ["Bounds concurrent work", "-ThrottleLimit 8", "Set an explicit concurrency limit."],
      ],
    ],
    [
      "Capture Remote Failures by Target",
      "Remote operations can fail independently across hosts. Capture errors with target context, report partial failures explicitly, and never turn a missing result into an apparent success.",
      "Invoke-Command -ComputerName $servers -ScriptBlock { hostname } -ErrorAction Continue -ErrorVariable remoteErrors",
      "Run a hostname check across servers while collecting remote errors for review.",
      "$remoteErrors = @()\n# Execute the fleet check and collect errors\n",
      "Invoke-Command -ComputerName $servers -ScriptBlock { hostname } -ErrorAction Continue -ErrorVariable remoteErrors",
      [
        ["Runs the remote health check", "Invoke-Command", "Use Invoke-Command to run the check remotely."],
        ["Collects failures", "-ErrorVariable remoteErrors", "Capture non-terminating errors in remoteErrors."],
      ],
    ],
  ],
  [
    [
      "Schedule a Reviewed Maintenance Task",
      "Scheduled tasks make recurring administration repeatable. Use a dedicated service identity, least privileges, explicit triggers, and review the action before registering it.",
      "$action = New-ScheduledTaskAction -Execute 'pwsh.exe' -Argument '-File C:\\Ops\\HealthCheck.ps1'\n$trigger = New-ScheduledTaskTrigger -Daily -At 2am",
      "Define a PowerShell health-check action and a daily 2 AM trigger without registering the task.",
      "# Define the action and trigger; review before registration\n",
      "$action = New-ScheduledTaskAction -Execute 'pwsh.exe' -Argument '-File C:\\Ops\\HealthCheck.ps1'\n$trigger = New-ScheduledTaskTrigger -Daily -At 2am",
      [
        ["Defines the scheduled action", "New-ScheduledTaskAction", "Create an action that runs the health-check script."],
        ["Defines the recurring schedule", "New-ScheduledTaskTrigger -Daily", "Use a daily trigger at the planned time."],
      ],
    ],
    [
      "Validate Desired State Before Apply",
      "Desired State Configuration describes required state; inspect the generated configuration and target before applying changes. Use test-only workflows and controlled rollouts for production nodes.",
      "Test-DscConfiguration -ComputerName 'server01' -Detailed",
      "Check whether server01 complies with its assigned DSC configuration without applying changes.",
      "# Test compliance first; do not apply configuration here\n",
      "Test-DscConfiguration -ComputerName 'server01' -Detailed",
      [
        ["Tests configuration compliance", "Test-DscConfiguration", "Use the DSC test cmdlet."],
        ["Targets the intended node", "-ComputerName 'server01'", "Specify server01 as the target."],
      ],
    ],
    [
      "Inspect a JEA Role Capability",
      "JEA endpoints expose a restricted command surface rather than granting unrestricted administration. Review the role capability file and allowed cmdlets before registering or sharing an endpoint.",
      "Get-Content -LiteralPath .\\RoleCapabilities\\Helpdesk.psrc",
      "Read the Helpdesk role capability definition for review.",
      "# Review the role capability before endpoint registration\n",
      "Get-Content -LiteralPath .\\RoleCapabilities\\Helpdesk.psrc",
      [
        ["Reads the JEA role capability", "Helpdesk.psrc", "Inspect the Helpdesk role capability file."],
        ["Uses a literal file path", "Get-Content -LiteralPath", "Read the file using -LiteralPath."],
      ],
    ],
    [
      "Monitor a System Event Window",
      "Operational monitoring should query a bounded time interval and relevant event identifiers. Keep the filter narrow and preserve timestamps and machine identity in the resulting evidence.",
      "Get-WinEvent -FilterHashtable @{ LogName = 'System'; StartTime = (Get-Date).AddHours(-1) } -MaxEvents 100",
      "Review at most 100 System log events from the last hour.",
      "# Set a bounded time window and event limit\n",
      "Get-WinEvent -FilterHashtable @{ LogName = 'System'; StartTime = (Get-Date).AddHours(-1) } -MaxEvents 100",
      [
        ["Queries the System log", "LogName = 'System'", "Filter the query to the System log."],
        ["Bounds the result count", "-MaxEvents 100", "Limit the query to 100 events."],
      ],
    ],
  ],
];

POWERSHELLADMINISTRATION_CHAPTERS.forEach((chapter, index) => {
  chapter.lessons.push(
    ...additions[index].map((lesson, lessonIndex) =>
      createPowerShellLesson(chapter, lessonIndex + 3, lesson),
    ),
  );
});

POWERSHELLADMINISTRATION_CHAPTERS.push(
  createPowerShellChapter(5, "Identity Governance at Scale", "building", "Automate identity reviews with scoped queries, safeguards, and evidence.", [
    [
      "Scope an Identity Inventory",
      "Directory queries should use a search base and return only required properties. Narrow server-side before processing to reduce load and avoid collecting unnecessary personal data.",
      "Get-ADUser -SearchBase 'OU=Engineering,DC=contoso,DC=com' -Filter * -Properties Department | Select-Object SamAccountName, Department",
      "Query users in the Engineering OU and return only account name and department.",
      "# Scope the directory query and select a minimal schema\n",
      "Get-ADUser -SearchBase 'OU=Engineering,DC=contoso,DC=com' -Filter * -Properties Department | Select-Object SamAccountName, Department",
      [["Scopes the search", "-SearchBase 'OU=Engineering,DC=contoso,DC=com'", "Limit the search to the Engineering OU."], ["Selects required fields", "Select-Object SamAccountName, Department", "Return only account name and department."]],
    ],
    [
      "Find Stale Enabled Accounts",
      "Account hygiene reports should make their time boundary explicit and distinguish findings from remediation. Review business exceptions before disabling an account.",
      "$cutoff = (Get-Date).AddDays(-90)\nGet-ADUser -Filter 'Enabled -eq $true' -Properties LastLogonDate | Where-Object LastLogonDate -lt $cutoff | Select-Object SamAccountName, LastLogonDate",
      "Find enabled accounts whose last logon was more than 90 days ago.",
      "$cutoff = (Get-Date).AddDays(-90)\n# Report stale enabled accounts without modifying them\n",
      "$cutoff = (Get-Date).AddDays(-90)\nGet-ADUser -Filter 'Enabled -eq $true' -Properties LastLogonDate | Where-Object LastLogonDate -lt $cutoff | Select-Object SamAccountName, LastLogonDate",
      [["Defines an explicit review window", "AddDays(-90)", "Calculate a cutoff 90 days in the past."], ["Queries last logon data", "LastLogonDate", "Request and evaluate LastLogonDate."], ["Keeps the action read-only", "Select-Object SamAccountName, LastLogonDate", "Report the candidate accounts rather than changing them."]],
    ],
    [
      "Audit Privileged Group Membership",
      "Privileged membership audits should include nested members and preserve enough identity detail for review. Treat the output as sensitive access-control evidence.",
      "Get-ADGroupMember -Identity 'Domain Admins' -Recursive | Select-Object Name, ObjectClass, SamAccountName",
      "List nested Domain Admins group members with their object type and account name.",
      "# Review nested privileged membership\n",
      "Get-ADGroupMember -Identity 'Domain Admins' -Recursive | Select-Object Name, ObjectClass, SamAccountName",
      [["Targets the privileged group", "-Identity 'Domain Admins'", "Query the Domain Admins group."], ["Includes nested membership", "-Recursive", "Request recursive membership results."], ["Returns reviewable identity fields", "ObjectClass, SamAccountName", "Include the object class and account name."]],
    ],
    [
      "Preview a Group Access Change",
      "Use WhatIf for supported directory changes and validate the target identity and group before execution. Capture an approved request reference outside the mutation command.",
      "Add-ADGroupMember -Identity 'App-Operators' -Members $user -WhatIf",
      "Preview adding the validated user to App-Operators without changing membership.",
      "# Review the group and user, then preview the access change\n",
      "Add-ADGroupMember -Identity 'App-Operators' -Members $user -WhatIf",
      [["Names the approved target group", "-Identity 'App-Operators'", "Specify the intended group explicitly."], ["Previews the membership change", "-WhatIf", "Use WhatIf to avoid applying the change."], ["Adds only the selected user", "-Members $user", "Pass the validated user identity."]],
    ],
    [
      "Review Group Membership Changes",
      "Compare current membership with the approved desired set before applying changes. A diff makes unexpected removals or additions visible to reviewers.",
      "$current = Get-ADGroupMember -Identity 'App-Operators' | Select-Object -ExpandProperty SamAccountName\nCompare-Object -ReferenceObject $approvedUsers -DifferenceObject $current",
      "Compare the approved user list with the current App-Operators membership.",
      "$current = Get-ADGroupMember -Identity 'App-Operators' | Select-Object -ExpandProperty SamAccountName\n# Compare approved and current access before changes\n",
      "$current = Get-ADGroupMember -Identity 'App-Operators' | Select-Object -ExpandProperty SamAccountName\nCompare-Object -ReferenceObject $approvedUsers -DifferenceObject $current",
      [["Reads current group membership", "Get-ADGroupMember -Identity 'App-Operators'", "Retrieve the current members of the intended group."], ["Compares both sets", "Compare-Object", "Use Compare-Object before applying changes."]],
    ],
    [
      "Export a Protected Access Review",
      "Export only the fields needed for an access review and store the result in an access-controlled location. Record the run time and scope so the evidence is reproducible.",
      "$review = Get-ADGroupMember -Identity 'App-Operators' -Recursive | Select-Object Name, SamAccountName\n$review | Export-Csv -LiteralPath '.\\access-review.csv' -NoTypeInformation",
      "Export the reviewed group's nested member names and account names to CSV.",
      "$review = Get-ADGroupMember -Identity 'App-Operators' -Recursive |\n    # Select the minimum fields needed for review\n# Export the access review\n",
      "$review = Get-ADGroupMember -Identity 'App-Operators' -Recursive | Select-Object Name, SamAccountName\n$review | Export-Csv -LiteralPath '.\\access-review.csv' -NoTypeInformation",
      [["Includes nested members", "-Recursive", "Include indirect membership in the review."], ["Exports only identity fields", "Select-Object Name, SamAccountName", "Select name and account name."], ["Writes a reusable evidence file", "Export-Csv -LiteralPath", "Export the records to CSV."]],
    ],
  ]),
  createPowerShellChapter(6, "Fleet Operations and Observability", "line-chart", "Manage remote sessions, monitor health, and recover safely across systems.", [
    [
      "Reuse Remote Sessions",
      "Persistent sessions reduce repeated connection setup and provide a controlled resource boundary. Always remove sessions in finally blocks so errors do not leak remote resources.",
      "$session = New-PSSession -ComputerName 'server01'\ntry { Invoke-Command -Session $session -ScriptBlock { Get-Service } } finally { Remove-PSSession $session }",
      "Query remote services over a persistent session and always close it.",
      "$session = New-PSSession -ComputerName 'server01'\ntry {\n    # Query the trusted remote host\n} finally {\n    # Release the session\n}\n",
      "$session = New-PSSession -ComputerName 'server01'\ntry { Invoke-Command -Session $session -ScriptBlock { Get-Service } } finally { Remove-PSSession $session }",
      [["Uses a persistent session", "New-PSSession -ComputerName 'server01'", "Create a remote session for the trusted host."], ["Runs work through the session", "Invoke-Command -Session $session", "Pass the session to Invoke-Command."], ["Releases the session", "Remove-PSSession $session", "Remove the session in finally."]],
    ],
    [
      "Throttle Fleet-Wide Reads",
      "Fleet queries can overload endpoints or hit throttling limits when launched without bounds. Process independent targets with a conservative throttle and collect failures explicitly.",
      "$servers | ForEach-Object -Parallel { Get-CimInstance -ComputerName $_ -ClassName Win32_OperatingSystem } -ThrottleLimit 5",
      "Collect operating-system inventory from independent servers with five concurrent workers.",
      "$servers | ForEach-Object -Parallel {\n    # Query one server\n} -ThrottleLimit 5\n",
      "$servers | ForEach-Object -Parallel { Get-CimInstance -ComputerName $_ -ClassName Win32_OperatingSystem } -ThrottleLimit 5",
      [["Runs independent work in parallel", "ForEach-Object -Parallel", "Use parallel iteration for independent targets."], ["Queries operating-system data", "Win32_OperatingSystem", "Use the operating-system CIM class."], ["Bounds concurrency", "-ThrottleLimit 5", "Set an explicit throttle of five workers."]],
    ],
    [
      "Collect Remote Failures as Data",
      "A fleet report should distinguish a failed target from an empty result. Catch errors per machine and emit a structured failure record alongside successful results.",
      "try { Invoke-Command -ComputerName $computer -ScriptBlock { Get-Service } -ErrorAction Stop } catch { [pscustomobject]@{ ComputerName = $computer; Error = $_.Exception.Message } }",
      "Return a structured record containing the host and error message when the remote query fails.",
      "try {\n    # Query the remote host and make errors terminating\n} catch {\n    # Return a structured failure record\n}\n",
      "try { Invoke-Command -ComputerName $computer -ScriptBlock { Get-Service } -ErrorAction Stop } catch { [pscustomobject]@{ ComputerName = $computer; Error = $_.Exception.Message } }",
      [["Makes query errors catchable", "-ErrorAction Stop", "Set terminating error behavior on the remote query."], ["Handles per-target failure", "catch {", "Catch errors for the target."], ["Preserves host and error context", "ComputerName = $computer", "Include the failed computer in the result."]],
    ],
    [
      "Monitor Events with a Bounded Window",
      "Use FilterHashtable and a finite event count to keep event-log queries targeted. Preserve event time and identifiers for investigation rather than immediately reducing results to text.",
      "Get-WinEvent -FilterHashtable @{ LogName = 'System'; StartTime = (Get-Date).AddHours(-2) } -MaxEvents 200",
      "Retrieve at most 200 System events from the last two hours.",
      "# Query a specific log over a bounded time window\n",
      "Get-WinEvent -FilterHashtable @{ LogName = 'System'; StartTime = (Get-Date).AddHours(-2) } -MaxEvents 200",
      [["Scopes to the System log", "LogName = 'System'", "Filter the query to the System log."], ["Bounds the time range", "AddHours(-2)", "Use a two-hour start-time boundary."], ["Limits event volume", "-MaxEvents 200", "Cap the query at 200 events."]],
    ],
    [
      "Create an Idempotent Remediation",
      "A remediation first inspects current state and acts only when the target is unhealthy. Combine the state check with a preview during rollout to avoid unnecessary service restarts.",
      "$service = Invoke-Command -ComputerName $computer -ScriptBlock { Get-Service -Name 'Spooler' }\nif ($service.Status -ne 'Running') { Invoke-Command -ComputerName $computer -ScriptBlock { Start-Service -Name 'Spooler' -WhatIf } }",
      "Preview starting the remote Spooler service only if it is not running.",
      "$service = Invoke-Command -ComputerName $computer -ScriptBlock { Get-Service -Name 'Spooler' }\n# Check current state before previewing remediation\n",
      "$service = Invoke-Command -ComputerName $computer -ScriptBlock { Get-Service -Name 'Spooler' }\nif ($service.Status -ne 'Running') { Invoke-Command -ComputerName $computer -ScriptBlock { Start-Service -Name 'Spooler' -WhatIf } }",
      [["Checks current service state", "$service.Status -ne 'Running'", "Only remediate when the service is not running."], ["Previews the remediation", "Start-Service -Name 'Spooler' -WhatIf", "Use WhatIf for the proposed service start."]],
    ],
    [
      "Publish a Fleet Health Summary",
      "A useful operational summary includes target identity, check time, status, and actionable failure detail. Keep records structured so they can feed dashboards, alerts, and later audits.",
      "$results | Group-Object Status | Select-Object Name, Count\n$results | Export-Csv -LiteralPath '.\\fleet-health.csv' -NoTypeInformation",
      "Summarize fleet results by status and export the detailed records to CSV.",
      "# Summarize statuses and export detailed health records\n",
      "$results | Group-Object Status | Select-Object Name, Count\n$results | Export-Csv -LiteralPath '.\\fleet-health.csv' -NoTypeInformation",
      [["Aggregates health outcomes", "Group-Object Status", "Group records by their status."], ["Exports detailed results", "Export-Csv -LiteralPath", "Write the structured results to CSV."]],
    ],
  ]),
);

export const POWERSHELLADMINISTRATION_LESSONS = POWERSHELLADMINISTRATION_CHAPTERS.flatMap(ch => ch.lessons);
export const POWERSHELLADMINISTRATION_TOTAL_XP = POWERSHELLADMINISTRATION_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
