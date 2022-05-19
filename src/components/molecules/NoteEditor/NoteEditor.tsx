import * as React from "react";
import { useState } from "react";
import { Text } from "../../atoms/Typography/Text";
import styled from "styled-components";
import { Input } from "../../atoms/Input/Input";
import { TextArea } from "../../atoms/TextArea/TextArea";
import Button from "../../atoms/Button/Button";
import Link from "../../atoms/Link/Link";

interface SingleColorProps {
  color: string;
  active?: boolean;
}

const StyledPopup = styled.div`
  width: calc(100% - 32px);
  max-width: 468px;
  padding: 36px 23px 23px 23px;
  margin: 0 auto;
  background: "red";
  .form-title {
    text-align: center;
    color: ${(props) => props.theme.primaryColor};
    font-size: 20px;
    font-weight: 700;
  }
  .lsm-input {
    margin: 30px 0;
  }
  .buttons-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;
    button {
      &:first-of-type {
        width: 100%;
        max-width: 171px;
        margin-bottom: 23px;
      }
    }
  }
`;

const ColorPicker = styled.div`
  display: flex;
  justify-items: flex-start;
  align-items: center;
  margin-top: 28px;
  padding-left: 12px;
  .label {
    font-size: 12px;
    margin-right: 20px;
  }
  .colors-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 10px;
    button {
      appearance: none;
      outline: none;
      background: transparent;
      border-radius: 0;
      border: none;
      padding: 0;
      cursor: pointer;
    }
  }
`;

const SingleColor = styled("div")<SingleColorProps>`
  width: 11px;
  height: 11px;
  border-radius: 50px;
  background: ${(props) => props.color};
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 51%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid ${(props) => props.theme.gray2};
    width: 15px;
    height: 15px;
    border-radius: 50px;
    display: ${(props) => (props.active ? "block" : "none")};
  }
`;

const NoteEditor: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const colors = [
    { color: "#EB5757" },
    { color: "#F2994A" },
    { color: "#F2C94C" },
    { color: "#56CCF2" },
  ];
  return (
    <StyledPopup>
      <Text className="form-title">Stwórz nową notatkę</Text>
      <Input type="text" label="Tytuł" placeholder="wpisz tytuł notatki" />
      <TextArea placeholder="wpisz treść notatki" label="Treść" />
      <ColorPicker>
        <div className="label">Oznacz kolorem</div>
        <div className="colors-container">
          {colors.map((color, index) => (
            <button onClick={() => setSelectedColor(index)}>
              <SingleColor
                color={color.color}
                active={selectedColor === index}
              />
            </button>
          ))}
        </div>
      </ColorPicker>
      <div className="buttons-container">
        <Button mode="secondary">Zapisz</Button>
        <Link>Odrzuć</Link>
      </div>
    </StyledPopup>
  );
};

export default NoteEditor;
