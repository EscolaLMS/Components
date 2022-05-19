import { Formik } from "formik";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import type { DefaultResponseError } from "@escolalms/sdk/lib/types/api";
import type { ResponseError } from "umi-request";

import styled, { withTheme } from "styled-components";

import { Input, Button, Title, Link, Text } from "../../../";

const StyledDiv = styled.div<{ mobile: boolean }>`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  .lsm-input {
    margin: 30px 0;
  }
  button {
    margin-top: 10px;
  }
  p {
    margin: 15px 0;
  }
  p,
  a {
    font-size: 14px;
  }
  h2,
  h3,
  h4 {
    font-size: ${(props) => (props.mobile ? "18px" : "28px")};
  }
  form {
    width: 100%;
    max-width: 440px;
    margin-bottom: 15px;
  }
`;

interface MyFormValues {
  email: string;
  error?: string;
}

export const ResetPasswordForm: React.FC<{
  onError?: (err: ResponseError<DefaultResponseError>) => void;
  onSuccess?: () => void;
  backToLogin?: () => void;
  onRegisterLink?: () => void;
  mobile?: boolean;
}> = ({ onSuccess, onError, backToLogin, onRegisterLink, mobile = false }) => {
  const initialValues: MyFormValues = { email: "" };
  const { t } = useTranslation();
  const { forgot } = useContext(EscolaLMSContext);

  return (
    <StyledDiv mobile={mobile}>
      <Title level={3}>{t("Zresetuj hasło")}</Title>{" "}
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<MyFormValues> = {};

          if (!values.email) {
            errors.email = t("Required");
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          forgot({
            email: values.email,
            // return_url: `${window.location.origin}${routing.password_reset}`,
            // TODO: change this if routing will be created
            return_url: `${window.location.origin}/reset`,
          })
            .then(() => onSuccess && onSuccess())
            .catch((err: ResponseError<DefaultResponseError>) => {
              setErrors({ error: err.data.message, ...err.data.errors });
              onError && onError(err);
            })
            .finally(() => setSubmitting(false));
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

          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            {errors && errors.error && (
              <Text type="danger">{errors.error}</Text>
            )}
            <Input
              type="email"
              name="email"
              label="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && errors.email}
            />

            <Button mode="secondary" type="submit" loading={isSubmitting} block>
              {t("Resetuj hasło")}
            </Button>
          </form>
        )}
      </Formik>
      <Text size="14">
        <Link underline onClick={() => backToLogin && backToLogin()}>
          {t("Wróć do logowania")}
        </Link>
      </Text>
      <Text size="14">
        {t("Nie posiadasz konta?")}{" "}
        <Link underline onClick={() => onRegisterLink && onRegisterLink()}>
          {t("Zarejestruj się")}
        </Link>
      </Text>
    </StyledDiv>
  );
};

// https://styled-components.com/docs/api#using-custom-props

// Main button with styles
export default withTheme(styled(ResetPasswordForm)<{ mobile: boolean }>``);
