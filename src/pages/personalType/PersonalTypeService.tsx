import { API, URL } from "services";
import PersonalTypeInterface from "./PersonalTypeInterface";
export const personalTypeList = async () => {
  const { data } = await API.GET(URL.PERSONAL_TYPE.RESOURCE);
  return data;
};
export const personalTypeCreate = async (dataForm: PersonalTypeInterface) => {
  const { data } = await API.POST(URL.PERSONAL_TYPE.RESOURCE, dataForm);
  return data;
};
export const personalTypeUpdate = async (
  dataForm: PersonalTypeInterface,
  id: string
) => {
  const { data } = await API.UPDATE(URL.PERSONAL_TYPE.RESOURCE, id, dataForm);
  return data;
};
export const personalTypeDelete = async (id: string) => {
  const { data } = await API.DELETE(URL.PERSONAL_TYPE.RESOURCE, id);
  return data;
};
