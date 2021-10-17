import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { BUTTON_NAME } from "helpers";
import PersonalTypeInterface from "../PersonalTypeInterface";
interface CreateProps {
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
const PersonalTypeCreate = (props: CreateProps) => {
  const { openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<PersonalTypeInterface>();
  const onSubmit: SubmitHandler<PersonalTypeInterface> = (data) => {
    onSendDataToServer(data);
    resetFormAndClose();
  };
  const resetFormAndClose = () => {
    reset({ name: "" });
    onReset();
  };

  return (
    <div>
      <Dialog open={openModal} onClose={resetFormAndClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Crear Tipo Personal</DialogTitle>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              defaultValue={""}
              rules={{ required: true, maxLength: 50 }}
              render={({ field }) => (
                <TextField
                  error={errors.name?.type === "required"}
                  helperText={
                    errors.name?.type === "required" && "Nombre es Requerido"
                  }
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Nombre del tipo"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...field}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => resetFormAndClose()}
            >
              {BUTTON_NAME.CANCEL}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
            >
              {BUTTON_NAME.CREATE}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default PersonalTypeCreate;
