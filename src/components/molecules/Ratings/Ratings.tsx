import * as React from "react";
import { ReactNode, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { roundPercentageList } from "../../../utils/utils";
import { Interval } from "../../atoms/Interval/Interval";
import { Rating } from "../../atoms/Rating/Rating";
import { Text } from "../../atoms/Typography/Text";
import { Title } from "../../atoms/Typography/Title";
interface Rates {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}
interface StyledRatings {
  mobile?: boolean;
}

export interface RatingsProps extends StyledRatings {
  header?: ReactNode;
  sumRates: number;
  avgRate: number;
  rates: Rates;
}

interface RatingsViewProps extends RatingsProps {
  renderRateWithInterval: () => JSX.Element[];
}

const StyledRatingsDesktop = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .ratings-container {
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .header {
    margin-bottom: 20px;
  }
  .title {
    color: ${({ theme }) => theme.primaryColor};
  }
  .average-rate-container {
    background: ${(props) =>
      props.theme.mode !== "dark" ? props.theme.gray5 : props.theme.gray2};
    padding: 24px 34px;
    text-align: center;
    border-radius: ${(props) =>
      props.theme.mode !== "dark" ? "10px" : "20px"};
  }
  .average-rate-label {
    font-size: 14px;
    margin: 3px 0 0;
  }
  .rate-with-interval-container {
    flex: 1;
    padding-left: 27px;
  }
  .rate-row {
    display: flex;
    align-items: center;
  }
  .interval {
    flex: 1;
    padding-right: 20px;
  }
`;

const RatingsDesktop: React.FC<RatingsViewProps> = (props) => {
  const { avgRate, header, renderRateWithInterval } = props;

  const { t } = useTranslation();
  return (
    <StyledRatingsDesktop>
      {header && (
        <Title className="header" level={4}>
          {header}
        </Title>
      )}
      <div className="ratings-container">
        <div className="average-rate-container">
          <Title className="title" level={1}>
            {avgRate}
          </Title>
          <Rating ratingValue={avgRate} />
          <Text className="average-rate-label">
            {t("Ratings.averageRateLabel")}
          </Text>
        </div>
        <div className="rate-with-interval-container">
          {renderRateWithInterval()}
        </div>
      </div>
    </StyledRatingsDesktop>
  );
};

const StyledRatingsMobile = styled.div`
  .header {
    margin-bottom: 14px;
  }
  .title {
    color: ${({ theme }) => theme.primaryColor};
  }
  .rate-row {
    display: flex;
    align-items: center;
    padding-right: 20px;
  }
  .interval {
    flex: 1;
    padding-right: 20px;
  }
  .average-rate-container {
    display: flex;
    align-items: center;
    background: ${(props) =>
      props.theme.mode !== "dark" ? props.theme.gray5 : props.theme.gray2};
    padding: 15px 20px;
    border-radius: ${(props) =>
      props.theme.mode !== "dark" ? "10px" : "20px"};
    > div {
      padding-left: 20px;
    }
  }
  .average-rate-label {
    margin-bottom: 0;
    font-size: 14px;
  }
`;

const RatingsMobile: React.FC<RatingsViewProps> = (props) => {
  const { avgRate, header, renderRateWithInterval } = props;

  const { t } = useTranslation();

  return (
    <StyledRatingsMobile>
      {header && (
        <Title className="header" level={4}>
          {header}
        </Title>
      )}
      <div className="average-rate-container">
        <Title className="title" level={1}>
          {avgRate}
        </Title>
        <div>
          <Rating ratingValue={avgRate} />
          <Text className="average-rate-label">
            {t("Ratings.averageRateLabel")}
          </Text>
        </div>
      </div>
      <div className="rate-with-interval-container">
        {renderRateWithInterval()}
      </div>
    </StyledRatingsMobile>
  );
};

export const Ratings: React.FC<RatingsProps> = (props) => {
  const { avgRate, rates, sumRates } = props;

  const renderRateWithInterval = useCallback(() => {
    const percentagesValues = Object.keys(rates)
      .sort()
      .map((rateKey: string) => {
        const rate = rates[`${rateKey}` as keyof Rates & string];
        if (rate === 0) {
          return 0;
        }
        return (rate / sumRates) * 100;
      });

    return roundPercentageList(percentagesValues)
      .map((rate: number, index: number) => {
        return (
          <div className="rate-row">
            <div className="interval">
              <Interval current={rate} max={100} />
            </div>
            <Rating label={`${rate}%`} ratingValue={index + 1} />
          </div>
        );
      })
      .reverse();
  }, [rates, avgRate]);

  return props.mobile ? (
    <RatingsMobile {...props} renderRateWithInterval={renderRateWithInterval} />
  ) : (
    <RatingsDesktop
      {...props}
      renderRateWithInterval={renderRateWithInterval}
    />
  );
};
