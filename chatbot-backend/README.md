# CareerBot バックエンド

CareerBotプロジェクトのRuby on Railsバックエンドです。

## サーバーの起動方法

1. プロジェクトフォルダに移動:
   ```
   cd path/to/chatbot-backend
   ```

2. 必要に応じて依存関係をインストール:
   ```
   bundle install
   ```

3. データベースの設定:
   `config/database.yml` ファイルが正しく設定されていることを確認してください。
    データベースには、以下のカラムがあります：["id", "name", "History", "created_at", "updated_at"]。
   

5. データベースの作成とマイグレーション（初回のみ）:
   ```
   rails db:create db:migrate
   ```

6. サーバーの起動:
   ```
   rails server -p 4000
   ```

これで、APIは `http://localhost:4000` で利用可能になります。

## 主なAPIエンドポイント

- 新規ユーザー作成: `POST /api/v1/users`
- ユーザー情報取得: `GET /api/v1/users?id=<user_id>`

## トラブルシューティング

- データベース接続エラーが発生した場合は、`config/database.yml` の設定を確認してください。
- CORS関連のエラーが発生した場合は、`config/initializers/cors.rb` の設定を確認してください。

## 注意事項

- 本番環境にデプロイする際は、適切な環境変数の設定を忘れずに行ってください。
- APIキーなどの機密情報は `.env` ファイルに保存し、Gitにコミットしないようにしてください。
