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
  "dm__primaryColor",
  "dm__primaryColorOnLight",
  "secondaryColor",
  "dm__secondaryColor",
  "background",
  "dm__background",
  "cardBackgroundColor",
  "dm__cardBackgroundColor",
  "colorBackground",
  "dm__colorBackground",
  "textColor",
  "dm__textColor",
  "errorColor",
  "dm__errorColor",
  "invertColor",
  "inputBg",
  "dm__inputBg",
  "inputDisabledBg",
  "dm__inputDisabledBg",
  "labelListValueColor",
  "dm__labelListValueColor",
  "outlineButtonColor",
  "dm__outlineButtonInvertColor",
  "breadcrumbsColor",
  "dm__breadcrumbsColor",
  "primaryButtonDisabled",
  "dm__primaryButtonDisabled",
  "outlineButtonColor",
  "dm__outlineButtonColor",
  "outlineButtonInvertColor",
  "buttonRadius",
  "checkboxRadius",
  "inputRadius",
  "noteRadius",
  "cardRadius",
  "white",
  "gray5",
  "gray4",
  "gray3",
  "gray2",
  "gray1",
  "black",
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
  initialTheme?: DefaultTheme;
}> = ({ onUpdate, hasAll = false, hidden = false, initialTheme }) => {
  const [localTheme] = useLocalTheme(initialTheme);

  const initData = useMemo(() => {
    return filterInputData(localTheme);
  }, []);

  const [props, set] = useControls(() => ({
    theme: {
      label: "Theme",
      value: hasAll
        ? initData.theme ||
          (Object.keys(themes).includes(window.location.hash.substr(1))
            ? window.location.hash.substr(1)
            : "all")
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
          options: ["Inter", "Mulish", "Titillium", "Lato"],
          value: initData.font || "Inter",
        },
        "Main Colors": folder({
          primaryColor: initData.primaryColor || "#000000",
          dm__primaryColor: initData.dm__primaryColor || "#000000",
          dm__primaryColorOnLight: initData.dm__primaryColor || "#000000",
          secondaryColor: initData.secondaryColor || "#000000",
          dm__secondaryColor: initData.dm__secondaryColor || "#000000",
          background: initData.background || "#000000",
          dm__background: initData.dm__background || "#000000",
          cardBackgroundColor: initData.cardBackgroundColor || "#000000",
          dm__cardBackgroundColor:
            initData.dm__cardBackgroundColor || "#000000",
          colorBackground: initData.colorBackground || "#000000",
          dm__colorBackground: initData.dm__colorBackground || "#000000",
          textColor: initData.textColor || "#000000",
          dm__textColor: initData.dm__textColor || "#000000",
          errorColor: initData.errorColor || "#EB5757",
          dm__errorColor: initData.dm__errorColor || "#EB5757",
          invertColor: initData.invertColor || "#000000",
        }),
        "Body Colors": folder({
          inputBg: initData.inputBg || "#f8f8f8",
          dm__inputBg: initData.dm__inputBg || "#4a4a4a",
          inputDisabledBg: initData.inputDisabledBg || "#1f1f1f",
          dm__inputDisabledBg: initData.dm__inputDisabledBg || "#1f1f1f",
          labelListValueColor: initData.labelListValueColor || "#000000",
          dm__labelListValueColor:
            initData.dm__labelListValueColor || "#000000",
          primaryButtonDisabled: initData.primaryButtonDisabled || "#000000",
          dm__primaryButtonDisabled:
            initData.dm__primaryButtonDisabled ?? initData.gray2 ?? "#555555",
          outlineButtonColor: initData.outlineButtonColor || "#000000",
          dm__outlineButtonColor: initData.dm__outlineButtonColor || "#ffffff",
          outlineButtonInvertColor:
            initData.outlineButtonInvertColor || "#000000",
          dm__outlineButtonInvertColor:
            initData.dm__outlineButtonInvertColor || "#000000",
          breadcrumbsColor: initData.breadcrumbsColor || "#bbbbbb",
          dm__breadcrumbsColor: initData.dm__breadcrumbsColor || "#ffffff",
        }),
        "Utility Colors": folder({
          white: initData.white || "#000000",
          gray5: initData.gray5 || "#000000",
          gray4: initData.gray4 || "#000000",
          gray3: initData.gray3 || "#000000",
          gray2: initData.gray2 || "#000000",
          gray1: initData.gray1 || "#000000",
          black: initData.black || "#000000",
          inputDisabledBg: initData.inputDisabledBg || "#000000",
          labelListValueColor: initData.labelListValueColor || "#000000",
          primaryButtonDisabled: initData.primaryButtonDisabled || "#000000",
          outlineButtonColor: initData.outlineButtonColor || "#000000",
          outlineButtonInvertColor: initData.outlineButtonColor || "#000000",
          breadcrumbsColor: initData.breadcrumbsColor || "#000000",
          numerationsColor: initData.numerationsColor || "#000000",
          dm__numerationsColor: initData.dm__numerationsColor || "#000000",
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
