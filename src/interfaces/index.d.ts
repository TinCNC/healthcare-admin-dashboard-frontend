export interface ICategory {
  id: number;
  title: string;
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
