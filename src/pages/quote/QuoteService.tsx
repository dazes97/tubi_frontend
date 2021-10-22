import { API, URL } from "services";
import QuoteInterface from "./QuoteInterface";
export const quoteList = async () => {
  const { data } = await API.GET(URL.QUOTE.RESOURCE);
  return data;
};
export const quoteCreate = async (dataForm: QuoteInterface) => {
  const { data } = await API.POST(URL.QUOTE.RESOURCE, dataForm);
  return data;
};
export const quoteUpdate = async (dataForm: QuoteInterface, id: string) => {
  const { data } = await API.UPDATE(URL.QUOTE.RESOURCE, id, dataForm);
  return data;
};
export const quoteDelete = async (id: string) => {
  const { data } = await API.DELETE(URL.QUOTE.RESOURCE, id);
  return data;
};
