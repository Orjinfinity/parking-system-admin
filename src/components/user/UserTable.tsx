import { memo, useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { customTableStyles, IUserRow, userColumns } from '../../consts';
import { View, Button, Loader, EditIcon, DeleteIcon } from '..';
import { UserActionTypes, UserContext } from '../../contexts';
import UserTableHeader from './UserTableHeader';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

enum UserTableModalTypes {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

interface ISelectedUser {
  type: UserTableModalTypes;
  user: IUserRow;
}

const UserTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<ISelectedUser>(null);
  // const [selectedRows, setSelectedRows] = useState<Array<IUserRow>>([]);

  const { state, dispatch } = useContext(UserContext);

  const handleUserFunctions = (
    type: UserTableModalTypes,
    user = {} as IUserRow
  ) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedUser({ type, user });
  };

  const getModalComponent = () => {
    const Components = {
      [UserTableModalTypes.ADD]: CreateUser,
      [UserTableModalTypes.UPDATE]: UpdateUser,
      [UserTableModalTypes.DELETE]: DeleteUser,
    };
    const Component = Components[selectedUser.type];
    return (
      <Component
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedUser={selectedUser.user}
      />
    );
  };

  // const handleRowSelected = useCallback((state) => {
  //   const selectedRows = state?.selectedRows || [];
  //   setSelectedRows(selectedRows);
  //   console.log('rowselected', state);
  // }, []);

  const handlePageChange = (page: number) =>
    dispatch({ type: UserActionTypes.UPDATE_PAGE_COUNT, page: page - 1 });
  const handlePerRowsChange = (perPageRows: number) =>
    dispatch({ type: UserActionTypes.UPDATE_PER_PAGE_ROWS, perPageRows });

  return (
    <View boxShadow="primary">
      <DataTable
        title={''}
        selectableRows
        responsive
        className="table"
        columns={[
          ...userColumns,
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
                    handleUserFunctions(UserTableModalTypes.UPDATE, row)
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
                    handleUserFunctions(UserTableModalTypes.DELETE, row)
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
          <UserTableHeader handleUserFunctions={handleUserFunctions} />
        }
        data={state.filter.key.length ? state.filter.result : state.users}
        pagination
        paginationServer
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationTotalRows={state.totalUsers}
        customStyles={customTableStyles}
        progressPending={state.loading}
        progressComponent={
          <View mb="20px">
            <Loader position="relative" />
          </View>
        }
        // onSelectedRowsChange={handleRowSelected}
      />
      {selectedUser ? getModalComponent() : null}
    </View>
  );
};

export default memo(UserTable);
