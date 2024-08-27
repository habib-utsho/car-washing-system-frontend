import { TUser } from "./index.type";
import { TService } from "./service.type";
import { TSlot } from "./slot.type";

export type TBooking = {
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
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
