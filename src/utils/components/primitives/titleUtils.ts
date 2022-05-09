import { HeaderLevelInt } from "../../../types/titleTypes";

export const setFontSizeByHeaderLevel = (level?: HeaderLevelInt): string => {
  switch (level) {
    case 1:
      return "50px";
    case 2:
      return "40px";
    case 3:
      return "36px";
    case 4:
      return "20px";
    default:
      return "16px";
  }
};
