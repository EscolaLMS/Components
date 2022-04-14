import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";

export const orangeTheme: DefaultTheme = {
  primaryColor: "#F47820",
  secondaryColor: blend("#F47820", "#BDBDBD", "multiply").hex(),
  font: "Inter",
  buttonRadius: 10,
  headerColor: "#111111",
};

export default orangeTheme;
