import * as React from "react";
import styled from "styled-components";
import { Title } from "../../atoms/Typography/Title";
import {
  ProfileAvatar,
  ProfileAvatarProps,
} from "../../atoms/ProfileAvatar/ProfileAvatar";
import { RatingProps, Rating } from "../../atoms/Rating/Rating";
import { ReactNode } from "react";
import { Text } from "../../atoms/Typography/Text";

export interface TutorProps {
  title: ReactNode | string;
  fullName: ReactNode | string;
  avatar: ProfileAvatarProps;
  rating: RatingProps;
  description: ReactNode | string;
  coursesInfo?: ReactNode | string;
}

const StyledTutor = styled.div`
  &.lms-tutor {
    max-width: 640px;
    .title {
      margin-bottom: 20px;
    }
    .avatar {
      height: auto;
    }
    .avatar-row {
      display: flex;
      align-items: center;
    }
    .avatar-info {
      margin-left: 20px;
    }
    .ranking-row {
      display: flex;
      align-items: center;
      margin: 10px 0;
      @media (max-width: 768px) {
        display: block;
      }
    }
    .course-info {
      color: ${(props) =>
        props.theme.mode !== "dark" ? props.theme.primaryColor : "red"};
      display: inline-block;
      margin: 0 0 0 25px;
      font-weight: 700;
      @media (max-width: 768px) {
        display: block;
        margin: 0;
      }
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
  const { title, fullName, avatar, rating, coursesInfo, description } = props;

  return (
    <StyledTutor className="lms-tutor">
      <Title as="h3" level={4} className="title">
        {title}
      </Title>
      <div className="avatar-row">
        <ProfileAvatar size={"extraLarge"} {...avatar} className="avatar" />
        <div className="avatar-info">
          <Title as="h4" level={4}>
            {fullName}
          </Title>
          <div className="ranking-row">
            <Rating {...rating} label={rating.ratingValue} />
            {coursesInfo && <Text className="course-info">{coursesInfo}</Text>}
          </div>
        </div>
      </div>
      <Text className="description">{description}</Text>
    </StyledTutor>
  );
};
