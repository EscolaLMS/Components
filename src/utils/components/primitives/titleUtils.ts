import { HeaderLevelInt } from "../../../types/titleTypes";

export const setFontSizeByHeaderLevel = (
  level?: HeaderLevelInt,
  mobile?: boolean
): string => {
  switch (level) {
    case 1:
      return mobile ? "20px" : "50px";
    case 2:
      return mobile ? "20px" : "40px";
    case 3:
      return "36px";
    case 4:
      return "20px";
    default:
      return "16px";
  }
};
