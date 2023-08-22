const glob = require("glob");
const path = require("path");
const fs = require("fs");

module.exports = {
  ignore: [
    "src/components/atoms/Icon/icons.tsx",
    "src/components/organisms/CourseAgenda/context.tsx",
    "src/components/organisms/CourseProgram/TopicIcon.tsx",
  ],
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
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json"
  ).parse,
  webpackConfig: Object.assign({}, require("./webpack.config"), {}),

  require: [path.join(__dirname, "./tests.config.js")],

  styleguideComponents: {
    Logo: __dirname + "/src/styleguide/Logo.tsx",
  },

  styleguideDir: "docs",

  skipComponentsWithoutExample: true,

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
        {
          name: "How to use Components",
          content: "doc/introduction/howtouse.md",
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
          name: "Players",
          content: "doc/components/players.md",
          components: "src/components/players/**/*.tsx",
        },
        {
          name: "Quizzes",
          content: "doc/components/quizzes.md",
          components: "src/components/quizzes/**/*.tsx",
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
          name: "Responsive Design",
          content: "doc/advanced/responsive.md",
        },
        {
          name: "Forms",
          content: "doc/advanced/forms.md",
        },
        {
          name: "Translations",
          content: "doc/advanced/translations.md",
        },
        {
          name: "Accessibility ",
          content: "doc/advanced/a11y.md",
        },
      ],
    },
  ],
};
