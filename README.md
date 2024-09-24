# CareerBot プロジェクト

CareerBotは、Gemini AIを活用したキャリアアドバイスチャットボットアプリケーションです。Next.jsフロントエンドとRuby on Railsバックエンドで構成されています。

## 前提条件

- Node.js (v14以降)
- npm (v6以降)
- Ruby (3.0.0以降)
- Rails (6.0以降)
- PostgreSQL (12以降)
- Gemini AI APIキー

## プロジェクトのセットアップ

### バックエンド（Ruby on Rails）

1. バックエンドディレクトリに移動:
   ```
   cd path/to/chatbot-backend
   ```

2. 依存関係をインストール:
   ```
   bundle install
   ```

3. データベースのセットアップ:
config/database.yml を編集し、PostgreSQLの認証情報を設定してください。
デフォルトでは、ユーザー名が postgres、パスワードが Password に設定されています。
ユーザー名とパスワードは、.envファイルを使用することをお勧めします。

5. データベースの作成とマイグレーション:
   ```
   rails db:create db:migrate
   ```

6. サーバーの起動:
   ```
   rails server -p 4000
   ```

### フロントエンド（Next.js）

1. フロントエンドディレクトリに移動:
   ```
   cd path/to/chatbot-project
   ```

2. 依存関係をインストール:
   ```
   npm install
   ```

3. 環境変数の設定:
   `.env.local` ファイルを作成し、以下の内容を追加:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=あなたのGemini_APIキー
   ```

4. 開発サーバーの起動:
   ```
   npm run dev
   ```

## アプリケーションの使用方法

1. ブラウザで `http://localhost:3000` にアクセスします。
2. 新規ユーザーの場合は「はい」を選択し、名前を入力してアカウントを作成します。
3. 既存ユーザーの場合は「いいえ」を選択し、セッションIDを入力してログインします。
4. チャットボックスにキャリアに関する質問や悩みを入力します。
5. AIが日本語でアドバイスを提供します。

## 主な機能

- ユーザー認証（新規登録と既存ユーザーログイン）
- セッション管理
- Gemini AIを使用したキャリアアドバイス生成
- レスポンシブなチャットインターフェース

## 開発者向け情報

### バックエンドAPI

- 新規ユーザー作成: `POST /api/v1/users`
- ユーザー情報取得: `GET /api/v1/users?id=<user_id>`

### フロントエンドのカスタマイズ

- AIの応答パラメータは 'chatbot-project\services\gemini.ts` の `generateResponse` 関数で調整できます。

## トラブルシューティング

- CORSエラーが発生した場合、Railsの `config/initializers/cors.rb` の設定を確認してください。
- Gemini APIキーが正しく設定されていることを確認してください。
- データベース接続エラーの場合、`database.yml` の設定を確認してください。

## 注意事項

- 本番環境にデプロイする際は、適切なセキュリティ対策を講じてください。
- APIキーなどの機密情報は必ず環境変数として管理し、Gitにコミットしないでください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
