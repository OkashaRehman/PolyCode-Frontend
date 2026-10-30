import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { getProfilePictureSrc } from "../utils/profilePictureUrl";
import { capitalizeNamePart } from "../utils/profileDisplayUtils";

export function getProfileInitials(user) {
  if (!user) return "G";
  if (user.name?.trim()) {
    const parts = user.name.trim().split(/\s+/).filter(Boolean);
    if (parts[0]) {
      return `${parts[0][0]}${parts[1]?.[0] || ""}`.toUpperCase();
    }
  }
  const first = capitalizeNamePart(user.firstName);
  const last = capitalizeNamePart(user.lastName);
  if (first) {
    return `${first[0]}${last[0] || ""}`.toUpperCase();
  }
  const username = capitalizeNamePart(user.username);
  return (username[0] || "U").toUpperCase();
}

export default function ProfileAvatar({
  user,
  size = "md",
  className = "",
  previewUrl,
}) {
  const { avatarPreview } = useAuth();
  const initials = getProfileInitials(user);
  const [imageFailed, setImageFailed] = useState(false);
  const pictureSrc = getProfilePictureSrc(
    user,
    previewUrl || avatarPreview || null,
  );

  useEffect(() => {
    setImageFailed(false);
  }, [pictureSrc]);

  const sizeClass =
    size === "lg" ? "profile-avatar-lg" : size === "sm" ? "profile-avatar-sm" : "";

  if (pictureSrc && !imageFailed) {
    return (
      <img
        src={pictureSrc}
        alt=""
        className={`profile-avatar-img ${sizeClass} ${className}`.trim()}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <span className={`profile-avatar-fallback ${sizeClass} ${className}`.trim()}>
      {initials}
    </span>
  );
}
