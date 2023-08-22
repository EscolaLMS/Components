import React from "react";
import styled, { withTheme } from "styled-components";
import { ICONS } from "./icons";

type IconName = keyof typeof ICONS;

interface Props extends Omit<React.HTMLAttributes<HTMLPictureElement>, "name"> {
  name: IconName;
}

export const Icon: React.FC<Props> = ({ name, ...pictureProps }) => {
  const icon: React.FC | undefined = ICONS?.[name];

  return (
    <picture {...pictureProps}>
      {icon ? React.createElement(icon) : <>Icon {name} missing</>}
    </picture>
  );
};

// https://styled-components.com/docs/api#using-custom-props
const NewIcon = styled(Icon)<Props>``;

// Main button with styles
export default withTheme(NewIcon);
