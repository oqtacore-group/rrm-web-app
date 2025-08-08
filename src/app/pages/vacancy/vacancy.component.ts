import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VacancyList, ClientList, CandidateList, Recruiter, Vacancy, Client } from '../../models';
import { DataAccessService } from '../../services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-vacancy',
  standalone: false,
  
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.scss'
})
export class VacancyComponent implements OnInit{
  title = 'Angular';
  vacancyList: VacancyList | undefined;
  filteredVacancyList: Vacancy[] | undefined;
  recruiterList: Recruiter[] | undefined;
  selectedRecruiter: Recruiter | undefined;
  selectedRecruiterId: number = 0;
  selectedClientId: number = 0;
  clientList: Client[] = [];

  constructor(private router: Router, private dataAccess: DataAccessService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.reloadVacancyList();
  }

  logout() {
    this.dataAccess.LogOut();
    this.router.navigate(['/Login']);
  }

  isRouteActive(route:string) {
    return this.router.isActive(route,false);
  }

  reloadVacancyList() {
    this.dataAccess.getCurrentRecruiter().subscribe(data => {
      this.selectedRecruiterId = 0;
      this.selectedRecruiter = data;
    });

    this.dataAccess.getRecruiterList().subscribe(data => {
      this.recruiterList = data;
      this.recruiterList = this.recruiterList.filter(t => t.id != this.selectedRecruiterId);
    });

    this.dataAccess.getClientList().subscribe(result => {
      this.clientList = result.list;
    });
    
    this.dataAccess.getVacancyList().subscribe(data => {
      this.vacancyList = data;
      this.filterVacancyList();
    });
  }
  onRecruiterChange(newRecruiterId: any) {
    this.selectedRecruiterId = newRecruiterId.value;
    this.filterVacancyList();
  }
  onClientChange(newClientId: any) {
    this.selectedClientId = newClientId.value;
    this.filterVacancyList();
  }
  filterVacancyList() {
    this.filteredVacancyList = this.vacancyList?.list.filter(t => (this.selectedRecruiterId == 0 || t.CreatedBy == this.selectedRecruiterId) &&
      (this.selectedClientId == 0 || t.ClientId == this.selectedClientId));
  }
}
