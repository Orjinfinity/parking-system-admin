import React, { useContext, useState } from 'react';
import { ApartmentIcon, BasicTextField, Button, View } from '..';
import { ApartmentActionTypes, ApartmentContext } from '../../contexts';
import { getApartments } from '../../services';
import { IApartmentRow } from '../../consts';

interface IApartmentTableHeader {
  handleApartmentFunctions: (type: string) => void;
}

const ApartmentTableHeader = ({
  handleApartmentFunctions,
}: IApartmentTableHeader) => {
  const [fetchedApartments, setFetchedApartments] = useState<
    Array<IApartmentRow>
  >([]);
  const { state, dispatch } = useContext(ApartmentContext);

  const setFilteredApartments = async (
    key: string,
    apartments?: Array<IApartmentRow>
  ) => {
    const filteredApartments = (apartments ?? fetchedApartments)
      .filter(({ name, address, city, country }) =>
        [name, address, city, country].some(
          (field) => field && field.toLowerCase().includes(key)
        )
      )
      .map((apartment) => ({
        ...apartment,
        created_at: new Date(apartment.created_at).toLocaleString(),
      }));

    dispatch({
      type: ApartmentActionTypes.SET_FILTERED_APARTMENTS,
      filter: { key, result: filteredApartments },
      totalApartments: filteredApartments?.length || 0,
    });
  };

  const fetchApartments = async (key: string) => {
    try {
      dispatch({ type: ApartmentActionTypes.SET_LOADING, loading: true });
      const response = await getApartments(0, state.totalApartments || 200);
      const apartments: IApartmentRow[] = await response.data.resultData;
      setFilteredApartments(key, apartments);
      setFetchedApartments(apartments);
    } catch (error) {
      console.log(error);
      setFetchedApartments([]);
    }
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 0) {
      if (!(fetchedApartments && fetchedApartments.length))
        fetchApartments(key);
      setFilteredApartments(key);
    } else
      dispatch({
        type: ApartmentActionTypes.SET_FILTERED_APARTMENTS,
        filter: { key: '', result: [] as IApartmentRow[] },
        ...(fetchedApartments?.length && {
          totalApartments: fetchedApartments.length,
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
          placeholder="Site Ara"
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
          onClick={() => handleApartmentFunctions('add')}
        >
          <ApartmentIcon size="24px" mb="2px" />
          <View mr="8px">+</View>
          <View display={['none', 'none', 'block', 'block', 'block']}>
            Yeni Site
          </View>
        </Button>
      </View>
    </View>
  );
};

export default ApartmentTableHeader;
