import { API, URL } from "services";
import PackageInterface from "./PackageInterface";
export const packageList = async () => {
  const { data } = await API.GET(URL.PACKAGE.RESOURCE);
  return data;
};
export const packageCreate = async (dataForm: PackageInterface) => {
  const { data } = await API.POST(URL.PACKAGE.RESOURCE, dataForm);
  return data;
};
export const packageUpdate = async (dataForm: PackageInterface, id: string) => {
  const { data } = await API.UPDATE(URL.PACKAGE.RESOURCE, id, dataForm);
  return data;
};
export const packageDelete = async (id: string) => {
  const { data } = await API.DELETE(URL.PACKAGE.RESOURCE, id);
  return data;
};
