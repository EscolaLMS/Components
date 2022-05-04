import React, { useCallback, useEffect, useState } from "react";
import DatGui, {
  DatColor,
  DatNumber,
  DatPresets,
  DatSelect,
  DatString,
  DatFolder,
  DatButton,
} from "react-dat-gui";
import { orangeTheme as defaultTheme } from "./../theme/orange";

import { DefaultTheme } from "styled-components";

import themes from "../theme";
import { getFontFromTheme, getThemeFromLocalStorage } from "../theme/provider";

export const ThemeCustomizer: React.FC<{
  onUpdate: (theme: DefaultTheme) => void;
}> = ({ onUpdate }) => {
  const [state, setState] = useState<DefaultTheme>(
    getThemeFromLocalStorage(defaultTheme)
  );

  // Update current state with changes from controls
  const handleUpdate = useCallback((newData: DefaultTheme) => {
    setState((prevState) => ({
      ...prevState,
      ...newData,
    }));
  }, []);

  useEffect(() => {
    onUpdate(state);
  }, [state]);

  const resetToDefaults = useCallback(() => {
    setState(defaultTheme);
  }, []);

  return (
    <div>
      {Object.values(themes).map((theme) =>
        getFontFromTheme(theme).links.map((link) => (
          <link key={link} rel="stylesheet" href={link} />
        ))
      )}
      <DatGui data={state} onUpdate={handleUpdate}>
        <DatPresets
          label="Presets"
          // @ts-ignore // bug in the library
          options={[themes]}
          onUpdate={handleUpdate}
        />
        <DatButton
          label="Reset to Defaults"
          onClick={() => resetToDefaults()}
        />
        <DatSelect path="mode" options={["light", "dark"]} />
        <DatSelect path="font" options={["Inter", "Mulish", "Titillium"]} />
        <DatFolder title="Colors" closed={true}>
          <DatColor path="primaryColor" label="Primary Color" />
          <DatColor path="secondaryColor" label="Secondary Color" />
          <DatColor path="backgroundDark" label="Background Dark Color" />
          <DatColor path="backgroundLight" label="Background Light Color" />
          <DatColor path="textColorDark" label="Text Dark Color" />
          <DatColor path="textColorLight" label="Text Light Color" />
          <DatColor path="errorColor" label="Error Color" />
          <DatColor
            path="backgroundDarkProgress"
            label="Progress Background Color"
          />
          <DatFolder title="Body" closed={true}>
            <DatColor path="body.white" label="white" />
            <DatColor path="body.gray5" label="gray5" />
            <DatColor path="body.gray4" label="gray4" />
            <DatColor path="body.gray3" label="gray3" />
            <DatColor path="body.gray2" label="gray2" />
            <DatColor path="body.gray1" label="gray1" />
            <DatColor path="body.black" label="black" />
          </DatFolder>
        </DatFolder>
        <DatFolder title="Radiuses" closed={true}>
          <DatNumber
            path="buttonRadius"
            label="Button Radius"
            min={0}
            max={100}
            step={1}
          />
          <DatNumber
            path="inputRadius"
            label="Input Radius"
            min={0}
            max={100}
            step={1}
          />
          <DatNumber
            path="checkboxRadius"
            label="Checkbox Radius"
            min={0}
            max={5}
            step={1}
          />
        </DatFolder>
      </DatGui>
    </div>
  );
};

export default ThemeCustomizer;
