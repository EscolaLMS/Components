import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const redTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#E60037",
  secondaryColor: blend("#E60037", "#BDBDBD", "multiply").hex(),
  font: "Titillium",
  headerColor: "#111111",
  dm__background: "#232225",
  background: "#F2F2F2",
  cardBackgroundColor: sharedTheme.gray5,
  dm__cardBackgroundColor: sharedTheme.gray1,

  dm__textColor: "#FFF",
  textColor: "#000",
};

export default redTheme;
