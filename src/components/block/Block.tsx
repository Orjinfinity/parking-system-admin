import React, { useCallback, useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { blockColumns, customTableStyles, IBlockRow } from '../../consts';
import { BlockActionTypes, BlockContext } from '../../contexts/BlockContext';
import Button from '../button/Button';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import Loader from '../loader/Loader';
import View from '../view/View';
import BlockTableHeader from './BlockTableHeader';
import CreateBlock from './CreateBlock';
import DeleteBlock from './DeleteBlock';
import UpdateBlock from './UpdateBlock';

enum BlockTableModalTypes {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

interface ISelectedBlock {
  type: BlockTableModalTypes;
  block: IBlockRow;
}

const Block = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState<ISelectedBlock>(null);
  const [selectedRows, setSelectedRows] = useState<Array<IBlockRow>>([]);

  const { state, dispatch } = useContext(BlockContext);

  const handleBlockFunctions = (
    type: BlockTableModalTypes,
    block = {} as IBlockRow
  ) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedBlock({ type, block });
  };

  const getModalComponent = () => {
    const Components = {
      [BlockTableModalTypes.ADD]: CreateBlock,
      [BlockTableModalTypes.UPDATE]: UpdateBlock,
      [BlockTableModalTypes.DELETE]: DeleteBlock,
    };
    const Component = Components[selectedBlock.type];
    return (
      <Component
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedBlock={selectedBlock.block}
      />
    );
  };

  const handleRowSelected = useCallback((state) => {
    const selectedRows = state?.selectedRows || [];
    setSelectedRows(selectedRows);
    console.log('rowselected', state);
  }, []);

  const handlePageChange = (page: number) =>
    dispatch({ type: BlockActionTypes.UPDATE_PAGE_COUNT, page: page - 1 });
  const handlePerRowsChange = (perPageRows: number) =>
    dispatch({ type: BlockActionTypes.UPDATE_PER_PAGE_ROWS, perPageRows });

  return (
    <View boxShadow="primary">
      <DataTable
        title={selectedRows.length ? 'Show Title' : ''}
        selectableRows
        responsive
        className="table"
        columns={[
          ...blockColumns,
          {
            cell: (row) => (
              <View
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  fontSize="small"
                  padding="8px"
                  letterSpacing=".46px"
                  variant="icon"
                  size="auto"
                  onClick={() =>
                    handleBlockFunctions(BlockTableModalTypes.UPDATE, row)
                  }
                >
                  <EditIcon size="20px" color="success" />
                </Button>
                <Button
                  fontSize="small"
                  padding="8px"
                  letterSpacing=".46px"
                  variant="icon"
                  size="auto"
                  onClick={() =>
                    handleBlockFunctions(BlockTableModalTypes.DELETE, row)
                  }
                >
                  <DeleteIcon size="20px" color="error" />
                </Button>
              </View>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
        ]}
        subHeader
        subHeaderComponent={
          <BlockTableHeader handleBlockFunctions={handleBlockFunctions} />
        }
        data={state.filter.key.length ? state.filter.result : state.blocks}
        pagination
        paginationServer
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationTotalRows={state.totalBlocks}
        customStyles={customTableStyles}
        progressPending={state.loading}
        noDataComponent={<View padding="40px">Görüntülenecek Kayıt Yok</View>}
        progressComponent={
          <View mb="20px">
            <Loader position="relative" />
          </View>
        }
        contextActions={
          <Button
            fontSize="medium"
            letterSpacing=".46px"
            variant="contained"
            color="error"
            size="md"
          >
            <DeleteIcon size="20px" mr="8px" mb="2px" />
            Delete
          </Button>
        }
        onSelectedRowsChange={handleRowSelected}
      />
      {selectedBlock ? getModalComponent() : null}
    </View>
  );
};

export default Block;
