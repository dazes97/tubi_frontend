import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
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
  const [packageOfBranch, setPackageOfBranch] = useState([]);
  const [packagesToAddOrDelete, setPackagesToAddOrDelete] = useState({
    toDelete: new Array<any>(),
    toAdd: new Array<any>(),
    toChangeStatus: new Array<any>(),
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
      toChangeStatus: new Array<any>(),
    });
    setPackageOfBranch(
      data.services[0]
        ? data.services[0].filter((e: any) => e.type === "2")
        : []
    );
  }, [data]);
  const onSubmit = () => {
    onSendDataToServer({
      id: data.id,
      packages: {
        toAdd: packagesToAddOrDelete.toAdd?.map((e: any) => e.id),
        toDelete: packagesToAddOrDelete.toDelete?.map((e: any) => e.id),
        toChangeStatus: packagesToAddOrDelete.toChangeStatus?.map(
          (e: any) => e.id
        ),
      },
    });
    closeForm();
    //   if (packageOfBranch.length > 0) {
    // } else {
    //   NotificationSystem({
    //     type: "error",
    //     message: "Paquete debe tener al menos un servicio",
    //   });
    // }
  };
  const onChangeServiceStatus = (element: any, status: any) => {
    //update the view
    setPackageOfBranch((prev: any) => {
      let reWriteArray = prev;
      const objIndex = prev.findIndex((x: any) => {
        return x.id === element.id;
      });
      const updatedElement = { ...prev[objIndex], status };
      reWriteArray = [
        ...prev.slice(0, objIndex),
        updatedElement,
        ...prev.slice(objIndex + 1),
      ];
      return reWriteArray;
    });
    //update the array to update
    if (
      !packagesToAddOrDelete?.toChangeStatus?.find(
        (e: any) => e.id === element.id
      )
    ) {
      setPackagesToAddOrDelete((prev) => {
        return {
          ...prev,
          toChangeStatus: [...prev.toChangeStatus, element],
        };
      });
    } else {
      setPackagesToAddOrDelete((prev: any) => {
        return {
          ...prev,
          toChangeStatus: prev.toChangeStatus.filter(
            (e: any) => e.id !== element.id
          ),
        };
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
      if (prev.find((e: any) => e.id === elementId)) return prev;
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
      data.services[0]
        ? data.services[0].filter((e: any) => e.type === "2")
        : []
    );
    setPackagesToAddOrDelete({
      toDelete: new Array<any>(),
      toAdd: new Array<any>(),
      toChangeStatus: new Array<any>(),
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
                  onChangeServiceStatus={(data: any, status: any) => {
                    return onChangeServiceStatus(data, status);
                  }}
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
