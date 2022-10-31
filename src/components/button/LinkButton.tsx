import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  typography,
} from 'styled-system';
import { ButtonProps } from '../../interfaces';
import { buttonColors, buttonSizes, buttonVariants } from './Button';

const LinkButton = styled(NavLink)<ButtonProps>`
  letter-spacing: 0.15px;
  line-height: 20px;
  border-radius: 5px;
  ${color}
  ${space}
  ${position}
  ${border}
  ${typography}
  ${flexbox}
  ${layout}
  ${({ color }) => color && buttonColors}
  ${({ size }) => size && buttonSizes}
  ${({ variant }) => variant && buttonVariants}
`;

export default LinkButton;
