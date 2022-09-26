import { IBreakpointAlias, IBreakpointSizes } from '../interfaces';

const breakpointSizes: IBreakpointSizes = {
  xsmallBreakpoint: '320px',
  smallBreakpoint: '576px',
  mediumBreakpoint: '768px',
  largeBreakpoint: '992px',
  xlargeBreakpoint: '1200px',
  xxlargeBreakpoint: '1400px',
};

// allias
const breakpoints: IBreakpointSizes & IBreakpointAlias = Object.assign(
  breakpointSizes,
  {
    xs: breakpointSizes.xsmallBreakpoint,
    sm: breakpointSizes.smallBreakpoint,
    md: breakpointSizes.mediumBreakpoint,
    lg: breakpointSizes.largeBreakpoint,
    xl: breakpointSizes.xlargeBreakpoint,
    xxl: breakpointSizes.xxlargeBreakpoint,
  }
);

export default breakpoints;
