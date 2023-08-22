import React from "react";
import styled, { withTheme } from "styled-components";
import { ICONS_DICTIONARY } from "./_components/IconsDictionary";

type IconName = keyof typeof ICONS_DICTIONARY;

interface Props extends Omit<React.HTMLAttributes<HTMLPictureElement>, "name"> {
  name: IconName;
}

export const Icon: React.FC<Props> = ({ name, ...pictureProps }) => {
  const icon: React.FC | undefined = ICONS_DICTIONARY?.[name];

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
