import styled from 'styled-components';
import { UserPlus } from '@styled-icons/boxicons-solid/UserPlus';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const UserPlusIcon = styled(UserPlus)<IconProps>`
  ${space}
  ${color}
`;
export default UserPlusIcon;
