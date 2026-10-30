# Contributing to PolyCode-Frontend

Thank you for your interest in contributing to **PolyCode** — a platform to master multiple programming languages in one place! Whether you're fixing a bug, improving the UI, or adding a new feature, your contributions are welcome and appreciated.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Making Changes](#making-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Coding Standards](#coding-standards)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

By participating in this project, you agree to be respectful and constructive. We are committed to maintaining a welcoming environment for all contributors, regardless of experience level.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Fork & Clone

1. Click **Fork** at the top-right of the [repository page](https://github.com/QuantumLogicsLabs/PolyCode-Frontend).
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/PolyCode-Frontend.git
cd PolyCode-Frontend
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

Copy the example environment file and configure it for local development:

```bash
cp .env.example .env
```

The default value in `.env.example` points to a local backend:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Make sure the [PolyCode backend](https://github.com/QuantumLogicsLabs) is running locally, or point to the production API during development if preferred.

### Run the Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app hot-reloads on file changes.

---

## Project Structure

```
PolyCode-Frontend/
├── public/              # Static assets
├── src/                 # Application source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API calls (axios)
│   └── ...
├── .env.example         # Environment variable template
├── package.json         # Dependencies and scripts
└── README.md
```

Key libraries used in this project:

- **React 19** — UI framework
- **React Router v7** — client-side routing
- **Axios** — HTTP requests to the backend API
- **Monaco Editor** — in-browser code editor
- **Framer Motion** — animations
- **Lucide React** — icon library
- **React Markdown + remark-gfm** — rendering markdown content

---

## Development Workflow

We follow a feature-branch workflow:

1. Always branch off from `main`.
2. Name your branch descriptively:
   - `feature/add-python-lessons`
   - `fix/editor-syntax-highlighting`
   - `chore/update-dependencies`
3. Keep your branch focused — one feature or fix per PR.

---

## Making Changes

### Adding a Feature

- Check the [Issues](https://github.com/QuantumLogicsLabs/PolyCode-Frontend/issues) tab first to avoid duplication.
- For large features, open an issue to discuss the approach before starting.

### Fixing a Bug

- Reference the issue number in your branch name and commit message if one exists (e.g., `fix/issue-42-editor-crash`).

### Working with the Monaco Editor

The project uses `@monaco-editor/react`. When modifying editor-related components, test across multiple languages and screen sizes to ensure no regressions.

### Environment Variables

All environment variables must be prefixed with `REACT_APP_` to be accessible in the React app. Never commit real secrets — use `.env.example` for documentation only.

---

## Submitting a Pull Request

1. Ensure your changes are committed on your feature branch.
2. Push to your fork:

```bash
git push origin your-branch-name
```

3. Open a Pull Request against the `main` branch of `QuantumLogicsLabs/PolyCode-Frontend`.
4. Fill in the PR description:
   - What does this PR do?
   - What issue does it close (if any)? Use `Closes #<issue-number>`.
   - Any screenshots or recordings for UI changes.
5. Wait for a review. Address any requested changes and push updates to the same branch.

---

## Coding Standards

- **Language:** JavaScript (ES6+)
- **Formatting:** Follow the existing code style. Run ESLint before submitting:

```bash
npx eslint src/
```

- **Components:** Write functional components with React Hooks. Avoid class components.
- **Naming:** Use `PascalCase` for components and files, `camelCase` for functions and variables.
- **CSS:** Follow the existing CSS structure in the `src/` directory. Avoid inline styles for anything beyond dynamic values.
- **Commits:** Write clear, concise commit messages in the imperative mood:
  - ✅ `Add syntax highlighting for Go`
  - ✅ `Fix layout break on mobile editor view`
  - ❌ `fixed stuff`

---

## Reporting Issues

If you find a bug or have a feature request:

1. Check if it has [already been reported](https://github.com/QuantumLogicsLabs/PolyCode-Frontend/issues).
2. If not, open a new issue and include:
   - A clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser/OS and relevant version info
   - Screenshots if helpful

---

## Questions?

Feel free to open a [Discussion](https://github.com/QuantumLogicsLabs/PolyCode-Frontend/discussions) or reach out via GitHub Issues if you're unsure about anything before diving in.

Happy coding! 🚀
