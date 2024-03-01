import { DefaultTheme } from "styled-components";
// import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

const colors = {
  primary: "#EE312F",
  disabled: "#EAEAEA",
};

export const redTheme: DefaultTheme = {
  ...sharedTheme,
  buttonRadius: 5,
  inputRadius: 5,
  checkboxRadius: 5,
  cardRadius: 10,
  gray1: "#333333",
  gray2: "#AFAFAF",
  gray3: colors.disabled,
  gray4: "#F8F8F8",
  positive: "#2CBE69",
  positive2: "#C9F7DC",
  font: "Lato",
  primaryColor: colors.primary,
  dm__primaryColor: "#EE312F",

  secondaryColor: "#FFFF00",
  dm__secondaryColor: "#FFFF00", // blend("#E60037", "#BDBDBD", "multiply").hex(),

  headerColor: "#111111",

  background: "#FFF",
  dm__background: "#232225",

  colorBackground: "#E60037",
  dm__colorBackground: "#E60037",

  cardBackgroundColor: sharedTheme.gray5,
  dm__cardBackgroundColor: sharedTheme.gray1,

  outlineButtonColor: colors.primary,

  dm__textColor: "#FFF",
  textColor: "#333",

  primaryButtonDisabled: colors.disabled,
  inputBg: sharedTheme.white,
};

export default redTheme;
