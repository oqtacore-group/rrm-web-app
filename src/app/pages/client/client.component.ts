import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VacancyList, ClientList, CandidateList, Recruiter, Vacancy, Client } from '../../models';
import { DataAccessService, EventService } from '../../services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client',
  standalone: false,

  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{
  title = 'Angular';
  root: string = 'Start///';
  vacancyList: VacancyList | undefined;
  filteredVacancyList: Vacancy[] | undefined;
  recruiterList: Recruiter[] | undefined;
  selectedRecruiter: Recruiter | undefined;
  selectedRecruiterId: number = 0;
  selectedClientId: number = 0;
  clientList: Client[] = [];
  private subscription: Subscription;
  constructor(private router: Router, private dataAccess: DataAccessService, private route: ActivatedRoute, private titleService: Title, private eventService: EventService) {

    this.subscription = this.eventService.actionChanged$.subscribe(
      (message) => {
        console.log("Event received: ", message);
      }
    );

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {

      if (!event.url.startsWith(this.root)) {

        this.titleService.setTitle("RRM");
        if (this.router.isActive('/Vacancy', false)) {
          //this.reloadVacancyList();
          this.root = 'Vacancy';
        }
        else if (this.router.isActive('/Client', false)) {
          this.root = 'Client';
        }
        else if (this.router.isActive('/Telegram', false)) {
          this.root = 'Telegram';
        }
        else {
          this.root = 'Other';
        }
      }

    });
  }

  init() {
    if (this.router.isActive('/Client', false) || this.router.isActive('/Vacancy', false)) {
      this.reloadVacancyList();
    }
  }

  ngOnInit() {
    this.init();
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

  reloadVacancyList() {
    this.dataAccess.getCurrentRecruiter().subscribe(data => {
      this.selectedRecruiterId = 0;
      this.selectedRecruiter = data;
      this.dataAccess.getRecruiterList().subscribe(data => {
        this.recruiterList = data;
        this.recruiterList = this.recruiterList.filter(t => t.id != this.selectedRecruiterId);

        this.dataAccess.getClientList().subscribe(result => {
          this.clientList = result.list;
          this.dataAccess.getVacancyList().subscribe(data => {
            this.vacancyList = data;
            this.filterVacancyList();
          });
        });
      });
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
