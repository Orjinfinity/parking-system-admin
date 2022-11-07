import React from 'react';
import View from '../view/View';
import Text from '../text/Text';
import Image from '../image/Image';
import imagePath from '../../utils/assetHelper';
import styled from 'styled-components';
import Title from '../title/Title';
import Button from '../button/Button';
import CopyIcon from '../icons/CopyIcon';

const ContentStyled = styled(View)`
  width: 360px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.primary};
`;

const RoleCountStyled = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary};
  background-color: #eeeeee;
`;

const ImageContainer = styled(View)`
  position: relative;
  display: flex;
  align-items: center;
  img {
    position: absolute;
    &:nth-child(1) {
      right: 90px;
      z-index: 4;
    }
    &:nth-child(2) {
      right: 60px;
      z-index: 3;
    }
    &:nth-child(3) {
      right: 30px;
      z-index: 2;
    }
  }
`;

const Role = () => {
  return (
    <ContentStyled>
      <View
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="24px"
      >
        <Text fontSize="small" color="textSecondaryColor">
          Total 4 users
        </Text>
        <ImageContainer height="40px">
          <Image src={imagePath('Avatar3.png')} alt="avatar_1" />
          <Image src={imagePath('Avatar2.png')} alt="avatar_2" />
          <Image src={imagePath('AvatarGirl.png')} alt="avatar_3" />
          <RoleCountStyled>+3</RoleCountStyled>
        </ImageContainer>
      </View>
      <Title
        fontSize="20px"
        fontWeight="500"
        color="textSecondaryColor"
        mb="8px"
      >
        Administrator
      </Title>
      <View display="flex" justifyContent="space-between" alignItems="center">
        <Button
          fontSize="small"
          fontWeight="400"
          lineHeight="20px"
          variant="text"
          color="primary"
          padding="0"
        >
          Edit Role
        </Button>
        <Button variant="icon" padding="0">
          <CopyIcon size="20px" color="textColor" />
        </Button>
      </View>
    </ContentStyled>
  );
};

export default Role;
