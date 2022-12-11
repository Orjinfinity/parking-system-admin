import React, { Dispatch } from 'react';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Title from '../title/Title';
import Text from '../text/Text';
import View from '../view/View';
import { IUserRow } from '../../consts';

interface IDeleteUser {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedUser: IUserRow;
}

const DeleteUser = ({ modalIsOpen, setModalIsOpen, selectedUser }: IDeleteUser) => {
  return (
    <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} maxWidth="400px">
      <View
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        padding="12px"
      >
        <Title fontWeight="medium" fontSize="24px" color="textColor" mt="12px">
          Kullanıcı Sil
        </Title>
        <Text margin="12px 0" fontSize="12px" textAlign="center" color="textSecondaryColor">
          <strong>{`${selectedUser.name} ${selectedUser.surname}`}</strong> adlı kullanıcıyı silmek istediğinizden emin misiniz ?
        </Text>
        <View
          display="flex"
          justifyContent="center"
          marginTop="20px"
        >
          <Button
            fontSize="medium"
            padding="10px 20px"
            letterSpacing=".46px"
            type="submit"
            variant="contained"
            color="error"
            size="sm"
          >
            Kullanıcıyı Sil
          </Button>
          <Button
            fontSize="medium"
            padding="10px 20px"
            width="112px"
            letterSpacing=".46px"
            variant="dashed"
            color="gray"
            size="sm"
            ml="16px"
            onClick={() => setModalIsOpen(false)}
          >
            İptal
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteUser;
