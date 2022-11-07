import styled from 'styled-components';
import { Search } from '@styled-icons/evaicons-solid/Search';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const SearchIcon = styled(Search)<IconProps>`
  ${space}
  ${color}
`;

export default SearchIcon;
