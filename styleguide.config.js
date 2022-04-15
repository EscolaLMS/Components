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

  sections: [
    {
      name: "Introduction",
      content: "doc/introduction.md",
    },
    {
      name: "Component. Primitives",
      content: "doc/primitives.md",
      components: "src/components/primitives/**/*.tsx",
      // exampleMode: "collapse", // 'hide' | 'collapse' | 'expand'
      // usageMode: "collapse", // 'hide' | 'collapse' | 'expand'
      // expand: "collapse",
    },

    {
      name: "Component. Advanced",
      content: "doc/primitives.md",
      components: "src/components/advanced/**/*.tsx",
      // exampleMode: "hide", // 'hide' | 'collapse' | 'expand'
      // usageMode: "hide", // 'hide' | 'collapse' | 'expand'
      // expand: "tocMode",
      // tocMode: "collapse",
    },
  ],
};
