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
import { getApartments, successMessage, updateBlock } from '../../services';
import { BlockActionTypes, BlockContext } from '../../contexts';
import { IFormRequiredData, StyledForm } from './CreateBlock';
import { IApartment, IBlock } from '../../interfaces';
import { IBlockRow } from '../../consts';

interface IUpdateBlock {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedBlock: IBlockRow;
}

const UpdateBlock = ({
  modalIsOpen,
  setModalIsOpen,
  selectedBlock,
}: IUpdateBlock) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredData, setFormRequiredData] = useState<IFormRequiredData>({
    loading: true,
    apartments: [],
  });
  const defaultValues = {
    name: '',
    apartmentId: null,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IBlock>({
    defaultValues: { ...defaultValues },
  });
  const { dispatch } = useContext(BlockContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFormRequiredData((data) => ({ ...data, loading: true }));
        const response = await getApartments(0);
        const apartments = response.data.resultData;
        const updatedApartments = apartments.map(
          ({ name, id }: IApartment) => ({
            label: name,
            value: id,
          })
        );
        const { name, apartmentId } = selectedBlock;
        const selectedApartment = updatedApartments.find(
          (item) => item.value === apartmentId
        );
        reset({
          name,
          apartmentId: {
            label: selectedApartment.label,
            value: apartmentId,
          } as any,
        });
        setFormRequiredData({ apartments: updatedApartments, loading: false });
      } catch (error) {
        setFormRequiredData((data) => ({ ...data, loading: false }));
      }
    };
    fetchData().catch((_) => {
      setFormRequiredData((data) => ({ ...data, loading: false }));
    });
  }, [reset, selectedBlock]);

  const onSubmit = async (form: IBlock) => {
    console.log('form block', form)
    try {
      setLoading(true);
      const response = await updateBlock(selectedBlock.id, {
        ...form,
        apartmentId: (form.apartmentId as any).value,
      });
      if (response.status === 200) {
        successMessage(response.data?.message || 'Blok başarıyla güncellendi.');
        dispatch({
          type: BlockActionTypes.UPDATE_BLOCK,
          block: {
            ...form,
            id: selectedBlock.id,
            created_at: selectedBlock?.created_at,
            apartmentId: (form.apartmentId as any).value,
          },
        });
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };
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
          Blok Güncelle
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Sistem de bulunan blok bilgisini güncelle.
        </Text>
        <View width="100%" marginTop="36px" marginBottom="36px">
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen blok adını giriniz',
                  },
                }}
                placeholder="Blok Adı"
              />
              {errors.name && (
                <ErrorMessage> {errors.name?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="apartmentId"
                control={control}
                options={formRequiredData.apartments}
                isLoading={formRequiredData.loading}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen apartman seçiniz',
                  },
                }}
                placeholder={formRequiredData.loading ? "Loading" : "Apartman seçiniz"}
              />
              {errors.apartmentId && (
                <ErrorMessage> {errors.apartmentId?.message}</ErrorMessage>
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

export default UpdateBlock;
