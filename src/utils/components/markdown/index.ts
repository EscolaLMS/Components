import flow from "lodash.flow";

/* The markdown generator at multilines generates redundant `\` characters. This method removes them. */
const trimContentForMarkdown = (content = ""): string => {
  return content
    .replaceAll(/(\\\r\n|\\r\n|\\\n|\\n)/g, "\n") // escaped and non escaped new line
    .split("\n")
    .map((r) => {
      // if row is empty then do nothing
      if (!r.trim().length) return r;

      // remove all artifacts
      const n = r.replace(/\\+/g, "");

      // if, after deleting the artefacts, the row is empty, it was indeed an artefact and we remove it
      return !n.trim().length ? n : r;
    })
    .join("\n");
};

const fixInlineStylesSyntaxForMarkdown = (content = ""): string => {
  return !content.includes("style=”")
    ? content
    : content
        .split("style=”")
        .map((r) => r.replace("”", '"'))
        .join('style="');
};

const fixMarkTagForMarkdown = (input: string): string => {
  const regex = /==([^=\r\n]+)==/g;
  const matches = input.match(regex);
  if (!matches) return input;

  let result = input;

  for (const match of matches) {
    const replacedText = `<mark>${match.replace(/==/g, "")}</mark>`;

    result = result.replace(match, replacedText);
  }

  return result;
};

const handleDolarSign = (input: string): string => {
  // Only escape $ when it's followed by a number and not already escaped (not preceded by a backslash)
  // Match $100, $1,000.50, etc., but not already escaped \$100
  return input.replace(/(?<!\\)(\$)(\d[\d,]*(?:\.\d+)?)/g, "\\$1$2");
};

//TODO: Fix lookbehind ?<= regular expression, because it not works on safari
// const getRegexBetween = (
//   openChart: string,
//   closeChart: string,
//   flags?: string
// ) =>
//   new RegExp(
//     `${openChart}(?<=(((\\n|\\s){1,}${openChart})|(^(${openChart}))))(.+?)(?=((${closeChart}(\\n|\\s){1,})|(${closeChart}$)))${closeChart}`,
//     flags
//   );

/* The markdown generator for some strange reason uses `__` for underlining (originally `__` is an alternative syntax for bold) */
// const fixUnderlineForMarkdown = (content = ""): string => {
//   /*
//     replace
//     this: '__abc__ __dd__ccc__ _ee__fff__ gg__hh_ii__ __jj__kk_ll__'
//     to this: '<ins>abc</ins> <ins>dd__ccc</ins> _ee__fff__ gg__hh_ii__ <ins>jj__kk_ll</ins>'
//    */
//   return content.replace(getRegexBetween("_{2}", "_{2}", "g"), "<ins>$6</ins>");
// };

// const fixNoticeForMarkdown = (content = ""): string => {
//   return content
//     .replace(
//       getRegexBetween(":{3}info", ":{3}", "gs"),
//       '<div className="notice-block notice-block--info">$6</div>'
//     )
//     .replace(
//       getRegexBetween(":{3}warning", ":{3}", "gs"),
//       '<div className="notice-block notice-block--warning">$6</div>'
//     )
//     .replace(
//       getRegexBetween(":{3}tip", ":{3}", "gs"),
//       '<div className="notice-block notice-block--tip">$6</div>'
//     );
// };

export const fixContentForMarkdown = (content = ""): string => {
  if (typeof content !== "string" || content === "null") return "";
  return flow([
    trimContentForMarkdown,
    fixInlineStylesSyntaxForMarkdown,
    fixMarkTagForMarkdown,
    handleDolarSign,
    // fixUnderlineForMarkdown,
    // fixNoticeForMarkdown,
  ])(content);
};
