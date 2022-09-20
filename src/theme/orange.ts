import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const orangeTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#F47820",
  secondaryColor: blend("#F47820", "#BDBDBD", "multiply").hex(),
  font: "Inter",
  headerColor: "#111111",
  dm__background: "#4A4A4A",
  background: "#FFFFFF",
  cardBackgroundColor: sharedTheme.gray5,
  dm__cardBackgroundColor: sharedTheme.gray2,
  dm__textColor: "#FFF",
  textColor: "#000",
  labelListValueColor: "#F47820",
};

export default orangeTheme;
