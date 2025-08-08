import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { OnInit, OnDestroy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import { CandidateEditDialogComponent } from '../../candidate/candidate-edit-dialog/candidate-edit-dialog.component';
import { filter } from 'rxjs/operators';
import { CandidateEventComponent } from '../../candidate/candidate-event/candidate-event.component';

@Component({
  selector: 'app-vacancy-add-fab',
  standalone: false,
  templateUrl: './vacancy-add-fab.component.html',
  styleUrl: './vacancy-add-fab.component.scss',
  providers: [DataAccessService, RouterService]

})

export class VacancyAddFabComponent implements OnInit, OnDestroy {
  active: boolean=false;
  subscribe_active: boolean = false;
 current_client: number=0;
  current_vacancy: number = 0;
  current_candidate: number = 0;
  @Input() mode!: string;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: Router, public dialog: MatDialog) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    if (this.router.isActive('/Vacancy', false)) {
      this.mode = "vacancy";
    }
    if (this.router.isActive('/Client', false)) {
      this.mode = "client";
    }
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {

      if (this.router.isActive('/Vacancy', false)) {
        this.mode = "vacancy";
      }
      if (this.router.isActive('/Client', false)) {
        this.mode = "client";
      }

    });
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

  addCandidate() {
    const urlSegments = this.router.url.split('/');
    const vacancyId = urlSegments[3]; // Assuming the parameter is at the end

    // Alternatively, you can directly use ActivatedRoute to get the params
    let dialogRef = this.dialog.open(CandidateEditDialogComponent, {
      data: "", maxHeight:'700px', minWidth: '900px'
    });

    dialogRef.componentInstance.onDataLoaded.subscribe((data) => {
      dialogRef.componentInstance.selectedVacancyId = Number(vacancyId);
      dialogRef.componentInstance.vacancy_data.push({ note: '', vacancyId: Number(vacancyId) });
      // do something
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
  addEvent() {

    let dialogRef = this.dialog.open(CandidateEventComponent, {
      data: 0, maxHeight: '700px', minWidth: '800px'
    });
    dialogRef.componentInstance.onDataLoaded.subscribe((data) => {
      if(dialogRef.componentInstance.event_data){
        dialogRef.componentInstance.event_data.CandidateId = this.current_candidate;
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
