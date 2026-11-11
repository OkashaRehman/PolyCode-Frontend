import React from "react";

function formatMinutes(minutes = 0) {
  const total = Math.max(0, Number(minutes) || 0);
  if (total < 60) return `${total}m`;
  const hours = Math.floor(total / 60);
  const rem = total % 60;
  return rem ? `${hours}h ${rem}m` : `${hours}h`;
}

function StatCell({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/**
 * Profile stats row driven by learn dashboard overview.
 */
export default function LearnerStatsRow({
  overview = {},
  showEngagement = true,
  featuredCompleted = 0,
  featuredTotal = 0,
  featuredPct = 0,
}) {
  const cells = [
    {
      label: "Total XP",
      value: overview.totalXp ?? 0,
    },
    {
      label: "Daily XP",
      value: overview.dailyXpTotal ?? 0,
    },
    {
      label: "Time spent",
      value: formatMinutes(overview.totalMinutesSpent),
    },
    {
      label: "Courses",
      value: `${overview.coursesCompleted ?? 0}/${overview.coursesStarted ?? 0}`,
    },
    {
      label: "Best streak",
      value: `${overview.bestStreak ?? overview.activeStreak ?? 0}d`,
    },
  ];

  if (showEngagement) {
    cells.push(
      {
        label: "Lessons read",
        value: overview.lessonsRead ?? 0,
      },
      {
        label: "Quizzes answered",
        value: overview.quizAnswered ?? 0,
      },
      {
        label: "Quiz correct",
        value: overview.quizCorrect ?? 0,
      },
      {
        label: "Challenge fails",
        value: overview.challengeFails ?? 0,
      },
    );
  } else {
    cells.push({
      label: "Featured progress",
      value: `${featuredCompleted}/${featuredTotal} · ${featuredPct}%`,
    });
  }

  return (
    <section className="profile-overview-grid profile-learner-stats" aria-label="Learner stats">
      {cells.map((cell) => (
        <StatCell key={cell.label} label={cell.label} value={cell.value} />
      ))}
    </section>
  );
}
