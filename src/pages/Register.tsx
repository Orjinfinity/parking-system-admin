import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  Title,
  View,
  Text,
  TextField,
  ErrorMessage,
  Button,
  LinkButton,
  PhoneInput,
  Image,
} from '../components';
import { register } from '../services';
import { Regex } from '../utils';
import imagePath from '../utils/assetHelper';

const StyledView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 28px 36px 28px;
  border-radius: 6px;
  max-width: 448px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

interface IRegisterForm extends FieldValues {
  username: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      username: '',
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (form: IRegisterForm) => {
    register(form).then((res) => console.log('res', res));
  };

  return (
    <StyledView boxShadow="primary">
      <View width="100%">
        <View display="flex" justifyContent="center" mb="32px">
          <Image height="42px" src={imagePath('logo.png')} alt="logo" />
        </View>
        <Title
          mb="32px"
          color="textColor"
          fontWeight="large"
          lineHeight="32px"
          fontSize={['1.6em', '1.6em', '2em']}
          textAlign="center"
        >
          Plaka Tanıma Sistemi
        </Title>
        <Title
          mb="6px"
          color="textColor"
          fontSize={['1.1em', '1.1em', '1.6em']}
        >
          Giriş yapabilmek için kayıt olabilirsiniz 🚀
        </Title>
        <Text
          mb="24px"
          size="md"
          fontWeight="regular"
          lineHeight="20px"
          color="textSecondaryColor"
        >
          Lütfen bütün alanları eksikiz doldurunuz.
        </Text>
        <View>
          <form onSubmit={handleSubmit(onSubmit)}>
            <View display="flex" flexDirection="column" mb="18px">
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
            <View display="flex" flexDirection="column" mb="18px">
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
            <View display="flex" flexDirection="column" mb="18px">
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
            <View display="flex" flexDirection="column" mb="18px">
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
            <View display="flex" flexDirection="column" mb="18px">
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
            <View display="flex" flexDirection="column" mb="18px">
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
            <View display="flex" flexDirection="column">
              <Button
                fontSize="medium"
                padding="12px"
                letterSpacing=".46px"
                type="submit"
                variant="contained"
                color="primary"
                size="md"
              >
                KAYIT OL
              </Button>
            </View>
          </form>
          <Text
            mt="28px"
            textAlign="center"
            fontSize="medium"
            color="textSecondaryColor"
          >
            Hesabınız var mı ?
            <LinkButton ml="2px" to="/login" fontSize="medium" color="primary">
              Giriş Yap
            </LinkButton>
          </Text>
        </View>
      </View>
    </StyledView>
  );
};

export default Register;
