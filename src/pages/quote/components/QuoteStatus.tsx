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
import { BUTTON_NAME, QUOTE_CODE } from "helpers";
interface UpdateQuoteStatusInterface {
  data: any;
  openModal: boolean;
  onReset: any;
  onChangeRequestStatus: any;
}
interface QuoteStatusInterface {
  status: number;
  observation: string;
}
const QuoteStatus = (props: UpdateQuoteStatusInterface) => {
  const { data, openModal, onReset, onChangeRequestStatus } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<QuoteStatusInterface>({
    resolver: yupResolver(updateStatusSchema),
  });
  useEffect(() => {
    reset({
      status: -1,
    });
  }, [data, reset]);
  const resetDefaultValuesForm = () => {
    closeForm();
    reset({
      status: -1,
    });
  };
  const onSubmit: SubmitHandler<QuoteStatusInterface> = (formData) => {
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
          {"Cambiar Estado Cotizacion"}
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
                    {Object.keys(QUOTE_CODE).map((k, i) => {
                      if (
                        Number(Object.values(QUOTE_CODE)[i].CODE) ===
                          Number(QUOTE_CODE.PROCESS.CODE) &&
                        Number(QUOTE_CODE.PROCESS.CODE) ===
                          Number(data.quoteStatus)
                      ) {
                        return (
                          <MenuItem
                            value={QUOTE_CODE.PROCESS.CODE}
                            key={QUOTE_CODE.PROCESS.CODE}
                          >
                            {QUOTE_CODE.PROCESS.NAME}
                          </MenuItem>
                        );
                      }
                      if (
                        Number(Object.values(QUOTE_CODE)[i].CODE) <=
                        Number(data.quoteStatus)
                      )
                        return null;

                      return (
                        <MenuItem
                          value={Object.values(QUOTE_CODE)[i].CODE}
                          key={i}
                        >
                          {Object.values(QUOTE_CODE)[i].NAME}
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
          <Button variant="contained" color="primary" type="submit">
            {BUTTON_NAME.UPDATE}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default QuoteStatus;
