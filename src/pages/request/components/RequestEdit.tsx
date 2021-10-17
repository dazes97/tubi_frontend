import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import RequestInterface from "../RequestInterface";
import { BUTTON_NAME } from "helpers";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
const RequestEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RequestInterface>();

  useEffect(() => {
    reset({
      bikeBrand: data.bikeBrand,
      bikeColor: data.bikeColor,
      bikeModel: data.bikeModel,
      bikeObservation: data.bikeObservation,
      bikeWheelSize: data.bikeWheelSize,
      clientLastName: data.clientLastName,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      requestDeliveryDateTime: data.requestDeliveryDate,
    });
  }, [data, reset]);
  const resetDefaultValuesForm = () => {
    closeForm();
    reset({
      bikeBrand: data.bikeBrand,
      bikeColor: data.bikeColor,
      bikeModel: data.bikeModel,
      bikeObservation: data.bikeObservation,
      bikeWheelSize: data.bikeWheelSize,
      clientLastName: data.clientLastName,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      requestDeliveryDateTime: data.requestDeliveryDate,
    });
  };
  const onSubmit: SubmitHandler<RequestInterface> = (formData) => {
    onSendDataToServer({ ...formData, id: data.id });
    closeForm();
  };
  const closeForm = () => {
    onReset();
  };

  return (
    <div>
      <Dialog open={openModal} onClose={resetDefaultValuesForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Editar Empresa</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="bikeBrand"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.bikeBrand?.type === "required"}
                      helperText={
                        errors.bikeBrand?.type === "required" &&
                        "Marca es requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="bikeBrand"
                      label="Marca bicicleta"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="bikeColor"
                  render={({ field }) => (
                    <TextField
                      error={errors.bikeColor?.type === "required"}
                      helperText={
                        errors.bikeColor?.type === "required" &&
                        "Color es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="bikeColor"
                      label="Color bicicleta"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="bikeModel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.bikeModel?.type === "required"}
                      helperText={
                        errors.bikeModel?.type === "required" &&
                        "Modelo es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="bikeModel"
                      label="Modelo bicicleta"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="bikeWheelSize"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.bikeWheelSize?.type === "required"}
                      helperText={
                        errors.bikeWheelSize?.type === "required" &&
                        "Aro es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="bikeWheelSize"
                      label="Tamaño aro bicicleta"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="bikeObservation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.bikeObservation?.type === "required"}
                      helperText={
                        errors.bikeObservation?.type === "required" &&
                        "Observacion es Requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="bikeObservation"
                      label="Observacion"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="requestDeliveryDateTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.requestDeliveryDateTime?.type === "required"}
                      helperText={
                        errors.requestDeliveryDateTime?.type === "required" &&
                        "Fecha de Entrega es Requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="requestDeliveryDateTime"
                      label="Fecha"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="clientName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.clientName?.type === "required"}
                      helperText={
                        errors.clientName?.type === "required" &&
                        "Nombre cliente es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="clientName"
                      label="Nombre cliente"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="clientLastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.clientLastName?.type === "required"}
                      helperText={
                        errors.clientLastName?.type === "required" &&
                        "Apellido es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="clientLastName"
                      label="Apellido cliente"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="clientPhone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.clientPhone?.type === "required"}
                      helperText={
                        errors.clientPhone?.type === "required" &&
                        "Telefono es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="clientPhone"
                      label="Telefono cliente"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => resetDefaultValuesForm()}
            >
              {BUTTON_NAME.CANCEL}
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {BUTTON_NAME.UPDATE}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default RequestEdit;
