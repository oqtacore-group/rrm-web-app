import { Vacancy } from "./vacancy";

export class Client {
  id: number = 0;
  Name?: string;
  PhoneNumber?: string;
  SiteUrl?: string;
  Email?: string;
  Created?: Date;
}

export interface ClientList {
  list: Client[];
}

export interface ClientProfile {
  data: Client;
  vacancy_list: Vacancy[];
}

export interface ClientStateList {

  fullList: Client[];
  listWithoutVacancy: Client[];
  listWithActiveVacancy: Client[];
  listWithoutActiveVacancy: Client[];
}

export interface ClientStateSummary {
  name: string;
  clientCount: number;
}