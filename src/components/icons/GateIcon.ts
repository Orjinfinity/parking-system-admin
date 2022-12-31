import styled from 'styled-components';
import { TrafficBarrier } from '@styled-icons/boxicons-solid/TrafficBarrier';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const GateIcon = styled(TrafficBarrier)<IconProps>`
  ${space}
  ${color}
`;
export default GateIcon;
