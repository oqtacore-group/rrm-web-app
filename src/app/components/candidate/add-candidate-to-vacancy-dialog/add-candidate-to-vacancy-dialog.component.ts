import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, Inject, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Candidate, VacancyList, ConfirmDialogInput, AddVacancyDialogData, Vacancy, AddVacancyData } from '../../../models';
import { ConfirmWithNoteDialogComponent } from '../../shared/confirm-with-note-dialog/confirm-with-note-dialog.component';

@Component({
  selector: 'app-add-candidate-to-vacancy-dialog',
  standalone: false,
  
  templateUrl: './add-candidate-to-vacancy-dialog.component.html',
  styleUrl: './add-candidate-to-vacancy-dialog.component.scss',
  providers: [DataAccessService, RouterService]

})

export class AddCandidateToVacancyDialogComponent implements OnInit, OnDestroy {


  onAdd = new EventEmitter();
  onDelete = new EventEmitter();
  columnToDisplay: string[] = ['MyVacancy'];
  candidate_data: Candidate | undefined;
  vacancy_list: VacancyList | undefined;
  vacancy_current_list: AddVacancyData[] = [];
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialogRef: MatDialogRef<AddCandidateToVacancyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AddVacancyDialogData, public dialog: MatDialog) { }

  ngOnDestroy() {
  }

  ngOnInit() {

    this.candidate_data = this.data.candidate_data;
    this.vacancy_current_list = this.data.vacancy_list;
    this.dataAccess.getVacancyList(this.candidate_data.id).subscribe((result) => {
      this.vacancy_list = result;
      for (var i = 0; i < this.vacancy_list.list.length; i++) {
        this.vacancy_list.list[i].active = this.vacancy_current_list.find(t => t.vacancyId == this.vacancy_list?.list[i].id) ? true : false;
      }
      //this.vacancy_list.list = this.vacancy_list.list.filter((data) => !this.vacancy_current_list.find(t => t.vacancyId==data.id));
    });
  }

  filterVacancyList(id:number) {
    return this.vacancy_list ? this.vacancy_list.list.filter(t => t.ClientId == id) : []
  }
  removeVacancy(vacancyId: number) {
    let data = {
      candidate_data: this.candidate_data,
      vacancyId: vacancyId
    }
    this.onDelete.emit(data);
    this.vacancy_current_list=this.vacancy_current_list.filter(t => t.vacancyId != vacancyId);
    if(this.vacancy_list){
      for (var i = 0; i < this.vacancy_list.list.length; i++) {
        this.vacancy_list.list[i].active = this.vacancy_current_list.find(t => t.vacancyId == this.vacancy_list?.list[i].id) ? true : false;
      }
    }
  }
  addToVacancy(vacancyId: number) {
    let dialogData = new ConfirmDialogInput();
    
    dialogData.title = 'Are you sure?';
    dialogData.text = 'Note to this action';

    let dialogRef = this.dialog.open(ConfirmWithNoteDialogComponent, {
      data: dialogData, maxHeight: '700px', minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.result == true) {
        let data = {
          candidate_data: this.candidate_data,
          vacancyId: vacancyId,
          note: result.note
        }
        this.onAdd.emit(data);
        this.vacancy_current_list.push(data);
        if(this.vacancy_list){
          for (var i = 0; i < this.vacancy_list.list.length; i++) {
            this.vacancy_list.list[i].active = this.vacancy_current_list.find(t => t.vacancyId == this.vacancy_list?.list[i].id) ? true : false;
          }
        }
      }
    });
  }
}