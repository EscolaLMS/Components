Below is example how to use forms with `formik`

```js
import { Formik } from "formik";

import { Title, Button, Input } from "../../src/index.ts";
import { ThemeTester } from "../../src/styleguide";

<ThemeTester flexDirection="column" alignItems="start">
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
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
</ThemeTester>;
```
