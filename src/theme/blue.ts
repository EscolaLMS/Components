import { DefaultTheme } from "styled-components";
import { blend, default as chroma } from "chroma-js";
import { sharedTheme } from "./shared";

export const blueTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#56CCF2",
  secondaryColor: blend("#56CCF2", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
  backgroundDark: "#232225",
  backgroundLight: "#F2F2F2",

  cardBackgroundColorLight: chroma("#232225").brighten(1).hex(),
  cardBackgroundColorDark: chroma("#F2F2F2").darken(1).hex(),

  textColorDark: "#FFF",
  textColorLight: "#000",
};

export default blueTheme;
