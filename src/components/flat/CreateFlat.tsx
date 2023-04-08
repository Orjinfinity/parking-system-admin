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
  Button,
  Loader,
  Select,
} from '..';
import { addFlat, getBlocks, successMessage } from '../../services';
import { FlatActionTypes, FlatContext } from '../../contexts';
import { IBlock, ISelectOption } from '../../interfaces';

export const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

interface ICreateFlat {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export interface IFlatForm {
  number: string;
  block: string;
  floor: number;
  // blockId?: number;
}

export interface IFormRequiredData {
  loading: boolean;
  blocks: Array<ISelectOption>;
}

const CreateFlat = ({ modalIsOpen, setModalIsOpen }: ICreateFlat) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredData, setFormRequiredData] = useState<IFormRequiredData>({
    loading: true,
    blocks: [],
  });
  const dataFetchRef = useRef<boolean>(true);
  const defaultValues = {
    number: '',
    block: null,
    floor: '',
  };
  const {
    handleSubmit,
    control,
    reset,
    // watch,
    // setValue,
    formState: { errors },
  } = useForm<IFlatForm>();
  const { state, dispatch } = useContext(FlatContext);

  // const [flatNumber] = watch(['number']);

  const onSubmit = async (form: IFlatForm) => {
    console.log('form', form);
    try {
      setLoading(true);
      const response = await addFlat({
        ...form,
        blockId: (form.block as any).value,
        floor: Number(form.floor),
        number: form.number,
      });
      if (response.status === 200) {
        successMessage(response.data?.message || 'Daire başarıyla eklendi.');
        const id = state?.flats[state?.flats.length - 1]?.id + 1 || 1;
        const created_at = new Date().toLocaleString();
        dispatch({
          type: FlatActionTypes.ADD_FLAT,
          flat: {
            ...form,
            created_at,
            id,
            blockId: (form.block as any).value,
            block: (form.block as any).label,
          },
        });
        reset(defaultValues as any);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   let val = parseInt(flatNumber, 10);
  //   if (val < 0) {
  //     setValue('number', "0")
  //   }
  // }, [flatNumber, setValue])

  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
      const fetchData = async () => {
        try {
          const response = await getBlocks(0, 200);
          const blocks = response.data.resultData;
          const updatedBlocks = blocks.map(({ name, id }: IBlock) => ({
            label: name,
            value: id,
          }));
          setFormRequiredData({ blocks: updatedBlocks, loading: false });
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
          Yeni Daire Oluştur
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Sisteme yeni daire ekle.
        </Text>
        <View width="100%" marginTop="36px" marginBottom="36px">
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="number"
                control={control}
                type="text"
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
                type="text"
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
              {/* <Select
                name="floor"
                control={control}
                options={[
                  { label: '1 Araç', value: 1 },
                  { label: '2 Araç', value: 2 },
                  { label: '3 Araç', value: 3 },
                  { label: '4 Araç', value: 4 },
                  { label: '5 Araç', value: 5 },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen araba sayısını seçiniz',
                  },
                }}
                placeholder="Araba sayısı seçiniz"
              />
              {errors.floor && (
                <ErrorMessage> {errors.floor?.message}</ErrorMessage>
              )} */}
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

export default CreateFlat;
