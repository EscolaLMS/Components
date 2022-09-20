import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const contrastTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#157493",
  dm__primaryColor: "#29caff",

  secondaryColor: blend("#56CCF2", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
  dm__background: "#232225",
  background: "#F2F2F2",

  gray2: "#2d2c2c",
  cardBackgroundColor: sharedTheme.gray2,
  dm__cardBackgroundColor: sharedTheme.gray5,
  // cardBackgroundColor: sharedTheme.gray5,
  // dm__cardBackgroundColor: sharedTheme.gray2,

  dm__textColor: "#FFF",
  textColor: "#000",

  errorColor: "#b30000",
  // dm__cardBackgroundColor: "#ff6969",

  inputDisabledBg: "#1f1f1f",
  dm__inputDisabledBg: sharedTheme.gray5,
  // labelListValueColor: "#29caff",
  labelListValueColor: "#157493",
  dm__labelListValueColor: "#ff0000",
  primaryButtonDisabled: "#ff0000",

  outlineButtonColor: "#000000",
  outlineButtonInvertColor: "#23298e",
  dm__outlineButtonColor: "#FFFFFF",
  // dm__outlineButtonColor: "lightblue",
  dm__outlineButtonInvertColor: "#ffcc00",

  breadcrumbsColor: "#000000",
  dm__breadcrumbsColor: "#FFFFFF",
};

export default contrastTheme;
