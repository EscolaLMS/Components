import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const velvetTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#600CAE",
  secondaryColor: blend("#600CAE", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
  dm__background: "#4A4A4A",
  background: "#F2F2F2",
  cardBackgroundColor: sharedTheme.gray2,
  dm__cardBackgroundColor: sharedTheme.white,
  dm__textColor: "#FFF",
  textColor: "#000",
  labelListValueColor: "#600CAE",
};

export default velvetTheme;
