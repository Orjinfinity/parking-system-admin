import React, { useContext } from 'react'
import { IRequestCallRow } from '../../consts';
import { BasicTextField, Button, ExportIcon, UrgentIcon, View } from '..';
import { RequestCallActionTypes, RequestCallContext } from '../../contexts';
import { getRequestCalls } from '../../services';

interface IRequestCallTableHeader {
  handleRequestCallFunctions: (type: string) => void;
}

const RequestCallHeader = ({ handleRequestCallFunctions }: IRequestCallTableHeader) => {
  const { state, dispatch } = useContext(RequestCallContext);

  const fetchRequestCalls = async (key: string) => {
    const response = await getRequestCalls(0, state.totalRequestCalls || 200);
    const requestCalls: IRequestCallRow[] = await response.data.resultData;
    const filteredRequestCalls = requestCalls
      .filter(({ description }) =>
        [description].some((field) => field && field.toLowerCase().includes(key))
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

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 2) {
      dispatch({ type: RequestCallActionTypes.SET_LOADING, loading: true });
      fetchRequestCalls(key);
    } else
      dispatch({
        type: RequestCallActionTypes.SET_FILTERED_REQUESTCALLS,
        filter: { key: '', result: [] as IRequestCallRow[] },
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
    <Button
      fontSize="medium"
      letterSpacing=".46px"
      variant="dashed"
      color="gray"
      size="md"
      ml="-5px"
    >
      <ExportIcon size="20px" mr="8px" mb="4px" />
      Export
    </Button>
    <View display="flex">
      <BasicTextField
        name="search"
        placeholder="Acil Durum Ara"
        onChange={handleSearchInput}
      />
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
        Yeni Acil Durum
      </Button>
    </View>
  </View>
  )
}

export default RequestCallHeader