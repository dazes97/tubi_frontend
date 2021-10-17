import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
interface EditDeleteProps {
  onChangeData: any;
  data: any;
}
const RequestServiceTable = (props: EditDeleteProps) => {
  const { onChangeData, data } = props;
  const handleOperation = (data: any) => {
    onChangeData(data);
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
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleOperation(row)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
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
export default RequestServiceTable;
