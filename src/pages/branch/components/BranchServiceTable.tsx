import DeleteIcon from "@material-ui/icons/Delete";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
interface EditDeleteProps {
  onChangeServiceStatus: any;
  onChangeData: any;
  data: any;
}
const BranchServiceTable = (props: EditDeleteProps) => {
  const { onChangeServiceStatus, onChangeData, data } = props;
  const handleOperation = (data: any) => {
    onChangeData(data);
  };
  const renderStatus = (element: any) => {
    return element.status === "1" ? (
      <Tooltip title="Deshabilitar">
        <IconButton
          aria-label="change"
          size="large"
          onClick={() => onChangeServiceStatus(element, "0")}
        >
          <LockOpenIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Habilitar">
        <IconButton
          aria-label="change"
          size="large"
          onClick={() => onChangeServiceStatus(element, "1")}
        >
          <LockIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    );
  };
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "center",
      flex: 0.4,
      minWidth: 100,
      align: "center",
    },
    {
      field: "price",
      headerName: "Precio",
      headerAlign: "center",
      flex: 0.3,
      minWidth: 100,
      align: "center",
    },
    {
      field: "action",
      flex: 0.3,
      minWidth: 70,
      headerName: "Acciones",
      headerAlign: "center",
      sortable: false,
      resizable: false,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <div>
            <Tooltip title="Eliminar">
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => handleOperation(row)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            {row.status && renderStatus(row)}
          </div>
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
export default BranchServiceTable;
