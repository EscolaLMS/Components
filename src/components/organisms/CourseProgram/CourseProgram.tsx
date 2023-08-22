import React from "react";
import { useTranslation } from "react-i18next";
import styled, { withTheme } from "styled-components";
import type { API } from "@escolalms/sdk/lib";

import type { ExtendableStyledComponent } from "types/component";
import { IconTitle, Icon } from "../../../index";
import type { SharedComponentProps } from "./_components/types";
import { StyledSection } from "./_components/styles";
import { CourseProgramLesson } from "./_components/CourseProgramLesson";

interface Props extends SharedComponentProps, ExtendableStyledComponent {
  lessons: API.Lesson[];
}

export const CourseProgram: React.FC<Props> = ({
  lessons,
  onTopicClick,
  mobile = false,
  className = "",
}) => {
  const { t } = useTranslation();

  return (
    <StyledSection $mobile={mobile} className={`wellms-component ${className}`}>
      {!mobile && (
        <header>
          <IconTitle
            level={5}
            as="h1"
            icon={<Icon name="program" />}
            title={t<string>("Course.Agenda")}
          />
        </header>
      )}
      <article>
        {lessons.map((lesson, index) => (
          <CourseProgramLesson
            defaultOpen={true}
            key={lesson.id}
            index={index}
            {...{
              lesson,
              onTopicClick,
            }}
          />
        ))}
      </article>
    </StyledSection>
  );
};

const NewComponent = styled(CourseProgram)<Props>``;

export default withTheme(NewComponent);
