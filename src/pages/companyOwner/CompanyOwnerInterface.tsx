export interface PersonalInterface {
  id: number;
  bornDate: string;
  address: string;
  companyId: string;
  dni: string;
  personalTypeId: string;
  user: userInterface;
  personalType: personalTypeInterface;
  company?: CompanyInterface;
}
interface userInterface {
  id: number;
  gender: number;
  email: string;
  lastName: string;
  name: string;
}
interface personalTypeInterface {
  id: number;
  name: string;
  companyId?: number;
}
interface CompanyInterface {
  id?: number;
  name: string;
  nit: string;
  status: string;
  mainAddress: string;
}

export default PersonalInterface;
