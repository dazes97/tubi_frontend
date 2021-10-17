import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import PersonalTypeInterface from "../PersonalTypeInterface";
import { BUTTON_NAME } from "helpers";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
const PersonalTypeEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PersonalTypeInterface>();
  useEffect(() => {
    reset({ name: data.name });
  }, [data, reset]);
  const onSubmit: SubmitHandler<PersonalTypeInterface> = (formData) => {
    onSendDataToServer({ id: data.id, name: formData.name });
    closeForm();
  };
  const closeForm = () => {
    onReset();
  };
  const resetDefaultValuesForm = () => {
    closeForm();
    reset({ name: data.name ?? "" });
  };

  return (
    <div>
      <Dialog open={openModal} onClose={resetDefaultValuesForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Editar Tipo Personal</DialogTitle>
          <DialogContent>
            <Controller
              name="name"
              control={control}
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
export default PersonalTypeEdit;
