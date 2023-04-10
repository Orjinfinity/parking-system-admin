import { TableColumn } from "react-data-table-component";

export function downloadCSV(array, columns: TableColumn<any>[]) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array, columns);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}

function convertArrayOfObjectsToCSV(array, columns: TableColumn<any>[]) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = columns.reduce((acc,column) => {
        return [...acc, column.name]    
    }, [])
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];

            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}