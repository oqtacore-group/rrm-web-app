import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, Inject } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, VacancyList, ConfirmDialogInput } from '../../../models';

@Component({
  selector: 'app-confirm-with-note-dialog',
  standalone: false,
  
  templateUrl: './confirm-with-note-dialog.component.html',
  styleUrl: './confirm-with-note-dialog.component.scss',
  providers: [DataAccessService, RouterService]

})

export class ConfirmWithNoteDialogComponent implements OnInit, OnDestroy {

  noteText: string = '';
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialogRef: MatDialogRef<ConfirmWithNoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogInput) { }

  ngOnDestroy() {
  }

  ngOnInit() {
   
  }

  answerQuestion(result: boolean) {
    this.dialogRef.close({ result: result, note: this.noteText });
  }
}