import { DefaultTheme } from "styled-components";
import { blend } from "chroma-js";

export const redTheme: DefaultTheme = {
  primaryColor: "#E60037",
  secondaryColor: blend("#E60037", "#BDBDBD", "multiply").hex(),
  font: "Titillium",
  buttonRadius: 10,
};

export default redTheme;
