import React, { useEffect, useRef, useState } from "react";

const GIS_SRC = "https://accounts.google.com/gsi/client";
let gisScriptPromise = null;

function loadGisScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Sign-In is unavailable"));
  }
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }
  if (gisScriptPromise) return gisScriptPromise;

  gisScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GIS_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Google Sign-In")),
      );
      if (window.google?.accounts?.id) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = GIS_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Sign-In"));
    document.head.appendChild(script);
  });

  return gisScriptPromise;
}

/**
 * Google Identity Services button (credential / ID token flow).
 */
export default function ContinueWithGoogle({ onCredential, disabled = false }) {
  const buttonRef = useRef(null);
  const onCredentialRef = useRef(onCredential);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const clientId = (
    process.env.REACT_APP_GOOGLE_CLIENT_ID ||
    process.env.REACT_APP_GOOGLE_DRIVE_OAUTH_CLIENT_ID ||
    ""
  ).trim();

  useEffect(() => {
    onCredentialRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    let cancelled = false;

    if (!clientId) {
      setError("");
      setReady(false);
      return undefined;
    }

    loadGisScript()
      .then(() => {
        if (cancelled || !buttonRef.current) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (response?.credential) {
              onCredentialRef.current?.(response.credential);
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        buttonRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: 340,
          logo_alignment: "left",
        });
        setReady(true);
        setError("");
      })
      .catch((err) => {
        if (cancelled) return;
        setReady(false);
        setError(err.message || "Google Sign-In unavailable");
      });

    return () => {
      cancelled = true;
    };
  }, [clientId]);

  if (!clientId) {
    return (
      <p className="auth-google-hint">
        Google Sign-In is not configured. Set{" "}
        <code>REACT_APP_GOOGLE_CLIENT_ID</code> in the frontend env.
      </p>
    );
  }

  return (
    <div className={`auth-google${disabled ? " is-disabled" : ""}`}>
      <div ref={buttonRef} className="auth-google-btn" aria-busy={!ready} />
      {error ? <p className="auth-google-hint auth-google-hint--error">{error}</p> : null}
    </div>
  );
}
