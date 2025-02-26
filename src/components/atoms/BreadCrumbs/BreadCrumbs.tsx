import * as React from "react";

import styled, { withTheme } from "styled-components";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { getUniqueId } from "../../../utils/utils";
import { getFontFromTheme } from "../../../theme/provider";
import { ExtendableStyledComponent } from "types/component";

interface BreadCrumbsProps extends ExtendableStyledComponent {
  items: React.ReactNode[];
  hyphen?: React.ReactNode;
}

const HyphenIcon = () => (
  <svg
    width="5"
    height="7"
    viewBox="0 0 5 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.872039 6.29471C0.70932 6.13199 0.70932 5.86817 0.872039 5.70545L3.07741 3.50008L0.872039 1.29471C0.70932 1.13199 0.70932 0.868172 0.872039 0.705454C1.03476 0.542735 1.29858 0.542735 1.46129 0.705454L3.96129 3.20545C4.12401 3.36817 4.12401 3.63199 3.96129 3.79471L1.46129 6.29471C1.29858 6.45743 1.03476 6.45743 0.872039 6.29471Z"
      fill="#AFAFAF"
    />
  </svg>
);

const StyledNav = styled("nav")`
  /* Adapt the colors based on primary prop */

  font-family: ${(props) => getFontFromTheme(props.theme).fontFamily};
  color: ${({ theme }) =>
    getStylesBasedOnTheme(theme.mode, theme.gray3, theme.gray2)};
  font-size: 13px;
  line-height: 1em;
  font-weight: 400;

  i svg {
    fill: ${({ theme }) => theme.gray2};
  }
  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    gap: 2px;
    li {
      &,
      & > a,
      & > button {
        font-size: 13px;
      }
    }
  }
`;

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  items,
  className = "",
  hyphen = <HyphenIcon />,
}) => {
  return (
    <StyledNav
      className={`wellms-component ${className}`}
      aria-label={getUniqueId("nav")}
    >
      <ul>
        {items.map((node, i) => (
          <React.Fragment key={`breadcrumb-${getUniqueId(String(node))}-${i}`}>
            <li itemScope itemType="http://data-vocabulary.org/Breadcrumb">
              {node}
            </li>
            <li>{i !== items.length - 1 && hyphen}</li>
          </React.Fragment>
        ))}
      </ul>
    </StyledNav>
  );
};

export default withTheme(styled(BreadCrumbs)``);
