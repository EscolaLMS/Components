import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const velvetTheme: DefaultTheme = {
  ...sharedTheme,
  font: "Mulish",
  primaryColor: "#600CAE",
  dm__primaryColor: "#600CAE",

  secondaryColor: blend("#600CAE", "#BDBDBD", "multiply").hex(),
  dm__secondaryColor: blend("#600CAE", "#BDBDBD", "multiply").hex(),

  headerColor: "#111111",

  background: "#F2F2F2",
  dm__background: "#4A4A4A",

  colorBackground: "#600CAE",
  dm__colorBackground: "#600CAE",

  cardBackgroundColor: sharedTheme.gray5,
  dm__cardBackgroundColor: sharedTheme.gray2,

  textColor: "#000",
  dm__textColor: "#FFF",

  labelListValueColor: "#600CAE",
};

export default velvetTheme;
