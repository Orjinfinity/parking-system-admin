import styled from 'styled-components';
import { color, position, space, typography, variant } from 'styled-system';
import { TitleProps } from '../../interfaces';

const sizeVariant = variant({
  prop: 'size',
  variants: {
    xs: {
      fontSize: '.9rem',
    },
    sm: {
      fontSize: '1.5rem',
    },
    md: {
      fontSize: '2rem',
    },
    lg: {
      fontSize: '2.5rem',
    },
    xl: {
      fontSize: '3rem',
    },
  },
});

const Title = styled('h1')<TitleProps>`
  letter-spacing: 0.18px;
  color: #3A3541DE;
  ${space}
  ${typography}
    ${color}
    ${position}
    ${({ size }) => size && sizeVariant}
`;

export default Title;
