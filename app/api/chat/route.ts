import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";
import { join } from "path";

const OFFICIAL_SITE_URL = "https://breezbay-group.com/hgt-s-kokubuncho/";
const OFFICIAL_SITE_CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
const OFFICIAL_SITE_TEXT_MAX_CHARS = 12000;
const OFFICIAL_SITE_FETCH_TIMEOUT_MS = 8000;

let officialSiteCache:
  | {
      fetchedAt: number;
      text: string;
    }
  | null = null;

const SYSTEM_PROMPT_PREFIX = `あなたは「ホテルグランテラス仙台国分町」の館内案内アシスタントです。
以下のホテル情報を参照し、お客様の質問に丁寧かつ正確に答えてください。

【重要な回答ルール】
1. **必ずこのサイト内の「ホテル情報（参照用）」セクションを最優先で参照してください**
2. サイト内に情報が記載されている場合は、その情報をそのまま正確に伝えてください
3. 料金・時間・内容など、知識ベースに記載がある情報は具体的に答えてください
4. **公式HPの情報は、サイト内に情報が無い場合のみ補足として使用してください**
5. 外部の一般的な情報やネット検索の情報は使用せず、必ず提供された知識ベース内の情報から回答してください
6. Wi-Fiのパスワードなど、知識ベースに記載がある場合は回答して問題ありません
7. 知識ベースに本当に載っていない情報を聞かれた場合のみ、フロント（内線9番）へご案内ください
8. **回答は簡潔に3〜5行程度にまとめてください。詳細は必要な時のみ伝えてください**
9. 夕食・飲食店について聞かれた場合は、店舗の住所や電話番号などの詳細は省略し、/coupon ページへ誘導してください
10. 観光案内の際は松島観光の拠点としての利便性をアピールしてください

## ホテル情報（参照用）
`;

function loadHotelInfo(): string {
  try {
    const filePath = join(process.cwd(), "data", "hotel-info.md");
    const content = readFileSync(filePath, "utf-8");
    return content;
  } catch (e) {
    console.error("Failed to load hotel-info.md:", e);
    return "（館内情報の読み込みに失敗しました。フロントまでお尋ねください。）";
  }
}

