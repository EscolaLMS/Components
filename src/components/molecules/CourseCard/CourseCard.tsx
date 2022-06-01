import { contrast } from "chroma-js";
import * as React from "react";
import { ReactNode, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled, { ThemeContext } from "styled-components";
import { Badge } from "../../atoms/Badge/Badge";
import { Button } from "../../atoms/Button/Button";
import { Card } from "../../atoms/Card/Card";
import {
  ProgressBar,
  ProgressBarProps,
} from "../../atoms/ProgressBar/ProgressBar";
import { RatioBox } from "../../atoms/RatioBox/RatioBox";
import { Text } from "../../atoms/Typography/Text";
import { Title } from "../../atoms/Typography/Title";
import { Link } from "../../atoms/Link/Link";

const IconOpenBook = () => {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 1.98621H6C6.79565 1.98621 7.55871 2.30228 8.12132 2.86489C8.68393 3.42749 9 4.19056 9 4.98621V15.4862C9 14.8895 8.76295 14.3172 8.34099 13.8952C7.91903 13.4733 7.34674 13.2362 6.75 13.2362H1.5V1.98621Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.5 1.98621H12C11.2044 1.98621 10.4413 2.30228 9.87868 2.86489C9.31607 3.42749 9 4.19056 9 4.98621V15.4862C9 14.8895 9.23705 14.3172 9.65901 13.8952C10.081 13.4733 10.6533 13.2362 11.25 13.2362H16.5V1.98621Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

//TODO: add alt to image to api
interface Image {
  path?: string;
  url?: string;
  alt?: string;
}

interface Tag {
  id: number;
  title: string;
}

interface Category {
  id: number;
  name: string;
}

interface Categories {
  onCategoryClick: (id: number) => void;
  categoryElements: Category[];
}

interface StyledCourseCardProps {
  mobile?: boolean;
  hideImage?: boolean;
}

export interface CourseCardProps extends StyledCourseCardProps {
  id: number;
  image?: Image;
  title: ReactNode;
  categories?: Categories;
  tags?: Tag[];
  lessonCount?: number;
  subtitle?: ReactNode;
  //TODO: add params if needed to onImageClick
  onImageClick?: () => void;
  onTagClick?: (tagId: number) => void;
  onButtonClick?: (cardId: number) => void;
  buttonText?: string;
  onSecondaryButtonClick?: () => void;
  secondaryButtonText?: string;
  progress?: ProgressBarProps;
}

const StyledCourseCard = styled("div")<StyledCourseCardProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${(props) => (props.mobile ? "272px" : "100%")};
  flex-shrink: 0;

  .image-section {
    position: relative;
  }
  .information-in-image {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .badges {
    padding: 16px 8px;
    align-self: end;
    display: flex;
    gap: 10px;
    z-index: 1;
  }
  .card {
    padding: 13px 10px;
    font-weight: 700;
    font-size: 14px;
  }
  .image {
    border-radius: ${({ theme }) => theme.cardRadius}px;
  }
  .course-section {
    margin-top: ${(props) => (props.mobile ? "15px" : "28px")};
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .title {
    margin-bottom: 15px;
  }
  .categories {
    font-size: 14px;
    line-height: 17px;
    color: ${(props) =>
      props.hideImage ? props.theme.gray2 : props.theme.gray3};
    margin-bottom: 15px;
  }
  .lesson-container {
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => (props.mobile ? "15px" : "30px")};
  }
  .lessons-count {
    font-weight: 700;
    margin: 0 0 0 10px;
  }
  .category {
    cursor: pointer;
  }
  .tag {
    cursor: pointer;
  }

  .card-subtitle {
    color: ${(props) => {
      return !props.hideImage && props.theme.primaryColor;
    }};
  }

  .course-card-buttons-group {
    margin: -8px;
    width: calc(100% + 16px);
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    > * {
      margin: 8px;
    }
  }

  .card-course-footer {
    margin-top: auto;
  }
`;

export const CourseCard: React.FC<CourseCardProps> = (props) => {
  const {
    id,
    mobile,
    lessonCount,
    title,
    image,
    categories,
    tags = [],
    onImageClick,
    onTagClick,
    onButtonClick,
    onSecondaryButtonClick,
    secondaryButtonText,
    buttonText,
    progress,
    hideImage,
  } = props;

  const theme = React.useContext(ThemeContext);
  const { t } = useTranslation();

  const tagClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
      e.stopPropagation();
      if (onTagClick) {
        onTagClick(id);
      }
    },
    []
  );

  const imageSrc = useMemo(() => {
    if (image) {
      const { path, url } = image;
      return path || url;
    }
  }, [image]);

  const imageSectionProps: React.HTMLAttributes<HTMLDivElement> =
    useMemo(() => {
      if (onImageClick) {
        return {
          onClick: onImageClick,
          onKeyUp: onImageClick,
          role: "button",
          tabIndex: 0,
        };
      }
      return {};
    }, [onImageClick]);

  const renderCourseSection = () => {
    return (
      <>
        <Title level={mobile ? 5 : 4} className="title">
          {title}
        </Title>

        {categories && (
          <Text className="categories">
            {categories.categoryElements.map((category, index) => {
              return (
                <>
                  <span
                    className="category"
                    key={category.id}
                    onClick={() => categories.onCategoryClick(category.id)}
                    onKeyDown={() => categories.onCategoryClick(category.id)}
                    role="button"
                    tabIndex={0}
                  >
                    {category.name}
                  </span>
                  {categories.categoryElements.length !== index + 1 && (
                    <span> / </span>
                  )}
                </>
              );
            })}
          </Text>
        )}
        {lessonCount && (
          <div className="lesson-container">
            <IconOpenBook />
            <Text className="lessons-count">
              {t("CourseCard.lesson", { count: lessonCount })}
            </Text>
          </div>
        )}
        <div className={"card-course-footer"}>
          {progress ? (
            <ProgressBar {...progress} />
          ) : (
            <div className={"course-card-buttons-group"}>
              {onButtonClick && buttonText && (
                <div>
                  <Button mode="secondary" onClick={() => onButtonClick(id)}>
                    {buttonText}
                  </Button>
                </div>
              )}
              {onSecondaryButtonClick && secondaryButtonText && (
                <div>
                  <Link onClick={onSecondaryButtonClick}>
                    {secondaryButtonText}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <StyledCourseCard hideImage={hideImage} mobile={mobile}>
      {!hideImage && (
        <div className="image-section" {...imageSectionProps}>
          <div className="information-in-image">
            <div className="badges">
              {tags.map((tag: Tag) => (
                <Badge
                  className="tag"
                  key={tag.id}
                  onClick={(e) => tagClick(e, tag.id)}
                  color={theme.gray2}
                >
                  {tag.title}
                </Badge>
              ))}
            </div>
            {props.subtitle && (
              <div className="card">
                <Card wings="small">
                  <div className={"card-subtitle"}>{props.subtitle}</div>
                </Card>
              </div>
            )}
          </div>
          <RatioBox ratio={mobile ? 66 / 100 : 1}>
            <img
              className="image"
              src={imageSrc}
              alt={image ? image.alt : undefined}
            />
          </RatioBox>
        </div>
      )}
      {hideImage ? (
        <Card wings="large">{renderCourseSection()}</Card>
      ) : (
        <div className="course-section">{renderCourseSection()}</div>
      )}
    </StyledCourseCard>
  );
};
