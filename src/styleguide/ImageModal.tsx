import React, { useState } from "react";

export const ImageModal: React.FC<{
  children?: React.ReactNode;
  images: string[];
}> = ({ children, images }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        toggle img preview
      </button>
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
    </div>
  );
};

export default ImageModal;
