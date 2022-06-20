import React, { ReactNode, useMemo } from "react";
import styled, { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { Text } from "../../atoms/Typography/Text";

interface OrdersProps extends React.InputHTMLAttributes<HTMLTableElement> {
  mobile?: boolean;
  data: {
    title: ReactNode;
    date: string;
    price: string;
    actions?: ReactNode;
  }[];
}

const StyledOrders = styled("div")<{ mobile: boolean }>`
  .labels-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px 12px 40px;
    .single-label {
      &:first-of-type {
        flex: 0 0 40%;
        max-width: 40%;
      }
      &:nth-of-type(2),
      &:nth-of-type(3) {
        flex: 0 0 15%;
        max-width: 15%;
      }
      &:last-of-type {
        flex: 0 0 20%;
        max-width: 20%;
      }
    }
  }
`;

const SingleOrderCard = styled("div")<{ mobile: boolean }>`
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? "column" : "row")};
  width: 100%;
  justify-content: ${({ mobile }) => (mobile ? "flex-start" : "space-between")};
  align-items: ${({ mobile }) => (mobile ? "flex-start" : "center")};
  margin-bottom: 10px;
  padding: ${({ mobile }) => (mobile ? "20px 15px" : "12px 40px")};
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? theme.cardBackgroundColorLight
      : theme.cardBackgroundColorDark};
  .single-content {
    &:not(:last-child) {
      margin-bottom: ${({ mobile }) => (mobile ? "15px" : 0)};
    }
    &:first-of-type {
      flex: ${({ mobile }) => (mobile ? "0 0 100%" : "0 0 40%")};
      max-width: ${({ mobile }) => (mobile ? "100%" : "40%")};
    }
    &:nth-of-type(2),
    &:nth-of-type(3) {
      flex: ${({ mobile }) => (mobile ? "0 0 100%" : "0 0 15%")};
      max-width: ${({ mobile }) => (mobile ? "100%" : "15%")};
    }
    &:last-of-type {
      flex: ${({ mobile }) => (mobile ? "0 0 100%" : "0 0 20%")};
      max-width: ${({ mobile }) => (mobile ? "100%" : "20%")};
    }
  }
`;

export const Orders: React.FC<OrdersProps> = (props) => {
  const { data, mobile = false } = props;

  const { t } = useTranslation();

  const hasActions = useMemo(() => {
    return data.some((record) => !!record.actions);
  }, [data]);

  return (
    <StyledOrders mobile={mobile}>
      {data.length === 0 && <Text>{t<string>("Orders.noRecords")}</Text>}
      {data.length > 0 && (
        <React.Fragment>
          {!mobile && (
            <div className="labels-row">
              <div className="single-label">{t<string>("Orders.title")}</div>
              <div className="single-label">{t<string>("Orders.date")}</div>
              <div className="single-label">{t<string>("Orders.price")}</div>
              {hasActions && (
                <div className="single-label">
                  {t<string>("Orders.actions")}
                </div>
              )}
            </div>
          )}
          {data.map((record, i) => (
            <SingleOrderCard mobile={mobile} key={i}>
              <div className="single-content">{record.title}</div>
              <div className="single-content">{record.date}</div>
              <div className="single-content">{record.price}</div>
              {hasActions && (
                <div className="single-content">{record.actions}</div>
              )}
            </SingleOrderCard>
          ))}
        </React.Fragment>
      )}
    </StyledOrders>
  );
};

export default withTheme(styled(Orders)<OrdersProps>``);
