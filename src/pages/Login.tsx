import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  Button,
  ErrorMessage,
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
    <StyledView>
      <View>
        <Title
          mb="32px"
          color="textColor"
          fontWeight="large"
          fontSize={['1em', '1em', '2em']}
          textAlign="center"
        >
          Plaka Tanıma Sistemi
        </Title>
        <Title mb="4px" color="textColor" fontSize={['1em', '1em', '1.6em']}>
          Admin Paneline Hoşgeldiniz! 👋
        </Title>
        <Text
          mb="24px"
          size="md"
          fontWeight="medium"
          color="textSecondaryColor"
        >
          Lütfen giriş bilgilerinizi giriniz
        </Text>
        <View>
          <form onSubmit={handleSubmit(onSubmit)}>
            <View display="flex" flexDirection="column">
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
            <View display="flex" flexDirection="column">
              <TextField
                name="email"
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
            <View display="flex" flexDirection="column">
              <TextField
                name="password"
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
            <Button type="submit" variant="contained" color="primary" size="md">
              {' '}
              Giriş Yap{' '}
            </Button>
          </form>
        </View>
      </View>
    </StyledView>
  );
};

export default Login;
