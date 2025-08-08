import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { Candidate, ContactData, CandidateProfile, Vacancy, Vacancy_status, VacancyStatusType, VacancyList, VacancyStatusList } from '../../../models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vacancy-candidate-profile',
  standalone: false,

  templateUrl: './vacancy-candidate-profile.component.html',
  styleUrl: './vacancy-candidate-profile.component.scss',
  providers: [DataAccessService, RouterService]

})

export class VacancyCandidateProfileComponent implements OnInit, OnDestroy {
  selected_candidate_id: number = 0;
  candidate_list?: Candidate[];
  vacancy_status_list?: VacancyStatusList;
  vacancy_id: number = 0;
  vacancy_data?: Vacancy;
  status_id: number = 0;
  id: any;
  status: string = "";
  attentionTypeId: number = 0;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, private routerF: Router, public dialog: MatDialog) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.dataAccess.getSettingValue("NeedAttentionStatusTypeId").subscribe((data) => {
      if (data.result) {
        this.attentionTypeId = Number(data.stringData);
      }
    });
    this.route.params.subscribe(params => {
      // PARAMS CHANGED ..
      if (this.status != params['status_id'] ) {
        this.status = params['status_id'];

      }
      this.id = params['candidateid'];
      this.refreshApiData();
    });
  }


  containsCandidate() {
    if(!this.candidate_list) return undefined;
    return this.candidate_list.find(x => x.id == this.selected_candidate_id)
  }

  refreshApiData() {
    this.vacancy_id = 0;
    if (this.route.snapshot.params['vacancy_id']) {
      this.vacancy_id = this.route.snapshot.params['vacancy_id'];
    }
    if (this.route.snapshot.params['status_id']) {
      this.status_id = this.route.snapshot.params['status_id'];
    }

    this.dataAccess.getVacancyStatusList(this.vacancy_id).subscribe((data) => {
      this.vacancy_status_list = data;
    });


    this.dataAccess.getVacancyProfile(this.vacancy_id).subscribe((result) => {
      this.vacancy_data = result.data;
    })

    this.dataAccess.getCandidateList(this.vacancy_id, this.status_id).subscribe((data) => {
      this.candidate_list = data.list;
      if (this.route.snapshot.params['candidateid']) {
        this.selected_candidate_id = this.route.snapshot.params['candidateid'];
      }
    });
  }

  backToMain() {
    this.routerF.navigate(["/Vacancy"]);
  }

  editFavoriteState(candidate: Candidate) {
    this.dataAccess.editFavoriteState(candidate.id, candidate.favorite).subscribe(() => { });;
  }

  openProfile(id: number) {
    this.selected_candidate_id = id;
    this.routerF.navigateByUrl(this.routerF.url.replace(this.status + "/" + this.id, this.status + "/" + id.toString()));
  }

  openOtherStatus(statusid: number) {
    this.status_id = statusid;
    this.routerF.navigateByUrl(this.routerF.url.replace(this.status + "/" + this.id, statusid.toString() + "/" +this.id ));
  }

  onRowClicked(row:any) {
    this.router.goToProfilePageFromList(row.id);
  }
}
