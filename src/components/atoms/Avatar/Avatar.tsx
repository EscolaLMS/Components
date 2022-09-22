import * as React from "react";

import styled, { withTheme } from "styled-components";
import { ExtendableStyledComponent } from "types/component";
import { AvatarTypesStr } from "../../../types/AvatarTypes";
import { setAvatarBySize } from "../../../utils/components/primitives/avatarUtils";

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    ExtendableStyledComponent {
  size?: AvatarTypesStr;
}

const StyledAvatar = styled("img")<AvatarProps>`
  border-radius: 50%;
  width: ${(props) => setAvatarBySize(props.size)};
  height: ${(props) => setAvatarBySize(props.size)};
  object-fit: cover;
`;

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { size, className = "" } = props;
  return (
    <StyledAvatar
      {...props}
      size={size}
      className={`wellms-component ${className}`}
    />
  );
};

const NewAvatar = styled(Avatar)<{ size: string }>``;

export default withTheme(NewAvatar);
