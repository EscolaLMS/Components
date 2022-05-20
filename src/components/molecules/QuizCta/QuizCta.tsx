import * as React from "react";
import styled, { ThemeContext, withTheme } from "styled-components";
import { Col, Row } from "react-grid-system";
import { Title } from "../../atoms/Typography/Title";
import { Link } from "../../atoms/Link/Link";
import { Button } from "../../atoms/Button/Button";
import { ReactNode } from "react";
import { contrast } from "chroma-js";

interface StyledQuizCtaCardProps {
  mobile?: boolean;
  lightContrast?: boolean;
}

export interface QuizCtaCardProps extends StyledQuizCtaCardProps {
  title: ReactNode;
  children: ReactNode;
  primaryButtonText: ReactNode;
  onPrimaryButtonClick: () => void;
  secondaryButtonText?: ReactNode;
  onSecondaryButtonClick?: () => void;
}

const StyledQuizCta = styled("div")<StyledQuizCtaCardProps>`
  padding: ${(props) => (props.mobile ? "22px" : "55px 45px")};
  background-color: ${(props) => props.theme.primaryColor};
  border-radius: ${(props) => props.theme.cardRadius}px;

  *:not(button) {
    color: ${(props) =>
      props.theme.theme === "custom"
        ? props.lightContrast
          ? props.theme.white
          : props.theme.gray1
        : props.theme.white};
  }

  .quiz-cta-icon {
    margin-right: ${(props) => (props.mobile ? "12px" : "23px")};

    svg {
      width: ${(props) => (props.mobile ? "31px" : "48px")};
      height: ${(props) => (props.mobile ? "31px" : "48px")};

      path {
        fill: currentColor;
      }
    }
  }

  .quiz-cta-btn-group {
    margin: ${(props) => (props.mobile ? "21px -8px 0;" : "0 -8px;")};
    width: calc(100% + 16px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    > * {
      margin: 8px;
    }

    a {
      margin-left: auto;
      margin-right: auto;

      &:after {
        background-color: currentColor;
      }
    }
  }

  .quiz-cta-children {
    p:not(:last-child) {
      margin-bottom: ${(props) => (props.mobile ? "5px" : "14px")};
    }
  }
`;

