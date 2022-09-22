import styled, { withTheme } from "styled-components";
import { ExtendableStyledComponent } from "types/component";

const StyledSvg = styled("svg")`
  .progress_ring__top {
    stroke: ${(props) => props.theme.primaryColor || "#F47820"};
  }

  .progress_ring__bottom {
    stroke: ${(props) =>
      props.theme.mode !== "light" ? props.theme.white : props.theme.gray4};
  }
`;

interface ProgressRingType extends ExtendableStyledComponent {
  size?: number;
  strokeWidth?: number;
  percentage: number;
}

const ProgressRing: React.FC<ProgressRingType> = ({
  size = 16,
  strokeWidth = 2,
  percentage = 50,
  className = "",
}) => {
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (percentage * circumference) / 100;

  return (
    <StyledSvg
      className={`wellms-component progress-ring ${className}`}
      width={size}
      height={size}
      viewBox={viewBox}
    >
      <circle
        className="progress_ring__bottom"
        fill="none"
        stroke="#F2F2F2"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="progress_ring__top"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={[dash, circumference - dash].join(" ")}
        strokeLinecap="round"
        style={{ transition: "all 0.5s" }}
      />
    </StyledSvg>
  );
};

export default withTheme(styled(ProgressRing)<ProgressRingType>``);
