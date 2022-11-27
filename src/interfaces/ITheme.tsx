import { ReactNode } from 'react';
// import { DefaultTheme, StyledComponent } from 'styled-components';
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
interface IBreakpointAlias {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

interface IBreakpointSizes {
  xsmallBreakpoint: string;
  smallBreakpoint: string;
  mediumBreakpoint: string;
  largeBreakpoint: string;
  xlargeBreakpoint: string;
  xxlargeBreakpoint: string;
}

interface IDefaultStyleProp {
  [key: string]: string;
}

interface ViewProps
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

interface TitleProps
  extends SpaceProps,
    TypographyProps,
    ColorProps,
    LayoutProps,
    PositionProps {
  size?: string;
}

interface TextProps
  extends SpaceProps,
    TypographyProps,
    ColorProps,
    FlexboxProps {
  size?: any;
}

interface ButtonProps
  extends SpaceProps,
    TypographyProps,
    ColorProps,
    FlexboxProps,
    BorderProps,
    LayoutProps {
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'icon' | 'contained' | 'outline' | 'dashed' | 'link';
  onClick?: () => void;
  color?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  block?: boolean;
}

interface ImageProps extends SpaceProps {
  width?: string;
  height?: string;
}

interface ListProps extends SpaceProps, LayoutProps, ColorProps {
}

interface ListItemProps extends ListProps, PositionProps, BorderProps {}

interface IconProps extends SpaceProps {}

export type {
  IBreakpointAlias,
  IBreakpointSizes,
  IDefaultStyleProp,
  ListProps,
  ListItemProps,
  ImageProps,
  ViewProps,
  TitleProps,
  TextProps,
  ButtonProps,
  IconProps,
};
