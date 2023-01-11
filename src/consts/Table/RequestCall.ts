import { TableColumn } from 'react-data-table-component';

interface IRequestCallRow {
  id?: number;
  created_at?: string;
  isdone: boolean;
  description: string;
  userId: number;
  flatId: number;
}

const requestCallColumns: TableColumn<IRequestCallRow>[] = [
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
    name: 'Çağrı Durumu',
    selector: (row) => row.isdone,
    sortable: true,
  },
  {
    name: 'Açıklama',
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: 'Kullanıcı Id',
    selector: (row) => row.userId,
    sortable: true,
  },
  {
    name: 'Daire Id',
    selector: (row) => row.flatId,
    sortable: true,
  },
];

export { requestCallColumns };
export type { IRequestCallRow };
