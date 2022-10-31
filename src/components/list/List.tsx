import styled from 'styled-components';
import { color, layout, space } from 'styled-system';
import { ListProps } from '../../interfaces';

const List = styled('ul')<ListProps>`
  ${space}
  ${layout}
  ${color}
`;

export default List;
