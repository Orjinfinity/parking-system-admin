import { TableColumn } from 'react-data-table-component';
import {useAppSelector } from '../../store/hooks';

interface IRequestCallRow {
  id?: number;
  created_at?: string;
  isdone: string;
  description: string;
  userId: number;
  flatId: number;
  flat?: {
    block: {
      name: string;

      apartment:{
         name:string;
      }
    };
    number:string;


};
}
// TableColumn<IRequestCallRow>[]
const requestCallColumns = (roles) => 

[
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
  roles.includes("ROLE_ADMIN") &&  {
    name: 'Daire No',
    selector: (row) => row.flat.number,
    sortable: true,
  },
  roles.includes("ROLE_ADMIN") &&  {
    name: 'Daire Blok',
    selector: (row) => row.flat.block.name,
    sortable: true,
  },
  roles.includes("ROLE_ADMIN") &&  {
    name: 'Site Bilgisi',
    selector: (row) => row.flat.block.apartment.name,
    sortable: true,
  },
];

export { requestCallColumns };
export type { IRequestCallRow };
