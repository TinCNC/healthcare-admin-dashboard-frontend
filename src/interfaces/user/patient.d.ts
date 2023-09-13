export interface IDiseaseHistory {
  _id: string;
  name: string;
  disease: number;
  description: string;
  holder: number;
  examiner: number;
  status: string;
  reexamine_at: string;
  examined_at: string;
}

export interface IPatient {
  _id: string;
  user_ref: IUser | number;
  // departments: number[];
  biography: string;
  disease_history: IDiseaseHistory[];
  // clinics: number[];
  created_at: string;
  updated_at: string;
}
