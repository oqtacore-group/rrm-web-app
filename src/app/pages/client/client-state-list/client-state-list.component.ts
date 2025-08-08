import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService, EventService } from '../../../services';
import { Candidate, ContactData, CandidateProfile, Vacancy, Vacancy_status, VacancyStatusType, VacancyList, VacancyStatusList, ClientStateSummary, Client } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-state-list',
  standalone: false,

  templateUrl: './client-state-list.component.html',
  styleUrl: './client-state-list.component.scss',
  providers: [DataAccessService, RouterService]
})

export class ClientStateListComponent implements OnInit, OnDestroy {
  selected_client_id: number = 0;
  clientlist: Client[] = [];
  client_state_list: ClientStateSummary[] | undefined;

  client_id: number | undefined;
  vacancy_data: Vacancy[] = [];
  status_id: string = '';
  id: any;
  status: string = "";
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, private routerF: Router, public dialog: MatDialog, private eventService: EventService) {
    this.subscription = this.eventService.actionChanged$.subscribe(
      (message) => {
        console.log("Event received: ", message);
        this.refreshApiData();
      }
    );
   }

  ngOnDestroy() {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      // PARAMS CHANGED ..
      if (this.status != params['status_id']) {
        this.status = params['status_id'];
        this.refreshApiData();
      }
      this.id = params['client_id'];
    });
  }


  containsClient() {
    return this.clientlist.find(x => x.id == this.selected_client_id)
  }

  refreshApiData() {
    this.client_id = 0;
    if (this.route.snapshot.params['client_id']) {
      this.client_id = this.route.snapshot.params['client_id'];
    }
    if (this.route.snapshot.params['status_id']) {
      this.status_id = this.route.snapshot.params['status_id'];
    }

    this.dataAccess.getClientStateList().subscribe((data) => {
      this.client_state_list = data;
      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
      this.dataAccess.getVacancyList().subscribe((data) => {
        this.vacancy_data = data.list;
        // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
      });
    });


    this.dataAccess.GetClientStateList(this.status_id).subscribe((data) => {
      this.clientlist = data;
      if (this.clientlist.find(x => x.id == this.client_id)) {
        if(this.client_id)
          this.openProfile(this.client_id);
      }
      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
    });
  }

  getVacancyNumber(clientId: number) {
    return this.vacancy_data.filter(t => t.ClientId == clientId).length;
  }

  openProfile(id: number) {
    this.selected_client_id = id;
    this.routerF.navigateByUrl(this.routerF.url.replace(this.status + "/" + this.id, this.status + "/" + id.toString()));
    //this.route.snapshot.params.vacancy_id = id;
  }

  openOtherStatus(statusid: string) {
    this.status_id = statusid;
    this.routerF.navigateByUrl(this.routerF.url.replace(this.status + "/" + this.id, statusid.toString() + "/" + this.id));
    //this.route.snapshot.params.vacancy_id = id;
  }

  onClientEdited() {
    this.refreshApiData(); // Refresh client list
  }

  onClientDeleted() {
    this.refreshApiData(); // Refresh client list
  }

}
