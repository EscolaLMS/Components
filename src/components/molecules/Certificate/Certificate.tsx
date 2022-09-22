import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Title } from "../../atoms/Typography/Title";
import { Text } from "../../atoms/Typography/Text";
import { Link } from "../../atoms/Link/Link";
import { Row, Col } from "react-grid-system";
import { RatioBox } from "../../atoms/RatioBox/RatioBox";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ExtendableStyledComponent } from "types/component";

interface StyledCertificateProps {
  mobile?: boolean;
}

interface CertificateImgProps {
  src: string;
  alt: string;
}

export interface CertificateProps
  extends StyledCertificateProps,
    ExtendableStyledComponent {
  img: CertificateImgProps | ReactNode;
  title?: ReactNode;
  description: ReactNode;
  handleDownload: () => void;
  handleShare: () => void;
}

const StyledCertificate = styled("div")<StyledCertificateProps>`
  .certificate-badge {
    width: 116px;
    flex-shrink: 0;
  }

  .certificate-left-col {
    margin-left: 20px;
  }

  .certificate-right-col {
    ${(props) =>
      props.mobile
        ? `
      margin-top: 23px;
      `
        : `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-left: 1px solid ${
        props.theme.mode === "light" ? props.theme.gray3 : props.theme.white
      };
    `}
  }

  .certificate-right-col-inner {
    ${(props) =>
      props.mobile &&
      `
        padding-left: 34px;
      `}
  }

  .certificate-link {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 24px;
    }

    svg path {
      fill: ${(props) =>
        props.theme.mode === "light" ? props.theme.gray2 : props.theme.white};
    }
  }
`;

const Icon1 = () => {
  return (
    <svg
      width="17"
      height="21"
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.72461 0.343994C9.27689 0.343994 9.72461 0.791709 9.72461 1.34399V11.9298L12.0175 9.63689C12.408 9.24636 13.0412 9.24636 13.4317 9.63689C13.8222 10.0274 13.8222 10.6606 13.4317 11.0511L9.43172 15.0511C9.04119 15.4416 8.40803 15.4416 8.0175 15.0511L4.0175 11.0511C3.62698 10.6606 3.62698 10.0274 4.0175 9.63689C4.40803 9.24636 5.04119 9.24636 5.43172 9.63689L7.72461 11.9298V1.34399C7.72461 0.791709 8.17232 0.343994 8.72461 0.343994ZM1.72461 15.344C2.27689 15.344 2.72461 15.7917 2.72461 16.344V18.344H14.7246V16.344C14.7246 15.7917 15.1723 15.344 15.7246 15.344C16.2769 15.344 16.7246 15.7917 16.7246 16.344V18.344C16.7246 19.4486 15.8292 20.344 14.7246 20.344H2.72461C1.62004 20.344 0.724609 19.4486 0.724609 18.344V16.344C0.724609 15.7917 1.17232 15.344 1.72461 15.344Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

const Icon2 = () => {
  return (
    <svg
      width="17"
      height="21"
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.0175 0.636887C8.40803 0.246363 9.04119 0.246363 9.43172 0.636887L12.4317 3.63689C12.8222 4.02741 12.8222 4.66058 12.4317 5.0511C12.0412 5.44163 11.408 5.44163 11.0175 5.0511L9.72461 3.75821V13.344C9.72461 13.8963 9.27689 14.344 8.72461 14.344C8.17232 14.344 7.72461 13.8963 7.72461 13.344V3.75821L6.43172 5.0511C6.04119 5.44163 5.40803 5.44163 5.0175 5.0511C4.62698 4.66058 4.62698 4.02741 5.0175 3.63689L8.0175 0.636887ZM0.724609 9.34399C0.724609 8.23942 1.62004 7.34399 2.72461 7.34399H4.72461C5.27689 7.34399 5.72461 7.79171 5.72461 8.34399C5.72461 8.89628 5.27689 9.34399 4.72461 9.34399H2.72461V18.344H14.7246V9.34399H12.7246C12.1723 9.34399 11.7246 8.89628 11.7246 8.34399C11.7246 7.79171 12.1723 7.34399 12.7246 7.34399H14.7246C15.8292 7.34399 16.7246 8.23942 16.7246 9.34399V18.344C16.7246 19.4486 15.8292 20.344 14.7246 20.344H2.72461C1.62004 20.344 0.724609 19.4486 0.724609 18.344V9.34399Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

export const Certificate: React.FC<CertificateProps> = (props) => {
  const {
    img,
    title,
    description,
    handleShare,
    handleDownload,
    mobile = false,
    className = "",
  } = props;

  const { t } = useTranslation();

  return (
    <StyledCertificate
      className={`wellms-component ${className}`}
      mobile={mobile}
    >
      <Title level={4} as={"h4"} style={{ marginBottom: "20px" }}>
        {t("Certificate.Title")}
      </Title>
      <Row>
        <Col
          xs={12}
          md={mobile ? 12 : 7}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className={"certificate-badge"}>
            {React.isValidElement(img) ? (
              <React.Fragment>{img}</React.Fragment>
            ) : (
              <RatioBox ratio={1}>
                <img
                  src={(img as CertificateImgProps).src}
                  alt={(img as CertificateImgProps).alt}
                />
              </RatioBox>
            )}
          </div>
          <div className={"certificate-left-col"}>
            {React.isValidElement(title) ? (
              title
            ) : (
              <Title
                level={4}
                as="h4"
                style={{
                  marginBottom: "5px",
                }}
              >
                {title}
              </Title>
            )}
            <Text size={"14"} noMargin={true}>
              {description}
            </Text>
          </div>
        </Col>
        <Col xs={12} md={mobile ? 12 : 5} className={"certificate-right-col"}>
          <div>
            {handleDownload && (
              <div className="certificate-link">
                <Icon1 />
                <Link style={{ marginLeft: "14px" }} onClick={handleDownload}>
                  {t("Certificate.Download")}
                </Link>
              </div>
            )}
            {handleShare && (
              <div className="certificate-link">
                <Icon2 />
                <Link style={{ marginLeft: "14px" }} onClick={handleShare}>
                  {t("Certificate.Share")}
                </Link>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </StyledCertificate>
  );
};

const NewCertificate = styled(Certificate)<CertificateProps>``;

export default withTheme(NewCertificate);
