module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "backend/src/services",
    "backend/src/controllers"
  ],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    'lcov'
  ]
}
