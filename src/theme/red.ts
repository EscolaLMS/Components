import { DefaultTheme } from "styled-components";
import { blend, default as chroma } from "chroma-js";
import { sharedTheme } from "./shared";

export const redTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#E60037",
  secondaryColor: blend("#E60037", "#BDBDBD", "multiply").hex(),
  font: "Titillium",
  headerColor: "#111111",
  backgroundDark: "#232225",
  backgroundLight: "#F2F2F2",
  cardBackgroundColorLight: chroma("#232225").brighten(1).hex(),
  cardBackgroundColorDark: chroma("#F2F2F2").darken(1).hex(),

  textColorDark: "#FFF",
  textColorLight: "#000",
};

export default redTheme;
