import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import styled, { withTheme } from "styled-components";
import { ResponseError } from "umi-request";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { DefaultResponseError } from "@escolalms/sdk/lib/types/api";

import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { Title } from "../../atoms/Typography/Title";
import { Text } from "../../atoms/Typography/Text";

export interface EnquiryFormValues {
  phone_number?: string;
  contact_details?: string;
  error?: string;
}

interface Props {
  course: { id: number; title: string };
  className?: string;
  initialValues?: EnquiryFormValues;
  onSuccess?: () => void;
  onError?: () => void;
  onCancel?: () => void;
}

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;

  header {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;

    & > .form-content {
      .error-msg {
        color: ${({ theme }) => theme.errorColor};
      }

      .input-group {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }

    & > .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
`;

export const ModalCourseAccess: React.FC<Props> = ({
  course,
  className,
  initialValues = { phone_number: "", contact_details: "" },
  onCancel,
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const { addCourseAccess } = useContext(EscolaLMSContext);

  return (
    <Container
      className={`wellms-component ${className}`}
      data-testid="modal-course-access"
    >
      <header>
        <Title level={1}>{course.title}</Title>
        <Text size="14" bold>
          {t("ModalCourseAccess.Title")}
        </Text>
      </header>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setErrors, setSubmitting, resetForm }) => {
          const payload: API.CourseAccessEnquiryCreateRequest = {
            course_id: course.id,
            data: values,
          };

          addCourseAccess(payload)
            .then(() => {
              resetForm();
              onSuccess?.();
            })
            .catch((err: ResponseError<DefaultResponseError>) => {
              setErrors({ error: err?.data?.message, ...err?.data?.errors });
              onError?.();
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-content">
              {errors && errors.error && (
                <Text className="error-msg" size="12" bold>
                  {errors.error}
                </Text>
              )}
              <div className="input-group">
                <Input
                  type="text"
                  label={t("ModalCourseAccess.PhoneNumber")}
                  error={touched.phone_number && errors.phone_number}
                  id="phone_number"
                  name="phone_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                />
                <TextArea
                  label={t("ModalCourseAccess.ContactDetails")}
                  error={touched.contact_details && errors.contact_details}
                  id="contact_details"
                  name="contact_details"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact_details}
                />
              </div>
            </div>
            <div className="button-group">
              <Button type="button" mode="secondary" onClick={onCancel}>
                {t("ModalCourseAccess.Cancel")}
              </Button>
              <Button type="submit" mode="secondary">
                {t("ModalCourseAccess.Submit")}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default withTheme(styled(ModalCourseAccess)<{ mobile: boolean }>``);
