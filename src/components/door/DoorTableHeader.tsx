import React, { useContext } from 'react'
import { BasicTextField, Button, ExportIcon, GateIcon, View } from '..';
import { IDoorRow } from '../../consts';
import { DoorActionTypes, DoorContext } from '../../contexts';
import { getDoors } from '../../services';

interface IDoorTableHeader {
  handleDoorFunctions: (type: string) => void;
}

const DoorTableHeader = ({ handleDoorFunctions }: IDoorTableHeader) => {
  const { state, dispatch } = useContext(DoorContext);

  const fetchDoors = async (key: string) => {
    const response = await getDoors(0, state.totalDoors || 200);
    const doors: IDoorRow[] = await response.data.resultData;
    const filteredDoors = doors
      .filter(({ name, camiplink }) =>
        [name, camiplink].some((field) => field.toLowerCase().includes(key))
      )
      .map((door) => ({
        ...door,
        created_at: new Date(door.created_at).toLocaleString(),
      }));

    dispatch({
      type: DoorActionTypes.SET_FILTERED_DOORS,
      filter: { key, result: filteredDoors },
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 2) {
      dispatch({ type: DoorActionTypes.SET_LOADING, loading: true });
      fetchDoors(key);
    } else
      dispatch({
        type: DoorActionTypes.SET_FILTERED_DOORS,
        filter: { key: '', result: [] as IDoorRow[] },
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
          placeholder="Kapı Ara"
          onChange={handleSearchInput}
        />
        <Button
          fontSize="medium"
          letterSpacing=".46px"
          variant="contained"
          color="primary"
          ml="16px"
          size="md"
          onClick={() => handleDoorFunctions('add')}
        >
          <GateIcon size="24px" mb="2px" />
          <View mr="8px">+</View>
          Yeni Kapı
        </Button>
      </View>
    </View>
  );
}

export default DoorTableHeader