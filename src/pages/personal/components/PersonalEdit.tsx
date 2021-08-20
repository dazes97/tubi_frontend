import { useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { DateTime } from "luxon";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editValidationSchema } from "./schemaValidation";
import { BUTTON_NAME } from "helpers";
import { personalTypeList } from "pages/personalType/PersonalTypeService";
import { NotificationSystem } from "components";
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
}
const PersonalEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const [personalTypeSelect, setPersonalTypeSelect] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<personalEditInterface>({
    resolver: yupResolver(editValidationSchema),
    defaultValues: {
      name: data.user.name,
      lastName: data.user.lastName,
      address: data.address,
      bornDate: DateTime.fromISO(data.bornDate).toFormat("yyyy-MM-dd"),
      personalTypeId: data.personalType.id,
      dni: data.dni,
      email: data.user.email,
      gender: data.user.gender ?? "",
      password: "",
    },
  });
  const fetchPersonalTypeList = useCallback(async () => {
    try {
      const response = await personalTypeList();
      setPersonalTypeSelect(
        response.data.filter((e: any) => e.id !== data.personalType.id)
      );
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: "Hubo un error al listar tipo Personal intente nuevamente",
      });
    }
  }, [data]);
  useEffect(() => {
    fetchPersonalTypeList();
  }, [fetchPersonalTypeList]);
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
    });
  };

  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetDefaultValuesForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Editar Personal</DialogTitle>
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
                      disabled
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
                      <MenuItem value={data.personalType.id}>
                        {data.personalType.name}
                      </MenuItem>
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
                      disabled
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
