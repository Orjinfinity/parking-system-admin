import { TableColumn } from 'react-data-table-component';

interface ICarRow {
  id?: number;
  created_at?: string;
  plate: string;
  ownername: string;
  ownersurname: string;
  ownerphone: string;
  brand: string;
  model: string;
  color: string;
  isguest: boolean;
  flatId: number;
}

const carColumns: TableColumn<ICarRow>[] = [
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
    name: 'Plaka Numarası',
    selector: (row) => row.plate,
    sortable: true,
  },
  {
    name: 'Araç Sahibi Adı',
    selector: (row) => row.ownername,
    sortable: true,
  },
  {
    name: 'Araç Sahibi Soyadı',
    selector: (row) => row.ownersurname,
    sortable: true,
  },
  {
    name: 'Telefon Numarası',
    selector: (row) => row.ownerphone,
    sortable: true,
  },
  {
    name: 'Araç Markası',
    selector: (row) => row.brand,
    sortable: true,
  },
  {
    name: 'Araç Modeli',
    selector: (row) => row.model,
    sortable: true,
  },
  {
    name: 'Araç Rengi',
    selector: (row) => row.color,
    sortable: true,
  },
  {
    name: 'Misafir Araç',
    selector: (row) => row.isguest,
    sortable: true,
  },
  {
    name: 'Daire Numarası',
    selector: (row) => row.flatId,
    sortable: true,
  },
];

export { carColumns };
export type { ICarRow };
