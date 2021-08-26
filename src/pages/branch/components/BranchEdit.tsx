import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editValidationSchema } from "./schemaValidation";
import { BUTTON_NAME } from "helpers";
import useBranchMapLocation from "./BranchMapLocation";
import Typography from "@material-ui/core/Typography";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
interface BranchEditInterface {
  name: string;
  address: string;
  description: string;
  attentionCapacity: number;
  status: number;
  type: number;
  lat?: number;
  lon?: number;
  services?: any;
}
const BranchEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const [renderMap, location, setLocation] = useBranchMapLocation({
    latLng: {
      lat: data.lat,
      lng: data.lng,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BranchEditInterface>({
    resolver: yupResolver(editValidationSchema),
    defaultValues: {
      name: data.name,
      address: data.address,
      description: data.description,
      status: data.status,
      attentionCapacity: data.attentionCapacity,
      type: data.type,
      services: data.services,
    },
  });

  useEffect(() => {
    reset({
      name: data.name,
      address: data.address,
      description: data.description,
      status: data.status,
      attentionCapacity: data.attentionCapacity,
      type: data.type,
      services: data.services,
    });
  }, [data, reset]);
  const onSubmit: SubmitHandler<BranchEditInterface> = (formData) => {
    delete formData.services;
    onSendDataToServer({ ...formData, ...location, id: data.id });
    closeForm();
  };
  const closeForm = () => {
    onReset();
  };
  const resetDefaultValuesForm = () => {
    reset({
      name: data.name,
      address: data.address,
      description: data.description,
      status: data.status,
      attentionCapacity: data.attentionCapacity,
      type: data.type,
      services: data.services,
    });
    setLocation({ lat: data.lat, lng: data.lng });
    closeForm();
  };

  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetDefaultValuesForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Editar Sucursal</DialogTitle>
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
              <Grid item xs={12} md={12}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.address?.type === "required"}
                      helperText={
                        errors.address?.type === "required" &&
                        "Direccion es requerida"
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
                <Grid item xs={12} md={12}>
                  <Controller
                    name="attentionCapacity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        error={errors.attentionCapacity?.type === "min"}
                        helperText={
                          errors.attentionCapacity?.type === "min" &&
                          "Capacidad debe ser minimo 1"
                        }
                        autoFocus
                        margin="dense"
                        id="attentionCapacity"
                        label="Capacidad de solicitudes de servicio diarias"
                        type="number"
                        fullWidth
                        variant="outlined"
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.status?.type === "min"}
                      helperText={
                        errors.status?.type === "min" && "Estado es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="status"
                      label="Estado"
                      select
                      fullWidth
                      variant="outlined"
                      {...field}
                    >
                      <MenuItem value={1}>Abierto</MenuItem>
                      <MenuItem value={0}>Cerrado</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.status?.type === "min"}
                      helperText={
                        errors.status?.type === "min" && "Estado es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="type"
                      label="Tipo de Sucursal"
                      select
                      fullWidth
                      variant="outlined"
                      {...field}
                    >
                      <MenuItem value={0}>Fijo</MenuItem>
                      <MenuItem value={1}>Movil</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography>Ubicacion de la sucursal</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                {renderMap}
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
export default BranchEdit;
