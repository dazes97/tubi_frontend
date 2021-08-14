import { API, URL } from "services";
import CompanyOwnerInterface from "./CompanyOwnerInterface";
export const companyOwnerList = async () => {
  const { data } = await API.GET(URL.COMPANY_OWNER.RESOURCE);
  return data;
};
export const companyOwnerCreate = async (dataForm: CompanyOwnerInterface) => {
  const { data } = await API.POST(URL.COMPANY_OWNER.RESOURCE, dataForm);
  return data;
};
export const companyOwnerUpdate = async (
  dataForm: CompanyOwnerInterface,
  id: string
) => {
  const { data } = await API.UPDATE(URL.COMPANY_OWNER.RESOURCE, id, dataForm);
  return data;
};
export const companyOwnerDelete = async (id: string) => {
  const { data } = await API.DELETE(URL.COMPANY_OWNER.RESOURCE, id);
  return data;
};
