import { ILocation } from "../location";

export interface IContractInfo {
  website: string;
  phone: string;
  email: string;
  address: string;
}

export interface IHospital {
  _id: string;
  name: string;
  location: ILocation;
  director: string;
  contact_info: IContractInfo;
  capacity: number;
  created_at: string;
}
