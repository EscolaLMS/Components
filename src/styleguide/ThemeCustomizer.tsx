import React, { useEffect, useMemo } from "react";
import { orangeTheme as defaultTheme } from "./../theme/orange";
import { DefaultTheme } from "styled-components";
import themes from "../theme";
import { getThemeFromLocalStorage } from "../theme/provider";
import { useControls, folder } from "leva";

const allowedKeys = [
  "theme",
  "mode",
  "primaryColor",
  "secondaryColor",
  "backgroundDark",
  "backgroundLight",
  "textColorDark",
  "textColorLight",
  "backgroundDarkProgress",
  "invertColor",
  "white",
  "gray5",
  "gray4",
  "gray3",
  "gray2",
  "gray1",
  "black",
  "buttonRadius",
  "checkboxRadius",
];

const filterInputData = (input: DefaultTheme) => {
  return allowedKeys.reduce((acc: Partial<DefaultTheme>, curr: string) => {
    return typeof input[curr as keyof DefaultTheme] !== "undefined"
      ? { ...acc, [curr]: input[curr as keyof DefaultTheme] }
      : acc;
  }, {});
};

export const ThemeCustomizer: React.FC<{
  onUpdate: (theme: DefaultTheme) => void;
}> = ({ onUpdate }) => {
  const initData = useMemo(() => {
    const data = getThemeFromLocalStorage(defaultTheme);

    return filterInputData(data);
  }, []);

  const [props, set] = useControls(() => ({
    theme: {
      label: "Theme",
      value: initData.theme || "all",
      options: ["all", ...Object.keys(themes), "custom"],
      onChange: (theme: string) => {
        switch (theme) {
          case "all":
          case "custom":
            break;
          default:
            set({
              theme,
              ...filterInputData(themes[theme as keyof typeof themes]),
            });
        }
      },
      transient: false,
    },
    mode: {
      options: ["light", "dark"],
      value: initData.mode || "light",
    },

    Customize: folder(
      {
        font: {
          options: ["Inter", "Mulish", "Titillium"],
          value: initData.font || "Inter",
        },
        "Main Colors": folder({
          primaryColor: initData.primaryColor || "#000000",
          secondaryColor: initData.secondaryColor || "#000000",
          backgroundDark: initData.backgroundDark || "#000000",
          backgroundLight: initData.backgroundLight || "#000000",
          textColorDark: initData.textColorDark || "#000000",
          textColorLight: initData.textColorLight || "#000000",
          backgroundDarkProgress: initData.backgroundDarkProgress || "#000000",
          invertColor: initData.invertColor || "#000000",
        }),
        "Body Colors": folder({
          white: initData.white || "#000000",
          gray5: initData.gray5 || "#000000",
          gray4: initData.gray4 || "#000000",
          gray3: initData.gray3 || "#000000",
          gray2: initData.gray2 || "#000000",
          gray1: initData.gray1 || "#000000",
          black: initData.black || "#000000",
        }),
        Radiuses: folder({
          buttonRadius: {
            min: 0,
            max: 100,
            step: 1,
            value: initData.buttonRadius || 0,
          },
          checkboxRadius: {
            min: 0,
            max: 5,
            step: 1,
            value: initData.checkboxRadius || 0,
          },
        }),
      },

      {
        render: (get) => get("theme") === "custom",
      }
    ),
  }));

  useEffect(() => {
    onUpdate(props as DefaultTheme);
  }, [props]);

  return <React.Fragment />;
};

export default ThemeCustomizer;
