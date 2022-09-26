import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { IDefaultStyleProp } from '../interfaces';
import mediaQueries from './mediaQueries';
import fontWeights from './fontWeights';
import breakpoints from './breakpoints';
import fontSizes from './fontSizes';
import colors from './colors';

interface IThemeProviderWrapper {
  children: React.ReactElement;
  theme: DefaultTheme;
}

const defaultTheme: DefaultTheme = {
  colors,
  fontWeights,
  fontSizes,
  breakpoints,
  mediaQueries,
  borders: {} as IDefaultStyleProp,
  space: {} as IDefaultStyleProp,
  sizes: {} as IDefaultStyleProp,
  shadows: {} as IDefaultStyleProp,
};

const ThemeProviderWrapper = ({
  children,
  theme = defaultTheme,
}: IThemeProviderWrapper) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
