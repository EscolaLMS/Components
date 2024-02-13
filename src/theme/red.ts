import { DefaultTheme } from "styled-components";
// import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const redTheme: DefaultTheme = {
  ...sharedTheme,
  buttonRadius: 5,
  gray1: "#333333",
  gray2: "#AFAFAF",
  gray3: "#EAEAEA",
  gray4: "#F8F8F8",
  positive: "#2CBE69",
  font: "Lato",
  primaryColor: "#EE312F",
  dm__primaryColor: "#EE312F",

  secondaryColor: "#FFFF00",
  dm__secondaryColor: "#FFFF00", // blend("#E60037", "#BDBDBD", "multiply").hex(),

  headerColor: "#111111",

  background: "#F2F2F2",
  dm__background: "#232225",

  colorBackground: "#E60037",
  dm__colorBackground: "#E60037",

  cardBackgroundColor: sharedTheme.gray5,
  dm__cardBackgroundColor: sharedTheme.gray1,

  dm__textColor: "#FFF",
  textColor: "#000",
};

export default redTheme;
