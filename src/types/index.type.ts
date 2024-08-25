import { ReactNode } from "react";

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";
export type TGender = "male" | "female" | "other";

export type TRole = "student" | "faculty" | "admin";

export type TUser = {
  _id: string;
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: TRole;
  status: string;
  isDeleted: boolean;
};
export type TDecodedUser = {
  id: string;
  role: string;
  iat: number;
  exp: number;
};

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarRoute = {
  key: string;
  label: ReactNode;
  children?: TSidebarRoute[];
};

export type TRoutes = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRoutes[];
};

export type TMeta = {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
};
export type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
