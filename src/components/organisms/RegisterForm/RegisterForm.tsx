import { Formik, FormikErrors } from "formik";
import { useContext, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import type {
  DefaultResponse,
  DefaultResponseError,
  RegisterResponse,
} from "@escolalms/sdk/lib/types/api";
import type { ResponseError } from "umi-request";

//import "@escolalms/ts-models";
//import "@escolalms/sdk/lib/types/api";

import styled, { withTheme } from "styled-components";

import { Input, Button, Title, Link, Text, Checkbox } from "../../../";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";
import { API } from "@escolalms/sdk/lib";
import useAdditionalFieldTranslations from "../../../hooks/useAdditionalFieldsTranslations";

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
  .lms-checkbox {
    margin: 20px 0;
  }
  .lsm-input {
    margin: 30px 0;
    &.has-error,
    &.has-helper {
      margin-bottom: -15px;
    }
  }
  button {
    margin-top: 10px;
  }
  p {
    margin: 15px 0;
  }
  p,
  label p {
    margin: 0;
  }
  a {
    color: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
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

const GotAccount = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    margin-top: 11px;
    font-weight: 700;
  }
`;

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  error?: string;
};

export interface RegisterFormProps extends ExtendableStyledComponent {
  onError?: (err: ResponseError<DefaultResponseError>) => void;
  onSuccess?: (
    res: DefaultResponse<RegisterResponse>,
    values: FormValues & Record<string, string | boolean>
  ) => void;
  onLoginLink?: () => void;
  mobile?: boolean;
  return_url?: string;
  /** Additional labels you can overwrite fields labels. Usable for additional fields.  */
  fieldLabels?: Record<string, React.ReactNode>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onError,
  onLoginLink,
  mobile = false,
  return_url = "",
  fieldLabels = {},
  className = "",
}) => {
  const [initialValues, setInitialValues] = useState<
    FormValues & Record<string, string | boolean>
  >({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
  });
  const { t } = useTranslation();
  const { register, fields, fetchFields } = useContext(EscolaLMSContext);
  const { getFieldTranslations, filterByKey } =
    useAdditionalFieldTranslations();
  useEffect(() => {
    fetchFields({ class_type: "App\\Models\\User" });
  }, []);

  useEffect(() => {
    const additionalFields = (fields && fields.list) || [];

    setInitialValues((prevState) => ({
      ...prevState,
      ...additionalFields.reduce(
        (obj: object, item: API.Metadata) => ({
          ...obj,
          [item.name]: item.type === "boolean" ? false : "",
        }),
        {}
      ),
    }));
  }, [fields]);

  const isAdditionalRequiredField = useCallback(
    (field: API.Metadata) => {
      if (
        field.type !== "boolean" &&
        field.extra &&
        Array.isArray(field.extra)
      ) {
        if (
          field.extra?.some(
            (item: Record<string, string | number | boolean>) =>
              item.register === false
          )
        ) {
          return false;
        }
      }

      return field?.rules && field?.rules.length > 0;
    },
    [fields]
  );

  return (
    <StyledDiv className={`wellms-component ${className}`} mobile={mobile}>
      <Title level={3} style={{ maxWidth: "480px", textAlign: "center" }}>
        {t<string>("RegisterForm.Header")}
      </Title>
      <Text level={3}>{t<string>("RegisterForm.Subtitle")}</Text>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={(values) => {
          const errors: FormikErrors<FormValues & Record<string, string>> = {};

          if (!values.first_name) {
            errors.first_name = t("Required");
          }
          if (!values.last_name) {
            errors.last_name = t("Required");
          }
          if (!values.email) {
            errors.email = t("Required");
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = t("Wrong email");
          }
          if (!values.password) {
            errors.password = t("Required");
          } /*else if (
            !/(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/i.test(values.password)
          ) {
            errors.password = t("Bad password");
          }*/
          if (!values.password_confirmation) {
            errors.password_confirmation = t("Required");
          } else if (values.password !== values.password_confirmation) {
            errors.password_confirmation = t("Different passwords");
          }

          if (values.phone && !/\d{9}$/i.test(values.phone)) {
            errors.phone = t("Wrong phone number");
          }

          fields.list &&
            fields.list.map((field: API.Metadata) => {
              if (isAdditionalRequiredField(field)) {
                if (!values[field.name]) {
                  errors[field.name] = t("Required");
                }
              }
            });

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
          register({
            ...values,
            return_url: `${window.location.origin}${return_url}`,
          })
            .then((res: DefaultResponse<RegisterResponse>) => {
              resetForm();
              onSuccess?.(res, values);
            })
            .catch((err: ResponseError<DefaultResponseError>) => {
              setErrors({ error: err?.data?.message, ...err.data.errors });
              onError && onError(err);
            })
            .finally(() => {
              setSubmitting(false);
            });
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
            <Input
              label={fieldLabels["first_name"] || t<string>("First name")}
              type="text"
              name="first_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name}
              error={touched.first_name && errors.first_name}
              required
            />

            <Input
              label={fieldLabels["last_name"] || t<string>("Last name")}
              type="text"
              name="last_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.last_name}
              error={touched.last_name && errors.last_name}
              required
            />

            <Input
              label={fieldLabels["email"] || t<string>("Email")}
              className="form-control grey"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && errors.email}
              required
            />

            <Input
              label={fieldLabels["password"] || t<string>("Password")}
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password && errors.password}
              helper={t<string>("Password validation")}
              required
            />

            <Input
              label={t<string>("Repeat password")}
              type="password"
              name="password_confirmation"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password_confirmation}
              error={
                touched.password_confirmation && errors.password_confirmation
              }
              required
            />

            <Input
              label={fieldLabels["phone"] || t<string>("Phone")}
              type="text"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              error={touched.phone && errors.phone}
            />

            {(fields.list || [])
              .filter((field: API.Metadata) => {
                const r = filterByKey(field);

                return field.type !== "boolean" && !r;
              })
              .map((field: API.Metadata, index: number) => (
                <Input
                  key={`${field}${index}`}
                  required={isAdditionalRequiredField(field)}
                  label={
                    getFieldTranslations(field) ||
                    fieldLabels[`AdditionalFields.${field.name}`] ||
                    t(`AdditionalFields.${field.name}`)
                  }
                  type="text"
                  name={field.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={String(values[field.name]) || ""}
                  error={errors[field.name] && touched[field.name]}
                />
              ))}

            {(fields.list || [])
              .filter((field: API.Metadata) => {
                const r = filterByKey(field);

                return field.type === "boolean" && !r;
              })
              .map((field: API.Metadata, index: number) => (
                <Checkbox
                  key={`${field.id}${index}`}
                  label={
                    getFieldTranslations(field) ||
                    fieldLabels[`AdditionalFields.${field.name}`] ||
                    t(`AdditionalFields.${field.name}`)
                  }
                  id={field.name + Date.now()}
                  name={field.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ))}

            <Button mode="primary" type="submit" loading={isSubmitting} block>
              {t<string>("Login.Signup")}
            </Button>
          </form>
        )}
      </Formik>
      <GotAccount>
        <Text size="14">
          {t<string>("RegisterForm.Already have an account")}{" "}
        </Text>{" "}
        <Link onClick={() => onLoginLink && onLoginLink()}>
          {t<string>("Login.Signin")}
        </Link>
      </GotAccount>
    </StyledDiv>
  );
};

export default withTheme(styled(RegisterForm)<{ mobile: boolean }>``);
