import { IUser } from "./user";

export interface ICertificate {
  _id: string;
  name: string;
  // description: string;
  issued_date: string;
  expired_at: string;
  issuer: number;
  validator: number;
  program: string;
  type:
    | "Medical Degree"
    | "Specialized Medical Degree"
    | "Permission of Medical Professional Practices";
  level: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface IWorkHistory {
  hospital: string;
  salary: number;
  start_date: string;
  end_date: string;
}

export interface IDoctor {
  _id: string;
  user_ref: IUser;
  departments: number[];
  biography: string;
  // clinics: number[];
  work_history: IWorkHistory[];
  certificates: ICertificate[];
  created_at: string;
  updated_at: string;
}
