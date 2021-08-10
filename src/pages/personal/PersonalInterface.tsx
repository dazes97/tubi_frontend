export interface PersonalInterface {
  id: string;
  bornDate: string;
  address: string;
  companyId: string;
  dni: string;
  personalTypeId: string;
  user: userInterface;
  personalType: personalTypeInterface;
}
interface userInterface {
  id: string;
  gender: string | null;
  email: string;
  lastName: string;
  name: string;
}
interface personalTypeInterface {
  id: string;
  name: string;
  companyId?: string;
}

export default PersonalInterface;
