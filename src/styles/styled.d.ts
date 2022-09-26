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
      textColors: string;
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
    borders: IDefaultStyleProp;
    space: IDefaultStyleProp;
    sizes: IDefaultStyleProp;
    shadows: IDefaultStyleProp;
  }
}
