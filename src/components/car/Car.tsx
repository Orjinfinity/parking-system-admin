import { useCallback, useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { carColumns, customTableStyles, ICarRow } from '../../consts';
import { CarActionTypes, CarContext } from '../../contexts/CarContext';
import Button from '../button/Button';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import Loader from '../loader/Loader';
import View from '../view/View';
import CarTableHeader from './CarTableHeader';
import CreateCar from './CreateCar';
import DeleteCar from './DeleteCar';
import UpdateCar from './UpdateCar';

enum CarTableModalTypes {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

interface ISelectedCar {
  type: CarTableModalTypes;
  car: ICarRow;
}

const Car = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<ISelectedCar>(null);
  const [selectedRows, setSelectedRows] = useState<Array<ICarRow>>([]);

  const { state, dispatch } = useContext(CarContext);

  const handleCarFunctions = (
    type: CarTableModalTypes,
    car = {} as ICarRow
  ) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedCar({ type, car });
  };

  const getModalComponent = () => {
    const Components = {
      [CarTableModalTypes.ADD]: CreateCar,
      [CarTableModalTypes.UPDATE]: UpdateCar,
      [CarTableModalTypes.DELETE]: DeleteCar,
    };
    const Component = Components[selectedCar.type];
    return (
      <Component
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedCar={selectedCar.car}
      />
    );
  };

  const handleRowSelected = useCallback((state) => {
    const selectedRows = state?.selectedRows || [];
    setSelectedRows(selectedRows);
    console.log('rowselected', state);
  }, []);

  const handlePageChange = (page: number) =>
    dispatch({ type: CarActionTypes.UPDATE_PAGE_COUNT, page: page - 1 });
  const handlePerRowsChange = (perPageRows: number) =>
    dispatch({ type: CarActionTypes.UPDATE_PER_PAGE_ROWS, perPageRows });

  return (
    <View boxShadow="primary">
      <DataTable
        title={selectedRows.length ? 'Show Title' : ''}
        selectableRows
        responsive
        className="table"
        columns={[
          ...carColumns,
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
                    handleCarFunctions(CarTableModalTypes.UPDATE, row)
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
                    handleCarFunctions(CarTableModalTypes.DELETE, row)
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
          <CarTableHeader handleCarFunctions={handleCarFunctions} />
        }
        data={state.filter.key.length ? state.filter.result : state.cars}
        pagination
        paginationServer
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationTotalRows={state.totalCars}
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
      {selectedCar ? getModalComponent() : null}
    </View>
  );
};

export default Car;
