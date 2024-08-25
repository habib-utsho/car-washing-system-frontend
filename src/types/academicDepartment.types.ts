
export type TAcademicDepartment = {
  _id: string;
  name: string;
  shortName: string;
  totalStudent: number;
  totalFaculty: number;
  academicFaculty: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};
