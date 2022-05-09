import { Formik } from "formik";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";

import { Input, Button, Title } from "../../../";

interface MyFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const { t, i18n } = useTranslation();
  const { login, apiUrl } = useContext(EscolaLMSContext);

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: Partial<MyFormValues> = {};
        /*
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        */
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        login(values)
          .then((resp) => console.log("resp", resp))
          .catch((err) => console.log("err", err))
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
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Title level={3}>{t("Welcome to Wellms")}</Title>{" "}
          <Input
            type="email"
            name="email"
            label="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
          />
          <Input
            type="password"
            name="password"
            label="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
          />
          <Button mode="secondary" type="submit" loading={isSubmitting} block>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
