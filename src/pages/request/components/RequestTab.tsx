import { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { RequestTable } from "./index";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface TabProps {
  data: any;
  defaultTab: number;
  onChangeData: any;
  onChangeOpenModal: any;
  onChangeOperation: any;
}
const RequestTab = (props: TabProps) => {
  const {
    data,
    defaultTab,
    onChangeData,
    onChangeOpenModal,
    onChangeOperation,
  } = props;
  const [value, setValue] = useState(defaultTab ?? 0);
  const [tableData, setTableData] = useState(data);

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    setTableData(
      data?.filter((e: any) => e.requestStatus === value?.toString())
    );
  }, [value, data]);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Request Categories"
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab label="Enviados" {...a11yProps(0)} />
          <Tab label="Aceptados" {...a11yProps(1)} />
          <Tab label="En Proceso" {...a11yProps(2)} />
          <Tab label="Finalizados" {...a11yProps(3)} />
          <Tab label="Entregados" {...a11yProps(4)} />
          <Tab label="Rechazados" {...a11yProps(5)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <RequestTable
          onChangeData={onChangeData}
          onChangeOpenModal={onChangeOpenModal}
          onChangeOperation={onChangeOperation}
          data={tableData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RequestTable
          onChangeData={onChangeData}
          onChangeOpenModal={onChangeOpenModal}
          onChangeOperation={onChangeOperation}
          data={tableData}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RequestTable
          onChangeData={onChangeData}
          onChangeOpenModal={onChangeOpenModal}
          onChangeOperation={onChangeOperation}
          data={tableData}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RequestTable
          onChangeData={onChangeData}
          onChangeOpenModal={onChangeOpenModal}
          onChangeOperation={onChangeOperation}
          data={tableData}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <RequestTable
          onChangeData={onChangeData}
          onChangeOpenModal={onChangeOpenModal}
          onChangeOperation={onChangeOperation}
          data={tableData}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <RequestTable
          onChangeData={onChangeData}
          onChangeOpenModal={onChangeOpenModal}
          onChangeOperation={onChangeOperation}
          data={tableData}
        />
      </TabPanel>
    </Box>
  );
};
export default RequestTab;
