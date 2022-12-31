import React, { Dispatch, useContext } from 'react';
import { Modal, Title, View, Text, Button } from '..';
import { UserActionTypes, UserContext } from '../../contexts';
import { deleteUser, successMessage } from '../../services';
import { IUserRow } from '../../consts';
interface IDeleteUser {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedUser: IUserRow;
}

const DeleteUser = ({
  modalIsOpen,
  setModalIsOpen,
  selectedUser,
}: IDeleteUser) => {
  const { state, dispatch } = useContext(UserContext);

  const handleDeleteUser = async () => {
    const response = await deleteUser(selectedUser.id);
    if (response.status === 200) {
      successMessage(response.data?.message || 'Kullanıcı başarıyla silindi.');

      const goToPrevPage =
        state.totalUsers !== 1 && (state.totalUsers - 1) % 10 === 0;
      if (goToPrevPage)
        dispatch({
          type: UserActionTypes.UPDATE_PAGE_COUNT,
          page: state.page - 1,
        });
      else dispatch({ type: UserActionTypes.DELETE_USER, user: selectedUser });

      setModalIsOpen(false);
    }
  };

  return (
    <Modal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      maxWidth="400px"
    >
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
        <Text margin="12px 0" fontSize="12px" color="textSecondaryColor">
          <strong>{`${selectedUser.name} ${selectedUser.surname}`}</strong> adlı
          kullanıcıyı silmek istediğinizden emin misiniz ?
        </Text>
        <View display="flex" justifyContent="center" marginTop="20px">
          <Button
            fontSize="medium"
            padding="10px 20px"
            letterSpacing=".46px"
            type="submit"
            variant="contained"
            color="error"
            size="sm"
            onClick={handleDeleteUser}
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
