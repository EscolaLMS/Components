import styled from 'styled-components';
import { Property } from 'csstype';

interface Props {
  $justifyContent?: Property.JustifyContent;
  $alignItems?: Property.AlignItems;
  $gap?: number;
}

export const Stack = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $justifyContent }) => $justifyContent ?? ''};
  align-items: ${({ $alignItems }) => $alignItems ?? ''};
  gap: ${({ $gap }) => $gap ?? '0'}px;
`;
