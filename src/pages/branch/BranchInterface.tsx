export interface BranchInterface {
  id: number;
  name: string;
  address: string;
  description: string;
  attentionCapacity: number;
  type: number;
  lat: string;
  lon: string;
  status: number;
  services?: any;
}

export default BranchInterface;
