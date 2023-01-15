import { TableColumn } from 'react-data-table-component';

interface IGateProcesRow {
  id: number;
  created_at: string;
  isdone: boolean;
  processimageurl: string;
  doorId: number;
}

const gateProcesColumns: TableColumn<IGateProcesRow>[] = [
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
    name: 'Kapı Durumu',
    selector: (row) => row.isdone,
    sortable: true,
  },
  {
    name: 'Giriş veya Çıkış Görseli',
    selector: (row) => row.processimageurl,
    sortable: true,
  },
  {
    name: 'Kapı Id',
    selector: (row) => row.doorId,
    sortable: true,
  }
];

export { gateProcesColumns };
export type { IGateProcesRow };
