import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
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
import { successMessage, updateApartment } from '../../services';
import { Countrys, IApartmentRow } from '../../consts';
import { IApartment } from '../../interfaces';

const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

interface IDeleteApartment {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedApartment: IApartmentRow;
}

const UpdateApartment = ({
  modalIsOpen,
  setModalIsOpen,
  selectedApartment,
}: IDeleteApartment) => {
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
  const { dispatch } = useContext(ApartmentContext);

  const onSubmit = async (form: IApartment) => {
    setLoading(true);
    const response = await updateApartment(selectedApartment.id, {
      ...form,
      country: (form.country as any).value,
    });
    if (response.status === 200) {
      successMessage(
        response.data?.message || 'Apartman başarıyla güncellendi.'
      );
      dispatch({
        type: ApartmentActionTypes.UPDATE_APARTMENT,
        apartment: {
          ...form,
          created_at: selectedApartment.created_at,
          country: (form.country as any).value,
          id: selectedApartment.id,
        },
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const { name, country, city, address } = selectedApartment;
    reset({
      name,
      country: { label: country, value: country } as any,
      city,
      address,
    });
  }, [selectedApartment, reset]);

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
          Site Bilgilerini Güncelle
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Sistemde bulunan site bilgisini güncelle.
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
                    message: 'Lütfen apartman adını giriniz',
                  },
                  minLength: {
                    value: 4,
                    message: 'Lütfen 4 karakter ve üstü site bilgisi giriniz.'
                  },
                  maxLength: {
                    value: 60,
                    message: 'Lütfen maximum 60 karakter giriniz.'
                  }
                }}
                placeholder="Apartman Adı"
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
                  minLength: {
                    value: 20,
                    message: 'Lütfen 20 karakter ve üstü adres bilgisi giriniz.'
                  },
                  maxLength: {
                    value: 200,
                    message: 'Lütfen maximum 200 karakter giriniz.'
                  }
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
                  minLength: {
                    value: 3,
                    message: 'Lütfen 3 karakter ve üstü şehir ismi giriniz.'
                  },
                  maxLength: {
                    value: 40,
                    message: 'Lütfen maximum 40 karakter giriniz.'
                  }
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

export default UpdateApartment;
