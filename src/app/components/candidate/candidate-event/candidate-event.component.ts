import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, Input, Inject, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { Candidate, ContactData, CandidateProfile, Vacancy, Vacancy_status, AddVacancyData, VacancyStatusType, HeadHunterData, HeadHunterJobExperienceData, LinkedinData, CandidateEvent, CandidateEventType } from '../../../models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-event',
  standalone: false,
  templateUrl: './candidate-event.component.html',
  styleUrl: './candidate-event.component.scss',
  providers: [DataAccessService, RouterService]
})

export class CandidateEventComponent implements OnInit, OnDestroy {

  event_data: CandidateEvent | undefined;
  event_type_list: CandidateEventType[] = [];
  candidate_list: Candidate[] = [];
  onDataLoaded = new EventEmitter();
  error_message: string = '';
  constructor(private route: ActivatedRoute, public dialogRef: MatDialogRef<CandidateEventComponent>, @Inject(MAT_DIALOG_DATA) public event_id: number, private dataAccess: DataAccessService, private router: RouterService, public dialog: MatDialog) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.refreshEventData();
  }
  
  refreshEventData() {
    this.dataAccess.getEventData(this.event_id).subscribe((data) => {
      this.event_data = data.eventData;
      this.event_data.Date = new Date(this.event_data.Date.toString() + 'Z' );
      this.event_type_list = data.eventTypeList;
      this.candidate_list = data.candidateList;
      if (this.event_data.CandidateId==0) {
        this.event_data.Date = new Date();
      }
      if (!this.event_data.TypeId || this.event_data.TypeId == 0) {
        this.event_data.TypeId = 2;
      }
      this.onDataLoaded.emit();
    });

  }

  editCandidateEvent() {
    if(!this.event_data) return;
    this.dataAccess.editCandidateEvent(this.event_data).subscribe((data) => {
      if (data.result) {
        if (data.id) {
          if (this.event_data) {
            this.event_data.id = data.id;
          }
        }

        if (!this.event_data?.CandidateName && this.event_data?.CandidateId) {
          const candidate = this.candidate_list?.find(t => t.id === Number(this.event_data?.CandidateId));
          if (candidate) {
            this.event_data.CandidateName = candidate.Name;
          }
        }
        this.event_data!.EventType = "rrm";
        this.dialogRef.close(this.event_data);

      }
      else {
        this.error_message = data.error;
      }
    });
  }
}
