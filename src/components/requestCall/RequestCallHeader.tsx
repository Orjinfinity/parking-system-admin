import React, { useContext, useState } from 'react';
import { IRequestCallRow } from '../../consts';
import { BasicTextField, Button, UrgentIcon, View } from '..';
import { RequestCallActionTypes, RequestCallContext } from '../../contexts';
import { getRequestCalls, getRequestCallsByApartmentId } from '../../services';
import {
  getApartmentIdForAdmin,
  getUserIsApartmentAdmin,
} from '../../utils/userHelper';

interface IRequestCallTableHeader {
  handleRequestCallFunctions: (type: string) => void;
}

const RequestCallHeader = ({
  handleRequestCallFunctions,
}: IRequestCallTableHeader) => {
  const [fetchedRequestCalls, setFetchedRequestCalls] = useState<
    Array<IRequestCallRow>
  >([]);
  const { state, dispatch } = useContext(RequestCallContext);
  const isApartmentAdmin = getUserIsApartmentAdmin();
  const apartmentInfo = getApartmentIdForAdmin();

  const setFilteredRequestCall = (
    key: string,
    requestCalls?: Array<IRequestCallRow>
  ) => {
    console.log(requestCalls, key);
    const filteredRequestCalls = (requestCalls || fetchedRequestCalls)
      .filter(({ description, flatId, userId }) =>
        [description, flatId, userId].some(
          (field) => field && `${field}`.toLowerCase().includes(key)
        )
      )
      .map((requestCall) => ({
        ...requestCall,
        created_at: new Date(requestCall.created_at).toLocaleString(),
      }));

    dispatch({
      type: RequestCallActionTypes.SET_FILTERED_REQUESTCALLS,
      filter: { key, result: filteredRequestCalls },
    });
  };

  const fetchRequestCalls = async (key: string) => {
    try {
      dispatch({ type: RequestCallActionTypes.SET_LOADING, loading: true });
      const requestCallsEndpoint = isApartmentAdmin
        ? getRequestCallsByApartmentId
        : getRequestCalls;
      const response = await requestCallsEndpoint(
        0,
        state.totalRequestCalls || 200,
        apartmentInfo?.id
      );
      const requestCalls: IRequestCallRow[] = await response.data.resultData;
      setFilteredRequestCall(key, requestCalls);
      setFetchedRequestCalls(requestCalls);
    } catch (error) {
      setFetchedRequestCalls([]);
    }
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 0) {
      if (!(fetchedRequestCalls && fetchedRequestCalls.length))
        fetchRequestCalls(key);
      setFilteredRequestCall(key);
    } else
      dispatch({
        type: RequestCallActionTypes.SET_FILTERED_REQUESTCALLS,
        filter: { key: '', result: [] as IRequestCallRow[] },
        ...(fetchedRequestCalls?.length && {
          totalRequestCalls: fetchedRequestCalls.length,
        }),
      });
  };

  return (
    <View
      display="flex"
      width="100%"
      justifyContent="space-between"
      mt="20px"
      mb="20px"
      height="38px"
    >
      {/* <Button
      fontSize="medium"
      letterSpacing=".46px"
      variant="dashed"
      color="gray"
      size="md"
      ml="-5px"
    >
      <ExportIcon size="20px" mr="8px" mb="4px" />
      Export
    </Button> */}
      <View display="flex" width="240px">
        <BasicTextField
          name="search"
          placeholder="Acil Durum Ara"
          onChange={handleSearchInput}
        />
      </View>
      <View display="flex">
        <Button
          fontSize="medium"
          letterSpacing=".46px"
          variant="contained"
          color="primary"
          ml="16px"
          size="md"
          onClick={() => handleRequestCallFunctions('add')}
        >
          <UrgentIcon size="24px" mb="2px" />
          <View mr="8px">+</View>
          <View display={['none', 'none', 'block', 'block', 'block']}>
            Yeni Acil Durum
          </View>
        </Button>
      </View>
    </View>
  );
};

export default RequestCallHeader;
