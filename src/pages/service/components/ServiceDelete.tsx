import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/core/Alert";
import { BUTTON_NAME } from "helpers";
interface DeleteProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
export const ServiceDelete = (props: DeleteProps) => {
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
        <DialogTitle>Eliminar Servicio</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="error">
              Es posible que este servicio se encuentre en algun paquete de
              servicio aun disponible ¿Esta Seguro que desea eliminar el
              servicio
              <strong> {data.name}</strong>?
            </Alert>
          </DialogContentText>
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
export default ServiceDelete;
