import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import { BUTTON_NAME, SERVICE_TYPE } from "helpers";
import Button from "@material-ui/core/Button";
import { DateTime } from "luxon";
import { Typography } from "@material-ui/core";
import { MapRenderLocation } from "hooks";
interface RequestDetailInterface {
  data: any;
  openModal: boolean;
  onReset: any;
}
const RequestDetail = (props: RequestDetailInterface) => {
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
        <strong>Detalle Solicitud</strong>
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
            <Typography variant="h6">Datos Bicicleta:</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Marca: </strong>
              {data.bikeBrand ?? "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Modelo: </strong>
              {data.bikeModel ?? "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Color: </strong>
              {data.bikeColor ?? "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Aro: </strong>
              {data.bikeWheelSize ?? "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              <strong>Observacion: </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              {data.bikeObservation ?? "Sin Datos"}
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
              <strong>Referencia: </strong>
              {data.clientAddressDetail ?? "Sin Datos"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Servicios:</Typography>
          </Grid>

          {data.services?.[0]?.map((e: any, k: any) => {
            return (
              <Grid item xs={12} md={12} key={k}>
                <Typography variant="body2">
                  {e.name && e.price && e.type
                    ? `${e.name}  Bs. ${e.price} (${
                        Number(e.type) === SERVICE_TYPE.PACKAGE.CODE
                          ? "Paquete"
                          : "Servicio"
                      })`
                    : "Sin Datos"}
                </Typography>
              </Grid>
            );
          })}
          {data?.clientLat && data?.clientLng && (
            <>
              <Grid item xs={12} md={12}>
                <Typography variant="h6">Ubicacion:</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <MapRenderLocation lat={data.clientLat} lng={data.clientLng} />
              </Grid>
            </>
          )}
          {data?.bikePhoto && (
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
                  src={data.bikePhoto}
                  alt={data.requestCode}
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
export default RequestDetail;
