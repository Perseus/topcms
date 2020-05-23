export ACCOUNT_SERVER_DB=AccountServer
export ACCOUNT_SERVER_USER=sa
export ACCOUNT_SERVER_PASSWORD="SM8&Y8xiu}"
export ACCOUNT_SERVER_HOST=localhost
export GAME_DB=GameDB
export GAME_DB_USER=sa
export GAME_DB_PASSWORD="SM8&Y8xiu}"
export GAME_DB_HOST=localhost
export NODE_ENV=test

npm run build-ts
npx sequelize db:migrate --env="AccountServer" --migrations-path="dist/database/migrations/AccountServer/"
npx sequelize db:migrate --env="GameDB" --migrations-path="dist/database/migrations/GameDB/"

npm run test:integration