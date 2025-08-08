import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { Recruiter, Vacancy, VacancyState, VacancyStatusList } from '../../../models';

@Component({
  selector: 'app-vacancy-candidate-list',
  standalone: false,
  
  templateUrl: './vacancy-candidate-list.component.html',
  styleUrl: './vacancy-candidate-list.component.scss',
  providers: [DataAccessService, RouterService]

})

export class VacancyCandidateListComponent implements OnInit, OnDestroy {

  columnToDisplay: string[] = ['Name', 'Status', 'CandidateNumber'];
  vacancyData: VacancyState[] = [];
  recruiterList: Recruiter[] = [];
  vacancy_status_list?: VacancyStatusList;
  attentionTypeId: number=0;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.dataAccess.getSettingValue("NeedAttentionStatusTypeId").subscribe((data) => {
      if (data.result) {
        this.attentionTypeId = Number(data.stringData);
      }
    });
    this.dataAccess.getRecruiterList().subscribe((data) => {
      this.recruiterList = data;
      this.dataAccess.getVacancyStateList().subscribe((data) => {
        this.vacancyData = data;
        for (let i = 0; i < this.recruiterList.length; i++) {
          this.recruiterList[i].tableData = this.vacancyData.filter(t => t.CreatedBy == this.recruiterList[i].id);
        }
        this.dataAccess.getVacancyStatusList(0).subscribe((data) => {
          this.vacancy_status_list = data;
          // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
        });
      });

    });

  }
  onRowClicked(row: any) {

    this.router.goToVacancyCandidateListFromStateList(row.VacancyId);
  }

  returnFilteredVacancyList(recruiterId: number) {
    return this.vacancyData.filter(t => t.CreatedBy == recruiterId);
  }

  openOtherStatus(statusid: number) {
    //this.status_id = statusid;
    this.router.goToVacancyCandidateListFromStateList(0, statusid);
    ////this.route.snapshot.params.vacancy_id = id;
  }

}

