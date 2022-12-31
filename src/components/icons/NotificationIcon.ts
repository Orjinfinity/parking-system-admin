import styled from 'styled-components';
import { Notifications } from '@styled-icons/material-outlined/Notifications';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const NotificationIcon = styled(Notifications)<IconProps>`
  ${space}
  ${color}
`;
export default NotificationIcon;
