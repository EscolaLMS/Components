import * as React from "react";
import {
  MarkdownRenderer,
  MarkdownRendererProps,
} from "../../molecules/MarkdownRenderer/MarkdownRenderer";
import styled, { withTheme } from "styled-components";

export interface MarkdownPlayerProps extends MarkdownRendererProps {
  onLoad?: () => void;
}

export const MarkdownPlayer: React.FC<MarkdownPlayerProps> = (props) => {
  const { onLoad, children, mobile = false } = props;

  React.useEffect(() => {
    children && onLoad && onLoad();
  }, [children, onLoad]);

  return (
    <MarkdownRenderer children={children} mobile={mobile}></MarkdownRenderer>
  );
};

export default withTheme(styled(MarkdownPlayer)<MarkdownPlayerProps>``);
