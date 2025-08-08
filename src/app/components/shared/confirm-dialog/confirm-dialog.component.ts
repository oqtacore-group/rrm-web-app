import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, Inject } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, VacancyList, ConfirmDialogInput } from '../../../models';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  providers: [DataAccessService, RouterService]

})

export class ConfirmDialogComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogInput) { }

  ngOnDestroy() {
  }

  ngOnInit() {
   
  }
  answerQuestion(result: boolean) {
    this.dialogRef.close({ result: result });
  }
}