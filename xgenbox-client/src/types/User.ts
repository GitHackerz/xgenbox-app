import { CollectorAccountType, CompanyAccountType, UserType } from "@/enums";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface Employee extends User {
  role: UserType.EMPLOYEE;
}

export interface Collector extends User {
  role: UserType.COLLECTOR;
  company: string;
  accountType: CollectorAccountType;
}

export interface Company extends User {
  role: UserType.COMPANY;
  accountType: CompanyAccountType;
  companyName: string;
  address: string;
  city: string;
}
