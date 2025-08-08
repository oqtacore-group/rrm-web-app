import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, EventEmitter} from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { Client, Vacancy, ConfirmDialogInput } from '../../../models';
import { VacancyEditDialogComponent, ConfirmDialogComponent } from '../../../components';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vacancy-profile',
  standalone: false,
  templateUrl: './vacancy-profile.component.html',
  styleUrl: './vacancy-profile.component.scss',
  providers: [DataAccessService, RouterService]
})

export class VacancyProfileComponent implements OnInit, OnDestroy {

  onDataLoaded = new EventEmitter();
  form_data: Vacancy = new Vacancy();
  url_id: number = 0;
  currencyList: string[] = [];
  client: Client = new Client();
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialog: MatDialog) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    console.log('test2');
    this.route.params.subscribe(params => {
      // PARAMS CHANGED ..    

      this.refreshVacancyData();
    });

  }

  refreshVacancyData() {
    if (this.route.snapshot.params['vacancy_id']) {
      this.url_id = this.route.snapshot.params['vacancy_id'];
    }
    this.dataAccess.getVacancyProfile(this.url_id).subscribe((data) => {
      this.form_data = data.data;
      this.url_id = data.data.id;
      this.currencyList = data.currencyList;
      const client = data.clientList.find(t => t.id == this.form_data.ClientId); 
      if(client){
        this.client = client;
      }
      this.onDataLoaded.emit();
      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);

    });
  }

  onClickEditProfile() {
    let dialogRef = this.dialog.open(VacancyEditDialogComponent, {
      data: this.form_data.id, maxHeight: '700px', minWidth: '900px'
    });



    dialogRef.afterClosed().subscribe(result => {
      this.refreshVacancyData();
    });

    //this.dataAccess.postQuestionAnswer(this.TestData).subscribe((data) => {
    //});
  }

  toggleOpenedState() {
    this.dataAccess.ChangeVacancyState(this.form_data.id, !this.form_data.Opened).subscribe((data) => {
      if (data.result) {
        this.form_data.Opened = !this.form_data.Opened;
      }
    });
  }

  deleteVacancy() {

    let dialogData = new ConfirmDialogInput();
    dialogData.title = 'Are you sure?';
    dialogData.text = 'You will delete this vacancy and all connections with candidates';
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData, maxHeight: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.result == true) {
        this.dataAccess.DeleteVacancy(this.form_data.id).subscribe((data) => {
          this.router.goToVacancyList();
        });
      }
    });
  }
}