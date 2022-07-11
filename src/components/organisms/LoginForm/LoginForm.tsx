import { Formik, FormikConfig, FormikProps } from "formik";
import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import type {
  DefaultResponseError,
  DefaultResponse,
} from "@escolalms/sdk/lib/types/api";
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
  password: string;
  error?: string;
}

export const LoginForm: React.FC<{
  onError?: (err: DefaultResponse<DefaultResponseError>) => void;
  onSuccess?: () => void;
  onResetPasswordLink?: () => void;
  onRegisterLink?: () => void;
  mobile?: boolean;
}> = ({
  onSuccess,
  onError,
  onResetPasswordLink,
  onRegisterLink,
  mobile = false,
}) => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const { t } = useTranslation();
  const { login, user } = useContext(EscolaLMSContext);

  const formikRef = useRef<FormikProps<MyFormValues>>(null);

  useEffect(() => {
    if (user.error) {
      formikRef.current?.setErrors({
        //@ts-ignore, unconsistend API response in this edge case
        error: user.error.data.message || user.error.message,
        ...user.error.errors,
      });
      onError && onError(user.error);
    } else {
    }
  }, [user.error]);

  useEffect(() => {
    if (user.value) {
      onSuccess && onSuccess();
    }
  }, [user.value, onSuccess]);

  return (
    <StyledDiv mobile={mobile}>
      <Title level={3}>{t("Login.Header")}</Title>{" "}
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<MyFormValues> = {};

          if (!values.email) {
            errors.email = t("Required");
          }

          if (!values.password) {
            errors.password = t("Required");
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          login(values)
            .finally(() => setSubmitting(false))
            .catch((err: ResponseError<DefaultResponseError>) => {
              setErrors({ error: err.data.message, ...err.data.errors });
              onError && onError(err.data);
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
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && errors.email}
            />
            <Input
              type="password"
              name="password"
              label={t<string>("Password")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password && errors.password}
            />
            <Button
              mode="secondary"
              type="submit"
              loading={isSubmitting || user.loading}
              block
            >
              {t<string>("Login.Signin")}
            </Button>
          </form>
        )}
      </Formik>
      <Text size="14">
        <Link
          underline
          onClick={() => onResetPasswordLink && onResetPasswordLink()}
        >
          {t<string>("Login.NotRemember")}
        </Link>
      </Text>
      <Text size="14">
        {t<string>("Login.NoAccount")}{" "}
        <Link underline onClick={() => onRegisterLink && onRegisterLink()}>
          {t<string>("Login.Signup")}
        </Link>
      </Text>
    </StyledDiv>
  );
};

export default withTheme(styled(LoginForm)<{ mobile: boolean }>``);
