import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import LessonReadGate from "../../features/learn/shared/LessonReadGate";

/** Captures IntersectionObserver callbacks so tests can "scroll" to the gate. */
let observerCallbacks = [];
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    observerCallbacks.push(callback);
  }
  observe() {}
  disconnect() {
    observerCallbacks = observerCallbacks.filter((cb) => cb !== this.callback);
  }
}

function scrollToGate() {
  act(() => {
    observerCallbacks.forEach((cb) => cb([{ isIntersecting: true }]));
  });
}

function advanceSeconds(seconds) {
  act(() => {
    jest.advanceTimersByTime(seconds * 1000);
  });
}

/** A lesson with `words` words of text, rendered inside the shared content shell. */
function Lesson({ words, extraWords = 0, ...gateProps }) {
  return (
    <div className="oops-lesson-content">
      <p>{Array.from({ length: words }, () => "word").join(" ")}</p>
      {extraWords ? <p>{Array.from({ length: extraWords }, () => "more").join(" ")}</p> : null}
      <LessonReadGate {...gateProps} />
    </div>
  );
}

const markButton = () => screen.getByRole("button", { name: "Mark as read" });

beforeEach(() => {
  jest.useFakeTimers();
  observerCallbacks = [];
  window.IntersectionObserver = MockIntersectionObserver;
  sessionStorage.clear();
  window.history.replaceState({}, "", "/learn/test-course/lesson/l1");
});

afterEach(() => {
  jest.useRealTimers();
  delete window.IntersectionObserver;
});

describe("LessonReadGate minimum reading time", () => {
  it("stays locked until the learner reaches the end and reads long enough", () => {
    const onMarkAsRead = jest.fn();
    // 400 words at 200 words per minute -> 2 minutes.
    render(<Lesson words={400} onMarkAsRead={onMarkAsRead} />);

    expect(markButton()).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Read to the end of the lesson");

    scrollToGate();
    expect(screen.getByRole("status")).toHaveTextContent(/in 2:00|in 1:59/);

    advanceSeconds(100);
    expect(markButton()).toBeDisabled();
    fireEvent.click(markButton());
    expect(onMarkAsRead).not.toHaveBeenCalled();

    advanceSeconds(25);
    expect(markButton()).toBeEnabled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    fireEvent.click(markButton());
    expect(onMarkAsRead).toHaveBeenCalledTimes(1);
  });

  it("needs the end of the lesson even when the time is up", () => {
    render(<Lesson words={20} onMarkAsRead={jest.fn()} />);
    advanceSeconds(60);
    expect(markButton()).toBeDisabled();
    scrollToGate();
    expect(markButton()).toBeEnabled();
  });

  it("uses a 15 second floor for short lessons and a 5 minute cap for long ones", () => {
    const { unmount } = render(<Lesson words={10} onMarkAsRead={jest.fn()} />);
    scrollToGate();
    advanceSeconds(14);
    expect(markButton()).toBeDisabled();
    advanceSeconds(2);
    expect(markButton()).toBeEnabled();
    unmount();

    sessionStorage.clear();
    window.history.replaceState({}, "", "/learn/test-course/lesson/long");
    render(<Lesson words={5000} onMarkAsRead={jest.fn()} />);
    scrollToGate();
    expect(screen.getByRole("status")).toHaveTextContent(/in (5:00|4:59)/);
    advanceSeconds(301);
    expect(markButton()).toBeEnabled();
  });

  it("does not count time while the tab is hidden", () => {
    render(<Lesson words={10} onMarkAsRead={jest.fn()} />);
    scrollToGate();

    Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
    advanceSeconds(60);
    expect(markButton()).toBeDisabled();

    Object.defineProperty(document, "visibilityState", { value: "visible", configurable: true });
    advanceSeconds(16);
    expect(markButton()).toBeEnabled();
  });

  it("keeps reading progress for the lesson after a remount (reload or tab switch)", () => {
    const { unmount } = render(<Lesson words={200} onMarkAsRead={jest.fn()} />);
    scrollToGate();
    advanceSeconds(40);
    unmount();

    render(<Lesson words={200} onMarkAsRead={jest.fn()} />);
    expect(screen.getByRole("status")).toHaveTextContent(/in 0:2\d/);
    advanceSeconds(21);
    expect(markButton()).toBeEnabled();
  });

  it("counts content that loads in the first seconds, then freezes the time", () => {
    const onMarkAsRead = jest.fn();
    // 100 words -> 30 s, but 100 more load after 2 s -> 60 s.
    const { rerender } = render(<Lesson words={100} onMarkAsRead={onMarkAsRead} />);
    scrollToGate();
    advanceSeconds(2);
    rerender(<Lesson words={100} extraWords={100} onMarkAsRead={onMarkAsRead} />);
    advanceSeconds(10);
    expect(screen.getByRole("status")).toHaveTextContent(/in 0:4[789]/);

    // Quiz explanations appearing later (here +400 words) must not raise it again.
    rerender(<Lesson words={100} extraWords={500} onMarkAsRead={onMarkAsRead} />);
    advanceSeconds(49);
    expect(markButton()).toBeEnabled();
    fireEvent.click(markButton());
    expect(onMarkAsRead).toHaveBeenCalledTimes(1);
  });

  it("still asks for the quick checks once reading is done", () => {
    const onMarkAsRead = jest.fn();
    render(
      <Lesson words={10} onMarkAsRead={onMarkAsRead} quizzesRequired={2} quizzesAttempted={1} />,
    );
    scrollToGate();
    advanceSeconds(16);
    fireEvent.click(markButton());
    expect(screen.getByRole("alert")).toHaveTextContent("Solve the MCQs");
    expect(onMarkAsRead).not.toHaveBeenCalled();
  });

  it("shows the confidence panel, not the timer, for a lesson already marked as read", () => {
    render(<Lesson words={400} markedAsRead onConfidenceChange={jest.fn()} />);
    expect(screen.queryByRole("button", { name: "Mark as read" })).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
