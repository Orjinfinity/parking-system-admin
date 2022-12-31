import styled from 'styled-components';
import { Apartment } from '@styled-icons/material-twotone/Apartment';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const ApartmentIcon = styled(Apartment)<IconProps>`
  ${space}
  ${color}
`;
export default ApartmentIcon;
