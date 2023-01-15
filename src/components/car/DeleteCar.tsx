import React, { Dispatch, useContext } from 'react';
import { ICarRow } from '../../consts';
import { Modal, Title, View, Text, Button } from '..';
import { CarActionTypes, CarContext } from '../../contexts';
import { deleteCar, successMessage } from '../../services';

interface IDeleteCar {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedCar: ICarRow;
}

const DeleteCar = ({
  modalIsOpen,
  setModalIsOpen,
  selectedCar,
}: IDeleteCar) => {
  const { state, dispatch } = useContext(CarContext);

  const handleDeleteCar = async () => {
    const response = await deleteCar(selectedCar.id);
    if (response.status === 200) {
      successMessage(response.data?.message || 'Blok başarıyla silindi.');

      const goToPrevPage =
        state.totalCars !== 1 && (state.totalCars - 1) % 10 === 0;
      if (goToPrevPage)
        dispatch({
          type: CarActionTypes.UPDATE_PAGE_COUNT,
          page: state.page - 1,
        });
      else dispatch({ type: CarActionTypes.DELETE_CAR, car: selectedCar });

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
          Araç Sil
        </Title>
        <Text margin="12px 0" fontSize="12px" color="textSecondaryColor">
          <strong>
            {selectedCar.plate} plakası olan - {selectedCar.ownername}{' '}
            {selectedCar.ownersurname} kişisine ait olan
          </strong>{' '}
          aracı silmek istediğinizden emin misiniz ?
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
            onClick={handleDeleteCar}
          >
            Araç Sil
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

export default DeleteCar;
