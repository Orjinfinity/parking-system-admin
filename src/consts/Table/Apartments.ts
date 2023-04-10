import { TableColumn } from 'react-data-table-component';

interface IApartmentRow {
  id?: number;
  created_at?: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

interface ICountryOption {
  label: string;
  value: string;
}

const Countrys: Array<ICountryOption> = [
  {
    label: 'Turkey',
    value: 'Turkey',
  },
  {
    label: 'America',
    value: 'America',
  },
];

const apartmentColumns: TableColumn<IApartmentRow>[] = [
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
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Address',
    selector: (row) => row.address,
    sortable: true,
  },
  {
    name: 'City',
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: 'Country',
    selector: (row) => row.country,
    sortable: true,
  },
];

export { apartmentColumns, Countrys };
export type { IApartmentRow };
