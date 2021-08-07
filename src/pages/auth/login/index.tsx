import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./LoginValidation";
import { useHistory } from "react-router-dom";
import { AuthLogin } from "../../../auth";
import Footer from "./Footer";
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
    formState: { isValid },
  } = useForm<IFormInputs>({ resolver: yupResolver(loginSchema) });
  let history = useHistory();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    sendAuthCredentials(data);
    //reset({ email: "", password: "", remember: false });
  };
  const sendAuthCredentials = async (dataForm: IFormInputs) => {
    try {
      const response = await AuthLogin(dataForm);
      if (response) {
        history.push("/");
        reset({ email: "", password: "", remember: false });
      } else {
        console.log("fallo el login");
      }
    } catch (e) {
      console.log("fallo la autenticacion");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
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
              defaultValue={""}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
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
              defaultValue={""}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
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
              defaultValue={false}
              rules={{ required: true }}
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
              disabled={!isValid}
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
