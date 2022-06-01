```js
import { ImageModal, ThemeTester } from "../../../styleguide";
import { Badge, CourseCard } from "../../../";

import img2 from "./../CourseCard/CourseCard-2.png";
import img3 from "./../CourseCard/CourseCard-3.png";
import img4 from "./../CourseCard/CourseCard-4.png";
import backgroundImage1 from "./../CourseCard/bgImage1.png";
import backgroundImage2 from "./../CourseCard/bgImage2.png";

import img1 from "./ImageBubble.png";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <div style={{ width: 600 }}>
      <ImageBubble
        image={{
          src: "https://placekitten.com/g/600/600",
          alt: "the kitten",
        }}
        header={
          <div style={{ textAlign: "right" }}>
            <Badge>Bestseller</Badge>
          </div>
        }
      >
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
            onButtonClick={(cardId) =>
              console.log("onButtonClick :", { cardId })
            }
          />
      </ImageBubble>
    </div>
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
