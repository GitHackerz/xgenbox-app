import { CollectorAccountType, CompanyAccountType, UserType } from "@/enums";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserType;
  status: string;
}

export interface Employee extends User {
  role: UserType.EMPLOYEE;
  company: Company | null;
}

export interface Collector extends User {
  role: UserType.COLLECTOR;
  company: Company | null;
  accountType: CollectorAccountType;
}

export interface Company extends User {
  role: UserType.COMPANY;
  accountType: CompanyAccountType;
  companyName: string;
  address: string;
  city: string;
}
