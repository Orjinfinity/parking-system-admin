import React, {
  ChangeEvent,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { ICarRow } from '../../consts';
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
  Checkbox,
} from '..';
import { CarActionTypes, CarContext } from '../../contexts';
import {
  IApartment,
  IBlock,
  ICar,
  IFlat,
  ISelectOption,
  LocalStorageKeys,
} from '../../interfaces';
import {
  errorMessage,
  getAllBlocksByApartmentId,
  getApartments,
  getFlatsByBlockId,
  successMessage,
  updateCar,
} from '../../services';
import { StyledForm } from './CreateCar';
import { Regex } from '../../utils';
import { getUserIsApartmentAdmin } from '../../utils/userHelper';

interface IUpdateCar {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedCar: ICarRow;
}

interface ISelectField {
  loading: boolean;
  options: Array<ISelectOption>;
}

const UpdateCar = ({
  modalIsOpen,
  setModalIsOpen,
  selectedCar,
}: IUpdateCar) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [apartments, setApartments] = useState<ISelectField>({
    loading: false,
    options: [],
  });
  const [blocks, setBlocks] = useState<ISelectField>({
    loading: false,
    options: [],
  });
  const [flats, setFlats] = useState<ISelectField>({
    loading: false,
    options: [],
  });

  const [apartmentId, setApartmentId] = useState<number>(null);
  const [blockId, setBlockId] = useState<number>(null);
  const [checked, setChecked] = useState<boolean>(false);

  const isApartmentAdmin = getUserIsApartmentAdmin();
  const userInfo = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
  console.log('sel', selectedCar);
  const defaultValues = useMemo(() => {
    return {
      plate: selectedCar.plate || '',
      ownername: selectedCar.ownername || '',
      ownersurname: selectedCar.ownersurname || '',
      ownerphone: selectedCar.ownerphone || '',
      brand: selectedCar.brand || '',
      model: selectedCar.model || '',
      color: selectedCar.color || '',
      isguest: selectedCar.isguest != null ? { label: selectedCar.isguest, value: selectedCar.isguest === 'Evet'} as any : null,
      apartmentId: null,
      blockId: null,
      flatId: null,
    };
  }, [selectedCar])
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ICar>({ defaultValues });
  const { dispatch } = useContext(CarContext);

  const [apartmentChanges, blockChanges, flatChanges] = watch([
    'apartmentId',
    'blockId',
    'flatId',
  ]);

  const onSubmit = async (form: ICar) => {
    setLoading(true);
    console.log('form', form);
    try {
      const { apartmentId, blockId,...formValues } = form;
      const response = await updateCar(selectedCar.id, {
        ...formValues,
        flatId: Number((form.flatId as any).value),
        isguest: (form.isguest as any).value,
      });
      if (response.status === 200) {
        successMessage(response.data?.message || 'Araç başarıyla güncellendi.');
        dispatch({
          type: CarActionTypes.UPDATE_CAR,
          car: {
            ...formValues,
            id: selectedCar.id,
            created_at: selectedCar.created_at,
            flatId: (form.flatId as any).value,
            isguest: (form.isguest as any).label,
          },
        });
      }
    } catch (_) {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      const fetchApartments = async () => {
        try {
          const response = await getApartments(0, 200);
          if (response.data?.totalPages) {
            const apartments = response.data.resultData || [];
            const apartmentsFormField = apartments.map(
              ({ id, name }: IApartment) => ({
                label: name,
                value: id,
              })
            );
            setApartments((prev) => ({
              ...prev,
              options: apartmentsFormField,
              loading: false,
            }));
            if (isApartmentAdmin && userInfo?.apartment)
              setValue('apartmentId', {
                label: userInfo.apartment?.apartment?.name,
                value: userInfo?.apartment?.apartment?.id,
              } as any);
          } else {
            setApartments({ loading: false, options: [] });
            errorMessage(
              'Kullanıcının eklenebileceği veya düzenlenebileceği bir site bulunamadı.'
            );
          }
        } catch (error) {
          setApartments((prev) => ({
            ...prev,
            options: [],
            loading: false,
          }));
        }
      };

      fetchApartments().catch(() => {
        setApartments((prev) => ({
          ...prev,
          options: [],
          loading: false,
        }));
      });
    } else {
      setApartments({ loading: false, options: [] });
      setBlocks({ loading: false, options: [] });
      setFlats({ loading: false, options: [] });
      setApartmentId(null);
      setBlockId(null);
      setValue('apartmentId', null);
      setValue('blockId', null);
      setValue('flatId', null);
    }
  };

  useEffect(() => {
    console.log('apartment', apartmentChanges, apartmentId);
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
            setBlocks((prev) => ({
              ...prev,
              options: [],
              loading: false,
            }));
            setFlats((prev) => ({ ...prev, options: [], loading: false }));
            errorMessage('Seçili siteye ait bir blok bulunamadı.');
          }
        } catch (error) {
          setBlocks((prev) => ({
            ...prev,
            options: [],
            loading: false,
          }));
          setFlats((prev) => ({ ...prev, options: [], loading: false }));
        }
        setApartmentId((apartmentChanges as any).value);
      };

      fetchBlocks().catch(() => {
        setBlocks((prev) => ({
          ...prev,
          options: [],
          loading: false,
        }));
        setFlats((prev) => ({ ...prev, options: [], loading: false }));
      });
    }
  }, [apartmentChanges, setValue, apartmentId]);

  useEffect(() => {
    console.log('block', blockChanges, blockId);
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
            setFlats((prev) => ({
              ...prev,
              options: [],
              loading: false,
            }));
            errorMessage('Seçili blok bilgisine ait bir daire bulunamadı.');
          }
        } catch (error) {
          setFlats((prev) => ({
            ...prev,
            options: [],
            loading: false,
          }));
        }
        setBlockId((blockChanges as any).value);
      };
      fetchFlats().catch(() => {
        setFlats((prev) => ({
          ...prev,
          options: [],
          loading: false,
        }));
      });
    }
  }, [blockChanges, blockId, setValue, blocks]);

  useEffect(() => {
    reset({ ...defaultValues })

    return () => {
      setChecked(false);
    }
  }, [reset, selectedCar, defaultValues]);
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
          Araç bilgisini güncelle
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Daireye eklenen aracı güncelle.
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
              <View>
                <Text>
                  <strong>Seçili Daire:</strong>{' '}
                  {(flatChanges as any)?.label ||
                    (selectedCar as any)?.flat?.number}
                </Text>
                <View mt="16px">
                  <Checkbox
                    label="Daire bilgisini güncellemek ister misiniz ?"
                    checked={checked}
                    handleChange={handleOnChange}
                  />
                </View>
              </View>
            </View>
            {checked ? (
              <>
                {apartments.options && apartments.options.length ? (
                  <View gridColumn="1/5" display="flex" flexDirection="column">
                    <Select
                      name="apartmentId"
                      control={control}
                      options={apartments.options}
                      isLoading={apartments.loading}
                      isDisabled={isApartmentAdmin}
                      rules={{
                        required: {
                          value: true,
                          message:
                            'Lütfen hangi siteye eklemek istediğinizi giriniz',
                        },
                      }}
                      placeholder="Kullanıcının sitesini seçiniz"
                    />
                    {errors.apartmentId && (
                      <ErrorMessage>
                        {' '}
                        {errors.apartmentId?.message}
                      </ErrorMessage>
                    )}
                  </View>
                ) : null}
                {blocks.options && blocks.options.length ? (
                  <View gridColumn="1/5" display="flex" flexDirection="column">
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
                  <View gridColumn="1/5" display="flex" flexDirection="column">
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
              </>
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

export default UpdateCar;
