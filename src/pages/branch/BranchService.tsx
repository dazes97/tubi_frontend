import { API, URL } from "services";
import BranchInterface from "./BranchInterface";
export const branchList = async () => {
  const { data } = await API.GET(URL.BRANCH.RESOURCE);
  return data;
};
export const branchCreate = async (dataForm: BranchInterface) => {
  const { data } = await API.POST(URL.BRANCH.RESOURCE, dataForm);
  return data;
};
export const branchUpdate = async (dataForm: BranchInterface, id: string) => {
  const { data } = await API.UPDATE(URL.BRANCH.RESOURCE, id, dataForm);
  return data;
};
export const branchDelete = async (id: string) => {
  const { data } = await API.DELETE(URL.BRANCH.RESOURCE, id);
  return data;
};
