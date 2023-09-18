import { IHospital } from "../building";

export interface IMedicine {
  _id: string;
  name: string;
  brand: string;
  description: string;
  quantity: number;
  hospital: IHospital;
  price: number;
  image: string;
  created_at: string;
}
