import * as React from "react";
import { Col, Row } from "react-grid-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button, Modal, ModalNote, Icon } from "../../../";
import chroma from "chroma-js";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { getUniqueId } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";
import { useState } from "react";
import { BookmarkableType } from "@escolalms/sdk/lib/types/api";

interface StyledAsideProps {
  mobile?: boolean;
}

export interface NoteData {
  id: number;
  value: string;
  bookmarkable_id: number;
  bookmarkable_type: BookmarkableType;
}

export interface NewNoteData {
  id: number;
  type: BookmarkableType;
}

export interface CourseTopNavProps
  extends StyledAsideProps,
    ExtendableStyledComponent {
  isFinished: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  currentNote?: NoteData;
  newNoteData?: NewNoteData;
  addNotes: boolean;
  addBookmarks: boolean;
  onBookmarkClick: () => void;
  bookmarkBtnText: "addBookmark" | "deleteBookmark";
  isLast?: boolean;
  onCourseFinished?: () => void;
}

const StyledAside = styled.aside<StyledAsideProps>`
  .toggle-btn-container {
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid
      ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.dm__background, theme.white)};

    svg {
      transform: scale(${(props) => (props.mobile ? "0.8" : "1")});
    }

    button {
      border-radius: 6px 6px 0 0;
      width: ${(props) => (props.mobile ? "60px" : "120px")};
      background: ${({ theme }) =>
        getStylesBasedOnTheme(theme.mode, theme.dm__background, theme.white)};
      color: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryColor,
          theme.primaryColor,
          theme.primaryColor
        )};

      &:hover {
        opacity: 1;

        svg {
          opacity: 0.65;
        }
      }

      &.closed svg {
        transform: scale(${(props) => (props.mobile ? "0.8" : "1")})
          rotate(180deg);
      }
    }
  }

  .course-nav-container {
    margin-top: ${({ mobile }) => (mobile ? "-12px" : "-14px")};
    padding: ${({ mobile }) => (mobile ? "10px" : "15px")};
    background: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.dm__background, theme.white)};
    box-shadow: 0px -4px 24px 0px ${({ theme }) => (theme.mode === "light" ? chroma(theme.black).alpha(0.1).hex() : chroma(theme.white).alpha(0.1).hex())};
  }

  .nav-btn {
    gap: 4px 9px;
    font-size: 12px;
    font-weight: normal;
    min-width: ${({ mobile }) => (mobile ? "30px" : "100px")};

    &[disabled] {
      opacity: 0;
    }
  }

  .nav-finish-btn {
    flex: ${({ mobile }) => (mobile ? "1" : "none")};
    padding-left: ${({ mobile }) => mobile && "10px"};
    padding-right: ${({ mobile }) => mobile && "10px"};
  }

  .note-btn {
    gap: 4px 9px;
  }
`;

