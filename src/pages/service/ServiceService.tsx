import { API, URL } from "services";
import ServiceInterface from "./ServiceInterface";
export const serviceList = async () => {
  const { data } = await API.GET(URL.SERVICE.RESOURCE);
  return data;
};
export const serviceListInBranch = async () => {
  const { data } = await API.GET(URL.SERVICE.SERVICES_IN_BRANCH);
  return data;
};

export const serviceCreate = async (dataForm: ServiceInterface) => {
  const { data } = await API.POST(URL.SERVICE.RESOURCE, dataForm);
  return data;
};
export const serviceUpdate = async (dataForm: ServiceInterface, id: string) => {
  const { data } = await API.UPDATE(URL.SERVICE.RESOURCE, id, dataForm);
  return data;
};
export const serviceDelete = async (id: string) => {
  const { data } = await API.DELETE(URL.SERVICE.RESOURCE, id);
  return data;
};
