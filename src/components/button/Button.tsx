import styled, { DefaultTheme } from 'styled-components';
import {
  border,
  flexbox,
  layout,
  position,
  space,
  typography,
  variant,
} from 'styled-system';
import { ButtonProps } from '../../interfaces';

export const buttonVariants = variant({
  prop: 'variant',
  variants: {
    text: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: 'var(--bg)',
      '&:hover': {
        backgroundColor: 'var(--color)',
        borderColor: 'var(--color)',
      },
    },
    icon: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      '&:hover': {
        color: 'var(--bg)',
      },
    },
    contained: {
      backgroundColor: 'var(--bg)',
      borderColor: 'var(--bg)',
      color: 'var(--color)',
      '&:hover': {
        backgroundColor: 'var(--bg)',
        borderColor: 'var(--bg)',
        color: '#fff',
        opacity: '0.8',
      },
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: 'var(--bg)',
      color: 'var(--bg)',
      '&:hover': {
        backgroundColor: 'var(--bg)',
        color: 'var(--color)',
      },
    },
  },
});

export const buttonColors = ({ theme }: { theme: DefaultTheme }) =>
  variant({
    prop: 'color',
    variants: {
      primary: {
        '--color': theme.colors.white,
        '--bg': theme.colors.primary,
      },
      secondary: {
        '--color': theme.colors.white,
        '--bg': theme.colors.secondary,
      },
      black: {
        '--color': theme.colors.white,
        '--bg': theme.colors.black,
      },
      white: {
        '--color': theme.colors.black,
        '--bg': theme.colors.white,
      },
      purple: {
        '--color': theme.colors.white,
        '--bg': theme.colors.primary,
      },
      green: {
        '--color': theme.colors.white,
        '--bg': theme.colors.success,
      },
    },
  });

export const buttonSizes = variant({
  prop: 'size',
  variants: {
    sm: {
      padding: '8px 16px',
      fontSize: '.9em',
    },
    md: {
      padding: '10px 20px',
    },
    lg: {
      padding: '15px 30px',
    },
    xl: {
      padding: '20px 40px',
    },
    auto: {
      padding: '0',
    },
  },
});

const Button = styled('button')<ButtonProps>`
    border-radius: 5px;
    border: none;
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

Button.defaultProps = {
    color: 'black',
    type: 'button',
    variant: 'contained',
    children: '',
    size: 'md',
}

export default Button;


// const Button = styled(({ to, type, color, onClick, children, size }: IButton) => {
//   if (to) return <Link to={to}> {children}</Link>;

//   return createElement('button', { type, onClick, color, size }, children);
// })<ButtonProps>`
//    border-radius: 5px;
//   ${({ size }) => size && buttonSizes}
//   ${({ color }) => color && buttonColors}
//   ${({ variant }) => variant && buttonVariants}
//   ${space}
//   ${position}
//   ${border}
//   ${typography}
//   ${flexbox}
//   ${layout}
// `;

