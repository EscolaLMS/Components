import React, { useCallback, useEffect, useRef, useState } from "react";
import { API } from "@escolalms/sdk/lib";
import { Row } from "../../../../";
import styled, { css, withTheme } from "styled-components";
import { GiftQuizMatchingAnswer } from "types/gift-quiz";
import { BezierLine } from "../../../../utils/bezierLine";
import DefaultQuestionLayout from "../DefaultQuestionLayout";
import { getStylesBasedOnTheme } from "../../../../utils/utils";
import { default as chroma } from "chroma-js";

const MatcherWrapper = styled.div`
  position: relative;
`;

const StyledRow = styled(Row)`
  & ul {
    padding: 0px;
  }
  & svg {
    color: ${({ theme }) => chroma(theme.primaryColor).alpha(0.5).css()};
  }
`;

const circle = css`
  position: absolute;
  height: 8px;
  width: 8px;
  top: 42%;
  background-color: ${({ theme }) =>
    getStylesBasedOnTheme(
      theme.mode,
      theme.dm__cardBackgroundColor,
      theme.cardBackgroundColor
    )};
  border-radius: 50%;
`;

const StartCircle = styled.div<{ checked?: boolean }>`
  ${circle};
  right: -4px;
  border: 1px solid
    ${({ theme, checked }) =>
      checked
        ? getStylesBasedOnTheme(
            theme.mode,
            theme.dm__primaryColor,
            theme.primaryColor,
            theme.primaryColor
          )
        : chroma(theme.primaryColor).alpha(0.5).css()};
`;

const EndCircle = styled.div<{ checked?: boolean }>`
  ${circle};
  left: -4px;
  border: 1px solid
    ${({ theme, checked }) =>
      checked
        ? getStylesBasedOnTheme(
            theme.mode,
            theme.dm__primaryColor,
            theme.primaryColor,
            theme.primaryColor
          )
        : chroma(theme.primaryColor).alpha(0.5).css()};
`;

const OptionListItem = styled.li<{
  checked?: boolean;
  disabled?: boolean;
}>`
  position: relative;
  padding: 16px;
  border: 1px solid
    ${({ theme, checked }) =>
      checked
        ? getStylesBasedOnTheme(
            theme.mode,
            theme.dm__primaryColor,
            theme.primaryColor,
            theme.primaryColor
          )
        : chroma(theme.primaryColor).alpha(0.5).css()};
  border-radius: 32px;
  text-align: center;
  list-style: none;
  margin: 16px 0;
  z-index: 99;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  transition: 0.3s;
`;

const getDefaultValues = (
  questions: string[],
  values: Record<string, string>
): ConnectedOptions[] =>
  (questions ?? [])?.map((name) => ({
    startOption: { name, x: 0, y: 0 },
    endOption: values[name] ? { name: values[name], x: 0, y: 0 } : null,
  }));

const createStartOptionObj = (
  elArr: HTMLElement[]
): Record<string, SelectedOption> =>
  elArr.reduce(
    (acc, el) => ({
      ...acc,
      [el.id]: {
        name: el.id,
        x: el?.offsetWidth,
        y: el?.offsetTop + el?.offsetHeight / 2,
      },
    }),
    {}
  );

const createEndOptionObj = (
  elArr: HTMLElement[],
  container: HTMLDivElement
): Record<string, SelectedOption> =>
  elArr.reduce(
    (acc, el) => ({
      ...acc,
      [el.id]: {
        name: el.id,
        x: container.offsetWidth - el.offsetWidth,
        y: el.offsetTop + el.offsetHeight / 2,
      },
    }),
    {}
  );

interface SelectedOption {
  name: string;
  x: number;
  y: number;
}

interface ConnectedOptions {
  startOption: SelectedOption;
  endOption?: SelectedOption | null;
}

interface Props extends API.QuizQuestion_Matching {
  onChange: (values: GiftQuizMatchingAnswer) => void;
  values: Record<string, string>;
  resultScore?: number | null;
  hasQuizEnded?: boolean;
}

