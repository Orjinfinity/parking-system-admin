import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  View,
  Image,
  Title,
  List,
  ListItem,
  DashboardIcon,
  LinkButton,
  UsersIcon,
  BuildingIcon,
  FlatIcon,
  CarIcon,
  GateIcon,
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
      borderRight="1px solid #e4e4e4"
    >
      <View display="flex" alignItems="center" p="12px" onClick={() => navigate('/')}>
        <Image width="auto" height="auto" src={imagePath('logo.png')} alt="Dasboard Logo" />
        <Title fontSize="1.1rem" ml="12px">
          PANEL YÖNETİMİ
        </Title>
      </View>
      <View width="100%">
        <List mt="20px">
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
              <DashboardIcon mr="12px" size="20px" color="#3A3541DE" />
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
              <UsersIcon mr="12px" size="20px" color="#3A3541DE" />
              Kullanıcılar
            </LinkButton>
          </ListItem>
          <ListItem height="42px" borderRadius="6px" mb="10px">
            <LinkButton
              to="/sites"
              color="linkPrimary"
              fontSize="medium"
              padding="12px"
              variant="link"
              display="flex"
              alignItems="center"
              width="100%"
            >
              <BuildingIcon mr="12px" size="20px" color="#3A3541DE" />
              Siteler
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
              <ApartmentIcon mr="12px" size="20px" color="#3A3541DE" />
              Apartmanlar
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
              <FlatIcon mr="12px" size="20px" color="#3A3541DE" />
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
              <GateIcon mr="12px" size="20px" color="#3A3541DE" />
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
              <CarIcon mr="12px" size="20px" color="#3A3541DE" />
              Araçlar
            </LinkButton>
          </ListItem>
        </List>
      </View>
    </View>
  );
};

export default Sidebar;
