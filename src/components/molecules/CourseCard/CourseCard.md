```js
import { GlobalThemeProvider } from "../../../theme/provider";
import ThemeTester from "../../../styleguide/ThemeTester";
import ImageModal from "../../../styleguide/ImageModal";
import img1 from "./CourseCard.png";
import img2 from "./CourseCard-2.png";
import img3 from "./CourseCard-3.png";
import img4 from "./CourseCard-4.png";
import backgroundImage1 from "./bgImage1.png";
import backgroundImage2 from "./bgImage2.png";
import { Row, Col } from "react-grid-system";

<GlobalThemeProvider>
  <ThemeTester childrenListStyle={{ display: "block" }}>
    <Row>
      <Col xs={6}>
        <CourseCard
          id={1}
          image={{
            path: backgroundImage1,
          }}
          tags={[
            {
              title: "Bestseller",
              id: 1,
            },
          ]}
          lessonsCount={1}
          subtitle={"100% Online"}
          title={"Best course ever"}
          categories={["Programming", "Front-end"]}
          onTagClick={(tagId) => console.log({ tagId })}
          onImageClick={() => console.log("Image click")}
          onButtonClick={(cardId) => console.log({ cardId })}
        />
      </Col>
      <Col xs={6}>
        <CourseCard
          id={2}
          image={{
            path: backgroundImage2,
          }}
          lessonsCount={3}
          tags={[
            {
              title: "Bestseller",
              id: 1,
            },
            {
              title: "Best Price",
              id: 2,
            },
          ]}
          title={"Best course ever"}
          categories={["Programming", "Front-end"]}
          onImageClick={() => console.log("Image click")}
          onTagClick={(tagId) => console.log({ tagId })}
          progress={{
            currentProgress: 0.43,
            maxProgress: 1,
          }}
        />
      </Col>
    </Row>
  </ThemeTester>
  <ImageModal images={[img1, img2, img3, img4]} />
</GlobalThemeProvider>;
```
