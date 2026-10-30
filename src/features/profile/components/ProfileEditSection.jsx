import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import ProfileAvatar from "./ProfileAvatar";

export default function ProfileEditSection({ open, onClose }) {
  const { user, token, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    name: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      username: user.username || "",
      name:
        user.name ||
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        "",
    });
  }, [user]);

  useEffect(() => {
    if (!open) {
      setError("");
      setMessage("");
    }
  }, [open]);

  if (!open) return null;

  if (!user || !token) {
    return (
      <section className="profile-edit-card profile-edit-card--below-hero">
        <p>Sign in to edit your profile.</p>
      </section>
    );
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSaveProfile(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await updateProfile({
        username: form.username.trim(),
        name: form.name.trim(),
      });
      setMessage("Profile saved.");
      onClose?.();
    } catch (err) {
      setError(err.message || "Could not save profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="profile-edit-card profile-edit-card--below-hero">
      <div className="profile-edit-head">
        <h2>Edit profile</h2>
        <button type="button" className="profile-edit-btn" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="profile-edit-avatar-row">
        <div className="profile-edit-avatar-wrap">
          <ProfileAvatar user={user} size="lg" />
        </div>
      </div>

      <form className="profile-edit-form" onSubmit={handleSaveProfile}>
        <label>
          Email
          <input type="email" value={user.email} disabled readOnly />
          <small>Email cannot be changed.</small>
        </label>

        <label>
          Username
          <input
            type="text"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            minLength={3}
            maxLength={30}
            required
          />
        </label>

        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            maxLength={120}
            placeholder="First middle last"
          />
        </label>

        <div className="profile-edit-actions">
          <button type="button" className="profile-edit-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="profile-edit-btn profile-edit-btn-primary"
            disabled={saving}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>

      {message && <p className="profile-edit-message">{message}</p>}
      {error && <p className="profile-edit-error">{error}</p>}
    </section>
  );
}
