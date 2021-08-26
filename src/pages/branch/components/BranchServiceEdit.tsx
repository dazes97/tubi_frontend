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
import { serviceList as serviceListFetch } from "pages/service/ServiceService";
import { NotificationSystem } from "components";
import BranchPackageTable from "./BranchPackageTable";
interface EditProps {
  data: any;
  openModal: boolean;
  onReset: any;
  onSendDataToServer: any;
}

const BranchServiceEdit = (props: EditProps) => {
  const { data, openModal, onReset, onSendDataToServer } = props;
  const [serviceList, setServiceList] = useState(new Array<any>());
  const [serviceOfBranch, setServiceOfBranch] = useState(
    data.services ? data.services.filter((e: any) => e.type === "1") : []
  );
  const [servicesToAddOrDelete, setServicesToAddOrDelete] = useState({
    toDelete: new Array<any>(),
    toAdd: new Array<any>(),
  });
  const fetchServiceList = async () => {
    try {
      const { data } = await serviceListFetch();
      setServiceList(data);
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: "Hubo un error al listar los servicios intente nuevamente",
      });
    }
  };
  useEffect(() => {
    fetchServiceList();
  }, []);
  useEffect(() => {
    setServicesToAddOrDelete({
      toDelete: new Array<any>(),
      toAdd: new Array<any>(),
    });
    setServiceOfBranch(
      data.services ? data.services.filter((e: any) => e.type === "1") : []
    );
  }, [data]);
  const onSubmit = () => {
    if (serviceOfBranch.length !== 0) {
      onSendDataToServer({
        id: data.id,
        services: {
          toAdd: servicesToAddOrDelete.toAdd?.map((e: any) => e.id),
          toDelete: servicesToAddOrDelete.toDelete?.map((e: any) => e.id),
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
      !servicesToAddOrDelete?.toDelete.find((e: any) => e.id === element.id)
    ) {
      setServiceOfBranch((prev: any) => {
        return prev.filter((e: any) => e.id !== element.id);
      });
      setServicesToAddOrDelete((prev) => {
        return {
          ...prev,
          toDelete: [...prev.toDelete, element],
          toAdd: prev.toAdd.filter((e: any) => e.id !== element.id),
        };
      });
    }
  };
  const addPackageToBranch = (elementId: any) => {
    const findService = serviceList?.find((e: any) => e.id === elementId);
    if (!findService) return;
    //clean item from servicesToAddOrDelete and insert in a clean push
    setServiceOfBranch((prev: any) => {
      const reWriteArray = prev.filter((e: any) => e.id !== elementId) ?? [];
      reWriteArray.push(findService);
      return reWriteArray;
    });
    setServicesToAddOrDelete((prev: any) => {
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
    setServiceOfBranch(
      data.services ? data.services.filter((e: any) => e.type === "1") : []
    );
    setServicesToAddOrDelete({
      toDelete: new Array<any>(),
      toAdd: new Array<any>(),
    });
  };

  return (
    <div>
      <Dialog fullWidth open={openModal} onClose={resetDefaultValuesForm}>
        <DialogTitle>Editar servicios de sucursal</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <TextField
                autoFocus
                margin="dense"
                id="status"
                label="Servicios"
                defaultValue={-1}
                select
                fullWidth
                variant="outlined"
                onChange={(e) => addPackageToBranch(e.target.value)}
              >
                <MenuItem key="-1" value={-1}>
                  Seleccionar
                </MenuItem>
                {serviceList &&
                  serviceList.map((e: any) => {
                    return (
                      <MenuItem key={e.id} value={e.id}>
                        {e.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={12}>
              {serviceOfBranch && (
                <BranchPackageTable
                  onChangeData={(data: any) => deleteServiceFromPackage(data)}
                  data={serviceOfBranch}
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
export default BranchServiceEdit;
