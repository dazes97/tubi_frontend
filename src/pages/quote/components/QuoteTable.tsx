import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Receipt from "@mui/icons-material/Receipt";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { DateTime } from "luxon";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CRUD_CODE, REQUEST_CODE } from "helpers";
interface EditDeleteProps {
  onChangeOperation: any;
  onChangeOpenModal: any;
  onChangeData: any;
  data: any;
}
const QuoteTable = (props: EditDeleteProps) => {
  const { onChangeOperation, onChangeOpenModal, onChangeData, data } = props;

  const handleOperation = (operation: any, data: any) => {
    onChangeData(data);
    onChangeOperation(operation);
    onChangeOpenModal();
  };
  const findStatus = (row: any) => {
    switch (row.quoteStatus) {
      case REQUEST_CODE.RECEIVED.CODE.toString():
        return REQUEST_CODE.RECEIVED.NAME;
      case REQUEST_CODE.ACCEPTED.CODE.toString():
        return REQUEST_CODE.ACCEPTED.NAME;
      case REQUEST_CODE.DENIED.CODE.toString():
        return REQUEST_CODE.DENIED.NAME;
      case REQUEST_CODE.DELIVERED.CODE.toString():
        return REQUEST_CODE.DELIVERED.NAME;
      case REQUEST_CODE.FINISHED.CODE.toString():
        return REQUEST_CODE.FINISHED.NAME;
      case REQUEST_CODE.PROCESS.CODE.toString():
        return REQUEST_CODE.PROCESS.NAME;
      default:
        return "Sin Definir";
    }
  };
  const chipToClick = (row: any) => {
    switch (row.requestStatus) {
      case REQUEST_CODE.DENIED.CODE.toString():
        return <Chip label={findStatus(row)} />;
      case REQUEST_CODE.DELIVERED.CODE.toString():
        return <Chip label={findStatus(row)} />;
      default:
        return (
          <Chip
            label={findStatus(row)}
            clickable={true}
            onClick={() => handleOperation(CRUD_CODE.EXTRA_1, row)}
          />
        );
    }
  };
  const columns: GridColDef[] = [
    {
      field: "quoteCreatedAt",
      headerName: "Fecha y Hora",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 70,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2">
            {DateTime.fromISO(row.quoteCreatedAt).toLocaleString(
              DateTime.DATETIME_SHORT
            )}
          </Typography>
        );
      },
    },
    {
      field: "clientName",
      headerName: "Cliente",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 100,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2">
            {row.clientName + " " + row.clientLastName}
          </Typography>
        );
      },
    },
    {
      field: "quoteType",
      headerName: "Tipo",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 70,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2">
            {row.quoteType === "0" ? "Producto" : "Servicio"}
          </Typography>
        );
      },
    },
    {
      field: "quoteStatus",
      headerName: "Estado",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 70,
      align: "center",
      renderCell: ({ row }) => {
        return <Tooltip title="Cambiar Estado">{chipToClick(row)}</Tooltip>;
      },
    },
    {
      field: "action",
      flex: 0.2,
      minWidth: 70,
      headerName: "Acciones",
      headerAlign: "center",
      sortable: false,
      resizable: false,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title="Ver Detalles">
              <IconButton
                aria-label="Ver Detalle"
                size="large"
                onClick={() => handleOperation(CRUD_CODE.EXTRA_2, row)}
              >
                <Receipt fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver Seguimiento">
              <IconButton
                aria-label="Ver Seguimiento"
                size="large"
                onClick={() => handleOperation(CRUD_CODE.EXTRA_3, row)}
              >
                <RemoveRedEyeIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];
  return (
    <DataGrid
      rows={data}
      columns={columns}
      pageSize={25}
      autoHeight={true}
      autoPageSize={true}
      disableSelectionOnClick={true}
    />
  );
};
export default QuoteTable;
