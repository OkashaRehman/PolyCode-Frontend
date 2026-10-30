import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/** Password field with a show/hide toggle. Accepts the same props as <input>. */
export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false);
  const label = visible ? "Hide password" : "Show password";

  return (
    <div className="auth-password-wrap">
      <input {...props} type={visible ? "text" : "password"} />
      <button
        type="button"
        className="auth-password-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={label}
        aria-pressed={visible}
        title={label}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
