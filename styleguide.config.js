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

  tocMode: "expand",
  sections: [
    {
      name: "Introduction",
      content: "doc/introduction/introduction.md",
      sections: [
        {
          name: "Theme Colors",
          content: "doc/introduction/themes.md",
        },
      ],
    },
    {
      name: "Components",
      content: "doc/introduction/introduction.md",
      sections: [
        {
          name: "Atoms",
          content: "doc/components/atoms.md",
          components: "src/components/atoms/**/*.tsx",
        },
        {
          name: "Molecules",
          content: "doc/components/molecules.md",
          components: "src/components/molecules/**/*.tsx",
        },
        {
          name: "Organisms",
          content: "doc/components/organisms.md",
          components: "src/components/organisms/**/*.tsx",
        },
        {
          name: "Templates",
          content: "doc/components/templates.md",
          components: "src/components/templates/**/*.tsx",
        },
        {
          name: "Pages",
          content: "doc/components/pages.md",
          components: "src/components/pages/**/*.tsx",
        },
      ],
    },

    {
      name: "Advanced Topics",
      sections: [
        {
          name: "Grid",
          content: "doc/advanced/grid.md",
        },
        {
          name: "Forms",
          content: "doc/advanced/forms.md",
        },
        {
          name: "Translations",
          content: "doc/advanced/translations.md",
        },
      ],
    },
  ],
};
