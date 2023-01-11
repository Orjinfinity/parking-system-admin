import React, { Dispatch, useContext } from 'react';
import { Modal, Title, View, Text, Button } from '..';
import { FlatActionTypes, FlatContext } from '../../contexts';
import { deleteFlat, errorMessage, successMessage } from '../../services';
import { IFlatRow } from '../../consts';

interface IDeleteFlat {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedFlat: IFlatRow;
}

const DeleteFlat = ({
  modalIsOpen,
  setModalIsOpen,
  selectedFlat,
}: IDeleteFlat) => {
  const { state, dispatch } = useContext(FlatContext);

  const handleDeleteFlat = async () => {
    try {
      const response = await deleteFlat(selectedFlat.id);
      if (response.status === 200) {
        successMessage(response.data?.message || 'Daire başarıyla silindi.');
  
        const goToPrevPage =
          state.totalFlats !== 1 && (state.totalFlats - 1) % 10 === 0;
        if (goToPrevPage)
          dispatch({
            type: FlatActionTypes.UPDATE_PAGE_COUNT,
            page: state.page - 1,
          });
        else dispatch({ type: FlatActionTypes.DELETE_FLAT, flat: selectedFlat });
  
        setModalIsOpen(false);
      }
    } catch (error) {
      errorMessage(error?.message || 'Daire silinirken bir sorun oluştu.')
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
          Daire Sil
        </Title>
        <Text margin="12px 0" fontSize="12px" color="textSecondaryColor">
          <strong>{selectedFlat.number}</strong> numaralı daireyi silmek
          istediğinizden emin misiniz ?
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
            onClick={handleDeleteFlat}
          >
            Daire Sil
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

export default DeleteFlat;
