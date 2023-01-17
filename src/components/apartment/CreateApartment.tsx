import React, { Dispatch, useContext, useState } from 'react';
import styled from 'styled-components';
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
import { ApartmentActionTypes, ApartmentContext } from '../../contexts';
import { addApartment, successMessage } from '../../services';
import { IApartment } from '../../interfaces';
import { Countrys } from '../../consts';

const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

interface ICreateApartment {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const CreateApartment = ({ modalIsOpen, setModalIsOpen }: ICreateApartment) => {
  const [loading, setLoading] = useState<boolean>(false);
  const defaultValues = {
    name: '',
    address: '',
    city: '',
    country: '',
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IApartment>({
    defaultValues: { ...defaultValues },
  });
  const { state, dispatch } = useContext(ApartmentContext);

  const onSubmit = async (form: IApartment) => {
    try {
      setLoading(true);
      const response = await addApartment({
        ...form,
        country: (form.country as any).value,
      });
      if (response.status === 200) {
        successMessage(response.data?.message || 'Apartman başarıyla eklendi.');
        const id = state?.apartments[state.apartments.length - 1]?.id + 1 || 1;
        const created_at = new Date().toLocaleString();
        dispatch({
          type: ApartmentActionTypes.ADD_APARTMENT,
          apartment: {
            ...form,
            country: (form.country as any).value,
            created_at,
            id,
          },
        });
        reset(defaultValues);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false)
    }
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
          Yeni Apartman Oluştur
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Sisteme yeni apartman ekle.
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
                    message: 'Lütfen site adını giriniz',
                  },
                }}
                placeholder="Site Adı"
              />
              {errors.name && (
                <ErrorMessage> {errors.name?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="address"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen adres bilgisini giriniz',
                  },
                }}
                placeholder="Adres Bilgisi"
              />
              {errors.address && (
                <ErrorMessage> {errors.address?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="city"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen şehir bilgisini giriniz',
                  },
                }}
                placeholder="Şehir Adı"
              />
              {errors.city && (
                <ErrorMessage> {errors.city?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="country"
                control={control}
                options={Countrys}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen ülke seçiniz',
                  },
                }}
                placeholder="Ülke seçiniz"
              />
              {errors.country && (
                <ErrorMessage> {errors.country?.message}</ErrorMessage>
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

export default CreateApartment;
