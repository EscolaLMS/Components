import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const orangeTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#F47820",
  secondaryColor: blend("#F47820", "#BDBDBD", "multiply").hex(),
  font: "Inter",
  headerColor: "#111111",
};

export default orangeTheme;
