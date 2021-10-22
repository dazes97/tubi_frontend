import { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import CompanyInterface from "./QuoteInterface";
import Layout from "../template";
import { NotificationSystem, SkeletonLoader } from "components";
import { CRUD_CODE, CRUD_MESSAGE, BUTTON_NAME, PAGE, CONSTANT } from "helpers";
import {
  QuoteCreate,
  QuoteTab,
  QuoteStatus,
  QuoteDetail,
  QuoteTimeLine,
} from "./components";
import {
  quoteCreate,
  quoteDelete,
  quoteList,
  quoteUpdate,
} from "./QuoteService";
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
        const response = await quoteList();
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
          await quoteCreate(formData);
          notificationMessage = CRUD_MESSAGE.CREATE.SUCCESS;
          break;
        case CRUD_CODE.UPDATE:
          await quoteUpdate(formData, formData.id);
          notificationMessage = CRUD_MESSAGE.UPDATE.SUCCESS;
          break;
        case CRUD_CODE.DELETE:
          await quoteDelete(formData.id);
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
      await quoteUpdate({ ...formData, newStatus: requestStatus }, formData.id);
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
              {PAGE.QUOTE.INDEX.NAME}
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
            <QuoteTab
              onChangeData={onChangeData}
              onChangeOpenModal={onChangeOpenModal}
              onChangeOperation={onChangeOperation}
              data={data}
              defaultTab={0}
            />
          )}
        </Grid>
        {operation && operation === CRUD_CODE.CREATE && (
          <QuoteCreate
            onSendDataToServer={onSendDataToServer}
            openModal={openModal}
            onReset={onReset}
          />
        )}
        {operation && operation === CRUD_CODE.EXTRA_1 && (
          <QuoteStatus
            onChangeRequestStatus={updateRequestStatus}
            openModal={openModal}
            data={dataForm}
            onReset={onReset}
          />
        )}
        {operation && operation === CRUD_CODE.EXTRA_2 && (
          <QuoteDetail
            openModal={openModal}
            data={dataForm}
            onReset={onReset}
          />
        )}
        {operation && operation === CRUD_CODE.EXTRA_3 && (
          <QuoteTimeLine
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
