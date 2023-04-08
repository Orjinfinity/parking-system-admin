import { Dispatch, useContext, useEffect, useRef, useState } from 'react';
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
  PhoneInput,
} from '..';
import {
  addUser,
  errorMessage,
  getApartments,
  getAllBlocksByApartmentId,
  getFlatsByBlockId,
  getRoles,
  successMessage,
} from '../../services';
import {
  IApartment,
  IBlock,
  IFlat,
  ISelectOption,
  IUserFormFields,
  LocalStorageKeys,
} from '../../interfaces';
import { UserActionTypes, UserContext } from '../../contexts';
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

interface ICreateUser {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormRequiredFields {
  apartments: Array<ISelectOption>;
  roles: Array<ISelectOption>;
}

const CreateUser = ({ modalIsOpen, setModalIsOpen }: ICreateUser) => {
  const dataFetchRef = useRef<boolean>(true);
  const [loading, setLoading] = useState<{
    formFields: boolean;
    createUser: boolean;
  }>({
    formFields: true,
    createUser: false,
  });
  const [formRequiredValues, setFormRequiredValues] =
    useState<IFormRequiredFields>({
      apartments: [] as Array<ISelectOption>,
      roles: [] as Array<ISelectOption>,
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

  const defaultValues = {
    username: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
    roles: '',
    password: '',
    apartmentId: null,
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
  } = useForm<IUserFormFields>({
    defaultValues: { ...defaultValues },
  });
  const { state, dispatch } = useContext(UserContext);

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

  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
      const defaultValue = { label: user.apartment?.apartment?.name, value: user.apartment?.apartment?.id}
      if(isApartmentAdmin) setValue('apartmentId', defaultValue as any)

      const fetchData = async () => {
        try {
          const [resApartments, resRoles] = await Promise.all([
            getApartments(0),
            getRoles(0),
          ]);
          const [apartments, roles] = await [
            resApartments.data.resultData,
            resRoles.data.resultData,
          ];
          const updatedApartments = apartments.map(
            ({ id, name }: IApartment) => ({
              label: name,
              value: id,
            })
          );
          const updatedRoles = !isApartmentAdmin ? roles.map(({ name }) => ({
            label: name,
            value: name,
          })) : [{ label: "user", value: "user" }];
          setFormRequiredValues({
            apartments: updatedApartments,
            roles: updatedRoles,
          });
          
          setLoading((loading) => ({ ...loading, formFields: false }));
        } catch (error) {
          setLoading((loading) => ({ ...loading, formFields: false }));
        }
      };
      fetchData().catch((_) =>
        setLoading((loading) => ({ ...loading, apartments: false }))
      );
    }
  }, [isApartmentAdmin, setValue, user]);

  const onSubmit = async (form: IUserFormFields) => {
    console.log('form', form);
    if (!form.flatId) {
      errorMessage('Lütfen kullanıcının daire bilgisini seçiniz.');
      return;
    }
    try {
      setLoading((loading) => ({ ...loading, createUser: true }));
      const { apartmentId, blockId, ...res } = form;
      const payload = {
        ...res,
        roles: [(form.roles as any).value],
        flatId: (form?.flatId as any).value,
      };
      const response = await addUser(payload);
      console.log('res', response);
      if (response.status === 200) {
        successMessage(
          response.data?.message || 'Kullanıcı başarıyla eklendi.'
        );
        const id = state?.users[state?.users.length - 1]?.id + 1 || 1;
        const created_at = new Date().toLocaleString();
        console.log('cre', {
          ...res,
          created_at,
          id,
          flatId: {
            id: (form?.flatId as any).value,
            name: (form?.flatId as any).label,
          },
        });
        dispatch({
          type: UserActionTypes.ADD_USER,
          user: {
            ...res,
            created_at,
            id,
            flatId: {
              id: (form?.flatId as any).value,
              name: (form?.flatId as any).label,
            },
            roles: [(form.roles as any).value],
          },
        });
        reset(defaultValues);
      }
      setLoading((loading) => ({ ...loading, createUser: false }));
    } catch (error) {
      setLoading((loading) => ({ ...loading, createUser: false }));
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
          Yeni Kullanıcı Oluştur
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Siteye yeni kullanıcı ekle.
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
              {/* <Select
                name="apartmentId"
                control={control}
                options={formRequiredValues.apartments}
                isLoading={loading.formFields}
                isDisabled={isApartmentAdmin}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen hangi siteye eklemek istediğinizi giriniz',
                  },
                }}
                placeholder="Kullanıcının sitesini seçiniz"
              />
              {errors.brand && (
                <ErrorMessage> {errors.brand?.message}</ErrorMessage>
              )} */}
            </View>
            {blocks.options && blocks.options.length ? (
              <View className="column-3" display="flex" flexDirection="column">
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
              <View className="column-3" display="flex" flexDirection="column">
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
            <View className="column-3" display="flex" flexDirection="column">
              <Select
                name="roles"
                control={control}
                options={formRequiredValues.roles}
                isLoading={loading.formFields}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen hangi kullanıcının rolünü seçiniz',
                  },
                }}
                placeholder="Kullanıcının rolünü seçiniz"
              />
              {errors.roles && (
                <ErrorMessage> {errors.roles?.message}</ErrorMessage>
              )}
            </View>
            <View display="flex" flexDirection="column" gridColumn="1/5">
              <TextField
                name="email"
                type="email"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen email adresinizi giriniz',
                  },
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
      {loading.createUser && <Loader />}
    </Modal>
  );
};

export default CreateUser;
