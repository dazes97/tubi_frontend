import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BUTTON_NAME } from "helpers";
interface DeleteProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
export const QuoteDelete = (props: DeleteProps) => {
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
        <DialogTitle>Eliminar Solicitud</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Esta Seguro que desea eliminar la empresa
            <strong> "{data.name}" </strong>?
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
export default QuoteDelete;
