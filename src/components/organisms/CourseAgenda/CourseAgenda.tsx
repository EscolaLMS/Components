import React from "react";
import styled, { withTheme } from "styled-components";

import { ExtendableStyledComponent } from "types/component";
import { RecursiveLessons } from "./_components/RecursiveLessons";
import {
  CourseAgendaContextProvider,
  CourseAgendaContextProviderProps,
  useCourseAgendaContext,
} from "./_components/context";

type CourseAgendaProps = ExtendableStyledComponent &
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

const CourseAgendaContent: React.FC<ExtendableStyledComponent> = ({
  className = "",
}) => {
  const { lessons } = useCourseAgendaContext();

  return (
    <StyledSection className={`wellms-component ${className}`}>
      <ul className="lessons__list">
        <RecursiveLessons lessons={lessons} />
      </ul>
    </StyledSection>
  );
};

export const CourseAgenda: React.FC<CourseAgendaProps> = ({
  className,
  ...contextProps
}) => (
  <CourseAgendaContextProvider {...contextProps}>
    <CourseAgendaContent className={className} />
  </CourseAgendaContextProvider>
);

const NewComponent = styled(CourseAgenda)<CourseAgendaProps>``;

export default withTheme(NewComponent);
