cd /home/ubuntu/topcms

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

npx sequelize db:migrate --env="GameDB" --migrations-path="./database/migrations/GameDB"
npx sequelize db:migrate --env="AccountServer" --migrations-path="./database/migrations/AccountServer"
npm run prod