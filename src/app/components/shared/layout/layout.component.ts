import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VacancyList, ClientList, CandidateList, Recruiter, Vacancy, Client } from '../../../models';
import { DataAccessService } from '../../../services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{
  title = 'Angular';
  root: string = 'Start///';
  vacancyList: VacancyList | undefined;
  filteredVacancyList: Vacancy[] | undefined;
  recruiterList: Recruiter[] | undefined;
  selectedRecruiter: Recruiter | undefined;
  selectedRecruiterId: number = 0;
  selectedClientId: number = 0;
  clientList: Client[] = [];

  constructor(private router: Router, private dataAccess: DataAccessService, private route: ActivatedRoute, private titleService: Title) {
  }

  ngOnInit() {
    this.dataAccess.getCurrentRecruiter().subscribe(data => {
      this.selectedRecruiterId = 0;
      this.selectedRecruiter = data;
    });
  }

  logout() {
    this.dataAccess.LogOut();
    this.router.navigate(['/Login']);
  }

  navigateTo(e: any) {
    const { value } = e.target;
    if (value && !value.startsWith(this.root)) {

      this.router.navigate([value]);
    }
    return false;
  }

  isRouteActive(route:string) {
    return this.router.isActive(route,false);
  }
  
}
