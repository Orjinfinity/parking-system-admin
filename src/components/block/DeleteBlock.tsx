import React, { Dispatch, useContext } from 'react';
import { Modal, Title, View, Text, Button } from '..';
import { BlockActionTypes, BlockContext } from '../../contexts/BlockContext';
import { deleteBlock, successMessage } from '../../services';
import { IBlockRow } from '../../consts';

interface IDeleteBlock {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedBlock: IBlockRow;
}

const DeleteBlock = ({
  modalIsOpen,
  setModalIsOpen,
  selectedBlock,
}: IDeleteBlock) => {
  const { state, dispatch } = useContext(BlockContext);

  const handleDeleteApartment = async () => {
    const response = await deleteBlock(selectedBlock.id);
    if (response.status === 200) {
      successMessage(response.data?.message || 'Blok başarıyla silindi.');

      const goToPrevPage =
        state.totalBlocks !== 1 && (state.totalBlocks - 1) % 10 === 0;
      if (goToPrevPage)
        dispatch({
          type: BlockActionTypes.UPDATE_PAGE_COUNT,
          page: state.page - 1,
        });
      else
        dispatch({ type: BlockActionTypes.DELETE_BLOCK, block: selectedBlock });

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
          Blok Sil
        </Title>
        <Text margin="12px 0" fontSize="12px" color="textSecondaryColor">
          <strong>{selectedBlock.name}</strong> adlı blok'u silmek
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
            Blok Sil
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

export default DeleteBlock;
