Image upload component

This component will be updated

TODO: style and add logic

```jsx
import ThemeTester from "../../../styleguide/ThemeTester";

<div style={{ width: "350px" }}>
  <ThemeTester flexDirection="column">
    <Upload accept="image/*" url="https://placekitten.com/g/600/800" />
    <Upload
      accept="image/*"
      url="https://placekitten.com/g/600/800"
      loading
      buttonTitle=""
    />
    <Upload accept="image/*" buttonTitle="Upload!!!" />
  </ThemeTester>
</div>;
```
