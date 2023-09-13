import { IBuilding } from ".";
import { IMaterial } from "../material";

export interface IPrinter {
  _id: string;
  name: string;
  manufacturer: string;
  model: string;
  model_number: string;
  serial_number: string;
  status: "Offline" | "Ready" | "Printing" | "Out Of Ink";
  installed_at: string;
}

export interface ILaboratory extends IBuilding {
  materials: IMaterial[];
  printers: IPrinter[];
}
