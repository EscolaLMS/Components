import { HeaderLevelInt } from "../../../types/titleTypes";

export const setFontSizeByHeaderLevel = (
  level?: HeaderLevelInt,
  mobile?: boolean
): string => {
  switch (level) {
    case 1:
      return mobile ? "20px" : "30px";
    case 2:
      return mobile ? "20px" : "24px";
    case 3:
      return mobile ? "20px" : "18px";
    case 4:
      return "16px";
    default:
      return "13px";
  }
};
