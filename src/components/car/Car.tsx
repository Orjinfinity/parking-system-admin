import { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { View, Button, Loader, EditIcon, DeleteIcon } from '..';
import { carColumns, customTableStyles, ICarRow } from '../../consts';
import { CarActionTypes, CarContext } from '../../contexts';
import CarTableHeader from './CarTableHeader';
import CreateCar from './CreateCar';
import DeleteCar from './DeleteCar';
import UpdateCar from './UpdateCar';

const StyledView = styled(View)`
  box-shadow: ${({ theme }) => theme.shadows.primary};
  max-width: 1628px;

  @media screen and (max-width: 1700px) {
    max-width: 1386px
  }
  @media screen and (max-width: 1400px) {
    max-width: 1086px
  }
  @media screen and (max-width: 992px) {
    max-width: 992px
  }
  @media screen and (max-width: 768px) {
    max-width: 768px
  }

`

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
  // const [selectedRows, setSelectedRows] = useState<Array<ICarRow>>([]);

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

  // const handleRowSelected = useCallback((state) => {
  //   const selectedRows = state?.selectedRows || [];
  //   setSelectedRows(selectedRows);
  //   console.log('rowselected', state);
  // }, []);

  const handlePageChange = (page: number) =>
    dispatch({ type: CarActionTypes.UPDATE_PAGE_COUNT, page: page - 1 });
  const handlePerRowsChange = (perPageRows: number) =>
    dispatch({ type: CarActionTypes.UPDATE_PER_PAGE_ROWS, perPageRows });

  return (
    <StyledView boxShadow="primary" maxWidth="calc(100% - 500px)">
      <DataTable
        title={''}
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
        // onSelectedRowsChange={handleRowSelected}
      />
      {selectedCar ? getModalComponent() : null}
    </StyledView>
  );
};

export default Car;
