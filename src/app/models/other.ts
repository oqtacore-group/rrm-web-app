import { Candidate } from "./candidate";
import { VacancyStatusType } from "./vacancy";

export interface StandartResponce {
  result: boolean;
  error: string;
  id: number;
  stringData: string;
}

//De facto copy of StandartResponce. Legacy class when they were different. And they may bacome different
export interface StandartCreatingResponce {
  result: boolean;
  error: string;
  id: number;
  stringData: string;
}

export interface AddClientResult {
  Success: boolean;
  error: string;
  Id: number;
}

export interface AddVacancyResult {
  Success: boolean;
  error: string;
  Id: number;
}

export interface ApiResponse {
  Success: boolean;
  error: string;
}

export interface CandidateEditResponce extends StandartResponce{
  candidateId: number;
}
export class ConfirmDialogInput {
  title: string | undefined;
  text: string | undefined;
}

export interface SearchResultList {
  candidateOutput: SearchResult[];
  clientOutput: SearchResult[];
  vacancyOutput: SearchResult[];
}
export interface SearchResult {
  id: number;
  Name: string;
}

export interface RecruiterStat {
  id: number;
  CandidateId: number;
  VacancyId: number;
  VacancyStatusId: number;
  StatusName: string;
  DateAdded: Date;
  CreatedBy: number;
  Success: boolean;
  Fail: boolean;
  AdminName: string;
}

export interface RecruiterStatModel {
  list: RecruiterStat[];
  statusList: VacancyStatusType[];
  distinctStat: RecruiterTotalDistinctStat;
}
export interface RecruiterTotalDistinctStat {
  totalCount: number;
 successCount: number;
 failCount: number;
    }


export interface CalendarModel {
  eventList: CandidateEvent[];
  eventTypeList: CandidateEventType[];
}
export interface EventProfileModel {
  eventData: CandidateEvent;
  candidateList: Candidate[];
  eventTypeList: CandidateEventType[];
}
export interface CandidateEvent {
  id: number;
  Date: Date;
  CandidateId: number;
  Caption: string;
  TypeId: number;
  Location: string;
  EventType: string;
  Completed: boolean;
  ZoomLink: string;
  CandidateName: string;
}




export interface CandidateEventType {
  id: number;
  Name: string;
  Description: string;

}

