import * as React from "react";
import { Col, Row } from "react-grid-system";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

import { Button } from "../../atoms/Button/Button";

interface StyledAsideProps {
  mobile?: boolean;
}

export interface CourseTopNavProps extends StyledAsideProps {
  isFinished: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  addNotes: boolean;
  onNoteClick: () => void;
}

const StyledAside = styled.aside<StyledAsideProps>`
  font-size: 16px;
  .toggle-btn-container {
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: 2px solid
      ${(props) =>
        props.theme.mode !== "dark"
          ? props.theme.backgroundLightCourseNav
          : props.theme.backgroundDarkCourseNav};
  }
  button {
    height: 100%;
  }
  .toggle-btn {
    border-radius: 6px 6px 0 0;
    height: 16px;
    width: ${(props) => (props.mobile ? "60px" : "120px")};
    background: ${(props) =>
      props.theme.mode !== "dark"
        ? props.theme.backgroundLightCourseNav
        : props.theme.backgroundDarkCourseNav};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${(props) =>
      props.theme.mode !== "dark" ? props.theme.errorColor : props.theme.gray3};
  }
  &.closed {
    .toggle-btn-container {
      border-bottom-width: 6px;
    }
    .toggle-btn {
      height: 24px;
      svg {
        transform: rotate(180deg);
      }
    }
  }
  .course-nav-container {
    padding: ${(props) => (props.mobile ? "10px 0" : "15px 0")};
    background: ${(props) =>
      props.theme.mode !== "dark"
        ? props.theme.backgroundLightCourseNav
        : props.theme.backgroundDarkCourseNav};
  }
  .col-mid-actions {
    text-align: center;
    display: flex;
    justify-content: space-around;
    button {
      ${(props) => {
        if (props.mobile) {
          return `
            padding: 6px 13px;
          `;
        }
      }}
    }
  }
  .col-next {
    text-align: right;
  }
  .prev-btn,
  .next-btn {
    ${(props) => {
      if (props.mobile) {
        return `padding: 0;`;
      }
    }}
  }
  .icon-prev {
    ${(props) => {
      if (!props.mobile) {
        return ` margin-left: 0`;
      }
    }};
  }
  .icon-next {
    ${(props) => {
      if (!props.mobile) {
        return ` margin-right: 0`;
      }
    }};
  }
  .text-center {
    text-align: center;
  }
`;

export const CourseTopNav: React.FC<CourseTopNavProps> = (props) => {
  const {
    isFinished = false,
    hasNext = true,
    hasPrev = true,
    onNext,
    onPrev,
    onFinish,
    onNoteClick,
    addNotes,
    mobile,
  } = props;

  const [isClosed, setIsClosed] = React.useState<boolean>(false);
  const { t } = useTranslation();

  const renderFinishButton = () => {
    return (
      <Button
        mode={isFinished ? "secondary" : "outline"}
        onClick={() => onFinish && onFinish()}
      >
        {isFinished
          ? t("CourseTopNav.finished")
          : t("CourseTopNav.finishLesson")}
      </Button>
    );
  };

  return (
    <StyledAside mobile={mobile} className={isClosed ? "closed" : ""}>
      <div className="toggle-btn-container">
        <span
          className="toggle-btn"
          onClick={() => setIsClosed((prev) => !prev)}
          onKeyDown={() => setIsClosed((prev) => !prev)}
          role="button"
          tabIndex={0}
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
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
      {!isClosed && (
        <Row className="course-nav-container">
          <Col xs={addNotes ? 2 : 3}>
            <Button
              className="prev-btn"
              mode="outline"
              onClick={() => onPrev && onPrev()}
              disabled={!hasPrev}
            >
              <svg
                className="icon-prev"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.70711 0.292893C8.09763 0.683418 8.09763 1.31658 7.70711 1.70711L2.41421 7L7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L0.292893 7.70711C-0.0976318 7.31658 -0.0976317 6.68342 0.292893 6.29289L6.29289 0.292893C6.68342 -0.0976312 7.31658 -0.0976311 7.70711 0.292893Z"
                  fill="currentColor"
                />
              </svg>
              {!mobile && <>{t<string>("CourseTopNav.prev")} </>}
            </Button>
          </Col>
          <Col xs={addNotes ? 8 : 6} className="col-mid-actions">
            {addNotes ? (
              <>
                <Button
                  mode="outline"
                  onClick={() => onNoteClick && onNoteClick()}
                >
                  {t(`CourseTopNav.addNote${mobile ? "Mobile" : ""}`)}
                </Button>
                {renderFinishButton()}
              </>
            ) : (
              renderFinishButton()
            )}
          </Col>
          <Col xs={addNotes ? 2 : 3} className="col-next">
            <Button
              className="next-btn"
              mode="outline"
              onClick={() => onNext && onNext()}
              disabled={!hasNext}
            >
              {!mobile && <>{t<string>("CourseTopNav.next")} </>}
              <svg
                className="icon-next"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.292893 13.7071C-0.0976311 13.3166 -0.0976312 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976317 1.31658 -0.0976317 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </Col>
        </Row>
      )}
    </StyledAside>
  );
};