/**
 * Tiny fetch wrapper. Frontend and backend share one domain on Vercel,
 * so paths like "/api/ask" are relative.
 *   api("/api/sessions")                  -> GET
 *   api("/api/ask", { question: "..." })  -> POST (JSON)
 */
export async function api(path, body) {
  const options = body === undefined
    ? {}
    : {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

  let res;
  try {
    res = await fetch(path, options);
  } catch {
    throw new Error("Can't reach the server. Check your connection and try again.");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON response
  }

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}