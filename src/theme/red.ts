import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const redTheme: DefaultTheme = {
  ...sharedTheme,
  font: "Titillium",
  primaryColor: "#E60037",
  dm__primaryColor: "#E60037",

  secondaryColor: blend("#E60037", "#BDBDBD", "multiply").hex(),
  dm__secondaryColor: blend("#E60037", "#BDBDBD", "multiply").hex(),

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
