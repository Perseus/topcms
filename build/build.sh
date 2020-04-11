echo "Compiling TypeScript to JS"

cd api
npm run build-ts
node dist/scripts/builder.js buildweb