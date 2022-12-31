import React, { useContext } from 'react';
import { View, Button, ExportIcon, BasicTextField, CarIcon } from '..';
import { CarActionTypes, CarContext } from '../../contexts';
import { getCars } from '../../services';
import { ICarRow } from '../../consts';

interface ICarTableHeader {
  handleCarFunctions: (type: string) => void;
}

const CarTableHeader = ({ handleCarFunctions }: ICarTableHeader) => {
  const { state, dispatch } = useContext(CarContext);

  const fetchCars = async (key: string) => {
    const response = await getCars(0, state.totalCars || 200);
    const cars: ICarRow[] = await response.data.resultData;
    const filteredCars = cars
      .filter(({ model, brand, ownername, ownersurname }) =>
        [model, brand, ownername, ownersurname].some((field) =>
          field.toLowerCase().includes(key)
        )
      )
      .map((car) => ({
        ...car,
        created_at: new Date(car.created_at).toLocaleString(),
      }));

    dispatch({
      type: CarActionTypes.SET_FILTERED_CARS,
      filter: { key, result: filteredCars },
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 2) {
      dispatch({ type: CarActionTypes.SET_LOADING, loading: true });
      fetchCars(key);
    } else
      dispatch({
        type: CarActionTypes.SET_FILTERED_CARS,
        filter: { key: '', result: [] as ICarRow[] },
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
          placeholder="Araç Ara"
          onChange={handleSearchInput}
        />
        <Button
          fontSize="medium"
          letterSpacing=".46px"
          variant="contained"
          color="primary"
          ml="16px"
          size="md"
          onClick={() => handleCarFunctions('add')}
        >
          <CarIcon size="24px" mb="2px" />
          <View mr="8px">+</View>
          Yeni Araç
        </Button>
      </View>
    </View>
  );
};

export default CarTableHeader;
