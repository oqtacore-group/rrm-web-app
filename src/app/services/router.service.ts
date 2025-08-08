import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) {

    this.router.onSameUrlNavigation = "reload";
  }

  //Go to profile Page
  goToProfilePageFromList(id: number) {
    if (id == 0) {
      return this.router.navigate([this.router.url, `profile`, `CreateNew`]);
    }
    else {
      return this.router.navigate([this.router.url, `profile`, `${id}`]);
    }
  }

  goToVacancyCandidateListFromStateList(vacancy_id: number,status_id:number=0,candidate_id:number=0) {
    return this.router.navigate(['Vacancy', 'profile', vacancy_id, 'Candidates', status_id, candidate_id]);
  }

  goToProfilePage(id: number,type:string) {
    return this.router.navigate([type, 'profile', id]);
  }

  goToVacancy(id: number) {
    return this.router.navigate(['Vacancy', 'profile', `${id}`, 'Candidates']);

  }


  goToClientList() {
    return this.router.navigate([`/Client`]);;
  }


  goToCandidateList() {
    return this.router.navigate([`/Candidate`]);;
  }


  goToVacancyList() {
    return this.router.navigate([`/Vacancy`]);;
  }


  goToRedirectPage(testid: string, redirect_url: string) {
    if (testid != null && testid != "") {
      return this.router.navigate([`${redirect_url}/${testid}`]);
    }
    else {
      return this.router.navigate([`${redirect_url}`]);
    }
  }
}
