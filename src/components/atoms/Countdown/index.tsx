import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Row, Text } from "../../../";

interface Props {
  targetDate: string | Date;
  onCountdownEnd?: () => void;
}

const Wrapper = styled(Row)`
  width: 115px;
  padding: 12px;
  border-radius: 12px;

  border: 1px solid ${({ theme }) => theme.primaryColor};

  picture {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const formatNumber = (num: number): string => {
  if (Number.isNaN(num) || num <= 0) {
    return "00";
  }

  return `${num}`.padStart(2, "0");
};

const getReturnValues = (countDown: number): [string, string, string] => {
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [formatNumber(hours), formatNumber(minutes), formatNumber(seconds)];
};

function useCountdown(
  targetDate: string | Date,
  onCountdownEnd?: () => void
): [string, string, string] {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );
  // to prevent infinite loop
  const countdownEndCb = useRef(onCountdownEnd);

  useEffect(() => {
    if (countDown <= 0) {
      countdownEndCb.current?.();
      return;
    }

    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate, countDown]);

  return getReturnValues(countDown);
}

export const Countdown: React.FC<Props> = ({ targetDate, onCountdownEnd }) => {
  const [hours, minutes, seconds] = useCountdown(targetDate, onCountdownEnd);

  return (
    <Wrapper
      data-testid={`countdown-${targetDate}`}
      $alignItems="center"
      $justifyContent="space-between"
    >
      <Text family="secondary" size="sm">
        {hours}:{minutes}:{seconds}
      </Text>
    </Wrapper>
  );
};
