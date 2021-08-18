import { API, URL } from "services";
import CompanyInterface from "./CompanyInterface";
export const companyList = async () => {
  const { data } = await API.GET(URL.COMPANY.RESOURCE);
  return data;
};
export const companyCreate = async (dataForm: CompanyInterface) => {
  const { data } = await API.POST(URL.COMPANY.RESOURCE, dataForm);
  return data;
};
export const companyUpdate = async (dataForm: CompanyInterface, id: string) => {
  const { data } = await API.UPDATE(URL.COMPANY.RESOURCE, id, dataForm);
  return data;
};
export const companyDelete = async (id: string) => {
  const { data } = await API.DELETE(URL.COMPANY.RESOURCE, id);
  return data;
};
