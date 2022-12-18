import { TableStyles } from "react-data-table-component";
import colors from "../../theme/colors";

const customTableStyles: TableStyles = {
    table: {
      style: {
        fontFamily: "Inter, sans-serif",
      }
    },
    tableWrapper: {
      style: {
        borderRadius: '6px',
      }
    },
    head: {
      style: {
        fontWeight: "600",
        fontSize: "12px",
        textTransform: "uppercase",
        color: colors.textColor,
      }
    },
    header: {
      style: {
      }
    },
    subHeader: {
      style: {
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px'
      }
    },
    headRow: {
      style: {
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        backgroundColor: '#F9FAFC'
      }
    },
    pagination: {
      style: {
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px'
      }
    },
    rows: {
      style: {
        color: colors.textSecondaryColor
      },
    },
    headCells: {
      style: {
  
      },
    },
    cells: {
      style: {
        height: '54px'
      },
    },
};

export { customTableStyles }