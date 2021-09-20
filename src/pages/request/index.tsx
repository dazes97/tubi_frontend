import { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import AddIcon from "@material-ui/icons/Add";
import CompanyInterface from "./RequestInterface";
import Layout from "../template";
import RequestTab from "./components/RequestTab";
import RequestStatus from "./components/RequestStatus";
import RequestDetail from "./components/RequestDetail";
import RequestTimeLine from "./components/RequestTimeLine";
import { NotificationSystem, SkeletonLoader } from "components";
import { CRUD_CODE, CRUD_MESSAGE, BUTTON_NAME, PAGE, CONSTANT } from "helpers";
import { RequestCreate } from "./components";
import {
  requestCreate,
  requestDelete,
  requestList,
  requestUpdate,
} from "./RequestService";
const Request = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState<CompanyInterface>();
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
  };
  const onChangeOperation = (operation: CRUD_CODE) => {
    setOperation(operation);
  };
  const fetchData = useCallback(() => {
    try {
      setLoading(true);
      setTimeout(async () => {
        const response = await requestList();
        setData(response.data?.length > 0 ? response.data : []);
        setLoading(false);
      }, CONSTANT.DEFAULT_TIME_OUT);
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: CRUD_MESSAGE.READ.ERROR,
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const onSendDataToServer = async (formData: any) => {
    try {
      let notificationMessage = "";
      switch (operation) {
        case CRUD_CODE.CREATE:
          await requestCreate(formData);
          notificationMessage = CRUD_MESSAGE.CREATE.SUCCESS;
          break;
        case CRUD_CODE.UPDATE:
          await requestUpdate(formData, formData.id);
          notificationMessage = CRUD_MESSAGE.UPDATE.SUCCESS;
          break;
        case CRUD_CODE.DELETE:
          await requestDelete(formData.id);
          notificationMessage = CRUD_MESSAGE.DELETE.SUCCESS;
          break;
      }
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
    }
  };
  const updateRequestStatus = async (formData: any, requestStatus: any) => {
    try {
      await requestUpdate(
        { ...formData, newStatus: requestStatus },
        formData.id
      );
      fetchData();
      NotificationSystem({
        type: "success",
        message: CRUD_MESSAGE.UPDATE.SUCCESS,
      });
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: CRUD_MESSAGE.GENERAL.ERROR,
      });
    }
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={PAGE.INDEX.URL}>
              {PAGE.INDEX.NAME}
            </Link>
            <Typography color="text.primary">
              {PAGE.REQUEST.INDEX.NAME}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            style={{ margin: 16 }}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              onChangeOperation(CRUD_CODE.CREATE);
              onChangeOpenModal();
            }}
          >
            {BUTTON_NAME.CREATE}
          </Button>
        </Grid>

        {loading && <SkeletonLoader type="table" />}
        <Grid item xs={12} md={12}>
          {!loading && (
            <RequestTab
              onChangeData={onChangeData}
              onChangeOpenModal={onChangeOpenModal}
              onChangeOperation={onChangeOperation}
              data={data}
              defaultTab={0}
            />
          )}
        </Grid>
        {operation && operation === CRUD_CODE.CREATE && (
          <RequestCreate
            onSendDataToServer={onSendDataToServer}
            openModal={openModal}
            onReset={onReset}
          />
        )}
        {operation && operation === CRUD_CODE.EXTRA_1 && (
          <RequestStatus
            onChangeRequestStatus={updateRequestStatus}
            openModal={openModal}
            data={dataForm}
            onReset={onReset}
          />
        )}
        {operation && operation === CRUD_CODE.EXTRA_2 && (
          <RequestDetail
            openModal={openModal}
            data={dataForm}
            onReset={onReset}
          />
        )}
        {operation && operation === CRUD_CODE.EXTRA_3 && (
          <RequestTimeLine
            openModal={openModal}
            data={dataForm}
            onReset={onReset}
          />
        )}
      </Grid>
    </Layout>
  );
};
export default Request;
