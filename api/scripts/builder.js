/*
BUILD STEPS:

1. Copy config/config.example.json -> config.json
2. Input AccountServer and GameDB auth details -> database/config.json
3. Generate .env file with JWT_SECRET
4. Generate frontend .env file with VUE_APP_GRAPHQL_HTTP and VUE_APP_TITLE
5. Build frontend bundle
6. Copy bundle to api directory

*/