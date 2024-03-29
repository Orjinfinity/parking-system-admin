import { TableColumn } from 'react-data-table-component';

interface IBlockRow {
  id?: number;
  created_at?: string;
  name: string;
  apartmentId: number;
}

const blockColumns: TableColumn<IBlockRow>[] = [
  {
    name: '# Numara',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'İşlem Tarihi',
    selector: (row) => row.created_at,
    sortable: true,
  },
  {
    name: 'Ad',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Apartman Id',
    selector: (row) => row.apartmentId,
    sortable: true,
  },
];

export { blockColumns };
export type { IBlockRow };
