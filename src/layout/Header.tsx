import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Image,
  NotificationIcon,
  SearchIcon,
  Title,
  View,
  Text,
  Button,
  UserIcon,
  QuestionIcon,
  LogoutIcon,
} from '../components';
import imagePath from '../utils/assetHelper';

const ImageContainerStyled = styled(View)`
  cursor: pointer;
  margin-left: 20px;
`;

const ProfileCardStyled = styled(View)`
  max-width: 230px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 12px;
  z-index: 6;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.primary};
  border-radius: 6px;
`;

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const cardRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const checkIfClickedOutside = (target: HTMLInputElement) => {
      if(isOpenModal && cardRef.current && !cardRef.current.contains(target as HTMLInputElement))
        setIsOpenModal(false)
    }
    document.addEventListener("click", (event) => checkIfClickedOutside(event.target as HTMLInputElement));
    return () => {
      document.removeEventListener("click", (event) => checkIfClickedOutside(event.target as HTMLInputElement));
    }
  }, [isOpenModal])

  return (
    <View
      width="100%"
      height="64px"
      display="flex"
      padding="8px 12px"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      ref={cardRef}
    >
      <View>
        <SearchIcon size="20px" />
      </View>
      <View display="flex" justifyContent="center" alignItems="center">
        <NotificationIcon size="20px" />
        <ImageContainerStyled onClick={() => setIsOpenModal(!isOpenModal)}>
          <Image src={imagePath('Avatar.png')} alt="Avatar" />
        </ImageContainerStyled>
      </View>
      {isOpenModal && (
        <ProfileCardStyled>
          <View
            display="flex"
            padding="14px 20px"
            borderBottom="1px solid #3A35411F"
          >
            <Image
              width="40px"
              height="40px"
              src={imagePath('Avatar.png')}
              alt="Avatar"
            />
            <View
              display="flex"
              flexDirection="column"
              justifyContent="center"
              ml="10px"
            >
              <Title mb="4px" fontSize="0.8rem">
                Serkan Sayhan
              </Title>
              <Text color="textSecondaryColor" fontSize="12px">
                Administrator
              </Text>
            </View>
          </View>
          <View borderBottom="1px solid #3A35411F">
            <Button
              type="button"
              variant="icon"
              fontSize="medium"
              fontWeight="regular"
              color="linkPrimary"
              // onClick={() => navigate('/profile')}
            >
              <UserIcon mr="14px" size="24px" />
              Profile
            </Button>
            <Button
              type="button"
              variant="icon"
              fontSize="medium"
              fontWeight="regular"
              color="linkPrimary"
              // onClick={() => navigate('/login')}
            >
              <QuestionIcon mr="14px" size="24px" />
              Sık Sorulanlar
            </Button>
          </View>
          <Button
            type="button"
            variant="icon"
            fontSize="medium"
            fontWeight="regular"
            color="linkPrimary"
            mr="auto"
            onClick={() => navigate('/login')}
          >
            <LogoutIcon mr="14px" size="24px" />
            Çıkış Yap
          </Button>
        </ProfileCardStyled>
      )}
    </View>
  );
};

export default Header;
