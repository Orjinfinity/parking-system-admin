import React, { useContext } from 'react'
import { IApartmentRow } from '../../consts';
import { ApartmentActionTypes, ApartmentContext } from '../../contexts/ApartmentsContext';
import { getApartments } from '../../services';
import Button from '../button/Button';
import ApartmentIcon from '../icons/ApartmentIcon';
import ExportIcon from '../icons/ExportIcon';
import { BasicTextField } from '../textfield/TextField';
import View from '../view/View';

interface IApartmentTableHeader {
  handleApartmentFunctions: (type: string) => void;
}

const ApartmentTableHeader = ({ handleApartmentFunctions }: IApartmentTableHeader) => {
  const { state, dispatch } = useContext(ApartmentContext);

  const fetchApartments = async (key: string) => {
    const response = await getApartments(0, state.totalApartments || 200);
    const apartments: IApartmentRow[] = await response.data.resultData;
    const filteredApartments = apartments.filter(({ name, address, city }) =>
      [name, address, city].some((field) => field.toLowerCase().includes(key))
    ).map(apartment => ({...apartment, created_at: new Date(apartment.created_at).toLocaleString()}));

    dispatch({ type: ApartmentActionTypes.SET_FILTERED_APARTMENTS, filter: { key, result: filteredApartments } });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if(key && key.length > 2) {
      dispatch({ type: ApartmentActionTypes.SET_LOADING, loading: true });
      fetchApartments(key);
    } else dispatch({ type: ApartmentActionTypes.SET_FILTERED_APARTMENTS, filter: { key: "", result: [] as IApartmentRow[] } });
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
          placeholder="Site Ara"
          onChange={handleSearchInput}
        />
        <Button
          fontSize="medium"
          letterSpacing=".46px"
          variant="contained"
          color="primary"
          ml="16px"
          size="md"
          onClick={() => handleApartmentFunctions('add')}
        >
          <ApartmentIcon size="24px" mb="2px" /><View mr="8px">+</View>
          Yeni Site
        </Button>
      </View>
    </View>
  );
}

export default ApartmentTableHeader