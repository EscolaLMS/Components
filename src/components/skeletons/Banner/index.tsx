import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .banner-skeleton__content {
    width: 40%;
  }
  .banner-skeleton__image {
    width: 50%;
  }
`;

export const BannerSkeleton = () => {
  return (
    <SkeletonWrapper className="banner-skeleton">
      <div className="banner-skeleton__content">
        <Skeleton count={4} height={18} />
        <Skeleton style={{ marginTop: "52px" }} height={46} width={210} />
      </div>
      <Skeleton
        height="460px"
        borderRadius={14}
        style={{ marginBottom: "10px" }}
        containerClassName="banner-skeleton__image"
      />
    </SkeletonWrapper>
  );
};