const Matching: React.FC<Props> = ({
  question,
  options,
  onChange,
  title,
  values,
  hasQuizEnded,
  resultScore,
}) => {
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(
    null
  );
  const [connectedOptions, setConnectedOptions] = useState<ConnectedOptions[]>(
    getDefaultValues(options?.sub_questions, values)
  );

  const refContainer = useRef<HTMLDivElement>(null);
  const startOptionsListRef = useRef<HTMLUListElement>(null);
  const endOptionsListRef = useRef<HTMLUListElement>(null);

  const handleSelectOptionFactory = useCallback(
    (name: string) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      if (!hasQuizEnded) {
        const startOption = {
          name,
          x: e.currentTarget.offsetWidth,
          y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight / 2,
        };

        setSelectedOption(startOption);

        setConnectedOptions((prev) =>
          prev.map((connectedOptions) =>
            connectedOptions.startOption.name === name
              ? { startOption, endOption: connectedOptions.endOption }
              : connectedOptions
          )
        );
      }
    },
    [hasQuizEnded]
  );

  const selectHandlerFactory = useCallback(
    (name: string) => {
      return (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if (refContainer.current && !hasQuizEnded) {
          const selectedEndOption = {
            name,
            x: refContainer.current!.offsetWidth - e.currentTarget.offsetWidth,
            y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight / 2,
          };
          setConnectedOptions((prev) =>
            prev.map(({ startOption, endOption }) =>
              startOption.name === selectedOption?.name
                ? {
                    startOption,
                    endOption: selectedEndOption,
                  }
                : { startOption, endOption }
            )
          );

          setSelectedOption(null);
        }
      };
    },
    [hasQuizEnded, selectedOption?.name]
  );

  const redrawLines = useCallback(() => {
    if (
      startOptionsListRef.current &&
      endOptionsListRef.current &&
      refContainer.current
    ) {
      const startOptionsElsArr = Array.from(
        startOptionsListRef.current.children
      ) as HTMLElement[];
      const endOptionsElsArr = Array.from(
        endOptionsListRef.current.children
      ) as HTMLElement[];

      const startOptionObj = createStartOptionObj(startOptionsElsArr);
      const endOptionObj = createEndOptionObj(
        endOptionsElsArr,
        refContainer.current
      );

      setConnectedOptions((prev) =>
        prev.map(({ startOption, endOption }) => ({
          startOption: startOptionObj[startOption.name],
          endOption: endOption?.name ? endOptionObj[endOption.name] : endOption,
        }))
      );
    }
  }, []);

  useEffect(() => {
    onChange({
      matching: connectedOptions.reduce<Record<string, string>>(
        (acc, curr) => ({
          ...acc,
          [curr.startOption.name]: curr.endOption?.name ?? "",
        }),
        {}
      ),
    });
  }, [connectedOptions]);

  useEffect(() => {
    const isStateReset = Object.values(values).length === 0;

    if (isStateReset) {
      setConnectedOptions(getDefaultValues(options.sub_questions, values));
    }
  }, [options, values]);

  useEffect(() => {
    redrawLines();
  }, [redrawLines]);

  return (
    <DefaultQuestionLayout
      data-testid={`matching-${question}`}
      title={title}
      question={question}
      resultScore={resultScore}
      showScore={hasQuizEnded}
    >
      <MatcherWrapper ref={refContainer}>
        <StyledRow $justifyContent="space-between">
          <ul ref={startOptionsListRef}>
            {options?.sub_questions.map((name) => (
              <OptionListItem
                key={name}
                className={name}
                id={name}
                disabled={hasQuizEnded}
                onClick={handleSelectOptionFactory(name)}
                checked={selectedOption?.name === name}
              >
                <StartCircle checked={selectedOption?.name === name} />
                {name}
              </OptionListItem>
            ))}
          </ul>
          {connectedOptions.map(
            (item, index) =>
              item.endOption && (
                <BezierLine
                  key={index}
                  x1={item.startOption.x}
                  x2={item.endOption.x}
                  y1={item.startOption.y}
                  y2={item.endOption.y}
                />
              )
          )}
          <ul ref={endOptionsListRef}>
            {options?.sub_answers.map((name) => (
              <OptionListItem
                key={name}
                id={name}
                className={name}
                disabled={hasQuizEnded}
                onClick={selectHandlerFactory(name)}
              >
                <EndCircle />
                {name}
              </OptionListItem>
            ))}
          </ul>
        </StyledRow>
      </MatcherWrapper>
    </DefaultQuestionLayout>
  );
};

export default withTheme(styled(Matching)``);
