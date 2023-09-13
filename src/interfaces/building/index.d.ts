export * from "./hospital";
export * from "./laboratory";

export interface IBuilding {
  _id: string;
  name: string;
  location: ILocation;
  director: string;
  contact_info: IContractInfo;
  capacity: number;
  created_at: string;
}
