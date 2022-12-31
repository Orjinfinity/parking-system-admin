import styled from 'styled-components';
import { BuildingHome } from '@styled-icons/fluentui-system-filled/BuildingHome';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const FlatIcon = styled(BuildingHome)<IconProps>`
  ${space}
  ${color}
`;
export default FlatIcon;
