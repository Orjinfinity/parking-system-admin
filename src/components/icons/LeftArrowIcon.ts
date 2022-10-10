import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/bootstrap/ChevronLeft';
import { space } from 'styled-system';
import { IconProps } from '../../interfaces';

const LeftArrowIcon = styled(ChevronLeft)<IconProps>`
  font-size: 24px;
  ${space}
`;

export default LeftArrowIcon;
