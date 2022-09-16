import React, { useEffect, useMemo } from "react";
import { DefaultTheme } from "styled-components";
import themes from "../theme";
import { useControls, folder, Leva } from "leva";
import { useLocalTheme } from "./useLocalTheme";

const allowedKeys: (keyof DefaultTheme & string)[] = [
  "font",
  "theme",
  "mode",
  "primaryColor",
  "primaryColorDark",
  "secondaryColor",
  "backgroundDark",
  "backgroundLight",
  "cardBackgroundColorLight",
  "cardBackgroundColorDark",
  "textColorDark",
  "textColorLight",
  "errorColor",
  "invertColor",
  "white",
  "gray5",
  "gray4",
  "gray3",
  "gray2",
  "gray1",
  "black",
  "inputDisabledBg",
  "buttonRadius",
  "checkboxRadius",
  "inputRadius",
  "noteRadius",
  "cardRadius",
  "labelListValueColor",
  "labelListValueColorDark",
  "primaryButtonDisabled",
  "outlineButtonColor",
  "outlineButtonInvertColor",
  "outlineButtonColorDark",
  "outlineButtonInvertColorDark",
  "breadcrumbsColor",
  "breadcrumbsColorDark",
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
  hasAll?: boolean;
  hidden?: boolean;
}> = ({ onUpdate, hasAll = false, hidden = false }) => {
  const [localTheme] = useLocalTheme();

  const initData = useMemo(() => {
    return filterInputData(localTheme);
  }, []);

  const [props, set] = useControls(() => ({
    theme: {
      label: "Theme",
      value: hasAll
        ? initData.theme || "all"
        : initData.theme || Object.keys(themes)[0],
      options: hasAll
        ? ["all", ...Object.keys(themes), "custom"]
        : [...Object.keys(themes), "custom"],
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
          primaryColorDark: initData.primaryColorDark || "#000000",
          secondaryColor: initData.secondaryColor || "#000000",
          backgroundDark: initData.backgroundDark || "#000000",
          backgroundLight: initData.backgroundLight || "#000000",
          cardBackgroundColorLight:
            initData.cardBackgroundColorLight || "#000000",
          cardBackgroundColorDark:
            initData.cardBackgroundColorDark || "#000000",
          textColorDark: initData.textColorDark || "#000000",
          textColorLight: initData.textColorLight || "#000000",
          errorColor: initData.errorColor || "#EB5757",
          errorColorDark: initData.errorColorDark || "#EB5757",
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
          inputDisabledBg: initData.inputDisabledBg || "#000000",
          labelListValueColor: initData.labelListValueColor || "#000000",
          labelListValueColorDark: initData.labelListValueColor || "#000000",
          primaryButtonDisabled: initData.primaryButtonDisabled || "#000000",
          outlineButtonColor: initData.outlineButtonColor || "#000000",
          outlineButtonInvertColor:
            initData.outlineButtonInvertColor || "#000000",
          outlineButtonColorDark: initData.outlineButtonColorDark || "#000000",
          outlineButtonInvertColorDark:
            initData.outlineButtonInvertColorDark || "#000000",
          breadcrumbsColor: initData.breadcrumbsColor || "#000000",
          breadcrumbsColorDark: initData.breadcrumbsColorDark || "#000000",
        }),
        Radiuses: folder({
          buttonRadius: {
            min: 0,
            max: 16,
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
            max: 16,
            step: 1,
            value: initData.inputRadius || 0,
          },
          cardRadius: {
            min: 0,
            max: 16,
            step: 1,
            value: initData.cardRadius || 0,
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

  return <Leva hidden={hidden} />;
};

export default ThemeCustomizer;
