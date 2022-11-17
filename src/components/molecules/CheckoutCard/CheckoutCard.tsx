import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Title } from "../../atoms/Typography/Title";
import { Col, Row } from "react-grid-system";
import { ReactNode } from "react";
import { IconText } from "../../atoms/IconText/IconText";
import { RatioBox } from "../../atoms/RatioBox/RatioBox";
import { Button } from "../../atoms/Button/Button";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { t } from "i18next";
import { ExtendableStyledComponent } from "types/component";

interface StyledCheckoutCardProps {
  mobile?: boolean;
}

interface CheckoutImgProps {
  src: string;
  alt: string;
}

export interface CheckoutCardProps
  extends StyledCheckoutCardProps,
    ExtendableStyledComponent {
  title: ReactNode;
  img: CheckoutImgProps | ReactNode;
  subtitle?: ReactNode;
  summary?: ReactNode[];
  price: string;
  oldPrice?: string;
  handleDelete: () => void;
}

const StyledCheckoutCard = styled("div")<StyledCheckoutCardProps>`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.cardRadius}px;
  background-color: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__cardBackgroundColor,
      theme.cardBackgroundColor
    )};

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .checkout-card-discount {
    color: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
    text-decoration: line-through;
  }

  .checkout-card-top {
    border-bottom: 1px solid ${({ theme }) => theme.gray3};
  }

  .checkout-card-remove {
    margin-left: 40px;
  }

  .checkout-card-summary {
    padding-top: 20px;
    display: flex;
    border-top: 1px solid ${({ theme }) => theme.gray3};
  }

  svg {
    path {
      fill: currentColor;
    }

    &.icon-primary {
      path {
        fill: ${({ theme }) =>
          getStylesBasedOnTheme(
            theme.mode,
            theme.dm__primaryColor,
            theme.primaryColor,
            theme.primaryColor
          )};
      }
    }

    &.icon-stroke {
      path {
        stroke: currentColor;
        fill: none;
      }
    }
  }

  .checkout-card-img {
    width: ${(props) => (props.mobile ? "45px" : "100%")};
    margin-right: ${(props) => (props.mobile ? "15px" : "0")};
    flex-shrink: 0;

    svg {
      fill: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.white, theme.gray2)};
    }

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .checkout-card-summary-item {
    margin-right: ${(props) => (props.mobile ? "10px" : "25px")};
  }
`;

const IconBin = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2C5 0.89543 5.89543 0 7 0H13C14.1046 0 15 0.895431 15 2V4H16.9897C16.9959 3.99994 17.0021 3.99994 17.0083 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H17.9311L17.0638 18.1425C16.989 19.1891 16.1182 20 15.0689 20H4.93112C3.88184 20 3.01096 19.1891 2.9362 18.1425L2.06888 6H1C0.447715 6 0 5.55228 0 5C0 4.44772 0.447715 4 1 4H2.99174C2.99795 3.99994 3.00414 3.99994 3.01032 4H5V2ZM7 4H13V2H7V4ZM4.07398 6L4.93112 18H15.0689L15.926 6H4.07398ZM8 8C8.55228 8 9 8.44772 9 9V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V9C7 8.44772 7.44772 8 8 8ZM12 8C12.5523 8 13 8.44772 13 9V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V9C11 8.44772 11.4477 8 12 8Z"
        fill="#6D6D6D"
      />
    </svg>
  );
};

const IconBook = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={"icon-stroke"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 2.25H6C6.79565 2.25 7.55871 2.56607 8.12132 3.12868C8.68393 3.69129 9 4.45435 9 5.25V15.75C9 15.1533 8.76295 14.581 8.34099 14.159C7.91903 13.7371 7.34674 13.5 6.75 13.5H1.5V2.25Z"
        stroke="#4F4F4F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 2.25H12C11.2044 2.25 10.4413 2.56607 9.87868 3.12868C9.31607 3.69129 9 4.45435 9 5.25V15.75C9 15.1533 9.23705 14.581 9.65901 14.159C10.081 13.7371 10.6533 13.5 11.25 13.5H16.5V2.25Z"
        stroke="#4F4F4F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CheckoutCard: React.FC<CheckoutCardProps> = (props) => {
  const {
    title,
    img,
    summary,
    subtitle,
    oldPrice,
    price,
    handleDelete,
    mobile = false,
    className = "",
  } = props;

  const thumbnail = () => {
    return (
      <div className={`wellms-component checkout-card-img ${className}`}>
        {React.isValidElement(img) ? (
          <React.Fragment>{img}</React.Fragment>
        ) : (
          <RatioBox ratio={1}>
            <img
              src={(img as CheckoutImgProps).src}
              alt={(img as CheckoutImgProps).alt}
            />
          </RatioBox>
        )}
      </div>
    );
  };

  return (
    <StyledCheckoutCard className="wellms-component" mobile={mobile}>
      <Row align={"center"}>
        {!mobile && (
          <Col xs={12} md={2}>
            {thumbnail()}
          </Col>
        )}
        <Col xs={12} md={mobile ? 12 : 10}>
          <Row>
            <Col xs={12} md={mobile ? 10 : 6}>
              <div style={{ display: "flex", alignItems: "start" }}>
                {mobile && thumbnail()}
                <Title
                  as={"h4"}
                  level={4}
                  style={{ marginBottom: mobile ? "23px" : "10px" }}
                >
                  {title}
                </Title>
              </div>
              {subtitle && (
                <IconText
                  icon={<IconBook />}
                  className={`checkout-card-subtitle`}
                  text={"5 lekcji"}
                  styles={{
                    icon: {
                      display: mobile ? "none" : "",
                    },
                  }}
                />
              )}
            </Col>
            <Col xs={12} md={mobile ? 2 : 6}>
              <div
                style={{
                  display: "flex",
                  textAlign: "right",
                  justifyContent: "flex-end",
                }}
              >
                {!mobile && (
                  <div>
                    {oldPrice && (
                      <Title
                        as={"h5"}
                        level={5}
                        className={"checkout-card-discount"}
                      >
                        {oldPrice}
                      </Title>
                    )}
                    <Title as={"h4"} level={4}>
                      {price}
                    </Title>
                  </div>
                )}
                <div>
                  <Button
                    mode={"icon"}
                    className={"checkout-card-remove"}
                    onClick={handleDelete}
                    onKeyDown={(e) => e.key === "Enter" && handleDelete()}
                    aria-label={t<string>("Actions.Remove")}
                  >
                    <IconBin />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {summary && (
                <div className={"checkout-card-summary"}>
                  {summary.map((item, index) => (
                    <div className={"checkout-card-summary-item"} key={index}>
                      <React.Fragment>{item}</React.Fragment>
                    </div>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledCheckoutCard>
  );
};

const NewCheckoutCard = styled(CheckoutCard)<CheckoutCardProps>``;

export default withTheme(NewCheckoutCard);
