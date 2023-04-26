import styled from 'styled-components';
import { Property } from 'csstype';

interface Props {
  $justifyContent?: Property.JustifyContent;
  $alignItems?: Property.AlignItems;
  $gap?: number;
}

export const Row = styled.div<Props>`
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent ?? ''};
  align-items: ${({ $alignItems }) => $alignItems ?? ''};
  gap: ${({ $gap }) => $gap ?? '0'}px;
`;
