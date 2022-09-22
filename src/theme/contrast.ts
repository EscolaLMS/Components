import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const contrastTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#157493",

  secondaryColor: blend("#56CCF2", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
  backgroundDark: "#232225",
  backgroundLight: "#F2F2F2",

  cardBackgroundColorLight: sharedTheme.gray1,
  cardBackgroundColorDark: sharedTheme.gray5,

  textColorDark: "#FFF",
  textColorLight: "#000",

  errorColor: "#b30000",
  gray2: "#2d2c2c",
  inputDisabledBg: "#1f1f1f",
  labelListValueColor: "#157493",
  primaryButtonDisabled: "#ff0000",
  outlineButtonColor: "#000000",
  outlineButtonInvertColor: "#23298e",
  breadcrumbsColor: "#000000",
  numerationsColor: "#fff",
  dm__numerationsColor: "#000",
};

export default contrastTheme;
