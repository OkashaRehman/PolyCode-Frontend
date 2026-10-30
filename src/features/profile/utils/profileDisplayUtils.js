export function capitalizeNamePart(value = "") {
  const trimmed = String(value).trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export function getDisplayName(user) {
  if (!user) return "Guest";
  if (user.name?.trim()) return user.name.trim();
  const first = capitalizeNamePart(user.firstName);
  const last = capitalizeNamePart(user.lastName);
  if (first && last) return `${first} ${last}`;
  if (first) return first;
  if (last) return last;
  return capitalizeNamePart(user.username) || "Guest";
}

export function getDisplayUsername(user) {
  const username = user?.username?.trim();
  return username ? `@${username}` : "";
}

export function getDisplayBio(user) {
  const bio = user?.bio?.trim();
  return bio || "";
}