const CloudIcon = () => {
  return (
    <svg
      width="48"
      height="46"
      viewBox="0 0 48 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.0024 24.0835C36.4338 24.0835 35.8662 24.1321 35.3059 24.2287C34.9405 23.5951 34.5223 22.9935 34.0557 22.4303C36.9871 20.9571 40.2216 20.1877 43.5024 20.1835C44.077 20.1835 44.6281 19.9552 45.0345 19.5489C45.4408 19.1426 45.669 18.5915 45.669 18.0168C45.669 17.4422 45.4408 16.8911 45.0345 16.4848C44.6281 16.0784 44.077 15.8502 43.5024 15.8502C38.9476 15.8483 34.476 17.0695 30.5544 19.3862C28.571 18.2098 26.3083 17.5873 24.0024 17.5835C21.6994 17.5948 19.4404 18.2156 17.4551 19.3828C15.4697 20.5499 13.8288 22.2219 12.6989 24.2287C12.1548 24.1367 11.604 24.0896 11.0522 24.0878C14.1665 18.1852 18.8366 13.2474 24.5567 9.80929C30.2768 6.37121 36.8286 4.56402 43.5024 4.5835C44.077 4.5835 44.6281 4.35523 45.0345 3.9489C45.4408 3.54257 45.669 2.99147 45.669 2.41684C45.669 1.8422 45.4408 1.2911 45.0345 0.884773C44.6281 0.478444 44.077 0.250171 43.5024 0.250171C35.3703 0.226642 27.4157 2.62706 20.6541 7.14497C13.8924 11.6629 8.63058 18.0933 5.54021 25.6153C3.48466 26.8101 1.88086 28.6498 0.977611 30.8491C0.0743659 33.0483 -0.0778231 35.4842 0.544655 37.7788C1.16713 40.0734 2.52948 42.0985 4.42034 43.5398C6.3112 44.9811 8.62486 45.758 11.0024 45.7502H37.0024C39.8756 45.7502 42.6311 44.6088 44.6627 42.5772C46.6944 40.5455 47.8357 37.79 47.8357 34.9168C47.8357 32.0437 46.6944 29.2882 44.6627 27.2565C42.6311 25.2249 39.8756 24.0835 37.0024 24.0835ZM37.0024 41.4168H11.0024C9.27847 41.4168 7.62517 40.732 6.40619 39.513C5.1872 38.294 4.50238 36.6407 4.50238 34.9168C4.50238 33.1929 5.1872 31.5396 6.40619 30.3206C7.62517 29.1017 9.27847 28.4168 11.0024 28.4168C11.7425 28.4262 12.4755 28.5633 13.169 28.822C13.7029 29.0119 14.29 28.9852 14.8043 28.7474C15.3187 28.5097 15.7195 28.0799 15.9207 27.5502C16.5315 25.8989 17.6335 24.4743 19.0784 23.4682C20.5233 22.4621 22.2417 21.9227 24.0024 21.9227C25.763 21.9227 27.4815 22.4621 28.9263 23.4682C30.3712 24.4743 31.4732 25.8989 32.084 27.5502C32.2853 28.0799 32.6861 28.5097 33.2004 28.7474C33.7148 28.9852 34.3018 29.0119 34.8357 28.822C35.5292 28.5633 36.2622 28.4262 37.0024 28.4168C38.7263 28.4168 40.3796 29.1017 41.5986 30.3206C42.8176 31.5396 43.5024 33.1929 43.5024 34.9168C43.5024 36.6407 42.8176 38.294 41.5986 39.513C40.3796 40.732 38.7263 41.4168 37.0024 41.4168Z"
        fill="white"
      />
    </svg>
  );
};

export const QuizCta: React.FC<QuizCtaCardProps> = (props) => {
  const {
    title,
    children,
    primaryButtonText,
    onPrimaryButtonClick,
    secondaryButtonText,
    onSecondaryButtonClick,
    mobile = false,
  } = props;

  const theme = React.useContext(ThemeContext);

  const cts = React.useMemo(() => {
    return contrast("#fff", theme.primaryColor) >= 4.5;
  }, [theme.primaryColor]);

  return (
    <StyledQuizCta mobile={mobile} lightContrast={cts}>
      <Row align={"center"}>
        <Col
          xs={12}
          md={mobile ? 12 : 7}
          style={{
            display: "flex",
            alignItems: mobile ? "center" : "flex-start",
            marginBottom: mobile ? "22px" : "0",
          }}
        >
          <div className="quiz-cta-icon">
            <CloudIcon />
          </div>
          <div>
            <Title
              as={"h3"}
              level={mobile ? 4 : 3}
              style={{
                marginBottom: mobile ? "0" : "18px",
              }}
            >
              {title}
            </Title>
            <div className="quiz-cta-children">
              {children && !mobile && (
                <React.Fragment>{children}</React.Fragment>
              )}
            </div>
          </div>
        </Col>
        <Col xs={12} md={mobile ? 12 : 5}>
          <div className="quiz-cta-children">
            {children && mobile && <React.Fragment>{children}</React.Fragment>}
          </div>
          <div className="quiz-cta-btn-group">
            <Button mode="white" onClick={onPrimaryButtonClick}>
              {primaryButtonText}
            </Button>
            {secondaryButtonText && onSecondaryButtonClick && (
              <Link
                href="http://onet.pl"
                target="_blank"
                underline
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </StyledQuizCta>
  );
};

const NewQuizCta = styled(QuizCta)<QuizCtaCardProps>``;

export default withTheme(NewQuizCta);
