import * as yup from "yup";
const createValidationSchema = yup.object().shape({
  name: yup.string().max(50).required(),
  lastName: yup.string().max(50).required(),
  email: yup.string().email().required(),
  address: yup.string().max(50).required(),
  password: yup.string().min(6).max(50).required(),
  bornDate: yup.date().required(),
  dni: yup.string().required(),
  personalTypeId: yup.number().min(0).required(),
});
export { createValidationSchema };
