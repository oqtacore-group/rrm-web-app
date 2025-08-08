import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recruiter } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private client: HttpClient) { }

  async getCurrentRecruiter() {
    return await this.client.get<Recruiter>(`${environment.apiUrl}/Admin/getCurrentRecruiter`);
  }  
}
