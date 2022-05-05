import * as React from "react";

import styled, { withTheme } from "styled-components";

import Button from "../../atoms/Button/Button";

export interface ComponentProps {
  isFinished: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}

const StyledDiv = styled.aside<ComponentProps>`
  font-size: 16px;
  &.closed > button.toggle-btn {
    transform: rotate(180deg);
  }
`;

export const CourseTopNav: React.FC<ComponentProps> = (props) => {
  const {
    isFinished = false,
    hasNext = true,
    hasPrev = true,
    onNext,
    onPrev,
    onFinish,
  } = props;

  const [isClosed, setIsClosed] = React.useState<boolean>(false);

  // TODO add react-i18n
  return (
    <StyledDiv {...props} className={isClosed ? "closed" : ""}>
      <button
        onClick={() => setIsClosed((prev) => !prev)}
        className="toggle-btn"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.527294 0.195262C0.787643 -0.0650874 1.20975 -0.0650873 1.4701 0.195262L4.9987 3.72386L8.5273 0.195263C8.78764 -0.0650861 9.20975 -0.065086 9.4701 0.195264C9.73045 0.455613 9.73045 0.877723 9.4701 1.13807L5.4701 5.13807C5.20975 5.39842 4.78764 5.39842 4.52729 5.13807L0.527294 1.13807C0.266944 0.877721 0.266944 0.455611 0.527294 0.195262ZM0.527293 4.19526C0.787643 3.93491 1.20975 3.93491 1.4701 4.19526L4.9987 7.72386L8.52729 4.19526C8.78764 3.93491 9.20975 3.93491 9.4701 4.19526C9.73045 4.45561 9.73045 4.87772 9.4701 5.13807L5.4701 9.13807C5.20975 9.39842 4.78764 9.39842 4.52729 9.13807L0.527293 5.13807C0.266944 4.87772 0.266944 4.45561 0.527293 4.19526Z"
            fill="#BDBDBD"
          />
        </svg>
      </button>
      {!isClosed && (
        <div>
          {hasPrev && (
            <Button mode="outline" onClick={() => onPrev && onPrev()}>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.70711 0.292893C8.09763 0.683418 8.09763 1.31658 7.70711 1.70711L2.41421 7L7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L0.292893 7.70711C-0.0976318 7.31658 -0.0976317 6.68342 0.292893 6.29289L6.29289 0.292893C6.68342 -0.0976312 7.31658 -0.0976311 7.70711 0.292893Z"
                  fill="white"
                />
              </svg>{" "}
              Prev
            </Button>
          )}
          <Button
            mode={isFinished ? "secondary" : "outline"}
            onClick={() => onFinish && onFinish()}
          >
            {isFinished ? "Zakoczony" : "Oznacz jako zakonczony"}
          </Button>
          {hasNext && (
            <Button mode="outline" onClick={() => onNext && onNext()}>
              Next{" "}
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.292893 13.7071C-0.0976311 13.3166 -0.0976312 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976317 1.31658 -0.0976317 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071Z"
                  fill="white"
                />
              </svg>
            </Button>
          )}
        </div>
      )}
    </StyledDiv>
  );
};

const NewComponent = styled(CourseTopNav)<ComponentProps>``;

// Main button with styles
export default withTheme(NewComponent);
