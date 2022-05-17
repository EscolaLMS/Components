import { DefaultTheme } from "styled-components";
import { blend, default as chroma } from "chroma-js";
import { sharedTheme } from "./shared";

export const orangeTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#F47820",
  secondaryColor: blend("#F47820", "#BDBDBD", "multiply").hex(),
  font: "Inter",
  headerColor: "#111111",
  backgroundDark: "#4A4A4A",
  backgroundLight: "#FFFFFF",
  cardBackgroundColorLight: chroma("#4A4A4A").brighten(1).hex(),
  cardBackgroundColorDark: chroma("#FFFFFF").darken(1).hex(),
  textColorDark: "#FFF",
  textColorLight: "#000",
};

export default orangeTheme;
