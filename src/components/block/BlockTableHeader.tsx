import React, { useContext, useState } from 'react';
import { View, Button, ExportIcon, BasicTextField, BuildingIcon } from '..';
import { BlockActionTypes, BlockContext } from '../../contexts';
import { getBlocks, getBlocksByApartmentId } from '../../services';
import { IBlockRow } from '../../consts';
import { getApartmentIdForAdmin, getUserIsApartmentAdmin } from '../../utils/userHelper';

interface IBlockTableHeader {
  handleBlockFunctions: (type: string) => void;
}

const BlockTableHeader = ({ handleBlockFunctions }: IBlockTableHeader) => {
  const [fetchedBlocks, setFetchedBlocks] = useState<Array<IBlockRow>>([]);
  const { state, dispatch } = useContext(BlockContext);
  const isApartmentAdmin = getUserIsApartmentAdmin();
  const apartmentInfo = getApartmentIdForAdmin();

  const setFilteredBlocks = (key: string, blocks?: Array<IBlockRow>) => {
    console.log(fetchedBlocks, key);
    const filteredBlocks = (blocks || fetchedBlocks)
    .filter(({ name }) =>
      [name].some((field) => field.toLowerCase().includes(key))
    )
    .map((block) => ({
      ...block,
      created_at: new Date(block.created_at).toLocaleString(),
    }));
    dispatch({
      type: BlockActionTypes.SET_FILTERED_BLOCKS,
      filter: { key, result: filteredBlocks },
    });
  };

  const fetchBlocks = async (key: string) => {
    try {
      const blocksEndpoint = isApartmentAdmin ? getBlocksByApartmentId : getBlocks;
      dispatch({ type: BlockActionTypes.SET_LOADING, loading: true });
      const response = await blocksEndpoint(0, state.totalBlocks || 200, apartmentInfo?.id);
      const blocks: IBlockRow[] = await response.data.resultData;
      setFilteredBlocks(key, blocks);
      setFetchedBlocks(blocks);
    } catch (error) {
      console.log(error);
      setFetchedBlocks([]);
    }
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 2) {
      if (!(fetchedBlocks && fetchedBlocks.length)) fetchBlocks(key);
      setFilteredBlocks(key)
    } else
      dispatch({
        type: BlockActionTypes.SET_FILTERED_BLOCKS,
        filter: { key: '', result: [] as IBlockRow[] },
        ...(fetchedBlocks?.length && { totalBlocks: fetchedBlocks.length})
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
          placeholder="Blok Ara"
          onChange={handleSearchInput}
        />
        <Button
          fontSize="medium"
          letterSpacing=".46px"
          variant="contained"
          color="primary"
          ml="16px"
          size="md"
          onClick={() => handleBlockFunctions('add')}
        >
          <BuildingIcon size="24px" mb="2px" />
          <View mr="8px">+</View>
          Yeni Blok
        </Button>
      </View>
    </View>
  );
};

export default BlockTableHeader;
