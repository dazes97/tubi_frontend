import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { CRUD_CODE } from "../../../helpers/";
interface EditDeleteProps {
  onChangeOperation: any;
  onChangeOpenModal: any;
  onChangeData: any;
  data: any;
}
const PersonalTypeTable = (props: EditDeleteProps) => {
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
      flex: 0.5,
      minWidth: 300,
      align: "center",
    },
    {
      field: "action",
      flex: 0.5,
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
              {"EDITAR"}
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
              {"ELIMINAR"}
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
export default PersonalTypeTable;
