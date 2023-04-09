import { TableColumn } from 'react-data-table-component';

// Brand need to be send it with user.
interface IUserRow {
  [x: string]: any;
  id?: number;
  created_at?: string;
  username: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  roles: any;
  flatId?: any;
  flats?: any[];
  password?: string;
}

export const DummyUsers: IUserRow[] = [
  {
    id: 1,
    created_at: '02.12.2022',
    username: 'syhnserkan',
    name: 'Serkan',
    surname: 'Sayhan',
    phone: '5317092908',
    email: 'syhnserkan@gmail.com',
    roles: 'user'
  },
  {
    id: 2,
    created_at: '08.12.2022',
    username: 'superadmin',
    name: 'Kasım',
    surname: 'Atar',
    phone: '5357229081',
    email: 'superadmin@gmail.com',
    roles: 'user'
  },
];

const userColumns: TableColumn<IUserRow>[] = [
  {
    name: '# Id',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'İşlem Tarihi',
    selector: (row) => row.created_at,
    sortable: true,
  },
  {
    name: 'Username',
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Surname',
    selector: (row) => row.surname,
    sortable: true,
  },
  {
    name: 'Phone',
    selector: (row) => row.phone,
  },
  {
    name: 'Role',
    selector: (row) => row.roles,
  },
  {
    name: 'Daire',
    selector: (row) => row?.flatId?.name,
  },
  {
    name: 'Email',
    selector: (row) => row.email,
    sortable: true,
  },
];

const userRows = [
  {
    username: 'syhnserkan',
    name: 'Serkan',
    surname: 'Sayhan',
    phone: '5317092906',
    brand: 'A Sitesi',
    email: 'syhnserkan@gmail.com',
  },
  {
    username: 'syhnserkan',
    name: 'Mehmet',
    surname: 'Sayhan',
    phone: '5317092906',
    brand: 'B Sitesi',
    email: 'syhnserkan@gmail.com',
  },
  {
    username: 'syhnserkan',
    name: 'Ahmet',
    surname: 'Sayhan',
    phone: '5317092906',
    brand: 'C Sitesi',
    email: 'syhnserkan@gmail.com',
  },
  {
    username: 'syhnserkan',
    name: 'Kadir',
    surname: 'Sayhan',
    phone: '5317092906',
    brand: 'D Sitesi',
    email: 'syhnserkan@gmail.com',
  },
  {
    username: 'syhnserkan',
    name: 'Mustafa',
    surname: 'Sayhan',
    phone: '5317092906',
    brand: 'A Sitesi',
    email: 'syhnserkan@gmail.com',
  },
  {
    username: 'syhnserkan',
    name: 'Cem',
    surname: 'Özen',
    phone: '5317092906',
    brand: 'F Sitesi',
    email: 'syhnserkan@gmail.com',
  },
];

export { userColumns, userRows };
export type { IUserRow };
