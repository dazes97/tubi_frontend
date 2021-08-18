import * as yup from "yup";
const createValidationSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  description: yup.string().min(10).max(500).required(),
  price: yup.number().min(1).max(99999).required(),
  status: yup.number().min(0).max(1).required(),
});
const editValidationSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  description: yup.string().min(10).max(500).required(),
  price: yup.number().min(1).max(99999).required(),
  status: yup.number().min(0).max(1).required(),
});
export { createValidationSchema, editValidationSchema };
