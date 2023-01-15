import { useEffect, useRef, useState, useMemo } from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import {
  Image,
  UrgentIcon,
  Title,
  View,
  Text,
  Button,
  UserIcon,
  QuestionIcon,
  LogoutIcon,
  AdminIcon,
  ApartmentAdminIcon,
} from '../components';
import { END_POINTS } from '../consts';
import { useFetch } from '../hooks/useFetch';
import { IconProps, Types, UserTypes } from '../interfaces';
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

const roleIcons: {
  [key: string]: StyledComponent<StyledIcon, DefaultTheme, IconProps, never>;
} = {
  ROLE_APARTMENTADMIN: ApartmentAdminIcon,
  ROLE_ADMIN: AdminIcon,
};

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dataFetchRef = useRef(true);
  const dispatch = useAppDispatch();

  const { data, loading } = useFetch(
    END_POINTS.REQUEST_CALLS.requestCalls,
    { page: 0, size: 10 },
    dataFetchRef,
    []
  );
  const user = useAppSelector((state) => state.auth.user);
  const type = user.roles[0] || 'ROLE_USER';
  const AdminIcon = useMemo(() => roleIcons[type], [type]);
  const userRole = UserTypes[type as keyof typeof Types];
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
      <View
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        backgroundColor="white"
        borderRadius="5px"
        padding="8px 12px"
        boxShadow="primary"
        color="textColor"
        fontSize={['0.6rem', '0.8rem', '0.8rem', '1rem', '1rem']}
      >
        {!loading && data ? (
          <View>
            Toplam{' '}
            <strong>
              {' '}
              <UrgentIcon mb="6px" mr="1px" size="20px" color="error" />{' '}
              {data?.totalItems || 0} acil durum çağrısı
            </strong>{' '}
            bulunmaktadır.
          </View>
        ) : null}
        <View
          display="flex"
          justifyContent="center"
          alignItems="center"
          ml="auto"
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          {!!AdminIcon ? (
            <AdminIcon size="20px" mr="8px" color="error" />
          ) : null}{' '}
          <strong>{userRole}</strong>
          <ImageContainerStyled>
            <Image src={imagePath('Avatar.png')} alt="Avatar" />
          </ImageContainerStyled>
        </View>
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
