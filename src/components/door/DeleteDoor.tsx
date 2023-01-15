import React, { Dispatch, useContext } from 'react';
import { Modal, Title, View, Text, Button } from '..';
import { IDoorRow } from '../../consts';
import { DoorActionTypes, DoorContext } from '../../contexts';
import { deleteDoor, successMessage } from '../../services';

interface IDeleteDoor {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedDoor: IDoorRow;
}

const DeleteDoor = ({
  modalIsOpen,
  setModalIsOpen,
  selectedDoor,
}: IDeleteDoor) => {
  const { state, dispatch } = useContext(DoorContext);

  const handleDeleteDoor = async () => {
    const response = await deleteDoor(selectedDoor.id);
    if (response.status === 200) {
      successMessage(response.data?.message || 'Kapı başarıyla silindi.');

      const goToPrevPage =
        state.totalDoors !== 1 && (state.totalDoors - 1) % 10 === 0;
      if (goToPrevPage)
        dispatch({
          type: DoorActionTypes.UPDATE_PAGE_COUNT,
          page: state.page - 1,
        });
      else
        dispatch({
          type: DoorActionTypes.DELETE_DOOR,
          door: selectedDoor,
        });

      setModalIsOpen(false);
    }
  };
  return (
    <Modal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      maxWidth="400px"
      isCustomModal={true}
    >
      <View
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        padding="12px"
      >
        <Title fontWeight="medium" fontSize="24px" color="textColor" mt="12px">
          Kapı Sil
        </Title>
        <Text margin="12px 0" fontSize="12px" color="textSecondaryColor">
          <strong>{selectedDoor.name}</strong> adlı kapıyı silmek istediğinizden
          emin misiniz ?
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
            onClick={handleDeleteDoor}
          >
            Kapı Sil
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

export default DeleteDoor;
