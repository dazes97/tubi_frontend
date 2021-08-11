import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import CompanyInterface from "../CompanyInterface";
import { BUTTON_NAME } from "helpers";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
const CompanyEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CompanyInterface>({
    defaultValues: {
      name: data.name,
      nit: data.nit,
      mainAddress: data.mainAddress,
      status: data.status,
    },
  });
  useEffect(() => {
    reset({
      name: data.name,
      nit: data.nit,
      mainAddress: data.mainAddress,
      status: data.status,
    });
  }, [data, reset]);
  const resetDefaultValuesForm = () => {
    closeForm();
    reset({
      name: data.name,
      nit: data.nit,
      mainAddress: data.mainAddress,
      status: data.status,
    });
  };
  const onSubmit: SubmitHandler<CompanyInterface> = (formData) => {
    onSendDataToServer({ ...formData, id: data.id });
    closeForm();
  };
  const closeForm = () => {
    onReset();
  };

  return (
    <div>
      <Dialog open={openModal} onClose={onReset}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Editar Empresa</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Controller
                  name="name"
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
export default CompanyEdit;
