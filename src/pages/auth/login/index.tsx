import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./LoginValidation";
import { useNavigate } from "react-router-dom";
import { AuthLogin } from "auth";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationSystem } from "components";
interface IFormInputs {
  email: string;
  password: string;
  remember?: boolean;
}
export default function Login() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  let navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    await sendAuthCredentials(data);
    reset({ email: "", password: "", remember: false });
  };
  const sendAuthCredentials = async (dataForm: IFormInputs) => {
    try {
      const loggedIn = await AuthLogin(dataForm);
      if (loggedIn) {
        navigate("/");
      } else {
        NotificationSystem({
          type: "error",
          message: "Hubo un problema intente nuevamente",
        });
      }
    } catch (e) {
      NotificationSystem({
        type: "error",
        message: "Credenciales Invalidas",
      });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesion
        </Typography>
        <Grid container sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.email?.type === "email"}
                  helperText={
                    errors.email?.type === "email" && "Email Requerido"
                  }
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.password?.type === "min"}
                  helperText={
                    errors.password?.type === "min" &&
                    "Contraseña Requerida"
                  }
                  margin="normal"
                  fullWidth
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Recuerdame"
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // disabled={!isValid}
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesion
            </Button>
          </form>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Olvido su contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"¿No tiene cuenta? Registrese"}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
