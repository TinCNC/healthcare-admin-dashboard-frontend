import { IDisease } from "..";
import { IDoctor } from "./doctor";
import { IUser } from "./user";

interface IDosage {
  time: number;
  volume: number;
}

export interface IPrescription {
  id: string;
  medicine: number;
  quantity: number;
  notes: number;
  dosage: IDosage;
  created_at: string;
}

export interface IDiseaseHistory {
  _id: string;
  name: string;
  disease: IDisease;
  description: string;
  examiner: IDoctor;
  prescription: IPrescription[];
  reexamine_at: string;
  examined_at: string;
}

export interface IPatient {
  _id: string;
  user_ref: IUser;
  // departments: number[];
  biography: string;
  disease_history: IDiseaseHistory[];
  // hospitals: number[];
  created_at: string;
  updated_at: string;
}
