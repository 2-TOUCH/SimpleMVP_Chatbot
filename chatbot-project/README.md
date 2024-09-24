# CareerBot フロントエンド

このプロジェクトは[Next.js](https://nextjs.org)を使用し、[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)でブートストラップされています。

## はじめに

開発サーバーを起動するには：

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

`app/page.tsx` を編集することでページの編集を開始できます。ファイルを編集すると、ページは自動的に更新されます。

このプロジェクトは [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) を使用して、Vercelの新しいフォントファミリーである [Geist](https://vercel.com/font) を自動的に最適化して読み込んでいます。

## プロジェクト固有の設定

1. 環境変数の設定:
   プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を追加してください：
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=あなたのGemini_APIキー
   ```

2. バックエンドの設定:
   `services/api.ts` ファイル内の `API_BASE_URL` を、Railsバックエンドのアドレスに合わせて更新してください。

## 主な機能

- ユーザー認証（新規登録と既存ユーザーログイン）
- Gemini AIを使用したキャリアアドバイスチャット
- レスポンシブなチャットインターフェース


