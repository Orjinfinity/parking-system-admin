const breakpoints = [
  '320px',
  '576px',
  '768px',
  '992px',
  '1200px',
  '1400px',
] as any;

const [
  xsmallBreakpoint,
  smallBreakpoint,
  mediumBreakpoint,
  largeBreakpoint,
  xlargeBreakpoint,
  xxlargeBreakpoint,
] = breakpoints;

// allias
breakpoints.xs = xsmallBreakpoint;
breakpoints.sm = smallBreakpoint;
breakpoints.md = mediumBreakpoint;
breakpoints.lg = largeBreakpoint;
breakpoints.xl = xlargeBreakpoint;
breakpoints.xxl = xxlargeBreakpoint;

export default breakpoints;
