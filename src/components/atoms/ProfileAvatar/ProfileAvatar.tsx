import * as React from "react";

import styled, { withTheme } from "styled-components";
import { ProfileAvatarTypesStr } from "../../../types/ProfileAvatarTypes";
import { setProfileAvatarBySize } from "../../../utils/components/primitives/profileAvatarUtils";

export interface ProfileAvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: ProfileAvatarTypesStr;
}

const StyledProfileAvatar = styled("img")<ProfileAvatarProps>`
  border-radius: 50%;
  width: ${(props) => setProfileAvatarBySize(props.size)};
  height: ${(props) => setProfileAvatarBySize(props.size)};
`;

export const ProfileAvatar: React.FC<ProfileAvatarProps> = (props) => {
  const { size } = props;
  return <StyledProfileAvatar {...props} size={size} />;
};

const NewProfileAvatar = styled(ProfileAvatar)<{ size: string }>``;

export default withTheme(NewProfileAvatar);
