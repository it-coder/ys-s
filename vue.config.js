const path = require("path");
const { defineConfig } = require("@vue/cli-service");

function r(dir) {
  return path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/cdm-screen",

  devServer: {
    proxy: {
      "/": {
        ws: false,
        target: "http://20.21.1.243:10011",
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "/@": r("./src"),
        "/~": r("./node_modules/"),
      },
    },
  },
});
