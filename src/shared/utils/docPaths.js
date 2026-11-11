export function normalizeDocPath(path = "") {
  const rawPath = String(path);
  let decodedPath = rawPath;

  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch {
    decodedPath = rawPath;
  }

  return decodedPath.replace(/\\/g, "/").replace(/^\/+/, "");
}

export function stripLanguagePrefix(path = "", language) {
  const normalized = normalizeDocPath(path);
  if (!language) return normalized;

  const normalizedLanguage = normalizeDocPath(language).toLowerCase();
  const lowerPath = normalized.toLowerCase();
  const prefix = `${normalizedLanguage}/`;

  return lowerPath.startsWith(prefix)
    ? normalized.slice(prefix.length)
    : normalized;
}

export function toDocRoute(path = "") {
  const normalized = normalizeDocPath(path);
  const encodedPath = normalized
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/doc/${encodedPath}`;
}

export function toDocumentApiPath(path = "", language) {
  return stripLanguagePrefix(path, language)
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}
