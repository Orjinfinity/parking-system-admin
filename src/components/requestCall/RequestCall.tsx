import React, { useCallback, useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { RequestCallActionTypes, RequestCallContext } from '../../contexts';
import { View, Button, Loader, EditIcon, DeleteIcon } from '..';
import { useAppSelector } from '../../store/hooks';
import CreateRequestCall from './CreateRequestCall';
import DeleteRequestCall from './DeleteRequestCall';
import UpdateRequestCall from './UpdateRequestCall';
import {
  customTableStyles,
  IRequestCallRow,
  requestCallColumns,
} from '../../consts';
import RequestCallHeader from './RequestCallHeader';

enum RequestCallTableModalTypes {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

interface ISelectedRequestCall {
  type: RequestCallTableModalTypes;
  block: IRequestCallRow;
}

const RequestCall = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedRequestCall, setSelectedRequestCall] =
    useState<ISelectedRequestCall>(null);
  const [selectedRows, setSelectedRows] = useState<Array<IRequestCallRow>>([]);

  const { state, dispatch } = useContext(RequestCallContext);
  
  const handleRequestCallFunctions = (
    type: RequestCallTableModalTypes,
    block = {} as IRequestCallRow
  ) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedRequestCall({ type, block });
  };

  const getModalComponent = () => {
    const Components = {
      [RequestCallTableModalTypes.ADD]: CreateRequestCall,
      [RequestCallTableModalTypes.UPDATE]: UpdateRequestCall,
      [RequestCallTableModalTypes.DELETE]: DeleteRequestCall,
    };
    const Component = Components[selectedRequestCall.type];
    return (
      <Component
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedRequestCall={selectedRequestCall.block}
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
      type: RequestCallActionTypes.UPDATE_PAGE_COUNT,
      page: page - 1,
    });
  const handlePerRowsChange = (perPageRows: number) =>
    dispatch({
      type: RequestCallActionTypes.UPDATE_PER_PAGE_ROWS,
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
          ...requestCallColumns(user.roles),
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
                    handleRequestCallFunctions(
                      RequestCallTableModalTypes.UPDATE,
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
                    handleRequestCallFunctions(
                      RequestCallTableModalTypes.DELETE,
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
          <RequestCallHeader
            handleRequestCallFunctions={handleRequestCallFunctions}
          />
        }
        data={
          state.filter.key.length ? state.filter.result : state.requestCalls
        }
        pagination
        paginationServer
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationTotalRows={state.totalRequestCalls}
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
      {selectedRequestCall ? getModalComponent() : null}
    </View>
  );
};

export default RequestCall;
