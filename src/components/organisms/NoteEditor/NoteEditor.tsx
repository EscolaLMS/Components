import * as React from "react";
import { useState } from "react";
import { Text } from "../../atoms/Typography/Text";
import styled, { withTheme } from "styled-components";
import { Input } from "../../atoms/Input/Input";
import { TextArea } from "../../atoms/TextArea/TextArea";
import Button from "../../atoms/Button/Button";
import Link from "../../atoms/Link/Link";
import type { DefaultResponseError } from "@escolalms/sdk/lib/types/api";
import type { ResponseError } from "umi-request";
import { Formik } from "formik";
import { t } from "i18next";
import { ExtendableStyledComponent } from "types/component";

const ColorPicker = styled.div`
  display: flex;
  justify-content: flex-start;
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

const StyledPopup = styled.div`
  width: calc(100% - 32px);
  max-width: 468px;
  padding: 36px 23px 23px 23px;
  margin: 0 auto;

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

const SingleColor = styled("div")<SingleColorProps>`
  width: 12px;
  height: 12px;
  border-radius: 50px;
  background: ${(props) => props.color};
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid ${(props) => props.theme.gray2};
    width: 15px;
    height: 15px;
    border-radius: 50px;
    display: ${(props) => (props.active ? "block" : "none")};
  }
`;

interface NoteEditorProps extends ExtendableStyledComponent {
  onSuccess?: () => void;
  onError?: (err: ResponseError<DefaultResponseError>) => void;
}

interface SingleColorProps {
  color: string;
  active?: boolean;
}

interface FormValues {
  title: string;
  description: string;
  color: string;
}

const initialValues: FormValues = {
  title: "",
  description: "",
  color: "#EB5757",
};

export const NoteEditor: React.FC<NoteEditorProps> = ({
  onSuccess,
  className = "",
}) => {
  const [selectedColor, setSelectedColor] = useState("#EB5757");
  const colors: { color: string }[] = [
    { color: "#EB5757" },
    { color: "#F2994A" },
    { color: "#F2C94C" },
    { color: "#56CCF2" },
  ];
  return (
    <StyledPopup className={`wellms-component ${className}`}>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<FormValues> = {};
          if (!values.title) {
            errors.title = t("Required");
          }
          if (!values.description) {
            errors.description = t("Required");
          }
          return errors;
        }}
        onSubmit={(values) => {
          console.log(values);
          onSuccess && onSuccess();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Text className="form-title">{t<string>("NoteEditor.Title")}</Text>
            <Input
              type="text"
              label={t<string>("NoteEditor.titleInputLabel")}
              id="title"
              name="title"
              placeholder={t<string>("NoteEditor.titleInputPlaceholder")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              error={touched.title && errors.title}
            />
            <TextArea
              id="description"
              name="description"
              placeholder={t<string>("NoteEditor.descInputPlaceholder")}
              label={t<string>("NoteEditor.descInputLabel")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={touched.description && errors.description}
              rows={8}
            />
            <ColorPicker>
              <div className="label">{t<string>("NoteEditor.MarkColor")}</div>
              <div className="colors-container">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color.color);
                      setFieldValue("color", color.color);
                    }}
                    aria-label={color.color}
                  >
                    <SingleColor
                      color={color.color}
                      active={selectedColor === color.color}
                    />
                  </button>
                ))}
              </div>
            </ColorPicker>
            <div className="buttons-container">
              <Button type="submit" loading={isSubmitting} mode="secondary">
                {t<string>("NoteEditor.Save")}
              </Button>
              <Link>{t<string>("NoteEditor.Discard")}</Link>
            </div>
          </form>
        )}
      </Formik>
    </StyledPopup>
  );
};

export default withTheme(styled(NoteEditor)<NoteEditorProps>``);
