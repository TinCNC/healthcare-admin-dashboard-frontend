export interface ICategory {
  id: number;
  title: string;
  description: string;
  created_at: string;
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
  identity_number: string;
  // username: string;
  first_name: string;
  last_name: string;
  dob: string;
  clinic: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface IProfile {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  dob: string;
  gender: string;
  country: string;
  created_at: string;
}

export interface ITechnician {
  id: number;
  profiles: IProfile;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ITechnicianView
  extends ITechnician,
    Omit<IProfile, "id" | "role"> {
  full_name: string;
}

export interface IDoctor {
  id: number;
  // username: string;
  // first_name: string;
  // last_name: string;
  departments: number[];
  clinics: number[];
  // departments_isnotnumber?: iDepartment[];
  // image: string;
  created_at: string;
  updated_at: string;
}

export interface IDoctorSalary {
  id: number;
  doctor_id: number;
  clinic: number;
  salary: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface IDoctorSalaryView extends IDoctorSalary {
  clinic_name: string;
}

export interface IDoctorView extends IDoctor, Omit<IProfile, "id" | "role"> {
  full_name: string;
  departments_name: string[];
  clinics_name: string[];
}

export interface IClinic {
  id: number;
  name: string;
  address: string;
  capacity: number;
  created_at: string;
}

export interface I3DObjectMetadata {
  title: string;
  type_of_object: string;
  style: string;
}

export interface I3DObject {
  id: number;
  name: string;
  main_file: string;
  cover: string;
  metadata: JSON;
  designer: number;
  size_x_mm: number;
  size_y_mm: number;
  size_z_mm: number;
  created_at: string;
  updated_at: string;
}

export interface IDiseasesGroup {
  id: number;
  group_name: string;
  icd10_code: string;
  vn_code: string;
  statistics: JSON;
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

export interface IPrescription {
  id: number;
  medicine: number;
  examination_record: number;
  quantity: number;
  notes: number;
  dosage: IDosage;
  created_at: string;
}

export interface IPrescriptionView extends IPrescription {
  medicine_name: string;
  medicine_brand: string;
  medicine_description: string;
  medicine_price: number;
  total_price: number;
}

interface IDosage {
  time: number;
  volume: number;
}

export interface IMedicine {
  id: number;
  name: string;
  brand: string;
  description: string;
  quantity: number;
  clinic: number;
  price: number;
  image: string;
  created_at: string;
}

export interface IOrder {
  id: number;
  product_id: number;
  object_id: number;
  laboratory: number;
  manufacturing_cost: number;
  material: number;
  delivery_time: number;
  status:
    | "Not Send"
    | "Pending"
    | "Payment Pending"
    | "Printed"
    | "Product Arrived";
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
  image: string;
  created_at: string;
}

export interface IProfessionalCertificatesView
  extends IProfessionalCertificates {
  creator_name: string;
  creator_type: string;
  validator_name: string;
  speciality_name: string;
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

export interface IExaminationRecord {
  id: number;
  name: string;
  disease: number;
  description: string;
  holder: number;
  examiner: number;
  status: string;
  reexamine_at: string;
  examined_at: string;
}

export interface IExaminationRecordView extends IExaminationRecord {
  examiner_name: string;
  clinic_name: string;
  disease_name: string;
  patient_name: string;
}
