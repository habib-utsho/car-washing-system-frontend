import { TUser } from "./index.type";
import { TService } from "./service.type";
import { TSlot } from "./slot.type";

export type TBooking = {
  _id: string;
  customer: TUser;
  service: TService;
  slot: TSlot;
  vehicleType:
    | "car"
    | "truck"
    | "SUV"
    | "van"
    | "motorcycle"
    | "bus"
    | "electricVehicle"
    | "hybridVehicle"
    | "bicycle"
    | "tractor";
  date: Date;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  createdAt: string;
  updatedAt: string;
};
