import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Title } from "../../atoms/Typography/Title";
import { Col, Row } from "react-grid-system";
import { ReactNode } from "react";
import { IconText } from "../../atoms/IconText/IconText";

interface CheckoutImgProps {
  src: string;
  alt: string;
  title: string;
}

interface CheckoutSummaryProps {
  type: string;
  text: string;
}

export interface CheckoutCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  img: CheckoutImgProps | ReactNode;
  subtitle?: ReactNode;
  summary?: CheckoutSummaryProps[];
  price: string;
  oldPrice?: string;
  handleDelete: () => void;
}

const StyledCheckoutCard = styled("div")<CheckoutCardProps>`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.theme.mode == "light" ? props.theme.gray4 : props.theme.gray1};

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .checkout-card-discount {
    color: ${({ theme }) => theme.primaryColor};
    text-decoration: line-through;
  }

  .checkout-card-top {
    border-bottom: 1px solid ${({ theme }) => theme.gray3};
  }

  .checkout-card-remove {
    margin-left: 40px;
    cursor: pointer;
  }

  .checkout-card-summary {
    padding-top: 20px;
    display: flex;
    border-top: 1px solid ${({ theme }) => theme.gray3};
  }

  .checkout-card-img {
    background-color: ${({ theme }) => theme.white};

    img {
      max-width: 100%;
      height: auto;
    }
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

const IconBadge = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1286 1.09126C17.0605 0.986549 16.9674 0.900492 16.8576 0.840899C16.7479 0.781307 16.625 0.750066 16.5001 0.750011H12.0001C11.8607 0.749946 11.7241 0.788719 11.6055 0.861978C11.487 0.935238 11.3911 1.04009 11.3288 1.16476L9.00009 5.82301L6.67509 1.16476C6.61251 1.03951 6.51612 0.934287 6.39683 0.860988C6.27753 0.78769 6.14011 0.749247 6.00009 0.750011H1.5001C1.37514 0.749995 1.25216 0.781201 1.14233 0.840792C1.0325 0.900384 0.939293 0.986473 0.871188 1.09124C0.803083 1.196 0.762233 1.31613 0.75235 1.44069C0.742467 1.56526 0.763863 1.69032 0.814595 1.80451L4.30435 9.66676C3.94042 10.3907 3.75063 11.1897 3.7501 12C3.7501 13.3924 4.30322 14.7278 5.28778 15.7123C6.27235 16.6969 7.60771 17.25 9.00009 17.25C10.3925 17.25 11.7278 16.6969 12.7124 15.7123C13.697 14.7278 14.2501 13.3924 14.2501 12C14.2496 11.1897 14.0598 10.3907 13.6958 9.66676L17.1856 1.80451C17.2363 1.69029 17.2576 1.56521 17.2476 1.44065C17.2377 1.31609 17.1968 1.19599 17.1286 1.09126ZM2.6536 2.25001H5.53659L7.85184 6.88051C6.89733 7.09573 6.02208 7.57376 5.3251 8.26051L2.6536 2.25001ZM9.00009 15.75C8.25841 15.75 7.53339 15.5301 6.91671 15.118C6.30002 14.706 5.81938 14.1203 5.53555 13.4351C5.25172 12.7499 5.17746 11.9959 5.32215 11.2684C5.46685 10.541 5.824 9.87281 6.34844 9.34836C6.87289 8.82391 7.54108 8.46676 8.26851 8.32207C8.99593 8.17737 9.74993 8.25163 10.4352 8.53546C11.1204 8.81929 11.7061 9.29994 12.1181 9.91662C12.5302 10.5333 12.7501 11.2583 12.7501 12C12.7489 12.9942 12.3534 13.9473 11.6504 14.6503C10.9474 15.3534 9.99429 15.7488 9.00009 15.75ZM12.6788 8.26051C11.9808 7.57315 11.1042 7.09508 10.1483 6.88051L12.4636 2.25001H15.3466L12.6788 8.26051ZM11.2501 11.469L9.99984 12.5003L10.3906 14.25L9.00009 13.2503L7.60959 14.25L8.00034 12.5003L6.75009 11.469L8.25009 11.25L9.00009 9.75001L9.75009 11.25L11.2501 11.469Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

const IconStar = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00002 0.875C8.2841 0.875 8.5438 1.0355 8.67084 1.28959L10.605 5.15795L14.858 5.77656C15.1405 5.81765 15.3751 6.01552 15.4633 6.28699C15.5515 6.55847 15.478 6.85648 15.2736 7.05575L12.1783 10.0737L12.8746 14.3289C12.9206 14.6101 12.8032 14.8931 12.5717 15.0593C12.3403 15.2255 12.0346 15.2461 11.7829 15.1125L8.00002 13.1053L4.21718 15.1125C3.96546 15.2461 3.65979 15.2255 3.4283 15.0593C3.1968 14.8931 3.07947 14.6101 3.12549 14.3289L3.82179 10.0737L0.726447 7.05575C0.522068 6.85648 0.448522 6.55847 0.536727 6.28699C0.624932 6.01552 0.859594 5.81765 1.14207 5.77656L5.39502 5.15795L7.3292 1.28959C7.45625 1.0355 7.71594 0.875 8.00002 0.875ZM8.00002 3.30205L6.56147 6.17916C6.45171 6.39868 6.24148 6.55061 5.9986 6.58594L2.86131 7.04227L5.1486 9.27238C5.32386 9.44326 5.40471 9.68892 5.36518 9.93049L4.85003 13.0786L7.64849 11.5937C7.86833 11.4771 8.13172 11.4771 8.35156 11.5937L11.15 13.0786L10.6349 9.93049C10.5953 9.68892 10.6762 9.44326 10.8514 9.27238L13.1387 7.04227L10.0014 6.58594C9.75856 6.55061 9.54834 6.39868 9.43858 6.17916L8.00002 3.30205Z"
        fill="#FF9549"
      />
    </svg>
  );
};

export const CheckoutCard: React.FC<CheckoutCardProps> = (props) => {
  const { img, summary, subtitle, oldPrice, price, title, handleDelete } =
    props;

  const summaryIcon = (type: string) => {
    switch (type) {
      case "satisfaction":
        return <IconBadge />;
      case "guarantee":
        return <IconBadge />;
      default:
        return <IconStar />;
    }
  };

  return (
    <StyledCheckoutCard {...props}>
      <Row align={"center"}>
        <Col xs={12} md={2}>
          <div className="checkout-card-img">
            {React.isValidElement(img) ? (
              <React.Fragment>{img}</React.Fragment>
            ) : (
              <img
                src={(img as CheckoutImgProps).src}
                alt={(img as CheckoutImgProps).alt}
                title={(img as CheckoutImgProps).title}
              />
            )}
          </div>
        </Col>
        <Col xs={12} md={10}>
          <Row>
            <Col xs={12} md={6}>
              <Title as={"h4"} level={4} style={{ marginBottom: "10px" }}>
                {title}
              </Title>
              {subtitle && <IconText icon={<IconBook />} text={"5 lekcji"} />}
            </Col>
            <Col xs={12} md={6}>
              <div
                style={{
                  display: "flex",
                  textAlign: "right",
                  justifyContent: "flex-end",
                }}
              >
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
                <div className={"checkout-card-remove"} onClick={handleDelete}>
                  <IconBin />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {summary && (
                <div className={"checkout-card-summary"}>
                  {summary.map((item, index) => (
                    <IconText
                      icon={summaryIcon(item.type)}
                      text={item.text}
                      key={index}
                      style={{
                        marginBottom: 0,
                        marginRight: index === summary.length - 1 ? 0 : "25px",
                      }}
                    ></IconText>
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
