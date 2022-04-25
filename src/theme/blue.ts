import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";
import { sharedTheme } from "./shared";

export const blueTheme: DefaultTheme = {
  ...sharedTheme,
  primaryColor: "#56CCF2",
  secondaryColor: blend("#56CCF2", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
  headerColor: "#111111",
};

export default blueTheme;
