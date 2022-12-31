import { useEffect, useRef, useState } from 'react';
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
import { Types, UserTypes } from '../interfaces';
import { logout } from '../store/auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
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

  const dispatch = useAppDispatch();
  const user = {
    // useAppSelector(state => state.auth.user)
    id: 1,
    email: 'syhnserkan@gmail.com',
    roles: ['ROLE_USER'],
    username: 'syhnserkan',
  };
  const type = user.roles[0] || 'ROLE_USER';
  const userRole = UserTypes[type as keyof typeof Types];

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (target: HTMLInputElement) => {
      if (
        isOpenModal &&
        cardRef.current &&
        !cardRef.current.contains(target as HTMLInputElement)
      )
        setIsOpenModal(false);
    };
    document.addEventListener('click', (event) =>
      checkIfClickedOutside(event.target as HTMLInputElement)
    );
    return () => {
      document.removeEventListener('click', (event) =>
        checkIfClickedOutside(event.target as HTMLInputElement)
      );
    };
  }, [isOpenModal]);

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
                {`${user.username.charAt(0).toUpperCase()}${user.username.slice(
                  1
                )}`}
              </Title>
              <Title mb="4px" fontSize="0.8rem">
                {/* Administrator */}
                {userRole}
              </Title>
              <Text color="textSecondaryColor" fontSize="12px">
                {/* Administrator */}
                {user.email}
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
            onClick={() => dispatch(logout())}
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
