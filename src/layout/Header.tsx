import React from 'react';
import { Image, NotificationIcon, SearchIcon, View } from '../components';
import imagePath from '../utils/assetHelper';

const Header = () => {
  return (
    <View
      width="100%"
      height="64px"
      display="flex"
      padding="8px 12px"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="bottom"
    >
      <View>
        <SearchIcon size="20px" />
      </View>
      <View display="flex" justifyContent="center" alignItems="center">
        <NotificationIcon size="20px" />
        <View ml="20px">
          <Image src={imagePath('Avatar.png')} alt="Avatar" />
        </View>
      </View>
    </View>
  );
};

export default Header;
