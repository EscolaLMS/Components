import React, { useCallback, useEffect, useRef, useState } from "react";
import DatGui, {
  DatBoolean,
  DatColor,
  DatNumber,
  DatPresets,
  DatSelect,
  DatString,
} from "react-dat-gui";
import { orangeTheme as defaultTheme } from "./../theme/orange";

import { DefaultTheme, ThemeProvider } from "styled-components";

import themes from "../theme";
import { getThemeFromLocalStorage } from "../theme/provider";

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

  return (
    <DatGui data={state} onUpdate={handleUpdate}>
      <DatPresets
        label="Presets"
        // @ts-ignore // bug in the library
        options={[themes]}
        onUpdate={handleUpdate}
      />
      <DatSelect path="font" options={["Inter", "Mulish", "Titillium"]} />
      <DatColor path="primaryColor" label="Primary Color" />
      <DatColor path="secondaryColor" label="Secondary Color" />
    </DatGui>
  );
};

export default ThemeCustomizer;
