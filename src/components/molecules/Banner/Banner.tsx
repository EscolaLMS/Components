import * as React from "react";
import ReactMarkdown from "react-markdown";
import styled, { withTheme } from "styled-components";
import { Row, Col } from "react-grid-system";
import { Title } from "../../atoms/Typography/Title";
import { Button } from "../../atoms/Button/Button";

export interface BannerImgProps {
  src: string;
  alt?: string;
  title?: string;
}

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  btnText: string;
  img: BannerImgProps;
  handleBtn: () => void;
  mobile?: boolean;
}

const StyledBanner = styled("div")<BannerProps>`
  .banner-btn {
    margin-top: ${(props) => (props.mobile ? "22px" : "52px")};
  }

  .banner-img {
    max-width: 100%;
    height: 100%;
  }
`;

export const Banner: React.FC<BannerProps> = (props) => {
  const { text, img, btnText, handleBtn, mobile = false } = props;

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
            <ReactMarkdown components={{ p: React.Fragment }} children={text} />
          </Title>
          <Button className={"banner-btn"} onClick={handleBtn}>
            {btnText}
          </Button>
        </Col>
        <Col xs={12} md={mobile ? 12 : 6}>
          <img
            src={img.src}
            alt={img.alt}
            title={img.title}
            className={"banner-img"}
          />
        </Col>
      </Row>
    </StyledBanner>
  );
};

const NewBanner = styled(Banner)<BannerProps>``;

export default withTheme(NewBanner);
