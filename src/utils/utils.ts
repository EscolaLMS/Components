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
  .yarl__fullsize {
    width: 100%;
    height: 100%;
  }
  .yarl__relative {
    position: relative;
  }
  .yarl__portal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    overflow: hidden;
    z-index: var(--yarl__portal_zindex, 9999);
    transition: opacity var(--yarl__fade_animation_duration, 250ms)
      var(--yarl__fade_animation_timing_function, ease);
  }
  .yarl__portal_open {
    opacity: 1;
  }
  .yarl__container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-color: var(
      --yarl__container_background_color,
      var(--yarl__color_backdrop, #000)
    );
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    touch-action: var(--yarl__controller_touch_action, none);
    overscroll-behavior: var(--yarl__controller_overscroll-behavior, contain);
  }
  .yarl__carousel {
    display: flex;
    flex: 0 0 auto;
    height: 100%;
    align-content: center;
    justify-content: center;
    align-items: stretch;
    width: calc(
      100% + (var(--yarl__carousel_slides_count) - 1) *
        (
          100% + var(--yarl__carousel_spacing_px, 0) * 1px +
            var(--yarl__carousel_spacing_percent, 0) * 1%
        )
    );
    -webkit-transform: translateX(var(--yarl__swipe_offset, 0px));
    transform: translateX(var(--yarl__swipe_offset, 0px));
  }
  .yarl__carousel_with_slides {
    -webkit-column-gap: calc(
      var(--yarl__carousel_spacing_px, 0) * 1px + 100 /
        (
          100 * var(--yarl__carousel_slides_count) +
            (var(--yarl__carousel_slides_count) - 1) *
            var(--yarl__carousel_spacing_percent, 0)
        ) * var(--yarl__carousel_spacing_percent, 0) * 1%
    );
    -moz-column-gap: calc(
      var(--yarl__carousel_spacing_px, 0) * 1px + 100 /
        (
          100 * var(--yarl__carousel_slides_count) +
            (var(--yarl__carousel_slides_count) - 1) *
            var(--yarl__carousel_spacing_percent, 0)
        ) * var(--yarl__carousel_spacing_percent, 0) * 1%
    );
    column-gap: calc(
      var(--yarl__carousel_spacing_px, 0) * 1px + 100 /
        (
          100 * var(--yarl__carousel_slides_count) +
            (var(--yarl__carousel_slides_count) - 1) *
            var(--yarl__carousel_spacing_percent, 0)
        ) * var(--yarl__carousel_spacing_percent, 0) * 1%
    );
  }
  .yarl__flex_center {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .yarl__slide {
    flex: 1;
    position: relative;
    overflow: hidden;
    padding: calc(
      var(--yarl__carousel_padding_px, 0) * 1px + 100 /
        (
          100 * var(--yarl__carousel_slides_count) +
            (var(--yarl__carousel_slides_count) - 1) *
            var(--yarl__carousel_spacing_percent, 0)
        ) * var(--yarl__carousel_padding_percent, 0) * 1%
    );
  }
  [dir="rtl"] .yarl__slide {
    --yarl__direction: -1;
  }
  .yarl__slide_image {
    max-width: 100%;
    max-height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
    touch-action: var(--yarl__controller_touch_action, none);
    -moz-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  @media screen and (min-width: 800px) {
    .yarl__slide_image {
      -webkit-transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      -webkit-transform-style: preserve-3d;
    }
  }
  .yarl__slide_image_cover {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .yarl__slide_image_loading {
    opacity: 0;
  }
  .yarl__slide_placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    line-height: 0;
  }
  .yarl__slide_loading {
    color: var(
      --yarl__slide_icon_loading_color,
      var(--yarl__color_button, rgba(255, 255, 255, 0.8))
    );
    -webkit-animation: yarl__delayed_fadein 1s linear;
    animation: yarl__delayed_fadein 1s linear;
  }
  .yarl__slide_loading line {
    -webkit-animation: yarl__stroke_opacity 1s linear infinite;
    animation: yarl__stroke_opacity 1s linear infinite;
  }
  .yarl__slide_loading line:nth-of-type(1) {
    -webkit-animation-delay: -1.875s;
    animation-delay: -1.875s;
  }
  .yarl__slide_loading line:nth-of-type(2) {
    -webkit-animation-delay: -1.75s;
    animation-delay: -1.75s;
  }
  .yarl__slide_loading line:nth-of-type(3) {
    -webkit-animation-delay: -1.625s;
    animation-delay: -1.625s;
  }
  .yarl__slide_loading line:nth-of-type(4) {
    -webkit-animation-delay: -1.5s;
    animation-delay: -1.5s;
  }
  .yarl__slide_loading line:nth-of-type(5) {
    -webkit-animation-delay: -1.375s;
    animation-delay: -1.375s;
  }
  .yarl__slide_loading line:nth-of-type(6) {
    -webkit-animation-delay: -1.25s;
    animation-delay: -1.25s;
  }
  .yarl__slide_loading line:nth-of-type(7) {
    -webkit-animation-delay: -1.125s;
    animation-delay: -1.125s;
  }
  .yarl__slide_loading line:nth-of-type(8) {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .yarl__slide_error {
    width: var(--yarl__slide_icon_error_size, 48px);
    height: var(--yarl__slide_icon_error_size, 48px);
    color: var(--yarl__slide_icon_error_color, red);
  }
  @media (prefers-reduced-motion) {
    .yarl__portal,
    .yarl__slide {
      transition: unset;
    }
    .yarl__slide_loading,
    .yarl__slide_loading line {
      -webkit-animation: unset;
      animation: unset;
    }
  }
  .yarl__toolbar {
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: auto;
    display: flex;
    justify-content: flex-end;
    padding: var(--yarl__toolbar_padding, 8px);
  }
  [dir="rtl"] .yarl__toolbar {
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
  }
  .yarl__icon {
    width: var(--yarl__icon_size, 32px);
    height: var(--yarl__icon_size, 32px);
  }
  .yarl__button {
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--yarl__button_background_color, transparent);
    border: var(--yarl__button_border, 0);
    margin: var(--yarl__button_margin, 0);
    outline: none;
    line-height: 0;
    padding: var(--yarl__button_padding, 8px);
    color: var(--yarl__color_button, rgba(255, 255, 255, 0.8));
    -webkit-filter: var(
      --yarl__button_filter,
      drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8))
    );
    filter: var(
      --yarl__button_filter,
      drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8))
    );
    -webkit-tap-highlight-color: transparent;
  }
  .yarl__button:focus {
    color: var(--yarl__color_button_active, #fff);
  }
  .yarl__button:focus:not(:focus-visible) {
    color: var(--yarl__color_button, rgba(255, 255, 255, 0.8));
  }
  .yarl__button:focus-visible {
    color: var(--yarl__color_button_active, #fff);
  }
  @media (hover: hover) {
    .yarl__button:hover,
    .yarl__button:focus:hover,
    .yarl__button:focus-visible:hover {
      color: var(--yarl__color_button_active, #fff);
    }
  }
  .yarl__button:disabled {
    color: var(--yarl__color_button_disabled, rgba(255, 255, 255, 0.4));
    cursor: default;
  }
  .yarl__navigation_prev,
  .yarl__navigation_next {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    padding: var(--yarl__navigation_button_padding, 24px 16px);
  }
  .yarl__navigation_prev {
    left: 0;
  }
  [dir="rtl"] .yarl__navigation_prev {
    left: unset;
    right: 0;
    -webkit-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotate(180deg);
  }
  .yarl__navigation_next {
    right: 0;
  }
  [dir="rtl"] .yarl__navigation_next {
    left: 0;
    right: unset;
    -webkit-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotate(180deg);
  }
  .yarl__no_scroll {
    height: 100%;
    overflow: hidden;
    overscroll-behavior: none;
  }

  @-webkit-keyframes yarl__delayed_fadein {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes yarl__delayed_fadein {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes yarl__stroke_opacity {
    from {
      stroke-opacity: 1;
    }
    to {
      stroke-opacity: 0.125;
    }
  }
  @keyframes yarl__stroke_opacity {
    from {
      stroke-opacity: 1;
    }
    to {
      stroke-opacity: 0.125;
    }
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

/** Date formats */
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "yyyy-MM-dd HH:mm";
export const DAY_FORMAT = "yyyy-MM-dd";
