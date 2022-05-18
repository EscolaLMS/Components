import * as React from "react";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "../../atoms/Button/Button";
import { Rating } from "../../atoms/Rating/Rating";
import { Text } from "../../atoms/Typography/Text";
import { Title } from "../../atoms/Typography/Title";

interface Props {
  submitLabel?: string;
  header?: string;
  onSubmit: (rate: number) => void;
}

const StyledRate = styled.div`
  text-align: center;
  .title {
    ${(props) => {
      if (props.theme.mode !== "dark") {
        return `
        color: ${props.theme.primaryColor};
      `;
      }
    }}
  }
  .selected-info {
    margin: 30px 0;
    font-size: 14px;
  }
  .submit-container {
    margin-top: 44px;
  }
`;

export const Rate: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    header = "rate.header",
    submitLabel = "rate.submit.button",
    onSubmit,
  } = props;

  const [rate, setRate] = useState<number>(0);

  const selectInfoText = useMemo(() => {
    if (rate === 0) {
      return t("rate.select");
    }
    return t(`rate.select.${rate}`);
  }, [rate]);

  return (
    <StyledRate>
      <Title className="title" level={4}>
        {t(header)}
      </Title>
      <Text className="selected-info">{selectInfoText}</Text>
      <Rating ratingValue={rate} size={"33px"} onRateClick={setRate} />
      <div className="submit-container">
        <Button
          mode="secondary"
          onClick={() => onSubmit(rate)}
          disabled={rate === 0}
        >
          {t(submitLabel)}
        </Button>
      </div>
    </StyledRate>
  );
};
