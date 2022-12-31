import styled from 'styled-components';
import { Dashboard } from '@styled-icons/boxicons-solid/Dashboard';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const DashboardIcon = styled(Dashboard)<IconProps>`
  ${space}
  ${color}
`;
export default DashboardIcon;
