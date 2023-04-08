import { Dispatch, useContext, useEffect, useState } from 'react';
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
} from '../../interfaces';
import { IUserRow } from '../../consts';
import { getUserApartmentInfo, Regex } from '../../utils';
import { IFormRequiredFields } from './CreateUser';
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
  options: {
    blocks: Array<ISelectOption>;
    flats: Array<ISelectOption>;
  };
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
  const [formRequiredValues, setFormRequiredValues] =
    useState<IFormRequiredFields>({
      apartments: [] as Array<ISelectOption>,
      roles: [] as Array<ISelectOption>,
    });
  const [apartmentOptions, setApartmentOptions] = useState<ISelectField>({
    loading: false,
    options: {
      blocks: [],
      flats: [],
    },
  });

  // const userApartmentInfo = useMemo(
  //   () =>
  //     selectedUser.flats && selectedUser.flats.length
  //       ? getUserApartmentInfo(selectedUser.flats[0])
  //       : null,
  //   [selectedUser]
  // );

  // const [apartmentId, setApartmentId] = useState<number>(
  //   userApartmentInfo?.apartment?.id || null
  // );
  // const [blockId, setBlockId] = useState<number>(
  //   userApartmentInfo?.block?.id || null
  // );

  const isApartmentAdmin = getUserIsApartmentAdmin();

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
    },
  });

  const [apartmentChanges, blockChanges] = watch(['apartmentId', 'blockId']);

  const { dispatch } = useContext(UserContext);

  const onSubmit = async (form: IUserFormFields) => {
    if (
      !form.flatId ||
      !(apartmentOptions.options.flats && apartmentOptions.options.flats.length)
    ) {
      errorMessage('Lütfen kullanıcının daire bilgisini seçiniz.');
      return;
    }
    try {
      setLoading((loading) => ({ ...loading, updateUser: true }));
      const { apartmentId, blockId, ...res } = form;
      const response = await updateUser(selectedUser.id, {
        id: selectedUser.id,
        ...res,
        roles: [(form.roles as any).value],
        flatId: (form?.flatId as any).value,
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
              id: (form?.flatId as any).value,
              name: (form?.flatId as any).label,
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

  useEffect(() => {
    console.log('apartment', apartmentChanges);
    if (
      (apartmentChanges as any)?.value 
      // &&
      // (apartmentChanges as any).value !== apartmentId
    ) {
      setApartmentOptions((prev) => ({ ...prev, loading: true }));
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
            setApartmentOptions((prev) => ({
              ...prev,
              options: {
                blocks: blockFormField,
                flats: prev.options.flats,
              },
              loading: false,
            }));
            // if ((apartmentChanges as any).value !== apartmentId) {
            //   setValue('blockId', null);
            // }
          } else {
            setApartmentOptions((prev) => ({
              ...prev,
              options: { blocks: [], flats: [] },
              loading: false,
            }));
            errorMessage('Seçili siteye ait bir blok bulunamadı.');
          }
        } catch (error) {
          setApartmentOptions((prev) => ({
            ...prev,
            options: { blocks: [], flats: [] },
            loading: false,
          }));
        }
        // setApartmentId((apartmentChanges as any).value);
      };

      fetchBlocks().catch(() => {
        setApartmentOptions((prev) => ({
          ...prev,
          options: { blocks: [], flats: [] },
          loading: false,
        }));
      });
    }
  }, [apartmentChanges, setValue]);

  useEffect(() => {
    console.log('block', blockChanges);
    if (
      ((blockChanges as any)?.value)
      // &&
      //   (blockChanges as any).value !== blockId) 
      //   ||
      // ((blockChanges as any)?.value &&
      //   !(
      //     apartmentOptions.options.blocks &&
      //     apartmentOptions.options.blocks.length
      //   ))
    ) {
      setApartmentOptions((prev) => ({ ...prev, loading: true }));
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
            setApartmentOptions((prev) => ({
              ...prev,
              options: {
                blocks: prev.options.blocks,
                flats: flatFormField,
              },
              loading: false,
            }));
            // if ((blockChanges as any).value !== blockId) {
            //   setValue('flatId', null);
            // }
          } else {
            setApartmentOptions((prev) => ({
              ...prev,
              options: { blocks: prev.options.blocks, flats: [] },
              loading: false,
            }));
            errorMessage('Seçili blok bilgisine ait bir daire bulunamadı.');
          }
        } catch (error) {
          setApartmentOptions((prev) => ({
            ...prev,
            options: { blocks: [], flats: [] },
            loading: false,
          }));
        }
        // setBlockId((blockChanges as any).value);
      };
      fetchFlats().catch(() => {
        setApartmentOptions((prev) => ({
          ...prev,
          options: { blocks: prev.options.blocks, flats: [] },
          loading: false,
        }));
      });
    }
  }, [blockChanges]);

  useEffect(() => {
    const apartmentFields =
      selectedUser.flats && selectedUser.flats.length
        ? getUserApartmentInfo(selectedUser.flats[0])
        : null;
    console.log('selected', selectedUser, apartmentFields);
    const fetchData = async () => {
      try {
        setLoading((loading) => ({ ...loading, formFields: true }));
        const [resApartments, resRoles, resBlocks, resFlats] =
          await Promise.all([
            getApartments(0),
            getRoles(0),
            getAllBlocksByApartmentId(apartmentFields.apartment.id),
            getFlatsByBlockId(apartmentFields.block.id),
          ]);
        const [apartments, roles, blocks, flats] = await [
          resApartments.data.resultData,
          resRoles.data.resultData,
          resBlocks.data.resultData,
          resFlats.data.resultData,
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
        })) : [{ label: "user", value: "user" }];;
        const blockFormField = blocks.map(({ id, name }: IBlock) => ({
          label: name,
          value: id,
        }));
        const flatFormField = flats.map(({ id, number }: IFlat) => ({
          label: number,
          value: id,
        }));
        setFormRequiredValues({
          apartments: updatedApartments,
          roles: updatedRoles,
        });
        setApartmentOptions((prev) => ({
          ...prev,
          options: { blocks: blockFormField, flats: flatFormField },
        }));
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
          ...(apartmentFields
            ? {
                apartmentId: {
                  label: apartmentFields.apartment.name,
                  value: apartmentFields.apartment.id,
                } as any,
                blockId: {
                  label: apartmentFields.block.name,
                  value: apartmentFields.block.id,
                } as any,
                flatId: {
                  label: apartmentFields.flat.name,
                  value: apartmentFields.flat.id,
                } as any,
              }
            : {
                apartmentId: null,
                blockId: null,
                flatId: null,
              }),
        });
        setLoading((loading) => ({ ...loading, formFields: false }));
      } catch (error) {
        setLoading((loading) => ({ ...loading, formFields: false }));
      }
    };
    fetchData().catch((_) =>
      setLoading((loading) => ({ ...loading, formFields: false }))
    );
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
              <Select
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
              {errors.apartmentId && (
                <ErrorMessage> {errors.apartmentId?.message}</ErrorMessage>
              )}
            </View>
            {apartmentOptions.options.blocks &&
            apartmentOptions.options.blocks.length ? (
              <View className="column-3" display="flex" flexDirection="column">
                <Select
                  name="blockId"
                  control={control}
                  options={apartmentOptions.options.blocks}
                  isLoading={apartmentOptions.loading}
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
            {apartmentOptions.options.flats &&
            apartmentOptions.options.flats.length ? (
              <View className="column-3" display="flex" flexDirection="column">
                <Select
                  name="flatId"
                  control={control}
                  options={apartmentOptions.options.flats}
                  isLoading={apartmentOptions.loading}
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
