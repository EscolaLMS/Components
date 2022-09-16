import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const contrastTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#157493",
  primaryColorDark: "#29caff",

  secondaryColor: blend("#56CCF2", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
  backgroundDark: "#232225",
  backgroundLight: "#F2F2F2",

  gray2: "#2d2c2c",
  cardBackgroundColorLight: sharedTheme.gray2,
  cardBackgroundColorDark: sharedTheme.gray5,
  // cardBackgroundColorLight: sharedTheme.gray5,
  // cardBackgroundColorDark: sharedTheme.gray2,

  textColorDark: "#FFF",
  textColorLight: "#000",

  errorColor: "#b30000",
  errorColorDark: "#ff6969",

  inputDisabledBg: "#1f1f1f",
  // labelListValueColor: "#29caff",
  labelListValueColor: "#157493",
  labelListValueColorDark: "#ff0000",
  primaryButtonDisabled: "#ff0000",

  outlineButtonColor: "#000000",
  outlineButtonInvertColor: "#23298e",
  outlineButtonColorDark: "#FFFFFF",
  // outlineButtonColorDark: "lightblue",
  outlineButtonInvertColorDark: "#ffcc00",

  breadcrumbsColor: "#000000",
  breadcrumbsColorDark: "#FFFFFF",
};

export default contrastTheme;
