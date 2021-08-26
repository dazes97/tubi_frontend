import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { CRUD_CODE, BUTTON_NAME } from "helpers";
import Chip from "@material-ui/core/Chip";
interface EditDeleteProps {
  onChangeOperation: any;
  onChangeOpenModal: any;
  onChangeData: any;
  data: any;
}
const PackageTable = (props: EditDeleteProps) => {
  const { onChangeOperation, onChangeOpenModal, onChangeData, data } = props;
  const handleOperation = (operation: any, data: any) => {
    onChangeData(data);
    onChangeOperation(operation);
    onChangeOpenModal();
  };
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "center",
      flex: 0.3,
      minWidth: 100,
      align: "center",
    },
    {
      field: "price",
      headerName: "Precio",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 70,
      align: "center",
    },
    {
      field: "status",
      headerName: "Estado",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 70,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Chip
            label={row.status === "1" ? "Activo" : "No Activo"}
            color={row.status === "1" ? "success" : "error"}
            variant="filled"
          />
        );
      },
    },
    {
      field: "action",
      flex: 0.3,
      minWidth: 250,
      headerName: "Acciones",
      headerAlign: "center",
      sortable: false,
      resizable: false,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <div>
            <Button
              style={{ margin: 8 }}
              variant="contained"
              color="info"
              startIcon={<EditIcon />}
              onClick={() => {
                handleOperation(CRUD_CODE.UPDATE, row);
              }}
            >
              {BUTTON_NAME.EDIT}
            </Button>
            <Button
              style={{ margin: 8 }}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => {
                handleOperation(CRUD_CODE.DELETE, row);
              }}
            >
              {BUTTON_NAME.DELETE}
            </Button>
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
export default PackageTable;
