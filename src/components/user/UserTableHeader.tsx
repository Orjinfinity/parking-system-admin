import React from 'react';
import Button from '../button/Button';
import ExportIcon from '../icons/ExportIcon';
import UserPlusIcon from '../icons/UserPlusIcon';
import { BasicTextField } from '../textfield/TextField';
import View from '../view/View';

interface IUserTableHeader {
  handleUserFunctions: (type: string) => void;
}

const UserTableHeader = ({ handleUserFunctions }: IUserTableHeader) => {
  return (
    <View
      display="flex"
      width="100%"
      justifyContent="space-between"
      mt="20px"
      mb="20px"
      height="38px"
    >
      <Button
        fontSize="medium"
        padding="10px 20px"
        width="112px"
        letterSpacing=".46px"
        variant="dashed"
        color="gray"
        size="md"
        ml="-5px"
      >
        <ExportIcon size="20px" mr="8px" mb="4px"/>
        Export
      </Button>
      <View display="flex">
        <BasicTextField name="search" placeholder="Kullanıcı Ara" />
        <Button
          fontSize="medium"
          padding="10px 20px"
          width="112px"
          letterSpacing=".46px"
          variant="contained"
          color="primary"
          ml="16px"
          size="md"
          onClick={() => handleUserFunctions("add")}
        >
          <UserPlusIcon size="24px" mr="8px" mb="2px"/>
          Yeni Kullanıcı
        </Button>
      </View>
    </View>
  );
};

export default UserTableHeader;
