import { ContactData } from './clientcontact';
import { CandidateEvent } from './other';
import { Vacancy, VacancyStatusType } from "./vacancy";

export interface Candidate {
  id: number;
  Name: string;
  PhoneNumber: string;
  Email: string;
  SiteUrl: string;
  ContactDataId: number;
  Note: string;
  Sex: string;
  DateOfBirth: Date;
  Location: string;
  RelocationReady: boolean;
  RemoteWorkplaceReady: boolean;
  SalaryWish: number;
  SalaryCurrency: string;
  PhotoUrl: string;
  MainSkill: string;
  Leader: boolean;
  HowKnowAboutVacancy: string;
  CreatedBy: number;
  HHurl: string;
  lastjob_position: string;
  lastjob_company: string;
  salary: string;
  resume_text: string;
  favorite: boolean;

}

export interface CandidateList {
  list: Candidate[];

}

export interface CurrentVacancyStatusListViewModel {
  id: number;
  CandidateId: number;
  VacancyId: number;
  VacancyStatusId: number;
  StatusName: string;
  DateAdded: Date;
  Note: string;
  VacancyName: string;
  ClientName: string;
  ClientId: number;
  CountSuccess: boolean;
  CandidateName: string;
}

interface Dictionary<T> {
  [Key: number]: T;
}


export interface CandidateDragList {
  list: CurrentVacancyStatusListViewModel[];
  filtered_list: Dictionary<CurrentVacancyStatusListViewModel[]>;
}


export interface Vacancy_status {
  DateAdded: Date;
  id: number;
  Note: string;
  CandidateId: number;
  VacancyId: number;
  StatusName: string;
  VacancyStatusId: number;
  VacancyName: string;
  ClientId: number;
  ClientName: string;
}


export interface AddVacancyData {
  vacancyId: number;
  note: string;
}
export interface AddVacancyDialogData {
  candidate_data: Candidate;
  vacancy_list: AddVacancyData[];
}

export class CandidateProfile {
  data!: Candidate;
  contactData!: ContactData;
  image: any;
  currencyList!: string[];
  vacancy_status_state_list!: Vacancy_status[];
  vacancy_list!: Vacancy[];
  status_list!: VacancyStatusType[];
  event_list!: CandidateEvent[];
  headHunterData!: HeadHunterData;
  headHunterJobExperienceDatas!: HeadHunterJobExperienceData[];
  linkedin_data!: LinkedinParsedData;
  linkedin_edu_list!: LinkedinParsedEducation[];
  linkedin_resume_list!: LinkedinParsedResume[];
  file_list!: file_resource[];
}


export interface file_resource {
  candidateId: number;
  file: any;
  fileName: any;
  fileUrl: string;
  DateAdded: Date;
  id: number;
}  

export class LinkedinData {
  profile!: LinkedinParsedData;
  resume_list: LinkedinParsedResume[] = [];
  edu_list: LinkedinParsedEducation[] = [];
}

export class LinkedinParsedData {
  DateBirth!: string;
  FirstName!: string;
  LastName!: string;

  // TO DO HAMID
  Name: string = this.FirstName + " - " + this.LastName;

  Position!: string;
  About!: string;
  LocationName!: string;
  LanguageSummary!: string;
  SkillSummary!: string;
  IndustrySummary!: string;
  Profile_url!: string;
}


export class LinkedinParsedResume {
  id?: number;
  Title?: string;
  CompanyName?: string;
  StartDate?: Date;
  EndDate?: Date;
  LocationName?: string;

  // TO DO HAMID
  DatePeriod: string = this.StartDate + " - " + this.EndDate;
}


export class LinkedinParsedEducation {
  
  //TO DO HAMID
  id?: number;
  DatePeriod: string = this.YearStart + " - " + this.YearEnd;

  YearStart?: number;
  YearEnd?: number;
  schoolName?: string;
  fieldOfStudy?: string;
  degreeName?: string;
  grade?: string;
  
}

export class HeadHunterJobExperienceData {
  // TO DO HAMID
  id: number = 0;
  
  HhId: number = 0;
  startDate: string = '';
  endDate: string = '';
  companyName: string = '';
  position: string = '';
  description: string = '';
  companyAreaTitle: string = '';
  periodDate: string = this.startDate + ' - '+ this.endDate;
}
export interface HeadHunterData {
  CandidateId: number;
  Location: string;
  Skills: string;
  About: string;
  Employment: string;
  Relocation: string;
  Position: string;
  totalExperience: string;
  CreatedBy: string;
  ProfileUrl: string;

}
