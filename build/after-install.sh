cd /home/ubuntu/topcms
npm i -g pm2

echo "Removing node_modules"
rm -rf node_modules

echo "Installing node_modules"
npm install

echo "APP_URL=https://topcms.anirudhsingh.dev" >> .env