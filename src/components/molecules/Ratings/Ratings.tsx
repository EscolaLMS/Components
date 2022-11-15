import * as React from "react";
import { ReactNode, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  getStylesBasedOnTheme,
  roundPercentageList,
} from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";
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

interface RatingsViewProps extends RatingsProps, ExtendableStyledComponent {
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
    color: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
  }
  .average-rate-container {
    background: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__cardBackgroundColor,
        theme.cardBackgroundColor
      )};
    padding: 24px 34px;
    text-align: center;
    border-radius: ${({ theme }) => theme.cardRadius}px;
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
  const { avgRate, header, renderRateWithInterval, className = "" } = props;

  const { t } = useTranslation();
  return (
    <StyledRatingsDesktop className={`wellms-component ${className}`}>
      {header && (
        <Title className="header" level={4} as="h1">
          {header}
        </Title>
      )}
      <div className="ratings-container">
        <div className="average-rate-container">
          <Title className="title" level={1} as="h2">
            {avgRate}
          </Title>
          <Rating ratingValue={avgRate} />
          <Text className="average-rate-label">
            {t<string>("Ratings.averageRateLabel")}
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
    color: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
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
    background: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.cardBackgroundColor,
        theme.dm__cardBackgroundColor
      )};
    padding: 15px 20px;
    border-radius: ${({ theme }) => theme.cardRadius}px;
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
    <StyledRatingsMobile className="wellms-component">
      {header && (
        <Title className="header" level={4} as="h2">
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
            {t<string>("Ratings.averageRateLabel")}
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
          <div className="rate-row" key={index}>
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
