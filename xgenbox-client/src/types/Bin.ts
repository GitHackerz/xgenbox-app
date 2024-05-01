import { Company, User } from "@/types/User";

export interface Bin {
  _id: string;
  type: string;
  weight: string;
  latitude: number;
  longitude: number;
  capacity: number;
  temperature: number;
  gaz: number;
  company: Company;
}

export interface BinAction {
  _id: string;
  bin: Bin;
  user: User;
  type: string;
  weight: string;
  createdAt: string;
  updatedAt: string;
}
