import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Layout from "../template";
const Dashboard = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>HOLA ESTE ES EL INICIO</Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default Dashboard;
