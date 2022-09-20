import * as React from "react";
import { ReactNode, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { Text } from "../../atoms/Typography/Text";
import { Title } from "../../../";
import chroma from "chroma-js";
import { MarkdownRenderer } from "../../molecules/MarkdownRenderer/MarkdownRenderer";

const ArrowOpenIcon: React.FC = () => {
  return (
    <svg
      className="arrows"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ArrowClosedIcon: React.FC = () => {
  return (
    <svg
      className="arrows"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"
        fill="currentColor"
      />
    </svg>
  );
};

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
        fill="currentColor"
      />
    </svg>
  );
};

declare type DiscountStatus = "error" | "granted";

interface StyledCartCardProps {
  mobile?: boolean;
}

interface Discount {
  onDiscountClick: (discountValue: string) => void;
  onDeleteDiscountClick: (id: number) => void;
  status?: DiscountStatus;
  isOpen?: boolean;
}

interface CartCardProps extends StyledCartCardProps {
  id: number;
  title: string;
  subtitle?: ReactNode;
  onBuyClick: (id: number) => void;
  description?: ReactNode;
  discount?: Discount;
  loading?: boolean;
}

const StyledCardCard = styled.div<StyledCartCardProps>`
  border-radius: ${(props) => props.theme.cardRadius}px;
  box-shadow: ${({ mobile }) => mobile && "0px -2px 15px 0px #0000001A;"};
  background: ${({ theme, mobile }) =>
    mobile
      ? theme.mode === "light"
        ? theme.backgroundLight
        : theme.backgroundDark
      : theme.mode === "light"
      ? theme.cardBackgroundColorDark
      : theme.cardBackgroundColorLight};
  padding: ${(props) => (props.mobile ? "15px" : "40px")};

  .title {
    font-size: ${(props) => (props.mobile ? "16px" : "30px")};
    margin-bottom: ${(props) => (props.mobile ? "10px" : "20px")};
    font-weight: 700;
  }

  .buy-button {
    margin-bottom: ${(props) => (props.mobile ? "8px" : "23px")};
  }

  .separator {
    height: 1px;
    width: 24px;
    background: ${(props) =>
      props.theme.mode !== "dark" ? props.theme.gray1 : props.theme.white};
    margin: 20px 0 14px 0;
  }
  .open-discount-state-container {
    margin-left: 24px;
  }
  .discount-form-container {
    margin-top: 17px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  .discount-toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .discount-granted-info {
    margin-bottom: 23px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: pre-wrap;
  }
  .discount-remove {
    display: flex;
    margin-left: 12px;
    cursor: pointer;
  }
  .granted-info {
    margin-left: 12px;
    color: #27ae60;
    font-size: 12px;
  }

  .cart-card-subtitle {
    margin-bottom: ${(props) => (props.mobile ? "10px" : "20px")};
    padding-bottom: ${(props) => (props.mobile ? "6px" : "0")};
    border-bottom: ${({ theme, mobile }) =>
      `2px solid ${
        mobile
          ? theme.mode === "light"
            ? chroma(theme.backgroundLight).darken(0.2).hex()
            : theme.gray2
          : "transparent"
      }`};
  }
`;

export const CartCard: React.FC<CartCardProps> = (props) => {
  const {
    id,
    title,
    subtitle,
    onBuyClick,
    description,
    discount,
    loading,
    mobile = false,
  } = props;
  const { t } = useTranslation();

  const initialDiscountOpen = useMemo(() => {
    if (discount) {
      return discount.isOpen ? discount.isOpen : false;
    }
    return false;
  }, [discount]);

  const [isDiscountOpen, setIsDiscountOpen] =
    useState<boolean>(initialDiscountOpen);
  const [discountInput, setDiscountInput] = useState<string>("");

  const removeDiscountClick = () => {
    if (discount) {
      setDiscountInput("");
      discount.onDeleteDiscountClick(id);
    }
  };

  return (
    <StyledCardCard className="wellms-component" mobile={mobile}>
      {!mobile && <Text className="title">{title}</Text>}
      <div className={"cart-card-subtitle"}>{subtitle}</div>
      <div
        style={{
          display: "flex",
        }}
      >
        {mobile && (
          <Title
            level={4}
            style={{
              marginRight: 42,
            }}
          >
            {title}
          </Title>
        )}
        <div
          style={{
            flex: 1,
            textAlign: mobile ? "center" : "left",
          }}
        >
          <Button
            mode="secondary"
            block
            className="buy-button"
            loading={loading}
            onClick={() => onBuyClick(id)}
          >
            {t<string>("CartCard.buyButton")}
          </Button>
          {!mobile && discount && (
            <>
              {discount.status === "granted" && (
                <>
                  <Text className="discount-granted-info">
                    <MarkdownRenderer components={{ p: React.Fragment }}>
                      {t<string>("CartCard.discountGranted")}
                    </MarkdownRenderer>
                    <span
                      className={"discount-remove"}
                      onClick={removeDiscountClick}
                      onKeyUp={removeDiscountClick}
                      role="button"
                      aria-label={t<string>("CartCard.remove")}
                      tabIndex={0}
                    >
                      <IconBin />
                    </span>
                  </Text>
                </>
              )}
            </>
          )}
          {description}
        </div>
      </div>
      {!mobile && discount && discount.status !== "granted" && (
        <>
          <div className="separator"></div>
          <div
            className="discount-toggle"
            onClick={() => setIsDiscountOpen(!isDiscountOpen)}
            onKeyUp={() => setIsDiscountOpen(!isDiscountOpen)}
            role="button"
            aria-label={t<string>("CartCard.addDiscountButton")}
            tabIndex={0}
          >
            <Text size={"12"} noMargin>
              {t<string>("CartCard.addDiscountButton")}
            </Text>
            <Button
              mode={"icon"}
              className="open-discount-state-container"
              aria-label={t<string>(
                isDiscountOpen ? "Actions.Hide" : "Actions.Show"
              )}
            >
              {isDiscountOpen ? <ArrowOpenIcon /> : <ArrowClosedIcon />}{" "}
            </Button>
          </div>
          {isDiscountOpen && (
            <div className="discount-form-container">
              <Input
                type="text"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
                error={
                  discount.status === "error" && t("CartCard.discountError")
                }
                disabled={loading}
              />
              {discountInput.length !== 0 && (
                <Button
                  mode="outline"
                  block
                  loading={loading}
                  onClick={() => discount.onDiscountClick(discountInput)}
                >
                  {t<string>("CartCard.realizeButton")}
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </StyledCardCard>
  );
};
