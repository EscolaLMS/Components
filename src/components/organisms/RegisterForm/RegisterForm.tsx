import { Formik, FormikErrors } from "formik";
import {
  useContext,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import type { DefaultResponseError } from "@escolalms/sdk/lib/types/api";
import type { ResponseError } from "umi-request";

//import "@escolalms/ts-models";
//import "@escolalms/sdk/lib/types/api";

import styled, { withTheme } from "styled-components";

import { Input, Button, Title, Link, Text, Checkbox } from "../../../";

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

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  error?: string;
};

export const RegisterForm: React.FC<{
  onError?: (err: ResponseError<DefaultResponseError>) => void;
  onSuccess?: () => void;
  onLoginLink?: () => void;
  mobile?: boolean;
  return_url?: string;
}> = ({ onSuccess, onError, onLoginLink, mobile = false, return_url = "" }) => {
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
  const { t, i18n } = useTranslation();
  const { register, fields, fetchFields } = useContext(EscolaLMSContext);

  useEffect(() => {
    fetchFields({ class_type: "App\\Models\\User" });
  }, []);

  useEffect(() => {
    const additionalFields = (fields && fields.list) || [];

    setInitialValues((prevState) => ({
      ...prevState,
      ...additionalFields.reduce(
        (obj: object, item: EscolaLms.ModelFields.Models.Metadata) => ({
          ...obj,
          [item.name]: item.type === "boolean" ? false : "",
        }),
        {}
      ),
    }));
  }, [fields]);

  const isAdditionalRequiredField = useCallback(
    (field: EscolaLms.ModelFields.Models.Metadata) => {
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

  const getFieldTranslate = useCallback(() => {
    const currLang: string = i18n.language;

    fields.list &&
      fields.list.map((field) => {
        if (Array.isArray(field.extra)) {
          const translationFromServer = field.extra.find(
            (item) => currLang in item
          );
          if (translationFromServer) {
            i18n.addResourceBundle(currLang, "translation", {
              [`RegisterForm.${field.name}`]: translationFromServer[currLang],
            });
          }
        }
      });
  }, [fields, i18n]);

  useEffect(() => {
    getFieldTranslate();
  }, [fields]);

  return (
    <StyledDiv mobile={mobile}>
      <Title level={3}>{t("Registration")}</Title>
      <Text level={3}>{t("Registration.Subtitle")}</Text>
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

          if (!values.phone) {
            errors.phone = t("Required");
          } else if (!/\d{9}$/i.test(values.phone)) {
            errors.phone = t("Wrong phone number");
          }

          fields.list &&
            fields.list.map((field: EscolaLms.ModelFields.Models.Metadata) => {
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
            .then(() => {
              resetForm();
              onSuccess && onSuccess();
            })
            .catch((err: ResponseError<DefaultResponseError>) => {
              setErrors({ error: err.data.message, ...err.data.errors });
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
              label={t("RegisterForm.First name")}
              type="text"
              name="first_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name}
              error={touched.first_name && errors.first_name}
              required
            />

            <Input
              label={t("RegisterForm.Last name")}
              type="text"
              name="last_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.last_name}
              error={touched.last_name && errors.last_name}
              required
            />

            <Input
              label={t("Email")}
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
              label={t("Password")}
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password && errors.password}
              helper={t("RegisterForm.Password validation")}
              required
            />

            <Input
              label={t("RegisterForm.Repeat password")}
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
              label={t("RegisterForm.Phone")}
              type="text"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              error={touched.phone && errors.phone}
            />

            {fields &&
              Array.isArray(fields.list) &&
              fields.list
                .filter((field: EscolaLms.ModelFields.Models.Metadata) => {
                  const r =
                    Array.isArray(field.extra) &&
                    field.extra?.filter(
                      (item: Record<string, string | number | boolean>) =>
                        item.register
                    );

                  return field.type !== "boolean" && !r;
                })
                .map(
                  (
                    field: EscolaLms.ModelFields.Models.Metadata,
                    index: number
                  ) => (
                    <Input
                      key={`${field}${index}`}
                      required={isAdditionalRequiredField(field)}
                      label={t(`RegisterForm.${field.name}`)}
                      type="text"
                      name={field.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={String(values[field.name]) || ""}
                      error={errors[field.name] && touched[field.name]}
                    />
                  )
                )}

            {fields &&
              fields.list &&
              fields.list
                .filter(
                  (field: EscolaLms.ModelFields.Models.Metadata) =>
                    field.type === "boolean"
                )
                .map(
                  (
                    field: EscolaLms.ModelFields.Models.Metadata,
                    index: number
                  ) => (
                    <Checkbox
                      key={`${field.id}${index}`}
                      label={t(`RegisterForm.${field.name}`)}
                      id={field.name}
                      name={field.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )
                )}

            <Button mode="secondary" type="submit" loading={isSubmitting} block>
              {t("RegisterForm.Sign up")}
            </Button>
          </form>
        )}
      </Formik>
      <Text size="14">
        {t("RegisterForm.Already have account")}{" "}
        <Link underline onClick={() => onLoginLink && onLoginLink()}>
          {t("Login")}
        </Link>
      </Text>
    </StyledDiv>
  );
};

export default withTheme(styled(RegisterForm)<{ mobile: boolean }>``);
