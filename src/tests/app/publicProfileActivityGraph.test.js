import React from "react";
import { render, screen } from "@testing-library/react";
import ProfilePage from "../../features/profile/ProfilePage";

// Jest 27 cannot resolve react-router-dom 7 (package "exports" only), so the
// router pieces the profile uses are stubbed.
jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ to, children, ...rest }) => (
      <a href={to} {...rest}>
        {children}
      </a>
    ),
    useLocation: () => ({ pathname: "/@someone" }),
    useNavigate: () => () => {},
    useParams: () => ({}),
  }),
  { virtual: true },
);

jest.mock("../../features/auth/context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  }),
}));

const DAY_MS = 24 * 60 * 60 * 1000;
const utcDateKey = (daysAgo) =>
  new Date(Date.now() - daysAgo * DAY_MS).toISOString().slice(0, 10);

function respond(body) {
  return Promise.resolve({
    ok: true,
    status: 200,
    text: () => Promise.resolve(JSON.stringify(body)),
  });
}

const requestedPaths = () =>
  global.fetch.mock.calls.map(([url]) => new URL(url).pathname);

beforeEach(() => {
  localStorage.clear();
  // jsdom has no ResizeObserver.
  global.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
  global.fetch = jest.fn((url) => {
    const { pathname } = new URL(url);
    if (pathname === "/api/auth/username/someone") {
      return respond({ user: { username: "someone", firstName: "Some" } });
    }
    if (pathname === "/api/auth/username/someone/learn/dashboard") {
      return respond({
        overview: {},
        courses: [],
        activity: [
          { date: utcDateKey(0), lessonsCompleted: 3 },
          { date: utcDateKey(2), lessonsCompleted: 1 },
        ],
      });
    }
    return respond({});
  });
});

test("a public profile shows the learner's activity graph", async () => {
  render(<ProfilePage />);

  await screen.findByText("Learning activity");
  await screen.findByText("4 completions");

  expect(screen.getAllByLabelText(/: [1-9]\d* lessons? done$/)).toHaveLength(2);
  expect(screen.getByLabelText(/: 3 lessons done$/)).toHaveAttribute(
    "data-level",
    "3",
  );
  expect(screen.getByLabelText(/: 1 lesson done$/)).toHaveAttribute(
    "data-level",
    "1",
  );

  // The owner-only daily XP list stays private, and its endpoint is not hit.
  expect(screen.queryByText("Your progress by day")).not.toBeInTheDocument();
  expect(requestedPaths()).not.toContain("/api/auth/progress/daily-xp");
});
