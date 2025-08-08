import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'


@Component({
  selector: 'app-candidate-list',
  standalone: false,
  
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  providers: [DataAccessService, RouterService]

})

export class CandidateListComponent implements OnInit, OnDestroy {

  columnToDisplay: string[] = ['id', 'Name', 'PhoneNumber', 'SiteUrl', 'Email', 'ContactDataId', 'Note', 'Sex', 'DateOfBirth', 'RelocationReady', 'RemoteWorkplaceReady', 'SalaryWish', 'SalaryCurrency', 'PhotoUrl', 'MainSkill', 'Leader', 'HowKnowAboutVacancy','Location'];

  material_source = new MatTableDataSource();
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public vacancy_id!: number;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService) { }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  ngOnDestroy() {
  }

  ngOnInit() {
    this.material_source.sort = this.sort;
    this.material_source.paginator = this.paginator;
    this.vacancy_id = 0;
    if (this.route.snapshot.params['vacancy_id']) {
      this.vacancy_id = this.route.snapshot.params['vacancy_id'];
    }
    this.dataAccess.getCandidateList(this.vacancy_id).subscribe((data) => {
      this.material_source.data = data.list;
      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);



    });
  }
  onRowClicked(row: any) {
    this.router.goToProfilePageFromList(row.id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.material_source.filter = filterValue.trim().toLowerCase();
    if (this.material_source.paginator) {
      this.material_source.paginator.firstPage();
    }

  }


  goToCreateNew() {
    this.router.goToProfilePageFromList(0);


  }

  deleteClient() {
    //add danger message needing confirmation

    //Send api request to delete
    //this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
    //On success Delete fromn current list
    //On error show error message




  }

}