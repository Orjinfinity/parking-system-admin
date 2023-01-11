import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  Title,
  View,
  Text,
  TextField,
  ErrorMessage,
  Button,
  Loader,
  Select,
} from '..';
import { getBlocks, successMessage, updateFlat } from '../../services';
import { IFlatForm, IFormRequiredData, StyledForm } from './CreateFlat';
import { FlatActionTypes, FlatContext } from '../../contexts';
import { IBlock } from '../../interfaces';
import { IFlatRow } from '../../consts';

interface IUpdateFlat {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedFlat: IFlatRow;
}

const UpdateFlat = ({
  modalIsOpen,
  setModalIsOpen,
  selectedFlat,
}: IUpdateFlat) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredData, setFormRequiredData] = useState<IFormRequiredData>({
    loading: true,
    blocks: [],
  });
  const defaultValues = {
    number: 0,
    block: null,
    floor: 0,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFlatForm>({
    defaultValues: { ...defaultValues },
  });
  const { dispatch } = useContext(FlatContext);

  const onSubmit = async (form: IFlatForm) => {
    try {
      setLoading(true);
      const response = await updateFlat(selectedFlat.id, {
        ...form,
        blockId: (form.block as any).value,
        floor: Number(form.floor),
        number: Number(form.number),
      });
      if (response.status === 200) {
        successMessage(
          response.data?.message || 'Daire başarıyla güncellendi.'
        );
        dispatch({
          type: FlatActionTypes.UPDATE_FLAT,
          flat: {
            ...form,
            created_at: selectedFlat.created_at,
            id: selectedFlat.id,
            block: (form.block as any).label,
            blockId: (form.block as any).value,
          },
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFormRequiredData((data) => ({ ...data, loading: true }));
        const response = await getBlocks(0, 200);
        const blocks = response.data.resultData;
        const updatedBlocks = blocks.map(({ name, id }: IBlock) => ({
          label: name,
          value: id,
        }));
        const selectedBlock = updatedBlocks.find(
          (item) => item.value === selectedFlat.blockId
        );
        reset({
          floor: selectedFlat.floor,
          number: Number(selectedFlat.number),
          block: {
            label: selectedBlock.label,
            value: selectedFlat.blockId,
          } as any,
        });
        setFormRequiredData({ blocks: updatedBlocks, loading: false });
      } catch (error) {
        setFormRequiredData((data) => ({ ...data, loading: false }));
      }
    };
    fetchData().catch((_) =>
      setFormRequiredData((data) => ({ ...data, loading: false }))
    );
  }, [reset, selectedFlat]);

  return (
    <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
      <View
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        padding={['10px', '10px', '14px', '20px', '30px']}
      >
        <Title fontWeight="medium" fontSize="24px" color="textColor">
          Daire güncelle.
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Sisteme kayıtlı olan daireyi güncelle.
        </Text>
        <View width="100%" marginTop="36px" marginBottom="36px">
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="number"
                control={control}
                type="number"
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen daire numarasını giriniz',
                  },
                }}
                placeholder="Daire numarası"
              />
              {errors.number && (
                <ErrorMessage> {errors.number?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="block"
                control={control}
                options={formRequiredData.blocks}
                isLoading={formRequiredData.loading}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen blok seçiniz',
                  },
                }}
                placeholder="Blok seçiniz"
              />
              {errors.block && (
                <ErrorMessage> {errors.block?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="floor"
                control={control}
                type="number"
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen kaçıncı kat olduğunu giriniz',
                  },
                }}
                placeholder="Daire kat numarası"
              />
              {errors.floor && (
                <ErrorMessage> {errors.floor?.message}</ErrorMessage>
              )}
            </View>
            <View
              display="flex"
              justifyContent="center"
              gridColumn="1/5"
              marginTop="20px"
            >
              <Button
                fontSize="medium"
                letterSpacing=".46px"
                type="submit"
                variant="contained"
                color="primary"
                size="md"
              >
                Güncelle
              </Button>
              <Button
                fontSize="medium"
                width="112px"
                letterSpacing=".46px"
                variant="dashed"
                color="gray"
                size="md"
                ml="16px"
                onClick={() => setModalIsOpen(false)}
              >
                İptal
              </Button>
            </View>
          </StyledForm>
        </View>
      </View>
      {loading && <Loader />}
    </Modal>
  );
};

export default UpdateFlat;
