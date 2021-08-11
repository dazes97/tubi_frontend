export interface PersonalInterface {
  id: number;
  bornDate: string;
  address: string;
  companyId: string;
  dni: string;
  personalTypeId: string;
  user: userInterface;
  personalType: personalTypeInterface;
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

export default PersonalInterface;
