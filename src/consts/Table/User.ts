import { TableColumn, TableStyles } from "react-data-table-component";
import colors from "../../theme/colors";

// Brand need to be send it with user. 
interface IUserRow {
  id?: number;
  created_at?: string;
  username: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  password?: string;
}

export const DummyUsers: IUserRow[] = [
  {
    id: 1,
    created_at: "02.12.2022",
    username: "syhnserkan",
    name: "Serkan",
    surname: "Sayhan",
    phone: "5317092908",
    email: "syhnserkan@gmail.com"
  },
  {
    id: 2,
    created_at: "08.12.2022",
    username: "superadmin",
    name: "Kasım",
    surname: "Atar",
    phone: "5357229081",
    email: "superadmin@gmail.com"
  }
]

const userColumns: TableColumn<IUserRow>[] = [
  {
    name: '# Id',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Created At',
    selector: row => row.created_at,
    sortable: true,
  },
  {
    name: 'Username',
    selector: row => row.username,
    sortable: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Surname',
    selector: row => row.surname,
    sortable: true,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
  },
  // {
  //     name: 'Brand',
  //     selector: row => row.brand,
  //     sortable: true,
  // },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
];

const userRows = [
  {
    username: "syhnserkan",
    name: "Serkan",
    surname: "Sayhan",
    phone: "5317092906",
    brand: "A Sitesi",
    email: "syhnserkan@gmail.com"
  },
  {
    username: "syhnserkan",
    name: "Mehmet",
    surname: "Sayhan",
    phone: "5317092906",
    brand: "B Sitesi",
    email: "syhnserkan@gmail.com"
  },
  {
    username: "syhnserkan",
    name: "Ahmet",
    surname: "Sayhan",
    phone: "5317092906",
    brand: "C Sitesi",
    email: "syhnserkan@gmail.com"
  },
  {
    username: "syhnserkan",
    name: "Kadir",
    surname: "Sayhan",
    phone: "5317092906",
    brand: "D Sitesi",
    email: "syhnserkan@gmail.com"
  },
  {
    username: "syhnserkan",
    name: "Mustafa",
    surname: "Sayhan",
    phone: "5317092906",
    brand: "A Sitesi",
    email: "syhnserkan@gmail.com"
  },
  {
    username: "syhnserkan",
    name: "Cem",
    surname: "Özen",
    phone: "5317092906",
    brand: "F Sitesi",
    email: "syhnserkan@gmail.com"
  }
]

const customUserTableStyles: TableStyles = {
  table: {
    style: {
      fontFamily: "Inter, sans-serif",
    }
  },
  tableWrapper: {
    style: {
      borderRadius: '6px',
    }
  },
  head: {
    style: {
      fontWeight: "600",
      fontSize: "12px",
      textTransform: "uppercase",
      color: colors.textColor,
    }
  },
  header: {
    style: {
      // borderTopLeftRadius: '6px',
      // borderTopRightRadius: '6px'
    }
  },
  subHeader: {
    style: {
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px'
    }
  },
  headRow: {
    style: {
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px',
      backgroundColor: '#F9FAFC'
    }
  },
  pagination: {
    style: {
      borderBottomLeftRadius: '6px',
      borderBottomRightRadius: '6px'
    }
  },
  rows: {
    style: {
      color: colors.textSecondaryColor
    },
  },
  headCells: {
    style: {

    },
  },
  cells: {
    style: {
      height: '54px'
    },
  },
};

export { userColumns, userRows, customUserTableStyles };
export type { IUserRow };
