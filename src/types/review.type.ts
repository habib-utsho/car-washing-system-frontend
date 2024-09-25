import { TUser } from "./index.type";

export type TReview = {
  _id: string;
  user: TUser;
  feedback: string;
  rating: number;
  updatedAt: string;
};
