import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { resetPassword, successMessage } from '../services';
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

interface IResetPassword extends FieldValues {
  email: string;
  password: string;
}

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IResetPassword>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (form: IResetPassword) => {
    try {
      console.log('form', form);
      const token = searchParams.get('token') || '';
      const response = await resetPassword({ ...form, token });
      if(response.status === 200) {
        successMessage(response.data?.message || 'Şifre sıfırlama linki mailinize yollanmıştır.');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <StyledView boxShadow="primary" height={['100vh', '100vh', 'auto']}>
      <View width="100%">
        <View display="flex" justifyContent="center" mb="32px">
          <Image height="100px" src={imagePath('logo.png')} alt="logo" />
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
          Şifremi Sıfırla 🔒
        </Title>
        <Text
          mb="24px"
          size="md"
          fontWeight="regular"
          lineHeight="20px"
          color="textSecondaryColor"
        >
          Yeni şifreniz bir önceki şifrenizden farklı olmalıdır.
        </Text>
        <View>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              ŞİFRE SIFIRLA
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

export default ResetPassword;
