import { DefaultTheme } from "styled-components";
import { blend, default as chroma } from "chroma-js";
import { sharedTheme } from "./shared";

export const velvetTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#600CAE",
  secondaryColor: blend("#600CAE", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
  backgroundDark: "#4A4A4A",
  backgroundLight: "#F2F2F2",
  cardBackgroundColorLight: chroma("#4A4A4A").brighten(1).hex(),
  cardBackgroundColorDark: chroma("#F2F2F2").darken(1).hex(),
  textColorDark: "#FFF",
  textColorLight: "#000",
};

export default velvetTheme;
