import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/bootstrap/ChevronLeft';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const LeftArrowIcon = styled(ChevronLeft)<IconProps>`
  font-size: 24px;
  ${space}
  ${color}
`;

export default LeftArrowIcon;
