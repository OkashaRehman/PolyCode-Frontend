import React from "react";
import QuantumLanguageLessonPage from "../../shared/QuantumLanguageLessonPage";
import useQuantumMultiSyntaxProgress from "../hooks/useQuantumMultiSyntaxProgress";
import { QUANTUM_MULTI_SYNTAX_CHAPTERS, QUANTUM_MULTI_SYNTAX_LESSONS, QUANTUM_MULTI_SYNTAX_TOTAL_XP } from "../data/quantumMultiSyntaxCurriculum";

const config = { title: "Quantum Multi Syntax", basePath: "/learn/quantum-multi-syntax", storagePrefix: "quantum_multi_syntax", readGatePrefix: "quantum_multi_syntax", accent: "#6366f1", chapters: QUANTUM_MULTI_SYNTAX_CHAPTERS, lessons: QUANTUM_MULTI_SYNTAX_LESSONS, totalXP: QUANTUM_MULTI_SYNTAX_TOTAL_XP, useProgress: useQuantumMultiSyntaxProgress };
export default function QuantumMultiSyntaxLessonPage() { return <QuantumLanguageLessonPage config={config} />; }
