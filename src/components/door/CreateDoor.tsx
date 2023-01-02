import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
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
import { DoorActionTypes, DoorContext } from '../../contexts';
import { IApartment, IDoor, ISelectOption } from '../../interfaces';
import { addDoor, getApartments, successMessage } from '../../services';

export const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

interface ICreateDoor {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormRequiredData {
  loading: boolean;
  apartments: Array<ISelectOption>;
}

const CreateDoor = ({ modalIsOpen, setModalIsOpen }: ICreateDoor) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredData, setFormRequiredData] = useState<IFormRequiredData>({
    loading: true,
    apartments: [],
  });
  const dataFetchRef = useRef<boolean>(true);
  const defaultValues = {
    name: '',
    type: 0,
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
  const { state, dispatch } = useContext(DoorContext);

  const onSubmit = async (form: IDoor) => {
    setLoading(true);
    console.log('form', form);
    try {
      const response = await addDoor({
        ...form,
        apartmentId: (form.apartmentId as any).value,
        type: (form.type as any).value,
      });
      if (response.status === 200) {
        successMessage(response.data?.message || 'Kapı başarıyla eklendi.');
        const id = state.doors[state.doors.length - 1].id + 1 || 1;
        const created_at = new Date().toLocaleString();
        dispatch({
          type: DoorActionTypes.ADD_DOOR,
          door: {
            ...form,
            created_at,
            id,
            apartmentId: (form.apartmentId as any).value,
            type: (form.type as any).value,
          },
        });
        reset(defaultValues);
      }
    } catch (_) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
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
    }
  }, []);

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
          Yeni Kapı Ekle
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Apartmana yeni kapı ekle.
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
                Kapı Ekle
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

export default CreateDoor;
