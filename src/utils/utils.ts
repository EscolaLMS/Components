import { css, DefaultTheme } from "styled-components";

export const guid = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(2, 10);

export const calcPercentage = (current: number, max: number): string => {
  if (max === 0) {
    return "0%";
  }
  if (current >= max) {
    return "100%";
  }
  return `${Math.round((current / max) * 100)}%`;
};

export const roundPercentageList = (orig: number[], target?: number) => {
  if (!target) {
    target = 100;
  }

  const newVals = [];
  const len = orig.length;
  const marginOfErrors = [];

  let i = orig.length,
    j = 0,
    total = 0,
    change = 0,
    next,
    factor1,
    factor2;

  while (i--) {
    total += newVals[i] = Math.round(orig[i]);
  }

  change = total < target ? 1 : -1;

  while (total !== target) {
    for (i = 0; i < len; i++) {
      next = i === len - 1 ? 0 : i + 1;

      factor2 = errorFactor(orig[next], newVals[next] + change);
      factor1 = errorFactor(orig[i], newVals[i] + change);

      if (factor1 > factor2) {
        j = next;
      }
    }

    newVals[j] += change;
    total += change;
  }

  for (let i = 0; i < len; i++) {
    marginOfErrors[i] = newVals[i] && Math.abs(orig[i] - newVals[i]) / orig[i];
  }

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (j === i) continue;

      const roundUpFactor =
        errorFactor(orig[i], newVals[i] + 1) +
        errorFactor(orig[j], newVals[j] - 1);
      const roundDownFactor =
        errorFactor(orig[i], newVals[i] - 1) +
        errorFactor(orig[j], newVals[j] + 1);
      const sumMargin = marginOfErrors[i] + marginOfErrors[j];

      if (roundUpFactor < sumMargin) {
        newVals[i] = newVals[i] + 1;
        newVals[j] = newVals[j] - 1;
        marginOfErrors[i] =
          newVals[i] && Math.abs(orig[i] - newVals[i]) / orig[i];
        marginOfErrors[j] =
          newVals[j] && Math.abs(orig[j] - newVals[j]) / orig[j];
      }

      if (roundDownFactor < sumMargin) {
        newVals[i] = newVals[i] - 1;
        newVals[j] = newVals[j] + 1;
        marginOfErrors[i] =
          newVals[i] && Math.abs(orig[i] - newVals[i]) / orig[i];
        marginOfErrors[j] =
          newVals[j] && Math.abs(orig[j] - newVals[j]) / orig[j];
      }
    }
  }

  function errorFactor(oldNum: number, newNum: number) {
    return Math.abs(oldNum - newNum) / oldNum;
  }

  return newVals;
};

