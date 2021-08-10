import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { BUTTON_NAME } from "helpers";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}
interface personalEditInterface {
  name: string;
  lastName: string;
  email: string;
  gender: number;
  bornDate: Date;
  address: string;
  companyId: number;
  dni: string;
  personalTypeId: number;
}
const PersonalEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<personalEditInterface>({
    defaultValues: {
      name: data.name,
    },
  });
  useEffect(() => {
    reset({ name: data.name ?? "" });
  }, [data, reset]);
  const onSubmit: SubmitHandler<personalEditInterface> = (formData) => {
    onSendDataToServer({ id: data.id, name: formData.name });
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
          <DialogTitle>Editar Personal</DialogTitle>
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
              {BUTTON_NAME.UPDATE}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default PersonalEdit;
