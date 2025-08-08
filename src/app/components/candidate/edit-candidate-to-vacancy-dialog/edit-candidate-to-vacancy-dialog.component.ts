import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, Inject, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Candidate, VacancyList, ConfirmDialogInput, AddVacancyDialogData, Vacancy, AddVacancyData, VacancyStatusType, EditCandidateVacancyStatus } from '../../../models';
import { Title } from '@angular/platform-browser';
import { ConfirmWithNoteDialogComponent } from '../../shared/confirm-with-note-dialog/confirm-with-note-dialog.component';

@Component({
  selector: 'app-edit-candidate-to-vacancy-dialog',
  standalone: false,
  
  templateUrl: './edit-candidate-to-vacancy-dialog.component.html',
  styleUrl: './edit-candidate-to-vacancy-dialog.component.scss',
  providers: [DataAccessService, RouterService]

})

export class EditCandidateToVacancyDialogComponent implements OnInit, OnDestroy {

  vacancy_type_list: VacancyStatusType[] = [];
  candidate: Candidate;
  vacancy: Vacancy;
  active_vacancy_status_id: number;
  note: string = '';
  selected_vacancy_status_id: number;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialogRef: MatDialogRef<EditCandidateToVacancyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditCandidateVacancyStatus, public dialog: MatDialog) 
  {
    this.vacancy = this.data.vacancy;
    this.candidate = this.data.candidate;
    this.active_vacancy_status_id = this.data.current_vacancy_status_id;
    this.vacancy_type_list = this.data.vacancy_type_list;
    this.selected_vacancy_status_id = this.active_vacancy_status_id;

  }

  ngOnDestroy() {
  }

  ngOnInit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeStatus() {
    if (this.selected_vacancy_status_id == this.active_vacancy_status_id) {
      this.dialogRef.close();
    }
    else {
      let dialogData = new ConfirmDialogInput();

      dialogData.title = 'Are you sure?';
      dialogData.text = 'Note to this action';

      let dialogRef = this.dialog.open(ConfirmWithNoteDialogComponent, {
        data: dialogData, maxHeight: '700px', minWidth: '600px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.result == true) {
          if (this.selected_vacancy_status_id == 0) {
            this.dataAccess.editCandidateCommentToVacancy(this.vacancy.id, this.candidate.id,  result.note).subscribe((data) => {
              this.dialogRef.close();
              // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
            });
          }
          else {
            this.dataAccess.editCandidateStatusToVacancy(this.vacancy.id, this.candidate.id, this.selected_vacancy_status_id, result.note).subscribe((data) => {
              this.dialogRef.close();
              // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
            });
          }
         
          //this.dialogRef.close();

        }

      });
    }
  }

}
