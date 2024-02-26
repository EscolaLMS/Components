import * as React from "react";
import { ReactNode, ReactChild, useMemo } from "react";
import styled from "styled-components";
import { ProgressBarProps } from "../../atoms/ProgressBar/ProgressBar";
import { RatioBox } from "../../atoms/RatioBox/RatioBox";
import { getStylesBasedOnTheme } from "../../../utils/utils";
import { ExtendableStyledComponent } from "types/component";
import { Text } from "../../../";

type ImageObject = {
  path?: string;
  url?: string;
  alt: string;
};
type Image = ImageObject | ReactChild;

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
  categories: Categories | React.ReactChild | string
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
  onImageClick?: () => void;
  progress?: ProgressBarProps;
  price?: ReactNode;
}

const StyledCourseCard = styled("div")<StyledCourseCardProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 14px;
  border: 1px solid transparent;
  transition: transform 0.3s ease-in-out, border 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  padding: 6px 6px 16px 6px;
  overflow: hidden;

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

  .course-section {
    margin-top: ${(props) => (props.mobile ? "15px" : "28px")};
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .course-card__content {
    padding: 0px 15px;

    @media (max-width: 768px) {
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .course-title {
    margin-bottom: 46px;
    margin-bottom: ${(props) => (props.mobile ? "0px" : `45px`)};
  }
  .title {
    margin-top: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: ${(props) => (props.mobile ? "10px" : `45px`)};
  }

  .categories {
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
          theme.breadcrumbsColor,
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

  .escolalms-image {
    height: 100%;
    overflow: hidden;
  }
  .course-price {
    transition: transform 0.3s ease-in-out;
    transform: ${(props) =>
      props.mobile ? "translateY(0px)" : "translateY(+120px)"};
    color: ${({ theme }) => theme.primaryColor};
    font-weight: 700;
    font-family: ${({ theme }) => theme.font};
    p {
      color: ${({ theme }) => theme.primaryColor};
      font-weight: 700;
      margin: 0px;
    }
    .pricing-card-discount {
      text-decoration: line-through;
    }
    > div {
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }
  }
  &:hover {
    border: ${(props) =>
      props.mobile ? "none" : `1px solid ${props.theme.gray3}`};
    box-shadow: ${(props) =>
      props.mobile ? "none" : `0px 5px 15px #00000012`};
    transform: ${(props) => (props.mobile ? "none" : "translateY(-7px)")};

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

export const NewCourseCard: React.FC<CourseCardProps> = (props) => {
  const {
    mobile,
    title,
    image,
    categories,
    onImageClick,
    hideImage,
    className = "",
    price = "19.22",
  } = props;

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

  return (
    <StyledCourseCard
      className={`wellms-component ${className}`}
      hideImage={hideImage}
      mobile={mobile}
    >
      {!hideImage && (
        <div className="image-section">
          <RatioBox ratio={mobile ? 75 / 100 : 1}>
            {React.isValidElement(image) ? (
              image
            ) : (
              <div className="escolalms-image">
                <img
                  {...imageSectionProps}
                  className="image"
                  src={imageSrc}
                  alt={image ? (image as ImageObject).alt : undefined}
                />
              </div>
            )}
          </RatioBox>
        </div>
      )}
      <div className="course-card__content">
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
        <div className="course-title">{title}</div>
        <div className="course-price">{price}</div>
      </div>
    </StyledCourseCard>
  );
};
