import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { CRUD_CODE, BUTTON_NAME } from "helpers";
interface EditDeleteProps {
  onChangeOperation: any;
  onChangeOpenModal: any;
  onChangeData: any;
  data: any;
}
const CompanyOwnerTable = (props: EditDeleteProps) => {
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
      minWidth: 250,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2">
            {row.user?.name + " " + row.user.lastName}
          </Typography>
        );
      },
    },
    {
      field: "dni",
      headerName: "Identificacion",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 100,
      align: "center",
    },
    {
      field: "companyName",
      headerName: "Empresa",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 100,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2">
            {row.company?.name ?? "Sin datos"}
          </Typography>
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
export default CompanyOwnerTable;
