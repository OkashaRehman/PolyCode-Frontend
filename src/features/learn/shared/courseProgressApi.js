import { apiFetch } from "../../../lib/apiClient";
import { getApiBase } from "../../../config/apiBase";

async function request(courseId, path, token, options = {}) {
  const data = await apiFetch(
    `/auth/learn/${encodeURIComponent(courseId)}/progress${path}`,
    {
      token,
      fallbackMessage: `Unable to sync ${courseId} progress`,
      ...options,
    },
  );
  return data.progress;
}

export function getCourseProgress(token, courseId) {
  return request(courseId, "", token);
}

export function setLastCourseLesson(token, courseId, lessonId) {
  return request(courseId, "/last-lesson", token, {
    method: "POST",
    body: JSON.stringify({ lessonId }),
  });
}

export function completeCourseLesson(token, courseId, lesson) {
  return request(courseId, "/complete", token, {
    method: "POST",
    body: JSON.stringify({ lesson }),
  });
}

export function saveCourseCode(token, courseId, lessonId, code) {
  return request(courseId, "/code", token, {
    method: "POST",
    body: JSON.stringify({ lessonId, code }),
  });
}

export function saveCourseNote(token, courseId, lessonId, note) {
  return request(courseId, "/note", token, {
    method: "POST",
    body: JSON.stringify({ lessonId, note }),
  });
}

export function toggleCourseBookmark(token, courseId, lessonId) {
  return request(courseId, "/bookmark", token, {
    method: "POST",
    body: JSON.stringify({ lessonId }),
  });
}

export function addCourseTime(token, courseId, minutes) {
  return request(courseId, "/time", token, {
    method: "POST",
    body: JSON.stringify({ minutes }),
  });
}

export function upsertLessonEngagement(token, courseId, payload) {
  return request(courseId, "/engagement", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getLearnDashboard(token) {
  const data = await apiFetch("/auth/learn/dashboard", {
    token,
    fallbackMessage: "Unable to load learner dashboard",
  });
  return {
    overview: data.overview || {},
    courses: data.courses || [],
    activity: data.activity || [],
  };
}

export async function getPublicLearnDashboard(username) {
  const clean = String(username || "").replace(/^@/, "").trim();
  const data = await apiFetch(
    `/auth/username/${encodeURIComponent(clean)}/learn/dashboard`,
    {
      auth: false,
      fallbackMessage: "Unable to load public learner dashboard",
    },
  );
  return {
    overview: data.overview || {},
    courses: data.courses || [],
    activity: data.activity || [],
  };
}

export async function listMyCourseProgress(token) {
  const data = await apiFetch("/auth/learn/progress", {
    token,
    fallbackMessage: "Unable to load course progress",
  });
  return data.courses || [];
}

export async function listPublicCourseProgress(username) {
  const clean = String(username || "").replace(/^@/, "").trim();
  const data = await apiFetch(
    `/auth/username/${encodeURIComponent(clean)}/learn/progress`,
    {
      auth: false,
      fallbackMessage: "Unable to load public course progress",
    },
  );
  return data.courses || [];
}

export async function mergeLocalCourseProgress(token, courses) {
  const data = await apiFetch("/auth/learn/progress/merge", {
    token,
    method: "POST",
    body: JSON.stringify({ courses }),
    fallbackMessage: "Unable to merge local progress",
  });
  return data.results || {};
}

export function progressToMap(progress) {
  return (progress?.completedLessons || []).reduce((acc, item) => {
    acc[item.lessonId] = { xp: item.xp, at: item.completedAt };
    return acc;
  }, {});
}

export function savedCodeToMap(progress) {
  return (progress?.savedCode || []).reduce((acc, item) => {
    acc[item.lessonId] = item.code;
    return acc;
  }, {});
}

export function notesToMap(progress) {
  return (progress?.notes || []).reduce((acc, item) => {
    acc[item.lessonId] = item.note;
    return acc;
  }, {});
}

export function engagementToMap(progress) {
  return (progress?.lessonEngagement || []).reduce((acc, item) => {
    if (!item?.lessonId) return acc;
    acc[item.lessonId] = {
      read: Boolean(item.read),
      confidence: item.confidence || "",
      quizAttempts:
        item.quizAttempts && typeof item.quizAttempts === "object"
          ? item.quizAttempts
          : {},
      challengeAttempts: Number(item.challengeAttempts) || 0,
      challengeLastResult: item.challengeLastResult || "",
      lastTab: item.lastTab || "",
    };
    return acc;
  }, {});
}

export async function getLessonAnnotation(token, courseId, lessonId, tab = "theory") {
  const data = await apiFetch(
    `/auth/learn/${encodeURIComponent(courseId)}/annotations/${encodeURIComponent(lessonId)}?tab=${encodeURIComponent(tab || "theory")}`,
    {
      token,
      fallbackMessage: "Unable to load lesson annotations",
    },
  );
  return data.annotation;
}

export async function putLessonAnnotation(
  token,
  courseId,
  lessonId,
  tab,
  payload,
) {
  const data = await apiFetch(
    `/auth/learn/${encodeURIComponent(courseId)}/annotations/${encodeURIComponent(lessonId)}`,
    {
      token,
      method: "PUT",
      body: JSON.stringify({
        tab: tab || "theory",
        strokes: payload?.strokes || [],
        labels: payload?.labels || [],
        images: payload?.images || [],
      }),
      fallbackMessage: "Unable to save lesson annotations",
    },
  );
  return data.annotation;
}

/** Upload a compressed image data URL; resolves to its imageId. */
export async function uploadAnnotationImage(token, imageBase64) {
  const data = await apiFetch("/auth/learn/annotation-images", {
    token,
    method: "POST",
    body: JSON.stringify({ imageBase64 }),
    fallbackMessage: "Unable to upload image",
  });
  return data.image.imageId;
}

export function annotationImageUrl(imageId) {
  return `${getApiBase()}/auth/learn/annotation-images/${encodeURIComponent(imageId)}`;
}

export async function mergeLocalAnnotations(token, annotations) {
  const data = await apiFetch("/auth/learn/annotations/merge", {
    token,
    method: "POST",
    body: JSON.stringify({ annotations }),
    fallbackMessage: "Unable to merge lesson annotations",
  });
  return data.results || [];
}
