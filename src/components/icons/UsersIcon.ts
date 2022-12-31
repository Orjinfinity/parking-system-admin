import styled from 'styled-components';
import { Users } from '@styled-icons/icomoon/Users';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const UsersIcon = styled(Users)<IconProps>`
  ${space}
  ${color}
`;
export default UsersIcon;
