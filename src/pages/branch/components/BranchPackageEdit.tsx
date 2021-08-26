import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { BUTTON_NAME } from "helpers";
import { packageList } from "pages/package/PackageService";
import { NotificationSystem } from "components";
import BranchPackageTable from "./BranchPackageTable";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}

const BranchPackageEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const [packagesList, setPackagesList] = useState(new Array<any>());
  const [packageOfBranch, setPackageOfBranch] = useState(
    data.services ? data.services.filter((e: any) => e.type === "2") : []
  );
  const [packagesToAddOrDelete, setPackagesToAddOrDelete] = useState({
    toDelete: new Array<any>(),
    toAdd: new Array<any>(),
  });
  const fetchPackagesList = async () => {
    try {
      const { data } = await packageList();
      setPackagesList(data);
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: "Hubo un error al listar los paquetes intente nuevamente",
      });
    }
  };
  useEffect(() => {
    fetchPackagesList();
  }, []);
  useEffect(() => {
    setPackagesToAddOrDelete({
      toDelete: new Array<any>(),
      toAdd: new Array<any>(),
    });
    setPackageOfBranch(
      data.services ? data.services.filter((e: any) => e.type === "2") : []
    );
  }, [data]);
  const onSubmit = () => {
    if (packageOfBranch.length > 0) {
      onSendDataToServer({
        id: data.id,
        packages: {
          toAdd: packagesToAddOrDelete.toAdd?.map((e: any) => e.id),
          toDelete: packagesToAddOrDelete.toDelete?.map((e: any) => e.id),
        },
      });
      closeForm();
    } else {
      NotificationSystem({
        type: "error",
        message: "Paquete debe tener al menos un servicio",
      });
    }
  };
  const deleteServiceFromPackage = (element: any) => {
    if (
      !packagesToAddOrDelete?.toDelete.find((e: any) => e.id === element.id)
    ) {
      setPackageOfBranch((prev: any) => {
        return prev.filter((e: any) => e.id !== element.id);
      });
      setPackagesToAddOrDelete((prev) => {
        return {
          ...prev,
          toDelete: [...prev.toDelete, element],
          toAdd: prev.toAdd.filter((e: any) => e.id !== element.id),
        };
      });
    }
  };
  const addPackageToBranch = (elementId: any) => {
    const findService = packagesList?.find((e: any) => e.id === elementId);
    if (!findService) return;
    //clean item from servicesToAddOrDelete and insert in a clean push
    setPackageOfBranch((prev: any) => {
      const reWriteArray = prev.filter((e: any) => e.id !== elementId) ?? [];
      reWriteArray.push(findService);
      return reWriteArray;
    });
    setPackagesToAddOrDelete((prev: any) => {
      let reWriteArrayAdd = prev.toAdd ?? [];
      if (!data?.services.find((e: any) => e.id === elementId)) {
        reWriteArrayAdd =
          prev.toAdd?.filter((e: any) => e.id !== elementId) ?? [];
        reWriteArrayAdd.push(findService);
      }
      const reWriteArrayDelete = prev.toDelete?.filter(
        (e: any) => e.id !== elementId
      );
      return {
        ...prev,
        toAdd: reWriteArrayAdd,
        toDelete: reWriteArrayDelete,
      };
    });
  };
  const closeForm = () => {
    onReset();
  };
  const resetDefaultValuesForm = () => {
    closeForm();
    setPackageOfBranch(
      data.services ? data.services.filter((e: any) => e.type === "2") : []
    );
    setPackagesToAddOrDelete({
      toDelete: new Array<any>(),
      toAdd: new Array<any>(),
    });
  };

  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetDefaultValuesForm}>
        <DialogTitle>Editar paquetes de sucursal</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <TextField
                autoFocus
                margin="dense"
                id="status"
                label="Paquetes"
                defaultValue={-1}
                select
                fullWidth
                variant="outlined"
                onChange={(e) => addPackageToBranch(e.target.value)}
              >
                <MenuItem key="-1" value={-1}>
                  Seleccionar
                </MenuItem>
                {packagesList &&
                  packagesList.map((e: any) => {
                    return (
                      <MenuItem key={e.id} value={e.id}>
                        {e.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={12}>
              {packageOfBranch && (
                <BranchPackageTable
                  onChangeData={(data: any) => deleteServiceFromPackage(data)}
                  data={packageOfBranch}
                />
              )}
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit()}
          >
            {BUTTON_NAME.UPDATE}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default BranchPackageEdit;
