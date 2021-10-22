import * as yup from "yup";
const createValidationSchema = yup.object().shape({
  quoteDescription: yup.string().min(1).max(500).required(),
  quoteType: yup.number().min(0).max(1).required(),
  clientName: yup.string().max(100).required(),
  clientLastName: yup.string().max(255).required(),
  clientEmail: yup.string().email().notRequired(),
  clientAddress: yup.string().max(255).notRequired(),
  clientPhone: yup.number().min(1).max(99999999999).notRequired(),
});
const updateStatusSchema = yup.object().shape({
  status: yup.number().min(0).required(),
  observation: yup.string().max(255),
});
export { createValidationSchema, updateStatusSchema };
