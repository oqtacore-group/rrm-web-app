import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { OnInit, OnDestroy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, EventService, RouterService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import { ClientEditDialogComponent } from '../client-edit-dialog/client-edit-dialog.component';
import { VacancyEditDialogComponent } from '../../vacancy/vacancy-edit-dialog/vacancy-edit-dialog.component';

@Component({
  selector: 'app-client-add-fab',
  standalone: false,
  templateUrl: './client-add-fab.component.html',
  styleUrl: './client-add-fab.component.scss',
  providers: [DataAccessService, RouterService]
})

export class ClientAddFabComponent implements OnInit, OnDestroy {
  active: boolean=false;
  subscribe_active: boolean = false;
  current_client: number=0;
  current_vacancy: number = 0;
  current_candidate: number = 0;
  @Input() mode!: string;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: Router, public dialog: MatDialog, private eventService: EventService) { }

  ngOnDestroy() {
  }

  ngOnInit() {

    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        if (val.state.root.firstChild?.params['client_id']) {
          this.current_client = val.state.root.firstChild.params['client_id'];
        }
        if (val.state.root.firstChild?.params['vacancy_id']) {
          this.current_vacancy = val.state.root.firstChild.params['vacancy_id'];
        }
        if (val.state.root.firstChild?.params['candidateid']) {
          this.current_candidate = val.state.root.firstChild.params['candidateid'];
        }
      }
    });

    this.active = false;
  }

  ngAfterContentInit() {

  }

  toggle() {
    this.active = !this.active;
  }

  addClient() {
    let dialogRef = this.dialog.open(ClientEditDialogComponent, {
      data: 0, maxHeight: '700px', minWidth: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.eventService.notifyActionChange('ClientAdded');
    });
  }
  addVacancy() {
    let dialogRef = this.dialog.open(VacancyEditDialogComponent, {
      data: 0, maxHeight: '700px', minWidth: '900px'
    });

    dialogRef.componentInstance.onDataLoaded.subscribe((data) => {
      if (dialogRef.componentInstance.form_data?.ClientId == 0) {
        dialogRef.componentInstance.form_data.ClientId = this.current_client;
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
}
