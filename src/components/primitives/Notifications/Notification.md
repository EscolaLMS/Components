```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ImageModal from "../../../styleguide/ImageModal";
import img2 from "./Notifications-2.png";
import Notification from "./Notification";

<GlobalThemeProvider>
  <Notification
    notification={{
      id: "324241",
      unread: true,
      title: "Ostatni dzwonek na szkolenie BHP",
      description:
        "Już za tydzień upływa termin szkolenia BHP przy produkcji Big Mac Vege.",
      date_time: new Date(),
    }}
    onClick={() => console.log("click")}
    maxLengthDesc={60}
  />
  <ImageModal images={[img2]} />
</GlobalThemeProvider>;
```
