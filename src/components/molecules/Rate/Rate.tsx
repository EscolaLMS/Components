import * as React from "react";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ExtendableStyledComponent } from "types/component";
import { Button } from "../../atoms/Button/Button";
import { Rating } from "../../atoms/Rating/Rating";
import { Text } from "../../atoms/Typography/Text";
import { Title } from "../../atoms/Typography/Title";

interface Props extends ExtendableStyledComponent {
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
    header = "Rate.Header",
    submitLabel = "Rate.submitButton",
    onSubmit,
    className = "",
  } = props;

  const [selectedRate, setSelectedRate] = useState<number>(0);
  const [hoverRate, setHoverRate] = useState<number | undefined>();

  const selectInfoText = useMemo(() => {
    if (hoverRate) {
      return t(`Rate.Select${hoverRate}`);
    }
    if (selectedRate === 0) {
      return t("Rate.Select");
    }
    return t(`Rate.Select${selectedRate}`);
  }, [selectedRate, hoverRate]);

  return (
    <StyledRate className={`wellms-component ${className}`}>
      <Title className="title" level={4}>
        {t(header)}
      </Title>
      <Text className="selected-info">{selectInfoText}</Text>
      <Rating
        ratingValue={hoverRate ? hoverRate : selectedRate}
        size={"33px"}
        onRateClick={(rate: number) => {
          setHoverRate(undefined);
          setSelectedRate(rate);
        }}
        onIconEnter={setHoverRate}
        onIconLeave={() => {
          setHoverRate(undefined);
        }}
      />
      <div className="submit-container">
        <Button
          mode="secondary"
          onClick={() => onSubmit(selectedRate)}
          disabled={selectedRate === 0}
        >
          {t(submitLabel)}
        </Button>
      </div>
    </StyledRate>
  );
};
