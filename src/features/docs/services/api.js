import axios from "axios";
import { getApiBase } from "../../../config/apiBase";
import { toDocumentApiPath } from "../../../shared/utils/docPaths";

const API_BASE = getApiBase();

// ── In-memory cache with TTL ──────────────────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes (was 5)

const getCacheKey = (url, params) => `${url}?${JSON.stringify(params || {})}`;

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCache = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// ── In-flight request deduplication ──────────────────────────────────────────
// If the same GET is fired twice before the first resolves, both callers
// share one network request instead of making two.
const inFlight = new Map();

// Periodic cache cleanup
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp >= CACHE_TTL) cache.delete(key);
  }
}, CACHE_TTL);

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Log slow requests in dev
api.interceptors.request.use((config) => {
  config.metadata = { startTime: Date.now() };
  return config;
});

api.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime;
    if (duration > 2000) {
      console.warn(`Slow API: ${response.config.url} took ${duration}ms`);
    }
    if (response.config.method === "get") {
      const key = getCacheKey(response.config.url, response.config.params);
      setCache(key, response.data);
    }
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

// ── Deduplicated GET helper ───────────────────────────────────────────────────
async function dedupGet(url, params) {
  const key = getCacheKey(url, params);

  // 1. Return from cache immediately if available
  const cached = getFromCache(key);
  if (cached) return { data: cached };

  // 2. Return existing in-flight promise if one is running
  if (inFlight.has(key)) return inFlight.get(key);

  // 3. Fire a new request and register it
  const promise = api
    .get(url, { params })
    .then((r) => {
      inFlight.delete(key);
      return r;
    })
    .catch((err) => {
      inFlight.delete(key);
      throw err;
    });

  inFlight.set(key, promise);
  return promise;
}

// ── Public API functions ──────────────────────────────────────────────────────
export const getDocuments = (params) => dedupGet("/documents", params);

export const getDocument = (id, language) => {
  const params = language ? { language } : {};
  return dedupGet(`/documents/${toDocumentApiPath(id, language)}`, params);
};

export const getCategories = (params) =>
  dedupGet("/documents/categories", params);

export const getStats = (params) => dedupGet("/documents/stats", params);

export const getTree = (params) => dedupGet("/documents/tree", params);

export const getLanguages = async () => {
  const response = await dedupGet("/documents/languages", undefined);
  if (response && response.data) {
    let list = Array.isArray(response.data.languages) ? response.data.languages : (Array.isArray(response.data) ? response.data : null);
    if (list && !list.some(l => l.toLowerCase() === 'sql')) {
      if (Array.isArray(response.data.languages)) {
        response.data.languages.push('SQL');
      } else if (Array.isArray(response.data)) {
        response.data.push('SQL');
      }
    }
  }
  return response;
};

export const runPythonCode = async (code, stdin = "") => {
  const response = await api.post("/documents/run-python", { code, stdin });
  return response.data;
};

export const clearCache = () => cache.clear();
export const getCacheSize = () => cache.size;
