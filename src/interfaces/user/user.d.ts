export interface IUserInfo {
  first_name: string;
  last_name: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  home_address: string;
  avatar: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  info: IUserInfo;
  created_at: string;
  updated_at: string;
}
