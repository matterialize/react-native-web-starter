module.exports = function(api) {
  api.cache(true);

  return {
    sourceType: "unambiguous",
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
    plugins: [
      ["@babel/plugin-transform-runtime", { regenerator: true }],
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-export-default-from",
      "react-hot-loader/babel",
      [
        "module-resolver",
        {
          alias: {
            "^react-dom$": "@hot-loader/react-dom",
          },
        },
      ],
    ],
    env: {
      production: {
        presets: ["minify"],
      },
      test: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-flow",
        ],
      },
    },
  };
};
