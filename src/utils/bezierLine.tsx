import { FC } from "react";

interface BezierProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export const BezierLine: FC<BezierProps> = ({ x1, y1, x2, y2 }) => {
  const cy = (y1 + y2) / 2;
  const cx = (x1 + x2) / 4;
  const path = `M ${x1} ${y1} Q ${cx} ${y1}, ${2 * cx} ${cy} T ${x2} ${y2}`;

  return (
    <svg
      fill="none"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <path
        d={path}
        stroke={"currentColor"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
