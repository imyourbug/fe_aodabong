const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    entry: "./src/main.js",
    devServer: {
      hot: true,
      host: 'web_preview.test'
    },
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
    },
  },
  transpileDependencies: true,
  lintOnSave: false,
})
