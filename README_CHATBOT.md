# 館内案内チャットボット

## セットアップ（初回のみ）

### 1. 環境変数

プロジェクトルートに `.env.local` を作成し、以下を記述してください。

```
GEMINI_API_KEY=あなたのAPIキー
```

※ `.env.local` は git に含めないでください（既に .gitignore に含まれています）。

### 2. ネット公開（Vercel など）でチャットボットを動かす場合

**ローカルでは動くが、本番（Vercel など）で「APIキーが設定されていません」と出る原因**  
`.env.local` は **Git に含まれない**ため、デプロイ先のサーバーには存在しません。そのため `GEMINI_API_KEY` が未設定になり、チャット API がエラーを返します。

**対処（Vercel の例）**

1. [Vercel Dashboard](https://vercel.com/dashboard) で対象プロジェクトを開く  
2. **Settings** → **Environment Variables** を開く  
3. 次のように追加する  
   - **Name**: `GEMINI_API_KEY`  
   - **Value**: ローカルの `.env.local` に書いているのと同じ API キー  
   - **Environment**: Production（必要なら Preview / Development も選択）  
4. **Save** 後、**Deployments** から **Redeploy** で再デプロイする（環境変数を変えたあとは再デプロイが必要です）

他のホスティング（Netlify, Railway など）でも、そのサービス用の「環境変数」設定画面で `GEMINI_API_KEY` を同じ名前・同じ値で設定すれば動作します。

### 3. パッケージのインストール

```bash
npm install
```

`@google/generative-ai` は package.json に追加済みです。

## hotel-info.md の更新について

`data/hotel-info.md` はチャットボットの「知識ベース」です。ここに書いた内容を元に、AI が館内案内の回答を生成します。

### 更新のポイント

- **Markdown のまま編集**  
  見出し（`##`）やリスト（`-`）を使って整理すると、AI が参照しやすくなります。
- **事実だけを書く**  
  チェックイン時間・朝食の場所・Wi-Fi の情報など、変更があったらここを更新してください。
- **曖昧な表現を避ける**  
  「〜階」「〜時〜分」など、できるだけ具体的に書くと回答の精度が上がります。
- **運用で変わる部分**  
  臨時休業・時間変更・新しいサービスなどは、都度このファイルに追記・修正してください。

### 編集後の動作

`app/api/chat/route.ts` は**リクエストのたびに** `hotel-info.md` を読み直しています。  
ファイルを更新して保存すれば、次のチャットから新しい内容が反映されます。サーバーの再起動は不要です。
