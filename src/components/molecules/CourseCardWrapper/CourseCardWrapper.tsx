import * as React from "react";
import { ReactNode, ReactChild, useMemo, useCallback } from "react";
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

type ImageObject = {
  path?: string;
  url?: string;
  alt?: string;
};
type Image = ImageObject | ReactChild;

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

interface StyledCourseCardWrapperProps {
  mobile?: boolean;
  hideImage?: boolean;
}

// type guard
function isCategories(
  categories: Categories | ReactChild
): categories is Categories {
  return !React.isValidElement(categories);
}

export interface CourseCardWrapperProps extends StyledCourseCardWrapperProps {
  id: number;
  image?: Image;
  title: ReactNode;
  categories?: Categories | ReactChild;
  tags?: Tag[] | ReactChild;
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
  actions?: ReactNode;
  footer?: ReactNode;
}

const StyledCourseCardWrapper = styled("div")<StyledCourseCardWrapperProps>`
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
  .card-subtitle {
    color: ${(props) => !props.hideImage && props.theme.primaryColor};
    & > a {
      color: ${(props) => !props.hideImage && props.theme.primaryColor};

      text-decoration: none;
    }
    & > a:hover {
      text-decoration: underline;
    }
  }

  .title {
    margin-bottom: 15px;
    /* stylelint-disable */
    a {
      text-decoration: none;
      /* stylelint-disable */
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .categories {
    font-size: 14px;
    line-height: 17px;
    color: ${(props) =>
      props.hideImage ? props.theme.gray2 : props.theme.gray3};
    margin-bottom: 15px;
    * {
      font-size: 14px;
      line-height: 17px;
      color: ${(props) =>
        props.hideImage ? props.theme.gray2 : props.theme.gray3};
    }
  }
  .footer,
  .lesson-container {
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => (props.mobile ? "15px" : "30px")};
    gap: ${(props) => (props.mobile ? "15px" : "30px")};
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

export const CourseCardWrapper: React.FC<CourseCardWrapperProps> = (props) => {
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
    actions,
    footer,
  } = props;

  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    console.warn("dont use lessonCount is DECREPITATED");
  }, [lessonCount]);

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
    if (image && ((image as ImageObject).path || (image as ImageObject).url)) {
      const { path, url } = image as ImageObject;
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

        {React.isValidElement(categories) ? (
          <div className="categories">{categories}</div>
        ) : (
          categories &&
          isCategories(categories) && (
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
          )
        )}

        {footer && <footer className="footer">{footer}</footer>}

        {/** TODO remove this is future as well as lessonCount props */}
        {/*lessonCount && ( 
          <div className="lesson-container">
            <IconOpenBook />
            <Text className="lessons-count" size={"14"}>
              {t<string>("CourseCardWrapper.lesson", { count: lessonCount })}
            </Text>
          </div>
        )*/}
        <div className={"card-course-footer"}>
          {actions && (
            <div className={"course-card-buttons-group"}>{actions}</div>
          )}
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
    <StyledCourseCardWrapper hideImage={hideImage} mobile={mobile}>
      {!hideImage && (
        <div className="image-section">
          <div className="information-in-image">
            <div className="badges">
              {React.isValidElement(tags)
                ? tags
                : Array.isArray(tags) &&
                  tags.map((tag: Tag) => (
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
            {React.isValidElement(image) ? (
              image
            ) : (
              <img
                {...imageSectionProps}
                className="image"
                src={imageSrc}
                alt={image ? (image as ImageObject).alt : undefined}
              />
            )}
          </RatioBox>
        </div>
      )}
      {hideImage ? (
        <Card wings="large">{renderCourseSection()}</Card>
      ) : (
        <div className="course-section">{renderCourseSection()}</div>
      )}
    </StyledCourseCardWrapper>
  );
};
