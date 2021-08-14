import * as yup from "yup";
const createValidationSchema = yup.object().shape({
  name: yup.string().max(50).required(),
  lastName: yup.string().max(50).required(),
  email: yup.string().email().required(),
  address: yup.string().max(50).required(),
  password: yup.string().min(8).max(50).required(),
  bornDate: yup.date().required(),
  dni: yup.string().required(),
});
const editValidationSchema = yup.object().shape({
  name: yup.string().max(50).required(),
  lastName: yup.string().max(50).required(),
  email: yup.string().email().required(),
  address: yup.string().max(50).required(),
  bornDate: yup.date().required(),
  dni: yup.string().required(),
  password: yup.string().when({
    is: (password: any) => password.length > 0,
    then: yup.string().min(8, "Contraseña al menos debe tener 8 caracteres"),
  }),
});
export { createValidationSchema, editValidationSchema };
