import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";

export const blueTheme: DefaultTheme = {
  primaryColor: "#56CCF2",
  secondaryColor: blend("#56CCF2", "#BDBDBD", "multiply").hex(),
  font: "Mulish",
};

export default blueTheme;
