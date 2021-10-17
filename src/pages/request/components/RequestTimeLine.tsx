import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Receipt from "@mui/icons-material/Receipt";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import BuildIcon from "@mui/icons-material/Build";
import HelpIcon from "@mui/icons-material/Help";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
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
      case REQUEST_CODE.RECEIVED.CODE:
        return REQUEST_CODE.RECEIVED.NAME;
      case REQUEST_CODE.ACCEPTED.CODE:
        return REQUEST_CODE.ACCEPTED.NAME;
      case REQUEST_CODE.DENIED.CODE:
        return REQUEST_CODE.DENIED.NAME;
      case REQUEST_CODE.DELIVERED.CODE:
        return REQUEST_CODE.DELIVERED.NAME;
      case REQUEST_CODE.FINISHED.CODE:
        return REQUEST_CODE.FINISHED.NAME;
      case REQUEST_CODE.PROCESS.CODE:
        return REQUEST_CODE.PROCESS.NAME;
      default:
        return "Sin Definir";
    }
  };
  const findIcon = (item: any) => {
    switch (item.status) {
      case REQUEST_CODE.RECEIVED.CODE:
        return <Receipt />;
      case REQUEST_CODE.ACCEPTED.CODE:
        return <CheckIcon />;
      case REQUEST_CODE.DENIED.CODE:
        return <CancelIcon />;
      case REQUEST_CODE.DELIVERED.CODE:
        return <DeliveryDiningIcon />;
      case REQUEST_CODE.FINISHED.CODE:
        return <AssignmentTurnedInIcon />;
      case REQUEST_CODE.PROCESS.CODE:
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
