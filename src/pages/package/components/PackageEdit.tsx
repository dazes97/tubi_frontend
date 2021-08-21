import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editValidationSchema } from "./schemaValidation";
import { BUTTON_NAME } from "helpers";
import { serviceList } from "pages/service/ServiceService";
import { NotificationSystem } from "components";
import PackageServiceTable from "./PackageServiceTable";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
interface PackageEditInterface {
  name: string;
  price: number;
  description: string;
  status: string;
  services: [];
}
const PackageEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PackageEditInterface>({
    resolver: yupResolver(editValidationSchema),
    defaultValues: {
      name: data.name,
      price: data.price,
      description: data.description,
      status: data.status,
      services: data.services,
    },
  });
  const [servicesList, setServicesList] = useState(new Array<any>());
  const [packageServices, setPackageServices] = useState(data.services ?? []);
  const [servicesToAddOrDelete, setServicesToAddOrDelete] = useState({
    toDelete: new Array<any>(),
    toAdd: new Array<any>(),
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
  useEffect(() => {
    reset({
      name: data.name,
      price: data.price,
      description: data.description,
      status: data.status,
      services: data.services,
    });
    setServicesToAddOrDelete({
      toDelete: new Array<any>(),
      toAdd: new Array<any>(),
    });
    setPackageServices(data.services);
  }, [data, reset]);
  const onSubmit: SubmitHandler<PackageEditInterface> = (formData) => {
    if (packageServices.length !== 0) {
      onSendDataToServer({
        ...formData,
        id: data.id,
        toAdd: servicesToAddOrDelete.toAdd?.map((e: any) => e.id),
        toDelete: servicesToAddOrDelete.toDelete?.map((e: any) => e.id),
      });
      closeForm();
    } else {
      NotificationSystem({
        type: "error",
        message: "Paquete debe tener al menos un servicio",
      });
    }
  };
  const deleteServiceFromPackage = (element: any) => {
    if (
      !servicesToAddOrDelete?.toDelete.find((e: any) => e.id === element.id)
    ) {
      setPackageServices((prev: any) => {
        return prev.filter((e: any) => e.id !== element.id);
      });
      setServicesToAddOrDelete((prev) => {
        return {
          ...prev,
          toDelete: [...prev.toDelete, element],
          toAdd: prev.toAdd.filter((e: any) => e.id !== element.id),
        };
      });
    }
  };
  const addServiceToPackage = (elementId: any) => {
    const findService = servicesList?.find((e: any) => e.id === elementId);
    if (!findService) return;
    //clean item from servicesToAddOrDelete and insert in a clean push
    setPackageServices((prev: any) => {
      const reWriteArray = prev.filter((e: any) => e.id !== elementId) ?? [];
      reWriteArray.push(findService);
      return reWriteArray;
    });
    setServicesToAddOrDelete((prev: any) => {
      let reWriteArrayAdd = prev.toAdd ?? [];
      if (!data?.services.find((e: any) => e.id === elementId)) {
        reWriteArrayAdd =
          prev.toAdd?.filter((e: any) => e.id !== elementId) ?? [];
        reWriteArrayAdd.push(findService);
      }
      const reWriteArrayDelete = prev.toDelete?.filter(
        (e: any) => e.id !== elementId
      );
      return {
        ...prev,
        toAdd: reWriteArrayAdd,
        toDelete: reWriteArrayDelete,
      };
    });
  };
  const closeForm = () => {
    onReset();
  };
  const resetDefaultValuesForm = () => {
    reset({
      name: data.name,
      price: data.price,
      description: data.description,
      status: data.status,
      services: data.services,
    });
    closeForm();
  };

  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetDefaultValuesForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Editar Paquete</DialogTitle>
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
                      label="Precio(Bs.)"
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
              <Grid item xs={12} md={12} alignItems="center">
                <TextField
                  autoFocus
                  margin="dense"
                  id="status"
                  label="Servicios"
                  defaultValue={-1}
                  select
                  fullWidth
                  variant="outlined"
                  onChange={(e) => addServiceToPackage(e.target.value)}
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
              <Grid item xs={12} md={12}>
                {packageServices && packageServices.length !== 0 && (
                  <PackageServiceTable
                    onChangeData={(data: any) => deleteServiceFromPackage(data)}
                    data={packageServices}
                  />
                )}
              </Grid>
              {packageServices && packageServices.length !== 0 && (
                <Grid item xs={12} md={12}>
                  <Typography>
                    Precio regular:
                    <strong>
                      Bs.{" "}
                      {packageServices.reduce(
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
export default PackageEdit;
