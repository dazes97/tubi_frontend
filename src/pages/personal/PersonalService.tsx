import { API, URL } from "services";
import PersonalInterface from "./PersonalInterface";
export const personalList = async () => {
  const { data } = await API.GET(URL.PERSONAL.RESOURCE);
  return data;
};
export const personalCreate = async (dataForm: PersonalInterface) => {
  const { data } = await API.POST(URL.PERSONAL.RESOURCE, dataForm);
  return data;
};
export const personalUpdate = async (
  dataForm: PersonalInterface,
  id: string
) => {
  const { data } = await API.UPDATE(URL.PERSONAL.RESOURCE, id, dataForm);
  return data;
};
export const personalDelete = async (id: string) => {
  const { data } = await API.DELETE(URL.PERSONAL.RESOURCE, id);
  return data;
};
