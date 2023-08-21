import React from "react";
import { useTranslation } from "react-i18next";
import styled, { withTheme } from "styled-components";

import { ExtendableStyledComponent } from "types/component";
import { IconTitle, ProgressRing, Text } from "../../../index";
import { ProgramIcon } from "./_components/Icons";
import { RecursiveLessons } from "./_components/RecursiveLessons";
import {
  CourseAgendaContextProvider,
  CourseAgendaContextProviderProps,
  useCourseAgendaContext,
} from "./context";

interface CourseAgendaContentProps extends ExtendableStyledComponent {
  mobile?: boolean;
}

type CourseAgendaProps = CourseAgendaContentProps &
  Omit<CourseAgendaContextProviderProps, "children">;

const StyledSection = styled("section")`
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  & > header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
    margin-bottom: 20px;

    .lms-icon-title {
      margin: 0;
      flex-wrap: nowrap;
    }
    & > div {
      display: inline-flex;
      align-items: center;

      p {
        margin-right: 6px;
      }
    }
  }

  & > .lessons__list {
    padding-left: 0;
    list-style: none;
  }
`;

const CourseAgendaContent: React.FC<CourseAgendaContentProps> = ({
  mobile = false,
  className = "",
}) => {
  const { t } = useTranslation();
  const { percentage, lessons } = useCourseAgendaContext();

  return (
    <StyledSection className={`wellms-component ${className}`}>
      {!mobile && (
        <header>
          <IconTitle
            level={5}
            as="h1"
            icon={<ProgramIcon />}
            title={t<string>("Course.Agenda")}
          />
          <div>
            <Text mode="secondary" size="14" noMargin>
              {t<string>("Course.Finished")} {percentage}%
            </Text>
            <ProgressRing percentage={percentage} />
          </div>
        </header>
      )}
      <ul className="lessons__list">
        <RecursiveLessons lessons={lessons} />
      </ul>
    </StyledSection>
  );
};

export const CourseAgenda: React.FC<CourseAgendaProps> = ({
  className,
  mobile,
  ...contextProps
}) => (
  <CourseAgendaContextProvider {...contextProps}>
    <CourseAgendaContent className={className} mobile={mobile} />
  </CourseAgendaContextProvider>
);

const NewComponent = styled(CourseAgenda)<CourseAgendaProps>``;

export default withTheme(NewComponent);
