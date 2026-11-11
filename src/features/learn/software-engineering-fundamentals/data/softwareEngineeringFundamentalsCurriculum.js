// PolyCode — Introduction to Software Engineering full curriculum
// 1 chapter · 6 lessons · THEORY ONLY (no code challenges — this is a
// concept/foundations course, same pattern as quantum-mechanics-for-programmers).
// YouTube links: edit softwareEngineeringFundamentalsVideoLinks.js (not this file).
//
// This file follows the exact same shape as
// quantum-mechanics-for-programmers/data/quantumMechanicsForProgrammersCurriculum.js
// so it works with the shared NumpyIntroTheory / OopsSidebar components
// without any changes to those files. Lessons here intentionally have NO
// `challenge` key, and SoftwareEngineeringFundamentalsLessonPage.jsx only
// renders the Theory tab.
//
// This is Section 1 (Overview) of the course. More chapters — Requirements,
// Design, Testing, Deployment & Maintenance, Project Management — can be
// added later by following the exact shape of an existing lesson object
// (`id`, `title`, `xp`, `theory[]`) and appending a new chapter to
// RAW_SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS below.

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { SOFTWARE_ENGINEERING_FUNDAMENTALS_VIDEO_LINKS } from "./softwareEngineeringFundamentalsVideoLinks";

const ACCENT = "#f59e0b";

