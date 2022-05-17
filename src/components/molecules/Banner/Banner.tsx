import * as React from "react";
import ReactMarkdown from "react-markdown";
import styled, { withTheme } from "styled-components";
import { Row, Col } from "react-grid-system";
import { Title } from "../../atoms/Typography/Title";
import { Button } from "../../atoms/Button/Button";

interface StyledBannerProps {
  mobile?: boolean;
  background?: React.CSSProperties["background"];
}

interface BannerImgProps {
  src: string;
  alt: string;
}

export interface BannerProps extends StyledBannerProps {
  title: string;
  btnText: string;
  img: BannerImgProps | React.ReactElement;
  handleBtn: () => void;
}

const StyledBanner = styled("div")<StyledBannerProps>`
  background: ${(props) => props.background};

  .banner-btn {
    margin-top: ${(props) => (props.mobile ? "22px" : "52px")};
  }

  .banner-img {
    max-width: ${(props) => (props.mobile ? "80%" : "100%")};
    margin: ${(props) => (props.mobile ? "0 auto" : "0")};
    height: auto;
  }
`;

export const Banner: React.FC<BannerProps> = (props) => {
  const { title, img, btnText, handleBtn, mobile = false } = props;

  return (
    <StyledBanner {...props}>
      <Row align={"center"} direction={mobile ? "column-reverse" : "row"}>
        <Col xs={12} md={mobile ? 12 : 6}>
          <Title
            level={1}
            as={"h1"}
            mobile={mobile}
            style={{ fontWeight: "normal" }}
          >
            <ReactMarkdown
              components={{ p: React.Fragment }}
              children={title}
            />
          </Title>
          <Button className={"banner-btn"} onClick={handleBtn}>
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
          {React.isValidElement(img) ? (
            <React.Fragment>{img}</React.Fragment>
          ) : (
            <img
              className={"banner-img"}
              src={(img as BannerImgProps).src}
              alt={(img as BannerImgProps).alt}
            />
          )}
        </Col>
      </Row>
    </StyledBanner>
  );
};

const NewBanner = styled(Banner)<BannerProps>``;

export default withTheme(NewBanner);
