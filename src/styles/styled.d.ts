import 'styled-components';
import { IDefaultStyleProp } from '../interfaces';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    colors: {
      white: string;
      black: string;
      textColor: string;
      primary: string;
      secondary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
      textColor: string;
      textSecondaryColor: string;
      textDisabled: string;
      bgPrimary: string;
      bgSecondary: string;
      bgInfo: string;
      bgSuccess: string;
      bgError: string;
      activeLink: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
    fontWeights: {
      light: number;
      regular: number;
      medium: number;
      bold: number;
    };
    mediaQueries: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    shadows: {
      primary: string;
      secondary: string;
    };
    borders: IDefaultStyleProp;
    space: IDefaultStyleProp;
    sizes: IDefaultStyleProp;
  }
}
