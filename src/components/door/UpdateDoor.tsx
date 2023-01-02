import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  Title,
  View,
  Text,
  TextField,
  ErrorMessage,
  Select,
  Button,
  Loader,
} from '..';
import { getApartments, successMessage, updateDoor } from '../../services';
import { DoorActionTypes, DoorContext } from '../../contexts';
import { IFormRequiredData, StyledForm } from './CreateDoor';
import { IApartment, IDoor } from '../../interfaces';
import { IDoorRow } from '../../consts';

interface IUpdateDoor {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedDoor: IDoorRow;
}

const UpdateDoor = ({
  modalIsOpen,
  setModalIsOpen,
  selectedDoor,
}: IUpdateDoor) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredData, setFormRequiredData] = useState<IFormRequiredData>({
    loading: true,
    apartments: [],
  });
  const defaultValues = {
    name: '',
    type: null,
    camiplink: '',
    apartmentId: null,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IDoor>({
    defaultValues: { ...defaultValues },
  });
  const { dispatch } = useContext(DoorContext);

  const onSubmit = async (form: IDoor) => {
    setLoading(true);
    try {
      const response = await updateDoor(selectedDoor.id, {
        ...form,
        apartmentId: (form.apartmentId as any).value,
        type: (form.type as any).value,
      });
      if (response.status === 200) {
        successMessage(response.data?.message || 'Kapı başarıyla güncellendi.');
        const created_at = new Date().toLocaleString();
        dispatch({
          type: DoorActionTypes.UPDATE_DOOR,
          door: {
            ...form,
            id: selectedDoor.id,
            created_at,
            apartmentId: (form.apartmentId as any).value,
            type: (form.type as any).value,
          },
        });
      }
    } catch (_) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApartments(0, 200);
        const apartments = response.data.resultData;
        const updatedApartments = apartments.map(
          ({ name, id }: IApartment) => ({
            label: name,
            value: id,
          })
        );
        const selectedApartment = updatedApartments.find(
          (item) => item.value === selectedDoor.apartmentId
        );
        reset({
          ...selectedDoor,
          type: {
            label: selectedDoor.type === 0 ? 'Giriş' : 'Çıkış',
            value: selectedDoor.type,
          } as any,
          apartmentId: {
            label: selectedApartment.label,
            value: selectedApartment.value,
          } as any,
        });
        setFormRequiredData({
          apartments: updatedApartments,
          loading: false,
        });
      } catch (error) {
        setFormRequiredData((data) => ({ ...data, loading: false }));
      }
    };
    fetchData().catch((_) =>
      setFormRequiredData((data) => ({ ...data, loading: false }))
    );
  }, [reset, selectedDoor]);
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
          Kapı güncelle
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Sisteme eklenen kapı bilgisini güncelle.
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
                    message: 'Lütfen kapı ismini giriniz.',
                  },
                }}
                placeholder="Kapı ismi"
              />
              {errors.name && (
                <ErrorMessage> {errors.name?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="type"
                control={control}
                options={[
                  {
                    label: 'Giriş',
                    value: 0,
                  },
                  {
                    label: 'Çıkış',
                    value: 1,
                  },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen kapı tipini seçiniz.',
                  },
                }}
                placeholder="Kapı tipi"
                isLoading={formRequiredData.loading}
              />
              {errors.type && (
                <ErrorMessage> {errors.type?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="camiplink"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Kapı ip linkini giriniz.',
                  },
                }}
                placeholder="Kapı ip link"
              />
              {errors.camiplink && (
                <ErrorMessage> {errors.camiplink?.message}</ErrorMessage>
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
                Kapı Güncelle
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

export default UpdateDoor;
