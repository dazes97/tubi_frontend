import Alert from "@material-ui/core/Alert";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BUTTON_NAME } from "helpers";
interface DeleteProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
export const PackageDelete = (props: DeleteProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const submitDeleteConfirmation = () => {
    onSendDataToServer(data);
    onReset();
  };
  return (
    <div>
      <Dialog
        open={openModal}
        onClose={onReset}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Eliminar Sucursal</DialogTitle>
        <DialogContent>
          <Alert severity="error">
            <p>
              ¿Esta Seguro que desea eliminar la sucursal
              <strong> {data.name}</strong>?
            </p>
            <ul>
              <li>
                Todos los servicios y paquetes dejaran de estar vinculados a
                esta sucursal
              </li>
              <li>
                Las personas asignadas a esta sucursal no podran iniciar sesion
                hasta que se le asigne una
              </li>
            </ul>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={() => onReset()}>
            {BUTTON_NAME.CANCEL}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => submitDeleteConfirmation()}
          >
            {BUTTON_NAME.DELETE}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default PackageDelete;
