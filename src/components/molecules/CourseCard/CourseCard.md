```js
import { GlobalThemeProvider } from "../../../theme/provider";
import { ThemeTester } from "../../../styleguide";
import { Title } from "../../atoms/Typography/Title";
import img1 from "./CourseCard.png";
import img2 from "./CourseCard-2.png";
import img3 from "./CourseCard-3.png";
import img4 from "./CourseCard-4.png";
import backgroundImage1 from "./bgImage1.png";
import backgroundImage2 from "./bgImage2.png";
import { Row, Col } from "react-grid-system";
import { ResponsiveImage } from "../../organisms/ResponsiveImage/ResponsiveImage";
import {
  Badge,
  BreadCrumbs,
  Link,
  Button,
  IconText,
  IconTitle,
} from "../../..";

import Image from "@escolalms/sdk/lib/react/components/Image";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

const Icon1 = () => (
  <svg viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5013 19.1668H9.83464C10.0556 19.1668 10.2676 19.079 10.4239 18.9228C10.5802 18.7665 10.668 18.5545 10.668 18.3335V8.3335C10.668 8.11248 10.5802 7.90052 10.4239 7.74424C10.2676 7.58796 10.0556 7.50016 9.83464 7.50016H1.5013C1.28029 7.50016 1.06833 7.58796 0.912046 7.74424C0.755766 7.90052 0.667969 8.11248 0.667969 8.3335V18.3335C0.667969 18.5545 0.755766 18.7665 0.912046 18.9228C1.06833 19.079 1.28029 19.1668 1.5013 19.1668ZM2.33464 9.16683H9.0013V17.5002H2.33464V9.16683ZM12.3346 15.0002V5.8335H4.83464C4.61362 5.8335 4.40166 5.7457 4.24538 5.58942C4.0891 5.43314 4.0013 5.22118 4.0013 5.00016C4.0013 4.77915 4.0891 4.56719 4.24538 4.41091C4.40166 4.25463 4.61362 4.16683 4.83464 4.16683H13.168C13.389 4.16683 13.6009 4.25463 13.7572 4.41091C13.9135 4.56719 14.0013 4.77915 14.0013 5.00016V15.0002C14.0013 15.2212 13.9135 15.4331 13.7572 15.5894C13.6009 15.7457 13.389 15.8335 13.168 15.8335C12.947 15.8335 12.735 15.7457 12.5787 15.5894C12.4224 15.4331 12.3346 15.2212 12.3346 15.0002ZM17.3346 1.66683V12.5002C17.3346 12.7212 17.2468 12.9331 17.0906 13.0894C16.9343 13.2457 16.7223 13.3335 16.5013 13.3335C16.2803 13.3335 16.0683 13.2457 15.912 13.0894C15.7558 12.9331 15.668 12.7212 15.668 12.5002V2.50016H8.16797C7.94696 2.50016 7.73499 2.41237 7.57871 2.25609C7.42243 2.0998 7.33464 1.88784 7.33464 1.66683C7.33464 1.44582 7.42243 1.23385 7.57871 1.07757C7.73499 0.921293 7.94696 0.833496 8.16797 0.833496H16.5013C16.7223 0.833496 16.9343 0.921293 17.0906 1.07757C17.2468 1.23385 17.3346 1.44582 17.3346 1.66683Z" />
  </svg>
);

<GlobalThemeProvider>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Row>
        <Col>
          <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
            <CourseCard
              id={1}
              image={
                <Link to={`#`}>
                  <ResponsiveImage
                    path={"course/74/images/tlologistyka1.png"}
                    srcSizes={[500, 750, 1000]}
                  />
                </Link>
              }
              tags={
                <React.Fragment>
                  <Badge
                    onClick={(e) => console.log("onTag click")}
                    color={"#ff0000"}
                  >
                    Bestseller
                  </Badge>
                  <Badge color={"#6d6d6d"}>New</Badge>
                </React.Fragment>
              }
              subtitle={<a href="#!!!">100% online</a>}
              title={
                <a href="#!!!">
                  <Title level={4} as="h2" className="title">
                    Best course ever
                  </Title>
                </a>
              }
              categories={
                <BreadCrumbs
                  hyphen="/"
                  items={[
                    <a href="#!!!!">Wellms</a>,
                    <Link>courses</Link>,
                    "super course",
                    "lesson XXX",
                  ]}
                />
              }
              actions={
                <React.Fragment>
                  <Button
                    mode="secondary"
                    onClick={() => console.log("onButton Click")}
                  >
                    Click me
                  </Button>
                  <Link onClick={() => console.log("onButton 2 Click")}>
                    Click me as well
                  </Link>
                </React.Fragment>
              }
              footer={
                <React.Fragment>
                  <IconText icon={<Icon1 />} text="666 USers" />{" "}
                  <IconText icon={<Icon1 />} text="666 Lessons" />
                </React.Fragment>
              }
            />
          </EscolaLMSContextProvider>
        </Col>
        <Col xs={6}>
          <CourseCard
            id={1}
            image={{
              path: backgroundImage1,
              alt: "Man sitting on the chair",
            }}
            tags={[
              {
                title: "Bestseller",
                id: 1,
              },
            ]}
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
        </Col>
      </Row>
    </div>
    <div style={{ width: "100%" }}>
      <Row>
        <Col
          xs={6}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CourseCard
            id={2}
            image={{
              path: backgroundImage2,
              alt: "Girl sitting on the chair",
            }}
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
            title={"Best course ever with a couple of lines"}
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
        <Col
          xs={6}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CourseCard
            id={3}
            image={{
              path: backgroundImage2,
              alt: "Girl sitting on the chair",
            }}
            subtitle={"100% Online"}
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
            title={
              "Best course ever with a couple of lines and long title should be truncated with a dots"
            }
            onTagClick={(tagId) => console.log("onTagClick :", { tagId })}
            onButtonClick={(cardId) =>
              console.log("onButtonClick :", { cardId })
            }
            onSecondaryButtonClick={() => console.log("onSecondaryButtonClick")}
            secondaryButtonText={"Link to course"}
            buttonText={"Buy now"}
            onImageClick={() => console.log("onImageClick")}
          />
        </Col>
        <Col
          xs={6}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CourseCard
            id={4}
            image={{
              path: backgroundImage2,
              alt: "Girl sitting on the chair",
            }}
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
    </div>
  </ThemeTester>
</GlobalThemeProvider>;
```
