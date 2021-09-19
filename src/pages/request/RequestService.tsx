import { API, URL } from "services";
import RequestInterface from "./RequestInterface";
export const requestList = async () => {
  const { data } = await API.GET(URL.REQUEST.RESOURCE);
  return data;
};
export const requestCreate = async (dataForm: RequestInterface) => {
  const { data } = await API.POST(URL.REQUEST.RESOURCE, dataForm);
  return data;
};
export const requestUpdate = async (dataForm: RequestInterface, id: string) => {
  const { data } = await API.UPDATE(URL.REQUEST.RESOURCE, id, dataForm);
  return data;
};
export const requestDelete = async (id: string) => {
  const { data } = await API.DELETE(URL.REQUEST.RESOURCE, id);
  return data;
};
