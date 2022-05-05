React component example:

### Default themes

```js
import themes from "../../../theme";
import { DefaultTheme, ThemeProvider } from "styled-components";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./Title.png";
import Title from "./Title";
import ThemeTester from "../../../styleguide/ThemeTester";

<React.Fragment>
  <ThemeTester>
    <Title> Title</Title>
    <Text>
      To przecież nie koniec świata! Ciężka sprawa, bo nasze dizajny niestety są
      bez polotu – jak zwykle, więc trzeba dobrze stargetować ten kejs.
      Potrzebny będzie refresz dizajnu i to ASAP, bo klient odrzucił wszystkie
      ajdije, także to chyba jakiś faken dżołk. Generalnie wszystko okej, ale
      będziemy robić nowy iwent, dlatego działaj keżualnie.
    </Text>
    <Text>
      Chyba nie bardzo identyfikujecie się z misją naszej firmy, także macie
      teraz zakaz wychodzenia na kawkę w czasie mitingów. Na szczęście poszedł
      sajnof na tym rilisie, więc sprawa jest jasna: o naszym timie będzie teraz
      głośno. Straszny szejm, bo musimy acziwnąć ten czelendż, więc idziemy na
      mały korytarzowy fokus. Fakap na całej linii: zredżektowali nam te zmiany,
      ale co tam – nie płacą nam za nadgodziny. Tak czy inaczej, szykują się
      nadgodziny. Jes! Uwaga, szybki fokus! Zapomnij o przerwie na lancz – znowu
      zmienili hasła do drukarek, więc do roboty!{" "}
    </Text>
    <Text noMargin={true}>
      Nie wszystko musi być z sensem. W mailu, który Ci zaraz forwardnę,
      napisali, że mamy opóźnienia w projekcie, więc nie ma się co śmiać - mamy
      kola z biznesem o 15:00. Nic nie robicie, tylko siedzicie cały dzień i
      puszczacie bąki w fotele. Dizajn musi urywać dupę, ale zbliża się dedlajn,
      dlatego potrzebny będzie fokus na konkretny target.
    </Text>
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
