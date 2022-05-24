```js
import ThemeTester from "../../../styleguide/ThemeTester";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Notifications.png";
import Notifications from "./Notifications";

<React.Fragment>
  <ThemeTester>
    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <Notifications
        notifications={[
          {
            id: "324241",
            unread: true,
            title: "Ostatni dzwonek na szkolenie BHP",
            description:
              "Już za tydzień upływa termin szkolenia BHP przy produkcji Big Mac Vege.",
            dateTime: new Date(),
          },
          {
            id: "324244",
            unread: false,
            title: "Masz do zrobienia kurs BHP",
            description:
              "Kursu BHP przy produkcji Big Mac Vege. Pamiętaj, że kurs jest obowiązkowy. Termin ukończenia upływa 31 marca 2022",
            dateTime: new Date(Date.now() - 86400000),
          },
        ]}
        showAllLink="/"
      />
    </div>
    <ImageModal images={[img1]} />
  </ThemeTester>
</React.Fragment>;
```
