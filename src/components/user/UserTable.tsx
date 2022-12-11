import { memo, useCallback, useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  customUserTableStyles,
  DummyUsers,
  IUserRow,
  userColumns,
} from '../../consts';
import UserTableHeader from './UserTableHeader';
import DeleteIcon from '../icons/DeleteIcon';
import { getUsers } from '../../services';
import EditIcon from '../icons/EditIcon';
import Button from '../button/Button';
import Loader from '../loader/Loader';
import View from '../view/View';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

enum UserTableModalTypes {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

type ModalType = 'add' | 'update' | 'delete';

interface ISelectedUser {
  type: ModalType;
  user: IUserRow;
}

const UserTable = () => {
  const [users, setUsers] = useState<Array<IUserRow>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageCount] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<ISelectedUser>(null);
  const [selectedRows, setSelectedRows] = useState<Array<IUserRow>>([]);

  const dataFetchRef = useRef<boolean>(true);

  const handleUserFunctions = (type: ModalType, user = {} as IUserRow) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedUser({ type, user });
    console.log(type, user);
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

  const handleRowSelected = useCallback((state) => {
    const selectedRows = state?.selectedRows || [];
    setSelectedRows(selectedRows);
    console.log('rowselected', state);
  }, []);

  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
      const fetchUsers = async () => {
        const response = await getUsers(pageCount);
        const users: IUserRow[] = await response.data.resultData;
        const updatedUsers = users.map((user) => ({
          ...user,
          created_at: new Date(user.created_at).toLocaleString(),
        }));
        setUsers(updatedUsers);
        setLoading(false);
      };
      fetchUsers().catch((_) => setLoading(false));
    }
  }, [pageCount]);

  return (
    <View boxShadow="primary">
      <DataTable
        title={selectedRows.length ? 'Show Title' : ''}
        selectableRows
        responsive
        className="table"
        // fixedHeader
        // fixedHeaderScrollHeight="300px"
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
        data={users}
        pagination
        customStyles={customUserTableStyles}
        progressPending={loading}
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
      {selectedUser ? getModalComponent() : null}
    </View>
  );
};

export default memo(UserTable);
