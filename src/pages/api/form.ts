// src/pages/api/form.ts
// Astro のサーバールート。ブラウザ → (同一ドメイン) → /api/form → (サーバー側) → GAS
// これでブラウザに GAS の URL を直接公開せずに済みます。
export const prerender = false; // 動的APIなのでプリレンダしない

type PlainObject = Record<string, string>;

function formDataToObject(fd: FormData): PlainObject {
  const obj: PlainObject = {};
  for (const [k, v] of fd.entries()) obj[k] = String(v);
  return obj;
}

export async function POST({ request }: { request: Request }) {
  const endpoint = import.meta.env.GSCRIPT_ENDPOINT;
  if (!endpoint) {
    return new Response(
      JSON.stringify({ ok: false, message: "Missing GSCRIPT_ENDPOINT" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // どの Content-Type でも JSON に揃える
  const ct = request.headers.get("content-type") || "";
  let payload: PlainObject;

  try {
    if (ct.includes("application/json")) {
      payload = (await request.json()) as PlainObject;
    } else {
      const fd = await request.formData();
      payload = formDataToObject(fd);
    }
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, message: "Invalid body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const gasRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // タイムアウトが欲しければ AbortController も検討
    });

    // GAS 側の返答をそのまま返す（200系/エラー系も透過的）
    const text = await gasRes.text();
    return new Response(text, {
      status: gasRes.status,
      headers: { "Content-Type": gasRes.headers.get("Content-Type") ?? "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, message: "Failed to reach GAS" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
