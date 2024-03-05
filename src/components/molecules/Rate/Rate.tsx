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
  cancelLabel?: string;
  header?: string;
  onSubmit: (rate: number) => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

const StyledRate = styled.div`
  text-align: center;

  .title {
    margin-bottom: 20px;
  }

  .selected-info {
    margin: 6px 0 24px 0;
    font-size: 14px;
  }
  .submit-container {
    display: flex;
    justify-content: center;
    gap: 12px;
    width: 100%;
    margin-top: 37px;
  }
`;

export const Rate: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    header = "Rate.Header",
    submitLabel = "Rate.submitButton",
    cancelLabel = "Rate.cancelButton",
    onSubmit,
    onCancel,
    className = "",
    children,
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
      <Text className="selected-info">{selectInfoText}</Text>
      {children}
      <div className="submit-container">
        <Button mode="white" onClick={onCancel}>
          {t(cancelLabel)}
        </Button>
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
