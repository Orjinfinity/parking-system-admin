import styled from 'styled-components';
import { border, color, layout, position, space } from 'styled-system';
import { ListItemProps } from '../../interfaces';

const ListItem = styled('li')<ListItemProps>`
   display: flex;
   align-items: center;

   &:last-child {
    margin-bottom: 0px;
   }
  ${space}
  ${layout}
  ${color}
  ${position}
  ${border}
`;

export default ListItem;
