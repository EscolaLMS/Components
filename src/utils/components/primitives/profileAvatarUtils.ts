import {ProfileAvatarTypesStr} from "../../../types/ProfileAvatarTypes";

export const setProfileAvatarBySize = (size?: ProfileAvatarTypesStr): string => {
  switch (size) {
    case "extraSmall":
      return "22px";
    case "small":
      return "40px";
    case "medium":
      return "50px";
    case "large":
      return "60px";
    case "extraLarge":
      return "112px";
    default:
      return "50px";
  }
}