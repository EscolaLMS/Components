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
          lessonCount={1}
          subtitle={"100% Online"}
          title={"Best course ever"}
          hideImage
          categories={{
            onCategoryClick: (id) => console.log("Category click id: ", id),
            categoryElements: [
              { id: 1, name: "Programming" },
              { id: 2, name: "Front-end" },
            ],
          }}
          onTagClick={(tagId) => console.log("onTagClick :", { tagId })}
          onImageClick={() => console.log("onImageClick")}
          onButtonClick={(cardId) => console.log("onButtonClick :", { cardId })}
        />
      </Col>
      <Col xs={6}>
        <CourseCard
          id={2}
          image={{
            path: backgroundImage2,
          }}
          lessonCount={3}
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
          categories={{
            onCategoryClick: (id) => {
              console.log("Category click id: ", id);
            },
            categoryElements: [
              { id: 1, name: "Programming" },
              { id: 2, name: "Front-end" },
            ],
          }}
          onTagClick={(tagId) => console.log("onTagClick :", { tagId })}
          onImageClick={() => console.log("onImageClick")}
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
