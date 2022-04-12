// src/styleguide/Wrapper.js
import React from "react";

import { ThemeCustomizer } from "./ThemeCustomizer";
import { setThemeToLocalStorage } from "./../theme/provider";

export const Logo: React.FC<{ children?: React.ReactNode; classes: any }> = ({
  children,
  classes,
}) => {
  return (
    <React.Fragment>
      <ThemeCustomizer onUpdate={(theme) => setThemeToLocalStorage(theme)} />
      <img
        style={{ maxWidth: "100%" }}
        src="data:image/png;base64,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"
      />
    </React.Fragment>
  );
};

export default Logo;
