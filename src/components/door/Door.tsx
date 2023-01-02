import { useCallback, useContext, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Button, DeleteIcon, EditIcon, Loader, View } from '..';
import { customTableStyles, doorColumns, IDoorRow } from '../../consts';
import { DoorActionTypes, DoorContext } from '../../contexts';
import { TableModalTypes } from '../../interfaces'
import DoorTableHeader from './DoorTableHeader';
import CreateDoor from './CreateDoor';
import DeleteDoor from './DeleteDoor';
import UpdateDoor from './UpdateDoor';

interface ISelectedDoor {
  type: TableModalTypes;
  door: IDoorRow
} 

const Door = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedDoor, setSelectedDoor] = useState<ISelectedDoor>(null);
  const [selectedRows, setSelectedRows] = useState<Array<IDoorRow>>([]);

  const { state, dispatch } = useContext(DoorContext);

  const handleDoorFunctions = (
    type: TableModalTypes,
    door = {} as IDoorRow
  ) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedDoor({ type, door });
  };

  const getModalComponent = () => {
    const Components = {
      [TableModalTypes.ADD]: CreateDoor,
      [TableModalTypes.UPDATE]: UpdateDoor,
      [TableModalTypes.DELETE]: DeleteDoor,
    };
    const Component = Components[selectedDoor.type];
    return (
      <Component
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedDoor={selectedDoor.door}
      />
    );
  };

  const handleRowSelected = useCallback((state) => {
    const selectedRows = state?.selectedRows || [];
    setSelectedRows(selectedRows);
    console.log('rowselected', state);
  }, []);

  const handlePageChange = (page: number) =>
    dispatch({ type: DoorActionTypes.UPDATE_PAGE_COUNT, page: page - 1 });
  const handlePerRowsChange = (perPageRows: number) =>
    dispatch({ type: DoorActionTypes.UPDATE_PER_PAGE_ROWS, perPageRows });
  return (
    <View boxShadow="primary">
    <DataTable
      title={selectedRows.length ? 'Show Title' : ''}
      selectableRows
      responsive
      className="table"
      columns={[
        ...doorColumns,
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
                  handleDoorFunctions(TableModalTypes.UPDATE, row)
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
                  handleDoorFunctions(TableModalTypes.DELETE, row)
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
        <DoorTableHeader handleDoorFunctions={handleDoorFunctions} />
      }
      data={state.filter.key.length ? state.filter.result : state.doors}
      pagination
      paginationServer
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePerRowsChange}
      paginationTotalRows={state.totalDoors}
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
    {selectedDoor ? getModalComponent() : null}
  </View>
  )
}

export default Door