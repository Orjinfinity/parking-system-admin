import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { IDefaultStyleProp } from '../interfaces';
import mediaQueries from './mediaQueries';
import fontWeights from './fontWeights';
import breakpoints from './breakpoints';
import fontSizes from './fontSizes';
import colors from './colors';
import fonts from './fonts';
import boxShadows from './boxShadows';

interface IThemeProviderWrapper {
  children: React.ReactElement;
  theme?: DefaultTheme;
}

const defaultTheme: DefaultTheme = {
  fonts,
  colors,
  fontWeights,
  fontSizes,
  breakpoints,
  mediaQueries,
  shadows: boxShadows,
  borders: {} as IDefaultStyleProp,
  space: {} as IDefaultStyleProp,
  sizes: {} as IDefaultStyleProp,
};

const ThemeProviderWrapper = ({
  children,
  theme = defaultTheme,
}: IThemeProviderWrapper) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
