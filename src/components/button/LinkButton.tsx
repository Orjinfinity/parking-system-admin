import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  border,
  flexbox,
  layout,
  position,
  space,
  typography,
} from 'styled-system';
import { ButtonProps } from '../../interfaces';
import { buttonColors, buttonSizes, buttonVariants } from './Button';

const LinkButton = styled(Link)<ButtonProps>`
  ${({ size }) => size && buttonSizes}
  ${({ color }) => color && buttonColors}
  ${({ variant }) => variant && buttonVariants}
  ${space}
  ${position}
  ${border}
  ${typography}
  ${flexbox}
  ${layout}
`;

export default LinkButton;
