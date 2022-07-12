import React, { useContext, useEffect, useMemo } from "react";
import styled, { withTheme, ThemeContext } from "styled-components";
import { XAPIEvent, Player } from "@escolalms/h5p-react";

import * as API from "@escolalms/sdk/lib/types/api";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react/context";
import { getFontFromTheme } from "../../../theme/provider";

const StyledH5P = styled("div")`
  border-radius: ${(props) => props.theme.buttonRadius || 0}px;
  position: relative;
  width: 100%;
`;

export interface H5PProps {
  id: string;
  onXAPI?: (e: XAPIEvent) => void;
  overwriteFileName?: string;
  h5pObject?: API.H5PObject;
}

export const H5Player: React.FC<H5PProps> = ({
  id,
  onXAPI,
  overwriteFileName = "h5p_overwrite.css",
  h5pObject,
}) => {
  const { fetchH5P, h5p } = useContext(EscolaLMSContext);

  useEffect(() => {
    fetchH5P(id);
  }, [id, fetchH5P]);

  const themeContext = useContext(ThemeContext);
  const fontColor =
    themeContext.mode === "dark" ? themeContext.white : themeContext.black;
  const backgroundColor =
    themeContext.mode === "dark"
      ? themeContext.backgroundDark
      : themeContext.backgroundLight;
  const inputBackground =
    themeContext.mode === "dark" ? "transparent" : themeContext.gray5;
  const inputBorder =
    themeContext.mode === "dark" ? themeContext.white : themeContext.gray1;

  const h5pThemeCSSOverwriteSrc = useMemo(() => {
    const css = `
    @import url("https://fonts.googleapis.com/css2?family=${
      themeContext.font
    }:wght@400;500;700&display=swap");

    *{
      font-family: ${getFontFromTheme(themeContext).fontFamily}!important;
    }
    button {
      border-radius: ${themeContext.buttonRadius}px!important;
    }
    input, textarea {
      border-radius: ${themeContext.inputRadius}px!important;
    }
    .h5p-baq-intro-page {
      background: ${themeContext.secondaryColor} !important;
      color: ${themeContext.primaryColor} !important;
    }
    .h5p-joubelui-button.mq-control-button {
      background: ${themeContext.primaryColor} !important;
      border-bottom: none!important;
      text-shadow: none!important;
      border-radius: ${themeContext.buttonRadius}px!important;
    }
    .h5p-joubelui-button {
      border-radius: ${themeContext.buttonRadius}px!important;
    }
    .h5p-baq-intro-page-title {
      text-shadow: none!important;
      color: ${themeContext.white} !important;
    }
    .h5p-baq {
      background: ${themeContext.primaryColor} !important;
    }
    .h5p-baq-countdown-text {
      background: ${themeContext.primaryColor} !important;
    }
    .h5p-baq-countdown-bg.fuel {
      background: ${themeContext.primaryColor} !important;
      filter: brightness(0.8) !important;
    }
    .h5p-joubelui-progressbar-background {
      background: ${themeContext.primaryColor} !important;
      filter: brightness(0.8) !important;
    }
    .h5p-baq-alternatives > .h5p-joubelui-button:active, .h5p-baq-alternatives > .h5p-joubelui-button:hover {
      background: ${themeContext.primaryColor} !important;
      filter: brightness(0.8) !important;
    }
   .odometer-value {
    color: ${themeContext.primaryColor} !important;
   }
   .h5p-question {
    background: ${backgroundColor} !important;
    color: ${fontColor}!important;
   }
   .h5peditor .ui-dialog .h5p-joubelui-button, .h5peditor .h5p-joubelui-button, .h5p-joubelui-button {
    background: ${themeContext.primaryColor} !important;
   }
   .h5p-crossword-cell.h5p-crossword-cell-empty {
    background: ${
      themeContext.mode === "dark" ? themeContext.gray2 : themeContext.gray3
    } !important;
   }
   .h5p-crossword-input-fields-group-input {
    background:${inputBackground} !important;
    border: 1px solid ${inputBorder}!important;
    color: ${fontColor} !important;
   }
   .h5p-crossword .h5p-crossword-cell:not(.h5p-crossword-solution-correct):not(.h5p-crossword-solution-wrong):not(.h5p-crossword-solution-neutral).h5p-crossword-highlight-normal {
    background: ${themeContext.primaryColor}!important;
   }
   .h5p-crossword .h5p-crossword-input-fields-group-wrapper-clue.h5p-crossword-input-fields-group-clue-highlight-focus .h5p-crossword-input-fields-group-clue-id {
    background: ${themeContext.primaryColor}!important;
    color: ${themeContext.white}!important;
   }
   .h5p-crossword .h5p-crossword-cell.h5p-crossword-highlight-normal .h5p-crossword-cell-canvas {
    color: ${themeContext.white}!important;
   }
   .h5p-dialogcards {
      background: ${backgroundColor} !important;
      color: ${fontColor}!important;
   }
   .h5p-dialogcards-card-content {
    background: ${backgroundColor} !important;
   }
   .h5p-dialogcards .h5p-audio-minimal-button {
    background: ${themeContext.primaryColor}!important;
   }
   .h5p-essay-input-field-textfield {
    background: ${inputBackground} !important;
    border: 1px solid ${inputBorder}!important;
    color: ${fontColor}!important;
   }
   .h5p-question-feedback-content-text {
    color: ${themeContext.primaryColor}!important;
   }
   .h5p-question-explanation-container {
    background: ${backgroundColor} !important;
   }
   .h5p-question-explanation-item {
    background: ${backgroundColor} !important;
   }
   .h5p-accordion .h5p-panel-title {
    color: ${fontColor}!important;
   }
   .h5p-panel-content h5p-advanced-text {
    color: ${fontColor}!important;
   }
   .h5p-status dt {
    color: ${fontColor}!important;  
   }
   .h5p-status dd {
    color: ${fontColor}!important;  
   }
   .h5p-accordion .h5p-panel-title:before {
    color: ${themeContext.primaryColor}!important;
   }
   .h5p-accordion {
    background: ${backgroundColor} !important;
    color: ${fontColor}!important;
   }
   .h5p-panel-title {
    color: ${fontColor}!important;
   }
   .h5p-panel-expanded {
    color: ${themeContext.primaryColor}!important;
   }
   .h5p-questionnaire-element.h5p-questionnaire-required .h5p-subcontent-question {
    background: ${themeContext.primaryColor}!important;
    color: ${themeContext.white}!important;
   }
   .h5p-questionnaire-required-symbol {
    background: ${themeContext.primaryColor}!important;
   }
   .h5p-questionnaire-progress-bar-current {
    background: ${themeContext.primaryColor} !important;
    filter: brightness(0.8) !important;
   }
   .h5p-questionnaire-footer {
    background: ${
      themeContext.mode === "dark" ? themeContext.gray2 : themeContext.gray4
    } !important;
    border: none!important;
   }
   .h5p-questionnaire-button, .h5peditor .h5p-questionnaire-button {
    background: ${themeContext.primaryColor} !important;
    border: none!important;
   }
   .h5p-open-ended-question-input {
    background: ${inputBackground} !important;
    border: 1px solid ${inputBorder}!important;
    color: ${fontColor}!important;
    width: 100%!important;
    max-width: 100%!important;
   }
   .h5p-open-ended-question-content {
    background: ${backgroundColor} !important;
   }
   .h5p-open-ended-question-question:before {
    background: ${backgroundColor} !important;
   }
   .h5p-questionnaire-progress-bar {
    background: ${themeContext.gray2} !important;
   }
   .h5p-open-ended-question-question, 
   .h5p-simple-multiple-choice-question, 
   h5p-subcontent-question {
    background: ${themeContext.primaryColor} !important;
   }
   .h5p-true-false-answer {
    background: ${backgroundColor}!important;
   }
   .h5p-true-false-answer[aria-checked=true] {
    background: ${themeContext.primaryColor}!important;
    color: ${themeContext.white}!important;
    border: 1px solid ${themeContext.primaryColor}!important;
   }
   .h5p-true-false-answer:focus {
    box-shadow: 0 0 0 1px ${themeContext.primaryColor}!important;
   }
   .h5p-multichoice .h5p-alternative-container {
    background: ${inputBackground} !important;
    border: 1px solid ${inputBorder}!important;
    box-shadow: none!important;
   }
   .h5p-multichoice .h5p-answer[aria-checked="true"] .h5p-alternative-container {
    color: ${themeContext.primaryColor}!important;
   }
   .h5p-multichoice .h5p-answer .h5p-alternative-container:before {
    color: ${
      themeContext.mode === "dark" ? themeContext.gray4 : themeContext.gray2
    }!important;
    border-radius: ${themeContext.checkboxRadius}!important;
   }
   .h5p-question-feedback {
    color: ${themeContext.primaryColor}!important;
   }
   ul.h5p-sc-alternatives li.h5p-sc-alternative {
    background: ${inputBackground} !important;
    border: 1px solid ${inputBorder}!important;
    box-shadow: none!important;
   }
   li.h5p-sc-alternative .h5p-sc-progressbar {
    background: ${themeContext.primaryColor}!important;
   }
  
   ul.h5p-sc-alternatives.h5p-sc-selected li.h5p-sc-alternative.h5p-sc-reveal-correct, 
   ul.h5p-sc-alternatives.h5p-sc-selected li.h5p-sc-alternative.h5p-sc-reveal-correct:hover, 
   ul.h5p-sc-alternatives.h5p-sc-selected li.h5p-sc-alternative.h5p-sc-reveal-correct:active, 
   ul.h5p-sc-alternatives.h5p-sc-selected li.h5p-sc-alternative.h5p-sc-reveal-correct:focus {
    color: ${themeContext.mode === "dark" ? "lime" : "green"}!important;
   }
   .h5p-image-hotspot-popup {
    background: ${backgroundColor} !important;
    color: ${fontColor}!important;
   }
   .h5p-image-hotspots {
    background-color: ${backgroundColor} !important;
   }
   .h5p-image-hotspot-popup-pointer {
    border-left: 0.6em solid ${backgroundColor}!important;
   }
   .h5p-image-sequencing {
    background: ${backgroundColor} !important;
    color: ${fontColor}!important;
   }
   .h5p-task-description {
    color: ${fontColor}!important;
   }
   .draggabled .image-desc .text {
    color: ${fontColor}!important;
   }
   .h5p-guess-answer {
    background: ${backgroundColor} !important;
   }
   .h5p-content {
    background: ${backgroundColor} !important;
   }
   .h5p-guess-answer-title {
    color: ${fontColor}!important;
   }
   .show-solution-button {
    background: ${themeContext.primaryColor} !important;
    color: ${themeContext.white}!important;
   }
   .solution-text {
    color: ${themeContext.primaryColor}!important;
   }
   .h5p-image-slider-progress-element {
    background: transparent !important;
    border: 1px solid ${themeContext.primaryColor}!important;
    border-radius: ${themeContext.buttonRadius}px!important;
    width: 9px!important;
    height: 9px!important;
   }
   .h5p-image-slider-current-progress-element {
    background: ${themeContext.primaryColor} !important;
   }
  `;
    return `data:text/css;base64,${btoa(css)}`;
  }, [themeContext]);

  return (
    <StyledH5P>
      {(h5p.value || h5pObject) && (
        <Player
          key={h5pThemeCSSOverwriteSrc} // this is required to force a re-render when the theme changes
          h5pObject={h5p.value || h5pObject}
          id={id}
          onXAPI={(event: XAPIEvent) => onXAPI && onXAPI(event)}
          styles={[
            `${window.location.origin}/${overwriteFileName}`,
            h5pThemeCSSOverwriteSrc,
          ]}
        />
      )}
    </StyledH5P>
  );
};

export default withTheme(styled(H5Player)<H5PProps>``);
