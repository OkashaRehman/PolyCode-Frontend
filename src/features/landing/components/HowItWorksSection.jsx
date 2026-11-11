import React, { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { BookOpen, Bot, Shield } from "lucide-react";
import OpenAssistantButton from "./OpenAssistantButton";

const FEATURES = [
  {
    id: "courses",
    icon: BookOpen,
    title: "Structured Learning",
    description:
      "Learn through organized courses, coding exercises, and hands-on practice.",
    tag: "Courses",
    barClass: "landing-feat-bar--violet",
    iconClass: "landing-feat-icon--violet",
    tagClass: "landing-feat-tag--violet",
    action: "get-started",
  },

  {
    id: "mentor",
    icon: Bot,
    title: "AI Mentor",
    description:
      "Get instant explanations, debugging help, and programming guidance.",
    tag: "AI Powered",
    barClass: "landing-feat-bar--cyan",
    iconClass: "landing-feat-icon--cyan",
    tagClass: "landing-feat-tag--cyan",
    action: "assistant",
  },

  {
    id: "security",
    icon: Shield,
    title: "Security Analysis",
    description:
      "Identify vulnerabilities and improve code quality automatically.",
    tag: "Built In",
    barClass: "landing-feat-bar--orange",
    iconClass: "landing-feat-icon--orange",
    tagClass: "landing-feat-tag--orange",
    action: null,
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section id="modules" ref={ref} className="landing-section">
      <div className="landing-container">
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="landing-sec-label">Core Features</p>
          <h2 className="landing-sec-title">
            Everything You Need To Learn Programming
          </h2>
          <p className="landing-sec-sub">
            Learn, build, and improve your code with intelligent assistance.
          </p>
        </motion.div>

        <motion.div
          className="landing-feat-container"
          initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            const inner = (
              <>
                <div className={`landing-feat-icon ${feature.iconClass}`}>
                  <Icon size={22} aria-hidden />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className={`landing-feat-tag ${feature.tagClass}`}>
                  {feature.tag}
                </span>
              </>
            );

            if (feature.action === "assistant") {
              return (
                <OpenAssistantButton
                  key={feature.id}
                  className="landing-feat-card landing-feat-card--clickable"
                >
                  {inner}
                </OpenAssistantButton>
              );
            }

            if (feature.action === "get-started") {
              return (
                <a
                  key={feature.id}
                  href="#get-started"
                  className="landing-feat-card landing-feat-card--clickable"
                >
                  {inner}
                </a>
              );
            }

            return (
              <div key={feature.id} className="landing-feat-card">
                {inner}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
