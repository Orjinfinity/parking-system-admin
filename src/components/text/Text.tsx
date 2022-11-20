import styled from 'styled-components';
import { color, layout, position, space, typography, variant } from 'styled-system';
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
  letter-spacing: 0.5px;
  color: #3A3541DE;
  ${space}
  ${typography}
    ${color}
    ${position}
    ${layout}
    ${({ size }) => size && sizeVariant}
`;

export default Text;
