import React from "react";
import QuantumLanguageHub from "../../shared/QuantumLanguageHub";
import useQuantumMultiSyntaxProgress from "../hooks/useQuantumMultiSyntaxProgress";
import { QUANTUM_MULTI_SYNTAX_CHAPTERS, QUANTUM_MULTI_SYNTAX_LESSONS, QUANTUM_MULTI_SYNTAX_TOTAL_XP } from "../data/quantumMultiSyntaxCurriculum";

const config = { title: "Quantum Multi Syntax", description: "Learn how Quantum combines Python-style and C++-style syntax in one readable `.sa` program.", basePath: "/learn/quantum-multi-syntax", storagePrefix: "quantum_multi_syntax", readGatePrefix: "quantum_multi_syntax", accent: "#6366f1", chapters: QUANTUM_MULTI_SYNTAX_CHAPTERS, lessons: QUANTUM_MULTI_SYNTAX_LESSONS, totalXP: QUANTUM_MULTI_SYNTAX_TOTAL_XP, useProgress: useQuantumMultiSyntaxProgress };
export default function QuantumMultiSyntaxHub() { return <QuantumLanguageHub config={config} />; }
