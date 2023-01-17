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
  getApartments,
  getRoles,
  successMessage,
  updateUser,
} from '../../services';
import { IApartment, ISelectOption, IUserFormFields } from '../../interfaces';
import { IFormRequiredFields } from './CreateUser';
import { IUserRow } from '../../consts';
import { Regex } from '../../utils';

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
  const {
    handleSubmit,
    control,
    reset,
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

  const { dispatch } = useContext(UserContext);

  const onSubmit = async (form: IUserFormFields) => {
    try {
      setLoading((loading) => ({ ...loading, updateUser: true }));
      const response = await updateUser(selectedUser.id, {
        id: selectedUser.id,
        ...form,
        roles: [(form.roles as any).value]
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
        const updatedApartments = apartments.map(({ name }: IApartment) => ({
          label: name,
          value: name,
        }));
        const updatedRoles = roles.map(({ name }) => ({
          label: name,
          value: name,
        }));
        setFormRequiredValues({
          apartments: updatedApartments,
          roles: updatedRoles,
        });
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
          roles: { label: userRoles, value: userRoles} as any,
        });
        setLoading((loading) => ({ ...loading, formFields: false }));
      } catch (error) {
        setLoading((loading) => ({ ...loading, formFields: false }));
      }
    };
    fetchData().catch((_) =>
      setLoading((loading) => ({ ...loading, formFields: false }))
    );
  }, [reset, selectedUser]);

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
                placeholder={loading.formFields ? "Loading..." : "Kullanıcının rolünü seçiniz"}
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
    </Modal>
  );
};

export default UpdateUser;
