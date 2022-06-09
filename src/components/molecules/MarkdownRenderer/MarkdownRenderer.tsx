import * as React from "react";
import styled, { withTheme } from "styled-components";
import ReactMarkdown from "react-markdown";
import { getFontFromTheme } from "../../../theme/provider";
import { setFontSizeByHeaderLevel } from "../../../utils/components/primitives/titleUtils";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

interface StyledMarkdownRendererProps {
  mobile?: boolean;
}

export interface MarkdownRendererProps
  extends ReactMarkdownOptions,
    StyledMarkdownRendererProps {}

const StyledMarkdownRenderer = styled("div")<StyledMarkdownRendererProps>`
  color: ${({ theme }) => (theme.mode !== "light" ? theme.white : "#111")};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-size: 14px;
  line-height: 1.55em;

  h1 {
    font-size: ${(props) => setFontSizeByHeaderLevel(1, props.mobile)};
  }

  h2 {
    font-size: ${(props) => setFontSizeByHeaderLevel(2, props.mobile)};
  }

  h3 {
    font-size: ${(props) => setFontSizeByHeaderLevel(3, props.mobile)};
  }

  h4 {
    font-size: ${setFontSizeByHeaderLevel(4)};
  }

  h5 {
    font-size: ${setFontSizeByHeaderLevel(5)};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0;
    font-weight: bold;
    line-height: 125%;
    color: ${({ theme }) =>
      theme.mode !== "light" ? theme.white : theme.gray1};

    &:first-child {
      margin-top: 0;
    }
  }

  strong,
  b {
    font-weight: bold;
  }
`;

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
  const { mobile = false } = props;

  return (
    <StyledMarkdownRenderer mobile={mobile}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} {...props} />
    </StyledMarkdownRenderer>
  );
};

export default withTheme(styled(MarkdownRenderer)<MarkdownRendererProps>``);
