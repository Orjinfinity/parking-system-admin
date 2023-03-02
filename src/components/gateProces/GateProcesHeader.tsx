import React, { useContext } from 'react';
import { BasicTextField, Button, ExportIcon, View } from '..';
import { GateProcesActionTypes, GateProcesContext } from '../../contexts';
import { getGateProcesses } from '../../services';
import { IGateProcesRow } from '../../consts';

interface IGateProcesTableHeader {
  handleGateProcesFunctions: (type: string) => void;
}

const GateProcesHeader = ({
  handleGateProcesFunctions,
}: IGateProcesTableHeader) => {
  const { state, dispatch } = useContext(GateProcesContext);

  const fetchGateProcesses = async (key: string) => {
    const response = await getGateProcesses(0, state.totalGateProcesses || 200);
    const gateProcesses: IGateProcesRow[] = await response.data.resultData;
    const filteredGateProcesses = gateProcesses
      .filter(({ doorId }) =>
        [doorId].some((field) => field.toString().toLowerCase().includes(key))
      )
      .map((gateProces) => ({
        ...gateProces,
        created_at: new Date(gateProces.created_at).toLocaleString(),
      }));

    dispatch({
      type: GateProcesActionTypes.SET_FILTERED_GATEPROCESSES,
      filter: { key, result: filteredGateProcesses },
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 2) {
      dispatch({ type: GateProcesActionTypes.SET_LOADING, loading: true });
      fetchGateProcesses(key);
    } else
      dispatch({
        type: GateProcesActionTypes.SET_FILTERED_GATEPROCESSES,
        filter: { key: '', result: [] as IGateProcesRow[] },
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
          placeholder="İşlem Ara"
          onChange={handleSearchInput}
        />
        {/* <Button
          fontSize="medium"
          letterSpacing=".46px"
          variant="contained"
          color="primary"
          ml="16px"
          size="md"
          onClick={() => handleGateProcesFunctions('add')}
        >
          <GateProcesesIcon size="24px" mb="2px" />
          <View mr="8px">+</View>
          Yeni İşlem
        </Button> */}
      </View>
    </View>
  );
};

export default GateProcesHeader;
