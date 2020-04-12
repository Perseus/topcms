echo "Installing API server NPM packages"

cd api
npm i --silent
npm i -g typescript 

echo "Installing Web NPM packages"

cd ../web
npm i --silent
