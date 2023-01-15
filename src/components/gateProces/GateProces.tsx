import React, { useCallback, useContext, useState } from 'react';
import { GateProcesActionTypes, GateProcesContext } from '../../contexts';
import { View, Button, Loader, EditIcon, DeleteIcon } from '..';
import {
  customTableStyles,
  gateProcesColumns,
  IGateProcesRow,
} from '../../consts';
import CreateGateProces from './CreateGateProces';
import DeleteGateProces from './DeleteGateProces';
import UpdateGateProces from './UpdateGateProces';
import DataTable from 'react-data-table-component';
import GateProcesHeader from './GateProcesHeader';

enum GateProcesTableModalTypes {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

interface ISelectedGateProces {
  type: GateProcesTableModalTypes;
  gateProces: IGateProcesRow;
}

const GateProces = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedGateProces, setSelectedGateProces] =
    useState<ISelectedGateProces>(null);
  const [selectedRows, setSelectedRows] = useState<Array<IGateProcesRow>>([]);

  const { state, dispatch } = useContext(GateProcesContext);

  const handleGateProcesFunctions = (
    type: GateProcesTableModalTypes,
    gateProces = {} as IGateProcesRow
  ) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedGateProces({ type, gateProces });
  };

  const getModalComponent = () => {
    const Components = {
      [GateProcesTableModalTypes.ADD]: CreateGateProces,
      [GateProcesTableModalTypes.UPDATE]: UpdateGateProces,
      [GateProcesTableModalTypes.DELETE]: DeleteGateProces,
    };
    const Component = Components[selectedGateProces.type];
    return (
      <Component
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedGateProces={selectedGateProces.gateProces}
      />
    );
  };

  const handleRowSelected = useCallback((state) => {
    const selectedRows = state?.selectedRows || [];
    setSelectedRows(selectedRows);
    console.log('rowselected', state);
  }, []);

  const handlePageChange = (page: number) =>
    dispatch({
      type: GateProcesActionTypes.UPDATE_PAGE_COUNT,
      page: page - 1,
    });
  const handlePerRowsChange = (perPageRows: number) =>
    dispatch({
      type: GateProcesActionTypes.UPDATE_PER_PAGE_ROWS,
      perPageRows,
    });
  return (
    <View boxShadow="primary">
      <DataTable
        title={selectedRows.length ? 'Show Title' : ''}
        selectableRows
        responsive
        className="table"
        columns={[
          ...gateProcesColumns,
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
                    handleGateProcesFunctions(
                      GateProcesTableModalTypes.UPDATE,
                      row
                    )
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
                    handleGateProcesFunctions(
                      GateProcesTableModalTypes.DELETE,
                      row
                    )
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
          <GateProcesHeader
            handleGateProcesFunctions={handleGateProcesFunctions}
          />
        }
        data={
          state.filter.key.length ? state.filter.result : state.gateProcesses
        }
        pagination
        paginationServer
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationTotalRows={state.totalGateProcesses}
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
      {selectedGateProces ? getModalComponent() : null}
    </View>
  );
};

export default GateProces;
