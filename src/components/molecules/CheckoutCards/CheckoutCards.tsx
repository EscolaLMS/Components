import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Title } from "../../atoms/Typography/Title";
import { Col, Row } from "react-grid-system";
import { ReactNode } from "react";

interface CheckoutOrderProps {
  title: ReactNode;
  subtitle?: ReactNode[];
  summary?: ReactNode[];
  price: string;
  oldPrice?: string;
  satisfaction?: number;
  guarantee?: boolean;
  rating?: number;
  handleDelete: () => void;
}

export interface CheckoutCardsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orders: CheckoutOrderProps[];
}

const StyledCheckoutCard = styled("div")<CheckoutCardsProps>`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.gray5};

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .checkout-card-discount {
    color: ${({ theme }) => theme.primaryColor};
    text-decoration: line-through;
  }

  .checkout-card-remove {
    margin-left: 40px;
    cursor: pointer;
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

export const CheckoutCards: React.FC<CheckoutCardsProps> = (props) => {
  const { orders } = props;

  return (
    <React.Fragment>
      {orders.map(({ handleDelete, oldPrice, price, title }, index) => {
        return (
          <StyledCheckoutCard {...props} key={index}>
            <Row>
              <Col xs={12} md={6}>
                <Title as={"h4"} level={4} style={{ marginBottom: "10px" }}>
                  {title}
                </Title>
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
                  <div
                    className={"checkout-card-remove"}
                    onClick={handleDelete}
                  >
                    <IconBin />
                  </div>
                </div>
              </Col>
            </Row>
          </StyledCheckoutCard>
        );
      })}
    </React.Fragment>
  );
};

const NewCheckoutCard = styled(CheckoutCards)<CheckoutCardsProps>``;

export default withTheme(NewCheckoutCard);
