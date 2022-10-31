export interface ICategory {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  createdAt: string;
  category: { id: number };
}

export interface IDepartment {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface IPatient {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  clinic: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ITechnician {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface IDoctor {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  departments: number[];
  image: string;
  created_at: string;
  updated_at: string;
}

export interface IClinic {
  id: number;
  name: string;
  address: string;
  capacity: number;
  created_at: string;
}

export interface IDisease {
  id: number;
  name: string;
  scientific_name: string;
  other_name: string;
  classification: string;
  body_part: string;
  severity: string;
  created_at: string;
}

export interface ILaboratory {
  id: number;
  name: string;
  location: string;
  director: string;
  speciality: number[];
  email: string;
  phone: string;
  website: string;
  workload_capacity: string;
  created_at: string;
}

export interface IProduct {
  id: number;
  name: string;
  category: number;
  application: string;
  description: string;
  manufacturing_cost: number[];
  sale_price: string;
  created_at: string;
}

export interface IProfessionalCertificates {
  id: number;
  name: string;
  description: string;
  issued_date: string;
  expired_at: string;
  creator: number;
  validator: number;
  holder: string;
  program: string;
  level: number;
  created_at: string;
}

export interface IHealthStatusCertificates {
  id: number;
  name: string;
  disease: string;
  description: string;
  issuer: string;
  issued_date: string;
  expired_at: string;
  validator: number;
  holder: number;
  examiner: number;
  created_at: string;
}
