import React, {
  ChangeEvent,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  // useRef,
  useState,
} from 'react';
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
  Checkbox,
} from '..';
import { IRequestCallRow } from '../../consts';
import { RequestCallActionTypes, RequestCallContext } from '../../contexts';
import {
  IApartment,
  IBlock,
  IFlat,
  IRequestCall,
  ISelectOption,
  IUser,
  LocalStorageKeys,
} from '../../interfaces';
import {
  errorMessage,
  getAllBlocksByApartmentId,
  getApartments,
  getFlatsByBlockId,
  getUsers,
  getUsersByApartmentId,
  successMessage,
  updateRequestCall,
} from '../../services';
import { getUserIsApartmentAdmin } from '../../utils/userHelper';
import { StyledForm } from './CreateRequestCall';

interface IUpdateRequestCall {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedRequestCall: IRequestCallRow;
}

interface IUpdateFormValues {
  users: Array<ISelectOption>;
  loading: boolean;
}

interface ISelectField {
  loading: boolean;
  options: Array<ISelectOption>;
}

const UpdateRequestCall = ({
  modalIsOpen,
  setModalIsOpen,
  selectedRequestCall,
}: IUpdateRequestCall) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formRequiredValues, setFormRequiredValues] =
    useState<IUpdateFormValues>({
      users: [],
      loading: true,
    });

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

  const defaultValues = useMemo(() => {
    return {
      isdone: (selectedRequestCall.isdone as any) || false,
      userId: selectedRequestCall.userId || null,
      description: selectedRequestCall.description || '',
      apartmentId: null,
      blockId: null,
      flatId: null,
    };
  }, [selectedRequestCall]);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IRequestCall>({ defaultValues });
  const { dispatch } = useContext(RequestCallContext);

  const [apartmentChanges, blockChanges, flatChanges] = watch([
    'apartmentId',
    'blockId',
    'flatId',
  ]);

  const onSubmit = async (form: IRequestCall) => {
    try {
      setLoading(true);
      console.log('form', form);
      const { apartmentId, blockId, ...formValues } = form;
      const response = await updateRequestCall(selectedRequestCall.id, {
        ...formValues,
        userId: (form.userId as any).value,
        flatId: (form.flatId as any).value,
        isdone: (form.isdone as any).value,
      });
      if (response.status === 200) {
        successMessage(
          response.data?.message || 'Acil durum başarıyla güncellendi.'
        );
        dispatch({
          type: RequestCallActionTypes.UPDATE_REQUESTCALL,
          requestCall: {
            ...formValues,
            id: selectedRequestCall.id,
            created_at: selectedRequestCall.created_at,
            userId: (form.userId as any).value,
            flatId: (form.flatId as any).value,
            isdone: (form.isdone as any).value.toString(),
          },
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
    console.log(selectedRequestCall);
    const fetchData = async () => {
      setFormRequiredValues((prev) => ({ ...prev, loading: true }));
      const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
      try {
        const usersEndpoint = isApartmentAdmin
          ? getUsersByApartmentId
          : getUsers;
        const resUsers = await usersEndpoint(0, 10000, {
          apartmentId: user.apartment?.apartment?.id,
        });
        const users = await resUsers.data.resultData;
        const updatedUsers = users.map(({ username, id }: IUser) => ({
          label: username,
          value: id,
        }));
        const selectedUser = updatedUsers.find(
          (user) => user.value === selectedRequestCall.userId
        );
        console.log('users flats', updatedUsers);
        reset({
          description: selectedRequestCall?.description || '',
          apartmentId: null,
          blockId: null,
          flatId: null,
          userId: {
            label: selectedUser.label,
            value: selectedRequestCall.userId,
          } as any,
          isdone: {
            label: selectedRequestCall.isdone === 'true' ? 'Evet' : 'Hayır',
            value: selectedRequestCall.isdone === 'true',
          } as any,
        });
        setFormRequiredValues((prev) => ({
          ...prev,
          loading: false,
          users: updatedUsers,
        }));
      } catch (error) {
        setFormRequiredValues((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchData().catch((_) =>
      setFormRequiredValues((prev) => ({ ...prev, loading: false }))
    );
    
    return () => {
      setChecked(false);
    }
  }, [reset, selectedRequestCall, isApartmentAdmin]);
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
          Acil Durum Bilgisi Güncelle
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Eklenen acil durum bilgisini güncelle.
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
                name="description"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen açıklama giriniz',
                  },
                }}
                placeholder="Durum açıklaması"
              />
              {errors.description && (
                <ErrorMessage> {errors.description?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <View>
                <Text>
                  <strong>Seçili Daire:</strong>{' '}
                  {(flatChanges as any)?.label ||
                    (selectedRequestCall as any)?.flat?.number}
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
                {flats.options && flats.options.length ? (
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
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="userId"
                control={control}
                options={formRequiredValues.users}
                isLoading={formRequiredValues.loading}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen hangi kullanıcı olduğunu seçiniz',
                  },
                }}
                placeholder="Kullanıcı seçiniz"
              />
              {errors.userId && (
                <ErrorMessage> {errors.userId?.message}</ErrorMessage>
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
                Çağrı Güncelle
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
      {(loading || formRequiredValues.loading) && <Loader />}
    </Modal>
  );
};

export default UpdateRequestCall;
