import React, { useState } from "react";

function formatDateLabel(dateKey) {
  const date = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateKey;
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DailyXpProgressSection({
  data,
  loading,
  error,
  markingDate,
  onRefresh,
  onMarkRead,
}) {
  const [showJson, setShowJson] = useState(false);

  if (loading && !data) {
    return (
      <section className="profile-daily-xp-card">
        <p className="profile-daily-xp-state">Loading daily XP progress…</p>
      </section>
    );
  }

  if (error && !data) {
    return (
      <section className="profile-daily-xp-card profile-daily-xp-card--error">
        <p className="profile-daily-xp-state">{error}</p>
        <button type="button" className="profile-daily-xp-btn" onClick={onRefresh}>
          Retry
        </button>
      </section>
    );
  }

  if (!data) return null;

  const { days = [], totalXp = 0, unreadDays = 0, readBonusXp = 3 } = data;

  return (
    <section className="profile-daily-xp-card">
      <div className="profile-daily-xp-head">
        <div>
          <span>Daily XP</span>
          <h2>Your progress by day</h2>
        </div>
        <div className="profile-daily-xp-stats">
          <strong>{totalXp} XP</strong>
          <small>{unreadDays} unread</small>
        </div>
      </div>

      <div className="profile-daily-xp-actions">
        <button
          type="button"
          className="profile-daily-xp-btn"
          onClick={() => setShowJson((open) => !open)}
        >
          {showJson ? "Hide JSON" : "View JSON"}
        </button>
        <button type="button" className="profile-daily-xp-btn" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      {showJson ? (
        <pre className="profile-daily-xp-json" aria-label="Daily XP JSON">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : null}

      {days.length === 0 ? (
        <p className="profile-daily-xp-state">
          Complete lessons while signed in to build your daily XP history.
        </p>
      ) : (
        <ul className="profile-daily-xp-list">
          {days.map((day) => (
            <li key={day.date} className="profile-daily-xp-day">
              <div className="profile-daily-xp-day-main">
                <strong>{formatDateLabel(day.date)}</strong>
                <span>
                  {day.lessonsCompleted} lesson{day.lessonsCompleted === 1 ? "" : "s"}
                  {day.courses?.length
                    ? ` · ${day.courses.join(", ")}`
                    : ""}
                </span>
              </div>
              <div className="profile-daily-xp-day-xp">
                <strong>{day.xpEarned} XP</strong>
                <small>
                  {day.lessonXp} lesson
                  {day.readBonusXp ? ` + ${day.readBonusXp} read` : ""}
                </small>
              </div>
              <div className="profile-daily-xp-day-action">
                {day.read ? (
                  <span className="profile-daily-xp-read">Read</span>
                ) : (
                  <button
                    type="button"
                    className="profile-daily-xp-mark"
                    disabled={markingDate === day.date}
                    onClick={() => onMarkRead(day.date)}
                  >
                    {markingDate === day.date
                      ? "Saving…"
                      : `Mark read (+${readBonusXp} XP)`}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
