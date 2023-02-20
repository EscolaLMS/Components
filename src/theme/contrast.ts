import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const contrastTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#157493",
  dm__primaryColor: "#03a9f4",
  dm__primaryColorOnLight: "#75c2ff",
  colorBackground: "#0073cf",
  dm__colorBackground: "#0174cf",
  secondaryColor: blend("#56CCF2", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
  dm__background: "#232225",
  background: "#F2F2F2",
  gray2: "#2d2c2c",
  cardBackgroundColor: sharedTheme.gray5,
  dm__cardBackgroundColor: "#202020",
  invertColor: "#23298e",
  dm__textColor: "#FFF",
  textColor: "#000",
  errorColor: "#b30000",
  dm__errorColor: "#ff6a6a",
  inputBg: sharedTheme.gray5,
  dm__inputBg: "#333",
  inputDisabledBg: "#1f1f1f",
  dm__inputDisabledBg: "#1f1f1f",
  labelListValueColor: "#157493",
  dm__labelListValueColor: "#ff0000",
  primaryButtonDisabled: "#8ba9b3",
  outlineButtonColor: "#000000",
  outlineButtonInvertColor: "#23298e",
  dm__outlineButtonColor: "#FFFFFF",
  dm__outlineButtonInvertColor: "#ff9800",
  breadcrumbsColor: "#000000",
  dm__breadcrumbsColor: "#FFFFFF",
};

export default contrastTheme;
