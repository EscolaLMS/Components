import React, { useState } from "react";

import Button from "../components/atoms/Button/Button";

export const ImageModal: React.FC<{
  children?: React.ReactNode;
  images: string[];
}> = ({ children, images }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button mode="outline" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <>&lt;</> : <>&gt;</>} toggle img preview
      </Button>
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
