import React, { Dispatch, useContext } from 'react';
import { IRequestCallRow } from '../../consts';
import { Modal, Title, View, Text, Button } from '..';
import { RequestCallActionTypes, RequestCallContext } from '../../contexts';
import {
  deleteRequestCall,
  errorMessage,
  successMessage,
} from '../../services';

interface IDeleteRequestCall {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedRequestCall: IRequestCallRow;
}

const DeleteRequestCall = ({
  modalIsOpen,
  setModalIsOpen,
  selectedRequestCall,
}: IDeleteRequestCall) => {
  const { state, dispatch } = useContext(RequestCallContext);

  const handleDeleteRequestCall = async () => {
    try {
      const response = await deleteRequestCall(selectedRequestCall.id);
      if (response.status === 200) {
        successMessage(
          response.data?.message || 'Acil durum başarıyla silindi.'
        );

        const goToPrevPage =
          state.totalRequestCalls !== 1 &&
          (state.totalRequestCalls - 1) % 10 === 0;
        if (goToPrevPage)
          dispatch({
            type: RequestCallActionTypes.UPDATE_PAGE_COUNT,
            page: state.page - 1,
          });
        else
          dispatch({
            type: RequestCallActionTypes.DELETE_REQUESTCALL,
            requestCall: selectedRequestCall,
          });

        setModalIsOpen(false);
      }
    } catch (error) {
      errorMessage(error?.message || 'Daire silinirken bir sorun oluştu.');
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
          Acil Durum Çağrısı Sil
        </Title>
        <Text margin="12px 0" fontSize="12px" color="textSecondaryColor">
          <strong>{selectedRequestCall.flatId}</strong> numaralı daire için
          eklenen acil durumu silmek istediğinizden emin misiniz ?
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
            onClick={handleDeleteRequestCall}
          >
            Acil Durum Sil
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

export default DeleteRequestCall;
