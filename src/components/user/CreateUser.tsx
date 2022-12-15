import { Dispatch, useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { getApartments, register, successMessage } from '../../services';
import { IApartment, IUserFormFields } from '../../interfaces';
import { UserActionTypes, UserContext } from '../../contexts';
import Select, { ISelectOption } from '../select/Select';
import TextField from '../textfield/TextField';
import ErrorMessage from '../text/ErrorMessage';
import PhoneInput from '../phone/PhoneInput';
import Button from '../button/Button';
import Loader from '../loader/Loader';
import Title from '../title/Title';
import Modal from '../modal/Modal';
import View from '../view/View';
import Text from '../text/Text';
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

interface ICreateUser {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const CreateUser = ({ modalIsOpen, setModalIsOpen }: ICreateUser) => {
  const dataFetchRef = useRef<boolean>(true);
  const [loading, setLoading] = useState<{
    apartments: boolean;
    createUser: boolean;
  }>({
    apartments: true,
    createUser: false,
  });
  const [apartments, setApartments] = useState<Array<ISelectOption>>(null);
  const defaultValues = {
    username: '',
    name: '',
    surname: '',
    phone: '',
    brand: '',
    email: '',
    password: '',
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IUserFormFields>({
    defaultValues: { ...defaultValues },
  });
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
      const fetchApartments = async () => {
        const response = await getApartments(0);
        const apartments = await response.data.resultData;
        const updatedApartments = apartments.map(({ name }: IApartment) => ({
          label: name,
          value: name,
        }));
        setApartments(updatedApartments);
        setLoading((loading) => ({ ...loading, apartments: false }));
      };
      fetchApartments().catch((_) =>
        setLoading((loading) => ({ ...loading, apartments: false }))
      );
    }
  }, []);

  const onSubmit = async (form: IUserFormFields) => {
    setLoading((loading) => ({ ...loading, createUser: true }));
    const response = await register(form);
    if (response.status === 200) {
      successMessage(response.data?.message || 'Kullanıcı başarıyla eklendi.');
      const id = state.users[state.users.length - 1].id + 1 || 1;
      const created_at = new Date().toLocaleString();
      dispatch({
        type: UserActionTypes.ADD_USER,
        user: { ...form, created_at, id },
      });
      reset(defaultValues);
    }
    setLoading((loading) => ({ ...loading, createUser: false }));
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
              <Select
                name="brand"
                control={control}
                options={apartments}
                isLoading={loading.apartments}
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
