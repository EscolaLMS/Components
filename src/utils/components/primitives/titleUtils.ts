import { HeaderLevelInt } from "../../../types/titleTypes";

export const setFontSizeByHeaderLevel = (level?: HeaderLevelInt): string => {
  if (level) {
    switch (level) {
      case 1:
        return "50px";
      case 2:
        return "40px";
      case 3:
        return "36px";
      case 4:
        return "30px";
      case 5: 
        return "24px"
      default:
        return "20px";
    }
  }
  return "20px";
}