import * as yup from "yup";
const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(50).required(),
});
export default loginSchema;
