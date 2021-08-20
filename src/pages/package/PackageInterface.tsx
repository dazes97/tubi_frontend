export interface PackageInterface {
  id: number;
  name: string;
  price: number;
  description: string;
  status: number;
  services?: any;
}

export default PackageInterface;
