import React from "react";
import { useTranslation } from "react-i18next";
import styled, { withTheme } from "styled-components";
import type { API } from "@escolalms/sdk/lib";

import type { ExtendableStyledComponent } from "types/component";
import { IconTitle, Icon } from "../../../index";
import { RecursiveLessons } from "./_components/RecursiveLessons";
import { StyledSection } from "./_components/styles";
import type { SharedComponentProps } from "./_components/types";

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
      <ul className="lessons__list">
        <RecursiveLessons
          lessons={lessons}
          onTopicClick={onTopicClick}
          mobile={mobile}
        />
      </ul>
    </StyledSection>
  );
};

const NewComponent = styled(CourseProgram)<Props>``;

export default withTheme(NewComponent);
