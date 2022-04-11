import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    buttonColor: string;
    buttonBackground: string;
  }
}
