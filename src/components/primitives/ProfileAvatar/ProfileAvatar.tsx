import * as React from "react";

import styled, { withTheme } from "styled-components";

export interface ProfileAvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: "medium" | "large";
}

const StyledProfileAvatar = styled("img")<ProfileAvatarProps>`
  border-radius: 50%;
  width: ${(props) => prop.size === "large" ? "116px" : "50px",
  height: ${(props) => prop.size === "large" ? "116px" : "50px",
`;

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  src,
  alt,
  size = "medium",
  ...props
}) => {
  return <StyledProfileAvatar src={src} alt={alt} size={size} {...props} />;
};

const NewProfileAvatar = styled(ProfileAvatar)<{ size: string }>``;

export default withTheme(NewProfileAvatar);
