import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";

export const blueTheme: DefaultTheme = {
  primaryColor: "#56CCF2",
  secondaryColor: blend("#56CCF2", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  buttonRadius: 0,
  checkboxRadius: 0,
  headerColor: "#111111",
  backgroundDark: "#4A4A4A",
  backgroundLight: "#FFFFFF",
};

export default blueTheme;
