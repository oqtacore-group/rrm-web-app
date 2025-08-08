import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, EventEmitter, Inject} from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { Client, Vacancy, ConfirmDialogInput } from '../../../models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vacancy-edit-dialog',
  standalone: false,

  templateUrl: './vacancy-edit-dialog.component.html',
  styleUrl: './vacancy-edit-dialog.component.scss',
  providers: [DataAccessService, RouterService]

})

export class VacancyEditDialogComponent implements OnInit, OnDestroy {

  onDataLoaded = new EventEmitter();
  form_data?: Vacancy;

  currencyList: string[] = [];
  clientList: Client[] = [];
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialogRef: MatDialogRef<VacancyEditDialogComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public vacancy_id: number) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.route.params.subscribe(params => {
      // PARAMS CHANGED ..

      this.refreshVacancyData();
    });

  }


  closeDialog(passData: boolean) {
    if (passData ) {
      let dialogData = new ConfirmDialogInput();
      dialogData.title = 'Are you sure?';
      dialogData.text = '';
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: dialogData, maxHeight: '700px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.result == true) {
          this.dialogRef.close();
        }
      });
    }
    else {
      this.dialogRef.close();
    }
  }

  refreshVacancyData() {

    this.dataAccess.getVacancyProfile(this.vacancy_id).subscribe((data) => {
      this.form_data = data.data;
      this.currencyList = data.currencyList;
      this.clientList = data.clientList;
      this.onDataLoaded.emit();
      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);



    });
  }
  onClickEditProfile() {
    if(!this.form_data) return;


    if(this.vacancy_id > 0){
      this.dataAccess.editVacancyProfile(this.vacancy_id, this.form_data).subscribe((data) => {
        if (data && data.Success) {
          this.closeDialog(false);
        }
        else {
          //Show failed to save with error message
        }
      });

    }
    else {
      this.dataAccess.addVacancyProfile(this.form_data).subscribe((data) => {
        if (data && data.Success) {
          this.router.goToProfilePage(data.Id, 'Vacancy');
          this.closeDialog(false);
        }
        else {
          //Show failed to save with error message
        }
      });

    }

  }
}
