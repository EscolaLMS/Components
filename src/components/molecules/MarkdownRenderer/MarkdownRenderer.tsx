import * as React from "react";
import styled, { withTheme } from "styled-components";
import ReactMarkdown from "react-markdown";
import { getFontFromTheme } from "../../../theme/provider";
import { setFontSizeByHeaderLevel } from "../../../utils/components/primitives/titleUtils";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { fixContentForMarkdown } from "../../../utils/components/markdown";
import Lightbox from "react-image-lightbox";
import { useState } from "react";

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

  .table-responsive {
    td,
    tr,
    th {
      border: 1px solid
        ${({ theme }) => (theme.mode === "dark" ? theme.gray1 : theme.gray3)};
      padding: 5px 10px;
    }
    table {
      border: 1px solid
        ${({ theme }) => (theme.mode === "dark" ? theme.gray1 : theme.gray3)};
      border-collapse: collapse;
    }
  }
`;

export const MarkdownImage: React.ComponentType<
  React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement>
> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => setIsOpen(true)}
      onKeyDown={() => setIsOpen(true)}
      role="button"
      tabIndex={-1}
    >
      <img src={props.src} alt={props.alt} style={{ cursor: "pointer" }} />
      {isOpen && props.src && (
        <Lightbox mainSrc={props.src} onCloseRequest={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export const MarkdownTable: React.ComponentType<
  React.TableHTMLAttributes<HTMLTableElement>
> = (props) => {
  return (
    <div className="table-responsive">
      <table className={`table ${props.className || ""}`} {...props}>
        {props.children}
      </table>
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
  const { mobile = false, children } = props;

  return (
    <StyledMarkdownRenderer mobile={mobile}>
      <ReactMarkdown
        linkTarget="_blank"
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          img: (props) => {
            return <MarkdownImage {...props} />;
          },
          table: (props) => {
            return <MarkdownTable {...props} />;
          },
        }}
        {...props}
      >
        {fixContentForMarkdown(children)}
      </ReactMarkdown>
    </StyledMarkdownRenderer>
  );
};

export default withTheme(styled(MarkdownRenderer)<MarkdownRendererProps>``);
