import React from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '../components';
import ApartmentIcon from '../components/icons/ApartmentIcon';
import imagePath from '../utils/assetHelper';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <View
      minWidth="260px"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      p={[12, 12, 12, 16, 16]}
      // borderRight="1px solid #e4e4e4"
    >
      <View display="flex" alignItems="center" onClick={() => navigate('/')}>
        <Image height="36px" src={imagePath('logo.png')} alt="logo" />
        {/* <Title fontSize="1.1rem" ml="12px">
          PANEL
        </Title> */}
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
              alignItems="center"
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
              alignItems="center"
              width="100%"
            >
              <UsersIcon mr="12px" size="20px" color="textColor" />
              Kullanıcılar
            </LinkButton>
          </ListItem>
          <ListItem height="42px" borderRadius="6px" mb="10px">
            <LinkButton
              to="/apartments"
              color="linkPrimary"
              fontSize="medium"
              padding="12px"
              variant="link"
              display="flex"
              alignItems="center"
              width="100%"
            >
              <ApartmentIcon mr="12px" size="20px" color="textColor" />
              Siteler
            </LinkButton>
          </ListItem>
          <ListItem height="42px" borderRadius="6px" mb="10px">
            <LinkButton
              to="/blocks"
              color="linkPrimary"
              fontSize="medium"
              padding="12px"
              variant="link"
              display="flex"
              alignItems="center"
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
              alignItems="center"
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
              alignItems="center"
              width="100%"
            >
              <GateIcon mr="12px" size="20px" color="textColor" />
              Giriş Kapıları
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
              alignItems="center"
              width="100%"
            >
              <CarIcon mr="12px" size="20px" color="textColor" />
              Araçlar
            </LinkButton>
          </ListItem>
          <ListItem height="42px" borderRadius="6px" mb="10px">
            <LinkButton
              to="/request-calls"
              color="linkPrimary"
              fontSize="medium"
              padding="12px"
              variant="link"
              display="flex"
              alignItems="center"
              width="100%"
            >
              <UrgentIcon mr="12px" size="20px" color="textColor" />
              Acil Durum Çağrıları
            </LinkButton>
          </ListItem>
        </List>
      </View>
    </View>
  );
};

export default Sidebar;
