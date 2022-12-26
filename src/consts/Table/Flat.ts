import { TableColumn } from "react-data-table-component";

interface IFlatRow {
    id?: number;
    created_at?: string;
    number: number;
    floor: number;
    block: string;
    blockId: number;
}

const flatColumns: TableColumn<IFlatRow>[] = [
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
        name: 'Daire Numarası',
        selector: (row) => row.number,
        sortable: true,
    },
    {
        name: 'Araba Sayısı',
        selector: (row) => row.floor,
        sortable: true,
    },
    {
        name: 'Blok',
        selector: (row) => row.block,
        sortable: true,
    },
    {
        name: 'Blok Id',
        selector: (row) => row.blockId,
        sortable: true,
    },
];

export { flatColumns };
export type { IFlatRow }