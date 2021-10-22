import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { BUTTON_NAME } from "helpers";
import { DateTime } from "luxon";
interface QuoteDetailInterface {
  data: any;
  openModal: boolean;
  onReset: any;
}
const QuoteDetail = (props: QuoteDetailInterface) => {
  const { data, openModal, onReset } = props;

  useEffect(() => {}, [data]);
  const resetDefaultValuesForm = () => {
    closeForm();
  };

  const closeForm = () => {
    onReset();
  };

  return (
    <Dialog
      open={openModal}
      onClose={resetDefaultValuesForm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <strong>Detalle Cotizacion</strong>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Datos Cotizacion:</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Codigo: </strong>
              {data.quoteCode ?? "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Fecha y hora: </strong>
              {data.quoteCreatedAt
                ? DateTime.fromISO(data.quoteCreatedAt).toLocaleString(
                    DateTime.DATETIME_SHORT
                  )
                : "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Descripcion:</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              <strong>Observacion: </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              {data.quoteDescription && data.quoteDescription.length > 0
                ? data.quoteDescription
                : "Sin Descripcion"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              <strong>Tipo: </strong>
              {data.quoteType
                ? data.quoteType === "0"
                  ? "Producto"
                  : "Servicio"
                : "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Datos Cliente:</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              <strong>Nombre: </strong>
              {data.clientName && data.clientLastName
                ? data.clientName + " " + data.clientLastName
                : "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              <strong>Telefono/Celular: </strong>
              {data.clientPhone ?? "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              <strong>Direccion: </strong>
              {data.clientAddress ?? "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              <strong>Email: </strong>
              {data.clientEmail && data.clientEmail.length > 0
                ? data.clientEmail
                : "Sin Datos"}
            </Typography>
          </Grid>
          {data?.quotePhoto && (
            <>
              <Grid item xs={12} md={12}>
                <Typography variant="h6">Fotografia:</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "400px",
                  }}
                  src={data.quotePhoto}
                  alt={data.quoteCode}
                />
              </Grid>
            </>
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
export default QuoteDetail;
