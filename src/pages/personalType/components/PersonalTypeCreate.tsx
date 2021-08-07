import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
      <Dialog open={openModal} onClose={onReset}>
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
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
            >
              Crear
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default PersonalTypeCreate;
