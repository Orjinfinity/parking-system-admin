import styled from 'styled-components';
import { Menu } from '@styled-icons/entypo/Menu';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const MenuIcon = styled(Menu)<IconProps>`
  ${space}
  ${color}
`;
export default MenuIcon;
