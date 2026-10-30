import React from "react";
import QuantumLanguageLessonPage from "../../shared/QuantumLanguageLessonPage";
import useQuantumParadigmCodingProgress from "../hooks/useQuantumParadigmCodingProgress";
import { QUANTUM_PARADIGM_CODING_CHAPTERS, QUANTUM_PARADIGM_CODING_LESSONS, QUANTUM_PARADIGM_CODING_TOTAL_XP } from "../data/quantumParadigmCodingCurriculum";

const config = { title: "Quantum Paradigm Coding", basePath: "/learn/quantum-paradigm-coding", storagePrefix: "quantum_paradigm_coding", readGatePrefix: "quantum_paradigm_coding", accent: "#c026d3", chapters: QUANTUM_PARADIGM_CODING_CHAPTERS, lessons: QUANTUM_PARADIGM_CODING_LESSONS, totalXP: QUANTUM_PARADIGM_CODING_TOTAL_XP, useProgress: useQuantumParadigmCodingProgress };
export default function QuantumParadigmCodingLessonPage() { return <QuantumLanguageLessonPage config={config} />; }
