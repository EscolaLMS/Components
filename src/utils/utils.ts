import { Lesson } from "@escolalms/sdk/lib/types/api";
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
  /*! PhotoSwipe main CSS by Dmytro Semenov | photoswipe.com */

  .pswp {
    --pswp-bg: #000;
    --pswp-placeholder-bg: #222;

    --pswp-root-z-index: 100000;

    --pswp-preloader-color: rgba(79, 79, 79, 0.4);
    --pswp-preloader-color-secondary: rgba(255, 255, 255, 0.9);

    /* defined via js:
    --pswp-transition-duration: 333ms; */

    --pswp-icon-color: #fff;
    --pswp-icon-color-secondary: #4f4f4f;
    --pswp-icon-stroke-color: #4f4f4f;
    --pswp-icon-stroke-width: 2px;

    --pswp-error-text-color: var(--pswp-icon-color);
  }

  /*
  \tStyles for basic PhotoSwipe (pswp) functionality (sliding area, open/close transitions)
  */

  .pswp {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--pswp-root-z-index);
    display: none;
    touch-action: none;
    outline: 0;
    opacity: 0.003;
    contain: layout style size;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* Prevents focus outline on the root element,
    (it may be focused initially) */

  .pswp:focus {
    outline: 0;
  }

  .pswp * {
    box-sizing: border-box;
  }

  .pswp img {
    max-width: none;
  }

  .pswp--open {
    display: block;
  }

  .pswp,
  .pswp__bg {
    transform: translateZ(0);
    will-change: opacity;
  }

  .pswp__bg {
    opacity: 0.005;
    background: var(--pswp-bg);
  }

  .pswp,
  .pswp__scroll-wrap {
    overflow: hidden;
  }

  .pswp__scroll-wrap,
  .pswp__bg,
  .pswp__container,
  .pswp__item,
  .pswp__content,
  .pswp__img,
  .pswp__zoom-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .pswp__img,
  .pswp__zoom-wrap {
    width: auto;
    height: auto;
  }

  .pswp--click-to-zoom.pswp--zoom-allowed .pswp__img {
    cursor: -webkit-zoom-in;
    cursor: -moz-zoom-in;
    cursor: zoom-in;
  }

  .pswp--click-to-zoom.pswp--zoomed-in .pswp__img {
    cursor: move;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
  }

  .pswp--click-to-zoom.pswp--zoomed-in .pswp__img:active {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing;
  }

  /* :active to override grabbing cursor */

  .pswp--no-mouse-drag.pswp--zoomed-in .pswp__img,
  .pswp--no-mouse-drag.pswp--zoomed-in .pswp__img:active,
  .pswp__img {
    cursor: -webkit-zoom-out;
    cursor: -moz-zoom-out;
    cursor: zoom-out;
  }

  /* Prevent selection and tap highlights */

  .pswp__container,
  .pswp__img,
  .pswp__button,
  .pswp__counter {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .pswp__item {
    /* z-index for fade transition */
    z-index: 1;
    overflow: hidden;
  }

  .pswp__hidden {
    display: none !important;
  }

  /* Allow to click through pswp__content element, but not its children */

  .pswp__content {
    pointer-events: none;
  }

  .pswp__content > * {
    pointer-events: auto;
  }

  /*
  
    PhotoSwipe UI
  
  */

  /*
  \tError message appears when image is not loaded
  \t(JS option errorMsg controls markup)
  */

  .pswp__error-msg-container {
    display: grid;
  }

  .pswp__error-msg {
    margin: auto;
    font-size: 1em;
    line-height: 1;
    color: var(--pswp-error-text-color);
  }

  /*
  class pswp__hide-on-close is applied to elements that
  should hide (for example fade out) when PhotoSwipe is closed
  and show (for example fade in) when PhotoSwipe is opened
   */

  .pswp .pswp__hide-on-close {
    opacity: 0.005;
    will-change: opacity;
    transition: opacity var(--pswp-transition-duration)
      cubic-bezier(0.4, 0, 0.22, 1);
    z-index: 10; /* always overlap slide content */
    pointer-events: none; /* hidden elements should not be clickable */
  }

  /* class pswp--ui-visible is added when opening or closing transition starts */

  .pswp--ui-visible .pswp__hide-on-close {
    opacity: 1;
    pointer-events: auto;
  }

  /* <button> styles, including css reset */

  .pswp__button {
    position: relative;
    display: block;
    width: 50px;
    height: 60px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    cursor: pointer;
    background: none;
    border: 0;
    box-shadow: none;
    opacity: 0.85;
    -webkit-appearance: none;
    -webkit-touch-callout: none;
  }

  .pswp__button:hover,
  .pswp__button:active,
  .pswp__button:focus {
    transition: none;
    padding: 0;
    background: none;
    border: 0;
    box-shadow: none;
    opacity: 1;
  }

  .pswp__button:disabled {
    opacity: 0.3;
    cursor: auto;
  }

  .pswp__icn {
    fill: var(--pswp-icon-color);
    color: var(--pswp-icon-color-secondary);
  }

  .pswp__icn {
    position: absolute;
    top: 14px;
    left: 9px;
    width: 32px;
    height: 32px;
    overflow: hidden;
    pointer-events: none;
  }

  .pswp__icn-shadow {
    stroke: var(--pswp-icon-stroke-color);
    stroke-width: var(--pswp-icon-stroke-width);
    fill: none;
  }

  .pswp__icn:focus {
    outline: 0;
  }

  /*
  \tdiv element that matches size of large image,
  \tlarge image loads on top of it,
  \tused when msrc is not provided
  */

  div.pswp__img--placeholder,
  .pswp__img--with-bg {
    background: var(--pswp-placeholder-bg);
  }

  .pswp__top-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    z-index: 10;

    /* allow events to pass through top bar itself */
    pointer-events: none !important;
  }

  .pswp__top-bar > * {
    pointer-events: auto;
    /* this makes transition significantly more smooth,
       even though inner elements are not animated */
    will-change: opacity;
  }

  /*
  
    Close button
  
  */

  .pswp__button--close {
    margin-right: 6px;
  }

  /*
  
    Arrow buttons
  
  */

  .pswp__button--arrow {
    position: absolute;
    top: 0;
    width: 75px;
    height: 100px;
    top: 50%;
    margin-top: -50px;
  }

  .pswp__button--arrow:disabled {
    display: none;
    cursor: default;
  }

  .pswp__button--arrow .pswp__icn {
    top: 50%;
    margin-top: -30px;
    width: 60px;
    height: 60px;
    background: none;
    border-radius: 0;
  }

  .pswp--one-slide .pswp__button--arrow {
    display: none;
  }

  /* hide arrows on touch screens */

  .pswp--touch .pswp__button--arrow {
    visibility: hidden;
  }

  /* show arrows only after mouse was used */

  .pswp--has_mouse .pswp__button--arrow {
    visibility: visible;
  }

  .pswp__button--arrow--prev {
    right: auto;
    left: 0;
  }

  .pswp__button--arrow--next {
    right: 0;
  }

  .pswp__button--arrow--next .pswp__icn {
    left: auto;
    right: 14px;
    /* flip horizontally */
    transform: scale(-1, 1);
  }

  /*
  
    Zoom button
  
  */

  .pswp__button--zoom {
    display: none;
  }

  .pswp--zoom-allowed .pswp__button--zoom {
    display: block;
  }

  /* "+" => "-" */

  .pswp--zoomed-in .pswp__zoom-icn-bar-v {
    display: none;
  }

  /*
  
    Loading indicator
  
  */

  .pswp__preloader {
    position: relative;
    overflow: hidden;
    width: 50px;
    height: 60px;
    margin-right: auto;
  }

  .pswp__preloader .pswp__icn {
    opacity: 0;
    transition: opacity 0.2s linear;
    animation: pswp-clockwise 600ms linear infinite;
  }

  .pswp__preloader--active .pswp__icn {
    opacity: 0.85;
  }

  @keyframes pswp-clockwise {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /*
  
    "1 of 10" counter
  
  */

  .pswp__counter {
    height: 30px;
    margin-top: 15px;
    margin-inline-start: 20px;
    font-size: 14px;
    line-height: 30px;
    color: var(--pswp-icon-color);
    text-shadow: 1px 1px 3px var(--pswp-icon-color-secondary);
    opacity: 0.85;
  }

  .pswp--one-slide .pswp__counter {
    display: none;
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
let time = Date.now();
const usedIds: string[] = [];
export const getUniqueId = (uniqueName: string, twoIds = false) => {
  const newId = `${time}--${uniqueName}`;
  if (usedIds.filter((id) => id === newId).length > (twoIds ? 1 : 0)) {
    time = Date.now();
    usedIds.push(`${time}--${uniqueName}`);
    return `${time}--${uniqueName}`;
  }
  usedIds.push(newId);
  return newId;
};

export const findNestedIndexInLessons = (
  arr: Lesson[],
  target: Lesson,
  parentIndex?: string,
): string | null => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const currentIndex = parentIndex ? `${parentIndex}.${i + 1}` : `${i + 1}`;

    if (item === target) {
      return currentIndex;
    } else if (item.lessons) {
      const nestedIndex = findNestedIndexInLessons(item.lessons as Lesson[], target, currentIndex);
      if (nestedIndex !== null) {
        return nestedIndex;
      }
    }
  }
  return null;
};
/** Date formats */
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "yyyy-MM-dd HH:mm";
export const DAY_FORMAT = "yyyy-MM-dd";
