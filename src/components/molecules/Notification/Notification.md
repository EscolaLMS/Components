```js
import ThemeTester from "../../../styleguide/ThemeTester";
import img from "./Notification.png";
import Notification from "./Notification";

<React.Fragment>
  <ThemeTester>
    <Notification
      notification={{
        id: "324241",
        unread: true,
        title: "Ostatni dzwonek na szkolenie BHP",
        description:
          "Już za tydzień upływa termin szkolenia BHP przy produkcji Big Mac Vege.",
        dateTime: new Date(),
      }}
      onClick={() => console.log("click")}
      maxLengthDesc={60}
    />
  </ThemeTester>
</React.Fragment>;
```
