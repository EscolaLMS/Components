import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const orangeTheme: DefaultTheme = {
  ...sharedTheme,
  font: "Inter",
  primaryColor: "#F47820",
  dm__primaryColor: "#F47820",

  secondaryColor: blend("#F47820", "#BDBDBD", "multiply").hex(),
  dm__secondaryColor: blend("#F47820", "#BDBDBD", "multiply").hex(),

  headerColor: "#111111",

  background: "#FFFFFF",
  dm__background: "#4A4A4A",

  colorBackground: "#F47820",
  dm__colorBackground: "#F47820",

  cardBackgroundColor: sharedTheme.gray5,
  dm__cardBackgroundColor: sharedTheme.gray2,

  dm__primaryButtonDisabled: sharedTheme.gray2,

  textColor: "#000",
  dm__textColor: "#FFF",

  labelListValueColor: "#F47820",
};

export default orangeTheme;
