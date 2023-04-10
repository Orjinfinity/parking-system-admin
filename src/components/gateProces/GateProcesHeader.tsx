import React, { useContext, useState } from 'react';
import { BasicTextField, View } from '..';
import { GateProcesActionTypes, GateProcesContext } from '../../contexts';
import {
  getGateProcesses,
  getGateProcessesByApartmentId,
} from '../../services';
import { IGateProcesRow } from '../../consts';
import {
  getApartmentIdForAdmin,
  getUserIsApartmentAdmin,
} from '../../utils/userHelper';

interface IGateProcesTableHeader {
  handleGateProcesFunctions: (type: string) => void;
}

const GateProcesHeader = ({
  handleGateProcesFunctions,
}: IGateProcesTableHeader) => {
  const [fetchedProcesess, setFetchedProcesess] = useState<
    Array<IGateProcesRow>
  >([]);
  const { state, dispatch } = useContext(GateProcesContext);
  const isApartmentAdmin = getUserIsApartmentAdmin();
  const apartmentInfo = getApartmentIdForAdmin();

  const setFilteredProcesess = (
    key: string,
    procesess?: Array<IGateProcesRow>
  ) => {
    console.log(procesess, key);
    const filteredGateProcesses = (procesess || fetchedProcesess)
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

  const fetchGateProcesses = async (key: string) => {
    try {
      dispatch({ type: GateProcesActionTypes.SET_LOADING, loading: true });
      const procesessEndpoint = isApartmentAdmin
        ? getGateProcessesByApartmentId
        : getGateProcesses;
      const response = await procesessEndpoint(
        0,
        state.totalGateProcesses || 200,
        apartmentInfo?.id
      );
      const gateProcesses: IGateProcesRow[] = await response.data.resultData;
      setFilteredProcesess(key, gateProcesses);
      setFetchedProcesess(gateProcesses);
    } catch (error) {
      console.log(error);
      setFetchedProcesess([]);
    }
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 0) {
      if (!(fetchedProcesess && fetchedProcesess.length))
        fetchGateProcesses(key);
      setFilteredProcesess(key);
    } else
      dispatch({
        type: GateProcesActionTypes.SET_FILTERED_GATEPROCESSES,
        filter: { key: '', result: [] as IGateProcesRow[] },
        ...(fetchedProcesess?.length && {
          totalGateProcesses: fetchedProcesess.length,
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
        placeholder="İşlem Ara"
        onChange={handleSearchInput}
      />
      </View>
      <View display="flex">
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
