import React, { useContext } from 'react';
import { IBlockRow } from '../../consts';
import { BlockActionTypes, BlockContext } from '../../contexts/BlockContext';
import { getBlocks } from '../../services';
import Button from '../button/Button';
import BuildingIcon from '../icons/BuildingIcon';
import ExportIcon from '../icons/ExportIcon';
import { BasicTextField } from '../textfield/TextField';
import View from '../view/View';

interface IBlockTableHeader {
  handleBlockFunctions: (type: string) => void;
}

const BlockTableHeader = ({ handleBlockFunctions }: IBlockTableHeader) => {
  const { state, dispatch } = useContext(BlockContext);

  const fetchBlocks = async (key: string) => {
    const response = await getBlocks(0, state.totalBlocks || 200);
    const blocks: IBlockRow[] = await response.data.resultData;
    const filteredBlocks = blocks
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

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 2) {
      dispatch({ type: BlockActionTypes.SET_LOADING, loading: true });
      fetchBlocks(key);
    } else
      dispatch({
        type: BlockActionTypes.SET_FILTERED_BLOCKS,
        filter: { key: '', result: [] as IBlockRow[] },
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
