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
  PhoneInput,
  Button,
  Loader,
  Select,
} from '..';
import { addCar, getFlats, successMessage } from '../../services';
import { CarActionTypes, CarContext } from '../../contexts';
import { ICar, IFlat, ISelectOption } from '../../interfaces';
import { Regex } from '../../utils';

export const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

interface ICreateCar {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormRequiredData {
  loading: boolean;
  flats: Array<ISelectOption>;
}

const CreateCar = ({ modalIsOpen, setModalIsOpen }: ICreateCar) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredData, setFormRequiredData] = useState<IFormRequiredData>({
    loading: true,
    flats: [],
  });
  const dataFetchRef = useRef<boolean>(true);
  const defaultValues = {
    plate: '',
    ownername: '',
    ownersurname: '',
    ownerphone: '',
    brand: '',
    model: '',
    color: '',
    isguest: false,
    flatId: null,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICar>({
    defaultValues: { ...defaultValues },
  });
  const { state, dispatch } = useContext(CarContext);

  const onSubmit = async (form: ICar) => {
    setLoading(true);
    console.log('form', form);
    try {
      const response = await addCar({
        ...form,
        flatId: Number((form.flatId as any).value),
        isguest: (form.isguest as any).value,
      });
      if (response.status === 200) {
        successMessage(response.data?.message || 'Araç başarıyla eklendi.');
        const id = state?.cars[state.cars.length - 1]?.id + 1 || 1;
        const created_at = new Date().toLocaleString();
        dispatch({
          type: CarActionTypes.ADD_CAR,
          car: {
            ...form,
            created_at,
            id,
            flatId: (form.flatId as any).value,
            isguest: (form.isguest as any).value,
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
          const response = await getFlats(0, 200);
          const flats = response.data.resultData;
          const updatedFlats = flats.map(({ number, id }: IFlat) => ({
            label: number,
            value: id,
          }));
          setFormRequiredData({ flats: updatedFlats, loading: false });
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
          Yeni Araç Ekle
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Daireye yeni araç ekle.
        </Text>
        <View width="100%" marginTop="36px" marginBottom="36px">
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="plate"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen araç plakasını giriniz.',
                  },
                }}
                placeholder="Araç plakası"
              />
              {errors.plate && (
                <ErrorMessage> {errors.plate?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/3">
              <TextField
                name="ownername"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Araç sahibinin adını giriniz.',
                  },
                }}
                placeholder="Araç sahibinin adı"
              />
              {errors.ownername && (
                <ErrorMessage> {errors.ownername?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="3/5">
              <TextField
                name="ownersurname"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Araç sahibinin soyadını giriniz.',
                  },
                }}
                placeholder="Araç sahibinin soyadı"
              />
              {errors.ownersurname && (
                <ErrorMessage> {errors.ownersurname?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <PhoneInput
                name="ownerphone"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen telefon numaranızı giriniz.',
                  },
                  pattern: {
                    value: Regex.PHONE_NUMBER,
                    message:
                      'Lütfen doğru formatta telefon numaranızı giriniz.',
                  },
                }}
                placeholder="Telefon numarnız"
              />
              {errors.ownerphone && (
                <ErrorMessage> {errors.ownerphone?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="brand"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen araç marka bilgisini giriniz.',
                  },
                }}
                placeholder="Araç markası"
              />
              {errors.brand && (
                <ErrorMessage> {errors.brand?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="model"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen araç model bilgisini giriniz.',
                  },
                }}
                placeholder="Araç modeli"
              />
              {errors.model && (
                <ErrorMessage> {errors.model?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="color"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen araç renk bilgisini giriniz.',
                  },
                }}
                placeholder="Araç rengi"
              />
              {errors.color && (
                <ErrorMessage> {errors.color?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="isguest"
                control={control}
                options={[
                  {
                    label: 'Evet',
                    value: true,
                  },
                  {
                    label: 'Hayır',
                    value: false,
                  },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen misafir araç bilgisini giriniz.',
                  },
                }}
                placeholder="Misafir araç mı ?"
              />
              {errors.isguest && (
                <ErrorMessage> {errors.isguest?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="flatId"
                control={control}
                options={formRequiredData.flats}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen daire seçiniz.',
                  },
                }}
                placeholder="Daire seçiniz"
              />
              {errors.flatId && (
                <ErrorMessage> {errors.flatId?.message}</ErrorMessage>
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
                Ekle
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

export default CreateCar;
