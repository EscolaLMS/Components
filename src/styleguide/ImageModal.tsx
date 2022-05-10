import React, { useState } from "react";

import Button from "../components/atoms/Button/Button";
import { GlobalThemeProvider } from "../theme/provider";

export const ImageModal: React.FC<{
  children?: React.ReactNode;
  images: string[];
}> = ({ children, images }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <GlobalThemeProvider>
        <Button mode="outline" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <>&lt;</> : <>&gt;</>} toggle img preview
        </Button>
      </GlobalThemeProvider>
      {isOpen && (
        <div onClick={() => setIsOpen((prev) => !prev)}>
          {images.map((img) => (
            <div key={img}>
              <img
                src={img}
                style={{ width: "100%", display: "block", maxWidth: "100%" }}
              />
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};

export default ImageModal;
