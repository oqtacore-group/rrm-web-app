import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, EventService, RouterService } from '../../../services';
import {  MatDialog } from '@angular/material/dialog'
import { MatSort } from '@angular/material/sort';
import { ClientContactProfileComponent, ClientEditDialogComponent, ConfirmDialogComponent } from '../../../components';
import { ConfirmDialogInput, Client, VacancyState, ClientContact } from '../../../models';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-client-profile',
  standalone: false,
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss',
  providers: [DataAccessService, RouterService]
})

export class ClientProfileComponent implements OnInit, OnDestroy {


  form_data: Client = new Client();
  @Input() url_id!: number;
  @Output() clientEdited: EventEmitter<void> = new EventEmitter<void>();
  @Output() clientDeleted: EventEmitter<void> = new EventEmitter<void>();
  columnToDisplay: string[] = ['Name', 'Vacancy_State', 'CandidateCount'];
  contact_list: ClientContact[] = [];

  vacancyData: VacancyState[] = [];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialog: MatDialog, private titleService: Title, private eventService: EventService) {
  }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // PARAMS CHANGED ..

      this.refreshApiData();
    });

  }

  refreshApiData() {
    if (this.route.snapshot.params['client_id']) {
      this.url_id = this.route.snapshot.params['client_id'];
    }
    this.dataAccess.getClientProfile(this.url_id).subscribe((result) => {
      this.form_data = result.data;
      this.url_id = result.data.id;
      this.refreshContactData();
      if(this.form_data && this.form_data.Name)
        this.titleService.setTitle(this.form_data.Name);

      this.dataAccess.getVacancyStateList().subscribe((data) => {
        this.vacancyData = data.filter(t => t.ClientId == this.form_data?.id);

      });
      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
    });
  }

  refreshContactData() {
    this.dataAccess.getClientContactList(this.url_id).subscribe((dataContact) => {
      this.contact_list = dataContact.list;
    });
  }

  editClient() {
    let dialogRef = this.dialog.open(ClientEditDialogComponent, {
      data: this.form_data?.id, maxHeight: '700px', minWidth: '900px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshApiData();
      this.clientEdited.emit(); // Emit event
    });

  }

  createNewClientContact() {
    this.dataAccess.GetClientContactProfile(0, this.url_id).subscribe((result) => {

      let dialogRef= this.dialog.open(ClientContactProfileComponent, {
        data: result.data, maxHeight: '700px', minWidth: '700px'
      });
      dialogRef.afterClosed().subscribe((data) => {

        this.dataAccess.editClientContactProfile(data.ClientId, data.id, data, data.ContactData).subscribe((data) => {
          if (data && data.result) {
            this.refreshContactData();
          }
          else {
          }
        });

      });

    });
  }
  onClientContactEditClicked(row: any) {

    this.dialog.open(ClientContactProfileComponent, {
      data: row, maxHeight: '700px', minWidth: '800px'

    });

  }

  goToVacancyPage(id: number) {
    this.router.goToVacancy(id);
  }

  deleteClient() {
    let dialogData = new ConfirmDialogInput();
    dialogData.title = 'Are you sure?';
    dialogData.text = 'This will DELETE this client, it contacts and ALL vacancies of this client';
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData, maxHeight: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.result == true) {
        this.dataAccess.DeleteClient(this.url_id).subscribe((data) => {
          this.clientDeleted.emit(); // Emit event
          this.eventService.notifyActionChange('ClientDeleted'); // Notify other components
          this.router.goToClientList();
        });
      }
    });
  }
  deleteContact(row: any) {
    this.dataAccess.DeleteClientContact(row.id).subscribe((data) => {
      this.refreshContactData();
    });
  }
}
