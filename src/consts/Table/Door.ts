import { TableColumn } from 'react-data-table-component';

interface IDoorRow {
  id?: number;
  created_at?: string;
  name: string;
  type: number;
  camiplink: string;
  apartmentId: number;
}

const doorColumns: TableColumn<IDoorRow>[] = [
  {
    name: '# Id',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Created At',
    selector: (row) => row.created_at,
    sortable: true,
  },
  {
    name: 'Giriş Kapısı',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Kapı Tipi',
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: 'Kapı Ip Link',
    selector: (row) => row.camiplink,
    sortable: true,
  },
  {
    name: 'Site Id',
    selector: (row) => row.apartmentId,
    sortable: true,
  },
];

export { doorColumns };
export type { IDoorRow };