export const SharedLightboxStyle = css`
  @keyframes closeWindow {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .ril__outer {
    background-color: rgba(0, 0, 0, 0.85);
    outline: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    -ms-content-zooming: none;
    user-select: none;
    /* stylelint-disable property-no-vendor-prefix */
    -ms-user-select: none;
    -ms-touch-select: none;
    touch-action: none;
  }

  .ril__outerClosing {
    opacity: 0;
  }

  .ril__inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .ril__image,
  .ril__imagePrev,
  .ril__imageNext {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    max-width: none;
    -ms-content-zooming: none;
    user-select: none;
    -ms-user-select: none;
    -ms-touch-select: none;
    touch-action: none;
  }

  .ril__imageDiscourager {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .ril__navButtons {
    border: none;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 20px;
    height: 34px;
    padding: 40px 30px;
    margin: auto;
    cursor: pointer;
    opacity: 0.7;
  }
  .ril__navButtons:hover {
    opacity: 1;
  }
  .ril__navButtons:active {
    opacity: 0.7;
  }

  .ril__navButtonPrev {
    left: 0;
    background: rgba(0, 0, 0, 0.2)
      url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDE5LDMgLTIsLTIgLTE2LDE2IDE2LDE2IDEsLTEgLTE1LC0xNSAxNSwtMTUgeiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==")
      no-repeat center;
  }

  .ril__navButtonNext {
    right: 0;
    background: rgba(0, 0, 0, 0.2)
      url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDEsMyAyLC0yIDE2LDE2IC0xNiwxNiAtMSwtMSAxNSwtMTUgLTE1LC0xNSB6IiBmaWxsPSIjRkZGIi8+PC9zdmc+")
      no-repeat center;
  }

  .ril__downloadBlocker {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
    background-size: cover;
  }

  .ril__caption,
  .ril__toolbar {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
  }

  .ril__caption {
    bottom: 0;
    max-height: 150px;
    overflow: auto;
  }

  .ril__captionContent {
    padding: 10px 20px;
    color: #fff;
  }

  .ril__toolbar {
    top: 0;
    height: 50px;
  }

  .ril__toolbarSide {
    height: 50px;
    margin: 0;
  }

  .ril__toolbarLeftSide {
    padding-left: 20px;
    padding-right: 0;
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ril__toolbarRightSide {
    padding-left: 0;
    padding-right: 20px;
    flex: 0 0 auto;
  }

  .ril__toolbarItem {
    display: inline-block;
    line-height: 50px;
    padding: 0;
    color: #fff;
    font-size: 120%;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ril__toolbarItemChild {
    vertical-align: middle;
  }

  .ril__builtinButton {
    width: 40px;
    height: 35px;
    cursor: pointer;
    border: none;
    opacity: 0.7;
  }
  .ril__builtinButton:hover {
    opacity: 1;
  }
  .ril__builtinButton:active {
    outline: none;
  }

  .ril__builtinButtonDisabled {
    cursor: default;
    opacity: 0.5;
  }
  .ril__builtinButtonDisabled:hover {
    opacity: 0.5;
  }

  .ril__closeButton {
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJtIDEsMyAxLjI1LC0xLjI1IDcuNSw3LjUgNy41LC03LjUgMS4yNSwxLjI1IC03LjUsNy41IDcuNSw3LjUgLTEuMjUsMS4yNSAtNy41LC03LjUgLTcuNSw3LjUgLTEuMjUsLTEuMjUgNy41LC03LjUgLTcuNSwtNy41IHoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=")
      no-repeat center;
  }

  .ril__zoomInButton {
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PHBhdGggZD0iTTEyIDV2NiIvPjwvZz48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+")
      no-repeat center;
  }

  .ril__zoomOutButton {
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PC9nPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=")
      no-repeat center;
  }

  .ril__outerAnimating {
    animation-name: closeWindow;
  }

  @keyframes pointFade {
    0%,
    19.999%,
    100% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
  }

  .ril__loadingCircle {
    width: 60px;
    height: 60px;
    position: relative;
  }

  .ril__loadingCirclePoint {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .ril__loadingCirclePoint::before {
    content: "";
    display: block;
    margin: 0 auto;
    width: 11%;
    height: 30%;
    background-color: #fff;
    border-radius: 30%;
    animation: pointFade 800ms infinite ease-in-out both;
  }
  .ril__loadingCirclePoint:nth-of-type(1) {
    transform: rotate(0deg);
  }
  .ril__loadingCirclePoint:nth-of-type(7) {
    transform: rotate(180deg);
  }
  .ril__loadingCirclePoint:nth-of-type(1)::before,
  .ril__loadingCirclePoint:nth-of-type(7)::before {
    animation-delay: -800ms;
  }
  .ril__loadingCirclePoint:nth-of-type(2) {
    transform: rotate(30deg);
  }
  .ril__loadingCirclePoint:nth-of-type(8) {
    transform: rotate(210deg);
  }
  .ril__loadingCirclePoint:nth-of-type(2)::before,
  .ril__loadingCirclePoint:nth-of-type(8)::before {
    animation-delay: -666ms;
  }
  .ril__loadingCirclePoint:nth-of-type(3) {
    transform: rotate(60deg);
  }
  .ril__loadingCirclePoint:nth-of-type(9) {
    transform: rotate(240deg);
  }
  .ril__loadingCirclePoint:nth-of-type(3)::before,
  .ril__loadingCirclePoint:nth-of-type(9)::before {
    animation-delay: -533ms;
  }
  .ril__loadingCirclePoint:nth-of-type(4) {
    transform: rotate(90deg);
  }
  .ril__loadingCirclePoint:nth-of-type(10) {
    transform: rotate(270deg);
  }
  .ril__loadingCirclePoint:nth-of-type(4)::before,
  .ril__loadingCirclePoint:nth-of-type(10)::before {
    animation-delay: -400ms;
  }
  .ril__loadingCirclePoint:nth-of-type(5) {
    transform: rotate(120deg);
  }
  .ril__loadingCirclePoint:nth-of-type(11) {
    transform: rotate(300deg);
  }
  .ril__loadingCirclePoint:nth-of-type(5)::before,
  .ril__loadingCirclePoint:nth-of-type(11)::before {
    animation-delay: -266ms;
  }
  .ril__loadingCirclePoint:nth-of-type(6) {
    transform: rotate(150deg);
  }
  .ril__loadingCirclePoint:nth-of-type(12) {
    transform: rotate(330deg);
  }

  .ril__loadingCirclePoint:nth-of-type(6)::before,
  .ril__loadingCirclePoint:nth-of-type(12)::before {
    animation-delay: -133ms;
  }

  .ril__loadingCirclePoint:nth-of-type(13) {
    transform: rotate(360deg);
  }
  .ril__loadingCirclePoint:nth-of-type(7)::before,
  .ril__loadingCirclePoint:nth-of-type(13)::before {
    animation-delay: 0ms;
  }

  .ril__loadingContainer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .ril__imagePrev .ril__loadingContainer,
  .ril__imageNext .ril__loadingContainer {
    display: none;
  }

  .ril__errorContainer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .ril__imagePrev .ril__errorContainer,
  .ril__imageNext .ril__errorContainer {
    display: none;
  }

  .ril__loadingContainer__icon {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;

type StylesBasedOnThemeArgs =
  | [
      mode: DefaultTheme["mode"],
      valueIfDarkTheme: undefined,
      valueIfLightTheme: undefined,
      fallbackColor: string
    ]
  | [
      mode: DefaultTheme["mode"],
      valueIfDarkTheme: string,
      valueIfLightTheme: string,
      fallbackColor?: string
    ]
  | [
      mode: DefaultTheme["mode"],
      valueIfDarkTheme: string,
      valueIfLightTheme: undefined,
      fallbackColor: string
    ]
  | [
      mode: DefaultTheme["mode"],
      valueIfDarkTheme: undefined,
      valueIfLightTheme: string,
      fallbackColor: string
    ];

export function getStylesBasedOnTheme(...args: StylesBasedOnThemeArgs) {
  const [mode = "light", valueIfDarkTheme, valueIfLightTheme, fallbackColor] =
    args;

  const isDarkMode = mode === "dark";
  let returnValue = "";

  // if (typeof fallbackColor === "undefined") {
  //   if (valueIfDarkTheme && valueIfLightTheme) {
  //     returnValue = mode === "dark" ? valueIfDarkTheme : valueIfLightTheme;
  //   }
  // } else if (valueIfDarkTheme) {
  //   returnValue = mode === "dark" ? valueIfDarkTheme : fallbackColor;
  // } else if (valueIfLightTheme) {
  //   returnValue = mode === "light" ? valueIfLightTheme : fallbackColor;
  // } else {
  //   returnValue = fallbackColor;
  // }

  if (typeof fallbackColor === "undefined") {
    if (valueIfDarkTheme && isDarkMode) {
      returnValue = valueIfDarkTheme;
    } else if (valueIfLightTheme && !isDarkMode) {
      returnValue = valueIfLightTheme;
    }
  } else if (valueIfDarkTheme) {
    returnValue = isDarkMode
      ? valueIfDarkTheme
      : valueIfLightTheme ?? fallbackColor;
  } else if (valueIfLightTheme) {
    returnValue = mode === "light" ? valueIfLightTheme : fallbackColor;
  } else {
    returnValue = fallbackColor;
  }

  return returnValue;
}
