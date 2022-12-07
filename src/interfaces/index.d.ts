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

export interface IMedicalSpeciality {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface IOrganization {
  id: number;
  name: string;
  type: string;
  address: string;
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

export interface IDiseasesGroup {
  id: number;
  group_name: string;
  icd10_code: string;
  vn_code: string;
  statistics: json;
  created_at: string;
}

export interface IDisease {
  id: number;
  name: string;
  scientific_name: string;
  other_name: string;
  classification: string;
  description: string;
  // body_part: string;
  body_parts: string[];
  severity: string;
  created_at: string;
}

export interface ILaboratory {
  id: number;
  name: string;
  address: string;
  director: number;
  speciality: number[];
  email: string;
  phone: string;
  website: string;
  workload_capacity: number;
  created_at: string;
}

export interface IOrder {
  id: number;
  product_id: number;
  laboratory: number;
  material: number;
  delivery_time: number;
  status: "Not Send" | "Pending" | "Printed" | "Product Arrived";
  quantity: number;
  created_at: string;
}

export interface IMaterial {
  id: number;
  laboratory: string;
  material_name: string;
  price: number;
  description: string;
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
  image: string;
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
  speciality: number;
  program: string;
  type:
    | "Medical Degree"
    | "Specialized Medical Degree"
    | "Permission of Medical Professional Practices";
  level: number;
  created_at: string;
}

export interface ITechnicianCertificates {
  id: number;
  name: string;
  description: string;
  issued_date: string;
  expired_date: string;
  issuer: number;
  validator: number;
  holder: string;
  // speciality: number;
  program: string;
  // type:
  //   | "Medical Degree"
  //   | "Specialized Medical Degree"
  //   | "Permission of Medical Professional Practices";
  level: number;
  created_at: string;
}

export interface IHealthStatusCertificates {
  id: number;
  name: string;
  disease: number;
  description: string;
  issuer: number;
  issued_date: string;
  expired_date: string;
  validator: number;
  holder: number;
  examiner: number;
  status: string;
  created_at: string;
}