const IconNote = () => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5013 0.833374H1.5013C1.28029 0.833374 1.06833 0.921171 0.912046 1.07745C0.755766 1.23373 0.667969 1.44569 0.667969 1.66671V18.3334C0.667969 18.5544 0.755766 18.7663 0.912046 18.9226C1.06833 19.0789 1.28029 19.1667 1.5013 19.1667H13.168C13.2775 19.1663 13.3859 19.1445 13.4871 19.1025C13.5884 19.0607 13.6805 18.9992 13.758 18.9217L17.0913 15.5884C17.2382 15.4264 17.3242 15.2184 17.3346 15V1.66671C17.3346 1.44569 17.2468 1.23373 17.0906 1.07745C16.9343 0.921171 16.7223 0.833374 16.5013 0.833374ZM12.3346 15V17.5H2.33464V2.50004H15.668V14.1667H13.168C12.947 14.1667 12.735 14.2545 12.5787 14.4108C12.4224 14.5671 12.3346 14.779 12.3346 15ZM13.168 8.33337C13.168 8.55439 13.0802 8.76635 12.9239 8.92263C12.7676 9.07891 12.5556 9.16671 12.3346 9.16671H5.66797C5.44696 9.16671 5.23499 9.07891 5.07871 8.92263C4.92243 8.76635 4.83464 8.55439 4.83464 8.33337C4.83464 8.11236 4.92243 7.9004 5.07871 7.74412C5.23499 7.58784 5.44696 7.50004 5.66797 7.50004H12.3346C12.5556 7.50004 12.7676 7.58784 12.9239 7.74412C13.0802 7.9004 13.168 8.11236 13.168 8.33337ZM9.83464 11.6667C9.83464 11.8877 9.74684 12.0997 9.59056 12.256C9.43428 12.4122 9.22232 12.5 9.0013 12.5H5.66797C5.44696 12.5 5.23499 12.4122 5.07871 12.256C4.92243 12.0997 4.83464 11.8877 4.83464 11.6667C4.83464 11.4457 4.92243 11.2337 5.07871 11.0775C5.23499 10.9212 5.44696 10.8334 5.66797 10.8334H9.0013C9.22232 10.8334 9.43428 10.9212 9.59056 11.0775C9.74684 11.2337 9.83464 11.4457 9.83464 11.6667Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CourseTopNav: React.FC<CourseTopNavProps> = (props) => {
  const {
    isFinished = false,
    isLast = false,
    hasNext = true,
    hasPrev = true,
    onNext,
    onPrev,
    onFinish,
    onBookmarkClick,
    newNoteData,
    currentNote,
    addNotes = true,
    addBookmarks = true,
    mobile,
    className = "",
    bookmarkBtnText = "addBookmark",
    onCourseFinished,
  } = props;

  const [isClosed, setIsClosed] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const { t } = useTranslation();

  const renderFinishButton = React.useCallback(() => {
    return (
      <Button
        mode={isFinished ? "secondary" : mobile ? "secondary" : "outline"}
        onClick={() => {
          if (isLast && onCourseFinished) {
            onCourseFinished();
            return;
          }
          onFinish && onFinish();
        }}
        className={"nav-finish-btn"}
        aria-label={
          isFinished ? t("CourseTopNav.finished") : isLast ? t("Course.finishCourse") : t("Course.markAsFinished")
        }
      >
        {isFinished ? t("CourseTopNav.finished") : isLast ? t("Course.finishCourse") : t("Course.markAsFinished")}
      </Button>
    );
  }, [isFinished, t, onFinish, mobile, isLast]);

  const renderNoteButton = React.useCallback(() => {
    return (
      <Button
        mode={mobile ? "outline" : "icon"}
        className="note-btn"
        onClick={() => setShowNoteModal(true)}
        aria-label={t("CourseTopNav.addNote")}
      >
        {!mobile && <IconNote />}
        {t("CourseTopNav.addNote")}
      </Button>
    );
  }, [mobile, t, setShowNoteModal]);

  const renderBookmarkButton = React.useCallback(() => {
    return (
      <Button
        mode={mobile ? "outline" : "icon"}
        className="note-btn"
        onClick={() => onBookmarkClick && onBookmarkClick()}
        aria-label={t(
          `CourseTopNav.${bookmarkBtnText}${mobile ? "Mobile" : ""}`
        )}
      >
        {!mobile && <Icon name="editAlt" />}
        {t(`CourseTopNav.${bookmarkBtnText}${mobile ? "Mobile" : ""}`)}
      </Button>
    );
  }, [mobile, onBookmarkClick, bookmarkBtnText]);

  return (
    <>
      <StyledAside
        aria-label={getUniqueId("aside")}
        mobile={mobile}
        className={`wellms-component ${isClosed ? "closed" : ""} ${className}`}
      >
        <div className="toggle-btn-container">
          <Button
            onClick={() => setIsClosed((prev) => !prev)}
            onKeyDown={() => setIsClosed((prev) => !prev)}
            className={isClosed ? "closed" : ""}
            aria-label={t<string>(isClosed ? "Actions.Show" : "Actions.Hide")}
            mode={"icon"}
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
          </Button>
        </div>
        {!isClosed && (
          <div className="course-nav-container">
            <Row align={"center"}>
              <Col
                xs={addNotes ? (mobile ? 12 : 6) : 12}
                style={{
                  gap: "0 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: addNotes
                    ? mobile
                      ? "space-between"
                      : "start"
                    : "space-between",
                }}
              >
                <Button
                  className="nav-btn"
                  mode="icon"
                  onClick={() => onPrev && onPrev()}
                  disabled={!hasPrev}
                  aria-label={t<string>("Actions.ShowPrevious")}
                >
                  <svg
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

                {renderFinishButton()}

                {addNotes && mobile && renderNoteButton()}
                {addBookmarks && mobile && renderBookmarkButton()}

                <Button
                  className="nav-btn"
                  mode="icon"
                  onClick={() => onNext && onNext()}
                  disabled={!hasNext}
                  aria-label={t<string>("Actions.ShowNext")}
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
              {addNotes && addBookmarks && !mobile && (
                <Col
                  xs={6}
                  style={{
                    textAlign: "right",
                    paddingRight: "60px",
                  }}
                >
                  {renderNoteButton()}
                  {renderBookmarkButton()}
                </Col>
              )}
            </Row>
          </div>
        )}
      </StyledAside>
      <Modal
        visible={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        animation="zoom"
        maskAnimation="fade"
        destroyOnClose={true}
        width={800}
      >
        <ModalNote
          currentNote={currentNote}
          onClose={() => setShowNoteModal(false)}
          newNoteData={newNoteData}
        />
      </Modal>
    </>
  );
};
