// shared config (dev and prod)
const { resolve } = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const alias = require('../node_module_overrides/webpack-alias');

const directoryLocation = [__dirname, ".."];

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias,
  },
  context: resolve(...directoryLocation, "src"),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader", "source-map-loader"],
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "awesome-typescript-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        loaders: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        options: {
          name: "img/[name].[hash:8].[ext]",
          scalings: { "@2x": 2, "@3x": 3 },
          esModule: false,
        },
        loader: "react-native-web-image-loader",
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({ template: "index.html.ejs" }),
    new DefinePlugin({ __DEV__: false }),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  performance: {
    hints: false,
  },
};
