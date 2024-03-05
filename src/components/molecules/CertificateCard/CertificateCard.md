```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ThemeTester from "../../../styleguide/ThemeTester";

const props = {
  uptitle: "Tytuł kursu",
  title: <h3>Certificate for H5P Admin Kowalskii</h3>,
  dateUptitle: "Uzyskany w dniu",
  date: <p style={{ fontSize: "16px" }}>2021-06-01</p>,
  actions: (
    <button onClick={() => console.log("dada")} style={{ all: "unset" }}>
      <p style={{ fontSize: "13px" }}>Pobierz certyfikat</p>
    </button>
  ),
};

<GlobalThemeProvider>
  <ThemeTester flexDirection="column" alignItems={"start"}>
    <div style={{ width: "100%" }}>
      <CertificateCard
        uptitle={props.uptitle}
        title={props.title}
        dateUptitle={props.dateUptitle}
        date={props.date}
        actions={props.actions}
      />
    </div>
  </ThemeTester>
</GlobalThemeProvider>;
```
