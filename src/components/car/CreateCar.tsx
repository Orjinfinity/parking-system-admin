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
import { addCar, errorMessage, getAllBlocksByApartmentId, getApartments, getFlatsByBlockId, successMessage } from '../../services';
import { CarActionTypes, CarContext } from '../../contexts';
import { IApartment, IBlock, ICar, IFlat, ISelectOption, LocalStorageKeys } from '../../interfaces';
import { Regex } from '../../utils';
import { getUserIsApartmentAdmin } from '../../utils/userHelper';

export const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;

interface ICreateCar {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

interface ISelectField {
  loading: boolean;
  options: Array<ISelectOption>;
}

export interface IFormRequiredData {
  loading: boolean;
  apartments: Array<ISelectOption>;
}

const CreateCar = ({ modalIsOpen, setModalIsOpen }: ICreateCar) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredData, setFormRequiredData] = useState<IFormRequiredData>({
    loading: true,
    apartments: []
  });
  const [blocks, setBlocks] = useState<ISelectField>({
    loading: false,
    options: [],
  });
  const [flats, setFlats] = useState<ISelectField>({
    loading: false,
    options: [],
  });

  const [apartmentId, setApartmentId] = useState<number>();
  const [blockId, setBlockId] = useState<number>();

  const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
  const isApartmentAdmin = getUserIsApartmentAdmin();

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
    apartmentId: isApartmentAdmin ? { label: user.apartment?.apartment?.name, value: user.apartment?.apartment?.id} as any : null,
    blockId: null,
    flatId: null,
  };
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ICar>({
    defaultValues: { ...defaultValues },
  });
  const { state, dispatch } = useContext(CarContext);

  const [apartmentChanges, blockChanges] = watch(['apartmentId', 'blockId']);
  console.log('field', apartmentChanges, blockChanges);

  useEffect(() => {
    if (
      (apartmentChanges as any)?.value &&
      (apartmentChanges as any).value !== apartmentId
    ) {
      setBlocks((prev) => ({ ...prev, loading: true }));
      const fetchBlocks = async () => {
        try {
          const response = await getAllBlocksByApartmentId(
            (apartmentChanges as any)?.value
          );
          if (response.data?.totalPages) {
            const blocks = response.data.resultData || [];
            const blockFormField = blocks.map(({ id, name }: IBlock) => ({
              label: name,
              value: id,
            }));
            setBlocks((prev) => ({
              ...prev,
              options: blockFormField,
              loading: false,
            }));
            setFlats((prev) => ({ ...prev, options: [], loading: false }));
            if ((apartmentChanges as any).value !== apartmentId) {
              setValue('blockId', null);
            }
          } else {
            setBlocks((prev) => ({ ...prev, options: [], loading: false }));
            setFlats((prev) => ({ ...prev, options: [], loading: false }));
            errorMessage('Seçili siteye ait bir blok bulunamadı.');
          }
        } catch (error) {
          setBlocks((prev) => ({ ...prev, loading: false }));
        }
        setApartmentId((apartmentChanges as any).value);
      };

      fetchBlocks();
    }
  }, [apartmentChanges, setValue, apartmentId]);

  useEffect(() => {
    if (
      ((blockChanges as any)?.value &&
        (blockChanges as any).value !== blockId) ||
      ((blockChanges as any)?.value &&
        !(blocks.options && blocks.options.length))
    ) {
      setFlats((prev) => ({ ...prev, loading: true }));
      const fetchFlats = async () => {
        try {
          const response = await getFlatsByBlockId(
            (blockChanges as any)?.value
          );
          if (response.data?.totalPages) {
            const flats = response.data.resultData || [];
            const flatFormField = flats.map(({ id, number }: IFlat) => ({
              label: number,
              value: id,
            }));
            setFlats((prev) => ({
              ...prev,
              options: flatFormField,
              loading: false,
            }));
            if ((blockChanges as any).value !== blockId) {
              setValue('flatId', null);
            }
          } else {
            setFlats((prev) => ({ ...prev, options: [], loading: false }));
            errorMessage('Seçili blok bilgisine ait bir daire bulunamadı.');
          }
        } catch (error) {
          setFlats((prev) => ({ ...prev, loading: false }));
        }
        setBlockId((blockChanges as any).value);
      };
      fetchFlats();
    }
  }, [blockChanges, setValue, blockId, blocks]);

  const onSubmit = async (form: ICar) => {
    setLoading(true);
    console.log('form', form);
    try {
      const {apartmentId, blockId, ...formValues} = form;
      const response = await addCar({
        ...formValues,
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
            isguest: (form.isguest as any).value ? 'Evet' : 'Hayır',
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
      const defaultValue = { label: user.apartment?.apartment?.name, value: user.apartment?.apartment?.id}
      if(isApartmentAdmin) setValue('apartmentId', defaultValue as any)
      const fetchData = async () => {
        try {
          const resApartments = await getApartments(0, 200);
          const apartments = resApartments.data.resultData;
          const updatedApartments = apartments.map(
            ({ id, name }: IApartment) => ({
              label: name,
              value: id,
            })
          );
          setFormRequiredData({ apartments: updatedApartments, loading: false });
        } catch (error) {
          setFormRequiredData((data) => ({ ...data, loading: false }));
        }
      };
      fetchData().catch((_) =>
        setFormRequiredData((data) => ({ ...data, loading: false }))
      );
    }
    
  }, [isApartmentAdmin, setValue, user]);

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
                name="apartmentId"
                control={control}
                options={formRequiredData.apartments}
                isLoading={formRequiredData.loading}
                isDisabled={isApartmentAdmin}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen hangi siteye eklemek istediğinizi giriniz',
                  },
                }}
                placeholder="Kullanıcının sitesini seçiniz"
              />
              {errors.apartmentId && (
                <ErrorMessage> {errors.apartmentId?.message}</ErrorMessage>
              )}
            </View>
            {blocks.options && blocks.options.length ? (
              <View display="flex" flexDirection="column" gridColumn="1/5">
                <Select
                  name="blockId"
                  control={control}
                  options={blocks.options}
                  isLoading={blocks.loading}
                  rules={{
                    required: {
                      value: true,
                      message:
                        'Lütfen hangi bloka eklemek istediğinizi giriniz',
                    },
                  }}
                  placeholder="Kullanıcının blok bilgisini seçiniz"
                />
                {errors.blockId && (
                  <ErrorMessage> {errors.blockId?.message}</ErrorMessage>
                )}
              </View>
            ) : null}
            {blocks.options?.length && flats.options && flats.options.length ? (
              <View display="flex" flexDirection="column" gridColumn="1/5">
                <Select
                  name="flatId"
                  control={control}
                  options={flats.options}
                  isLoading={flats.loading}
                  rules={{
                    required: {
                      value: true,
                      message: 'Lütfen kullanıcı daire bilgisini giriniz',
                    },
                  }}
                  placeholder="Kullanıcının daire bilgisini seçiniz"
                />
                {errors.flatId && (
                  <ErrorMessage> {errors.flatId?.message}</ErrorMessage>
                )}
              </View>
            ) : null}
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
