import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { DateTime } from "luxon";
import { BUTTON_NAME } from "helpers";
import { Grid, MenuItem } from "@material-ui/core";
import { personalTypeList } from "../../personalType/PersonalTypeService";
import { useEffect, useState } from "react";
import { NotificationSystem } from "components";
import { createValidationSchema } from "./schemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
interface CreateProps {
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
interface personalCreateInterface {
  name: string;
  lastName: string;
  email: string;
  password: string;
  gender: number;
  bornDate: Date;
  address: string;
  dni: string;
  personalTypeId: number;
}
const PersonalCreate = (props: CreateProps) => {
  const { openModal, onReset, onSendDataToServer } = props;
  const [personalTypeSelect, setPersonalTypeSelect] = useState([]);
  const fetchPersonalTypeList = async () => {
    try {
      const { data } = await personalTypeList();
      setPersonalTypeSelect(data);
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: "Hubo un error al listar tipo Personal intente nuevamente",
      });
    }
  };
  useEffect(() => {
    fetchPersonalTypeList();
  }, []);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<personalCreateInterface>({
    resolver: yupResolver(createValidationSchema),
    defaultValues: {
      name: "",
      lastName: "",
      address: "",
      bornDate: DateTime.now().toFormat("yyyy-MM-dd"),
      personalTypeId: -1,
      dni: "",
      email: "",
      gender: -1,
      password: "",
    },
  });
  const onSubmit: SubmitHandler<personalCreateInterface> = (data) => {
    onSendDataToServer(data);
    resetFormAndClose();
  };
  const resetFormAndClose = () => {
    onReset();
    reset({
      name: "",
      lastName: "",
      address: "",
      bornDate: DateTime.now().toFormat("yyyy-MM-dd"),
      personalTypeId: -1,
      dni: "",
      email: "",
      gender: -1,
      password: "",
    });
  };

  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetFormAndClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Crear Personal</DialogTitle>
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
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.gender?.type === "required"}
                      helperText={
                        errors.gender?.type === "required" &&
                        "Sexo es Requerido"
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
                      <MenuItem value="-1">Ninguno</MenuItem>
                      <MenuItem value="1">Hombre</MenuItem>
                      <MenuItem value="2">Mujer</MenuItem>
                      <MenuItem value="3">No responde</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="personalTypeId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.personalTypeId?.type === "min"}
                      helperText={
                        errors.personalTypeId?.type === "min" &&
                        "Tipo personal es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="personalTypeId"
                      label="Tipo Personal"
                      select
                      fullWidth
                      variant="outlined"
                      {...field}
                    >
                      <MenuItem value="-1">Seleccione</MenuItem>
                      {personalTypeSelect &&
                        personalTypeSelect.map((e: any, key) => (
                          <MenuItem key={key} value={e.id}>
                            {e.name}
                          </MenuItem>
                        ))}
                    </TextField>
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
                        "Contraseña 6 caracteres como minimo"
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
export default PersonalCreate;
