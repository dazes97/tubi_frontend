import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BUTTON_NAME } from "helpers";
import BranchPersonalTable from "./BranchPersonalTable";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
}
const BranchPersonalList = (props: EditProps) => {
  const { data, openModal, onReset } = props;

  const closeForm = () => {
    onReset();
  };
  const resetDefaultValuesForm = () => {
    closeForm();
  };
  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetDefaultValuesForm}>
        <DialogTitle>Personal asignado a esta sucursal</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              {data.personals[0] && (
                <BranchPersonalTable data={data.personals[0]} />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => resetDefaultValuesForm()}
          >
            {BUTTON_NAME.CLOSE}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default BranchPersonalList;
