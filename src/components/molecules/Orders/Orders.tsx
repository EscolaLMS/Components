import React, { ReactNode, useMemo } from "react";
import styled, { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { Text } from "../../atoms/Typography/Text";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

interface OrdersProps
  extends React.InputHTMLAttributes<HTMLTableElement>,
    ExtendableStyledComponent {
  mobile?: boolean;
  data: {
    status: ReactNode;
    title: ReactNode;
    date: ReactNode;
    price: ReactNode;
    actions?: ReactNode;
  }[];
}

const StyledOrders = styled("div")<{ mobile: boolean }>`
  .labels-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0px 12px 0px;
    .single-label {
      &:first-of-type {
        flex: 0 0 25%;
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
  padding: ${({ mobile }) => (mobile ? "20px 0px" : "12px 0px")};
  background: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__cardBackgroundColor,
      theme.cardBackgroundColor
    )};
  .single-content {
    &:not(:last-child) {
      margin-bottom: ${({ mobile }) => (mobile ? "15px" : 0)};
    }
    &:first-of-type {
      flex: ${({ mobile }) => (mobile ? "0 0 100%" : "0 0 25%")};
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
  const { data, mobile = false, className = "" } = props;

  const { t } = useTranslation();

  const hasActions = useMemo(() => {
    return data.some((record) => !!record.actions);
  }, [data]);

  return (
    <StyledOrders className={`wellms-component ${className}`} mobile={mobile}>
      {data.length === 0 && <Text>{t<string>("Orders.NoRecords")}</Text>}
      {data.length > 0 && (
        <React.Fragment>
          {!mobile && (
            <div className="labels-row">
              <div className="single-label">
                <Text size={"14"}>{t<string>("Orders.Title")}</Text>
              </div>{" "}
              <div className="single-label">
                <Text size={"14"}>{t<string>("Orders.Status")}</Text>
              </div>
              <div className="single-label">
                <Text size={"14"}>{t<string>("Orders.Date")}</Text>
              </div>
              <div className="single-label">
                <Text size={"14"}>{t<string>("Orders.Price")}</Text>
              </div>
              {hasActions && (
                <div className="single-label">
                  <Text size={"14"}>{t<string>("Orders.Actions")}</Text>
                </div>
              )}
            </div>
          )}
          {data.map((record, i) => (
            <SingleOrderCard mobile={mobile} key={i}>
              <div className="single-content">{record.title}</div>
              <div className="single-content">{record.status}</div>
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
