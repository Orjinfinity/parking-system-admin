import styled from 'styled-components';
import { space } from 'styled-system';
import { ImageProps } from '../../interfaces';

const Image = styled('img')<ImageProps>`
    width: ${({ width }) => (width ? width : '100%')}
    object-fit: contain;
    height: ${({ height }) => (height ? height : '100%')}
    ${space}
`;

export default Image;
