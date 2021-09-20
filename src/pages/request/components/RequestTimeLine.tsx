import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Receipt from "@material-ui/icons/Receipt";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import BuildIcon from "@material-ui/icons/Build";
import HelpIcon from "@material-ui/icons/Help";
import DeliveryDiningIcon from "@material-ui/icons/DeliveryDining";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { BUTTON_NAME, REQUEST_CODE } from "helpers";
import { DateTime } from "luxon";
interface RequestDetailInterface {
  data: any;
  openModal: boolean;
  onReset: any;
}
const RequestTimeLine = (props: RequestDetailInterface) => {
  const { data, openModal, onReset } = props;

  const resetDefaultValuesForm = () => {
    closeForm();
  };

  const closeForm = () => {
    onReset();
  };
  const findStatus = (item: any) => {
    switch (item.status) {
      case REQUEST_CODE.RECEIVED.CODE.toString():
        return REQUEST_CODE.RECEIVED.NAME;
      case REQUEST_CODE.ACCEPTED.CODE.toString():
        return REQUEST_CODE.ACCEPTED.NAME;
      case REQUEST_CODE.DENIED.CODE.toString():
        return REQUEST_CODE.DENIED.NAME;
      case REQUEST_CODE.DELIVERED.CODE.toString():
        return REQUEST_CODE.DELIVERED.NAME;
      case REQUEST_CODE.FINISHED.CODE.toString():
        return REQUEST_CODE.FINISHED.NAME;
      case REQUEST_CODE.PROCESS.CODE.toString():
        return REQUEST_CODE.PROCESS.NAME;
      default:
        return "Sin Definir";
    }
  };
  const findIcon = (item: any) => {
    switch (item.status) {
      case REQUEST_CODE.RECEIVED.CODE.toString():
        return <Receipt />;
      case REQUEST_CODE.ACCEPTED.CODE.toString():
        return <CheckIcon />;
      case REQUEST_CODE.DENIED.CODE.toString():
        return <CancelIcon />;
      case REQUEST_CODE.DELIVERED.CODE.toString():
        return <DeliveryDiningIcon />;
      case REQUEST_CODE.FINISHED.CODE.toString():
        return <AssignmentTurnedInIcon />;
      case REQUEST_CODE.PROCESS.CODE.toString():
        return <BuildIcon />;
      default:
        return <HelpIcon />;
    }
  };

  return (
    <Dialog
      open={openModal}
      onClose={resetDefaultValuesForm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <strong>Seguimiento</strong>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Datos Solicitud:</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Codigo: </strong>
              {data.requestCode ?? "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Fecha y hora: </strong>
              {data.requestDeliveryDateTime
                ? DateTime.fromISO(data.requestDeliveryDateTime).toLocaleString(
                    DateTime.DATETIME_SHORT
                  )
                : "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Total: </strong>
              {data.requestTotal ? "Bs. " + data.requestTotal : "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Linea de Tiempo:</Typography>
          </Grid>
          {data.statuses[0] && data.statuses[0].length > 0 && (
            <Grid item xs={12} md={12}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {data.statuses?.[0]?.map((e: any, k: any) => {
                  return (
                    <ListItem key={k}>
                      <ListItemAvatar>
                        <Avatar>{findIcon(e)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${findStatus(e)}`}
                        secondary={`${
                          e.createdAt
                            ? DateTime.fromISO(e.createdAt).toLocaleString(
                                DateTime.DATETIME_SHORT
                              )
                            : "Sin Fecha"
                        }`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => resetDefaultValuesForm()}>
          {BUTTON_NAME.CLOSE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RequestTimeLine;
