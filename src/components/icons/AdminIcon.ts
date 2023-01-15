import styled from 'styled-components';
import { UserTie } from '@styled-icons/icomoon/UserTie';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const AdminIcon = styled(UserTie)<IconProps>`
  ${space}
  ${color}
`;
export default AdminIcon;
