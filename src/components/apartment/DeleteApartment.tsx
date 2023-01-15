import React, { Dispatch, useContext } from 'react';
import { Modal, Title, View, Text, Button } from '..';
import { ApartmentActionTypes, ApartmentContext } from '../../contexts';
import { deleteApartment, successMessage } from '../../services';
import { IApartmentRow } from '../../consts';

interface IDeleteApartment {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedApartment: IApartmentRow;
}

const DeleteApartment = ({
  modalIsOpen,
  setModalIsOpen,
  selectedApartment,
}: IDeleteApartment) => {
  const { state, dispatch } = useContext(ApartmentContext);

  const handleDeleteApartment = async () => {
    const response = await deleteApartment(selectedApartment.id);
    if (response.status === 200) {
      successMessage(response.data?.message || 'Apartman başarıyla silindi.');

      const goToPrevPage =
        state.totalApartments !== 1 && (state.totalApartments - 1) % 10 === 0;
      if (goToPrevPage)
        dispatch({
          type: ApartmentActionTypes.UPDATE_PAGE_COUNT,
          page: state.page - 1,
        });
      else
        dispatch({
          type: ApartmentActionTypes.DELETE_APARTMENT,
          apartment: selectedApartment,
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
          Apartman Sil
        </Title>
        <Text margin="12px 0" fontSize="12px" color="textSecondaryColor">
          <strong>{selectedApartment.name}</strong> adlı apartmanı silmek
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
            onClick={handleDeleteApartment}
          >
            Apartmanı Sil
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

export default DeleteApartment;
