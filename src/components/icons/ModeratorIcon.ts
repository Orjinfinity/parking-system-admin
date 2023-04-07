import styled from 'styled-components';
import { AddModerator } from '@styled-icons/material-twotone/AddModerator';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const ModeratorIcon = styled(AddModerator)<IconProps>`
  ${space}
  ${color}
`;
export default ModeratorIcon;
