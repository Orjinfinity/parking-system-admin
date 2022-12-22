import { memo, useCallback, useContext, useState } from 'react'
import DataTable from 'react-data-table-component';
import { apartmentColumns, customTableStyles, IApartmentRow } from '../../consts';
import { ApartmentActionTypes, ApartmentContext } from '../../contexts/ApartmentsContext';
import Button from '../button/Button';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import Loader from '../loader/Loader';
import View from '../view/View';
import ApartmentTableHeader from './ApartmentTableHeader';
import CreateApartment from './CreateApartment';
import DeleteApartment from './DeleteApartment';
import UpdateApartment from './UpdateApartment';

enum ApartmentTableModalTypes {
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete',
  }
  
  interface ISelectedApartment {
    type: ApartmentTableModalTypes;
    apartment: IApartmentRow;
  }

const ApartmentTable = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedApartment, setSelectedApartment] = useState<ISelectedApartment>(null);
    const [selectedRows, setSelectedRows] = useState<Array<IApartmentRow>>([]);
  
    const { state, dispatch } = useContext(ApartmentContext);;
  
    const handleApartmentFunctions = (type: ApartmentTableModalTypes, apartment = {} as IApartmentRow) => {
      setModalIsOpen(!modalIsOpen);
      setSelectedApartment({ type, apartment });
    };
  
    const getModalComponent = () => {
      const Components = {
        [ApartmentTableModalTypes.ADD]: CreateApartment,
        [ApartmentTableModalTypes.UPDATE]: UpdateApartment,
        [ApartmentTableModalTypes.DELETE]: DeleteApartment,
      };
      const Component = Components[selectedApartment.type];
      return (
        <Component
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          selectedApartment={selectedApartment.apartment}
        />
      );
    };
  
    const handleRowSelected = useCallback((state) => {
      const selectedRows = state?.selectedRows || [];
      setSelectedRows(selectedRows);
      console.log('rowselected', state);
    }, []);
  
    const handlePageChange = (page: number) => dispatch({ type: ApartmentActionTypes.UPDATE_PAGE_COUNT, page: page - 1 })
    const handlePerRowsChange = (perPageRows: number) => dispatch({ type: ApartmentActionTypes.UPDATE_PER_PAGE_ROWS, perPageRows})
  
    return (
        <View boxShadow="primary">
          <DataTable
            title={selectedRows.length ? 'Show Title' : ''}
            selectableRows
            responsive
            className="table"
            columns={[
              ...apartmentColumns,
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
                        handleApartmentFunctions(ApartmentTableModalTypes.UPDATE, row)
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
                        handleApartmentFunctions(ApartmentTableModalTypes.DELETE, row)
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
              <ApartmentTableHeader handleApartmentFunctions={handleApartmentFunctions} />
            }
            data={state.filter.key.length ? state.filter.result : state.apartments}
            pagination
            paginationServer
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationTotalRows={state.totalApartments}
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
          {selectedApartment ? getModalComponent() : null}
        </View>
    );
}

export default memo(ApartmentTable)