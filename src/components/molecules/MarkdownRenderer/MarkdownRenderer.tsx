import React, { useEffect, useId, useState } from "react";
import styled, { createGlobalStyle, withTheme } from "styled-components";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import chroma from "chroma-js";
import { ExtendableStyledComponent } from "types/component";
import { getFontFromTheme } from "../../../theme/provider";
import { setFontSizeByHeaderLevel } from "../../../utils/components/primitives/titleUtils";
import { fixContentForMarkdown } from "../../../utils/components/markdown";
import {
  getStylesBasedOnTheme,
  SharedLightboxStyle,
} from "../../../utils/utils";
import { Link } from "../../../";

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

  code {
    border-radius: 4px;
    border: 1px solid rgb(232, 235, 237);
    padding: 3px 4px;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    font-size: 85%;
  }

  mark {
    border-radius: 1px;
    background: rgb(171, 255, 50);
    padding: 0.2em;
  }

  blockquote {
    border-left: 3px solid rgb(218, 225, 233);
    margin: 1em 0;
    padding-left: 10px;
    font-style: italic;
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
      width: 100%;
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

  ul,
  ol {
    margin: 1em 0.1em;
    padding: 0px 0px 0px 1em;
  }

  ul.contains-task-list {
    list-style: none;
    padding: 0px;
    margin: 1em 0;
  }
  ul.contains-task-list li {
    display: flex;
  }
  ul.contains-task-list li input {
    pointer-events: initial;
    opacity: 1;
    margin: 3px 0.5em 0px 0px;
    width: 14px;
    height: 14px;
  }
  ul.contains-task-list li:has(input[checked]) {
    color: rgb(78, 92, 110);
    text-decoration: line-through;
  }

  .image {
    text-align: center;
    max-width: 100%;
    clear: both;
  }
  .image-left-50 {
    float: left;
    width: 50%;
    margin-right: 2em;
    margin-bottom: 1em;
    clear: initial;
  }

  .image-right-50 {
    float: right;
    width: 50%;
    margin-left: 2em;
    margin-bottom: 1em;
    clear: initial;
  }

  .image span {
    line-height: 0;
    display: inline-block;
  }

  .image img {
    display: inline-block;
    max-width: 100%;
    max-height: 75vh;
  }
  a {
    color: ${({ theme }) => theme.primaryColor};
    word-break: break-word;
  }
`;

const LightBoxOverwrite = createGlobalStyle`
${SharedLightboxStyle}
`;

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
  const { mobile = false, fontSize = "16", children, className } = props;
  const [rehypePlugins, setRehypePlugins] = useState<any[]>([]);
  const [remarkPlugins, setRemarkPlugins] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [rehypeRaw, rehypeKatex, remarkGfm, remarkMath] = await Promise.all(
        [
          import("rehype-raw").then((mod) => mod.default),
          import("rehype-katex").then((mod) => mod.default),
          import("remark-gfm").then((mod) => mod.default),
          import("remark-math").then((mod) => mod.default),
        ]
      );
      setRehypePlugins([rehypeRaw, rehypeKatex]);
      setRemarkPlugins([remarkGfm, remarkMath]);
    })();
  }, []);

  return (
    <StyledMarkdownRenderer
      className={`wellms-component ${className}`}
      mobile={mobile}
      fontSize={fontSize}
    >
      <ReactMarkdown
        linkTarget="_blank"
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}
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
          input: (props) => {
            return <MarkdownCheckList {...props} />;
          },
        }}
        {...props}
      >
        {fixContentForMarkdown(children)}
      </ReactMarkdown>
    </StyledMarkdownRenderer>
  );
};

export const MarkdownCheckList: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ checked, disabled, type }) => {
  const ID = useId();
  return (
    <input
      id={ID}
      className="text-checkbox"
      type={type}
      disabled={disabled}
      checked={checked}
      aria-labelledby={ID}
      placeholder="checkbox"
    />
  );
};

export const MarkdownImage: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement>
> = ({ src, alt, title }) => {
  const [size, setSize] = useState([0, 0]);

  return (
    <>
      <LightBoxOverwrite />
      <Gallery
        options={{
          arrowPrev: false,
          arrowNext: false,
          imageClickAction: "zoom",
          initialZoomLevel: "fit",
          secondaryZoomLevel: 2,
          maxZoomLevel: 3,
        }}
      >
        <Item original={src} width={size[0]} height={size[1]}>
          {({ ref, open }) => (
            <div className={`image ${title ? "image-" + title : ""}`}>
              <span
                role="button"
                onClick={open}
                onKeyDown={() => open({} as React.MouseEvent)}
                tabIndex={0}
                aria-label={`Open ${title}`}
                style={{ cursor: "pointer" }}
              >
                <img
                  ref={ref as React.MutableRefObject<HTMLImageElement>}
                  onLoad={(e) =>
                    setSize([
                      e.currentTarget.naturalWidth,
                      e.currentTarget.naturalHeight,
                    ])
                  }
                  src={src}
                  alt={alt}
                />
              </span>
            </div>
          )}
        </Item>
      </Gallery>
    </>
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

export default withTheme(styled(MarkdownRenderer)<MarkdownRendererProps>``);
