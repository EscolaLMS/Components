import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";

export const redTheme: DefaultTheme = {
  primaryColor: "#E60037",
  secondaryColor: blend("#E60037", "#BDBDBD", "multiply").hex(),
  font: "Titillium",
  buttonRadius: 0,
  checkboxRadius: 0,
  headerColor: "#111111",
  backgroundDark: "#4A4A4A",
  backgroundLight: "#F2F2F2",
  textColorDark: "#FFF",
  textColorLight: "#000",
};

export default redTheme;
