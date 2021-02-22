module.exports = {
  "presets": [
      ["@babel/preset-env", {
          "targets": {
              "browsers": ["Android >= 4", "iOS >= 8"]
          },
          "modules": false,
          "loose": true
      }]
  ],
  "plugins": [
      "@babel/plugin-external-helpers",
      [
          "@babel/plugin-transform-runtime",
          {
              "regenerator": true
          }
      ]
  ]
}
