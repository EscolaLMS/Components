import React, { useEffect, useMemo } from "react";
import { DefaultTheme } from "styled-components";
import themes from "../theme";
import { useControls, folder } from "leva";
import { useLocalTheme } from "./useLocalTheme";

const allowedKeys: (keyof DefaultTheme & string)[] = [
  "font",
  "theme",
  "mode",
  "primaryColor",
  "secondaryColor",
  "backgroundDark",
  "backgroundLight",
  "textColorDark",
  "textColorLight",
  "backgroundDarkProgress",
  "backgroundDarkCommentBar",
  "errorColor",
  "white",
  "gray5",
  "gray4",
  "gray3",
  "gray2",
  "gray1",
  "black",
  "buttonRadius",
  "checkboxRadius",
  "inputRadius",
  "noteRadius",
];

const filterInputData = (input: DefaultTheme) => {
  return allowedKeys.reduce(
    (acc: Partial<DefaultTheme>, curr: string & keyof DefaultTheme) => {
      return typeof input[curr] !== "undefined"
        ? { ...acc, [curr]: input[curr] }
        : acc;
    },
    {}
  );
};

export const ThemeCustomizer: React.FC<{
  onUpdate: (theme: DefaultTheme) => void;
}> = ({ onUpdate }) => {
  const [localTheme] = useLocalTheme();

  const initData = useMemo(() => {
    return filterInputData(localTheme);
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
          errorColor: initData.errorColor || "#EB5757",
          backgroundDarkCommentBar:
            initData.backgroundDarkCommentBar || "#000000",
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
          inputRadius: {
            min: 0,
            max: 100,
            step: 1,
            value: initData.inputRadius || 0,
          },
          noteRadius: {
            min: 0,
            max: 100,
            step: 1,
            value: initData.noteRadius || 0,
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
