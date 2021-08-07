import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Skeleton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Layout from "../template";
import NotificationSystem from "../../components/NotificationSystem";
import { CRUD_CODE, CRUD_MESSAGE } from "../../helpers";
import PersonalTypeTable from "./components/PersonalTypeTable";
import PersonalTypeEdit from "./components/PersonalTypeEdit";
import PersonalTypeDelete from "./components/PersonalTypeDelete";
import PersonalTypeCreate from "./components/PersonalTypeCreate";
import PersonalTypeInterface from "./PersonalTypeInterface";
import {
  personalTypeList,
  personalTypeCreate,
  personalTypeUpdate,
  personalTypeDelete,
} from "./PersonalTypeService";
const PersonalType = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState<PersonalTypeInterface>();
  const [data, setData] = useState([]);
  const [operation, setOperation] = useState<CRUD_CODE>();
  const [loading, setLoading] = useState(true);
  const onChangeData = (data: any) => {
    setDataForm(data);
  };
  const onChangeOpenModal = () => {
    setOpenModal((prev) => !prev);
  };
  const onReset = () => {
    onChangeOpenModal();
    setDataForm({ id: "", name: "" });
  };
  const onChangeOperation = (operation: CRUD_CODE) => {
    setOperation(operation);
  };
  const onChangeLoadingStatus = () => {
    setLoading((prev) => !prev);
  };
  const fetchData = async () => {
    try {
      if (!loading) onChangeLoadingStatus();
      const response = await personalTypeList();
      console.log("response: ", response);
      setData(response.data ?? []);
    } catch (e) {
      console.log("error: personalType: ", e);
      NotificationSystem({
        type: "error",
        message: CRUD_MESSAGE.READ.ERROR,
      });
    } finally {
      onChangeLoadingStatus();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const onSendDataToServer = async (formData: any) => {
    try {
      let response;
      let notificationMessage = "";
      switch (operation) {
        case CRUD_CODE.CREATE:
          response = await personalTypeCreate(formData);
          notificationMessage = CRUD_MESSAGE.CREATE.SUCCESS;
          break;
        case CRUD_CODE.UPDATE:
          response = await personalTypeUpdate(formData, formData.id);
          notificationMessage = CRUD_MESSAGE.UPDATE.SUCCESS;
          break;
        case CRUD_CODE.DELETE:
          response = await personalTypeDelete(formData.id);
          notificationMessage = CRUD_MESSAGE.DELETE.SUCCESS;
          break;
      }
      console.log("todo bien: ", response);
      fetchData();
      NotificationSystem({
        type: "success",
        message: notificationMessage,
      });
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: CRUD_MESSAGE.GENERAL.ERROR,
      });

      console.log("error: personalType: ", e);
    }
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Inicio
            </Link>
            <Typography color="text.primary">Tipo Personal</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              onChangeOperation(CRUD_CODE.CREATE);
              onChangeOpenModal();
            }}
          >
            Crear
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          {loading ? (
            <>
              <Skeleton animation="wave" height="500" width="100%" />
              <Skeleton animation="wave" height="200" width="100%" />
            </>
          ) : (
            <PersonalTypeTable
              onChangeData={onChangeData}
              onChangeOpenModal={onChangeOpenModal}
              onChangeOperation={onChangeOperation}
              data={data}
            />
          )}
        </Grid>
        {operation && operation === CRUD_CODE.CREATE && (
          <PersonalTypeCreate
            onSendDataToServer={onSendDataToServer}
            openModal={openModal}
            onReset={onReset}
          />
        )}
        {operation && operation === CRUD_CODE.UPDATE && (
          <PersonalTypeEdit
            onSendDataToServer={onSendDataToServer}
            openModal={openModal}
            data={dataForm}
            onReset={onReset}
          />
        )}
        {operation && operation === CRUD_CODE.DELETE && (
          <PersonalTypeDelete
            onSendDataToServer={onSendDataToServer}
            openModal={openModal}
            data={dataForm}
            onReset={onReset}
          />
        )}
      </Grid>
    </Layout>
  );
};
export default PersonalType;
