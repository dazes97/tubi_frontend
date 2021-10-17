import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { BUTTON_NAME } from "helpers";
import { Grid } from "@mui/material";
import { createValidationSchema } from "./schemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
interface CreateProps {
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
interface ServiceCreateInterface {
  name: string;
  price: number;
  description: string;
  location: number;
}
const ServiceCreate = (props: CreateProps) => {
  const { openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ServiceCreateInterface>({
    resolver: yupResolver(createValidationSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      location: 0,
    },
  });
  const onSubmit: SubmitHandler<ServiceCreateInterface> = (data) => {
    onSendDataToServer(data);
    resetFormAndClose();
  };
  const resetFormAndClose = () => {
    onReset();
    reset({
      name: "",
      price: 0,
      description: "",
      location: 0,
    });
  };

  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetFormAndClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Crear Servicio</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.name?.type === "required"}
                      helperText={
                        errors.name?.type === "required" &&
                        "Nombre es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Nombre"
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
                  name="description"
                  rules={{ required: true, minLength: 10, maxLength: 255 }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.description?.type === "min"}
                      helperText={
                        errors.description?.type === "min" &&
                        "Descripcion debe tener al menos 10 caracteres"
                      }
                      autoFocus
                      margin="dense"
                      id="description"
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
              <Grid item xs={12} md={6}>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.price?.type === "min"}
                      helperText={
                        errors.price?.type === "min" && "Precio minimo es Bs. 1"
                      }
                      autoFocus
                      margin="dense"
                      id="price"
                      label="Precio"
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
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.location?.type === "min"}
                      helperText={
                        errors.location?.type === "min" &&
                        "Ubicacion es Requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="location"
                      label="¿Requiere ubicacion del cliente?"
                      select
                      fullWidth
                      variant="outlined"
                      {...field}
                    >
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Si</MenuItem>
                    </TextField>
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
export default ServiceCreate;
