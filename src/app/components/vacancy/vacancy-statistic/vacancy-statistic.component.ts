import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { RecruiterStatModel, RecruiterStat, VacancyStatusType, Recruiter, Vacancy } from '../../../models';

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export class VacancyStatTable {
  rowList: RecruiterStatModel;
  hoveredRowId: number;
  totalHoveredCount: number;
  totalDistinctCount: number;
  successHoveredCount: number;
  failHoveredCount: number;
  hoveredStatus: string = "";
  maxAllCount: number;
  vacancy: Vacancy;
  constructor(new_vacancy: Vacancy, model: RecruiterStatModel) {
    this.hoveredRowId = 0;
    this.totalHoveredCount = 0;
    this.totalDistinctCount = 0;
    this.successHoveredCount = 0;
    this.failHoveredCount = 0;
    this.maxAllCount = 0;
    this.vacancy = new_vacancy;
    this.rowList = {...model };
    this.rowList.list = this.rowList.list.filter(t => t.VacancyId == this.vacancy.id);

    for (let i = 0; i < this.rowList.statusList.length; i++) {
      let max = this.totalCount(this.rowList.statusList[i]);
      this.maxAllCount = this.maxAllCount > max ? this.maxAllCount : max;
    }
    this.onRowHoverLeave();
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
    this.totalHoveredCount = this.rowList.list.map(t => t.CandidateId).filter(onlyUnique).length;
    this.failHoveredCount = this.rowList.list.filter(t => t.Fail).map(t => t.CandidateId).filter(onlyUnique).length;
    this.successHoveredCount = this.rowList.list.filter(t => t.Success).map(t => t.CandidateId).filter(onlyUnique).length;
  }

  totalCount(row: VacancyStatusType) {
    return this.rowList.list.filter(t => t.VacancyStatusId == row.id).length;
  }
  successCount(row: VacancyStatusType) {
    return this.rowList.list.filter(t => t.VacancyStatusId == row.id && t.Success == true).length;
  }
  failCount(row: VacancyStatusType) {
    return this.rowList.list.filter(t => t.VacancyStatusId == row.id && t.Fail == true).length;
  }

  round(row: VacancyStatusType) {
    let total = this.totalCount(row);
    return Math.round((total / this.maxAllCount) * 100);
  }
  roundRowSuccess(row: VacancyStatusType) {
    let total = this.totalCount(row);
    let success = this.successCount(row);
    return Math.round((success / total) * 100);
  }
  roundRowFail(row: VacancyStatusType) {
    let total = this.totalCount(row);
    let fail = this.failCount(row);
    return Math.round((fail / total) * 100);
  }
}


@Component({
  selector: 'app-vacancy-statistic',
  standalone: false,
  templateUrl: './vacancy-statistic.component.html',
  styleUrl: './vacancy-statistic.component.scss',
  providers: [DataAccessService, RouterService]
})

export class VacancyStatisticComponent implements OnInit, OnDestroy {

  columnToDisplay: string[] = ['StatusName', 'Total'];
  //, 'Success', 'Fail'
  startDate: Date = new Date();
  endDate: Date = new Date();
  vacancyList: Vacancy[] = [];
  selectedVacancy: Vacancy | undefined;

  tableList: VacancyStatTable[] = [];
  selectedVacancyId: number = 0;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService) { }

  onVacancyChange(newVacancyId: any) {
    this.selectedVacancyId = newVacancyId.value;
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
    this.selectedVacancyId = 0;
   
    this.onUpdateApi();
  }

  onUpdateApi() {

    this.dataAccess.getVacancyList().subscribe((data) => {
      this.vacancyList = data.list;
      this.selectedVacancy = this.vacancyList.find(t => t.id == this.selectedVacancyId);
      this.updateStatModel();
      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
    });

  }

  updateStatModel() {
    this.dataAccess.getRecruiterStatModel(0, this.startDate, this.endDate).subscribe((data) => {
      this.tableList =[]; 

      for (let i = 0; i< this.vacancyList.length; i++) {
        this.tableList.push(new VacancyStatTable(this.vacancyList[i], data)); 
      }
    });
  }
}