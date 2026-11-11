import React from "react";
import { useLocation } from "react-router-dom";
import AssistantFab from "../../landing/components/AssistantFab";
import { useRouteAssistantContext } from "../hooks/useRouteAssistantContext";
import "../assistant.css";

function RouteAssistantSync() {
  useRouteAssistantContext();
  return null;
}

function AssistantShell() {
  const { pathname } = useLocation();
  const hidden = /^\/(login|signup)$/.test(pathname);

  if (hidden) return null;

  return (
    <>
      <RouteAssistantSync />
      <AssistantFab />
    </>
  );
}

/** PolyMentor UI — mount inside AssistantProvider (see App.js). */
export default function GlobalAssistant() {
  return <AssistantShell />;
}
