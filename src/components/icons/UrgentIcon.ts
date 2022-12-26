import styled from 'styled-components';
import { AlertUrgent } from '@styled-icons/fluentui-system-filled/AlertUrgent';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const UrgentIcon = styled(AlertUrgent)<IconProps>`
  ${space}
  ${color}
`;

export default UrgentIcon;
