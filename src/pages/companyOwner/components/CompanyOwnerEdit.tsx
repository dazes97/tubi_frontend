import { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { DateTime } from "luxon";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editValidationSchema } from "./schemaValidation";
import { BUTTON_NAME } from "helpers";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
interface personalEditInterface {
  name: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  bornDate: Date;
  address: string;
  dni: string;
  personalTypeId: string;
  companyName: string;
}
const PersonalEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<personalEditInterface>({
    resolver: yupResolver(editValidationSchema),
  });
  useEffect(() => {
    reset({
      name: data.user.name,
      lastName: data.user.lastName,
      address: data.address,
      bornDate: DateTime.fromISO(data.bornDate).toFormat("yyyy-MM-dd"),
      personalTypeId: data.personalType.id,
      dni: data.dni,
      email: data.user.email,
      gender: data.user.gender ?? "",
      password: "",
      companyName: data.company.name,
    });
  }, [data, reset]);
  const onSubmit: SubmitHandler<personalEditInterface> = (formData) => {
    onSendDataToServer({ ...formData, id: data.id });
    closeForm();
  };
  const closeForm = () => {
    onReset();
  };
  const resetDefaultValuesForm = () => {
    closeForm();
    reset({
      name: data.user.name,
      lastName: data.user.lastName,
      address: data.address,
      bornDate: DateTime.fromISO(data.bornDate).toFormat("yyyy-MM-dd"),
      personalTypeId: data.personalType.id,
      dni: data.dni,
      email: data.user.email,
      gender: data.user.gender ?? "",
      password: "",
      companyName: data.company.name,
    });
  };

  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetDefaultValuesForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Editar Propietario Empresa</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.lastName?.type === "required"}
                      helperText={
                        errors.lastName?.type === "required" &&
                        "Apellido es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="latName"
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
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.address?.type === "required"}
                      helperText={
                        errors.address?.type === "required" &&
                        "Direccion es Requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="address"
                      label="Direccion"
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
                  name="dni"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.dni?.type === "required"}
                      helperText={
                        errors.dni?.type === "required" &&
                        "Identificacion es Requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="dni"
                      label="Identificacion"
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
                  name="bornDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      error={errors.bornDate?.type === "required"}
                      helperText={
                        errors.bornDate?.type === "required" &&
                        "Fecha de nacimiento es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="bornDate"
                      label="Fecha de Nacimiento"
                      type="date"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.gender?.type === "required"}
                      helperText={
                        errors.gender?.type === "required" &&
                        "Genero es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="gender"
                      label="Genero"
                      select
                      fullWidth
                      variant="outlined"
                      {...field}
                    >
                      <MenuItem value={-1}>Ninguno</MenuItem>
                      <MenuItem value={1}>Hombre</MenuItem>
                      <MenuItem value={2}>Mujer</MenuItem>
                      <MenuItem value={3}>No responde</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="companyName"
                      label="Nomber Empresa"
                      fullWidth
                      variant="outlined"
                      disabled
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.email?.type === "required"}
                      helperText={
                        errors.email?.type === "required" &&
                        "Email es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.password?.type === "min"}
                      helperText={
                        errors.password?.type === "min" &&
                        "Contraseña 8 caracteres como minimo"
                      }
                      autoFocus
                      margin="dense"
                      id="password"
                      label="Contraseña"
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
export default PersonalEdit;
