// import { resolve } from "path";

// module.exports = {
//   stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
//   addons: [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/addon-interactions",
//     "@storybook/preset-create-react-app",
//   ],
//   framework: "@storybook/react",
//   core: {
//     builder: "@storybook/builder-webpack5",
//   },
//   webpackFinal: (config) => {
//     config.module.rules.push({
//       test: /\.(glsl|vs|fs|vert|frag)$/,
//       exclude: /node_modules/,
//       use: ["raw-loader", "glslify-loader"],
//       include: resolve(__dirname, "../"),
//     });

//     return config;
//   },
// };

const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },

  webpackFinal: async (config, { configType }) => {
    // config.module.rules.push({
    //   test: /\.(glsl|vs|fs|vert|frag)$/,
    //   use: ["raw-loader", "glslify-loader"],
    //   exclude: /node_modules/,
    //   include: path.resolve(__dirname, "../"),
    // });
    config.module.rules.push({
      test: /\.(frag|vert)$/,
      type: "asset/source",
    });

    return config;
  },
};
