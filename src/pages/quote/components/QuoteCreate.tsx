import { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { BUTTON_NAME } from "helpers";
import { createValidationSchema } from "./schemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
interface CreateProps {
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
interface QuoteCreateInterface {
  quoteDescription: string;
  quoteType: string;
  quotePhoto: string | null;
  clientName: string;
  clientLastName: string;
  clientPhone: string;
  clientAddress: string;
  clientEmail: string;
}
const QuoteCreate = (props: CreateProps) => {
  const { openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<QuoteCreateInterface>({
    resolver: yupResolver(createValidationSchema),
    defaultValues: {
      quoteDescription: "",
      quotePhoto: null,
      quoteType: "-1",
      clientLastName: "",
      clientName: "",
      clientPhone: "",
      clientAddress: "",
      clientEmail: "",
    },
  });
  const toBase64 = (photo: any) =>
    new Promise((resolve, reject) => {
      const file = photo ?? null;
      if (!file) return null;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<QuoteCreateInterface> = async (data) => {
    onSendDataToServer({
      ...data,
      quotePhoto: data.quotePhoto ? await toBase64(data.quotePhoto) : null,
    });
    resetFormAndClose();
  };
  const resetFormAndClose = () => {
    reset({
      quoteDescription: "",
      quotePhoto: null,
      quoteType: "-1",
      clientLastName: "",
      clientName: "",
      clientPhone: "",
      clientAddress: "",
      clientEmail: "",
    });
    onReset();
  };
  return (
    <div>
      <Dialog open={openModal} onClose={resetFormAndClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle>Crear Cotizacion</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Datos Cotizacion:</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="quoteDescription"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.quoteDescription?.type === "required"}
                      helperText={
                        errors.quoteDescription?.type === "required" &&
                        "Descripcion es requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="quoteDescription"
                      label="Descripcion"
                      type="text"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={5}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="quoteType"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.quoteType?.type === "min"}
                      helperText={
                        errors.quoteType?.type === "min" && "Tipo es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="quoteType"
                      label="Tipo"
                      type="text"
                      fullWidth
                      select
                      variant="outlined"
                      {...field}
                    >
                      <MenuItem value="-1">Seleccione</MenuItem>
                      <MenuItem value="0">Producto</MenuItem>
                      <MenuItem value="1">Servicio</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="quotePhoto"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <>
                      <Button variant="contained" component="label">
                        Subir Fotografia
                        <input
                          id="quotePhoto"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          hidden
                          onChange={(e) =>
                            onChange(e.target?.files ? e.target.files[0] : null)
                          }
                        />
                      </Button>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Datos Cliente:</Typography>
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
                        "Nombre cliente es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="clientName"
                      label="Nombre"
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
                        "Apellido cliente es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="clientLastName"
                      label="Apellido"
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
                      error={errors.clientPhone?.type === "min"}
                      helperText={
                        errors.clientPhone?.type === "min" &&
                        "Telefono cliente es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="clientPhone"
                      label="Telefono/Celular"
                      type="number"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="clientEmail"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.clientEmail?.type === "required"}
                      helperText={
                        errors.clientEmail?.type === "required" &&
                        "Email es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="clientEmail"
                      label="Email(opcional)"
                      type="text"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="clientAddress"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.clientAddress?.type === "required"}
                      helperText={
                        errors.clientAddress?.type === "required" &&
                        "Direccion es requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="clientAddress"
                      label="Direccion"
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
              onClick={() => resetFormAndClose()}
            >
              {BUTTON_NAME.CANCEL}
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {BUTTON_NAME.CREATE}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default QuoteCreate;
