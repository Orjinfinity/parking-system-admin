import styled from 'styled-components';
import { color, position, space, typography, variant } from 'styled-system';
import { TitleProps } from '../../interfaces';

const sizeVariant = variant({
  prop: 'size',
  variants: {
    xs: {
      fontSize: '0.75rem',
    },
    sm: {
      fontSize: '.8rem',
    },
    md: {
      fontSize: '1rem',
    },
    lg: {
      fontSize: '1.2rem',
    },
    xl: {
      fontSize: '1.5rem',
    },
  },
});

const Text = styled('p')<TitleProps>`
  ${space}
  ${typography}
    ${color}
    ${position}
    ${({ size }) => size && sizeVariant}
`;

export default Text;
