import { ChangeEvent, Dispatch, useContext, useEffect, useState } from 'react';
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
  PhoneInput,
  Select,
  Checkbox,
} from '..';
import { UserActionTypes, UserContext } from '../../contexts';
import {
  errorMessage,
  getApartments,
  getAllBlocksByApartmentId,
  getFlatsByBlockId,
  getRoles,
  successMessage,
  updateUser,
} from '../../services';
import {
  IApartment,
  IBlock,
  IFlat,
  ISelectOption,
  IUserFormFields,
  LocalStorageKeys,
} from '../../interfaces';
import { IUserRow } from '../../consts';
import { Regex } from '../../utils';
import { getUserIsApartmentAdmin } from '../../utils/userHelper';

const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;

  .column-1 {
    grid-column: 1/3;
  }
  .column-2 {
    grid-column: 3/5;
  }
  .column-3 {
    grid-column: 1/5;
  }
`;

interface ISelectField {
  loading: boolean;
  options: Array<ISelectOption>;
}
interface IUpdateUser {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedUser: IUserRow;
}

const UpdateUser = ({
  modalIsOpen,
  setModalIsOpen,
  selectedUser,
}: IUpdateUser) => {
  const [loading, setLoading] = useState<{
    formFields: boolean;
    updateUser: boolean;
  }>({
    formFields: true,
    updateUser: false,
  });

  const [roles, setRoles] = useState<ISelectField>({
    loading: false,
    options: [],
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

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IUserFormFields>({
    defaultValues: {
      username: selectedUser.username || '',
      name: selectedUser.name || '',
      surname: selectedUser.surname || '',
      phone: selectedUser.phone || '',
      email: selectedUser.email || '',
      password: selectedUser?.password || '',
      apartmentId: null,
      blockId: null,
      flatId: null,
    },
  });

  const [apartmentChanges, blockChanges, flatChanges] = watch(['apartmentId', 'blockId', 'flatId']);

  const { dispatch } = useContext(UserContext);

  const onSubmit = async (form: IUserFormFields) => {
    try {
      setLoading((loading) => ({ ...loading, updateUser: true }));
      const { apartmentId, blockId, password, ...res } = form;
      const response = await updateUser(selectedUser.id, {
        id: selectedUser.id,
        ...res,
        ...(Boolean(selectedUser.password !== password) && { password }),
        roles: [(form.roles as any).value],
        flatId: (form?.flatId as any)?.value ?? selectedUser?.flatId?.id,
      });
      if (response.status === 200) {
        successMessage(
          response.data?.message || 'Kullanıcı başarıyla güncellendi.'
        );
        dispatch({
          type: UserActionTypes.UPDATE_USER,
          user: {
            id: selectedUser.id,
            created_at: selectedUser.created_at,
            ...form,
            flatId: {
              id: (form?.flatId as any)?.value || selectedUser?.flatId?.id,
              name: (form?.flatId as any).label || selectedUser?.flatId?.name,
            },
            roles: [(form.roles as any).value],
          },
        });
      }
      setLoading((loading) => ({ ...loading, updateUser: false }));
    } catch (error) {
      setLoading((loading) => ({ ...loading, updateUser: false }));
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
    const fetchData = async () => {
      try {
        setLoading((loading) => ({ ...loading, formFields: true }));
        const resRoles = await getRoles(0);
        const roles = resRoles.data.resultData;
        const updatedRoles = !isApartmentAdmin
          ? roles.map(({ name }) => ({
              label: name,
              value: name,
            }))
          : [{ label: 'user', value: 'user' }];
        setRoles({ loading: false, options: updatedRoles });
        const {
          name,
          surname,
          username,
          phone,
          email,
          password,
          roles: userRoles,
        } = selectedUser;

        reset({
          name,
          surname,
          username,
          phone,
          email,
          password,
          roles: { label: userRoles, value: userRoles } as any,
          apartmentId: null,
          blockId: null,
          flatId: null,
        });
        setLoading((loading) => ({ ...loading, formFields: false }));
      } catch (error) {
        setLoading((loading) => ({ ...loading, formFields: false }));
      }
    };
    fetchData().catch((_) =>
      setLoading((loading) => ({ ...loading, formFields: false }))
    );
    return () => {
      setChecked(false);
    };
  }, [reset, selectedUser, isApartmentAdmin]);

  return (
    <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
      <View
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        padding={['10px', '10px', '14px', '20px', '30px']}
        position="relative"
      >
        <Title fontWeight="medium" fontSize="24px" color="textColor">
          Kullanıcı Bilgilerini Güncelle
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Siteye eklenen kullanıcının bilgilerini güncelle.
        </Text>
        <View width="100%" marginTop="36px" marginBottom="36px">
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <View className="column-1" display="flex" flexDirection="column">
              <TextField
                name="name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen isminizi giriniz',
                  },
                }}
                placeholder="Adınız"
              />
              {errors.name && (
                <ErrorMessage> {errors.name?.message}</ErrorMessage>
              )}
            </View>
            <View className="column-2" display="flex" flexDirection="column">
              <TextField
                name="surname"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen soyadınızı giriniz',
                  },
                }}
                placeholder="Soyadınız"
              />
              {errors.surname && (
                <ErrorMessage> {errors.surname?.message}</ErrorMessage>
              )}
            </View>
            <View className="column-3" display="flex" flexDirection="column">
              <TextField
                name="username"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen kullanıcı adınızı giriniz',
                  },
                }}
                placeholder="Kullanıcı adı"
              />
              {errors.username && (
                <ErrorMessage> {errors.username?.message}</ErrorMessage>
              )}
            </View>
            <View className="column-3" display="flex" flexDirection="column">
              <PhoneInput
                name="phone"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen telefon numaranızı giriniz',
                  },
                  pattern: {
                    value: Regex.PHONE_NUMBER,
                    message: 'Lütfen doğru formatta telefon numaranızı giriniz',
                  },
                }}
                placeholder="Telefon numarnız"
              />
              {errors.phone && (
                <ErrorMessage> {errors.phone?.message}</ErrorMessage>
              )}
            </View>
            <View className="column-3" display="flex" flexDirection="column">
              <View>
                <Text>
                  <strong>Seçili Daire:</strong> {(flatChanges as any)?.label || selectedUser.flatId?.name}
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
                  <View
                    className="column-3"
                    display="flex"
                    flexDirection="column"
                  >
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
                  <View
                    className="column-3"
                    display="flex"
                    flexDirection="column"
                  >
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
                  <View
                    className="column-3"
                    display="flex"
                    flexDirection="column"
                  >
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
            <View className="column-3" display="flex" flexDirection="column">
              <Select
                name="roles"
                control={control}
                options={roles.options}
                isLoading={roles.loading}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen hangi kullanıcının rolünü seçiniz',
                  },
                }}
                placeholder={
                  loading.formFields
                    ? 'Loading...'
                    : 'Kullanıcının rolünü seçiniz'
                }
              />
              {errors.roles && (
                <ErrorMessage> {errors.roles?.message}</ErrorMessage>
              )}
            </View>
            <View className="column-3" display="flex" flexDirection="column">
              <TextField
                name="email"
                type="email"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen email adresinizi giriniz',
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Girilen değer email formatına uygun değil"
                  }
                }}
                placeholder="Email"
              />
              {errors.email && (
                <ErrorMessage> {errors.email?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="password"
                type="password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen şifrenizi giriniz',
                  },
                }}
                placeholder="Şifre"
              />
              {errors.password && (
                <ErrorMessage> {errors.password?.message}</ErrorMessage>
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
                padding="10px 20px"
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
                padding="10px 20px"
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
        {loading.updateUser && <Loader position="fixed" />}
      </View>
      {loading.formFields && <Loader />}
    </Modal>
  );
};

export default UpdateUser;
