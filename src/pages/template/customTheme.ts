import { createTheme } from "@material-ui/core";
import { deepOrange, orange } from "@material-ui/core/colors";

const customTheme = createTheme({
  palette: {
    primary: {
      light: "#ffc947",
      main: "#ff9800",
      dark: "#c66900",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ff7539",
      main: "#ff3d00",
      dark: "#c30000",
      contrastText: "#000000",
    },
  },
  spacing: 8,
});
export default customTheme;
