import { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { View, Button, Loader, EditIcon, DeleteIcon } from '..';
import { FlatActionTypes, FlatContext } from '../../contexts';
import { customTableStyles, flatColumns, IFlatRow } from '../../consts';
import FlatTableHeader from './FlatTableHeader';
import CreateFlat from './CreateFlat';
import DeleteFlat from './DeleteFlat';
import UpdateFlat from './UpdateFlat';

enum FlatTableModalTypes {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

interface ISelectedFlat {
  type: FlatTableModalTypes;
  flat: IFlatRow;
}

const Flat = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedFlat, setSelectedFlat] = useState<ISelectedFlat>(null);
  // const [selectedRows, setSelectedRows] = useState<Array<IFlatRow>>([]);

  const { state, dispatch } = useContext(FlatContext);

  const handleFlatFunctions = (
    type: FlatTableModalTypes,
    flat = {} as IFlatRow
  ) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedFlat({ type, flat });
  };

  const getModalComponent = () => {
    const Components = {
      [FlatTableModalTypes.ADD]: CreateFlat,
      [FlatTableModalTypes.UPDATE]: UpdateFlat,
      [FlatTableModalTypes.DELETE]: DeleteFlat,
    };
    const Component = Components[selectedFlat.type];
    return (
      <Component
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedFlat={selectedFlat.flat}
      />
    );
  };

  // const handleRowSelected = useCallback((state) => {
  //   const selectedRows = state?.selectedRows || [];
  //   setSelectedRows(selectedRows);
  //   console.log('rowselected', state);
  // }, []);

  const handlePageChange = (page: number) =>
    dispatch({ type: FlatActionTypes.UPDATE_PAGE_COUNT, page: page - 1 });
  const handlePerRowsChange = (perPageRows: number) =>
    dispatch({ type: FlatActionTypes.UPDATE_PER_PAGE_ROWS, perPageRows });
  return (
    <View boxShadow="primary">
      <DataTable
        title={''}
        selectableRows
        responsive
        className="table"
        columns={[
          ...flatColumns,
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
                    handleFlatFunctions(FlatTableModalTypes.UPDATE, row)
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
                    handleFlatFunctions(FlatTableModalTypes.DELETE, row)
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
          <FlatTableHeader handleFlatFunctions={handleFlatFunctions} />
        }
        data={state.filter.key.length ? state.filter.result : state.flats}
        pagination
        paginationServer
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationTotalRows={state.totalFlats}
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
        // onSelectedRowsChange={handleRowSelected}
      />
      {selectedFlat ? getModalComponent() : null}
    </View>
  );
};

export default Flat;
