import { TableColumn } from 'react-data-table-component';

interface IGateProcesRow {
  id: number;
  created_at: string;
  isdone: string;
  processimageurl: string;
  carId: number;
  doorId: number;
}

const gateProcesColumns: TableColumn<IGateProcesRow>[] = [
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
    name: 'Kapı Durumu',
    selector: (row) => row.isdone,
    sortable: true,
  },
  {
    name: 'Araç Id',
    selector: (row) => row.carId,
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
