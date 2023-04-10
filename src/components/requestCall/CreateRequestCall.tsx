import React, {
  Dispatch,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import {
  IApartment,
  IBlock,
  IFlat,
  IRequestCall,
  ISelectOption,
  IUser,
  LocalStorageKeys,
} from '../../interfaces';
import {
  addRequestCall,
  errorMessage,
  getAllBlocksByApartmentId,
  getApartments,
  getFlatsByBlockId,
  getUsers,
  getUsersByApartmentId,
  successMessage,
} from '../../services';
import { getUserIsApartmentAdmin } from '../../utils/userHelper';

export const StyledForm = styled('form')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;
interface ICreateRequestCall {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

interface ISelectField {
  loading: boolean;
  options: Array<ISelectOption>;
}
export interface IFormRequiredFields {
  users: Array<ISelectOption>;
  apartments: Array<ISelectOption>;
}

const CreateRequestCall = ({
  modalIsOpen,
  setModalIsOpen,
}: ICreateRequestCall) => {
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
      apartments: [] as Array<ISelectOption>,
    });

    const [blocks, setBlocks] = useState<ISelectField>({
      loading: false,
      options: [],
    });
    const [flats, setFlats] = useState<ISelectField>({
      loading: false,
      options: [],
    });

    const [apartmentId, setApartmentId] = useState<number>();
    const [blockId, setBlockId] = useState<number>();

    const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
    const isApartmentAdmin = getUserIsApartmentAdmin();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IRequestCall>();
  const { state, dispatch } = useContext(RequestCallContext);

  const [apartmentChanges, blockChanges] = watch(['apartmentId', 'blockId']);
  console.log('field', apartmentChanges, blockChanges);

  useEffect(() => {
    if (
      (apartmentChanges as any)?.value &&
      (apartmentChanges as any).value !== apartmentId
    ) {
      setBlocks((prev) => ({ ...prev, loading: true }));
      const fetchBlocks = async () => {
        try {
          const response = await getAllBlocksByApartmentId(
            (apartmentChanges as any)?.value
          );
          if (response.data?.totalPages) {
            const blocks = response.data.resultData || [];
            const blockFormField = blocks.map(({ id, name }: IBlock) => ({
              label: name,
              value: id,
            }));
            setBlocks((prev) => ({
              ...prev,
              options: blockFormField,
              loading: false,
            }));
            setFlats((prev) => ({ ...prev, options: [], loading: false }));
            if ((apartmentChanges as any).value !== apartmentId) {
              setValue('blockId', null);
            }
          } else {
            setBlocks((prev) => ({ ...prev, options: [], loading: false }));
            setFlats((prev) => ({ ...prev, options: [], loading: false }));
            errorMessage('Seçili siteye ait bir blok bulunamadı.');
          }
        } catch (error) {
          setBlocks((prev) => ({ ...prev, loading: false }));
        }
        setApartmentId((apartmentChanges as any).value);
      };

      fetchBlocks();
    }
  }, [apartmentChanges, setValue, apartmentId]);

  useEffect(() => {
    if (
      ((blockChanges as any)?.value &&
        (blockChanges as any).value !== blockId) ||
      ((blockChanges as any)?.value &&
        !(blocks.options && blocks.options.length))
    ) {
      setFlats((prev) => ({ ...prev, loading: true }));
      const fetchFlats = async () => {
        try {
          const response = await getFlatsByBlockId(
            (blockChanges as any)?.value
          );
          if (response.data?.totalPages) {
            const flats = response.data.resultData || [];
            const flatFormField = flats.map(({ id, number }: IFlat) => ({
              label: number,
              value: id,
            }));
            setFlats((prev) => ({
              ...prev,
              options: flatFormField,
              loading: false,
            }));
            if ((blockChanges as any).value !== blockId) {
              setValue('flatId', null);
            }
          } else {
            setFlats((prev) => ({ ...prev, options: [], loading: false }));
            errorMessage('Seçili blok bilgisine ait bir daire bulunamadı.');
          }
        } catch (error) {
          setFlats((prev) => ({ ...prev, loading: false }));
        }
        setBlockId((blockChanges as any).value);
      };
      fetchFlats();
    }
  }, [blockChanges, setValue, blockId, blocks]);

  const onSubmit = async (form: IRequestCall) => {
    try {
      setLoading((loading) => ({ ...loading, createRequestCall: true }));
      console.log('form', form);
      const { apartmentId, blockId, ...formValues } = form;
      const response = await addRequestCall({
        ...formValues,
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
            isdone: (form.isdone as any).value ? 'Aktif' : 'Aktif değil'
          },
        });
        reset({ isdone: null, description: '', flatId: null, userId: null, apartmentId: isApartmentAdmin ? { label: user.apartment?.apartment?.name, value: user.apartment?.apartment?.id} as any : null, blockId: null });
      }
      setLoading((loading) => ({ ...loading, createRequestCall: false }));
    } catch (error) {
      setLoading((loading) => ({ ...loading, createRequestCall: false }));
    }
  };

  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
      const defaultValue = { label: user.apartment?.apartment?.name, value: user.apartment?.apartment?.id}
      if(isApartmentAdmin) setValue('apartmentId', defaultValue as any)
      const usersEndpoint = isApartmentAdmin ? getUsersByApartmentId : getUsers;
      const fetchData = async () => {
        try {
          const [resUsers, resFlats] = await Promise.all([
            usersEndpoint(0, 1000, { apartmentId: defaultValue.value }),
            getApartments(0, 200),
          ]);
          const [users, apartments] = await [
            resUsers.data.resultData,
            resFlats.data.resultData,
          ];
          const updatedUsers = users.map(({ username, id }: IUser) => ({
            label: username,
            value: id,
          }));
          const updatedApartments = apartments.map(
            ({ name, id }: IApartment) => ({
              label: name,
              value: id,
            })
          );
          console.log('users apartments', updatedUsers, updatedApartments);
          setFormRequiredValues({
            users: updatedUsers,
            apartments: updatedApartments,
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
  }, [isApartmentAdmin, user, setValue, reset]);

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
                name="apartmentId"
                control={control}
                options={formRequiredValues.apartments}
                isLoading={loading.formFields}
                isDisabled={isApartmentAdmin}
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
            {blocks.options && blocks.options.length ? (
              <View display="flex" flexDirection="column" gridColumn="1/5">
                <Select
                  name="blockId"
                  control={control}
                  options={blocks.options}
                  isLoading={blocks.loading}
                  rules={{
                    required: {
                      value: true,
                      message:
                        'Lütfen hangi bloka eklemek istediğinizi giriniz',
                    },
                  }}
                  placeholder="Kullanıcının blok bilgisini seçiniz"
                />
                {errors.blockId && (
                  <ErrorMessage> {errors.blockId?.message}</ErrorMessage>
                )}
              </View>
            ) : null}
            {blocks.options?.length && flats.options && flats.options.length ? (
              <View display="flex" flexDirection="column" gridColumn="1/5">
                <Select
                  name="flatId"
                  control={control}
                  options={flats.options}
                  isLoading={flats.loading}
                  rules={{
                    required: {
                      value: true,
                      message: 'Lütfen kullanıcı daire bilgisini giriniz',
                    },
                  }}
                  placeholder="Kullanıcının daire bilgisini seçiniz"
                />
                {errors.flatId && (
                  <ErrorMessage> {errors.flatId?.message}</ErrorMessage>
                )}
              </View>
            ) : null}
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
  );
};

export default CreateRequestCall;
