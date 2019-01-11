const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const { uglify } = require("rollup-plugin-uglify");
const sourcemaps = require("rollup-plugin-sourcemaps");
const serve = require("rollup-plugin-serve");
const { env } = process.env;
let config = {
  input: "./src/keyCacheQueue.js",
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**" // 只编译我们的源代码
      //   runtimeHelpers: true
    })
  ],
  output: {
    name: "KeyCacheQueue",
    file: "./dist/keyCacheQueue.js",
    format: "umd",
    sourcemap: true
  }
};

if (env === "production") {
  config.plugins.push(uglify());
} else if (env === "development") {
  config.plugins.push(sourcemaps());
  config.plugins.push(
    serve({
      contentBase: "./",
      open: true,
      openPage: "/test/"
    })
  );
}

module.exports = config;
