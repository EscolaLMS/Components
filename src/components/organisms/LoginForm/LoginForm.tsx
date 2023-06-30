import { Formik, FormikProps } from "formik";
import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import type {
  DefaultResponseError,
  DefaultResponse,
} from "@escolalms/sdk/lib/types/api";
import type { ResponseError } from "umi-request";

import styled, { withTheme } from "styled-components";

import { Input, Button, Title, Link, Text, Checkbox } from "../../../";
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
  .lsm-input,
  .lms-checkbox {
    margin: 30px 0;
  }
  button {
    margin-top: 10px;
  }
  p {
    margin: 15px 0;
  }
  p,
  a,
  label {
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
  remember_me: boolean;
  error?: string;
}

interface Props extends ExtendableStyledComponent {
  onError?: (err: DefaultResponse<DefaultResponseError>) => void;
  onSuccess?: () => void;
  onResetPasswordLink?: () => void;
  onRegisterLink?: () => void;
  mobile?: boolean;
}

export const LoginForm: React.FC<Props> = ({
  onSuccess,
  onError,
  onResetPasswordLink,
  onRegisterLink,
  mobile = false,
  className = "",
}) => {
  const initialValues: MyFormValues = {
    email: "",
    password: "",
    remember_me: false,
  };
  const { t } = useTranslation();
  const { login, user } = useContext(EscolaLMSContext);

  const formikRef = useRef<FormikProps<MyFormValues>>(null);

  useEffect(() => {
    if (user.error) {
      formikRef.current?.setErrors({
        // WTF. Error from the API is not consisted with rest of the responses
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        error: user.error?.data?.message || user.error?.message,
        ...user.error.errors,
      });
      onError?.(user.error);
    } else {
      formikRef.current?.setErrors({});
    }
  }, [user.error]);

  useEffect(() => {
    if (user.value) {
      onSuccess?.();
    }
  }, [user.value, onSuccess]);

  return (
    <StyledDiv className={`wellms-component ${className}`} mobile={mobile}>
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
          login({
            ...values,
            remember_me: values.remember_me ? 1 : 0,
          })
            .finally(() => setSubmitting(false))
            .catch((err: ResponseError<DefaultResponseError>) => {
              setErrors({ error: err.data?.message, ...err.data.errors });
              onError?.(err.data);
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
            <Checkbox
              name="remember_me"
              label={t<string>("Login.RememberMe")}
              value={String(values.remember_me)}
              checked={values.remember_me}
              onChange={handleChange}
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
