import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Client, ClientList, ClientProfile, StandartResponce, ContactData, Recruiter, ClientStateSummary, SearchResultList, CandidateEditResponce, RecruiterStatModel, CalendarModel, EventProfileModel, CandidateEvent, StandartCreatingResponce, ChangeStatusData, AddClientResult, ApiResponse, AddVacancyResult } from '../models';
import { Candidate, CandidateList, CandidateProfile, AddVacancyData } from '../models';
import { ClientContact, ClientContactList, ClientContactProfile } from '../models';
import { Vacancy, VacancyList, VacancyProfile, VacancyStatusList, VacancyState } from '../models';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

class editVacancyProfileInput {
  id: number = 0;
  data: Vacancy | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  constructor(private client: HttpClient, private authenticationService: AuthenticationService) { }

  LogIn(login: string, password: string, rememberMe: boolean) {
    let input = {
      Email: login,
      Password: password,
      RememberMe: rememberMe
    }

    return this.client.post<StandartResponce>(`${environment.apiUrl}/Account/Login`, input);
  }

  LogOut() {
    this.authenticationService.logout();
    //return this.client.post<StandartResponce>(`${environment.apiUrl}/Account/LogOff`, null);
  }

  isAuthed() {
    return this.client.get<boolean>(`${environment.apiUrl}/api/Auth/IsAuthenticated`);
  }

  getClientList() {
    return this.client.post<ClientList>(`${environment.apiUrl}/Admin/GetClientList?`, null);
  }

  getCandidateList(vacancy_id: number = 0, vacancy_status_id:number=0) {
    return this.client.get<CandidateList>(`${environment.apiUrl}/Admin/GetCandidateList?vacancy_id=${vacancy_id}&vacancy_status_id=${vacancy_status_id}`);
  }

  getRecruiterList() {
    return this.client.get<Recruiter[]>(`${environment.apiUrl}/Admin/getRecruiterList?`);
  }
  getCurrentRecruiterId() {
    return this.client.get<number>(`${environment.apiUrl}/Admin/getCurrentRecruiterId?`);
  }
  getCurrentRecruiter() {
    return this.client.get<Recruiter>(`${environment.apiUrl}/Admin/getCurrentRecruiter?`);
  }

  getRecruiterStatModel(recruiterid: number, startDate: Date, endDate: Date) {
    let input = {
      recruiterId: Number(recruiterid),
      startTime: startDate,
      endTime: endDate
    }
    return this.client.post<RecruiterStatModel>(`${environment.apiUrl}/Admin/getRecruiterStatistic?`, input);
  }

  getCalendarData() {
    let input = {
      startTime: null,
      endTime: null
    }
    return this.client.post<CalendarModel>(`${environment.apiUrl}/Admin/getCalendarData?`, input);
  }

  getEventData(id: number) {
    return this.client.get<EventProfileModel>(`${environment.apiUrl}/Admin/getEventData?id=${id}`);
  }

  getVacancyList(candidateId: number = 0) {
    return this.client.get<VacancyList>(`${environment.apiUrl}/Admin/GetVacancyList?candidateId=${candidateId}`);
  }

  getVacancyStateList(clientid: number = 0) {
    return this.client.get<VacancyState[]>(`${environment.apiUrl}/Admin/GetVacancyStateList?clientid=${clientid}`);
  }

  getClientContactList(id: number) {
    return this.client.get<ClientContactList>(`${environment.apiUrl}/Admin/GetClientContactList?id=${id}`);
  }

  getVacancyStatusList(vacancy_id: number) {
    return this.client.get<VacancyStatusList>(`${environment.apiUrl}/Admin/GetVacancyStatusTypeList?vacancy_id=${vacancy_id}`);
  }
  Search( search_text:string) {
    return this.client.get<SearchResultList>(`${environment.apiUrl}/Admin/Search?search_text=${search_text}`);
  }

  addClientProfile(data: Client) {

    return this.client.post<AddClientResult>(`${environment.apiUrl}/api/Clients?`, data);
  }

  editClientProfile(id: number, data: Client) {

    return this.client.put<ApiResponse>(`${environment.apiUrl}/api/Clients/${id}?`, data);
  }

  editCandidateEvent( event_data: CandidateEvent) {
    let input = {
      event_data: event_data,

    }
    input.event_data.id = Number(input.event_data.id);
    input.event_data.CandidateId = Number(input.event_data.CandidateId);
    input.event_data.TypeId = Number(input.event_data.TypeId);

    return this.client.post<StandartCreatingResponce>(`${environment.apiUrl}/Admin/editCandidateEvent?`, input);
  }

