import React, { useContext } from 'react';
import { FlatActionTypes, FlatContext } from '../../contexts';
import { getFlats } from '../../services';
import { IFlatRow } from '../../consts';
import View from '../view/View';
import Button from '../button/Button';
import ExportIcon from '../icons/ExportIcon';
import { BasicTextField } from '../textfield/TextField';
import FlatIcon from '../icons/FlatIcon';

interface IFlatTableHeader {
  handleFlatFunctions: (type: string) => void;
}

const FlatTableHeader = ({ handleFlatFunctions }: IFlatTableHeader) => {
  const { state, dispatch } = useContext(FlatContext);

  const fetchFlats = async (key: string) => {
    const response = await getFlats(0, state.totalFlats || 200);
    const flats: IFlatRow[] = await response.data.resultData;
    const filteredFlats = flats
      .filter(({ number, block, floor }) =>
        [number, block, floor].some((field) =>
          field.toString().toLowerCase().includes(key)
        )
      )
      .map((flat) => ({
        ...flat,
        created_at: new Date(flat.created_at).toLocaleString(),
      }));

    dispatch({
      type: FlatActionTypes.SET_FILTERED_FLATS,
      filter: { key, result: filteredFlats },
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 2) {
      dispatch({ type: FlatActionTypes.SET_LOADING, loading: true });
      fetchFlats(key);
    } else
      dispatch({
        type: FlatActionTypes.SET_FILTERED_FLATS,
        filter: { key: '', result: [] as IFlatRow[] },
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
          placeholder="Daire Ara"
          onChange={handleSearchInput}
        />
        <Button
          fontSize="medium"
          letterSpacing=".46px"
          variant="contained"
          color="primary"
          ml="16px"
          size="md"
          onClick={() => handleFlatFunctions('add')}
        >
          <FlatIcon size="24px" mb="2px" />
          <View mr="8px">+</View>
          Yeni Daire
        </Button>
      </View>
    </View>
  );
};

export default FlatTableHeader;
