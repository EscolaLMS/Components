```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Notifications.png";
import img2 from "./Notifications-2.png";
import Notifications from "./Notifications";

<GlobalThemeProvider>
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Notifications
      notifications={[
        {
          id: "324241",
          unread: true,
          title: "Ostatni dzwonek na szkolenie BHP",
          description:
            "Już za tydzień upływa termin szkolenia BHP przy produkcji Big Mac Vege.",
          date_time: new Date(),
        },
        {
          id: "324244",
          unread: false,
          title: "Masz do zrobienia kurs BHP",
          description:
            "Kursu BHP przy produkcji Big Mac Vege. Pamiętaj, że kurs jest obowiązkowy. Termin ukończenia upływa 31 marca 2022",
          date_time: new Date(Date.now() - 86400000),
        },
      ]}
      showAllLink="/"
    />
  </div>
  <ImageModal images={[img1]} />
</GlobalThemeProvider>;
```
