import * as React from "react";
import styled from "styled-components";
import { Title } from "../../atoms/Typography/Title";
import { Avatar, AvatarProps } from "../../atoms/Avatar/Avatar";
import { RatingProps, Rating } from "../../atoms/Rating/Rating";
import { ReactNode } from "react";
import { Text } from "../../atoms/Typography/Text";
import { getStylesBasedOnTheme } from "../../../utils/utils";

interface StyledTourProps {
  mobile?: boolean;
}
export interface TutorProps extends StyledTourProps {
  title: ReactNode | string;
  fullName: ReactNode | string;
  avatar: AvatarProps;
  rating: RatingProps;
  description: ReactNode | string;
  coursesInfo?: ReactNode | string;
}

const StyledTutor = styled.div<StyledTourProps>`
  &.lms-tutor {
    max-width: 640px;
    .title {
      margin-bottom: 20px;
    }
    .avatar-row {
      display: inline-flex;
      align-items: ${(props) => (props.mobile ? "center" : "flex-start")};
    }
    .avatar-info {
      margin-left: 20px;
    }
    .ranking-row {
      display: flex;
      ${(props) => {
        if (!props.mobile) {
          return "align-items: center;";
        }
      }}
      flex-direction: ${(props) => (props.mobile ? "column" : "row")};
      margin: 10px 0;
    }
    .course-info {
      color: ${({ theme }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryColor,
          theme.primaryColor,
          "red"
        )};
      margin: ${(props) => (props.mobile ? "0" : "0 0 0 25px")};
      font-weight: 700;
    }
    .description {
      margin-bottom: 16px;
      font-size: 14px;
      line-height: 17px;
      margin-top: 10px;
    }
  }
`;

export const Tutor: React.FC<TutorProps> = (props) => {
  const { title, fullName, avatar, rating, coursesInfo, description, mobile } =
    props;

  return (
    <StyledTutor className="wellms-component lms-tutor" mobile={mobile}>
      <Title as="h3" level={4} className="title">
        {title}
      </Title>
      <div className="avatar-row">
        <Avatar size={"extraLarge"} {...avatar} />
        <div className="avatar-info">
          <Title as="h4" level={4}>
            {fullName}
          </Title>
          <div className="ranking-row">
            <Rating {...rating} label={rating.ratingValue} />
            {coursesInfo && <Text className="course-info">{coursesInfo}</Text>}
          </div>
          {!mobile && <Text className="description">{description}</Text>}
        </div>
      </div>
      {mobile && <Text className="description">{description}</Text>}
    </StyledTutor>
  );
};
