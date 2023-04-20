import * as React from "react";
import styled, { createGlobalStyle, withTheme } from "styled-components";
import ReactMarkdown from "react-markdown";
import { getFontFromTheme } from "../../../theme/provider";
import { setFontSizeByHeaderLevel } from "../../../utils/components/primitives/titleUtils";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { fixContentForMarkdown } from "../../../utils/components/markdown";
import { Lightbox } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useState } from "react";
import chroma from "chroma-js";
import {
  getStylesBasedOnTheme,
  SharedLightboxStyle,
} from "../../../utils/utils";
import { Link } from "../../../";
import { ExtendableStyledComponent } from "types/component";

interface StyledMarkdownRendererProps {
  mobile?: boolean;
  fontSize?: string;
}

export interface MarkdownRendererProps
  extends ReactMarkdownOptions,
    StyledMarkdownRendererProps,
    ExtendableStyledComponent {}

const pxToEm = (px: string) => {
  const pxNumber = parseFloat(px);
  const emNumber = pxNumber / 14;
  return emNumber.toFixed(2);
};

const StyledMarkdownRenderer = styled("div")<StyledMarkdownRendererProps>`
  color: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.white, "#111")};
  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  font-size: ${(props) => props.fontSize && `${pxToEm(props.fontSize)}em`};
  line-height: 1.55em;

  h1 {
    font-size: ${(props) =>
      `${pxToEm(setFontSizeByHeaderLevel(1, props.mobile))}em`};
  }

  h2 {
    font-size: ${(props) =>
      `${pxToEm(setFontSizeByHeaderLevel(2, props.mobile))}em`};
  }

  h3 {
    font-size: ${(props) =>
      `${pxToEm(setFontSizeByHeaderLevel(3, props.mobile))}em`};
  }

  h4 {
    font-size: ${pxToEm(setFontSizeByHeaderLevel(4))}em;
  }

  h5 {
    font-size: ${pxToEm(setFontSizeByHeaderLevel(5))}em;
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
      getStylesBasedOnTheme(theme.mode, theme.white, theme.gray1)};

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
        ${({ theme }) =>
          getStylesBasedOnTheme(
            theme.mode,
            chroma(theme.white).alpha(0.2).css(),
            theme.gray3
          )};
      padding: 5px 10px;
    }
    table {
      border: 1px solid
        ${({ theme }) =>
          getStylesBasedOnTheme(
            theme.mode,
            chroma(theme.white).alpha(0.2).css(),
            theme.gray3
          )};
      border-collapse: collapse;
    }
  }
`;

const LightBoxOverwrite = createGlobalStyle`
${SharedLightboxStyle}
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
        <>
          <LightBoxOverwrite />
          <Lightbox
            open={isOpen}
            slides={[{ src: props.src }]}
            zoom={{ maxZoomPixelRatio: 4 }}
            plugins={[Zoom]}
            close={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export const MarkdownTable: React.ComponentType<
  React.TableHTMLAttributes<HTMLTableElement>
> = (props) => {
  return (
    <div className="table-responsive">
      <table className={`table ${props.className ?? ""}`} {...props}>
        {props.children}
      </table>
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
  const { mobile = false, fontSize = "16", children, className } = props;

  return (
    <StyledMarkdownRenderer
      className={`wellms-component ${className}`}
      mobile={mobile}
      fontSize={fontSize}
    >
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
          a: (props) => {
            return <Link {...props} />;
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
