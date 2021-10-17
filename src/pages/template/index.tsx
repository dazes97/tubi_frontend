import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuItemsList } from "./TemplateListItem";
import { AppBar, Drawer } from "./index.style";
import RightMenu from "./TemplateRightMenu";
//import Badge from "@mui/material/Badge";
//import { useMediaQuery } from "@mui/material";
//import NotificationsIcon from "@mui/icons-material/Notifications";
//import customTheme from "./customTheme";
//import { ThemeProvider } from "@mui/system";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Tu Bicicleta Bolivia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function DashboardContent({ content }: any) {
  const [open, setOpen] = useState(false);
  //const matches = useMediaQuery("(min-width:600px)");
  //useEffect(() => {
  //setOpen(matches);
  //}, [matches]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    // <ThemeProvider theme={customTheme}>

    <Box sx={{ display: "flex" }}>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>

          <RightMenu />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <MenuItemsList />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container>
            <Paper style={{ width: "100%", height: "100%", padding: 24 }}>
              {content}
            </Paper>
          </Grid>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>

    // </ThemeProvider>
  );
}

export default function Layout({ children }: any) {
  return <DashboardContent content={children} />;
}
