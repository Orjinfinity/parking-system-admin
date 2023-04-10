import React, { useContext, useState } from 'react';
import { BasicTextField, Button, GateIcon, View } from '..';
import { IDoorRow } from '../../consts';
import { DoorActionTypes, DoorContext } from '../../contexts';
import { getDoors, getDoorsByApartmentId } from '../../services';
import {
  getApartmentIdForAdmin,
  getUserIsApartmentAdmin,
} from '../../utils/userHelper';

interface IDoorTableHeader {
  handleDoorFunctions: (type: string) => void;
}

const DoorTableHeader = ({ handleDoorFunctions }: IDoorTableHeader) => {
  const [fetchedDoors, setFetchedDoors] = useState<Array<IDoorRow>>([]);
  const { state, dispatch } = useContext(DoorContext);
  const isApartmentAdmin = getUserIsApartmentAdmin();
  const apartmentInfo = getApartmentIdForAdmin();

  const setFilteredDoors = (key: string, doors?: Array<IDoorRow>) => {
    console.log(fetchedDoors, key);
    const filteredDoors = (doors || fetchedDoors)
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

  const fetchDoors = async (key: string) => {
    try {
      const doorsEndpoint = isApartmentAdmin ? getDoorsByApartmentId : getDoors;
      const response = await doorsEndpoint(
        0,
        state.totalDoors || 200,
        apartmentInfo?.id
      );
      const doors: IDoorRow[] = await response.data.resultData;
      setFilteredDoors(key, doors);
      setFetchedDoors(doors);
    } catch (error) {
      console.log(error);
      setFetchedDoors([]);
    }
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 0) {
      if (!(fetchedDoors && fetchedDoors.length)) fetchDoors(key);
      setFilteredDoors(key);
    } else
      dispatch({
        type: DoorActionTypes.SET_FILTERED_DOORS,
        filter: { key: '', result: [] as IDoorRow[] },
        ...(fetchedDoors?.length && { totalDoors: fetchedDoors.length }),
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
        placeholder="Kapı Ara"
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
          onClick={() => handleDoorFunctions('add')}
        >
          <GateIcon size="24px" mb="2px" />
          <View mr="8px">+</View>
          <View display={['none', 'none', 'block', 'block', 'block']}>
            Yeni Kapı
          </View>
        </Button>
      </View>
    </View>
  );
};

export default DoorTableHeader;
