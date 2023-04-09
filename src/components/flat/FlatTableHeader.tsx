import React, { useContext, useEffect, useState } from 'react';
import { View, Button, BasicTextField, FlatIcon, SingleSelect } from '..';
import { FlatActionTypes, FlatContext } from '../../contexts';
import {
  getAllBlocksByApartmentId,
  getAllFlatsByBlockId,
  getFlats,
} from '../../services';
import { IFlatRow } from '../../consts';
import { IBlock, ISelectOption } from '../../interfaces';
import {
  getApartmentIdForAdmin,
  getUserIsApartmentAdmin,
} from '../../utils/userHelper';

interface IFlatTableHeader {
  handleFlatFunctions: (type: string) => void;
}

interface ISelectField {
  loading: boolean;
  options: Array<ISelectOption>;
}

const FlatTableHeader = ({ handleFlatFunctions }: IFlatTableHeader) => {
  const { state, dispatch } = useContext(FlatContext);
  const [block, setBlock] = useState<ISelectOption>({} as ISelectOption);
  const [blocks, setBlocks] = useState<ISelectField>({
    loading: true,
    options: [],
  });
  const [fetchedFlats, setFetchedFlats] = useState<Array<IFlatRow>>([]);
  const isApartmentAdmin = getUserIsApartmentAdmin();

  useEffect(() => {
    const apartmentId = getApartmentIdForAdmin();
    if (isApartmentAdmin && apartmentId?.id) {
      const fetchBlocks = async () => {
        try {
          const resBlocks = await getAllBlocksByApartmentId(apartmentId.id);
          const blocks = await resBlocks.data.resultData;
          const blockFormField = blocks.map(({ id, name }: IBlock) => ({
            label: name,
            value: id,
          }));
          setBlocks((prev) => ({
            ...prev,
            loading: false,
            options: blockFormField || [],
          }));
          if (blockFormField && blockFormField?.length) {
            setBlock(blockFormField[0]);
            dispatch({
              type: FlatActionTypes.SET_BLOCK,
              selectedBlock: blockFormField[0]?.value,
            });
          }
        } catch (error) {
          setBlocks((prev) => ({ ...prev, loading: false }));
        }
      };
      fetchBlocks().catch(() => {
        setBlocks((prev) => ({ ...prev, loading: false }));
      });
    }
  }, [isApartmentAdmin, dispatch]);

  const onChangeBlocks = (newValue: ISelectOption) => {
    dispatch({
      type: FlatActionTypes.SET_BLOCK,
      selectedBlock: +newValue.value as number,
    });
    setBlock(newValue);
  };

  const setFilteredFlats = (key: string, flats?: Array<IFlatRow>) => {
    const flatData = flats && flats?.length ? flats : fetchedFlats;
    const filteredFlats = flatData
      .filter(({ number, block, floor }) =>
        [number, block, floor].some((field: any) => {
          return `${field}`.toLowerCase().includes(key);
        })
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

  const fetchFlats = async (key: string) => {
    try {
      if (isApartmentAdmin) {
        if (state.selectedBlock) {
          dispatch({ type: FlatActionTypes.SET_LOADING, loading: true });
          const response = await getAllFlatsByBlockId(
            0,
            state.totalFlats || 5000,
            state.selectedBlock
          );
          const flats = await response.data.resultData;
          console.log('sa', flats);
          setFilteredFlats(key, flats);
          setFetchedFlats(flats);
        }
      } else {
        dispatch({ type: FlatActionTypes.SET_LOADING, loading: true });
        const response = await getFlats(0, state.totalFlats || 5000);
        const flats: IFlatRow[] = await response.data.resultData;
        setFilteredFlats(key, flats);
        setFetchedFlats(flats);
      }
    } catch (error) {
      console.log(error);
      setFetchedFlats([]);
    }
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 0) {
      if (!(fetchedFlats && fetchedFlats.length)) fetchFlats(key);
      setFilteredFlats(key);
    } else
      dispatch({
        type: FlatActionTypes.SET_FILTERED_FLATS,
        filter: { key: '', result: [] as IFlatRow[] },
        ...(fetchedFlats?.length && { totalFlats: fetchedFlats.length }),
      });
  };
  return (
    <View
      display="flex"
      width="100%"
      justifyContent={isApartmentAdmin ? 'space-between' : 'flex-end'}
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
      {isApartmentAdmin ? (
        <View display="flex" width="200px">
          <SingleSelect
            id="blocks"
            options={blocks.options}
            isLoading={blocks.loading}
            placeholder="Blok seçiniz."
            value={block}
            padding="12px"
            height="28px"
            width="180px"
            onChange={onChangeBlocks}
          />
        </View>
      ) : null}
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
