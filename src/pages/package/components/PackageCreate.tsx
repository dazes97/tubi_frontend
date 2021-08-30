import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { BUTTON_NAME } from "helpers";
import { createValidationSchema } from "./schemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState } from "react";
import PackageServiceTable from "./PackageServiceTable";
import { serviceList } from "pages/service/ServiceService";
import { NotificationSystem } from "components";

interface CreateProps {
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
interface PackageCreateInterface {
  name: string;
  price: number;
  description: string;
  status: number;
  location: number;
}
const PackageCreate = (props: CreateProps) => {
  const { openModal, onReset, onSendDataToServer } = props;
  const [servicesToAdd, setServicesToAdd] = useState(new Array<any>());
  const [servicesList, setServicesList] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PackageCreateInterface>({
    resolver: yupResolver(createValidationSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      status: 1,
      location: 0,
    },
  });
  const fetchServicesList = async () => {
    try {
      const { data } = await serviceList();
      setServicesList(data);
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: "Hubo un error al listar los servicios intente nuevamente",
      });
    }
  };
  useEffect(() => {
    fetchServicesList();
  }, []);

  const onSubmit: SubmitHandler<PackageCreateInterface> = (data) => {
    if (servicesToAdd.length !== 0) {
      onSendDataToServer({
        ...data,
        services: servicesToAdd.map((e: any) => e.id),
      });
      resetFormAndClose();
    } else {
      NotificationSystem({
        type: "error",
        message: "Paquete debe tener al menos un servicio",
      });
    }
  };
  const resetFormAndClose = () => {
    onReset();
    reset({
      name: "",
      price: 0,
      description: "",
      status: 1,
      location: 0,
    });
    setServicesToAdd(new Array<any>());
  };
  const addService = (serviceId: any) => {
    if (!servicesToAdd.find((e: any) => e.id === serviceId)) {
      const serviceFound = servicesList.find((e: any) => e.id === serviceId);
      if (!serviceFound) return;
      setServicesToAdd((prev) => [...prev, serviceFound]);
    }
  };
  const deleteService = (serviceId: any) => {
    setServicesToAdd((prev) => prev.filter((e: any) => e.id !== serviceId.id));
  };

  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetFormAndClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Crear Paquete</DialogTitle>
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
                      label="Precio(Bs)"
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
                      <MenuItem value={1}>Activo</MenuItem>
                      <MenuItem value={0}>No Activo</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} alignItems="center">
                <TextField
                  autoFocus
                  margin="dense"
                  id="status"
                  label="Servicios"
                  defaultValue={-1}
                  select
                  fullWidth
                  variant="outlined"
                  onChange={(e) => addService(e.target.value)}
                >
                  <MenuItem key="-1" value={-1}>
                    Seleccionar
                  </MenuItem>
                  {servicesList &&
                    servicesList.map((e: any) => {
                      return (
                        <MenuItem key={e.id} value={e.id}>
                          {e.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.status?.type === "min"}
                      helperText={
                        errors.status?.type === "min" && "Estado es Requerido"
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
              <Grid item xs={12} md={12}>
                {servicesToAdd && servicesToAdd.length !== 0 && (
                  <PackageServiceTable
                    onChangeData={(serviceId: any) => deleteService(serviceId)}
                    data={servicesToAdd}
                  />
                )}
              </Grid>
              {servicesToAdd && servicesToAdd.length !== 0 && (
                <Grid item xs={12} md={12}>
                  <Typography>
                    Precio regular:
                    <strong>
                      Bs.{" "}
                      {servicesToAdd.reduce(
                        (a: any, { price }: any) => Number(a) + Number(price),
                        0
                      )}
                    </strong>
                  </Typography>
                </Grid>
              )}
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
export default PackageCreate;
