import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import {
  Title,
  View,
  Text,
  Role,
  Button,
  UserTableHeader,
  EditIcon,
  DeleteIcon,
} from '../components';
import {
  customUserTableStyles,
  IUserRow,
  roles,
  userColumns,
  userRows,
} from '../consts';

const CardContainer = styled(View)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 48px;

  @media screen and (max-width: 1700px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  }
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 24px;
  }
`;

const Dashboard = () => {
  const handleUpdateUser = (user: IUserRow) => {
    console.log('update', user);
  };
  const handleDeleteUser = (user: IUserRow) => {
    console.log('delete', user);
  };

  const handleRowSelected = React.useCallback((state: any) => {
    console.log('rowselected', state);
    // setSelectedRows(state.selectedRows);
  }, []);

  return (
    <View>
      <Title
        mb="6px"
        color="textColor"
        fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}
      >
        Role Listesi
      </Title>
      <Text
        fontSize="small"
        color="textSecondaryColor"
        mb={['12px', '16px', '16px', '24px']}
      >
        A role provided access to predefined menus and features so that
        depending on assigned role an administrator can have access to what he
        need.
      </Text>
      <CardContainer>
        {roles.map((roleProps, index) => (
          <Role key={index} {...roleProps} />
        ))}
        <Role />
      </CardContainer>
      <View mt="40px">
        <Title
          mb="6px"
          color="textColor"
          fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}
        >
          Kullanıcı Listesi
        </Title>
        <Text
          fontSize="small"
          color="textSecondaryColor"
          mb={['12px', '16px', '16px', '24px']}
        >
          Find all of your company’s administrator accounts and their associate
          roles.
        </Text>
        <View boxShadow="primary">
          <DataTable
            // title="Kullanıcı Listesi"
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
                      size="sm"
                      onClick={() => handleUpdateUser(row)}
                    >
                      <EditIcon size="20px" color="success" />
                    </Button>
                    <Button
                      fontSize="small"
                      padding="8px"
                      letterSpacing=".46px"
                      variant="icon"
                      size="sm"
                      onClick={() => handleDeleteUser(row)}
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
            subHeaderComponent={<UserTableHeader />}
            data={userRows}
            pagination
            customStyles={customUserTableStyles}
            contextActions={
              <Button
              fontSize="small"
              padding="8px"
              letterSpacing=".46px"
              variant="icon"
              size="sm"
            >
              <DeleteIcon size="20px" color="error" />
            </Button>
            }
            onSelectedRowsChange={handleRowSelected}
          />
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
