import { DefaultTheme } from "styled-components";
import chroma, { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const blueTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#56CCF2",
  secondaryColor: blend("#56CCF2", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
  dm__background: "#232225",
  background: "#F2F2F2",

  cardBackgroundColor: sharedTheme.gray5,
  dm__cardBackgroundColor: sharedTheme.gray1,

  primaryButtonDisabled: `rgba(${chroma(sharedTheme.gray1)
    .rgb()
    .join(",")}, 0.2)`,
  dm__primaryButtonDisabled: `rgba(${chroma(sharedTheme.gray1)
    .rgb()
    .join(",")}, 0.2)`,

  dm__textColor: "#FFF",
  textColor: "#000",
  labelListValueColor: "#56CCF2",

  // breadcrumbsColor: "green",

  outlineButtonInvertColor: sharedTheme.white,
};

export default blueTheme;
