import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  Button,
  ErrorMessage,
  LinkButton,
  Text,
  TextField,
  Title,
  View,
} from '../components';

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

interface ILoginForm extends FieldValues {
  username: string;
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (form: ILoginForm) => {
    console.log(form);
  };

  return (
    <StyledView boxShadow="primary">
      <View width="100%">
        <Title
          mb="32px"
          color="textColor"
          fontWeight="large"
          lineHeight="32px"
          fontSize={['1em', '1em', '2em']}
          textAlign="center"
        >
          Plaka Tanıma Sistemi
        </Title>
        <Title mb="6px" color="textColor" fontSize={['1em', '1em', '1.6em']}>
          Admin Paneline Hoşgeldiniz! 👋🏻
        </Title>
        <Text
          mb="24px"
          size="md"
          fontWeight="regular"
          lineHeight="20px"
          color="textSecondaryColor"
        >
          Lütfen giriş bilgilerinizi giriniz
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
              <LinkButton
                to="/forgot-password"
                fontSize="small"
                color="primary"
                ml="auto"
                mb="27px"
              >
                Parolanızı mı unuttunuz ?
              </LinkButton>
              <Button
                fontSize="medium"
                padding="12px"
                letterSpacing=".46px"
                type="submit"
                variant="contained"
                color="primary"
                size="md"
              >
                GİRİŞ YAP
              </Button>
            </View>
          </form>
          <Text
            mt="28px"
            textAlign="center"
            fontSize="medium"
            color="textSecondaryColor"
          >
            Hesabınız yok mu ?{' '}
            <LinkButton
              ml="2px"
              to="/register"
              fontSize="medium"
              color="primary"
            >
              Kayıt ol
            </LinkButton>
          </Text>
        </View>
      </View>
    </StyledView>
  );
};

export default Login;
