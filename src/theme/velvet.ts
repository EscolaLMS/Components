import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const velvetTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#600CAE",
  secondaryColor: blend("#600CAE", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
};

export default velvetTheme;
