import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { GateProcesActionTypes, GateProcesContext } from '../../contexts';
import { IDoor, IGateProces, ISelectOption } from '../../interfaces';
import { addGateProces, getDoors, successMessage } from '../../services';

const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

interface ICreateGateProces {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormRequiredData {
  loading: boolean;
  doors: Array<ISelectOption>;
}

const CreateGateProces = ({
  modalIsOpen,
  setModalIsOpen,
}: ICreateGateProces) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredData, setFormRequiredData] = useState<IFormRequiredData>({
    loading: true,
    doors: [],
  });
  const dataFetchRef = useRef<boolean>(true);
  const defaultValues = {
    isdone: null,
    processimageurl: '',
    doorId: null,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IGateProces>({
    defaultValues: { ...defaultValues },
  });
  const { state, dispatch } = useContext(GateProcesContext);

  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
      const fetchData = async () => {
        try {
          const response = await getDoors(0, 100);
          const doors = response.data.resultData;
          const updatedDoors = doors.map(({ name, id }: IDoor) => ({
            label: name,
            value: id,
          }));
          setFormRequiredData({
            doors: updatedDoors,
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

  const onSubmit = async (form: IGateProces) => {
    try {
      setLoading(true);
      console.log('form', form);
      const response = await addGateProces({
        ...form,
        doorId: (form.doorId as any).value,
        isdone: (form.isdone as any).value,
        carId: 11
      });
      if (response.status === 200) {
        successMessage(
          response.data?.message || 'Giriş çıkış işlemi başarıyla eklendi.'
        );
        const id =
          state.gateProcesses[state.gateProcesses.length - 1].id + 1 || 1;
        const created_at = new Date().toLocaleString();
        dispatch({
          type: GateProcesActionTypes.ADD_GATEPROCES,
          gateProces: {
            ...form,
            created_at,
            id,
            doorId: (form.doorId as any).value,
            isdone: (form.isdone as any).value
          },
        });
        reset(defaultValues);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
          Yeni İşlem Oluştur
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Sisteme yeni giriş çıkış işlemi ekle.
        </Text>
        <View width="100%" marginTop="36px" marginBottom="36px">
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="isdone"
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
                    message: 'Lütfen işlem bilgisini seçiniz.',
                  },
                }}
                placeholder="Tamamlandı mı ?"
              />
              {errors.isdone && (
                <ErrorMessage> {errors.isdone?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="processimageurl"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen fotoğraf url bilgisi giriniz',
                  },
                }}
                placeholder="Fotoğraf kaynağı"
              />
              {errors.processimageurl && (
                <ErrorMessage> {errors.processimageurl?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="doorId"
                control={control}
                options={formRequiredData.doors}
                isLoading={formRequiredData.loading}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen kapı seçiniz',
                  },
                }}
                placeholder="Kapı seçiniz"
              />
              {errors.doorId && (
                <ErrorMessage> {errors.doorId?.message}</ErrorMessage>
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
                İşlem Oluştur
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

export default CreateGateProces;
