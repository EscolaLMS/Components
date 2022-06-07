```js
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Row, Col } from "react-grid-system";
import { ThemeTester, ImageModal } from "../../../styleguide";
import { IconText, Button, CourseProgress, Link, Text } from "../../..";
import { Title } from "../../atoms/Typography/Title";
import img1 from "./PricingCard.png";

const [progress, setProgress] = useState(0.5);

const IconCamera = () => {
  return (
    <svg
      width="20"
      height="15"
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 1.64492C19.2 1.44492 18.8 1.44492 18.5 1.64492L14.1 4.64492V2.54492C14.1 1.44492 13.2 0.544922 12.1 0.544922H2C0.9 0.544922 0 1.44492 0 2.54492V12.5449C0 13.6449 0.9 14.5449 2 14.5449H12C13.1 14.5449 14 13.6449 14 12.5449V10.4449L18.4 13.4449C18.6 13.5449 18.8 13.6449 19 13.6449C19.2 13.6449 19.3 13.6449 19.5 13.5449C19.8 13.3449 20 13.0449 20 12.6449V2.54492C20 2.14492 19.8 1.84492 19.5 1.64492ZM12 12.5449H2V2.54492H12V6.54492V8.54492V12.5449ZM18 10.6449L14 7.94492V7.04492L18 4.34492V10.6449Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

const IconWin = () => {
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 2.01196H18V1.01196C18 0.746746 17.8946 0.492392 17.7071 0.304856C17.5196 0.11732 17.2652 0.0119629 17 0.0119629H5C4.73478 0.0119629 4.48043 0.11732 4.29289 0.304856C4.10536 0.492392 4 0.746746 4 1.01196V2.01196H1C0.734784 2.01196 0.48043 2.11732 0.292893 2.30486C0.105357 2.49239 0 2.74675 0 3.01196V5.01196C0.00362544 6.20945 0.437419 7.36577 1.22231 8.27016C2.00721 9.17455 3.09095 9.7668 4.276 9.93896C4.64939 11.2333 5.38786 12.3926 6.40301 13.2781C7.41816 14.1636 8.66698 14.7378 10 14.932V17.012H6C5.79004 17.0119 5.58538 17.078 5.41505 17.2007C5.24472 17.3235 5.11735 17.4968 5.051 17.696L4.051 20.696C4.00093 20.8463 3.9873 21.0064 4.01123 21.163C4.03517 21.3196 4.09598 21.4683 4.18866 21.5969C4.28134 21.7254 4.40323 21.83 4.54429 21.9022C4.68536 21.9744 4.84155 22.012 5 22.012H17C17.1584 22.0118 17.3144 21.9741 17.4554 21.9019C17.5963 21.8296 17.7181 21.725 17.8106 21.5965C17.9032 21.468 17.9639 21.3193 17.9878 21.1628C18.0117 21.0062 17.998 20.8462 17.948 20.696L16.948 17.696C16.8817 17.4969 16.7545 17.3238 16.5844 17.201C16.4142 17.0783 16.2098 17.0121 16 17.012H12V14.932C13.333 14.7378 14.5818 14.1636 15.597 13.2781C16.6121 12.3926 17.3506 11.2333 17.724 9.93896C18.9091 9.7668 19.9928 9.17455 20.7777 8.27016C21.5626 7.36577 21.9964 6.20945 22 5.01196V3.01196C22 2.74675 21.8946 2.49239 21.7071 2.30486C21.5196 2.11732 21.2652 2.01196 21 2.01196ZM4 7.84096C3.41549 7.63338 2.90951 7.25006 2.55144 6.74358C2.19338 6.23709 2.00076 5.63224 2 5.01196V4.01196H4V7.84096ZM15.279 19.012L15.612 20.012H6.387L6.721 19.012H15.279ZM16 8.01196C16 9.33805 15.4732 10.6098 14.5355 11.5475C13.5979 12.4852 12.3261 13.012 11 13.012C9.67392 13.012 8.40215 12.4852 7.46447 11.5475C6.52678 10.6098 6 9.33805 6 8.01196V2.01196H16V8.01196ZM20 5.01196C19.9992 5.63224 19.8066 6.23709 19.4486 6.74358C19.0905 7.25006 18.5845 7.63338 18 7.84096V4.01196H20V5.01196ZM9.667 7.67896L8 6.30396L10 6.01196L11 4.01196L12 6.01196L14 6.30396L12.333 7.67896L12.854 10.012L11 8.67896L9.146 10.012L9.667 7.67896Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

const IconDownload = () => {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4.54492C2 4.57046 2.01022 4.7145 2.29209 4.9644C2.57279 5.21327 3.03602 5.48307 3.69427 5.72991C5.0034 6.22084 6.87903 6.54492 9 6.54492C11.121 6.54492 12.9966 6.22084 14.3057 5.72991C14.964 5.48307 15.4272 5.21327 15.7079 4.9644C15.9898 4.7145 16 4.57046 16 4.54492C16 4.51939 15.9898 4.37535 15.7079 4.12545C15.4272 3.87658 14.964 3.60678 14.3057 3.35993C12.9966 2.86901 11.121 2.54492 9 2.54492C6.87903 2.54492 5.0034 2.86901 3.69427 3.35993C3.03602 3.60678 2.57279 3.87658 2.29209 4.12545C2.01022 4.37535 2 4.51939 2 4.54492ZM0 4.54492C0 3.74203 0.437492 3.09686 0.965273 2.62893C1.49422 2.15997 2.20256 1.78332 2.99202 1.48727C4.57833 0.892408 6.70269 0.544922 9 0.544922C11.2973 0.544922 13.4217 0.892408 15.008 1.48727C15.7974 1.78332 16.5058 2.15997 17.0347 2.62893C17.5625 3.09686 18 3.74203 18 4.54492V8.54492V12.5449V16.5449C18 17.3478 17.5625 17.993 17.0347 18.4609C16.5058 18.9299 15.7974 19.3065 15.008 19.6026C13.4217 20.1974 11.2973 20.5449 9 20.5449C6.70269 20.5449 4.57833 20.1974 2.99202 19.6026C2.20256 19.3065 1.49422 18.9299 0.965273 18.4609C0.437492 17.993 0 17.3478 0 16.5449V12.5449V8.54492V4.54492ZM2 8.54492C2 8.57046 2.01022 8.7145 2.29209 8.9644C2.57279 9.21327 3.03602 9.48307 3.69427 9.72991C5.0034 10.2208 6.87903 10.5449 9 10.5449C11.121 10.5449 12.9966 10.2208 14.3057 9.72991C14.964 9.48307 15.4272 9.21327 15.7079 8.9644C15.9898 8.7145 16 8.57046 16 8.54492V7.16111C15.6909 7.32473 15.3574 7.47155 15.008 7.60257C13.4217 8.19744 11.2973 8.54492 9 8.54492C6.70269 8.54492 4.57833 8.19744 2.99202 7.60257C2.64262 7.47155 2.3091 7.32473 2 7.16111V8.54492ZM2 11.1611V12.5449C2 12.5705 2.01022 12.7145 2.29209 12.9644C2.57279 13.2133 3.03602 13.4831 3.69427 13.7299C5.0034 14.2208 6.87903 14.5449 9 14.5449C11.121 14.5449 12.9966 14.2208 14.3057 13.7299C14.964 13.4831 15.4272 13.2133 15.7079 12.9644C15.9898 12.7145 16 12.5705 16 12.5449V11.1611C15.6909 11.3247 15.3574 11.4715 15.008 11.6026C13.4217 12.1974 11.2973 12.5449 9 12.5449C6.70269 12.5449 4.57833 12.1974 2.99202 11.6026C2.64262 11.4715 2.3091 11.3247 2 11.1611ZM2 15.1611V16.5449C2 16.5705 2.01022 16.7145 2.29209 16.9644C2.57279 17.2133 3.03602 17.4831 3.69427 17.7299C5.0034 18.2208 6.87903 18.5449 9 18.5449C11.121 18.5449 12.9966 18.2208 14.3057 17.7299C14.964 17.4831 15.4272 17.2133 15.7079 16.9644C15.9898 16.7145 16 16.5705 16 16.5449V15.1611C15.6909 15.3247 15.3574 15.4715 15.008 15.6026C13.4217 16.1974 11.2973 16.5449 9 16.5449C6.70269 16.5449 4.57833 16.1974 2.99202 15.6026C2.64262 15.4715 2.3091 15.3247 2 15.1611Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

const IconSquares = () => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 2.54492C0 1.44035 0.89543 0.544922 2 0.544922H6C7.10457 0.544922 8 1.44035 8 2.54492V6.54492C8 7.64949 7.10457 8.54492 6 8.54492H2C0.895431 8.54492 0 7.64949 0 6.54492V2.54492ZM6 2.54492H2V6.54492H6V2.54492ZM10 2.54492C10 1.44035 10.8954 0.544922 12 0.544922H16C17.1046 0.544922 18 1.44035 18 2.54492V6.54492C18 7.64949 17.1046 8.54492 16 8.54492H12C10.8954 8.54492 10 7.64949 10 6.54492V2.54492ZM16 2.54492H12V6.54492H16V2.54492ZM0 12.5449C0 11.4404 0.89543 10.5449 2 10.5449H6C7.10457 10.5449 8 11.4404 8 12.5449V16.5449C8 17.6495 7.10457 18.5449 6 18.5449H2C0.895431 18.5449 0 17.6495 0 16.5449V12.5449ZM6 12.5449H2V16.5449H6V12.5449ZM10 12.5449C10 11.4404 10.8954 10.5449 12 10.5449H16C17.1046 10.5449 18 11.4404 18 12.5449V16.5449C18 17.6495 17.1046 18.5449 16 18.5449H12C10.8954 18.5449 10 17.6495 10 16.5449V12.5449ZM16 12.5449H12V16.5449H16V12.5449Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

const IconBadge = () => {
  return (
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 2.54492C0 1.44035 0.89543 0.544922 2 0.544922H14C15.1046 0.544922 16 1.44035 16 2.54492V19.5449C16 19.9195 15.7907 20.2627 15.4576 20.4341C15.1245 20.6055 14.7236 20.5764 14.4188 20.3587L8 15.7738L1.58124 20.3587C1.27642 20.5764 0.875489 20.6055 0.542418 20.4341C0.209347 20.2627 0 19.9195 0 19.5449V2.54492ZM14 2.54492L2 2.54492V17.6017L7.41876 13.7312C7.76646 13.4828 8.23354 13.4828 8.58124 13.7312L14 17.6017V2.54492Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

const IconTime = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2.54492C5.58172 2.54492 2 6.12664 2 10.5449C2 14.9632 5.58172 18.5449 10 18.5449C14.4183 18.5449 18 14.9632 18 10.5449C18 6.12664 14.4183 2.54492 10 2.54492ZM0 10.5449C0 5.02207 4.47715 0.544922 10 0.544922C15.5228 0.544922 20 5.02207 20 10.5449C20 16.0678 15.5228 20.5449 10 20.5449C4.47715 20.5449 0 16.0678 0 10.5449ZM10 4.54492C10.5523 4.54492 11 4.99264 11 5.54492V10.1307L13.7071 12.8378C14.0976 13.2283 14.0976 13.8615 13.7071 14.252C13.3166 14.6426 12.6834 14.6426 12.2929 14.252L9.29289 11.252C9.10536 11.0645 9 10.8101 9 10.5449V5.54492C9 4.99264 9.44771 4.54492 10 4.54492Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

const props = {
  title: "Księgowość dla początkujących",
  price: "99 zł",
  oldPrice: "199 zł",
};

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Row>
        <Col xs={12} md={4}>
          <PricingCard>
            <Title level={4} as={"h4"}>
              {props.title}
            </Title>
            <div className="pricing-card-price">
              <Title level={3} as={"h3"}>
                {props.price}
              </Title>
              <div className="pricing-card-discount">
                <Title level={5} as={"h5"}>
                  {props.oldPrice}
                </Title>
              </div>
            </div>
            <IconText
              icon={<IconTime />}
              text={
                <ReactMarkdown components={{ p: React.Fragment }}>
                  **8h 12 min** time left
                </ReactMarkdown>
              }
            />
            <Button
              mode={"secondary"}
              onClick={() => console.log("Dodaj do koszyka")}
            >
              Dodaj do koszyka
            </Button>
            <Text size={"12"}>Gwarantowane 30 dni na zwrot</Text>
            <div className="pricing-card-features">
              <IconText icon={<IconCamera />} text={"40 godzin video"} />
              <IconText
                icon={<IconDownload />}
                text={"Materiały szkoleniowe do pobrania"}
              />
              <IconText
                icon={<IconSquares />}
                text={"Dostęp na smartphone i tablet"}
              />
              <IconText icon={<IconBadge />} text={"Certyfikat ukończenia"} />
            </div>
            <CourseProgress
              progress={progress}
              icon={<IconWin />}
              title="Moje postepy"
            >
              {true ? (
                <React.Fragment>
                  <Link
                    href="http://onet.pl"
                    target="_blank"
                    underline
                    style={{
                      marginRight: "4px",
                    }}
                  >
                    Zaloguj się
                  </Link>
                  aby widzieć postępy
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <strong style={{ fontSize: 14 }}>
                    Ukończono {Math.round(40 * progress)} z 40 lekcji
                  </strong>
                  <p style={{ marginTop: 9, marginBottom: 0 }}>
                    Ukoncz kurs aby zdobyc certyfikat
                  </p>
                </React.Fragment>
              )}
            </CourseProgress>
          </PricingCard>
        </Col>
        <Col xs={12} md={4}>
          <PricingCard free>
            <Title level={4} as={"h4"}>
              Księgowość dla początkujących
            </Title>
            <div className="pricing-card-price">
              <Title level={3} as={"h3"}>
                0 zł
              </Title>
              <div className="pricing-card-discount">
                <Title level={5} as={"h5"}>
                  za darmo
                </Title>
              </div>
            </div>
            <IconText
              icon={<IconTime />}
              text={
                <ReactMarkdown components={{ p: React.Fragment }}>
                  **8h 12 min** time left
                </ReactMarkdown>
              }
            />
            <Button
              mode={"secondary"}
              onClick={() => console.log("Dodaj do koszyka")}
            >
              Dodaj do koszyka
            </Button>
            <Text size={"12"}>Gwarantowane 30 dni na zwrot</Text>
            <div className="pricing-card-features">
              <IconText icon={<IconCamera />} text={"40 godzin video"} />
              <IconText
                icon={<IconDownload />}
                text={"Materiały szkoleniowe do pobrania"}
              />
              <IconText
                icon={<IconSquares />}
                text={"Dostęp na smartphone i tablet"}
              />
              <IconText icon={<IconBadge />} text={"Certyfikat ukończenia"} />
            </div>
            <CourseProgress
              progress={progress}
              icon={<IconWin />}
              title="Moje postepy"
            >
              {false ? (
                <React.Fragment>
                  <Link
                    href="http://onet.pl"
                    target="_blank"
                    underline
                    style={{
                      marginRight: "4px",
                    }}
                  >
                    Zaloguj się
                  </Link>
                  aby widzieć postępy
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <strong style={{ fontSize: 14 }}>
                    Ukończono {Math.round(40 * progress)} z 40 lekcji
                  </strong>
                  <p style={{ marginTop: 9, marginBottom: 0 }}>
                    Ukoncz kurs aby zdobyc certyfikat
                  </p>
                </React.Fragment>
              )}
            </CourseProgress>
          </PricingCard>
        </Col>
      </Row>
    </div>
    <div style={{ width: 375 }}>
      <PricingCard mobile>
        <Title level={5} as={"h5"}>
          {props.title}
        </Title>
        <div className="pricing-card-footer">
          <div>
            <div className="pricing-card-discount">
              <Title level={5} as={"h5"}>
                {props.oldPrice}
              </Title>
            </div>
            <Title level={4} as={"h4"}>
              {props.price}
            </Title>
          </div>
          <div>
            <Button
              mode={"secondary"}
              block
              onClick={() => console.log("Dodaj do koszyka")}
            >
              Dodaj do koszyka
            </Button>
          </div>
        </div>
      </PricingCard>
    </div>
  </ThemeTester>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
