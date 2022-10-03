import styled from 'styled-components';
import {
  space,
  color,
  typography,
  flexbox,
  layout,
  position,
  border,
  shadow,
  background,
  grid,
} from 'styled-system';
import { ViewProps } from '../../interfaces';

const View = styled('div')<ViewProps>`
  ${space}
  ${typography}
  ${flexbox}
  ${color}
  ${position}
  ${border}
  ${shadow}
  ${background}
  ${layout}
  ${grid}
  ${({ boxSizing }) => boxSizing && `box-sizing: ${boxSizing}`}
`;

export default View;
