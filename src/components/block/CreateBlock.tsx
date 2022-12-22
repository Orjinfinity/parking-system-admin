import React, { Dispatch, useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BlockActionTypes, BlockContext } from '../../contexts/BlockContext';
import { IApartment, IBlock } from '../../interfaces';
import { addBlock, getApartments, successMessage } from '../../services';
import Modal from '../modal/Modal';
import Title from '../title/Title';
import View from '../view/View';
import Text from '../text/Text';
import styled from 'styled-components';
import TextField from '../textfield/TextField';
import ErrorMessage from '../text/ErrorMessage';
import Select, { ISelectOption } from '../select/Select';
import Button from '../button/Button';
import Loader from '../loader/Loader';

export const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

interface ICreateBlock {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormRequiredData {
  loading: boolean;
  apartments: Array<ISelectOption>
}

const CreateBlock = ({ modalIsOpen, setModalIsOpen }: ICreateBlock) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredData, setFormRequiredData] = useState<IFormRequiredData>({
    loading: true,
    apartments: []
  })
  const dataFetchRef = useRef<boolean>(true)
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
  const { state, dispatch } = useContext(BlockContext);

  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
      const fetchData = async () => {
        try {
          const response = await getApartments(0)
          const apartments = response.data.resultData;
          const updatedApartments = apartments.map(({ name, id }: IApartment) => ({
            label: name,
            value: id,
          }));
          setFormRequiredData({ apartments: updatedApartments, loading: false })
        } catch (error) {
          setFormRequiredData(data => ({...data, loading: false}))
        }
      };
      fetchData().catch((_) =>
        setFormRequiredData(data => ({...data, loading: false}))
      );
    }
  }, []);

  const onSubmit = async (form: IBlock) => {
    setLoading(true);
    console.log('form', form)
    const response = await addBlock({ ...form, apartmentId: (form.apartmentId as any).value });
    if (response.status === 200) {
      successMessage(response.data?.message || 'Blok başarıyla eklendi.');
      const id = state.blocks[state.blocks.length - 1].id + 1 || 1;
      const created_at = new Date().toLocaleString();
      dispatch({
        type: BlockActionTypes.ADD_BLOCK,
        block: { ...form, created_at, id, apartmentId: (form.apartmentId as any).value },
      });
      reset(defaultValues);
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
          Yeni Blok Oluştur
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Sisteme yeni blok ekle.
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
                placeholder="Apartman seçiniz"
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
                Oluştur
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

export default CreateBlock;
