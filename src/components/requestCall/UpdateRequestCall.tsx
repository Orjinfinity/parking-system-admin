import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  Select,
} from '..';
import { IRequestCallRow } from '../../consts';
import { RequestCallActionTypes, RequestCallContext } from '../../contexts';
import { IFlat, IRequestCall, ISelectOption, IUser } from '../../interfaces';
import {
  getFlats,
  getUsers,
  successMessage,
  updateRequestCall,
} from '../../services';
import { IFormRequiredFields, StyledForm } from './CreateRequestCall';

interface IUpdateRequestCall {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedRequestCall: IRequestCallRow;
}

const UpdateRequestCall = ({
  modalIsOpen,
  setModalIsOpen,
  selectedRequestCall,
}: IUpdateRequestCall) => {
  const dataFetchRef = useRef<boolean>(true);
  const [loading, setLoading] = useState<{
    formFields: boolean;
    updateRequestCall: boolean;
  }>({
    formFields: true,
    updateRequestCall: false,
  });
  const [formRequiredValues, setFormRequiredValues] =
    useState<IFormRequiredFields>({
      users: [] as Array<ISelectOption>,
      flats: [] as Array<ISelectOption>,
    });
  const defaultValues = {
    isdone: false,
    flatId: null,
    userId: null,
    description: '',
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IRequestCall>({ defaultValues });
  const { dispatch } = useContext(RequestCallContext);

  const onSubmit = async (form: IRequestCall) => {
    try {
      setLoading((loading) => ({ ...loading, updateRequestCall: true }));
      console.log('form', form);
      const response = await updateRequestCall(selectedRequestCall.id, {
        ...form,
        userId: (form.userId as any).value,
        flatId: (form.flatId as any).value,
        isdone: (form.isdone as any).value,
      });
      if (response.status === 200) {
        successMessage(
          response.data?.message || 'Acil durum başarıyla güncellendi.'
        );
        dispatch({
          type: RequestCallActionTypes.UPDATE_REQUESTCALL,
          requestCall: {
            ...form,
            id: selectedRequestCall.id,
            created_at: selectedRequestCall.created_at,
            userId: (form.userId as any).value,
            flatId: (form.flatId as any).value,
            isdone: (form.isdone as any).value.toString(),
          },
        });
      }
      setLoading((loading) => ({ ...loading, updateRequestCall: false }));
    } catch (error) {
      setLoading((loading) => ({ ...loading, updateRequestCall: false }));
    }
  };

  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
      console.log(selectedRequestCall)
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
          const selectedFlat = updatedFlats.find(
            (flat) => flat.value === selectedRequestCall.flatId
          );
          const selectedUser = updatedUsers.find(
            (user) => user.value === selectedRequestCall.userId
          );
          console.log('users flats', updatedUsers, updatedFlats);
          reset({
            description: selectedRequestCall?.description || '',
            flatId: {
              label: selectedFlat.label,
              value: selectedRequestCall.flatId,
            } as any,
            userId: {
              label: selectedUser.label,
              value: selectedRequestCall.userId,
            } as any,
            isdone: {
              label: selectedRequestCall.isdone === 'true' ? 'Evet' : 'Hayır',
              value: selectedRequestCall.isdone === 'true'
            } as any,
          });
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
        setLoading((loading) => ({ ...loading, formFields: false }))
      );
    }
  }, [reset, selectedRequestCall]);
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
          Acil Durum Bilgisi Güncelle
        </Title>
        <Text mt="12px" fontSize="small" color="textSecondaryColor">
          Eklenen acil durum bilgisini güncelle.
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
                    message:
                      'Lütfen hangi daireyi eklemek istediğinizi giriniz',
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
                Çağrı Güncelle
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
      {loading.updateRequestCall && <Loader />}
    </Modal>
  );
};

export default UpdateRequestCall;
