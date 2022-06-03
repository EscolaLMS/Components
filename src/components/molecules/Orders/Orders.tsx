import React, { ReactNode, useMemo } from "react";
import styled, { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";

interface OrdersProps extends React.InputHTMLAttributes<HTMLTableElement> {
  mobile?: boolean;
  data: {
    title: ReactNode;
    date: string;
    price: string;
    actions?: ReactNode;
  }[];
}

const StyledTable = styled("table")<{ mobile: boolean }>`
  width: 100%;
`;

export const Orders: React.FC<OrdersProps> = (props) => {
  const { data, mobile = false } = props;

  const { t } = useTranslation();

  const hasActions = useMemo(() => {
    return data.some((record) => !!record.actions);
  }, [data]);

  return (
    <StyledTable mobile={mobile}>
      {data.length === 0 && (
        <tbody className="empty">
          <tr>
            <td>{t<string>("Orders.noRecords")}</td>
          </tr>
        </tbody>
      )}
      {data.length > 0 && (
        <React.Fragment>
          <thead>
            <th>
              <td>{t<string>("Orders.title")}</td>
            </th>
            <th>
              <td>{t<string>("Orders.date")}</td>
            </th>
            <th>
              <td>{t<string>("Orders.price")}</td>
            </th>
            {hasActions && (
              <th>
                <td>{t<string>("Orders.actions")}</td>
              </th>
            )}
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record.title?.toString()}>
                <td>{record.title}</td>
                <td>{record.date}</td>
                <td>{record.price}</td>
                {record.actions && <td>{record.actions}</td>}
              </tr>
            ))}
          </tbody>
        </React.Fragment>
      )}
    </StyledTable>
  );
};

export default withTheme(styled(Orders)<OrdersProps>``);
