import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { updateStatusSchema } from "./schemaValidation";
import { BUTTON_NAME, REQUEST_CODE } from "helpers";
interface UpdateRequestStatusInterface {
  data: any;
  openModal: boolean;
  onReset: any;
  onChangeRequestStatus: any;
}
interface RequestStatusInterface {
  status: number;
  observation: string;
}
const RequestStatus = (props: UpdateRequestStatusInterface) => {
  const { data, openModal, onReset, onChangeRequestStatus } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RequestStatusInterface>({
    resolver: yupResolver(updateStatusSchema),
  });
  useEffect(() => {
    reset({
      status: data.requestStatus,
    });
  }, [data, reset]);
  const resetDefaultValuesForm = () => {
    closeForm();
    reset({
      status: data.requestStatus,
    });
  };
  const onSubmit: SubmitHandler<RequestStatusInterface> = (formData) => {
    onChangeRequestStatus(data, formData);
    closeForm();
  };
  const closeForm = () => {
    onReset();
  };

  return (
    <Dialog
      open={openModal}
      onClose={resetDefaultValuesForm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">
          {"Cambiar Estado Solicitud"}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={12}>
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
                    <MenuItem value={-1}>Seleccione</MenuItem>
                    {Object.keys(REQUEST_CODE).map((k, i) => {
                      if (
                        Number(Object.values(REQUEST_CODE)[i].CODE) <
                        Number(data.requestStatus)
                      )
                        return null;
                      return (
                        <MenuItem
                          value={Object.values(REQUEST_CODE)[i].CODE}
                          key={i}
                        >
                          {Object.values(REQUEST_CODE)[i].NAME}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Controller
                name="observation"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={errors.observation?.type === "max"}
                    helperText={
                      errors.observation?.type === "max" &&
                      "Descripcion debe tener como maximo 200 caracteres"
                    }
                    autoFocus
                    margin="dense"
                    id="observation"
                    label="Observacion"
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => resetDefaultValuesForm()}>
            {BUTTON_NAME.CANCEL}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            {BUTTON_NAME.UPDATE}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default RequestStatus;
