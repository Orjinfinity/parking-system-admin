import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  Title,
  View,
  Image,
  TextField,
  ErrorMessage,
  PhoneInput,
  Select,
  Button,
  Loader
} from '../components';
import { END_POINTS, RoleList } from '../consts';
import { useFetch } from '../hooks/useFetch';
import {
  IApartment,
  ISelectOption,
  IUserFormFields,
  LocalStorageKeys,
} from '../interfaces';
import { getApartments, getRoles, successMessage, updateUser } from '../services';
import { Regex } from '../utils';
import imagePath from '../utils/assetHelper';
import { getUserApartmentInfo, getUserIsApartmentAdmin } from '../utils/userHelper';

export interface IFormRequiredFields {
  apartments: Array<ISelectOption>;
  roles: Array<ISelectOption>;
}

const StyledView = styled(View)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.primary};
`;

const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  margin-top: 16px;
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

const Profile = () => {
  const dataFetchRef = useRef<boolean>(true);
  const [loading, setLoading] = useState<{
    formFields: boolean;
    updateUser: boolean;
  }>({
    formFields: true,
    updateUser: false,
  });

  const userInfo = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
  const isApartmentAdmin = getUserIsApartmentAdmin();

  const [formRequiredValues, setFormRequiredValues] =
    useState<IFormRequiredFields>({
      apartments: [] as Array<ISelectOption>,
      roles: [] as Array<ISelectOption>,
    });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset
  } = useForm<IUserFormFields>();

  const { data, loading: formFieldLoading } = useFetch(
    `${END_POINTS.USERS.users}/${userInfo.id}`,
    { single: true },
    dataFetchRef,
    {}
  );

  useEffect(() => {
    const userRole = RoleList.find(role => userInfo?.roles && userInfo.roles[0] === role.key) || { key: 'ROLE_APARTMENTADMIN', value: 'apartmentadmin'};
    if (userRole) setValue('roles', { label: userRole.value, value: userRole.value } as any );
  }, [isApartmentAdmin, userInfo, setValue])

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
          flats
          // roles: userRoles,
        } = data;
        // console.log('role', userRole)
        const apartmentData = flats && flats[0] ? getUserApartmentInfo(flats[0]) : null;
        reset({
          name,
          surname,
          username,
          phone,
          email,
          password,
          apartmentId: apartmentData ? { label: apartmentData.apartment.name, value: apartmentData.apartment.id } as any : "",
          blockId: apartmentData ? apartmentData.block.name as any : "",
          flatId: apartmentData ? apartmentData.flat.name as any : "",
        });
        setLoading((loading) => ({ ...loading, formFields: false }));
      } catch (error) {
        setLoading((loading) => ({ ...loading, formFields: false }));
      }
    };
    fetchData().catch((_) =>
      setLoading((loading) => ({ ...loading, formFields: false }))
    );
  }, [data, reset]);

  const onSubmit = async (form: IUserFormFields) => {
    try {
      setLoading((loading) => ({...loading, updateUser: true}));
      console.log('form', form);
      const { apartmentId, blockId, ...formValues } = form;
      const response = await updateUser(userInfo.id, {
        id: userInfo.id,
        ...formValues,
        roles: [(form.roles as any).value],
      });
      if (response.status === 200) {
        successMessage(
          response.data?.message || 'Kullanıcı başarıyla güncellendi.'
        );
      }
      setLoading((loading) => ({...loading, updateUser: true}));
    } catch (error) {
      setLoading((loading) => ({...loading, updateUser: true}));
    }
  };

  return (
    <StyledView>
      <Title fontWeight="large" fontSize="24px" color="textColor" mb="16px">
        Profil Bilgilerini Görüntüle
      </Title>
      <Image src={imagePath('profile.png')} alt="avatar_1" />
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
          {errors.name && <ErrorMessage> {errors.name?.message}</ErrorMessage>}
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
        <View className="column-1" display="flex" flexDirection="column">
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
        <View className="column-2" display="flex" flexDirection="column">
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
        <View className="column-1" display="flex" flexDirection="column">
          <Select
            name="apartmentId"
            control={control}
            options={formRequiredValues.apartments}
            isLoading={loading.formFields}
            isDisabled={true}
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
        <View className="column-2" display="flex" flexDirection="column">
          <TextField
            name="blockId"
            control={control}
            isDisabled={true}
            placeholder="Kullanıcı Blok Id"
          />
        </View>
        <View className="column-1" display="flex" flexDirection="column">
          <TextField
            name="flatId"
            control={control}
            isDisabled={true}
            placeholder="Kullanıcı Daire Id"
          />
        </View>
        <View className="column-2" display="flex" flexDirection="column">
          <Select
            name="roles"
            control={control}
            options={formRequiredValues.roles}
            isLoading={loading.formFields}
            isDisabled={isApartmentAdmin}
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
        <View display="flex" flexDirection="column" className="column-1">
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
        <View display="flex" flexDirection="column" className="column-2">
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
            disabled={formFieldLoading}
          >
            Profil Bilgilerini Güncelle
          </Button>
          {/* <Button
                fontSize="medium"
                width="112px"
                letterSpacing=".46px"
                variant="dashed"
                color="gray"
                size="md"
                ml="16px"
              >
                İptal
              </Button> */}
        </View>
      </StyledForm>
      {loading.formFields && <Loader />}
    </StyledView>
  );
};

export default Profile;
