import * as yup from "yup";
const createValidationSchema = yup.object().shape({
  bikeBrand: yup.string().max(100).required(),
  bikeColor: yup.string().max(100).required(),
  bikeModel: yup.string().max(100).required(),
  bikeObservation: yup.string().max(255).notRequired(),
  bikeWheelSize: yup.number().min(1).max(50).required(),
  clientName: yup.string().max(100).required(),
  clientLastName: yup.string().max(255).required(),
  //clientAddress: yup.string().max(255).required(),
  //clientAddressDetail: yup.string().max(255),
  //clientPhone: yup.number().min(1).max(999999999).required(),
  //requestDeliveryDate: yup.date().required(),
});
const updateStatusSchema = yup.object().shape({
  status: yup.number().min(0).required(),
  observation: yup.string().max(255),
});
export { createValidationSchema, updateStatusSchema };
