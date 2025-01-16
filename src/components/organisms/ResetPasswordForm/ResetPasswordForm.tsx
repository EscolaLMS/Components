import { Formik, FormikErrors } from "formik";
import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import type { DefaultResponseError } from "@escolalms/sdk/lib/types";
import type { ResponseError } from "umi-request";

import styled, { withTheme } from "styled-components";

import { Input, Button, Title, Link, Text } from "../../../";
import { ExtendableStyledComponent } from "types/component";

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
    min-width: ${({ mobile }) => (mobile ? "100%" : "440px")};
    margin-bottom: 15px;
  }
`;

interface MyFormValues {
  email: string;
  password: string;
  error?: string;
}

interface Props extends ExtendableStyledComponent {
  onFirstStepError?: (err: ResponseError<DefaultResponseError>) => void;
  onSecondStepError?: (err: ResponseError<DefaultResponseError>) => void;
  onFirstStepSuccess?: () => void;
  onSecondStepSuccess?: () => void;
  backToLogin?: () => void;
  onRegisterLink?: () => void;
  mobile?: boolean;
  return_url?: string;
  secondStep?: boolean;
  email?: string;
  token?: string;
}

export const ResetPasswordForm: React.FC<Props> = ({
  onFirstStepError,
  onSecondStepError,
  onFirstStepSuccess,
  onSecondStepSuccess,
  backToLogin,
  onRegisterLink,
  mobile = false,
  return_url,
  secondStep,
  email,
  token,
  className = "",
}) => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const { t } = useTranslation();
  const { forgot, reset } = useContext(EscolaLMSContext);

  const handleFirstStep = useCallback(
    (
      values: MyFormValues,
      setSubmitting: (isSubmitting: boolean) => void,
      setErrors: (errors: FormikErrors<MyFormValues>) => void
    ) => {
      forgot({
        email: values.email,
        return_url: `${return_url}`,
      })
        .then(() => onFirstStepSuccess && onFirstStepSuccess())
        .catch((err: ResponseError<DefaultResponseError>) => {
          setErrors({ error: err?.data?.message, ...err.data.errors });
          onFirstStepError && onFirstStepError(err);
        })
        .finally(() => setSubmitting(false));
    },
    []
  );

  const handleSecondStep = useCallback(
    (
      values: MyFormValues,
      setSubmitting: (isSubmitting: boolean) => void,
      setErrors: (errors: FormikErrors<MyFormValues>) => void
    ) => {
      reset({
        password: values.password,
        email: String(email),
        token: String(token),
      })
        .then(() => {
          onSecondStepSuccess && onSecondStepSuccess();
        })
        .catch((err: ResponseError<DefaultResponseError>) => {
          setErrors({ error: err?.data?.message, ...err.data.errors });
          onSecondStepError && onSecondStepError(err);
        })
        .finally(() => setSubmitting(false));
    },
    []
  );

  return (
    <StyledDiv className={`wellms-component ${className}`} mobile={mobile}>
      <Title level={3}>{t<string>("ResetForm.ResetPassword")}</Title>{" "}
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<MyFormValues> = {};
          if (!values.email && !secondStep) {
            errors.email = t("Required");
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          !secondStep
            ? handleFirstStep(values, setSubmitting, setErrors)
            : handleSecondStep(values, setSubmitting, setErrors);
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
        }) => (
          <form onSubmit={handleSubmit}>
            {errors && errors.error && (
              <Text type="danger">{errors.error}</Text>
            )}
            {!secondStep ? (
              <Input
                type="email"
                name="email"
                label={t<string>("Email")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && errors.email}
              />
            ) : (
              <Input
                type="password"
                name="password"
                label={t<string>("Password")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && errors.password}
              />
            )}

            <Button mode="primary" type="submit" loading={isSubmitting} block>
              {t<string>("ResetForm.Reset")}
            </Button>
          </form>
        )}
      </Formik>
      {!secondStep && (
        <>
          <Text size="14">
            <Link underline onClick={() => backToLogin && backToLogin()}>
              {t<string>("ResetForm.BackToLogin")}
            </Link>
          </Text>
          <Text size="13">{t<string>("Login.NoAccount")} </Text>
          <Link onClick={() => onRegisterLink && onRegisterLink()}>
            {t<string>("Login.Signup")}
          </Link>
        </>
      )}
    </StyledDiv>
  );
};

// https://styled-components.com/docs/api#using-custom-props

// Main button with styles
export default withTheme(styled(ResetPasswordForm)<{ mobile: boolean }>``);
