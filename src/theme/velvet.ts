import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const velvetTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#600CAE",
  secondaryColor: blend("#600CAE", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
  backgroundDark: "#4A4A4A",
  backgroundLight: "#F2F2F2",
  cardBackgroundColorLight: sharedTheme.gray2,
  cardBackgroundColorDark: sharedTheme.white,
  textColorDark: "#FFF",
  textColorLight: "#000",
  labelListValueColor: "#600CAE",
};

export default velvetTheme;
