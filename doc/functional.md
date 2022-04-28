Functional Components represents how to connect other components with application logic

## Translation

```js
import { useTranslation } from "react-i18next";

import "../src/styleguide/i18n.ts";

import { Title, Button } from "../src/index.ts";
import { ThemeTester } from "../src/styleguide";

const { t, i18n } = useTranslation();

<div>
  <ThemeTester>
    <Title>{t("Welcome to Wellms")}</Title>
    {["en", "fr", "pl"].map((langCode) => (
      <Button
        key={langCode}
        onClick={() => i18n.changeLanguage(langCode)}
        disabled={i18n.language === langCode}
      >
        {langCode}
      </Button>
    ))}
  </ThemeTester>
</div>;
```

## Forms

Below is example how to use forms with `formik`

```js
import { Formik } from "formik";

import { Title, Button, Input } from "../src/index.ts";
import { ThemeTester } from "../src/styleguide";

<ThemeTester>
  <Title>Anywhere in your app!</Title>
  <Formik
    initialValues={{ email: "", password: "" }}
    validate={(values) => {
      const errors = {};
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
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && touched.email && errors.email}
        <Input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && touched.password && errors.password}
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    )}
  </Formik>
</ThemeTester>;
```
