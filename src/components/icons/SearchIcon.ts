import styled from 'styled-components';
import { Search } from '@styled-icons/fluentui-system-filled/Search';
import { color, space } from 'styled-system';
import { IconProps } from '../../interfaces';

const SearchIcon = styled(Search)<IconProps>`
  ${space}
  ${color}
`;

export default SearchIcon;
