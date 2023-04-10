import React, { useContext, useState } from 'react';
import { View, Button, BasicTextField, CarIcon } from '..';
import { CarActionTypes, CarContext } from '../../contexts';
import { getCars, getCarsByApartmentId } from '../../services';
import { ICarRow } from '../../consts';
import {
  getApartmentIdForAdmin,
  getUserIsApartmentAdmin,
} from '../../utils/userHelper';

interface ICarTableHeader {
  handleCarFunctions: (type: string) => void;
}

const CarTableHeader = ({ handleCarFunctions }: ICarTableHeader) => {
  const [fetchedCars, setFetchedCars] = useState<Array<ICarRow>>([]);
  const { state, dispatch } = useContext(CarContext);
  const isApartmentAdmin = getUserIsApartmentAdmin();
  const apartmentInfo = getApartmentIdForAdmin();

  const setFilteredCars = (key: string, cars?: Array<ICarRow>) => {
    console.log(cars, key);
    const filteredCars = (cars || fetchedCars)
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

  const fetchCars = async (key: string) => {
    try {
      dispatch({ type: CarActionTypes.SET_LOADING, loading: true });
      const carsEndpoint = isApartmentAdmin ? getCarsByApartmentId : getCars;
      const response = await carsEndpoint(
        0,
        state.totalCars || 200,
        apartmentInfo?.id
      );
      const cars: ICarRow[] = await response.data.resultData;
      setFilteredCars(key, cars);
      setFetchedCars(cars);
    } catch (error) {
      console.log(error);
      setFetchedCars([]);
    }
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 2) {
      if (!(fetchedCars && fetchedCars.length)) fetchCars(key);
      setFilteredCars(key);
    } else
      dispatch({
        type: CarActionTypes.SET_FILTERED_CARS,
        filter: { key: '', result: [] as ICarRow[] },
        ...(fetchedCars?.length && { totalCars: fetchedCars.length }),
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
          placeholder="Araç Ara"
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
          onClick={() => handleCarFunctions('add')}
        >
          <CarIcon size="24px" mb="2px" />
          <View mr="8px">+</View>
          <View display={['none', 'none', 'block', 'block', 'block']}>
            Yeni Araç
          </View>
        </Button>
      </View>
    </View>
  );
};

export default CarTableHeader;
