import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import { Input, Button, Title } from "../../../";

interface MyFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const { t, i18n } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: Partial<MyFormValues> = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
