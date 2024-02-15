import { AvatarTypesStr } from "../../../types/AvatarTypes";

export const setAvatarBySize = (size?: AvatarTypesStr): string => {
  switch (size) {
    case "extraSmall":
      return "22px";
    case "superSmall":
      return "30px";
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
};
