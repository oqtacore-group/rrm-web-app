import { Candidate } from "./candidate";
import { Client } from "./client";
import { CandidateEvent } from "./other";

export class Vacancy {
  id: number = 0;
  Name?: string;
  Status?: string;
  ClientId!: number;
  WorkplaceNumber?: number;
  SalaryLowerEnd?: number;
  SalaryHighEnd?: number;
  SalaryCurrency?: string;
  Experience?: number;
  Location?: string;
  LocalTime?: string;
  RelocationHelp?: boolean;
  RemoteWorkPlace?: boolean;
  Notes?: string;
  CreatedBy?: number;
  active?: boolean;
  Responsibility?: string;
  Skills?: string;
  PersonalQuality?: string;
  Languages?: string;
  Opened?: boolean
}

export interface VacancyList {
  list: Vacancy[];
  client_list: Client[];
}
export interface VacancyProfile {
  data: Vacancy;
  currencyList: string[];
  clientList: Client[];
}

export class VacancyStatusList {
  list: VacancyStatus[] = [];
}

export interface VacancyStatus {
  VacancyId: number;
  StatusId: number;
  Name: string;
  CountSuccess: boolean;
  OrderId: number;
  CandidateCount: number;
  CreatedBy: number;
}

export interface EditCandidateVacancyStatus {
  vacancy_type_list: VacancyStatusType[];
  candidate: Candidate;
  vacancy: Vacancy;
  current_vacancy_status_id: number;
}

export interface VacancyStatusType {
  id: number;
  Name: string;
  CountSuccess: boolean;
  CountFail: boolean;
  OrderId: number;

  //Custom for Angular only
  failNumber: number;
  successNumber: number;
  totalNumber: number;

}

export interface VacancyState {
  VacancyId: number;
  Name: string;
  ClientName: string;
  ClientId: number;
  SuccessCount: number;
  WorkplaceNumber: number;
  CandidateCount: number;
  CreatedBy: number;
}

export interface CandidatesVacancyStatus {
  id: number;
  CandidateId: number;
  VacancyId: number;
  VacancyStatusId: number;
  Note: string;
}

export interface ChangeStatusData {
  vacancy: Vacancy;
  status_list: VacancyStatusType[];
  vacancyStatus: CandidatesVacancyStatus;
  candEvent: CandidateEvent;
  candidate: Candidate;
}