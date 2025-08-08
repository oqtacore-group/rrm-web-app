import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataAccessService } from '../../../services';
import { Component } from '@angular/core';
import { Vacancy, VacancyStatusType, CandidatesVacancyStatus, CandidateEvent, Candidate } from '../../../models';

@Component({
  selector: 'app-telegram-change-status',
  standalone: false,
  
  templateUrl: './telegram-change-status.component.html',
  styleUrl: './telegram-change-status.component.scss'
})
export class TelegramChangeStatusComponent {

  hash: string = '';
  vacancy!: Vacancy;
  status_list!: VacancyStatusType[];
  vacancyStatus!: CandidatesVacancyStatus;
  candEvent!: CandidateEvent;
  candidate!: Candidate;
  vacancyStatusId!: number;
  resultString: string = "";
  note: string = "";
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // PARAMS CHANGED ..    

      this.refreshApiData();
    });

  }

  returnStatusName(id: number) {
    const statusItem = this.status_list.find(t => t.id === id);
    return statusItem ? statusItem.Name : '';
  }

  refreshApiData() {
    if (this.route.snapshot.params['hash']) {
      this.hash = this.route.snapshot.params['hash'];
    }
    this.dataAccess.getChangeStatus(this.hash).subscribe((data) => {
      if (!data) {
        this.resultString = "Wrong link!";
      }
      this.vacancy=data.vacancy;
      this.status_list= data.status_list;
      this.vacancyStatus= data.vacancyStatus;
      this.candEvent = data.candEvent;
      this.vacancyStatusId = this.vacancyStatus.VacancyStatusId;
      this.candidate = data.candidate;
      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
    });
  }

  postChangeStatus() {
    this.dataAccess.postChangeStatus(this.vacancy.id, this.candEvent.CandidateId, this.vacancyStatusId, this.hash, this.note).subscribe((data) => {
      if (data.result) {
        this.resultString = "Succes!";
      }
      else {
        this.resultString = "Error!";
      }
      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
    });
  }
}
