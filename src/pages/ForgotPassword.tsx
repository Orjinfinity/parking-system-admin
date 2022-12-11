import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Title,
  View,
  Text,
  TextField,
  ErrorMessage,
  Button,
  LeftArrowIcon,
  Image,
} from '../components';
// import { resetPassword } from '../services';
import imagePath from '../utils/assetHelper';

const StyledView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 28px 36px 28px;
  border-radius: 6px;
  max-width: 448px;
  background-color: ${({ theme }) => theme.colors.white};
`;

interface IForgotPassword extends FieldValues {
  username: string;
  email: string;
}

const ForgotPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForgotPassword>({
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (form: IForgotPassword) => {
    console.log('form', form);
  };

  return (
    <StyledView boxShadow="primary" height={['100vh', '100vh', 'auto']}>
      <View width="100%">
        <View display="flex" justifyContent="center" mb="32px">
          <Image height="42px" src={imagePath('logo.png')} alt="logo" />
        </View>
        <Title
          mb="32px"
          color="textColor"
          fontWeight="large"
          lineHeight="32px"
          fontSize={['1em', '1.6em', '2em']}
          textAlign="center"
        >
          Plaka Tanıma Sistemi
        </Title>
        <Title mb="6px" color="textColor" fontSize={['1em', '1em', '1.6em']}>
          Şifremi Unuttum 🔒
        </Title>
        <Text
          mb="24px"
          size="md"
          fontWeight="regular"
          lineHeight="20px"
          color="textSecondaryColor"
        >
          E-posta adresinizi girin, size şifrenizi sıfırlamak için mail
          gönderelim.
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
            <Button
              block
              fontSize="medium"
              letterSpacing=".46px"
              padding="12px"
              type="submit"
              variant="contained"
              color="primary"
              size="md"
            >
              ŞİFRE YOLLA
            </Button>
          </form>
          <Button
            type="button"
            variant="icon"
            fontSize="medium"
            mt="20px"
            fontWeight="regular"
            color="iconPrimary"
            onClick={() => navigate('/login')}
            block
          >
            <LeftArrowIcon mr="10px" size="24px" />
            Giriş ekranına dön
          </Button>
        </View>
      </View>
    </StyledView>
  );
};

export default ForgotPassword;
