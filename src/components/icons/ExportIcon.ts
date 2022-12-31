import styled from 'styled-components';
import { Export } from '@styled-icons/boxicons-regular/Export';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const ExportIcon = styled(Export)<IconProps>`
  ${space}
  ${color}
`;
export default ExportIcon;