  editFavoriteState(id: number, favorite: boolean) {
    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/editFavoriteState?candidateId=${id}&favorite=${favorite}`, null);
  }

  addFileToCandidate(candidateid: number, file: any, file_name: string) {

    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('_file_name',  file_name);
    formData.append("candidateid", JSON.stringify(candidateid));

    return this.client.post<StandartCreatingResponce>(`${environment.apiUrl}/Admin/addFileToCandidate?`, formData);
  }

  deleteFileToCandidate(candidateid: number, file_id: number) {
    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/deleteFileToCandidate?candidateId=${candidateid}&file_id=${file_id}`, null);
  }

  parseHeadHunterProfile(candidateId: number, resumeLink: string) {
    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/ParseHeadHunterProfile?candidateId=${candidateId}&resumeLink=${resumeLink}`, null);
  }

  addVacancyProfile(data: Vacancy) {
    data.ClientId = Number(data.ClientId);
    data.WorkplaceNumber = Number(data.WorkplaceNumber);
    data.SalaryLowerEnd = Number(data.SalaryLowerEnd);
    data.SalaryHighEnd = Number(data.SalaryHighEnd);
    data.Experience = Number(data.Experience);
    data.CreatedBy = Number(data.CreatedBy);

    return this.client.post<AddVacancyResult>(`${environment.apiUrl}/api/Vacancies`, data);
  }

  editVacancyProfile(id: number, data: Vacancy) {
    data.ClientId = Number(data.ClientId);
    data.id = Number(data.id);
    data.WorkplaceNumber = Number(data.WorkplaceNumber);
    data.SalaryLowerEnd = Number(data.SalaryLowerEnd);
    data.SalaryHighEnd = Number(data.SalaryHighEnd);
    data.Experience = Number(data.Experience);
    data.CreatedBy = Number(data.CreatedBy);

    return this.client.put<ApiResponse>(`${environment.apiUrl}/api/Vacancies/${id}`, data);
  }

  editCandidateProfile(id: number, data: CandidateProfile, vacancyData: AddVacancyData[] = [], headhunter_url: string = '', _file: any = null, _file_name: string = '') {
    console.log(data, JSON.stringify(data));
    let formData = new FormData();
    formData.append('id', JSON.stringify(Number(id)));
    formData.append('_data', JSON.stringify(data));
    formData.append('vacancy_data', JSON.stringify(vacancyData));
    formData.append('resumeLink', headhunter_url);
    if (_file) {
      formData.append('file', _file, _file.name);
      formData.append('file_name', _file_name);
    } else {
      //formData.append('file', null);
      //formData.append('file_name', null);
    }

    return this.client.post<CandidateEditResponce>(`${environment.apiUrl}/Admin/EditCandidateProfile?`, formData);
  }

  editCandidateCommentToVacancy(vacancyId: number, candidateId: number, note: string ) {
    let input = {
      vacancyId: Number(vacancyId),
        candidateId: Number(candidateId),
      note: note
    }

    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/editCandidateCommentToVacancy?`, input);
  }


  editCandidateStatusToVacancy(vacancyId: number, candidateId: number, statusId: number,note:string) {
    let input = {
      vacancyId: Number(vacancyId),
      candidateId: Number(candidateId),
      statusId: Number(statusId),
      note: note
    }

    return this.client.post<StandartResponce>(`${environment.apiUrl}/api/Candidates/ChangeVacancyStatus?`, input);
  }

  addCandidateToVacancy(candidate: Candidate, vacancyId: number, note: string) {
    let input = {
      vacancyId: Number(vacancyId),
      candidateId: Number(candidate.id),
      note: note
    }

    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/addCandidateToVacancy?`, input);
  }

  ChangeVacancyState(vacancyid: number, open: boolean) {
    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/ChangeVacancyState?vacancy_id=${vacancyid}&open=${open}`, null);
  }

  getSettingValue(settingName: string) {
    return this.client.get<StandartCreatingResponce>(`${environment.apiUrl}/Admin/GetSettingValue?settingName=${settingName}`);
  }

  editClientContactProfile(client_id:number, id: number, data: ClientContact, contactData: ContactData) {
    let input = {
      client_id: Number(client_id),
      id: Number(id),
      data: data,
      contactData: contactData ? contactData : new ContactData()
    }
    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/editClientContacts?`, input);
  }

  getClientProfile(id: number) {
    return this.client.get<ClientProfile>(`${environment.apiUrl}/Admin/GetClientProfile?id=${id}`);
  }
  getCandidateProfile(id: number) {
    return this.client.post<CandidateProfile>(`${environment.apiUrl}/Admin/GetCandidateProfile?id=${id}`,null);
  }

  clearLinkedin(id: number) {
    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/ClearLinkedin?id=${id}`, null);
  }

  clearHeadHunter(id: number) {
    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/ClearHeadHunter?id=${id}`, null);
  }

  getChangeStatus(hash: string) {
    return this.client.post<ChangeStatusData>(`${environment.apiUrl}/TelegramApi/GetChangeStatusData?hash=${hash}`, null);
  }

  postChangeStatus(vacancyId: number, candidateId: number,statusid: number,hash: string,note: string="") {
    let data = {
      vacancyId: Number(vacancyId),
      candidateId: Number(candidateId),
      statusid: Number(statusid),
      hash: hash,
      note:note
    };

    return this.client.post<StandartResponce>(`${environment.apiUrl}/TelegramApi/postChangeStatus?`, data);
  }

  getVacancyProfile(id: number) {
    return this.client.post<VacancyProfile>(`${environment.apiUrl}/Admin/GetVacancyProfile?id=${id}`,null);
  }

  getClientStateList() {
    return this.client.get<ClientStateSummary[]>(`${environment.apiUrl}/Admin/GetClientStateSummary?`)
  }

  GetClientStateList(stateName: string) {
    return this.client.get<Client[]>(`${environment.apiUrl}/Admin/GetClientStateList?name=${stateName}`)
  }

  GetClientContactProfile(id: number, client_id:number) {
    return this.client.get<ClientContactProfile>(`${environment.apiUrl}/Admin/GetClientContactProfile?id=${id}&client_id=${client_id}`);
  }

  ///Deleting

  DeleteClient(id: number) {
    return this.client.delete<StandartResponce>(`${environment.apiUrl}/api/Clients/${id}`);
  }

  DeleteClientContact(id: number) {
    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/DeleteClientContact?id=${id}`, null);
  }

  DeleteCandidate(id: number) {
    return this.client.delete<ApiResponse>(`${environment.apiUrl}/api/Candidates/${id}`);
  }

  DeleteVacancy(id: number) {
    return this.client.delete<ApiResponse>(`${environment.apiUrl}/api/Vacancies/${id}`);
  }

  DeleteCandidateEvent(id: any) {
    return this.client.post<StandartResponce>(`${environment.apiUrl}/Admin/DeleteCandidateEvent?id=${id}`, null);
  }
}
