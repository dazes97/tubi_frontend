import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import AutoAwesomeMotionIcon from "@material-ui/icons/AutoAwesomeMotion";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { CRUD_CODE } from "helpers";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
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
      field: "address",
      headerName: "Direccion",
      headerAlign: "center",
      flex: 0.4,
      minWidth: 70,
      align: "center",
    },
    {
      field: "status",
      headerName: "Estado",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 100,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Chip
            label={row.status === "1" ? "Abierto" : "Cerrado"}
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
            <Tooltip title="Editar Servicios">
              <IconButton
                aria-label="Editar Servicios"
                size="large"
                onClick={() => {
                  handleOperation(CRUD_CODE.EXTRA_1, row);
                }}
              >
                <DirectionsBikeIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar Paquetes">
              <IconButton
                aria-label="Editar Paquetes"
                size="large"
                onClick={() => {
                  handleOperation(CRUD_CODE.EXTRA_2, row);
                }}
              >
                <AutoAwesomeMotionIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver Personal">
              <IconButton
                aria-label="Ver Personal"
                size="large"
                onClick={() => {
                  handleOperation(CRUD_CODE.EXTRA_3, row);
                }}
              >
                <AccessibilityIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar Sucursal">
              <IconButton
                aria-label="editar"
                size="large"
                onClick={() => {
                  handleOperation(CRUD_CODE.UPDATE, row);
                }}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar Sucursal">
              <IconButton
                aria-label="eliminar"
                size="large"
                onClick={() => {
                  handleOperation(CRUD_CODE.DELETE, row);
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
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
