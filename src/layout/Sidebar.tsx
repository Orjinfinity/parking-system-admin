import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  View,
  Image,
  List,
  ListItem,
  DashboardIcon,
  LinkButton,
  UsersIcon,
  BuildingIcon,
  FlatIcon,
  CarIcon,
  GateIcon,
  UrgentIcon,
  GateProcesesIcon,
} from '../components';
import ApartmentIcon from '../components/icons/ApartmentIcon';
import { LocalStorageKeys, Types } from '../interfaces';
import { useAppSelector } from '../store/hooks';
import imagePath from '../utils/assetHelper';

const StyledView = styled(View)`
  min-width: 260px;
  position: fixed;
  z-index: 3;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.secondary};
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
  const isSuperAdmin = user.roles.some((role) => role === Types.ROLE_ADMIN);
  const isModerator = useAppSelector((state) => state.auth.isModerator);
  return (
    <StyledView p={[12, 12, 12, 16, 16]}>
      <View display="flex" onClick={() => navigate('/')}>
        <Image height="100px" src={imagePath('logo.png')} alt="logo" />
      </View>
      <View width="100%">
        <List mt="25px">
          <ListItem height="42px" borderRadius="6px" mb="10px">
            <LinkButton
              to="/"
              color="linkPrimary"
              fontSize="medium"
              padding="12px"
              variant="link"
              display="flex"
              width="100%"
            >
              <DashboardIcon mr="12px" size="20px" color="textColor" />
              Dashboard
            </LinkButton>
          </ListItem>
          <ListItem height="42px" borderRadius="6px" mb="10px">
            <LinkButton
              to="/users"
              color="linkPrimary"
              fontSize="medium"
              padding="12px"
              variant="link"
              display="flex"
              width="100%"
            >
              <UsersIcon mr="12px" size="20px" color="textColor" />
              Kullanıcılar
            </LinkButton>
          </ListItem>
          {isSuperAdmin ? (
            <ListItem height="42px" borderRadius="6px" mb="10px">
              <LinkButton
                to="/apartments"
                color="linkPrimary"
                fontSize="medium"
                padding="12px"
                variant="link"
                display="flex"
                width="100%"
              >
                <ApartmentIcon mr="12px" size="20px" color="textColor" />
                Siteler
              </LinkButton>
            </ListItem>
          ) : null}
          {!isModerator ? (
            <>
              <ListItem height="42px" borderRadius="6px" mb="10px">
                <LinkButton
                  to="/blocks"
                  color="linkPrimary"
                  fontSize="medium"
                  padding="12px"
                  variant="link"
                  display="flex"
                  width="100%"
                >
                  <BuildingIcon mr="12px" size="20px" color="textColor" />
                  Bloklar
                </LinkButton>
              </ListItem>
              <ListItem height="42px" borderRadius="6px" mb="10px">
                <LinkButton
                  to="/flats"
                  color="linkPrimary"
                  fontSize="medium"
                  padding="12px"
                  variant="link"
                  display="flex"
                  width="100%"
                >
                  <FlatIcon mr="12px" size="20px" color="textColor" />
                  Daireler
                </LinkButton>
              </ListItem>
              <ListItem height="42px" borderRadius="6px" mb="10px">
                <LinkButton
                  to="/gates"
                  color="linkPrimary"
                  fontSize="medium"
                  padding="12px"
                  variant="link"
                  display="flex"
                  width="100%"
                >
                  <GateIcon mr="12px" size="20px" color="textColor" />
                  Giriş Kapıları
                </LinkButton>
              </ListItem>
              <ListItem height="42px" borderRadius="6px" mb="10px">
                <LinkButton
                  to="/gate-processes"
                  color="linkPrimary"
                  fontSize="medium"
                  padding="12px"
                  variant="link"
                  display="flex"
                  width="100%"
                >
                  <GateProcesesIcon mr="12px" size="20px" color="textColor" />
                  Giriş Çıkış İşlemleri
                </LinkButton>
              </ListItem>
              <ListItem height="42px" borderRadius="6px" mb="10px">
                <LinkButton
                  to="/cars"
                  color="linkPrimary"
                  fontSize="medium"
                  padding="12px"
                  variant="link"
                  display="flex"
                  width="100%"
                >
                  <CarIcon mr="12px" size="20px" color="textColor" />
                  Araçlar
                </LinkButton>
              </ListItem>
            </>
          ) : null}
          <ListItem height="42px" borderRadius="6px" mb="10px">
            <LinkButton
              to="/request-calls"
              color="linkPrimary"
              fontSize="medium"
              padding="12px"
              variant="link"
              display="flex"
              width="100%"
            >
              <UrgentIcon mr="12px" size="20px" color="textColor" />
              Acil Durum Çağrıları
            </LinkButton>
          </ListItem>
        </List>
      </View>
    </StyledView>
  );
};

export default Sidebar;
