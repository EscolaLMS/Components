import * as React from "react";
export interface BadgeProps {
    /** this is color description */
    color?: string;
    children?: React.ReactNode;
}
export declare const Button: React.FC<BadgeProps>;
declare const _default: React.ForwardRefExoticComponent<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
} & {
    theme?: import("styled-components").DefaultTheme | undefined;
}>;
export default _default;
