const glob = require("glob");
const path = require("path");
const fs = require("fs");

module.exports = {
  components: () => {
    return glob.sync("src/components/**/*.{ts,tsx}").filter((file) => {
      // Take only connect component if exists, ignore others.
      if (file.match(/connect.tsx$/)) {
        return true;
      } else {
        const pathObject = path.parse(file);
        pathObject.ext = `.connect${pathObject.ext}`;
        const { root, dir, ext, name } = pathObject;
        return !fs.existsSync(path.format({ root, dir, ext, name }));
      }
    });
  },
  propsParser: require("react-docgen-typescript").withDefaultConfig({
    savePropValueAsString: true,
  }).parse,
  webpackConfig: Object.assign({}, require("./webpack.config"), {}),

  styleguideComponents: {
    Logo: __dirname + "/src/styleguide/Logo.tsx",
  },

  styleguideDir: "docs",

  require: [path.join(__dirname, "/node_modules/react-dat-gui/dist/index.css")],
  tocMode: "collapse",
  sections: [
    {
      name: "Introduction",
      content: "doc/introduction.md",
      sections: [
        {
          name: "Theme Colors",
          content: "doc/themes.md",
        },
      ],
    },

    {
      name: "Primitives Components",
      content: "doc/primitives.md",
      components: "src/components/primitives/**/*.tsx",
    },

    {
      name: "Advanced Components",
      content: "doc/primitives.md",
      components: "src/components/advanced/**/*.tsx",
    },

    {
      name: "Functional Components",
      content: "doc/functional.md",
      components: "src/components/functional/**/*.tsx",
    },
  ],
};
