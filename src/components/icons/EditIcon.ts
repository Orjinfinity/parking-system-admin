import styled from 'styled-components';
import { EditAlt } from '@styled-icons/boxicons-regular/EditAlt';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const EditIcon = styled(EditAlt)<IconProps>`
  ${space}
  ${color}
`;
export default EditIcon;