function htmlToPlainText(html: string): string {
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  const withNewlines = withoutScripts
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\s*\/?\s*p\b[^>]*>/gi, "\n")
    .replace(/<\s*\/?\s*div\b[^>]*>/gi, "\n")
    .replace(/<\s*\/?\s*li\b[^>]*>/gi, "\n");
  const stripped = withNewlines.replace(/<[^>]+>/g, " ");
  const decoded = stripped
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return decoded
    .replace(/\r\n/g, "\n")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/\n\s+\n/g, "\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function loadOfficialSiteText(): Promise<string> {
  const now = Date.now();
  if (officialSiteCache && now - officialSiteCache.fetchedAt < OFFICIAL_SITE_CACHE_TTL_MS) {
    return officialSiteCache.text;
  }
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), OFFICIAL_SITE_FETCH_TIMEOUT_MS);
    const res = await fetch(OFFICIAL_SITE_URL, {
      headers: {
        "User-Agent": "hotel-guide-chatbot/1.0",
      },
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      throw new Error(`Official site fetch failed: ${res.status} ${res.statusText}`);
    }
    const html = await res.text();
    const text = htmlToPlainText(html).slice(0, OFFICIAL_SITE_TEXT_MAX_CHARS);
    officialSiteCache = { fetchedAt: now, text };
    return text;
  } catch (e) {
    console.warn("[Chat API] Failed to load official site:", e);
    return "";
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || typeof apiKey !== "string" || !apiKey.trim()) {
    console.error("[Chat API] GEMINI_API_KEY が設定されていません。.env.local を確認してください。");
    return NextResponse.json(
      { error: "APIキーが設定されていません。しばらく経ってからお試しください。" },
      { status: 500 }
    );
  }

  const languageNames: Record<string, string> = {
    ja: "日本語",
    en: "English",
    zh: "简体中文",
    "zh-TW": "繁體中文",
    ko: "한국어",
    fr: "Français",
    de: "Deutsch",
    es: "Español",
    it: "Italiano",
    th: "ไทย",
    vi: "Tiếng Việt",
    id: "Bahasa Indonesia",
    pt: "Português",
    tl: "Tagalog",
    ms: "Bahasa Melayu",
  };

  try {
    const body = await request.json();
    const userMessage = body.message as string | undefined;
    const language = (body.language as string) || "ja";
    if (typeof userMessage !== "string" || !userMessage.trim()) {
      return NextResponse.json(
        { error: "message を送信してください。" },
        { status: 400 }
      );
    }

    const responseLang = languageNames[language] || languageNames.ja;
    const hotelInfo = loadHotelInfo();
    const officialSiteText = await loadOfficialSiteText();
    const genAI = new GoogleGenerativeAI(apiKey);
    const languageInstruction = `【重要】回答は必ず「${responseLang}」で行ってください。お客様がその言語で質問している場合は、同じ言語で簡潔に答えてください。`;
    const officialSiteSection = officialSiteText
      ? `\n\n## 公式HP（補足情報・サイト内に情報が無い場合のみ参照）\nURL: ${OFFICIAL_SITE_URL}\n注意: この情報は、上記の「ホテル情報（参照用）」に記載が無い場合のみ使用してください。\n\n${officialSiteText}\n`
      : "";
    const fullPrompt = `${SYSTEM_PROMPT_PREFIX}\n${hotelInfo}${officialSiteSection}\n\n---\n${languageInstruction}\n\n【回答時の注意】\n- まず「ホテル情報（参照用）」セクションを確認してください\n- そこに情報がある場合は、その情報を優先的に使用してください\n- 公式HPの情報は、サイト内に情報が無い場合の補足としてのみ使用してください\n\n上記のルールに従って、以下のお客様の質問に答えてください。\n\n【質問】\n${userMessage.trim()}`;

    const modelIds = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-2.0-flash"] as const;
    const maxRetries = 3;
    const quotaExceededMessage = "無料枠の制限に達しました。1分ほど待ってから再度お試しください。";
    let result: Awaited<ReturnType<ReturnType<GoogleGenerativeAI["getGenerativeModel"]>["generateContent"]>> | null = null;
    let lastError: unknown = null;

    for (const modelId of modelIds) {
      const model = genAI.getGenerativeModel({ model: modelId });
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          result = await model.generateContent(fullPrompt);
          break;
        } catch (e) {
          lastError = e;
          const msg = e instanceof Error ? e.message : String(e);
          const is404 = msg.includes("404") || msg.includes("not found");
          const is429 =
            msg.includes("429") ||
            msg.includes("quota") ||
            msg.includes("Too Many Requests") ||
            msg.includes("Quota exceeded");
          if (is404) {
            console.warn(`[Chat API] モデル ${modelId} は利用できません。次のモデルを試します。`);
            break;
          }
          if (is429 && attempt < maxRetries - 1) {
            const delayMs = Math.pow(2, attempt) * 1000;
            console.warn(
              `[Chat API] 429 検出。${delayMs / 1000}秒後に再試行します（${attempt + 1}/${maxRetries}）`
            );
            await new Promise((r) => setTimeout(r, delayMs));
            continue;
          }
          if (is429 && attempt === maxRetries - 1) {
            return NextResponse.json({ error: quotaExceededMessage, code: "QUOTA_EXCEEDED" }, { status: 429 });
          }
          throw e;
        }
      }
      if (result) break;
    }

    if (!result) {
      console.error("[Chat API] 利用可能なモデルがありません:", lastError);
      throw lastError ?? new Error("モデルで回答を取得できませんでした。");
    }

    const response = result.response;

    if (!response.candidates || response.candidates.length === 0) {
      const blockReason = response.promptFeedback?.blockReason;
      console.error("[Chat API] Gemini が回答を返しませんでした:", blockReason, response.promptFeedback);
      return NextResponse.json(
        { error: "回答を生成できませんでした。内容を変えて再度お試しください。" },
        { status: 500 }
      );
    }

    const text = response.text();
    return NextResponse.json({ reply: text || "申し訳ございません。回答を生成できませんでした。" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Chat API] エラー:", err);
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? `チャットの処理中にエラーが発生しました。（${message}）`
        : "チャットの処理中にエラーが発生しました。しばらく経ってからお試しください。";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
