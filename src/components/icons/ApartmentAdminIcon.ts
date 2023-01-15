import styled from 'styled-components';
import { HouseChimneyUser } from '@styled-icons/fa-solid/HouseChimneyUser';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const ApartmentAdminIcon = styled(HouseChimneyUser)<IconProps>`
  ${space}
  ${color}
`;
export default ApartmentAdminIcon;
