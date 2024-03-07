import { Formik, FormikErrors } from "formik";
import { useContext, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import type { DefaultResponseError } from "@escolalms/sdk/lib/types/api";
import type { ResponseError } from "umi-request";

import { API } from "@escolalms/sdk/lib";
import { Upload } from "../../molecules/Upload/Upload";
import styled, { withTheme } from "styled-components";

import { Input, Button, Text, Checkbox, TextArea } from "../../../";
import { ExtendableStyledComponent } from "types/component";
import useAdditionalFieldTranslations from "hooks/useAdditionalFieldsTranslations";

const StyledFormHeader = styled.div<{ mobile: boolean }>`
  h2,
  h3,
  h4 {
    font-size: ${(props) => (props.mobile ? "18px" : "28px")};
    text-align: left;
  }
  p {
    margin: 15px 0;
    text-align: left;
  }
  .upload {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    min-width: 250px;
    .wrapper {
      margin-right: 20px;
      width: 40%;
    }
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
  align-items: flex-start;
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
} & Record<string, boolean | string | null>;

interface Props extends ExtendableStyledComponent {
  onError?: (err: ResponseError<DefaultResponseError>) => void;
  onSuccess?: () => void;
  mobile?: boolean;
}

export const MyProfileForm: React.FC<Props> = ({
  onSuccess,
  onError,
  mobile = false,
}) => {
  const [initialValues, setInitialValues] = useState<
    FormValues & Record<string, boolean | string | null>
  >({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const { t } = useTranslation();
  const getFieldTranslations = useAdditionalFieldTranslations();
  const {
    updateProfile,
    fields,
    fetchFields,
    user,
    updateAvatar,
    fetchProfile,
  } = useContext(EscolaLMSContext);

  const isFetching = user.loading;

  useEffect(() => {
    fetchProfile();
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

    setInitialValues((prevState) => {
      return {
        ...prevState,
        ...additionalFields
          .filter(({ name }) => !(name in prevState))
          .reduce(
            (obj, item: API.Metadata) => ({
              ...obj,
              [item.name]: item.type === "boolean" ? false : item.default,
            }),
            {}
          ),
      };
    });
  }, [fields]);

  const isAdditionalRequiredField = useCallback(
    (field: API.Metadata) => {
      if (
        field?.rules &&
        field?.rules.length > 0 &&
        !!(field.rules as string[])?.find((rule) => rule === "required")
      ) {
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
    <>
      <StyledDiv className="wellms-component" mobile={mobile}>
        <StyledFormHeader className="wellms-component" mobile={mobile}>
          <Text size="18">{t("MyProfileForm.Avatar")}</Text>
          <Upload
            path={initialValues.path_avatar}
            url={initialValues.avatar}
            accept="image/*"
            onChange={onAvatarChange}
          />
        </StyledFormHeader>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={(values) => {
            const errors: FormikErrors<FormValues & Record<string, string>> =
              {};

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
            updateProfile({
              ...values,
            })
              .then(() => {
                onSuccess && onSuccess();
              })
              .catch((err: ResponseError<DefaultResponseError>) => {
                // reset form to previous state only if error occured
                resetForm();
                setErrors({ error: err.data?.message, ...err.data.errors });
                onError && onError(err);
              })
              .finally(() => {
                setSubmitting(false);
                fetchProfile();
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
                  .filter((field: API.Metadata) => {
                    const r =
                      Array.isArray(field.extra) &&
                      field.extra?.filter(
                        (item: Record<string, string | number | boolean>) =>
                          item.register
                      );

                    return field.type !== "boolean" && !r;
                  })
                  // NOTE: this is old filtering im not sure we should have diffrent filter for register and edit form this is for consideration
                  // .filter(
                  //   (field: API.Metadata) =>
                  //     field.type === "varchar" || field.type === "text"
                  // )
                  .map((field: API.Metadata, index: number) =>
                    field.type === "varchar" ? (
                      <Input
                        key={`${field}${index}`}
                        required={isAdditionalRequiredField(field)}
                        label={
                          getFieldTranslations(field.extra) ||
                          t(`AdditionalFields.${field.name}`)
                        }
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
                        label={
                          getFieldTranslations(field.extra) ||
                          t(`AdditionalFields.${field.name}`)
                        }
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
                  .filter((field: API.Metadata) => field.type === "boolean")
                  .map((field: API.Metadata, index: number) => (
                    <Checkbox
                      checked={!!values[field.name]}
                      key={`${field.id}${index}`}
                      label={
                        getFieldTranslations(field.extra) ||
                        t(`AdditionalFields.${field.name}`)
                      }
                      id={field.name + Date.now()}
                      name={field.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={isAdditionalRequiredField(field)}
                    />
                  ))}

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
        </Formik>{" "}
      </StyledDiv>
    </>
  );
};

export default withTheme(styled(MyProfileForm)<{ mobile: boolean }>``);
