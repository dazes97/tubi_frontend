import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
interface EditDeleteProps {
  data: any;
}
const BranchPersonalTable = (props: EditDeleteProps) => {
  const { data } = props;
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "center",
      flex: 0.3,
      minWidth: 150,
      align: "center",
      renderCell: ({ row }) => {
        return <Typography variant="body2">{row.name ?? ""}</Typography>;
      },
    },
    {
      field: "lastName",
      headerName: "Apellido",
      headerAlign: "center",
      flex: 0.3,
      minWidth: 250,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2">{row.lastName ?? ""}</Typography>
        );
      },
    },
    {
      field: "dni",
      headerName: "DNI",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 70,
      align: "center",
      renderCell: ({ row }) => {
        return <Typography variant="body2">{row.dni ?? ""}</Typography>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      flex: 0.2,
      minWidth: 150,
      align: "center",
      renderCell: ({ row }) => {
        return <Typography variant="body2">{row.email ?? ""}</Typography>;
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
export default BranchPersonalTable;
