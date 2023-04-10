import { ReactNode } from 'react';

import styled from 'styled-components';
import View from '../view/View';
import Image from '../image/Image';
import imagePath from '../../utils/assetHelper';

const StyledMobileButton = styled.button`
  margin-left: 20px;
`;
const StyledMobileHeader = styled(View)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    background-color: #9155fd;
    height: 58px;
    position: sticky;
    top: 0;
    z-index: 999;
    justify-content: space-between;
  }
`;

interface IMobileHeader {
  handleClick: () => void;
  children: ReactNode;
}

const MobileHeader = ({ handleClick, children }: IMobileHeader) => {
  return (
    <StyledMobileHeader>
      <StyledMobileButton onClick={handleClick}>{children}</StyledMobileButton>
      <View mr="20px">
        <Image height="36px" src={imagePath('logo.png')} alt="logo" />
      </View>
    </StyledMobileHeader>
  );
};

export default MobileHeader;
