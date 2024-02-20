import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";
import { useId } from "react";
import { Col, ScreenClass } from "react-grid-system";

const CardSkeleton = styled.div`
  max-width: 278px;
  min-height: 414px;
`;

type ColProps = React.ComponentProps<typeof Col>;

type Props = {
  count?: number;
  colProps?: Partial<Record<ScreenClass, ColProps | number | "content">>;
};

export const CourseCardSkeleton: React.FC<Props> = ({
  count = 1,
  colProps,
}) => {
  return (
    <>
      {Array.from({ length: count }).map(() =>
        colProps ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Col key={`card-skeleton-${useId()}`} {...colProps}>
            <CardSkeleton>
              <Skeleton
                height="264px"
                borderRadius={14}
                style={{ marginBottom: "10px" }}
              />
              <Skeleton width={146} style={{ marginBottom: "10px" }} />
              <Skeleton count={2} />
            </CardSkeleton>
          </Col>
        ) : (
          <CardSkeleton key={`card-skeleton-${useId()}`}>
            <Skeleton
              height="264px"
              borderRadius={14}
              style={{ marginBottom: "10px" }}
            />
            <Skeleton width={146} style={{ marginBottom: "10px" }} />
            <Skeleton count={2} />
          </CardSkeleton>
        )
      )}
    </>
  );
};
