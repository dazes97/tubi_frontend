import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import ListSubheader from "@mui/material/ListSubheader";
import RequestServiceTable from "./RequestServiceTable";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { BUTTON_NAME } from "helpers";
import { createValidationSchema } from "./schemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateTime } from "luxon";
import { NotificationSystem } from "components";
import { serviceListInBranch } from "pages/service/ServiceService";
import { packageListInBranch } from "pages/package/PackageService";
interface CreateProps {
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
interface RequestCreateInterface {
  bikeBrand: string;
  bikeModel: string;
  bikeWheelSize: string;
  bikeColor: string;
  bikeObservation: string;
  requestDeliveryDateTime: Date;
  clientName: string;
  clientLastName: string;
  clientPhone: string;
  clientAddress: string;
  clientAddressDetail: string;
  bikePhoto: any;
}
const RequestCreate = (props: CreateProps) => {
  const { openModal, onReset, onSendDataToServer } = props;
  const [servicesToAdd, setServicesToAdd] = useState(new Array<any>());
  const [servicesList, setServicesList] = useState(new Array<any>());
  const [packagesList, setPackagesList] = useState(new Array<any>());
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RequestCreateInterface>({
    resolver: yupResolver(createValidationSchema),
    defaultValues: {
      bikeBrand: "",
      bikeColor: "",
      bikeModel: "",
      bikeObservation: "",
      bikeWheelSize: "-1",
      clientLastName: "",
      clientName: "",
      clientPhone: "",
      clientAddress: "",
      clientAddressDetail: "",
      requestDeliveryDateTime: DateTime.now().toFormat("yyyy-LL-dd'T'T"),
      bikePhoto: null,
    },
  });
  const fetchServicesList = async () => {
    try {
      const { data } = await serviceListInBranch();
      setServicesList(data);
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: "Hubo un error al listar los servicios intente nuevamente",
      });
    }
  };
  const fetchPackagesList = async () => {
    try {
      const { data } = await packageListInBranch();
      setPackagesList(data);
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: "Hubo un error al listar los paquetes intente nuevamente",
      });
    }
  };
  const toBase64 = (photo: any) =>
    new Promise((resolve, reject) => {
      const file = photo ?? null;
      if (!file) return null;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  useEffect(() => {
    fetchServicesList();
    fetchPackagesList();
  }, []);

  const onSubmit: SubmitHandler<RequestCreateInterface> = async (data) => {
    if (servicesToAdd.length === 0) {
      NotificationSystem({
        message: "Debe Seleccionar al menos un servicio",
        type: "warning",
      });
      return;
    }
    onSendDataToServer({
      ...data,
      services: servicesToAdd,
      bikePhoto: data.bikePhoto ? await toBase64(data.bikePhoto) : null,
    });
    resetFormAndClose();
  };
  const resetFormAndClose = () => {
    reset({
      bikeBrand: "",
      bikeColor: "",
      bikeModel: "",
      bikeObservation: "",
      bikeWheelSize: "-1",
      clientLastName: "",
      clientName: "",
      clientPhone: "",
      clientAddress: "",
      clientAddressDetail: "",
      requestDeliveryDateTime: DateTime.now().toFormat("yyyy-LL-dd'T'T"),
      bikePhoto: null,
    });
    setServicesToAdd(new Array<any>());
    onReset();
  };
  const addServiceToRequest = (elementId: any) => {
    let findService: any;
    findService = packagesList?.find((e: any) => e.id === elementId);
    if (!findService) {
      findService = servicesList?.find((e: any) => e.id === elementId);
      if (findService) {
        const onlyPackagesList = servicesToAdd.filter(
          (e: any) => e.type === "2"
        );
        const serviceInPackage = onlyPackagesList.find((e: any) =>
          e.services.find((e: any) => e.id === elementId)
        );
        if (serviceInPackage) {
          NotificationSystem({
            type: "warning",
            message:
              "El servicio ya esta incluido en el paquete: " +
                serviceInPackage.name ?? "",
          });
          return;
        }
      }
    }
    if (!findService) return;
    //clean item from addServiceToRequest and insert in a clean push
    setServicesToAdd((prev: any) => {
      const reWriteArray = prev.filter((e: any) => e.id !== elementId) ?? [];
      reWriteArray.push(findService);
      return reWriteArray;
    });
  };
  const deleteServiceFromRequest = (element: any) => {
    setServicesToAdd((prev: any) => {
      return prev.filter((e: any) => e.id !== element.id);
    });
  };

  return (
    <div>
      <Dialog open={openModal} onClose={resetFormAndClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Crear Solicitud</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="body2">Datos Bicicleta:</Typography>
              </Grid>
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
                      label="Marca"
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
                        "Modelo es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="bikeModel"
                      label="Modelo"
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
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.bikeColor?.type === "required"}
                      helperText={
                        errors.bikeColor?.type === "required" &&
                        "Color es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="bikeColor"
                      label="Color"
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
                      error={errors.bikeWheelSize?.type === "min"}
                      helperText={
                        errors.bikeWheelSize?.type === "min" &&
                        "Tamaño aro es requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="bikeWheelSize"
                      label="Tamaño Aro"
                      type="text"
                      fullWidth
                      select
                      variant="outlined"
                      {...field}
                    >
                      <MenuItem value="-1">Seleccione</MenuItem>
                      {[
                        15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20,
                        20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5,
                        26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5,
                      ]
                        .reverse()
                        .map((e: any) => (
                          <MenuItem key={e} value={e}>
                            {e}
                          </MenuItem>
                        ))}
                    </TextField>
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
              <Grid item xs={12} md={12}>
                <Controller
                  name="clientAddressDetail"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.clientAddressDetail?.type === "required"}
                      helperText={
                        errors.clientAddressDetail?.type === "required" &&
                        "Direccion es requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="clientAddressDetail"
                      label="Referencia(opcional)"
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
                      InputLabelProps={{ shrink: true }}
                      error={
                        errors.requestDeliveryDateTime?.type === "required"
                      }
                      helperText={
                        errors.requestDeliveryDateTime?.type === "required" &&
                        "Fecha y hora de entrega es requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="requestDeliveryDateTime"
                      label="Fecha y Hora de Solicitud"
                      type="datetime-local"
                      fullWidth
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="bikeObservation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.bikeObservation?.type === "required"}
                      helperText={
                        errors.bikeObservation?.type === "required" &&
                        "Observacion es requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="bikeObservation"
                      label="Observacion"
                      type="text"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={4}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="bikePhoto"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <>
                      <Button variant="contained" component="label">
                        Subir Fotografia
                        <input
                          id="bikePhoto"
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
                <TextField
                  autoFocus
                  margin="dense"
                  id="status"
                  label="Paquetes y Servicios"
                  defaultValue={-1}
                  select
                  fullWidth
                  variant="outlined"
                  onChange={(e) => addServiceToRequest(e.target.value)}
                >
                  <MenuItem key="-1" value={-1}>
                    Seleccionar
                  </MenuItem>
                  <ListSubheader>Paquetes</ListSubheader>
                  {packagesList &&
                    packagesList.map((e: any) => {
                      return (
                        <MenuItem key={e.id} value={e.id}>
                          {e.name}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>Servicios</ListSubheader>
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
                {servicesToAdd && (
                  <RequestServiceTable
                    onChangeData={(data: any) => deleteServiceFromRequest(data)}
                    data={servicesToAdd}
                  />
                )}
              </Grid>
              {servicesToAdd && servicesToAdd.length !== 0 && (
                <Grid item xs={12} md={12}>
                  <Typography variant="h6">
                    TOTAL:
                    <strong>
                      Bs.
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
export default RequestCreate;
