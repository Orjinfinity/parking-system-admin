import React, { Dispatch, useContext, useEffect, useRef, useState } from 'react'
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
} from '..';
import { RequestCallActionTypes, RequestCallContext } from '../../contexts';
import { IFlat, IRequestCall, ISelectOption, IUser } from '../../interfaces';
import { addRequestCall, getFlats, getUsers, successMessage } from '../../services';

export const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;
interface ICreateRequestCall {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}
export interface IFormRequiredFields {
  users: Array<ISelectOption>;
  flats: Array<ISelectOption>;
}

const CreateRequestCall = ({ modalIsOpen, setModalIsOpen }: ICreateRequestCall) => {
  const dataFetchRef = useRef<boolean>(true);
  const [loading, setLoading] = useState<{
    formFields: boolean;
    createRequestCall: boolean;
  }>({
    formFields: true,
    createRequestCall: false,
  });
  const [formRequiredValues, setFormRequiredValues] =
    useState<IFormRequiredFields>({
      users: [] as Array<ISelectOption>,
      flats: [] as Array<ISelectOption>,
    });
    const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
    } = useForm<IRequestCall>();
    const { state, dispatch } = useContext(RequestCallContext);

    const onSubmit = async (form: IRequestCall) => {
      try {
        setLoading((loading) => ({ ...loading, createRequestCall: true }));
        console.log('form', form);
        const response = await addRequestCall({
          ...form,
          userId: (form.userId as any).value,
          flatId: (form.flatId as any).value,
          isdone: (form.isdone as any).value,
        });
        if (response.status === 200) {
          successMessage(
            response.data?.message || 'Acil durum başarıyla eklendi.'
          );
          const id =
            state?.requestCalls[state?.requestCalls.length - 1]?.id + 1 || 1;
          const created_at = new Date().toLocaleString();
          dispatch({
            type: RequestCallActionTypes.ADD_REQUESTCALL,
            requestCall: {
              ...form,
              created_at,
              id,
              userId: (form.userId as any).value,
              flatId: (form.flatId as any).value,
              isdone: (form.isdone as any).value,
            },
          });
          reset({ isdone: null, description: '', flatId: null, userId: null });
        }
        setLoading((loading) => ({ ...loading, createRequestCall: false }));
      } catch (error) {
        setLoading((loading) => ({ ...loading, createRequestCall: false }));
      }
    };

    useEffect(() => {
      if (dataFetchRef.current) {
        dataFetchRef.current = false;
        const fetchData = async () => {
          try {
            const [resUsers, resFlats] = await Promise.all([
              getUsers(0),
              getFlats(0),
            ]);
            const [users, flats] = await [
              resUsers.data.resultData,
              resFlats.data.resultData,
            ];
            const updatedUsers = users.map(({ username, id }: IUser) => ({
              label: username,
              value: id,
            }));
            const updatedFlats = flats.map(({ number, id }: IFlat) => ({
              label: number,
              value: id,
            }));
            console.log('users flats', updatedUsers, updatedFlats);
            setFormRequiredValues({
              users: updatedUsers,
              flats: updatedFlats,
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
    }, []);
    
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
        Yeni Acil Durum Oluştur
      </Title>
      <Text mt="12px" fontSize="small" color="textSecondaryColor">
        Sisteme yeni acil durum çağrısı ekle.
      </Text>
      <View width="100%" marginTop="36px" marginBottom="36px">
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <View display="flex" flexDirection="column" gridColumn="1/5">
              <Select
                name="isdone"
                control={control}
                options={[
                  {
                    label: 'Evet',
                    value: true,
                  },
                  {
                    label: 'Hayır',
                    value: false,
                  },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: 'Lütfen işlem bilgisini seçiniz.',
                  },
                }}
                placeholder="Tamamlandı mı ?"
              />
              {errors.isdone && (
                <ErrorMessage> {errors.isdone?.message}</ErrorMessage>
              )}
            </View>
          <View display="flex" flexDirection="column" gridColumn="1/5">
            <TextField
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Lütfen açıklama giriniz',
                },
              }}
              placeholder="Durum açıklaması"
            />
            {errors.description && (
              <ErrorMessage> {errors.description?.message}</ErrorMessage>
            )}
          </View>
          <View display="flex" flexDirection="column" gridColumn="1/5">
            <Select
              name="flatId"
              control={control}
              options={formRequiredValues.flats}
              isLoading={loading.formFields}
              rules={{
                required: {
                  value: true,
                  message: 'Lütfen hangi daireyi eklemek istediğinizi giriniz',
                },
              }}
              placeholder="Kullanıcının dairesini seçiniz"
            />
            {errors.flatId && (
              <ErrorMessage> {errors.flatId?.message}</ErrorMessage>
            )}
          </View>
          <View display="flex" flexDirection="column" gridColumn="1/5">
            <Select
              name="userId"
              control={control}
              options={formRequiredValues.users}
              isLoading={loading.formFields}
              rules={{
                required: {
                  value: true,
                  message: 'Lütfen hangi kullanıcı olduğunu seçiniz',
                },
              }}
              placeholder="Kullanıcı seçiniz"
            />
            {errors.userId && (
              <ErrorMessage> {errors.userId?.message}</ErrorMessage>
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
              Çağrı Oluştur
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
    {loading.createRequestCall && <Loader />}
  </Modal>
  )
}

export default CreateRequestCall