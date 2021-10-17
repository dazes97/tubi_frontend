import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { BUTTON_NAME } from "helpers";
import CompanyInterface from "../CompanyInterface";
import { Grid } from "@mui/material";
interface CreateProps {
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
const CompanyCreate = (props: CreateProps) => {
  const { openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CompanyInterface>();
  const onSubmit: SubmitHandler<CompanyInterface> = (data) => {
    onSendDataToServer(data);
    resetFormAndClose();
  };
  const resetFormAndClose = () => {
    reset({ name: "", mainAddress: "", nit: "" });
    onReset();
  };

  return (
    <div>
      <Dialog open={openModal} onClose={resetFormAndClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Crear Empresa</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Controller
                  name="name"
                  defaultValue=""
                  rules={{ required: true, maxLength: 200 }}
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
                  name="nit"
                  defaultValue=""
                  rules={{ required: true, maxLength: 100 }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.nit?.type === "required"}
                      helperText={
                        errors.nit?.type === "required" && "NIT es Requerido"
                      }
                      autoFocus
                      margin="dense"
                      id="nit"
                      label="NIT"
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
                  name="mainAddress"
                  defaultValue=""
                  rules={{ required: true, maxLength: 255 }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      error={errors.mainAddress?.type === "required"}
                      helperText={
                        errors.mainAddress?.type === "required" &&
                        "Direccion es Requerida"
                      }
                      autoFocus
                      margin="dense"
                      id="mainAddress"
                      label="Direccion Principal"
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
export default CompanyCreate;
