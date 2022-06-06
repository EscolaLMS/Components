import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const redTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#E60037",
  secondaryColor: blend("#E60037", "#BDBDBD", "multiply").hex(),
  font: "Titillium",
  headerColor: "#111111",
  backgroundDark: "#232225",
  backgroundLight: "#F2F2F2",
  cardBackgroundColorLight: sharedTheme.gray1,
  cardBackgroundColorDark: sharedTheme.gray5,

  textColorDark: "#FFF",
  textColorLight: "#000",
};

export default redTheme;
