import { Formik, FormikErrors } from "formik";
import { useContext, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import type { DefaultResponseError } from "@escolalms/sdk/lib/types/api";
import type { ResponseError } from "umi-request";
//import "@escolalms/ts-models";
//import "@escolalms/sdk/lib/types/api";

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
  onResetPasswordLink?: () => void;
  onRegisterLink?: () => void;
  mobile?: boolean;
  return_url?: string;
}> = ({
  onSuccess,
  onError,
  onResetPasswordLink,
  onRegisterLink,
  mobile = false,
  return_url = "",
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
  const { register, config, fields, fetchFields } =
    useContext(EscolaLMSContext);

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
      return field?.rules && field?.rules.length > 0;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields]
  );

  return (
    <StyledDiv mobile={mobile}>
      <Title level={3}>{t("Zaloguj się do swojego konta Wellms")}</Title>{" "}
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
          } else if (
            !/(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/i.test(values.password)
          ) {
            errors.password = t("Bad password");
          }
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          register({
            ...values,
            return_url: `${window.location.origin}${return_url}`,
          })
            .then(() => {
              setSubmitting(false);
              //registrationMessageSucces();
              resetForm();
              //setSent(true);
            })
            .catch((error) => {
              console.log("error", error);

              //.catch((error: API.DataResponseSuccess<API.DefaultResponseError>) => {
              //toast.error(error.data.message);
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
            <div>
              <label htmlFor="first_name">
                *{t("RegisterForm.First name")}
              </label>
              <input
                placeholder={""}
                className="form-control grey"
                type="text"
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />
              {errors.first_name && touched.first_name && (
                <span>{errors.first_name}</span>
              )}
            </div>
            <div>
              <label htmlFor="last_name">*{t("RegisterForm.Last name")}</label>
              <input
                placeholder={""}
                className="form-control grey"
                type="text"
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
              />
              {errors.last_name && touched.last_name && (
                <span>{errors.last_name}</span>
              )}
            </div>
            <div>
              <label htmlFor="email">*{t("Email")}</label>
              <input
                placeholder={t("Email")}
                className="form-control grey"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && <span>{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="password">*{t("Password")}</label>
              <input
                placeholder={""}
                className="form-control grey"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <p>({t("RegisterForm.Password validation")} (!@#$%^&*))</p>
              {errors.password && touched.password && (
                <span>{errors.password}</span>
              )}
            </div>
            <div>
              <label htmlFor="password_confirmation">
                *{t("RegisterForm.Repeat password")}
              </label>
              <input
                placeholder={""}
                className="form-control grey"
                type="password"
                name="password_confirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password_confirmation}
              />
              {errors.password_confirmation &&
                touched.password_confirmation && (
                  <span>{errors.password_confirmation}</span>
                )}
            </div>
            <div>
              <label htmlFor="password">*{t("RegisterForm.Phone")}</label>
              <input
                placeholder={""}
                className="form-control grey"
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && <span>{errors.phone}</span>}
            </div>

            {fields &&
              fields.list &&
              fields.list.length > 0 &&
              fields.list
                .filter((field: EscolaLms.ModelFields.Models.Metadata) => {
                  const r =
                    Array.isArray(field.extra) &&
                    field.extra?.filter(
                      (item: Record<string, any>) => item.register
                    );

                  return field.type !== "boolean" && !r;
                })
                .map(
                  (
                    field: EscolaLms.ModelFields.Models.Metadata,
                    index: number
                  ) => (
                    <div key={`${field}${index}`}>
                      <label htmlFor="password">
                        {isAdditionalRequiredField(field) && "*"}
                        {t(`RegisterForm.${field.name}`)}
                      </label>

                      <input
                        placeholder={""}
                        className="form-control grey"
                        type="text"
                        name={field.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={String(values[field.name]) || ""}
                      />
                      {errors[field.name] && touched[field.name] && (
                        <span>{errors[field.name]}</span>
                      )}
                    </div>
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
                    <div key={`${field.id}${index}`}>
                      <div>
                        <input
                          placeholder={""}
                          type="checkbox"
                          id={field.name}
                          name={field.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <label htmlFor={field.name}>
                          {/**
                          {field.name === "Privacy Policy"
                            ? rodoLabel()
                            : field.name === "Terms of Service"
                            ? regulationsLabel()
                            : field.name}
                  */}
                        </label>
                      </div>

                      {errors[field.name] && touched[field.name] && (
                        <span>{errors[field.name]}</span>
                      )}
                    </div>
                  )
                )}

            <Button
              type="submit"
              className={isSubmitting ? "loading" : ""}
              disabled={isSubmitting}
            >
              {t("RegisterForm.Sign up")}
            </Button>
          </form>
        )}
      </Formik>
    </StyledDiv>
  );
};

// https://styled-components.com/docs/api#using-custom-props

// Main button with styles
export default withTheme(styled(RegisterForm)<{ mobile: boolean }>``);
