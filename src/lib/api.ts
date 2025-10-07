// src/lib/api.ts
const BASE = import.meta.env.VITE_API_BASE_URL as string;

function assertBaseUrl() {
  if (!BASE || typeof BASE !== "string") {
    throw new Error(
      "VITE_API_BASE_URL no está definido. Agregalo en .env (ej: http://localhost:5199) y reiniciá npm run dev."
    );
  }
}
assertBaseUrl();

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    // Intentá parsear error JSON del back si lo manda
    let message = text || `HTTP ${res.status}`;
    try {
      const asJson = JSON.parse(text);
      message = asJson?.message ?? message;
    } catch { /* ignore */ }
    throw new Error(message);
  }

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return (await res.json()) as T;
  }
  // si tu back devuelve vacío (204), devolvemos null tipado
  return null as T;
}
