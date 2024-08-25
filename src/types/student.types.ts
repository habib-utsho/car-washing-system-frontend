import { TAcademicDepartment } from "./academicDepartment.types";
import { TBloodGroup, TGender, TUser } from "./index.type";

export type TBatch = {
  _id: string;
  batch: number;
  totalStudent: number;
};

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface TGuardian {
  name: string;
  phone: string;
  age: string;
  email: string;
}

export type TAcademicInfo = {
  department: TAcademicDepartment;
  roll: number;
  batch: TBatch;
  admissionDate: string;
  graduationYear: Date | null;
  regSlNo: number;
  regCode: string;
  admissionYear: number;
};
export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  academicInfo: TAcademicInfo;
  name: TName;
  profileImg: string;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  phone: string;
  nid: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  bloodGroup: TBloodGroup;
  isDeleted: boolean;
};
