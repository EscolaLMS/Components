import * as React from "react";
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
  .course-nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ mobile }) => (mobile ? "10px" : "15px")};
    background: ${({ theme }) =>
      getStylesBasedOnTheme(theme.mode, theme.dm__background, theme.white)};
    box-shadow: 0px -3px 10px ${({ theme }) => (theme.mode === "light" ? chroma(theme.black).alpha(0.1).hex() : chroma(theme.white).alpha(0.1).hex())};
  }

  .course-nav-middle-btns {
    display: flex;
    gap: 10px;
  }

  .icon-btn {
    display: flex;
    align-items: center;
    gap: 8px;

    picture {
      display: flex;
      align-items: center;
    }
  }

  .prev-btn {
    gap: 20px;
  }

  .next-btn {
    gap: 86px;
  }

  .mark-btn {
    border-color: ${({ theme }) => theme.positive};
    opacity: 0.65;

    &:hover {
      opacity: 1;
    }
  }
`;

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

  const [showNoteModal, setShowNoteModal] = useState(false);
  const { t } = useTranslation();

  const renderFinishButton = React.useCallback(() => {
    if (!isLast && isFinished) {
      return (
        <Button
          mode={"primary"}
          className="icon-btn next-btn"
          onClick={() => onNext && onNext()}
          disabled={!hasNext}
          aria-label={t<string>("Actions.ShowNext")}
        >
          {!mobile && <>{t<string>("CourseTopNav.next")} </>}
          <Icon name="chevronRight" />
        </Button>
      );
    }
    if (isLast) {
      return (
        <Button
          mode={"primary"}
          onClick={() => {
            if (onCourseFinished) {
              onCourseFinished();
            }
          }}
          aria-label={t("Course.finishCourse")}
        >
          {t("Course.finishCourse")}
        </Button>
      );
    }
    return (
      <Button
        mode={"outline"}
        className="icon-btn mark-btn"
        onClick={() => {
          onFinish && onFinish();
        }}
        aria-label={t("Course.markAsFinished")}
      >
        <Icon name="finished" />
        {t("Course.markAsFinished")}
      </Button>
    );
  }, [isFinished, t, onFinish, mobile, isLast]);

  const renderNoteButton = React.useCallback(() => {
    return (
      <Button
        mode={"icon"}
        className="icon-btn"
        onClick={() => setShowNoteModal(true)}
        aria-label={t("CourseTopNav.addNote")}
      >
        <Icon name="note" />
        {!mobile && t("CourseTopNav.addNote")}
      </Button>
    );
  }, [mobile, t, setShowNoteModal]);

  const renderBookmarkButton = React.useCallback(() => {
    return (
      <Button
        mode={"icon"}
        className="icon-btn"
        onClick={() => onBookmarkClick && onBookmarkClick()}
        aria-label={t(`CourseTopNav.${bookmarkBtnText}`)}
      >
        <Icon name="bookmark" />
        {!mobile && t(`CourseTopNav.${bookmarkBtnText}`)}
      </Button>
    );
  }, [mobile, onBookmarkClick, bookmarkBtnText]);

  return (
    <>
      <StyledAside
        aria-label={getUniqueId("aside")}
        mobile={mobile}
        className={`wellms-component ${className}`}
      >
        <div className="course-nav-container">
          <Button
            className="icon-btn prev-btn"
            mode="gray"
            onClick={() => onPrev && onPrev()}
            disabled={!hasPrev}
            aria-label={t<string>("Actions.ShowPrevious")}
          >
            <Icon name="chevronLeft" />
            {!mobile && <>{t<string>("CourseTopNav.prev")} </>}
          </Button>

          <div className="course-nav-middle-btns">
            {addNotes && renderNoteButton()}
            {addBookmarks && renderBookmarkButton()}
          </div>

          {renderFinishButton()}
        </div>
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
