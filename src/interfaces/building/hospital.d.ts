import { IBuilding } from ".";

export interface IContractInfo {
  website: string;
  phone: string;
  email: string;
  address: string;
}

export interface IHospital extends IBuilding {}
