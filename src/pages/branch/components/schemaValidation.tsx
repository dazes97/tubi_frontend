import * as yup from "yup";
const createValidationSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  description: yup.string().min(10).max(500).required(),
  address: yup.string().max(255).required(),
  type: yup.number().min(0).max(1).required(),
  status: yup.number().min(0).max(1).required(),
  attentionCapacity: yup.number().min(1).max(9999).required(),
});
const editValidationSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  description: yup.string().min(10).max(500).required(),
  address: yup.string().max(255).required(),
  type: yup.number().min(0).max(1).required(),
  status: yup.number().min(0).max(1).required(),
  attentionCapacity: yup.number().min(1).max(9999).required(),
});
export { createValidationSchema, editValidationSchema };
