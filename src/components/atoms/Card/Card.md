```js
import ThemeTester from "../../../styleguide/ThemeTester";
import { Title } from "../Typography/Title";
import { Text } from "../Typography/Text";
import { IconTitle } from "../IconTitle/IconTitle";
import { Button } from "../Button/Button";
import { useState } from "react";
import { CourseCard } from "../../molecules/CourseCard/CourseCard";

<React.Fragment>
  <ThemeTester flexDirection="column">
    <Card wings={"large"}>
      <Text noMargin>With large wings</Text>
    </Card>
    <Card wings={"small"}>
      <Text noMargin>With small Wings</Text>
    </Card>
    <Card wings={"hidden"}>
      <Text noMargin>Without Wings</Text>
    </Card>
    <Card wings={"large"} inline>
      <Text size="14" noMargin>
        Inline with large wings
      </Text>
    </Card>
    <Card wings={"small"} inline>
      <Text size="14" noMargin>
        Inline with small Wings
      </Text>
    </Card>
    <Card wings={"hidden"} inline>
      <Text size="14" noMargin>
        Inline without Wings
      </Text>
    </Card>
    <div style={{ width: 600 }}>
      <CourseCard
        id={1}
        tags={[
          {
            title: "Bestseller",
            id: 1,
          },
        ]}
        subtitle={"100% Online"}
        title={
          <Title level={4} as="h2" className="title">
            Best course ever
          </Title>
        }
        hideImage
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
        onButtonClick={(cardId) => console.log("onButtonClick :", { cardId })}
      />
    </div>
  </ThemeTester>
</React.Fragment>;
```
