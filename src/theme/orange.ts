import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const orangeTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#F47820",
  secondaryColor: blend("#F47820", "#BDBDBD", "multiply").hex(),
  font: "Inter",
  headerColor: "#111111",
  backgroundDark: "#4A4A4A",
  backgroundLight: "#F2F2F2",
  textColorDark: "#FFF",
  textColorLight: "#000",
};

export default orangeTheme;