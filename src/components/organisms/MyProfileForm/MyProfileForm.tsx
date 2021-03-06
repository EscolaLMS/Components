import { Formik, FormikErrors } from "formik";
import { useContext, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import type { DefaultResponseError } from "@escolalms/sdk/lib/types/api";
import type { ResponseError } from "umi-request";
import { Container, Row, Col } from "react-grid-system";
import { Upload } from "../../molecules/Upload/Upload";
import styled, { withTheme } from "styled-components";

import { Input, Button, Title, Text, Checkbox, TextArea } from "../../../";

const StyledFormHeader = styled.div<{ mobile: boolean }>`
  text-align: center;
  h2,
  h3,
  h4 {
    font-size: ${(props) => (props.mobile ? "18px" : "28px")};
    text-align: center;
  }
  p {
    margin: 15px 0;
  }
  .upload {
    padding-top: ${(props) => (props.mobile ? "15px" : "30px")};
  }
`;

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
    margin-bottom: 15px;
  }
`;

type FormValues = {
  first_name?: string;
  last_name?: string;
  email?: string | null;
  phone?: string;
  error?: string | null;
  path_avatar?: string;
  avatar?: string;
} & Record<string, boolean | number | string>;

export const MyProfileForm: React.FC<{
  onError?: (err: ResponseError<DefaultResponseError>) => void;
  onSuccess?: () => void;
  mobile?: boolean;
}> = ({ onSuccess, onError, mobile = false }) => {
  const [initialValues, setInitialValues] = useState<
    FormValues & Record<string, string | boolean>
  >({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const { t } = useTranslation();
  const { updateProfile, fields, fetchFields, user, updateAvatar } =
    useContext(EscolaLMSContext);

  const isFetching = user.loading;

  useEffect(() => {
    fetchFields({ class_type: "App\\Models\\User" });
  }, []);

  useEffect(() => {
    if (!user.loading && user.value) {
      setInitialValues((prevState) =>
        Object.assign({}, prevState, { ...user.value })
      );
    }
  }, [user]);

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
      if (field?.rules && field?.rules.length > 0) {
        return true;
      }
      return false;
    },
    [fields]
  );

  const onAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        updateAvatar(e.target.files[0]);
      }
    },
    [updateAvatar]
  );

  return (
    <Container>
      <Row>
        <Col sm={12}>
          <StyledFormHeader mobile={mobile}>
            <Title level={3}>{t<string>("MyProfileForm.Heading")}</Title>
            <Text level={3}>{t<string>("MyProfileForm.Subtitle")}</Text>
          </StyledFormHeader>
        </Col>
      </Row>
      <Row>
        <Col sm={mobile ? 12 : 2} className="upload-column">
          <StyledFormHeader mobile={mobile}>
            <Upload
              path={initialValues.path_avatar}
              url={initialValues.avatar}
              accept="image/*"
              onChange={onAvatarChange}
            />
          </StyledFormHeader>
        </Col>
        <Col sm={mobile ? 12 : 8}>
          <StyledDiv mobile={mobile}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validate={(values) => {
                const errors: FormikErrors<
                  FormValues & Record<string, string>
                > = {};

                if (!values.first_name) {
                  errors.first_name = t("Required");
                }
                if (!values.last_name) {
                  errors.last_name = t("Required");
                }
                if (!values.email) {
                  errors.email = t("Required");
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = t("Wrong email");
                }

                if (!values.phone) {
                  errors.phone = t("Required");
                } else if (!/\d{9}$/i.test(values.phone)) {
                  errors.phone = t("Wrong phone number");
                }

                fields.list &&
                  fields.list.map(
                    (field: EscolaLms.ModelFields.Models.Metadata) => {
                      if (isAdditionalRequiredField(field)) {
                        if (!values[field.name]) {
                          errors[field.name] = t("Required");
                        }
                      }
                    }
                  );

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
                updateProfile({
                  ...values,
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
                    label={t<string>("First name")}
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                    error={touched.first_name && errors.first_name}
                    required
                  />

                  <Input
                    label={t<string>("Last name")}
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                    error={touched.last_name && errors.last_name}
                    required
                  />

                  <Input
                    label={t<string>("Email")}
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
                    label={t<string>("Phone")}
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
                      .filter(
                        (field: EscolaLms.ModelFields.Models.Metadata) =>
                          field.type === "varchar" || field.type === "text"
                      )
                      .map(
                        (
                          field: EscolaLms.ModelFields.Models.Metadata,
                          index: number
                        ) =>
                          field.type === "varchar" ? (
                            <Input
                              key={`${field}${index}`}
                              required={isAdditionalRequiredField(field)}
                              label={t(`AdditionalFields.${field.name}`)}
                              type="text"
                              name={field.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={String(values[field.name]) || ""}
                              error={errors[field.name] && touched[field.name]}
                            />
                          ) : (
                            <TextArea
                              rows={10}
                              key={`${field}${index}`}
                              required={isAdditionalRequiredField(field)}
                              label={t(`AdditionalFields.${field.name}`)}
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
                            checked={!!values[field.name]}
                            key={`${field.id}${index}`}
                            label={t(`AdditionalFields.${field.name}`)}
                            id={field.name}
                            name={field.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        )
                      )}

                  <Button
                    mode="secondary"
                    type="submit"
                    loading={isSubmitting || isFetching}
                    block
                  >
                    {t<string>("MyProfileForm.Update")}
                  </Button>
                </form>
              )}
            </Formik>
          </StyledDiv>
        </Col>
        <Col sm={mobile ? 12 : 2}> </Col>
      </Row>
    </Container>
  );
};

export default withTheme(styled(MyProfileForm)<{ mobile: boolean }>``);