const RAW_SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS = [
  {
    id: "se-overview",
    title: "Overview",
    icon: "🧭",
    color: ACCENT,
    lessons: [
      {
        id: "se-0",
        title: "Why Software Engineering Matters",
        xp: 10,
        theory: [
          {
            type: "objectives",
            items: [
              "Explain why software engineering exists as a discipline",
              "State the scale of the global software industry",
              "Describe the three ingredients every software project needs",
            ],
          },
          {
            type: "text",
            content:
              "**Software engineering** is the disciplined application of engineering principles — planning, design, measurement, and quality control — to building software. It exists because software has grown from a handful of research programs into the infrastructure that runs banks, hospitals, factories, airlines, and governments.\n\nWhen software fails, the cost isn't just a bug report — it can mean lost revenue, safety incidents, or a company's reputation. Treating software development as a craft alone, without process or discipline, doesn't scale to systems this important.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Gartner (2022) estimated the **global software industry** at roughly **$600 billion USD** — and it has kept growing every year since. Software isn't a side business anymore; for most companies, it *is* the business.",
          },
          {
            type: "text",
            content:
              "Building software that people can depend on takes more than a good idea. Every real project rests on three things working together:\n\n- **Process** — a repeatable way of turning requirements into a working, tested product\n- **Resources** — enough time, budget, tooling, and infrastructure to do the work properly\n- **Skillset** — developers, testers, and managers who actually know how to use the process and the resources well",
          },
          {
            type: "diagram",
            title: "What every software project needs",
            nodes: [
              {
                id: "process",
                label: "Process",
                color: ACCENT,
                items: ["A repeatable path from idea to release", "Requirements → Design → Build → Test"],
              },
              {
                id: "resources",
                label: "Resources",
                color: "#fb923c",
                items: ["Time and budget", "Tools, infrastructure, people"],
              },
              {
                id: "skillset",
                label: "Skillset",
                color: "#ea580c",
                items: ["Technical ability", "Domain knowledge, management & communication"],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Missing any one of the three — process, resources, or skillset — is one of the most common reasons software projects run over budget, ship late, or fail outright. You'll see exactly how often that happens in the next lesson.",
          },
          {
            type: "quiz",
            question:
              "According to Gartner's 2022 estimate, the global software industry is worth roughly how much?",
            options: ["$60 million", "$6 billion", "$600 billion", "$6 trillion"],
            answer: 2,
            explanation:
              "Gartner (2022) put the global software industry at approximately $600 billion USD.",
          },
        ],
      },
      {
        id: "se-1",
        title: "Project Success and Failure — The CHAOS Report",
        xp: 10,
        theory: [
          {
            type: "objectives",
            items: [
              "Describe what the Standish Group CHAOS Report measures",
              "Recall the roughly even three-way split between successful, challenged, and failed projects",
              "Explain why this statistic is a core argument for disciplined software engineering",
            ],
          },
          {
            type: "text",
            content:
              "For decades, the **Standish Group** has tracked how IT and software projects actually turn out in its **CHAOS Report**, sorting outcomes into three buckets:\n\n- **Successful** — delivered on time, on budget, with the agreed features\n- **Challenged** — delivered late, over budget, and/or with fewer features than planned\n- **Failed** — cancelled before completion, or delivered but never used",
          },
          {
            type: "diagram",
            title: "Software project outcomes (Standish Group CHAOS Report)",
            nodes: [
              {
                id: "success",
                label: "Successful — ~33%",
                color: "#22c55e",
                items: ["On time", "On budget", "All planned features"],
              },
              {
                id: "challenged",
                label: "Challenged — ~33%",
                color: ACCENT,
                items: ["Late and/or over budget", "Reduced scope or features"],
              },
              {
                id: "failed",
                label: "Failed — ~33–34%",
                color: "#ef4444",
                items: ["Cancelled mid-project", "Or delivered but abandoned"],
              },
            ],
          },
          {
            type: "text",
            content:
              "Add it up and the picture is sobering: only about **one in three** software projects is a clean success. The other two-thirds are either compromised or fail outright — not because the people involved are unskilled, but because software projects are genuinely hard to plan, estimate, and control without a disciplined process.",
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "This is the central argument for studying software engineering: talent and good intentions alone haven't been enough to move this ratio. **Process** is what moves it.",
          },
          {
            type: "quiz",
            question:
              "Per the Standish Group CHAOS Report, roughly what share of software projects are fully successful (on time, on budget, full scope)?",
            options: ["About 10%", "About 33%", "About 66%", "About 90%"],
            answer: 1,
            explanation:
              "Successful, challenged, and failed projects each account for roughly a third — about 33% are fully successful.",
          },
        ],
      },
      {
        id: "se-2",
        title: "The Software Development Life Cycle (SDLC)",
        xp: 14,
        theory: [
          {
            type: "objectives",
            items: [
              "List the seven core phases of the SDLC",
              "Explain what happens in each phase",
              "Understand why phases feed into each other rather than standing alone",
            ],
          },
          {
            type: "text",
            content:
              "The **Software Development Life Cycle (SDLC)** is the structured sequence of phases a project moves through, from an idea to a system that's live and maintained. Every methodology — Waterfall, Agile, Spiral — is really just a different way of arranging and repeating these same core phases.",
          },
          {
            type: "diagram",
            title: "The 7 SDLC phases",
            nodes: [
              { id: "req", label: "1. Requirement Analysis", color: ACCENT, items: ["Gather & document what's needed"] },
              { id: "design", label: "2. Design", color: "#fb923c", items: ["Architecture & system structure"] },
              { id: "coding", label: "3. Coding", color: "#f97316", items: ["Turn design into working software"] },
              { id: "testing", label: "4. Testing", color: "#ea580c", items: ["Verify it works correctly"] },
              { id: "analysis", label: "5. Analysis", color: "#dc2626", items: ["Evaluate results vs requirements"] },
              { id: "deployment", label: "6. Deployment", color: "#0ea5e9", items: ["Release to real users"] },
              { id: "maintenance", label: "7. Maintenance", color: "#6366f1", items: ["Fix, support, and improve over time"] },
            ],
          },
          {
            type: "text",
            content:
              "- **Requirement Analysis** — Talk to stakeholders and users to capture *what* the system must do, then write it down clearly enough that design and testing can both point back to it.\n- **Design** — Turn requirements into an architecture: how the system is structured, what its components are, and how they interact.\n- **Coding** — Implement the design as working software, following the team's standards for structure and readability.\n- **Testing** — Check the built software against the requirements — unit tests, integration tests, and user acceptance testing all belong here.\n- **Analysis** — Step back and evaluate whether the tested system actually satisfies the original requirements and quality goals, before it goes anywhere near production.\n- **Deployment** — Release the software into its real environment, where actual users and data can reach it.\n- **Maintenance** — The longest phase in practice: fix bugs, patch security issues, and extend the system as needs change.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "In real projects these phases rarely run once, straight through. Agile teams cycle through Requirements → Design → Coding → Testing every sprint; the shape changes, but all seven jobs still have to get done somewhere.",
          },
          {
            type: "quiz",
            question:
              "Which SDLC phase comes immediately after Testing and before Deployment in this model?",
            options: ["Design", "Coding", "Analysis", "Maintenance"],
            answer: 2,
            explanation:
              "Analysis follows Testing — it's where the team evaluates the tested system against the original requirements before releasing it.",
          },
        ],
      },
      {
        id: "se-3",
        title: "Factors Affecting Project Structure",
        xp: 12,
        theory: [
          {
            type: "objectives",
            items: [
              "Name four factors that shape how a software project is structured",
              "Explain the effect each factor has on planning and process",
              "Recognize why the same SDLC phases can look very different across projects",
            ],
          },
          {
            type: "text",
            content:
              "The seven SDLC phases are constant, but *how* a team runs them changes a lot from project to project. Four factors do most of that shaping.",
          },
          {
            type: "diagram",
            title: "What shapes a project's structure",
            nodes: [
              {
                id: "size",
                label: "Project Size & Complexity",
                color: ACCENT,
                items: ["More modules, more integration risk", "Needs more formal process"],
              },
              {
                id: "satisfaction",
                label: "Customer Satisfaction",
                color: "#fb923c",
                items: ["Drives scope & priority changes", "Shapes how often you demo / release"],
              },
              {
                id: "budget",
                label: "Development & Budget Provisions",
                color: "#f97316",
                items: ["Limits team size & tooling", "Limits timeline & scope"],
              },
              {
                id: "skills",
                label: "Skills of Developers & Managers",
                color: "#dc2626",
                items: ["Affects estimate accuracy", "Affects how much process is needed"],
              },
            ],
          },
          {
            type: "text",
            content:
              "- **Project size and complexity** — A 3-person, 2-week internal tool doesn't need the same process as a 200-person banking platform. Bigger, more interconnected systems need more formal requirement documents, more design review, and more integration testing to keep risk under control.\n- **Customer satisfaction** — Projects aren't just built once and handed over; customer feedback reshapes priorities mid-project. Teams that build in frequent check-ins and demos catch misunderstandings early instead of at final delivery.\n- **Development and budget provisions** — The money and time available directly limit team size, tooling, and how much testing or documentation is realistic. A tight budget often means a leaner, faster-moving process; a well-funded one can afford more upfront design and QA.\n- **Skills of developers and managers** — Experienced teams can safely move faster with lighter process, because they catch problems intuitively. Less experienced teams usually need more structure — checklists, code review, closer management — to reach the same reliability.",
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "None of these factors work alone — a large, complex project with a tight budget and a junior team is a very different (and riskier) situation than the same project with a senior team and healthy funding.",
          },
          {
            type: "quiz",
            question:
              "Which factor most directly explains why a small, well-funded team of senior engineers can often use a lighter process than a large junior team on a same-sized project?",
            options: [
              "Customer satisfaction",
              "Skills of developers and managers",
              "Project size and complexity",
              "Development and budget provisions",
            ],
            answer: 1,
            explanation:
              "Experienced teams need less formal process to catch the same problems, so skill level directly affects how much structure a project needs.",
          },
        ],
      },
      {
        id: "se-4",
        title: "Why Study Software Engineering? The Benefits",
        xp: 10,
        theory: [
          {
            type: "objectives",
            items: [
              "Explain why software engineering is worth studying, not just picked up on the job",
              "List concrete benefits a disciplined process brings to a project",
              "Connect these benefits back to the CHAOS Report numbers from earlier",
            ],
          },
          {
            type: "text",
            content:
              "You've just seen two hard facts: the software industry is worth roughly $600 billion a year, and only about a third of its projects fully succeed. Studying software engineering — instead of just learning to code — is how individuals and teams push their own odds above that average.",
          },
          {
            type: "text",
            content:
              "- **Fewer failed and challenged projects** — a disciplined process directly targets the causes behind the Standish Group's ~66% \"challenged or failed\" figure.\n- **Predictable cost and schedule** — structured requirement analysis and design make estimates far more reliable than guessing.\n- **Higher quality software** — dedicated testing and analysis phases catch defects before users do.\n- **Easier maintenance** — good design and documentation make it cheaper to fix and extend software for years after release, not just at launch.\n- **Better teamwork** — a shared process and vocabulary let large teams, and teams that change over time, collaborate without constant miscommunication.\n- **Career value** — engineers who understand the full lifecycle, not just coding, are the ones trusted to lead projects and make architectural decisions.",
          },
          {
            type: "callout",
            variant: "success",
            content:
              "Every course after this one — requirements, design, testing, project management — is really just going deeper into one of the ingredients (process, resources, skillset) you met in the first lesson.",
          },
          {
            type: "quiz",
            question:
              "Which of these is a direct benefit of studying software engineering as a discipline, rather than only learning to write code?",
            options: [
              "Guaranteed zero bugs in every project",
              "More predictable cost, schedule, and quality outcomes",
              "No need for testing",
              "Elimination of all project risk",
            ],
            answer: 1,
            explanation:
              "Software engineering doesn't guarantee perfection — it meaningfully improves predictability, quality, and maintainability.",
          },
        ],
      },
      {
        id: "se-5",
        title: "Problem Solving in Software Engineering",
        xp: 12,
        theory: [
          {
            type: "objectives",
            items: [
              "Explain why large software problems are broken into smaller sub-solutions",
              "Describe how unequal partial solutions are combined into one system",
              "Connect problem decomposition to the SDLC phases you've already learned",
            ],
          },
          {
            type: "text",
            content:
              "Real-world problems that software solves are rarely simple enough to attack head-on. Software engineers **decompose** a big, messy problem into smaller pieces, design a solution for each piece, and then **integrate** those pieces back into one working system.",
          },
          {
            type: "text",
            content:
              "Those partial solutions are almost never the same size or shape. One module might be a small utility function; another might be an entire subsystem with its own database and API. That's normal — the pieces don't need to match each other, they just need to fit together correctly.",
          },
          {
            type: "diagram",
            title: "Combining unequal partial solutions into one system",
            nodes: [
              { id: "sol1", label: "Solution 1", color: ACCENT, items: ["Small piece", "e.g. input validation"] },
              { id: "sol2", label: "Solution 2", color: "#fb923c", items: ["Medium piece", "e.g. business logic"] },
              { id: "sol3", label: "Solution 3", color: "#f97316", items: ["Large piece", "e.g. data & storage"] },
              { id: "combined", label: "Combined Solution", color: "#22c55e", items: ["One integrated system", "Greater than any single piece"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Think of it like a jigsaw puzzle with pieces cut in different shapes and sizes — none of them look like the finished picture on their own, but fitted together correctly, they form one complete, working solution.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This is exactly why Design (phase 2 of the SDLC) matters so much: it's where engineers decide how the pieces will fit together *before* anyone starts building them separately.",
          },
          {
            type: "quiz",
            question:
              "Why do software engineers typically break a large problem into several unequal sub-solutions instead of solving it all at once?",
            options: [
              "Because every sub-solution must be the same size",
              "Because smaller, focused pieces are easier to design, build, test, and later integrate",
              "Because it avoids the need for a Design phase",
              "Because it eliminates the need for testing",
            ],
            answer: 1,
            explanation:
              "Decomposing a problem makes each piece more manageable to design, implement, and test — the pieces are then integrated into one complete system.",
          },
        ],
      },
    ],
  },
];

export const SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS =
  RAW_SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS;

export const SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS = applyLessonVideoLinks(
  SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  SOFTWARE_ENGINEERING_FUNDAMENTALS_VIDEO_LINKS,
);

export const SOFTWARE_ENGINEERING_FUNDAMENTALS_TOTAL_XP =
  SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
