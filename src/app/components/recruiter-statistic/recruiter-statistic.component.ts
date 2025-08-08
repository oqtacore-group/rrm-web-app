import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService } from '../../services';
import { RouterService } from '../../services';
import { RecruiterStatModel, RecruiterStat, VacancyStatusType, Recruiter } from '../../models';


@Component({
  selector: 'app-recruiter-statistic',
  standalone: false,
  templateUrl: './recruiter-statistic.component.html',
  styleUrl: './recruiter-statistic.component.scss',
  providers: [DataAccessService, RouterService]

})

export class RecruiterStatisticComponent implements OnInit, OnDestroy {

  columnToDisplay: string[] = ['StatusName', 'Total'];
  //, 'Success', 'Fail'
  form_data: RecruiterStatModel | undefined;
  startDate: Date = this.addDays(new Date(), -30);
  endDate: Date = new Date();
  recruiterList: Recruiter[] = [];
  selectedRecruiter: Recruiter | undefined;

  hoveredRowId: number | undefined;
  totalHoveredCount: number | undefined;
  totalDistinctCount: number = 0;
  successHoveredCount: number | undefined;
  failHoveredCount: number | undefined;
  hoveredStatus: string = '';
  maxAllCount: number = 0;
  selectedRecruiterId: number = 0;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService) { }

  onRecruiterChange(newRecruiterId: any) {
    this.selectedRecruiterId = newRecruiterId.value;
    this.onUpdateApi();
  }


  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.startDate = this.addDays(new Date(), -30);
    this.endDate = new Date();
    this.selectedRecruiterId = 0;
    this.hoveredRowId = 0;
   
    this.onUpdateApi();
  }

  onUpdateApi() {



    this.dataAccess.getRecruiterList().subscribe(data => {
      this.recruiterList = data;
      this.selectedRecruiter = this.recruiterList.find(t => t.id == this.selectedRecruiterId);

      this.recruiterList = this.recruiterList.filter(t => t.id != this.selectedRecruiterId);

      this.updateStatModel();
    });


  }

  updateStatModel() {
    this.dataAccess.getRecruiterStatModel(this.selectedRecruiterId, this.startDate, this.endDate).subscribe((data) => {
      this.form_data = data;
      this.onRowHoverLeave();
      for (let i = 0; i < this.form_data.statusList.length; i++) {
        let max = this.totalCount(this.form_data.statusList[i]);
        this.maxAllCount = this.maxAllCount > max ? this.maxAllCount : max;
      }
    });
  }

  round(row: VacancyStatusType) {
    return Math.round((this.totalCount(row) / this.maxAllCount) * 100);
  }
  roundRowSuccess(row: VacancyStatusType) {
    return Math.round((this.successCount(row) / this.totalCount(row)) * 100);
  }
  roundRowFail(row: VacancyStatusType) {
    return Math.round((this.failCount(row) / this.totalCount(row)) * 100);
  }


  totalCount(row: VacancyStatusType) {
    if(!this.form_data) return 0;
    return this.form_data.list.filter(t => t.VacancyStatusId == row.id).length;
  }
  successCount(row: VacancyStatusType) {
    if(!this.form_data) return 0;
    return this.form_data.list.filter(t => t.VacancyStatusId == row.id && t.Success == true).length;
  }
  failCount(row: VacancyStatusType) {
    if(!this.form_data) return 0;
    return this.form_data.list.filter(t => t.VacancyStatusId == row.id && t.Fail == true).length;
  }

  onRowHover(row: VacancyStatusType) {
    this.hoveredRowId = row.id;
    this.hoveredStatus = row.Name;
    this.totalHoveredCount = this.totalCount(row);
    this.failHoveredCount = this.failCount(row);
    this.successHoveredCount = this.successCount(row);

  }
  onRowHoverLeave() {
    this.hoveredRowId = 0;
    this.hoveredStatus = "All statuses"
    this.totalHoveredCount = this.form_data?.distinctStat.totalCount;
    this.failHoveredCount = this.form_data?.distinctStat.failCount;
    this.successHoveredCount = this.form_data?.distinctStat.successCount;
  }
}