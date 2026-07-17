import { readJson, writeJson } from "./storage";

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8000";

type CacheEntry<T> = { at: number; value: T };

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(input: RequestInfo | URL, init?: RequestInit) {
  const attempts = 3;
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(input, init);
      return res;
    } catch (e) {
      lastErr = e;
      await sleep(250 * (i + 1));
    }
  }
  throw lastErr ?? new Error("Network error");
}

async function parseJsonSafe(res: Response) {
  const text = await res.text().catch(() => "");
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function cachedGet<T>(
  path: string,
  opts?: { cacheKey?: string; ttlMs?: number; fallback?: () => Promise<T> | T }
): Promise<{ value: T; source: "network" | "cache" | "fallback" }> {
  const cacheKey = opts?.cacheKey ?? `cache:${path}`;
  const ttlMs = opts?.ttlMs ?? 60_000;

  const cached = readJson<CacheEntry<T>>(cacheKey);
  if (cached && Date.now() - cached.at < ttlMs) {
    return { value: cached.value, source: "cache" };
  }

  try {
    const res = await fetchWithRetry(`${API_BASE_URL}${path}`);
    if (!res.ok) {
      const body = await parseJsonSafe(res);
      throw new Error(typeof body === "string" ? body : JSON.stringify(body));
    }
    const json = (await res.json()) as T;
    writeJson(cacheKey, { at: Date.now(), value: json });
    return { value: json, source: "network" };
  } catch (e) {
    if (cached) return { value: cached.value, source: "cache" };
    if (opts?.fallback) return { value: await opts.fallback(), source: "fallback" };
    throw e;
  }
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetchWithRetry(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const b = await parseJsonSafe(res);
    throw new Error(`POST ${path} failed (${res.status}): ${typeof b === "string" ? b : JSON.stringify(b)}`);
  }
  return (await res.json()) as T;
}

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetchWithRetry(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    const b = await parseJsonSafe(res);
    throw new Error(`GET ${path} failed (${res.status}): ${typeof b === "string" ? b : JSON.stringify(b)}`);
  }
  return (await res.json()) as T;
}

export async function patchJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetchWithRetry(`${API_BASE_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const b = await parseJsonSafe(res);
    throw new Error(`PATCH ${path} failed (${res.status}): ${typeof b === "string" ? b : JSON.stringify(b)}`);
  }
  return (await res.json()) as T;
}

