import styled from 'styled-components';
import { Delete } from '@styled-icons/fluentui-system-regular/Delete';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const DeleteIcon = styled(Delete)<IconProps>`
  ${space}
  ${color}
`;
export default DeleteIcon;
