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
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";

type ImageObject = {
  path?: string;
  url?: string;
  alt: string;
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

export interface CourseCardProps
  extends StyledCourseCardProps,
    ExtendableStyledComponent {
  id: number;
  image?: Image;
  title?: ReactNode;
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
  width: 100%;
  flex-shrink: 0;
  border-radius: 14px;
  border: 1px solid transparent;
  transition: transform 0.3s ease-in-out, border 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  padding: 6px 6px 16px 6px;

  .image-section {
    position: relative;
    z-index: 0;
    border-radius: ${({ theme }) => theme.cardRadius}px;
    overflow: hidden;
    transform: rotate(0);
    a > div {
      height: 100%;
    }

    img {
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }
  }
  .information-in-image {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .badges {
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
    margin-top: ${(props) => (props.mobile ? "15px" : " 8px")};
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .card-subtitle {
    color: ${({ theme, hideImage }) =>
      !hideImage &&
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
    & > a {
      color: ${({ theme, hideImage }) =>
        !hideImage &&
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__primaryColor,
          theme.primaryColor,
          theme.primaryColor
        )};
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
    min-height: 60px;

    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  /* stylelint-enable */
  .categories {
    min-height: 20px;
    color: ${({ theme }) => theme.textColor};
    font-family: ${({ theme }) => theme.font};
    margin-bottom: 7px;
    margin-top: 10px;
    width: fit-content;
    text-transform: uppercase;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    * {
      font-size: 18px;
      line-height: 17px;
      color: ${({ theme, hideImage }) =>
        getStylesBasedOnTheme(
          theme.mode,
          theme.dm__breadcrumbsColor,
          theme.textColor,
          hideImage ? theme.gray2 : theme.gray3
        )};
    }
    span {
      padding: 2px 4px;
      background-color: ${({ theme }) => theme.secondaryColor};
      border-radius: 3px;
      font-size: 11px;
    }
  }
  .footer,
  .lesson-container {
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => (props.mobile ? "15px" : "10px")};
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

  .escolalms-image {
    height: 100%;
  }
  &:hover {
    border: ${(props) =>
      props.mobile ? "none" : `1px solid ${props.theme.gray3}`};
    box-shadow: ${(props) =>
      props.mobile ? "none" : `0px 5px 15px #00000012`};

    .image-section {
      img {
        transform: scale(1.1) !important;
      }
    }

    .course-price {
      transform: translateY(0);
    }
  }
`;

const ImgWrapper = styled.div`
  img {
    cursor: pointer;
    transition: 0.3s transform ease;
    border-radius: ${({ theme }) => theme.cardRadius}px;
    &:hover {
      /* transform: scale(1.03); */
    }
  }
`;

const StyledCategory = styled.span`
  transition: 0.3s color ease-in-out;
  &:hover {
    color: ${({ theme }) =>
      getStylesBasedOnTheme(
        theme.mode,
        theme.dm__primaryColor,
        theme.primaryColor,
        theme.primaryColor
      )};
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
    className = "",
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
          tabIndex: 0,
        };
      }
      return {};
    }, [onImageClick]);

  const renderCourseSection = () => {
    return (
      <>
        <div className="categories">
          {React.isValidElement(categories) ? (
            <>{categories}</>
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
                        onKeyDown={() =>
                          categories.onCategoryClick(category.id)
                        }
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
        </div>

        {React.isValidElement(title) ? (
          title
        ) : (
          <Title level={mobile ? 5 : 4} as="h1" className="title">
            {title}
          </Title>
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
    <StyledCourseCard
      className={`wellms-component ${className}`}
      hideImage={hideImage}
      mobile={mobile}
    >
      {!hideImage && (
        <div className="image-section">
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
          {!hideImage && tags && (
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
              {/* {props.subtitle && (
              <div className="card">
                <Card wings="small">
                  <div className={"card-subtitle"}>{props.subtitle}</div>
                </Card>
              </div>
            )} */}
            </div>
          )}
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
