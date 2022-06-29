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

interface StyledCourseCardProps {
  mobile?: boolean;
  hideImage?: boolean;
}

// type guard
function isCategories(
  categories: Categories | ReactChild
): categories is Categories {
  return !React.isValidElement(categories);
}

export interface CourseCardProps extends StyledCourseCardProps {
  id: number;
  image?: Image;
  title: ReactNode;
  categories?: Categories | ReactChild;
  tags?: Tag[] | ReactChild;
  subtitle?: ReactNode;
  //TODO: add params if needed to onImageClick
  onImageClick?: () => void;
  onTagClick?: (title: string) => void;
  onButtonClick?: (cardId: number) => void;
  buttonText?: string;
  onSecondaryButtonClick?: () => void;
  secondaryButtonText?: string;
  progress?: ProgressBarProps;
  actions?: ReactNode;
  footer?: ReactNode;
}

const StyledCourseCard = styled("div")<StyledCourseCardProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${(props) => (props.mobile ? "272px" : "100%")};
  flex-shrink: 0;

  .image-section {
    position: relative;
    z-index: 0;
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
    z-index: 200;
    flex-wrap: wrap;
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

  /* stylelint-disable */
  .title {
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 75px;

    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  /* stylelint-enable */
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
    display: flex;
    flex-direction: column;
  }
`;

const ImgWrapper = styled.div`
  img {
    cursor: pointer;
    transition: 0.3s transform ease;
    &:hover {
      transform: scale(1.03);
    }
  }
`;

const StyledCategory = styled.span`
  transition: 0.3s color ease-in-out;
  &:hover {
    color: ${(props) => {
      return props.theme.primaryColor;
    }};
  }
`;

export const CourseCard: React.FC<CourseCardProps> = (props) => {
  const {
    id,
    mobile,
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

  const tagClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, title: string) => {
      if (onTagClick) {
        onTagClick(title);
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
                  <React.Fragment key={index}>
                    <StyledCategory
                      className="category"
                      key={category.id}
                      onClick={() => categories.onCategoryClick(category.id)}
                      onKeyDown={() => categories.onCategoryClick(category.id)}
                      role="button"
                      tabIndex={0}
                    >
                      {category.name}
                    </StyledCategory>
                    {categories.categoryElements.length !== index + 1 && (
                      <span> / </span>
                    )}
                  </React.Fragment>
                );
              })}
            </Text>
          )
        )}

        {footer && <footer className="footer">{footer}</footer>}

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
    <StyledCourseCard hideImage={hideImage} mobile={mobile}>
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
                      onClick={(e) => tagClick(e, tag.title)}
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
          <ImgWrapper>
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
          </ImgWrapper>
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
