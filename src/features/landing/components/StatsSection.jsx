import React from "react";

const STATS = [
  { number: "15+", label: "Programming Languages" },
  { number: "24/7", label: "AI Assistance" },
  { number: "100+", label: "Learning Topics" },
  { number: "AI", label: "Security Analysis" },
];

export default function StatsSection() {
  return (
    <section className="landing-stats">
      <div className="landing-container">
        <div className="landing-stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="landing-stat-card">
              <h3 className="landing-stat-num">{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
