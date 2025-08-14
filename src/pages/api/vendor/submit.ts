// src/pages/api/vendor/submit.ts
export async function POST({ request, redirect }: { request: Request; redirect: (path: string) => Response }) {
  const form = await request.formData();

  const lang = String(form.get('lang') ?? 'ja'); // "ja" | "en"
  const circleName = String(form.get('circleName') ?? '').trim();
  const description = String(form.get('description') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();

  // --- 簡易バリデーション ---
  const errors: string[] = [];
  if (!circleName || circleName.length < 2) errors.push('circleName');
  if (!description || description.length < 10) errors.push('description');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email');

  if (errors.length) {
    // 失敗時は元のフォームに戻す（クエリにエラー名を渡す）
    const params = new URLSearchParams({ err: errors.join(',') });
    const back = lang === 'en' ? `/en/vendor/new?${params}` : `/vendor/new?${params}`;
    return redirect(back);
  }

  // --- ここで実保存や通知を実装できます ---
  // 例: Slack Webhook / Google Forms / Supabase / Vercel KV / Resend など
  // 今回はデモとしてサーバーログに出すだけ
  console.log('New vendor submission:', { lang, circleName, description, email });

  // 送信完了ページへ
  return redirect(lang === 'en' ? '/en/vendor/thanks' : '/vendor/thanks');
}
