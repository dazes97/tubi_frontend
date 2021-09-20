import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Receipt from "@material-ui/icons/Receipt";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";

import { DateTime } from "luxon";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { CRUD_CODE, REQUEST_CODE } from "helpers";
interface EditDeleteProps {
  onChangeOperation: any;
  onChangeOpenModal: any;
  onChangeData: any;
  data: any;
}

const RequestTable = (props: EditDeleteProps) => {
  const { onChangeOperation, onChangeOpenModal, onChangeData, data } = props;

  const handleOperation = (operation: any, data: any) => {
    onChangeData(data);
    onChangeOperation(operation);
    onChangeOpenModal();
  };
  const findStatus = (row: any) => {
    switch (row.requestStatus) {
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

  const columns: GridColDef[] = [
    {
      field: "requestCreatedAt",
      headerName: "Fecha y Hora",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 70,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2">
            {DateTime.fromISO(row.requestDeliveryDateTime).toLocaleString(
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
      field: "requestTotal",
      headerName: "Total (Bs.)",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 70,
      align: "center",
      renderCell: ({ row }) => {
        return <Typography variant="body2">{row.requestTotal}</Typography>;
      },
    },
    {
      field: "requestStatus",
      headerName: "Estado",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 70,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Tooltip title="Cambiar Estado">
            <Chip
              label={findStatus(row)}
              clickable={true}
              onClick={() => handleOperation(CRUD_CODE.EXTRA_1, row)}
            />
          </Tooltip>
        );
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
export default RequestTable;
