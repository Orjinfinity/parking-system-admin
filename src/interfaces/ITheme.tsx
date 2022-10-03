import {
  SpaceProps,
  ColorProps,
  TypographyProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  ShadowProps,
  BackgroundColorProps,
  GridProps,
} from 'styled-system';
export interface IBreakpointAlias {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface IBreakpointSizes {
  xsmallBreakpoint: string;
  smallBreakpoint: string;
  mediumBreakpoint: string;
  largeBreakpoint: string;
  xlargeBreakpoint: string;
  xxlargeBreakpoint: string;
}

export interface IDefaultStyleProp {
  [key: string]: string;
}

export interface ViewProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    BorderProps,
    ShadowProps,
    BackgroundColorProps,
    GridProps {
  boxSizing?: string;
}

export interface TitleProps
  extends SpaceProps,
    TypographyProps,
    ColorProps,
    PositionProps {
  size?: string;
}
