import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Row, Col } from "react-grid-system";
import { Button } from "../../atoms/Button/Button";
import { ReactNode } from "react";
import { ExtendableStyledComponent } from "types/component";

interface StyledBannerProps {
  mobile?: boolean;
  background?: React.CSSProperties["background"];
  reverse?: boolean;
}

export interface BannerProps
  extends StyledBannerProps,
    ExtendableStyledComponent {
  title: ReactNode;
  btnText: string;
  asset: ReactNode;
  handleBtn: () => void;
}

const StyledBanner = styled("div")<StyledBannerProps>`
  background: ${(props) => props.background};

  .banner-btn {
    margin-top: ${(props) => (props.mobile ? "22px" : "52px")};
  }

  .banner-text h1 {
    font-weight: normal;
  }
`;

export const Banner: React.FC<BannerProps> = (props) => {
  const {
    title,
    asset,
    btnText,
    handleBtn,
    background,
    reverse = false,
    mobile = false,
    className = "",
  } = props;

  return (
    <StyledBanner
      className={`wellms-component ${className}`}
      mobile={mobile}
      background={background}
    >
      <Row
        align={"center"}
        direction={reverse ? "row-reverse" : mobile ? "column-reverse" : "row"}
      >
        <Col
          xs={12}
          md={mobile ? 12 : 6}
          className={"banner-text"}
          style={{
            marginTop: mobile ? "20px" : "0",
          }}
        >
          {React.isValidElement(title) && (
            <React.Fragment>{title}</React.Fragment>
          )}
          <Button
            mode={"primary"}
            className={"banner-btn"}
            onClick={handleBtn}
            block={mobile}
          >
            {btnText}
          </Button>
        </Col>
        <Col
          xs={12}
          md={mobile ? 12 : 6}
          style={{
            textAlign: mobile ? "center" : "left",
          }}
        >
          {React.isValidElement(asset) && (
            <React.Fragment>{asset}</React.Fragment>
          )}
        </Col>
      </Row>
    </StyledBanner>
  );
};

export default withTheme(styled(Banner)<BannerProps>``);
